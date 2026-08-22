import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheComplements6e,
  slidesComplements6e,
} from "@/lib/fiches/francais-6e-grammaire-complements";

export const metadata: Metadata = {
  title: "Attribut du sujet et compléments du verbe — fiche de cours 6e",
  description:
    "Opposer l'attribut du sujet et le complément d'objet direct, distinguer COD et COI, reconnaître un complément circonstanciel de temps, de lieu ou de cause : la fiche de cours de grammaire 6e, chaque règle dessinée sur la phrase, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function GrammaireComplements6ePage() {
  return <FicheCoursClient fiche={ficheComplements6e} slides={slidesComplements6e} />;
}
