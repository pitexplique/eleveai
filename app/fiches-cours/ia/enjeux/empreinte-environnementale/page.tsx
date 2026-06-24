import type { Metadata } from "next";
import FicheCoursIa from "@/components/fiches/FicheCoursIa";
import { ficheEmpreinte } from "@/lib/fiches-ia";

export const metadata: Metadata = {
  title: "Fiche IA — L'empreinte environnementale de l'IA",
  description:
    "Énergie, ressources rares, IA frugale. Fiche de cours IA (référentiel Pix, Enjeux).",
};

export default function Page() {
  return <FicheCoursIa fiche={ficheEmpreinte} />;
}
