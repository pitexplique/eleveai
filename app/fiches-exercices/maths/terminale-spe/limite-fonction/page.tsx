import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLimiteFonctionTerminale } from "@/lib/fiches-exercices/maths-terminale-limite-fonction";

export const metadata: Metadata = {
  title: "Limites de fonctions terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les limites de fonctions en terminale spécialité : limites de référence, opérations, formes indéterminées, limite en un point à droite et à gauche, quantité conjuguée, comparaison et gendarmes, fonctions composées, asymptotes horizontales et verticales. Problèmes de bac : relativité, cuve d'eau salée, lentille d'appareil photo, courbe en S. Rappel de cours avant chaque niveau, courbes et asymptotes dessinées, PDF à imprimer.",
};

export default function ExercicesLimiteFonctionTerminalePage() {
  return <FicheExercicesClient fiche={exercicesLimiteFonctionTerminale} />;
}
