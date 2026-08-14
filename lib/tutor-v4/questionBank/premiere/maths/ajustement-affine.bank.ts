// lib/tutor-v4/questionBank/premiere/maths/ajustement-affine.bank.ts
//
// Notions : info_nuage, info_point_moyen, info_ajustement_affine,
//           info_interpoler_extrapoler (domaine BOP1IC)
//
// La partie quantitative de l'analyse de l'information chiffrée : deux
// caractères, un nuage de points, une droite qui le résume, et des valeurs
// qu'on en tire. Capacités attendues du programme :
//   · savoir calculer les coordonnées d'un point moyen ;
//   · déterminer et utiliser un ajustement affine pour interpoler ou
//     extrapoler des valeurs inconnues.
//
// « Plusieurs ajustements sont proposés (au jugé, droite de Mayer, moindres
// carrés) mais AUCUNE connaissance théorique n'est attendue » : on ne demande
// donc jamais de calculer une droite de régression. On la donne, ou on la fait
// passer par deux points lus sur le graphique.
//
// Les contextes viennent de la colonne « Situations et problèmes » : le niveau
// moyen des océans (Sciences de la Terre), la population d'une ville
// (démographie), une température, des ventes.
//
// Tous les items portent une figure. Les nuages sont construits autour d'une
// droite avec un écart d'une unité de part et d'autre, dont la somme est nulle :
// le point moyen tombe juste, et l'alignement se voit sans être parfait — un
// nuage trop parfait n'apprendrait pas à juger si un ajustement est pertinent.

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

/* ── Situations à deux caractères quantitatifs ── */

const CONTEXTES = [
  {
    intro: "On relève chaque année le niveau moyen de la mer, en millimètres au-dessus d'une référence.",
    abscisse: "le nombre d'années écoulées depuis",
    ordonnee: "le niveau (en mm)",
    grandeur: "niveau",
    unite: "mm",
  },
  {
    intro: "On relève chaque année la population d'une commune, en centaines d'habitants.",
    abscisse: "le nombre d'années écoulées depuis",
    ordonnee: "la population (en centaines)",
    grandeur: "population",
    unite: "centaines d'habitants",
  },
  {
    intro: "Un magasin relève chaque mois ses ventes, en milliers d'euros.",
    abscisse: "le numéro du mois",
    ordonnee: "les ventes (en milliers d'euros)",
    grandeur: "ventes",
    unite: "milliers d'euros",
  },
] as const;

// Un nuage de 5 points autour de la droite y = ax + b, avec des écarts qui se
// compensent : la moyenne des ordonnées vaut exactement b + 2a.
// ⛔ l'écart du point CENTRAL n'est jamais nul : sinon l'ordonnée du point du
// milieu vaudrait exactement celle du point moyen, et le distracteur « a pris le
// point du milieu au lieu de la moyenne » deviendrait la bonne réponse.
// C'est justement la confusion que ce distracteur doit débusquer.
const ECARTS = [
  [-1, 1, 1, -1, 0],
  [1, -1, -1, 1, 0],
  [0, 1, -1, 1, -1],
  [-1, 0, 1, 1, -1],
] as const;

function nuage() {
  const ctx = pick(CONTEXTES);
  const a = pick([2, 3, 4, 5] as const);
  const b = pick([10, 12, 15, 20] as const);
  const ecarts = pick(ECARTS);
  const ys = ecarts.map((e, k) => b + a * k + e);
  return {
    ctx,
    a,
    b,
    ys,
    xMoyen: 2,
    yMoyen: b + 2 * a, // la somme des écarts est nulle
  };
}

