import type { Metadata } from "next";
import FicheCoursIa from "@/components/fiches/FicheCoursIa";
import { ficheServices } from "@/lib/fiches-ia";

export const metadata: Metadata = {
  title: "Fiche IA — Utiliser les services de recommandation",
  description:
    "Avantages, limites et contrôle de la personnalisation. Fiche de cours IA (référentiel Pix, Usages).",
};

export default function Page() {
  return <FicheCoursIa fiche={ficheServices} />;
}
