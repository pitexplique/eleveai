import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheAccords6e,
  slidesAccords6e,
} from "@/lib/fiches/francais-6e-grammaire-accords";

export const metadata: Metadata = {
  title: "Les accords et les homophones — 6e : cours et exercices corrigés",
  description:
    "Tenir la chaîne d'accords du groupe nominal, raisonner l'accord du verbe avec un sujet éloigné, accorder le participe passé avec être et avec le COD antéposé, et choisir le bon homophone : la fiche de cours de grammaire 6e, chaque accord dessiné sur la phrase.",
};

export default function GrammaireAccords6ePage() {
  return <FicheCoursClient fiche={ficheAccords6e} slides={slidesAccords6e} />;
}
