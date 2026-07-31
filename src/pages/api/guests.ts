import type { APIRoute } from 'astro';
import { createGuest, getGuest, listGuests, summarizeGuests } from '../../lib/guests';
import { envGet } from '../../lib/env';

function isAdmin(key: string | null): boolean {
  const secret = envGet('ADMIN_SECRET_KEY');
  return Boolean(secret && key === secret);
}

export const GET: APIRoute = async ({ url }) => {
  const key = url.searchParams.get('key');
  const id = url.searchParams.get('id');

  if (id) {
    const guest = await getGuest(id);
    if (!guest) {
      return new Response(JSON.stringify({ error: 'Guest not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ guest }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!isAdmin(key)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const guests = await listGuests();
  const summary = summarizeGuests(guests);

  return new Response(JSON.stringify({ guests, summary }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, key } = body;

    if (!isAdmin(key)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!name?.trim()) {
      return new Response(JSON.stringify({ error: 'Name required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const guest = await createGuest(name.trim());
    if (!guest) {
      return new Response(JSON.stringify({ error: 'Storage unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ guest }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
