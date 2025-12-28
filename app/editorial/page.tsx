// app/editorial/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getAllBlogPosts, type Audience, type BlogPost } from "@/data/blogPosts";

function formatDateFR(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-FR", { year: "numeric", month: "short", day: "2-digit" });
  } catch {
    return iso;
  }
}

function pickFeatured(posts: BlogPost[]) {
  // règle simple : le plus récent (ou fallback)
  return posts[0] ?? null;
}

function badgeAudience(a: Audience) {
  switch (a) {
    case "eleves":
      return { label: "Élèves", cls: "bg-emerald-100 text-emerald-900 border-emerald-200" };
    case "profs":
      return { label: "Profs", cls: "bg-sky-100 text-sky-900 border-sky-200" };
    case "parents":
      return { label: "Parents", cls: "bg-amber-100 text-amber-900 border-amber-200" };
    case "admin":
      return { label: "Établissement", cls: "bg-slate-200 text-slate-900 border-slate-300" };
  }
}

function shortTags(tags: string[], max = 3) {
  return tags.slice(0, max);
}

export default function EditorialPage() {
  const all = useMemo(() => {
    const posts = getAllBlogPosts();
    // tri décroissant par date ISO
    return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  }, []);

  // filtres simples “type Lemonde.fr”
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

  const featured = useMemo(() => pickFeatured(filtered), [filtered]);

  // regroupements par audience
  const byAudience = useMemo(() => {
    const bucket: Record<Audience, BlogPost[]> = { eleves: [], profs: [], parents: [], admin: [] };
    for (const p of filtered) bucket[p.audience].push(p);
    return bucket;
  }, [filtered]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* top bar */}
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1 text-[11px] font-semibold text-slate-200">
                📰 Une éditoriale · EleveAI
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Les meilleurs prompts pédagogiques, au bon endroit.
              </h1>
              <p className="text-sm text-slate-300 max-w-2xl">
                Une vitrine “journal” : élèves, profs, parents, établissement. Chaque carte renvoie vers{" "}
                <span className="font-semibold text-slate-100">/blog/slug</span>.
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
                placeholder="Rechercher (brevet, IA-friendly, anti-triche, DYS…)…"
                className="w-full sm:w-[340px] rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* contenu */}
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-10">
        {/* HERO / Article à la Une */}
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
                <span className="text-[11px] text-slate-400">{formatDateFR(featured.date)}</span>
                {featured.niveau && (
                  <span className="text-[11px] text-slate-300">• {featured.niveau}</span>
                )}
                {featured.matiere && (
                  <span className="text-[11px] text-slate-300">• {featured.matiere}</span>
                )}
              </div>

              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-tight">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                {featured.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {shortTags(featured.tags, 5).map((t) => (
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

            {/* “Brèves” / derniers articles */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-200">Dernières publications</h3>
                <Link href="/blog" className="text-xs font-semibold text-slate-300 hover:text-emerald-200">
                  Voir tout →
                </Link>
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
                      <span className="text-[10px] text-slate-500">{formatDateFR(p.date)}</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-slate-100 leading-snug">
                      {p.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-400 line-clamp-2">{p.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Sections par audience */}
        <Section
          title="🎒 Élèves"
          subtitle="Réviser, comprendre, progresser — sans tricher."
          items={byAudience.eleves}
        />
        <Section
          title="🧑‍🏫 Profs"
          subtitle="Prompts, méthodes, documents IA-friendly, cadre et anti-triche."
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

        {/* CTA bas */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-extrabold">Tu veux une page “Prompts” en premier ?</h3>
              <p className="text-sm text-slate-300 mt-1">
                On peut faire un accueil qui mène directement vers : “Prompts pédagogiques”, “Prompts profs”, “Prompts élèves”.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/prompts"
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Aller aux prompts
              </Link>
              <Link
                href="/blog"
                className="rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900/70"
              >
                Tous les articles
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
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
        <Link href="/blog" className="text-xs font-semibold text-slate-300 hover:text-emerald-200">
          Voir tout →
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">{formatDateFR(p.date)}</span>
              {p.niveau && <span className="text-[11px] text-slate-500">• {p.niveau}</span>}
            </div>

            <h3 className="mt-2 text-base font-bold text-slate-100 leading-snug">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-slate-300 line-clamp-3">{p.description}</p>

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
