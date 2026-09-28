import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDerFormulesPremiere } from "@/lib/fiches-exercices/maths-premiere-der-formules";

export const metadata: Metadata = {
  title: "Les formules de base de la dérivée — 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les dérivées de base en première, enseignement de mathématiques hors spécialité : fonction constante, identité et fonction affine, carré, cube, nombre dérivé en un point. Train, abonnements, glaçon qui fond, billes de Galilée, sécantes de Fermat, enclos de moutons. Tangentes dessinées, PDF à imprimer.",
};

export default function ExercicesDerFormulesPremierePage() {
  return <FicheExercicesClient fiche={exercicesDerFormulesPremiere} />;
}
