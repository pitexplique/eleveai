import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheRepereSeconde,
  slidesRepereSeconde,
} from "@/lib/fiches/maths-seconde-repere";

export const metadata: Metadata = {
  title: "Repère et coordonnées — 2de : milieu, distance, cours et exercices corrigés",
  description:
    "Le repère du plan en seconde : lire et placer un point, la formule du milieu, la distance dans un repère orthonormé, et surtout ce qu'elles démontrent — parallélogramme, symétrique, nature d'un triangle. Cours, méthode et 10 exercices corrigés.",
};

export default function RepereSecondePage() {
  return (
    <FicheCoursClient
      fiche={ficheRepereSeconde}
      slides={slidesRepereSeconde}
    />
  );
}
