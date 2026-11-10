import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesVolumes4e } from "@/lib/fiches-exercices/maths-4e-volumes";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les volumes ») :
// cette page répond à « exercices corrigés volumes 4e », l'autre à « cours
// volumes 4e ».
export const metadata: Metadata = {
  title: "Volumes 4e : 20 exercices corrigés, pavé, prisme, cylindre, litres et m³ (PDF)",
  description:
    "Vingt exercices corrigés de 4e sur les volumes : compter des cubes, aire de la base × hauteur, pavé droit, prisme droit et cylindre, conversions cm³, dm³, litres et m³. Les pièges nommés : additionner les dimensions, s'arrêter à l'aire de la base, le tour du disque au lieu de son aire, le diamètre à la place du rayon, × 10 au lieu de × 1 000. Problèmes : un bain ou une douche, la balle ronde de foin, la digue contre la mer, l'eau oubliée dans le tuyau. Rappel de cours avant chaque niveau, corrigé étape par étape avec le solide dessiné, PDF à imprimer.",
};

export default function ExercicesVolumes4ePage() {
  return <FicheExercicesClient fiche={exercicesVolumes4e} />;
}
