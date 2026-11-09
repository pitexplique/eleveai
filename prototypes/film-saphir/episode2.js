/* ============================================================
   SAPHIR — Partie 1, épisode 2 : « Le milieu du cercle »
   Le lendemain matin, dans la cabane. Collé après commun.js (film de Noël) par scripts/film-saphir.mjs.
   Tout est dans un bloc : aucun nom ne gêne commun.js, le modèle, ni l'épisode 1.
   Scénario : manim/film-saphir/episode-2-scenario.md
   Repère : la pièce va de x = -6 à 6, de z = -5 à 5, du plancher (y = 0) au plafond (y = 6).
   Cheminée au mur x = -6, lit contre le mur z = -5, table et fenêtre côté x = +6. Dehors : x > 6.
   ============================================================ */
{
racine.visible = false;
renderer.toneMappingExposure = 1.0;
const { A, F, clips, FIN } = frise(['@p1', 30, '@p2', 12, '@q1', 14, '@murs', 17, '@q2', 14, '@p3', 28,
  '@p4', 16, 'p4-loups', 2.5, 'p4-milieu', 14, '@p5', 28, 'p5-monde', 9, '@p6', 21.5, 'p6-poeme', 8, '@fin', 9]);
const P1 = A.p1, P2 = A.p2, Q1 = A.q1, MURS = A.murs, Q2 = A.q2, P3 = A.p3, P4 = A.p4, P5 = A.p5, P6 = A.p6, FINS = A.fin;
const APO = A['p6-poeme'], FPO = F['p6-poeme'];
const AL = A['p4-loups'], FL = F['p4-loups'], AM = A['p4-milieu'], FM = F['p4-milieu'], AW = A['p5-monde'], FW = F['p5-monde'];

const angleVers = (a, b) => Math.atan2(b.x - a.x, b.z - a.z);
const tourne = (a, b, u) => { let d = ((b - a + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI; return a + d * u; };
const dirAngle = h => Vx(Math.sin(h), 0, Math.cos(h));
const qY = h => new THREE.Quaternion().setFromAxisAngle(Vx(0, 1, 0), h);
const qX = a => new THREE.Quaternion().setFromAxisAngle(Vx(1, 0, 0), a);
const mondeDe = o => { const v = new THREE.Vector3(); o.getWorldPosition(v); return v; };
const hasard = hasardFixe(9);

/* ============================================================
   LA CABANE, DEDANS
   ============================================================ */
const rondin = feutre(0x8a5c37, { f: .8, freq: 9 }), rondinS = feutre(0x6e472a, { f: .8, freq: 9 }), sombre = feutre(0x3e2918, { f: .5 });
const planche = feutre(0x9b6c42, { f: .7, freq: 8 }), plancheS = feutre(0x7d5533, { f: .7, freq: 8 }), pierre = feutre(0x8b8782, { f: 1, freq: 6 }), pierreS = feutre(0x5f5b57, { f: 1, freq: 6 });
const R_R = .3, NB_R = 10;
/* les murs : des rondins couchés ; au mur de la fenêtre (x = 6), ceux qui la croisent sont coupés */
const FEN = { z0: 1.5, z1: 4.1, y0: 1.6, y1: 4.0 };
for (let i = 0; i < NB_R; i++) {
  const y = R_R + i * 2 * R_R, m = i % 2 ? rondin : rondinS;
  dur(scene3d, new THREE.CylinderGeometry(R_R, R_R, 12.6, 12).rotateZ(Math.PI / 2), m, [0, y, -5]);
  dur(scene3d, new THREE.CylinderGeometry(R_R, R_R, 12.6, 12).rotateZ(Math.PI / 2), m, [0, y, 5]);
  dur(scene3d, new THREE.CylinderGeometry(R_R, R_R, 10.6, 12).rotateX(Math.PI / 2), m, [-6, y + R_R, 0]);
  if (y + R_R > FEN.y0 && y - R_R < FEN.y1) {
    dur(scene3d, new THREE.CylinderGeometry(R_R, R_R, 6.5 + .3, 12).rotateX(Math.PI / 2), m, [6, y + R_R, (-5.3 + FEN.z0) / 2]);
    dur(scene3d, new THREE.CylinderGeometry(R_R, R_R, 5.3 - FEN.z1, 12).rotateX(Math.PI / 2), m, [6, y + R_R, (FEN.z1 + 5.3) / 2]);
  } else dur(scene3d, new THREE.CylinderGeometry(R_R, R_R, 10.6, 12).rotateX(Math.PI / 2), m, [6, y + R_R, 0]);
}
/* le cadre de la fenêtre et son appui */
for (const [w, h, d, x, y, z] of [[.5, .16, FEN.z1 - FEN.z0 + .3, 5.9, FEN.y0 - .05, (FEN.z0 + FEN.z1) / 2], [.4, .14, FEN.z1 - FEN.z0 + .3, 5.95, FEN.y1 + .05, (FEN.z0 + FEN.z1) / 2],
  [.4, FEN.y1 - FEN.y0, .14, 5.95, (FEN.y0 + FEN.y1) / 2, FEN.z0 - .05], [.4, FEN.y1 - FEN.y0, .14, 5.95, (FEN.y0 + FEN.y1) / 2, FEN.z1 + .05],
  [.12, FEN.y1 - FEN.y0, .07, 6.0, (FEN.y0 + FEN.y1) / 2, (FEN.z0 + FEN.z1) / 2], [.12, .07, FEN.z1 - FEN.z0, 6.0, (FEN.y0 + FEN.y1) / 2 + .2, (FEN.z0 + FEN.z1) / 2]]) dur(scene3d, new THREE.BoxGeometry(w, h, d), sombre, [x, y, z]);
/* plancher, plafond, poutres */
for (let i = 0; i < 12; i++) dur(scene3d, new THREE.BoxGeometry(12.2, .12, .86), i % 2 ? planche : plancheS, [0, -.06, -5.2 + i * .9 + .45]);
dur(scene3d, new THREE.BoxGeometry(12.4, .2, 10.4), plancheS, [0, 6.2, 0]);
for (const x of [-4, 0, 4]) dur(scene3d, new THREE.CylinderGeometry(.24, .24, 10.4, 10).rotateX(Math.PI / 2), rondin, [x, 5.8, 0]);
/* un tapis rouge devant la cheminée */
dur(scene3d, new THREE.CylinderGeometry(1.5, 1.5, .04, 30).scale(1, 1, .7), feutre(0x9a3a2c, { f: 1.2, freq: 30 }), [-3.6, .02, -.4]);

/* La cheminée de pierre, au mur x = -6, centrée en z = -0.5 */
const CZ = -.5;
dur(scene3d, new THREE.BoxGeometry(1.1, 3.0, .7), pierre, [-5.45, 1.5, CZ - 1.45]);
dur(scene3d, new THREE.BoxGeometry(1.1, 3.0, .7), pierre, [-5.45, 1.5, CZ + 1.45]);
dur(scene3d, new THREE.BoxGeometry(1.2, .65, 3.6), pierreS, [-5.4, 3.1, CZ]);
dur(scene3d, new THREE.BoxGeometry(1.0, 2.9, 3.1), pierre, [-5.5, 4.85, CZ]);
dur(scene3d, new THREE.BoxGeometry(.3, 2.8, 2.3), feutre(0x2a201b, { f: .6 }), [-5.85, 1.4, CZ]);
dur(scene3d, new THREE.BoxGeometry(1.6, .16, 3.8), pierreS, [-5.25, .08, CZ]);
dur(scene3d, new THREE.BoxGeometry(.3, .16, 3.9), feutre(0x6b4a33, { f: .6 }), [-4.75, 3.5, CZ]); /* le manteau de bois */
/* le feu : des bûches, des flammes (sans lumière propre : elles brillent), des braises */
const buche = feutre(0x5a3a22, { f: .8, freq: 14 });
for (const [r, x, z] of [[-.3, -5.4, CZ - .2], [.35, -5.35, CZ + .25]]) dur(scene3d, new THREE.CylinderGeometry(.14, .16, 1.3, 10).rotateZ(Math.PI / 2).rotateY(r), buche, [x, .32, z]);
const flammes = [[0, 1.0, .5, 'rgba(255,130,40,1)'], [-.28, .75, .38, 'rgba(255,170,60,1)'], [.3, .8, .4, 'rgba(255,110,30,1)'], [.05, .6, .3, 'rgba(255,225,140,1)'], [-.1, .42, .24, 'rgba(255,245,200,1)'], [.18, .5, .26, 'rgba(255,200,90,1)']].map(([dz, h, r, c]) => {
  const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: rondDoux(c, c.replace(/[\d.]+\)$/, '0)')), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  m.position.set(-5.3, .42 + h / 2, CZ + dz); m.scale.set(r, h, 1); scene3d.add(m); return { m, h, r };
});
const lueurFeu = new THREE.Sprite(new THREE.SpriteMaterial({ map: rondDoux('rgba(255,170,80,1)', 'rgba(255,120,40,0)'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
lueurFeu.position.set(-5.2, .8, CZ); lueurFeu.scale.setScalar(2.6); scene3d.add(lueurFeu);
const feuL = new THREE.PointLight(0xff9a4a, 30, 26, 1.5); feuL.position.set(-4.7, 1.1, CZ); scene3d.add(feuL);

/* Le lit, près de la cheminée, contre le mur z = -5 */
const LIT = { x0: -5.2, x1: -2.4, z0: -4.85, z1: -2.95, haut: 1.0 };
const litG = new THREE.Group(); scene3d.add(litG);
dur(litG, new THREE.BoxGeometry(LIT.x1 - LIT.x0, .5, LIT.z1 - LIT.z0), planche, [(LIT.x0 + LIT.x1) / 2, .45, (LIT.z0 + LIT.z1) / 2]);
for (const x of [LIT.x0, LIT.x1]) for (const z of [LIT.z0, LIT.z1]) dur(litG, new THREE.BoxGeometry(.18, .7, .18), sombre, [x, .35, z]);
dur(litG, new THREE.BoxGeometry(.16, 1.5, LIT.z1 - LIT.z0 + .1), planche, [LIT.x0 - .05, .95, (LIT.z0 + LIT.z1) / 2]);
dur(litG, new THREE.BoxGeometry(LIT.x1 - LIT.x0 - .1, .3, LIT.z1 - LIT.z0 - .1), feutre(0xe8dcc4, { f: .9, freq: 20 }), [(LIT.x0 + LIT.x1) / 2, .85, (LIT.z0 + LIT.z1) / 2]);
dur(litG, ell(.42, .16, .62), feutre(0xf3ece0, { f: .8, freq: 24 }), [LIT.x0 + .5, 1.08, (LIT.z0 + LIT.z1) / 2]);
const peauLit = dur(litG, ell(1.15, .22, .95), feutre(0x9b8466, { f: 1.2, freq: 36 }), [-3.25, 1.12, (LIT.z0 + LIT.z1) / 2]);

/* La table, la chaise, le tabouret, le coffre sous la fenêtre */
const TABLE = { x0: 2.4, x1: 5.6, z0: -2.3, z1: -.9, haut: 1.6 };
dur(scene3d, new THREE.BoxGeometry(TABLE.x1 - TABLE.x0, .14, TABLE.z1 - TABLE.z0), planche, [(TABLE.x0 + TABLE.x1) / 2, TABLE.haut - .07, (TABLE.z0 + TABLE.z1) / 2]);
for (const x of [TABLE.x0 + .15, TABLE.x1 - .15]) for (const z of [TABLE.z0 + .15, TABLE.z1 - .15]) dur(scene3d, new THREE.BoxGeometry(.14, TABLE.haut - .14, .14), sombre, [x, (TABLE.haut - .14) / 2, z]);
const CHAISE = Vx(4.0, 0, -3.05);
{ const c = new THREE.Group(); c.position.copy(CHAISE); scene3d.add(c);
  dur(c, new THREE.BoxGeometry(1.0, .12, .9), planche, [0, 1.14, -.05]);
  for (const x of [-.42, .42]) for (const z of [-.42, .32]) dur(c, new THREE.BoxGeometry(.1, 1.14, .1), sombre, [x, .57, z]);
  for (const x of [-.42, .42]) dur(c, new THREE.BoxGeometry(.1, 1.4, .1), sombre, [x, 1.85, -.47]);
  dur(c, new THREE.BoxGeometry(.95, .5, .08), planche, [0, 2.3, -.47]); }
const tabouret = new THREE.Group(); scene3d.add(tabouret);
dur(tabouret, new THREE.CylinderGeometry(.34, .34, .1, 16), planche, [0, 1.2, 0]);
for (let k = 0; k < 3; k++) { const a = k * 2.094; const p = dur(tabouret, new THREE.CylinderGeometry(.045, .055, 1.2, 8), sombre, [Math.sin(a) * .22, .6, Math.cos(a) * .22]); p.rotation.set(Math.cos(a) * .1, 0, -Math.sin(a) * .1); }
const TAB_DEPART = Vx(2.55, 0, -3.4), TAB_ICI = Vx(2.85, 0, -2.45);
const COFFRE = { x0: 4.85, x1: 5.8, z0: 2.0, z1: 3.6, haut: 1.1 };
dur(scene3d, new THREE.BoxGeometry(COFFRE.x1 - COFFRE.x0, COFFRE.haut, COFFRE.z1 - COFFRE.z0), planche, [(COFFRE.x0 + COFFRE.x1) / 2, COFFRE.haut / 2, (COFFRE.z0 + COFFRE.z1) / 2]);
for (const z of [COFFRE.z0 + .15, COFFRE.z1 - .15]) dur(scene3d, new THREE.BoxGeometry(COFFRE.x1 - COFFRE.x0 + .04, COFFRE.haut + .02, .08), sombre, [(COFFRE.x0 + COFFRE.x1) / 2, COFFRE.haut / 2, z]);
dur(scene3d, ell(.42, .1, .7), feutre(0x7d6648, { f: 1.2, freq: 40 }), [5.35, COFFRE.haut + .02, 2.8]); /* une peau pliée dessus */
/* une étagère, des livres, la chapka pendue à un clou, la lanterne */
dur(scene3d, new THREE.BoxGeometry(2.4, .1, .45), planche, [-.6, 3.4, -4.62]);
for (let k = 0; k < 9; k++) { const h = .5 + hasard() * .3; dur(scene3d, new THREE.BoxGeometry(.13, h, .38), feutre([0x7a2e2a, 0x2e4a6b, 0x4a6b3a, 0x8a6a2e, 0x5a3a5a][k % 5], { f: .6 }), [-1.6 + k * .17, 3.45 + h / 2, -4.6]).rotation.z = k === 8 ? -.3 : 0; }
{ const ch = new THREE.Group(); ch.position.set(1.2, 3.6, -4.55); scene3d.add(ch); const cm = feutre(0x8a7a66, { f: 1.3, freq: 36 });
  dur(ch, new THREE.CylinderGeometry(.6, .63, .45, 22), cm, [0, 0, 0]); dur(ch, ell(.6, .18, .6), cm, [0, .22, 0]); for (const s of [-1, 1]) dur(ch, ell(.14, .3, .26), cm, [s * .56, -.3, -.02]); ch.rotation.x = .25; ch.scale.setScalar(.9); }

/* ---------- Ce qui est posé sur la table ---------- */
/* Le cahier ouvert : à gauche (vu de la chaise) les calculs, à droite le dessin du cercle */
const CAHIER = Vx(3.45, TABLE.haut + .012, -1.6), CL = 2.0, CH = 1.3, PXU = 2048 / CL;
const ETAT_CAHIER = { cercle: 0, rayons: 0, r: 0, lueur: 0 };
let cleCahier = '';
const R_PAGE = .3, C_PAGE = { u: .74, v: .6 }; /* le centre du dessin, en fraction de la page */
const uvVersMonde = (u, v) => Vx(CAHIER.x - (u - .5) * CL, CAHIER.y + .004, CAHIER.z + (.5 - v) * CH);
const CENTRE_DESSIN = uvVersMonde(C_PAGE.u, C_PAGE.v);
const ANG_LOUP = k => -Math.PI / 2 + k * Math.PI / 4 + .2;
const surCercle = (a, r = R_PAGE) => CENTRE_DESSIN.clone().add(Vx(-Math.cos(a) * r, 0, -Math.sin(a) * r)); /* même sens que le dessin du canevas */
function ecrireMain(g, txt, x, y, taille, couleur = '#27324a', ang = 0) { g.save(); g.translate(x, y); g.rotate(ang); g.fillStyle = couleur; g.font = `${taille}px "Segoe Print","Comic Sans MS",cursive`; g.fillText(txt, 0, 0); g.restore(); }
function fleche(g, x0, y0, x1, y1, ep = 5) { g.lineWidth = ep; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); const a = Math.atan2(y1 - y0, x1 - x0); g.beginPath(); g.moveTo(x1, y1); g.lineTo(x1 - 26 * Math.cos(a - .45), y1 - 26 * Math.sin(a - .45)); g.moveTo(x1, y1); g.lineTo(x1 - 26 * Math.cos(a + .45), y1 - 26 * Math.sin(a + .45)); g.stroke(); }
const cahier = planEcrit(CL, CH, 2048, (g, w, h) => {
  g.fillStyle = '#f6efdc'; g.fillRect(0, 0, w, h);
  g.strokeStyle = 'rgba(90,120,170,.25)'; g.lineWidth = 2; for (let y = 90; y < h; y += 62) { g.beginPath(); g.moveTo(30, y); g.lineTo(w - 30, y); g.stroke(); }
  const pli = g.createLinearGradient(w / 2 - 50, 0, w / 2 + 50, 0); pli.addColorStop(0, 'rgba(0,0,0,0)'); pli.addColorStop(.5, 'rgba(70,45,20,.35)'); pli.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = pli; g.fillRect(w / 2 - 50, 0, 100, h);
  /* page de gauche : les calculs (lisibles en gros plan) */
  g.strokeStyle = '#27324a'; g.fillStyle = '#27324a';
  ecrireMain(g, '8 loups', 90, 150, 74);
  for (let k = 0; k < 8; k++) { g.lineWidth = 6; g.beginPath(); g.moveTo(420 + k * 32 + (k === 4 ? 0 : 0), 95); g.lineTo(420 + k * 32, 160); g.stroke(); }
  ecrireMain(g, '360° ÷ 8 = 45°', 90, 300, 78);
  ecrireMain(g, 'rayon : r ≈ 4 pas', 90, 440, 74);
  ecrireMain(g, 'P = 2 × π × r', 90, 580, 78);
  ecrireMain(g, '≈ 2 × 3,14 × 4 ≈ 25 pas', 130, 690, 64);
  g.strokeStyle = '#7a3a2a'; ecrireMain(g, 'nord', 770, 120, 52, '#7a3a2a'); fleche(g, 930, 250, 930, 90);
  ecrireMain(g, 'vent', 110, 870, 52, '#7a3a2a'); fleche(g, 270, 852, 520, 852);
  /* page de droite : le dessin, de mémoire */
  const cx = C_PAGE.u * w, cy = C_PAGE.v * h, R = R_PAGE * PXU;
  ecrireMain(g, 'hier soir', w / 2 + 90, 140, 60);
  g.fillStyle = '#27324a';
  for (let k = 0; k < 8; k++) { const a = ANG_LOUP(k); g.beginPath(); g.arc(cx + Math.cos(a) * R, cy + Math.sin(a) * R, 16, 0, 7); g.fill(); }
  g.fillStyle = '#1557d6'; g.beginPath(); g.arc(cx, cy, 19, 0, 7); g.fill();
  /* les traits du milieu vers chaque loup, puis le cercle au compas */
  g.strokeStyle = 'rgba(39,50,74,.75)'; g.lineWidth = 4;
  for (let k = 0; k < 8; k++) { const f = Math.min(1, Math.max(0, ETAT_CAHIER.rayons - k)); if (f <= 0) continue; const a = ANG_LOUP(k);
    g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a) * R * f, cy + Math.sin(a) * R * f); g.stroke(); }
  if (ETAT_CAHIER.r > 0) { g.globalAlpha = ETAT_CAHIER.r; ecrireMain(g, 'r', cx + Math.cos(ANG_LOUP(1)) * R * .5 + 14, cy + Math.sin(ANG_LOUP(1)) * R * .5 - 8, 64); g.globalAlpha = 1; }
  if (ETAT_CAHIER.lueur > 0) { g.save(); g.globalCompositeOperation = 'lighter';
    for (let k = -1; k < 8; k++) { const a = ANG_LOUP(Math.max(0, k)), x = k < 0 ? cx : cx + Math.cos(a) * R, y = k < 0 ? cy : cy + Math.sin(a) * R, rr = (k < 0 ? 95 : 60) * ETAT_CAHIER.lueur;
      const gr = g.createRadialGradient(x, y, 2, x, y, rr); gr.addColorStop(0, k < 0 ? 'rgba(90,150,255,.9)' : 'rgba(255,215,140,.8)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.beginPath(); g.arc(x, y, rr, 0, 7); g.fill(); }
    g.restore(); }
  if (ETAT_CAHIER.cercle > 0) { g.strokeStyle = '#27324a'; g.lineWidth = 6; g.beginPath(); g.arc(cx, cy, R, ANG_LOUP(0), ANG_LOUP(0) + ETAT_CAHIER.cercle * Math.PI * 2); g.stroke(); }
});
cahier.rotation.set(-Math.PI / 2, 0, Math.PI); cahier.position.copy(CAHIER); scene3d.add(cahier);
dur(scene3d, new THREE.BoxGeometry(CL + .06, .02, CH + .05), feutre(0x6b2e22, { f: .5 }), [CAHIER.x, CAHIER.y - .012, CAHIER.z]);
function majCahier(e) { const k = `${e.cercle.toFixed(3)}|${e.rayons.toFixed(3)}|${e.r.toFixed(2)}|${e.lueur.toFixed(2)}`; if (k === cleCahier) return; cleCahier = k; Object.assign(ETAT_CAHIER, e); cahier.dessiner(); }
/* Le crayon, la règle, le compas, la lampe à huile, le bol */
const crayon = new THREE.Group(); scene3d.add(crayon);
dur(crayon, new THREE.CylinderGeometry(.018, .018, .32, 8), feutre(0xd9a53a, { f: .3 }), [0, .16, 0]); dur(crayon, new THREE.ConeGeometry(.018, .05, 8).rotateX(Math.PI), feutre(0xe8c9a0, { f: .3 }), [0, -.025, 0]);
const CRAYON_POSE = Vx(4.25, TABLE.haut + .02, -1.45);
dur(scene3d, new THREE.BoxGeometry(.9, .02, .1), feutre(0xc9a26a, { f: .4 }), [4.6, TABLE.haut + .01, -1.2]).rotation.y = .25;
const compas = new THREE.Group(); scene3d.add(compas);
const brasC = [0, 1].map(() => { const b = new THREE.Group(); compas.add(b); dur(b, new THREE.CylinderGeometry(.012, .008, .3, 6), feutre(0x9aa3ad, { f: .1, metalness: .6, roughness: .4 }), [0, -.15, 0]); return b; });
dur(compas, new THREE.SphereGeometry(.03, 10, 8), feutre(0x6b7480, { f: .1, metalness: .6, roughness: .4 }), [0, 0, 0]);
dur(compas, new THREE.CylinderGeometry(.012, .012, .07, 6), feutre(0x6b7480, { f: .1 }), [0, .045, 0]);
const COMPAS_POSE = Vx(4.7, TABLE.haut + .03, -1.55);
/* ouvre le compas : pointe en P, mine en M (sur la table), charnière au-dessus */
function poserCompas(P, M) {
  const mil = P.clone().lerp(M, .5), d = P.distanceTo(M), haut = Math.sqrt(Math.max(.0001, .3 * .3 - (d / 2) ** 2));
  compas.position.copy(mil).add(Vx(0, haut, 0)); compas.rotation.set(0, Math.atan2(M.x - P.x, M.z - P.z) + Math.PI / 2, 0);
  const a = Math.asin(Math.min(1, d / 2 / .3)); brasC[0].rotation.set(0, 0, a); brasC[1].rotation.set(0, 0, -a);
}
const lampe = new THREE.Group(); lampe.position.set(5.2, TABLE.haut, -1.25); scene3d.add(lampe);
dur(lampe, new THREE.CylinderGeometry(.16, .2, .18, 16), feutre(0x8a6a2e, { f: .3, metalness: .4, roughness: .5 }), [0, .09, 0]);
const verreL = new THREE.Mesh(new THREE.SphereGeometry(.17, 16, 12).scale(1, 1.4, 1), new THREE.MeshBasicMaterial({ color: 0xffd08a, transparent: true, opacity: .55 })); verreL.position.y = .42; lampe.add(verreL);
const lampeL = new THREE.PointLight(0xffc27a, 7, 9, 1.6); lampeL.position.set(5.2, TABLE.haut + .5, -1.25); scene3d.add(lampeL);
const bol = new THREE.Group(); scene3d.add(bol);
dur(bol, new THREE.SphereGeometry(.17, 16, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), feutre(0x5d7a8a, { f: .3, side: THREE.DoubleSide }), [0, .17, 0]);
dur(bol, new THREE.CylinderGeometry(.15, .15, .01, 16), feutre(0xe9dcc0, { f: .5 }), [0, .14, 0]);
const BOL_POSE = Vx(2.75, TABLE.haut, -1.15);
const vapeur = Array.from({ length: 6 }, () => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: rondDoux('rgba(255,255,255,.5)', 'rgba(255,255,255,0)'), transparent: true, depthWrite: false })); scene3d.add(s); return s; });

/* ---------- Au mur de la fenêtre : les feuilles de ses recherches (formules lisibles) ---------- */
const FEUILLES = [
  ['Les ombres', (g, w, h) => {
    g.strokeStyle = '#27324a'; g.lineWidth = 7; g.beginPath(); g.moveTo(150, 640); g.lineTo(150, 420); g.stroke();
    g.strokeStyle = '#5a6b80'; g.lineWidth = 9; g.beginPath(); g.moveTo(150, 640); g.lineTo(760, 640); g.stroke();
    g.strokeStyle = '#d9a03a'; g.lineWidth = 4; g.setLineDash([16, 12]); g.beginPath(); g.moveTo(150, 420); g.lineTo(760, 640); g.stroke(); g.setLineDash([]);
    g.beginPath(); g.arc(760, 640, 120, Math.PI, Math.PI + .34, false); g.stroke();
    g.fillStyle = '#d9a03a'; g.beginPath(); g.arc(880, 240, 50, 0, 7); g.fill();
    ecrireMain(g, '1 m', 50, 540, 54); ecrireMain(g, 'ombre : 2,7 m', 290, 720, 54); ecrireMain(g, 'a', 600, 625, 54, '#b5701a');
    ecrireMain(g, 'tan a = 1 ÷ 2,7', 70, 880, 70); ecrireMain(g, 'a ≈ 20°', 70, 990, 70); ecrireMain(g, '= hauteur du soleil', 70, 1100, 52, '#7a3a2a');
  }],
  ['Le ciel', (g, w, h) => {
    const E = [[150, 520], [290, 480], [420, 520], [540, 590], [600, 720], [790, 700], [760, 560]];
    g.strokeStyle = 'rgba(39,50,74,.6)'; g.lineWidth = 4; g.beginPath(); E.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.lineTo(540, 590); g.stroke();
    g.fillStyle = '#27324a'; E.forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 14, 0, 7); g.fill(); });
    g.setLineDash([10, 12]); g.beginPath(); g.moveTo(790, 700); g.lineTo(810, 260); g.stroke(); g.setLineDash([]);
    g.fillStyle = '#1557d6'; g.beginPath(); g.arc(815, 240, 20, 0, 7); g.fill();
    ecrireMain(g, 'étoile polaire', 520, 200, 50, '#1557d6'); ecrireMain(g, 'Grande Ourse', 120, 420, 50);
    ecrireMain(g, 'hauteur de', 70, 880, 64); ecrireMain(g, "l'étoile polaire", 70, 970, 64); ecrireMain(g, '= latitude ≈ 68°', 70, 1080, 64);
  }],
  ['La chute d\'un glaçon', (g, w, h) => {
    g.fillStyle = '#9ec9ea'; for (let k = 0; k < 5; k++) { const t = k * .25, y = 300 + 9.8 / 2 * t * t * 90; g.beginPath(); g.moveTo(200, y - 26); g.lineTo(222, y + 26); g.lineTo(178, y + 26); g.closePath(); g.fill(); ecrireMain(g, `t = ${String(t).replace('.', ',')} s`, 280, y + 20, 40, '#5a6b80'); }
    g.strokeStyle = '#27324a'; g.lineWidth = 4; g.beginPath(); g.moveTo(130, 280); g.lineTo(130, 640); g.stroke();
    ecrireMain(g, 'd = ½ × g × t²', 70, 840, 74); ecrireMain(g, 'g ≈ 9,8 m/s²', 70, 960, 70); ecrireMain(g, 'plus il tombe, plus il va vite', 70, 1080, 42, '#7a3a2a');
  }],
  ['Le cercle', (g, w, h) => {
    g.strokeStyle = '#27324a'; g.lineWidth = 6; g.beginPath(); g.arc(500, 470, 230, 0, 7); g.stroke();
    g.lineWidth = 4; g.beginPath(); g.moveTo(500, 470); g.lineTo(730, 470); g.stroke(); g.fillStyle = '#27324a'; g.beginPath(); g.arc(500, 470, 10, 0, 7); g.fill();
    ecrireMain(g, 'r', 600, 450, 56);
    ecrireMain(g, 'P = 2 × π × r', 70, 860, 78); ecrireMain(g, 'π ≈ 3,14', 70, 990, 74);
  }]];
