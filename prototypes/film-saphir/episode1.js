/* ============================================================
   SAPHIR — Partie 1, épisode 1 : « Le cercle des loups »
   Grand Nord. Collé après commun.js (film de Noël) par scripts/film-saphir.mjs.
   Tout est dans un bloc : aucun nom ne gêne commun.js ni le modèle.
   Scénario : manim/film-saphir/episode-1-scenario.md
   ============================================================ */
{
racine.visible = false;
renderer.toneMappingExposure = .92;
const { A, F, clips, FIN } = frise(['@p1', 20, '@p2', 30, '@p3', 9, 'p3-vieux', 12, '@p4', 30, '@p5', 40, '@p6', 9, 'p6-vieux', 18, '@p7', 30, '@p8', 22]);
const P4 = A.p4, P5 = A.p5, P6 = A.p6, A6 = A['p6-vieux'], F6 = F['p6-vieux'], P7 = A.p7, P8 = A.p8;

const angleVers = (a, b) => Math.atan2(b.x - a.x, b.z - a.z);
const tourne = (a, b, u) => { let d = ((b - a + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI; return a + d * u; };
const plat = v => Vx(v.x, 0, v.z);
const dirAngle = h => Vx(Math.sin(h), 0, Math.cos(h));
const latAngle = h => Vx(Math.cos(h), 0, -Math.sin(h)); /* le +x local d'un objet tourné de h */
const rotY = (v, a) => Vx(v.x * Math.cos(a) + v.z * Math.sin(a), v.y, -v.x * Math.sin(a) + v.z * Math.cos(a));

/* ---------- Le sol du Grand Nord ---------- */
const C0 = Vx(8, 0, 16.5); /* centre du cercle des loups, sur la crête */
const CABANE = Vx(47, 0, -4.5), COLLINE = Vx(38.5, 0, 11.5);
function H(x, z) {
  const dc = Math.hypot(x - C0.x, z - C0.z), dh = Math.hypot(x - COLLINE.x, z - COLLINE.z), d0 = Math.hypot(x - 5, z - 2);
  return 1.3 * Math.exp(-dc * dc / 150) + .8 * Math.exp(-dh * dh / 50) + .1 * Math.sin(x * .31) * Math.cos(z * .27)
    + ss(28, 90, d0) * (2.4 + 1.7 * Math.sin(x * .045) + 1.4 * Math.cos(z * .05 + 1) + .9 * Math.sin((x + z) * .03));
}
const surSol = (v, dy = 0) => Vx(v.x, H(v.x, v.z) + dy, v.z);
const neige = feutre(0xeef3fb, { f: .42, freq: 9 });
{
  const geo = new THREE.PlaneGeometry(520, 520, 260, 260), p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) p.setZ(i, H(p.getX(i) + 5, -p.getY(i) + 2));
  geo.computeVertexNormals();
  const sol = new THREE.Mesh(geo, neige); sol.rotation.x = -Math.PI / 2; sol.position.set(5, 0, 2); sol.receiveShadow = true; scene3d.add(sol);
}
/* Quelques épicéas, loin, à la lisière de la taïga, et un bosquet près de la cabane */
for (const [x, z, h] of [[-30, -26, 6], [-24, -31, 7.5], [-38, -22, 5.5], [14, -30, 7], [20, -34, 8], [27, -28, 6], [55, -16, 7], [58, -9, 6], [60, -1, 8], [53, 4, 5.5], [62, 9, 7], [-60, 30, 8], [-48, 38, 7], [70, 30, 8], [30, 45, 7], [-10, 50, 9]]) {
  const s = creerSapin(scene3d, x, z, h); s.position.y = H(x, z) - .1;
}

/* ---------- Le ciel, la lumière ---------- */
const ciel = document.createElement('canvas'); ciel.width = 4; ciel.height = 256;
const texCiel = new THREE.CanvasTexture(ciel); texCiel.colorSpace = THREE.SRGBColorSpace; scene3d.background = texCiel;
const brume = new THREE.FogExp2(0xeef0ee, .012); scene3d.fog = brume;
const hemi = new THREE.HemisphereLight(0xc9dcf2, 0xe8eef8, 1.1); scene3d.add(hemi);
const soleil = new THREE.DirectionalLight(0xfff1dc, 2); soleil.castShadow = true; soleil.shadow.mapSize.set(4096, 4096);
Object.assign(soleil.shadow.camera, { left: -22, right: 22, top: 22, bottom: -22, near: 1, far: 140 }); soleil.shadow.bias = -.0005; scene3d.add(soleil, soleil.target);
const DIR_SOLEIL = Vx(60, 11, -35).normalize();
const disque = new THREE.Sprite(new THREE.SpriteMaterial({ map: rondDoux('rgba(255,236,200,1)', 'rgba(255,200,140,0)'), fog: false, depthWrite: false, blending: THREE.AdditiveBlending, transparent: true }));
disque.scale.setScalar(22); scene3d.add(disque);
const etoiles = creerEtoiles(scene3d);
const bleue = new THREE.Sprite(new THREE.SpriteMaterial({ map: rondDoux('rgba(150,200,255,1)', 'rgba(80,140,255,0)'), fog: false, depthWrite: false, blending: THREE.AdditiveBlending, transparent: true })); scene3d.add(bleue);
const flocons = creerFlocons(scene3d, { nb: 900 });
const hexa = h => new THREE.Color(h);
/* [instant, haut, milieu, horizon, soleil, force du soleil, force du ciel, brume] */
const LUMIERES = [
  [0, '#e9eef4', '#eef2f6', '#f4f6f8', '#fff4e6', .6, 1.4, .11],
  [13, '#8fb4dc', '#c9dcee', '#eef0ee', '#fff1dc', 2, 1.1, .012],
  [P7 + 4, '#8fb4dc', '#c9dcee', '#eef0ee', '#fff1dc', 2, 1.1, .012],
  [P7 + 24, '#6d8cc4', '#e3b98f', '#f7c58a', '#ffb36b', 2.2, .9, .014],
  [P8 + 5, '#16234e', '#3a4f8a', '#9d7fa6', '#8aa0e0', .55, .7, .016],
  [P8 + 16, '#070d26', '#142352', '#31407a', '#6f86c8', .3, .55, .018]];
function lumiere(T) {
  let i = 0; while (i < LUMIERES.length - 2 && LUMIERES[i + 1][0] <= T) i++;
  const a = LUMIERES[i], b = LUMIERES[i + 1], u = ss(a[0], b[0], T), mix = k => hexa(a[k]).lerp(hexa(b[k]), u);
  const haut = mix(1), milieu = mix(2), horizon = mix(3), g = ciel.getContext('2d'), d = g.createLinearGradient(0, 0, 0, 256);
  d.addColorStop(0, '#' + haut.getHexString()); d.addColorStop(.62, '#' + milieu.getHexString()); d.addColorStop(1, '#' + horizon.getHexString());
  g.fillStyle = d; g.fillRect(0, 0, 4, 256); texCiel.needsUpdate = true;
  brume.color.copy(horizon); brume.density = L(a[7], b[7], u);
  soleil.color.copy(mix(4)); soleil.intensity = L(a[5], b[5], u); hemi.intensity = L(a[6], b[6], u); hemi.color.copy(milieu).lerp(hexa('#ffffff'), .3);
  disque.material.color.copy(mix(4)); disque.material.opacity = ss(8, 14, T) * (1 - ss(P8 + 2, P8 + 9, T));
}

/* ---------- Le chemin de l'attelage ---------- */
const CHEMIN = new THREE.CatmullRomCurve3([[-55, 0], [-35, 0], [-15, 0], [-9, .3], [-4, 1.8], [-.5, 5], [2.5, 8.5], [6, 10.4], [10, 10.4], [15, 8.6], [21, 5.3], [29, 2], [36, .4], [41.5, -.4], [46, -.6]].map(([x, z]) => Vx(x, 0, z)));
const LONG = CHEMIN.getLength();
function surChemin(s) {
  const u = Math.min(1, Math.max(0, s / LONG)), p = CHEMIN.getPointAt(u), t = CHEMIN.getTangentAt(u);
  if (s < 0) p.addScaledVector(t, s); if (s > LONG) p.addScaledVector(t, s - LONG);
  return { p: surSol(p), h: Math.atan2(t.x, t.z) };
}
const sPres = (x, z) => { let m = 1e9, sm = 0; for (let i = 0; i <= 3000; i++) { const s = i / 3000 * LONG, p = CHEMIN.getPointAt(i / 3000), d = Math.hypot(p.x - x, p.z - z); if (d < m) { m = d; sm = s; } } return sm; };
const S_ARRET1 = sPres(-10, 0), S_ARRET2 = sPres(6, 10.4), S_FIN = sPres(41.5, -.4);
const DIST = [[0, 0], [A.p3 + 4, S_ARRET1], [P4 + 2, S_ARRET1], [P4 + 15, S_ARRET2], [P7 + 1, S_ARRET2], [P8 + 4, S_FIN]];
function S(T) {
  if (T <= DIST[0][0]) return DIST[0][1];
  for (let i = 1; i < DIST.length; i++) if (T <= DIST[i][0]) return L(DIST[i - 1][1], DIST[i][1], ss(DIST[i - 1][0], DIST[i][0], T));
  return DIST.at(-1)[1];
}
const vitesse = T => (S(T + 1 / 12) - S(T)) * 12;

/* ---------- Le traîneau ---------- */
const bois = feutre(0x9a6a3e, { f: .6, freq: 14 }), boisSombre = feutre(0x5c3d24, { f: .6, freq: 14 }), fourrure = feutre(0x9b8466, { f: 1.1, freq: 40 }), corde = feutre(0x2d2620, { f: .4 });
function creerTraineau(par = scene3d, givre = false) {
  const g = new THREE.Group(); par.add(g);
  const b = givre ? feutre(0xb9b8b2, { f: .6, freq: 14 }) : bois, bs = givre ? feutre(0x8f8a84, { f: .6, freq: 14 }) : boisSombre;
  const morceaux = {};
  for (const s of [-1, 1]) {
    morceaux['patin' + s] = dur(g, new THREE.BoxGeometry(.09, .1, 3.9), bs, [s * .62, .05, -.15]);
    const bout = new Tube(g, () => .05, bs, { seg: 10, rad: 8, trait: null }); bout.maj([Vx(s * .62, .05, 1.75), Vx(s * .62, .12, 1.95), Vx(s * .62, .35, 2.02), Vx(s * .62, .55, 1.9)]);
    for (const z of [-1.2, -.3, .6, 1.5]) dur(g, new THREE.BoxGeometry(.07, .5, .07), b, [s * .62, .32, z]);
    dur(g, new THREE.BoxGeometry(.06, .06, 3.1), b, [s * .64, .95, .15]);
    for (const z of [-1.2, .15, 1.5]) dur(g, new THREE.BoxGeometry(.05, .4, .05), b, [s * .64, .75, z]);
    dur(g, new THREE.BoxGeometry(.07, 1.4, .07), b, [s * .55, 1.1, -1.42]).rotation.x = -.12;
  }
  dur(g, new THREE.BoxGeometry(1.35, .06, 2.9), b, [0, .58, .15]);
  for (let i = 0; i < 6; i++) dur(g, new THREE.BoxGeometry(1.4, .03, .04), bs, [0, .62, -1.1 + i * .5]);
  dur(g, new THREE.BoxGeometry(1.22, .07, .07), b, [0, 1.77, -1.5]);
  dur(g, new THREE.BoxGeometry(1.25, .05, .05), b, [0, .58, 1.62]);
  return { g, morceaux };
}
const traineau = creerTraineau();
const peaux = dur(traineau.g, ell(.55, .13, 1.15), fourrure, [0, .68, .25]);
const couverture = dur(traineau.g, ell(.5, .2, .78), feutre(0x7d6648, { f: 1.2, freq: 44 }), [0, .78, .62]);

/* ---------- Chiens et loups : un même quadrupède, deux pelages ---------- */
function creerBete(par, { pelage = 0x4a4e57, ventre = 0xf1efe8, iris = 0x6aa8d8, oreilles = .25, echelle = 1, queueEnRond = true, tache = null, harnais = null, clochette = false } = {}) {
  const M = { p: feutre(pelage, { f: 1.1, freq: 26 }), v: feutre(ventre, { f: 1.1, freq: 26 }), n: feutre(0x15151a, { f: .05 }), i: feutre(iris, { f: .02 }), h: harnais ? feutre(harnais, { f: .5 }) : null };
  const g = new THREE.Group(); g.scale.setScalar(echelle); par.add(g);
  const corps = new THREE.Group(); g.add(corps);  /* pivot aux hanches */
  dur(corps, ell(.36, .36, .7), M.p, [0, .02, .48]); dur(corps, ell(.3, .26, .62), M.v, [0, -.1, .5]);
  dur(corps, ell(.35, .4, .4), M.p, [0, .08, .98]); dur(corps, ell(.27, .3, .3), M.v, [0, -.05, 1.15]);
  const hanche = dur(corps, ell(.33, .33, .36), M.p, [0, -.02, .02]);
  if (M.h) { dur(corps, new THREE.TorusGeometry(.38, .045, 8, 20), M.h, [0, .08, .9]); dur(corps, new THREE.BoxGeometry(.08, .05, .9), M.h, [0, .42, .5]); }
  const cou = new THREE.Group(); cou.position.set(0, .3, 1.15); corps.add(cou);
  dur(cou, ell(.24, .3, .26), M.p, [0, .08, .05]);
  const tt = new THREE.Group(); tt.position.set(0, .32, .18); cou.add(tt);
  dur(tt, ell(.29, .27, .33), M.p); dur(tt, ell(.22, .16, .2), M.v, [0, -.1, .14]);
  dur(tt, ell(.13, .12, .26), M.v, [0, -.08, .34]); dur(tt, new THREE.SphereGeometry(.065, 12, 8), M.n, [0, -.03, .6]);
  if (tache) dur(tt, ell(.1, .05, .12), feutre(tache, { f: .9, freq: 30 }), [0, .2, .2]).rotation.x = -.4;
  for (const s of [-1, 1]) {
    const o = dur(tt, new THREE.ConeGeometry(.1, oreilles, 10), M.p, [s * .16, .3, -.05]); o.rotation.z = -s * .25;
    dur(tt, new THREE.SphereGeometry(.05, 10, 8), M.i, [s * .13, .07, .25]); dur(tt, new THREE.SphereGeometry(.026, 8, 6), M.n, [s * .135, .07, .29]);
  }
  if (clochette) dur(cou, new THREE.SphereGeometry(.07, 12, 8), feutre(0xd9a53a, { f: .2 }), [0, -.15, .3]);
  /* Pattes : un pivot, un tube, une patte */
  const pattes = [[-.17, .02, .98], [.17, .02, .98], [-.19, -.05, .05], [.19, -.05, .05]].map(([x, y, z], i) => {
    const pv = new THREE.Group(); pv.position.set(x, y, z); corps.add(pv);
    const os = dur(pv, new THREE.CylinderGeometry(.075, .06, 1, 10), i < 2 ? M.p : M.p, [0, -.5, 0]);
    const pa = dur(pv, ell(.09, .06, .13), M.v, [0, -1, .04]);
    return { pv, os, pa };
  });
  const queue = new Tube(corps, u => .13 * (1 - u * .6), M.p, { seg: 14, rad: 10, trait: null });
  const souffle = new THREE.Sprite(new THREE.SpriteMaterial({ map: rondDoux('rgba(255,255,255,.8)', 'rgba(255,255,255,0)'), transparent: true, depthWrite: false })); scene3d.add(souffle);
  const HAUT = .95;
  /* poser({ assis 0-1, phase, ampleur 0-1, tY, tX, queue }) */
  return { g, corps, tt, souffle, poser({ assis = 0, phase = 0, ampleur = 0, tY = 0, tX = 0, agite = 0, T = 0, couche = 0 } = {}) {
    const inc = -.72 * assis, hy = L(HAUT, .42, assis) - couche * .35;
    corps.position.set(0, hy, -.5); corps.rotation.x = inc + couche * .05;
    cou.rotation.x = -inc * .9 + tX; cou.rotation.y = tY;
    hanche.scale.setScalar(1 + assis * .35);
    pattes.forEach(({ pv, os, pa }, i) => {
      const avant = i < 2, cote = i % 2 ? 1 : -1, ph = phase + (avant ? 0 : Math.PI) + (cote > 0 ? Math.PI : 0);
      let rx = Math.sin(ph) * .45 * ampleur, l = 1;
      if (avant) { const hEpaule = hy + Math.sin(-inc) * .98 + Math.cos(-inc) * .02; l = Math.max(.6, hEpaule / .98); rx += -inc; rx -= couche * 1.3; }
      else { rx += L(0, -1.0 - inc, assis); rx -= couche * 1.2; }
      pv.rotation.x = rx; os.scale.y = l; os.position.y = -.5 * l; pa.position.y = -l;
      pa.position.z = avant ? .04 : .04 + assis * .1;
    });
    const qa = queueEnRond ? [Vx(0, .1, -.3), Vx(0, .45, -.48), Vx(0, .7, -.3), Vx(.05 + .05 * agite * Math.sin(T * 9), .6, -.05)]
      : [Vx(0, .1, -.3), Vx(0, -.1 - assis * .1, -.6), Vx(.1 * agite * Math.sin(T * 5), -.45, -.72 + assis * .3), Vx(0, -.7, -.62 + assis * .45)];
    queue.maj(qa);
  } };
}

/* L'attelage : trois paires, le chien de tête porte la clochette */
const PELAGES = [[0x4a4e57, 0xf1efe8], [0x8a5a36, 0xf3e6d2], [0x5e6068, 0xf1efe8], [0x3a3b40, 0xf1efe8], [0xa8a49c, 0xf6f4ee], [0x6b4a33, 0xf1e6d6]];
const chiens = PELAGES.map(([p, v], i) => creerBete(scene3d, { pelage: p, ventre: v, iris: i % 3 ? 0x6aa8d8 : 0x7a4a22, echelle: .78, harnais: 0xc0392b, clochette: i === 4 }));
const ligne = new Tube(scene3d, () => .025, corde, { seg: 40, rad: 6, trait: null });

/* La meute : huit loups gris clair, le chef plus sombre avec une tache claire au front */
const NB_LOUPS = 8, R_CERCLE = 3.6;
const loups = Array.from({ length: NB_LOUPS }, (_, i) => creerBete(scene3d, i === 1 ? { pelage: 0x6e6f74, ventre: 0xd9d8d2, iris: 0xd9a03a, oreilles: .3, echelle: 1.02, queueEnRond: false, tache: 0xf2f1ec }
  : { pelage: [0xc8cac8, 0xbfc2c0, 0xd2d3cf, 0xb5b8b8][i % 4], ventre: 0xf2f1ec, iris: 0xd9a03a, oreilles: .3, echelle: .92 + (i % 3) * .04, queueEnRond: false }));
loups.forEach(l => { l.souffle.visible = false; }); /* jamais placés : ils restaient en (0,0,0), petites boules blanches sur la neige */

/* ---------- Le vieil homme ---------- */
const vieux = personnage(scene3d, { peau: 0xe0b394, cheveu: 0xe9e9ec, haut: 0x7a5636, bas: 0x4a3a2c, chaussure: 0x2e2018, coiffure: 'court', echelle: 1.12, iris: 0x2f4a5e });
const fourrureCol = feutre(0xe8dcc4, { f: 1.2, freq: 40 }), barbeM = feutre(0xf1f1f3, { f: 1.2, freq: 36 }), manteau = feutre(0x6e4d30, { f: .9, freq: 24 });
dur(vieux.buste, new THREE.TorusGeometry(.33, .13, 10, 24).rotateX(Math.PI / 2), fourrureCol, [0, 1.02, .02]);
dur(vieux.buste, new THREE.CylinderGeometry(.47, .6, .8, 18), manteau, [0, -.2, 0]);
dur(vieux.buste, new THREE.TorusGeometry(.58, .07, 8, 24).rotateX(Math.PI / 2), fourrureCol, [0, -.58, 0]);
dur(vieux.buste, new THREE.TorusGeometry(.45, .05, 8, 24).rotateX(Math.PI / 2), feutre(0x3a2a1c, { f: .4 }), [0, .2, 0]);
dur(vieux.tt, ell(.4, .4, .3), barbeM, [0, -.55, .26]);
dur(vieux.tt, ell(.2, .25, .2), barbeM, [0, -.85, .3]);
for (const s of [-1, 1]) { dur(vieux.tt, ell(.14, .25, .15), barbeM, [s * .4, -.25, .18]); const m = dur(vieux.tt, new THREE.CapsuleGeometry(.07, .22, 4, 8), barbeM, [s * .14, -.19, .5]); m.rotation.z = s * (Math.PI / 2 - .4); }
vieux.tt.traverse(o => { if (o.isMesh) o.castShadow = false; });
/* La chapka : se retire et se tient contre la poitrine */
const chapka = new THREE.Group(); scene3d.add(chapka);
const chapM = feutre(0x8a7a66, { f: 1.3, freq: 36 });
dur(chapka, new THREE.CylinderGeometry(.6, .63, .45, 22), chapM, [0, 0, 0]); dur(chapka, ell(.6, .18, .6), chapM, [0, .22, 0]);
for (const s of [-1, 1]) dur(chapka, ell(.14, .3, .26), chapM, [s * .56, -.3, -.02]);
dur(chapka, ell(.62, .14, .2), chapM, [0, -.1, .48]);

/* ---------- La petite fille ---------- */
const fille = personnage(scene3d, { peau: 0xf1c9aa, cheveu: 0x7a4a26, haut: 0xd8cfc0, bas: 0x8a7f6c, chaussure: 0x6b4a33, coiffure: 'court', echelle: .5, iris: 0x1557d6 });
fille.tt.traverse(o => { if (o.isMesh && o.material.color && o.material.color.getHex() === new THREE.Color(0x1557d6).getHex()) { o.material.emissive = new THREE.Color(0x0b3db8); o.material.emissiveIntensity = .55; } });
const laineM = feutre(0xb7a07a, { f: 1.2, freq: 40 });
const couvFille = dur(fille.buste, ell(.75, .82, .62), laineM, [0, .25, .05]);
dur(fille.buste, new THREE.TorusGeometry(.5, .2, 10, 24).rotateX(Math.PI / 2), laineM, [0, .98, -.02]);
const givreCils = new THREE.Group(); fille.tt.add(givreCils);
for (const s of [-1, 1]) for (let k = 0; k < 4; k++) dur(givreCils, new THREE.SphereGeometry(.03, 6, 5), feutre(0xffffff, { f: .1 }), [s * (.13 + k * .05), .2 + Math.sin(k) * .02, .5]);
const rouge = feutre(0xc0282d, { f: 1, freq: 50 });
const echarpeFille = new THREE.Group(); fille.buste.add(echarpeFille);
dur(echarpeFille, new THREE.TorusGeometry(.3, .11, 10, 24).rotateX(Math.PI / 2), rouge, [0, 1.12, .02]);
dur(echarpeFille, ell(.12, .38, .06), rouge, [.14, .8, .5]);

/* ---------- Ce qu'il y a au centre du cercle ---------- */
/* gdir : du centre vers l'endroit où s'arrête l'attelage */
const arretP = surChemin(S_ARRET2), latArret = latAngle(arretP.h);
const P_DEBOUT = Vx(0, .12, -1.78);
const versMonde = (loc, pos, h) => pos.clone().add(rotY(loc, h));
const P_PIED = plat(versMonde(Vx(-1.3, 0, -1.3), arretP.p, arretP.h));
const gdir = plat(P_PIED.clone().sub(C0)).normalize(), perp = Vx(gdir.z, 0, -gdir.x);
const P_GAP = C0.clone().addScaledVector(gdir, R_CERCLE + .7), P_FILLE = C0.clone().addScaledVector(gdir, .5), P_STOP = P_FILLE.clone().addScaledVector(gdir, 1.25).addScaledVector(perp, -.6); /* un peu de côté : les gros plans sur elle restent dégagés */
const H_FILLE = Math.atan2(gdir.x, gdir.z);
const centre = new THREE.Group(); scene3d.add(centre);
const epave = creerTraineau(centre, true);
epave.g.position.copy(surSol(C0.clone().addScaledVector(gdir, -1.4), -.25)); epave.g.rotation.set(.1, H_FILLE + 1.1, .55);
epave.morceaux['patin1'].scale.z = .55; epave.morceaux['patin1'].position.z = .7;
dur(centre, new THREE.BoxGeometry(.09, .1, 1.5), feutre(0x8f8a84, { f: .6 }), surSol(C0.clone().addScaledVector(gdir, -2.4).addScaledVector(perp, 1.2), .05).toArray()).rotation.set(.2, H_FILLE - .5, .15);
for (let i = 0; i < 6; i++) { const p = C0.clone().addScaledVector(gdir, -1.4 + Math.sin(i * 2.1) * .9).addScaledVector(perp, Math.cos(i * 1.7) * .9); dur(centre, ell(.5, .14, .4), neige, surSol(p, .55 + (i % 2) * .2).toArray()).rotation.y = i; }
/* Les deux formes, sous la neige, et la main gantée */
for (const s of [-1, 1]) {
  const p = P_FILLE.clone().addScaledVector(perp, s * .95).addScaledVector(gdir, -.45);
  const m = dur(centre, ell(.5, .32, 1.15), neige, surSol(p, .12).toArray()); m.rotation.y = H_FILLE + s * .12;
}
const gant = new THREE.Group(); centre.add(gant); gant.position.copy(surSol(P_FILLE.clone().addScaledVector(perp, .55).addScaledVector(gdir, .1), .14)); gant.rotation.y = H_FILLE - .9;
dur(gant, ell(.13, .07, .17), feutre(0x3b2a20, { f: .5 }), [0, 0, .12]); dur(gant, new THREE.CylinderGeometry(.08, .09, .22, 10).rotateX(Math.PI / 2), feutre(0x6e4d30, { f: .8 }), [0, 0, -.06]);
const echarpeVent = new Tube(scene3d, u => .07 * (1 - u * .4), rouge, { seg: 20, rad: 8, trait: null });
const ANCRE = surSol(P_FILLE.clone().addScaledVector(perp, -1.05).addScaledVector(gdir, .1), .08);

/* ---------- La cabane ---------- */
const cabane = new THREE.Group(); scene3d.add(cabane); cabane.position.copy(surSol(CABANE, -.1)); cabane.rotation.y = -Math.PI / 2; /* sa façade regarde vers -x */
{
  const rondin = feutre(0x7b5232, { f: .8, freq: 12 }), sombre = feutre(0x3e2918, { f: .5 });
  for (let i = 0; i < 9; i++) { const y = .2 + i * .36;
    for (const z of [-2.4, 2.4]) dur(cabane, new THREE.CylinderGeometry(.19, .19, 6.4, 10).rotateZ(Math.PI / 2), rondin, [0, y, z]);
    for (const x of [-3, 3]) dur(cabane, new THREE.CylinderGeometry(.19, .19, 5.2, 10).rotateX(Math.PI / 2), rondin, [x, y + .18, 0]); }
  dur(cabane, new THREE.BoxGeometry(6, 3.2, 4.8), sombre, [0, 1.6, 0]);
  for (const s of [-1, 1]) {
    const toit = dur(cabane, new THREE.BoxGeometry(7, .25, 3.3), sombre, [0, 3.9, s * 1.35]); toit.rotation.x = s * .55;
    const n = dur(cabane, new THREE.BoxGeometry(7.1, .3, 3.3), neige, [0, 4.1, s * 1.42]); n.rotation.x = s * .55;
  }
  dur(cabane, new THREE.BoxGeometry(.8, 1.8, .8), feutre(0x6f6a66, { f: .7, freq: 16 }), [1.8, 4.6, -.6]);
  const fen = new THREE.Mesh(new THREE.PlaneGeometry(1.1, .9), new THREE.MeshBasicMaterial({ color: 0xffc070 })); fen.position.set(-1.2, 1.8, 2.62); cabane.add(fen);
  for (const [w, h, x, y] of [[1.25, .1, -1.2, 2.3], [1.25, .1, -1.2, 1.3], [.1, 1, -1.85, 1.8], [.1, 1, -.55, 1.8], [.06, .9, -1.2, 1.8]]) dur(cabane, new THREE.BoxGeometry(w, h, .1), sombre, [x, y, 2.66]);
  dur(cabane, new THREE.BoxGeometry(1.2, 2.3, .12), feutre(0x5a3a22, { f: .6 }), [1.4, 1.15, 2.62]);
  const feu = new THREE.PointLight(0xffb86a, 0, 16, 1.6); feu.position.set(-1.2, 1.8, 3.4); cabane.add(feu); cabane.userData.feu = feu;
}
const fumee = Array.from({ length: 16 }, () => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: rondDoux('rgba(235,235,240,.7)', 'rgba(235,235,240,0)'), transparent: true, depthWrite: false })); scene3d.add(s); return s; });
const CHEMINEE = cabane.localToWorld(Vx(1.8, 5.6, -.6)), fumeeNuit = new THREE.Color(0x4a5778);

