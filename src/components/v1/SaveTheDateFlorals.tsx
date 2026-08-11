/**
 * Save-the-date florals — falling leaves/flowers + sticky bottom garden strip.
 */
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties } from 'react';

const A = '/assets/reference-assets/';
const GARDEN_SRC = 'bg-erased-crop.png';
const SRC_W = 595;
const SRC_H = 842;
const GARDEN_FRAC = 0.36;
const TILE_OVERLAP = 0.08;

const FALL_ASSETS = [
  'single-yellow-green-leaf.png',
  'blue-leaf-1.png',
  'yellow-flower.png',
] as const;

type FallAsset = (typeof FALL_ASSETS)[number];

type FallingSpec = {
  id: number;
  src: FallAsset;
  left: number;
  sizeRem: number;
  duration: number;
  delay: number;
  sway: number;
  drift: number;
  rotStart: number;
  opacity: number;
};

function fallCount(mobile: boolean) {
  return mobile ? 24 : 22;
}

function buildFalling(mobile: boolean): FallingSpec[] {
  const count = fallCount(mobile);
  const sizeMin = mobile ? 1.55 : 1.5;
  const sizeRange = mobile ? 1 : 0.95;
  const durationMin = mobile ? 7.5 : 9;
  const durationRange = mobile ? 7.5 : 11;
  const staggerSpan = mobile ? 16 : 22;

  return Array.from({ length: count }, (_, i) => {
    const duration = durationMin + Math.random() * durationRange;
    const phase = (i / count) * staggerSpan;
    const jitter = Math.random() * (staggerSpan / count);

    return {
      id: i,
      src: FALL_ASSETS[i % FALL_ASSETS.length]!,
      left: 1 + ((i * (97 / count) + Math.random() * 4) % 97),
      sizeRem: sizeMin + Math.random() * sizeRange,
      duration,
      delay: -(phase + jitter),
      sway: 18 + Math.random() * 42,
      drift: (Math.random() - 0.5) * 48,
      rotStart: Math.random() * 360,
      opacity: 0.45 + Math.random() * 0.3,
    };
  });
}

function tileWidth(gardenHeight: number) {
  const fullH = gardenHeight / GARDEN_FRAC;
  return fullH * (SRC_W / SRC_H);
}

export function FallingFlorals() {
  const [items, setItems] = useState<FallingSpec[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(max-width: 767px)');
    const apply = () => setItems(buildFalling(mq.matches));
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  if (!mounted || !items.length) return null;

  return createPortal(
    <div
      className="v1-falling-florals pointer-events-none fixed inset-0 z-[28] overflow-hidden"
      aria-hidden="true"
    >
      {items.map((item) => (
        <img
          key={item.id}
          src={`${A}${item.src}`}
          alt=""
          className="absolute -top-[4%] block h-auto animate-v1-leaf-fall origin-center select-none drop-shadow-[0_1px_3px_rgba(15,44,58,0.07)]"
          draggable={false}
          style={
            {
              left: `${item.left}%`,
              width: `${item.sizeRem}rem`,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
              WebkitAnimationDuration: `${item.duration}s`,
              WebkitAnimationDelay: `${item.delay}s`,
              '--v1-sway': `${item.sway}px`,
              '--v1-drift': `${item.drift}px`,
              '--v1-rot-start': `${item.rotStart}deg`,
              '--v1-fall-opacity': item.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>,
    document.body,
  );
}

export function StickyGarden() {
  const gardenRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(5);

  useEffect(() => {
    const update = () => {
      const el = gardenRef.current;
      if (!el) return;
      const h = el.offsetHeight || 220;
      const w = tileWidth(h);
      const step = w * (1 - TILE_OVERLAP);
      setCount(Math.max(3, Math.ceil(window.innerWidth / step) + 2));
    };

    update();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    if (ro && gardenRef.current) ro.observe(gardenRef.current);
    window.addEventListener('resize', update);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-v1-garden overflow-hidden"
      ref={gardenRef}
      aria-hidden="true"
    >
      <div className="absolute bottom-0 left-1/2 flex h-full min-w-full w-max -translate-x-1/2 flex-row items-end justify-center">
        {Array.from({ length: count }, (_, i) => (
          <img
            key={i}
            src={`${A}${GARDEN_SRC}`}
            alt=""
            className={`block h-v1-garden-tile w-v1-garden-tile shrink-0 object-cover object-bottom select-none drop-shadow-[0_2px_6px_rgba(15,44,58,0.1)] ${i > 0 ? '-ml-v1-garden-overlap' : ''}`}
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}
