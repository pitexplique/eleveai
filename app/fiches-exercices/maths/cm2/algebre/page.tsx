import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgebreCm2 } from "@/lib/fiches-exercices/maths-cm2-algebre";

export const metadata: Metadata = {
  title: "Débuts de l'algèbre CM2 : 20 exercices corrigés, égalités, nombre caché, motifs (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Lire et compléter une égalité, trouver le nombre caché, lire un schéma en barres, continuer un motif qui grandit et trouver une étape lointaine sans tout dessiner. Une course de relais, un ukulélé, un restaurant, un tour de magie, un bassin et un robot. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesAlgebreCm2Page() {
  return <FicheExercicesClient fiche={exercicesAlgebreCm2} />;
}
