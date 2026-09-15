import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheExponentiellePremiere,
  slidesExponentiellePremiere,
} from "@/lib/fiches/maths-premiere-exponentielle";

export const metadata: Metadata = {
  title:
    "La fonction exponentielle — 1re spé : propriétés, équations et inéquations, cours et exercices corrigés",
  description:
    "La fonction exponentielle en première spécialité : définition f' = f et f(0) = 1, nombre e, relation fonctionnelle, règles de calcul, signe et croissance. Résoudre e^a = e^b et e^a < e^b en comparant les exposants. Cours, méthode et 10 exercices corrigés.",
};

export default function ExponentiellePremierePage() {
  return (
    <FicheCoursClient
      fiche={ficheExponentiellePremiere}
      slides={slidesExponentiellePremiere}
    />
  );
}
