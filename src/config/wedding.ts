export const weddingConfig = {
  groom: 'groom name',
  groomParents: 'Son of Mr. & Mrs. Name',
  bride: 'bride name',
  brideParents: 'Daughter of Mr. & Mrs. Name',
  coupleNames: 'Groom & Bride',

  weddingDate: new Date('2026-08-30T10:00:00+05:30'),
  weddingDateDisplay: 'August 30, 2026',
  weddingDayName: 'SUNDAY',
  hijriDate: "17 Rabi'al Awwal 1448",
  ceremonyTime: '10:00 AM',

  ceremonyVenue: 'MALABAR MARINA',
  ceremonyAddress: 'Kottakkal, Malappuram, Kerala',
  ceremonyMapUrl: 'https://maps.google.com/?q=Kottakkal+Malappuram',

  get googleCalendarUrl(): string {
    const start = '20260830T100000Z';
    const end = '20260830T160000Z';
    const text = encodeURIComponent(`${this.coupleNames} Wedding`);
    const details = encodeURIComponent(
      `You are invited to the Nikah ceremony of ${this.coupleNames} at ${this.ceremonyVenue}, ${this.ceremonyAddress}.`
    );
    const location = encodeURIComponent(this.ceremonyAddress);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
  },

  rsvpDeadline: 'August 28, 2026',

  // Music: drop files in public/music/. Player picks one at random on open.
  musicTracks: [
    { title: 'Wedding', url: '/music/wedding.mp3' },
    { title: 'Asalayavale', url: '/music/asalayavale.mp3' },
  ],
} as const;
