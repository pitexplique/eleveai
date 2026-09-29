// Recalcul indépendant de la feuille « Les volumes » de 5e (29/09/2026) :
// lib/fiches-exercices/maths-5e-volume-solide.tsx.
//
// ⭐ L'AUTRE CHEMIN : les nombres sont relus dans les DESSINS, jamais recopiés.
// Les cubes d'un `empilement` sont comptés dans son tableau ; le volume d'un
// `prisme` est refait par la formule du lacet sur sa face de devant, fois sa
// profondeur ; celui d'un cylindre par π × r × r × h avec π ≈ 3,14 ; chaque cote
// est mesurée sur le dessin et comparée à son texte ; le diamètre écrit vaut
// deux rayons dessinés. Puis le script cherche chaque résultat dans le corrigé.
// ⭐ LE RENDU : la mise en page des étiquettes de `prisme`, `cylindres` et
// `cubeDecoupe` est rejouée (même calcul que les composants) : viewBox de 300 de
// large au plus (police 14 → 11 px à 375 px), étiquettes qui ne se touchent pas.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-5e-volume-solide.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-volume-solide.tsx", "volume_solide", ["empilement", "prisme", "cylindres", "cubeDecoupe"]);
const { e, vrai, verif, dit, dessin, essai, appels } = f;

const PI = 3.14;
const r9 = (x) => Math.round(x * 1e9) / 1e9;
const T = (x) => t(r9(x));
const lacet = (pts) => Math.abs(pts.reduce((s, [x, z], i) => s + x * pts[(i + 1) % pts.length][1] - pts[(i + 1) % pts.length][0] * z, 0)) / 2;
const dist = (a, b) => Math.hypot(...a.map((v, i) => b[i] - v));
/** « 2,5 cm », « ? = 21 cm », « 45 cm² » → nombre (le dernier du texte). */
const nombre = (s) => Number([...String(s).matchAll(/(\d+(?:[ ,]\d+)*)/g)].at(-1)[1].replace(/ /g, "").replace(",", "."));
const somme = (xs) => xs.reduce((a, b) => a + b, 0);

