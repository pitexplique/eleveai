import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPuissances3e } from "@/lib/fiches-exercices/maths-3e-puissances";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Puissances et
// écriture scientifique ») : cette page répond à « exercices corrigés
// puissances 3e », l'autre à « cours puissances 3e ».
export const metadata: Metadata = {
  title:
    "Puissances 3e : 20 exercices corrigés, puissances de 10 et écriture scientifique (PDF)",
  description:
    "Vingt exercices corrigés de 3e : écrire et calculer une puissance, le signe de (−2)⁴ contre −2⁴, les puissances de 10 et les exposants négatifs, l'écriture scientifique, produit, quotient et puissance de puissance, et pourquoi 2³ + 2⁴ n'est pas 2⁷. Problèmes : la lumière jusqu'à Neptune, le disque plein de photos, les fourmis de la Terre, la feuille pliée jusqu'à la Lune. Rappel de cours avant chaque niveau, corrigé étape par étape avec schémas, PDF à imprimer.",
};

export default function ExercicesPuissances3ePage() {
  return <FicheExercicesClient fiche={exercicesPuissances3e} />;
}
