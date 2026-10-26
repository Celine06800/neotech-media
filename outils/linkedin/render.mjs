// Rend les visuels LinkedIn de Neotech Solutions : chaque élément .slide (1080×1350) d'une page HTML devient un PNG.
// Usage : node outils/linkedin/render.mjs <page.html> <dossier-sortie> <prefixe>
//   → <dossier-sortie>/<prefixe>.png (une diapositive) ou <prefixe>-1.png, -2.png… (carrousel)
import path from 'path';
let pw;
try { pw = await import('playwright'); } catch { pw = await import('/opt/node-tools/node_modules/playwright/index.mjs'); }
const [,, page, out = '.', prefix = 'visuel'] = process.argv;
const b = await pw.chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
await p.goto('file://' + path.resolve(page));
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(200);
const slides = await p.$$('.slide');
for (let i = 0; i < slides.length; i++) {
  const f = path.join(out, slides.length === 1 ? `${prefix}.png` : `${prefix}-${i + 1}.png`);
  await slides[i].screenshot({ path: f });
  console.log('ok', f);
}
await b.close();
