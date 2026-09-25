// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les transformations »
// de 4e (lib/fiches-exercices/maths-4e-transformations.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé COMPTE des carreaux ; ici chaque image est
// recalculée par coordonnées — symétrie d'axe x = a, y = b ou y = x, symétrie
// de centre, translation, rotation d'un angle quelconque dans un sens ou dans
// l'autre. Puis :
// - chaque point image est lu dans la phrase du corrigé (« A'(3 ; 5) »), et
//   TOUTES ses mentions portent les mêmes coordonnées ;
// - chaque segment et chaque flèche DESSINÉS (`pts`, couleur par couleur, sens
//   des flèches compris) sont relus dans le source et doivent être EXACTEMENT
//   ceux du modèle : ni un de plus, ni un de moins ;
// - chaque point étiqueté est à sa place, à 2 carreaux au moins des axes du
//   repère et loin du bord de la fenêtre ;
// - les dessins « du monde » sont reconstruits à partir des DONNÉES de
//   l'énoncé : le cerf-volant depuis 40 cm, 60 cm et 100° ; le flocon et
//   l'étoile de mer depuis 60° et 72° ; la grande roue depuis 120 m ;
// - Tetris : l'orientation (aire signée) de chaque pièce dit qui est retournée.
//
//   node scripts/verifier-exercices-transformations-4e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── Les transformations, par coordonnées ─────────────────────────────── */
const symV = (a) => ([x, y]) => [2 * a - x, y]; // axe vertical x = a
const symH = (b) => ([x, y]) => [x, 2 * b - y]; // axe horizontal y = b
const symDiag = ([x, y]) => [y, x]; // axe y = x
const symC = ([a, b]) => ([x, y]) => [2 * a - x, 2 * b - y];
const trans = ([u, w]) => ([x, y]) => [x + u, y + w];
/** Rotation de centre c, d'angle `deg` degrés : sens = +1 contraire des aiguilles, −1 celui des aiguilles. */
const rot = ([a, b], deg, sens) => ([x, y]) => {
  const t = (sens * deg * Math.PI) / 180;
  const [u, w] = [x - a, y - b];
  return [+(a + u * Math.cos(t) - w * Math.sin(t)).toFixed(9), +(b + u * Math.sin(t) + w * Math.cos(t)).toFixed(9)];
};
const quart = (c, sens) => rot(c, 90, sens);
const r2 = ([x, y]) => [+x.toFixed(2), +y.toFixed(2)];

const dist = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
const proche = (x, y, eps = 1e-9) => Math.abs(x - y) < eps;
const memes = (P, Q) => proche(P[0], Q[0]) && proche(P[1], Q[1]);
/** Aire signée d'un polygone (lacet) : > 0 dans le sens contraire des aiguilles. */
const aireSignee = (pts) => pts.reduce((s, [x, y], i) => { const [u, w] = pts[(i + 1) % pts.length]; return s + x * w - u * y; }, 0) / 2;
const aire = (pts) => Math.abs(aireSignee(pts));
/** Angle en degrés au sommet S, entre S→P et S→Q. */
const angle = (S, P, Q) => {
  const [a, b] = [[P[0] - S[0], P[1] - S[1]], [Q[0] - S[0], Q[1] - S[1]]];
  return (Math.acos((a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))) * 180) / Math.PI;
};
/** Un nombre écrit comme dans la feuille : 11{,}25 ; −1. */
function fr(x) {
  const s = String(+x.toFixed(6));
  const [e, f] = s.replace("-", "").split(".");
  return (x < 0 ? "-" : "") + (f ? `${e}{,}${f}` : e);
}
const co = ([x, y]) => `(${fr(x)}\\,;\\,${fr(y)})`;
const pt = (nom, p) => `${nom}${co(p)}`;

/* ── La lecture des dessins ───────────────────────────────────────────── */
const COULEURS = ["BLEU", "ORANGE", "VERT", "VIOLET", "GRIS"];
const bords = (pts) => (pts.length > 2 ? pts.map((p, i) => [p, pts[(i + 1) % pts.length]]) : [[pts[0], pts[1]]]);
const cleSeg = ([P, Q]) => [P.join(","), Q.join(",")].sort().join(" | ");
const cleFleche = (col, [P, Q]) => `${col} ${P.join(",")} → ${Q.join(",")}`;

