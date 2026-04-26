# Product

## Register

brand

## Users

Engineering peers and hiring managers, primarily. The peers are senior engineers, OSS maintainers, and dev-tools folks who arrive from GitHub, Medium, conference talks, or word of mouth. They scan for substance: what's been built, what's been written, whether the person seems thoughtful. The recruiters arrive from LinkedIn or referrals; they want fast signal on role, scope, and credibility, then a way to reach out.

A secondary audience is the curious stranger landing from a link, podcast, or HN thread, who is forming a first impression of Vignesh as a person.

The site is a hub, not a workflow. Visitors stay for under two minutes and leave with either a clear next step (read a piece, open a repo, send an email) or a residual impression of taste and craft.

## Product Purpose

vigneshrajsb.com is Vignesh's personal site: a calm, considered home on the web that says "this is who I am, this is what I've made, here's how to reach me." It exists so that anyone who ends up curious about Vignesh, for any reason, can find the canonical version of the answer.

Success looks like: a visitor leaves understanding the work, having read at least one bullet that surprised them, and trusting that the person behind it has taste.

## Brand Personality

Warm, dry-witty, grounded.

Voice is conversational and human, never hype. Lightly self-deprecating, but underneath it sits real conviction about the work. Comfortable with small jokes (Slack emojis, the dog, archery without sights) without leaning on them. Confident enough to say less.

Emotional goal: the visitor closes the tab feeling like they just met someone genuinely interesting at a small event, not like they read a marketing page.

## Anti-references

This site should explicitly NOT look like:

- **Generic SaaS landing pages.** Gradient hero, three feature cards, blue CTA, soft-rounded everything. The portfolio cliché.
- **Linktree-style aggregators.** Vertical stack of identical pill buttons over a vague background. Zero authorship.
- **Neon-on-black dev-bro aesthetics.** Dark mode by default, neon green or purple accents, terminal cosplay. Reads as costume, not character.
- **Notion-clone neutral.** White, Inter, gray, default-everything. The "I have no opinion" aesthetic.

It also should not look like a startup founder's site. No "I help companies scale" framing, no logo grid of past employers, no testimonials.

## Design Principles

1. **Show the person, not the persona.** Every word and visual choice should sound like Vignesh, not a brand. The site is a piece of writing as much as it is a layout.
2. **Restraint over performance.** The warmth is in the details, not the volume. Quiet typography, considered spacing, one or two distinctive moves; no decorative noise.
3. **Earn every element.** If a section, sentence, or visual flourish doesn't add signal, cut it. The bar for inclusion is "would I miss this if it were gone?"
4. **Paperlike, not skeuomorphic.** Evoke the feel of well-set print: cream paper, careful type, generous margins, real hierarchy. Don't literalize it with paper textures, fold shadows, or stamp graphics.
5. **Substance first, decoration last.** The work, the writing, the contact path read clearly before any styling does. Design supports them; it never competes.

## Accessibility & Inclusion

Target WCAG 2.1 AA across the site:

- Minimum 4.5:1 contrast for body text, 3:1 for large text, against the cream background.
- Semantic HTML: `<main>`, `<nav>`, `<section>`, `<header>`, real heading hierarchy.
- Visible, distinct focus states on all interactive elements (no relying on default browser outlines being good enough).
- All motion respects `prefers-reduced-motion: reduce`; nothing essential conveyed only through animation.
- Tap targets at least 44 × 44px on touch viewports.
- Content reads in a logical order without CSS; layout never depends on visual-only cues.
