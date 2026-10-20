import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import WorkSection from "./WorkSection";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { projects } from "@/data/projects";

describe("WorkSection", () => {
  it("renders one tile button per project", () => {
    render(<WorkSection />);
    projects.forEach((p) =>
      expect(screen.getByRole("button", { name: new RegExp(p.title.split(" ")[0]) })).toBeInTheDocument(),
    );
  });

  it("opens KGS dialog with diagram and GitHub link", async () => {
    render(<WorkSection />);
    fireEvent.click(screen.getByRole("button", { name: /KGS/ }));
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByRole("img", { name: /KGS/ })).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /github/i })).toHaveAttribute("href", projects[0].githubUrl);
  });

  it("dialog without diagram or live URL shows neither", async () => {
    render(<WorkSection />);
    fireEvent.click(screen.getByRole("button", { name: /Meditation/ }));
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).queryByRole("img")).toBeNull();
    expect(within(dialog).queryByRole("link", { name: /live/i })).toBeNull();
  });
});

describe("ArchitectureDiagram", () => {
  it("draws every node label and one connector per edge", () => {
    const gogo = projects.find((p) => p.id === "gogo")!;
    const { container } = render(<ArchitectureDiagram diagram={gogo.diagram!} title="GoGo" />);
    gogo.diagram!.nodes.forEach((n) => expect(screen.getByText(n.label)).toBeInTheDocument());
    expect(container.querySelectorAll("path[data-edge]")).toHaveLength(gogo.diagram!.edges.length);
  });
});

describe("WorkSection keyboard focus", () => {
  it("returns focus to the tile after the dialog closes with Esc", async () => {
    render(<WorkSection />);
    const tile = screen.getByRole("button", { name: /GoGo/ });
    tile.focus();
    fireEvent.click(tile);
    const dialog = await screen.findByRole("dialog");
    fireEvent.keyDown(dialog, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(tile));
  });
});

describe("Work tiles", () => {
  it("show the role and one chip per stack item", () => {
    render(<WorkSection />);
    const kgs = projects[0];
    const tile = screen.getByRole("button", { name: /KGS/ }).closest("article")!;
    expect(within(tile).getByText(kgs.role)).toBeInTheDocument();
    expect(within(tile).getAllByRole("listitem")).toHaveLength(kgs.stack.length);
  });
});

describe("ArchitectureDiagram on phones", () => {
  it("keeps labels legible by never scaling below 75% of natural width", () => {
    const fraud = projects.find((p) => p.id === "fraud")!;
    const { container } = render(
      <ArchitectureDiagram diagram={fraud.diagram!} title="Fraud" orientation="vertical" />,
    );
    const svg = container.querySelector("svg")!;
    const naturalWidth = Number(svg.getAttribute("viewBox")!.split(" ")[2]);
    expect(naturalWidth).toBeLessThanOrEqual(460);
    expect(parseFloat(svg.style.minWidth)).toBeGreaterThanOrEqual(naturalWidth * 0.75);
  });
});
