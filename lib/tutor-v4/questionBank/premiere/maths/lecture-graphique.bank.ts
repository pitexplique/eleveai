// lib/tutor-v4/questionBank/premiere/maths/lecture-graphique.bank.ts
//
// Notions : auto_lecture_graphique, auto_resolution_graphique, auto_droites
//           (domaine BOP1AU — Automatismes)
//
// Tout se lit sur une figure, sans exception dans ce fichier : c'est la règle
// posée pour cette classe, et ici elle va de soi — on ne peut pas « déterminer
// graphiquement un antécédent » sans graphique.
//
// Ces automatismes tombent à chaque sujet de juin 2026 : l'antécédent de 3 lu
// sur une courbe (Métropole), la droite d'équation y = −x/2 + 1 à reconnaître
// parmi quatre (Antilles), le coefficient directeur à partir de deux points
// (Métropole), l'équation réduite d'une droite tracée (Centres étrangers), et
// l'ensemble des solutions de f(x) ≥ 3 lu sur la courbe (Centres étrangers).
//
// Les fonctions tracées sont affines ou du second degré : ce sont celles que le
// canvas sait dessiner exactement, et celles du programme.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* ─────────────────────────── outils ─────────────────────────── */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

/** Une droite d'équation y = ax + b. */
function canvasDroite(
  a: number,
  b: number,
  options?: { titre?: string; points?: { x: number; y: number; label?: string }[] }
): CanvasFigure {
  return {
    kind: "fonctionGraphique",
    titre: options?.titre ?? "La droite (d)",
    xmin: -5,
    xmax: 5,
    ymin: -6,
    ymax: 6,
    grille: true,
    courbes: [{ id: "d", type: "affine", a, b, couleur: "#0284c7" }],
    points: options?.points,
  };
}

/** Une parabole d'équation y = ax² + bx + c. */
function canvasParabole(a: number, b: number, c: number, titre?: string): CanvasFigure {
  return {
    kind: "fonctionGraphique",
    titre: titre ?? "La courbe de f",
    xmin: -5,
    xmax: 5,
    ymin: -8,
    ymax: 8,
    grille: true,
    courbes: [{ id: "f", type: "quadratique", a, b, c, couleur: "#e11d48" }],
  };
}

// Coefficients directeurs lisibles à la grille : entiers ou demi-entiers.
const PENTES = [-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2] as const;

