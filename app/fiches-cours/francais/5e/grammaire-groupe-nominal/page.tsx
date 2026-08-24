import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGroupeNominal5e,
  slidesGroupeNominal5e,
} from "@/lib/fiches/francais-5e-grammaire-groupe-nominal";

export const metadata: Metadata = {
  title: "Groupe nominal, déterminants et pronoms — 5e 2026-2027",
  description:
    "Programme de français 5e 2026-2027 : comprendre la structure du groupe nominal minimal et étendu, distinguer un déterminant d'un pronom, identifier prépositions, adverbes et mots subordonnants, reconnaître les pronoms personnels, démonstratifs et indéfinis. Chaque classe de mot dessinée sur la phrase, avec exemples corrigés et exercices.",
};

export default function GrammaireGroupeNominal5ePage() {
  return (
    <FicheCoursClient
      fiche={ficheGroupeNominal5e}
      slides={slidesGroupeNominal5e}
    />
  );
}
