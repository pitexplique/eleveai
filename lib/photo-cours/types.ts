// lib/photo-cours/types.ts
//
// LA PHOTO DU COURS — types partagés client / serveur.
//
// La brique est volontairement AUTONOME : rien ici n'importe de `@/lib/tutor-v4`
// ni d'une page. On la branche où on veut (espace prof, dashboard, coach) en
// posant `<PhotoCours />` et en parlant à /api/photo-cours/*.
//
// ⚠️ RGPD — L'IMAGE N'EST JAMAIS STOCKÉE. Elle est compressée dans le
// navigateur, envoyée au modèle, et oubliée. Une photo de cahier porte une
// écriture, souvent un prénom, parfois le nom d'un établissement.
//
// ⭐ LE TEXTE RELU, LUI, EST GARDÉ DEPUIS LE 12/08 AU SOIR — et c'est un
// revirement assumé. Le matin, la fonction était un essai côté prof : on
// produisait une fiche et on repartait, donc rien à conserver. Le soir, elle
// est ouverte à l'élève et au parent, et leur besoin est de REVENIR (réviser
// la veille, refaire une série). Sans le texte, il faut rephotographier la
// page à chaque fois — ce qui condamne l'usage qu'on vient d'ouvrir.
// Trois verrous : privé (visible de son seul auteur), jamais mutualisé ni
// indexé, purgé à 12 mois. Voir supabase/photo_cours.sql.

/* ── QUI PHOTOGRAPHIE ────────────────────────────────────────────────────── */

/**
 * ⭐ TROIS PUBLICS, TROIS BESOINS OPPOSÉS (tranché avec Frédéric le 12/08,
 * après Jeanne — prof de SVT — et ses élèves : « ils prennent mal le cours »).
 *
 * Ce n'est pas une nuance de ton, c'est une règle qui s'inverse :
 *   — au PROFESSEUR, on n'ajoute RIEN qui ne soit pas dans son cours ; sa
 *     progression lui appartient et on ne la double pas ;
 *   — à l'ÉLÈVE et au PARENT, on complète ce qui manque — c'est même la
 *     raison pour laquelle ils photographient — mais en le DISANT, jamais
 *     fondu dans le texte comme si ça venait du cahier.
 */
export type PublicPhoto = "prof" | "eleve" | "parent";

/** Le public déduit du COMPTE, jamais d'un paramètre du navigateur. */
export function publicDuCompte(typeUtilisateur: string | null | undefined): PublicPhoto {
  if (typeUtilisateur === "prof" || typeUtilisateur === "principal") return "prof";
  if (typeUtilisateur === "parent") return "parent";
  return "eleve";
}

/* ── CE QUE LA MACHINE A LU ──────────────────────────────────────────────── */

/**
 * ⭐ TROIS SIGNALEMENTS QUI NE SE MÉLANGENT PAS (Frédéric, 12/08). Ils étaient
 * confondus dans une seule liste « zones illisibles », et ils n'appellent pas
 * du tout la même réponse :
 *
 *   illisible → NOTRE problème. « Je n'ai pas réussi à lire cette ligne. »
 *   manquant  → un trou dans le cours. On le dit, on ne le comble pas en douce.
 *   erreur    → une faute de RECOPIE. C'est le plus utile et le plus dangereux.
 *
 * ⛔ LA RÈGLE QUI PROTÈGE TOUT LE RESTE : on ne signale une erreur que si ce
 * qui est écrit est IMPOSSIBLE EN SOI (une formule qui ne tient pas, un accord
 * faux, une date qui contredit une autre ligne de la même page) — jamais parce
 * que c'est incomplet ou « pas comme on l'aurait dit ». Quand un cahier dit
 * quelque chose de faux, il y a deux causes possibles : l'élève a mal recopié,
 * ou le professeur a simplifié exprès. La machine ne sait pas les distinguer.
 * Et si elle tranche contre le professeur alors qu'elle a tort, elle casse
 * quelque chose qui ne se répare pas — cette plateforme se fait AVEC les
 * profs. D'où la formulation, toujours tournée vers la copie : « tu as sans
 * doute recopié trop vite ici », jamais « c'est faux ».
 */
export type Signalement = {
  /** Où, dans la page. « la 3ᵉ ligne du paragraphe 2 », « la formule encadrée ». */
  ou: string;
  /** Ce qu'on en dit, déjà écrit pour la personne. */
  quoi: string;
};

