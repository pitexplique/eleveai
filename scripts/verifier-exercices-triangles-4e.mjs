// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Le triangle : angles,
// droites, égalité et triangles semblables » de 4e
// (lib/fiches-exercices/maths-4e-triangles.tsx).
//
// ⭐ DEUX CHEMINS POUR CHAQUE VALEUR : le corrigé TROUVE un angle, un côté, un
// rapport ; ici on le refait autrement (balayage des longueurs entières,
// résolution de l'équation par essai, loi des sinus et d'Al-Kashi pour les
// longueurs qu'un élève MESURE, intersection des médiatrices par un système),
// puis on MESURE la même chose sur le triangle DESSINÉ.
//
// ⭐ LES DESSINS : chaque `tri(…)` est relu dans le source et ÉVALUÉ comme un
// objet JavaScript (il est écrit en clair). On vérifie : les angles étiquetés
// (à 0,5° près), l'angle droit au sommet marqué, les angles droits posés
// (`carres`), les côtés codés égaux, les longueurs à l'échelle (1 %), la NATURE
// de chaque droite ajoutée (hauteur : par le sommet et perpendiculaire ;
// médiatrice : par le milieu et perpendiculaire ; médiane : sommet → milieu),
// les triangles semblables dessinés à la même `echelle`, et que chaque étiquette
// tient dans le cadre de 260 × 200 (largeur estimée à 0,62 × la police par
// caractère, comme le gras du SVG).
//
//   node scripts/verifier-exercices-triangles-4e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

