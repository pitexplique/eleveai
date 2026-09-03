// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheTriangles3e, slidesTriangles3e } from "@/lib/fiches/maths-3e-triangles";

export const metadata: Metadata = {
  title: "Les triangles : angles et existence — 3e : cours et exercices corrigés",
  description:
    "Utiliser la somme des angles d'un triangle, trouver un angle manquant, calculer les angles d'un triangle rectangle ou isocèle, reconnaître les familles de triangles et leur emboîtement, et vérifier qu'un triangle est constructible — par ses angles comme par ses longueurs : la fiche de cours complète en 3e, avec huit propriétés dessinées, quatre exemples corrigés, sept pièges et dix exercices.",
};

export default function TrianglesTroisiemePage() {
  return <FicheCoursClient fiche={ficheTriangles3e} slides={slidesTriangles3e} />;
}
