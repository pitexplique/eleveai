import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheParticipe5e,
  slidesParticipe5e,
} from "@/lib/fiches/francais-5e-orthographe-participe";

export const metadata: Metadata = {
  title: "L'accord du participe passé — 5e 2026-2027 : cours et exercices",
  description:
    "Programme de français 5e 2026-2027 : accorder le participe passé avec être, avec avoir quand le COD est placé avant le verbe, et reconnaître le pronom COI qui ne commande jamais l'accord — « tu m'as parlé » contre « tu m'as appelée ». Chaque accord dessiné, avec exemples corrigés et exercices.",
};

export default function OrthographeParticipe5ePage() {
  return <FicheCoursClient fiche={ficheParticipe5e} slides={slidesParticipe5e} />;
}
