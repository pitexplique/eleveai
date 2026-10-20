// ─── Le lecteur EleveAI : la vidéo sans YouTube ─────────────────────────────────
// 18/10/2026. Le MP4 est lu sur Cloudflare R2 par le lecteur du navigateur :
// pas de pub, pas de « vidéos suggérées », et il passe là où YouTube est bloqué
// (réseaux d'établissement). L'adresse accepte l'id du manifeste — une vidéo
// rendue mais pas encore publiée se regarde déjà — ou l'ID YouTube, ce que
// donnent les liens du coach.
//
// ⛔ JAMAIS de lecture automatique : la vidéo s'ouvre EN PAUSE, Frédéric appuie
// lui-même (deux voix se superposaient, 28/09).
// Une vidéo absente de R2 renvoie vers YouTube : un lien du coach ne casse jamais.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { trouverVideo, urlR2 } from "@/lib/videos/r2";
import LecteurVideo from "@/components/LecteurVideo";

type Props = { params: Promise<{ id: string }> };

const ID_YOUTUBE = /^[\w-]{11}$/;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const v = trouverVideo(id);
  // noindex : la vitrine publique reste YouTube (sitemap vidéo, abonnés).
  return { title: v ? v.titre : "Vidéo", robots: { index: false, follow: false } };
}

export default async function PageVideo({ params }: Props) {
  const { id } = await params;
  const v = trouverVideo(id);
  if (!v) {
    if (ID_YOUTUBE.test(id)) redirect(`https://www.youtube.com/watch?v=${id}`);
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-white">
      <div className={v.short ? "mx-auto max-w-sm" : "mx-auto max-w-5xl"}>
        <Link
          href="/video"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Toutes les vidéos
        </Link>

        <h1 className="mt-3 text-xl font-black leading-tight sm:text-2xl">{v.titre}</h1>

        <LecteurVideo
          key={v.id}
          videoId={v.id}
          src={urlR2(v.fichier)}
          poster={v.poster ? urlR2(v.poster) : undefined}
          controls
          playsInline
          preload="metadata"
          className={[
            "mt-4 w-full rounded-2xl bg-black shadow-2xl",
            v.short ? "aspect-[9/16] max-h-[80vh]" : "aspect-video",
          ].join(" ")}
        >
          Ton navigateur ne lit pas cette vidéo.{" "}
          <a href={urlR2(v.fichier)} className="underline">
            Télécharger le fichier
          </a>
          .
        </LecteurVideo>

        {/* ⛔ 20/10/2026 — Frédéric : « on enlève commenter sur YouTube ».
            Les élèves restent sur le lecteur du site : aucun lien vers YouTube. */}
      </div>
    </main>
  );
}
