// /pays/<pays> — le programme officiel d'un pays francophone, contenu par
// contenu, avec les compétences du coach qui le travaillent (matrice
// lib/programmes-pays). ⚠️ Version d'ÉTUDE (22/10/2026) : pas indexée, les
// correspondances restent à vérifier.
// Même habillage que la page du coach France (/coach-ia/maths) — Frédéric :
// « même css que coach France » : fond clair, une carte blanche par domaine,
// GO vert pour lancer la série.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Play } from "lucide-react";
import SelecteurPays from "@/components/SelecteurPays";
import { getMicroLabelMap, getNotionMicroMap, type Classe } from "@/lib/tutor-v4/catalog";
import { displayParamForClasse } from "@/lib/tutor-v4/displayMode";
import { PAYS, infoPays, programmesDuPays } from "@/lib/programmes-pays/pays";
import type { ContenuPays, Couverture, ProgrammePays, RenvoiMicro } from "@/lib/programmes-pays/types";

export function generateStaticParams() {
  return PAYS.map((p) => ({ pays: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pays: string }>;
}): Promise<Metadata> {
  const { pays } = await params;
  const info = infoPays(pays);
  if (!info) return {};
  return {
    title: `Programme de maths : ${info.nom}`,
    robots: { index: false, follow: false },
  };
}

const LIBELLE_CLASSE: Record<string, string> = {
  "6e": "6e", "5e": "5e", "4e": "4e", "3e": "3e",
  seconde: "2de", premiere: "1re", stmg: "Tle STMG",
};

const BADGE: Record<Couverture, { texte: string; cls: string }> = {
  complete: { texte: "Couvert", cls: "border-green-300 bg-green-50 text-green-800" },
  partielle: { texte: "En partie", cls: "border-orange-300 bg-orange-50 text-orange-700" },
  absente: { texte: "Bientôt", cls: "border-slate-300 bg-slate-50 text-slate-600" },
  "hors-coach": { texte: "Travail de classe", cls: "border-sky-200 bg-sky-50 text-sky-700" },
};

function lienMicro(r: RenvoiMicro): { href: string; label: string } | null {
  const classe = r.classe as Classe;
  const notion = Object.entries(getNotionMicroMap(classe)).find(([, ms]) => ms.includes(r.micro))?.[0];
  if (!notion) return null;
  return {
    href: `/coach/serie?classe=${classe}&matiere=maths&notion=${notion}&microId=${r.micro}&${displayParamForClasse(classe)}`,
    label: getMicroLabelMap(classe)[r.micro] ?? r.micro,
  };
}

function couverture(p: ProgrammePays): number {
  const travaillables = p.contenus.filter((c) => c.couverture !== "hors-coach");
  const points = travaillables.reduce(
    (s, c) => s + (c.couverture === "complete" ? 1 : c.couverture === "partielle" ? 0.5 : 0),
    0,
  );
  return Math.round((100 * points) / travaillables.length);
}

function Contenu({ c }: { c: ContenuPays }) {
  const badge = BADGE[c.couverture];
  return (
    <article>
      <h3 className="flex flex-wrap items-baseline gap-2 text-base font-bold text-slate-800">
        <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-bold text-slate-600">{c.code}</span>
        <span className="min-w-0 flex-1">{c.texte}</span>
        <span className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-semibold ${badge.cls}`}>
          {badge.texte}
        </span>
      </h3>
      {c.micros.length > 0 ? (
        <ul className="mt-2 space-y-1.5 pl-1">
          {c.micros.map((r) => {
            const lien = lienMicro(r);
            if (!lien) return null;
            return (
              <li key={`${r.classe}-${r.micro}`}>
                <Link
                  prefetch={false}
                  href={lien.href}
                  className="group flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-600 px-2.5 py-1 text-xs font-black tracking-wide text-white shadow-sm transition group-hover:bg-green-700">
                    GO
                    <Play className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
                  </span>
                  <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs font-bold text-slate-500">
                    {LIBELLE_CLASSE[r.classe] ?? r.classe}
                  </span>
                  <span>{lien.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </article>
  );
}

export default async function PaysPage({ params }: { params: Promise<{ pays: string }> }) {
  const { pays } = await params;
  const info = infoPays(pays);
  if (!info) notFound();
  const programmes = programmesDuPays(info.slug);

  return (
    <main className="min-h-screen bg-[#f5f8ef] text-slate-800">
      <section className="w-full px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-6 border-b border-slate-200 pb-5">
          <h1 className="mt-1 text-4xl font-bold tracking-tight text-teal-700 sm:text-5xl">
            Maths · {info.nom}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            Ton programme officiel, et les séries d&apos;exercices pour t&apos;entraîner sur chaque point&nbsp;!
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <SelecteurPays paysActuel={info.slug} />
            <span className="rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-800">
              Version d&apos;étude : correspondances en cours de vérification
            </span>
          </div>
        </header>

        {programmes.map((p) => {
          const domaines = [...new Set(p.contenus.map((c) => c.domaine))];
          return (
            <div key={p.niveau}>
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <h2 className="mr-2 text-2xl font-bold text-slate-800">
                  {p.niveau}
                  {p.codeCours ? <span className="ml-2 text-base font-semibold text-slate-500">{p.codeCours}</span> : null}
                </h2>
                <span className="rounded-full border border-orange-300 bg-white px-4 py-2 text-sm font-semibold text-orange-600">
                  {p.contenus.length} contenus
                </span>
                <span className="rounded-full border border-green-300 bg-white px-4 py-2 text-sm font-semibold text-green-700">
                  Couvert à {couverture(p)} %
                </span>
                <a
                  href={p.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Programme officiel
                </a>
              </div>

              <div className="gap-6 lg:columns-2">
                {domaines.map((d) => {
                  const contenus = p.contenus.filter((c) => c.domaine === d);
                  return (
                    <section key={d} className="mb-8 break-inside-avoid rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <h2 className="text-xl font-bold text-teal-700">{d}</h2>
                        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">{contenus.length}</span>
                      </div>
                      <div className="space-y-5">
                        {contenus.map((c) => (
                          <Contenu key={c.code} c={c} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
