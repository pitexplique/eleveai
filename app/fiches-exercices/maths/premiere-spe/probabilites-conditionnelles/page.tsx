import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProbabilitesConditionnellesPremiere } from "@/lib/fiches-exercices/maths-premiere-probabilites-conditionnelles";

export const metadata: Metadata = {
  title: "Probabilités conditionnelles 1re spé : 20 exercices corrigés, arbres et indépendance (PDF)",
  description:
    "Vingt exercices corrigés de probabilités conditionnelles en première spécialité : tableau croisé, arbre pondéré, partition de l'univers, formule des probabilités totales, faux positifs, indépendance démontrée, succession de deux épreuves indépendantes, jeu des trois portes. Arbres dessinés avec le chemin en couleur, PDF à imprimer.",
};

export default function ExercicesProbabilitesConditionnellesPremierePage() {
  return <FicheExercicesClient fiche={exercicesProbabilitesConditionnellesPremiere} />;
}
