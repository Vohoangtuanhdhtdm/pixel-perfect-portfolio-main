import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { profile } from "@/data/profile";
import { copyEmail } from "@/lib/copyEmail";
import Reveal from "./Reveal";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (await copyEmail(profile.email)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 border-t border-foreground pb-10 pt-24 md:pt-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="eyebrow">
            <span className="text-primary">06</span> · Contact
          </p>
          <h2 className="mt-6 max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] font-extrabold leading-[0.92] tracking-[-0.045em]">
            Let's build something reliable.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            onClick={handleCopy}
            className="group inline-flex items-center gap-3 text-left font-display text-xl font-semibold tracking-[-0.01em] hover:text-primary md:text-3xl"
          >
            <span className="break-all">{profile.email}</span>
            {copied ? (
              <Check className="h-5 w-5 shrink-0 text-primary" aria-label="Copied" />
            ) : (
              <Copy className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary" aria-label="Copy email" />
            )}
          </button>
          <div className="flex flex-wrap gap-3">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-foreground/15 px-5 text-sm font-medium transition-colors hover:border-foreground"
              >
                {s.label} <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-primary"
            >
              CV <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <footer className="mt-24 flex flex-col gap-2 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} {profile.nameAscii}</span>
          <span>{profile.location}</span>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;
