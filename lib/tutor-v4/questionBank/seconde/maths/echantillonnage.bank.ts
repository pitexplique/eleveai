// lib/tutor-v4/questionBank/seconde/maths/echantillonnage.bank.ts
//
// Chapitre : Echantillonnage et simulation (notion echantillonnage_simulation)
//
// REGLE DE DESIGN (option D) : fixed=remarquable/definition, templates dominants,
// QCM-raisonnement, short numerique (calculatrice dispo), pas d'open.
// Contexte concret recurrent : pesee d'un echantillon de mimolettes (paquet annonce
// 200 g, echantillon de 10 -> moyenne 207 g, ecart type 1 g) -> fluctuation. Theme cuisine.
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   echantillon_fluctuation        — Fluctuation d'echantillonnage
//   echantillon_loi_grands_nombres — Loi des grands nombres (estimation par frequence)
//   simulation_frequence           — Simuler et observer les frequences
//   echantillon_interpreter        — Interpreter un resultat de simulation

import type { DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { PRENOMS } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

/* =========================================================================
   ⛔⛔ 15/10/2026 — « DES QUESTIONS REVIENNENT », L'ÉCHANTILLONNAGE DE 2de.
   Mesuré avant (scripts/mesurer-squelettes-coach.ts seconde
   echantillonnage_simulation) : 7 à 9 squelettes par micro, 15 à 18
   répétitions sur 20. Les gabarits tiraient un NOMBRE dans une phrase fixe.
   Même méthode que les probabilités de 3e (dd5e9f75) : chaque générateur
   compose une SITUATION à deux issues (pièce, roue de la kermesse, sac de
   billes, dés à 4, 10 ou 20 faces, cartes, graines de letchi, car jaune,
   lancers francs, tombola, pluie à Cilaos, bonbons coco, surf à Saint-Leu…)
   × une TOURNURE × des nombres tirés. Tailles d'échantillon = carrés
   parfaits (25, 100, 400, 625, 1 600, 2 500, 10 000) : 1/√n tombe juste.
========================================================================= */

type Q = TutorGeneratedQuestionV4;

const ri = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
function melange<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
/** Arrondi propre (pas de 0,30000000004). */
const r4 = (x: number) => Math.round(x * 10000) / 10000;
/** Décimal en LaTeX : 0{,}25. */
const fx = (x: number) => String(r4(x)).replace(".", "{,}");
/** Décimal en clair : 0,25. */
const fc = (x: number) => String(r4(x)).replace(".", ",");
/** Entier en LaTeX : 10\,000 au-delà de 9 999. */
const nb = (n: number) => (n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : String(n));
/** Réponses acceptées d'un décimal : « 0,25 » et « 0.25 ». */
const dec = (x: number) => [fc(x), String(r4(x))];
/** QCM : le bon choix + 3 leurres DISTINCTS du bon (au texte), mélangés. */
function qcm(bon: string, leurres: string[]): { choices: string[]; expected: string[] } {
  const pris: string[] = [];
  for (const l of leurres) if (l !== bon && !pris.includes(l) && pris.length < 3) pris.push(l);
  return { choices: melange([bon, ...pris]), expected: [bon] };
}
/** QCM numérique : leurres de VALEUR différente du bon et entre eux. */
function qcmNum(bon: number, leurres: number[], f: (x: number) => string) {
  const vals: number[] = [];
  for (const l of leurres) if (l >= 0 && [bon, ...vals].every((v) => Math.abs(v - l) > 1e-9) && vals.length < 3) vals.push(r4(l));
  return qcm(f(bon), vals.map(f));
}
/** Tailles d'échantillon à racine entière, et 1/√n. */
const TAILLES = [25, 100, 400, 625, 1600, 2500, 10000] as const;
const inv = (n: number) => r4(1 / Math.sqrt(n));
const prenom = () => pick(PRENOMS).nom;

/** Une expérience à deux issues répétée n fois. */
type Sit = {
  /** Décrit les n essais (sans point final). */
  decor: (n: number) => string;
  /** L'issue « succès », en guillemets. */
  ev: string;
  p: number;
  /** Le mot des essais, au pluriel : « lancers », « graines »… */
  essais: string;
};
const SITS: (() => Sit)[] = [
  () => ({ decor: (n) => `${prenom()} lance $${nb(n)}$ fois une pièce équilibrée`, ev: "« pile »", p: 0.5, essais: "lancers" }),
  () => {
    const k = ri(2, 8);
    return { decor: (n) => `Au stand de la kermesse, on fait tourner $${nb(n)}$ fois une roue de $10$ secteurs égaux, dont $${k}$ gagnants`, ev: "« secteur gagnant »", p: k / 10, essais: "tours de roue" };
  },
  () => {
    const r = pick([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16]);
    return { decor: (n) => `${prenom()} tire $${nb(n)}$ fois une bille, avec remise, dans un sac de $20$ billes dont $${r}$ rouges`, ev: "« bille rouge »", p: r / 20, essais: "tirages" };
  },
  () => ({ decor: (n) => `Pour un jeu de société, ${prenom()} lance $${nb(n)}$ fois un dé équilibré à $4$ faces`, ev: "« 4 »", p: 0.25, essais: "lancers" }),
  () => {
    const m = ri(1, 9);
    return { decor: (n) => `${prenom()} lance $${nb(n)}$ fois un dé équilibré à $10$ faces numérotées de $1$ à $10$`, ev: `« ${m} ou moins »`, p: m / 10, essais: "lancers" };
  },
  () => {
    const m = pick([4, 5, 6, 8, 10, 12, 14, 15, 16]);
    return { decor: (n) => `Pour un jeu de rôle, ${prenom()} lance $${nb(n)}$ fois un dé équilibré à $20$ faces`, ev: `« ${m} ou moins »`, p: m / 20, essais: "lancers" };
  },
  () => {
    const c = pick([["« cœur »", 0.25], ["« carte rouge »", 0.5], ["« as »", 0.125]] as const);
    return { decor: (n) => `${prenom()} tire $${nb(n)}$ fois une carte, avec remise, dans un jeu de $32$ cartes`, ev: c[0], p: c[1], essais: "tirages" };
  },
  () => ({ decor: (n) => `Un pépiniériste de Saint-Pierre sème $${nb(n)}$ graines de letchi`, ev: "« la graine germe »", p: pick([0.6, 0.7, 0.75, 0.8, 0.85, 0.9]), essais: "graines" }),
  () => ({ decor: (n) => `On relève $${nb(n)}$ trajets du car jaune entre Saint-Denis et Saint-Benoît`, ev: "« le car est en retard »", p: pick([0.1, 0.15, 0.2, 0.25, 0.3]), essais: "trajets" }),
  () => ({ decor: (n) => `${prenom()} tire $${nb(n)}$ lancers francs à l'entraînement de basket`, ev: "« panier réussi »", p: pick([0.6, 0.65, 0.7, 0.75, 0.8]), essais: "lancers francs" }),
  () => ({ decor: (n) => `À la tombola du lycée, on regarde $${nb(n)}$ tickets pris au hasard`, ev: "« ticket gagnant »", p: pick([0.05, 0.1, 0.2, 0.25]), essais: "tickets" }),
  () => ({ decor: (n) => `On observe la météo à Cilaos pendant $${nb(n)}$ jours de saison des pluies`, ev: "« il pleut »", p: pick([0.4, 0.45, 0.5, 0.55, 0.6]), essais: "jours" }),
  () => ({ decor: (n) => `Au marché de Saint-Paul, ${prenom()} prend $${nb(n)}$ bonbons coco au hasard dans un grand bocal`, ev: "« bonbon coco rose »", p: pick([0.3, 0.35, 0.4, 0.45]), essais: "bonbons" }),
  () => ({ decor: (n) => `On interroge au hasard $${nb(n)}$ élèves des lycées de l'île`, ev: "« l'élève est gaucher »", p: pick([0.1, 0.12, 0.13]), essais: "élèves" }),
  () => ({ decor: (n) => `À Saint-Leu, ${prenom()} tente $${nb(n)}$ fois de prendre une vague en surf`, ev: "« vague prise »", p: pick([0.4, 0.5, 0.6]), essais: "tentatives" }),
  () => ({ decor: (n) => `Au tir à l'arc, ${prenom()} décoche $${nb(n)}$ flèches`, ev: "« flèche dans le jaune »", p: pick([0.2, 0.25, 0.3, 0.35]), essais: "flèches" }),
];
const sit = () => pick(SITS)();
/** Phrase standard qui donne p. */
/** Une taille de la liste pour laquelle n·p est entier (secours : 1 000). */
const nEntier = (p: number, liste: number[]) => pick(liste.filter((n) => Number.isInteger(r4(p * n))).concat([1000]));
const ditP = (s: Sit) => `On admet que la probabilité de l'issue ${s.ev} est $p = ${fx(s.p)}$.`;

function gab(id: string, microId: string, difficulty: DifficultyLevel, hint: string, tags: string[], generate: () => Q): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["seconde", "maths", "echantillonnage", ...tags, "template"],
    generate,
  };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

