"use client";

import { useState } from "react";
import Link from "next/link";

export default function DirectionClient() {
  const [password, setPassword] = useState("");
  const [accesOK, setAccesOK] = useState(false);
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    setLoading(true);

    try {
      const res = await fetch("/api/check-pilote-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.ok) {
        setAccesOK(true);
        setErreur("");
      } else {
        setErreur("Mot de passe incorrect.");
      }
    } catch {
      setErreur("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-slate-950 text-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">

        {/* HEADER */}
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/60 text-xs text-emerald-300 border border-slate-700">
            🔒 Accès réservé — Direction
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-300">
            Espace Direction EleveAI
          </h1>

          <p className="text-sm text-slate-300 max-w-xl">
            Réservé aux chefs d’établissement.  
            Vous trouverez ici l’offre pilote, les licences, les formations IA
          </p>
        </header>

        {/* FORMULAIRE PASSWORD */}
        {!accesOK && (
          <section className="bg-slate-900/80 border border-slate-700 p-6 rounded-xl space-y-4">
            <h2 className="text-lg font-semibold text-slate-100">
              Veuillez saisir le mot de passe
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 max-w-xs">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg bg-slate-950 border border-slate-600 px-3 py-2 text-sm text-slate-50"
              />

              {erreur && <p className="text-xs text-red-400">{erreur}</p>}

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-emerald-500 text-black rounded-lg font-semibold text-sm hover:bg-emerald-400 disabled:opacity-60"
              >
                {loading ? "Vérification..." : "✔️ Valider"}
              </button>
            </form>
          </section>
        )}

        {/* CONTENU PROTEGE */}
        {accesOK && (
          <section className="bg-slate-900/80 border border-emerald-500/30 p-6 rounded-xl space-y-6 shadow-lg">

            <p className="text-emerald-300 text-sm font-semibold">
              ✔️ Accès confirmé — Direction
            </p>

            <h2 className="text-xl font-bold text-emerald-200">
              Documents & outils confidentiels
            </h2>

            <div className="space-y-4">

              {/* LIEN OFFRE PILOTE */}
              <Link
                href="/formation/pilote"
                className="block p-4 rounded-lg bg-slate-950 border border-emerald-500/40 hover:bg-slate-900 transition"
              >
                <h3 className="text-emerald-300 font-semibold">
                  Offre Pilote & Formations IA
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Licences 1 490 € / 2 490 €, accompagnement, charte IA, sécurité.
                </p>
              </Link>

              {/* LIEN TABLEAU DE BORD */}
              <Link
                href="/direction/tableau-de-bord"
                className="block p-4 rounded-lg bg-slate-950 border border-slate-700 hover:bg-slate-900 transition"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-slate-300 font-semibold">
                    Tableau de bord de consommation
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-200 border border-sky-500/40">
                    Pré-version
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Suivi élèves / profs / vie scolaire + maîtrise du budget.
                </p>
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
