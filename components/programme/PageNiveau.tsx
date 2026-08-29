// La page d'un NIVEAU hors classe : /programme/anglais/a1, /programme/ia/college…
//
// ⛔ POURQUOI LE NIVEAU ET PAS LA NOTION. En maths une notion porte dix à vingt
// micro-compétences, d'où ses 442 pages. En anglais « Digits » en porte trois :
// soixante-dix pages de trois lignes seraient soixante-dix pages minces. Le
// niveau réunit de quoi lire — et c'est la requête réelle, « programme anglais
// A1 ». Voir la note du moteur dans lib/programme.ts.

import type { Metadata } from "next";
import Link from "next/link";
import {
  LABEL_MATIERE_HORS_CLASSE,
  LABEL_NIVEAU_LANGUE,
  NIVEAUX_HORS_CLASSE,
  type MatiereHorsClasse,
  type ProgrammeNiveau,
} from "@/lib/programme";

const COACH_HREF: Record<MatiereHorsClasse, string> = {
  anglais: "/coach-ia/english-maths",
  espagnol: "/coach-ia/espagnol",
  ia: "/coach-ia/ia",
};

const EMOJI: Record<MatiereHorsClasse, string> = {
  anglais: "🗣️",
  espagnol: "💬",
  ia: "🤖",
};

const SITE_URL = "https://www.eleveai.fr";

/* Les métadonnées des dix pages, écrites une fois.
   ⚠️ `openGraph` DÉCLARÉ ICI REMPLACE CELUI DU LAYOUT, il ne s'y ajoute pas —
   d'où le siteName et le locale répétés. C'est la règle de tout le site. */
export function metadataNiveau(
  matiere: MatiereHorsClasse,
  niveau: string,
  pack: ProgrammeNiveau
): Metadata {
  const label = LABEL_MATIERE_HORS_CLASSE[matiere];
  const labelNiveau = LABEL_NIVEAU_LANGUE[niveau] ?? niveau.toUpperCase();
  const url = `${SITE_URL}/programme/${matiere}/${niveau}`;
  const titre = `Programme ${label} ${labelNiveau.split(" — ")[0]} : ${pack.nbMicros} compétences détaillées`;
  const description = `Les ${pack.nbNotions} notions et ${pack.nbMicros} compétences du niveau ${labelNiveau.split(" — ")[0]} en ${label.toLowerCase()}, une par une — et un coach IA gratuit pour s'entraîner sur chacune.`;

  return {
    title: titre,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: titre,
      description,
      url,
      type: "website",
      siteName: "EleveAI",
      locale: "fr_FR",
    },
  };
}

export function PageNiveau({
  matiere,
  niveau,
  pack,
}: {
  matiere: MatiereHorsClasse;
  niveau: string;
  pack: ProgrammeNiveau;
}) {
  const label = LABEL_MATIERE_HORS_CLASSE[matiere];
  const labelNiveau = LABEL_NIVEAU_LANGUE[niveau] ?? niveau.toUpperCase();
  const voisins = NIVEAUX_HORS_CLASSE[matiere].filter((n) => n !== niveau);

  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
          <nav className="text-sm text-slate-400">
            <Link href="/accueil" className="hover:text-teal-600">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-600">{label} — {labelNiveau}</span>
          </nav>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
            {EMOJI[matiere]} {label}{" "}
            <span className="text-sky-600">{labelNiveau}</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            {pack.nbNotions} notions et {pack.nbMicros} compétences, une par une —
            et pour chacune un coach{" "}
            <span className="font-bold text-emerald-600">gratuit</span> pour
            s&apos;entraîner. Par un professeur en poste, à La Réunion.
          </p>

          {matiere !== "ia" && (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Une langue ne se range pas par année : on avance par niveaux, à son
              rythme. Un élève de 5e déjà bilingue n&apos;a aucune raison
              d&apos;attendre le B2, et un autre a le droit de consolider son A1.
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm font-bold">
            <Link
              href={COACH_HREF[matiere]}
              className="rounded-full bg-sky-500 px-5 py-2.5 text-white shadow-md shadow-sky-500/25 transition hover:bg-sky-400"
            >
              S&apos;entraîner — gratuit →
            </Link>
            {voisins.map((n) => (
              <Link
                key={n}
                href={`/programme/${matiere}/${n}`}
                className="rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sky-800 transition hover:bg-sky-100"
              >
                {LABEL_NIVEAU_LANGUE[n] ?? n.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <div className="space-y-4">
          {pack.notions.map((n) => (
            <div
              key={n.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <h2 className="text-lg font-black text-slate-900">{n.label}</h2>
              {n.micros.length > 0 && (
                <ul className="mt-2 grid gap-x-6 gap-y-1 sm:grid-cols-2">
                  {n.micros.map((micro) => (
                    <li
                      key={micro}
                      className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                    >
                      <span className="mt-0.5 shrink-0 text-sky-500" aria-hidden>
                        ✓
                      </span>
                      {micro}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm font-semibold text-slate-500">
          S&apos;entraîner sur tout ça est{" "}
          <span className="font-black text-emerald-600">gratuit</span> — ce qui
          se paie, c&apos;est l&apos;accompagnement dans la durée.{" "}
          <Link
            href="/tarifs"
            className="font-black text-teal-600 underline underline-offset-2 hover:text-teal-500"
          >
            Voir les offres
          </Link>
        </p>
      </div>
    </main>
  );
}
