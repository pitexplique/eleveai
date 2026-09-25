import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDivisibilite4e } from "@/lib/fiches-exercices/maths-4e-divisibilite";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Multiples, diviseurs
// et division euclidienne ») : cette page répond à « exercices corrigés
// divisibilité 4e », l'autre à « cours divisibilité 4e ».
export const metadata: Metadata = {
  title: "Divisibilité 4e : 20 exercices corrigés, critères, diviseurs, division euclidienne (PDF)",
  description:
    "Vingt exercices corrigés de 4e : multiples et diviseurs, critères de divisibilité par 2, 3, 5, 9 et 10, division euclidienne posée (quotient et reste), liste des diviseurs par paires. Problèmes concrets : le jour de la semaine d'un 1er janvier, les cars d'une sortie, deux coureurs sur une piste, les cigales de 13 ans, la chaîne d'un vélo, des panneaux solaires, le panier d'œufs d'Ibn al-Haytham. Rappel de cours avant chaque niveau, corrigé étape par étape avec la division posée et des schémas, PDF à imprimer.",
};

export default function ExercicesDivisibilite4ePage() {
  return <FicheExercicesClient fiche={exercicesDivisibilite4e} />;
}
