import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDivisionCm1 } from "@/lib/fiches-exercices/maths-cm1-division";

// ⚠️ Cette page répond à « exercices division CM1 » : partager, lien avec la
// multiplication, division posée, quotient et reste, problèmes.
export const metadata: Metadata = {
  title: "Division CM1 : 20 exercices corrigés, division posée, quotient et reste (PDF)",
  description:
    "Vingt exercices corrigés sur la division au CM1 : partager en parts égales et faire des paquets, lire deux divisions dans un rectangle de billes, retrouver une division dans les tables, poser une division, trouver le quotient et le reste, savoir quand il faut une part de plus. Problèmes : une randonnée, une bibliothèque, des macarons, des énigmes. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesDivisionCm1Page() {
  return <FicheExercicesClient fiche={exercicesDivisionCm1} />;
}
