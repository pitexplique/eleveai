import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesStatistiquesSeconde } from "@/lib/fiches-exercices/maths-seconde-statistiques";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés statistiques seconde », l'autre à « cours ».
export const metadata: Metadata = {
  title: "Statistiques en seconde : 20 exercices corrigés, médiane, quartiles, écart type (PDF)",
  description:
    "Vingt exercices corrigés de statistiques en seconde : effectifs et fréquences, moyenne simple et pondérée, médiane et quartiles, diagramme en boîte, écart interquartile, écart type, linéarité de la moyenne. Deux archers, un bulletin à coefficients, un PDG dans la moyenne des salaires, deux climats de même moyenne, une machine à paquets de pâtes. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesStatistiquesSecondePage() {
  return <FicheExercicesClient fiche={exercicesStatistiquesSeconde} />;
}
