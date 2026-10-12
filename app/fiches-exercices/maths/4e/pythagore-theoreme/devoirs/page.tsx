import type { Metadata } from "next";
import DevoirsClient from "./DevoirsClient";

// ⭐ 12/10/2026 : un devoir par épisode de la série Pythagore (une vidéo par
// micro) : le QR de l'épisode + 5 exercices de la même micro. Voir DevoirsClient.

export const metadata: Metadata = {
  title: "Pythagore 4e : devoirs à la maison, une vidéo + 5 exercices corrigés",
  description:
    "Des devoirs de 4e sur le théorème de Pythagore, un par épisode vidéo : regarder l'épisode (hypoténuse, carré et racine carrée), puis faire 5 exercices de la même compétence. Deux devoirs par feuille A4, corrigé en ligne.",
  alternates: { canonical: "/fiches-exercices/maths/4e/pythagore-theoreme/devoirs" },
};

export default function DevoirsPythagore4ePage() {
  return <DevoirsClient />;
}
