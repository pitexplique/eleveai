// data/elevesPresets.ts

export type Classe =
  | "6e" | "5e" | "4e" | "3e"
  | "Seconde" | "Première" | "Terminale" | "";

export type Confiance = "en_difficulte" | "moyen" | "a_l_aise";

export type TypeAide =
  | "manipuler_pour_comprendre"
  | "comprendre_le_cours"
  | "reviser_un_chapitre"
  | "preparer_un_controle"
  | "faire_des_exercices"
  | "methode_de_travail"
  | "defis";

export type DysType =
  | "dyslexie"
  | "dyspraxie"
  | "dyscalculie"
  | "dysorthographie"
  | "autre";

// ✅ NEW : Ton profil (centres d’intérêt)
export type ProfilEleve =
  | "sport"
  | "musique"
  | "nature"
  | "dessin"
  | "jeux_videos"
  | "amis";

export type PromptEleve = {
  prenom: string;
  classe: Classe;
  matiere: string;
  chapitre: string;
  typeAide: TypeAide | "";
  confiance: Confiance;
  tempsDispo: string;
  objectifPerso: string;
  exemplesDifficiles: string;
  prefereQuestions: boolean;
  prefereExemplesConcrets: boolean;
  adaptationDYS: boolean;
  dysTypes: DysType[];
  dysPrecisionAutre?: string;

  // ✅ NEW
  profil: ProfilEleve[];
};

export type ElevesPresetKey =
  | "6e_maths_calculs_base"
  | "6e_maths_fractions_debut"
  | "5e_maths_fractions_controle"
  | "4e_fr_orthographe"
  | "3e_maths_brevet_revision"
  | "3e_langues_oral"
  | "seconde_methodo"
  | "terminale_maths_fonctions";

export const ELEVES_PRESETS: Record<
  ElevesPresetKey,
  { label: string; description: string; badges?: string[]; valeurs: Partial<PromptEleve> }
> = {
  "6e_maths_calculs_base": {
    label: "🧩 6e – Calculs de base",
    description: "Additions / soustractions / multiplications, pas à pas.",
    badges: ["6e", "Maths", "Bases"],
    valeurs: {
      classe: "6e",
      matiere: "Mathématiques",
      chapitre: "Calculs de base (priorités simples, opérations)",
      typeAide: "manipuler_pour_comprendre",
      confiance: "en_difficulte",
      tempsDispo: "20 min",
      objectifPerso: "Je veux être plus rapide et faire moins d’erreurs.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
      profil: ["jeux_videos", "sport"],
    },
  },

  "6e_maths_fractions_debut": {
    label: "🍕 6e – Fractions (démarrage)",
    description: "Comprendre ce que veut dire 1/2, 3/4… avec dessins.",
    badges: ["6e", "Maths", "Fractions"],
    valeurs: {
      classe: "6e",
      matiere: "Mathématiques",
      chapitre: "Fractions : sens, représentation, comparaison simple",
      typeAide: "comprendre_le_cours",
      confiance: "moyen",
      tempsDispo: "25 min",
      objectifPerso: "Je veux comprendre les fractions avec des exemples faciles.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
      profil: ["dessin", "amis"],
    },
  },

  "5e_maths_fractions_controle": {
    label: "🟣 5e – Contrôle fractions",
    description: "Réviser : addition/soustraction/simplification.",
    badges: ["5e", "Maths", "Contrôle"],
    valeurs: {
      classe: "5e",
      matiere: "Mathématiques",
      chapitre: "Fractions : addition, soustraction, simplification",
      typeAide: "preparer_un_controle",
      confiance: "en_difficulte",
      tempsDispo: "30 min",
      objectifPerso: "Je veux réussir mon contrôle sans paniquer.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
      profil: ["sport", "jeux_videos"],
    },
  },

  "4e_fr_orthographe": {
    label: "✍️ 4e – Orthographe (sans se décourager)",
    description: "Accords + astuces + entraînement progressif.",
    badges: ["4e", "Français", "Exercices"],
    valeurs: {
      classe: "4e",
      matiere: "Français",
      chapitre: "Orthographe : accords, conjugaison, homophones",
      typeAide: "faire_des_exercices",
      confiance: "en_difficulte",
      tempsDispo: "20 min",
      objectifPerso: "Je veux faire moins de fautes dans mes textes.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
      profil: ["musique", "amis", "dessin"],
    },
  },

  "3e_maths_brevet_revision": {
    label: "🎯 3e – Révisions brevet maths",
    description: "Révision globale + mini test pour repérer tes points faibles.",
    badges: ["3e", "Maths", "Brevet"],
    valeurs: {
      classe: "3e",
      matiere: "Mathématiques",
      chapitre: "Brevet : calcul, géométrie, fonctions, probabilités",
      typeAide: "reviser_un_chapitre",
      confiance: "moyen",
      tempsDispo: "45 min",
      objectifPerso: "Je veux savoir ce que je dois revoir en priorité.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
      profil: ["sport", "jeux_videos"],
    },
  },

  "3e_langues_oral": {
    label: "🎤 3e – Anglais oral",
    description: "S’entraîner à parler, phrases simples + corrections.",
    badges: ["3e", "Langues", "Oral"],
    valeurs: {
      classe: "3e",
      matiere: "Langues",
      chapitre: "Oral : se présenter, parler de ses goûts",
      typeAide: "faire_des_exercices",
      confiance: "moyen",
      tempsDispo: "15 min",
      objectifPerso: "Je veux oser parler en anglais.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
      profil: ["musique", "amis", "sport"],
    },
  },

  "seconde_methodo": {
    label: "📘 Seconde – Méthode de travail",
    description: "Organisation, révisions, apprendre efficacement.",
    badges: ["Seconde", "Méthode"],
    valeurs: {
      classe: "Seconde",
      matiere: "Autre",
      chapitre: "Méthode : s’organiser, réviser, mémoriser",
      typeAide: "methode_de_travail",
      confiance: "moyen",
      tempsDispo: "20 min",
      objectifPerso: "Je veux arrêter de tout faire au dernier moment.",
      prefereQuestions: false,
      prefereExemplesConcrets: true,
      profil: ["sport", "jeux_videos"],
    },
  },

  "terminale_maths_fonctions": {
    label: "📈 Terminale – Fonctions",
    description: "Méthodes bac : variations, dérivée, lecture graphique.",
    badges: ["Terminale", "Maths", "Bac"],
    valeurs: {
      classe: "Terminale",
      matiere: "Mathématiques",
      chapitre: "Étude de fonctions : dérivation, variations, limites simples",
      typeAide: "reviser_un_chapitre",
      confiance: "moyen",
      tempsDispo: "40 min",
      objectifPerso: "Je veux réussir les exercices type bac sur les fonctions.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
      profil: ["sport", "nature"],
    },
  },
};
