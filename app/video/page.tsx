// La liste de toutes les vidéos hébergées sur R2, rangées par dossier de
// manim/sorties (classe / matière / format). Page de travail : noindex.
import type { Metadata } from "next";
import Link from "next/link";
import { toutesLesVideos } from "@/lib/videos/r2";

export const metadata: Metadata = {
  title: "Les vidéos EleveAI",
  robots: { index: false, follow: false },
};

export default function ListeVideos() {
  const videos = toutesLesVideos();
  const groupes = new Map<string, typeof videos>();
  for (const v of videos) {
    const dossier = v.fichier.split("/").slice(0, 2).join(" · ");
    groupes.set(dossier, [...(groupes.get(dossier) ?? []), v]);
  }
  const ordre = [...groupes.keys()].sort((a, b) => a.localeCompare(b, "fr"));

  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800">
      <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-black text-slate-900">Les vidéos EleveAI</h1>
      <p className="mt-1 text-sm text-slate-600">
        {videos.length} vidéos lues depuis Cloudflare R2, sans YouTube.{" "}
        {videos.filter((v) => !v.youtube).length} ne sont pas encore publiées sur YouTube.
      </p>

      {ordre.map((dossier) => {
        const liste = groupes.get(dossier)!.sort((a, b) => a.id.localeCompare(b.id, "fr"));
        return (
          <section key={dossier} className="mt-6">
            <h2 className="text-lg font-black text-slate-800">
              {dossier} <span className="text-sm font-bold text-slate-400">({liste.length})</span>
            </h2>
            <ul className="mt-2 grid gap-1 sm:grid-cols-2">
              {liste.map((v) => (
                <li key={v.id}>
                  <Link
                    href={`/video/${v.id}`}
                    className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-slate-700 transition hover:bg-rose-50 hover:text-rose-700"
                  >
                    <span
                      aria-hidden="true"
                      className={
                        v.short
                          ? "h-4 w-2.5 shrink-0 rounded-[3px] border-2 border-rose-300"
                          : "h-2.5 w-4 shrink-0 rounded-[3px] border-2 border-rose-300"
                      }
                    />
                    <span className="truncate">{v.titre}</span>
                    {v.youtube ? null : (
                      <span className="shrink-0 rounded-full bg-amber-100 px-1.5 text-[10px] font-bold text-amber-700">
                        pas sur YouTube
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      </div>
    </main>
  );
}
