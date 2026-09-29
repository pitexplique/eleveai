import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFractionCalcul6e } from "@/lib/fiches-exercices/maths-6e-fraction-calcul";

// Pas de fiche de cours de 6e pour cette notion : la page répond à
// « exercices corrigés calcul fractions 6e ».
export const metadata: Metadata = {
  title: "Calculer avec les fractions 6e : 20 exercices corrigés, fraction d'une quantité, additions (PDF)",
  description:
    "Vingt exercices corrigés de calcul sur les fractions en 6e : prendre une fraction d'une quantité, additionner et soustraire des fractions de même dénominateur ou de dénominateurs multiples, multiplier une fraction par un entier. Problèmes : goûter partagé, randonnée en trois jours, argent de poche, arrosage d'une plante. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesFractionCalcul6ePage() {
  return <FicheExercicesClient fiche={exercicesFractionCalcul6e} />;
}
