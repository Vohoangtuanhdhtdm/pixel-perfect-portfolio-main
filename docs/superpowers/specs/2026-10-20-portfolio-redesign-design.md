# Portfolio Redesign — Editorial / Swiss

Date: 2026-10-20 · Site: https://vohoangtuan.id.vn/

## Goal

Make the portfolio look modern, distinctive and credible for two audiences:

1. **Recruiters (primary)** for Backend .NET / Fullstack roles — they must see role, top project and skills within ~10 seconds.
2. **Academic reviewers (secondary)** — scholarships, graduate programs, research; the paper, GPA and scholarships need a dedicated, formal place.

Constraints: light theme only (no dark mode, no theme toggle). Keep the stack: React 18, Vite, Tailwind 3, shadcn/ui, framer-motion. Deploy target unchanged.

Success criteria:
- Hero alone answers "who, what role, how good" (name, role line, 4 key numbers, CTA to work + CV).
- No visual leftovers of the old template (grid background, purple–pink gradient, floating badges, rotating ring).
- Every fact on the page matches the CV (`public/cv.pdf`).
- `npm run build` and `npm run lint` pass; layout verified by screenshots at 1440px and 390px widths.

## Content source of truth

The CV (2026) supersedes the current site copy where they differ:

| Item | Current site | CV / new value |
|---|---|---|
| GPA | 8.68 | **8.6 / 10** |
| Scholarship | "100% · All semesters" | **Academic Merit Scholarship · 8 semesters** |
| Paper | "National Scientific Research Paper" | Full title: *Building a Real Estate Recommendation Model Based on Content Features and the k-Nearest Neighbors Algorithm* (national conference, 2026, co-author) |
| Certifications | Microsoft, AWS | Microsoft Back-End (Coursera, May 2025), AWS – MiAI (Udemy, Oct 2025), **PMI Project Management Ready® (Jun 29 2026, verify.certiport.com, ID wEkVs-48D4)**, UCPC 2023 participation (UIT) |
| Tech list | Includes Kubernetes, Terraform, Go, GraphQL, Docker, Redis | Only skills listed in the CV |
| Education | — | Thu Dau Mot University, Software Engineering, 2022–2027 |

TOEIC 750 is not in the CV but stays on the site (user-provided earlier).

New files in `public/`: `cv.pdf` (from the uploaded CV), `certificates/pmi-pm-ready.pdf`.

## Visual system

- **Colors** (CSS variables in `src/index.css`):
  - background `#FAFAF7` (warm off-white), surface `#FFFFFF`
  - foreground `#111111`, muted text warm grey `#6B6760`
  - border `#E7E4DD`
  - single accent **cobalt `#2747E8`** (links, primary button, highlights)
  - Remove all gradients and secondary accents (orange, purple, pink).
- **Typography:** headings *Inter Tight* (700–800, tight tracking, hero 96–128px desktop / 48–56px mobile); body *Inter*; labels, section numbers and stacks *JetBrains Mono* uppercase small. One Google Fonts import, in `index.html` only.
- **Layout:** 12-column container, max width ~1200px, generous whitespace. Sections numbered editorially (`01 — Selected Work`), separated by hairline rules rather than shadowed cards.
- **Motion:** fade/slide-in on scroll (once), underline-on-hover links, slight image zoom on project hover. No infinite animations. Respect `prefers-reduced-motion` via framer-motion `MotionConfig reducedMotion="user"`.
- `index.html`: `theme-color` → `#FAFAF7`; remove the unused font import mismatch.

## Page structure