/* ── La mise en page, rejouée ───────────────────────────────────────────── */
const K = 0.5 * Math.SQRT1_2, TAILLE = 14, ECART = 5;
const SIGNES = { h: [0, -1], b: [0, 1], g: [-1, 0], d: [1, 0], hg: [-1, -1], hd: [1, -1], bg: [-1, 1], bd: [1, 1] };
const boite = (x, y, t, d) => {
  const w = [...t].length * TAILLE * 0.6;
  const [sx, sy] = SIGNES[d];
  const ec = sx !== 0 && sy !== 0 ? ECART * 0.7 : ECART;
  return { t, cx: x + sx * (ec + w / 2), cy: y + sy * (ec + TAILLE / 2), w, h: TAILLE };
};
const englobe = (geo, boites) => {
  let [x0, y0, x1, y1] = geo;
  for (const b of boites) [x0, y0, x1, y1] = [Math.min(x0, b.cx - b.w / 2), Math.min(y0, b.cy - b.h / 2), Math.max(x1, b.cx + b.w / 2), Math.max(y1, b.cy + b.h / 2)];
  return x1 - x0 + 12;
};
function renduPrisme(face, p, o = {}) {
  const proj = ([x, y, z]) => [x + K * y, z + K * y];
  const pr = [...face.map(([x, z]) => proj([x, 0, z])), ...face.map(([x, z]) => proj([x, p, z]))];
  const [minX, maxX, minY, maxY] = [Math.min(...pr.map((q) => q[0])), Math.max(...pr.map((q) => q[0])), Math.min(...pr.map((q) => q[1])), Math.max(...pr.map((q) => q[1]))];
  const ec = Math.min(180 / (maxX - minX), 130 / (maxY - minY));
  const ecran = (q) => {
    const [X, Y] = proj(q);
    return [(X - minX) * ec, (maxY - Y) * ec];
  };
  const boites = (o.cotes ?? []).map((k) => {
    const [[x1, y1], [x2, y2]] = [ecran(k.de), ecran(k.a)];
    return boite((x1 + x2) / 2, (y1 + y2) / 2, k.label, k.cote);
  });
  return { boites, largeur: englobe([0, 0, (maxX - minX) * ec, (maxY - minY) * ec], boites) };
}
function renduCylindres(liste, empile = false) {
  const ECARTC = 64;
  const R = Math.max(...liste.map((q) => q.r));
  const larg = empile ? 2 * R : somme(liste.map((q) => 2 * q.r));
  const H = empile ? somme(liste.map((q) => q.h)) : Math.max(...liste.map((q) => q.h));
  const ec = Math.min((200 - (empile ? 0 : ECARTC * (liste.length - 1))) / larg, 130 / (H + 0.6 * R));
  const sol = (H + 0.3 * R) * ec;
  const boites = [];
  let [x, pile] = [0, 0];
  let geo = [Infinity, Infinity, -Infinity, -Infinity];
  for (const q of liste) {
    const [rx, ry] = [q.r * ec, 0.3 * q.r * ec];
    const cx = empile ? R * ec : x + rx;
    const yb = sol - pile * ec, yt = yb - q.h * ec;
    if (empile) pile += q.h;
    else x += 2 * rx + ECARTC;
    geo = [Math.min(geo[0], cx - rx), Math.min(geo[1], yt - ry), Math.max(geo[2], cx + rx), Math.max(geo[3], yb + ry)];
    const texte = q.rayon ?? q.diametre;
    if (texte) boites.push(q.mesure === "bas" ? boite(cx, yb + ry, texte, "b") : boite(cx, yt - ry, texte, "h"));
    if (q.hauteur) boites.push(boite(cx + rx, (yt + yb) / 2, q.hauteur, "d"));
    if (q.base) boites.push(boite(cx, yt - TAILLE / 2 - ECART, q.base, "b"));
    if (q.nom) boites.push(boite(cx, yb + ry + (texte && q.mesure === "bas" ? TAILLE + ECART : 0), q.nom, "b"));
  }
  return { boites, largeur: englobe(geo, boites) };
}
const largeurCube = (n, arete, droite) => {
  const tx = 16 + 90 + 45 + 10;
  return Math.max(tx + Math.max(...droite.map((s) => [...s].length)) * TAILLE * 0.6, 16 + 45 + ([...arete].length * TAILLE * 0.6) / 2) + 6;
};
const seTouchent = (a, b) => Math.min(a.cx + a.w / 2, b.cx + b.w / 2) - Math.max(a.cx - a.w / 2, b.cx - b.w / 2) > 0 && Math.abs(a.cy - b.cy) < 18;
const controleRendu = (nom, r) => {
  vrai(`${nom} : viewBox de ${Math.round(r.largeur)} de large, 300 au plus (police ≥ 11 px à 375)`, r.largeur <= 300);
  for (let i = 0; i < r.boites.length; i++) for (let j = i + 1; j < r.boites.length; j++) vrai(`${nom} : « ${r.boites[i].t} » et « ${r.boites[j].t} » ne se touchent pas`, !seTouchent(r.boites[i], r.boites[j]));
};

/* ── Contrôles de TOUS les dessins ─────────────────────────────────────── */
/** Le point q est-il sur le bord de la face de devant (y = 0) ? */
const surFace = ([x, y, z], face) =>
  y === 0 &&
  face.some((A, i) => {
    const B = face[(i + 1) % face.length];
    const croix = (B[0] - A[0]) * (z - A[1]) - (B[1] - A[1]) * (x - A[0]);
    return Math.abs(croix) < 1e-9 && Math.min(A[0], B[0]) - 1e-9 <= x && x <= Math.max(A[0], B[0]) + 1e-9 && Math.min(A[1], B[1]) - 1e-9 <= z && z <= Math.max(A[1], B[1]) + 1e-9;
  });
