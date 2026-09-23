// LA DONNÉE DE L'ACCUEIL « façon IXL » (23/09/2026).
//
// Lue par app/accueil/AccueilMatieres.tsx, et par personne d'autre.
//
// Ce qu'on copie d'IXL, et c'est tout : la LIGNE DES MATIÈRES (une icône, un
// mot, un soulignement sous celle qui est ouverte), puis une SECONDE LIGNE
// d'actions qui ne change que le panneau du dessous. Chez IXL c'est
// « View by : Grades / Topics / Week by week » ; ici c'est ce qu'on sait faire
// d'une matière : le coach, l'évaluation, la fiche, la photo, la leçon du jour.
//
// ⛔ LES TOPICS NE SONT PAS RÉÉCRITS ICI. Ils sont lus dans NOTIONS_COACH
// (lib/matrice/notions.generated.ts, 799 notions générées depuis le knowledge) —
// donc une notion qui entre au programme apparaît sur cette page le jour où le
// script est relancé, sans que personne ait à la recopier. C'est la règle de
// notionsClasse.ts, appliquée à un écran de plus.

import { NOTIONS_COACH } from "@/lib/matrice/notions.generated";

export type MatiereId = "maths" | "francais" | "economie" | "anglais" | "espagnol" | "ia";

export type ActionId = "coach" | "evaluation" | "fiche" | "photo" | "lecon";

export type MatiereAccueil = {
  id: MatiereId;
  /** Le mot de la ligne du haut. Court : il passe sous une icône. */
  label: string;
  /**
   * LE TITRE DU BANDEAU — ET C'EST LE `<h1>` DE LA PAGE.
   *
   * ⛔ IL NE PORTE PLUS LA MARQUE (23/09/2026). Il disait « EleveAI Maths »,
   * repris de la capture AMÉRICAINE d'IXL (« IXL Math »). Or `fr.ixl.com`, la
   * version française, ne met jamais son nom dans son h1 : l'accueil écrit
   * « Soutien scolaire en maths » — c'est-à-dire la REQUÊTE — et la page
   * matière écrit « Maths », le mot nu. Relevé au navigateur le 23/09.
   *
   * ⭐ Le raisonnement tient en une phrase : un h1 qui dit la marque parle à
   * ceux qui connaissent déjà le site ; un h1 qui dit la requête parle à ceux
   * qui ne la connaissent pas. La marque, elle, est déjà dans le logo de
   * l'en-tête et dans le `<title>` (app/accueil/metadata.ts, inchangé).
   *
   * ⚠️ NE PAS Y REMETTRE LE NIVEAU : « du CP à la Terminale », « de A1 à B2 »
   * sont déjà dans `phrase`, juste en dessous. Deux fois la même information
   * dans le même bloc, c'est une ligne de titre perdue.
   */
  titreBandeau: string;
  /** La phrase du bandeau, deux lignes maximum. */
  phrase: string;
  /** La route du coach — /coach-ia/<slug>. ⚠️ « anglais » côté site,
   *  « english-maths » côté SubjectCode : la traduction se fait dans le coach,
   *  pas ici (voir lib/matrice/suggestions.ts). */
  slug: string;
  /** La clé de NOTIONS_COACH, et celle des registres de fiches. */
  cle: string;
  /** Les niveaux affichés, dans l'ordre d'affichage. */
  niveaux: Niveau[];
};

export type Niveau = {
  /** Ce que le coach attend dans `?classe=`. */
  id: string;
  /** La pastille de couleur, à gauche de la carte : « 6e », « CM2 », « A1 ». */
  label: string;
  /** Le titre de la carte, en toutes lettres : « Sixième ». Un enfant de CP ne
   *  lit pas « CP », il lit ce que la maîtresse dit. */
  nom: string;
  /** La précision qui évite une erreur de clic : « tronc commun », « débutant ». */
  sous?: string;
};

/* ⭐ LA LISTE SE LIT DE LA TERMINALE AU CP (Frédéric, 23/09/2026 : « change
   l'ordre d'affichage des classes »), et c'est la même décision que celle qu'il
   a prise le 13/09 pour la colonne du coach : « plutôt que de démarrer sur CP
   et aller vers adulte, je préfère inversé ».
   Ici la raison n'est plus la coupure de la colonne — cette page ne coupe rien
   — mais l'ordre de lecture : le public du site est au lycée et au collège,
   donc il est servi en premier, et le primaire descend sous le pli.
   ⚠️ « Adultes » reste EN DERNIER : ce n'est pas une classe, il ferait une
   drôle de première ligne. STMG juste avant, même raison.
   ⚠️ Les paliers A1 → B2 gardent leur ordre : voir NIVEAUX_CECRL. */
