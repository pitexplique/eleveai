// « Mon cahier d'écriture » — /fiches-ecriture/mon-cahier
//
// ⭐ 03/11/2026 — Frédéric, en 6e : un élève avec AESH, en attente d'ULIS, ne sait
// pas écrire ; on ne lui achète pas de cahier.
// ⭐ 06/11/2026 — il l'a donné à deux élèves d'ULIS : « pour une fois ils étaient
// fiers ». Nouvelle philosophie : deux cahiers (lettres, nombres), 5 paliers où
// l'écriture rapetisse, des médailles et un diplôme à chaque marche.
// Les pages sont faites par `python manim/fiche_ecriture_paliers.py` (mêmes tracés
// que les vidéos), qui écrit aussi le sommaire lu ici : rien à toucher à l'ajout
// d'une lettre.
import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mon cahier d'écriture à imprimer — lettres et nombres, 5 paliers | EleveAI",
  description:
    "Deux cahiers d'écriture gratuits à imprimer, les lettres et les nombres : 5 paliers où l'écriture rapetisse peu à peu, de la lettre géante à la phrase, du chiffre aux grands nombres. Médailles et diplômes à gagner. Pour le CP, l'ULIS et les élèves qui apprennent à écrire.",
  alternates: { canonical: "https://www.eleveai.fr/fiches-ecriture/mon-cahier" },
};

const DOSSIER = "/fiches-ecriture/mon-cahier-paliers";

type Cahier = "lettres" | "nombres";
type PageCahier = { cahier: Cahier; palier: number; nom: string; base: string };
type Sommaire = {
  mm: Record<string, number>;
  noms: Record<Cahier, Record<string, string>>;
  pages: PageCahier[];
};

function lireSommaire(): Sommaire | null {
  try {
    const f = path.join(process.cwd(), "public", "fiches-ecriture", "mon-cahier-paliers", "sommaire.json");
    return JSON.parse(fs.readFileSync(f, "utf-8")) as Sommaire;
  } catch {
    return null;
  }
}

const PRESENTATION: Record<Cahier, { titre: string; chemin: string }> = {
  lettres: { titre: "Les lettres", chemin: "Les lettres, puis les syllabes, les mots et les phrases." },
  nombres: { titre: "Les nombres", chemin: "Les chiffres, puis les dizaines, les centaines et les grands nombres." },
};

const CONSEILS = [
  ["🏆", "La réussite d'abord", "On repasse avant d'écrire seul. Chaque page peut se finir, et chaque palier se termine par un diplôme et une médaille."],
  ["🪜", "Une marche à la fois", "On ne change de palier que lorsque le précédent est facile. Rien ne presse : on peut refaire une page autant de fois qu'on veut."],
  ["🟢", "Toujours le point vert", "On part du point vert : c'est le sens du geste qui s'apprend, pas seulement la forme."],
  ["⏱️", "10 minutes par jour", "Une page par séance, pas plus. Mieux vaut tous les jours un peu que longtemps une fois."],
  ["⭐", "On colorie, on félicite", "Une étoile par ligne finie. On ne barre pas : on recommence à côté."],
  ["🎬", "La vidéo avant la feuille", "Regarder d'abord le crayon tracer dans la vidéo, puis écrire. Le doigt peut tracer en l'air avec la vidéo."],
];

