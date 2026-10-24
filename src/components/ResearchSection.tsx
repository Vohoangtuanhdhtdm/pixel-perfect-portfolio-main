import { ChevronRight, FileText } from "lucide-react";
import { certifications, education, publication } from "@/data/academics";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const ResearchSection = () => (
  <section id="research" className="scroll-mt-24 py-24 md:py-32">
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <SectionHeader number="02" kicker="Research & academics" title="Research that ships into products." />

      <div className="grid gap-4 md:gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <article className="glass relative h-full overflow-hidden rounded-[32px] p-6 md:p-10">
            <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <p className="glass-inset relative inline-flex rounded-full px-3 py-1 text-[12px] font-semibold text-foreground/70">
              Publication · {publication.venue} · {publication.year}
            </p>
            <h3 className="relative mt-6 text-2xl font-semibold leading-snug tracking-[-0.02em] md:text-[2rem] md:leading-[1.2]">
              {publication.title}
            </h3>
            <p className="relative mt-4 text-sm text-muted-foreground">
              Võ Hoàng Tuấn et al. — <span className="italic">{publication.role}</span>
            </p>
            <p className="relative mt-6 max-w-2xl leading-relaxed text-foreground/75">{publication.summary}</p>
            <ul className="relative mt-6 flex flex-wrap gap-2">
              {publication.tags.map((t) => (
                <li key={t} className="glass-inset rounded-full px-3 py-1 text-xs font-medium text-foreground/70">
                  {t}
                </li>
              ))}
            </ul>
            <a href={publication.pdfUrl} target="_blank" rel="noreferrer" className="btn-primary relative mt-8">
              <FileText className="h-4 w-4" /> Read PDF
            </a>
          </article>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-4">
          <dl className="grid h-full gap-4 md:gap-5">
            <div className="glass rounded-[28px] p-6">
              <dt className="text-[13px] font-semibold text-muted-foreground">Education</dt>
              <dd className="mt-2 font-semibold">{education.school}</dd>
              <dd className="text-sm text-muted-foreground">
                {education.major} · {education.period}
              </dd>
            </div>
            <div className="glass rounded-[28px] p-6">
              <dt className="text-[13px] font-semibold text-muted-foreground">GPA</dt>
              <dd className="mt-1 font-display text-5xl font-bold tracking-[-0.03em]">{education.gpa}</dd>
            </div>
            <div className="glass rounded-[28px] p-6">
              <dt className="text-[13px] font-semibold text-muted-foreground">Honors</dt>
              <dd className="mt-2 font-semibold">{education.honors}</dd>
            </div>
          </dl>
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <h3 className="mb-3 px-5 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
          Certifications
        </h3>
        {/* Grouped list in the style of iOS Settings. */}
        <ul className="glass divide-y divide-white/60 overflow-hidden rounded-[28px]">
          {certifications.map((c) => {
            const content = (
              <>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-primary text-[13px] font-bold text-primary-foreground shadow-sm">
                  {c.name.charAt(0)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{c.name}</span>
                  <span className="block truncate text-[13px] text-muted-foreground">
                    {c.issuer} · {c.date}
                  </span>
                </span>
              </>
            );
            return (
              <li key={c.name} data-testid="cert-row">
                {c.url ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/50 active:bg-white/70"
                  >
                    {content}
                    <span className="hidden text-sm font-medium text-primary sm:inline">
                      {c.url.startsWith("/") ? "View" : "Verify"}
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </a>
                ) : (
                  <div className="flex items-center gap-4 px-5 py-4">{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default ResearchSection;
