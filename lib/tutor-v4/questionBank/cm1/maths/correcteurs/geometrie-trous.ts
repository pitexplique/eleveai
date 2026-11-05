import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { type Q, justeNombre, justeTexte, justeUnique, nombres, valeur } from "./outils";

// Les correcteurs de geometrie-trous.bank.ts : relisent le texte ET la figure (marques,
// coordonnées, données), et refont le raisonnement. Vide = juste.

const fig = (q: Q) => q.canvas as any;

/* ── figure_codage ── */
const dist = (a: any, b: any) => Math.hypot(a.x - b.x, a.y - b.y);
/** Le codage doit dire vrai : les côtés codés égaux ont la même longueur, l'angle droit l'est. */
function codageSain(q: Q): string[] {
  const c = fig(q);
  const pb: string[] = [];
  const cote = (s: string) => dist(c.points[s[0]], c.points[s[1]]);
  for (const [a, b] of c.marks?.equalSides ?? []) if (Math.abs(cote(a) / cote(b) - 1) > 0.02) pb.push(`${a} ≠ ${b}`);
  const noms = Object.keys(c.points);
  for (const s of [c.marks?.rightAngleAt, ...(c.marks?.rightAnglesAt ?? [])].filter(Boolean)) {
    const i = noms.indexOf(s);
    const u = c.points[noms[(i + 1) % noms.length]], v = c.points[noms[(i + noms.length - 1) % noms.length]], o = c.points[s];
    if (Math.abs((u.x - o.x) * (v.x - o.x) + (u.y - o.y) * (v.y - o.y)) > 1) pb.push(`angle en ${s} non droit`);
  }
  return pb;
}
const et = (...l: string[][]) => l.flat();
const codageCarre = (q: Q) => et(codageSain(q), justeTexte(q, "Un angle droit"), fig(q).marks?.rightAngleAt ? [] : ["pas de petit carré"]);
const codageTraits = (q: Q) => et(codageSain(q), justeTexte(q, "Les deux côtés ont la même longueur"), fig(q).marks?.equalSides?.length ? [] : ["pas de traits"]);
const ouDroit = (q: Q) => et(codageSain(q), justeTexte(q, `Le point ${fig(q).labels[fig(q).marks.rightAngleAt]}`));
function natureQuad(q: Q) {
  const m = fig(q).marks ?? {};
  const droits = (m.rightAnglesAt ?? []).length === 4, cotes = (m.equalSides ?? []).length === 3;
  return et(codageSain(q), justeTexte(q, droits && cotes ? "Un carré" : droits ? "Un rectangle" : cotes ? "Un losange" : "?"));
}
function natureTri(q: Q) {
  const m = fig(q).marks ?? {};
  return et(codageSain(q), justeTexte(q, m.rightAngleAt ? "Un triangle rectangle" : m.equalSides?.length === 2 ? "Un triangle équilatéral" : "Un triangle isocèle"));
}
const nbDroits = (q: Q) => et(codageSain(q), justeNombre(q, fig(q).marks.rightAnglesAt.length));
function coteOppose(q: Q) {
  const c = fig(q), [l] = nombres(q.text);
  const u = q.text.match(/\d+ (cm|m)\b/)![1];
  const opp = c.labels.C + c.labels.D;
  if (!q.text.includes(`${c.labels.A}${c.labels.B}`) || !q.text.includes(opp)) return ["côtés introuvables"];
  return et(codageSain(q), justeNombre(q, l, u));
}
function perimetre4(q: Q) {
  const [l] = nombres(q.text);
  if (fig(q).marks.equalSides.length !== 3) return ["pas 4 côtés égaux"];
  return et(codageSain(q), justeNombre(q, 4 * l, q.text.match(/\d+ (cm|m)\b/)![1]));
}
function manqueCarre(q: Q) {
  const m = fig(q).marks ?? {};
  return et(codageSain(q), justeTexte(q, (m.rightAnglesAt ?? []).length === 4 ? "Coder 4 côtés égaux" : "Coder 4 angles droits"));
}
function perimetreIso(q: Q) {
  const c = fig(q), [a, b] = nombres(q.text);
  if (!q.text.includes(`[${c.labels.C}${c.labels.A}] mesure`)) return ["côté égal non donné"];
  return et(codageSain(q), justeNombre(q, 2 * a + b, q.text.match(/\d+ (cm|m|km)\b/)![1]));
}

