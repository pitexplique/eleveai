"use client";

// ─── Flashcards dérivées de la fiche ───────────────────────────────────────────
// Aucune carte n'est écrite à la main : tout est DÉRIVÉ des blocs de la fiche
// (définition, formule, propriétés, méthode, usages, pièges, à retenir,
// exemples, entraînement). C'est le pilier « rappel actif » — et la porte
// d'entrée de l'espacement (« Ta journée ») plus tard.

import { useEffect, useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import type { FicheCoursData } from "@/lib/fiches/types";

type Carte = { categorie: string; recto: string; verso: string };

export function deriverCartes(fiche: FicheCoursData): Carte[] {
  const cartes: Carte[] = [];

  cartes.push({
    categorie: "Définition",
    recto: `Énonce le théorème : ${fiche.titre.toLowerCase()}.`,
    verso: fiche.definition.texte,
  });

  cartes.push({
    categorie: "Formule",
    recto: `${fiche.formule.contexte} : quelle est la formule à connaître par cœur ?`,
    verso: `${fiche.formule.expression} — ${fiche.formule.legende}`,
  });

  fiche.proprietes.forEach((p) => {
    cartes.push({
      categorie: "Propriété",
      recto: `« ${p.titre} » : que dit-elle et à quoi sert-elle ?`,
      verso: p.texte,
    });
  });

  fiche.methode.forEach((m, i) => {
    cartes.push({
      categorie: "Méthode",
      recto: `Étape ${i + 1} de la méthode : « ${m.titre} ». Que fait-on ?`,
      verso: m.texte,
    });
  });

  fiche.usages.forEach((u) => {
    cartes.push({
      categorie: "Situation",
      recto: `${u.titre} : quelle démarche ?`,
      verso: u.detail,
    });
  });

  fiche.pieges.forEach((piege, i) => {
    cartes.push({
      categorie: "Piège",
      recto: `⚠️ Piège classique n°${i + 1} sur ${fiche.pieges.length} : essaie de le retrouver.`,
      verso: piege,
    });
  });

  fiche.aRetenir.forEach((point, i) => {
    cartes.push({
      categorie: "À retenir",
      recto: `🎯 Point à retenir n°${i + 1} sur ${fiche.aRetenir.length} : essaie de le réciter.`,
      verso: point,
    });
  });

  fiche.exemples.forEach((ex) => {
    cartes.push({
      categorie: "Exemple",
      recto: `${ex.donnees} ${ex.question}`,
      verso: ex.solution,
    });
  });

  fiche.entrainement.forEach((exo) => {
    cartes.push({
      categorie: "Entraînement",
      recto: exo.question,
      verso: exo.correction,
    });
  });

  return cartes;
}

function melanger<T>(tableau: T[]): T[] {
  const copie = [...tableau];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

const COULEURS_CATEGORIE: Record<string, string> = {
  Définition: "bg-sky-100 text-sky-700",
  Formule: "bg-indigo-100 text-indigo-700",
  Propriété: "bg-violet-100 text-violet-700",
  Méthode: "bg-cyan-100 text-cyan-700",
  Situation: "bg-teal-100 text-teal-700",
  Piège: "bg-amber-100 text-amber-700",
  "À retenir": "bg-emerald-100 text-emerald-700",
  Exemple: "bg-slate-100 text-slate-700",
  Entraînement: "bg-pink-100 text-pink-700",
};

export default function Flashcards({ fiche }: { fiche: FicheCoursData }) {
  const total = deriverCartes(fiche).length;

  // Le paquet est mélangé APRÈS le montage (jamais au rendu serveur,
  // sinon l'hydratation casse — piège connu des parcours).
  const [file, setFile] = useState<Carte[]>([]);
  const [montee, setMontee] = useState(false);
  const [verso, setVerso] = useState(false);
  const [sues, setSues] = useState(0);

  useEffect(() => {
    setFile(melanger(deriverCartes(fiche)));
    setMontee(true);
    setVerso(false);
    setSues(0);
  }, [fiche]);

  const carte = file[0] ?? null;

  function repondre(jeSavais: boolean) {
    setVerso(false);
    setFile((f) => {
      if (!f.length) return f;
      // « À revoir » : la carte repart au fond du paquet.
      return jeSavais ? f.slice(1) : [...f.slice(1), f[0]];
    });
    if (jeSavais) setSues((s) => s + 1);
  }

  function recommencer() {
    setFile(melanger(deriverCartes(fiche)));
    setVerso(false);
    setSues(0);
  }

  if (!montee) return null;

  return (
    <section className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-black text-slate-900">
            🃏 Flashcards — {fiche.titre}
          </h2>
          <span className="text-sm font-bold text-slate-500">
            {sues}/{total} sues
          </span>
        </div>

        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={sues}
        >
          <div
            className="h-full rounded-full bg-emerald-400 transition-all"
            style={{ width: `${total ? (sues / total) * 100 : 0}%` }}
          />
        </div>

        {carte ? (
          <>
            <button
              type="button"
              onClick={() => setVerso((v) => !v)}
              className="mt-6 flex min-h-56 w-full flex-col items-start justify-between gap-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 text-left transition hover:border-sky-300 hover:bg-sky-50/40"
            >
              <span
                className={`rounded-full px-3 py-1 text-xs font-black uppercase ${
                  COULEURS_CATEGORIE[carte.categorie] ?? "bg-slate-100 text-slate-600"
                }`}
              >
                {carte.categorie}
              </span>
              <span className="text-lg font-bold leading-7 text-slate-900">
                {verso ? carte.verso : carte.recto}
              </span>
              <span className="text-xs font-bold uppercase text-slate-400">
                {verso ? "Réponse — clique pour revoir la question" : "Clique pour voir la réponse"}
              </span>
            </button>

            {verso ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => repondre(false)}
                  className="rounded-full border border-amber-300 bg-amber-50 px-5 py-3 text-sm font-black text-amber-800 transition hover:bg-amber-100"
                >
                  🔁 À revoir (elle reviendra)
                </button>
                <button
                  type="button"
                  onClick={() => repondre(true)}
                  className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                >
                  ✅ Je savais
                </button>
              </div>
            ) : (
              <p className="mt-5 text-center text-sm font-bold text-slate-500">
                Réponds dans ta tête, puis retourne la carte.
              </p>
            )}

            <p className="mt-4 text-center text-xs font-bold text-slate-400">
              {file.length} carte{file.length > 1 ? "s" : ""} restante
              {file.length > 1 ? "s" : ""} dans le paquet
            </p>
          </>
        ) : (
          <div className="mt-8 text-center">
            <p className="text-4xl">🎉</p>
            <p className="mt-3 text-xl font-black text-slate-900">
              Paquet terminé : {total}/{total} !
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Reviens demain pour ancrer la notion — c&apos;est en espaçant
              qu&apos;on retient.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={recommencer}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                Recommencer
              </button>
              <a
                href={fiche.coachHref}
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
              >
                <Sparkles className="h-4 w-4" />
                M&apos;entraîner avec le Coach IA
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
