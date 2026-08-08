// /programme/<classe> — « tout ce qu'on apprend dans cette classe », compétence
// par compétence. Moteur SEO n°2 (inspiré des pages skills d'IXL) : du texte
// indexable généré depuis les banques tutor-v4, zéro contenu à produire.
// Façon IXL : le programme (matières) ┃ les annexes à côté (calcul rapide,
// dictée, défis, cahier). Les langues = un PONT vers les niveaux CECRL, sans
// dupliquer le contenu entre classes (SEO).

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PROGRAMME_CLASSES,
  getProgrammeClasse,
  getProgrammeMatiere,
  type ProgrammeMatiere,
} from "@/lib/programme";

const SITE_URL = "https://www.eleveai.fr";

export function generateStaticParams() {
  return PROGRAMME_CLASSES.map((c) => ({ classe: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ classe: string }>;
}): Promise<Metadata> {
  const { classe: slug } = await params;
  const classe = getProgrammeClasse(slug);
  if (!classe) return {};

  const matieres = classe.matieres
    .map((m) => getProgrammeMatiere(classe, m))
    .filter(Boolean) as ProgrammeMatiere[];
  const nbMicros = matieres.reduce((s, m) => s + m.nbMicros, 0);
  const nomsMatieres = matieres.map((m) => m.label.toLowerCase()).join(" et ");

  return {
    title: `Programme ${classe.label} : ${nomsMatieres} — ${nbMicros} compétences détaillées`,
    description: `Tout le programme ${classe.enClasse}, compétence par compétence (${nomsMatieres}), conforme aux programmes officiels — et un coach IA gratuit pour s'entraîner sur chacune. Par un professeur en poste, à La Réunion.`,
    alternates: { canonical: `${SITE_URL}/programme/${classe.slug}` },
    openGraph: {
      title: `Le programme ${classe.enClasse}, compétence par compétence — EleveAI`,
      description: `${nbMicros} compétences détaillées (${nomsMatieres}) et un coach IA gratuit pour s'entraîner sur chacune.`,
      url: `${SITE_URL}/programme/${classe.slug}`,
      type: "website",
      siteName: "EleveAI",
      locale: "fr_FR",
    },
  };
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ classe: string }>;
}) {
  const { classe: slug } = await params;
  const classe = getProgrammeClasse(slug);
  if (!classe) notFound();

  const matieres = classe.matieres
    .map((m) => getProgrammeMatiere(classe, m))
    .filter(Boolean) as ProgrammeMatiere[];
  const nbMicros = matieres.reduce((s, m) => s + m.nbMicros, 0);
  const aLangues = Boolean(classe.anglais || classe.espagnol || classe.ia);

  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800">
      {/* ── EN-TÊTE ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
          <nav className="text-sm text-slate-400">
            <Link href="/accueil" className="hover:text-teal-600">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-600">Programme {classe.label}</span>
          </nav>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Le programme {classe.enClasse},{" "}
            <span className="text-teal-600">compétence par compétence</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Tout ce qu&apos;on apprend {classe.enClasse}, conforme aux programmes
            officiels — et pour chaque compétence, un coach IA{" "}
            <span className="font-bold text-emerald-600">gratuit</span> pour
            s&apos;entraîner. Par un professeur en poste, à La Réunion.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {matieres.map((m) => (
              <span key={m.matiere} className="rounded-full bg-teal-50 px-3.5 py-1.5 text-sm font-bold text-teal-800">
                {m.label} · {m.nbMicros} compétences
              </span>
            ))}
            <span className="rounded-full bg-slate-100 px-3.5 py-1.5 text-sm font-bold text-slate-600">
              {nbMicros} compétences au total
            </span>
          </div>

          {/* Sous-nav façon IXL : le programme ┃ à côté */}
          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm font-bold">
            {matieres.map((m) => (
              <a key={m.matiere} href={`#${m.matiere}`} className="rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-teal-800 transition hover:bg-teal-100">
                {m.label}
              </a>
            ))}
            {aLangues && (
              <a href="#langues" className="rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-teal-800 transition hover:bg-teal-100">
                Langues &amp; IA
              </a>
            )}
            <span className="mx-1 hidden h-6 w-px bg-slate-300 sm:block" aria-hidden />
            <a href="#a-cote" className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-slate-500 transition hover:bg-slate-50">
              À côté : s&apos;entraîner autrement
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-10 px-5 py-10 sm:px-8">
        {/* ── LE PROGRAMME, MATIÈRE PAR MATIÈRE ─────────────────────────────── */}
        {matieres.map((m) => (
          <section key={m.matiere} id={m.matiere} className="scroll-mt-24">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-black text-slate-900">
                {m.matiere === "maths" ? "🧮" : "📚"} {m.label} {classe.enClasse}
              </h2>
              <Link
                href={m.coachHref}
                className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-black text-white shadow-md shadow-teal-500/25 transition hover:bg-teal-400"
              >
                S&apos;entraîner avec le coach — gratuit →
              </Link>
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {m.domaines.length} domaines · {m.nbNotions} notions · {m.nbMicros} compétences
            </p>

            <div className="mt-5 space-y-5">
              {m.domaines.map((d) => (
                <div key={d.boId} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                  <h3 className="text-lg font-black text-slate-900">{d.label}</h3>
                  <div className="mt-3 space-y-4">
                    {d.notions.map((n) => (
                      <div key={n.id}>
                        <p className="font-bold text-teal-800">{n.label}</p>
                        {n.micros.length > 0 && (
                          <ul className="mt-1.5 grid gap-x-6 gap-y-1 sm:grid-cols-2">
                            {n.micros.map((micro) => (
                              <li key={micro} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                                <span className="mt-0.5 shrink-0 text-emerald-500" aria-hidden>✓</span>
                                {micro}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* ── LE PONT LANGUES & IA (niveaux CECRL, pas de duplication) ──────── */}
        {aLangues && (
          <section id="langues" className="scroll-mt-24 rounded-2xl border border-sky-200 bg-sky-50 p-5 sm:p-6">
            <h2 className="text-xl font-black text-slate-900">🌍 Les langues &amp; l&apos;IA {classe.enClasse}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Les langues ne progressent pas par classe mais par{" "}
              <span className="font-bold">niveaux (A1 → B2)</span> — chacun
              avance à son rythme. Voici le niveau visé {classe.enClasse} :
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {classe.anglais && (
                <Link href="/coach-ia/english-maths" className="rounded-xl border border-sky-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
                  <p className="font-black text-slate-900">🗣️ Anglais</p>
                  <p className="mt-1 text-sm font-bold text-sky-700">Niveau visé : {classe.anglais}</p>
                </Link>
              )}
              {classe.espagnol && (
                <Link href="/coach-ia/espagnol" className="rounded-xl border border-sky-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
                  <p className="font-black text-slate-900">Español</p>
                  <p className="mt-1 text-sm font-bold text-sky-700">Niveau visé : {classe.espagnol}</p>
                </Link>
              )}
              {classe.ia && (
                <Link href="/coach-ia/ia" className="rounded-xl border border-sky-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
                  <p className="font-black text-slate-900">🤖 Culture IA</p>
                  <p className="mt-1 text-sm font-bold text-sky-700">Commence en {classe.ia}</p>
                </Link>
              )}
            </div>
          </section>
        )}

        {/* ── À CÔTÉ DU PROGRAMME (façon IXL : le transversal séparé) ───────── */}
        <section id="a-cote" className="scroll-mt-24">
          <h2 className="text-xl font-black text-slate-900">⚡ À côté du programme — s&apos;entraîner autrement</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {classe.calculRapide && (
              <Link href="/calcul-rapide" className="rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-2xl" aria-hidden>⚡</p>
                <p className="mt-1 font-black text-slate-900">Calcul rapide</p>
                <p className="text-sm text-slate-500">5 min d&apos;automatismes</p>
              </Link>
            )}
            <Link href="/dictee-du-jour" className="rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-2xl" aria-hidden>📜</p>
              <p className="mt-1 font-black text-slate-900">Dictée du jour</p>
              <p className="text-sm text-slate-500">5 mots, chaque matin</p>
            </Link>
            <Link href="/defis-du-jour" className="rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-2xl" aria-hidden>🎯</p>
              <p className="mt-1 font-black text-slate-900">Défi du jour</p>
              <p className="text-sm text-slate-500">Un problème inspiré de l&apos;actu</p>
            </Link>
            {classe.cahierSlug && (
              <Link href={`/cahier-vacances/${classe.cahierSlug}`} className="rounded-xl border border-amber-200 bg-amber-50 p-4 transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-2xl" aria-hidden>☀️</p>
                <p className="mt-1 font-black text-slate-900">Préparer l&apos;entrée {classe.enClasse}</p>
                <p className="text-sm text-slate-600">Le cahier de vacances à imprimer</p>
              </Link>
            )}
          </div>
        </section>

        {/* ── AUTRES CLASSES + RAPPEL GRATUIT ───────────────────────────────── */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 text-center sm:p-6">
          <p className="text-sm font-bold text-slate-500">Choisir une autre classe :</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {PROGRAMME_CLASSES.map((c) => (
              <Link
                key={c.slug}
                href={`/programme/${c.slug}`}
                className={`rounded-full px-3.5 py-1.5 text-sm font-black transition ${
                  c.slug === classe.slug
                    ? "bg-teal-500 text-white"
                    : "border border-slate-200 text-slate-600 hover:border-teal-300 hover:text-teal-700"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>
          <p className="mt-5 text-sm font-semibold text-slate-500">
            S&apos;entraîner sur tout ça est{" "}
            <span className="font-black text-emerald-600">gratuit</span> — ce qui
            se paie, c&apos;est l&apos;accompagnement dans la durée.{" "}
            <Link href="/tarifs" className="font-black text-teal-600 underline underline-offset-2 hover:text-teal-500">
              Voir les offres
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
