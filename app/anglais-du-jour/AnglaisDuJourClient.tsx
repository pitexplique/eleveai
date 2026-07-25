"use client";

// Fin wrapper CLIENT : il importe le répertoire (qui contient des fonctions) et
// le passe à RituelLangue. On ne peut PAS le faire depuis la page (composant
// serveur) — Next interdit de sérialiser des fonctions à travers la frontière
// serveur→client. De client à client, c'est permis.

import RituelLangue from "@/components/rituels/RituelLangue";
import { repertoireAnglais } from "@/lib/repertoire/anglais";

export default function AnglaisDuJourClient() {
  return (
    <RituelLangue
      config={{
        repertoire: repertoireAnglais,
        langue: "anglais",
        voix: "en",
        drapeau: "🇬🇧",
        titre: "L'anglais du jour",
        prefixe: "anglais-du-jour",
        coachHref: "/coach-ia/english-maths",
        coachLabel: "Fais une phrase avec un mot → le coach d'anglais",
      }}
    />
  );
}
