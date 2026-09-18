import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import birthdayConfig from "../config/birthdayConfig";
import Reveal from "./Reveal";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function Surprise() {
  const reduced = usePrefersReducedMotion();
  const [opened, setOpened] = useState(false);
  const petals = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: -160 + (i % 10) * 36,
        delay: (i % 8) * 0.08,
        duration: 2.4 + (i % 5) * 0.25,
        char: i % 4 === 0 ? "✦" : "♥",
      })),
    [],
  );

  return (
    <section id="surprise" className="relative px-5 py-24 md:py-32">
      <div
        className={`relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] px-6 py-16 text-center transition-colors duration-700 sm:px-12 sm:py-20 ${
          opened ? "bg-wine-950/80" : "glass-panel"
        }`}
      >
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <Reveal>
                <p className="font-display text-3xl text-cream-50 sm:text-5xl">
                  {birthdayConfig.surprisePrompt}
                </p>
                <button
                  type="button"
                  onClick={() => setOpened(true)}
                  className="btn-glow mt-10 rounded-full bg-gradient-to-r from-wine-700 to-wine-600 px-8 py-3.5 text-sm tracking-[0.18em] text-cream-50 uppercase"
                >
                  {birthdayConfig.surpriseCta} ♥
                </button>
              </Reveal>
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <motion.div
                className="pointer-events-none absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-wine-700/50 blur-3xl sm:h-80 sm:w-80"
                animate={
                  reduced
                    ? undefined
                    : { scale: [1, 1.12, 1], opacity: [0.45, 0.7, 0.45] }
                }
                transition={{ duration: 3.4, repeat: Infinity }}
              />
              <motion.span
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9rem] text-wine-700/40 sm:text-[12rem]"
                animate={reduced ? undefined : { scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 3.8, repeat: Infinity }}
              >
                ♥
              </motion.span>
              <p className="relative whitespace-pre-line font-display text-xl leading-relaxed text-cream-50 italic sm:text-3xl">
                {birthdayConfig.surpriseMessage}
              </p>
              {!reduced
                ? petals.map((petal) => (
                    <motion.span
                      key={petal.id}
                      className="pointer-events-none absolute top-0 left-1/2 text-blush-200/80"
                      initial={{ opacity: 0, y: -20, x: petal.x }}
                      animate={{ opacity: [0, 1, 0], y: 260, rotate: 24 }}
                      transition={{
                        duration: petal.duration,
                        delay: petal.delay,
                        ease: "easeOut",
                      }}
                    >
                      {petal.char}
                    </motion.span>
                  ))
                : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
