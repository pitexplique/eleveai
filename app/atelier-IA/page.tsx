// app/atelier-IA/page.tsx
import Link from "next/link";

const ateliers = [
  {
    slug: "atelier-ia-entre-deux-6e",
    titre: "Atelier IA – Imagine & Apprends",
    niveau: "« Entre deux – 6e »",
    resume:
      "Un atelier pour découvrir l’intelligence artificielle de manière ludique, sécurisée et encadrée, pour les élèves de 6e.",
    badge: "Nouveau",
  },
];

export default function AteliersPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* EN-TÊTE BIEN VISIBLE */}
      <section className="mb-10 rounded-3xl border border-sky-600/70 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-5 py-6 shadow-lg">
        <p className="mb-2 inline-flex items-center rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-300">
          Ateliers IA au collège
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-50 mb-3">
          Ateliers IA au collège
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-slate-100">
          Des ateliers pédagogiques pour aider les élèves à{" "}
          <span className="font-semibold">comprendre</span>,{" "}
          <span className="font-semibold">utiliser</span> et{" "}
          <span className="font-semibold">questionner</span> l&apos;intelligence
          artificielle, dans un cadre{" "}
          <span className="font-semibold">sécurisé</span> et{" "}
          <span className="font-semibold">bienveillant</span>.
        </p>
      </section>

      {/* LISTE DES ATELIERS */}
      <section aria-label="Liste des ateliers IA">
        <div className="grid gap-6 md:grid-cols-2">
          {ateliers.map((atelier) => (
            <Link
              key={atelier.slug}
              href={`/atelier-IA/${atelier.slug}`}
              className="group block rounded-2xl border border-slate-700 bg-slate-900/90 p-5 shadow-md transition hover:border-sky-500 hover:bg-slate-900 hover:shadow-sky-500/20"
            >
              <div className="mb-2 flex items-center gap-2">
                {atelier.badge && (
                  <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                    {atelier.badge}
                  </span>
                )}
                <span className="text-[11px] uppercase tracking-wide text-slate-400">
                  Atelier IA
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">
                {atelier.titre}
              </h2>
              <p className="text-sm text-sky-300 mb-3">{atelier.niveau}</p>

              <p className="text-sm text-slate-200 mb-4">
                {atelier.resume}
              </p>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Durée : 3 semaines · Séances de 50 minutes</span>
                <span className="inline-flex items-center gap-1 text-sky-300 group-hover:text-sky-200">
                  Voir le détail
                  <span aria-hidden>↗</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Message si d'autres ateliers arrivent */}
        <p className="mt-6 text-xs text-slate-400">
          D&apos;autres ateliers (5e, 4e, club médias & IA…) pourront être
          ajoutés ici au fur et à mesure.
        </p>
      </section>
    </main>
  );
}
