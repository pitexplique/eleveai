import type { Metadata } from "next";
import FicheCoursIa from "@/components/fiches/FicheCoursIa";
import { ficheOrga } from "@/lib/fiches-ia";

export const metadata: Metadata = {
  title: "Fiche IA — Utiliser l'IA dans une organisation",
  description:
    "Identifier le besoin, choisir l'outil, protéger les données, charte d'usage et RAG. Fiche de cours IA (référentiel Pix, Usages).",
};

export default function Page() {
  return <FicheCoursIa fiche={ficheOrga} />;
}
