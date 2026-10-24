import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import CountUp from "./CountUp";
import TextReveal from "./TextReveal";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUpIn = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.8, delay, ease },
});

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const fadeUp = (delay: number) => (reduceMotion ? { initial: false as const } : fadeUpIn(delay));

  // Gentle parallax on the portrait as the hero scrolls away.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -60]);

  return (
    <section ref={sectionRef} className="relative pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.p
          {...fadeUp(0)}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-foreground/80"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34C759]/50 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34C759]" />
          </span>
          {profile.availability} · {profile.location}
        </motion.p>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className="text-[clamp(3.25rem,10vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
              <TextReveal text={profile.name} trigger="mount" delay={0.1} />
            </h1>
            <motion.p
              {...fadeUp(0.45)}
              className="mt-8 max-w-2xl text-xl leading-snug text-muted-foreground md:text-2xl"
            >
              {profile.tagline}
            </motion.p>
            <motion.div {...fadeUp(0.55)} className="mt-10 flex flex-wrap gap-3">
              <a href="#work" className="btn-primary group">
                View work
                <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
              <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="btn-glass group">
                View CV
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>

          <motion.figure
            style={{ y: portraitY }}
            className="glass order-first w-[250px] rounded-[32px] p-2.5 sm:w-[270px] lg:order-none lg:col-span-4 lg:w-[320px] lg:justify-self-end"
          >
            <motion.div
              initial={reduceMotion ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.1, delay: 0.2, ease }}
              className="aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-muted"
            >
              <motion.img
                src={profile.avatar}
                alt={`Portrait of ${profile.nameAscii}`}
                initial={reduceMotion ? false : { scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, delay: 0.2, ease }}
                className="h-full w-full object-cover grayscale-[15%]"
              />
            </motion.div>
            <motion.figcaption {...fadeUp(0.8)} className="flex items-center justify-center gap-3 px-2 pb-1 pt-3 lg:justify-between">
              <span className="hidden text-sm font-semibold lg:inline">{profile.nameAscii}</span>
              <span className="whitespace-nowrap rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                {profile.role}
              </span>
            </motion.figcaption>
          </motion.figure>
        </div>

        <motion.dl {...fadeUp(0.7)} className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4 md:gap-4">
          {profile.stats.map((stat, i) => (
            <div key={stat.label} className="glass flex flex-col-reverse rounded-[28px] p-5 md:p-6">
              <dt className="mt-1 text-[13px] font-medium text-muted-foreground">{stat.label}</dt>
              <dd className="font-display text-4xl font-bold tracking-[-0.03em] md:text-5xl">
                <CountUp value={stat.value} delay={0.8 + i * 0.1} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
};

export default Hero;
