export const weddingConfig = {
  groom: 'Jafer',
  groomParents: '',
  bride: 'Safa Sherin',
  brideParents: '',
  get coupleNames() {
    return `${this.bride} & ${this.groom}`;
  },

  weddingDate: new Date('2026-08-30T12:00:00+05:30'),
  weddingDateDisplay: 'Sunday, August 30th',
  weddingDayName: 'SUNDAY',
  hijriDate: "17 Rabi'al Awwal 1448",
  ceremonyTime: '12:00 PM',
  ceremonyLabel: 'Wedding Ceremony',

  ceremonyVenue: 'Illikkal Convention Center',
  ceremonyAddress: 'Chudalappra, Puthuparamba',
  ceremonyMapUrl: 'https://maps.app.goo.gl/jCocXsuFW87LVk4w5',

  get googleCalendarUrl(): string {
    const start = '20260830T063000Z';
    const end = '20260830T103000Z';
    const text = encodeURIComponent(`${this.coupleNames} Wedding`);
    const details = encodeURIComponent(
      `You are invited to the wedding ceremony of ${this.coupleNames} at ${this.ceremonyVenue}, ${this.ceremonyAddress}.`
    );
    const location = encodeURIComponent(this.ceremonyAddress);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
  },

  rsvpDeadline: 'August 25, 2026',

  // Music: drop files in public/music/. Player picks one at random on open.
  musicTracks: [
    { title: 'Wedding', url: '/music/wedding.mp3' },
    { title: 'Asalayavale', url: '/music/asalayavale.mp3' },
  ],
} as const;
