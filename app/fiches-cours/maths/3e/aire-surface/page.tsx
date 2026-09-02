// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheAires3e, slidesAires3e } from "@/lib/fiches/maths-3e-aires";

export const metadata: Metadata = {
  title: "Aires : triangle, disque et figures composées — 3e",
  description:
    "Distinguer l'aire du périmètre, calculer l'aire d'un rectangle et d'un triangle sans oublier le divisé par deux, utiliser πr² pour le disque en partant du bon rayon, découper une figure composée pour additionner ou soustraire ses morceaux, et comprendre pourquoi agrandir dans un rapport k multiplie l'aire par k² : la fiche de cours complète en 3e, avec huit propriétés dessinées, quatre exemples corrigés, sept pièges et dix exercices.",
};

export default function AiresTroisiemePage() {
  return <FicheCoursClient fiche={ficheAires3e} slides={slidesAires3e} />;
}
