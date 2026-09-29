import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesEntierCalculMental6e } from "@/lib/fiches-exercices/maths-6e-entier-calcul-mental";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Le calcul mental ») :
// cette page répond à « exercices corrigés calcul mental 6e ».
export const metadata: Metadata = {
  title: "Calcul mental 6e : 20 exercices corrigés, astuces et problèmes (PDF)",
  description:
    "Vingt exercices corrigés de calcul mental en 6e : passer par la dizaine, arrondir puis corriger, décomposer, regrouper, double et moitié, multiplier et diviser par 10, 100, 1 000, ordre de grandeur. Problèmes : sortie au parc animalier, tours de piste, pyramide de nombres, tirelire. Rappel de cours avant chaque niveau, corrigé étape par étape avec la droite graduée et la barre dessinées, PDF à imprimer.",
};

export default function ExercicesEntierCalculMental6ePage() {
  return <FicheExercicesClient fiche={exercicesEntierCalculMental6e} />;
}
