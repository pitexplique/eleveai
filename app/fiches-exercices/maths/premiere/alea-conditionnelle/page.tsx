import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAleaConditionnellePremiere } from "@/lib/fiches-exercices/maths-premiere-alea-conditionnelle";

export const metadata: Metadata = {
  title: "Probabilité conditionnelle, reconnaître — 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première : repérer « parmi » et « sachant que », écrire P_A(B), la calculer dans un tableau croisé d'effectifs. Forêts, abeilles, festival, tirs au but, capteurs de laboratoire, exode rural, tortues marines, tennis. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAleaConditionnellePremierePage() {
  return <FicheExercicesClient fiche={exercicesAleaConditionnellePremiere} />;
}
