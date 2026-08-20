// lib/tutor-v4/questionBank/stmg/maths/exponentielles.bank.ts
//
// Notions : expo_definition, expo_variations, expo_proprietes,
//           expo_taux_moyen, expo_taux_equivalent
//           (domaine STMGEX — « Fonctions exponentielles », classe terminale)
//
// L'idée directrice du BO tient en une phrase : « le passage du discret au
// continu à partir des suites géométriques permet d'introduire les fonctions
// exponentielles de base a qui modélisent des phénomènes continus dont
// l'évolution relative instantanée est constante ».
//
// ⭐ D'où la figure qui revient dans tout ce fichier : le NUAGE de la suite
// géométrique et la COURBE continue qui le prolonge, tracés ensemble. Les
// points sont les mêmes ; la courbe remplit les trous. Un élève qui voit ça
// n'a plus besoin qu'on lui dise que $a^x$ « prolonge » $a^n$ — il le lit.
//
// ⛔ Suites géométriques et fonctions exponentielles à termes STRICTEMENT
// POSITIFS : toutes les bases tirées ici vérifient $a > 0$.
//
// ⚠️ Le taux d'évolution moyen est le point le plus glissant du domaine, et le
// programme le sait : il en fait une capacité à part entière. Le piège a donc
// sa micro — le taux moyen n'est PAS la moyenne des taux — parce qu'il ne se
// paramètre pas, il se raconte.

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

/**
 * La courbe de $x \mapsto k\,a^x$ ET le nuage des termes entiers.
 *
 * C'est la figure centrale du domaine : les points sont la suite géométrique,
 * la courbe est son prolongement continu. On les trace ensemble pour que le
 * lien se voie au lieu de s'énoncer.
 */
function canvasExponentielle(
  k: number,
  a: number,
  xmax: number,
  titre: string,
  options?: { avecNuage?: boolean; xmin?: number }
): CanvasFigure {
  const xmin = options?.xmin ?? 0;
  const f = (x: number) => k * Math.pow(a, x);
  const points: { x: number; y: number }[] = [];
  const pas = (xmax - xmin) / 60;
  for (let x = xmin; x <= xmax + 1e-9; x += pas) {
    points.push({ x: Math.round(x * 1000) / 1000, y: Math.round(f(x) * 1000) / 1000 });
  }
  const ys = points.map((p) => p.y);
  const nuage: { x: number; y: number }[] = [];
  if (options?.avecNuage !== false) {
    for (let n = Math.ceil(xmin); n <= xmax; n++) nuage.push({ x: n, y: Math.round(f(n) * 100) / 100 });
  }
  return {
    kind: "fonctionGraphique",
    titre,
    xmin: xmin - 0.3,
    xmax: xmax + 0.3,
    ymin: Math.floor(Math.min(...ys, 0)),
    ymax: Math.ceil(Math.max(...ys) * 1.1),
    grille: true,
    courbes: [{ id: "f", type: "points", points }],
    points: nuage,
  };
}

/* ─────────────────── réservoirs de contexte ─────────────────── */

const EVOLUTIONS = [
  { sujet: "un capital placé", unite: "€" },
  { sujet: "le chiffre d'affaires d'une enseigne", unite: "k€" },
  { sujet: "le nombre d'abonnés d'un service", unite: "abonnés" },
  { sujet: "la valeur d'un parc de machines", unite: "€" },
  { sujet: "la population d'une commune", unite: "habitants" },
  { sujet: "le stock d'invendus", unite: "articles" },
] as const;

