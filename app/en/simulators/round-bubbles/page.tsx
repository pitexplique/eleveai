// "Why are soap bubbles round?" — the English showcase of the French machine
// (/pourquoi-les-bulles-sont-rondes). Same simulator, English text: at a fixed
// perimeter (the same loop of string), rounding a shape makes its area climb up
// to the circle — the isoperimetric inequality 4πA ≤ P². The bubble "solves" it
// with surface tension (least surface → circle in 2D, sphere in 3D). The
// childhood question of Yilin Wang (IHÉS, 2024 Salem Prize). Built to catch the
// worldwide "why are bubbles round" search traffic.

import type { Metadata } from "next";
import RoundBubblesClient from "./RoundBubblesClient";

export const metadata: Metadata = {
  title: "Why are soap bubbles round? | EleveAI",
  description:
    "With the same loop of string (a fixed perimeter), which shape holds the most space? Add sides to a polygon and the area climbs, all the way to the circle — that's the isoperimetric inequality 4πA ≤ P². A soap bubble solves it without any calculation: its skin contracts to have the least surface possible, so a sphere. The question that mathematician Yilin Wang (2024 Salem Prize) asked as a child. With challenges from age 6 to 18.",
  keywords: [
    "why are bubbles round",
    "why are soap bubbles round",
    "isoperimetric inequality",
    "isoperimetric problem",
    "soap bubble maths",
    "circle maximum area",
    "sphere minimum surface",
    "surface tension",
    "Yilin Wang",
    "interactive maths",
    "eleveai",
  ],
  openGraph: {
    title: "Why are soap bubbles round?",
    description:
      "Same string, which shape holds the most? The circle always wins (4πA ≤ P²), and a bubble solves it without any maths. The childhood question of Yilin Wang.",
    url: "https://eleveai.fr/en/simulators/round-bubbles",
    siteName: "EleveAI",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "/en/simulators/round-bubbles",
    languages: {
      "fr-FR": "/pourquoi-les-bulles-sont-rondes",
      en: "/en/simulators/round-bubbles",
    },
  },
};

export default function Page() {
  return <RoundBubblesClient />;
}
