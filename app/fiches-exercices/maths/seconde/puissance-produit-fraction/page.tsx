import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPuissanceProduitFractionSeconde } from "@/lib/fiches-exercices/maths-seconde-puissance-produit-fraction";

export const metadata: Metadata = {
  title: "Puissance d'un produit ou d'une fraction en seconde : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur (ab)^n et (a/b)^n en seconde : répartir un exposant, calculer (2/3)^3, exposant négatif, base négative, bases décimales, regrouper pour calculer sans calculatrice. Problèmes : une maquette d'architecte, des lancers francs, la caféine, les Lunes dans la Terre. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesPuissanceProduitFractionSecondePage() {
  return <FicheExercicesClient fiche={exercicesPuissanceProduitFractionSeconde} />;
}
