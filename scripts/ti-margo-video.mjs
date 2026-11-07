// Fabrique les vidéos de Ti Margo 3D (prototypes/ti-margo-3d.html).
// Sans nom de film, c'est le short « Le défi du mur », comme avant.
//   node scripts/ti-margo-video.mjs controle 1 12 30   → une image PNG par instant (s), dans le dossier donné par CONTROLE
//   node scripts/ti-margo-video.mjs film               → le MP4 complet avec la voix
//   node scripts/ti-margo-video.mjs maths controle 1 8 → idem pour l'encouragement avant un test de maths (paysage)
//   node scripts/ti-margo-video.mjs maths film
//   node scripts/ti-margo-video.mjs cahier controle 2 12 → « Ton cahier t'attend » (paysage)
//   node scripts/ti-margo-video.mjs cahier miniature
//   node scripts/ti-margo-video.mjs cahier film
import { chromium } from 'playwright-core';
import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';

const RACINE = process.cwd();
const FILMS = {
  mur: {
    largeur: 1080, hauteur: 1920, sons: 'ti-margo-3d-defi-mur-short', sortie: 'defi-mur', nom: 'eleveai-ti-margo-3d-defi-du-mur-short',
    // Chaque clip à son instant
    pistes: (A) => [['00-accroche', A.acc], ['01-situation', A.sit], ['01q-question', A.q], ['02-piege', A.pie], ['03-jours', A.j], ['04-matin', A.m], ['01r-reponse', A.r], ['05-question', A.c], ['06-abonne', A.f]],
    // Un petit « tic » par jour pendant l'accéléré
    tics: (A) => Array.from({ length: 7 }, (_, k) => [520 + k * 70, A.tl + k * 0.643]),
  },
  maths: {
    largeur: 1920, hauteur: 1080, sons: 'ti-margo-3d-encouragement-maths', sortie: 'encouragement-test-maths', nom: 'eleveai-ti-margo-3d-encouragement-test-maths',
    // Le 2e clip est coupé dans son silence (à 1,4 s), pour laisser le temps d'une vraie respiration
    pistes: (A) => [['01-salut', A.s], ['02-respire', A.r, 0, 1.4], ['02-respire', A.rb, 1.4], ['03-consigne', A.c], ['04-allez', A.a]],
    tics: () => [],
    supprimerMuet: true,
  },
  cahier: {
    largeur: 1920, hauteur: 1080, sons: 'ti-margo-3d-cahier-ecriture', sortie: 'cahier-ecriture', nom: 'eleveai-ti-margo-3d-cahier-ecriture',
    pistes: (A) => [['01-montagne', A.c1], ['02-secret', A.c2], ['03-grandes', A.c3], ['04-rapetissent', A.c4], ['05-compter', A.c5], ['06-age', A.c6], ['07-cahier', A.c7], ['08-allez', A.c8]],
    tics: () => [],
    supprimerMuet: true,
  },
};

const args = process.argv.slice(2);
const cle = FILMS[args[0]] ? args.shift() : 'mur';
const F = FILMS[cle];
const [mode, ...reste] = args;
const PAGE = 'file:///' + path.join(RACINE, 'prototypes/ti-margo-3d.html').replace(/\\/g, '/') + '?video=' + cle;
const SONS = path.join(RACINE, 'public/sons', F.sons);
const SORTIE = path.join(RACINE, 'manim/sorties/ti-margo', F.sortie);
const NOM = F.nom;
const IPS = 30;

