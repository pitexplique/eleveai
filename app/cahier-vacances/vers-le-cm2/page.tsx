"use client";

import CahierVacances from "@/components/cahier/CahierVacances";
import type { CahierConfig } from "@/components/cahier/types";
import { carnet, defisExpert, jours, leSaviasTu, parcours } from "./data";

const config: CahierConfig = {
  slug: "vers-le-cm2",
  titre: "Vers le CM2",
  sousTitre: "Pour réviser tout l'été après le CM1",
  mission: "Mission cap sur le CM2",
  parcoursTitre: "Ti Margo découvre son île — 6 étapes à La Réunion",
  chipFin: "🎓 Le CM2 !",
  coachClasse: "cm2",
};

export default function CahierVacancesVersLeCM2Page() {
  return (
    <CahierVacances
      data={{ jours, parcours, defisExpert, carnet, leSaviasTu }}
      config={config}
    />
  );
}
