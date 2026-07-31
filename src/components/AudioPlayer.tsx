'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2, ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingConfig } from '../config/wedding';

const KEY = 'wedding_music_i';

function formatTime(secs: number) {
  if (!secs || !Number.isFinite(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);
  const [trackTitle, setTrackTitle] = useState('Wedding');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const indexRef = useRef(0);
  const skipRef = useRef<(dir: 1 | -1) => void>(() => {});
  const disableGestureRef = useRef<() => void>(() => {});

  useEffect(() => {
    const tracks = weddingConfig.musicTracks;
    if (!tracks.length) return;

    const last = Number(sessionStorage.getItem(KEY));
    indexRef.current =
      tracks.length > 1 && Number.isFinite(last)
        ? (last + 1) % tracks.length
        : Math.floor(Math.random() * tracks.length);
    sessionStorage.setItem(KEY, String(indexRef.current));
    setTrackTitle(tracks[indexRef.current].title);

    const audio = new Audio();
    audio.loop = false;
    audio.preload = 'auto';
    audio.volume = 0.4;
    // iOS Safari: treat as inline media, not fullscreen takeover
    audio.setAttribute('playsinline', 'true');
    audio.setAttribute('webkit-playsinline', 'true');
    audio.src = tracks[indexRef.current].url;
    audioRef.current = audio;

    let unlocked = false;
    // First page click starts audio if gate autoplay failed.
    // Manual pause → never auto-start again.
    let allowGestureAutoplay = true;

    const tryPlay = () => {
      const a = audioRef.current;
      if (!a) return Promise.resolve(false);
      a.muted = false;
      const p = a.play();
      if (p && typeof p.then === 'function') {
        return p.then(() => true).catch(() => false);
      }
      return Promise.resolve(true);
    };

    const loadTrack = async (i: number, autoplay: boolean) => {
      indexRef.current = ((i % tracks.length) + tracks.length) % tracks.length;
      sessionStorage.setItem(KEY, String(indexRef.current));
      const track = tracks[indexRef.current];
      setTrackTitle(track.title);
      setCurrentTime(0);
      setDuration(0);
      setError(false);
      audio.src = track.url;
      audio.load();
      if (autoplay) await tryPlay();
    };

    skipRef.current = (dir) => {
      void loadTrack(indexRef.current + dir, true);
    };

    const onError = () => setError(true);
    const onTime = () => {
      setCurrentTime(audio.currentTime || 0);
      if (audio.duration && Number.isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => {
      void loadTrack(indexRef.current + 1, true);
    };
    // Keep UI in sync with real element state
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('error', onError);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onTime);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    const unlockFromGate = () => {
      if (!audioRef.current || unlocked) return;
      const a = audioRef.current;
      const prevMuted = a.muted;
      a.muted = true;
      const p = a.play();
      if (p && typeof p.then === 'function') {
        void p
          .then(() => {
            a.pause();
            a.currentTime = 0;
            a.muted = prevMuted;
            unlocked = true;
          })
          .catch(() => {
            a.muted = prevMuted;
          });
      } else {
        a.muted = prevMuted;
      }
    };

    const playFromGate = () => {
      void tryPlay();
    };

    const onFirstGesture = (e: Event) => {
      if (!allowGestureAutoplay) return;
      const a = audioRef.current;
      if (!a || a.error) return;
      if (!a.paused && !a.ended) return;
      // Skip while gate still open — gate owns that gesture
      const t = e.target;
      if (t instanceof Element && t.closest('[aria-label*="pull to open"]')) return;
      void tryPlay();
    };

    const disableGestureAutoplay = () => {
      allowGestureAutoplay = false;
      window.removeEventListener('pointerdown', onFirstGesture, true);
    };

    disableGestureRef.current = disableGestureAutoplay;

    window.addEventListener('wedding:unlock', unlockFromGate);
    window.addEventListener('wedding:open', playFromGate);
    window.addEventListener('pointerdown', onFirstGesture, true);
    setReady(true);

    return () => {
      window.removeEventListener('wedding:unlock', unlockFromGate);
      window.removeEventListener('wedding:open', playFromGate);
      window.removeEventListener('pointerdown', onFirstGesture, true);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onTime);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || error) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      // User muted — never auto-start from page clicks again
      disableGestureRef.current();
      return;
    }
    try {
      await audio.play();
      setIsPlaying(true);
      // Manual play also means user controls audio now
      disableGestureRef.current();
    } catch {
      // blocked
    }
  };

  const multi = weddingConfig.musicTracks.length > 1;
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const expanded = isHover || isPlaying;

  if (!ready) return null;

  return (
    <div
      className="fixed z-50 bottom-[max(1.125rem,env(safe-area-inset-bottom))] right-3 md:bottom-5 md:right-5"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Mobile: tiny play FAB only — no chrome over content */}
      <button
        id="audio-toggle-btn-mobile"
        onClick={togglePlay}
        disabled={error}
        aria-label={isPlaying ? 'Pause music' : 'Play wedding music'}
        className={`md:hidden w-8 h-8 rounded-full border backdrop-blur-md shadow-[0_4px_14px_rgba(42,37,35,0.08)] flex items-center justify-center disabled:opacity-40 ${
          isPlaying
            ? 'bg-[#4A6B53]/95 border-[#4A6B53] text-white'
            : 'bg-white/80 border-[#E8E2D8]/80 text-[#9E5A64]'
        }`}
      >
        {isPlaying ? (
          <span className="flex items-end gap-[1.5px] h-2.5">
            {[4, 7, 5, 8, 4].map((h, i) => (
              <span
                key={i}
                className="sound-bar-elem"
                style={{ height: h, animationDelay: `${i * 0.1}s`, backgroundColor: '#FFFFFF' }}
              />
            ))}
          </span>
        ) : (
          <Music2 size={12} strokeWidth={1.75} />
        )}
      </button>

      {/* Desktop: original expand player + tiny skip at progress end */}
      <motion.div
        layout
        className={`hidden md:flex items-center border border-[#E8E2D8]/90 bg-white/90 backdrop-blur-md shadow-[0_8px_28px_rgba(42,37,35,0.08)] overflow-hidden ${
          expanded ? 'rounded-2xl pl-1.5 pr-3.5 py-1.5 gap-3' : 'rounded-full'
        }`}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          id="audio-toggle-btn"
          onClick={togglePlay}
          disabled={error}
          aria-label={isPlaying ? 'Pause music' : 'Play wedding music'}
          title={error ? 'Music failed to load' : undefined}
          className={`shrink-0 flex items-center justify-center cursor-pointer disabled:opacity-40 transition-colors duration-300 ${
            expanded
              ? 'w-9 h-9 rounded-xl bg-[#4A6B53] text-white hover:bg-[#3D5A44]'
              : 'w-11 h-11 rounded-full text-[#9E5A64] hover:bg-[#F7ECED]/80'
          }`}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="waves"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
                className="flex items-end gap-[2.5px] h-3.5"
              >
                {[6, 11, 8, 13, 7].map((h, i) => (
                  <span
                    key={i}
                    className="sound-bar-elem"
                    style={{
                      height: h,
                      animationDelay: `${i * 0.1}s`,
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Music2 size={15} strokeWidth={1.75} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              key="meta"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-1.5 overflow-hidden min-w-[8.25rem] max-w-[11rem]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] tracking-[0.12em] uppercase font-medium text-[#8A827B] truncate">
                  {error ? 'Unavailable' : trackTitle}
                </span>
                {!error && (
                  <span className="text-[10px] tabular-nums text-[#8A827B] shrink-0">
                    {formatTime(currentTime)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="relative flex-1 h-1 rounded-full bg-[#E8E2D8] overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-[#9E5A64] transition-[width] duration-200 ease-out"
                    style={{ width: `${error ? 0 : progress}%` }}
                  />
                </div>
                {multi && (
                  <div className="flex items-center gap-0.5 shrink-0 -mr-0.5">
                    <button
                      type="button"
                      aria-label="Previous track"
                      onClick={() => skipRef.current(-1)}
                      disabled={error}
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[#8A827B] hover:text-[#4A6B53] transition-colors cursor-pointer disabled:opacity-30"
                    >
                      <ChevronLeft size={11} strokeWidth={2.5} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next track"
                      onClick={() => skipRef.current(1)}
                      disabled={error}
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[#8A827B] hover:text-[#4A6B53] transition-colors cursor-pointer disabled:opacity-30"
                    >
                      <ChevronRight size={11} strokeWidth={2.5} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
