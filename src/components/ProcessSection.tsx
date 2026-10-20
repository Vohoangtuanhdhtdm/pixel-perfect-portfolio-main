import { processSteps } from "@/data/process";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const ProcessSection = () => (
  <section id="process" className="scroll-mt-20 bg-card py-24 md:py-32">
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <SectionHeader number="04" kicker="How I work" title="From blueprint to published result." />
      <ol className="border-t border-foreground">
        {processSteps.map((step, i) => (
          <Reveal key={step.number} delay={i * 0.04}>
            <li className="grid gap-4 border-b border-border py-8 md:grid-cols-12 md:gap-6">
              <span className="font-mono text-sm text-primary md:col-span-1">{step.number}</span>
              <h3 className="text-2xl font-bold tracking-[-0.02em] md:col-span-4">{step.title}</h3>
              <div className="md:col-span-7">
                <p className="leading-relaxed text-muted-foreground">{step.description}</p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  {step.tags.join(" · ")}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export default ProcessSection;
