// app/atelier-IA/page.tsx
import Link from "next/link";

export default function AtelierIAPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 space-y-8">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-200">
              🧪 Atelier-IA
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 font-semibold text-slate-200">
              🔒 IA autorisée mais encadrée
            </span>
            <span className="text-slate-400">
              EleveAI — apprendre à juger et améliorer une réponse IA
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Atelier-IA : apprendre à penser avec l’IA
            <span className="block text-emerald-300">
              sans perdre le cadre scolaire
            </span>
          </h1>

          {/* ✅ ta phrase-clé */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-base sm:text-lg text-slate-100 leading-relaxed">
              <span className="text-emerald-300 font-semibold">
                Une réponse IA n’est jamais une fin :
              </span>{" "}
              elle doit être <span className="font-semibold">jugée</span> et{" "}
              <span className="font-semibold">améliorée</span>.
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Traces, esprit critique, corrections personnelles → pas “fait à la place”.
            </p>
          </div>

          <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
            L’Atelier-IA d’EleveAI sert à travailler des sujets concrets (eau, déchets,
            vivre ensemble, énergie, risques naturels, biodiversité…) en suivant une méthode
            simple : <b>question → réponse IA → vérification → amélioration → production personnelle</b>.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              href="/espace-atelier-IA"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              ⚙️ Ouvrir le générateur Atelier-IA
            </Link>

            <Link
              href="/accueil"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
            >
              🏠 Retour accueil
            </Link>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
          <h2 className="text-xl font-semibold text-slate-100">
            La méthode (simple et répétable)
          </h2>

          <div className="grid gap-3 md:grid-cols-4">
            {[
              { t: "1) Question", d: "On pose un problème réel + contraintes.", e: "❓" },
              { t: "2) Réponse IA", d: "L’IA propose une piste (pas une vérité).", e: "🤖" },
              { t: "3) Vérifier", d: "On cherche ce qui est faux, flou, incomplet.", e: "🔍" },
              { t: "4) Améliorer", d: "On produit une version personnelle solide.", e: "✅" },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <div className="text-2xl">{x.e}</div>
                <p className="mt-2 font-semibold text-slate-100">{x.t}</p>
                <p className="mt-1 text-sm text-slate-300 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <p className="text-sm text-slate-200 leading-relaxed">
              Le générateur <b>prépare le “bon prompt”</b> et te donne une structure de rendu
              (traces, justification, améliorations, critères).  
              Tu gardes toujours la main.
            </p>

            <div className="mt-4">
              <Link
                href="/espace-atelier-IA"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-900/10 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-900/20"
              >
                🧪 Générer un Atelier-IA maintenant →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