export const lectureGraphiqueBank: TutorBankItemV4[] = [
  /* ═══════════════ auto_fct_image_antecedent ═══════════════ */

  {
    kind: "template",
    id: "premiere_fct_image_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_lecture_graphique",
    microId: "auto_fct_image_antecedent",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour lire l'image de $x$, on monte depuis l'axe des abscisses jusqu'à la courbe.",
    tags: ["premiere", "maths", "graphique", "image", "template", "short"],
    generate: () => {
      const a = pick(PENTES);
      const b = randomInt(-2, 3);
      const x = pick([-2, -1, 1, 2] as const);
      return {
        text: `La droite ci-contre représente une fonction $f$. Quelle est l'image de $${x}$ par $f$ ?`,
        format: "short",
        expected: [fr(a * x + b)],
        comparator: "number_equal",
        canvas: canvasDroite(a, b, { titre: "La courbe de f" }),
        explanation: exp(
          "L'image de $x$ par $f$ est l'ordonnée du point de la courbe d'abscisse $x$.",
          `On part de $${x}$ sur l'axe horizontal, on monte jusqu'à la courbe, on lit l'ordonnée.`,
          `La droite a pour équation $y = ${fr(a)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$, donc $f(${x}) = ${fr(a)} \\times ${x} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${fr(a * x + b)}$.`,
          `$f(${x}) = ${fr(a * x + b)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_fct_antecedent_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_lecture_graphique",
    microId: "auto_fct_image_antecedent",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour un antécédent, on part de l'axe VERTICAL et on cherche l'abscisse.",
    tags: ["premiere", "maths", "graphique", "antecedent", "template", "short"],
    generate: () => {
      const a = pick([-2, -1, 1, 2] as const);
      const b = randomInt(-2, 2);
      const x = pick([-2, -1, 1, 2] as const);
      const y = a * x + b;
      return {
        text: `La droite ci-contre représente une fonction $f$. Quel est l'antécédent de $${fr(y)}$ par $f$ ?`,
        format: "short",
        expected: [fr(x)],
        comparator: "number_equal",
        canvas: canvasDroite(a, b, { titre: "La courbe de f" }),
        explanation: exp(
          "Un antécédent de $y$ est un nombre $x$ tel que $f(x) = y$.",
          "On part de $y$ sur l'axe vertical, on rejoint la courbe horizontalement, puis on descend lire l'abscisse.",
          `On résout $${fr(a)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${fr(y)}$, d'où $x = ${fr(x)}$.`,
          `L'antécédent de $${fr(y)}$ est $${fr(x)}$. Image et antécédent ne se lisent pas dans le même sens : c'est là qu'on se trompe.`
        ),
      };
    },
  },

  /* ═══════════════ auto_fct_appartenance_courbe ═══════════════ */

  {
    kind: "template",
    id: "premiere_fct_appartenance_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_lecture_graphique",
    microId: "auto_fct_appartenance_courbe",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace $x$ par l'abscisse dans l'équation, et compare à l'ordonnée.",
    tags: ["premiere", "maths", "graphique", "courbe", "template"],
    generate: () => {
      const a = pick([1, 2] as const);
      const b = pick([-1, 1, 3] as const);
      // ⛔ jamais c = 0 : le piège « erreur de signe sur c » vaudrait alors la
      // bonne réponse, et le QCM tomberait à trois lignes — parfois deux.
      const c = pick([-2, 2] as const);
      const x = pick([-1, 1, 2] as const);
      const y = a * x * x + b * x + c;
      // Trois ordonnées fausses, distinctes entre elles et de la bonne : les
      // erreurs classiques d'abord, puis des valeurs de secours si l'une
      // d'elles retombe sur y pour ce tirage-là.
      const fausses: number[] = [];
      for (const candidat of [
        a * x * x + b * x - c, // erreur de signe sur c
        a * x + b * x + c, // carré oublié
        a * x * x - b * x + c, // erreur de signe sur b
        y + 2,
        y - 3,
        y + 5,
      ]) {
        if (candidat !== y && !fausses.includes(candidat)) fausses.push(candidat);
        if (fausses.length === 3) break;
      }
      return {
        text:
          `On considère la courbe d'équation $y = ${a === 1 ? "" : a}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}$, tracée ci-contre. ` +
          `Le point de la courbe d'abscisse $${x}$ est :`,
        format: "qcm",
        choices: makeChoices(
          `$(${x} \\, ; \\, ${fr(y)})$`,
          fausses.map((v) => `$(${x} \\, ; \\, ${fr(v)})$`)
        ),
        expected: [`$(${x} \\, ; \\, ${fr(y)})$`],
        comparator: "mcq_exact",
        canvas: canvasParabole(a, b, c),
        explanation: exp(
          "Un point appartient à la courbe si ses coordonnées vérifient l'équation.",
          "On remplace $x$ par l'abscisse et on calcule l'ordonnée.",
          // ⚠️ LE « × » PART AVEC LE COEFFICIENT 1 (18/08/2026). On écrivait
          // `$${a} \times (…)` : quand a valait 1, le coefficient disparaissait
          // et il restait « $ \times … » — un espace collé au dollar ouvrant,
          // que remark-math refuse de lire comme une formule. L'élève voyait
          // alors la ligne de calcul en LaTeX brut, une fois sur deux (a vaut 1
          // ou 2). Et « 1 × » ne s'écrit pas davantage : c'est bien le facteur
          // entier qu'il faut retirer, pas seulement son chiffre.
          `$${a === 1 ? "" : `${a} \\times `}(${x})^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)} \\times (${x}) ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = ${fr(y)}$.`,
          `Le point cherché est $(${x} \\, ; \\, ${fr(y)})$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$(${x} \\, ; \\, ${fr(a * x * x + b * x - c)})$`,
            cause: "erreur de signe sur le terme constant",
          },
          {
            choice: `$(${x} \\, ; \\, ${fr(a * x + b * x + c)})$`,
            cause: "a oublié le carré",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_fct_estimer_seuil ═══════════════ */

  {
    kind: "template",
    id: "premiere_fct_seuil_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_lecture_graphique",
    microId: "auto_fct_estimer_seuil",
    difficulty: 3,
    theme: "neutral",
    hint: "Trace mentalement la droite horizontale au niveau du seuil et regarde où la courbe la franchit.",
    tags: ["premiere", "maths", "graphique", "seuil", "template", "short"],
    generate: () => {
      const a = pick([1, 2] as const);
      const b = randomInt(-2, 2);
      const seuil = a * 2 + b; // franchi exactement en x = 2
      return {
        text:
          `La droite ci-contre donne le bénéfice d'une entreprise, en milliers d'euros, ` +
          `en fonction du nombre d'articles vendus (en centaines). ` +
          `À partir de quelle abscisse le bénéfice atteint-il $${fr(seuil)}$ ?`,
        format: "short",
        expected: ["2"],
        comparator: "number_equal",
        canvas: canvasDroite(a, b, { titre: "Bénéfice (en milliers d'euros)" }),
        explanation: exp(
          "Franchir un seuil, c'est atteindre une ordonnée donnée : on cherche l'abscisse correspondante.",
          `On repère $${fr(seuil)}$ sur l'axe vertical, on rejoint la droite, puis on lit l'abscisse.`,
          `La droite a pour équation $y = ${fr(a)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$. On résout $${fr(a)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${fr(seuil)}$, d'où $x = 2$.`,
          `Le seuil est atteint à partir de $x = 2$, et la droite étant croissante, il reste franchi au-delà.`
        ),
      };
    },
  },

  /* ═══════════════ auto_fct_reperer_graphique ═══════════════ */

  {
    kind: "template",
    id: "premiere_fct_reperer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_lecture_graphique",
    microId: "auto_fct_reperer_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Avant de lire une valeur, il faut savoir ce que chaque axe mesure, et dans quelle unité.",
    tags: ["premiere", "maths", "graphique", "reperage", "template"],
    generate: () => {
      const a = pick([2, 3] as const);
      const b = pick([1, 2] as const);
      return {
        text:
          `Le graphique ci-contre donne le coût d'une location, en euros, en fonction du nombre de jours. ` +
          `Que représente une graduation d'UNE unité sur l'axe horizontal ?`,
        format: "qcm",
        choices: makeChoices("un jour de location", [
          "un euro",
          `${a} euros`,
          "un pourcentage",
        ]),
        expected: ["un jour de location"],
        comparator: "mcq_exact",
        canvas: canvasDroite(a, b, { titre: "Coût de la location (en euros)" }),
        explanation: exp(
          "Lire un graphique commence par identifier les grandeurs portées par chaque axe, avec leurs unités.",
          "On relit l'énoncé : « le coût EN FONCTION DU nombre de jours ».",
          "Ce qui suit « en fonction de » va en abscisse : ici le nombre de jours. Le coût, lui, se lit en ordonnée, en euros.",
          "Une graduation horizontale vaut un jour de location. Se tromper d'axe, c'est lire l'inverse de ce qui est demandé."
        ),
        choiceDiagnostics: [
          {
            choice: "un euro",
            cause: "a interverti les axes : les euros sont en ordonnée",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_fct_tracer_droite ═══════════════ */

  {
    kind: "template",
    id: "premiere_fct_tracer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_droites",
    microId: "auto_fct_tracer_droite",
    difficulty: 3,
    theme: "neutral",
    hint: "On place l'ordonnée à l'origine, puis on avance de $1$ et on monte du coefficient directeur.",
    tags: ["premiere", "maths", "graphique", "droite", "template"],
    generate: () => {
      const a = pick([-2, -1, 2, 3] as const);
      // ⛔ b ≠ a : les pièges « (1 ; a) » et « (1 ; b) » se confondraient.
      const b = pick(([-2, 1, 3] as const).filter((v) => v !== a));
      return {
        text:
          `On veut tracer la droite d'équation $y = ${fr(a)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$. ` +
          `Après avoir placé le point $(0 \\, ; \\, ${fr(b)})$, quel second point peut-on placer ?`,
        format: "qcm",
        choices: makeChoices(`$(1 \\, ; \\, ${fr(a + b)})$`, [
          `$(1 \\, ; \\, ${fr(a)})$`,
          `$(${fr(a)} \\, ; \\, 1)$`,
          `$(1 \\, ; \\, ${fr(b)})$`,
          `$(1 \\, ; \\, ${fr(a - b)})$`,
        ]),
        expected: [`$(1 \\, ; \\, ${fr(a + b)})$`],
        comparator: "mcq_exact",
        canvas: canvasDroite(a, b),
        explanation: exp(
          "Deux points suffisent à tracer une droite. Le plus simple : l'ordonnée à l'origine, puis le point obtenu en avançant de $1$.",
          "On calcule l'image de $1$.",
          `$y = ${fr(a)} \\times 1 ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${fr(a + b)}$.`,
          `Le second point est $(1 \\, ; \\, ${fr(a + b)})$ : depuis l'ordonnée à l'origine, on avance de $1$ et l'on ${a > 0 ? "monte" : "descend"} de $${fr(Math.abs(a))}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$(1 \\, ; \\, ${fr(a)})$`,
            cause: "a oublié d'ajouter l'ordonnée à l'origine",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_fct_lire_croissance ═══════════════ */

  {
    kind: "template",
    id: "premiere_fct_lire_croissance_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_resolution_graphique",
    microId: "auto_fct_lire_croissance",
    difficulty: 4,
    theme: "neutral",
    hint: "Une droite monte toujours de la même façon ; une parabole, non.",
    tags: ["premiere", "maths", "graphique", "croissance", "template"],
    generate: () => {
      const droite = Math.random() < 0.5;
      const a = pick([1, 2] as const);
      return {
        text: `Comment la grandeur représentée ci-contre augmente-t-elle ?`,
        format: "qcm",
        choices: makeChoices(
          droite ? "à vitesse constante" : "de plus en plus vite",
          ["à vitesse constante", "de plus en plus vite", "de plus en plus lentement", "elle diminue"]
        ),
        expected: [droite ? "à vitesse constante" : "de plus en plus vite"],
        comparator: "mcq_exact",
        canvas: droite
          ? canvasDroite(a, 1, { titre: "Évolution de la grandeur" })
          : canvasParabole(a, 0, -2, "Évolution de la grandeur"),
        explanation: exp(
          "Lire les variations d'une grandeur, ce n'est pas seulement dire si elle monte : c'est dire COMMENT elle monte.",
          "On compare l'augmentation sur des intervalles successifs de même largeur.",
          droite
            ? "La courbe est une droite : quand on avance de $1$, la grandeur augmente toujours de la même quantité."
            : "La courbe s'incurve vers le haut : quand on avance de $1$, la grandeur augmente de plus en plus.",
          droite
            ? "Elle augmente à vitesse constante — c'est une croissance linéaire."
            : "Elle augmente de plus en plus vite : la croissance s'accélère."
        ),
      };
    },
  },

  /* ═══════════════ auto_fct_resoudre_graphiquement ═══════════════ */

  {
    kind: "template",
    id: "premiere_fct_resoudre_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_resolution_graphique",
    microId: "auto_fct_resoudre_graphiquement",
    difficulty: 3,
    theme: "neutral",
    hint: "Résoudre $f(x) = k$, c'est chercher où la courbe coupe la droite horizontale d'ordonnée $k$.",
    tags: ["premiere", "maths", "graphique", "equation", "template", "short"],
    generate: () => {
      const a = pick([-2, -1, 1, 2] as const);
      const b = randomInt(-3, 3);
      const x = pick([-2, -1, 1, 2, 3] as const);
      const k = a * x + b;
      return {
        text: `La droite ci-contre représente $f$. Résous graphiquement l'équation $f(x) = ${fr(k)}$.`,
        format: "short",
        expected: [fr(x)],
        comparator: "number_equal",
        canvas: canvasDroite(a, b, { titre: "La courbe de f" }),
        explanation: exp(
          "Résoudre $f(x) = k$ revient à chercher les abscisses des points de la courbe d'ordonnée $k$.",
          `On trace la droite horizontale d'ordonnée $${fr(k)}$ et on repère l'intersection.`,
          `$${fr(a)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${fr(k)}$ donne $x = ${fr(x)}$.`,
          `La solution est $x = ${fr(x)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_fct_inequation_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_resolution_graphique",
    microId: "auto_fct_resoudre_graphiquement",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour une inéquation, on garde la PORTION de courbe située au-dessus (ou en dessous) de la droite horizontale.",
    tags: ["premiere", "maths", "graphique", "inequation", "template"],
    generate: () => {
      const a = pick([1, 2] as const);
      // ⚠️ avec a = 1 et b = 0, on aurait f(x) = x pour TOUT x : le filtre
      // ci-dessous viderait alors la liste et le tirage produirait des NaN.
      // D'où b non nul dans ce cas — vu à l'exécution, pas à la lecture.
      const b = a === 1 ? pick([-2, -1, 1, 2] as const) : randomInt(-2, 2);
      // ⛔ on écarte les tirages où le seuil k tombe sur l'abscisse x : le
      // distracteur « [k ; +∞[ », qui confond ordonnées et abscisses, vaudrait
      // alors la bonne réponse.
      const x = pick(([-1, 0, 1, 2] as const).filter((v) => a * v + b !== v));
      const k = a * x + b;
      return {
        text: `La droite ci-contre représente $f$. Quel est l'ensemble des solutions de $f(x) \\geq ${fr(k)}$ ?`,
        format: "qcm",
        choices: makeChoices(`$[${fr(x)} \\, ; \\, +\\infty[$`, [
          `$]-\\infty \\, ; \\, ${fr(x)}]$`,
          `$[${fr(k)} \\, ; \\, +\\infty[$`,
          `$\\{${fr(x)}\\}$`,
        ]),
        expected: [`$[${fr(x)} \\, ; \\, +\\infty[$`],
        comparator: "mcq_exact",
        canvas: canvasDroite(a, b, { titre: "La courbe de f" }),
        explanation: exp(
          "Résoudre $f(x) \\geq k$, c'est chercher les abscisses pour lesquelles la courbe est AU-DESSUS de la droite horizontale d'ordonnée $k$.",
          `La droite est croissante (son coefficient directeur $${fr(a)}$ est positif) : elle passe au-dessus de $${fr(k)}$ à partir du point d'intersection.`,
          `L'intersection a lieu en $x = ${fr(x)}$, donc la courbe est au-dessus pour $x \\geq ${fr(x)}$.`,
          `L'ensemble des solutions est $[${fr(x)} \\, ; \\, +\\infty[$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$[${fr(k)} \\, ; \\, +\\infty[$`,
            cause: "a donné un intervalle d'ORDONNÉES : les solutions d'une inéquation sont des abscisses",
          },
          {
            choice: `$\\{${fr(x)}\\}$`,
            cause: "a résolu l'équation au lieu de l'inéquation",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_fct_signe_graphique ═══════════════ */

  {
    kind: "template",
    id: "premiere_fct_signe_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_resolution_graphique",
    microId: "auto_fct_signe_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "Une fonction est positive là où sa courbe est au-dessus de l'axe des abscisses.",
    tags: ["premiere", "maths", "graphique", "signe", "template"],
    generate: () => {
      const a = pick([-2, -1, 1, 2] as const);
      const racine = pick([-2, -1, 1, 2] as const);
      const b = -a * racine; // la droite coupe l'axe en x = racine
      const croissante = a > 0;
      return {
        text: `La droite ci-contre représente $f$. Sur quel intervalle $f$ est-elle positive ?`,
        format: "qcm",
        choices: makeChoices(
          croissante ? `$[${fr(racine)} \\, ; \\, +\\infty[$` : `$]-\\infty \\, ; \\, ${fr(racine)}]$`,
          [
            croissante ? `$]-\\infty \\, ; \\, ${fr(racine)}]$` : `$[${fr(racine)} \\, ; \\, +\\infty[$`,
            `$[0 \\, ; \\, +\\infty[$`,
            "sur $\\mathbb{R}$ tout entier",
          ]
        ),
        expected: [croissante ? `$[${fr(racine)} \\, ; \\, +\\infty[$` : `$]-\\infty \\, ; \\, ${fr(racine)}]$`],
        comparator: "mcq_exact",
        canvas: canvasDroite(a, b, { titre: "La courbe de f" }),
        explanation: exp(
          "$f(x) \\geq 0$ signifie que le point de la courbe est au-dessus de l'axe des abscisses.",
          "On repère où la droite coupe l'axe horizontal, puis de quel côté elle est au-dessus.",
          `La droite coupe l'axe en $x = ${fr(racine)}$ et elle est ${croissante ? "croissante" : "décroissante"} : elle est donc au-dessus ${croissante ? "à droite" : "à gauche"} de ce point.`,
          `$f$ est positive sur ${croissante ? `$[${fr(racine)} \\, ; \\, +\\infty[$` : `$]-\\infty \\, ; \\, ${fr(racine)}]$`}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$[0 \\, ; \\, +\\infty[$`,
            cause: "a confondu « $f(x)$ positif » et « $x$ positif »",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_fct_variations_graphique ═══════════════ */

  {
    kind: "template",
    id: "premiere_fct_variations_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_resolution_graphique",
    microId: "auto_fct_variations_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "Le sommet de la parabole sépare la partie descendante de la partie montante.",
    tags: ["premiere", "maths", "graphique", "variations", "template"],
    generate: () => {
      const a = pick([1, 2] as const);
      // ⛔ jamais 0 : le distracteur « ]−∞ ; 0] » serait la bonne réponse.
      const sommetX = pick([-2, -1, 1, 2] as const);
      const b = -2 * a * sommetX;
      const c = randomInt(-3, 1);
      return {
        text: `La courbe ci-contre représente une fonction $f$. Sur quel intervalle $f$ est-elle décroissante ?`,
        format: "qcm",
        choices: makeChoices(`$]-\\infty \\, ; \\, ${fr(sommetX)}]$`, [
          `$[${fr(sommetX)} \\, ; \\, +\\infty[$`,
          `$]-\\infty \\, ; \\, 0]$`,
          "elle est croissante partout",
        ]),
        expected: [`$]-\\infty \\, ; \\, ${fr(sommetX)}]$`],
        comparator: "mcq_exact",
        canvas: canvasParabole(a, b, c),
        explanation: exp(
          "Une fonction est décroissante là où sa courbe descend quand on la parcourt de gauche à droite.",
          "Pour une parabole tournée vers le haut, la courbe descend jusqu'au sommet, puis remonte.",
          `Le sommet a pour abscisse $${fr(sommetX)}$.`,
          `$f$ est décroissante sur $]-\\infty \\, ; \\, ${fr(sommetX)}]$, puis croissante ensuite.`
        ),
      };
    },
  },

  /* ═══════════════ auto_fct_lineaire_affine ═══════════════ */

  {
    kind: "template",
    id: "premiere_fct_affine_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_droites",
    microId: "auto_fct_lineaire_affine",
    difficulty: 2,
    theme: "neutral",
    hint: "Une fonction affine s'écrit $ax + b$ : pas de carré, pas d'inverse.",
    tags: ["premiere", "maths", "graphique", "affine", "template"],
    generate: () => {
      const a = pick([2, 3, 5] as const);
      const b = randomInt(-5, 5);
      return {
        text: "Laquelle de ces fonctions est représentée graphiquement par une droite ?",
        format: "qcm",
        choices: makeChoices(
          `$f(x) = ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$`,
          [`$g(x) = x^3$`, `$h(x) = -\\dfrac{1}{x} + ${a}$`, `$i(x) = ${a}x^2 + ${Math.abs(b)}x + 1$`]
        ),
        expected: [`$f(x) = ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$`],
        comparator: "mcq_exact",
        canvas: canvasDroite(a > 2 ? 2 : a, b > 3 ? 3 : b, { titre: "Une droite" }),
        explanation: exp(
          "Une fonction affine, de la forme $x \\mapsto ax + b$, est représentée par une droite.",
          "On repère la forme de chaque expression : un carré, un cube ou un inverse donnent des courbes.",
          `$f(x) = ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$ est de la forme $ax + b$.`,
          "Seule $f$ est affine, donc seule sa représentation est une droite."
        ),
      };
    },
  },

  /* ═══════════════ auto_fct_lire_equation_reduite ═══════════════ */

  {
    kind: "template",
    id: "premiere_fct_equation_reduite_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_droites",
    microId: "auto_fct_lire_equation_reduite",
    difficulty: 3,
    theme: "neutral",
    hint: "$b$ se lit là où la droite coupe l'axe vertical ; $a$ est ce qu'on monte quand on avance de $1$.",
    tags: ["premiere", "maths", "graphique", "droite", "template"],
    generate: () => {
      const a = pick(PENTES);
      // ⛔ b ≠ 0, sinon « y = ax − b » est la bonne réponse écrite autrement ;
      // ⛔ b ≠ a, sinon « y = bx + a » l'est aussi.
      const b = pick(([-3, -2, -1, 1, 2, 3] as const).filter((x) => x !== a));
      const ecrire = (p: number, q: number) =>
        `$y = ${fr(p)}x ${q >= 0 ? "+" : "-"} ${Math.abs(q)}$`;
      return {
        text: "Quelle est l'équation réduite de la droite tracée ci-contre ?",
        format: "qcm",
        choices: makeChoices(ecrire(a, b), [
          ecrire(-a, b),
          ecrire(b, a),
          ecrire(a, -b),
        ]),
        expected: [ecrire(a, b)],
        comparator: "mcq_exact",
        canvas: canvasDroite(a, b),
        explanation: exp(
          "Une droite non verticale a pour équation réduite $y = ax + b$, où $a$ est le coefficient directeur et $b$ l'ordonnée à l'origine.",
          "On lit d'abord $b$ à l'intersection avec l'axe vertical, puis $a$ en avançant de $1$ vers la droite.",
          `La droite coupe l'axe des ordonnées en $${fr(b)}$, et quand on avance de $1$, on ${a > 0 ? "monte" : "descend"} de $${fr(Math.abs(a))}$ : $a = ${fr(a)}$.`,
          `Son équation réduite est ${ecrire(a, b)}.`
        ),
        choiceDiagnostics: [
          {
            choice: ecrire(b, a),
            cause: "a échangé le coefficient directeur et l'ordonnée à l'origine",
          },
          {
            choice: ecrire(-a, b),
            cause: "s'est trompé de sens de pente",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_fct_coefficient_directeur ═══════════════ */

  {
    kind: "template",
    id: "premiere_fct_coefficient_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_droites",
    microId: "auto_fct_coefficient_directeur",
    difficulty: 3,
    theme: "neutral",
    hint: "$a = \\dfrac{y_B - y_A}{x_B - x_A}$ — et l'ordre des deux points n'a pas d'importance, à condition de le garder.",
    tags: ["premiere", "maths", "graphique", "coefficient", "template", "short"],
    generate: () => {
      const xa = randomInt(-3, 0);
      const xb = randomInt(1, 3);
      const a = pick([-2, -1, 1, 2] as const);
      const b = randomInt(-2, 2);
      const ya = a * xa + b;
      const yb = a * xb + b;
      return {
        text:
          `La droite ci-contre passe par $A(${xa} \\, ; \\, ${fr(ya)})$ et $B(${xb} \\, ; \\, ${fr(yb)})$. ` +
          `Quel est son coefficient directeur ?`,
        format: "short",
        expected: [fr(a)],
        comparator: "number_equal",
        canvas: canvasDroite(a, b, {
          points: [
            { x: xa, y: ya, label: "A" },
            { x: xb, y: yb, label: "B" },
          ],
        }),
        explanation: exp(
          "Le coefficient directeur d'une droite passant par $A$ et $B$ vaut $\\dfrac{y_B - y_A}{x_B - x_A}$.",
          "On calcule la différence des ordonnées, puis celle des abscisses, dans le même ordre.",
          `$\\dfrac{${fr(yb)} - ${fr(ya)}}{${xb} - ${xa}} = \\dfrac{${fr(yb - ya)}}{${xb - xa}} = ${fr(a)}$.`,
          `Le coefficient directeur vaut $${fr(a)}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_fct_coefficient_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_droites",
    microId: "auto_fct_coefficient_directeur",
    difficulty: 3,
    theme: "neutral",
    text: "Une droite passe par $A(-1 \\, ; \\, 2)$ et $B(-3 \\, ; \\, 4)$. Son coefficient directeur est :",
    format: "qcm",
    choices: ["$-1$", "$1$", "$-2$", "$2$"],
    expected: ["$-1$"],
    comparator: "mcq_exact",
    hint: "Garde le même ordre en haut et en bas : $y_B - y_A$ sur $x_B - x_A$.",
    explanation: exp(
      "Le coefficient directeur vaut $\\dfrac{y_B - y_A}{x_B - x_A}$.",
      "On soustrait dans le MÊME ordre au numérateur et au dénominateur — c'est là que le signe se perd.",
      "$\\dfrac{4 - 2}{-3 - (-1)} = \\dfrac{2}{-2} = -1$.",
      "Le coefficient directeur vaut $-1$ : quand on avance de $1$, on descend de $1$. (Question tombée au sujet de Métropole, juin 2026.)"
    ),
    choiceDiagnostics: [
      {
        choice: "$1$",
        cause: "a oublié le signe du dénominateur : $-3 - (-1) = -2$, et non $2$",
      },
    ],
    tags: ["premiere", "maths", "graphique", "coefficient", "sujet-2026"],
  },
];
