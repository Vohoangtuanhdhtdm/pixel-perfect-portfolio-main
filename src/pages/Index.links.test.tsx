import { render } from "@testing-library/react";
import Index from "./Index";

describe("page structure", () => {
  it("opens every CV link the same way (new tab)", () => {
    const { container } = render(<Index />);
    const cvLinks = [...container.querySelectorAll('a[href="/cv.pdf"]')];
    expect(cvLinks.length).toBeGreaterThanOrEqual(3);
    cvLinks.forEach((a) => {
      expect(a).toHaveAttribute("target", "_blank");
      expect(a).not.toHaveAttribute("download");
    });
  });

  it("process list has li as direct children of ol", () => {
    const { container } = render(<Index />);
    const ol = container.querySelector("#process ol")!;
    expect([...ol.children].every((c) => c.tagName === "LI")).toBe(true);
    expect(ol.children).toHaveLength(5);
  });

  it("has a scroll progress indicator", () => {
    const { getByTestId } = render(<Index />);
    expect(getByTestId("scroll-progress")).toBeInTheDocument();
  });
});
