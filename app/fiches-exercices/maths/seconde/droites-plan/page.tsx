import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDroitesSeconde } from "@/lib/fiches-exercices/maths-seconde-droites";

export const metadata: Metadata = {
  title: "Droites du plan en seconde : 20 exercices corrigés, équations et systèmes (PDF)",
  description:
    "Vingt exercices corrigés sur les droites en seconde : équation réduite, droite verticale, équation cartésienne, vecteur directeur, droites parallèles, point d'intersection, systèmes de deux équations. Deux randonneurs qui se croisent, la billetterie d'un concert, le centre de gravité d'un triangle, un bateau qui évite un rocher. Chaque corrigé dessine ses droites. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesDroitesSecondePage() {
  return <FicheExercicesClient fiche={exercicesDroitesSeconde} />;
}
