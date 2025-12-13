// data/profsPresets.ts

export type NiveauProf = "basique" | "standard" | "expert";

export type MethodeProf =
  | "methode_active"
  | "enseignement_explicite"
  | "inductive"
  | "deductive"
  | "par_projet"
  | "par_problemes"
  | "cooperative"
  | "ludique"
  | "magistrale";

export type OutputStyleProf = "simple" | "word" | "word_expert";

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

  // ✅ AJOUTS
  methode?: MethodeProf;
  outputStyle?: OutputStyleProf;
};

export const PROFS_PRESETS: Record<
  ProfsPresetKey,
  { label: string; description: string; valeurs: ProfsPresetValues }
> = {
  "6e_maths_fractions_remediation": {
    label: "🟣 6e – Fractions (remédiation)",
    description: "Reprendre les bases des fractions avec manipulation + exemples concrets.",
    valeurs: {
      titre: "6e – Revoir les fractions en douceur",
      classe: "6e",
      matiere: "Mathématiques",
      niveau: "basique",
      type: "Génération d’exercices",
      objectifPedagogique:
        "Comprendre le sens des fractions simples et les comparer, via des situations concrètes (partages, recettes…).",
      contenu:
        "Je voudrais une fiche guidée sur les fractions en 6e (représentation, comparaison, simplification) avec beaucoup d’exemples concrets et une progression très douce.",
      tags: ["fractions", "remédiation", "6e"],
      adaptationDYS: true,
      neuro: true,

      methode: "methode_active",
      outputStyle: "word",
    },
  },

  "3e_maths_brevet_global": {
    label: "📘 3e – Révision globale brevet (maths)",
    description: "Sujet type brevet : calcul, fonctions, stats, proba.",
    valeurs: {
      titre: "3e – Révision globale brevet maths",
      classe: "3e",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’un sujet type brevet",
      objectifPedagogique:
        "Réviser les compétences clés du brevet à travers un sujet structuré + barème.",
      contenu:
        "Je souhaite un sujet type brevet en maths pour une 3e : calcul, fonctions, statistiques et probabilités, avec barème et corrigé détaillé.",
      tags: ["brevet", "3e", "révision globale"],
      adaptationDYS: true,
      neuro: true,

      methode: "deductive",
      outputStyle: "word_expert",
    },
  },

  "2nde_maths_fonctions": {
    label: "📈 Seconde – Fonctions (séance)",
    description: "Séance de découverte/réactivation + exercices progressifs.",
    valeurs: {
      titre: "Seconde – Introduction aux fonctions",
      classe: "Seconde",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’une séance",
      objectifPedagogique:
        "Revoir la notion de fonction, lecture graphique, tableaux de valeurs, interprétation.",
      contenu:
        "Préparer une séance de découverte/réactivation sur les fonctions en Seconde, avec accroche, activités courtes, puis 4 à 6 exercices progressifs.",
      tags: ["fonctions", "seconde", "méthode"],
      adaptationDYS: true,
      neuro: true,

      methode: "enseignement_explicite",
      outputStyle: "word",
    },
  },

  "1re_spe_maths_second_degre": {
    label: "🧮 1re spé maths – Second degré",
    description: "Formes, sommet, racines, variations, méthode.",
    valeurs: {
      titre: "1re spé – Fonctions du second degré",
      classe: "Première",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’une séance",
      objectifPedagogique:
        "Passer entre formes développée/canonique/factorisée et interpréter les paramètres.",
      contenu:
        "Je veux une séance complète sur les fonctions du second degré pour une 1re spé : cours + exercices différenciés + erreurs fréquentes.",
      tags: ["second degré", "première spé", "méthode"],
      adaptationDYS: true,
      neuro: true,

      methode: "enseignement_explicite",
      outputStyle: "word_expert",
    },
  },

  "term_spe_maths_annale_bac": {
    label: "🎓 Terminale spé – Annale bac",
    description: "Sujet bac complet + corrigé rédigé + méthode.",
    valeurs: {
      titre: "Terminale spé – Sujet type bac complet",
      classe: "Terminale",
      matiere: "Mathématiques",
      niveau: "expert",
      type: "Préparation d’un sujet type bac",
      objectifPedagogique:
        "Préparer à l’épreuve écrite avec un sujet complet + corrigé commenté.",
      contenu:
        "Génère un sujet type bac complet de spé maths Terminale (3 ou 4 exos variés), avec corrigé détaillé et commentaires méthodologiques.",
      tags: ["bac", "annale", "terminale spé"],
      adaptationDYS: false,
      neuro: true,

      methode: "deductive",
      outputStyle: "word_expert",
    },
  },

  "1re_francais_lecture_analytique": {
    label: "📚 1re – Lecture analytique (français)",
    description: "Lecture analytique guidée pour l’oral.",
    valeurs: {
      titre: "Première – Lecture analytique pour l’oral",
      classe: "Première",
      matiere: "Français",
      niveau: "standard",
      type: "Préparation de lecture analytique",
      objectifPedagogique:
        "Structurer une lecture analytique (intro, axes, procédés, bilan, ouverture).",
      contenu:
        "Je souhaite une lecture analytique guidée d’un extrait (niveau 1re), avec questions, axes d’analyse et une préparation à l’oral.",
      tags: ["lecture analytique", "oral", "première"],
      adaptationDYS: true,
      neuro: true,

      methode: "inductive",
      outputStyle: "word_expert",
    },
  },

  "term_philo_dissertation": {
    label: "💭 Terminale – Dissertation philo",
    description: "Méthode + plan + exemple guidé.",
    valeurs: {
      titre: "Terminale – Dissertation de philosophie",
      classe: "Terminale",
      matiere: "Philosophie",
      niveau: "standard",
      type: "Préparation d’un sujet de dissertation",
      objectifPedagogique:
        "Problématiser, construire un plan, exemples, transitions, conclusion.",
      contenu:
        "Préparer une fiche méthode + un exemple guidé de dissertation de philosophie sur un sujet classique (liberté, justice, bonheur…).",
      tags: ["philosophie", "dissertation", "méthode"],
      adaptationDYS: true,
      neuro: true,

      methode: "deductive",
      outputStyle: "word",
    },
  },

  "2nde_physique_mouvements": {
    label: "🔬 Seconde – Physique (mouvements)",
    description: "Activité + exercices sur mouvements rectilignes.",
    valeurs: {
      titre: "Seconde – Mouvements en physique",
      classe: "Seconde",
      matiere: "Physique-Chimie",
      niveau: "standard",
      type: "Conception d’activité expérimentale",
      objectifPedagogique:
        "Découvrir vitesse moyenne, graphique distance-temps, mouvement rectiligne.",
      contenu:
        "Je veux une activité expérimentale simple sur les mouvements en Seconde (graphique distance-temps, vitesse moyenne) suivie de quelques exercices d’application.",
      tags: ["physique", "mouvements", "seconde"],
      adaptationDYS: true,
      neuro: true,

      methode: "par_problemes",
      outputStyle: "word",
    },
  },
};

