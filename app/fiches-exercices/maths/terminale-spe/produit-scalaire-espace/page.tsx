import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProduitScalaireEspaceTerminale } from "@/lib/fiches-exercices/maths-terminale-produit-scalaire-espace";

export const metadata: Metadata = {
  title: "Produit scalaire dans l'espace terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur le produit scalaire dans l'espace en terminale spécialité : calcul en coordonnées, orthogonalité, normes et distances, angles, vecteur normal et équation cartésienne d'un plan, projeté orthogonal sur une droite et sur un plan, distance à un plan, volume d'un tétraèdre, démonstration du point le plus proche. Problèmes de bac : panneaux solaires d'un toit, bloc de pierre, conduite la plus courte, haubans d'une antenne. Rappel de cours avant chaque niveau, figures en perspective cavalière, PDF à imprimer.",
};

export default function ExercicesProduitScalaireEspaceTerminalePage() {
  return <FicheExercicesClient fiche={exercicesProduitScalaireEspaceTerminale} />;
}
