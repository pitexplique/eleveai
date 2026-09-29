import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesConvexiteFonctionTerminale } from "@/lib/fiches-exercices/maths-terminale-convexite-fonction";

export const metadata: Metadata = {
  title: "Convexité terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur la convexité en terminale spécialité : dérivée seconde, fonctions convexes et concaves, points d'inflexion, position de la courbe par rapport à ses tangentes et à ses cordes, inégalités eˣ ≥ x + 1 et ln(1 + x) ≤ x. Problèmes de bac : alcoolémie, câble entre deux pylônes, méthode de Newton en Python. Rappel de cours avant chaque niveau, courbes et tangentes dessinées, PDF à imprimer.",
};

export default function ExercicesConvexiteFonctionTerminalePage() {
  return <FicheExercicesClient fiche={exercicesConvexiteFonctionTerminale} />;
}