/* ---------- Les écrits : le titre et la fin ---------- */
const st = document.createElement('style');
st.textContent = `#titreS{position:fixed;inset:0;display:flex;align-items:flex-start;padding-top:150px;box-sizing:border-box;justify-content:center;z-index:4;pointer-events:none;font-family:"Segoe UI Light","Segoe UI",sans-serif;font-weight:200;font-size:190px;letter-spacing:.38em;color:#2f6fc0;text-shadow:0 0 30px rgba(120,180,255,.75),0 0 4px #fff;padding-left:.38em}
#titreS span{opacity:0}
#finS{position:fixed;inset:0;display:none;align-items:center;justify-content:center;flex-direction:column;z-index:6;font-family:"Segoe UI Light","Segoe UI",sans-serif;color:#cfe2ff}
#finS .t{font-size:120px;letter-spacing:.3em;font-weight:200;color:#6aa6ff;text-shadow:0 0 26px rgba(90,150,255,.7)}#finS .s{font-size:46px;letter-spacing:.2em;margin-top:24px;color:#cfd8e6}`;
document.head.append(st);
const titre = document.createElement('div'); titre.id = 'titreS'; titre.innerHTML = [...'SAPHIR'].map(c => `<span>${c}</span>`).join(''); document.body.append(titre);
const lettres = [...titre.children];
const finS = document.createElement('div'); finS.id = 'finS'; finS.innerHTML = '<div class="t">SAPHIR</div><div class="s">à suivre</div>'; document.body.append(finS);

