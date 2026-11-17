import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDivisionPartageCe1 } from "@/lib/fiches-exercices/maths-ce1-division-partage";

// ⚠️ Cette page répond à « exercices partages et groupements CE1 : parts égales, paquets, reste ».
export const metadata: Metadata = {
  title: "Partages et groupements CE1 : 20 exercices corrigés, parts égales et reste (PDF)",
  description:
    "Vingt exercices corrigés sur les partages et les groupements au CE1 : partager en parts égales, faire des paquets de même taille, savoir ce qu'on fait des objets qui restent, vérifier avec une multiplication. Problèmes : les 75 œufs du fermier, le goûter de la classe, des barques sur le lac, un potager. Dessins de jetons et d'assiettes, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesDivisionPartageCe1Page() {
  return <FicheExercicesClient fiche={exercicesDivisionPartageCe1} />;
}
