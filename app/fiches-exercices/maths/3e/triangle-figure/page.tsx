import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesTriangles3e } from "@/lib/fiches-exercices/maths-3e-triangles";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les triangles : angles,
// familles et existence ») : cette page répond à « exercices corrigés triangles
// 3e », « somme des angles d'un triangle exercices », l'autre au cours.
export const metadata: Metadata = {
  title: "Triangles 3e : 20 exercices corrigés, somme des angles, isocèle, inégalité triangulaire (PDF)",
  description:
    "Vingt exercices corrigés de 3e sur les triangles : calculer un angle avec la somme des angles (180°), reconnaître un triangle isocèle, équilatéral ou rectangle, tester si trois longueurs ou trois angles forment un triangle, savoir quelles données le construisent. Problèmes : le pont en treillis, la pyramide du Louvre, Paris-Lyon-Marseille, la voile d'un dériveur. Rappel de cours avant chaque niveau, corrigé étape par étape avec chaque triangle dessiné à l'échelle, PDF à imprimer.",
};

export default function ExercicesTriangles3ePage() {
  return <FicheExercicesClient fiche={exercicesTriangles3e} />;
}
