'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Loader2 } from 'lucide-react';
import { weddingConfig } from '../config/wedding';

const ANON_KEY = 'wedding_anon_id';
const RSVP_KEY = 'wedding_rsvp';

function clearLocalRsvp() {
  localStorage.removeItem(ANON_KEY);
  localStorage.removeItem(RSVP_KEY);
}

function ensureAnonId(): string {
  let id = localStorage.getItem(ANON_KEY);
  if (!id) {
    id = crypto.randomUUID().replace(/-/g, '').slice(0, 8);
    localStorage.setItem(ANON_KEY, id);
  }
  return id;
}

function loadSavedRsvp(): { status: 'yes' | 'no'; count: number } | null {
  try {
    const raw = localStorage.getItem(RSVP_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.status === 'yes' || data.status === 'no') {
      return { status: data.status, count: Number(data.count) || 1 };
    }
  } catch {
    // ignore
  }
  return null;
}

function saveRsvp(status: 'yes' | 'no', count: number) {
  localStorage.setItem(RSVP_KEY, JSON.stringify({ status, count }));
}

function launchSVGPetalConfetti() {
  const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
  const count = mobile ? 16 : 36;
  for (let i = 0; i < count; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'petal-element';
    wrapper.style.left = `${Math.min(96, Math.max(2, Math.random() * 98))}%`;
    wrapper.style.animationDuration = `${5 + Math.random() * 5}s`;
    wrapper.style.animationDelay = `${Math.random() * 1.2}s`;

    const isHeart = i % 3 === 0;
    if (isHeart) {
      wrapper.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="#F7C5CC" fill-opacity="0.9"/></svg>`;
    } else {
      wrapper.innerHTML = `<svg width="18" height="22" viewBox="0 0 20 24" fill="none"><path d="M10 0C16 4 20 10 20 16C20 20.4 15.5 24 10 24C4.5 24 0 20.4 0 16C0 10 4 4 10 0Z" fill="#F4B8C3" fill-opacity="0.85"/></svg>`;
    }

    document.body.appendChild(wrapper);
    setTimeout(() => {
      if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
    }, 7500);
  }
}

type Phase = 'question' | 'count-picker' | 'confirmed' | 'declined' | 'loading-decline';

interface RsvpSectionProps {
  guestId?: string;
  guestName?: string;
  initialStatus?: 'pending' | 'yes' | 'no';
  initialCount?: number;
}

const cardEase = [0.22, 1, 0.36, 1] as const;

export default function RsvpSection({
  guestId,
  guestName,
  initialStatus,
  initialCount = 1,
}: RsvpSectionProps) {
  const [phase, setPhase] = useState<Phase>('question');
  const [guestCount, setGuestCount] = useState(initialCount > 0 ? initialCount : 1);
  const [submitting, setSubmitting] = useState(false);
  const anonRef = useRef('');

  useEffect(() => {
    if (guestId) {
      if (initialStatus === 'yes') {
        setGuestCount(initialCount > 0 ? initialCount : 1);
        setPhase('confirmed');
      } else if (initialStatus === 'no') {
        setPhase('declined');
      }
      return;
    }

    const saved = loadSavedRsvp();
    if (saved) {
      anonRef.current = localStorage.getItem(ANON_KEY) || '';
      setGuestCount(saved.count);
      setPhase(saved.status === 'yes' ? 'confirmed' : 'declined');
    }
  }, [guestId, initialStatus, initialCount]);

  const postRsvp = async (attending: boolean, count = 1) => {
    const body: Record<string, unknown> = { attending, guestCount: count };
    if (guestId) {
      body.guestId = guestId;
    } else {
      const id = ensureAnonId();
      anonRef.current = id;
      body.anonymousId = id;
    }

    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error('RSVP failed');
    }

    if (!guestId) saveRsvp(attending ? 'yes' : 'no', attending ? count : 0);
  };

  const clearSavedRsvp = async () => {
    try {
      if (guestId) {
        await fetch('/api/rsvp', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ guestId }),
        });
        return;
      }

      const id = localStorage.getItem(ANON_KEY);
      if (id) {
        await fetch('/api/rsvp', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ anonymousId: id }),
        });
      }
    } catch {
      // still clear local UI
    }

    if (!guestId) {
      clearLocalRsvp();
      anonRef.current = '';
    }
  };

  const handleChangeResponse = async () => {
    await clearSavedRsvp();
    setPhase('question');
    setGuestCount(1);
  };

  const decrement = () => setGuestCount((c) => Math.max(1, c - 1));
  const increment = () => setGuestCount((c) => Math.min(25, c + 1));

  const handleClickAttend = () => setPhase('count-picker');

  const handleSubmitCount = async () => {
    setSubmitting(true);
    try {
      await postRsvp(true, guestCount);
      setPhase('confirmed');
      launchSVGPetalConfetti();
    } catch {
      setPhase('count-picker');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDecline = async () => {
    setPhase('loading-decline');
    try {
      await postRsvp(false);
      setPhase('declined');
    } catch {
      setPhase('question');
    }
  };

  return (
    <section
      id="rsvp"
      className="section-shell section-shell--soft"
    >
      <div className="section-inner max-w-xl">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: cardEase }}
          className="mb-7 w-full flex flex-col items-center"
        >
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#8A827B] font-medium mb-2.5">
            R S V P
          </p>
          <h2 className="font-serif-title text-4xl md:text-[3.25rem] text-[#2A2523] font-normal mb-2.5 tracking-tight">
            Will You Attend?
          </h2>
          {guestName ? (
            <p className="font-guest-name text-xl md:text-2xl text-[#9E5A64]">
              Dear {guestName}
            </p>
          ) : (
            <p className="font-serif-body text-xl italic text-[#8A827B]">
              Kindly respond by {weddingConfig.rsvpDeadline}
            </p>
          )}
        </motion.div>

        <div className="w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">

            {phase === 'question' && (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: cardEase }}
                className="surface-card w-full px-6 py-8 md:px-9 md:py-10 flex flex-col gap-4"
              >
                <button
                  id="rsvp-attend-btn"
                  onClick={handleClickAttend}
                  className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#4A6B53] to-[#5A7D62] text-white py-[1.05rem] px-6 text-sm font-medium tracking-wide shadow-[0_12px_32px_rgba(74,107,83,0.22)] transition-all duration-300 hover:shadow-[0_16px_36px_rgba(74,107,83,0.28)] hover:-translate-y-0.5 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2.5">
                    <span className="text-base leading-none">✓</span>
                    <span>Yes, In Sha Allah</span>
                  </span>
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                </button>

                <div className="flex items-center gap-3 px-1">
                  <span className="h-px flex-1 bg-[#E8E2D8]" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#8A827B]">or</span>
                  <span className="h-px flex-1 bg-[#E8E2D8]" />
                </div>

                <button
                  id="rsvp-decline-btn"
                  onClick={handleDecline}
                  className="w-full rounded-full border border-[#E8E2D8] bg-white/70 text-[#8A827B] py-[0.95rem] px-6 text-sm font-medium tracking-wide transition-all duration-300 hover:border-[#9E5A64]/35 hover:text-[#9E5A64] hover:bg-[#FDF8F9] cursor-pointer"
                >
                  Unfortunately, I can&apos;t make it
                </button>
              </motion.div>
            )}

            {phase === 'loading-decline' && (
              <motion.div
                key="loading-decline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="surface-card w-full p-14 flex items-center justify-center"
              >
                <Loader2 size={24} className="animate-spin text-[#9E5A64]" />
              </motion.div>
            )}

            {phase === 'count-picker' && (
              <motion.div
                key="count-picker"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                className="surface-card w-full px-7 py-9 md:px-10 md:py-11 flex flex-col items-center"
              >
                <p className="font-serif-title text-3xl text-[#2A2523] mb-2">
                  Wonderful!
                </p>
                {guestName && (
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#4A6B53] font-semibold mb-7">
                    Details for {guestName}
                  </p>
                )}
                {!guestName && <div className="mb-7" />}

                <p className="font-serif-body text-xl italic text-[#5A534E] mb-8">
                  How many family members will attend?
                </p>

                <div className="bg-[#FDFCF8] border border-[#E8E2D8] rounded-2xl px-6 py-7 mb-7 flex flex-col items-center w-full">
                  <div className="flex items-center justify-center gap-7">
                    <button
                      id="rsvp-decrement-btn"
                      onClick={decrement}
                      disabled={guestCount <= 1}
                      className="w-11 h-11 rounded-full bg-white border border-[#E8E2D8] text-[#2A2523] flex items-center justify-center disabled:opacity-30 hover:border-[#4A6B53] transition-all duration-300 cursor-pointer"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="font-serif-title text-4xl text-[#2A2523] w-14 text-center select-none font-normal">
                      {guestCount}
                    </span>

                    <button
                      id="rsvp-increment-btn"
                      onClick={increment}
                      disabled={guestCount >= 25}
                      className="w-11 h-11 rounded-full bg-white border border-[#E8E2D8] text-[#2A2523] flex items-center justify-center disabled:opacity-30 hover:border-[#4A6B53] transition-all duration-300 cursor-pointer"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#8A827B] mt-5 font-medium">
                    Including yourself
                  </span>
                </div>

                <button
                  id="rsvp-submit-count-btn"
                  onClick={handleSubmitCount}
                  disabled={submitting}
                  className="w-full bg-[#4A6B53] hover:bg-[#3D5A44] text-white text-[11px] tracking-[0.2em] uppercase font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 shadow-[0_10px_28px_rgba(74,107,83,0.2)]"
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  <span>Submit</span>
                </button>
              </motion.div>
            )}

            {phase === 'confirmed' && (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                className="surface-card w-full px-8 py-11 flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#EBF2EC] text-[#4A6B53] flex items-center justify-center mx-auto mb-6 text-2xl">
                  ✓
                </div>

                <h3 className="font-serif-title text-3xl md:text-4xl text-[#2A2523] mb-4">
                  JazakAllah Khair!
                </h3>
                <p className="font-serif-body text-lg md:text-xl italic text-[#5A534E] leading-relaxed mb-8">
                  We look forward to celebrating with you.<br />
                  See you on the 14th, Insha Allah!
                </p>

                <div className="bg-[#EBF2EC] border border-[#4A6B53]/20 rounded-2xl py-4 px-6 mb-7 w-full">
                  <p className="text-xs tracking-[0.2em] uppercase font-semibold text-[#4A6B53]">
                    {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'} Confirmed
                  </p>
                </div>

                <button
                  onClick={handleChangeResponse}
                  className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#8A827B] hover:text-[#2A2523] underline underline-offset-4 cursor-pointer transition-colors"
                >
                  Change response
                </button>
              </motion.div>
            )}

            {phase === 'declined' && (
              <motion.div
                key="declined"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                className="surface-card w-full px-8 py-11 flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F7ECED] text-[#9E5A64] flex items-center justify-center mx-auto mb-6 text-2xl">
                  ♡
                </div>
                <h3 className="font-serif-title text-3xl md:text-4xl text-[#2A2523] mb-4">
                  You Will Be Missed
                </h3>
                <p className="font-serif-body text-lg md:text-xl italic text-[#5A534E] leading-relaxed mb-8">
                We understand you can't make it. Thank you for letting us know. You will be in our duas on this blessed day, and we kindly ask that you keep us in yours as we begin this new journey.
                </p>

                <button
                  onClick={handleChangeResponse}
                  className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#8A827B] hover:text-[#2A2523] underline underline-offset-4 cursor-pointer transition-colors"
                >
                  Change response
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
