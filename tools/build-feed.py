#!/usr/bin/env python3
"""Regenerates feed.xml from the post pages under writing/.

The post pages are the source of truth. Each post marks its feed content
with <!-- feed:start --> / <!-- feed:end --> comments; metadata comes from
the page's Article JSON-LD. Pages without an Article datePublished are
treated as drafts and skipped. Run with --check to verify feed.xml is
current without writing it (exits 1 if stale).
"""
import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

SITE = "https://vigneshrajsb.com"
ROOT = Path(__file__).resolve().parent.parent
FEED = ROOT / "feed.xml"

CHANNEL = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Vignesh — Writing</title>
    <link>{SITE}/writing/</link>
    <description>Notes from the side: developer tools, testing, and infrastructure by Vigneshraj Sekar Babu.</description>
    <language>en-us</language>
    <atom:link href="{SITE}/feed.xml" rel="self" type="application/rss+xml"/>
"""

WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def article_meta(html):
    for m in re.finditer(
        r'<script type="application/ld\+json">(.*?)</script>', html, re.S
    ):
        data = json.loads(m.group(1))
        if data.get("@type") == "Article":
            return data
    return None


def extract_content(html, page):
    start = html.find("<!-- feed:start -->")
    end = html.find("<!-- feed:end -->")
    if start == -1 or end == -1:
        sys.exit(f"error: {page}: missing feed:start / feed:end markers")
    return html[start + len("<!-- feed:start -->"):end].strip()


def replace_svgs(content, slug):
    """Swap inline SVGs for the PNGs render-viz.py produced (feed only)."""
    counter = [0]

    def sub(m):
        counter[0] += 1
        svg = m.group(0)
        digest = hashlib.sha256(svg.encode()).hexdigest()[:8]
        name = f"{slug}-viz{counter[0]}-{digest}.png"
        if not (ROOT / "writing" / "assets" / "feed" / name).exists():
            sys.exit(f"error: missing {name} — run: make feed")
        label = re.search(r'aria-label="([^"]*)"', svg)
        alt = (label.group(1) if label else "").replace('"', "&quot;")
        vb = re.search(r'viewBox="([-\d. ]+)"', svg)
        _, _, w, h = (float(v) for v in vb.group(1).split())
        return (
            f'<img src="{SITE}/writing/assets/feed/{name}" alt="{alt}" '
            f'width="744" height="{round(744 * h / w)}" />'
        )

    return re.sub(r"<svg.*?</svg>", sub, content, flags=re.S)


def div_block(content, start):
    """Return (start, end) of the div opening at `start`, matching nesting."""
    depth = 0
    for m in re.finditer(r"<div\b|</div>", content[start:]):
        depth += 1 if m.group(0) == "<div" else -1
        if depth == 0:
            return start, start + m.end()
    sys.exit("error: unbalanced <div> while extracting feed content")


def semanticize(content):
    """Rewrite CSS-dependent structures into plain HTML that reads without
    styles: stat-tile grids become lists, mini panel titles become bold."""
    while True:
        i = content.find('<div class="tiles">')
        if i == -1:
            break
        start, end = div_block(content, i)
        block = content[start:end]
        items = []
        for tile in re.findall(r'<div class="tile[^"]*">(.*?)</div>', block, re.S):
            def span(cls):
                m = re.search(rf'<span class="{cls}">(.*?)</span>', tile, re.S)
                return re.sub(r"\s+", " ", m.group(1)).strip() if m else ""
            li = f"<strong>{span('val')}</strong> {span('lbl')}"
            if span("sub"):
                li += f" <em>({span('sub')})</em>"
            items.append(f"<li>{li}</li>")
        content = content[:start] + "<ul>" + "".join(items) + "</ul>" + content[end:]
    content = re.sub(
        r'<p class="(?:viz-title|panel-h|mini-t)">(.*?)</p>',
        r"<p><strong>\1</strong></p>",
        content,
        flags=re.S,
    )
    return content


def absolutize(content, post_url):
    content = re.sub(r'(href|src)="\.\./', rf'\1="{SITE}/writing/', content)
    content = re.sub(r'(href|src)="/', rf'\1="{SITE}/', content)
    content = re.sub(r'(href|src)="#', rf'\1="{post_url}#', content)
    return content


def cdata(text):
    return "<![CDATA[" + text.replace("]]>", "]]]]><![CDATA[>") + "]]>"


def esc(text):
    return (
        text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    )


def rfc822(iso_date):
    d = datetime.strptime(iso_date, "%Y-%m-%d").replace(tzinfo=timezone.utc)
    return (
        f"{WEEKDAYS[d.weekday()]}, {d.day:02d} {MONTHS[d.month - 1]} "
        f"{d.year} 00:00:00 GMT"
    )


def build():
    items = []
    for page in sorted((ROOT / "writing").glob("*/index.html")):
        html = page.read_text()
        meta = article_meta(html)
        if not meta or not meta.get("datePublished"):
            print(f"skip (draft, no Article datePublished): {page.parent.name}")
            continue
        url = meta["url"]
        content = extract_content(html, page)
        content = replace_svgs(content, page.parent.name)
        content = semanticize(content)
        items.append({
            "title": meta["headline"],
            "url": url,
            "date": meta["datePublished"],
            "description": meta["description"],
            "content": absolutize(content, url),
        })

    items.sort(key=lambda i: (i["date"], i["url"]), reverse=True)

    out = [CHANNEL]
    for i in items:
        out.append(
            "    <item>\n"
            f"      <title>{esc(i['title'])}</title>\n"
            f"      <link>{i['url']}</link>\n"
            f"      <guid>{i['url']}</guid>\n"
            f"      <pubDate>{rfc822(i['date'])}</pubDate>\n"
            f"      <description>{esc(i['description'])}</description>\n"
            f"      <content:encoded>{cdata(i['content'])}</content:encoded>\n"
            "    </item>\n"
        )
    out.append("  </channel>\n</rss>\n")
    return "".join(out), items


def main():
    feed, items = build()
    if "--check" in sys.argv:
        if not FEED.exists() or FEED.read_text() != feed:
            sys.exit("error: feed.xml is stale — run: make feed")
        print(f"feed.xml is current ({len(items)} items)")
        return
    FEED.write_text(feed)
    print(f"wrote feed.xml ({len(items)} items)")
    for i in items:
        print(f"  {i['date']}  {i['title']}")


if __name__ == "__main__":
    main()
