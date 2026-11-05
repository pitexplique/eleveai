import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { ConstructionCanvasData } from "@/lib/tutor-v4/types_canvas";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { airesDe, longueursDe, reponseLongueur, reponseQcm } from "@/lib/tutor-v4/questionBank/outils-geometrie";

// LES CORRECTEURS DE relations-metriques.bank.ts (05/11/2026) : ils relisent les noms et les
// longueurs dans le TEXTE (ou sur la figure), et refont le calcul. Ils vérifient aussi que
// le triangle est vraiment rectangle et que H est bien sur l'hypoténuse. Vide = juste.

type Q = TutorGeneratedQuestionV4;

/** A (angle droit), B et C : lus dans « triangle ABC rectangle en A ». */
function noms(q: Q) {
  const m = q.text.match(/([A-Z])([A-Z])([A-Z]) (?:est )?un triangle rectangle en ([A-Z])|triangle ([A-Z])([A-Z])([A-Z]),? (?:est )?rectangle en ([A-Z])|triangle ([A-Z])([A-Z])([A-Z]), rectangle en ([A-Z])/);
  if (!m) return null;
  const g = m.slice(1).filter(Boolean);
  const [x, y, z, a] = g;
  const autres = [x, y, z].filter((v) => v !== a);
  return autres.length === 2 ? { a, b: autres[0], c: autres[1] } : null;
}

/** Longueur nommée : XY ou YX, « 4,8 cm » après un « = ». */
function lg(t: string, n1: string, n2: string): number | null {
  const m = t.match(new RegExp(`(?:\\b${n1}${n2}|\\b${n2}${n1}) = (\\d+(?:,\\d+)?)`));
  return m ? Number(m[1].replace(",", ".")) : null;
}

const unite = (q: Q) => longueursDe(q.text)[0]?.u ?? "";
const presque = (a: number, b: number) => Math.abs(a - b) < 1e-6;

const avec = (f: (n: { a: string; b: string; c: string }, u: string, q: Q) => string[]) => (q: Q) => {
  const n = noms(q);
  return n ? f(n, unite(q), q) : ["triangle illisible"];
};

function trouve(q: Q, vals: (number | null)[], f: (...v: number[]) => number, u: string) {
  return vals.every((v) => v !== null && !Number.isNaN(v)) ? reponseLongueur(q, f(...(vals as number[])), u) : ["longueurs illisibles"];
}

/** Sur la figure : les légendes des segments (a, b). */
function figureLongueurs(q: Q) {
  const c = q.canvas as ConstructionCanvasData;
  const lire = (x: string | undefined) => longueursDe(String(x ?? ""))[0];
  return { segs: (c?.segments ?? []).filter((s) => s.texte), lire };
}

function hauteurFigure(q: Q) {
  const c = q.canvas as ConstructionCanvasData;
  const { segs, lire } = figureLongueurs(q);
  // L'hypoténuse est la plus longue légende ; les deux autres sont les côtés de l'angle droit.
  const v = segs.map((s) => lire(s.texte));
  if (v.length !== 3 || v.some((x) => !x)) return ["longueurs absentes de la figure"];
  const l = v.map((x) => x!.v).sort((a, b) => a - b);
  const p = presque(l[0] * l[0] + l[1] * l[1], l[2] * l[2]) ? [] : ["le triangle de la figure n’est pas rectangle"];
  if (!c?.angles?.some((g) => g.droit)) p.push("l’angle droit n’est pas marqué");
  return [...p, ...reponseLongueur(q, (l[0] * l[1]) / l[2], v[0]!.u)];
}

/* relations produit */

const produitHauteur = avec(({ a, b, c }, u, q) => {
  const ab = lg(q.text, a, b);
  const ac = lg(q.text, a, c);
  const bc = lg(q.text, b, c);
  if (ab === null || ac === null || bc === null) return ["longueurs illisibles"];
  const p = presque(ab * ab + ac * ac, bc * bc) ? [] : ["le triangle n’est pas rectangle"];
  return [...p, ...reponseLongueur(q, (ab * ac) / bc, u)];
});

const egaliteProduit = avec(({ a, b, c }, _u, q) => reponseQcm(q, `${a}H × ${b}${c} = ${a}${b} × ${a}${c}`));

const calculProduit = avec(({ a, b, c }, _u, q) => {
  const ab = lg(q.text, a, b);
  const ac = lg(q.text, a, c);
  const bc = lg(q.text, b, c);
  return ab && ac && bc ? reponseQcm(q, `${ab} × ${ac} ÷ ${bc}`) : ["longueurs illisibles"];
});

const pythagorePuisHauteur = avec(({ a, b, c }, u, q) => trouve(q, [lg(q.text, a, b), lg(q.text, a, c)], (ab, ac) => (ab * ac) / Math.hypot(ab, ac), u));

const hypotenuseParHauteur = avec(({ a, b, c }, u, q) => trouve(q, [lg(q.text, a, b), lg(q.text, a, c), lg(q.text, a, "H")], (ab, ac, ah) => (ab * ac) / ah, u));

const coteParHauteur = avec(({ a, b, c }, u, q) => trouve(q, [lg(q.text, a, "H"), lg(q.text, b, c), lg(q.text, a, c)], (ah, bc, ac) => (ah * bc) / ac, u));

