// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheClassesMotsCp,
  slidesClassesMotsCp,
} from "@/lib/fiches/francais-cp-classes-mots";

export const metadata: Metadata = {
  title: "Nom, verbe, adjectif au CP (2026-2027) : reconnaitre les mots",
  description:
    "Programme de français CP 2026-2027 : identifier un nom et un verbe, reconnaitre un déterminant (le, la, les, un, une), un adjectif et un pronom personnel. Un mot tout seul ne dit pas ce qu'il est — chaque classe a son test. Dessins à colorier, à lire, à imprimer ou à projeter en classe.",
};

export default function ClassesMotsCpPage() {
  return (
    <FicheCoursClient fiche={ficheClassesMotsCp} slides={slidesClassesMotsCp} />
  );
}
