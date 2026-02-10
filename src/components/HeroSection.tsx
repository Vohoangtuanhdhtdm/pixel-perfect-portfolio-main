import { ArrowRight, Send, Code2, Cpu, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-background selection:bg-primary/20">
      {/* --- 1. BACKGROUND UPGRADE --- */}
      {/* Lớp lưới (Grid Pattern) tạo cảm giác kỹ thuật */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Đốm sáng nền (Giữ nguyên nhưng giảm opacity để grid rõ hơn) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- CỘT 1: TEXT CONTENT --- */}
          <div className="max-w-2xl order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              {/* Thay đổi nhỏ: Dùng từ "Creator" thay vì Engineer nghe bay bổng hơn */}
              <span className="text-sm font-medium text-foreground/80">
                Hello! I'm Hoang Tuan
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
            >
              Crafting Logic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
                With a Human Touch
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg"
            >
              I believe technology should feel invisible. I turn complex
              problems into simple, elegant experiences that just work.
              {/* (Dịch: Tôi tin công nghệ nên "vô hình". Tôi biến những vấn đề phức tạp thành trải nghiệm đơn giản, tinh tế.) */}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="h-12 px-8 text-base shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300"
              >
                See My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base border-primary/20 hover:bg-primary/5"
              >
                Let's Talk <Send className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          {/* --- CỘT 2: HÌNH ẢNH & FLOATING ELEMENTS (Phần nâng cấp chính) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-full flex justify-center items-center order-1 lg:order-2"
          >
            {/* Vòng tròn trang trí xoay nhẹ phía sau */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[350px] h-[350px] border border-dashed border-primary/20 rounded-full"
            />

            {/* Container chính chứa ảnh */}
            <div className="relative w-[280px] md:w-[320px] aspect-square">
              {/* Lớp nền lệch (Offset Background) tạo độ dày */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-600 rounded-[2rem] rotate-6 opacity-20 blur-sm transform scale-105" />
              <div className="absolute inset-0 bg-card rounded-[2rem] rotate-6 border border-border shadow-xl" />

              {/* Ảnh chính */}
              <div className="absolute inset-0 bg-background rounded-[2rem] overflow-hidden border border-border shadow-2xl rotate-0 z-10 group">
                {/* Sửa lại đường dẫn ảnh của bạn ở đây */}
                <img
                  src="./avatarProfile.jpg"
                  alt="Hoang Tuan"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* --- FLOATING ICONS (Các icon bay bay) --- */}
              {/* Icon 1: Code - Góc trên trái */}
              <FloatingBadge
                icon={<Code2 size={20} className="text-blue-500" />}
                className="-top-6 -left-6 z-20 delay-0"
              />

              {/* Icon 2: CPU - Góc trên phải */}
              <FloatingBadge
                icon={<Cpu size={20} className="text-purple-500" />}
                className="top-8 -right-8 z-20 delay-700"
              />

              {/* Icon 3: Zap - Góc dưới trái */}
              <FloatingBadge
                icon={<Zap size={20} className="text-yellow-500" />}
                className="-bottom-4 -left-4 z-20 delay-1000"
              />

              {/* Card trạng thái: Global - Góc dưới phải */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-8 -right-2 z-30 bg-card/80 backdrop-blur-md border border-border p-3 rounded-xl shadow-lg flex items-center gap-3"
              >
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                  <Globe
                    size={18}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                    I'm Software Engineer
                  </p>
                  <p className="text-xs font-bold">Việt Nam</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FloatingBadge = ({ icon, className }) => {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute bg-card p-3 rounded-2xl shadow-lg border border-border ${className}`}
    >
      {icon}
    </motion.div>
  );
};

export default HeroSection;
