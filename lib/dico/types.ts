// 🔹 Types du "Dico" — vocabulaire essentiel + geste numérique
// Chaque mot s'apprend en exécutant un geste d'examen :
// taper au clavier, cliquer, choisir dans un menu déroulant, associer.

export type FamilleDico =
  // Maths
  | "nombres-calcul"
  | "geometrie"
  | "grandeurs-mesures"
  | "donnees-proba"
  // Français
  | "gram-nature"
  | "gram-fonction"
  | "conjugaison"
  | "ortho-lexique"
  | "texte"
  // Sciences
  | "sciences-vivant"
  | "sciences-matiere"
  // Histoire-Géographie
  | "histoire"
  | "geographie"
  // Anglais (collège)
  | "anglais"
  // Tout-petits (GS-CP) : vocabulaire en images
  | "images-mots"
  // Partagé
  | "consignes";

// Le geste numérique entraîné par le mot (= ce qu'on retrouve à l'éval nationale).
export type GesteDico = "saisie" | "clic" | "menu" | "association";

// Le mini-défi attaché à un mot. Forme discriminée par le geste.
export type DefiDico =
  | { geste: "saisie"; question: string; reponse: string; aide?: string }
  | { geste: "clic"; question: string; choix: string[]; bonne: string }
  | { geste: "menu"; question: string; options: string[]; bonne: string }
  | { geste: "association"; question: string; choix: string[]; bonne: string };

export type MotDico = {
  id: string;
  mot: string;
  famille: FamilleDico;
  definition: string; // courte, niveau élève
  // Indice-image (emoji) pour les tout-petits (GS-CP) qui ne lisent pas encore :
  // la carte montre la grande image, le mot reste écrit au dos.
  image?: string;
  exemple?: string;
  // Le mini-jeu interactif (page /dico) est OPTIONNEL : une entrée « carte »
  // n'a besoin que de mot + définition ; on enrichit le `defi` progressivement.
  defi?: DefiDico;
};

// Un mot agrégé au niveau d'une CLASSE : on rattache sa matière d'origine
// (utile pour le jeu de cartes « Qui suis-je ? » par classe, où la matière
// donne la couleur de la carte).
export type MotDicoClasse = MotDico & {
  matiere: string; // slug, ex "maths"
  matiereLabel: string; // affichage, ex "Maths"
};

export type Dico = {
  matiere: string; // slug d'URL, ex "maths"
  matiereLabel: string; // affichage, ex "Maths"
  niveau: string; // ex "6e"
  titre: string; // ex "Dico Maths 6e"
  sousTitre: string; // ex "50 mots & gestes pour l'éval nationale"
  mots: MotDico[];
};
