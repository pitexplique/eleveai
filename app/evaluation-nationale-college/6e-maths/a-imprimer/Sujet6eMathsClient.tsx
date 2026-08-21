"use client";

// Enrobage : il n'existe QUE pour importer la config de cette épreuve côté
// client. La config porte une banque de questions et des Map de libellés — rien
// de tout cela ne traverse la frontière serveur/client. Même raison, et même
// forme, que `Epreuve6eMathsClient` un dossier plus haut : le navigateur ne
// télécharge que la banque du sujet qu'il imprime.

import SujetImprimable from "../../_composants/SujetImprimable";
import { CONFIG_6E_MATHS } from "@/lib/eval-nationale/6e-maths";

export default function Sujet6eMathsClient() {
  return <SujetImprimable config={CONFIG_6E_MATHS} />;
}
