/**
 * Génère les images PNG (favicon, apple-touch-icon, image de partage og-image.png)
 * à partir de public/favicon.svg et d'un gabarit HTML.
 * Usage : node scripts/generate-images.mjs   (nécessite Playwright + Chromium installés)
 * À relancer après un changement de logo, de couleurs ou de slogan.
 */
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const favicon = readFileSync(`${root}public/favicon.svg`, 'utf8');
const logo = readFileSync(`${root}public/logo-light.svg`, 'utf8');

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage();

for (const [file, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180]]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<style>*{margin:0}svg{width:${size}px;height:${size}px;display:block}</style>${favicon}`);
  await page.screenshot({ path: `${root}public/${file}`, omitBackground: true });
}

await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Poppins:wght@600;700&display=block" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#0e3d21;color:#fff;font-family:Inter,sans-serif;position:relative;overflow:hidden;padding:80px}
  .logo svg{height:76px;width:auto}
  h1{font-family:Poppins,sans-serif;font-size:76px;font-weight:700;margin-top:70px;line-height:1}
  p{font-family:Poppins,sans-serif;font-size:34px;color:#f6c27a;margin-top:22px;font-weight:600}
  small{display:block;margin-top:30px;font-size:24px;color:rgba(255,255,255,.75)}
  .steps{position:absolute;right:0;bottom:0;display:flex;align-items:flex-end;gap:14px;padding-right:70px}
  .steps i{display:block;width:70px;border-radius:12px 12px 0 0}
</style></head><body>
  <div class="logo">${logo}</div>
  <h1>Étape après étape</h1>
  <p>Apprendre · Développer · Progresser</p>
  <small>Organisation à but non lucratif · Kinshasa, RDC</small>
  <div class="steps"><i style="height:120px;background:#f6c27a"></i><i style="height:200px;background:#e59a3b"></i><i style="height:290px;background:#c2410c"></i><i style="height:390px;background:#1f7a46"></i></div>
</body></html>`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: `${root}public/og-image.png` });

await browser.close();
console.log('Images générées dans public/');
