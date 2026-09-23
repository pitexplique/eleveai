import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesRepereSeconde } from "@/lib/fiches-exercices/maths-seconde-repere";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés repère coordonnées seconde », l'autre à « cours ».
export const metadata: Metadata = {
  title: "Repère et coordonnées en seconde : 20 exercices corrigés, milieu et distance (PDF)",
  description:
    "Vingt exercices corrigés sur le repère en seconde : lire et placer un point, milieu d'un segment, distance dans un repère orthonormé, puis prouver un parallélogramme, un rectangle, un losange, un triangle rectangle ou des points sur un cercle. Un plan de ville, un terrain de football, trois antennes qui localisent un téléphone, un pré relevé au GPS. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesRepereSecondePage() {
  return <FicheExercicesClient fiche={exercicesRepereSeconde} />;
}
