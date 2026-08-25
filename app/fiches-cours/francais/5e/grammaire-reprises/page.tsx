import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheReprises5e,
  slidesReprises5e,
} from "@/lib/fiches/francais-5e-grammaire-reprises";

export const metadata: Metadata = {
  title: "Les reprises et la chaîne anaphorique — 5e 2026-2027",
  description:
    "Programme de français 5e 2026-2027 : retrouver ce qu'un pronom reprend dans un texte, reconnaître une reprise nominale, suivre une chaîne d'un bout à l'autre d'un passage. La compétence la plus mal réussie de l'évaluation nationale de 5e, expliquée avec chaque reprise dessinée sur le texte, exemples corrigés et exercices.",
};

export default function GrammaireReprises5ePage() {
  return <FicheCoursClient fiche={ficheReprises5e} slides={slidesReprises5e} />;
}
