// app/tutor-v4/page.tsx
import { Suspense } from "react";
import TutorV4Client from "./TutorV4Client";
import FloatingCoach from "@/components/FloatingCoach";

function TutorV4Fallback() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe,_#f8fafc_45%,_#eef2ff_70%,_#ffffff)] px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-600 shadow-sm">
          Chargement du tutor...
        </div>
      </div>
    </main>
  );
}

export default function TutorV4Page() {
  return (
    <Suspense fallback={<TutorV4Fallback />}>
      <TutorV4Client />
      <FloatingCoach />
    </Suspense>
  );
}