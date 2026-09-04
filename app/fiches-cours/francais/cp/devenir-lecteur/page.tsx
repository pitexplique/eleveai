// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).
//
// ⚠️ LE DOSSIER PORTE LE `notionId` DU COACH : `devenir_lecteur` ne peut
// atteindre que /fiches-cours/francais/cp/devenir-lecteur.

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheDevenirLecteurCp,
  slidesDevenirLecteurCp,
} from "@/lib/fiches/francais-cp-devenir-lecteur";

export const metadata: Metadata = {
  title: "Devenir lecteur au CP (2026-2027) : choisir un livre, relier ses lectures",
  description:
    "Programme de français CP 2026-2027 : reconnaitre les types de personnages (le loup, l'ogre, la fée, le héros), distinguer un texte qui raconte d'un texte qui informe, reconnaitre les sortes de livres, choisir un livre et relier ses lectures entre elles. Le choix commence dans ta tête, pas sur l'étagère. Dix exercices, corrigé sur page détachable.",
};

export default function DevenirLecteurCpPage() {
  return (
    <FicheCoursClient
      fiche={ficheDevenirLecteurCp}
      slides={slidesDevenirLecteurCp}
    />
  );
}
