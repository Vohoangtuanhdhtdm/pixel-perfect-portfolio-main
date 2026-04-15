import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  ArrowUpRight,
  Database,
  Brain,
  Smartphone,
  LayoutTemplate,
  X,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef, useState } from "react";

const projects = [
  {
    id: 1,
    category: "AI & Fullstack",
    icon: <Brain className="w-4 h-4" />,
    title: "KGS: Real Estate Valuation Support Website",
    description:
      "A real estate valuation and recommendation system integrated with Machine Learning. Deployed using a Client-Server architecture with an ASP.NET API backend.",
    detailedContent:
      "This is a core project applying Machine Learning algorithms to the PropTech sector. Instead of utilizing complex spatial databases, the system focuses on optimizing the Client-Server data flow. The robust backend is built with ASP.NET API, connecting to a React Frontend, allowing users to easily view real-time house price predictions.",
    tags: ["ASP.NET API", "React", "Machine Learning", "SQL Server"],
    metric: "PropTech AI",
    color: "from-indigo-500/20 to-violet-500/20",
    githubUrl: "https://github.com/Vohoangtuanhdhtdm/Project_KGS.git", // Replacement link
    liveUrl: "#", // Replacement link
  },
  {
    id: 2,
    category: "Web API & Architecture",
    icon: <Database className="w-4 h-4" />,
    title: "GoGo Course Platform",
    description:
      "An E-Learning Backend platform strictly adhering to Clean Architecture standards, optimized for system scalability.",
    detailedContent:
      "This project focuses on solving software architecture challenges. Implementing Clean Architecture combined with ASP.NET API completely isolates Domain Logic from the UI and database. Consequently, adding new features or changing the Database Provider in the future can be done without breaking the core structure.",
    tags: ["ASP.NET API", "Clean Architecture", "C#"],
    metric: "Scalable Arch",
    color: "from-blue-500/20 to-cyan-500/20",
    githubUrl: "https://github.com/Vohoangtuanhdhtdm/GoGo.Api.git",
    liveUrl: "#", // Leave empty if there is no live website
  },
  {
    id: 3,
    category: "Mobile & AI",
    icon: <Smartphone className="w-4 h-4" />,
    title: "Meditation Voice AI App",
    description:
      "A cross-platform mobile meditation app, integrating a Voice AI Agent for direct user interaction.",
    detailedContent:
      "The app is developed using Flutter with Firebase and a Node.js API as the backend. The project's breakthrough is the integration of an AI Agent capable of voice recognition and response (Voice AI), acting as a virtual assistant to guide personalized breathing and meditation exercises.",
    tags: ["Flutter", "Firebase", "Voice AI", "Node.js"],
    metric: "AI Assistant",
    color: "from-green-500/20 to-emerald-500/20",
    githubUrl:
      "https://github.com/Vohoangtuanhdhtdm/app_mental_health_care.git",
    liveUrl: "#",
  },
  {
    id: 4,
    category: "Big Data & ML",
    icon: <Brain className="w-4 h-4" />,
    title: "Health Insurance Fraud Detection",
    description:
      "Processed massive datasets using Apache Spark. Deployed Machine Learning algorithms (PCA, Linear Regression) to isolate individuals showing signs of insurance fraud.",
    detailedContent:
      "The project processed approximately 10 million medical data records (Big Data) using PySpark. The system utilizes a 3-model approach: (A) Excess Spending analysis based on market standard prices (Peer Price); (B) Linear Regression to predict reasonable revenue milestones based on patient volume to find discrepancies; and (C) PCA dimensionality reduction algorithm to identify 'outliers' that break the natural distribution rules. This method helps governments and insurance companies prevent millions of dollars in losses.",
    tags: ["PySpark", "Machine Learning", "PCA", "Big Data", "Python"],
    metric: "Fraud Prevention",
    color: "from-purple-500/20 to-pink-500/20",
    githubUrl:
      "https://github.com/Vohoangtuanhdhtdm/Budget-Waste-Fraud-Detection-System-Based-on-Big-Data-and-Peer-based-Anomaly-Detection.git",
    liveUrl: "#",
  },
  {
    id: 5,
    category: "Fullstack MVC",
    icon: <LayoutTemplate className="w-4 h-4" />,
    title: "TuanStore E-commerce",
    description:
      "A comprehensive e-commerce solution built on the traditional ASP.NET MVC platform, featuring strict data flow management.",
    detailedContent:
      "A complete online sales management system featuring category management, shopping cart, checkout, and order processing. The project helped solidify foundational knowledge of the Model-View-Controller (MVC) pattern and SQL Server interactions.",
    tags: ["ASP.NET MVC", "SQL Server", "C#"],
    metric: "E-Commerce",
    color: "from-slate-500/20 to-gray-500/20",
    githubUrl: "https://github.com/Vohoangtuanhdhtdm/CuaHangVHT.git",
    liveUrl: "#",
  },
];

