// ─── Fiche de cours IA : définir l'intelligence artificielle (Fondements) ──────
// Fiche « en blocs » : le contenu vient de l'ancienne ficheDefinirIa
// (lib/fiches-ia.ts, référentiel Pix IA, compétence 1.1), coulé dans le
// schéma FicheCoursData. Pas de formule : la notion n'en a pas.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

export const ficheDefinirLIa: FicheCoursData = {
  matiere: "ia",
  matiereLabel: "IA",
  classe: "fondements",
  notion: "definir-l-ia",
  titre: "Qu'est-ce que l'intelligence artificielle ?",
  accroche:
    "L'intelligence artificielle (IA) est un domaine scientifique qui cherche à faire réaliser à des machines des tâches « intelligentes » : reconnaître, prédire, décider, créer. Ce n'est pas un seul logiciel, ni forcément un robot.",
  identite: [
    { label: "Prérequis", valeur: "De la curiosité" },
    { label: "Idée clé", valeur: "L'IA est une discipline, pas un produit" },
    { label: "Repère", valeur: "Née dans les années 1950" },
  ],
  definition: {
    texte:
      "L'intelligence artificielle est une discipline scientifique qui cherche à modéliser des mécanismes de l'intelligence pour faire réaliser à des machines des tâches dites « intelligentes » : reconnaître, prédire, décider, créer.",
  },
  proprietes: [
    {
      titre: "Une discipline scientifique",
      texte:
        "L'IA cherche à modéliser des mécanismes de l'intelligence pour faire réaliser des tâches complexes à des machines.",
    },
    {
      titre: "Deux grandes approches",
      texte:
        "L'IA symbolique (des règles écrites par des humains) et l'apprentissage automatique (apprendre à partir de données).",
    },
    {
      titre: "Pourquoi ça a explosé",
      texte:
        "Depuis les années 2000 : plus de puissance de calcul et des données massives (big data) ont fait bondir l'IA.",
    },
    {
      titre: "Attention au langage",
      texte:
        "Dire « une IA » pour un chatbot est un raccourci. À l'origine, « IA » désigne une discipline, pas un logiciel précis.",
    },
  ],
  reel: {
    texte:
      "Comprendre ce qu'est vraiment l'IA aide à ne pas la sur- ni sous-estimer : savoir ce qu'elle peut faire, ses limites, et garder un regard critique sur les outils qu'on utilise tous les jours.",
  },
  historique: {
    texte:
      "Le terme « intelligence artificielle » est né en 1956, à la conférence de Dartmouth. La discipline a connu des hauts et des bas — on parle même des « hivers de l'IA », des périodes où l'argent et l'intérêt ont chuté.",
  },
  methode: [],
  usages: [],
  exemples: [
    {
      titre: "IA ou pas IA ?",
      donnees: "Un clavier qui propose le mot suivant quand tu écris un SMS.",
      question: "Est-ce de l'IA ?",
      solution:
        "Oui : il prédit le mot le plus probable (apprentissage automatique). À l'inverse, un interrupteur n'est pas de l'IA.",
    },
  ],
  pieges: [
    "Croire que « IA » veut dire « robot ».",
    "Penser qu'une IA « comprend » comme un être humain.",
    "Confondre la discipline (l'IA) et un logiciel précis (un chatbot).",
  ],
  aRetenir: [
    "L'IA est un domaine scientifique, pas un produit unique.",
    "Deux approches : symbolique (règles) et apprentissage automatique (données).",
    "Le bond récent vient de la puissance de calcul et des données massives.",
    "« Une IA » est souvent un raccourci de langage.",
  ],
  entrainement: [
    {
      question: "Vrai ou faux : une IA est toujours un robot.",
      correction:
        "Faux : l'IA est surtout une discipline et des logiciels ; un robot n'est qu'un cas particulier (l'IA incarnée).",
    },
    {
      question: "Cite les deux grandes approches de l'IA.",
      correction:
        "L'IA symbolique (des règles écrites) et l'apprentissage automatique (apprendre à partir de données).",
    },
    {
      question: "Pourquoi l'IA a-t-elle beaucoup progressé depuis les années 2000 ?",
      correction:
        "Grâce à l'augmentation de la puissance de calcul et à la collecte de données massives (big data).",
    },
  ],
  coachHref: "/coach-ia/ia",
};

export const slidesDefinirLIa: ClasseSlide[] = [];
