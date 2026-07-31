'use client';
import { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../config/wedding';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TICK_EASE = [0.22, 1, 0.36, 1] as const;
const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Mins' },
  { key: 'seconds', label: 'Secs' },
] as const;

function getTimeLeft(): TimeLeft {
  const diff = weddingConfig.weddingDate.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const CountdownUnit = memo(function CountdownUnit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const display = String(value).padStart(2, '0');

  return (
    <div className="countdown-unit">
      <div className="countdown-unit__value">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={display}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.36, ease: TICK_EASE }}
            className="countdown-unit__digit font-serif-title tabular-nums select-none"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="countdown-unit__label">{label}</span>
    </div>
  );
});

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());

    const msToNextSecond = 1000 - (Date.now() % 1000);
    let interval: ReturnType<typeof setInterval>;

    const timeout = window.setTimeout(() => {
      setTimeLeft(getTimeLeft());
      interval = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    }, msToNextSecond);

    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, []);

  return (
    <section id="countdown" className="section-shell section-shell--soft">
      <div className="section-inner max-w-2xl gap-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: TICK_EASE }}
          className="w-full flex flex-col items-center"
        >
          <div className="w-14 h-px bg-[#9E5A64]/35 mb-4" />
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#8A827B] font-medium mb-6">
            Countdown to Nikah Ceremony
          </p>

          {mounted ? (
            <div className="countdown-grid">
              {UNITS.map(({ key, label }) => (
                <CountdownUnit key={key} value={timeLeft[key]} label={label} />
              ))}
            </div>
          ) : (
            <div className="countdown-grid countdown-grid--placeholder" aria-hidden="true">
              {UNITS.map(({ key, label }) => (
                <div key={key} className="countdown-unit countdown-unit--placeholder">
                  <span className="countdown-unit__digit font-serif-title">00</span>
                  <span className="countdown-unit__label">{label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="w-14 h-px bg-[#9E5A64]/35 mt-6" />
        </motion.div>
      </div>
    </section>
  );
}
