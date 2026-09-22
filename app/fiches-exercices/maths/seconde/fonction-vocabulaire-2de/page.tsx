import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFonctionsSeconde } from "@/lib/fiches-exercices/maths-seconde-fonctions";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés image antécédent seconde », l'autre à « cours ».
export const metadata: Metadata = {
  title: "Image, antécédent et courbe d'une fonction en seconde : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les fonctions en seconde : calculer une image, chercher les antécédents, domaine de définition, lire une courbe, résoudre graphiquement f(x) = k et f(x) < k, comparer deux courbes. Un plongeon de 10 mètres, des panneaux solaires, la distance de freinage, le CO2 de l'atmosphère. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesFonctionsSecondePage() {
  return <FicheExercicesClient fiche={exercicesFonctionsSeconde} />;
}
