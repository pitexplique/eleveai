import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPourcentageCm2 } from "@/lib/fiches-exercices/maths-cm2-pourcentage";

export const metadata: Metadata = {
  title: "Pourcentages CM2 : 20 exercices corrigés, 10 %, 25 %, 50 %, remises (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Lire un pourcentage sur une grille de 100 cases, l'écrire en fraction et avec une virgule, calculer 10 %, 25 % ou 50 % d'une quantité, une remise et le prix à payer. Un ballon de foot, des soldes, un sondage, un verger, l'eau du corps humain et une piscine. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesPourcentageCm2Page() {
  return <FicheExercicesClient fiche={exercicesPourcentageCm2} />;
}
