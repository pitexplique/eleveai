import type { Metadata } from "next";
import { Suspense } from "react";
import EvalPixIaClient from "./EvalPixIaClient";

export const metadata: Metadata = {
  title: "Éval blanche Pix IA - EleveAI",
  description:
    "Entraîne-toi pour le Pix IA : une évaluation blanche sur les 3 domaines du référentiel (fondements, usages, enjeux) avec ton profil de compétences.",
};

export default function EvalPixIaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center text-slate-600">Chargement…</div>}>
      <EvalPixIaClient />
    </Suspense>
  );
}
