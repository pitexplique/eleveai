import type { Metadata } from "next";
import FicheCoursIa from "@/components/fiches/FicheCoursIa";
import { ficheGenerative } from "@/lib/fiches-ia";

export const metadata: Metadata = {
  title: "Fiche IA — Utiliser une IA générative",
  description:
    "Écrire un bon prompt, itérer, vérifier les réponses et rester responsable. Fiche de cours IA (référentiel Pix, domaine Usages).",
};

export default function Page() {
  return <FicheCoursIa fiche={ficheGenerative} />;
}
