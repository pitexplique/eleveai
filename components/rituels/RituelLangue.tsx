"use client";

// LE RITUEL DE LANGUE — l'écran partagé par « l'anglais du jour » et « l'espagnol
// du jour » (même modèle, demande de Frédéric 25/07). Façon Duolingo mais SANS
// ses pièges : pas de cœurs, pas de gemmes, pas de série qui culpabilise, pas de
// pub. On DÉCOUVRE le mot (avec le son), on le RECONNAÎT, puis on le REVOIT les
// jours suivants (répétition espacée). Chaque mot renvoie au coach pour en faire
// une phrase : on apprend en produisant.
//
// La série + la répétition espacée vivent en localStorage (marche pour 100 % des
// visiteurs). Si l'élève est CONNECTÉ, le score est aussi enregistré en base
// (table partagée resultats_langue_du_jour, via /api/resultats) — même patron
// que la dictée du jour.

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { estAReviser, type MotLangue, type Repertoire } from "@/lib/repertoire/moteur";
import { speakText, type SpeechLang } from "@/app/tutor-v4/ListenButton";
import { useEleve } from "@/context/EleveContext";
import FinRituel from "@/components/rituels/FinRituel";

export type ConfigRituel = {
  /** La banque + le moteur (repertoireAnglais, repertoireEspagnol…). */
  repertoire: Repertoire;
  /** Clé de la langue en base : 'anglais' | 'espagnol'. */
  langue: string;
  /** La voix de lecture de secours (mp3 d'abord, puis cette voix système). */
  voix: SpeechLang;
  /** L'emoji drapeau. */
  drapeau: string;
  /** Le titre affiché, ex. « L'anglais du jour ». */
  titre: string;
  /** Le préfixe des clés localStorage, ex. « anglais-du-jour ». */
  prefixe: string;
  /** Le pont vers le coach de la langue. */
  coachHref: string;
  coachLabel: string;
};

type EntreeLog = { first: string; last: string; reviews: number };
type Log = Record<string, EntreeLog>;

type Etape =
  | { kind: "learn"; mot: MotLangue }
  | { kind: "quiz"; mot: MotLangue; revision: boolean };

function jourStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function joursEntre(aStr: string, bStr: string): number {
  const a = new Date(`${aStr}T00:00:00Z`).getTime();
  const b = new Date(`${bStr}T00:00:00Z`).getTime();
  return Math.round((b - a) / 86_400_000);
}

const MSG_PARFAIT = ["Sans faute ! 🎉", "5 sur 5, superbe ! 🌟", "Parfait — chapeau ! 🏆"];
const MSG_BIEN = ["Bien joué ! 👏", "Beau score ! 💪", "Tu tiens le rythme ! ✨"];
const MSG_DOUX = [
  "L'important, c'est d'avoir vu les mots — demain, tu les reconnaîtras mieux. 🌱",
  "Chaque jour compte. On les revoit bientôt ! ☀️",
  "Découvrir, c'est déjà apprendre. À demain ! 💛",
];
function messageFin(score: number, total: number, seed: number): string {
  const pool = score === total ? MSG_PARFAIT : score * 2 >= total ? MSG_BIEN : MSG_DOUX;
  return pool[((seed % pool.length) + pool.length) % pool.length];
}

