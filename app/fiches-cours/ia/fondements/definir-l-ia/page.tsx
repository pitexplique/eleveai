import type { Metadata } from "next";
import FicheCoursIa from "@/components/fiches/FicheCoursIa";
import { ficheDefinirIa } from "@/lib/fiches-ia";

export const metadata: Metadata = {
  title: "Fiche IA — Qu'est-ce que l'intelligence artificielle ?",
  description:
    "Définir l'IA, son histoire et ses approches. Fiche de cours IA (référentiel Pix, domaine Fondements).",
};

export default function Page() {
  return <FicheCoursIa fiche={ficheDefinirIa} />;
}
