// lib/tutor-v4/questionBank/economieBanque.ts
//
// LE FABRICANT DES BANQUES D'ÉCONOMIE — un concept, trois façons de le
// rencontrer.
//
// ⭐ POURQUOI UN FABRICANT PLUTÔT QUE SEPT FICHIERS QUI SE RESSEMBLENT
// (10/09/2026). Les anciennes banques d'économie répétaient quarante lignes de
// gabarit par thème, et ajouter un mot coûtait donc quarante lignes. Ici un
// mot coûte TROIS CHAMPS : son nom, sa définition, une scène où il se joue.
// C'est ce qui rend le chantier tenable au-delà de la première fournée.
//
// ⛔⛔ ET ÇA CORRIGE UN DÉFAUT QUE PERSONNE NE VOYAIT DANS L'ANCIENNE VERSION.
// Chaque concept y portait trois « distractors » écrits à la main, tous
// rédigés comme des DÉFINITIONS — et la question « quel concept correspond à
// cette définition ? » proposait donc : « La production », « L'argent dépensé
// pour créer un produit », « Le bénéfice réalisé après la vente »… La bonne
// réponse était la seule à ne pas être une phrase. On pouvait répondre juste
// sans rien connaître à l'économie, ce qui est la définition d'un exercice qui
// ne mesure rien.
//
// Ici les mauvaises réponses sont les VOISINES du même thème : trois autres
// mots pour une question qui demande un mot, trois autres définitions pour une
// question qui demande une définition. Elles sont donc toujours de la même
// nature que la bonne réponse — et elles sont vraies ailleurs, ce qui est la
// seule façon honnête de se tromper.
//
// ⚠️ LES VOISINES SONT PRISES PAR ROTATION, PAS AU HASARD. Une banque doit
// rendre deux fois la même chose à deux exécutions : c'est ce qui permet de la
// relire, de la mesurer, et de dire pourquoi un élève a vu telle question. Le
// mélange des propositions, lui, se fait au SERVICE (`shuffleChoices`, dans
// lib/tutor-v4/questionPairBuilder.ts) — la bonne réponse n'arrive donc jamais
// systématiquement en premier à l'écran.

import type { SchoolLevel, TutorBankItemV4 } from "@/lib/tutor-v4/types";

export type ConceptEco = {
  /** L'identifiant du concept, en minuscules et en tirets. Sert aux ids. */
  slug: string;
  /** Le mot, tel qu'on l'écrit au tableau — article compris. */
  term: string;
  /**
   * Ce que le mot veut dire, en UNE phrase sans le mot lui-même.
   * ⛔ Ne jamais y remettre le terme : la définition sert aussi de question
   * (« quel mot correspond à cette définition ? »), et le mot dedans donne la
   * réponse.
   */
  definition: string;
  /**
   * UNE SCÈNE ORDINAIRE OÙ LE MOT SE JOUE, sans jamais le nommer.
   *
   * ⭐ C'est la moitié qui manquait au coach d'économie. Savoir réciter
   * « l'inflation, c'est la hausse générale des prix » et reconnaître
   * l'inflation dans « le même paquet de riz coûte 1,80 € cette année contre
   * 1,50 € l'an dernier » sont deux gestes différents, et c'est le second
   * qu'on emporte hors du contrôle.
   */
  situation: string;
};

/**
 * Combien de propositions dans un QCM. Trois voisines + la bonne : c'est le
 * format de tout le site, et il impose un plancher de QUATRE concepts par
 * notion — en dessous, une voisine se répéterait dans la même liste.
 */
const CHOIX = 4;

function voisines<T>(liste: readonly T[], i: number): T[] {
  // Rotation : après le dernier, on revient au premier. Chaque concept a donc
  // exactement les trois suivants pour voisines, et aucun ne se retrouve à
  // côté de lui-même.
  return [1, 2, 3].map((d) => liste[(i + d) % liste.length]);
}

export function banqueEconomie(p: {
  niveau: SchoolLevel;
  notionId: string;
  concepts: readonly ConceptEco[];
  /** Les mots-clés de la série — le thème et le palier suffisent. */
  tags: readonly string[];
}): TutorBankItemV4[] {
  const { niveau, notionId, concepts, tags } = p;

  if (concepts.length < CHOIX) {
    // ⚠️ On lève plutôt que de servir un QCM à trois propositions : une notion
    // trop maigre est un problème de contenu, et il doit se voir à la
    // compilation, pas à l'écran d'un élève.
    throw new Error(
      `banqueEconomie(${notionId}) : ${concepts.length} concept(s), il en faut au moins ${CHOIX}.`,
    );
  }

  // ⚠️ LES DEUX MICROS SE DÉDUISENT DE LA NOTION, et c'est un contrat avec
  // knowledge/economie/<palier>/microSkills.ts : `<notion>_def` et
  // `<notion>_situation`. Un micro absent du knowledge rendrait ces questions
  // inatteignables — en silence, comme toujours dans cette chaîne.
  const microDef = `${notionId}_def`;
  const microSituation = `${notionId}_situation`;
  const communs = {
    niveau,
    matiere: "economie" as const,
    notionId,
    format: "qcm" as const,
    comparator: "mcq_exact" as const,
    tags: [...tags],
  };

  return concepts.flatMap((c, i) => {
    const soeurs = voisines(concepts, i);
    return [
      {
        ...communs,
        kind: "fixed" as const,
        id: `${microDef}_mot_${c.slug}`,
        microId: microDef,
        difficulty: 1 as const,
        text: `Quel mot correspond à cette définition ?\n« ${c.definition} »`,
        choices: [c.term, ...soeurs.map((s) => s.term)],
        expected: [c.term],
        explanation: `${c.term} : ${c.definition}.`,
      },
      {
        ...communs,
        kind: "fixed" as const,
        id: `${microDef}_sens_${c.slug}`,
        microId: microDef,
        difficulty: 2 as const,
        text: `Que veut dire « ${c.term} » ?`,
        choices: [c.definition, ...soeurs.map((s) => s.definition)],
        expected: [c.definition],
        explanation: `${c.term} : ${c.definition}.`,
      },
      {
        ...communs,
        kind: "fixed" as const,
        id: `${microSituation}_${c.slug}`,
        microId: microSituation,
        difficulty: 3 as const,
        text: `De quoi parle-t-on ?\n« ${c.situation} »`,
        choices: [c.term, ...soeurs.map((s) => s.term)],
        expected: [c.term],
        explanation: `${c.term} : ${c.definition}.`,
      },
    ];
  });
}
