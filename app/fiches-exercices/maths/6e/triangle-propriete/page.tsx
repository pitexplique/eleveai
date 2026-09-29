import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesTrianglePropriete6e } from "@/lib/fiches-exercices/maths-6e-triangle-propriete";

// ⚠️ Pas encore de fiche de cours de 6e pour cette notion : le titre vise
// « exercices corrigés somme des angles triangle 6e ».
export const metadata: Metadata = {
  title: "Somme des angles d'un triangle 6e : 20 exercices corrigés, triangle possible (PDF)",
  description:
    "Vingt exercices corrigés sur les angles du triangle en 6e : la somme des angles vaut 180°, calculer un angle manquant (triangle rectangle, isocèle), savoir si un triangle est possible avec trois longueurs, triangles impossibles. Problèmes : échelle contre un mur, charpente, trois villages, dix bâtonnets, trois coins de papier. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesTrianglePropriete6ePage() {
  return <FicheExercicesClient fiche={exercicesTrianglePropriete6e} />;
}
