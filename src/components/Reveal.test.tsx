import { render, screen } from "@testing-library/react";
import Reveal from "./Reveal";

// Simulate a user with "reduce motion" turned on in their OS.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query.includes("reduce"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

describe("Reveal with reduced motion", () => {
  it("renders content fully visible without waiting for scroll", () => {
    render(<Reveal>hello</Reveal>);
    expect(screen.getByText("hello")).not.toHaveStyle({ opacity: "0" });
  });
});
