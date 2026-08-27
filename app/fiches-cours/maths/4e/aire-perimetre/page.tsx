// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePerimetres4e,
  slidesPerimetres4e,
} from "@/lib/fiches/maths-4e-perimetres";

export const metadata: Metadata = {
  title: "Les périmètres — 4e : cours et exercices corrigés",
  description:
    "Calculer le périmètre d'un rectangle, d'un carré, d'un triangle et d'une figure composée, remonter du périmètre à un côté, et comprendre pourquoi deux figures de même périmètre n'ont pas la même aire : la fiche de cours complète en 4e, avec les propriétés dessinées, trois exemples corrigés et des exercices.",
};

export default function PerimetresQuatriemePage() {
  return (
    <FicheCoursClient fiche={fichePerimetres4e} slides={slidesPerimetres4e} />
  );
}
