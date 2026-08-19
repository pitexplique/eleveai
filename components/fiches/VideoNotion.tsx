"use client";

// ─── Le pont fiche → vidéo ─────────────────────────────────────────────────────
// QR code vers la vidéo de la notion (table notion_ressources, la même que le
// badge ▶ du coach). Le QR s'imprime avec la fiche : l'élève qui a la fiche
// papier (ou projetée en classe) scanne et regarde.
//
// ⛔ PLUS DE REPLI VERS LA CHAÎNE (Frédéric, 19/08 : « il faut enlever les
// références aux vidéos car elles ne sont pas faites »).
//
// Ce bloc s'affichait sur TOUTES les fiches, en rose, juste sous le titre. Sans
// vidéo pour la notion — c'est-à-dire presque partout — il annonçait « Nos
// vidéos de cours » et envoyait scanner un QR code vers la chaîne YouTube. Une
// fiche imprimée et distribuée en classe promettait donc une vidéo qui n'existe
// pas, et le QR code est la pire façon de le faire : il est muet, on ne
// découvre le vide qu'après avoir sorti son téléphone.
//
// Le composant reste, entier : le jour où une vidéo est enregistrée dans
// notion_ressources, sa fiche l'affiche toute seule, sans rien à rebrancher.
// Pour rétablir le repli, il suffit de rendre le bloc avec l'URL de la chaîne
// quand `video` est nul — c'est ce que faisait CHAINE_YOUTUBE, retiré ici.

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { PlayCircle } from "lucide-react";

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

  // Rien tant qu'on n'a pas demandé, et rien s'il n'y a pas de vidéo POUR CETTE
  // NOTION. Voir la note en tête : une fiche ne promet que ce qui existe.
  if (!charge || !video) return null;

  const url = video.url;

  return (
    <div className="mt-5 flex items-center gap-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 print:mt-3 print:gap-3 print:p-3">
      <div className="shrink-0 rounded-xl border border-rose-200 bg-white p-2">
        <QRCodeSVG value={url} size={84} aria-label="QR code vers la vidéo" />
      </div>
      <div className="min-w-0">
        <p className="flex items-center gap-2 font-black text-slate-900 print:text-sm">
          <PlayCircle className="h-5 w-5 shrink-0 text-rose-500 print:hidden" />
          La vidéo de cette notion
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-600 print:text-xs">
          Scanne le QR code avec ton téléphone pour voir le cours en vidéo.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="screen-only mt-2 inline-flex items-center gap-1.5 text-sm font-black text-rose-600 transition hover:text-rose-500"
        >
          Regarder la vidéo →
        </a>
      </div>
    </div>
  );
}