/* ============================================================
   QUI EST OÙ, À L'INSTANT T
   ============================================================ */
function poseTraineau(T) { const { p, h } = surChemin(S(T)); return { p, h }; }

/* Le vieil homme : sur le traîneau, ou à pied entre ces repères [instant, position, cap] */
const POS_TRAIN_ARRET = versMonde(P_DEBOUT, arretP.p, arretP.h);
const P_SPOT = versMonde(Vx(0, .62, .2), arretP.p, arretP.h); /* l'endroit où il couche la petite */
const REPERES = [
  [P4 + 15, plat(POS_TRAIN_ARRET), arretP.h],
  [P4 + 17.5, P_PIED, angleVers(P_PIED, C0)],
  [P4 + 20, P_PIED, angleVers(P_PIED, P_GAP)],
  [P5 + 2, P_GAP, angleVers(P_GAP, P_STOP)],
  [P5 + 7, P_STOP, angleVers(P_STOP, P_FILLE)],
  [F6 + 1, P_STOP, angleVers(P_STOP, P_FILLE)],
  [F6 + 2, P_STOP, angleVers(P_STOP, P_GAP)],
  [F6 + 5, P_GAP, angleVers(P_GAP, P_PIED)],
  [F6 + 8.5, P_PIED, angleVers(P_PIED, P_SPOT)],
  [F6 + 12.8, P_PIED, angleVers(P_PIED, P_SPOT)],
  [F6 + 13.8, P_PIED, angleVers(P_PIED, C0)],
  [F6 + 15.6, P_PIED, angleVers(P_PIED, C0)],
  [F6 + 16.4, P_PIED, arretP.h],
  [F6 + 18, plat(POS_TRAIN_ARRET), arretP.h]];
