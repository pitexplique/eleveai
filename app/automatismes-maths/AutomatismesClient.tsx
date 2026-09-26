"use client";

// app/automatismes-maths/AutomatismesClient.tsx
//
// ⭐ 24/09/2026 — les automatismes, À PART DU COACH (Frédéric : « on fait comme
// parcours »). Même mise en page que l'Évaluation annuelle, mais une série
// chronométrée, une question par thème, et une question « à rédiger » où la
// maîtrise de la langue compte. Les séries se tirent au CLIC, jamais au rendu :
// un tirage au rendu serveur ne serait pas celui du navigateur.

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { CanvasRenderer } from "@/lib/canvas";
import { MarkdownMath } from "@/components/MarkdownMath";
import { ListenButton } from "@/app/coach/serie/ListenButton";
import { texteALire } from "@/lib/automatismes/lecture";
import {
  CLASSES_AUTOMATISMES,
  estCorrect,
  getNiveauAutomatismes,
  tirerApercu,
  tirerSerie,
  type AutoQuestionServie,
} from "@/lib/automatismes";

function mmss(secondes: number) {
  const s = Math.max(0, secondes);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function AutomatismesClient() {
  const [classe, setClasse] = useState("3e");
  const niveau = useMemo(() => getNiveauAutomatismes(classe), [classe]);
  /** Les thèmes cochés ; vide = « La totale », un thème différent par question. */
  const [themes, setThemes] = useState<string[]>([]);
  /** `?apercu=1` : un exemple de chaque générateur, corrigé, sans chrono. */
  const [apercu, setApercu] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const c = p.get("classe");
    if (c && getNiveauAutomatismes(c)) setClasse(c);
    if (p.get("apercu") === "1") setApercu(true);
  }, []);

  const [serie, setSerie] = useState<AutoQuestionServie[]>([]);
  const [reponses, setReponses] = useState<Record<number, string>>({});
  /** Rédaction : les critères cochés par l'élève, question par question. */
  const [coches, setCoches] = useState<Record<number, boolean[]>>({});
  const [valide, setValide] = useState(false);
  const [reste, setReste] = useState(0);
  const bilanRef = useRef<HTMLDivElement>(null);
  /** Le début des questions : c'est là qu'on emmène l'élève au lancement. */
  const questionsRef = useRef<HTMLDivElement>(null);

  const enCours = serie.length > 0 && !valide;

  // Le chrono : au DNB, la feuille est ramassée au bout de 20 minutes. À zéro,
  // la série se valide d'elle-même.
  useEffect(() => {
    if (!enCours) return;
    const id = window.setInterval(() => setReste((r) => r - 1), 1000);
    return () => window.clearInterval(id);
  }, [enCours]);

  useEffect(() => {
    if (enCours && reste <= 0) valider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reste, enCours]);

  function lancer() {
    if (!niveau) return;
    setSerie(apercu ? tirerApercu(niveau) : tirerSerie(niveau, themes));
    setReponses({});
    setCoches({});
    setValide(apercu);
    setReste(niveau.duree * 60);
    // ⛔ Était `window.scrollTo({ top: 0 })` : on remontait en haut de la page
    // au lieu d'arriver sur la question 1 (Frédéric, 24/09). Puis un
    // `setTimeout(…, 60)` : trop tôt — la série et ses formules n'étaient pas
    // encore rendues, la page ne bougeait pas (mesuré : défilement resté à 0).
    // ⭐ On lève un drapeau, et c'est l'effet ci-dessous, APRÈS le rendu de la
    // série, qui descend.
    aDefiler.current = true;
  }

  const aDefiler = useRef(false);
  useEffect(() => {
    if (!aDefiler.current || !serie.length) return;
    aDefiler.current = false;
    // Un tour plus tard : les formules KaTeX ont pris leur hauteur.
    // ⚠️ Pas `requestAnimationFrame` : il ne se déclenche pas quand l'onglet
    // n'est pas affiché (mesuré le 24/09 : aucun appel), un minuteur si.
    window.setTimeout(() =>
      questionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    0);
  }, [serie]);

  /** Arrête la série en cours et revient au choix — chrono et réponses à zéro.
   *  Frédéric, 24/09 : « une fois la série lancée, on ne peut plus changer de
   *  classe ; il faudrait un bouton qui remet les compteurs à zéro ». */
  function reinitialiser() {
    setSerie([]);
    setReponses({});
    setCoches({});
    setValide(false);
    setReste(0);
  }

  function valider() {
    setValide(true);
    setTimeout(() => bilanRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  function juste(q: AutoQuestionServie, i: number) {
    if (q.format === "redaction") {
      const c = coches[i] ?? [];
      return (q.criteres ?? []).length > 0 && (q.criteres ?? []).every((_, k) => c[k]);
    }
    return estCorrect(q, reponses[i] ?? "");
  }

  const score = serie.reduce((s, q, i) => s + (juste(q, i) ? 1 : 0), 0);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-sky-50 to-yellow-50 px-4 py-8 text-slate-950">
      <section className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200">
            <span>⚡</span>
            <span>EleveAI · Automatismes</span>
          </div>

          <h1 className="text-3xl font-black leading-tight text-slate-950 md:text-5xl">
            Tes automatismes de maths
          </h1>

          <p className="mt-3 max-w-3xl text-base font-semibold leading-relaxed text-slate-700 md:text-lg">
            Des questions courtes, de tête, sans calculatrice, sur tout le
            programme. Chaque série est nouvelle : tu peux en refaire une chaque
            semaine, et essayer celles d&apos;un autre niveau.
          </p>

          <div className="mt-6">
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-slate-700">
              1. Choisis ta classe
            </p>
            <div className="flex flex-wrap gap-3">
              {CLASSES_AUTOMATISMES.map((c) => {
                const pret = getNiveauAutomatismes(c.classe) !== null;
                return (
                  <button
                    key={c.classe}
                    type="button"
                    disabled={!pret}
                    onClick={() => {
                      setClasse(c.classe);
                      setThemes([]);
                      reinitialiser();
                    }}
                    className={[
                      "rounded-2xl px-5 py-3 text-sm font-black shadow-sm transition",
                      classe === c.classe
                        ? "bg-slate-950 text-white ring-4 ring-yellow-300"
                        : pret
                          ? "bg-white text-slate-800 ring-1 ring-slate-200 hover:-translate-y-0.5 hover:bg-emerald-50"
                          : "cursor-not-allowed bg-slate-100 text-slate-400 ring-1 ring-slate-200",
                    ].join(" ")}
                  >
                    {c.label}
                    {!pret ? <span className="ml-2 text-xs font-bold">bientôt</span> : null}
                  </button>
                );
              })}
            </div>
          </div>

          {niveau && !apercu ? (
            <div className="mt-6">
              <p className="mb-1 text-sm font-black uppercase tracking-wide text-slate-700">
                2. Choisis tes thèmes
              </p>
              <p className="mb-3 text-sm font-semibold text-slate-600">
                Un seul, plusieurs (clique pour cocher ou décocher), ou la totale.
              </p>
              <div className="flex flex-wrap gap-2">
                {/* ⭐ Frédéric, 24/09 : « la totale, ou un, mais aussi plusieurs ».
                    Chaque thème se coche et se décoche ; « La totale » vide la
                    sélection. `aria-pressed` dit l'état à un lecteur d'écran. */}
                <button
                  type="button"
                  aria-pressed={themes.length === 0}
                  onClick={() => {
                    setThemes([]);
                    reinitialiser();
                  }}
                  className={[
                    "rounded-2xl px-4 py-2 text-sm font-black shadow-sm transition",
                    themes.length === 0
                      ? "bg-emerald-700 text-white ring-4 ring-yellow-300"
                      : "bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-emerald-50",
                  ].join(" ")}
                >
                  🎲 La totale
                </button>
                {niveau.themes.map((t) => {
                  const coche = themes.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={coche}
                      onClick={() => {
                        setThemes((l) => (coche ? l.filter((x) => x !== t.id) : [...l, t.id]));
                        reinitialiser();
                      }}
                      className={[
                        "rounded-2xl px-4 py-2 text-sm font-black shadow-sm transition",
                        coche
                          ? "bg-emerald-700 text-white ring-2 ring-emerald-300"
                          : "bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-emerald-50",
                      ].join(" ")}
                    >
                      {coche ? "✓ " : ""}
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {niveau ? (
            <div className="mt-6 rounded-3xl bg-gradient-to-r from-emerald-100 via-sky-100 to-yellow-100 p-4 ring-1 ring-white/80">
              <p className="text-sm font-black text-slate-800">
                {apercu
                  ? `👀 Aperçu : trois exemples de chacun des ${niveau.themes.reduce((s, t) => s + t.generateurs.length, 0)} générateurs, déjà corrigés.`
                  : themes.length > 0
                    ? `🎯 ${niveau.nbQuestions ?? 10} questions ${themes.length === 1 ? "sur le thème choisi" : `réparties entre tes ${themes.length} thèmes`}, sans calculatrice.`
                    : `🎯 ${niveau.examen}. ${niveau.nbQuestions ?? niveau.themes.length} questions tirées parmi ${niveau.themes.length} thèmes${niveau.toujours?.includes("rediger") ? ", dont une à rédiger : c'est là que compte l'orthographe" : ""}.`}
              </p>
            </div>
          ) : null}

          {/* ⭐ 24/09/2026 — le livret PDF de la classe choisie (Frédéric :
              « inclus un bouton dans automatismes pour télécharger »). Il se
              génère à l'ouverture : 20 séries + corrigés, ~50 pages A4. */}
          {niveau && !enCours && !apercu ? (
            <a
              href={`/automatismes-maths/livret/${classe}`}
              target="_blank"
              rel="noopener"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-emerald-800 ring-2 ring-emerald-300 hover:bg-emerald-50"
            >
              📄 Télécharger le livret {niveau.label} en PDF (20 séries corrigées)
            </a>
          ) : null}

          {niveau && !enCours ? (
            <button
              type="button"
              onClick={lancer}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-4 text-base font-black text-slate-950 shadow-lg hover:from-emerald-300 hover:to-sky-300"
            >
              {serie.length > 0 ? "🔁 Nouvelle série" : `⚡ Lancer une série (${niveau.duree} min)`}
            </button>
          ) : null}
        </div>

        {/* ⭐ L'HORLOGE, AVEC TI MARGO (Frédéric, 24/09 : « rends plus vivante
            l'horloge avec Ti Margo »). Une barre qui se vide, une phrase qui
            change avec le temps, Ti Margo qui s'agite dans la dernière minute.
            C'est aussi le point d'arrivée du lancement (`questionsRef`) : la
            page s'arrête ICI, la question 1 juste dessous — « tu envoies la page
            au-dessus de "sans calculatrice" ». `scroll-mt-24` : l'en-tête du
            site ne doit pas la cacher. */}
        {enCours && niveau ? (() => {
          const total = niveau.duree * 60;
          const part = Math.max(0, Math.min(1, reste / total));
          const phrase =
            reste <= 60 ? "Dernière minute ! Relis tes réponses 👀"
            : part > 0.9 ? "C'est parti ! De tête, sans calculatrice 💪"
            : part > 0.55 ? "Tu avances bien, garde le rythme !"
            : part > 0.45 ? "Mi-temps ! Pas de panique, une question à la fois."
            : "Plus que quelques minutes, tu y es presque !";
          return (
            <div
              ref={questionsRef}
              className="sticky top-2 z-20 mb-4 scroll-mt-24 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/cahier-vacances/ti-margo.png"
                  alt="Ti Margo"
                  width={52}
                  height={52}
                  style={{ width: 52, height: 52 }}
                  className={["shrink-0 object-contain", reste <= 60 ? "animate-bounce" : "ti-margo-respire"].join(" ")}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-slate-800">{phrase}</p>
                  <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
                    <div
                      className={[
                        "h-full rounded-full transition-[width] duration-1000 ease-linear",
                        reste <= 60 ? "bg-red-500" : part > 0.5 ? "bg-emerald-500" : "bg-amber-400",
                      ].join(" ")}
                      style={{ width: `${part * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-500">⏱️ Sans calculatrice</p>
                </div>
                <span
                  className={[
                    "shrink-0 font-mono text-2xl font-black tabular-nums",
                    reste <= 60 ? "text-red-600" : "text-slate-900",
                  ].join(" ")}
                  aria-live="off"
                >
                  {mmss(reste)}
                </span>
              </div>
              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={lancer}
                  className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-black text-white hover:bg-emerald-500"
                >
                  🔁 Relancer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reinitialiser();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="rounded-xl bg-white px-3 py-1.5 text-xs font-black text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50"
                >
                  ✖ Arrêter
                </button>
              </div>
              <style>{`
                @keyframes ti-margo-respire { 0%,100% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-3px) rotate(-4deg) } }
                .ti-margo-respire { animation: ti-margo-respire 2.4s ease-in-out infinite; }
                @media (prefers-reduced-motion: reduce) { .ti-margo-respire, .animate-bounce { animation: none !important; } }
              `}</style>
            </div>
          );
        })() : null}

        {valide && serie.length > 0 ? (
          <div ref={bilanRef} className="mb-6 rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-2xl backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Bilan</p>
            <p className="mt-1 text-4xl font-black">
              {score} / {serie.length}
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {serie.map((q, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-2 text-sm font-bold ring-1 ring-slate-100">
                  <span>{q.themeLabel}</span>
                  <span>{juste(q, i) ? "🟢" : q.format === "redaction" ? "✍️ à cocher" : "🔴"}</span>
                </div>
              ))}
            </div>
            {serie.some((q) => q.format === "redaction") ? (
              <p className="mt-4 text-sm font-semibold text-slate-600">
                Pour la question à rédiger, compare ta phrase à la réponse modèle et
                coche ce que tu as bien fait : le point compte quand tout est coché.
              </p>
            ) : null}
            <p className="mt-2 text-sm font-semibold text-slate-600">
              ✍️ Les mots des maths s&apos;écrivent aussi sans faute :{" "}
              <Link href="/dictee" className="font-black text-emerald-700 underline">
                la dictée de maths
              </Link>{" "}
              (hypoténuse, réciproque, parallèles…).
            </p>
          </div>
        ) : null}

        {serie.length > 0 ? (
          <div className="space-y-5">
            {serie.map((q, i) => {
              const rep = reponses[i] ?? "";
              const ok = juste(q, i);
              return (
                <article
                  key={i}
                  className="rounded-[2rem] border border-white bg-white/90 p-5 text-slate-950 shadow-xl ring-1 ring-white/80"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                      Question {i + 1} / {serie.length} · {q.themeLabel}
                    </p>
                    {/* ⭐ Frédéric, 26/09 : les petits lisent mal, et « tu n'as pas
                        envie de lire dans un bus mais d'écouter » — l'énoncé et
                        ses propositions, les formules dites en français. */}
                    <ListenButton text={texteALire(q)} label="Écouter" />
                  </div>

                  <MarkdownMath className="mt-2 whitespace-pre-line text-lg font-semibold leading-relaxed">
                    {q.text}
                  </MarkdownMath>

                  {q.canvas ? (
                    <div className="mt-4 overflow-x-auto rounded-3xl bg-slate-50 p-3 ring-1 ring-slate-100">
                      <CanvasRenderer figure={q.canvas} />
                    </div>
                  ) : null}

                  {q.format === "qcm" && q.choices ? (
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {q.choices.map((choix, k) => (
                        <button
                          key={k}
                          type="button"
                          disabled={valide}
                          onClick={() => setReponses((r) => ({ ...r, [i]: choix }))}
                          className={[
                            "rounded-2xl border px-4 py-3 text-left font-bold transition",
                            rep === choix
                              ? "border-emerald-500 bg-emerald-100 text-emerald-900"
                              : "border-slate-200 bg-white hover:bg-emerald-50",
                            valide ? "cursor-not-allowed opacity-80" : "",
                          ].join(" ")}
                        >
                          <MarkdownMath inline>{choix}</MarkdownMath>
                        </button>
                      ))}
                    </div>
                  ) : q.format === "redaction" ? (
                    <textarea
                      value={rep}
                      disabled={valide}
                      onChange={(e) => setReponses((r) => ({ ...r, [i]: e.target.value }))}
                      rows={4}
                      spellCheck={false}
                      placeholder="Rédige ta réponse en phrases…"
                      className="mt-4 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-semibold outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 disabled:bg-slate-100"
                    />
                  ) : (
                    <input
                      value={rep}
                      disabled={valide}
                      onChange={(e) => setReponses((r) => ({ ...r, [i]: e.target.value }))}
                      placeholder="Ta réponse…"
                      inputMode="text"
                      className="mt-4 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-bold outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 disabled:bg-slate-100"
                    />
                  )}

                  {valide ? (
                    q.format === "redaction" ? (
                      <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 p-4">
                        <p className="text-sm font-black text-sky-900">Réponse modèle</p>
                        <MarkdownMath className="mt-2 text-sm leading-relaxed text-slate-800">
                          {q.modele ?? ""}
                        </MarkdownMath>
                        <p className="mt-4 text-sm font-black text-sky-900">Coche ce que ta réponse contient :</p>
                        <div className="mt-2 space-y-2">
                          {(q.criteres ?? []).map((c, k) => (
                            <label key={k} className="flex cursor-pointer items-start gap-3 text-sm font-semibold text-slate-800">
                              <input
                                type="checkbox"
                                className="mt-1 h-4 w-4"
                                checked={coches[i]?.[k] ?? false}
                                onChange={(e) =>
                                  setCoches((prev) => {
                                    const l = [...(prev[i] ?? [])];
                                    l[k] = e.target.checked;
                                    return { ...prev, [i]: l };
                                  })
                                }
                              />
                              <span>{c}</span>
                            </label>
                          ))}
                        </div>
                        <MarkdownMath className="mt-3 text-sm leading-relaxed text-slate-600">
                          {q.explanation}
                        </MarkdownMath>
                      </div>
                    ) : (
                      <div className={["mt-4 rounded-2xl border p-4", ok ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"].join(" ")}>
                        <p className={["text-sm font-black", ok ? "text-emerald-700" : "text-red-700"].join(" ")}>
                          {ok ? "✅ Bonne réponse" : "❌ Réponse à corriger"}
                        </p>
                        {!ok ? (
                          <>
                            <p className="mt-2 text-sm font-bold text-slate-700">
                              Ta réponse : {rep ? <MarkdownMath inline>{rep}</MarkdownMath> : "aucune"}
                            </p>
                            <p className="mt-1 text-sm font-bold text-emerald-700">
                              Bonne réponse : <MarkdownMath inline>{q.expected[0] ?? ""}</MarkdownMath>
                            </p>
                          </>
                        ) : null}
                        <MarkdownMath className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                          {q.explanation}
                        </MarkdownMath>
                      </div>
                    )
                  ) : null}
                </article>
              );
            })}

            <div className="sticky bottom-4 rounded-[2rem] border border-white/70 bg-white/90 p-4 shadow-2xl backdrop-blur-xl">
              {!valide ? (
                <button
                  type="button"
                  onClick={valider}
                  className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-4 text-base font-black text-slate-950 shadow-lg hover:from-emerald-300 hover:to-sky-300"
                >
                  🏁 Valider
                </button>
              ) : (
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={lancer}
                    className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-slate-800"
                  >
                    🔁 Nouvelle série
                  </button>
                  <Link
                    href="/coach/serie"
                    className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-800 ring-1 ring-slate-200 hover:bg-emerald-50"
                  >
                    Retravailler une notion avec le coach
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
