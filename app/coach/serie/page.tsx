// app/coach/page.tsx
import { Suspense } from "react";
import TutorV4Client from "./TutorV4Client";

function CoachFallback() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe,_#f8fafc_45%,_#eef2ff_70%,_#ffffff)] px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-600 shadow-sm">
          Chargement du coach…
        </div>
      </div>
    </main>
  );
}

export default function CoachPage() {
  return (
    <Suspense fallback={<CoachFallback />}>
      {/* « Demande à l'IA » est posé par TutorV4Client (en bas en vue simple, 27/10). */}
      <TutorV4Client />
    </Suspense>
  );
}