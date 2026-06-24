import type { Metadata } from "next";
import FicheCoursIa from "@/components/fiches/FicheCoursIa";
import { ficheEvaluer } from "@/lib/fiches-ia";

export const metadata: Metadata = {
  title: "Fiche IA — Évaluer l'information à l'ère de l'IA",
  description:
    "Hypertrucages, bots, vérification des sources. Fiche de cours IA (référentiel Pix, Usages).",
};

export default function Page() {
  return <FicheCoursIa fiche={ficheEvaluer} />;
}
