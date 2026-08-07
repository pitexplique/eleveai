// lib/matrice/guides.ts
//
// LES GUIDES DE SURVIE, NIVEAU PAR NIVEAU — écrits UNE FOIS, lus partout.
//
// Avant, la liste vivait au milieu de ressources.ts, en tableau anonyme. Le
// menu de l'élève connecté, lui, n'en proposait aucun : le guide de sa classe
// existait, et il ne pouvait pas le trouver depuis le header.
//
// ⚠️ LE DOSSIER app/guide-de-survie/ FAIT FOI. On n'invente pas d'URL parce
// qu'un niveau « mériterait » son guide : un lien vers une page absente coûte
// plus cher en confiance qu'un niveau qui attend le sien.
// ⛔ CP, CE1 et CE2 n'ont PAS de guide aujourd'hui — ni en maths ni en
// français. Ils tombent donc sur le sommaire, qui dit la vérité : voici ce qui
// existe. Le jour où `app/guide-de-survie/maths-cp/` naît, une ligne ici suffit
// et le guide apparaît partout à la fois — menu, matrice, page de classe.

import type { ProfilId } from "./types";

export type GuideDeSurvie = {
  /** Le segment d'URL, tel qu'il existe dans app/guide-de-survie/. */
  slug: string;
  /** Ce qu'on lit sur le bouton : « maths 5e », « anglais A2 ». */
  libelle: string;
  matiere: "maths" | "francais" | "anglais";
  niveaux: ProfilId[];
};

/** Le sommaire — la seule destination honnête quand un niveau n'a pas le sien. */
export const HUB_GUIDES = "/guide-de-survie";

export const GUIDES: GuideDeSurvie[] = [
  // ── Maths : du CM1 à la Terminale, sans trou ─────────────────────────────
  { slug: "maths-cm1", libelle: "maths CM1", matiere: "maths", niveaux: ["cm1"] },
  { slug: "maths-cm2", libelle: "maths CM2", matiere: "maths", niveaux: ["cm2"] },
  { slug: "maths-sixieme", libelle: "maths 6e", matiere: "maths", niveaux: ["6e"] },
  { slug: "maths-cinquieme", libelle: "maths 5e", matiere: "maths", niveaux: ["5e"] },
  { slug: "maths-quatrieme", libelle: "maths 4e", matiere: "maths", niveaux: ["4e"] },
  { slug: "maths-troisieme", libelle: "maths 3e", matiere: "maths", niveaux: ["3e"] },
  { slug: "maths-seconde", libelle: "maths Seconde", matiere: "maths", niveaux: ["seconde"] },
  { slug: "maths-premiere", libelle: "maths Première", matiere: "maths", niveaux: ["premiere"] },
  { slug: "maths-terminale", libelle: "maths Terminale", matiere: "maths", niveaux: ["terminale"] },

  // ── Français : CM1 → 3e. Le lycée n'en a pas encore. ─────────────────────
  { slug: "francais-cm1", libelle: "français CM1", matiere: "francais", niveaux: ["cm1"] },
  { slug: "francais-cm2", libelle: "français CM2", matiere: "francais", niveaux: ["cm2"] },
  { slug: "francais-6e", libelle: "français 6e", matiere: "francais", niveaux: ["6e"] },
  { slug: "francais-5e", libelle: "français 5e", matiere: "francais", niveaux: ["5e"] },
  { slug: "francais-4e", libelle: "français 4e", matiere: "francais", niveaux: ["4e"] },
  { slug: "francais-3e", libelle: "français 3e", matiere: "francais", niveaux: ["3e"] },

  // ── Anglais : en niveaux du CECRL, pas en classes. Un même guide couvre
  //    donc deux années — c'est le découpage du cadre européen, pas le nôtre.
  { slug: "anglais-a1", libelle: "anglais A1", matiere: "anglais", niveaux: ["6e", "5e"] },
  { slug: "anglais-a2", libelle: "anglais A2", matiere: "anglais", niveaux: ["4e", "3e"] },
  { slug: "anglais-b1", libelle: "anglais B1", matiere: "anglais", niveaux: ["seconde", "premiere"] },
  { slug: "anglais-b2", libelle: "anglais B2", matiere: "anglais", niveaux: ["premiere", "terminale"] },
];

