import type { APIRoute } from 'astro';
import {
  deleteUnknownRsvp,
  getGuest,
  isValidRecordId,
  resetGuestRsvp,
  saveGuestRsvp,
  saveUnknownRsvp,
} from '../../lib/guests';

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { guestId, anonymousId, attending, guestCount = 1 } = body;

    if (typeof attending !== 'boolean') {
      return json({ error: 'Attending must be true or false' }, 400);
    }

    const count = attending ? Math.max(1, Math.min(25, Number(guestCount) || 1)) : 0;

    if (guestId) {
      if (!isValidRecordId(guestId)) return json({ error: 'Invalid guest id' }, 400);
      const existing = await getGuest(guestId);
      if (!existing) return json({ error: 'Guest not found' }, 404);
      await saveGuestRsvp(guestId, attending, count);
    } else if (anonymousId) {
      if (!isValidRecordId(anonymousId)) return json({ error: 'Invalid id' }, 400);
      await saveUnknownRsvp(String(anonymousId), attending, count);
    } else {
      return json({ error: 'Guest or anonymous ID required' }, 400);
    }

    return json({ success: true, guestCount: count });
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { guestId, anonymousId } = body;

    if (guestId) {
      if (!isValidRecordId(guestId)) return json({ error: 'Invalid guest id' }, 400);
      const ok = await resetGuestRsvp(String(guestId));
      if (!ok) return json({ error: 'Guest not found' }, 404);
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
