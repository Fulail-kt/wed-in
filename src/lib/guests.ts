import { getRedis } from './redis';

export type GuestStatus = 'pending' | 'yes' | 'no';

export interface GuestRecord {
  id: string;
  name: string;
  status: GuestStatus;
  count: number;
  updatedAt: string;
}

export interface UnknownRecord {
  id: string;
  status: GuestStatus;
  count: number;
  updatedAt: string;
}

const IDS_KEY = 'wedding:guest_ids';
const UNKNOWN_IDS_KEY = 'wedding:unknown_ids';
const guestKey = (id: string) => `wedding:guest:${id}`;
const unknownKey = (id: string) => `wedding:unknown:${id}`;

function shortId(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 8);
}

function parseGuest(id: string, raw: Record<string, string | number> | null): GuestRecord | null {
  if (!raw || !raw.name) return null;
  const status = (raw.status as GuestStatus) || 'pending';
  return {
    id,
    name: String(raw.name),
    status: status === 'yes' || status === 'no' ? status : 'pending',
    count: Number(raw.count) || 0,
    updatedAt: String(raw.updatedAt || ''),
  };
}

export async function createGuest(name: string): Promise<GuestRecord | null> {
  const redis = getRedis();
  if (!redis) return null;

  const id = shortId();
  const record = {
    name: name.trim(),
    status: 'pending',
    count: 0,
    updatedAt: '',
  };

  await redis.sadd(IDS_KEY, id);
  await redis.hset(guestKey(id), record);
  return { id, ...record, status: 'pending' as const };
}

export async function getGuest(id: string): Promise<GuestRecord | null> {
  const redis = getRedis();
  if (!redis) return null;
  const raw = await redis.hgetall<Record<string, string | number>>(guestKey(id));
  return parseGuest(id, raw);
}

export async function listGuests(): Promise<GuestRecord[]> {
  const redis = getRedis();
  if (!redis) return [];

  const ids = await redis.smembers<string>(IDS_KEY);
  if (!ids?.length) return [];

  const guests = await Promise.all(
    ids.map(async (id) => {
      const raw = await redis.hgetall<Record<string, string | number>>(guestKey(id));
      return parseGuest(id, raw);
    })
  );

  return guests
    .filter((g): g is GuestRecord => g !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function saveGuestRsvp(
  id: string,
  attending: boolean,
  count: number
): Promise<GuestRecord | null> {
  const redis = getRedis();
  if (!redis) return null;

  const existing = await getGuest(id);
  if (!existing) return null;

  const record = {
    name: existing.name,
    status: attending ? 'yes' : 'no',
    count: attending ? Math.max(1, Math.min(25, count)) : 0,
    updatedAt: new Date().toISOString(),
  };

  await redis.hset(guestKey(id), record);
  return { id, ...record, status: record.status as GuestStatus };
}

function parseUnknown(id: string, raw: Record<string, string | number> | null): UnknownRecord | null {
  if (!raw || !raw.status) return null;
  const status = raw.status as GuestStatus;
  return {
    id,
    status: status === 'yes' || status === 'no' ? status : 'pending',
    count: Number(raw.count) || 0,
    updatedAt: String(raw.updatedAt || ''),
  };
}

export async function saveUnknownRsvp(
  id: string,
  attending: boolean,
  count: number
): Promise<UnknownRecord | null> {
  const redis = getRedis();
  if (!redis || !id.trim()) return null;

  const record = {
    status: attending ? 'yes' : 'no',
    count: attending ? Math.max(1, Math.min(25, count)) : 0,
    updatedAt: new Date().toISOString(),
  };

  await redis.sadd(UNKNOWN_IDS_KEY, id);
  await redis.hset(unknownKey(id), record);
  return { id, ...record, status: record.status as GuestStatus };
}

export async function deleteUnknownRsvp(id: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis || !id.trim()) return false;
  await redis.srem(UNKNOWN_IDS_KEY, id);
  await redis.del(unknownKey(id));
  return true;
}

export async function listUnknownGuests(): Promise<UnknownRecord[]> {
  const redis = getRedis();
  if (!redis) return [];

  const ids = await redis.smembers<string>(UNKNOWN_IDS_KEY);
  if (!ids?.length) return [];

  const rows = await Promise.all(
    ids.map(async (id) => {
      const raw = await redis.hgetall<Record<string, string | number>>(unknownKey(id));
      return parseUnknown(id, raw);
    })
  );

  return rows
    .filter((r): r is UnknownRecord => r !== null)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function summarizeUnknown(unknown: UnknownRecord[]) {
  let totalAttending = 0;
  let declined = 0;

  for (const u of unknown) {
    if (u.status === 'yes') totalAttending += u.count;
    else if (u.status === 'no') declined += 1;
  }

  return { totalAttending, declined, total: unknown.length };
}

export async function getFullSummary() {
  const [guests, unknown] = await Promise.all([listGuests(), listUnknownGuests()]);
  const guestSummary = summarizeGuests(guests);
  const unknownSummary = summarizeUnknown(unknown);

  return {
    guests: guestSummary,
    unknown: unknownSummary,
    totalAttending: guestSummary.totalAttending + unknownSummary.totalAttending,
    declined: guestSummary.declined + unknownSummary.declined,
    pending: guestSummary.pending,
    invited: guestSummary.totalGuests,
    unknownGuests: unknown.length,
  };
}

export function summarizeGuests(guests: GuestRecord[]) {
  let totalAttending = 0;
  let declined = 0;
  let pending = 0;

  for (const g of guests) {
    if (g.status === 'yes') totalAttending += g.count;
    else if (g.status === 'no') declined += 1;
    else pending += 1;
  }

  return {
    totalAttending,
    declined,
    pending,
    responded: guests.length - pending,
    totalGuests: guests.length,
  };
}

export function formatGuestName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return trimmed;

  return trimmed
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
