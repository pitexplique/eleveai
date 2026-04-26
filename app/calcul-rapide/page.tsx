// app/calcul-rapide/page.tsx

import type { Metadata } from "next";
import CalculRapideClient from "./CalculRapideClient";

export const metadata: Metadata = {
  title: "Calcul rapide | EleveAI",
  description:
    "Un défi de calcul rapide en 5 minutes pour progresser en mathématiques.",
};

export default function CalculRapidePage() {
  return <CalculRapideClient />;
}