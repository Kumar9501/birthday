import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import birthdayConfig from "../config/birthdayConfig";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const ROTATIONS = [-2.4, 1.8, -1.2, 2.1, -1.8, 1.4, -2, 1.6];

export default function Memories() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="memories" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Photographs of us"
            title={birthdayConfig.memoriesHeading}
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {birthdayConfig.photos.map((photo, index) => (
            <Reveal key={photo.src} delay={index * 0.05}>
              <button
                type="button"
                onClick={() => setActive(photo)}
                className="group w-full text-left"
                style={{ transform: `rotate(${ROTATIONS[index % ROTATIONS.length]}deg)` }}
              >
                <figure className="overflow-hidden rounded-2xl bg-wine-800/40 shadow-[0_18px_40px_rgba(42,15,22,0.35)] ring-1 ring-cream-50/10 transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:scale-[1.03]">
                  <PhotoFrame src={photo.src} alt={photo.caption} index={index} />
                  <figcaption className="px-4 py-3 font-display text-sm text-blush-200/90 italic">
                    {photo.caption}
                  </figcaption>
                </figure>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-wine-950/88 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.figure
              initial={{ opacity: 0, scale: 0.92, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[88vh] w-full max-w-3xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute -top-12 right-0 rounded-full p-2 text-cream-50/80"
                aria-label="Close photograph"
              >
                <X size={22} />
              </button>
              <PhotoFrame
                src={active.src}
                alt={active.caption}
                large
                index={birthdayConfig.photos.indexOf(active)}
              />
              <figcaption className="mt-5 text-center font-display text-xl text-blush-200 italic">
                {active.caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

const FALLBACKS = [
  "from-[#5a2433] via-[#8a3d50] to-[#2a0f16]",
  "from-[#3b1520] via-[#6b2d3c] to-[#c4a574]/40",
  "from-[#4a1c2a] via-[#2a0f16] to-[#e8c4c4]/30",
  "from-[#6b2d3c] via-[#3b1520] to-[#d4bc94]/25",
  "from-[#2a0f16] via-[#8a3d50]/80 to-[#4a1c2a]",
  "from-[#7a3045] via-[#3b1520] to-[#f0d6d4]/20",
  "from-[#4a1c2a] via-[#c4a574]/30 to-[#2a0f16]",
  "from-[#3b1520] via-[#e8c4c4]/25 to-[#6b2d3c]",
];

function PhotoFrame({ src, alt, large = false, index = 0 }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      if (!cancelled) setStatus("ready");
    };
    image.onerror = () => {
      if (!cancelled) setStatus("fallback");
    };
    image.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (status !== "ready") {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${
          FALLBACKS[index % FALLBACKS.length]
        } ${large ? "h-[70vh] rounded-2xl" : "aspect-[4/5]"}`}
      >
        <div className="absolute inset-10 rounded-full bg-cream-50/8 blur-3xl" />
        <span className="relative text-4xl text-blush-200/35">♥</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`w-full object-cover ${large ? "max-h-[70vh] rounded-2xl" : "aspect-[4/5]"}`}
    />
  );
}
