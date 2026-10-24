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
    <section id="process" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader number="04" kicker="How I work" title="From blueprint to published result." />
        <div className="relative pl-8 md:pl-12">
          <div aria-hidden className="absolute bottom-6 left-3 top-6 w-[2px] rounded-full bg-white/70 md:left-5" />
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-6 left-3 top-6 w-[2px] origin-top rounded-full bg-primary md:left-5"
          />
          <ol ref={listRef} className="space-y-4">
            {processSteps.map((step, i) => (
              <Reveal
                as="li"
                key={step.number}
                delay={i * 0.04}
                className="glass relative grid gap-3 rounded-[28px] p-6 md:grid-cols-12 md:gap-6 md:p-8"
              >
                <span
                  aria-hidden
                  className="absolute -left-[26px] top-8 h-3 w-3 rounded-full border-2 border-white bg-primary shadow md:-left-[34px]"
                />
                <span className="font-mono text-sm font-semibold text-primary md:col-span-1">{step.number}</span>
                <h3 className="text-2xl font-bold tracking-[-0.02em] md:col-span-4">{step.title}</h3>
                <div className="md:col-span-7">
                  <p className="leading-relaxed text-foreground/75">{step.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {step.tags.map((t) => (
                      <li key={t} className="glass-inset rounded-full px-3 py-1 text-xs font-medium text-foreground/70">
                        {t}
                      </li>
                    ))}
                  </ul>
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
