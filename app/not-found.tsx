// app/not-found.tsx
// Page 404 personnalisée : Next.js renvoie automatiquement le statut HTTP 404
// pour toute route non trouvée qui atteint ce fichier. Indispensable pour que
// Google identifie clairement les pages inexistantes (soft-404 évité).
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable (404)",
  description:
    "Cette page n'existe pas ou a été déplacée. Retrouvez le coach, les parcours et les entraînements d'EleveAI depuis l'accueil.",
  // On demande explicitement aux moteurs de ne pas indexer la 404.
  robots: { index: false, follow: true },
};

const PORTES = [
  { href: "/accueil", emoji: "🏠", titre: "Accueil", sous: "Toutes les portes d'entrée" },
  { href: "/coach-maths-ia", emoji: "🧭", titre: "Coach Maths IA", sous: "Comprendre pas à pas" },
  { href: "/parcours", emoji: "🚀", titre: "Parcours", sous: "Progresser à ton rythme" },
  { href: "/carte", emoji: "🗺️", titre: "Les maths en vrai · 974", sous: "Le tour de l'île" },
];

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-16 text-center">
      <p className="bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400 bg-clip-text text-7xl font-black tracking-tight text-transparent sm:text-8xl">
        404
      </p>

      <h1 className="mt-4 text-2xl font-bold text-slate-100 sm:text-3xl">
        Cette page a pris la clé des champs
      </h1>

      <p className="mt-3 max-w-md text-slate-400">
        La page que tu cherches n'existe pas ou a été déplacée. Pas de panique —
        toutes les portes d'EleveAI sont juste ici.
      </p>

      <Link
        href="/accueil"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
      >
        ← Revenir à l'accueil
      </Link>

      <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
        {PORTES.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-left transition hover:border-slate-600 hover:bg-slate-900"
          >
            <span className="text-2xl" aria-hidden>
              {p.emoji}
            </span>
            <span>
              <span className="block font-semibold text-slate-100">{p.titre}</span>
              <span className="block text-sm text-slate-400">{p.sous}</span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
