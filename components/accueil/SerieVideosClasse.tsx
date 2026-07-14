"use client";

// Encart accueil « Nouveau dans le coach » — la série FICHE + VIDÉO par notion,
// classe par classe. Le coach reste le héros ; les vidéos (série Manim maison)
// sont la PREUVE que le coach est complet, pas une porte de sortie vers YouTube.
//
// Générique (une instance par classe : 6ᵉ, 5ᵉ, puis 4ᵉ...). Source de vérité du
// mur = l'API publique /api/notion-videos (miroir de notion_ressources) : il se
// remplit tout seul quand Frédéric publie une vidéo et met son URL en base.
//
// `masquerSiVide` : pour une classe pas encore publiée (ex. la 5ᵉ avant upload),
// on n'affiche RIEN tant qu'il n'y a pas au moins une vidéo — l'encart apparaît
// automatiquement au premier upload, sans toucher au code.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const CHAINE_URL = "https://www.youtube.com/@eleveai-e1h";
const CHAINE_SABONNER = "https://www.youtube.com/@eleveai-e1h?sub_confirmation=1";

export type NotionVideo = { id: string; emoji: string; label: string };

// youtu.be/ID, youtube.com/watch?v=ID, /embed/ID… → l'identifiant seul.
function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

type ApiVideos = { ok: boolean; videos: Record<string, { url: string; titre: string | null }[]> };
type Video = { id: string; emoji: string; label: string };

type Props = {
  /** Slug de la classe pour l'API et les liens (ex. "6e", "5e"). */
  classe: string;
  /** Libellé affiché (ex. "6ᵉ", "5ᵉ"). */
  classeLabel: string;
  /** Lien du coach de la classe (ex. /coach-ia/maths?classe=6e). */
  coachHref: string;
  /** Liste ordonnée des notions (id = notionId en base, emoji, libellé soigné). */
  notions: NotionVideo[];
  /** Phrase de pied (feuille de route). */
  pied: React.ReactNode;
  /** Si true : n'affiche rien tant qu'aucune vidéo n'est publiée. */
  masquerSiVide?: boolean;
};

