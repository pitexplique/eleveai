import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesOrdresGrandeur4e } from "@/lib/fiches-exercices/maths-4e-ordres-grandeur";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Ordres de grandeur et
// préfixes ») : cette page répond à « exercices corrigés ordre de grandeur 4e »,
// l'autre à « cours ordre de grandeur 4e ».
export const metadata: Metadata = {
  title: "Ordres de grandeur 4e : 20 exercices corrigés, préfixes nano à giga, estimer et juger un résultat (PDF)",
  description:
    "Vingt exercices corrigés de 4e : les préfixes nano, micro, milli, kilo, méga, giga, l'ordre de grandeur d'un objet et d'un nombre, estimer un produit ou un quotient, juger un résultat annoncé et retrouver le facteur perdu. Problèmes : le système solaire dans la cour, un fil d'une nanoseconde, les arbres de la Terre, les gouttes d'un bassin olympique. Rappel de cours avant chaque niveau, corrigé étape par étape avec l'échelle des puissances de dix dessinée, PDF à imprimer.",
};

export default function ExercicesOrdresGrandeur4ePage() {
  return <FicheExercicesClient fiche={exercicesOrdresGrandeur4e} />;
}
