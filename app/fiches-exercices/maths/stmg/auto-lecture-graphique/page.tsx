import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoLectureGraphiqueStmg } from "@/lib/fiches-exercices/maths-stmg-auto-lecture-graphique";

export const metadata: Metadata = {
  title: "Lire une courbe STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG pour lire une courbe : image, antécédent, échelle d'un axe, point qui appartient à une courbe, seuil dépassé. Une rivière en crue, des panneaux solaires, un musée, un drone, des abeilles. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAutoLectureGraphiqueStmgPage() {
  return <FicheExercicesClient fiche={exercicesAutoLectureGraphiqueStmg} />;
}
