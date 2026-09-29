import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDecimalCalcul6e } from "@/lib/fiches-exercices/maths-6e-decimal-calcul";

// ⚠️ Cette page répond à « exercices corrigés calcul nombres décimaux 6e » :
// addition, soustraction, multiplication, division posées.
export const metadata: Metadata = {
  title: "Calcul avec les décimaux 6e : 20 exercices corrigés, opérations posées (PDF)",
  description:
    "Vingt exercices corrigés de calcul avec les nombres décimaux en 6e : additionner et soustraire virgule sous virgule, multiplier, multiplier par 0,1, 0,01, 0,001, diviser par un entier en continuant après la virgule, ordre de grandeur. Problèmes : sortie au parc, tomates du potager, eau de la douche, nombre mystère. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesDecimalCalcul6ePage() {
  return <FicheExercicesClient fiche={exercicesDecimalCalcul6e} />;
}
