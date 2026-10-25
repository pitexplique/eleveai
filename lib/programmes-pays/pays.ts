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
  { slug: "suisse", nom: "Suisse romande", drapeau: "🇨🇭" },
  { slug: "belgique", nom: "Belgique (Fédération Wallonie-Bruxelles)", drapeau: "🇧🇪" },
  { slug: "quebec", nom: "Québec (Canada)", drapeau: "🇨🇦" },
  { slug: "maroc", nom: "Maroc", drapeau: "🇲🇦" },
  { slug: "senegal", nom: "Sénégal", drapeau: "🇸🇳" },
  { slug: "cote-divoire", nom: "Côte d'Ivoire", drapeau: "🇨🇮" },
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
  // Sénégal (25/10) : élémentaire CI → CM2, moyen 6e → 3e (BFEM), secondaire
  // 2nde → Tle (bac). Matrices : senegal-moyen.ts (6e → 3e), senegal-secondaire.ts
  // (2nde S, 1re S2, Tle S2) ; l'élémentaire reste grisé.
  senegal: [
    { titre: "Élémentaire", classes: ["CI", "CP", "CE1", "CE2", "CM1", "CM2"].map((c) => ({ cle: c.toLowerCase(), court: c })) },
    { titre: "Moyen", classes: ["6e", "5e", "4e", "3e"].map((c) => ({ cle: c, court: c })) },
    {
      titre: "Secondaire",
      classes: [
        { cle: "2nde", court: "2nde" },
        { cle: "1re", court: "1re" },
        { cle: "tle", court: "Tle" },
      ],
    },
  ],
  // 25/10/2026 : à remplir par les matrices (classes grisées tant qu'elles n'existent pas).
  // Suisse romande (PER, CIIP) : HarmoS 1-8 (primaire), 9-11 (cycle 3), puis le secondaire II.
  // Le PER ne distingue les années qu'au cycle 3 ; avant, il va par paires
  // (1-2H, 3-4H, 5-6H, 7-8H). Matrices : suisse-romande-cycle1/2/3.ts ; 1-2H
  // (école enfantine) reste grisé.
  suisse: [
    { titre: "Primaire", classes: ["1-2", "3-4", "5-6", "7-8"].map((a) => ({ cle: `${a}h`, court: `${a}H` })) },
    { titre: "Secondaire I", classes: [9, 10, 11].map((n) => ({ cle: `${n}h`, court: `${n}H` })) },
    // Secondaire II : le PEC national (CDIP 2024) ne découpe pas le gymnase en années.
    { titre: "Secondaire II", classes: [{ cle: "gymnase", court: "Gymnase" }] },
  ],
  // Belgique, Fédération Wallonie-Bruxelles : primaire P1-P6, secondaire S1-S6.
  // Tronc commun P1 → S3 (référentiel 2022) : belgique-primaire.ts, belgique-secondaire.ts ;
  // S4-S6 (humanités) : belgique-humanites.ts.
  belgique: [
    { titre: "Primaire", classes: [1, 2, 3, 4, 5, 6].map((n) => ({ cle: `p${n}`, court: `P${n}` })) },
    { titre: "Tronc commun", classes: [1, 2, 3].map((n) => ({ cle: `s${n}`, court: `S${n}` })) },
    { titre: "Humanités", classes: [4, 5, 6].map((n) => ({ cle: `s${n}`, court: `S${n}` })) },
  ],
  // Côte d'Ivoire (MENA) : primaire CP1 → CM2, collège 6e → 3e (BEPC), lycée
  // 2nde C → Tle D (bac). Matrices : cote-divoire-primaire/college/lycee.ts.
  "cote-divoire": [
    { titre: "Primaire", classes: ["CP1", "CP2", "CE1", "CE2", "CM1", "CM2"].map((c) => ({ cle: c.toLowerCase(), court: c })) },
    { titre: "Collège", classes: ["6e", "5e", "4e", "3e"].map((c) => ({ cle: c, court: c })) },
    {
      titre: "Lycée",
      classes: [
        { cle: "2nde", court: "2nde C" },
        { cle: "1re", court: "1re D" },
        { cle: "tle", court: "Tle D" },
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
