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

// 26/11 : les 6 dessins animés « nombres entiers » (Ti Margo, CP) rejoignent le test : 3 paysages (une
// histoire, deux questions) et 3 shorts (un petit jeu), en plus des 3 shorts du début.
// 26/11 après-midi : + les paires 4-5-6 (comparer, dizaines-unités, piste graduée), sur l'OK de Frédéric.
const PAYSAGES = [
  { id: "cp-entier-denombre", theme: "Combien de fraises ?", emoji: "🍓" },
  { id: "cp-entier-rang", theme: "La file du toboggan", emoji: "🛝" },
  { id: "cp-entier-collection", theme: "Une assiette pour chacun", emoji: "🎉" },
  { id: "cp-entier-comparer", theme: "Qui en a le plus ?", emoji: "🐚" },
  { id: "cp-entier-dizaine", theme: "Les paquets de dix", emoji: "💐" },
  { id: "cp-entier-droite", theme: "La piste de la grenouille", emoji: "🐸" },
];

const SHORTS = [
  { id: "cp-entier-denombre-short", theme: "Qui a raison ?", emoji: "🍓" },
  { id: "cp-entier-rang-short", theme: "La course des escargots", emoji: "🐌" },
  { id: "cp-entier-collection-short", theme: "Les bougies", emoji: "🎂" },
  { id: "cp-entier-comparer-short", theme: "Les écureuils", emoji: "🐿️" },
  { id: "cp-entier-dizaine-short", theme: "Le pari des billes", emoji: "🔵" },
  { id: "cp-entier-droite-short", theme: "La fusée", emoji: "🚀" },
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

type Carte = { id: string; theme: string; emoji: string };

function avecVideo(liste: Carte[]) {
  return liste.map((c) => ({ ...c, v: trouverVideo(c.id) })).filter((c) => c.v);
}

function CarteVideo({ id, theme, emoji, v, numero, paysage }: Carte & { v: ReturnType<typeof trouverVideo>; numero: number; paysage: boolean }) {
  return (
    <Link
      href={`/video/${id}`}
      className="group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className={`relative bg-slate-200 ${paysage ? "aspect-video" : "aspect-[9/16]"}`}>
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
          {numero}
        </span>
        {/* Le bouton ▶ dans le coin : au centre, il cachait le texte de la miniature (« TU PARIES ? ») */}
        <span className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-2xl shadow-lg transition group-hover:scale-110">
          ▶
        </span>
      </div>
      <p className="px-4 py-3 text-center text-xl font-black text-slate-800">
        {emoji} {theme}
      </p>
    </Link>
  );
}

export default function PagePetits() {
  const paysages = avecVideo(PAYSAGES);
  const shorts = avecVideo(SHORTS);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-sky-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-center text-3xl font-black text-slate-800 sm:text-4xl">
          Des dessins animés pour les petits 🎈
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg font-semibold text-slate-600">
          Montre ces dessins animés à ta petite sœur ou à ton petit frère.
          Appuie sur une image pour l’ouvrir.
        </p>

        <h2 className="mt-10 text-center text-2xl font-black text-slate-800">
          ✨ Nouveau : les nombres, avec Ti Margo
        </h2>
        <p className="mt-1 text-center text-base font-semibold text-slate-500">
          Une petite histoire et deux questions : mets pause, et réponds à voix haute !
        </p>
        <div className="mt-5 grid gap-6 sm:grid-cols-3">
          {paysages.map((c, i) => (
            <CarteVideo key={c.id} {...c} numero={i + 1} paysage />
          ))}
        </div>

        <h2 className="mt-12 text-center text-2xl font-black text-slate-800">🎲 Les petits jeux</h2>
        <p className="mt-1 text-center text-base font-semibold text-slate-500">
          Moins d’une minute chacun : une question, et à toi de jouer !
        </p>
        <div className="mt-5 grid gap-6 sm:grid-cols-3">
          {shorts.map((c, i) => (
            <CarteVideo key={c.id} {...c} numero={paysages.length + i + 1} paysage={false} />
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
