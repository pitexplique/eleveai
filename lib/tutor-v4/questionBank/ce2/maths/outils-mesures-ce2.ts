// lib/tutor-v4/questionBank/ce2/maths/outils-mesures-ce2.ts
//
// Les outils de rédaction des gabarits « grandeurs et mesures » du CE2 :
// durées, longueurs, masses, contenances, et des données (10/11/2026).
//
// ⛔ POURQUOI CE FICHIER (10/11/2026). Mesurés avec
// scripts/mesurer-squelettes-coach.ts, les 34 micros de ces cinq notions
// tenaient sur 3 à 28 squelettes, et un élève revoyait 10 à 19 fois la même
// PHRASE sur une série de 20. Chaque gabarit tire désormais une FAMILLE de
// questions (prendre la question par un autre bout), une SITUATION (des mondes
// d'enfant de 8 ans : goûter, cirque, pirates, potager, piscine, fusée…) et
// une TOURNURE. Ces fonctions évitent de recopier dix fois les mêmes aides.
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
 * vides ou négatifs (« -5 cm ») sont écartés.
 */
export function choix(correct: string, pieges: readonly string[]): string[] {
  const propres = Array.from(new Set(pieges)).filter(
    (p) => p && p !== correct && !/^-|\s-\d/.test(p) && !/^0 /.test(p) && !/(^|\s)0 (h|min|cm|m|g|kg|L|cL|dL|mm|km|t)\b/.test(p),
  );
  return shuffle([correct, ...shuffle(propres).slice(0, 3)]);
}

/** Pièges numériques plausibles autour d'une valeur (±1, ±10, ×2, ÷2…). */
export function piegesNombre(n: number, extra: readonly number[] = []): number[] {
  const base = [...extra, n + 1, n - 1, n + 10, n - 10, n * 2, n + 5, n - 5];
  return Array.from(new Set(base)).filter((v) => v > 0 && v !== n && Number.isInteger(v));
}

/** Les choix d'une réponse numérique avec unité : « 12 cm », « 3 kg ». */
export function choixNombre(n: number, unite: string, extra: readonly number[] = []): string[] {
  const u = unite ? ` ${unite}` : "";
  return choix(`${n}${u}`, piegesNombre(n, extra).map((v) => `${v}${u}`));
}

export function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** 1000 → « 1000 » (pas d'espace : les réponses courtes restent comparables). */
export const nb = (n: number) => String(n);

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

export function troisPersonnes(): [Prenom, Prenom, Prenom] {
  const [p, q] = deuxPersonnes();
  let r = quelquun();
  while (r.nom === p.nom || r.nom === q.nom) r = quelquun();
  return [p, q, r];
}

/** Les quatre enfants dessinés de la troupe (canvas `personnage`). */
export const TROUPE = [
  { id: "nina", nom: "Nina" },
  { id: "teo", nom: "Téo" },
  { id: "zoe", nom: "Zoé" },
  { id: "ravi", nom: "Ravi" },
] as const;

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

/** « de Inès » → « d'Inès » : les prénoms tirés au hasard ne savent pas s'élider. */
const elider = (t: string) => t.normalize("NFC").replace(/(?<![\p{L}'])(de|que|le|la) (Inès|Amir)(?![\p{L}])/gu, (_m, mot: string, nom: string) => `${mot === "que" ? "qu'" : mot === "de" ? "d'" : "l'"}${nom}`);

export function gabarit(base: Base, generate: () => Q): TutorBankItemV4 {
  return {
    kind: "template",
    niveau: "ce2",
    matiere: "maths",
    theme: "neutral",
    ...base,
    tags: ["ce2", base.notionId, ...base.tags, "template"],
    generate: () => {
      const q = generate();
      return {
        ...q,
        text: elider(q.text),
        choices: q.choices?.map(elider),
        expected: q.expected.map(elider),
        explanation: q.explanation ? elider(q.explanation) : q.explanation,
      };
    },
  };
}
