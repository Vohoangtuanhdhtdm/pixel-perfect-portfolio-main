# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the single-page portfolio in an editorial/Swiss light style, with content matching the 2026 CV and SVG architecture diagrams for three projects.

**Architecture:** All copy lives in typed modules under `src/data/`; section components under `src/components/` only render that data. Old template components are deleted once `src/pages/Index.tsx` is rewired. Styling via Tailwind tokens backed by CSS variables in `src/index.css`.

**Tech Stack:** React 18, Vite 5, Tailwind 3, shadcn/ui (Dialog, Accordion, Sheet, Button, Sonner), framer-motion 12, Vitest + Testing Library (jsdom).

**Spec:** `docs/superpowers/specs/2026-10-20-portfolio-redesign-design.md`

## Global Constraints

- Light theme only. No `dark:` classes, no theme toggle.
- Palette: background `#FAFAF7`, surface `#FFFFFF`, foreground `#111111`, muted `#6B6760`, border `#E7E4DD`, accent `#2747E8`. No gradients, no other accent hues.
- Fonts: Inter Tight (headings, `font-display`), Inter (body, `font-sans`), JetBrains Mono (`font-mono`). Single Google Fonts `<link>` in `index.html`; remove the `@import` in `src/index.css`.
- Facts follow the CV: GPA **8.6**, **8 semesters** Academic Merit Scholarship, TOEIC **750** kept.
- No `href="#"` placeholders anywhere; links render only when a real URL exists. No phone number on the page. No Twitter.
- Infinite/looping animations are not allowed. Wrap the page in `<MotionConfig reducedMotion="user">`.
- Site copy stays English.

## Review Focus

1. Narrow mobile (360–390px): bento tiles, diagrams, hero heading must not cause horizontal scroll.
2. `navigator.clipboard` unavailable (non-HTTPS / old browser): "copy email" must fall back to opening `mailto:` and not throw.
3. Projects without a live URL: dialog shows only the GitHub button, never a dead link.
4. Keyboard users: project tiles are buttons reachable by Tab, dialog closes with Esc and returns focus (shadcn Dialog provides this — keep tiles as `<button>`).
5. `prefers-reduced-motion: reduce`: content must be visible without scroll-triggered animation (MotionConfig + `initial` not leaving content at opacity 0 when reduced).

---

### Task 1: Foundation — assets, tokens, data modules

**Files:**
- Create: `public/cv.pdf` (copy of uploaded CV), `public/certificates/pmi-pm-ready.pdf` (copy of uploaded PMI cert)
- Modify: `index.html` (fonts link → Inter, Inter Tight, JetBrains Mono; `theme-color` → `#FAFAF7`)
- Modify: `src/index.css` (remove font `@import`, new HSL tokens per Global Constraints, drop `.text-gradient`/`.glow-primary`/`.card-hover`)
- Modify: `tailwind.config.ts` (`fontFamily.display/sans/mono`)
- Create: `src/data/profile.ts`, `projects.ts`, `academics.ts`, `skills.ts`, `process.ts`, `faq.ts`
- Test: `src/data/data.test.ts`; delete `src/test/example.test.ts`

**Interfaces (Produces):**
```ts
// profile.ts
export const profile: { name: string; nameAscii: string; role: string; tagline: string;
  location: string; availability: string; email: string; avatar: string; cvUrl: string;
  socials: { label: "GitHub" | "LinkedIn"; href: string }[];
  stats: { value: string; label: string }[] };
// projects.ts
export type DiagramNode = { id: string; label: string; sub?: string; col: number; row: number; highlight?: boolean };
export type Diagram = { cols: number; rows: number; nodes: DiagramNode[]; edges: [string, string][] };
export type Project = { id: string; title: string; category: string; kind: string; summary: string;
  role: string; responsibilities: string[]; stack: string[]; githubUrl: string; liveUrl?: string;
  featured?: boolean; diagram?: Diagram };
export const projects: Project[];
// academics.ts
export const publication: { title: string; venue: string; year: string; role: string; summary: string; tags: string[]; pdfUrl: string };
export const education: { school: string; major: string; period: string; gpa: string; honors: string };
export type Certification = { name: string; issuer: string; date: string; url?: string; credentialId?: string };
export const certifications: Certification[];
// skills.ts
export const skillGroups: { title: string; items: string[] }[];
// process.ts
export const processSteps: { number: string; title: string; description: string; tags: string[] }[];
// faq.ts
export const faqs: { question: string; answer: string }[];
```
Content: projects (order KGS featured, GoGo, Fraud Detection, Meditation Voice AI, CuaHangVHT) with role/responsibilities/stack/repo copied from CV pages 2–3; diagrams for KGS, GoGo, Fraud Detection per spec "Architecture diagrams". Certifications in order: PMI Project Management Ready® (Project Management Institute, Jun 29 2026, url `https://verify.certiport.com`, credentialId `wEkVs-48D4`), Microsoft Foundations of Coding Back-End (Coursera, May 2025, existing Coursera URL), AWS – MiAI (Udemy, Oct 21 2025, existing Udemy URL), UCPC 2023 participation (UIT, 2023). Skill groups = the five CV groups; Tools & Methodologies adds "PMI PM Ready". Process steps and FAQ copy migrated from current `StickyScrollSection.tsx` / `FaqSection.tsx` (FAQ flattened to question/answer). LinkedIn URL from current `FooterCta.tsx`; email `vohoangtuan1980t@gmail.com`.

