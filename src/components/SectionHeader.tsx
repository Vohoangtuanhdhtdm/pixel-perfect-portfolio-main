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
      <div className="flex items-center gap-4 border-t border-foreground pt-4">
        <span className="font-mono text-xs text-primary">{number}</span>
        <span className="eyebrow">{kicker ?? title}</span>
      </div>
    </Reveal>
    <h2 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.03em] md:text-6xl">
      <TextReveal text={title} />
    </h2>
  </div>
);

export default SectionHeader;
