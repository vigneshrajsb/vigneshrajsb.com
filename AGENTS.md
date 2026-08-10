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
`make check` validates the XML files and fails if feed.xml is stale, and
`make serve` runs a local server on port 4173.

## House rules that bite

- Sentence case for titles and headings everywhere ("Frontend automation
  principles: a field guide"). Proper nouns keep their capitals.
- No em-dashes in site chrome or new copy (source: `DESIGN.md` anti-patterns).
  Exception: article content ported verbatim from the author's originals keeps
  its em-dashes — never reword the author's published writing.
- Monospace only inside `pre`/`code` within posts (documented exception to
  DESIGN.md's no-monospace rule). Site chrome stays Vollkorn + Karla.
- Interactive elements need 44x44px tap targets on touch viewports.
- External links: `target="_blank" rel="noopener" aria-describedby="ext-tab"`
  (each page defines the sr-only `#ext-tab` span). Internal links get none of
  that.

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

### 4. Validate before committing

- `make check` (validates feed.xml + sitemap.xml, fails if the feed is stale)
- Parse every JSON-LD block (e.g. `json.loads` over the script contents).
- Serve the repo root locally (`python3 -m http.server`) and check the post,
  the archive, and the homepage at desktop and 375px mobile width: no
  page-level horizontal overflow, images load, breadcrumb works.
- All new URLs return 200.

### 5. Ship

Commit to `main` and push; Vercel deploys production automatically.
Spot-check the live URLs after a minute. Submitting the updated sitemap in
Google Search Console (author-only) speeds up indexing.
