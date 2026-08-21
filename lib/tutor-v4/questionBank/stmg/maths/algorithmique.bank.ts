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

  {
    // ANGLE 2 — l'ÉCHANGE qui échoue. Le premier item suit une variable ligne à
    // ligne ; celui-ci met en scène le piège que cette lecture doit permettre
    // de voir : échanger deux variables sans en garder une de côté écrase la
    // première valeur, et l'on obtient deux fois la même. C'est le premier
    // programme faux que tout le monde écrit.
    kind: "template",
    id: "stmg_algo_affectation_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_variables",
    microId: "algo_affectation",
    difficulty: 3,
    theme: "neutral",
    hint: "Après la première ligne de l'échange, l'ancienne valeur de `x` n'existe plus nulle part.",
    tags: ["stmg", "maths", "algorithmique", "python", "template"],
    generate: () => {
      const a = randomInt(2, 30);
      const b = randomInt(2, 30) + 30;
      const lignes = [`x = ${a}`, `y = ${b}`, `x = y`, `y = x`, `print(x, y)`];
      const bonne = `${b} ${b}`;
      return {
        text:
          `Ce programme voudrait ÉCHANGER les valeurs de \`x\` et \`y\`. Qu'affiche-t-il réellement ?\n\n${code(lignes)}`,
        format: "qcm",
        choices: shuffle([bonne, `${b} ${a}`, `${a} ${b}`, `${a} ${a}`]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une affectation ÉCRASE la valeur précédente : dès que `x = y` est exécutée, l'ancienne valeur de `x` a disparu de la mémoire.",
          "On suit les deux variables ligne à ligne, sans supposer que l'ordinateur « se souvient » de ce qu'il vient de remplacer.",
          `Après \`x = ${a}\` et \`y = ${b}\` : x vaut ${a}, y vaut ${b}. ` +
            `Après \`x = y\` : x vaut ${b}, y vaut ${b} — le ${a} est perdu. ` +
            `\`y = x\` recopie alors ${b} dans y, qui le contenait déjà.`,
          `Le programme affiche « ${bonne} » : l'échange a échoué. Il aurait fallu une troisième variable pour mettre le ${a} de côté.`
        ),
        choiceDiagnostics: [
          {
            choice: `${b} ${a}`,
            cause: "a supposé que l'échange fonctionnait : c'est justement ce que ce programme ne fait PAS",
          },
        ],
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

  {
    // ANGLE 2 — le compteur RÉINITIALISÉ dans la boucle. Le premier item fait
    // lire un compteur correct ; celui-ci en montre un qui repart de zéro à
    // chaque tour, et demande pourquoi le résultat est absurde. L'erreur tient
    // à une seule indentation — c'est celle qu'on cherche le plus longtemps.
    kind: "template",
    id: "stmg_algo_compteur_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_variables",
    microId: "algo_compteur",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde À QUEL MOMENT la variable `c` est remise à zéro : dedans ou dehors ?",
    tags: ["stmg", "maths", "algorithmique", "python", "diagnostic", "template"],
    generate: () => {
      const g = pick(GRANDEURS);
      const donnees = Array.from({ length: 6 }, () => randomInt(5, 40));
      const seuil = randomInt(12, 25);
      const attendu = donnees.filter((v) => v > seuil).length;
      const dernierDepasse = donnees[donnees.length - 1] > seuil;
      const lignes = [
        `${g.variable} = [${donnees.join(", ")}]`,
        `for v in ${g.variable}:`,
        `    c = 0`,
        `    if v > ${seuil}:`,
        `        c = c + 1`,
        `print(c)`,
      ];
      const bonne = `la ligne \`c = 0\` est DANS la boucle : le compteur repart de zéro à chaque tour`;
      return {
        text:
          `Ce programme devait compter les ${g.nom} supérieures à $${seuil}$ — il devrait afficher $${attendu}$. ` +
          `Il affiche $${dernierDepasse ? 1 : 0}$. Où est l'erreur ?\n\n${code(lignes)}`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `la condition devrait être \`v >= ${seuil}\``,
          `il manque un \`else\` pour les valeurs inférieures au seuil`,
          `la liste est parcourue à l'envers`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un compteur s'initialise UNE FOIS, avant la boucle : il doit survivre d'un tour à l'autre pour cumuler. Placé à l'intérieur, il est remis à zéro à chaque passage.",
          "On regarde l'indentation : ce qui est aligné sous le `for` est exécuté à chaque tour.",
          `Ici \`c = 0\` est indentée sous le \`for\` : à chaque tour, le compteur oublie tout ce qu'il avait compté. ` +
            `À la fin, il ne reste que le résultat du DERNIER tour — soit $${dernierDepasse ? 1 : 0}$, puisque la dernière valeur ($${donnees[donnees.length - 1]}$) ${dernierDepasse ? "dépasse" : "ne dépasse pas"} le seuil.`,
          `Il faut sortir \`c = 0\` de la boucle, en la plaçant avant le \`for\` : le programme afficherait alors $${attendu}$.`
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

  {
    // ANGLE 2 — passer de la SOMME au PRODUIT. Le premier item fait lire un
    // accumulateur additif ; celui-ci demande ce qu'il faut changer pour
    // cumuler des multiplications. Il y a DEUX modifications, et l'élève n'en
    // voit qu'une : l'opération saute aux yeux, l'initialisation à $1$ jamais.
    // Or partir de $0$ écrase tout.
    kind: "template",
    id: "stmg_algo_accumulateur_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_variables",
    microId: "algo_accumulateur",
    difficulty: 3,
    theme: "neutral",
    hint: "Un produit qui commence à zéro reste nul : l'élément neutre de la multiplication n'est pas $0$.",
    tags: ["stmg", "maths", "algorithmique", "python", "template"],
    generate: () => {
      const coefs = Array.from({ length: 4 }, () => pick([1.05, 1.1, 1.2, 0.9, 0.8] as const));
      const produit = coefs.reduce((s, v) => s * v, 1);
      const lignes = [
        `coefs = [${coefs.map((c) => fr(c).replace(",", ".")).join(", ")}]`,
        `s = 0`,
        `for c in coefs:`,
        `    s = s + c`,
        `print(s)`,
      ];
      const bonne = "remplacer `s = 0` par `s = 1`, et `s = s + c` par `s = s * c`";
      return {
        text:
          `Ce programme cumule des coefficients multiplicateurs par ADDITION. ` +
          `On veut qu'il calcule leur PRODUIT, c'est-à-dire le coefficient global. ` +
          `Que faut-il changer ?\n\n${code(lignes)}`,
        format: "qcm",
        choices: shuffle([
          bonne,
          "remplacer seulement `s = s + c` par `s = s * c`",
          "remplacer seulement `s = 0` par `s = 1`",
          "il n'y a rien à changer : additionner des coefficients revient à les multiplier",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un accumulateur part de l'ÉLÉMENT NEUTRE de son opération : $0$ pour une somme, $1$ pour un produit. Sans quoi la première étape fausse tout le reste.",
          "On change l'opération ET la valeur de départ — les deux vont ensemble.",
          `Avec \`s = 0\` et une multiplication, on aurait $0 \\times ${fr(coefs[0])} = 0$, puis $0$ pour toujours. ` +
            `Avec \`s = 1\`, on obtient $${coefs.map((c) => fr(c)).join(" \\times ")} \\approx ${fr(Math.round(produit * 10000) / 10000)}$ — ` +
            `le coefficient global des quatre évolutions.`,
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: "remplacer seulement `s = s + c` par `s = s * c`",
            cause: "a changé l'opération sans changer le départ : le produit resterait nul",
          },
        ],
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

  {
    // ANGLE 2 — ce que le programme COMPTE, une fois la simulation lancée. Le
    // premier item règle la condition d'un tirage ; celui-ci met cette épreuve
    // dans une boucle et demande ce que rend le total. C'est le pont entre
    // l'algorithmique et l'échantillonnage : un nombre de succès sur $n$
    // épreuves, dont la fréquence fluctuera d'une exécution à l'autre.
    kind: "template",
    id: "stmg_algo_aleatoire_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_variables",
    microId: "algo_aleatoire",
    difficulty: 3,
    theme: "neutral",
    hint: "La boucle répète l'épreuve $n$ fois, et `s` s'incrémente à chaque succès.",
    tags: ["stmg", "maths", "algorithmique", "python", "probabilites", "template"],
    generate: () => {
      const p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.75] as const);
      const n = pick([50, 100, 200, 500] as const);
      const pTexte = fr(p).replace(",", ".");
      const lignes = [
        `from random import random`,
        ``,
        `s = 0`,
        `for i in range(${n}):`,
        `    if random() < ${pTexte}:`,
        `        s = s + 1`,
        `print(s)`,
      ];
      const bonne = `le nombre de succès obtenus sur $${n}$ épreuves de probabilité $${fr(p)}$`;
      return {
        text: `Que représente le nombre affiché par ce programme ?\n\n${code(lignes)}`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `la probabilité de succès, soit $${fr(p)}$`,
          `la fréquence des succès observée sur les $${n}$ épreuves`,
          `le nombre d'épreuves, soit toujours $${n}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le programme répète $n$ fois une épreuve de Bernoulli et incrémente un compteur à chaque succès : il affiche donc un NOMBRE de succès, un entier compris entre $0$ et $n$.",
          "On sépare ce que compte la variable de ce qu'on en ferait ensuite : la fréquence demanderait une division supplémentaire.",
          `\`s\` augmente de $1$ à chaque succès, et la boucle tourne $${n}$ fois : le résultat est un entier entre $0$ et $${n}$, ` +
            `proche de $np = ${fr(Math.round(n * p * 100) / 100)}$ en moyenne. ` +
            `Pour obtenir la FRÉQUENCE, il faudrait écrire \`print(s / ${n})\`. ` +
            `Et deux exécutions ne donneront pas le même résultat : c'est la fluctuation d'échantillonnage.`,
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: `la fréquence des succès observée sur les $${n}$ épreuves`,
            cause: "il manque la division par le nombre d'épreuves : le programme affiche un effectif, pas une fréquence",
          },
        ],
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

  {
    // ANGLE 2 — COMBIEN de tours, et non ce qui s'affiche. Le premier item
    // déroule la boucle jusqu'au résultat ; celui-ci ne demande que le nombre
    // de passages, avec un `range(a, b)` à deux arguments — la forme où l'on se
    // trompe d'un, parce que la borne de gauche est incluse et celle de droite
    // non.
    kind: "template",
    id: "stmg_algo_boucle_bornee_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_boucles",
    microId: "algo_boucle_bornee",
    difficulty: 3,
    theme: "neutral",
    hint: "`range(a, b)` part de $a$ INCLUS et s'arrête avant $b$ : il y a $b - a$ tours.",
    tags: ["stmg", "maths", "algorithmique", "python", "template", "short"],
    generate: () => {
      const a = randomInt(1, 6);
      const b = a + randomInt(3, 12);
      const lignes = [
        `total = 0`,
        `for i in range(${a}, ${b}):`,
        `    total = total + i`,
        `print(total)`,
      ];
      return {
        text:
          `Combien de fois la ligne \`total = total + i\` est-elle exécutée ?\n\n${code(lignes)}`,
        format: "short",
        expected: [String(b - a)],
        comparator: "number_equal",
        explanation: exp(
          "`range(a, b)` produit les entiers de $a$ jusqu'à $b - 1$ : la borne de gauche est INCLUSE, celle de droite ne l'est pas. La boucle fait donc $b - a$ tours.",
          "On écrit la liste des valeurs prises par la variable de boucle, puis on les compte.",
          `Ici \`i\` prend les valeurs ${Array.from({ length: Math.min(b - a, 6) }, (_, k) => a + k).join(", ")}` +
            `${b - a > 6 ? ", … " : ""} et s'arrête à $${b - 1}$ : cela fait $${b} - ${a} = ${b - a}$ tours. ` +
            `La valeur $${b}$ n'est jamais atteinte.`,
          `La ligne est exécutée $${b - a}$ fois — et le total affiché vaudra $${Array.from({ length: b - a }, (_, k) => a + k).reduce((s, v) => s + v, 0)}$.`
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

  {
    // ANGLE 2 — l'ORDRE des conditions, qui rend une branche INATTEIGNABLE. Le
    // premier item déroule un `if / elif` bien rangé ; celui-ci le présente
    // dans le mauvais ordre : le seuil le plus bas étant testé en premier, il
    // attrape tout, et la remise de 15 % n'est jamais accordée. Le programme ne
    // plante pas — il rend simplement un résultat faux, ce qui est pire.
    kind: "template",
    id: "stmg_algo_condition_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_boucles",
    microId: "algo_condition_si",
    difficulty: 3,
    theme: "neutral",
    hint: "Un montant très élevé dépasse AUSSI le petit seuil : quelle condition sera testée en premier ?",
    tags: ["stmg", "maths", "algorithmique", "python", "diagnostic", "template"],
    generate: () => {
      const s1 = randomInt(200, 400);
      const s2 = s1 + randomInt(200, 400);
      const gros = s2 + randomInt(50, 300);
      const lignes = [
        `def remise(montant):`,
        `    if montant >= ${s1}:`,
        `        return 5`,
        `    elif montant >= ${s2}:`,
        `        return 15`,
        `    else:`,
        `        return 0`,
        ``,
        `print(remise(${gros}))`,
      ];
      const bonne = `il affiche $5$ : la première condition est déjà vraie, le \`elif\` n'est jamais testé`;
      return {
        text:
          `Ce programme devrait accorder $15\\,\\%$ de remise au-delà de $${s2}$ €, et $5\\,\\%$ au-delà de $${s1}$ €. ` +
          `Qu'affiche-t-il pour un montant de $${gros}$ € ?\n\n${code(lignes)}`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `il affiche $15$ : le montant dépasse bien $${s2}$ €`,
          `il affiche $20$ : les deux remises s'additionnent`,
          `il affiche $0$ : les conditions se contredisent`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans un `if / elif / else`, les conditions sont testées DANS L'ORDRE et l'exécution s'arrête à la première vraie. Une condition large placée en tête rend inatteignables toutes celles qui la suivent.",
          "On teste le premier `if` avec la valeur donnée : s'il est vrai, tout le reste est ignoré.",
          `$${gros} \\geqslant ${s1}$ : la première condition est vraie, la fonction rend $5$ et s'arrête là. ` +
            `La branche à $15\\,\\%$ ne servira JAMAIS, quel que soit le montant. ` +
            `Il faut tester les seuils du plus GRAND au plus petit.`,
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: `il affiche $15$ : le montant dépasse bien $${s2}$ €`,
            cause: "a lu les conditions comme un ensemble de règles, alors qu'elles s'excluent dans l'ordre d'écriture",
          },
        ],
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

  {
    // ANGLE 2 — dérouler UN ALGORITHME EN LANGAGE NATUREL, avec la flèche. Le
    // premier item continue un tableau de trace sur du Python ; celui-ci prend
    // la notation qui tombe vraiment au bac — « ← » et « Tant que » — et
    // demande la valeur finale. Un élève qui ne reconnaît pas la flèche perd le
    // sujet dès la première ligne.
    kind: "template",
    id: "stmg_algo_derouler_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_boucles",
    microId: "algo_derouler",
    difficulty: 3,
    theme: "neutral",
    hint: "La flèche « ← » se lit « reçoit » : c'est une affectation, comme le `=` de Python.",
    tags: ["stmg", "maths", "algorithmique", "langage-naturel", "canvas", "template", "short"],
    generate: () => {
      const depart = pick([1000, 1500, 2000, 2500] as const);
      const t = pick([5, 10, 20, 25] as const);
      const q = 1 + t / 100;
      const tours = randomInt(3, 5);
      const lignes = [
        `C ← ${depart}`,
        `N ← 0`,
        `Tant que N < ${tours}`,
        `    C ← C × ${fr(q)}`,
        `    N ← N + 1`,
        `Fin Tant que`,
        `Afficher C`,
      ];
      // ⚠️ On n'arrondit QUE pour l'affichage : en arrondissant la valeur
      // courante à chaque tour, la trace dérivait de quelques centimes et ne
      // tombait plus sur la réponse attendue.
      const valeurs: number[] = [];
      let c = depart;
      for (let k = 0; k < tours; k++) {
        c = c * q;
        valeurs.push(Math.round(c * 100) / 100);
      }
      const resultat = Math.round(depart * Math.pow(q, tours) * 100) / 100;
      return {
        text:
          `Cet algorithme est écrit en langage naturel. Quelle valeur affiche-t-il ? ` +
          `(arrondie au centième)\n\n${pseudo(lignes)}`,
        format: "short",
        expected: [fr(resultat)],
        comparator: "number_equal",
        canvas: canvasTrace(
          ["N", "C"],
          [Array.from({ length: tours }, (_, k) => k + 1), valeurs],
          "Déroulement de l'algorithme"
        ),
        explanation: exp(
          "La flèche « ← » désigne l'AFFECTATION dans un algorithme écrit en langage naturel : « C ← C × 1,1 » se lit « C reçoit C multiplié par 1,1 ». C'est la notation employée dans les sujets de bac.",
          "On dresse un tableau de déroulement : une colonne par tour, une ligne par variable.",
          `Le compteur N va de $1$ à $${tours}$, et C est multiplié par $${fr(q)}$ à chaque tour : ` +
            `$${depart} \\times ${fr(q)}^{${tours}} \\approx ${fr(resultat)}$. ` +
            `La boucle s'arrête dès que N atteint $${tours}$, car la condition « N < $${tours}$ » devient fausse.`,
          `L'algorithme affiche environ $${fr(resultat)}$.`
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

  {
    // ANGLE 2 — l'instruction CHERCHÉE, pas la liste produite. Le premier item
    // exécute une compréhension ; celui-ci donne le résultat et demande quelle
    // écriture le produit. Les trois pièges sont les trois façons de se tromper
    // d'un : partir de $1$, s'arrêter trop tôt, ou appliquer l'expression au
    // rang plutôt qu'à la valeur.
    kind: "template",
    id: "stmg_algo_liste_generer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_listes",
    microId: "algo_liste_generer",
    difficulty: 3,
    theme: "neutral",
    hint: "`range(n)` commence à $0$ : pour obtenir une liste qui commence à $1$, il faut ajouter $1$ à l'indice.",
    tags: ["stmg", "maths", "algorithmique", "python", "template"],
    generate: () => {
      const n = randomInt(4, 6);
      const k = pick([2, 3, 5, 10] as const);
      // La liste attendue commence à $k$ : elle est produite par
      // `[k * (i + 1) for i in range(n)]`.
      const attendue = Array.from({ length: n }, (_, i) => k * (i + 1));
      const bonne = `\`L = [${k} * (i + 1) for i in range(${n})]\``;
      return {
        text: `Quelle instruction produit exactement la liste $[${attendue.join(", ")}]$ ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `\`L = [${k} * i for i in range(${n})]\``,
          `\`L = [${k} * i for i in range(1, ${n})]\``,
          `\`L = [i + ${k} for i in range(${n})]\``,
          `\`L = [${k} * (i + 1) for i in range(${n - 1})]\``,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une liste en compréhension `[expression for i in range(n)]` applique l'expression à chaque valeur de $i$, qui va de $0$ à $n-1$.",
          "On énumère mentalement les valeurs produites par chaque proposition et l'on compare à la liste voulue — le premier terme suffit souvent à trancher.",
          `Avec \`${k} * (i + 1)\` et $i$ de $0$ à $${n - 1}$ : ${attendue.join(", ")}. ` +
            `Avec \`${k} * i\`, la liste commencerait par $0$ ; avec \`range(1, ${n})\`, elle n'aurait que $${n - 1}$ termes.`,
          `L'instruction correcte est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `\`L = [${k} * i for i in range(${n})]\``,
            cause: "oublie que `range` commence à $0$ : la liste débuterait par $0$",
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

  {
    // ANGLE 2 — l'indice du DERNIER élément. Le premier item lit `L[i]` pour un
    // indice donné ; celui-ci demande lequel désigne la fin de la liste, et
    // c'est là que le décalage d'un se paie : une liste de $n$ éléments s'arrête
    // à l'indice $n-1$. Demander `L[n]` provoque une erreur, pas une valeur.
    kind: "template",
    id: "stmg_algo_liste_indices_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_listes",
    microId: "algo_liste_indices",
    difficulty: 3,
    theme: "neutral",
    hint: "Les indices vont de $0$ à $n-1$ : il y en a bien $n$, mais le dernier n'est pas $n$.",
    tags: ["stmg", "maths", "algorithmique", "python", "template"],
    generate: () => {
      const n = randomInt(5, 9);
      const donnees = Array.from({ length: n }, () => randomInt(10, 90));
      const bonne = `\`L[${n - 1}]\``;
      return {
        text:
          `La liste \`L\` contient $${n}$ valeurs.\n\n${code([`L = [${donnees.join(", ")}]`])}\n` +
          `Quelle écriture donne son DERNIER élément ?`,
        format: "qcm",
        choices: shuffle([bonne, `\`L[${n}]\``, `\`L[${n + 1}]\``, `\`L[1]\``]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "En Python, les indices d'une liste de $n$ éléments vont de $0$ à $n-1$ : le premier est `L[0]`, le dernier `L[n-1]`.",
          "On compte les positions en partant de zéro — ou l'on retient que le dernier indice vaut la longueur MOINS UN.",
          `Ici $${n}$ valeurs, donc les indices $0$ à $${n - 1}$ : le dernier élément est \`L[${n - 1}]\`, qui vaut $${donnees[n - 1]}$. ` +
            `\`L[${n}]\` n'existe pas : Python renverrait une erreur « index out of range ».`,
          `Le dernier élément s'écrit ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `\`L[${n}]\``,
            cause: "a compté les éléments à partir de $1$ : cet indice dépasse la liste et provoque une erreur",
          },
        ],
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

  {
    // ANGLE 2 — les DEUX façons d'itérer. Le premier item déroule un parcours
    // par valeurs ; celui-ci met les deux écritures côte à côte —
    // `for v in L` et `for i in range(len(L))` — et demande ce que rend
    // chacune. L'élève qui les confond affiche des indices en croyant afficher
    // des valeurs.
    kind: "template",
    id: "stmg_algo_liste_parcourir_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_listes",
    microId: "algo_liste_parcourir",
    difficulty: 3,
    theme: "neutral",
    hint: "`for v in L` donne les VALEURS ; `for i in range(len(L))` donne les POSITIONS.",
    tags: ["stmg", "maths", "algorithmique", "python", "template"],
    generate: () => {
      const donnees = Array.from({ length: 4 }, () => randomInt(10, 90));
      const parValeurs = Math.random() < 0.5;
      const lignes = parValeurs
        ? [`L = [${donnees.join(", ")}]`, `for v in L:`, `    print(v)`]
        : [`L = [${donnees.join(", ")}]`, `for i in range(len(L)):`, `    print(i)`];
      const bonne = parValeurs
        ? `les quatre valeurs : $${donnees.join("$, $")}$`
        : `les quatre indices : $0$, $1$, $2$, $3$`;
      return {
        text: `Qu'affiche ce programme, ligne après ligne ?\n\n${code(lignes)}`,
        format: "qcm",
        choices: shuffle([
          `les quatre valeurs : $${donnees.join("$, $")}$`,
          `les quatre indices : $0$, $1$, $2$, $3$`,
          `une seule ligne : $${donnees.reduce((s, v) => s + v, 0)}$`,
          `les quatre indices à partir de $1$ : $1$, $2$, $3$, $4$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Python offre deux parcours : `for v in L` fait prendre à `v` les VALEURS de la liste, tandis que `for i in range(len(L))` fait prendre à `i` les POSITIONS, de $0$ à $n-1$.",
          "On regarde ce qui suit le `in` : une liste donne ses valeurs, un `range` donne des entiers.",
          parValeurs
            ? `Ici \`for v in L\` : \`v\` vaut successivement ${donnees.join(", ")}, et chaque tour affiche une valeur.`
            : `Ici \`for i in range(len(L))\` : \`len(L)\` vaut $4$, donc \`i\` prend les valeurs $0$, $1$, $2$, $3$. ` +
              `Pour afficher les valeurs, il faudrait écrire \`print(L[i])\`.`,
          `Le programme affiche ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `une seule ligne : $${donnees.reduce((s, v) => s + v, 0)}$`,
            cause: "le `print` est DANS la boucle : il s'exécute à chaque tour, et rien n'est cumulé",
          },
        ],
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

  {
    // ANGLE 2 — la liste CONSTRUITE dans une boucle, et sa longueur. Le premier
    // item empile deux `append` écrits à la main ; celui-ci les met dans une
    // boucle avec un filtre, et demande combien d'éléments il reste. C'est le
    // geste réel : on part d'une liste vide et l'on n'y garde que ce qui
    // convient.
    kind: "template",
    id: "stmg_algo_liste_modifier_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_listes",
    microId: "algo_liste_modifier",
    difficulty: 3,
    theme: "neutral",
    hint: "La liste part VIDE : seuls les éléments qui passent le test y entrent.",
    tags: ["stmg", "maths", "algorithmique", "python", "template", "short"],
    generate: () => {
      const g = pick(GRANDEURS);
      const donnees = Array.from({ length: 8 }, () => randomInt(5, 60));
      const seuil = randomInt(20, 40);
      const retenues = donnees.filter((v) => v > seuil);
      const lignes = [
        `${g.variable} = [${donnees.join(", ")}]`,
        `L = []`,
        `for v in ${g.variable}:`,
        `    if v > ${seuil}:`,
        `        L.append(v)`,
        `print(len(L))`,
      ];
      return {
        text: `Qu'affiche ce programme ?\n\n${code(lignes)}`,
        format: "short",
        expected: [String(retenues.length)],
        comparator: "number_equal",
        explanation: exp(
          "`append` ajoute un élément à la fin d'une liste, et `len` en donne la longueur. Une liste initialisée à `[]` ne contient donc, à la fin, que les éléments ayant passé le test.",
          "On parcourt les données, on retient celles qui vérifient la condition, puis on les compte.",
          `Valeurs strictement supérieures à $${seuil}$ : ${retenues.length > 0 ? retenues.join(", ") : "aucune"}. ` +
            `La liste \`L\` contient donc $${retenues.length}$ élément(s), et c'est cette longueur qui s'affiche — ` +
            `pas les valeurs elles-mêmes.`,
          `Le programme affiche $${retenues.length}$.`
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

  {
    // ANGLE 2 — la SORTIE, l'autre moitié du libellé. Le premier item demande
    // les entrées ; celui-ci demande ce que la fonction rend, et les pièges
    // sont ceux qu'on entend en classe : « elle affiche », « elle renvoie la
    // variable ». Une fonction ne rend qu'UNE chose, celle qui suit `return`.
    kind: "template",
    id: "stmg_algo_fct_es_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_fonctions",
    microId: "algo_fct_entrees_sorties",
    difficulty: 3,
    theme: "neutral",
    hint: "La sortie est ce qui suit le mot `return` — pas ce qui est affiché à l'écran.",
    tags: ["stmg", "maths", "algorithmique", "python", "template"],
    generate: () => {
      const seuil = pick([100, 150, 200, 300] as const);
      const t = pick([5, 10, 15, 20] as const);
      const lignes = [
        `def frais_port(montant):`,
        `    if montant >= ${seuil}:`,
        `        return 0`,
        `    else:`,
        `        return ${t}`,
      ];
      const bonne = `un montant de frais de port : $0$ ou $${t}$ selon le cas`;
      return {
        text: `Que RENVOIE la fonction \`frais_port\` ?\n\n${code(lignes)}`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `le montant de la commande, tel qu'il a été donné`,
          `rien : elle se contente d'afficher les frais de port`,
          `les deux valeurs $0$ et $${t}$ à la fois`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La SORTIE d'une fonction est la valeur transmise par `return`. Une fonction peut contenir plusieurs `return`, mais un seul s'exécute : dès qu'il est atteint, la fonction s'arrête et rend sa valeur.",
          "On repère tous les `return` et l'on regarde ce qu'ils portent : c'est cela, et rien d'autre, qui sort de la fonction.",
          `Les deux \`return\` rendent un nombre : $0$ si le montant atteint $${seuil}$ €, $${t}$ sinon. ` +
            `L'entrée est \`montant\`, la sortie est le montant des frais de port. ` +
            `Il n'y a aucun \`print\` : la fonction n'affiche rien, elle RENVOIE.`,
          `La fonction renvoie ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `rien : elle se contente d'afficher les frais de port`,
            cause: "confond `return` et `print` : l'un transmet une valeur au programme, l'autre l'écrit à l'écran",
          },
        ],
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

  {
    // ANGLE 2 — le nombre d'ARGUMENTS. Le premier item guette le `return`
    // manquant ; celui-ci guette l'autre erreur de définition : une fonction à
    // deux paramètres appelée avec un seul. Python refuse d'exécuter, et le
    // message d'erreur est illisible pour un élève — d'où l'intérêt de savoir
    // le prévoir en lisant.
    kind: "template",
    id: "stmg_algo_fct_definir_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_fonctions",
    microId: "algo_fct_definir",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les paramètres de la ligne `def`, puis les valeurs données lors de l'appel.",
    tags: ["stmg", "maths", "algorithmique", "python", "diagnostic", "template"],
    generate: () => {
      const prix = pick([80, 120, 150, 200, 250] as const);
      const lignes = [
        `def prix_ttc(prix_ht, taux):`,
        `    return prix_ht * (1 + taux / 100)`,
        ``,
        `print(prix_ttc(${prix}))`,
      ];
      const bonne = "l'appel ne donne qu'une valeur alors que la fonction en attend deux";
      return {
        text: `Ce programme provoque une erreur. Pourquoi ?\n\n${code(lignes)}`,
        format: "qcm",
        choices: shuffle([
          bonne,
          "il manque le `return` dans la définition de la fonction",
          "le nom `prix_ht` n'existe pas en dehors de la fonction",
          "on ne peut pas mettre un appel de fonction dans un `print`",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fonction s'appelle avec exactement autant d'arguments qu'elle a de paramètres, et dans le même ordre. Python vérifie ce nombre avant d'exécuter quoi que ce soit.",
          "On compte les paramètres de la ligne `def`, puis les valeurs de l'appel : les deux nombres doivent coïncider.",
          `\`def prix_ttc(prix_ht, taux)\` déclare DEUX paramètres, mais l'appel \`prix_ttc(${prix})\` n'en fournit qu'un : ` +
            `Python ne sait pas quelle valeur donner à \`taux\`. ` +
            `Il faudrait écrire par exemple \`prix_ttc(${prix}, 20)\`.`,
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: "le nom `prix_ht` n'existe pas en dehors de la fonction",
            cause: "c'est vrai en général, mais ce n'est pas ce qui bloque ici : le programme n'utilise `prix_ht` que dans la fonction",
          },
        ],
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

  {
    // ANGLE 2 — l'appel IMBRIQUÉ. Le premier item substitue deux arguments dans
    // l'ordre ; celui-ci applique la fonction au résultat d'elle-même, ce qui
    // arrive dès qu'on compose deux évolutions. Il faut calculer de l'intérieur
    // vers l'extérieur, comme dans une expression à parenthèses.
    kind: "template",
    id: "stmg_algo_fct_appeler_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_fonctions",
    microId: "algo_fct_appeler",
    difficulty: 3,
    theme: "neutral",
    hint: "On calcule d'abord l'appel du DEDANS, puis on applique la fonction à son résultat.",
    tags: ["stmg", "maths", "algorithmique", "python", "template", "short"],
    generate: () => {
      const capital = pick([1000, 1500, 2000, 2500, 4000] as const);
      const t = pick([2, 5, 10, 20, 25] as const);
      const q = 1 + t / 100;
      const lignes = [
        `def apres_un_an(c):`,
        `    return c * ${fr(q).replace(",", ".")}`,
        ``,
        `print(apres_un_an(apres_un_an(${capital})))`,
      ];
      const resultat = Math.round(capital * q * q * 100) / 100;
      return {
        text: `Qu'affiche ce programme ?\n\n${code(lignes)}`,
        format: "short",
        expected: [fr(resultat)],
        comparator: "number_equal",
        explanation: exp(
          "Quand un appel de fonction sert d'argument à un autre appel, on évalue d'abord celui de l'INTÉRIEUR : son résultat devient l'entrée du suivant.",
          "On calcule l'appel interne, on note sa valeur, puis on relance la fonction sur cette valeur.",
          `Appel interne : $${capital} \\times ${fr(q)} = ${fr(Math.round(capital * q * 100) / 100)}$. ` +
            `Appel externe : $${fr(Math.round(capital * q * 100) / 100)} \\times ${fr(q)} = ${fr(resultat)}$. ` +
            `Autrement dit, le capital a subi DEUX années d'évolution : $${capital} \\times ${fr(q)}^2$.`,
          `Le programme affiche $${fr(resultat)}$.`
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

  {
    // ANGLE 2 — ce qu'il faut changer QUAND LE TAUX CHANGE. Le premier item
    // demande l'intérêt d'une fonction en général ; celui-ci le fait mesurer :
    // avec la fonction, une seule ligne à corriger ; sans elle, autant de
    // lignes que d'endroits où le calcul était recopié. C'est l'argument qui
    // convainc, parce qu'il se compte.
    kind: "template",
    id: "stmg_algo_fct_structurer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "algo_fonctions",
    microId: "algo_fct_structurer",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche combien de fois le taux apparaît dans le programme.",
    tags: ["stmg", "maths", "algorithmique", "python", "template"],
    generate: () => {
      const t = pick([5, 10, 20] as const);
      const nouveau = pick([5.5, 8, 15, 25].filter((v) => v !== t));
      const q = fr(1 + t / 100).replace(",", ".");
      const prix = Array.from({ length: 3 }, () => randomInt(50, 300));
      const lignes = [
        `panier = [${prix.join(", ")}]`,
        `total = 0`,
        `for p in panier:`,
        `    total = total + p * ${q}`,
        ``,
        `frais = 15 * ${q}`,
        `assurance = 40 * ${q}`,
        `print(round(total + frais + assurance, 2))`,
      ];
      const bonne = `trois lignes, car le coefficient $${q.replace(".", ",")}$ y est recopié trois fois`;
      return {
        text:
          `Ce programme applique une TVA de $${t}\\,\\%$ sans utiliser de fonction. ` +
          `Le taux passe à $${fr(nouveau)}\\,\\%$ : combien de lignes faut-il modifier ?\n\n${code(lignes)}`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `une seule ligne : celle de la boucle`,
          `aucune : le programme s'adapte tout seul`,
          `toutes les lignes du programme`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Structurer un programme avec des fonctions, c'est écrire chaque calcul UNE SEULE FOIS. Recopié à plusieurs endroits, il devra être corrigé partout — et l'on en oublie toujours un.",
          "On compte les endroits où la valeur à changer apparaît.",
          `Le coefficient \`${q}\` apparaît trois fois : dans la boucle, dans le calcul des frais et dans celui de l'assurance. ` +
            `Avec une fonction \`def prix_ttc(ht): return ht * ${q}\`, il n'apparaîtrait qu'UNE fois : ` +
            `passer à $${fr(nouveau)}\\,\\%$ ne demanderait qu'une seule correction, et aucun oubli ne serait possible.`,
          `Il faut modifier ${bonne} — c'est exactement ce qu'une fonction évite.`
        ),
        choiceDiagnostics: [
          {
            choice: `une seule ligne : celle de la boucle`,
            cause: "n'a vu que le premier usage : les frais et l'assurance appliquent aussi le taux",
          },
        ],
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

  {
    // ANGLE 2 — la RÉFÉRENCE cherchée, pas la valeur. Le premier item lit le
    // contenu d'une cellule désignée ; celui-ci part de la valeur et demande où
    // elle se trouve. C'est le geste qu'on fait pour écrire une formule : on
    // repère l'adresse avant de la taper.
    kind: "template",
    id: "stmg_tab_lire_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "tableur_formules",
    microId: "tab_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "On nomme d'abord la colonne (une lettre), puis la ligne (un nombre) : B3, jamais 3B.",
    tags: ["stmg", "maths", "tableur", "canvas", "template"],
    generate: () => {
      const mois = ["Janvier", "Février", "Mars", "Avril", "Mai"];
      // Valeurs deux à deux distinctes : sinon deux cellules porteraient la
      // même, et la question n'aurait plus de réponse unique.
      const valeurs = shuffle([200, 340, 450, 520, 610, 730, 880, 910]).slice(0, 5);
      const k = randomInt(0, 4);
      const ligne = k + 2;
      const bonne = `\`B${ligne}\``;
      return {
        text: `Dans quelle cellule se trouve la valeur $${valeurs[k]}$ ?`,
        format: "qcm",
        choices: shuffle([bonne, `\`A${ligne}\``, `\`B${k + 1}\``, `\`${ligne}B\``]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: {
          kind: "tableau_donnees",
          title: "Feuille de calcul — chiffre d'affaires mensuel (€)",
          headers: ["", "A", "B"],
          rows: [
            { label: "1", values: ["Mois", "CA (€)"] },
            ...mois.map((m, i) => ({ label: String(i + 2), values: [m, String(valeurs[i])] })),
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Une cellule se désigne par sa COLONNE, en lettre, suivie de sa LIGNE, en chiffre : toujours dans cet ordre.",
          "On repère la valeur dans la feuille, puis on lit son en-tête de colonne et son numéro de ligne.",
          `La valeur $${valeurs[k]}$ est dans la colonne B (les montants) et sur la ligne ${ligne} (le mois de ${mois[k]}) : ` +
            `c'est donc la cellule \`B${ligne}\`. La colonne A contiendrait le nom du mois, et la ligne 1 les en-têtes.`,
          `La valeur se trouve en ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `\`${ligne}B\``,
            cause: "a inversé l'ordre : la lettre de colonne vient toujours en premier",
          },
        ],
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

  {
    // ANGLE 2 — TRADUIRE la formule en français. Le premier item la fait
    // exécuter et rend un nombre ; celui-ci demande ce qu'elle SIGNIFIE en
    // gestion. C'est ce qu'on attend dans une copie : « cette formule calcule
    // le chiffre d'affaires augmenté de 5 % » — et un élève peut calculer sans
    // savoir dire cela.
    kind: "template",
    id: "stmg_tab_comprendre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "tableur_formules",
    microId: "tab_comprendre_formule",
    difficulty: 3,
    theme: "neutral",
    hint: "Un coefficient supérieur à $1$ signale une hausse ; inférieur à $1$, une baisse.",
    tags: ["stmg", "maths", "tableur", "template"],
    generate: () => {
      const t = pick([2, 5, 10, 15, 20, 25] as const);
      const hausse = Math.random() < 0.5;
      const q = fr(hausse ? 1 + t / 100 : 1 - t / 100).replace(",", ".");
      const bonne = `le contenu de B2 ${hausse ? "augmenté" : "diminué"} de $${t}\\,\\%$`;
      return {
        text: `Que calcule la formule \`=B2*${q}\` saisie dans une feuille de calcul ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `le contenu de B2 ${hausse ? "diminué" : "augmenté"} de $${t}\\,\\%$`,
          `le contenu de B2 ${hausse ? "augmenté" : "diminué"} de $${fr(hausse ? 1 + t / 100 : 1 - t / 100)}$ €`,
          `$${t}\\,\\%$ du contenu de B2`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Multiplier par un coefficient, c'est appliquer une évolution : $1 + \\dfrac{t}{100}$ pour une hausse, $1 - \\dfrac{t}{100}$ pour une baisse. Le coefficient se lit donc comme un pourcentage.",
          "On compare le coefficient à $1$ : au-dessus, c'est une hausse ; en dessous, une baisse. L'écart à $1$ donne le taux.",
          `Le coefficient $${q.replace(".", ",")}$ est ${hausse ? "supérieur" : "inférieur"} à $1$, et son écart à $1$ vaut $${fr(t / 100)}$ : ` +
            `c'est une ${hausse ? "hausse" : "baisse"} de $${t}\\,\\%$. ` +
            `Prendre seulement $${t}\\,\\%$ du contenu s'écrirait \`=B2*${fr(t / 100).replace(",", ".")}\`, ce qui est tout autre chose.`,
          `La formule calcule ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${t}\\,\\%$ du contenu de B2`,
            cause: "confond le coefficient multiplicateur et le pourcentage lui-même : le $1$ garde la valeur de départ",
          },
        ],
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

  {
    // ANGLE 2 — la recopie vers la DROITE, l'autre moitié du libellé. Le
    // premier item écrit une formule qui descend ; celle-ci se déplace
    // latéralement, et ce sont alors les LETTRES de colonne qui changent, pas
    // les numéros de ligne. Un élève qui n'a vu que la recopie vers le bas
    // écrit une formule qui ne suit pas.
    // ⛔⛔ Les références restent entre accents graves : nue, « =$B$2 » passe
    // dans KaTeX, qui prend les dollars pour des délimiteurs et les avale.
    kind: "template",
    id: "stmg_tab_ecrire_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "tableur_formules",
    microId: "tab_ecrire_formule",
    difficulty: 3,
    theme: "neutral",
    hint: "Vers la droite, ce sont les LETTRES qui avancent : B devient C, puis D.",
    tags: ["stmg", "maths", "tableur", "template"],
    generate: () => {
      const ligneQuantite = 2;
      const lignePrix = 3;
      const ligneTotal = 4;
      const colonne = pick(["B", "C", "D"] as const);
      const suivante = colonne === "B" ? "C" : colonne === "C" ? "D" : "E";
      const bonne = `\`=${colonne}${ligneQuantite}*${colonne}${lignePrix}\``;
      return {
        text:
          `Une feuille de calcul donne, en ligne ${ligneQuantite}, les quantités vendues, ` +
          `et en ligne ${lignePrix}, les prix unitaires — un mois par colonne. ` +
          `On veut le chiffre d'affaires en ligne ${ligneTotal}. ` +
          `Quelle formule saisir en ${colonne}${ligneTotal} pour pouvoir la recopier vers la DROITE ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `\`=$${colonne}$${ligneQuantite}*$${colonne}$${lignePrix}\``,
          `\`=${colonne}${lignePrix}*${suivante}${lignePrix}\``,
          `\`=${colonne}${ligneQuantite}+${colonne}${lignePrix}\``,
          `\`=${suivante}${ligneQuantite}*${suivante}${lignePrix}\``,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une formule recopiée vers la DROITE voit ses références de COLONNE avancer d'une lettre, tandis que les numéros de ligne restent les mêmes. En adressage relatif, cette adaptation est automatique.",
          "On écrit la formule pour la première colonne, en pensant à ce qu'elle deviendra une colonne plus loin.",
          `${bonne} recopiée en ${suivante}${ligneTotal} devient \`=${suivante}${ligneQuantite}*${suivante}${lignePrix}\` : ` +
            `quantité fois prix du mois suivant, ce qui est exactement voulu. ` +
            `Avec des dollars partout, la formule resterait figée sur le premier mois et recopierait le même total.`,
          `Il faut saisir ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `\`=$${colonne}$${ligneQuantite}*$${colonne}$${lignePrix}\``,
            cause: "a tout figé : la recopie donnerait partout le chiffre d'affaires du premier mois",
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

  {
    // ANGLE 2 — CHOISIR l'adressage, au lieu de subir la recopie. Le premier
    // item prédit ce que devient une formule ; celui-ci part du besoin — un
    // taux rangé dans une seule cellule, à réutiliser sur toute une colonne —
    // et demande la formule à écrire. C'est le seul cas où les dollars
    // servent, et c'est celui du bac.
    // ⛔⛔ Références entre accents graves, toujours : les dollars nus seraient
    // avalés par KaTeX.
    kind: "template",
    id: "stmg_tab_adressage_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "tableur_recopie",
    microId: "tab_adressage",
    difficulty: 3,
    theme: "neutral",
    hint: "La cellule du taux ne doit PAS bouger quand la formule descend : il faut la figer.",
    tags: ["stmg", "maths", "tableur", "template"],
    generate: () => {
      const t = pick([5, 10, 20] as const);
      const ligne = randomInt(2, 4);
      const bonne = `\`=B${ligne}*$D$1\``;
      return {
        text:
          `La cellule D1 contient le taux de TVA ($${t}\\,\\%$), et la colonne B les prix hors taxes. ` +
          `On saisit une formule en C${ligne} pour calculer la TVA, puis on la recopie vers le bas. ` +
          `Quelle formule faut-il écrire ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `\`=B${ligne}*D1\``,
          `\`=$B$${ligne}*$D$1\``,
          `\`=B${ligne}*D${ligne}\``,
          `\`=$B$${ligne}*D1\``,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une référence RELATIVE se décale à la recopie ; une référence ABSOLUE, écrite avec des dollars, reste figée. On fige ce qui ne doit pas bouger, et on laisse libre ce qui doit suivre.",
          "On se demande, pour chaque référence : à la ligne suivante, doit-elle changer ou non ?",
          `Le prix hors taxes change à chaque ligne : \`B${ligne}\` reste relative. ` +
            `Le taux est rangé une fois pour toutes en D1 : sans dollars, la recopie irait chercher D${ligne + 1}, ` +
            `puis D${ligne + 2} — des cellules vides, et le résultat tomberait à zéro. ` +
            `On écrit donc \`$D$1\`.`,
          `Il faut saisir ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `\`=B${ligne}*D1\``,
            cause: "n'a pas figé le taux : à la recopie, la formule pointerait des cellules vides",
          },
          {
            choice: `\`=$B$${ligne}*$D$1\``,
            cause: "a tout figé : la formule donnerait le même montant sur toute la colonne",
          },
        ],
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

  {
    // ANGLE 2 — COMBIEN de lignes franchissent le seuil, et non à partir de
    // laquelle. Le premier item cherche le premier dépassement dans une colonne
    // croissante ; ici les valeurs montent et descendent, et il faut toutes les
    // examiner. C'est ce que fait un filtre de tableur, et c'est ce que
    // comptera le programme Python de la micro voisine.
    kind: "template",
    id: "stmg_tab_exploiter_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "tableur_recopie",
    microId: "tab_exploiter_colonne",
    difficulty: 3,
    theme: "neutral",
    hint: "La colonne ne monte pas régulièrement : il faut lire TOUTES les lignes.",
    tags: ["stmg", "maths", "tableur", "canvas", "template", "short"],
    generate: () => {
      const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août"];
      // Valeurs multiples de 20, deux à deux distinctes : l'objectif tombe à
      // mi-chemin entre deux d'entre elles, donc jamais SUR une valeur.
      const valeurs = shuffle([60, 80, 100, 120, 140, 160, 180, 200]).slice(0, 6);
      const triees = [...valeurs].sort((a, b) => a - b);
      const rang = randomInt(1, 5);
      const objectif = (triees[rang - 1] + triees[rang]) / 2;
      const combien = 6 - rang;
      return {
        text:
          `La colonne B donne le chiffre d'affaires mensuel, en k€. ` +
          `Combien de mois ont dépassé l'objectif de $${objectif}$ k€ ?`,
        format: "short",
        expected: [String(combien)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: "Feuille de calcul — chiffre d'affaires mensuel (k€)",
          headers: ["", "A (mois)", "B (CA)"],
          rows: valeurs.map((v, k) => ({ label: String(k + 2), values: [mois[k], String(v)] })),
        } satisfies CanvasFigure,
        explanation: exp(
          "Exploiter une colonne, c'est la parcourir en entier pour répondre à une question de seuil — c'est exactement ce que fait un filtre de tableur.",
          "On compare chaque ligne à l'objectif, sans supposer que la colonne est ordonnée.",
          `Les valeurs, remises dans l'ordre : ${triees.join(", ")}. ` +
            `Au-dessus de $${objectif}$ : ${triees.slice(rang).join(", ")} — soit $${combien}$ mois sur $6$.`,
          `$${combien}$ mois ont dépassé l'objectif.`
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

  {
    // ANGLE 2 — CRITIQUER un graphique déjà choisi. Le premier item désigne la
    // bonne représentation ; celui-ci en montre une inadaptée et demande
    // pourquoi. Dire ce qui cloche vaut mieux que reconnaître ce qui convient :
    // c'est ce qu'on demande devant le graphique d'un journal.
    kind: "template",
    id: "stmg_tab_choisir_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "tableur_recopie",
    microId: "tab_choisir_representation",
    difficulty: 3,
    theme: "neutral",
    hint: "Un camembert montre des parts d'un TOUT : que vaudrait la « part » d'une année ?",
    tags: ["stmg", "maths", "tableur", "canvas", "diagnostic", "template"],
    generate: () => {
      const annees = ["2021", "2022", "2023", "2024", "2025"];
      const valeurs = annees.map(() => randomInt(20, 60) * 10);
      const bonne =
        "les années ne forment pas un tout dont on partagerait les parts : on veut voir une évolution";
      return {
        text:
          `On a représenté le chiffre d'affaires annuel d'une entreprise par un diagramme circulaire. ` +
          `Pourquoi ce choix est-il inadapté ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          "un diagramme circulaire ne peut pas afficher plus de quatre catégories",
          "les valeurs sont trop grandes pour un diagramme circulaire",
          "il aurait fallu convertir les montants en pourcentages avant de tracer",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: {
          kind: "stat_graph",
          graphType: "camembert",
          title: "Chiffre d'affaires annuel (k€) — représentation à critiquer",
          data: annees.map((label, k) => ({ label, value: valeurs[k] })),
          display: { showValues: true, showLabels: true },
        } satisfies CanvasFigure,
        explanation: exp(
          "Un diagramme circulaire représente la répartition d'un TOUT en parts : il suppose que les catégories s'additionnent en un ensemble qui a un sens. Une chronologie n'est pas un tout à partager.",
          "On se demande ce que signifierait la part de chaque secteur — puis ce que la représentation empêche de voir.",
          `Ici, le secteur de $${annees[0]}$ vaudrait « $${fr(Math.round((valeurs[0] / valeurs.reduce((s, v) => s + v, 0)) * 1000) / 10)}\\,\\%$ du chiffre d'affaires des cinq années » : ` +
            `une information dont personne n'a l'usage. Et surtout, le camembert cache l'essentiel — la progression, ou la chute, d'une année sur l'autre. ` +
            `Une courbe la montrerait d'un coup d'œil.`,
          `Le choix est inadapté parce que ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: "un diagramme circulaire ne peut pas afficher plus de quatre catégories",
            cause: "aucune limite technique n'est en cause : c'est la NATURE des données qui ne convient pas",
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

  {
    // ANGLE 2 — TRADUIRE une phrase en condition. Le premier item compte les
    // lignes retenues par un filtre déjà écrit ; celui-ci part du français —
    // « les clients à la fois anciens et importants » — et demande la
    // condition. C'est le geste du filtre de tableur, et le « et » y a un sens
    // strict : les deux à la fois.
    kind: "template",
    id: "stmg_logique_et_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "logique_connecteurs",
    microId: "logique_et",
    difficulty: 3,
    theme: "neutral",
    hint: "« À la fois » se traduit par `and` : les deux conditions doivent être vraies en même temps.",
    tags: ["stmg", "maths", "logique", "python", "template"],
    generate: () => {
      const seuilCa = randomInt(30, 60) * 100;
      const seuilAnc = randomInt(3, 10);
      const bonne = `\`if ca > ${seuilCa} and anc > ${seuilAnc}:\``;
      return {
        text:
          `On veut retenir les clients dont le chiffre d'affaires dépasse $${seuilCa}$ € ` +
          `ET dont l'ancienneté dépasse $${seuilAnc}$ ans. ` +
          `Quelle condition faut-il écrire ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `\`if ca > ${seuilCa} or anc > ${seuilAnc}:\``,
          `\`if ca > ${seuilCa}:\``,
          `\`if ca > ${seuilCa} and anc < ${seuilAnc}:\``,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le connecteur ET n'est vrai que si les DEUX propositions le sont : il RESTREINT la sélection. Le OU, lui, l'élargit.",
          "On traduit chaque exigence de la phrase, puis on les relie par le connecteur qui correspond à « et ».",
          `« dépasse $${seuilCa}$ € » donne \`ca > ${seuilCa}\`, « dépasse $${seuilAnc}$ ans » donne \`anc > ${seuilAnc}\`, ` +
            `et « ET » les relie par \`and\`. ` +
            `Avec \`or\`, un client récent mais gros passerait le filtre — ce n'est pas ce qu'on demande.`,
          `La condition est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `\`if ca > ${seuilCa} or anc > ${seuilAnc}:\``,
            cause: "le `or` retient les clients qui vérifient UNE seule des deux exigences",
          },
        ],
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

  {
    // ANGLE 2 — comparer les DEUX filtres sur les mêmes données. Le premier
    // item compte les lignes retenues par un `or` ; celui-ci met les deux
    // comptages face à face et demande si l'écart est cohérent. Le OU retient
    // toujours au moins autant que le ET — un élève qui trouve l'inverse a
    // interverti ses connecteurs.
    kind: "template",
    id: "stmg_logique_ou_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "logique_connecteurs",
    microId: "logique_ou",
    difficulty: 3,
    theme: "neutral",
    hint: "Tout client retenu par le ET est aussi retenu par le OU : le second groupe contient le premier.",
    tags: ["stmg", "maths", "logique", "template"],
    generate: () => {
      const avecEt = randomInt(3, 12);
      const avecOu = avecEt + randomInt(4, 20);
      const total = avecOu + randomInt(5, 30);
      const bonne = `oui : tout client retenu par le ET l'est aussi par le OU, donc le OU en retient toujours au moins autant`;
      return {
        text:
          `Sur un fichier de $${total}$ clients, un filtre « chiffre d'affaires élevé ET ancienneté élevée » ` +
          `retient $${avecEt}$ clients ; le filtre « chiffre d'affaires élevé OU ancienneté élevée » en retient $${avecOu}$. ` +
          `Ce résultat est-il cohérent ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `non : le ET devrait retenir plus de clients que le OU, puisqu'il pose deux conditions`,
          `non : les deux filtres devraient donner le même nombre`,
          `on ne peut pas le dire sans connaître les deux seuils`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le connecteur ET exige les deux propositions ; le OU se contente d'une. Le groupe retenu par le ET est donc TOUJOURS inclus dans celui retenu par le OU.",
          "On raisonne par inclusion : un client qui vérifie les deux conditions en vérifie forcément au moins une.",
          `Ici $${avecEt} \\leqslant ${avecOu}$ : cohérent. ` +
            `Les $${avecOu - avecEt}$ clients de l'écart ne vérifient qu'UNE des deux conditions. ` +
            `Poser deux exigences au lieu d'une ne peut que réduire le nombre de lignes retenues, jamais l'augmenter.`,
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: `non : le ET devrait retenir plus de clients que le OU, puisqu'il pose deux conditions`,
            cause: "confond le nombre de CONDITIONS et le nombre de lignes retenues : plus on exige, moins on retient",
          },
        ],
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

  {
    // ANGLE 2 — nier « TOUS » et « AU MOINS UN ». Le premier item nie une
    // inégalité ; celui-ci nie une proposition portant sur une population
    // entière, et le renversement surprend : le contraire de « tous » n'est pas
    // « aucun ». C'est l'erreur qui fait rater les contrôles qualité.
    kind: "template",
    id: "stmg_logique_non_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "logique_connecteurs",
    microId: "logique_non",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour qu'« ils sont TOUS conformes » soit faux, il suffit d'UN seul qui ne le soit pas.",
    tags: ["stmg", "maths", "logique", "template"],
    generate: () => {
      const cas = pick([
        {
          prop: "tous les colis sont arrivés à l'heure",
          bonne: "au moins un colis n'est pas arrivé à l'heure",
          pieges: [
            "aucun colis n'est arrivé à l'heure",
            "tous les colis sont arrivés en retard",
            "la moitié des colis sont arrivés à l'heure",
          ],
        },
        {
          prop: "toutes les pièces du lot sont conformes",
          bonne: "au moins une pièce du lot n'est pas conforme",
          pieges: [
            "aucune pièce du lot n'est conforme",
            "toutes les pièces du lot sont défectueuses",
            "la plupart des pièces du lot sont conformes",
          ],
        },
        {
          prop: "au moins un client a renouvelé son contrat",
          bonne: "aucun client n'a renouvelé son contrat",
          pieges: [
            "tous les clients ont renouvelé leur contrat",
            "au moins un client n'a pas renouvelé son contrat",
            "un seul client a renouvelé son contrat",
          ],
        },
        {
          prop: "au moins une machine est en panne",
          bonne: "aucune machine n'est en panne",
          pieges: [
            "toutes les machines sont en panne",
            "au moins une machine n'est pas en panne",
            "une seule machine est en panne",
          ],
        },
      ] as const);
      return {
        text: `Quelle est la négation de la proposition « ${cas.prop} » ?`,
        format: "qcm",
        choices: shuffle([cas.bonne, ...cas.pieges]),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Nier « TOUS vérifient » donne « AU MOINS UN ne vérifie pas » ; nier « au moins un vérifie » donne « AUCUN ne vérifie ». Le quantificateur se retourne en même temps que la propriété.",
          "On se demande ce qu'il faut, au minimum, pour que la proposition soit FAUSSE.",
          cas.prop.startsWith("tous") || cas.prop.startsWith("toutes")
            ? `Un seul contre-exemple suffit à rendre la proposition fausse : il n'est pas nécessaire que tous le soient. ` +
              `« ${cas.pieges[0]} » est bien plus fort que la négation — c'est une autre proposition, qui peut être fausse elle aussi.`
            : `Pour que « ${cas.prop} » soit fausse, il faut qu'AUCUN cas ne se produise. ` +
              `« ${cas.pieges[0]} » est bien plus fort que nécessaire.`,
          `La négation est : « ${cas.bonne} ».`
        ),
        choiceDiagnostics: [
          {
            choice: cas.pieges[0],
            cause: "a nié la propriété sans retourner le quantificateur : c'est une proposition plus forte que la négation",
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

  {
    // ANGLE 2 — TROUVER le contre-exemple, pas le nommer. Le premier item
    // demande la MÉTHODE de réfutation ; celui-ci exige de la mettre en œuvre :
    // parmi quatre nombres, un seul met l'affirmation en défaut. On ne peut pas
    // y répondre en récitant.
    kind: "template",
    id: "stmg_logique_contre_exemple_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "logique_raisonnement",
    microId: "logique_contre_exemple",
    difficulty: 3,
    theme: "neutral",
    hint: "Teste les quatre nombres un par un : il en suffit d'un qui échoue.",
    tags: ["stmg", "maths", "logique", "template"],
    generate: () => {
      const cas = pick([
        {
          affirmation: "« Le carré d'un nombre est toujours supérieur à ce nombre »",
          contre: "0,5",
          autres: ["3", "7", "12"],
          pourquoi: "$0{,}5^2 = 0{,}25$, qui est plus PETIT que $0{,}5$",
        },
        {
          affirmation: "« Tout nombre est plus petit que son double »",
          contre: "-4",
          autres: ["2", "9", "15"],
          pourquoi: "le double de $-4$ vaut $-8$, qui est plus petit que $-4$",
        },
        {
          affirmation: "« Une hausse puis une baisse du même pourcentage ramènent au prix initial »",
          contre: "un prix de 100 € avec 50 %",
          autres: ["un prix de 100 € avec 0 %", "un prix de 200 € avec 0 %", "un prix nul avec 30 %"],
          pourquoi: "$100 \\times 1{,}5 \\times 0{,}5 = 75$, et non $100$",
        },
        {
          // ⛔ Les trois autres cas opposent un nombre NÉGATIF à un positif :
          // l'inverse d'un négatif reste négatif, donc l'affirmation y tient.
          // Avec des paires de nombres égaux, la bonne réponse se repérait à
          // l'œil — c'était la seule à comporter deux nombres différents.
          affirmation: "« Un nombre plus grand a toujours un inverse plus grand »",
          contre: "comparer 2 et 4",
          autres: ["comparer -2 et 3", "comparer -4 et 1", "comparer -1 et 5"],
          pourquoi: "$\\dfrac{1}{2} = 0{,}5$ est plus GRAND que $\\dfrac{1}{4} = 0{,}25$, alors que $2 < 4$",
        },
      ] as const);
      return {
        text: `Lequel de ces cas RÉFUTE l'affirmation suivante ?\n\n${cas.affirmation}`,
        format: "qcm",
        choices: shuffle([cas.contre, ...cas.autres]),
        expected: [cas.contre],
        comparator: "mcq_exact",
        explanation: exp(
          "Un contre-exemple est un cas particulier où l'affirmation est FAUSSE. Un seul suffit à la réfuter — et les cas où elle est vraie, si nombreux soient-ils, ne prouvent rien.",
          "On essaie les propositions une à une, en cherchant celle qui met l'affirmation en défaut.",
          `Avec « ${cas.contre} » : ${cas.pourquoi}. L'affirmation tombe. ` +
            `Les trois autres cas la vérifient — ils ne prouvent rien, ni dans un sens ni dans l'autre.`,
          `Le contre-exemple est « ${cas.contre} ».`
        ),
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

  {
    // ANGLE 2 — ÉCRIRE la réciproque, avant de la juger. Le premier item la
    // donne toute faite et demande si elle tient ; celui-ci demande de la
    // former, et les pièges sont les deux fausses manœuvres : nier au lieu
    // d'échanger, ou ne retourner qu'une moitié de la phrase.
    kind: "template",
    id: "stmg_logique_reciproque_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "logique_raisonnement",
    microId: "logique_reciproque",
    difficulty: 3,
    theme: "neutral",
    hint: "La réciproque ÉCHANGE l'hypothèse et la conclusion — elle ne nie rien.",
    tags: ["stmg", "maths", "logique", "template"],
    generate: () => {
      // ⛔⛔ Les deux membres doivent être ÉCHANGEABLES tels quels : avec
      // « une suite est géométrique » d'un côté et « elle est croissante » de
      // l'autre, la réciproque s'écrivait « si elle est croissante, alors une
      // suite est géométrique » — un pronom sans antécédent. Chaque membre
      // porte donc son sujet, et sa forme niée est rangée avec lui.
      const cas = pick([
        {
          a: "le prix augmente de 20 %",
          b: "le prix est multiplié par 1,2",
          nonA: "le prix n'augmente pas de 20 %",
          nonB: "le prix n'est pas multiplié par 1,2",
        },
        {
          a: "la suite est géométrique de raison 2",
          b: "la suite est croissante",
          nonA: "la suite n'est pas géométrique de raison 2",
          nonB: "la suite n'est pas croissante",
        },
        {
          a: "le nombre est le carré d'un entier",
          b: "le nombre est positif",
          nonA: "le nombre n'est pas le carré d'un entier",
          nonB: "le nombre est strictement négatif",
        },
        {
          a: "la dérivée est positive sur un intervalle",
          b: "la fonction est croissante sur cet intervalle",
          nonA: "la dérivée n'est pas positive sur cet intervalle",
          nonB: "la fonction n'est pas croissante sur cet intervalle",
        },
        {
          a: "le client commande plus de 200 €",
          b: "le client ne paie pas de frais de port",
          nonA: "le client commande au plus 200 €",
          nonB: "le client paie des frais de port",
        },
      ] as const);
      const bonne = `si ${cas.b}, alors ${cas.a}`;
      return {
        text: `Quelle est la RÉCIPROQUE de la proposition « si ${cas.a}, alors ${cas.b} » ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `si ${cas.nonA}, alors ${cas.nonB}`,
          `si ${cas.nonB}, alors ${cas.nonA}`,
          `${cas.a} et ${cas.b} sont toujours vrais en même temps`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La RÉCIPROQUE de « si A alors B » est « si B alors A » : on échange l'hypothèse et la conclusion, sans rien nier. À ne pas confondre avec la CONTRAPOSÉE, « si non B alors non A », qui est toujours vraie quand la proposition l'est.",
          "On repère A et B, puis on les remet dans l'autre ordre.",
          `Ici A = « ${cas.a} » et B = « ${cas.b} » : la réciproque est « si ${cas.b}, alors ${cas.a} ». ` +
            `La proposition « si ${cas.nonB}, alors ${cas.nonA} » est sa CONTRAPOSÉE — une tout autre chose, ` +
            `qui a exactement la même valeur de vérité que la proposition de départ.`,
          `La réciproque est : « ${bonne} ».`
        ),
        choiceDiagnostics: [
          {
            choice: `si ${cas.nonB}, alors ${cas.nonA}`,
            cause: "c'est la contraposée, pas la réciproque : elle est vraie dès que la proposition l'est",
          },
        ],
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

  {
    // ANGLE 2 — l'ÉQUIVALENCE, le troisième mot du libellé. Le premier item
    // range une condition du côté nécessaire ou suffisant ; celui-ci demande
    // quand les deux se rejoignent. Une équivalence n'est pas un cas de figure
    // parmi d'autres : c'est le seul où l'implication tient DANS LES DEUX SENS,
    // et c'est ce qui autorise à écrire « si et seulement si ».
    kind: "template",
    id: "stmg_logique_ns_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "logique_raisonnement",
    microId: "logique_necessaire_suffisante",
    difficulty: 3,
    theme: "neutral",
    hint: "Il y a équivalence quand la proposition ET sa réciproque sont vraies : essaie de retourner chaque phrase.",
    tags: ["stmg", "maths", "logique", "template"],
    generate: () => {
      const t = pick([5, 10, 20, 25] as const);
      const q = fr(1 + t / 100);
      // Une seule paire est une VRAIE équivalence : les trois autres ont une
      // réciproque fausse, et c'est ce qui les élimine.
      const equivalences = [
        `un prix est multiplié par $${q}$ et il augmente de $${t}\\,\\%$`,
        `deux évènements sont incompatibles et leur intersection est vide`,
        `une fonction est constante et sa courbe est une droite horizontale`,
      ];
      const nonEquivalences = [
        `une suite est géométrique de raison $2$ et elle est croissante`,
        `un nombre est le carré d'un entier et il est positif`,
        `une fonction est affine de coefficient directeur $3$ et sa courbe est une droite`,
        `un nombre est supérieur à $10$ et il est positif`,
      ];
      const bonne = pick(equivalences);
      const autres = shuffle(nonEquivalences).slice(0, 3);
      return {
        text:
          `Dans laquelle de ces paires de propositions y a-t-il ÉQUIVALENCE, ` +
          `c'est-à-dire où l'on peut écrire « si et seulement si » ?`,
        format: "qcm",
        choices: shuffle([bonne, ...autres]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Il y a ÉQUIVALENCE entre A et B quand « si A alors B » et « si B alors A » sont toutes deux vraies. A est alors à la fois nécessaire et suffisante pour B, et l'on écrit « A si et seulement si B ».",
          "On teste l'implication dans les deux sens, en cherchant un contre-exemple pour le sens retour.",
          `Dans la bonne paire, les deux propositions se déduisent l'une de l'autre : ce sont deux façons de dire la même chose. ` +
            `Dans les autres, le sens retour tombe — une suite croissante n'a aucune raison d'être géométrique de raison $2$, ` +
            `un nombre positif n'est pas forcément le carré d'un entier, une droite n'a pas forcément le coefficient directeur annoncé, ` +
            `et un nombre positif peut être bien plus petit que $10$.`,
          `L'équivalence est : ${bonne}.`
        ),
      };
    },
  },
];
