import type { Metadata } from "next";
import LivreIa from "@/components/fiches/LivreIa";
import { LIVRE_IA } from "@/lib/fiches-ia";

export const metadata: Metadata = {
  title: "Comprendre l'intelligence artificielle — le livre",
  description:
    "Les 16 fiches de cours IA compilées en un livre, à lire en ligne ou à télécharger en PDF. Référentiel Pix « Compétences numériques en IA ».",
};

export default function LivreIaPage() {
  return <LivreIa chapitres={LIVRE_IA} />;
}
