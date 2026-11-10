import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteCm1 } from "@/lib/fiches-exercices/maths-cm1-suite";

// ⚠️ Cette page répond à « exercices suites de nombres CM1 » : continuer une
// suite, trouver sa règle, croissante ou décroissante, suites de figures.
export const metadata: Metadata = {
  title: "Suites de nombres CM1 : 20 exercices corrigés, règle, continuer (PDF)",
  description:
    "Vingt exercices corrigés sur les suites de nombres au CM1 : continuer une suite, trouver le nombre qui manque, trouver la règle (ajouter, enlever, multiplier), dire si elle est croissante ou décroissante, des sauts sur une droite et des carrés en allumettes. Problèmes : une tirelire, un jardin de tulipes, des gradins, une frise de carreaux. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesSuiteCm1Page() {
  return <FicheExercicesClient fiche={exercicesSuiteCm1} />;
}