/* ── cercle_ensemble_points ── */
function surCercle(q: Q) {
  const [r] = nombres(q.text);
  return justeNombre(q, r, q.text.match(/\d+ (cm|m|km)\b/)![1]);
}
function ouPoint(q: Q) {
  const [r, d] = nombres(q.text);
  return justeTexte(q, d === r ? "Sur le cercle" : d < r ? "À l’intérieur du cercle" : "À l’extérieur du cercle");
}
function figurePoint(q: Q) {
  const c = fig(q);
  const R = c.circle.r, O = { x: c.circle.cx, y: c.circle.cy };
  const voulu = /à l’intérieur/.test(q.text) ? (d: number) => d < R - 5 : /à l’extérieur/.test(q.text) ? (d: number) => d > R + 5 : (d: number) => Math.abs(d - R) < 3;
  const bons = c.points.filter((p: any) => p.id !== "O" && voulu(dist(p, O)));
  if (bons.length !== 1) return [`${bons.length} points conviennent`];
  return justeTexte(q, `Le point ${bons[0].label}`);
}
function ensemble(q: Q) {
  const [r] = nombres(q.text);
  return justeTexte(q, `Un cercle de rayon ${r} ${q.text.match(/\d+ (cm|m|km)\b/)![1]}`);
}
function dansDisque(q: Q) {
  const [r, d] = nombres(q.text);
  return justeTexte(q, d <= r ? "Oui" : "Non");
}
function diametre(q: Q) {
  const [v] = nombres(q.text);
  const u = q.text.match(/\d+ (cm|m|km)\b/)![1];
  return justeNombre(q, /rayon (?:du|de|d’)|un rayon/.test(q.text) && !/diamètre \[?[A-Z]*\]? ?(?:d’un cercle )?(?:mesure|de)/.test(q.text) ? 2 * v : v / 2, u);
}
function chevre(q: Q) {
  const [r, d] = nombres(q.text);
  return justeTexte(q, d <= r ? "Oui" : "Non");
}
function arroseur(q: Q) {
  const [r, ...ds] = nombres(q.text);
  return justeNombre(q, ds.filter((d) => d <= r).length);
}
function deuxCercles(q: Q) {
  const [a, b, d] = nombres(q.text);
  return justeTexte(q, d < a ? "Dans le petit cercle" : d < b ? "Entre les deux cercles" : "Hors du grand cercle");
}
function plusGrandeDist(q: Q) {
  const [r] = nombres(q.text);
  return justeNombre(q, 2 * r, "m");
}

/* ── solide_prisme ── */
const COTES: Record<string, number> = { triangle: 3, triangulaire: 3, quadrilatère: 4, "quatre côtés": 4, pentagone: 5, pentagonale: 5, hexagone: 6, hexagonale: 6, octogone: 8, octogonale: 8 };
const cotesDe = (t: string) => {
  const m = t.match(/triangle|triangulaire|quadrilatère|quatre côtés|pentagone|pentagonale|hexagone|hexagonale|octogone|octogonale/);
  return m ? COTES[m[0]] : 0;
};
const prismeFaces = (q: Q) => justeNombre(q, cotesDe(q.text) + 2);
const prismeSommets = (q: Q) => justeNombre(q, 2 * cotesDe(q.text));
const prismeLateral = (q: Q) => justeTexte(q, "Des rectangles");
const prismeAretes = (q: Q) => justeNombre(q, 3 * cotesDe(q.text));
const prismeNbLat = (q: Q) => justeNombre(q, cotesDe(q.text));
function prismeBase(q: Q) {
  const f = nombres(q.text)[0];
  const j = Object.entries({ triangle: 3, quadrilatère: 4, pentagone: 5, hexagone: 6, octogone: 8 }).find(([, n]) => n === f - 2)!;
  return justeTexte(q, `Un ${j[0]}`);
}
function prismeCtx(q: Q) {
  const n = cotesDe(q.text);
  const m = q.text.match(/faces|sommets|arêtes/g)!.pop();
  return justeNombre(q, m === "faces" ? n + 2 : m === "sommets" ? 2 * n : 3 * n);
}
function prismePatron(q: Q) {
  const n = cotesDe(q.text);
  const pl = Object.entries({ triangles: 3, quadrilatères: 4, pentagones: 5, hexagones: 6, octogones: 8 }).find(([, k]) => k === n)![0];
  return justeTexte(q, `2 ${pl} et ${n} rectangles`);
}
function prismeInverse(q: Q) {
  const v = nombres(q.text)[0];
  const mots = q.text.match(/faces|sommets|arêtes/g)!;
  const n = mots[0] === "faces" ? v - 2 : mots[0] === "sommets" ? v / 2 : v / 3;
  const m2 = mots[1];
  return justeNombre(q, m2 === "faces" ? n + 2 : m2 === "sommets" ? 2 * n : 3 * n);
}

