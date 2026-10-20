import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/faq";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const FaqSection = () => (
  <section id="faq" className="scroll-mt-20 py-24 md:py-32">
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <SectionHeader number="05" kicker="FAQ" title="Quick answers for recruiters." />
      <Reveal>
        <Accordion type="single" collapsible className="border-t border-foreground">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question} className="border-border">
              <AccordionTrigger className="py-6 text-left font-display text-lg font-semibold tracking-[-0.01em] hover:no-underline hover:text-primary md:text-xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-3xl pb-6 text-base leading-relaxed text-muted-foreground">
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
