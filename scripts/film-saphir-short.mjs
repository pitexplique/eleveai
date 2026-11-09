// Fabrique les SHORTS verticaux (1080 × 1920) de la série d'animation SAPHIR.
// L'image est refaite en vertical, avec des cadrages pensés pour le 9:16 : la scène de l'épisode est reprise telle quelle
// (prototypes/film-saphir/episodeN.js, non modifié), et prototypes/film-saphir/short-episodeN.js y ajoute ses propres plans
// et la liste des extraits (en temps de l'épisode). Le son et les voix sont découpés dans le MP4 de l'épisode aux mêmes instants.
//   node scripts/film-saphir-short.mjs <partie> controle 0 5 10 ...  → une image par instant DU SHORT + _planche.jpg, dans manim/film-saphir/short/controle/<partie>
//   node scripts/film-saphir-short.mjs <partie> film                 → le MP4 vertical, avec le son
//   node scripts/film-saphir-short.mjs <partie> mix                  → refait seulement le son (l'image muette existe déjà)
// Rien n'est publié : ni YouTube, ni R2, ni site (Frédéric, 09/11 : « je veux pas publier saphir »).
import { chromium } from 'playwright-core';
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const RACINE = process.cwd();
const TRAVAIL = path.join(RACINE, 'manim/film-saphir');
const SHORT = path.join(TRAVAIL, 'short');
const SORTIE = path.join(RACINE, 'manim/sorties/saphir');
const IPS = 12;
const PARTIES = {
  episode1: { fichiers: ['../film-noel/commun.js', 'episode1.js'], short: 'short-episode1.js', voix: 'episode1',
    source: 'eleveai-saphir-partie-1-episode-1-le-cercle-des-loups', nom: 'eleveai-saphir-short-episode-1-le-cercle-des-loups' },
  episode2: { fichiers: ['../film-noel/commun.js', 'episode2.js'], short: 'short-episode2.js', voix: 'episode2',
    source: 'eleveai-saphir-partie-1-episode-2-le-milieu-du-cercle', nom: 'eleveai-saphir-short-episode-2-le-milieu-du-cercle' }
};
const [partie, mode, ...reste] = process.argv.slice(2);
const P = PARTIES[partie]; if (!P) throw new Error('Partie inconnue : ' + partie + ' (au choix : ' + Object.keys(PARTIES).join(', ') + ')');
for (const f of [...P.fichiers, P.short]) if (!existsSync(path.join(RACINE, 'prototypes/film-saphir', f))) throw new Error('Fichier absent : prototypes/film-saphir/' + f);
const SOURCE = path.join(SORTIE, P.source + '.mp4');
if (mode !== 'controle' && !existsSync(SOURCE)) throw new Error("L'épisode n'est pas encore rendu : " + SOURCE);

/* ---- La page : la même que scripts/film-saphir.mjs (modèle + matière feutrine + scène), plus les plans verticaux ---- */
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
const dureesVoix = path.join(TRAVAIL, 'voix', P.voix, 'durees.json');
const DUREES = existsSync(dureesVoix) ? readFileSync(dureesVoix, 'utf8') : '{}';
/* La scène de l'épisode, lue sans être modifiée sur le disque : la caméra passe par window.cameraShort,
   et les plans verticaux sont collés dans le bloc de la scène (ils voient ses noms), juste avant sa première image. */
let scene = P.fichiers.map((f) => readFileSync(path.join(RACINE, 'prototypes/film-saphir', f), 'utf8')).join('\n');
const appel = scene.match(/filmerS?\(T, ?(\w+)\);/);
if (!appel) throw new Error("Appel de la caméra introuvable dans la scène (filmerS(T, x) ou filmer(...))");
scene = scene.replace(appel[0], `(window.cameraShort ? window.cameraShort(T, ${appel[1]}) : ${appel[0].replace(/;$/, '')});`);
const derniere = scene.lastIndexOf('window.film.image(0);');
if (derniere < 0) throw new Error('Fin du bloc de la scène introuvable (window.film.image(0);)');
const plans = readFileSync(path.join(RACINE, 'prototypes/film-saphir', P.short), 'utf8');
scene = scene.slice(0, derniere) + '\n' + plans + '\n' + scene.slice(derniere);
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
mkdirSync(SHORT, { recursive: true }); mkdirSync(SORTIE, { recursive: true });
const pagePath = path.join(SHORT, `_page-${partie}.html`);
writeFileSync(pagePath, html);

const nav = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-webgl'] });
const page = await nav.newPage({ viewport: { width: 1080, height: 1920 } });
page.on('pageerror', (e) => console.error('ERREUR PAGE', e.message));
page.on('console', (m) => { if (m.type() === 'error') console.error('CONSOLE', m.text()); });
await page.goto('file:///' + pagePath.replace(/\\/g, '/'));
await page.waitForFunction(() => window.film && window.short, null, { timeout: 60000 });

