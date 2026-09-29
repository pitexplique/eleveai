import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPropRatioPourcentage5e } from "@/lib/fiches-exercices/maths-5e-prop-ratio-pourcentage";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Ratios, pourcentages et
// coefficient ») : cette page répond à « exercices corrigés ratio pourcentage 5e ».
export const metadata: Metadata = {
  title: "Ratio et pourcentage 5e : 20 exercices corrigés, soldes, coefficient (PDF)",
  description:
    "Vingt exercices corrigés sur les ratios et les pourcentages en 5e : écrire et simplifier un ratio, partager selon un ratio, calculer un pourcentage d'une quantité, écrire une part en pourcentage, hausse, baisse et coefficient multiplicateur. Problèmes : peinture, soldes, arbres d'une ville, budget d'une sortie. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesPropRatioPourcentage5ePage() {
  return <FicheExercicesClient fiche={exercicesPropRatioPourcentage5e} />;
}
