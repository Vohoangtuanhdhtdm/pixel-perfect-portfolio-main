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

// Cursor-following specular highlight + subtle 3D tilt, driven by CSS variables (no React re-render).
const MAX_TILT_DEG = 4;

const trackPointer = (e: MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  el.style.setProperty("--spot-x", `${x}px`);
  el.style.setProperty("--spot-y", `${y}px`);
  // Larger tiles tilt less so the featured card doesn't swing too far.
  const tilt = MAX_TILT_DEG * Math.min(1, 360 / rect.width);
  el.style.setProperty("--ry", `${((x / rect.width - 0.5) * 2 * tilt).toFixed(2)}deg`);
  el.style.setProperty("--rx", `${(-(y / rect.height - 0.5) * 2 * tilt).toFixed(2)}deg`);
};

const resetPointer = (e: MouseEvent<HTMLElement>) => {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
};

const Tile = ({ project, index, onOpen }: TileProps) => {
  const featured = project.featured;
  return (
    <article
      onMouseMove={trackPointer}
      onMouseLeave={resetPointer}
      className="glass group relative flex h-full w-full flex-col overflow-hidden rounded-[32px] p-6 transition-[transform,box-shadow] duration-300 ease-out focus-within:ring-2 focus-within:ring-primary/60 hover:shadow-[0_30px_60px_-24px_rgb(30_50_90/0.35)] motion-safe:[transform:perspective(1000px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] md:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgb(255 255 255 / 0.75), transparent 65%)",
        }}
      />
      <div className="relative flex w-full items-start justify-between gap-4">
        <span className="glass-inset inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-semibold text-foreground/75">
          <span className="text-primary">{String(index + 1).padStart(2, "0")}</span>
          {project.category}
        </span>
        <span className="glass-inset grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
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
        <div className="relative my-auto hidden w-full pt-8 md:block">
          <div className="glass-inset rounded-[22px] p-4">
            <ArchitectureDiagram diagram={project.diagram} title={project.title} decorative />
          </div>
        </div>
      )}

      <div className="relative mt-auto pt-8">
        <p className="text-[13px] text-muted-foreground">
          Role · <span className="font-semibold text-foreground">{project.role}</span>
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li key={item} className="glass-inset rounded-full px-2.5 py-1 text-[12px] font-medium text-foreground/70">
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
    <section id="work" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader number="01" kicker="Selected work" title="Systems I've designed and shipped." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
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
