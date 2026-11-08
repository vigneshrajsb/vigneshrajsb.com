# AGENTS.md

Instructions for AI agents working on vigneshrajsb.com.

## The repo in one paragraph

Hand-built static site: plain HTML and CSS, no framework, no build step, no
package.json. Deploys to production automatically when `main` is pushed
(Vercel, proxied through Cloudflare). Voice and visual rules live in
`PRODUCT.md` and `DESIGN.md` — read them before writing copy or CSS.
Analytics is PostHog, loaded by the shared `/analytics.js` on every page:
anonymous events, localStorage persistence, no cookies, no session replay,
autocapture off. The event schema is `$pageview` (automatic), `link_click`,
and the `chocolata_*` events captured in `chocolata.js`. Keep it that way:
new events are added deliberately, not via autocapture.

## Dev commands

`make help` lists them. The ones that matter: `make feed` regenerates
feed.xml from the post pages (the only sanctioned way to touch feed.xml),
`make check` validates the XML files, fails if feed.xml is stale, and runs
`make lint`; `make serve` runs a local server on port 4173; `make shots`
(with `make serve` running) screenshots every page in light and dark at
1100px and 375px and fails on sideways scroll, broken images, or console
errors.

`make lint` (tools/lint-site.py) encodes the rules below that a script can
check: `color-scheme` meta on every page, literal colors without a dark
override, absolute share-card URLs that exist, JSON-LD that parses, `img`
alt/size, bare WebP, external-link attributes, and stray or oversized files.
When a fix teaches a rule a script can check, add it there.

## House rules that bite

