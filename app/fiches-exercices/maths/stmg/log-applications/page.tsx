import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLogApplicationsStmg } from "@/lib/fiches-exercices/maths-stmg-log-applications";

export const metadata: Metadata = {
  title: "Logarithme, durées et ordres de grandeur STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG : déterminer un nombre d'années, un temps de doublement, une demi-vie, l'ordre de grandeur et le nombre de chiffres d'un entier avec le logarithme décimal. Un livret d'épargne, une salle d'escalade, une forêt, une dette, l'échiquier. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesLogApplicationsStmgPage() {
  return <FicheExercicesClient fiche={exercicesLogApplicationsStmg} />;
}
