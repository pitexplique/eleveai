import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoDroitesStmg } from "@/lib/fiches-exercices/maths-stmg-auto-droites";

export const metadata: Metadata = {
  title: "Droites et coefficient directeur STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les droites : placer un point, lire une équation réduite sur le dessin, calculer un coefficient directeur, trouver l'équation à partir de deux points. Une montgolfière, un four de boulanger, un taxi, un glacier, une perfusion. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAutoDroitesStmgPage() {
  return <FicheExercicesClient fiche={exercicesAutoDroitesStmg} />;
}
