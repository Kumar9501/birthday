import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import birthdayConfig from "../config/birthdayConfig";
import { useMusic } from "../context/MusicContext";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function Hero() {
  const { start } = useMusic();
  const reduced = usePrefersReducedMotion();
  const [burst, setBurst] = useState(false);

  const openSurprise = async () => {
    setBurst(true);
    await start();
    window.setTimeout(() => {
      document.getElementById("love-letter")?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    }, reduced ? 0 : 420);
    window.setTimeout(() => setBurst(false), 1600);
  };

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-20%] left-1/2 h-[70vw] w-[70vw] -translate-x-1/2 rounded-full bg-wine-700/35 blur-[90px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-72 w-72 rounded-full bg-gold-400/10 blur-[80px]" />
        <SparkleField />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-4 text-[0.72rem] tracking-[0.38em] text-gold-400 uppercase"
        >
          {birthdayConfig.heroEyebrow}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.22 }}
          className="name-glow font-script text-6xl leading-none text-blush-200 sm:text-7xl md:text-8xl"
        >
          {birthdayConfig.name}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.36 }}
          className="font-display mt-5 text-[2.15rem] leading-[1.15] font-medium text-cream-50 sm:text-5xl md:text-6xl"
        >
          {birthdayConfig.heroTitle}
          <span className="ml-2 text-blush-300">♥</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.52 }}
          className="mx-auto mt-8 max-w-xl font-display text-xl leading-relaxed text-blush-200/90 italic sm:text-2xl whitespace-pre-line"
        >
          {birthdayConfig.heroSubtitle}
        </motion.p>

        <motion.button
          type="button"
          onClick={openSurprise}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          whileHover={reduced ? undefined : { scale: 1.03 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
          className="btn-glow relative mt-12 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-wine-700 via-wine-600 to-wine-700 px-8 py-3.5 text-sm tracking-[0.18em] text-cream-50 uppercase"
        >
          <Sparkles size={16} className="text-gold-300" />
          {birthdayConfig.heroCta}
        </motion.button>
      </div>

      <AnimatePresence>
        {burst
          ? Array.from({ length: 18 }).map((_, i) => (
              <motion.span
                key={i}
                className="pointer-events-none absolute left-1/2 top-[62%] z-20 text-blush-200"
                initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
                animate={{
                  opacity: 0,
                  x: Math.cos((i / 18) * Math.PI * 2) * (90 + (i % 5) * 18),
                  y: Math.sin((i / 18) * Math.PI * 2) * (70 + (i % 4) * 16),
                  scale: 1.15,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.15, ease: "easeOut" }}
              >
                {i % 3 === 0 ? "✦" : "♥"}
              </motion.span>
            ))
          : null}
      </AnimatePresence>
    </section>
  );
}

function SparkleField() {
  const dots = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${(i * 17) % 100}%`,
    top: `${(i * 13) % 100}%`,
    delay: (i % 7) * 0.4,
  }));

  return (
    <>
      {dots.map((dot) => (
        <span
          key={dot.id}
          className="absolute h-1 w-1 rounded-full bg-cream-50/50"
          style={{
            left: dot.left,
            top: dot.top,
            animation: `twinkle 3.6s ease-in-out ${dot.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.7); }
          50% { opacity: 0.8; transform: scale(1.15); }
        }
      `}</style>
    </>
  );
}
