// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheLectureOeuvresCm1,
  slidesLectureOeuvresCm1,
} from "@/lib/fiches/francais-cm1-lecture-oeuvres";

export const metadata: Metadata = {
  title: "Lire une œuvre en CM1 : héros, narrateur et personnages (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : identifier le narrateur, le héros et l'adversaire, comprendre leurs relations, relier un livre à une œuvre lue en classe et exprimer sa réaction de lecteur. Pourquoi le héros n'est pas forcément le plus gentil, et pourquoi on perd les personnages avant de perdre l'histoire. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function LectureOeuvresCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheLectureOeuvresCm1}
      slides={slidesLectureOeuvresCm1}
    />
  );
}
