import type { Metadata } from "next";
import FicheCoursIa, { type FicheIaData } from "@/components/fiches/FicheCoursIa";

export const metadata: Metadata = {
  title: "Fiche IA — L'apprentissage automatique",
  description:
    "Comment une IA apprend à partir de données : supervisé, non supervisé, renforcement. Fiche de cours IA (référentiel Pix, Fondements).",
};

export const fiche: FicheIaData = {
  domaineId: "1",
  domaineLabel: "Fondements",
  competence: "1.2",
  titre: "L'apprentissage automatique",
  intro:
    "L'apprentissage automatique (machine learning) donne aux machines la capacité d'apprendre un comportement à partir de données, au lieu de suivre des règles écrites à la main.",
  identite: [
    { label: "Prérequis", valeur: "Notion de données" },
    { label: "Idée clé", valeur: "Apprendre à partir d'exemples" },
    { label: "Mot clé", valeur: "Entraînement" },
  ],
  aQuoiCaSert:
    "C'est le cœur des IA modernes : reconnaissance d'images, traduction, recommandations, chatbots… Tous apprennent à partir de données plutôt que d'être programmés règle par règle.",
  leSavaisTu:
    "Le logiciel AlphaGo a d'abord appris en observant des millions de parties humaines (supervisé), puis s'est amélioré en jouant contre lui-même (renforcement) — jusqu'à battre les meilleurs joueurs de Go du monde.",
  notions: [
    {
      titre: "La phase d'entraînement",
      texte:
        "Le modèle ajuste ses paramètres sur des données pour réussir sa tâche, puis on le teste sur de nouvelles données.",
    },
    {
      titre: "Apprentissage supervisé",
      texte:
        "On fournit des exemples accompagnés de la bonne réponse : ce sont des données « étiquetées ».",
    },
    {
      titre: "Non supervisé & renforcement",
      texte:
        "Non supervisé : trouver des groupes dans des données non étiquetées. Renforcement : essais/erreurs pour gagner une récompense.",
    },
  ],
  pointsCles: {
    titre: "Les 3 types d'apprentissage",
    lignes: [
      { cle: "Supervisé", detail: "Exemples + bonnes réponses (données étiquetées)." },
      { cle: "Non supervisé", detail: "Trouver des structures dans des données non étiquetées." },
      { cle: "Renforcement", detail: "Essais et erreurs pour maximiser une récompense." },
      { cle: "Entraînement", detail: "Ajuster les paramètres, puis tester sur de nouvelles données." },
    ],
    callout:
      "Étiqueter une donnée, c'est lui donner la bonne réponse attendue. Exemple : marquer des photos « chat » ou « pas chat ».",
  },
  exemples: [
    {
      titre: "Trier des e-mails",
      donnees: "Tu veux séparer les e-mails en « spam » et « pas spam ».",
      question: "Quel apprentissage et quelles étiquettes ?",
      solution:
        "Apprentissage supervisé, avec les étiquettes « spam » / « pas spam » placées sur des exemples d'e-mails.",
    },
  ],
  pieges: [
    "Croire que le modèle « comprend » : il repère surtout des régularités statistiques.",
    "Oublier la phase de test (vérifier sur de nouvelles données).",
    "Confondre supervisé (avec réponses) et non supervisé (sans réponses).",
  ],
  aRetenir: [
    "Le modèle apprend à partir de données, pas de règles écrites.",
    "Supervisé = exemples étiquetés (avec la bonne réponse).",
    "Non supervisé = regroupements ; renforcement = récompense.",
    "Après l'entraînement, on teste sur de nouvelles données.",
  ],
  entrainement: [
    {
      question: "Qu'est-ce qu'une donnée « étiquetée » ?",
      correction: "Un exemple accompagné de la bonne réponse attendue.",
    },
    {
      question: "À quoi sert la phase de test ?",
      correction:
        "À vérifier que le modèle fonctionne sur des données différentes de l'entraînement (qu'il sait généraliser).",
    },
    {
      question: "Une IA apprend à jouer en gagnant des points par essais et erreurs : quel apprentissage ?",
      correction: "L'apprentissage par renforcement.",
    },
  ],
};

export default function ApprentissageAutomatiquePage() {
  return <FicheCoursIa fiche={fiche} />;
}
