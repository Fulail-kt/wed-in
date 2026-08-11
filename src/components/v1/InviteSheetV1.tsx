'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarHeart, MapPin, Navigation } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';
import { FallingFlorals, StickyGarden } from './SaveTheDateFlorals';
import CoupleNamesV1 from './CoupleNamesV1';
import { eventDateParts } from './eventDateParts';
import { v1Tw } from './v1Tw';

interface Props {
  guestName?: string;
}

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function calcCountdown(): Parts {
  const diff = Math.max(0, weddingConfig.weddingDate.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

const UNITS: { key: keyof Parts; label: string }[] = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Mins' },
  { key: 'seconds', label: 'Secs' },
];

export default function InviteSheetV1({ guestName }: Props) {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(calcCountdown());
    const id = window.setInterval(() => setParts(calcCountdown()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <FallingFlorals />
      <StickyGarden />

      <motion.section
        className="relative flex w-full flex-col items-center overflow-x-hidden pb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12, ease: [0.33, 1, 0.38, 1] }}
      >
        <div className={`${v1Tw.content} pb-6`}>
          <div className="flex w-full flex-col items-center">
            <p className={v1Tw.arabic}>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
            <p className={v1Tw.translation}>
              In the name of Allah the Most Gracious and the Most Merciful
            </p>
          </div>

          <AnimatePresence>
            {guestName ? (
              <motion.div
                className={v1Tw.guest}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className={v1Tw.guestLabel}>Exclusive Invitation for</span>
                <span className={v1Tw.guestName}>{guestName}</span>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <CoupleNamesV1 />

          <div className={v1Tw.eventBlock}>
            <p className={v1Tw.eventTime}>{eventDateParts.timePhrase}</p>

            <div className={v1Tw.dateRow} aria-label="August 30, 2026">
              <span className={v1Tw.dateSide}>{eventDateParts.month}</span>
              <span className={v1Tw.dateDot} aria-hidden="true">
                •
              </span>
              <span className={v1Tw.dateDay}>{eventDateParts.day}</span>
              <span className={v1Tw.dateDot} aria-hidden="true">
                •
              </span>
              <span className={v1Tw.dateSide}>{eventDateParts.year}</span>
            </div>

            <div className={v1Tw.venueBlock}>
              <p className={v1Tw.venue}>{weddingConfig.ceremonyVenue}</p>
              <a
                href={weddingConfig.ceremonyMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={v1Tw.address}
              >
                <MapPin size={14} strokeWidth={2} className="shrink-0 text-v1-gold/90" />
                {weddingConfig.ceremonyAddress}
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      <div className={`${v1Tw.below} pb-20`}>
        <motion.div
          className={`${v1Tw.sectionWrap} text-center`}
          id="countdown"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={`${v1Tw.rule} mx-auto mb-6`} aria-hidden="true" />
          <p className={v1Tw.countdownLabel}>Counting down to the ceremony</p>
          <div className={v1Tw.countdownGrid}>
            {UNITS.map(({ key, label }) => (
              <div key={key} className={v1Tw.countdownCell}>
                <p
                  className={`${v1Tw.countdownDigit}${key === 'seconds' ? ' text-v1-gold' : ''}`}
                >
                  {String(parts?.[key] ?? 0).padStart(2, '0')}
                </p>
                <span className={v1Tw.countdownUnit}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={v1Tw.actions}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href={weddingConfig.ceremonyMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${v1Tw.btnBase} ${v1Tw.btnMap}`}
          >
            <Navigation size={13} strokeWidth={1.75} />
            Directions
          </a>
          <a
            id="add-to-google-calendar-btn"
            href={weddingConfig.googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${v1Tw.btnBase} ${v1Tw.btnCal}`}
          >
            <CalendarHeart size={13} strokeWidth={1.75} />
            Save Date
          </a>
        </motion.div>
      </div>
    </>
  );
}
