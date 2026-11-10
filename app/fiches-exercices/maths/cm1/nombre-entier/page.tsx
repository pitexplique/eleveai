import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesNombreEntierCm1 } from "@/lib/fiches-exercices/maths-cm1-nombre-entier";

// ⚠️ Cette page répond à « exercices nombres entiers CM1 » : lire, écrire,
// comparer, décomposer, arrondir, encadrer, multiples et diviseurs.
export const metadata: Metadata = {
  title: "Nombres entiers CM1 : 20 exercices corrigés, lire, comparer, arrondir (PDF)",
  description:
    "Vingt exercices corrigés sur les nombres entiers au CM1 : lire et écrire les grands nombres, comparer et ranger, décomposer, chiffre et nombre de centaines, arrondir, encadrer, placer sur une droite graduée, reconnaître un multiple et un diviseur. Problèmes : une bibliothèque, des cartons de jus, un musée, un coffre à code. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesNombreEntierCm1Page() {
  return <FicheExercicesClient fiche={exercicesNombreEntierCm1} />;
}
