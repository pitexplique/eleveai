// Types du moteur « Guide de survie » : condensé imprimable d'un programme
// (formules + réflexes + pièges + test), entièrement piloté par les données.
// Un kit = 1 fichier data.ts + 1 page.tsx — même philosophie que les cahiers
// de vacances (components/cahier). Le contenu est ALIGNÉ sur le coach :
// notions/micro-compétences de lib/tutor-v4/knowledge, exercices puisés dans
// les banques de questions (lib/tutor-v4/questionBank).

/** Un exercice du « test de survie », extrait d'une banque du coach. */
export type KitExo = {
  /** id de l'item dans la banque (traçabilité). */
  id: string;
  /** Libellé de la micro-compétence testée (affiché en petit). */
  micro: string;
  /** Énoncé (LaTeX $...$ possible, rendu par MarkdownMath). */
  enonce: string;
  /** Choix si QCM. */
  choices?: string[];
  /** Réponse attendue (expected[0] de la banque). */
  reponse: string;
  /** Correction détaillée (explanation de la banque). */
  corrige?: string;
  /** Difficulté 1-3 (affichage ★). */
  difficulty: number;
};

/** Une formule « qui sauve » : libellé + LaTeX. */
export type KitFormule = {
  label: string;
  latex: string;
};

/** Un réflexe de survie : « si l'énoncé dit… → pense à… ». */
export type KitReflexe = {
  si: string;
  alors: string;
};

/** Une notion du kit = 1 page A4 imprimée. */
export type KitNotion = {
  /** notionId du coach (ex. "second_degre"). */
  id: string;
  emoji: string;
  titre: string;
  /** Grand domaine du BO (ex. « Algèbre »). */
  domaine: string;
  /** L'idée du chapitre en 2-3 phrases (LaTeX possible). */
  essentiel: string;
  formules: KitFormule[];
  reflexes: KitReflexe[];
  pieges: string[];
  /** 1 ligne « en vrai » (ancrage concret, optionnel). */
  reel?: string;
  /** Checklist « je sais… » : libellés des micro-compétences du coach. */
  micros: string[];
  /** Le test de survie (extrait des banques du coach). */
  exos: KitExo[];
};

export type KitData = {
  /** Slug de la route (ex. "maths-premiere"). */
  slug: string;
  titre: string;
  baseline: string;
  matiere: string;
  /** Libellé humain du niveau (ex. « Première · spécialité maths »). */
  classeLabel: string;
  /** Slug classe du coach (ex. "premiere-spe") pour les CTA. */
  coachClasse: string;
  /**
   * Ligne d'auteur de la page de garde. Optionnel : si absent, le moteur la
   * dérive de `matiere` (maths → « professeur de mathématiques à La Réunion »,
   * autres matières → « professeur à La Réunion »). À renseigner pour figer un
   * autre libellé.
   */
  auteurLigne?: string;
  notions: KitNotion[];
};
