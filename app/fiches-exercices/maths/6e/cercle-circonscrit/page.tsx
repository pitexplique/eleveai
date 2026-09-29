import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesCercleCirconscrit6e } from "@/lib/fiches-exercices/maths-6e-cercle-circonscrit";

// Pas de fiche de cours pour cette notion : la page répond à « exercices
// corrigés médiatrices cercle circonscrit 6e », preuve comprise.
export const metadata: Metadata = {
  title: "Médiatrices et cercle circonscrit 6e : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les médiatrices d'un triangle et le cercle circonscrit en 6e : les trois médiatrices se coupent en un même point, la preuve en quatre phrases, construire le cercle circonscrit, triangle obtus, isocèle, équilatéral, points alignés. Problèmes : puits de trois fermes, assiette cassée, table ronde. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesCercleCirconscrit6ePage() {
  return <FicheExercicesClient fiche={exercicesCercleCirconscrit6e} />;
}