/* ── graphique_courbe_lire ── */
const donnees = (q: Q) => fig(q).data as { label: string; value: number }[];
const courbeSans = (q: Q) => (fig(q).display?.showValues === false && fig(q).display?.showAxis ? [] : ["la courbe affiche ses valeurs"]);
// « 8 h » ne doit pas se lire dans « 18 h ».
const repere = (q: Q) => donnees(q).filter((d) => new RegExp(`(^|[^\\d])${d.label.replace(".", "\\.")}`).test(q.text)).sort((a, b) => q.text.search(a.label.replace(".", "\\.")) - q.text.search(b.label.replace(".", "\\.")));
const unite = (q: Q) => fig(q).display.axeY as string;
const courbeValeur = (q: Q) => {
  const r = repere(q);
  if (r.length !== 1) return ["moment illisible"];
  return et(courbeSans(q), justeNombre(q, r[0].value, unite(q)));
};
const courbeMax = (q: Q) => {
  const d = donnees(q);
  const m = Math.max(...d.map((x) => x.value));
  return et(courbeSans(q), justeTexte(q, d.find((x) => x.value === m)!.label));
};
const courbeMin = (q: Q) => {
  const d = donnees(q);
  const m = Math.min(...d.map((x) => x.value));
  return et(courbeSans(q), justeTexte(q, d.find((x) => x.value === m)!.label));
};
const courbeSens = (q: Q) => {
  const r = repere(q);
  if (r.length !== 2 || r[0].value === r[1].value) return ["moments illisibles"];
  return et(courbeSans(q), justeTexte(q, r[1].value > r[0].value ? "Elle monte" : "Elle descend"));
};
const courbeEcart = (q: Q) => {
  const r = repere(q);
  if (r.length !== 2) return ["moments illisibles"];
  return et(courbeSans(q), justeNombre(q, Math.abs(r[1].value - r[0].value), unite(q)));
};
const courbeQuand = (q: Q) => {
  const u = unite(q);
  const m = q.text.match(new RegExp(`(\\d+) ${u.replace(/[°]/g, "°")}`));
  if (!m) return ["valeur illisible"];
  const v = Number(m[1]);
  const l = donnees(q).filter((x) => x.value === v);
  if (l.length !== 1) return ["valeur ambiguë"];
  return et(courbeSans(q), justeTexte(q, l[0].label));
};
const courbeAmplitude = (q: Q) => {
  const v = donnees(q).map((x) => x.value);
  return et(courbeSans(q), justeNombre(q, Math.max(...v) - Math.min(...v), unite(q)));
};
const courbeHausse = (q: Q) => {
  const d = donnees(q);
  const h = d.slice(1).map((x, i) => x.value - d[i].value);
  const M = Math.max(...h);
  if (h.filter((x) => x === M).length !== 1) return ["hausse ambiguë"];
  const i = h.indexOf(M);
  return et(courbeSans(q), justeTexte(q, `De ${d[i].label} à ${d[i + 1].label}`));
};
const courbeSeuil = (q: Q) => {
  const s = Number(q.text.match(new RegExp(`(\\d[\\d\\s]*) ${unite(q)}`))![1].replace(/\s/g, ""));
  return et(courbeSans(q), justeNombre(q, donnees(q).filter((x) => x.value > s).length));
};

