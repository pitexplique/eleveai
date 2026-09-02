// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { fichePerimetres3e, slidesPerimetres3e } from "@/lib/fiches/maths-3e-perimetres";

export const metadata: Metadata = {
  title: "Périmètres : polygones, cercle et figures composées — 3e",
  description:
    "Distinguer le périmètre de l'aire, calculer le périmètre d'un polygone, d'un carré ou d'un rectangle, utiliser la longueur du cercle 2πr sans la confondre avec l'aire du disque πr², suivre le contour d'une figure composée et comprendre pourquoi deux figures de même aire n'ont pas le même périmètre : la fiche de cours complète en 3e, avec huit propriétés dessinées, quatre exemples corrigés, sept pièges et dix exercices.",
};

export default function PerimetresTroisiemePage() {
  return <FicheCoursClient fiche={fichePerimetres3e} slides={slidesPerimetres3e} />;
}
