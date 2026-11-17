import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesNombreEntierCe1 } from "@/lib/fiches-exercices/maths-ce1-nombre-entier";

// ⚠️ Cette page répond à « exercices nombres jusqu'à 1 000 CE1 : lire, écrire, centaines, comparer, ranger, ordinaux ».
export const metadata: Metadata = {
  title: "Nombres jusqu'à 1 000 CE1 : 20 exercices corrigés, centaines, comparer, ranger (PDF)",
  description:
    "Vingt exercices corrigés sur les nombres jusqu'à 1 000 au CE1 : compter par dizaines, lire et écrire les nombres, centaines, dizaines et unités, comparer, ranger, encadrer, placer sur une droite graduée, les rangs (premier, dixième, centième). Dessins à compter, rappel de cours avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesNombreEntierCe1Page() {
  return <FicheExercicesClient fiche={exercicesNombreEntierCe1} />;
}
