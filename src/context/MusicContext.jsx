import { createContext, useContext, useEffect, useMemo, useState } from "react";
import birthdayConfig from "../config/birthdayConfig";

const MusicContext = createContext(null);

function getBirthdayAudio() {
  if (typeof window === "undefined") return null;
  if (!window.__birthdayAudio) {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = "auto";
    audio.playsInline = true;
    window.__birthdayAudio = audio;
  }
  return window.__birthdayAudio;
}

function stopOtherAudio(keep) {
  document.querySelectorAll("audio").forEach((element) => {
    if (element === keep) return;
    element.pause();
    element.removeAttribute("src");
    element.load();
  });
}

export function MusicProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const audio = getBirthdayAudio();
    if (!audio) return undefined;

    const desired = new URL(birthdayConfig.musicSrc, window.location.origin).href;
    if (audio.src !== desired) {
      audio.src = birthdayConfig.musicSrc;
    }

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    stopOtherAudio(audio);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const api = useMemo(
    () => ({
      src: birthdayConfig.musicSrc,
      isPlaying,
      isMuted,
      hasStarted,
      async start() {
        const audio = getBirthdayAudio();
        if (!audio) return;
        stopOtherAudio(audio);
        if (!audio.paused) {
          setIsPlaying(true);
          setHasStarted(true);
          return;
        }
        try {
          audio.volume = 0.7;
          audio.muted = false;
          setIsMuted(false);
          await audio.play();
          setIsPlaying(true);
          setHasStarted(true);
        } catch {
          setHasStarted(true);
        }
      },
      async togglePlay() {
        const audio = getBirthdayAudio();
        if (!audio) return;
        if (!audio.paused) {
          audio.pause();
          setIsPlaying(false);
          return;
        }
        stopOtherAudio(audio);
        try {
          audio.volume = 0.7;
          await audio.play();
          setIsPlaying(true);
          setHasStarted(true);
        } catch {
          /* browser blocked autoplay or missing file */
        }
      },
      toggleMute() {
        const audio = getBirthdayAudio();
        if (!audio) return;
        audio.muted = !audio.muted;
        setIsMuted(audio.muted);
      },
    }),
    [isPlaying, isMuted, hasStarted],
  );

  return <MusicContext.Provider value={api}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return ctx;
}
