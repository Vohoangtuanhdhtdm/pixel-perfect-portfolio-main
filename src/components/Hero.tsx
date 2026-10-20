import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

const Hero = () => (
  <section className="relative pt-28 md:pt-36">
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <motion.p {...fadeUp(0)} className="eyebrow flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary/40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        {profile.availability} · {profile.location}
      </motion.p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <motion.h1
            {...fadeUp(0.05)}
            className="text-[clamp(3.25rem,10vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.045em]"
          >
            {profile.name}
          </motion.h1>
          <motion.p
            {...fadeUp(0.15)}
            className="mt-8 max-w-2xl text-xl leading-snug text-muted-foreground md:text-2xl"
          >
            {profile.tagline}
          </motion.p>
          <motion.div {...fadeUp(0.25)} className="mt-10 flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-primary"
            >
              View work <ArrowDownRight className="h-4 w-4" />
            </a>
            <a
              href={profile.cvUrl}
              download
              className="inline-flex h-12 items-center gap-2 rounded-full border border-foreground/15 bg-card px-6 text-sm font-medium transition-colors hover:border-foreground"
            >
              Download CV <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.figure
          {...fadeUp(0.2)}
          className="order-first max-w-[220px] lg:order-none lg:col-span-4 lg:max-w-none lg:justify-self-end"
        >
          <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-muted lg:w-[300px]">
            <img
              src={profile.avatar}
              alt={`Portrait of ${profile.nameAscii}`}
              className="h-full w-full object-cover grayscale-[15%]"
            />
          </div>
          <figcaption className="eyebrow mt-3">{profile.role}</figcaption>
        </motion.figure>
      </div>

      <motion.dl
        {...fadeUp(0.35)}
        className="mt-16 grid grid-cols-2 border-t border-border md:mt-24 md:grid-cols-4"
      >
        {profile.stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col-reverse py-6 md:py-8 ${i % 2 === 1 ? "pl-6 border-l border-border" : ""} ${
              i >= 2 ? "border-t border-border md:border-t-0" : ""
            } ${i === 2 ? "md:pl-6 md:border-l" : ""}`}
          >
            <dt className="eyebrow mt-2">{stat.label}</dt>
            <dd className="font-display text-4xl font-bold tracking-[-0.03em] md:text-5xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </motion.dl>
    </div>
  </section>
);

export default Hero;
