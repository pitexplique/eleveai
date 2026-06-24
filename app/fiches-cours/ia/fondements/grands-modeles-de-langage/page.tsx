import type { Metadata } from "next";
import FicheCoursIa, { type FicheIaData } from "@/components/fiches/FicheCoursIa";

export const metadata: Metadata = {
  title: "Fiche IA — Les grands modèles de langage",
  description:
    "Comment fonctionne un chatbot : prédire le mot suivant, entraînement, hallucinations. Fiche de cours IA (référentiel Pix, Fondements).",
};

export const fiche: FicheIaData = {
  domaineId: "1",
  domaineLabel: "Fondements",
  competence: "1.4",
  titre: "Les grands modèles de langage",
  intro:
    "Les chatbots et autres assistants génératifs reposent sur de grands modèles de langage (LLM). Ils produisent du texte en prédisant, mot après mot, la suite la plus probable.",
  identite: [
    { label: "Prérequis", valeur: "IA générative" },
    { label: "Idée clé", valeur: "Prédire le mot suivant" },
    { label: "Risque", valeur: "Les hallucinations" },
  ],
  aQuoiCaSert:
    "Comprendre comment fonctionne un grand modèle de langage aide à bien l'utiliser : savoir pourquoi il peut inventer, et donc pourquoi il faut toujours vérifier ses réponses.",
  leSavaisTu:
    "Un grand modèle de langage est d'abord « pré-entraîné » sur d'énormes quantités de textes du Web. Puis des humains notent ses réponses pour l'améliorer (apprentissage par renforcement).",
  notions: [
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
  ],
  pointsCles: {
    titre: "Comment ça marche",
    lignes: [
      { cle: "Entrée", detail: "Ta requête, appelée « prompt »." },
      { cle: "Traitement", detail: "Le modèle calcule le contexte, mot après mot." },
      { cle: "Sortie", detail: "Les mots suivants les plus probables." },
      { cle: "Limite", detail: "Aucune garantie de vérité → il faut vérifier." },
    ],
    callout:
      "Une « hallucination » est une information inventée présentée comme vraie. Ce n'est pas un bug : c'est lié à la façon même dont le modèle génère du texte.",
  },
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
      correction: "En prédisant, mot après mot, la suite la plus probable à partir du contexte.",
    },
    {
      question: "Qu'est-ce qu'une hallucination ?",
      correction: "Une information inventée par l'IA et présentée comme vraie.",
    },
    {
      question: "Quel est le rôle des humains dans l'entraînement d'un modèle de langage ?",
      correction: "Donner des exemples et noter les réponses pour améliorer le modèle.",
    },
  ],
};

export default function GrandsModelesDeLangagePage() {
  return <FicheCoursIa fiche={fiche} />;
}
