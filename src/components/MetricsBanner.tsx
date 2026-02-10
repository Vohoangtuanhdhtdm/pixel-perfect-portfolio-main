import { Award, GraduationCap, ScrollText, Languages } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  {
    icon: Award,
    value: "100%",
    label: "Scholarship", // Rút gọn label cho thoáng
    subLabel: "All Semesters",
  },
  {
    icon: GraduationCap,
    value: "8.68",
    label: "GPA Score",
    subLabel: "/ 10.0",
  },
  {
    icon: ScrollText,
    value: "01",
    label: "Scientific Paper",
    subLabel: "Published Research",
  },
  {
    icon: Languages,
    value: "750",
    label: "TOEIC",
    subLabel: "Professional Level",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const MetricsBanner = () => {
  return (
    <section className="border-y border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/0 md:divide-border/40" // Chỉ hiện gạch ngăn cách trên desktop
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center justify-center py-4 px-2 group"
            >
              {/* Icon nhỏ gọn, tinh tế hơn */}
              <div className="mb-3 text-muted-foreground group-hover:text-primary transition-colors duration-300">
                <metric.icon size={20} strokeWidth={1.5} />
              </div>

              {/* Con số: Font vừa phải, đậm nhưng không thô */}
              <div className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1">
                {metric.value}
              </div>

              {/* Label: Chữ nhỏ, in hoa nhẹ, tạo cảm giác sang trọng */}
              <div className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider flex flex-col items-center gap-0.5">
                <span>{metric.label}</span>
                {/* Dòng phụ (nếu muốn chi tiết hơn mà không rối) */}
                <span className="text-[10px] opacity-60 normal-case tracking-normal">
                  {metric.subLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsBanner;
