// lib/tutor-v4/questionBank/premiere/maths/automatismes-algebre.bank.ts
//
// Notions : auto_developper_factoriser, auto_equations, auto_signe_expression,
//           auto_formules (domaine BOP1AU)
//
// C'est le gisement principal de la première partie de l'épreuve. Aux six
// sujets de juin 2026 :
//   · $(2x-5)^2$ développé (Antilles), $(2x+5)^2$ (Asie), $(x-4)^2$ (Centres
//     étrangers) — l'identité remarquable tombe TROIS fois sur six sujets ;
//   · $7x + 4 = 5x + 6$ (Métropole), $x^2 = 5$ (Asie) ;
//   · $(2x+4)(-3x-9) = 0$ (Centres étrangers) ;
//   · $R = \dfrac{U^2}{P}$ avec $U = 20$ et $P = 80$ (Antilles) ;
//   · $F = G \dfrac{m_1 m_2}{R^2}$, isoler $m_1$ (Centres étrangers) ;
//   · la valeur de $2x^2 - 3x - 4$ pour $x = -1$ (Centres étrangers).
//
// ⚠️ Les expressions algébriques sont TOUJOURS demandées en QCM. « 4x^2-20x+25 »
// et « 25 - 20x + 4x² » sont la même réponse pour un élève et deux chaînes pour
// une machine : on ne sanctionne pas une frappe.
//
// ⚠️ Sans calculatrice, et sans discriminant : les équations du second degré
// s'arrêtent à $x^2 = a$ et aux produits nuls.

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
  const arrondi = Math.round(n * 1000000) / 1000000;
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

/** « 4x^2 - 20x + 25 » : signes placés, coefficients 1 sous-entendus. */
function trinome(a: number, b: number, c: number): string {
  const morceaux: string[] = [];
  if (a !== 0) morceaux.push(`${a === 1 ? "" : a === -1 ? "-" : fr(a)}x^2`);
  if (b !== 0)
    morceaux.push(
      `${b > 0 ? (morceaux.length ? "+ " : "") : "- "}${Math.abs(b) === 1 ? "" : fr(Math.abs(b))}x`
    );
  if (c !== 0) morceaux.push(`${c > 0 ? (morceaux.length ? "+ " : "") : "- "}${fr(Math.abs(c))}`);
  return morceaux.join(" ") || "0";
}

