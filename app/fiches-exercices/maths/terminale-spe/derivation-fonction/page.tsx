import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDerivationFonctionTerminale } from "@/lib/fiches-exercices/maths-terminale-derivation-fonction";

export const metadata: Metadata = {
  title: "Dérivation et variations terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur la dérivation en terminale spécialité : dérivée d'une composée (exponentielle, cosinus, racine, puissances), produits et quotients, tangentes, variations, fonction auxiliaire, inégalités par étude de fonction, taux de variation en Python. Problèmes de bac : pic de pollution, coût moyen le plus bas, lampe au-dessus d'une table, pic d'audience d'une vidéo. Rappel de cours avant chaque niveau, courbes, tangentes et tableaux dessinés, PDF à imprimer.",
};

export default function ExercicesDerivationFonctionTerminalePage() {
  return <FicheExercicesClient fiche={exercicesDerivationFonctionTerminale} />;
}
