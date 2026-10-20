import { useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import ArchitectureDiagram from "./ArchitectureDiagram";
import ProjectDialog from "./ProjectDialog";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

// Bento placement on large screens: featured 2×2, then two stacked tiles, then a 1 + 2 row.
const spans = ["lg:col-span-2 lg:row-span-2", "", "", "", "lg:col-span-2"];

type TileProps = { project: Project; index: number; onOpen: (tile: HTMLButtonElement) => void };

// Cursor-following spotlight: CSS variables updated on mouse move, no React re-render.
const trackPointer = (e: MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
};

const Tile = ({ project, index, onOpen }: TileProps) => {
  const featured = project.featured;
  return (
    <article
      onMouseMove={trackPointer}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-card p-6 transition-[border-color,transform,box-shadow] duration-300 focus-within:ring-2 focus-within:ring-ring hover:-translate-y-1 hover:border-foreground/60 hover:shadow-[0_18px_40px_-24px_hsl(var(--foreground)/0.35)] md:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), hsl(var(--primary) / 0.07), transparent 70%)",
        }}
      />
      <div className="relative flex w-full items-start justify-between gap-4">
        <span className="eyebrow">
          <span className="text-primary">{String(index + 1).padStart(2, "0")}</span> · {project.category}
        </span>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>

      <h3
        className={`relative mt-6 font-bold leading-[1.05] tracking-[-0.03em] ${
          featured ? "text-3xl md:text-5xl" : "text-2xl"
        }`}
      >
        {/* Stretched button: the whole card is clickable, but only the title is the accessible name. */}
        <button
          type="button"
          onClick={(e) => onOpen(e.currentTarget)}
          className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          {project.title}
        </button>
      </h3>
      <p
        className={`relative mt-3 leading-relaxed text-muted-foreground ${featured ? "max-w-xl md:text-lg" : "text-sm"}`}
      >
        {project.summary}
      </p>

      {featured && project.diagram && (
        <div className="relative mt-8 hidden w-full rounded-md border border-border bg-background p-4 md:block">
          <ArchitectureDiagram diagram={project.diagram} title={project.title} decorative />
        </div>
      )}

      <div className="relative mt-auto pt-8">
        <p className="eyebrow">
          Role · <span className="text-foreground">{project.role}</span>
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-full border border-border bg-background px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

const WorkSection = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);
  // The dialog is opened from state (no DialogTrigger), so Radix can't restore focus by itself.
  const lastTile = useRef<HTMLButtonElement | null>(null);

  const openProject = (project: Project, tile: HTMLButtonElement) => {
    lastTile.current = tile;
    setSelected(project);
    setOpen(true);
  };

  return (
    <section id="work" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader number="01" kicker="Selected work" title="Systems I've designed and shipped." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal
              key={project.id}
              delay={i * 0.05}
              className={`${spans[i] ?? ""} ${project.featured ? "md:col-span-2" : ""}`}
            >
              <Tile project={project} index={i} onOpen={(tile) => openProject(project, tile)} />
            </Reveal>
          ))}
        </div>
      </div>
      <ProjectDialog
        project={selected}
        open={open}
        onOpenChange={setOpen}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          lastTile.current?.focus();
        }}
      />
    </section>
  );
};

export default WorkSection;
