/** Shared Tailwind class strings for v1 — watercolor invite */
export const v1Tw = {
  content:
    'relative z-[5] mx-auto flex w-[min(94vw,23.5rem)] flex-col items-center text-center md:w-[min(90vw,36rem)] px-4 pt-[max(2rem,calc(env(safe-area-inset-top)+1rem))] md:px-6 md:pt-[max(2.5rem,calc(env(safe-area-inset-top)+1.25rem))]',
  below:
    'relative z-[5] mx-auto flex w-[min(94vw,23.5rem)] flex-col items-center gap-8 md:w-[min(90vw,36rem)] md:gap-9 px-4 md:px-6',
  sectionWrap: 'w-full',
  rule:
    'h-px w-full max-w-[12rem] bg-gradient-to-r from-transparent via-v1-gold/55 to-transparent',
  arabic:
    'font-v1-arabic text-[clamp(1rem,4.2vw,1.3rem)] leading-loose text-v1-navy-soft/90 rtl',
  translation:
    'mt-2 max-w-[15rem] font-v1-sans text-[0.58rem] font-medium uppercase leading-relaxed tracking-[0.2em] text-v1-grey md:text-[0.62rem]',
  guest: 'mt-4 border-y border-v1-gold/25 py-3',
  guestLabel:
    'block font-v1-sans text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-v1-grey',
  guestName:
    'mt-1 block font-v1-serif text-[clamp(1.1rem,3.5vw,1.45rem)] font-semibold tracking-[0.04em] text-v1-navy',
  namesBlock: 'mt-6 flex w-full flex-col items-center gap-2 py-2',
  nameBride:
    'm-0 whitespace-nowrap py-1 font-v1-name-a text-[clamp(2.35rem,8.8vw,3.55rem)] font-normal leading-[1.14] tracking-[0.04em] text-v1-navy-deep md:text-[clamp(2.85rem,7.5vw,4rem)]',
  nameGroom:
    'm-0 whitespace-nowrap py-1 font-v1-name-a text-[clamp(2.35rem,8.8vw,3.55rem)] font-normal leading-[1.14] tracking-[0.04em] text-v1-navy-deep md:text-[clamp(2.85rem,7.5vw,4rem)]',
  nameAmp:
    'my-2.5 font-v1-name-a text-[clamp(1.55rem,5.5vw,2.1rem)] font-normal leading-none tracking-[0.12em] text-v1-gold md:my-3',
  eventBlock: 'mt-8 w-full text-center',
  eventTime:
    'mb-4 font-v1-sans text-[clamp(0.82rem,2.7vw,0.98rem)] font-semibold lowercase tracking-[0.28em] text-v1-navy/88',
  dateRow: 'flex items-baseline justify-center gap-4 sm:gap-5',
  dateSide:
    'font-v1-sans text-[clamp(0.78rem,2.4vw,0.92rem)] font-semibold uppercase tracking-[0.22em] text-v1-navy/88',
  dateDot: 'pb-1 font-v1-sans text-[0.6rem] font-medium leading-none tracking-[0.1em] text-v1-navy-soft/65',
  dateDay:
    'font-v1-sans text-[clamp(3rem,12vw,4rem)] font-medium leading-none tabular-nums tracking-[0.04em] text-v1-navy/88',
  venueBlock: 'mt-6',
  venue:
    'font-v1-name-a text-[clamp(1.08rem,3.4vw,1.26rem)] font-normal leading-snug tracking-[0.06em] text-v1-navy/90',
  address:
    'mt-3 inline-flex max-w-[20rem] items-center justify-center gap-2 font-v1-sans text-[0.74rem] font-semibold leading-relaxed tracking-[0.06em] text-v1-navy/88 no-underline transition-colors hover:text-v1-navy',
  countdownLabel:
    'mb-5 w-full text-center font-v1-sans text-[0.6rem] font-medium uppercase tracking-[0.3em] text-v1-grey',
  countdownGrid:
    'mx-auto grid w-full max-w-[22rem] grid-cols-4 divide-x divide-v1-gold/25 border-y border-v1-gold/25 py-2 md:max-w-[26rem]',
  countdownCell: 'flex flex-col items-center px-2 py-3.5 md:px-3',
  countdownDigit:
    'm-0 font-v1-sans text-[clamp(1.7rem,6.2vw,2.05rem)] font-normal leading-none tabular-nums tracking-[0.12em] text-v1-navy',
  countdownUnit:
    'mt-2.5 font-v1-sans text-[0.5rem] font-medium uppercase tracking-[0.2em] text-v1-grey/90',
  actions: 'flex w-full flex-col gap-2.5 sm:flex-row sm:gap-3',
  btnBase:
    'inline-flex w-full flex-1 items-center justify-center gap-2 rounded-full border px-5 py-3 font-v1-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] no-underline transition-all duration-200 active:scale-[0.99] md:text-[0.65rem]',
  btnMap:
    'border-v1-navy bg-v1-navy text-v1-paper shadow-[0_6px_20px_rgba(15,44,58,0.22)] hover:bg-v1-navy-deep',
  btnCal:
    'border-v1-gold/70 bg-white/60 text-v1-navy hover:border-v1-gold hover:bg-white/85',
  rsvpSection: 'w-full border-t border-v1-gold/30 pt-7 text-center md:pt-8',
  rsvpSub:
    'mb-2 font-v1-sans text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-v1-gold',
  rsvpTitle:
    'font-v1-name-a text-[clamp(2rem,6.5vw,2.55rem)] font-normal leading-tight text-v1-navy',
  rsvpDeadline:
    'mt-2 font-v1-sans text-[0.62rem] font-medium tracking-[0.04em] text-v1-grey',
  rsvpGuest:
    'mt-2 font-v1-serif text-[clamp(1rem,3.2vw,1.15rem)] font-semibold text-v1-navy-soft',
  rsvpBtnYes:
    'mx-auto mb-2 flex w-full max-w-[17rem] items-center justify-center gap-2 rounded-full border border-v1-navy bg-v1-navy px-5 py-3.5 font-v1-sans text-[0.62rem] font-bold uppercase tracking-[0.14em] text-v1-paper shadow-[0_6px_20px_rgba(15,44,58,0.22)] transition-colors hover:bg-v1-navy-deep active:scale-[0.99]',
  rsvpBtnNo:
    'mx-auto flex w-full max-w-[17rem] items-center justify-center rounded-full border border-v1-navy-soft/35 bg-white/50 px-5 py-3 font-v1-sans text-[0.6rem] font-medium tracking-[0.02em] text-v1-navy-soft transition-colors hover:border-v1-navy-soft/55 hover:text-v1-navy',
  submitBtn:
    'mx-auto inline-flex w-full max-w-[17rem] items-center justify-center gap-2 rounded-full border border-v1-navy bg-v1-navy px-5 py-3.5 font-v1-sans text-[0.62rem] font-bold uppercase tracking-[0.14em] text-v1-paper transition-colors hover:bg-v1-navy-deep',
  counterBox:
    'my-4 flex items-center justify-center gap-5 border-y border-v1-gold/25 py-4',
  counterBtn:
    'flex size-9 items-center justify-center rounded-full border border-v1-navy-soft/30 bg-white/50 font-v1-sans text-v1-navy transition-colors hover:border-v1-gold/50 disabled:opacity-30',
  counterNum:
    'min-w-10 font-v1-serif text-[2rem] font-semibold tabular-nums text-v1-navy',
  rsvpPhaseHint:
    'mb-4 font-v1-serif text-[1rem] font-medium leading-relaxed text-v1-navy/90',
  rsvpMicroLabel:
    'mb-3 font-v1-sans text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-v1-grey',
  rsvpBadge:
    'mb-4 inline-block rounded-full border border-v1-gold/45 px-3.5 py-1.5 font-v1-sans text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-v1-gold',
  rsvpLink:
    'mx-auto cursor-pointer border-0 bg-transparent p-0 font-v1-sans text-[0.58rem] font-medium uppercase tracking-[0.14em] text-v1-grey underline underline-offset-4 transition-colors hover:text-v1-navy',
  rsvpCheck:
    'mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-v1-navy/20 font-v1-serif text-xl text-v1-navy',
  rsvpHeart: 'mb-3 font-v1-name-a text-3xl text-v1-navy-soft',
  rsvpClose:
    'absolute right-0 top-0 border-0 bg-transparent p-1 text-v1-grey transition-colors hover:text-v1-navy',
  footer: 'pb-[max(10rem,calc(env(safe-area-inset-bottom)+8.5rem))] pt-2 text-center md:pb-36',
  footerNames:
    'mb-1 flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-0 font-normal text-v1-navy',
  footerNameA:
    'font-v1-name-a text-[clamp(1.55rem,5.2vw,1.95rem)] leading-none',
  footerNameB:
    'font-v1-name-a text-[clamp(1.55rem,5.2vw,1.95rem)] leading-none',
  footerAmp:
    'font-v1-name-a text-[clamp(1.15rem,4.2vw,1.45rem)] font-normal tracking-[0.06em] text-v1-gold',
  footerDate:
    'font-v1-sans text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-v1-grey',
  gateShell:
    'fixed inset-0 z-80 flex min-h-[100dvh] cursor-pointer flex-col items-center justify-between overflow-hidden border-0 bg-transparent p-0 md:justify-center md:gap-0 md:py-12',
  gateFrost:
    'pointer-events-none absolute inset-0 bg-white/28 backdrop-blur-[5px] backdrop-saturate-[1.04] md:bg-white/22 md:backdrop-blur-[7px]',
  gateTopSpace:
    'relative z-[3] w-full shrink-0 pt-[max(2.25rem,calc(env(safe-area-inset-top)+1.75rem))] md:hidden',
  gateArabic:
    'pointer-events-none relative z-[3] w-full shrink-0 px-6 pb-2 pt-[clamp(1.75rem,7vw,2.75rem)] text-center font-v1-arabic text-[clamp(0.84rem,3.5vw,1.02rem)] leading-loose text-v1-navy-soft/88 rtl md:max-w-md md:px-8 md:pb-4 md:pt-0 md:text-[1.05rem]',
  gateCoverCenter:
    'relative z-[4] flex w-full max-w-[min(96vw,24rem)] flex-1 flex-col items-center justify-center px-4 py-4 text-center md:max-w-[26rem] md:flex-none md:px-0 md:py-0',
  gateCoverPanel:
    'relative flex w-full min-w-0 flex-col items-center rounded-3xl border-0 bg-white/70 px-8 py-10 shadow-[0_24px_64px_rgba(15,44,58,0.14)] backdrop-blur-md md:rounded-2xl md:bg-white/78 md:px-10 md:py-11 md:shadow-[0_20px_56px_rgba(15,44,58,0.12)]',
  gateCoverGuest:
    'relative z-[1] mb-5 max-w-full truncate font-v1-sans text-[0.56rem] font-medium uppercase tracking-[0.26em] text-v1-grey md:text-[0.58rem]',
  gateCoverRule:
    'mb-4 h-px w-full max-w-[10rem] bg-gradient-to-r from-transparent via-v1-gold/40 to-transparent md:mb-5 md:max-w-[12rem]',
  gateCoverNames:
    'relative z-[1] flex w-full min-w-0 flex-col items-center gap-0',
  gateCoverBride:
    'm-0 w-full min-w-0 whitespace-nowrap px-0.5 py-0 font-v1-name-a text-[clamp(1.72rem,6.8vw,2.85rem)] font-normal leading-[1.08] tracking-[0.04em] text-v1-navy-deep md:text-[clamp(2.75rem,8vw,4rem)]',
  gateCoverAmp:
    'my-3 font-v1-name-a text-[clamp(1.35rem,5vw,2rem)] font-normal leading-none tracking-[0.12em] text-v1-gold md:my-3.5',
  gateCoverGroom:
    'm-0 w-full min-w-0 whitespace-nowrap px-0.5 py-0 font-v1-name-a text-[clamp(1.95rem,7.8vw,3rem)] font-normal leading-[1.08] tracking-[0.04em] text-v1-navy-deep md:text-[clamp(2.75rem,8vw,4rem)]',
  gateCoverRuleBottom:
    'mt-4 h-px w-full max-w-[10rem] bg-gradient-to-r from-transparent via-v1-gold/40 to-transparent md:mt-5 md:max-w-[12rem]',
  gateHint:
    'pointer-events-none relative z-[5] w-full shrink-0 px-6 pb-[max(4.5rem,calc(env(safe-area-inset-bottom)+3.5rem))] pt-4 text-center md:absolute md:inset-x-0 md:bottom-[max(1.5rem,env(safe-area-inset-bottom))] md:pb-0 md:pt-0',
  gateHintInner:
    'inline-block rounded-full bg-white/55 px-4 py-1.5 font-v1-sans text-[0.62rem] font-medium lowercase tracking-[0.2em] text-v1-navy/72 shadow-[0_2px_12px_rgba(15,44,58,0.08)] backdrop-blur-sm md:bg-white/45 md:text-[0.64rem] md:text-v1-navy/68',
  audioWrap:
    'pointer-events-auto fixed z-[60] bottom-[max(0.5rem,calc(env(safe-area-inset-bottom)+0.4rem))] right-[max(0.65rem,env(safe-area-inset-right))] md:bottom-[max(0.65rem,calc(env(safe-area-inset-bottom)+0.5rem))] md:right-[max(0.75rem,env(safe-area-inset-right))]',
  audioPill:
    'flex items-center rounded-full bg-v1-navy font-v1-sans text-v1-paper shadow-[0_3px_12px_rgba(15,44,58,0.26)] transition-[width,padding,gap] duration-300 ease-out md:gap-1.5 md:py-1.5 md:pl-1.5 md:pr-3 md:shadow-[0_4px_18px_rgba(15,44,58,0.3)]',
  audioPillCompact:
    'h-7 w-7 justify-center gap-0 p-0.5 md:h-auto md:w-auto',
  audioPillExpanded:
    'h-7 max-h-7 gap-1 py-0.5 pl-0.5 pr-1.5 md:h-auto md:max-h-none',
  audioBtn:
    'flex size-[1.65rem] shrink-0 items-center justify-center rounded-full border-0 bg-white/10 text-v1-paper md:size-8',
  audioTrack:
    'max-w-[3.6rem] truncate text-[0.46rem] font-medium leading-none tracking-[0.05em] md:max-w-[5rem] md:text-[0.56rem]',
  audioSkipBtn:
    'flex cursor-pointer items-center border-0 bg-transparent p-0.5 text-white/65 md:p-1',
  eqBar: 'w-0.5 rounded-full bg-v1-paper animate-v1-eq',
} as const;
