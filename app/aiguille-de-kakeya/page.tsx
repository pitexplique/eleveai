// « L'aiguille de Kakeya » (Hong Wang, médaille Fields 2026) — article-machine du journal (rubrique « Un peu
// de maths »), publié pour la médaille Fields 2026 (ICM Philadelphie, 23/07).
// Le problème de l'aiguille de Kakeya : demi-tour en balayant le moins de
// surface possible (π/2 → π/4 → π/8 → … vers 0), et le théorème 3D de Hong
// Wang & Joshua Zahl (2025). Avec son tableau décodé (projection + tiroirs).

import type { Metadata } from "next";
import AiguilleDeKakeyaClient from "./AiguilleDeKakeyaClient";

export const metadata: Metadata = {
  title: "Hong Wang, médaille Fields 2026 : le problème de l'aiguille | EleveAI",
  description:
    "Fais faire demi-tour à une aiguille en balayant le moins de place possible : autour du bout (π/2), du centre (π/4), dans le deltoïde (π/8)… et Besicovitch a prouvé qu'on peut approcher 0. Hong Wang, 3e femme médaillée Fields, a fermé la conjecture de Kakeya en 3D avec Joshua Zahl (2025). Son tableau décodé (projection, ombres, principe des tiroirs), ses mots — l'hommage à ses profs français, « aucune différence entre les femmes et les hommes » — et les défis du CP à la Terminale.",
  keywords: [
    "médaille Fields 2026",
    "Hong Wang",
    "conjecture de Kakeya",
    "aiguille de Kakeya",
    "Besicovitch",
    "problème de l'aiguille",
    "principe des tiroirs",
    "IHES",
    "femmes en mathématiques",
    "simulateur pédagogique",
    "eleveai",
  ],
  openGraph: {
    title: "Hong Wang, médaille Fields 2026 : le demi-tour le plus économe du monde",
    description:
      "L'aire se divise par 2 à chaque ruse — π/2, π/4, π/8… jusqu'où ? Le problème de l'aiguille en machine à régler, la conjecture de Kakeya fermée en 3D (2025), son tableau décodé et les défis du CP à la Terminale.",
    url: "https://eleveai.fr/aiguille-de-kakeya",
    siteName: "EleveAI",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "/aiguille-de-kakeya",
    languages: {
      "fr-FR": "/aiguille-de-kakeya",
      en: "/en/simulators/kakeya-needle",
    },
  },
};

export default function Page() {
  return <AiguilleDeKakeyaClient />;
}
