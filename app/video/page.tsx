// La galerie de toutes les vidéos hébergées sur R2 : « À la une » (une paysage +
// un short), rangées façon Netflix, grille façon YouTube (VideosClient). noindex.
import type { Metadata } from "next";
import { toutesLesVideos, trouverVideo, urlR2 } from "@/lib/videos/r2";
import { VENTE } from "@/lib/legal/editeur";
import GardeVideotheque from "./GardeVideotheque";
import VideosClient, { type VideoListe, type VideoUne } from "./VideosClient";

export const metadata: Metadata = {
  title: "Les vidéos EleveAI",
  robots: { index: false, follow: false },
};

// ⭐ À LA UNE (18/10/2026) : changer l'id suffit (id du manifeste ou ID YouTube).
// Paysage : le TVI de Terminale (« j'adore la paysage sur le TVI », 11/10).
// Short : le dessin animé Ti Margo de la Diagonale des Fous (« j'adore », 15/10).
const A_LA_UNE = {
  paysage: "terminale-continuite-tvi",
  short: "5e-relatif-nombre-short-ti-margo-diagonale",
};

function une(cle: string): VideoUne | null {
  const v = trouverVideo(cle);
  if (!v) return null;
  return {
    id: v.id,
    titre: v.titre,
    src: urlR2(v.fichier),
    poster: v.poster ? urlR2(v.poster) : null,
  };
}

export default function ListeVideos() {
  // Seulement ce qu'affiche la liste : pas les chemins de fichiers.
  // ⛔ 03/11/2026 — Frédéric : le coach est en français, les vidéos d'écriture
  // en anglais (dossiers gb/, « english cursive… », « Writing cursive… »)
  // passaient EN PREMIER au CP. Elles restent sur R2, elles sortent de la liste.
  const videos: VideoListe[] = toutesLesVideos()
    .filter((v) => !/\/(gb|en)\//.test(v.fichier) && !/^(english|writing)\b/i.test(v.titre) && !/^\d-(premier|exemple|essai|version)/.test(v.id))
    .map((v) => ({
    id: v.id,
    titre: v.titre,
    classe: v.fichier.split("/")[0],
    short: v.short,
    publiee: Boolean(v.youtube),
    vignette: v.vignette ? urlR2(v.vignette) : null,
  }));

  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-black text-slate-900">Les vidéos EleveAI</h1>
        <GardeVideotheque fermee={VENTE.ouverte} nbVideos={videos.length}>
          <VideosClient videos={videos} paysage={une(A_LA_UNE.paysage)} short={une(A_LA_UNE.short)} />
        </GardeVideotheque>
      </div>
    </main>
  );
}
