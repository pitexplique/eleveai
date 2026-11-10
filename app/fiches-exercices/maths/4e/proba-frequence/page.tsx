import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFrequences4e } from "@/lib/fiches-exercices/maths-4e-frequences";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Fréquences observées
// et probabilité ») : cette page répond à « exercices corrigés fréquence
// probabilité 4e », l'autre au cours.
export const metadata: Metadata = {
  title: "Fréquence et probabilité 4e : 20 exercices corrigés, simulations et courbes (PDF)",
  description:
    "Vingt exercices corrigés de 4e : calculer une fréquence, la comparer à la probabilité, voir l'écart se réduire quand on répète, et savoir ce qu'un petit nombre d'essais ne prouve pas. Problèmes : le dé de Lucas, les oiseaux des jardins, la séance de tirs au but, la pièce de l'arbitre. Rappel de cours avant chaque niveau, corrigé étape par étape avec de vraies simulations et des courbes de fréquences, PDF à imprimer.",
};

export default function ExercicesFrequences4ePage() {
  return <FicheExercicesClient fiche={exercicesFrequences4e} />;
}
