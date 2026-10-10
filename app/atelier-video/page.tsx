import type { Metadata } from "next";
import AtelierVideoClient from "./AtelierVideoClient";

// ⭐ 09/10/2026 — l'atelier vidéo. Ouvert aux moteurs de recherche et mis dans
// le sitemap le 10/10/2026 (Frédéric : « mets-la dans le sitemap »), quand les
// vidéos d'annonce ont été rendues.
// ⚠️ Pas de « — EleveAI » ici : le layout racine l'ajoute déjà.
export const metadata: Metadata = {
  title: "Atelier vidéo : écris ton script, regarde ta vidéo",
  description:
    "Écris le script d'une vidéo en français, une ligne par plan : l'aperçu s'anime tout de suite. Mets ta propre voix au micro, puis télécharge ta vidéo. Gratuit, sans rien installer, en maths, français, langues, économie et IA.",
  alternates: { canonical: "/atelier-video" },
};

export default function AtelierVideoPage() {
  return <AtelierVideoClient />;
}
