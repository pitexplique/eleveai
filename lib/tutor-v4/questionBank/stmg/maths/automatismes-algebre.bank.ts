// lib/tutor-v4/questionBank/stmg/maths/automatismes-algebre.bank.ts
//
// Notions : auto_developper_factoriser, auto_equations, auto_signes,
//           auto_formules
//           (domaine STMGAU — rubrique « Calcul numérique et algébrique »)
//
// ⚠️ RÈGLE TENUE PARTOUT DANS CE FICHIER : une expression algébrique se demande
// en QCM, jamais en saisie libre. « 3x^2+2x-5 » et « -5+2x+3x² » sont la même
// réponse pour un élève et deux chaînes pour la machine. Seules les VALEURS
// numériques (une solution, un signe, un résultat d'application de formule)
// passent en `short`.
//
// ⛔ Le discriminant n'est pas au programme : les racines d'un polynôme de
// degré 2 s'obtiennent par la forme factorisée, ou sont évidentes. Aucun item
// de ce fichier ne demande de résoudre $ax^2+bx+c=0$ autrement.
//
// La rubrique « signe » est celle qui décide de tout le reste du programme :
// le signe de la dérivée donne les variations, et le signe d'un bénéfice donne
// le seuil de rentabilité. D'où le tableau de signes rendu VISIBLE
// (`tableau_donnees`) et la parabole tracée sous le signe d'une expression
// factorisée — le BO demande explicitement de s'appuyer sur « une image
// mentale de la courbe représentative de la fonction correspondante ».

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

/** Terme signé : rend « + 3x », « - x », ou rien si le coefficient est nul. */
function terme(coef: number, partie: string, premier = false): string {
  if (coef === 0) return "";
  const signe = coef < 0 ? "-" : premier ? "" : "+";
  const abs = Math.abs(coef);
  const nombre = abs === 1 && partie !== "" ? "" : String(abs);
  const espace = premier && coef > 0 ? "" : " ";
  return `${signe}${espace}${nombre}${partie}`.trim() === ""
    ? ""
    : `${signe}${premier && coef > 0 ? "" : " "}${nombre}${partie}`;
}

/** Trinôme $ax^2 + bx + c$ en LaTeX, termes nuls omis. */
function trinome(a: number, b: number, c: number): string {
  const morceaux = [terme(a, "x^2", true), terme(b, "x"), terme(c, "")].filter((m) => m !== "");
  return morceaux.length === 0 ? "0" : morceaux.join(" ").replace(/\s+/g, " ").trim();
}

/** Binôme du premier degré $ax + b$. */
function binome(a: number, b: number): string {
  const morceaux = [terme(a, "x", true), terme(b, "")].filter((m) => m !== "");
  return morceaux.length === 0 ? "0" : morceaux.join(" ").replace(/\s+/g, " ").trim();
}

/** Facteur $(x - r)$ écrit proprement selon le signe de la racine. */
function facteur(r: number): string {
  if (r === 0) return "x";
  return r > 0 ? `(x - ${r})` : `(x + ${-r})`;
}

/* ─────────────────── réservoirs de contexte ─────────────────── */

const FORMULES = [
  {
    nom: "le bénéfice",
    litteral: "B = R - C",
    variables: ["R", "C"],
    calcule: (r: number, c: number) => r - c,
    legende: "recette $R$ et coût $C$, en euros",
  },
  {
    nom: "le prix TTC",
    litteral: "P_{TTC} = P_{HT} \\times (1 + t)",
    variables: ["P_{HT}", "t"],
    calcule: (p: number, t: number) => p * (1 + t / 100),
    legende: "prix hors taxes $P_{HT}$ en euros et taux $t$ en pourcentage",
  },
] as const;

