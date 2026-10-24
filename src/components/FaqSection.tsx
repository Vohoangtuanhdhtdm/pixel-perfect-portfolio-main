import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/faq";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const FaqSection = () => (
  <section id="faq" className="scroll-mt-24 py-24 md:py-32">
    <div className="mx-auto max-w-4xl px-5 md:px-8">
      <SectionHeader number="05" kicker="FAQ" title="Quick answers for recruiters." />
      <Reveal>
        <Accordion type="single" collapsible className="glass overflow-hidden rounded-[28px]">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question} className="border-white/60 last:border-b-0">
              <AccordionTrigger className="px-6 py-5 text-left font-display text-lg font-semibold tracking-[-0.01em] transition-colors hover:bg-white/40 hover:no-underline md:text-xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-base leading-relaxed text-foreground/75">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </div>
  </section>
);

export default FaqSection;
