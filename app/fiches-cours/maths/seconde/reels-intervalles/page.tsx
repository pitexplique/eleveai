import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheReelsSeconde, slidesReelsSeconde } from "@/lib/fiches/maths-seconde-reels";

export const metadata: Metadata = {
  title: "Nombres réels, intervalles et valeur absolue — 2de : cours et exercices corrigés",
  description:
    "Les nombres réels en seconde : les ensembles N, Z, D, Q et R, reconnaître un décimal, lire et écrire un intervalle, appartenir à un intervalle, la valeur absolue comme distance, |x − a| ≤ r, encadrer une racine. Tout se lit sur la droite graduée. Cours, exemples et 10 exercices corrigés.",
};

export default function ReelsIntervallesSecondePage() {
  return <FicheCoursClient fiche={ficheReelsSeconde} slides={slidesReelsSeconde} />;
}