export type LectureCours = {
  /** Le cours restitué tel qu'il est écrit, sans correction ni ajout. */
  texte: string;
  /** Le niveau si la photo le dit (« 5e », « Terminale »…), sinon null. */
  niveau: string | null;
  /** La notion si elle est lisible (« théorème de Pythagore »…), sinon null. */
  notion: string | null;
  /** La matière si elle est déductible, sinon null. */
  matiere: string | null;

  /** Ce que la machine n'a pas su lire. */
  zonesIllisibles: string[];
  /** Ce qui manque dans le cours. ⛔ Signalé, jamais comblé en silence. */
  manques: Signalement[];
  /** Ce qui ne peut pas être juste. ⛔ Voir la règle ci-dessus. */
  erreursProbables: Signalement[];

  /** 0 à 100. En dessous de 60, on demande une meilleure photo. */
  confiance: number;
};

/* ── CE QU'ON PRODUIT ────────────────────────────────────────────────────── */

export type Production = {
  id: string;
  label: string;
  aide: string;
};

/**
 * ⚠️ UNE LISTE COURTE PAR PUBLIC, ET C'EST VOLONTAIRE. Le plan du 12/08 en
 * comptait quatorze ; on en garde neuf, et les cinq du professeur n'existent
 * que parce qu'elles tournaient déjà. Écrire des sorties qu'on n'a pas encore
 * vues servir, sur une fonction dont on ne sait même pas si l'étape d'AVANT
 * (lire une écriture manuscrite) tient, c'est fabriquer de la maintenance.
 * Le dashboard admin dira lesquelles servent — les autres s'ajouteront après.
 */
export const PRODUCTIONS: Record<PublicPhoto, Production[]> = {
  eleve: [
    {
      id: "interroger",
      label: "Interroge-moi",
      aide: "Des questions sur ta page, pas sur le programme.",
    },
    {
      id: "expliquer",
      label: "Explique-moi",
      aide: "Ce que dit ce cours, dans des mots simples.",
    },
    {
      id: "retenir",
      label: "De quoi retenir",
      aide: "Cinq lignes à relire la veille.",
    },
  ],
  parent: [
    {
      id: "ce-soir",
      label: "Quoi faire ce soir",
      aide: "Vingt minutes : des exercices, avec le corrigé.",
    },
    {
      id: "comprendre",
      label: "De quoi ça parle",
      aide: "La leçon expliquée à un adulte qui n'a pas fait ça depuis 25 ans.",
    },
    {
      id: "en-parler",
      label: "Comment lui en parler",
      aide: "La question à poser d'abord, et ce qui est normal de rater.",
    },
  ],
  prof: [
    {
      id: "exercices",
      label: "Des exercices",
      aide: "Une série graduée sur ce cours précis, avec le corrigé.",
    },
    {
      id: "erreurs",
      label: "Les erreurs à attendre",
      aide: "Ce que vos élèves vont rater, et quoi dire quand ça arrive.",
    },
    {
      id: "evaluation",
      label: "Une évaluation",
      aide: "Un sujet court avec le barème.",
    },
    {
      id: "seance",
      label: "Une séance",
      aide: "Le déroulé d'une heure : objectifs, étapes, durées.",
    },
    {
      id: "differenciation",
      label: "De la différenciation",
      aide: "Le même contenu en trois niveaux d'exigence.",
    },
    {
      id: "synthese",
      label: "Une fiche de synthèse",
      aide: "Le cours resserré sur une page pour les élèves.",
    },
  ],
};

export function productionsPour(pub: PublicPhoto): Production[] {
  return PRODUCTIONS[pub];
}

export function productionValide(pub: PublicPhoto, id: string | undefined): string {
  const liste = PRODUCTIONS[pub];
  return liste.some((p) => p.id === id) ? (id as string) : liste[0].id;
}

/* ── LES PONTS ───────────────────────────────────────────────────────────── */

/** Un renvoi vers ce qui existe déjà — coach ou parcours. */
export type Pont = {
  url: string;
  libelle: string;
  /** Une ligne qui dit ce qu'on y trouve, sans promettre plus. */
  detail: string;
};

/* ── LES RÉPONSES DES ROUTES ─────────────────────────────────────────────── */

export type ReponseLecture =
  | { lecture: LectureCours; public: PublicPhoto; classeDuCompte: string | null }
  | { error: string };

export type ReponseProduction =
  | { output: string; ponts: Pont[]; id: string | null }
  | { error: string };
