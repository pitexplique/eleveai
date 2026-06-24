import type { Metadata } from "next";
import FicheCoursIa from "@/components/fiches/FicheCoursIa";
import { ficheApprentissage } from "@/lib/fiches-ia";

export const metadata: Metadata = {
  title: "Fiche IA — L'apprentissage automatique",
  description:
    "Comment une IA apprend à partir de données : supervisé, non supervisé, renforcement. Fiche de cours IA (référentiel Pix, Fondements).",
};

export default function Page() {
  return <FicheCoursIa fiche={ficheApprentissage} />;
}
