import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheRacinesSeconde,
  slidesRacinesSeconde,
} from "@/lib/fiches/maths-seconde-racines";

export const metadata: Metadata = {
  title: "La racine carrée — 2de : simplifier, additionner, cours et exercices corrigés",
  description:
    "Carrés parfaits, simplifier une racine, le produit qui passe et la somme qui ne passe pas, additionner des radicaux identiques, domaine de définition : la fiche de cours complète de la racine carrée en seconde, avec exercices corrigés.",
};

export default function RacinesSecondePage() {
  return (
    <FicheCoursClient fiche={ficheRacinesSeconde} slides={slidesRacinesSeconde} />
  );
}
