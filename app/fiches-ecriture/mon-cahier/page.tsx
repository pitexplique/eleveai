// « Mon cahier d'écriture » — /fiches-ecriture/mon-cahier
//
// ⭐ 03/11/2026 — Frédéric, en 6e : un élève avec AESH, en attente d'ULIS, ne
// sait pas écrire ; on ne lui achète pas de cahier. Une page A4 par chiffre puis
// par lettre, ludique (Ti Margo, étoiles, smileys), à imprimer. Les pages sont
// faites par `python manim/fiche_ecriture_ulis.py` (mêmes tracés que les vidéos).
// La liste se lit sur le DISQUE : une lettre ajoutée apparait sans toucher ici.
import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mon cahier d'écriture à imprimer — chiffres et lettres en cursive | EleveAI",
  description:
    "Un cahier d'écriture gratuit à imprimer : les 10 chiffres puis les lettres en cursive, une page A4 chacun, avec la méthode en images, des étoiles et des smileys à colorier. Pour le CP, l'ULIS et les élèves qui apprennent à écrire.",
  alternates: { canonical: "https://www.eleveai.fr/fiches-ecriture/mon-cahier" },
};

const DOSSIER = "/fiches-ecriture/mon-cahier";

type Page = { glyphe: string; chiffre: boolean; base: string };

function pages(): Page[] {
  const dir = path.join(process.cwd(), "public", "fiches-ecriture", "mon-cahier");
  let fichiers: string[] = [];
  try {
    fichiers = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return fichiers
    .map((f) => /^cahier-ecriture-(chiffre|lettre)-(\w)\.pdf$/.exec(f))
    .filter((m): m is RegExpExecArray => Boolean(m))
    .map((m) => ({ glyphe: m[2], chiffre: m[1] === "chiffre", base: `cahier-ecriture-${m[1]}-${m[2]}` }))
    // Les chiffres d'abord, puis l'alphabet : l'ordre du cahier.
    .sort((a, b) => Number(b.chiffre) - Number(a.chiffre) || a.glyphe.localeCompare(b.glyphe));
}

const CONSEILS = [
  ["🐢", "Lentement d'abord", "La vitesse viendra seule. Un tracé lent et juste vaut mieux que dix rapides."],
  ["🟢", "Toujours le point vert", "On part du point vert et on suit la flèche orange : c'est le sens qui s'apprend, pas seulement la forme."],
  ["⏱️", "10 minutes par jour", "Une page par séance, pas plus. Mieux vaut tous les jours un peu que longtemps une fois."],
  ["⭐", "On colorie, on félicite", "Une étoile par ligne finie, un smiley à la fin. On ne barre pas : on recommence à côté."],
  ["🎬", "La vidéo avant la feuille", "Regarder d'abord le crayon tracer dans la vidéo, puis écrire. Le doigt peut tracer en l'air avec la vidéo."],
];

export default function MonCahier() {
  const liste = pages();
  const chiffres = liste.filter((p) => p.chiffre);
  const lettres = liste.filter((p) => !p.chiffre);

  const grille = (titre: string, items: Page[]) => (
    <section className="mt-10">
      <h2 className="text-xl font-black text-slate-900">
        {titre} <span className="text-sm font-bold text-slate-400">({items.length})</span>
      </h2>
      <div className="mt-3 grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-6">
        {items.map((p) => (
          <a
            key={p.base}
            href={`${DOSSIER}/${p.base}.pdf`}
            target="_blank"
            rel="noopener"
            className="group block rounded-xl bg-white p-2 shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-amber-400"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${DOSSIER}/${p.base}.png`}
              alt={`Page d'écriture : ${p.chiffre ? "le chiffre" : "la lettre"} ${p.glyphe}`}
              loading="lazy"
              className="aspect-[210/297] w-full rounded object-cover"
            />
            <span className="mt-1 block text-center text-2xl font-black text-slate-800 group-hover:text-amber-600">
              {p.glyphe}
            </span>
          </a>
        ))}
      </div>
    </section>
  );

  return (
    <main className="min-h-screen bg-[#fffaf0] text-slate-800">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <p className="text-sm font-bold uppercase tracking-wide text-amber-700">Fiches d&apos;écriture · à imprimer</p>
        <h1 className="mt-1 text-3xl font-black text-slate-900">Mon cahier d&apos;écriture</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-700">
          Les 10 chiffres, puis les lettres en cursive : une page A4 pour chacun. Ti Margo encourage, la méthode est
          en images, et on colorie une étoile à chaque ligne finie. Pensé pour les élèves qui apprennent à écrire —
          au CP, en ULIS, ou en 6e avec leur AESH.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`${DOSSIER}/mon-cahier-d-ecriture-complet.pdf`}
            target="_blank"
            rel="noopener"
            className="rounded-2xl bg-amber-500 px-6 py-4 text-lg font-black text-white shadow transition hover:bg-amber-600"
          >
            🖨️ Imprimer tout le cahier ({liste.length + 3} pages)
          </a>
          <Link
            href="/video?classe=cp"
            className="rounded-2xl border-2 border-amber-400 bg-white px-6 py-4 text-lg font-black text-amber-700 transition hover:bg-amber-50"
          >
            🎬 Les vidéos du geste
          </Link>
        </div>

        <section className="mt-10 rounded-2xl border-2 border-amber-200 bg-white p-5">
          <h2 className="text-xl font-black text-slate-900">Pour l&apos;adulte qui accompagne</h2>
          <ul className="mt-3 grid gap-4 sm:grid-cols-2">
            {CONSEILS.map(([icone, titre, texte]) => (
              <li key={titre} className="flex gap-3">
                <span className="text-3xl" aria-hidden="true">{icone}</span>
                <span>
                  <span className="block font-black text-slate-900">{titre}</span>
                  <span className="block text-sm text-slate-700">{texte}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ⭐ « Je veux qu'à la fin, elle se sente valorisée » (Frédéric, 03/11) :
            le cahier à son nom, le tableau de réussite, un diplôme par étape. */}
        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-900">Pour se sentir fier : la couverture et les diplômes</h2>
          <div className="mt-3 grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-6">
            {[
              ["cahier-ecriture-couverture", "Couverture + tableau de réussite"],
              ["cahier-ecriture-diplome-chiffres", "Diplôme des chiffres"],
              ["cahier-ecriture-diplome-lettres", "Diplôme des lettres"],
            ].map(([base, nom]) => (
              <a
                key={base}
                href={`${DOSSIER}/${base}.pdf`}
                target="_blank"
                rel="noopener"
                className="group block rounded-xl bg-white p-2 shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-amber-400"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${DOSSIER}/${base}.png`} alt={nom} loading="lazy" className="aspect-[210/297] w-full rounded object-cover" />
                <span className="mt-1 block text-center text-sm font-black text-slate-800 group-hover:text-amber-600">{nom}</span>
              </a>
            ))}
          </div>
        </section>

        {grille("Les chiffres", chiffres)}
        {grille("Les lettres", lettres)}

        <p className="mt-10 text-sm text-slate-500">
          Les lettres b, j, v, w, x, z et les pages « j&apos;écris des mots » arrivent : le cahier se complète au fil des
          vidéos.
        </p>
      </div>
    </main>
  );
}