function placeVieux(T) {
  if (T < REPERES[0][0] || T >= REPERES.at(-1)[0]) { const t = poseTraineau(T), p = versMonde(P_DEBOUT, t.p, t.h);
    /* arrivé à la cabane, il descend du traîneau : deux pas de côté, pour ne pas rester debout au-dessus de la petite */
    const kD = T > P7 ? ss(P8 + 6, P8 + 8, T) : 0; if (kD > 0) { p.addScaledVector(latAngle(t.h), -2.1 * kD).addScaledVector(dirAngle(t.h), .5 * kD); p.y = L(p.y, H(p.x, p.z), kD); }
    return { p, h: t.h, aBord: true, descend: kD > 0 && kD < 1 }; }
  let i = 0; while (i < REPERES.length - 2 && REPERES[i + 1][0] <= T) i++;
  const [ta, pa, ha] = REPERES[i], [tb, pb, hb] = REPERES[i + 1], u = (T - ta) / (tb - ta), ue = ss(0, 1, u);
  const lin = Math.min(1, Math.max(0, u)), mouv = pa.distanceTo(pb) > .01;
  const p = pa.clone().lerp(pb, mouv ? L(lin, ue, .35) : 0); const hauteur = i === 0 ? L(.12, 0, ue) : i === REPERES.length - 2 ? L(0, .12, ue) : 0;
  const hMarche = mouv ? angleVers(pa, pb) : ha;
  const h = mouv ? tourne(ha, hMarche, ss(0, .25, u)) : tourne(ha, hb, ue);
  return { p: surSol(p, hauteur), h: mouv && u > .75 ? tourne(hMarche, hb, ss(.75, 1, u)) : h, aBord: false };
}
function marcheVieux(T) { const a = placeVieux(T - .05).p, b = placeVieux(T + .05).p; return Math.hypot(b.x - a.x, b.z - a.z) / .1; }