const rad = (d) => (d * Math.PI) / 180, deg = (r) => (r * 180) / Math.PI;
const long = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
const angle = (S, P, Q) => deg(Math.acos(((P[0] - S[0]) * (Q[0] - S[0]) + (P[1] - S[1]) * (Q[1] - S[1])) / (long(S, P) * long(S, Q))));
const autres = { A: ["B", "C"], B: ["A", "C"], C: ["A", "B"] };
const num = (t) => {
  const m = String(t).match(/\d+(?:,\d+)?/);
  return m ? Number(m[0].replace(",", ".")) : NaN;
};
const milieu = (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
/** Distance du point M à la droite (PQ). */
const distDroite = (M, P, Q) => Math.abs((Q[0] - P[0]) * (M[1] - P[1]) - (Q[1] - P[1]) * (M[0] - P[0])) / long(P, Q);
/** Cosinus de l'angle entre deux directions (0 : perpendiculaires). */
const cosDir = (P, Q, R, S) => ((Q[0] - P[0]) * (S[0] - R[0]) + (Q[1] - P[1]) * (S[1] - R[1])) / (long(P, Q) * long(R, S));
const pres = (a, b, e = 1e-3) => Math.abs(a - b) < e;
/** Un triangle existe-t-il ? Chaque côté contre les deux autres (en entiers de préférence). */
const existe = (x, y, z) => x < y + z && y < x + z && z < x + y;

/* ── Les dessins relus ─────────────────────────────────────────────────── */

/** Les arguments d'un appel, texte brut, en sautant les chaînes. */
function appel(texte, debut) {
  let prof = 0;
  let chaine = null;
  for (let i = debut; i < texte.length; i++) {
    const ch = texte[i];
    if (chaine) {
      if (ch === "\\") i++;
      else if (ch === chaine) chaine = null;
      continue;
    }
    if (ch === '"' || ch === "'") chaine = ch;
    else if ("([{".includes(ch)) prof++;
    else if (")]}".includes(ch)) {
      prof--;
      if (prof === 0) return texte.slice(debut + 1, i);
    }
  }
  throw new Error("appel non fermé");
}

/** Les `tri(…)` d'un bloc : { role, P, opts, brut }. */
function triangles(bloc) {
  return [...(bloc ?? "").matchAll(/\btri\(/g)].map((m) => {
    const brut = appel(bloc, m.index + 3);
    const avant = bloc.slice(0, m.index);
    const role = avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema";
    const [P, opts = {}] = Function(`"use strict"; return [${brut}];`)();
    return { role, P, opts, brut };
  });
}

/* ── La mise en page du dessin, refaite (celle de `tri()`) ─────────────── */

const W = 260, H = 200, MARGE = 36;
const unit = (x, y) => {
  const n = Math.hypot(x, y) || 1;
  return [x / n, y / n];
};
function miseEnPage({ P, opts }) {
  const reels = [P.A, P.B, P.C];
  for (const l of opts.lignes ?? []) reels.push(l.de, l.vers);
  for (const p of opts.points ?? []) reels.push(p.en);
  if (opts.cercle) {
    const [cx, cy] = opts.cercle.centre, r = opts.cercle.rayon;
    reels.push([cx - r, cy - r], [cx + r, cy + r]);
  }
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = opts.echelle ?? Math.min((W - 2 * MARGE) / (x1 - x0 || 1), (H - 2 * MARGE) / (y1 - y0 || 1));
  const ox = (W - (x1 - x0) * s) / 2, oy = (H - (y1 - y0) * s) / 2;
  const px = (p) => [ox + (p[0] - x0) * s, H - oy - (p[1] - y0) * s];
  const Q = { A: px(P.A), B: px(P.B), C: px(P.C) };
  const G = [(Q.A[0] + Q.B[0] + Q.C[0]) / 3, (Q.A[1] + Q.B[1] + Q.C[1]) / 3];
  const ancre = (dx) => (dx > 0.45 ? "start" : dx < -0.45 ? "end" : "middle");
  const textes = [];
  const t = (x, y, texte, taille, a) => textes.push({ x, y, texte, taille, a });
  for (const k of ["A", "B", "C"]) {
    const d = unit(Q[k][0] - G[0], Q[k][1] - G[1]);
    t(Q[k][0] + d[0] * 15, Q[k][1] + d[1] * 15, opts.noms?.[k] ?? k, 15, ancre(d[0]));
  }
  for (const c of ["AB", "BC", "CA"]) {
    const lab = opts.cotes?.[c];
    if (!lab) continue;
    const [p, q] = [Q[c[0]], Q[c[1]]];
    const M = milieu(p, q);
    let n = unit(-(q[1] - p[1]), q[0] - p[0]);
    if (n[0] * (M[0] - G[0]) + n[1] * (M[1] - G[1]) < 0) n = [-n[0], -n[1]];
    t(M[0] + n[0] * 14, M[1] + n[1] * 14, lab, 14, ancre(n[0]));
  }
  for (const [k, lab] of Object.entries(opts.angles ?? {})) {
    const V = Q[k];
    const [p, q] = autres[k].map((v) => Q[v]);
    const u1 = unit(p[0] - V[0], p[1] - V[1]), u2 = unit(q[0] - V[0], q[1] - V[1]);
    const ouvert = deg(Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1]))));
    const bi = unit(u1[0] + u2[0], u1[1] + u2[1]);
    const loin = 17 + (ouvert < 35 ? 26 : ouvert < 60 ? 19 : 15);
    let perp = unit(-bi[1], bi[0]);
    if (perp[0] > 0) perp = [-perp[0], -perp[1]];
    if (ouvert < 25) t(V[0] + bi[0] * 29 + perp[0] * 8, V[1] + bi[1] * 29 + perp[1] * 8, lab, 14, "end");
    else t(V[0] + bi[0] * loin, V[1] + bi[1] * loin, lab, 14, "middle");
  }
  for (const l of opts.lignes ?? []) if (l.nom && l.ou) t(...px(l.ou), l.nom, 13, l.ancre ?? "middle");
  for (const p of opts.points ?? []) {
    const [x, y] = px(p.en);
    const [dx, dy, a] = p.vers === "haut" ? [0, -14, "middle"] : p.vers === "gauche" ? [-10, 0, "end"] : p.vers === "droite" ? [10, 0, "start"] : [0, 15, "middle"];
    t(x + dx, y + dy, p.nom, 15, a);
  }
  const hors = textes.filter(({ x, y, texte, taille, a }) => {
    const L = [...texte].length * taille * 0.62;
    const [g, d] = a === "start" ? [x, x + L] : a === "end" ? [x - L, x] : [x - L / 2, x + L / 2];
    return g < 1 || d > W - 1 || y - taille / 2 < 1 || y + taille / 2 > H - 1;
  });
  const debords = reels.map(px).filter(([x, y]) => x < 0 || x > W || y < 0 || y > H);
  return { s, hors, debords };
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const b = (k) => f.blocs[k - 1] ?? "";
  const dit = (k, phrase) => v.ok(`${k}. « ${phrase} »`, c(k).includes(phrase), "absent du corrigé");
  let dessines = 0;
  const mesure = (P, s) => angle(P[s], P[autres[s][0]], P[autres[s][1]]);

  /** Les triangles dessinés sont fidèles à leurs étiquettes. Rend les triangles lus. */
  const fidele = (k, attendus = 1, role = "schema") => {
    const tous = triangles(b(k));
    const ts = tous.filter((t) => t.role === role);
    v.ok(`${k}. ${attendus} triangle(s) dessiné(s) (${role})`, ts.length === attendus, `${ts.length} lu(s)`);
    if (role === "schema" && ts.length) dessines++;
    for (const t of ts) {
      const { P, opts } = t;
      const { angles = {}, cotes = {}, trouve = [], egaux = [], droit, carres = [] } = opts;
      for (const [s, lab] of Object.entries(angles)) {
        const d = num(lab), m = mesure(P, s);
        v.ok(`${k}. l'angle ${lab} en ${s} est celui du dessin (${m.toFixed(2)}°)`, Math.abs(m - d) < 0.5, m.toFixed(2));
      }
      const valeurs = Object.values(angles).map(num);
      if (valeurs.length === 3) v.ok(`${k}. les trois angles étiquetés font 180°`, valeurs.reduce((x, y) => x + y) === 180, valeurs.join(" + "));
      if (droit) v.ok(`${k}. l'angle droit est bien en ${droit}`, Math.abs(mesure(P, droit) - 90) < 0.3, mesure(P, droit).toFixed(2));
      for (const s of trouve) {
        const n = angles[s] ? String(num(angles[s])) : "?";
        v.ok(`${k}. l'angle trouvé en ${s} (${n}°) est étiqueté et écrit dans le corrigé`, !!angles[s] && (c(k).includes(`${n}°`) || c(k).includes(`${n} degrés`)), n);
      }
      if (egaux.length >= 2) {
        const L = egaux.map((cote) => long(P[cote[0]], P[cote[1]]));
        v.ok(`${k}. les côtés codés égaux (${egaux.join(", ")}) le sont sur le dessin`, L.every((x) => Math.abs(x / L[0] - 1) < 0.01), L.map((x) => x.toFixed(3)).join(" / "));
      }
      const chiffres = Object.entries(cotes).map(([s, lab]) => [s, num(lab)]).filter(([, n]) => n > 0);
      if (chiffres.length >= 2) {
        const r = chiffres.map(([s, n]) => long(P[s[0]], P[s[1]]) / n);
        v.ok(`${k}. les côtés ${chiffres.map((x) => x[0]).join(", ")} sont dessinés à l'échelle`, r.every((x) => Math.abs(x / r[0] - 1) < 0.01), r.map((x) => x.toFixed(4)).join(" / "));
      }
      for (const [V, p, q] of carres) v.ok(`${k}. l'angle droit posé en (${V}) est droit`, Math.abs(cosDir(V, p, V, q)) < 1e-3, cosDir(V, p, V, q).toFixed(4));
      const textes = JSON.stringify(opts);
      v.ok(`${k}. aucun $ ni antislash dans le dessin (texte SVG, pas de KaTeX)`, !/[$\\]/.test(textes));
      const { hors, debords } = miseEnPage(t);
      v.ok(`${k}. toutes les étiquettes tiennent dans le cadre 260 × 200`, hors.length === 0, hors.map((h) => `« ${h.texte} » en (${h.x.toFixed(0)} ; ${h.y.toFixed(0)})`).join(" | "));
      v.ok(`${k}. le dessin tient dans le cadre`, debords.length === 0, `${debords.length} point(s) dehors`);
    }
    return ts;
  };
  /** Les cas `{ grand, petits }` du schéma des longueurs. */
  const barres = (k) => [...b(k).matchAll(/\{ grand: ([\d.]+), petits: \[([\d.]+), ([\d.]+)\] \}/g)].map((m) => [Number(m[1]), Number(m[2]), Number(m[3])]);
  /** Deux triangles dessinés semblables de rapport r (côtés AB, BC, CA). */
  const semblables = (t1, t2, r) =>
    ["AB", "BC", "CA"].every((cote) => Math.abs(long(t2.P[cote[0]], t2.P[cote[1]]) / long(t1.P[cote[0]], t1.P[cote[1]]) - r) < 2e-3);

  v.titre("★ Un seul geste");
  const T1 = 180 - 57 - 71;
  dit(1, `180° - 128° = ${T1}°`);
  dit(1, `$57 + 71 + ${T1} = 180$`);
  v.ok("1. le plus grand angle est S (71°)", Math.max(57, 71, T1) === 71);
  fidele(1);

  const M2 = 90 - 28;
  dit(2, `\\widehat{M} = 90° - 28° = ${M2}°$`);
  v.ok("2. un angle de 95° ne tient pas avec l'angle droit", 90 + 95 > 180);
  fidele(2);

  const cas3 = [[3, 8, 4], [6, 6, 10], [25, 60, 35]]; // c) en dixièmes : pas d'arrondi flottant
  const plat3 = cas3.map(([x, y, z]) => { const g = Math.max(x, y, z); return x + y + z - g === g; });
  const v3 = cas3.map(([x, y, z]) => existe(x, y, z));
  v.ok("3. non, oui, non (plat au c)", JSON.stringify(v3) === "[false,true,false]" && JSON.stringify(plat3) === "[false,false,true]");
  dit(3, "$3 + 4 = 7$");
  dit(3, "$2{,}5 + 3{,}5 = 6$");
  dit(3, "Réponse : a) non ; b) oui ; c) non, il est plat.");
  const l3 = barres(3);
  v.ok("3. le schéma porte les trois cas de l'énoncé", JSON.stringify(l3) === JSON.stringify([[8, 3, 4], [10, 6, 6], [6, 2.5, 3.5]]), JSON.stringify(l3));
  if (l3.length) dessines++;

  // 4. La nature de chaque droite, lue dans la GÉOMÉTRIE du dessin.
  const nature = (P, l) => {
    const parA = distDroite(P.A, l.de, l.vers) < 1e-3;
    const Mbc = milieu(P.B, P.C);
    const parM = distDroite(Mbc, l.de, l.vers) < 1e-3;
    const perp = Math.abs(cosDir(l.de, l.vers, P.B, P.C)) < 1e-3;
    if (parA && perp) return "hauteur";
    if (parM && perp && !parA) return "médiatrice";
    if (parA && parM) return "médiane";
    return "autre";
  };
  const [fig4] = fidele(4, 1, "figure");
  const [sch4] = fidele(4);
  if (fig4 && sch4) {
    const natures = fig4.opts.lignes.map((l) => [l.nom, nature(fig4.P, l)]);
    const qui = (n) => natures.find(([, x]) => x === n)?.[0]?.replace(/\((d)(\d)\)/, "$($1_$2)$");
    v.ok(`4. natures lues sur la figure : ${natures.map((x) => x.join(" = ")).join(", ")}`, new Set(natures.map((x) => x[1])).size === 3 && !natures.some((x) => x[1] === "autre"));
    dit(4, `Réponse : a) ${qui("hauteur")} ; b) ${qui("médiatrice")} ; c) ${qui("médiane")}.`);
    v.ok("4. le schéma nomme chaque droite par sa vraie nature", sch4.opts.lignes.every((l) => l.nom === nature(sch4.P, l)), sch4.opts.lignes.map((l) => `${l.nom} ≠ ${nature(sch4.P, l)}`).join(", "));
    v.ok("4. figure et schéma : les mêmes droites", JSON.stringify(fig4.P) === JSON.stringify(sch4.P) && fig4.opts.lignes.every((l, i) => JSON.stringify([l.de, l.vers]) === JSON.stringify([sch4.opts.lignes[i].de, sch4.opts.lignes[i].vers])));
    v.ok("4. le milieu de [BC] est codé", JSON.stringify(fig4.opts.milieux) === '["BC"]');
  }

  // 5. BC par Al-Kashi : ce qu'un élève mesurerait.
  const BC5 = Math.sqrt(5 ** 2 + 7 ** 2 - 2 * 5 * 7 * Math.cos(rad(44)));
  v.ok(`5. BC recalculé = ${BC5.toFixed(3)} cm, « 4,9 cm » à la mesure`, Math.round(BC5 * 10) === 49);
  dit(5, "$EF = BC = 4{,}9$ cm");
  const t5 = fidele(5, 2);
  v.ok("5. DEF est ABC retourné : mêmes côtés", t5.length === 2 && semblables(t5[0], t5[1], 1));

  const r6 = 9 / 6;
  v.ok("6. rapport 1,5, contrôlé sur EF = 4 × 1,5", r6 === 1.5 && 4 * r6 === 6);
  dit(6, `$DE = 8 \\times 1{,}5 = ${8 * r6}$ cm`);
  const t6 = fidele(6, 2);
  v.ok("6. le grand triangle est le petit × 1,5, à la même échelle", t6.length === 2 && semblables(t6[0], t6[1], 1.5) && t6[0].opts.echelle === t6[1].opts.echelle);

  // 7. L'ordre du protocole : chaque étape n'utilise que ce qui est déjà tracé.
  const besoins = { 1: ["demi-droite"], 2: [], 3: ["N", "M"], 4: ["M"] };
  const produit = { 1: ["N"], 2: ["M", "L"], 3: [], 4: ["demi-droite"] };
  const ordres = [];
  const permuter = (reste, fait) => {
    if (!reste.length) return ordres.push(fait);
    for (const e of reste) {
      const acquis = fait.flatMap((x) => produit[x]);
      if (besoins[e].every((x) => acquis.includes(x))) permuter(reste.filter((y) => y !== e), [...fait, e]);
    }
  };
  permuter([1, 2, 3, 4], []);
  v.ok(`7. un seul ordre possible : ${ordres.map((o) => o.join("-")).join(" ; ")}`, ordres.length === 1);
  dit(7, `Réponse : ${ordres[0].map((e) => `(${e})`).join(", ")}.`);
  const [t7] = fidele(7);
  if (t7) {
    v.ok("7. N à 4,5 de L, à 55° de [LM]", pres(long(t7.P.A, t7.P.C), 4.5) && Math.abs(mesure(t7.P, "A") - 55) < 0.05);
    const dd = t7.opts.lignes[0];
    v.ok("7. la demi-droite part de L et passe par N", pres(long(dd.de, t7.P.A), 0) && distDroite(t7.P.C, dd.de, dd.vers) < 1e-3 && long(dd.de, dd.vers) > long(t7.P.A, t7.P.C));
  }

  const E8 = (180 - 116) / 2;
  dit(8, `$64 \\div 2 = ${E8}$`);
  dit(8, "$116 + 90 + 90 = 296$");
  v.ok("8. 116 + 90 > 180 : pas d'angle droit", 116 + 90 > 180);
  fidele(8);

  v.titre("★★ Type devoir");
  const L9 = [...Array(60).keys()].filter((L) => existe(7, 12, L));
  v.ok(`9. longueurs par balayage : ${L9[0]} à ${L9.at(-1)}`, L9.length === 13 && L9[0] === 6 && L9.at(-1) === 18);
  dit(9, `$18 - 6 + 1 = ${L9.length}$`);
  v.ok("9. périmètre 40 : L = 21, impossible", !existe(7, 12, 40 - 19) && !L9.includes(21));
  dit(9, "$L = 40 - 7 - 12 = 21$");
  fidele(9, 2);

  const x10 = [...Array(181).keys()].filter((x) => x + (x + 20) + 2 * x === 180);
  v.ok(`10. x par balayage : ${x10}`, x10.length === 1 && x10[0] === 40);
  dit(10, `$x = 160 \\div 4 = ${x10[0]}$`);
  v.ok("10. 45 + 65 + 90 = 200 (le piège)", 45 + 65 + 90 === 200);
  const [t10] = fidele(10);
  v.ok("10. aucun angle droit sur le dessin", !!t10 && ["A", "B", "C"].every((s) => Math.abs(mesure(t10.P, s) - 90) > 5));

  const [t11] = fidele(11);
  if (t11) {
    const { A, B, C } = t11.P;
    const u = unit(C[0] - B[0], C[1] - B[1]);
    const k = (A[0] - B[0]) * u[0] + (A[1] - B[1]) * u[1];
    const Hp = [B[0] + k * u[0], B[1] + k * u[1]];
    const h = t11.opts.lignes.find((l) => l.couleur === "orange");
    const ext = t11.opts.lignes.find((l) => l.pointilles);
    v.ok("11. l'angle B est obtus", mesure(t11.P, "B") > 90);
    v.ok(`11. le pied H (${Hp.map((x) => x.toFixed(2))}) est hors de [BC]`, k < 0);
    v.ok("11. la hauteur dessinée va de A au pied H", !!h && pres(long(h.de, A), 0) && pres(long(h.vers, Hp), 0) && pres(long(t11.opts.points[0].en, Hp), 0));
    v.ok("11. le prolongement pointillé est sur (BC) et dépasse H", !!ext && distDroite(ext.de, B, C) < 1e-3 && distDroite(ext.vers, B, C) < 1e-3 && ext.vers[0] < Hp[0]);
    const aire = (long(B, C) * long(A, Hp)) / 2;
    v.ok(`11. BC = ${long(B, C)}, AH = ${long(A, Hp)}, aire = ${aire}`, aire === 6);
    dit(11, `= ${aire}$ cm²`);
  }

  const P12 = 180 - 42 - 65;
  const MP12 = (6 * Math.sin(rad(65))) / Math.sin(rad(P12)), NP12 = (6 * Math.sin(rad(42))) / Math.sin(rad(P12));
  v.ok(`12. loi des sinus : MP = ${MP12.toFixed(3)}, NP = ${NP12.toFixed(3)} (mesures 5,7 et 4,2)`, Math.round(MP12 * 10) === 57 && Math.round(NP12 * 10) === 42);
  dit(12, `180° - 42° - 65° = ${P12}°`);
  dit(12, "$MP = RT = 5{,}7$ cm et $NP = ST = 4{,}2$ cm");
  const t12 = fidele(12, 2);
  v.ok("12. RST dessiné égal à MNP", t12.length === 2 && semblables(t12[0], t12[1], 1));

  const C13 = 180 - 58 - 52, E13 = 180 - 58 - 70;
  v.ok("13. les angles des deux triangles : 58, 52, 70", C13 === 70 && E13 === 52);
  dit(13, `\\widehat{E} = 180° - 58° - 70° = ${E13}°$`);
  const AC13 = (6 * Math.sin(rad(52))) / Math.sin(rad(70));
  v.ok(`13. AC par la loi des sinus : ${AC13.toFixed(3)} cm, « 5 cm »`, Math.round(AC13) === 5);
  dit(13, `$DF = 5 \\times 1{,}5 = 7{,}5$ cm`);
  const t13 = fidele(13, 2);
  v.ok("13. DEF dessiné = ABC × 1,5, à la même échelle", t13.length === 2 && semblables(t13[0], t13[1], 1.5) && t13[0].opts.echelle === t13[1].opts.echelle);

  v.ok("14. 7-4,5-5,5 existe, 7-4,5-12 non (en dixièmes)", existe(70, 45, 55) && !existe(70, 45, 120));
  dit(14, "$4{,}5 + 5{,}5 = 10$");
  dit(14, "$7 + 4{,}5 = 11{,}5 < 12$");
  const [t14] = fidele(14);
  v.ok("14. les arcs de compas sont tracés", !!t14?.opts.arcs);

  const trie = (t) => [...t].sort((x, y) => x - y);
  v.ok("15. b) mêmes côtés rangés", trie([5, 6, 8]).join() === trie([8, 5, 6]).join());
  const r15 = trie([6, 8, 12]).map((x, i) => x / trie([3, 4, 6])[i]);
  v.ok(`15. c) rapports ${r15.join(", ")}`, r15.every((x) => x === 2));
  v.ok("15. d) 2 + 3 < 6, et 3-4-6 existe", !existe(2, 3, 6) && existe(3, 4, 6) && existe(5, 6, 8));
  dit(15, "Réponse : a) semblables ; b) égaux ; c) semblables, de rapport $2$ ; d) le second n'existe pas.");
  const t15 = fidele(15, 2);
  v.ok("15. le grand dessiné = le petit × 2, à la même échelle", t15.length === 2 && semblables(t15[0], t15[1], 2) && t15[0].opts.echelle === t15[1].opts.echelle);

  // 16. Le centre du cercle circonscrit par un système : |OA| = |OB| = |OC|.
  const [t16] = fidele(16);
  if (t16) {
    const { A, B, C } = t16.P;
    const [a1, b1, c1] = [2 * (B[0] - A[0]), 2 * (B[1] - A[1]), B[0] ** 2 + B[1] ** 2 - A[0] ** 2 - A[1] ** 2];
    const [a2, b2, c2] = [2 * (C[0] - A[0]), 2 * (C[1] - A[1]), C[0] ** 2 + C[1] ** 2 - A[0] ** 2 - A[1] ** 2];
    const dt = a1 * b2 - a2 * b1;
    const O = [(c1 * b2 - c2 * b1) / dt, (a1 * c2 - a2 * c1) / dt];
    const Od = t16.opts.points.find((p) => p.nom === "O")?.en;
    v.ok(`16. O calculé (${O.map((x) => x.toFixed(3))}) = O dessiné`, !!Od && pres(long(O, Od), 0));
    const cotes16 = [[A, B], [A, C], [B, C]];
    const bonnes = cotes16.filter(([p, q]) => t16.opts.lignes.some((l) => distDroite(milieu(p, q), l.de, l.vers) < 1e-3 && Math.abs(cosDir(l.de, l.vers, p, q)) < 1e-3 && distDroite(O, l.de, l.vers) < 1e-3));
    v.ok("16. trois médiatrices dessinées, toutes par O", t16.opts.lignes.length === 3 && bonnes.length === 3);
    const R = long(O, A);
    v.ok(`16. le cercle a pour centre O et pour rayon OA = ${R.toFixed(3)}`, pres(long(t16.opts.cercle.centre, O), 0) && pres(t16.opts.cercle.rayon, R) && pres(long(O, B), R) && pres(long(O, C), R));
    v.ok(`16. OA mesuré au millimètre : ${R.toFixed(2)} cm, « 4,5 cm »`, Math.round(R * 10) === 45);
    dit(16, "$OA = 4{,}5$ km");
  }

  v.titre("★★★ Problèmes");
  const C17 = 180 - 70 - 60;
  dit(17, `180° - 70° - 60° = ${C17}°`);
  const AC17 = (60 * Math.sin(rad(60))) / Math.sin(rad(C17));
  const larg = AC17 * Math.sin(rad(70));
  v.ok(`17. largeur recalculée : ${larg.toFixed(2)} m, soit ${(larg / 10).toFixed(2)} cm au 1/1000 (« 6,4 cm », « 64 m »)`, Math.round(larg / 10 * 10) === 64);
  dit(17, "$6\\,000 \\div 1\\,000 = 6$");
  dit(17, "$6{,}4 \\times 1\\,000 = 6\\,400$ cm, soit $64$ m");
  const [t17] = fidele(17);
  if (t17) {
    const { A, B, C } = t17.P;
    const h = t17.opts.lignes.find((l) => l.couleur === "orange");
    const rives = t17.opts.lignes.filter((l) => l.pointilles);
    v.ok("17. la hauteur part de C, perpendiculaire à (AB), pied sur (AB)", !!h && pres(long(h.de, C), 0) && Math.abs(cosDir(h.de, h.vers, A, B)) < 1e-6 && distDroite(h.vers, A, B) < 1e-6);
    v.ok("17. deux rives parallèles à (AB), l'une par A et B, l'autre par C", rives.length === 2 && rives.every((l) => Math.abs(Math.abs(cosDir(l.de, l.vers, A, B)) - 1) < 1e-9) && rives.some((l) => distDroite(C, l.de, l.vers) < 1e-3) && rives.some((l) => distDroite(A, l.de, l.vers) < 1e-3));
    v.ok("17. la hauteur dessinée mesure la largeur recalculée", !!h && Math.abs(long(h.de, h.vers) - larg) < 0.01);
  }

  const r18 = 18 / 1.2;
  v.ok(`18. rapport ${r18}, hauteur ${1.5 * r18} m`, Math.round(r18 * 1e9) / 1e9 === 15 && Math.round(1.5 * r18 * 10) / 10 === 22.5);
  dit(18, "$18 \\div 1{,}2 = 15$");
  dit(18, "$1{,}5 \\times 15 = 22{,}5$ m");
  v.ok("18. la vraie hauteur, 22,83 m, « environ 23 m »", Math.round(22.83) === 23);
  const soleil = deg(Math.atan(1.5 / 1.2));
  v.ok(`18. l'angle du soleil, mesuré sur un dessin : ${soleil.toFixed(2)}°, « environ 51° »`, Math.round(soleil) === 51 && 180 - 90 - 51 === 39);
  v.ok("18. le piège : 1,5 × (1,2 ÷ 18) = 10 cm", Math.round(1.5 * (1.2 / 18) * 100) === 10);
  const t18 = fidele(18, 2);
  v.ok("18. le triangle de l'obélisque est celui du bâton × 15", t18.length === 2 && semblables(t18[0], t18[1], 15));

  v.ok("19. 5 + 5 > 8", existe(5, 5, 8));
  const B19 = deg(Math.atan(3 / 4));
  v.ok(`19. l'angle à la base d'une ferme 8 m × 5 m : ${B19.toFixed(2)}°, « environ 37° »`, Math.round(B19) === 37);
  dit(19, "$\\widehat{BAC} \\approx 180° - 37° - 37° = 106°$");
  dit(19, "$180 \\div 2 = 90$");
  const [t19] = fidele(19);
  if (t19) {
    const { A, B, C } = t19.P;
    const Hm = milieu(B, C);
    const po = t19.opts.lignes[0];
    v.ok("19. le poinçon va de A au milieu de [BC]", pres(long(po.de, A), 0) && pres(long(po.vers, Hm), 0) && pres(long(t19.opts.points[0].en, Hm), 0));
    v.ok("19. ABH et ACH ont leurs trois côtés égaux deux à deux", pres(long(A, B), long(A, C)) && pres(long(B, Hm), long(C, Hm)));
    v.ok("19. le poinçon est perpendiculaire à l'entrait", Math.abs(cosDir(A, Hm, B, C)) < 1e-9);
    v.ok("19. AB = 5 et BC = 8 sur le dessin", pres(long(A, B), 5) && pres(long(B, C), 8));
  }

  // 20. En hectomètres entiers : pas d'arrondi flottant.
  const AC20 = [...Array(400).keys()].filter((x) => existe(120, 90, x));
  v.ok(`20. AC de ${AC20[0]} à ${AC20.at(-1)} dam (balayage), bornes 0,3 et 2,1 km exclues`, AC20[0] === 31 && AC20.at(-1) === 209 && !existe(120, 90, 230));
  v.ok("20. 1,2 km et 0,9 km au 1/10 000 : 12 cm et 9 cm", 120000 / 10000 === 12 && 90000 / 10000 === 9);
  dit(20, "$120\\,000 \\div 10\\,000 = 12$");
  dit(20, "$AC < 1{,}2 + 0{,}9 = 2{,}1$ km");
  dit(20, "$AC > 1{,}2 - 0{,}9 = 0{,}3$ km");
  v.ok("20. 13 cm → 1,3 km ; détour 0,8 km", (13 * 10000) / 100000 === 1.3 && 210 - 130 === 80);
  dit(20, "$2{,}1 - 1{,}3 = 0{,}8$ km, soit $800$ m");
  fidele(20);
  const l20 = barres(20);
  v.ok("20. les barres : 2,3 km puis 1,3 km contre 1,2 + 0,9", JSON.stringify(l20) === "[[2.3,1.2,0.9],[1.3,1.2,0.9]]", JSON.stringify(l20));

  v.titre("Les schémas");
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20, String(dessines));
}

