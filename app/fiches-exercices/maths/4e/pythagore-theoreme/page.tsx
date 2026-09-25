import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPythagore4e } from "@/lib/fiches-exercices/maths-4e-pythagore";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Le théorème de
// Pythagore ») : cette page répond à « exercices corrigés Pythagore 4e »,
// l'autre à « cours Pythagore 4e ».
export const metadata: Metadata = {
  title: "Pythagore 4e : 20 exercices corrigés, calculer une longueur et prouver un angle droit (PDF)",
  description:
    "Vingt exercices corrigés de 4e sur le théorème de Pythagore et sa réciproque : carrés et racines carrées, repérer l'hypoténuse, calculer l'hypoténuse ou un côté de l'angle droit avec un arrondi, prouver qu'un triangle est rectangle — ou qu'il ne l'est pas —, et rédiger. Problèmes : la diagonale d'une feuille A4, la voile d'un dériveur, la terrasse d'un maçon, un court de tennis, une tente de bivouac, un bâton dans une valise cabine. Chaque corrigé a son triangle dessiné à l'échelle, étape par étape, avec le piège nommé. PDF à imprimer.",
};

export default function ExercicesPythagore4ePage() {
  return <FicheExercicesClient fiche={exercicesPythagore4e} />;
}