/** Un appel `trace(…)` relu : fenêtre, segments par couleur, flèches orientées, points étiquetés. */
function lireTrace(texte) {
  const fen = texte.match(/trace\(\s*\[(-?\d+), (-?\d+)\]/);
  const segs = Object.fromEntries(COULEURS.map((c) => [c, []]));
  const fleches = [];
  for (const m of texte.matchAll(/\{ pts: \[((?:\[-?[\d.]+, -?[\d.]+\](?:, )?)+)\](?:, couleur: ([A-Z]+))?(, fleche: true)? \}/g)) {
    const pts = [...m[1].matchAll(/\[(-?[\d.]+), (-?[\d.]+)\]/g)].map((p) => [Number(p[1]), Number(p[2])]);
    const c = m[2] ?? "BLEU";
    if (!segs[c]) segs[c] = [];
    if (m[3]) fleches.push(cleFleche(c, pts));
    else segs[c].push(...bords(pts).map(cleSeg));
  }
  const points = [...texte.matchAll(/\{ x: (-?[\d.]+), y: (-?[\d.]+), label: "([^"]+)" \}/g)].map((m) => [m[3], Number(m[1]), Number(m[2])]);
  return { fenetre: fen ? [Number(fen[1]), Number(fen[2])] : null, segs, fleches, points };
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const e = (k) => f.enonces[k - 1] ?? "";
  const ecrit = (k, texte, quoi = texte) => v.ok(`${k}. le corrigé écrit « ${quoi} »`, c(k).includes(texte), "absent du corrigé");
  /** Les images calculées ICI, lues dans le corrigé — et CHAQUE mention du
   *  point porte les mêmes coordonnées. */
  const images = (k, P) =>
    Object.entries(P).forEach(([nom, p]) => {
      ecrit(k, pt(nom, p));
      const echappe = nom.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const mentions = [...c(k).matchAll(new RegExp(`(?<![A-Za-z_'])${echappe}\\(([^)]*)\\)`, "g"))].map((m) => `${nom}(${m[1]})`);
      const autres = mentions.filter((m) => m !== pt(nom, p));
      v.ok(`${k}. les ${mentions.length} mentions de ${nom} ont les mêmes coordonnées`, autres.length === 0, autres.join(" ; "));
    });
  /** Le source de la figure (énoncé) ou du schéma (corrigé) de l'exercice k. */
  const partie = (k, quoi) => {
    const b = f.blocs[k - 1] ?? "";
    const iF = b.indexOf("figure:"), iC = b.indexOf("correction:"), iS = b.indexOf("schema:");
    if (quoi === "figure") return iF >= 0 && iF < iC ? b.slice(iF, iC) : null;
    return iS >= 0 ? b.slice(iS, b.indexOf("micros:", iS)) : null;
  };
  /** Les appels `trace(` d'une partie, un par un (deux côte à côte au 19). */
  const traces = (texte) => (texte ?? "").split(/(?=trace\()/).filter((t) => t.startsWith("trace("));

  /**
   * Le dessin relu = le modèle. `lignes` : { COULEUR: [polygones] } ;
   * `fleches` : { COULEUR: [[de, vers]] } ; `P` : les points nommés du modèle.
   */
  const dessin = (k, quoi, lignes, P, { fleches = {}, n = 0, minPoints = 1 } = {}) => {
    const texte = traces(partie(k, quoi))[n];
    const nom = `${k}. ${quoi === "figure" ? "énoncé" : "schéma"}${n ? ` (${n + 1}e dessin)` : ""}`;
    v.ok(`${nom} : le dessin existe`, !!texte);
    if (!texte) return;
    const lu = lireTrace(texte);
    for (const col of new Set([...COULEURS, ...Object.keys(lignes)])) {
      const attendu = new Set((lignes[col] ?? []).flatMap((pts) => bords(pts).map(cleSeg)));
      const vus = new Set(lu.segs[col] ?? []);
      const manque = [...attendu].filter((s) => !vus.has(s));
      const enTrop = [...vus].filter((s) => !attendu.has(s));
      if (attendu.size || vus.size)
        v.ok(`${nom} : les ${vus.size} segments ${col} sont ceux du modèle`, manque.length === 0 && enTrop.length === 0, `manque ${manque.join(" ; ")} — en trop ${enTrop.join(" ; ")}`);
    }
    const fAttendues = Object.entries(fleches).flatMap(([col, l]) => l.map((dv) => cleFleche(col, dv))).sort();
    if (fAttendues.length || lu.fleches.length)
      v.ok(`${nom} : les ${lu.fleches.length} flèches sont celles du modèle, dans le bon sens`, JSON.stringify([...lu.fleches].sort()) === JSON.stringify(fAttendues), `lu ${lu.fleches.join(" ; ")} — attendu ${fAttendues.join(" ; ")}`);
    const mal = lu.points.filter(([l, x, y]) => !P[l] || !proche(P[l][0], x, 1e-6) || !proche(P[l][1], y, 1e-6));
    v.ok(`${nom} : les ${lu.points.length} points étiquetés sont à leur place`, lu.points.length >= minPoints && mal.length === 0, JSON.stringify(mal));
    const [mn, mx] = lu.fenetre ?? [0, 0];
    v.ok(`${nom} : fenêtre carrée, min < 0`, !!lu.fenetre && mn < 0 && mx > mn);
    const genants = lu.points.filter(([, x, y]) => [x, y].some((t) => Math.abs(t) < 2 || t > mx - 1 || t < mn + 1));
    v.ok(`${nom} : points à 2 carreaux des axes, loin du bord`, genants.length === 0, JSON.stringify(genants));
    const tous = [...Object.values(lu.segs).flat(), ...lu.fleches.map((s) => s.split(" ").slice(1).join(" | ").replace(" | → | ", " | "))];
    const hors = tous.filter((s) => s.split(/ \| |,/).map(Number).some((t) => t < mn || t > mx));
    v.ok(`${nom} : tous les segments dans la fenêtre`, hors.length === 0, hors.join(" ; "));
  };
  /** Les segments gris d'une symétrie centrale passent par le centre (et en sont le milieu). */
  const parLeCentre = (k, O) => {
    const lu = lireTrace(partie(k, "schema") ?? "");
    const gris = (lu.segs.GRIS ?? []).map((s) => s.split(" | ").map((p) => p.split(",").map(Number)));
    const faux = gris.filter(([P, Q]) => !memes([(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2], O));
    v.ok(`${k}. les ${gris.length} segments gris ont le centre (${O}) pour milieu`, gris.length > 0 && faux.length === 0, JSON.stringify(faux));
  };
  const nomme = (noms, pts, prime = "'") => Object.fromEntries(noms.map((n, i) => [n + prime, pts[i]]));
  const base = (noms, pts) => Object.fromEntries(noms.map((n, i) => [n, pts[i]]));

  v.titre("★ Un seul geste");
  // 1. Symétrie d'axe horizontal y = 6.
  const F1 = [[3, 7], [7, 7], [8, 9], [4, 9]], I1 = F1.map(symH(6)), axe1 = [[1, 6], [10, 6]];
  v.ok("1. ABCD est un parallélogramme (AB = DC en déplacement)", memes([F1[1][0] - F1[0][0], F1[1][1] - F1[0][1]], [F1[2][0] - F1[3][0], F1[2][1] - F1[3][1]]));
  const P1 = { ...base(["A", "B", "C", "D"], F1), ...nomme(["A", "B", "C", "D"], I1) };
  images(1, nomme(["A", "B", "C", "D"], I1));
  ecrit(1, `$A'B' = AB = ${dist(I1[0], I1[1])}$ carreaux`);
  ecrit(1, `$C$ et $D$ sont à $${F1[2][1] - 6}$ carreaux au-dessus`);
  dessin(1, "figure", { BLEU: [F1], GRIS: [axe1] }, P1);
  dessin(1, "schema", { BLEU: [F1], ORANGE: [I1], GRIS: [axe1] }, P1);

  // 2. Axe oblique y = x.
  const F2 = [[7, 3], [9, 3], [9, 5]], I2 = F2.map(symDiag), axe2 = [[1, 1], [10, 10]];
  const P2 = { ...base(["A", "B", "C"], F2), ...nomme(["A", "B", "C"], I2) };
  images(2, nomme(["A", "B", "C"], I2));
  F2.forEach((p, i) => {
    const pas = (p[0] - p[1]) / 2, pied = [(p[0] + I2[i][0]) / 2, (p[1] + I2[i][1]) / 2];
    v.ok(`2. ${"ABC"[i]} : ${pas} pas en diagonale jusqu'au pied ${pied}, sur l'axe`, pied[0] === pied[1] && Number.isInteger(pas));
    ecrit(2, `$${pas}$ pas`);
    ecrit(2, co(pied));
  });
  const piege2 = [2 * F2[0][1] - F2[0][0], F2[0][1]];
  ecrit(2, `en $${co(piege2)}$`, "le A du piège (compté à l'horizontale)");
  dessin(2, "figure", { BLEU: [F2], GRIS: [axe2] }, P2);
  dessin(2, "schema", { BLEU: [F2], ORANGE: [I2], GRIS: [axe2, [F2[0], I2[0]], [F2[1], I2[1]]] }, P2);

  // 3. Symétrie de centre O(5 ; 5), O sommet de la figure.
  const O3 = [5, 5], F3 = [O3, [8, 6], [7, 8]], I3 = F3.map(symC(O3));
  v.ok("3. l'image de O est O", memes(I3[0], O3));
  const P3 = { O: O3, A: F3[1], B: F3[2], "A'": I3[1], "B'": I3[2] };
  images(3, { "A'": I3[1], "B'": I3[2] });
  dessin(3, "figure", { BLEU: [F3] }, P3);
  dessin(3, "schema", { BLEU: [F3], ORANGE: [I3], GRIS: [[F3[1], I3[1]], [F3[2], I3[2]]] }, P3);
  parLeCentre(3, O3);

  // 4. Translation de la flèche verte.
  const fl4 = [[10, 7], [5, 10]], u4 = [fl4[1][0] - fl4[0][0], fl4[1][1] - fl4[0][1]];
  const F4 = [[7, 2], [10, 2], [9, 4], [8, 4]], I4 = F4.map(trans(u4));
  ecrit(4, `$${-u4[0]}$ carreaux vers la gauche, $${u4[1]}$ vers le haut`);
  const P4 = { ...base(["K", "L", "M", "N"], F4), ...nomme(["K", "L", "M", "N"], I4) };
  images(4, nomme(["K", "L", "M", "N"], I4));
  ecrit(4, `$K'L' = KL = ${dist(F4[0], F4[1])}$ carreaux`);
  const piege4 = trans([-u4[0], -u4[1]])(F4[0]);
  ecrit(4, `en $${co(piege4)}$`, "le K du piège (flèche à l'envers)");
  dessin(4, "figure", { BLEU: [F4] }, P4, { fleches: { VERT: [fl4] } });
  dessin(4, "schema", { BLEU: [F4], ORANGE: [I4] }, P4, { fleches: { VERT: [fl4], GRIS: [[F4[0], I4[0]], [F4[1], I4[1]]] } });

  // 5. Quart de tour, sens des aiguilles, O(6 ; 6).
  const O5 = [6, 6], F5 = [[3, 7], [3, 9], [5, 9]], I5 = F5.map(quart(O5, -1));
  const P5 = { O: O5, ...base(["A", "B", "C"], F5), ...nomme(["A", "B", "C"], I5) };
  images(5, nomme(["A", "B", "C"], I5));
  v.ok("5. distances à O conservées, [A'B'] horizontal", F5.every((p, i) => proche(dist(O5, p), dist(O5, I5[i]))) && I5[0][1] === I5[1][1]);
  ecrit(5, `en $${co(quart(O5, +1)(F5[0]))}$`, "le A du piège (autre sens)");
  dessin(5, "figure", { BLEU: [F5] }, P5);
  dessin(5, "schema", { BLEU: [F5], ORANGE: [I5], GRIS: [[O5, F5[0]], [O5, I5[0]]] }, P5);

  // 6. Les deux triangles dessinés : longueurs 5, 7, 6, angle 78°, et l'image = demi-tour.
  const tri = [...(partie(6, "schema") ?? "").matchAll(/triangle\(\{ A: \[(-?[\d.]+), (-?[\d.]+)\], B: \[(-?[\d.]+), (-?[\d.]+)\], C: \[(-?[\d.]+), (-?[\d.]+)\] \}/g)].map((m) => {
    const n = m.slice(1).map(Number);
    return [[n[0], n[1]], [n[2], n[3]], [n[4], n[5]]];
  });
  v.ok("6. deux triangles dessinés", tri.length === 2);
  if (tri.length === 2) {
    const [R, S, T] = tri[0];
    const cotes = [dist(R, S), dist(S, T), dist(T, R)];
    v.ok(`6. RST dessiné à l'échelle : ${cotes.map((x) => x.toFixed(3)).join(", ")} = 5, 7, 6`, [5, 7, 6].every((x, i) => proche(cotes[i], x, 1e-3)));
    v.ok(`6. l'angle R dessiné (${angle(R, S, T).toFixed(2)}°) arrondi à 78°`, Math.round(angle(R, S, T)) === 78);
    v.ok("6. R'S'T' est l'image de RST par un demi-tour de centre l'origine", tri[0].every((p, i) => memes(symC([0, 0])(p), tri[1][i])));
  }
  ecrit(6, `$5 + 7 + 6 = ${5 + 7 + 6}$ cm`);
  ecrit(6, "$\\widehat{S'R'T'} = \\widehat{SRT} = 78°$");
  ["$R'S' = RS = 5$ cm", "$S'T' = ST = 7$ cm", "$T'R' = TR = 6$ cm"].forEach((t) => ecrit(6, t));
  v.ok("6. l'énoncé donne les mêmes mesures", ["$RS = 5$ cm", "$ST = 7$ cm", "$TR = 6$ cm", "78°"].every((t) => e(6).includes(t)));

  // 7. Translation de M vers N.
  const M7 = [2, 3], N7 = [6, 4], u7 = [N7[0] - M7[0], N7[1] - M7[1]], P7 = [3, 7], R7 = [9, 6];
  const P7p = trans(u7)(P7), S7 = trans([-u7[0], -u7[1]])(R7);
  v.ok("7. l'image de S est bien R", memes(trans(u7)(S7), R7));
  images(7, { "P'": P7p, S: S7 });
  ecrit(7, `$${u7[0]}$ carreaux à droite, $${u7[1]}$ en haut`);
  ecrit(7, `en $${co(trans(u7)(R7))}$`, "le piège (l'image de R)");
  const noms7 = { M: M7, N: N7, P: P7, "P'": P7p, S: S7, R: R7 };
  dessin(7, "figure", {}, noms7, { minPoints: 4 });
  dessin(7, "schema", {}, noms7, { fleches: { GRIS: [[M7, N7], [P7, P7p], [S7, R7]] } });

  // 8. L'horloge.
  const parMin = 360 / 60, a8 = 20 * parMin;
  ecrit(8, `$360 \\div 60 = ${parMin}°$`);
  ecrit(8, `$20 \\times 6 = ${a8}°$`);
  ecrit(8, `trouver $${20}°$`, "le piège 1 minute = 1°");
  const O8 = [6, 6], M8 = [6, 10];
  v.ok("8. le dessin est à l'échelle : 4 carreaux × 3 cm = 12 cm", dist(O8, M8) * 3 === 12);
  const P8 = rot(O8, 15 * parMin, -1)(M8), Q8 = r2(rot(O8, a8, -1)(M8));
  const noms8 = { O: O8, M: M8, P: P8, Q: Q8 };
  dessin(8, "schema", { BLEU: [[O8, M8]], GRIS: [[O8, P8]], ORANGE: [[O8, Q8]] }, noms8);
  ecrit(8, "$OQ = OM = 12$ cm");

  v.titre("★★ Type devoir");
  // 9. Tetris.
  const L9 = [[2, 2], [4, 2], [4, 3], [3, 3], [3, 5], [2, 5]];
  const or9 = L9.map(trans([0, 5])), ve9 = L9.map(quart([3, 8], +1)), vi9 = L9.map(symV(5.5));
  v.ok("9. quatre pièces de 4 carrés", [L9, or9, ve9, vi9].every((p) => aire(p) === 4));
  v.ok("9. la verte et l'orange ont l'orientation de la bleue ; la violette est retournée", Math.sign(aireSignee(ve9)) === Math.sign(aireSignee(L9)) && Math.sign(aireSignee(or9)) === Math.sign(aireSignee(L9)) && Math.sign(aireSignee(vi9)) !== Math.sign(aireSignee(L9)));
  ecrit(9, `de $${co(L9[0])}$ à $${co(or9[0])}$`);
  ecrit(9, "translation de $5$ carreaux vers le haut");
  ecrit(9, "d'abscisse $5{,}5$");
  ecrit(9, "Le joueur ne peut donc pas obtenir la pièce violette.");
  const pieces9 = { BLEU: [L9], ORANGE: [or9], VERT: [ve9], VIOLET: [vi9] };
  dessin(9, "figure", pieces9, {}, { minPoints: 0 });
  dessin(9, "schema", { ...pieces9, GRIS: [[[5.5, 1], [5.5, 6]]] }, {}, { minPoints: 0, fleches: { GRIS: [[L9[0], or9[0]]] } });

  // 10. Le papillon.
  const G10 = [[6, 8], [3, 9], [2, 7], [4, 6], [2, 4], [3, 2], [6, 4]], D10 = G10.map(symV(6)), axe10 = [[6, 1], [6, 10]];
  const noms10 = { A: G10[1], B: G10[2], C: G10[5], "A'": D10[1], "B'": D10[2], "C'": D10[5] };
  images(10, { "A'": D10[1], "B'": D10[2], "C'": D10[5] });
  v.ok(`10. l'aile gauche couvre ${aire(G10)} carreaux`, aire(G10) === 18.5 && aire(D10) === 18.5);
  ecrit(10, `$18{,}5 \\times 2 = ${fr(2 * aire(G10))}$ carreaux`);
  v.ok("10. l'énoncé donne 18,5", e(10).includes("$18{,}5$ carreaux"));
  const fixes10 = G10.filter((p) => memes(symV(6)(p), p));
  v.ok(`10. ${fixes10.length} points de l'aile sur l'axe`, fixes10.length === 2);
  fixes10.forEach((p) => ecrit(10, `$${co(p)}$`));
  ecrit(10, `$${co([6 + G10[2][0], G10[2][1]])}$, une aile tordue`, "le B' du piège (abscisse reportée)");
  dessin(10, "figure", { BLEU: [G10], GRIS: [axe10] }, noms10);
  dessin(10, "schema", { BLEU: [G10], ORANGE: [D10], GRIS: [axe10] }, noms10);

  // 11. Segment et symétrie centrale : parallélogramme.
  const O11 = [6, 5], A11 = [3, 4], B11 = [5, 8], s11 = symC(O11), A11p = s11(A11), B11p = s11(B11);
  images(11, { "A'": A11p, "B'": B11p });
  const dAB = [B11[0] - A11[0], B11[1] - A11[1]], dBpAp = [A11p[0] - B11p[0], A11p[1] - B11p[1]];
  v.ok("11. de A à B = de B' à A' (parallèles et de même longueur)", memes(dAB, dBpAp));
  ecrit(11, `$${dAB[0]}$ à droite, $${dAB[1]}$ en haut. De $B'$ à $A'$ : $${dBpAp[0]}$ à droite, $${dBpAp[1]}$ en haut`);
  v.ok("11. ABA'B' non croisé (convexe)", [A11, B11, A11p, B11p].every((p, i, t) => { const [q, r] = [t[(i + 1) % 4], t[(i + 2) % 4]]; return (q[0] - p[0]) * (r[1] - q[1]) - (q[1] - p[1]) * (r[0] - q[0]) < 0; }));
  const noms11 = { O: O11, A: A11, B: B11, "A'": A11p, "B'": B11p };
  dessin(11, "figure", { BLEU: [[A11, B11]] }, noms11);
  dessin(11, "schema", { BLEU: [[A11, B11]], ORANGE: [[A11p, B11p]], VERT: [[B11, A11p], [B11p, A11]], GRIS: [[A11, A11p], [B11, B11p]] }, noms11);
  parLeCentre(11, O11);

  // 12. Le cavalier.
  const t1 = trans([2, 1]), t2 = trans([1, 2]), D12 = [2, 2];
  const E12 = t1(D12), F12 = t2(E12), G12 = t1(F12);
  images(12, { E: E12, F: F12, G: G12 });
  const autre = [t2(D12), t1(t2(D12)), t1(t1(t2(D12)))];
  v.ok("12. dans l'ordre t2, t1, t1 : même arrivée", memes(autre[2], G12));
  ecrit(12, `en passant par $${co(autre[0])}$ et $${co(autre[1])}$`);
  ecrit(12, `$7 - 2 = ${G12[0] - D12[0]}$ carreaux à droite et $6 - 2 = ${G12[1] - D12[1]}$ en haut`);
  ecrit(12, `$2 + 1 + 2 = ${2 + 1 + 2}$ et $1 + 2 + 1 = ${1 + 2 + 1}$`);
  v.ok("12. l'énoncé part de D(2 ; 2)", e(12).includes(`$${pt("D", D12)}$`));
  dessin(12, "schema", {}, { D: D12, E: E12, F: F12, G: G12 }, { fleches: { BLEU: [[D12, E12], [E12, F12], [F12, G12]], ORANGE: [[D12, G12]] } });

  // 13. Le moulinet.
  const O13 = [6, 6], r13 = quart(O13, +1), pale = [O13, [6, 9], [8, 8]];
  const p1 = pale.map(r13), p2 = p1.map(r13), p3 = p2.map(r13);
  images(13, { A_1: p1[1], B_1: p1[2], A_2: p2[1], B_2: p2[2], A_3: p3[1], B_3: p3[2] });
  v.ok("13. deux quarts de tour = la symétrie de centre O", pale.every((p, i) => memes(symC(O13)(p), p2[i])));
  v.ok("13. trois quarts de tour = un quart de tour dans le sens des aiguilles", pale.every((p, i) => memes(quart(O13, -1)(p), p3[i])));
  ecrit(13, `de $${co(pale[1])}$ à $${co(p2[1])}$`);
  const noms13 = { O: O13, A: pale[1], B: pale[2], "A₁": p1[1], "B₁": p1[2], "A₂": p2[1], "B₂": p2[2], "A₃": p3[1], "B₃": p3[2] };
  dessin(13, "figure", { BLEU: [pale] }, noms13);
  dessin(13, "schema", { BLEU: [pale], ORANGE: [p1], VERT: [p2], VIOLET: [p3] }, noms13);

  // 14. Le cerf-volant, reconstruit depuis AB = 4, BC = 6 (carreaux de 10 cm), B = 100°.
  const AB = 4, BC = 6, angB = 100;
  const AC = Math.sqrt(AB ** 2 + BC ** 2 - 2 * AB * BC * Math.cos((angB * Math.PI) / 180));
  const angA = (Math.acos((AB ** 2 + AC ** 2 - BC ** 2) / (2 * AB * AC)) * 180) / Math.PI;
  const A14 = [2, 5.5], C14 = r2([2 + AC, 5.5]), B14 = r2([2 + AB * Math.cos((angA * Math.PI) / 180), 5.5 + AB * Math.sin((angA * Math.PI) / 180)]), D14 = r2(symH(5.5)(B14));
  v.ok(`14. dessin : AB ≈ ${dist(A14, B14).toFixed(3)}, BC ≈ ${dist(B14, C14).toFixed(3)}, B ≈ ${angle(B14, A14, C14).toFixed(2)}°`, proche(dist(A14, B14), 4, 0.01) && proche(dist(B14, C14), 6, 0.01) && proche(angle(B14, A14, C14), 100, 0.2));
  const bad = 2 * angA, bcd = 360 - 2 * angB - bad;
  v.ok(`14. BAD vaut ${bad.toFixed(2)}° (≈ 99) et BCD ${bcd.toFixed(2)}° (≈ 61)`, Math.round(bad) === 99 && Math.round(bcd) === 61);
  ecrit(14, `$\\widehat{BCD} = 360° - 100° - 100° - 99° = ${360 - 200 - 99}°$`);
  ecrit(14, `$40 + 60 + 60 + 40 = ${40 + 60 + 60 + 40}$ cm`);
  ecrit(14, "$AD = AB = 40$ cm et $DC = BC = 60$ cm");
  ecrit(14, "$\\widehat{ADC} = \\widehat{ABC} = 100°$");
  v.ok("14. l'énoncé donne 40 cm, 60 cm, 100° et 99°", ["$AB = 40$ cm", "$BC = 60$ cm", "= 100°$", "= 99°$"].every((t) => e(14).includes(t)));
  const noms14 = { A: A14, B: B14, C: C14, D: D14 };
  const axe14 = [[1, 5.5], [10.5, 5.5]];
  dessin(14, "figure", { BLEU: [[A14, B14, C14]], GRIS: [axe14] }, noms14);
  dessin(14, "schema", { BLEU: [[A14, B14, C14]], ORANGE: [[A14, D14, C14]], GRIS: [axe14, [B14, D14]] }, noms14);

  // 15. Deux symétries centrales = une translation de 2 × IJ.
  const I15 = [5, 4], J15 = [5, 7], F15 = [[2, 2], [4, 2], [2, 4]], T1 = F15.map(symC(I15)), T2 = T1.map(symC(J15));
  images(15, { ...nomme(["A", "B", "C"], T1), ...nomme(["A", "B", "C"], T2, "''") });
  const d15 = [2 * (J15[0] - I15[0]), 2 * (J15[1] - I15[1])];
  v.ok(`15. A''B''C'' = ABC translaté de (${d15})`, F15.every((p, i) => memes(trans(d15)(p), T2[i])));
  ecrit(15, `$IJ = ${dist(I15, J15)}$ carreaux`);
  ecrit(15, `TRANSLATION de $${d15[1]}$ carreaux vers le haut`);
  const noms15 = { I: I15, J: J15, ...base(["A", "B", "C"], F15), ...nomme(["A", "B", "C"], T1), ...nomme(["A", "B", "C"], T2, "''") };
  dessin(15, "figure", { BLEU: [F15] }, noms15);
  dessin(15, "schema", { BLEU: [F15], ORANGE: [T1], VIOLET: [T2], GRIS: [[F15[0], T1[0]], [T1[0], T2[0]]] }, noms15);

  // 16. Le carré penché et son quart de tour.
  const O16 = [6, 6], Q16 = [[3, 4], [8, 3], [9, 8], [4, 9]], r16 = quart(O16, +1);
  v.ok("16. le quart de tour envoie A→B→C→D→A", Q16.every((p, i) => memes(r16(p), Q16[(i + 1) % 4])));
  v.ok("16. O est le milieu des diagonales, OA = OB = OC = OD", memes([(Q16[0][0] + Q16[2][0]) / 2, (Q16[0][1] + Q16[2][1]) / 2], O16) && Q16.every((p) => proche(dist(O16, p), dist(O16, Q16[0]))));
  ecrit(16, `$${co(r16(Q16[0]))}$, c'est $B$`);
  ecrit(16, `$${co(r16(Q16[1]))}$, c'est $C$`);
  const noms16 = { O: O16, ...base(["A", "B", "C", "D"], Q16) };
  dessin(16, "figure", { BLEU: [Q16] }, noms16);
  dessin(16, "schema", { BLEU: [Q16], ORANGE: [[Q16[0], Q16[2]], [Q16[1], Q16[3]]] }, noms16);

  v.titre("★★★ Problèmes");
  // 17. Handball : 40 × 20 m, 1 carreau = 5 m.
  const T17 = [[2, 4], [10, 4], [10, 8], [2, 8]], O17 = [6, 6];
  v.ok("17. le terrain dessiné fait 40 m × 20 m", dist(T17[0], T17[1]) * 5 === 40 && dist(T17[1], T17[2]) * 5 === 20);
  v.ok("17. O est le centre du terrain", memes([(T17[0][0] + T17[2][0]) / 2, (T17[0][1] + T17[2][1]) / 2], O17));
  images(17, { C: symC(O17)(T17[0]), B: symV(6)(T17[0]), D: symH(6)(T17[0]) });
  const P17 = [T17[0][0] + 7 / 5, 6], P17p = symC(O17)(P17);
  images(17, { P: P17, "P'": P17p });
  ecrit(17, `$7 \\div 5 = ${fr(7 / 5)}$ carreau`);
  ecrit(17, `$PP' = 40 - 7 - 7 = ${40 - 14}$ m`);
  v.ok("17. sur le dessin, PP' × 5 = 26 m", proche(dist(P17, P17p) * 5, 26));
  ecrit(17, `$${fr(P17p[0])} - ${fr(P17[0])} = ${fr(P17p[0] - P17[0])}$ carreaux, et $${fr(P17p[0] - P17[0])} \\times 5 = ${fr((P17p[0] - P17[0]) * 5)}$ m`);
  const noms17 = { ...base(["A", "B", "C", "D"], T17), O: O17, P: P17, "P'": P17p };
  dessin(17, "figure", { BLEU: [T17], GRIS: [[[6, 3], [6, 9]]] }, noms17);
  dessin(17, "schema", { BLEU: [T17], GRIS: [[[6, 3], [6, 9]], [[1, 6], [11, 6]]], ORANGE: [[T17[0], T17[2]]] }, noms17);

  // 18. London Eye : 120 m, 32 cabines, 30 min ; 1 carreau = 15 m.
  ecrit(18, `$360 \\div 32 = ${fr(360 / 32)}°$`);
  ecrit(18, `$30 \\div 4 = ${fr(30 / 4)}$ minutes`);
  ecrit(18, `$120 \\div 2 = ${120 / 2}$ m`);
  const O18 = [6, 6], P18 = [6, 6 - 60 / 15], Q18 = quart(O18, +1)(P18), R18 = symC(O18)(P18);
  v.ok("18. rayon dessiné : 4 carreaux × 15 m = 60 m", dist(O18, P18) * 15 === 60);
  v.ok("18. monté de 60 m à Q et de 120 m à R", (Q18[1] - P18[1]) * 15 === 60 && (R18[1] - P18[1]) * 15 === 120);
  ecrit(18, "elle est montée de $60$ m");
  ecrit(18, "de tout le diamètre : $120$ m");
  dessin(18, "schema", { BLEU: [[O18, P18]], ORANGE: [[O18, Q18]], VIOLET: [[O18, R18]] }, { O: O18, P: P18, Q: Q18, R: R18 });

  // 19. Flocon (6 branches) et étoile de mer (5 bras), longueur 3, centre (5 ; 5).
  const O19 = [5, 5];
  const flocon = [0, 1, 2, 3, 4, 5].map((i) => r2(rot(O19, 60 * i, +1)([8, 5])));
  const etoile = [0, 1, 2, 3, 4].map((i) => r2(rot(O19, 72 * i, +1)([5, 8])));
  const rayons = (bouts) => bouts.map((b) => [O19, b]);
  ecrit(19, `$360 \\div 6 = ${360 / 6}°$`);
  ecrit(19, `$360 \\div 5 = ${360 / 5}°$`);
  ecrit(19, `$180 = ${180 / 60} \\times 60$`);
  ecrit(19, `$180 \\div 72 = ${fr(180 / 72)}$`);
  v.ok("19. le demi-tour garde le flocon, pas l'étoile", flocon.every((p) => flocon.some((q) => proche(dist(r2(symC(O19)(p)), q), 0, 0.02))) && !etoile.every((p) => etoile.some((q) => proche(dist(r2(symC(O19)(p)), q), 0, 0.02))));
  dessin(19, "figure", { BLEU: rayons(flocon) }, { O: O19 });
  dessin(19, "figure", { BLEU: rayons(etoile) }, { O: O19 }, { n: 1 });
  dessin(19, "schema", { BLEU: rayons(flocon.filter((_, i) => i !== 1)), ORANGE: [[O19, flocon[1]]] }, { O: O19, A: flocon[0], "A'": flocon[1] }, { minPoints: 3 });
  dessin(19, "schema", { BLEU: rayons(etoile.filter((_, i) => i !== 1)), ORANGE: [[O19, etoile[1]]], GRIS: [[[5, 1], [5, 4]]] }, { O: O19, B: etoile[0], "B'": etoile[1] }, { n: 1, minPoints: 3 });
  v.ok("19. l'axe gris prolonge le bras B par O", memes([5, 8], etoile[0]));

  // 20. Les panneaux : t = 2 à droite, u = 3 en haut, panneau 2 × 1.
  const P20 = [[2, 2], [4, 2], [4, 3], [2, 3]], t = trans([2, 0]), u = trans([0, 3]);
  const rangee = [P20, P20.map(t), P20.map(t).map(t), P20.map(t).map(t).map(t)];
  const toutes = [...rangee, ...rangee.map((p) => p.map(u))];
  const A20 = P20[0], A20p = u(t(t(t(A20))));
  images(20, { A: A20, "A'": A20p });
  ecrit(20, `la translation de $${A20p[0] - A20[0]}$ carreaux à droite et $${A20p[1] - A20[1]}$ vers le haut`);
  ecrit(20, `$2 \\times 1 = ${aire(P20)}$ m²`);
  ecrit(20, `$8 \\times 2 = ${toutes.reduce((s, p) => s + aire(p), 0)}$ m²`);
  ecrit(20, `$3 - 1 = ${3 - 1}$ m`);
  dessin(20, "figure", { BLEU: [P20] }, { A: A20 });
  dessin(20, "schema", { BLEU: [P20], VERT: toutes.slice(1) }, { A: A20, "A'": A20p }, { fleches: { ORANGE: [[A20, A20p]] } });

  v.titre("Les dessins");
  const dessines = f.blocs.filter((b) => /\bschema: (trace|deux)\(/.test(b)).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20);
  const figures = f.blocs.filter((b) => /\bfigure: (trace|deux)\(/.test(b)).length;
  v.ok(`${figures} énoncés avec leur figure`, figures >= 14);
}

lancer({
  nom: "LES TRANSFORMATIONS · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-transformations.tsx",
  notionId: "sym_transformation",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : C' reporté à 1 carreau (corrigé)", "$C'(8\\\\,;\\\\,3)$ et $D'(4\\\\,;\\\\,3)$.\\nL'abscisse", "$C'(8\\\\,;\\\\,5)$ et $D'(4\\\\,;\\\\,3)$.\\nL'abscisse"],
    ["ex. 1 : un sommet orange mal placé", "{ pts: [[3, 5], [7, 5], [8, 3], [4, 3]], couleur: ORANGE }", "{ pts: [[3, 5], [7, 5], [8, 1], [4, 3]], couleur: ORANGE }"],
    ["ex. 2 : l'axe oblique compté à l'horizontale", "$A'(3\\\\,;\\\\,7)$.\\nDepuis $B$", "$A'(-1\\\\,;\\\\,3)$.\\nDepuis $B$"],
    ["ex. 3 : un sommet de l'image mal placé", "{ pts: [[5, 5], [2, 4], [3, 2]], couleur: ORANGE }", "{ pts: [[5, 5], [2, 4], [4, 2]], couleur: ORANGE }"],
    ["ex. 4 : la flèche de l'énoncé à l'envers", "{ pts: [[10, 7], [5, 10]], couleur: VERT, fleche: true }],", "{ pts: [[5, 10], [10, 7]], couleur: VERT, fleche: true }],"],
    ["ex. 5 : le quart de tour dans le mauvais sens", "$1$ à droite, $A'(7\\\\,;\\\\,9)$", "$1$ à droite, $A'(5\\\\,;\\\\,3)$"],
    ["ex. 6 : l'image déformée", "C: [-1.2, -5.8788]", "C: [-1.2, -6.5]"],
    ["ex. 6 : le périmètre faux", "$5 + 7 + 6 = 18$ cm", "$5 + 7 + 6 = 17$ cm"],
    ["ex. 7 : la translation appliquée à R", "$S(5\\\\,;\\\\,5)$.\\n⭐", "$S(13\\\\,;\\\\,7)$.\\n⭐"],
    ["ex. 8 : une minute prise pour un degré", "$20 \\\\times 6 = 120°$", "$20 \\\\times 6 = 20°$"],
    ["ex. 8 : la pointe de 14 h 20 mal placée", "{ x: 9.46, y: 4, label: \"Q\" }", "{ x: 9.46, y: 5, label: \"Q\" }"],
    ["ex. 9 : la flèche de translation trop longue", "{ pts: [[2, 2], [2, 7]], couleur: GRIS, fleche: true }", "{ pts: [[2, 2], [2, 8]], couleur: GRIS, fleche: true }"],
    ["ex. 10 : l'abscisse reportée au lieu de la distance", "$B'(10\\\\,;\\\\,7)$.\\n$C$", "$B'(8\\\\,;\\\\,7)$.\\n$C$"],
    ["ex. 10 : l'aire des ailes fausse", "$18{,}5 \\\\times 2 = 37$", "$18{,}5 \\\\times 2 = 36$"],
    ["ex. 11 : l'image du segment tordue", "{ pts: [[9, 6], [7, 2]], couleur: ORANGE }", "{ pts: [[9, 6], [7, 3]], couleur: ORANGE }"],
    ["ex. 12 : le troisième saut raté", "Puis $t_1$ : $G(7\\\\,;\\\\,6)$", "Puis $t_1$ : $G(7\\\\,;\\\\,7)$"],
    ["ex. 13 : la dernière pale mal tournée", "Puis une dernière fois : $A_3(9\\\\,;\\\\,6)$", "Puis une dernière fois : $A_3(9\\\\,;\\\\,5)$"],
    ["ex. 14 : la somme des angles ratée", "= 360° - 100° - 100° - 99° = 61°$", "= 360° - 100° - 100° - 99° = 71°$"],
    ["ex. 14 : le cerf-volant pas symétrique", "{ pts: [[2, 5.5], [4.6, 2.46], [9.77, 5.5]], couleur: ORANGE }", "{ pts: [[2, 5.5], [4.6, 2.1], [9.77, 5.5]], couleur: ORANGE }"],
    ["ex. 15 : le second demi-tour raté", "donc $A''(2\\\\,;\\\\,8)$", "donc $A''(2\\\\,;\\\\,9)$"],
    ["ex. 16 : le carré dessiné faux", "[[3, 4], [8, 3], [9, 8], [4, 9]] }],", "[[3, 4], [8, 3], [9, 8], [4, 8]] }],"],
    ["ex. 17 : une seule ligne des 7 m retirée", "$PP' = 40 - 7 - 7 = 26$ m", "$PP' = 40 - 7 = 33$ m"],
    ["ex. 18 : l'angle entre deux cabines", "$360 \\\\div 32 = 11{,}25°$", "$360 \\\\div 32 = 11{,}5°$"],
    ["ex. 19 : le bras image tourné dans l'autre sens", "{ x: 2.15, y: 5.93, label: \"B'\" }", "{ x: 7.85, y: 5.93, label: \"B'\" }"],
    ["ex. 19 : le demi-tour de l'étoile", "$180 \\\\div 72 = 2{,}5$", "$180 \\\\div 72 = 2{,}4$"],
    ["ex. 20 : un glissement de trop", "$A'(8\\\\,;\\\\,5)$.\\nDe $A$", "$A'(10\\\\,;\\\\,5)$.\\nDe $A$"],
    ["ex. 20 : la surface totale", "$8 \\\\times 2 = 16$ m²", "$8 \\\\times 2 = 18$ m²"],
    ["une micro d'une autre notion", "micros: [\"sym_translation\", \"sym_transformation_defi\"],", "micros: [\"pythagore_reconnaitre\", \"sym_transformation_defi\"],"],
    ["un $ dans un canvas", "{ x: 6, y: 5, label: \"O\" }, { x: 3, y: 4, label: \"A\" }, { x: 5, y: 8, label: \"B\" }]),", "{ x: 6, y: 5, label: \"$O$\" }, { x: 3, y: 4, label: \"A\" }, { x: 5, y: 8, label: \"B\" }]),"],
  ],
});
