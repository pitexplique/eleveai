import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAireSurface6e } from "@/lib/fiches-exercices/maths-6e-aire-surface";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les aires ») :
// cette page répond à « exercices corrigés aire rectangle carré 6e ».
export const metadata: Metadata = {
  title: "Aire 6e : 20 exercices corrigés, rectangle, carré, figures composées (PDF)",
  description:
    "Vingt exercices corrigés sur les aires en 6e : aire du rectangle et du carré, retrouver un côté, comparer des aires, découper une figure en L, en U ou en croix, enlever un trou. Un tapis, une terrasse, un mur à peindre, un panneau d'affichage, une chambre à parqueter, un jardin, une salle de bain, un enclos. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesAireSurface6ePage() {
  return <FicheExercicesClient fiche={exercicesAireSurface6e} />;
}
