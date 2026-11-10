import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesNombreDecimalCm1 } from "@/lib/fiches-exercices/maths-cm1-nombre-decimal";

// ⚠️ Cette page répond à « exercices nombres décimaux CM1 ».
export const metadata: Metadata = {
  title: "Nombres décimaux CM1 : 20 exercices corrigés, lire, comparer, ranger, droite graduée (PDF)",
  description:
    "Vingt exercices corrigés sur les nombres décimaux au CM1 : lire et écrire un nombre à virgule, passer d'une fraction décimale au nombre décimal, valeur d'un chiffre, comparer et ranger, placer sur la droite graduée, arrondir à l'unité, multiplier et diviser par 10 ou 100. Problèmes : des prix, un saut en longueur, des chatons chez la vétérinaire, une énigme. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesNombreDecimalCm1Page() {
  return <FicheExercicesClient fiche={exercicesNombreDecimalCm1} />;
}
