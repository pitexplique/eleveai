import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheParolesRapportees5e,
  slidesParolesRapportees5e,
} from "@/lib/fiches/francais-5e-discours-paroles-rapportees";

export const metadata: Metadata = {
  title: "Le discours direct et le discours indirect — 5e 2026-2027 : cours et exercices",
  description:
    "Programme de français 5e 2026-2027 : reconnaître des paroles citées entre guillemets, les rapporter dans une proposition subordonnée, déplacer le pronom, le temps et l'indication de temps, et ponctuer un dialogue — deux-points, incise à sujet inversé, tiret de réplique. Chaque phrase dessinée, avec exemples corrigés et exercices.",
};

export default function ParolesRapportees5ePage() {
  return (
    <FicheCoursClient fiche={ficheParolesRapportees5e} slides={slidesParolesRapportees5e} />
  );
}
