import type { Metadata } from "next";
import FicheCoursIa from "@/components/fiches/FicheCoursIa";
import { ficheCulturels } from "@/lib/fiches-ia";

export const metadata: Metadata = {
  title: "Fiche IA — Enjeux culturels et sociétaux de l'IA",
  description:
    "Biais, désinformation, diversité culturelle, droits des créateurs. Fiche de cours IA (référentiel Pix, Enjeux).",
};

export default function Page() {
  return <FicheCoursIa fiche={ficheCulturels} />;
}
