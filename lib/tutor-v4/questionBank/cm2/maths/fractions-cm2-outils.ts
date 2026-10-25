// ─── Outils partagés des fractions de CM2 (calcul + écriture mixte) ────────────
//
// ⭐ 25/10/2026 — VARIER LA PHRASE, PAS SEULEMENT LES NOMBRES. Mesuré le 25/10
// (scripts/mesurer-squelettes-coach.ts) : 3 à 5 squelettes d'énoncés par micro,
// 17 à 19 phrases déjà vues sur 20. Chaque gabarit tire désormais un PRÉNOM ×
// une SITUATION × une TOURNURE, et ses leurres sont les erreurs que Frédéric
// voit sur les copies : additionner les dénominateurs (1/4 + 2/4 = 3/8),
// multiplier aussi le dénominateur (3 × 2/5 = 6/15), lire 7/4 « entre 7 et 8 »,
// ne pas simplifier, se tromper en passant au décimal ou au pourcentage.
//
// ⛔ Ces outils vivent ici, et non dans fractions.bank.ts : ce fichier-là est
// travaillé par une autre session.
//
// ⛔ UN QCM NE MONTRE JAMAIS DEUX CHOIX DE MÊME VALEUR (qcm-corriges-au-texte-exact) :
// `choix()` lit la valeur de chaque proposition (2/4 = 1/2 = 0,5) et écarte un
// leurre qui vaudrait la bonne réponse ou un autre leurre.

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

export type Prenom = { p: string; f: boolean };
export const PRENOMS: Prenom[] = [
  { p: "Inès", f: true }, { p: "Tom", f: false }, { p: "Léa", f: true }, { p: "Yanis", f: false },
  { p: "Chloé", f: true }, { p: "Mamadou", f: false }, { p: "Sofia", f: true }, { p: "Lucas", f: false },
  { p: "Aïcha", f: true }, { p: "Noah", f: false }, { p: "Jade", f: true }, { p: "Karim", f: false },
  { p: "Maëlys", f: true }, { p: "Théo", f: false }, { p: "Zoé", f: true }, { p: "Adam", f: false },
  { p: "Lina", f: true }, { p: "Nathan", f: false }, { p: "Fatou", f: true }, { p: "Enzo", f: false },
  { p: "Mei", f: true }, { p: "Rayan", f: false }, { p: "Manon", f: true }, { p: "Hugo", f: false },
  { p: "Nour", f: true }, { p: "Malik", f: false }, { p: "Louise", f: true }, { p: "Ibrahim", f: false },
];

