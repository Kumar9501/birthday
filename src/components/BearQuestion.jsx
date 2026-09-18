import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import birthdayConfig from "../config/birthdayConfig";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function BearQuestion() {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState("watch");
  const [mood, setMood] = useState("kiss");
  const [noPos, setNoPos] = useState(null);

  useEffect(() => {
    const reveal = window.setTimeout(() => setPhase("ask"), reduced ? 800 : 4200);
    return () => window.clearTimeout(reveal);
  }, [reduced]);

  useEffect(() => {
    if (reduced || phase === "yes") return undefined;
    const id = window.setInterval(() => {
      setMood((current) => (current === "kiss" ? "play" : "kiss"));
    }, 2800);
    return () => window.clearInterval(id);
  }, [phase, reduced]);

  const flee = useCallback(
    (event) => {
      if (phase !== "ask") return;
      event.preventDefault();
      event.stopPropagation();
      event.currentTarget?.blur?.();
      const width = 92;
      const height = 44;
      const pad = 16;
      const maxX = Math.max(pad, window.innerWidth - width - pad);
      const maxY = Math.max(pad, window.innerHeight - height - pad);
      setNoPos({
        x: pad + Math.random() * (maxX - pad),
        y: pad + Math.random() * (maxY - pad),
      });
    },
    [phase],
  );

  return (
    <section id="bears" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <SectionHeading
            eyebrow="A little game, just for you"
            title={birthdayConfig.bearHeading}
          />
        </Reveal>

        <Reveal>
          <div className="relative mx-auto mb-8 flex h-[220px] items-end justify-center sm:h-[250px]">
            <TeddyPair
              mood={phase === "yes" ? "kiss" : mood}
              celebrating={phase === "yes"}
              reduced={reduced}
            />
          </div>

          <AnimatePresence mode="wait">
            {phase === "watch" ? (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-display text-lg text-blush-200/90 italic"
              >
                {birthdayConfig.bearWatchHint}
              </motion.p>
            ) : null}

            {phase === "ask" ? (
              <motion.div
                key="ask"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-display text-2xl text-cream-50 sm:text-3xl">
                  {birthdayConfig.bearQuestion}
                </p>
                <div className="relative mt-8 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setNoPos(null);
                      setPhase("yes");
                    }}
                    className="btn-glow rounded-full bg-gradient-to-r from-wine-700 to-wine-600 px-10 py-3 text-sm tracking-[0.2em] text-cream-50 uppercase"
                  >
                    {birthdayConfig.bearYes}
                  </button>
                  <button
                    type="button"
                    aria-label="No, but you cannot choose this"
                    onPointerEnter={flee}
                    onPointerDown={flee}
                    onFocus={flee}
                    onClick={flee}
                    style={
                      noPos
                        ? {
                            position: "fixed",
                            left: noPos.x,
                            top: noPos.y,
                            zIndex: 60,
                            margin: 0,
                          }
                        : undefined
                    }
                    className="touch-none rounded-full border border-cream-50/25 px-7 py-3 text-sm tracking-[0.18em] text-blush-200/80 uppercase"
                  >
                    {birthdayConfig.bearNo}
                  </button>
                </div>
                <p className="mt-5 text-[0.7rem] tracking-[0.2em] text-gold-400/70 uppercase">
                  Try No if you must
                </p>
              </motion.div>
            ) : null}

            {phase === "yes" ? (
              <motion.p
                key="yes"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="whitespace-pre-line font-display text-xl leading-relaxed text-blush-100 italic sm:text-2xl"
              >
                {birthdayConfig.bearYesMessage}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

function TeddyPair({ mood, celebrating, reduced }) {
  const kissing = mood === "kiss";
  const playTransition = {
    duration: kissing ? 0.7 : 0.55,
    ease: [0.22, 1, 0.36, 1],
    repeat: kissing || reduced ? 0 : Infinity,
  };

  return (
    <div className="relative flex w-full max-w-md items-end justify-center">
      <motion.div
        animate={{
          x: kissing ? 28 : -14,
          y: kissing ? 6 : [0, -10, 0],
          rotate: kissing ? 10 : [-8, 10, -8],
        }}
        transition={playTransition}
      >
        <Teddy who="him" />
      </motion.div>
      <motion.div
        animate={{
          x: kissing ? -28 : 14,
          y: kissing ? 6 : [0, -8, 0],
          rotate: kissing ? -10 : [8, -10, 8],
        }}
        transition={playTransition}
      >
        <Teddy who="her" />
      </motion.div>

      <HeartBurst active={!kissing || celebrating} celebrating={celebrating} />
    </div>
  );
}

function Teddy({ who }) {
  const him = who === "him";
  const fur = him ? "#6b3a2a" : "#c4a574";
  const furDark = him ? "#4a241c" : "#8a6a45";
  const blush = him ? "#8a3d50" : "#d4a5a5";
  const label = him ? birthdayConfig.yourName : birthdayConfig.name;

  return (
    <div className="flex w-[132px] flex-col items-center sm:w-[150px]">
      <svg viewBox="0 0 120 132" className="drop-shadow-[0_12px_18px_rgba(42,15,22,0.35)]">
        <ellipse cx="28" cy="28" rx="16" ry="15" fill={fur} />
        <ellipse cx="92" cy="28" rx="16" ry="15" fill={fur} />
        <ellipse cx="28" cy="28" rx="8" ry="8" fill="#3b1520" opacity="0.35" />
        <ellipse cx="92" cy="28" rx="8" ry="8" fill="#3b1520" opacity="0.35" />
        <ellipse cx="60" cy="92" rx="34" ry="30" fill={fur} />
        <circle cx="60" cy="48" r="32" fill={fur} />
        <ellipse cx="60" cy="58" rx="16" ry="12" fill="#f6e6e2" />
        <ellipse cx="60" cy="61" rx="6" ry="4.5" fill={furDark} />
        <circle cx="48" cy="46" r="3.2" fill="#2a0f16" />
        <circle cx="72" cy="46" r="3.2" fill="#2a0f16" />
        <circle cx="49.2" cy="45" r="1" fill="#fbf7f2" />
        <circle cx="73.2" cy="45" r="1" fill="#fbf7f2" />
        <circle cx="44" cy="54" r="5" fill={blush} opacity="0.55" />
        <circle cx="76" cy="54" r="5" fill={blush} opacity="0.55" />
        {!him ? (
          <>
            <path d="M78 18 C86 8, 102 14, 94 26" fill="#8a3d50" />
            <circle cx="96" cy="16" r="4" fill="#8a3d50" />
          </>
        ) : (
          <path d="M42 86 C34 78, 22 84, 28 96" stroke={furDark} strokeWidth="7" fill="none" />
        )}
        <ellipse cx="38" cy="108" rx="10" ry="8" fill={furDark} />
        <ellipse cx="82" cy="108" rx="10" ry="8" fill={furDark} />
      </svg>
      <span className="mt-1 max-w-[8rem] truncate text-[0.62rem] tracking-[0.22em] text-gold-400/80 uppercase">
        {label}
      </span>
    </div>
  );
}

function HeartBurst({ active, celebrating }) {
  const hearts = celebrating
    ? [
        { x: -40, y: -70, s: 1.2, d: 0 },
        { x: 8, y: -88, s: 1.4, d: 0.1 },
        { x: 46, y: -66, s: 1.1, d: 0.18 },
        { x: -18, y: -40, s: 0.9, d: 0.08 },
        { x: 28, y: -38, s: 0.85, d: 0.22 },
      ]
    : [
        { x: -28, y: -36, s: 1, d: 0 },
        { x: 26, y: -42, s: 1.1, d: 0.12 },
        { x: 2, y: -58, s: 0.85, d: 0.06 },
      ];

  if (!active) {
    return (
      <span className="pointer-events-none absolute top-10 text-lg text-blush-300/70">♥</span>
    );
  }

  return (
    <div className="pointer-events-none absolute top-8 left-1/2">
      {hearts.map((heart) => (
        <motion.span
          key={`${heart.x}-${heart.y}`}
          className="absolute text-blush-200"
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
          animate={{
            opacity: [0, 1, 0],
            x: heart.x,
            y: heart.y,
            scale: heart.s,
          }}
          transition={{
            duration: celebrating ? 1.6 : 1.15,
            delay: heart.d,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
