// Les pays proposés par le sélecteur du coach. Sans import serveur :
// utilisable côté client.

import { PROGRAMMES_PAYS } from "./index";
import type { ProgrammePays } from "./types";

export type SlugPays = ProgrammePays["pays"];

export type InfoPays = { slug: SlugPays; nom: string; drapeau: string };

/**
 * Madagascar attend sa réforme 2026-2027 : pas proposé tant qu'il n'a pas de matrice.
 * ⛔ 24/10/2026 — Frédéric : « USA enlève », « Ontario enlève ». Leurs matrices
 * restent dans lib/programmes-pays, mais ils ne sont plus proposés. Ses pays :
 * France, Suisse romande, Belgique, Maroc, Québec, Côte d'Ivoire.
 */
export const PAYS: InfoPays[] = [
  { slug: "quebec", nom: "Québec (Canada)", drapeau: "🇨🇦" },
  { slug: "maroc", nom: "Maroc", drapeau: "🇲🇦" },
];

/** Une classe du pays dans la colonne de gauche du coach. */
export type ClassePays = { cle: string; court: string };

/**
 * Les classes de chaque pays, groupées comme la colonne du coach France
 * (« Primaire », « Collège »…). Une classe sans matrice s'affiche grisée.
 */
export const CLASSES_PAYS: Record<SlugPays, { titre: string; classes: ClassePays[] }[]> = {
  ontario: [
    {
      titre: "Élémentaire",
      classes: ["1re", "2e", "3e", "4e", "5e", "6e", "7e", "8e"].map((c) => ({ cle: c, court: c })),
    },
    { titre: "Secondaire", classes: ["9e", "10e", "11e", "12e"].map((c) => ({ cle: c, court: c })) },
  ],
  // Québec (22/10, à remplir) : primaire en 3 cycles de 2 ans, secondaire 1 à 5
  // (16-17 ans), puis le cégep — pas de Terminale. Programme : PFEQ.
  quebec: [
    { titre: "Primaire", classes: [1, 2, 3, 4, 5, 6].map((n) => ({ cle: `${n}e-annee`, court: `${n}${n === 1 ? "re" : "e"}` })) },
    { titre: "Secondaire", classes: [1, 2, 3, 4, 5].map((n) => ({ cle: `sec-${n}`, court: `Sec ${n}` })) },
  ],
  maroc: [
    { titre: "Primaire", classes: [1, 2, 3, 4, 5, 6].map((n) => ({ cle: `${n}aep`, court: `${n}AEP` })) },
    { titre: "Collège", classes: [1, 2, 3].map((n) => ({ cle: `${n}ac`, court: `${n}AC` })) },
    {
      titre: "Lycée",
      classes: [
        { cle: "tc", court: "TC" },
        { cle: "1bac", court: "1re Bac" },
        { cle: "2bac", court: "2e Bac" },
      ],
    },
  ],
  // ⭐ Le découpage d'IXL, la référence de Frédéric pour les États-Unis (22/10) :
  // des grades jusqu'au 8, puis le lycée par COURS, pas par année.
  "etats-unis": [
    {
      titre: "Elementary",
      classes: [{ cle: "grade-k", court: "K" }, ...[1, 2, 3, 4, 5].map((n) => ({ cle: `grade-${n}`, court: `G${n}` }))],
    },
    { titre: "Middle", classes: [6, 7, 8].map((n) => ({ cle: `grade-${n}`, court: `G${n}` })) },
    {
      titre: "High",
      classes: [
        { cle: "algebra-1", court: "Alg 1" },
        { cle: "geometry", court: "Geom" },
        { cle: "algebra-2", court: "Alg 2" },
        { cle: "precalculus", court: "Precalc" },
        { cle: "calculus", court: "Calc" },
      ],
    },
  ],
  madagascar: [],
};

/** Clé du pays choisi dans le navigateur (préférence du visiteur, rien de plus). */
export const CLE_PAYS = "eleveai-pays";

export function infoPays(slug: string | null | undefined): InfoPays | null {
  return PAYS.find((p) => p.slug === slug) ?? null;
}

export function programmesDuPays(slug: string): ProgrammePays[] {
  return PROGRAMMES_PAYS.filter((p) => p.pays === slug);
}

export function lirePaysChoisi(): SlugPays | null {
  try {
    return infoPays(localStorage.getItem(CLE_PAYS))?.slug ?? null;
  } catch {
    return null;
  }
}
