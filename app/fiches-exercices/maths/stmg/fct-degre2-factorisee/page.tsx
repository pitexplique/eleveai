import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFctDegre2FactoriseeStmg } from "@/lib/fiches-exercices/maths-stmg-fct-degre2-factorisee";

export const metadata: Metadata = {
  title: "Degré 2, racines et signe (forme factorisée) STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur la forme factorisée : les racines, le tableau de signes et l'inéquation du second degré, sans discriminant. Un atelier de vélos, un ballon de volley, une piscine, deux drones, une copie à corriger. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesFctDegre2FactoriseeStmgPage() {
  return <FicheExercicesClient fiche={exercicesFctDegre2FactoriseeStmg} />;
}
