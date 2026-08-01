"use client";

// Enrobage : il n'existe QUE pour importer la config de cette épreuve côté
// client. La config porte une banque de questions et des Map de libellés —
// rien de tout cela ne traverse la frontière serveur/client. Chaque épreuve a
// donc son propre enrobage, et le navigateur ne télécharge que sa banque.

import EpreuveClient from "../_composants/EpreuveClient";
import { CONFIG_6E_MATHS } from "@/lib/eval-nationale/6e-maths";

export default function Epreuve6eMathsClient() {
  return <EpreuveClient config={CONFIG_6E_MATHS} />;
}
