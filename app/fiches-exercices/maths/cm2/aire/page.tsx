import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAireCm2 } from "@/lib/fiches-exercices/maths-cm2-aire";

export const metadata: Metadata = {
  title: "Aires CM2 : 20 exercices corrigés, carreaux, cm² m², rectangle, triangle (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Compter des carreaux, choisir entre cm², dm² et m², calculer l'aire d'un carré, d'un rectangle, d'un triangle rectangle, découper une figure en rectangles. Un potager, une voile de bateau, une cuisine à carreler, une fresque, des panneaux solaires et un enclos de chèvres. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesAireCm2Page() {
  return <FicheExercicesClient fiche={exercicesAireCm2} />;
}
