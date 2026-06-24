import type { Metadata } from "next";
import FicheCoursIa from "@/components/fiches/FicheCoursIa";
import { ficheReco } from "@/lib/fiches-ia";

export const metadata: Metadata = {
  title: "Fiche IA — Les algorithmes de recommandation",
  description:
    "Comment YouTube, TikTok ou Netflix te recommandent des contenus, et la bulle de filtre. Fiche de cours IA (référentiel Pix, Fondements).",
};

export default function Page() {
  return <FicheCoursIa fiche={ficheReco} />;
}
