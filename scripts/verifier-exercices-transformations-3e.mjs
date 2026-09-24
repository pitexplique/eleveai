// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Transformations et
// homothétie » de 3e (lib/fiches-exercices/maths-3e-transformations.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé COMPTE des carreaux ; ici chaque image est
// recalculée par coordonnées — symétrie d'axe x = a ou y = b, symétrie de
// centre, translation, rotation d'un quart de tour dans un sens ou dans
// l'autre, homothétie de rapport k (négatif compris). Puis :
// - chaque point image est lu dans la phrase du corrigé (« A'(9 ; 3) ») ;
// - chaque segment DESSINÉ (`pts`, couleur par couleur) est relu dans le source
//   et doit être EXACTEMENT celui du modèle : ni un de plus, ni un de moins ;
// - chaque point étiqueté est à sa place, à 2 carreaux au moins des axes du
//   repère et loin du bord de la fenêtre ;
// - les droites grises d'une homothétie passent par le centre ;
// - longueurs × |k|, aires × k², recalculées.
//
//   node scripts/verifier-exercices-transformations-3e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── Les transformations, par coordonnées ─────────────────────────────── */
const symV = (a) => ([x, y]) => [2 * a - x, y]; // axe vertical x = a
const symH = (b) => ([x, y]) => [x, 2 * b - y]; // axe horizontal y = b
const symC = ([a, b]) => ([x, y]) => [2 * a - x, 2 * b - y];
const trans = ([u, w]) => ([x, y]) => [x + u, y + w];
/** Quart de tour de centre c : sens = +1 contraire des aiguilles, −1 celui des aiguilles. */
const quart = ([a, b], sens) => ([x, y]) => (sens > 0 ? [a - (y - b), b + (x - a)] : [a + (y - b), b - (x - a)]);
const homo = ([a, b], k) => ([x, y]) => [a + k * (x - a), b + k * (y - b)];

const dist = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
const proche = (x, y, eps = 1e-9) => Math.abs(x - y) < eps;
/** Aire d'un polygone (lacet). */
const aire = (pts) => Math.abs(pts.reduce((s, [x, y], i) => { const [u, w] = pts[(i + 1) % pts.length]; return s + x * w - u * y; }, 0)) / 2;
/** Un nombre écrit comme dans la feuille : 1\,875\,000\,000 ; 1{,}6875. */
function fr(x) {
  const s = String(+x.toFixed(6));
  const [e, f] = s.replace("-", "").split(".");
  const groupe = e.length >= 4 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : e;
  return (x < 0 ? "-" : "") + (f ? `${groupe}{,}${f}` : groupe);
}
const pt = (nom, [x, y]) => `${nom}(${fr(x)}\\,;\\,${fr(y)})`;

/* ── La lecture des dessins ───────────────────────────────────────────── */
const COULEURS = ["BLEU", "ORANGE", "VERT", "VIOLET", "GRIS"];
/** Les segments d'une liste de lignes : un polygone fermé dès trois sommets. */
const bords = (pts) => (pts.length > 2 ? pts.map((p, i) => [p, pts[(i + 1) % pts.length]]) : [[pts[0], pts[1]]]);
const cleSeg = ([P, Q]) => [P.join(","), Q.join(",")].sort().join(" | ");

