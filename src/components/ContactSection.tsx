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
    <section id="contact" className="scroll-mt-24 pb-8 pt-24 md:pt-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[40px] px-6 py-12 md:px-14 md:py-20">
            <div aria-hidden className="absolute -left-20 -top-28 h-72 w-72 rounded-full bg-[#9EC5FF]/60 blur-3xl" />
            <div aria-hidden className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#C9B8FF]/60 blur-3xl" />

            <p className="glass-inset relative inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4">
              <span className="grid h-7 min-w-7 place-items-center rounded-full bg-primary px-2 font-mono text-[11px] font-semibold text-primary-foreground">
                06
              </span>
              <span className="text-[13px] font-semibold text-foreground/80">Contact</span>
            </p>
            <h2 className="relative mt-8 max-w-4xl text-[clamp(2.5rem,7.5vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
              Let's build something reliable.
            </h2>

            <div className="relative mt-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <button
                type="button"
                onClick={handleCopy}
                className="glass-inset group inline-flex w-fit max-w-full items-center gap-3 rounded-full px-5 py-3 text-left font-display text-lg font-semibold tracking-[-0.01em] transition-transform active:scale-[0.98] md:text-2xl"
              >
                <span className="break-all">{profile.email}</span>
                {copied ? (
                  <Check className="h-5 w-5 shrink-0 text-[#34C759]" aria-label="Copied" />
                ) : (
                  <Copy
                    className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary"
                    aria-label="Copy email"
                  />
                )}
              </button>
              <div className="flex flex-wrap gap-3">
                {profile.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="btn-glass">
                    {s.label} <ArrowUpRight className="h-4 w-4" />
                  </a>
                ))}
                <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="btn-primary">
                  CV <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <footer className="mt-8 flex flex-col gap-1 px-2 text-[13px] text-muted-foreground md:flex-row md:justify-between">
          <span>
            © {new Date().getFullYear()} {profile.nameAscii}
          </span>
          <span>{profile.location}</span>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;
