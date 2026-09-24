import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesVolumes3e } from "@/lib/fiches-exercices/maths-3e-volumes";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Calculer un volume :
// du pavé à la boule ») : cette page répond à « exercices corrigés volumes 3e »,
// l'autre à « cours volume 3e ».
export const metadata: Metadata = {
  title: "Volumes 3e : 20 exercices corrigés, pavé, cylindre, cône, boule, k³ (PDF)",
  description:
    "Vingt exercices corrigés de 3e sur les volumes : pavé, prisme, cylindre, cône, pyramide et boule, conversions m³, dm³ et litres, agrandissement et réduction (le volume multiplié par k³). Les pièges nommés : le tiers du cône oublié, le diamètre à la place du rayon, 4πr² au lieu de 4/3 πr³, × k au lieu de × k³. Problèmes : le silo à grain, la Terre et la Lune, la pluie sur le toit, la boule de glace qui fond. Rappel de cours avant chaque niveau, corrigé étape par étape avec le solide dessiné, PDF à imprimer.",
};

export default function ExercicesVolumes3ePage() {
  return <FicheExercicesClient fiche={exercicesVolumes3e} />;
}
