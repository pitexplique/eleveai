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
  construireBilanTests,
  groupeDeMaitrise,
  nbQuestions as compterQuestions,
  reponseTableau,
  routeRemediation,
  tirerEpreuve,
  type ConfigEpreuve,
  type QuestionEval,
} from "@/lib/eval-nationale/moteur";

import { FOND, accentDe } from "./couleurs";

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
  /**
   * LA COULEUR DE L'ÉPREUVE, la même que sa carte sur le hub (09/08). Elle
   * remplace le `cyan-800` unique du papier journal : quatre épreuves qui se
   * ressemblaient trait pour trait, on ne savait plus laquelle on passait.
   * Elle est posée en style INLINE — une classe Tailwind construite au vol
   * (`text-[${accent}]`) n'existerait pas dans le CSS généré.
   */
  const accent = accentDe(config.slug);
  /**
   * « de » + « le CM2 » se contracte en « du CM2 » ; « la 5ᵉ » ne bouge pas.
   * Sans ça, les deux épreuves de 6ᵉ affichaient « le programme de le CM2 » et
   * « ouvrir le coach de le CM2 » — visible dès la page d'accueil de l'épreuve.
   */
  const duSource = config.labelSource.startsWith("le ")
    ? `du ${config.labelSource.slice(3)}`
    : `de ${config.labelSource}`;
  const dureeMinutes = Math.round(config.dureeSecondes / 60);

  const [etape, setEtape] = useState<Etape>("accueil");

  // Prise en main
  const [indexPrise, setIndexPrise] = useState(0);
  const [choixPrise, setChoixPrise] = useState<string | null>(null);

  // Épreuve
  const [questions, setQuestions] = useState<QuestionEval[]>([]);
  const [index, setIndex] = useState(0);
  const [choix, setChoix] = useState<string | null>(null);
  // LE TABLEAU SÉRIE se répond ligne par ligne, pas d'un clic : on garde le
  // classement de chaque proposition jusqu'à la validation, qui le réduit à
  // une seule réponse — juste, ou fausse.
  const [grille, setGrille] = useState<Record<string, "vrai" | "faux">>({});
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
        // `cle` et non `itemId` : un gabarit produit plusieurs énoncés, on ne
        // met de côté que celui qui est tombé (voir moteur.ts).
        const maj = [...vus, ...questions.map((q) => q.cle)].slice(-1500);
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
    setGrille({});
    setReponses({});
    setRestant(epreuve.dureeSecondes);
    setChronoEcoule(false);
    setEnregistrement(null);
    // Sans ce remise à zéro, un deuxième passage ne serait jamais enregistré.
    dejaEnregistre.current = false;
    setEtape("epreuve");
  }

  function validerEtContinuer() {
    const q = questions[index];
    let retenue: string | null = choix;

    // ⚠️ TOUT JUSTE OU RIEN — la règle du sujet officiel, mot pour mot :
    // « L'élève doit avoir répondu correctement à toutes les lignes pour
    // qu'on considère qu'il a réussi la question. » On réduit donc la grille
    // à une réponse unique — la bonne si les quatre lignes sont justes, un
    // marqueur sinon. Le bilan et les seuils n'ont ainsi rien à connaître du
    // format : une question de tableau compte comme n'importe quelle autre.
    if (q?.format === "tableau") {
      retenue = reponseTableau(q, grille);
    }

    if (retenue === null) return;
    const suivant = { ...reponses, [index]: retenue };
    setReponses(suivant);
    setChoix(null);
    setGrille({});

    // `setReponses` juste au-dessus est appliqué avant le rendu du bilan
    // (React groupe les mises à jour d'un même gestionnaire) : la dernière
    // réponse est bien comptée.
    if (index + 1 >= questions.length) {
      cloturer(false);
      return;
    }

    setIndex((i) => i + 1);
  }

  // ─── LE RETOUR EN HAUT ────────────────────────────────────────────────────
  // Il se faisait dans le clic sur « Valider », donc AVANT que React n'ait
  // posé la question suivante : le défilement visait l'ancienne page. Et il
  // visait le haut du bloc, que l'en-tête collant du site (69 px) recouvre —
  // l'élève arrivait sur une question dont il ne voyait ni le numéro, ni le
  // chrono, ni la barre d'avancement. Deux corrections : ici, après le rendu ;
  // et `scroll-mt-24` sur l'ancre, pour passer sous l'en-tête.
  // Pas de `smooth` : la question glisse déjà (animation « glisse »), et une
  // page qui défile en même temps que la question entre, ça se brouille.
  useEffect(() => {
    if (etape === "accueil") return;
    hautRef.current?.scrollIntoView({ block: "start" });
  }, [etape, index]);

  const bilan = useMemo(
    () =>
      etape === "bilan" ? construireBilan(config, questions, reponses) : [],
    [etape, config, questions, reponses],
  );

  // LES TESTS SPÉCIFIQUES — vides pour les épreuves qui n'en déclarent pas.
  // ⚠️ Ils ne s'ajoutent PAS au décompte : leurs questions sont déjà comptées
  // dans les domaines. Ce sont les mêmes réponses, relues autrement.
  const bilanTests = useMemo(
    () =>
      etape === "bilan"
        ? construireBilanTests(config, questions, reponses)
        : [],
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
          groupe: groupeDeMaitrise(t.justes, t.total, t.seuils),
        })),
        // LES TESTS SPÉCIFIQUES PARTENT AUSSI EN BASE, dans un champ à part :
        // ce sont eux que le professeur lit en premier dans la restitution
        // officielle, et le tableau de bord d'établissement s'appuiera dessus.
        tests: bilanTests.map((t) => ({
          id: t.themeId,
          label: t.themeLabel,
          justes: t.justes,
          total: t.total,
          groupe: groupeDeMaitrise(t.justes, t.total, t.seuils),
        })),
        micros: bilan.flatMap((t) => t.micros),
      },
    }).then(({ error }) => {
      setEnregistrement(error ? error.message : "ok");
    });
  }, [
    etape,
    bilan,
    bilanTests,
    eleve,
    totalJustes,
    totalPosees,
    restant,
    chronoEcoule,
    config,
  ]);

  const question = questions[index];

  // Un tableau série ne se valide pas tant qu'il reste une ligne sans réponse.
  // C'est la même exigence que pour les autres formats, où l'on ne passe pas
  // sans avoir choisi : ici, choisir, c'est classer les quatre lignes.
  const peutValider =
    question?.format === "tableau"
      ? question.choices.every((c) => grille[c])
      : choix !== null;

  // ─── L'ÉCOUTE DES SUPPORTS ORAUX ────────────────────────────────────────
  // Le compteur suit le SUPPORT, pas la question : les cinq questions d'un
  // même enregistrement partagent les mêmes écoutes. On repart à zéro quand
  // l'épreuve change de support.
  const supportOral = question?.support?.oral ? question.support : null;
  const [ecoutesFaites, setEcoutesFaites] = useState(0);
  const [supportEcoute, setSupportEcoute] = useState<string | null>(null);
  const [sansVoix, setSansVoix] = useState(false);

  useEffect(() => {
    if (!supportOral) return;
    if (supportEcoute !== supportOral.titre) {
      setSupportEcoute(supportOral.titre);
      setEcoutesFaites(0);
    }
  }, [supportOral, supportEcoute]);

  const ecoutesRestantes = supportOral
    ? Math.max(0, (supportOral.oral?.ecoutes ?? 0) - ecoutesFaites)
    : 0;

  function ecouter() {
    if (!supportOral || ecoutesRestantes <= 0) return;
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSansVoix(true);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(supportOral.texte);
    u.lang = "fr-FR";
    u.rate = 0.95; // débit d'une émission, pas d'une dictée
    window.speechSynthesis.speak(u);
    setEcoutesFaites((n) => n + 1);
  }

  return (
    <main className="min-h-screen px-4 pb-16 pt-8 sm:px-6 lg:px-8" style={FOND}>
      <div ref={hautRef} className="mx-auto max-w-3xl scroll-mt-24">
        {/* ══ ACCUEIL ══════════════════════════════════════════════════════ */}
        {etape === "accueil" && (
          <>
            <Link
              href="/evaluation-nationale-college"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/60 shadow-sm ring-1 ring-[#1d1c16]/10 transition hover:bg-white"
            >
              ← Les évaluations du collège
            </Link>

            <header className="mt-4">
              <p
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-white"
                style={{ backgroundColor: accent }}
              >
                🎓 Épreuve blanche · {classeLabel} · {config.matiereLabel}
              </p>
              {/* Même surligneur que le hub, dans la couleur de l'épreuve —
                  c'est le fil qui relie la carte cliquée à la page ouverte.
                  ⚠️ `boxDecorationBreak: clone` : sans lui, un titre qui passe
                  à la ligne ne reçoit son trait que sur le dernier fragment. */}
              <h1 className="mt-2 font-serif text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                <span
                  className="px-1"
                  style={{
                    backgroundImage: `linear-gradient(${accent}33, ${accent}33)`,
                    backgroundSize: "100% 0.3em",
                    backgroundPosition: "0 88%",
                    backgroundRepeat: "no-repeat",
                    WebkitBoxDecorationBreak: "clone",
                    boxDecorationBreak: "clone",
                  }}
                >
                  L&apos;évaluation nationale, en vrai
                </span>
              </h1>
              <p className="mt-4 text-sm font-medium leading-6 text-[#1d1c16]/75">
                Même forme que le jour J : les questions défilent une par une,
                on ne revient pas en arrière, et le temps court.
              </p>
              {/* LE TEMPS, DIT SANS L'ARRONDIR. Deux cas, et la différence
                  compte : quand nous avons les effectifs officiels (6ᵉ maths,
                  document DEPP), l'épreuve reprend le volume ET la durée du
                  jour J ; sinon, on tient la cadence sur moins de questions —
                  et on l'écrit plutôt que de laisser croire au contraire. */}
              <p className="mt-2 text-sm font-medium leading-6 text-[#1d1c16]/75">
                {config.volumeOfficiel ? (
                  <>
                    Le jour J : {NB_QUESTIONS} questions en {dureeMinutes}{" "}
                    minutes. Ici, les mêmes — c&apos;est l&apos;épreuve entière,
                    au tempo réel, moins de cinquante secondes par question.
                  </>
                ) : (
                  <>
                    Le jour J, tu auras à peu près une minute par question. Ici
                    aussi : {NB_QUESTIONS} questions, {dureeMinutes} minutes. La
                    vraie épreuve en pose simplement beaucoup plus — ce
                    qu&apos;on reproduit, c&apos;est le rythme, pas le nombre.
                  </>
                )}
              </p>
            </header>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                {
                  chiffre: String(dureeMinutes),
                  unite: "minutes",
                  quoi: config.volumeOfficiel
                    ? "la durée officielle"
                    : "une par question",
                },
                {
                  chiffre: String(NB_QUESTIONS),
                  unite: "questions",
                  quoi: config.volumeOfficiel
                    ? `en ${config.themes.length} domaines`
                    : `en ${config.themes.length} thèmes`,
                },
                { chiffre: "0", unite: "note", quoi: "un profil, pas un chiffre" },
              ].map((c) => (
                <div
                  key={c.unite}
                  className="rounded-2xl border-2 bg-white/85 p-3 text-center shadow-[0_8px_24px_-14px_rgba(29,28,22,0.5)]"
                  style={{ borderColor: accent }}
                >
                  <p
                    className="font-serif text-4xl font-black leading-none"
                    style={{ color: accent }}
                  >
                    {c.chiffre}
                  </p>
                  <p className="mt-1 text-sm font-black">{c.unite}</p>
                  <p className="text-xs font-medium text-[#1d1c16]/70">{c.quoi}</p>
                </div>
              ))}
            </div>

            <section className="mt-5 rounded-2xl bg-white/70 p-4 ring-1 ring-[#1d1c16]/10">
              <p
                className="text-[10px] font-black uppercase tracking-[0.16em]"
                style={{ color: accent }}
              >
                Les thèmes de l&apos;épreuve
              </p>
              <div className="mt-2 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {config.themes.map((t) => (
                  <div key={t.id} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className="w-1 shrink-0 self-stretch rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    <div>
                      <p className="font-serif text-[15px] font-black leading-snug">
                        {t.label}
                      </p>
                      <p className="mt-0.5 text-xs font-medium leading-5 text-[#1d1c16]/70">
                        {t.quoi}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Ce que la vraie ne dit pas, et qui est la raison d'être de
                celle-ci. Le bloc est PLEIN, pas teinté : c'est la promesse de
                la page, elle mérite de se voir depuis le haut de l'écran. */}
            <div
              className="mt-5 rounded-2xl p-4 text-white sm:p-5"
              style={{ backgroundColor: accent }}
            >
              <p className="font-serif text-lg font-black leading-tight">
                À la fin, tu sauras exactement ce qui a coincé
              </p>
              <p className="mt-1 text-sm font-medium leading-6 text-white/85">
                Pas une note. Le nom de chaque compétence testée, celles que tu
                tiens et celles à retravailler — et le lien pour t&apos;y
                mettre tout de suite. La vraie épreuve, elle, ne te le dira
                jamais.
              </p>
            </div>

            {/* LA CLASSE TESTÉE N'EST PAS LA SIENNE — c'est le point que les
                élèves comprennent mal, et qui change tout à leur préparation. */}
            <p className="mt-5 text-sm font-medium leading-6 text-[#1d1c16]/75">
              Les questions portent sur le programme {duSource} :
              l&apos;évaluation de rentrée mesure ce que
              tu emportes de l&apos;an dernier, pas ce que tu n&apos;as pas
              encore appris en {classeLabel}.
            </p>

            {/* CE QU'ON NE COUVRE PAS, dit avant de commencer. Taire les
                domaines manquants laisserait croire qu'on reproduit toute
                l'épreuve — on ne promet que ce qui existe. */}
            {config.reserve && (
              <p className="mt-3 rounded-xl border-l-4 border-[#1d1c16]/25 bg-white/60 py-2 pl-3 pr-3 text-sm font-medium leading-6 text-[#1d1c16]/75">
                {config.reserve}
              </p>
            )}

            <button
              type="button"
              onClick={commencerPriseEnMain}
              className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-black text-white shadow-sm transition hover:brightness-110"
              style={{ backgroundColor: accent }}
            >
              Commencer par la prise en main →
            </button>
          </>
        )}

        {/* ══ PRISE EN MAIN ════════════════════════════════════════════════ */}
        {etape === "prise-en-main" && (
          <>
            <p
              className="inline-flex rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-white"
              style={{ backgroundColor: accent }}
            >
              Prise en main · {indexPrise + 1} / {PRISE_EN_MAIN.length}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-black leading-tight">
              D&apos;abord, on vérifie que tu es à l&apos;aise
            </h1>
            <p className="mt-2 text-sm font-medium leading-6 text-[#1d1c16]/75">
              Ces questions ne comptent pas. Elles servent à te montrer comment
              répondre — c&apos;est exactement ce que fait la vraie évaluation
              avant de commencer.
            </p>

            {/* LA QUESTION SUR CARTE BLANCHE OPAQUE, pas sur le fond : le
                quadrillage et les lavis restent AUTOUR de ce qu'on lit. C'est
                la règle de toutes les étapes qui demandent de répondre. */}
            <div
              className="mt-5 rounded-2xl border-2 bg-white p-4 shadow-[0_10px_28px_-16px_rgba(29,28,22,0.55)] sm:p-5"
              style={{ borderColor: accent }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/55">
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
                      "rounded-xl border-2 px-4 py-3 text-left text-sm font-black transition",
                      choixPrise === c
                        ? "text-white"
                        : "border-[#1d1c16]/20 hover:border-[#1d1c16]/50 hover:bg-[#1d1c16]/5",
                    ].join(" ")}
                    style={
                      choixPrise === c
                        ? { backgroundColor: accent, borderColor: accent }
                        : undefined
                    }
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
                  <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/75">
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
                    className="mt-3 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white shadow-sm transition hover:brightness-110"
                    style={{ backgroundColor: accent }}
                  >
                    {indexPrise + 1 < PRISE_EN_MAIN.length
                      ? "Continuer →"
                      : `Je suis prêt · démarrer les ${dureeMinutes} minutes →`}
                  </button>
                </div>
              )}
            </div>

            {/* L'AVERTISSEMENT RESTE ROUGE, il ne prend pas la couleur de
                l'épreuve : « on ne revient jamais en arrière » doit se lire
                comme un avertissement sur les quatre, pas comme un élément de
                décor qui change de teinte selon la matière. */}
            <div className="mt-5 rounded-xl border-l-4 border-red-800 bg-white/70 py-2.5 pl-3 pr-3">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-red-800">
                À savoir avant de commencer
              </p>
              <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/75">
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
            {/* La barre de tête : où on en est, et combien de temps il reste.
                Elle prend sa propre carte blanche — sur le papier journal un
                filet suffisait à la détacher, sur un fond quadrillé non.
                ⛔ PAS de `sticky` : l'en-tête du site est déjà collant et sa
                hauteur bouge quand « Installer l'app » se ferme — la barre
                passerait dessous. Même piège que l'encart du compte.
                Le chrono garde son rouge sous 5 minutes, quelle que soit la
                couleur de l'épreuve : c'est une alerte, pas une décoration. */}
            <div className="rounded-xl bg-white/90 px-3 py-2.5 shadow-[0_6px_18px_-14px_rgba(29,28,22,0.6)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/55">
                  Question {index + 1} / {questions.length}
                </p>
                <p
                  className="font-serif text-2xl font-black leading-none tabular-nums"
                  style={{ color: restant <= 300 ? "#991b1b" : accent }}
                >
                  {formatChrono(restant)}
                </p>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#1d1c16]/10">
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${((index + 1) / questions.length) * 100}%`,
                    backgroundColor: accent,
                  }}
                />
              </div>
            </div>

            {/* La diapositive. `key` sur l'index : React remonte le bloc à
                chaque question, ce qui rejoue l'animation de glissement vers
                la droite — le mouvement de la vraie épreuve. */}
            <div key={index} className="animate-[glisse_0.35s_ease-out]">
              <style>{`@keyframes glisse { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: translateX(0); } }`}</style>

              {/* NOTION ET MICRO-COMPÉTENCE APPARENTES (demande de Frédéric) :
                  la vraie épreuve ne dit jamais ce qu'elle teste. Ici si. */}
              <p
                className="mt-4 text-[10px] font-black uppercase tracking-[0.16em]"
                style={{ color: accent }}
              >
                {question.themeLabel} · {question.notionLabel}
              </p>
              <p className="text-[11px] font-bold text-[#1d1c16]/70">
                Compétence testée : {question.microLabel}
              </p>

              {/* LE TEXTE SUPPORT, quand la question en dépend. Il reste
                  affiché pendant toute la série tirée dessus — l'épreuve
                  officielle laisse le texte sous les yeux, on ne teste pas la
                  mémoire mais la lecture. Hauteur bornée avec défilement
                  propre : sur téléphone, un texte de 200 mots repousserait
                  les propositions hors de l'écran. */}
              {question.support && !question.support.oral && (
                <figure
                  className="mt-3 rounded-2xl border-2 bg-white p-4"
                  style={{ borderColor: accent }}
                >
                  <figcaption
                    className="text-[10px] font-black uppercase tracking-[0.16em]"
                    style={{ color: accent }}
                  >
                    {question.support.kicker}
                  </figcaption>
                  <p className="mt-1 font-serif text-lg font-black leading-tight">
                    {question.support.titre}
                  </p>
                  <div className="mt-2 max-h-[42vh] overflow-y-auto whitespace-pre-line font-serif text-[15px] leading-7">
                    {question.support.texte}
                  </div>
                  <p className="mt-2 border-t border-[#1d1c16]/15 pt-1.5 text-[11px] font-medium italic text-[#1d1c16]/55">
                    {question.support.source}
                  </p>
                </figure>
              )}

              {/* LE SUPPORT ORAL — on N'AFFICHE PAS le texte : c'est tout
                  l'objet du domaine. L'élève écoute, puis répond de mémoire,
                  avec un nombre d'écoutes limité comme le jour J. Le compteur
                  vaut pour les cinq questions du même enregistrement : il ne
                  se remet à zéro qu'en changeant de support. */}
              {question.support?.oral && (
                <div
                  className="mt-3 rounded-2xl border-2 bg-white p-4"
                  style={{ borderColor: accent }}
                >
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.16em]"
                    style={{ color: accent }}
                  >
                    {question.support.kicker}
                  </p>
                  <p className="mt-1 font-serif text-lg font-black leading-tight">
                    🎧 {question.support.titre}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/75">
                    Écoute bien : le texte ne s&apos;affiche pas. Tu réponds
                    ensuite de mémoire, comme le jour J.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={ecouter}
                      disabled={ecoutesRestantes <= 0}
                      className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                      style={{ backgroundColor: accent }}
                    >
                      🔊 Écouter l&apos;enregistrement
                    </button>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#1d1c16]/55">
                      {ecoutesRestantes > 0
                        ? `${ecoutesRestantes} écoute${ecoutesRestantes > 1 ? "s" : ""} restante${ecoutesRestantes > 1 ? "s" : ""}`
                        : "Plus d'écoute disponible"}
                    </p>
                  </div>
                  {sansVoix && (
                    <p className="mt-2 border-l-4 border-red-800 pl-3 text-sm font-medium leading-6 text-[#1d1c16]/75">
                      Ton navigateur ne sait pas lire à voix haute : ces
                      questions ne peuvent pas être posées correctement chez
                      toi. Réponds au mieux, elles compteront à part.
                    </p>
                  )}
                </div>
              )}

              {/* ⭐ LA QUESTION ET SES PROPOSITIONS SUR BLANC OPAQUE. Le fond
                  quadrillé et ses lavis restent AUTOUR : pendant une épreuve
                  chronométrée, ce qu'on lit ne se lit pas sur un décor. C'est
                  la seule concession du « fond fun » — et elle n'en est pas
                  une, la couleur revient par le cadre et le bouton. */}
              <div className="mt-3 rounded-2xl bg-white p-4 shadow-[0_10px_28px_-16px_rgba(29,28,22,0.55)] sm:p-5">
                <MarkdownMath className="whitespace-pre-line font-serif text-2xl font-black leading-snug">
                  {question.text}
                </MarkdownMath>

                {question.canvas && (
                  <div className="mt-4 rounded-xl border border-[#1d1c16]/15 bg-white p-3">
                    <CanvasRenderer figure={question.canvas} />
                  </div>
                )}

                {/* LES DEUX FORMES DU SUJET OFFICIEL. Le même QCM, affiché
                    « sous la forme d'une liste de cases à cocher » ou « sous la
                    forme d'un menu déroulant ». On rencontre les deux ici pour
                    ne pas les découvrir le jour J. */}
                {question.format === "tableau" ? (
                  <div className="mt-4 overflow-hidden rounded-xl border-2 border-[#1d1c16]/20">
                    <p className="bg-[#1d1c16]/5 px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#1d1c16]/70">
                      Cocher une réponse par ligne — il faut les quatre justes
                    </p>
                    {question.choices.map((c, rang) => (
                      <div
                        key={c}
                        className={[
                          "flex flex-wrap items-center gap-x-3 gap-y-2 px-3 py-2.5",
                          rang > 0 ? "border-t border-[#1d1c16]/12" : "",
                        ].join(" ")}
                      >
                        <span className="min-w-0 flex-1 text-sm font-black">
                          <MarkdownMath className="inline">{c}</MarkdownMath>
                        </span>
                        <span className="flex shrink-0 gap-2">
                          {(["vrai", "faux"] as const).map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() =>
                                setGrille((g) => ({ ...g, [c]: v }))
                              }
                              className={[
                                "rounded-lg border-2 px-3 py-1.5 text-xs font-black uppercase tracking-[0.1em] transition",
                                grille[c] === v
                                  ? "text-white"
                                  : "border-[#1d1c16]/20 hover:border-[#1d1c16]/50 hover:bg-[#1d1c16]/5",
                              ].join(" ")}
                              style={
                                grille[c] === v
                                  ? {
                                      backgroundColor: accent,
                                      borderColor: accent,
                                    }
                                  : undefined
                              }
                            >
                              {v}
                            </button>
                          ))}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : question.format === "liste" ? (
                  <div className="mt-4">
                    <label
                      className="flex flex-wrap items-center gap-2 text-sm font-black"
                      htmlFor="reponse-liste"
                    >
                      Choisir la réponse
                      <select
                        id="reponse-liste"
                        value={choix ?? ""}
                        onChange={(e) => setChoix(e.target.value || null)}
                        className="rounded-xl border-2 bg-white px-3 py-2.5 text-sm font-black"
                        style={{
                          borderColor: choix ? accent : "rgba(29,28,22,0.2)",
                        }}
                      >
                        {/* « --- laisser vide --- » : c'est l'option qu'affiche
                            le sujet officiel, et ne pas la proposer changerait
                            l'épreuve — un élève doit pouvoir ne pas répondre. */}
                        <option value="">— laisser vide —</option>
                        {question.choices.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                ) : (
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {question.choices.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setChoix(c)}
                        className={[
                          "rounded-xl border-2 px-4 py-3 text-left text-sm font-black transition",
                          choix === c
                            ? "text-white"
                            : "border-[#1d1c16]/20 hover:border-[#1d1c16]/50 hover:bg-[#1d1c16]/5",
                        ].join(" ")}
                        style={
                          choix === c
                            ? { backgroundColor: accent, borderColor: accent }
                            : undefined
                        }
                      >
                        <MarkdownMath className="inline">{c}</MarkdownMath>
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[#1d1c16]/15 pt-4">
                  <button
                    type="button"
                    onClick={validerEtContinuer}
                    disabled={!peutValider}
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-black text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ backgroundColor: accent }}
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
            </div>
          </>
        )}

        {/* ══ LE BILAN ═════════════════════════════════════════════════════ */}
        {etape === "bilan" && (
          <>
            <p
              className="inline-flex rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-white"
              style={{ backgroundColor: accent }}
            >
              Épreuve terminée
            </p>
            {/* Le titre suit le résultat : annoncer « ce qui a coincé » à un
                élève qui a bien réussi, c'est lui dire quelque chose de faux. */}
            <h1 className="mt-2 font-serif text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              {groupeDeMaitrise(totalJustes, totalPosees) === "satisfaisant"
                ? "Voilà où tu en es"
                : "Voilà ce qui a coincé"}
            </h1>
            {/* LE GROUPE DE MAÎTRISE D'ABORD, le décompte ensuite. C'est ce
                que rend l'évaluation officielle, et dans ces mots-là. */}
            {(() => {
              const g = GROUPES[groupeDeMaitrise(totalJustes, totalPosees)];
              return (
                <div className="mt-4 rounded-2xl bg-white/90 p-4 shadow-[0_10px_28px_-16px_rgba(29,28,22,0.55)] sm:p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/55">
                    Sur l&apos;ensemble de l&apos;épreuve
                  </p>
                  <p
                    className={`mt-1 font-serif text-3xl font-black leading-none ${g.couleur}`}
                  >
                    {g.label}
                  </p>
                  {/* Deux temps : ce qui est là, puis ce qu'on fait. */}
                  <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#1d1c16]/75">
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
              <p className="mt-2 rounded-xl border-l-4 border-red-800 bg-white/70 py-2 pl-3 pr-3 text-sm font-medium leading-6 text-[#1d1c16]/75">
                Le temps s&apos;est écoulé avant la fin. Ce n&apos;est pas
                grave, mais regarde où tu en étais : le jour J, savoir se
                déplacer vite compte autant que savoir répondre.
              </p>
            )}

            {/* L'enregistrement : ce qui fait que le professeur verra la
                classe à la rentrée. Dit sobrement, jamais comme une
                récompense. */}
            {enregistrement === "ok" && (
              <p
                className="mt-2 text-xs font-black uppercase tracking-[0.14em]"
                style={{ color: accent }}
              >
                ✅ Résultat enregistré
              </p>
            )}
            {enregistrement === "non-connecte" && (
              <p className="mt-2 text-sm font-medium leading-6 text-[#1d1c16]/75">
                Tu n&apos;es pas connecté : ce bilan reste sur cette page et
                disparaîtra en la quittant.{" "}
                <Link
                  href="/auth/signin-eleve"
                  className="font-black underline underline-offset-2"
                  style={{ color: accent }}
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

            {/* ══ LES TESTS SPÉCIFIQUES ══════════════════════════════════════
                Ils viennent AVANT les domaines, comme dans la restitution
                officielle : c'est la première chose que lit le professeur.
                Et ils ne posent aucune question de plus — ce sont les mêmes
                réponses, relues en travers des domaines. On le dit, sinon
                l'élève croit avoir passé deux épreuves. */}
            {bilanTests.length > 0 && (
              <div className="mt-6">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/55">
                  Les deux tests de l&apos;épreuve officielle
                </p>
                <p className="mt-1 max-w-2xl text-xs font-medium leading-5 text-[#1d1c16]/70">
                  Pas de nouvelles questions : ce sont tes réponses, relues
                  autrement. Un élève peut tenir en nombres et calculs et
                  flancher en automatismes — cela veut dire que ce qui manque,
                  ce sont des réflexes, pas des connaissances.
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {bilanTests.map((t) => {
                    const g = GROUPES[
                      groupeDeMaitrise(t.justes, t.total, t.seuils)
                    ];
                    return (
                      <div
                        key={t.themeId}
                        className="rounded-2xl bg-white/90 p-4 shadow-[0_8px_24px_-16px_rgba(29,28,22,0.5)]"
                      >
                        <p className="font-serif text-lg font-black leading-tight">
                          {t.themeLabel}
                        </p>
                        <p className="mt-2 flex items-baseline justify-between gap-3">
                          <span
                            className={`text-[11px] font-black uppercase tracking-[0.14em] ${g.couleur}`}
                          >
                            {g.label}
                          </span>
                          <span
                            className="font-serif text-2xl font-black leading-none"
                            style={{ color: accent }}
                          >
                            {t.justes}/{t.total}
                          </span>
                        </p>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#1d1c16]/10">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${(t.justes / t.total) * 100}%`,
                              backgroundColor: accent,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-6 space-y-5">
              {bilan.map((t) => {
                const rates = t.micros.filter((m) => !m.reussi);
                const tenus = t.micros.filter((m) => m.reussi);
                return (
                  <section
                    key={t.themeId}
                    className="overflow-hidden rounded-2xl border-2 bg-white/90 p-4 shadow-[0_8px_24px_-16px_rgba(29,28,22,0.5)]"
                    style={{ borderColor: accent }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-serif text-xl font-black leading-tight">
                        {t.themeLabel}
                      </p>
                      <p className="flex items-baseline gap-3">
                        {/* ⛔ La couleur du GROUPE DE MAÎTRISE ne prend pas
                            l'accent de l'épreuve : « Fragile » doit se lire
                            pareil sur les quatre. C'est un résultat, pas une
                            rubrique. */}
                        <span
                          className={`text-[11px] font-black uppercase tracking-[0.14em] ${GROUPES[groupeDeMaitrise(t.justes, t.total, t.seuils)].couleur}`}
                        >
                          {
                            GROUPES[
                              groupeDeMaitrise(t.justes, t.total, t.seuils)
                            ].label
                          }
                        </span>
                        <span
                          className="font-serif text-2xl font-black leading-none"
                          style={{ color: accent }}
                        >
                          {t.justes}/{t.total}
                        </span>
                      </p>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#1d1c16]/10">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(t.justes / t.total) * 100}%`,
                          backgroundColor: accent,
                        }}
                      />
                    </div>

                    <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/55">
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
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-red-800">
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
                                  className="text-xs font-black hover:underline"
                                  style={{ color: accent }}
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

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={commencerEpreuve}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white shadow-sm transition hover:brightness-110"
                style={{ backgroundColor: accent }}
              >
                Refaire · avec d&apos;autres questions →
              </button>
              <Link
                href={`/coach-ia/${config.matiere}?classe=${config.classeSource}`}
                className="inline-flex items-center gap-2 rounded-xl border-2 bg-white/80 px-5 py-3 text-sm font-black transition hover:bg-white"
                style={{ borderColor: accent, color: accent }}
              >
                Ouvrir le coach {duSource} →
              </Link>
            </div>

            <p className="mt-4 rounded-xl bg-white/60 p-3 text-xs font-medium italic leading-5 text-[#1d1c16]/70">
              Les questions déjà tombées sont mises de côté : en refaisant
              l&apos;épreuve, tu en auras d&apos;autres.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
