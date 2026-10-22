import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesVaEchantillonnageStmg } from "@/lib/fiches-exercices/maths-stmg-va-echantillonnage";

export const metadata: Metadata = {
  title: "Fluctuation d'échantillonnage STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première STMG sur l'échantillonnage : observer la fluctuation sur des simulations, calculer 1 ÷ √n et l'intervalle où tombent environ 95 % des fréquences, décider si une observation est fréquente ou rare, choisir la taille d'un échantillon (n multiplié par k² pour diviser la distance par k). Contrôle qualité, sondages, maternité, banque, e-commerce ; le don du sang, les naissances, l'élection présidentielle de 2022, la roulette du casino. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesVaEchantillonnageStmgPage() {
  return <FicheExercicesClient fiche={exercicesVaEchantillonnageStmg} />;
}
