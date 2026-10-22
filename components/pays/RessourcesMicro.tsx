"use client";

// Sur la page d'un pays (/pays/<pays>) : à côté du GO de chaque micro, ses
// ressources, comme dans le coach France — la fiche de cours, la feuille
// d'exercices, la vidéo paysage et le short. Frédéric (22/10/2026) : « il
// manque la correspondance fiches d'exercices et vidéos sur les micros ».
// Les vidéos viennent de la même source que le coach (/api/notion-videos) :
// une nouvelle vidéo rattachée à la micro apparaît donc ici sans rien toucher.

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, PencilLine, Play } from "lucide-react";
import { estShortVideo, lienVideo } from "@/lib/videos/lienVideo";

type Video = { url: string; titre: string | null };
type Videos = { notion: Record<string, Video[]>; micro: Record<string, Video[]> };

// Une seule requête par classe pour toute la page, partagée entre les lignes.
const cache = new Map<string, Promise<Videos>>();
function videosDeLaClasse(classe: string): Promise<Videos> {
  if (!cache.has(classe)) {
    cache.set(
      classe,
      fetch(`/api/notion-videos?matiere=maths&classe=${classe}`)
        .then((r) => r.json())
        .then((d) => ({ notion: d?.videos ?? {}, micro: d?.videosMicro ?? {} }))
        .catch(() => ({ notion: {}, micro: {} })),
    );
  }
  return cache.get(classe)!;
}

const BOUTON =
  "flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-700 transition hover:bg-slate-50";

export default function RessourcesMicro({
  classe,
  notion,
  micro,
  ficheHref,
  exercicesHref,
}: {
  classe: string;
  notion: string;
  micro: string;
  ficheHref: string | null;
  exercicesHref: string | null;
}) {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    let annule = false;
    videosDeLaClasse(classe).then((v) => {
      // Les vidéos de la micro d'abord ; sinon celle de la notion, comme le coach.
      if (!annule) setVideos(v.micro[micro]?.length ? v.micro[micro] : v.notion[notion] ?? []);
    });
    return () => {
      annule = true;
    };
  }, [classe, notion, micro]);

  const paysage = videos.find((v) => !estShortVideo(v.url));
  const short = videos.find((v) => estShortVideo(v.url));

  return (
    <span className="flex shrink-0 flex-wrap items-center gap-1">
      {ficheHref ? (
        <Link prefetch={false} href={ficheHref} className={BOUTON} title="La fiche de cours">
          <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
          Fiche
        </Link>
      ) : null}
      {exercicesHref ? (
        <Link prefetch={false} href={exercicesHref} className={BOUTON} title="La feuille d'exercices corrigés">
          <PencilLine className="h-3.5 w-3.5 text-amber-600" />
          Exercices
        </Link>
      ) : null}
      {paysage ? (
        <a
          href={lienVideo(paysage.url)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
          title={paysage.titre ?? "La vidéo"}
        >
          <Play className="h-3 w-3 fill-current" />
          Vidéo
        </a>
      ) : null}
      {short ? (
        <a
          href={lienVideo(short.url)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-7 w-[18px] items-center justify-center rounded-[5px] border-2 border-rose-300 bg-rose-50 text-rose-600 transition hover:bg-rose-100"
          title={short.titre ?? "Le short"}
          aria-label={`Short : ${short.titre ?? micro}`}
        >
          <Play className="h-2.5 w-2.5 fill-current" />
        </a>
      ) : null}
    </span>
  );
}
