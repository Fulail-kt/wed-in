'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../../config/wedding';
import {
  ensureWeddingAudio,
  gateAudioPlay,
  gateAudioStart,
} from '../../lib/weddingAudio';
import { v1Tw } from './v1Tw';

const EASE = [0.33, 1, 0.38, 1] as const;
const OPEN_MS = 520;

type LeafSpec = { id: string; src: string; wrap: string; img: string };

/** Mobile only — your tuned alignment */
const MOBILE_LEAVES: LeafSpec[] = [
  {
    id: 'm-tl',
    src: '/assets/green-leves-2.png',
    wrap: 'absolute top-0 left-0 h-[38vh] w-[40vw] overflow-hidden',
    img: 'absolute -top-10 right-0 w-[128%] max-w-none rotate-[260deg] opacity-[0.92]',
  },
  {
    id: 'm-tr-a',
    src: '/assets/reference-assets/blue-leaf-2.png',
    wrap: 'absolute top-0 right-0 h-[20vh] w-[30vw] overflow-hidden',
    img: 'absolute -top-[25%] -right-[40%] w-[120%] max-w-none rotate-[190deg] opacity-[0.88]',
  },
  {
    id: 'm-tr-b',
    src: '/assets/reference-assets/blue-leaf-2.png',
    wrap: 'absolute top-0 right-0 h-[20vh] w-[30vw] overflow-hidden',
    img: 'absolute -top-[25%] -right-[60%] w-[120%] max-w-none rotate-[160deg] opacity-[0.88]',
  },
  {
    id: 'm-bl-a',
    src: '/assets/green-leves-3.png',
    wrap: 'absolute bottom-0 left-0 h-[40vh] w-[40vw] overflow-hidden',
    img: 'absolute -bottom-[22%] -left-[38%] w-[132%] max-w-none rotate-[9deg] opacity-[0.86]',
  },
  {
    id: 'm-bl-b',
    src: '/assets/green-leves-3.png',
    wrap: 'absolute bottom-0 left-0 h-[40vh] w-[40vw] overflow-hidden',
    img: 'absolute -bottom-[22%] -left-[40%] w-[132%] max-w-none rotate-[-20deg] opacity-[0.86]',
  },
];

/** Desktop — no corner leaves on cover (main page florals enough) */
const DESKTOP_LEAVES: LeafSpec[] = [];

function LeafLayer({ leaves, className }: { leaves: LeafSpec[]; className: string }) {
  if (!leaves.length) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 z-[2] ${className}`} aria-hidden="true">
      {leaves.map(({ id, src, wrap, img }) => (
        <div key={id} className={wrap}>
          <img src={src} alt="" className={`${img} select-none`} draggable={false} />
        </div>
      ))}
    </div>
  );
}

function CornerLeaves() {
  return (
    <>
      <LeafLayer leaves={MOBILE_LEAVES} className="md:hidden" />
      <LeafLayer leaves={DESKTOP_LEAVES} className="hidden md:block" />
    </>
  );
}

interface Props {
  guestName?: string;
}

export default function InvitationGateV1({ guestName }: Props) {
  const [open, setOpen] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    ensureWeddingAudio();
    document.body.style.overflow = open ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const openInvite = () => {
    if (open || opening) return;
    gateAudioStart(false);
    setOpening(true);
    gateAudioPlay();
    window.setTimeout(() => setOpen(true), OPEN_MS);
  };

  return (
    <AnimatePresence>
      {!open && (
        <motion.button
          key="gate"
          type="button"
          onClick={openInvite}
          onPointerDown={() => gateAudioStart(false)}
          disabled={opening}
          aria-label="Click anywhere to open your wedding invitation"
          className={v1Tw.gateShell}
          initial={{ opacity: 0 }}
          animate={{ opacity: opening ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: opening ? 0.52 : 0.4, ease: EASE }}
        >
          <div
            className={`${v1Tw.gateFrost} transition-all duration-500 ease-out ${opening ? 'bg-white/0 backdrop-blur-none' : ''}`}
          />

          <CornerLeaves />

          <div className={`${v1Tw.gateTopSpace} md:hidden`} aria-hidden="true" />

          <div className="relative z-[4] flex w-full flex-col items-center md:max-w-md">
            <p className={v1Tw.gateArabic}>
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>

            <motion.div
              className={v1Tw.gateCoverCenter}
              initial={{ opacity: 0, y: 22 }}
              animate={
                opening
                  ? { opacity: 0, y: -18, scale: 0.96 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              transition={{ duration: opening ? 0.38 : 0.55, ease: EASE, delay: opening ? 0 : 0.08 }}
            >
              <div className={v1Tw.gateCoverPanel}>
                {guestName ? (
                  <p className={v1Tw.gateCoverGuest}>For {guestName}</p>
                ) : null}

                <div className={v1Tw.gateCoverRule} aria-hidden="true" />

                <div className={v1Tw.gateCoverNames}>
                  <p className={v1Tw.gateCoverBride}>{weddingConfig.bride}</p>
                  <p className={v1Tw.gateCoverAmp}>&</p>
                  <p className={v1Tw.gateCoverGroom}>{weddingConfig.groom}</p>
                </div>

                <div className={v1Tw.gateCoverRuleBottom} aria-hidden="true" />
              </div>
            </motion.div>
          </div>

          <motion.p
            className={v1Tw.gateHint}
            initial={{ opacity: 0 }}
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ delay: 0.45, duration: 0.35 }}
          >
            <span className={v1Tw.gateHintInner}>click anywhere</span>
          </motion.p>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
