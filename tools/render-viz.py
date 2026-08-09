#!/usr/bin/env python3
"""Renders inline post SVGs to feed PNGs (feed readers strip inline SVG).

For every post with <svg> inside its feed markers, writes
writing/assets/feed/<slug>-viz<n>-<hash>.png via QuickLook (macOS qlmanage)
and prunes stale renders. build-feed.py swaps these in for the feed only;
the site keeps its inline SVGs. Filenames carry a content hash, so charts
re-render only when they change.
"""
import hashlib
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "writing" / "assets" / "feed"
RENDER_WIDTH = 1488

SITE_VARS = {
    "--bg": "oklch(0.965 0.012 78)",
    "--bg-subtle": "oklch(0.945 0.014 78)",
    "--ink": "oklch(0.22 0.018 50)",
    "--ink-2": "oklch(0.46 0.014 55)",
    "--ink-3": "oklch(0.62 0.012 60)",
    "--rule": "oklch(0.84 0.018 70)",
    "--accent": "oklch(0.50 0.16 32)",
    "--accent-soft": "oklch(0.62 0.10 32)",
}
FONT = "'Karla', -apple-system, 'Helvetica Neue', sans-serif"


def feed_content(html):
    start = html.find("<!-- feed:start -->")
    end = html.find("<!-- feed:end -->")
    if start == -1 or end == -1:
        return None
    return html[start:end]


def resolved_vars(html):
    """Site tokens plus the page's own --var declarations, one level deep."""
    out = dict(SITE_VARS)
    for m in re.finditer(r"(--[\w-]+)\s*:\s*([^;}]+)[;}]", html):
        name, val = m.group(1), m.group(2).strip()
        ref = re.fullmatch(r"var\((--[\w-]+)\)", val)
        out[name] = out.get(ref.group(1), val) if ref else val
    return out


def svg_hash(svg):
    return hashlib.sha256(svg.encode()).hexdigest()[:8]


def viewbox(svg):
    m = re.search(r'viewBox="([-\d. ]+)"', svg)
    if not m:
        sys.exit("error: svg without viewBox cannot be rendered")
    _, _, w, h = (float(v) for v in m.group(1).split())
    return w, h


def render(svg, dest, page_vars):
    w, h = viewbox(svg)
    height = round(RENDER_WIDTH * h / w)
    style = (
        "<style>:root{"
        + ";".join(f"{k}:{v}" for k, v in page_vars.items())
        + "}svg{font-family:" + FONT
        + ";background:" + page_vars["--bg"] + "}</style>"
    )
    if "xmlns" not in svg.split(">", 1)[0]:
        svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"', 1)
    svg = svg.replace(">", ">" + style, 1)

    with tempfile.TemporaryDirectory() as tmp:
        src = Path(tmp) / "chart.svg"
        src.write_text(svg)
        subprocess.run(
            ["qlmanage", "-t", "-s", str(RENDER_WIDTH), "-o", tmp, str(src)],
            check=True, capture_output=True,
        )
        png = Path(tmp) / "chart.svg.png"
        if not png.exists():
            sys.exit(f"error: qlmanage produced no output for {dest.name}")
        subprocess.run(
            ["sips", "-c", str(height), str(RENDER_WIDTH),
             str(png), "--out", str(dest)],
            check=True, capture_output=True,
        )


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for page in sorted((ROOT / "writing").glob("*/index.html")):
        html = page.read_text()
        content = feed_content(html)
        if content is None:
            continue
        svgs = re.findall(r"<svg.*?</svg>", content, re.S)
        slug = page.parent.name
        keep = set()
        for i, svg in enumerate(svgs, 1):
            name = f"{slug}-viz{i}-{svg_hash(svg)}.png"
            keep.add(name)
            dest = OUT / name
            if dest.exists():
                print(f"cached   {name}")
            else:
                render(svg, dest, resolved_vars(html))
                print(f"rendered {name}")
        for stale in OUT.glob(f"{slug}-viz*.png"):
            if stale.name not in keep:
                stale.unlink()
                print(f"pruned   {stale.name}")


if __name__ == "__main__":
    main()
