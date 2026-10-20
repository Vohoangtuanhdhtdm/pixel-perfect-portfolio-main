export const publication = {
  title:
    "Building a Real Estate Recommendation Model Based on Content Features and the k-Nearest Neighbors Algorithm",
  venue: "National Scientific Conference",
  year: "2026",
  role: "Co-author",
  summary:
    "A content-based recommendation model that matches properties to personalised user needs using feature engineering and k-Nearest Neighbors — the research behind the KGS platform.",
  tags: ["Machine Learning", "Recommender Systems", "k-NN", "PropTech"],
  pdfUrl: "/research_paper.pdf",
};

export const education = {
  school: "Thu Dau Mot University (TDMU)",
  major: "Software Engineering",
  period: "2022 – 2027",
  gpa: "8.6 / 10",
  honors: "Academic Merit Scholarship · 8 semesters",
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  url?: string;
  credentialId?: string;
};

export const certifications: Certification[] = [
  {
    name: "PMI Project Management Ready®",
    issuer: "Project Management Institute",
    date: "Jun 2026",
    url: "/certificates/pmi-pm-ready.pdf",
    credentialId: "wEkVs-48D4",
  },
  {
    name: "Foundations of Coding Back-End",
    issuer: "Microsoft · Coursera",
    date: "May 2025",
    url: "https://www.coursera.org/account/accomplishments/verify/W6IAMCA39TL5",
  },
  {
    name: "Amazon Web Services – MiAI",
    issuer: "Udemy",
    date: "Oct 2025",
    url: "https://www.udemy.com/certificate/UC-98ccc48d-a709-4f03-9c27-890d6a421387/",
    credentialId: "UC-98ccc48d-a709-4f03-9c27-890d6a421387",
  },
  {
    name: "UCPC 2023 — Certificate of Participation",
    issuer: "UIT University",
    date: "2023",
  },
];