/* Les extraits, calés sur la grille des images (1/12 s) : [début dans l'épisode, nombre d'images] */
const { segments, FIN } = await page.evaluate(() => ({ segments: window.short.segments, FIN: window.film.FIN }));
const extraits = segments.map(([a, b]) => { const ta = Math.round(a * IPS) / IPS; return { ta, n: Math.floor(Math.min(b, FIN) * IPS + 1e-6) - Math.round(a * IPS) }; });
const debuts = []; extraits.reduce((s, e) => { debuts.push(s); return s + e.n; }, 0);
const NB = extraits.reduce((s, e) => s + e.n, 0), DUREE = NB / IPS;
console.log(`${extraits.length} extraits, ${DUREE.toFixed(2)} s`, JSON.stringify(extraits.map((e, i) => [e.ta.toFixed(2), (e.n / IPS).toFixed(2), 'short ' + (debuts[i] / IPS).toFixed(1)])));
/* image k du short → instant de l'épisode */
const instant = (k) => { let i = extraits.length - 1; while (i > 0 && debuts[i] > k) i--; return extraits[i].ta + (Math.min(k, debuts[i] + extraits[i].n - 1) - debuts[i]) / IPS; };

if (mode === 'controle') {
  const dossier = path.join(SHORT, 'controle', partie);
  mkdirSync(dossier, { recursive: true });
  const noms = [];
  for (const t of reste) {
    const k = Math.min(NB - 1, Math.round(Number(t) * IPS)), T = instant(k);
    await page.evaluate((T) => window.film.image(T), T);
    const n = path.join(dossier, `s${Number(t).toFixed(1).padStart(5, '0')}.jpg`); noms.push(n);
    await page.screenshot({ path: n, type: 'jpeg', quality: 80 });
    console.log(`short ${Number(t).toFixed(1)} s → épisode ${T.toFixed(2)} s`);
  }
  if (noms.length > 1) {
    /* la grille est posée image par image : elle n'a pas besoin d'être pleine */
    const c = Math.min(6, noms.length), place = noms.map((_, i) => `${(i % c) * 270}_${Math.floor(i / c) * 480}`).join('|');
    const f = noms.map((_, i) => `[${i}:v]scale=270:480[v${i}];`).join('') + noms.map((_, i) => `[v${i}]`).join('') + `xstack=inputs=${noms.length}:layout=${place}:fill=black[o]`;
    spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...noms.flatMap((n) => ['-i', n]), '-filter_complex', f, '-map', '[o]', '-frames:v', '1', '-update', '1', '-q:v', '3', path.join(dossier, '_planche.jpg')], { stdio: 'inherit' });
  }
  console.log('Contrôle écrit dans', dossier);
} else {
  const muet = path.join(SHORT, `_muet-${partie}.mp4`);
  if (mode !== 'mix') {
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(IPS), '-c:v', 'mjpeg', '-i', '-',
      '-r', '24', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', muet], { stdio: ['pipe', 'inherit', 'inherit'] });
    const debut = Date.now();
    for (let k = 0; k < NB; k++) {
      await page.evaluate((T) => window.film.image(T), instant(k));
      const img = await page.screenshot({ type: 'jpeg', quality: 95 });
      if (!ff.stdin.write(img)) await new Promise((r) => ff.stdin.once('drain', r));
      if (k % 120 === 0) console.log(`${k}/${NB} images, ${Math.round((Date.now() - debut) / 1000)} s`);
    }
    ff.stdin.end(); await new Promise((r) => ff.on('close', r));
  }
  /* Le son : les mêmes instants découpés dans le MP4 de l'épisode (vent, chiens, voix, boîte à musique), raccords adoucis */
  const BORD = .12, filtres = [];
  extraits.forEach(({ ta, n }, i) => {
    const d = n / IPS;
    filtres.push(`[1:a]atrim=${ta.toFixed(4)}:${(ta + d).toFixed(4)},asetpts=PTS-STARTPTS,afade=t=in:d=${i ? BORD : .02},afade=t=out:st=${(d - BORD).toFixed(4)}:d=${BORD}[a${i}]`);
  });
  filtres.push(extraits.map((_, i) => `[a${i}]`).join('') + `concat=n=${extraits.length}:v=0:a=1,atrim=0:${DUREE.toFixed(4)}[a]`);
  const finale = path.join(SORTIE, P.nom + '.mp4');
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', muet, '-i', SOURCE, '-filter_complex', filtres.join(';'), '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', finale], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('Mélange du son échoué');
  console.log('FINI', finale);
}
await nav.close();
