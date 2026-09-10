import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheAffinesSeconde,
  slidesAffinesSeconde,
} from "@/lib/fiches/maths-seconde-affines";

export const metadata: Metadata = {
  title: "Les fonctions affines — 2de : coefficient directeur, signe, cours et exercices corrigés",
  description:
    "Les fonctions affines en seconde : coefficient directeur et ordonnée à l'origine, lecture graphique, déterminer f à partir de deux points, sens de variation et tableau de signes, droites parallèles. Cours, méthode et 10 exercices corrigés.",
};

export default function AffinesSecondePage() {
  return (
    <FicheCoursClient
      fiche={ficheAffinesSeconde}
      slides={slidesAffinesSeconde}
    />
  );
}
