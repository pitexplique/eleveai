// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheCalculLitteral3e, slidesCalculLitteral3e } from "@/lib/fiches/maths-3e-calcul-litteral";

export const metadata: Metadata = {
  title: "Calcul littéral : développer, réduire, factoriser — 3e",
  description:
    "Comprendre ce que cache une lettre, remplacer sans perdre un signe, réduire les termes semblables, développer une puis deux parenthèses, factoriser par un facteur commun et reconnaître une différence de deux carrés : la fiche de cours complète en 3e, avec huit propriétés dessinées, quatre exemples corrigés, les sept erreurs classiques et dix exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function CalculLitteralTroisiemePage() {
  return <FicheCoursClient fiche={ficheCalculLitteral3e} slides={slidesCalculLitteral3e} />;
}
