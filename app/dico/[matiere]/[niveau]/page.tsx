"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  getDico,
  reponseCorrecte,
  FAMILLES_DICO,
  GESTES_DICO,
  ORDRE_FAMILLES,
  type FamilleDico,
  type MotDico,
} from "@/lib/dico";

type Phase = "question" | "feedback";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function DicoPlayerPage() {
  const params = useParams();
  const matiere = (params?.matiere as string) ?? "maths";
  const niveau = (params?.niveau as string) ?? "6e";
  const dico = getDico(matiere, niveau);

  // Filtre par famille de mots ("toutes" = tout le dico)
  const [famille, setFamille] = useState<FamilleDico | "toutes">("toutes");

  const deck = useMemo(() => {
    if (!dico) return [];
    const mots = famille === "toutes" ? dico.mots : dico.mots.filter((m) => m.famille === famille);
    return shuffle(mots);
    // on re-mélange quand on change de famille
  }, [dico, famille]);

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [saisie, setSaisie] = useState("");
  const [menuChoix, setMenuChoix] = useState("");
  const [dernierJuste, setDernierJuste] = useState(false);
  const [score, setScore] = useState(0);
  const [fait, setFait] = useState(0);

  const mot: MotDico | undefined = deck[index];

  // Mélange des propositions, recalculé à chaque mot
  const propositions = useMemo(() => {
    if (!mot) return [];
    if (mot.defi.geste === "clic" || mot.defi.geste === "association") return shuffle(mot.defi.choix);
    if (mot.defi.geste === "menu") return shuffle(mot.defi.options);
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mot?.id]);

  if (!dico) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f5f8ff] px-6 text-center text-slate-800">
        <h1 className="text-2xl font-black">Dico introuvable</h1>
        <p className="text-slate-600">
          Le dico « {matiere} {niveau} » n&apos;existe pas encore.
        </p>
        <Link href="/dico" className="rounded-full bg-cyan-600 px-5 py-3 text-sm font-black text-white">
          Voir les dicos disponibles
        </Link>
      </main>
    );
  }

  const total = deck.length;
  const termine = phase === "question" && index >= total && total > 0;

  function reinitialiserCarte() {
    setSaisie("");
    setMenuChoix("");
    setDernierJuste(false);
  }

  function changerFamille(f: FamilleDico | "toutes") {
    setFamille(f);
    setIndex(0);
    setScore(0);
    setFait(0);
    setPhase("question");
    reinitialiserCarte();
  }

  function valider(reponse: string) {
    if (!mot) return;
    const juste =
      mot.defi.geste === "saisie"
        ? reponseCorrecte(reponse, mot.defi.reponse)
        : reponse === mot.defi.bonne;
    setDernierJuste(juste);
    if (juste) setScore((s) => s + 1);
    setFait((f) => f + 1);
    setPhase("feedback");
  }

  function suivant() {
    setIndex((i) => i + 1);
    setPhase("question");
    reinitialiserCarte();
  }

  function recommencer() {
    changerFamille(famille);
  }

  // Bonne réponse à afficher dans le retour
  const bonneReponse = mot
    ? mot.defi.geste === "saisie"
      ? mot.defi.reponse
      : mot.defi.bonne
    : "";

  const geste = mot ? GESTES_DICO[mot.defi.geste] : null;
  const familleMeta = mot ? FAMILLES_DICO[mot.famille] : null;

  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800">
      {/* En-tête */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-5 py-5 sm:px-8">
          <Link href="/dico" className="text-xs font-bold text-slate-400 hover:text-slate-600">
            ← Tous les dicos
          </Link>
          <h1 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{dico.titre}</h1>
          <p className="text-sm font-semibold text-slate-500">{dico.sousTitre}</p>

          {/* Filtres familles */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => changerFamille("toutes")}
              className={[
                "rounded-full border px-3 py-1.5 text-xs font-bold transition",
                famille === "toutes"
                  ? "border-cyan-600 bg-cyan-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              Tout ({dico.mots.length})
            </button>
            {ORDRE_FAMILLES.map((f) => {
              const n = dico.mots.filter((m) => m.famille === f).length;
              if (n === 0) return null;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => changerFamille(f)}
                  className={[
                    "rounded-full border px-3 py-1.5 text-xs font-bold transition",
                    famille === f
                      ? "border-cyan-600 bg-cyan-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {FAMILLES_DICO[f].emoji} {FAMILLES_DICO[f].label} ({n})
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
        {/* Barre de progression */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-cyan-500 transition-all"
              style={{ width: `${total ? (Math.min(index, total) / total) * 100 : 0}%` }}
            />
          </div>
          <span className="shrink-0 text-sm font-black text-slate-500">
            ⭐ {score}/{fait}
          </span>
        </div>

        {termine ? (
          // ─────────── Écran de fin ───────────
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="text-5xl">🎉</div>
            <h2 className="mt-3 text-2xl font-black text-slate-900">Dico terminé !</h2>
            <p className="mt-2 text-slate-600">
              Tu as réussi <strong>{score}</strong> mots sur <strong>{total}</strong>.
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Tu as appris le vocabulaire <em>et</em> entraîné tes gestes d&apos;examen.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={recommencer}
                className="rounded-full bg-cyan-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-500"
              >
                Recommencer
              </button>
              <Link
                href="/dico"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
              >
                Autre dico
              </Link>
            </div>
          </div>
        ) : mot ? (
          // ─────────── Carte de mot ───────────
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {/* Badges famille + geste */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {familleMeta && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  {familleMeta.emoji} {familleMeta.label}
                </span>
              )}
              {geste && (
                <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 ring-1 ring-cyan-200">
                  {geste.emoji} {geste.label}
                </span>
              )}
              <span className="ml-auto text-xs font-bold text-slate-400">
                {Math.min(index + 1, total)}/{total}
              </span>
            </div>

            <p className="text-xs font-black uppercase tracking-wide text-cyan-600">{geste?.consigne}</p>
            <h2 className="mt-1 text-xl font-black leading-snug text-slate-900 sm:text-2xl">
              {mot.defi.question}
            </h2>

            {/* Zone de réponse selon le geste */}
            <div className="mt-6">
              {/* SAISIE — clavier */}
              {mot.defi.geste === "saisie" && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (phase === "question") valider(saisie);
                  }}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <input
                    autoFocus
                    type="text"
                    value={saisie}
                    onChange={(e) => setSaisie(e.target.value)}
                    disabled={phase === "feedback"}
                    placeholder="Tape ici…"
                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-lg font-bold text-slate-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 disabled:bg-slate-50"
                  />
                  {phase === "question" && (
                    <button
                      type="submit"
                      className="shrink-0 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-black text-white transition hover:bg-cyan-500"
                    >
                      Valider
                    </button>
                  )}
                </form>
              )}

              {/* MENU déroulant */}
              {mot.defi.geste === "menu" && (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <select
                    value={menuChoix}
                    onChange={(e) => setMenuChoix(e.target.value)}
                    disabled={phase === "feedback"}
                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-lg font-bold text-slate-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 disabled:bg-slate-50"
                  >
                    <option value="">— Choisis une réponse —</option>
                    {propositions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {phase === "question" && (
                    <button
                      type="button"
                      onClick={() => menuChoix && valider(menuChoix)}
                      disabled={!menuChoix}
                      className="shrink-0 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-black text-white transition hover:bg-cyan-500 disabled:opacity-40"
                    >
                      Valider
                    </button>
                  )}
                </div>
              )}

              {/* CLIC / ASSOCIATION — boutons */}
              {(mot.defi.geste === "clic" || mot.defi.geste === "association") && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {propositions.map((choix) => {
                    const estBonne = choix === bonneReponse;
                    const montrer = phase === "feedback";
                    return (
                      <button
                        key={choix}
                        type="button"
                        onClick={() => phase === "question" && valider(choix)}
                        disabled={phase === "feedback"}
                        className={[
                          "rounded-xl border-2 px-4 py-3 text-left text-base font-bold transition",
                          montrer && estBonne
                            ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                            : "border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:bg-cyan-50 disabled:hover:border-slate-200 disabled:hover:bg-white",
                        ].join(" ")}
                      >
                        {choix}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Retour + définition (on apprend le mot après avoir répondu) */}
            {phase === "feedback" && (
              <div className="mt-6 space-y-3">
                <div
                  className={[
                    "rounded-2xl px-4 py-3 text-sm font-bold",
                    dernierJuste
                      ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                      : "bg-rose-50 text-rose-800 ring-1 ring-rose-200",
                  ].join(" ")}
                >
                  {dernierJuste ? "✅ Bravo, c'est juste !" : `❌ La bonne réponse était : ${bonneReponse}`}
                  {!dernierJuste && mot.defi.geste === "saisie" && mot.defi.aide && (
                    <span className="mt-1 block font-semibold text-rose-700">💡 {mot.defi.aide}</span>
                  )}
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                    📖 {mot.mot}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{mot.definition}</p>
                  {mot.exemple && (
                    <p className="mt-1 text-sm italic text-slate-500">{mot.exemple}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={suivant}
                  className="w-full rounded-xl bg-cyan-600 px-6 py-3 text-sm font-black text-white transition hover:bg-cyan-500"
                >
                  {index + 1 >= total ? "Voir mon score" : "Mot suivant →"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            Aucun mot dans cette famille.
          </div>
        )}
      </section>
    </main>
  );
}
