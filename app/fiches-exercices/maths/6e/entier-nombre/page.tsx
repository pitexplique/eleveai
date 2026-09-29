import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesEntierNombre6e } from "@/lib/fiches-exercices/maths-6e-entier-nombre";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les nombres entiers ») :
// cette page répond à « exercices corrigés nombres entiers 6e ».
export const metadata: Metadata = {
  title: "Nombres entiers 6e : 20 exercices corrigés, lire, comparer, encadrer (PDF)",
  description:
    "Vingt exercices corrigés sur les nombres entiers en 6e : écrire en chiffres et en lettres, chiffre des et nombre de, comparer et ranger, décomposer, encadrer, lire une droite graduée. Problèmes : un chèque, un nombre mystère, un comptage d'oiseaux, un compteur de voiture. Rappel de cours avant chaque niveau, corrigé étape par étape avec le tableau de numération, PDF à imprimer.",
};

export default function ExercicesEntierNombre6ePage() {
  return <FicheExercicesClient fiche={exercicesEntierNombre6e} />;
}
