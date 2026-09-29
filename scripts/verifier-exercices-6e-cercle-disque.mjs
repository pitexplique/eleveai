// Recalcul indépendant de la feuille « Le cercle et le disque » de 6e
// (30/09/2026) : lib/fiches-exercices/maths-6e-cercle-disque.tsx.
//
// ⭐ L'AUTRE CHEMIN : les nombres sont relus dans les DESSINS, jamais recopiés.
// - `plan` : chaque distance au centre est MESURÉE sur les coordonnées et
//   comparée à l'énoncé (1 % près : les coordonnées sont arrondies au
//   centième) ; les points d'intersection de deux cercles sont recalculés ;
//   chaque cote écrite est la longueur de son segment.
// - `deroule` : le nombre écrit dans « tour » vaut 3,14 × d.
// - `piste` : le périmètre est refait morceau par morceau depuis L et d.
// - `mesures` : chaque ligne du tableau est recalculée.
// ⭐ LE RENDU : la place des étiquettes de `plan` est rejouée (même calcul que
// le composant, bornage compris) : aucune étiquette sur une autre ni sur un
// point, cadre de 300 au plus ; `deroule` et `piste` aussi. Et la longueur des
// phrases (Frédéric, 30/09 : 12 mots en moyenne, 20 au plus).
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-cercle-disque.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-cercle-disque.tsx", "cercle_disque", ["plan", "deroule", "piste", "mesures"], "6e");
const { e, vrai, verif, dit, dessin, essai, appels, feuille } = f;

const PI = 3.14;
const TAILLE = 14;
const r9 = (x) => Math.round(x * 1e9) / 1e9;
const T = (x) => t(r9(x));
const somme = (xs) => xs.reduce((a, b) => a + b, 0);
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
/** « 125,6 cm », « 1 tour : 157 cm » → le DERNIER nombre du texte. */
const nombre = (s) => Number([...String(s).matchAll(/(\d+(?:,\d+)?)/g)].at(-1)[1].replace(",", "."));
/** 1 % près : les coordonnées des dessins sont arrondies au centième. */
const presque = (a, b) => Math.abs(a - b) <= 0.01 * Math.max(1, Math.abs(b));

