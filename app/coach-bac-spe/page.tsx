// app/coach-bac-spe/page.tsx

import type { Metadata } from "next";
import CoachBacSpeClient from "./CoachBacSpeClient";

export const metadata: Metadata = {
  title: "Coach Bac Spé Maths",
  description:
    "Sprint Bac spécialité maths en 21 jours : calcul rapide, pièges classiques, problèmes guidés et sujets express.",
};

export default function CoachBacSpePage() {
  return <CoachBacSpeClient />;
}