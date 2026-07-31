import { weddingConfig } from '../config/wedding';

const KEY = 'wedding_music_i';
const tracks = weddingConfig.musicTracks;

let audio: HTMLAudioElement | null = null;
let index = 0;
let committed = false;
let userStopped = false;
const playListeners = new Set<(playing: boolean) => void>();
const metaListeners = new Set<() => void>();

function pickIndex() {
  if (!tracks.length) return 0;
  const last = Number(sessionStorage.getItem(KEY));
  index =
    tracks.length > 1 && Number.isFinite(last)
      ? (last + 1) % tracks.length
      : Math.floor(Math.random() * tracks.length);
  sessionStorage.setItem(KEY, String(index));
  return index;
}

function playNow(a: HTMLAudioElement) {
  a.muted = false;
  const p = a.play();
  if (!p || typeof p.then !== 'function') return;
  void p.catch(() => {
    if (userStopped) return;
    a.addEventListener(
      'canplay',
      () => {
        if (!userStopped) void a.play().catch(() => {});
      },
      { once: true },
    );
  });
}

/** Create + preload once. */
export function ensureWeddingAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined' || audio) return audio;
  if (!tracks.length) return null;

  pickIndex();
  const a = document.createElement('audio');
  a.preload = 'auto';
  a.volume = 0.4;
  a.playsInline = true;
  a.setAttribute('playsinline', 'true');
  a.setAttribute('webkit-playsinline', 'true');
  a.setAttribute('aria-hidden', 'true');
  a.style.cssText = 'position:fixed;width:0;height:0;opacity:0;pointer-events:none';
  a.src = tracks[index].url;
  document.body.appendChild(a);
  a.load();

  a.addEventListener('play', () => playListeners.forEach((fn) => fn(true)));
  a.addEventListener('pause', () => playListeners.forEach((fn) => fn(false)));
  a.addEventListener('ended', () => {
    void skipTrack(1);
  });

  audio = a;
  metaListeners.forEach((fn) => fn());
  return a;
}

/** Touch/pull: provisional play. Open: commit=true (cancel won't stop). */
export function gateAudioStart(commit = false) {
  if (userStopped) return;
  if (commit) committed = true;
  const a = ensureWeddingAudio();
  if (!a) return;
  playNow(a);
}

export function gateAudioPlay() {
  gateAudioStart(true);
}

/** Abort unfinished pull. */
export function gateAudioCancel() {
  if (committed) return;
  const a = audio;
  if (!a) return;
  a.pause();
  a.currentTime = 0;
}

export function getWeddingAudio() {
  return audio;
}

export function getTrackTitle() {
  return tracks[index]?.title ?? 'Wedding';
}

export function skipTrack(dir: 1 | -1) {
  if (!tracks.length) return getTrackTitle();
  const a = ensureWeddingAudio();
  if (!a) return getTrackTitle();
  index = (((index + dir) % tracks.length) + tracks.length) % tracks.length;
  sessionStorage.setItem(KEY, String(index));
  a.src = tracks[index].url;
  a.load();
  metaListeners.forEach((fn) => fn());
  if (committed && !userStopped) playNow(a);
  return tracks[index].title;
}

export function setUserStopped(stopped: boolean) {
  userStopped = stopped;
}

export function onWeddingPlayChange(fn: (playing: boolean) => void) {
  playListeners.add(fn);
  if (audio) fn(!audio.paused && !audio.ended);
  return () => {
    playListeners.delete(fn);
  };
}

export function onWeddingMetaChange(fn: () => void) {
  metaListeners.add(fn);
  return () => {
    metaListeners.delete(fn);
  };
}

export function tryPlayUnmuted() {
  if (userStopped) return Promise.resolve(false);
  committed = true;
  const a = ensureWeddingAudio();
  if (!a) return Promise.resolve(false);
  a.muted = false;
  const p = a.play();
  if (p && typeof p.then === 'function') {
    return p.then(() => true).catch(() => false);
  }
  return Promise.resolve(true);
}
