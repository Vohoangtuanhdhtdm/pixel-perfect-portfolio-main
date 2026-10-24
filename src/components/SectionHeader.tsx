import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

type SectionHeaderProps = {
  number: string;
  title: string;
  kicker?: string;
};

const SectionHeader = ({ number, title, kicker }: SectionHeaderProps) => (
  <div className="mb-12 md:mb-16">
    <Reveal>
      <div className="glass inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4">
        <span className="grid h-7 min-w-7 place-items-center rounded-full bg-primary px-2 font-mono text-[11px] font-semibold text-primary-foreground">
          {number}
        </span>
        <span className="text-[13px] font-semibold text-foreground/80">{kicker ?? title}</span>
      </div>
    </Reveal>
    <h2 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.03em] md:text-6xl">
      <TextReveal text={title} />
    </h2>
  </div>
);

export default SectionHeader;
