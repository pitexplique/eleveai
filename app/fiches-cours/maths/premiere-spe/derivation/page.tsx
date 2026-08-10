import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheDerivationPremiere,
  slidesDerivationPremiere,
} from "@/lib/fiches/maths-premiere-derivation";

export const metadata: Metadata = {
  title: "La dérivation — fiche de cours Première spé maths",
  description:
    "Définition, dérivées usuelles, méthode, exemples corrigés et exercices : la fiche de cours complète de la dérivation en Première spé maths (taux de variation, nombre dérivé, dérivée d'une somme et d'un produit, équation de la tangente), à lire, imprimer ou réviser en flashcards.",
};

export default function DerivationPremierePage() {
  return (
    <FicheCoursClient
      fiche={ficheDerivationPremiere}
      slides={slidesDerivationPremiere}
    />
  );
}
