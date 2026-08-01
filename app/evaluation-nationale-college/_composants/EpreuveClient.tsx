"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CanvasRenderer } from "@/lib/canvas";
import { MarkdownMath } from "@/components/MarkdownMath";
import { saveResultat } from "@/lib/resultats";
import { useEleve } from "@/context/EleveContext";

import {
  GROUPES,
  construireBilan,
  groupeDeMaitrise,
  nbQuestions as compterQuestions,
  routeRemediation,
  tirerEpreuve,
  type ConfigEpreuve,
  type QuestionEval,
} from "@/lib/eval-nationale/moteur";

const PAPER = "#f6f1e4";
const INK = "#1d1c16";

type Etape = "accueil" | "prise-en-main" | "epreuve" | "bilan";

// ─── LA PRISE EN MAIN ─────────────────────────────────────────────────────────
// La vraie évaluation commence par là (Frédéric) : avant de mesurer les maths,
// on vérifie que l'élève sait se servir de la souris et choisir une réponse.
// Un enfant qui perd des points parce qu'il n'a pas compris l'interface, on ne
// mesure pas ses maths — on mesure son habitude de l'ordinateur.
const PRISE_EN_MAIN = [
  {
    consigne: "Clique sur la bonne réponse, puis sur « Continuer ».",
    question: "Quelle est la couleur du ciel par temps clair ?",
    choices: ["Bleu", "Vert", "Rouge", "Marron"],
    expected: "Bleu",
    apprend: "Une seule réponse à la fois : cliquer sur une autre change ton choix.",
  },
  {
    consigne: "Même chose. Regarde bien : ta réponse s'entoure quand elle est prise en compte.",
    question: "Combien font 2 + 3 ?",
    choices: ["5", "4", "6", "23"],
    expected: "5",
    apprend:
      "Tant que tu n'as pas cliqué sur « Continuer », tu peux changer d'avis.",
  },
];

