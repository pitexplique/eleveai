// lib/tutor-v4/questionBank/premiere/maths/fonctions-affines.bank.ts
//
// Notions : lin_affine, lin_affine_lecture, lin_modeliser, lin_seuil (BOP1VL)
//
// Le programme est explicite sur le statut de cette partie : « Les fonctions
// affines, déjà étudiées en classe de seconde, peuvent faire l'objet d'un
// travail succinct. L'objectif est de remobiliser les connaissances abordées en
// seconde : représentation graphique, sens de variation, LIEN ENTRE LE TAUX
// D'ACCROISSEMENT ET LE COEFFICIENT DIRECTEUR de la droite représentative. »
//
// C'est ce lien qui est neuf, et c'est lui qu'on travaille ici — pas la
// définition d'une fonction affine.
//
// Situations du BO, reprises telles quelles :
//   · correspondance entre degrés Celsius et Fahrenheit (physique) ;
//   · offre et demande modélisées par deux fonctions affines, point d'équilibre
//     (économie) ;
//   · barème de l'impôt sur le revenu, fonction affine par morceaux, taux
//     marginal et taux moyen (enseignement moral et civique) ;
//   · modèle linéaire de l'évolution du niveau moyen des océans.

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

function canvasDroite(
  a: number,
  b: number,
  options?: { titre?: string; seconde?: { a: number; b: number }; xmax?: number; ymax?: number }
): CanvasFigure {
  const courbes = [
    { id: "d1", type: "affine" as const, a, b, couleur: "#0284c7" },
  ];
  if (options?.seconde) {
    courbes.push({ id: "d2", type: "affine" as const, ...options.seconde, couleur: "#e11d48" });
  }
  return {
    kind: "fonctionGraphique",
    titre: options?.titre ?? "La droite représentative",
    xmin: options?.seconde ? -0.5 : -5,
    xmax: options?.xmax ?? (options?.seconde ? 10 : 5),
    ymin: options?.seconde ? 0 : -6,
    ymax: options?.ymax ?? (options?.seconde ? 60 : 6),
    grille: true,
    courbes,
  };
}

