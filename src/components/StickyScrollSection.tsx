import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Search,
  Code2,
  Rocket,
  ShieldCheck,
  Lightbulb,
  Workflow,
} from "lucide-react";
import { useRef } from "react";

// --- NỘI DUNG SÁNG TẠO MỚI ---
const stages = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Discovery & Blueprint",
    description:
      "Chúng ta không bắt đầu bằng code, mà bằng sự thấu hiểu. Tôi phân tích sâu yêu cầu nghiệp vụ, xác định 'pain-points' và phác thảo lộ trình kỹ thuật rõ ràng để đảm bảo ROI cao nhất cho dự án.",
    tags: ["Market Analysis", "User Persona", "Tech Stack Selection"],
  },
  {
    number: "02",
    icon: Workflow,
    title: "System Architecture",
    description:
      "Xây dựng nền móng vững chắc. Thiết kế sơ đồ luồng dữ liệu, kiến trúc Database và API contracts. Đảm bảo hệ thống có khả năng mở rộng (Scalability) và bảo trì dễ dàng trong tương lai.",
    tags: ["Database Schema", "System Design", "API Spec"],
  },
  {
    number: "03",
    icon: Code2,
    title: "Agile Development",
    description:
      "Viết code sạch (Clean Code), tối ưu và tuân thủ các nguyên tắc SOLID. Chia nhỏ dự án thành các Sprint, cập nhật tiến độ liên tục giúp bạn nắm bắt sản phẩm từng ngày.",
    tags: ["Clean Code", "React/Next.js", ".NET Core"],
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Rigorous QA & Testing",
    description:
      "Sản phẩm chỉ xuất xưởng khi đạt chuẩn 'Zero Critical Bugs'. Thực hiện Unit Test, Integration Test và kiểm tra hiệu năng để đảm bảo trải nghiệm mượt mà nhất.",
    tags: ["Unit Testing", "Performance", "Security Audit"],
  },
  {
    number: "05",
    icon: Rocket,
    title: "Deployment & Scaling",
    description:
      "Triển khai tự động hóa với CI/CD Pipelines. Thiết lập Monitoring để theo dõi sức khỏe hệ thống 24/7 và sẵn sàng các phương án mở rộng khi lượng người dùng tăng đột biến.",
    tags: ["CI/CD", "Docker", "Cloud Ops"],
  },
];

// --- COMPONENT GIAO DIỆN TIMELINE ---
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
  // Kích hoạt animation khi thẻ xuất hiện ở giữa màn hình
  const isInView = useInView(ref, { margin: "-20% 0px -40% 0px", once: false });

  return (
    <div ref={ref} className="relative pl-12 md:pl-16 py-4 group">
      {/* --- TIMELINE LINE (Đường kẻ dọc) --- */}
      {!isLast && (
        <div className="absolute left-[19px] md:left-[27px] top-12 bottom-[-40px] w-0.5 bg-border">
          {/* Thanh tiến trình chạy dọc theo đường kẻ khi active */}
          <motion.div
            animate={{ height: isInView ? "100%" : "0%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full bg-primary origin-top"
          />
        </div>
      )}

      {/* --- NODE ICON (Điểm tròn bên trái) --- */}
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
        {/* Background Number Decoration */}
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

        {/* Tags nhỏ bên dưới */}
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
      {/* Background Decor */}
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
                Workflow
              </span>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                My Development <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                  Journey
                </span>
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Quy trình làm việc chuyên nghiệp được đúc kết qua nhiều dự án
                thực tế. Tôi biến những ý tưởng phức tạp thành sản phẩm phần mềm
                vận hành mượt mà.
              </p>

              <div className="mt-8 p-4 bg-secondary/30 rounded-lg border border-border/50 backdrop-blur-sm">
                <p className="text-sm font-medium text-foreground italic">
                  "Quality is not an act, it is a habit."
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  — Aristotle
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
