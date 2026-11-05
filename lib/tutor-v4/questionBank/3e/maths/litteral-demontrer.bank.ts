// DÉMONTRER AVEC LE CALCUL LITTÉRAL (05/11/2026).
//
// Trou du programme de cycle 4 (BO 2020, p. 132) : « démontrer un résultat général
// (par exemple que la somme de trois entiers consécutifs est un multiple de trois) »
// et « il est attendu de démontrer au moins une propriété du calcul fractionnaire
// en utilisant le calcul littéral et la définition du quotient ». Deux micros :
//   - litteral_demontrer_entiers : pair/impair, consécutifs, multiples ;
//   - litteral_demontrer_fraction : définition du quotient, a/b + c/b, produit en croix.
//
// ⛔ Aucune question ouverte floue : QCM sur une étape précise (quelle ligne suit,
// quelle écriture, quelle conclusion) ou réponse courte exacte. Une proposition
// fausse ne vaut JAMAIS la bonne (le correcteur l'éprouve sur des valeurs).
// ⛔ Règles du collège : ★1-★2 phrase courte, sans prénom ni contexte.

import type { TutorBankItemV4, DifficultyLevel } from "@/lib/tutor-v4/types";

const entre = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const un = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
const melange = <T,>(l: T[]): T[] => l.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);

