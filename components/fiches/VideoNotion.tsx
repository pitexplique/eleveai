"use client";

// ─── Le pont fiche → vidéo ─────────────────────────────────────────────────────
// QR code vers la vidéo de la notion (table notion_ressources, la même que le
// badge ▶ du coach) ; s'il n'y a pas encore de vidéo, repli vers la chaîne
// YouTube EleveAI. Le QR s'imprime avec la fiche : l'élève qui a la fiche
// papier (ou projetée en classe) scanne et regarde.

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { PlayCircle } from "lucide-react";

const CHAINE_YOUTUBE = "https://www.youtube.com/@eleveai-e1h";

export default function VideoNotion({
  matiere,
  classe,
  notion,
}: {
  matiere: string;
  classe: string;
  notion: string;
}) {
  const [video, setVideo] = useState<{ url: string; titre: string | null } | null>(null);
  const [charge, setCharge] = useState(false);

  useEffect(() => {
    let annule = false;
    // La fiche est nommée en tirets, la table notion_ressources en underscores
    // (le notionId du coach) — même clé que le badge ▶.
    const notionId = notion.replace(/-/g, "_");
    fetch(`/api/notion-videos?matiere=${matiere}&classe=${classe}`)
      .then((res) => res.json())
      .then((data) => {
        if (annule) return;
        setVideo(data?.videos?.[notionId]?.[0] ?? null);
      })
      .catch(() => {
        /* hors-ligne : repli chaîne */
      })
      .finally(() => {
        if (!annule) setCharge(true);
      });
    return () => {
      annule = true;
    };
  }, [matiere, classe, notion]);

  if (!charge) return null;

  const url = video?.url ?? CHAINE_YOUTUBE;

  return (
    <div className="mt-5 flex items-center gap-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 print:mt-3 print:gap-3 print:p-3">
      <div className="shrink-0 rounded-xl border border-rose-200 bg-white p-2">
        <QRCodeSVG value={url} size={84} aria-label="QR code vers la vidéo" />
      </div>
      <div className="min-w-0">
        <p className="flex items-center gap-2 font-black text-slate-900 print:text-sm">
          <PlayCircle className="h-5 w-5 shrink-0 text-rose-500 print:hidden" />
          {video ? "La vidéo de cette notion" : "Nos vidéos de cours"}
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-600 print:text-xs">
          {video
            ? "Scanne le QR code avec ton téléphone pour voir le cours en vidéo."
            : "Scanne le QR code pour découvrir la chaîne YouTube EleveAI."}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="screen-only mt-2 inline-flex items-center gap-1.5 text-sm font-black text-rose-600 transition hover:text-rose-500"
        >
          {video ? "Regarder la vidéo" : "Voir la chaîne"} →
        </a>
      </div>
    </div>
  );
}