function canvasNuage(
  n: ReturnType<typeof nuage>,
  options?: { droite?: boolean; pointMoyen?: boolean }
): CanvasFigure {
  const ymax = Math.max(...n.ys);
  const points = n.ys.map((y, k) => ({ x: k, y, label: undefined as string | undefined }));
  if (options?.pointMoyen) {
    points.push({ x: n.xMoyen, y: n.yMoyen, label: "G" });
  }
  return {
    kind: "fonctionGraphique",
    titre: n.ctx.ordonnee,
    xmin: -0.5,
    xmax: 6.5,
    ymin: 0,
    ymax: Math.ceil((ymax * 1.25) / 5) * 5,
    grille: true,
    courbes: options?.droite
      ? [{ id: "ajust", type: "affine", a: n.a, b: n.b, couleur: "#0284c7" }]
      : undefined,
    points,
  };
}

export const ajustementAffineBank: TutorBankItemV4[] = [
  /* ═══════════════ info_nuage_lire ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_nuage_lire_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_nuage",
    microId: "info_nuage_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Repère l'abscisse demandée, puis monte jusqu'au point.",
    tags: ["premiere", "maths", "statistiques", "nuage", "template", "short"],
    generate: () => {
      const n = nuage();
      const k = randomInt(1, 4);
      return {
        text:
          `${n.ctx.intro} Le nuage de points ci-contre donne ${n.ctx.ordonnee} en fonction de ` +
          `${n.ctx.abscisse} le premier relevé. Quelle est l'ordonnée du point d'abscisse $${k}$ ?`,
        format: "short",
        expected: [fr(n.ys[k])],
        comparator: "number_equal",
        canvas: canvasNuage(n),
        explanation: exp(
          "Chaque point d'un nuage a pour coordonnées $(x \\, ; \\, y)$ : la valeur du premier caractère, puis celle du second.",
          "On repère l'abscisse sur l'axe horizontal, puis on lit l'ordonnée du point correspondant.",
          `Le point d'abscisse $${k}$ a pour ordonnée $${fr(n.ys[k])}$.`,
          `La ${n.ctx.grandeur} vaut alors $${fr(n.ys[k])}$ ${n.ctx.unite}.`
        ),
      };
    },
  },

  /* ═══════════════ info_nuage_construire ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_nuage_construire_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_nuage",
    microId: "info_nuage_construire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le premier caractère va en abscisse, le second en ordonnée.",
    tags: ["premiere", "maths", "statistiques", "nuage", "template"],
    generate: () => {
      const n = nuage();
      const k = randomInt(1, 4);
      return {
        text:
          `${n.ctx.intro} Au relevé numéro $${k}$, ${n.ctx.grandeur} vaut $${fr(n.ys[k])}$. ` +
          `Quelles sont les coordonnées du point à placer dans le nuage ?`,
        format: "qcm",
        choices: makeChoices(`$(${k} \\, ; \\, ${fr(n.ys[k])})$`, [
          `$(${fr(n.ys[k])} \\, ; \\, ${k})$`,
          `$(${k} \\, ; \\, ${fr(n.ys[k] + 2)})$`,
          `$(${k + 1} \\, ; \\, ${fr(n.ys[k])})$`,
        ]),
        expected: [`$(${k} \\, ; \\, ${fr(n.ys[k])})$`],
        comparator: "mcq_exact",
        canvas: canvasNuage(n),
        explanation: exp(
          "Dans un nuage, chaque individu donne un point : abscisse = premier caractère, ordonnée = second.",
          "On lit l'énoncé dans l'ordre : le numéro du relevé, puis la valeur mesurée.",
          `Relevé $${k}$, valeur $${fr(n.ys[k])}$ : le point est $(${k} \\, ; \\, ${fr(n.ys[k])})$.`,
          `Le point à placer est $(${k} \\, ; \\, ${fr(n.ys[k])})$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$(${fr(n.ys[k])} \\, ; \\, ${k})$`,
            cause: "a inversé abscisse et ordonnée",
          },
        ],
      };
    },
  },

  /* ═══════════════ info_nuage_tendance ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_tendance_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_nuage",
    microId: "info_nuage_tendance",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si les points montent, descendent, ou partent dans tous les sens.",
    tags: ["premiere", "maths", "statistiques", "nuage", "tendance", "template"],
    generate: () => {
      const n = nuage();
      return {
        text: `${n.ctx.intro} Que peut-on dire du nuage de points ci-contre ?`,
        format: "qcm",
        choices: makeChoices("Les points sont presque alignés et montent", [
          "Les points sont presque alignés et descendent",
          "Les points sont dispersés sans tendance",
          "Les points sont sur une courbe qui s'incurve fortement",
        ]),
        expected: ["Les points sont presque alignés et montent"],
        comparator: "mcq_exact",
        canvas: canvasNuage(n),
        explanation: exp(
          "Décrire un nuage, c'est dire s'il présente une tendance, et laquelle.",
          "On regarde l'allure d'ensemble, sans s'arrêter à chaque point.",
          `Les ordonnées passent de $${fr(n.ys[0])}$ à $${fr(n.ys[4])}$ en montant régulièrement, avec de petits écarts de part et d'autre.`,
          "Les points sont presque alignés et croissants : un ajustement affine a du sens ici."
        ),
      };
    },
  },

  /* ═══════════════ info_point_moyen_calculer ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_point_moyen_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_point_moyen",
    microId: "info_point_moyen_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le point moyen a pour coordonnées la moyenne des abscisses et la moyenne des ordonnées.",
    tags: ["premiere", "maths", "statistiques", "point-moyen", "template", "short"],
    generate: () => {
      const n = nuage();
      return {
        text:
          `${n.ctx.intro} Le nuage ci-contre comporte $5$ points, d'abscisses $0$ à $4$, ` +
          `d'ordonnées $${n.ys.map((y) => fr(y)).join("$, $")}$. ` +
          `Quelle est l'ORDONNÉE du point moyen $G$ ?`,
        format: "short",
        expected: [fr(n.yMoyen)],
        comparator: "number_equal",
        canvas: canvasNuage(n),
        explanation: exp(
          "Le point moyen $G$ a pour coordonnées $(\\bar{x} \\, ; \\, \\bar{y})$ : la moyenne des abscisses et la moyenne des ordonnées.",
          "On additionne les cinq ordonnées, puis on divise par $5$.",
          `$\\dfrac{${n.ys.map((y) => fr(y)).join(" + ")}}{5} = \\dfrac{${fr(n.ys.reduce((s, y) => s + y, 0))}}{5} = ${fr(n.yMoyen)}$.`,
          `L'ordonnée de $G$ vaut $${fr(n.yMoyen)}$. Son abscisse, elle, vaut $\\dfrac{0+1+2+3+4}{5} = 2$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_info_point_moyen_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_point_moyen",
    microId: "info_point_moyen_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux moyennes à calculer : une pour les abscisses, une pour les ordonnées.",
    tags: ["premiere", "maths", "statistiques", "point-moyen", "template"],
    generate: () => {
      const n = nuage();
      return {
        text: `${n.ctx.intro} Quelles sont les coordonnées du point moyen $G$ du nuage ci-contre ?`,
        format: "qcm",
        choices: makeChoices(`$(2 \\, ; \\, ${fr(n.yMoyen)})$`, [
          `$(${fr(n.yMoyen)} \\, ; \\, 2)$`,
          `$(2,5 \\, ; \\, ${fr(n.yMoyen)})$`,
          `$(2 \\, ; \\, ${fr(n.ys[2])})$`,
        ]),
        expected: [`$(2 \\, ; \\, ${fr(n.yMoyen)})$`],
        comparator: "mcq_exact",
        canvas: canvasNuage(n, { pointMoyen: true }),
        explanation: exp(
          "$G(\\bar{x} \\, ; \\, \\bar{y})$ : chaque coordonnée est une moyenne.",
          "On calcule séparément la moyenne des abscisses et celle des ordonnées.",
          `$\\bar{x} = \\dfrac{0+1+2+3+4}{5} = 2$ et $\\bar{y} = ${fr(n.yMoyen)}$.`,
          `$G(2 \\, ; \\, ${fr(n.yMoyen)})$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$(2 \\, ; \\, ${fr(n.ys[2])})$`,
            cause: "a pris l'ordonnée du point du milieu au lieu de la moyenne des ordonnées",
          },
          {
            choice: `$(2,5 \\, ; \\, ${fr(n.yMoyen)})$`,
            cause: "a calculé la moyenne de $0$ à $5$ : il n'y a que cinq points, d'abscisses $0$ à $4$",
          },
        ],
      };
    },
  },

  /* ═══════════════ info_point_moyen_placer ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_point_moyen_placer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_point_moyen",
    microId: "info_point_moyen_placer",
    difficulty: 2,
    theme: "neutral",
    hint: "Le point moyen n'est pas forcément un point du nuage.",
    tags: ["premiere", "maths", "statistiques", "point-moyen", "template"],
    generate: () => {
      const n = nuage();
      return {
        text: `Le point $G$ est placé sur le graphique ci-contre. Que peut-on dire de lui ?`,
        format: "qcm",
        choices: makeChoices(
          "C'est le point moyen : il n'appartient pas forcément au nuage",
          [
            "C'est le point du nuage le plus haut",
            "C'est un point du nuage, toujours",
            "C'est le point du nuage le plus proche de l'origine",
          ]
        ),
        expected: ["C'est le point moyen : il n'appartient pas forcément au nuage"],
        comparator: "mcq_exact",
        canvas: canvasNuage(n, { pointMoyen: true }),
        explanation: exp(
          "Le point moyen $G$ résume le nuage : ses coordonnées sont les deux moyennes.",
          "On compare ses coordonnées à celles des points du nuage.",
          `$G(2 \\, ; \\, ${fr(n.yMoyen)})$, alors que le point du nuage d'abscisse $2$ a pour ordonnée $${fr(n.ys[2])}$.`,
          "Le point moyen est un point calculé, pas un individu observé : il tombe rarement sur un point du nuage. La droite d'ajustement, elle, passe toujours par lui."
        ),
      };
    },
  },

  /* ═══════════════ info_ajust_pertinence ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_info_pertinence_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_ajustement_affine",
    microId: "info_ajust_pertinence",
    difficulty: 3,
    theme: "neutral",
    text: "Quand un ajustement affine est-il pertinent pour un nuage de points ?",
    format: "qcm",
    choices: [
      "Quand les points sont sensiblement alignés",
      "Quand les points sont nombreux",
      "Quand toutes les ordonnées sont positives",
      "Toujours : une droite passe par n'importe quel nuage",
    ],
    expected: ["Quand les points sont sensiblement alignés"],
    comparator: "mcq_exact",
    hint: "Un ajustement affine remplace le nuage par une DROITE.",
    explanation: exp(
      "Un ajustement affine consiste à remplacer le nuage par une droite qui le résume.",
      "Cette droite ne peut représenter fidèlement le nuage que si celui-ci suit lui-même une direction rectiligne.",
      "Un nuage qui s'incurve ou qui part dans tous les sens serait mal résumé : la droite passerait loin de beaucoup de points.",
      "L'ajustement affine est pertinent quand les points sont sensiblement alignés — et c'est à regarder AVANT de calculer quoi que ce soit."
    ),
    tags: ["premiere", "maths", "statistiques", "ajustement"],
  },

  /* ═══════════════ info_ajust_determiner ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_ajust_determiner_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_ajustement_affine",
    microId: "info_ajust_determiner",
    difficulty: 3,
    theme: "neutral",
    hint: "Coefficient directeur : ce que la droite monte quand on avance de $1$.",
    tags: ["premiere", "maths", "statistiques", "ajustement", "template", "short"],
    generate: () => {
      const n = nuage();
      return {
        text:
          `${n.ctx.intro} La droite tracée ci-contre ajuste le nuage. ` +
          `Elle passe par $(0 \\, ; \\, ${fr(n.b)})$ et $(4 \\, ; \\, ${fr(n.b + 4 * n.a)})$. ` +
          `Quel est son coefficient directeur ?`,
        format: "short",
        expected: [fr(n.a)],
        comparator: "number_equal",
        canvas: canvasNuage(n, { droite: true }),
        explanation: exp(
          "Le coefficient directeur d'une droite passant par deux points vaut $\\dfrac{y_B - y_A}{x_B - x_A}$.",
          "On lit deux points de la droite, puis on applique la formule.",
          `$\\dfrac{${fr(n.b + 4 * n.a)} - ${fr(n.b)}}{4 - 0} = \\dfrac{${fr(4 * n.a)}}{4} = ${fr(n.a)}$.`,
          `Le coefficient directeur vaut $${fr(n.a)}$ : la ${n.ctx.grandeur} augmente d'environ $${fr(n.a)}$ ${n.ctx.unite} par période.`
        ),
      };
    },
  },

  /* ═══════════════ info_ajust_equation ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_ajust_equation_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_ajustement_affine",
    microId: "info_ajust_equation",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace $x$ par la valeur voulue dans l'équation de la droite.",
    tags: ["premiere", "maths", "statistiques", "ajustement", "template", "short"],
    generate: () => {
      const n = nuage();
      const k = randomInt(1, 4);
      return {
        text:
          `${n.ctx.intro} La droite d'ajustement du nuage a pour équation ` +
          `$y = ${fr(n.a)}x + ${fr(n.b)}$. Quelle valeur donne-t-elle pour $x = ${k}$ ?`,
        format: "short",
        expected: [fr(n.a * k + n.b)],
        comparator: "number_equal",
        canvas: canvasNuage(n, { droite: true }),
        explanation: exp(
          "La droite d'ajustement fournit un modèle : à chaque $x$ elle associe une valeur estimée de $y$.",
          "On remplace $x$ par la valeur demandée.",
          `$y = ${fr(n.a)} \\times ${k} + ${fr(n.b)} = ${fr(n.a * k + n.b)}$.`,
          `Le modèle donne $${fr(n.a * k + n.b)}$, alors que la valeur observée était $${fr(n.ys[k])}$ : un ajustement approche, il ne reproduit pas.`
        ),
      };
    },
  },

  /* ═══════════════ info_ajust_interpoler ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_interpoler_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_interpoler_extrapoler",
    microId: "info_ajust_interpoler",
    difficulty: 3,
    theme: "neutral",
    hint: "Interpoler : estimer une valeur À L'INTÉRIEUR de la plage observée.",
    tags: ["premiere", "maths", "statistiques", "interpolation", "template", "short"],
    generate: () => {
      const n = nuage();
      const x = pick([1.5, 2.5, 3.5] as const);
      return {
        text:
          `${n.ctx.intro} Les relevés vont de $x = 0$ à $x = 4$, et la droite d'ajustement ` +
          `a pour équation $y = ${fr(n.a)}x + ${fr(n.b)}$. ` +
          `Estime la ${n.ctx.grandeur} pour $x = ${fr(x)}$.`,
        format: "short",
        expected: [fr(n.a * x + n.b)],
        comparator: "number_equal",
        canvas: canvasNuage(n, { droite: true }),
        explanation: exp(
          "Interpoler, c'est estimer une valeur inconnue SITUÉE ENTRE les valeurs observées.",
          "On utilise l'équation de la droite d'ajustement.",
          `$y = ${fr(n.a)} \\times ${fr(x)} + ${fr(n.b)} = ${fr(n.a * x + n.b)}$.`,
          `On estime $${fr(n.a * x + n.b)}$ ${n.ctx.unite}. Comme $${fr(x)}$ est à l'intérieur de la plage observée, l'estimation est raisonnable.`
        ),
      };
    },
  },

  /* ═══════════════ info_ajust_extrapoler ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_extrapoler_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_interpoler_extrapoler",
    microId: "info_ajust_extrapoler",
    difficulty: 3,
    theme: "neutral",
    hint: "Extrapoler : prolonger le modèle AU-DELÀ des valeurs observées.",
    tags: ["premiere", "maths", "statistiques", "extrapolation", "template", "short"],
    generate: () => {
      const n = nuage();
      const x = pick([6, 8, 10] as const);
      return {
        text:
          `${n.ctx.intro} Les relevés vont de $x = 0$ à $x = 4$, et la droite d'ajustement ` +
          `a pour équation $y = ${fr(n.a)}x + ${fr(n.b)}$. ` +
          `Quelle ${n.ctx.grandeur} le modèle prévoit-il pour $x = ${x}$ ?`,
        format: "short",
        expected: [fr(n.a * x + n.b)],
        comparator: "number_equal",
        canvas: canvasNuage(n, { droite: true }),
        explanation: exp(
          "Extrapoler, c'est utiliser le modèle EN DEHORS de la plage des valeurs observées.",
          "Le calcul est le même que pour une interpolation ; c'est la confiance qu'on accorde au résultat qui change.",
          `$y = ${fr(n.a)} \\times ${x} + ${fr(n.b)} = ${fr(n.a * x + n.b)}$.`,
          `Le modèle prévoit $${fr(n.a * x + n.b)}$ ${n.ctx.unite}. ⚠️ Rien ne garantit que la tendance se poursuive jusque-là : c'est une prévision, pas une mesure.`
        ),
      };
    },
  },

  /* ═══════════════ info_ajust_limites ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_limites_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_interpoler_extrapoler",
    microId: "info_ajust_limites",
    difficulty: 4,
    theme: "neutral",
    hint: "Jusqu'où peut-on croire une droite tracée à partir de cinq relevés ?",
    tags: ["premiere", "maths", "statistiques", "extrapolation", "esprit-critique", "template"],
    generate: () => {
      const n = nuage();
      const loin = pick([50, 80, 100] as const);
      return {
        text:
          `${n.ctx.intro} On a relevé $5$ valeurs et tracé une droite d'ajustement. ` +
          `Quelqu'un l'utilise pour prévoir la ${n.ctx.grandeur} dans $${loin}$ périodes. Que penser de cette prévision ?`,
        format: "qcm",
        choices: makeChoices(
          "Elle est très incertaine : rien ne dit que la tendance se poursuivra si loin",
          [
            "Elle est exacte, puisqu'elle vient d'un calcul",
            "Elle est fausse : on ne peut jamais extrapoler",
            "Elle est fiable, car la droite passe par le point moyen",
          ]
        ),
        expected: ["Elle est très incertaine : rien ne dit que la tendance se poursuivra si loin"],
        comparator: "mcq_exact",
        canvas: canvasNuage(n, { droite: true }),
        explanation: exp(
          "Un ajustement résume les données OBSERVÉES ; il ne prouve rien sur ce qui n'a pas été observé.",
          "On compare l'étendue des relevés à la distance de la prévision.",
          `Les relevés couvrent $5$ périodes ; la prévision porte sur la $${loin}$ᵉ, soit $${Math.round(loin / 5)}$ fois plus loin que ce qu'on a mesuré.`,
          "Le calcul est juste, la prévision reste très incertaine. Extrapoler est permis — le programme le demande —, mais dire jusqu'où l'on peut croire le modèle fait partie du travail."
        ),
        choiceDiagnostics: [
          {
            choice: "Elle est exacte, puisqu'elle vient d'un calcul",
            cause: "confond l'exactitude d'un calcul et la validité d'un modèle",
          },
          {
            choice: "Elle est fausse : on ne peut jamais extrapoler",
            cause: "l'extrapolation est au programme : ce qui est en cause, c'est la distance, pas le principe",
          },
        ],
      };
    },
  },
];