export function tirer<T>(t: readonly T[]): T {
  return t[Math.floor(Math.random() * t.length)];
}
export function entre(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function melanger<T>(t: readonly T[]): T[] {
  return [...t].sort(() => Math.random() - 0.5);
}
export function deuxPrenoms(): [Prenom, Prenom] {
  const a = tirer(PRENOMS);
  let b = tirer(PRENOMS);
  while (b.p === a.p) b = tirer(PRENOMS);
  return [a, b];
}
export const il = (x: Prenom) => (x.f ? "elle" : "il");
export const Il = (x: Prenom) => (x.f ? "Elle" : "Il");
/** « de Tom », « d’Inès ». */
export const deP = (x: Prenom) => (/^[AEIOUÉÈÊÂÎÔ]/.test(x.p) ? `d’${x.p}` : `de ${x.p}`);
/** « à Tom », « à Inès ». */
export const aP = (x: Prenom) => `à ${x.p}`;

export function pgcd(a: number, b: number): number {
  return b ? pgcd(b, a % b) : Math.abs(a);
}
/** 6/8 → « 3/4 » ; 8/4 → « 2 ». */
export function simplifiee(n: number, d: number): string {
  const g = pgcd(n, d);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
}

const NOMS: Record<number, [string, string]> = {
  2: ["demi", "demis"], 3: ["tiers", "tiers"], 4: ["quart", "quarts"], 5: ["cinquième", "cinquièmes"],
  6: ["sixième", "sixièmes"], 7: ["septième", "septièmes"], 8: ["huitième", "huitièmes"],
  9: ["neuvième", "neuvièmes"], 10: ["dixième", "dixièmes"], 12: ["douzième", "douzièmes"],
  100: ["centième", "centièmes"],
};
/** « quarts », « tiers ». */
export const parts = (d: number) => NOMS[d]?.[1] ?? `${d}e`;
/** « 3 huitièmes », « 1 quart », « 1 tiers ». */
export const enParts = (n: number, d: number) => `${n} ${n > 1 ? NOMS[d]?.[1] : NOMS[d]?.[0]}`;

/** Valeur d'une proposition : « 3/4 », « 2 + 1/4 », « 0,75 », « 75 % », « 12 kg ». Sinon null. */
export function valeurDe(s: string): number | null {
  const t = s.trim();
  let m = t.match(/^(\d+) \+ (\d+)\/(\d+)$/);
  if (m) return Number(m[1]) + Number(m[2]) / Number(m[3]);
  // Une unité peut suivre (« 3/4 L », « 12 kg », « 75 % »), jamais un autre nombre.
  m = t.match(/^(\d+)\/(\d+)(?:\s+[^\d]*)?$/);
  if (m) return Number(m[1]) / Number(m[2]);
  m = t.match(/^(\d+(?:,\d+)?)(?:\s*[^\d\s,][^\d]*)?$/);
  if (m) return Number(m[1].replace(",", "."));
  return null;
}
const memeValeur = (a: number | null, b: number | null) => a !== null && b !== null && Math.abs(a - b) < 1e-9;

/** Bonne réponse + jusqu'à 3 leurres DISTINCTS, de valeurs différentes. */
export function choix(bonne: string, leurres: readonly string[]): string[] {
  const vus: { s: string; v: number | null }[] = [{ s: bonne, v: valeurDe(bonne) }];
  for (const l of melanger(leurres)) {
    if (vus.length >= 4) break;
    const s = l.trim();
    const v = valeurDe(s);
    if (!s || vus.some((x) => x.s === s || memeValeur(x.v, v))) continue;
    // Pas de nombre négatif, pas de « 0 + 1/2 » : ce ne sont pas des erreurs d'élève.
    if (/^[−-]/.test(s) || /^0 \+ /.test(s)) continue;
    // Un leurre nul (« 0/8 ») ou une division par zéro ne trompe personne.
    if (v !== null && (v <= 0 || !Number.isFinite(v))) continue;
    if (/\/0(\D|$)/.test(s)) continue;
    vus.push({ s, v });
  }
  return melanger(vus.map((x) => x.s));
}

/** Écrit un décimal à la française : 0.75 → « 0,75 ». */
export const dec = (x: number) => String(Number(x.toFixed(4))).replace(".", ",");

export function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

/**
 * Une consigne de calcul nu, avec un prénom : 14 tournures. `c` est le calcul
 * affiché (« 3/8 + 2/8 »). Le calcul reste écrit en entier dans chaque phrase.
 */
export function tournureCalcul(x: Prenom, y: Prenom, c: string): string {
  const t = [
    `Calcule : ${c}.`,
    `${x.p} doit calculer ${c}. Quel résultat trouve-t-${il(x)} ?`,
    `Aide ${x.p} : combien fait ${c} ?`,
    `Sur son cahier, ${x.p} écrit ${c} = … Que doit-${il(x)} écrire à la place des points ?`,
    `Au tableau, la maîtresse écrit ${c}. ${x.p} lève la main. Quelle est la bonne réponse ?`,
    `${x.p} vérifie le calcul ${c} fait par ${y.p}. Quel est le bon résultat ?`,
    `Dans son exercice de fractions, ${x.p} tombe sur ${c}. Que vaut ce calcul ?`,
    `${y.p} pose une devinette à ${x.p} : « Combien font ${c} ? » Que doit répondre ${x.p} ?`,
    `Pendant le calcul mental, le maître dicte : ${c}. Qu'écrit ${x.p} sur son ardoise ?`,
    `${x.p} et ${y.p} ne trouvent pas le même résultat pour ${c}. Quel est le bon ?`,
    `Quel est le résultat de ${c} ?`,
    `Trouve la valeur de ${c}, comme ${x.p} au tableau.`,
    `${x.p} corrige son devoir. Le calcul était ${c}. Quelle réponse était juste ?`,
    `Le défi du jour de ${x.p} : ${c}. Quel résultat faut-il trouver ?`,
  ];
  return tirer(t);
}

/** Un gabarit de la banque : l'en-tête commun, le générateur à part. */
export function fabriqueGabarit(notionId: string) {
  return (
    id: string,
    microId: string,
    difficulty: 1 | 2 | 3 | 4,
    hint: string,
    generate: () => TutorGeneratedQuestionV4
  ): TutorBankItemV4 => ({
    kind: "template",
    id,
    niveau: "cm2",
    matiere: "maths",
    notionId,
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: [notionId, microId, "template"],
    generate,
  });
}
