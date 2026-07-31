'use client';
import { useState, useRef, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from 'framer-motion';
import { weddingConfig } from '../config/wedding';

const PULL_THRESHOLD = 32;
const MAX_PULL = 52;
const SPRING_OPEN = { type: 'spring' as const, stiffness: 260, damping: 24, mass: 0.75 };
const SPRING_BACK = { type: 'spring' as const, stiffness: 420, damping: 32, mass: 0.55 };
const EASE = [0.22, 1, 0.36, 1] as const;

interface InvitationGateProps {
  guestName?: string;
}

export default function InvitationGate({ guestName }: InvitationGateProps) {
  const [open, setOpen] = useState(false);
  const [pulling, setPulling] = useState(false);
  const openedRef = useRef(false);
  const didDragRef = useRef(false);
  const pullY = useMotionValue(0);
  const stringHeight = useTransform(pullY, [0, MAX_PULL], [40, 40 + MAX_PULL]);
  const sealScale = useTransform(pullY, [0, PULL_THRESHOLD, MAX_PULL], [1, 0.98, 0.94]);
  const hintOpacity = useTransform(pullY, [0, 18], [1, 0]);
  const progress = useTransform(pullY, [0, PULL_THRESHOLD], [0, 1]);
  const ringScale = useTransform(progress, [0, 1], [0.96, 1.06]);

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

  const completeOpen = () => {
    if (openedRef.current) return;
    openedRef.current = true;
    setOpen(true);
    window.dispatchEvent(new CustomEvent('wedding:open'));
  };

  const snapOpen = () => {
    void animate(pullY, MAX_PULL, SPRING_OPEN).then(completeOpen);
  };

  const onDragStart = () => {
    didDragRef.current = false;
    setPulling(true);
  };

  const onDrag = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.y) > 4) didDragRef.current = true;
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    setPulling(false);
    if (info.offset.y >= PULL_THRESHOLD || info.velocity.y > 350) {
      snapOpen();
      return;
    }
    void animate(pullY, 0, SPRING_BACK);
  };

  const onTapPull = () => {
    if (didDragRef.current) return;
    snapOpen();
  };

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="gate"
          className="fixed inset-0 z-[70] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          <motion.div
            className="absolute inset-0 bg-[#F9F7F2]/40 backdrop-blur-[5px] sm:backdrop-blur-[7px]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 38%, rgba(249,247,242,0.78) 0%, rgba(249,247,242,0.3) 52%, rgba(249,247,242,0.1) 100%)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="relative z-10 h-full flex flex-col items-center justify-center px-5 sm:px-6 text-center safe-pad"
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

              <div className="relative flex flex-col items-center select-none touch-none cursor-wedding-pull">
                <div className="w-8 h-1.5 rounded-full bg-[#C2A166]/70 mb-1" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#C2A166] z-10" />

                <motion.div
                  className="origin-top"
                  animate={pulling ? { rotate: 0 } : { rotate: [-1.2, 1.2, -1.2] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <motion.div
                    className="mx-auto w-[2px] bg-gradient-to-b from-[#C2A166] via-[#C2A166]/90 to-[#9E5A64]/70"
                    style={{ height: stringHeight }}
                  />

                  <motion.button
                    type="button"
                    aria-label="Pull or tap to open invitation"
                    drag="y"
                    dragConstraints={{ top: 0, bottom: MAX_PULL }}
                    dragElastic={0.06}
                    dragMomentum={false}
                    style={{ y: pullY, scale: sealScale }}
                    onDragStart={onDragStart}
                    onDrag={onDrag}
                    onDragEnd={onDragEnd}
                    onClick={onTapPull}
                    className="relative -mt-1 border-0 bg-transparent p-0 flex flex-col items-center outline-none cursor-wedding-pull touch-drag-y"
                  >
                    <motion.div
                      animate={pulling ? { y: 0 } : { y: [0, 5, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex flex-col items-center"
                    >
                      <span className="w-4 h-4 rounded-full border-2 border-[#C2A166] bg-[#F9F7F2] mb-1.5" />

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
                  </motion.button>
                </motion.div>

                <motion.div
                  style={{ opacity: hintOpacity }}
                  className="mt-5 flex flex-col items-center gap-0.5 text-[#9E5A64]"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="text-base leading-none opacity-40">↓</span>
                  <span className="text-base leading-none">↓</span>
                </motion.div>

                <motion.p
                  style={{ opacity: hintOpacity }}
                  className="mt-3 text-[11px] tracking-[0.22em] uppercase text-[#5A534E] font-semibold"
                >
                  Swipe down or tap to open
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