function Vignette({ page }: { page: PageCahier }) {
  return (
    <a
      href={`${DOSSIER}/${page.base}.pdf`}
      target="_blank"
      rel="noopener"
      className="group block rounded-xl bg-white p-2 shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-amber-400"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${DOSSIER}/${page.base}.png`}
        alt={`Page du cahier : ${page.nom}`}
        loading="lazy"
        className="aspect-[210/297] w-full rounded object-cover"
      />
      <span className="mt-1 block text-center text-xs font-bold leading-tight text-slate-700 group-hover:text-amber-700">
        {page.nom}
      </span>
    </a>
  );
}

export default function MonCahier() {
  const sommaire = lireSommaire();
  const pages = sommaire?.pages ?? [];
  const cahiers: Cahier[] = ["lettres", "nombres"];

  return (
    <main className="min-h-screen bg-[#fffaf0] text-slate-800">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <p className="text-sm font-bold uppercase tracking-wide text-amber-700">Fiches d&apos;écriture · à imprimer</p>
        <h1 className="mt-1 text-3xl font-black text-slate-900">Mon cahier d&apos;écriture</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-700">
          Deux cahiers gratuits, les lettres et les nombres. L&apos;écriture commence très grande, puis elle rapetisse
          marche après marche, jusqu&apos;à la taille d&apos;un cahier ordinaire. Pensés pour que chaque élève réussisse
          et en soit fier : au CP, en ULIS, ou en 6e avec son AESH.
        </p>

        {/* Les deux cahiers entiers : ce que la plupart des visiteurs viennent chercher. */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          {cahiers.map((c) => {
            const liste = pages.filter((p) => p.cahier === c);
            return (
              <div key={c} className="flex gap-4 rounded-2xl border-2 border-amber-200 bg-white p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${DOSSIER}/couverture-${c}.png`}
                  alt={`Page de garde du cahier : ${PRESENTATION[c].titre}`}
                  className="aspect-[210/297] w-24 shrink-0 rounded object-cover ring-1 ring-slate-200 sm:w-28"
                />
                <div className="min-w-0">
                  <h2 className="text-xl font-black text-slate-900">{PRESENTATION[c].titre}</h2>
                  <p className="mt-1 text-sm text-slate-700">{PRESENTATION[c].chemin}</p>
                  <a
                    href={`${DOSSIER}/mon-cahier-${c}.pdf`}
                    target="_blank"
                    rel="noopener"
                    className="mt-3 inline-block rounded-xl bg-amber-500 px-4 py-3 font-black text-white shadow transition hover:bg-amber-600"
                  >
                    🖨️ Imprimer le cahier ({liste.length} pages)
                  </a>
                </div>
              </div>
            );
          })}
        </section>

        <div className="mt-4">
          <Link
            href="/video?classe=cp"
            className="inline-block rounded-xl border-2 border-amber-400 bg-white px-4 py-3 font-black text-amber-700 transition hover:bg-amber-50"
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

        {cahiers.map((c) => (
          <section key={c} className="mt-12">
            <h2 className="text-2xl font-black text-slate-900">{PRESENTATION[c].titre}, page par page</h2>

            <h3 className="mt-5 text-lg font-black text-slate-900">Pour commencer</h3>
            <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-6">
              {pages.filter((p) => p.cahier === c && p.palier === 0).map((p) => <Vignette key={p.base} page={p} />)}
            </div>

            {[1, 2, 3, 4, 5].map((n) => {
              const liste = pages.filter((p) => p.cahier === c && p.palier === n);
              return (
                <div key={n} className="mt-7">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="text-lg font-black text-slate-900">
                      Palier {n} · {sommaire?.noms[c][String(n)]}{" "}
                      <span className="text-sm font-bold text-slate-500">
                        (lignes de {sommaire?.mm[String(n)]} mm)
                      </span>
                    </h3>
                    <a
                      href={`${DOSSIER}/${c}-palier-${n}.pdf`}
                      target="_blank"
                      rel="noopener"
                      className="rounded-lg bg-amber-100 px-3 py-1.5 text-sm font-black text-amber-800 transition hover:bg-amber-200"
                    >
                      🖨️ Imprimer ce palier ({liste.length} pages)
                    </a>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-6">
                    {liste.map((p) => <Vignette key={p.base} page={p} />)}
                  </div>
                </div>
              );
            })}
          </section>
        ))}

        <p className="mt-10 text-sm text-slate-600">
          Les lettres b, j, v, w, x et z arrivent : le cahier se complète au fil des vidéos. Un élève a déjà commencé le
          premier cahier ? Il reste disponible :{" "}
          <a
            href="/fiches-ecriture/mon-cahier/mon-cahier-d-ecriture-complet.pdf"
            target="_blank"
            rel="noopener"
            className="font-bold text-amber-700 underline"
          >
            l&apos;ancien cahier, en très grandes lettres
          </a>
          .
        </p>
      </div>
    </main>
  );
}