/* ── angle_notation ── */
const hats = (t: string) => [...t.matchAll(/\\widehat\{([A-Z]{3})\}/g)].map((m) => m[1]);
const notSommet = (q: Q) => justeTexte(q, `Le point ${hats(q.text)[0][1]}`);
const notCotes = (q: Q) => {
  const [a, b, c] = hats(q.text)[0];
  return justeTexte(q, `[${b}${a}) et [${b}${c})`);
};
const memeAngle = (x: string, s: string, y: string, c: string) => {
  const m = hats(c)[0];
  return !!m && m[1] === s && ((m[0] === x && m[2] === y) || (m[0] === y && m[2] === x));
};
const notFigure = (q: Q) => {
  const l = fig(q).angle.labels;
  return justeUnique(q, (c) => memeAngle(l.left, l.vertex, l.right, c));
};
const notTriangle = (q: Q) => {
  const ls = Object.values(fig(q).labels) as string[];
  const s = q.text.match(/(?:sommet|en|au sommet) ([A-Z]) ?[?.]/)![1];
  const [x, y] = ls.filter((l) => l !== s);
  return justeUnique(q, (c) => memeAngle(x, s, y, c));
};
const notMeme = (q: Q) => {
  const [u, v] = hats(q.text);
  return justeTexte(q, u[1] === v[1] && new Set([u[0], u[2], v[0], v[2]]).size === 2 ? "Oui" : "Non");
};
const notRayons = (q: Q) => {
  const m = [...q.text.matchAll(/\[([A-Z])([A-Z])\)/g)];
  const s = m[0][1];
  if (m[1][1] !== s) return ["sommets différents"];
  const noms = fig(q).points.map((p: any) => p.label);
  if (!noms.includes(m[0][2]) || !noms.includes(m[1][2])) return ["point absent de la figure"];
  return justeUnique(q, (c) => memeAngle(m[0][2], s, m[1][2], c));
};
const notEn = (q: Q) => justeTexte(q, `En ${hats(q.text)[0][1]}`);
const notVise = (q: Q) => {
  const s = q.text.match(/(?:Depuis|se place en) ([A-Z])/)![1];
  const ls = q.text.match(/ : ([A-Z]), ([A-Z]) et ([A-Z])\./)!.slice(1);
  const [x, y] = ls.filter((l) => l !== s);
  return justeUnique(q, (c) => memeAngle(x, s, y, c));
};
const notQuad = (q: Q) => {
  const tour = q.text.match(/quadrilatère ([A-Z]{4})/)![1];
  const s = q.text.match(/(?:sommet|en) ([A-Z]) ?[?.]/)![1];
  const i = tour.indexOf(s);
  return justeUnique(q, (c) => memeAngle(tour[(i + 3) % 4], s, tour[(i + 1) % 4], c));
};
const notCorrige = (q: Q) => {
  const s = q.text.match(/sommet ([A-Z])/)![1];
  const [e] = hats(q.text);
  const [x, y] = [...e].filter((l) => l !== s);
  return justeUnique(q, (c) => memeAngle(x, s, y, c));
};

