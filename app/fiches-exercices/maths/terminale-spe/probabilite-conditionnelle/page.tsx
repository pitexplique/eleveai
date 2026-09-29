import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProbabiliteConditionnelleTerminale } from "@/lib/fiches-exercices/maths-terminale-probabilite-conditionnelle";

export const metadata: Metadata = {
  title: "Probabilités conditionnelles terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les probabilités conditionnelles en terminale spécialité : arbres pondérés à trois branches et à trois niveaux, probabilités totales, indépendance, épreuves successives, inversion du conditionnement (dépistage, contrôle qualité, filtre anti-spam, double test), suites de probabilités et boucle Python. Problèmes de bac : vaccin et malades, dé et deux urnes, QCM au hasard, bit à travers des relais. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesProbabiliteConditionnelleTerminalePage() {
  return <FicheExercicesClient fiche={exercicesProbabiliteConditionnelleTerminale} />;
}
