import type { Metadata } from "next";
import FicheCoursIa from "@/components/fiches/FicheCoursIa";
import { ficheEthique } from "@/lib/fiches-ia";

export const metadata: Metadata = {
  title: "Fiche IA — Éthique et transparence de l'IA",
  description:
    "Transparence, non-discrimination, responsabilité, RGPD et IA Act. Fiche de cours IA (référentiel Pix, Enjeux).",
};

export default function Page() {
  return <FicheCoursIa fiche={ficheEthique} />;
}
