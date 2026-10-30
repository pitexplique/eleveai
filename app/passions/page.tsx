// /passions — L'ÉLÈVE CHOISIT SES PASSIONS, ET TROUVE AUSSITÔT DES MATHS QUI EN PARLENT.
// 30/10/2026. Frédéric : « quand les élèves se connectent, ce serait bien qu'ils
// sélectionnent leurs centres d'intérêt », « il devrait trouver des ressources
// adaptées », « le coach, il faut VOULOIR y rentrer », « un centre d'intérêt peut
// amener petit à petit l'élève à s'intéresser aux maths : à un élève de soutien
// scolaire, je faisais des cours sur le rugby — là, il comprenait ».
// Ouverte à tous (non connectés : passions gardées dans le navigateur).
import type { Metadata } from "next";
import { Suspense } from "react";
import { toutesLesVideos, urlR2 } from "@/lib/videos/r2";
import TAGS_VIDEOS from "@/lib/videos/centres-interet-videos.json";
import PassionsClient, { type VideoPassion } from "./PassionsClient";

export const metadata: Metadata = {
  title: "Mes passions — les maths de ce que tu aimes",
  description: "Choisis ce que tu aimes : sport, musique, jeux vidéo, animaux… et découvre les maths qui en parlent.",
};

function videosEtiquetees(): VideoPassion[] {
  const tags = TAGS_VIDEOS as Record<string, string[]>;
  return toutesLesVideos()
    .filter((v) => tags[v.id]?.length && v.vignette)
    .map((v) => ({
      id: v.id,
      titre: v.titre.split(" — ")[0],
      sousTitre: v.titre.split(" — ").slice(1).join(" — "),
      vignette: urlR2(v.vignette!),
      short: v.short,
      coach: v.coach ?? null,
      // La classe est dans le lien du coach (« ?classe=6e&… ») : pas besoin du manifeste.
      classe: v.coach ? new URLSearchParams(v.coach.split("?")[1] ?? "").get("classe") : null,
      centres: tags[v.id],
    }));
}

export default function PassionsPage() {
  return (
    <Suspense>
      <PassionsClient videos={videosEtiquetees()} />
    </Suspense>
  );
}
