import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheArithmetiqueSeconde, slidesArithmetiqueSeconde } from "@/lib/fiches/maths-seconde-arithmetique";

export const metadata: Metadata = {
  title: "Multiples, diviseurs, pair et impair — 2de : cours et exercices corrigés",
  description:
    "L'arithmétique en seconde : multiple et diviseur, pair et impair, critères de divisibilité, fraction irréductible, et la démonstration « la somme de deux multiples de a est un multiple de a ». Cours, exemples et 10 exercices corrigés.",
};

export default function ArithmetiqueSecondePage() {
  return <FicheCoursClient fiche={ficheArithmetiqueSeconde} slides={slidesArithmetiqueSeconde} />;
}
