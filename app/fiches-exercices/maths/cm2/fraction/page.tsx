import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFractionCm2 } from "@/lib/fiches-exercices/maths-cm2-fraction";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les fractions ») :
// cette page répond à « exercices corrigés fractions CM2 ».
export const metadata: Metadata = {
  title: "Fractions CM2 : 20 exercices corrigés, lire, comparer, simplifier, pourcentage (PDF)",
  description:
    "Vingt exercices corrigés sur les fractions en CM2 : lire et dessiner une fraction (barre, disque, rectangle), la placer sur la droite graduée, comparer, trouver des fractions égales et simplifier, passer d'une fraction à un nombre décimal et à un pourcentage (1/4 = 0,25 = 25 %). Problèmes : un match de basket, une fresque, des notes de musique, un sac de billes. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesFractionCm2Page() {
  return <FicheExercicesClient fiche={exercicesFractionCm2} />;
}
