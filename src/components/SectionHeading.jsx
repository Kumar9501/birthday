export default function SectionHeading({ eyebrow, title, align = "center" }) {
  const alignment =
    align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <div className={`mb-10 flex flex-col ${alignment} md:mb-14`}>
      {eyebrow ? (
        <p className="mb-3 text-[0.7rem] tracking-[0.32em] text-gold-400/90 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-4xl font-medium tracking-wide text-cream-50 sm:text-5xl md:text-[3.25rem]">
        {title}
      </h2>
      <span className="mt-5 flex items-center gap-2">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-400/80" />
        <span className="text-[10px] text-gold-400">✦</span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-400/80" />
      </span>
    </div>
  );
}
