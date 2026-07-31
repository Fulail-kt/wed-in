import type { APIRoute } from 'astro';
import {
  deleteUnknownRsvp,
  getGuest,
  saveGuestRsvp,
  saveUnknownRsvp,
} from '../../lib/guests';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { guestId, anonymousId, attending, guestCount = 1 } = body;
    const count = attending ? Math.max(1, Math.min(25, Number(guestCount) || 1)) : 0;

    if (guestId) {
      const existing = await getGuest(guestId);
      if (!existing) {
        return new Response(JSON.stringify({ error: 'Guest not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      await saveGuestRsvp(guestId, attending, count);
    } else if (anonymousId) {
      await saveUnknownRsvp(String(anonymousId), attending, count);
    } else {
      return new Response(JSON.stringify({ error: 'Guest or anonymous ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, guestCount: count }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { anonymousId } = body;
    if (!anonymousId) {
      return new Response(JSON.stringify({ error: 'Anonymous ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    await deleteUnknownRsvp(String(anonymousId));
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