/* ── angle_comparer_sans_mesure ── */
function ouvertures(q: Q) {
  const res: Record<string, number> = {};
  for (const a of fig(q).angles) res[a.nom] = a.deg;
  return res;
}
const pasDeDegres = (q: Q) => (/\d\s*°/.test(q.text) ? ["mesure écrite"] : []);
const plusOuvert = (q: Q, grand: boolean) => {
  const o = ouvertures(q);
  const l = Object.keys(o).sort((a, b) => o[a] - o[b]);
  return et(pasDeDegres(q), justeTexte(q, `L’angle ${grand ? l[l.length - 1] : l[0]}`));
};
const cmpGrand = (q: Q) => plusOuvert(q, true);
const cmpPetit = (q: Q) => plusOuvert(q, false);
const cmpLequel = (q: Q) => plusOuvert(q, /plus (grand|ouvert)/.test(q.text));
const cmpEcriture = (q: Q) => {
  const o = ouvertures(q);
  return justeUnique(q, (c) => {
    const m = c.match(/^([A-Z]) ([<>=]) ([A-Z])$/);
    if (!m) return false;
    const a = o[m[1]], b = o[m[3]];
    return m[2] === "<" ? a < b : m[2] === ">" ? a > b : a === b;
  });
};
const cmpCotes = (q: Q) => justeTexte(q, "L’angle reste le même");
const cmpDroit = (q: Q) => {
  const o = ouvertures(q);
  const s = q.text.match(/l’angle ([A-Z]) (?:\?|à l’angle)/i)![1];
  if (o[s] === 90) return ["angle droit des deux côtés"];
  return justeTexte(q, o[s] > 90 ? "Plus grand que l’angle droit" : "Plus petit que l’angle droit");
};
const cmpCtx = (q: Q) => plusOuvert(q, /plus ouvert|plus grand écart/.test(q.text));
const cmpCalque = (q: Q) => justeTexte(q, "Décalquer un angle et le poser sur l’autre");
const cmpRanger = (q: Q) => {
  const o = ouvertures(q);
  const l = Object.keys(o).sort((a, b) => o[a] - o[b]);
  return justeTexte(q, `${l[0]} < ${l[1]} < ${l[2]}`);
};
const cmpPose = (q: Q) => {
  const m = q.text.match(/L’autre côté de ([A-Z]) (reste à l’intérieur|sort) de l’angle ([A-Z])/);
  if (!m) return ["énoncé illisible"];
  return justeTexte(q, `L’angle ${m[2] === "sort" ? m[1] : m[3]}`);
};

/* ── graphique_nuage_points ── */
const pts = (q: Q) => fig(q).points as { x: number; y: number; label: string }[];
const pt = (q: Q) => {
  const l = pts(q).filter((p) => new RegExp(`\\b${p.label}\\b`).test(q.text.replace(/\bÀ\b/g, "")));
  return l.length === 1 ? l[0] : null;
};
const nuageH = (q: Q) => { const p = pt(q); return p ? justeNombre(q, p.x) : ["point illisible"]; };
const nuageV = (q: Q) => { const p = pt(q); return p ? justeNombre(q, p.y) : ["point illisible"]; };
const extreme = (q: Q, f: (p: { x: number; y: number }) => number, max: boolean) => {
  const v = pts(q).map(f);
  const c = max ? Math.max(...v) : Math.min(...v);
  const l = pts(q).filter((p) => f(p) === c);
  if (l.length !== 1) return ["extrême ambigu"];
  return justeTexte(q, `Le point ${l[0].label}`);
};
const nuageHaut = (q: Q) => extreme(q, (p) => p.y, /plus haut|plus grande/.test(q.text));
const nuageDroite = (q: Q) => extreme(q, (p) => p.x, /plus à droite|plus grande/.test(q.text));
const nuageCoord = (q: Q) => {
  const [x, y] = nombres(q.text);
  const l = pts(q).filter((p) => p.x === x && p.y === y);
  if (l.length !== 1) return ["point introuvable"];
  return justeTexte(q, `Le point ${l[0].label}`);
};
const nuageAuDessus = (q: Q) => {
  const [s] = nombres(q.text);
  return justeNombre(q, pts(q).filter((p) => p.y > s).length);
};
const nuageCtxLire = (q: Q) => {
  const m = q.text.match(/En bas : ([^.]+)\. À gauche : ([^.]+)\. Que vaut « ([^»]+) » pour ([A-Z])/);
  if (!m) return ["énoncé illisible"];
  const p = pts(q).find((x) => x.label === m[4])!;
  return justeNombre(q, m[3] === m[2] ? p.y : p.x);
};
const nuageCtxMax = (q: Q) => {
  const m = q.text.match(/En bas : ([^.]+)\. À gauche : ([^.]+)\./);
  if (!m) return ["énoncé illisible"];
  const fin = q.text.slice(q.text.lastIndexOf("Quel point"));
  const axeY = fin.includes(m[2]);
  return extreme(q, (p) => (axeY ? p.y : p.x), true);
};
const nuageSens = (q: Q) => {
  const l = [...pts(q)].sort((a, b) => a.x - b.x);
  const monte = l.every((p, i) => i === 0 || p.y >= l[i - 1].y);
  const desc = l.every((p, i) => i === 0 || p.y <= l[i - 1].y);
  if (monte === desc) return ["nuage sans tendance nette"];
  return justeTexte(q, monte ? "Plus la valeur en bas grandit, plus la valeur à gauche grandit" : "Plus la valeur en bas grandit, plus la valeur à gauche diminue");
};
const nuageDouble = (q: Q) => {
  const m = q.text.match(/plus de (\d+) en bas et plus de (\d+) à gauche/)!;
  return justeNombre(q, pts(q).filter((p) => p.x > Number(m[1]) && p.y > Number(m[2])).length);
};

