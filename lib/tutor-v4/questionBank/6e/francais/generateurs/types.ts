// LES GÉNÉRATEURS DU FRANÇAIS DE 6e, CHACUN AVEC SON CORRECTEUR (05/10/2026).
//
// ⛔⛔ POURQUOI. Frédéric : ses 6e « tombent sur la même question mais avec des
// choix différents » (« Léa observait le margouillat… », « Le vieux chêne
// dominait la cour… »). Mesuré le 05/10 : 113 micros sur 123 sous le seuil,
// 16 phrases en médiane par micro — des listes de 12 à 20 énoncés écrits main,
// dont l'élève avait fait le tour en une séance.
//
// ⭐ UN GÉNÉRATEUR compose la question à partir de tables (prénoms, sujets,
// situations, tournures) et CALCULE la bonne réponse à partir des mêmes
// données : elle n'est jamais recopiée à la main.
//
// ⭐ UN CORRECTEUR relit chaque question tirée SANS faire confiance au
// générateur : il refait le raisonnement sur ce que l'élève lit (le pronom
// s'accorde-t-il avec UN SEUL des groupes du texte ? le leurre est-il bien
// faux ?) et rend la liste des problèmes. Vide = la question est juste.
// `scripts/verifier-correcteurs-francais-6e.ts` le lance sur des centaines de
// tirages par micro, et c'est un contrôle bloquant.
//
// Branchement : `buildCycle3FrancaisBank("6e", microSkills, GENERATEURS_6E)`.
// Une micro qui a un générateur le sert ; ses anciennes questions écrites main
// restent servies une fois sur cinq (elles n'ont pas disparu, elles se diluent).

export type QuestionFrancais = {
  text: string;
  correct: string;
  wrongs: string[];
  methode?: string;
};

export type GenerateurFrancais = {
  /** Compose une question neuve. La bonne réponse est CALCULÉE, pas recopiée. */
  generer: () => QuestionFrancais;
  /** Relit une question tirée ; rend la liste des problèmes (vide = juste). */
  corriger: (q: QuestionFrancais) => string[];
};

/** Clé = `microId` exact de la 6e (ex. « 6e_comp_reprises »). */
export type GenerateursFrancais = Record<string, GenerateurFrancais>;
