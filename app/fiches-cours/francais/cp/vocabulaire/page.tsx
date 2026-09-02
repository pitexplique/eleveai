// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVocabulaireCp,
  slidesVocabulaireCp,
} from "@/lib/fiches/francais-cp-vocabulaire";

export const metadata: Metadata = {
  title: "Le sens des mots au CP (2026-2027) : familles, contraires, intrus",
  description:
    "Programme de français CP 2026-2027 : regrouper les mots qui vont ensemble, reconnaitre une famille de mots, trouver un contraire, comprendre qu'un même mot peut avoir plusieurs sens, et deviner un mot inconnu grâce à la phrase. Des dessins à colorier, à imprimer ou à projeter en classe.",
};

export default function VocabulaireCpPage() {
  return (
    <FicheCoursClient fiche={ficheVocabulaireCp} slides={slidesVocabulaireCp} />
  );
}