const nav = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-webgl'] });
const page = await nav.newPage({ viewport: { width: F.largeur, height: F.hauteur } });
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
} else if (mode === 'miniature' && cle === 'maths') {
  // PNG paysage 1920×1080 : Ti Margo, pouce levé, et la mention obligatoire des films 3D
  mkdirSync(SORTIE, { recursive: true });
  await page.evaluate(() => {
    window.tiMargo.aller(22.9);
    const c = document.getElementById('cadre');
    c.style.fontSize = '124px'; c.style.lineHeight = '1.12'; c.style.textAlign = 'center'; c.style.top = '50%'; c.style.whiteSpace = 'nowrap';
    c.innerHTML = 'Avant ton<br><span style="color:#d9480f">test de maths</span>';
    const m = document.createElement('div');
    m.textContent = 'Film d’animation 3D';
    m.style.cssText = 'position:fixed;z-index:9;left:44px;width:990px;text-align:center;bottom:60px;white-space:nowrap;background:#17452a;color:#fff;font-weight:800;font-size:64px;line-height:1;padding:24px 0;border-radius:999px;';
    document.body.append(m);
  });
  await page.screenshot({ path: path.join(SORTIE, NOM + '-miniature.png') });
} else if (mode === 'miniature' && cle === 'cahier') {
  // PNG paysage 1920×1080 : le titre, les deux vraies couvertures, Ti Margo pouce levé, et la mention obligatoire
  mkdirSync(SORTIE, { recursive: true });
  await page.evaluate(() => {
    window.tiMargo.aller(50.6);
    for (const id of ['site', 'gratuit', 'medaille', 'diplome']) document.getElementById(id).style.display = 'none';
    document.getElementById('feuille2d').style.display = 'none';
    const c = document.getElementById('cadre');
    c.style.cssText += 'font-size:118px;line-height:1.1;text-align:center;top:176px;';
    c.innerHTML = 'Ton <span style="color:#d9480f">cahier</span><br>t’attend';
    const place = (id, gauche, angle) => {
      const e = document.getElementById(id);
      e.style.cssText += `display:block;visibility:visible;top:356px;height:520px;width:368px;left:${gauche}px;transform:rotate(${angle}deg);`;
    };
    place('couvL', 110, -3); place('couvN', 560, 3);
    const m = document.createElement('div');
    m.textContent = 'Film d’animation 3D';
    m.style.cssText = 'position:fixed;z-index:9;left:38px;width:1016px;text-align:center;bottom:44px;white-space:nowrap;background:#17452a;color:#fff;font-weight:800;font-size:64px;line-height:1;padding:24px 0;border-radius:999px;';
    document.body.append(m);
  });
  await page.screenshot({ path: path.join(SORTIE, NOM + '-miniature.png') });
} else if (mode === 'miniature') {
  // PNG vertical 1080×1920 : la miniature à poser sur le short (onglet Shorts)
  mkdirSync(SORTIE, { recursive: true });
  await page.evaluate(() => {
    window.tiMargo.aller(7);
    document.getElementById('titre').style.display = 'none';
    const l = document.getElementById('legende');
    l.style.top = '60px'; l.style.display = 'block'; l.style.fontSize = '92px'; l.style.lineHeight = '1.08';
    l.innerHTML = '12 JOURS<br>pour grimper<br>ce mur ?<div style="color:#e8590c;font-size:128px;margin-top:14px">TU PARIES ?</div>';
    const e = document.getElementById('echelle');
    e.style.top = '640px';
    // Règle de Frédéric (05/11) : toute miniature Ti Margo 3D porte cette mention
    const m = document.createElement('div');
    m.textContent = 'Film d’animation 3D';
    m.style.cssText = 'position:fixed;z-index:9;left:50%;bottom:36px;transform:translateX(-50%);white-space:nowrap;background:#17452a;color:#fff;font-weight:800;font-size:64px;line-height:1;padding:20px 44px;border-radius:999px;';
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

  // La voix, chaque clip à son instant (éventuellement coupé), + les tics
  const clips = F.pistes(A), tics = F.tics(A);
  const entrees = [], filtres = [];
  clips.forEach(([c, t, de, a], i) => {
    const w = path.join(SONS, c + '.wav'); if (!existsSync(w)) throw new Error(w);
    entrees.push('-i', w);
    const coupe = de === undefined ? '' : `atrim=start=${de}${a === undefined ? '' : `:end=${a}`},asetpts=PTS-STARTPTS,`;
    filtres.push(`[${i + 1}:a]${coupe}aresample=44100,aformat=channel_layouts=mono,adelay=${Math.round(t * 1000)}:all=1[v${i}]`);
  });
  tics.forEach(([f, t], k) => {
    entrees.push('-f', 'lavfi', '-t', '0.16', '-i', `sine=frequency=${f}:sample_rate=44100`);
    const i = clips.length + k;
    filtres.push(`[${i + 1}:a]afade=t=out:st=0.03:d=0.13,volume=0.32,adelay=${Math.round(t * 1000)}:all=1[v${i}]`);
  });
  const nb = clips.length + tics.length;
  // whole_dur : sans borne, apad + atrim ont déjà fait tourner ffmpeg à vide pendant des heures
  filtres.push(`${Array.from({ length: nb }, (_, i) => `[v${i}]`).join('')}amix=inputs=${nb}:normalize=0:duration=longest,apad=whole_dur=${FIN},atrim=0:${FIN},alimiter=limit=0.95[a]`);
  const finale = path.join(SORTIE, NOM + '.mp4');
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', muet, ...entrees, '-filter_complex', filtres.join(';'), '-map', '0:v', '-map', '[a]', '-t', String(FIN), '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '44100', '-movflags', '+faststart', finale], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('mélange audio échoué');
  if (F.supprimerMuet) rmSync(muet, { force: true });
  console.log('FINI', finale);
}
await nav.close();
