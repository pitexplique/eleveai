// ─── Fiche de cours IA : éthique et transparence de l'IA (Enjeux) ──────────────
// Fiche « en blocs » : le contenu vient de l'ancienne ficheEthique
// (lib/fiches-ia.ts, référentiel Pix IA, compétence 3.3), coulé dans le
// schéma FicheCoursData. Pas de formule : la notion n'en a pas.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

export const ficheEthiqueEtTransparence: FicheCoursData = {
  matiere: "ia",
  matiereLabel: "IA",
  classe: "enjeux",
  notion: "ethique-et-transparence",
  titre: "Éthique et transparence de l'IA",
  accroche:
    "Concevoir et utiliser une IA pose des questions éthiques : transparence, non-discrimination, et responsabilité en cas d'erreur.",
  identite: [
    { label: "Prérequis", valeur: "Notion d'éthique" },
    { label: "Idée clé", valeur: "Transparence & justice" },
    { label: "Mot clé", valeur: "Explicabilité" },
  ],
  definition: {
    texte:
      "L'éthique de l'IA est la réflexion sur ce qu'un système d'IA doit faire ou ne pas faire : elle exige la transparence (comprendre le système), l'explicabilité (expliquer ses décisions), la non-discrimination et la justice, et pose la question de la responsabilité en cas d'erreur.",
  },
  proprietes: [
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
        "Le RGPD protège les données personnelles ; l'IA Act classe les usages selon leur niveau de risque (de minime à interdit).",
    },
  ],
  reel: {
    texte:
      "Juger si une IA est utilisée de façon juste : éviter les discriminations, exiger de la transparence, et savoir qui est responsable en cas de problème. Certaines applications (notation sociale, reconnaissance faciale de masse) posent de fortes questions sur les libertés et les droits — au point d'être strictement encadrées, voire interdites.",
  },
  historique: {
    texte:
      "En 2016, l'enquête sur le logiciel COMPAS, utilisé par la justice américaine, a montré qu'un algorithme pouvait défavoriser certains groupes : le débat sur les biais des IA est devenu mondial. L'Europe a réagi avec le RGPD (appliqué en 2018) puis l'IA Act (adopté en 2024), premier grand texte au monde à classer les usages de l'IA par niveau de risque.",
  },
  methode: [
    { titre: "Transparence", texte: "Comprendre comment l'IA fonctionne." },
    { titre: "Explicabilité", texte: "Pouvoir expliquer ses décisions." },
    { titre: "Non-discrimination", texte: "Éviter de reproduire des inégalités." },
    { titre: "Responsabilité", texte: "Qui répond en cas d'erreur ?" },
  ],
  usages: [],
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
  coachHref: "/coach-ia/ia",
};

export const slidesEthiqueEtTransparence: ClasseSlide[] = [];
