// lib/tutor-v4/questionBank/stmg/maths/algorithmique.bank.ts
//
// Notions : algo_variables, algo_boucles, algo_listes, algo_fonctions,
//           tableur_formules, tableur_recopie, logique_connecteurs,
//           logique_raisonnement                    (domaine STMGAL)
//
// ⛔ CE N'EST PAS DU SCRATCH. Le BO est explicite : « la pratique de
// l'algorithmique et de la programmation se poursuit au cycle terminal. En
// continuité avec la classe de seconde, LE LANGAGE UTILISÉ EST PYTHON. »
// Tous les items affichent donc du code Python réel, avec son indentation et
// sa syntaxe — pas de pseudo-code, pas de blocs.
//
// Le programme précise ce qui est attendu : « la connaissance d'un nombre
// limité d'éléments de syntaxe et de fonctions spécifiques à l'outil utilisé
// (langage Python, tableur) ». On reste donc sur : affectation, compteur,
// accumulateur, boucle bornée et non bornée, instruction conditionnelle,
// listes (en extension, par ajouts successifs, en compréhension), fonctions
// avec entrées et sorties.
//
// ⭐ Les élèves LISENT plus qu'ils n'écrivent : « interpréter un algorithme
// donné », « compléter, améliorer ou corriger un programme informatique ». Les
// items demandent donc surtout ce que rend un programme, ce qu'il compte, où
// il se trompe — jamais d'écrire vingt lignes à partir de rien.
//
// Le tableur a le même statut que Python dans le texte, et la logique est
// rattachée ici parce que le BO l'y rattache : « la construction de conditions
// logiques en algorithmique à l'aide des opérateurs ET, OU, NON et la création
// de filtres en analyse de données sont l'occasion de travailler la logique. »

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

/** Un bloc de code Python, présenté tel qu'il s'écrit. */
function code(lignes: readonly string[]): string {
  return "```python\n" + lignes.join("\n") + "\n```";
}

/**
 * Un algorithme en LANGAGE NATUREL, avec la flèche d'affectation.
 *
 * ⭐ C'est la notation du bac. Frédéric a fourni trois sujets — déchets
 * recyclés, capital Rennepont d'Eugène Sue, papillons monarques — et les trois
 * emploient « ← » et « Tant que », jamais Python. Le BO l'autorise
 * explicitement : « comme en classe de seconde, on utilise le symbole « ← »
 * pour désigner l'affectation dans un algorithme écrit en langage naturel ».
 *
 * Les deux notations coexistent donc dans ce fichier : Python parce que le
 * programme le nomme, le langage naturel parce que c'est lui qui tombe.
 */
function pseudo(lignes: readonly string[]): string {
  return "```\n" + lignes.join("\n") + "\n```";
}

/** Le tableau de déroulement d'un programme, colonne par tour de boucle. */
function canvasTrace(
  variables: readonly string[],
  valeurs: readonly (readonly (string | number)[])[],
  titre: string
): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: titre,
    caption: "Valeur des variables après chaque tour de boucle",
    headers: ["Tour", ...valeurs[0].map((_, k) => String(k))],
    rows: variables.map((v, i) => ({ label: v, values: [...valeurs[i]] })),
  };
}

/* ─────────────────── contextes ─────────────────── */

const GRANDEURS = [
  { nom: "ventes", variable: "ventes", unite: "articles" },
  { nom: "commandes", variable: "commandes", unite: "commandes" },
  { nom: "recettes", variable: "recettes", unite: "€" },
  { nom: "stocks", variable: "stocks", unite: "unités" },
] as const;