const feuilles = FEUILLES.map(([titre, dessin], k) => {
  const f = planEcrit(1.0, 1.25, 1024, (g, w, h) => { g.fillStyle = '#f3ead2'; g.fillRect(0, 0, w, h); g.strokeStyle = 'rgba(120,90,50,.35)'; g.lineWidth = 6; g.strokeRect(10, 10, w - 20, h - 20);
    ecrireMain(g, titre, 60, 120, titre.length > 14 ? 62 : 74, '#7a3a2a'); dessin(g, w, h); });
  f.position.set(5.66, 3.75 + (k % 2 ? -.06 : .05), -4.0 + k * 1.2); f.rotation.set(0, -Math.PI / 2, (k % 2 ? .03 : -.025)); scene3d.add(f);
  dur(scene3d, new THREE.SphereGeometry(.035, 8, 6), feutre(0xc0282d, { f: .1 }), [5.64, 3.75 + .55, -4.0 + k * 1.2]);
  return f;
});
const FEUILLE_P = k => Vx(5.66, 3.75, -4.0 + k * 1.2);

/* ---------- La vitre givrée : une tache claire qu'elle frotte, un cristal à six branches ---------- */
const VITRE = { l: FEN.z1 - FEN.z0, h: FEN.y1 - FEN.y0 };
const ETAT_VITRE = { clair: 0, cristal: 0 }; let cleVitre = '';
const TACHE = { z: 2.75, y: 2.45 }, CRISTAL = { z: 2.15, y: 3.35 };
const brins = []; { const h = hasardFixe(31); for (let i = 0; i < 70; i++) { const bord = h() * 4; let x, y; if (bord < 1) { x = h(); y = 0; } else if (bord < 2) { x = h(); y = 1; } else if (bord < 3) { x = 0; y = h(); } else { x = 1; y = h(); }
  brins.push({ x, y, a: Math.atan2(.5 - y, .5 - x) + (h() - .5) * 1.4, l: .08 + h() * .22, r: h() }); } }
