import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheSignesSeconde,
  slidesSignesSeconde,
} from "@/lib/fiches/maths-seconde-signes";

export const metadata: Metadata = {
  title: "Le signe d'une expression — 2de : tableau de signes, cours et exercices corrigés",
  description:
    "Dresser un tableau de signes en seconde : signe de ax + b, produit, quotient et valeur interdite, résolution d'équations et d'inéquations, à partir du tableau ou d'une courbe. Cours, méthode, exemples corrigés et 10 exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function SignesExpressionSecondePage() {
  return (
    <FicheCoursClient fiche={ficheSignesSeconde} slides={slidesSignesSeconde} />
  );
}
