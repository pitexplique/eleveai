import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesVolumeSolide6e } from "@/lib/fiches-exercices/maths-6e-volume-solide";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les volumes ») :
// cette page répond à « exercices corrigés volumes 6e ».
export const metadata: Metadata = {
  title: "Volumes 6e : 20 exercices corrigés, compter les cubes, cm³ et m³ (PDF)",
  description:
    "Vingt exercices corrigés sur les volumes en 6e : compter des cubes unités, même cachés, lire une mesure en cm³ ou en m³, comparer deux solides, assembler des morceaux, calculer le volume d'une boîte. Problèmes : boîte de sucres, cube dont le côté double, camion de déménagement, pavés de 24 cubes. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesVolumeSolide6ePage() {
  return <FicheExercicesClient fiche={exercicesVolumeSolide6e} />;
}
