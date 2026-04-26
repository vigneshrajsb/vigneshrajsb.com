# vigneshrajsb.com Redesign — Spec

Living spec for the full-site redesign. Updates land here as decisions evolve.

## 1. Feature Summary

A complete redesign of vigneshrajsb.com that evolves the current cream/beige aesthetic into a more considered, paperlike personal site. Single page. Production-ready: real responsive behavior, full a11y (WCAG AA), reduced-motion support. Adds two new sections (Writing index, Currently/Now) to the existing structure. The existing voice is preserved; the typography, hierarchy, and pacing are leveled up.

## 2. Primary User Action

The visitor (engineering peer or recruiter) lands, scans the header for who-and-where, scrolls through the bio + currently + work, and either (a) opens one of the linked projects or writing pieces, or (b) clicks through to email / GitHub / LinkedIn. The page should make either next step obvious without competing for attention.

## 3. Design Direction

**Register**: brand (per PRODUCT.md). Personal portfolio; design IS the product.

**Color strategy**: Restrained. Tinted warm-cream neutrals plus one deliberate accent (a deep ink-red used sparingly: rule weights, a name underline, the date stamp on the Currently block). Accent ≤10% of surface.

**Theme via scene sentence**: *A senior engineer in LA, late on a Sunday evening, half-deciding whether to message a former coworker about a side-project idea, scrolling on a laptop at the kitchen counter with one warm overhead light on.*

That forces light theme, warm color temperature, low contrast on chrome, high contrast on body ink. The page should feel like a letter, not a screen.

**Anchor references**:

- **Frank Chimero's frankchimero.com** — paperlike warmth, single-column rhythm, italic flourishes, considered marginalia.
- **Craig Mod's craigmod.com** — walking-pace pacing, generous type, hand-set feel without literal paper textures.
- **Mandy Brown's aworkinglibrary.com** — restrained editorial hierarchy, italic emphasis, quiet confidence.

**Anti-references** (per PRODUCT.md): generic SaaS landing, Linktree/link-list, neon-on-black dev-bro, Notion-clone neutral. Specifically avoid: hero-metric templates, three-card grids, feature-icon rows, gradient anything.

## 4. Scope

- **Fidelity**: production-ready.
- **Breadth**: single page (`index.html`), top to bottom.
- **Interactivity**: static HTML/CSS with one tiny JS touch only if needed (e.g., respecting `prefers-reduced-motion`). No frameworks.
- **Time intent**: ship-quality. Iterate visually until proud.

## 5. Layout Strategy

Single column, left-aligned, narrower than the current 650px (closer to a column of book text, ~580px max for body) to push line-length toward the editorial sweet spot of 65-72ch.

Spatial rhythm varies between sections rather than the current uniform `2rem` gap:

- A larger, breathing gap before major shifts (header → about, work → writing).
- A tighter, intentional gap between related blocks (currently date → currently lines).

One or two off-column elements provide the "designed" feel without breaking the column:

- A small italic location/timestamp in the upper margin (only on wide viewports).
- Section labels set as small caps in the side margin on wide viewports, inline above on narrow.
- A thin horizontal rule between sections that's NOT a generic full-width line, but a short rule (40-60px) flush with the left edge of the column.

No cards, no boxes, no nested containers. The page is a column of text with hierarchy, not a dashboard.

## 6. Information Architecture

Order, top to bottom:

1. **Header**
   - h1: "Vignesh" (large, italic display, slightly oversize for the column).
   - Role: "Sr Software Engineer at GoodRx" with the GoodRx link.
   - Location + small italic line: "Los Angeles" + a one-line dry-wit aside or current-date note.

2. **Links bar**
   - Inline row of profiles: GitHub · LinkedIn · Medium · Email — small Karla, separated by typographic middle dots.
   - Resume sits separately to the right (or wraps to its own row on narrow viewports), set in italic Vollkorn at body size with a small `↗` glyph and an accent-soft underline. Reads as a distinct call rather than another nav link.

3. **About**
   - Five existing paragraphs, lightly edited if anything reads off-voice.
   - First paragraph gets slightly larger leading as a "lede".

4. **Currently** (new)
   - Section label: "Currently" with a date stamp (e.g., "Apr 2026") in the accent color.
   - 2-4 short lines: what's being built / read / thought-about right now. Conversational, italicized fragments allowed.

