import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgorithmique4e } from "@/lib/fiches-exercices/maths-4e-algorithmique";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Algorithmique et
// programmation ») : cette page répond à « exercices corrigés algorithmique
// Scratch 4e », l'autre au cours.
export const metadata: Metadata = {
  title: "Algorithmique 4e : 20 exercices corrigés, Scratch, variables et conditions (PDF)",
  description:
    "Vingt exercices corrigés d'algorithmique de 4e : suivre un programme Scratch bloc par bloc, variables « mettre » et « ajouter », conditions vraies ou fausses, « si … alors … sinon », boucles « répéter », corriger un seuil (> ou ≥), le lutin qui trace. Problèmes : le comptage des hirondelles, la monnaie rendue, le pass ou le ticket, l'escalier du lutin. Rappel de cours avant chaque niveau, trace des variables dans chaque corrigé, PDF à imprimer.",
};

export default function ExercicesAlgorithmique4ePage() {
  return <FicheExercicesClient fiche={exercicesAlgorithmique4e} />;
}
