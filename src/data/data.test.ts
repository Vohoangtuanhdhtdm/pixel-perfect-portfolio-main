import { describe, it, expect } from "vitest";
import { profile } from "./profile";
import { projects } from "./projects";
import { publication, certifications } from "./academics";

describe("content data", () => {
  it("profile stats match CV", () => {
    expect(profile.stats.map((s) => s.value)).toEqual(["8.6", "8", "01", "750"]);
  });

  it("has no placeholder links", () => {
    const urls = [
      profile.cvUrl,
      ...profile.socials.map((s) => s.href),
      ...projects.flatMap((p) => [p.githubUrl, p.liveUrl]),
      publication.pdfUrl,
      ...certifications.map((c) => c.url),
    ].filter(Boolean);
    urls.forEach((u) => expect(u).not.toMatch(/^#$|your-username|twitter/));
  });

  it("diagram edges reference existing nodes", () => {
    projects
      .filter((p) => p.diagram)
      .forEach((p) => {
        const ids = new Set(p.diagram!.nodes.map((n) => n.id));
        p.diagram!.edges.forEach(([a, b]) => {
          expect(ids.has(a)).toBe(true);
          expect(ids.has(b)).toBe(true);
        });
      });
    expect(projects.filter((p) => p.diagram).map((p) => p.id)).toEqual(["kgs", "gogo", "fraud"]);
  });

  it("lists PMI certification first", () => {
    expect(certifications[0].name).toMatch(/PMI/);
  });
});