/* ── Le rendu de `plan`, rejoué ─────────────────────────────────────────── */
const SIGNES = { h: [0, -1], b: [0, 1], g: [-1, 0], d: [1, 0], hg: [-1, -1], hd: [1, -1], bg: [-1, 1], bd: [1, 1] };
const boite = (x, y, txt, d, e0 = 6) => {
  const w = [...txt].length * TAILLE * 0.6;
  const [sx, sy] = SIGNES[d];
  const ee = sx !== 0 && sy !== 0 ? e0 * 0.7 : e0;
  return { t: txt, cx: x + sx * (ee + w / 2), cy: y + sy * (ee + TAILLE / 2), w, h: TAILLE };
};
function renduPlan(o) {
  const xs = [], ys = [];
  for (const c of o.ronds) xs.push(c.centre[0] - c.r, c.centre[0] + c.r), ys.push(c.centre[1] - c.r, c.centre[1] + c.r);
  for (const p of o.points ?? []) xs.push(p.en[0]), ys.push(p.en[1]);
  for (const s of o.segments ?? []) xs.push(s.de[0], s.a[0]), ys.push(s.de[1], s.a[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min(230 / (x1 - x0), 170 / (y1 - y0));
  const M = 34, W = (x1 - x0) * s + 2 * M, H = (y1 - y0) * s + 2 * M;
  const px = (p) => [M + (p[0] - x0) * s, M + (y1 - p[1]) * s];
  const borne = (b) => ({ ...b, cx: Math.min(Math.max(b.cx, b.w / 2 + 2), W - b.w / 2 - 2), cy: Math.min(Math.max(b.cy, b.h / 2 + 2), H - b.h / 2 - 2) });
  const boites = [];
  for (const g of o.segments ?? []) {
    if (!g.label) continue;
    const [a, b] = [px(g.de), px(g.a)];
    boites.push(borne(boite((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, g.label, g.vers ?? "h")));
  }
  for (const p of o.points ?? []) if (p.nom) boites.push(borne(boite(...px(p.en), p.nom, p.vers ?? "hd")));
  const traits = (o.segments ?? []).map((g) => ({ p: px(g.de), q: px(g.a), label: g.label }));
  const ronds = o.ronds.map((c) => [px(c.centre), c.r * s]);
  return { W, H, boites, traits, ronds, points: (o.points ?? []).map((p) => px(p.en)) };
}
/** Un segment [p ; q] coupe-t-il la boîte (réduite d'un pixel) ? Liang–Barsky. */
function coupe(b, p, q) {
  const [x0, x1, y0, y1] = [b.cx - b.w / 2 + 1, b.cx + b.w / 2 - 1, b.cy - b.h / 2 + 1, b.cy + b.h / 2 - 1];
  let [t0, t1] = [0, 1];
  const [dx, dy] = [q[0] - p[0], q[1] - p[1]];
  for (const [pp, qq] of [[-dx, p[0] - x0], [dx, x1 - p[0]], [-dy, p[1] - y0], [dy, y1 - p[1]]]) {
    if (pp === 0) {
      if (qq < 0) return false;
    } else {
      const r = qq / pp;
      if (pp < 0) t0 = Math.max(t0, r);
      else t1 = Math.min(t1, r);
      if (t0 > t1) return false;
    }
  }
  return true;
}
/** Un cercle (centre c, rayon r, en pixels) passe-t-il dans la boîte ? */
function cercleCoupe(b, c, r) {
  const [x0, x1, y0, y1] = [b.cx - b.w / 2 + 1, b.cx + b.w / 2 - 1, b.cy - b.h / 2 + 1, b.cy + b.h / 2 - 1];
  const proche = Math.hypot(Math.max(x0 - c[0], 0, c[0] - x1), Math.max(y0 - c[1], 0, c[1] - y1));
  const loin = Math.max(...[[x0, y0], [x0, y1], [x1, y0], [x1, y1]].map((k) => dist(k, c)));
  return proche < r && loin > r;
}
const seTouchent = (a, b) => Math.abs(a.cx - b.cx) < (a.w + b.w) / 2 && Math.abs(a.cy - b.cy) < (a.h + b.h) / 2;
const surPoint = (b, [x, y]) => Math.abs(x - b.cx) < b.w / 2 + 2 && Math.abs(y - b.cy) < b.h / 2 + 2;
for (const a of appels("plan")) {
  if (!a.args) continue;
  const [o] = a.args;
  const nom = `plan ${a.index}`;
  const r = renduPlan(o);
  vrai(`${nom} : cadre de ${Math.round(r.W)} de large, 300 au plus`, r.W <= 300);
  for (let i = 0; i < r.boites.length; i++) for (let j = i + 1; j < r.boites.length; j++) vrai(`${nom} : « ${r.boites[i].t} » et « ${r.boites[j].t} » ne se touchent pas`, !seTouchent(r.boites[i], r.boites[j]));
  for (const b of r.boites) vrai(`${nom} : « ${b.t} » n'est posé sur aucun point`, r.points.every((p) => !surPoint(b, p)));
  // Ni sur un trait (sauf le segment qu'elle cote), ni sur un cercle.
  for (const b of r.boites) {
    const touches = r.traits.filter((tr) => tr.label !== b.t && coupe(b, tr.p, tr.q));
    vrai(`${nom} : « ${b.t} » ne tombe sur aucun trait`, touches.length === 0, touches.map((tr) => `(${tr.p.map(Math.round)})–(${tr.q.map(Math.round)})`).join(" "));
    vrai(`${nom} : « ${b.t} » ne tombe sur aucun cercle`, r.ronds.every(([c, rr]) => !cercleCoupe(b, c, rr)));
  }
  for (const g of o.segments ?? []) if (g.label && /\d/.test(g.label)) verif(`${nom} : la cote « ${g.label} » est la longueur du segment`, dist(g.de, g.a), nombre(g.label), 1e-9);
}
for (const a of appels("deroule")) {
  if (!a.args) continue;
  const [liste] = a.args;
  const s = 230 / (4.14 * Math.max(...liste.map((q) => q.d)));
  for (const q of liste) {
    const R = (q.d * s) / 2, xs = 8 + 2 * R + 12, L = PI * q.d * s;
    const w = [...q.tour].length * TAILLE * 0.6;
    vrai(`deroule « ${q.tour} » : 3,14 × ${q.d} = ${r9(PI * q.d)} (0,2 % près)`, Math.abs(nombre(q.tour) - PI * q.d) <= 0.002 * PI * q.d);
    vrai(`deroule « ${q.tour} » : ne mord pas sur la roue, tient dans 300`, xs + L / 2 - w / 2 >= 8 + 2 * R + 2 && xs + L / 2 + w / 2 <= 298);
    vrai(`deroule « ${q.diametre} » : tient dans 300`, 8 + [...q.diametre].length * TAILLE * 0.6 <= 298);
    vrai(`deroule « ${q.diametre} » : le diamètre écrit`, Math.abs(nombre(q.diametre) - q.d) <= 0.06);
  }
}
for (const a of appels("piste")) {
  if (!a.args) continue;
  const [forme, L, d, cotes = {}] = a.args;
  const [lw, lh] = forme === "stade" ? [L + d, d] : forme === "fenetre" ? [d, L + d / 2] : [d, d / 2];
  const s = Math.min(190 / lw, 150 / lh);
  const W = lw * s + 104;
  vrai(`piste ${forme} : cadre de ${Math.round(W)}, 300 au plus`, W <= 300);
  if (forme === "fenetre" && cotes.L) vrai(`piste fenêtre : « ${cotes.L} » tient à droite`, 6 + [...cotes.L].length * TAILLE * 0.6 <= 52);
  if (cotes.L) verif(`piste ${forme} : cote « ${cotes.L} »`, nombre(cotes.L), L);
  if (cotes.d) verif(`piste ${forme} : cote « ${cotes.d} »`, nombre(cotes.d), d);
}
for (const a of appels("mesures")) {
  if (!a.args) continue;
  const [entetes, lignes] = a.args;
  vrai(`mesures(${entetes[0]}) : 3 colonnes au plus, lignes de même largeur`, entetes.length <= 3 && lignes.every((l) => l.length === entetes.length));
}

/* ── Les phrases (Frédéric, 30/09 : 12 mots en moyenne, 20 au plus) ───── */
{
  const phrases = [...feuille.enonces, ...feuille.corrections]
    .flatMap((x) => x.replace(/\$[^$]*\$/g, "N").split(/\\n|(?<=[.!?;])\s+/))
    .map((p) => p.trim())
    .filter(Boolean);
  const mots = phrases.map((p) => p.split(/\s+/).filter((m) => /[\wÀ-ÿ]/.test(m)).length);
  const longues = phrases.filter((_, i) => mots[i] > 20);
  const moyenne = somme(mots) / mots.length;
  console.log(`phrases : ${phrases.length}, ${moyenne.toFixed(1)} mots en moyenne, ${Math.max(...mots)} au plus`);
  vrai("phrases de 20 mots au plus", longues.length === 0, longues.slice(0, 3).join(" | "));
  vrai(`12 mots en moyenne (${moyenne.toFixed(1)}), 13 au plus`, moyenne <= 13);
}

/** Le plan de l'exercice k : ses points par nom, ses cercles, ses segments. */
const lirePlan = (k, role) => {
  const [o] = dessin("plan", k, role);
  const P = Object.fromEntries((o.points ?? []).filter((p) => p.nom).map((p) => [p.nom, p.en]));
  return { ...o, P };
};
/** La distance d'un point à une droite (AB). */
const aLaDroite = (p, a, b) => Math.abs((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / dist(a, b);

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const { P, ronds } = lirePlan(1, "figure");
  const r = ronds[0].r;
  for (const k of ["A", "B", "C", "D", "E"]) vrai(`1. ${k} est sur le cercle`, presque(dist(P[k], P.O), r));
  vrai("1. O est le milieu de [BC] : un diamètre", presque(dist(P.B, P.C), 2 * r) && aLaDroite(P.O, P.B, P.C) < 1e-9);
  vrai("1. [DE] ne passe pas par O : une corde", aLaDroite(P.O, P.D, P.E) > 1);
  dit(1, "Réponse : $[OA]$ est un rayon, $[BC]$ un diamètre, $[DE]$ une corde.");
});
essai("2", () => {
  const { ronds, segments } = lirePlan(2, "schema");
  const [rayon, diam] = segments;
  vrai("2. le rayon tracé part du centre", dist(rayon.de, ronds[0].centre) < 1e-9 && presque(dist(rayon.a, ronds[0].centre), ronds[0].r));
  vrai("2. le diamètre tracé passe par le centre", presque(dist(diam.de, ronds[1].centre) + dist(diam.a, ronds[1].centre), 2 * ronds[1].r));
  const [r, d] = [ronds[0].r, 2 * ronds[1].r];
  vrai("2. l'énoncé : 8 et 9", e(2).includes(`rayon de $${r}$ cm`) && e(2).includes(`diamètre de $${d}$ cm`));
  dit(2, `$${r} \\times 2 = ${2 * r}$ cm.`);
  dit(2, `$${d} \\div 2 = ${T(d / 2)}$ cm.`);
  dit(2, `Réponse : a) $${2 * r}$ cm ; b) $${T(d / 2)}$ cm.`);
});
essai("3", () => {
  const { P, ronds } = lirePlan(3, "figure");
  const r = ronds[0].r;
  const dd = { M: dist(P.M, P.O), N: dist(P.N, P.O), P: dist(P.P, P.O) };
  for (const [k, v] of Object.entries(dd)) vrai(`3. O${k} ≈ ${Math.round(v * 100) / 100} dessiné comme dans l'énoncé`, e(3).includes(`O${k} = ${Math.round(v)}$ cm`) && presque(v, Math.round(v)));
  const sur = Object.keys(dd).filter((k) => presque(dd[k], r));
  const dans = Object.keys(dd).filter((k) => dd[k] <= r + 0.03);
  const dehors = Object.keys(dd).filter((k) => dd[k] > r + 0.03);
  vrai("3. M sur le cercle, M et N dans le disque, P dehors", sur.join() === "M" && dans.join() === "M,N" && dehors.join() === "P");
  dit(3, `Réponse : a) ${sur[0]} ; b) ${dans.join(" et ")} ; c) ${dehors[0]}.`);
});
essai("4", () => {
  const [, lignes] = dessin("mesures", 4, "schema");
  const [d0, t0] = lignes[0].map(nombre);
  for (const [d, tt] of lignes.map((l) => l.map(nombre))) verif(`4. tour de ${d} cm = ${t0} × ${d / d0}`, tt, r9(t0 * (d / d0)), 1e-9);
  dit(4, `$${T(t0)} \\times 3 = ${T(t0 * 3)}$ cm.`);
  dit(4, `$${T(t0)} \\times 10 = ${T(t0 * 10)}$ cm.`);
  vrai("4. 6,28 = 3,14 × 2", r9(PI * d0) === t0);
  dit(4, `Réponse : a) $${T(t0 * 3)}$ cm ; b) $${T(t0 * 10)}$ cm.`);
});
essai("5", () => {
  const { segments } = lirePlan(5, "schema");
  const d = dist(segments[0].de, segments[0].a);
  dit(5, `$3{,}14 \\times ${d} = ${T(PI * d)}$ cm.`);
  dit(5, `Réponse : environ $${T(PI * d)}$ cm de ruban.`);
});
essai("6", () => {
  const { segments, ronds } = lirePlan(6, "schema");
  const r = dist(segments[0].de, segments[0].a);
  vrai("6. le segment est un rayon", r === ronds[0].r);
  dit(6, `$${r} \\times 2 = ${2 * r}$ cm.`);
  dit(6, `Périmètre : $3{,}14 \\times ${2 * r} = ${T(PI * 2 * r)}$ cm.`);
  dit(6, `$3{,}14 \\times ${r} = ${T(PI * r)}$`);
  vrai("6. un CD : 12 cm de diamètre", 2 * r === 12);
});
essai("7", () => {
  const { P, ronds } = lirePlan(7, "figure");
  const r = ronds[0].r;
  const dd = { G: dist(P.G, P.P), N: dist(P.N, P.P), B: dist(P.B, P.P) };
  vrai("7. G à 2,5 m, N à 3 m, B à 3,5 m", presque(dd.G, 2.5) && presque(dd.N, 3) && presque(dd.B, 3.5));
  vrai("7. l'énoncé", e(7).includes("G est à $2{,}5$ m") && e(7).includes("N est à $3$ m") && e(7).includes("B est à $3{,}5$ m"));
  vrai("7. G et N atteints, B non", dd.G < r && presque(dd.N, r) && dd.B > r);
  dit(7, "Réponse : a) un disque de rayon $3$ m ; b) G oui, N oui, B non.");
});
essai("8", () => {
  const [[q]] = dessin("deroule", 8, "schema");
  const tour = nombre(q.tour);
  vrai("8. l'énoncé : 125,6", e(8).includes(`$${T(tour)}$ cm`));
  dit(8, `$${T(tour)} \\div 3{,}14 = ${T(tour / PI)}$ cm.`);
  dit(8, `$3{,}14 \\times ${T(tour / PI)} = ${T(tour)}$.`);
  vrai("8. le diamètre dessiné", q.d === r9(tour / PI));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const { P, ronds } = lirePlan(9, "schema");
  const [cA, cB] = ronds;
  const AB = dist(P.A, P.B);
  vrai("9. AB = 6 cm", AB === 6 && e(9).includes(`$${AB}$ cm`));
  // Les deux points communs, recalculés : x = (AB² + rA² − rB²) ÷ (2 AB).
  const x = (AB * AB + cA.r * cA.r - cB.r * cB.r) / (2 * AB), y = Math.sqrt(cA.r * cA.r - x * x);
  vrai(`9. M et N sont les points communs (${x.toFixed(3)} ; ±${y.toFixed(3)})`, dist(P.M, [x, y]) < 0.01 && dist(P.N, [x, -y]) < 0.01);
  vrai("9. M et N sur les deux cercles", [P.M, P.N].every((p) => presque(dist(p, P.A), cA.r) && presque(dist(p, P.B), cB.r)));
  vrai("9. les cercles se coupent : |4 − 3| < 6 < 4 + 3", Math.abs(cA.r - cB.r) < AB && AB < cA.r + cB.r);
  dit(9, `$1 + 2 = 3$, moins que $${AB}$.`);
  vrai("9. d) 1 + 2 < 6 : aucun point", 1 + 2 < AB);
  dit(9, "c) $2$ points ; d) aucun.");
});
essai("10", () => {
  const [, lignes] = dessin("mesures", 10, "figure");
  for (const [objet, dd, tt] of lignes) {
    const [d, tour] = [nombre(dd), nombre(tt)];
    const q = Math.round((tour / d) * 100) / 100;
    vrai(`10. ${objet} : ${tour} ÷ ${d} ≈ 3,14`, q === 3.14);
    const signe = r9(tour / d) === 3.14 ? "=" : "\\approx";
    dit(10, `$${T(tour)} \\div ${d} ${signe} 3{,}14$.`);
  }
  dit(10, `c) $3{,}14 \\times 30 = ${T(PI * 30)}$ cm.`);
});
essai("11", () => {
  const [[q]] = dessin("deroule", 11, "schema");
  const tour = r9(PI * q.d);
  vrai("11. l'énoncé : 50 cm", e(11).includes(`diamètre de $${q.d}$ cm`));
  dit(11, `$3{,}14 \\times ${q.d} = ${T(tour)}$ cm.`);
  dit(11, `$${T(tour)} \\times 10 = ${T(tour * 10)}$ cm, soit $${T(tour * 10 / 100)}$ m.`);
  dit(11, `$314$ m $= ${T(31400)}$ cm.`);
  dit(11, `$${T(31400)} \\div ${T(tour)} = ${T(31400 / tour)}$ tours.`);
});
essai("12", () => {
  const [forme, L, d] = dessin("piste", 12, "figure");
  vrai("12. une fenêtre", forme === "fenetre");
  const cercle = r9(PI * d), demi = r9(cercle / 2), P = r9(2 * L + d + demi);
  dit(12, `$${L} + ${L} = ${2 * L}$ dm.`);
  dit(12, `Le bas : $${d}$ dm.`);
  dit(12, `$3{,}14 \\times ${d} = ${T(cercle)}$ dm.`);
  dit(12, `$${T(cercle)} \\div 2 = ${T(demi)}$ dm.`);
  dit(12, `$${2 * L} + ${d} + ${T(demi)} = ${T(P)}$ dm.`);
});
essai("13", () => {
  const { P, ronds } = lirePlan(13, "figure");
  const r = ronds[0].r;
  for (const k of ["A", "B", "C"]) vrai(`13. ${k} sur le cercle de rayon ${r}`, presque(dist(P[k], P.O), r));
  vrai("13. [AB] passe par O", aLaDroite(P.O, P.A, P.B) < 0.02 && presque(dist(P.A, P.B), 2 * r));
  vrai("13. [AC] ne passe pas par O, plus courte", aLaDroite(P.O, P.A, P.C) > 1 && dist(P.A, P.C) < dist(P.A, P.B));
  dit(13, `$OB = OC = ${T(r)}$ cm.`);
  dit(13, `$AB = ${T(r)} \\times 2 = ${T(2 * r)}$ cm.`);
});
essai("14", () => {
  const { segments, ronds } = lirePlan(14, "figure");
  const r = dist(segments[0].de, segments[0].a);
  vrai("14. l'aiguille = un rayon", r === ronds[0].r);
  dit(14, `$${r} \\times 2 = ${2 * r}$ cm.`);
  dit(14, `$3{,}14 \\times ${2 * r} = ${T(PI * 2 * r)}$ cm.`);
  dit(14, `$${T(PI * 2 * r)} \\div 4 = ${T(PI * 2 * r / 4)}$ cm.`);
});
essai("15", () => {
  const [[A, B]] = dessin("deroule", 15, "schema");
  vrai("15. B = 3 × A", B.d === 3 * A.d);
  dit(15, `$${A.d} \\times 3 = ${B.d}$ cm.`);
  dit(15, `$${T(nombre(A.tour))} \\times 3 = ${T(nombre(A.tour) * 3)}$ cm.`);
  dit(15, `$3{,}14 \\times ${B.d} = ${T(PI * B.d)}$ cm.`);
  vrai("15. même nombre par les deux chemins", r9(nombre(A.tour) * 3) === r9(PI * B.d));
  dit(15, `ajouter $${B.d - A.d}$ cm`);
});
essai("16", () => {
  const [forme, , d] = dessin("piste", 16, "figure");
  vrai("16. un demi-disque", forme === "demi");
  dit(16, `$3{,}14 \\times ${d} = ${T(PI * d)}$ cm.`);
  dit(16, `$${T(PI * d)} \\div 2 = ${T(PI * d / 2)}$ cm.`);
  dit(16, `$${T(PI * d / 2)} + ${d} = ${T(PI * d / 2 + d)}$ cm.`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [forme, L, d] = dessin("piste", 17, "figure");
  vrai("17. un stade", forme === "stade");
  const tour = r9(2 * L + PI * d);
  dit(17, `$${L} + ${L} = ${2 * L}$ m.`);
  dit(17, `$3{,}14 \\times ${d} = ${T(PI * d)}$ m.`);
  dit(17, `$${2 * L} + ${T(PI * d)} = ${T(tour)}$ m.`);
  dit(17, `$${T(tour)} \\times 3 = ${T(tour * 3)}$ m.`);
  vrai("17. plus de 1 km", tour * 3 > 1000);
});
essai("18", () => {
  const [[q]] = dessin("deroule", 18, "schema");
  const d = Math.round((100 / PI) * 10) / 10;
  dit(18, `$100 \\div 3{,}14 \\approx ${T(d)}$ cm.`);
  vrai("18. la roue dessinée fait 100 cm de tour", Math.abs(PI * q.d - 100) < 0.1);
  dit(18, "$45 \\times 1 = 45$ m.");
});
essai("19", () => {
  const { P, ronds } = lirePlan(19, "figure");
  const [rA, rB] = [ronds[0].r, ronds[1].r];
  vrai("19. A et B à 7 m", dist(P.A, P.B) === 7);
  const qui = {};
  for (const k of ["P", "Q", "R", "S"]) {
    const [a, b] = [dist(P[k], P.A), dist(P[k], P.B)];
    vrai(`19. ${k} : ${Math.round(a)} m de A, ${Math.round(b)} m de B, comme l'énoncé`, presque(a, Math.round(a)) && presque(b, Math.round(b)) && e(19).includes(`${k} est à $${Math.round(a)}$ m de A et à $${Math.round(b)}$ m de B`));
    qui[k] = [Math.round(a) <= rA ? "A" : null, Math.round(b) <= rB ? "B" : null].filter(Boolean).join(" et ") || "aucun";
  }
  dit(19, `b) P : ${qui.P} ; Q : ${qui.Q} ; R : ${qui.R} ; S : ${qui.S} ; c) S.`);
  vrai("19. S seule au sec", qui.S === "aucun" && ["P", "Q", "R"].every((k) => qui[k] !== "aucun"));
});
essai("20", () => {
  const { ronds, points, segments } = dessin("plan", 20, "schema")[0];
  const [c] = ronds;
  vrai("20. 24 élèves sur la ronde", points.length === 24 && points.every((p) => presque(dist(p.en, c.centre), c.r)));
  const tour = r9(24 * 1.2), d = Math.round((tour / PI) * 10) / 10;
  dit(20, `$24 \\times 1{,}2 = ${T(tour)}$ m.`);
  dit(20, `$${T(tour)} \\div 3{,}14 \\approx ${T(d)}$ m.`);
  vrai("20. le cercle dessiné a ce diamètre", Math.abs(2 * c.r - tour / PI) < 0.02);
  const cote = dist(segments[0].de, segments[0].a);
  vrai("20. la cour de 10 m, la ronde dedans", cote === 10 && d < cote);
  const tour30 = r9(30 * 1.2), d30 = Math.round((tour30 / PI) * 10) / 10;
  dit(20, `$30 \\times 1{,}2 = ${T(tour30)}$ m de tour.`);
  dit(20, `$${T(tour30)} \\div 3{,}14 \\approx ${T(d30)}$ m de diamètre.`);
  vrai("20. 30 élèves : trop grand", d30 > cote);
});

f.fin();
