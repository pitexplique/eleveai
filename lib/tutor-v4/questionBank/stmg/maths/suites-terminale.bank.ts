// lib/tutor-v4/questionBank/stmg/maths/suites-terminale.bank.ts
//
// Notions : suite_terme_general, suite_moyennes, suite_somme,
//           suite_somme_situations, suite_comparer
//           (domaine STMGSU, année de terminale)
//
// C'est ici que le programme lève ce qu'il avait retenu en première : le terme
// général en fonction de $n$, et la somme des $n$ premiers termes avec la
// notation $\Sigma$. Les deux figurent explicitement dans les contenus de
// l'annexe de terminale, à côté des moyennes arithmétique et géométrique de
// deux nombres.
//
// ⛔ Suites géométriques à TERMES STRICTEMENT POSITIFS : toutes les raisons
// tirées ici sont $> 0$.
//
// ⚠️ Les sommes sont TOUJOURS écrites en extension dans l'énoncé
// ($u(0) + u(1) + \dots + u(5)$) plutôt que sous la forme « la somme des 6
// premiers termes ». La seconde formulation est ambiguë — commence-t-on à
// $u(0)$ ou à $u(1)$ ? — et l'ambiguïté ferait rater la question à un élève
// qui a pourtant compris. Le programme demande de travailler la notation
// $\Sigma$, pas de piéger sur l'indexation.
//
// Le vocabulaire est celui que le BO nomme lui-même dans ses commentaires :
// valeurs acquises, placements à intérêts composés avec versements réguliers,
// intérêts simples et composés, taux équivalent et taux proportionnel.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* ─────────────────────────── outils ─────────────────────────── */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  const arrondi = Math.round(n * 10000) / 10000;
  return String(arrondi).replace(".", ",");
}

function eur(n: number): string {
  return fr(Math.round(n * 100) / 100);
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

function termesArith(u0: number, r: number, n: number): number[] {
  const t = [u0];
  for (let k = 1; k < n; k++) t.push(t[k - 1] + r);
  return t;
}

function termesGeo(u0: number, q: number, n: number): number[] {
  const t = [u0];
  for (let k = 1; k < n; k++) t.push(Math.round(t[k - 1] * q * 1000000) / 1000000);
  return t;
}

function canvasTableau(termes: number[], titre: string): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: titre,
    headers: ["n", ...termes.map((_, k) => String(k))],
    rows: [{ label: "u(n)", values: termes.map((v) => eur(v)) }],
  };
}

/* ─────────────────── réservoirs de contexte ─────────────────── */

const PLACEMENTS = [
  "un plan d'épargne",
  "un livret d'entreprise",
  "un compte de capitalisation",
  "un fonds de réserve",
] as const;

const GRANDEURS_GEO = [
  { sujet: "le chiffre d'affaires", unite: "k€" },
  { sujet: "le nombre d'abonnés", unite: "abonnés" },
  { sujet: "la valeur du parc de machines", unite: "€" },
  { sujet: "le nombre de commandes en ligne", unite: "commandes" },
] as const;

