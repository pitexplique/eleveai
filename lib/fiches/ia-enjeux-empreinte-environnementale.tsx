// ─── Fiche de cours IA : l'empreinte environnementale de l'IA (Enjeux) ─────────
// Fiche « en blocs » : le contenu vient de l'ancienne ficheEmpreinte
// (lib/fiches-ia.ts, référentiel Pix IA, compétence 3.1), coulé dans le
// schéma FicheCoursData. Pas de formule : la notion n'en a pas.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

export const ficheEmpreinteEnvironnementale: FicheCoursData = {
  matiere: "ia",
  matiereLabel: "IA",
  classe: "enjeux",
  notion: "empreinte-environnementale",
  titre: "L'empreinte environnementale de l'IA",
  accroche:
    "Concevoir et utiliser l'IA consomme de l'énergie et des ressources naturelles. C'est un enjeu environnemental important.",
  identite: [
    { label: "Prérequis", valeur: "Notion d'empreinte carbone" },
    { label: "Idée clé", valeur: "Des calculs = de l'énergie" },
    { label: "Piste", valeur: "L'IA frugale" },
  ],
  definition: {
    texte:
      "L'empreinte environnementale de l'IA, c'est l'ensemble des ressources qu'elle consomme : l'électricité des centres de calcul (calcul et refroidissement) et les ressources naturelles nécessaires pour fabriquer le matériel.",
  },
  proprietes: [
    {
      titre: "La consommation",
      texte:
        "Les supercalculateurs qui font tourner l'IA consomment beaucoup d'électricité, pour le calcul et le refroidissement.",
    },
    {
      titre: "L'entraînement",
      texte:
        "Entraîner un grand modèle demande énormément de calculs, donc une grande quantité d'énergie.",
    },
    {
      titre: "Le matériel",
      texte:
        "Fabriquer le matériel (cartes graphiques, serveurs) nécessite des ressources rares comme le lithium, le cobalt ou les terres rares, dont l'extraction pollue et a des conséquences sociales.",
    },
    {
      titre: "Réduire l'impact",
      texte:
        "IA frugale, énergies renouvelables, mutualisation des modèles, et cibler les usages réellement utiles. L'« IA frugale » cherche de bonnes performances avec moins de calculs et d'énergie.",
    },
  ],
  reel: {
    texte:
      "Comprendre l'impact aide à utiliser l'IA de façon plus responsable : se demander si un usage en vaut vraiment le coût environnemental.",
  },
  historique: {
    texte:
      "En 2021, des chercheurs ont estimé que l'entraînement d'un seul grand modèle de langage (GPT-3, sorti en 2020) avait consommé environ 1 300 MWh d'électricité, l'équivalent de centaines de foyers pendant un an. L'Agence internationale de l'énergie estimait la consommation mondiale des centres de données à environ 460 TWh en 2022, un chiffre qui pourrait doubler d'ici 2026. En 2024, la France a publié un référentiel officiel de l'IA frugale (AFNOR Spec 2314) pour mesurer et réduire cet impact.",
  },
  methode: [],
  usages: [],
  exemples: [
    {
      titre: "Pourquoi ça consomme ?",
      donnees: "Une IA générative grand public utilisée par des millions de personnes.",
      question: "D'où vient la consommation ?",
      solution:
        "Des centres de calcul qui consomment beaucoup d'électricité pour le calcul et le refroidissement des machines.",
    },
  ],
  pieges: [
    "Croire que l'IA n'a aucun impact (« c'est virtuel »).",
    "Oublier la fabrication du matériel.",
    "Multiplier les usages inutiles.",
  ],
  aRetenir: [
    "Les calculs d'IA consomment beaucoup d'énergie.",
    "Le matériel nécessite des ressources rares.",
    "L'entraînement est très coûteux en énergie.",
    "L'IA frugale et les usages utiles réduisent l'impact.",
  ],
  entrainement: [
    {
      question: "Pourquoi l'IA consomme-t-elle beaucoup d'énergie ?",
      correction:
        "Parce que les calculs tournent sur d'immenses centres de calcul gourmands en électricité.",
    },
    {
      question: "Qu'est-ce que l'IA frugale ?",
      correction:
        "Une IA conçue pour de bonnes performances avec moins de calculs et d'énergie.",
    },
    {
      question: "Que nécessite la fabrication du matériel d'IA ?",
      correction: "Des ressources naturelles rares (lithium, cobalt, terres rares).",
    },
  ],
  coachHref: "/coach-ia/ia",
};

export const slidesEmpreinteEnvironnementale: ClasseSlide[] = [];
