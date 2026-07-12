// ─── Fiche de cours IA : les algorithmes de recommandation (Fondements) ────────
// Fiche « en blocs » : le contenu vient de l'ancienne ficheReco
// (lib/fiches-ia.ts, référentiel Pix IA, compétence 1.5), coulé dans le
// schéma FicheCoursData. Pas de formule : la notion n'en a pas.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

export const ficheAlgorithmesDeRecommandation: FicheCoursData = {
  matiere: "ia",
  matiereLabel: "IA",
  classe: "fondements",
  notion: "algorithmes-de-recommandation",
  titre: "Les algorithmes de recommandation",
  accroche:
    "Sur YouTube, TikTok, Netflix ou les boutiques en ligne, des algorithmes de recommandation choisissent les contenus qu'on te propose, à partir de tes données.",
  identite: [
    { label: "Prérequis", valeur: "Notion de données" },
    { label: "Idée clé", valeur: "Personnaliser pour capter l'attention" },
    { label: "Risque", valeur: "La bulle de filtre" },
  ],
  definition: {
    texte:
      "Un algorithme de recommandation est un programme qui filtre les contenus d'une plateforme et propose en priorité ceux qui pourraient t'intéresser, en se basant sur tes données : ton historique, tes clics et tes préférences.",
  },
  proprietes: [
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
    {
      titre: "La chambre d'écho",
      texte:
        "On est exposé surtout à des opinions proches des siennes, ce qui renforce ses idées sans confrontation à d'autres points de vue.",
    },
  ],
  reel: {
    texte:
      "Comprendre la recommandation aide à reprendre la main : savoir pourquoi on te propose tel contenu, repérer ce qui influence tes choix, et éviter de t'enfermer dans une « bulle ». Les algorithmes cherchent souvent à maximiser le temps que tu passes sur l'application : ils privilégient ce qui te fait réagir — pas forcément ce qui est vrai ou utile.",
  },
  historique: {
    texte:
      "Les premiers systèmes de recommandation apparaissent dans les années 1990, avec le projet Tapestry (1992), puis Amazon popularise le « les clients qui ont acheté ceci ont aussi acheté cela ». En 2006, Netflix offre un million de dollars à qui améliorerait son algorithme de 10 % : le concours durera trois ans. Dans les années 2010, TikTok et YouTube généralisent les fils entièrement personnalisés.",
  },
  methode: [
    {
      titre: "Repérer",
      texte:
        "Se demander pourquoi ce contenu m'est proposé : l'application se base sur mon historique et mes clics.",
    },
    {
      titre: "Diversifier",
      texte:
        "Explorer d'autres thèmes et suivre des sources différentes pour ne pas rester enfermé dans une bulle.",
    },
    {
      titre: "Régler",
      texte:
        "Gérer son historique et ses paramètres pour reprendre la main sur ce qui est recommandé.",
    },
  ],
  usages: [],
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
      correction:
        "C'est quand tu ne vois presque plus que des contenus proches de ce que tu aimes déjà.",
    },
    {
      question: "Comment éviter l'enfermement algorithmique ?",
      correction:
        "En variant ses sources et en explorant d'autres types de contenus.",
    },
  ],
  coachHref: "/coach-ia/ia",
};

export const slidesAlgorithmesDeRecommandation: ClasseSlide[] = [];
