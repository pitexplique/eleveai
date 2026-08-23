import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGroupeNominal6e,
  slidesGroupeNominal6e,
} from "@/lib/fiches/francais-6e-grammaire-groupe-nominal";

export const metadata: Metadata = {
  title: "Le groupe nominal — 6e : cours et exercices corrigés",
  description:
    "Trouver le nom noyau, distinguer sans ambiguïté l'épithète du complément du nom, et reconnaître un groupe nominal quelle que soit sa fonction : la fiche de cours de grammaire 6e, chaque règle dessinée sur la phrase, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function GrammaireGroupeNominal6ePage() {
  return <FicheCoursClient fiche={ficheGroupeNominal6e} slides={slidesGroupeNominal6e} />;
}
