import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAffinesSeconde } from "@/lib/fiches-exercices/maths-seconde-affines";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés fonctions affines seconde », l'autre à « cours ».
export const metadata: Metadata = {
  title: "Fonctions affines en seconde : 20 exercices corrigés, droites dessinées (PDF)",
  description:
    "Vingt exercices corrigés sur les fonctions affines en seconde : reconnaître a et b, calculer une image, lire une droite, trouver l'expression par deux points, droites parallèles, signe de ax + b, comparer deux offres. Les degrés Fahrenheit, l'eau qui bout à 84 °C au mont Blanc, l'orage, une facture d'électricité, des vélos en libre-service. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesAffinesSecondePage() {
  return <FicheExercicesClient fiche={exercicesAffinesSeconde} />;
}
