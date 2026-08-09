# AGENTS.md

Instructions for AI agents working on vigneshrajsb.com.

## The repo in one paragraph

Hand-built static site: plain HTML and CSS, no framework, no build step, no
package.json. Deploys to production automatically when `main` is pushed
(Vercel). Voice and visual rules live in `PRODUCT.md` and `DESIGN.md` — read
them before writing copy or CSS. Analytics is GoatCounter (cookieless); the
script tag has no SRI on purpose because GoatCounter rotates `count.js`.

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
| `feed.xml` | New `<item>` first: title, link, guid (= link), RFC-822 `pubDate`, description |
| `sitemap.xml` | `<url>` for the post with `lastmod`; also bump `/writing/`'s `lastmod` |
| `llms.txt` | Bullet in the Writing section |
| `index.html` (homepage) | Optional: "Notes from the side" is a curated top-3, swap an entry only if the new post earns it |

### 4. Validate before committing

- `xmllint --noout feed.xml sitemap.xml`
- Parse every JSON-LD block (e.g. `json.loads` over the script contents).
- Serve the repo root locally (`python3 -m http.server`) and check the post,
  the archive, and the homepage at desktop and 375px mobile width: no
  page-level horizontal overflow, images load, breadcrumb works.
- All new URLs return 200.

### 5. Ship

Commit to `main` and push; Vercel deploys production automatically.
Spot-check the live URLs after a minute. Submitting the updated sitemap in
Google Search Console (author-only) speeds up indexing.
