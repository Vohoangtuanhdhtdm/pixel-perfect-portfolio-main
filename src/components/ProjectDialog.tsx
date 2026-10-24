import type { ComponentType, ReactNode } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Project } from "@/data/projects";
import ArchitectureDiagram from "./ArchitectureDiagram";

type ProjectDialogProps = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseAutoFocus?: (event: Event) => void;
};

type TextSlot = ComponentType<{ className?: string; children: ReactNode }>;

type DetailsProps = {
  project: Project;
  vertical: boolean;
  Title: TextSlot;
  Description: TextSlot;
};

const ProjectDetails = ({ project, vertical, Title, Description }: DetailsProps) => (
  <>
    <p className="glass-inset inline-flex w-fit rounded-full px-3 py-1 text-[12px] font-semibold text-foreground/70">
      {project.category} · {project.kind}
    </p>
    <Title className="mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.02em] md:text-4xl">
      {project.title}
    </Title>
    <Description className="mt-3 text-base leading-relaxed text-muted-foreground">{project.summary}</Description>

    {project.diagram && (
      <div className="glass-inset mt-8 overflow-x-auto rounded-[24px] p-3 md:p-6">
        <p className="mb-4 text-[13px] font-semibold text-muted-foreground">Architecture</p>
        <ArchitectureDiagram
          diagram={project.diagram}
          title={project.title}
          orientation={vertical ? "vertical" : "horizontal"}
        />
      </div>
    )}

    <div className="glass-inset mt-6 divide-y divide-white/70 overflow-hidden rounded-[24px]">
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <span className="text-[13px] font-semibold text-muted-foreground">Role</span>
        <span className="text-sm font-semibold">{project.role}</span>
      </div>
      <div className="px-5 py-4">
        <p className="text-[13px] font-semibold text-muted-foreground">What I did</p>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/80">
          {project.responsibilities.map((r) => (
            <li key={r} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {r}
            </li>
          ))}
        </ul>
      </div>
      <div className="px-5 py-4">
        <p className="text-[13px] font-semibold text-muted-foreground">Stack</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li key={s} className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="mt-8 flex flex-wrap gap-3">
      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-primary">
        <Github className="h-4 w-4" /> View on GitHub
      </a>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-glass">
          Live site <ArrowUpRight className="h-4 w-4" />
        </a>
      )}
    </div>
  </>
);

// Desktop: centered glass modal. Phones: iOS-style bottom sheet with drag-to-dismiss.
const ProjectDialog = ({ project, open, onOpenChange, onCloseAutoFocus }: ProjectDialogProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent
          data-testid="project-sheet"
          onCloseAutoFocus={onCloseAutoFocus}
          className="glass-strong max-h-[92vh] rounded-t-[32px] border-0"
        >
          <div className="overflow-y-auto px-5 pb-10 pt-4">
            {project && (
              <ProjectDetails project={project} vertical Title={DrawerTitle} Description={DrawerDescription} />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onCloseAutoFocus={onCloseAutoFocus}
        className="glass-strong block max-h-[90vh] max-w-3xl overflow-y-auto rounded-[32px] border-0 p-10 sm:rounded-[32px]"
      >
        {project && (
          <ProjectDetails project={project} vertical={false} Title={DialogTitle} Description={DialogDescription} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
