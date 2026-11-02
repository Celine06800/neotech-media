// Rend une page HTML animée en vidéo MP4 pour LinkedIn (Neotech Solutions, 1080×1350, portrait 4:5, 30 i/s, sans son).
// Usage : node outils/linkedin/render-video.mjs <page.html> <durée_s> <sortie.mp4>
// La page contient UNE <section class="slide"> animée en CSS (classes de anim.css, délai --d en secondes).
// Le rendu fige toutes les animations et les place image par image : le résultat est net et identique à chaque rendu.
// Si la page expose window.render(t), elle est aussi appelée à chaque image.
import path from 'path';
import { spawn } from 'child_process';
let pw;
try { pw = await import('playwright'); } catch { pw = await import('/opt/node-tools/node_modules/playwright/index.mjs'); }
const [,, page, dureeArg, sortie] = process.argv;
if (!page || !dureeArg || !sortie) { console.error('Usage : node outils/linkedin/render-video.mjs <page.html> <durée_s> <sortie.mp4>'); process.exit(1); }
const fps = 30, duree = parseFloat(dureeArg), n = Math.round(duree * fps);
const b = await pw.chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
await p.goto('file://' + path.resolve(page), { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.evaluate(() => document.getAnimations().forEach((a) => a.pause()));
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-crf', '18', '-preset', 'slow', '-movflags', '+faststart', sortie],
  { stdio: ['pipe', 'inherit', 'inherit'] });
const slide = await p.$('.slide');
for (let i = 0; i < n; i++) {
  await p.evaluate((t) => {
    document.getAnimations().forEach((a) => { a.pause(); a.currentTime = t * 1000; });
    if (typeof window.render === 'function') window.render(t);
  }, i / fps);
  const img = await (slide ?? p).screenshot({ type: 'jpeg', quality: 93 });
  if (!ff.stdin.write(img)) await new Promise((r) => ff.stdin.once('drain', r));
}
ff.stdin.end();
await new Promise((r, j) => ff.on('close', (c) => (c === 0 ? r() : j(new Error('ffmpeg ' + c)))));
await b.close();
console.log(`OK ${sortie} (${n} images, ${duree} s, 1080×1350, sans son)`);
