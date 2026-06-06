import type { Metadata } from "next";
import { Suspense } from "react";
import ParcoursEnglishClient from "./ParcoursEnglishClient";

export const metadata: Metadata = {
  title: "Parcours English Maths - EleveAI",
  description: "Diagnostique ton niveau de vocabulaire mathématique en anglais.",
};

export default function ParcoursEnglishPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center text-slate-600">Chargement…</div>}>
      <ParcoursEnglishClient />
    </Suspense>
  );
}
