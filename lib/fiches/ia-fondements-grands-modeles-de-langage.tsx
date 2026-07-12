// ─── Fiche de cours : les grands modèles de langage (IA · Fondements 1.4) ─────
// Fiche IA coulée dans le moule « en blocs » : le contenu de l'ancienne page
// (lib/fiches-ia.ts, ficheLlm) vit ici sous forme de FicheCoursData. La page
// app/fiches-cours/ia/fondements/grands-modeles-de-langage n'est plus qu'un
// point d'entrée (SEO + rendu unifié).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

export const ficheGrandsModelesDeLangage: FicheCoursData = {
  matiere: "ia",
  matiereLabel: "IA",
  classe: "fondements",
  notion: "grands-modeles-de-langage",
  titre: "Les grands modèles de langage",
  accroche:
    "Les chatbots et autres assistants génératifs reposent sur de grands modèles de langage (LLM). Ils produisent du texte en prédisant, mot après mot, la suite la plus probable.",
  identite: [
    { label: "Prérequis", valeur: "IA générative" },
    { label: "Idée clé", valeur: "Prédire le mot suivant" },
    { label: "Risque", valeur: "Les hallucinations" },
  ],
  definition: {
    texte:
      "Un grand modèle de langage (LLM, pour large language model) est un modèle d'IA entraîné sur d'énormes quantités de textes, qui génère du texte en prédisant, mot après mot, la suite la plus probable à partir du contexte.",
  },
  proprietes: [
    {
      titre: "Le principe",
      texte:
        "Le modèle prédit le mot suivant le plus probable, à partir du contexte, pour construire sa réponse petit à petit.",
    },
    {
      titre: "L'entraînement",
      texte:
        "Pré-entraînement sur beaucoup de textes, puis alignement : des humains donnent des exemples et notent les réponses.",
    },
    {
      titre: "Les limites",
      texte:
        "Il ne vérifie pas la vérité. Il peut « halluciner » : inventer une information fausse présentée comme vraie.",
    },
    {
      titre: "L'hallucination",
      texte:
        "Une « hallucination » est une information inventée présentée comme vraie. Ce n'est pas un bug : c'est lié à la façon même dont le modèle génère du texte.",
    },
  ],
  reel: {
    texte:
      "Comprendre comment fonctionne un grand modèle de langage aide à bien l'utiliser : savoir pourquoi il peut inventer, et donc pourquoi il faut toujours vérifier ses réponses.",
  },
  historique: {
    texte:
      "Les grands modèles de langage actuels reposent sur l'architecture « transformer », publiée en 2017 par des chercheurs de Google. En novembre 2022, ChatGPT a mis ces modèles entre toutes les mains et atteint 100 millions d'utilisateurs en deux mois. Chaque modèle est d'abord « pré-entraîné » sur d'énormes quantités de textes du Web, puis des humains notent ses réponses pour l'améliorer (apprentissage par renforcement).",
  },
  formule: {
    contexte: "Comment le modèle construit sa réponse",
    expression: "prompt → mot suivant le plus probable → répété, mot après mot",
    legende:
      "Le modèle choisit le plus probable, pas forcément le vrai : aucune garantie de vérité.",
  },
  methode: [
    {
      titre: "Entrée",
      texte: "Ta requête, appelée « prompt ».",
    },
    {
      titre: "Traitement",
      texte: "Le modèle calcule le contexte, mot après mot.",
    },
    {
      titre: "Sortie",
      texte: "Les mots suivants les plus probables.",
    },
    {
      titre: "Limite",
      texte: "Aucune garantie de vérité → il faut vérifier.",
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Repérer une hallucination",
      donnees: "Une IA cite, avec assurance, un livre qui n'existe pas.",
      question: "Que fais-tu ?",
      solution:
        "Tu vérifies que le livre existe vraiment avant de le citer : c'est probablement une hallucination.",
    },
  ],
  pieges: [
    "Croire que le modèle « sait » si c'est vrai.",
    "Prendre une réponse fluide et sûre d'elle pour une réponse exacte.",
    "Recopier sans vérifier les informations importantes.",
  ],
  aRetenir: [
    "Un grand modèle de langage prédit le mot suivant le plus probable.",
    "Il est pré-entraîné sur d'énormes textes, puis affiné par des humains.",
    "Il ne garantit pas la vérité : il peut halluciner.",
    "On vérifie toujours les informations importantes.",
  ],
  entrainement: [
    {
      question: "Comment un chatbot construit-il sa réponse ?",
      correction:
        "En prédisant, mot après mot, la suite la plus probable à partir du contexte.",
    },
    {
      question: "Qu'est-ce qu'une hallucination ?",
      correction: "Une information inventée par l'IA et présentée comme vraie.",
    },
    {
      question:
        "Quel est le rôle des humains dans l'entraînement d'un modèle de langage ?",
      correction:
        "Donner des exemples et noter les réponses pour améliorer le modèle.",
    },
  ],
  coachHref: "/coach-ia/ia",
};

export const slidesGrandsModelesDeLangage: ClasseSlide[] = [];
