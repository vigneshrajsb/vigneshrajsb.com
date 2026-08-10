#!/usr/bin/env python3
"""Generates a dithered-gradient social card from the site palette.

Renders a low-res multi-stop gradient distorted by soft waves, ordered-dithers
it (Bayer 8x8) onto a ramp of blog colors, and upscales with hard pixels.
Usage: og-dither.py <out.png> [seed]
"""
import math
import struct
import sys
import zlib

W, H, SCALE = 300, 157, 4  # -> 1200 x 628


def oklch_to_srgb(L, C, h):
    a = C * math.cos(math.radians(h))
    b = C * math.sin(math.radians(h))
    l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
    m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
    s_ = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3
    r = 4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_
    g = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_
    bl = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_

    def gamma(u):
        u = min(1.0, max(0.0, u))
        return 12.92 * u if u <= 0.0031308 else 1.055 * u ** (1 / 2.4) - 0.055

    return tuple(round(gamma(v) * 255) for v in (r, g, bl))


# Site tokens, paper -> rust -> blue -> ink
STOPS = [
    oklch_to_srgb(0.965, 0.012, 78),   # --bg paper
    oklch_to_srgb(0.62, 0.10, 32),     # --accent-soft
    oklch_to_srgb(0.50, 0.16, 32),     # --accent rust
    oklch_to_srgb(0.51, 0.11, 245),    # --bar chart blue
    oklch_to_srgb(0.22, 0.018, 50),    # --ink
]

# Palette ramp: the stops plus midpoints between neighbors
PALETTE = []
for i, s in enumerate(STOPS):
    PALETTE.append(s)
    if i + 1 < len(STOPS):
        n = STOPS[i + 1]
        PALETTE.append(tuple((s[c] + n[c]) // 2 for c in range(3)))

BAYER = [
    [0, 32, 8, 40, 2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44, 4, 36, 14, 46, 6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [3, 35, 11, 43, 1, 33, 9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47, 7, 39, 13, 45, 5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21],
]


def field(x, y, seed):
    """Gradient position 0..1 across the canvas, bent by soft waves."""
    u, v = x / W, y / H
    t = 0.62 * u + 0.55 * v
    t += 0.10 * math.sin(6.1 * v + 1.7 * seed + 2.2 * u)
    t += 0.07 * math.sin(9.3 * u + 0.9 * seed)
    t += 0.05 * math.sin(14.0 * (u + v) + 3.1 * seed)
    return min(1.0, max(0.0, t * 0.92))


def render(seed):
    n = len(PALETTE) - 1
    rows = []
    for y in range(H):
        row = bytearray()
        for x in range(W):
            t = field(x, y, seed) * n
            t += (BAYER[y % 8][x % 8] / 64.0 - 0.5) * 1.35
            row += bytes(PALETTE[min(n, max(0, round(t)))])
        rows.append(bytes(row))
    return rows


def upscale(rows):
    out = []
    for row in rows:
        big = bytearray()
        for i in range(0, len(row), 3):
            big += row[i:i + 3] * SCALE
        for _ in range(SCALE):
            out.append(bytes(big))
    return out


def write_png(path, rows):
    def chunk(tag, data):
        c = tag + data
        return struct.pack(">I", len(data)) + c + struct.pack(">I", zlib.crc32(c))

    raw = b"".join(b"\x00" + r for r in rows)
    ihdr = struct.pack(">IIBBBBB", W * SCALE, H * SCALE, 8, 2, 0, 0, 0)
    png = (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr)
           + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b""))
    with open(path, "wb") as f:
        f.write(png)


def main():
    if len(sys.argv) < 2:
        sys.exit("usage: og-dither.py <out.png> [seed]")
    seed = float(sys.argv[2]) if len(sys.argv) > 2 else 1.0
    write_png(sys.argv[1], upscale(render(seed)))
    print(f"wrote {sys.argv[1]} ({W * SCALE}x{H * SCALE}, seed {seed})")


if __name__ == "__main__":
    main()
