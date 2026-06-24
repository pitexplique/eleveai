import type { Metadata } from "next";
import FicheCoursIa, { type FicheIaData } from "@/components/fiches/FicheCoursIa";

export const metadata: Metadata = {
  title: "Fiche IA — Les algorithmes de recommandation",
  description:
    "Comment YouTube, TikTok ou Netflix te recommandent des contenus, et la bulle de filtre. Fiche de cours IA (référentiel Pix, Fondements).",
};

export const fiche: FicheIaData = {
  domaineId: "1",
  domaineLabel: "Fondements",
  competence: "1.5",
  titre: "Les algorithmes de recommandation",
  intro:
    "Sur YouTube, TikTok, Netflix ou les boutiques en ligne, des algorithmes de recommandation choisissent les contenus qu'on te propose, à partir de tes données.",
  identite: [
    { label: "Prérequis", valeur: "Notion de données" },
    { label: "Idée clé", valeur: "Personnaliser pour capter l'attention" },
    { label: "Risque", valeur: "La bulle de filtre" },
  ],
  aQuoiCaSert:
    "Comprendre la recommandation aide à reprendre la main : savoir pourquoi on te propose tel contenu, repérer ce qui influence tes choix, et éviter de t'enfermer dans une « bulle ».",
  leSavaisTu:
    "Les algorithmes cherchent souvent à maximiser le temps que tu passes sur l'application : ils privilégient ce qui te fait réagir — pas forcément ce qui est vrai ou utile.",
  notions: [
    {
      titre: "Le but",
      texte:
        "Filtrer et proposer en priorité des contenus qui pourraient t'intéresser, d'après ton comportement.",
    },
    {
      titre: "Les données utilisées",
      texte:
        "Ton historique, tes clics, tes préférences, et parfois les choix d'utilisateurs aux goûts similaires.",
    },
    {
      titre: "La bulle de filtre",
      texte:
        "À force de personnalisation, tu vois surtout des contenus semblables à ce que tu aimes déjà.",
    },
  ],
  pointsCles: {
    titre: "L'essentiel",
    lignes: [
      { cle: "Objectif", detail: "Te proposer des contenus susceptibles de t'intéresser." },
      { cle: "Données", detail: "Historique, clics, préférences." },
      { cle: "Bulle de filtre", detail: "Tu ne vois presque plus que des contenus semblables." },
      { cle: "Reprendre la main", detail: "Diversifier ses sources, régler ses paramètres." },
    ],
    callout:
      "Une « chambre d'écho » : on est exposé surtout à des opinions proches des siennes, ce qui renforce ses idées sans confrontation à d'autres points de vue.",
  },
  exemples: [
    {
      titre: "Pourquoi toujours ce type de vidéo ?",
      donnees: "L'application te propose en boucle le même genre de contenus.",
      question: "Pourquoi, et que faire ?",
      solution:
        "Parce qu'elle se base sur ton historique. Pour varier : explore d'autres thèmes, suis des sources différentes, et gère ton historique dans les paramètres.",
    },
  ],
  pieges: [
    "Croire que tout le monde voit la même chose (c'est personnalisé).",
    "Penser que ce qui est mis en avant est forcément vrai ou important.",
    "Rester enfermé dans une seule source d'information.",
  ],
  aRetenir: [
    "La recommandation personnalise selon tes données.",
    "Elle peut t'enfermer dans une bulle de filtre.",
    "Diversifier ses sources aide à en sortir.",
    "Le but est souvent de capter ton attention.",
  ],
  entrainement: [
    {
      question: "Sur quoi se base un algorithme de recommandation ?",
      correction: "Sur ton historique, tes clics et tes préférences.",
    },
    {
      question: "Qu'est-ce qu'une bulle de filtre ?",
      correction: "C'est quand tu ne vois presque plus que des contenus proches de ce que tu aimes déjà.",
    },
    {
      question: "Comment éviter l'enfermement algorithmique ?",
      correction: "En variant ses sources et en explorant d'autres types de contenus.",
    },
  ],
};

export default function AlgorithmesDeRecommandationPage() {
  return <FicheCoursIa fiche={fiche} />;
}
