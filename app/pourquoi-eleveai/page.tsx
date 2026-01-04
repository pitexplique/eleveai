// app/pourquoi-eleveai/page.tsx
import type { Metadata } from "next";
import PourquoiEleveAIClient from "./PourquoiEleveAIClient";

export const metadata: Metadata = {
  title: "Pourquoi EleveAI",
  description:
    "EleveAI : IA pédagogique encadrée, anti-triche, utile aux professeurs, parents et établissements.",
  alternates: { canonical: "/pourquoi-eleveai" },
};

export default function Page() {
  return <PourquoiEleveAIClient />;
}