/* La petite fille : assise au centre, puis dans ses bras, puis couchée dans le traîneau */
const qY = h => new THREE.Quaternion().setFromAxisAngle(Vx(0, 1, 0), h);
const qX = a => new THREE.Quaternion().setFromAxisAngle(Vx(1, 0, 0), a);
function transfoFille(T) {
  const assise = { p: surSol(P_FILLE, -.22), q: qY(H_FILLE) };
  vieux.g.updateMatrixWorld(true);
  const bras = { p: vieux.g.localToWorld(Vx(0, .95, .62)), q: qY(placeVieux(T).h + Math.PI).multiply(qX(-.25)) };
  const t = poseTraineau(T), couchee = { p: versMonde(Vx(0, .66, .15), t.p, t.h), q: qY(t.h).multiply(qX(-Math.PI / 2)) };
  const melange = (a, b, u) => ({ p: a.p.clone().lerp(b.p, u), q: a.q.clone().slerp(b.q, u) });
  if (T < P6 + 3) return { ...assise, etat: 'assise' };
  if (T < P6 + 7) return { ...melange(assise, bras, ss(P6 + 3, P6 + 7, T)), etat: 'monte' };
  if (T < F6 + 9) return { ...bras, etat: 'bras' };
  if (T < F6 + 11) return { ...melange(bras, couchee, ss(F6 + 9, F6 + 11, T)), etat: 'pose' };
  return { ...couchee, etat: 'couchee' };
}

/* Les loups : au cercle, puis en file derrière le traîneau, puis assis sur la colline */
const ORDRE = [1, 2, 3, 4, 5, 6, 7, 0];
const angGap = Math.atan2(gdir.x, gdir.z);
function placeLoup(i, T) {
  let a = angGap + i * 2 * Math.PI / NB_LOUPS, r = R_CERCLE;
  if (i === 0) { const k = ss(P4 + 10, P4 + 14, T) * (1 - ss(P7 - 2, P7, T)); a -= .62 * k; r += .5 * k; }
  const cercle = surSol(C0.clone().add(Vx(Math.sin(a) * r, 0, Math.cos(a) * r)));
  const hc = Math.atan2(C0.x - cercle.x, C0.z - cercle.z);
  const rang = ORDRE.indexOf(i);
  const k1 = ss(P7 + 3 + rang * .8, P7 + 12 + rang * 1.4, T);
  if (k1 <= 0) return { p: cercle, h: hc, rang };
  const sf = S(T) - 7.5 - rang * 1.75, f = surChemin(sf);
  const file = f.p.clone().addScaledVector(latAngle(f.h), (rang % 2 ? .3 : -.3));
  const ac = Math.PI * (.15 + rang / (NB_LOUPS - 1) * .7) + Math.atan2(CABANE.x - COLLINE.x, CABANE.z - COLLINE.z) - Math.PI / 2;
  const siege = surSol(COLLINE.clone().add(Vx(Math.sin(ac) * 3.4, 0, Math.cos(ac) * 3.4)));
  const k2 = ss(P8 + 2 + rang * .6, P8 + 9 + rang * .6, T);
  const p = surSol(cercle.clone().lerp(file, k1).lerp(siege, k2));
  return { p, h: k2 > .9 ? angleVers(siege, CABANE) : k1 > .02 ? f.h : hc, rang };
}

/* ============================================================
   LA CAMÉRA : une suite de plans, chacun calculé à partir de T
   ============================================================ */
