import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDenombrementCombinatoireTerminale } from "@/lib/fiches-exercices/maths-terminale-denombrement-combinatoire";

export const metadata: Metadata = {
  title: "Dénombrement et combinatoire terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de dénombrement en terminale spécialité : principes additif et multiplicatif, listes, arrangements, permutations, factorielles, combinaisons, triangle de Pascal, parties d'un ensemble, démonstrations du cours. Problèmes de bac : tournoi, jeu de tirage, planche de Galton, anniversaires. Rappel de cours avant chaque niveau, arbres, cases et triangle de Pascal dessinés, PDF à imprimer.",
};

export default function ExercicesDenombrementCombinatoireTerminalePage() {
  return <FicheExercicesClient fiche={exercicesDenombrementCombinatoireTerminale} />;
}