/** Un appel `trace(…)` relu : fenêtre, segments par couleur, points étiquetés. */
function lireTrace(texte) {
  const fen = texte.match(/trace\(\s*\[(-?\d+), (-?\d+)\]/);
  const segs = Object.fromEntries(COULEURS.map((c) => [c, []]));
  for (const m of texte.matchAll(/\{ pts: \[((?:\[-?[\d.]+, -?[\d.]+\](?:, )?)+)\](?:, couleur: ([A-Z]+))? \}/g)) {
    const pts = [...m[1].matchAll(/\[(-?[\d.]+), (-?[\d.]+)\]/g)].map((p) => [Number(p[1]), Number(p[2])]);
    const c = m[2] ?? "BLEU";
    if (!segs[c]) segs[c] = [];
    segs[c].push(...bords(pts).map(cleSeg));
  }
  const points = [...texte.matchAll(/\{ x: (-?[\d.]+), y: (-?[\d.]+), label: "([^"]+)" \}/g)].map((m) => [m[3], Number(m[1]), Number(m[2])]);
  return { fenetre: fen ? [Number(fen[1]), Number(fen[2])] : null, segs, points };
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const ecrit = (k, texte, quoi = texte) => v.ok(`${k}. le corrigé écrit « ${quoi} »`, c(k).includes(texte), "absent du corrigé");
  /** Les images calculées ICI, lues dans le corrigé — et CHAQUE mention du
   *  point (étape et réponse) porte les mêmes coordonnées. */
  const images = (k, P) =>
    Object.entries(P).forEach(([nom, p]) => {
      ecrit(k, pt(nom, p));
      const echappe = nom.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const mentions = [...c(k).matchAll(new RegExp(`(?<![A-Za-z_'])${echappe}\\(([^)]*)\\)`, "g"))].map((m) => `${nom}(${m[1]})`);
      const autres = mentions.filter((m) => m !== pt(nom, p));
      v.ok(`${k}. les ${mentions.length} mentions de ${nom} ont les mêmes coordonnées`, autres.length === 0, autres.join(" ; "));
    });
  const parties = (k) => {
    const b = f.blocs[k - 1] ?? "";
    const iF = b.indexOf("figure: trace("), iC = b.indexOf("correction:"), iS = b.indexOf("schema: trace(");
    return {
      figure: iF >= 0 && iF < iC ? b.slice(iF, iC) : null,
      schema: iS >= 0 ? b.slice(iS, b.indexOf("micros:", iS)) : null,
    };
  };
  /**
   * Le dessin relu = le modèle. `lignes` : { COULEUR: [polygones en coordonnées] } ;
   * `P` : les points nommés du modèle (toute étiquette doit y être, à sa place).
   */
  const dessin = (k, quoi, lignes, P) => {
    const texte = parties(k)[quoi];
    v.ok(`${k}. le ${quoi === "figure" ? "dessin de l'énoncé" : "schéma du corrigé"} existe`, !!texte);
    if (!texte) return;
    const lu = lireTrace(texte);
    for (const col of new Set([...COULEURS, ...Object.keys(lignes)])) {
      const attendu = new Set((lignes[col] ?? []).flatMap((pts) => bords(pts).map(cleSeg)));
      const vus = new Set(lu.segs[col] ?? []);
      const manque = [...attendu].filter((s) => !vus.has(s));
      const enTrop = [...vus].filter((s) => !attendu.has(s));
      if (attendu.size || vus.size)
        v.ok(`${k}. ${quoi} : les ${vus.size} segments ${col} sont ceux du modèle`, manque.length === 0 && enTrop.length === 0, `manque ${manque.join(" ; ")} — en trop ${enTrop.join(" ; ")}`);
    }
    const mal = lu.points.filter(([l, x, y]) => !P[l] || P[l][0] !== x || P[l][1] !== y);
    v.ok(`${k}. ${quoi} : les ${lu.points.length} points étiquetés sont à leur place`, lu.points.length >= 2 && mal.length === 0, JSON.stringify(mal));
    const [mn, mx] = lu.fenetre ?? [0, 0];
    v.ok(`${k}. ${quoi} : fenêtre carrée, min < 0`, !!lu.fenetre && mn < 0 && mx > mn);
    // ⛔ Une étiquette près d'un axe du repère se mêle à ses graduations ; près
    // du bord, elle sort du cadre.
    const genants = lu.points.filter(([, x, y]) => [x, y].some((t) => Math.abs(t) < 2 || t > mx - 1 || t < mn + 1));
    v.ok(`${k}. ${quoi} : points à 2 carreaux des axes, loin du bord`, genants.length === 0, JSON.stringify(genants));
    const hors = Object.values(lu.segs).flat().filter((s) => s.split(/ \| |,/).map(Number).some((t) => t < mn || t > mx));
    v.ok(`${k}. ${quoi} : tous les segments dans la fenêtre`, hors.length === 0, hors.join(" ; "));
  };
  /** Les droites grises d'une homothétie ou d'une symétrie centrale passent par le centre. */
  const parLeCentre = (k, O) => {
    const lu = lireTrace(parties(k).schema ?? "");
    const gris = (lu.segs.GRIS ?? []).map((s) => s.split(" | ").map((p) => p.split(",").map(Number)));
    const faux = gris.filter(([P, Q]) => !proche(dist(P, O) + dist(O, Q), dist(P, Q), 1e-9));
    v.ok(`${k}. les ${gris.length} droites grises passent par le centre (${O})`, gris.length > 0 && faux.length === 0, JSON.stringify(faux));
  };
  const nomme = (noms, pts, prime = "'") => Object.fromEntries(noms.map((n, i) => [n + prime, pts[i]]));
  const base = (noms, pts) => Object.fromEntries(noms.map((n, i) => [n, pts[i]]));

  v.titre("★ Un seul geste");
  // 1. Symétrie d'axe x = 6.
  const F1 = [[3, 3], [5, 3], [3, 7]], s1 = symV(6), I1 = F1.map(s1);
  const P1 = { ...base(["A", "B", "C"], F1), ...nomme(["A", "B", "C"], I1) };
  images(1, nomme(["A", "B", "C"], I1));
  v.ok("1. B' est à 1 carreau de l'axe, comme B", Math.abs(I1[1][0] - 6) === 1 && Math.abs(F1[1][0] - 6) === 1);
  dessin(1, "figure", { BLEU: [F1], GRIS: [[[6, 1], [6, 10]]] }, P1);
  dessin(1, "schema", { BLEU: [F1], ORANGE: [I1], GRIS: [[[6, 1], [6, 10]]] }, P1);

  // 2. Symétrie de centre O(6 ; 5).
  const O2 = [6, 5], F2 = [[3, 6], [5, 8], [5, 6]], I2 = F2.map(symC(O2));
  const P2 = { O: O2, ...base(["D", "E", "F"], F2), ...nomme(["D", "E", "F"], I2) };
  images(2, nomme(["D", "E", "F"], I2));
  dessin(2, "figure", { BLEU: [F2] }, P2);
  dessin(2, "schema", { BLEU: [F2], ORANGE: [I2], GRIS: [[F2[0], I2[0]], [F2[1], I2[1]]] }, P2);
  parLeCentre(2, O2);

  // 3. Translation qui transforme A(2 ; 5) en A'(6 ; 3).
  const F3 = [[2, 5], [5, 5], [2, 8]], A3 = [6, 3];
  const t3 = trans([A3[0] - F3[0][0], A3[1] - F3[0][1]]), I3 = F3.map(t3);
  v.ok("3. l'image de A est bien A'", String(I3[0]) === String(A3));
  const P3 = { ...base(["A", "B", "C"], F3), ...nomme(["A", "B", "C"], I3) };
  images(3, nomme(["B", "C"], I3.slice(1)));
  ecrit(3, "$4$ carreaux à droite, $2$ vers le bas", "le déplacement 4 à droite, 2 en bas");
  dessin(3, "figure", { BLEU: [F3] }, P3);
  dessin(3, "schema", { BLEU: [F3], ORANGE: [I3], GRIS: F3.map((p, i) => [p, I3[i]]) }, P3);

  // 4. Quart de tour de centre O(5 ; 4), sens contraire des aiguilles.
  const O4 = [5, 4], F4 = [[7, 4], [9, 4], [7, 6]], I4 = F4.map(quart(O4, +1));
  const P4 = { O: O4, ...base(["A", "B", "C"], F4), ...nomme(["A", "B", "C"], I4) };
  images(4, nomme(["A", "B", "C"], I4));
  const piege4 = quart(O4, -1)(F4[0]);
  ecrit(4, `en $(${piege4[0]}\\,;\\,${piege4[1]})$`, "le A du piège (sens des aiguilles)");
  v.ok("4. les distances à O sont conservées", F4.every((p, i) => proche(dist(O4, p), dist(O4, I4[i]))));
  dessin(4, "figure", { BLEU: [F4] }, P4);
  dessin(4, "schema", { BLEU: [F4], ORANGE: [I4], GRIS: [[O4, F4[0]], [O4, I4[0]]] }, P4);

  // 5. Reconnaître : O(2 ; 2), rapport 2.
  const O5 = [2, 2], F5 = [[3, 3], [5, 3], [3, 5]], I5 = F5.map(homo(O5, 2));
  const P5 = { O: O5, ...base(["A", "B", "C"], F5), ...nomme(["A", "B", "C"], I5) };
  v.ok("5. A'B' = 2 × AB", proche(dist(I5[0], I5[1]), 2 * dist(F5[0], F5[1])) && dist(F5[0], F5[1]) === 2);
  ecrit(5, "rapport $k = 2$");
  ecrit(5, "$A'B' = 4$ carreaux");
  dessin(5, "figure", { BLEU: [F5], ORANGE: [I5] }, P5);
  dessin(5, "schema", { BLEU: [F5], ORANGE: [I5], GRIS: I5.map((p) => [O5, p]) }, P5);
  parLeCentre(5, O5);

  // 6. O(3 ; 3) : A par k = 3, B par k = 1/2.
  const O6 = [3, 3], A6 = [5, 4], B6 = [7, 7];
  const A6p = homo(O6, 3)(A6), B6p = homo(O6, 0.5)(B6);
  images(6, { "A'": A6p, "B'": B6p });
  const faux6 = [A6[0] + 3 * (A6[0] - O6[0]), A6[1] + 3 * (A6[1] - O6[1])];
  ecrit(6, `en $(${faux6[0]}\\,;\\,${faux6[1]})$`, "le A' du piège (parti de A)");
  v.ok("6. le piège est bien quatre fois plus loin de O", proche(dist(O6, faux6), 4 * dist(O6, A6)));
  const P6 = { O: O6, A: A6, B: B6, "A'": A6p, "B'": B6p };
  dessin(6, "figure", {}, P6);
  dessin(6, "schema", { GRIS: [[O6, A6p], [O6, B6]] }, P6);
  parLeCentre(6, O6);

  // 7. Le rapport par quotient, avec son signe.
  ecrit(7, `$7{,}5 \\div 2{,}5 = ${fr(7.5 / 2.5)}$`);
  ecrit(7, `$k = ${7.5 / 2.5}$`);
  v.ok("7. 4 ÷ 6 = 2/3", proche(4 / 6, 2 / 3));
  ecrit(7, "$k = \\dfrac{2}{3}$");
  ecrit(7, `$3 \\div 5 = ${fr(3 / 5)}$`);
  ecrit(7, `donc $k = ${fr(-3 / 5)}$`, "k = −0,6 (O entre A et A')");
  ecrit(7, `Réponse : $k = ${7.5 / 2.5}$ ; $k = \\dfrac{2}{3}$ ; $k = ${fr(-3 / 5)}$.`);
  ecrit(7, `$7{,}5 - 2{,}5 = ${fr(7.5 - 2.5)}$`);

  // 8. Carré, O(8 ; 8), k = −3.
  const O8 = [8, 8], k8 = -3, F8 = [[9, 9], [10, 9], [10, 10], [9, 10]], I8 = F8.map(homo(O8, k8));
  const P8 = { O: O8, ...base(["A", "B", "C", "D"], F8), ...nomme(["A", "B", "C", "D"], I8) };
  images(8, nomme(["A", "B", "C", "D"], I8));
  const cote8 = dist(I8[0], I8[1]), aire8 = aire(I8);
  v.ok(`8. côté ${cote8} = 1 × |k|, aire ${aire8} = 1 × k²`, proche(cote8, Math.abs(k8) * dist(F8[0], F8[1])) && proche(aire8, k8 * k8 * aire(F8)));
  ecrit(8, `$1 \\times ${Math.abs(k8)} = ${cote8}$ carreaux`);
  ecrit(8, `$(${k8})^2 = ${k8 * k8}$ : $1 \\times ${k8 * k8} = ${aire8}$ carreaux`);
  v.ok("8. l'image est de l'autre côté de O (k < 0)", I8.every((p) => p[0] < O8[0] && p[1] < O8[1]) && F8.every((p) => p[0] > O8[0]));
  dessin(8, "figure", { BLEU: [F8] }, P8);
  dessin(8, "schema", { BLEU: [F8], ORANGE: [I8], GRIS: [[F8[2], I8[2]], [F8[1], I8[1]]] }, P8);
  parLeCentre(8, O8);

  v.titre("★★ Type devoir");
  // 9. Deux symétries d'axes perpendiculaires x = 5 puis y = 5.
  const F9 = [[2, 6], [4, 6], [2, 8]], I9 = F9.map(symV(5)), J9 = I9.map(symH(5)), C9 = [5, 5];
  const P9 = { I: C9, ...base(["A", "B", "C"], F9), ...nomme(["A", "B", "C"], I9), ...nomme(["A", "B", "C"], J9, "''") };
  images(9, nomme(["A", "B", "C"], I9));
  images(9, nomme(["A", "B", "C"], J9, "''"));
  v.ok("9. A''B''C'' = symétrique de ABC par rapport à I (milieux)", F9.every((p, i) => String(symC(C9)(p)) === String(J9[i])));
  ecrit(9, "c'est le point $I$");
  ecrit(9, "Réponse : la symétrie de centre $I$.");
  const axes9 = [[[5, 1], [5, 10]], [[1, 5], [10, 5]]];
  dessin(9, "figure", { BLEU: [F9], GRIS: axes9 }, P9);
  dessin(9, "schema", { BLEU: [F9], ORANGE: [I9], VIOLET: [J9], GRIS: axes9 }, P9);

  // 10. O(6 ; 6), k = −2.
  const O10 = [6, 6], F10 = [[7, 7], [8, 7], [7, 8]], I10 = F10.map(homo(O10, -2));
  const P10 = { O: O10, ...base(["A", "B", "C"], F10), ...nomme(["A", "B", "C"], I10) };
  images(10, nomme(["A", "B", "C"], I10));
  v.ok("10. A'B' = 2 × AB", proche(dist(I10[0], I10[1]), 2 * dist(F10[0], F10[1])));
  ecrit(10, `$AB = ${dist(F10[0], F10[1])}$ carreau et $A'B' = ${dist(I10[0], I10[1])}$ carreaux`);
  dessin(10, "figure", { BLEU: [F10] }, P10);
  dessin(10, "schema", { BLEU: [F10], ORANGE: [I10], GRIS: F10.map((p, i) => [p, I10[i]]) }, P10);
  parLeCentre(10, O10);

  // 11. Retrouver le centre : intersection de (AA') et (BB').
  const F11 = [[8, 4], [8, 6], [6, 4]], I11 = [[6, 5], [6, 9], [2, 5]];
  const inter = ([P, Pp], [Q, Qp]) => {
    const [a, b] = [Pp[0] - P[0], Pp[1] - P[1]], [cc, d] = [Qp[0] - Q[0], Qp[1] - Q[1]];
    const den = a * d - b * cc;
    const t = ((Q[0] - P[0]) * d - (Q[1] - P[1]) * cc) / den;
    return [+(P[0] + t * a).toFixed(9), +(P[1] + t * b).toFixed(9)];
  };
  const O11 = inter([F11[0], I11[0]], [F11[1], I11[1]]);
  const k11 = (I11[0][0] - O11[0]) / (F11[0][0] - O11[0]);
  v.ok(`11. centre (${O11}) et rapport ${k11} : les trois sommets s'y plient`, F11.every((p, i) => String(homo(O11, k11)(p)) === String(I11[i])));
  ecrit(11, pt("O", O11));
  ecrit(11, `dans le même sens : $k = ${k11}$`);
  ecrit(11, `Réponse : le centre est $${pt("O", O11)}$ et le rapport est $k = ${k11}$.`);
  ecrit(11, `$AB = ${dist(F11[0], F11[1])}$ carreaux, $A'B' = ${dist(I11[0], I11[1])}$ carreaux`);
  const P11 = { O: O11, ...base(["A", "B", "C"], F11), ...nomme(["A", "B", "C"], I11) };
  dessin(11, "figure", { BLEU: [F11], ORANGE: [I11] }, P11);
  dessin(11, "schema", { BLEU: [F11], ORANGE: [I11], GRIS: I11.map((p) => [O11, p]) }, P11);
  parLeCentre(11, O11);

  // 12. La photo : 10 × 15 → 20 × 30, O au coin, 1 carreau = 5 cm.
  const O12 = [2, 2], F12 = [[2, 2], [4, 2], [4, 5], [2, 5]];
  const k12 = 20 / 10;
  v.ok("12. même rapport sur les deux dimensions", 30 / 15 === k12);
  const I12 = F12.map(homo(O12, k12));
  v.ok("12. le dessin est à l'échelle : 1 carreau = 5 cm", dist(F12[0], F12[1]) * 5 === 10 && dist(F12[1], F12[2]) * 5 === 15 && dist(I12[0], I12[1]) * 5 === 20 && dist(I12[1], I12[2]) * 5 === 30);
  ecrit(12, `$10 \\times 15 = ${10 * 15}$ cm²`);
  ecrit(12, `$20 \\times 30 = ${20 * 30}$ cm²`);
  ecrit(12, `$600 \\div 150 = ${(20 * 30) / (10 * 15)}$`);
  v.ok("12. aire × k²", (20 * 30) / (10 * 15) === k12 ** 2 && proche(aire(I12), k12 ** 2 * aire(F12)));
  ecrit(12, `rapport $k = ${k12}$`);
  const P12 = { O: O12, ...base(["A", "B", "C"], F12.slice(1)), ...nomme(["A", "B", "C"], I12.slice(1)) };
  dessin(12, "figure", { BLEU: [F12] }, P12);
  dessin(12, "schema", { BLEU: [F12], ORANGE: [I12], GRIS: [[O12, I12[2]]] }, P12);
  parLeCentre(12, O12);

  // 13. Le drapeau : quart de tour dans le sens des aiguilles, puis demi-tour.
  const O13 = [6, 5], mat = [O13, [6, 8]], toile = [[6, 8], [8, 7], [6, 6]];
  const r13 = quart(O13, -1), d13 = symC(O13);
  const P13 = { O: O13, A: [6, 8], B: [8, 7], "A'": r13([6, 8]), "B'": r13([8, 7]), "A''": d13([6, 8]), "B''": d13([8, 7]) };
  v.ok("13. deux quarts de tour = un demi-tour", String(r13(r13([8, 7]))) === String(d13([8, 7])));
  images(13, { "A'": P13["A'"], "B'": P13["B'"], "A''": P13["A''"], "B''": P13["B''"] });
  const piege13 = quart(O13, +1)([6, 8]);
  ecrit(13, `en $(${piege13[0]}\\,;\\,${piege13[1]})$`, "le A du piège (autre sens)");
  dessin(13, "figure", { BLEU: [mat, toile] }, P13);
  dessin(13, "schema", { BLEU: [mat, toile], ORANGE: [mat.map(r13), toile.map(r13)], VIOLET: [mat.map(d13), toile.map(d13)] }, P13);

  // 14. Carré de côté 2, O(2 ; 2), k = 1,5.
  const O14 = [2, 2], k14 = 1.5, F14 = [[4, 4], [6, 4], [6, 6], [4, 6]], I14 = F14.map(homo(O14, k14));
  const P14 = { O: O14, ...base(["A", "B", "C", "D"], F14), ...nomme(["A", "B", "C", "D"], I14) };
  images(14, nomme(["A", "B", "C", "D"], I14));
  const c14 = dist(I14[0], I14[1]);
  v.ok(`14. côté ${c14}, périmètre ${4 * c14}, aire ${aire(I14)} = 4 × 1,5²`, c14 === 3 && proche(aire(I14), aire(F14) * k14 ** 2));
  ecrit(14, `$2 \\times 1{,}5 = ${fr(c14)}$ carreaux`);
  ecrit(14, `$4 \\times 3 = ${4 * c14}$ carreaux`);
  ecrit(14, `$1{,}5^2 = ${fr(k14 ** 2)}$, et $4 \\times 2{,}25 = ${fr(aire(I14))}$`);
  ecrit(14, `trouver $${fr(aire(F14) * k14)}$ carreaux`, "le piège aire × 1,5");
  dessin(14, "figure", { BLEU: [F14] }, P14);
  dessin(14, "schema", { BLEU: [F14], ORANGE: [I14], GRIS: [[O14, I14[2]], [O14, I14[1]]] }, P14);
  parLeCentre(14, O14);

  // 15. Vrai ou faux, et k = −1 dessiné.
  const O15 = [6, 6], F15 = [[7, 7], [9, 7], [7, 9]], I15 = F15.map(homo(O15, -1));
  v.ok("15. k = −1 donne la symétrie de centre O", F15.every((p, i) => String(symC(O15)(p)) === String(I15[i])));
  const verdicts = [true, 0.8 > 1, true, false, 2 ** 2 === 2];
  ["a", "b", "c", "d", "e"].forEach((l, i) => ecrit(15, `${l}) ${verdicts[i] ? "VRAI" : "FAUX"}.`));
  ecrit(15, `$2^2 = ${2 ** 2}$`);
  const P15 = { O: O15, ...base(["A", "B", "C"], F15), ...nomme(["A", "B", "C"], I15) };
  dessin(15, "schema", { BLEU: [F15], ORANGE: [I15], GRIS: [[F15[1], I15[1]], [F15[2], I15[2]]] }, P15);
  parLeCentre(15, O15);

  // 16. De l'aire au rapport.
  const q16 = 108 / 12;
  const k16 = [...Array(41).keys()].map((i) => i - 20).filter((k) => k * k === q16);
  v.ok(`16. k² = ${q16} : k = ${k16.join(" ou ")}`, k16.join() === "-3,3");
  ecrit(16, `$108 \\div 12 = ${q16}$`);
  ecrit(16, "$k = 3$ ou $k = -3$");
  ecrit(16, `$5 \\times 3 = ${5 * 3}$ cm`);
  ecrit(16, "Réponse : $\\times 9$ ; $k = 3$ ou $k = -3$ ; $15$ cm ; $k = -3$.");
  ecrit(16, `multipliée par $${9 * 9}$`, "le piège k = 9 donne × 81");

  v.titre("★★★ Problèmes");
  // 17. Chambre noire : k = −20 / 3000.
  const k17 = -20 / 3000;
  v.ok("17. k = −1/150", proche(k17, -1 / 150));
  ecrit(17, "$20 \\div 3\\,000 = \\dfrac{1}{150}$");
  ecrit(17, "$k = -\\dfrac{1}{150}$");
  ecrit(17, `$1\\,200 \\div 150 = ${fr(1200 * Math.abs(k17))}$`);
  ecrit(17, `$1\\,200 \\div 100 = ${fr(1200 * 30 / 3000)}$ cm`);
  const O17 = [6, 5], F17 = [[10, 3], [10, 9]], I17 = F17.map(homo(O17, -0.5));
  const P17 = { O: O17, A: F17[0], B: F17[1], "A'": I17[0], "B'": I17[1] };
  v.ok("17. le schéma : l'image est à l'envers (B' sous A')", I17[1][1] < I17[0][1]);
  dessin(17, "schema", { BLEU: [F17], ORANGE: [I17], GRIS: F17.map((p, i) => [p, I17[i]]) }, P17);
  parLeCentre(17, O17);

  // 18. Vidéoprojecteur : k = 300 / 4.
  const k18 = 300 / 4;
  ecrit(18, `$300 \\div 4 = ${k18}$`);
  ecrit(18, `$2 \\times 75 = ${2 * k18}$ cm`);
  ecrit(18, `$1{,}5 \\times 75 = ${fr(1.5 * k18)}$ cm`);
  ecrit(18, `$75^2 = ${fr(k18 ** 2)}$`);
  const a18 = 2 * 1.5 * k18 ** 2;
  ecrit(18, `$3 \\times 5\\,625 = ${fr(a18)}$ cm², soit $${fr(a18 / 10000)}$ m²`);
  v.ok("18. aire de l'image = largeur × hauteur", proche(a18 / 10000, (2 * k18 / 100) * (1.5 * k18 / 100)));
  ecrit(18, `$${fr(2 * k18 / 100)} \\times ${fr(1.5 * k18 / 100)} = ${fr(a18 / 10000)}$ m²`);
  ecrit(18, `$225$ cm²`, "le piège aire × 75");
  v.ok("18. le piège : 3 × 75 = 225", 3 * k18 === 225);
  const k18d = 200 / 2;
  ecrit(18, `$200 \\div 2 = ${k18d}$`);
  ecrit(18, `$4 \\times 100 = ${4 * k18d}$ cm`);

  // 19. La frise.
  const M1 = [[2, 6], [4, 7], [2, 8]], t19 = trans([3, 0]), h19 = symH(5), c19 = symC([6, 5]), v19 = symV(6);
  const M2 = M1.map(t19), M3 = M1.map(h19), M4 = M1.map(c19), M5 = M2.map(t19);
  v.ok("19. motif 3 → motif 4 : symétrie d'axe x = 6", M3.every((p, i) => String(v19(p)) === String(M4[i])));
  v.ok("19. motif 4 n'est l'image de motif 1 par aucune symétrie d'axe vertical ou horizontal", [2, 3, 4, 5, 6, 7, 8].every((a) => M1.some((p, i) => String(symV(a)(p)) !== String(M4[i])) && M1.some((p, i) => String(symH(a)(p)) !== String(M4[i]))));
  const noms19 = { "A₁": M1[0], "B₁": M1[1], "A₂": M2[0], "B₂": M2[1], "A₃": M3[0], "B₃": M3[1], "A₄": M4[0], "B₄": M4[1], "A₅": M5[0], "B₅": M5[1], I: [6, 5] };
  images(19, { A_1: M1[0], A_2: M2[0], A_3: M3[0], B_3: M3[1], A_4: M4[0], B_4: M4[1], A_5: M5[0], B_5: M5[1], I: [6, 5] });
  dessin(19, "figure", { BLEU: [M1], ORANGE: [M2], VERT: [M3], VIOLET: [M4] }, noms19);
  dessin(19, "schema", { BLEU: [M1], ORANGE: [M2, M5], VERT: [M3], VIOLET: [M4], GRIS: [[[1, 5], [10, 5]], [[6, 1], [6, 10]]] }, noms19);

  // 20. La carte au 1/25 000.
  const e = 25000;
  ecrit(20, `$4{,}8 \\times 25\\,000 = ${fr(4.8 * e)}$ cm, soit $${fr((4.8 * e) / 100000)}$ km`);
  ecrit(20, `$25\\,000^2 = ${fr(e * e)}$`);
  const a20 = 3 * e * e;
  ecrit(20, `$3 \\times 625\\,000\\,000 = ${fr(a20)}$ cm²`);
  ecrit(20, `cela fait $${fr(a20 / 10000)}$ m²`);
  ecrit(20, `Réponse : le sentier mesure $${fr((4.8 * e) / 100000)}$ km et le lac $${fr(a20 / 10000)}$ m², soit $${fr(a20 / 1e8)}$ ha.`);
  ecrit(20, `$${fr(a20 / 1e8)}$ ha`);
  v.ok("20. le randonneur : 3 × 25 000 cm² = 7,5 m²", 3 * e === 75000 && 75000 / 10000 === 7.5);
}

lancer({
  nom: "TRANSFORMATIONS ET HOMOTHÉTIE · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-transformations.tsx",
  notionId: "sym_transformation",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : l'image glissée au lieu de retournée (corrigé)", "$B'(7\\\\,;\\\\,3)$.\\n$C$", "$B'(11\\\\,;\\\\,3)$.\\n$C$"],
    ["ex. 1 : un sommet orange mal placé", "{ pts: [[9, 3], [7, 3], [9, 7]], couleur: ORANGE }", "{ pts: [[9, 3], [8, 3], [9, 7]], couleur: ORANGE }"],
    ["ex. 2 : le demi-tour fait comme un pliage", "Donc $E'(7\\\\,;\\\\,2)$", "Donc $E'(7\\\\,;\\\\,8)$"],
    ["ex. 3 : B' placé depuis A'", "{ pts: [[6, 3], [9, 3], [6, 6]], couleur: ORANGE }", "{ pts: [[6, 3], [10, 1], [6, 6]], couleur: ORANGE }"],
    ["ex. 4 : le quart de tour dans le mauvais sens", "{ x: 5, y: 8, label: \"B'\" }", "{ x: 5, y: 2, label: \"B'\" }"],
    ["ex. 5 : un rayon gris qui manque le centre", "{ pts: [[2, 2], [8, 4]], couleur: GRIS }", "{ pts: [[3, 2], [8, 4]], couleur: GRIS }"],
    ["ex. 6 : A' construit depuis A (le piège)", "Depuis $O$ : $A'(9\\\\,;\\\\,6)$", "Depuis $O$ : $A'(11\\\\,;\\\\,7)$"],
    ["ex. 7 : le rapport par différence", "$7{,}5 \\\\div 2{,}5 = 3$", "$7{,}5 \\\\div 2{,}5 = 5$"],
    ["ex. 7 : k négatif oublié", "donc $k = -0{,}6$", "donc $k = 0{,}6$"],
    ["ex. 8 : k négatif dessiné du même côté", "{ pts: [[5, 5], [2, 5], [2, 2], [5, 2]], couleur: ORANGE }", "{ pts: [[11, 11], [14, 11], [14, 14], [11, 14]], couleur: ORANGE }"],
    ["ex. 8 : l'aire × 3 au lieu de × 9", "$1 \\\\times 9 = 9$ carreaux", "$1 \\\\times 3 = 3$ carreaux"],
    ["ex. 9 : le second pliage raté", "{ pts: [[8, 4], [6, 4], [8, 2]], couleur: VIOLET }", "{ pts: [[8, 4], [6, 4], [8, 3]], couleur: VIOLET }"],
    ["ex. 10 : un point image étiqueté de travers", "{ x: 2, y: 4, label: \"B'\" }", "{ x: 4, y: 2, label: \"B'\" }"],
    ["ex. 11 : le rapport lu à l'envers", "le rapport est $k = 2$", "le rapport est $k = \\\\dfrac{1}{2}$"],
    ["ex. 12 : l'aire doublée", "$600 \\\\div 150 = 4$", "$600 \\\\div 150 = 2$"],
    ["ex. 13 : la rotation dans l'autre sens", "{ pts: [[6, 5], [9, 5]], couleur: ORANGE }", "{ pts: [[6, 5], [3, 5]], couleur: ORANGE }"],
    ["ex. 14 : l'aire × 1,5", "et $4 \\\\times 2{,}25 = 9$", "et $4 \\\\times 1{,}5 = 6$"],
    ["ex. 14 : un point près de l'axe", "{ x: 2, y: 2, label: \"O\" }, { x: 4, y: 4, label: \"A\" }, { x: 6, y: 4, label: \"B\" }, { x: 4, y: 6, label: \"D\" }],\n          ),\n          correction", "{ x: 2, y: 2, label: \"O\" }, { x: 4, y: 4, label: \"A\" }, { x: 6, y: 4, label: \"B\" }, { x: 4, y: 6, label: \"D\" }, { x: 1, y: 6, label: \"E\" }],\n          ),\n          correction"],
    ["ex. 15 : « le rapport 2 double l'aire » déclaré vrai", "e) FAUX.", "e) VRAI."],
    ["ex. 16 : k = 9", "$k = 3$ ou $k = -3$ ; $15$ cm", "$k = 9$ ; $45$ cm"],
    ["ex. 17 : l'image à l'endroit", "{ pts: [[4, 6], [4, 3]], couleur: ORANGE }", "{ pts: [[4, 7], [4, 4]], couleur: ORANGE }"],
    ["ex. 18 : l'aire × 75", "$75^2 = 5\\\\,625$", "$75^2 = 5\\\\,025$"],
    ["ex. 19 : le motif 5 mal prolongé", "{ pts: [[8, 6], [10, 7], [8, 8]], couleur: ORANGE }", "{ pts: [[9, 6], [10, 7], [8, 8]], couleur: ORANGE }"],
    ["ex. 20 : l'échelle appliquée une seule fois à l'aire", "cela fait $187\\\\,500$ m²", "cela fait $7{,}5$ m²"],
    ["une micro d'une autre notion", "micros: [\"sym_homothetie_rapport\"],", "micros: [\"trigo_defi\"],"],
    ["un $ dans un canvas", "{ x: 6, y: 5, label: \"I\" }, { x: 2, y: 6, label: \"A₁\" }, { x: 5, y: 6", "{ x: 6, y: 5, label: \"$I$\" }, { x: 2, y: 6, label: \"A₁\" }, { x: 5, y: 6"],
  ],
});