const mondeDe = o => { const v = new THREE.Vector3(); o.getWorldPosition(v); return v; };
const PLANS_S = [
  [0, u => ({ p: Vx(-22, H(-22, 16) + 3.2, 16).lerp(Vx(-25, H(-25, 13) + 3, 13), u), c: Vx(-52, 1.8, -1), f: 28 })],
  [20, (u, T, x) => ({ p: x.tp.clone().addScaledVector(x.av, 5 - u * 3).addScaledVector(x.lat, 9).add(Vx(0, 2.4, 0)), c: x.tp.clone().addScaledVector(x.av, 2.2).add(Vx(0, 1.2, 0)), f: 38 })],
  [33, (u, T, x) => ({ p: x.tv.clone().addScaledVector(x.av, 3.4).addScaledVector(x.lat, 1.4).add(Vx(0, .05, 0)), c: x.tv.clone().add(Vx(0, -.12, 0)), f: 30 })],
  [40, (u, T, x) => ({ p: x.tv.clone().addScaledVector(x.av, -3.2).addScaledVector(x.lat, 1.4).add(Vx(0, 2.6, 0)), c: surSol(CABANE, 5), f: 34 })],
  [A.p3, (u, T, x) => ({ p: x.tv.clone().addScaledVector(x.av, 3.2).addScaledVector(x.lat, -1.1).add(Vx(0, .1, 0)), c: x.tv.clone().add(Vx(0, -.1, 0)), f: 32 })],
  [A.p3 + 4, (u, T, x) => ({ p: x.tv.clone().addScaledVector(plat(C0.clone().sub(x.tv)).normalize(), 1.2).add(Vx(0, .25, 0)), c: C0.clone().add(Vx(0, H(C0.x, C0.z) + .9, 0)), f: L(22, 17, u) })],
  [A.p3 + 8.5, (u, T, x) => ({ p: x.tv.clone().addScaledVector(plat(C0.clone().sub(x.tv)).normalize(), 3.3).add(Vx(0, .05, 0)), c: x.tv.clone().add(Vx(0, -.25, 0)), f: 32 })],
  [P4 + 2, (u, T, x) => ({ p: x.tp.clone().addScaledVector(plat(x.tp.clone().sub(C0)).normalize(), 11).add(Vx(0, 7, 0)), c: x.tp.clone().lerp(C0, .4).add(Vx(0, 1, 0)), f: 44 })],
  [P4 + 14, (u, T, x) => { const w = mondeDe(loups[1].tt), dw = plat(w.clone().sub(C0)).normalize(); return { p: w.clone().addScaledVector(dw, -3.6).addScaledVector(Vx(dw.z, 0, -dw.x), 1.1).add(Vx(0, .35, 0)), c: x.vp.clone().add(Vx(0, 1.8, 0)), f: 34 }; }],
  [P4 + 24, (u, T, x) => ({ p: x.vp.clone().addScaledVector(gdir, 4.6).add(Vx(0, 3.3, 0)), c: surSol(C0, .6), f: 38 })],
  [P5 + 7, (u, T, x) => ({ p: surSol(C0.clone().addScaledVector(rotY(gdir, 1.25), 9), 5.2), c: surSol(P_FILLE.clone().lerp(P_STOP, .5), 1.7), f: 38 })],
  [P5 + 16, (u, T, x) => ({ p: x.tv.clone().addScaledVector(gdir, -3.2).addScaledVector(perp, .6).add(Vx(0, -.1, 0)), c: x.tv.clone().add(Vx(0, -.2, 0)), f: 32 })],
  [P5 + 24, (u, T, x) => ({ p: x.tf.clone().addScaledVector(gdir, 1.05).addScaledVector(perp, .3).add(Vx(0, .12, 0)), c: x.tf.clone().add(Vx(0, -.04, 0)), f: 38 })],
  [P5 + 32, (u, T, x) => ({ p: x.tf.clone().addScaledVector(gdir, .85).addScaledVector(perp, .45).add(Vx(0, .12, 0)), c: x.tf.clone().add(Vx(0, .03, 0)), f: L(30, 25, u) })],
  [P5 + 36, (u, T, x) => ({ p: x.tv.clone().addScaledVector(gdir, -2.6).addScaledVector(perp, .9).add(Vx(0, -.25, 0)), c: x.tv.clone().add(Vx(0, -.15, 0)), f: 34 })],
  [P6, (u, T, x) => { const m = P_FILLE.clone().lerp(P_STOP, .5); return { p: surSol(m.clone().addScaledVector(perp, 6.2).addScaledVector(gdir, 1), 3), c: surSol(m, 1.7), f: 38 }; }],
  [A6, (u, T, x) => { const m = x.tv.clone().lerp(x.tf, .5); return { p: m.clone().addScaledVector(dirAngle(x.vh), .9).addScaledVector(latAngle(x.vh), 3.1).add(Vx(0, .15, 0)), c: m, f: 32 }; }],
  [F6 + 1, (u, T, x) => ({ p: surSol(C0.clone().addScaledVector(rotY(gdir, -1.05), 9.5), 4.6), c: x.vp.clone().add(Vx(0, 1.5, 0)), f: 38 })],
  [F6 + 9, (u, T, x) => ({ p: P_SPOT.clone().addScaledVector(latArret, 2.3).addScaledVector(dirAngle(arretP.h), .4).add(Vx(0, 2.4, 0)), c: P_SPOT.clone().add(Vx(0, .2, 0)), f: 36 })],
  [F6 + 13, (u, T, x) => ({ p: x.tv.clone().addScaledVector(plat(C0.clone().sub(x.tv)).normalize(), 4.2).add(Vx(0, -.4, 0)), c: x.tv.clone().add(Vx(0, -.75, 0)), f: 36 })],
  [P7, (u, T, x) => ({ p: surSol(C0.clone().add(Vx(3, 0, 8)), 8), c: x.tp.clone().add(Vx(0, 1, 0)), f: 40 })],
  [P7 + 12, (u, T, x) => ({ p: x.tp.clone().addScaledVector(x.av, -3).addScaledVector(x.lat, -13).add(Vx(0, 2.6, 0)), c: x.tp.clone().addScaledVector(x.av, -4.5).add(Vx(0, 1.2, 0)), f: 42 })],
  [P7 + 21, (u, T, x) => ({ p: Vx(x.tp.x - 10, x.tp.y + 5, x.tp.z + 22), c: Vx(x.tp.x + 14, x.tp.y + 2, x.tp.z - 2), f: 40 })],
  [P8, (u, T, x) => ({ p: surSol(Vx(33, 0, -15), 6), c: surSol(Vx(42, 0, 3), 1.5), f: 44 })],
  [P8 + 10, (u, T, x) => ({ p: x.tf.clone().addScaledVector(x.av, .55).addScaledVector(x.lat, -.35).add(Vx(0, 2.6, 0)), c: x.tf, f: 20 })],
  /* ce qu'elle voit : le ciel, et l'étoile bleue (raccord sur son regard) */
  [P8 + 14, (u, T, x) => ({ p: x.tf.clone().addScaledVector(x.av, .2).add(Vx(0, .35, 0)), c: x.tf.clone().addScaledVector(x.av, 20).add(Vx(0, L(11, 16, ss(0, 1, u)), 0)), f: 40 })]];
function filmerS(T, x) {
  let i = PLANS_S.length - 1; while (i > 0 && PLANS_S[i][0] > T) i--;
  const fin = (PLANS_S[i + 1] || [FIN])[0], u = Math.min(1, Math.max(0, (T - PLANS_S[i][0]) / (fin - PLANS_S[i][0])));
  const { p, c, f } = PLANS_S[i][1](u, T, x);
  const sol = H(p.x, p.z) + .4; if (p.y < sol) p.y = sol;
  camera.position.copy(p); camera.lookAt(c); camera.fov = f; camera.updateProjectionMatrix();
}

/* ============================================================
   L'IMAGE
   ============================================================ */
const NOTES = [[P5 + 27, 69], [P5 + 28.2, 72], [P5 + 29.4, 76], [P5 + 31, 74], [P5 + 32.4, 72], [P5 + 34, 69, .8],
  [F6 + 12, 64, .7], [F6 + 13.4, 67, .7], [F6 + 14.8, 69, .7],
  [P8 + 11, 64], [P8 + 12.3, 67], [P8 + 13.6, 69], [P8 + 15, 72], [P8 + 16.6, 71], [P8 + 18.2, 67], [P8 + 19.8, 69], [P8 + 19.8, 57, .6], [P8 + 19.8, 64, .6]];
const son = { vitesse: Array.from({ length: Math.ceil(FIN * 12) + 2 }, (_, i) => vitesse(i / 12)),
  vent: [[0, 1.3], [12, 1], [P5 + 12, .55], [P5 + 22, .3], [P6 + 10, .55], [P7, .95], [P8 + 12, .7], [FIN, .35]],
  coeur: [[P4, P5 + 9]], souffles: [P5 + 19.5, P5 + 26.5], notes: NOTES };

