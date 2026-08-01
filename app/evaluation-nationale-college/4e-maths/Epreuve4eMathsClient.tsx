"use client";

import EpreuveClient from "../_composants/EpreuveClient";
import { CONFIG_4E_MATHS } from "@/lib/eval-nationale/4e-maths";

export default function Epreuve4eMathsClient() {
  return <EpreuveClient config={CONFIG_4E_MATHS} />;
}
