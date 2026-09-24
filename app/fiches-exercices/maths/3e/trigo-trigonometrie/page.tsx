import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesTrigonometrie3e } from "@/lib/fiches-exercices/maths-3e-trigonometrie";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Trigonométrie :
// sinus, cosinus, tangente ») : cette page répond à « exercices corrigés
// trigonométrie 3e », l'autre à « cours trigonométrie 3e ».
export const metadata: Metadata = {
  title: "Trigonométrie 3e : 20 exercices corrigés, cosinus, sinus, tangente (PDF)",
  description:
    "Vingt exercices corrigés de 3e sur la trigonométrie : nommer l'hypoténuse, l'adjacent et l'opposé, choisir entre cosinus, sinus et tangente (CAH-SOH-TOA), calculer une longueur ou un angle, rédiger comme au brevet. Problèmes : la hauteur de la tour Eiffel, une échelle contre un mur, un cerf-volant, la rue la plus pentue du monde, la descente d'un avion. Chaque corrigé a son triangle dessiné à l'échelle, étape par étape, avec le piège nommé. PDF à imprimer.",
};

export default function ExercicesTrigonometrie3ePage() {
  return <FicheExercicesClient fiche={exercicesTrigonometrie3e} />;
}
