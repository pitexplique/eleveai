"use client";

import EpreuveClient from "../_composants/EpreuveClient";
import { CONFIG_6E_FRANCAIS } from "@/lib/eval-nationale/6e-francais";

export default function Epreuve6eFrancaisClient() {
  return <EpreuveClient config={CONFIG_6E_FRANCAIS} />;
}
