import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFonctionsReferenceSeconde,
  slidesFonctionsReferenceSeconde,
} from "@/lib/fiches/maths-seconde-fonctions-reference";

export const metadata: Metadata = {
  title: "Les fonctions de référence — 2de : carré, inverse, racine, cube, cours et exercices corrigés",
  description:
    "Les cinq fonctions de référence en seconde : leur domaine de définition, leurs variations et leurs courbes. Comparer sans calculer, résoudre f(x) = k, encadrer — et pourquoi −1 n'a pas d'image par la racine carrée. Cours, méthode et 10 exercices corrigés.",
};

export default function FonctionsReferenceSecondePage() {
  return (
    <FicheCoursClient
      fiche={ficheFonctionsReferenceSeconde}
      slides={slidesFonctionsReferenceSeconde}
    />
  );
}
