import { pickActiveSection } from "./activeSection";

describe("pickActiveSection", () => {
  const vh = 1000;
  it("returns null before the first section reaches the trigger line", () => {
    expect(pickActiveSection([{ id: "work", top: 800 }], vh)).toBeNull();
  });
  it("returns the last section whose top passed 40% of the viewport", () => {
    expect(
      pickActiveSection(
        [
          { id: "work", top: -900 },
          { id: "research", top: 300 },
          { id: "skills", top: 1200 },
        ],
        vh,
      ),
    ).toBe("research");
  });
});