- [ ] **Step 1: Write failing test `src/data/data.test.ts`**
```ts
it("profile stats match CV", () => {
  expect(profile.stats.map(s => s.value)).toEqual(["8.6", "8", "01", "750"]);
});
it("no placeholder links", () => {
  const urls = [profile.cvUrl, ...profile.socials.map(s => s.href),
    ...projects.flatMap(p => [p.githubUrl, p.liveUrl]), publication.pdfUrl,
    ...certifications.map(c => c.url)].filter(Boolean);
  urls.forEach(u => expect(u).not.toMatch(/^#$|your-username|twitter/));
});
it("diagram edges reference existing nodes", () => {
  projects.filter(p => p.diagram).forEach(p => {
    const ids = new Set(p.diagram!.nodes.map(n => n.id));
    p.diagram!.edges.forEach(([a, b]) => { expect(ids.has(a)).toBe(true); expect(ids.has(b)).toBe(true); });
  });
  expect(projects.filter(p => p.diagram).map(p => p.id)).toEqual(["kgs", "gogo", "fraud"]);
});
it("lists PMI certification first", () => { expect(certifications[0].name).toMatch(/PMI/); });
```
- [ ] **Step 2:** `npm install && npx vitest run src/data` → FAIL (modules missing)
- [ ] **Step 3:** Create data modules, assets, tokens, fonts as above.
- [ ] **Step 4:** `npx vitest run src/data` → PASS; `npm run build` → succeeds (old components still compile).
- [ ] **Step 5:** Commit `feat: add content data modules and editorial design tokens`

### Task 2: Navbar, Hero, SectionHeader

**Files:**
- Create: `src/components/SectionHeader.tsx`, `src/components/Hero.tsx`, `src/components/Reveal.tsx`
- Rewrite: `src/components/Navbar.tsx`
- Test: `src/components/Hero.test.tsx`

**Interfaces:**
- Consumes: `profile` (Task 1).
- Produces: `SectionHeader({ number, title, kicker? }: { number: string; title: string; kicker?: string })` renders `<h2>` with mono number like `01 —`; `Reveal({ children, delay? })` — framer-motion fade/slide-up `whileInView` once. Section ids used by nav: `work`, `research`, `skills`, `process`, `faq`, `contact`.

Navbar: links Work/Research/Skills/Contact + "CV" button (`target="_blank"` to `profile.cvUrl`); mobile uses shadcn `Sheet`. Hero layout per spec §Page structure 2.

- [ ] **Step 1: Failing test** — render `<Hero />`; assert `getByRole("heading", { level: 1 })` has text "Võ Hoàng Tuấn"; texts "8.6", "750" present; link named /download cv/i has `href="/cv.pdf"`; link /view work/i has `href="#work"`.
- [ ] **Step 2:** `npx vitest run src/components/Hero.test.tsx` → FAIL
- [ ] **Step 3:** Implement the four components.
- [ ] **Step 4:** Test → PASS
- [ ] **Step 5:** Commit `feat: editorial navbar and hero`

### Task 3: Work section, project dialog, architecture diagram

**Files:**
- Create: `src/components/ArchitectureDiagram.tsx`, `src/components/WorkSection.tsx`, `src/components/ProjectDialog.tsx`
- Test: `src/components/WorkSection.test.tsx`

