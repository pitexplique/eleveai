// data/profsPresets.ts

export type NiveauProf = "basique" | "standard" | "expert";

export type ProfsPresetKey =
  | "6e_maths_fractions_remediation"
  | "3e_maths_brevet_global"
  | "2nde_maths_fonctions"
  | "1re_spe_maths_second_degre"
  | "term_spe_maths_annale_bac"
  | "1re_francais_lecture_analytique"
  | "term_philo_dissertation"
  | "2nde_physique_mouvements";

export type ProfsPresetValues = {
  titre?: string;
  objectifPedagogique?: string;
  classe?: string;
  matiere?: string;
  niveau?: NiveauProf;
  type?: string;
  contenu?: string;
  tags?: string[];
  adaptationDYS?: boolean;
  neuro?: boolean;
};

export const PROFS_PRESETS: Record<
  ProfsPresetKey,
  { label: string; description: string; valeurs: ProfsPresetValues }
> = {
  "6e_maths_fractions_remediation": {
    label: "🟣 6e – Fractions (remédiation)",
    description:
      "Reprendre les bases des fractions avec beaucoup de manipulation et d’exemples concrets.",
    valeurs: {
      titre: "6e – Revoir les fractions en douceur",
      classe: "6e",
      matiere: "Mathématiques",
      niveau: "basique",
      type: "Génération d’exercices",
      objectifPedagogique:
        "Amener les élèves à comprendre le sens des fractions simples et à les comparer, avec des situations concrètes (partages, recettes…).",
      contenu:
        "Je voudrais une fiche d’exercices guidés sur les fractions en 6e (représentation, comparaison, simplification) avec beaucoup d’exemples concrets.",
      tags: ["fractions", "remédiation", "6e"],
      adaptationDYS: true,
      neuro: true,
    },
  },

  "3e_maths_brevet_global": {
    label: "📘 3e – Révision globale brevet (maths)",
    description:
      "Chapitre de révision type brevet : calcul, fonctions, statistiques, probabilités.",
    valeurs: {
      titre: "3e – Révision globale brevet maths",
      classe: "3e",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’un sujet type brevet",
      objectifPedagogique:
        "Permettre à la classe de réviser l’ensemble des compétences clés du brevet en maths sur un chapitre de synthèse.",
      contenu:
        "Je souhaite un sujet type brevet en maths pour une classe de 3e : calcul numérique, fonctions, statistiques et probabilités, avec corrigé détaillé.",
      tags: ["brevet", "3e", "révision globale"],
      adaptationDYS: true,
      neuro: true,
    },
  },

  "2nde_maths_fonctions": {
    label: "📈 Seconde – Fonctions (cours + exercices)",
    description:
      "Séance de réactivation sur la notion de fonctions en Seconde avec exercices progressifs.",
    valeurs: {
      titre: "Seconde – Introduction aux fonctions",
      classe: "Seconde",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’une séance",
      objectifPedagogique:
        "Rappeler la notion de fonction, de représentation graphique et de lecture de graphique en Seconde.",
      contenu:
        "Préparer une séance de découverte/réactivation sur les fonctions en Seconde, avec rappel de la notion, lecture graphique, tableaux de valeurs et 4 à 6 exercices progressifs.",
      tags: ["fonctions", "seconde", "reprise de notions"],
      adaptationDYS: true,
      neuro: true,
    },
  },

  "1re_spe_maths_second_degre": {
    label: "🧮 1re spé maths – Second degré",
    description:
      "Séance complète sur les fonctions du second degré : formes, variations, racines.",
    valeurs: {
      titre: "1re spé – Fonctions du second degré",
      classe: "Première",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’une séance",
      objectifPedagogique:
        "Amener les élèves à passer de la forme développée à la forme canonique/factorisée et à interpréter les paramètres d’une fonction du second degré.",
      contenu:
        "Je veux une séance complète sur les fonctions du second degré (formes, sommet, racines, variations) pour une 1re spécialité maths, avec une partie cours et une partie exercices.",
      tags: ["second degré", "première spé", "bac"],
      adaptationDYS: true,
      neuro: true,
    },
  },

  "term_spe_maths_annale_bac": {
    label: "🎓 Terminale spé – Annale de bac",
    description:
      "Sujet d’annale type bac en plusieurs parties, avec corrigé rédigé et commenté.",
    valeurs: {
      titre: "Terminale spé – Sujet type bac complet",
      classe: "Terminale",
      matiere: "Mathématiques",
      niveau: "expert",
      type: "Préparation d’un sujet type bac",
      objectifPedagogique:
        "Préparer les élèves à l’épreuve écrite de spécialité maths avec un sujet complet type bac.",
      contenu:
        "Génère un sujet type bac complet de spécialité maths Terminale (3 ou 4 exercices variés), avec corrigé détaillé et commentaires méthodologiques.",
      tags: ["bac", "annale", "terminales spé"],
      adaptationDYS: false,
      neuro: true,
    },
  },

  "1re_francais_lecture_analytique": {
    label: "📚 1re – Lecture analytique (français)",
    description:
      "Préparer une lecture analytique guidée pour l’oral de français.",
    valeurs: {
      titre: "Première – Lecture analytique pour l’oral",
      classe: "Première",
      matiere: "Français",
      niveau: "standard",
      type: "Préparation de lecture analytique",
      objectifPedagogique:
        "Aider les élèves à structurer une lecture analytique pour l’oral de français (introduction, axes, conclusion).",
      contenu:
        "Je souhaite une lecture analytique guidée d’un extrait littéraire (au choix, niveau 1re), avec questions de compréhension, axes d’analyse et préparation à l’oral.",
      tags: ["lecture analytique", "oral", "première"],
      adaptationDYS: true,
      neuro: true,
    },
  },

  "term_philo_dissertation": {
    label: "💭 Terminale – Dissertation de philosophie",
    description:
      "Aider les élèves à construire un plan de dissertation à partir d’un sujet simple.",
    valeurs: {
      titre: "Terminale – Méthode de dissertation de philosophie",
      classe: "Terminale",
      matiere: "Philosophie",
      niveau: "standard",
      type: "Préparation d’un sujet de dissertation",
      objectifPedagogique:
        "Aider les élèves à problématiser un sujet, construire un plan en 3 parties et annoncer une conclusion.",
      contenu:
        "Préparer une fiche méthode + un exemple guidé de dissertation de philosophie sur un sujet classique (liberté, justice, bonheur…).",
      tags: ["philosophie", "dissertation", "méthode"],
      adaptationDYS: true,
      neuro: true,
    },
  },

  "2nde_physique_mouvements": {
    label: "🔬 Seconde – Physique (mouvements)",
    description:
      "Activité expérimentale + exercices sur les mouvements rectilignes.",
    valeurs: {
      titre: "Seconde – Mouvements en physique",
      classe: "Seconde",
      matiere: "Physique-Chimie",
      niveau: "standard",
      type: "Conception d’activité expérimentale",
      objectifPedagogique:
        "Faire découvrir les notions de vitesse moyenne, graphique distance-temps et mouvement rectiligne en Seconde.",
      contenu:
        "Je veux une activité expérimentale simple sur les mouvements en Seconde (graphique distance-temps, vitesse moyenne) suivie de quelques exercices d’application.",
      tags: ["physique", "mouvements", "seconde"],
      adaptationDYS: true,
      neuro: true,
    },
  },
};


