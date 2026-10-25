import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFractionMixteCm2 } from "@/lib/fiches-exercices/maths-cm2-fraction-mixte";

// Cette page répond à « exercices corrigés fraction plus grande que 1 CM2 ».
export const metadata: Metadata = {
  title: "Fractions plus grandes que 1 CM2 : 20 exercices corrigés, entier + fraction, encadrer (PDF)",
  description:
    "Vingt exercices corrigés pour les fractions plus grandes que 1 en CM2 : écrire 7/4 = 1 + 3/4 avec la table, regrouper 2 + 3/5 en 13/5, encadrer une fraction entre deux entiers, la placer sur la droite graduée et l'écrire avec une virgule. Problèmes : une boulangerie, un train, des rubans, une fraction mystère. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesFractionMixteCm2Page() {
  return <FicheExercicesClient fiche={exercicesFractionMixteCm2} />;
}
