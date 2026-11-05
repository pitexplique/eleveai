import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesExpoVariationsStmg } from "@/lib/fiches-exercices/maths-stmg-expo-variations";

export const metadata: Metadata = {
  title: "Fonction x ↦ kaˣ, variations et allure STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur le sens de variation de x ↦ kaˣ : comparer la base à 1, reconnaître l'allure de la courbe, le rôle de k, le lien avec les suites géométriques. Un glacier, une librairie, un club de rugby, une voiture d'occasion. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesExpoVariationsStmgPage() {
  return <FicheExercicesClient fiche={exercicesExpoVariationsStmg} />;
}