export const suitesTerminaleBank: TutorBankItemV4[] = [
  /* ═══════════════ suiteT_arith_explicite ═══════════════ */

  {
    kind: "template",
    id: "stmg_suiteT_arith_explicite_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_terme_general",
    microId: "suiteT_arith_explicite",
    difficulty: 2,
    theme: "neutral",
    hint: "Depuis $u(0)$, il faut ajouter la raison $n$ fois : $u(n) = u(0) + nr$.",
    tags: ["stmg", "maths", "suites", "terminale", "template"],
    generate: () => {
      const u0 = pick([12, 25, 40, 60, 80, 100, 150, 200] as const);
      const r = pick([-25, -15, -8, -5, 4, 7, 12, 18, 30, 45] as const);
      const ecrire = (a: number, b: number) => `$u(n) = ${a}n ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$`;
      return {
        text:
          `Une suite arithmétique a pour premier terme $u(0) = ${u0}$ et pour raison $r = ${fr(r)}$. ` +
          `Quelle est l'expression de $u(n)$ en fonction de $n$ ?`,
        format: "qcm",
        choices: makeChoices(ecrire(r, u0), [
          ecrire(u0, r),
          ecrire(r, u0 + r),
          ecrire(r, -u0),
          ecrire(-r, u0),
          ecrire(r * u0, u0),
        ]),
        expected: [ecrire(r, u0)],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour une suite arithmétique de premier terme $u(0)$ et de raison $r$ : $u(n) = u(0) + nr$.",
          "On part du premier terme et l'on ajoute la raison autant de fois qu'il y a de rangs à franchir.",
          `$u(n) = ${u0} + n \\times (${fr(r)})$, soit ${ecrire(r, u0)}.`,
          `L'expression est ${ecrire(r, u0)}.`
        ),
        choiceDiagnostics: [
          {
            choice: ecrire(u0, r),
            cause: "a interverti le premier terme et la raison",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — À QUOI SERT la forme explicite. Le premier item la fait
    // écrire ; celui-ci s'en sert pour SAUTER au rang 25 sans passer par les
    // vingt-quatre précédents. C'est la raison même pour laquelle le programme
    // l'introduit en terminale — en première, il fallait dérouler la récurrence
    // ligne à ligne, et le tableur y suppléait.
    kind: "template",
    id: "stmg_suiteT_arith_explicite_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_terme_general",
    microId: "suiteT_arith_explicite",
    difficulty: 2,
    theme: "neutral",
    hint: "On remplace $n$ par le rang demandé : aucun terme intermédiaire n'est nécessaire.",
    tags: ["stmg", "maths", "suites", "template", "short"],
    generate: () => {
      const u0 = pick([12, 25, 40, 60, 80, 100, 150, 200] as const);
      const r = pick([-25, -15, -8, -5, 4, 7, 12, 18, 30, 45] as const);
      const n = pick([15, 20, 24, 30, 40] as const);
      const valeur = r * n + u0;
      return {
        text:
          `Une suite arithmétique a pour terme général $u(n) = ${r}n ${u0 >= 0 ? "+" : "-"} ${Math.abs(u0)}$. ` +
          `Que vaut $u(${n})$ ?`,
        format: "short",
        expected: [fr(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "Le terme général donne chaque terme DIRECTEMENT en fonction de son rang : il suffit d'y remplacer $n$. C'est ce qui distingue une définition explicite d'une définition par récurrence.",
          "On substitue le rang demandé, puis on calcule en respectant les signes.",
          `$u(${n}) = ${r} \\times ${n} ${u0 >= 0 ? "+" : "-"} ${Math.abs(u0)} = ${fr(r * n)} ${u0 >= 0 ? "+" : "-"} ${Math.abs(u0)} = ${fr(valeur)}$. ` +
            `Par récurrence, il aurait fallu ${n} additions successives depuis $u(0) = ${u0}$ : ` +
            `le résultat est le même, le chemin est bien plus long.`,
          `$u(${n}) = ${fr(valeur)}$.`
        ),
      };
    },
  },

  /* ═══════════════ suiteT_geo_explicite ═══════════════ */

  {
    kind: "template",
    id: "stmg_suiteT_geo_explicite_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_terme_general",
    microId: "suiteT_geo_explicite",
    difficulty: 2,
    theme: "neutral",
    hint: "Depuis $u(0)$, on multiplie par la raison $n$ fois : $u(n) = u(0) \\times q^n$.",
    tags: ["stmg", "maths", "suites", "terminale", "template"],
    generate: () => {
      const u0 = pick([50, 80, 100, 200, 400, 500, 1000, 1500] as const);
      const q = pick([0.5, 0.8, 0.9, 1.05, 1.1, 1.2, 1.25, 1.5, 2, 3] as const);
      return {
        text:
          `Une suite géométrique a pour premier terme $u(0) = ${u0}$ et pour raison $q = ${fr(q)}$. ` +
          `Quelle est l'expression de $u(n)$ en fonction de $n$ ?`,
        format: "qcm",
        choices: makeChoices(`$u(n) = ${u0} \\times ${fr(q)}^n$`, [
          `$u(n) = ${fr(q)} \\times ${u0}^n$`,
          `$u(n) = ${u0} \\times ${fr(q)} \\times n$`,
          `$u(n) = ${u0} + ${fr(q)}^n$`,
          `$u(n) = (${u0} \\times ${fr(q)})^n$`,
          `$u(n) = ${u0} \\times ${fr(q)}^{n+1}$`,
        ]),
        expected: [`$u(n) = ${u0} \\times ${fr(q)}^n$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour une suite géométrique de premier terme $u(0)$ et de raison $q$ : $u(n) = u(0) \\times q^{n}$.",
          "On part du premier terme et l'on multiplie par la raison autant de fois qu'il y a de rangs à franchir : l'exposant compte les multiplications.",
          `$u(n) = ${u0} \\times ${fr(q)}^{n}$.`,
          `L'expression est $u(n) = ${u0} \\times ${fr(q)}^n$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$u(n) = ${fr(q)} \\times ${u0}^n$`,
            cause: "a interverti le premier terme et la raison",
          },
          {
            choice: `$u(n) = ${u0} \\times ${fr(q)} \\times n$`,
            cause: "a multiplié par n au lieu d'élever à la puissance n",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "stmg_suiteT_geo_explicite_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_terme_general",
    microId: "suiteT_geo_explicite",
    difficulty: 3,
    theme: "neutral",
    hint: "L'expression explicite permet de sauter directement au rang demandé.",
    tags: ["stmg", "maths", "suites", "terminale", "template", "short"],
    generate: () => {
      const grandeur = pick(GRANDEURS_GEO);
      const u0 = pick([200, 400, 500, 800, 1000, 2000] as const);
      const t = pick([5, 10, 20, 25, 50] as const);
      const q = 1 + t / 100;
      const n = randomInt(4, 9);
      const valeur = u0 * Math.pow(q, n);
      return {
        text:
          `${grandeur.sujet.charAt(0).toUpperCase()}${grandeur.sujet.slice(1)} vaut $${u0}$ ${grandeur.unite} aujourd'hui ` +
          `et progresse de $${t}\\,\\%$ par an. Quelle sera sa valeur au bout de $${n}$ ans, à l'unité près ?`,
        format: "short",
        expected: [fr(Math.round(valeur))],
        comparator: "number_equal",
        explanation: exp(
          "Une évolution au taux constant se modélise par une suite géométrique, dont le terme général est $u(n) = u(0) \\times q^{n}$.",
          "On traduit le taux en raison, puis on applique l'expression explicite — inutile de dérouler les $n$ étapes.",
          `$q = ${fr(q)}$, donc $u(${n}) = ${u0} \\times ${fr(q)}^{${n}} \\approx ${fr(Math.round(valeur))}$.`,
          `Au bout de $${n}$ ans, la valeur sera d'environ $${fr(Math.round(valeur))}$ ${grandeur.unite}.`
        ),
      };
    },
  },

  /* ═══════════════ suiteT_raison_modele ═══════════════ */

  {
    kind: "template",
    id: "stmg_suiteT_raison_modele_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_terme_general",
    microId: "suiteT_raison_modele",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux termes connus suffisent : leur quotient donne $q^{\\,\\text{écart de rangs}}$.",
    tags: ["stmg", "maths", "suites", "terminale", "canvas", "template", "short"],
    generate: () => {
      const u0 = pick([100, 200, 400, 800, 1000] as const);
      const q = pick([1.5, 2, 3, 0.5] as const);
      const termes = termesGeo(u0, q, 5);
      return {
        text: `Le tableau donne les termes d'une suite géométrique modélisant une évolution. Quelle est sa raison ?`,
        format: "short",
        expected: [fr(q)],
        comparator: "number_equal",
        canvas: canvasTableau(termes, "Termes de la suite"),
        explanation: exp(
          "La raison d'une suite géométrique est le quotient de deux termes consécutifs.",
          "On divise un terme par son prédécesseur, puis on vérifie sur une autre paire — c'est ce qui distingue une suite géométrique d'une suite quelconque.",
          `$\\dfrac{${eur(termes[1])}}{${eur(termes[0])}} = ${fr(q)}$, et $\\dfrac{${eur(termes[3])}}{${eur(termes[2])}} = ${fr(q)}$.`,
          `La raison est $q = ${fr(q)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — REMONTER au premier terme. Le premier item lit la raison dans
    // un tableau ; celui-ci donne un terme lointain et la raison, et fait
    // retrouver $u(0)$. Avec la forme explicite $u(n) = u_0 \times q^n$, c'est
    // une division par $q^n$ — le geste que réclame tout énoncé qui part de la
    // situation d'aujourd'hui pour remonter à celle du départ.
    kind: "template",
    id: "stmg_suiteT_raison_modele_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_terme_general",
    microId: "suiteT_raison_modele",
    difficulty: 3,
    theme: "neutral",
    hint: "De $u(n) = u_0 \\times q^n$ on tire $u_0 = \\dfrac{u(n)}{q^n}$.",
    tags: ["stmg", "maths", "suites", "template", "short"],
    generate: () => {
      const grandeur = pick(GRANDEURS_GEO);
      const u0 = pick([100, 200, 400, 800, 1000] as const);
      const q = pick([1.5, 2, 3, 0.5] as const);
      const n = randomInt(3, 5);
      const valeur = Math.round(u0 * Math.pow(q, n));
      return {
        text:
          `${grandeur.sujet.charAt(0).toUpperCase()}${grandeur.sujet.slice(1)} suit une suite géométrique ` +
          `de raison $${fr(q)}$. Au bout de $${n}$ ans, il vaut $${valeur}$ ${grandeur.unite}. ` +
          `Quelle était sa valeur au départ ?`,
        format: "short",
        expected: [fr(u0)],
        comparator: "number_equal",
        explanation: exp(
          "Le terme général d'une suite géométrique s'écrit $u(n) = u_0 \\times q^n$. Cette égalité se lit dans les deux sens : elle donne $u(n)$ à partir de $u_0$, et $u_0$ à partir de $u(n)$.",
          "On divise la valeur connue par la raison élevée à la puissance du rang.",
          `$u_0 = \\dfrac{${valeur}}{${fr(q)}^{${n}}} = \\dfrac{${valeur}}{${fr(Math.round(Math.pow(q, n) * 10000) / 10000)}} = ${fr(u0)}$. ` +
            `⚠️ Diviser par $${fr(q)} \\times ${n}$ au lieu de $${fr(q)}^{${n}}$ donnerait ` +
            `$${fr(Math.round((valeur / (q * n)) * 100) / 100)}$ : une raison géométrique se compose par PUISSANCES, pas par produits.`,
          `La valeur de départ était $${fr(u0)}$ ${grandeur.unite}.`
        ),
      };
    },
  },

  /* ═══════════════ suiteT_trois_termes ═══════════════ */

  {
    kind: "template",
    id: "stmg_suiteT_trois_termes_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_terme_general",
    microId: "suiteT_trois_termes",
    difficulty: 3,
    theme: "neutral",
    hint: "Arithmétique : les deux DIFFÉRENCES sont égales. Géométrique : les deux QUOTIENTS le sont.",
    tags: ["stmg", "maths", "suites", "terminale", "template"],
    generate: () => {
      const nature = pick(["arithmetique", "geometrique", "ni"] as const);
      let a: number, b: number, c: number;
      if (nature === "arithmetique") {
        a = randomInt(2, 15);
        const r = randomInt(3, 12);
        b = a + r;
        c = b + r;
      } else if (nature === "geometrique") {
        a = pick([2, 3, 4, 5, 6] as const);
        const q = pick([2, 3, 4] as const);
        b = a * q;
        c = b * q;
      } else {
        a = randomInt(2, 9);
        b = a + randomInt(3, 8);
        c = b + randomInt(9, 16); // ni même différence, ni même quotient
      }
      const bonne =
        nature === "arithmetique"
          ? "consécutifs d'une suite arithmétique"
          : nature === "geometrique"
            ? "consécutifs d'une suite géométrique"
            : "ni l'un ni l'autre";
      return {
        text: `Les nombres $${a}$, $${b}$ et $${c}$ sont-ils les termes consécutifs d'une suite arithmétique, d'une suite géométrique, ou ni l'un ni l'autre ?`,
        format: "qcm",
        choices: shuffle([
          "consécutifs d'une suite arithmétique",
          "consécutifs d'une suite géométrique",
          "ni l'un ni l'autre",
          "les deux à la fois",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Trois nombres sont consécutifs d'une suite arithmétique si $b - a = c - b$, et d'une suite géométrique si $\\dfrac{b}{a} = \\dfrac{c}{b}$.",
          "On teste les deux conditions, dans cet ordre.",
          `Différences : $${b} - ${a} = ${b - a}$ et $${c} - ${b} = ${c - b}$. ` +
            `Quotients : $\\dfrac{${b}}{${a}} = ${fr(Math.round((b / a) * 1000) / 1000)}$ et ` +
            `$\\dfrac{${c}}{${b}} = ${fr(Math.round((c / b) * 1000) / 1000)}$.`,
          `Ces trois nombres sont ${bonne}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — le TEST à mener, pas la conclusion. Le premier item classe
    // trois nombres ; celui-ci demande comment on s'y prend. Les deux tests
    // n'ont pas la même forme — une DIFFÉRENCE d'un côté, un QUOTIENT de
    // l'autre — et il faut les mener tous les deux avant de dire « ni l'un ni
    // l'autre ».
    kind: "template",
    id: "stmg_suiteT_trois_termes_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_terme_general",
    microId: "suiteT_trois_termes",
    difficulty: 2,
    theme: "neutral",
    hint: "Arithmétique : on compare $b - a$ et $c - b$. Géométrique : on compare $\\dfrac{b}{a}$ et $\\dfrac{c}{b}$.",
    tags: ["stmg", "maths", "suites", "template"],
    generate: () => {
      const q = pick([2, 3, 4] as const);
      const a = pick([3, 4, 5, 6, 8] as const);
      const b = a * q;
      const c = b * q;
      const bonne = `comparer $\\dfrac{${b}}{${a}}$ et $\\dfrac{${c}}{${b}}$`;
      return {
        text:
          `Pour savoir si $${a}$, $${b}$ et $${c}$ sont trois termes consécutifs d'une suite GÉOMÉTRIQUE, ` +
          `quel test faut-il mener ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `comparer $${b} - ${a}$ et $${c} - ${b}$`,
          `vérifier que $${b}$ est la demi-somme de $${a}$ et $${c}$`,
          `vérifier que les trois nombres sont positifs`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Trois nombres sont consécutifs dans une suite géométrique quand le QUOTIENT du deuxième par le premier égale celui du troisième par le deuxième. Dans une suite arithmétique, c'est la DIFFÉRENCE qui se conserve.",
          "On forme les deux quotients et l'on regarde s'ils coïncident. Le test des différences, lui, répondrait à une autre question.",
          `$\\dfrac{${b}}{${a}} = ${fr(q)}$ et $\\dfrac{${c}}{${b}} = ${fr(q)}$ : les deux quotients sont égaux, ` +
            `les trois nombres sont bien géométriques de raison $${fr(q)}$. ` +
            `Le test des différences donnerait $${b - a}$ puis $${c - b}$ — deux nombres différents, ` +
            `ce qui montre seulement qu'ils ne sont PAS arithmétiques.`,
          `On compare les deux quotients.`
        ),
        choiceDiagnostics: [
          {
            choice: `comparer $${b} - ${a}$ et $${c} - ${b}$`,
            cause: "c'est le test d'une suite ARITHMÉTIQUE : il répond à une autre question",
          },
          {
            choice: `vérifier que $${b}$ est la demi-somme de $${a}$ et $${c}$`,
            cause: "la demi-somme caractérise la moyenne ARITHMÉTIQUE ; pour une géométrique, c'est la racine du produit",
          },
        ],
      };
    },
  },

  /* ═══════════ suiteT_moyenne_arithmetique ═══════════ */

  {
    kind: "template",
    id: "stmg_suiteT_moy_arith_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_moyennes",
    microId: "suiteT_moyenne_arithmetique",
    difficulty: 2,
    theme: "neutral",
    hint: "La moyenne arithmétique de deux nombres est leur demi-somme.",
    tags: ["stmg", "maths", "suites", "terminale", "template", "short"],
    generate: () => {
      const a = pick([12, 18, 24, 30, 42, 56, 64, 80, 96, 120] as const);
      const b = a + 2 * randomInt(3, 25);
      return {
        text: `Quelle est la moyenne arithmétique de $${a}$ et $${b}$ ?`,
        format: "short",
        expected: [fr((a + b) / 2)],
        comparator: "number_equal",
        explanation: exp(
          "La moyenne arithmétique de deux nombres $a$ et $b$ est $\\dfrac{a + b}{2}$ : c'est le nombre à intercaler pour former trois termes consécutifs d'une suite arithmétique.",
          "On additionne les deux nombres et l'on divise par $2$.",
          `$\\dfrac{${a} + ${b}}{2} = \\dfrac{${a + b}}{2} = ${fr((a + b) / 2)}$.`,
          `La moyenne arithmétique est $${fr((a + b) / 2)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — retrouver l'EXTRÉMITÉ, pas le milieu. Le premier item calcule
    // la moyenne de deux nombres ; celui-ci donne la moyenne et l'un des deux,
    // et fait chercher l'autre. C'est une équation, et c'est la question que
    // pose un objectif : « pour que la moyenne atteigne ce chiffre, combien
    // faut-il réaliser ce mois-ci ? »
    kind: "template",
    id: "stmg_suiteT_moyenne_arithmetique_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_moyennes",
    microId: "suiteT_moyenne_arithmetique",
    difficulty: 3,
    theme: "neutral",
    hint: "Si $m$ est la demi-somme de $a$ et $b$, alors $a + b = 2m$.",
    tags: ["stmg", "maths", "suites", "template", "short"],
    generate: () => {
      const a = pick([12, 18, 24, 30, 42, 56, 64, 80] as const);
      const b = a + 2 * randomInt(3, 25);
      const m = (a + b) / 2;
      return {
        text:
          `La moyenne arithmétique de $${a}$ et d'un second nombre vaut $${fr(m)}$. ` +
          `Quel est ce second nombre ?`,
        format: "short",
        expected: [fr(b)],
        comparator: "number_equal",
        explanation: exp(
          "La moyenne arithmétique de deux nombres est leur demi-somme : $m = \\dfrac{a + b}{2}$. Cette égalité se résout comme une équation dès que deux des trois nombres sont connus.",
          "On multiplie la moyenne par $2$ pour obtenir la somme, puis on retranche le nombre connu.",
          `$a + b = 2m = 2 \\times ${fr(m)} = ${fr(2 * m)}$, donc $b = ${fr(2 * m)} - ${a} = ${fr(b)}$. ` +
            `Vérification : $\\dfrac{${a} + ${fr(b)}}{2} = ${fr(m)}$. ` +
            `⚠️ L'erreur courante est de retrancher $${a}$ à la MOYENNE au lieu de le retrancher à la SOMME : ` +
            `on trouverait $${fr(m - a)}$ au lieu de $${fr(b)}$.`,
          `Le second nombre est $${fr(b)}$.`
        ),
      };
    },
  },

  /* ═══════════ suiteT_moyenne_geometrique ═══════════ */

  {
    kind: "template",
    id: "stmg_suiteT_moy_geo_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_moyennes",
    microId: "suiteT_moyenne_geometrique",
    difficulty: 3,
    theme: "neutral",
    hint: "La moyenne géométrique de deux nombres positifs est la RACINE de leur produit, pas leur demi-somme.",
    tags: ["stmg", "maths", "suites", "terminale", "template", "short"],
    generate: () => {
      // On fabrique $a = k p^2$ et $b = k q^2$ : le produit $ab = (kpq)^2$ est
      // alors un carré parfait, donc la moyenne géométrique est ENTIÈRE.
      // Un tirage direct de deux nombres donnerait presque toujours une racine
      // irrationnelle, impossible à saisir en réponse courte.
      const k = pick([1, 2, 3, 5] as const);
      const p = pick([1, 2, 3] as const);
      const qq = pick([4, 5, 6, 7] as const);
      const a = k * p * p;
      const b = k * qq * qq;
      const m = k * p * qq;
      return {
        text: `Quelle est la moyenne géométrique de $${a}$ et $${b}$ ?`,
        format: "short",
        expected: [fr(m)],
        comparator: "number_equal",
        explanation: exp(
          "La moyenne géométrique de deux nombres strictement positifs $a$ et $b$ est $\\sqrt{ab}$ : c'est le nombre à intercaler pour former trois termes consécutifs d'une suite géométrique.",
          "On multiplie les deux nombres, puis on prend la racine carrée — la demi-somme donnerait la moyenne arithmétique, qui n'est pas la même.",
          `$\\sqrt{${a} \\times ${b}} = \\sqrt{${a * b}} = ${fr(m)}$. ` +
            `(La moyenne arithmétique vaudrait $${fr((a + b) / 2)}$, ce n'est pas la même chose.)`,
          `La moyenne géométrique est $${fr(m)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — POURQUOI la racine, et pas la demi-somme. Le premier item fait
    // calculer la moyenne géométrique ; celui-ci demande la raison de cette
    // formule. Elle tient à ce qu'on veut conserver : la moyenne arithmétique
    // garde la SOMME, la géométrique garde le PRODUIT — donc le coefficient
    // multiplicateur, donc le taux d'évolution. C'est ce qui la rend juste en
    // gestion, là où la demi-somme se trompe.
    kind: "template",
    id: "stmg_suiteT_moyenne_geometrique_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_moyennes",
    microId: "suiteT_moyenne_geometrique",
    difficulty: 3,
    theme: "neutral",
    hint: "Un taux d'évolution se compose en MULTIPLIANT : la moyenne qui lui convient doit conserver le produit.",
    tags: ["stmg", "maths", "suites", "piege", "template"],
    generate: () => {
      const k = pick([1, 2, 3, 5] as const);
      const p = pick([1, 2, 3] as const);
      const qq = pick([4, 5, 6, 7] as const);
      const a = k * p * p;
      const b = k * qq * qq;
      const geo = k * p * qq;
      const arith = (a + b) / 2;
      const bonne =
        "parce qu'elle conserve le PRODUIT des deux nombres : deux évolutions successives se multiplient";
      return {
        text:
          `La moyenne géométrique de $${a}$ et $${b}$ vaut $${fr(geo)}$, alors que leur moyenne arithmétique ` +
          `vaut $${fr(arith)}$. Pourquoi utilise-t-on la première pour des taux d'évolution ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "parce qu'elle donne toujours un nombre plus petit, donc plus prudent",
          "parce que la moyenne arithmétique ne s'applique qu'aux nombres négatifs",
          "parce qu'elle est plus simple à calculer",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La moyenne arithmétique conserve la SOMME : deux fois $m$ font $a + b$. La moyenne géométrique conserve le PRODUIT : $m^2 = a \\times b$. Or des évolutions successives se composent en se MULTIPLIANT — c'est donc la seconde qui convient.",
          "On se demande ce que l'on veut retrouver en appliquant deux fois la moyenne : la même somme, ou le même produit.",
          `$${fr(geo)} \\times ${fr(geo)} = ${fr(geo * geo)} = ${a} \\times ${b}$ : le produit est conservé. ` +
            `Avec la moyenne arithmétique, $${fr(arith)} \\times ${fr(arith)} = ${fr(arith * arith)}$, ` +
            `soit ${fr(Math.round((arith * arith - a * b) * 100) / 100)} de trop — appliquée deux fois, elle ne redonnerait pas ` +
            `l'évolution globale. C'est aussi pourquoi la moyenne géométrique est toujours inférieure à l'arithmétique, ` +
            `mais ce n'est pas une question de prudence : c'est une conséquence, pas la raison.`,
          `Parce qu'elle conserve le produit, et que les taux se composent par multiplication.`
        ),
        choiceDiagnostics: [
          {
            choice: "parce qu'elle donne toujours un nombre plus petit, donc plus prudent",
            cause: "elle est en effet toujours plus petite, mais c'est une conséquence de la formule — pas la raison de son emploi",
          },
        ],
      };
    },
  },

  /* ═══════════ suiteT_moyenne_intercaler ═══════════ */

  {
    kind: "template",
    id: "stmg_suiteT_intercaler_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_moyennes",
    microId: "suiteT_moyenne_intercaler",
    difficulty: 3,
    theme: "neutral",
    hint: "Selon la nature de la suite, on intercale la moyenne arithmétique ou la moyenne géométrique.",
    tags: ["stmg", "maths", "suites", "terminale", "template"],
    generate: () => {
      const geometrique = Math.random() < 0.5;
      let a: number, b: number, milieu: number;
      if (geometrique) {
        // Même construction que ci-dessus : le produit doit être un carré parfait.
        const k = pick([1, 2, 3, 4] as const);
        const p = pick([1, 2, 3] as const);
        const qq = pick([4, 5, 6] as const);
        a = k * p * p;
        b = k * qq * qq;
        milieu = k * p * qq;
      } else {
        a = pick([10, 16, 24, 32, 44, 50] as const);
        const r = randomInt(4, 20);
        b = a + 2 * r;
        milieu = a + r;
      }
      const autre = geometrique ? (a + b) / 2 : Math.round(Math.sqrt(a * b) * 100) / 100;
      return {
        text:
          `Quel nombre faut-il intercaler entre $${fr(a)}$ et $${fr(b)}$ pour obtenir trois termes consécutifs ` +
          `d'une suite ${geometrique ? "géométrique" : "arithmétique"} ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(milieu)}$`, [
          `$${fr(autre)}$`,
          `$${fr(b - a)}$`,
          `$${fr(a + b)}$`,
          `$${fr(Math.round((b / a) * 100) / 100)}$`,
          `$${fr(milieu + 1)}$`,
        ]),
        expected: [`$${fr(milieu)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          geometrique
            ? "Entre deux termes d'une suite géométrique à termes positifs, on intercale leur moyenne géométrique $\\sqrt{ab}$."
            : "Entre deux termes d'une suite arithmétique, on intercale leur moyenne arithmétique $\\dfrac{a+b}{2}$.",
          "On identifie d'abord la nature de la suite demandée : elle décide de la moyenne à utiliser.",
          geometrique
            ? `$\\sqrt{${fr(a)} \\times ${fr(b)}} = ${fr(milieu)}$, et l'on vérifie : $\\dfrac{${fr(milieu)}}{${fr(a)}} = \\dfrac{${fr(b)}}{${fr(milieu)}}$.`
            : `$\\dfrac{${fr(a)} + ${fr(b)}}{2} = ${fr(milieu)}$, et l'on vérifie : $${fr(milieu)} - ${fr(a)} = ${fr(b)} - ${fr(milieu)}$.`,
          `Il faut intercaler $${fr(milieu)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(autre)}$`,
            cause: geometrique
              ? "a pris la moyenne arithmétique alors que la suite demandée est géométrique"
              : "a pris la moyenne géométrique alors que la suite demandée est arithmétique",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — intercaler EN GESTION, avec des euros. Le premier item choisit
    // entre les deux moyennes sur des nombres nus ; celui-ci pose la situation
    // qui les départage : un capital passe de A à C en deux ans, quelle valeur
    // à mi-parcours si la hausse est la même chaque année ? La demi-somme
    // donnerait un montant faux, et l'écart se lit en euros.
    kind: "template",
    id: "stmg_suiteT_moyenne_intercaler_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_moyennes",
    microId: "suiteT_moyenne_intercaler",
    difficulty: 3,
    theme: "neutral",
    hint: "« Le même pourcentage chaque année » : c'est une suite géométrique, donc la moyenne géométrique.",
    tags: ["stmg", "maths", "suites", "template", "short"],
    generate: () => {
      // On part du coefficient : les trois montants tombent alors juste, et la
      // moyenne géométrique est exactement le terme du milieu.
      const placement = pick(PLACEMENTS);
      const u0 = pick([1000, 2000, 2500, 4000, 5000] as const);
      const q = pick([1.1, 1.2, 1.25, 1.5] as const);
      const u1 = Math.round(u0 * q * 100) / 100;
      const u2 = Math.round(u0 * q * q * 100) / 100;
      const demiSomme = Math.round(((u0 + u2) / 2) * 100) / 100;
      return {
        text:
          `Sur ${placement}, un capital passe de $${eur(u0)}$ à $${eur(u2)}$ en deux ans, ` +
          `avec le MÊME pourcentage d'augmentation chaque année. ` +
          `Quel était le capital au bout d'un an, en euros ?`,
        format: "short",
        expected: [fr(u1)],
        comparator: "number_equal",
        explanation: exp(
          "Quand le même pourcentage s'applique chaque année, les montants forment une suite GÉOMÉTRIQUE. Le terme du milieu est alors la moyenne géométrique des deux autres : $u_1 = \\sqrt{u_0 \\times u_2}$.",
          "On multiplie les deux montants connus et l'on prend la racine carrée — surtout pas la demi-somme, qui suppose une progression par ajouts égaux.",
          `$\\sqrt{${fr(u0)} \\times ${fr(u2)}} = \\sqrt{${fr(Math.round(u0 * u2 * 100) / 100)}} = ${fr(u1)}$ €. ` +
            `Vérification : le coefficient annuel vaut $${fr(q)}$, appliqué deux fois il donne bien $${eur(u2)}$. ` +
            `⚠️ La demi-somme donnerait $${eur(demiSomme)}$ — soit $${eur(Math.round((demiSomme - u1) * 100) / 100)}$ de trop : ` +
            `elle décrit une progression par ajouts égaux, pas par pourcentage.`,
          `Le capital valait $${eur(u1)}$ au bout d'un an.`
        ),
      };
    },
  },

  /* ═══════════════ suiteT_somme_notation ═══════════════ */

  {
    kind: "template",
    id: "stmg_suiteT_sigma_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_somme",
    microId: "suiteT_somme_notation",
    difficulty: 2,
    theme: "neutral",
    hint: "Le symbole $\\Sigma$ dit : « additionne, pour $k$ allant de la valeur du bas à celle du haut ».",
    tags: ["stmg", "maths", "suites", "terminale", "sigma", "template", "short"],
    generate: () => {
      const type = pick(["carres", "cubes", "entiers", "inverses"] as const);
      const n = randomInt(3, 6);
      let valeur = 0;
      let detail: string[] = [];
      for (let k = 1; k <= n; k++) {
        const terme =
          type === "carres" ? k * k : type === "cubes" ? k * k * k : type === "entiers" ? k : 1 / k;
        valeur += terme;
        detail.push(type === "inverses" ? `\\dfrac{1}{${k}}` : String(terme));
      }
      const expression =
        type === "carres" ? "k^2" : type === "cubes" ? "k^3" : type === "entiers" ? "k" : "\\dfrac{1}{k}";
      const arrondie = Math.round(valeur * 10000) / 10000;
      return {
        text:
          `Calcule $\\displaystyle\\sum_{k=1}^{${n}} ${expression}$.` +
          (type === "inverses" ? " (arrondi au centième)" : ""),
        format: "short",
        expected: [type === "inverses" ? fr(Math.round(valeur * 100) / 100) : fr(arrondie)],
        comparator: "number_equal",
        explanation: exp(
          "La notation $\\displaystyle\\sum_{k=1}^{n}$ demande d'additionner les valeurs de l'expression pour $k$ allant de $1$ à $n$.",
          "On écrit chaque terme en remplaçant $k$, puis on additionne.",
          `$${detail.join(" + ")} = ${type === "inverses" ? fr(Math.round(valeur * 100) / 100) : fr(arrondie)}$.`,
          `La somme vaut $${type === "inverses" ? fr(Math.round(valeur * 100) / 100) : fr(arrondie)}$.`
        ),
      };
    },
  },

  /* ═══════════════ suiteT_somme_arithmetique ═══════════════ */

  {
    kind: "template",
    id: "stmg_suiteT_somme_arith_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_somme",
    microId: "suiteT_somme_arithmetique",
    difficulty: 3,
    theme: "neutral",
    hint: "Somme d'une suite arithmétique $=$ (nombre de termes) $\\times \\dfrac{\\text{premier} + \\text{dernier}}{2}$.",
    tags: ["stmg", "maths", "suites", "terminale", "canvas", "template", "short"],
    generate: () => {
      const u0 = pick([5, 8, 10, 12, 20, 25] as const);
      const r = pick([3, 4, 5, 6, 7, 10] as const);
      const dernier = randomInt(4, 8);
      const termes = termesArith(u0, r, dernier + 1);
      const nbTermes = dernier + 1;
      const somme = (nbTermes * (termes[0] + termes[dernier])) / 2;
      return {
        text: `Calcule $u(0) + u(1) + \\dots + u(${dernier})$ pour la suite arithmétique du tableau.`,
        format: "short",
        expected: [fr(somme)],
        comparator: "number_equal",
        canvas: canvasTableau(termes, "Termes de la suite arithmétique"),
        explanation: exp(
          "La somme de termes consécutifs d'une suite arithmétique vaut le nombre de termes multiplié par la demi-somme du premier et du dernier.",
          "On compte les termes — attention, de $u(0)$ à $u(n)$ il y en a $n+1$ —, puis on applique la formule.",
          `Il y a $${nbTermes}$ termes, le premier vaut $${fr(termes[0])}$ et le dernier $${fr(termes[dernier])}$ : ` +
            `$S = ${nbTermes} \\times \\dfrac{${fr(termes[0])} + ${fr(termes[dernier])}}{2} = ${fr(somme)}$.`,
          `La somme vaut $${fr(somme)}$.`
        ),
      };
    },
  },

  /* ═══════════════ suiteT_somme_geometrique ═══════════════ */

  {
    kind: "template",
    id: "stmg_suiteT_somme_geo_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_somme",
    microId: "suiteT_somme_geometrique",
    difficulty: 3,
    theme: "neutral",
    hint: "Somme d'une suite géométrique : $u(0) \\times \\dfrac{1 - q^{\\,\\text{nombre de termes}}}{1 - q}$.",
    tags: ["stmg", "maths", "suites", "terminale", "canvas", "template", "short"],
    generate: () => {
      const u0 = pick([2, 3, 4, 5, 6, 10] as const);
      const q = pick([2, 3] as const);
      const dernier = randomInt(3, 6);
      const termes = termesGeo(u0, q, dernier + 1);
      const nbTermes = dernier + 1;
      const somme = u0 * ((Math.pow(q, nbTermes) - 1) / (q - 1));
      return {
        text: `Calcule $u(0) + u(1) + \\dots + u(${dernier})$ pour la suite géométrique du tableau.`,
        format: "short",
        expected: [fr(somme)],
        comparator: "number_equal",
        canvas: canvasTableau(termes, "Termes de la suite géométrique"),
        explanation: exp(
          "La somme de termes consécutifs d'une suite géométrique de raison $q \\neq 1$ vaut $u(0) \\times \\dfrac{1 - q^{N}}{1 - q}$, où $N$ est le NOMBRE de termes.",
          "On compte les termes — de $u(0)$ à $u(n)$ il y en a $n+1$ —, puis on applique la formule.",
          `Il y a $${nbTermes}$ termes : $S = ${u0} \\times \\dfrac{${q}^{${nbTermes}} - 1}{${q} - 1} = ` +
            `${u0} \\times \\dfrac{${Math.pow(q, nbTermes) - 1}}{${q - 1}} = ${fr(somme)}$. ` +
            `Vérification par addition directe : $${termes.map((v) => fr(v)).join(" + ")} = ${fr(somme)}$.`,
          `La somme vaut $${fr(somme)}$.`
        ),
      };
    },
  },

  /* ═══════════════ suiteT_somme_reconnaitre ═══════════════ */

  {
    kind: "template",
    id: "stmg_suiteT_somme_reconnaitre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_somme_situations",
    microId: "suiteT_somme_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche si la question porte sur UNE valeur à une date, ou sur le CUMUL de toutes les valeurs.",
    tags: ["stmg", "maths", "suites", "terminale", "template"],
    generate: () => {
      // ⚠️ Les nombres de ces phrases sont TIRÉS, pas figés. Avec des durées et
      // des montants constants, la micro ne produisait que quatre questions
      // réellement distinctes : dix textes, mais les mêmes nombres. C'est le
      // genre d'inflation d'habillage que `echantillon-banque.mjs` révèle et
      // que le compteur de textes distincts masquait.
      const somme = Math.random() < 0.5;
      const montant = pick([50, 80, 100, 120, 150, 200] as const);
      const duree = pick([3, 4, 5, 6, 8, 10, 12] as const);
      const phrase = somme
        ? pick([
            `on verse ${montant} € chaque mois pendant ${duree} ans et l'on veut savoir combien on a versé en tout`,
            `une entreprise cumule ses bénéfices annuels sur ${duree} exercices`,
            `on additionne les ${montant} € de loyer perçus chaque mois sur les ${duree} années du bail`,
            `on veut le total des intérêts encaissés sur ${duree} ans`,
            `on calcule le nombre total de commandes traitées sur les ${duree} premiers mois`,
          ] as const)
        : pick([
            `on veut la valeur d'un capital de ${montant * 10} € placé au bout de ${duree} ans`,
            `on cherche le nombre d'abonnés à la fin de la ${duree}ᵉ année`,
            `on veut connaître le prix d'un article après ${duree} hausses successives`,
            `on cherche la valeur résiduelle d'une machine après ${duree} ans`,
            `on veut l'effectif du club au bout de ${duree} saisons`,
          ] as const);
      return {
        text: `Cette situation relève-t-elle du calcul d'un TERME ou d'une SOMME de termes ? ${phrase.charAt(0).toUpperCase()}${phrase.slice(1)}.`,
        format: "qcm",
        choices: shuffle([
          "d'une somme de termes consécutifs",
          "d'un seul terme de rang donné",
          "d'une raison",
          "d'une moyenne géométrique",
        ]),
        expected: [somme ? "d'une somme de termes consécutifs" : "d'un seul terme de rang donné"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un terme donne la valeur à UNE date ; une somme donne le CUMUL sur toute la période.",
          "On cherche les mots « en tout », « total », « cumul » — ils signalent une somme — face à « au bout de », « à la fin », qui désignent un seul terme.",
          somme
            ? "Ici on additionne toutes les valeurs successives : c'est une somme de termes consécutifs."
            : "Ici on ne veut qu'une valeur, celle atteinte à une date : c'est un terme de rang donné.",
          `Cette situation relève ${somme ? "d'une somme de termes consécutifs" : "d'un seul terme de rang donné"}.`
        ),
      };
    },
  },

  /* ═══════════════ suiteT_somme_versements ═══════════════ */

  {
    kind: "template",
    id: "stmg_suiteT_versements_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_somme_situations",
    microId: "suiteT_somme_versements",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque versement produit des intérêts pendant un nombre d'années différent : la valeur acquise est une SOMME.",
    tags: ["stmg", "maths", "suites", "terminale", "gestion", "canvas", "template", "short"],
    generate: () => {
      const placement = pick(PLACEMENTS);
      const versement = pick([500, 800, 1000, 1200, 2000] as const);
      const t = pick([2, 3, 4, 5] as const);
      const q = 1 + t / 100;
      const n = randomInt(3, 6);
      // Versements en début de période : valeur acquise = V·q + V·q² + … + V·qⁿ
      const valeur = versement * q * ((Math.pow(q, n) - 1) / (q - 1));
      const detail = Array.from({ length: n }, (_, k) => versement * Math.pow(q, k + 1));
      return {
        text:
          `Sur ${placement} rémunéré à $${t}\\,\\%$ par an, on verse $${versement}$ € au début de chaque année ` +
          `pendant $${n}$ ans. Quelle est la valeur acquise à la fin de la $${n}$ᵉ année, à l'euro près ?`,
        format: "short",
        expected: [fr(Math.round(valeur))],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: "Ce que devient chaque versement",
          caption: `Chaque versement est capitalisé jusqu'à la fin de la ${n}ᵉ année`,
          headers: ["Versement n°", ...Array.from({ length: n }, (_, k) => String(k + 1))],
          rows: [
            { label: "Années de placement", values: Array.from({ length: n }, (_, k) => String(n - k)) },
            { label: "Valeur acquise (€)", values: detail.map((v) => eur(v)) },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Le BO le dit lui-même : « le calcul de valeurs acquises, lors de placements à intérêts composés à taux constant avec versements réguliers, fournit une situation relevant du calcul d'une somme de termes consécutifs d'une suite géométrique ».",
          "Chaque versement est capitalisé pendant un nombre d'années différent ; on additionne les valeurs acquises, qui forment une suite géométrique de raison $q$.",
          `$S = ${versement} \\times ${fr(q)} \\times \\dfrac{${fr(q)}^{${n}} - 1}{${fr(q)} - 1} \\approx ${fr(Math.round(valeur))}$ €.`,
          `La valeur acquise est d'environ $${fr(Math.round(valeur))}$ €.`
        ),
      };
    },
  },

  /* ═══════════════ suiteT_somme_emprunt ═══════════════ */
  //
  // Le remboursement par mensualités constantes est un CONTEXTE, pas un contenu
  // nouveau : la demande mathématique reste « calculer une somme de termes
  // consécutifs », capacité explicitement attendue.

  {
    kind: "template",
    id: "stmg_suiteT_emprunt_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_somme_situations",
    microId: "suiteT_somme_emprunt",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coût total est la somme de toutes les mensualités ; le coût du crédit est ce total moins le capital emprunté.",
    tags: ["stmg", "maths", "suites", "terminale", "gestion", "template", "short"],
    generate: () => {
      const capital = pick([6000, 8000, 9000, 12000, 15000] as const);
      const mois = pick([24, 36, 48, 60] as const);
      // ⚠️ La mensualité se DÉDUIT du capital et de la durée : tirée
      // indépendamment, elle donnait des crédits à coût nul (15 000 € en
      // 60 × 250 €) voire NÉGATIF (15 000 € en 24 × 220 € : −9 720 €).
      // On part du remboursement sans intérêt, on le majore, puis on arrondit
      // aux 5 € supérieurs — la majoration garantit un coût strictement positif.
      const majoration = pick([1.05, 1.08, 1.1, 1.12, 1.15, 1.2] as const);
      const mensualite = Math.ceil((capital * majoration) / mois / 5) * 5;
      const total = mensualite * mois;
      const cout = total - capital;
      return {
        text:
          `Un emprunt de $${capital}$ € est remboursé par $${mois}$ mensualités constantes de $${mensualite}$ €. ` +
          `Quel est le coût total du crédit, c'est-à-dire ce que l'emprunteur paie EN PLUS du capital emprunté ?`,
        format: "short",
        expected: [fr(cout)],
        comparator: "number_equal",
        explanation: exp(
          "Le total remboursé est la somme de toutes les mensualités ; le coût du crédit est la différence entre ce total et le capital emprunté.",
          "On additionne les mensualités — elles sont constantes, la somme est donc un produit —, puis on retire le capital.",
          `Total remboursé : $${mois} \\times ${mensualite} = ${fr(total)}$ €. ` +
            `Coût du crédit : $${fr(total)} - ${capital} = ${fr(cout)}$ €.`,
          `Le crédit coûte $${fr(cout)}$ €.`
        ),
      };
    },
  },

  /* ═══════════ suiteT_comparer_geometriques ═══════════ */

  {
    kind: "template",
    id: "stmg_suiteT_comparer_geo_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_comparer",
    microId: "suiteT_comparer_geometriques",
    difficulty: 3,
    theme: "neutral",
    hint: "Un capital de départ plus élevé ne garantit rien sur la durée : c'est la raison qui décide à long terme.",
    tags: ["stmg", "maths", "suites", "terminale", "gestion", "canvas", "template", "short"],
    generate: () => {
      // ⚠️ Les écarts de taux sont calibrés pour que le croisement tombe dans
      // les dix colonnes affichées. Avec 3 % contre 6 %, il faudrait 24 ans :
      // la réponse ne serait pas lisible sur le tableau fourni.
      const aA = pick([2000, 2400, 2500] as const);
      const tA = pick([1, 2] as const);
      const aB = pick([1000, 1100, 1200] as const);
      const tB = pick([15, 20, 25] as const);
      const A = termesGeo(aA, 1 + tA / 100, 12);
      const B = termesGeo(aB, 1 + tB / 100, 12);
      let n = 1;
      while (n < 11 && B[n] <= A[n]) n++;
      return {
        text:
          `Deux enseignes : le chiffre d'affaires de A part de $${aA}$ k€ et progresse de $${tA}\\,\\%$ par an, ` +
          `celui de B part de $${aB}$ k€ et progresse de $${tB}\\,\\%$ par an. ` +
          `Au bout de combien d'années le chiffre d'affaires de B dépasse-t-il celui de A ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: "Chiffre d'affaires des deux enseignes (k€)",
          headers: ["Année", ...Array.from({ length: 12 }, (_, k) => String(k))],
          rows: [
            { label: "Enseigne A", values: A.map((v) => eur(v)) },
            { label: "Enseigne B", values: B.map((v) => eur(v)) },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Comparer deux suites géométriques, c'est chercher le premier rang où l'une passe devant l'autre.",
          "On dresse les deux listes de valeurs et l'on compare année par année : la raison la plus grande finit toujours par l'emporter, quel que soit le capital de départ.",
          `À l'année $${n - 1}$ : A vaut $${eur(A[n - 1])}$ k€ et B vaut $${eur(B[n - 1])}$ k€. ` +
            `À l'année $${n}$ : A vaut $${eur(A[n])}$ k€ et B vaut $${eur(B[n])}$ k€.`,
          `L'enseigne B dépasse l'enseigne A au bout de $${n}$ ans.`
        ),
      };
    },
  },

  /* ═══════════ suiteT_comparer_arith_geo ═══════════ */

  {
    kind: "fixed",
    id: "stmg_suiteT_comparer_arith_geo_fix_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_comparer",
    microId: "suiteT_comparer_arith_geo",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde ce qui se passe très loin, pas seulement sur les premières années.",
    tags: ["stmg", "maths", "suites", "terminale", "fixed"],
    text:
      "Une suite arithmétique de raison $500$ part de $1000$. Une suite géométrique de raison $1{,}1$ part de $1000$. " +
      "Laquelle finit par dépasser l'autre, et le reste définitivement ?",
    format: "qcm",
    choices: [
      "la suite géométrique, car une croissance exponentielle finit toujours par dépasser une croissance linéaire",
      "la suite arithmétique, car sa raison est bien plus grande",
      "elles restent toujours égales",
      "cela dépend du premier terme",
    ],
    expected: [
      "la suite géométrique, car une croissance exponentielle finit toujours par dépasser une croissance linéaire",
    ],
    comparator: "mcq_exact",
    explanation: exp(
      "Une croissance exponentielle finit toujours par dépasser une croissance linéaire, quels que soient les premiers termes et les raisons — pourvu que la raison géométrique soit strictement supérieure à $1$.",
      "On ne se fie pas aux premières valeurs : on regarde le comportement sur le long terme.",
      "Au début la suite arithmétique domine largement : à l'année 10, elle vaut $6000$ contre $2594$. " +
        "Mais à l'année 40, elle vaut $21\\,000$ contre environ $45\\,259$ — et l'écart ne cesse ensuite de se creuser.",
      "C'est la suite géométrique qui l'emporte, et définitivement."
    ),
    choiceDiagnostics: [
      {
        choice: "la suite arithmétique, car sa raison est bien plus grande",
        cause: "a comparé les raisons alors qu'elles ne sont pas de même nature — l'une s'ajoute, l'autre multiplie",
      },
      {
        choice: "cela dépend du premier terme",
        cause: "le premier terme change le moment du croisement, jamais son existence",
      },
    ],
  },

  {
    kind: "template",
    id: "stmg_suiteT_comparer_arith_geo_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_comparer",
    microId: "suiteT_comparer_arith_geo",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare colonne par colonne : celle qui multiplie part de très bas, mais elle accélère.",
    tags: ["stmg", "maths", "suites", "terminale", "canvas", "template", "short"],
    generate: () => {
      // Réservoirs calibrés pour que le croisement tombe dans les huit colonnes.
      const a0 = pick([3000, 4000, 5000] as const);
      const r = pick([800, 1000, 1200] as const);
      const b0 = pick([200, 300, 400] as const);
      const q = pick([2, 2.5, 3] as const);
      const A = termesArith(a0, r, 8);
      const B = termesGeo(b0, q, 8).map((v) => Math.round(v));
      let n = 1;
      while (n < 7 && B[n] <= A[n]) n++;
      return {
        text:
          `Le projet A rapporte $${a0}$ € la première année puis $${r}$ € de plus chaque année. ` +
          `Le projet B rapporte $${b0}$ € la première année, puis est multiplié par $${fr(q)}$ chaque année. ` +
          `À partir de quelle année le projet B rapporte-t-il plus que le projet A ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: "Ce que rapporte chaque projet (€)",
          headers: ["Année", ...Array.from({ length: 8 }, (_, k) => String(k))],
          rows: [
            { label: "Projet A (arithmétique)", values: A.map((v) => fr(v)) },
            { label: "Projet B (géométrique)", values: B.map((v) => fr(v)) },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Une croissance exponentielle finit toujours par dépasser une croissance linéaire, même en partant de beaucoup plus bas.",
          "On compare les deux lignes colonne par colonne, jusqu'à ce que la seconde passe devant.",
          `À l'année $${n - 1}$ : A rapporte $${fr(A[n - 1])}$ € et B $${fr(B[n - 1])}$ €. ` +
            `À l'année $${n}$ : A rapporte $${fr(A[n])}$ € et B $${fr(B[n])}$ €.`,
          `Le projet B dépasse le projet A à partir de l'année $${n}$.`
        ),
      };
    },
  },

  /* ═══════════ suiteT_interets_simples_composes ═══════════ */

  {
    kind: "template",
    id: "stmg_suiteT_interets_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_comparer",
    microId: "suiteT_interets_simples_composes",
    difficulty: 3,
    theme: "neutral",
    hint: "Intérêts simples : toujours calculés sur le capital de départ. Intérêts composés : sur le capital déjà augmenté.",
    tags: ["stmg", "maths", "suites", "terminale", "gestion", "canvas", "template", "short"],
    generate: () => {
      const capital = pick([2000, 3000, 4000, 5000, 10000] as const);
      const t = pick([3, 4, 5, 8, 10] as const);
      const n = randomInt(4, 10);
      const simples = capital * (1 + (n * t) / 100);
      const composes = capital * Math.pow(1 + t / 100, n);
      const ecart = composes - simples;
      return {
        text:
          `Un capital de $${capital}$ € est placé pendant $${n}$ ans à $${t}\\,\\%$. ` +
          `De combien la valeur acquise à intérêts COMPOSÉS dépasse-t-elle celle à intérêts SIMPLES, à l'euro près ?`,
        format: "short",
        expected: [fr(Math.round(ecart))],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: "Les deux modes de calcul",
          headers: ["", "Intérêts simples", "Intérêts composés"],
          rows: [
            { label: "Modèle", values: ["suite arithmétique", "suite géométrique"] },
            { label: "Calcul", values: [`${capital} × (1 + ${n}×${t}/100)`, `${capital} × ${fr(1 + t / 100)}^${n}`] },
            { label: "Valeur acquise (€)", values: [eur(simples), eur(composes)] },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Les intérêts simples se calculent chaque année sur le capital INITIAL : la valeur suit une suite arithmétique. Les intérêts composés se calculent sur le capital déjà augmenté : la valeur suit une suite géométrique.",
          "On calcule séparément les deux valeurs acquises, puis on fait la différence.",
          `Simples : $${capital} \\times \\left(1 + \\dfrac{${n} \\times ${t}}{100}\\right) = ${eur(simples)}$ €. ` +
            `Composés : $${capital} \\times ${fr(1 + t / 100)}^{${n}} \\approx ${eur(composes)}$ €. ` +
            `Écart : $${fr(Math.round(ecart))}$ €.`,
          `Les intérêts composés rapportent environ $${fr(Math.round(ecart))}$ € de plus.`
        ),
      };
    },
  },

  /* ═══════ suiteT_taux_equivalent_proportionnel ═══════ */

  {
    kind: "template",
    id: "stmg_suiteT_taux_equiv_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_comparer",
    microId: "suiteT_taux_equivalent_proportionnel",
    difficulty: 3,
    theme: "neutral",
    hint: "Le taux PROPORTIONNEL se divise ; le taux ÉQUIVALENT se calcule pour que douze mois redonnent exactement l'année.",
    tags: ["stmg", "maths", "suites", "terminale", "gestion", "template"],
    generate: () => {
      const annuel = pick([3, 4, 6, 8, 12, 24] as const);
      const periodes = pick([2, 3, 4, 6, 12] as const);
      const proportionnel = annuel / periodes;
      const equivalent = (Math.pow(1 + annuel / 100, 1 / periodes) - 1) * 100;
      const nomPeriode =
        periodes === 12 ? "mensuel" : periodes === 4 ? "trimestriel" : periodes === 2 ? "semestriel" : `sur 1/${periodes} d'année`;
      return {
        text:
          `Un taux annuel de $${annuel}\\,\\%$ est ramené à une période plus courte. ` +
          `Quel est le taux ${nomPeriode} PROPORTIONNEL ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(proportionnel)}\\,\\%$`, [
          `$${fr(Math.round(equivalent * 1000) / 1000)}\\,\\%$`,
          `$${fr(annuel)}\\,\\%$`,
          `$${fr(annuel * periodes)}\\,\\%$`,
          `$${fr(proportionnel * 2)}\\,\\%$`,
          `$${fr(Math.round((annuel / periodes) * 100) / 100 + 1)}\\,\\%$`,
        ]),
        expected: [`$${fr(proportionnel)}\\,\\%$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Le taux proportionnel s'obtient en DIVISANT le taux annuel par le nombre de périodes. Le taux équivalent, lui, est celui qui, appliqué à chaque période, redonne exactement le taux annuel — et il est toujours un peu plus petit.",
          "On divise pour le proportionnel ; on utiliserait l'exposant $\\dfrac{1}{n}$ pour l'équivalent.",
          `Proportionnel : $\\dfrac{${annuel}}{${periodes}} = ${fr(proportionnel)}\\,\\%$. ` +
            `À titre de comparaison, le taux équivalent vaut $${fr(Math.round(equivalent * 1000) / 1000)}\\,\\%$ : ` +
            `plus petit, parce que les intérêts de chaque période produisent eux-mêmes des intérêts.`,
          `Le taux ${nomPeriode} proportionnel est $${fr(proportionnel)}\\,\\%$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(Math.round(equivalent * 1000) / 1000)}\\,\\%$`,
            cause: "a donné le taux ÉQUIVALENT, qui répond à une autre question",
          },
        ],
      };
    },
  },
];
