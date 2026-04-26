# Design

Visual system for vigneshrajsb.com. Captures the tokens, type, and patterns that anchor the redesign so future work stays on-brand.

## Visual Theme

**Paperlike, editorial, warm.** A page that reads like a hand-set letter on cream paper rather than a screen. Light theme by intent; the warmth comes from tinted neutrals (every surface tinted toward 70-80° hue) and a single ink-red accent used three places only.

The voice is dry-witty and grounded; the visual treatment supports that by being quiet and committed rather than decorated. No gradients, no glassmorphism, no photos, no illustration. Type, paper, hierarchy carry everything.

**Color strategy**: Restrained. Tinted-cream neutrals + one accent ≤10%.

## Color Palette

All values in OKLCH. Reduce chroma at extremes. Never `#000` or `#fff`.

```css
--bg:           oklch(0.965 0.012 78);   /* warm cream paper */
--bg-subtle:    oklch(0.945 0.014 78);   /* footer / colophon band */
--ink:          oklch(0.22 0.018 50);    /* body text, primary */
--ink-2:        oklch(0.46 0.014 55);    /* meta, location, dates */
--ink-3:        oklch(0.62 0.012 60);    /* tertiary, dividers, labels */
--rule:         oklch(0.84 0.018 70);    /* hairline borders, rules */
--accent:       oklch(0.50 0.16 32);     /* deep paprika ink, restrained */
--accent-soft:  oklch(0.62 0.10 32);     /* hover/transition target */
--focus:        oklch(0.50 0.16 32);     /* focus outline, same as accent */
```

**Accent appears only on**: the Currently date stamp; link hover (text-decoration-color); the Resume departing-glyph (`↗`). That's the entire budget.

**Contrast**:
- `--ink` on `--bg`: ~13.0:1 (well above AAA).
- `--ink-2` on `--bg`: ~6.8:1 (passes AA for body, AAA for large).
- `--ink-3` on `--bg`: ~3.6:1 (passes AA large only; reserve for non-essential meta and rules).
- `--accent` on `--bg`: ~5.6:1 (passes AA body).

## Typography

Two families, magazine shape. Both off the impeccable reflex-reject list.

### Families

- **Vollkorn** (Google Fonts) — body, headings, display. Warm bookish German serif with real ink character. Loaded weights: 400, 500, 600. Loaded italic: 400 italic, 500 italic.
- **Karla** (Google Fonts) — meta, nav, labels, the colophon. Humanist sans with personality. Loaded weights: 400, 500.

Loaded via single Google Fonts request to minimize render delay; subsetting limited to Latin.

### Scale

Modular, 1.333 ratio. Fluid `clamp()` for the display.

```css
--text-display:  clamp(2.6rem, 5vw + 1rem, 3.6rem);  /* h1 / name */
--text-h2:       clamp(1.15rem, 0.5vw + 1rem, 1.35rem); /* section heading */
--text-lede:     1.075rem;  /* lede paragraph */
--text-body:     1rem;      /* body */
--text-meta:     0.875rem;  /* meta, links, date */
--text-eyebrow:  0.75rem;   /* small-caps section label */
```

Root font-size scales lightly with viewport for legibility:

```css
:root { font-size: 16px; }
@media (min-width: 768px) { :root { font-size: 17px; } }
```

### Voice rules

- Italic carries voice. Reserve for emphasis, asides, and date stamps. Headings stay upright.
- The h1 "Vignesh" is 500 italic, set at display size. The italic is intentional and load-bearing for the brand's warmth.
- Section eyebrows are uppercase Karla 500 with `letter-spacing: 0.08em`.
- Body line length is capped via `max-width: 36rem` on the main column (~65-70ch).
- Body line-height: 1.6. Lede line-height: 1.65. Meta line-height: 1.5.

## Layout

**Single column**, left-aligned, max-width ~580px (`36rem`). The page is a column of text, not a dashboard.

**Spatial rhythm** (varied, not uniform):

```css
--space-2xs: 0.25rem;
--space-xs:  0.5rem;
--space-sm:  0.75rem;
--space-md:  1rem;
--space-lg:  1.5rem;
--space-xl:  2.5rem;
--space-2xl: 4rem;
--space-3xl: 6rem;
```

Spacing pattern (inter-section):
- Header to links bar: `--space-md`.
- Links bar to about: `--space-xl`.
- Major section to major section (about → currently → work → writing → beyond): `--space-2xl`.
- Last section to colophon: `--space-3xl`.

Spacing pattern (intra-section):
- Section eyebrow / heading to first content row: `--space-md`.
- Paragraph to paragraph: `--space-md`.
- Bullet to bullet in lists: `--space-sm`.

