import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheTrigonometriePremiere,
  slidesTrigonometriePremiere,
} from "@/lib/fiches/maths-premiere-trigonometrie";

export const metadata: Metadata = {
  title:
    "La trigonométrie — 1re spé : cercle trigonométrique, radian, cosinus et sinus, cours et exercices corrigés",
  description:
    "Le cours de trigonométrie en première spécialité : cercle trigonométrique, radian et longueur d'arc, enroulement de la droite, cosinus et sinus lus sur les axes, cos² + sin² = 1, valeurs remarquables démontrées, angles associés, grands réels, parité, périodicité, courbes et approximation de π par Archimède. Schémas, exemples corrigés, pièges et fiche PDF.",
};

export default function FicheTrigonometriePremierePage() {
  return (
    <FicheCoursClient fiche={ficheTrigonometriePremiere} slides={slidesTrigonometriePremiere} />
  );
}
