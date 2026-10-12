import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAnalyseGraphiqueSeconde } from "@/lib/fiches-exercices/maths-seconde-analyse-graphique";

// ⚠️ Cette page répond à « exercices corrigés lecture graphique seconde » :
// le titre dit EXERCICES, et nomme ce qu'on lit sur la courbe.
export const metadata: Metadata = {
  title: "Analyse graphique en seconde : 20 exercices corrigés, lecture de courbe (PDF)",
  description:
    "Vingt exercices corrigés de lecture graphique en seconde : image et antécédents, résoudre graphiquement f(x) = k et f(x) < k, tableau de signes et tableau de variations depuis une courbe. Un food-truck, la marée, une maison solaire, une crue, le compte d'un étudiant. Chaque corrigé dresse son tableau, PDF à imprimer.",
};

export default function ExercicesAnalyseGraphiqueSecondePage() {
  return <FicheExercicesClient fiche={exercicesAnalyseGraphiqueSeconde} />;
}
