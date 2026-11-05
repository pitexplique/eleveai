import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoFormulesStmg } from "@/lib/fiches-exercices/maths-stmg-auto-formules";

export const metadata: Metadata = {
  title: "Formules et calcul littéral STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les formules : réduire sans se tromper de signe, isoler une lettre, remplacer les lettres par des valeurs, retrouver un prix hors taxes. Un vélo, un enclos, une perfusion, le devis d'un plombier, un stade, les degrés Fahrenheit. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAutoFormulesStmgPage() {
  return <FicheExercicesClient fiche={exercicesAutoFormulesStmg} />;
}
