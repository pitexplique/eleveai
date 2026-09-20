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
  // ⭐ TOUTES LES VIDÉOS DE LA NOTION, PAS SEULEMENT LA PREMIÈRE (20/09/2026).
  // Ce bloc lisait `[0]`. Tant qu'une notion n'avait qu'une vidéo, c'était la
  // même chose ; avec les leçons de 1re spé en deux ou trois parties, la fiche
  // du second degré aurait montré « (1/2) » et passé la seconde sous silence —
  // celle du tableau de signes, qui est la moitié du chapitre. L'ordre des parties est
  // posé par la route (/api/notion-videos), qui lit le rang dans le titre.
  const [videos, setVideos] = useState<{ url: string; titre: string | null }[]>([]);
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
        setVideos(data?.videos?.[notionId] ?? []);
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
  if (!charge || videos.length === 0) return null;

  // Plusieurs parties : un QR code par vidéo, chacun sous son titre. À
  // l'impression c'est la seule porte — un lien ne se clique pas sur du papier —
  // donc la seconde partie a droit au sien, en plus petit pour tenir sur la
  // ligne. ⚠️ Le cas à UNE vidéo garde son rendu d'origine, plus bas, au pixel :
  // treize fiches de 6e l'affichent déjà et n'ont rien demandé.
  if (videos.length > 1) {
    return (
      <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 print:mt-3 print:p-3">
        <p className="flex items-center gap-2 font-black text-slate-900 print:text-sm">
          <PlayCircle className="h-5 w-5 shrink-0 text-rose-500 print:hidden" />
          Les vidéos de cette notion
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-600 print:text-xs">
          Scanne un QR code avec ton téléphone pour voir le cours en vidéo.
        </p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 print:grid-cols-2 print:gap-2">
          {videos.map((v) => (
            <li key={v.url} className="flex items-center gap-3">
              <div className="shrink-0 rounded-xl border border-rose-200 bg-white p-1.5">
                <QRCodeSVG value={v.url} size={64} aria-label="QR code vers la vidéo" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold leading-5 text-slate-900 print:text-xs">
                  {v.titre ?? "La vidéo"}
                </p>
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="screen-only mt-1 inline-flex items-center gap-1.5 text-sm font-black text-rose-600 transition hover:text-rose-500"
                >
                  Regarder la vidéo →
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const url = videos[0].url;

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
