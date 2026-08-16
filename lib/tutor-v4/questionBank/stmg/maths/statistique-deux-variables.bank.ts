// lib/tutor-v4/questionBank/stmg/maths/statistique-deux-variables.bank.ts
//
// Notions : stat_nuage, stat_ajustement, stat_interpoler,
//           stat_moindres_carres, stat_changement_variable
//           (domaine STMGST — « Séries statistiques à deux variables
//            quantitatives », classe terminale)
//
// ⭐ TOUTES les questions portent une figure — nuage de points, droite
// d'ajustement, ou tableau de données. C'est le sujet même : « on procède à la
// recherche d'ajustements pertinents, affines ou non, de ces nuages, dans le
// but de réaliser des interpolations ou des extrapolations ». Un nuage décrit
// en toutes lettres n'est plus un nuage.
//
// Le nuage est FABRIQUÉ par le générateur : on choisit la droite, puis on
// disperse les points autour. Les données changent donc à chaque tirage, et la
// bonne réponse aussi.
//
// ⚠️ Le BO demande explicitement l'esprit critique, et pas seulement le
// calcul : « les élèves sont entraînés à exercer leur esprit critique sur la
// pertinence, au regard des données et de la situation étudiée, d'une
// modélisation par ajustement affine et sur les limites des extrapolations
// faites dans ce cadre ». D'où la micro sur les limites — une extrapolation à
// vingt ans n'a pas la même valeur qu'une interpolation entre deux relevés.
//
// ⛔ « Aucun développement théorique n'est attendu » sur les moindres carrés :
// on présente le principe — la droite qui minimise la somme des carrés des
// écarts — et on le fait manipuler, sans démonstration.

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

/* ─────────────────── contextes ─────────────────── */

const SERIES = [
  { x: "Rang de l'année", y: "Chiffre d'affaires", unite: "k€", sujet: "l'évolution du chiffre d'affaires" },
  { x: "Dépense publicitaire (k€)", y: "Ventes", unite: "milliers d'articles", sujet: "l'effet de la publicité sur les ventes" },
  { x: "Rang du mois", y: "Nombre d'abonnés", unite: "abonnés", sujet: "la croissance du nombre d'abonnés" },
  { x: "Température moyenne (°C)", y: "Consommation d'électricité", unite: "MWh", sujet: "la consommation selon la température" },
  { x: "Ancienneté (années)", y: "Valeur du véhicule", unite: "centaines d'€", sujet: "la décote d'un véhicule" },
  { x: "Surface de vente (dizaines de m²)", y: "Chiffre d'affaires", unite: "k€", sujet: "le rendement au mètre carré" },
] as const;

type Nuage = {
  serie: (typeof SERIES)[number];
  xs: number[];
  ys: number[];
  /** Droite « vraie » ayant servi à fabriquer le nuage. */
  a: number;
  b: number;
};

/**
 * Un nuage fabriqué autour d'une droite connue.
 *
 * On choisit d'abord la droite, puis on disperse les points : la tendance est
 * ainsi maîtrisée, les valeurs restent entières, et la bonne réponse change à
 * chaque tirage.
 */
function tirerNuage(options?: { croissant?: boolean; bruit?: number }): Nuage {
  const serie = pick(SERIES);
  const croissant = options?.croissant ?? Math.random() < 0.5;
  const a = (croissant ? 1 : -1) * pick([2, 3, 4, 5, 6, 8, 10] as const);
  const b = randomInt(20, 60);
  const bruit = options?.bruit ?? 3;
  const n = pick([5, 6, 7] as const);
  const xs = Array.from({ length: n }, (_, k) => k + 1);
  const ys = xs.map((x) => a * x + b + randomInt(-bruit, bruit));
  return { serie, xs, ys, a, b };
}

