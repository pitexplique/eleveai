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
import { ArrowLeft, BookOpen, Dumbbell, PencilLine } from "lucide-react";
import { trouverVideo, urlR2 } from "@/lib/videos/r2";
import BoutonAbonnement from "@/components/BoutonAbonnement";
import LecteurVideo from "@/components/LecteurVideo";
import { ficheExercicesHrefPourCoach } from "@/lib/fiches-exercices/registre";
import { ficheHrefPourCoach } from "@/lib/fiches/registre";
import BILANS_NOTIONS from "@/lib/videos/bilans-notions.json";

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

  // La fiche d'exercices de la notion (« les élèves adorent les fiches
  // d'exercices avec résumé de cours », 20/10), lue dans le lien du coach.
  const q = v.coach ? new URLSearchParams(v.coach.split("?")[1]) : null;
  const exercices = q ? ficheExercicesHrefPourCoach("maths", q.get("classe") ?? "", q.get("notion") ?? "") : null;
  const cours = q ? ficheHrefPourCoach("maths", q.get("classe") ?? "", q.get("notion") ?? "") : null;
  // La feuille bilan de toute la notion (une ligne par micro), si elle existe.
  const cleNotion = q ? `${q.get("classe")}/${q.get("notion")}` : "";
  const bilanNotion = cleNotion in BILANS_NOTIONS ? `/video/bilan/${cleNotion}` : null;

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
          suite={v.coach ? { href: v.coach, label: "Je m'entraîne sur ces questions" } : undefined}
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
        {/* ⭐ 27/10/2026 — pour le prof : la feuille bilan à imprimer. */}
        <Link
          href={`/video/${v.id}/bilan`}
          className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-slate-300 underline-offset-4 hover:text-white hover:underline"
        >
          <PencilLine className="h-4 w-4" />
          Feuille bilan à imprimer (compris, pas compris, questions)
        </Link>
        {bilanNotion && (
          <Link
            href={bilanNotion}
            className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-300 underline-offset-4 hover:text-white hover:underline"
          >
            <PencilLine className="h-4 w-4" />
            Feuille bilan de toute la notion (recto verso)
          </Link>
        )}

        {/* ⭐ 20/10/2026 — Frédéric : « relier, sous les vidéos, un lien vers
            le coach ». Après la vidéo, l'exercice de la même micro. */}
        {v.coach || exercices || cours ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {cours ? (
              <Link
                href={cours}
                className="flex items-center justify-center gap-2 rounded-2xl bg-sky-400 px-5 py-3 text-base font-black text-slate-950 shadow-lg transition hover:bg-sky-300"
              >
                <BookOpen className="h-5 w-5" />
                La fiche de cours
              </Link>
            ) : null}
            {exercices ? (
              <Link
                href={exercices}
                className="flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 text-base font-black text-slate-950 shadow-lg transition hover:bg-amber-300"
              >
                <PencilLine className="h-5 w-5" />
                Les exercices
              </Link>
            ) : null}
            {v.coach ? (
              <Link
                href={v.coach}
                className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-base font-black text-slate-950 shadow-lg transition hover:bg-emerald-400"
              >
                <Dumbbell className="h-5 w-5" />
                Je m&apos;entraîne sur le coach
              </Link>
            ) : null}
          </div>
        ) : null}

        {/* ⭐ 27/10/2026 — Frédéric : « s'abonner à la chaîne YouTube, mets-le en
            bas des cards fiche de cours, les exercices » : après l'entraînement. */}
        <div className="mt-5">
          <BoutonAbonnement />
        </div>

        {/* ⛔ 20/10/2026 — Frédéric : « on enlève commenter sur YouTube ».
            Les élèves restent sur le lecteur du site : aucun lien vers YouTube. */}
      </div>
    </main>
  );
}
