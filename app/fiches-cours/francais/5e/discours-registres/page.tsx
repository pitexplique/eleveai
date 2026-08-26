// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheDiscoursRegistres5e,
  slidesDiscoursRegistres5e,
} from "@/lib/fiches/francais-5e-discours-registres";

export const metadata: Metadata = {
  title: "L'oral, l'écrit et les registres en 5e (2026-2027) : fait ou avis",
  description:
    "Programme de français 5e 2026-2027 : comprendre que l'oral et l'écrit sont deux grammaires et non un bon et un mauvais français, rétablir à l'écrit ce que l'oral avale, redire une phrase en registre familier, courant ou soutenu, et distinguer un fait d'un avis — y compris l'avis appuyé et l'avis déguisé. La négation, la dislocation et la preuve dessinées sur la phrase, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function DiscoursRegistresCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheDiscoursRegistres5e}
      slides={slidesDiscoursRegistres5e}
    />
  );
}
