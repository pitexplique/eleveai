// Fabrique les épisodes de la série d'animation SAPHIR (paysage 1920 × 1080), sur la chaîne du film de Noël (commun.js repris tel quel).
//   node scripts/film-saphir.mjs <partie> controle 3 12 30   → une image par instant + _planche.jpg, dans manim/film-saphir/controle/<partie>
//   node scripts/film-saphir.mjs <partie> film               → le MP4, avec le son
//   node scripts/film-saphir.mjs <partie> mix                → refait seulement le son (l'image muette existe déjà)
//   Les voix d'une partie : node scripts/film-saphir-voix.mjs <partie>. Mode d'emploi : manim/film-noel/BIBLE.md
// Le modèle de Ti Margo est repris de prototypes/ti-margo-3d.html, avec un rendu feutrine.
import { chromium } from 'playwright-core';
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fabriquerSonSaphir } from './film-saphir-son.mjs';

const RACINE = process.cwd();
const TRAVAIL = path.join(RACINE, 'manim/film-saphir');
const SORTIE = path.join(RACINE, 'manim/sorties/saphir');
const IPS = 12;
const PARTIES = {
  episode1: { fichiers: ['../film-noel/commun.js', 'episode1.js'], nom: 'eleveai-saphir-partie-1-episode-1-le-cercle-des-loups', voix: 'episode1' }
};
const [partie, mode, ...reste] = process.argv.slice(2);
const P = PARTIES[partie]; if (!P) throw new Error('Partie inconnue : ' + partie + ' (au choix : ' + Object.keys(PARTIES).join(', ') + ')');
for (const f of P.fichiers) if (!existsSync(path.join(RACINE, 'prototypes/film-saphir', f))) throw new Error('Scène pas encore écrite : prototypes/film-saphir/' + f);
if (P.voix && !existsSync(path.join(TRAVAIL, 'voix', P.voix, 'durees.json'))) throw new Error('Voix pas encore fabriquées : node scripts/film-saphir-voix.mjs ' + P.voix);