export const automatismesAlgebreBank: TutorBankItemV4[] = [
  /* ═══════════════════ auto_alg_developper ═══════════════════ */

  {
    kind: "template",
    id: "stmg_alg_developper_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_developper_factoriser",
    microId: "auto_alg_developper",
    difficulty: 1,
    theme: "neutral",
    hint: "Chaque terme de la première parenthèse multiplie chaque terme de la seconde.",
    tags: ["stmg", "maths", "algebre", "template"],
    generate: () => {
      const a = randomInt(1, 5);
      const b = pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5] as const);
      const c = randomInt(1, 5);
      const d = pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5] as const);
      const A = a * c;
      const B = a * d + b * c;
      const C = b * d;
      return {
        text: `Développe et réduis : $(${binome(a, b)})(${binome(c, d)})$`,
        format: "qcm",
        choices: makeChoices(`$${trinome(A, B, C)}$`, [
          `$${trinome(A, a * d - b * c, C)}$`,
          `$${trinome(A, b * d, C)}$`,
          `$${trinome(a + c, B, b + d)}$`,
          `$${trinome(A, B, -C)}$`,
          `$${trinome(A, a * d, C)}$`,
          `$${trinome(A, b * c, C)}$`,
        ]),
        expected: [`$${trinome(A, B, C)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Développer un produit de deux binômes : chaque terme du premier multiplie chaque terme du second.",
          "On écrit les quatre produits, puis on regroupe les termes en $x$.",
          `$${a}x \\times ${c}x = ${A}x^2$ ; $${a}x \\times (${d}) = ${a * d}x$ ; ` +
            `$(${b}) \\times ${c}x = ${b * c}x$ ; $(${b}) \\times (${d}) = ${C}$. ` +
            `En regroupant : $${trinome(A, B, C)}$.`,
          `Le résultat développé est $${trinome(A, B, C)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${trinome(A, b * d, C)}$`,
            cause: "n'a gardé qu'un des deux produits croisés",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "stmg_alg_developper_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_developper_factoriser",
    microId: "auto_alg_developper",
    difficulty: 2,
    theme: "neutral",
    hint: "Le terme en $x$ vient de DEUX produits croisés, pas d'un seul.",
    tags: ["stmg", "maths", "algebre", "piege", "template", "short"],
    generate: () => {
      // ANGLE 2 — un seul coefficient, celui qui se rate. Le premier item fait
      // développer entièrement, en QCM ; celui-ci ne demande QUE le terme en
      // $x$, et c'est un nombre — donc une saisie libre, sans propositions où
      // piocher. L'erreur d'un seul produit croisé au lieu de deux n'a alors
      // plus nulle part où se cacher.
      const a = randomInt(1, 6);
      const b = pick([-7, -5, -4, -3, -2, 2, 3, 4, 5, 7] as const);
      const c = randomInt(1, 6);
      const d = pick([-8, -6, -3, -1, 1, 3, 6, 8] as const);
      const coefX = a * d + b * c;
      return {
        text:
          `On développe $(${binome(a, b)})(${binome(c, d)})$. ` +
          `Quel est le COEFFICIENT du terme en $x$ ?`,
        format: "short",
        expected: [String(coefX)],
        comparator: "number_equal",
        explanation: exp(
          "En développant $(ax + b)(cx + d)$, le terme en $x$ rassemble DEUX produits : le premier terme par le second de l'autre parenthèse, et réciproquement. Son coefficient vaut $ad + bc$.",
          "On repère les deux produits croisés, on les calcule séparément, puis on les additionne — sans oublier les signes.",
          `Produits croisés : $${a}x \\times ${d >= 0 ? d : `(${d})`} = ${a * d}x$ et ` +
            `$${b >= 0 ? b : `(${b})`} \\times ${c}x = ${b * c}x$. ` +
            `Au total : $${a * d} ${b * c >= 0 ? "+" : "-"} ${Math.abs(b * c)} = ${coefX}$.`,
          `Le coefficient du terme en $x$ vaut $${coefX}$.`
        ),
      };
    },
  },

  /* ═══════════════════ auto_alg_identites ═══════════════════ */

  {
    kind: "template",
    id: "stmg_alg_identites_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_developper_factoriser",
    microId: "auto_alg_identites",
    difficulty: 2,
    theme: "neutral",
    hint: "$(a+b)^2 = a^2 + 2ab + b^2$ — le double produit ne s'oublie pas.",
    tags: ["stmg", "maths", "algebre", "identites", "template"],
    generate: () => {
      const a = randomInt(1, 4);
      const b = randomInt(1, 9);
      const signe = pick([1, -1] as const);
      const A = a * a;
      const B = 2 * a * b * signe;
      const C = b * b;
      return {
        text: `Développe : $(${binome(a, signe * b)})^2$`,
        format: "qcm",
        choices: makeChoices(`$${trinome(A, B, C)}$`, [
          `$${trinome(A, 0, C)}$`,
          `$${trinome(A, B, -C)}$`,
          `$${trinome(A, B / 2, C)}$`,
          `$${trinome(A, -B, C)}$`,
          `$${trinome(a, B, b)}$`,
          `$${trinome(A, 2 * b * signe, C)}$`,
        ]),
        expected: [`$${trinome(A, B, C)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "$(u + v)^2 = u^2 + 2uv + v^2$.",
          "On identifie $u$ et $v$, puis on écrit les trois termes sans oublier le double produit.",
          `Avec $u = ${a}x$ et $v = ${signe * b}$ : $u^2 = ${A}x^2$, $2uv = ${B}x$, $v^2 = ${C}$.`,
          `Le développement est $${trinome(A, B, C)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${trinome(A, 0, C)}$`,
            cause: "a oublié le double produit — l'erreur la plus fréquente sur cette identité",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — DIAGNOSTIQUER l'oubli, au lieu de développer juste. Le premier
    // item demande le développement complet ; celui-ci met sous les yeux
    // l'erreur qui se commet vraiment — $(x + b)^2$ écrit $x^2 + b^2$ — et fait
    // nommer ce qui manque. Un élève peut cocher le bon développement sans
    // avoir jamais compris d'où vient le double produit.
    kind: "template",
    id: "stmg_alg_identites_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_developper_factoriser",
    microId: "auto_alg_identites",
    difficulty: 2,
    theme: "neutral",
    hint: "$(x + b)^2$, c'est $(x + b)(x + b)$ : développe et compte les termes obtenus.",
    tags: ["stmg", "maths", "algebre", "piege", "template"],
    generate: () => {
      // ⚠️ SOMME SEULEMENT, et le carré du premier terme écrit juste : la
      // question demande ce qui MANQUE, et il ne doit manquer qu'une chose.
      // Avec $(x - b)^2$ écrit $x^2 - b^2$, il manquerait aussi un signe, et
      // « le double produit » ne serait plus une réponse complète.
      // ⚠️ ET $b \neq 2a$ : sinon $b^2 = 2ab$, et le distracteur « le nombre
      // $+ 2ab$, sans le $x$ » désigne un nombre DÉJÀ ÉCRIT dans l'expression
      // fausse — il ne veut plus rien dire. Vu à la lecture, pas par les
      // vérificateurs : les quatre propositions restaient bien distinctes.
      const a = pick([1, 2, 3] as const);
      let b = pick([2, 3, 4, 5, 6, 7, 8, 9] as const);
      for (let essai = 0; essai < 20 && b === 2 * a; essai++) {
        b = pick([2, 3, 4, 5, 6, 7, 8, 9] as const);
      }
      const partieCarree = a === 1 ? "x^2" : `${a * a}x^2`;
      const expression = a === 1 ? `(x + ${b})^2` : `(${a}x + ${b})^2`;
      const ecritFaux = `${partieCarree} + ${b * b}`;
      const doubleProduit = `${2 * a * b}x`;
      const bonne = `le double produit $+ ${doubleProduit}$`;
      return {
        text:
          `Un élève écrit : « $${expression} = ${ecritFaux}$ ». ` +
          `Que manque-t-il dans son développement ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `le terme $+ ${a * b}x$ — un seul produit croisé, pas deux`,
          `rien : $${expression}$ vaut bien $${ecritFaux}$`,
          `le nombre $+ ${2 * a * b}$, sans le $x$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "L'identité remarquable $(a + b)^2 = a^2 + 2ab + b^2$ comporte TROIS termes. Le terme du milieu — le double produit — vient de ce qu'un carré est un produit de deux parenthèses identiques.",
          "On réécrit le carré comme un produit, on développe les quatre produits, puis on regroupe : les deux produits croisés sont égaux, d'où le facteur $2$.",
          `$${expression} = ${a === 1 ? `(x + ${b})(x + ${b})` : `(${a}x + ${b})(${a}x + ${b})`} = ` +
            `${partieCarree} + ${a * b}x + ${a * b}x + ${b * b} = ` +
            `${partieCarree} + ${doubleProduit} + ${b * b}$. ` +
            `Les deux produits croisés valent chacun $${a * b}x$ : c'est leur somme, $${doubleProduit}$, qui a été oubliée.`,
          `Il manque le double produit $+ ${doubleProduit}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `le terme $+ ${a * b}x$ — un seul produit croisé, pas deux`,
            cause: "n'a compté qu'un seul produit croisé : il y en a deux, identiques, d'où le facteur 2",
          },
          {
            choice: `le nombre $+ ${2 * a * b}$, sans le $x$`,
            cause: "le double produit porte la lettre : c'est un terme en $x$, pas un nombre",
          },
          {
            choice: `rien : $${expression}$ vaut bien $${ecritFaux}$`,
            cause: "c'est l'erreur la plus répandue du calcul littéral : un carré ne se distribue pas sur une somme",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_alg_factoriser_commun ═══════════════ */

  {
    kind: "template",
    id: "stmg_alg_facteur_commun_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_developper_factoriser",
    microId: "auto_alg_factoriser_commun",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche ce qui est présent dans TOUS les termes, nombre comme lettre.",
    tags: ["stmg", "maths", "algebre", "factorisation", "template"],
    generate: () => {
      const k = pick([2, 3, 4, 5, 6] as const);
      const a = randomInt(1, 5);
      const b = pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6] as const);
      return {
        text: `Factorise : $${trinome(k * a, k * b, 0)}$`,
        format: "qcm",
        choices: makeChoices(`$${k}x(${binome(a, b)})$`, [
          `$x(${binome(k * a, k * b)})$`,
          `$${k}(${binome(a, b)})$`,
          `$${k}x(${binome(a, b * k)})$`,
          `$${k}x^2(${binome(a, b)})$`,
          `$${k * a}x(${binome(1, b)})$`,
        ]),
        expected: [`$${k}x(${binome(a, b)})$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Factoriser, c'est mettre en évidence un facteur présent dans tous les termes.",
          "On cherche le plus grand facteur commun aux coefficients, et la plus petite puissance de $x$ présente partout.",
          `$${trinome(k * a, k * b, 0)} = ${k}x \\times ${a}x + ${k}x \\times (${b}) = ${k}x(${binome(a, b)})$.`,
          `La forme factorisée est $${k}x(${binome(a, b)})$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${k}(${binome(a, b)})$`,
            cause: "a sorti le nombre mais oublié le $x$ commun",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — REPÉRER le facteur commun avant de factoriser. Le premier item
    // demande la factorisation entière ; celui-ci s'arrête au geste qui la
    // décide. L'élève qui sort $x$ en oubliant le nombre, ou le nombre en
    // oubliant $x$, a factorisé — mais pas complètement, et c'est cette
    // moitié-là qui bloque tout le reste du programme.
    kind: "template",
    id: "stmg_alg_facteur_commun_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_developper_factoriser",
    microId: "auto_alg_factoriser_commun",
    difficulty: 2,
    theme: "neutral",
    hint: "Le facteur commun le plus grand prend TOUT ce que les deux termes partagent : le nombre ET la lettre.",
    tags: ["stmg", "maths", "algebre", "template"],
    generate: () => {
      // a et b premiers entre eux : sinon le « plus grand » facteur commun
      // n'est pas $kx$, et deux propositions deviennent défendables.
      //
      // ⚠️ ET a ≠ 1 (attrapé par `verifier-generateurs` sur 20,5 % des tirages,
      // le 18/08/2026) : avec $a = 1$, le distracteur $Ax$ vaut $kx$, c'est-à-dire
      // LA BONNE RÉPONSE. Il disparaissait au dédoublonnage et l'élève ne voyait
      // plus que trois propositions. Exactement le défaut que ce vérificateur
      // existe pour trouver, et qui ne se voit pas à la relecture.
      const { a, b } = pick([
        { a: 2, b: 3 },
        { a: 3, b: 4 },
        { a: 2, b: 5 },
        { a: 3, b: 5 },
        { a: 4, b: 5 },
        { a: 5, b: 7 },
        { a: 2, b: 9 },
        { a: 4, b: 7 },
        { a: 3, b: 7 },
        { a: 2, b: 7 },
      ] as const);
      const k = pick([2, 3, 4, 5, 6, 7, 8, 9] as const);
      const A = k * a;
      const B = k * b;
      const bonne = `$${k}x$`;
      return {
        text: `Quel est le facteur commun LE PLUS GRAND de $${trinome(A, B, 0)}$ ?`,
        format: "qcm",
        choices: makeChoices(bonne, [`$${k}$`, `$x$`, `$${A}x$`]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le facteur commun le plus grand de deux termes rassemble tout ce qu'ils ont en commun : le plus grand diviseur commun de leurs coefficients, et les lettres présentes dans les deux.",
          "On cherche d'abord le plus grand nombre qui divise les deux coefficients, puis la plus grande puissance de $x$ présente partout.",
          `$${A} = ${k} \\times ${a}$ et $${B} = ${k} \\times ${b}$ : le plus grand diviseur commun est $${k}$, car $${a}$ et $${b}$ n'ont plus rien en commun. ` +
            `Les deux termes contiennent $x$. Le facteur commun est donc $${k}x$, et $${trinome(A, B, 0)} = ${k}x(${binome(a, b)})$.`,
          `Le facteur commun le plus grand est $${k}x$.`
        ),
        choiceDiagnostics: [
          { choice: `$${k}$`, cause: "a oublié la lettre : les deux termes contiennent aussi $x$" },
          { choice: `$x$`, cause: `a oublié le nombre : $${k}$ divise les deux coefficients` },
          { choice: `$${A}x$`, cause: `$${A}$ ne divise pas $${B}$ : ce facteur-là n'est pas commun aux deux termes` },
        ],
      };
    },
  },

  /* ═══════════════ auto_alg_factoriser_identite ═══════════════ */

  {
    kind: "template",
    id: "stmg_alg_facteur_identite_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_developper_factoriser",
    microId: "auto_alg_factoriser_identite",
    difficulty: 3,
    theme: "neutral",
    hint: "Une différence de deux carrés : $u^2 - v^2 = (u - v)(u + v)$.",
    tags: ["stmg", "maths", "algebre", "factorisation", "template"],
    generate: () => {
      const a = pick([1, 2, 3, 4, 5] as const);
      const b = pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const);
      const A = a * a;
      const C = b * b;
      return {
        text: `Factorise : $${trinome(A, 0, -C)}$`,
        format: "qcm",
        choices: makeChoices(`$(${binome(a, -b)})(${binome(a, b)})$`, [
          `$(${binome(a, -b)})^2$`,
          `$(${binome(a, b)})^2$`,
          `$(${binome(A, -C)})(${binome(A, C)})$`,
          `$(${binome(a, -C)})(${binome(a, C)})$`,
          `$${a}x(${binome(a, -C)})$`,
        ]),
        expected: [`$(${binome(a, -b)})(${binome(a, b)})$`],
        comparator: "mcq_exact",
        explanation: exp(
          "$u^2 - v^2 = (u - v)(u + v)$ : c'est la seule identité qui factorise une différence.",
          "On reconnaît les deux carrés, on identifie $u$ et $v$, puis on écrit le produit.",
          `$${A}x^2 = (${a}x)^2$ et $${C} = ${b}^2$, donc $u = ${a}x$ et $v = ${b}$, ` +
            `d'où $(${binome(a, -b)})(${binome(a, b)})$.`,
          `La forme factorisée est $(${binome(a, -b)})(${binome(a, b)})$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$(${binome(a, -b)})^2$`,
            cause: "a utilisé l'identité du carré alors qu'il s'agit d'une différence de carrés",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — TRIER avant de factoriser. Le premier item factorise une
    // différence de deux carrés ; celui-ci demande laquelle, parmi quatre
    // expressions, n'en est pas une. La somme de deux carrés ne se factorise
    // pas, et c'est un fait qu'on n'apprend qu'en butant dessus : l'élève qui
    // écrit $x^2 + 9 = (x+3)(x-3)$ a appliqué une recette sans la condition.
    kind: "template",
    id: "stmg_alg_facteur_identite_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_developper_factoriser",
    microId: "auto_alg_factoriser_identite",
    difficulty: 3,
    theme: "neutral",
    hint: "$a^2 - b^2$ se factorise. $a^2 + b^2$, non : cherche le signe.",
    tags: ["stmg", "maths", "algebre", "piege", "template"],
    generate: () => {
      const [n1, n2, n3] = shuffle([2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
      const m = pick([2, 3, 5] as const);
      const p = pick([4, 6, 7] as const);
      const bonne = `$x^2 + ${n3 * n3}$`;
      return {
        text:
          "Une seule de ces quatre expressions n'est PAS une différence de deux carrés, " +
          "et ne se factorise donc pas par cette identité. Laquelle ?",
        format: "qcm",
        choices: makeChoices(bonne, [
          `$x^2 - ${n1 * n1}$`,
          `$${m * m}x^2 - ${n2 * n2}$`,
          `$${p * p}x^2 - 1$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "L'identité $a^2 - b^2 = (a - b)(a + b)$ demande une DIFFÉRENCE de deux carrés. Une somme de deux carrés, elle, ne se factorise pas.",
          "On vérifie deux choses : les deux termes sont-ils des carrés, et sont-ils séparés par un moins ?",
          `$x^2 - ${n1 * n1} = (x - ${n1})(x + ${n1})$ ; ` +
            `$${m * m}x^2 - ${n2 * n2} = (${m}x - ${n2})(${m}x + ${n2})$ ; ` +
            `$${p * p}x^2 - 1 = (${p}x - 1)(${p}x + 1)$. ` +
            `Mais $x^2 + ${n3 * n3}$ est une SOMME : aucun produit de deux facteurs du premier degré ne la redonne, ` +
            `puisqu'elle ne s'annule jamais — un carré ajouté à $${n3 * n3}$ vaut au moins $${n3 * n3}$.`,
          `C'est $x^2 + ${n3 * n3}$ qui ne se factorise pas.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${p * p}x^2 - 1$`,
            cause: `$1$ est un carré, celui de $1$ : $${p * p}x^2 - 1$ se factorise bien`,
          },
        ],
      };
    },
  },

  /* ═══════════ auto_alg_equation_premier_degre ═══════════ */

  {
    kind: "template",
    id: "stmg_alg_equation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_equations",
    microId: "auto_alg_equation_premier_degre",
    difficulty: 2,
    theme: "neutral",
    hint: "On rassemble les $x$ d'un côté et les nombres de l'autre.",
    tags: ["stmg", "maths", "algebre", "equations", "template", "short"],
    generate: () => {
      // On choisit la solution d'abord : elle est ainsi toujours entière.
      const x = pick([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8] as const);
      const a = randomInt(2, 7);
      const c = pick([1, 2, 3, 4, 5] as const).valueOf();
      const aa = a + c; // coefficient de gauche, strictement plus grand
      const b = randomInt(-9, 9);
      const d = (aa - c) * x + b;
      return {
        text: `Résous l'équation : $${binome(aa, b)} = ${binome(c, d)}$`,
        format: "short",
        expected: [fr(x)],
        comparator: "number_equal",
        explanation: exp(
          "Résoudre une équation du premier degré, c'est isoler l'inconnue par opérations successives.",
          "On rassemble les termes en $x$ d'un côté, les constantes de l'autre, puis on divise par le coefficient de $x$.",
          `$${binome(aa, b)} = ${binome(c, d)}$ donne $${aa - c}x = ${d - b}$, donc $x = \\dfrac{${d - b}}{${aa - c}} = ${fr(x)}$.`,
          `La solution est $x = ${fr(x)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — METTRE EN ÉQUATION, au lieu d'en résoudre une déjà écrite. Le
    // premier item donne $ax + b = cx + d$ ; celui-ci donne deux offres
    // d'abonnement et demande quand elles se valent. L'équation est la même —
    // c'est de la traduire qui manque à un élève de STMG, pas de la résoudre.
    kind: "template",
    id: "stmg_alg_equation_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_equations",
    microId: "auto_alg_equation_premier_degre",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris le coût de chaque offre au bout de $x$ mois, puis écris qu'ils sont égaux.",
    tags: ["stmg", "maths", "algebre", "equations", "template", "short"],
    generate: () => {
      // On part de la solution : les deux offres se croisent à un nombre de
      // mois ENTIER, et les deux frais d'inscription restent positifs.
      let x = 6;
      let p = 12;
      let q = 5;
      let g = 150;
      let f = 108;
      for (let essai = 0; essai < 60; essai++) {
        x = randomInt(4, 20);
        p = pick([8, 10, 12, 15, 18, 20] as const);
        q = pick([3, 4, 5, 6, 7] as const);
        g = pick([80, 100, 120, 150, 180, 200] as const);
        f = g - (p - q) * x;
        // ⚠️ Sans ce garde-fou, l'offre « Liberté » finissait à $-260$ € à
        // l'inscription : un frais NÉGATIF, que rien n'aurait signalé.
        if (f >= 20) break;
      }
      // ⚠️ L'ARTICLE EST DANS LE RÉSERVOIR, pas dans la phrase : « une salle »
      // mais « un logiciel ». Écrire « pour une ${objet} » donnait « une
      // logiciel de gestion ». Même règle que les réservoirs de contexte des
      // données croisées, qui portent leur genre.
      const offres = pick([
        { objet: "une salle de sport", a: "Liberté", b: "Sérénité" },
        { objet: "un abonnement téléphonique", a: "Mobile+", b: "Confort" },
        { objet: "un logiciel de gestion", a: "Starter", b: "Pro" },
        { objet: "une location de matériel", a: "Souple", b: "Longue durée" },
      ] as const);
      return {
        text:
          `Deux offres pour ${offres.objet}. ` +
          `L'offre « ${offres.a} » : $${f}$ € à l'inscription, puis $${p}$ € par mois. ` +
          `L'offre « ${offres.b} » : $${g}$ € à l'inscription, puis $${q}$ € par mois. ` +
          `Au bout de combien de mois les deux offres coûtent-elles la même chose ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "Mettre en équation, c'est écrire la même grandeur de deux façons. Ici, le coût total au bout de $x$ mois vaut « inscription $+$ mensualité $\\times$ nombre de mois » pour chacune des offres.",
          "On écrit les deux coûts, on pose l'égalité, puis on regroupe les $x$ d'un côté et les nombres de l'autre.",
          `« ${offres.a} » : $${f} + ${p}x$. « ${offres.b} » : $${g} + ${q}x$. ` +
            `L'égalité $${f} + ${p}x = ${g} + ${q}x$ donne $${p - q}x = ${g - f}$, donc $x = \\dfrac{${g - f}}{${p - q}} = ${x}$.`,
          `Les deux offres coûtent la même chose au bout de $${x}$ mois — ` +
            `avant, « ${offres.a} » est plus avantageuse ; après, c'est « ${offres.b} ».`
        ),
      };
    },
  },

  /* ═══════════════════ auto_alg_inequation ═══════════════════ */

  {
    kind: "template",
    id: "stmg_alg_inequation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_equations",
    microId: "auto_alg_inequation",
    difficulty: 3,
    theme: "neutral",
    hint: "Diviser par un nombre NÉGATIF renverse le sens de l'inégalité.",
    tags: ["stmg", "maths", "algebre", "inequations", "template"],
    generate: () => {
      const x = randomInt(-6, 8);
      const a = pick([-5, -4, -3, -2, 2, 3, 4, 5] as const);
      const b = randomInt(-9, 9);
      const c = a * x + b;
      const negatif = a < 0;
      // « ax + b ≥ c » : la solution est x ≤ … si a < 0, x ≥ … sinon.
      const bonne = negatif ? `$x \\leqslant ${x}$` : `$x \\geqslant ${x}$`;
      const piege = negatif ? `$x \\geqslant ${x}$` : `$x \\leqslant ${x}$`;
      return {
        text: `Résous l'inéquation : $${binome(a, b)} \\geqslant ${c}$`,
        format: "qcm",
        choices: makeChoices(bonne, [
          piege,
          `$x \\geqslant ${-x}$`,
          `$x \\leqslant ${-x}$`,
          `$x \\geqslant ${x + 1}$`,
          `$x \\leqslant ${x - 1}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une inéquation se résout comme une équation, à une règle près : multiplier ou diviser par un nombre négatif RENVERSE le sens de l'inégalité.",
          "On isole le terme en $x$, puis on divise par son coefficient en surveillant son signe.",
          `$${binome(a, b)} \\geqslant ${c}$ donne $${a}x \\geqslant ${c - b}$. ` +
            `Le coefficient $${a}$ est ${negatif ? "NÉGATIF : on divise et l'on renverse le sens" : "positif : le sens est conservé"}, ` +
            `d'où ${bonne}.`,
          `L'ensemble des solutions est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: piege,
            cause: negatif
              ? "a divisé par un nombre négatif sans renverser le sens de l'inégalité"
              : "a renversé le sens de l'inégalité alors que le coefficient est positif",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — la RÈGLE, pas le résultat. Le premier item fait résoudre une
    // inéquation entière ; celui-ci isole l'unique étape où tout se joue : la
    // division par un nombre négatif, qui retourne le sens. C'est la faute la
    // plus fréquente du chapitre, et elle survit à des exercices entiers
    // réussis quand le coefficient était positif.
    kind: "template",
    id: "stmg_alg_inequation_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_equations",
    microId: "auto_alg_inequation",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier ou diviser une inégalité par un nombre NÉGATIF en retourne le sens.",
    tags: ["stmg", "maths", "algebre", "equations", "piege", "template"],
    generate: () => {
      const k = pick([2, 3, 4, 5, 6] as const);
      const s = randomInt(2, 12);
      const produit = k * s;
      const sensDepart = pick([">", "<"] as const);
      const sensArrivee = sensDepart === ">" ? "<" : ">";
      const bonne = `$x ${sensArrivee} ${s}$`;
      return {
        text:
          `En résolvant une inéquation, on arrive à $-${k}x ${sensDepart} -${produit}$. ` +
          `On divise les deux membres par $-${k}$. Qu'obtient-on ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `$x ${sensDepart} ${s}$`,
          `$x ${sensArrivee} -${s}$`,
          `$x ${sensDepart} -${s}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une inégalité se conserve quand on ajoute ou retranche un nombre, et quand on multiplie ou divise par un nombre POSITIF. Mais multiplier ou diviser par un nombre NÉGATIF en retourne le sens.",
          "On effectue la division sur les deux membres, et l'on retourne le symbole parce que le diviseur est négatif.",
          `$\\dfrac{-${produit}}{-${k}} = ${s}$ : deux négatifs donnent un positif. ` +
            `Et comme on a divisé par $-${k}$, le symbole $${sensDepart}$ devient $${sensArrivee}$, d'où $x ${sensArrivee} ${s}$. ` +
            `Pour s'en convaincre : $-2 < 4$, mais en divisant par $-2$ on obtient $1 > -2$.`,
          `On obtient $x ${sensArrivee} ${s}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$x ${sensDepart} ${s}$`,
            cause: "a bien calculé le quotient, mais a gardé le sens de l'inégalité : la division par un négatif le retourne",
          },
          {
            choice: `$x ${sensArrivee} -${s}$`,
            cause: "a retourné le sens, mais a laissé un signe moins : un quotient de deux nombres négatifs est positif",
          },
        ],
      };
    },
  },

  /* ═══════════════════ auto_alg_equation_carre ═══════════════════ */

  {
    kind: "template",
    id: "stmg_alg_carre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_equations",
    microId: "auto_alg_equation_carre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une équation $x^2 = a$ avec $a > 0$ a DEUX solutions opposées.",
    tags: ["stmg", "maths", "algebre", "equations", "piege", "template"],
    generate: () => {
      const r = randomInt(2, 12);
      const carre = r * r;
      return {
        text: `Résous l'équation : $x^2 = ${carre}$`,
        format: "qcm",
        choices: makeChoices(`$x = ${r}$ ou $x = -${r}$`, [
          `$x = ${r}$`,
          `$x = ${carre / 2}$`,
          `$x = -${r}$`,
          `$x = ${carre}$ ou $x = -${carre}$`,
          `pas de solution`,
        ]),
        expected: [`$x = ${r}$ ou $x = -${r}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour $a > 0$, l'équation $x^2 = a$ admet exactement deux solutions : $\\sqrt{a}$ et $-\\sqrt{a}$.",
          "On cherche les nombres dont le carré vaut $a$, sans oublier le négatif.",
          `$${r}^2 = ${carre}$ et $(-${r})^2 = ${carre}$.`,
          `Les solutions sont $${r}$ et $-${r}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$x = ${r}$`,
            cause: "a oublié la solution négative",
          },
          {
            choice: `$x = ${carre / 2}$`,
            cause: "a divisé par 2 au lieu de chercher une racine carrée",
          },
        ],
      };
    },
  },

  {
    kind: "fixed",
    id: "stmg_alg_carre_fix_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_equations",
    microId: "auto_alg_equation_carre",
    difficulty: 3,
    theme: "neutral",
    hint: "Un carré est toujours positif ou nul.",
    tags: ["stmg", "maths", "algebre", "equations", "piege", "fixed"],
    text: "Combien l'équation $x^2 = -9$ admet-elle de solutions ?",
    format: "qcm",
    choices: ["aucune", "une seule : $x = -3$", "deux : $x = 3$ et $x = -3$", "une seule : $x = 3$"],
    expected: ["aucune"],
    comparator: "mcq_exact",
    explanation: exp(
      "Le carré d'un nombre réel est toujours positif ou nul.",
      "On compare le second membre à zéro avant de chercher une racine.",
      "Aucun réel élevé au carré ne peut donner $-9$ : $3^2 = 9$ et $(-3)^2 = 9$, jamais $-9$.",
      "L'équation $x^2 = -9$ n'a aucune solution réelle."
    ),
    choiceDiagnostics: [
      {
        choice: "une seule : $x = -3$",
        cause: "a transporté le signe moins dans la solution, alors qu'il empêche toute solution",
      },
    ],
  },

  /* ═══════════════════ auto_alg_produit_nul ═══════════════════ */

  {
    kind: "template",
    id: "stmg_alg_produit_nul_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_equations",
    microId: "auto_alg_produit_nul",
    difficulty: 2,
    theme: "neutral",
    hint: "Un produit est nul si, et seulement si, l'un au moins de ses facteurs est nul.",
    tags: ["stmg", "maths", "algebre", "equations", "template"],
    generate: () => {
      const r1 = pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5] as const);
      let r2 = pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6] as const).valueOf();
      if (r2 === r1) r2 = r1 + 1;
      // ⛔ Racines OPPOSÉES interdites. Le distracteur ci-dessous est
      // « $x = -petite$ ou $x = -grande$ » : sur $(x+4)(x-4)$, il devient
      // « $x = 4$ ou $x = -4$ », c'est-à-dire la bonne réponse écrite dans
      // l'autre sens. L'élève qui la coche a raison et serait compté faux.
      if (r2 === -r1) r2 = r1 > 0 ? -r1 - 1 : -r1 + 1;
      const petite = Math.min(r1, r2);
      const grande = Math.max(r1, r2);
      return {
        text: `Résous l'équation : $${facteur(r1)}${facteur(r2)} = 0$`,
        format: "qcm",
        choices: makeChoices(`$x = ${petite}$ ou $x = ${grande}$`, [
          `$x = ${-petite}$ ou $x = ${-grande}$`,
          `$x = ${petite * grande}$`,
          `$x = ${petite + grande}$`,
          `$x = ${petite}$ seulement`,
          `pas de solution`,
        ]),
        expected: [`$x = ${petite}$ ou $x = ${grande}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un produit de facteurs est nul si, et seulement si, l'un au moins des facteurs est nul.",
          "On annule chaque facteur séparément.",
          `$${facteur(r1)} = 0$ donne $x = ${r1}$ ; $${facteur(r2)} = 0$ donne $x = ${r2}$.`,
          `Les solutions sont $${petite}$ et $${grande}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$x = ${-petite}$ ou $x = ${-grande}$`,
            cause: "a lu la racine directement dans la parenthèse sans changer le signe",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — la CONDITION de la règle. Le premier item applique le produit
    // nul à un produit égal à zéro ; celui-ci montre un élève l'appliquer à un
    // produit égal à douze. La règle est juste, l'usage est faux — et tant
    // qu'on n'a pas vu POURQUOI le zéro est indispensable, rien n'empêche de la
    // transporter partout.
    kind: "template",
    id: "stmg_alg_produit_nul_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_equations",
    microId: "auto_alg_produit_nul",
    difficulty: 3,
    theme: "neutral",
    hint: "Zéro est le seul nombre qu'on ne peut obtenir qu'en multipliant par lui : $3 \\times 4$ fait $12$ sans qu'aucun facteur ne vaille $12$.",
    tags: ["stmg", "maths", "algebre", "equations", "piege", "template"],
    generate: () => {
      const r1 = pick([-6, -5, -4, -3, -2, 2, 3, 4] as const);
      const r2 = pick([-1, 1, 5, 6, 7, 8] as const);
      // Valeurs PAIRES seulement : le distracteur « la moitié à chaque
      // facteur » affiche $${valeur / 2}$, et $7{,}5$ écrit « 7.5 » aurait
      // trahi le distracteur autant qu'il aurait piqué les yeux.
      const valeur = pick([6, 10, 12, 16, 18, 20] as const);
      const bonne =
        "la règle du produit nul ne vaut que si le produit est ÉGAL À ZÉRO";
      return {
        text:
          `Pour résoudre $${facteur(r1)}${facteur(r2)} = ${valeur}$, un élève écrit : ` +
          `« $${facteur(r1)} = ${valeur}$ ou $${facteur(r2)} = ${valeur}$ ». Pourquoi est-ce faux ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `il fallait écrire $${facteur(r1)} = ${valeur}$ ET $${facteur(r2)} = ${valeur}$`,
          `il fallait diviser $${valeur}$ par $2$ et donner $${valeur / 2}$ à chaque facteur`,
          "il n'y a pas d'erreur : le raisonnement est correct",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un produit est nul si, et seulement si, l'un au moins de ses facteurs est nul. Cette équivalence est propre à ZÉRO : aucun autre nombre ne se comporte ainsi.",
          "Devant une équation produit qui n'est pas égale à zéro, on développe et l'on ramène tout dans le même membre pour retrouver un second membre nul.",
          `Un produit vaut $${valeur}$ d'une infinité de façons — $1 \\times ${valeur}$, $2 \\times ${valeur / 2}$, ` +
            `$${valeur * 2} \\times 0{,}5$ — sans qu'aucun facteur ne vaille $${valeur}$. ` +
            `Il faut donc développer $${facteur(r1)}${facteur(r2)} = ${valeur}$, puis tout ramener à gauche pour obtenir un produit ÉGAL À ZÉRO.`,
          `L'erreur est d'avoir appliqué la règle du produit nul à un produit qui ne vaut pas zéro.`
        ),
        choiceDiagnostics: [
          {
            choice: `il fallait écrire $${facteur(r1)} = ${valeur}$ ET $${facteur(r2)} = ${valeur}$`,
            cause: "remplacer le « ou » par un « et » ne corrige rien : le problème n'est pas le connecteur, c'est le second membre",
          },
          {
            choice: `il fallait diviser $${valeur}$ par $2$ et donner $${valeur / 2}$ à chaque facteur`,
            cause: `rien n'oblige les deux facteurs à être égaux : $${valeur}$ se décompose d'une infinité de façons`,
          },
        ],
      };
    },
  },

  /* ═══════════ auto_alg_signe_premier_degre ═══════════ */

  {
    kind: "template",
    id: "stmg_alg_signe_premier_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_signes",
    microId: "auto_alg_signe_premier_degre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une expression du premier degré s'annule une fois et change de signe à cet endroit.",
    tags: ["stmg", "maths", "algebre", "signes", "template"],
    generate: () => {
      const racine = randomInt(-5, 6);
      const a = pick([1, 2, 3, 4, -1, -2, -3, -4] as const);
      const b = -a * racine;
      const positifApres = a > 0;
      const bonne = positifApres
        ? `positive sur $]${racine}\\,;\\,+\\infty[$`
        : `positive sur $]-\\infty\\,;\\,${racine}[$`;
      return {
        text: `Étudie le signe de $${binome(a, b)}$. Cette expression est :`,
        format: "qcm",
        choices: makeChoices(bonne, [
          positifApres ? `positive sur $]-\\infty\\,;\\,${racine}[$` : `positive sur $]${racine}\\,;\\,+\\infty[$`,
          "positive sur $\\mathbb{R}$",
          "négative sur $\\mathbb{R}$",
          `positive sur $]0\\,;\\,+\\infty[$`,
          `positive sur $]${racine + 1}\\,;\\,+\\infty[$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une expression $ax + b$ s'annule en $x = -\\dfrac{b}{a}$ et change de signe en ce point : elle est du signe de $a$ après cette valeur.",
          "On cherche la racine, puis on regarde le signe du coefficient de $x$.",
          `$${binome(a, b)} = 0$ pour $x = ${racine}$. Le coefficient $${a}$ est ${a > 0 ? "positif" : "négatif"}, ` +
            `donc l'expression est ${a > 0 ? "négative avant, positive après" : "positive avant, négative après"}.`,
          `Elle est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: positifApres ? `positive sur $]-\\infty\\,;\\,${racine}[$` : `positive sur $]${racine}\\,;\\,+\\infty[$`,
            cause: "n'a pas tenu compte du signe du coefficient de $x$",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — le signe SERT À QUELQUE CHOSE. Le premier item demande sur
    // quel intervalle une expression est positive ; celui-ci demande à partir
    // de combien d'unités vendues l'entreprise gagne de l'argent. C'est
    // exactement le même calcul — et c'est la raison pour laquelle le
    // programme fait étudier des signes.
    kind: "template",
    id: "stmg_alg_signe_premier_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_signes",
    microId: "auto_alg_signe_premier_degre",
    difficulty: 3,
    theme: "neutral",
    hint: "Le bénéfice devient positif quand $ux$ dépasse les frais fixes : cherche le premier ENTIER qui convient.",
    tags: ["stmg", "maths", "algebre", "signes", "template", "short"],
    generate: () => {
      const u = pick([7, 9, 11, 12, 13, 14, 16, 18] as const);
      // Frais fixes NON divisibles par la marge unitaire : le seuil tombe alors
      // entre deux entiers, et « à partir de quelle unité » a une seule
      // réponse. Avec une division juste, le rang où le bénéfice est NUL
      // deviendrait une seconde réponse défendable.
      let fixes = 500;
      for (let essai = 0; essai < 60; essai++) {
        fixes = randomInt(20, 90) * 10;
        if (fixes % u !== 0) break;
      }
      const seuil = Math.ceil(fixes / u);
      const produit = pick([
        "coffrets cadeaux",
        "paniers garnis",
        "tee-shirts imprimés",
        "planches de surf",
        "carnets reliés",
      ] as const);
      return {
        text:
          `Un atelier vend des ${produit}. Chaque vente rapporte $${u}$ € de marge, ` +
          `et les frais fixes du mois s'élèvent à $${fixes}$ €. ` +
          `Le bénéfice du mois vaut donc $B(x) = ${u}x - ${fixes}$, où $x$ est le nombre de ventes. ` +
          `À partir de combien de ventes le bénéfice devient-il POSITIF ?`,
        format: "short",
        expected: [String(seuil)],
        comparator: "number_equal",
        explanation: exp(
          "Une expression du premier degré $ux - f$ (avec $u > 0$) est négative avant sa racine, nulle en cette racine, et positive après. Étudier son signe, c'est trouver ce point de bascule.",
          "On résout $ux - f > 0$, soit $x > \\dfrac{f}{u}$, puis on prend le premier nombre entier qui convient — on ne vend pas une fraction d'article.",
          `$${u}x - ${fixes} > 0$ donne $x > \\dfrac{${fixes}}{${u}} \\approx ${fr(Math.round((fixes / u) * 100) / 100)}$. ` +
            `Le premier entier au-dessus est $${seuil}$ : à $${seuil}$ ventes, $B = ${u * seuil} - ${fixes} = ${u * seuil - fixes}$ €, ` +
            `alors qu'à $${seuil - 1}$ ventes il vaut encore $${u * (seuil - 1) - fixes}$ €.`,
          `Le bénéfice devient positif à partir de $${seuil}$ ventes — c'est le seuil de rentabilité.`
        ),
      };
    },
  },

  /* ═══════════ auto_alg_signe_factorisee ═══════════ */

  {
    kind: "template",
    id: "stmg_alg_signe_factorisee_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_signes",
    microId: "auto_alg_signe_factorisee",
    difficulty: 3,
    theme: "neutral",
    hint: "Pense à l'allure de la parabole : entre les racines, elle est du signe contraire à $a$.",
    tags: ["stmg", "maths", "algebre", "signes", "canvas", "template"],
    generate: () => {
      const r1 = randomInt(-4, 1);
      const r2 = r1 + randomInt(2, 5);
      const a = pick([1, 2, -1, -2] as const);
      const bonne =
        a > 0
          ? `négative entre $${r1}$ et $${r2}$, positive ailleurs`
          : `positive entre $${r1}$ et $${r2}$, négative ailleurs`;
      // Forme développée, pour tracer la parabole : a(x-r1)(x-r2).
      const B = -a * (r1 + r2);
      const C = a * r1 * r2;
      const yBornes = [a * (-6 - r1) * (-6 - r2), a * (6 - r1) * (6 - r2)];
      const ymax = Math.max(...yBornes, 2);
      const ymin = Math.min(...yBornes, a * ((r1 + r2) / 2 - r1) * ((r1 + r2) / 2 - r2), -2);
      return {
        text: `La courbe tracée représente $f(x) = ${a === 1 ? "" : a === -1 ? "-" : a}${facteur(r1)}${facteur(r2)}$. Cette expression est :`,
        format: "qcm",
        choices: makeChoices(bonne, [
          a > 0
            ? `positive entre $${r1}$ et $${r2}$, négative ailleurs`
            : `négative entre $${r1}$ et $${r2}$, positive ailleurs`,
          "positive sur $\\mathbb{R}$",
          "négative sur $\\mathbb{R}$",
          `négative entre $${r1 - 1}$ et $${r2}$, positive ailleurs`,
          `positive entre $${r1}$ et $${r2 + 1}$, négative ailleurs`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: {
          kind: "fonctionGraphique",
          titre: "Courbe représentative de f",
          xmin: -6,
          xmax: 6,
          ymin: Math.floor(ymin) - 2,
          ymax: Math.ceil(ymax) + 2,
          grille: true,
          courbes: [{ id: "p", type: "quadratique", a, b: B, c: C }],
          misesEnEvidence: [{ horizontale: { y: 0 } }],
        } satisfies CanvasFigure,
        explanation: exp(
          "Une expression factorisée du second degré s'annule en ses deux racines et change de signe à chacune.",
          "Le BO demande de s'appuyer sur l'image mentale de la parabole : entre les racines, elle est du signe contraire à celui de $a$ ; à l'extérieur, du signe de $a$.",
          `Les racines sont $${r1}$ et $${r2}$, et $a = ${a}$ est ${a > 0 ? "positif : la parabole est tournée vers le haut, donc en dessous de l'axe entre les racines" : "négatif : la parabole est tournée vers le bas, donc au-dessus de l'axe entre les racines"}.`,
          `L'expression est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice:
              a > 0
                ? `positive entre $${r1}$ et $${r2}$, négative ailleurs`
                : `négative entre $${r1}$ et $${r2}$, positive ailleurs`,
            cause: "a inversé le signe : c'est celui de $a$ qui vaut À L'EXTÉRIEUR des racines",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — SANS la courbe. Le premier item donne la parabole tracée et
    // fait lire le signe dessus ; celui-ci n'offre aucune figure et oblige à
    // multiplier les signes des deux facteurs. Le BO demande de s'appuyer sur
    // « une image mentale de la courbe » : il faut donc aussi savoir conclure
    // quand personne ne l'a dessinée.
    kind: "template",
    id: "stmg_alg_signe_factorisee_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_signes",
    microId: "auto_alg_signe_factorisee",
    difficulty: 3,
    theme: "neutral",
    hint: "Entre les deux racines, un facteur est positif et l'autre négatif : leur produit est négatif, avant d'être multiplié par $a$.",
    tags: ["stmg", "maths", "algebre", "signes", "template"],
    generate: () => {
      const r1 = randomInt(-5, 1);
      const r2 = r1 + randomInt(2, 6);
      const a = pick([-3, -2, -1, 1, 2, 3] as const);
      const prefixe = a === 1 ? "" : a === -1 ? "-" : String(a);
      // Entre les racines, $(x - r_1)(x - r_2)$ est négatif : le signe de $f$ y
      // est donc l'OPPOSÉ de celui de $a$.
      const bonne = a > 0 ? "négatif" : "positif";
      const milieu = (r1 + r2) / 2;
      return {
        text:
          `Soit $f(x) = ${prefixe}${facteur(r1)}${facteur(r2)}$. ` +
          `Sans tracer la courbe, quel est le signe de $f(x)$ pour $x$ strictement compris entre $${r1}$ et $${r2}$ ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          a > 0 ? "positif" : "négatif",
          "nul",
          "il change de signe sur cet intervalle",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le signe d'un produit est le produit des signes de ses facteurs. Un facteur $(x - r)$ est négatif avant $r$ et positif après.",
          "On place $x$ entre les deux racines, on donne son signe à chaque facteur, puis on multiplie — sans oublier le coefficient devant.",
          `Pour $${r1} < x < ${r2}$ : $x ${r1 >= 0 ? "-" : "+"} ${Math.abs(r1)}$ est POSITIF (on a dépassé $${r1}$) ` +
            `et $x ${r2 >= 0 ? "-" : "+"} ${Math.abs(r2)}$ est NÉGATIF (on n'a pas atteint $${r2}$). ` +
            `Leur produit est donc négatif, et multiplié par $${a}$ il devient ${bonne}. ` +
            `Vérification en $x = ${fr(milieu)}$ : $f(${fr(milieu)}) = ${fr(a * (milieu - r1) * (milieu - r2))}$.`,
          `Entre les racines, $f(x)$ est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: a > 0 ? "positif" : "négatif",
            cause: `a donné à l'intérieur le signe de $a$ : c'est À L'EXTÉRIEUR des racines que $f$ prend le signe de $a$`,
          },
          {
            choice: "il change de signe sur cet intervalle",
            cause: "une expression ne change de signe qu'en s'annulant, donc en une racine — et il n'y en a aucune entre les deux",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_alg_tableau_signes ═══════════════ */

  {
    kind: "template",
    id: "stmg_alg_tableau_signes_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_signes",
    microId: "auto_alg_tableau_signes",
    difficulty: 3,
    theme: "neutral",
    hint: "Le signe du produit est le produit des signes : deux moins font un plus.",
    tags: ["stmg", "maths", "algebre", "signes", "canvas", "template"],
    generate: () => {
      const r1 = randomInt(-4, 1);
      const r2 = r1 + randomInt(2, 5);
      const zone = pick(["avant", "entre", "apres"] as const);
      const signeAttendu = zone === "entre" ? "négatif" : "positif";
      const intervalle =
        zone === "avant"
          ? `$]-\\infty\\,;\\,${r1}[$`
          : zone === "entre"
            ? `$]${r1}\\,;\\,${r2}[$`
            : `$]${r2}\\,;\\,+\\infty[$`;
      return {
        text:
          `Le tableau donne les signes des deux facteurs de $P(x) = ${facteur(r1)}${facteur(r2)}$. ` +
          `Quel est le signe de $P(x)$ sur ${intervalle} ?`,
        format: "qcm",
        choices: shuffle(["positif", "négatif", "nul", "on ne peut pas conclure"]),
        expected: [signeAttendu],
        comparator: "mcq_exact",
        canvas: {
          kind: "tableau_donnees",
          title: `Tableau de signes de P(x) = ${facteur(r1)}${facteur(r2)}`,
          caption: "Signe de chaque facteur sur les trois intervalles",
          headers: ["x", `]-∞ ; ${r1}[`, `]${r1} ; ${r2}[`, `]${r2} ; +∞[`],
          rows: [
            { label: `x ${r1 >= 0 ? "-" : "+"} ${Math.abs(r1)}`, values: ["−", "+", "+"] },
            { label: `x ${r2 >= 0 ? "-" : "+"} ${Math.abs(r2)}`, values: ["−", "−", "+"] },
            { label: "P(x)", values: ["?", "?", "?"] },
          ],
          highlight: { col: zone === "avant" ? 1 : zone === "entre" ? 2 : 3 },
        } satisfies CanvasFigure,
        explanation: exp(
          "Dans un tableau de signes, la ligne du produit s'obtient en multipliant les signes de chaque colonne.",
          "On lit la colonne demandée et l'on applique la règle des signes.",
          zone === "avant"
            ? `Sur $]-\\infty\\,;\\,${r1}[$, les deux facteurs sont négatifs : $(-) \\times (-) = (+)$.`
            : zone === "entre"
              ? `Sur $]${r1}\\,;\\,${r2}[$, le premier facteur est positif et le second négatif : $(+) \\times (-) = (-)$.`
              : `Sur $]${r2}\\,;\\,+\\infty[$, les deux facteurs sont positifs : $(+) \\times (+) = (+)$.`,
          `Sur ${intervalle}, $P(x)$ est ${signeAttendu}.`
        ),
        choiceDiagnostics: [
          {
            choice: "on ne peut pas conclure",
            cause: "n'a pas vu que la règle des signes suffit à remplir la dernière ligne",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — SE SERVIR du tableau, au lieu de le remplir. Le premier item
    // fait trouver le signe d'une case ; celui-ci part du tableau complet et
    // demande de RÉSOUDRE une inéquation avec. C'est à quoi sert un tableau de
    // signes, et la borne fermée y décide de tout : $\leqslant$ garde les
    // racines, $<$ les écarte.
    kind: "template",
    id: "stmg_alg_tableau_signes_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_signes",
    microId: "auto_alg_tableau_signes",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention aux crochets : avec $\\leqslant$, les valeurs qui annulent l'expression font partie de la solution.",
    tags: ["stmg", "maths", "algebre", "signes", "canvas", "piege", "template"],
    generate: () => {
      const r1 = randomInt(-4, 1);
      const r2 = r1 + randomInt(2, 5);
      const bonne = `$[${r1}\\,;\\,${r2}]$`;
      return {
        text:
          `Le tableau donne le signe de $P(x) = ${facteur(r1)}${facteur(r2)}$. ` +
          `Quel est l'ensemble des solutions de $P(x) \\leqslant 0$ ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `$]${r1}\\,;\\,${r2}[$`,
          `$]-\\infty\\,;\\,${r1}] \\cup [${r2}\\,;\\,+\\infty[$`,
          `$[${r2}\\,;\\,+\\infty[$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: {
          kind: "tableau_donnees",
          title: `Tableau de signes de P(x) = ${facteur(r1)}${facteur(r2)}`,
          caption: "Signe de chaque facteur, puis du produit",
          headers: ["x", `]-∞ ; ${r1}[`, `${r1}`, `]${r1} ; ${r2}[`, `${r2}`, `]${r2} ; +∞[`],
          rows: [
            // `facteur()` écrit « x » et non « x - 0 » quand la racine est nulle.
            { label: facteur(r1).replace(/[()]/g, ""), values: ["−", "0", "+", "+", "+"] },
            { label: facteur(r2).replace(/[()]/g, ""), values: ["−", "−", "−", "0", "+"] },
            { label: "P(x)", values: ["+", "0", "−", "0", "+"] },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Résoudre $P(x) \\leqslant 0$, c'est réunir tous les intervalles où la dernière ligne du tableau porte un $-$, ET les valeurs où elle porte un $0$ — car $\\leqslant$ autorise l'égalité.",
          "On lit la ligne du produit, on retient les zones négatives, puis on décide des crochets : fermés si l'inégalité est large, ouverts si elle est stricte.",
          `$P(x)$ est négatif sur $]${r1}\\,;\\,${r2}[$, et nul en $${r1}$ et en $${r2}$. ` +
            `Comme l'inégalité est LARGE, ces deux valeurs conviennent aussi : les crochets se ferment, ` +
            `et l'ensemble des solutions est $[${r1}\\,;\\,${r2}]$. ` +
            `Avec $P(x) < 0$, on aurait écrit $]${r1}\\,;\\,${r2}[$.`,
          `L'ensemble des solutions est $[${r1}\\,;\\,${r2}]$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$]${r1}\\,;\\,${r2}[$`,
            cause: `a oublié que $\\leqslant$ garde les racines : $P(${r1}) = 0$, qui vérifie bien l'inégalité`,
          },
          {
            choice: `$]-\\infty\\,;\\,${r1}] \\cup [${r2}\\,;\\,+\\infty[$`,
            cause: "a retenu les zones où le produit est POSITIF : c'est la solution de l'inégalité contraire",
          },
        ],
      };
    },
  },

  /* ═══════════════════ auto_alg_litteral ═══════════════════ */

  {
    kind: "template",
    id: "stmg_alg_litteral_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_formules",
    microId: "auto_alg_litteral",
    difficulty: 2,
    theme: "neutral",
    hint: "Le signe moins devant une parenthèse change le signe de TOUS les termes qu'elle contient.",
    tags: ["stmg", "maths", "algebre", "template"],
    generate: () => {
      const a = randomInt(1, 6);
      const b = pick([-8, -6, -5, -3, -2, 2, 3, 5, 6, 8] as const);
      const c = randomInt(1, 6);
      const d = pick([-9, -7, -4, -1, 1, 4, 7, 9] as const);
      const A = a - c;
      const B = b - d;
      return {
        text: `Réduis l'expression : $(${binome(a, b)}) - (${binome(c, d)})$`,
        format: "qcm",
        choices: makeChoices(`$${binome(A, B)}$`, [
          `$${binome(a + c, b + d)}$`,
          `$${binome(A, b + d)}$`,
          `$${binome(a + c, B)}$`,
          `$${binome(-A, -B)}$`,
          `$${binome(A, B + 1)}$`,
        ]),
        expected: [`$${binome(A, B)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un signe moins devant une parenthèse change le signe de chacun des termes de cette parenthèse.",
          "On distribue le moins, puis on regroupe les termes semblables.",
          `$(${binome(a, b)}) - (${binome(c, d)}) = ${binome(a, b)} ${-c >= 0 ? "+" : "-"} ${Math.abs(c)}x ${-d >= 0 ? "+" : "-"} ${Math.abs(d)} = ${binome(A, B)}$.`,
          `L'expression réduite est $${binome(A, B)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${binome(A, b + d)}$`,
            cause: "n'a changé le signe que du premier terme de la parenthèse",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — trouver l'erreur, pas la bonne réponse. Le premier item fait
    // réduire ; celui-ci montre une réduction où le moins n'a été distribué
    // qu'au premier terme — l'erreur exacte que le diagnostic de tpl_1 nomme,
    // ici mise en scène. Reconnaître sa propre faute chez un autre est le
    // moyen le plus court de cesser de la commettre.
    kind: "template",
    id: "stmg_alg_litteral_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_formules",
    microId: "auto_alg_litteral",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde le DERNIER terme de la seconde parenthèse : a-t-il changé de signe ?",
    tags: ["stmg", "maths", "algebre", "piege", "template"],
    generate: () => {
      const a = randomInt(2, 7);
      const b = pick([3, 4, 5, 6, 7, 8] as const);
      const c = randomInt(1, 5);
      // d NÉGATIF : c'est là que la faute se voit — « - (… - d) » doit rendre
      // « + d », et l'élève laisse « - d ».
      const d = pick([-9, -7, -6, -4, -3, -2] as const);
      const justeA = a - c;
      const justeB = b - d;
      const fauxB = b + d;
      const bonne = `le $-$ devant la parenthèse change AUSSI le signe de $${d}$, qui devient $+${-d}$`;
      return {
        text:
          `Un élève écrit : « $(${binome(a, b)}) - (${binome(c, d)}) = ${binome(a, b)} - ${c}x ${d >= 0 ? "+" : "-"} ${Math.abs(d)} = ${binome(justeA, fauxB)}$ ». ` +
          `Où est l'erreur ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `il ne fallait pas changer le signe de $${c}x$`,
          "il fallait additionner les deux parenthèses au lieu de les soustraire",
          "il n'y a pas d'erreur : le calcul est juste",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Soustraire une parenthèse, c'est ajouter l'opposé de TOUT son contenu : chacun de ses termes change de signe, sans exception.",
          "On réécrit la soustraction en distribuant le moins sur chaque terme, puis on regroupe les termes semblables.",
          `$-(${binome(c, d)}) = -${c}x + ${-d}$, et non $-${c}x ${d >= 0 ? "+" : "-"} ${Math.abs(d)}$. ` +
            `Le calcul juste donne donc $${binome(justeA, justeB)}$, et non $${binome(justeA, fauxB)}$ : ` +
            `l'écart vaut $${justeB - fauxB}$, soit deux fois $${Math.abs(d)}$.`,
          `L'erreur porte sur le second terme de la parenthèse : le résultat correct est $${binome(justeA, justeB)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `il ne fallait pas changer le signe de $${c}x$`,
            cause: "ce terme-là est bien traité : c'est le suivant qui a gardé son signe",
          },
          {
            choice: "il n'y a pas d'erreur : le calcul est juste",
            cause: `le premier terme a bien changé de signe, le second non — d'où un écart de $${justeB - fauxB}$`,
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_alg_isoler_variable ═══════════════ */

  {
    kind: "template",
    id: "stmg_alg_isoler_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_formules",
    microId: "auto_alg_isoler_variable",
    difficulty: 3,
    theme: "neutral",
    hint: "On traite les autres lettres comme des nombres et on isole celle qui est demandée.",
    tags: ["stmg", "maths", "algebre", "formules", "template"],
    generate: () => {
      const cas = pick([
        { formule: "B = R - C", isoler: "R", bonne: "R = B + C", faux: ["R = B - C", "R = C - B", "R = BC"] },
        { formule: "B = R - C", isoler: "C", bonne: "C = R - B", faux: ["C = B - R", "C = B + R", "C = \\dfrac{R}{B}"] },
        { formule: "CA = p \\times q", isoler: "p", bonne: "p = \\dfrac{CA}{q}", faux: ["p = CA \\times q", "p = \\dfrac{q}{CA}", "p = CA - q"] },
        { formule: "CA = p \\times q", isoler: "q", bonne: "q = \\dfrac{CA}{p}", faux: ["q = CA \\times p", "q = \\dfrac{p}{CA}", "q = CA - p"] },
        { formule: "M = V - A", isoler: "V", bonne: "V = M + A", faux: ["V = M - A", "V = A - M", "V = MA"] },
        { formule: "P = 2(L + l)", isoler: "L", bonne: "L = \\dfrac{P}{2} - l", faux: ["L = P - 2l", "L = \\dfrac{P - l}{2}", "L = 2P - l"] },
        { formule: "d = v \\times t", isoler: "t", bonne: "t = \\dfrac{d}{v}", faux: ["t = d \\times v", "t = \\dfrac{v}{d}", "t = d - v"] },
        { formule: "T = \\dfrac{A}{B}", isoler: "A", bonne: "A = T \\times B", faux: ["A = \\dfrac{T}{B}", "A = \\dfrac{B}{T}", "A = T + B"] },
        { formule: "T = \\dfrac{A}{B}", isoler: "B", bonne: "B = \\dfrac{A}{T}", faux: ["B = A \\times T", "B = \\dfrac{T}{A}", "B = A - T"] },
        { formule: "CA = p \\times q", isoler: "q", bonne: "q = \\dfrac{CA}{p}", faux: ["q = CA \\times p", "q = \\dfrac{p}{CA}", "q = CA + p"] },
        { formule: "M = V - A", isoler: "A", bonne: "A = V - M", faux: ["A = M - V", "A = M + V", "A = \\dfrac{V}{M}"] },
        { formule: "P = 2(L + l)", isoler: "l", bonne: "l = \\dfrac{P}{2} - L", faux: ["l = P - 2L", "l = \\dfrac{P - L}{2}", "l = 2P - L"] },
        { formule: "d = v \\times t", isoler: "v", bonne: "v = \\dfrac{d}{t}", faux: ["v = d \\times t", "v = \\dfrac{t}{d}", "v = d - t"] },
        { formule: "C = f + u \\times x", isoler: "x", bonne: "x = \\dfrac{C - f}{u}", faux: ["x = \\dfrac{C}{u} - f", "x = C - f - u", "x = \\dfrac{C - u}{f}"] },
        { formule: "C = f + u \\times x", isoler: "f", bonne: "f = C - u \\times x", faux: ["f = \\dfrac{C}{u \\times x}", "f = C + u \\times x", "f = \\dfrac{C - x}{u}"] },
      ] as const);
      return {
        text: `Dans la formule $${cas.formule}$, exprime $${cas.isoler}$ en fonction des autres grandeurs.`,
        format: "qcm",
        choices: makeChoices(`$${cas.bonne}$`, cas.faux.map((f) => `$${f}$`)),
        expected: [`$${cas.bonne}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Isoler une lettre dans une égalité, c'est appliquer les mêmes opérations aux deux membres jusqu'à ce qu'elle soit seule.",
          "On traite les autres lettres comme des nombres, et l'on défait les opérations dans l'ordre inverse.",
          `De $${cas.formule}$, on obtient $${cas.bonne}$.`,
          `On a $${cas.bonne}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — l'OPÉRATION, pas le résultat. Le premier item donne quatre
    // formules réécrites et fait choisir la bonne ; celui-ci demande quel geste
    // on applique aux deux membres. Un élève reconnaît souvent la bonne forme
    // sans savoir la produire — et devant une formule qu'aucun QCM ne lui
    // propose, il reste bloqué.
    kind: "template",
    id: "stmg_alg_isoler_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_formules",
    microId: "auto_alg_isoler_variable",
    difficulty: 2,
    theme: "neutral",
    hint: "On DÉFAIT l'opération qui gêne : une multiplication se défait par une division, une addition par une soustraction.",
    tags: ["stmg", "maths", "algebre", "formules", "template"],
    generate: () => {
      const cas = pick([
        {
          formule: "CA = p \\times q",
          isoler: "q",
          bonne: "diviser les deux membres par $p$",
          faux: ["multiplier les deux membres par $p$", "retrancher $p$ aux deux membres", "diviser les deux membres par $CA$"],
          pourquoi: "$q$ est MULTIPLIÉ par $p$ : on défait la multiplication par une division",
        },
        {
          formule: "B = R - C",
          isoler: "R",
          bonne: "ajouter $C$ aux deux membres",
          faux: ["retrancher $C$ aux deux membres", "multiplier les deux membres par $C$", "ajouter $B$ aux deux membres"],
          pourquoi: "$C$ est RETRANCHÉ à $R$ : on défait la soustraction par une addition",
        },
        {
          formule: "d = v \\times t",
          isoler: "v",
          bonne: "diviser les deux membres par $t$",
          faux: ["diviser les deux membres par $d$", "multiplier les deux membres par $t$", "retrancher $t$ aux deux membres"],
          pourquoi: "$v$ est MULTIPLIÉ par $t$ : on divise par $t$",
        },
        {
          formule: "T = \\dfrac{A}{B}",
          isoler: "A",
          bonne: "multiplier les deux membres par $B$",
          faux: ["diviser les deux membres par $B$", "ajouter $B$ aux deux membres", "multiplier les deux membres par $T$"],
          pourquoi: "$A$ est DIVISÉ par $B$ : on défait la division par une multiplication",
        },
        {
          formule: "C = f + u \\times x",
          isoler: "x",
          bonne: "retrancher $f$, PUIS diviser par $u$",
          faux: ["diviser par $u$, PUIS retrancher $f$", "retrancher $u$, puis diviser par $f$", "diviser les deux membres par $f$"],
          pourquoi: "deux opérations gênent $x$ ; on les défait dans l'ORDRE INVERSE de celui où elles s'appliquent",
        },
        {
          formule: "P = 2(L + l)",
          isoler: "L",
          bonne: "diviser par $2$, PUIS retrancher $l$",
          faux: ["retrancher $l$, PUIS diviser par $2$", "retrancher $2l$, puis diviser par $l$", "multiplier les deux membres par $2$"],
          pourquoi: "la parenthèse est multipliée par $2$ : on lève d'abord ce facteur, ensuite seulement on ouvre la somme",
        },
      ] as const);
      return {
        text:
          `Dans la formule $${cas.formule}$, on veut isoler $${cas.isoler}$. ` +
          `Quelle opération applique-t-on aux deux membres ?`,
        format: "qcm",
        choices: makeChoices(cas.bonne, cas.faux),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Isoler une lettre, c'est la débarrasser une à une des opérations qui l'entourent, en appliquant à CHAQUE membre la même opération inverse.",
          "On repère l'opération qui gêne la lettre cherchée, et l'on applique son contraire des deux côtés. Quand il y en a plusieurs, on les défait dans l'ordre inverse de leur application.",
          `Ici, ${cas.pourquoi}. En partant de $${cas.formule}$, l'opération à faire est donc : ${cas.bonne}.`,
          `On applique : ${cas.bonne}.`
        ),
      };
    },
  },

  /* ═══════════ auto_alg_application_formule ═══════════ */

  {
    kind: "template",
    id: "stmg_alg_application_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_formules",
    microId: "auto_alg_application_formule",
    difficulty: 2,
    theme: "neutral",
    hint: "On remplace chaque lettre par sa valeur, PUIS on calcule.",
    tags: ["stmg", "maths", "algebre", "formules", "template", "short"],
    generate: () => {
      const f = pick(FORMULES);
      if (f.nom === "le bénéfice") {
        const r = pick([1200, 1500, 2000, 2400, 3000, 3600] as const);
        const c = pick([800, 900, 1100, 1400, 1800, 2200] as const);
        return {
          text:
            `${f.nom.charAt(0).toUpperCase()}${f.nom.slice(1)} d'un mois se calcule par $${f.litteral}$ (${f.legende}). ` +
            `Calcule $B$ pour $R = ${r}$ et $C = ${c}$.`,
          format: "short",
          expected: [fr(r - c)],
          comparator: "number_equal",
          explanation: exp(
            "Une application numérique consiste à remplacer chaque lettre de la formule par la valeur donnée.",
            "On substitue, puis on effectue le calcul dans l'ordre des priorités.",
            `$B = ${r} - ${c} = ${fr(r - c)}$.`,
            `Le bénéfice est de $${fr(r - c)}$ €.`
          ),
        };
      }
      const p = pick([50, 80, 120, 200, 250, 400] as const);
      const t = pick([5.5, 10, 20] as const);
      return {
        text:
          `Le prix TTC se calcule par $P_{TTC} = P_{HT} \\times \\left(1 + \\dfrac{t}{100}\\right)$ (${f.legende}). ` +
          `Calcule $P_{TTC}$ pour $P_{HT} = ${p}$ et $t = ${fr(t)}$.`,
        format: "short",
        expected: [fr(Math.round(p * (1 + t / 100) * 100) / 100)],
        comparator: "number_equal",
        explanation: exp(
          "Une application numérique consiste à remplacer chaque lettre par la valeur donnée.",
          "On substitue, puis on effectue le calcul en respectant les parenthèses.",
          `$P_{TTC} = ${p} \\times \\left(1 + \\dfrac{${fr(t)}}{100}\\right) = ${p} \\times ${fr(1 + t / 100)} = ${fr(Math.round(p * (1 + t / 100) * 100) / 100)}$.`,
          `Le prix TTC est de $${fr(Math.round(p * (1 + t / 100) * 100) / 100)}$ €.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la donnée MANQUANTE. Le premier item remplace toutes les
    // lettres sauf une et fait calculer ; celui-ci donne le résultat et une des
    // données, et fait remonter à l'autre. C'est la question que pose un
    // tableau de bord — « on a fait 700 € de bénéfice pour 1 300 € de charges,
    // quel a été le chiffre d'affaires ? » — et elle mêle les deux gestes du
    // chapitre : isoler, puis appliquer.
    kind: "template",
    id: "stmg_alg_application_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_formules",
    microId: "auto_alg_application_formule",
    difficulty: 3,
    theme: "neutral",
    hint: "Isole d'abord la lettre cherchée dans la formule, et remplace seulement ensuite.",
    tags: ["stmg", "maths", "algebre", "formules", "template", "short"],
    generate: () => {
      const cas = pick(["benefice", "charges", "ht"] as const);
      if (cas === "benefice") {
        const c = pick([800, 900, 1100, 1400, 1800, 2200] as const);
        const b = pick([300, 450, 700, 950, 1200] as const);
        return {
          text:
            `Le bénéfice se calcule par $B = R - C$ ($R$ le chiffre d'affaires, $C$ les charges). ` +
            `Un mois, le bénéfice s'élève à $${b}$ € et les charges à $${c}$ €. ` +
            `Quel a été le chiffre d'affaires, en euros ?`,
          format: "short",
          expected: [String(b + c)],
          comparator: "number_equal",
          explanation: exp(
            "Une formule se lit dans tous les sens : elle relie ses grandeurs, et deux d'entre elles suffisent toujours à donner la troisième.",
            "On isole la lettre cherchée — ici $R = B + C$ —, puis on remplace par les valeurs connues.",
            `$R = B + C = ${b} + ${c} = ${b + c}$. ` +
              `Vérification : $${b + c} - ${c} = ${b}$, c'est bien le bénéfice annoncé.`,
            `Le chiffre d'affaires a été de $${b + c}$ €.`
          ),
        };
      }
      if (cas === "charges") {
        const r = pick([1500, 2000, 2400, 3000, 3600, 4200] as const);
        const b = pick([300, 450, 700, 950, 1200] as const);
        return {
          text:
            `Le bénéfice se calcule par $B = R - C$ ($R$ le chiffre d'affaires, $C$ les charges). ` +
            `Un mois, le chiffre d'affaires atteint $${r}$ € pour un bénéfice de $${b}$ €. ` +
            `À combien se sont élevées les charges, en euros ?`,
          format: "short",
          expected: [String(r - b)],
          comparator: "number_equal",
          explanation: exp(
            "Une formule se lit dans tous les sens : deux de ses grandeurs donnent toujours la troisième.",
            "On isole la lettre cherchée — ici $C = R - B$ —, puis on remplace par les valeurs connues.",
            `$C = R - B = ${r} - ${b} = ${r - b}$. ` +
              `Vérification : $${r} - ${r - b} = ${b}$, c'est bien le bénéfice annoncé.`,
            `Les charges se sont élevées à $${r - b}$ €.`
          ),
        };
      }
      // Prix HT retrouvé à partir du TTC : le taux choisi divise proprement,
      // pour que la réponse tombe à l'euro et non sur un arrondi discutable.
      const ht = pick([50, 80, 120, 200, 250, 400] as const);
      const t = pick([5.5, 10, 20] as const);
      const ttc = Math.round(ht * (1 + t / 100) * 100) / 100;
      return {
        text:
          `Le prix TTC se calcule par $P_{TTC} = P_{HT} \\times \\left(1 + \\dfrac{t}{100}\\right)$. ` +
          `Un article est affiché $${fr(ttc)}$ € TTC, avec un taux de TVA de $${fr(t)}\\,\\%$. ` +
          `Quel est son prix HT, en euros ?`,
        format: "short",
        expected: [fr(ht)],
        comparator: "number_equal",
        explanation: exp(
          "Le prix TTC s'obtient en MULTIPLIANT le prix HT par le coefficient $1 + \\dfrac{t}{100}$. Pour revenir au prix HT, on défait cette multiplication par une division.",
          "On isole $P_{HT}$ dans la formule, puis on divise le prix TTC par le coefficient — jamais en retirant simplement le pourcentage au prix TTC.",
          `$P_{HT} = \\dfrac{P_{TTC}}{1 + \\frac{t}{100}} = \\dfrac{${fr(ttc)}}{${fr(1 + t / 100)}} = ${fr(ht)}$. ` +
            `⚠️ Retirer $${fr(t)}\\,\\%$ au prix TTC donnerait $${fr(Math.round(ttc * (1 - t / 100) * 100) / 100)}$ € — un autre nombre, et un nombre faux.`,
          `Le prix HT est de $${fr(ht)}$ €.`
        ),
      };
    },
  },
];
