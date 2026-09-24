import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgorithmique3e } from "@/lib/fiches-exercices/maths-3e-algorithmique";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Algorithmique :
// variables, boucles et programmes de calcul ») : cette page répond à
// « exercices corrigés algorithmique Scratch 3e », l'autre au cours.
export const metadata: Metadata = {
  title: "Algorithmique 3e : 20 exercices corrigés, Scratch, boucles et programmes de calcul (PDF)",
  description:
    "Vingt exercices corrigés d'algorithmique de 3e, façon brevet : suivre un programme Scratch bloc par bloc, variables, boucles « répéter » et « répéter jusqu'à », conditions avec « et » et « ou », programme de calcul écrit en x, corriger un programme. Problèmes : cinq jours de chaleur, deux programmes jumeaux, le plan d'entraînement, le nombre secret. Rappel de cours avant chaque niveau, trace des variables dans chaque corrigé, PDF à imprimer.",
};

export default function ExercicesAlgorithmique3ePage() {
  return <FicheExercicesClient fiche={exercicesAlgorithmique3e} />;
}
