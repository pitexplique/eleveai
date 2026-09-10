import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheDevFacSeconde,
  slidesDevFacSeconde,
} from "@/lib/fiches/maths-seconde-devfac";

export const metadata: Metadata = {
  title: "Développement et factorisation — 2de : produit nul, cours et exercices corrigés",
  description:
    "Développer et factoriser en seconde : double distributivité, facteur commun, identités remarquables, et surtout pourquoi on factorise — pour résoudre une équation produit nul. Le piège du moins devant la parenthèse. Cours, méthode et 10 exercices corrigés.",
};

export default function DevFacSecondePage() {
  return (
    <FicheCoursClient
      fiche={ficheDevFacSeconde}
      slides={slidesDevFacSeconde}
    />
  );
}
