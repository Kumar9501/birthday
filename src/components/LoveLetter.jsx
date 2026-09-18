import birthdayConfig from "../config/birthdayConfig";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function LoveLetter() {
  const paragraphs = birthdayConfig.letterBody.trim().split(/\n\s*\n/);

  return (
    <section id="love-letter" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading
            eyebrow="A letter, written only for you"
            title={birthdayConfig.letterHeading}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <article className="paper-grain relative mb-8 rounded-sm bg-cream-50 px-6 py-10 text-wine-900 shadow-[0_30px_80px_rgba(42,15,22,0.35)] sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute inset-x-6 top-5 h-px bg-wine-800/10 sm:inset-x-10" />
            <p className="font-script mb-8 text-3xl text-wine-700 sm:text-4xl">
              My dearest {birthdayConfig.name},
            </p>
            <div className="space-y-6 font-display text-lg leading-[1.9] text-wine-800/90 italic sm:text-xl">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <p className="font-script mt-10 text-right text-3xl text-wine-700">
              {birthdayConfig.letterSignOff}
            </p>
            <p className="mt-1 text-right text-sm tracking-[0.22em] text-wine-700/60 uppercase">
              {birthdayConfig.yourName}
            </p>
            <div
              className="wax-seal absolute -bottom-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full font-script text-2xl text-gold-300"
              aria-hidden="true"
            >
              {birthdayConfig.name.charAt(0)}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
