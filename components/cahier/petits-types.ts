/* Types des cahiers de vacances « petits » (GS / CP / CE1).
   Moteur distinct de CahierVacances : ici tout est VISUEL et la consigne est
   lue par le parent (« 🗣️ À lire à voix haute »), car l'enfant ne lit pas
   encore couramment. Un niveau = un fichier de données + une page. */

import type { Etape } from "./types";

/* -------------------------------------------------------------------------- */
/*  Activités — union typée. Chaque activité porte sa consigne parent et de    */
/*  quoi dériver le corrigé. `bloc` choisit la carte colorée d'accueil.        */
/* -------------------------------------------------------------------------- */

type Base = {
  /** « maths » ou « francais » → carte colorée + pictogramme. */
  bloc: "maths" | "francais";
  /** Consigne lue à voix haute par le parent. */
  consigne: string;
};

/** Compter une collection de pictos puis écrire le nombre. */
export type ActiviteCompter = Base & {
  kind: "compter";
  emoji: string;
  /** Nombre d'emojis à afficher (= la réponse). */
  n: number;
};

/** Petits calculs posés (l'enfant écrit le résultat). */
export type ActiviteCalcul = Base & {
  kind: "calcul";
  ops: { q: string; r: string }[];
};

/** Modèle à repasser / écrire en gros (lettres, chiffres, mot). */
export type ActiviteTracer = Base & {
  kind: "tracer";
  modele: string;
};

/** Entourer la (ou les) bonne(s) réponse(s) parmi des étiquettes. */
export type ActiviteEntoure = Base & {
  kind: "entoure";
  items: { label: string; bon: boolean }[];
};

/** Relier deux colonnes (gauche ↔ droite). */
export type ActiviteRelier = Base & {
  kind: "relier";
  paires: { g: string; d: string }[];
};

/** Phonologie : entourer les images qui contiennent le son. */
export type ActiviteSon = Base & {
  kind: "son";
  son: string;
  images: { emoji: string; mot: string; bon: boolean }[];
};

/** Lire un petit texte puis (optionnel) répondre à une question.
   Pour les pré-lecteurs (GS), la consigne demande au parent de lire le texte
   à voix haute, puis l'enfant répond oralement à la question. */
export type ActiviteLecture = Base & {
  kind: "lecture";
  texte: string;
  question?: string;
  reponse?: string;
};

/** Suite logique / algorithme : continuer le motif (pilier de la GS). */
export type ActiviteSuite = Base & {
  kind: "suite";
  /** Les éléments visibles au début de la suite. */
  debut: string[];
  /** Ce qui doit continuer la suite (= nombre de cases à compléter). */
  reponse: string[];
};

export type Activite =
  | ActiviteCompter
  | ActiviteCalcul
  | ActiviteTracer
  | ActiviteEntoure
  | ActiviteRelier
  | ActiviteSon
  | ActiviteLecture
  | ActiviteSuite;

/* -------------------------------------------------------------------------- */
/*  Un jour                                                                    */
/* -------------------------------------------------------------------------- */

export type JourPetit = {
  numero: number;
  semaine: number;
  badge: string;
  /** 4 à 6 activités, mélange maths / français. */
  activites: Activite[];
  /** Le mot illustré du jour (gros emoji, phrase exemple lue par le parent). */
  mot: { mot: string; emoji: string; phrase: string };
  /** Geste numérique très doux (tablette / souris), supervisé par le parent. */
  geste: { titre: string; texte: string };
  /** Défi du jour : consigne parent + correction. */
  defi: { consigne: string; correction: string };
};

/** Données complètes d'un cahier « petits ». */
export type CahierDataPetit = {
  jours: JourPetit[];
  parcours: Etape[];
  defisExpert: Record<number, { enonce: string; correction: string }>;
  carnet: Record<number, string>;
  leSaviasTu: Record<number, { portee: "local" | "monde"; texte: string }>;
};
