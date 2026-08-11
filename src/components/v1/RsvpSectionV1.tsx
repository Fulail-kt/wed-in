'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Minus, Plus, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../../config/wedding';
import { v1Tw } from './v1Tw';

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

function softBurst() {
  confetti({
    particleCount: 45,
    spread: 70,
    origin: { y: 0.65 },
    colors: ['#c9a84c', '#5a7a8f', '#1a3a4a', '#d4b88a', '#8fafc0'],
    ticks: 220,
    gravity: 0.88,
    scalar: 0.9,
  });
}

type Phase = 'question' | 'count-picker' | 'confirmed' | 'declined' | 'loading-decline';

interface Props {
  guestId?: string;
  guestName?: string;
  initialStatus?: 'pending' | 'yes' | 'no';
  initialCount?: number;
}

export default function RsvpSectionV1({
  guestId,
  guestName,
  initialStatus,
  initialCount = 1,
}: Props) {
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
    if (guestId) body.guestId = guestId;
    else {
      const id = ensureAnonId();
      anonRef.current = id;
      body.anonymousId = id;
    }
    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('RSVP failed');
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
      // ignore
    }
    if (!guestId) {
      clearLocalRsvp();
      anonRef.current = '';
    }
  };

  const handleSubmitCount = async () => {
    setSubmitting(true);
    try {
      await postRsvp(true, guestCount);
      setPhase('confirmed');
      softBurst();
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
    <motion.section
      id="rsvp"
      className={v1Tw.rsvpSection}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="mb-5 text-center">
        <p className={v1Tw.rsvpSub}>R · S · V · P</p>
        <p className={v1Tw.rsvpTitle}>Will you attend?</p>
        {guestName ? (
          <p className={v1Tw.rsvpGuest}>Dear {guestName}</p>
        ) : (
          <p className={v1Tw.rsvpDeadline}>
            Kindly respond by {weddingConfig.rsvpDeadline}
          </p>
        )}
      </div>

      {/* Phase transitions */}
      <AnimatePresence mode="wait">
        {phase === 'question' && (
          <motion.div
            key="q"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <button
              id="rsvp-attend-btn"
              type="button"
              onClick={() => setPhase('count-picker')}
              className={v1Tw.rsvpBtnYes}
            >
              ✓ &nbsp; Yes, In Sha Allah
            </button>
            <button
              id="rsvp-decline-btn"
              type="button"
              onClick={handleDecline}
              className={v1Tw.rsvpBtnNo}
            >
              Unfortunately, I can't make it
            </button>
          </motion.div>
        )}

        {phase === 'loading-decline' && (
          <motion.div
            key="load"
            className="flex justify-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className="animate-spin text-v1-navy" size={24} />
          </motion.div>
        )}

        {phase === 'count-picker' && (
          <motion.div
            key="count"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ position: 'relative' }}
          >
            <button
              id="rsvp-count-back-btn"
              type="button"
              onClick={() => setPhase('question')}
              className={`${v1Tw.rsvpClose} top-0`}
              aria-label="Close"
            >
              <X size={16} strokeWidth={1.75} />
            </button>

            <p className={`${v1Tw.rsvpTitle} mb-1`}>Wonderful!</p>
            {guestName && (
              <p className={`${v1Tw.rsvpMicroLabel} mb-3`}>Details for {guestName}</p>
            )}
            <p className={`${v1Tw.rsvpPhaseHint} mb-4`}>How many guests will attend?</p>

            <div className={v1Tw.counterBox}>
              <button
                id="rsvp-decrement-btn"
                type="button"
                className={v1Tw.counterBtn}
                onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                disabled={guestCount <= 1}
              >
                <Minus size={16} strokeWidth={2} />
              </button>
              <span className={v1Tw.counterNum}>{guestCount}</span>
              <button
                id="rsvp-increment-btn"
                type="button"
                className={v1Tw.counterBtn}
                onClick={() => setGuestCount((c) => Math.min(25, c + 1))}
                disabled={guestCount >= 25}
              >
                <Plus size={16} strokeWidth={2} />
              </button>
            </div>

            <p className={`${v1Tw.rsvpMicroLabel} mb-4`}>Including yourself</p>

            <button
              id="rsvp-submit-count-btn"
              type="button"
              className={`${v1Tw.submitBtn}${submitting ? ' opacity-65' : ''}`}
              onClick={handleSubmitCount}
              disabled={submitting}
            >
              {submitting && <Loader2 size={15} className="animate-spin" />}
              Confirm Attendance
            </button>
          </motion.div>
        )}

        {phase === 'confirmed' && (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div className={v1Tw.rsvpCheck}>✓</div>
            <p className={`${v1Tw.rsvpTitle} mb-2`}>JazakAllah Khair!</p>
            <p className={`${v1Tw.rsvpPhaseHint} mb-4`}>
              We look forward to celebrating with you.
              <br />
              See you on {weddingConfig.weddingDateDisplay}, Insha Allah!
            </p>
            <div className="flex flex-col items-center gap-1">
              <p className={`${v1Tw.rsvpBadge} mb-0`}>
                {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'} Confirmed
              </p>
              <button
                type="button"
                onClick={async () => {
                  await clearSavedRsvp();
                  setPhase('question');
                  setGuestCount(1);
                }}
                className={v1Tw.rsvpLink}
              >
                Change response
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'declined' && (
          <motion.div
            key="no"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className={v1Tw.rsvpHeart}>♡</div>
            <p className={`${v1Tw.rsvpTitle} mb-2`}>You Will Be Missed</p>
            <p className={`${v1Tw.rsvpPhaseHint} mb-3`}>
              We understand you can&apos;t make it. Thank you for letting us know.
              <br />
              You will be in our duas on this blessed day.
              <br />
              Please keep us in your duas as we begin this new journey.
            </p>
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={async () => {
                  await clearSavedRsvp();
                  setPhase('question');
                  setGuestCount(1);
                }}
                className={v1Tw.rsvpLink}
              >
                Change response
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
