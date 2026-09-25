import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesIdentitesRemarquables4e } from "@/lib/fiches-exercices/maths-4e-identites-remarquables";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les identités
// remarquables ») : cette page répond à « exercices corrigés développer un carré
// 4e », l'autre au cours.
// ⛔ Calibrage de 4e (Frédéric, 25/09) : aucune formule-règle ici non plus — en
// 4e, on écrit le carré comme un produit et on distribue. Le vérificateur de la
// feuille relit ce title et cette description.
export const metadata: Metadata = {
  title: "Développer un carré 4e : 20 exercices corrigés, double distributivité et carré découpé (PDF)",
  description:
    "Vingt exercices corrigés de 4e, sans formule à apprendre : écrire un carré comme un produit, faire les quatre produits de la double distributivité, réduire. Voir pourquoi les deux termes du milieu s'ajoutent dans un carré et s'annulent quand un seul signe change, reconnaître un carré, calculer de tête 61 × 61 ou 61 × 59, démasquer l'oubli des termes du milieu. Problèmes : le tapis de judo et sa zone de sécurité, les plateaux du jeu de go, une réserve naturelle qui s'agrandit de 10 %, la dalle manquante du carreleur. Rappel de cours avant chaque niveau, corrigé étape par étape avec le carré découpé en quatre morceaux, PDF à imprimer.",
};

export default function ExercicesIdentitesRemarquables4ePage() {
  return <FicheExercicesClient fiche={exercicesIdentitesRemarquables4e} />;
}
