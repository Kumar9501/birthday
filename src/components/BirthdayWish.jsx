import birthdayConfig from "../config/birthdayConfig";
import Reveal from "./Reveal";

export default function BirthdayWish() {
  return (
    <section id="wish" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="name-glow font-display text-4xl text-cream-50 sm:text-6xl">
            {birthdayConfig.wishHeading}
            <span className="ml-2 text-blush-300">♥</span>
          </h2>
          <p className="mt-8 whitespace-pre-line font-display text-xl leading-relaxed text-blush-200/90 italic sm:text-2xl">
            {birthdayConfig.wishSubheading}
          </p>
          <p className="mt-12 whitespace-pre-line text-base leading-8 tracking-wide text-cream-100/85 sm:text-lg">
            {birthdayConfig.wishToast}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
