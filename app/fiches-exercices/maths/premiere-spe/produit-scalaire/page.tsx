import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProduitScalairePremiere } from "@/lib/fiches-exercices/maths-premiere-produit-scalaire";

export const metadata: Metadata = {
  title: "Produit scalaire 1re spé : 20 exercices corrigés, de la projection à Al-Kashi (PDF)",
  description:
    "Vingt exercices corrigés de produit scalaire en première spécialité : projection orthogonale, normes et angle, coordonnées, norme d'un vecteur, bilinéarité, orthogonalité, formule d'Al-Kashi et sa démonstration, MA·MB et cercle de diamètre [AB]. Travail d'une force, voile, panneau solaire, radar, téléski. Corrigés dessinés, PDF à imprimer.",
};

export default function ExercicesProduitScalairePremierePage() {
  return <FicheExercicesClient fiche={exercicesProduitScalairePremiere} />;
}
