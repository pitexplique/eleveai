import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesInfoAjustementAffinePremiere } from "@/lib/fiches-exercices/maths-premiere-info-ajustement-affine";

export const metadata: Metadata = {
  title: "Ajustement affine — 1re : 20 exercices corrigés sur les nuages de points (PDF)",
  description:
    "Vingt exercices corrigés d'ajustement affine pour la première : juger si un nuage de points est rectiligne, déterminer l'équation d'une droite d'ajustement par deux points, l'utiliser pour calculer. Forêt, vélos partagés, ressort, festival, voiture électrique. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesInfoAjustementAffinePremierePage() {
  return <FicheExercicesClient fiche={exercicesInfoAjustementAffinePremiere} />;
}