5. **Work** ("What I've been working on")
   - Existing 5 bullets, kept as one-liners with the linked names bold + italic.
   - Concluding "Always happy to chat..." line.

6. **Writing** (new)
   - Section eyebrow "Writing", h2 "Notes from the side".
   - 4 curated Medium entries: italic linked title + a short blurb on the same line.
   - "More on Medium →" pointer below the list as a small Karla line.

7. **Beyond code** (renamed from "When I'm not coding")
   - Existing 5 bullets, lightly punctuated for rhythm.

8. **Footer / colophon**
   - Tiny meta line: "Set in Vollkorn and Karla. Hand-built with HTML and CSS. © 2026 Vignesh."
   - Optional: "View source" link to GitHub repo.

## 7. Typography

**Two families, magazine shape:**

- **Vollkorn** (Google Fonts) — body, headings, display. A warm bookish German serif with real ink character. Loaded weights: 400, 500, 600; 400 italic.
- **Karla** (Google Fonts) — meta, nav, labels, the colophon. Humanist sans with personality. Loaded weights: 400, 500.

Why these two: both off the impeccable reflex-reject list, both warm, both work together as serif body + sans meta in the magazine shape. They evoke "letterpress book + index card" rather than "Linear clone."

**Scale** (modular, ratio ≈ 1.333):

- Display (h1, name): `clamp(2.6rem, 5vw + 1rem, 3.6rem)`, Vollkorn 500 italic, tight tracking.
- Section heading (h2): `clamp(1.15rem, 0.5vw + 1rem, 1.35rem)`, Vollkorn 600, normal tracking.
- Section label (small caps eyebrow on wide viewports): `0.75rem`, Karla 500, tracking +0.08em, uppercase.
- Lede paragraph (first about graf): `1.075rem`, Vollkorn 400, line-height 1.65.
- Body: `1rem` (16px base, scales with viewport via root font-size), Vollkorn 400, line-height 1.6.
- Meta / small: `0.875rem`, Karla 400, line-height 1.5.
- Mono fallback: not used.

**Line length**: `max-width: 36rem` (~580px) for body; ~65-70ch.

**Italic discipline**: italic carries voice. Use for emphasis, asides, and the date stamps. Do not italicize section headings.

## 8. Color Palette (OKLCH, all tinted toward warm hues)

```
Background          oklch(0.965 0.012 78)    /* warm cream, slightly more saturated than current */
Background subtle   oklch(0.945 0.014 78)    /* used for the colophon / footer band */
Ink (body)          oklch(0.22 0.018 50)     /* warm dark brown-black */
Ink secondary       oklch(0.46 0.014 55)     /* meta, location, dates */
Ink tertiary        oklch(0.62 0.012 60)     /* tertiary labels, dividers */
Rule                oklch(0.84 0.018 70)     /* hairline borders */
Accent              oklch(0.50 0.16 32)      /* deep paprika / iron-red ink */
Accent subtle       oklch(0.62 0.10 32)      /* hover state, lighter accent */
```

Strategy: Restrained. Accent appears on:

- The "Currently" date stamp.
- The visited / hover state of links (text-decoration-color, not text color).
- A single small mark in the colophon (asterisk or rule).

That's the entire color budget. Any temptation to add more gets refused.

## 9. Interaction Model

- Page load: `<main>` opacity-fades in over 300ms (ease-out-quart). Concurrent with the fade, the `.name` h1 plays a one-shot 700ms `name-settle` keyframe (letter-spacing tightens from `0.005em` → `-0.012em`, opacity `0.85` → `1`) so type appears to settle onto paper. Both skipped under `prefers-reduced-motion`.
- Link hover: `text-decoration-color` shifts from ink-secondary to accent, transition 180ms ease-out. No color change on the text itself (keeps stability).
- Resume `↗` glyph and "More on Medium" `→` glyph nudge on hover/focus (transform 2–3px translate, 180ms ease-out-quart) to confirm the link "leaves" the site. Disabled under `prefers-reduced-motion`.
- Focus: visible outline using accent color, 2px, 2px offset. Never `outline: none` without a replacement.
- No scroll-triggered effects. No parallax. No section staggers. Stillness is the voice; motion appears only at the moment of intent.
- Print stylesheet: clean, ink-on-paper, no link decoration noise. Defines the page as printable as a CV-adjacent artifact.

## 10. Key States

