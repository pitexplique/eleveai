import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheAccords5e,
  slidesAccords5e,
} from "@/lib/fiches/francais-5e-orthographe-accords";

export const metadata: Metadata = {
  title: "Les chaînes d'accord — 5e 2026-2027 : cours et exercices corrigés",
  description:
    "Programme de français 5e 2026-2027 : tenir la chaîne d'accord du groupe nominal, accorder l'attribut avec le sujet, et accorder le verbe quand le sujet est éloigné, inversé ou composé de plusieurs noms. Chaque accord dessiné d'un mot à l'autre, avec exemples corrigés et exercices.",
};

export default function OrthographeAccords5ePage() {
  return <FicheCoursClient fiche={ficheAccords5e} slides={slidesAccords5e} />;
}
