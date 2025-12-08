"use client";

import { useState } from "react";
import Link from "next/link";

export default function DefisPereNoelPage() {
  const [texte, setTexte] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleWhatsApp = () => {
    if (!texte.trim()) {
      setFeedback("Écris d’abord ton défi ou ta liste d’objectifs 😉");
      return;
    }

    // Numéro Réunion au format international pour WhatsApp
    const phoneInternational = "262692742958"; // correspond à 06 92 74 29 58
    const url = `https://wa.me/${phoneInternational}?text=${encodeURIComponent(
      texte
    )}`;

    window.open(url, "_blank");
    setFeedback("WhatsApp ouvert : vérifie le message puis envoie-le 👍");
  };

  const handleCopyForDiscord = async () => {
    if (!texte.trim()) {
      setFeedback("Rien à copier : écris d’abord ton message 😊");
      return;
    }

    if (!navigator.clipboard) {
      setFeedback("Impossible de copier automatiquement : sélectionne le texte à la main.");
      return;
    }

    try {
      await navigator.clipboard.writeText(texte);
      setFeedback("Texte copié ! Colle-le dans Discord (serveur ou message privé).");
    } catch {
      setFeedback("Petit souci avec le presse-papiers : sélectionne et copie à la main.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* FOND NOËL */}
      <section className="relative border-b border-slate-800 bg-gradient-to-b from-red-900/80 via-slate-950 to-emerald-900/80 overflow-hidden">
        {/* halos lumineux rouges / verts */}
        <div className="pointer-events-none absolute -top-24 -left-10 h-64 w-64 rounded-full bg-red-600/40 blur-3xl" />
        <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-emerald-500/35 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-amber-400/30 blur-2xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-12 lg:py-16 grid gap-10 lg:grid-cols-2 items-start">
          {/* Colonne gauche : texte / explication */}
          <div>
            <p className="inline-flex items-center rounded-full border border-emerald-400/70 bg-emerald-500/15 px-3 py-1 text-[11px] sm:text-xs font-medium uppercase tracking-wide text-emerald-200 mb-4">
              Défis IA Père Noël · Liste d’objectifs pour améliorer ton monde
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="block text-slate-50">
                Écris tes défis IA Père Noël
              </span>
              <span className="block text-emerald-300 mt-1">
                et envoie ton prompt à Frédéric.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-200 max-w-xl">
              Imagine que tu fais ta <strong>liste de vœux</strong>… mais pas
              seulement pour des cadeaux : pour rendre{" "}
              <strong>ta classe</strong>, ta <strong>famille</strong>, ton{" "}
              <strong>établissement</strong> un peu meilleurs.
            </p>

            <p className="mt-3 text-sm text-slate-300 max-w-xl">
              1. Tu écris une liste d’objectifs ou un prompt. <br />
              2. Tu l’envoies sur <strong>WhatsApp</strong> à{" "}
              <strong>06 92 74 29 58</strong> ou tu le colles sur{" "}
              <strong>Discord</strong>. <br />
              3. Frédéric pourra te répondre, l’améliorer ou t’aider à le
              transformer en vrai défi.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-100 hover:border-emerald-400 hover:text-emerald-300 transition"
              >
                ⬅️ Retour à l’accueil EleveAI
              </Link>
            </div>

            <p className="mt-4 text-[11px] sm:text-xs text-slate-400 max-w-md">
              Usage responsable de l’IA : ici, on cherche des idées{" "}
              <strong>bienveillantes</strong>, <strong>respectueuses</strong> et{" "}
              <strong>réalistes</strong>. Pas de triche, pas de moquerie.
            </p>
          </div>

          {/* Colonne droite : zone de saisie + boutons */}
          <div className="lg:justify-self-end w-full">
            <div className="rounded-3xl border border-emerald-500/50 bg-slate-950/80 p-5 sm:p-6 shadow-xl shadow-black/40 space-y-4">
              <h2 className="text-lg font-semibold text-slate-50">
                ✍️ Ta liste d’objectifs / ton prompt
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Tu peux, par exemple :
                <br />
                • lister ce que tu veux changer
                <br />
                • expliquer ton idée de défi
                <br />
                • demander à l’IA un plan d’action
              </p>

              <textarea
                className="mt-2 w-full min-h-[160px] rounded-2xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400"
                placeholder={
                  "Exemples :\n- Je voudrais ré organiser mon jardin, ma chambre, la maison.\n- J’aimerais inventer un objet utile\n- On pourrait imaginer une action solidaire pour Noël..."
                }
                value={texte}
                onChange={(e) => {
                  setTexte(e.target.value);
                  setFeedback(null);
                }}
              />

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition disabled:opacity-50"
                >
                  📲 Envoyer sur WhatsApp (06 92 74 29 58)
                </button>

                <button
                  type="button"
                  onClick={handleCopyForDiscord}
                  className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-100 hover:border-emerald-400 hover:text-emerald-300 transition"
                >
                  💬 Copier pour Discord
                </button>
              </div>

              {feedback && (
                <p className="text-[11px] sm:text-xs text-emerald-300">
                  {feedback}
                </p>
              )}

              <p className="text-[11px] sm:text-xs text-slate-500">
                Astuce : tu peux aussi refaire ton message après la réponse de
                Frédéric, pour créer un <strong>prompt encore plus précis</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Petits exemples de défis (version jeu) */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <h2 className="text-lg sm:text-2xl font-semibold mb-4">
          🎯 Idées de défis pour t’inspirer
        </h2>

        <div className="grid gap-4 md:grid-cols-3 text-sm">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <p className="text-xs font-semibold text-emerald-300 mb-1">
              Défi “3 gentillesses”
            </p>
            <p className="text-slate-200 text-xs sm:text-sm">
              Pendant 24 heures, tu fais au moins 3 petites gentillesses
              (classe, maison, établissement) et tu notes ce que cela change.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <p className="text-xs font-semibold text-emerald-300 mb-1">
              Défi “Classe plus zen”
            </p>
            <p className="text-slate-200 text-xs sm:text-sm">
              Tu cherches avec l’IA et ton prof 2 ou 3 idées simples pour
              que le début de cours soit plus calme (rituel, signal, organisation…).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <p className="text-xs font-semibold text-emerald-300 mb-1">
              Défi “Soirée sans écran”
            </p>
            <p className="text-slate-200 text-xs sm:text-sm">
              Tu organises avec l’aide de l’IA une petite soirée sans écran
              en famille : jeux, discussion, cuisine, lecture…
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

