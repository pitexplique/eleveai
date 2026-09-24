import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPythagore3e } from "@/lib/fiches-exercices/maths-3e-pythagore";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Pythagore, sa
// réciproque, et la rédaction attendue ») : cette page répond à « exercices
// corrigés Pythagore 3e », l'autre à « cours Pythagore 3e ».
export const metadata: Metadata = {
  title: "Pythagore 3e : 20 exercices corrigés, réciproque et rédaction brevet (PDF)",
  description:
    "Vingt exercices corrigés de 3e sur le théorème de Pythagore : repérer l'hypoténuse, calculer une longueur, démontrer qu'un triangle est rectangle avec la réciproque — ou qu'il ne l'est pas avec la contraposée —, et rédiger comme au brevet. Problèmes : une échelle contre un mur, une tyrolienne, la route d'un voilier, une rampe d'accès, le coin d'un terrain de football. Chaque corrigé a son triangle dessiné à l'échelle, étape par étape, avec le piège nommé. PDF à imprimer.",
};

export default function ExercicesPythagore3ePage() {
  return <FicheExercicesClient fiche={exercicesPythagore3e} />;
}
