import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDerSecanteTangenteStmg } from "@/lib/fiches-exercices/maths-stmg-der-secante-tangente";

export const metadata: Metadata = {
  title: "Sécantes et tangente STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les sécantes et la tangente : coefficient directeur d'une sécante, équation, sécantes qui se rapprochent de la tangente, reconnaître une tangente. Un plongeon, un médicament, un panneau solaire, un sentier. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesDerSecanteTangenteStmgPage() {
  return <FicheExercicesClient fiche={exercicesDerSecanteTangenteStmg} />;
}
