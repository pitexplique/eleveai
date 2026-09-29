import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLogiqueEnsemblesPremiere } from "@/lib/fiches-exercices/maths-premiere-logique-ensembles";

export const metadata: Metadata = {
  title: "Logique et ensembles 1re spé : 20 exercices corrigés, quantificateurs et raisonnements (PDF)",
  description:
    "Vingt exercices corrigés de vocabulaire ensembliste et de logique en première spécialité : appartenance, intersection et réunion, couples, « et » et « ou », quantificateurs et négation, implication, réciproque, contraposée, conditions nécessaires et suffisantes, raisonnement par l'absurde et par disjonction de cas. Diagrammes de Venn, tableaux de vérité et courbes de contre-exemple dans les corrigés, PDF à imprimer.",
};

export default function ExercicesLogiqueEnsemblesPremierePage() {
  return <FicheExercicesClient fiche={exercicesLogiqueEnsemblesPremiere} />;
}