1. **Navbar** — name left; Work · Research · Skills · Contact; "CV" button (opens `/cv.pdf`). Thin, translucent with backdrop blur after scroll. Mobile: sheet menu.
2. **Hero**
   - Eyebrow (mono): `Available for Backend / Fullstack roles · Ho Chi Minh City`
   - H1: **Võ Hoàng Tuấn**
   - Subline: *Backend .NET engineer building clean, scalable systems — and researching machine learning for PropTech.*
   - Stats row: GPA 8.6 · 8 scholarship semesters · 1 national paper · TOEIC 750
   - CTAs: "View work" (→ #work), "Download CV" (→ /cv.pdf, download)
   - Portrait (`avatarProfile.jpg`), modest rounded rectangle, right column on desktop, above text on mobile.
3. **01 — Selected Work** (bento grid)
   - KGS is the large tile; GoGo, Fraud Detection, Meditation Voice AI, CuaHangVHT smaller tiles.
   - Tile: category (mono), title, one-line description, role, stack chips.
   - Click opens a detail dialog: description, role, key responsibilities (from CV), **architecture diagram** when available, GitHub link, Live link only if a real URL exists.
   - Replace the old Unsplash/stock images with typographic tiles (no photos needed); `src/assets/project-*.jpg` become unused and are removed.
4. **02 — Research & Academics**
   - Publication block styled as a citation: title, "National Scientific Conference · 2026 · Co-author", tags, buttons "Read PDF" (`/research_paper.pdf`).
   - Education line: TDMU, Software Engineering, 2022–2027, GPA 8.6, 8 merit scholarships.
   - Certifications list (compact rows: name, issuer, date, verify link): PMI PM Ready, Microsoft Back-End, AWS – MiAI, UCPC 2023.
5. **03 — Skills** — grouped table from CV: Backend & Architecture · Data & AI · Frontend & Mobile · Databases & Cloud · Tools & Methodologies (adds PMI PM Ready / Agile). Replaces the marquee.
6. **04 — How I Work** — existing 5 process stages condensed into a vertical numbered list (no sticky scroll).
7. **05 — FAQ** — shadcn Accordion, existing content kept.
8. **Contact / Footer** — large line "Let's build something reliable."; email (click to copy, toast confirmation), GitHub, LinkedIn. Twitter placeholder removed. Phone number is **not** shown on the page (it remains only inside the CV PDF).

## Architecture diagrams

One reusable component `ArchitectureDiagram` rendering inline SVG from a small data description (nodes in columns/rows + arrows), styled with the site tokens (hairline borders, mono labels, cobalt for the key node). Hand-authored diagrams for:

- **KGS:** React client → ASP.NET Core API → { ML model service (Python), SQL Server }
- **GoGo:** Clean Architecture layers: Presentation (API) → Application → Domain ← Infrastructure (EF Core → SQL Server)
- **Fraud Detection:** CMS dataset (~10M records) → PySpark processing → { Peer price analysis, Linear Regression, PCA } → flagged outliers

Meditation Voice AI and CuaHangVHT show description + stack only. Diagrams must scale to mobile (viewBox, horizontal scroll avoided by stacking vertically below 640px or scaling).

## Code organisation

- `src/data/` — `profile.ts`, `projects.ts`, `achievements.ts` (publication, education, certifications), `skills.ts`, `process.ts`, `faq.ts`. Components read only from here so content can be edited without touching layout.
- `src/components/` — rewrite: `Navbar`, `Hero`, `WorkSection`, `ProjectDialog`, `ArchitectureDiagram`, `ResearchSection`, `SkillsSection`, `ProcessSection`, `FaqSection`, `ContactSection`, plus a small `SectionHeader` (number + title). Delete replaced components (`MetricsBanner`, `ProjectsGrid`, `StickyScrollSection`, `TechMarquee`, `AchievementsSection`, `FooterCta`, `HeroSection`) and the unused `hooks/useCenteredActiveIndex.ts` if nothing else uses it.
- shadcn/ui primitives reused: Dialog, Accordion, Sheet, Button, Toast/Sonner.

## Out of scope

Blog, i18n (site stays English), dark mode, CMS, analytics, new pages/routes.

## Verification

- `npm run lint`, `npm run build`, `npm test` pass.
- Playwright screenshots at 1440×900 and 390×844 of the full page and an open project dialog; check no horizontal scroll on mobile, CV and PDF links resolve.
