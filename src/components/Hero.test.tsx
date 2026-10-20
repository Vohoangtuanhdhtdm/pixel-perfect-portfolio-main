import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero", () => {
  it("shows name, key numbers and CTAs", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Võ Hoàng Tuấn");
    expect(screen.getByText("8.6")).toBeInTheDocument();
    expect(screen.getByText("750")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /download cv/i })).toHaveAttribute("href", "/cv.pdf");
    expect(screen.getByRole("link", { name: /view work/i })).toHaveAttribute("href", "#work");
  });
});
