'use client';
import { useEffect, useRef } from 'react';

const HEART =
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="#F7C5CC" fill-opacity="0.85"/></svg>`;
const PETAL_A =
  `<svg width="18" height="22" viewBox="0 0 20 24" fill="none"><path d="M10 0C16 4 20 10 20 16C20 20.4 15.5 24 10 24C4.5 24 0 20.4 0 16C0 10 4 4 10 0Z" fill="#F4B8C3" fill-opacity="0.75"/></svg>`;
const PETAL_B =
  `<svg width="16" height="20" viewBox="0 0 18 22" fill="none"><path d="M9 0C14.5 3.5 18 9 18 14.5C18 18.5 14 22 9 22C4 22 0 18.5 0 14.5C0 9 3.5 3.5 9 0Z" fill="#E8A2AF" fill-opacity="0.8"/></svg>`;

export default function FallingPetals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fewer petals on mobile — better FPS / battery
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const count = mobile ? 7 : 22;

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'petal-element';
      el.style.left = `${2 + ((i * (96 / count) + Math.random() * 2) % 96)}%`;
      el.style.animationDuration = `${7 + Math.random() * 8}s`;
      el.style.animationDelay = `${-(Math.random() * 15)}s`;
      el.style.transform = `scale(${0.65 + Math.random() * 0.5})`;
      el.innerHTML = i % 3 === 0 ? HEART : i % 2 === 0 ? PETAL_A : PETAL_B;
      container.appendChild(el);
    }

    return () => {
      container.replaceChildren();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
    />
  );
}
