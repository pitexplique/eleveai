import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVecteursSeconde,
  slidesVecteursSeconde,
} from "@/lib/fiches/maths-seconde-vecteurs";

export const metadata: Metadata = {
  title: "Les vecteurs du plan — 2de : Chasles, colinéarité, cours et exercices corrigés",
  description:
    "Les vecteurs en seconde : direction, sens et norme, la relation de Chasles dans les deux sens, la différence qui retourne les lettres, placer un point défini par une égalité vectorielle, coordonnées et colinéarité. Cours, méthode et 10 exercices corrigés.",
};

export default function VecteursSecondePage() {
  return (
    <FicheCoursClient
      fiche={ficheVecteursSeconde}
      slides={slidesVecteursSeconde}
    />
  );
}
