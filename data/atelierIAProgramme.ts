// data/atelierIAProgramme.ts

export type RecommandationGenerateur = {
  label: string;        // Texte affiché
  href: string;         // Lien
  type: "eleves" | "atelier"; // Pour badge/couleur/icone si besoin
};

export type Seance = {
  titre: string;
  objectif: string;
  duree: string;
  activites: string[];
  trace: string;
  badge?: string;
  recommandation?: RecommandationGenerateur;
};


export const SEANCES: Seance[] = [
  {
    titre: "Séance 1 — L’IA, c’est quoi (et c’est quoi le piège) ?",
    objectif: "Comprendre ce que l’IA fait… et surtout ce qu’elle ne fait pas.",
    duree: "45–55 min",
    activites: [
      "Mini-démo : 2 réponses différentes à la même question",
      "Jeu : repérer les phrases “trop sûres” / “trop floues”",
      "Règle d’or : une réponse IA = une hypothèse à vérifier",
    ],
    trace: "Prompt + réponse IA + 3 points : vrai / douteux / à vérifier.",
    badge: "Départ",
    recommandation: {
      label: "Ouvrir le générateur Élèves (cours, leçons)",
      href: "/espace-eleves",
      type: "eleves",
    },
  },

  {
    titre: "Séance 2 — Le Bon Prompt (clarifier la demande)",
    objectif: "Apprendre à poser une question claire, précise et utile.",
    duree: "45–55 min",
    activites: [
      "Avant/Après : transformer un prompt mauvais en prompt efficace",
      "Checklist : contexte + niveau + objectif + format attendu",
      "Défi : obtenir une explication compréhensible pour un(e) camarade",
    ],
    trace: "Version 1 du prompt → version améliorée → pourquoi c’est mieux.",
    badge: "Méthode",
    recommandation: {
      label: "S’entraîner avec le générateur Élèves",
      href: "/espace-eleves",
      type: "eleves",
    },
  },

  {
    titre: "Séance 3 — Vérifier : l’IA peut se tromper",
    objectif: "Développer l’esprit critique : vérifier une info, un calcul, une définition.",
    duree: "45–55 min",
    activites: [
      "Chasse aux erreurs : 5 réponses IA, 5 erreurs à repérer",
      "Outils de vérification : cours, manuel, logique, exemples, sources",
      "Règle : jamais “copier-coller”, toujours “relire-corriger”",
    ],
    trace: "Tableau : erreur repérée → correction → justification.",
    badge: "Critique",
    recommandation: {
      label: "Tester et corriger via le générateur Élèves",
      href: "/espace-eleves",
      type: "eleves",
    },
  },

  {
    titre: "Séance 4 — Réécrire avec style (sans tricher)",
    objectif: "Utiliser l’IA pour améliorer une production personnelle.",
    duree: "45–55 min",
    activites: [
      "Réécriture : rendre plus clair, plus court, plus structuré",
      "Vocabulaire : expliquer des mots difficiles",
      "DYS-friendly : aérer, simplifier, étapes",
    ],
    trace: "Mon texte → version améliorée → ce que j’ai changé moi-même.",
    badge: "Rédaction",
    recommandation: {
      label: "Améliorer un texte avec le générateur Élèves",
      href: "/espace-eleves",
      type: "eleves",
    },
  },

  {
    titre: "Séance 5 — Préparer un contrôle (plan de révision intelligent)",
    objectif: "Transformer un cours en plan de révision efficace.",
    duree: "45–55 min",
    activites: [
      "Lister les notions + exemples",
      "Créer un plan en 15 minutes (flashcards / exercices / erreurs fréquentes)",
      "Auto-test : mini QCM + corrections expliquées",
    ],
    trace: "Plan de révision + 10 questions d’auto-test + réponses.",
    badge: "Révisions",
    recommandation: {
      label: "Construire un plan avec le générateur Élèves",
      href: "/espace-eleves",
      type: "eleves",
    },
  },

  {
    titre: "Séance 6 — Mini-projet : produire + analyser",
    objectif: "Faire une production finale avec traces IA + analyse critique.",
    duree: "55 min (ou 2×45 min)",
    activites: [
      "Choix d’un thème (cours, exposé, affiche, fiche méthode)",
      "Production avec IA autorisée mais encadrée",
      "Bilan : ce que l’IA m’a apporté / ce que j’ai corrigé",
    ],
    trace: "Dossier final : prompt(s) + réponse(s) + correction perso + analyse.",
    badge: "Final",
    recommandation: {
      label: "Ouvrir le générateur Atelier-IA (agir, écologie, solutions)",
      href: "/espace-atelier-IA",
      type: "atelier",
    },
  },
];