export const automatismesAlgebreBank: TutorBankItemV4[] = [
  /* ═══════════════ auto_alg_developper ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_developper_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_developper_factoriser",
    microId: "auto_alg_developper",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque terme de la première parenthèse multiplie chaque terme de la seconde : quatre produits.",
    tags: ["premiere", "maths", "automatisme", "developper", "template"],
    generate: () => {
      const a = pick([2, 3] as const);
      const b = pick([-5, -3, 4] as const);
      const c = pick([1, 2] as const);
      const d = pick([-2, 3, 5] as const);
      // (ax + b)(cx + d) = ac·x² + (ad + bc)·x + bd
      return {
        text: `Développe et réduis $(${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)})(${c === 1 ? "" : c}x ${d >= 0 ? "+" : "-"} ${Math.abs(d)})$.`,
        format: "qcm",
        choices: makeChoices(`$${trinome(a * c, a * d + b * c, b * d)}$`, [
          `$${trinome(a * c, a * d + b * c, -b * d)}$`,
          `$${trinome(a * c, b * d, 0)}$`,
          `$${trinome(a * c, a * d - b * c, b * d)}$`,
        ]),
        expected: [`$${trinome(a * c, a * d + b * c, b * d)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Développer un produit de deux binômes, c'est multiplier chaque terme du premier par chaque terme du second : quatre produits.",
          "On applique la double distributivité, puis on réduit les termes semblables.",
          `$(${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)})(${c === 1 ? "" : c}x ${d >= 0 ? "+" : "-"} ${Math.abs(d)}) = ` +
            `${fr(a * c)}x^2 ${a * d >= 0 ? "+" : "-"} ${fr(Math.abs(a * d))}x ${b * c >= 0 ? "+" : "-"} ${fr(Math.abs(b * c))}x ${b * d >= 0 ? "+" : "-"} ${fr(Math.abs(b * d))}$, ` +
            `soit $${trinome(a * c, a * d + b * c, b * d)}$.`,
          `Le résultat est $${trinome(a * c, a * d + b * c, b * d)}$.`
        ),
      };
    },
  },

  /* ═══════════════ auto_alg_identites ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_identites_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_developper_factoriser",
    microId: "auto_alg_identites",
    difficulty: 3,
    theme: "neutral",
    hint: "$(a - b)^2 = a^2 - 2ab + b^2$ : le DOUBLE produit ne s'oublie pas.",
    tags: ["premiere", "maths", "automatisme", "identites", "template"],
    generate: () => {
      const a = pick([1, 2, 3] as const);
      const b = pick([4, 5, 7] as const);
      const signe = pick([-1, 1] as const);
      // (ax + signe·b)² = a²x² + 2·a·signe·b·x + b²
      const milieu = 2 * a * signe * b;
      return {
        text: `Développe $(${a === 1 ? "" : a}x ${signe > 0 ? "+" : "-"} ${b})^2$.`,
        format: "qcm",
        choices: makeChoices(`$${trinome(a * a, milieu, b * b)}$`, [
          `$${trinome(a * a, 0, b * b)}$`,
          `$${trinome(a * a, milieu, -b * b)}$`,
          `$${trinome(a, milieu, b * b)}$`,
        ]),
        expected: [`$${trinome(a * a, milieu, b * b)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Identité remarquable : $(u ${signe > 0 ? '+' : '-'} v)^2 = u^2 ${signe > 0 ? '+' : '-'} 2uv + v^2$.",
          `On identifie $u = ${a === 1 ? "" : a}x$ et $v = ${b}$, puis on applique la formule.`,
          `$u^2 = ${fr(a * a)}x^2$ ; $2uv = ${fr(Math.abs(milieu))}x$ ; $v^2 = ${b * b}$. ` +
            `D'où $${trinome(a * a, milieu, b * b)}$.`,
          `Le résultat est $${trinome(a * a, milieu, b * b)}$. ` +
            `⚠️ Le carré ne se distribue pas : le double produit $${fr(Math.abs(milieu))}x$ est la moitié oubliée de la réponse. ` +
            `(Cette identité tombe à trois des six sujets de juin 2026.)`
        ),
        choiceDiagnostics: [
          {
            choice: `$${trinome(a * a, 0, b * b)}$`,
            cause: "a oublié le double produit — c'est l'erreur la plus fréquente de toute l'épreuve",
          },
          {
            choice: `$${trinome(a * a, milieu, -b * b)}$`,
            cause: "a mis un signe moins devant le carré du second terme, qui est toujours positif",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_alg_factoriser_commun ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_factoriser_commun_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_developper_factoriser",
    microId: "auto_alg_factoriser_commun",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche ce qui est présent dans les deux termes : un nombre, un $x$, ou les deux.",
    tags: ["premiere", "maths", "automatisme", "factoriser", "template"],
    generate: () => {
      const k = pick([2, 3, 5] as const);
      const a = pick([2, 3] as const);
      const b = pick([4, 6] as const);
      // k·a·x² + k·b·x = k·x(a·x + b)
      return {
        text: `Factorise $${fr(k * a)}x^2 + ${fr(k * b)}x$.`,
        format: "qcm",
        choices: makeChoices(`$${k}x(${a}x + ${b})$`, [
          `$x(${fr(k * a)}x + ${fr(k * b)})$`,
          `$${k}(${a}x^2 + ${b}x)$`,
          `$${k}x(${a}x^2 + ${b})$`,
        ]),
        expected: [`$${k}x(${a}x + ${b})$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Factoriser, c'est mettre en évidence le facteur commun le plus grand possible.",
          "On cherche ce que les deux termes partagent : ici le nombre et la lettre.",
          `$${fr(k * a)}x^2 = ${k}x \\times ${a}x$ et $${fr(k * b)}x = ${k}x \\times ${b}$, donc le facteur commun est $${k}x$.`,
          `$${fr(k * a)}x^2 + ${fr(k * b)}x = ${k}x(${a}x + ${b})$. ` +
            `Les deux autres factorisations proposées sont exactes mais INCOMPLÈTES : on peut encore factoriser.`
        ),
        choiceDiagnostics: [
          {
            choice: `$x(${fr(k * a)}x + ${fr(k * b)})$`,
            cause: `factorisation incomplète : le facteur ${k} reste à sortir`,
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_alg_factoriser_identite ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_factoriser_identite_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_developper_factoriser",
    microId: "auto_alg_factoriser_identite",
    difficulty: 4,
    theme: "neutral",
    hint: "Une différence de deux carrés se factorise : $a^2 - b^2 = (a - b)(a + b)$.",
    tags: ["premiere", "maths", "automatisme", "factoriser", "template"],
    generate: () => {
      const a = pick([1, 2, 3] as const);
      const b = pick([3, 4, 5] as const);
      const ecrireA = a === 1 ? "x" : `${a}x`;
      return {
        text: `Factorise $${fr(a * a)}x^2 - ${b * b}$.`,
        format: "qcm",
        choices: makeChoices(`$(${ecrireA} - ${b})(${ecrireA} + ${b})$`, [
          `$(${ecrireA} - ${b})^2$`,
          `$(${ecrireA} - ${b * b})(${ecrireA} + ${b * b})$`,
          `$(${ecrireA} + ${b})^2$`,
        ]),
        expected: [`$(${ecrireA} - ${b})(${ecrireA} + ${b})$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Identité remarquable : $u^2 - v^2 = (u - v)(u + v)$.",
          "On reconnaît une différence de deux carrés, puis on identifie $u$ et $v$.",
          `$${fr(a * a)}x^2 = (${ecrireA})^2$ et $${b * b} = ${b}^2$, donc $u = ${ecrireA}$ et $v = ${b}$.`,
          `$${fr(a * a)}x^2 - ${b * b} = (${ecrireA} - ${b})(${ecrireA} + ${b})$. ` +
            `⚠️ $v$ vaut $${b}$, pas $${b * b}$ : c'est la RACINE du nombre qui entre dans les parenthèses.`
        ),
        choiceDiagnostics: [
          {
            choice: `$(${ecrireA} - ${b * b})(${ecrireA} + ${b * b})$`,
            cause: `a recopié ${b * b} au lieu de sa racine ${b}`,
          },
          {
            choice: `$(${ecrireA} - ${b})^2$`,
            cause: "a utilisé l'identité du carré d'une différence, qui donnerait un double produit",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_alg_equation_premier_degre ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_equation_1_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_equations",
    microId: "auto_alg_equation_premier_degre",
    difficulty: 2,
    theme: "neutral",
    hint: "On regroupe les $x$ d'un côté et les nombres de l'autre.",
    tags: ["premiere", "maths", "automatisme", "equation", "template", "short"],
    generate: () => {
      const solution = pick([-2, -1, 1, 2, 3] as const);
      const a = pick([5, 7] as const);
      const c = pick([2, 3] as const);
      const b = pick([1, 4] as const);
      // ax + b = cx + d avec d = (a − c)·solution + b
      const d = (a - c) * solution + b;
      return {
        text: `Résous l'équation $${a}x + ${b} = ${c}x ${d >= 0 ? "+" : "-"} ${Math.abs(d)}$.`,
        format: "short",
        expected: [fr(solution)],
        comparator: "number_equal",
        explanation: exp(
          "Résoudre une équation du premier degré, c'est isoler l'inconnue.",
          "On regroupe les termes en $x$ d'un côté, les constantes de l'autre, puis on divise.",
          `$${a}x - ${c}x = ${fr(d)} - ${b}$ donne $${fr(a - c)}x = ${fr(d - b)}$, puis $x = ${fr(solution)}$.`,
          `La solution est $x = ${fr(solution)}$. (Le sujet de Métropole posait $7x + 4 = 5x + 6$.)`
        ),
      };
    },
  },

  /* ═══════════════ auto_alg_equation_carre ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_equation_carre_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_equations",
    microId: "auto_alg_equation_carre",
    difficulty: 3,
    theme: "neutral",
    hint: "Une équation $x^2 = a$ avec $a > 0$ a DEUX solutions, opposées.",
    tags: ["premiere", "maths", "automatisme", "equation", "template"],
    generate: () => {
      const carre = pick([5, 7, 9, 16] as const);
      const parfait = Number.isInteger(Math.sqrt(carre));
      const racine = parfait ? String(Math.sqrt(carre)) : `\\sqrt{${carre}}`;
      return {
        text: `Quel est l'ensemble des solutions de l'équation $x^2 = ${carre}$ ?`,
        format: "qcm",
        choices: makeChoices(`$\\{-${racine} \\, ; \\, ${racine}\\}$`, [
          `$\\{${racine}\\}$`,
          `$\\{${fr(carre / 2)}\\}$`,
          `$\\{-${fr(carre / 2)} \\, ; \\, ${fr(carre / 2)}\\}$`,
        ]),
        expected: [`$\\{-${racine} \\, ; \\, ${racine}\\}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour $a > 0$, l'équation $x^2 = a$ admet exactement deux solutions : $\\sqrt{a}$ et $-\\sqrt{a}$.",
          "On prend la racine carrée, SANS oublier la solution négative.",
          `$x^2 = ${carre}$ donne $x = ${racine}$ ou $x = -${racine}$` +
            (parfait ? `, car $${Math.sqrt(carre)}^2 = ${carre}$ et $(-${Math.sqrt(carre)})^2 = ${carre}$.` : "."),
          `L'ensemble des solutions est $\\{-${racine} \\, ; \\, ${racine}\\}$. ` +
            `⚠️ Diviser par $2$ n'a rien à voir : c'est le carré qu'on annule, pas un produit. ` +
            `(Le sujet d'Asie posait $x^2 = 5$.)`
        ),
        choiceDiagnostics: [
          {
            choice: `$\\{${racine}\\}$`,
            cause: "a oublié la solution négative",
          },
          {
            choice: `$\\{${fr(carre / 2)}\\}$`,
            cause: "a divisé par 2 au lieu de prendre la racine carrée",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_alg_equation_quotient ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_equation_quotient_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_equations",
    microId: "auto_alg_equation_quotient",
    difficulty: 3,
    theme: "neutral",
    hint: "On multiplie les deux membres par $x$, ce qui suppose $x \\neq 0$.",
    tags: ["premiere", "maths", "automatisme", "equation", "template", "short"],
    generate: () => {
      const solution = pick([2, 4, 5, 10] as const);
      const b = pick([2, 3, 6] as const);
      const a = solution * b;
      return {
        text: `Résous l'équation $\\dfrac{${a}}{x} = ${b}$.`,
        format: "short",
        expected: [fr(solution)],
        comparator: "number_equal",
        explanation: exp(
          "Une équation du type $\\dfrac{a}{x} = b$ se résout en multipliant les deux membres par $x$, sous réserve que $x$ ne soit pas nul.",
          "On multiplie par $x$, puis on divise par le coefficient obtenu.",
          `$\\dfrac{${a}}{x} = ${b}$ donne $${a} = ${b}x$, donc $x = \\dfrac{${a}}{${b}} = ${fr(solution)}$.`,
          `La solution est $x = ${fr(solution)}$. ⚠️ L'inconnue était au DÉNOMINATEUR : diviser $${a}$ par $${b}$ est le dernier geste, pas le premier.`
        ),
      };
    },
  },

  /* ═══════════════ auto_alg_inequation ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_inequation_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_equations",
    microId: "auto_alg_inequation",
    difficulty: 4,
    theme: "neutral",
    hint: "Diviser par un nombre NÉGATIF renverse le sens de l'inégalité.",
    tags: ["premiere", "maths", "automatisme", "inequation", "template"],
    generate: () => {
      const a = pick([-3, -2, 2, 4] as const);
      const seuil = pick([-2, 1, 3] as const);
      const b = pick([1, 5] as const);
      // a·x + b > a·seuil + b
      const c = a * seuil + b;
      const sensRenverse = a < 0;
      return {
        text: `Résous l'inéquation $${fr(a)}x + ${b} > ${fr(c)}$.`,
        format: "qcm",
        choices: makeChoices(
          sensRenverse ? `$x < ${fr(seuil)}$` : `$x > ${fr(seuil)}$`,
          [
            sensRenverse ? `$x > ${fr(seuil)}$` : `$x < ${fr(seuil)}$`,
            `$x > ${fr(-seuil)}$`,
            `$x < ${fr(c)}$`,
          ]
        ),
        expected: [sensRenverse ? `$x < ${fr(seuil)}$` : `$x > ${fr(seuil)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une inéquation se résout comme une équation, à une règle près : multiplier ou diviser par un nombre NÉGATIF renverse le sens de l'inégalité.",
          "On isole $x$, puis on surveille le signe du coefficient.",
          `$${fr(a)}x > ${fr(c)} - ${b} = ${fr(c - b)}$. En divisant par $${fr(a)}$` +
            (sensRenverse
              ? `, qui est NÉGATIF, l'inégalité change de sens : $x < ${fr(seuil)}$.`
              : `, qui est positif, le sens est conservé : $x > ${fr(seuil)}$.`),
          `L'ensemble des solutions est ${sensRenverse ? `$x < ${fr(seuil)}$` : `$x > ${fr(seuil)}$`}.`
        ),
        choiceDiagnostics: sensRenverse
          ? [
              {
                choice: `$x > ${fr(seuil)}$`,
                cause: "a oublié de renverser l'inégalité en divisant par un nombre négatif",
              },
            ]
          : [],
      };
    },
  },

  /* ═══════════════ auto_alg_produit_nul ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_produit_nul_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_signe_expression",
    microId: "auto_alg_produit_nul",
    difficulty: 3,
    theme: "neutral",
    hint: "Un produit est nul si et seulement si l'un de ses facteurs est nul.",
    tags: ["premiere", "maths", "automatisme", "produit-nul", "template"],
    generate: () => {
      const a = pick([2, 3] as const);
      const b = pick([4, 6] as const);
      const c = pick([-3, 3] as const);
      const d = pick([9, 12] as const);
      // (ax + b)(cx − d) = 0
      const s1 = -b / a;
      const s2 = d / c;
      return {
        text: `Résous l'équation $(${a}x + ${b})(${fr(c)}x - ${d}) = 0$.`,
        format: "qcm",
        choices: makeChoices(`$\\{${fr(s1)} \\, ; \\, ${fr(s2)}\\}$`, [
          `$\\{${fr(-s1)} \\, ; \\, ${fr(-s2)}\\}$`,
          `$\\{${fr(b)} \\, ; \\, ${fr(d)}\\}$`,
          `$\\{${fr(s1)}\\}$`,
        ]),
        expected: [`$\\{${fr(s1)} \\, ; \\, ${fr(s2)}\\}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Règle du produit nul : un produit de facteurs est nul si et seulement si l'un au moins des facteurs est nul.",
          "On annule chaque facteur séparément, ce qui donne deux équations du premier degré.",
          `$${a}x + ${b} = 0$ donne $x = ${fr(s1)}$ ; $${fr(c)}x - ${d} = 0$ donne $x = ${fr(s2)}$.`,
          `L'ensemble des solutions est $\\{${fr(s1)} \\, ; \\, ${fr(s2)}\\}$. ` +
            `Aucun discriminant n'a été nécessaire — et il n'est pas au programme. ` +
            `(Le sujet des Centres étrangers posait $(2x+4)(-3x-9) = 0$.)`
        ),
        choiceDiagnostics: [
          {
            choice: `$\\{${fr(b)} \\, ; \\, ${fr(d)}\\}$`,
            cause: "a recopié les nombres des parenthèses sans résoudre les équations",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_alg_signe_premier_degre ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_signe_1_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_signe_expression",
    microId: "auto_alg_signe_premier_degre",
    difficulty: 3,
    theme: "neutral",
    hint: "Une expression $ax + b$ s'annule en $-\\frac{b}{a}$, et le signe de $a$ dit de quel côté elle est positive.",
    tags: ["premiere", "maths", "automatisme", "signe", "template"],
    generate: () => {
      const a = pick([-3, -2, 2, 5] as const);
      const racine = pick([-2, -1, 2, 3] as const);
      const b = -a * racine;
      return {
        text: `Pour quelles valeurs de $x$ l'expression $${fr(a)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$ est-elle POSITIVE ?`,
        format: "qcm",
        choices: makeChoices(
          a > 0 ? `pour $x > ${fr(racine)}$` : `pour $x < ${fr(racine)}$`,
          [
            a > 0 ? `pour $x < ${fr(racine)}$` : `pour $x > ${fr(racine)}$`,
            "pour tout $x$",
            `pour $x > 0$`,
          ]
        ),
        expected: [a > 0 ? `pour $x > ${fr(racine)}$` : `pour $x < ${fr(racine)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une expression du premier degré $ax + b$ s'annule une fois, et change de signe en ce point.",
          "On cherche où elle s'annule, puis on utilise le signe de $a$ : elle est du signe de $a$ APRÈS la racine.",
          `$${fr(a)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = 0$ donne $x = ${fr(racine)}$. ` +
            `Comme $a = ${fr(a)}$ est ${a > 0 ? "positif" : "négatif"}, l'expression est ${a > 0 ? "positive après" : "positive avant"} $${fr(racine)}$.`,
          `Elle est positive ${a > 0 ? `pour $x > ${fr(racine)}$` : `pour $x < ${fr(racine)}$`}.`
        ),
      };
    },
  },

  /* ═══════════════ auto_alg_signe_factorisee ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_signe_factorisee_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_signe_expression",
    microId: "auto_alg_signe_factorisee",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux facteurs du premier degré : le produit est négatif quand ils sont de signes contraires.",
    tags: ["premiere", "maths", "automatisme", "signe", "template"],
    generate: () => {
      const r1 = pick([-3, -2, -1] as const);
      const r2 = pick([1, 2, 4] as const);
      const ecrire = (r: number) => `(x ${r < 0 ? "+" : "-"} ${Math.abs(r)})`;
      return {
        text: `Pour quelles valeurs de $x$ le produit $${ecrire(r1)}${ecrire(r2)}$ est-il NÉGATIF ?`,
        format: "qcm",
        choices: makeChoices(`pour $${fr(r1)} < x < ${fr(r2)}$`, [
          `pour $x < ${fr(r1)}$ ou $x > ${fr(r2)}$`,
          `pour $x < ${fr(r1)}$`,
          `pour $x > ${fr(r2)}$`,
        ]),
        expected: [`pour $${fr(r1)} < x < ${fr(r2)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Le signe d'un produit de deux facteurs du premier degré s'obtient par la règle des signes : négatif quand les facteurs sont de signes contraires.",
          "On cherche les deux racines, puis on regarde le signe de chaque facteur sur les trois intervalles.",
          `Racines : $${fr(r1)}$ et $${fr(r2)}$. Entre les deux, le premier facteur est positif et le second négatif : le produit est négatif. ` +
            `À l'extérieur, les deux ont le même signe : le produit est positif.`,
          `Le produit est négatif pour $${fr(r1)} < x < ${fr(r2)}$, c'est-à-dire ENTRE les racines. ` +
            `C'est le cas d'une parabole tournée vers le haut : elle plonge sous l'axe entre ses deux racines.`
        ),
        choiceDiagnostics: [
          {
            choice: `pour $x < ${fr(r1)}$ ou $x > ${fr(r2)}$`,
            cause: "a donné l'intervalle où le produit est POSITIF",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_alg_litteral ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_litteral_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_formules",
    microId: "auto_alg_litteral",
    difficulty: 3,
    theme: "neutral",
    hint: "Le carré d'un nombre négatif est positif ; le reste suit les signes.",
    tags: ["premiere", "maths", "automatisme", "litteral", "template", "short"],
    generate: () => {
      const a = pick([2, 3] as const);
      const b = pick([-3, -1, 2] as const);
      const c = pick([-4, -2, 1] as const);
      const x = pick([-2, -1, 2] as const);
      const valeur = a * x * x + b * x + c;
      return {
        text: `Quelle est la valeur de l'expression $${trinome(a, b, c)}$ pour $x = ${x}$ ?`,
        format: "short",
        expected: [fr(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "Calculer la valeur d'une expression littérale, c'est remplacer la lettre par le nombre, en mettant ce nombre entre parenthèses.",
          "On remplace, puis on respecte les priorités : carré d'abord, puis produits, puis somme.",
          `$${a} \\times (${x})^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)} \\times (${x}) ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = ` +
            `${fr(a * x * x)} ${b * x >= 0 ? "+" : "-"} ${fr(Math.abs(b * x))} ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = ${fr(valeur)}$.`,
          `L'expression vaut $${fr(valeur)}$.${x < 0 ? ` ⚠️ $(${x})^2 = ${x * x}$ : le carré est positif, même pour un nombre négatif.` : ""} ` +
            `(Le sujet des Centres étrangers demandait la valeur de $2x^2 - 3x - 4$ pour $x = -1$.)`
        ),
      };
    },
  },

  /* ═══════════════ auto_alg_isoler_variable ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_auto_isoler_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_formules",
    microId: "auto_alg_isoler_variable",
    difficulty: 4,
    theme: "neutral",
    text:
      "La force gravitationnelle vérifie $F = G \\times \\dfrac{m_1 \\times m_2}{R^2}$. " +
      "Quelle égalité donne $m_1$ ?",
    format: "qcm",
    choices: [
      "$m_1 = \\dfrac{F \\times R^2}{G \\times m_2}$",
      "$m_1 = \\dfrac{F \\times G}{R^2 \\times m_2}$",
      "$m_1 = F \\times R^2 \\times G \\times m_2$",
      "$m_1 = \\sqrt{\\dfrac{G \\times R^2}{F \\times m_2}}$",
    ],
    expected: ["$m_1 = \\dfrac{F \\times R^2}{G \\times m_2}$"],
    comparator: "mcq_exact",
    hint: "Ce qui multiplie $m_1$ passe au dénominateur ; ce qui le divise passe au numérateur.",
    explanation: exp(
      "Isoler une variable, c'est la laisser seule d'un côté du signe égal, en effectuant la même opération des deux côtés.",
      "On multiplie d'abord par $R^2$, puis on divise par $G$ et par $m_2$.",
      "$F \\times R^2 = G \\times m_1 \\times m_2$, puis $m_1 = \\dfrac{F \\times R^2}{G \\times m_2}$.",
      "$m_1 = \\dfrac{F \\times R^2}{G \\times m_2}$. Ce geste sert dans toutes les disciplines : c'est la même chose que d'isoler une inconnue dans une équation. (Question tombée aux Centres étrangers, juin 2026.)"
    ),
    choiceDiagnostics: [
      {
        choice: "$m_1 = \\dfrac{F \\times G}{R^2 \\times m_2}$",
        cause: "a interverti G et R² : G multipliait m₁, il passe au dénominateur ; R² divisait, il passe au numérateur",
      },
    ],
    tags: ["premiere", "maths", "automatisme", "formule", "sujet-2026"],
  },

  {
    kind: "template",
    id: "premiere_auto_isoler_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_formules",
    microId: "auto_alg_isoler_variable",
    difficulty: 4,
    theme: "neutral",
    hint: "Ce qui MULTIPLIE la variable cherchée passe au dénominateur ; ce qui la DIVISE passe au numérateur.",
    tags: ["premiere", "maths", "automatisme", "formule", "template"],
    generate: () => {
      // Des formules de plusieurs disciplines : le geste est le même, le
      // contexte change à chaque tirage.
      const cas = pick([
        {
          formule: "P = U \\times I",
          question: "I",
          bonne: "I = \\dfrac{P}{U}",
          pieges: ["I = P \\times U", "I = \\dfrac{U}{P}", "I = P - U"],
          discipline: "La puissance électrique",
        },
        {
          formule: "d = v \\times t",
          question: "t",
          bonne: "t = \\dfrac{d}{v}",
          pieges: ["t = d \\times v", "t = \\dfrac{v}{d}", "t = d - v"],
          discipline: "La distance parcourue",
        },
        {
          formule: "V = L \\times l \\times h",
          question: "h",
          bonne: "h = \\dfrac{V}{L \\times l}",
          pieges: [
            "h = \\dfrac{V \\times L}{l}",
            "h = V \\times L \\times l",
            "h = \\dfrac{L \\times l}{V}",
          ],
          discipline: "Le volume d'un pavé droit",
        },
        {
          formule: "C = \\dfrac{m}{V}",
          question: "V",
          bonne: "V = \\dfrac{m}{C}",
          pieges: ["V = m \\times C", "V = \\dfrac{C}{m}", "V = m - C"],
          discipline: "La concentration d'une solution",
        },
        {
          formule: "R = \\dfrac{U^2}{P}",
          question: "P",
          bonne: "P = \\dfrac{U^2}{R}",
          pieges: ["P = R \\times U^2", "P = \\dfrac{R}{U^2}", "P = U^2 - R"],
          discipline: "La résistance d'un appareil",
        },
      ] as const);
      return {
        text: `${cas.discipline} vérifie $${cas.formule}$. Quelle égalité donne $${cas.question}$ ?`,
        format: "qcm",
        choices: makeChoices(`$${cas.bonne}$`, cas.pieges.map((p) => `$${p}$`)),
        expected: [`$${cas.bonne}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Isoler une variable, c'est la laisser seule d'un côté du signe égal, en effectuant la même opération des deux côtés.",
          "On repère ce qui l'accompagne : un facteur passe de l'autre côté en divisant, un diviseur en multipliant.",
          `Depuis $${cas.formule}$, on obtient $${cas.bonne}$.`,
          `$${cas.bonne}$. Ce geste sert dans toutes les disciplines : c'est le même que résoudre une équation, avec des lettres à la place des nombres.`
        ),
      };
    },
  },

  /* ═══════════════ auto_alg_application_formule ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_application_formule_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_formules",
    microId: "auto_alg_application_formule",
    difficulty: 3,
    theme: "neutral",
    hint: "On remplace chaque lettre par sa valeur, en respectant les priorités.",
    tags: ["premiere", "maths", "automatisme", "formule", "template", "short"],
    generate: () => {
      // R = U²/P, formule du sujet des Antilles.
      const u = pick([10, 20, 30] as const);
      const p = pick([50, 80, 100, 200] as const);
      const r = (u * u) / p;
      return {
        text:
          `La résistance d'un appareil est donnée par $R = \\dfrac{U^2}{P}$, ` +
          `où $U$ est la tension en volts et $P$ la puissance en watts. ` +
          `Combien vaut $R$ pour une tension de $${u}$ volts et une puissance de $${p}$ watts ?`,
        format: "short",
        expected: [fr(r)],
        comparator: "number_equal",
        explanation: exp(
          "Une application numérique consiste à remplacer chaque lettre par sa valeur, puis à calculer.",
          "On élève d'abord au carré, ensuite on divise.",
          `$R = \\dfrac{${u}^2}{${p}} = \\dfrac{${u * u}}{${p}} = ${fr(r)}$.`,
          `La résistance vaut $${fr(r)}$ ohms. ⚠️ $U^2$ signifie $${u} \\times ${u}$, et non $${u} \\times 2$. ` +
            `(Question tombée aux Antilles, juin 2026.)`
        ),
      };
    },
  },
];
