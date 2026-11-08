---
name: publish-post
description: Use when writing, porting, or publishing a post under writing/ on vigneshrajsb.com, including turning a talk, deck, or interactive piece into a post.
---

# Publish a post on vigneshrajsb.com

AGENTS.md is the source of truth; this is the order to work in. Read
AGENTS.md ("Publishing a new post", "Dark mode, type, and share cards",
"Posts with rich media"), PRODUCT.md, and DESIGN.md first.

1. **Shape it.** For a talk or deck: one still per slide at its final beat,
   one short caption each, minimal prose. Extras (slides view, interactive
   figures) are opt-in from a button at the top and stay out of the feed.
   Draft as an artifact first if Vignesh wants to edit together.
2. **Branch.** `vb/<slug>-post` or the session's assigned branch. Never push
   to `main`.
3. **Build the page** from an existing post: `writing/<slug>/index.html`,
   feed markers, head block, Article JSON-LD with `datePublished`.
4. **Assets.** Into `writing/assets/<slug>/`. WebP inside `<picture>` with a
   JPEG `<img>` fallback; `width`/`height`/`alt` on every `img`; video
   re-encoded with a poster. Nothing over 2 MB, no scratch files.
5. **Dark mode.** Site tokens only, or a `prefers-color-scheme: dark`
   override for each literal color. Dark-ink art gets a dark variant.
6. **Share card.** 1200x628, `tools/og-dither.py` or a crop of the post's
   title art; absolute URL in `og:image` and `twitter:image`.
7. **Propagate.** `writing/index.html` (list + JSON-LD), `sitemap.xml`,
   `llms.txt`, `make feed`. Homepage "Notes from the side" only if asked;
   it holds exactly three.
8. **Verify.** `make check`, then `make serve` + `make shots` and look at the
   post in light and dark at both widths. Read the post's feed item: images
   present with absolute URLs, no buttons or scripts.
9. **PR and preview.** Open the PR, send Vignesh the preview link
   (`https://vigneshrajsb-com-git-<branch-slug>-vrsb.vercel.app/writing/<slug>/`).
   Merge only on his "ship it" / "merge", then spot-check the live URLs.
10. **Write down what you learned.** Any correction he made that will apply
    to the next post goes into AGENTS.md (or `tools/lint-site.py`) in the
    same PR.
