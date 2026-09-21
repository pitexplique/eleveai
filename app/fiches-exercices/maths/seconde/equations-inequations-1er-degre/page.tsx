import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesEquationsSeconde } from "@/lib/fiches-exercices/maths-seconde-equations";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés équations inéquations seconde », l'autre à « cours ».
export const metadata: Metadata = {
  title: "Équations et inéquations en seconde : 20 exercices corrigés, avec les intervalles dessinés (PDF)",
  description:
    "Vingt exercices corrigés sur les équations et inéquations du premier degré en seconde : résoudre, diviser par un négatif, écrire les solutions en intervalle et les voir sur une droite graduée, aucune solution ou tous les nombres, comparer par la différence ou le quotient, mettre un problème en équation. Le marché de Saint-Paul, le froid au Piton des Neiges, une course. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesEquationsSecondePage() {
  return <FicheExercicesClient fiche={exercicesEquationsSeconde} />;
}