**Side-margin labels** (eyebrow style) appear in the left margin at viewports ≥1024px, using `position: absolute` relative to a `position: relative` section. On narrow viewports, eyebrows render inline above the heading.

**Rules**: short (≈48px), flush-left, 1px solid `--rule`. Used between sections. Never full-width gradient lines.

**Container philosophy**: only `<main>` has a max-width container. No nested boxes, no card grids, no decorative containers. Sections are `<section>` elements with margin spacing, nothing else.

## Components

Components are minimal because the page is a column of text. The "components" below are CSS patterns, not React components.

### `header`

Name (h1), role line, location, dry-wit aside. Optional date stamp on the right at wide viewports.

### `nav.links`

Inline row of small Karla links separated by a typographic middle dot (`·`) using a `::after` pseudo-element. No pills, no icons. Wraps cleanly on narrow viewports.

### `section.about`

Lede paragraph (slightly larger) followed by body paragraphs. No styling beyond paragraph spacing and Vollkorn body.

### `section.currently`

Eyebrow label "Currently" with date stamp in `--accent` color, followed by 3-4 short italic-friendly lines as a styled `<ul>` without bullets.

### `section.work`, `section.beyond`

Eyebrow label, h2 heading, `<ul>` of bullets. Bullets use a custom marker (`·` middle dot or small em-dash) rather than disc.

### `section.writing`

Eyebrow + heading + a single styled link "Read on Medium →" with the arrow being a real Unicode arrow (`→`), not a decorative SVG.

### `footer.colophon`

Small Karla text on `--bg-subtle`, two lines: type-and-build credits, copyright. No accent mark.

## Motion

Minimal by design. Stillness is the voice; motion appears only at the moment of intent.

- **Page-load**: `<main>` opacity-fades 300ms (ease-out-quart). Concurrent with the fade, the `.name` h1 plays a one-shot 700ms `name-settle` keyframe — letter-spacing tightens from `0.005em` to `-0.012em`, opacity `0.85` → `1`. Reads as type settling onto paper. The h1 is the only element with a non-opacity entrance.
- **Link hover**: `text-decoration-color` transitions from current to `--accent` over 180ms ease-out. Text color stays put.
- **Departing-glyph nudge**: the Resume `↗` and "More on Medium" `→` translate 2–3px on hover/focus (180ms ease-out-quart). Confirms the click leaves the site. Apply only to glyphs that already mean "departing"; never to chrome that stays put.
- **Focus**: `outline: 2px solid var(--focus); outline-offset: 2px;` instant.
- No scroll-triggered effects, no parallax, no section/list entrance staggers, no hover lifts on text or cards.
- All motion respects `prefers-reduced-motion: reduce` — page-load fade, name-settle keyframe, and glyph nudges are all cancelled.

## Responsive

Three explicit breakpoints. No grid template madness; the layout is a single column at every size.

- **<540px (default / small)**: `padding: 3rem 1.25rem`. Eyebrows render inline above h2. Display size at lower bound of clamp. Links bar wraps to two lines.
- **540–1023px (medium)**: `padding: 4rem 1.5rem`. Eyebrows inline. Display mid-range.
- **≥1024px (wide)**: `padding: 6rem 2rem`. Eyebrows render in side margin (left of column). Display at upper bound. Optional date stamp visible in header.

Print stylesheet: ink-only, larger margins, link decoration removed but URLs printed in-line in `(parens)` after the link text. Footer/colophon hidden.

## Accessibility

- WCAG 2.1 AA across the site.
- Semantic HTML: `<main>`, `<nav>`, `<section>`, `<header>`, `<footer>`, real heading hierarchy (one h1, then h2s).
- Visible focus states using `--focus` (matches accent), 2px outline, 2px offset. Never `outline: none`.
- Tap targets ≥44×44px on touch. Link bar uses `padding` to grow tap target without changing visual size.
- All motion respects `prefers-reduced-motion: reduce`.
- No color-only signaling; the accent is reinforced by italics or punctuation everywhere it appears.
- Links underlined by default with `text-underline-offset: 0.18em`, decoration thickness 1px.

## What's banned

Mirrors the impeccable absolute bans, plus brand-specific:

- No side-stripe borders.
- No gradient text.
- No glassmorphism.
- No hero-metric template.
- No identical card grids.
- No modals (none expected on this site anyway).
- No em-dashes in copy. Use commas, colons, semicolons, periods, parentheses.
- No icons-above-headings. Eyebrow label + heading is the pattern.
- No monospace. The site is editorial, not dev-bro.
- No dark mode toggle. The scene sentence forces light; a toggle would dilute the voice.
