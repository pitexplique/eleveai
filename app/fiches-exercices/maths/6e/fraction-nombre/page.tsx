import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFractionNombre6e } from "@/lib/fiches-exercices/maths-6e-fraction-nombre";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les fractions ») :
// cette page répond à « exercices corrigés fractions 6e ».
export const metadata: Metadata = {
  title: "Fractions 6e : 20 exercices corrigés, lire, comparer, fractions décimales (PDF)",
  description:
    "Vingt exercices corrigés sur les fractions en 6e : lire et écrire une fraction, la représenter, fractions décimales et nombres à virgule, comparer et ranger, encadrer une fraction entre deux entiers. Problèmes : élection du délégué, randonnée, vitrail, fraction mystère. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesFractionNombre6ePage() {
  return <FicheExercicesClient fiche={exercicesFractionNombre6e} />;
}
