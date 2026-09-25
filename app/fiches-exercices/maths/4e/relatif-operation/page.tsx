import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesRelatifs4e } from "@/lib/fiches-exercices/maths-4e-relatifs";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les opérations sur les
// nombres relatifs ») : cette page répond à « exercices corrigés nombres
// relatifs 4e », l'autre à « cours opérations relatifs 4e ».
export const metadata: Metadata = {
  title:
    "Nombres relatifs 4e : 20 exercices corrigés, règle des signes et priorités (PDF)",
  description:
    "Vingt exercices corrigés de 4e : additionner et soustraire des relatifs, multiplier et diviser avec la règle des signes, compter les facteurs négatifs, calculer avec parenthèses, priorités et trait de fraction. Problèmes : de la mer Morte à l'Everest, l'air à 11 km d'altitude, les records de froid et de chaud, la carte de golf. Rappel de cours avant chaque niveau, corrigé étape par étape avec la droite graduée, PDF à imprimer.",
};

export default function ExercicesRelatifs4ePage() {
  return <FicheExercicesClient fiche={exercicesRelatifs4e} />;
}
