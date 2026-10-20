import { fireEvent, render, screen, within } from "@testing-library/react";
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
