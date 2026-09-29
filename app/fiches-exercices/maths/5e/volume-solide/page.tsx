import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesVolumeSolide5e } from "@/lib/fiches-exercices/maths-5e-volume-solide";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les volumes ») :
// cette page répond à « exercices corrigés volumes 5e ».
export const metadata: Metadata = {
  title: "Volumes 5e : 20 exercices corrigés, pavé, prisme, cylindre, litres (PDF)",
  description:
    "Vingt exercices corrigés sur les volumes en 5e : compter des cubes, volume du pavé droit, du prisme droit et du cylindre (aire de la base × hauteur), assemblages, conversions cm³, dm³, litres et m³. Problèmes : cuve d'eau de pluie, galet plongé dans un aquarium, gâteau à étages, arête doublée. Rappel de cours avant chaque niveau, corrigé étape par étape avec le solide dessiné et coté, PDF à imprimer.",
};

export default function ExercicesVolumeSolide5ePage() {
  return <FicheExercicesClient fiche={exercicesVolumeSolide5e} />;
}
