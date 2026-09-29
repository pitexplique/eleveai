import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAireLongueur6e } from "@/lib/fiches-exercices/maths-6e-aire-longueur";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les longueurs ») :
// cette page répond à « exercices corrigés longueurs conversions 6e ».
export const metadata: Metadata = {
  title: "Longueurs 6e : 20 exercices corrigés, mesurer, convertir, comparer (PDF)",
  description:
    "Vingt exercices corrigés sur les longueurs en 6e : mesurer à la règle, les unités du mm au km, convertir avec le tableau, comparer, résoudre un problème. Une chenille, un saut en longueur, une pelote de laine, un trajet à vélo, une course d'orientation, un bambou, une guirlande. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesAireLongueur6ePage() {
  return <FicheExercicesClient fiche={exercicesAireLongueur6e} />;
}
