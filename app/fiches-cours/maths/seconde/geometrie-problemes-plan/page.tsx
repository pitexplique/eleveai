import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGeometrieSeconde,
  slidesGeometrieSeconde,
} from "@/lib/fiches/maths-seconde-geometrie";

export const metadata: Metadata = {
  title: "Problèmes de géométrie plane — 2de : sinus, cosinus, tangente, projeté orthogonal, cours et exercices corrigés",
  description:
    "La trigonométrie du triangle rectangle en seconde : CAH SOH TOA, la relation cos²x + sin²x = 1, le projeté orthogonal et la distance d'un point à une droite, le calcul d'aires et la recherche d'un maximum. Pourquoi une pente de 12 % ne fait pas 12 degrés. Cours, méthode et 10 exercices corrigés.",
};

export default function GeometrieSecondePage() {
  return (
    <FicheCoursClient
      fiche={ficheGeometrieSeconde}
      slides={slidesGeometrieSeconde}
    />
  );
}
