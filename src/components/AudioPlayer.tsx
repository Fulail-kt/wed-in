'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2, ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingConfig } from '../config/wedding';
import {
  ensureWeddingAudio,
  getTrackTitle,
  getWeddingAudio,
  onWeddingMetaChange,
  onWeddingPlayChange,
  setUserStopped,
  skipTrack,
  tryPlayUnmuted,
} from '../lib/weddingAudio';

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

  useEffect(() => {
    if (!weddingConfig.musicTracks.length) return;
    const audio = ensureWeddingAudio();
    if (!audio) return;

    setTrackTitle(getTrackTitle());
    setReady(true);

    const onError = () => setError(true);
    const onTime = () => {
      setCurrentTime(audio.currentTime || 0);
      if (audio.duration && Number.isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener('error', onError);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onTime);
    const offPlay = onWeddingPlayChange(setIsPlaying);
    const offMeta = onWeddingMetaChange(() => {
      setTrackTitle(getTrackTitle());
      setCurrentTime(0);
      setDuration(0);
      setError(false);
    });

    return () => {
      audio.removeEventListener('error', onError);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onTime);
      offPlay();
      offMeta();
    };
  }, []);

  const togglePlay = async () => {
    const audio = getWeddingAudio() ?? ensureWeddingAudio();
    if (!audio || error) return;
    if (isPlaying) {
      setUserStopped(true);
      audio.pause();
      return;
    }
    setUserStopped(false);
    await tryPlayUnmuted();
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
                      onClick={() => skipTrack(-1)}
                      disabled={error}
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[#8A827B] hover:text-[#4A6B53] transition-colors cursor-pointer disabled:opacity-30"
                    >
                      <ChevronLeft size={11} strokeWidth={2.5} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next track"
                      onClick={() => skipTrack(1)}
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
