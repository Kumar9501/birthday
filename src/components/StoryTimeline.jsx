import birthdayConfig from "../config/birthdayConfig";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function StoryTimeline() {
  return (
    <section id="story" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionHeading
            eyebrow="A story still being written"
            title={birthdayConfig.timelineHeading}
          />
        </Reveal>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-transparent via-gold-400/50 to-transparent md:left-1/2" />

          <ol className="space-y-10 md:space-y-16">
            {birthdayConfig.timeline.map((item, index) => {
              const right = index % 2 === 1;
              return (
                <li key={item.title} className="relative">
                  <span className="absolute top-3 left-[11px] h-2.5 w-2.5 rounded-full bg-gold-400 shadow-[0_0_16px_rgba(196,165,116,0.8)] md:left-1/2 md:-translate-x-1/2" />
                  <Reveal
                    className={`ml-12 md:ml-0 md:w-[46%] ${
                      right ? "md:ml-auto" : ""
                    }`}
                    delay={0.05}
                  >
                    <article className="glass-panel rounded-2xl p-6 md:p-7">
                      <p className="text-[0.68rem] tracking-[0.28em] text-gold-400 uppercase">
                        {item.date}
                      </p>
                      <h3 className="font-display mt-2 text-2xl text-cream-50 md:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-blush-200/85 md:text-base">
                        {item.description}
                      </p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
