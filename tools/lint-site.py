#!/usr/bin/env python3
"""Checks the site's pages for the rules agents and reviewers keep re-learning.

Every rule here traces back to a real fix (see AGENTS.md, "Lessons the site
already paid for"). Run via `make lint`; `make check` runs it too.

Usage: lint-site.py [page.html ...]   (default: every tracked page outside docs/)
Exit code 1 if any check fails.
"""
import json
import os
import re
import subprocess
import sys
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://vigneshrajsb.com"
MAX_FILE_KB = 2048  # the largest real asset (the replay video) is ~1.2 MB
BANNED_EXT = (".whl", ".zip", ".tar", ".gz", ".dmg", ".pyc")
LITERAL_COLOR = re.compile(r"#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch|oklab|lab|lch)\(\s*[\d.]")


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.meta = {}
        self.ids = set()
        self.imgs = []  # (attrs, inside_picture, line)
        self.links = []  # (attrs, line)
        self.picture_depth = 0
        self.embed_depth = 0  # inside third-party embed markup (X's blockquote)
        self.picture_sources = []
        self.in_script = None
        self.in_style = False
        self.jsonld = []
        self.styles = []
        self._buf = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "meta":
            key = a.get("property") or a.get("name")
            if key:
                self.meta[key] = a.get("content", "")
        elif tag == "picture":
            self.picture_depth += 1
            self.picture_sources = []
        elif tag == "source" and self.picture_depth:
            self.picture_sources.append(a)
        elif tag == "img":
            self.imgs.append((a, self.picture_depth > 0, list(self.picture_sources), self.getpos()[0]))
        elif tag == "blockquote" and "twitter-tweet" in a.get("class", ""):
            self.embed_depth += 1
        elif tag == "a" and not self.embed_depth:
            self.links.append((a, self.getpos()[0]))
        elif tag == "script":
            self.in_script = a.get("type", "")
            self._buf = []
        elif tag == "style":
            self.in_style = True
            self._buf = []

    def handle_endtag(self, tag):
        if tag == "blockquote" and self.embed_depth:
            self.embed_depth -= 1
        elif tag == "picture" and self.picture_depth:
            self.picture_depth -= 1
        elif tag == "script" and self.in_script is not None:
            if self.in_script == "application/ld+json":
                self.jsonld.append("".join(self._buf))
            self.in_script = None
        elif tag == "style" and self.in_style:
            self.styles.append("".join(self._buf))
            self.in_style = False

    def handle_data(self, data):
        if self.in_script is not None or self.in_style:
            self._buf.append(data)


def tracked_files():
    out = subprocess.run(["git", "ls-files"], cwd=ROOT, capture_output=True, text=True, check=True)
    return [f for f in out.stdout.splitlines() if f]


def local_path(url):
    """Map a site URL to a file in the repo, or None if it isn't ours."""
    if url.startswith(SITE):
        url = url[len(SITE):]
    elif re.match(r"^[a-z]+:", url) or url.startswith("//"):
        return None
    return url.split("#")[0].split("?")[0]


def lint_page(rel, errors):
    path = os.path.join(ROOT, rel)
    with open(path, encoding="utf-8") as fh:
        html = fh.read()
    p = Page()
    p.feed(html)
    err = lambda line, msg: errors.append(f"{rel}:{line}: {msg}")

    # Dark mode: every page opts in, or Safari's Adaptive Dark Mode inverts it.
    if "light dark" not in p.meta.get("color-scheme", ""):
        err(1, 'missing <meta name="color-scheme" content="light dark">')

    # Literal colors in page styles need a dark-mode counterpart, unless the
    # style says on purpose that it looks the same in both themes.
    css = "\n".join(p.styles)
    if LITERAL_COLOR.search(css) and not re.search(r"prefers-color-scheme:\s*dark", css) \
            and "lint: same-in-both-themes" not in css:
        err(1, "inline <style> uses literal colors but has no prefers-color-scheme: dark override (use site tokens, or mark a deliberate fixed palette with /* lint: same-in-both-themes */)")

    # Share cards: absolute URL, file exists, twitter card matches.
    if rel != "404.html":
        og = p.meta.get("og:image", "")
        if not og.startswith(SITE + "/"):
            err(1, f"og:image must be an absolute {SITE}/... URL (got {og!r})")
        else:
            f = local_path(og)
            if f and not os.path.exists(os.path.join(ROOT, f.lstrip("/"))):
                err(1, f"og:image file not found in repo: {f}")
        tw = p.meta.get("twitter:image", "")
        if tw and tw != og:
            err(1, "twitter:image differs from og:image")

    # JSON-LD must parse.
    for block in p.jsonld:
        try:
            json.loads(block)
        except ValueError as e:
            err(1, f"JSON-LD does not parse: {e}")

    # Images: alt, intrinsic size, and no bare WebP (some web views can't show it).
    page_dir = os.path.dirname(rel)
    for a, in_picture, sources, line in p.imgs:
        src = a.get("src", "")
        if "alt" not in a:
            err(line, f"<img src={src!r}> has no alt attribute")
        if not (a.get("width") and a.get("height")):
            err(line, f"<img src={src!r}> needs width and height attributes")
        if src.lower().endswith(".webp"):
            err(line, f"<img src={src!r}> is WebP; wrap in <picture> with a WebP <source> and a JPEG/PNG <img>")
        if in_picture and any("webp" in (s.get("type", "") + s.get("srcset", "")) for s in sources) \
                and src.lower().endswith(".webp"):
            err(line, "WebP <picture> has no non-WebP fallback <img>")
        f = local_path(src)
        if f and src and not src.startswith("data:"):
            target = os.path.normpath(os.path.join(ROOT, f.lstrip("/")) if f.startswith("/")
                                      else os.path.join(ROOT, page_dir, f))
            if not os.path.exists(target):
                err(line, f"image not found: {src}")

    # External links open in a new tab and announce it.
    for a, line in p.links:
        href = a.get("href", "")
        if not re.match(r"^https?://", href) or href.startswith(SITE):
            continue
        if a.get("target") != "_blank" or "noopener" not in a.get("rel", ""):
            err(line, f'external link {href} needs target="_blank" rel="noopener"')
        elif a.get("aria-describedby") != "ext-tab":
            err(line, f'external link {href} needs aria-describedby="ext-tab"')
    if any(a.get("aria-describedby") == "ext-tab" for a, _ in p.links) and "ext-tab" not in p.ids:
        err(1, 'links reference #ext-tab but the page has no <span id="ext-tab" class="sr-only">')


def main():
    errors = []
    files = tracked_files()

    # Repo hygiene: scratch tooling and huge files get deployed if committed.
    for f in files:
        full = os.path.join(ROOT, f)
        if f.endswith(BANNED_EXT):
            errors.append(f"{f}: build/scratch artifact committed; remove it and keep it out of the repo")
        elif os.path.exists(full) and os.path.getsize(full) > MAX_FILE_KB * 1024:
            errors.append(f"{f}: {os.path.getsize(full) // 1024} KB is over the {MAX_FILE_KB} KB budget; compress it")

    pages = sys.argv[1:] or [
        f for f in files
        if f.endswith(".html") and not f.startswith(("docs/", "tools/"))
    ]
    for rel in pages:
        lint_page(rel, errors)

    for e in errors:
        print(e)
    if errors:
        print(f"\nlint-site: {len(errors)} problem(s)")
        sys.exit(1)
    print(f"lint-site: {len(pages)} pages OK")


if __name__ == "__main__":
    main()
