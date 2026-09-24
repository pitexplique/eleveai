import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesRationnels3e } from "@/lib/fiches-exercices/maths-3e-nombres-rationnels";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les nombres
// rationnels ») : cette page répond à « exercices corrigés fractions 3e »,
// l'autre à « cours nombres rationnels 3e ».
export const metadata: Metadata = {
  title:
    "Nombres rationnels et fractions 3e : 20 exercices corrigés, comparer, calculer (PDF)",
  description:
    "Vingt exercices corrigés de 3e : reconnaître un nombre rationnel, passer de la fraction à l'écriture décimale et retour, comparer des fractions (négatives comprises), calculer avec les priorités, diviser par une fraction, trouver un rationnel entre deux autres. Problèmes : le trail, quatre stations dans le froid, rien entre 0,99 et 1 ?, les gobelets de jus. Rappel de cours avant chaque niveau, corrigé étape par étape avec la droite graduée, PDF à imprimer.",
};

export default function ExercicesRationnels3ePage() {
  return <FicheExercicesClient fiche={exercicesRationnels3e} />;
}
