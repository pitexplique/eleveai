import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteNumeriqueTerminale } from "@/lib/fiches-exercices/maths-terminale-suite-numerique";

export const metadata: Metadata = {
  title: "Suites et récurrence terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les suites en terminale spécialité : démonstration par récurrence (formule, divisibilité, inégalité), sens de variation, suites majorées, minorées, bornées, suites u(n+1) = f(u(n)) et leur escalier, programmes Python. Problèmes de bac : tours de Hanoï, deux villes, poissons d'une réserve, deux offres d'emploi. Rappel de cours avant chaque niveau, termes dessinés, PDF à imprimer.",
};

export default function ExercicesSuiteNumeriqueTerminalePage() {
  return <FicheExercicesClient fiche={exercicesSuiteNumeriqueTerminale} />;
}
