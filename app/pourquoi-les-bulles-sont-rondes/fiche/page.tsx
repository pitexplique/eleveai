// Fiche prof imprimable de la machine « Pourquoi les bulles sont rondes ».
// Elle réutilise les MÊMES défis que le simulateur (import DEFIS) via le gabarit
// générique FicheProf — à dupliquer pour les autres machines (corail, Kakeya…).

import type { Metadata } from "next";
import FicheProf from "@/components/simulateurs/FicheProf";
import { DEFIS } from "../PourquoiLesBullesClient";

export const metadata: Metadata = {
  title: "Fiche prof — Pourquoi les bulles sont rondes (isopérimétrie)",
  description:
    "Fiche prof imprimable pour le simulateur « Pourquoi les bulles sont rondes » : objectif, déroulé en 3 temps (question, machine, trace écrite), défis notés du CP à la Terminale avec corrigé. À imprimer ou projeter, usage libre en classe.",
  alternates: { canonical: "/pourquoi-les-bulles-sont-rondes/fiche" },
};

export default function Page() {
  return (
    <FicheProf
      titre="Pourquoi les bulles sont rondes ?"
      matiere="Maths · grandeurs & géométrie"
      niveaux="CP → Terminale"
      duree="20–30 min"
      url="eleveai.fr/pourquoi-les-bulles-sont-rondes"
      retour="/pourquoi-les-bulles-sont-rondes"
      accent="#0284c7"
      objectif="Comprendre qu'à périmètre égal, le cercle enferme le plus de place — et pourquoi une bulle prend cette forme toute seule."
      question="Souffle une bulle devant la classe. « Pourquoi jamais carrée ? » Recueille les hypothèses des élèves au tableau."
      manip="Ouvre le simulateur. Bouge le curseur « nombre de côtés », clique « Souffler la bulle » : l'aire monte, la note monte vers 1. Consigne : trouve la forme qui enferme le plus avec la même ficelle."
      trace="À ficelle égale (le même tour), c'est le CERCLE qui enferme le plus de place. Une bulle prend cette forme toute seule."
      traceLycee="4πA ≤ P², avec égalité seulement pour le cercle."
      defis={DEFIS}
      prolongements={[
        "Vidéo « Pourquoi les bulles sont rondes » (2 min, muette)",
        "La vraie bulle en 3D → la sphère",
        "La question d'enfance de Yilin Wang (prix Salem 2024)",
      ]}
    />
  );
}
