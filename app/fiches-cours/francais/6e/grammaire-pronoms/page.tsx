import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePronoms6e,
  slidesPronoms6e,
} from "@/lib/fiches/francais-6e-grammaire-pronoms";

export const metadata: Metadata = {
  title: "Les pronoms personnels — 6e : cours et exercices corrigés",
  description:
    "Reconnaître un pronom personnel sujet ou complément, préciser sa fonction et retrouver son antécédent dans le texte : la fiche de cours de grammaire 6e, chaque reprise dessinée sur la phrase, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function GrammairePronoms6ePage() {
  return <FicheCoursClient fiche={fichePronoms6e} slides={slidesPronoms6e} />;
}
