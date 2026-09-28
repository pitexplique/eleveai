import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesInfoInterpolerExtrapolerPremiere } from "@/lib/fiches-exercices/maths-premiere-info-interpoler-extrapoler";

export const metadata: Metadata = {
  title: "Interpoler et extrapoler — 1re : 20 exercices corrigés avec une droite d'ajustement (PDF)",
  description:
    "Vingt exercices corrigés pour la première : interpoler entre les relevés, extrapoler au-delà, et juger les limites d'une prévision. Température en montagne, glacier, population d'une ville, eau qui bout, date des vendanges. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesInfoInterpolerExtrapolerPremierePage() {
  return <FicheExercicesClient fiche={exercicesInfoInterpolerExtrapolerPremiere} />;
}