const hauteurParAire = avec(({ b, c }, u, q) => {
  const aire = airesDe(q.text)[0];
  const bc = lg(q.text, b, c);
  return aire && bc ? reponseLongueur(q, (2 * aire.v) / bc, u) : ["aire ou hypoténuse illisible"];
});

const situationTrois = (q: Q) => {
  const l = longueursDe(q.text);
  if (l.length !== 3) return ["trois longueurs attendues"];
  const [x, y, z] = l.map((m) => m.v);
  const p = presque(x * x + y * y, z * z) ? [] : ["le triangle n’est pas rectangle"];
  return [...p, ...reponseLongueur(q, (x * y) / z, l[0].u)];
};

const situationDeux = (q: Q) => {
  const l = longueursDe(q.text);
  return l.length === 2 ? reponseLongueur(q, (l[0].v * l[1].v) / Math.hypot(l[0].v, l[1].v), l[0].u) : ["deux longueurs attendues"];
};

const situationGrandCote = (q: Q) => {
  const l = longueursDe(q.text);
  return l.length === 3 ? reponseLongueur(q, (l[0].v * l[1].v) / l[2].v, l[0].u) : ["trois longueurs attendues"];
};

/* relations carré */

const hauteurParMorceaux = avec(({ a, b, c }, u, q) => trouve(q, [lg(q.text, "H", b), lg(q.text, "H", c)], (x, y) => Math.sqrt(x * y), u));

const coteParProjection = avec(({ a, b, c }, u, q) => trouve(q, [lg(q.text, b, "H"), lg(q.text, b, c)], (x, y) => Math.sqrt(x * y), u));

const egaliteCarre = avec(({ a, b, c }, _u, q) => {
  const justes = [`${a}H² = H${b} × H${c}`, `${a}${b}² = ${b}H × ${b}${c}`, `${a}${c}² = ${c}H × ${c}${b}`];
  const j = (q.choices ?? []).filter((x) => justes.includes(x));
  return j.length === 1 ? reponseQcm(q, j[0]) : [`${j.length} égalités justes parmi les choix`];
});

const carreHauteur = avec(({ b, c }, u, q) => trouve(q, [lg(q.text, "H", b), lg(q.text, "H", c)], (x, y) => x * y, `${u}²`));

const morceauDepuisHauteur = avec(({ a, b }, u, q) => trouve(q, [lg(q.text, a, "H"), lg(q.text, "H", b)], (h, x) => (h * h) / x, u));

const hypotenuseParProjection = avec(({ a, b }, u, q) => trouve(q, [lg(q.text, a, b), lg(q.text, b, "H")], (x, y) => (x * x) / y, u));

const projectionDepuisCote = avec(({ a, b, c }, u, q) => trouve(q, [lg(q.text, a, b), lg(q.text, b, c)], (x, y) => (x * x) / y, u));

const hauteurArrondie = avec(({ b, c }, u, q) => trouve(q, [lg(q.text, "H", b), lg(q.text, "H", c)], (x, y) => Math.round(Math.sqrt(x * y) * 10) / 10, u));

const arche = (q: Q) => {
  const l = longueursDe(q.text);
  return l.length === 2 ? reponseLongueur(q, Math.sqrt(l[1].v * (l[0].v - l[1].v)), l[0].u) : ["diamètre ou position illisible"];
};

/** L'œil à e, le pied à d : la hauteur totale est e + d × d ÷ e. Le texte dit l'un puis l'autre. */
const visee = (q: Q) => {
  const e = Number(q.text.match(/(\d+(?:,\d+)?) m du sol/)?.[1].replace(",", "."));
  const d = Number(q.text.match(/(\d+) m du pied/)?.[1]);
  return e && d ? reponseLongueur(q, Math.round((e + (d * d) / e) * 10) / 10, "m") : ["hauteur de l’œil ou distance illisible"];
};

const pan = (q: Q) => {
  const l = longueursDe(q.text);
  return l.length === 2 ? reponseLongueur(q, Math.sqrt(l[0].v * l[1].v), l[0].u) : ["deux longueurs attendues"];
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  metrique_produit_tpl_1: produitHauteur,
  metrique_produit_tpl_2: egaliteProduit,
  metrique_produit_tpl_3: hauteurFigure,
  metrique_produit_tpl_4: calculProduit,
  metrique_produit_tpl_5: pythagorePuisHauteur,
  metrique_produit_tpl_6: hypotenuseParHauteur,
  metrique_produit_tpl_7: coteParHauteur,
  metrique_produit_tpl_8: hauteurParAire,
  metrique_produit_tpl_9: situationTrois,
  metrique_produit_tpl_10: situationDeux,
  metrique_produit_tpl_11: situationGrandCote,

  metrique_carre_tpl_1: hauteurParMorceaux,
  metrique_carre_tpl_2: coteParProjection,
  metrique_carre_tpl_3: egaliteCarre,
  metrique_carre_tpl_4: carreHauteur,
  metrique_carre_tpl_5: morceauDepuisHauteur,
  metrique_carre_tpl_6: hypotenuseParProjection,
  metrique_carre_tpl_7: projectionDepuisCote,
  metrique_carre_tpl_8: hauteurArrondie,
  metrique_carre_tpl_9: arche,
  metrique_carre_tpl_10: visee,
  metrique_carre_tpl_11: pan,
});
