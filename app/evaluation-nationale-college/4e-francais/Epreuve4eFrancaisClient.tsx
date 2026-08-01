"use client";

import EpreuveClient from "../_composants/EpreuveClient";
import { CONFIG_4E_FRANCAIS } from "@/lib/eval-nationale/4e-francais";

export default function Epreuve4eFrancaisClient() {
  return <EpreuveClient config={CONFIG_4E_FRANCAIS} />;
}
