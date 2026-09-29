import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAireSurface5e } from "@/lib/fiches-exercices/maths-5e-aire-surface";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les aires ») :
// cette page répond à « exercices corrigés aires 5e ».
export const metadata: Metadata = {
  title: "Aires 5e : 20 exercices corrigés, triangle, parallélogramme, figures composées (PDF)",
  description:
    "Vingt exercices corrigés sur les aires en 5e : compter des carreaux, aire et périmètre, aire du triangle (même quand la hauteur tombe dehors) et du parallélogramme, découper une figure, retrouver une hauteur. Problèmes : potager, drapeau d'un club, terrain à bâtir, échange de terrains. Rappel de cours avant chaque niveau, corrigé étape par étape avec la figure, PDF à imprimer.",
};

export default function ExercicesAireSurface5ePage() {
  return <FicheExercicesClient fiche={exercicesAireSurface5e} />;
}
