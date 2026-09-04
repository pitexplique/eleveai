// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).
//
// ⚠️ LE DOSSIER PORTE LE `notionId` DU COACH : `lecture_voix_haute` ne peut
// atteindre que /fiches-cours/francais/cp/lecture-voix-haute.

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVoixHauteCp,
  slidesVoixHauteCp,
} from "@/lib/fiches/francais-cp-voix-haute";

export const metadata: Metadata = {
  title: "Lire à voix haute au CP (2026-2027) : ponctuation, groupes, fluence",
  description:
    "Programme de français CP 2026-2027 : lire à voix haute. Le point fait descendre la voix, le point d'interrogation la fait monter, le point d'exclamation lui met de la force ; on respire entre les groupes de mots, jamais au milieu. Repères de fin d'année : 30 mots par minute sans préparation, 50 après. Dix exercices, corrigé sur page détachable.",
};

export default function LectureVoixHauteCpPage() {
  return (
    <FicheCoursClient fiche={ficheVoixHauteCp} slides={slidesVoixHauteCp} />
  );
}
