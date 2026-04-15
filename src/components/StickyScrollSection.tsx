import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Database, Brain, KanbanSquare, Code2, BookOpen } from "lucide-react";
import { useRef } from "react";

// --- CONTENT UPDATED TO "ENGINEERING & RESEARCH MINDSET" ---
const stages = [
  {
    number: "01",
    icon: Database,
    title: "System Architecture & Design",
    description:
      "Every sustainable project starts with a solid blueprint (Low-level design). I focus on designing normalized Entity-Relationship Diagrams (ERD) and applying Clean Architecture to ensure systems remain easily maintainable and scalable.",
    tags: ["Clean Architecture", "Database ERD", "System Design"],
  },
  {
    number: "02",
    icon: Brain,
    title: "Data Science & ML Pipeline",
    description:
      "Processing and analyzing Big Data using PySpark. Training Machine Learning/Deep Learning models and applying Explainable AI (XAI) to ensure models are not only accurate but also transparent and highly interpretable.",
    tags: ["PySpark", "Machine Learning", "CNN / VGG"],
  },
  {
    number: "03",
    icon: KanbanSquare,
    title: "Agile & PMI Methodology",
    description:
      "Operating projects based on international standard management mindsets. Applying Agile/Scrum frameworks, breaking down phases into Sprints, mitigating risks, and strictly managing progress to ensure seamless module integration.",
    tags: ["PMI Ready", "Agile Workflow", "Risk Management"],
  },
  {
    number: "04",
    icon: Code2,
    title: "Fullstack Implementation",
    description:
      "Integrating complex AI/ML models into real-world platforms. Building robust Backends with ASP.NET API and highly optimized Frontends using React/Next.js or Flutter mobile applications.",
    tags: ["ASP.NET API", "React/TypeScript", "Flutter"],
  },
  {
    number: "05",
    icon: BookOpen,
    title: "Research & Publication",
    description:
      "Going beyond product launches, I continuously assess performance (Evaluation Metrics) and synthesize research findings into scientific papers for publication at national-level specialized conferences.",
    tags: ["Scientific Research", "MLOps", "Evaluation"],
  },
];

// --- TIMELINE UI COMPONENT ---
function ProcessItem({
  stage,
  index,
  isLast,
}: {
  stage: any;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -40% 0px", once: false });

  return (
    <div ref={ref} className="relative pl-12 md:pl-16 py-4 group">
      {/* --- TIMELINE LINE --- */}
      {!isLast && (
        <div className="absolute left-[19px] md:left-[27px] top-12 bottom-[-40px] w-0.5 bg-border">
          <motion.div
            animate={{ height: isInView ? "100%" : "0%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full bg-primary origin-top"
          />
        </div>
      )}

      {/* --- NODE ICON --- */}
      <div
        className={`absolute left-0 top-1 w-10 h-10 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-500 bg-background ${
          isInView
            ? "border-primary text-primary scale-110 shadow-[0_0_15px_rgba(var(--primary),0.3)]"
            : "border-muted text-muted-foreground"
        }`}
      >
        <stage.icon size={20} className="md:w-6 md:h-6" />
      </div>

      {/* --- CARD CONTENT --- */}
      <motion.div
        animate={{
          opacity: isInView ? 1 : 0.5,
          x: isInView ? 0 : 20,
        }}
        transition={{ duration: 0.5 }}
        className={`relative bg-card border rounded-2xl p-6 md:p-8 transition-all duration-500 ${
          isInView
            ? "border-primary/50 shadow-lg ring-1 ring-primary/20 bg-secondary/10"
            : "border-border hover:border-primary/20"
        }`}
      >
        <span className="absolute right-4 top-2 text-6xl md:text-8xl font-black text-muted/20 select-none -z-10 font-display">
          {stage.number}
        </span>

        <h3
          className={`text-xl md:text-2xl font-bold mb-3 transition-colors ${isInView ? "text-primary" : "text-foreground"}`}
        >
          {stage.title}
        </h3>

        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
          {stage.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {stage.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-xs font-medium px-2 py-1 rounded bg-background border border-border text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

const StickyScrollProcess = () => {
  return (
    <section
      id="process"
      className="relative bg-background py-24 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* --- LEFT COLUMN: STICKY HEADER --- */}
          <div className="col-span-1 lg:col-span-4 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="flex items-center gap-2 text-primary text-sm font-bold tracking-widest uppercase mb-4">
                <span className="w-8 h-px bg-primary"></span>
                Methodology
              </span>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Engineering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                  Approach
                </span>
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed">
                A problem-solving mindset ranging from System Architecture and
                Design to deploying machine learning models and publishing
                scientific research.
              </p>

              <div className="mt-8 p-4 bg-secondary/30 rounded-lg border border-border/50 backdrop-blur-sm">
                <p className="text-sm font-medium text-foreground italic">
                  "Architecture is about the important stuff. Whatever that is."
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  — Ralph Johnson
                </p>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN: TIMELINE PROCESS --- */}
          <div className="col-span-1 lg:col-span-8 flex flex-col pt-4 pb-24">
            {stages.map((stage, index) => (
              <ProcessItem
                key={stage.number}
                stage={stage}
                index={index}
                isLast={index === stages.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyScrollProcess;
