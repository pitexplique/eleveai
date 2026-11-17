import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDivisionCe2 } from "@/lib/fiches-exercices/maths-ce2-division";

// ⚠️ Cette page répond à « exercices division CE2 : partages et groupements, signe ÷, lien avec la multiplication, reste ».
export const metadata: Metadata = {
  title: "Partages et groupements CE2 : 20 exercices corrigés, signe ÷, tables, le reste (PDF)",
  description:
    "Vingt exercices corrigés sur la division au CE2 : partager en parts égales, faire des groupes, écrire avec le signe ÷, retrouver une division dans une table de multiplication, savoir quoi faire du reste. Sans division posée. Défis : une fête d'école, un fleuriste, des cartes à partager, des pots de miel. Corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesDivisionCe2Page() {
  return <FicheExercicesClient fiche={exercicesDivisionCe2} />;
}
