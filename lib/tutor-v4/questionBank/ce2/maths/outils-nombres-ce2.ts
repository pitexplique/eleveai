// lib/tutor-v4/questionBank/ce2/maths/outils-nombres-ce2.ts
//
// Les outils de rédaction des gabarits « nombres » du CE2 : entiers jusqu'à
// 10 000, suites, monnaie (avec les centimes), fractions (10/11/2026).
//
// ⛔ POURQUOI CE FICHIER (10/11/2026). Mesurées avec
// scripts/mesurer-squelettes-coach.ts, 25 des 26 micros de ces quatre notions
// tenaient sur 2 à 39 squelettes, et un élève revoyait 13 à 19 fois la même
// PHRASE sur une série de 20. Chaque micro a désormais UN générateur par étoile
// qui tire une FAMILLE (prendre la question par un autre bout), une SITUATION
// (mondes d'enfant de 8 ans) et une TOURNURE. Les items figés d'avant sont
// devenus des gabarits de même idée, sous le même id.
//
// Ce n'est PAS une banque : aucun item ici, seulement des fonctions.

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

export type Q = TutorGeneratedQuestionV4;
export type Etoile = 1 | 2 | 3 | 4 | 5;

export function rint(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Tire une famille de questions, puis la question elle-même. */
export const tirer = (familles: readonly (() => Q)[]): Q => pick(familles)();

/**
 * La bonne réponse mise de côté, trois pièges DISTINCTS d'elle et entre eux,
 * puis mélangés : la bonne réponse tombe à une place au hasard. Les pièges
 * vides ou négatifs sont écartés.
 */
/** ⛔ 14/11/2026 — la VALEUR d'un choix : « 2,1 € » et « 2,10 € », « 280 € » et
 *  « 280,00 € », « 5/10 » et « 4/8 » sont le même choix. Sans ce tri, un piège
 *  pouvait valoir la bonne réponse (deux réponses justes) ou doubler un autre piège. */
export function valeurDuChoix(s: string): string {
  const t = s.trim().replace(/\s+/g, " ");
  const f = /^(\d+)\/(\d+)\s*(.*)$/.exec(t);
  if (f && Number(f[2]) !== 0 && !/\d/.test(f[3])) return `${(Number(f[1]) / Number(f[2])).toFixed(6)}|${f[3]}`;
  const d = /^(\d+(?:[.,]\d+)?)\s*(.*)$/.exec(t);
  if (d && !/\d/.test(d[2])) return `${Number(d[1].replace(",", ".")).toFixed(6)}|${d[2]}`;
  return t;
}
/** Les pièges distincts par leur valeur, et différents de la bonne réponse. */
export function piegesDistincts(correct: string, pieges: readonly string[]): string[] {
  const vus = new Set([valeurDuChoix(correct)]);
  const out: string[] = [];
  for (const p of pieges) {
    if (!p || !p.trim()) continue;
    const v = valeurDuChoix(p);
    if (vus.has(v)) continue;
    vus.add(v);
    out.push(p);
  }
  return out;
}

export function choix(correct: string, pieges: readonly string[], combien = 3): string[] {
  const propres = piegesDistincts(correct, pieges).filter((p) => !/^[-−]/.test(p));
  return shuffle([correct, ...shuffle(propres).slice(0, combien)]);
}

export function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** 4007 → « 4 007 » (espace fine insécable, comme toLocaleString fr-FR). */
export const fmt = (n: number) => n.toLocaleString("fr-FR");

/** « 1 morceau », « 3 morceaux ». */
export const pl = (n: number, sg: string, plu: string) => `${n} ${n === 1 ? sg : plu}`;

/** « de farine », « d'eau ». */
export const de = (mot: string) => (/^[aeiouyàâéèêëîïôœh]/i.test(mot) ? `d'${mot}` : `de ${mot}`);

/* =========================================================
   LA TROUPE ET LES PRÉNOMS
   Nina, Téo, Zoé, Ravi et Pic le paille-en-queue sont les
   personnages du site ; les autres prénoms varient.
========================================================= */

export type Prenom = { nom: string; il: "il" | "elle" };

export const PRENOMS: readonly Prenom[] = [
  { nom: "Nina", il: "elle" },
  { nom: "Téo", il: "il" },
  { nom: "Zoé", il: "elle" },
  { nom: "Ravi", il: "il" },
  { nom: "Nina", il: "elle" },
  { nom: "Téo", il: "il" },
  { nom: "Zoé", il: "elle" },
  { nom: "Ravi", il: "il" },
  { nom: "Lou", il: "elle" },
  { nom: "Malo", il: "il" },
  { nom: "Inès", il: "elle" },
  { nom: "Sacha", il: "il" },
  { nom: "Amir", il: "il" },
  { nom: "Jade", il: "elle" },
  { nom: "Naïa", il: "elle" },
  { nom: "Tom", il: "il" },
  { nom: "Lina", il: "elle" },
  { nom: "Yanis", il: "il" },
  { nom: "Maya", il: "elle" },
  { nom: "Léon", il: "il" },
];

export const quelquun = () => pick(PRENOMS);

export function deuxPersonnes(): [Prenom, Prenom] {
  const p = quelquun();
  let q = quelquun();
  while (q.nom === p.nom) q = quelquun();
  return [p, q];
}

/** « elles » si les deux sont des filles, « ils » sinon. */
export const ils = (p: Prenom, q: Prenom) => (p.il === "elle" && q.il === "elle" ? "elles" : "ils");

export function troisPersonnes(): [Prenom, Prenom, Prenom] {
  const [p, q] = deuxPersonnes();
  let r = quelquun();
  while (r.nom === p.nom || r.nom === q.nom) r = quelquun();
  return [p, q, r];
}

/* =========================================================
   LE GABARIT
========================================================= */

type Base = {
  id: string;
  notionId: string;
  microId: string;
  difficulty: Etoile;
  hint: string;
  tags: string[];
};

export function gabarit(base: Base, generate: () => Q): TutorBankItemV4 {
  return {
    kind: "template",
    niveau: "ce2",
    matiere: "maths",
    theme: "neutral",
    ...base,
    tags: ["ce2", base.notionId, ...base.tags, "template"],
    generate,
  };
}
