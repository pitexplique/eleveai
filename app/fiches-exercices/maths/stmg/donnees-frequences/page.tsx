import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDonneesFrequencesStmg } from "@/lib/fiches-exercices/maths-stmg-donnees-frequences";

export const metadata: Metadata = {
  title: "Fréquence conditionnelle STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première STMG sur les fréquences marginales et conditionnelles d'un tableau croisé : « parmi les … », compléter un tableau à partir de pourcentages, comparer deux groupes, corriger une phrase de la presse. Publicité, assurance, recrutement, mutuelle, concession automobile, plan de mobilité ; l'ONU, les médailles de Paris 2024, le jeu de 52 cartes et le calendrier 2026. Arrondis annoncés, rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesDonneesFrequencesStmgPage() {
  return <FicheExercicesClient fiche={exercicesDonneesFrequencesStmg} />;
}