/** Le nuage, avec éventuellement une droite d'ajustement. */
function canvasNuage(
  nuage: Nuage,
  titre: string,
  droite?: { a: number; b: number },
  evidence?: { x?: number; y?: number }
): CanvasFigure {
  const tous = [...nuage.ys, ...(droite ? nuage.xs.map((x) => droite.a * x + droite.b) : [])];
  return {
    kind: "fonctionGraphique",
    titre,
    xmin: 0,
    xmax: Math.max(...nuage.xs) + 2,
    ymin: Math.max(0, Math.floor(Math.min(...tous) - 8)),
    ymax: Math.ceil(Math.max(...tous) + 8),
    grille: true,
    courbes: [
      { id: "nuage", type: "points", points: nuage.xs.map((x, k) => ({ x, y: nuage.ys[k] })) },
      ...(droite ? [{ id: "d", type: "affine" as const, a: droite.a, b: droite.b }] : []),
    ],
    points: nuage.xs.map((x, k) => ({ x, y: nuage.ys[k] })),
    misesEnEvidence:
      evidence !== undefined
        ? [
            {
              verticale: evidence.x !== undefined ? { x: evidence.x } : undefined,
              horizontale: evidence.y !== undefined ? { y: evidence.y } : undefined,
            },
          ]
        : undefined,
  };
}

/** Le même nuage, en tableau de données. */
function canvasTableauNuage(nuage: Nuage, titre: string): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: titre,
    headers: [nuage.serie.x, ...nuage.xs.map((x) => String(x))],
    rows: [{ label: `${nuage.serie.y} (${nuage.serie.unite})`, values: nuage.ys.map((y) => String(y)) }],
  };
}

