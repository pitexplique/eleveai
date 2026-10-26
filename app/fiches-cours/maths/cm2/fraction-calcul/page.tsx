import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFractionCalculCM2,
  slidesFractionCalculCM2,
} from "@/lib/fiches/maths-cm2-fraction-calcul";

export const metadata: Metadata = {
  title: "Calculer avec les fractions — CM2 : cours et exercices corrigés",
  description:
    "Définition, propriétés, exemples corrigés et exercices : ajouter des fractions, multiplier une fraction par un entier et prendre une fraction d'une quantité, en CM2. À lire, imprimer ou réviser en flashcards.",
};

export default function FractionCalculCM2Page() {
  return <FicheCoursClient fiche={ficheFractionCalculCM2} slides={slidesFractionCalculCM2} />;
}
