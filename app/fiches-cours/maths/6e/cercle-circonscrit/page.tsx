// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCercleCirconscrit6e,
  slidesCercleCirconscrit6e,
} from "@/lib/fiches/maths-6e-cercle-circonscrit";

export const metadata: Metadata = {
  title: "Le cercle circonscrit à un triangle — 6e : cours et exercices corrigés",
  description:
    "Les trois médiatrices d'un triangle se croisent en un point, le centre du cercle circonscrit : la preuve en trois lignes, la construction au compas et les problèmes (assiette cassée, points alignés), avec exemples corrigés et exercices de 6e.",
};

export default function CercleCirconscritSixiemePage() {
  return <FicheCoursClient fiche={ficheCercleCirconscrit6e} slides={slidesCercleCirconscrit6e} />;
}
