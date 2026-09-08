import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePuissancesSeconde,
  slidesPuissancesSeconde,
} from "@/lib/fiches/maths-seconde-puissances";

export const metadata: Metadata = {
  title: "Les puissances — 2de : règles de calcul, notation scientifique, cours et exercices corrigés",
  description:
    "Les puissances en seconde : produit, quotient, puissance d'une puissance, exposant négatif, et la notation scientifique. La méthode pour réduire une expression à la forme aⁿ sans la calculer. Cours, exemples et 10 exercices corrigés.",
};

export default function PuissancesSecondePage() {
  return (
    <FicheCoursClient
      fiche={fichePuissancesSeconde}
      slides={slidesPuissancesSeconde}
    />
  );
}
