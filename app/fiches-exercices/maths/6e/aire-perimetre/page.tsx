import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAirePerimetre6e } from "@/lib/fiches-exercices/maths-6e-aire-perimetre";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les périmètres ») :
// cette page répond à « exercices corrigés périmètre 6e ».
export const metadata: Metadata = {
  title: "Périmètre 6e : 20 exercices corrigés, carré, rectangle, figures (PDF)",
  description:
    "Vingt exercices corrigés sur le périmètre en 6e : suivre le tour d'une figure sur quadrillage, périmètre du carré, du rectangle, du triangle, d'une figure en L, retrouver un côté, figures collées. Une cabane à oiseaux, un poulailler, un terrain de handball, un jardin partagé, une guirlande lumineuse, les tables de la fête. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesAirePerimetre6ePage() {
  return <FicheExercicesClient fiche={exercicesAirePerimetre6e} />;
}
