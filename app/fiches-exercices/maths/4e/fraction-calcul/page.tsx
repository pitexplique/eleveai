import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFractionsCalcul4e } from "@/lib/fiches-exercices/maths-4e-fractions-calcul";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Calculer avec les
// fractions ») : cette page répond à « exercices corrigés fractions 4e »,
// l'autre à « cours fractions 4e ».
export const metadata: Metadata = {
  title: "Fractions 4e : 20 exercices corrigés, nombres négatifs, inverse, division, priorités (PDF)",
  description:
    "Vingt exercices corrigés de 4e sur le calcul avec les fractions : additionner et soustraire avec des nombres négatifs, multiplier, prendre une fraction d'une quantité, l'opposé et l'inverse sans les confondre, diviser par une fraction, les priorités de calcul. Problèmes : la batterie du vélo électrique, l'eau douce de la Terre, un programme de calcul, la citerne et ses deux pompes. Rappel de cours avant chaque niveau, corrigé étape par étape avec un schéma pour chaque exercice, PDF à imprimer.",
};

export default function ExercicesFractionsCalcul4ePage() {
  return <FicheExercicesClient fiche={exercicesFractionsCalcul4e} />;
}
