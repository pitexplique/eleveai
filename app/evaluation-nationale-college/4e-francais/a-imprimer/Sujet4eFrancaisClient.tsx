"use client";

// Enrobage : il n'existe QUE pour importer la config de cette épreuve côté
// client. La config porte une banque de questions, ses supports et des Map de
// libellés — rien de tout cela ne traverse la frontière serveur/client. Le
// navigateur ne télécharge que la banque du sujet qu'il imprime.

import SujetImprimable from "../../_composants/SujetImprimable";
import { CONFIG_4E_FRANCAIS } from "@/lib/eval-nationale/4e-francais";

export default function Sujet4eFrancaisClient() {
  return <SujetImprimable config={CONFIG_4E_FRANCAIS} />;
}