function formatChrono(secondes: number) {
  const m = Math.floor(secondes / 60);
  const s = secondes % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Le lecteur d'épreuve, commun aux quatre épreuves blanches. Tout ce qui
 * change d'une épreuve à l'autre arrive par `config` — banque, thèmes,
 * durée, classe testée.
 */
export default function EpreuveClient({ config }: { config: ConfigEpreuve }) {
  const { eleve } = useEleve();

  /** Les items déjà vus, pour que le deuxième passage soit vraiment neuf. */
  const CLE_DEJA_VUS = `eleveai_eval_nationale_${config.slug}_vus`;
  const NB_QUESTIONS = compterQuestions(config);
  /** « 6e » s'écrit « 6ᵉ » quand on l'affiche. */
  const classeLabel = config.classe.replace(/e$/, "ᵉ");
  const dureeMinutes = Math.round(config.dureeSecondes / 60);

  const [etape, setEtape] = useState<Etape>("accueil");

  // Prise en main
  const [indexPrise, setIndexPrise] = useState(0);
  const [choixPrise, setChoixPrise] = useState<string | null>(null);

  // Épreuve
  const [questions, setQuestions] = useState<QuestionEval[]>([]);
  const [index, setIndex] = useState(0);
  const [choix, setChoix] = useState<string | null>(null);
  const [reponses, setReponses] = useState<Record<number, string>>({});
  const [restant, setRestant] = useState(config.dureeSecondes);

  const [chronoEcoule, setChronoEcoule] = useState(false);
  const [enregistrement, setEnregistrement] = useState<string | null>(null);

  const hautRef = useRef<HTMLDivElement | null>(null);
  const dejaEnregistre = useRef(false);

  /**
   * Clôture l'épreuve — par le chrono ou par la dernière question. Les deux
   * chemins passent ici : la mémorisation des items vus était écrite deux
   * fois, et une seule des deux aurait fini par diverger.
   */
  const cloturer = useCallback(
    (parChrono: boolean) => {
      setChronoEcoule(parChrono);
      setEtape("bilan");
      try {
        const vus: string[] = JSON.parse(
          localStorage.getItem(CLE_DEJA_VUS) ?? "[]",
        );
        const maj = [...vus, ...questions.map((q) => q.itemId)].slice(-1500);
        localStorage.setItem(CLE_DEJA_VUS, JSON.stringify(maj));
      } catch {
        // Navigation privée : tant pis, on ne mémorise pas.
      }
    },
    [questions, CLE_DEJA_VUS],
  );

  // Le chrono : à zéro, l'épreuve se ferme d'elle-même.
  useEffect(() => {
    if (etape !== "epreuve") return;
    const t = setInterval(() => {
      setRestant((r) => {
        if (r <= 1) {
          clearInterval(t);
          cloturer(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [etape, cloturer]);

  function commencerPriseEnMain() {
    setEtape("prise-en-main");
    setIndexPrise(0);
    setChoixPrise(null);
  }

  function commencerEpreuve() {
    // ⚠️ Le tirage utilise Math.random : il DOIT tourner après le montage,
    // jamais au rendu, sinon le serveur et le navigateur ne tirent pas la
    // même épreuve (erreur d'hydratation).
    let vus: string[] = [];
    try {
      vus = JSON.parse(localStorage.getItem(CLE_DEJA_VUS) ?? "[]");
    } catch {
      vus = [];
    }
    const epreuve = tirerEpreuve(config, vus);
    setQuestions(epreuve.questions);
    setIndex(0);
    setChoix(null);
    setReponses({});
    setRestant(epreuve.dureeSecondes);
    setChronoEcoule(false);
    setEnregistrement(null);
    // Sans ce remise à zéro, un deuxième passage ne serait jamais enregistré.
    dejaEnregistre.current = false;
    setEtape("epreuve");
  }

  function validerEtContinuer() {
    if (choix === null) return;
    const suivant = { ...reponses, [index]: choix };
    setReponses(suivant);
    setChoix(null);

    // `setReponses` juste au-dessus est appliqué avant le rendu du bilan
    // (React groupe les mises à jour d'un même gestionnaire) : la dernière
    // réponse est bien comptée.
    if (index + 1 >= questions.length) {
      cloturer(false);
      return;
    }

    setIndex((i) => i + 1);
    hautRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const bilan = useMemo(
    () =>
      etape === "bilan" ? construireBilan(config, questions, reponses) : [],
    [etape, config, questions, reponses],
  );

  const totalJustes = bilan.reduce((n, t) => n + t.justes, 0);
  const totalPosees = bilan.reduce((n, t) => n + t.total, 0);

  // ENREGISTREMENT AUTOMATIQUE, pas un bouton (contrairement au parcours) :
  // une évaluation n'est pas quelque chose qu'on choisit de consigner après
  // coup. Si l'élève est connecté, son profil part vers le tableau de suivi
  // de son professeur — c'est tout l'intérêt à la rentrée. Le garde-fou
  // `dejaEnregistre` évite le doublon si React rejoue l'effet.
  useEffect(() => {
    if (etape !== "bilan" || dejaEnregistre.current) return;
    if (!bilan.length) return;
    dejaEnregistre.current = true;

    if (!eleve?.token) {
      setEnregistrement("non-connecte");
      return;
    }

    saveResultat(eleve, "evaluation_nationale", {
      classe: config.classe,
      matiere: config.matiere,
      score: totalJustes,
      total: totalPosees,
      duree_sec: config.dureeSecondes - restant,
      chrono_ecoule: chronoEcoule,
      details: {
        // Le groupe de maîtrise part en base avec le reste : c'est dans ces
        // termes que le professeur lira sa classe, pas en pourcentages.
        groupe: groupeDeMaitrise(totalJustes, totalPosees),
        themes: bilan.map((t) => ({
          id: t.themeId,
          label: t.themeLabel,
          justes: t.justes,
          total: t.total,
          groupe: groupeDeMaitrise(t.justes, t.total),
        })),
        micros: bilan.flatMap((t) => t.micros),
      },
    }).then(({ error }) => {
      setEnregistrement(error ? error.message : "ok");
    });
  }, [
    etape,
    bilan,
    eleve,
    totalJustes,
    totalPosees,
    restant,
    chronoEcoule,
    config,
  ]);

  const question = questions[index];

  return (
    <main
      className="min-h-screen px-4 pb-16 pt-8 sm:px-6 lg:px-8"
      style={{ backgroundColor: PAPER, color: INK }}
    >
      <div ref={hautRef} className="mx-auto max-w-3xl">
        {/* ══ ACCUEIL ══════════════════════════════════════════════════════ */}
        {etape === "accueil" && (
          <>
            <Link
              href="/evaluation-nationale-college"
              className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55 hover:text-cyan-800"
            >
              ← Les évaluations du collège
            </Link>

            <header className="mt-3 border-b-4 border-double border-[#1d1c16] pb-5">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-800">
                🎓 Épreuve blanche · {classeLabel} · {config.matiereLabel}
              </p>
              <h1 className="mt-1 font-serif text-4xl font-black leading-none tracking-tight sm:text-5xl">
                L&apos;évaluation nationale, en vrai
              </h1>
              <p className="mt-3 text-sm font-medium leading-6 text-[#1d1c16]/70">
                Même forme que le jour J : les questions défilent une par une,
                on ne revient pas en arrière, et le temps court.
              </p>
            </header>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { chiffre: String(dureeMinutes), unite: "minutes", quoi: "comme la vraie" },
                {
                  chiffre: String(NB_QUESTIONS),
                  unite: "questions",
                  quoi: `en ${config.themes.length} thèmes`,
                },
                { chiffre: "0", unite: "note", quoi: "un profil, pas un chiffre" },
              ].map((c) => (
                <div key={c.unite} className="border-2 border-[#1d1c16] p-3 text-center">
                  <p className="font-serif text-4xl font-black leading-none text-cyan-800">
                    {c.chiffre}
                  </p>
                  <p className="mt-1 text-sm font-black">{c.unite}</p>
                  <p className="text-xs font-medium text-[#1d1c16]/70">{c.quoi}</p>
                </div>
              ))}
            </div>

            <section className="mt-6 border-t-2 border-[#1d1c16] pt-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                Les thèmes de l&apos;épreuve
              </p>
              <div className="mt-2 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {config.themes.map((t) => (
                  <div key={t.id} className="border-t border-[#1d1c16]/25 pt-2">
                    <p className="font-serif text-[15px] font-black leading-snug">
                      {t.label}
                    </p>
                    <p className="mt-0.5 text-xs font-medium leading-5 text-[#1d1c16]/70">
                      {t.quoi}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Ce que la vraie ne dit pas, et qui est la raison d'être de
                celle-ci. */}
            <div className="mt-6 border-2 border-[#1d1c16] bg-cyan-800/[0.05] p-4">
              <p className="font-serif text-lg font-black leading-tight">
                À la fin, tu sauras exactement ce qui a coincé
              </p>
              <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/70">
                Pas une note. Le nom de chaque compétence testée, celles que tu
                tiens et celles à retravailler — et le lien pour t&apos;y
                mettre tout de suite. La vraie épreuve, elle, ne te le dira
                jamais.
              </p>
            </div>

            {/* LA CLASSE TESTÉE N'EST PAS LA SIENNE — c'est le point que les
                élèves comprennent mal, et qui change tout à leur préparation. */}
            <p className="mt-5 text-sm font-medium leading-6 text-[#1d1c16]/70">
              Les questions portent sur le programme de{" "}
              {config.labelSource} : l&apos;évaluation de rentrée mesure ce que
              tu emportes de l&apos;an dernier, pas ce que tu n&apos;as pas
              encore appris en {classeLabel}.
            </p>

            {/* CE QU'ON NE COUVRE PAS, dit avant de commencer. Taire les
                domaines manquants laisserait croire qu'on reproduit toute
                l'épreuve — on ne promet que ce qui existe. */}
            {config.reserve && (
              <p className="mt-3 border-l-4 border-[#1d1c16]/25 pl-3 text-sm font-medium leading-6 text-[#1d1c16]/70">
                {config.reserve}
              </p>
            )}

            <button
              type="button"
              onClick={commencerPriseEnMain}
              className="mt-5 inline-flex items-center gap-2 rounded-sm bg-cyan-800 px-6 py-3 text-sm font-black text-[#f0fafc] transition hover:bg-[#1d1c16]"
            >
              Commencer par la prise en main →
            </button>
          </>
        )}

        {/* ══ PRISE EN MAIN ════════════════════════════════════════════════ */}
        {etape === "prise-en-main" && (
          <>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-800">
              Prise en main · {indexPrise + 1} / {PRISE_EN_MAIN.length}
            </p>
            <h1 className="mt-1 font-serif text-3xl font-black leading-tight">
              D&apos;abord, on vérifie que tu es à l&apos;aise
            </h1>
            <p className="mt-2 text-sm font-medium leading-6 text-[#1d1c16]/70">
              Ces questions ne comptent pas. Elles servent à te montrer comment
              répondre — c&apos;est exactement ce que fait la vraie évaluation
              avant de commencer.
            </p>

            <div className="mt-5 border-2 border-[#1d1c16] p-4 sm:p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                {PRISE_EN_MAIN[indexPrise].consigne}
              </p>
              <p className="mt-2 font-serif text-2xl font-black leading-tight">
                {PRISE_EN_MAIN[indexPrise].question}
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {PRISE_EN_MAIN[indexPrise].choices.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setChoixPrise(c)}
                    className={[
                      "border-2 px-4 py-3 text-left text-sm font-black transition",
                      choixPrise === c
                        ? "border-cyan-800 bg-cyan-800 text-[#f0fafc]"
                        : "border-[#1d1c16]/25 hover:border-[#1d1c16] hover:bg-[#1d1c16]/5",
                    ].join(" ")}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {choixPrise !== null && (
                <div className="mt-4 border-t border-[#1d1c16]/25 pt-3">
                  <p className="text-sm font-black">
                    {choixPrise === PRISE_EN_MAIN[indexPrise].expected
                      ? "✅ C'est ça. Tu sais répondre."
                      : "Ce n'était pas la bonne, mais peu importe : ici on apprend juste à cliquer."}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/70">
                    {PRISE_EN_MAIN[indexPrise].apprend}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (indexPrise + 1 < PRISE_EN_MAIN.length) {
                        setIndexPrise((i) => i + 1);
                        setChoixPrise(null);
                      } else {
                        setEtape("accueil");
                        setTimeout(commencerEpreuve, 0);
                      }
                    }}
                    className="mt-3 inline-flex items-center gap-2 rounded-sm bg-cyan-800 px-5 py-2.5 text-sm font-black text-[#f0fafc] transition hover:bg-[#1d1c16]"
                  >
                    {indexPrise + 1 < PRISE_EN_MAIN.length
                      ? "Continuer →"
                      : `Je suis prêt · démarrer les ${dureeMinutes} minutes →`}
                  </button>
                </div>
              )}
            </div>

            <div className="mt-5 border-l-4 border-red-800 pl-3">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-800">
                À savoir avant de commencer
              </p>
              <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/70">
                Une fois l&apos;épreuve lancée, chaque question s&apos;en va
                quand tu passes à la suivante :{" "}
                <span className="font-black text-[#1d1c16]">
                  on ne revient jamais en arrière
                </span>
                . C&apos;est la règle du jour J. Réfléchis avant de valider.
              </p>
            </div>
          </>
        )}

        {/* ══ L'ÉPREUVE ════════════════════════════════════════════════════ */}
        {etape === "epreuve" && question && (
          <>
            {/* La barre de tête : où on en est, et combien de temps il reste. */}
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-[#1d1c16] pb-2">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                Question {index + 1} / {questions.length}
              </p>
              <p
                className={[
                  "font-serif text-2xl font-black leading-none tabular-nums",
                  restant <= 300 ? "text-red-800" : "text-cyan-800",
                ].join(" ")}
              >
                {formatChrono(restant)}
              </p>
            </div>
            <div className="h-1 w-full bg-[#1d1c16]/10">
              <div
                className="h-1 bg-cyan-800 transition-all duration-500"
                style={{ width: `${((index + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* La diapositive. `key` sur l'index : React remonte le bloc à
                chaque question, ce qui rejoue l'animation de glissement vers
                la droite — le mouvement de la vraie épreuve. */}
            <div key={index} className="animate-[glisse_0.35s_ease-out]">
              <style>{`@keyframes glisse { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: translateX(0); } }`}</style>

              {/* NOTION ET MICRO-COMPÉTENCE APPARENTES (demande de Frédéric) :
                  la vraie épreuve ne dit jamais ce qu'elle teste. Ici si. */}
              <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-800">
                {question.themeLabel} · {question.notionLabel}
              </p>
              <p className="text-[11px] font-bold text-[#1d1c16]/70">
                Compétence testée : {question.microLabel}
              </p>

              <MarkdownMath className="mt-3 whitespace-pre-line font-serif text-2xl font-black leading-snug">
                {question.text}
              </MarkdownMath>

              {question.canvas && (
                <div className="mt-4 border border-[#1d1c16]/25 bg-white p-3">
                  <CanvasRenderer figure={question.canvas} />
                </div>
              )}

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {question.choices.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setChoix(c)}
                    className={[
                      "border-2 px-4 py-3 text-left text-sm font-black transition",
                      choix === c
                        ? "border-cyan-800 bg-cyan-800 text-[#f0fafc]"
                        : "border-[#1d1c16]/25 hover:border-[#1d1c16] hover:bg-[#1d1c16]/5",
                    ].join(" ")}
                  >
                    <MarkdownMath className="inline">{c}</MarkdownMath>
                  </button>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[#1d1c16]/25 pt-4">
                <button
                  type="button"
                  onClick={validerEtContinuer}
                  disabled={choix === null}
                  className="inline-flex items-center gap-2 rounded-sm bg-cyan-800 px-6 py-3 text-sm font-black text-[#f0fafc] transition hover:bg-[#1d1c16] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {index + 1 >= questions.length
                    ? "Terminer l'épreuve →"
                    : "Valider et continuer →"}
                </button>
                <p className="text-xs font-medium text-[#1d1c16]/70">
                  {choix === null
                    ? "Choisis une réponse pour continuer."
                    : "Attention : on ne revient pas en arrière."}
                </p>
              </div>
            </div>
          </>
        )}

        {/* ══ LE BILAN ═════════════════════════════════════════════════════ */}
        {etape === "bilan" && (
          <>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-800">
              Épreuve terminée
            </p>
            {/* Le titre suit le résultat : annoncer « ce qui a coincé » à un
                élève qui a bien réussi, c'est lui dire quelque chose de faux. */}
            <h1 className="mt-1 font-serif text-4xl font-black leading-none tracking-tight">
              {groupeDeMaitrise(totalJustes, totalPosees) === "satisfaisant"
                ? "Voilà où tu en es"
                : "Voilà ce qui a coincé"}
            </h1>
            {/* LE GROUPE DE MAÎTRISE D'ABORD, le décompte ensuite. C'est ce
                que rend l'évaluation officielle, et dans ces mots-là. */}
            {(() => {
              const g = GROUPES[groupeDeMaitrise(totalJustes, totalPosees)];
              return (
                <div className="mt-4 border-y-2 border-[#1d1c16] py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                    Sur l&apos;ensemble de l&apos;épreuve
                  </p>
                  <p
                    className={`mt-1 font-serif text-3xl font-black leading-none ${g.couleur}`}
                  >
                    {g.label}
                  </p>
                  {/* Deux temps : ce qui est là, puis ce qu'on fait. */}
                  <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#1d1c16]/70">
                    {g.constat}
                  </p>
                  <p className="mt-1 max-w-2xl text-sm font-black leading-6">
                    {g.geste}
                  </p>
                  <p className="mt-2 text-xs font-medium text-[#1d1c16]/70">
                    {totalJustes} bonnes réponses sur {totalPosees} — c&apos;est
                    le décompte, pas une note. Ce qui sert, c&apos;est le détail
                    ci-dessous.
                  </p>
                </div>
              );
            })()}

            {chronoEcoule && (
              <p className="mt-2 border-l-4 border-red-800 pl-3 text-sm font-medium leading-6 text-[#1d1c16]/70">
                Le temps s&apos;est écoulé avant la fin. Ce n&apos;est pas
                grave, mais regarde où tu en étais : le jour J, savoir se
                déplacer vite compte autant que savoir répondre.
              </p>
            )}

            {/* L'enregistrement : ce qui fait que le professeur verra la
                classe à la rentrée. Dit sobrement, jamais comme une
                récompense. */}
            {enregistrement === "ok" && (
              <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-cyan-800">
                ✅ Résultat enregistré
              </p>
            )}
            {enregistrement === "non-connecte" && (
              <p className="mt-2 text-sm font-medium leading-6 text-[#1d1c16]/70">
                Tu n&apos;es pas connecté : ce bilan reste sur cette page et
                disparaîtra en la quittant.{" "}
                <Link
                  href="/auth/signin-eleve"
                  className="font-black text-cyan-800 underline underline-offset-2"
                >
                  Se connecter
                </Link>{" "}
                permet de le garder — et ton professeur voit alors où en est sa
                classe.
              </p>
            )}
            {enregistrement !== null &&
              enregistrement !== "ok" &&
              enregistrement !== "non-connecte" && (
                <p className="mt-2 text-sm font-medium leading-6 text-red-800">
                  {enregistrement}
                </p>
              )}

            <div className="mt-6 space-y-5">
              {bilan.map((t) => {
                const rates = t.micros.filter((m) => !m.reussi);
                const tenus = t.micros.filter((m) => m.reussi);
                return (
                  <section key={t.themeId} className="border-2 border-[#1d1c16] p-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-serif text-xl font-black leading-tight">
                        {t.themeLabel}
                      </p>
                      <p className="flex items-baseline gap-3">
                        <span
                          className={`text-[11px] font-black uppercase tracking-[0.14em] ${GROUPES[groupeDeMaitrise(t.justes, t.total)].couleur}`}
                        >
                          {GROUPES[groupeDeMaitrise(t.justes, t.total)].label}
                        </span>
                        <span className="font-serif text-2xl font-black leading-none text-cyan-800">
                          {t.justes}/{t.total}
                        </span>
                      </p>
                    </div>
                    <div className="mt-2 h-2 w-full bg-[#1d1c16]/10">
                      <div
                        className="h-2 bg-cyan-800"
                        style={{ width: `${(t.justes / t.total) * 100}%` }}
                      />
                    </div>

                    <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                          ✅ Tu tiens
                        </p>
                        {tenus.length === 0 ? (
                          <p className="mt-1 text-xs font-medium italic text-[#1d1c16]/70">
                            Rien sur ce thème cette fois — c&apos;est justement
                            par là qu&apos;il faut reprendre.
                          </p>
                        ) : (
                          <ul className="mt-1 space-y-1">
                            {tenus.map((m, i) => (
                              <li
                                key={`${m.microId}-${i}`}
                                className="text-xs font-medium leading-5 text-[#1d1c16]/70"
                              >
                                {m.microLabel}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-800">
                          À retravailler
                        </p>
                        {rates.length === 0 ? (
                          <p className="mt-1 text-xs font-medium italic text-[#1d1c16]/70">
                            Rien à signaler. Le thème est solide.
                          </p>
                        ) : (
                          <ul className="mt-1 space-y-2">
                            {rates.map((m, i) => (
                              <li key={`${m.microId}-${i}`}>
                                <p className="text-xs font-black leading-5">
                                  {m.microLabel}
                                </p>
                                <p className="text-[11px] font-medium text-[#1d1c16]/70">
                                  {m.notionLabel}
                                </p>
                                <Link
                                  href={routeRemediation(
                                    config,
                                    m.notionId,
                                    m.microId,
                                  )}
                                  className="text-xs font-black text-cyan-800 hover:underline"
                                >
                                  S&apos;entraîner là-dessus →
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3 border-t-2 border-[#1d1c16] pt-4">
              <button
                type="button"
                onClick={commencerEpreuve}
                className="inline-flex items-center gap-2 rounded-sm bg-cyan-800 px-5 py-2.5 text-sm font-black text-[#f0fafc] transition hover:bg-[#1d1c16]"
              >
                Refaire · avec d&apos;autres questions →
              </button>
              <Link
                href={`/coach-ia/${config.matiere}?classe=${config.classeSource}`}
                className="inline-flex items-center gap-2 rounded-sm border-2 border-cyan-800 px-5 py-2.5 text-sm font-black text-cyan-800 transition hover:bg-cyan-800 hover:text-[#f0fafc]"
              >
                Ouvrir le coach de {config.labelSource} →
              </Link>
            </div>

            <p className="mt-4 text-xs font-medium italic leading-5 text-[#1d1c16]/70">
              Les questions déjà tombées sont mises de côté : en refaisant
              l&apos;épreuve, tu en auras d&apos;autres.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
