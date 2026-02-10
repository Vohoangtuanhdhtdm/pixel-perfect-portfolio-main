import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Code2,
  Cpu,
  Globe,
  MessageSquare,
  Zap,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { MouseEvent } from "react";

// --- DỮ LIỆU ĐƯỢC CHUYỂN ĐỔI THÀNH DẠNG "INSIGHT" ---
const insights = [
  {
    title: "Tech Arsenal",
    icon: Code2,
    description: "My primary weapons of choice for building scalable systems.",
    content: (
      <div className="flex flex-wrap gap-2 mt-4">
        {[
          "React/Next.js",
          "TypeScript",
          ".NET Core",
          "Node.js",
          "PostgreSQL",
          "Flutter",
          "AWS/Azure",
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
    colSpan: "md:col-span-2", // Card này rộng gấp đôi
  },
  {
    title: "Availability",
    icon: Zap,
    description: "Currently open for select projects starting Q2 2026.",
    content: (
      <div className="mt-4 flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-sm font-medium text-green-500">
          Accepting New Clients
        </span>
      </div>
    ),
    colSpan: "md:col-span-1",
  },
  {
    title: "Communication",
    icon: MessageSquare,
    description: "Async-first with regular syncs. Weekly reports & clear docs.",
    content: (
      <div className="mt-4 text-sm text-muted-foreground">
        <p>• Slack/Teams for daily comms</p>
        <p>• Weekly Video Demos</p>
        <p>• Jira/Trello for tracking</p>
      </div>
    ),
    colSpan: "md:col-span-1",
  },
  {
    title: "Engagement Model",
    icon: Briefcase,
    description: "Flexible options tailored to your project needs.",
    content: (
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="p-3 bg-secondary/30 rounded-lg text-center border border-white/5">
          <div className="text-xs text-muted-foreground uppercase font-bold">
            Fixed Price
          </div>
          <div className="text-sm font-semibold mt-1">Project Based</div>
        </div>
        <div className="p-3 bg-secondary/30 rounded-lg text-center border border-white/5">
          <div className="text-xs text-muted-foreground uppercase font-bold">
            Retainer
          </div>
          <div className="text-sm font-semibold mt-1">Monthly</div>
        </div>
      </div>
    ),
    colSpan: "md:col-span-2",
  },
  {
    title: "Client Fit",
    icon: Globe,
    description: "From early-stage Startups to Fortune 500 Enterprises.",
    content: (
      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <CheckCircle2 className="w-4 h-4 text-primary" />
        <span>MVPs & Prototyping</span>
        <span className="w-1 h-1 rounded-full bg-border mx-1" />
        <CheckCircle2 className="w-4 h-4 text-primary" />
        <span>Distributed Systems</span>
      </div>
    ),
    colSpan: "md:col-span-3", // Card này rộng full hàng
  },
];

// --- COMPONENT CARD VỚI HIỆU ỨNG SPOTLIGHT ---
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
      {/* Hiệu ứng Spotlight khi rê chuột */}
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

      {/* Nội dung Card */}
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

// --- COMPONENT CHÍNH ---
const FaqBentoGrid = () => {
  return (
    <section id="faq" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decor nhẹ */}
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
            Không chỉ là câu trả lời, đây là cách tôi vận hành, công nghệ tôi sử
            dụng và cam kết của tôi đối với dự án của bạn.
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
