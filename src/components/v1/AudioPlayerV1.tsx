'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Music2 } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';
import {
  ensureWeddingAudio,
  getTrackTitle,
  getWeddingAudio,
  onWeddingMetaChange,
  onWeddingPlayChange,
  setUserStopped,
  skipTrack,
  tryPlayUnmuted,
} from '../../lib/weddingAudio';
import { v1Tw } from './v1Tw';

const MOBILE_EXPAND_MS = 10_000;

function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
}

export default function AudioPlayerV1() {
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [trackTitle, setTrackTitle] = useState('Wedding');
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const collapseTimer = useRef<number | null>(null);
  const multi = weddingConfig.musicTracks.length > 1;

  const clearCollapseTimer = () => {
    if (collapseTimer.current !== null) {
      window.clearTimeout(collapseTimer.current);
      collapseTimer.current = null;
    }
  };

  const expandMobile = () => {
    if (!isMobileViewport()) return;
    setMobileExpanded(true);
    clearCollapseTimer();
    collapseTimer.current = window.setTimeout(() => {
      setMobileExpanded(false);
      collapseTimer.current = null;
    }, MOBILE_EXPAND_MS);
  };

  useEffect(() => {
    if (!weddingConfig.musicTracks.length) return;
    const audio = ensureWeddingAudio();
    if (!audio) return;
    setTrackTitle(getTrackTitle());
    setReady(true);
    const offPlay = onWeddingPlayChange(setPlaying);
    const offMeta = onWeddingMetaChange(() => setTrackTitle(getTrackTitle()));
    return () => {
      offPlay();
      offMeta();
      clearCollapseTimer();
    };
  }, []);

  if (!ready) return null;

  const toggle = async () => {
    const audio = getWeddingAudio() ?? ensureWeddingAudio();
    if (!audio) return;
    if (playing) {
      setUserStopped(true);
      audio.pause();
      return;
    }
    setUserStopped(false);
    await tryPlayUnmuted();
  };

  const onPillClick = () => {
    if (!isMobileViewport()) return;
    if (!mobileExpanded) expandMobile();
  };

  const onPlayClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobileViewport()) expandMobile();
    await toggle();
  };

  const onSkip = (dir: -1 | 1) => {
    if (isMobileViewport()) expandMobile();
    skipTrack(dir);
  };

  return (
    <div className={v1Tw.audioWrap}>
      <div
        className={`${v1Tw.audioPill} ${mobileExpanded ? v1Tw.audioPillExpanded : v1Tw.audioPillCompact}`}
        onClick={onPillClick}
      >
        <button
          id="audio-toggle-btn"
          type="button"
          onClick={onPlayClick}
          aria-label={playing ? 'Pause music' : 'Play wedding music'}
          className={v1Tw.audioBtn}
        >
          {playing ? (
            <span className="flex h-3 items-end gap-px md:h-3.5 md:gap-0.5">
              {[4, 7, 5, 8, 4].map((h, i) => (
                <span
                  key={i}
                  className={v1Tw.eqBar}
                  style={{ height: h, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </span>
          ) : (
            <Music2 className="size-3 md:size-[13px]" strokeWidth={1.75} />
          )}
        </button>

        <span className={`${v1Tw.audioTrack} hidden md:block`}>{trackTitle}</span>

        {multi ? (
          <div
            className={`items-center ${mobileExpanded ? 'flex' : 'hidden'} md:flex`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Previous track"
              onClick={() => onSkip(-1)}
              className={v1Tw.audioSkipBtn}
            >
              <ChevronLeft className="size-3 md:size-[13px]" strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Next track"
              onClick={() => onSkip(1)}
              className={v1Tw.audioSkipBtn}
            >
              <ChevronRight className="size-3 md:size-[13px]" strokeWidth={2} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
