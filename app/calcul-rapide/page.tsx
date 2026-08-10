import type { Metadata } from "next";
import { Suspense } from "react";
import CalculRapideClient from "./CalculRapideClient";

export const metadata: Metadata = {
  title: "Calcul rapide",
  description:
    "Un défi de calcul rapide en 5 minutes pour progresser en mathématiques.",
};

export default function CalculRapidePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
          <p className="text-xl font-bold">Chargement...</p>
        </main>
      }
    >
      <CalculRapideClient />
    </Suspense>
  );
}