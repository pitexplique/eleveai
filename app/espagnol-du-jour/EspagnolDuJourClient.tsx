"use client";

// Fin wrapper CLIENT (cf. anglais-du-jour) : importe le répertoire espagnol et
// le passe à RituelLangue, de client à client.

import RituelLangue from "@/components/rituels/RituelLangue";
import { repertoireEspagnol } from "@/lib/repertoire/espagnol";

export default function EspagnolDuJourClient() {
  return (
    <RituelLangue
      config={{
        repertoire: repertoireEspagnol,
        langue: "espagnol",
        voix: "es",
        drapeau: "🇪🇸",
        titre: "L'espagnol du jour",
        prefixe: "espagnol-du-jour",
        coachHref: "/coach-ia/espagnol",
        coachLabel: "Fais une phrase avec un mot → le coach d'espagnol",
      }}
    />
  );
}
