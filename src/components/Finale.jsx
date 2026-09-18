import birthdayConfig from "../config/birthdayConfig";
import Reveal from "./Reveal";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function Finale() {
  const reduced = usePrefersReducedMotion();

  const replay = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section id="finale" className="relative flex min-h-[80svh] items-center px-5 py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="name-glow font-display text-3xl leading-snug text-cream-50 sm:text-5xl">
            {birthdayConfig.finaleLine}
          </p>
          <p className="mt-10 text-5xl text-blush-300">♥</p>
          <p className="mt-8 text-sm tracking-[0.18em] text-gold-400/90 uppercase">
            {birthdayConfig.finaleFooter}
          </p>
          <button
            type="button"
            onClick={replay}
            className="mt-12 rounded-full border border-cream-50/20 px-7 py-3 text-xs tracking-[0.22em] text-cream-50 uppercase transition-colors hover:border-gold-400/60 hover:text-gold-300"
          >
            {birthdayConfig.replayLabel}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
