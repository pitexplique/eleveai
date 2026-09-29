import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesRelatifOperation5e } from "@/lib/fiches-exercices/maths-5e-relatif-operation";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les opérations sur les
// nombres relatifs ») : cette page répond à « exercices corrigés addition
// soustraction relatifs 5e ».
export const metadata: Metadata = {
  title: "Addition et soustraction de relatifs 5e : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur l'addition et la soustraction des nombres relatifs en 5e : sauts sur la droite graduée, ajouter l'opposé, enlever les parenthèses, sommes algébriques de gauche à droite. Problèmes : congélateur, lac de barrage, frise de Rome à Alésia, fuseaux horaires, grotte, jeu de cartes, pyramide et carré magique. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesRelatifOperation5ePage() {
  return <FicheExercicesClient fiche={exercicesRelatifOperation5e} />;
}
