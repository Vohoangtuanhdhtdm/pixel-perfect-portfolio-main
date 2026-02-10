import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import {
  Github,
  ArrowUpRight,
  Database,
  Brain,
  Smartphone,
  LayoutTemplate,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";

// --- DỮ LIỆU DỰ ÁN ---
const projects = [
  {
    id: 1,
    category: "Web API & Clean Arch",
    icon: <Database className="w-4 h-4" />,
    title: "GoGo Course Platform",
    description:
      "Nền tảng E-Learning quy mô lớn với .NET Core. Tối ưu hóa truy vấn SQL, tích hợp Redis Caching và kiến trúc Clean Architecture dễ dàng mở rộng.",
    tags: [".NET Core", "Clean Arch", "SQL Server", "Redis"],
    metric: "High Performance",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    category: "Big Data & ML",
    icon: <Brain className="w-4 h-4" />,
    title: "Fraud Detection System",
    description:
      "Hệ thống phát hiện gian lận ngân sách sử dụng Spark/Hadoop xử lý dữ liệu lớn. Áp dụng thuật toán Peer-based Anomaly Detection độ chính xác cao.",
    tags: ["Big Data", "Spark", "Python", "Anomaly Detection"],
    metric: "Fraud Prevention",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    category: "Mobile App",
    icon: <Smartphone className="w-4 h-4" />,
    title: "Mental Health App",
    description:
      "Ứng dụng Flutter đa nền tảng hỗ trợ sức khỏe tinh thần. UI/UX mượt mà, tích hợp Firebase và các bài tập thiền định cá nhân hóa.",
    tags: ["Flutter", "Dart", "Firebase", "Mobile UX"],
    metric: "Cross-Platform",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: 4,
    category: "AI Recommendation",
    icon: <Brain className="w-4 h-4" />,
    title: "Real Estate AI (KNN)",
    description:
      "Engine gợi ý bất động sản sử dụng thuật toán K-Nearest Neighbors (KNN) và lọc dựa trên nội dung để tìm căn hộ phù hợp nhất cho khách hàng.",
    tags: ["Python", "KNN", "Scikit-learn", "Pandas"],
    metric: "Personalized AI",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    id: 5,
    category: "Deep Learning",
    icon: <Brain className="w-4 h-4" />,
    title: "Property Valuation (GNN)",
    description:
      "Mô hình định giá nhà đất chuyên sâu sử dụng Graph Neural Networks (GNN) để phân tích mối quan hệ không gian giữa các bất động sản.",
    tags: ["GNN", "PyTorch", "Geospatial", "AI Model"],
    metric: "Deep Learning",
    color: "from-indigo-500/20 to-violet-500/20",
  },
  {
    id: 6,
    category: "Fullstack MVC",
    icon: <LayoutTemplate className="w-4 h-4" />,
    title: "TuanStore E-commerce",
    description:
      "Giải pháp thương mại điện tử trọn gói với ASP.NET MVC. Đầy đủ tính năng giỏ hàng, thanh toán và quản trị đơn hàng chuyên nghiệp.",
    tags: ["ASP.NET MVC", "C#", "SQL Server", "Bootstrap"],
    metric: "Fullstack",
    color: "from-slate-500/20 to-gray-500/20",
  },
];

// --- COMPONENT THẺ DỰ ÁN (OPTIMIZED) ---
function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: (typeof projects)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Logic tính toán:
  // Thay vì phụ thuộc vào scroll global phức tạp, ta dùng logic đơn giản:
  // Card càng ở cuối danh sách thì targetScale càng nhỏ đi một chút để tạo hiệu ứng chiều sâu

  // Phạm vi biến đổi animation cho từng card
  const range = [index * (1 / total), 1];
  const targetScale = 1 - (total - index) * 0.05;

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      className="sticky top-0 flex items-center justify-center"
      style={{
        // Tính toán khoảng cách top để các card xếp chồng lộ ra tiêu đề
        // index * 40px: Mỗi card cách nhau 40px
        top: `calc(15vh + ${index * 40}px)`,
        marginBottom: `${total * 20}px`, // Tạo khoảng thở phía dưới
      }}
    >
      <motion.div
        style={{ scale }}
        className="relative flex flex-col h-[500px] w-full max-w-4xl rounded-3xl bg-card border border-border/50 overflow-hidden shadow-2xl origin-top will-change-transform"
      >
        <div className="flex flex-col lg:flex-row h-full">
          {/* --- Cột Trái: Visual --- */}
          <div
            className={`w-full lg:w-5/12 relative bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden group`}
          >
            {/* Số thứ tự trang trí */}
            <span className="absolute -bottom-12 -left-6 text-[180px] font-bold text-white/10 select-none leading-none z-0">
              {index + 1}
            </span>

            <div className="relative z-10 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-500">
              <div className="text-foreground/80 scale-[2.5]">
                {project.icon}
              </div>
            </div>

            {/* Pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          </div>

          {/* --- Cột Phải: Nội dung --- */}
          <div className="flex-1 p-8 flex flex-col justify-between bg-card/95 backdrop-blur-sm">
            <div>
              <div className="flex justify-between items-start mb-6">
                <Badge
                  variant="outline"
                  className="gap-1.5 py-1.5 px-3 border-primary/20 bg-primary/5 text-primary"
                >
                  {project.icon} {project.category}
                </Badge>
                <Badge
                  variant="secondary"
                  className="font-mono text-xs text-muted-foreground"
                >
                  {project.metric}
                </Badge>
              </div>

              <h3 className="font-display text-3xl font-bold mb-3 text-foreground tracking-tight">
                {project.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-secondary/50 text-[11px] font-medium text-secondary-foreground border border-border/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-border/40">
              <Button
                size="sm"
                className="rounded-full px-5 gap-2 shadow-lg shadow-primary/10"
              >
                Case Study <ArrowUpRight size={14} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full px-5 gap-2"
              >
                <Github size={14} /> Code
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- COMPONENT CHÍNH ---
const ProjectsGrid = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" className="bg-background pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Layout Grid: Tách biệt hoàn toàn 2 cột */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
          {/* --- Cột Trái: Sticky Sidebar --- */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-px w-8 bg-primary"></span>
                  <span className="text-primary text-xs font-bold tracking-widest uppercase">
                    Portfolio
                  </span>
                </div>

                <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  My <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                    Projects
                  </span>
                </h2>

                <p className="text-muted-foreground text-base mb-8 leading-relaxed">
                  From the .NET Core Clean Architecture platform to complex
                  AI/Deep Learning models. Below are my most favorite projects.
                </p>

                <Button variant="outline" className="rounded-full px-8">
                  Download CV
                </Button>
              </motion.div>
            </div>
          </div>

          {/* --- Cột Phải: Danh sách dự án (Scroll Container) --- */}
          <div ref={containerRef} className="lg:col-span-8 relative">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                index={index}
                total={projects.length}
                project={project}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