// --- PROJECT CARD COMPONENT ---
function ProjectCard({
  project,
  index,
  total,
  progress,
  onClick,
}: {
  project: (typeof projects)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
  onClick: () => void;
}) {
  const range = [index * (1 / total), 1];
  const targetScale = 1 - (total - index) * 0.05;
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      className="sticky top-0 flex items-center justify-center cursor-pointer"
      style={{
        top: `calc(15vh + ${index * 40}px)`,
        marginBottom: `${total * 20}px`,
      }}
      onClick={onClick}
    >
      <motion.div
        style={{ scale }}
        className="relative flex flex-col h-[500px] w-full max-w-4xl rounded-3xl bg-card border border-border/50 overflow-hidden shadow-2xl origin-top will-change-transform hover:border-primary/50 transition-colors duration-300"
      >
        <div className="flex flex-col lg:flex-row h-full pointer-events-none">
          {/* Left Column: Visual */}
          <div
            className={`w-full lg:w-5/12 relative bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden group`}
          >
            <span className="absolute -bottom-12 -left-6 text-[180px] font-bold text-white/10 select-none leading-none z-0">
              {index + 1}
            </span>
            <div className="relative z-10 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-500">
              <div className="text-foreground/80 scale-[2.5]">
                {project.icon}
              </div>
            </div>
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          </div>
          {/* Right Column: Content */}
          <div className="flex-1 p-8 flex flex-col justify-between bg-card/95 backdrop-blur-sm pointer-events-auto">
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
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- MAIN COMPONENT ---
const ProjectsGrid = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[number] | null
  >(null);

  return (
    <section id="projects" className="bg-background pt-24 pb-32 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
          {/* Left Column: Sticky Sidebar */}
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
                  From the .NET Core Clean Architecture platform to AI/Deep
                  Learning models. Click on any project to see details.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Project List */}
          <div ref={containerRef} className="lg:col-span-8 relative">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                index={index}
                total={projects.length}
                project={project}
                progress={scrollYProgress}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* --- PROJECT DETAILS MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-card border border-border/50 shadow-2xl rounded-3xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-background/50 hover:bg-background rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              <div
                className={`h-40 w-full bg-gradient-to-br ${selectedProject.color} relative flex items-center justify-center`}
              >
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                <div className="text-white/80 scale-[3]">
                  {selectedProject.icon}
                </div>
              </div>

              <div className="p-8 overflow-y-auto">
                <Badge
                  variant="outline"
                  className="mb-4 bg-primary/5 text-primary border-primary/20"
                >
                  {selectedProject.category}
                </Badge>

                <h2 className="text-3xl font-bold mb-4">
                  {selectedProject.title}
                </h2>

                <p className="text-muted-foreground text-lg mb-6">
                  {selectedProject.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2 border-b border-border/50 pb-2">
                    Project Details
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.detailedContent ||
                      "Updating details for this project..."}
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-md bg-secondary text-sm font-medium text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* --- Action Buttons (Links Updated) --- */}
                <div className="flex gap-4 pt-4 border-t border-border/40">
                  {/* Check if project has liveUrl, show button if true */}
                  {selectedProject.liveUrl &&
                    selectedProject.liveUrl !== "" && (
                      <Button
                        className="rounded-full px-6 gap-2"
                        onClick={() =>
                          window.open(selectedProject.liveUrl, "_blank")
                        }
                      >
                        View Live <ArrowUpRight size={16} />
                      </Button>
                    )}

                  {/* Check if project has githubUrl, show button if true */}
                  {selectedProject.githubUrl &&
                    selectedProject.githubUrl !== "" && (
                      <Button
                        variant="outline"
                        className="rounded-full px-6 gap-2"
                        onClick={() =>
                          window.open(selectedProject.githubUrl, "_blank")
                        }
                      >
                        <Github size={16} /> Source Code
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

export default ProjectsGrid;
