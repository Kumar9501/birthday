import { useEffect, useState } from "react";
import { MusicProvider } from "./context/MusicContext";
import birthdayConfig from "./config/birthdayConfig";
import BearQuestion from "./components/BearQuestion";
import BirthdayWish from "./components/BirthdayWish";
import CustomCursor from "./components/CustomCursor";
import Finale from "./components/Finale";
import FloatingHearts from "./components/FloatingHearts";
import Hero from "./components/Hero";
import LoadingScreen from "./components/LoadingScreen";
import LoveLetter from "./components/LoveLetter";
import LoveReasons from "./components/LoveReasons";
import Memories from "./components/Memories";
import MusicPlayer from "./components/MusicPlayer";
import StoryTimeline from "./components/StoryTimeline";
import Surprise from "./components/Surprise";
import ThingsILove from "./components/ThingsILove";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 2200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <MusicProvider>
      <div className="relative min-h-screen bg-[radial-gradient(1100px_circle_at_18%_-10%,_rgba(196,165,116,0.16),_transparent_42%),radial-gradient(1200px_circle_at_top,_#5a2433_0%,_#2a0f16_52%,_#14080c_100%)]">
        <LoadingScreen visible={loading} />
        <CustomCursor />
        <FloatingHearts />
        <MusicPlayer />

        <main className={loading ? "pointer-events-none overflow-hidden" : ""}>
          <Hero />
          <LoveLetter />
          <Memories />
          <StoryTimeline />
          <ThingsILove />
          <LoveReasons />
          <BearQuestion />
          <Surprise />
          <BirthdayWish />
          <Finale />
        </main>

        <footer className="pb-10 text-center text-[0.65rem] tracking-[0.28em] text-blush-200/40 uppercase">
          For {birthdayConfig.name} · From {birthdayConfig.yourName}
        </footer>
      </div>
    </MusicProvider>
  );
}
