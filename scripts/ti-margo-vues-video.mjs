// Fabrique le short « Mes vues doublent » de Ti Margo 3D.
//   node scripts/ti-margo-vues-video.mjs controle 1 12 30   → une image PNG par instant (s), dans le dossier donné par CONTROLE
//   node scripts/ti-margo-vues-video.mjs film               → le MP4 complet avec la voix
import { chromium } from 'playwright-core';
import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const RACINE = process.cwd();
const PAGE = 'file:///' + path.join(RACINE, 'prototypes/ti-margo-vues.html').replace(/\\/g, '/') + '?video=vues';
const SONS = path.join(RACINE, 'public/sons/ti-margo-3d-vues-video-short');
const SORTIE = path.join(RACINE, 'manim/sorties/ti-margo/vues');
const NOM = 'eleveai-ti-margo-3d-mes-vues-doublent-short';
const IPS = 30;
const [mode, ...reste] = process.argv.slice(2);

const nav = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-webgl'] });
const page = await nav.newPage({ viewport: { width: 1080, height: 1920 } });
page.on('pageerror', (e) => console.error('ERREUR PAGE', e.message));
await page.goto(PAGE);
await page.waitForFunction(() => window.tiMargo && window.tiMargoFilm, null, { timeout: 60000 });

if (mode === 'controle') {
  const dossier = process.env.CONTROLE;
  mkdirSync(dossier, { recursive: true });
  for (const t of reste) {
    await page.evaluate((T) => window.tiMargo.aller(T), Number(t));
    await page.screenshot({ path: path.join(dossier, `t${String(t).padStart(5, '0')}.png`) });
  }
} else if (mode === 'miniature') {
  // PNG vertical 1080×1920 : la miniature à poser sur le short (onglet Shorts)
  mkdirSync(SORTIE, { recursive: true });
  await page.evaluate(() => {
    window.tiMargo.aller(4);
    document.getElementById('titre').style.display = 'none';
    document.getElementById('tel').style.display = 'none';
    const l = document.getElementById('legende');
    l.style.top = '60px'; l.style.display = 'block'; l.style.fontSize = '100px'; l.style.lineHeight = '1.08';
    l.innerHTML = '1 VUE<br>→ 1 MILLION<div style="color:#e8590c;font-size:92px;margin-top:14px">EN COMBIEN DE JOURS ?</div>';
    const e = document.getElementById('echelle');
    e.style.top = '640px';
    const m = document.createElement('div'); m.className = 'cv'; m.textContent = "Film d'animation 3D";
    m.style.cssText = 'left:190px;right:190px;top:830px;text-align:center;font-size:58px;background:#17452a;color:#fff;border-radius:999px;padding:10px 0;z-index:6;';
    document.body.append(m);
  });
  await page.screenshot({ path: path.join(SORTIE, NOM + '-miniature.png') });
} else {
  mkdirSync(SORTIE, { recursive: true });
  const { A, FIN } = await page.evaluate(() => ({ A: window.tiMargoClips, FIN: window.tiMargoFin }));
  const muet = path.join(SORTIE, '_muet.mp4');
  const ff = mode === 'mix' ? null : spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(IPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', muet], { stdio: ['pipe', 'inherit', 'inherit'] });
  const n = mode === 'mix' ? 0 : Math.round(FIN * IPS), debut = Date.now();
  for (let i = 0; i < n; i++) {
    await page.evaluate((T) => window.tiMargo.image(T), i / IPS);
    const img = await page.screenshot({ type: 'jpeg', quality: 96 });
    if (!ff.stdin.write(img)) await new Promise((r) => ff.stdin.once('drain', r));
    if (i % 150 === 0) console.log(`${i}/${n} images, ${Math.round((Date.now() - debut) / 1000)} s`);
  }
  if (ff) { ff.stdin.end(); await new Promise((r) => ff.on('close', r)); }

  // La voix, chaque clip à son instant, + un petit « tic » à chaque compteur et pendant le compte à rebours
  const TICS = await page.evaluate(() => window.tiMargoTics);
  const clips = [['00-accroche', A.acc], ['01-situation', A.sit], ['01q-question', A.q], ['01r-reponse', A.r], ['02-piege', A.pie], ['03-premiers', A.pr], ['04-classe', A.cl], ['05-college', A.co], ['06-stade', A.st], ['07-million', A.mi], ['08-en-vrai', A.v], ['09-question', A.c], ['10-abonne', A.f]];
  const entrees = [], filtres = [];
  clips.forEach(([c, t], i) => { const w = path.join(SONS, c + '.wav'); if (!existsSync(w)) throw new Error(w); entrees.push('-i', w); filtres.push(`[${i + 1}:a]aresample=44100,aformat=channel_layouts=mono,adelay=${Math.round(t * 1000)}:all=1[v${i}]`); });
  TICS.forEach(({ t, f }, k) => {
    entrees.push('-f', 'lavfi', '-t', '0.16', '-i', `sine=frequency=${f}:sample_rate=44100`);
    const i = clips.length + k;
    filtres.push(`[${i + 1}:a]afade=t=out:st=0.03:d=0.13,volume=0.3,adelay=${Math.round(t * 1000)}:all=1[v${i}]`);
  });
  const nb = clips.length + TICS.length;
  filtres.push(`${Array.from({ length: nb }, (_, i) => `[v${i}]`).join('')}amix=inputs=${nb}:normalize=0:duration=longest,apad=whole_dur=${FIN},atrim=0:${FIN},alimiter=limit=0.95[a]`);
  const finale = path.join(SORTIE, NOM + '.mp4');
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', muet, ...entrees, '-filter_complex', filtres.join(';'), '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '44100', '-t', String(FIN), '-movflags', '+faststart', finale], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('mélange audio échoué');
  console.log('FINI', finale);
}
await nav.close();
