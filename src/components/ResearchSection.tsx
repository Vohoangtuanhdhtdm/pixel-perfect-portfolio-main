import { ArrowUpRight, FileText } from "lucide-react";
import { certifications, education, publication } from "@/data/academics";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const ResearchSection = () => (
  <section id="research" className="scroll-mt-20 bg-card py-24 md:py-32">
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <SectionHeader number="02" kicker="Research & academics" title="Research that ships into products." />

      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <article className="border-l-2 border-primary pl-6 md:pl-10">
            <p className="eyebrow">
              Publication · {publication.venue} · {publication.year}
            </p>
            <h3 className="mt-5 text-2xl font-semibold leading-snug tracking-[-0.02em] md:text-[2rem] md:leading-[1.2]">
              {publication.title}
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Võ Hoàng Tuấn et al. — <span className="italic">{publication.role}</span>
            </p>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">{publication.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {publication.tags.map((t) => (
                <li key={t} className="rounded-full border border-border px-3 py-1 font-mono text-xs">
                  {t}
                </li>
              ))}
            </ul>
            <a
              href={publication.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-primary"
            >
              <FileText className="h-4 w-4" /> Read PDF
            </a>
          </article>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-4">
          <dl className="divide-y divide-border border-y border-border">
            <div className="py-5">
              <dt className="eyebrow">Education</dt>
              <dd className="mt-2 font-medium">{education.school}</dd>
              <dd className="text-sm text-muted-foreground">
                {education.major} · {education.period}
              </dd>
            </div>
            <div className="py-5">
              <dt className="eyebrow">GPA</dt>
              <dd className="mt-2 font-display text-4xl font-bold tracking-[-0.03em]">{education.gpa}</dd>
            </div>
            <div className="py-5">
              <dt className="eyebrow">Honors</dt>
              <dd className="mt-2 font-medium">{education.honors}</dd>
            </div>
          </dl>
        </Reveal>
      </div>

      <Reveal className="mt-20">
        <h3 className="eyebrow mb-4">Certifications</h3>
        <ul className="border-t border-foreground">
          {certifications.map((c) => (
            <li
              key={c.name}
              data-testid="cert-row"
              className="grid grid-cols-1 gap-1 border-b border-border py-5 md:grid-cols-12 md:items-center md:gap-6"
            >
              <span className="font-medium md:col-span-5">{c.name}</span>
              <span className="text-sm text-muted-foreground md:col-span-3">{c.issuer}</span>
              <span className="font-mono text-xs text-muted-foreground md:col-span-2">{c.date}</span>
              <span className="md:col-span-2 md:text-right">
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline inline-flex items-center gap-1 text-sm text-primary"
                  >
                    {c.url.startsWith("/") ? "View" : "Verify"} <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default ResearchSection;
