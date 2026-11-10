import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAireCm1 } from "@/lib/fiches-exercices/maths-cm1-aire";

// ⚠️ Cette page répond à « exercices aire CM1 : compter les carreaux, comparer, rectangle et carré, découper ».
export const metadata: Metadata = {
  title: "Aire CM1 : 20 exercices corrigés, compter les carreaux, rectangle, carré, m² (PDF)",
  description:
    "Vingt exercices corrigés sur l'aire au CM1 : compter les carreaux d'une figure, comparer deux aires avec une unité, ne pas confondre aire et périmètre, aire d'un rectangle et d'un carré en cm² et en m², découper une figure ou enlever un morceau. Problèmes : une chambre, un potager, un toit solaire, un drapeau. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesAireCm1Page() {
  return <FicheExercicesClient fiche={exercicesAireCm1} />;
}