export const exponentiellesBank: TutorBankItemV4[] = [
  /* ═══════════════════ expoT_reconnaitre ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_reconnaitre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_definition",
    microId: "expoT_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans une fonction exponentielle, c'est l'EXPOSANT qui varie, pas la base.",
    tags: ["stmg", "maths", "exponentielle", "template"],
    generate: () => {
      // L'énoncé est constant : toute la variété vit dans les propositions.
      // Le réservoir de bases doit donc être large, sinon la micro ne produit
      // que huit questions réellement distinctes.
      const a = pick([1.05, 1.1, 1.2, 1.25, 1.4, 1.5, 2, 2.5, 3, 4, 0.5, 0.6, 0.75, 0.8, 0.9, 0.95] as const);
      const n = pick([2, 3, 4] as const);
      const k = pick([2, 3, 5, 10] as const);
      const bonne = `$f(x) = ${fr(a)}^x$`;
      return {
        text: "Parmi ces expressions, laquelle définit une fonction exponentielle ?",
        format: "qcm",
        choices: makeChoices(bonne, [
          `$f(x) = x^{${n}}$`,
          `$f(x) = ${k}x$`,
          `$f(x) = ${k}x^2$`,
          `$f(x) = \\dfrac{${k}}{x}$`,
          `$f(x) = ${fr(a)}x$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fonction exponentielle de base $a$ (avec $a > 0$) s'écrit $x \\mapsto a^x$ : la variable est à l'EXPOSANT et la base est un nombre fixe.",
          "On regarde où se trouve $x$ : à l'exposant, c'est une exponentielle ; à la base, c'est une fonction puissance.",
          `$${fr(a)}^x$ a bien sa variable en exposant, tandis que $x^{${n}}$ a sa variable en base : ce n'est pas la même chose.`,
          `La fonction exponentielle est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$f(x) = x^{${n}}$`,
            cause: "a confondu fonction puissance (variable en base) et fonction exponentielle (variable en exposant)",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — reconnaître l'exponentielle DANS UNE SITUATION. Le premier item
    // trie quatre écritures, ce qui est un exercice de forme ; celui-ci part
    // d'une phrase de gestion — « augmente de $4\,\%$ par an » — et demande la
    // fonction. C'est le geste que le BO met en avant : modéliser une évolution
    // relative constante.
    kind: "template",
    id: "stmg_expo_reconnaitre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_definition",
    microId: "expoT_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Un pourcentage répété donne un coefficient multiplicateur, et ce coefficient devient la BASE.",
    tags: ["stmg", "maths", "exponentielle", "gestion", "template"],
    generate: () => {
      const evo = pick(EVOLUTIONS);
      const v0 = pick([200, 500, 800, 1000, 1500, 2000] as const);
      const t = pick([2, 3, 4, 5, 8, 10, 12, 15] as const);
      const hausse = Math.random() < 0.5;
      const q = 1 + (hausse ? t : -t) / 100;
      const bonne = `$f(x) = ${v0} \\times ${fr(q)}^x$`;
      return {
        text:
          `${evo.sujet.charAt(0).toUpperCase()}${evo.sujet.slice(1)} vaut $${v0}$ ${evo.unite} aujourd'hui ` +
          `et ${hausse ? "augmente" : "diminue"} de $${t}\\,\\%$ par an. ` +
          `Quelle fonction modélise sa valeur au bout de $x$ années ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `$f(x) = ${v0} \\times ${fr(1 - (hausse ? t : -t) / 100)}^x$`,
          `$f(x) = ${v0} \\times ${fr(t / 100)}^x$`,
          `$f(x) = ${v0} ${hausse ? "+" : "-"} ${t}x$`,
          `$f(x) = ${v0} \\times x^{${fr(q)}}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une évolution en pourcentage RÉPÉTÉE se modélise par une fonction exponentielle : la valeur initiale multiplie une puissance du coefficient multiplicateur, et la variable est à l'exposant.",
          "On traduit le pourcentage en coefficient, puis on place ce coefficient en base et la durée en exposant.",
          `${hausse ? "Une hausse" : "Une baisse"} de $${t}\\,\\%$ donne le coefficient $1 ${hausse ? "+" : "-"} ${fr(t / 100)} = ${fr(q)}$, ` +
            `donc $f(x) = ${v0} \\times ${fr(q)}^x$.`,
          `La fonction est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$f(x) = ${v0} ${hausse ? "+" : "-"} ${t}x$`,
            cause: "a modélisé par une fonction affine : ce serait une évolution de $" + t + "$ unités par an, pas de " + t + " %",
          },
          {
            choice: `$f(x) = ${v0} \\times x^{${fr(q)}}$`,
            cause: "a interverti la base et l'exposant",
          },
        ],
      };
    },
  },

  /* ═══════════════════ expoT_prolongement ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_prolongement_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_definition",
    microId: "expoT_prolongement",
    difficulty: 3,
    theme: "neutral",
    hint: "Les points marqués sont les termes de la suite ; la courbe passe exactement par eux.",
    tags: ["stmg", "maths", "exponentielle", "suites", "canvas", "template", "short"],
    generate: () => {
      const evo = pick(EVOLUTIONS);
      const u0 = pick([100, 200, 400, 500, 800, 1000] as const);
      const t = pick([10, 20, 25, 50] as const);
      const a = 1 + t / 100;
      const x = pick([1.5, 2.5, 3.5, 4.5] as const);
      const valeur = u0 * Math.pow(a, x);
      return {
        text:
          `${evo.sujet.charAt(0).toUpperCase()}${evo.sujet.slice(1)} vaut $${u0}$ ${evo.unite} et augmente de $${t}\\,\\%$ par an. ` +
          `Les points marqués donnent la valeur en fin d'année ; la courbe prolonge la suite entre ces points. ` +
          `Quelle est la valeur au bout de $${fr(x)}$ années, à l'unité près ?`,
        format: "short",
        expected: [fr(Math.round(valeur))],
        comparator: "number_equal",
        canvas: canvasExponentielle(u0, a, 6, `${evo.sujet} : la suite et son prolongement`),
        explanation: exp(
          "La fonction $x \\mapsto u_0 \\times a^x$ prolonge la suite géométrique $(u_0 a^n)$ : elle passe par tous ses points et permet de lire des durées NON entières.",
          "On garde la même base — le coefficient multiplicateur — et on remplace le rang entier par une durée réelle.",
          `$a = ${fr(a)}$, donc la valeur au bout de $${fr(x)}$ ans vaut ` +
            `$${u0} \\times ${fr(a)}^{${fr(x)}} \\approx ${fr(Math.round(valeur))}$ ${evo.unite}.`,
          `Au bout de $${fr(x)}$ années, on obtient environ $${fr(Math.round(valeur))}$ ${evo.unite}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — À QUOI SERT le prolongement. Le premier item calcule une valeur
    // à une date non entière ; celui-ci demande de dire POURQUOI la fonction
    // apporte quelque chose que la suite ne donne pas. C'est la phrase du BO —
    // « le passage du discret au continu » — transformée en question.
    // ⚠️ Sans figure : le nuage et la courbe sont dans le premier item ; ici on
    // demande ce qu'ils signifient, pas ce qu'on y lit.
    kind: "template",
    id: "stmg_expo_prolongement_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_definition",
    microId: "expoT_prolongement",
    difficulty: 3,
    theme: "neutral",
    hint: "Une suite ne donne des valeurs qu'aux rangs entiers : $u(2)$, $u(3)$… mais rien entre les deux.",
    tags: ["stmg", "maths", "exponentielle", "suites", "template"],
    generate: () => {
      const evo = pick(EVOLUTIONS);
      const t = pick([5, 8, 10, 15, 20, 25] as const);
      const mois = pick([6, 9, 18, 30] as const);
      const bonne = `elle donne aussi la valeur à des dates intermédiaires, comme au bout de $${mois}$ mois`;
      return {
        text:
          `${evo.sujet.charAt(0).toUpperCase()}${evo.sujet.slice(1)} augmente de $${t}\\,\\%$ par an. ` +
          `On peut le modéliser par une suite géométrique, ou par la fonction exponentielle qui la prolonge. ` +
          `Qu'apporte la fonction que la suite ne donnait pas ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          "elle donne la valeur au bout de $3$ ans, ce que la suite ne permettait pas",
          "elle change le taux d'évolution en le rendant continu",
          "elle permet des valeurs négatives, contrairement à la suite",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite n'a de valeurs qu'aux rangs ENTIERS. La fonction exponentielle passe par tous ces points et remplit les intervalles : elle donne un sens à une durée quelconque.",
          "On se demande ce que l'on peut demander à l'une et pas à l'autre : une durée non entière.",
          `Au bout de $${mois}$ mois, soit $${fr(mois / 12)}$ année(s), la suite ne dit rien — il n'y a pas de terme de rang $${fr(mois / 12)}$. ` +
            `La fonction, elle, calcule $${fr(1 + t / 100)}^{${fr(mois / 12)}}$. En revanche, au bout de $3$ ans, les deux répondent la même chose : ` +
            `la courbe passe exactement par les points de la suite.`,
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: "elle donne la valeur au bout de $3$ ans, ce que la suite ne permettait pas",
            cause: "aux rangs entiers, la suite et la fonction donnent exactement la même valeur",
          },
        ],
      };
    },
  },

  /* ═══════════════════ expoT_calculer_image ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_image_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_definition",
    microId: "expoT_calculer_image",
    difficulty: 2,
    theme: "neutral",
    hint: "$a^x$ : on multiplie $a$ par lui-même $x$ fois quand $x$ est entier.",
    tags: ["stmg", "maths", "exponentielle", "template", "short"],
    generate: () => {
      const a = pick([2, 3, 4, 5, 10, 1.5, 0.5] as const);
      const x = randomInt(2, 6);
      return {
        text: `Soit $f(x) = ${fr(a)}^x$. Calcule $f(${x})$.`,
        format: "short",
        expected: [fr(Math.pow(a, x))],
        comparator: "number_equal",
        explanation: exp(
          "Pour un exposant entier, $a^x$ est le produit de $x$ facteurs égaux à $a$.",
          "On multiplie la base par elle-même autant de fois que l'indique l'exposant.",
          `$${fr(a)}^{${x}} = ${Array.from({ length: x }, () => fr(a)).join(" \\times ")} = ${fr(Math.pow(a, x))}$.`,
          `$f(${x}) = ${fr(Math.pow(a, x))}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — l'EXPOSANT cherché, pas l'image. Le premier item calcule
    // $a^x$ ; celui-ci donne le résultat et demande l'exposant. On y répond par
    // essais — le logarithme n'est pas encore là —, et c'est justement ce
    // tâtonnement qui prépare sa nécessité.
    kind: "template",
    id: "stmg_expo_image_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_definition",
    microId: "expoT_calculer_image",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie la base par elle-même en comptant les étapes, jusqu'à tomber sur le résultat.",
    tags: ["stmg", "maths", "exponentielle", "template", "short"],
    generate: () => {
      const a = pick([2, 3, 4, 5, 10] as const);
      const x = randomInt(2, a === 2 ? 8 : a === 3 ? 5 : 4);
      const image = Math.pow(a, x);
      return {
        text: `Soit $f(x) = ${a}^x$. Pour quelle valeur de $x$ a-t-on $f(x) = ${image}$ ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "Résoudre $a^x = b$, c'est chercher combien de fois il faut multiplier $a$ par lui-même pour atteindre $b$. Quand la réponse est entière, elle se trouve par essais.",
          "On dresse la liste des puissances de la base jusqu'à rencontrer le nombre cherché.",
          `${Array.from({ length: x }, (_, i) => `$${a}^{${i + 1}} = ${fr(Math.pow(a, i + 1))}$`).join(" ; ")}. ` +
            `On atteint $${image}$ au rang $${x}$.`,
          `$x = ${x}$, car $${a}^{${x}} = ${image}$.`
        ),
      };
    },
  },

  /* ═══════════════════ expoT_exposant_negatif ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_negatif_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_definition",
    microId: "expoT_exposant_negatif",
    difficulty: 2,
    theme: "neutral",
    hint: "$a^{-x} = \\dfrac{1}{a^x}$ — un exposant négatif donne l'inverse, jamais un nombre négatif.",
    tags: ["stmg", "maths", "exponentielle", "template"],
    generate: () => {
      const a = pick([2, 3, 4, 5, 10] as const);
      const x = randomInt(1, 4);
      const valeur = 1 / Math.pow(a, x);
      return {
        text: `Que vaut $${a}^{-${x}}$ ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(valeur)}$`, [
          `$-${fr(Math.pow(a, x))}$`,
          `$${fr(Math.pow(a, x))}$`,
          `$-${fr(valeur)}$`,
          `$${fr(-a * x)}$`,
          `$${fr(1 / (a * x))}$`,
        ]),
        expected: [`$${fr(valeur)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un exposant négatif désigne l'INVERSE : $a^{-x} = \\dfrac{1}{a^{x}}$.",
          "On calcule la puissance positive, puis on prend son inverse — le résultat reste strictement positif.",
          `$${a}^{${x}} = ${fr(Math.pow(a, x))}$, donc $${a}^{-${x}} = \\dfrac{1}{${fr(Math.pow(a, x))}} = ${fr(valeur)}$.`,
          `$${a}^{-${x}} = ${fr(valeur)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$-${fr(Math.pow(a, x))}$`,
            cause: "a transformé l'exposant négatif en résultat négatif : une exponentielle est toujours strictement positive",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — l'exposant négatif REMONTE LE TEMPS. Le premier item calcule
    // $a^{-x}$ ; celui-ci lui donne son sens en gestion : dans un modèle où $x$
    // compte les années écoulées, $f(-2)$ est la valeur d'il y a deux ans. Un
    // élève qui sait calculer sans savoir cela ne reconnaîtra jamais la
    // question au bac.
    kind: "template",
    id: "stmg_expo_negatif_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_definition",
    microId: "expoT_exposant_negatif",
    difficulty: 3,
    theme: "neutral",
    hint: "Si $x$ compte les années À PARTIR d'aujourd'hui, que peut bien désigner $x = -2$ ?",
    tags: ["stmg", "maths", "exponentielle", "gestion", "template"],
    generate: () => {
      const evo = pick(EVOLUTIONS);
      const v0 = pick([400, 500, 800, 1000, 2000] as const);
      const t = pick([5, 10, 20, 25] as const);
      const q = 1 + t / 100;
      const recul = pick([2, 3] as const);
      const valeur = v0 / Math.pow(q, recul);
      const bonne = `la valeur d'il y a $${recul}$ ans, soit environ $${fr(Math.round(valeur))}$ ${evo.unite}`;
      return {
        text:
          `${evo.sujet.charAt(0).toUpperCase()}${evo.sujet.slice(1)} vaut $${v0}$ ${evo.unite} aujourd'hui ` +
          `et augmente de $${t}\\,\\%$ par an. On le modélise par $f(x) = ${v0} \\times ${fr(q)}^x$, ` +
          `où $x$ compte les années à partir d'aujourd'hui. Que représente $f(-${recul})$ ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `la valeur dans $${recul}$ ans, soit environ $${fr(Math.round(v0 * Math.pow(q, recul)))}$ ${evo.unite}`,
          `une valeur négative : le modèle n'a plus de sens`,
          `la baisse totale sur $${recul}$ ans`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un exposant négatif désigne l'inverse : $a^{-x} = \\dfrac{1}{a^{x}}$. Dans un modèle où $x$ compte les années écoulées, un exposant négatif fait donc remonter le temps — et le résultat reste strictement positif.",
          "On calcule l'image, puis on la lit dans la situation.",
          `$f(-${recul}) = ${v0} \\times ${fr(q)}^{-${recul}} = \\dfrac{${v0}}{${fr(Math.round(Math.pow(q, recul) * 100000) / 100000)}} \\approx ${fr(Math.round(valeur))}$ ${evo.unite}. ` +
            `On vérifie : en appliquant $${t}\\,\\%$ de hausse pendant $${recul}$ ans à cette valeur, on retombe sur $${v0}$.`,
          `$f(-${recul})$ donne la valeur d'il y a $${recul}$ ans : environ $${fr(Math.round(valeur))}$ ${evo.unite}.`
        ),
        choiceDiagnostics: [
          {
            choice: `une valeur négative : le modèle n'a plus de sens`,
            cause: "un exposant négatif donne l'INVERSE, pas un résultat négatif : une exponentielle est toujours strictement positive",
          },
        ],
      };
    },
  },

  /* ═══════════════════ expoT_sens_selon_a ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_sens_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_variations",
    microId: "expoT_sens_selon_a",
    difficulty: 2,
    theme: "neutral",
    hint: "On compare la base à $1$, pas à $0$.",
    tags: ["stmg", "maths", "exponentielle", "canvas", "template"],
    generate: () => {
      const a = pick([1.05, 1.1, 1.25, 1.5, 2, 3, 0.4, 0.5, 0.7, 0.8, 0.9, 0.95] as const);
      const croissante = a > 1;
      return {
        text: `Soit $f(x) = ${fr(a)}^x$. Quel est le sens de variation de $f$ ?`,
        format: "qcm",
        choices: shuffle(["croissante", "décroissante", "constante", "croissante puis décroissante"]),
        expected: [croissante ? "croissante" : "décroissante"],
        comparator: "mcq_exact",
        canvas: canvasExponentielle(1, a, 8, `Courbe de f(x) = ${fr(a)}^x`, { avecNuage: false }),
        explanation: exp(
          "Une fonction exponentielle $x \\mapsto a^x$ est croissante si $a > 1$, décroissante si $0 < a < 1$, constante si $a = 1$.",
          "On compare la base à $1$ — c'est le même critère que pour la raison d'une suite géométrique.",
          `Ici $a = ${fr(a)}$, ${croissante ? "supérieur" : "inférieur"} à $1$ : la courbe ${croissante ? "monte" : "descend"}.`,
          `$f$ est ${croissante ? "croissante" : "décroissante"}.`
        ),
        choiceDiagnostics: [
          {
            choice: croissante ? "décroissante" : "croissante",
            cause: "a comparé la base à 0 au lieu de la comparer à 1",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — TRIER les bases. Le premier item donne une base et demande le
    // sens ; celui-ci donne le sens et fait chercher la base parmi quatre. Le
    // critère est le même, mais l'élève qui a retenu « plus petit que 1 = ça
    // descend » sans savoir où est $1$ se trahit : trois des quatre bases sont
    // du mauvais côté.
    // ⚠️ Sans figure : la courbe donnerait le sens, et il n'y aurait plus rien
    // à décider. Le premier item porte la sienne.
    kind: "template",
    id: "stmg_expo_sens_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_variations",
    microId: "expoT_sens_selon_a",
    difficulty: 3,
    theme: "neutral",
    hint: "Le seuil est $1$, pas $0$ : une base de $0,95$ fait décroître, une base de $1,05$ fait croître.",
    tags: ["stmg", "maths", "exponentielle", "template"],
    generate: () => {
      const decroissante = Math.random() < 0.5;
      const petites = [0.4, 0.5, 0.65, 0.75, 0.8, 0.9, 0.95, 0.98];
      const grandes = [1.02, 1.05, 1.15, 1.3, 1.5, 2, 2.5, 4];
      const bonneBase = pick(decroissante ? petites : grandes);
      const autres = shuffle(decroissante ? grandes : petites).slice(0, 3);
      const ecrire = (base: number) => `$f(x) = ${fr(base)}^x$`;
      return {
        text: `Parmi ces quatre fonctions, laquelle est ${decroissante ? "DÉCROISSANTE" : "CROISSANTE"} ?`,
        format: "qcm",
        choices: shuffle([bonneBase, ...autres].map(ecrire)),
        expected: [ecrire(bonneBase)],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fonction exponentielle $x \\mapsto a^x$ est croissante si $a > 1$ et décroissante si $0 < a < 1$ : le seuil est $1$, jamais $0$.",
          "On compare chaque base à $1$ — exactement comme on compare la raison d'une suite géométrique.",
          `Ici $${fr(bonneBase)}$ est ${decroissante ? "inférieur" : "supérieur"} à $1$ : la fonction ${decroissante ? "décroît" : "croît"}. ` +
            `Les trois autres bases sont ${decroissante ? "supérieures" : "inférieures"} à $1$.`,
          `La fonction ${decroissante ? "décroissante" : "croissante"} est ${ecrire(bonneBase)}.`
        ),
      };
    },
  },

  /* ═══════════════════ expoT_allure ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_allure_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_variations",
    microId: "expoT_allure",
    difficulty: 2,
    theme: "neutral",
    hint: "Toutes les courbes exponentielles passent par le point $(0\\,;\\,1)$ quand le coefficient vaut $1$.",
    tags: ["stmg", "maths", "exponentielle", "canvas", "template"],
    generate: () => {
      const a = pick([1.2, 1.4, 1.6, 2, 2.5, 3, 0.4, 0.5, 0.6, 0.75, 0.85] as const);
      const croissante = a > 1;
      const bonne = croissante
        ? "une base strictement supérieure à $1$ : la courbe monte de plus en plus vite"
        : "une base comprise entre $0$ et $1$ : la courbe descend en s'aplatissant";
      return {
        text: "D'après la courbe tracée, que peut-on dire de la base $a$ de cette fonction exponentielle ?",
        format: "qcm",
        choices: makeChoices(bonne, [
          croissante
            ? "une base comprise entre $0$ et $1$ : la courbe descend en s'aplatissant"
            : "une base strictement supérieure à $1$ : la courbe monte de plus en plus vite",
          "une base négative",
          "une base égale à $1$",
          "une base égale à $0$",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasExponentielle(1, a, 8, "Courbe d'une fonction exponentielle", { avecNuage: false }),
        explanation: exp(
          "L'allure de la courbe de $x \\mapsto a^x$ dépend de la position de $a$ par rapport à $1$ : elle croît si $a > 1$, décroît si $0 < a < 1$. Elle reste toujours au-dessus de l'axe des abscisses.",
          "On regarde le sens de la courbe et l'on en déduit un encadrement de la base.",
          `Ici la courbe ${croissante ? "monte" : "descend"}, et elle reste strictement positive : la base vaut $${fr(a)}$.`,
          `Il s'agit ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: "une base négative",
            cause: "une fonction exponentielle n'est définie que pour une base strictement positive",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — le POINT COMMUN à toutes ces courbes. Le premier item lit
    // l'allure pour retrouver la base ; celui-ci demande ce qui ne change
    // JAMAIS, quelle que soit la base : le passage par $(0\,;\,1)$ et le fait
    // de rester au-dessus de l'axe. Deux repères qui permettent d'éliminer une
    // courbe fausse en une seconde.
    kind: "template",
    id: "stmg_expo_allure_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_variations",
    microId: "expoT_allure",
    difficulty: 2,
    theme: "neutral",
    hint: "Que vaut $a^0$, quelle que soit la base $a$ ?",
    tags: ["stmg", "maths", "exponentielle", "canvas", "template"],
    generate: () => {
      const a = pick([1.3, 1.5, 2, 3, 0.4, 0.6, 0.8] as const);
      const bonne = "elle passe par le point $(0\\,;\\,1)$ et reste au-dessus de l'axe des abscisses";
      return {
        text:
          `La courbe tracée est celle d'une fonction $x \\mapsto a^x$. ` +
          `Quelle propriété est vraie pour TOUTE fonction de cette forme, quelle que soit la base $a$ ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          "elle passe par l'origine du repère",
          "elle finit par couper l'axe des abscisses",
          "elle est croissante",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasExponentielle(1, a, 8, "Courbe d'une fonction exponentielle", { avecNuage: false, xmin: -3 }),
        explanation: exp(
          "Pour toute base $a > 0$, on a $a^0 = 1$ : toutes les courbes exponentielles passent par $(0\\,;\\,1)$. Et une puissance de base strictement positive ne s'annule jamais : la courbe reste au-dessus de l'axe des abscisses.",
          "On teste la valeur en $0$, puis on regarde le signe des images.",
          `Ici $a = ${fr(a)}$ et $f(0) = ${fr(a)}^0 = 1$. La courbe ${a > 1 ? "monte" : "descend"}, ` +
            `mais elle ne touchera jamais l'axe : $f(x)$ reste strictement positif.`,
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: "elle est croissante",
            cause: "c'est vrai seulement si la base dépasse $1$ ; l'énoncé demande ce qui vaut pour TOUTE base",
          },
          {
            choice: "elle passe par l'origine du repère",
            cause: "en $0$, l'image vaut $1$ et non $0$ : la courbe passe au-dessus de l'origine",
          },
        ],
      };
    },
  },

  /* ═══════════════════ expoT_role_k ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_role_k_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_variations",
    microId: "expoT_role_k",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplier par un $k$ NÉGATIF retourne la courbe, et inverse donc le sens de variation.",
    tags: ["stmg", "maths", "exponentielle", "canvas", "template"],
    generate: () => {
      const a = pick([1.2, 1.5, 2, 3, 0.5, 0.7, 0.8] as const);
      const k = pick([2, 3, 5, 10, -2, -3, -5] as const);
      // Croissante si (k > 0 et a > 1) ou (k < 0 et a < 1).
      const croissante = k > 0 === a > 1;
      return {
        text: `Soit $f(x) = ${k}\\times ${fr(a)}^x$. Quel est le sens de variation de $f$ ?`,
        format: "qcm",
        choices: shuffle(["croissante", "décroissante", "constante", "cela dépend de $x$"]),
        expected: [croissante ? "croissante" : "décroissante"],
        comparator: "mcq_exact",
        canvas: canvasExponentielle(k, a, 6, `Courbe de f(x) = ${k} × ${fr(a)}^x`, { avecNuage: false }),
        explanation: exp(
          "Pour $x \\mapsto k\\,a^x$, deux éléments décident : la position de $a$ par rapport à $1$, et le SIGNE de $k$. Un $k$ négatif retourne la courbe et inverse le sens de variation.",
          "On détermine d'abord le sens de $a^x$, puis on regarde si $k$ le conserve ou l'inverse.",
          `Ici $a = ${fr(a)}$ donne une exponentielle ${a > 1 ? "croissante" : "décroissante"}, et $k = ${k}$ est ${k > 0 ? "positif : le sens est conservé" : "négatif : le sens est inversé"}.`,
          `$f$ est ${croissante ? "croissante" : "décroissante"}.`
        ),
        choiceDiagnostics: [
          {
            choice: croissante ? "décroissante" : "croissante",
            cause: "n'a pas tenu compte du signe de k, qui retourne la courbe",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — ce que $k$ REPRÉSENTE, et non ce qu'il fait au sens de
    // variation. Le premier item regarde son signe ; celui-ci le lit dans la
    // situation : $k$ est la valeur de départ, celle du jour $0$. C'est le
    // premier nombre qu'on écrit quand on modélise, et le dernier qu'on
    // interroge.
    kind: "template",
    id: "stmg_expo_role_k_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_variations",
    microId: "expoT_role_k",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule $f(0)$ : la base élevée à la puissance zéro vaut $1$.",
    tags: ["stmg", "maths", "exponentielle", "gestion", "template"],
    generate: () => {
      const evo = pick(EVOLUTIONS);
      const k = pick([250, 400, 600, 1200, 1500, 3000] as const);
      const t = pick([4, 5, 8, 10, 15] as const);
      const q = 1 + t / 100;
      const bonne = `la valeur de départ, au temps $x = 0$`;
      return {
        text:
          `${evo.sujet.charAt(0).toUpperCase()}${evo.sujet.slice(1)} est modélisé par $f(x) = ${k} \\times ${fr(q)}^x$, ` +
          `où $x$ compte les années. Que représente le nombre $${k}$ ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `le taux d'évolution annuel`,
          `la valeur au bout d'un an`,
          `le nombre d'années de la période étudiée`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans $f(x) = k\\,a^x$, le coefficient $k$ est la valeur initiale : puisque $a^0 = 1$, on a $f(0) = k$. La base $a$, elle, porte le taux d'évolution.",
          "On calcule $f(0)$ pour identifier $k$, puis $f(1)$ pour voir ce que fait la base.",
          `$f(0) = ${k} \\times ${fr(q)}^0 = ${k} \\times 1 = ${k}$ : c'est bien la valeur de départ. ` +
            `Et $f(1) = ${k} \\times ${fr(q)} = ${fr(k * q)}$, soit $${t}\\,\\%$ de plus.`,
          `Le nombre $${k}$ est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `la valeur au bout d'un an`,
            cause: "la valeur au bout d'un an est $f(1)$, qui vaut $k$ multiplié par la base",
          },
        ],
      };
    },
  },

  /* ═══════════════════ expoT_lien_suite ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_lien_suite_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_variations",
    microId: "expoT_lien_suite",
    difficulty: 2,
    theme: "neutral",
    hint: "La base de l'exponentielle joue exactement le rôle de la raison de la suite.",
    tags: ["stmg", "maths", "exponentielle", "suites", "canvas", "template"],
    generate: () => {
      const u0 = pick([50, 100, 200, 400, 800] as const);
      const t = pick([10, 20, 25, 50] as const);
      const baisse = Math.random() < 0.5;
      const q = 1 + (baisse ? -t : t) / 100;
      return {
        text:
          `Une suite géométrique de premier terme $u(0) = ${u0}$ et de raison $q = ${fr(q)}$ est prolongée ` +
          `par la fonction $f(x) = ${u0} \\times ${fr(q)}^x$. Que peut-on dire des deux ?`,
        format: "qcm",
        choices: makeChoices(
          `elles ont le même sens de variation : ${baisse ? "décroissantes" : "croissantes"}`,
          [
            `elles ont le même sens de variation : ${baisse ? "croissantes" : "décroissantes"}`,
            "elles ont des sens de variation contraires",
            "la suite croît et la fonction est constante",
            "on ne peut pas comparer une suite et une fonction",
          ]
        ),
        expected: [`elles ont le même sens de variation : ${baisse ? "décroissantes" : "croissantes"}`],
        comparator: "mcq_exact",
        canvas: canvasExponentielle(u0, q, 7, "La suite (points) et la fonction qui la prolonge (courbe)"),
        explanation: exp(
          "La base de la fonction exponentielle est exactement la raison de la suite géométrique qu'elle prolonge : le critère de variation est donc le même — comparer à $1$.",
          "On compare $q$ à $1$ une seule fois : la conclusion vaut pour les deux objets.",
          `$q = ${fr(q)}$, ${q > 1 ? "supérieur" : "inférieur"} à $1$ : la suite et la fonction sont toutes deux ${baisse ? "décroissantes" : "croissantes"}. ` +
            `Sur la figure, la courbe passe exactement par les points de la suite.`,
          `Elles ont le même sens de variation : ${baisse ? "décroissantes" : "croissantes"}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — ÉCRIRE la fonction qui prolonge une suite donnée. Le premier
    // item compare les sens de variation ; celui-ci demande le passage d'une
    // écriture à l'autre, qui est le geste concret : la raison devient la base,
    // le premier terme devient le coefficient, le rang devient la variable.
    kind: "template",
    id: "stmg_expo_lien_suite_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_variations",
    microId: "expoT_lien_suite",
    difficulty: 3,
    theme: "neutral",
    hint: "Le terme général $u(n) = u_0 q^n$ devient $f(x) = u_0 q^x$ : seul le nom de la variable change.",
    tags: ["stmg", "maths", "exponentielle", "suites", "template"],
    generate: () => {
      const u0 = pick([50, 120, 300, 640, 900] as const);
      const t = pick([10, 15, 20, 25, 40] as const);
      const baisse = Math.random() < 0.5;
      const q = 1 + (baisse ? -t : t) / 100;
      const bonne = `$f(x) = ${u0} \\times ${fr(q)}^x$`;
      return {
        text:
          `Une suite géométrique a pour terme général $u(n) = ${u0} \\times ${fr(q)}^n$. ` +
          `Quelle fonction exponentielle la prolonge ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `$f(x) = ${u0} \\times x^{${fr(q)}}$`,
          `$f(x) = ${u0} \\times ${fr(q)} \\times x$`,
          `$f(x) = ${fr(q)} \\times ${u0}^x$`,
          `$f(x) = ${u0} + ${fr(q)}^x$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite géométrique $u(n) = u_0 q^n$ n'est définie qu'aux rangs entiers. La fonction $f(x) = u_0 q^x$, elle, accepte tout réel $x$ : c'est la même écriture, avec une variable continue.",
          "On recopie le premier terme comme coefficient, la raison comme base, et l'on remplace le rang $n$ par la variable $x$.",
          `$u(n) = ${u0} \\times ${fr(q)}^n$ devient $f(x) = ${u0} \\times ${fr(q)}^x$. ` +
            `Aux rangs entiers, les deux donnent la même valeur : $u(3) = f(3) = ${fr(Math.round(u0 * Math.pow(q, 3) * 100) / 100)}$.`,
          `La fonction qui prolonge la suite est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$f(x) = ${fr(q)} \\times ${u0}^x$`,
            cause: "a interverti le premier terme et la raison : c'est la RAISON qui devient la base",
          },
        ],
      };
    },
  },

  /* ═══════════════════ expoT_somme_exposants ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_somme_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_proprietes",
    microId: "expoT_somme_exposants",
    difficulty: 2,
    theme: "neutral",
    hint: "Un PRODUIT de deux puissances de même base : les exposants s'ADDITIONNENT.",
    tags: ["stmg", "maths", "exponentielle", "template"],
    generate: () => {
      const a = pick([1.05, 1.2, 1.5, 2, 3, 5, 0.8, 0.5] as const);
      const m = randomInt(2, 7);
      const n = randomInt(2, 7);
      return {
        text: `Écris $${fr(a)}^{${m}} \\times ${fr(a)}^{${n}}$ sous la forme d'une seule puissance de $${fr(a)}$.`,
        format: "qcm",
        choices: makeChoices(`$${fr(a)}^{${m + n}}$`, [
          `$${fr(a)}^{${m * n}}$`,
          `$${fr(a)}^{${Math.abs(m - n)}}$`,
          `$${fr(a * a)}^{${m + n}}$`,
          `$${fr(a)}^{${m + n + 1}}$`,
          `$${fr(a * a)}^{${m * n}}$`,
        ]),
        expected: [`$${fr(a)}^{${m + n}}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour tous réels $x$ et $y$ : $a^{x+y} = a^x \\times a^y$.",
          "On garde la base et on additionne les exposants.",
          `$${fr(a)}^{${m}} \\times ${fr(a)}^{${n}} = ${fr(a)}^{${m}+${n}} = ${fr(a)}^{${m + n}}$.`,
          `Le résultat est $${fr(a)}^{${m + n}}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(a)}^{${m * n}}$`,
            cause: "a multiplié les exposants au lieu de les additionner",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — l'exposant MANQUANT. Le premier item applique la règle de
    // gauche à droite ; celui-ci la remonte : le produit est connu, un facteur
    // aussi. C'est une soustraction, et l'élève qui a retenu « on additionne »
    // sans comprendre pourquoi additionne encore.
    kind: "template",
    id: "stmg_expo_somme_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_proprietes",
    microId: "expoT_somme_exposants",
    difficulty: 3,
    theme: "neutral",
    hint: "Les exposants s'additionnent : celui qui manque est la DIFFÉRENCE entre le total et celui qu'on connaît.",
    tags: ["stmg", "maths", "exponentielle", "template", "short"],
    generate: () => {
      const a = pick([1.05, 1.2, 1.5, 2, 3, 5, 0.8] as const);
      const total = randomInt(8, 20);
      const connu = randomInt(2, total - 2);
      return {
        text:
          `Complète : $${fr(a)}^{${connu}} \\times ${fr(a)}^{\\square} = ${fr(a)}^{${total}}$. ` +
          `Quel exposant manque ?`,
        format: "short",
        expected: [String(total - connu)],
        comparator: "number_equal",
        explanation: exp(
          "Un produit de deux puissances de même base garde la base et ADDITIONNE les exposants : $a^x \\times a^y = a^{x+y}$.",
          "On écrit l'égalité des exposants, puis on isole celui qui manque par soustraction.",
          `$${connu} + \\square = ${total}$, donc $\\square = ${total} - ${connu} = ${total - connu}$.`,
          `L'exposant manquant est $${total - connu}$.`
        ),
      };
    },
  },

  /* ═══════════════ expoT_difference_exposants ═══════════════ */

  {
    kind: "template",
    id: "stmg_expo_difference_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_proprietes",
    microId: "expoT_difference_exposants",
    difficulty: 2,
    theme: "neutral",
    hint: "Un QUOTIENT de deux puissances de même base : les exposants se SOUSTRAIENT.",
    tags: ["stmg", "maths", "exponentielle", "template"],
    generate: () => {
      const a = pick([1.1, 1.25, 1.5, 2, 3, 4, 0.9, 0.6] as const);
      const m = randomInt(5, 12);
      const n = randomInt(1, 4);
      return {
        text: `Écris $\\dfrac{${fr(a)}^{${m}}}{${fr(a)}^{${n}}}$ sous la forme d'une seule puissance de $${fr(a)}$.`,
        format: "qcm",
        choices: makeChoices(`$${fr(a)}^{${m - n}}$`, [
          `$${fr(a)}^{${m + n}}$`,
          `$${fr(a)}^{${fr(Math.round((m / n) * 100) / 100)}}$`,
          `$${fr(a)}^{${n - m}}$`,
          `$${fr(a)}^{${m}}$`,
          `$${fr(a)}^{${m - n - 1}}$`,
        ]),
        expected: [`$${fr(a)}^{${m - n}}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour tous réels $x$ et $y$ : $a^{x-y} = \\dfrac{a^x}{a^y}$.",
          "On garde la base et on soustrait l'exposant du dénominateur à celui du numérateur.",
          `$\\dfrac{${fr(a)}^{${m}}}{${fr(a)}^{${n}}} = ${fr(a)}^{${m}-${n}} = ${fr(a)}^{${m - n}}$.`,
          `Le résultat est $${fr(a)}^{${m - n}}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(a)}^{${fr(Math.round((m / n) * 100) / 100)}}$`,
            cause: "a divisé les exposants au lieu de les soustraire",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — DIAGNOSTIQUER la division des exposants. Le premier item fait
    // appliquer la règle ; celui-ci montre l'erreur qui lui ressemble le plus —
    // « un quotient, donc je divise les exposants » — et demande de la nommer.
    // Elle produit parfois le bon résultat par accident, ce qui la rend
    // tenace : $a^{4}/a^{2}$ donne $a^{2}$ des deux façons.
    kind: "template",
    id: "stmg_expo_difference_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_proprietes",
    microId: "expoT_difference_exposants",
    difficulty: 3,
    theme: "neutral",
    hint: "Un quotient de puissances SOUSTRAIT les exposants : la division porte sur les puissances, pas sur les exposants.",
    tags: ["stmg", "maths", "exponentielle", "diagnostic", "template"],
    generate: () => {
      const a = pick([1.1, 1.25, 1.5, 2, 3, 4, 0.9] as const);
      // ⛔ On évite $m = 2n$ : dans ce cas la division des exposants donne le
      // même résultat que leur soustraction, et l'erreur devient invisible.
      const n = randomInt(2, 4);
      const mBrut = randomInt(6, 12);
      const m = mBrut === 2 * n ? mBrut + 1 : mBrut;
      const faux = m / n;
      const bonne = "il a divisé les exposants au lieu de les soustraire";
      return {
        text:
          `Un élève simplifie $\\dfrac{${fr(a)}^{${m}}}{${fr(a)}^{${n}}}$ et écrit $${fr(a)}^{${fr(Math.round(faux * 100) / 100)}}$. ` +
          `Quelle erreur a-t-il commise ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          "il a additionné les exposants au lieu de les soustraire",
          "il a divisé les bases entre elles",
          "il n'a commis aucune erreur : cette écriture est correcte",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour un quotient de deux puissances de même base : $\\dfrac{a^x}{a^y} = a^{x-y}$. La division se lit sur les PUISSANCES ; sur les exposants, elle devient une soustraction.",
          "On applique la règle, puis on compare au résultat de l'élève.",
          `Le bon calcul donne $${fr(a)}^{${m} - ${n}} = ${fr(a)}^{${m - n}}$. ` +
            `L'élève a écrit $${fr(a)}^{${fr(Math.round(faux * 100) / 100)}}$, c'est-à-dire $${fr(a)}^{${m} \\div ${n}}$.`,
          `L'erreur : ${bonne}.`
        ),
      };
    },
  },

  /* ═══════════════ expoT_puissance_exposant ═══════════════ */

  {
    kind: "template",
    id: "stmg_expo_puissance_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_proprietes",
    microId: "expoT_puissance_exposant",
    difficulty: 3,
    theme: "neutral",
    hint: "Une puissance de puissance : les exposants se MULTIPLIENT.",
    tags: ["stmg", "maths", "exponentielle", "template"],
    generate: () => {
      const a = pick([1.05, 1.2, 1.5, 2, 3, 0.8, 0.75] as const);
      const x = randomInt(2, 6);
      const n = randomInt(2, 5);
      return {
        text: `Écris $\\left(${fr(a)}^{${x}}\\right)^{${n}}$ sous la forme d'une seule puissance de $${fr(a)}$.`,
        format: "qcm",
        choices: makeChoices(`$${fr(a)}^{${x * n}}$`, [
          `$${fr(a)}^{${x + n}}$`,
          `$${fr(a)}^{${x}}$`,
          `$${fr(a)}^{${n}}$`,
          `$${fr(a)}^{${x * n + 1}}$`,
          `$${fr(a * n)}^{${x}}$`,
        ]),
        expected: [`$${fr(a)}^{${x * n}}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour $n$ entier relatif : $a^{nx} = \\left(a^{x}\\right)^{n}$.",
          "Élever une puissance à une puissance revient à multiplier les exposants.",
          `$\\left(${fr(a)}^{${x}}\\right)^{${n}} = ${fr(a)}^{${x} \\times ${n}} = ${fr(a)}^{${x * n}}$.`,
          `Le résultat est $${fr(a)}^{${x * n}}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(a)}^{${x + n}}$`,
            cause: "a additionné les exposants : c'est la règle du PRODUIT, pas celle de la puissance de puissance",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — l'exposant INTÉRIEUR, cherché. Le premier item calcule le
    // produit des deux exposants ; ici le résultat est donné et l'un des deux
    // manque : on divise. C'est le calcul qui sert à passer d'un taux sur
    // plusieurs périodes à un taux par période.
    kind: "template",
    id: "stmg_expo_puissance_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_proprietes",
    microId: "expoT_puissance_exposant",
    difficulty: 3,
    theme: "neutral",
    hint: "Les exposants se multiplient : celui qui manque est le QUOTIENT du total par celui qu'on connaît.",
    tags: ["stmg", "maths", "exponentielle", "template", "short"],
    generate: () => {
      const a = pick([1.05, 1.2, 1.5, 2, 3, 0.8] as const);
      const interieur = randomInt(2, 6);
      const n = randomInt(2, 5);
      const total = interieur * n;
      return {
        text:
          `On sait que $\\left(${fr(a)}^{x}\\right)^{${n}} = ${fr(a)}^{${total}}$. ` +
          `Que vaut $x$ ?`,
        format: "short",
        expected: [String(interieur)],
        comparator: "number_equal",
        explanation: exp(
          "Élever une puissance à une puissance MULTIPLIE les exposants : $\\left(a^{x}\\right)^{n} = a^{nx}$.",
          "On écrit l'égalité des exposants, puis on isole l'inconnue par une division.",
          `$${n}x = ${total}$, donc $x = \\dfrac{${total}}{${n}} = ${interieur}$. ` +
            `Vérification : $\\left(${fr(a)}^{${interieur}}\\right)^{${n}} = ${fr(a)}^{${total}}$.`,
          `$x = ${interieur}$.`
        ),
      };
    },
  },

  /* ═══════════════════ expoT_transformer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_transformer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_proprietes",
    microId: "expoT_transformer",
    difficulty: 3,
    theme: "neutral",
    hint: "On applique les trois règles dans l'ordre : produit, quotient, puissance de puissance.",
    tags: ["stmg", "maths", "exponentielle", "template"],
    generate: () => {
      const a = pick([1.05, 1.1, 1.2, 1.5, 2, 3, 0.9] as const);
      const m = randomInt(3, 9);
      const n = randomInt(2, 5);
      const p = randomInt(1, 4);
      const resultat = m + n - p;
      return {
        text: `Simplifie $\\dfrac{${fr(a)}^{${m}} \\times ${fr(a)}^{${n}}}{${fr(a)}^{${p}}}$.`,
        format: "qcm",
        choices: makeChoices(`$${fr(a)}^{${resultat}}$`, [
          `$${fr(a)}^{${m + n + p}}$`,
          `$${fr(a)}^{${m * n - p}}$`,
          `$${fr(a)}^{${m - n - p}}$`,
          `$${fr(a)}^{${resultat + 1}}$`,
          `$${fr(a)}^{${m + n}}$`,
        ]),
        expected: [`$${fr(a)}^{${resultat}}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Les propriétés algébriques des exponentielles s'enchaînent : $a^x \\times a^y = a^{x+y}$ puis $\\dfrac{a^x}{a^y} = a^{x-y}$.",
          "On simplifie le numérateur d'abord, puis on applique la règle du quotient.",
          `$${fr(a)}^{${m}} \\times ${fr(a)}^{${n}} = ${fr(a)}^{${m + n}}$, puis ` +
            `$\\dfrac{${fr(a)}^{${m + n}}}{${fr(a)}^{${p}}} = ${fr(a)}^{${m + n} - ${p}} = ${fr(a)}^{${resultat}}$.`,
          `L'expression simplifiée est $${fr(a)}^{${resultat}}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — le LITTÉRAL, l'autre moitié du libellé. Le premier item
    // simplifie des exposants numériques ; ici l'un d'eux contient $x$, et la
    // seule façon d'aboutir est d'appliquer les règles — pas de calculer. Le
    // $x$ disparaît, ce qui surprend et se démontre en une ligne.
    kind: "template",
    id: "stmg_expo_transformer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_proprietes",
    microId: "expoT_transformer",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne d'abord les exposants du numérateur, puis retranche celui du dénominateur : les $x$ se simplifient.",
    tags: ["stmg", "maths", "exponentielle", "litteral", "template"],
    generate: () => {
      const a = pick([1.05, 1.1, 1.2, 1.5, 2, 3, 0.9] as const);
      const m = randomInt(2, 6);
      // ⛔ Exposants différents : sinon le résultat serait $a^0$, et la question
      // se réduirait à « que vaut une puissance nulle », qui est une autre
      // micro-compétence.
      const pBrut = randomInt(1, 4);
      const p = pBrut === m ? m - 1 : pBrut;
      const resultat = m - p;
      return {
        text: `Simplifie $\\dfrac{${fr(a)}^{x+${m}}}{${fr(a)}^{x+${p}}}$.`,
        format: "qcm",
        choices: makeChoices(`$${fr(a)}^{${resultat}}$`, [
          `$${fr(a)}^{2x+${m + p}}$`,
          `$${fr(a)}^{x+${resultat}}$`,
          `$${fr(a)}^{${m}}$`,
          `$${fr(a)}^{${resultat}x}$`,
        ]),
        expected: [`$${fr(a)}^{${resultat}}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Les propriétés algébriques valent pour des exposants quelconques, y compris littéraux : $\\dfrac{a^{u}}{a^{v}} = a^{u-v}$.",
          "On soustrait les deux exposants sans rien calculer d'autre, puis on réduit l'expression obtenue.",
          `$\\dfrac{${fr(a)}^{x+${m}}}{${fr(a)}^{x+${p}}} = ${fr(a)}^{(x+${m}) - (x+${p})} = ${fr(a)}^{x - x + ${m} - ${p}} = ${fr(a)}^{${resultat}}$. ` +
            `Les deux $x$ se compensent : le résultat ne dépend plus de $x$.`,
          `L'expression vaut $${fr(a)}^{${resultat}}$, quel que soit $x$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(a)}^{x+${resultat}}$`,
            cause: "n'a soustrait que les nombres et a gardé un $x$ : les deux $x$ se simplifient aussi",
          },
        ],
      };
    },
  },

  /* ═══════════════ expoT_exposant_un_sur_n ═══════════════ */

  {
    kind: "template",
    id: "stmg_expo_un_sur_n_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_moyen",
    microId: "expoT_exposant_un_sur_n",
    difficulty: 2,
    theme: "neutral",
    hint: "L'exposant $\\frac{1}{n}$ désigne la racine $n$-ième : le nombre qui, élevé à la puissance $n$, redonne le départ.",
    tags: ["stmg", "maths", "exponentielle", "template", "short"],
    generate: () => {
      const base = pick([2, 3, 4, 5, 6, 10] as const);
      const n = pick([2, 3, 4] as const);
      const c = Math.pow(base, n);
      return {
        text: `Que vaut $${c}^{\\frac{1}{${n}}}$ ?`,
        format: "short",
        expected: [String(base)],
        comparator: "number_equal",
        explanation: exp(
          "L'exposant $\\dfrac{1}{n}$ désigne la racine $n$-ième d'un réel positif : $c^{\\frac{1}{n}}$ est l'unique nombre positif dont la puissance $n$-ième vaut $c$.",
          "On cherche le nombre qui, multiplié $n$ fois par lui-même, redonne $c$ — élever à la puissance $\\dfrac{1}{n}$ n'est pas diviser par $n$.",
          `$${base}^{${n}} = ${c}$, donc $${c}^{\\frac{1}{${n}}} = ${base}$.`,
          `$${c}^{\\frac{1}{${n}}} = ${base}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la NOTATION, pas le nombre. Le premier item calcule une racine
    // qui tombe juste ; celui-ci part d'une phrase — « quel nombre, élevé à la
    // puissance 5, donne 32 ? » — et demande comment on l'ÉCRIT avec un
    // exposant. C'est ce dont on a besoin pour poser un taux moyen : on écrit
    // l'expression avant de la faire calculer par la machine.
    kind: "template",
    id: "stmg_expo_un_sur_n_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_moyen",
    microId: "expoT_exposant_un_sur_n",
    difficulty: 3,
    theme: "neutral",
    hint: "Chercher la racine $n$-ième, c'est élever à la puissance $\\dfrac{1}{n}$ — surtout pas diviser par $n$.",
    tags: ["stmg", "maths", "exponentielle", "template"],
    generate: () => {
      // ⛔ Un nombre qui n'est pas une puissance parfaite : la question porte
      // sur l'écriture, et un résultat rond ferait basculer vers le calcul.
      const c = pick([7, 12, 20, 30, 45, 60, 90, 150] as const);
      const n = pick([3, 4, 5, 6] as const);
      const bonne = `$${c}^{\\frac{1}{${n}}}$`;
      return {
        text:
          `Quel nombre, élevé à la puissance $${n}$, donne $${c}$ ? ` +
          `Choisis la bonne écriture de ce nombre.`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `$${c}^{${n}}$`,
          `$\\dfrac{${c}}{${n}}$`,
          // ⛔ Pas de « $c \times \frac{1}{n}$ » ici : ce serait le MÊME nombre
          // que $\frac{c}{n}$, écrit autrement — deux propositions justes ou
          // fausses ensemble ne départagent rien.
          `$\\sqrt{${c}}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "L'exposant $\\dfrac{1}{n}$ désigne la racine $n$-ième d'un réel positif : $c^{\\frac{1}{n}}$ est l'unique nombre positif dont la puissance $n$-ième vaut $c$.",
          "On écrit l'exposant fractionnaire ; la valeur décimale, elle, se demande à la calculatrice.",
          `$\\left(${c}^{\\frac{1}{${n}}}\\right)^{${n}} = ${c}^{\\frac{${n}}{${n}}} = ${c}$. ` +
            `À la calculatrice, $${c}^{\\frac{1}{${n}}} \\approx ${fr(Math.round(Math.pow(c, 1 / n) * 1000) / 1000)}$ — ` +
            `alors que $\\dfrac{${c}}{${n}} = ${fr(Math.round((c / n) * 1000) / 1000)}$, qui n'a rien à voir.`,
          `Le nombre cherché s'écrit ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$\\dfrac{${c}}{${n}}$`,
            cause: "a divisé par $n$ : l'exposant $\\frac{1}{n}$ n'est pas un facteur",
          },
        ],
      };
    },
  },

  /* ═══════════════ expoT_taux_moyen_calculer ═══════════════ */

  {
    kind: "template",
    id: "stmg_expo_taux_moyen_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_moyen",
    microId: "expoT_taux_moyen_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient moyen est $k^{\\frac{1}{n}}$ où $k$ est le coefficient global et $n$ le nombre de périodes.",
    tags: ["stmg", "maths", "exponentielle", "gestion", "template", "short"],
    generate: () => {
      // On choisit le taux moyen d'abord : le coefficient global tombe juste.
      const tMoyen = pick([2, 4, 5, 8, 10, 12, 15, 20, 25] as const);
      const n = pick([2, 3, 4, 5, 6, 8, 10] as const);
      const qMoyen = 1 + tMoyen / 100;
      const global = Math.pow(qMoyen, n);
      const evo = pick(EVOLUTIONS);
      return {
        text:
          `${evo.sujet.charAt(0).toUpperCase()}${evo.sujet.slice(1)} a été multiplié par $${fr(Math.round(global * 10000) / 10000)}$ en $${n}$ ans. ` +
          `Quel est le taux d'évolution annuel MOYEN, en pourcentage arrondi au dixième ?`,
        format: "short",
        expected: [fr(Math.round(tMoyen * 10) / 10)],
        comparator: "number_equal",
        explanation: exp(
          "Le taux moyen est celui qui, appliqué à chaque période, produirait la même évolution globale. Son coefficient vaut $k^{\\frac{1}{n}}$.",
          "On prend la racine $n$-ième du coefficient global, puis on retire $1$.",
          `$q_{\\text{moyen}} = ${fr(Math.round(global * 10000) / 10000)}^{\\frac{1}{${n}}} \\approx ${fr(qMoyen)}$, ` +
            `donc $t = ${fr(qMoyen)} - 1 = ${fr(tMoyen / 100)}$, soit $${fr(tMoyen)}\\,\\%$.`,
          `Le taux annuel moyen est d'environ $${fr(tMoyen)}\\,\\%$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — depuis DEUX VALEURS, pas depuis le coefficient. Le premier item
    // offre le coefficient global tout prêt ; ici il n'y a que le point de
    // départ et le point d'arrivée, et il faut fabriquer le coefficient avant
    // de prendre la racine. C'est l'ordre exact des questions du bac.
    kind: "template",
    id: "stmg_expo_taux_moyen_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_moyen",
    microId: "expoT_taux_moyen_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Coefficient global $= \\dfrac{\\text{valeur finale}}{\\text{valeur initiale}}$, puis racine $n$-ième, puis on retire $1$.",
    tags: ["stmg", "maths", "exponentielle", "gestion", "template", "short"],
    generate: () => {
      const evo = pick(EVOLUTIONS);
      const vi = pick([200, 250, 400, 500, 800] as const);
      const facteur = pick([1.5, 2, 2.5, 3, 0.5, 0.75, 0.8] as const);
      const vf = vi * facteur;
      const n = pick([3, 4, 5, 6, 8, 10] as const);
      const qMoyen = Math.pow(facteur, 1 / n);
      const taux = (qMoyen - 1) * 100;
      return {
        text:
          `${evo.sujet.charAt(0).toUpperCase()}${evo.sujet.slice(1)} est passé de $${fr(vi)}$ à $${fr(vf)}$ ${evo.unite} en $${n}$ ans. ` +
          `Quel est le taux d'évolution annuel MOYEN, en pourcentage arrondi au dixième ?`,
        format: "short",
        expected: [fr(Math.round(taux * 10) / 10)],
        comparator: "number_equal",
        explanation: exp(
          "Le taux moyen est celui qui, appliqué chaque année, mènerait de la valeur initiale à la valeur finale. Son coefficient est la racine $n$-ième du coefficient global.",
          "On calcule d'abord le coefficient global — le quotient de la valeur finale par la valeur initiale —, puis sa racine $n$-ième, et l'on retire $1$.",
          `Coefficient global : $\\dfrac{${fr(vf)}}{${fr(vi)}} = ${fr(facteur)}$. ` +
            `Coefficient moyen : $${fr(facteur)}^{\\frac{1}{${n}}} \\approx ${fr(Math.round(qMoyen * 100000) / 100000)}$. ` +
            `Taux moyen : $${fr(Math.round(qMoyen * 100000) / 100000)} - 1 \\approx ${fr(Math.round(taux * 10) / 10 / 100)}$, soit $${fr(Math.round(taux * 10) / 10)}\\,\\%$.`,
          `Le taux annuel moyen est d'environ $${fr(Math.round(taux * 10) / 10)}\\,\\%$ — ${taux > 0 ? "une hausse" : "une baisse"} régulière qui aurait donné le même résultat final.`
        ),
      };
    },
  },

  /* ═══════════════ expoT_taux_moyen_piege ═══════════════ */

  {
    kind: "fixed",
    id: "stmg_expo_taux_piege_fix_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_moyen",
    microId: "expoT_taux_moyen_piege",
    difficulty: 3,
    theme: "neutral",
    hint: "Essaie sur $100$ € : que donne réellement $+50\\,\\%$ puis $-50\\,\\%$ ?",
    tags: ["stmg", "maths", "exponentielle", "piege", "fixed"],
    text:
      "Un capital augmente de $50\\,\\%$ la première année, puis diminue de $50\\,\\%$ la seconde. " +
      "Un élève conclut que le taux moyen annuel est de $0\\,\\%$, « puisque la moyenne de $+50$ et $-50$ vaut $0$ ». " +
      "Que faut-il en penser ?",
    format: "qcm",
    choices: [
      "c'est faux : le capital a perdu $25\\,\\%$ en deux ans, le taux moyen est donc négatif",
      "c'est juste : les deux taux se compensent exactement",
      "c'est faux : le capital a gagné $25\\,\\%$, le taux moyen est positif",
      "on ne peut pas conclure sans connaître le capital de départ",
    ],
    expected: ["c'est faux : le capital a perdu $25\\,\\%$ en deux ans, le taux moyen est donc négatif"],
    comparator: "mcq_exact",
    explanation: exp(
      "Le taux d'évolution moyen n'est PAS la moyenne arithmétique des taux : ce sont les coefficients qui se composent, par multiplication.",
      "On calcule le coefficient global, puis on en prend la racine $n$-ième.",
      "$1{,}5 \\times 0{,}5 = 0{,}75$ : sur $100$ €, le capital passe à $150$ € puis à $75$ €. " +
        "Le coefficient global vaut $0{,}75$, donc le coefficient moyen vaut $0{,}75^{\\frac{1}{2}} \\approx 0{,}866$, " +
        "soit un taux moyen d'environ $-13{,}4\\,\\%$ par an.",
      "Le taux moyen est négatif : le capital a perdu $25\\,\\%$ en deux ans, et non rien du tout."
    ),
    choiceDiagnostics: [
      {
        choice: "c'est juste : les deux taux se compensent exactement",
        cause: "a fait la moyenne des taux au lieu de composer les coefficients",
        prereqMicroId: "auto_evo_piege_compensation",
      },
      {
        choice: "on ne peut pas conclure sans connaître le capital de départ",
        cause: "le coefficient global ne dépend pas du capital de départ",
      },
    ],
  },

  {
    kind: "template",
    id: "stmg_expo_taux_piege_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_moyen",
    microId: "expoT_taux_moyen_piege",
    difficulty: 3,
    theme: "neutral",
    hint: "Compose les coefficients, puis prends la racine — la moyenne des taux donne autre chose.",
    tags: ["stmg", "maths", "exponentielle", "piege", "template"],
    generate: () => {
      const t1 = pick([10, 20, 25, 30, 40, 50, 60] as const);
      const t2 = pick([10, 20, 25, 30, 40, 50] as const);
      const global = (1 + t1 / 100) * (1 - t2 / 100);
      const moyen = (Math.pow(global, 1 / 2) - 1) * 100;
      const moyenneNaive = (t1 - t2) / 2;
      return {
        text:
          `Une grandeur augmente de $${t1}\\,\\%$ une année, puis diminue de $${t2}\\,\\%$ l'année suivante. ` +
          `Le taux d'évolution annuel moyen est-il égal à la moyenne des deux taux, soit $${fr(moyenneNaive)}\\,\\%$ ?`,
        format: "qcm",
        choices: shuffle([
          "non : il faut composer les coefficients, puis prendre la racine carrée",
          "oui : le taux moyen est la moyenne des taux",
          "oui, mais seulement si les deux taux sont de même signe",
          "on ne peut pas le savoir",
        ]),
        expected: ["non : il faut composer les coefficients, puis prendre la racine carrée"],
        comparator: "mcq_exact",
        explanation: exp(
          "Le taux moyen se calcule sur les COEFFICIENTS, jamais sur les taux : $q_{\\text{moyen}} = \\left(q_1 q_2\\right)^{\\frac{1}{2}}$.",
          "On multiplie les coefficients, on prend la racine, puis on retire $1$.",
          `$${fr(1 + t1 / 100)} \\times ${fr(1 - t2 / 100)} = ${fr(Math.round(global * 10000) / 10000)}$, ` +
            `donc le taux moyen vaut environ $${fr(Math.round(moyen * 100) / 100)}\\,\\%$ — et non $${fr(moyenneNaive)}\\,\\%$.`,
          "Le taux moyen n'est pas la moyenne des taux."
        ),
      };
    },
  },

  /* ═══════════════ expoT_taux_moyen_global ═══════════════ */

  {
    kind: "template",
    id: "stmg_expo_taux_global_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_equivalent",
    microId: "expoT_taux_moyen_global",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient global est le coefficient moyen élevé à la puissance $n$.",
    tags: ["stmg", "maths", "exponentielle", "gestion", "template", "short"],
    generate: () => {
      const tMoyen = pick([2, 3, 4, 5, 8, 10, 12, 15, 20] as const);
      const n = pick([2, 3, 4, 5, 6, 8, 10, 12] as const);
      const global = (Math.pow(1 + tMoyen / 100, n) - 1) * 100;
      return {
        text:
          `Une grandeur évolue au taux annuel moyen de $${tMoyen}\\,\\%$ pendant $${n}$ ans. ` +
          `Quel est le taux d'évolution GLOBAL sur la période, en pourcentage arrondi au dixième ?`,
        format: "short",
        expected: [fr(Math.round(global * 10) / 10)],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient global est le produit des coefficients de chaque période : si le taux moyen est constant, il vaut $q^n$.",
          "On élève le coefficient moyen à la puissance $n$, puis on retire $1$.",
          `$${fr(1 + tMoyen / 100)}^{${n}} \\approx ${fr(Math.round(Math.pow(1 + tMoyen / 100, n) * 10000) / 10000)}$, ` +
            `donc le taux global vaut environ $${fr(Math.round(global * 10) / 10)}\\,\\%$.`,
          `Le taux d'évolution global est d'environ $${fr(Math.round(global * 10) / 10)}\\,\\%$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — DIAGNOSTIQUER le taux moyen multiplié par $n$. Le premier item
    // calcule le taux global ; celui-ci met en scène l'élève qui multiplie le
    // taux moyen par le nombre d'années. L'écart est petit sur deux ans et
    // énorme sur dix : c'est ce que montre le calcul, et c'est pour cela que
    // l'erreur passe inaperçue en classe.
    kind: "template",
    id: "stmg_expo_taux_global_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_equivalent",
    microId: "expoT_taux_moyen_global",
    difficulty: 3,
    theme: "neutral",
    hint: "Les taux ne s'additionnent pas d'une année sur l'autre : ce sont les coefficients qui se multiplient.",
    tags: ["stmg", "maths", "exponentielle", "gestion", "diagnostic", "template"],
    generate: () => {
      const tMoyen = pick([3, 4, 5, 6, 8, 10, 12] as const);
      const n = pick([4, 5, 6, 8, 10] as const);
      const global = (Math.pow(1 + tMoyen / 100, n) - 1) * 100;
      const naif = tMoyen * n;
      const bonne = `il se trompe : le taux global vaut environ $${fr(Math.round(global * 10) / 10)}\\,\\%$`;
      return {
        text:
          `Une grandeur évolue au taux annuel moyen de $${tMoyen}\\,\\%$ pendant $${n}$ ans. ` +
          `Un élève annonce un taux global de $${naif}\\,\\%$, « puisque $${tMoyen} \\times ${n} = ${naif}$ ». ` +
          `Qu'en penses-tu ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `il a raison : les taux annuels s'additionnent sur la période`,
          `il se trompe : le taux global vaut exactement $${tMoyen}\\,\\%$, il ne change pas`,
          `il se trompe : le taux global vaut environ $${fr(Math.round((global / 2) * 10) / 10)}\\,\\%$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Sur plusieurs périodes, ce sont les COEFFICIENTS qui se multiplient : le coefficient global vaut $q^n$, et non $1 + n\\,\\dfrac{t}{100}$.",
          "On élève le coefficient annuel à la puissance $n$, puis on retire $1$.",
          `$${fr(1 + tMoyen / 100)}^{${n}} \\approx ${fr(Math.round(Math.pow(1 + tMoyen / 100, n) * 10000) / 10000)}$, ` +
            `soit un taux global d'environ $${fr(Math.round(global * 10) / 10)}\\,\\%$ — et non $${naif}\\,\\%$. ` +
            `L'écart vient des intérêts qui s'appliquent, chaque année, à ce que les années précédentes ont déjà ajouté.`,
          `Le taux global est d'environ $${fr(Math.round(global * 10) / 10)}\\,\\%$, plus GRAND que la simple multiplication.`
        ),
        choiceDiagnostics: [
          {
            choice: `il a raison : les taux annuels s'additionnent sur la période`,
            cause: "a additionné les taux au lieu de composer les coefficients",
          },
        ],
      };
    },
  },

  /* ═══════════════ expoT_taux_mensuel_annuel ═══════════════ */

  {
    kind: "template",
    id: "stmg_expo_mensuel_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_equivalent",
    microId: "expoT_taux_mensuel_annuel",
    difficulty: 3,
    theme: "neutral",
    hint: "Douze mois font une année : le coefficient mensuel élevé à la puissance $12$ doit redonner le coefficient annuel.",
    tags: ["stmg", "maths", "exponentielle", "gestion", "template", "short"],
    generate: () => {
      const annuel = pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24] as const);
      const periodes = pick([12, 4, 2] as const);
      const equivalent = (Math.pow(1 + annuel / 100, 1 / periodes) - 1) * 100;
      const nom = periodes === 12 ? "mensuel" : periodes === 4 ? "trimestriel" : "semestriel";
      return {
        text:
          `Un placement rapporte $${annuel}\\,\\%$ par an. ` +
          `Quel est le taux ${nom} ÉQUIVALENT, en pourcentage arrondi au centième ?`,
        format: "short",
        expected: [fr(Math.round(equivalent * 100) / 100)],
        comparator: "number_equal",
        explanation: exp(
          "Le taux équivalent est celui qui, appliqué à chaque sous-période, redonne exactement le taux annuel : son coefficient est $\\left(1 + \\dfrac{t}{100}\\right)^{\\frac{1}{n}}$.",
          "On prend la racine $n$-ième du coefficient annuel, puis on retire $1$. Diviser le taux par $n$ donnerait le taux PROPORTIONNEL, qui est légèrement plus grand.",
          `$${fr(1 + annuel / 100)}^{\\frac{1}{${periodes}}} \\approx ${fr(Math.round((1 + equivalent / 100) * 100000) / 100000)}$, ` +
            `soit un taux de $${fr(Math.round(equivalent * 100) / 100)}\\,\\%$ — à comparer au taux proportionnel $\\dfrac{${annuel}}{${periodes}} = ${fr(Math.round((annuel / periodes) * 100) / 100)}\\,\\%$.`,
          `Le taux ${nom} équivalent est d'environ $${fr(Math.round(equivalent * 100) / 100)}\\,\\%$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — du MOIS vers l'ANNÉE. Le premier item descend de l'année au
    // mois ; celui-ci remonte, et c'est la question que pose un crédit à la
    // consommation : « $1\,\%$ par mois », cela fait combien par an ? Pas
    // $12\,\%$ — et l'écart est ce qui distingue un TAEG d'un taux affiché.
    kind: "template",
    id: "stmg_expo_mensuel_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_equivalent",
    microId: "expoT_taux_mensuel_annuel",
    difficulty: 3,
    theme: "neutral",
    hint: "Douze mois de suite, c'est le coefficient mensuel élevé à la puissance $12$.",
    tags: ["stmg", "maths", "exponentielle", "gestion", "template", "short"],
    generate: () => {
      const mensuel = pick([0.5, 0.8, 1, 1.2, 1.5, 2] as const);
      const periodes = pick([12, 4, 2] as const);
      const nom = periodes === 12 ? "mensuel" : periodes === 4 ? "trimestriel" : "semestriel";
      const annuel = (Math.pow(1 + mensuel / 100, periodes) - 1) * 100;
      return {
        text:
          `Un crédit est facturé au taux ${nom} de $${fr(mensuel)}\\,\\%$. ` +
          `Quel est le taux ANNUEL équivalent, en pourcentage arrondi au centième ?`,
        format: "short",
        expected: [fr(Math.round(annuel * 100) / 100)],
        comparator: "number_equal",
        explanation: exp(
          "Le taux annuel équivalent est celui qui produit, en une fois, la même évolution que les $n$ périodes enchaînées : son coefficient vaut $\\left(1 + \\dfrac{t}{100}\\right)^{n}$.",
          "On élève le coefficient de la période à la puissance du nombre de périodes dans l'année, puis on retire $1$.",
          `$${fr(1 + mensuel / 100)}^{${periodes}} \\approx ${fr(Math.round(Math.pow(1 + mensuel / 100, periodes) * 100000) / 100000)}$, ` +
            `soit $${fr(Math.round(annuel * 100) / 100)}\\,\\%$ par an — ` +
            `alors que la simple multiplication donnerait $${fr(mensuel)} \\times ${periodes} = ${fr(Math.round(mensuel * periodes * 100) / 100)}\\,\\%$.`,
          `Le taux annuel équivalent est d'environ $${fr(Math.round(annuel * 100) / 100)}\\,\\%$ : toujours PLUS que la multiplication, parce que les intérêts s'ajoutent au capital à chaque période.`
        ),
      };
    },
  },

  /* ═══════════════ expoT_taux_moyen_interpreter ═══════════════ */

  {
    kind: "template",
    id: "stmg_expo_taux_interpreter_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_equivalent",
    microId: "expoT_taux_moyen_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Un taux moyen décrit une évolution FICTIVE, régulière, qui aurait le même effet total.",
    tags: ["stmg", "maths", "exponentielle", "gestion", "open", "template"],
    generate: () => {
      const evo = pick(EVOLUTIONS);
      const t = pick([2.5, 3.4, 4.8, 6.2, 7.5, 11.3, -2.8, -5.1] as const);
      const n = pick([4, 5, 6, 8, 10] as const);
      return {
        text:
          `Sur $${n}$ ans, ${evo.sujet} a évolué au taux annuel moyen de $${fr(t)}\\,\\%$. ` +
          `Explique ce que signifie ce nombre — et ce qu'il ne signifie pas.`,
        format: "open",
        expected: ["moyen", "chaque annee", "chaque année", "meme evolution", "même évolution", "regulier", "régulier", "fictif"],
        comparator: "contains_keyword",
        explanation: exp(
          "Le taux moyen est le taux CONSTANT qui, appliqué à chaque période, aurait produit la même évolution globale.",
          "On distingue ce qu'il décrit — un scénario régulier équivalent — de ce qu'il ne décrit pas : l'évolution réelle année par année.",
          `Ici, ${evo.sujet} n'a probablement pas ${t > 0 ? "augmenté" : "diminué"} de $${fr(Math.abs(t))}\\,\\%$ chaque année : ` +
            `certaines années ont pu être bien meilleures, d'autres mauvaises. Le taux moyen résume seulement le résultat final.`,
          `Par exemple : « Tout se passe comme si ${evo.sujet} avait ${t > 0 ? "augmenté" : "diminué"} de ${fr(Math.abs(t))} % chaque année pendant ${n} ans — mais ce n'est pas l'évolution réelle année par année. »`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la même interprétation, mais SÉCURISÉE par un QCM. Le premier
    // item est une question ouverte validée par mots-clés : un élève qui écrit
    // la bonne phrase sans le mot « moyen » échoue, un autre qui recopie
    // « en moyenne » sans rien comprendre passe. Ici les quatre lectures sont
    // posées côte à côte, et c'est le sens qui départage.
    kind: "template",
    id: "stmg_expo_taux_interpreter_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_equivalent",
    microId: "expoT_taux_moyen_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Un taux moyen décrit un scénario RÉGULIER fictif, qui donnerait le même résultat final.",
    tags: ["stmg", "maths", "exponentielle", "gestion", "template"],
    generate: () => {
      const evo = pick(EVOLUTIONS);
      const t = pick([2.5, 3.4, 4.8, 6.2, 7.5, 11.3] as const);
      const n = pick([4, 5, 6, 8, 10] as const);
      const bonne =
        `tout se passe comme si la hausse avait été de $${fr(t)}\\,\\%$ chaque année : le résultat final est le même`;
      return {
        text:
          `Sur $${n}$ ans, ${evo.sujet} a évolué au taux annuel moyen de $${fr(t)}\\,\\%$. ` +
          `Laquelle de ces lectures est correcte ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `la hausse a été d'exactement $${fr(t)}\\,\\%$ chaque année`,
          `la hausse totale sur les $${n}$ ans est de $${fr(t)}\\,\\%$`,
          `la hausse totale sur les $${n}$ ans est de $${fr(Math.round(t * n * 10) / 10)}\\,\\%$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le taux moyen est le taux CONSTANT qui, appliqué à chaque période, aurait produit la même évolution globale. Il résume le résultat, pas le chemin.",
          "On distingue trois choses : l'évolution réelle année par année, le scénario régulier équivalent, et l'évolution globale.",
          `Le taux global vaut $\\left(${fr(1 + t / 100)}\\right)^{${n}} - 1 \\approx ` +
            `${fr(Math.round((Math.pow(1 + t / 100, n) - 1) * 1000) / 10)}\\,\\%$ : ce n'est ni $${fr(t)}\\,\\%$, ` +
            `ni $${fr(Math.round(t * n * 10) / 10)}\\,\\%$. ` +
            `Et rien ne dit que chaque année a fait exactement $${fr(t)}\\,\\%$ : certaines ont pu être bien meilleures.`,
          `La lecture correcte : ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `la hausse a été d'exactement $${fr(t)}\\,\\%$ chaque année`,
            cause: "le taux moyen ne décrit pas l'évolution réelle : il décrit un scénario régulier qui aurait le même effet total",
          },
        ],
      };
    },
  },
];
