import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProbabilitesConditionnellesSeconde } from "@/lib/fiches-exercices/maths-seconde-probabilites-conditionnelles";

export const metadata: Metadata = {
  title: "Probabilités conditionnelles en seconde : 20 exercices corrigés, arbres et faux positifs (PDF)",
  description:
    "Vingt exercices corrigés de probabilités conditionnelles en seconde : tableau croisé, P_A(B), arbre pondéré, somme des chemins, et la différence entre « B sachant A » et « A sachant B ». Un test de dépistage positif, trois machines et leur contrôle qualité, une application météo, un filtre anti-spam. Arbres et tableaux dans les corrigés. PDF à imprimer.",
};

export default function ExercicesProbabilitesConditionnellesSecondePage() {
  return <FicheExercicesClient fiche={exercicesProbabilitesConditionnellesSeconde} />;
}
