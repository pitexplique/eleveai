// Outils communs aux renforts de la dérivation de 1re technologique (02/11/2026).
//
// Même modèle que terminale-spe/maths/convexite-renfort.ts : helpers n / fr /
// poly / qcm / court / expl, makeChoices de la 4e, courbes « fonctionGraphique ».
// En plus : un catalogue de SITUATIONS (métiers variés, La Réunion une fois sur
// 25 seulement) et un petit contrôle numérique, coupé en production, que le
// script de vérification allume pour tester la justesse des réponses.

import type { CanvasFigure, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { makeChoices } from "@/lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank";

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function rc<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function melange<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Arrondi propre (évite 0,30000000000000004). */
export function arr(x: number) {
  const r = Math.round(x * 1000) / 1000;
  return Object.is(r, -0) ? 0 : r;
}

/** Nombre en LaTeX : virgule décimale « {,} ». */
export function n(x: number) {
  return String(arr(x)).replace(".", "{,}");
}

/** Nombre pour une réponse tapée ou un texte hors LaTeX : virgule décimale. */
export function fr(x: number) {
  return String(arr(x)).replace(".", ",");
}

/** Nombre entre parenthèses s'il est négatif (pour un calcul écrit). */
export function par(x: number) {
  return x < 0 ? `(${n(x)})` : n(x);
}

export function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** « la masse » → « de la masse » ; « le prix » → « du prix » ; « l’altitude » → « de l’altitude ». */
export function de(gn: string) {
  if (/^le /.test(gn)) return `du ${gn.slice(3)}`;
  if (/^les /.test(gn)) return `des ${gn.slice(4)}`;
  if (/^(un|une) /.test(gn)) return `d’${gn}`;
  return `de ${gn}`;
}

/* ---------- Polynômes ---------- */

/** Liste de termes [coefficient, puissance], dans l'ordre d'affichage. */
export type Termes = Array<[number, number]>;
/** P[k] = coefficient de x^k. */
export type P = number[];

export function versP(t: Termes): P {
  const p: number[] = [];
  for (const [c, k] of t) {
    while (p.length <= k) p.push(0);
    p[k] += c;
  }
  return p.map(arr);
}

export function ev(p: P, x: number) {
  return p.reduce((s, c, k) => s + c * x ** k, 0);
}

export function der(p: P): P {
  return p.slice(1).map((c, k) => arr(c * (k + 1)));
}

export function cleP(p: P) {
  const q = p.map(arr);
  while (q.length && q[q.length - 1] === 0) q.pop();
  return q.join("|");
}

/** Termes d'un P, du degré le plus haut au plus bas. */
export function termesDe(p: P): Termes {
  const t: Termes = [];
  for (let k = p.length - 1; k >= 0; k--) if (arr(p[k]) !== 0) t.push([p[k], k]);
  return t;
}

/** Polynôme en LaTeX, termes dans l'ordre donné, termes nuls omis. */
export function poly(termes: Termes, v = "x") {
  let s = "";
  for (const [c0, p] of termes) {
    const c = arr(c0);
    if (c === 0) continue;
    const abs = Math.abs(c);
    const corps = p === 0 ? n(abs) : `${abs === 1 ? "" : n(abs)}${p === 1 ? v : `${v}^${p}`}`;
    if (!s) s = (c < 0 ? "-" : "") + corps;
    else s += (c < 0 ? " - " : " + ") + corps;
  }
  return s || "0";
}

/** P en LaTeX, degrés décroissants. */
export function tex(p: P, v = "x") {
  return poly(termesDe(p), v);
}

/** Facteur (x − r) : « x », « (x - 3) », « (x + 2) ». */
export function fx(r: number, v = "x") {
  if (r === 0) return v;
  return r > 0 ? `(${v} - ${n(r)})` : `(${v} + ${n(-r)})`;
}

/** Préfixe d'un produit : 1 → « », −1 → « - », k → « k ». */
export function pref(k: number) {
  return k === 1 ? "" : k === -1 ? "-" : n(k);
}

/* ---------- Intervalles ---------- */

const borne = (x: number) => (x === -Infinity ? "-\\infty" : x === Infinity ? "+\\infty" : n(x));
export function itv(a: number, b: number) {
  return `$${a === -Infinity ? "]" : "["}${borne(a)}\\,;${borne(b)}${b === Infinity ? "[" : "]"}$`;
}

/* ---------- Questions ---------- */

export function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul / Observation : ${calcul}\n\nConclusion : ${conclusion}`;
}

export function qcm(text: string, correct: string, pieges: string[], explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  return { text, format: "qcm", choices: makeChoices(correct, pieges), expected: [correct], comparator: "mcq_exact", explanation, ...(canvas ? { canvas } : {}) };
}

export function court(text: string, valeur: number, explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  return { text, format: "short", expected: [fr(valeur)], comparator: "number_equal", explanation, ...(canvas ? { canvas } : {}) };
}

/**
 * QCM dont les choix sont des polynômes : deux choix de même VALEUR sont
 * écartés (on compare les coefficients, pas l'écriture).
 */
export function qcmPoly(text: string, gauche: string, bon: Termes, pieges: Termes[], v: string, explanation: string, canvas?: CanvasFigure) {
  const rend = (t: Termes) => (gauche ? `$${gauche} = ${poly(t, v)}$` : `$${poly(t, v)}$`);
  const vues = new Set([cleP(versP(bon))]);
  const autres: string[] = [];
  for (const t of pieges) {
    const k = cleP(versP(t));
    if (vues.has(k)) continue;
    vues.add(k);
    autres.push(rend(t));
  }
  return qcm(text, rend(bon), autres, explanation, canvas);
}

/** QCM à réponses numériques : jamais deux choix de même valeur. */
export function qcmNombres(text: string, bon: number, pieges: number[], explanation: string, format: (x: number) => string = (x) => `$${n(x)}$`, canvas?: CanvasFigure) {
  const vues = new Set([arr(bon)]);
  const autres: string[] = [];
  for (const p of pieges) {
    if (!Number.isFinite(p) || vues.has(arr(p))) continue;
    vues.add(arr(p));
    autres.push(format(p));
  }
  return qcm(text, format(bon), autres, explanation, canvas);
}

export function vraiFaux(aff: string, vrai: boolean, explication: string) {
  if (randomInt(1, 2) === 1) return qcm(`Vrai ou faux ? ${aff}`, vrai ? "Vrai" : "Faux", [vrai ? "Faux" : "Vrai"], explication);
  return qcm(`Un camarade affirme : « ${aff} » A-t-il raison ?`, vrai ? "Oui" : "Non", [vrai ? "Non" : "Oui"], explication);
}

/* ---------- Contrôle numérique (coupé en production) ---------- */

export const controleDerivee = { actif: false, defauts: [] as string[] };

export function verif(ok: boolean, msg: string) {
  if (controleDerivee.actif && !ok) controleDerivee.defauts.push(msg);
}

export function dnum(f: (x: number) => number, x: number) {
  const h = 1e-5;
  return (f(x + h) - f(x - h)) / (2 * h);
}

export function proche(a: number, b: number, tol = 1e-3) {
  return Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
}

/** Vérifie que pp est bien la dérivée de p (différences finies). */
export function verifDer(p: P, pp: P, tag: string) {
  for (const x of [-2.3, 0.7, 1.9, 3.1]) verif(proche(dnum((t) => ev(p, t), x), ev(pp, x)), `${tag} : dérivée fausse`);
}

/* ---------- Courbes ---------- */

export const ROUGE = "#e11d48";
export const BLEU = "#0284c7";
export const VERT = "#059669";
export const VIOLET = "#7c3aed";

/** Points d'une courbe (type « points ») ; le rendu ignore ce qui sort du cadre. */
export function echantillon(f: (x: number) => number, xmin: number, xmax: number, nb = 60) {
  const points: { x: number; y: number }[] = [];
  const pas = (xmax - xmin) / nb;
  for (let i = 0; i <= nb; i++) {
    const x = arr(xmin + i * pas);
    const y = f(x);
    if (Number.isFinite(y)) points.push({ x, y: arr(y) });
  }
  return points;
}

type Courbe = NonNullable<Extract<CanvasFigure, { kind: "fonctionGraphique" }>["courbes"]>[number];
type PointFig = NonNullable<Extract<CanvasFigure, { kind: "fonctionGraphique" }>["points"]>[number];

export function figure(titre: string, xmin: number, xmax: number, ymin: number, ymax: number, courbes: Courbe[], points: PointFig[] = []): CanvasFigure {
  return { kind: "fonctionGraphique", titre, xmin, xmax, ymin, ymax, grille: true, courbes, ...(points.length ? { points } : {}) } as CanvasFigure;
}

export const courbePoints = (f: (x: number) => number, xmin: number, xmax: number, couleur = ROUGE, id = "f"): Courbe => ({ id, type: "points", couleur, points: echantillon(f, xmin, xmax) });
export const droite = (a: number, b: number, couleur = BLEU, id = "t"): Courbe => ({ id, type: "affine", a, b, couleur });
export const parabole = (a: number, b: number, c: number, couleur = ROUGE, id = "f"): Courbe => ({ id, type: "quadratique", a, b, c, couleur });

/**
 * Courbe + tangente en A(x0 ; y0) de pente m, dans un cadre CARRÉ centré sur A
 * (demi-côté |m| + 2 au moins : on peut avancer de 1 et lire la montée).
 */
export function figTangente(titre: string, courbe: Courbe, x0: number, y0: number, m: number, extra: PointFig[] = []): CanvasFigure {
  const demi = Math.max(3, Math.ceil(Math.abs(m)) + 2);
  return figure(titre, x0 - demi, x0 + demi, y0 - demi, y0 + demi, [courbe, droite(m, y0 - m * x0)], [{ x: x0, y: y0, label: "A" }, ...extra]);
}

/* ---------- Gabarits ---------- */

export type Ligne = [notionId: string, microId: string, difficulty: number, generate: () => TutorGeneratedQuestionV4, hint: string];

export function construire(prefixe: string, lignes: Ligne[], tags: string[]): TutorBankItemV4[] {
  const rangs = new Map<string, number>();
  return lignes.map(([notionId, microId, difficulty, generate, hint]) => {
    const cle = `${notionId}_${microId}_${difficulty}`;
    const r = (rangs.get(cle) ?? 0) + 1;
    rangs.set(cle, r);
    return {
      kind: "template",
      id: `${prefixe}_${notionId === "der_graphique" && microId === "der_nombre_derive_sens" ? "graphique_" : ""}${microId}_${difficulty}_${r}`,
      niveau: "premiere",
      matiere: "maths",
      notionId,
      microId,
      difficulty,
      theme: "neutral",
      hint,
      tags: ["premiere", "maths", "derivation", "renfort", "template", ...tags],
      generate,
    } as TutorBankItemV4;
  });
}

/* ---------- Situations (les maths sont transversales) ---------- */

export type Situation = {
  qui: string; // métier
  quoi: string; // grandeur, avec son article
  g: string; // nom de la fonction
  v: string; // variable
  uv: string; // unité de la variable (pluriel)
  ug: string; // unité de la grandeur
  vit: string; // unité de la vitesse de variation
  fem: boolean; // la grandeur est-elle féminine ?
};

// 25 situations, une seule à La Réunion (≈ 4 %).
export const SITUATIONS: Situation[] = [
  { qui: "Une infirmière", quoi: "la concentration d’un médicament dans le sang", g: "C", v: "t", uv: "heures", ug: "mg/L", vit: "mg/L par heure", fem: true },
  { qui: "Un technicien de laboratoire", quoi: "la masse d’une culture de levures", g: "m", v: "t", uv: "heures", ug: "grammes", vit: "grammes par heure", fem: true },
  { qui: "Une ingénieure en électronique", quoi: "la charge d’une batterie", g: "Q", v: "t", uv: "minutes", ug: "%", vit: "% par minute", fem: true },
  { qui: "Un météorologue", quoi: "la température de l’air", g: "T", v: "t", uv: "heures", ug: "°C", vit: "°C par heure", fem: true },
  { qui: "Une logisticienne", quoi: "le nombre de colis en stock dans un entrepôt", g: "N", v: "t", uv: "jours", ug: "colis", vit: "colis par jour", fem: false },
  { qui: "Un économiste", quoi: "le prix d’un kilo de café", g: "P", v: "t", uv: "mois", ug: "euros", vit: "euros par mois", fem: false },
  { qui: "Une préparatrice physique", quoi: "la distance parcourue par une coureuse", g: "d", v: "t", uv: "secondes", ug: "mètres", vit: "mètres par seconde", fem: true },
  { qui: "Un hydrologue", quoi: "le volume d’eau dans un barrage", g: "V", v: "t", uv: "jours", ug: "millions de m³", vit: "millions de m³ par jour", fem: false },
  { qui: "Une diététicienne", quoi: "la masse d’un patient suivi en nutrition", g: "m", v: "t", uv: "semaines", ug: "kg", vit: "kg par semaine", fem: true },
  { qui: "Un agronome", quoi: "la hauteur d’un plant de maïs", g: "h", v: "t", uv: "jours", ug: "cm", vit: "cm par jour", fem: true },
  { qui: "Une épidémiologiste", quoi: "le nombre de malades de la grippe dans une ville", g: "N", v: "t", uv: "jours", ug: "malades", vit: "malades par jour", fem: false },
  { qui: "Un responsable marketing", quoi: "le nombre d’abonnés d’une application", g: "A", v: "t", uv: "semaines", ug: "abonnés", vit: "abonnés par semaine", fem: false },
  { qui: "Une pilote de drone", quoi: "l’altitude d’un drone", g: "z", v: "t", uv: "secondes", ug: "mètres", vit: "mètres par seconde", fem: true },
  { qui: "Un chimiste", quoi: "la quantité de produit formé dans une réaction", g: "q", v: "t", uv: "minutes", ug: "millimoles", vit: "millimoles par minute", fem: true },
  { qui: "Un chauffeur routier", quoi: "le volume de gazole dans le réservoir de son camion", g: "V", v: "t", uv: "heures", ug: "litres", vit: "litres par heure", fem: false },
  { qui: "Une biologiste", quoi: "la population de truites d’un lac", g: "P", v: "t", uv: "années", ug: "centaines de truites", vit: "centaines de truites par an", fem: true },
  { qui: "Un technicien en énergie solaire", quoi: "la puissance produite par des panneaux solaires", g: "P", v: "t", uv: "heures", ug: "kW", vit: "kW par heure", fem: true },
  { qui: "Un kinésithérapeute", quoi: "l’angle de flexion du genou d’un patient en rééducation", g: "A", v: "t", uv: "semaines", ug: "degrés", vit: "degrés par semaine", fem: false },
  { qui: "Une conseillère bancaire", quoi: "le capital placé sur un compte", g: "C", v: "t", uv: "années", ug: "euros", vit: "euros par an", fem: false },
  { qui: "Un technicien de piscine", quoi: "la quantité de chlore dans un bassin", g: "Q", v: "t", uv: "heures", ug: "grammes", vit: "grammes par heure", fem: true },
  { qui: "Une sage-femme", quoi: "la masse d’un nouveau-né", g: "m", v: "t", uv: "jours", ug: "grammes", vit: "grammes par jour", fem: true },
  { qui: "Un pisteur de station de ski", quoi: "l’épaisseur de neige sur une piste", g: "e", v: "t", uv: "jours", ug: "cm", vit: "cm par jour", fem: true },
  { qui: "Une régisseuse de spectacle", quoi: "le nombre de spectateurs entrés dans une salle de concert", g: "S", v: "t", uv: "minutes", ug: "spectateurs", vit: "spectateurs par minute", fem: false },
  { qui: "Un technicien de maintenance", quoi: "la température d’un moteur électrique", g: "T", v: "t", uv: "minutes", ug: "°C", vit: "°C par minute", fem: true },
  { qui: "Une hydrologue de La Réunion", quoi: "le débit de la rivière des Marsouins après une forte pluie", g: "D", v: "t", uv: "heures", ug: "m³/s", vit: "m³/s par heure", fem: false },
];

export function monte(s: Situation) {
  return `${cap(s.quoi)} augmente`;
}
export function baisse(s: Situation) {
  return `${cap(s.quoi)} diminue`;
}
export function stable(s: Situation) {
  return `${cap(s.quoi)} ne varie pas à cet instant`;
}

export type Produit = { ent: string; uq: string; ue: string };

export const PRODUITS: Produit[] = [
  { ent: "une fabrique de vélos électriques", uq: "dizaines de vélos", ue: "milliers d’euros" },
  { ent: "un atelier d’impression 3D", uq: "centaines de pièces", ue: "milliers d’euros" },
  { ent: "une coopérative de jus de fruits", uq: "milliers de litres", ue: "milliers d’euros" },
  { ent: "une usine de panneaux solaires", uq: "centaines de panneaux", ue: "milliers d’euros" },
  { ent: "une boulangerie industrielle", uq: "milliers de baguettes", ue: "centaines d’euros" },
  { ent: "une entreprise de textile", uq: "centaines de tee-shirts", ue: "milliers d’euros" },
  { ent: "un fabricant de trottinettes", uq: "dizaines de trottinettes", ue: "milliers d’euros" },
  { ent: "un laboratoire pharmaceutique", uq: "milliers de boîtes", ue: "milliers d’euros" },
  { ent: "une start-up de casques audio", uq: "centaines de casques", ue: "milliers d’euros" },
  { ent: "une scierie", uq: "dizaines de m³ de planches", ue: "milliers d’euros" },
  { ent: "une brasserie de kombucha", uq: "milliers de bouteilles", ue: "milliers d’euros" },
  { ent: "un atelier de meubles en bois", uq: "dizaines de meubles", ue: "milliers d’euros" },
];

export const GESTION = ["La gestionnaire", "Le contrôleur de gestion", "La directrice financière", "Le comptable", "La cheffe de production"];
