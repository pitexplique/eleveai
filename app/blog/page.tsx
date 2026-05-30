"use client";

import Link from "next/link";
import { getAllBlogPosts, type BlogPost } from "@/data/blogPosts";

const AUDIENCE_LABELS: Record<string, string> = {
  eleves: "Élèves",
  profs: "Professeurs",
  parents: "Parents",
  admin: "Administration",
};

const AUDIENCE_COLORS: Record<string, string> = {
  eleves: "bg-emerald-100 text-emerald-800",
  profs: "bg-blue-100 text-blue-800",
  parents: "bg-amber-100 text-amber-800",
  admin: "bg-slate-100 text-slate-700",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-950">

      {/* FOND SVG */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="blog-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0FDF4" />
              <stop offset="50%" stopColor="#EFF6FF" />
              <stop offset="100%" stopColor="#FFFBEB" />
            </linearGradient>
            <radialGradient id="blog-g1" cx="15%" cy="20%" r="50%">
              <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#86EFAC" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="blog-g2" cx="85%" cy="15%" r="50%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
            </radialGradient>
            <filter id="blog-blur"><feGaussianBlur stdDeviation="25" /></filter>
          </defs>
          <rect width="1440" height="900" fill="url(#blog-bg)" />
          <rect width="1440" height="900" fill="url(#blog-g1)" />
          <rect width="1440" height="900" fill="url(#blog-g2)" />
          <circle cx="150" cy="160" r="120" fill="#4ADE80" opacity="0.15" filter="url(#blog-blur)" />
          <circle cx="1300" cy="150" r="140" fill="#60A5FA" opacity="0.15" filter="url(#blog-blur)" />
          <path d="M0 780 C360 730 720 780 1080 750 C1260 735 1380 750 1440 740 L1440 900 L0 900 Z"
            fill="white" opacity="0.5" />
        </svg>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">

        {/* HEADER */}
        <section className="mb-10 rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-800">
            📝 EleveAI · Blog
          </div>
          <h1 className="text-3xl font-black text-slate-950 sm:text-4xl">
            Maths, méthodes et progression
          </h1>
          <p className="mt-3 text-base font-semibold text-slate-600">
            Conseils concrets pour progresser en maths, préparer le brevet ou le bac, et comprendre les notions clés.
          </p>
        </section>

        {/* ARTICLES */}
        <div className="space-y-5">
          {posts.map((post: BlogPost) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/85 shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {post.audience && (
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${AUDIENCE_COLORS[post.audience] ?? "bg-slate-100 text-slate-700"}`}>
                      {AUDIENCE_LABELS[post.audience] ?? post.audience}
                    </span>
                  )}
                  {post.niveau && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {post.niveau}
                    </span>
                  )}
                  <span className="text-xs text-slate-400">{formatDate(post.date)}</span>
                </div>

                <h2 className="text-xl font-black text-slate-950 group-hover:text-emerald-700 transition">
                  {post.title}
                </h2>

                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                  {post.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-0.5 text-xs text-slate-600">
                      #{tag}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-sm font-black text-emerald-700 transition group-hover:translate-x-1">
                  Lire l&apos;article →
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-10 rounded-[2rem] border border-white/70 bg-white/75 p-6 text-center shadow-xl backdrop-blur">
          <p className="text-lg font-black text-slate-950">Prêt à t&apos;entraîner ?</p>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            Utilise les outils EleveAI pour mettre en pratique ce que tu viens de lire.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/parcours" className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow hover:bg-emerald-400">
              🛤️ Mon parcours de notions
            </Link>
            <Link href="/coach-brevet" className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50">
              📚 Coach Brevet
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
