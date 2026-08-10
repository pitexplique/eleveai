import type { Metadata } from "next";
import { Suspense } from "react";
import ParcoursIaClient from "./ParcoursIaClient";

export const metadata: Metadata = {
  title: "Parcours IA",
  description: "Diagnostique ton niveau de culture et d'usage de l'intelligence artificielle (A1 → C1).",
};

export default function ParcoursIaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center text-slate-600">Chargement…</div>}>
      <ParcoursIaClient />
    </Suspense>
  );
}
