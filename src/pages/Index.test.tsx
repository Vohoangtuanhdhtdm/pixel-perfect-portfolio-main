import { render } from "@testing-library/react";
import Index from "./Index";
import { copyEmail } from "@/lib/copyEmail";

describe("Index page", () => {
  it("renders every section and no placeholder links", () => {
    const { container } = render(<Index />);
    ["work", "research", "skills", "process", "faq", "contact"].forEach((id) =>
      expect(container.querySelector(`section#${id}`)).not.toBeNull(),
    );
    expect(container.querySelector('a[href="#"]')).toBeNull();
    expect(container.textContent).not.toMatch(/twitter/i);
  });
});

describe("copyEmail", () => {
  it("falls back without throwing when clipboard is unavailable", async () => {
    const original = navigator.clipboard;
    Object.defineProperty(navigator, "clipboard", { value: undefined, configurable: true });
    const assign = vi.fn();
    await expect(copyEmail("a@b.c", assign)).resolves.toBe(false);
    expect(assign).toHaveBeenCalledWith("mailto:a@b.c");
    Object.defineProperty(navigator, "clipboard", { value: original, configurable: true });
  });
});
