import type { Metadata } from "next";
import FicheCoursIa, { type FicheIaData } from "@/components/fiches/FicheCoursIa";

export const metadata: Metadata = {
  title: "Fiche IA — Utiliser l'IA dans une organisation",
  description:
    "Identifier le besoin, choisir l'outil, protéger les données, charte d'usage et RAG. Fiche de cours IA (référentiel Pix, Usages).",
};

const fiche: FicheIaData = {
  domaineId: "2",
  domaineLabel: "Usages",
  competence: "2.5",
  titre: "Utiliser l'IA dans une organisation",
  intro:
    "Dans une entreprise, une association ou un établissement, l'IA peut aider — à condition de bien choisir les outils et de protéger les données.",
  identite: [
    { label: "Prérequis", valeur: "Usages de l'IA" },
    { label: "Idée clé", valeur: "Identifier le besoin, protéger les données" },
    { label: "Mot clé", valeur: "Charte d'usage" },
  ],
  aQuoiCaSert:
    "Bien utiliser l'IA au travail : gagner du temps sur des tâches répétitives, tout en respectant la confidentialité et les règles de l'organisation.",
  leSavaisTu:
    "Pour des réponses fiables sur ses propres documents, une organisation peut utiliser un système RAG : l'IA va d'abord chercher dans une base de documents avant de répondre, ce qui réduit les hallucinations.",
  notions: [
    {
      titre: "Identifier le besoin",
      texte:
        "Quelle tâche veut-on améliorer ? Gagner du temps, générer des contenus, analyser des données…",
    },
    {
      titre: "Choisir l'outil",
      texte:
        "Repérer un outil qui intègre de l'IA et correspond au besoin, en vérifiant données et conditions d'utilisation.",
    },
    {
      titre: "Encadrer l'usage",
      texte:
        "Une charte interne définit les tâches autorisées et les précautions à prendre sur les données.",
    },
  ],
  pointsCles: {
    titre: "Bien utiliser l'IA au travail",
    lignes: [
      { cle: "Besoin", detail: "Quelle tâche veut-on améliorer ?" },
      { cle: "Outil", detail: "Lequel intègre de l'IA et correspond ?" },
      { cle: "Données", detail: "Confidentialité et conditions d'utilisation." },
      { cle: "Charte", detail: "Règles d'usage de l'IA dans l'organisation." },
    ],
    callout:
      "La génération augmentée par récupération (RAG) fait chercher l'IA dans une base de documents fiables avant de répondre.",
  },
  exemples: [
    {
      titre: "Résumer des comptes-rendus",
      donnees: "On veut gagner du temps sur des résumés de réunions.",
      question: "Quel point vérifier en priorité ?",
      solution: "La confidentialité des données et les conditions d'utilisation de l'outil.",
    },
  ],
  pieges: [
    "Coller des données personnelles ou confidentielles dans une IA en ligne.",
    "Adopter un outil sans lire les conditions d'utilisation.",
    "Croire les réponses sans les vérifier (hallucinations).",
  ],
  aRetenir: [
    "On part d'un besoin clair.",
    "On vérifie la confidentialité et les conditions.",
    "Une charte encadre l'usage de l'IA.",
    "Le RAG améliore la fiabilité sur ses propres documents.",
  ],
  entrainement: [
    {
      question: "Avant d'adopter un nouvel outil d'IA, que faut-il vérifier ?",
      correction: "Les conditions d'utilisation et les mentions légales sur les données.",
    },
    {
      question: "À quoi sert une charte d'usage de l'IA ?",
      correction: "À définir les règles d'utilisation autorisée de l'IA dans l'organisation.",
    },
    {
      question: "Qu'est-ce que le RAG (génération augmentée par récupération) ?",
      correction:
        "Faire chercher l'IA dans une base de documents fiables avant de répondre, pour réduire les hallucinations.",
    },
  ],
};

export default function IaDansUneOrganisationPage() {
  return <FicheCoursIa fiche={fiche} />;
}
