import type { APIRoute } from 'astro';
import { getFullSummary } from '../../lib/guests';

export const GET: APIRoute = async () => {
  const summary = await getFullSummary();

  return new Response(
    JSON.stringify({
      count: summary.totalAttending,
      attending: summary.totalAttending,
      declined: summary.declined,
      pending: summary.pending,
      responded: summary.guests.responded + summary.unknown.total,
      totalGuests: summary.invited,
      unknownGuests: summary.unknownGuests,
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};
