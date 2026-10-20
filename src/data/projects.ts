export type DiagramNode = {
  id: string;
  label: string;
  sub?: string;
  col: number;
  row: number;
  highlight?: boolean;
};
export type Diagram = { cols: number; rows: number; nodes: DiagramNode[]; edges: [string, string][] };
export type Project = {
  id: string;
  title: string;
  category: string;
  kind: string;
  summary: string;
  role: string;
  responsibilities: string[];
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  diagram?: Diagram;
};

export const projects: Project[] = [
  {
    id: "kgs",
    title: "KGS — Real Estate Valuation Platform",
    category: "AI × Fullstack",
    kind: "Personal project",
    summary:
      "A PropTech system that serves real-time property price predictions and recommendations through a robust client–server architecture.",
    role: "Fullstack",
    responsibilities: [
      "Developed a robust backend API with ASP.NET Core to serve real-time property price predictions.",
      "Integrated machine-learning models into the web application, bridging data science and web development.",
      "Connected the backend to a React frontend for low-latency data rendering.",
    ],
    stack: ["ASP.NET Core API", "React", "SQL Server", "Python", "Machine Learning"],
    githubUrl: "https://github.com/Vohoangtuanhdhtdm/Project_KGS.git",
    featured: true,
    diagram: {
      cols: 3,
      rows: 2,
      nodes: [
        { id: "client", label: "React client", sub: "TypeScript", col: 0, row: 0 },
        { id: "api", label: "ASP.NET Core API", sub: "REST", col: 1, row: 0, highlight: true },
        { id: "ml", label: "ML model", sub: "Python", col: 2, row: 0 },
        { id: "db", label: "SQL Server", sub: "Listings data", col: 2, row: 1 },
      ],
      edges: [
        ["client", "api"],
        ["api", "ml"],
        ["api", "db"],
      ],
    },
  },
  {
    id: "gogo",
    title: "GoGo Course Platform",
    category: "Backend · Architecture",
    kind: "Personal project",
    summary:
      "An e-learning backend API built strictly on Clean Architecture and SOLID principles for long-term scalability.",
    role: "Backend Developer",
    responsibilities: [
      "Designed a modular Clean Architecture: Domain, Application, Infrastructure and Presentation layers.",
      "Developed RESTful APIs for core business operations with clear separation of concerns.",
      "Applied SOLID principles to keep the codebase testable and easy to extend.",
    ],
    stack: ["C#", "ASP.NET Core API", "Entity Framework Core", "SQL Server"],
    githubUrl: "https://github.com/Vohoangtuanhdhtdm/GoGo.Api.git",
    diagram: {
      cols: 4,
      rows: 2,
      nodes: [
        { id: "api", label: "Presentation", sub: "ASP.NET Core API", col: 0, row: 0 },
        { id: "app", label: "Application", sub: "Use cases", col: 1, row: 0 },
        { id: "domain", label: "Domain", sub: "Entities · rules", col: 2, row: 0, highlight: true },
        { id: "infra", label: "Infrastructure", sub: "EF Core", col: 3, row: 0 },
        { id: "db", label: "SQL Server", col: 3, row: 1 },
      ],
      edges: [
        ["api", "app"],
        ["app", "domain"],
        ["infra", "domain"],
        ["infra", "db"],
      ],
    },
  },
  {
    id: "fraud",
    title: "Health Insurance Fraud Detection",
    category: "Big Data · ML",
    kind: "Big Data coursework",
    summary:
      "A big-data pipeline that processes nearly 10 million medical records to flag potential insurance fraud.",
    role: "Data Analysis",
    responsibilities: [
      "Explored and processed a large-scale CMS dataset with Apache Spark (PySpark).",
      "Applied PCA to reduce dimensionality and detect records that break natural distributions.",
      "Used Linear Regression to estimate reasonable revenue benchmarks and flag suspicious billing.",
    ],
    stack: ["PySpark", "Python", "PCA", "Linear Regression"],
    githubUrl:
      "https://github.com/Vohoangtuanhdhtdm/Budget-Waste-Fraud-Detection-System-Based-on-Big-Data-and-Peer-based-Anomaly-Detection.git",
    diagram: {
      cols: 4,
      rows: 3,
      nodes: [
        { id: "data", label: "CMS dataset", sub: "~10M records", col: 0, row: 1 },
        { id: "spark", label: "PySpark", sub: "Clean · aggregate", col: 1, row: 1, highlight: true },
        { id: "peer", label: "Peer price", sub: "Excess spending", col: 2, row: 0 },
        { id: "lr", label: "Linear Regression", sub: "Revenue benchmark", col: 2, row: 1 },
        { id: "pca", label: "PCA", sub: "Outlier distance", col: 2, row: 2 },
        { id: "flags", label: "Flagged providers", col: 3, row: 1 },
      ],
      edges: [
        ["data", "spark"],
        ["spark", "peer"],
        ["spark", "lr"],
        ["spark", "pca"],
        ["peer", "flags"],
        ["lr", "flags"],
        ["pca", "flags"],
      ],
    },
  },
  {
    id: "meditation",
    title: "Meditation Voice AI App",
    category: "Mobile · AI",
    kind: "Academic project",
    summary:
      "A cross-platform mental-health app with an interactive, voice-based AI assistant for guided meditation.",
    role: "Mobile & Backend Developer",
    responsibilities: [
      "Built a responsive Flutter UI together with the team.",
      "Integrated a voice-based AI agent through a Node.js backend for personalised guidance.",
      "Managed real-time data and secure authentication with Firebase.",
    ],
    stack: ["Flutter", "Firebase", "Node.js", "Voice AI"],
    githubUrl: "https://github.com/Vohoangtuanhdhtdm/app_mental_health_care.git",
  },
  {
    id: "cuahang",
    title: "CuaHangVHT — MVC E-commerce",
    category: ".NET MVC",
    kind: "Personal project",
    summary:
      "A complete server-rendered fashion e-commerce site built from scratch on ASP.NET Core 8 MVC.",
    role: ".NET MVC Developer",
    responsibilities: [
      "Built the platform with ASP.NET Core 8 MVC and Razor Views for server-side rendering.",
      "Implemented product catalogue, dynamic cart, checkout and order management.",
      "Integrated ASP.NET Core Identity for account management and cookie authentication.",
    ],
    stack: ["ASP.NET Core MVC", "Razor", "EF Core", "SQL Server", "Bootstrap 5"],
    githubUrl: "https://github.com/Vohoangtuanhdhtdm/CuaHangVHT.git",
  },
];