/* ---- La page : modèle + matière feutrine + scène ---- */
const proto = readFileSync(path.join(RACINE, 'prototypes/ti-margo-3d.html'), 'utf8');
let modele = proto.slice(proto.indexOf('/* ---------- Rendu'), proto.indexOf('/* ---------- La pose'));
const remplacer = (a, b) => { if (!modele.includes(a)) throw new Error('Modèle changé : ' + a); modele = modele.replace(a, b); };
remplacer('const controls = new OrbitControls(camera,renderer.domElement);', 'const controls = { target:new THREE.Vector3() };');
remplacer('const toon = (c,extra={}) => new THREE.MeshToonMaterial({ color:c, gradientMap:degrade, ...extra });', 'const toon = (c,extra={}) => feutre(c,{f:.8,freq:30,...extra});');
const FEUTRE = `
function feutre(c,{f=.8,freq=30,...reste}={}){
  const m=new THREE.MeshStandardMaterial({color:c,roughness:1,metalness:0,...reste}); m.userData.f=f; m.userData.freq=freq;
  m.onBeforeCompile=s=>{
    s.uniforms.uF={value:m.userData.f}; s.uniforms.uQ={value:m.userData.freq};
    s.vertexShader=s.vertexShader.replace('#include <common>','#include <common>\\nvarying vec3 vOP;').replace('#include <begin_vertex>','#include <begin_vertex>\\nvOP=position;');
    s.fragmentShader=s.fragmentShader.replace('#include <common>',\`#include <common>
      varying vec3 vOP; uniform float uF,uQ;
      float h3(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
      float b3(vec3 p){vec3 i=floor(p),q=fract(p);q=q*q*(3.-2.*q);
        return mix(mix(mix(h3(i),h3(i+vec3(1,0,0)),q.x),mix(h3(i+vec3(0,1,0)),h3(i+vec3(1,1,0)),q.x),q.y),
                   mix(mix(h3(i+vec3(0,0,1)),h3(i+vec3(1,0,1)),q.x),mix(h3(i+vec3(0,1,1)),h3(i+vec3(1,1,1)),q.x),q.y),q.z);}
      float fibre(vec3 p){return .55*b3(p)+.3*b3(p*2.3+7.)+.15*b3(p*5.1+3.);}\`)
    .replace('#include <color_fragment>','#include <color_fragment>\\ndiffuseColor.rgb*=1.+uF*(fibre(vOP*uQ)-.5)*.5;')
    .replace('#include <normal_fragment_maps>',\`#include <normal_fragment_maps>
      normal=normalize(normal+uF*.5*(vec3(fibre(vOP*uQ*1.7),fibre(vOP*uQ*1.7+11.),fibre(vOP*uQ*1.7+23.))-.5));\`);
  };
  m.customProgramCacheKey=()=> 'feutre';
  return m;
}
`;
const DOSSIER_VOIX = P.voix ? path.join(TRAVAIL, 'voix', P.voix) : null;
const DUREES = P.voix ? readFileSync(path.join(DOSSIER_VOIX, 'durees.json'), 'utf8') : '{}';
const scene = P.fichiers.map((f) => readFileSync(path.join(RACINE, 'prototypes/film-saphir', f), 'utf8')).join('\n');
const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>html,body{margin:0;background:#000;overflow:hidden}canvas{display:block}
#voile{position:fixed;inset:0;background:#000;opacity:1;z-index:5}</style>
<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"}}</script>
</head><body><div id="voile"></div><script type="module">
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
const DUREES = ${DUREES};
${FEUTRE}
${modele}
${scene}
</script></body></html>`;
mkdirSync(TRAVAIL, { recursive: true }); mkdirSync(SORTIE, { recursive: true });
const pagePath = path.join(TRAVAIL, `_page-${partie}.html`);
writeFileSync(pagePath, html);

const nav = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-webgl'] });
const page = await nav.newPage({ viewport: { width: 1920, height: 1080 } });
page.on('pageerror', (e) => console.error('ERREUR PAGE', e.message));
page.on('console', (m) => { if (m.type() === 'error') console.error('CONSOLE', m.text()); });
await page.goto('file:///' + pagePath.replace(/\\/g, '/'));
await page.waitForFunction(() => window.film, null, { timeout: 60000 });

if (mode === 'controle') {
  const dossier = path.join(TRAVAIL, 'controle', partie);
  mkdirSync(dossier, { recursive: true });
  const infos = await page.evaluate(() => ({ fin: window.film.FIN, clips: window.film.clips }));
  console.log(JSON.stringify(infos));
  for (const t of reste) {
    await page.evaluate((T) => window.film.image(T), Number(t));
    await page.screenshot({ path: path.join(dossier, `t${Number(t).toFixed(1).padStart(6, '0')}.jpg`), type: 'jpeg', quality: 80 });
  }
  if (reste.length > 1) {
    const noms = reste.map((t) => path.join(dossier, `t${Number(t).toFixed(1).padStart(6, '0')}.jpg`)), c = 3, l = Math.ceil(noms.length / c);
    const f = noms.map((_, i) => `[${i}:v]scale=640:360[v${i}];`).join('') + noms.map((_, i) => `[v${i}]`).join('') + `xstack=inputs=${noms.length}:grid=${c}x${l}:fill=black[o]`;
    spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...noms.flatMap((n) => ['-i', n]), '-filter_complex', f, '-map', '[o]', '-frames:v', '1', '-update', '1', '-q:v', '3', path.join(dossier, '_planche.jpg')], { stdio: 'inherit' });
  }
  console.log('Contrôle écrit dans', dossier);
} else {
  const { FIN, clips, son } = await page.evaluate(() => ({ FIN: window.film.FIN, clips: window.film.clips || [], son: window.film.son }));
  const muet = path.join(TRAVAIL, `_muet-${partie}.mp4`);
  if (mode !== 'mix') {
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(IPS), '-c:v', 'mjpeg', '-i', '-',
      '-r', '24', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', muet], { stdio: ['pipe', 'inherit', 'inherit'] });
    const n = Math.round(FIN * IPS), debut = Date.now();
    for (let i = 0; i < n; i++) {
      await page.evaluate((T) => window.film.image(T), i / IPS);
      const img = await page.screenshot({ type: 'jpeg', quality: 95 });
      if (!ff.stdin.write(img)) await new Promise((r) => ff.stdin.once('drain', r));
      if (i % 240 === 0) console.log(`${i}/${n} images, ${Math.round((Date.now() - debut) / 1000)} s`);
    }
    ff.stdin.end(); await new Promise((r) => ff.on('close', r));
  }

  const fond = path.join(TRAVAIL, `_son-${partie}.wav`);
  const durees = JSON.parse(DUREES);
  fabriquerSonSaphir(fond, FIN, son, clips.map(([id, t]) => [t, durees[id] ?? 2]));
  const entrees = ['-i', muet, '-i', fond], filtres = ['[1:a]aresample=44100,volume=1[f]'], noms = ['[f]'];
  clips.forEach(([id, t], i) => {
    const w = path.join(DOSSIER_VOIX, id + '.wav'); if (!existsSync(w)) throw new Error(w);
    /* les voix sortent très bas (crête vers -14 dB) : on amène chaque réplique à -3 dB de crête */
    const crete = Number((spawnSync('ffmpeg', ['-hide_banner', '-i', w, '-af', 'volumedetect', '-f', 'null', '-'], { encoding: 'utf8' }).stderr.match(/max_volume: (-?[\d.]+) dB/) || [0, -3])[1]);
    entrees.push('-i', w); filtres.push(`[${i + 2}:a]aresample=44100,aformat=channel_layouts=stereo,volume=${(-3 - crete).toFixed(1)}dB,adelay=${Math.round(t * 1000)}:all=1[v${i}]`); noms.push(`[v${i}]`);
  });
  filtres.push(`${noms.join('')}amix=inputs=${noms.length}:normalize=0:duration=longest,atrim=0:${FIN},alimiter=limit=0.95[a]`);
  const finale = path.join(SORTIE, P.nom + '.mp4');
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...entrees, '-filter_complex', filtres.join(';'), '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', finale], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('Mélange du son échoué');
  console.log('FINI', finale);
}
await nav.close();
