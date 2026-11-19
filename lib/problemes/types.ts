// PROBLÈMES À PROJETER (19/11/2026, Frédéric : « fais-le du CP à la terminale,
// sur chaque notion »). UN SEUL MODÈLE : chaque notion du coach a son fichier
// de données, `lib/problemes/<classe>/<notionId>.ts`, rendu par UNE seule page,
// `/enigmes-mathematiques/<classe>/<notion-slug>`. Le hub `/enigmes-mathematiques` les liste tous.
//
// ⛔ Règles d'écriture (voir aussi lib/problemes/REGLES.md) :
//  - 6 problèmes par notion, dont UNE « piège » et UNE « défi des curieux » ;
//  - contextes de vie variés (les maths sont transversales), La Réunion ~4 % ;
//  - 6e : phrases courtes ; division avec « ÷ », jamais 5/2 hors fractions ;
//  - chaque calcul vérifié ; figure au bon rapport, sinon « pas à l'échelle » ;
//  - espaces insécables avant ? ! : (U+00A0) ;
//  - QCM : la bonne réponse tombe au hasard sur A, B ou C.
//
// Les dessins sont des SVG écrits à la main, aux couleurs du FOND BLANC
// (palette ci-dessous) : la page les convertit seule pour le fond ardoise.

/** La palette des dessins (fond blanc). Ne pas en utiliser d'autre dans les
 *  SVG : la conversion vers l'ardoise ne connaît que celles-ci. */
export const COULEURS = {
  craie: "#1e293b",
  pale: "#64748b",
  jaune: "#d97706",
  rose: "#be123c",
  bleu: "#1d4ed8",
} as const;

/** Les mêmes couleurs, sur fond ardoise. */
export const COULEURS_ARDOISE: Record<string, string> = {
  [COULEURS.craie]: "#f1f5f9",
  [COULEURS.pale]: "#b6c2bf",
  [COULEURS.jaune]: "#fde68a",
  [COULEURS.rose]: "#fda4af",
  [COULEURS.bleu]: "#93c5fd",
};

/** Ce que l'élève répond, et qu'on peut corriger sans un humain. */
export type Verification =
  | {
      type: "qcm";
      /** Trois choix, affichés A, B, C dans cet ordre. */
      choix: [string, string, string];
      /** 0 = A, 1 = B, 2 = C — réparti au hasard d'un problème à l'autre. */
      bonne: 0 | 1 | 2;
    }
  | {
      type: "courte";
      /** Les réponses acceptées (comparées sans espaces ni casse, virgule = point). */
      attendus: string[];
      /** L'unité affichée après la case, ex. « m ». */
      unite?: string;
    };

export type Probleme = {
  /** « Énigme 2 · Le chemin de l'école » */
  tag: string;
  titre: string;
  /** HTML simple (<b>, <br>, <sup>) — c'est ce qu'on projette. */
  question: string;
  /** HTML simple : la réponse expliquée, écrite sur les lignes. */
  reponse: string;
  /** Un SVG complet, viewBox 0 0 480 420 de préférence. */
  dessin: string;
  /** La question posée à l'élève dans son tableau de bord, si elle diffère
   *  (ex. la question projetée est ouverte). Texte simple. */
  consigne?: string;
  verification: Verification;
  sorte?: "piege" | "defi";
};

export type ProblemesNotion = {
  classe: string;
  /** L'identifiant du coach (underscores), cf. listerToutesLesNotions(). */
  notionId: string;
  /** « Énigmes de Pythagore » : le titre de la page. */
  titre: string;
  /** Une phrase pour le hub et la balise description. */
  description: string;
  problemes: Probleme[];
};
