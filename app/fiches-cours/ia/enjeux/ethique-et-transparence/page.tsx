import type { Metadata } from "next";
import FicheCoursIa, { type FicheIaData } from "@/components/fiches/FicheCoursIa";

export const metadata: Metadata = {
  title: "Fiche IA — Éthique et transparence de l'IA",
  description:
    "Transparence, non-discrimination, responsabilité, RGPD et IA Act. Fiche de cours IA (référentiel Pix, Enjeux).",
};

const fiche: FicheIaData = {
  domaineId: "3",
  domaineLabel: "Enjeux",
  competence: "3.3",
  titre: "Éthique et transparence de l'IA",
  intro:
    "Concevoir et utiliser une IA pose des questions éthiques : transparence, non-discrimination, et responsabilité en cas d'erreur.",
  identite: [
    { label: "Prérequis", valeur: "Notion d'éthique" },
    { label: "Idée clé", valeur: "Transparence & justice" },
    { label: "Mot clé", valeur: "Explicabilité" },
  ],
  aQuoiCaSert:
    "Juger si une IA est utilisée de façon juste : éviter les discriminations, exiger de la transparence, et savoir qui est responsable en cas de problème.",
  leSavaisTu:
    "Certaines applications (notation sociale, reconnaissance faciale de masse) posent de fortes questions sur les libertés et les droits — au point d'être strictement encadrées, voire interdites.",
  notions: [
    {
      titre: "Les principes",
      texte:
        "Transparence (comprendre le système), explicabilité (expliquer ses décisions), non-discrimination et justice.",
    },
    {
      titre: "La responsabilité",
      texte:
        "Quand une IA cause un dommage, se pose la question : qui est responsable de l'erreur ?",
    },
    {
      titre: "Les cadres",
      texte:
        "Le RGPD protège les données personnelles ; l'IA Act encadre les usages selon leur niveau de risque.",
    },
  ],
  pointsCles: {
    titre: "Les principes éthiques",
    lignes: [
      { cle: "Transparence", detail: "Comprendre comment l'IA fonctionne." },
      { cle: "Explicabilité", detail: "Pouvoir expliquer ses décisions." },
      { cle: "Non-discrimination", detail: "Éviter de reproduire des inégalités." },
      { cle: "Responsabilité", detail: "Qui répond en cas d'erreur ?" },
    ],
    callout:
      "Le RGPD protège les données personnelles ; l'IA Act classe les usages selon leur niveau de risque (de minime à interdit).",
  },
  exemples: [
    {
      titre: "Une IA se trompe",
      donnees: "Une décision automatique cause un dommage à quelqu'un.",
      question: "Quelle question éthique se pose ?",
      solution: "Celle de la responsabilité : qui est responsable de l'erreur ?",
    },
  ],
  pieges: [
    "Croire qu'une IA est toujours neutre et juste.",
    "Penser que la rapidité prime sur la transparence.",
    "Oublier les questions de responsabilité.",
  ],
  aRetenir: [
    "Principes : transparence, explicabilité, non-discrimination, justice.",
    "Une erreur d'IA pose la question de la responsabilité.",
    "Le RGPD protège les données personnelles.",
    "L'IA Act classe les usages par niveau de risque.",
  ],
  entrainement: [
    {
      question: "Cite deux principes éthiques pour une IA.",
      correction: "Par exemple la transparence et la non-discrimination.",
    },
    {
      question: "Qu'est-ce que l'explicabilité d'une IA ?",
      correction: "Pouvoir expliquer comment elle arrive à sa décision.",
    },
    {
      question: "Que protège surtout le RGPD ?",
      correction: "Les données personnelles des individus.",
    },
  ],
};

export default function EthiqueEtTransparencePage() {
  return <FicheCoursIa fiche={fiche} />;
}
