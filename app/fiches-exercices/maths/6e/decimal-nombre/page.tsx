import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDecimalNombre6e } from "@/lib/fiches-exercices/maths-6e-decimal-nombre";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les nombres décimaux ») :
// cette page répond à « exercices corrigés nombres décimaux 6e ».
export const metadata: Metadata = {
  title: "Nombres décimaux 6e : 20 exercices corrigés, comparer, arrondir (PDF)",
  description:
    "Vingt exercices corrigés sur les nombres décimaux en 6e : lire et écrire un décimal, le rang d'un chiffre, comparer et ranger, arrondir à l'unité, au dixième, au centième, encadrer et intercaler. Problèmes : course de 100 m, fruits sur la balance, nombre mystère, pluie de la semaine. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesDecimalNombre6ePage() {
  return <FicheExercicesClient fiche={exercicesDecimalNombre6e} />;
}
