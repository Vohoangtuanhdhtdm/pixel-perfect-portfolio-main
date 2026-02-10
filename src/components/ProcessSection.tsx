import { Search, Code, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Research & Architecture",
    description:
      "Deep-dive into requirements, user needs, and system constraints. Design scalable architecture with clear data flows and API contracts.",
  },
  {
    number: "02",
    icon: Code,
    title: "Development & Testing",
    description:
      "Clean, maintainable code with comprehensive test coverage. Iterative sprints with continuous integration and code reviews.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Deployment & Scaling",
    description:
      "CI/CD pipelines, infrastructure as code, monitoring and observability. Seamless scaling from MVP to millions of users.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 md:py-32 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            My <span className="text-gradient">Process</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            A battle-tested approach to turning ideas into production-grade software.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow: "0 8px 30px hsl(75 100% 50% / 0.08)",
                transition: { duration: 0.3 },
              }}
              className="relative rounded-2xl border border-border bg-card p-8 cursor-default"
            >
              <span className="font-display text-6xl font-bold text-primary/10 absolute top-4 right-6">
                {step.number}
              </span>
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
              >
                <step.icon className="text-primary mb-6" size={32} />
              </motion.div>
              <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