export default function RituelLangue({ config }: { config: ConfigRituel }) {
  const { repertoire, voix, drapeau, titre, prefixe, langue, coachHref, coachLabel } = config;
  const STREAK_KEY = `${prefixe}-streak`;
  const LOG_KEY = `${prefixe}-log`;
  const NIVEAU_KEY = `${prefixe}-niveau`;

  const { eleve } = useEleve();

  const [niveau, setNiveau] = useState<string>("tous");
  const [etapes, setEtapes] = useState<Etape[] | null>(null);
  const [motsJour, setMotsJour] = useState<MotLangue[]>([]);
  const [nbRevisions, setNbRevisions] = useState(0);
  const [dateLabel, setDateLabel] = useState("");
  const [pas, setPas] = useState(0);
  const [choisi, setChoisi] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [bons, setBons] = useState<Record<string, boolean>>({});
  const [fini, setFini] = useState(false);
  const [streak, setStreak] = useState(0);
  const [dejaFait, setDejaFait] = useState(false);
  const finRef = useRef(false);

  function lireLog(): Log {
    try {
      return JSON.parse(localStorage.getItem(LOG_KEY) ?? "{}") as Log;
    } catch {
      return {};
    }
  }

  // L'audio : le mp3 enregistré (accent juste) et, à défaut ou en cas d'échec,
  // la voix système. On commence par l'anglais justement parce que sa voix est
  // presque toujours présente (l'espagnol l'est moins).
  function jouer(mot: MotLangue) {
    if (mot.audio) {
      try {
        const a = new Audio(mot.audio);
        a.play().catch(() => speakText(mot.mot, voix));
        return;
      } catch {
        /* repli ci-dessous */
      }
    }
    speakText(mot.mot, voix);
  }

  function construire(niv: string) {
    const now = new Date();
    setDateLabel(
      new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" }).format(now)
    );

    const jour = repertoire.getMotsDuJour(now, 5, niv);
    const idsJour = new Set(jour.map((m) => m.id));
    const today = jourStr(now);

    const log = lireLog();
    const dus: { mot: MotLangue; last: string }[] = [];
    for (const [id, e] of Object.entries(log)) {
      if (idsJour.has(id)) continue;
      const mot = repertoire.MOT_PAR_ID.get(id);
      if (!mot) continue;
      if (estAReviser(e.reviews, joursEntre(e.last, today))) dus.push({ mot, last: e.last });
    }
    dus.sort((a, b) => (a.last < b.last ? -1 : 1));
    const revisions = dus.slice(0, 3).map((d) => d.mot);

    const seq: Etape[] = [
      ...revisions.map((m) => ({ kind: "quiz", mot: m, revision: true }) as Etape),
      ...jour.flatMap(
        (m) => [{ kind: "learn", mot: m }, { kind: "quiz", mot: m, revision: false }] as Etape[]
      ),
    ];

    setMotsJour(jour);
    setNbRevisions(revisions.length);
    setEtapes(seq);
    setPas(0);
    setChoisi(null);
    setScore(0);
    setBons({});
    setFini(false);
    finRef.current = false;

    try {
      const raw = localStorage.getItem(STREAK_KEY);
      if (raw) {
        const { last, streak: s } = JSON.parse(raw) as { last: string; streak: number };
        setStreak(s ?? 0);
        setDejaFait(last === today);
      } else {
        setStreak(0);
        setDejaFait(false);
      }
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
    let niv = "tous";
    try {
      niv = localStorage.getItem(NIVEAU_KEY) || "tous";
    } catch {
      /* ignore */
    }
    setNiveau(niv);
    construire(niv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changerNiveau(niv: string) {
    setNiveau(niv);
    try {
      localStorage.setItem(NIVEAU_KEY, niv);
    } catch {
      /* ignore */
    }
    construire(niv);
  }

  const quizTotal = useMemo(
    () => (etapes ? etapes.filter((e) => e.kind === "quiz").length : 0),
    [etapes]
  );
  const etape = etapes && pas < etapes.length ? etapes[pas] : null;
  const numQuiz = etapes
    ? etapes.slice(0, pas + 1).filter((e) => e.kind === "quiz").length
    : 0;

  function avancer() {
    setChoisi(null);
    if (!etapes) return;
    if (pas + 1 >= etapes.length) {
      setFini(true);
      cloturer();
    } else {
      setPas(pas + 1);
    }
  }

  function repondre(choix: string, mot: MotLangue) {
    if (choisi) return;
    setChoisi(choix);
    const ok = choix === mot.mot;
    if (ok) setScore((s) => s + 1);
    setBons((b) => ({ ...b, [mot.id]: ok }));
  }

  // Enregistrement en base (élève connecté) — même patron que la dictée. Tolérant :
  // un échec (ex. table pas encore créée) ne casse jamais le rituel.
  async function enregistrerEnBase(scoreFinal: number, bonsFinal: Record<string, boolean>) {
    if (!eleve?.token || !etapes) return;
    const quizMots = etapes.filter((e) => e.kind === "quiz").map((e) => e.mot);
    const details = {
      date: jourStr(new Date()),
      niveau,
      revisions: nbRevisions,
      mots: quizMots.map((m) => ({
        mot: m.mot,
        fr: m.fr,
        niveau: m.niveau,
        ok: !!bonsFinal[m.id],
      })),
    };
    try {
      await fetch("/api/resultats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: eleve.token,
          type: "langue_du_jour",
          resultat: { langue, niveau, score: scoreFinal, total: quizMots.length, details },
        }),
      });
    } catch {
      /* silencieux : la série localStorage reste la source pour l'élève */
    }
  }

  function cloturer() {
    if (finRef.current || !etapes) return;
    finRef.current = true;
    const now = new Date();
    const today = jourStr(now);

    // Score/bons figés au moment de clôturer (les setState sont asynchrones).
    const bonsFinal = etapes.reduce<Record<string, boolean>>((acc, e) => {
      if (e.kind === "quiz") acc[e.mot.id] = !!bons[e.mot.id];
      return acc;
    }, {});
    const scoreFinal = Object.values(bonsFinal).filter(Boolean).length;

    try {
      const log = lireLog();
      for (const e of etapes) {
        if (e.kind !== "quiz") continue;
        const prev = log[e.mot.id];
        log[e.mot.id] = prev
          ? { ...prev, last: today, reviews: prev.reviews + 1 }
          : { first: today, last: today, reviews: 0 };
      }
      localStorage.setItem(LOG_KEY, JSON.stringify(log));
    } catch {
      /* ignore */
    }

    try {
      const raw = localStorage.getItem(STREAK_KEY);
      const prev = raw ? (JSON.parse(raw) as { last: string; streak: number }) : null;
      if (prev?.last === today) {
        setStreak(prev.streak);
        setDejaFait(true);
      } else {
        const yesterday = jourStr(new Date(now.getTime() - 86_400_000));
        const nouvelle = prev && prev.last === yesterday ? prev.streak + 1 : 1;
        localStorage.setItem(STREAK_KEY, JSON.stringify({ last: today, streak: nouvelle }));
        setStreak(nouvelle);
        setDejaFait(true);
      }
    } catch {
      /* ignore */
    }

    void enregistrerEnBase(scoreFinal, bonsFinal);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-100 via-violet-50 to-fuchsia-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-xl">
        <div className="mb-4 text-center">
          <p className="text-sm font-black uppercase tracking-wide text-indigo-600">
            {drapeau} {titre} — 5 mots par jour
          </p>
          <p className="mt-1 text-2xl font-black capitalize text-slate-800">{dateLabel || "…"}</p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            Écoute, reconnais — et on les revoit les jours suivants pour ne plus les oublier.
          </p>
        </div>

        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {repertoire.NIVEAUX.map((n) => (
            <button
              key={n.slug}
              type="button"
              onClick={() => changerNiveau(n.slug)}
              className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
                niveau === n.slug
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>

        {nbRevisions > 0 && !fini && (
          <p className="mb-3 text-center">
            <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700">
              🔁 {nbRevisions} mot{nbRevisions > 1 ? "s" : ""} à revoir aujourd&apos;hui
            </span>
          </p>
        )}

        {!etapes ? (
          <div className="rounded-3xl bg-white p-8 text-center text-slate-400 shadow-sm">
            Chargement…
          </div>
        ) : fini ? (
          <div className="rounded-3xl border border-fuchsia-200 bg-white p-6 text-center shadow-sm sm:p-8">
            <p className="text-5xl font-black text-indigo-600">
              {score}/{quizTotal}
            </p>
            <p className="mt-2 whitespace-pre-line text-lg font-black text-slate-800">
              {messageFin(score, quizTotal, new Date().getDate())}
            </p>
            {streak > 0 && (
              <p className="mt-2 inline-block rounded-full bg-orange-100 px-4 py-1.5 text-sm font-black text-orange-700">
                🔥 {streak} jour{streak > 1 ? "s" : ""} d&apos;affilée
              </p>
            )}

            <p className="mt-5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
              📋 Les mots d&apos;aujourd&apos;hui
            </p>
            <ul className="mt-2 space-y-1.5 text-left">
              {motsJour.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm"
                >
                  <span className="flex items-baseline gap-2">
                    <button
                      type="button"
                      onClick={() => jouer(m)}
                      aria-label={`Écouter ${m.mot}`}
                      className="text-indigo-500 hover:text-indigo-700"
                    >
                      🔊
                    </button>
                    <span className="font-black text-slate-800">{m.mot}</span>
                    <span className="text-slate-500">— {m.fr}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700">
                    {m.niveau}
                  </span>
                </li>
              ))}
            </ul>

            {/* Le moment de conversion : continuer avec le coach, ou s'enregistrer. */}
            <FinRituel coachHref={coachHref} coachLabel={coachLabel} />

            <div className="mt-5 rounded-xl bg-violet-50 p-3 text-left text-xs font-semibold leading-5 text-violet-800">
              💡 Pourquoi ça marche : on oublie vite un mot vu une fois. En le
              revoyant à J+1, J+3, J+7… il s&apos;installe pour de bon. C&apos;est la
              <b> répétition espacée</b> — reviens demain, tes mots t&apos;attendent.
            </div>

            <p className="mt-4 text-sm font-bold text-slate-600">À demain pour 5 nouveaux mots ! ☀️</p>
          </div>
        ) : etape && etape.kind === "learn" ? (
          <Carte pas={pas} total={etapes.length} numQuiz={numQuiz} quizTotal={quizTotal} streak={streak}>
            <p className="text-center text-xs font-bold uppercase tracking-wide text-indigo-400">
              Nouveau mot · {etape.mot.niveau}
              {etape.mot.theme ? ` · ${etape.mot.theme}` : ""}
            </p>
            <p className="mt-3 text-center text-4xl font-black text-slate-900">{etape.mot.mot}</p>
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => jouer(etape.mot)}
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-base font-black text-white shadow-sm hover:bg-indigo-700"
              >
                🔊 Écouter
              </button>
            </div>
            <p className="mt-5 text-center text-lg font-bold text-slate-600">
              ça veut dire : <span className="font-black text-slate-900">{etape.mot.fr}</span>
            </p>
            <button
              type="button"
              onClick={avancer}
              className="mt-6 w-full rounded-xl bg-fuchsia-500 px-8 py-3 text-base font-black text-white shadow-sm hover:bg-fuchsia-600"
            >
              Je le connais →
            </button>
          </Carte>
        ) : etape && etape.kind === "quiz" ? (
          <QuizCarte
            key={pas}
            etape={etape}
            pas={pas}
            total={etapes.length}
            numQuiz={numQuiz}
            quizTotal={quizTotal}
            streak={streak}
            choisi={choisi}
            choix={repertoire.choixQuiz(etape.mot)}
            onEcouter={jouer}
            onRepondre={repondre}
            onSuivant={avancer}
            dernier={pas + 1 >= etapes.length}
          />
        ) : null}

        {dejaFait && !fini && (
          <p className="mt-4 text-center text-xs font-semibold text-slate-400">
            Tu as déjà fait tes mots aujourd&apos;hui — mais tu peux t&apos;entraîner encore. 😉
          </p>
        )}

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm font-bold text-indigo-600 hover:underline">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}

function Carte({
  children,
  pas,
  total,
  numQuiz,
  quizTotal,
  streak,
}: {
  children: React.ReactNode;
  pas: number;
  total: number;
  numQuiz: number;
  quizTotal: number;
  streak: number;
}) {
  return (
    <div className="rounded-3xl border border-indigo-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-4">
        <div className="mb-1.5 flex items-center justify-between text-xs font-bold text-slate-500">
          <span>
            Étape {pas + 1} / {total}
            {quizTotal > 0 && (
              <span className="ml-2 text-indigo-400">
                (question {Math.min(numQuiz || 1, quizTotal)}/{quizTotal})
              </span>
            )}
          </span>
          {streak > 0 && <span className="text-orange-600">🔥 {streak}</span>}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-indigo-400 transition-all"
            style={{ width: `${((pas + 1) / total) * 100}%` }}
          />
        </div>
      </div>
      {children}
    </div>
  );
}

function QuizCarte({
  etape,
  pas,
  total,
  numQuiz,
  quizTotal,
  streak,
  choisi,
  choix,
  onEcouter,
  onRepondre,
  onSuivant,
  dernier,
}: {
  etape: { kind: "quiz"; mot: MotLangue; revision: boolean };
  pas: number;
  total: number;
  numQuiz: number;
  quizTotal: number;
  streak: number;
  choisi: string | null;
  choix: string[];
  onEcouter: (mot: MotLangue) => void;
  onRepondre: (choix: string, mot: MotLangue) => void;
  onSuivant: () => void;
  dernier: boolean;
}) {
  const { mot, revision } = etape;

  return (
    <Carte pas={pas} total={total} numQuiz={numQuiz} quizTotal={quizTotal} streak={streak}>
      <div className="mb-3 flex justify-center">
        <span
          className={`rounded-full px-3 py-1 text-xs font-black ${
            revision ? "bg-violet-100 text-violet-700" : "bg-indigo-100 text-indigo-700"
          }`}
        >
          {revision ? "🔁 Révision" : "🎯 Reconnais le mot"}
        </span>
      </div>

      <p className="text-center text-lg font-bold text-slate-700">
        Comment dit-on <span className="font-black text-slate-900">« {mot.fr} »</span> ?
      </p>

      <div className="mt-2 flex justify-center">
        <button
          type="button"
          onClick={() => onEcouter(mot)}
          aria-label="Écouter le mot"
          className="rounded-full px-3 py-1 text-xs font-bold text-indigo-600 hover:bg-indigo-50"
        >
          🔊 entendre le mot
        </button>
      </div>

      <div className="mt-4 grid gap-2.5">
        {choix.map((c) => {
          const estBon = c === mot.mot;
          const montrer = choisi !== null;
          const cetteChoisie = choisi === c;
          let style = "border-slate-200 bg-white text-slate-800 hover:bg-slate-50";
          if (montrer && estBon) style = "border-emerald-400 bg-emerald-50 text-emerald-800";
          else if (montrer && cetteChoisie && !estBon)
            style = "border-rose-300 bg-rose-50 text-rose-700";
          else if (montrer) style = "border-slate-200 bg-white text-slate-400";
          return (
            <button
              key={c}
              type="button"
              disabled={montrer}
              onClick={() => onRepondre(c, mot)}
              className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left text-lg font-bold transition ${style}`}
            >
              <span>{c}</span>
              {montrer && estBon && <span>✓</span>}
              {montrer && cetteChoisie && !estBon && <span>✗</span>}
            </button>
          );
        })}
      </div>

      {choisi !== null && (
        <div className="mt-4">
          <div
            className={`rounded-2xl p-3 text-center text-sm font-bold ${
              choisi === mot.mot ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
            }`}
          >
            {choisi === mot.mot ? (
              <>✅ Oui&nbsp;! <b>{mot.mot}</b> = {mot.fr}</>
            ) : (
              <>
                Presque&nbsp;! <b>{mot.mot}</b> veut dire «&nbsp;{mot.fr}&nbsp;». On le reverra. 💛
              </>
            )}
          </div>
          <button
            type="button"
            onClick={onSuivant}
            className="mt-4 w-full rounded-xl bg-indigo-600 px-8 py-3 text-base font-black text-white shadow-sm hover:bg-indigo-700"
          >
            {dernier ? "Voir mon résultat →" : "Continuer →"}
          </button>
        </div>
      )}
    </Carte>
  );
}
