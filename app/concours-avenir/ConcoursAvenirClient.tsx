"use client";

// Épreuve blanche du Concours Avenir — mathématiques.
//
// Volontairement très différent du coach : ici on ne corrige pas au fil de
// l'eau, on ne félicite pas, on ne montre pas d'indice. C'est une épreuve.
// Le coach entraîne ; cette page met en situation.
//
// Les trois mécaniques du concours réel, que l'entraînement classique ne
// travaille pas :
//   - le barème +1 / -1 : répondre au hasard coûte des points ;
//   - 60 questions proposées, 45 comptées : il faut choisir ses combats ;
//   - 1h30 : deux minutes par question.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MarkdownMath } from "@/components/MarkdownMath";
import {
  BAREME,
  DUREE_SECONDES,
  NB_QUESTIONS,
  NB_REPONSES_COMPTEES,
  SECTIONS,
  type EpreuveAvenir,
  type QuestionAvenir,
} from "@/lib/concours-avenir/config";

const CLE_VUES = "avenir:questions-vues";
const LETTRES = ["a", "b", "c", "d"];

type Etape = "briefing" | "epreuve" | "resultat";

function lireVues(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const brut = window.localStorage.getItem(CLE_VUES);
    const liste = brut ? JSON.parse(brut) : [];
    return Array.isArray(liste) ? liste.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function memoriserVues(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    const fusion = Array.from(new Set([...lireVues(), ...ids]));
    window.localStorage.setItem(CLE_VUES, JSON.stringify(fusion.slice(-2000)));
  } catch {
    // Stockage indisponible (navigation privée) : sans conséquence.
  }
}

