import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesGrandeurConversion5e } from "@/lib/fiches-exercices/maths-5e-grandeur-conversion";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Convertir les
// grandeurs ») : cette page répond à « exercices corrigés conversions 5e ».
export const metadata: Metadata = {
  title: "Conversions 5e : 20 exercices corrigés, longueurs, masses, durées (PDF)",
  description:
    "Vingt exercices corrigés sur les conversions en 5e : longueurs, masses et contenances avec le tableau de conversion, durées en heures et minutes, convertir avant de comparer ou de calculer, vérifier qu'un résultat est cohérent. Problèmes : trail, citronnade, sortie au musée, bouteilles en plastique. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesGrandeurConversion5ePage() {
  return <FicheExercicesClient fiche={exercicesGrandeurConversion5e} />;
}
