import { ArrowUpRight, Github } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Project } from "@/data/projects";
import ArchitectureDiagram from "./ArchitectureDiagram";

type ProjectDialogProps = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseAutoFocus?: (event: Event) => void;
};

const ProjectDialog = ({ project, open, onOpenChange, onCloseAutoFocus }: ProjectDialogProps) => {
  const isMobile = useIsMobile();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onCloseAutoFocus={onCloseAutoFocus} className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-lg border-border bg-background p-5 sm:p-10">
        {project && (
          <>
            <p className="eyebrow">
              {project.category} · {project.kind}
            </p>
            <DialogTitle className="mt-2 font-display text-3xl font-bold leading-tight tracking-[-0.02em] md:text-4xl">
              {project.title}
            </DialogTitle>
            <DialogDescription className="mt-3 text-base leading-relaxed text-muted-foreground">
              {project.summary}
            </DialogDescription>

            {project.diagram && (
              <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-card p-3 md:p-6">
                <p className="eyebrow mb-4">Architecture</p>
                <ArchitectureDiagram
                  diagram={project.diagram}
                  title={project.title}
                  orientation={isMobile ? "vertical" : "horizontal"}
                />
              </div>
            )}

            <div className="mt-8 grid gap-8 md:grid-cols-[160px_1fr]">
              <p className="eyebrow">Role</p>
              <p className="text-sm font-medium">{project.role}</p>
              <p className="eyebrow">What I did</p>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {project.responsibilities.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="eyebrow">Stack</p>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full border border-border px-3 py-1 font-mono text-xs">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-primary"
              >
                <Github className="h-4 w-4" /> View on GitHub
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-foreground/15 px-5 text-sm font-medium hover:border-foreground"
                >
                  Live site <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
