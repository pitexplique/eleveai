import type { Metadata } from "next";
import FicheCoursIa, { type FicheIaData } from "@/components/fiches/FicheCoursIa";

export const metadata: Metadata = {
  title: "Fiche IA — Ce que l'IA sait faire",
  description:
    "Reconnaissance, prédiction, recommandation, génération : les familles de tâches de l'IA. Fiche de cours IA (référentiel Pix, Usages).",
};

const fiche: FicheIaData = {
  domaineId: "2",
  domaineLabel: "Usages",
  competence: "2.1",
  titre: "Ce que l'IA sait faire",
  intro:
    "L'IA peut réaliser des tâches variées : reconnaître, prédire, recommander, générer du contenu. Beaucoup sont cachées dans les outils du quotidien.",
  identite: [
    { label: "Prérequis", valeur: "Notion d'IA" },
    { label: "Idée clé", valeur: "Des familles de tâches" },
    { label: "Repère", valeur: "L'IA est partout" },
  ],
  aQuoiCaSert:
    "Repérer l'IA dans les outils qu'on utilise (téléphone, réseaux, photos) aide à comprendre ce qu'elle fait pour nous — et à garder un œil critique sur ses résultats.",
  leSavaisTu:
    "Certaines tâches sont faciles pour un humain mais dures pour une machine (reconnaître un objet sur une photo), et inversement (calculer très vite sur d'énormes quantités de données).",
  notions: [
    {
      titre: "Reconnaissance",
      texte:
        "Analyser des images ou des sons : reconnaître un visage, un objet, ou transformer la parole en texte.",
    },
    {
      titre: "Prédiction & recommandation",
      texte:
        "Estimer une valeur ou un événement futur, et proposer des contenus susceptibles de t'intéresser.",
    },
    {
      titre: "Génération de contenu",
      texte:
        "Créer du texte, des images ou des sons à partir d'une consigne (les IA génératives).",
    },
  ],
  pointsCles: {
    titre: "Les familles de tâches",
    lignes: [
      { cle: "Reconnaissance", detail: "Analyser image/son (visage, parole → texte)." },
      { cle: "Prédiction", detail: "Estimer une valeur ou un événement futur." },
      { cle: "Recommandation", detail: "Proposer des contenus pertinents." },
      { cle: "Génération", detail: "Créer textes, images, sons à partir d'une consigne." },
    ],
    callout:
      "Une même application combine souvent plusieurs tâches : un assistant vocal reconnaît ta voix, comprend ta demande, puis génère une réponse.",
  },
  exemples: [
    {
      titre: "Déverrouiller par le visage",
      donnees: "Ton téléphone reconnaît ton visage pour s'ouvrir.",
      question: "Quelle tâche d'IA ?",
      solution: "La reconnaissance d'images.",
    },
  ],
  pieges: [
    "Croire que seuls les chatbots sont de l'IA.",
    "Confondre reconnaissance (analyser) et génération (créer).",
    "Penser que l'IA fait tout aussi bien que toi (elle se trompe aussi).",
  ],
  aRetenir: [
    "Reconnaissance, prédiction, recommandation, génération.",
    "Beaucoup d'usages sont cachés dans le quotidien.",
    "Une application combine souvent plusieurs tâches.",
    "On garde un regard critique sur les résultats.",
  ],
  entrainement: [
    {
      question: "Transformer la parole en texte écrit, quelle tâche d'IA ?",
      correction: "La reconnaissance de sons (reconnaissance vocale).",
    },
    {
      question: "Créer une image à partir d'une phrase, quelle tâche ?",
      correction: "La génération de contenu.",
    },
    {
      question: "Cite trois familles de tâches réalisées par l'IA.",
      correction: "Par exemple : reconnaissance, prédiction (ou recommandation), et génération de contenu.",
    },
  ],
};

export default function FamillesDeTachesPage() {
  return <FicheCoursIa fiche={fiche} />;
}
