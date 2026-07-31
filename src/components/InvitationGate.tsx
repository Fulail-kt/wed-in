'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import { weddingConfig } from '../config/wedding';

const OPEN_DIST = 24;
const REST_LEN = 52;
const MAX_RADIUS = 280;
const SPRING = { type: 'spring' as const, stiffness: 360, damping: 30, mass: 0.55 };
const EASE = [0.22, 1, 0.36, 1] as const;

interface InvitationGateProps {
  guestName?: string;
}

export default function InvitationGate({ guestName }: InvitationGateProps) {
  const [open, setOpen] = useState(false);
  const [pulling, setPulling] = useState(false);
  const openedRef = useRef(false);
  const knotRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const startClientRef = useRef({ x: 0, y: 0 });

  // Seal tip relative to knot (0,0). Rest hang = (0, REST_LEN).
  const sealX = useMotionValue(0);
  const sealY = useMotionValue(REST_LEN);

  const ropePath = useTransform([sealX, sealY], ([sx, sy]) => {
    const x2 = Number(sx);
    const y2 = Number(sy);
    const len = Math.hypot(x2, y2) || 1;
    const taut = Math.min(1, Math.max(0, (len - REST_LEN) / OPEN_DIST));
    const sag = Math.max(2, 20 * (1 - taut * 0.92));
    const mx = x2 * 0.5;
    const my = y2 * 0.5;
    return `M 0 0 Q ${mx.toFixed(1)} ${(my + sag).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  });

  const pullDist = useTransform([sealX, sealY], ([sx, sy]) =>
    Math.hypot(Number(sx), Number(sy) - REST_LEN),
  );
  const sealScale = useTransform(pullDist, [0, OPEN_DIST, MAX_RADIUS], [1, 0.97, 0.92]);
  const hintOpacity = useTransform(pullDist, [0, 12], [1, 0]);
  const progress = useTransform(pullDist, [0, OPEN_DIST], [0, 1]);
  const ringScale = useTransform(progress, [0, 1], [0.96, 1.08]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const unlockAudio = () => {
    window.dispatchEvent(new CustomEvent('wedding:unlock'));
  };

  const setSealFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      const knot = knotRef.current;
      if (!knot) return;
      const rect = knot.getBoundingClientRect();
      const kx = rect.left + rect.width / 2;
      const ky = rect.top + rect.height / 2;
      let dx = clientX - kx;
      let dy = clientY - ky;
      if (dy < 16) dy = 16;
      const d = Math.hypot(dx, dy);
      if (d > MAX_RADIUS) {
        const s = MAX_RADIUS / d;
        dx *= s;
        dy *= s;
      }
      sealX.set(dx);
      sealY.set(dy);
    },
    [sealX, sealY],
  );

  const completeOpen = useCallback(() => {
    if (openedRef.current) return;
    openedRef.current = true;
    // Instant — no wait on spring. Music + main screen same gesture frame.
    window.dispatchEvent(new CustomEvent('wedding:open'));
    setOpen(true);
  }, []);

  const springHome = useCallback(() => {
    void Promise.all([animate(sealX, 0, SPRING), animate(sealY, REST_LEN, SPRING)]);
  }, [sealX, sealY]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary finger / main button
    if (e.button != null && e.button !== 0) return;
    e.preventDefault();
    unlockAudio();
    draggingRef.current = true;
    movedRef.current = false;
    pointerIdRef.current = e.pointerId;
    startClientRef.current = { x: e.clientX, y: e.clientY };
    setPulling(true);
    stageRef.current?.setPointerCapture(e.pointerId);
    // Seal jumps to touch — anywhere on screen
    setSealFromPoint(e.clientX, e.clientY);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || pointerIdRef.current !== e.pointerId) return;
    e.preventDefault();
    setSealFromPoint(e.clientX, e.clientY);
    const moved = Math.hypot(
      e.clientX - startClientRef.current.x,
      e.clientY - startClientRef.current.y,
    );
    if (moved > 8) movedRef.current = true;

    // Open mid-drag — no wait for finger release
    const dist = Math.hypot(sealX.get(), sealY.get() - REST_LEN);
    if (dist >= OPEN_DIST) completeOpen();
  };

  const endPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== e.pointerId) return;
    draggingRef.current = false;
    pointerIdRef.current = null;
    setPulling(false);
    try {
      stageRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // ok
    }

    const dist = Math.hypot(sealX.get(), sealY.get() - REST_LEN);
    // Tap disabled for now — pull only
    if (movedRef.current && dist >= OPEN_DIST) {
      completeOpen();
      return;
    }
    springHome();
  };

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="gate"
          ref={stageRef}
          className="fixed inset-0 z-[70] overflow-hidden touch-none cursor-wedding-pull"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          role="button"
          tabIndex={0}
          aria-label="Touch anywhere and pull to open invitation"
        >
          <div className="absolute inset-0 bg-[#F9F7F2]/40 backdrop-blur-[5px] sm:backdrop-blur-[7px] pointer-events-none" />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 38%, rgba(249,247,242,0.78) 0%, rgba(249,247,242,0.3) 52%, rgba(249,247,242,0.1) 100%)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
            className="relative z-10 h-full flex flex-col items-center justify-center px-5 sm:px-6 text-center safe-pad pointer-events-none"
          >
            <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center">
              <p className="font-arabic text-[1.65rem] sm:text-3xl text-[#2A2523] mb-3 sm:mb-5 leading-loose">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </p>

              {guestName ? (
                <div className="guest-invite-block mx-auto text-center mb-4 sm:mb-6">
                  <p className="guest-invite-block__label">Exclusive Invitation for</p>
                  <p className="guest-invite-block__name">{guestName}</p>
                </div>
              ) : (
                <p className="text-[10px] tracking-[0.28em] uppercase text-[#5A534E] font-medium mb-4 sm:mb-6">
                  You are invited
                </p>
              )}

              <h1 className="font-serif-title text-[1.75rem] sm:text-[2.75rem] text-[#2A2523] font-normal leading-tight mb-1.5 px-1">
                <span className="couple-names">
                  <span className="couple-names__part whitespace-nowrap">{weddingConfig.groom}</span>
                  <span className="couple-names__amp font-serif-body italic">&amp;</span>
                  <span className="couple-names__part whitespace-nowrap">{weddingConfig.bride}</span>
                </span>
              </h1>
              <p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#5A534E] font-medium mb-8 sm:mb-10">
                {weddingConfig.weddingDateDisplay}
              </p>

              <div className="relative flex flex-col items-center select-none">
                <div className="w-8 h-1.5 rounded-full bg-[#C2A166]/70 mb-1" />
                <div
                  ref={knotRef}
                  className="w-2.5 h-2.5 rounded-full bg-[#C2A166] z-30 relative"
                />

                <div className="relative w-[min(100vw-2rem,22rem)] h-[14rem]">
                  <div className="absolute left-1/2 top-0 w-0 h-0">
                    <svg
                      className="absolute left-0 top-0 overflow-visible z-10"
                      width="1"
                      height="1"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient
                          id="ropeGrad"
                          gradientUnits="userSpaceOnUse"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="160"
                        >
                          <stop offset="0%" stopColor="#C2A166" />
                          <stop offset="100%" stopColor="#9E5A64" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>
                      <motion.path
                        d={ropePath}
                        fill="none"
                        stroke="url(#ropeGrad)"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <motion.div
                      style={{ x: sealX, y: sealY, scale: sealScale }}
                      className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1 flex flex-col items-center z-20"
                    >
                      <motion.div
                        animate={pulling ? { y: 0 } : { y: [0, 3, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex flex-col items-center"
                      >
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-[#C2A166] bg-[#F9F7F2] mb-1.5" />

                        <span className="relative w-[5.5rem] h-[5.5rem] sm:w-[5rem] sm:h-[5rem] rounded-full bg-[#9E5A64] shadow-[0_12px_28px_rgba(158,90,100,0.32)] flex items-center justify-center">
                          <span className="absolute inset-[5px] rounded-full border border-[#C2A166]/50" />
                          <span className="font-serif-title text-white text-xl leading-none tracking-wide">
                            G&amp;B
                          </span>
                          <motion.span
                            className="absolute inset-0 rounded-full border-2 border-[#C2A166]"
                            style={{ opacity: progress, scale: ringScale }}
                          />
                        </span>

                        <span className="mt-2 flex gap-[3px]">
                          {[11, 14, 15, 14, 11].map((height, i) => (
                            <span
                              key={i}
                              className="w-[2px] rounded-full bg-[#C2A166]"
                              style={{ height }}
                            />
                          ))}
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

                <motion.p
                  style={{ opacity: hintOpacity }}
                  className="mt-1 text-[11px] tracking-[0.18em] uppercase text-[#5A534E] font-semibold"
                >
                  Touch anywhere · pull to open
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
