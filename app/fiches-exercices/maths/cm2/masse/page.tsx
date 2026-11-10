import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesMasseCm2 } from "@/lib/fiches-exercices/maths-cm2-masse";

export const metadata: Metadata = {
  title: "Masses CM2 : 20 exercices corrigés, convertir, comparer, balance (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Convertir des tonnes, kg, g et mg, comparer, lire une balance en équilibre et estimer une masse. Un melon, la recette du pâtissier, un camion, un ascenseur, le sac de farine de la boulangère et des letchis. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesMasseCm2Page() {
  return <FicheExercicesClient fiche={exercicesMasseCm2} />;
}
