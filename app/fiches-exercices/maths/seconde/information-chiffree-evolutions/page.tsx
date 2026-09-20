import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesInformationChiffreeSeconde } from "@/lib/fiches-exercices/maths-seconde-information-chiffree";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés pourcentages évolutions seconde », l'autre à « cours ».
export const metadata: Metadata = {
  title:
    "Pourcentages et évolutions en seconde : 20 exercices corrigés sur une fiche de paie (PDF)",
  description:
    "Vingt exercices corrigés sur l'information chiffrée en seconde : proportion et ensemble de référence, pourcentage de pourcentage, variation absolue et relative, points de pourcentage, coefficient multiplicateur, évolutions successives et réciproques. De vrais chiffres (OCDE, URSSAF, INSEE) : une fiche de paie, vingt ans de salaires, cinq pays. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesInformationChiffreeSecondePage() {
  return <FicheExercicesClient fiche={exercicesInformationChiffreeSeconde} />;
}
