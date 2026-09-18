import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import birthdayConfig from "../config/birthdayConfig";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function LoveReasons() {
  const reduced = usePrefersReducedMotion();
  const reasons = birthdayConfig.reasons;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % reasons.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reasons.length, reduced]);

  return (
    <section id="reasons" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <SectionHeading title={birthdayConfig.reasonsHeading} />
        </Reveal>

        <Reveal>
          <div className="relative min-h-[140px] sm:min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-2xl leading-relaxed text-cream-50 italic sm:text-3xl"
              >
                {reasons[index]}
              </motion.p>
            </AnimatePresence>
          </div>
          <p className="mt-8 font-script text-3xl text-gold-400">
            {birthdayConfig.reasonsCounter}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