export function SerieVideosClasse({
  classe,
  classeLabel,
  coachHref,
  notions,
  pied,
  masquerSiVide = false,
}: Props) {
  const [videos, setVideos] = useState<Video[] | null>(null);

  useEffect(() => {
    let vivant = true;
    fetch(`/api/notion-videos?matiere=maths&classe=${classe}`)
      .then((r) => (r.ok ? (r.json() as Promise<ApiVideos>) : null))
      .then((data) => {
        if (!vivant || !data?.videos) return;
        const list: Video[] = [];
        for (const n of notions) {
          const url = data.videos[n.id]?.[0]?.url;
          const id = url ? youtubeId(url) : null;
          if (id) list.push({ id, emoji: n.emoji, label: n.label });
        }
        setVideos(list);
      })
      .catch(() => setVideos([]));
    return () => {
      vivant = false;
    };
  }, [classe, notions]);

  const featured = useMemo(() => videos?.[0] ?? null, [videos]);
  const reste = useMemo(() => (videos ? videos.slice(1) : []), [videos]);

  // Classe pas encore publiée : invisible tant qu'il n'y a pas de vidéo.
  if (masquerSiVide && (videos === null || videos.length === 0)) return null;

  return (
    <section className="px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-amber-300/25 bg-gradient-to-br from-amber-400/[0.12] via-white/[0.03] to-white/[0.03] p-6 sm:p-8">
        {/* En-tête : le NOUVEAU est le coach, pas la chaîne */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="inline-flex flex-wrap items-center gap-2 rounded-full bg-amber-300/20 px-3 py-1.5 text-xs font-black uppercase tracking-[0.15em] text-amber-200">
              <span aria-hidden>✨</span> Nouveau dans le coach
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] tracking-normal text-white">
                {classeLabel} complète
              </span>
            </p>
            <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
              En {classeLabel}, chaque notion a sa{" "}
              <span className="text-sky-200">fiche de cours</span> et sa{" "}
              <span className="bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent">
                vidéo
              </span>
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm font-semibold leading-6 text-white/75">
              Le coach n&apos;est plus seulement des exercices : pour toute la{" "}
              {classeLabel}, tu retrouves désormais, à côté de chaque série, la{" "}
              <strong className="text-white">leçon</strong> et une{" "}
              <strong className="text-white">vidéo</strong> qui montre tout pas à
              pas. Faites main, sans pub. 🦎
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Link
              href={coachHref}
              className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-2.5 text-sm font-black text-[#0b2c4a] shadow-lg transition hover:scale-105 hover:bg-amber-200"
            >
              Ouvrir le coach {classeLabel} →
            </Link>
            <a
              href={CHAINE_SABONNER}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-black text-white shadow-lg transition hover:scale-105 hover:bg-red-500"
            >
              <span aria-hidden>▶</span> S&apos;abonner
            </a>
          </div>
        </div>

        {/* Ce qui est intégré, en clair : 3 pastilles fiche · vidéo · exos */}
        <div className="mt-5 flex flex-wrap gap-2">
          {[
            "📄 Une fiche de cours par notion",
            "▶ Une vidéo par notion",
            "🧠 Les séries d'exercices corrigées",
          ].map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-xs font-bold text-white/85"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Le mur de vidéos — la PREUVE que la classe est complète */}
        {videos === null ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-video animate-pulse rounded-2xl bg-white/[0.06]" />
            ))}
          </div>
        ) : videos.length === 0 ? null : (
          <>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.15em] text-white/45">
              🎬 Les vidéos de la {classeLabel}
            </p>
            <div className="mt-3 grid gap-4 lg:grid-cols-3">
              {/* Vidéo à la une */}
              {featured && (
                <a
                  href={`https://youtu.be/${featured.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative col-span-1 overflow-hidden rounded-2xl border border-white/10 bg-black/40 lg:col-span-2"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://i.ytimg.com/vi/${featured.id}/hqdefault.jpg`}
                      alt={featured.label}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/90 text-2xl text-white shadow-xl transition group-hover:scale-110">
                        ▶
                      </span>
                    </span>
                    <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-white backdrop-blur-sm">
                      ⭐ À voir en premier
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-base font-black leading-snug text-white">
                      {featured.emoji} {featured.label}
                    </p>
                    <p className="mt-0.5 text-xs font-bold text-white/55">
                      Maths · {classeLabel} · EleveAI
                    </p>
                  </div>
                </a>
              )}

              {/* Colonne / grille des autres vidéos */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {reste.slice(0, 4).map((v) => (
                  <a
                    key={v.id}
                    href={`https://youtu.be/${v.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition hover:-translate-y-0.5 hover:border-red-400/40 hover:bg-white/[0.08] lg:gap-2"
                  >
                    <div className="relative aspect-video w-24 shrink-0 overflow-hidden bg-black/40 lg:w-28">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`}
                        alt={v.label}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600/85 text-xs text-white">
                          ▶
                        </span>
                      </span>
                    </div>
                    <p className="min-w-0 flex-1 py-1 pr-2 text-xs font-black leading-tight text-white">
                      {v.emoji} {v.label}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {reste.length > 4 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {reste.slice(4).map((v) => (
                  <a
                    key={v.id}
                    href={`https://youtu.be/${v.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition hover:-translate-y-0.5 hover:border-red-400/40 hover:bg-white/[0.08]"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`}
                        alt={v.label}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600/85 text-sm text-white transition group-hover:scale-110">
                          ▶
                        </span>
                      </span>
                    </div>
                    <p className="p-2.5 text-xs font-black leading-tight text-white">
                      {v.emoji} {v.label}
                    </p>
                  </a>
                ))}
              </div>
            )}
          </>
        )}

        {/* Pied : la feuille de route + liens secondaires */}
        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold text-white/80">{pied}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={coachHref}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-white transition hover:bg-white/20"
            >
              🧠 Ouvrir le coach {classeLabel}
            </Link>
            <a
              href={CHAINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-4 py-2 text-sm font-black text-white/80 transition hover:bg-white/10"
            >
              ▶ La chaîne YouTube
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Les notions, dans l'ordre pédagogique (id = notionId en base) ──────────────

const NOTIONS_6E: NotionVideo[] = [
  { id: "entier_nombre",         emoji: "🔢", label: "Les nombres entiers" },
  { id: "entier_calcul_pose",    emoji: "✏️", label: "Le calcul posé" },
  { id: "entier_calcul_mental",  emoji: "🧠", label: "Le calcul mental" },
  { id: "decimal_nombre",        emoji: "🔟", label: "Les nombres décimaux" },
  { id: "fraction_nombre",       emoji: "🍕", label: "Les fractions" },
  { id: "prop_proportionnalite", emoji: "⚖️", label: "La proportionnalité" },
  { id: "pourcentage_nombre",    emoji: "％", label: "Les pourcentages" },
  { id: "aire_longueur",         emoji: "📏", label: "Les longueurs" },
  { id: "aire_perimetre",        emoji: "🔲", label: "Les périmètres" },
  { id: "aire_surface",          emoji: "🟩", label: "Les aires" },
  { id: "volume_solide",         emoji: "🧊", label: "Les volumes" },
  { id: "angle_mesure",          emoji: "📐", label: "Les angles" },
  { id: "triangle_figure",       emoji: "🔺", label: "Les triangles" },
  { id: "quadrilatere_figure",   emoji: "▱",  label: "Les quadrilatères" },
  { id: "sym_axiale",            emoji: "🦋", label: "La symétrie axiale" },
  { id: "stat_donnee",           emoji: "📊", label: "Lire des données" },
  { id: "proba_experience",      emoji: "🎲", label: "Les probabilités" },
  { id: "algo_programmation",    emoji: "🐢", label: "Programmer (algo)" },
];

const NOTIONS_5E: NotionVideo[] = [
  { id: "relatif_nombre",        emoji: "➖", label: "Les nombres relatifs" },
  { id: "fraction_nombre",       emoji: "🍕", label: "Les fractions" },
  { id: "litteral_calcul",       emoji: "🔤", label: "Le calcul littéral" },
  { id: "prop_proportionnalite", emoji: "⚖️", label: "La proportionnalité" },
  { id: "stat_statistique",      emoji: "📊", label: "Les statistiques" },
  { id: "proba_experience",      emoji: "🎲", label: "Les probabilités" },
  { id: "angle_mesure",          emoji: "📐", label: "Les angles" },
  { id: "triangle_figure",       emoji: "🔺", label: "Les triangles" },
  { id: "sym_centrale",          emoji: "🔄", label: "La symétrie centrale" },
  { id: "aire_surface",          emoji: "🟩", label: "Les aires" },
  { id: "volume_solide",         emoji: "🧊", label: "Les volumes" },
  { id: "algo_programmation",    emoji: "🐢", label: "Algo & Scratch" },
];

export function SerieVideos6e() {
  return (
    <SerieVideosClasse
      classe="6e"
      classeLabel="6ᵉ"
      coachHref="/coach-ia/maths?classe=6e"
      notions={NOTIONS_6E}
      pied={
        <>
          🚀 La 6ᵉ d&apos;abord —{" "}
          <span className="text-white">les autres classes suivent</span>, une par
          une.
        </>
      }
    />
  );
}

export function SerieVideos5e() {
  return (
    <SerieVideosClasse
      classe="5e"
      classeLabel="5ᵉ"
      coachHref="/coach-ia/maths?classe=5e"
      notions={NOTIONS_5E}
      masquerSiVide
      pied={
        <>
          🔥 La 5ᵉ aussi est complète —{" "}
          <span className="text-white">12 notions</span> en fiche + vidéo.
        </>
      }
    />
  );
}