/** Tous les guides d'un niveau — maths d'abord, c'est le plus demandé. */
export function guidesPour(niveau: ProfilId | null | undefined): GuideDeSurvie[] {
  if (!niveau) return [];
  const ordre = { maths: 0, francais: 1, anglais: 2 };
  return GUIDES.filter((g) => g.niveaux.includes(niveau)).sort(
    (a, b) => ordre[a.matiere] - ordre[b.matiere],
  );
}

/**
 * Là où mène « Guide de survie » pour une classe donnée.
 *
 * Un seul guide → on ouvre le guide. Plusieurs → le sommaire, MAIS avec la
 * classe en paramètre : il ouvre alors sur les deux ou trois guides de cette
 * classe, le catalogue complet en dessous. On ne choisit pas les maths à la
 * place de quelqu'un qui cherchait le français, et on ne le lâche pas non plus
 * devant dix-neuf cartes.
 * Aucun guide (CP, CE1, CE2) → le sommaire nu, qui dit ce qui existe.
 */
export function urlGuidePour(niveau: ProfilId | null | undefined): string {
  const g = guidesPour(niveau);
  if (g.length === 1) return `${HUB_GUIDES}/${g[0].slug}`;
  if (g.length > 1) return `${HUB_GUIDES}?niveau=${niveau}`;
  return HUB_GUIDES;
}

// ─── LES CAHIERS DE VACANCES ────────────────────────────────────────────────
//
// Même fichier, même règle, même raison : le dossier app/cahier-vacances/ fait
// foi, et une seule liste sert à la fois l'inventaire de la matrice et la
// pastille de l'entrée.
//
// ⚠️ LE TITRE DIT D'OÙ L'ON VIENT, LE NIVEAU DIT À QUI ON PARLE. « Vers le
// CE1 » s'adresse à un enfant qui sort du CP : il vaut donc pour un CP comme
// pour un CE1. C'est la convention déjà en place pour le collège, et c'est
// elle qui fait qu'un élève voit toujours DEUX cahiers — celui qu'il vient de
// finir et celui qui l'attend.

export type CahierVacances = { slug: string; libelle: string; niveaux: ProfilId[] };

export const CAHIERS: CahierVacances[] = [
  { slug: "vers-le-cp", libelle: "vers le CP", niveaux: ["cp"] },
  { slug: "vers-le-ce1", libelle: "vers le CE1", niveaux: ["cp", "ce1"] },
  { slug: "vers-le-ce2", libelle: "vers le CE2", niveaux: ["ce1", "ce2"] },
  { slug: "vers-le-cm1", libelle: "vers le CM1", niveaux: ["ce2", "cm1"] },
  { slug: "vers-le-cm2", libelle: "vers le CM2", niveaux: ["cm1", "cm2"] },
  { slug: "vers-la-6e", libelle: "vers la 6e", niveaux: ["cm2", "6e"] },
  { slug: "vers-la-5e", libelle: "vers la 5e", niveaux: ["6e", "5e"] },
  { slug: "vers-la-4e", libelle: "vers la 4e", niveaux: ["5e", "4e"] },
  { slug: "vers-la-3e", libelle: "vers la 3e", niveaux: ["4e", "3e"] },
  { slug: "vers-la-2nde", libelle: "vers la Seconde", niveaux: ["3e", "seconde"] },
  { slug: "vers-la-premiere", libelle: "vers la Première", niveaux: ["seconde", "premiere"] },
  { slug: "vers-la-terminale", libelle: "vers la Terminale", niveaux: ["premiere", "terminale"] },
  { slug: "vers-le-bac-plus-1", libelle: "vers le Bac+1", niveaux: ["terminale"] },
];

/** Le sommaire des cahiers — il les montre tous, par niveau. */
export const HUB_CAHIERS = "/cahier-vacances";

export function cahiersPour(niveau: ProfilId | null | undefined): CahierVacances[] {
  if (!niveau) return [];
  return CAHIERS.filter((c) => c.niveaux.includes(niveau));
}

/**
 * Là où mène « Cahiers ». Un seul cahier → le cahier. Plusieurs → le sommaire.
 * ⚠️ Un élève en a presque toujours DEUX (celui qu'il finit, celui qui vient) :
 * choisir pour lui, ce serait choisir s'il révise l'année écoulée ou prépare la
 * suivante. Ce n'est pas à nous de trancher ça.
 */
export function urlCahierPour(niveau: ProfilId | null | undefined): string {
  const c = cahiersPour(niveau);
  return c.length === 1 ? `${HUB_CAHIERS}/${c[0].slug}` : HUB_CAHIERS;
}
