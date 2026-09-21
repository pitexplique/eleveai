import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPuissancesSeconde } from "@/lib/fiches-exercices/maths-seconde-puissances";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés puissances seconde », l'autre à « cours ».
export const metadata: Metadata = {
  title: "Les puissances en seconde : 20 exercices corrigés, de la règle au problème (PDF)",
  description:
    "Vingt exercices corrigés sur les puissances en seconde : produit, quotient et puissance d'une puissance, exposants négatifs, expressions à réduire sous la forme a^n comme au contrôle, notation scientifique. Problèmes : la lumière du Soleil, les globules rouges, une bactérie qui se divise. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesPuissancesSecondePage() {
  return <FicheExercicesClient fiche={exercicesPuissancesSeconde} />;
}
