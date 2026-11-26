// app/coach/page.tsx
import { Suspense } from "react";
import TutorV4Client from "./TutorV4Client";
import ChargementCoach from "./ChargementCoach";

export default function CoachPage() {
  return (
    <Suspense fallback={<ChargementCoach />}>
      {/* « Demande à l’IA » retiré du coach le 12/11 (Ti Margo aide à la place). */}
      <TutorV4Client />
    </Suspense>
  );
}