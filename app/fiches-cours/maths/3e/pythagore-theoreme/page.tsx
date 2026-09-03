// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { fichePythagore3e, slidesPythagore3e } from "@/lib/fiches/maths-3e-pythagore";

export const metadata: Metadata = {
  title: "Pythagore et sa réciproque — 3e : cours et exercices corrigés",
  description:
    "Repérer l'hypoténuse, calculer une longueur avec le théorème de Pythagore, démontrer qu'un triangle est rectangle avec sa réciproque, distinguer les deux sens du théorème et rédiger la preuve en quatre temps comme le brevet l'attend : la fiche de cours complète en 3e, avec huit propriétés dessinées, quatre exemples corrigés, sept pièges et dix exercices.",
};

export default function PythagoreTroisiemePage() {
  return <FicheCoursClient fiche={fichePythagore3e} slides={slidesPythagore3e} />;
}