export const algorithmiqueBank: TutorBankItemV4[] = [
  /* ═══════════════════ algo_affectation ═══════════════════ */

  {
    kind: "template",
    id: "stmg_algo_affectation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_variables",
    microId: "algo_affectation",
    difficulty: 2,
    theme: "neutral",
    hint: "Une affectation écrase l'ancienne valeur : on suit les lignes dans l'ordre.",
    tags: ["stmg", "maths", "algorithmique", "python", "template", "short"],
    generate: () => {
      const a = randomInt(2, 20);
      const b = randomInt(2, 15);
      const c = randomInt(2, 10);
      const ordre = pick(["somme", "produit", "reaffectation"] as const);
      const lignes =
        ordre === "somme"
          ? [`x = ${a}`, `y = ${b}`, `x = x + y`, `print(x)`]
          : ordre === "produit"
            ? [`x = ${a}`, `y = ${b}`, `x = x * y`, `print(x)`]
            : [`x = ${a}`, `x = x + ${b}`, `x = x - ${c}`, `print(x)`];
      const resultat = ordre === "somme" ? a + b : ordre === "produit" ? a * b : a + b - c;
      return {
        text: `Qu'affiche ce programme Python ?\n\n${code(lignes)}`,
        format: "short",
        expected: [String(resultat)],
        comparator: "number_equal",
        explanation: exp(
          "Une affectation `x = ...` calcule d'abord le membre de droite, puis range le résultat dans la variable : l'ancienne valeur est perdue.",
          "On suit les lignes dans l'ordre, en notant la valeur de chaque variable après chaque instruction.",
          ordre === "reaffectation"
            ? `x vaut ${a}, puis ${a + b}, puis ${a + b - c}.`
            : `x vaut ${a} et y vaut ${b}, donc x devient ${resultat}.`,
          `Le programme affiche ${resultat}.`
        ),
      };
    },
  },

  /* ═══════════════════ algo_compteur ═══════════════════ */

  {
    kind: "template",
    id: "stmg_algo_compteur_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_variables",
    microId: "algo_compteur",
    difficulty: 2,
    theme: "neutral",
    hint: "Un compteur augmente de $1$ à chaque fois que la condition est vraie — il ne cumule pas les valeurs.",
    tags: ["stmg", "maths", "algorithmique", "python", "canvas", "template", "short"],
    generate: () => {
      const g = pick(GRANDEURS);
      const donnees = Array.from({ length: 6 }, () => randomInt(5, 40));
      const seuil = randomInt(15, 30);
      const compte = donnees.filter((v) => v > seuil).length;
      const lignes = [
        `${g.variable} = [${donnees.join(", ")}]`,
        `c = 0`,
        `for v in ${g.variable}:`,
        `    if v > ${seuil}:`,
        `        c = c + 1`,
        `print(c)`,
      ];
      return {
        text: `Qu'affiche ce programme ?\n\n${code(lignes)}`,
        format: "short",
        expected: [String(compte)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: `Les ${g.nom} parcourues`,
          headers: ["Valeur", ...donnees.map((v) => String(v))],
          rows: [{ label: `> ${seuil} ?`, values: donnees.map((v) => (v > seuil ? "oui" : "non")) }],
        } satisfies CanvasFigure,
        explanation: exp(
          "Un COMPTEUR est une variable qu'on augmente de $1$ à chaque occurrence d'un évènement : il compte, il n'additionne pas.",
          "On parcourt la liste et l'on incrémente `c` chaque fois que la condition est vraie.",
          `Valeurs strictement supérieures à ${seuil} : ${donnees.filter((v) => v > seuil).join(", ") || "aucune"} — soit ${compte}.`,
          `Le programme affiche ${compte}.`
        ),
      };
    },
  },

  /* ═══════════════════ algo_accumulateur ═══════════════════ */

  {
    kind: "template",
    id: "stmg_algo_accumulateur_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_variables",
    microId: "algo_accumulateur",
    difficulty: 2,
    theme: "neutral",
    hint: "Un accumulateur AJOUTE la valeur, là où un compteur ajouterait $1$.",
    tags: ["stmg", "maths", "algorithmique", "python", "canvas", "template", "short"],
    generate: () => {
      const g = pick(GRANDEURS);
      const donnees = Array.from({ length: 5 }, () => randomInt(10, 60));
      const total = donnees.reduce((s, v) => s + v, 0);
      const lignes = [
        `${g.variable} = [${donnees.join(", ")}]`,
        `s = 0`,
        `for v in ${g.variable}:`,
        `    s = s + v`,
        `print(s)`,
      ];
      const cumuls: number[] = [];
      donnees.reduce((acc, v) => {
        const n = acc + v;
        cumuls.push(n);
        return n;
      }, 0);
      return {
        text: `Qu'affiche ce programme ?\n\n${code(lignes)}`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        canvas: canvasTrace(["v", "s"], [donnees, cumuls], "Déroulement de la boucle"),
        explanation: exp(
          "Un ACCUMULATEUR cumule les valeurs rencontrées : initialisé à $0$, il reçoit `s = s + v` à chaque tour.",
          "On suit le tableau de déroulement : la variable `s` grandit de la valeur lue à chaque passage.",
          `${donnees.join(" + ")} = ${total}.`,
          `Le programme affiche ${total}.`
        ),
        choiceDiagnostics: [],
      };
    },
  },

  /* ═══════════════════ algo_aleatoire ═══════════════════ */

  {
    kind: "template",
    id: "stmg_algo_aleatoire_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_variables",
    microId: "algo_aleatoire",
    difficulty: 3,
    theme: "neutral",
    hint: "`random()` rend un nombre entre $0$ et $1$ : la condition doit découper un intervalle de longueur $p$.",
    tags: ["stmg", "maths", "algorithmique", "python", "probabilites", "template"],
    generate: () => {
      const p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8] as const);
      const lignes = [
        `from random import random`,
        ``,
        `def epreuve():`,
        `    r = random()`,
        `    if ???:`,
        `        return 1`,
        `    else:`,
        `        return 0`,
      ];
      return {
        text:
          `Ce programme simule une loi de Bernoulli de paramètre $${fr(p)}$. ` +
          `Par quoi faut-il remplacer \`???\` ?\n\n${code(lignes)}`,
        format: "qcm",
        choices: makeChoices(`r < ${fr(p).replace(",", ".")}`, [
          `r > ${fr(p).replace(",", ".")}`,
          `r == ${fr(p).replace(",", ".")}`,
          `r < ${fr(Math.round((1 - p) * 100) / 100).replace(",", ".")}`,
          `r > ${fr(Math.round((1 - p) * 100) / 100).replace(",", ".")}`,
          `r * ${fr(p).replace(",", ".")} < 1`,
        ]),
        expected: [`r < ${fr(p).replace(",", ".")}`],
        comparator: "mcq_exact",
        explanation: exp(
          "`random()` rend un nombre pris au hasard, uniformément, entre $0$ et $1$ : la probabilité de tomber dans un intervalle est égale à sa longueur.",
          "On veut que le succès survienne avec la probabilité $p$ : on retient donc l'intervalle $[0\\,;\\,p[$, de longueur $p$.",
          `La condition \`r < ${fr(p).replace(",", ".")}\` est vraie avec la probabilité $${fr(p)}$ — c'est exactement le paramètre voulu.`,
          `Il faut écrire \`r < ${fr(p).replace(",", ".")}\`.`
        ),
      };
    },
  },

  /* ═══════════════════ algo_boucle_bornee ═══════════════════ */

  {
    kind: "template",
    id: "stmg_algo_boucle_bornee_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_boucles",
    microId: "algo_boucle_bornee",
    difficulty: 2,
    theme: "neutral",
    hint: "`range(n)` parcourt $0, 1, \\dots, n-1$ : il y a bien $n$ tours, mais on ne va pas jusqu'à $n$.",
    tags: ["stmg", "maths", "algorithmique", "python", "template", "short"],
    generate: () => {
      const n = randomInt(4, 10);
      const depart = randomInt(1, 5) * 100;
      const t = pick([2, 3, 5, 10] as const);
      const q = 1 + t / 100;
      const lignes = [
        `capital = ${depart}`,
        `for i in range(${n}):`,
        `    capital = capital * ${fr(q).replace(",", ".")}`,
        `print(round(capital, 2))`,
      ];
      const resultat = Math.round(depart * Math.pow(q, n) * 100) / 100;
      return {
        text: `Qu'affiche ce programme ?\n\n${code(lignes)}`,
        format: "short",
        expected: [fr(resultat)],
        comparator: "number_equal",
        explanation: exp(
          "Une boucle bornée `for i in range(n)` exécute son bloc exactement $n$ fois, avec $i$ prenant les valeurs $0$ à $n-1$.",
          "On compte les tours, puis on applique l'opération autant de fois.",
          `Le capital est multiplié $${n}$ fois par $${fr(q)}$ : $${depart} \\times ${fr(q)}^{${n}} \\approx ${fr(resultat)}$.`,
          `Le programme affiche ${fr(resultat)}.`
        ),
      };
    },
  },

  /* ═══════════════════ algo_condition_si ═══════════════════ */

  {
    kind: "template",
    id: "stmg_algo_condition_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_boucles",
    microId: "algo_condition_si",
    difficulty: 2,
    theme: "neutral",
    hint: "Le `elif` n'est testé QUE si la condition précédente est fausse.",
    tags: ["stmg", "maths", "algorithmique", "python", "template"],
    generate: () => {
      const s1 = randomInt(200, 400);
      const s2 = s1 + randomInt(200, 400);
      const montant = pick([s1 - randomInt(20, 150), s1 + randomInt(20, 150), s2 + randomInt(20, 200)] as const);
      const lignes = [
        `def remise(montant):`,
        `    if montant >= ${s2}:`,
        `        return 15`,
        `    elif montant >= ${s1}:`,
        `        return 5`,
        `    else:`,
        `        return 0`,
        ``,
        `print(remise(${montant}))`,
      ];
      const resultat = montant >= s2 ? 15 : montant >= s1 ? 5 : 0;
      return {
        text: `Ce programme calcule un taux de remise, en pourcentage. Qu'affiche-t-il ?\n\n${code(lignes)}`,
        format: "qcm",
        choices: makeChoices(String(resultat), ["0", "5", "15", "20", String(montant)]),
        expected: [String(resultat)],
        comparator: "mcq_exact",
        explanation: exp(
          "Une instruction conditionnelle teste les conditions DANS L'ORDRE : le `elif` n'est évalué que si le `if` précédent est faux, et le `else` seulement si tout a échoué.",
          "On compare la valeur aux seuils, du plus grand au plus petit, en s'arrêtant au premier vrai.",
          `$${montant} ${montant >= s2 ? "\\geqslant" : "<"} ${s2}$` +
            (montant >= s2
              ? ` : la première condition est vraie, on rend 15.`
              : ` ; puis $${montant} ${montant >= s1 ? "\\geqslant" : "<"} ${s1}$ : on rend ${resultat}.`),
          `Le programme affiche ${resultat}.`
        ),
      };
    },
  },

  /* ═══════════════ algo_boucle_conditionnelle ═══════════════ */

  {
    kind: "template",
    id: "stmg_algo_boucle_cond_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_boucles",
    microId: "algo_boucle_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "La boucle `while` tourne TANT QUE la condition est vraie : le compteur donne le nombre de tours effectués.",
    tags: ["stmg", "maths", "algorithmique", "python", "template", "short"],
    generate: () => {
      const depart = pick([1000, 1500, 2000, 2500] as const);
      const t = pick([5, 10, 20, 25] as const);
      const q = 1 + t / 100;
      const cible = depart * pick([1.5, 2, 2.5] as const);
      let valeur = depart;
      let n = 0;
      while (valeur < cible && n < 100) {
        valeur *= q;
        n++;
      }
      const lignes = [
        `capital = ${depart}`,
        `n = 0`,
        `while capital < ${cible}:`,
        `    capital = capital * ${fr(q).replace(",", ".")}`,
        `    n = n + 1`,
        `print(n)`,
      ];
      return {
        text: `Qu'affiche ce programme de recherche de seuil ?\n\n${code(lignes)}`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Une boucle non bornée `while` répète son bloc TANT QUE la condition reste vraie, sans qu'on sache à l'avance combien de tours seront nécessaires : c'est l'outil des problèmes de seuil.",
          "On compte les tours jusqu'à ce que la condition devienne fausse — le compteur `n` retient ce nombre.",
          `Le capital est multiplié par $${fr(q)}$ à chaque tour et doit atteindre $${fr(cible)}$ : il faut $${n}$ tours.`,
          `Le programme affiche ${n}.`
        ),
      };
    },
  },

  /* ═══════ algo_boucle_conditionnelle — LE FORMAT DU BAC ═══════ */
  //
  // ⭐ Trois sujets fournis par Frédéric le 15/08/2026 — déchets recyclés
  // (2012+n), capital Rennepont d'Eugène Sue (1682+n), papillons monarques
  // (2019+n) — posent EXACTEMENT la même question, avec la même notation :
  // une suite géométrique issue des questions précédentes, un algorithme de
  // seuil en « Tant que », et l'une de ces trois demandes — que contient la
  // variable à la fin, quelle ligne compléter, comment interpréter le
  // résultat dans le contexte. Les trois items qui suivent couvrent les trois.

  {
    kind: "template",
    id: "stmg_algo_seuil_bac_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_boucles",
    microId: "algo_boucle_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "On compte les tours de boucle : la variable de comptage donne le nombre d'années écoulées.",
    tags: ["stmg", "maths", "algorithmique", "suites", "seuil", "bac", "template", "short"],
    generate: () => {
      const cas = pick([
        { grandeur: "la proportion de déchets recyclés", unite: "%", depart: 64.9, annee: 2012, croissant: true },
        { grandeur: "le nombre d'abonnés", unite: "milliers", depart: 42, annee: 2018, croissant: true },
        { grandeur: "le chiffre d'affaires", unite: "M€", depart: 18.5, annee: 2020, croissant: true },
        { grandeur: "le nombre de papillons", unite: "milliers", depart: 50, annee: 2019, croissant: false },
        { grandeur: "le stock d'invendus", unite: "milliers d'articles", depart: 36, annee: 2021, croissant: false },
      ] as const);
      const t = cas.croissant
        ? pick([2, 2.5, 3, 3.64, 4, 5] as const)
        : pick([8, 10, 12, 14, 15, 20] as const);
      const q = cas.croissant ? 1 + t / 100 : 1 - t / 100;
      const cible = cas.croissant
        ? Math.round(cas.depart * pick([1.15, 1.25, 1.4] as const) * 10) / 10
        : Math.round(cas.depart * pick([0.2, 0.3, 0.4] as const) * 10) / 10;
      let v = cas.depart;
      let n = 0;
      while ((cas.croissant ? v < cible : v > cible) && n < 200) {
        v = v * q;
        n++;
      }
      const lignes = [
        `V ← ${fr(cas.depart)}`,
        `n ← 0`,
        `tant que V ${cas.croissant ? "<" : ">"} ${fr(cible)}`,
        `    V ← ${fr(q)} × V`,
        `    n ← n + 1`,
        `fin tant que`,
      ];
      return {
        text:
          `On modélise ${cas.grandeur} de l'année $${cas.annee} + n$ par une suite géométrique de raison $${fr(q)}$, ` +
          `de premier terme $V_0 = ${fr(cas.depart)}$ (en ${cas.unite}). ` +
          `On considère l'algorithme suivant. Que contient la variable $n$ à la fin de son exécution ?\n\n${pseudo(lignes)}`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Un algorithme de seuil répète un calcul TANT QUE la condition reste vraie, et compte les tours : la variable de comptage donne le nombre d'étapes nécessaires.",
          "On applique la raison à chaque tour et l'on s'arrête dès que la condition devient fausse.",
          `Partant de $${fr(cas.depart)}$ et en multipliant par $${fr(q)}$ à chaque tour, la valeur ` +
            `${cas.croissant ? "dépasse" : "passe sous"} $${fr(cible)}$ au bout de $${n}$ tours.`,
          `À la fin, $n$ contient $${n}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "stmg_algo_seuil_bac_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_boucles",
    microId: "algo_boucle_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "La ligne manquante doit faire évoluer la valeur : c'est la relation de récurrence de la suite.",
    tags: ["stmg", "maths", "algorithmique", "suites", "seuil", "bac", "template"],
    generate: () => {
      // ⭐ « Toujours lié aux suites arithmétiques, géométriques et au taux
      // d'évolution ; la seule chose qui change, ce sont les trous à remplir. »
      // (Frédéric, 15/08/2026, après avoir montré trois sujets de bac.)
      // D'où deux tirages ici : la NATURE de la suite, et la LIGNE effacée —
      // initialisation, condition d'arrêt, évolution ou comptage.
      const cas = pick([
        { grandeur: "un capital placé", depart: 150000, annee: 1682 },
        { grandeur: "un capital placé", depart: 2500, annee: 2015 },
        { grandeur: "le chiffre d'affaires d'une enseigne", depart: 1200, annee: 2019 },
        { grandeur: "le nombre d'adhérents", depart: 800, annee: 2021 },
        { grandeur: "la valeur d'un portefeuille", depart: 5000, annee: 2018 },
        { grandeur: "la proportion de déchets recyclés", depart: 65, annee: 2012 },
      ] as const);
      const geometrique = Math.random() < 0.5;
      const t = pick([2, 3, 4, 5, 6, 8, 10] as const);
      const q = 1 + t / 100;
      const r = pick([50, 100, 150, 200, 250] as const);
      const facteur = pick([2, 3, 5] as const);
      const cible = geometrique ? cas.depart * facteur : cas.depart + r * pick([6, 8, 10, 12] as const);
      const evolution = geometrique ? `C ← ${fr(q)} × C` : `C ← C + ${r}`;
      const trou = pick(["evolution", "condition", "init", "comptage"] as const);
      const points = "..........";
      const lignes = [
        `A ← ${trou === "init" ? points : cas.annee}`,
        `C ← ${cas.depart}`,
        `Tant que ${trou === "condition" ? points : `C < ${fr(cible)}`}`,
        `    A ← ${trou === "comptage" ? points : "A + 1"}`,
        `    ${trou === "evolution" ? `C ← ${points}` : evolution}`,
        `Fin Tant que`,
      ];
      const bonne =
        trou === "evolution"
          ? geometrique
            ? `${fr(q)} × C`
            : `C + ${r}`
          : trou === "condition"
            ? `C < ${fr(cible)}`
            : trou === "init"
              ? String(cas.annee)
              : "A + 1";
      const faux =
        trou === "evolution"
          ? geometrique
            ? [`C + ${t}`, `${t} × C`, `C + ${fr(q)}`, `C × ${facteur}`, `${fr(q)} × A`]
            : [`${r} × C`, `C + ${fr(1 + r / 100)}`, `C × ${r}`, `C + A`, `${r} + A`]
          : trou === "condition"
            ? [`C > ${fr(cible)}`, `A < ${fr(cible)}`, `C = ${fr(cible)}`, `C < ${cas.depart}`, `A < ${cas.annee}`]
            : trou === "init"
              ? [String(cas.depart), "0", String(cas.annee + 1), String(cas.annee - 1), String(facteur)]
              : ["A + C", `A + ${fr(q)}`, "A", "A - 1", `A × ${facteur}`];
      return {
        text:
          `On modélise ${cas.grandeur} à partir de ${cas.annee} par une suite ` +
          (geometrique
            ? `géométrique de raison $${fr(q)}$ (hausse de $${t}\\,\\%$ par an)`
            : `arithmétique de raison $${r}$ (hausse de $${r}$ par an)`) +
          `, de premier terme $${cas.depart}$. ` +
          `À la fin de l'exécution, la variable $A$ doit contenir l'année où le seuil $${fr(cible)}$ est atteint. ` +
          `Par quoi remplacer les pointillés ?\n\n${pseudo(lignes)}`,
        format: "qcm",
        choices: makeChoices(`\`${bonne}\``, faux.map((f) => `\`${f}\``)),
        expected: [`\`${bonne}\``],
        comparator: "mcq_exact",
        explanation: exp(
          "Un algorithme de seuil se lit en quatre morceaux : l'INITIALISATION des variables, la CONDITION d'arrêt, l'ÉVOLUTION de la grandeur — qui est la relation de récurrence de la suite —, et le COMPTAGE.",
          "On identifie le rôle de la ligne effacée avant de la compléter : c'est ce rôle qui décide de la réponse.",
          trou === "evolution"
            ? geometrique
              ? `La suite est géométrique de raison $${fr(q)}$ : on MULTIPLIE la valeur courante, d'où \`${bonne}\`.`
              : `La suite est arithmétique de raison $${r}$ : on AJOUTE la raison, d'où \`${bonne}\`.`
            : trou === "condition"
              ? `La boucle doit tourner tant que le seuil n'est pas atteint : \`${bonne}\`.`
              : trou === "init"
                ? `La variable A compte les années à partir de ${cas.annee} : elle démarre donc à \`${bonne}\`.`
                : `A doit avancer d'une année par tour : \`${bonne}\`.`,
          `Il faut écrire \`${bonne}\`.`
        ),
        choiceDiagnostics:
          trou === "evolution" && geometrique
            ? [
                {
                  choice: `\`C + ${t}\``,
                  cause: "a traduit le pourcentage par une addition : ce serait une suite arithmétique",
                },
                { choice: `\`${t} × C\``, cause: "a multiplié par le taux au lieu du coefficient multiplicateur" },
              ]
            : [],
      };
    },
  },

  {
    kind: "template",
    id: "stmg_algo_seuil_bac_tpl_3",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_boucles",
    microId: "algo_boucle_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre de tours compte des ANNÉES écoulées depuis l'année de départ : il faut les additionner.",
    tags: ["stmg", "maths", "algorithmique", "suites", "seuil", "bac", "open", "template"],
    generate: () => {
      const cas = pick([
        { grandeur: "la proportion de déchets recyclés", annee: 2012, seuil: "75 %" },
        { grandeur: "le nombre de papillons monarques", annee: 2019, seuil: "10 milliers" },
        { grandeur: "le chiffre d'affaires", annee: 2020, seuil: "25 M€" },
        { grandeur: "le nombre d'abonnés", annee: 2018, seuil: "60 milliers" },
      ] as const);
      const n = randomInt(5, 22);
      return {
        text:
          `Un algorithme de seuil portant sur ${cas.grandeur} de l'année $${cas.annee} + n$ ` +
          `se termine avec $n = ${n}$, le seuil étant $${cas.seuil}$. ` +
          `Interprète ce résultat dans le contexte de l'exercice.`,
        format: "open",
        expected: [String(cas.annee + n), "annee", "année", "a partir", "à partir", cas.seuil.split(" ")[0]],
        comparator: "contains_keyword",
        explanation: exp(
          "Un algorithme de seuil rend un NOMBRE D'ÉTAPES, pas une date : il faut l'ajouter à l'année de départ pour répondre à la question posée.",
          "On traduit la variable de comptage en années, puis on nomme l'année atteinte et le seuil franchi.",
          `$n = ${n}$ signifie $${n}$ années après ${cas.annee}, soit ${cas.annee + n}. ` +
            `Répondre « ${n} » sans le replacer dans le contexte, c'est laisser le travail à moitié fait.`,
          `Par exemple : « C'est à partir de ${cas.annee + n} que ${cas.grandeur} franchit ${cas.seuil}. »`
        ),
      };
    },
  },

  /* ═══════════════════ algo_derouler ═══════════════════ */

  {
    kind: "template",
    id: "stmg_algo_derouler_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_boucles",
    microId: "algo_derouler",
    difficulty: 3,
    theme: "neutral",
    hint: "Le tableau de déroulement s'arrête juste avant la fin : continue-le d'un tour.",
    tags: ["stmg", "maths", "algorithmique", "python", "canvas", "template", "short"],
    generate: () => {
      const u0 = pick([2, 3, 5, 10] as const);
      const mult = pick([2, 3] as const);
      const add = randomInt(1, 8);
      const n = 5;
      const suite: number[] = [u0];
      for (let k = 1; k <= n; k++) suite.push(suite[k - 1] * mult + add);
      const lignes = [
        `u = ${u0}`,
        `for i in range(${n}):`,
        `    u = ${mult} * u + ${add}`,
        `print(u)`,
      ];
      return {
        text:
          `Le tableau donne les premières valeurs de \`u\`. Qu'affiche finalement ce programme ?\n\n${code(lignes)}`,
        format: "short",
        expected: [String(suite[n])],
        comparator: "number_equal",
        canvas: canvasTrace(
          ["u"],
          [suite.slice(0, n)],
          "Déroulement partiel — valeur de u après chaque tour"
        ),
        explanation: exp(
          "Dérouler un algorithme, c'est noter la valeur de chaque variable après chaque instruction : c'est la méthode sûre pour prévoir une sortie.",
          "On complète le tableau jusqu'au dernier tour, puis on lit la valeur finale.",
          `Après le dernier tour : $u = ${mult} \\times ${suite[n - 1]} + ${add} = ${suite[n]}$.`,
          `Le programme affiche ${suite[n]}.`
        ),
      };
    },
  },

  /* ═══════════════════ algo_liste_generer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_algo_liste_generer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_listes",
    microId: "algo_liste_generer",
    difficulty: 2,
    theme: "neutral",
    hint: "Une liste en compréhension applique une expression à chaque élément parcouru.",
    tags: ["stmg", "maths", "algorithmique", "python", "template"],
    generate: () => {
      const n = randomInt(4, 6);
      const k = pick([2, 3, 5, 10] as const);
      const op = pick(["mult", "carre", "add"] as const);
      const ligne =
        op === "mult"
          ? `L = [${k} * i for i in range(${n})]`
          : op === "carre"
            ? `L = [i * i for i in range(${n})]`
            : `L = [i + ${k} for i in range(${n})]`;
      const resultat = Array.from({ length: n }, (_, i) =>
        op === "mult" ? k * i : op === "carre" ? i * i : i + k
      );
      return {
        text: `Que contient la liste \`L\` après cette instruction ?\n\n${code([ligne, `print(L)`])}`,
        format: "qcm",
        choices: makeChoices(`[${resultat.join(", ")}]`, [
          `[${Array.from({ length: n }, (_, i) => (op === "mult" ? k * (i + 1) : op === "carre" ? (i + 1) * (i + 1) : i + 1 + k)).join(", ")}]`,
          `[${Array.from({ length: n }, (_, i) => i).join(", ")}]`,
          `[${resultat.slice(1).join(", ")}]`,
          `[${resultat.map((v) => v + 1).join(", ")}]`,
          `[${n}]`,
        ]),
        expected: [`[${resultat.join(", ")}]`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une liste en compréhension `[expression for i in range(n)]` construit la liste des valeurs de l'expression pour $i$ allant de $0$ à $n-1$.",
          "On énumère les valeurs de $i$, puis on applique l'expression à chacune.",
          `$i$ prend les valeurs $${Array.from({ length: n }, (_, i) => i).join(", ")}$, ce qui donne $${resultat.join(", ")}$.`,
          `La liste contient [${resultat.join(", ")}].`
        ),
        choiceDiagnostics: [
          {
            choice: `[${Array.from({ length: n }, (_, i) => (op === "mult" ? k * (i + 1) : op === "carre" ? (i + 1) * (i + 1) : i + 1 + k)).join(", ")}]`,
            cause: "a fait commencer range à 1 : il commence à 0",
          },
        ],
      };
    },
  },

  /* ═══════════════════ algo_liste_indices ═══════════════════ */

  {
    kind: "template",
    id: "stmg_algo_liste_indices_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_listes",
    microId: "algo_liste_indices",
    difficulty: 2,
    theme: "neutral",
    hint: "Le premier élément porte l'indice $0$, pas $1$.",
    tags: ["stmg", "maths", "algorithmique", "python", "template", "short"],
    generate: () => {
      const donnees = Array.from({ length: 6 }, () => randomInt(10, 90));
      const i = randomInt(0, 5);
      return {
        text: `Qu'affiche ce programme ?\n\n${code([`L = [${donnees.join(", ")}]`, `print(L[${i}])`])}`,
        format: "short",
        expected: [String(donnees[i])],
        comparator: "number_equal",
        explanation: exp(
          "En Python, les indices d'une liste commencent à $0$ : `L[0]` est le premier élément, `L[1]` le deuxième, etc.",
          "On compte les positions en partant de zéro.",
          `L'indice ${i} désigne le ${i + 1}ᵉ élément de la liste, soit ${donnees[i]}.`,
          `Le programme affiche ${donnees[i]}.`
        ),
      };
    },
  },

  /* ═══════════════════ algo_liste_parcourir ═══════════════════ */

  {
    kind: "template",
    id: "stmg_algo_liste_parcourir_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_listes",
    microId: "algo_liste_parcourir",
    difficulty: 3,
    theme: "neutral",
    hint: "Ce programme cherche un maximum : il garde la plus grande valeur rencontrée jusque-là.",
    tags: ["stmg", "maths", "algorithmique", "python", "canvas", "template", "short"],
    generate: () => {
      const donnees = shuffle(Array.from({ length: 6 }, () => randomInt(10, 95)));
      const maxi = Math.max(...donnees);
      const lignes = [
        `L = [${donnees.join(", ")}]`,
        `m = L[0]`,
        `for v in L:`,
        `    if v > m:`,
        `        m = v`,
        `print(m)`,
      ];
      const courants: number[] = [];
      donnees.reduce((acc, v) => {
        const n = Math.max(acc, v);
        courants.push(n);
        return n;
      }, donnees[0]);
      return {
        text: `Qu'affiche ce programme ?\n\n${code(lignes)}`,
        format: "short",
        expected: [String(maxi)],
        comparator: "number_equal",
        canvas: canvasTrace(["v", "m"], [donnees, courants], "Déroulement — maximum courant"),
        explanation: exp(
          "Itérer sur une liste, c'est examiner chaque élément à tour de rôle. Ici la variable `m` retient le plus grand élément rencontré depuis le début.",
          "On suit le tableau : `m` ne change que lorsqu'une valeur plus grande apparaît.",
          `Le plus grand élément de la liste est ${maxi}.`,
          `Le programme affiche ${maxi}.`
        ),
      };
    },
  },

  /* ═══════════════════ algo_liste_modifier ═══════════════════ */

  {
    kind: "template",
    id: "stmg_algo_liste_modifier_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_listes",
    microId: "algo_liste_modifier",
    difficulty: 2,
    theme: "neutral",
    hint: "`append` ajoute EN FIN de liste ; la longueur augmente de $1$ à chaque appel.",
    tags: ["stmg", "maths", "algorithmique", "python", "template"],
    generate: () => {
      const depart = Array.from({ length: 3 }, () => randomInt(10, 50));
      const ajouts = Array.from({ length: 2 }, () => randomInt(10, 50));
      const lignes = [
        `L = [${depart.join(", ")}]`,
        `L.append(${ajouts[0]})`,
        `L.append(${ajouts[1]})`,
        `print(L)`,
      ];
      const resultat = [...depart, ...ajouts];
      return {
        text: `Que contient la liste \`L\` à la fin ?\n\n${code(lignes)}`,
        format: "qcm",
        choices: makeChoices(`[${resultat.join(", ")}]`, [
          `[${[...ajouts, ...depart].join(", ")}]`,
          `[${depart.join(", ")}]`,
          `[${ajouts.join(", ")}]`,
          `[${[...depart, ajouts[1], ajouts[0]].join(", ")}]`,
          `[${resultat.length}]`,
        ]),
        expected: [`[${resultat.join(", ")}]`],
        comparator: "mcq_exact",
        explanation: exp(
          "La méthode `append` ajoute un élément À LA FIN de la liste, dans l'ordre des appels.",
          "On suit les instructions une à une, en plaçant chaque nouvel élément après les précédents.",
          `Départ : [${depart.join(", ")}] ; après le premier append : [${[...depart, ajouts[0]].join(", ")}] ; ` +
            `après le second : [${resultat.join(", ")}].`,
          `La liste contient [${resultat.join(", ")}].`
        ),
      };
    },
  },

  /* ═══════════════ algo_fct_entrees_sorties ═══════════════ */

  {
    kind: "template",
    id: "stmg_algo_fct_es_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_fonctions",
    microId: "algo_fct_entrees_sorties",
    difficulty: 2,
    theme: "neutral",
    hint: "Les entrées sont entre parenthèses après le nom ; la sortie suit le mot `return`.",
    tags: ["stmg", "maths", "algorithmique", "python", "template"],
    generate: () => {
      const t = pick([2, 5, 5.5, 8, 10, 15, 20, 25, 30] as const);
      const base = pick([80, 120, 150, 200, 250, 300, 400, 500] as const);
      const lignes = [
        `def prix_ttc(prix_ht, taux):`,
        `    return prix_ht * (1 + taux / 100)`,
        ``,
        `print(prix_ttc(${base}, ${fr(t).replace(",", ".")}))`,
      ];
      return {
        text: `Quelles sont les ENTRÉES de la fonction \`prix_ttc\` ?\n\n${code(lignes)}`,
        format: "qcm",
        choices: shuffle([
          "`prix_ht` et `taux`",
          "`prix_ht` seulement",
          "le résultat du calcul",
          "`print` et `return`",
        ]),
        expected: ["`prix_ht` et `taux`"],
        comparator: "mcq_exact",
        explanation: exp(
          "Les ENTRÉES d'une fonction sont les paramètres écrits entre parenthèses dans sa définition ; sa SORTIE est la valeur renvoyée par `return`.",
          "On lit la ligne `def` : tout ce qui est entre parenthèses est une entrée.",
          `Ici \`def prix_ttc(prix_ht, taux)\` : deux entrées. La sortie est le prix TTC calculé.`,
          "Les entrées sont `prix_ht` et `taux`."
        ),
      };
    },
  },

  /* ═══════════════════ algo_fct_definir ═══════════════════ */

  {
    kind: "template",
    id: "stmg_algo_fct_definir_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_fonctions",
    microId: "algo_fct_definir",
    difficulty: 2,
    theme: "neutral",
    hint: "Sans `return`, la fonction ne renvoie rien — même si elle a calculé.",
    tags: ["stmg", "maths", "algorithmique", "python", "piege", "template"],
    generate: () => {
      const t = pick([2, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50] as const);
      const correcte = Math.random() < 0.5;
      const lignes = correcte
        ? [`def remise(prix):`, `    nouveau = prix * ${fr(1 - t / 100).replace(",", ".")}`, `    return nouveau`]
        : [`def remise(prix):`, `    nouveau = prix * ${fr(1 - t / 100).replace(",", ".")}`];
      return {
        text:
          `Cette fonction doit appliquer une remise de $${t}\\,\\%$ et RENVOYER le nouveau prix. ` +
          `Est-elle correcte ?\n\n${code(lignes)}`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [correcte ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fonction ne transmet une valeur au reste du programme que par l'instruction `return`. Sans elle, le calcul est fait puis perdu.",
          "On vérifie que la définition se termine bien par un `return` portant la valeur voulue.",
          correcte
            ? "La fonction calcule le nouveau prix puis le renvoie : elle est correcte."
            : "La fonction calcule le nouveau prix mais ne le renvoie pas : l'appel ne rendrait rien.",
          `La fonction ${correcte ? "est correcte" : "est incorrecte : il manque le `return`"}.`
        ),
      };
    },
  },

  /* ═══════════════════ algo_fct_appeler ═══════════════════ */

  {
    kind: "template",
    id: "stmg_algo_fct_appeler_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_fonctions",
    microId: "algo_fct_appeler",
    difficulty: 2,
    theme: "neutral",
    hint: "Les arguments prennent la place des paramètres, DANS L'ORDRE.",
    tags: ["stmg", "maths", "algorithmique", "python", "template", "short"],
    generate: () => {
      const prix = pick([80, 120, 150, 200, 250, 400] as const);
      const t = pick([5, 10, 20, 25] as const);
      const lignes = [
        `def prix_ttc(prix_ht, taux):`,
        `    return prix_ht * (1 + taux / 100)`,
        ``,
        `print(prix_ttc(${prix}, ${t}))`,
      ];
      const resultat = Math.round(prix * (1 + t / 100) * 100) / 100;
      return {
        text: `Qu'affiche ce programme ?\n\n${code(lignes)}`,
        format: "short",
        expected: [fr(resultat)],
        comparator: "number_equal",
        explanation: exp(
          "Appeler une fonction, c'est remplacer chaque paramètre par l'argument correspondant, dans l'ordre où ils sont écrits.",
          "On substitue, puis on effectue le calcul du `return`.",
          `\`prix_ht\` vaut ${prix} et \`taux\` vaut ${t}, donc le résultat est $${prix} \\times (1 + ${fr(t / 100)}) = ${fr(resultat)}$.`,
          `Le programme affiche ${fr(resultat)}.`
        ),
      };
    },
  },

  /* ═══════════════════ algo_fct_structurer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_algo_fct_structurer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_fonctions",
    microId: "algo_fct_structurer",
    difficulty: 3,
    theme: "neutral",
    hint: "Une fonction sert à réutiliser un calcul sans le réécrire.",
    tags: ["stmg", "maths", "algorithmique", "python", "template"],
    generate: () => {
      const t = pick([5, 10, 20] as const);
      const prix = Array.from({ length: 3 }, () => randomInt(50, 300));
      const lignes = [
        `def prix_ttc(ht):`,
        `    return ht * ${fr(1 + t / 100).replace(",", ".")}`,
        ``,
        `panier = [${prix.join(", ")}]`,
        `total = 0`,
        `for p in panier:`,
        `    total = total + prix_ttc(p)`,
        `print(round(total, 2))`,
      ];
      const total = Math.round(prix.reduce((s, p) => s + p * (1 + t / 100), 0) * 100) / 100;
      return {
        text: `Quel est l'intérêt d'avoir défini la fonction \`prix_ttc\` dans ce programme ?\n\n${code(lignes)}`,
        format: "qcm",
        choices: shuffle([
          "le calcul du prix TTC n'est écrit qu'une fois et sert pour chaque article",
          "le programme s'exécute plus vite",
          "la fonction affiche le résultat à l'écran",
          "elle est obligatoire pour utiliser une boucle",
        ]),
        expected: ["le calcul du prix TTC n'est écrit qu'une fois et sert pour chaque article"],
        comparator: "mcq_exact",
        explanation: exp(
          "Structurer un programme en fonctions permet d'écrire un calcul UNE FOIS et de le réutiliser autant de fois que nécessaire : le programme devient plus court, plus lisible et plus facile à corriger.",
          "On repère ce qui se répéterait sans la fonction : ici, le coefficient TTC à chaque article.",
          `Sans la fonction, il faudrait réécrire \`* ${fr(1 + t / 100).replace(",", ".")}\` à chaque usage ; ` +
            `si le taux change, une seule ligne est à modifier. (Le programme affiche ici ${fr(total)}.)`,
          "La fonction évite de réécrire le même calcul."
        ),
      };
    },
  },

  /* ═══════════════════ tab_lire ═══════════════════ */

  {
    kind: "template",
    id: "stmg_tab_lire_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "tableur_formules",
    microId: "tab_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "La colonne se lit en lettre, la ligne en chiffre : B3 est la colonne B, ligne 3.",
    tags: ["stmg", "maths", "tableur", "canvas", "template", "short"],
    generate: () => {
      const mois = ["Janvier", "Février", "Mars", "Avril", "Mai"];
      const valeurs = mois.map(() => randomInt(20, 90) * 10);
      const ligne = randomInt(2, 6);
      return {
        text: `Quelle valeur contient la cellule B${ligne} de cette feuille de calcul ?`,
        format: "short",
        expected: [String(valeurs[ligne - 2])],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: "Feuille de calcul — chiffre d'affaires mensuel (€)",
          headers: ["", "A", "B"],
          rows: [
            { label: "1", values: ["Mois", "CA (€)"] },
            ...mois.map((m, k) => ({ label: String(k + 2), values: [m, String(valeurs[k])] })),
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Une cellule de tableur se repère par sa colonne (une lettre) et sa ligne (un nombre).",
          "On croise la colonne B et la ligne demandée.",
          `La cellule B${ligne} se trouve à l'intersection de la colonne B et de la ligne ${ligne} : elle contient ${valeurs[ligne - 2]}.`,
          `B${ligne} contient ${valeurs[ligne - 2]}.`
        ),
      };
    },
  },

  /* ═══════════════ tab_comprendre_formule ═══════════════ */

  {
    kind: "template",
    id: "stmg_tab_comprendre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "tableur_formules",
    microId: "tab_comprendre_formule",
    difficulty: 2,
    theme: "neutral",
    hint: "Une formule de tableur commence par `=` et se lit comme un calcul sur des cellules.",
    tags: ["stmg", "maths", "tableur", "canvas", "template", "short"],
    generate: () => {
      const valeurs = [randomInt(100, 400), randomInt(100, 400), randomInt(100, 400)];
      const op = pick(["somme", "coef", "diff"] as const);
      const t = pick([5, 10, 20] as const);
      const formule =
        op === "somme" ? "=B2+B3+B4" : op === "coef" ? `=B2*${fr(1 + t / 100).replace(",", ".")}` : "=B4-B2";
      const resultat =
        op === "somme"
          ? valeurs[0] + valeurs[1] + valeurs[2]
          : op === "coef"
            ? Math.round(valeurs[0] * (1 + t / 100) * 100) / 100
            : valeurs[2] - valeurs[0];
      return {
        text: `Que renvoie la formule \`${formule}\` saisie dans cette feuille de calcul ?`,
        format: "short",
        expected: [fr(resultat)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: "Feuille de calcul",
          headers: ["", "A", "B"],
          rows: [
            { label: "1", values: ["Trimestre", "Montant (€)"] },
            { label: "2", values: ["T1", String(valeurs[0])] },
            { label: "3", values: ["T2", String(valeurs[1])] },
            { label: "4", values: ["T3", String(valeurs[2])] },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Une formule de tableur commence par `=` : les références de cellules y sont remplacées par leur contenu, puis le calcul est effectué.",
          "On remplace chaque référence par sa valeur, puis on calcule.",
          op === "somme"
            ? `$${valeurs[0]} + ${valeurs[1]} + ${valeurs[2]} = ${resultat}$.`
            : op === "coef"
              ? `$${valeurs[0]} \\times ${fr(1 + t / 100)} = ${fr(resultat)}$.`
              : `$${valeurs[2]} - ${valeurs[0]} = ${resultat}$.`,
          `La formule renvoie ${fr(resultat)}.`
        ),
      };
    },
  },

  /* ═══════════════ tab_ecrire_formule ═══════════════ */

  {
    kind: "template",
    id: "stmg_tab_ecrire_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "tableur_formules",
    microId: "tab_ecrire_formule",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour être recopiable vers le bas, la formule doit référencer la ligne juste au-dessus.",
    tags: ["stmg", "maths", "tableur", "template"],
    generate: () => {
      const t = pick([2, 2.5, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25] as const);
      const q = fr(1 + t / 100).replace(",", ".");
      const geometrique = Math.random() < 0.5;
      const r = pick([20, 40, 50, 75, 100, 120, 150, 200, 250, 300] as const);
      // ⛔⛔ ENTRE ACCENTS GRAVES, TOUJOURS. Nue, la référence `=$B$2+250`
      // passe dans KaTeX, qui prend les deux dollars pour des délimiteurs et
      // les avale : le distracteur s'affichait `=B2+250`, identique à la bonne
      // réponse. Voir le même correctif dans `suites-premiere.bank.ts`, et
      // `scripts/verifier-latex.ts` qui l'a trouvé.
      const bonne = geometrique ? `\`=B2*${q}\`` : `\`=B2+${r}\``;
      return {
        text:
          `La cellule B2 contient la valeur initiale. Chaque année, la grandeur ` +
          `${geometrique ? `augmente de $${t}\\,\\%$` : `augmente de $${r}$ unités`}. ` +
          `Quelle formule saisir en B3 pour pouvoir la recopier vers le bas ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          geometrique ? `\`=B3*${q}\`` : `\`=B3+${r}\``,
          geometrique ? `\`=$B$2*${q}\`` : `\`=$B$2+${r}\``,
          geometrique ? `\`=B2+${q}\`` : `\`=B2*${r}\``,
          geometrique ? `\`=B2*${t}\`` : `\`=B2+${r}*A3\``,
          geometrique ? `\`B2*${q}\`` : `\`B2+${r}\``,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une formule recopiable vers le bas doit référencer la cellule immédiatement au-dessus, en adressage RELATIF : la recopie décalera automatiquement la référence.",
          "On écrit la formule en pensant à ce qu'elle deviendra une ligne plus bas.",
          `${bonne} recopiée en B4 devient \`${geometrique ? `=B3*${q}` : `=B3+${r}`}\` : c'est exactement ce qu'on veut.`,
          `Il faut saisir ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: geometrique ? `\`=B3*${q}\`` : `\`=B3+${r}\``,
            cause: "a pointé sa propre cellule : c'est une référence circulaire",
          },
          {
            choice: geometrique ? `\`B2*${q}\`` : `\`B2+${r}\``,
            cause: "a oublié le signe = : le tableur afficherait le texte au lieu de calculer",
          },
        ],
      };
    },
  },

  /* ═══════════════════ tab_adressage ═══════════════════ */

  {
    kind: "template",
    id: "stmg_tab_adressage_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "tableur_recopie",
    microId: "tab_adressage",
    difficulty: 3,
    theme: "neutral",
    hint: "Les $ figent la référence : elle ne bouge pas à la recopie.",
    tags: ["stmg", "maths", "tableur", "template"],
    generate: () => {
      const ligne = randomInt(2, 5);
      const decalage = randomInt(1, 3);
      const type = pick(["relatif", "absolu", "mixte"] as const);
      const formule =
        type === "relatif" ? `=B${ligne}*C${ligne}` : type === "absolu" ? `=B${ligne}*$C$1` : `=B${ligne}*C$1`;
      const resultat =
        type === "relatif"
          ? `=B${ligne + decalage}*C${ligne + decalage}`
          : type === "absolu"
            ? `=B${ligne + decalage}*$C$1`
            : `=B${ligne + decalage}*C$1`;
      return {
        text:
          `La formule \`${formule}\` est saisie en D${ligne}, puis recopiée vers le bas jusqu'en D${ligne + decalage}. ` +
          `Que contient alors D${ligne + decalage} ?`,
        format: "qcm",
        choices: makeChoices(`\`${resultat}\``, [
          `\`=B${ligne}*C${ligne}\``,
          `\`=B${ligne + decalage}*C${ligne}\``,
          `\`=B${ligne}*C${ligne + decalage}\``,
          `\`=B${ligne + decalage + 1}*C${ligne + decalage + 1}\``,
        ]),
        expected: [`\`${resultat}\``],
        comparator: "mcq_exact",
        explanation: exp(
          "Une référence RELATIVE (B2) se décale à la recopie ; une référence ABSOLUE (`$B$2`) reste figée ; une référence MIXTE ne fige que la partie précédée du `$`.",
          "On regarde chaque référence séparément et l'on applique le décalage aux seules parties non figées.",
          type === "relatif"
            ? `Les deux références sont relatives : elles descendent de ${decalage} ligne(s).`
            : type === "absolu"
              ? `\`$C$1\` est entièrement figée : seule \`B${ligne}\` descend.`
              : `\`C$1\` a sa LIGNE figée : elle reste en ligne 1, tandis que \`B${ligne}\` descend.`,
          `La cellule contient \`${resultat}\`.`
        ),
      };
    },
  },

  /* ═══════════════ tab_exploiter_colonne ═══════════════ */

  {
    kind: "template",
    id: "stmg_tab_exploiter_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "tableur_recopie",
    microId: "tab_exploiter_colonne",
    difficulty: 2,
    theme: "neutral",
    hint: "On parcourt la colonne et l'on repère la PREMIÈRE ligne qui franchit le seuil.",
    tags: ["stmg", "maths", "tableur", "canvas", "template", "short"],
    generate: () => {
      const depart = pick([1000, 1500, 2000] as const);
      const t = pick([10, 20, 25] as const);
      const q = 1 + t / 100;
      const valeurs: number[] = [depart];
      for (let k = 1; k < 8; k++) valeurs.push(Math.round(valeurs[k - 1] * q));
      const rang = randomInt(2, 6);
      const seuil = Math.round((valeurs[rang - 1] + valeurs[rang]) / 2);
      return {
        text:
          `La colonne B donne la valeur d'un capital année après année (année 0 en ligne 2). ` +
          `À partir de quelle ANNÉE le capital dépasse-t-il $${seuil}$ € ?`,
        format: "short",
        expected: [String(rang)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: "Feuille de calcul — capital année après année",
          headers: ["", "A (année)", "B (capital)"],
          rows: valeurs.map((v, k) => ({ label: String(k + 2), values: [String(k), String(v)] })),
        } satisfies CanvasFigure,
        explanation: exp(
          "Exploiter une colonne de valeurs, c'est la parcourir pour répondre à une question de seuil ou de dépassement.",
          "On descend la colonne et l'on s'arrête à la première valeur strictement supérieure au seuil.",
          `Année ${rang - 1} : $${valeurs[rang - 1]}$ € (sous le seuil) ; année ${rang} : $${valeurs[rang]}$ € (au-dessus).`,
          `Le capital dépasse $${seuil}$ € à partir de l'année ${rang}.`
        ),
      };
    },
  },

  /* ═══════════ tab_choisir_representation ═══════════ */

  {
    kind: "template",
    id: "stmg_tab_choisir_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "tableur_recopie",
    microId: "tab_choisir_representation",
    difficulty: 2,
    theme: "neutral",
    hint: "Une répartition en parts d'un tout appelle un diagramme circulaire ; une évolution dans le temps, une courbe.",
    tags: ["stmg", "maths", "tableur", "canvas", "template"],
    generate: () => {
      const cas = pick(["repartition", "evolution", "comparaison"] as const);
      const labels =
        cas === "repartition"
          ? ["Frais", "Épicerie", "Boissons", "Entretien"]
          : cas === "evolution"
            ? ["2021", "2022", "2023", "2024"]
            : ["Magasin A", "Magasin B", "Magasin C", "Magasin D"];
      const valeurs = labels.map(() => randomInt(10, 60) * 5);
      const bonne =
        cas === "repartition"
          ? "un diagramme circulaire : il montre des parts d'un tout"
          : cas === "evolution"
            ? "une courbe : elle montre une évolution dans le temps"
            : "un diagramme en barres : il compare des catégories entre elles";
      const question =
        cas === "repartition"
          ? "la répartition du chiffre d'affaires entre les rayons d'un magasin"
          : cas === "evolution"
            ? "l'évolution du chiffre d'affaires année après année"
            : "la comparaison du chiffre d'affaires de quatre magasins";
      return {
        text: `On veut représenter ${question}. Quelle représentation est la plus adaptée ?`,
        format: "qcm",
        choices: shuffle([
          "un diagramme circulaire : il montre des parts d'un tout",
          "une courbe : elle montre une évolution dans le temps",
          "un diagramme en barres : il compare des catégories entre elles",
          "un tableau de nombres : c'est toujours le plus clair",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: {
          kind: "stat_graph",
          graphType: cas === "repartition" ? "camembert" : "barres",
          title: `Les données à représenter`,
          data: labels.map((label, k) => ({ label, value: valeurs[k] })),
          display: { showValues: true, showLabels: true },
        } satisfies CanvasFigure,
        explanation: exp(
          "Le choix d'une représentation dépend de la question posée : parts d'un tout, évolution dans le temps, ou comparaison entre catégories.",
          "On identifie la nature de la donnée avant de choisir le graphique.",
          cas === "repartition"
            ? "Les rayons forment un tout dont on veut voir les parts : le diagramme circulaire s'impose."
            : cas === "evolution"
              ? "Les années se suivent : une courbe rend la progression lisible d'un coup d'œil."
              : "Les magasins sont indépendants : des barres se comparent bien en hauteur.",
          `Le plus adapté est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: "un tableau de nombres : c'est toujours le plus clair",
            cause: "un tableau donne les valeurs exactes mais ne fait pas voir la forme des données",
          },
        ],
      };
    },
  },

  /* ═══════════════════ logique_et ═══════════════════ */

  {
    kind: "template",
    id: "stmg_logique_et_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "logique_connecteurs",
    microId: "logique_et",
    difficulty: 2,
    theme: "neutral",
    hint: "Avec ET, il faut que les DEUX conditions soient vraies.",
    tags: ["stmg", "maths", "logique", "python", "template", "short"],
    generate: () => {
      const donnees = Array.from({ length: 8 }, () => ({ ca: randomInt(10, 90) * 10, anc: randomInt(1, 15) }));
      const seuilCa = randomInt(30, 60) * 10;
      const seuilAnc = randomInt(4, 10);
      const compte = donnees.filter((d) => d.ca > seuilCa && d.anc > seuilAnc).length;
      const lignes = [
        `clients = [${donnees.map((d) => `(${d.ca}, ${d.anc})`).join(", ")}]`,
        `c = 0`,
        `for ca, anc in clients:`,
        `    if ca > ${seuilCa} and anc > ${seuilAnc}:`,
        `        c = c + 1`,
        `print(c)`,
      ];
      return {
        text:
          `Chaque client est décrit par son chiffre d'affaires et son ancienneté. Qu'affiche ce programme ?\n\n${code(lignes)}`,
        format: "short",
        expected: [String(compte)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: "Les clients parcourus",
          headers: ["Client", ...donnees.map((_, k) => String(k + 1))],
          rows: [
            { label: "CA (€)", values: donnees.map((d) => String(d.ca)) },
            { label: "Ancienneté (ans)", values: donnees.map((d) => String(d.anc)) },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Le connecteur ET (`and`) n'est vrai que si les DEUX conditions sont vraies en même temps.",
          "On teste chaque client sur les deux critères et l'on ne compte que ceux qui satisfont les deux.",
          `Clients avec CA > ${seuilCa} ET ancienneté > ${seuilAnc} : ${compte}.`,
          `Le programme affiche ${compte}.`
        ),
      };
    },
  },

  /* ═══════════════════ logique_ou ═══════════════════ */

  {
    kind: "template",
    id: "stmg_logique_ou_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "logique_connecteurs",
    microId: "logique_ou",
    difficulty: 2,
    theme: "neutral",
    hint: "Avec OU, il suffit qu'UNE des deux conditions soit vraie — et les deux à la fois conviennent aussi.",
    tags: ["stmg", "maths", "logique", "python", "canvas", "template", "short"],
    generate: () => {
      const donnees = Array.from({ length: 8 }, () => ({ ca: randomInt(10, 90) * 10, anc: randomInt(1, 15) }));
      const seuilCa = randomInt(30, 60) * 10;
      const seuilAnc = randomInt(4, 10);
      const compte = donnees.filter((d) => d.ca > seuilCa || d.anc > seuilAnc).length;
      const lignes = [
        `clients = [${donnees.map((d) => `(${d.ca}, ${d.anc})`).join(", ")}]`,
        `c = 0`,
        `for ca, anc in clients:`,
        `    if ca > ${seuilCa} or anc > ${seuilAnc}:`,
        `        c = c + 1`,
        `print(c)`,
      ];
      return {
        text: `Qu'affiche ce programme ?\n\n${code(lignes)}`,
        format: "short",
        expected: [String(compte)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: "Les clients parcourus",
          headers: ["Client", ...donnees.map((_, k) => String(k + 1))],
          rows: [
            { label: "CA (€)", values: donnees.map((d) => String(d.ca)) },
            { label: "Ancienneté (ans)", values: donnees.map((d) => String(d.anc)) },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Le connecteur OU (`or`) est vrai dès qu'AU MOINS UNE des deux conditions est vraie. En mathématiques, il n'est pas exclusif : les deux à la fois conviennent.",
          "On retient chaque client qui satisfait l'un des critères, sans compter deux fois ceux qui satisfont les deux.",
          `Clients retenus : ${compte} sur ${donnees.length}.`,
          `Le programme affiche ${compte}.`
        ),
      };
    },
  },

  /* ═══════════════════ logique_non ═══════════════════ */

  {
    kind: "template",
    id: "stmg_logique_non_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "logique_connecteurs",
    microId: "logique_non",
    difficulty: 3,
    theme: "neutral",
    hint: "La négation de « $x > a$ » est « $x \\leqslant a$ », pas « $x < a$ ».",
    tags: ["stmg", "maths", "logique", "piege", "template"],
    generate: () => {
      const seuil = randomInt(10, 90) * 10;
      const sens = pick([">", "<", "\\geqslant", "\\leqslant"] as const);
      const negation =
        sens === ">" ? "\\leqslant" : sens === "<" ? "\\geqslant" : sens === "\\geqslant" ? "<" : ">";
      const lire = (s: string) =>
        s === ">" ? ">" : s === "<" ? "<" : s === "\\geqslant" ? "\\geqslant" : "\\leqslant";
      return {
        text: `Quelle est la négation de la proposition « le montant est $${lire(sens)} ${seuil}$ » ?`,
        format: "qcm",
        choices: makeChoices(`le montant est $${lire(negation)} ${seuil}$`, [
          `le montant est $${lire(sens === ">" ? "<" : sens === "<" ? ">" : sens === "\\geqslant" ? "\\leqslant" : "\\geqslant")} ${seuil}$`,
          `le montant est $= ${seuil}$`,
          `le montant est $${lire(sens)} ${seuil + 1}$`,
          `le montant n'est pas un nombre`,
        ]),
        expected: [`le montant est $${lire(negation)} ${seuil}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "La négation d'une proposition est vraie exactement quand la proposition est fausse : les deux doivent couvrir TOUS les cas, sans en oublier ni en partager.",
          "Sur une inégalité, il faut penser au cas d'ÉGALITÉ : il appartient à l'une des deux propositions, jamais aux deux.",
          `Si le montant n'est pas $${lire(sens)} ${seuil}$, alors il est $${lire(negation)} ${seuil}$ — le cas $= ${seuil}$ compris.`,
          `La négation est « le montant est $${lire(negation)} ${seuil}$ ».`
        ),
        choiceDiagnostics: [
          {
            choice: `le montant est $${lire(sens === ">" ? "<" : sens === "<" ? ">" : sens === "\\geqslant" ? "\\leqslant" : "\\geqslant")} ${seuil}$`,
            cause: "a oublié le cas d'égalité : les deux propositions laisseraient un trou",
          },
        ],
      };
    },
  },

  /* ═══════════════════ logique_ou_courant ═══════════════════ */

  {
    kind: "fixed",
    id: "stmg_logique_ou_courant_fix_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "logique_connecteurs",
    microId: "logique_ou_courant",
    difficulty: 2,
    theme: "neutral",
    hint: "« Fromage ou dessert » exclut ; « les clients fidèles ou importants » n'exclut pas.",
    tags: ["stmg", "maths", "logique", "piege", "fixed"],
    text:
      "Un menu propose « fromage ou dessert ». Une base de données sélectionne « les clients fidèles ou importants ». " +
      "Ces deux « ou » ont-ils le même sens ?",
    format: "qcm",
    choices: [
      "non : le premier est exclusif (l'un ou l'autre), le second ne l'est pas (l'un, l'autre, ou les deux)",
      "oui : « ou » a toujours le même sens",
      "non : le premier n'est pas exclusif, le second l'est",
      "cela dépend du nombre de clients",
    ],
    expected: [
      "non : le premier est exclusif (l'un ou l'autre), le second ne l'est pas (l'un, l'autre, ou les deux)",
    ],
    comparator: "mcq_exact",
    explanation: exp(
      "En mathématiques et en informatique, le « ou » est INCLUSIF : « A ou B » est vrai si A, si B, ou si les deux. Le langage courant l'emploie souvent au sens exclusif.",
      "On se demande si les deux cas peuvent être vrais en même temps, et si la phrase l'autorise.",
      "Au restaurant, on ne prend pas les deux : le « ou » exclut. Dans un filtre, un client à la fois fidèle ET important est bien sélectionné : le « ou » inclut.",
      "Les deux « ou » n'ont pas le même sens — et c'est le sens INCLUSIF qui vaut en mathématiques."
    ),
    choiceDiagnostics: [
      {
        choice: "oui : « ou » a toujours le même sens",
        cause: "c'est justement l'ambiguïté que le programme demande de lever",
      },
    ],
  },

  {
    kind: "template",
    id: "stmg_logique_ou_courant_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "logique_connecteurs",
    microId: "logique_ou_courant",
    difficulty: 2,
    theme: "neutral",
    hint: "Le « ou » mathématique autorise les deux à la fois.",
    tags: ["stmg", "maths", "logique", "template"],
    generate: () => {
      // Chaque phrase porte un nombre tiré : sans lui, la micro ne produisait
      // que trois questions réellement distinctes.
      const seuil = pick([200, 300, 500, 800, 1000, 1500] as const);
      const jours = pick([2, 3, 5, 7, 14, 30] as const);
      const phrases = [
        { texte: `« Le colis part sous ${jours} jours ou la commande est annulée »`, exclusif: true },
        { texte: `« Les articles en promotion ou coûtant plus de ${seuil} € sont signalés »`, exclusif: false },
        { texte: `« Vous serez remboursé sous ${jours} jours ou échangé, au choix »`, exclusif: true },
        { texte: `« On sélectionne les clients de Paris ou ceux dépensant plus de ${seuil} € »`, exclusif: false },
        { texte: `« Le paiement se fait en une fois ou en ${jours} mensualités »`, exclusif: true },
        { texte: `« Les salariés cadres ou ayant plus de ${jours} ans d'ancienneté sont concernés »`, exclusif: false },
        { texte: `« La livraison a lieu avant ${jours} h ou après ${jours + 6} h »`, exclusif: true },
        { texte: `« On garde les lots de plus de ${seuil} g ou mal étiquetés »`, exclusif: false },
      ] as const;
      const p = pick(phrases);
      return {
        text: `Dans la phrase suivante, le « ou » est-il exclusif — l'un OU l'autre mais pas les deux ?\n\n${p.texte}`,
        format: "qcm",
        choices: shuffle([
          "oui, exclusif : les deux à la fois sont impossibles",
          "non, inclusif : les deux à la fois sont possibles",
          "la phrase n'a pas de sens",
          "cela ne se décide pas",
        ]),
        expected: [
          p.exclusif
            ? "oui, exclusif : les deux à la fois sont impossibles"
            : "non, inclusif : les deux à la fois sont possibles",
        ],
        comparator: "mcq_exact",
        explanation: exp(
          "Le « ou » du langage courant est parfois exclusif, alors que le « ou » mathématique est toujours inclusif : il autorise le cas où les deux propositions sont vraies.",
          "On se demande si les deux situations peuvent coexister dans la phrase.",
          p.exclusif
            ? "Les deux cas s'excluent l'un l'autre : ce « ou » est exclusif."
            : "Rien n'empêche qu'un individu vérifie les deux critères : ce « ou » est inclusif, comme en mathématiques.",
          `Ce « ou » est ${p.exclusif ? "exclusif" : "inclusif"}.`
        ),
      };
    },
  },

  /* ═══════════════ logique_contre_exemple ═══════════════ */

  {
    kind: "template",
    id: "stmg_logique_contre_exemple_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "logique_raisonnement",
    microId: "logique_contre_exemple",
    difficulty: 3,
    theme: "neutral",
    hint: "Un seul cas suffit à réfuter une affirmation universelle.",
    tags: ["stmg", "maths", "logique", "template"],
    generate: () => {
      // ⚠️ Les nombres sont TIRÉS : sans eux, cette micro ne produisait qu'UNE
      // seule question réellement distincte sous cinq habillages. Cinq textes,
      // un seul travail.
      const t = pick([10, 20, 25, 30, 40, 50] as const);
      const d = pick([0.2, 0.25, 0.5, 0.8] as const);
      const seuil = pick([5, 8, 10, 12, 20] as const);
      const cas = pick([
        {
          affirmation: `« Toute augmentation de $${t}\\,\\%$ suivie d'une baisse de $${t}\\,\\%$ ramène au prix initial »`,
          contre: `une hausse de ${t} % puis une baisse de ${t} % : le coefficient global vaut ${fr(Math.round((1 + t / 100) * (1 - t / 100) * 10000) / 10000)}`,
        },
        {
          affirmation: "« Le carré d'un nombre est toujours supérieur à ce nombre »",
          contre: `le nombre ${fr(d)}, dont le carré vaut ${fr(Math.round(d * d * 10000) / 10000)}`,
        },
        {
          affirmation: `« Deux évènements de probabilités $${fr(d)}$ et $${fr(Math.round((1 - d) * 100) / 100)}$ sont toujours indépendants »`,
          contre: "deux évènements incompatibles, dont l'intersection est vide alors que le produit des probabilités ne l'est pas",
        },
        {
          affirmation: `« Une suite croissante finit toujours par dépasser $${seuil}$ »`,
          contre: `une suite croissante qui se rapproche de ${seuil} sans jamais l'atteindre`,
        },
        {
          affirmation: `« Le taux moyen de $+${t}\\,\\%$ puis $-${t}\\,\\%$ est nul »`,
          contre: `le calcul du coefficient global, qui vaut ${fr(Math.round((1 + t / 100) * (1 - t / 100) * 10000) / 10000)} et non 1`,
        },
      ] as const);
      return {
        text: `Comment réfuter l'affirmation suivante ?\n\n${cas.affirmation}`,
        format: "qcm",
        choices: shuffle([
          "en exhibant un contre-exemple : un seul cas où elle est fausse",
          "en vérifiant qu'elle est vraie sur plusieurs exemples",
          "en la reformulant autrement",
          "on ne peut pas réfuter une affirmation générale",
        ]),
        expected: ["en exhibant un contre-exemple : un seul cas où elle est fausse"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une proposition universelle — « pour tout… » — est réfutée dès qu'on exhibe UN SEUL cas où elle est fausse : c'est un contre-exemple.",
          "On cherche un cas particulier qui met l'affirmation en défaut ; inutile d'en trouver plusieurs.",
          `Ici, il suffit de citer ${cas.contre}.`,
          "Un contre-exemple suffit à réfuter une affirmation générale."
        ),
        choiceDiagnostics: [
          {
            choice: "en vérifiant qu'elle est vraie sur plusieurs exemples",
            cause: "des exemples ne démontrent rien, et ne réfutent rien non plus",
          },
        ],
      };
    },
  },

  /* ═══════════════════ logique_reciproque ═══════════════════ */

  {
    kind: "template",
    id: "stmg_logique_reciproque_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "logique_raisonnement",
    microId: "logique_reciproque",
    difficulty: 3,
    theme: "neutral",
    hint: "La réciproque échange l'hypothèse et la conclusion — et n'a aucune raison d'être vraie.",
    tags: ["stmg", "maths", "logique", "template"],
    generate: () => {
      // Les seuils et taux sont tirés : la micro n'offrait sinon que quatre
      // questions réellement distinctes.
      const t = pick([5, 8, 10, 12, 15, 20, 25] as const);
      const q = fr(1 + t / 100);
      const s = pick([2, 3, 4, 5, 10, 20] as const);
      const cas = pick([
        {
          prop: `si une suite géométrique à termes positifs a une raison supérieure à $${s}$, alors elle est croissante`,
          rec: `si une suite est croissante, alors c'est une suite géométrique de raison supérieure à $${s}$`,
          vraie: false,
        },
        {
          prop: `si deux évènements de probabilité supérieure à $0{,}${s}$ sont incompatibles, alors leur intersection est vide`,
          rec: `si l'intersection de deux évènements de probabilité supérieure à $0{,}${s}$ est vide, alors ils sont incompatibles`,
          vraie: true,
        },
        {
          prop: `si un nombre est le carré d'un entier compris entre $1$ et $${s}$, alors il est positif`,
          rec: `si un nombre est positif, alors c'est le carré d'un entier compris entre $1$ et $${s}$`,
          vraie: false,
        },
        {
          prop: `si la dérivée est positive sur $[0\\,;\\,${s}]$, alors la fonction y est croissante`,
          rec: `si une fonction est croissante sur $[0\\,;\\,${s}]$, alors sa dérivée y est positive`,
          vraie: true,
        },
        {
          prop: `si un prix augmente de $${t}\\,\\%$, alors il est multiplié par $${q}$`,
          rec: `si un prix est multiplié par $${q}$, alors il augmente de $${t}\\,\\%$`,
          vraie: true,
        },
        {
          prop: `si une fonction est affine de coefficient directeur $${s}$, alors sa courbe est une droite`,
          rec: `si la courbe d'une fonction est une droite, alors elle est affine de coefficient directeur $${s}$`,
          vraie: false,
        },
      ] as const);
      return {
        text: `On considère la proposition : « ${cas.prop} ».\n\nSa réciproque — « ${cas.rec} » — est-elle vraie ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [cas.vraie ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "La réciproque d'une proposition « si A alors B » est « si B alors A ». Une proposition peut être vraie sans que sa réciproque le soit.",
          "On échange hypothèse et conclusion, puis on cherche un contre-exemple à la nouvelle proposition.",
          cas.vraie
            ? "Ici la réciproque tient également : les deux propositions sont équivalentes."
            : "Ici la réciproque est fausse : on trouve facilement un cas qui vérifie B sans vérifier A.",
          `La réciproque est ${cas.vraie ? "vraie" : "fausse"}.`
        ),
      };
    },
  },

  /* ═══════════ logique_necessaire_suffisante ═══════════ */

  {
    kind: "template",
    id: "stmg_logique_ns_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "logique_raisonnement",
    microId: "logique_necessaire_suffisante",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans « si A alors B » : A est SUFFISANTE pour B, et B est NÉCESSAIRE à A.",
    tags: ["stmg", "maths", "logique", "template"],
    generate: () => {
      const s = pick([5, 10, 20, 50, 100, 200] as const);
      const t = pick([5, 10, 15, 20, 25, 30] as const);
      const cas = pick([
        { a: `la raison d'une suite géométrique à termes positifs est supérieure à $${1 + s / 100}$`, b: "la suite est croissante" },
        { a: `un nombre est supérieur à $${s}$`, b: "ce nombre est positif" },
        { a: `deux évènements de probabilité $0{,}${t}$ sont incompatibles`, b: "leur intersection est vide" },
        { a: `une fonction est affine de coefficient directeur $${s}$`, b: "sa courbe est une droite" },
        { a: `le coefficient multiplicateur vaut $${fr(1 + t / 100)}$`, b: "le prix a augmenté" },
        { a: `un lot de plus de $${s}$ kg est signalé par le contrôle`, b: "le lot a été contrôlé" },
      ] as const);
      const sens = pick(["suffisante", "necessaire"] as const);
      return {
        text:
          `On sait que : si ${cas.a}, alors ${cas.b}.\n\n` +
          (sens === "suffisante"
            ? `La condition « ${cas.a} » est-elle nécessaire ou suffisante pour que « ${cas.b} » ?`
            : `La condition « ${cas.b} » est-elle nécessaire ou suffisante pour que « ${cas.a} » ?`),
        format: "qcm",
        choices: shuffle(["suffisante", "nécessaire", "ni l'une ni l'autre", "les deux à la fois"]),
        expected: [sens === "suffisante" ? "suffisante" : "nécessaire"],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une implication « si A alors B » : A est une condition SUFFISANTE pour B — il suffit que A soit vraie —, et B est une condition NÉCESSAIRE à A — sans B, A ne peut pas être vraie.",
          "On repère le sens de la flèche : ce qui est en amont est suffisant, ce qui est en aval est nécessaire.",
          sens === "suffisante"
            ? `Il SUFFIT que « ${cas.a} » pour avoir « ${cas.b} ».`
            : `Il FAUT que « ${cas.b} » pour que « ${cas.a} » puisse être vraie.`,
          `La condition est ${sens === "suffisante" ? "suffisante" : "nécessaire"}.`
        ),
      };
    },
  },
];
