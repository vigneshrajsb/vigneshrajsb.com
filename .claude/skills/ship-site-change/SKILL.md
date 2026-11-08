---
name: ship-site-change
description: Use for any change to vigneshrajsb.com pages, CSS, fonts, images, share cards, headers, or copy, to verify it in light and dark, get it previewed, and record new rules.
---

# Ship a change to vigneshrajsb.com

Read AGENTS.md first, plus DESIGN.md for anything visual and PRODUCT.md for
copy. Then:

1. **Branch**, never `main`.
2. **Make the change with both themes in mind.** Tokens, not literal colors.
   Changed an existing image or font file? Give it a new filename, because
   assets are cached for a week. Changed the name, role, tagline, font, or
   tailpiece? Re-render `assets/og-home.png`. Changed Currently, Work, or the
   tagline? Mirror it in `llms.txt`.
3. **Check locally.** `make check` (includes `make lint`). Then `make serve`
   and `make shots`, and look at the screenshots of every page you touched:
   light and dark, 1100px and 375px. Show Vignesh before/after shots for
   anything visual.
4. **Open a PR** and send the Vercel preview link
   (`https://vigneshrajsb-com-git-<branch-slug>-vrsb.vercel.app`). Headers,
   caching, and the 404 page can only be checked there; from a cloud session
   use the Vercel connector's `web_fetch_vercel_url`.
5. **Merge only when he says** "ship it" or "merge". Then spot-check
   production.
6. **Record the rule.** If he corrected something, or the fix revealed a
   gotcha, add it to AGENTS.md / DESIGN.md / PRODUCT.md, and to
   `tools/lint-site.py` if a script can catch it, in the same PR.
