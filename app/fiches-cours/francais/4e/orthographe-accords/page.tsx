// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheOrthographeAccords4e,
  slidesOrthographeAccords4e,
} from "@/lib/fiches/francais-4e-orthographe-accords";

export const metadata: Metadata = {
  title: "Les chaines d'accord en 4e (2026-2027) : sujet éloigné, collectifs, passif",
  description:
    "Programme de français 4e 2026-2027 : tenir la chaine d'accord dans un groupe nominal complexe, accorder un adjectif qui porte sur deux noms, trouver le noyau du sujet quand un complément s'intercale, trancher les cas complexes — toi et moi, c'est moi qui, la foule des spectateurs, la plupart des élèves, ainsi que — et construire le passif en accordant le participe avec son nouveau sujet. Chaque chaine dessinée sur la phrase, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function OrthographeAccordsQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheOrthographeAccords4e}
      slides={slidesOrthographeAccords4e}
    />
  );
}
