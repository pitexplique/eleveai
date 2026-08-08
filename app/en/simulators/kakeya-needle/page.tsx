// "The Kakeya needle" (Hong Wang, 2026 Fields Medal) — the English showcase of
// the French machine (/aiguille-de-kakeya). Same simulator, English text: the
// half-turn that sweeps the least area (π/2 → π/4 → π/8 → … → 0) and the 3D
// theorem of Hong Wang & Joshua Zahl (2025). Built to catch the worldwide
// "Kakeya needle" search traffic and to record a clean English screen video.

import type { Metadata } from "next";
import KakeyaNeedleClient from "./KakeyaNeedleClient";

export const metadata: Metadata = {
  title: "Hong Wang, 2026 Fields Medal: the Kakeya needle problem | EleveAI",
  description:
    "Turn a needle a full half-turn while sweeping the smallest possible area: around the tip (π/2), around the center (π/4), inside the deltoid (π/8)… and Besicovitch proved you can get as close to 0 as you like. Hong Wang, the 3rd woman to win the Fields Medal, closed the Kakeya conjecture in 3D with Joshua Zahl (2025). Her blackboard decoded (projection, shadows, the pigeonhole principle), her words — the tribute to her French teachers, \"no difference between women and men\" — and challenges from age 6 to 18.",
  keywords: [
    "Kakeya needle",
    "Kakeya needle problem",
    "Kakeya conjecture",
    "Kakeya needle simulator",
    "Hong Wang",
    "2026 Fields Medal",
    "Besicovitch",
    "pigeonhole principle",
    "women in mathematics",
    "interactive maths",
    "eleveai",
  ],
  openGraph: {
    title: "Hong Wang, 2026 Fields Medal: the world's most economical U-turn",
    description:
      "The area halves with every trick — π/2, π/4, π/8… how far can it go? The Kakeya needle problem as a machine you set, the conjecture closed in 3D (2025), her blackboard decoded and challenges from age 6 to 18.",
    url: "https://www.eleveai.fr/en/simulators/kakeya-needle",
    siteName: "EleveAI",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "/en/simulators/kakeya-needle",
    languages: {
      "fr-FR": "/aiguille-de-kakeya",
      en: "/en/simulators/kakeya-needle",
    },
  },
};

export default function Page() {
  return <KakeyaNeedleClient />;
}
