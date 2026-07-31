'use client';
import { useEffect, useRef } from 'react';

type Floater = {
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  phase: number;
  side: 'left' | 'right' | 'full';
};

type Speck = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
};

type TrailDot = {
  x: number;
  y: number;
  ease: number;
  size: number;
  opacity: number;
};

/** Rising petals + desktop cursor trail + click heart burst. */
export default function PageAmbience() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const floaters: Floater[] = [];

    if (mobile) {
      for (let i = 0; i < 6; i++) {
        floaters.push({
          x: 0.08 + Math.random() * 0.84,
          y: Math.random(),
          speed: 0.0011 + Math.random() * 0.0012,
          size: 5 + Math.random() * 5,
          opacity: 0.28 + Math.random() * 0.3,
          phase: Math.random() * Math.PI * 2,
          side: 'full',
        });
      }
    } else {
      for (let i = 0; i < 16; i++) {
        const left = i % 2 === 0;
        floaters.push({
          x: left ? 0.02 + Math.random() * 0.12 : 0.86 + Math.random() * 0.12,
          y: Math.random(),
          speed: 0.0014 + Math.random() * 0.0016,
          size: 5 + Math.random() * 7,
          opacity: 0.4 + Math.random() * 0.35,
          phase: Math.random() * Math.PI * 2,
          side: left ? 'left' : 'right',
        });
      }
    }

    const specks: Speck[] = [];
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, on: false };

    // Soft lag chain behind cursor (desktop only)
    const trail: TrailDot[] = mobile
      ? []
      : Array.from({ length: 8 }, (_, i) => ({
          x: mouse.x,
          y: mouse.y,
          ease: 0.18 - i * 0.015,
          size: 10 - i * 0.7,
          opacity: 0.55 - i * 0.055,
        }));

    const burst = (x: number, y: number) => {
      const n = mobile ? 6 : 9;
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 1.2 + Math.random() * 2.4;
        specks.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s - 1.2,
          life: 1,
          size: 8 + Math.random() * 8,
        });
      }
      while (specks.length > 40) specks.shift();
    };

    const onDown = (e: PointerEvent) => {
      burst(e.clientX, e.clientY);
    };

    const onMove = (e: PointerEvent) => {
      if (mobile) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.on = true;
    };

    const onLeave = () => {
      mouse.on = false;
    };

    let raf = 0;
    const els: HTMLSpanElement[] = floaters.map(() => {
      const el = document.createElement('span');
      el.style.cssText =
        'position:absolute;border-radius:60% 60% 55% 15%;background:linear-gradient(180deg,#F4B8C3,#E8A2AF);will-change:transform;pointer-events:none';
      layer.appendChild(el);
      return el;
    });

    const trailEls: HTMLSpanElement[] = trail.map((t) => {
      const el = document.createElement('span');
      const r = Math.round(t.size);
      el.style.cssText =
        'position:absolute;will-change:transform,opacity;pointer-events:none;opacity:0';
      el.innerHTML = `<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none"><path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="#F4B8C3" fill-opacity="0.9"/></svg>`;
      layer.appendChild(el);
      return el;
    });

    const speckLayer = document.createElement('div');
    speckLayer.style.cssText = 'position:absolute;inset:0;pointer-events:none';
    layer.appendChild(speckLayer);

    const MAX_SPECKS = 36;
    const speckEls: HTMLSpanElement[] = Array.from({ length: MAX_SPECKS }, () => {
      const el = document.createElement('span');
      el.style.cssText =
        'position:absolute;pointer-events:none;opacity:0;transform:translate(-50%,-50%)';
      el.setAttribute('aria-hidden', 'true');
      speckLayer.appendChild(el);
      return el;
    });

    const speckSvg = (r: number) =>
      `<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none"><path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="#F4B8C3" fill-opacity="0.9"/></svg>`;

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      for (let i = 0; i < floaters.length; i++) {
        const f = floaters[i];
        f.y += f.speed;
        f.phase += 0.012;
        if (f.y > 1.06) {
          f.y = -0.04;
          if (f.side === 'left') f.x = 0.02 + Math.random() * 0.12;
          else if (f.side === 'right') f.x = 0.86 + Math.random() * 0.12;
          else f.x = 0.08 + Math.random() * 0.84;
        }
        const px = f.x * w + Math.sin(f.phase) * 8;
        const py = (1 - f.y) * h;
        const el = els[i];
        el.style.width = `${f.size}px`;
        el.style.height = `${f.size * 1.25}px`;
        el.style.opacity = String(f.opacity);
        el.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%,-50%) rotate(${Math.sin(f.phase) * 16}deg)`;
      }

      // Cursor trail — lerp chain, desktop only
      if (trail.length) {
        let tx = mouse.x;
        let ty = mouse.y;
        for (let i = 0; i < trail.length; i++) {
          const d = trail[i];
          d.x += (tx - d.x) * d.ease;
          d.y += (ty - d.y) * d.ease;
          tx = d.x;
          ty = d.y;
          const el = trailEls[i];
          el.style.opacity = mouse.on ? String(d.opacity) : '0';
          el.style.transform = `translate3d(${d.x}px, ${d.y}px, 0) translate(-50%,-50%) scale(${mouse.on ? 1 : 0.6})`;
        }
      }

      for (let i = specks.length - 1; i >= 0; i--) {
        const s = specks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.035;
        s.life -= 0.04;
        if (s.life <= 0) specks.splice(i, 1);
      }

      for (let i = 0; i < MAX_SPECKS; i++) {
        const s = specks[i];
        const el = speckEls[i];
        if (!s) {
          el.style.opacity = '0';
          continue;
        }
        const r = Math.round(s.size);
        if (el.dataset.r !== String(r)) {
          el.dataset.r = String(r);
          el.innerHTML = speckSvg(r);
        }
        el.style.left = `${s.x}px`;
        el.style.top = `${s.y}px`;
        el.style.opacity = String(s.life * 0.85);
        el.style.transform = `translate(-50%,-50%) scale(${0.6 + s.life * 0.4})`;
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
      layer.replaceChildren();
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[35] overflow-hidden"
    />
  );
}
