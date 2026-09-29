import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDivisibilite5e } from "@/lib/fiches-exercices/maths-5e-divisibilite";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Multiples, diviseurs et
// divisibilité ») : cette page répond à « exercices corrigés critères de
// divisibilité 5e ».
export const metadata: Metadata = {
  title: "Critères de divisibilité 5e : 20 exercices corrigés, multiples et diviseurs (PDF)",
  description:
    "Vingt exercices corrigés sur les multiples, les diviseurs et les critères de divisibilité par 2, 3, 5, 9 et 10 en 5e : lister les diviseurs par paires, trouver un chiffre caché, un diviseur commun. Problèmes : jetons en rectangle, plantation de salades, robots sur une règle, code d'un cadenas, chaises d'une fête, mur à carreler. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesDivisibilite5ePage() {
  return <FicheExercicesClient fiche={exercicesDivisibilite5e} />;
}
