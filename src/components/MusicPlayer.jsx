import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useMusic } from "../context/MusicContext";

export default function MusicPlayer() {
  const { isPlaying, isMuted, togglePlay, toggleMute, hasStarted } = useMusic();

  return (
    <div className="fixed right-4 bottom-4 z-50 flex items-center gap-2 md:right-6 md:bottom-6">
      <button
        type="button"
        onClick={togglePlay}
        className="glass-panel flex h-12 w-12 items-center justify-center rounded-full text-cream-50 shadow-[0_10px_30px_rgba(42,15,22,0.35)] transition-transform duration-300 hover:scale-105"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
      </button>
      {hasStarted ? (
        <button
          type="button"
          onClick={toggleMute}
          className="glass-panel flex h-12 w-12 items-center justify-center rounded-full text-cream-50 transition-transform duration-300 hover:scale-105"
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      ) : null}
    </div>
  );
}
