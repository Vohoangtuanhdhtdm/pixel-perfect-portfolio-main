import { render, screen, within } from "@testing-library/react";
import ResearchSection from "./ResearchSection";
import SkillsSection from "./SkillsSection";
import { publication } from "@/data/academics";
import { skillGroups } from "@/data/skills";

describe("ResearchSection", () => {
  it("shows the full paper title and PDF link", () => {
    render(<ResearchSection />);
    expect(screen.getByText(publication.title)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /read pdf/i })).toHaveAttribute("href", "/research_paper.pdf");
  });

  it("lists 4 certifications, PMI first, UCPC without verify link", () => {
    render(<ResearchSection />);
    const rows = screen.getAllByTestId("cert-row");
    expect(rows).toHaveLength(4);
    expect(rows[0]).toHaveTextContent(/PMI/);
    expect(within(rows[3]).queryByRole("link")).toBeNull();
  });
});

describe("SkillsSection", () => {
  it("renders the CV skill groups only", () => {
    render(<SkillsSection />);
    skillGroups.forEach((g) => expect(screen.getByText(g.title)).toBeInTheDocument());
    expect(screen.queryByText(/kubernetes/i)).toBeNull();
  });
});
