import { motion } from "framer-motion";

const technologies = [
  "React", "Next.js", "TypeScript", ".NET", "Python", "Flutter",
  "Node.js", "PostgreSQL", "AWS", "Docker", "Kubernetes", "GraphQL",
  "Redis", "Terraform", "Go", "Figma",
];

const TechMarquee = () => {
  // Double the items for seamless loop
  const items = [...technologies, ...technologies];

  return (
    <section id="tech" className="py-12 md:py-16 border-y border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden"
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            className="flex whitespace-nowrap w-max"
          >
            {items.map((tech, i) => (
              <motion.span
                key={i}
                whileHover={{ color: "hsl(var(--primary))", scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center px-4 md:px-6 lg:px-8 text-xl md:text-2xl lg:text-3xl font-display font-bold text-muted-foreground/40 select-none cursor-default"
              >
                {tech}
                <span className="mx-4 md:mx-6 lg:mx-8 text-primary/30">•</span>
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechMarquee;