- **Default**: as designed.
- **Hover / focus** on every link: defined above.
- **Reduced motion**: removes the fade-in; everything else is already static.
- **Narrow viewport (<540px)**: section labels move from side margin to inline above, reduce display size, links bar wraps cleanly.
- **Wide viewport (>1024px)**: side-margin section labels appear, more breathing room, max-width still capped.
- **Print**: ink-only, bigger margins, no nav links, no footer.
- **No JS**: page works fully without JavaScript.

## 11. Content Requirements

- **Header dry-wit aside**: one short line that captures voice. Draft: *"Currently writing this from a kitchen counter in LA."* Or rotate: *"Building tools, taking notes, walking the dog."* Pick one.
- **Currently block**: 3 fresh lines. Draft to be refined during build:
  - "Building Playwright Manager in the open."
  - "Reading: 'A Philosophy of Software Design' (again)."
  - "Thinking about how AI changes developer tooling."
- **Writing block**: 3-5 curated entries. We'll either source from Medium feed manually or include a single placeholder + "more on Medium →" link if we don't curate now.
- **Colophon**: "Set in Vollkorn and Karla. Hand-built with HTML and CSS." Plus year + name.

## 12. Recommended References (impeccable)

- `spatial-design.md` — column rhythm, side-margin treatments.
- `typography.md` — modular scale, italic discipline, line length.
- `color-and-contrast.md` — OKLCH tinted neutrals, accent budget.
- `motion-design.md` — minimal motion, reduced-motion compliance.
- `responsive-design.md` — viewport adaptations.

## 13. Resolved Decisions

1. **Writing content**: 4 curated Medium entries (OpenClaw, Find My Distributed Trace, Frontend automation principles, Building a Slack sidekick) with a "More on Medium →" pointer below.
2. **Header aside line**: "Building tools, taking notes, walking the dog."
3. **Currently block** (easily editable):
   - "Building new features for *Lifecycle*, in the open." (links to github.com/GoodRxOSS/lifecycle)
   - "Sharpening my design eye with *interface.craft*." (links to interfacecraft.dev)
   - "Thinking about how AI reshapes developer tooling in the agentic-harness era."
4. **Resume placement**: separated from the inline profile links. Set in italic Vollkorn body with a `↗` glyph and accent-soft underline; right-aligned at ≥540px, wraps below at <540px.
5. **Skip link**: visually-hidden "Skip to content" link before `<main>`, surfaces with the paprika focus ring on keyboard tab.
6. **Section anchors**: `id="about|currently|work|writing|beyond"` on each section for deep linking.

## 14. Implementation Progress

- [x] PRODUCT.md written.
- [x] SPEC.md written (this document).
- [x] Direction approved.
- [x] DESIGN.md written.
- [x] HTML structure rebuilt (`index.html`).
- [x] CSS rebuilt (`styles.css`): tokens, type, layout, components, motion, responsive, print.
- [x] States verified: hover (decoration color shifts to accent), focus (paprika outline visible), reduced-motion (animation disabled), narrow (320px through 540px clean, eyebrows inline, links bar wraps), wide (≥1024px, eyebrows in side margin, accent date stacks under label), print (media query writes URLs in parens, hides colophon).
- [x] Visual iteration pass complete: screenshots at 320 / 375 / 768 / 1280 verified; tap targets ≥44px; no console errors.
- [x] Critique pass complete: Resume separated from profiles row, skip-to-content link added, all sections given anchor `id`s, Writing section curated with 4 Medium entries, side-margin eyebrow positioned via `right: calc(100% + 1.5rem)`, code aligned to spec (eyebrow tracking 0.08em, page-load animation 300ms).
- [x] Audit pass complete: eyebrow text bumped to `--ink-2` (passes AA 4.5:1 for small text); profile-link tap target raised to 0.75rem padding (≥44px); shared `aria-describedby="ext-tab"` announces "opens in a new tab" on all 16 external links; Currently date stamp wrapped in `<em>` for double-coded color/italic signal; print stylesheet swapped from raw `black`/`white` keywords to warm hex (`#1a1410` on `#fafaf6`).
- [x] Motion pass complete: `.name` plays a 700ms `name-settle` letter-spacing/opacity keyframe on first paint; Resume `↗` and Medium `→` glyphs translate on hover/focus; reduced-motion overrides cancel all of it. No section staggers, no scroll-triggered effects added.
