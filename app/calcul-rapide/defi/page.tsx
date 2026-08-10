import type { Metadata } from "next";
import { Suspense } from "react";
import CalculRapideDefiClient from "./CalculRapideDefiClient";

export const metadata: Metadata = {
  title: "Défi calcul rapide",
  description: "Lance le défi du jour en calcul rapide.",
};

export default function CalculRapideDefiPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
          <p className="text-xl font-bold">Chargement du défi...</p>
        </main>
      }
    >
      <CalculRapideDefiClient />
    </Suspense>
  );
}