for (const a of appels("prisme")) {
  if (!a.args) continue;
  const [face, p, o = {}] = a.args;
  const nom = `prisme ${a.index}`;
  const sommets = [...face.map(([x, z]) => [x, 0, z]), ...face.map(([x, z]) => [x, p, z])];
  const traits = (o.traits ?? []).flat();
  // Un trait part du bord de la face de devant, ou d'un autre trait (la hauteur du toit part de la découpe).
  const surTrait = ([x, y, z], [A, B]) => y === 0 && surFace([x, 0, z], [[A[0], A[2]], [B[0], B[2]]]);
  for (const q of traits) vrai(`${nom} : les traits partent du bord de la face de devant`, surFace(q, face) || (o.traits ?? []).some((s) => !s.includes(q) && surTrait(q, s)));
  for (const k of o.cotes ?? []) {
    verif(`${nom} : cote « ${k.label} » mesurée sur le dessin`, dist(k.de, k.a), nombre(k.label), 1e-9);
    const connu = (q) => [...sommets, ...traits].some((s) => dist(s, q) < 1e-9);
    vrai(`${nom} : cote « ${k.label} » posée sur le solide`, connu(k.de) && connu(k.a));
  }
  controleRendu(nom, renduPrisme(face, p, o));
}
for (const a of appels("cylindres")) {
  if (!a.args) continue;
  const [liste, empile] = a.args;
  const nom = `cylindres ${a.index}`;
  for (const q of liste) {
    if (q.rayon) verif(`${nom} : rayon « ${q.rayon} »`, q.r, nombre(q.rayon));
    if (q.diametre) verif(`${nom} : diamètre « ${q.diametre} » = deux rayons dessinés`, 2 * q.r, nombre(q.diametre));
    if (q.hauteur) verif(`${nom} : hauteur « ${q.hauteur} »`, q.h, nombre(q.hauteur));
    if (q.base) vrai(`${nom} : aire du fond « ${q.base} » ≈ π r² dessiné (${(Math.PI * q.r * q.r).toFixed(2)})`, Math.abs(Math.PI * q.r * q.r - nombre(q.base)) / nombre(q.base) < 0.02);
  }
  controleRendu(nom, renduCylindres(liste, empile));
}
for (const a of appels("cubeDecoupe")) {
  if (!a.args) continue;
  const [n, arete, droite] = a.args;
  vrai(`cubeDecoupe(${n}) : « ${droite[0]} »`, droite[0] === `${n} × ${n} × ${n}`);
  vrai(`cubeDecoupe(${n}) : ${n * n * n} écrit`, droite.some((s) => s.includes(t(n * n * n).replace("\\,", " "))));
  vrai(`cubeDecoupe(${n}) : largeur ${Math.round(largeurCube(n, arete, droite))}, 300 au plus`, largeurCube(n, arete, droite) <= 300);
}

