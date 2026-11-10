import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesEchelleCm2 } from "@/lib/fiches-exercices/maths-cm2-echelle";

export const metadata: Metadata = {
  title: "Échelles CM2 : 20 exercices corrigés, plan, vraie distance (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Lire une échelle, passer du plan à la vraie distance et retour, convertir avant de calculer, retrouver l'échelle d'un plan. Des cartes, une maquette de bus, une chambre, une architecte, un avion, un terrain de football et une mare. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesEchelleCm2Page() {
  return <FicheExercicesClient fiche={exercicesEchelleCm2} />;
}
