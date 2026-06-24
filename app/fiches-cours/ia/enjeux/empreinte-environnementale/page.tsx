import type { Metadata } from "next";
import FicheCoursIa, { type FicheIaData } from "@/components/fiches/FicheCoursIa";

export const metadata: Metadata = {
  title: "Fiche IA — L'empreinte environnementale de l'IA",
  description:
    "Énergie, ressources rares, IA frugale. Fiche de cours IA (référentiel Pix, Enjeux).",
};

const fiche: FicheIaData = {
  domaineId: "3",
  domaineLabel: "Enjeux",
  competence: "3.1",
  titre: "L'empreinte environnementale de l'IA",
  intro:
    "Concevoir et utiliser l'IA consomme de l'énergie et des ressources naturelles. C'est un enjeu environnemental important.",
  identite: [
    { label: "Prérequis", valeur: "Notion d'empreinte carbone" },
    { label: "Idée clé", valeur: "Des calculs = de l'énergie" },
    { label: "Piste", valeur: "L'IA frugale" },
  ],
  aQuoiCaSert:
    "Comprendre l'impact aide à utiliser l'IA de façon plus responsable : se demander si un usage en vaut vraiment le coût environnemental.",
  leSavaisTu:
    "Fabriquer le matériel (cartes graphiques, serveurs) nécessite des ressources rares comme le lithium, le cobalt ou les terres rares, dont l'extraction pollue et a des conséquences sociales.",
  notions: [
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
      titre: "Réduire l'impact",
      texte:
        "IA frugale, énergies renouvelables, mutualisation des modèles, et cibler les usages réellement utiles.",
    },
  ],
  pointsCles: {
    titre: "L'essentiel",
    lignes: [
      { cle: "Électricité", detail: "Centres de calcul très gourmands (calcul + refroidissement)." },
      { cle: "Matériel", detail: "Ressources naturelles rares pour les composants." },
      { cle: "Entraînement", detail: "Très coûteux en énergie." },
      { cle: "Réduire", detail: "IA frugale, renouvelables, usages utiles." },
    ],
    callout: "L'« IA frugale » cherche de bonnes performances avec moins de calculs et d'énergie.",
  },
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
      correction: "Parce que les calculs tournent sur d'immenses centres de calcul gourmands en électricité.",
    },
    {
      question: "Qu'est-ce que l'IA frugale ?",
      correction: "Une IA conçue pour de bonnes performances avec moins de calculs et d'énergie.",
    },
    {
      question: "Que nécessite la fabrication du matériel d'IA ?",
      correction: "Des ressources naturelles rares (lithium, cobalt, terres rares).",
    },
  ],
};

export default function EmpreinteEnvironnementalePage() {
  return <FicheCoursIa fiche={fiche} />;
}
