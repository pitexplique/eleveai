// ─── Fiche de cours IA : les familles de tâches (Usages) ──────────────────────
// Fiche « en blocs » : le contenu vient de l'ancienne ficheFamilles
// (lib/fiches-ia.ts, référentiel Pix IA, compétence 2.1), coulé dans le
// schéma FicheCoursData. Pas de formule : la notion n'en a pas.
// Mapping : notions + callout → proprietes ; pointsCles (les 4 familles) →
// usages ; aQuoiCaSert → reel ; le « savais-tu » (paradoxe de Moravec) est
// intégré à l'historique, daté.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

export const ficheFamillesDeTaches: FicheCoursData = {
  matiere: "ia",
  matiereLabel: "IA",
  classe: "usages",
  notion: "familles-de-taches",
  titre: "Ce que l'IA sait faire",
  accroche:
    "L'IA peut réaliser des tâches variées : reconnaître, prédire, recommander, générer du contenu. Beaucoup sont cachées dans les outils du quotidien.",
  identite: [
    { label: "Prérequis", valeur: "Notion d'IA" },
    { label: "Idée clé", valeur: "Des familles de tâches" },
    { label: "Repère", valeur: "L'IA est partout" },
  ],
  definition: {
    texte:
      "Les tâches réalisées par l'IA se regroupent en grandes familles : la reconnaissance (analyser des images ou des sons), la prédiction (estimer une valeur ou un événement futur), la recommandation (proposer des contenus pertinents) et la génération (créer du texte, des images ou des sons à partir d'une consigne).",
  },
  proprietes: [
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
    {
      titre: "Plusieurs tâches à la fois",
      texte:
        "Une même application combine souvent plusieurs tâches : un assistant vocal reconnaît ta voix, comprend ta demande, puis génère une réponse.",
    },
  ],
  reel: {
    texte:
      "Repérer l'IA dans les outils qu'on utilise (téléphone, réseaux, photos) aide à comprendre ce qu'elle fait pour nous — et à garder un œil critique sur ses résultats.",
  },
  historique: {
    texte:
      "Certaines tâches sont faciles pour un humain mais dures pour une machine (reconnaître un objet sur une photo), et inversement (calculer très vite sur d'énormes quantités de données) : ce paradoxe est observé par le chercheur Hans Moravec dès les années 1980. Il a fallu attendre 2012 pour que la reconnaissance d'images fasse un bond grâce aux réseaux de neurones profonds, puis 2022 pour que la génération de contenu entre dans le quotidien avec les IA génératives grand public.",
  },
  methode: [],
  usages: [
    {
      titre: "Reconnaissance",
      detail: "Analyser image/son (visage, parole → texte).",
    },
    {
      titre: "Prédiction",
      detail: "Estimer une valeur ou un événement futur.",
    },
    {
      titre: "Recommandation",
      detail: "Proposer des contenus pertinents.",
    },
    {
      titre: "Génération",
      detail: "Créer textes, images, sons à partir d'une consigne.",
    },
  ],
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
      correction:
        "Par exemple : reconnaissance, prédiction (ou recommandation), et génération de contenu.",
    },
  ],
  coachHref: "/coach-ia/ia",
};

export const slidesFamillesDeTaches: ClasseSlide[] = [];
