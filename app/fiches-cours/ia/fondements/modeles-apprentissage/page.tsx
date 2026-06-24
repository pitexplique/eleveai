import type { Metadata } from "next";
import FicheCoursIa from "@/components/fiches/FicheCoursIa";
import { ficheModeles } from "@/lib/fiches-ia";

export const metadata: Metadata = {
  title: "Fiche IA — Les modèles d'apprentissage",
  description:
    "Arbre de décision, régression, réseau de neurones : les familles de modèles d'IA. Fiche de cours IA (référentiel Pix, Fondements).",
};

export default function Page() {
  return <FicheCoursIa fiche={ficheModeles} />;
}
