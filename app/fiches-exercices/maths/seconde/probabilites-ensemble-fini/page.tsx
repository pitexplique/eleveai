import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProbabilitesSeconde } from "@/lib/fiches-exercices/maths-seconde-probabilites";

export const metadata: Metadata = {
  title: "Probabilités en seconde : 20 exercices corrigés, arbres et tableaux (PDF)",
  description:
    "Vingt exercices corrigés de probabilités en seconde : univers et événements, loi de probabilité, équiprobabilité, événement contraire, réunion et intersection, P(A ∪ B), arbres et tableaux à double entrée. Un digicode, les mois de naissance d'un groupe d'amis, la roulette du casino, les groupes sanguins en France. Chaque corrigé a son schéma. PDF à imprimer.",
};

export default function ExercicesProbabilitesSecondePage() {
  return <FicheExercicesClient fiche={exercicesProbabilitesSeconde} />;
}
