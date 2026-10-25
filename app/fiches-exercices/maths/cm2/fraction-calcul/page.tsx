import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFractionCalculCm2 } from "@/lib/fiches-exercices/maths-cm2-fraction-calcul";

// Cette page répond à « exercices corrigés calcul fractions CM2 ».
export const metadata: Metadata = {
  title: "Calculer avec les fractions CM2 : 20 exercices corrigés, addition, produit, fraction d'un nombre (PDF)",
  description:
    "Vingt exercices corrigés pour calculer avec les fractions en CM2 : additionner et soustraire (même dénominateur, ou l'un multiple de l'autre), multiplier une fraction par un entier, prendre une fraction d'une quantité (2/3 de 12 billes). Problèmes : un match de football, une kermesse, un refuge pour tortues, une haie à planter. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesFractionCalculCm2Page() {
  return <FicheExercicesClient fiche={exercicesFractionCalculCm2} />;
}