export const fonctionsAffinesBank: TutorBankItemV4[] = [
  /* ═══════════════ lin_affine_expression ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_affine_expression_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_affine",
    microId: "lin_affine_expression",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient directeur se calcule avec deux points ; l'ordonnée à l'origine se lit ensuite.",
    tags: ["premiere", "maths", "affine", "template"],
    generate: () => {
      const a = pick([-2, -1, 2, 3, 4] as const);
      const x1 = 0;
      const x2 = pick([1, 2] as const);
      // Trois exclusions, toutes trouvées à l'exécution :
      // ⛔ b ≠ a          : « coefficients échangés » vaudrait la bonne réponse ;
      // ⛔ a·x2 + b ≠ a   : le troisième piège la vaudrait ;
      // ⛔ a·x2 + b ≠ −a  : les deuxième et troisième pièges se confondraient.
      const b = pick(
        ([-4, -3, -2, -1, 1, 2, 3, 4] as const).filter(
          (v) => v !== a && a * x2 + v !== a && a * x2 + v !== -a
        )
      );
      return {
        text:
          `Une fonction affine $f$ vérifie $f(${x1}) = ${fr(b)}$ et $f(${x2}) = ${fr(a * x2 + b)}$. ` +
          `Quelle est son expression ?`,
        format: "qcm",
        choices: makeChoices(
          `$f(x) = ${fr(a)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$`,
          [
            `$f(x) = ${fr(b)}x ${a >= 0 ? "+" : "-"} ${Math.abs(a)}$`,
            `$f(x) = ${fr(-a)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$`,
            `$f(x) = ${fr(a * x2 + b)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$`,
          ]
        ),
        expected: [`$f(x) = ${fr(a)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$`],
        comparator: "mcq_exact",
        canvas: canvasDroite(a, b),
        explanation: exp(
          "Une fonction affine s'écrit $f(x) = ax + b$, où $a$ est le coefficient directeur et $b$ l'ordonnée à l'origine.",
          "On calcule $a$ à partir de deux images, puis on lit $b = f(0)$.",
          `$a = \\dfrac{${fr(a * x2 + b)} - ${fr(b)}}{${x2} - 0} = ${fr(a)}$, et $b = f(0) = ${fr(b)}$.`,
          `$f(x) = ${fr(a)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$f(x) = ${fr(b)}x ${a >= 0 ? "+" : "-"} ${Math.abs(a)}$`,
            cause: "a échangé le coefficient directeur et l'ordonnée à l'origine",
          },
        ],
      };
    },
  },

  /* ═══════════════ lin_affine_taux_accroissement ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_taux_accroissement_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_affine",
    microId: "lin_affine_taux_accroissement",
    difficulty: 3,
    theme: "neutral",
    hint: "Le taux d'accroissement d'une fonction affine EST son coefficient directeur — il ne dépend pas des points choisis.",
    tags: ["premiere", "maths", "affine", "taux", "template", "short"],
    generate: () => {
      const a = pick([-3, -1.5, 2, 2.5, 4] as const);
      const b = randomInt(-3, 5);
      const x1 = pick([-2, 0, 1] as const);
      const x2 = x1 + pick([2, 3, 4] as const);
      return {
        text:
          `Soit $f(x) = ${fr(a)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$. ` +
          `Quel est le taux d'accroissement de $f$ entre $${fr(x1)}$ et $${fr(x2)}$ ?`,
        format: "short",
        expected: [fr(a)],
        comparator: "number_equal",
        canvas: canvasDroite(a, b),
        explanation: exp(
          "Le taux d'accroissement entre $x_1$ et $x_2$ vaut $\\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$.",
          "On calcule les deux images, puis le quotient.",
          `$f(${fr(x1)}) = ${fr(a * x1 + b)}$ et $f(${fr(x2)}) = ${fr(a * x2 + b)}$, d'où ` +
            `$\\dfrac{${fr(a * x2 + b)} - ${fr(a * x1 + b)}}{${fr(x2)} - ${fr(x1)}} = ${fr(a)}$.`,
          `Le taux d'accroissement vaut $${fr(a)}$ : c'est exactement le coefficient directeur. ` +
            `Pour une fonction affine, il est le MÊME quels que soient les deux points choisis — c'est ce qui la caractérise.`
        ),
      };
    },
  },

  /* ═══════════════ lin_affine_variation ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_affine_variation_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_affine",
    microId: "lin_affine_variation",
    difficulty: 2,
    theme: "neutral",
    hint: "C'est le signe du coefficient directeur qui décide, pas celui de l'ordonnée à l'origine.",
    tags: ["premiere", "maths", "affine", "variations", "template"],
    generate: () => {
      const a = pick([-4, -2, -0.5, 0.5, 3, 5] as const);
      const b = pick([-5, -2, 4, 6] as const);
      return {
        text: `Soit $f(x) = ${fr(a)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$. Cette fonction est :`,
        format: "qcm",
        choices: makeChoices(a > 0 ? "croissante" : "décroissante", [
          a > 0 ? "décroissante" : "croissante",
          "constante",
          "croissante puis décroissante",
        ]),
        expected: [a > 0 ? "croissante" : "décroissante"],
        comparator: "mcq_exact",
        canvas: canvasDroite(a, b),
        explanation: exp(
          "Une fonction affine $x \\mapsto ax + b$ est croissante si $a > 0$, décroissante si $a < 0$, constante si $a = 0$.",
          "On regarde le seul signe de $a$.",
          `Ici $a = ${fr(a)}$, donc $a ${a > 0 ? ">" : "<"} 0$.`,
          `La fonction est ${a > 0 ? "croissante" : "décroissante"}. Le terme $${fr(b)}$ déplace la droite verticalement, il ne change rien à son sens.`
        ),
      };
    },
  },

  /* ═══════════════ lin_affine_graphique ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_affine_graphique_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_affine_lecture",
    microId: "lin_affine_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux repères suffisent : l'ordonnée à l'origine, et un déplacement de $1$ vers la droite.",
    tags: ["premiere", "maths", "affine", "graphique", "template", "short"],
    generate: () => {
      // Celsius → Fahrenheit, situation du BO. On travaille sur un modèle
      // simplifié pour rester calculable de tête.
      const a = pick([1.5, 2] as const);
      const b = pick([30, 32] as const);
      const x = pick([10, 20, 30] as const);
      return {
        text:
          `Une correspondance approchée entre degrés Celsius et degrés Fahrenheit est modélisée par ` +
          `$f(x) = ${fr(a)}x + ${fr(b)}$, où $x$ est la température en Celsius. ` +
          `À combien de degrés Fahrenheit correspondent $${x}$ °C ?`,
        format: "short",
        expected: [fr(a * x + b)],
        comparator: "number_equal",
        canvas: canvasDroite(a, b, {
          titre: "Fahrenheit en fonction de Celsius",
          xmax: 40,
          ymax: 110,
        }),
        explanation: exp(
          "Une fonction affine associe à chaque valeur de $x$ l'image $ax + b$.",
          "On remplace $x$ par la température en Celsius.",
          `$f(${x}) = ${fr(a)} \\times ${x} + ${fr(b)} = ${fr(a * x + b)}$.`,
          `$${x}$ °C correspondent à environ $${fr(a * x + b)}$ °F. ` +
            `Le coefficient $${fr(a)}$ dit que chaque degré Celsius vaut $${fr(a)}$ degrés Fahrenheit, et $${fr(b)}$ est la valeur en $0$ °C.`
        ),
      };
    },
  },

  /* ═══════════════ lin_affine_par_morceaux ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_par_morceaux_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_affine_lecture",
    microId: "lin_affine_par_morceaux",
    difficulty: 4,
    theme: "neutral",
    hint: "Un taux marginal ne s'applique qu'à la PART du revenu située dans la tranche.",
    tags: ["premiere", "maths", "affine", "impot", "template", "short"],
    generate: () => {
      const seuil = pick([10000, 12000, 15000] as const);
      const taux = pick([10, 20] as const);
      const revenu = seuil + pick([2000, 4000, 6000] as const);
      const impot = ((revenu - seuil) * taux) / 100;
      return {
        text:
          `Un barème simplifié d'impôt ne taxe rien jusqu'à $${seuil}$ €, ` +
          `puis prélève $${taux}\\,\\%$ sur la part du revenu qui dépasse ce seuil. ` +
          `Quel impôt paie une personne gagnant $${revenu}$ € ?`,
        format: "short",
        expected: [fr(impot)],
        comparator: "number_equal",
        explanation: exp(
          "Un barème par tranches se modélise par une fonction affine par morceaux : nulle jusqu'au seuil, puis de coefficient directeur égal au taux marginal.",
          "On calcule d'abord la part du revenu située au-dessus du seuil, puis on lui applique le taux.",
          `Part imposable : $${revenu} - ${seuil} = ${fr(revenu - seuil)}$ €. Impôt : $${fr(revenu - seuil)} \\times ${fr(taux / 100)} = ${fr(impot)}$ €.`,
          `L'impôt vaut $${fr(impot)}$ €. ⚠️ Le taux ne s'applique PAS à tout le revenu : ` +
            `sinon on paierait $${fr((revenu * taux) / 100)}$ €. C'est la confusion entre taux marginal et taux moyen — ` +
            `ici le taux moyen n'est que de $${fr(Math.round((impot / revenu) * 1000) / 10)}\\,\\%$.`
        ),
      };
    },
  },

  /* ═══════════════ lin_affine_point_equilibre ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_equilibre_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_affine_lecture",
    microId: "lin_affine_point_equilibre",
    difficulty: 4,
    theme: "neutral",
    hint: "Le point d'équilibre est l'intersection des deux droites : offre et demande y sont égales.",
    tags: ["premiere", "maths", "affine", "economie", "template", "short"],
    generate: () => {
      // offre : y = a1·x + b1 (croissante) ; demande : y = −a2·x + b2 (décroissante)
      const equilibre = pick([2, 3, 4, 5] as const);
      const a1 = pick([2, 3, 4] as const);
      const a2 = pick([2, 5, 6] as const);
      const b1 = pick([5, 10] as const);
      // On impose l'égalité en x = equilibre : a1·e + b1 = −a2·e + b2
      const b2 = a1 * equilibre + b1 + a2 * equilibre;
      return {
        text:
          `Sur un marché, l'offre est modélisée par $f(x) = ${a1}x + ${b1}$ et la demande par ` +
          `$g(x) = -${a2}x + ${b2}$, où $x$ est le prix unitaire en euros. ` +
          `Quel est le prix d'équilibre ?`,
        format: "short",
        expected: [fr(equilibre)],
        comparator: "number_equal",
        canvas: canvasDroite(a1, b1, {
          titre: "Offre (bleu) et demande (rouge)",
          seconde: { a: -a2, b: b2 },
          xmax: 10,
          ymax: Math.max(a1 * 10 + b1, b2) + 5,
        }),
        explanation: exp(
          "Le point d'équilibre d'un marché est le point où l'offre égale la demande : c'est l'intersection des deux droites.",
          "On résout $f(x) = g(x)$.",
          `$${a1}x + ${b1} = -${a2}x + ${b2}$ donne $${a1 + a2}x = ${fr(b2 - b1)}$, d'où $x = ${fr(equilibre)}$.`,
          `Le prix d'équilibre est de $${fr(equilibre)}$ €, pour une quantité de $${fr(a1 * equilibre + b1)}$ unités.`
        ),
      };
    },
  },

  /* ═══════════════ lin_modele_reconnaitre ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_modele_reconnaitre_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_modeliser",
    microId: "lin_modele_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Croissance linéaire : on ajoute toujours la MÊME QUANTITÉ. Exponentielle : on multiplie toujours par le même nombre.",
    tags: ["premiere", "maths", "modelisation", "template"],
    generate: () => {
      const lineaire = Math.random() < 0.5;
      const somme = pick([2, 3, 5] as const);
      const taux = pick([3, 5, 10] as const);
      return {
        text: lineaire
          ? `Le niveau moyen de la mer monte d'environ $${somme}$ mm chaque année. Quel modèle décrit cette évolution ?`
          : `Une population augmente d'environ $${taux}\\,\\%$ chaque année. Quel modèle décrit cette évolution ?`,
        format: "qcm",
        choices: makeChoices(
          lineaire ? "une croissance linéaire" : "une croissance exponentielle",
          [
            lineaire ? "une croissance exponentielle" : "une croissance linéaire",
            "une croissance quadratique",
            "aucune croissance",
          ]
        ),
        expected: [lineaire ? "une croissance linéaire" : "une croissance exponentielle"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une croissance est linéaire quand la même QUANTITÉ s'ajoute à chaque période, exponentielle quand c'est le même POURCENTAGE.",
          "On repère si l'énoncé donne une quantité fixe ou un taux fixe.",
          lineaire
            ? `« $${somme}$ mm chaque année » est une quantité fixe : on ajoute toujours $${somme}$.`
            : `« $${taux}\\,\\%$ chaque année » est un taux fixe : on multiplie toujours par $${fr(1 + taux / 100)}$.`,
          lineaire
            ? "C'est une croissance linéaire, modélisée par une suite arithmétique ou une fonction affine."
            : "C'est une croissance exponentielle, modélisée par une suite géométrique."
        ),
      };
    },
  },

  /* ═══════════════ lin_modele_choisir ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_modele_choisir_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_modeliser",
    microId: "lin_modele_choisir",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre de départ donne l'ordonnée à l'origine ; l'ajout annuel donne le coefficient directeur.",
    tags: ["premiere", "maths", "modelisation", "template"],
    generate: () => {
      const depart = pick([1200, 1500, 2000] as const);
      const ajout = pick([50, 100, 150] as const);
      return {
        text:
          `Une forêt compte $${depart}$ arbres, et l'on en plante $${ajout}$ de plus chaque année. ` +
          `Quelle fonction $f$ donne le nombre d'arbres au bout de $x$ années ?`,
        format: "qcm",
        choices: makeChoices(`$f(x) = ${ajout}x + ${depart}$`, [
          `$f(x) = ${depart}x + ${ajout}$`,
          `$f(x) = ${depart} \\times ${ajout}^x$`,
          `$f(x) = ${depart} + ${ajout}$`,
        ]),
        expected: [`$f(x) = ${ajout}x + ${depart}$`],
        comparator: "mcq_exact",
        canvas: canvasDroite(ajout, depart, {
          titre: "Nombre d'arbres au fil des années",
          xmax: 10,
          ymax: depart + 10 * ajout + 100,
        }),
        explanation: exp(
          "Une croissance linéaire se modélise par $f(x) = ax + b$, où $b$ est la valeur de départ et $a$ ce qu'on ajoute à chaque période.",
          "On identifie la valeur initiale et l'accroissement annuel.",
          `Départ : $${depart}$ arbres, donc $b = ${depart}$. Ajout annuel : $${ajout}$, donc $a = ${ajout}$.`,
          `$f(x) = ${ajout}x + ${depart}$. On vérifie : $f(0) = ${depart}$, ce qui est bien le nombre de départ.`
        ),
        choiceDiagnostics: [
          {
            choice: `$f(x) = ${depart}x + ${ajout}$`,
            cause: "a échangé la valeur de départ et l'accroissement annuel",
          },
          {
            choice: `$f(x) = ${depart} \\times ${ajout}^x$`,
            cause: "a choisi un modèle exponentiel alors que l'ajout est une quantité fixe",
          },
        ],
      };
    },
  },

  /* ═══════════════ lin_modele_conclure ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_conclure_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_modeliser",
    microId: "lin_modele_conclure",
    difficulty: 3,
    theme: "neutral",
    hint: "Une réponse à un problème concret se donne dans les unités du problème, pas en $x$.",
    tags: ["premiere", "maths", "modelisation", "template"],
    generate: () => {
      const depart = pick([1200, 1500] as const);
      const ajout = pick([100, 150] as const);
      const annees = pick([6, 8, 10] as const);
      const total = depart + ajout * annees;
      return {
        text:
          `Une forêt suit le modèle $f(x) = ${ajout}x + ${depart}$, où $x$ est le nombre d'années écoulées. ` +
          `On calcule $f(${annees}) = ${total}$. Quelle phrase répond correctement ?`,
        format: "qcm",
        choices: makeChoices(
          `au bout de $${annees}$ ans, la forêt comptera $${total}$ arbres`,
          [
            `au bout de $${annees}$ ans, on aura planté $${total}$ arbres`,
            `il faudra $${total}$ ans pour atteindre $${annees}$ arbres`,
            `la forêt gagne $${total}$ arbres par an`,
          ]
        ),
        expected: [`au bout de $${annees}$ ans, la forêt comptera $${total}$ arbres`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une réponse doit être rendue dans le contexte : dire ce que représente le nombre trouvé, avec son unité.",
          "On relit ce que désignent $x$ et $f(x)$ dans l'énoncé.",
          `$x$ compte les années, $f(x)$ le nombre TOTAL d'arbres. Donc $f(${annees}) = ${total}$ signifie : $${total}$ arbres au bout de $${annees}$ ans.`,
          `La bonne phrase est « au bout de $${annees}$ ans, la forêt comptera $${total}$ arbres ». ` +
            `Les arbres PLANTÉS depuis le début seraient $${fr(ajout * annees)}$ : c'est une autre question.`
        ),
      };
    },
  },

  /* ═══════════════ lin_seuil_calcul ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_seuil_calcul_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_seuil",
    microId: "lin_seuil_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "Résoudre une inéquation du premier degré suffit.",
    tags: ["premiere", "maths", "seuil", "template", "short"],
    generate: () => {
      const depart = pick([1200, 1500, 2000] as const);
      const ajout = pick([100, 150, 200] as const);
      const annees = pick([5, 8, 10] as const);
      const seuil = depart + ajout * annees;
      return {
        text:
          `Une forêt suit le modèle $f(x) = ${ajout}x + ${depart}$, où $x$ est le nombre d'années. ` +
          `À partir de combien d'années la forêt compte-t-elle au moins $${seuil}$ arbres ?`,
        format: "short",
        expected: [String(annees)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème de seuil se traduit par une inéquation.",
          "On résout $f(x) \\geq$ seuil.",
          `$${ajout}x + ${depart} \\geq ${seuil}$ donne $${ajout}x \\geq ${fr(seuil - depart)}$, puis $x \\geq ${annees}$.`,
          `Il faut $${annees}$ années. On vérifie : $f(${annees}) = ${seuil}$, exactement le seuil visé.`
        ),
      };
    },
  },

  /* ═══════════════ lin_seuil_tableau ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_seuil_tableau_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_seuil",
    microId: "lin_seuil_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "On parcourt le tableau jusqu'à la première valeur qui atteint le seuil.",
    tags: ["premiere", "maths", "seuil", "tableau", "template", "short"],
    generate: () => {
      const depart = pick([20000, 25000] as const);
      const ajout = pick([200, 250] as const);
      const cible = depart + ajout * pick([4, 6, 8] as const);
      const rang = (cible - depart) / ajout;
      const lignes = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => [n, depart + ajout * n]);
      return {
        text:
          `Un capital de $${depart}$ € augmente de $${ajout}$ € chaque année. ` +
          `Le tableau ci-contre donne son évolution. ` +
          `À partir de quelle année atteint-il $${cible}$ € ?`,
        format: "short",
        expected: [String(rang)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: "Capital année après année",
          headers: ["", "Année", "Capital (€)"],
          rows: lignes.map((l, i) => ({ label: String(i + 1), values: l })),
        },
        explanation: exp(
          "Un tableau de valeurs permet de répondre à un problème de seuil par lecture directe.",
          "On parcourt la colonne des capitaux jusqu'à atteindre la somme visée.",
          `$${cible}$ € apparaît à l'année $${rang}$.`,
          `Le capital atteint $${cible}$ € au bout de $${rang}$ années. ` +
            `C'est exactement la démarche de l'exercice 2 du sujet de Métropole, qui fournit l'extrait de tableur.`
        ),
      };
    },
  },

  /* ═══════════════ lin_seuil_graphique ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_seuil_graphique_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_seuil",
    microId: "lin_seuil_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "On trace la droite horizontale au niveau du seuil et on regarde où la droite la croise.",
    tags: ["premiere", "maths", "seuil", "graphique", "template", "short"],
    generate: () => {
      const a = pick([2, 3, 4] as const);
      const b = pick([2, 4, 6] as const);
      const x = pick([2, 3, 4] as const);
      const seuil = a * x + b;
      return {
        text:
          `La droite ci-contre représente le nombre d'adhérents d'un club, en dizaines, ` +
          `en fonction du nombre d'années. ` +
          `À partir de quelle année dépasse-t-on $${seuil}$ dizaines d'adhérents ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        canvas: canvasDroite(a, b, {
          titre: "Adhérents (en dizaines) par année",
          xmax: 10,
          ymax: a * 10 + b + 5,
        }),
        explanation: exp(
          "Résoudre graphiquement un problème de seuil, c'est repérer l'abscisse du point où la courbe atteint l'ordonnée visée.",
          `On repère $${seuil}$ sur l'axe vertical, on rejoint la droite, puis on lit l'abscisse.`,
          `La droite a pour équation $y = ${a}x + ${b}$, et $${a}x + ${b} = ${seuil}$ donne $x = ${x}$.`,
          `Le seuil est atteint à l'année $${x}$, et la droite étant croissante, il reste dépassé ensuite.`
        ),
      };
    },
  },
];
