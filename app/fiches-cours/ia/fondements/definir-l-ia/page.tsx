import type { Metadata } from "next";
import FicheCoursIa, { type FicheIaData } from "@/components/fiches/FicheCoursIa";

export const metadata: Metadata = {
  title: "Fiche IA — Qu'est-ce que l'intelligence artificielle ?",
  description:
    "Définir l'IA, son histoire et ses approches. Fiche de cours IA (référentiel Pix, domaine Fondements).",
};

export const fiche: FicheIaData = {
  domaineId: "1",
  domaineLabel: "Fondements",
  competence: "1.1",
  titre: "Qu'est-ce que l'intelligence artificielle ?",
  intro:
    "L'intelligence artificielle (IA) est un domaine scientifique qui cherche à faire réaliser à des machines des tâches « intelligentes » : reconnaître, prédire, décider, créer. Ce n'est pas un seul logiciel, ni forcément un robot.",
  identite: [
    { label: "Prérequis", valeur: "De la curiosité" },
    { label: "Idée clé", valeur: "L'IA est une discipline, pas un produit" },
    { label: "Repère", valeur: "Née dans les années 1950" },
  ],
  aQuoiCaSert:
    "Comprendre ce qu'est vraiment l'IA aide à ne pas la sur- ni sous-estimer : savoir ce qu'elle peut faire, ses limites, et garder un regard critique sur les outils qu'on utilise tous les jours.",
  leSavaisTu:
    "Le terme « intelligence artificielle » est né en 1956, à la conférence de Dartmouth. La discipline a connu des hauts et des bas — on parle même des « hivers de l'IA », des périodes où l'argent et l'intérêt ont chuté.",
  notions: [
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
  ],
  pointsCles: {
    titre: "Les repères clés",
    lignes: [
      { cle: "Définition", detail: "Faire réaliser des tâches « intelligentes » à des machines." },
      { cle: "Symbolique", detail: "Raisonner avec des règles écrites par des humains." },
      { cle: "Apprentissage auto.", detail: "Apprendre des comportements à partir de données." },
      { cle: "Moteurs de progrès", detail: "Puissance de calcul + données massives (big data)." },
    ],
    callout:
      "Attention au langage : dire « une IA » pour un chatbot est un raccourci. À l'origine, « IA » désigne une discipline, pas un logiciel précis.",
  },
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
};

export default function DefinirIaPage() {
  return <FicheCoursIa fiche={fiche} />;
}
