import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesRelatifNombre5e } from "@/lib/fiches-exercices/maths-5e-relatif-nombre";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les nombres relatifs ») :
// cette page répond à « exercices corrigés nombres relatifs 5e ».
export const metadata: Metadata = {
  title: "Nombres relatifs 5e : 20 exercices corrigés, comparer, ranger, opposé (PDF)",
  description:
    "Vingt exercices corrigés sur les nombres relatifs en 5e : écrire un relatif, son signe, lire et placer une abscisse sur une droite graduée, comparer et ranger, l'opposé et la distance à zéro. Problèmes : températures, différence de buts, frise de l'Antiquité, tournoi de golf, ascenseur, coupe d'une île. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesRelatifNombre5ePage() {
  return <FicheExercicesClient fiche={exercicesRelatifNombre5e} />;
}