const F = "cm1_figure_codage_tpl_", K = "cm1_cercle_ensemble_points_tpl_", S = "cm1_solide_prisme_tpl_", G = "cm1_graphique_courbe_lire_tpl_", N = "cm1_angle_notation_tpl_", C = "cm1_angle_comparer_sans_mesure_tpl_", U = "cm1_graphique_nuage_points_tpl_";
export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  [`${F}1`]: codageCarre, [`${F}2`]: codageTraits, [`${F}3`]: ouDroit, [`${F}4`]: natureQuad, [`${F}5`]: natureTri, [`${F}6`]: nbDroits, [`${F}7`]: coteOppose, [`${F}8`]: perimetre4, [`${F}9`]: manqueCarre, [`${F}10`]: perimetreIso,
  [`${K}1`]: surCercle, [`${K}2`]: ouPoint, [`${K}3`]: figurePoint, [`${K}4`]: ensemble, [`${K}5`]: dansDisque, [`${K}6`]: diametre, [`${K}7`]: chevre, [`${K}8`]: arroseur, [`${K}9`]: deuxCercles, [`${K}10`]: plusGrandeDist,
  [`${S}1`]: prismeFaces, [`${S}2`]: prismeSommets, [`${S}3`]: prismeLateral, [`${S}4`]: prismeAretes, [`${S}5`]: prismeNbLat, [`${S}6`]: prismeBase, [`${S}7`]: prismeCtx, [`${S}8`]: prismeNbLat, [`${S}9`]: prismePatron, [`${S}10`]: prismeInverse,
  [`${G}1`]: courbeValeur, [`${G}2`]: courbeMax, [`${G}3`]: courbeMin, [`${G}4`]: courbeSens, [`${G}5`]: courbeEcart, [`${G}6`]: courbeQuand, [`${G}7`]: courbeValeur, [`${G}8`]: courbeAmplitude, [`${G}9`]: courbeHausse, [`${G}10`]: courbeSeuil,
  [`${N}1`]: notSommet, [`${N}2`]: notCotes, [`${N}3`]: notFigure, [`${N}4`]: notTriangle, [`${N}5`]: notMeme, [`${N}6`]: notRayons, [`${N}7`]: notEn, [`${N}8`]: notVise, [`${N}9`]: notQuad, [`${N}10`]: notCorrige,
  [`${C}1`]: cmpGrand, [`${C}2`]: cmpPetit, [`${C}3`]: cmpEcriture, [`${C}4`]: cmpLequel, [`${C}5`]: cmpCotes, [`${C}6`]: cmpDroit, [`${C}7`]: cmpCtx, [`${C}8`]: cmpCalque, [`${C}9`]: cmpRanger, [`${C}10`]: cmpPose,
  [`${U}1`]: nuageH, [`${U}2`]: nuageV, [`${U}3`]: nuageHaut, [`${U}4`]: nuageDroite, [`${U}5`]: nuageCoord, [`${U}6`]: nuageAuDessus, [`${U}7`]: nuageCtxLire, [`${U}8`]: nuageCtxMax, [`${U}9`]: nuageSens, [`${U}10`]: nuageDouble,
});
void valeur;