function flocon(g, x, y, R, ep) { g.lineWidth = ep; g.lineCap = 'round';
  for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3, c = Math.cos(a), s = Math.sin(a); g.beginPath(); g.moveTo(x, y); g.lineTo(x + c * R, y + s * R); g.stroke();
    for (const f of [.4, .65]) for (const sg of [-1, 1]) { const bx = x + c * R * f, by = y + s * R * f, b = a + sg * Math.PI / 3, l = R * (f === .4 ? .32 : .22); g.beginPath(); g.moveTo(bx, by); g.lineTo(bx + Math.cos(b) * l, by + Math.sin(b) * l); g.stroke(); } } }
const vitreC = document.createElement('canvas'); vitreC.width = 1024; vitreC.height = Math.round(1024 * VITRE.h / VITRE.l);
const texV = new THREE.CanvasTexture(vitreC); texV.colorSpace = THREE.SRGBColorSpace;
const vitre = new THREE.Mesh(new THREE.PlaneGeometry(VITRE.l, VITRE.h), new THREE.MeshBasicMaterial({ map: texV, transparent: true, depthWrite: false, side: THREE.DoubleSide, color: 0xffffff }));
vitre.position.set(5.97, (FEN.y0 + FEN.y1) / 2, (FEN.z0 + FEN.z1) / 2); vitre.rotation.y = -Math.PI / 2; scene3d.add(vitre);
const versVitre = (z, y) => [(z - FEN.z0) / VITRE.l * vitreC.width, (FEN.y1 - y) / VITRE.h * vitreC.height];
function majVitre(e) {
  const k = `${e.clair.toFixed(3)}|${e.cristal.toFixed(3)}`; if (k === cleVitre) return; cleVitre = k; Object.assign(ETAT_VITRE, e);
  const g = vitreC.getContext('2d'), w = vitreC.width, h = vitreC.height; g.clearRect(0, 0, w, h);
  const fond = g.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, w * .75); fond.addColorStop(0, 'rgba(225,236,248,.62)'); fond.addColorStop(1, 'rgba(240,246,252,.95)'); g.fillStyle = fond; g.fillRect(0, 0, w, h);
  g.strokeStyle = 'rgba(255,255,255,.85)';
  for (const b of brins) { let x = b.x * w, y = b.y * h, a = b.a; g.lineWidth = 3 + b.r * 3; for (let s = 0; s < 6; s++) { const l = b.l * w / 6, nx = x + Math.cos(a) * l, ny = y + Math.sin(a) * l; g.beginPath(); g.moveTo(x, y); g.lineTo(nx, ny); g.stroke();
    for (const sg of [-1, 1]) { g.beginPath(); g.moveTo(nx, ny); g.lineTo(nx + Math.cos(a + sg * .9) * l * .5, ny + Math.sin(a + sg * .9) * l * .5); g.stroke(); } x = nx; y = ny; a += (Math.sin(s * 3 + b.r * 9)) * .25; } }
  if (e.clair > 0) { const [x, y] = versVitre(TACHE.z, TACHE.y); g.save(); g.globalCompositeOperation = 'destination-out';
    const r = 190 * e.clair, gr = g.createRadialGradient(x, y, r * .45, x, y, r); gr.addColorStop(0, 'rgba(0,0,0,.97)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.beginPath(); g.ellipse(x, y, r * 1.15, r, 0, 0, 7); g.fill(); g.restore(); }
  { const [x, y] = versVitre(CRISTAL.z, CRISTAL.y); g.strokeStyle = `rgba(255,255,255,${.75 + .25 * e.cristal})`; flocon(g, x, y, 78, 6 + 3 * e.cristal);
    if (e.cristal > 0) { g.strokeStyle = `rgba(255,236,180,${e.cristal})`; flocon(g, x, y, 78, 4); } }
  texV.needsUpdate = true;
}
const eclatCristal = new THREE.Sprite(new THREE.SpriteMaterial({ map: rondDoux('rgba(255,240,200,1)', 'rgba(255,220,150,0)'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
eclatCristal.position.set(5.9, CRISTAL.y, CRISTAL.z); scene3d.add(eclatCristal);

/* ============================================================
   DEHORS : la neige, la colline, les loups assis, le traîneau, les chiens couchés
   ============================================================ */
const COLL = Vx(27, 0, 4.5);
function Hd(x, z) { const dc = Math.hypot(x - COLL.x, z - COLL.z); return -.45 + 2.6 * Math.exp(-dc * dc / 110) + .12 * Math.sin(x * .3) * Math.cos(z * .25) + ss(40, 110, Math.hypot(x - 20, z)) * 4; }
const neige = feutre(0xeef3fb, { f: .42, freq: 9 });
{ const geo = new THREE.PlaneGeometry(300, 300, 200, 200), p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) p.setZ(i, Hd(p.getX(i) + 60, -p.getY(i)));
  geo.computeVertexNormals(); const sol = new THREE.Mesh(geo, neige); sol.rotation.x = -Math.PI / 2; sol.position.set(60, 0, 0); sol.receiveShadow = true; scene3d.add(sol); }
for (const [x, z, h] of [[18, -12, 6], [22, -16, 7.5], [36, -9, 7], [40, -2, 6], [42, 14, 8], [33, 18, 6.5], [20, 20, 7], [50, 6, 9], [14, 14, 5.5], [55, -14, 8]]) { const s = creerSapin(scene3d, x, z, h); s.position.y = Hd(x, z) - .1; }
/* la neige collée contre la cabane, dehors, sous la fenêtre */
dur(scene3d, ell(1.4, .7, 6), neige, [6.6, -.2, 0]);
/* ciel du matin */
const fondCiel = fondDegrade([0, '#8fb2d8'], [.6, '#dbe4ee'], [1, '#f6dcc2']); scene3d.background = fondCiel;
scene3d.fog = new THREE.FogExp2(0xf0e6dc, .011);
const hemi = new THREE.HemisphereLight(0xcfdcec, 0x9b7a58, .55); scene3d.add(hemi);
const soleil = new THREE.DirectionalLight(0xffe6c4, 2.6); soleil.castShadow = true; soleil.shadow.mapSize.set(4096, 4096);
Object.assign(soleil.shadow.camera, { left: -18, right: 18, top: 18, bottom: -18, near: 1, far: 120 }); soleil.shadow.bias = -.0006; scene3d.add(soleil, soleil.target);
const DIR_SOLEIL = Vx(1, .32, .3).normalize();
soleil.target.position.set(4, 0, 1); soleil.position.copy(soleil.target.position).addScaledVector(DIR_SOLEIL, 50);
const disque = new THREE.Sprite(new THREE.SpriteMaterial({ map: rondDoux('rgba(255,236,200,1)', 'rgba(255,200,140,0)'), fog: false, depthWrite: false, blending: THREE.AdditiveBlending, transparent: true }));
disque.scale.setScalar(26); disque.position.set(6, 0, 2).addScaledVector(DIR_SOLEIL, 180); scene3d.add(disque);
/* un rai de soleil dans la pièce : un voile très léger dans l'axe de la fenêtre */
const rai = new THREE.Mesh(new THREE.BoxGeometry(9, VITRE.h * .9, VITRE.l * .8), new THREE.MeshBasicMaterial({ color: 0xffe2b0, transparent: true, opacity: .045, depthWrite: false, blending: THREE.AdditiveBlending }));
rai.position.set(6, (FEN.y0 + FEN.y1) / 2, (FEN.z0 + FEN.z1) / 2).addScaledVector(DIR_SOLEIL, -4.5); rai.lookAt(rai.position.clone().add(DIR_SOLEIL)); rai.rotateY(Math.PI / 2); scene3d.add(rai);

/* ---------- Chiens et loups : un même quadrupède (repris de l'épisode 1) ---------- */
function creerBete(par, { pelage = 0x4a4e57, ventre = 0xf1efe8, iris = 0x6aa8d8, oreilles = .25, echelle = 1, queueEnRond = true, tache = null, harnais = null } = {}) {
  const M = { p: feutre(pelage, { f: 1.1, freq: 26 }), v: feutre(ventre, { f: 1.1, freq: 26 }), n: feutre(0x15151a, { f: .05 }), i: feutre(iris, { f: .02 }), h: harnais ? feutre(harnais, { f: .5 }) : null };
  const g = new THREE.Group(); g.scale.setScalar(echelle); par.add(g);
  const corps = new THREE.Group(); g.add(corps);
  dur(corps, ell(.36, .36, .7), M.p, [0, .02, .48]); dur(corps, ell(.3, .26, .62), M.v, [0, -.1, .5]);
  dur(corps, ell(.35, .4, .4), M.p, [0, .08, .98]); dur(corps, ell(.27, .3, .3), M.v, [0, -.05, 1.15]);
  const hanche = dur(corps, ell(.33, .33, .36), M.p, [0, -.02, .02]);
  if (M.h) dur(corps, new THREE.TorusGeometry(.38, .045, 8, 20), M.h, [0, .08, .9]);
  const cou = new THREE.Group(); cou.position.set(0, .3, 1.15); corps.add(cou);
  dur(cou, ell(.24, .3, .26), M.p, [0, .08, .05]);
  const tt = new THREE.Group(); tt.position.set(0, .32, .18); cou.add(tt);
  dur(tt, ell(.29, .27, .33), M.p); dur(tt, ell(.22, .16, .2), M.v, [0, -.1, .14]);
  dur(tt, ell(.13, .12, .26), M.v, [0, -.08, .34]); dur(tt, new THREE.SphereGeometry(.065, 12, 8), M.n, [0, -.03, .6]);
  if (tache) dur(tt, ell(.1, .05, .12), feutre(tache, { f: .9, freq: 30 }), [0, .2, .2]).rotation.x = -.4;
  const paupieres = [];
  for (const s of [-1, 1]) {
    const o = dur(tt, new THREE.ConeGeometry(.1, oreilles, 10), M.p, [s * .16, .3, -.05]); o.rotation.z = -s * .25;
    dur(tt, new THREE.SphereGeometry(.05, 10, 8), M.i, [s * .13, .07, .25]); dur(tt, new THREE.SphereGeometry(.026, 8, 6), M.n, [s * .135, .07, .29]);
    paupieres.push(dur(tt, new THREE.SphereGeometry(.056, 10, 8), M.p, [s * .13, .07, .25]));
  }
  const pattes = [[-.17, .02, .98], [.17, .02, .98], [-.19, -.05, .05], [.19, -.05, .05]].map(([x, y, z]) => {
    const pv = new THREE.Group(); pv.position.set(x, y, z); corps.add(pv);
    const os = dur(pv, new THREE.CylinderGeometry(.075, .06, 1, 10), M.p, [0, -.5, 0]); const pa = dur(pv, ell(.09, .06, .13), M.v, [0, -1, .04]);
    return { pv, os, pa };
  });
  const queue = new Tube(corps, u => .13 * (1 - u * .6), M.p, { seg: 14, rad: 10, trait: null });
  const HAUT = .95;
  return { g, tt, poser({ assis = 0, tY = 0, tX = 0, couche = 0, dort = 0 } = {}) {
    const inc = -.72 * assis, hy = L(HAUT, .42, assis) - couche * .35;
    corps.position.set(0, hy, -.5); corps.rotation.x = inc + couche * .05;
    cou.rotation.x = -inc * .9 + tX; cou.rotation.y = tY;
    hanche.scale.setScalar(1 + assis * .35);
    paupieres.forEach(p => { p.visible = dort > .5; });
    pattes.forEach(({ pv, os, pa }, i) => {
      const avant = i < 2; let rx = 0, l = 1;
      if (avant) { const hE = hy + Math.sin(-inc) * .98 + Math.cos(-inc) * .02; l = Math.max(.6, hE / .98); rx += -inc - couche * 1.3; }
      else rx += L(0, -1.0 - inc, assis) - couche * 1.2;
      pv.rotation.x = rx; os.scale.y = l; os.position.y = -.5 * l; pa.position.y = -l; pa.position.z = avant ? .04 : .04 + assis * .1;
    });
    queue.maj(queueEnRond ? [Vx(0, .1, -.3), Vx(0, .45, -.48), Vx(0, .7, -.3), Vx(.05, .6, -.05)]
      : [Vx(0, .1, -.3), Vx(0, -.1 - assis * .1, -.6), Vx(0, -.45, -.72 + assis * .3), Vx(0, -.7, -.62 + assis * .45)]);
  } };
}
/* le chien de tête, à l'intérieur, au pied du lit (celui qui portait la clochette) */
const chienTete = creerBete(scene3d, { pelage: 0xa8a49c, ventre: 0xf6f4ee, echelle: .78, harnais: 0xc0392b });
const CHIEN_P = Vx(-1.75, 0, -3.55);
chienTete.g.position.copy(CHIEN_P); chienTete.g.rotation.y = -2.0;
/* les cinq autres chiens, couchés dehors près du traîneau rangé */
const PELAGES = [[0x4a4e57, 0xf1efe8], [0x8a5a36, 0xf3e6d2], [0x5e6068, 0xf1efe8], [0x3a3b40, 0xf1efe8], [0x6b4a33, 0xf1e6d6]];
const chiens = PELAGES.map(([p, v], i) => { const c = creerBete(scene3d, { pelage: p, ventre: v, echelle: .78, harnais: 0xc0392b }); const x = 9 + (i % 3) * 1.6, z = -.5 + Math.floor(i / 3) * 2.2 + (i % 2) * .5;
  c.g.position.set(x, Hd(x, z), z); c.g.rotation.y = -1.2 + i * .7; c.poser({ couche: 1, assis: .2, tX: .25, dort: i % 2 }); return c; });
{ const t = new THREE.Group(); t.position.set(8.3, Hd(8.3, -3.5) + .1, -3.5); t.rotation.set(0, .2, -.95); scene3d.add(t); const b = feutre(0x9a6a3e, { f: .6, freq: 14 }), bs = feutre(0x5c3d24, { f: .6, freq: 14 });
  for (const s of [-1, 1]) dur(t, new THREE.BoxGeometry(.09, .1, 3.9), bs, [s * .62, .05, -.15]); dur(t, new THREE.BoxGeometry(1.35, .06, 2.9), b, [0, .58, .15]);
  for (const s of [-1, 1]) for (const z of [-1.2, -.3, .6, 1.5]) dur(t, new THREE.BoxGeometry(.07, .5, .07), b, [s * .62, .32, z]); }
/* la meute : huit loups assis en demi-cercle sur la colline, face à la cabane ; le chef plus sombre, une tache claire au front */
const VERS_CAB = Math.atan2(5.5 - COLL.x, 2.8 - COLL.z);
const loups = Array.from({ length: 8 }, (_, i) => {
  const l = creerBete(scene3d, i === 3 ? { pelage: 0x6e6f74, ventre: 0xd9d8d2, iris: 0xd9a03a, oreilles: .3, echelle: 1.02, queueEnRond: false, tache: 0xf2f1ec }
    : { pelage: [0xc8cac8, 0xbfc2c0, 0xd2d3cf, 0xb5b8b8][i % 4], ventre: 0xf2f1ec, iris: 0xd9a03a, oreilles: .3, echelle: .92 + (i % 3) * .04, queueEnRond: false });
  const a = VERS_CAB + Math.PI + (i - 3.5) * .3, p = COLL.clone().add(Vx(Math.sin(a) * 3.6, 0, Math.cos(a) * 3.6)); /* un arc tourné vers la cabane */
  l.g.position.set(p.x, Hd(p.x, p.z), p.z); l.g.rotation.y = angleVers(p, Vx(5.5, 0, 2.8)) + (i - 3.5) * .05; l.poser({ assis: 1, tX: .05 }); return l;
});

/* ============================================================
   LES PERSONNAGES
   ============================================================ */
/* Le vieil homme, sans chapka ni manteau : chandail de laine, lunettes au bout du nez */
const vieux = personnage(scene3d, { peau: 0xe0b394, cheveu: 0xe9e9ec, haut: 0x6d5a45, bas: 0x4a3a2c, chaussure: 0x2e2018, coiffure: 'court', echelle: 1.12, iris: 0x2f4a5e });
const barbeM = feutre(0xf1f1f3, { f: 1.2, freq: 36 });
dur(vieux.buste, new THREE.TorusGeometry(.3, .09, 10, 24).rotateX(Math.PI / 2), feutre(0x5a4a38, { f: 1.1, freq: 34 }), [0, 1.04, .02]);
dur(vieux.tt, ell(.4, .4, .3), barbeM, [0, -.55, .26]); dur(vieux.tt, ell(.2, .25, .2), barbeM, [0, -.85, .3]);
for (const s of [-1, 1]) { dur(vieux.tt, ell(.14, .25, .15), barbeM, [s * .4, -.25, .18]); const m = dur(vieux.tt, new THREE.CapsuleGeometry(.07, .22, 4, 8), barbeM, [s * .14, -.19, .5]); m.rotation.z = s * (Math.PI / 2 - .4); }
{ const lu = new THREE.Group(); vieux.tt.add(lu); const f = feutre(0x23262e, { f: .1 }); lu.position.set(0, -.04, .02);
  for (const s of [-1, 1]) { dur(lu, new THREE.TorusGeometry(.1, .014, 8, 24), f, [s * .2, .0, .56]); const v = new THREE.Mesh(new THREE.CircleGeometry(.09, 20), new THREE.MeshStandardMaterial({ color: 0xdfeeff, transparent: true, opacity: .15, roughness: .1 })); v.position.set(s * .2, .0, .565); lu.add(v); }
  dur(lu, new THREE.CylinderGeometry(.012, .012, .1, 6).rotateZ(Math.PI / 2), f, [0, .08, .56]); }
vieux.tt.traverse(o => { if (o.isMesh) o.castShadow = false; });

/* La petite fille : pieds nus, chandail de laine, l'écharpe rouge au cou */
const fille = personnage(scene3d, { peau: 0xf1c9aa, cheveu: 0x7a4a26, haut: 0xd8cfc0, bas: 0x8a7f6c, chaussure: 0xf1c9aa, coiffure: 'court', echelle: .5, iris: 0x1557d6 });
fille.tt.traverse(o => { if (o.isMesh && o.material.color && o.material.color.getHex() === new THREE.Color(0x1557d6).getHex()) { o.material.emissive = new THREE.Color(0x0b3db8); o.material.emissiveIntensity = .55; } });
const rouge = feutre(0xc0282d, { f: 1, freq: 50 });
dur(fille.buste, new THREE.TorusGeometry(.3, .12, 10, 24).rotateX(Math.PI / 2), rouge, [0, 1.12, .02]);
dur(fille.buste, ell(.12, .36, .06), rouge, [.16, .8, .46]).rotation.z = .1;

/* ---------- Des poses, et des clés [instant, position, cap, pose] entre lesquelles on glisse ---------- */
const POSES_F = {
  dort: { h: .9, kneeZ: .05, pg: Vx(-.15, 0, .05), pd: Vx(.15, 0, .05), mg: Vx(-.34, .55, .1), md: Vx(.34, .55, .1), tX: 0, lid: 1.2, sourire: .1, regX: -.2 },
  couchee: { h: .9, kneeZ: .05, pg: Vx(-.15, 0, .05), pd: Vx(.15, 0, .05), mg: Vx(-.34, .55, .1), md: Vx(.34, .55, .1), tX: 0, lid: -.55, sourire: 0, regX: -.25 },
  assiseLit: { h: .62, lean: -.05, kneeZ: .25, pg: Vx(-.2, .1, .75), pd: Vx(.2, .1, .75), mg: Vx(-.5, .7, .25), md: Vx(.5, .7, .25), tX: .05, lid: -.6, sourire: 0 },
  bord: { h: .62, lean: 0, kneeZ: .35, pg: Vx(-.2, -.45, .55), pd: Vx(.2, -.45, .55), mg: Vx(-.5, .68, .15), md: Vx(.5, .68, .15), tX: 0, lid: -.6, sourire: 0 },
  debout: { h: 1.15, lean: 0, kneeZ: .03, pg: Vx(-.22, 0, .02), pd: Vx(.22, 0, .02), mg: Vx(-.55, .95, .12), md: Vx(.55, .95, .12), tX: 0, lid: -.6, sourire: 0 },
  genoux: { h: .8, lean: .2, kneeZ: .5, pg: Vx(-.2, 0, -.62), pd: Vx(.2, 0, -.62), mg: Vx(-.45, .95, .35), md: Vx(.45, .95, .35), tX: -.05, lid: -.6, sourire: 0 },
  talons: { h: .62, lean: -.02, kneeZ: .5, pg: Vx(-.2, 0, -.45), pd: Vx(.2, 0, -.45), mg: Vx(-.2, .78, .5), md: Vx(.2, .78, .5), tX: .1, lid: -.6, sourire: .1 }
};
const POSES_V = {
  assis: { h: 1.07, lean: .25, kneeZ: .55, pg: Vx(-.25, 0, .55), pd: Vx(.25, 0, .55), mg: Vx(.45, 1.47, .62), md: Vx(-.05, 1.47, .98), tX: .45, lid: -.4, sourcil: .1, sourire: 0 },
  debout: { h: 1.15, lean: 0, kneeZ: .05, pg: Vx(-.22, 0, .02), pd: Vx(.22, 0, .02), mg: Vx(-.55, .9, .15), md: Vx(.55, .9, .15), tX: .05, lid: -.5, sourcil: .1, sourire: .15 }
};
const LIGNE_LIT = (LIT.z0 + LIT.z1) / 2;
const Q_COUCHEE = qY(Math.PI / 2).multiply(qX(-Math.PI / 2));
/* clés de la petite fille : [t, x, y, z, cap ou quaternion, pose, réglages en plus] */
const CLES_F = [
  [0, -3.44, LIT.haut + .17, LIGNE_LIT, Q_COUCHEE, 'dort'],
  [P1 + 12, -3.44, LIT.haut + .17, LIGNE_LIT, Q_COUCHEE, 'dort'],
  [P1 + 13.5, -3.44, LIT.haut + .17, LIGNE_LIT, Q_COUCHEE, 'couchee'],
  [P3 + 1, -3.44, LIT.haut + .17, LIGNE_LIT, Q_COUCHEE, 'couchee'],
  [P3 + 4, -3.95, LIT.haut - .29, LIGNE_LIT, Math.PI / 2, 'assiseLit'],
  [P3 + 6.5, -3.6, LIT.haut - .29, LIT.z1 - .15, 0, 'bord'],
  [P3 + 8.5, -3.6, 0, LIT.z1 + .45, .4, 'debout'],
  [P3 + 10, -2.6, 0, -1.8, 1.2, 'debout', { marche: 1 }],
  [P3 + 13, 0, 0, -1.55, 1.7, 'debout', { marche: 1 }],
  [P3 + 16, 1.9, 0, -2.0, 2.2, 'debout', { marche: 1 }],
  [P3 + 17.5, 2.35, 0, -2.5, 1.6, 'debout', { marche: 1 }],
  [P3 + 20, 2.35, 0, -2.5, 1.6, 'debout'],            /* elle attend, à côté de lui */
  [P3 + 23.5, 2.35, 0, -2.5, .4, 'debout'],            /* le tabouret arrive */
  [P3 + 25, 2.6, .6, -2.5, .1, 'bord', { mg: Vx(-.5, 1.1, .4), md: Vx(.5, 1.1, .4) }],
  [P3 + 26.5, TAB_ICI.x, 1.25 - .31, TAB_ICI.z, 0, 'bord'],
  [P5 + 3, TAB_ICI.x, 1.25 - .31, TAB_ICI.z, 0, 'bord'],
  [P5 + 4.5, 2.2, 0, -2.4, -1.2, 'debout'],
  [P5 + 6, 1.85, 0, -1.4, -.2, 'debout', { marche: 1 }],
  [P5 + 8, 2.1, 0, .4, .5, 'debout', { marche: 1 }],
  [P5 + 10.5, 3.9, 0, 2.1, 1.1, 'debout', { marche: 1 }],
  [P5 + 11.5, 4.5, 0, 2.75, Math.PI / 2, 'debout', { marche: 1 }],
  [P5 + 12.6, 4.7, .75, 2.8, Math.PI / 2, 'genoux', { mg: Vx(-.4, 1.4, .5), md: Vx(.4, 1.4, .5), lean: .5 }],
  [P5 + 13.6, 5.2, COFFRE.haut, 2.8, Math.PI / 2, 'genoux'],
  [P6 + 9, 5.2, COFFRE.haut, 2.8, Math.PI / 2, 'genoux'],
  [P6 + 10.5, 5.15, COFFRE.haut, 2.8, Math.PI / 2 - .5, 'talons'],
  [FIN + 10, 5.15, COFFRE.haut, 2.8, Math.PI / 2 - .5, 'talons']];
const P_V_ASSIS = CHAISE.clone().add(Vx(0, 0, .05)), DERRIERE = Vx(4.35, 0, 2.55);
const CLES_V = [
  [0, P_V_ASSIS.x, 0, P_V_ASSIS.z, 0, 'assis'],
  [P5 + 15, P_V_ASSIS.x, 0, P_V_ASSIS.z, 0, 'assis'],
  [P5 + 16.5, P_V_ASSIS.x, 0, P_V_ASSIS.z - .1, -.6, 'debout'],
  [P5 + 18, 2.6, 0, -3.3, -1.5, 'debout', { marche: 1 }],
  [P5 + 19.5, 1.5, 0, -2.6, -.9, 'debout', { marche: 1 }],
  [P5 + 21.5, 1.6, 0, -.2, .1, 'debout', { marche: 1 }],
  [P5 + 24, 3.4, 0, 1.9, .9, 'debout', { marche: 1 }],
  [P5 + 25.5, DERRIERE.x, 0, DERRIERE.z, Math.PI / 2, 'debout', { marche: 1 }],
  [P6 + 1, DERRIERE.x, 0, DERRIERE.z, Math.PI / 2, 'debout'],
  [P6 + 2, DERRIERE.x - .3, 0, DERRIERE.z - .3, -2.2, 'debout'],
  [P6 + 4, 2.4, 0, .1, -2.6, 'debout', { marche: 1 }],
  [P6 + 5.2, 2.1, 0, -.55, -2.9, 'debout', { marche: 1 }],
  [P6 + 6.6, 2.1, 0, -.55, -2.9, 'debout'],         /* il prend le bol */
  [P6 + 7.5, 2.3, 0, .1, .6, 'debout', { marche: 1 }],
  [P6 + 9.2, 4.05, 0, 2.15, 1.2, 'debout', { marche: 1 }],
  [P6 + 11.5, 4.05, 0, 2.15, 1.2, 'debout'],         /* il lui tend le bol */
  [P6 + 12.5, 3.8, 0, 1.7, -2.3, 'debout'],
  [P6 + 15.5, 1.6, 0, -.6, -2.7, 'debout', { marche: 1 }],
  [P6 + 17.5, 2.1, 0, -3.2, 1.6, 'debout', { marche: 1 }],
  [P6 + 19, P_V_ASSIS.x, 0, P_V_ASSIS.z - .1, .3, 'debout', { marche: 1 }],
  [P6 + 20.5, P_V_ASSIS.x, 0, P_V_ASSIS.z, 0, 'assis'],
  [FIN + 10, P_V_ASSIS.x, 0, P_V_ASSIS.z, 0, 'assis']];
function lerpPose(a, b, u) { const r = {}; for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) { const x = a[k] ?? b[k], y = b[k] ?? a[k];
  r[k] = x && x.isVector3 ? x.clone().lerp(y, u) : typeof x === 'number' ? L(x, y, u) : u < .5 ? x : y; } return r; }
function lireCles(CLES, POSES, T) {
  let i = 0; while (i < CLES.length - 2 && CLES[i + 1][0] <= T) i++;
  const a = CLES[i], b = CLES[i + 1], u = ss(a[0], b[0], T), marche = (a[6]?.marche || 0) * 0 + (b[6]?.marche || 0);
  const lin = Math.min(1, Math.max(0, (T - a[0]) / (b[0] - a[0])));
  const k = marche ? L(lin, u, .3) : u; /* en marchant, on avance d'un pas régulier */
  const p = Vx(L(a[1], b[1], k), L(a[2], b[2], u), L(a[3], b[3], k));
  const qa = a[4].isQuaternion ? a[4] : qY(a[4]), qb = b[4].isQuaternion ? b[4] : qY(b[4]);
  const q = qa.clone().slerp(qb, u);
  const pa = { ...POSES[a[5]], ...(a[6] || {}) }, pb = { ...POSES[b[5]], ...(b[6] || {}) }; delete pa.marche; delete pb.marche;
  return { p, q, P: lerpPose(pa, pb, u), marche: marche && T > a[0] && T < b[0] ? 1 : 0 };
}
const capDe = q => { const v = Vx(0, 0, 1).applyQuaternion(q); return Math.atan2(v.x, v.z); };
/* une main posée sur un point du monde */
const versLocal = (perso, w) => { perso.g.updateMatrixWorld(true); return perso.g.worldToLocal(w.clone()); };
const pas = (P, T, f = 5.6) => { const s = Math.sin(T * f); P.pg = Vx(-.21, Math.max(0, s) * .12, .02 + s * .26); P.pd = Vx(.21, Math.max(0, -s) * .12, .02 - s * .26); P.mg = Vx(-.56, .92, .15 - s * .16); P.md = Vx(.56, .92, .15 + s * .16); P.h -= Math.abs(s) * .03; };

/* ============================================================
   LES DEUX QUESTIONS-PAUSES (bonne réponse : C, puis A)
   ============================================================ */
const stQ = document.createElement('style');
stQ.textContent = `.carteS{position:fixed;left:50%;transform:translateX(-50%);bottom:40px;width:1240px;z-index:4;background:rgba(255,253,244,.96);border:6px solid #23304d;border-radius:36px;padding:26px 44px 22px;font-family:"Segoe Print","Comic Sans MS",cursive;color:#23304d;display:none;box-shadow:0 14px 50px #0006}
.carteS .q{font-size:52px;font-weight:700;text-align:center;margin-bottom:16px}.carteS .c{font-size:40px;font-weight:700;border:4px solid #23304d;border-radius:20px;padding:8px 26px;margin:10px 0;background:#fff;transition:none}
.carteS .c b{display:inline-block;width:62px}.carteS .c.bon{background:#c7f4a1;border-color:#2f9a3a}.carteS .c.pale{opacity:.3}
.carteS .r{height:22px;border-radius:11px;background:#e8e4d6;margin:16px 30px 4px;overflow:hidden}.carteS .r i{display:block;height:100%;background:#f5a50a}
.carteS .x{font-size:38px;text-align:center;margin-top:14px;color:#7a3a2a;display:none}
.pensee{position:fixed;z-index:4;font-family:"Segoe Print","Comic Sans MS",cursive;font-size:56px;font-weight:700;color:#23304d;background:#fffdf4;border:5px solid #23304d;border-radius:60px;padding:18px 46px;display:none}`;
document.head.append(stQ);
function carteS(question, choix, bonne, explication) {
  const el = document.createElement('div'); el.className = 'carteS';
  el.innerHTML = `<div class="q">${question}</div>${choix.map((c, i) => `<div class="c"><b>${'ABC'[i]}.</b>${c}</div>`).join('')}<div class="r"><i></i></div><div class="x">${explication}</div>`;
  document.body.append(el); const cases = [...el.querySelectorAll('.c')], r = el.querySelector('.r'), x = el.querySelector('.x');
  return { maj(vis, rebours, revele) { el.style.display = vis > 0 ? 'block' : 'none'; el.style.opacity = vis; if (!(vis > 0)) return;
    cases.forEach((c, i) => { c.className = 'c' + (revele ? (i === bonne ? ' bon' : ' pale') : ''); });
    r.style.display = revele ? 'none' : 'block'; r.firstChild.style.width = 100 * rebours + '%'; x.style.display = revele ? 'block' : 'none'; } };
}
const question1 = carteS('Elle se demande : les maths, ça sert à quoi ?', ["À faire des additions, c'est tout", "À rien, c'est juste pour l'école", 'À comprendre et à prévoir le monde'], 2,
  'Les maths décrivent le monde : les distances, les formes, le temps.');
const question2 = carteS('Et la physique, à quoi ça sert ?', ['À expliquer comment marche la nature : la lumière, les ombres, les chutes', 'À apprendre par cœur le nom des étoiles', 'À rien dans la vraie vie'], 0,
  "La physique explique la nature avec des formules : l'ombre donne la hauteur du soleil.");
const pensee = document.createElement('div'); pensee.className = 'pensee'; pensee.textContent = 'Ça sert à quoi, tout ça ?'; pensee.style.left = '120px'; pensee.style.top = '90px'; document.body.append(pensee);
const D_REB = 7, D_REV = 5; /* compte à rebours, puis réponse */

/* Titre et fin */
const st = document.createElement('style');
st.textContent = `#titreS{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;padding-top:150px;box-sizing:border-box;z-index:4;pointer-events:none;font-family:"Segoe UI Light","Segoe UI",sans-serif;font-weight:200;color:#2f6fc0;text-shadow:0 0 30px rgba(120,180,255,.75),0 0 4px #fff}
#titreS .t{font-size:170px;letter-spacing:.38em;padding-left:.38em}#titreS .s{font-size:52px;letter-spacing:.18em;margin-top:10px;color:#f4ead8;text-shadow:0 0 18px rgba(0,0,0,.6)}
#finS{position:fixed;inset:0;display:none;align-items:center;justify-content:center;flex-direction:column;z-index:6;font-family:"Segoe UI Light","Segoe UI",sans-serif;color:#cfe2ff}
#finS .e{font-size:44px;margin-top:70px;text-align:center;line-height:1.4;color:#f3e3b0;font-family:"Segoe Print","Comic Sans MS",cursive}
#poeme{position:fixed;left:0;right:0;bottom:80px;text-align:center;z-index:4;font-family:Georgia,"Times New Roman",serif;font-style:italic;font-size:58px;color:#fff8e6;text-shadow:0 2px 14px #000,0 0 4px #000;display:none;line-height:1.35}
#finS .t{font-size:120px;letter-spacing:.3em;font-weight:200;color:#6aa6ff;text-shadow:0 0 26px rgba(90,150,255,.7)}#finS .s{font-size:46px;letter-spacing:.2em;margin-top:24px;color:#cfd8e6}`;
document.head.append(st);
const titre = document.createElement('div'); titre.id = 'titreS'; titre.innerHTML = '<div class="t">SAPHIR</div><div class="s">Le milieu du cercle</div>'; document.body.append(titre);
const finS = document.createElement('div'); finS.id = 'finS'; finS.innerHTML = '<div class="t">SAPHIR</div><div class="s">à suivre</div><div class="e">Énigme pour la prochaine fois :<br>pourquoi un cristal de neige a-t-il toujours six branches ?</div>'; document.body.append(finS);
const phrase = document.createElement('div'); phrase.id = 'poeme'; phrase.innerHTML = 'Une enfant se réveille,<br>et voit un homme penché sur son cahier de physique,<br>pour comprendre le monde.'; document.body.append(phrase);
const poeme = document.createElement('div'); poeme.id = 'poeme'; poeme.innerHTML = 'Le monde est un grand livre.<br>Et les maths, c’est l’alphabet pour le lire.'; document.body.append(poeme);

/* ============================================================
   LA CAMÉRA
   ============================================================ */
const PLANS = [
  /* 1 — le réveil : le feu, puis son visage */
  [0, u => ({ p: Vx(-2.2, 1.6, .9).lerp(Vx(-2.6, 1.7, .4), u), c: Vx(-5.3, 1.0, CZ), f: 40 })],
  [P1 + 8, (u, T, x) => ({ p: Vx(-1.4, 3.6, -1.2).lerp(Vx(-1.9, 3.1, -1.9), u), c: x.tf.clone().lerp(Vx(-3.4, 1.1, LIGNE_LIT), .5), f: 34 })],
  [P1 + 12, (u, T, x) => ({ p: x.tf.clone().add(Vx(1.1, .95, .05)), c: x.tf.clone().add(Vx(-.05, .05, 0)), f: L(30, 24, u) })],
  [P1 + 22, (u, T, x) => ({ p: x.tf.clone().add(Vx(.75, .55, 1.15)), c: x.tf.clone().add(Vx(0, .05, 0)), f: 30 })],
  /* 2 — ce qu'elle voit : le grand-père à sa table, puis lui de près */
  [P2, (u, T, x) => ({ p: x.tf.clone().add(Vx(.3, .3, .3)), c: Vx(4.0, 2.9, -2.4), f: L(34, 28, u) })],
  [P2 + 6, (u, T, x) => ({ p: Vx(2.3, 3.0, .3).lerp(Vx(2.6, 3.1, .1), u), c: x.tv.clone().add(Vx(0, -.4, .5)), f: 30 })],
  /* question 1 : son visage qui se pose la question */
  [Q1, (u, T, x) => ({ p: x.tf.clone().add(Vx(.8, .75, 1.3)), c: x.tf.clone().add(Vx(.1, -.42, .2)), f: 34 })],
  /* les feuilles au mur : on lit les formules, l'une après l'autre */
  [MURS, (u, T) => { const k = Math.min(3, Math.floor(u * 4)), v = u * 4 - k, f = FEUILLE_P(k); return { p: f.clone().add(Vx(-1.9, .02, L(-.12, .12, v))), c: f.clone().add(Vx(0, -.02, 0)), f: 34 }; }],
  /* question 2 : la feuille des ombres reste derrière la carte */
  [Q2, u => { const f = FEUILLE_P(0); return { p: f.clone().add(Vx(-2.6, -.2, .4)), c: f.clone().add(Vx(0, -.4, .55)), f: 40 }; }],
  /* 3 — elle se lève, traverse la pièce */
  [P3, (u, T, x) => ({ p: Vx(-.6, 2.8, 2.4), c: Vx(-3.6, 1.2, -3.3), f: 40 })],
  [P3 + 7, (u, T, x) => ({ p: Vx(.6, 3.6, 4.2).lerp(Vx(-.4, 3.4, 3.6), u), c: x.ff.clone().add(Vx(0, .6, 0)).lerp(Vx(1.6, 1.6, -2.4), .35), f: 42 })],
  [P3 + 17, (u, T, x) => ({ p: Vx(1.1, 3.0, .4), c: Vx(3.3, 2.0, -2.7), f: 34 })],
  [P3 + 20.5, (u, T, x) => ({ p: x.tv.clone().add(Vx(-1.3, .1, 2.0)), c: x.tv.clone().add(Vx(0, -.1, 0)), f: 32 })],
  [P3 + 23.5, (u, T, x) => ({ p: Vx(1.3, 3.0, .6), c: Vx(3.3, 1.9, -2.6), f: 34 })],
  /* 4 — le cahier : les calculs, puis le dessin, le compas, les traits */
  [P4, (u, T, x) => { const a = uvVersMonde(.18, .3), b = uvVersMonde(.3, .62); const c = a.clone().lerp(b, ss(0, 1, u)); return { p: c.clone().add(Vx(0, 1.7, -.08)), c, f: 17, haut: Vx(0, 0, 1) }; }],
  [P4 + 6, (u, T, x) => ({ p: x.tf.clone().add(Vx(-.4, .35, 1.1)), c: x.tf.clone().add(Vx(.2, -.15, 0)), f: 34 })],
  [P4 + 8.5, u => ({ p: CENTRE_DESSIN.clone().add(Vx(0, 1.9, -.04)), c: CENTRE_DESSIN, f: L(19, 17, u), haut: Vx(0, 0, 1) })],
  [AL, (u, T, x) => ({ p: x.tv.clone().add(Vx(-.9, -.2, 2.0)), c: x.tv.clone().add(Vx(-.25, -.5, .4)), f: 34 })],
  [AL + 2.6, u => ({ p: CENTRE_DESSIN.clone().add(Vx(0, 1.9, -.04)), c: CENTRE_DESSIN, f: 17, haut: Vx(0, 0, 1) })],
  [AM, (u, T, x) => ({ p: Vx(3.2, 2.7, .2), c: Vx(3.3, 1.9, -2.1), f: 34 })],
  [FM + 1.5, u => ({ p: CENTRE_DESSIN.clone().add(Vx(0, 1.9, -.04)), c: CENTRE_DESSIN, f: 17, haut: Vx(0, 0, 1) })],
  [FM + 11.8, (u, T, x) => ({ p: x.tf.clone().add(Vx(.3, -.22, 1.2)), c: x.tf.clone().add(Vx(0, -.05, 0)), f: 32 })],
  /* 5 — la fenêtre : elle y va, elle frotte le givre, ce qu'elle voit, puis eux deux */
  [P5, (u, T, x) => ({ p: Vx(1.2, 3.3, 2.2), c: x.tf.clone().lerp(Vx(5.4, 2.6, 2.8), ss(.15, .8, u)), f: 42 })],
  [P5 + 12, (u, T, x) => ({ p: Vx(5.0, 2.8, 1.65), c: Vx(5.85, 2.45, 2.75), f: 38 })],
  [P5 + 17, u => ({ p: Vx(6.35, 2.6, 2.8), c: Vx(20, 2.5, 4.2).lerp(Vx(27, 2.2, 4.4), u), f: L(46, 40, u) })],
  [P5 + 22, u => ({ p: Vx(6.35, 2.6, 2.8), c: Vx(27, 2.3, 4.5), f: 13 })],
  [P5 + 25.5, (u, T, x) => ({ p: Vx(8.6, 2.8, 1.4), c: Vx(5.9, 2.9, 2.75), f: 34 })],
  [FW + 3, u => ({ p: Vx(6.35, 2.7, 2.8), c: Vx(27, 2.0, 4.5), f: L(30, 22, u) })],
  /* 6 — le bol, le cristal, il reprend son crayon */
  [P6, (u, T, x) => ({ p: Vx(0.2, 3.4, 3.6), c: x.vp.clone().add(Vx(0, 2, 0)), f: 44 })],
  [P6 + 9.5, (u, T, x) => ({ p: x.tf.clone().add(Vx(.25, .35, -2.4)), c: x.tf.clone().add(Vx(-.45, -.35, .3)), f: 40 })],
  [P6 + 13, (u, T, x) => ({ p: x.tf.clone().add(Vx(-.35, .3, -.35)).lerp(x.tf.clone().add(Vx(-.2, .45, -.25)), u), c: Vx(5.95, CRISTAL.y, CRISTAL.z), f: L(34, 26, u) })],
  [P6 + 19, (u, T, x) => ({ p: Vx(-.4, 4.0, 4.3).lerp(Vx(-1.2, 4.3, 4.6), u), c: Vx(3.6, 1.7, -.6), f: 46 })]];
function filmerS(T, x) {
  let i = PLANS.length - 1; while (i > 0 && PLANS[i][0] > T) i--;
  const fin = (PLANS[i + 1] || [FIN])[0], u = Math.min(1, Math.max(0, (T - PLANS[i][0]) / (fin - PLANS[i][0])));
  const { p, c, f } = PLANS[i][1](u, T, x);
  camera.up.copy(PLANS[i][1](u, T, x).haut || Vx(0, 1, 0)); camera.position.copy(p); camera.lookAt(c); camera.fov = f; camera.updateProjectionMatrix();
}

/* ============================================================
   LE SON
   ============================================================ */
const marcheF = [], marcheV = [];
for (let t = 0; t < FIN; t += 1 / 12) { const a = lireCles(CLES_F, POSES_F, t), b = lireCles(CLES_V, POSES_V, t); if (a.marche) marcheF.push(t); if (b.marche) marcheV.push(t); }
const pasDe = (ts, per, f) => { const r = []; let der = -9; for (const t of ts) if (t - der > per) { r.push([t, f]); der = t; } return r; };
const NOTES = [[P1 + 14, 64, .8], [P1 + 15.4, 67, .8], [P1 + 16.8, 69, .8],
  [Q1 + 2 + D_REB, 72, .7], [Q1 + 2 + D_REB, 64, .5], [Q2 + 2 + D_REB, 69, .7], [Q2 + 2 + D_REB, 60, .5],
  [P4 + 9, 69], [P4 + 10.4, 72], [P4 + 11.8, 76], [P4 + 13.4, 74],
  [FM + 4, 64, .7], [FM + 5.5, 67, .7], [FM + 7, 69, .7], [FM + 8.5, 72, .7],
  [P6 + 13.5, 76, .7], [P6 + 14.8, 79, .6], [P6 + 16.2, 76, .6],
  [FPO + .5, 64], [FPO + 1.8, 67], [FPO + 3.1, 69], [FPO + 4.5, 72], [FPO + 6.1, 71], [FPO + 7.7, 67], [FPO + 9.3, 69], [FPO + 9.3, 57, .6], [FPO + 9.3, 64, .6]];
const son = { chiens: false, echos: false, vent: [[0, .25], [P5 + 13, .2], [P5 + 17, .06], [P5 + 28, .06], [P6, .2], [FIN, .2]],
  feu: [[0, 1], [P5 + 15, 1], [P5 + 17, .25], [P5 + 30, .25], [P6, .9], [FIN, .7]],
  crayon: [[P2 + 1, P2 + 3.5], [P2 + 4.6, P2 + 7.8], [P2 + 9, P2 + 11.5], [AL + .3, AL + 5.3], [FPO + 1, FPO + 6]],
  pas: [...pasDe(marcheF, .36, .5), ...pasDe(marcheV, .55, 1)],
  toc: [[P3 + 23.5, .7], [P4 + 8.4, .4], [P6 + 6.8, .6], [P6 + 11.8, .5], [P6 + 20.4, .8]],
  respire: [[0, P1 + 12, 3.4], [P5 + 13.5, P5 + 17, 1.7]], souffles: [P5 + 13.6, P5 + 15.3], notes: NOTES };

/* ============================================================
   L'IMAGE
   ============================================================ */
const teteV = Vx(4.0, 3.2, -3.0); /* la tête du vieil homme à l'image d'avant (la petite la regarde) */
window.film = { FIN, clips, son, image(T0) {
  const T = Math.floor(T0 * 12 + 1e-6) / 12;

  /* ---- le feu, la lampe ---- */
  const fl = .85 + .15 * Math.sin(T * 13.1) * Math.sin(T * 7.3 + 1) + .07 * Math.sin(T * 31);
  feuL.intensity = 30 * fl; lueurFeu.material.opacity = .65 * fl;
  flammes.forEach(({ m, h, r }, k) => { const s = .8 + .25 * Math.sin(T * (9 + k * 2.3) + k) * Math.sin(T * 4.1 + k * 1.7); m.scale.set(r * (1 + .12 * Math.sin(T * 7 + k)), h * s, 1); m.position.y = .4 + h * s * .42; m.position.z = CZ + [0, -.28, .3, .05, -.1, .18][k] + .04 * Math.sin(T * 5 + k * 2); });
  lampeL.intensity = 7 * (.95 + .05 * Math.sin(T * 9));

  /* ---- la petite fille ---- */
  const cf = lireCles(CLES_F, POSES_F, T);
  fille.g.position.copy(cf.p); fille.g.quaternion.copy(cf.q);
  const Pf = cf.P;
  if (cf.marche) pas(Pf, T, 7.5);
  const regardF = cible => { const y = tourne(0, angleVers(cf.p, cible) - capDe(cf.q), 1); return Math.max(-1.1, Math.min(1.1, y)); };
  /* au lit : elle regarde le plafond, puis tourne la tête vers la table */
  if (T < P3 + 2) { const kT = ss(P1 + 19, P1 + 22, T); Pf.tY = L(0, -.75, kT); Pf.tX = -.1; Pf.regY = L(0, -.25, kT); Pf.regX = L(-.4, -.05, kT); }
  if (T >= Q1 && T < Q1 + 14) { Pf.tZ = L(0, .25, ss(Q1, Q1 + 2, T)); Pf.sourcil = .3; }
  if (T >= P3 + 19 && T < P3 + 24) { Pf.tY = regardF(Vx(4, 3, -3)); Pf.tX = -.35; }
  /* au tabouret : elle se penche sur le cahier, son doigt sur le milieu, puis fait le tour du cercle */
  if (T >= P3 + 26.5 && T < P5 + 3.5) {
    const kP = ss(P4, P4 + 1.5, T) * (1 - ss(P5 + 1, P5 + 3, T)); Pf.lean = .3 * kP; Pf.mg = Vx(-.3, .55, .4); Pf.md = Vx(.3, .55, .4); Pf.tX = L(0, .5, kP);
    if (T >= AM && T < FM) { Pf.tY = regardF(teteV); Pf.tX = L(Pf.tX, -.25, ss(AM, AM + .6, T)); }
    const kM = ss(FM + 1.5, FM + 3, T) * (1 - ss(FM + 12, FM + 13.5, T));
    if (kM > 0) { const tour = ss(FM + 4, FM + 10.5, T), w = tour > 0 && tour < 1 ? surCercle(ANG_LOUP(0) + tour * 2 * Math.PI) : CENTRE_DESSIN.clone();
      if (tour >= 1) w.copy(surCercle(ANG_LOUP(0)));
      const loc = versLocal(fille, w.add(Vx(0, .06, 0))); Pf.md = Pf.md.clone().lerp(loc, kM); }
  }
  /* à la fenêtre : elle souffle sur la vitre, frotte avec sa manche, colle son front */
  if (T >= P5 + 13.6 && T < P6 + 10) {
    const kF = ss(P5 + 14, P5 + 15, T) * (1 - ss(P5 + 16.5, P5 + 17, T));
    if (kF > 0) { const w = Vx(5.93, TACHE.y + Math.sin(T * 9) * .1, TACHE.z + Math.cos(T * 9) * .14); Pf.md = Pf.md.clone().lerp(versLocal(fille, w), kF); }
    Pf.lean = L(Pf.lean, .38, ss(P5 + 16.5, P5 + 17.5, T)); Pf.tX = L(Pf.tX, .02, ss(P5 + 16.5, P5 + 17.5, T));
    if (T >= AW - 1 && T < FW + 2) { Pf.tY = -.3; Pf.tX = -.35; Pf.lean = .2; }
    if (T >= FW + 2) { Pf.tY = 0; Pf.tX = 0; }
  }
  /* le bol, à deux mains */
  const bolDansMains = T >= P6 + 11.8;
  if (T >= P6 + 10.5) { Pf.tZ = L(0, .35, ss(P6 + 14, P6 + 16, T)); Pf.tX = L(.1, -.2, ss(P6 + 13, P6 + 14.5, T)); Pf.sourire = L(0, .3, ss(P6 + 15, P6 + 17, T)); }
  if (T >= P6 + 11 && T < P6 + 12.2) { const w = Vx(4.85, 2.05, 2.55); Pf.md = Pf.md.clone().lerp(versLocal(fille, w), ss(P6 + 11, P6 + 11.8, T)); Pf.mg = Pf.mg.clone().lerp(versLocal(fille, w.clone().add(Vx(0, 0, .25))), ss(P6 + 11, P6 + 11.8, T)); }
  if (Pf.lid > -1 && Pf.lid < 1 && (T % 5.3) < .13) Pf.lid = 1.2;
  fille.poser(Pf); fille.g.updateMatrixWorld(true);
  const tf = fille.tt.localToWorld(Vx(0, 0, 0)), ff = fille.g.position.clone();
  peauLit.scale.set(1, ss(P3 + 2, P3 + 4, T) > 0 ? L(1, .55, ss(P3 + 2, P3 + 4, T)) : 1, 1); peauLit.position.x = L(-3.25, -2.9, ss(P3 + 2, P3 + 4, T));

  /* ---- le vieil homme ---- */
  const cv = lireCles(CLES_V, POSES_V, T);
  vieux.g.position.copy(cv.p); vieux.g.quaternion.copy(cv.q);
  const P = cv.P, hV = capDe(cv.q);
  if (cv.marche) pas(P, T, 5.2);
  const regardV = cible => { const y = tourne(0, angleVers(cv.p, cible) - hV, 1); return Math.max(-1.25, Math.min(1.25, y)); };
  /* le crayon : il écrit, s'arrête, regarde la fenêtre, reprend */
  let crayonMain = 0, ecrit = 0;
  const assisEcrit = (T < P3 + 19.5) || (T >= P6 + 21);
  if (assisEcrit) { crayonMain = 1; ecrit = 1;
    const pause = (T > P2 + 3.6 && T < P2 + 4.6) || (T > P2 + 7.8 && T < P2 + 9) || (T > Q1 + 1 && T < Q1 + 6);
    if (pause) { ecrit = 0; P.tY = regardV(Vx(6, 3, 2.8)) * .8; P.tX = .05; }
    if (T >= P6 + 21) crayonMain = ss(P6 + 21.5, P6 + 22, T); }
  if (ecrit) { const w = uvVersMonde(.3 + .12 * Math.sin(T * .9), .75 + .05 * Math.sin(T * .37)).add(Vx(Math.sin(T * 14) * .02, .1 + Math.max(0, Math.sin(T * 7)) * .015, 0)); P.md = versLocal(vieux, w); }
  /* il l'entend : il pose son crayon, la regarde par-dessus ses lunettes, sourit */
  if (T >= P3 + 19.5 && T < P5 + 15) {
    const kR = ss(P3 + 19.5, P3 + 21, T); P.tY = regardV(tf) * kR; P.tX = L(.45, .2, kR); P.sourcil = L(.1, .45, kR); P.sourire = L(0, .3, ss(P3 + 21, P3 + 22.5, T));
    /* il tire le tabouret près de lui */
    const kT = ss(P3 + 22, P3 + 22.6, T) * (1 - ss(P3 + 24, P3 + 24.6, T));
    if (kT > 0) P.mg = P.mg.clone().lerp(versLocal(vieux, tabouret.position.clone().add(Vx(0, 1.3, 0))), kT);
    if (T >= P4 && T < P5) { P.tY = L(P.tY, regardV(CENTRE_DESSIN), ss(P4, P4 + 1, T)); P.tX = L(P.tX, .55, ss(P4, P4 + 1, T)); P.sourcil = .2; }
    if (T >= AM - .5 && T < FM + 1) P.tY = regardV(tf);
    if (T >= FM + 1) { P.tY = regardV(tf) * .5; P.sourire = .35; }
  }
  /* le compas : il le prend, pique la pointe au milieu, fait le tour ; puis le crayon pour les huit traits ; puis le doigt au milieu */
  const kComp = ss(P4 + 7.4, P4 + 8.2, T) * (1 - ss(P4 + 14.2, P4 + 15, T));
  const tourC = ss(P4 + 9, P4 + 13.5, T);
  const mine = surCercle(ANG_LOUP(0) + tourC * 2 * Math.PI);
  if (T > P4 + 8.2 && T < P4 + 14.2) poserCompas(CENTRE_DESSIN, mine);
  else { compas.position.copy(COMPAS_POSE); compas.rotation.set(0, .4, Math.PI / 2 - .1); brasC[0].rotation.set(0, 0, .08); brasC[1].rotation.set(0, 0, -.08); }
  if (kComp > 0) P.md = P.md.clone().lerp(versLocal(vieux, compas.position.clone().add(Vx(0, .1, 0))), kComp);
  const kTraits = ss(AL - .4, AL + .3, T) * (1 - ss(AL + 5.5, AL + 6, T)), traits = 8 * ss(AL + .4, AL + 5, T);
  if (kTraits > 0) { const k = Math.min(7, Math.floor(traits)), f = traits - k, w = CENTRE_DESSIN.clone().lerp(surCercle(ANG_LOUP(k)), f < 1 ? f : 1).add(Vx(0, .11, 0)); P.md = P.md.clone().lerp(versLocal(vieux, w), kTraits); crayonMain = 1; ecrit = 1; }
  const kDoigt = ss(AM, AM + .5, T) * (1 - ss(FM + .4, FM + 1.2, T));
  if (kDoigt > 0) P.mg = P.mg.clone().lerp(versLocal(vieux, CENTRE_DESSIN.clone().add(Vx(.02, .07, -.03))), kDoigt);
  if ((T >= AL && T < FL) || (T >= AM && T < FM) || (T >= AW && T < FW) || (T >= APO && T < FPO)) P.parle = bouge(T, 0) * .5;
  /* à la fenêtre, derrière elle : la main sur son épaule, il regarde dehors */
  if (T >= P5 + 25 && T < P6 + 1.5) { const kE = ss(P5 + 25.5, P5 + 26.5, T) * (1 - ss(P6 + .6, P6 + 1.4, T)); P.md = P.md.clone().lerp(versLocal(vieux, fille.buste.localToWorld(Vx(.35, 1.0, 0))), kE); P.tX = .25; P.tY = 0; P.sourire = .25; }
  /* le bol : il le prend sur la table et le lui tend */
  const kBol = ss(P6 + 5.4, P6 + 6.4, T);
  if (T >= P6 + 5.2 && T < P6 + 12.2) { const w = T < P6 + 6.6 ? BOL_POSE.clone().add(Vx(0, .2, 0)) : vieux.g.localToWorld(Vx(.05, 1.35, .75)); P.md = P.md.clone().lerp(versLocal(vieux, w), T < P6 + 6.6 ? kBol : 1); P.mg = P.mg.clone().lerp(versLocal(vieux, w.clone().add(Vx(0, 0, 0)).addScaledVector(Vx(1, 0, 0), 0)), T < P6 + 6.6 ? 0 : 1); }
  if (T >= P6 + 9.2 && T < P6 + 12.2) { const w = Vx(4.85, 2.05, 2.65); P.md = P.md.clone().lerp(versLocal(vieux, w), ss(P6 + 9.2, P6 + 10.6, T)); P.mg = P.mg.clone().lerp(versLocal(vieux, w.clone().add(Vx(0, 0, -.2))), ss(P6 + 9.2, P6 + 10.6, T)); P.tY = regardV(tf); P.tX = .4; P.sourire = .3; }
  if (P.lid > -1 && (T % 4.3) < .12) P.lid = 1.2;
  vieux.poser(P); vieux.g.updateMatrixWorld(true); teteV.copy(vieux.tt.localToWorld(Vx(0, 0, 0)));

  /* ---- les objets tenus ---- */
  const mainD = vieux.g.localToWorld(P.md.clone());
  if (crayonMain > 0) { crayon.position.copy(mainD).add(Vx(0, -.09, 0)); crayon.rotation.set(.35, hV, -.2); }
  else { crayon.position.copy(CRAYON_POSE); crayon.rotation.set(0, .8, Math.PI / 2); }
  /* le bol : sur la table, dans ses mains, puis dans celles de la petite */
  if (T < P6 + 6.4) bol.position.copy(BOL_POSE);
  else if (T < P6 + 11.8) bol.position.copy(vieux.g.localToWorld(P.md.clone())).add(Vx(0, -.15, 0));
  else { const mg = fille.g.localToWorld(Pf.mg.clone()), md = fille.g.localToWorld(Pf.md.clone()); bol.position.copy(mg.lerp(md, .5)).add(Vx(0, -.1, 0)); }
  vapeur.forEach((s, k) => { const c = (T * .25 + k / vapeur.length) % 1; s.position.copy(bol.position).add(Vx(Math.sin(T + k) * .05, .2 + c * .7, Math.cos(T * .7 + k) * .05)); s.scale.setScalar(.12 + c * .35); s.material.opacity = Math.sin(Math.PI * c) * .32; });
  /* le tabouret : il le tire près de lui */
  tabouret.position.copy(TAB_DEPART.clone().lerp(TAB_ICI, ss(P3 + 22.4, P3 + 23.6, T)));
  /* le cahier : le cercle au compas, les huit traits, la lettre r */
  majCahier({ cercle: tourC, rayons: traits, r: ss(AL + 5, AL + 5.6, T), lueur: ss(FM + 10.3, FM + 11.5, T) * (1 - ss(P5 + 4, P5 + 7, T)) * (.85 + .15 * Math.sin(T * 4)) });
  majVitre({ clair: ss(P5 + 14.2, P5 + 16.8, T), cristal: ss(P6 + 13.3, P6 + 14.8, T) * (1 - .4 * ss(P6 + 18, P6 + 21, T)) });
  eclatCristal.material.opacity = ss(P6 + 13.3, P6 + 14.8, T) * (1 - ss(P6 + 18, P6 + 21, T)) * (.8 + .2 * Math.sin(T * 5)); eclatCristal.scale.setScalar(1.1);

  /* ---- le chien au pied du lit : il dort, lève la tête quand elle passe, se rendort ---- */
  const kC = ss(P3 + 8.5, P3 + 9.5, T) * (1 - ss(P3 + 14, P3 + 16, T));
  chienTete.poser({ couche: 1, assis: .2, tX: L(.35, -.15, kC), tY: L(.2, -.6, kC) * kC + .2 * (1 - kC), dort: kC > .3 ? 0 : 1 });

  /* ---- caméra, cartes, fondus ---- */
  filmerS(T, { tf, ff, tv: vieux.tt.localToWorld(Vx(0, 0, 0)), vp: vieux.g.position.clone() });
  const q1v = ss(Q1 + 1.5, Q1 + 2.2, T) * (1 - ss(Q1 + 13.3, Q1 + 14, T)), q2v = ss(Q2 + .8, Q2 + 1.5, T) * (1 - ss(Q2 + 13.3, Q2 + 14, T));
  question1.maj(q1v, 1 - ss(Q1 + 2, Q1 + 2 + D_REB, T), T >= Q1 + 2 + D_REB);
  question2.maj(q2v, 1 - ss(Q2 + 1.3, Q2 + 1.3 + D_REB, T), T >= Q2 + 1.3 + D_REB);
  const kPe = ss(Q1, Q1 + .6, T) * (1 - ss(Q1 + 1.6, Q1 + 2.1, T)); pensee.style.display = kPe > 0 ? 'block' : 'none'; pensee.style.opacity = kPe;
  const kPo = ss(APO - .3, APO + .4, T) * (1 - ss(FPO + 2.5, FPO + 3.5, T)); poeme.style.display = kPo > 0 ? 'block' : 'none'; poeme.style.opacity = kPo;
  const kPh = ss(P2 + .8, P2 + 2, T) * (1 - ss(P2 + 9.5, P2 + 11, T)); phrase.style.display = kPh > 0 ? 'block' : 'none'; phrase.style.opacity = kPh;
  titre.style.opacity = ss(3, 5, T) * (1 - ss(10, 12, T));
  fonduNoir(Math.max(1 - ss(0, 3, T), ss(FINS - 1, FINS + .8, T)));
  finS.style.display = T > FINS ? 'flex' : 'none'; finS.style.opacity = ss(FINS, FINS + 1.2, T) * (1 - ss(FIN - 1, FIN - .1, T));
  renderer.render(scene3d, camera);
} };
window.film.image(0);
}
