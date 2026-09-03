// LA PAGE D'UNE FICHE — /fiches-ecriture/lettres/a
//
// ⭐⭐ C'EST LA PAGE QUI NOUS DISTINGUE. Cinq sites vivent de « fiche écriture
// CP à imprimer » (professeur-o, ecriture-cp, bienenseigner, reussiralecole,
// apprendreavecbobo — vérifié le 03/09). Tous donnent un PDF. AUCUN ne montre
// le geste. Ici, la feuille et le film du crayon sont côte à côte, et le film
// existe en DEUX MAINS.
//
// ⭐ C'est aussi la seule page du parcours qui charge un lecteur YouTube, et
// seulement si la vidéo existe : le hub, lui, n'affiche que des images.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, Hand } from "lucide-react";

import { FICHES, famille, fiche } from "@/lib/fiches-ecriture/registre";

export function generateStaticParams() {
  return FICHES.map((f) => ({ famille: f.famille, fiche: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ famille: string; fiche: string }>;
}): Promise<Metadata> {
  const { famille: fam, fiche: sl } = await params;
  const f = fiche(fam, sl);
  if (!f) return {};
  return {
    title: `Écrire la lettre ${f.slug} en cursive — fiche CP à imprimer | EleveAI`,
    description: `La fiche d'écriture de la lettre ${f.slug} en cursive, à imprimer : le modèle, les pointillés à repasser, la ligne libre. Avec la vidéo qui montre le geste, pour un droitier comme pour un gaucher.`,
    alternates: { canonical: `/fiches-ecriture/${fam}/${sl}` },
  };
}

function Lecteur({ id, titre }: { id: string; titre: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-200">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={titre}
        className="h-full w-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default async function PageFiche({
  params,
}: {
  params: Promise<{ famille: string; fiche: string }>;
}) {
  const { famille: fam, fiche: sl } = await params;
  const f = fiche(fam, sl);
  const fa = famille(fam);
  if (!f || !fa) notFound();

  return (
    // ⛔ FOND CLAIR EXPLICITE. Le gabarit du site est SOMBRE : sans fond à elle,
    // cette page rendait un titre bleu nuit sur bleu nuit — illisible, et
    // invisible dans le code. Vu au rendu, pas en relisant.
    <main className="min-h-screen bg-[#f2fbff] text-slate-800">
      <section className="border-b border-slate-200 bg-gradient-to-br from-sky-400 via-cyan-400 to-teal-400 text-white">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
          <Link href="/fiches-ecriture" className="text-sm font-bold text-white/80 hover:text-white">
            ← Toutes les fiches d&apos;écriture
          </Link>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-white/70">
            Français CP · écriture
          </p>
          <h1 className="mt-1 text-4xl font-black tracking-tight sm:text-5xl">
            Écrire la lettre {f.slug} en cursive
          </h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/90 sm:text-lg">
            Le modèle, les pointillés à repasser, puis la ligne où l&apos;on écrit
            tout seul — toujours en partant du point vert.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-2">
        {/* ── La feuille ────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-black text-slate-900">La fiche</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={f.apercu}
            alt={`Fiche d'écriture de la lettre ${f.slug}`}
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-white"
            loading="lazy"
          />
          <a
            href={f.pdf}
            download
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 font-bold text-white transition hover:bg-slate-700"
          >
            <Download className="h-4 w-4" />
            Télécharger en PDF
          </a>
          <p className="mt-2 text-sm text-slate-500">
            A4, à imprimer autant de fois qu&apos;il faut.
          </p>
        </section>

        {/* ── Le geste ──────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-black text-slate-900">Le geste</h2>
          {/* ⭐ LES DEUX MAINS, ANNONCÉES. Les gauchers sont environ un enfant
              sur dix, et ce sont eux qui peinent le plus à l'écriture : leur
              montrer la main droite, c'est leur apprendre à se corriger d'une
              chose qui n'est pas une faute. */}
          {f.video?.droitier || f.video?.gaucher ? (
            <div className="mt-3 space-y-6">
              {f.video?.droitier && (
                <div>
                  <p className="mb-2 inline-flex items-center gap-1.5 text-sm font-bold text-slate-700">
                    <Hand className="h-4 w-4" /> Pour un droitier
                  </p>
                  <Lecteur id={f.video.droitier} titre={`${f.titre} — droitier`} />
                </div>
              )}
              {f.video?.gaucher && (
                <div>
                  <p className="mb-2 inline-flex items-center gap-1.5 text-sm font-bold text-slate-700">
                    <Hand className="h-4 w-4 -scale-x-100" /> Pour un gaucher
                  </p>
                  <Lecteur id={f.video.gaucher} titre={`${f.titre} — gaucher`} />
                </div>
              )}
            </div>
          ) : (
            // ⚠️ On le DIT quand la vidéo n'est pas encore en ligne, au lieu de
            // laisser un trou : la feuille, elle, est déjà là.
            <p className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-slate-600">
              La vidéo du geste arrive très bientôt sur la chaîne. La fiche, elle,
              est déjà prête à imprimer.
            </p>
          )}

          <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-5">
            <p className="font-bold text-slate-900">Et après ?</p>
            <p className="mt-1 text-sm leading-6 text-slate-700">
              Le coach de français CP propose des séries d&apos;exercices sur les
              sons et sur la copie.
            </p>
            <Link
              href="/coach-ia/francais?classe=cp"
              className="mt-3 inline-flex rounded-full bg-sky-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-sky-500"
            >
              Le coach de français CP →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
