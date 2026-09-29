import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesGeometrieEspaceTerminale } from "@/lib/fiches-exercices/maths-terminale-geometrie-espace";

export const metadata: Metadata = {
  title: "Vecteurs, droites et plans de l'espace terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de géométrie dans l'espace en terminale spécialité : coordonnées dans un cube, colinéarité, coplanarité, représentations paramétriques de droites, équations de plans, positions relatives, intersection d'une droite et d'un plan, de deux plans. Problèmes de bac : câbles d'un entrepôt, ombre d'un mât sur une pente, trépied, tunnel creusé des deux côtés. Rappel de cours avant chaque niveau, figures en perspective cavalière, PDF à imprimer.",
};

export default function ExercicesGeometrieEspaceTerminalePage() {
  return <FicheExercicesClient fiche={exercicesGeometrieEspaceTerminale} />;
}
