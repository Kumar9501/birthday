import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import birthdayConfig from "../config/birthdayConfig";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function ThingsILove() {
  const [open, setOpen] = useState(null);

  return (
    <section id="things-i-love" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading title={birthdayConfig.thingsHeading} />
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {birthdayConfig.thingsILove.map((item, index) => {
            const selected = open === index;
            return (
              <Reveal key={item.title} delay={index * 0.04}>
                <button
                  type="button"
                  onClick={() => setOpen(selected ? null : index)}
                  className="glass-panel h-full w-full rounded-2xl p-6 text-left transition-transform duration-500 hover:-translate-y-1"
                >
                  <h3 className="font-display text-2xl text-cream-50">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-blush-200/75">{item.teaser}</p>
                  <AnimatePresence initial={false}>
                    {selected ? (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden font-display mt-4 text-base leading-7 text-blush-100 italic"
                      >
                        {item.message}
                      </motion.p>
                    ) : (
                      <p className="mt-5 text-[0.68rem] tracking-[0.22em] text-gold-400/80 uppercase">
                        Tap to read
                      </p>
                    )}
                  </AnimatePresence>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
