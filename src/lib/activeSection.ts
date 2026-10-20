export type SectionTop = { id: string; top: number };

// A section becomes active once its top edge scrolls past 40% of the viewport height.
export function pickActiveSection(sections: SectionTop[], viewportHeight: number): string | null {
  const line = viewportHeight * 0.4;
  let active: string | null = null;
  for (const s of sections) {
    if (s.top <= line) active = s.id;
  }
  return active;
}