- Sentence case for titles and headings everywhere ("Frontend automation
  principles: a field guide"). Proper nouns keep their capitals.
- No em-dashes in site chrome or new copy (source: `DESIGN.md` anti-patterns).
  Exception: article content ported verbatim from the author's originals keeps
  its em-dashes — never reword the author's published writing.
- Type: Geist for everything (`--font-text`; `--font-meta` points at it).
  Body is weight 300; keep small or faint text at 400 (see DESIGN.md).
  Monospace only for code in posts.
- Interactive elements need 44x44px tap targets on touch viewports.
- External links: `target="_blank" rel="noopener" aria-describedby="ext-tab"`
  (each page defines the sr-only `#ext-tab` span). Internal links get none of
  that.
- Links are never italic, even when the linked text is a title. Italic is for
  unlinked emphasis and captions only.
- `llms.txt` mirrors the homepage: when Currently, Work, the tagline, or the
  writing list changes, change `llms.txt` in the same commit.
- Never commit scratch tooling (wheels, venvs, downloaded binaries, renders).
  Everything not in `.vercelignore` is served publicly. Install helpers into
  a temp dir instead; `make lint` fails on `*.whl` and on files over 2 MB.

## Dark mode, type, and share cards

The site follows the system theme with no toggle (DESIGN.md, "Dark mode").
Every change has to work in both themes:

- Use the tokens in `styles.css` (`--bg`, `--ink`, `--ink-2`, `--ink-3`,
  `--rule`, `--accent`, ...). They flip automatically. A literal color needs
  its own `@media (prefers-color-scheme: dark)` override; a deliberately fixed
  palette (like the dark slides stage in humans-and-agents) says so with a
  `/* lint: same-in-both-themes */` comment.
- Every page carries `<meta name="color-scheme" content="light dark">`.
  Without it Safari's Adaptive Dark Mode inverts the page on its own.
- Art drawn in dark ink (the tailpiece, diagrams, transparent PNGs) vanishes
  on walnut paper. Give it a dark variant through `<picture>` with a
  `(prefers-color-scheme: dark)` source. Recolor the pixels themselves; CSS
  `filter` tints soften edges and fill in thin gaps (fixed in #27).
- Images and fonts are cached for a week (`vercel.json`). When you change an
  existing asset's pixels, give it a new filename, or returning visitors keep
  the old one.
- To check a theme without changing the OS: DevTools, Cmd+Shift+P, "Emulate
  CSS prefers-color-scheme: dark". `make shots` does both themes for you.

Type is Geist only (DESIGN.md, "Typography"). Body is 300; anything small,
faint, or `--ink-3` stays at 400 because thin strokes read as low contrast.
Bold is 600. No second family, and mono only for code inside posts.

Share cards are 1200x628 and live next to the page's assets. The homepage
card (`assets/og-home.png`) bakes in the name, role, tagline, font, and the
tailpiece, so re-render it whenever any of those change. Post cards are the
dithered gradient from `tools/og-dither.py`, or a crop of the post's own
title art (`writing/assets/humans-and-agents-og.jpg`). `og:image` and
`twitter:image` are the same absolute `https://vigneshrajsb.com/...` URL.

## Publishing a new post

A post touches seven files. Miss one and the post silently fails to propagate.

### 1. Create the post page

- Path: `writing/<slug>/index.html` — kebab-case slug, no dates in it.
- Copy an existing post (e.g. `writing/building-a-slack-sidekick/index.html`)
  as the template; it carries the correct head block, breadcrumb, skip link,
  stylesheets (`/styles.css` then `/writing/writing.css`), and
  `<body class="post-page">` (posts render at the wider 44rem measure).
- Keep the `<!-- feed:start -->` / `<!-- feed:end -->` markers around the
  hero figure + post body — `make feed` extracts the full-content RSS entry
  from between them and errors if they're missing. A page whose Article
  JSON-LD lacks `datePublished` is treated as a draft and skipped.
- Inline SVG charts are fine on the page but feed readers strip them, so
  `make feed` auto-rasterizes each one to `writing/assets/feed/` (via macOS
  QuickLook; content-hashed filenames) and swaps them for `<img>` in the
  feed only. Give every chart `<svg>` a `viewBox` and a descriptive
  `aria-label` — the label becomes the feed image's alt text.
- CSS-dependent layouts collapse in readers. `make feed` already converts
  stat-tile grids (`.tiles`/`.tile` with val/lbl/sub spans) to plain lists
  and bolds `.viz-title`/`.panel-h`/`.mini-t` labels; preview any new
  layout pattern in tools/feed-preview.html and extend `semanticize()` in
  tools/build-feed.py if it degrades.
- Body content is semantic HTML: `h2`/`h3` with slug `id` anchors, `p`,
  `ul`/`ol`, `blockquote`, `pre`/`code`, `figure`/`figcaption`. Wide code
  blocks and ASCII diagrams must scroll inside their own `pre` (the shared CSS
  handles it; ASCII diagrams get `class="diagram"`).
- Fill the head block per post: `<title>… — Vignesh</title>`, meta description
  (150-160 chars, faithful to the post's own opening), self-canonical URL,
  OG tags (`og:type` article, absolute `og:image` URL,
  `article:published_time`, `article:tag`), Twitter `summary_large_image`,
  and Article JSON-LD (headline, description, image, author Person
  "Vigneshraj Sekar Babu", `datePublished`, `mainEntityOfPage`).

### 2. Images

- Live in `writing/assets/`, referenced relatively (`../assets/…`).
- Heroes: resize to ~1200px wide, JPEG quality ~80 (target ~100-150 KB).
  `sips -s format jpeg -s formatOptions 82 --resampleWidth 1200 in.png --out out.jpg`
- Every `img` gets real `width`/`height` attributes and descriptive `alt`
  that does not repeat the figcaption. `loading="lazy"` below the fold only;
  the hero gets `fetchpriority="high"`; all post images get `decoding="async"`.
- WebP must have a fallback. Some web views (iOS Lockdown Mode, RSS reader
  apps) show nothing for WebP, so wrap it in `<picture>` with a WebP
  `<source>` and a JPEG `<img>`; the feed keeps only the JPEG. `make lint`
  rejects a bare WebP `<img>`.
- Loading state (shimmer placeholder + blur-up settle) comes free from
  `writing.css` — if the post has images, include
  `<script src="/writing/reveal.js" defer></script>` in the head.

### 3. Update the six other files

| File | What to add |
|---|---|
| `writing/index.html` | New `li` at the top of the archive list (date · read time, title, blurb) AND a `BlogPosting` entry in the Blog JSON-LD |
| `feed.xml` | Do NOT hand-edit — run `make feed` (regenerates full-content items from the post pages) |
| `sitemap.xml` | `<url>` for the post with `lastmod`; also bump `/writing/`'s `lastmod` |
| `llms.txt` | Bullet in the Writing section |
| `index.html` (homepage) | Optional: "Notes from the side" is a curated top-3, swap an entry only if the new post earns it |

### Posts with rich media (talks, decks, video)

What worked for "Humans + agents", a 38-slide talk turned into a post:

- The post is static: one image per slide at its final beat, one short
  caption each, minimal text. It loads light, reads in RSS, and works with
  screen readers. Animated loops were tried and dropped: they didn't play
  reliably and weren't worth the weight. Default to stills.
- Extras (a full-screen slides view, an interactive figure) are opt-in from
  a button at the top of the post, and stay out of the feed.
- Keep controls few and real. Vignesh removed a full-screen button nobody
  could read and a "swipe works too" hint that read as vibe-coded. A quiet key
  legend (`← → Move · Esc Close`) on keyboard devices only, nothing on touch.
- Re-encode video before committing (the replay MP4 went from 3.2 MB to
  1.2 MB with no visible loss), give it a poster, and show the poster under
  `prefers-reduced-motion`.
- A post with its own `<style>` follows the dark-mode rules above.
- Credits for archival media and icon licenses go at the end, after a short
  rule, as one italic paragraph (format from the Extraction post).

### 4. Validate before committing

- `make check` (feed.xml and sitemap.xml validate, the feed is current, and
  `make lint` passes, which also parses every JSON-LD block).
- `make serve` in one shell, `make shots` in another, then look at the
  screenshots of the pages you touched in both themes. The script catches
  sideways scroll and broken images; your eyes catch everything else.
- Check the feed item for the post: images present, absolute URLs, no
  scripts or buttons.
- All new URLs return 200.

### 5. Ship

Work on a branch and open a PR; every push gets a Vercel preview at
`https://vigneshrajsb-com-git-<branch-slug>-vrsb.vercel.app` (the branch
name lowercased, `/` turned into `-`). Send Vignesh the preview link: he
reviews there, often on his phone, and decides. Merge only when he says so
("ship it", "merge"); merging to `main` deploys production.

Headers, caching, redirects, and the 404 page only exist on a real deploy, so
check them on the preview. Cloud agent sessions can't reach vigneshrajsb.com
or preview URLs through their proxy; use the Vercel connector's
`web_fetch_vercel_url` instead. After merging, spot-check the live URLs.
Submitting the updated sitemap in Google Search Console (author-only) speeds
up indexing.

## Keep these instructions current

When Vignesh corrects something, or a fix reveals a rule ("the dark footer
looked soft", "the feed has no images"), write the rule down in the same PR
as the fix: here for process and gotchas, in DESIGN.md for visual decisions,
in PRODUCT.md for voice, and in `tools/lint-site.py` if a script can check
it. The next agent only knows what these files say.
