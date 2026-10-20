export const profile = {
  name: "Võ Hoàng Tuấn",
  nameAscii: "Vo Hoang Tuan",
  role: "Backend .NET Engineer",
  tagline:
    "Backend .NET engineer building clean, scalable systems — and researching machine learning for PropTech.",
  location: "Ho Chi Minh City, Vietnam",
  availability: "Available for Backend / Fullstack roles",
  email: "vohoangtuan1980t@gmail.com",
  avatar: "/avatarProfile.jpg",
  cvUrl: "/cv.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/Vohoangtuanhdhtdm" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tuan-vo-hoang-18aa56307/" },
  ] as { label: "GitHub" | "LinkedIn"; href: string }[],
  stats: [
    { value: "8.6", label: "GPA / 10" },
    { value: "8", label: "Merit scholarships" },
    { value: "01", label: "National paper" },
    { value: "750", label: "TOEIC" },
  ],
};
