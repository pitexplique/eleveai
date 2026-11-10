import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProbabiliteCm2 } from "@/lib/fiches-exercices/maths-cm2-probabilite";

export const metadata: Metadata = {
  title: "Probabilités CM2 : 20 exercices corrigés, certain, possible, impossible, chances (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Dire si c'est certain, possible ou impossible, compter les chances avec un sac de billes, une roue, un dé, comparer deux jeux, lister les issues de deux épreuves. Une kermesse, une roue de fête foraine, un dé fait main et pierre-feuille-ciseaux. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesProbabiliteCm2Page() {
  return <FicheExercicesClient fiche={exercicesProbabiliteCm2} />;
}
