// app/blog/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getAllBlogPosts, type Audience, type BlogPost } from "@/data/blogPosts";

/** 🔥 Tes 10 phrases clés (SEO) -> liens internes */
const TOP_QUERIES: Array<{
  label: string;
  sub?: string;
  href: string;
  intent?: "profs" | "eleves" | "parents" | "college";
}> = [
  {
    label: "Prompt pédagogique",
    sub: "Comprendre la règle d’or EleveAI",
    href: "/blog/pourquoi-le-bon-prompt-change-tout",
    intent: "profs",
  },
  {
    label: "Prompts pour profs",
    sub: "Créer des supports, séances, évaluations",
    href: "/espace-profs",
    intent: "profs",
  },
  {
    label: "Prompts pour élèves",
    sub: "Réviser, s’entraîner, progresser",
    href: "/espace-eleves",
    intent: "eleves",
  },
  {
    label: "Prompts pour parents",
    sub: "Aider à la maison sans tricher",
    href: "/blog/parents-aider-enfant-college-avec-ia",
    intent: "parents",
  },
  {
    label: "IA au collège",
    sub: "Un cadre simple et rassurant",
    href: "/blog/ia-etablissement-cadre-clair",
    intent: "college",
  },
  {
    label: "Devoirs IA-friendly",
    sub: "Autoriser sous conditions + traces",
    href: "/blog/ia-etablissement-cadre-clair",
    intent: "college",
  },
  {
    label: "Document IA-friendly",
    sub: "Courriers, consignes, infos aux familles",
    href: "/blog/rediger-document-ia-friendly",
    intent: "profs",
  },
  {
    label: "DYS & documents scolaires",
    sub: "Rendre les infos plus lisibles",
    href: "/blog/parents-dys-documents-administratifs-scolaires",
    intent: "parents",
  },
  {
    label: "Réviser le brevet avec l’IA",
    sub: "Méthode guidée, sans triche",
    href: "/blog/reviser-brevet-maths-avec-eleveai-sans-tricher",
    intent: "eleves",
  },
  {
    label: "Évaluer avec l’IA (sans triche)",
    sub: "Variantes, critères, remédiation",
    href: "/blog/evaluer-eleves-avec-ia-sans-tricher",
    intent: "profs",
  },
];

function formatDateFR(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
}

function badgeAudience(a: Audience) {
  switch (a) {
    case "eleves":
      return {
        label: "Élèves",
        cls: "bg-emerald-100 text-emerald-900 border-emerald-200",
      };
    case "profs":
      return { label: "Profs", cls: "bg-sky-100 text-sky-900 border-sky-200" };
    case "parents":
      return {
        label: "Parents",
        cls: "bg-amber-100 text-amber-900 border-amber-200",
      };
    case "admin":
      return {
        label: "Établissement",
        cls: "bg-slate-200 text-slate-900 border-slate-300",
      };
  }
}

function intentChip(intent?: string) {
  if (!intent) return "border-slate-700 text-slate-200 bg-slate-900/30";
  if (intent === "profs")
    return "border-sky-500/40 text-sky-100 bg-sky-500/10";
  if (intent === "eleves")
    return "border-emerald-500/40 text-emerald-100 bg-emerald-500/10";
  if (intent === "parents")
    return "border-amber-400/40 text-amber-100 bg-amber-400/10";
  return "border-slate-500/40 text-slate-100 bg-slate-500/10";
}

function shortTags(tags: string[], max = 3) {
  return tags.slice(0, max);
}

