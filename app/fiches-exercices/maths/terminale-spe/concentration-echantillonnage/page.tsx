import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesConcentrationEchantillonnageTerminale } from "@/lib/fiches-exercices/maths-terminale-concentration-echantillonnage";

export const metadata: Metadata = {
  title: "Concentration et loi des grands nombres terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur la concentration et la loi des grands nombres en terminale spécialité : moyenne d'un échantillon, inégalité de Bienaymé-Tchebychev, inégalité de concentration, loi des grands nombres, fluctuation d'une fréquence, taille d'échantillon, simulations en Python. Problèmes de bac : taille d'un sondage, machine à café, assurance, calcul de π au hasard. Rappel de cours avant chaque niveau, intervalles garantis dessinés, PDF à imprimer.",
};

export default function ExercicesConcentrationEchantillonnageTerminalePage() {
  return <FicheExercicesClient fiche={exercicesConcentrationEchantillonnageTerminale} />;
}