window.film = { FIN, clips, son, image(T0) {
  const T = Math.floor(T0 * 12 + 1e-6) / 12;
  lumiere(T);

  /* Le traîneau et les chiens */
  const tr = poseTraineau(T), v = vitesse(T);
  traineau.g.position.copy(tr.p); traineau.g.rotation.set(0, tr.h, 0);
  const pts = [versMonde(Vx(0, .45, 1.9), tr.p, tr.h)];
  const assisChiens = ss(P4 + 20, P4 + 23, T) * (1 - ss(P7 - 2.5, P7 - .5, T));
  chiens.forEach((c, i) => {
    const paire = Math.floor(i / 2), cote = i % 2 ? 1 : -1, sd = S(T) + 3.1 + paire * 1.55, f = surChemin(sd);
    const pos = f.p.clone().addScaledVector(latAngle(f.h), cote * .42);
    c.g.position.copy(pos); c.g.rotation.y = f.h;
    const amp = Math.min(1, v / .5);
    c.poser({ phase: sd * 3.1 + i * .3, ampleur: amp, assis: assisChiens * (i % 3 === 1 ? .2 : 1), couche: assisChiens * (i % 3 === 1 ? .8 : 0), tX: Math.sin(T * 1.3 + i) * .06 - amp * .1, tY: Math.sin(T * .7 + i * 2) * .25 * (1 - amp), T });
    const bouche = mondeDe(c.tt).addScaledVector(dirAngle(f.h), .55 * .78);
    const cy = (T * .9 + i * .37) % 1; c.souffle.position.copy(bouche).add(Vx(0, cy * .25, 0)).addScaledVector(dirAngle(f.h), cy * .3); c.souffle.scale.setScalar(.2 + cy * .5); c.souffle.material.opacity = Math.sin(Math.PI * cy) * .55;
    if (cote > 0 || paire === 2) pts.push(f.p.clone().add(Vx(0, .62, 0)).addScaledVector(dirAngle(f.h), paire === 2 ? .6 : -.2));
  });
  ligne.maj(pts);

  /* Le vieil homme */
  const vp = placeVieux(T), marche = Math.min(1, marcheVieux(T) / .8);
  vieux.g.position.copy(vp.p); vieux.g.rotation.y = vp.h;
  const phaseM = T * 5.2;
  const regard = cible => { const y = tourne(0, angleVers(vp.p, cible) - vp.h, 1); return Math.max(-1.3, Math.min(1.3, y)); };
  let P = { h: 1.15, lean: 0, ry: 0, tX: .05, tY: 0, lid: -.55, sourcil: .15, sourire: 0, parle: 0, kneeZ: .05,
    mg: Vx(-.55, .9, .15), md: Vx(.55, .9, .15), pg: Vx(-.22, 0, .02), pd: Vx(.22, 0, .02) };
  if (vp.aBord && vp.descend) { const s = Math.sin(phaseM * 1.3); P.pg = Vx(-.21, Math.max(0, s) * .12, .02 + s * .26); P.pd = Vx(.21, Math.max(0, -s) * .12, .02 - s * .26); }
  if (vp.aBord) {
    Object.assign(P, { mg: Vx(-.45, 1.4, .3), md: Vx(.45, 1.4, .3), lean: .08 });
    const yLoups = regard(C0), kL = ss(A.p3 + 1, A.p3 + 3, T) * (1 - ss(P4 + 10, P4 + 13, T));
    P.tY = yLoups * .7 * kL; P.ry = yLoups * .3 * kL;
    if (T > A.p3 + 3.5 && T < A.p3 + 5) { P.mg.z = .1; P.md.z = .1; P.lean = -.05; }
    if (T > P7 + 13 && T < P7 + 19) { const k = ss(P7 + 13, P7 + 14.5, T) * (1 - ss(P7 + 17.5, P7 + 19, T)); P.ry = .7 * k; P.tY = 1.1 * k; P.md = Vx(.6, 1.2, -.1).lerp(Vx(.45, 1.4, .3), 1 - k); }
    /* arrivé à la cabane : il lâche la poignée (sinon ses bras passent au-dessus de la petite dans le dernier gros plan) */
    const kLache = ss(P8 + 6, P8 + 8, T); if (kLache > 0) { P.mg = P.mg.clone().lerp(Vx(-.55, .9, .15), kLache); P.md = P.md.clone().lerp(Vx(.55, .9, .15), kLache); P.lean = L(P.lean, 0, kLache); }
    P.tX += Math.sin(T * 2.3) * .01 * Math.min(1, v);
    if (T >= A['p3-vieux'] && T < F['p3-vieux']) { P.parle = bouge(T, 0) * .5; P.sourcil = -.2; }
  } else if (marche > .05) {
    const s = Math.sin(phaseM) * marche;
    P.pg = Vx(-.21, Math.max(0, s) * .12, .02 + s * .26); P.pd = Vx(.21, Math.max(0, -s) * .12, .02 - s * .26);
    P.mg = Vx(-.56, .92, .15 - s * .16); P.md = Vx(.56, .92, .15 + s * .16);
    if (T < P5 + 8) { P.mg = Vx(-.7, 1.05, .4); P.md = Vx(.7, 1.05, .4); }
    P.h = 1.15 - Math.abs(s) * .03;
  }
  /* Au centre : la chapka, le regard, se mettre à genoux, la prendre */
  const chapkaMain = ss(P5 + 10, P5 + 11.6, T) * (1 - ss(P5 + 37, P5 + 38.6, T));
  if (T >= P5 + 7 && T < P6) {
    P.tX = L(.1, .4, ss(P5 + 14, P5 + 16, T)); P.tX = L(P.tX, .5, ss(P5 + 21, P5 + 23, T)); P.sourcil = -.25;
    if (chapkaMain > 0) { const enHaut = ss(P5 + 10, P5 + 10.8, T) * (1 - ss(P5 + 11, P5 + 11.6, T)) + ss(P5 + 37, P5 + 37.8, T) * (1 - ss(P5 + 38, P5 + 38.6, T));
      P.md = Vx(.5, 1.45, .4).lerp(Vx(.22, 2.15, .3), enHaut); }
    if (T > P5 + 30) { P.sourcil = .35; P.lid = -.7; }
  }
  if (T >= P6 && T < F6 + 1) {
    const kGenou = ss(P6, P6 + 3, T) * (1 - ss(P6 + 7, P6 + 9, T)), kPrend = ss(P6 + 3, P6 + 7, T);
    Object.assign(P, { h: L(1.15, .62, kGenou), lean: L(0, .42, kGenou), kneeZ: L(.05, .55, kGenou), tX: L(.25, .45, kGenou),
      pg: Vx(-.25, 0, L(.02, .55, kGenou)), pd: Vx(.22, 0, L(.02, -.42, kGenou)) });
    const tend = [Vx(-.32, .55, .95), Vx(.32, .55, .95)], porte = [Vx(-.32, 1.0, .6), Vx(.28, 1.5, .55)];
    P.mg = Vx(-.55, .9, .15).lerp(tend[0], ss(P6 + 1, P6 + 3, T)).lerp(porte[0], kPrend); P.md = Vx(.55, .9, .15).lerp(tend[1], ss(P6 + 1, P6 + 3, T)).lerp(porte[1], kPrend);
    if (T >= A6 - .5) { const kE = ss(A6 + 2.4, A6 + 3, T) * (1 - ss(A6 + 5.5, A6 + 6.2, T)); P.md = porte[1].clone().lerp(Vx(.12 + Math.sin(T * 4) * .08, 1.72, .62), kE); P.tX = .42; P.sourire = .35; }
    if (T >= A6 && T < F6) P.parle = bouge(T, 0) * .6;
  }
  if (T >= F6 + 1 && T < F6 + 9) { P.mg = Vx(-.32, 1.0, .6); P.md = Vx(.28, 1.5, .55); P.tX = .3; P.sourire = .3; }
  if (T >= F6 + 9 && T < F6 + 13) {
    const kP = ss(F6 + 8.6, F6 + 10, T) * (1 - ss(F6 + 12, F6 + 13, T));
    Object.assign(P, { lean: .55 * kP, h: L(1.15, .9, kP), tX: .3 });
    P.mg = Vx(-.32, 1.0, .6).lerp(Vx(-.35, .75, 1.1), kP); P.md = Vx(.28, 1.5, .55).lerp(Vx(.35, .8, 1.1), kP);
    if (T > F6 + 11) { const kc = ss(F6 + 11, F6 + 12.4, T); P.mg = Vx(-.35, .75, 1.1 + .25 * kc); P.md = Vx(.35, .8, 1.1 + .25 * kc); }
  }
  if (T >= F6 + 13 && T < F6 + 16.4) {
    const kC = ss(F6 + 13.8, F6 + 14.6, T) * (1 - ss(F6 + 15.8, F6 + 16.3, T));
    P.md = Vx(.55, .9, .15).lerp(Vx(.12, 1.6, .45), kC); P.tX = .22 * kC; P.sourcil = -.3; P.lid = L(-.55, -.2, kC);
  }
  P.lid = (T % 4.3 < .12) ? 1.2 : P.lid;
  vieux.poser(P);
  vieux.g.updateMatrixWorld(true);
  /* La chapka : sur la tête, ou dans la main contre la poitrine */
  const surTete = vieux.tt.localToWorld(Vx(0, .45, -.02)), dansMain = vieux.g.localToWorld(P.md.clone().add(Vx(0, .1, .12)));
  chapka.position.copy(surTete.clone().lerp(dansMain, chapkaMain));
  const qt = new THREE.Quaternion(); vieux.tt.getWorldQuaternion(qt); const qm = qY(vp.h).multiply(qX(-1.2));
  chapka.quaternion.copy(qt.clone().slerp(qm, chapkaMain)); chapka.scale.setScalar(1.12);

  /* La petite fille */
  const tf0 = transfoFille(T);
  fille.g.position.copy(tf0.p); fille.g.quaternion.copy(tf0.q);
  const yeux = L(1.5, -.5, ss(P5 + 26, P5 + 30.5, T));
  const Pf = { h: .62, lean: -.05, kneeZ: .45, pg: Vx(-.22, 0, .7), pd: Vx(.22, 0, .7), mg: Vx(-.3, .7, .45), md: Vx(.3, .7, .45), lid: yeux, sourire: 0, parle: .06, sourcil: .1, tX: -.32, regX: -.2 };
  if (tf0.etat === 'assise' && T < P5 + 26) { Pf.tX = .08; Pf.lean = .08; }
  if (tf0.etat === 'monte' || tf0.etat === 'bras') { Pf.tX = -.4; Pf.tY = -.3; Pf.regX = -.25; }
  if (tf0.etat === 'pose' || tf0.etat === 'couchee') { Pf.h = .9; Pf.kneeZ = .05; Pf.pg = Vx(-.15, 0, .05); Pf.pd = Vx(.15, 0, .05); Pf.mg = Vx(-.34, .55, .1); Pf.md = Vx(.34, .55, .1); Pf.tX = 0; Pf.regX = -.3; Pf.lid = L(-.5, .25, ss(P8 + 9, P8 + 13, T)); }
  if (yeux < 0 && (T % 5.1) < .14) Pf.lid = 1.2;
  fille.poser(Pf);
  givreCils.visible = T < P6 + 12;
  const kE = ss(A6 + 2.6, A6 + 5.4, T); echarpeFille.visible = kE > 0; echarpeFille.scale.setScalar(Math.max(.01, kE));
  const kVent = T < A6 + 2.6 ? 1 : 0;
  const pe = [ANCRE.clone()]; for (let k = 1; k <= 4; k++) pe.push(ANCRE.clone().addScaledVector(perp, -k * .25).add(Vx(Math.sin(T * 3 + k) * .06 * k, .02 * k + Math.sin(T * 4.3 + k * 1.7) * .05 * k, Math.cos(T * 2.6 + k) * .05 * k)));
  echarpeVent.maj(kVent ? pe : pe.map(() => Vx(0, -50, 0)));
  peaux.visible = true; const kc = ss(F6 + 11, F6 + 12.6, T); couverture.visible = kc > 0; couverture.scale.set(1, 1, Math.max(.01, kc));

  /* Les loups */
  loups.forEach((lp, i) => {
    const a = placeLoup(i, T), b = placeLoup(i, T - .15), dep = Math.hypot(a.p.x - b.p.x, a.p.z - b.p.z) / .15;
    let h = a.h; if (dep > .15) h = tourne(a.h, Math.atan2(a.p.x - b.p.x, a.p.z - b.p.z), Math.min(1, dep / .6));
    lp.g.position.copy(a.p); lp.g.rotation.y = h;
    const debout = ss(P7 + 2 + a.rang * .35, P7 + 3.2 + a.rang * .35, T) * (1 - ss(P8 + 7 + a.rang * .6, P8 + 9 + a.rang * .6, T));
    const ouverture = i === 0 ? ss(P4 + 9.6, P4 + 10.4, T) * (1 - ss(P4 + 13.6, P4 + 14.4, T)) : 0;
    let tY = Math.sin(T * .4 + i * 1.9) * .15, tX = Math.sin(T * .5 + i) * .05;
    if (i === 1) { const k = ss(P4 + 5, P4 + 8, T) * (1 - ss(P7, P7 + 3, T)); const vise = tourne(0, angleVers(a.p, vp.p) - h, 1); tY = L(tY, Math.max(-1.2, Math.min(1.2, vise)), k); }
    lp.poser({ assis: 1 - Math.max(debout, ouverture), phase: T * 6.5 + i, ampleur: Math.min(1, dep / .6), tY, tX, T });
  });

  /* La cabane, la fumée, les étoiles, les flocons, l'ombre */
  const nuitF = ss(P8, P8 + 14, T); /* la fumée n'est pas éclairée : on l'assombrit avec la nuit */
  cabane.userData.feu.intensity = L(.4, 9, ss(P7 + 18, P8 + 8, T));
  fumee.forEach((s, k) => { const c = (T * .12 + k / fumee.length) % 1; s.position.copy(CHEMINEE).add(Vx(c * 3.2 + Math.sin(T * .5 + k) * .3, c * 6, -c * 1.4)); s.scale.setScalar(.8 + c * 3.2); s.material.opacity = Math.sin(Math.PI * c) * .5 * (1 - .55 * nuitF); s.material.color.setRGB(1, 1, 1).lerp(fumeeNuit, nuitF); });
  const x = { tp: tr.p, av: dirAngle(tr.h), lat: latAngle(tr.h), vp: vp.p, vh: vp.h, tv: vieux.tt.localToWorld(Vx(0, 0, 0)), tf: fille.tt.localToWorld(Vx(0, 0, 0)) };
  filmerS(T, x);
  const foyer = T < 20 ? Vx(-50, 0, 0) : T < P4 + 2 ? tr.p : T < P7 ? surSol(C0.clone().lerp(P_PIED, .4)) : T < P8 ? tr.p : surSol(Vx(42, 0, 3));
  soleil.target.position.copy(foyer); soleil.position.copy(foyer).addScaledVector(DIR_SOLEIL, 60);
  disque.position.copy(camera.position).addScaledVector(DIR_SOLEIL, 200);
  const nuit = ss(P8 + 4, P8 + 14, T); etoiles.position.copy(camera.position); etoiles.material.opacity = .9 * nuit; etoiles.visible = nuit > 0;
  const kB = ss(P8 + 15, P8 + 18, T); bleue.visible = kB > 0;
  bleue.position.copy(camera.position).addScaledVector(Vx(0, 0, 0).add(dirAngle(tr.h).multiplyScalar(20)).add(Vx(0, 16, 0)).normalize(), 60).add(Vx(2.5, 3.5, 0)); bleue.scale.setScalar(6 * kB * (1 + .08 * Math.sin(T * 3)));
  flocons.points.position.set(camera.position.x, camera.position.y - 8, camera.position.z + 2); flocons.maj(T, .5, T < 14 ? .9 : .35);

  /* Titre, fondus, fin */
  lettres.forEach((l, k) => { l.style.opacity = ss(8 + k * .45, 10 + k * .45, T) * (1 - ss(16.5, 18.5, T)); });
  fonduNoir(Math.max(1 - ss(0, 2, T), ss(P8 + 17.5, P8 + 19.5, T)));
  finS.style.display = T > P8 + 19 ? 'flex' : 'none'; finS.style.opacity = ss(P8 + 19, P8 + 20.2, T) * (1 - ss(FIN - 1, FIN - .1, T));
  renderer.render(scene3d, camera);
} };
window.film.image(0);
}
