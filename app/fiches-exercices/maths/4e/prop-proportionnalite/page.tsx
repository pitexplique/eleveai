import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProportionnalite4e } from "@/lib/fiches-exercices/maths-4e-proportionnalite";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« La proportionnalité ») :
// cette page répond à « exercices corrigés proportionnalité 4e », l'autre à
// « cours proportionnalité 4e ».
export const metadata: Metadata = {
  title: "Proportionnalité 4e : 20 exercices corrigés, tableau, produit en croix, graphique (PDF)",
  description:
    "Vingt exercices corrigés de 4e : reconnaître une situation de proportionnalité dans un tableau ou sur un graphique (points alignés avec l'origine), compléter un tableau, trouver le coefficient et revenir à l'unité, calculer une quatrième proportionnelle par le produit en croix. Problèmes : la pluie sur un toit, l'orage qu'on écoute, les degrés Fahrenheit, le tour de la Terre. Rappel de cours avant chaque niveau, corrigé étape par étape avec le tableau dessiné, PDF à imprimer.",
};

export default function ExercicesProportionnalite4ePage() {
  return <FicheExercicesClient fiche={exercicesProportionnalite4e} />;
}
