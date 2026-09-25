import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesNombresPremiers4e } from "@/lib/fiches-exercices/maths-4e-nombres-premiers";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Nombres premiers et
// décomposition ») : cette page répond à « exercices corrigés nombres premiers
// 4e », l'autre à « cours nombres premiers 4e ».
export const metadata: Metadata = {
  title: "Nombres premiers 4e : 20 exercices corrigés, crible et décomposition en facteurs premiers (PDF)",
  description:
    "Vingt exercices corrigés de 4e : reconnaître un nombre premier, la liste jusqu'à 30, décider jusqu'à 100 avec les essais par 2, 3, 5 et 7, décomposer en produit de facteurs premiers avec une échelle ou un arbre, simplifier une fraction, compter les diviseurs. Problèmes : les cigales à cycle de 13 et 17 ans, la photo du Tour de France, les vitesses d'un vélo, le cadenas des sites Internet. Rappel de cours avant chaque niveau, corrigé étape par étape avec schémas, PDF à imprimer.",
};

export default function ExercicesNombresPremiers4ePage() {
  return <FicheExercicesClient fiche={exercicesNombresPremiers4e} />;
}
