"use client";

import Link from "next/link";
import React, { useState } from "react";

// ⚠️ `React.JSX.Element` ET NON `JSX.Element` (22/08/2026). React 19 a retiré
// le namespace GLOBAL `JSX` — il vit maintenant sous `React`. C'était la seule
// annotation de ce genre du dépôt, et la seule erreur de typage de la montée de
// version. Le type de retour ne sert d'ailleurs à rien ici : TypeScript le
// déduit. On le corrige plutôt que de le retirer, pour ne pas faire croire que
// la montée de React demandait de réécrire du code.
export default function PartenairesPage(): React.JSX.Element {
  const EMAIL = "contact@eleveai.fr";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur copie email :", err);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16 space-y-8">
          <div className="text-sm text-slate-400 flex items-center gap-2">
            <Link href="/" className="hover:text-emerald-300 transition">
              Accueil
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200">Partenaires & sponsors</span>
          </div>

          <header className="space-y-4">
            <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
              EleveAI · Projet éducatif à La Réunion
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Partenaires & sponsors
            </h1>

            <p className="max-w-2xl text-slate-300">
              EleveAI est un projet indépendant, conçu à La Réunion, qui défend une
              IA éducative responsable, au service réel des élèves et des enseignants.
            </p>
          </header>
        </div>
      </section>

      {/* CONTENU */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:py-12 space-y-8">
        {/* Philosophie */}
        <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/70 p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Notre philosophie : une IA qui fait réfléchir
          </h2>

          <p className="text-sm text-slate-300">
            EleveAI part d’un principe simple :{" "}
            <span className="font-medium text-slate-100">
              l’IA est utile si elle aide à comprendre, pas si elle fait à la place
            </span>
            .
          </p>

          <ul className="space-y-2 text-sm text-slate-200">
            <li>• poser des questions plutôt que donner des réponses toutes faites ;</li>
            <li>• encourager l’erreur comme étape d’apprentissage ;</li>
            <li>• préserver l’autonomie et la confiance des élèves.</li>
          </ul>

          <p className="text-sm text-slate-300">
            EleveAI s’inscrit dans une démarche d’{" "}
            <span className="font-medium text-slate-100">
              IA autorisée mais encadrée
            </span>
            , compatible avec le cadre scolaire et le rôle central de l’enseignant.
          </p>
        </div>

        {/* Contact */}
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/80 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-emerald-300">
            Devenir partenaire ou sponsor
          </h2>

          <p className="text-sm text-slate-300">
            Vous souhaitez soutenir EleveAI, proposer une collaboration ou financer
            une action pour les élèves de La Réunion ?
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center rounded-xl border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-500/20 transition"
            >
              {copied ? "✅ Copié !" : `📧 ${EMAIL}`}
            </button>

            <a
              href="https://wa.me/262692742958"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-green-500/60 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-200 hover:bg-green-500/20 transition"
            >
              💬 Contacter via WhatsApp
            </a>
          </div>

          <p className="text-xs text-slate-400">
            Réponse humaine · Pas de bot · Échange confidentiel
          </p>
        </div>
      </section>
    </main>
  );
}
