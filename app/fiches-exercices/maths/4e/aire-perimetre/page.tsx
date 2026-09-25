import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPerimetres4e } from "@/lib/fiches-exercices/maths-4e-perimetres";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les périmètres ») :
// cette page répond à « exercices corrigés périmètre 4e », l'autre à « cours
// périmètre 4e ».
export const metadata: Metadata = {
  title: "Périmètres 4e : 20 exercices corrigés, rectangle, triangle, figures composées (PDF)",
  description:
    "Vingt exercices corrigés de 4e sur les périmètres : rectangle, carré, triangle, remonter du périmètre à un côté, unités à convertir, figures composées sans compter les côtés cachés, le côté manquant retrouvé par Pythagore, agrandir une figure. Problèmes : le tour d'un terrain de football, un court de tennis, le flocon de neige de von Koch, la clôture d'un pré. Rappel de cours avant chaque niveau, corrigé étape par étape avec la figure dessinée à l'échelle et son contour en couleur, PDF à imprimer.",
};

export default function ExercicesPerimetres4ePage() {
  return <FicheExercicesClient fiche={exercicesPerimetres4e} />;
}
