// Fabrique un short dessin animé Ti Margo, pour toutes les séries.
//   node scripts/ti-margo-short.mjs <série> <épisode> controle 1 12 30  → une image PNG par instant (s), dans le dossier CONTROLE
//   node scripts/ti-margo-short.mjs <série> <épisode> film              → le MP4 complet avec la voix
//   node scripts/ti-margo-short.mjs <série> <épisode> mix               → refait seulement le son
//   node scripts/ti-margo-short.mjs <série> <épisode> miniature         → le PNG 1080×1920 (1920×1080 en paysage), si le film définit window.tiMargoMiniature
// La série se décrit dans prototypes/ti-margo/films/<série>.json. Mode d'emploi : prototypes/ti-margo/LISEZ-MOI.md
import { chromium } from 'playwright-core';
import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [serie, ep, mode, ...reste] = process.argv.slice(2);
if (!serie || !ep || !mode) throw new Error('usage : node scripts/ti-margo-short.mjs <série> <épisode> <controle|film|mix|miniature> [instants]');
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG = JSON.parse(readFileSync(path.join(RACINE, 'prototypes/ti-margo/films', serie + '.json'), 'utf8'));
const num = CONFIG.episodes[ep];
if (!num) throw new Error('épisode inconnu : ' + ep);
/* "format": "paysage" dans le JSON : 1920×1080 (sinon le short vertical 1080×1920, inchangé) */
const PAYSAGE = CONFIG.format === 'paysage';
const remplir = (s) => s.replaceAll('{ep}', ep).replaceAll('{num}', num);
const PAGE = 'file:///' + path.join(RACINE, 'prototypes/ti-margo/page.html').replace(/\\/g, '/') + `?serie=${serie}&video=${ep}` + (PAYSAGE ? '&format=paysage' : '');
const SONS = path.join(RACINE, remplir(CONFIG.sons));
const SORTIE = path.join(RACINE, remplir(CONFIG.sortie));
/* BD=1 : brouillon basse définition (moitié de la taille, encodage rapide), sortie <nom>-bd.mp4 */
const BD = process.env.BD === '1';
const NOM = remplir(CONFIG.nom) + (BD ? '-bd' : '');
const IPS = 30;

const nav = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-webgl', '--allow-file-access-from-files'] });
const page = await nav.newPage({ viewport: PAYSAGE ? { width: 1920, height: 1080 } : { width: 1080, height: 1920 }, deviceScaleFactor: BD ? 0.5 : 1 });
page.on('pageerror', (e) => console.error('ERREUR PAGE', e.message));
await page.goto(PAGE);
/* Un film qui charge des images met window.tiMargoPret à false, puis à true quand elles sont prêtes */
await page.waitForFunction(() => window.tiMargo && window.tiMargoFilm && window.tiMargoPret !== false, null, { timeout: 120000 });

if (mode === 'controle') {
  const dossier = process.env.CONTROLE;
  if (!dossier) throw new Error('indique le dossier des images dans la variable CONTROLE');
  mkdirSync(dossier, { recursive: true });
  for (const t of reste) {
    await page.evaluate((T) => window.tiMargo.aller(T), Number(t));
    await page.screenshot({ path: path.join(dossier, `t${String(t).padStart(6, '0')}.png`) });
  }
} else if (mode === 'miniature') {
  mkdirSync(SORTIE, { recursive: true });
  if (!(await page.evaluate(() => typeof window.tiMargoMiniature === 'function'))) throw new Error('ce film ne définit pas window.tiMargoMiniature');
  await page.evaluate(() => window.tiMargoMiniature());
  await page.screenshot({ path: path.join(SORTIE, NOM + '-miniature.png') });
} else if (mode === 'film' || mode === 'mix') {
  mkdirSync(SORTIE, { recursive: true });
  const { CLIPS, FIN, TICS } = await page.evaluate(() => ({ CLIPS: window.tiMargoClips, FIN: window.tiMargoFin, TICS: window.tiMargoTics }));
  const muet = path.join(SORTIE, BD ? '_muet-bd.mp4' : '_muet.mp4');
  const ff = mode === 'mix' ? null : spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(IPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', BD ? 'veryfast' : 'medium', '-crf', BD ? '28' : '18', '-pix_fmt', 'yuv420p', muet], { stdio: ['pipe', 'inherit', 'inherit'] });
  const n = mode === 'mix' ? 0 : Math.round(FIN * IPS), debut = Date.now();
  for (let i = 0; i < n; i++) {
    await page.evaluate((T) => window.tiMargo.image(T), i / IPS);
    const img = await page.screenshot({ type: 'jpeg', quality: 96 });
    if (!ff.stdin.write(img)) await new Promise((r) => ff.stdin.once('drain', r));
    if (i % 300 === 0) console.log(`${i}/${n} images, ${Math.round((Date.now() - debut) / 1000)} s`);
  }
  if (ff) { ff.stdin.end(); await new Promise((r) => ff.on('close', r)); console.log(`images finies en ${Math.round((Date.now() - debut) / 1000)} s`); }

  const entrees = [], filtres = [];
  CLIPS.forEach(([c, t], i) => { const w = path.join(SONS, c + '.wav'); if (!existsSync(w)) throw new Error('voix manquante : ' + w); entrees.push('-i', w); filtres.push(`[${i + 1}:a]aresample=44100,aformat=channel_layouts=mono,adelay=${Math.round(t * 1000)}:all=1[v${i}]`); });
  TICS.forEach(({ t, f }, k) => {
    entrees.push('-f', 'lavfi', '-t', '0.16', '-i', `sine=frequency=${f}:sample_rate=44100`);
    const i = CLIPS.length + k;
    filtres.push(`[${i + 1}:a]afade=t=out:st=0.03:d=0.13,volume=0.3,adelay=${Math.round(t * 1000)}:all=1[v${i}]`);
  });
  const nb = CLIPS.length + TICS.length;
  filtres.push(`${Array.from({ length: nb }, (_, i) => `[v${i}]`).join('')}amix=inputs=${nb}:normalize=0:duration=longest,apad=whole_dur=${FIN},atrim=0:${FIN},alimiter=limit=0.95[a]`);
  const finale = path.join(SORTIE, NOM + '.mp4');
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', muet, ...entrees, '-filter_complex', filtres.join(';'), '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '44100', '-t', String(FIN), '-movflags', '+faststart', finale], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('mélange audio échoué');
  console.log('FINI', finale);
} else {
  throw new Error('mode inconnu : ' + mode);
}
await nav.close();
