// app/espace-eleves/coach/metadata.ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mode Coach — Espace élèves | EleveAI",
  description:
    "Mode Coach EleveAI : une séance guidée pour comprendre, s’entraîner et formuler ses questions, sans se substituer au professeur.",
  alternates: {
    canonical: "/espace-eleves/coach",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Mode Coach — Espace élèves | EleveAI",
    description:
      "Une séance guidée (diagnostic → étapes → vérification → questions à se poser / à poser au professeur).",
    url: "/espace-eleves/coach",
    type: "website",
  },
};
