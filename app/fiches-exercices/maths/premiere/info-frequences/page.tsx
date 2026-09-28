import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesInfoFrequencesPremiere } from "@/lib/fiches-exercices/maths-premiere-info-frequences";

export const metadata: Metadata = {
  title: "Fréquences marginales et conditionnelles — 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première sur les fréquences dans un tableau croisé : fréquence marginale, fréquence conditionnelle, « parmi les… », comparer deux groupes, paradoxe des deux engrais. Capteurs de température, migrations, éoliennes, télétravail. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesInfoFrequencesPremierePage() {
  return <FicheExercicesClient fiche={exercicesInfoFrequencesPremiere} />;
}
