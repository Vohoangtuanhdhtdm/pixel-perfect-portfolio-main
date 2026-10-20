import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import ArchitectureDiagram from "./ArchitectureDiagram";
import ProjectDialog from "./ProjectDialog";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

// Bento placement on large screens: featured 2×2, then two stacked tiles, then a 1 + 2 row.
const spans = ["lg:col-span-2 lg:row-span-2", "", "", "", "lg:col-span-2"];

const Tile = ({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) => {
  const featured = project.featured;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full w-full flex-col rounded-lg border border-border bg-card p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-8"
    >
      <div className="flex w-full items-start justify-between gap-4">
        <span className="eyebrow">
          <span className="text-primary">{String(index + 1).padStart(2, "0")}</span> · {project.category}
        </span>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>

      <h3
        className={`mt-6 font-bold leading-[1.05] tracking-[-0.03em] ${
          featured ? "text-3xl md:text-5xl" : "text-2xl"
        }`}
      >
        {project.title}
      </h3>
      <p className={`mt-3 leading-relaxed text-muted-foreground ${featured ? "max-w-xl md:text-lg" : "text-sm"}`}>
        {project.summary}
      </p>

      {featured && project.diagram && (
        <div className="mt-8 hidden w-full rounded-md border border-border bg-background p-4 md:block">
          <ArchitectureDiagram diagram={project.diagram} title={project.title} decorative />
        </div>
      )}

      <p className="mt-auto pt-8 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        {project.stack.join(" · ")}
      </p>
    </button>
  );
};

const WorkSection = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader number="01" kicker="Selected work" title="Systems I've designed and shipped." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.05} className={`${spans[i] ?? ""} ${project.featured ? "md:col-span-2" : ""}`}>
              <Tile project={project} index={i} onOpen={() => setSelected(project)} />
            </Reveal>
          ))}
        </div>
      </div>
      <ProjectDialog project={selected} open={selected !== null} onOpenChange={(o) => !o && setSelected(null)} />
    </section>
  );
};

export default WorkSection;
