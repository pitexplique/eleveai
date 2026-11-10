import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesNombreEntierCm2 } from "@/lib/fiches-exercices/maths-cm2-nombre-entier";

export const metadata: Metadata = {
  title: "Nombres entiers CM2 : 20 exercices corrigés, lire, comparer, décomposer, arrondir, multiples (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Lire et écrire les grands nombres, les comparer, les ranger, les décomposer, les arrondir, les placer sur une droite graduée, trouver des multiples et des diviseurs. Un stade, des macarons, des bouquets, des bus, des concerts, un carrelage et un camion. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesNombreEntierCm2Page() {
  return <FicheExercicesClient fiche={exercicesNombreEntierCm2} />;
}
