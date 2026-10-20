import { skillGroups } from "@/data/skills";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const SkillsSection = () => (
  <section id="skills" className="scroll-mt-20 py-24 md:py-32">
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <SectionHeader number="03" kicker="Skills" title="A .NET core, with data on the side." />
      <Reveal>
        <dl className="border-t border-foreground">
          {skillGroups.map((group) => (
            <div key={group.title} className="grid gap-3 border-b border-border py-6 md:grid-cols-12 md:gap-6">
              <dt className="eyebrow pt-1 md:col-span-4">{group.title}</dt>
              <dd className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-8">
                {group.items.map((item) => (
                  <span key={item} className="text-lg font-medium tracking-[-0.01em] md:text-xl">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  </section>
);

export default SkillsSection;