const PRIMAIRE: Niveau[] = [
  { id: "cm2", label: "CM2", nom: "Cours moyen 2" },
  { id: "cm1", label: "CM1", nom: "Cours moyen 1" },
  { id: "ce2", label: "CE2", nom: "Cours élémentaire 2" },
  { id: "ce1", label: "CE1", nom: "Cours élémentaire 1" },
  { id: "cp", label: "CP", nom: "Cours préparatoire" },
];

const COLLEGE: Niveau[] = [
  { id: "3e", label: "3e", nom: "Troisième" },
  { id: "4e", label: "4e", nom: "Quatrième" },
  { id: "5e", label: "5e", nom: "Cinquième" },
  { id: "6e", label: "6e", nom: "Sixième" },
];

const CLASSES_MATHS: Niveau[] = [
  { id: "terminale-spe", label: "Term", nom: "Terminale", sous: "spécialité maths" },
  { id: "premiere-spe", label: "1re spé", nom: "Première", sous: "spécialité maths" },
  { id: "premiere", label: "1re", nom: "Première", sous: "tronc commun" },
  { id: "seconde", label: "2de", nom: "Seconde" },
  ...COLLEGE,
  ...PRIMAIRE,
  { id: "stmg", label: "STMG", nom: "Série STMG", sous: "première et terminale" },
  { id: "adulte", label: "Adultes", nom: "Adultes", sous: "reprise d'études" },
];

const CLASSES_FRANCAIS: Niveau[] = [
  { id: "seconde", label: "2de", nom: "Seconde" },
  ...COLLEGE,
  ...PRIMAIRE,
];

/** ⚠️ NI L'ANGLAIS NI L'ESPAGNOL NE SE RANGENT PAR CLASSE, et c'est voulu : on
 *  n'apprend pas une langue au rythme du collège. Le CECRL, comme dans le
 *  coach. Même chose pour l'économie. */
const NIVEAUX_CECRL: Niveau[] = [
  { id: "a1", label: "A1", nom: "Niveau A1", sous: "on démarre" },
  { id: "a2", label: "A2", nom: "Niveau A2", sous: "les bases tiennent" },
  { id: "b1", label: "B1", nom: "Niveau B1", sous: "on se débrouille" },
  { id: "b2", label: "B2", nom: "Niveau B2", sous: "on argumente" },
];

export const MATIERES: MatiereAccueil[] = [
  {
    id: "maths",
    label: "Mathématiques",
    titreBandeau: "Cours et exercices de maths corrigés",
    phrase:
      "Choisis ta classe, puis la notion : le coach pose les questions, corrige, et explique sans faire à ta place. Du CP à la Terminale.",
    slug: "maths",
    cle: "maths",
    niveaux: CLASSES_MATHS,
  },
  {
    id: "francais",
    label: "Français",
    titreBandeau: "Cours et exercices de français corrigés",
    phrase:
      "Conjugaison, accords, analyse de la phrase, orthographe : le coach reprend notion par notion, avec la correction immédiate.",
    slug: "francais",
    cle: "francais",
    niveaux: CLASSES_FRANCAIS,
  },
  {
    id: "economie",
    label: "Économie",
    titreBandeau: "Comprendre l’économie",
    phrase:
      "L'argent, l'entreprise, l'impôt, l'inflation : les mots de l'économie expliqués un par un, avec des exercices corrigés.",
    slug: "economie",
    cle: "economie",
    niveaux: NIVEAUX_CECRL,
  },
  {
    id: "anglais",
    label: "Anglais",
    titreBandeau: "Exercices d’anglais corrigés",
    phrase:
      "Vocabulaire, verbes irréguliers, temps et compréhension : entraîne-toi à ton niveau réel, de A1 à B2.",
    slug: "anglais",
    cle: "anglais",
    niveaux: NIVEAUX_CECRL,
  },
  {
    id: "espagnol",
    label: "Espagnol",
    titreBandeau: "Exercices d’espagnol corrigés",
    phrase:
      "Ser ou estar, conjugaison, vocabulaire du quotidien : le coach t'entraîne à ton niveau, de A1 à B2.",
    slug: "espagnol",
    cle: "espagnol",
    niveaux: NIVEAUX_CECRL,
  },
  {
    id: "ia",
    label: "IA",
    titreBandeau: "Intelligence artificielle et Pix IA",
    phrase:
      "Modèles, apprentissage, usages, limites et enjeux : les compétences du référentiel Pix IA, du collège au lycée.",
    slug: "ia",
    cle: "ia",
    niveaux: [
      { id: "pix-college", label: "Collège", nom: "Collège", sous: "référentiel Pix IA" },
      { id: "pix-lycee", label: "Lycée", nom: "Lycée", sous: "référentiel Pix IA" },
    ],
  },
];

