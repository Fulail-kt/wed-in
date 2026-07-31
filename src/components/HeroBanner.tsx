'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { weddingConfig } from '../config/wedding';

interface HeroBannerProps {
  guestName?: string;
}

export default function HeroBanner({ guestName }: HeroBannerProps) {
  return (
    <section className="w-full flex flex-col items-center text-center pb-2">
      <div className="w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-[var(--bg-card)] border border-[#E8E2D8] rounded-t-[150px] md:rounded-t-[200px] rounded-b-[1.75rem] px-8 py-14 sm:px-12 sm:py-16 md:px-20 md:py-20 shadow-[0_14px_48px_rgba(42,37,35,0.045)] flex flex-col items-center relative overflow-hidden"
        >
          <div className="absolute inset-4 pt-5! sm:inset-5 md:inset-6 border border-[#C2A166]/25 rounded-t-[135px] md:rounded-t-[180px] rounded-b-[1.25rem] pointer-events-none" />

          <div className="mb-7 w-full flex flex-col items-center gap-2.5">
            <p className="font-arabic text-3xl md:text-5xl text-[#2A2523] leading-loose tracking-wide">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            <p className="text-[10px] tracking-[0.28em] uppercase text-[#8A827B] font-medium max-w-lg leading-relaxed">
              In the name of Allah the Most Gracious and the Most Merciful
            </p>
            <div className="w-14 h-px bg-[#C2A166]/45 mt-3" />
          </div>

          <AnimatePresence>
            {guestName ? (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="guest-invite-block mx-auto text-center"
              >
                <p className="guest-invite-block__label">Exclusive Invitation for</p>
                <p className="guest-invite-block__name">{guestName}</p>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[11px] tracking-[0.22em] uppercase text-[#8A827B] font-medium mb-6 max-w-lg leading-relaxed px-2"
              >
                Request the honour of your presence at the Nikah ceremony of their beloved children
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mb-1 w-full flex flex-col items-center gap-2">
            <h1 className="font-serif-title text-5xl md:text-7xl text-[#2A2523] tracking-tight font-normal leading-[1.1]">
              {weddingConfig.groom}
            </h1>
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-[#8A827B] font-medium">
              {weddingConfig.groomParents}
            </p>
          </div>

          <div className="flex items-center justify-center gap-5 my-6 text-[#9E5A64]">
            <span className="w-14 h-px bg-[#E8E2D8]" />
            <span className="font-serif-body italic text-4xl md:text-5xl leading-none">&amp;</span>
            <span className="w-14 h-px bg-[#E8E2D8]" />
          </div>

          <div className="mb-1 w-full flex flex-col items-center gap-2">
            <h1 className="font-serif-title text-5xl md:text-7xl text-[#2A2523] tracking-tight font-normal leading-[1.1]">
              {weddingConfig.bride}
            </h1>
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-[#8A827B] font-medium">
              {weddingConfig.brideParents}
            </p>
          </div>

          <p className="text-[11px] tracking-[0.24em] uppercase text-[#8A827B] mt-8 mb-6 font-medium">
            Nikah Ceremony
          </p>

          <div className="w-full max-w-md bg-white/70 border border-[#E8E2D8] rounded-2xl px-6 py-7 md:px-8 md:py-8 flex items-center justify-between mx-auto">
            <div className="flex-1 border-r border-[#E8E2D8] pr-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A827B] font-medium">
                {weddingConfig.weddingDayName}
              </p>
              <p className="text-xs text-[#2A2523] font-semibold mt-1.5">{weddingConfig.weddingDateDisplay}</p>
            </div>
            <div className="flex-1 px-4 flex flex-col items-center gap-1.5">
              <p className="font-serif-title text-4xl md:text-5xl text-[#4A6B53] font-normal leading-none">14</p>
              <p className="text-[10px] text-[#8A827B] italic tracking-wide">{weddingConfig.hijriDate}</p>
            </div>
            <div className="flex-1 border-l border-[#E8E2D8] pl-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A827B] font-medium">Time</p>
              <p className="text-xs text-[#2A2523] font-semibold mt-1.5">{weddingConfig.ceremonyTime}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 mt-8">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#2A2523]">
              {weddingConfig.ceremonyVenue}
            </p>
            <p className="text-xs text-[#8A827B] flex items-center justify-center gap-1.5">
              <MapPin size={13} className="text-[#9E5A64]" strokeWidth={1.75} />
              <span>{weddingConfig.ceremonyAddress}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