function qcm(juste: string, faux: string[]) {
  const d = melange([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  return melange([juste, ...d]);
}
const expl = (def: string, meth: string, calc: string, concl: string) =>
  `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;

const tpl = (
  micro: "litteral_demontrer_entiers" | "litteral_demontrer_fraction",
  n: number,
  difficulty: DifficultyLevel,
  hint: string,
  generate: () => any,
): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `3e_${micro}_tpl_${n}`,
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: micro,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["litteral", "demonstration", micro === "litteral_demontrer_entiers" ? "entiers" : "fractions", "template"],
    generate,
  }) as TutorBankItemV4;

const ME = "litteral_demontrer_entiers";
const MF = "litteral_demontrer_fraction";

/* ───────────────────────── les entiers ───────────────────────── */

const LE = ["n", "n", "k", "p", "m"] as const;
const DEF_PAIR = "un entier pair s’écrit 2n, un entier impair s’écrit 2n + 1, avec n entier.";
const DEF_MULT = "un multiple de d s’écrit d × n, avec n entier.";
const SI = (n: string) => un([`${n} est un entier.`, `Soit ${n} un entier.`, `On note ${n} un entier.`, `${n} désigne un entier.`]);

const PRENOMS = ["Jade", "Malik", "Zoé", "Enzo", "Aya", "Hugo", "Nora", "Léo"] as const;
const CADRES_MAGIE = [
  (P: string) => `${P} propose un tour de magie à ses amis.`,
  (P: string) => `${P} anime un jeu de calcul à la radio du collège.`,
  (P: string) => `${P} prépare un défi pour la fête de l’école.`,
  (P: string) => `Sur sa chaîne de vidéos, ${P} lance un défi de calcul.`,
  (P: string) => `À la kermesse, ${P} tient le stand du nombre mystère.`,
  (P: string) => `${P} code un petit jeu de calcul sur sa calculatrice.`,
];

const entiers: TutorBankItemV4[] = [
  // ★1 : quelle écriture.
  tpl(ME, 1, 1, "Pair : le double d’un entier. Impair : le double d’un entier, plus 1.", () => {
    const n = un(LE);
    const quoi = un(["pair", "impair"] as const);
    const juste = quoi === "pair" ? `2${n}` : `2${n} + 1`;
    const faux = quoi === "pair" ? [`2${n} + 1`, `${n} + 2`, `${n}²`, `${n} + 1`] : [`2${n}`, `${n} + 2`, `2${n} + 2`, `${n} + 1`];
    const text = `${SI(n)} ${un([`Quelle écriture donne toujours un entier ${quoi} ?`, `Quelle expression est toujours un entier ${quoi} ?`, `Quelle écriture représente un entier ${quoi} ?`])}`;
    return {
      text,
      format: "qcm",
      choices: qcm(juste, faux),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_PAIR, `on cherche l’écriture ${quoi === "pair" ? "qui est le double d’un entier" : "qui vaut le double d’un entier, plus 1"}.`, `pour ${n} = 3 : ${juste} = ${quoi === "pair" ? 6 : 7} ; pour ${n} = 4 : ${juste} = ${quoi === "pair" ? 8 : 9}.`, `un entier ${quoi} s’écrit ${juste}.`),
    };
  }),

  // ★1 : ce que représente une écriture.
  tpl(ME, 2, 1, "Essaie avec deux ou trois valeurs de l’entier.", () => {
    const n = un(LE);
    const cas = un([
      { e: `2${n}`, r: "un entier pair" },
      { e: `2${n} + 1`, r: "un entier impair" },
      { e: `2${n} − 1`, r: "un entier impair" },
      { e: `2${n} + 4`, r: "un entier pair" },
      { e: `2${n} + 3`, r: "un entier impair" },
    ]);
    const autre = cas.r === "un entier pair" ? "un entier impair" : "un entier pair";
    const text = `${SI(n)} ${un([`Que représente ${cas.e} ?`, `${cas.e} est forcément quel genre d’entier ?`, `Que peut-on dire de ${cas.e} ?`, `Comment est toujours ${cas.e} ?`])}`;
    return {
      text,
      format: "qcm",
      choices: melange([cas.r, autre, "un multiple de 3", "un nombre négatif"]),
      expected: [cas.r],
      comparator: "mcq_exact",
      explanation: expl(DEF_PAIR, "on regarde si l’écriture est le double d’un entier, ou ce double plus 1.", `${cas.e} : le terme en ${n} est un double, le nombre seul décide.`, `${cas.e} est ${cas.r}.`),
    };
  }),

  // ★1 : écrire un nombre sous la forme 2n ou 2n + 1.
  tpl(ME, 3, 1, "Enlève 1 si le nombre est impair, puis prends la moitié.", () => {
    const n = un(LE);
    const v = entre(1, 60);
    const impair = Math.random() < 0.55;
    const N = impair ? 2 * v + 1 : 2 * v;
    const forme = impair ? `2${n} + 1` : `2${n}`;
    const text = un([
      `On écrit ${N} sous la forme ${forme}. Que vaut ${n} ?`,
      `${N} = ${forme}. Que vaut ${n} ?`,
      `Écris ${N} sous la forme ${forme}. Donne ${n}.`,
      `Quelle valeur de ${n} donne ${forme} = ${N} ?`,
      `Pour quel entier ${n} a-t-on ${N} = ${forme} ?`,
      `Trouve ${n} pour que ${forme} soit égal à ${N}.`,
    ]);
    return {
      text,
      format: "short",
      expected: [String(v), `${n} = ${v}`],
      comparator: "exact_text",
      explanation: expl(DEF_PAIR, impair ? "on enlève 1, puis on divise par 2." : "on divise par 2.", impair ? `${N} − 1 = ${2 * v}, puis ${2 * v} ÷ 2 = ${v}.` : `${N} ÷ 2 = ${v}.`, `${n} = ${v}.`),
    };
  }),

  // ★1 : les suivants.
  tpl(ME, 4, 1, "On passe d’un entier au suivant en ajoutant 1.", () => {
    const n = un(LE);
    const cas = un(["suivant", "precedent", "trois", "impairSuivant"] as const);
    if (cas === "trois") {
      const juste = `${n}, ${n} + 1, ${n} + 2`;
      return {
        text: `${SI(n)} ${un(["Quels sont trois entiers consécutifs ?", "Comment écrire trois entiers consécutifs ?", "Quelle liste donne trois entiers consécutifs ?"])}`,
        format: "qcm",
        choices: qcm(juste, [`${n}, 2${n}, 3${n}`, `${n}, ${n} + 2, ${n} + 4`, `${n}, ${n} + 1, ${n} + 3`]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl("des entiers consécutifs se suivent : on ajoute 1 à chaque fois.", `on part de ${n}.`, `${n}, puis ${n} + 1, puis ${n} + 2.`, `trois entiers consécutifs s’écrivent ${juste}.`),
      };
    }
    if (cas === "impairSuivant") {
      const juste = `2${n} + 3`;
      return {
        text: `${SI(n)} ${un([`Quel est l’impair qui suit 2${n} + 1 ?`, `Quel entier impair vient juste après 2${n} + 1 ?`, `Après l’impair 2${n} + 1, quel est l’impair suivant ?`])}`,
        format: "qcm",
        choices: qcm(juste, [`2${n} + 2`, `2${n} + 5`, `3${n} + 1`, `4${n} + 2`]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl("deux impairs qui se suivent ont 2 d’écart.", "on ajoute 2.", `2${n} + 1 + 2 = 2${n} + 3.`, `l’impair suivant est ${juste}.`),
      };
    }
    const juste = cas === "suivant" ? `${n} + 1` : `${n} − 1`;
    return {
      text: `${SI(n)} ${cas === "suivant" ? un(["Comment écrire l’entier suivant ?", "Quel entier vient juste après ?", "Quel est l’entier qui le suit ?"]) : un(["Comment écrire l’entier précédent ?", "Quel entier vient juste avant ?", "Quel est l’entier qui le précède ?"])}`,
      format: "qcm",
      choices: qcm(juste, [cas === "suivant" ? `${n} − 1` : `${n} + 1`, `2${n}`, `${n} + 2`, `${n} − 2`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("deux entiers consécutifs ont 1 d’écart.", cas === "suivant" ? "on ajoute 1." : "on enlève 1.", `${n} ${cas === "suivant" ? "+" : "−"} 1.`, `c’est ${juste}.`),
    };
  }),

  // ★2 : réduire une somme d'entiers consécutifs.
  tpl(ME, 5, 2, "Regroupe les lettres, puis les nombres.", () => {
    const n = un(LE);
    const cas = un([
      { s: `${n} + (${n} + 1) + (${n} + 2)`, j: `3${n} + 3`, f: [`3${n} + 2`, `3${n}`, `${n} + 3`, `3${n} + 1`], c: `${n} + ${n} + ${n} = 3${n} et 1 + 2 = 3` },
      { s: `${n} + (${n} + 1)`, j: `2${n} + 1`, f: [`2${n}`, `2${n} + 2`, `${n} + 1`, `3${n}`], c: `${n} + ${n} = 2${n}` },
      { s: `(${n} − 1) + ${n} + (${n} + 1)`, j: `3${n}`, f: [`3${n} + 1`, `3${n} − 1`, `3${n} + 2`, `${n}`], c: `${n} + ${n} + ${n} = 3${n} et −1 + 1 = 0` },
      { s: `2${n} + (2${n} + 2)`, j: `4${n} + 2`, f: [`4${n}`, `4${n} + 4`, `2${n} + 2`, `6${n}`], c: `2${n} + 2${n} = 4${n}` },
      { s: `(2${n} + 1) + (2${n} + 3)`, j: `4${n} + 4`, f: [`4${n} + 3`, `4${n}`, `2${n} + 4`, `4${n} + 2`], c: `2${n} + 2${n} = 4${n} et 1 + 3 = 4` },
    ]);
    const text = un([
      `Réduis ${cas.s}.`,
      `Quelle est la forme réduite de ${cas.s} ?`,
      `${cas.s} est égal à quelle expression ?`,
      `Écris ${cas.s} sans parenthèses, puis réduis.`,
      `Simplifie ${cas.s}.`,
      `Choisis la forme réduite de ${cas.s}.`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(cas.j, cas.f),
      expected: [cas.j],
      comparator: "mcq_exact",
      explanation: expl("réduire, c’est regrouper les termes de même nature.", "on regroupe les lettres, puis les nombres.", `${cas.c}.`, `${cas.s} = ${cas.j}.`),
    };
  }),

  // ★2 : mettre le diviseur en facteur.
  tpl(ME, 6, 2, "Divise chaque terme par le nombre mis en facteur.", () => {
    const n = un(LE);
    const d = un([2, 3, 4, 5, 6, 7]);
    const k = entre(1, 6);
    const expr = `${d}${n} + ${d * k}`;
    const j = `${d}(${n} + ${k})`;
    const text = un([
      `Quelle écriture montre que ${expr} est un multiple de ${d} ?`,
      `Mets ${d} en facteur dans ${expr}.`,
      `Factorise ${expr} par ${d}.`,
      `${expr} est égal à quel produit par ${d} ?`,
      `Écris ${expr} sous la forme ${d} × (…).`,
      `Quel produit par ${d} vaut ${expr} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(j, [`${d}(${n} + ${d * k})`, `${d}(${n} + ${k + 1})`, `${d}${n}(${n} + ${k})`, `${d + 1}(${n} + ${k})`]),
      expected: [j],
      comparator: "mcq_exact",
      explanation: expl(DEF_MULT, `on met ${d} en facteur.`, `${d}${n} = ${d} × ${n} et ${d * k} = ${d} × ${k}.`, `${expr} = ${j}.`),
    };
  }),

  // ★2 : tester sur des nombres ce qu'on démontrera.
  tpl(ME, 7, 2, "Calcule la somme, puis divise-la.", () => {
    const a = entre(3, 40);
    const v = a + a + 1 + a + 2;
    const cas = un(["somme", "quotient"] as const);
    const liste = `${a}, ${a + 1} et ${a + 2}`;
    if (cas === "somme")
      return {
        text: un([`Calcule la somme de ${liste}.`, `Combien vaut la somme de ${liste} ?`, `Additionne ${liste}.`, `Trois entiers consécutifs : ${liste}. Quelle est leur somme ?`, `Donne la somme de ces trois entiers : ${liste}.`]),
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        explanation: expl("la somme est le résultat d’une addition.", "on additionne les trois entiers.", `${a} + ${a + 1} + ${a + 2} = ${v}.`, `la somme vaut ${v}, un multiple de 3.`),
      };
    return {
      text: un([`Divise la somme de ${liste} par 3.`, `La somme de ${liste}, divisée par 3, donne quel entier ?`, `Quel est le quotient par 3 de la somme de ${liste} ?`, `Somme de ${liste} : combien de fois 3 ?`]),
      format: "short",
      expected: [String(a + 1)],
      comparator: "number_equal",
      explanation: expl("trois entiers consécutifs ont pour somme le triple de celui du milieu.", "on calcule la somme, puis on divise par 3.", `${a} + ${a + 1} + ${a + 2} = ${v}, puis ${v} ÷ 3 = ${a + 1}.`, `le quotient est ${a + 1}, l’entier du milieu.`),
    };
  }),

  // ★2 : somme de deux multiples.
  tpl(ME, 8, 2, "Mets le nombre commun en facteur.", () => {
    const [n, p] = un([["n", "p"], ["k", "m"], ["a", "b"], ["p", "q"]] as const);
    const d = un([2, 3, 4, 5, 6, 7, 8, 9]);
    const j = `${d}(${n} + ${p})`;
    const s = `${d}${n} + ${d}${p}`;
    const text = un([
      `Factorise ${s}.`,
      `Quel produit est égal à ${s} ?`,
      `Écris ${s} sous forme d’un produit par ${d}.`,
      `Mets ${d} en facteur dans ${s}.`,
      `${n} et ${p} sont entiers. Quel produit par ${d} vaut ${s} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(j, [`${d}(${n} × ${p})`, `${2 * d}(${n} + ${p})`, `${d}(${n} + ${d}${p})`]),
      expected: [j],
      comparator: "mcq_exact",
      explanation: expl(DEF_MULT, `${d} est dans les deux termes : on le met en facteur.`, `${d}${n} + ${d}${p} = ${d} × ${n} + ${d} × ${p}.`, `${s} = ${j}, un multiple de ${d}.`),
    };
  }),

  // ★3 : la démonstration, ligne par ligne.
  tpl(ME, 9, 3, "Regarde la dernière ligne écrite, puis fais une seule étape.", () => {
    const [n, p] = un([["n", "p"], ["k", "m"], ["a", "b"], ["p", "q"]] as const);
    const cas = un([
      {
        but: "la somme de trois entiers consécutifs est un multiple de 3",
        ligne: `${n} + (${n} + 1) + (${n} + 2) = 3${n} + 3`,
        j: `3${n} + 3 = 3(${n} + 1)`,
        f: [`3${n} + 3 = 3(${n} + 3)`, `3${n} + 3 = 6${n}`, `3${n} + 3 = 3${n}(${n} + 1)`],
        c: `3 est dans les deux termes`,
      },
      {
        but: "la somme de deux entiers impairs est paire",
        ligne: `(2${n} + 1) + (2${p} + 1) = 2${n} + 2${p} + 2`,
        j: `2${n} + 2${p} + 2 = 2(${n} + ${p} + 1)`,
        f: [`2${n} + 2${p} + 2 = 2(${n} + ${p} + 2)`, `2${n} + 2${p} + 2 = 2(${n} + ${p})`, `2${n} + 2${p} + 2 = 4${n}${p} + 2`],
        c: `2 est dans les trois termes`,
      },
      {
        but: "la somme d’un entier pair et d’un entier impair est impaire",
        ligne: `2${n} + (2${p} + 1) = 2${n} + 2${p} + 1`,
        j: `2${n} + 2${p} + 1 = 2(${n} + ${p}) + 1`,
        f: [`2${n} + 2${p} + 1 = 2(${n} + ${p} + 1)`, `2${n} + 2${p} + 1 = 2(${n} + ${p})`, `2${n} + 2${p} + 1 = 4${n}${p} + 1`],
        c: `on met 2 en facteur dans les deux premiers termes`,
      },
      {
        but: "la somme de deux entiers pairs est paire",
        ligne: `2${n} + 2${p}`,
        j: `2${n} + 2${p} = 2(${n} + ${p})`,
        f: [`2${n} + 2${p} = 4(${n} + ${p})`, `2${n} + 2${p} = 2${n}${p}`, `2${n} + 2${p} = 2(${n} × ${p})`],
        c: `2 est dans les deux termes`,
      },
      {
        but: "le produit de deux entiers impairs est impair",
        ligne: `(2${n} + 1)(2${p} + 1) = 4${n}${p} + 2${n} + 2${p} + 1`,
        j: `4${n}${p} + 2${n} + 2${p} + 1 = 2(2${n}${p} + ${n} + ${p}) + 1`,
        f: [`4${n}${p} + 2${n} + 2${p} + 1 = 2(2${n}${p} + ${n} + ${p})`, `4${n}${p} + 2${n} + 2${p} + 1 = 2(4${n}${p} + ${n} + ${p}) + 1`, `4${n}${p} + 2${n} + 2${p} + 1 = 2(2${n}${p} + ${n} + ${p} + 1)`],
        c: `on met 2 en facteur dans les trois premiers termes`,
      },
    ]);
    const text = un([
      `On veut montrer que ${cas.but}. On a écrit : ${cas.ligne}. Quelle ligne suit ?`,
      `But : montrer que ${cas.but}. Dernière ligne : ${cas.ligne}. Quelle est la ligne suivante ?`,
      `Pour démontrer que ${cas.but}, on écrit ${cas.ligne}. Que faut-il écrire ensuite ?`,
      `Démonstration : ${cas.but}. On en est à ${cas.ligne}. Quelle ligne vient après ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(cas.j, cas.f),
      expected: [cas.j],
      comparator: "mcq_exact",
      explanation: expl(DEF_PAIR, `${cas.c}.`, `${cas.j}.`, `cette écriture montre que ${cas.but}.`),
    };
  }),

  // ★3 : la conclusion.
  tpl(ME, 10, 3, "Regarde le nombre mis en facteur, et s’il reste « + 1 ».", () => {
    const [n, p] = un([["n", "p"], ["k", "m"], ["a", "b"], ["p", "q"]] as const);
    const cas = un([
      { e: `3(${n} + 1)`, r: "C’est un multiple de 3.", d: "le produit de 3 par un entier" },
      { e: `5(${n} + 2)`, r: "C’est un multiple de 5.", d: "le produit de 5 par un entier" },
      { e: `7(${n} + ${p})`, r: "C’est un multiple de 7.", d: "le produit de 7 par un entier" },
      { e: `2(${n} + ${p} + 1)`, r: "C’est un nombre pair.", d: "le double d’un entier" },
      { e: `2(${n} + ${p})`, r: "C’est un nombre pair.", d: "le double d’un entier" },
      { e: `2(${n} + ${p}) + 1`, r: "C’est un nombre impair.", d: "le double d’un entier, plus 1" },
      { e: `2(2${n}² + 2${n}) + 1`, r: "C’est un nombre impair.", d: "le double d’un entier, plus 1" },
    ]);
    const autres = ["C’est un multiple de 3.", "C’est un multiple de 5.", "C’est un multiple de 7.", "C’est un nombre pair.", "C’est un nombre impair.", "On ne peut rien conclure."].filter((x) => x !== cas.r);
    const debut = un([
      `Une somme d’entiers a été écrite sous la forme ${cas.e}, avec ${n} et ${p} entiers.`,
      `Après calcul, on trouve ${cas.e}, où ${n} et ${p} sont entiers.`,
      `Un élève obtient ${cas.e}, avec ${n} et ${p} entiers.`,
      `Un calcul donne ${cas.e}, ${n} et ${p} étant des entiers.`,
    ]);
    const fin = un(["Quelle est la conclusion ?", "Que peut-on conclure ?", "Que montre cette écriture ?", "Quelle conclusion écrire ?"]);
    return {
      text: `${debut} ${fin}`,
      format: "qcm",
      choices: qcm(cas.r, autres),
      expected: [cas.r],
      comparator: "mcq_exact",
      explanation: expl(`${DEF_PAIR} ${DEF_MULT}`, "on regarde la forme de l’écriture obtenue.", `${cas.e} est ${cas.d}.`, cas.r),
    };
  }),

  // ★3 : le tour de magie.
  tpl(ME, 11, 3, "Écris le programme avec une lettre, puis réduis.", () => {
    const P = un(PRENOMS);
    const cadre = un(CADRES_MAGIE)(P);
    const a = entre(2, 9);
    const k = un([2, 3, 4, 5]);
    const b = k * a;
    const n = un(["n", "x", "t"]);
    const prog = `Choisis un nombre, ajoute ${a}, multiplie par ${k}, enlève ${b}, divise par ${k}.`;
    const juste = `${n}`;
    const text = un([
      `${cadre} « ${prog} » Avec ${n} au départ, que trouve-t-on à la fin ?`,
      `${cadre} « ${prog} » On part de ${n}. Quelle expression obtient-on ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [`${n} + ${a}`, `${k}${n}`, `${n} + ${b}`, `${n} − ${a}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("une lettre permet de calculer pour tous les nombres à la fois.", "on écrit chaque étape avec la lettre, puis on réduit.", `(${n} + ${a}) × ${k} = ${k}${n} + ${b} ; ${k}${n} + ${b} − ${b} = ${k}${n} ; ${k}${n} ÷ ${k} = ${n}.`, `on retrouve toujours le nombre de départ, ${n}.`),
    };
  }),

  // ★3 : réfuter une conjecture.
  tpl(ME, 12, 3, "Un seul exemple qui ne marche pas suffit à réfuter une affirmation.", () => {
    const P = un(PRENOMS);
    const cas = un([
      { aff: "la somme de trois entiers consécutifs est un multiple de 6", mk: (a: number) => `${a} + ${a + 1} + ${a + 2} = ${3 * a + 3}`, val: (a: number) => 3 * a + 3, d: 6, ok: (x: number) => x % 6 === 0 },
      { aff: "la somme de deux entiers consécutifs est un multiple de 3", mk: (a: number) => `${a} + ${a + 1} = ${2 * a + 1}`, val: (a: number) => 2 * a + 1, d: 3, ok: (x: number) => x % 3 === 0 },
      { aff: "la somme de quatre entiers consécutifs est un multiple de 3", mk: (a: number) => `${a} + ${a + 1} + ${a + 2} + ${a + 3} = ${4 * a + 6}`, val: (a: number) => 4 * a + 6, d: 3, ok: (x: number) => x % 3 === 0 },
      { aff: "la somme de cinq entiers consécutifs est un multiple de 10", mk: (a: number) => `${a} + ${a + 1} + ${a + 2} + ${a + 3} + ${a + 4} = ${5 * a + 10}`, val: (a: number) => 5 * a + 10, d: 10, ok: (x: number) => x % 10 === 0 },
      { aff: "la somme de trois entiers consécutifs est paire", mk: (a: number) => `${a} + ${a + 1} + ${a + 2} = ${3 * a + 3}`, val: (a: number) => 3 * a + 3, d: 2, ok: (x: number) => x % 2 === 0 },
    ]);
    // un contre-exemple et trois exemples qui vérifient l'affirmation
    const bons: number[] = [];
    const mauvais: number[] = [];
    for (let a = 1; a <= 40; a++) (cas.ok(cas.val(a)) ? bons : mauvais).push(a);
    const contre = un(mauvais);
    const juste = cas.mk(contre);
    const faux = melange(bons).slice(0, 3).map(cas.mk);
    const text = un([
      `${P} affirme que ${cas.aff}. Quel calcul prouve que c’est faux ?`,
      `Selon ${P}, ${cas.aff}. Quel exemple montre l’erreur de cette phrase ?`,
      `Sur le forum de la classe, ${P} écrit que ${cas.aff}. Quel contre-exemple lui donner ?`,
      `${P} parie que ${cas.aff}. Quel calcul fait perdre son pari ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: melange([juste, ...faux]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("un contre-exemple est un cas où l’affirmation est fausse : un seul suffit.", "on cherche la somme qui ne vérifie pas l’affirmation.", `${juste} ne vérifie pas l’affirmation.`, "l’affirmation est fausse."),
    };
  }),

  // ★4 : identité sur des entiers consécutifs.
  tpl(ME, 13, 4, "Développe le carré, puis réduis.", () => {
    const n = un(LE);
    const cas = un([
      { e: `(${n} + 1)² − ${n}²`, j: `2${n} + 1`, f: [`1`, `2${n}`, `${n} + 1`], but: "un nombre impair" },
      { e: `(${n} + 2)² − ${n}²`, j: `4${n} + 4`, f: [`4`, `4${n}`, `2${n} + 2`], but: "un multiple de 4" },
      { e: `(${n} + 1)² − (${n} − 1)²`, j: `4${n}`, f: [`2`, `2${n}`, `4${n} + 2`], but: "un multiple de 4" },
      { e: `(2${n} + 1)²`, j: `4${n}² + 4${n} + 1`, f: [`4${n}² + 1`, `2${n}² + 1`, `4${n}² + 2${n} + 1`], but: "un nombre impair" },
      { e: `(${n} + 3)² − ${n}²`, j: `6${n} + 9`, f: [`9`, `6${n}`, `3${n} + 9`], but: "un multiple de 3" },
      { e: `(${n} + 4)² − ${n}²`, j: `8${n} + 16`, f: [`16`, `8${n}`, `4${n} + 16`], but: "un multiple de 8" },
    ]);
    const text = un([
      `${n} est un entier. Montre que ${cas.e} est ${cas.but}. Quelle est sa forme développée et réduite ?`,
      `Pour tout entier ${n}, ${cas.e} est ${cas.but}. Quelle ligne le montre ? Développe et réduis.`,
      `On veut prouver que ${cas.e} est ${cas.but}, pour tout entier ${n}. Développe et réduis cette expression.`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(cas.j, cas.f),
      expected: [cas.j],
      comparator: "mcq_exact",
      explanation: expl("(a + b)² = a² + 2ab + b².", "on développe, puis on réduit.", `${cas.e} = ${cas.j}.`, `${cas.j} : c’est ${cas.but}.`),
    };
  }),

  // ★4 : somme de k consécutifs.
  tpl(ME, 14, 4, "Écris les entiers à partir du premier, puis réduis et factorise.", () => {
    const n = un(LE);
    const k = un([3, 5, 7]);
    const termes = Array.from({ length: k }, (_, i) => (i === 0 ? n : `(${n} + ${i})`)).join(" + ");
    const s = (k * (k - 1)) / 2;
    const reste = s / k;
    const j = `${k}(${n} + ${reste})`;
    const text = un([
      `Pour montrer que ${k} entiers consécutifs ont une somme multiple de ${k}, on écrit ${termes}. Quel produit obtient-on ?`,
      `Calcule ${termes}, puis factorise par ${k}.`,
      `Écris ${termes} comme un produit par ${k}.`,
      `La somme ${termes} vaut quel produit par ${k} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(j, [`${k}(${n} + ${reste + 1})`, `${k}(${n} + ${s})`, `${k}${n}(${n} + ${reste})`, `${k + 1}(${n} + ${reste})`]),
      expected: [j],
      comparator: "mcq_exact",
      explanation: expl(DEF_MULT, "on réduit la somme, puis on met en facteur.", `la somme vaut ${k}${n} + ${s}, et ${s} = ${k} × ${reste}.`, `la somme vaut ${j} : c’est un multiple de ${k}.`),
    };
  }),

  // ★4 : vrai ou faux pour tout entier.
  tpl(ME, 15, 4, "Teste quelques valeurs, puis écris le calcul avec la lettre.", () => {
    const n = un(LE);
    const cas = un([
      { aff: `le produit ${n}(${n} + 1) est toujours pair`, v: true, f: (x: number) => (x * (x + 1)) % 2 === 0 },
      { aff: `le nombre ${n}² + ${n} est toujours pair`, v: true, f: (x: number) => (x * x + x) % 2 === 0 },
      { aff: `le nombre ${n}² + 1 est toujours pair`, v: false, f: (x: number) => (x * x + 1) % 2 === 0 },
      { aff: `le nombre 2${n} + 7 est toujours impair`, v: true, f: (x: number) => Math.abs(2 * x + 7) % 2 === 1 },
      { aff: `le nombre 3${n} + 3 est toujours multiple de 3`, v: true, f: (x: number) => (3 * x + 3) % 3 === 0 },
      { aff: `le nombre 3${n} + 1 est toujours pair`, v: false, f: (x: number) => (3 * x + 1) % 2 === 0 },
      { aff: `le nombre 4${n} + 2 est toujours multiple de 4`, v: false, f: (x: number) => (4 * x + 2) % 4 === 0 },
      { aff: `le nombre 6${n} + 3 est toujours multiple de 3`, v: true, f: (x: number) => (6 * x + 3) % 3 === 0 },
    ]);
    const VRAI = "Vrai pour tous les entiers";
    const FAUX = "Faux : un contre-exemple existe";
    const juste = cas.v ? VRAI : FAUX;
    let contre = 1;
    if (!cas.v) while (cas.f(contre)) contre++;
    const text = un([
      `${n} est un entier positif. On affirme que ${cas.aff}. Est-ce vrai ?`,
      `Vrai ou faux, pour tout entier positif ${n} : ${cas.aff} ?`,
      `Pour tout entier positif ${n}, ${cas.aff}. Que penses-tu de cette phrase ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: melange([VRAI, FAUX, "On ne peut pas le savoir"]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("une propriété générale se prouve avec une lettre ; un contre-exemple suffit à la réfuter.", cas.v ? "on raisonne sur la forme de l’expression." : "on teste de petites valeurs.", cas.v ? `pour tout entier, ${cas.aff.replace(/^le (produit|nombre) /, "")}.` : `pour ${n} = ${contre}, la propriété est fausse.`, juste + "."),
    };
  }),
];

/* ───────────────────────── les fractions ───────────────────────── */

const JEUX = [
  { a: "a", b: "b", c: "c", d: "d" },
  { a: "p", b: "q", c: "r", d: "s" },
  { a: "x", b: "y", c: "z", d: "t" },
  { a: "m", b: "n", c: "u", d: "v" },
];
const f = (a: string | number, b: string | number) => `\\dfrac{${a}}{${b}}`;
const tex = (s: string) => `$${s}$`;
const DEF_Q = (a: string, b: string) => `le quotient ${tex(f(a, b))} est le nombre qui, multiplié par ${b}, donne ${a}.`;
const nonNul = (...l: string[]) => (l.length === 1 ? `${l[0]} ≠ 0` : `${l.join(" et ")} non nuls`);

const fractions: TutorBankItemV4[] = [
  // ★1 : a/b + c/b.
  tpl(MF, 1, 1, "Même dénominateur : on additionne les numérateurs.", () => {
    const J = un(JEUX);
    const s = `${f(J.a, J.b)} + ${f(J.c, J.b)}`;
    const juste = tex(f(`${J.a} + ${J.c}`, J.b));
    const text = un([
      `Avec ${nonNul(J.b)}, que vaut ${tex(s)} ?`,
      `${nonNul(J.b)}. Calcule ${tex(s)}.`,
      `Écris ${tex(s)} en une seule fraction (${nonNul(J.b)}).`,
      `Quelle fraction est égale à ${tex(s)} (${nonNul(J.b)}) ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [tex(f(`${J.a} + ${J.c}`, `${J.b} + ${J.b}`)), tex(f(`${J.a} \\times ${J.c}`, J.b)), tex(f(`${J.a} + ${J.c}`, `${J.b}^2`)), tex(f(`${J.a} - ${J.c}`, J.b))]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`pour additionner deux fractions de même dénominateur, on additionne les numérateurs.`, "on garde le dénominateur.", `${tex(s)} = ${juste}.`, `le résultat est ${juste}.`),
    };
  }),

  // ★1 : la définition, avec des nombres.
  tpl(MF, 2, 1, "Le quotient de a par b, multiplié par b, redonne a.", () => {
    const b = entre(2, 12);
    let a = entre(1, 20);
    while (a === b) a = entre(1, 20);
    const v = tex(f(a, b));
    const cas = un(["produit", "nombre"] as const);
    if (cas === "produit")
      return {
        text: un([`Calcule ${b} × ${v}.`, `Combien vaut ${b} × ${v} ?`, `${b} × ${v} est égal à quel nombre ?`, `Donne le résultat de ${v} × ${b}.`, `Que vaut ${v} × ${b} ?`]),
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: expl(DEF_Q(String(a), String(b)), "on applique la définition, sans calcul décimal.", `${b} × ${v} = ${a}.`, `le résultat est ${a}.`),
      };
    return {
      text: un([`Par quel nombre multiplier ${v} pour obtenir ${a} ?`, `${v} × … = ${a}. Quel nombre manque ?`, `Quel nombre manque ? … × ${v} = ${a}`, `Trouve le nombre manquant : ${v} × … = ${a}.`]),
      format: "short",
      expected: [String(b)],
      comparator: "number_equal",
      explanation: expl(DEF_Q(String(a), String(b)), "on lit le dénominateur.", `${b} × ${v} = ${a}.`, `le nombre manquant est ${b}.`),
    };
  }),

  // ★1 : traduire la définition.
  tpl(MF, 3, 1, "Le quotient, multiplié par le dénominateur, redonne le numérateur.", () => {
    const J = un(JEUX);
    const juste = tex(`${J.b} \\times ${f(J.a, J.b)} = ${J.a}`);
    const text = un([
      `Avec ${nonNul(J.b)}, quelle égalité traduit la définition de ${tex(f(J.a, J.b))} ?`,
      `${nonNul(J.b)}. Quelle égalité est toujours vraie ?`,
      `Quelle égalité vient de la définition de ${tex(f(J.a, J.b))} (${nonNul(J.b)}) ?`,
      `Par définition de ${tex(f(J.a, J.b))}, avec ${nonNul(J.b)}, quelle égalité a-t-on ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [tex(`${J.a} \\times ${f(J.a, J.b)} = ${J.b}`), tex(`${J.b} \\times ${f(J.a, J.b)} = 1`), tex(`${J.b} \\times ${f(J.a, J.b)} = ${J.a} \\times ${J.b}`)]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_Q(J.a, J.b), "on traduit la phrase par une égalité.", `${juste}.`, `l’égalité vraie est ${juste}.`),
    };
  }),

  // ★1 : produit en croix sur des nombres.
  tpl(MF, 4, 1, "Dans une égalité de fractions, les produits en croix sont égaux.", () => {
    const a = entre(1, 9);
    const b = entre(2, 9);
    const k = entre(2, 6);
    const eg = `${tex(f(a, b))} = ${tex(f(a * k, b * k))}`;
    const prod = a * (b * k);
    const cas = un(["produit", "manque"] as const);
    if (cas === "produit")
      return {
        text: un([`On a ${eg}. Calcule ${a} × ${b * k}.`, `${eg}. Que vaut ${b} × ${a * k} ?`, `Produits en croix de ${eg} : quelle est leur valeur ?`, `Quelle valeur ont les produits en croix de ${eg} ?`]),
        format: "short",
        expected: [String(prod)],
        comparator: "number_equal",
        explanation: expl("si deux fractions sont égales, leurs produits en croix sont égaux.", "on calcule un produit, puis on vérifie l’autre.", `${a} × ${b * k} = ${prod} et ${b} × ${a * k} = ${prod}.`, `les produits en croix valent ${prod}.`),
      };
    return {
      text: un([`On a ${eg}. Quel nombre manque ? ${a} × ${b * k} = ${b} × …`, `${eg}. Complète : ${a} × ${b * k} = ${b} × …`, `Quel nombre complète ${a} × ${b * k} = ${b} × …, sachant que ${eg} ?`]),
      format: "short",
      expected: [String(a * k)],
      comparator: "number_equal",
      explanation: expl("si deux fractions sont égales, leurs produits en croix sont égaux.", "on écrit les deux produits en croix.", `${a} × ${b * k} = ${b} × ${a * k}.`, `le nombre manquant est ${a * k}.`),
    };
  }),

  // ★2 : écrire a/b par ses produits.
  tpl(MF, 5, 2, "Remplace le quotient par une lettre, puis multiplie par le dénominateur.", () => {
    const J = un(JEUX);
    const k = un(["k", "h", "w"]);
    const juste = tex(`${J.a} = ${J.b} \\times ${k}`);
    const text = un([
      `On pose ${tex(`${k} = ${f(J.a, J.b)}`)}, avec ${nonNul(J.b)}. Quelle égalité en déduire ?`,
      `${tex(`${k} = ${f(J.a, J.b)}`)} et ${nonNul(J.b)}. Quelle égalité est vraie ?`,
      `Si ${tex(`${k} = ${f(J.a, J.b)}`)} (${nonNul(J.b)}), que peut-on écrire ?`,
      `Traduis ${tex(`${k} = ${f(J.a, J.b)}`)} sans fraction (${nonNul(J.b)}).`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [tex(`${J.b} = ${J.a} \\times ${k}`), tex(`${J.a} = ${J.b} + ${k}`), tex(`${k} = ${J.a} \\times ${J.b}`)]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_Q(J.a, J.b), `on multiplie les deux membres par ${J.b}.`, `${J.b} × ${k} = ${J.a}.`, `on écrit ${juste}.`),
    };
  }),

  // ★2 : démonstration de a/b + c/b, l'étape de factorisation.
  tpl(MF, 6, 2, "Le dénominateur est commun aux deux termes : on le met en facteur.", () => {
    const J = un(JEUX);
    const [q, r] = un([["k", "h"], ["u", "w"], ["e", "f"]] as const);
    const j = tex(`${J.a} + ${J.c} = ${J.b}(${q} + ${r})`);
    const debut = `${tex(`${J.a} = ${J.b}${q}`)} et ${tex(`${J.c} = ${J.b}${r}`)}`;
    const text = un([
      `On sait que ${debut}. Quelle égalité est vraie ?`,
      `${debut}. Que vaut la somme ${tex(`${J.a} + ${J.c}`)} ?`,
      `Si ${debut}, factorise ${tex(`${J.a} + ${J.c}`)}.`,
      `Avec ${debut}, quel produit vaut ${tex(`${J.a} + ${J.c}`)} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(j, [tex(`${J.a} + ${J.c} = ${J.b}${q}${r}`), tex(`${J.a} + ${J.c} = 2${J.b}(${q} + ${r})`), tex(`${J.a} + ${J.c} = ${J.b} + ${q} + ${r}`)]),
      expected: [j],
      comparator: "mcq_exact",
      explanation: expl("on additionne membre à membre, puis on factorise.", `${J.b} est commun aux deux termes.`, `${J.a} + ${J.c} = ${J.b}${q} + ${J.b}${r} = ${J.b}(${q} + ${r}).`, `${j}.`),
    };
  }),

  // ★2 : produit en croix avec des lettres.
  tpl(MF, 7, 2, "On multiplie le numérateur de chaque fraction par le dénominateur de l’autre.", () => {
    const J = un(JEUX);
    const eg = tex(`${f(J.a, J.b)} = ${f(J.c, J.d)}`);
    const juste = tex(`${J.a} \\times ${J.d} = ${J.b} \\times ${J.c}`);
    const text = un([
      `Si ${eg}, avec ${nonNul(J.b, J.d)}, quelle égalité a-t-on ?`,
      `${eg} (${nonNul(J.b, J.d)}). Quels produits en croix sont égaux ?`,
      `Écris les produits en croix de ${eg} (${nonNul(J.b, J.d)}).`,
      `Quelle égalité sans fraction traduit ${eg}, avec ${nonNul(J.b, J.d)} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [tex(`${J.a} \\times ${J.b} = ${J.c} \\times ${J.d}`), tex(`${J.a} \\times ${J.c} = ${J.b} \\times ${J.d}`), tex(`${J.a} + ${J.d} = ${J.b} + ${J.c}`)]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("si deux fractions sont égales, leurs produits en croix sont égaux.", "on multiplie chaque numérateur par le dénominateur de l’autre fraction.", `${juste}.`, `on a ${juste}.`),
    };
  }),

  // ★2 : simplification et produit de fractions.
  tpl(MF, 8, 2, "On multiplie les numérateurs entre eux, et les dénominateurs entre eux.", () => {
    const J = un(JEUX);
    const cas = un(["produit", "simplifier", "inverse"] as const);
    if (cas === "produit") {
      const s = `${f(J.a, J.b)} \\times ${f(J.c, J.d)}`;
      const juste = tex(f(`${J.a}${J.c}`, `${J.b}${J.d}`));
      return {
        text: un([`Avec ${nonNul(J.b, J.d)}, que vaut ${tex(s)} ?`, `${nonNul(J.b, J.d)}. Calcule ${tex(s)}.`, `Écris ${tex(s)} en une seule fraction (${nonNul(J.b, J.d)}).`]),
        format: "qcm",
        choices: qcm(juste, [tex(f(`${J.a} + ${J.c}`, `${J.b} + ${J.d}`)), tex(f(`${J.a}${J.d}`, `${J.b}${J.c}`)), tex(f(`${J.a}${J.c}`, `${J.b} + ${J.d}`))]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl("pour multiplier deux fractions, on multiplie les numérateurs et les dénominateurs.", "on écrit un seul trait de fraction.", `${tex(s)} = ${juste}.`, `le résultat est ${juste}.`),
      };
    }
    if (cas === "simplifier") {
      const k = un(["k", "h", "w"]);
      const s = f(`${k}${J.a}`, `${k}${J.b}`);
      const juste = tex(f(J.a, J.b));
      return {
        text: un([`Simplifie ${tex(s)}, avec ${nonNul(k, J.b)}.`, `${nonNul(k, J.b)}. Quelle fraction est égale à ${tex(s)} ?`, `Avec ${nonNul(k, J.b)}, à quoi est égal ${tex(s)} ?`]),
        format: "qcm",
        choices: qcm(juste, [tex(f(`${k} + ${J.a}`, `${k} + ${J.b}`)), tex(f(J.b, J.a)), tex(f(`${k}${J.a}`, J.b))]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl("on ne change pas un quotient en divisant ses deux termes par un même nombre non nul.", `on divise le haut et le bas par ${k}.`, `${tex(s)} = ${juste}.`, `le résultat est ${juste}.`),
      };
    }
    const juste = tex(`${J.a} \\times ${f(1, J.b)}`);
    return {
      text: un([`Avec ${nonNul(J.b)}, quel produit est égal à ${tex(f(J.a, J.b))} ?`, `${nonNul(J.b)}. Écris ${tex(f(J.a, J.b))} comme un produit.`, `Quel produit vaut ${tex(f(J.a, J.b))} (${nonNul(J.b)}) ?`]),
      format: "qcm",
      choices: qcm(juste, [tex(`${J.b} \\times ${f(1, J.a)}`), tex(`${J.a} \\times ${J.b}`), tex(`${f(1, J.a)} \\times ${f(1, J.b)}`)]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("diviser par un nombre, c’est multiplier par son inverse.", `on écrit la division par ${J.b} comme un produit par ${tex(f(1, J.b))}.`, `${tex(f(J.a, J.b))} = ${juste}.`, `le produit est ${juste}.`),
    };
  }),

  // ★3 : la ligne qui suit, somme de deux fractions de même dénominateur.
  tpl(MF, 9, 3, "On veut revenir au quotient : on divise les deux membres par le dénominateur.", () => {
    const J = un(JEUX);
    const [q, r] = un([["k", "h"], ["u", "w"], ["e", "f"]] as const);
    const ligne = tex(`${J.a} + ${J.c} = ${J.b}(${q} + ${r})`);
    const juste = tex(`${f(`${J.a} + ${J.c}`, J.b)} = ${q} + ${r}`);
    const pose = `${tex(`${q} = ${f(J.a, J.b)}`)} et ${tex(`${r} = ${f(J.c, J.b)}`)}`;
    const text = un([
      `Démonstration : on pose ${pose}. On obtient ${ligne}. Quelle ligne suit ?`,
      `On pose ${pose} et on arrive à ${ligne}. Quelle est la ligne suivante ?`,
      `Pour démontrer l’addition des fractions, on pose ${pose}. Après ${ligne}, qu’écrit-on ?`,
      `On a posé ${pose}, puis écrit ${ligne}. Quelle égalité vient ensuite ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [tex(`${f(`${J.a} + ${J.c}`, J.b)} = ${q}${r}`), tex(`${f(`${J.a} + ${J.c}`, `${J.b} + ${J.b}`)} = ${q} + ${r}`), tex(`${J.a} + ${J.c} = ${q} + ${r}`)]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_Q(`${J.a} + ${J.c}`, J.b), `on divise les deux membres par ${J.b}.`, `${juste}.`, `on a montré que la somme des quotients est le quotient de la somme.`),
    };
  }),

  // ★3 : démontrer le produit en croix.
  tpl(MF, 10, 3, "On multiplie les deux membres par le même nombre, puis on simplifie.", () => {
    const J = un(JEUX);
    const eg = tex(`${f(J.a, J.b)} = ${f(J.c, J.d)}`);
    const cas = un(["mult", "fin"] as const);
    if (cas === "mult") {
      const juste = `par ${tex(`${J.b} \\times ${J.d}`)}`;
      return {
        text: un([
          `On part de ${eg}, avec ${nonNul(J.b, J.d)}. Par quoi multiplier les deux membres pour supprimer les fractions ?`,
          `Pour démontrer le produit en croix à partir de ${eg}, par quoi multiplie-t-on chaque membre ?`,
          `${eg}, avec ${nonNul(J.b, J.d)}. Quelle multiplication fait disparaître les deux dénominateurs ?`,
        ]),
        format: "qcm",
        choices: qcm(juste, [`par ${tex(`${J.a} \\times ${J.c}`)}`, `par ${tex(J.b)} seulement`, `par ${tex(`${J.b} + ${J.d}`)}`]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl("multiplier une fraction par son dénominateur redonne le numérateur.", `on multiplie les deux membres par ${J.b} × ${J.d}.`, `${tex(`${f(J.a, J.b)} \\times ${J.b} \\times ${J.d} = ${J.a} \\times ${J.d}`)}.`, `il faut multiplier ${juste}.`),
      };
    }
    const ligne = tex(`${f(J.a, J.b)} \\times ${J.b} \\times ${J.d} = ${f(J.c, J.d)} \\times ${J.b} \\times ${J.d}`);
    const juste = tex(`${J.a} \\times ${J.d} = ${J.c} \\times ${J.b}`);
    return {
      text: un([
        `On part de ${eg} et on écrit ${ligne}. Quelle ligne suit ?`,
        `Après ${ligne}, quelle égalité obtient-on en simplifiant ?`,
        `Simplifie les deux membres de ${ligne}.`,
      ]),
      format: "qcm",
      choices: qcm(juste, [tex(`${J.a} \\times ${J.c} = ${J.b} \\times ${J.d}`), tex(`${J.a} \\times ${J.b} = ${J.c} \\times ${J.d}`), tex(`${J.a} = ${J.c}`)]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_Q(J.a, J.b), `${J.b} × ${tex(f(J.a, J.b))} = ${J.a} et ${J.d} × ${tex(f(J.c, J.d))} = ${J.c}.`, `${juste}.`, `les produits en croix sont égaux.`),
    };
  }),

  // ★3 : réfuter une addition fausse.
  tpl(MF, 11, 3, "Calcule les deux membres pour un exemple simple.", () => {
    const P = un(PRENOMS);
    const b = entre(3, 9);
    const a = entre(1, b - 1);
    const c = entre(1, b - 1);
    const d = b; // même dénominateur : le piège est d'additionner aussi les dénominateurs.
    const haut = a + c;
    const lue = tex(`${f(a, b)} + ${f(c, d)} = ${f(haut, b + d)}`);
    const juste = tex(f(haut, b));
    const text = un([
      `${P} écrit sur sa copie : ${lue}. Quel est le résultat exact de la somme ?`,
      `Au tableau, ${P} a noté ${lue}. Que vaut vraiment la somme ?`,
      `Dans son cahier, ${P} calcule ${lue}. Quelle est la bonne fraction ?`,
      `Pour partager un gâteau, ${P} écrit ${lue}. Quel résultat aurait-il fallu trouver ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [[haut, b + d], [a * c, b], [haut, b * b], [haut + 1, b], [a * c, b * b]].filter(([x, y], i, t) => x / y !== haut / b && t.findIndex(([u, v]) => u / v === x / y) === i).map(([x, y]) => tex(f(x, y)))),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("pour additionner deux fractions de même dénominateur, on additionne les numérateurs et on garde le dénominateur.", `${b} reste au dénominateur.`, `${a} + ${c} = ${haut}, donc la somme vaut ${juste}.`, `le résultat exact est ${juste}.`),
    };
  }),

  // ★3 : la conjecture des fractions.
  tpl(MF, 12, 3, "Teste l’égalité sur l’exemple proposé.", () => {
    const P = un(PRENOMS);
    const J = un(JEUX);
    const cas = un([
      { aff: `${f(`${J.a} + 1`, `${J.b} + 1`)} = ${f(J.a, J.b)}`, gauche: (a: number, b: number) => (a + 1) / (b + 1) },
      { aff: `${f(`2${J.a}`, `2${J.b}`)} = ${f(J.a, J.b)}`, gauche: (a: number, b: number) => (2 * a) / (2 * b) },
      { aff: `${f(`${J.a} + 2`, `${J.b} + 2`)} = ${f(J.a, J.b)}`, gauche: (a: number, b: number) => (a + 2) / (b + 2) },
      { aff: `${f(`3${J.a}`, `3${J.b}`)} = ${f(J.a, J.b)}`, gauche: (a: number, b: number) => (3 * a) / (3 * b) },
    ]);
    let a = entre(1, 6);
    const b = entre(2, 7);
    while (a === b) a = entre(1, 6);
    const vraie = Math.abs(cas.gauche(a, b) - a / b) < 1e-9;
    const OUI = "Oui, toujours";
    const NON = "Non, l’égalité est fausse en général";
    const SEUL = `Seulement si ${J.a} = 1`;
    const juste = vraie ? OUI : NON;
    const text = un([
      `${P} pense que ${tex(cas.aff)}, pour tous nombres non nuls. Avec ${J.a} = ${a} et ${J.b} = ${b}, teste-le. Est-ce vrai ?`,
      `Selon ${P}, ${tex(cas.aff)} pour tous nombres non nuls. Essaie ${J.a} = ${a} et ${J.b} = ${b}. Est-ce juste ?`,
      `Dans un forum, ${P} écrit ${tex(cas.aff)} pour tous nombres non nuls. Teste avec ${J.a} = ${a} et ${J.b} = ${b}. Est-ce vrai ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: melange([OUI, NON, SEUL, "Seulement pour des nombres entiers"]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("on ne change pas une fraction en multipliant ses deux termes par un même nombre ; ajouter un même nombre la change.", "on calcule les deux membres sur l’exemple.", vraie ? `multiplier le haut et le bas par un même nombre non nul redonne la même valeur.` : `ajouter un même nombre en haut et en bas change la valeur de la fraction.`, `${juste}.`),
    };
  }),

  // ★4 : deux dénominateurs différents.
  tpl(MF, 13, 4, "On met au même dénominateur : le produit des deux.", () => {
    const J = un(JEUX);
    const s = `${f(J.a, J.b)} + ${f(J.c, J.d)}`;
    const juste = tex(f(`${J.a}${J.d} + ${J.b}${J.c}`, `${J.b}${J.d}`));
    const text = un([
      `Avec ${nonNul(J.b, J.d)}, écris ${tex(s)} en une seule fraction.`,
      `${nonNul(J.b, J.d)}. Quelle fraction est égale à ${tex(s)} ?`,
      `Démontre la règle : à quoi est égal ${tex(s)}, avec ${nonNul(J.b, J.d)} ?`,
      `Mets au même dénominateur ${tex(s)}, avec ${nonNul(J.b, J.d)}.`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [tex(f(`${J.a} + ${J.c}`, `${J.b} + ${J.d}`)), tex(f(`${J.a}${J.c} + ${J.b}${J.d}`, `${J.b}${J.d}`)), tex(f(`${J.a}${J.b} + ${J.c}${J.d}`, `${J.b}${J.d}`))]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("on ne change pas une fraction en multipliant ses deux termes par un même nombre non nul.", `on multiplie la première par ${J.d} en haut et en bas, la seconde par ${J.b}.`, `${tex(f(`${J.a}${J.d}`, `${J.b}${J.d}`))} + ${tex(f(`${J.b}${J.c}`, `${J.b}${J.d}`))} = ${juste}.`, `le résultat est ${juste}.`),
    };
  }),

  // ★4 : la division de deux fractions.
  tpl(MF, 14, 4, "Diviser par une fraction, c’est multiplier par son inverse.", () => {
    const J = un(JEUX);
    const s = `${f(J.a, J.b)} \\div ${f(J.c, J.d)}`;
    const juste = tex(`${f(J.a, J.b)} \\times ${f(J.d, J.c)}`);
    const text = un([
      `Avec ${J.b}, ${J.c} et ${J.d} non nuls, quel produit est égal à ${tex(s)} ?`,
      `${J.b}, ${J.c}, ${J.d} sont non nuls. Écris ${tex(s)} comme un produit.`,
      `Quel produit vaut ${tex(s)}, avec ${J.b}, ${J.c} et ${J.d} non nuls ?`,
      `Transforme ${tex(s)} en produit (${J.b}, ${J.c} et ${J.d} non nuls).`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [tex(`${f(J.a, J.b)} \\times ${f(J.c, J.d)}`), tex(`${f(J.b, J.a)} \\times ${f(J.c, J.d)}`), tex(`${f(J.b, J.a)} \\times ${f(J.d, J.c)}`)]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("diviser par un nombre non nul, c’est multiplier par son inverse.", `l’inverse de ${tex(f(J.c, J.d))} est ${tex(f(J.d, J.c))}.`, `${tex(s)} = ${juste}.`, `le produit est ${juste}.`),
    };
  }),

  // ★4 : propriété sur la somme des hauts et des bas.
  tpl(MF, 15, 4, "Remplace, puis simplifie la fraction obtenue.", () => {
    const a = entre(1, 6);
    let b = entre(2, 9);
    while (a === b || a % b === 0 || b % a === 0 && a > 1) b = entre(2, 9);
    const k = entre(2, 5);
    const c = a * k;
    const d = b * k;
    const h = a + c;
    const bas = b + d;
    const eg = tex(`${f(a, b)} = ${f(c, d)}`);
    const somme = tex(f(`${a} + ${c}`, `${b} + ${d}`));
    const text = un([
      `On a ${eg}. Quelle fraction est égale à ${somme} ?`,
      `Sachant que ${eg}, simplifie ${somme}.`,
      `Avec ${eg}, que vaut la fraction ${somme} ?`,
      `On sait que ${eg}. Calcule ${somme} et simplifie.`,
      `Vérifie sur ${eg} la propriété : à quoi est égal ${somme} ?`,
    ]);
    const juste = tex(f(a, b));
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [[h, b], [a, bas], [a + 1, b + 1], [c, b], [a, d]].filter(([x, y], i, t) => x * b !== a * y && t.findIndex(([u, v]) => u * y === x * v) === i).map(([x, y]) => tex(f(x, y)))),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("si deux fractions sont égales, la fraction des sommes leur est égale aussi.", "on additionne en haut et en bas, puis on simplifie.", `${a} + ${c} = ${h} et ${b} + ${d} = ${bas}, puis ${tex(f(h, bas))} = ${juste}.`, `la fraction vaut ${juste}.`),
    };
  }),

  // ★4 : la justification d'une étape.
  tpl(MF, 16, 4, "Regarde ce qui change entre les deux lignes.", () => {
    const J = un(JEUX);
    const k = un(["k", "h", "w"]);
    const cas = un([
      { l1: `${k} = ${f(J.a, J.b)}`, l2: `${J.a} = ${J.b} \\times ${k}`, r: "la définition du quotient" },
      { l1: `${J.a} + ${J.c} = ${J.b}${k} + ${J.b}w`.replace("w", k === "w" ? "h" : "w"), l2: `${J.a} + ${J.c} = ${J.b}(${k} + ${k === "w" ? "h" : "w"})`, r: "la mise en facteur" },
      { l1: `${J.a} \\times ${J.d} = ${J.b} \\times ${J.c}`, l2: `${f(J.a, J.b)} = ${f(J.c, J.d)}`, r: "l’égalité des produits en croix" },
      { l1: `${f(J.a, J.b)} \\div ${f(J.c, J.d)}`, l2: `${f(J.a, J.b)} \\times ${f(J.d, J.c)}`, r: "la multiplication par l’inverse" },
    ]);
    const toutes = ["la définition du quotient", "la mise en facteur", "l’égalité des produits en croix", "la multiplication par l’inverse"];
    const text = un([
      `Les dénominateurs sont non nuls. On passe de ${tex(cas.l1)} à ${tex(cas.l2)}. Qu’utilise-t-on ?`,
      `Les dénominateurs sont non nuls. De ${tex(cas.l1)}, on déduit ${tex(cas.l2)}. Quelle est la justification ?`,
      `Les dénominateurs sont non nuls. Quelle règle permet d’écrire ${tex(cas.l2)} à partir de ${tex(cas.l1)} ?`,
      `Les dénominateurs sont non nuls. Dans une démonstration, on passe de ${tex(cas.l1)} à ${tex(cas.l2)}. Pourquoi est-ce permis ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: melange([...toutes]),
      expected: [cas.r],
      comparator: "mcq_exact",
      explanation: expl("chaque ligne d’une démonstration se justifie par une définition ou une propriété.", "on compare les deux lignes.", `on passe de ${tex(cas.l1)} à ${tex(cas.l2)}.`, `on utilise ${cas.r}.`),
    };
  }),
];

export const litteralDemontrerBank: TutorBankItemV4[] = [...entiers, ...fractions];