export function matierePar(id: string): MatiereAccueil {
  return MATIERES.find((m) => m.id === id) ?? MATIERES[0];
}

/** Les notions d'un niveau, telles que le coach les connaît. Liste vide si le
 *  niveau n'est pas servi — la carte le dit alors au lieu de mentir. */
export function notionsDe(cle: string, niveau: string) {
  return NOTIONS_COACH[cle]?.[niveau] ?? [];
}

/* ── LA SECONDE LIGNE ───────────────────────────────────────────────────────
   ⛔ Elle ne NAVIGUE PAS : elle change le panneau du dessous, comme le
   « View by » d'IXL. Un onglet qui quitterait la page à chaque clic
   redonnerait cinq pages là où on vient d'en faire une. */
export const ACTIONS: { id: ActionId; label: string; court: string }[] = [
  { id: "coach", label: "Coach", court: "Coach" },
  { id: "evaluation", label: "Évaluation", court: "Évaluation" },
  { id: "fiche", label: "Fiche de cours", court: "Fiches" },
  { id: "photo", label: "Prendre en photo", court: "Photo" },
  { id: "lecon", label: "Leçon du jour", court: "Leçon" },
];

/* ── L'ÉVALUATION ANNUELLE : LA ROUTE EST `/parcours…`, PAS `/evaluation` ───
   ⛔ CORRIGÉ LE 23/09/2026, défaut signalé par Frédéric capture à l'appui :
   « il y a une erreur dans évaluation, il faut brancher sur parcours ».
   L'onglet pointait vers `/evaluation?matiere=…` — une page qui existe, mais
   qui n'est pas celle-là, et qui ne lit pas ce paramètre. Les quatre visiteurs
   sur cinq atterrissaient donc ailleurs que là où le bouton promettait.

   ⭐ LE PIÈGE EST DANS LE VOCABULAIRE, et il est connu : le mot affiché est
   « Évaluation annuelle » depuis le 14/09, mais **l'adresse est restée
   `/parcours`** — on a changé le libellé, pas la route. Chercher le mot du
   libellé dans les dossiers ne pouvait donc pas trouver la bonne page.
   Les titres le confirment, un par un : « Évaluation annuelle de maths »,
   « …de français », « …d'anglais », « …d'espagnol », « …d'IA ».

   ⚠️ L'ANGLAIS S'APPELLE `english-maths` ICI AUSSI — la même traduction que
   dans le coach (voir lib/matrice/suggestions.ts). Écrire `/parcours-anglais`
   donne une 404.
   ⛔ L'ÉCONOMIE N'A PAS DE PARCOURS : il n'y a pas de `/parcours-economie` sur
   le disque, et on ne l'invente pas. Le panneau le dit. */
export const PARCOURS: Partial<Record<MatiereId, string>> = {
  maths: "/parcours",
  francais: "/parcours-francais",
  anglais: "/parcours-english-maths",
  espagnol: "/parcours-espagnol",
  ia: "/parcours-ia",
};

/* ── LES ENTRÉES QUI QUITTENT LA PAGE, APRÈS UN FILET ───────────────────────
   Frédéric, 23/09 : « quand on sélectionne maths, après leçon du jour, rajoute
   calcul rapide et maths réel », puis « ou que calcul rapide ».
   Les deux sont posés ; retirer « Maths Réel » est une ligne à enlever ici.

   ⭐ CE SONT DES LIENS, PAS DES ONGLETS, et c'est la construction d'IXL : leur
   ligne de matières se termine par un filet vertical, puis « Recommendations |
   Skill plans | Awards » — qui, eux, quittent la page. Un onglet qui n'ouvrirait
   qu'une seule carte serait un panneau vide avec un bouton dedans ; ces deux-là
   sont des pages entières, on y va.
   ⛔ Propres aux maths : /calcul-rapide et /maths-974 n'existent pas ailleurs. */
export const LIENS_MATIERE: Partial<
  Record<MatiereId, { label: string; court: string; href: string }[]>
