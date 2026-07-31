import type { APIRoute } from 'astro';
import {
  createGuest,
  deleteGuest,
  deleteUnknownRsvp,
  getGuest,
  isValidRecordId,
  listGuests,
  summarizeGuests,
  validateGuestName,
} from '../../lib/guests';
import { envGet } from '../../lib/env';

function isAdmin(key: string | null): boolean {
  const secret = envGet('ADMIN_SECRET_KEY');
  return Boolean(secret && key === secret);
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const GET: APIRoute = async ({ url }) => {
  const key = url.searchParams.get('key');
  const id = url.searchParams.get('id');

  if (id) {
    if (!isValidRecordId(id)) return json({ error: 'Invalid guest id' }, 400);
    const guest = await getGuest(id);
    if (!guest) return json({ error: 'Guest not found' }, 404);
    return json({ guest });
  }

  if (!isAdmin(key)) return json({ error: 'Unauthorized' }, 401);

  const guests = await listGuests();
  return json({ guests, summary: summarizeGuests(guests) });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, key } = body;

    if (!isAdmin(key)) return json({ error: 'Unauthorized' }, 401);

    const parsed = validateGuestName(name);
    if (!parsed.ok) return json({ error: parsed.error }, 400);

    const guest = await createGuest(parsed.name);
    if (!guest) return json({ error: 'Storage unavailable' }, 503);

    return json({ guest }, 201);
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { key, guestId, anonymousId } = body;

    if (!isAdmin(key)) return json({ error: 'Unauthorized' }, 401);

    if (guestId) {
      if (!isValidRecordId(guestId)) return json({ error: 'Invalid guest id' }, 400);
      await deleteGuest(String(guestId));
      return json({ success: true });
    }

    if (anonymousId) {
      if (!isValidRecordId(anonymousId)) return json({ error: 'Invalid id' }, 400);
      await deleteUnknownRsvp(String(anonymousId));
      return json({ success: true });
    }

    return json({ error: 'Guest or anonymous ID required' }, 400);
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }
};