export const statistiqueDeuxVariablesBank: TutorBankItemV4[] = [
  /* ═══════════════ statT_nuage_representer ═══════════════ */

  {
    kind: "template",
    id: "stmg_stat_nuage_representer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_nuage",
    microId: "statT_nuage_representer",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque colonne du tableau donne UN point : l'abscisse en haut, l'ordonnée en dessous.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const nuage = tirerNuage();
      const k = randomInt(0, nuage.xs.length - 1);
      return {
        text:
          `Le tableau donne une série statistique à deux variables sur ${nuage.serie.sujet}. ` +
          `Quelles sont les coordonnées du point du nuage correspondant à la colonne « $${nuage.xs[k]}$ » ?`,
        format: "qcm",
        choices: makeChoices(`$(${nuage.xs[k]}\\,;\\,${nuage.ys[k]})$`, [
          `$(${nuage.ys[k]}\\,;\\,${nuage.xs[k]})$`,
          `$(${nuage.xs[k]}\\,;\\,${nuage.ys[(k + 1) % nuage.ys.length]})$`,
          `$(${k}\\,;\\,${nuage.ys[k]})$`,
          `$(${nuage.xs[k]}\\,;\\,${nuage.ys[k] + 5})$`,
          `$(${nuage.xs[k] + 1}\\,;\\,${nuage.ys[k]})$`,
        ]),
        expected: [`$(${nuage.xs[k]}\\,;\\,${nuage.ys[k]})$`],
        comparator: "mcq_exact",
        canvas: canvasTableauNuage(nuage, `${nuage.serie.sujet} — données`),
        explanation: exp(
          "Représenter une série à deux variables, c'est placer un point par couple $(x_i\\,;\\,y_i)$ : la première variable en abscisse, la seconde en ordonnée.",
          "On lit la colonne du tableau : la valeur du haut donne l'abscisse, celle du bas l'ordonnée.",
          `Pour $${nuage.serie.x} = ${nuage.xs[k]}$, on relève $${nuage.serie.y} = ${nuage.ys[k]}$ ${nuage.serie.unite}.`,
          `Le point a pour coordonnées $(${nuage.xs[k]}\\,;\\,${nuage.ys[k]})$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$(${nuage.ys[k]}\\,;\\,${nuage.xs[k]})$`,
            cause: "a interverti abscisse et ordonnée",
          },
        ],
      };
    },
  },

  /* ═══════════════════ statT_nuage_lire ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_nuage_lire_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_nuage",
    microId: "statT_nuage_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "On repère l'abscisse sur l'axe horizontal, puis on monte jusqu'au point.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const nuage = tirerNuage();
      const k = randomInt(0, nuage.xs.length - 1);
      return {
        text:
          `Sur ce nuage de points décrivant ${nuage.serie.sujet}, ` +
          `quelle est la valeur de « ${nuage.serie.y} » pour $${nuage.serie.x} = ${nuage.xs[k]}$ ?`,
        format: "short",
        expected: [String(nuage.ys[k])],
        comparator: "number_equal",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, undefined, { x: nuage.xs[k] }),
        explanation: exp(
          "Chaque point du nuage a pour abscisse une valeur de la première variable et pour ordonnée la valeur associée de la seconde.",
          "On repère l'abscisse sur l'axe horizontal, on monte jusqu'au point, puis on lit son ordonnée.",
          `Au point d'abscisse $${nuage.xs[k]}$, l'ordonnée vaut $${nuage.ys[k]}$.`,
          `La valeur est $${nuage.ys[k]}$ ${nuage.serie.unite}.`
        ),
      };
    },
  },

  /* ═══════════════════ statT_nuage_tendance ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_nuage_tendance_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_nuage",
    microId: "statT_nuage_tendance",
    difficulty: 2,
    theme: "neutral",
    hint: "On regarde si le nuage monte, descend, ou ne suit aucune direction.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const croissant = Math.random() < 0.5;
      const nuage = tirerNuage({ croissant });
      return {
        text: `Comment décrire la tendance de ce nuage de points ?`,
        format: "qcm",
        choices: shuffle([
          "croissante : les points montent globalement",
          "décroissante : les points descendent globalement",
          "les points sont exactement alignés",
          "aucune tendance ne se dégage",
        ]),
        expected: [
          croissant ? "croissante : les points montent globalement" : "décroissante : les points descendent globalement",
        ],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`),
        explanation: exp(
          "La tendance d'un nuage décrit le sens général de la relation entre les deux variables : croissante, décroissante, ou inexistante.",
          "On observe l'allure globale, sans s'arrêter à un point isolé.",
          `Ici les points ${croissant ? "montent" : "descendent"} globalement — sans être exactement alignés, ` +
            `puisque $${nuage.serie.y}$ passe de $${nuage.ys[0]}$ à $${nuage.ys[nuage.ys.length - 1]}$.`,
          `La tendance est ${croissant ? "croissante" : "décroissante"}.`
        ),
        choiceDiagnostics: [
          {
            choice: "les points sont exactement alignés",
            cause: "des points proches d'une droite ne sont pas alignés : c'est ce qui rend l'ajustement nécessaire",
          },
        ],
      };
    },
  },

  /* ═══════════════ statT_ajust_pertinence ═══════════════ */

  {
    kind: "template",
    id: "stmg_stat_pertinence_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_pertinence",
    difficulty: 3,
    theme: "neutral",
    hint: "Un ajustement affine convient si les points se répartissent autour d'une DROITE, pas d'une courbe.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const affine = Math.random() < 0.5;
      const serie = pick(SERIES);
      const n = 7;
      const xs = Array.from({ length: n }, (_, k) => k + 1);
      const a = pick([4, 5, 6, 8] as const);
      const b = randomInt(20, 40);
      const ys = affine
        ? xs.map((x) => a * x + b + randomInt(-3, 3))
        : xs.map((x) => Math.round(b * Math.pow(1.45, x - 1)));
      const nuage: Nuage = { serie, xs, ys, a, b };
      return {
        text: "Un ajustement affine est-il pertinent pour ce nuage ?",
        format: "qcm",
        choices: shuffle([
          "oui : les points se répartissent autour d'une droite",
          "non : les points suivent une courbe, l'écart s'accentue",
          "oui, toujours, quel que soit le nuage",
          "on ne peut pas en juger sur un graphique",
        ]),
        expected: [
          affine
            ? "oui : les points se répartissent autour d'une droite"
            : "non : les points suivent une courbe, l'écart s'accentue",
        ],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${serie.sujet}`),
        explanation: exp(
          "Un ajustement affine n'est pertinent que si le nuage se répartit autour d'une droite. Le BO demande d'exercer son esprit critique sur cette pertinence avant tout calcul.",
          "On regarde si les écarts successifs sont à peu près constants, ou s'ils s'accentuent.",
          affine
            ? `Les écarts successifs restent voisins de $${a}$ : le nuage est bien aligné.`
            : `Les écarts successifs passent de $${ys[1] - ys[0]}$ à $${ys[n - 1] - ys[n - 2]}$ : ils explosent. C'est une croissance exponentielle, pas linéaire.`,
          affine
            ? "L'ajustement affine est pertinent."
            : "L'ajustement affine n'est pas pertinent : une droite passerait à côté de la forme du nuage."
        ),
        choiceDiagnostics: [
          {
            choice: "oui, toujours, quel que soit le nuage",
            cause: "un ajustement affine imposé à un nuage courbe produit des prévisions fausses",
          },
        ],
      };
    },
  },

  /* ═══════════════════ statT_ajust_au_juge ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_au_juge_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_au_juge",
    difficulty: 2,
    theme: "neutral",
    hint: "Une droite d'ajustement passe AU MILIEU du nuage, avec des points de part et d'autre.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 4 });
      const bonne = Math.random() < 0.5;
      const droite = bonne
        ? { a: nuage.a, b: nuage.b }
        : { a: nuage.a, b: nuage.b + pick([18, 22, -20, -25] as const) };
      return {
        text: "La droite tracée constitue-t-elle un ajustement affine acceptable pour ce nuage ?",
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [bonne ? "oui" : "non"],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet} et une droite`, droite),
        explanation: exp(
          "Une droite d'ajustement tracée « au jugé » doit passer au milieu du nuage : les points doivent se répartir de part et d'autre, au plus près.",
          "On regarde si la droite laisse autant de points au-dessus qu'en dessous, et si elle en reste proche.",
          bonne
            ? "La droite traverse le nuage, avec des points de chaque côté : l'ajustement est acceptable."
            : "La droite passe entièrement d'un côté du nuage : elle a la bonne direction, mais elle est décalée.",
          `Cette droite ${bonne ? "convient" : "ne convient pas"} comme ajustement.`
        ),
      };
    },
  },

  /* ═══════════════════ statT_ajust_equation ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_equation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_equation",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux points suffisent : coefficient directeur d'abord, ordonnée à l'origine ensuite.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 2 });
      // On choisit deux points du nuage : la droite passe exactement par eux.
      const i = 0;
      const j = nuage.xs.length - 1;
      const a = (nuage.ys[j] - nuage.ys[i]) / (nuage.xs[j] - nuage.xs[i]);
      const b = nuage.ys[i] - a * nuage.xs[i];
      const ecrire = (p: number, q: number) =>
        `$y = ${fr(Math.round(p * 100) / 100)}x ${q >= 0 ? "+" : "-"} ${fr(Math.abs(Math.round(q * 100) / 100))}$`;
      return {
        text:
          `On ajuste ce nuage par la droite passant par le premier et le dernier point, ` +
          `soit $(${nuage.xs[i]}\\,;\\,${nuage.ys[i]})$ et $(${nuage.xs[j]}\\,;\\,${nuage.ys[j]})$. ` +
          `Quelle est son équation ?`,
        format: "qcm",
        choices: makeChoices(ecrire(a, b), [
          ecrire(b, a),
          ecrire(-a, b),
          ecrire(a, -b),
          ecrire(a + 1, b),
          ecrire(a, b + 5),
        ]),
        expected: [ecrire(a, b)],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, { a, b }),
        explanation: exp(
          "Une droite d'ajustement affine a pour équation $y = ax + b$ : on la détermine à partir de deux points.",
          "On calcule le coefficient directeur avec les deux points, puis l'ordonnée à l'origine en remplaçant dans l'équation.",
          `$a = \\dfrac{${nuage.ys[j]} - ${nuage.ys[i]}}{${nuage.xs[j]} - ${nuage.xs[i]}} = ${fr(Math.round(a * 100) / 100)}$, ` +
            `puis $b = ${nuage.ys[i]} - ${fr(Math.round(a * 100) / 100)} \\times ${nuage.xs[i]} = ${fr(Math.round(b * 100) / 100)}$.`,
          `L'équation est ${ecrire(a, b)}.`
        ),
      };
    },
  },

  /* ═══════════════════ statT_ajust_calculer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_ajust_calculer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "On remplace $x$ par la valeur demandée dans l'équation de la droite.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 2 });
      const a = nuage.a;
      const b = nuage.b;
      const x = randomInt(2, Math.max(...nuage.xs) - 1);
      const y = a * x + b;
      return {
        text:
          `La droite d'ajustement de ce nuage a pour équation $y = ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$. ` +
          `Quelle valeur de « ${nuage.serie.y} » prévoit-elle pour $${nuage.serie.x} = ${x}$ ?`,
        format: "short",
        expected: [String(y)],
        comparator: "number_equal",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, { a, b }, { x }),
        explanation: exp(
          "Une droite d'ajustement sert à estimer une valeur : on remplace $x$ par la valeur voulue dans son équation.",
          "On substitue, puis on calcule. Le résultat est une ESTIMATION, pas la valeur observée.",
          `$y = ${a} \\times ${x} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${y}$.`,
          `La droite prévoit $${y}$ ${nuage.serie.unite}.`
        ),
      };
    },
  },

  /* ═══════════════════ statT_interpoler ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_interpoler_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_interpoler",
    microId: "statT_interpoler",
    difficulty: 2,
    theme: "neutral",
    hint: "Interpoler, c'est estimer une valeur À L'INTÉRIEUR de l'intervalle observé.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 2 });
      const a = nuage.a;
      const b = nuage.b;
      const x = pick([1.5, 2.5, 3.5, 4.5] as const);
      const y = a * x + b;
      return {
        text:
          `La droite d'ajustement a pour équation $y = ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$, ` +
          `et les relevés vont de $${Math.min(...nuage.xs)}$ à $${Math.max(...nuage.xs)}$. ` +
          `Estime « ${nuage.serie.y} » pour $${nuage.serie.x} = ${fr(x)}$.`,
        format: "short",
        expected: [fr(y)],
        comparator: "number_equal",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, { a, b }, { x }),
        explanation: exp(
          "Interpoler, c'est estimer une valeur située à l'INTÉRIEUR de l'intervalle des données observées : l'ajustement y est le plus fiable.",
          "On applique l'équation de la droite à la valeur demandée.",
          `$${fr(x)}$ est bien compris entre $${Math.min(...nuage.xs)}$ et $${Math.max(...nuage.xs)}$. ` +
            `$y = ${a} \\times ${fr(x)} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${fr(y)}$.`,
          `L'estimation est $${fr(y)}$ ${nuage.serie.unite}.`
        ),
      };
    },
  },

  /* ═══════════════════ statT_extrapoler ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_extrapoler_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_interpoler",
    microId: "statT_extrapoler",
    difficulty: 2,
    theme: "neutral",
    hint: "Extrapoler, c'est prolonger AU-DELÀ des données observées.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const nuage = tirerNuage({ croissant: true, bruit: 2 });
      const a = nuage.a;
      const b = nuage.b;
      const xMax = Math.max(...nuage.xs);
      const x = xMax + randomInt(2, 5);
      const y = a * x + b;
      return {
        text:
          `La droite d'ajustement a pour équation $y = ${a}x + ${b}$, et les relevés s'arrêtent à $${nuage.serie.x} = ${xMax}$. ` +
          `Que prévoit le modèle pour $${nuage.serie.x} = ${x}$ ?`,
        format: "short",
        expected: [String(y)],
        comparator: "number_equal",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, { a, b }, { x }),
        explanation: exp(
          "Extrapoler, c'est prolonger le modèle au-delà des valeurs observées. Le calcul est le même que pour une interpolation ; la CONFIANCE, elle, est moindre.",
          "On applique l'équation, puis on garde en tête que rien ne garantit que la tendance se poursuive.",
          `$y = ${a} \\times ${x} + ${b} = ${y}$, alors que les données s'arrêtent à $x = ${xMax}$.`,
          `Le modèle prévoit $${y}$ ${nuage.serie.unite} — sous réserve que la tendance se poursuive.`
        ),
      };
    },
  },

  /* ═══════════════════ statT_limites ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_limites_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_interpoler",
    microId: "statT_limites",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi si la grandeur peut réellement atteindre la valeur prévue.",
    tags: ["stmg", "maths", "statistiques", "canvas", "open", "template"],
    generate: () => {
      const nuage = tirerNuage({ croissant: false, bruit: 2 });
      const a = nuage.a;
      const b = nuage.b;
      const xMax = Math.max(...nuage.xs);
      // On prolonge assez loin pour que la prévision devienne absurde (négative).
      const x = Math.ceil((0 - b) / a) + randomInt(1, 4);
      const y = a * x + b;
      return {
        text:
          `La droite d'ajustement de ce nuage décroissant a pour équation $y = ${a}x + ${b}$, ` +
          `et les relevés s'arrêtent à $${nuage.serie.x} = ${xMax}$. ` +
          `Pour $${nuage.serie.x} = ${x}$, elle prévoit $${y}$ ${nuage.serie.unite}. ` +
          `Que penses-tu de cette prévision ?`,
        format: "open",
        expected: ["negatif", "négatif", "impossible", "absurde", "hors", "au-dela", "au-delà", "limite"],
        comparator: "contains_keyword",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, { a, b }),
        explanation: exp(
          "Une extrapolation prolonge une tendance observée sur un intervalle limité : rien ne garantit qu'elle reste valable au-delà, et le résultat peut devenir impossible.",
          "On confronte la valeur prévue à la réalité de la grandeur : peut-elle être négative ? dépasser un maximum ?",
          `Ici le modèle prévoit $${y}$ ${nuage.serie.unite}, une valeur négative — impossible pour cette grandeur. ` +
            `L'extrapolation porte de plus sur $${x - xMax}$ unités au-delà du dernier relevé.`,
          `Par exemple : « Cette prévision est absurde : elle est négative, ce qui est impossible pour cette grandeur. L'ajustement affine n'est plus valable si loin des données observées. »`
        ),
      };
    },
  },

  /* ═══════════════════ statT_mc_principe ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_mc_principe_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_moindres_carres",
    microId: "statT_mc_principe",
    difficulty: 2,
    theme: "neutral",
    hint: "On minimise la somme des CARRÉS des écarts verticaux entre les points et la droite.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 4 });
      return {
        text: "Que minimise la droite des moindres carrés ?",
        format: "qcm",
        choices: shuffle([
          "la somme des carrés des écarts verticaux entre les points et la droite",
          "la somme des écarts verticaux entre les points et la droite",
          "la distance entre le premier et le dernier point",
          "le nombre de points situés au-dessus de la droite",
        ]),
        expected: ["la somme des carrés des écarts verticaux entre les points et la droite"],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet} et sa droite d'ajustement`, { a: nuage.a, b: nuage.b }),
        explanation: exp(
          "La méthode des moindres carrés cherche la droite d'équation $y = ax + b$ qui rend minimale la somme $\\sum_i \\left(y_i - (ax_i + b)\\right)^2$.",
          "On élève les écarts au carré pour deux raisons : les écarts négatifs ne compensent plus les positifs, et les grands écarts pèsent davantage.",
          "Sans les carrés, une droite très mauvaise pourrait donner une somme nulle — les écarts au-dessus annulant ceux du dessous.",
          "La droite des moindres carrés minimise la somme des carrés des écarts verticaux."
        ),
        choiceDiagnostics: [
          {
            choice: "la somme des écarts verticaux entre les points et la droite",
            cause: "sans les carrés, les écarts de signes contraires se compensent et la somme ne mesure plus rien",
          },
        ],
      };
    },
  },

  /* ═══════════════════ statT_mc_calculer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_mc_calculer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_moindres_carres",
    microId: "statT_mc_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour chaque point : on calcule l'écart à la droite, on l'élève au carré, puis on additionne.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      // Un petit nuage à quatre points, pour que la somme se calcule à la main.
      const serie = pick(SERIES);
      const a = pick([2, 3, 4, 5] as const);
      const b = randomInt(10, 30);
      const xs = [1, 2, 3, 4];
      const ecarts = [randomInt(-2, 2), randomInt(-2, 2), randomInt(-2, 2), randomInt(-2, 2)];
      const ys = xs.map((x, k) => a * x + b + ecarts[k]);
      const nuage: Nuage = { serie, xs, ys, a, b };
      const somme = ecarts.reduce((s, e) => s + e * e, 0);
      return {
        text:
          `Pour la droite d'équation $y = ${a}x + ${b}$, calcule la somme des carrés des écarts ` +
          `$\\sum \\left(y_i - (${a}x_i + ${b})\\right)^2$ sur les quatre points du nuage.`,
        format: "short",
        expected: [String(somme)],
        comparator: "number_equal",
        canvas: canvasTableauNuage(nuage, `${serie.sujet} — quatre relevés`),
        explanation: exp(
          "La somme des carrés des écarts mesure la qualité d'un ajustement : plus elle est petite, mieux la droite épouse le nuage.",
          "Pour chaque point, on calcule la valeur prévue par la droite, l'écart avec la valeur observée, puis son carré ; on additionne le tout.",
          xs
            .map(
              (x, k) =>
                `$x = ${x}$ : prévu $${a * x + b}$, observé $${ys[k]}$, écart $${ecarts[k]}$, carré $${ecarts[k] * ecarts[k]}$`
            )
            .join(" ; ") + `. Somme : $${somme}$.`,
          `La somme des carrés des écarts vaut $${somme}$.`
        ),
      };
    },
  },

  /* ═══════════════════ statT_mc_comparer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_mc_comparer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_moindres_carres",
    microId: "statT_mc_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "La meilleure droite est celle dont la somme des carrés des écarts est la PLUS PETITE.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const serie = pick(SERIES);
      const a = pick([3, 4, 5, 6] as const);
      const b = randomInt(10, 30);
      const xs = [1, 2, 3, 4, 5];
      const ecarts = xs.map(() => randomInt(-2, 2));
      const ys = xs.map((x, k) => a * x + b + ecarts[k]);
      const nuage: Nuage = { serie, xs, ys, a, b };
      const sommeA = ecarts.reduce((s, e) => s + e * e, 0);
      const decalage = pick([3, 4, 5] as const);
      const sommeB = xs.reduce((s, x, k) => {
        const e = ys[k] - (a * x + b + decalage);
        return s + e * e;
      }, 0);
      return {
        text:
          `Deux droites sont proposées pour ce nuage : $D_1 : y = ${a}x + ${b}$ et $D_2 : y = ${a}x + ${b + decalage}$. ` +
          `Laquelle ajuste le mieux le nuage ?`,
        format: "qcm",
        choices: shuffle([
          `$D_1$, dont la somme des carrés des écarts vaut $${sommeA}$`,
          `$D_2$, dont la somme des carrés des écarts vaut $${sommeB}$`,
          "les deux ajustent aussi bien",
          "on ne peut pas comparer deux droites parallèles",
        ]),
        expected: [`$D_1$, dont la somme des carrés des écarts vaut $${sommeA}$`],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${serie.sujet} — deux ajustements possibles`, { a, b }),
        explanation: exp(
          "Comparer deux ajustements, c'est comparer leurs sommes de carrés d'écarts : la plus petite désigne le meilleur.",
          "On calcule la somme pour chaque droite, puis on compare — les deux droites étant parallèles, seule leur hauteur diffère.",
          `$D_1$ donne $${sommeA}$ ; $D_2$, décalée de $${decalage}$ vers le haut, donne $${sommeB}$.`,
          `C'est $D_1$ qui ajuste le mieux le nuage.`
        ),
        choiceDiagnostics: [
          {
            choice: "on ne peut pas comparer deux droites parallèles",
            cause: "deux droites parallèles n'ont pas la même hauteur : leurs écarts au nuage diffèrent",
          },
        ],
      };
    },
  },

  /* ═══════════════════ statT_cv_appliquer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_cv_appliquer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_changement_variable",
    microId: "statT_cv_appliquer",
    difficulty: 3,
    theme: "neutral",
    hint: "On applique la transformation à CHAQUE valeur de la variable concernée.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const serie = pick(SERIES);
      const xs = [1, 2, 3, 4, 5];
      const base = pick([2, 3, 4, 5] as const);
      const ys = xs.map((x) => Math.pow(base, x));
      const nuage: Nuage = { serie, xs, ys, a: 0, b: 0 };
      const k = randomInt(0, 4);
      const z = Math.log10(ys[k]);
      return {
        text:
          `Le nuage n'est pas linéaire. On pose $z = \\log(y)$ pour le linéariser. ` +
          `Quelle est la valeur de $z$ pour $x = ${xs[k]}$ ? (arrondi au centième)`,
        format: "short",
        expected: [fr(Math.round(z * 100) / 100)],
        comparator: "number_equal",
        canvas: canvasTableauNuage(nuage, `${serie.sujet} — données brutes`),
        explanation: exp(
          "Un changement de variable transforme un nuage courbe en un nuage aligné, sur lequel l'ajustement affine redevient pertinent.",
          "On applique la transformation demandée à chaque valeur : ici, le logarithme décimal des ordonnées.",
          `Pour $x = ${xs[k]}$, on a $y = ${ys[k]}$, donc $z = \\log(${ys[k]}) \\approx ${fr(Math.round(z * 100) / 100)}$.`,
          `$z \\approx ${fr(Math.round(z * 100) / 100)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ statT_cv_lire ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_cv_lire_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_changement_variable",
    microId: "statT_cv_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Si le nuage transformé est aligné, la relation entre les variables initiales n'était pas affine.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const serie = pick(SERIES);
      const xs = [1, 2, 3, 4, 5, 6];
      const base = pick([1.5, 2, 2.5, 3] as const);
      const c = pick([10, 20, 40] as const);
      const zs = xs.map((x) => Math.round(Math.log10(c * Math.pow(base, x)) * 100) / 100);
      const nuage: Nuage = { serie, xs, ys: zs, a: 0, b: 0 };
      return {
        text:
          `Après le changement de variable $z = \\log(y)$, le nuage $(x\\,;\\,z)$ apparaît aligné. ` +
          `Que peut-on en conclure sur la relation entre $x$ et $y$ ?`,
        format: "qcm",
        choices: shuffle([
          "la relation entre $x$ et $y$ est exponentielle",
          "la relation entre $x$ et $y$ est affine",
          "la relation entre $x$ et $y$ est inverse",
          "il n'y a aucune relation entre $x$ et $y$",
        ]),
        expected: ["la relation entre $x$ et $y$ est exponentielle"],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `Nuage transformé (x ; z) avec z = log(y)`),
        explanation: exp(
          "Un nuage $(x\\,;\\,\\log y)$ aligné signifie que $\\log y$ est une fonction affine de $x$, donc que $y$ est une fonction exponentielle de $x$.",
          "On lit l'alignement sur le nuage transformé, puis on remonte à la relation initiale.",
          `Si $\\log(y) = ax + b$, alors $y = 10^{ax + b}$, c'est-à-dire une exponentielle de base $10^a$.`,
          "La relation entre $x$ et $y$ est exponentielle."
        ),
        choiceDiagnostics: [
          {
            choice: "la relation entre $x$ et $y$ est affine",
            cause: "c'est la relation entre x et z = log(y) qui est affine, pas celle entre x et y",
          },
        ],
      };
    },
  },

  /* ═══════════════════ statT_cv_revenir ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_cv_revenir_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_changement_variable",
    microId: "statT_cv_revenir",
    difficulty: 3,
    theme: "neutral",
    hint: "Si $z = \\log(y)$ et $z = ax + b$, alors $y = 10^{ax+b}$.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const serie = pick(SERIES);
      const a = pick([0.1, 0.2, 0.25, 0.3, 0.5] as const);
      const b = pick([1, 1.5, 2, 2.5] as const);
      const x = randomInt(2, 8);
      const z = a * x + b;
      const y = Math.pow(10, z);
      const xs = [1, 2, 3, 4, 5];
      const zs = xs.map((v) => Math.round((a * v + b) * 100) / 100);
      const nuage: Nuage = { serie, xs, ys: zs, a, b };
      return {
        text:
          `Après le changement de variable $z = \\log(y)$, l'ajustement donne $z = ${fr(a)}x + ${fr(b)}$. ` +
          `Quelle valeur de $y$ le modèle prévoit-il pour $x = ${x}$ ? (arrondi à l'unité)`,
        format: "short",
        expected: [fr(Math.round(y))],
        comparator: "number_equal",
        canvas: canvasNuage(nuage, `Nuage transformé (x ; z) et son ajustement`, { a, b }),
        explanation: exp(
          "Revenir à la variable initiale, c'est défaire la transformation : de $z = \\log(y)$ on tire $y = 10^{z}$.",
          "On calcule d'abord $z$ avec l'ajustement, puis on remonte à $y$ par la puissance de dix.",
          `$z = ${fr(a)} \\times ${x} + ${fr(b)} = ${fr(Math.round(z * 100) / 100)}$, donc ` +
            `$y = 10^{${fr(Math.round(z * 100) / 100)}} \\approx ${fr(Math.round(y))}$.`,
          `Le modèle prévoit environ $${fr(Math.round(y))}$ ${serie.unite}.`
        ),
      };
    },
  },
];