/** Les arguments relus, par exercice. */
const pr = (k, role) => {
  const [face, p, o = {}] = dessin("prisme", k, role);
  const xs = face.map((q) => q[0]), zs = face.map((q) => q[1]);
  return { face, p, o, base: lacet(face), V: lacet(face) * p, L: Math.max(...xs) - Math.min(...xs), H: Math.max(...zs) - Math.min(...zs) };
};
const cyl = (k, role) => dessin("cylindres", k, role)[0];
const cubes = (k, role) => dessin("empilement", k, role)[0];

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const h = cubes(1, "figure");
  const [devant, derriere] = h;
  dit(1, `$${devant.join("$, $").replace(/, \$(\d+)$/, " et $$$1")}$ cubes, soit $${somme(devant)}$`);
  dit(1, `$${derriere.join("$, $").replace(/, \$(\d+)$/, " et $$$1")}$ cubes, soit $${somme(derriere)}$`);
  dit(1, `$${somme(devant)} + ${somme(derriere)} = ${somme(h.flat())}$ cubes`);
  dit(1, `Réponse : $${somme(h.flat())}$ cubes, un volume de $${somme(h.flat())}$ cm³.`);
  vrai("1. des cubes cachés existent (rangée de derrière)", derriere.some((n, i) => n > 0 && devant[i] > 0));
});
essai("2", () => {
  const h = cubes(2, "figure");
  const [ny, nx, nz] = [h.length, h[0].length, h[0][0]];
  vrai("2. un pavé plein", h.flat().every((n) => n === nz));
  dit(2, `$${nx} \\times ${ny} = ${nx * ny}$ cubes`);
  dit(2, `Il y a $${nz}$ couches`);
  dit(2, `$${nx * ny} \\times ${nz} = ${nx * ny * nz}$ cubes`);
  dit(2, `$${nx} \\times ${ny} \\times ${nz} = ${somme(h.flat())}$ cm³`);
});
essai("3", () => {
  const s = pr(3, "figure");
  vrai("3. l'énoncé : 8, 5, 2,5", [s.L, s.p, s.H].every((x) => e(3).includes(`$${T(x)}$ cm`)));
  dit(3, `$${s.L} \\times ${s.p} = ${s.L * s.p}$`);
  dit(3, `$${s.L * s.p} \\times ${T(s.H)} = ${T(s.V)}$ cm³`);
  dit(3, `$${s.L} + ${s.p} + ${T(s.H)} = ${T(s.L + s.p + s.H)}$`);
  dit(3, `Réponse : le savon a un volume de $${T(s.V)}$ cm³.`);
});
essai("4", () => {
  const s = pr(4, "figure");
  dit(4, `$${s.L} \\times ${s.H} \\div 2 = ${s.L * s.H} \\div 2 = ${s.base}$ cm²`);
  dit(4, `$${s.base} \\times ${s.p} = ${s.V}$ cm³`);
  dit(4, `$${s.L} \\times ${s.H} \\times ${s.p} = ${s.L * s.H * s.p}$ cm³`);
  vrai("4. la cale est la moitié du pavé", 2 * s.V === s.L * s.H * s.p);
  dit(4, `Réponse : la cale a un volume de $${s.V}$ cm³.`);
});
essai("5", () => {
  const [q] = cyl(5, "figure");
  const [aire, h] = [nombre(q.base), q.h];
  dit(5, `$${aire} \\times ${h} = ${aire * h}$ cm³`);
  dit(5, `Réponse : le pot a un volume de $${aire * h}$ cm³.`);
});
essai("6", () => {
  const lignes = e(6).split("\\n").slice(1);
  vrai("6. quatre conversions", lignes.length === 4);
  dit(6, `$3$ L $= 3$ dm³ $= 3 \\times 1\\,000 = ${T(3 * 1000)}$ cm³`);
  dit(6, `$2{,}5$ m³ $= 2{,}5 \\times 1\\,000 = ${T(2.5 * 1000)}$ L`);
  dit(6, `$750$ cm³ $= 750 \\div 1\\,000 = ${T(750 / 1000)}$ L`);
  dit(6, `$4\\,500$ L $= 4\\,500 \\div 1\\,000 = ${T(4500 / 1000)}$ m³`);
  dit(6, `Réponse : a) $3$ dm³ et $${T(3000)}$ cm³ ; b) $${T(2500)}$ L ; c) $${T(0.75)}$ L ; d) $${T(4.5)}$ m³.`);
  dit(6, `$10 \\times 10 \\times 10 = ${T(1000)}$ petits cubes`);
});
essai("7", () => {
  const h = cubes(7, "schema");
  vrai("7. le dessin : 2 × 2 × 2", h.length === 2 && h[0].length === 2 && h.flat().every((n) => n === 2));
  dit(7, `$2 \\times 2 \\times 2 = ${somme(h.flat())}$ cm³`);
  vrai("7. l'énoncé : 8 au a)", e(7).includes(`$${somme(h.flat())}$ …`));
  dit(7, "Réponse : a) cm³ ; b) cm² ; c) cm ; d) cm³ ; e) Léo se trompe, le volume est $8$ cm³.");
});
essai("8", () => {
  const s = pr(8, "schema");
  vrai("8. l'énoncé : fond 9 × 4, volume 180", e(8).includes(`$${s.L}$ cm sur $${s.p}$ cm`) && e(8).includes(`$${s.V}$ cm³`));
  dit(8, `$${s.L} \\times ${s.p} = ${s.L * s.p}$ cm²`);
  dit(8, `$${s.V} \\div ${s.L * s.p} = ${s.H}$`);
  dit(8, `$${s.V} \\div ${s.L} = ${s.V / s.L}$ cm`);
  dit(8, `Réponse : la boîte a une hauteur de $${s.H}$ cm.`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const s = pr(9, "figure");
  const eau = s.L * s.p * s.o.niveau;
  dit(9, `$${s.L} \\times ${s.p} \\times ${s.H} = ${T(s.V)}$ cm³`);
  dit(9, `$${T(s.V)} \\div 1\\,000 = ${s.V / 1000}$ L`);
  dit(9, `$${s.H} - ${s.H - s.o.niveau} = ${s.o.niveau}$ cm`);
  vrai("9. l'énoncé : 5 cm du bord", e(9).includes(`jusqu'à $${s.H - s.o.niveau}$ cm du bord`));
  dit(9, `$${s.L} \\times ${s.p} \\times ${s.o.niveau} = ${T(eau)}$ cm³, soit $${eau / 1000}$ L`);
  dit(9, `$${eau / 1000} \\div 9 = ${eau / 1000 / 9}$ seaux`);
  dit(9, `$${s.V / 1000} - ${(s.V - eau) / 1000} = ${eau / 1000}$ L`);
});
essai("10", () => {
  const [q] = cyl(10, "figure");
  const aire = r9(PI * q.r * q.r), V = r9(aire * q.h);
  dit(10, `$${2 * q.r} \\div 2 = ${q.r}$ cm`);
  dit(10, `$3{,}14 \\times ${q.r} \\times ${q.r} = ${T(aire)}$ cm²`);
  dit(10, `$${T(aire)} \\times ${q.h} = ${T(V)}$ cm³, soit environ $${Math.round(V)}$ cm³`);
  vrai("10. plus d'un demi-litre", Math.round(V) > 500);
  dit(10, `$${Math.round(V)} > 500$`);
  dit(10, `$3{,}14 \\times ${2 * q.r} \\times ${2 * q.r} \\times ${q.h} = ${T(PI * 4 * q.r * q.r * q.h)}$ cm³`);
});
essai("11", () => {
  const s = pr(11, "figure");
  dit(11, `$${T(s.L)} \\times ${T(s.H)} \\div 2 = ${T(s.L * s.H)} \\div 2 = ${T(s.base)}$ m²`);
  dit(11, `$${T(s.base)} \\times ${s.p} = ${T(s.V)}$ m³`);
  dit(11, `$${T(s.V)}$ m³ $= ${T(s.V * 1000)}$ L`);
  dit(11, `$${T(s.base)} \\times 3 = ${T(s.base * 3)}$ m³`);
  dit(11, `$${T(s.L)} \\times ${T(s.H)} \\times ${s.p} = ${T(s.L * s.H * s.p)}$ m³`);
});
essai("12", () => {
  const h = cubes(12, "figure");
  const n = somme(h.flat());
  dit(12, `Devant : $${h[0].join(" + ")} = ${somme(h[0])}$ cubes`);
  dit(12, `$${somme(h[0])} + ${somme(h[1])} = ${n}$ cubes`);
  dit(12, `$2 \\times 2 \\times 2 = 8$ cm³`);
  dit(12, `$${n} \\times 8 = ${n * 8}$ cm³`);
  dit(12, `$${Math.max(...h.flat())} \\times 2 = ${Math.max(...h.flat()) * 2}$ cm`);
});
essai("13", () => {
  const s = pr(13, "figure");
  const mur = s.o.cotes.find((k) => k.label === "25 cm");
  const hm = dist(mur.de, mur.a);
  const pave = s.L * hm * s.p, toitBase = s.base - s.L * hm;
  verif("13. toit : triangle 24 × 9 ÷ 2", toitBase, (24 * 9) / 2);
  dit(13, `$${s.L} \\times ${hm} \\times ${s.p} = ${T(pave)}$ cm³`);
  dit(13, `$24 \\times 9 \\div 2 = 216 \\div 2 = ${toitBase}$ cm²`);
  dit(13, `$${toitBase} \\times ${s.p} = ${T(toitBase * s.p)}$ cm³`);
  dit(13, `$${T(pave)} + ${T(toitBase * s.p)} = ${T(s.V)}$ cm³`);
  dit(13, `$${T(s.V)} \\div 1\\,000 = ${T(s.V / 1000)}$ L`);
  dit(13, `$${s.L * hm} + ${toitBase} = ${s.base}$ cm², et $${s.base} \\times ${s.p} = ${T(s.V)}$ cm³`);
  dit(13, `un toit de $${T(2 * toitBase * s.p)}$ cm³`);
});
essai("14", () => {
  const s = pr(14, "schema");
  vrai("14. l'énoncé", e(14).includes(`$${s.L}$ m de long, $${s.p}$ m de large et $${T(s.H)}$ m de profondeur`));
  const L = s.V * 1000;
  dit(14, `$${s.L} \\times ${s.p} \\times ${T(s.H)} = ${s.L * s.p} \\times ${T(s.H)} = ${T(s.V)}$ m³`);
  dit(14, `$${T(s.V)}$ m³ $= ${T(L)}$ L`);
  dit(14, `$${T(L)} \\div 15 = ${T(L / 15)}$ minutes`);
  dit(14, `$${T(L / 15)} \\div 60 \\approx ${T(Math.round((L / 15 / 60) * 10) / 10)}$ heures`);
  dit(14, `$${T(s.V)} \\div 15 = ${T(s.V / 15)}$ minutes`);
});
essai("15", () => {
  const [A, B] = cyl(15, "figure");
  const [bA, bB] = [r9(PI * A.r * A.r), r9(PI * B.r * B.r)];
  const [vA, vB] = [r9(bA * A.h), r9(bB * B.h)];
  vrai("15. A plus haut, B plus gros", A.h > B.h && vB > vA);
  dit(15, `$3{,}14 \\times ${A.r} \\times ${A.r} = ${T(bA)}$ cm², volume $${T(bA)} \\times ${A.h} = ${T(vA)}$ cm³`);
  dit(15, `$3{,}14 \\times ${B.r} \\times ${B.r} = ${T(bB)}$ cm², volume $${T(bB)} \\times ${B.h} = ${T(vB)}$ cm³`);
  dit(15, `$${T(vB)} - ${T(vA)} = ${T(vB - vA)}$ cm³`);
  dit(15, `Réponse : B contient environ $${Math.round(vB)}$ cm³, contre $${Math.round(vA)}$ cm³ pour A : environ $${Math.round(vB - vA)}$ cm³ de plus.`);
});
essai("16", () => {
  const s = pr(16, "schema");
  vrai("16. l'énoncé : volume 126", e(16).includes(`$${s.V}$ cm³`));
  dit(16, `$${s.L} \\times ${s.H} \\div 2 = ${s.L * s.H} \\div 2 = ${s.base}$ cm²`);
  dit(16, `$${s.V} \\div ${s.base} = ${s.p}$ cm`);
  dit(16, `$${s.V} \\div 7 = ${s.V / 7}$ cm³`);
  dit(16, `$${s.V / 7} \\div ${s.base} = ${s.V / 7 / s.base}$ cm`);
  dit(16, `$${s.p} \\div 7 = ${s.p / 7}$ cm`);
  dit(16, `On trouverait $${T(s.V / (s.L * s.H))}$ cm`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [q] = cyl(17, "figure");
  const rr = r9(q.r * q.r), aire = r9(PI * rr), V = r9(aire * q.h), L = r9(V * 1000);
  dit(17, `$${T(q.r)} \\times ${T(q.r)} = ${T(rr)}$`);
  dit(17, `$3{,}14 \\times ${T(rr)} = ${T(aire)}$ m²`);
  dit(17, `la cuve contient environ $${T(L)}$ L`);
  dit(17, `$100 + 450 = 550$ L`);
  vrai("17. elle déborde", 550 > L);
  dit(17, `$550 - ${T(L)} = ${T(550 - L)}$ L`);
  dit(17, `$${T(L)} \\div 10 = ${T(L / 10)}$ : on remplit $${Math.floor(L / 10)}$ arrosoirs`);
});
essai("18", () => {
  const s = pr(18, "schema");
  const fond = s.L * s.p;
  vrai("18. l'énoncé : fond 40 × 25, bord 32, eau 30", e(18).includes(`$${s.L}$ cm sur $${s.p}$ cm`) && e(18).includes(`$${s.H}$ cm de haut`) && e(18).includes(`$${s.o.niveau}$ cm de haut`));
  const g = r9(fond * 0.5);
  dit(18, `$${s.L} \\times ${s.p} \\times 0{,}5 = ${T(fond)} \\times 0{,}5 = ${g}$ cm³`);
  dit(18, `$${g} \\div 1\\,000 = ${T(g / 1000)}$ L`);
  dit(18, `$${g} \\times 2{,}7 = ${T(g * 2.7)}$ g, soit environ $${T(g * 2.7 / 1000)}$ kg`);
  const reste = s.H - s.o.niveau;
  dit(18, `$${s.H} - ${s.o.niveau} = ${reste}$ cm`);
  dit(18, `$${reste} \\div 0{,}5 = ${reste / 0.5}$ galets`);
});
essai("19", () => {
  const [bas, haut] = dessin("cylindres", 19, "figure")[0];
  const vol = (q) => r9(r9(PI * q.r * q.r) * q.h);
  const [v1, v2] = [vol(bas), vol(haut)];
  dit(19, `$${2 * bas.r} \\div 2 = ${bas.r}$ cm et $${2 * haut.r} \\div 2 = ${haut.r}$ cm`);
  dit(19, `$3{,}14 \\times ${bas.r} \\times ${bas.r} = ${T(PI * bas.r * bas.r)}$ cm², volume $${T(PI * bas.r * bas.r)} \\times ${bas.h} = ${T(v1)}$ cm³, soit environ $${T(Math.round(v1))}$ cm³`);
  dit(19, `$3{,}14 \\times ${haut.r} \\times ${haut.r} = ${T(PI * haut.r * haut.r)}$ cm², volume $${T(PI * haut.r * haut.r)} \\times ${haut.h} = ${T(v2)}$ cm³, soit environ $${T(Math.round(v2))}$ cm³`);
  dit(19, `$${T(v1)} + ${T(v2)} = ${T(v1 + v2)}$ cm³, soit environ $${T(Math.round(v1 + v2))}$ cm³`);
  dit(19, `$${T(Math.round(v1 + v2))} \\div 1\\,000 \\approx ${T(Math.round((v1 + v2) / 100) / 10)}$ L`);
  dit(19, `$${T(Math.round(v1 + v2))} \\div 16 \\approx ${Math.round((v1 + v2) / 16)}$ cm³`);
  vrai("19. avec les diamètres : quatre fois plus, près de 20 L", Math.abs((4 * (v1 + v2)) / 1000 - 20) < 1);
});
essai("20", () => {
  const [n] = dessin("cubeDecoupe", 20, "schema");
  const a = 3, A = a * n;
  dit(20, `$${a} \\times ${a} \\times ${a} = ${a ** 3}$ cm³`);
  dit(20, `$${a} \\times ${n} = ${A}$ cm`);
  dit(20, `$${A} \\times ${A} \\times ${A} = ${A ** 3}$ cm³`);
  dit(20, `$${A ** 3} \\div ${a ** 3} = ${A ** 3 / a ** 3}$`);
  dit(20, `$${n} \\times ${n} \\times ${n} = ${n ** 3}$ petits cubes`);
  dit(20, `$10 \\times 10 \\times 10 = 1\\,000$ fois plus grand`);
});

f.fin();
