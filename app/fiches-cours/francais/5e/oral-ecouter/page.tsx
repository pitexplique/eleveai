// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheOralEcouter5e,
  slidesOralEcouter5e,
} from "@/lib/fiches/francais-5e-oral-ecouter";

export const metadata: Metadata = {
  title: "Écouter et comprendre un oral en 5e (2026-2027) : prendre des notes",
  description:
    "Programme de français 5e 2026-2027 : écouter un propos oral en notant cinq choses seulement — le sujet, son avis, ses exemples, ce qu'on n'a pas compris, son désaccord — et reconnaitre la visée de ce qu'on entend : informer, convaincre, émouvoir ou faire agir. La grille de prise de notes dessinée, la visée lue chez celui qui écoute, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function OralEcouterCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheOralEcouter5e}
      slides={slidesOralEcouter5e}
    />
  );
}
