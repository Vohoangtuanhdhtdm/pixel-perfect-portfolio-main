import { skillGroups } from "@/data/skills";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

// Control Center-style tiles: the core backend group is the wide tile.
const spans = ["md:col-span-2", "", "", "", "md:col-span-2"];

const SkillsSection = () => (
  <section id="skills" className="scroll-mt-24 py-24 md:py-32">
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <SectionHeader number="03" kicker="Skills" title="A .NET core, with data on the side." />
      <dl className="grid gap-4 md:grid-cols-3 md:gap-5">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.05} className={spans[i] ?? ""}>
            <div className="glass h-full rounded-[28px] p-6">
              <dt className="text-[13px] font-semibold text-muted-foreground">{group.title}</dt>
              <dd className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="glass-inset rounded-full px-3.5 py-1.5 text-[15px] font-semibold tracking-[-0.01em]"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </div>
  </section>
);

export default SkillsSection;
