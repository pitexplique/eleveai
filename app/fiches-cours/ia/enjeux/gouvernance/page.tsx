import type { Metadata } from "next";
import FicheCoursIa from "@/components/fiches/FicheCoursIa";
import { ficheGouvernance } from "@/lib/fiches-ia";

export const metadata: Metadata = {
  title: "Fiche IA — La gouvernance de l'IA",
  description:
    "Qui régule l'IA, l'IA Act, souveraineté numérique, valeurs encodées. Fiche de cours IA (référentiel Pix, Enjeux).",
};

export default function Page() {
  return <FicheCoursIa fiche={ficheGouvernance} />;
}
