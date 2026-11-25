// ─── /petits : 3 dessins animés CP à montrer aux petits frères et sœurs ────────
// 25/11/2026. Frédéric : ses 6e prennent la tablette à la maison et la partagent
// avec leurs petites sœurs / petits frères de CP. Avant de lancer les dessins
// animés de la Grande Section au CM2, on TESTE : 3 shorts CP qui existent déjà,
// l'élève les montre au petit, puis raconte ses impressions au prof.
//
// Chaque carte ouvre le lecteur EleveAI (/video/<id>), EN PAUSE : jamais de
// lecture automatique.
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { trouverVideo, urlR2 } from "@/lib/videos/r2";

export const metadata: Metadata = {
  title: "Dessins animés pour les petits",
  robots: { index: false, follow: false },
};

const SHORTS = [
  { id: "cp-famille-coccinelle", theme: "Compter", emoji: "🐞" },
  { id: "cp-duree-lire-heure-short", theme: "Lire l’heure", emoji: "⏰" },
  { id: "cp-masse-comparer-short", theme: "Lourd ou léger", emoji: "⚖️" },
];

const QUESTIONS = [
  "A-t-il (ou elle) regardé jusqu’au bout ?",
  "A-t-il ri ?",
  "A-t-il répondu à la question ?",
  "En a-t-il redemandé une autre ?",
];

export default function PagePetits() {
  const videos = SHORTS.map((s) => ({ ...s, v: trouverVideo(s.id) })).filter((s) => s.v);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-sky-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-center text-3xl font-black text-slate-800 sm:text-4xl">
          Des dessins animés pour les petits 🎈
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg font-semibold text-slate-600">
          Montre ces 3 petits dessins animés à ta petite sœur ou à ton petit frère.
          Appuie sur une image pour l’ouvrir.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {videos.map(({ id, theme, emoji, v }, i) => (
            <Link
              key={id}
              href={`/video/${id}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[9/16] bg-slate-200">
                {v!.vignette && (
                  <Image
                    src={urlR2(v!.vignette)}
                    alt={v!.titre}
                    fill
                    unoptimized
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                )}
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-black text-slate-800">
                  {i + 1}
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-3xl shadow-lg transition group-hover:scale-110">
                    ▶
                  </span>
                </span>
              </div>
              <p className="px-4 py-3 text-center text-xl font-black text-slate-800">
                {emoji} {theme}
              </p>
            </Link>
          ))}
        </div>

        <section className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white p-6 shadow ring-1 ring-slate-200">
          <h2 className="text-xl font-black text-slate-800">Après, raconte à ton prof 📝</h2>
          <ul className="mt-3 space-y-2 text-lg font-semibold text-slate-700">
            {QUESTIONS.map((q) => (
              <li key={q} className="flex gap-2">
                <span aria-hidden>☐</span>
                {q}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-base text-slate-500">
            Et dis-nous quel dessin animé il (ou elle) a préféré !
          </p>
        </section>
      </div>
    </main>
  );
}