export const echantillonnageBank: TutorBankItemV4[] = [
  /* ===================== ECHANTILLON_FLUCTUATION ===================== */

  {
    kind: "fixed",
    id: "seconde_ech_fluct_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 2,
    theme: "neutral",
    text: "La « fluctuation d'échantillonnage » désigne :",
    format: "qcm",
    choices: [
      "le fait que les résultats varient d'un échantillon à l'autre",
      "une erreur de calcul",
      "le fait que la moyenne est toujours la même",
      "le nombre d'échantillons",
    ],
    expected: ["le fait que les résultats varient d'un échantillon à l'autre"],
    comparator: "mcq_exact",
    hint: "Deux échantillons ≠ mêmes résultats.",
    explanation: exp(
      "Chaque échantillon est tiré au hasard, ses résultats varient.",
      "D'un échantillon à l'autre, la fréquence (ou la moyenne) change un peu.",
      "C'est la fluctuation d'échantillonnage.",
      "Les résultats varient d'un échantillon à l'autre."
    ),
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_fluct_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 3,
    theme: "cuisine",
    text: "Un paquet annonce des mimolettes de $200$ g. On en pèse $10$ : la moyenne est $207$ g. Un autre paquet de $10$ donnera-t-il exactement $207$ g ?",
    format: "qcm",
    choices: [
      "Non, la moyenne varie d'un échantillon à l'autre (fluctuation)",
      "Oui, toujours $207$ g",
      "Oui, car la moyenne est fixe",
      "Non, ce sera toujours $200$ g",
    ],
    expected: ["Non, la moyenne varie d'un échantillon à l'autre (fluctuation)"],
    comparator: "mcq_exact",
    hint: "Chaque échantillon est différent.",
    explanation: exp(
      "Chaque paquet est un échantillon différent de mimolettes.",
      "Les masses ne sont pas identiques, donc la moyenne change un peu.",
      "C'est la fluctuation d'échantillonnage.",
      "Non : la moyenne fluctue d'un échantillon à l'autre."
    ),
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "cuisine", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_fluct_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 3,
    theme: "neutral",
    text: "Plus la taille $n$ de l'échantillon est grande, plus la fluctuation des fréquences est :",
    format: "qcm",
    choices: ["faible", "grande", "nulle", "imprévisible"],
    expected: ["faible"],
    comparator: "mcq_exact",
    hint: "Grand échantillon → résultats plus stables.",
    explanation: exp(
      "La taille de l'échantillon influence la fluctuation.",
      "Plus $n$ est grand, plus les fréquences observées sont stables.",
      "La fluctuation diminue.",
      "Elle est plus faible."
    ),
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_fluct_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 2,
    theme: "neutral",
    text: "On lance $50$ fois une pièce équilibrée. Obtient-on forcément exactement $25$ piles ?",
    format: "qcm",
    choices: [
      "Non, on obtient un nombre proche de $25$, mais pas toujours $25$",
      "Oui, toujours $25$",
      "Non, jamais $25$",
      "Oui, $50$ piles",
    ],
    expected: ["Non, on obtient un nombre proche de $25$, mais pas toujours $25$"],
    comparator: "mcq_exact",
    hint: "Le hasard fait fluctuer le résultat.",
    explanation: exp(
      "La théorie prévoit $25$ piles « en moyenne ».",
      "Mais chaque série fluctue : on obtient $23$, $26$, $24$…",
      "On est proche de $25$ sans l'atteindre à chaque fois.",
      "Non : proche de $25$, mais pas toujours $25$."
    ),
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_fluct_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 4,
    theme: "cuisine",
    text: "Sur l'échantillon de mimolettes, la moyenne est $207$ g avec un écart type de $1$ g. Cela indique que les masses sont :",
    format: "qcm",
    choices: [
      "très proches les unes des autres (peu dispersées)",
      "très différentes",
      "toutes égales à $200$ g",
      "imprévisibles",
    ],
    expected: ["très proches les unes des autres (peu dispersées)"],
    comparator: "mcq_exact",
    hint: "Petit écart type → faible dispersion.",
    explanation: exp(
      "L'écart type mesure la dispersion autour de la moyenne.",
      "Un écart type de $1$ g (sur une moyenne de $207$ g) est très petit.",
      "Les mimolettes ont des masses très proches de $207$ g.",
      "Les masses sont peu dispersées."
    ),
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "cuisine", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_fluct_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 3,
    theme: "neutral",
    text: "Pour un échantillon de taille $n$ d'une expérience à deux issues, l'écart entre la fréquence observée $f$ et la probabilité $p$ est en général inférieur ou égal à :",
    format: "qcm",
    choices: ["$\\dfrac{1}{\\sqrt{n}}$", "$\\dfrac{1}{n}$", "$\\sqrt{n}$", "$n$"],
    expected: ["$\\dfrac{1}{\\sqrt{n}}$"],
    comparator: "mcq_exact",
    hint: "C'est l'ordre de grandeur de la fluctuation.",
    explanation: exp(
      "La fluctuation des fréquences a un ordre de grandeur connu.",
      "Pour une expérience à deux issues, $|f - p| \\le \\dfrac{1}{\\sqrt{n}}$ (le plus souvent).",
      "Plus $n$ est grand, plus cet écart est petit.",
      "$\\dfrac{1}{\\sqrt{n}}$."
    ),
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_fluct_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 3,
    theme: "neutral",
    text: "Pour un échantillon de taille $n = 100$, combien vaut $\\dfrac{1}{\\sqrt{n}}$ ?",
    format: "short",
    expected: ["0,1", "0.1"],
    comparator: "number_equal",
    hint: "$\\sqrt{100} = 10$.",
    explanation: exp(
      "On calcule $\\dfrac{1}{\\sqrt{n}}$ avec $n = 100$.",
      "$\\sqrt{100} = 10$, donc $\\dfrac{1}{10}$.",
      "$= 0{,}1$.",
      "$\\dfrac{1}{\\sqrt{100}} = 0{,}1$."
    ),
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "short"],
  },

  {
    kind: "template",
    id: "seconde_ech_fluct_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\dfrac{1}{\\sqrt{n}}$.",
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "template"],
    // 15/10/2026 : situation × tournure — 1/√n, borne basse ou borne haute de l'intervalle de fluctuation.
    generate: () => {
      const s = sit();
      const n = pick(TAILLES.filter((m) => inv(m) <= Math.min(s.p, 1 - s.p)));
      const e = inv(n);
      const bas = r4(s.p - e), haut = r4(s.p + e);
      const type = ri(0, 2);
      const intro = `${s.decor(n)}. ${ditP(s)}`;
      const calc = `$\\sqrt{${nb(n)}} = ${Math.sqrt(n)}$, donc $\\dfrac{1}{\\sqrt{${nb(n)}}} = \\dfrac{1}{${Math.sqrt(n)}} = ${fx(e)}$.`;
      if (type === 0) {
        const tour = pick([
          "Calcule l'ordre de grandeur de la fluctuation, $\\dfrac{1}{\\sqrt{n}}$.",
          `De combien la fréquence de ${s.ev} s'écarte-t-elle en général de $p$, au plus ? (Donne $\\dfrac{1}{\\sqrt{n}}$.)`,
          "Quel écart maximal $\\dfrac{1}{\\sqrt{n}}$ attend-on, en général, entre la fréquence observée et $p$ ?",
        ]);
        return {
          text: `${intro} ${tour}`,
          format: "short",
          expected: dec(e),
          comparator: "number_equal",
          explanation: exp(
            "L'écart entre la fréquence $f$ et la probabilité $p$ est en général au plus $\\dfrac{1}{\\sqrt{n}}$.",
            `Ici $n = ${nb(n)}$.`,
            calc,
            `L'ordre de grandeur de la fluctuation est $${fx(e)}$.`
          ),
        };
      }
      const haute = type === 2;
      const tour = pick([
        `En général, la fréquence de ${s.ev} est dans l'intervalle $\\left[p - \\dfrac{1}{\\sqrt{n}}\\,;p + \\dfrac{1}{\\sqrt{n}}\\right]$. Quelle est sa borne ${haute ? "supérieure" : "inférieure"} ?`,
        `${haute ? "Au-dessus" : "En dessous"} de quelle fréquence de ${s.ev} va-t-on rarement ? (Calcule $p ${haute ? "+" : "-"} \\dfrac{1}{\\sqrt{n}}$.)`,
        `Donne la borne ${haute ? "haute" : "basse"} de la zone de fluctuation habituelle de la fréquence de ${s.ev}.`,
      ]);
      const rep = haute ? haut : bas;
      return {
        text: `${intro} ${tour}`,
        format: "short",
        expected: dec(rep),
        comparator: "number_equal",
        explanation: exp(
          "En général, $f$ est dans $\\left[p - \\dfrac{1}{\\sqrt{n}}\\,;p + \\dfrac{1}{\\sqrt{n}}\\right]$.",
          calc,
          `$${fx(s.p)} ${haute ? "+" : "-"} ${fx(e)} = ${fx(rep)}$ (intervalle $[${fx(bas)}\\,;${fx(haut)}]$).`,
          `La borne ${haute ? "supérieure" : "inférieure"} est $${fx(rep)}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_ech_fluct_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 4,
    theme: "neutral",
    text: "Pour réduire de moitié l'ordre de grandeur de la fluctuation $\\dfrac{1}{\\sqrt{n}}$, il faut multiplier la taille $n$ par :",
    format: "qcm",
    choices: ["$4$", "$2$", "$\\dfrac{1}{2}$", "$10$"],
    expected: ["$4$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{1}{\\sqrt{4n}} = \\dfrac{1}{2\\sqrt{n}}$.",
    explanation: exp(
      "La fluctuation dépend de $\\sqrt{n}$.",
      "Pour diviser $\\dfrac{1}{\\sqrt{n}}$ par $2$, il faut doubler $\\sqrt{n}$, donc quadrupler $n$.",
      "$\\dfrac{1}{\\sqrt{4n}} = \\dfrac{1}{2\\sqrt{n}}$.",
      "Il faut multiplier $n$ par $4$."
    ),
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "raisonnement", "qcm"],
  },

  /* ===================== ECHANTILLON_LOI_GRANDS_NOMBRES ===================== */

  {
    kind: "fixed",
    id: "seconde_ech_lgn_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_loi_grands_nombres",
    difficulty: 2,
    theme: "neutral",
    text: "D'après la loi des grands nombres, quand $n$ est grand, la fréquence observée est proche de :",
    format: "qcm",
    choices: ["la probabilité de l'événement", "zéro", "la taille de l'échantillon", "l'effectif total"],
    expected: ["la probabilité de l'événement"],
    comparator: "mcq_exact",
    hint: "Fréquence observée ≈ probabilité théorique.",
    explanation: exp(
      "La loi des grands nombres relie fréquence et probabilité.",
      "Quand $n$ est grand, la fréquence observée se rapproche de la probabilité.",
      "Sauf exception, $f \\approx p$.",
      "Proche de la probabilité."
    ),
    tags: ["seconde", "maths", "echantillonnage", "loi_grands_nombres", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_lgn_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_loi_grands_nombres",
    difficulty: 2,
    theme: "neutral",
    text: "On lance une pièce équilibrée $10\\,000$ fois. La fréquence de « pile » sera proche de :",
    format: "short",
    expected: ["0,5", "0.5"],
    comparator: "number_equal",
    hint: "Probabilité de pile $= 0{,}5$.",
    explanation: exp(
      "La probabilité de pile est $0{,}5$.",
      "Avec un très grand nombre de lancers, la fréquence s'en rapproche.",
      "$f \\approx 0{,}5$.",
      "Proche de $0{,}5$."
    ),
    tags: ["seconde", "maths", "echantillonnage", "loi_grands_nombres", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_lgn_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_loi_grands_nombres",
    difficulty: 3,
    theme: "neutral",
    text: "La loi des grands nombres permet d'estimer une probabilité inconnue par :",
    format: "qcm",
    choices: [
      "la fréquence observée sur un grand échantillon",
      "une seule expérience",
      "la valeur maximale",
      "l'écart type",
    ],
    expected: ["la fréquence observée sur un grand échantillon"],
    comparator: "mcq_exact",
    hint: "On observe beaucoup, on en déduit $p$.",
    explanation: exp(
      "Quand la probabilité est inconnue, on l'estime expérimentalement.",
      "On réalise un grand nombre d'expériences et on observe la fréquence.",
      "Cette fréquence estime la probabilité.",
      "Par la fréquence observée sur un grand échantillon."
    ),
    tags: ["seconde", "maths", "echantillonnage", "loi_grands_nombres", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_lgn_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_loi_grands_nombres",
    difficulty: 3,
    theme: "neutral",
    text: "Avec seulement $5$ lancers d'une pièce, la fréquence de pile est-elle un bon estimateur de $0{,}5$ ?",
    format: "qcm",
    choices: [
      "Non, l'échantillon est trop petit (forte fluctuation)",
      "Oui, c'est toujours exact",
      "Oui, $5$ suffit",
      "Non, il faut exactement $100$",
    ],
    expected: ["Non, l'échantillon est trop petit (forte fluctuation)"],
    comparator: "mcq_exact",
    hint: "Petit $n$ → grande fluctuation.",
    explanation: exp(
      "La loi des grands nombres exige un grand $n$.",
      "Avec $5$ lancers, la fréquence peut être $0$, $0{,}2$, $0{,}8$…",
      "L'estimation est peu fiable.",
      "Non : l'échantillon est trop petit."
    ),
    tags: ["seconde", "maths", "echantillonnage", "loi_grands_nombres", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_lgn_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_loi_grands_nombres",
    difficulty: 3,
    theme: "neutral",
    text: "On lance un dé un très grand nombre de fois. La fréquence de la face « 1 » sera proche de :",
    format: "qcm",
    choices: ["$\\dfrac{1}{6}$", "$\\dfrac{1}{2}$", "$\\dfrac{1}{3}$", "$1$"],
    expected: ["$\\dfrac{1}{6}$"],
    comparator: "mcq_exact",
    hint: "$P(1) = \\dfrac{1}{6}$.",
    explanation: exp(
      "La probabilité d'obtenir $1$ est $\\dfrac{1}{6}$.",
      "Avec beaucoup de lancers, la fréquence s'en rapproche.",
      "$f \\approx \\dfrac{1}{6}$.",
      "$\\dfrac{1}{6}$."
    ),
    tags: ["seconde", "maths", "echantillonnage", "loi_grands_nombres", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_lgn_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_loi_grands_nombres",
    difficulty: 4,
    theme: "neutral",
    text: "Sur $2000$ tirages, un événement se produit $480$ fois. Quelle est la fréquence observée ?",
    format: "short",
    expected: ["0,24", "0.24"],
    comparator: "number_equal",
    hint: "$\\dfrac{480}{2000}$.",
    explanation: exp(
      "La fréquence observée est le rapport effectif sur total.",
      "$\\dfrac{480}{2000}$.",
      "$= 0{,}24$.",
      "La fréquence est $0{,}24$, une estimation de la probabilité."
    ),
    tags: ["seconde", "maths", "echantillonnage", "loi_grands_nombres", "short"],
  },

  {
    kind: "template",
    id: "seconde_ech_lgn_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_loi_grands_nombres",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence $= \\dfrac{\\text{succès}}{\\text{total}}$.",
    tags: ["seconde", "maths", "echantillonnage", "loi_grands_nombres", "template"],
    // 15/10/2026 : situation (probabilité inconnue) × tournure — estimer p, puis prévoir un effectif.
    generate: () => {
      const s = pick(SITS.slice(7))();
      const N = pick([200, 250, 400, 500, 800, 1000, 2000, 2500]);
      const k = Math.max(1, Math.round((s.p + ri(-3, 3) / 100) * N));
      const f = r4(k / N);
      const intro = `${s.decor(N)} : on compte $${nb(k)}$ fois l'issue ${s.ev}. La probabilité de cette issue est inconnue.`;
      if (Math.random() < 0.55) {
        const tour = pick([
          "Quelle estimation de cette probabilité donne la loi des grands nombres ?",
          "Estime cette probabilité par la fréquence observée.",
          `Quelle valeur proposer dans le compte rendu de ${prenom()} pour cette probabilité ?`,
        ]);
        return {
          text: `${intro} ${tour}`,
          format: "short",
          expected: dec(f),
          comparator: "number_equal",
          explanation: exp(
            "Sur un grand échantillon, la fréquence observée est une bonne estimation de la probabilité.",
            "$f = \\dfrac{\\text{nombre de fois où l'issue apparaît}}{\\text{nombre d'essais}}$.",
            `$f = \\dfrac{${nb(k)}}{${nb(N)}} = ${fx(f)}$.`,
            `On estime la probabilité à environ $${fx(f)}$.`
          ),
        };
      }
      // f a au plus 4 décimales : 10 000 convient toujours.
      const N2 = pick([100, 1000, 5000, 10000, 20000].filter((m) => Number.isInteger(r4(f * m))));
      const att = r4(f * N2);
      const tour = pick([
        `En gardant cette estimation, combien de fois environ observera-t-on l'issue ${s.ev} sur $${nb(N2)}$ ${s.essais} ?`,
        `Prévois le nombre d'issues ${s.ev} attendu pour $${nb(N2)}$ ${s.essais}.`,
        `On recommence avec $${nb(N2)}$ ${s.essais}. Combien d'issues ${s.ev} peut-on prévoir ?`,
      ]);
      return {
        text: `${intro} ${tour}`,
        format: "short",
        expected: [String(att), nb(att).replace(/\\,/g, " ")],
        comparator: "number_equal",
        explanation: exp(
          "On estime la probabilité par la fréquence observée, puis on l'applique au nouvel effectif.",
          `$f = \\dfrac{${nb(k)}}{${nb(N)}} = ${fx(f)}$.`,
          `$${fx(f)} \\times ${nb(N2)} = ${nb(att)}$.`,
          `On peut prévoir environ $${nb(att)}$ fois l'issue ${s.ev}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_ech_lgn_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_loi_grands_nombres",
    difficulty: 2,
    theme: "neutral",
    text: "« Sauf exception, lorsque $n$ est grand, la fréquence observée est proche de la probabilité. » Cet énoncé est :",
    format: "qcm",
    choices: ["la loi des grands nombres", "le théorème de Pythagore", "la relation de Chasles", "une identité remarquable"],
    expected: ["la loi des grands nombres"],
    comparator: "mcq_exact",
    hint: "Grand nombre d'expériences.",
    explanation: exp(
      "Cet énoncé décrit le comportement des fréquences pour un grand $n$.",
      "C'est exactement la (version vulgarisée de la) loi des grands nombres.",
      "Elle justifie l'estimation d'une probabilité par une fréquence.",
      "C'est la loi des grands nombres."
    ),
    tags: ["seconde", "maths", "echantillonnage", "loi_grands_nombres", "raisonnement", "qcm"],
  },

  /* ===================== SIMULATION_FREQUENCE ===================== */

  {
    kind: "fixed",
    id: "seconde_ech_sim_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "simulation_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Simuler une expérience aléatoire (avec Python ou un tableur) permet :",
    format: "qcm",
    choices: [
      "d'observer des fréquences sans réaliser l'expérience en vrai",
      "de changer la probabilité réelle",
      "de supprimer le hasard",
      "de calculer une aire",
    ],
    expected: ["d'observer des fréquences sans réaliser l'expérience en vrai"],
    comparator: "mcq_exact",
    hint: "On reproduit le hasard avec l'ordinateur.",
    explanation: exp(
      "Une simulation reproduit l'expérience avec un générateur aléatoire.",
      "On peut répéter des milliers d'essais rapidement.",
      "On observe alors les fréquences obtenues.",
      "On observe des fréquences sans faire l'expérience réelle."
    ),
    tags: ["seconde", "maths", "echantillonnage", "simulation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_sim_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "simulation_frequence",
    difficulty: 3,
    theme: "neutral",
    text: "En Python, pour simuler le hasard (ex. un lancer de pièce), on utilise principalement :",
    format: "qcm",
    choices: [
      "le module random (nombres aléatoires)",
      "le module math",
      "la fonction print",
      "une boucle for uniquement",
    ],
    expected: ["le module random (nombres aléatoires)"],
    comparator: "mcq_exact",
    hint: "« random » = aléatoire.",
    explanation: exp(
      "Simuler le hasard nécessite des nombres aléatoires.",
      "En Python, c'est le module random qui les fournit.",
      "Ex. random.randint(0, 1) pour pile ou face.",
      "Le module random."
    ),
    tags: ["seconde", "maths", "echantillonnage", "simulation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_sim_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "simulation_frequence",
    difficulty: 3,
    theme: "neutral",
    text: "Une simulation de $1000$ lancers donne $530$ piles. Quelle est la fréquence simulée de pile ?",
    format: "short",
    expected: ["0,53", "0.53"],
    comparator: "number_equal",
    hint: "$\\dfrac{530}{1000}$.",
    explanation: exp(
      "La fréquence simulée est succès sur total.",
      "$\\dfrac{530}{1000}$.",
      "$= 0{,}53$.",
      "La fréquence simulée est $0{,}53$ (proche de $0{,}5$)."
    ),
    tags: ["seconde", "maths", "echantillonnage", "simulation", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_sim_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "simulation_frequence",
    difficulty: 3,
    theme: "neutral",
    text: "Deux simulations identiques (même programme) donnent-elles toujours la même fréquence ?",
    format: "qcm",
    choices: [
      "Non, car le hasard fait varier les résultats",
      "Oui, toujours identiques",
      "Oui, car le programme est le même",
      "Non, le programme est faux",
    ],
    expected: ["Non, car le hasard fait varier les résultats"],
    comparator: "mcq_exact",
    hint: "C'est encore la fluctuation.",
    explanation: exp(
      "Chaque simulation utilise de nouveaux tirages aléatoires.",
      "Les fréquences obtenues fluctuent légèrement.",
      "Elles sont proches mais pas identiques.",
      "Non : le hasard fait varier les résultats."
    ),
    tags: ["seconde", "maths", "echantillonnage", "simulation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_sim_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "simulation_frequence",
    difficulty: 4,
    theme: "neutral",
    text: "Pour que la fréquence simulée approche bien la probabilité, il vaut mieux simuler :",
    format: "qcm",
    choices: ["un grand nombre d'essais", "très peu d'essais", "un seul essai", "exactement 2 essais"],
    expected: ["un grand nombre d'essais"],
    comparator: "mcq_exact",
    hint: "Loi des grands nombres.",
    explanation: exp(
      "La fréquence approche la probabilité quand $n$ est grand.",
      "On simule donc un grand nombre d'essais.",
      "C'est l'intérêt de la simulation par ordinateur (rapide).",
      "Un grand nombre d'essais."
    ),
    tags: ["seconde", "maths", "echantillonnage", "simulation", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_ech_sim_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "simulation_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence $= \\dfrac{\\text{succès simulés}}{\\text{nombre de simulations}}$.",
    tags: ["seconde", "maths", "echantillonnage", "simulation", "template"],
    // 15/10/2026 : situation × outil (Python, tableur, calculatrice) × tournure — fréquence simulée, ou écart à p.
    generate: () => {
      const s = sit();
      const N = pick([200, 250, 400, 500, 1000, 2000, 5000]);
      const k = Math.min(N, Math.max(1, Math.round((s.p + ri(-4, 4) / 100) * N)));
      const f = r4(k / N);
      const outil = pick(["un programme Python", "un tableur", "la calculatrice", "le module `random` de Python", "une feuille de calcul partagée"]);
      const P = prenom();
      const intro = `Avec ${outil}, ${P} simule cette expérience : ${s.decor(N)}. ${ditP(s)} La simulation donne $${nb(k)}$ fois l'issue ${s.ev}.`;
      if (Math.random() < 0.6) {
        const tour = pick([
          `Quelle est la fréquence simulée de l'issue ${s.ev} ?`,
          "Calcule la fréquence obtenue par la simulation.",
          `Quelle fréquence faut-il noter dans le compte rendu de ${P} ?`,
        ]);
        return {
          text: `${intro} ${tour}`,
          format: "short",
          expected: dec(f),
          comparator: "number_equal",
          explanation: exp(
            "La fréquence simulée est le nombre de fois où l'issue sort, divisé par le nombre d'essais simulés.",
            `$f = \\dfrac{${nb(k)}}{${nb(N)}}$.`,
            `$f = ${fx(f)}$, à comparer à $p = ${fx(s.p)}$.`,
            `La fréquence simulée est $${fx(f)}$.`
          ),
        };
      }
      const ec = r4(Math.abs(f - s.p));
      const tour = pick([
        "Quel est l'écart $|f - p|$ entre la fréquence simulée et la probabilité ?",
        "De combien la fréquence simulée s'écarte-t-elle de $p$ ? (Donne $|f - p|$.)",
        `Calcule $|f - p|$ pour la simulation de ${P}.`,
      ]);
      return {
        text: `${intro} ${tour}`,
        format: "short",
        expected: dec(ec),
        comparator: "number_equal",
        explanation: exp(
          "On calcule d'abord la fréquence simulée, puis la distance à $p$.",
          `$f = \\dfrac{${nb(k)}}{${nb(N)}} = ${fx(f)}$.`,
          `$|${fx(f)} - ${fx(s.p)}| = ${fx(ec)}$.`,
          `L'écart est $${fx(ec)}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_ech_sim_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "simulation_frequence",
    difficulty: 4,
    theme: "neutral",
    text: "On simule $N$ échantillons de taille $n$ d'une expérience à deux issues. Cela permet surtout d'observer :",
    format: "qcm",
    choices: [
      "comment les fréquences fluctuent autour de la probabilité",
      "la valeur exacte de la probabilité",
      "l'aire d'un triangle",
      "la médiane d'une fonction",
    ],
    expected: ["comment les fréquences fluctuent autour de la probabilité"],
    comparator: "mcq_exact",
    hint: "Plusieurs échantillons → on voit la dispersion.",
    explanation: exp(
      "Simuler plusieurs échantillons montre la variabilité des fréquences.",
      "On observe leur dispersion autour de la probabilité.",
      "C'est une illustration de la fluctuation d'échantillonnage.",
      "Comment les fréquences fluctuent autour de la probabilité."
    ),
    tags: ["seconde", "maths", "echantillonnage", "simulation", "raisonnement", "qcm"],
  },

  /* ===================== ECHANTILLON_INTERPRETER ===================== */

  {
    kind: "fixed",
    id: "seconde_ech_int_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Sur $100$ lancers d'une pièce, on observe une fréquence de pile de $0{,}54$. Est-ce surprenant pour une pièce équilibrée ?",
    format: "qcm",
    choices: [
      "Non, c'est une fluctuation normale autour de $0{,}5$",
      "Oui, la pièce est truquée",
      "Oui, c'est impossible",
      "Non, car $0{,}54 = 0{,}5$",
    ],
    expected: ["Non, c'est une fluctuation normale autour de $0{,}5$"],
    comparator: "mcq_exact",
    hint: "$0{,}54$ est proche de $0{,}5$ ($|f-p| \\le 1/\\sqrt{100} = 0{,}1$).",
    explanation: exp(
      "On compare l'écart $|0{,}54 - 0{,}5| = 0{,}04$ à $\\dfrac{1}{\\sqrt{100}} = 0{,}1$.",
      "$0{,}04 \\le 0{,}1$ : l'écart est dans la fluctuation attendue.",
      "Rien d'anormal pour une pièce équilibrée.",
      "Non, c'est une fluctuation normale."
    ),
    tags: ["seconde", "maths", "echantillonnage", "interpreter", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_int_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_interpreter",
    difficulty: 4,
    theme: "cuisine",
    text: "Le paquet annonce $200$ g par mimolette, mais l'échantillon donne une moyenne de $207$ g. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "En moyenne, les mimolettes pèsent un peu plus que l'annonce",
      "Les mimolettes pèsent moins que prévu",
      "L'annonce est exacte",
      "On ne peut rien dire",
    ],
    expected: ["En moyenne, les mimolettes pèsent un peu plus que l'annonce"],
    comparator: "mcq_exact",
    hint: "$207 > 200$.",
    explanation: exp(
      "On compare la moyenne observée à la valeur annoncée.",
      "$207$ g $> 200$ g.",
      "En moyenne, les mimolettes pèsent un peu plus que l'annonce (le fabricant ne sous-remplit pas).",
      "Elles pèsent en moyenne un peu plus que l'annonce."
    ),
    tags: ["seconde", "maths", "echantillonnage", "interpreter", "cuisine", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_int_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_interpreter",
    difficulty: 4,
    theme: "cuisine",
    text: "Pour les mimolettes : moyenne $207$ g, écart type $1$ g. La plupart des masses se situent environ dans l'intervalle $[m - 2s\\,;m + 2s]$, soit :",
    format: "qcm",
    choices: ["$[205\\,;209]$", "$[206\\,;208]$", "$[200\\,;214]$", "$[207\\,;208]$"],
    expected: ["$[205\\,;209]$"],
    comparator: "mcq_exact",
    hint: "$207 - 2 \\times 1$ et $207 + 2 \\times 1$.",
    explanation: exp(
      "On calcule $[m - 2s\\,;m + 2s]$ avec $m = 207$ et $s = 1$.",
      "$207 - 2 = 205$ et $207 + 2 = 209$.",
      "L'intervalle est $[205\\,;209]$.",
      "$[205\\,;209]$."
    ),
    tags: ["seconde", "maths", "echantillonnage", "interpreter", "cuisine", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_int_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Sur $100$ lancers, une pièce donne $72$ piles ($f = 0{,}72$). Que peut-on soupçonner ?",
    format: "qcm",
    choices: [
      "La pièce est peut-être truquée (écart $> \\dfrac{1}{\\sqrt{100}}$)",
      "Rien, c'est normal",
      "La pièce est parfaitement équilibrée",
      "Il y a eu $72$ faces",
    ],
    expected: ["La pièce est peut-être truquée (écart $> \\dfrac{1}{\\sqrt{100}}$)"],
    comparator: "mcq_exact",
    hint: "$|0{,}72 - 0{,}5| = 0{,}22 > 0{,}1$.",
    explanation: exp(
      "On compare l'écart à la fluctuation attendue.",
      "$|0{,}72 - 0{,}5| = 0{,}22$, bien plus que $\\dfrac{1}{\\sqrt{100}} = 0{,}1$.",
      "Un tel écart est peu probable pour une pièce équilibrée.",
      "La pièce est peut-être truquée."
    ),
    tags: ["seconde", "maths", "echantillonnage", "interpreter", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_int_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Une fréquence observée est une estimation de la probabilité. Cette estimation est d'autant meilleure que :",
    format: "qcm",
    choices: ["l'échantillon est grand", "l'échantillon est petit", "la probabilité est grande", "on fait un seul essai"],
    expected: ["l'échantillon est grand"],
    comparator: "mcq_exact",
    hint: "Grand $n$ → estimation plus fiable.",
    explanation: exp(
      "La qualité de l'estimation dépend de la taille de l'échantillon.",
      "Plus $n$ est grand, plus la fréquence est proche de la probabilité.",
      "L'estimation est alors plus fiable.",
      "Quand l'échantillon est grand."
    ),
    tags: ["seconde", "maths", "echantillonnage", "interpreter", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_int_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Pour $n = 100$ et $p = 0{,}5$, on s'attend à ce que la fréquence observée soit généralement dans l'intervalle :",
    format: "qcm",
    choices: ["$[0{,}4\\,;0{,}6]$", "$[0{,}49\\,;0{,}51]$", "$[0\\,;1]$ uniquement", "$[0{,}3\\,;0{,}7]$"],
    expected: ["$[0{,}4\\,;0{,}6]$"],
    comparator: "mcq_exact",
    hint: "$\\left[p - \\dfrac{1}{\\sqrt{n}}\\,;p + \\dfrac{1}{\\sqrt{n}}\\right]$.",
    explanation: exp(
      "On utilise l'intervalle $\\left[p - \\dfrac{1}{\\sqrt{n}}\\,;p + \\dfrac{1}{\\sqrt{n}}\\right]$.",
      "$\\dfrac{1}{\\sqrt{100}} = 0{,}1$ ; $0{,}5 \\pm 0{,}1$.",
      "$[0{,}4\\,;0{,}6]$.",
      "$[0{,}4\\,;0{,}6]$."
    ),
    tags: ["seconde", "maths", "echantillonnage", "interpreter", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_ech_int_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare l'écart $|f - p|$ à $\\dfrac{1}{\\sqrt{n}}$.",
    tags: ["seconde", "maths", "echantillonnage", "interpreter", "template"],
    // 15/10/2026 : une AFFIRMATION à tester — on donne l'effectif, l'élève calcule f puis compare à 1/√n.
    generate: () => {
      const s = pick(SITS.slice(7))();
      const n = pick(TAILLES.filter((m) => m >= 100 && m <= 2500 && inv(m) <= Math.min(s.p, 1 - s.p) / 1.5));
      const e = inv(n);
      const normal = Math.random() < 0.5;
      const ecartVise = e * (normal ? ri(1, 6) : ri(15, 22)) / 10;
      const sens = s.p - ecartVise > 0 && (s.p + ecartVise >= 1 || Math.random() < 0.5) ? -1 : 1;
      const k = Math.max(1, Math.round((s.p + sens * ecartVise) * n));
      const f = r4(k / n);
      const ec = r4(Math.abs(f - s.p));
      const doute = ec > e;
      const P = prenom();
      const qui = pick(["Une affiche annonce", "Un article de presse affirme", "Un site internet affirme", `${P} affirme`, "Le responsable affirme"]);
      const tour = pick([
        "Peut-on mettre en doute cette affirmation ?",
        "Cet échantillon remet-il en cause l'affirmation ?",
        `${prenom()} pense que l'affirmation est fausse. Le résultat lui donne-t-il raison ?`,
      ]);
      const bon = doute ? "Oui : l'écart $|f - p|$ dépasse $\\dfrac{1}{\\sqrt{n}}$, on peut douter de l'affirmation" : "Non : l'écart $|f - p|$ reste inférieur à $\\dfrac{1}{\\sqrt{n}}$, rien ne la contredit";
      const autre = doute ? "Non : l'écart $|f - p|$ reste inférieur à $\\dfrac{1}{\\sqrt{n}}$, rien ne la contredit" : "Oui : l'écart $|f - p|$ dépasse $\\dfrac{1}{\\sqrt{n}}$, on peut douter de l'affirmation";
      return {
        text: `${qui} : « la probabilité de l'issue ${s.ev} est $${fx(s.p)}$ ». Pour vérifier, on fait l'expérience. ${s.decor(n)} : l'issue ${s.ev} apparaît $${nb(k)}$ fois. ${tour}`,
        format: "qcm",
        ...qcm(bon, [autre, "Oui : la fréquence n'est pas exactement égale à $p$", "Non : un échantillon ne permet jamais de juger"]),
        comparator: "mcq_exact",
        explanation: exp(
          "On calcule la fréquence observée, puis on compare l'écart $|f - p|$ à $\\dfrac{1}{\\sqrt{n}}$.",
          `$f = \\dfrac{${nb(k)}}{${nb(n)}} = ${fx(f)}$ ; $\\dfrac{1}{\\sqrt{${nb(n)}}} = ${fx(e)}$.`,
          `$|${fx(f)} - ${fx(s.p)}| = ${fx(ec)}$, ${doute ? `plus grand que $${fx(e)}$` : `inférieur ou égal à $${fx(e)}$`}. Un petit écart, lui, est normal : c'est la fluctuation.`,
          bon + "."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_ech_int_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_interpreter",
    difficulty: 2,
    theme: "cuisine",
    text: "Un écart type de $1$ g sur la masse des mimolettes (moyenne $207$ g) signifie que le fabricant est :",
    format: "qcm",
    choices: ["très régulier (faible dispersion)", "très irrégulier", "en dessous de l'annonce", "au hasard"],
    expected: ["très régulier (faible dispersion)"],
    comparator: "mcq_exact",
    hint: "Petit écart type = régularité.",
    explanation: exp(
      "L'écart type mesure la régularité des masses.",
      "$1$ g d'écart type est très faible devant $207$ g.",
      "Les mimolettes ont des masses très homogènes.",
      "Le fabricant est très régulier."
    ),
    tags: ["seconde", "maths", "echantillonnage", "interpreter", "cuisine", "raisonnement", "qcm"],
  },

  /* ===================== GÉNÉRATEURS (15/10/2026) ===================== */

  // ★2 fluctuation : deux séries qui diffèrent, « exactement n·p ? », quelle taille fluctue le moins.
  gab("seconde_ech_fluct_gen_2", "echantillon_fluctuation", 2, "Chaque série est un nouvel échantillon : les résultats bougent un peu.", ["fluctuation", "qcm"], () => {
    const s = sit();
    const type = ri(0, 2);
    if (type === 0) {
      const n = nEntier(s.p, [50, 100, 200, 400]);
      const att = r4(s.p * n);
      const d1 = ri(1, Math.max(2, Math.round(n / 25))), d2 = ri(1, Math.max(2, Math.round(n / 25)));
      const a = att + d1, b = Math.max(0, att - d2);
      const [A, B] = [prenom(), prenom()];
      const tour = pick([
        `Deux groupes refont la même expérience. ${s.decor(n)}. Le groupe de ${A} obtient $${a}$ fois ${s.ev}, celui de ${B} $${b}$ fois. Que penser ?`,
        `${s.decor(n)} : on obtient $${a}$ fois ${s.ev}. On recommence la même série et on obtient $${b}$ fois ${s.ev}. Comment l'expliquer ?`,
        `${s.decor(n)}, deux fois de suite. Première série : $${a}$ fois ${s.ev}. Seconde série : $${b}$ fois. Qu'en conclure ?`,
      ]);
      const bon = "C'est normal : c'est la fluctuation d'échantillonnage";
      return {
        text: `${tour} ${ditP(s)}`,
        format: "qcm",
        ...qcm(bon, ["Une des deux séries contient forcément une erreur", "La probabilité a changé entre les deux séries", `Les deux séries auraient dû donner exactement $${att}$`]),
        comparator: "mcq_exact",
        explanation: exp(
          "Deux échantillons de même taille, tirés au hasard, ne donnent pas les mêmes résultats.",
          `On attend « en moyenne » $${fx(s.p)} \\times ${n} = ${att}$ fois ${s.ev}, mais chaque série s'en écarte un peu.`,
          `$${a}$ et $${b}$ sont tous deux proches de $${att}$ : rien d'anormal, la probabilité n'a pas changé.`,
          bon + "."
        ),
      };
    }
    if (type === 1) {
      const n = nEntier(s.p, [20, 40, 60, 80, 100, 200, 500]);
      const att = r4(s.p * n);
      const tour = pick([
        `Obtiendra-t-on forcément exactement $${fx(att)}$ fois ${s.ev} ?`,
        `Le nombre de ${s.essais} donnant ${s.ev} sera-t-il exactement $${fx(att)}$ ?`,
        `${prenom()} affirme : « on aura exactement $${fx(att)}$ fois ${s.ev} ». Est-ce vrai ?`,
      ]);
      const bon = `Non : on obtiendra un nombre proche de $${fx(att)}$, qui varie d'une série à l'autre`;
      return {
        text: `${s.decor(n)}. ${ditP(s)} ${tour}`,
        format: "qcm",
        ...qcm(bon, [`Oui, exactement $${fx(att)}$ à chaque fois`, `Non : on n'obtiendra jamais $${fx(att)}$`, "On ne peut rien prévoir du tout"]),
        comparator: "mcq_exact",
        explanation: exp(
          "Le résultat d'une série d'expériences aléatoires fluctue.",
          `On calcule la valeur « attendue » : $${fx(s.p)} \\times ${n} = ${fx(att)}$.`,
          `Une série donne un nombre proche de $${fx(att)}$ (parfois exactement, souvent un peu plus ou un peu moins).`,
          bon + "."
        ),
      };
    }
    const [n1, n2] = melange([pick([25, 50, 100]), pick([1000, 2500, 10000])]);
    const grand = Math.max(n1, n2), petit = Math.min(n1, n2);
    const tour = pick([
      `Avec lequel des deux échantillons la fréquence de ${s.ev} sera-t-elle en général la plus proche de $${fx(s.p)}$ ?`,
      `Quel échantillon donne une fréquence de ${s.ev} qui fluctue le moins ?`,
      `On répète chaque série plusieurs fois. Quelles fréquences de ${s.ev} seront les plus stables ?`,
    ]);
    const bon = `Celles de l'échantillon de taille $${nb(grand)}$`;
    return {
      text: `Premier échantillon : ${s.decor(n1)}. Second échantillon : la même expérience, avec $${nb(n2)}$ ${s.essais}. ${ditP(s)} ${tour}`,
      format: "qcm",
      ...qcm(bon, [`Celles de l'échantillon de taille $${nb(petit)}$`, "Les deux fluctuent autant", "On ne peut pas savoir, c'est le hasard"]),
      comparator: "mcq_exact",
      explanation: exp(
        "Plus l'échantillon est grand, plus la fréquence observée est stable.",
        `L'ordre de grandeur de la fluctuation est $\\dfrac{1}{\\sqrt{n}}$ : il diminue quand $n$ augmente.`,
        `$${nb(grand)} > ${nb(petit)}$ : l'échantillon de taille $${nb(grand)}$ fluctue moins.`,
        bon + "."
      ),
    };
  }),

  // ★4 fluctuation : taille minimale pour une précision voulue ; effet de « n multiplié par k ».
  gab("seconde_ech_fluct_gen_4", "echantillon_fluctuation", 4, "L'écart typique est $\\dfrac{1}{\\sqrt{n}}$ : on raisonne sur $\\sqrt{n}$.", ["fluctuation"], () => {
    const s = sit();
    if (Math.random() < 0.5) {
      const e = pick([0.2, 0.1, 0.05, 0.04, 0.025, 0.02, 0.01]);
      const n = Math.round(1 / (e * e));
      const tour = pick([
        `Combien de ${s.essais} faut-il au minimum pour que l'ordre de grandeur de la fluctuation, $\\dfrac{1}{\\sqrt{n}}$, ne dépasse pas $${fx(e)}$ ?`,
        `On veut que la fréquence de ${s.ev} s'écarte en général de $p$ de $${fx(e)}$ au plus. Quelle taille $n$ minimale faut-il ?`,
        `Quelle est la plus petite taille $n$ telle que $\\dfrac{1}{\\sqrt{n}} \\le ${fx(e)}$ ?`,
      ]);
      const ctx = pick([
        `${prenom()} prépare une série de ${s.essais} et s'intéresse à l'issue ${s.ev}.`,
        `On veut estimer la fréquence de l'issue ${s.ev} sur une série de ${s.essais}.`,
        `Un club de maths du lycée étudie l'issue ${s.ev}.`,
      ]);
      return {
        text: `${ctx} ${tour}`,
        format: "short",
        expected: [String(n), nb(n).replace("\\,", " ")],
        comparator: "number_equal",
        explanation: exp(
          "On veut $\\dfrac{1}{\\sqrt{n}} \\le e$, c'est-à-dire $\\sqrt{n} \\ge \\dfrac{1}{e}$, donc $n \\ge \\dfrac{1}{e^2}$.",
          `$\\dfrac{1}{${fx(e)}} = ${r4(1 / e)}$, donc $\\sqrt{n} \\ge ${r4(1 / e)}$.`,
          `$n \\ge ${r4(1 / e)}^2 = ${nb(n)}$.`,
          `Il faut au moins $${nb(n)}$ ${s.essais}.`
        ),
      };
    }
    const k = pick([2, 3, 4, 5, 10]);
    const n = pick([25, 100, 400]);
    const e = inv(n), e2 = r4(e / k);
    const sens = Math.random() < 0.5;
    const intro = `${s.decor(n)}. ${ditP(s)}`;
    if (sens) {
      const tour = pick([
        `Par combien faut-il multiplier le nombre de ${s.essais} pour diviser par $${k}$ l'ordre de grandeur de la fluctuation ?`,
        `On veut une fluctuation $${k}$ fois plus petite. Par quel nombre multiplier la taille de l'échantillon ?`,
      ]);
      return {
        text: `${intro} ${tour}`,
        format: "qcm",
        ...qcmNum(k * k, [k, 2 * k, Math.sqrt(k) === Math.floor(Math.sqrt(k)) ? Math.sqrt(k) : k + 1, k * k * k], (x) => `$${x}$`),
        comparator: "mcq_exact",
        explanation: exp(
          "La fluctuation est de l'ordre de $\\dfrac{1}{\\sqrt{n}}$.",
          `Diviser $\\dfrac{1}{\\sqrt{n}}$ par $${k}$, c'est multiplier $\\sqrt{n}$ par $${k}$, donc $n$ par $${k}^2 = ${k * k}$.`,
          `$\\dfrac{1}{\\sqrt{${nb(n)}}} = ${fx(e)}$ et $\\dfrac{1}{\\sqrt{${nb(n * k * k)}}} = ${fx(e2)}$ : bien $${k}$ fois plus petit.`,
          `Il faut multiplier le nombre de ${s.essais} par $${k * k}$.`
        ),
      };
    }
    const tour = pick([
      `On fait $${k * k}$ fois plus de ${s.essais}. Que devient l'ordre de grandeur de la fluctuation, $${fx(e)}$ au départ ?`,
      `Avec $${nb(n * k * k)}$ ${s.essais} au lieu de $${nb(n)}$, que vaut maintenant $\\dfrac{1}{\\sqrt{n}}$ ?`,
    ]);
    return {
      text: `${intro} ${tour}`,
      format: "qcm",
      ...qcmNum(e2, [r4(e / (k * k)), r4(e * k), r4(e / 2), e], (x) => `$${fx(x)}$`),
      comparator: "mcq_exact",
      explanation: exp(
        "La fluctuation est de l'ordre de $\\dfrac{1}{\\sqrt{n}}$.",
        `Avec $${k * k}$ fois plus d'essais, $\\sqrt{n}$ est multiplié par $\\sqrt{${k * k}} = ${k}$ (et non par $${k * k}$).`,
        `$\\dfrac{1}{\\sqrt{${nb(n * k * k)}}} = \\dfrac{1}{${Math.sqrt(n) * k}} = ${fx(e2)}$.`,
        `L'ordre de grandeur passe à $${fx(e2)}$.`
      ),
    };
  }),

  // ★2 loi des grands nombres : vers quoi tend la fréquence ; comment estimer une probabilité inconnue.
  gab("seconde_ech_lgn_gen_2", "echantillon_loi_grands_nombres", 2, "Sur un très grand nombre d'essais, la fréquence se rapproche de la probabilité.", ["loi_grands_nombres", "qcm"], () => {
    const s = sit();
    if (Math.random() < 0.55) {
      const n = pick([10000, 50000, 100000]);
      const tour = pick([
        `De quelle valeur la fréquence de ${s.ev} sera-t-elle proche ?`,
        `Vers quelle valeur la fréquence de ${s.ev} va-t-elle se stabiliser ?`,
        `${prenom()} calcule la fréquence de ${s.ev} à la fin. Quelle valeur s'attend-on à lire ?`,
      ]);
      return {
        text: `${s.decor(n)}. ${ditP(s)} ${tour}`,
        format: "qcm",
        ...qcmNum(s.p, [1 - s.p, r4(s.p * n), 0.5, 1, r4(s.p / 2)], (x) => (x > 1 ? `$${nb(x)}$` : `$${fx(x)}$`)),
        comparator: "mcq_exact",
        explanation: exp(
          "Loi des grands nombres : quand $n$ est grand, la fréquence observée est proche de la probabilité.",
          `Ici $n = ${nb(n)}$ est très grand et $p = ${fx(s.p)}$.`,
          `${s.p !== 0.5 ? `$${fx(1 - s.p)}$ serait la fréquence de l'issue contraire ; ` : ""}$${nb(r4(s.p * n))}$ est un nombre de fois, pas une fréquence.`,
          `La fréquence sera proche de $${fx(s.p)}$.`
        ),
      };
    }
    const INCONNUES = [
      ["une punaise lâchée sur la table", "« la punaise tombe sur la pointe »"],
      ["un bouchon de bouteille lancé en l'air", "« le bouchon retombe à l'endroit »"],
      ["une tartine qui tombe de la table", "« côté beurre en dessous »"],
      ["un gobelet en plastique lancé", "« le gobelet tombe debout »"],
      ["une graine de vacoa semée", "« la graine germe »"],
      ["un trajet du car jaune vers le lycée", "« le car arrive à l'heure »"],
      ["un tir au but de l'équipe du lycée", "« le tir est réussi »"],
      ["une capsule de soda lancée", "« la capsule retombe à l'envers »"],
      ["un dé fabriqué à l'imprimante 3D, peut-être mal équilibré", "« 6 »"],
      ["une pièce un peu tordue", "« pile »"],
    ] as const;
    const [obj, ev] = pick(INCONNUES);
    const P = prenom();
    const tour = pick([
      `${P} veut connaître la probabilité de l'issue ${ev} pour ${obj}. On ne peut pas la calculer. Que faire ?`,
      `Pour ${obj}, la probabilité de l'issue ${ev} est inconnue. Quelle méthode permet à ${P} de l'estimer ?`,
      `${P} se demande quelle est la probabilité de l'issue ${ev} pour ${obj}. Quelle méthode est correcte ?`,
    ]);
    const bon = "Répéter l'expérience un grand nombre de fois et calculer la fréquence de l'issue";
    return {
      text: tour,
      format: "qcm",
      ...qcm(bon, ["Faire l'expérience une seule fois et regarder le résultat", "Prendre $0{,}5$, car il y a deux issues", "Faire $5$ essais : c'est suffisant"]),
      comparator: "mcq_exact",
      explanation: exp(
        "Quand on ne peut pas calculer une probabilité, on l'estime par une fréquence (loi des grands nombres).",
        "On répète l'expérience un grand nombre de fois, puis on calcule $f = \\dfrac{\\text{nombre de fois où l'issue apparaît}}{\\text{nombre d'essais}}$.",
        "Deux issues ne veut pas dire « une chance sur deux » ; et un seul ou quelques essais fluctuent trop.",
        bon + "."
      ),
    };
  }),

  // ★4 loi des grands nombres : regrouper deux séries ; quelle estimation est la plus fiable.
  gab("seconde_ech_lgn_gen_4", "echantillon_loi_grands_nombres", 4, "La meilleure estimation utilise le plus grand nombre d'essais.", ["loi_grands_nombres"], () => {
    const s = pick(SITS.slice(7))();
    const [A, B] = [prenom(), prenom()];
    const n1 = pick([50, 100, 200, 250]), n2 = pick([400, 500, 800, 1000, 1500]);
    const k1 = Math.max(1, Math.round((s.p + ri(-8, 8) / 100) * n1));
    const k2 = Math.max(1, Math.round((s.p + ri(-3, 3) / 100) * n2));
    const f1 = r4(k1 / n1), f2 = r4(k2 / n2);
    const intro = `${A} observe $${nb(k1)}$ issues ${s.ev} sur $${nb(n1)}$ ${s.essais}. ${B} en observe $${nb(k2)}$ sur $${nb(n2)}$ ${s.essais}.`;
    const type = ri(0, 2);
    if (type === 0) {
      const f = r4((k1 + k2) / (n1 + n2));
      const tour = pick([
        "On regroupe les deux séries. Quelle est la fréquence de l'issue sur l'ensemble ? (arrondie au centième)",
        "Quelle fréquence obtient-on en mettant les deux séries ensemble ? (arrondie au centième)",
        "Pour mieux estimer la probabilité, on réunit toutes les observations. Quelle fréquence trouve-t-on ? (arrondie au centième)",
      ]);
      const ar = Math.round(f * 100) / 100;
      return {
        text: `${intro} ${tour}`,
        format: "short",
        expected: dec(ar),
        comparator: "number_equal",
        explanation: exp(
          "On additionne les issues et on additionne les essais (on ne fait PAS la moyenne des deux fréquences).",
          `Issues : $${nb(k1)} + ${nb(k2)} = ${nb(k1 + k2)}$ ; essais : $${nb(n1)} + ${nb(n2)} = ${nb(n1 + n2)}$.`,
          `$f = \\dfrac{${nb(k1 + k2)}}{${nb(n1 + n2)}} \\approx ${fx(ar)}$.`,
          `Sur l'ensemble, la fréquence vaut environ $${fx(ar)}$.`
        ),
      };
    }
    if (type === 1) {
      const tour = pick([
        `Quelle estimation de la probabilité de l'issue ${s.ev} est la plus fiable ?`,
        "Laquelle des deux fréquences faut-il préférer pour estimer la probabilité ?",
        `${A} et ${B} ne trouvent pas la même fréquence. À qui se fier le plus ?`,
      ]);
      const bon = `Celle de ${B} : $${fx(f2)}$, calculée sur plus d'essais`;
      return {
        text: `${intro} ${tour}`,
        format: "qcm",
        ...qcm(bon, [`Celle de ${A} : $${fx(f1)}$, calculée sur moins d'essais`, "Les deux se valent : la fréquence ne dépend pas du nombre d'essais", `La plus grande des deux fréquences : $${fx(Math.max(f1, f2))}$`]),
        comparator: "mcq_exact",
        explanation: exp(
          "Plus le nombre d'essais est grand, plus la fréquence est proche de la probabilité (loi des grands nombres).",
          `Fréquences : $\\dfrac{${nb(k1)}}{${nb(n1)}} = ${fx(f1)}$ et $\\dfrac{${nb(k2)}}{${nb(n2)}} = ${fx(f2)}$.`,
          `$${nb(n2)} > ${nb(n1)}$ : la fluctuation de la seconde est plus faible ($\\dfrac{1}{\\sqrt{n}}$ plus petit).`,
          bon + "."
        ),
      };
    }
    const tour = pick([
      `${B} affirme : « la probabilité de l'issue ${s.ev} vaut exactement $${fx(f2)}$ ». Est-ce juste ?`,
      `Peut-on dire que la probabilité de l'issue ${s.ev} est égale à $${fx(f2)}$, la fréquence de ${B} ?`,
      `La fréquence de ${B} est $${fx(f2)}$. Que vaut la probabilité de l'issue ${s.ev} ?`,
    ]);
    const bon = `Elle est environ $${fx(f2)}$ : une fréquence n'est qu'une estimation`;
    return {
      text: `${intro} ${tour}`,
      format: "qcm",
      ...qcm(bon, [`Exactement $${fx(f2)}$, puisque c'est la fréquence observée`, `Exactement la moyenne des deux fréquences`, "On ne peut rien en dire du tout"]),
      comparator: "mcq_exact",
      explanation: exp(
        "La loi des grands nombres dit que la fréquence est PROCHE de la probabilité, pas égale.",
        `$\\dfrac{${nb(k2)}}{${nb(n2)}} = ${fx(f2)}$ ; une autre série donnerait une valeur un peu différente.`,
        `Avec $n = ${nb(n2)}$, l'écart est en général au plus de l'ordre de $\\dfrac{1}{\\sqrt{${nb(n2)}}}$.`,
        bon + "."
      ),
    };
  }),

  // ★2 simulation : quelle instruction Python (ou tableur) simule un essai.
  gab("seconde_ech_sim_gen_2", "simulation_frequence", 2, "`random()` renvoie un nombre au hasard entre $0$ et $1$ : il est inférieur à $p$ avec la probabilité $p$.", ["simulation", "qcm"], () => {
    const type = ri(0, 2);
    if (type === 0) {
      const s = sit();
      const p = fc(s.p).replace(",", ".");
      const tour = pick([
        `Quelle condition Python est vraie avec la probabilité $${fx(s.p)}$, et simule donc l'issue ${s.ev} ?`,
        `Pour simuler un essai, ${prenom()} utilise \`from random import random\`. Quel test simule l'issue ${s.ev} ?`,
        `Dans un programme de simulation, quel test faut-il écrire pour que l'issue ${s.ev} sorte avec la probabilité $${fx(s.p)}$ ?`,
      ]);
      const bon = `\`random() < ${p}\``;
      return {
        text: `${s.decor(100)}. ${ditP(s)} ${tour}`,
        format: "qcm",
        // Si p = 0,5, « random() > 0.5 » serait AUSSI juste : on ne le propose pas.
        ...qcm(bon, melange([
          `\`random() == ${p}\``,
          `\`random() < ${Math.round(s.p * 100)}\``,
          ...(s.p === 0.5 ? [`\`random() < 0.05\``] : [`\`random() > ${p}\``, `\`random() < ${fc(1 - s.p).replace(",", ".")}\``]),
        ])),
        comparator: "mcq_exact",
        explanation: exp(
          "`random()` donne un nombre au hasard dans $[0\\,;1[$, réparti uniformément.",
          `Il est inférieur à $${fx(s.p)}$ avec la probabilité $${fx(s.p)}$.`,
          `\`random() == ${p}\` n'arrive presque jamais, \`random() < ${Math.round(s.p * 100)}\` est toujours vrai${s.p === 0.5 ? "" : `, \`random() > ${p}\` et \`random() < ${fc(1 - s.p).replace(",", ".")}\` simulent l'issue contraire (probabilité $${fx(1 - s.p)}$)`}.`,
          `On écrit ${bon}.`
        ),
      };
    }
    const DES = [
      [4, "un dé à $4$ faces"], [6, "un dé à $6$ faces"], [8, "un dé à $8$ faces"], [10, "un dé à $10$ faces"],
      [12, "un dé à $12$ faces"], [20, "un dé à $20$ faces"], [6, "le dé des petits chevaux"], [6, "le dé du jeu de l'oie"],
      [10, "une roue de kermesse aux secteurs numérotés de $1$ à $10$"], [12, "une roue de loterie numérotée de $1$ à $12$"],
    ] as const;
    const [f, obj] = pick(DES);
    const P = prenom();
    if (type === 1) {
      const tour = pick([
        `${P} veut simuler en Python ${obj}. Quelle instruction choisir ?`,
        `Quelle instruction Python simule un lancer avec ${obj} ?`,
        `Dans son programme, ${P} doit tirer au hasard le résultat de ${obj}. Quelle instruction convient ?`,
      ]);
      const bon = `\`randint(1, ${f})\``;
      return {
        text: tour,
        format: "qcm",
        ...qcm(bon, [`\`randint(0, ${f})\``, `\`randint(1, ${f + 1})\``, `\`random() * ${f}\``, `\`randint(${f}, 1)\``]),
        comparator: "mcq_exact",
        explanation: exp(
          "`randint(a, b)` renvoie un entier au hasard entre $a$ et $b$, les deux INCLUS.",
          `Les résultats possibles vont de $1$ à $${f}$.`,
          `\`randint(0, ${f})\` donnerait aussi $0$, \`randint(1, ${f + 1})\` aussi $${f + 1}$, et \`random() * ${f}\` un nombre à virgule.`,
          `On écrit ${bon}.`
        ),
      };
    }
    const tour = pick([
      `${P} simule ${obj} dans une cellule de tableur. Quelle formule choisir ?`,
      `Quelle formule de tableur simule un lancer avec ${obj} ?`,
      `Pour recopier $1\\,000$ essais vers le bas, ${P} cherche la formule qui simule ${obj}. Laquelle ?`,
    ]);
    const bon = `\`=ALEA.ENTRE.BORNES(1;${f})\``;
    return {
      text: tour,
      format: "qcm",
      ...qcm(bon, [`\`=ALEA.ENTRE.BORNES(0;${f})\``, `\`=ALEA()*${f}\``, `\`=ALEA.ENTRE.BORNES(1;${f - 1})\``]),
      comparator: "mcq_exact",
      explanation: exp(
        "`ALEA.ENTRE.BORNES(a;b)` renvoie un entier au hasard entre $a$ et $b$ inclus.",
        `Les résultats possibles vont de $1$ à $${f}$.`,
        `Avec $0$ comme borne, on obtiendrait $0$ ; \`ALEA()*${f}\` donne un nombre à virgule ; la borne $${f - 1}$ oublierait la face $${f}$.`,
        `On écrit ${bon}.`
      ),
    };
  }),

  // ★4 simulation : lire un programme Python de simulation — que renvoie-t-il ?
  gab("seconde_ech_sim_gen_4", "simulation_frequence", 4, "Suis le compteur : il augmente de $1$ à chaque fois que l'issue sort.", ["simulation", "qcm"], () => {
    const s = sit();
    const p = fc(s.p).replace(",", ".");
    const fn = pick(["simul", "experience", "serie", "kermesse", "essais", "echantillon"]);
    const c = pick(["c", "compteur", "nb", "total", "succes"]);
    const RET = [
      [`${c} / n`, `la fréquence de l'issue ${s.ev} sur $n$ essais`],
      [c, `le nombre de fois où l'issue ${s.ev} sort sur $n$ essais`],
      [`n - ${c}`, `le nombre de fois où l'issue ${s.ev} ne sort PAS sur $n$ essais`],
      [`1 - ${c} / n`, `la fréquence de l'issue contraire de ${s.ev} sur $n$ essais`],
    ] as const;
    const iBon = ri(0, 3);
    const [ret, bon] = RET[iBon];
    const code = `\`def ${fn}(n):\` / \`  ${c} = 0\` / \`  for i in range(n):\` / \`    if random() < ${p}:\` / \`      ${c} = ${c} + 1\` / \`  return ${ret}\``;
    const tour = pick([
      `Que renvoie \`${fn}(n)\` ?`,
      `${prenom()} lance \`${fn}(1000)\` (avec $n = 1\\,000$). Que représente le nombre affiché ?`,
      "Que calcule cette fonction ?",
    ]);
    const leurres = RET.filter((_, i) => i !== iBon).map((r) => r[1]);
    return {
      text: `${s.decor(1000)}. ${ditP(s)} On simule cette expérience en Python (\`from random import random\`) : ${code}. ${tour}`,
      format: "qcm",
      ...qcm(bon, melange([...leurres, `la probabilité exacte de l'issue ${s.ev}`])),
      comparator: "mcq_exact",
      explanation: exp(
        `\`random() < ${p}\` est vrai avec la probabilité $${fx(s.p)}$ : il simule l'issue ${s.ev}.`,
        `\`${c}\` compte les issues ${s.ev} ; à la fin, \`${c}\` vaut ce nombre et \`${c} / n\` la fréquence.`,
        `La fonction renvoie \`${ret}\`. Une simulation ne donne jamais la probabilité exacte, seulement une fréquence qui fluctue.`,
        `Elle renvoie ${bon}.`
      ),
    };
  }),

  // ★2 interpréter : ce que dit (et ne dit pas) une fréquence observée.
  gab("seconde_ech_int_gen_2", "echantillon_interpreter", 2, "Une fréquence estime une probabilité ; plus l'échantillon est grand, plus c'est fiable.", ["interpreter", "qcm"], () => {
    const s = pick(SITS.slice(7))();
    const P = prenom();
    if (Math.random() < 0.55) {
      const N = pick([500, 1000, 2000, 2500]);
      const k = Math.max(1, Math.round((s.p + ri(-2, 2) / 100) * N));
      const f = r4(k / N);
      const tour = pick([
        `Que peut-on dire de la probabilité de l'issue ${s.ev} ?`,
        `Quelle conclusion écrire dans le compte rendu de ${P} ?`,
        `Comment interpréter ce résultat ?`,
      ]);
      const bon = `La probabilité de l'issue ${s.ev} est environ $${fx(f)}$`;
      return {
        text: `${s.decor(N)} : l'issue ${s.ev} apparaît $${nb(k)}$ fois, soit une fréquence de $${fx(f)}$. ${tour}`,
        format: "qcm",
        ...qcm(bon, [
          `La probabilité de l'issue ${s.ev} vaut exactement $${fx(f)}$`,
          `La probabilité de l'issue ${s.ev} est environ $${fx(1 - f)}$`,
          `La probabilité de l'issue ${s.ev} est environ $${nb(k)}$`,
        ]),
        comparator: "mcq_exact",
        explanation: exp(
          "Sur un grand échantillon, la fréquence observée estime la probabilité.",
          `$f = \\dfrac{${nb(k)}}{${nb(N)}} = ${fx(f)}$, et $n = ${nb(N)}$ est grand.`,
          `Ce n'est qu'une estimation (« environ ») ; $${fx(1 - f)}$ concerne l'issue contraire ; une probabilité est entre $0$ et $1$.`,
          bon + "."
        ),
      };
    }
    const n = pick([4, 5, 8, 10]);
    const k = ri(n - 2 > 0 ? n - 2 : 1, n);
    const tour = pick([
      `${P} en conclut que la probabilité de l'issue ${s.ev} est $${fx(r4(k / n))}$. Est-ce une conclusion fiable ?`,
      `Peut-on se fier à la fréquence $${fx(r4(k / n))}$ pour estimer la probabilité de l'issue ${s.ev} ?`,
      `${P} affirme : « la probabilité vaut $${fx(r4(k / n))}$ ». Qu'en penser ?`,
    ]);
    const bon = `Non : $${n}$ essais, c'est trop peu, la fréquence fluctue beaucoup`;
    return {
      text: `${s.decor(n)} : l'issue ${s.ev} apparaît $${k}$ fois. ${tour}`,
      format: "qcm",
      ...qcm(bon, ["Oui : une fréquence est toujours égale à la probabilité", `Oui : $${n}$ essais suffisent toujours`, "Non : une fréquence ne sert jamais à estimer une probabilité"]),
      comparator: "mcq_exact",
      explanation: exp(
        "La loi des grands nombres ne vaut que pour un GRAND nombre d'essais.",
        `Avec $n = ${n}$, l'ordre de grandeur de la fluctuation $\\dfrac{1}{\\sqrt{${n}}}$ dépasse $0{,}3$ : énorme.`,
        `La fréquence $\\dfrac{${k}}{${n}}$ peut être très loin de la vraie probabilité.`,
        bon + "."
      ),
    };
  }),

  // ★3 interpréter : la fréquence observée est-elle dans la fluctuation habituelle p ± 1/√n ?
  gab("seconde_ech_int_gen_3", "echantillon_interpreter", 3, "Compare l'écart $|f - p|$ à $\\dfrac{1}{\\sqrt{n}}$.", ["interpreter", "qcm"], () => {
    const s = sit();
    const n = pick(TAILLES.filter((m) => m >= 100 && inv(m) <= Math.min(s.p, 1 - s.p) / 1.5));
    const e = inv(n);
    const normal = Math.random() < 0.5;
    // écart : nettement dedans (≤ 0,6·e) ou nettement dehors (≥ 1,5·e), jamais à la frontière.
    const pas = n >= 1600 ? 0.001 : 0.01;
    const ecart = r4(Math.max(pas, Math.round((e * (normal ? ri(1, 6) : ri(15, 22))) / 10 / pas) * pas));
    const versLeBas = s.p - ecart > 0 && (s.p + ecart >= 1 || Math.random() < 0.5);
    const f = r4(versLeBas ? s.p - ecart : s.p + ecart);
    const P = prenom();
    const tour = pick([
      `La fréquence observée de l'issue ${s.ev} est $${fx(f)}$. Ce résultat est-il surprenant ?`,
      `On obtient une fréquence de $${fx(f)}$ pour l'issue ${s.ev}. ${P} trouve cela bizarre. Ce résultat est-il vraiment surprenant ?`,
      `Fréquence observée de l'issue ${s.ev} : $${fx(f)}$. Est-ce compatible avec $p = ${fx(s.p)}$ ?`,
    ]);
    const OK = "Rien d'anormal : l'écart est inférieur à $\\dfrac{1}{\\sqrt{n}}$, c'est une fluctuation normale";
    const KO = "C'est surprenant : l'écart dépasse nettement $\\dfrac{1}{\\sqrt{n}}$";
    const bon = normal ? OK : KO;
    const autre = normal ? KO : OK;
    return {
      text: `${s.decor(n)}. ${ditP(s)} ${tour}`,
      format: "qcm",
      ...qcm(bon, [autre, `C'est anormal, car la fréquence devrait être exactement $${fx(s.p)}$`, "On ne peut jamais rien conclure avec le hasard"]),
      comparator: "mcq_exact",
      explanation: exp(
        "En général, $|f - p| \\le \\dfrac{1}{\\sqrt{n}}$ ; un écart nettement plus grand est surprenant.",
        `$\\dfrac{1}{\\sqrt{${nb(n)}}} = ${fx(e)}$ et $|${fx(f)} - ${fx(s.p)}| = ${fx(ecart)}$.`,
        normal ? `$${fx(ecart)} \\le ${fx(e)}$ : l'écart reste dans la fluctuation habituelle.` : `$${fx(ecart)} > ${fx(e)}$ : l'écart sort de la fluctuation habituelle.`,
        bon + "."
      ),
    };
  }),
];
