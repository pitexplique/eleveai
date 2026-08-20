// lib/tutor-v4/questionBank/stmg/maths/automatismes-calcul.bank.ts
//
// Notions : auto_fractions_puissances et auto_ordres_unites
//           (domaine STMGAU — Automatismes, rubrique « Calcul numérique »)
//
// Le BO liste ces capacités sans les rattacher à un chapitre : « les notions
// qui les sous-tendent ont été travaillées dans les classes antérieures ».
// C'est de l'entretien, en rituel — d'où des énoncés courts, des nombres qui
// se manipulent de tête, et des générateurs qui ne s'épuisent pas.
//
// ⚠️ Une écriture algébrique ou fractionnaire ne se demande JAMAIS en saisie
// libre : « 3/4 », « 0,75 » et « \dfrac{3}{4} » sont la même réponse pour un
// élève et trois chaînes pour la machine. Ces items-là sont en QCM. Les
// valeurs purement numériques, elles, passent en `short` — le comparateur
// `number_equal` accepte la virgule comme le point.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* ─────────────────────────── outils ─────────────────────────── */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fr(n: number): string {
  const arrondi = Math.round(n * 100000) / 100000;
  return String(arrondi).replace(".", ",");
}

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  const distracteurs = Array.from(new Set(wrongs)).filter((w) => w !== correct);
  return shuffle([correct, ...distracteurs.slice(0, 3)]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}

/** Fraction réduite, écrite en LaTeX. Un dénominateur 1 rend l'entier seul. */
function frac(num: number, den: number): string {
  const d = pgcd(num, den);
  const n = num / d;
  const q = den / d;
  if (q === 1) return String(n);
  return `\\dfrac{${n}}{${q}}`;
}

/* ─────────────────── réservoirs de contexte ─────────────────── */

const MARCHANDISES = [
  { nom: "un carton de livres", unite: "kg" },
  { nom: "une palette de conserves", unite: "kg" },
  { nom: "un colis express", unite: "kg" },
  { nom: "un sac de café vert", unite: "kg" },
] as const;

/** Fractions de référence : celles qu'un élève doit situer sans calculer. */
const FRACTIONS_REPERES = [
  { n: 1, d: 2 },
  { n: 1, d: 3 },
  { n: 3, d: 5 },
  { n: 2, d: 3 },
  { n: 3, d: 4 },
] as const;

/** Réservoir de comparaison : toutes ces fractions ont des valeurs DEUX À DEUX
 *  distinctes, sinon deux propositions désigneraient le même nombre et l'élève
 *  aurait raison en étant compté faux. */
const FRACTIONS_A_SITUER = [
  { n: 1, d: 5 },
  { n: 1, d: 4 },
  { n: 2, d: 7 },
  { n: 1, d: 3 },
  { n: 3, d: 8 },
  { n: 2, d: 5 },
  { n: 3, d: 7 },
  { n: 4, d: 9 },
  { n: 1, d: 2 },
  { n: 5, d: 9 },
  { n: 4, d: 7 },
  { n: 3, d: 5 },
  { n: 5, d: 8 },
  { n: 2, d: 3 },
  { n: 7, d: 10 },
  { n: 5, d: 7 },
  { n: 3, d: 4 },
  { n: 7, d: 9 },
  { n: 4, d: 5 },
  { n: 5, d: 6 },
  { n: 7, d: 8 },
  { n: 9, d: 10 },
] as const;