> = {
  maths: [
    { label: "Calcul rapide", court: "Calcul", href: "/calcul-rapide" },
    // Le titre exact de la page est « Maths Réel · 974 ».
    { label: "Maths Réel", court: "Réel", href: "/maths-974" },
  ],
};

/** Les pastilles de niveau, en couleurs qui tournent — la colonne colorée à
 *  gauche de chaque carte, chez IXL. Six teintes, reprises en boucle. */
/* ── LES RITUELS, PAR MATIÈRE ───────────────────────────────────────────────
   Frédéric, 23/09/2026 : « la leçon du jour n'est que pour les mathématiques —
   par contre tu peux rajouter des rituels, style dictée de la semaine, lorsqu'on
   clique sur français ».

   Il a raison, et le défaut était réel : l'onglet « Leçon du jour » montrait la
   Une, qui est en maths cette semaine. Un élève qui cliquait « Français » puis
   « Leçon du jour » tombait sur des fractions.

   ⭐ Et la sortie était DÉJÀ ÉCRITE, à d'autres adresses : le site a un rituel
   par matière depuis des mois (la dictée, les cinq mots d'anglais, ceux
   d'espagnol, les défis, le calcul rapide, la belle écriture). Ils vivaient
   dans le pied de page et dans /explorer — c'est-à-dire là où on va quand on
   sait déjà qu'ils existent.
   ⛔ AUCUNE ADRESSE INVENTÉE : les huit routes ci-dessous ont été vérifiées une
   par une sur le disque avant d'être écrites. C'est la règle de la Une (« pas de
   feuille, pas de bouton »). */
export type Rituel = { titre: string; texte: string; href: string };

export const RITUELS: Record<MatiereId, Rituel[]> = {
  maths: [
    {
      titre: "Les défis du jour",
      texte: "Trois défis neufs chaque matin, du calcul à la logique. Cinq minutes, pas plus.",
      href: "/defis-du-jour",
    },
    {
      titre: "Le calcul rapide",
      texte: "Cinq minutes d'automatismes, on recommence demain. C'est le rituel le plus court du site.",
      href: "/calcul-rapide",
    },
    {
      titre: "Qui suis-je ?",
      texte: "Un nombre se décrit, on le devine. À projeter en classe ou à faire à deux.",
      href: "/picto-maths",
    },
  ],
  francais: [
    {
      titre: "La dictée du jour",
      texte: "Une dictée par jour, lue à voix haute, corrigée mot à mot — du CP à la 3e.",
      href: "/dictee-du-jour",
    },
    {
      titre: "Toutes les dictées",
      texte: "La collection entière, par niveau et par difficulté, quand une par jour ne suffit pas.",
      href: "/dictee",
    },
    {
      titre: "La belle écriture",
      texte: "Tracer les lettres en cursive, une par une, dans le bon sens. Pour le CP et le CE1.",
      href: "/fiches-ecriture",
    },
  ],
  anglais: [
    {
      titre: "L'anglais du jour",
      texte: "Cinq mots par matin, prononcés, replacés dans une phrase. De A1 à B2.",
      href: "/anglais-du-jour",
    },
  ],
  espagnol: [
    {
      titre: "L'espagnol du jour",
      texte: "Cinq mots par matin, prononcés, replacés dans une phrase. De A1 à B2.",
      href: "/espagnol-du-jour",
    },
  ],
  // ⛔ NI L'IA NI L'ÉCONOMIE N'ONT DE RITUEL, et on l'écrit plutôt que de leur
  // prêter celui d'une autre matière. Le panneau le dit en une phrase et renvoie
  // au coach — la seule chose qui existe vraiment pour elles aujourd'hui.
  ia: [],
  economie: [],
};

export const TEINTES = [
  { chip: "bg-orange-500", bord: "border-orange-200", clair: "bg-orange-50", texte: "text-orange-700" },
  { chip: "bg-teal-500", bord: "border-teal-200", clair: "bg-teal-50", texte: "text-teal-700" },
  { chip: "bg-violet-500", bord: "border-violet-200", clair: "bg-violet-50", texte: "text-violet-700" },
  { chip: "bg-sky-500", bord: "border-sky-200", clair: "bg-sky-50", texte: "text-sky-700" },
  { chip: "bg-rose-500", bord: "border-rose-200", clair: "bg-rose-50", texte: "text-rose-700" },
  { chip: "bg-emerald-600", bord: "border-emerald-200", clair: "bg-emerald-50", texte: "text-emerald-700" },
];
