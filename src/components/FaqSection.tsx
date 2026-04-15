import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Code2,
  Cpu,
  Globe,
  MessageSquare,
  Zap,
  Briefcase,
  CheckCircle2,
  Brain,
} from "lucide-react";
import { MouseEvent } from "react";

// --- DATA TRANSFORMED INTO "INSIGHTS" ---
// --- DATA TRANSFORMED INTO "CORE COMPETENCIES & VISION" ---
const insights = [
  {
    title: "Tech Stack & Architecture",
    icon: Code2,
    description:
      "Leveraging modern technologies and optimized architectures to build scalable systems.",
    content: (
      <div className="flex flex-wrap gap-2 mt-4">
        {[
          "ASP.NET API / MVC",
          "Clean Architecture",
          "React / TypeScript",
          "SQL Server",
          "Flutter / Firebase",
          "Node.js",
        ].map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-mono text-primary"
          >
            {tech}
          </span>
        ))}
      </div>
    ),
    colSpan: "md:col-span-2", // Wide card
  },
  {
    title: "Project Management",
    icon: Briefcase,
    description:
      "Applying professional management mindsets to software development.",
    content: (
      <div className="mt-4 flex items-center gap-3">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-xs font-bold text-blue-500">
            Agile
          </div>
          <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-xs font-bold text-purple-500">
            PMI
          </div>
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          PMI Ready Certification
        </span>
      </div>
    ),
    colSpan: "md:col-span-1",
  },
  {
    title: "Research Focus: PropTech",
    icon: Globe,
    description:
      "Applying core technologies to solve real estate valuation and recommendation problems (KGS Project).",
    content: (
      <div className="mt-4 text-sm text-muted-foreground">
        <p>• Automated Valuation Models (AVM)</p>
        <p>• Real Estate Recommendation Systems</p>
      </div>
    ),
    colSpan: "md:col-span-1",
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    description:
      "Researching and deploying deep learning models into practical applications.",
    content: (
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="p-3 bg-secondary/30 rounded-lg text-center border border-white/5">
          <div className="text-xs text-muted-foreground uppercase font-bold">
            Data & ML
          </div>
          <div className="text-sm font-semibold mt-1 flex flex-col items-center gap-1">
            <span className="text-xs font-mono">Python / Scikit</span>
            <span className="text-xs font-mono">TensorFlow</span>
          </div>
        </div>
        <div className="p-3 bg-secondary/30 rounded-lg text-center border border-white/5">
          <div className="text-xs text-muted-foreground uppercase font-bold">
            Infrastructure
          </div>
          <div className="text-sm font-semibold mt-1 flex flex-col items-center gap-1">
            <span className="text-xs font-mono">AWS Cloud</span>
            <span className="text-xs font-mono">MLOps</span>
          </div>
        </div>
      </div>
    ),
    colSpan: "md:col-span-2",
  },
  {
    title: "Academic & Professional Goals",
    icon: Zap,
    description:
      "Long-term vision to grow from an excellent software engineer to a systems architect.",
    content: (
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <CheckCircle2 className="w-4 h-4 text-primary" />
        <span>International Research Publications</span>
        <span className="w-1 h-1 rounded-full bg-border mx-1" />
        <CheckCircle2 className="w-4 h-4 text-primary" />
        <span>Distributed Systems Optimization</span>
      </div>
    ),
    colSpan: "md:col-span-3", // Full-width card
  },
];

// --- CARD COMPONENT WITH SPOTLIGHT EFFECT ---
function InsightCard({ item }: { item: (typeof insights)[number] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative border border-border bg-card px-6 py-6 rounded-2xl overflow-hidden ${item.colSpan}`}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight effect on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(var(--primary), 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Card Content */}
      <div className="relative flex flex-col h-full justify-between">
        <div>
          <div className="h-10 w-10 rounded-full bg-secondary/50 flex items-center justify-center mb-4 text-primary border border-white/5">
            <item.icon className="w-5 h-5" />
          </div>

          <h3 className="font-display text-lg font-bold text-foreground mb-2">
            {item.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>

        {item.content}
      </div>
    </motion.div>
  );
}

// --- MAIN COMPONENT ---
const FaqBentoGrid = () => {
  return (
    <section id="faq" className="py-24 bg-background relative overflow-hidden">
      {/* Light Background Decor */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="text-primary text-xs font-bold tracking-widest uppercase mb-3 block">
            Information
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Working{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
              Philosophy
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            More than just answers, this is how I operate, the technologies I
            use, and my commitment to your projects.
          </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {insights.map((item, index) => (
            <InsightCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqBentoGrid;
