import type { Metadata } from "next";
import FicheCoursIa from "@/components/fiches/FicheCoursIa";
import { ficheEmploi } from "@/lib/fiches-ia";

export const metadata: Metadata = {
  title: "Fiche IA — IA, emploi et formation",
  description:
    "Métiers qui changent, nouveaux métiers, travailleurs du clic. Fiche de cours IA (référentiel Pix, Enjeux).",
};

export default function Page() {
  return <FicheCoursIa fiche={ficheEmploi} />;
}
