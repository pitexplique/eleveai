import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProblemeCm2 } from "@/lib/fiches-exercices/maths-cm2-probleme";

export const metadata: Metadata = {
  title: "Problèmes CM2 : 20 exercices corrigés, une ou plusieurs étapes, recherche (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Choisir la bonne opération, résoudre en une étape puis en plusieurs, choisir la bonne phrase-réponse, compter toutes les possibilités, chercher le plus petit ou le plus grand. Un infirmier, un zoo, une boulangerie, une fleuriste, un parc animalier, un glacier et une ferme. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesProblemeCm2Page() {
  return <FicheExercicesClient fiche={exercicesProblemeCm2} />;
}