function formaterDuree(secondes: number): string {
  const s = Math.max(0, secondes);
  const min = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export default function ConcoursAvenirClient() {
  const [etape, setEtape] = useState<Etape>("briefing");
  const [epreuve, setEpreuve] = useState<EpreuveAvenir | null>(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  const [index, setIndex] = useState(0);
  /** questionId -> index de la proposition validée. */
  const [reponses, setReponses] = useState<Record<string, number>>({});
  /** questions explicitement passées (l'élève a décidé de ne pas répondre). */
  const [passees, setPassees] = useState<Record<string, true>>({});
  const [selection, setSelection] = useState<number | null>(null);
  const [tempsRestant, setTempsRestant] = useState(DUREE_SECONDES);

  // Mémoïsé : sans cela, le tableau serait recréé à chaque tic du chronomètre
  // et forcerait le recalcul du bilan une fois par seconde.
  const questions = useMemo(() => epreuve?.questions ?? [], [epreuve]);
  const question: QuestionAvenir | undefined = questions[index];
  const nbReponses = Object.keys(reponses).length;
  const quotaAtteint = nbReponses >= NB_REPONSES_COMPTEES;

  // ---------------------------------------------------------------- chrono
  const terminerRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (etape !== "epreuve") return;
    const tick = window.setInterval(() => {
      setTempsRestant((t) => {
        if (t <= 1) {
          window.clearInterval(tick);
          terminerRef.current();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => window.clearInterval(tick);
  }, [etape]);

  // ------------------------------------------------------------- démarrage
  const demarrer = useCallback(async () => {
    setChargement(true);
    setErreur(null);
    try {
      const reponse = await fetch("/api/concours-avenir/epreuve", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ dejaVus: lireVues() }),
      });
      if (!reponse.ok) throw new Error("tirage impossible");
      const data: EpreuveAvenir = await reponse.json();
      if (!data.questions?.length) throw new Error("épreuve vide");

      memoriserVues(data.questions.map((q) => q.id));
      setEpreuve(data);
      setReponses({});
      setPassees({});
      setSelection(null);
      setIndex(0);
      setTempsRestant(DUREE_SECONDES);
      setEtape("epreuve");
    } catch {
      setErreur("Le sujet n'a pas pu être tiré. Réessaie dans un instant.");
    } finally {
      setChargement(false);
    }
  }, []);

  // ------------------------------------------------------------- réponses
  const allerA = useCallback(
    (i: number) => {
      setIndex(Math.max(0, Math.min(questions.length - 1, i)));
      setSelection(null);
    },
    [questions.length]
  );

  const valider = useCallback(() => {
    if (!question || selection === null || quotaAtteint) return;
    setReponses((r) => ({ ...r, [question.id]: selection }));
    setPassees((p) => {
      const copie = { ...p };
      delete copie[question.id];
      return copie;
    });
    allerA(index + 1);
  }, [question, selection, quotaAtteint, index, allerA]);

  const passer = useCallback(() => {
    if (!question) return;
    setPassees((p) => ({ ...p, [question.id]: true }));
    allerA(index + 1);
  }, [question, index, allerA]);

  const terminer = useCallback(() => {
    setEtape("resultat");
    window.scrollTo({ top: 0 });
  }, []);

  terminerRef.current = terminer;

  // -------------------------------------------------------------- résultat
  const bilan = useMemo(() => {
    let justes = 0;
    let fausses = 0;
    for (const q of questions) {
      const choix = reponses[q.id];
      if (choix === undefined) continue;
      if (choix === q.bonneReponse) justes += 1;
      else fausses += 1;
    }
    const traitees = justes + fausses;
    const score = justes * BAREME.bonne + fausses * BAREME.fausse;
    const taux = traitees > 0 ? justes / traitees : 0;
    return {
      justes,
      fausses,
      traitees,
      nonTraitees: questions.length - traitees,
      score,
      taux,
      // Ce qu'aurait donné la même copie sans les réponses hasardeuses.
      scoreSansFausses: justes,
    };
  }, [questions, reponses]);

  // ================================================================ RENDUS

  if (etape === "briefing") {
    return <Briefing onDemarrer={demarrer} chargement={chargement} erreur={erreur} />;
  }

  if (etape === "resultat") {
    return (
      <Resultat
        bilan={bilan}
        questions={questions}
        reponses={reponses}
        onRecommencer={demarrer}
        chargement={chargement}
      />
    );
  }

  // ------------------------------------------------------------- épreuve
  const urgence = tempsRestant <= 300 ? "rouge" : tempsRestant <= 900 ? "orange" : "normal";
  const sectionCourante = SECTIONS.find((s) => s.id === question?.sectionId);

  return (
    // Plein écran : pendant l'épreuve, le site disparaît. Cela recouvre aussi
    // la boîte à outils flottante — au Concours Avenir, la calculatrice et
    // tout appareil électronique sont interdits.
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-100">
      {/* Bandeau d'épreuve : chrono, quota, sortie. Toujours visible. */}
      <header className="sticky top-0 z-20 border-b border-slate-700 bg-slate-900 text-white">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="text-xs uppercase tracking-widest text-slate-400">
            Épreuve de mathématiques
          </div>

          <div
            className={`font-mono text-3xl font-bold tabular-nums ${
              urgence === "rouge"
                ? "animate-pulse text-red-400"
                : urgence === "orange"
                  ? "text-amber-300"
                  : "text-white"
            }`}
            aria-live="off"
          >
            {formaterDuree(tempsRestant)}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right text-sm">
              <div className="font-semibold tabular-nums">
                {nbReponses} / {NB_REPONSES_COMPTEES}
              </div>
              <div className="text-xs text-slate-400">réponses</div>
            </div>
            <button
              type="button"
              onClick={terminer}
              className="rounded border border-slate-500 px-3 py-1.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
            >
              Terminer
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        {epreuve?.recyclee && (
          <p className="mb-4 rounded border border-slate-300 bg-white px-4 py-3 text-sm text-slate-600">
            Tu as déjà parcouru l&apos;essentiel de la banque&nbsp;: certaines questions
            de ce sujet te sont déjà passées sous les yeux.
          </p>
        )}

        {quotaAtteint && (
          <p className="mb-4 rounded border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700">
            Tu as utilisé tes {NB_REPONSES_COMPTEES} réponses. Comme au concours, les
            suivantes ne compteraient pas. Termine l&apos;épreuve pour voir ton score.
          </p>
        )}

        {question && (
          <article className="rounded border border-slate-300 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-4 flex items-baseline justify-between border-b border-slate-200 pb-3">
              <h1 className="font-serif text-lg font-bold text-slate-900">
                Question {question.numero}.
              </h1>
              <span className="text-xs uppercase tracking-wide text-slate-500">
                {sectionCourante?.label}
              </span>
            </div>

            <MarkdownMath className="font-serif text-lg leading-relaxed text-slate-900">
              {question.enonce}
            </MarkdownMath>

            <ul className="mt-6 space-y-2">
              {question.propositions.map((proposition, i) => {
                const validee = reponses[question.id];
                const estValidee = validee === i;
                const estSelectionnee = selection === i;
                const verrouille = validee !== undefined || quotaAtteint;

                return (
                  <li key={i}>
                    <button
                      type="button"
                      disabled={verrouille}
                      onClick={() => setSelection(i)}
                      className={`flex w-full items-start gap-3 rounded border px-4 py-3 text-left transition ${
                        estValidee
                          ? "border-slate-900 bg-slate-900 text-white"
                          : estSelectionnee
                            ? "border-slate-900 bg-slate-50 ring-2 ring-slate-900"
                            : verrouille
                              ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
                              : "border-slate-300 bg-white hover:border-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      <span className="font-serif font-bold">{LETTRES[i]}.</span>
                      <MarkdownMath inline className="font-serif">
                        {proposition}
                      </MarkdownMath>
                    </button>
                  </li>
                );
              })}
            </ul>

            {reponses[question.id] !== undefined ? (
              <p className="mt-6 text-sm text-slate-500">
                Réponse enregistrée. Aucune correction pendant l&apos;épreuve.
              </p>
            ) : (
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={valider}
                  disabled={selection === null || quotaAtteint}
                  className="rounded bg-slate-900 px-5 py-2.5 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Valider ma réponse
                </button>
                <button
                  type="button"
                  onClick={passer}
                  className="rounded border border-slate-400 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Passer sans répondre
                </button>
              </div>
            )}

            <p className="mt-4 text-xs text-slate-500">
              Bonne réponse&nbsp;: +1 &nbsp;·&nbsp; mauvaise réponse&nbsp;: −1
              &nbsp;·&nbsp; sans réponse&nbsp;: 0. En dessous d&apos;une chance sur deux,
              passer rapporte plus que tenter.
            </p>
          </article>
        )}

        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={() => allerA(index - 1)}
            disabled={index === 0}
            className="rounded border border-slate-300 bg-white px-4 py-2 text-sm transition hover:bg-slate-50 disabled:opacity-40"
          >
            ← Précédente
          </button>
          <button
            type="button"
            onClick={() => allerA(index + 1)}
            disabled={index >= questions.length - 1}
            className="rounded border border-slate-300 bg-white px-4 py-2 text-sm transition hover:bg-slate-50 disabled:opacity-40"
          >
            Suivante →
          </button>
        </div>

        {/* Grille du sujet : repérer d'un coup d'œil ce qui reste à traiter. */}
        <nav className="mt-6 rounded border border-slate-300 bg-white p-4">
          <p className="mb-3 text-xs uppercase tracking-wide text-slate-500">
            Sujet — {NB_QUESTIONS} questions
          </p>
          <div className="grid grid-cols-10 gap-1.5 sm:grid-cols-12">
            {questions.map((q, i) => {
              const repondue = reponses[q.id] !== undefined;
              const passee = passees[q.id];
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => allerA(i)}
                  title={`Question ${q.numero}`}
                  className={`h-8 rounded text-xs font-medium tabular-nums transition ${
                    i === index ? "ring-2 ring-slate-900 ring-offset-1" : ""
                  } ${
                    repondue
                      ? "bg-slate-900 text-white"
                      : passee
                        ? "bg-slate-300 text-slate-600"
                        : "border border-slate-300 bg-white text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {q.numero}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Noir&nbsp;: répondue · Gris&nbsp;: passée · Blanc&nbsp;: non traitée
          </p>
        </nav>
      </main>
    </div>
  );
}

/* ==================================================================== */
/*  BRIEFING                                                            */
/* ==================================================================== */

function Briefing({
  onDemarrer,
  chargement,
  erreur,
}: {
  onDemarrer: () => void;
  chargement: boolean;
  erreur: string | null;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-xs uppercase tracking-widest text-slate-500">
          Épreuve blanche
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-slate-900">
          Concours Avenir — Mathématiques
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">
          Sept écoles d&apos;ingénieurs post-bac recrutent par ce concours. L&apos;écrit
          compte pour <strong>60&nbsp;% de la note finale</strong>, et les mathématiques
          y ont le coefficient le plus lourd&nbsp;: <strong>6</strong> (sciences 4,
          anglais 2).
        </p>

        <section className="mt-8 rounded border border-slate-300 bg-white p-6">
          <h2 className="font-serif text-xl font-bold text-slate-900">
            Les règles, telles quelles
          </h2>
          <dl className="mt-4 space-y-3 text-slate-700">
            <div className="flex gap-3">
              <dt className="w-40 shrink-0 font-semibold text-slate-900">Durée</dt>
              <dd>1&nbsp;h&nbsp;30, soit deux minutes par question.</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-40 shrink-0 font-semibold text-slate-900">Sujet</dt>
              <dd>
                60 questions proposées, mais <strong>45 réponses seulement</strong> sont
                comptées. Tu choisis lesquelles.
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-40 shrink-0 font-semibold text-slate-900">Format</dt>
              <dd>Quatre propositions, une seule correcte.</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-40 shrink-0 font-semibold text-slate-900">Barème</dt>
              <dd>
                Bonne réponse <strong>+1</strong> · mauvaise réponse{" "}
                <strong>−1</strong> · sans réponse <strong>0</strong>.
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-6 rounded border-l-4 border-slate-900 bg-white p-6">
          <h2 className="font-serif text-xl font-bold text-slate-900">
            Ce que ce barème change
          </h2>
          <p className="mt-3 text-slate-700">
            Avec −1 pour une erreur, répondre au hasard parmi quatre propositions fait
            perdre en moyenne <strong>un demi-point par question</strong>. Le calcul
            complet&nbsp;:
          </p>
          <ul className="mt-4 space-y-1.5 font-mono text-sm text-slate-700">
            <li>au hasard (1 chance sur 4) → −0,50 point</li>
            <li>1 proposition éliminée (1 sur 3) → −0,33 point</li>
            <li>2 propositions éliminées (1 sur 2) → 0,00 point</li>
            <li>3 propositions éliminées → +1,00 point</li>
          </ul>
          <p className="mt-4 text-slate-700">
            D&apos;où la seule règle qui compte le jour J&nbsp;:{" "}
            <strong>
              si tu n&apos;as pas éliminé au moins deux propositions, passe.
            </strong>{" "}
            C&apos;est contre-intuitif après des années de bac, où laisser une case vide
            ne rapporte jamais rien. Ici, si.
          </p>
        </section>

        {erreur && (
          <p className="mt-6 rounded border border-red-300 bg-red-50 px-4 py-3 text-red-800">
            {erreur}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onDemarrer}
            disabled={chargement}
            className="rounded bg-slate-900 px-8 py-3.5 text-lg font-semibold text-white transition hover:bg-slate-700 disabled:bg-slate-400"
          >
            {chargement ? "Tirage du sujet…" : "Commencer l'épreuve"}
          </button>
          <p className="text-sm text-slate-600">
            Le chronomètre démarre immédiatement.
          </p>
        </div>

        <p className="mt-10 border-t border-slate-300 pt-6 text-sm text-slate-600">
          Pour travailler une notion précise plutôt qu&apos;une épreuve complète, le{" "}
          <Link
            href="/coach-ia/maths?classe=terminale-spe"
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            coach de Terminale
          </Link>{" "}
          reprend chaque chapitre séparément, avec les corrections détaillées.
        </p>
      </main>
    </div>
  );
}

/* ==================================================================== */
/*  RÉSULTAT                                                            */
/* ==================================================================== */

type Bilan = {
  justes: number;
  fausses: number;
  traitees: number;
  nonTraitees: number;
  score: number;
  taux: number;
  scoreSansFausses: number;
};

function Resultat({
  bilan,
  questions,
  reponses,
  onRecommencer,
  chargement,
}: {
  bilan: Bilan;
  questions: QuestionAvenir[];
  reponses: Record<string, number>;
  onRecommencer: () => void;
  chargement: boolean;
}) {
  const pourcentage = Math.round(bilan.taux * 100);
  // Le barème +1/-1 s'équilibre exactement à une chance sur deux.
  const arbitrage =
    bilan.taux > 0.5 ? "gagnant" : bilan.taux === 0.5 ? "equilibre" : "perdant";
  const s = (n: number) => (n > 1 ? "s" : "");

  return (
    <div className="min-h-screen bg-slate-100">
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-xs uppercase tracking-widest text-slate-500">
          Épreuve terminée
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-slate-900">
          Ton score&nbsp;: {bilan.score} / {NB_REPONSES_COMPTEES}
        </h1>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <Compteur valeur={bilan.justes} libelle="justes" detail="+1 chacune" />
          <Compteur valeur={bilan.fausses} libelle="fausses" detail="−1 chacune" />
          <Compteur
            valeur={bilan.nonTraitees}
            libelle="non traitées"
            detail="0 point"
          />
        </div>

        {/* Le cœur du débriefing : la gestion du risque. */}
        <section className="mt-8 rounded border-l-4 border-slate-900 bg-white p-6">
          <h2 className="font-serif text-xl font-bold text-slate-900">
            Ta gestion du risque
          </h2>

          {bilan.traitees === 0 ? (
            <p className="mt-3 text-slate-700">
              Tu n&apos;as validé aucune réponse. Passer ne coûte rien, mais ne rapporte
              rien non plus&nbsp;: au concours, il faut bien engager les questions que
              l&apos;on sait traiter.
            </p>
          ) : (
            <>
              <p className="mt-3 text-slate-700">
                Quand tu as répondu, tu as eu juste{" "}
                <strong>
                  {bilan.justes} fois sur {bilan.traitees}
                </strong>{" "}
                — soit <strong>{pourcentage}&nbsp;%</strong>.
              </p>
              <p className="mt-3 text-slate-700">
                {arbitrage === "gagnant" && (
                  <>
                    Au-dessus de 50&nbsp;%, chaque réponse validée te rapporte en
                    moyenne. Ton choix de répondre était{" "}
                    <strong>statistiquement gagnant</strong>. Tu peux même te permettre
                    d&apos;engager un peu plus de questions.
                  </>
                )}
                {arbitrage === "equilibre" && (
                  <>
                    50&nbsp;% pile, c&apos;est exactement le point d&apos;équilibre du
                    barème&nbsp;: tes réponses ne t&apos;ont ni rapporté ni coûté. Pour
                    marquer des points, il faut engager les questions où tu vois plus
                    clair — et laisser tomber les autres.
                  </>
                )}
                {arbitrage === "perdant" && (
                  <>
                    En dessous de 50&nbsp;%, chaque réponse validée te coûte en moyenne.
                    {bilan.fausses > 1 ? (
                      <>
                        {" "}
                        Tes {bilan.fausses} erreurs ont annulé {bilan.fausses} de tes
                        bonnes réponses
                      </>
                    ) : (
                      <> Ton erreur a annulé une de tes bonnes réponses</>
                    )}
                    &nbsp;: sans elle{s(bilan.fausses)}, tu serais à{" "}
                    <strong>
                      {bilan.scoreSansFausses} point{s(bilan.scoreSansFausses)}
                    </strong>{" "}
                    au lieu de {bilan.score}.
                  </>
                )}
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Le seuil de rentabilité du barème +1 / −1 est exactement une chance sur
                deux, c&apos;est-à-dire deux propositions éliminées sur quatre.
              </p>
            </>
          )}
        </section>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={onRecommencer}
            disabled={chargement}
            className="rounded bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:bg-slate-400"
          >
            {chargement ? "Tirage…" : "Nouvelle épreuve"}
          </button>
          <Link
            href="/coach-ia/maths?classe=terminale-spe"
            className="rounded border border-slate-400 px-6 py-3 font-medium text-slate-700 transition hover:bg-white"
          >
            Retravailler une notion au coach
          </Link>
        </div>

        <section className="mt-10">
          <h2 className="font-serif text-2xl font-bold text-slate-900">Correction</h2>
          <ul className="mt-4 space-y-3">
            {questions.map((q) => {
              const choix = reponses[q.id];
              const traitee = choix !== undefined;
              const juste = traitee && choix === q.bonneReponse;

              return (
                <li
                  key={q.id}
                  className={`rounded border bg-white p-4 ${
                    !traitee
                      ? "border-slate-200"
                      : juste
                        ? "border-emerald-300"
                        : "border-red-300"
                  }`}
                >
                  <div className="mb-2 flex items-baseline justify-between gap-3">
                    <span className="font-serif font-bold text-slate-900">
                      Question {q.numero}.
                    </span>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wide ${
                        !traitee
                          ? "text-slate-400"
                          : juste
                            ? "text-emerald-700"
                            : "text-red-700"
                      }`}
                    >
                      {!traitee ? "non traitée" : juste ? "juste +1" : "fausse −1"}
                    </span>
                  </div>

                  <MarkdownMath className="font-serif text-slate-900">
                    {q.enonce}
                  </MarkdownMath>

                  <p className="mt-3 text-sm text-slate-700">
                    <span className="font-semibold">Réponse&nbsp;: </span>
                    <MarkdownMath inline>
                      {q.propositions[q.bonneReponse] ?? ""}
                    </MarkdownMath>
                  </p>

                  {traitee && !juste && (
                    <p className="mt-1 text-sm text-red-700">
                      <span className="font-semibold">Ta réponse&nbsp;: </span>
                      <MarkdownMath inline>{q.propositions[choix] ?? ""}</MarkdownMath>
                    </p>
                  )}

                  {q.explication && (
                    <div className="mt-3 border-t border-slate-200 pt-3 text-sm text-slate-600">
                      <MarkdownMath>{q.explication}</MarkdownMath>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}

function Compteur({
  valeur,
  libelle,
  detail,
}: {
  valeur: number;
  libelle: string;
  detail: string;
}) {
  return (
    <div className="rounded border border-slate-300 bg-white p-4 text-center">
      <div className="font-mono text-3xl font-bold tabular-nums text-slate-900">
        {valeur}
      </div>
      <div className="text-sm font-medium text-slate-700">{libelle}</div>
      <div className="text-xs text-slate-500">{detail}</div>
    </div>
  );
}
