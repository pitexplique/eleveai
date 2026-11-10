import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLongueurCm2 } from "@/lib/fiches-exercices/maths-cm2-longueur";

export const metadata: Metadata = {
  title: "Longueurs CM2 : 20 exercices corrigés, convertir, comparer, estimer (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Convertir des km, m, cm et mm avec le tableau, comparer des longueurs, lire une règle et estimer la bonne unité. Des étagères de menuisière, des tournesols, une girafe, une piste cyclable et une pile de jetons. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesLongueurCm2Page() {
  return <FicheExercicesClient fiche={exercicesLongueurCm2} />;
}
