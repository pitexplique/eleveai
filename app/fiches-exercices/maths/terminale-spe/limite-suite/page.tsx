import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLimiteSuiteTerminale } from "@/lib/fiches-exercices/maths-terminale-limite-suite";

export const metadata: Metadata = {
  title: "Limites de suites terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les limites de suites en terminale spécialité : limites de référence, suites géométriques, formes indéterminées, comparaison, gendarmes, convergence monotone, récurrence, démonstration de l'inégalité de Bernoulli, boucle de seuil en Python. Problèmes de bac : truites d'un bassin, balle qui rebondit, flocon de Koch. Rappel de cours avant chaque niveau, termes et limites dessinés, PDF à imprimer.",
};

export default function ExercicesLimiteSuiteTerminalePage() {
  return <FicheExercicesClient fiche={exercicesLimiteSuiteTerminale} />;
}
