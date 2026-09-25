import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPuissances4e } from "@/lib/fiches-exercices/maths-4e-puissances";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Puissances et
// notation scientifique ») : cette page répond à « exercices corrigés
// puissances 4e », l'autre à « cours puissances 4e ».
export const metadata: Metadata = {
  title:
    "Puissances 4e : 20 exercices corrigés, exposants négatifs et puissances de 10 (PDF)",
  description:
    "Vingt exercices corrigés de 4e : écrire et calculer une puissance, (−3)⁴ contre −3⁴, l'exposant négatif qui donne un inverse, les puissances de 10, la notation scientifique, comparer et ranger, calculer en écrivant les puissances en clair. Problèmes : un parc éolien, une piscine olympique en gouttes d'eau, le poids des animaux, le tableau de Roland-Garros. Rappel de cours avant chaque niveau, corrigé étape par étape avec un schéma à chaque exercice, PDF à imprimer.",
};

export default function ExercicesPuissances4ePage() {
  return <FicheExercicesClient fiche={exercicesPuissances4e} />;
}
