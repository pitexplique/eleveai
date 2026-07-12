// ─── Fiche de cours IA : l'apprentissage automatique (Fondements 1.2) ─────────
// Migration de l'ancienne fiche IA (lib/fiches-ia.ts, ficheApprentissage) vers
// le schéma en blocs : la donnée vit ici, la page ne fait que la rendre.
// Contenu repris verbatim du référentiel Pix (compétence 1.2).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

export const ficheApprentissageAutomatique: FicheCoursData = {
  matiere: "ia",
  matiereLabel: "IA",
  classe: "fondements",
  notion: "apprentissage-automatique",
  titre: "L'apprentissage automatique",
  accroche:
    "L'apprentissage automatique (machine learning) donne aux machines la capacité d'apprendre un comportement à partir de données, au lieu de suivre des règles écrites à la main.",
  identite: [
    { label: "Prérequis", valeur: "Notion de données" },
    { label: "Idée clé", valeur: "Apprendre à partir d'exemples" },
    { label: "Mot clé", valeur: "Entraînement" },
  ],
  definition: {
    texte:
      "L'apprentissage automatique (machine learning) est la capacité donnée aux machines d'apprendre un comportement à partir de données, au lieu de suivre des règles écrites à la main.",
  },
  proprietes: [
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
    {
      titre: "La donnée étiquetée",
      texte:
        "Étiqueter une donnée, c'est lui donner la bonne réponse attendue. Exemple : marquer des photos « chat » ou « pas chat ».",
    },
  ],
  reel: {
    texte:
      "C'est le cœur des IA modernes : reconnaissance d'images, traduction, recommandations, chatbots… Tous apprennent à partir de données plutôt que d'être programmés règle par règle.",
  },
  historique: {
    texte:
      "En 2016, le logiciel AlphaGo a d'abord appris en observant des millions de parties humaines (supervisé), puis s'est amélioré en jouant contre lui-même (renforcement) — jusqu'à battre les meilleurs joueurs de Go du monde.",
  },
  formule: {
    contexte: "Le machine learning en une ligne",
    expression: "données + entraînement → modèle",
    legende:
      "Le modèle apprend à partir d'exemples, au lieu de suivre des règles écrites à la main.",
  },
  methode: [
    {
      titre: "Regarder les données",
      texte:
        "Sont-elles étiquetées (avec la bonne réponse) ou non ? Cela indique le type d'apprentissage : supervisé, non supervisé ou par renforcement.",
    },
    {
      titre: "Entraîner",
      texte:
        "Le modèle ajuste ses paramètres sur des données pour réussir sa tâche : c'est la phase d'entraînement.",
    },
    {
      titre: "Tester",
      texte:
        "On vérifie le modèle sur de nouvelles données, différentes de l'entraînement : la preuve qu'il sait généraliser.",
    },
  ],
  usages: [
    {
      titre: "Supervisé",
      detail: "Exemples + bonnes réponses (données étiquetées).",
    },
    {
      titre: "Non supervisé",
      detail: "Trouver des structures dans des données non étiquetées.",
    },
    {
      titre: "Renforcement",
      detail: "Essais et erreurs pour maximiser une récompense.",
    },
    {
      titre: "Entraînement",
      detail: "Ajuster les paramètres, puis tester sur de nouvelles données.",
    },
  ],
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
      question:
        "Une IA apprend à jouer en gagnant des points par essais et erreurs : quel apprentissage ?",
      correction: "L'apprentissage par renforcement.",
    },
  ],
  coachHref: "/coach-ia/ia",
};

export const slidesApprentissageAutomatique: ClasseSlide[] = [];
