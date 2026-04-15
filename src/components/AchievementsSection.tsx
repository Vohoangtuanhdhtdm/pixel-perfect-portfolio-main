import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  FileText,
  X,
  ExternalLink,
  Calendar,
  FileDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- REDESIGNED DATA & DETAILED CONTENT ADDED ---
const achievements = [
  {
    id: "01",
    type: "Scientific Research",
    title: "National Scientific Research Paper",
    organization: "National Scientific Conference",
    date: "2026",
    description:
      "Author of a research paper on a Real Estate Recommendation System applying Machine Learning models.",
    detailedContent:
      "The research focused on applying modern machine learning algorithms to solve the real estate recommendation problem based on personalized user needs. The paper's acceptance at a national conference is a major milestone, confirming the practicality and accuracy of my proposed model.",
    tags: ["Machine Learning", "Research Paper", "PropTech"],
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop",
    link: "#",
    // Thêm đường dẫn tới file PDF bài báo của bạn.
    // Lưu ý: Đặt file PDF vào thư mục 'public' của dự án (ví dụ: public/papers/research-paper.pdf)
    pdfUrl: "/research_paper.pdf",
  },
  {
    id: "02",
    type: "Technical Certification",
    title: "Microsoft Back-end Foundation",
    organization: "Microsoft",
    date: "2025 - 2026",
    description:
      "Certification of a solid professional foundation in Backend programming, database management, and API deployment according to Microsoft standards.",
    detailedContent:
      "This certification helped me systematize all server-side processing flows, from optimizing SQL Server queries and structuring C#/.NET source code to securing API Endpoints. This is the core foundation that gives me the confidence to apply Clean Architecture to real-world projects.",
    tags: ["Microsoft", "Backend", ".NET", "API"],
    image:
      "https://res.cloudinary.com/dqwxudyzu/image/upload/v1755875450/chungchi_pkenef.png",
    link: "https://www.coursera.org/account/accomplishments/verify/W6IAMCA39TL5",
  },
  {
    id: "03",
    type: "Cloud Certification",
    title: "AWS Cloud Certification",
    organization: "Issued by Miai",
    date: "2025 - 2026",
    description:
      "Equipped with skills to operate, deploy, and manage software applications on the Amazon Web Services (AWS) cloud computing platform.",
    detailedContent:
      "Understanding the importance of moving applications to the production environment, this certification provided me with a Cloud Computing mindset. I can configure virtual server instances (EC2), set up data storage (S3), and manage routing, ensuring I am ready to scale future web and AI projects.",
    tags: ["AWS", "Cloud Computing", "Deployment"],
    image:
      "https://res.cloudinary.com/dqwxudyzu/image/upload/q_auto/f_auto/v1776240559/UC-98ccc48d-a709-4f03-9c27-890d6a421387_gjjqes.jpg",
    link: "https://www.udemy.com/certificate/UC-98ccc48d-a709-4f03-9c27-890d6a421387/",
  },
];

const AchievementsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [selectedAchievement, setSelectedAchievement] = useState<
    (typeof achievements)[number] | null
  >(null);

  return (
    <section className="py-32 bg-background relative border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* --- HEADER --- */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground tracking-tight">
              Honors & <br />
              <span className="text-muted-foreground font-light">
                Milestones.
              </span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">
          {/* --- LEFT COLUMN: INTERACTIVE LIST --- */}
          <div className="lg:col-span-6 flex flex-col">
            {achievements.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`group relative py-8 border-b border-border/40 cursor-pointer transition-all duration-500 ${
                    isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <div onClick={() => setActiveIndex(index)}>
                    <div
                      className={`absolute left-[-20px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary transition-all duration-300 ${
                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                      }`}
                    />

                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
                      <span className="font-mono text-sm tracking-widest text-primary">
                        {item.id}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-display font-medium text-foreground tracking-tight flex-1 md:ml-6 group-hover:translate-x-2 transition-transform duration-300">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex justify-between items-center md:ml-12 mt-4">
                      <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                        {item.type}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        {item.date}
                        <ArrowUpRight
                          size={16}
                          className={`transition-transform duration-300 ${
                            isActive
                              ? "opacity-100 rotate-0"
                              : "opacity-0 -rotate-45"
                          }`}
                        />
                      </span>
                    </div>
                  </div>

                  {/* Display Content Directly on Mobile */}
                  <div
                    className={`lg:hidden mt-6 overflow-hidden transition-all duration-500 ${isActive ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-secondary rounded-md text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full rounded-full gap-2 border-border/50 text-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAchievement(item);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* --- RIGHT COLUMN: STICKY VISUAL SHOWCASE (DESKTOP ONLY) --- */}
          <div className="hidden lg:block lg:col-span-6 relative">
            <div className="sticky top-32 w-full h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full h-full flex flex-col"
                >
                  <div className="relative w-full h-[400px] rounded-3xl overflow-hidden bg-muted mb-8 group">
                    <img
                      src={achievements[activeIndex].image}
                      alt={achievements[activeIndex].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
                    <div className="absolute top-4 left-4 p-3 bg-background/80 backdrop-blur-md rounded-full shadow-lg">
                      {achievements[activeIndex].type.includes("Research") ? (
                        <FileText size={20} className="text-foreground" />
                      ) : (
                        <Award size={20} className="text-foreground" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      {achievements[activeIndex].organization}
                    </h4>
                    <p className="text-muted-foreground text-base leading-relaxed mb-6">
                      {achievements[activeIndex].description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {achievements[activeIndex].tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 rounded-full border border-border text-xs font-medium text-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() =>
                          setSelectedAchievement(achievements[activeIndex])
                        }
                        className="inline-flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors uppercase tracking-wider cursor-pointer"
                      >
                        View Details <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* --- ACHIEVEMENT DETAILS MODAL --- */}
      <AnimatePresence>
        {selectedAchievement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAchievement(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-card border border-border/50 shadow-2xl rounded-[2rem] overflow-hidden z-10 flex flex-col md:flex-row max-h-[95vh]"
            >
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 p-2.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors z-20 backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Image (Desktop Only) - Thu gọn một chút để nhường không gian cho PDF */}
              <div className="hidden md:block w-1/3 relative bg-muted">
                <img
                  src={selectedAchievement.image}
                  alt={selectedAchievement.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card" />
              </div>

              {/* Top Cover Image for Mobile */}
              <div className="block md:hidden w-full h-48 relative bg-muted">
                <img
                  src={selectedAchievement.image}
                  alt={selectedAchievement.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
              </div>

              {/* Right Content */}
              <div className="flex-1 p-8 md:p-10 overflow-y-auto">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-primary/80 font-mono text-sm tracking-widest uppercase">
                    {selectedAchievement.type}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight leading-tight">
                  {selectedAchievement.title}
                </h2>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground text-sm font-medium mb-8 pb-8 border-b border-border/40">
                  <div className="flex items-center gap-2">
                    <Award size={16} />
                    {selectedAchievement.organization}
                  </div>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-border" />
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {selectedAchievement.date}
                  </div>
                </div>

                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Context & Description
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base mb-6">
                    {selectedAchievement.description}
                  </p>

                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    The Journey & Impact
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base mb-8">
                    {selectedAchievement.detailedContent}
                  </p>
                </div>

                {/* --- PDF VIEWER SECTION --- */}
                {/* Nếu achievement có thuộc tính pdfUrl, render iframe hiển thị PDF */}
                {(selectedAchievement as any).pdfUrl && (
                  <div className="mt-6 mb-8 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <FileText size={18} />
                        Research Paper Document
                      </h3>
                      <a
                        href={(selectedAchievement as any).pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <ExternalLink size={14} /> Open Fullscreen
                      </a>
                    </div>
                    {/* Khung Iframe hiển thị PDF */}
                    <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-border bg-muted">
                      <iframe
                        src={`${(selectedAchievement as any).pdfUrl}#toolbar=0`}
                        className="w-full h-full"
                        title="Research Paper PDF Viewer"
                      />
                    </div>
                  </div>
                )}

                {/* Modal Footer: Tags & Link Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 mt-6 border-t border-border/40">
                  <div className="flex flex-wrap gap-2">
                    {selectedAchievement.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-secondary/50 text-secondary-foreground text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {selectedAchievement.link !== "#" && (
                    <Button
                      className="rounded-full px-6 gap-2 w-full sm:w-auto shadow-lg shadow-primary/10"
                      onClick={() =>
                        window.open(selectedAchievement.link, "_blank")
                      }
                    >
                      Verify Credential <ExternalLink size={16} />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AchievementsSection;
