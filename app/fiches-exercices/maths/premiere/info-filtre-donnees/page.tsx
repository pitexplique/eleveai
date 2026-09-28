import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesInfoFiltreDonneesPremiere } from "@/lib/fiches-exercices/maths-premiere-info-filtre-donnees";

export const metadata: Metadata = {
  title: "Filtrer des données (ET, OU, NON) — 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés pour la première : filtrer un fichier de données, combiner deux critères avec ET, OU, NON, retrouver un effectif dans un tableau croisé ou un diagramme de Venn. Randonnées, refuge animalier, parking, niveau sonore, élections, station de ski. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesInfoFiltreDonneesPremierePage() {
  return <FicheExercicesClient fiche={exercicesInfoFiltreDonneesPremiere} />;
}
