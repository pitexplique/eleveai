import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDonneesTableauCroiseStmg } from "@/lib/fiches-exercices/maths-stmg-donnees-tableau-croise";

export const metadata: Metadata = {
  title: "Tableau croisé d'effectifs STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première STMG sur le tableau croisé d'effectifs : lire une case et une marge, calculer les marges et le total général, compléter un tableau, le dresser à partir de données brutes, trouver l'erreur. Satisfaction des clients, contrats des salariés, colis en retard, crédits d'une banque, billetterie d'un festival ; le jeu de 52 cartes, les planètes, les régions de France, le calendrier 2026 et les médailles de Paris 2024. Rappel de cours avant chaque niveau, corrigé étape par étape avec le tableau complété.",
};

export default function ExercicesDonneesTableauCroiseStmgPage() {
  return <FicheExercicesClient fiche={exercicesDonneesTableauCroiseStmg} />;
}