export const automatismesCalculBank: TutorBankItemV4[] = [
  /* ═══════════════ auto_num_fractions_operations ═══════════════ */

  {
    kind: "template",
    id: "stmg_num_fractions_ops_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_fractions_puissances",
    microId: "auto_num_fractions_operations",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour additionner deux fractions, il faut d'abord le même dénominateur.",
    tags: ["stmg", "maths", "calcul", "fractions", "template"],
    generate: () => {
      const cas = pick([
        { a: 1, b: 2, c: 1, d: 4 },
        { a: 1, b: 3, c: 1, d: 6 },
        { a: 2, b: 3, c: 1, d: 6 },
        { a: 1, b: 4, c: 3, d: 8 },
        { a: 3, b: 5, c: 1, d: 10 },
        { a: 1, b: 2, c: 1, d: 3 },
        { a: 2, b: 5, c: 1, d: 4 },
        { a: 3, b: 4, c: 1, d: 6 },
        { a: 1, b: 5, c: 3, d: 10 },
        { a: 5, b: 6, c: 1, d: 4 },
      ] as const);
      const num = cas.a * cas.d + cas.c * cas.b;
      const den = cas.b * cas.d;
      return {
        text: `Calcule : $\\dfrac{${cas.a}}{${cas.b}} + \\dfrac{${cas.c}}{${cas.d}}$`,
        format: "qcm",
        choices: makeChoices(`$${frac(num, den)}$`, [
          `$${frac(cas.a + cas.c, cas.b + cas.d)}$`,
          `$${frac(cas.a + cas.c, cas.b * cas.d)}$`,
          `$${frac(cas.a * cas.c, cas.b * cas.d)}$`,
          `$${frac(num, cas.b + cas.d)}$`,
          `$${frac(cas.a * cas.d - cas.c * cas.b, den)}$`,
        ]),
        expected: [`$${frac(num, den)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux fractions ne s'additionnent qu'une fois réduites au même dénominateur.",
          "On cherche un dénominateur commun, on convertit chaque fraction, puis on additionne les numérateurs.",
          `$\\dfrac{${cas.a}}{${cas.b}} + \\dfrac{${cas.c}}{${cas.d}} = \\dfrac{${cas.a * cas.d}}{${den}} + \\dfrac{${cas.c * cas.b}}{${den}} = \\dfrac{${num}}{${den}} = ${frac(num, den)}$.`,
          `Le résultat est $${frac(num, den)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${frac(cas.a + cas.c, cas.b + cas.d)}$`,
            cause: "a additionné les numérateurs entre eux et les dénominateurs entre eux",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "stmg_num_fractions_ops_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_fractions_puissances",
    microId: "auto_num_fractions_operations",
    difficulty: 2,
    theme: "neutral",
    hint: "Prendre une fraction d'une quantité, c'est multiplier.",
    tags: ["stmg", "maths", "calcul", "fractions", "template", "short"],
    generate: () => {
      const den = pick([2, 3, 4, 5, 6, 8, 10] as const);
      const num = pick([1, 2, 3] as const);
      const quantite = den * pick([4, 6, 10, 12, 20, 30] as const);
      const resultat = (quantite * num) / den;
      return {
        text:
          `Un entrepôt contient $${quantite}$ colis. ` +
          `$\\dfrac{${num}}{${den}}$ d'entre eux partent le matin. Combien de colis partent le matin ?`,
        format: "short",
        expected: [fr(resultat)],
        comparator: "number_equal",
        explanation: exp(
          "Prendre $\\dfrac{a}{b}$ d'une quantité, c'est la multiplier par cette fraction.",
          "On divise par le dénominateur, puis on multiplie par le numérateur.",
          `$${quantite} \\div ${den} = ${fr(quantite / den)}$, puis $\\times ${num}$ donne $${fr(resultat)}$.`,
          `$${fr(resultat)}$ colis partent le matin.`
        ),
      };
    },
  },

  /* ═══════════════ auto_num_fractions_comparer ═══════════════ */

  {
    kind: "template",
    id: "stmg_num_fractions_comparer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_fractions_puissances",
    microId: "auto_num_fractions_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Ramène les deux fractions au même dénominateur, ou compare leurs écritures décimales.",
    tags: ["stmg", "maths", "calcul", "fractions", "template"],
    generate: () => {
      const cas = pick([
        { a: 2, b: 3, c: 3, d: 5 },
        { a: 3, b: 4, c: 5, d: 8 },
        { a: 5, b: 6, c: 4, d: 5 },
        { a: 1, b: 3, c: 2, d: 5 },
        { a: 7, b: 10, c: 2, d: 3 },
        { a: 3, b: 8, c: 2, d: 5 },
        { a: 5, b: 12, c: 1, d: 2 },
        { a: 4, b: 7, c: 3, d: 5 },
        { a: 9, b: 10, c: 7, d: 8 },
        { a: 2, b: 7, c: 1, d: 4 },
      ] as const);
      const v1 = cas.a / cas.b;
      const v2 = cas.c / cas.d;
      const plusGrande = v1 > v2 ? `$\\dfrac{${cas.a}}{${cas.b}}$` : `$\\dfrac{${cas.c}}{${cas.d}}$`;
      return {
        text: `Quelle est la plus grande de ces deux fractions : $\\dfrac{${cas.a}}{${cas.b}}$ ou $\\dfrac{${cas.c}}{${cas.d}}$ ?`,
        format: "qcm",
        choices: shuffle([
          `$\\dfrac{${cas.a}}{${cas.b}}$`,
          `$\\dfrac{${cas.c}}{${cas.d}}$`,
          "elles sont égales",
          "on ne peut pas comparer des fractions de dénominateurs différents",
        ]),
        expected: [plusGrande],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux fractions se comparent une fois ramenées au même dénominateur — ou par leurs écritures décimales.",
          "On multiplie en croix, ou on calcule les deux quotients.",
          `$\\dfrac{${cas.a}}{${cas.b}} = ${fr(Math.round(v1 * 1000) / 1000)}$ et $\\dfrac{${cas.c}}{${cas.d}} = ${fr(Math.round(v2 * 1000) / 1000)}$.`,
          `La plus grande est ${plusGrande}.`
        ),
        choiceDiagnostics: [
          {
            choice: "on ne peut pas comparer des fractions de dénominateurs différents",
            cause: "n'a pas pensé à réduire au même dénominateur",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — TRIER quatre fractions autour d'un repère, au lieu d'en
    // comparer deux. Le premier item met deux fractions face à face ; celui-ci
    // demande de SITUER, ce qui est le geste réel de l'automatisme : savoir si
    // une part dépasse la moitié sans poser de division.
    // ⚠️ Aucune figure : une bande graduée donnerait la réponse à l'œil et
    // remplacerait la comparaison par une lecture.
    kind: "template",
    id: "stmg_num_fractions_comparer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_fractions_puissances",
    microId: "auto_num_fractions_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare chaque fraction au repère, une par une : le numérateur vaut-il plus ou moins que la part attendue ?",
    tags: ["stmg", "maths", "calcul", "fractions", "template"],
    generate: () => {
      const repere = pick(FRACTIONS_REPERES);
      const vRepere = repere.n / repere.d;
      // La marge de 0,05 écarte les fractions trop proches du repère : sans
      // elle, l'item demanderait un calcul écrit, plus un automatisme.
      const dessous = FRACTIONS_A_SITUER.filter((f) => vRepere - f.n / f.d >= 0.05);
      const dessus = FRACTIONS_A_SITUER.filter((f) => f.n / f.d - vRepere >= 0.05);
      const petite = pick(dessous);
      const quatre = shuffle([petite, ...shuffle(dessus).slice(0, 3)]);
      const ecrire = (f: { n: number; d: number }) => `$\\dfrac{${f.n}}{${f.d}}$`;
      const decimal = (f: { n: number; d: number }) => fr(Math.round((f.n / f.d) * 1000) / 1000);
      return {
        text:
          `Parmi ces quatre fractions, une seule est INFÉRIEURE à $\\dfrac{${repere.n}}{${repere.d}}$. ` +
          `Laquelle ?`,
        format: "qcm",
        choices: quatre.map(ecrire),
        expected: [ecrire(petite)],
        comparator: "mcq_exact",
        explanation: exp(
          `Situer une fraction par rapport à un repère, c'est comparer deux quotients : $\\dfrac{${repere.n}}{${repere.d}} = ${decimal(repere)}$.`,
          "On calcule mentalement chaque quotient, ou on ramène chaque fraction au même dénominateur que le repère.",
          quatre.map((f) => `${ecrire(f)} $= ${decimal(f)}$`).join(" · ") +
            `. Une seule est plus petite que $${decimal(repere)}$.`,
          `La fraction inférieure à $\\dfrac{${repere.n}}{${repere.d}}$ est ${ecrire(petite)}.`
        ),
      };
    },
  },

  /* ═══════════════════ auto_num_puissances ═══════════════════ */

  {
    kind: "template",
    id: "stmg_num_puissances_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_fractions_puissances",
    microId: "auto_num_puissances",
    difficulty: 2,
    theme: "neutral",
    hint: "Un produit de puissances de même base : les exposants s'AJOUTENT.",
    tags: ["stmg", "maths", "calcul", "puissances", "template"],
    generate: () => {
      const base = pick([2, 3, 5, 10] as const);
      const m = pick([2, 3, 4, 5] as const);
      const n = pick([2, 3, 4, 6] as const);
      const somme = m + n;
      return {
        text: `Écris $${base}^{${m}} \\times ${base}^{${n}}$ sous la forme d'une seule puissance de $${base}$.`,
        format: "qcm",
        choices: makeChoices(`$${base}^{${somme}}$`, [
          `$${base}^{${m * n}}$`,
          `$${base}^{${Math.abs(m - n)}}$`,
          `$${base * base}^{${somme}}$`,
          `$${base}^{${somme + 1}}$`,
          `$${base * base}^{${m * n}}$`,
        ]),
        expected: [`$${base}^{${somme}}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour un produit de puissances de même base : $a^m \\times a^n = a^{m+n}$.",
          "On garde la base et on additionne les exposants.",
          `$${base}^{${m}} \\times ${base}^{${n}} = ${base}^{${m}+${n}} = ${base}^{${somme}}$.`,
          `Le résultat est $${base}^{${somme}}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${base}^{${m * n}}$`,
            cause: "a multiplié les exposants au lieu de les additionner",
          },
          {
            choice: `$${base * base}^{${somme}}$`,
            cause: "a multiplié les bases entre elles ; la base ne change pas",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "stmg_num_puissances_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_fractions_puissances",
    microId: "auto_num_puissances",
    difficulty: 2,
    theme: "neutral",
    hint: "$10^{-n}$ est l'inverse de $10^{n}$.",
    tags: ["stmg", "maths", "calcul", "puissances", "template", "short"],
    generate: () => {
      const n = pick([1, 2, 3, 4] as const);
      const m = pick([1, 2, 3, 5] as const);
      const resultat = Math.pow(10, m - n);
      return {
        text: `Calcule $10^{${m}} \\times 10^{-${n}}$ et donne le résultat en écriture décimale.`,
        format: "short",
        expected: [fr(resultat)],
        comparator: "number_equal",
        explanation: exp(
          "$10^{m} \\times 10^{-n} = 10^{m-n}$, et $10^{-k} = \\dfrac{1}{10^{k}}$.",
          "On additionne les exposants en tenant compte du signe, puis on écrit le nombre.",
          `$10^{${m}} \\times 10^{-${n}} = 10^{${m - n}} = ${fr(resultat)}$.`,
          `Le résultat vaut $${fr(resultat)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ auto_num_ecritures ═══════════════════ */

  {
    kind: "template",
    id: "stmg_num_ecritures_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_fractions_puissances",
    microId: "auto_num_ecritures",
    difficulty: 2,
    theme: "neutral",
    hint: "En écriture scientifique, il y a UN seul chiffre non nul avant la virgule.",
    tags: ["stmg", "maths", "calcul", "ecritures", "template"],
    generate: () => {
      const mantisse = pick([1.2, 2.5, 3.4, 4.8, 5.6, 7.2, 8.9, 9.5] as const);
      const exposant = pick([3, 4, 5, 6] as const);
      const valeur = mantisse * Math.pow(10, exposant);
      return {
        text: `Écris $${fr(valeur)}$ en écriture scientifique.`,
        format: "qcm",
        choices: makeChoices(`$${fr(mantisse)} \\times 10^{${exposant}}$`, [
          `$${fr(mantisse * 10)} \\times 10^{${exposant - 1}}$`,
          `$${fr(mantisse)} \\times 10^{${exposant + 1}}$`,
          `$${fr(mantisse / 10)} \\times 10^{${exposant}}$`,
          `$${fr(mantisse)} \\times 10^{-${exposant}}$`,
          `$${fr(valeur)} \\times 10^{${exposant}}$`,
        ]),
        expected: [`$${fr(mantisse)} \\times 10^{${exposant}}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "L'écriture scientifique d'un nombre est $a \\times 10^{n}$ avec $1 \\leqslant a < 10$.",
          "On place la virgule après le premier chiffre non nul, puis on compte les rangs déplacés.",
          `$${fr(valeur)} = ${fr(mantisse)} \\times 10^{${exposant}}$.`,
          `L'écriture scientifique est $${fr(mantisse)} \\times 10^{${exposant}}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(mantisse * 10)} \\times 10^{${exposant - 1}}$`,
            cause: "a laissé deux chiffres avant la virgule : ce n'est plus l'écriture scientifique",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "stmg_num_ecritures_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_fractions_puissances",
    microId: "auto_num_ecritures",
    difficulty: 1,
    theme: "neutral",
    hint: "Une fraction est un quotient : effectue la division.",
    tags: ["stmg", "maths", "calcul", "ecritures", "template", "short"],
    generate: () => {
      const cas = pick([
        { n: 1, d: 4 },
        { n: 3, d: 4 },
        { n: 1, d: 5 },
        { n: 2, d: 5 },
        { n: 3, d: 5 },
        { n: 1, d: 2 },
        { n: 1, d: 8 },
        { n: 3, d: 8 },
        { n: 7, d: 10 },
        { n: 9, d: 20 },
        { n: 1, d: 20 },
        { n: 7, d: 25 },
      ] as const);
      return {
        text: `Donne l'écriture décimale de $\\dfrac{${cas.n}}{${cas.d}}$.`,
        format: "short",
        expected: [fr(cas.n / cas.d)],
        comparator: "number_equal",
        explanation: exp(
          "Une fraction est le quotient du numérateur par le dénominateur.",
          "On effectue la division.",
          `$${cas.n} \\div ${cas.d} = ${fr(cas.n / cas.d)}$.`,
          `L'écriture décimale est $${fr(cas.n / cas.d)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ auto_num_calcul_mental ═══════════════════ */

  {
    kind: "template",
    id: "stmg_num_mental_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_ordres_unites",
    microId: "auto_num_calcul_mental",
    difficulty: 1,
    theme: "neutral",
    hint: "Prendre $50\\,\\%$, c'est la moitié ; $25\\,\\%$, le quart ; $10\\,\\%$, on décale la virgule.",
    tags: ["stmg", "maths", "calcul", "mental", "template", "short"],
    generate: () => {
      const t = pick([10, 20, 25, 50, 75] as const);
      const base = pick([40, 60, 80, 120, 160, 200, 240, 360, 400, 800] as const);
      const resultat = (base * t) / 100;
      return {
        text: `Calcule mentalement $${t}\\,\\%$ de $${base}$.`,
        format: "short",
        expected: [fr(resultat)],
        comparator: "number_equal",
        explanation: exp(
          "Les pourcentages usuels se ramènent à des fractions simples : $50\\,\\% = \\dfrac{1}{2}$, $25\\,\\% = \\dfrac{1}{4}$, $10\\,\\% = \\dfrac{1}{10}$.",
          "On choisit la fraction la plus commode plutôt que de poser la multiplication.",
          `$${t}\\,\\%$ de $${base}$ : $${base} \\times ${fr(t / 100)} = ${fr(resultat)}$.`,
          `Le résultat est $${fr(resultat)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "stmg_num_mental_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_ordres_unites",
    microId: "auto_num_calcul_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par $0,5$, c'est diviser par $2$ ; par $0,25$, diviser par $4$.",
    tags: ["stmg", "maths", "calcul", "mental", "template", "short"],
    generate: () => {
      const coef = pick([0.1, 0.25, 0.5, 0.75, 1.5, 2.5] as const);
      const base = pick([40, 60, 80, 120, 200, 240, 400] as const);
      return {
        text: `Calcule mentalement $${base} \\times ${fr(coef)}$.`,
        format: "short",
        expected: [fr(base * coef)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par un décimal simple revient souvent à une division ou à une combinaison de moitiés.",
          `On décompose : $${fr(coef)}$ se lit comme une fraction commode.`,
          `$${base} \\times ${fr(coef)} = ${fr(base * coef)}$.`,
          `Le résultat est $${fr(base * coef)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ auto_num_ordre_grandeur ═══════════════════ */

  {
    kind: "template",
    id: "stmg_num_ordre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_ordres_unites",
    microId: "auto_num_ordre_grandeur",
    difficulty: 2,
    theme: "neutral",
    hint: "Arrondis chaque facteur au nombre rond le plus proche avant de multiplier.",
    tags: ["stmg", "maths", "calcul", "ordre-de-grandeur", "template"],
    generate: () => {
      const arrondiA = pick([20, 30, 40, 50, 60, 80] as const);
      const arrondiB = pick([200, 300, 400, 500, 800] as const);
      const a = arrondiA + pick([-3, -2, -1, 1, 2, 3] as const);
      const b = arrondiB + pick([-12, -7, 6, 9, 14] as const);
      const ordre = arrondiA * arrondiB;
      return {
        text:
          `Une entreprise vend $${a}$ articles à $${b}$ € l'unité. ` +
          `Quel est l'ordre de grandeur du chiffre d'affaires ?`,
        format: "qcm",
        choices: makeChoices(`environ $${ordre}$ €`, [
          `environ $${ordre * 10}$ €`,
          `environ $${ordre / 10}$ €`,
          `environ $${arrondiA + arrondiB}$ €`,
          `environ $${ordre * 100}$ €`,
          `environ $${arrondiB / arrondiA}$ €`,
        ]),
        expected: [`environ $${ordre}$ €`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un ordre de grandeur s'obtient en remplaçant chaque nombre par une valeur ronde proche.",
          "On arrondit, on calcule mentalement, et on vérifie que le résultat est vraisemblable.",
          `$${a} \\approx ${arrondiA}$ et $${b} \\approx ${arrondiB}$, donc $${arrondiA} \\times ${arrondiB} = ${ordre}$.`,
          `Le chiffre d'affaires est de l'ordre de $${ordre}$ €.`
        ),
        choiceDiagnostics: [
          {
            choice: `environ $${arrondiA + arrondiB}$ €`,
            cause: "a additionné au lieu de multiplier",
          },
          {
            choice: `environ $${ordre * 10}$ €`,
            cause: "s'est trompé d'un rang dans le nombre de zéros",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — le geste À L'ENVERS. Le premier item estime un produit ; ici
    // le produit est donné et c'est un FACTEUR qu'on cherche : l'ordre de
    // grandeur passe par une division. C'est le calcul que fait un gestionnaire
    // qui lit un chiffre d'affaires et veut savoir combien d'articles il
    // représente.
    // ⚠️ Aucune figure : il n'y a rien à voir, seulement deux nombres à
    // arrondir de tête.
    kind: "template",
    id: "stmg_num_ordre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_ordres_unites",
    microId: "auto_num_ordre_grandeur",
    difficulty: 2,
    theme: "neutral",
    hint: "Arrondis les deux nombres, puis divise : le nombre d'articles n'est pas un produit.",
    tags: ["stmg", "maths", "calcul", "ordre-de-grandeur", "template"],
    generate: () => {
      const prixRond = pick([20, 40, 50, 80] as const);
      const qteRonde = pick([200, 300, 400, 500, 800] as const);
      // Les nombres affichés sont les VRAIS nombres de la situation : le
      // chiffre d'affaires est le produit exact, pas une valeur inventée à
      // côté du résultat attendu. L'écart au prix rond reste petit devant le
      // prix lui-même, sinon l'arrondi ne serait plus celui-là.
      const prixAffiche = prixRond + (prixRond <= 20 ? pick([-1, 1] as const) : pick([-3, -2, 2, 3] as const));
      const qteReelle = qteRonde + pick([-7, -3, 4, 9] as const);
      const chiffreAffaires = prixAffiche * qteReelle;
      return {
        text:
          `Le chiffre d'affaires du mois s'élève à $${chiffreAffaires}$ €. ` +
          `Chaque article est vendu $${prixAffiche}$ €. ` +
          `Quel est l'ordre de grandeur du nombre d'articles vendus ?`,
        format: "qcm",
        choices: makeChoices(`environ $${qteRonde}$ articles`, [
          `environ $${qteRonde * 10}$ articles`,
          `environ $${qteRonde / 10}$ articles`,
          `environ $${prixRond}$ articles`,
          `environ $${qteRonde * 100}$ articles`,
          `environ $${prixRond * 10}$ articles`,
        ]),
        expected: [`environ $${qteRonde}$ articles`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un ordre de grandeur s'obtient en remplaçant chaque nombre par une valeur ronde proche, puis en menant le calcul de tête.",
          "Le chiffre d'affaires est le produit du prix par la quantité : pour retrouver la quantité, on DIVISE.",
          `On arrondit le prix : $${prixAffiche} \\approx ${prixRond}$ €. ` +
            `Avec $${qteRonde}$ articles, le chiffre d'affaires serait d'environ $${prixRond} \\times ${qteRonde} = ${prixRond * qteRonde}$ € : ` +
            `c'est bien l'ordre de grandeur de $${chiffreAffaires}$ €. ` +
            `Avec dix fois plus d'articles il atteindrait $${prixRond * qteRonde * 10}$ €, avec dix fois moins seulement $${prixRond * (qteRonde / 10)}$ € — ni l'un ni l'autre ne correspond.`,
          `L'entreprise a vendu environ $${qteRonde}$ articles.`
        ),
        choiceDiagnostics: [
          {
            choice: `environ $${qteRonde / 10}$ articles`,
            cause: "s'est trompé d'un rang en divisant",
          },
          {
            choice: `environ $${prixRond}$ articles`,
            cause: "a repris le prix unitaire au lieu de chercher la quantité",
          },
        ],
      };
    },
  },

  /* ═══════════════════ auto_num_conversions ═══════════════════ */

  {
    kind: "template",
    id: "stmg_num_conversions_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_ordres_unites",
    microId: "auto_num_conversions",
    difficulty: 2,
    theme: "neutral",
    hint: "Une heure vaut $60$ minutes : $0,5$ h font $30$ min, pas $50$.",
    tags: ["stmg", "maths", "calcul", "conversions", "template", "short"],
    generate: () => {
      const heures = pick([1, 2, 3, 4] as const);
      const minutes = pick([15, 20, 30, 40, 45, 50] as const);
      const total = heures * 60 + minutes;
      return {
        text:
          `Une livraison dure $${heures}$ h $${minutes}$ min. ` +
          `Combien cela fait-il de minutes au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Les durées ne sont pas décimales : $1$ h $= 60$ min.",
          "On convertit les heures en minutes, puis on ajoute les minutes restantes.",
          `$${heures} \\times 60 = ${heures * 60}$, puis $${heures * 60} + ${minutes} = ${total}$.`,
          `La livraison dure $${total}$ minutes.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "stmg_num_conversions_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_ordres_unites",
    microId: "auto_num_conversions",
    difficulty: 2,
    theme: "neutral",
    hint: "$1$ tonne $= 1000$ kg ; $1$ kg $= 1000$ g.",
    tags: ["stmg", "maths", "calcul", "conversions", "template", "short"],
    generate: () => {
      const marchandise = pick(MARCHANDISES);
      const tonnes = pick([0.5, 1.2, 2.4, 3.5, 4.8, 0.75, 6.2] as const);
      const kg = tonnes * 1000;
      return {
        text:
          `Un chargement de ${marchandise.nom.replace(/^un |^une /, "")} pèse $${fr(tonnes)}$ tonne(s). ` +
          `Combien cela fait-il de kilogrammes ?`,
        format: "short",
        expected: [fr(kg)],
        comparator: "number_equal",
        explanation: exp(
          "Une tonne vaut $1000$ kilogrammes.",
          "On multiplie par $1000$, ce qui décale la virgule de trois rangs vers la droite.",
          `$${fr(tonnes)} \\times 1000 = ${fr(kg)}$.`,
          `Le chargement pèse $${fr(kg)}$ kg.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "stmg_num_conversions_tpl_3",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_ordres_unites",
    microId: "auto_num_conversions",
    difficulty: 3,
    theme: "neutral",
    hint: "Une vitesse en km/h se lit « kilomètres PAR heure » : on divise une distance par une durée.",
    tags: ["stmg", "maths", "calcul", "conversions", "vitesse", "template"],
    generate: () => {
      const vitesse = pick([30, 45, 60, 75, 90, 120] as const);
      const minutes = pick([20, 30, 40, 45] as const);
      const distance = (vitesse * minutes) / 60;
      return {
        text:
          `Un camion roule à $${vitesse}$ km/h pendant $${minutes}$ minutes. ` +
          `Quelle distance parcourt-il ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(distance)}$ km`, [
          `$${fr(vitesse * minutes)}$ km`,
          `$${fr(vitesse / minutes)}$ km`,
          `$${fr(vitesse - minutes)}$ km`,
          `$${fr((vitesse * 60) / minutes)}$ km`,
          `$${fr(distance * 2)}$ km`,
        ]),
        expected: [`$${fr(distance)}$ km`],
        comparator: "mcq_exact",
        explanation: exp(
          "Distance $=$ vitesse $\\times$ durée, à condition que la durée soit exprimée dans la même unité de temps que la vitesse.",
          "La vitesse est en km/h : on convertit d'abord les minutes en heures.",
          `$${minutes}$ min $= \\dfrac{${minutes}}{60} = ${fr(Math.round((minutes / 60) * 10000) / 10000)}$ h, donc $${vitesse} \\times ${fr(Math.round((minutes / 60) * 10000) / 10000)} = ${fr(distance)}$ km.`,
          `Le camion parcourt $${fr(distance)}$ km.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(vitesse * minutes)}$ km`,
            cause: "a multiplié par les minutes sans les convertir en heures",
          },
        ],
      };
    },
  },
];
