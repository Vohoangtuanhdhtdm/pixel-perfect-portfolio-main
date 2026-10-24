import { fireEvent, render, screen, within } from "@testing-library/react";
import WorkSection from "./WorkSection";

describe("Project details on phones", () => {
  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 375 });
  });
  afterEach(() => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1024 });
  });

  it("opens as a bottom sheet with the project details", async () => {
    render(<WorkSection />);
    fireEvent.click(screen.getByRole("button", { name: /GoGo/ }));
    const sheet = await screen.findByTestId("project-sheet");
    expect(within(sheet).getByText("GoGo Course Platform")).toBeInTheDocument();
    expect(within(sheet).getByRole("img", { name: /GoGo/ })).toBeInTheDocument();
  });
});
