import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheIdentitesSeconde,
  slidesIdentitesSeconde,
} from "@/lib/fiches/maths-seconde-identites";

export const metadata: Metadata = {
  title: "Les identités remarquables — 2de : développer, factoriser, cours et exercices corrigés",
  description:
    "Les trois identités remarquables en seconde : développer, factoriser, le double produit qu'on oublie, le calcul mental et le produit conjugué qui fait disparaître une racine. Cours, méthode, exemples et 10 exercices corrigés.",
};

export default function IdentitesSecondePage() {
  return (
    <FicheCoursClient
      fiche={ficheIdentitesSeconde}
      slides={slidesIdentitesSeconde}
    />
  );
}