**Interfaces:**
- Consumes: `projects`, `Project`, `Diagram` (Task 1); `SectionHeader`, `Reveal` (Task 2).
- Produces: `ArchitectureDiagram({ diagram, title }: { diagram: Diagram; title: string })` — `<svg role="img" aria-label={title} viewBox=...>` with `width="100%"`; nodes placed on a `cols × rows` grid (cell 180×72, gap 40), edges as straight/elbow lines with arrow marker; highlighted node stroke = accent. `ProjectDialog({ project, open, onOpenChange })`. `WorkSection` (`id="work"`): bento grid — featured tile spans 2 cols × 2 rows on `lg`, single column on mobile; each tile is a `<button>`.

- [ ] **Step 1: Failing tests**
  - Renders 5 tile buttons; clicking "KGS" tile opens dialog containing `role="img"` named /KGS/ and a link to the KGS GitHub URL.
  - Opening "Meditation Voice AI" dialog: no `role="img"`, no link named /live/i.
  - `ArchitectureDiagram` for GoGo renders one `<text>` per node label and one path per edge.
- [ ] **Step 2:** Run → FAIL
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run → PASS
- [ ] **Step 5:** Commit `feat: bento work section with architecture diagrams`

### Task 4: Research & Skills sections

**Files:**
- Create: `src/components/ResearchSection.tsx` (`id="research"`), `src/components/SkillsSection.tsx` (`id="skills"`)
- Test: `src/components/ResearchSection.test.tsx`

**Interfaces:** Consumes `publication`, `education`, `certifications`, `skillGroups`; `SectionHeader`, `Reveal`.

Publication rendered as a citation block (title in quotes/italic serif-less large text, venue · year · role line, tags, "Read PDF" button). Certifications as hairline-divided rows: name, issuer, date, "Verify" link only when `url` exists (shows credentialId in mono when present). Skills: 5-row definition table (`<dl>`), group title in mono left, items right.

- [ ] **Step 1: Failing test** — full paper title present; link /read pdf/i → `/research_paper.pdf`; 4 certification rows with PMI first; UCPC row has no "Verify" link; SkillsSection renders 5 group titles and no "Kubernetes".
- [ ] **Step 2:** Run → FAIL
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run → PASS
- [ ] **Step 5:** Commit `feat: research, academics and skills sections`

### Task 5: Process, FAQ, Contact; wire page; remove old template

**Files:**
- Create: `src/components/ProcessSection.tsx` (rewrite existing file, `id="process"`), `src/components/FaqSection.tsx` (rewrite, `id="faq"`, shadcn Accordion), `src/components/ContactSection.tsx` (`id="contact"`)
- Modify: `src/pages/Index.tsx` (order: Navbar, Hero, Work, Research, Skills, Process, Faq, Contact; wrap in `MotionConfig reducedMotion="user"`)
- Delete: `HeroSection.tsx`, `MetricsBanner.tsx`, `ProjectsGrid.tsx`, `StickyScrollSection.tsx`, `TechMarquee.tsx`, `AchievementsSection.tsx`, `FooterCta.tsx`, `src/hooks/useCenteredActiveIndex.ts`, `src/assets/project-*.jpg`, `src/App.css` if unused
- Test: `src/pages/Index.test.tsx`

**Interfaces:** `copyEmail(email: string): Promise<boolean>` exported from `ContactSection.tsx` — tries `navigator.clipboard.writeText`, returns `true` and shows sonner toast "Email copied"; on missing API or rejection sets `window.location.href = "mailto:" + email` and returns `false`.

- [ ] **Step 1: Failing tests**
  - `Index` renders sections with ids work, research, skills, process, faq, contact; no element has `href="#"`; no text /twitter/i.
  - `copyEmail` with `navigator.clipboard` undefined resolves `false` and does not throw.
- [ ] **Step 2:** Run → FAIL
- [ ] **Step 3:** Implement, rewire, delete old files.
- [ ] **Step 4:** `npm test` → all PASS; `npm run lint` → no errors in new files; `npm run build` → succeeds.
- [ ] **Step 5:** Commit `feat: process, faq, contact sections; remove old template`

### Task 6: Visual verification

- [ ] **Step 1:** `npm run build && npx vite preview --port 4173 &`
- [ ] **Step 2:** Playwright (Chromium at `/opt/pw-browsers`) screenshots: full page 1440×900 and 390×844, plus KGS dialog open at both sizes. Assert `document.documentElement.scrollWidth <= innerWidth` at 390px.
- [ ] **Step 3:** Fix any overflow/spacing issues found; re-run Steps 1–2.
- [ ] **Step 4:** Commit fixes; push branch `claude/tender-hawking-y4kbxl`; send screenshots to the user.
