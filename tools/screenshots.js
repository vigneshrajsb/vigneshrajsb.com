#!/usr/bin/env node
// Screenshots pages in light and dark at desktop and phone width, and fails
// if any page scrolls sideways or logs a console error or a failed request.
//
// Usage: node tools/screenshots.js [--base http://localhost:4173] [--out /tmp/shots] [path ...]
// Default paths: the homepage, the writing index, 404, and every post.
// Needs Playwright (`npm i -g playwright` locally; preinstalled in cloud sessions)
// and a server: `make serve` in another shell, or pass --base a preview URL.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const opt = (name, dflt) => {
  const i = args.indexOf(name);
  if (i === -1) return dflt;
  const v = args[i + 1];
  args.splice(i, 2);
  return v;
};
const base = opt('--base', 'http://localhost:4173').replace(/\/$/, '');
const out = opt('--out', path.join(require('os').tmpdir(), 'site-shots'));
const root = path.join(__dirname, '..');
const posts = fs
  .readdirSync(path.join(root, 'writing'), { withFileTypes: true })
  .filter((d) => d.isDirectory() && fs.existsSync(path.join(root, 'writing', d.name, 'index.html')))
  .map((d) => `/writing/${d.name}/`);
const pages = args.length ? args : ['/', '/writing/', '/404.html', ...posts];

const viewports = [
  { name: 'desktop', width: 1100, height: 900 },
  { name: 'phone', width: 375, height: 812 },
];

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const problems = [];
  for (const scheme of ['light', 'dark']) {
    for (const vp of viewports) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: scheme,
        deviceScaleFactor: 1,
      });
      for (const p of pages) {
        const page = await ctx.newPage();
        const where = `${p} [${scheme} ${vp.name}]`;
        // Resource failures are judged by requestfailed below (own origin only).
        page.on('console', (m) => {
          if (m.type() === 'error' && !m.text().startsWith('Failed to load resource')) problems.push(`${where} console: ${m.text()}`);
        });
        page.on('requestfailed', (r) => {
          // Analytics and third-party embeds are allowed to fail offline.
          if (r.url().startsWith(base)) problems.push(`${where} failed: ${r.url()}`);
        });
        const res = await page.goto(base + p, { waitUntil: 'networkidle' });
        if (p !== '/404.html' && (!res || res.status() >= 400)) problems.push(`${where} HTTP ${res && res.status()}`);
        // Load lazy images so the full-page shot is honest.
        await page.evaluate(async () => {
          document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager'));
          await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => (i.onload = i.onerror = r)))));
        });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        if (overflow > 1) problems.push(`${where} scrolls sideways by ${overflow}px`);
        const broken = await page.evaluate(() =>
          [...document.images].filter((i) => i.getAttribute('src') && i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src)
        );
        broken.forEach((src) => problems.push(`${where} broken image: ${src}`));
        const slug = p.replace(/^\/|\/$/g, '').replace(/[\/.]/g, '-') || 'home';
        await page.screenshot({ path: path.join(out, `${slug}-${scheme}-${vp.name}.png`), fullPage: true });
        await page.close();
      }
      await ctx.close();
    }
  }
  await browser.close();
  console.log(`screenshots: ${pages.length} pages x 2 themes x 2 widths -> ${out}`);
  if (problems.length) {
    problems.forEach((p) => console.log('  ' + p));
    process.exit(1);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
