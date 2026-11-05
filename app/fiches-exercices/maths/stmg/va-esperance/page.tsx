import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesVaEsperanceStmg } from "@/lib/fiches-exercices/maths-stmg-va-esperance";

export const metadata: Metadata = {
  title: "Espérance d'une variable aléatoire STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur l'espérance : la calculer, prévoir un total sur un grand nombre de répétitions, juger si un jeu est équitable, fixer une mise ou une prime d'assurance, choisir entre deux options. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesVaEsperanceStmgPage() {
  return <FicheExercicesClient fiche={exercicesVaEsperanceStmg} />;
}
