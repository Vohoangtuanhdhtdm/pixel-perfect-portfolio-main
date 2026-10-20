import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "@/data/process";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const ProcessSection = () => {
  const listRef = useRef<HTMLOListElement>(null);
  // Scroll-linked progress line that fills as the reader moves through the steps.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="process" className="scroll-mt-20 bg-card py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader number="04" kicker="How I work" title="From blueprint to published result." />
        <div className="relative pl-6 md:pl-10">
          <div aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-border" />
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-0 top-0 w-px origin-top bg-primary"
          />
          <ol ref={listRef} className="border-t border-foreground">
            {processSteps.map((step, i) => (
              <Reveal
                as="li"
                key={step.number}
                delay={i * 0.04}
                className="grid gap-4 border-b border-border py-8 md:grid-cols-12 md:gap-6"
              >
                <span className="font-mono text-sm text-primary md:col-span-1">{step.number}</span>
                <h3 className="text-2xl font-bold tracking-[-0.02em] md:col-span-4">{step.title}</h3>
                <div className="md:col-span-7">
                  <p className="leading-relaxed text-muted-foreground">{step.description}</p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    {step.tags.join(" · ")}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
