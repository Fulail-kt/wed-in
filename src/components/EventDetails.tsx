'use client';
import { motion } from 'framer-motion';
import { CalendarHeart, MapPin, Clock, ArrowUpRight, Navigation } from 'lucide-react';
import { weddingConfig } from '../config/wedding';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const eventDate = weddingConfig.weddingDate;
const calMonth = eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
const calDay = eventDate.getDate();
const calYear = eventDate.getFullYear();

export default function EventDetails() {
  return (
    <section id="event-details" className="section-shell">
      <div className="section-inner max-w-xl">

        <motion.div {...fadeUp} className="mb-7 w-full flex flex-col items-center">
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#8A827B] font-medium mb-2.5">
            Save the Date
          </p>
          <h2 className="font-serif-title text-4xl md:text-[3.25rem] text-[#2A2523] font-normal mb-2.5 tracking-tight">
            Event Details
          </h2>
          <p className="font-serif-body text-xl md:text-2xl italic text-[#8A827B]">
            Join us for a day of love &amp; barakah
          </p>
          <div className="w-14 h-px bg-[#E8E2D8] mx-auto mt-5" />
        </motion.div>

        {/* Venue + location card */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.08 }}
          className="surface-card w-full overflow-hidden mb-4"
        >
          <div className="px-6 pt-7 pb-5 md:px-8 md:pt-8 border-b border-[#E8E2D8]/80">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.22em] uppercase font-semibold text-[#4A6B53] bg-[#EBF2EC] px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A6B53]" />
                Nikah Ceremony
              </span>
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#8A827B]">
                {weddingConfig.weddingDayName}
              </span>
            </div>

            <h3 className="font-serif-title text-[1.85rem] md:text-[2.35rem] text-[#2A2523] font-normal tracking-tight leading-tight mb-5">
              {weddingConfig.ceremonyVenue}
            </h3>

            {/* Location — high visibility */}
            <div className="rounded-2xl bg-[#EBF2EC]/70 border border-[#4A6B53]/20 px-4 py-4 md:px-5 md:py-5">
              <div className="flex gap-3.5 items-center justify-center">
                <span className="shrink-0 w-10 h-10 rounded-xl bg-[#4A6B53] text-white flex items-center justify-center shadow-[0_6px_16px_rgba(74,107,83,0.25)]">
                  <MapPin size={18} strokeWidth={2} />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-base md:text-lg font-semibold text-[#2A2523] leading-snug">
                    {weddingConfig.ceremonyAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 md:px-8 flex items-center justify-between gap-4 bg-[#FDFCF8]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div>
                <p className="text-[10px] tracking-[0.18em] text-left uppercase text-[#8A827B] font-medium">Time</p>
                <p className="text-sm font-semibold text-[#2A2523]">{weddingConfig.ceremonyTime}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] tracking-[0.18em] uppercase text-[#8A827B] font-medium">Date</p>
              <p className="text-sm font-semibold text-[#2A2523]">{weddingConfig.weddingDateDisplay}</p>
            </div>
          </div>

          <a
            href={weddingConfig.ceremonyMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full px-6 py-4 bg-[#4A6B53] text-white text-[11px] tracking-[0.2em] uppercase font-semibold transition-colors duration-300 hover:bg-[#3D5A44] group"
          >
            <Navigation size={15} strokeWidth={2} className="opacity-90" />
            <span>Open in Google Maps</span>
            <ArrowUpRight
              size={14}
              className="opacity-80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>

        {/* Calendar — compact */}
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.14 }}>
          <a
            id="add-to-google-calendar-btn"
            href={weddingConfig.googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#4A6B53] to-[#3D5A44] text-white px-4 py-3.5 shadow-[0_12px_32px_rgba(74,107,83,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(74,107,83,0.4)]"
          >
            <div className="shrink-0 w-[3.25rem] rounded-xl bg-white/15 border border-white/20 flex flex-col items-center justify-center py-2">
              <span className="text-[9px] tracking-wider uppercase text-white/75 font-semibold leading-none">
                {calMonth}
              </span>
              <span className="font-serif-title text-2xl text-white leading-none my-0.5">{calDay}</span>
              <span className="text-[9px] text-white/65 leading-none">{calYear}</span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/70 font-medium mb-0.5">
                Save the date
              </p>
              <p className="font-serif-title text-base text-white leading-tight truncate">
                {weddingConfig.weddingDateDisplay}
              </p>
              <p className="text-[11px] text-white/75 mt-0.5">
                {weddingConfig.ceremonyTime} · Add to Calendar
              </p>
            </div>

            <span className="shrink-0 w-9 h-9 rounded-xl bg-white/15 text-white flex items-center justify-center transition-colors duration-300 group-hover:bg-white group-hover:text-[#4A6B53]">
              <CalendarHeart size={17} strokeWidth={1.75} />
            </span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