function Section({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: BlogPost[];
}) {
  const list = items.slice(0, 6);
  if (list.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h2 className="text-xl font-extrabold">{title}</h2>
          <p className="text-sm text-slate-300">{subtitle}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">
                {formatDateFR(p.date)}
              </span>
              {p.niveau && (
                <span className="text-[11px] text-slate-500">• {p.niveau}</span>
              )}
            </div>

            <h3 className="mt-2 text-base font-bold text-slate-100 leading-snug">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-slate-300 line-clamp-3">
              {p.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {shortTags(p.tags, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-[11px] text-slate-200"
                >
                  #{t}
                </span>
              ))}
            </div>

            <div className="mt-5 text-sm font-semibold text-emerald-200">
              Lire <span aria-hidden>→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function BlogPage() {
  const all = useMemo(() => {
    const posts = getAllBlogPosts();
    return [...posts].sort((a, b) =>
      a.date < b.date ? 1 : a.date > b.date ? -1 : 0
    );
  }, []);

  const [filter, setFilter] = useState<Audience | "tous">("tous");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return all.filter((p) => {
      const okAud = filter === "tous" ? true : p.audience === filter;
      const okQ =
        !qq ||
        p.title.toLowerCase().includes(qq) ||
        p.description.toLowerCase().includes(qq) ||
        p.tags.join(" ").toLowerCase().includes(qq) ||
        (p.niveau ?? "").toLowerCase().includes(qq) ||
        (p.matiere ?? "").toLowerCase().includes(qq);
      return okAud && okQ;
    });
  }, [all, filter, q]);

  const featured = useMemo(() => filtered[0] ?? null, [filtered]);

  const byAudience = useMemo(() => {
    const bucket: Record<Audience, BlogPost[]> = {
      eleves: [],
      profs: [],
      parents: [],
      admin: [],
    };
    for (const p of filtered) bucket[p.audience].push(p);
    return bucket;
  }, [filtered]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HEADER */}
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1 text-[11px] font-semibold text-slate-200">
                📰 Blog EleveAI · Prompts & cadre IA
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Trouver le bon prompt (sans triche)
              </h1>
              <p className="text-sm text-slate-300 max-w-2xl">
                Une “Une” éditoriale orientée recherche : prompt pédagogique,
                prompts profs, prompts élèves, IA au collège…
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-2">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["tous", "Tous"],
                    ["eleves", "Élèves"],
                    ["profs", "Profs"],
                    ["parents", "Parents"],
                    ["admin", "Établissement"],
                  ] as const
                ).map(([k, label]) => {
                  const active = filter === (k as any);
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setFilter(k as any)}
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold border transition ${
                        active
                          ? "border-emerald-500 bg-emerald-500/15 text-emerald-200"
                          : "border-slate-700 bg-slate-900/30 text-slate-200 hover:bg-slate-900/60"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher dans les articles (brevet, DYS, anti-triche…)…"
                className="w-full sm:w-[340px] rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 space-y-10">
        {/* TOP QUERIES (SEO) */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold">
                Recherches fréquentes
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                10 expressions clés (SEO). Cliquer = page utile tout de suite.
              </p>
            </div>
            {/* ✅ BOUTON SUPPRIMÉ */}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {TOP_QUERIES.map((it) => (
              <Link
                key={it.label}
                href={it.href}
                className="group rounded-2xl border border-slate-800 bg-slate-950/40 p-4 hover:bg-slate-900/60 transition"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${intentChip(
                      it.intent
                    )}`}
                  >
                    {it.intent === "college" ? "collège" : it.intent}
                  </span>
                  <span className="text-slate-500 group-hover:text-emerald-200 text-sm">
                    →
                  </span>
                </div>
                <p className="mt-2 text-sm font-extrabold text-slate-100 leading-snug">
                  {it.label}
                </p>
                {it.sub && (
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                    {it.sub}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* UNE + DERNIERS */}
        {featured && (
          <section className="grid gap-6 lg:grid-cols-12">
            <Link
              href={`/blog/${featured.slug}`}
              className="lg:col-span-8 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950 p-6 sm:p-8 hover:border-emerald-600/60 transition"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-200">
                  À la Une
                </span>
                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${
                    badgeAudience(featured.audience).cls
                  }`}
                >
                  {badgeAudience(featured.audience).label}
                </span>
                <span className="text-[11px] text-slate-400">
                  {formatDateFR(featured.date)}
                </span>
                {featured.niveau && (
                  <span className="text-[11px] text-slate-300">
                    • {featured.niveau}
                  </span>
                )}
                {featured.matiere && (
                  <span className="text-[11px] text-slate-300">
                    • {featured.matiere}
                  </span>
                )}
              </div>

              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-tight">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                {featured.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {featured.tags.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 text-[11px] text-slate-200"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200">
                Lire l’article <span aria-hidden>→</span>
              </div>
            </Link>

            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-200">
                  Dernières publications
                </h3>
              </div>

              <div className="space-y-2">
                {filtered.slice(0, 5).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="block rounded-2xl border border-slate-800 bg-slate-900/30 p-4 hover:bg-slate-900/60 transition"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
                          badgeAudience(p.audience).cls
                        }`}
                      >
                        {badgeAudience(p.audience).label}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {formatDateFR(p.date)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-slate-100 leading-snug">
                      {p.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                      {p.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTIONS */}
        <Section
          title="🎒 Élèves"
          subtitle="Réviser, comprendre, progresser — sans tricher."
          items={byAudience.eleves}
        />
        <Section
          title="🧑‍🏫 Profs"
          subtitle="Prompts, méthodes, documents IA-friendly, cadre & anti-triche."
          items={byAudience.profs}
        />
        <Section
          title="👨‍👩‍👧 Parents"
          subtitle="Accompagner à la maison, DYS-friendly, devoirs sans conflits."
          items={byAudience.parents}
        />
        <Section
          title="🏫 Établissement"
          subtitle="Cadre IA, gouvernance, usages responsables."
          items={byAudience.admin}
        />
      </div>
    </main>
  );
}