lancer({
  nom: "LE TRIANGLE POUR DÉMONTRER · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-triangles.tsx",
  notionId: "triangle_figure",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : le sommet T déplacé, les angles ne sont plus ceux du dessin", "C: [3.921, 6.0378]", "C: [4.3, 6.0378]"],
    ["ex. 1 : un angle faux", "180° - 128° = 52°", "180° - 128° = 54°"],
    ["ex. 2 : l'angle droit au mauvais sommet", 'droit: "A" })', 'droit: "B" })'],
    ["ex. 3 : le triangle plat accepté", "c) non, il est plat.", "c) oui."],
    ["ex. 3 : les barres ne sont plus celles de l'énoncé", "{ grand: 6, petits: [2.5, 3.5] }", "{ grand: 6, petits: [2.5, 3] }"],
    ["ex. 4 : hauteur et médiatrice échangées", "a) $(d_3)$ ; b) $(d_2)$", "a) $(d_2)$ ; b) $(d_3)$"],
    ["ex. 4 : la « hauteur » du schéma n'est plus perpendiculaire", 'vers: [9, -1], couleur: "orange"', 'vers: [8.5, -1], couleur: "orange"'],
    ["ex. 5 : EF faux", "$EF = BC = 4{,}9$ cm", "$EF = BC = 7$ cm"],
    ["ex. 6 : ajouter au lieu de multiplier", "$DE = 8 \\\\times 1{,}5 = 12$ cm", "$DE = 8 + 3 = 11$ cm"],
    ["ex. 6 : le grand triangle n'est plus un agrandissement", "C: [7.875, 4.3571]", "C: [7.875, 5]"],
    ["ex. 7 : N placé avant la demi-droite", "Réponse : (2), (4), (1), (3).", "Réponse : (2), (1), (4), (3)."],
    ["ex. 8 : 180 divisé par deux", "$64 \\\\div 2 = 32$", "$180 \\\\div 2 = 90$"],
    ["ex. 9 : les bornes comptées", "$18 - 6 + 1 = 13$", "$19 - 5 + 1 = 15$"],
    ["ex. 10 : le + 20 oublié", "$x = 160 \\\\div 4 = 40$", "$x = 180 \\\\div 4 = 45$"],
    ["ex. 11 : A déplacé, le pied tombe dans [BC]", "A: [-2, 3]", "A: [1, 3]"],
    ["ex. 12 : les côtés associés au hasard", "$MP = RT = 5{,}7$ cm et $NP = ST = 4{,}2$ cm", "$MP = ST = 4{,}2$ cm et $NP = RT = 5{,}7$ cm"],
    ["ex. 13 : DF faux", "$DF = 5 \\\\times 1{,}5 = 7{,}5$ cm", "$DF = 5 \\\\times 1{,}5 = 8$ cm"],
    ["ex. 14 : l'impossible accepté", "$7 + 4{,}5 = 11{,}5 < 12$", "$7 + 4{,}5 = 12{,}5 > 12$"],
    ["ex. 15 : semblables pris pour égaux", "c) semblables, de rapport $2$ ;", "c) égaux ;"],
    ["ex. 16 : l'antenne mal placée", 'en: [4, 2], nom: "O"', 'en: [4, 2.5], nom: "O"'],
    ["ex. 16 : une médiatrice de travers", "{ de: [3, 1], vers: [6.5, 4.5]", "{ de: [3, 1], vers: [6.5, 4]"],
    ["ex. 17 : l'échelle oubliée", "soit $64$ m", "soit $6{,}4$ m"],
    ["ex. 18 : le rapport faux", "$18 \\\\div 1{,}2 = 15$", "$18 \\\\div 1{,}2 = 12$"],
    ["ex. 18 : une étiquette trop longue sort du cadre", 'BC: "22,5 m"', 'BC: "? hauteur = 22,5 m"'],
    ["ex. 19 : l'angle au sommet faux", "37° - 37° = 106°$", "37° - 37° = 116°$"],
    ["ex. 19 : le poinçon ne va plus au milieu", 'lignes: [{ de: [4, 3], vers: [4, 0]', 'lignes: [{ de: [4, 3], vers: [3.5, 0]'],
    ["ex. 20 : le détour faux", "$2{,}1 - 1{,}3 = 0{,}8$ km", "$2{,}1 - 1{,}3 = 0{,}6$ km"],
    ["une micro d'une autre notion", 'micros: ["triangle_droites"],\n        },\n        {\n          enonce:\n            "Les triangles $ABC$ et $DEF$ vérifient', 'micros: ["pythagore_theoreme"],\n        },\n        {\n          enonce:\n            "Les triangles $ABC$ et $DEF$ vérifient'],
    ["un $ dans un dessin", 'cotes: { AB: "60 m" }', 'cotes: { AB: "$60$ m" }'],
  ],
});
