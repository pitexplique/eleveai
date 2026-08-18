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

/** « 1 unité », « 3 unités » — l'accord ne se fait pas tout seul dans un gabarit. */
function unites(n: number): string {
  return n > 1 ? "unités" : "unité";
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
          `Pour « ${nuage.serie.x} » $= ${nuage.xs[k]}$, on relève « ${nuage.serie.y} » $= ${nuage.ys[k]}$ ${nuage.serie.unite}.`,
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

  {
    // ANGLE 2 — CONTRÔLER un report, au lieu d'en faire un. Le premier item
    // donne le tableau et demande les coordonnées ; celui-ci donne les relevés
    // dans l'énoncé et le nuage sur la figure, avec un point mal placé. Placer
    // un point et vérifier qu'il l'est bien ne sont pas le même geste — et
    // c'est le second qu'on fait devant un graphique qu'on n'a pas tracé.
    kind: "template",
    id: "stmg_stat_nuage_representer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_nuage",
    microId: "statT_nuage_representer",
    difficulty: 3,
    theme: "neutral",
    hint: "Reprends les relevés un par un et compare chaque ordonnée à la hauteur du point correspondant.",
    tags: ["stmg", "maths", "statistiques", "canvas", "piege", "template", "short"],
    generate: () => {
      // Les relevés sont ÉCRITS EN TOUTES LETTRES dans l'énoncé : une valeur
      // nulle ou négative — un chiffre d'affaires à $-15$ — s'y verrait, alors
      // qu'elle passe inaperçue dans un nuage. On retire donc les tirages où la
      // droite descend sous zéro.
      let nuage = tirerNuage({ bruit: 2 });
      for (let essai = 0; essai < 40; essai++) {
        if (Math.min(...nuage.ys) > 4) break;
        nuage = tirerNuage({ bruit: 2 });
      }
      const k = randomInt(0, nuage.xs.length - 1);
      // L'écart doit SE VOIR : un point décalé de 2 se confondrait avec la
      // dispersion normale du nuage, et la question n'aurait pas de réponse.
      const ecart = pick([12, 14, 16, -12, -14, -16] as const);
      const yFaux = Math.max(2, nuage.ys[k] + ecart);
      const ysAffiches = nuage.ys.map((y, i) => (i === k ? yFaux : y));
      const releves = nuage.xs
        .map((x, i) => `$${x} \\rightarrow ${nuage.ys[i]}$`)
        .join(" ; ");
      return {
        text:
          `Voici les relevés de ${nuage.serie.sujet} — ${nuage.serie.x}, puis ${nuage.serie.y} : ` +
          `${releves}. ` +
          `Un point a été mal reporté sur le nuage. Pour quelle valeur de « ${nuage.serie.x} » ?`,
        format: "short",
        expected: [String(nuage.xs[k])],
        comparator: "number_equal",
        canvas: canvasNuage({ ...nuage, ys: ysAffiches }, `${nuage.serie.sujet} — report à vérifier`),
        explanation: exp(
          "Un nuage de points est la traduction exacte d'un tableau : à chaque couple $(x_i\\,;\\,y_i)$ correspond un point, et un seul.",
          "On parcourt les relevés dans l'ordre et l'on compare, pour chaque abscisse, l'ordonnée annoncée à celle du point tracé.",
          `Pour « ${nuage.serie.x} » $= ${nuage.xs[k]}$, le relevé donne $${nuage.ys[k]}$ alors que le point est tracé à $${yFaux}$ : ` +
            `un écart de $${Math.abs(yFaux - nuage.ys[k])}$. Tous les autres points sont à leur place.`,
          `Le point mal reporté est celui d'abscisse $${nuage.xs[k]}$.`
        ),
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
          `quelle est la valeur de « ${nuage.serie.y} » pour « ${nuage.serie.x} » $= ${nuage.xs[k]}$ ?`,
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

  {
    // ANGLE 2 — la lecture À L'ENVERS : on donne l'ordonnée, on cherche
    // l'abscisse. Le premier item descend du tableau vers le graphique ; celui-ci
    // remonte. C'est la lecture qu'on fait devant un objectif (« à partir de
    // quand atteint-on ce chiffre ? ») et elle se rate quand on a pris
    // l'habitude d'entrer par l'axe horizontal.
    kind: "template",
    id: "stmg_stat_nuage_lire_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_nuage",
    microId: "statT_nuage_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Cette fois on part de l'axe VERTICAL : on repère la hauteur, on va jusqu'au point, puis on descend lire son abscisse.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      // Les ordonnées doivent être deux à deux distinctes : sinon la valeur
      // cherchée désigne deux points, et la question a deux réponses.
      let nuage = tirerNuage();
      for (let essai = 0; essai < 40; essai++) {
        if (new Set(nuage.ys).size === nuage.ys.length) break;
        nuage = tirerNuage();
      }
      const k = randomInt(0, nuage.xs.length - 1);
      return {
        text:
          `Sur ce nuage décrivant ${nuage.serie.sujet}, ` +
          `pour quelle valeur de « ${nuage.serie.x} » relève-t-on ` +
          `« ${nuage.serie.y} » $= ${nuage.ys[k]}$ ${nuage.serie.unite} ?`,
        format: "short",
        expected: [String(nuage.xs[k])],
        comparator: "number_equal",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, undefined, { y: nuage.ys[k] }),
        explanation: exp(
          "Un point du nuage se lit dans les deux sens : son abscisse donne la première variable, son ordonnée la seconde. Rien n'oblige à entrer par l'abscisse.",
          "On repère la valeur sur l'axe vertical, on avance horizontalement jusqu'au point du nuage, puis on descend lire son abscisse.",
          `La hauteur $${nuage.ys[k]}$ n'est atteinte que par un seul point, celui d'abscisse $${nuage.xs[k]}$.`,
          `C'est pour « ${nuage.serie.x} » $= ${nuage.xs[k]}$.`
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

  {
    // ANGLE 2 — INTERPRÉTER la tendance dans la situation, au lieu de la
    // nommer. Le premier item demande « croissante ou décroissante ? » ; celui-ci
    // demande ce que cela veut dire pour l'entreprise. Le BO insiste sur
    // l'esprit critique : d'où le distracteur de la CAUSALITÉ, qui est
    // l'erreur d'interprétation la plus coûteuse — un nuage qui monte ne dit
    // jamais que l'une des variables cause l'autre.
    kind: "template",
    id: "stmg_stat_nuage_tendance_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_nuage",
    microId: "statT_nuage_tendance",
    difficulty: 3,
    theme: "neutral",
    hint: "Une tendance décrit ce qui va ENSEMBLE, elle ne dit pas ce qui cause quoi.",
    tags: ["stmg", "maths", "statistiques", "canvas", "piege", "template"],
    generate: () => {
      const croissant = Math.random() < 0.5;
      const nuage = tirerNuage({ croissant });
      const s = nuage.serie;
      const bonne =
        `quand « ${s.x} » augmente, « ${s.y} » a tendance à ${croissant ? "augmenter" : "diminuer"}`;
      return {
        text: `Que peut-on dire de ce nuage décrivant ${s.sujet} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `quand « ${s.x} » augmente, « ${s.y} » a tendance à ${croissant ? "diminuer" : "augmenter"}`,
          `« ${s.x} » est la CAUSE de l'évolution de « ${s.y} »`,
          `« ${s.y} » ne dépend pas du tout de « ${s.x} »`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${s.sujet}`),
        explanation: exp(
          "La tendance d'un nuage décrit comment les deux variables ÉVOLUENT ENSEMBLE. Elle ne dit rien de ce qui cause quoi : deux grandeurs peuvent varier de concert sans lien de cause à effet.",
          "On décrit le sens de variation observé, puis on s'interdit d'en tirer une cause : c'est l'esprit critique que le programme demande.",
          `Les points ${croissant ? "montent" : "descendent"} globalement : « ${s.y} » passe de $${nuage.ys[0]}$ à ` +
            `$${nuage.ys[nuage.ys.length - 1]}$ ${s.unite} quand « ${s.x} » va de $${nuage.xs[0]}$ à $${nuage.xs[nuage.xs.length - 1]}$.`,
          `Le nuage montre que « ${s.y} » ${croissant ? "augmente" : "diminue"} avec « ${s.x} » — sans qu'on puisse en conclure une cause.`
        ),
        choiceDiagnostics: [
          {
            choice: `« ${s.x} » est la CAUSE de l'évolution de « ${s.y} »`,
            cause: "une tendance n'établit jamais une causalité : elle constate que les deux varient ensemble",
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

  {
    // ANGLE 2 — trancher sur les NOMBRES, sans le nuage. Le premier item met
    // le graphique sous les yeux ; celui-ci ne donne que le tableau, et il faut
    // regarder les écarts successifs. C'est la version qui survit quand aucun
    // graphique n'est fourni — le cas d'un tableur — et elle explique POURQUOI
    // l'œil disait oui ou non.
    kind: "template",
    id: "stmg_stat_pertinence_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_pertinence",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule les écarts entre deux relevés consécutifs : constants, la relation est affine ; multipliés, elle ne l'est pas.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const affine = Math.random() < 0.5;
      const serie = pick(SERIES);
      const n = 6;
      const xs = Array.from({ length: n }, (_, k) => k + 1);
      // ⚠️ LE BRUIT DOIT RESTER PETIT DEVANT LA PENTE. Avec des écarts de $5$ à
      // $8$, répondre « ils restent voisins » demande une indulgence que
      // l'élève n'a aucune raison d'avoir : la question devient un pari. Une
      // pente d'au moins $6$ et un bruit de $\pm 1$ tiennent les écarts dans un
      // rapport inférieur à $2$, quand le cas exponentiel les multiplie par
      // plus de $5$. L'écart entre les deux situations doit être franc.
      const a = pick([6, 8, 10] as const);
      const b = randomInt(20, 40);
      const ys = affine
        ? xs.map((x) => a * x + b + randomInt(-1, 1))
        : xs.map((x) => Math.round(b * Math.pow(1.5, x - 1)));
      const nuage: Nuage = { serie, xs, ys, a, b };
      const ecarts = ys.slice(1).map((y, k) => y - ys[k]);
      const bonne = affine
        ? "les écarts restent voisins les uns des autres : un ajustement affine convient"
        : "les écarts grossissent d'un relevé à l'autre : un ajustement affine ne convient pas";
      return {
        text:
          `Voici les relevés de ${serie.sujet}. Les écarts entre deux relevés consécutifs valent ` +
          `${ecarts.map((e) => `$${e}$`).join(", ")}. Qu'en conclure ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          affine
            ? "les écarts grossissent d'un relevé à l'autre : un ajustement affine ne convient pas"
            : "les écarts restent voisins les uns des autres : un ajustement affine convient",
          "les écarts ne disent rien de la pertinence d'un ajustement affine",
          "il faudrait le nuage : un tableau ne permet pas d'en juger",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableauNuage(nuage, `${serie.sujet} — relevés`),
        explanation: exp(
          "Une relation affine ajoute toujours la MÊME quantité quand $x$ augmente de $1$ : ses écarts successifs sont constants. Une relation exponentielle, elle, MULTIPLIE : ses écarts grossissent.",
          "On calcule les différences entre relevés consécutifs, et l'on regarde si elles restent du même ordre.",
          affine
            ? `Les écarts vont de $${Math.min(...ecarts)}$ à $${Math.max(...ecarts)}$ : ils tournent autour de $${a}$, ` +
              `la dispersion est celle des relevés, pas de la forme.`
            : `Le premier écart vaut $${ecarts[0]}$ et le dernier $${ecarts[ecarts.length - 1]}$, ` +
              `soit environ $${Math.round((ecarts[ecarts.length - 1] / ecarts[0]) * 10) / 10}$ fois plus : la croissance s'emballe.`,
          affine
            ? "L'ajustement affine est pertinent."
            : "L'ajustement affine n'est pas pertinent : il faudrait d'abord linéariser."
        ),
        choiceDiagnostics: [
          {
            choice: "il faudrait le nuage : un tableau ne permet pas d'en juger",
            cause: "les écarts successifs suffisent : le graphique rend la chose visible, il ne l'invente pas",
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

  {
    // ANGLE 2 — CORRIGER la droite, au lieu de la juger. Le premier item ne
    // laisse que « oui » ou « non » — deux propositions, donc une chance sur
    // deux au hasard. Celui-ci part d'une droite décalée et demande QUOI
    // changer dans son équation : la réponse sépare le coefficient directeur,
    // qui donne la direction, de l'ordonnée à l'origine, qui donne la hauteur.
    kind: "template",
    id: "stmg_stat_au_juge_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_au_juge",
    difficulty: 3,
    theme: "neutral",
    hint: "La direction, c'est $a$ ; la hauteur, c'est $b$. Une droite parallèle au nuage n'a qu'un défaut de hauteur.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 3 });
      const decalage = pick([16, 20, 24, -16, -20, -24] as const);
      const droite = { a: nuage.a, b: nuage.b + decalage };
      const trop = decalage > 0 ? "haute" : "basse";
      const bonne =
        `${decalage > 0 ? "diminuer" : "augmenter"} l'ordonnée à l'origine $b$, sans toucher au coefficient directeur`;
      return {
        text:
          `La droite tracée suit bien la direction du nuage, mais elle passe entièrement ` +
          `${decalage > 0 ? "au-dessus" : "en dessous"} des points — elle est trop ${trop}. ` +
          `Que faut-il modifier dans son équation $y = ${nuage.a}x ${droite.b >= 0 ? "+" : "-"} ${Math.abs(droite.b)}$ ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${decalage > 0 ? "augmenter" : "diminuer"} l'ordonnée à l'origine $b$`,
          "changer le coefficient directeur $a$ : c'est lui qui règle la hauteur",
          "rien : une droite parallèle au nuage est toujours un bon ajustement",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet} et une droite mal placée`, droite),
        explanation: exp(
          "Dans $y = ax + b$, le coefficient directeur $a$ donne la DIRECTION de la droite, et l'ordonnée à l'origine $b$ sa HAUTEUR. Les deux se règlent séparément.",
          "On regarde d'abord si la droite suit la pente du nuage : si oui, seul $b$ est en cause, et on le déplace du côté du nuage.",
          `La droite est parallèle au nuage — même $a = ${nuage.a}$ — mais décalée de $${Math.abs(decalage)}$ vers le ${decalage > 0 ? "haut" : "bas"}. ` +
            `En ramenant $b$ de $${droite.b}$ vers $${nuage.b}$, elle retraverse le nuage.`,
          `Il faut ${decalage > 0 ? "diminuer" : "augmenter"} $b$, et laisser $a$ tel quel.`
        ),
        choiceDiagnostics: [
          {
            choice: "changer le coefficient directeur $a$ : c'est lui qui règle la hauteur",
            cause: "le coefficient directeur règle la pente, pas la hauteur — la droite a déjà la bonne pente",
          },
          {
            choice: "rien : une droite parallèle au nuage est toujours un bon ajustement",
            cause: "parallèle ne suffit pas : une droite d'ajustement doit passer AU MILIEU des points",
          },
        ],
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

  {
    // ANGLE 2 — ce que le coefficient directeur VEUT DIRE, au lieu de le
    // calculer. Le premier item fait trouver l'équation ; celui-ci la donne et
    // demande de la lire dans la situation. C'est ce qui reste d'un ajustement
    // une fois l'exercice fini — « on gagne 5 k€ par année de plus » —, et le
    // distracteur multiplicatif est le pont avec le chapitre des évolutions :
    // un ajustement affine AJOUTE, il ne multiplie pas.
    kind: "template",
    id: "stmg_stat_equation_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_equation",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient directeur dit de combien $y$ bouge quand $x$ avance d'UNE unité.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 2 });
      const a = nuage.a;
      const b = nuage.b;
      const s = nuage.serie;
      const bonne =
        `« ${s.y} » ${a > 0 ? "augmente" : "diminue"} d'environ $${Math.abs(a)}$ ${s.unite} ` +
        `chaque fois que « ${s.x} » augmente de $1$`;
      return {
        text:
          `La droite d'ajustement de ce nuage a pour équation $y = ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$. ` +
          `Que signifie le coefficient $${a}$ dans cette situation ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `« ${s.y} » est multiplié par $${a}$ chaque fois que « ${s.x} » augmente de $1$`,
          `« ${s.y} » vaut $${a}$ ${s.unite} quand « ${s.x} » vaut $0$`,
          `« ${s.y} » vaut $${a}$ ${s.unite} en moyenne sur la période`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${s.sujet}`, { a, b }),
        explanation: exp(
          "Dans un ajustement affine $y = ax + b$, le coefficient directeur $a$ est la variation de $y$ pour une augmentation d'UNE unité de $x$ — une variation ABSOLUE, qui s'ajoute.",
          "On fait avancer $x$ d'une unité et l'on regarde ce que devient $y$ : la différence vaut toujours $a$.",
          `Pour $x$ puis $x + 1$ : $a(x+1) + b - (ax + b) = ${a}$. ` +
            `« ${s.y} » ${a > 0 ? "gagne" : "perd"} donc $${Math.abs(a)}$ ${s.unite} par unité de « ${s.x} ». ` +
            `L'ordonnée à l'origine, elle, vaut $${b}$ : c'est la valeur estimée en $x = 0$.`,
          `Le coefficient $${a}$ dit que « ${s.y} » ${a > 0 ? "augmente" : "diminue"} de $${Math.abs(a)}$ ${s.unite} par unité.`
        ),
        choiceDiagnostics: [
          {
            choice: `« ${s.y} » est multiplié par $${a}$ chaque fois que « ${s.x} » augmente de $1$`,
            cause: "confond une évolution qui s'AJOUTE (modèle affine) avec une évolution qui MULTIPLIE (modèle exponentiel)",
          },
          {
            choice: `« ${s.y} » vaut $${a}$ ${s.unite} quand « ${s.x} » vaut $0$`,
            cause: `c'est le rôle de l'ordonnée à l'origine, qui vaut ici $${b}$`,
          },
        ],
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
          `Quelle valeur de « ${nuage.serie.y} » prévoit-elle pour « ${nuage.serie.x} » $= ${x}$ ?`,
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

  {
    // ANGLE 2 — remonter la droite au lieu de la descendre. Le premier item
    // donne $x$ et fait calculer $y$ ; celui-ci donne l'objectif et fait
    // chercher QUAND il sera atteint. C'est une équation à résoudre, pas une
    // substitution — et c'est la question que pose un tableau de bord.
    kind: "template",
    id: "stmg_stat_ajust_calculer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Il ne s'agit plus de remplacer $x$ : il faut résoudre $ax + b = $ la valeur visée.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      // On part d'un $x$ entier pour que la valeur visée tombe juste : la
      // question porte sur la méthode, pas sur un arrondi.
      const nuage = tirerNuage({ croissant: true, bruit: 2 });
      const a = nuage.a;
      const b = nuage.b;
      const x = randomInt(2, Math.max(...nuage.xs) + 3);
      const cible = a * x + b;
      return {
        text:
          `La droite d'ajustement de ce nuage a pour équation $y = ${a}x + ${b}$. ` +
          `Pour quelle valeur de « ${nuage.serie.x} » le modèle prévoit-il ` +
          `« ${nuage.serie.y} » $= ${cible}$ ${nuage.serie.unite} ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, { a, b }, { y: cible }),
        explanation: exp(
          "Une droite d'ajustement se lit dans les deux sens : donnée une valeur de $x$ elle prévoit $y$, et donnée une valeur visée de $y$ elle indique le $x$ correspondant.",
          "On écrit l'équation $ax + b = $ valeur visée, puis on la résout : on retire $b$ des deux côtés, et l'on divise par $a$.",
          `$${a}x + ${b} = ${cible}$, donc $${a}x = ${cible - b}$, donc $x = \\dfrac{${cible - b}}{${a}} = ${x}$.`,
          `Le modèle atteint $${cible}$ ${nuage.serie.unite} pour ${nuage.serie.x} $= ${x}$.`
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
          `Estime « ${nuage.serie.y} » pour « ${nuage.serie.x} » $= ${fr(x)}$.`,
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

  {
    // ANGLE 2 — NOMMER l'estimation avant de la faire. Le premier item calcule
    // une interpolation ; celui-ci demande, parmi quatre estimations, laquelle
    // en est une. Aucun calcul : seule compte la position par rapport à
    // l'intervalle observé — et c'est ce tri-là qui décide de la confiance
    // qu'on accorde au résultat.
    kind: "template",
    id: "stmg_stat_interpoler_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_interpoler",
    microId: "statT_interpoler",
    difficulty: 2,
    theme: "neutral",
    hint: "Interpoler, c'est rester ENTRE le premier et le dernier relevé. Tout le reste est une extrapolation.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 2 });
      const xMin = Math.min(...nuage.xs);
      const xMax = Math.max(...nuage.xs);
      const dedans = pick([1.5, 2.5, 3.5, 4.5] as const);
      const s = nuage.serie;
      const bonne = `« ${s.x} » $= ${fr(dedans)}$`;
      return {
        text:
          `Les relevés vont de « ${s.x} » $= ${xMin}$ à « ${s.x} » $= ${xMax}$. ` +
          `Parmi ces quatre estimations, laquelle est une INTERPOLATION ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `« ${s.x} » $= ${xMax + 2}$`,
          `« ${s.x} » $= ${xMax + 6}$`,
          `« ${s.x} » $= 0$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${s.sujet} — relevés de ${xMin} à ${xMax}`, { a: nuage.a, b: nuage.b }),
        explanation: exp(
          "Interpoler, c'est estimer une valeur SITUÉE ENTRE les données observées ; extrapoler, c'est prolonger au-delà — avant le premier relevé comme après le dernier.",
          "On compare la valeur demandée aux bornes de l'intervalle observé, sans rien calculer.",
          `L'intervalle observé va de $${xMin}$ à $${xMax}$. ` +
            `Seul $${fr(dedans)}$ s'y trouve ; $${xMax + 2}$ et $${xMax + 6}$ sont au-delà du dernier relevé, et $0$ en deçà du premier.`,
          `L'interpolation est celle en « ${s.x} » $= ${fr(dedans)}$ — c'est aussi la plus fiable des quatre.`
        ),
        choiceDiagnostics: [
          {
            choice: `« ${s.x} » $= 0$`,
            cause: "avant le premier relevé, on extrapole aussi : l'extrapolation n'est pas seulement « plus loin »",
          },
        ],
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
          `La droite d'ajustement a pour équation $y = ${a}x + ${b}$, et les relevés s'arrêtent à « ${nuage.serie.x} » $= ${xMax}$. ` +
          `Que prévoit le modèle pour « ${nuage.serie.x} » $= ${x}$ ?`,
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

  {
    // ANGLE 2 — l'extrapolation AU SEUIL. Le premier item demande la valeur
    // prévue pour un rang donné ; celui-ci demande à partir de quel rang un
    // objectif sera franchi. C'est une inéquation, et c'est la forme sous
    // laquelle une extrapolation sert vraiment : « quand aurons-nous dépassé
    // ce chiffre ? »
    kind: "template",
    id: "stmg_stat_extrapoler_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_interpoler",
    microId: "statT_extrapoler",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le premier rang ENTIER pour lequel la droite dépasse le seuil : résous, puis arrondis au-dessus.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const nuage = tirerNuage({ croissant: true, bruit: 2 });
      const a = nuage.a;
      const b = nuage.b;
      const xMax = Math.max(...nuage.xs);
      const x = xMax + randomInt(2, 6);
      // Seuil placé juste sous la valeur atteinte en x : le premier rang qui le
      // dépasse est donc exactement x (vrai dès que a > 1, ce qui est le cas).
      const seuil = a * x + b - 1;
      return {
        text:
          `La droite d'ajustement a pour équation $y = ${a}x + ${b}$, et les relevés s'arrêtent à ` +
          `« ${nuage.serie.x} » $= ${xMax}$. À partir de quelle valeur ENTIÈRE de « ${nuage.serie.x} » ` +
          `le modèle prévoit-il de dépasser $${seuil}$ ${nuage.serie.unite} ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, { a, b }, { y: seuil }),
        explanation: exp(
          "Chercher à partir de quand un seuil est franchi, c'est résoudre une inéquation : $ax + b > s$. Comme la variable compte des rangs, la réponse est le premier ENTIER qui convient.",
          "On résout l'inéquation, puis on prend l'entier immédiatement supérieur au résultat — et l'on note de combien on dépasse le dernier relevé.",
          `$${a}x + ${b} > ${seuil}$ donne $x > \\dfrac{${seuil - b}}{${a}}$, soit $x > ${fr(Math.round(((seuil - b) / a) * 100) / 100)}$. ` +
            `Le premier entier qui convient est $${x}$ — soit $${x - xMax}$ ${unites(x - xMax)} au-delà du dernier relevé.`,
          `Le seuil est dépassé à partir de ${nuage.serie.x} $= ${x}$, sous réserve que la tendance se poursuive.`
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
          `et les relevés s'arrêtent à « ${nuage.serie.x} » $= ${xMax}$. ` +
          `Pour « ${nuage.serie.x} » $= ${x}$, elle prévoit $${y}$ ${nuage.serie.unite}. ` +
          `Que penses-tu de cette prévision ?`,
        format: "open",
        expected: ["negatif", "négatif", "impossible", "absurde", "hors", "au-dela", "au-delà", "limite"],
        comparator: "contains_keyword",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, { a, b }),
        explanation: exp(
          "Une extrapolation prolonge une tendance observée sur un intervalle limité : rien ne garantit qu'elle reste valable au-delà, et le résultat peut devenir impossible.",
          "On confronte la valeur prévue à la réalité de la grandeur : peut-elle être négative ? dépasser un maximum ?",
          `Ici le modèle prévoit $${y}$ ${nuage.serie.unite}, une valeur négative — impossible pour cette grandeur. ` +
            `L'extrapolation porte de plus sur $${x - xMax}$ ${unites(x - xMax)} au-delà du dernier relevé.`,
          `Par exemple : « Cette prévision est absurde : elle est négative, ce qui est impossible pour cette grandeur. L'ajustement affine n'est plus valable si loin des données observées. »`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la même critique, mais À CHOISIR au lieu de la rédiger. Le
    // premier item est une question ouverte, jugée par mots-clés : robuste
    // quand l'élève écrit, muet quand il ne sait pas par où commencer. Celui-ci
    // met les quatre critiques possibles côte à côte, dont une seule tient.
    //
    // Les deux se complètent : l'ouverte fait produire, le QCM fait trier.
    kind: "template",
    id: "stmg_stat_limites_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_interpoler",
    microId: "statT_limites",
    difficulty: 3,
    theme: "neutral",
    hint: "Une prévision se juge d'abord sur ce qu'elle annonce : la grandeur peut-elle réellement valoir cela ?",
    tags: ["stmg", "maths", "statistiques", "canvas", "piege", "template"],
    generate: () => {
      const nuage = tirerNuage({ croissant: false, bruit: 2 });
      const a = nuage.a;
      const b = nuage.b;
      const xMax = Math.max(...nuage.xs);
      const x = Math.ceil((0 - b) / a) + randomInt(1, 4);
      const y = a * x + b;
      const bonne = `elle annonce $${y}$ ${nuage.serie.unite}, une valeur NÉGATIVE — impossible pour cette grandeur`;
      return {
        text:
          `La droite d'ajustement de ce nuage décroissant a pour équation $y = ${a}x + ${b}$, ` +
          `et les relevés s'arrêtent à « ${nuage.serie.x} » $= ${xMax}$. ` +
          `Pour « ${nuage.serie.x} » $= ${x}$, elle prévoit $${y}$ ${nuage.serie.unite}. ` +
          `Pourquoi faut-il rejeter cette prévision ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "le calcul est faux : en refaisant la substitution, on trouve une valeur positive",
          `elle porte $${x - xMax}$ ${unites(x - xMax)} au-delà du dernier relevé, mais la valeur annoncée reste plausible`,
          "une droite d'ajustement ne sert jamais à faire des prévisions",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, { a, b }),
        explanation: exp(
          "Un ajustement affine décrit une tendance observée sur un intervalle limité. Prolongé assez loin, il finit par annoncer des valeurs que la grandeur ne peut pas prendre — le modèle a cessé d'être valable bien avant.",
          "On confronte la valeur prévue à la réalité de la grandeur : peut-elle être négative ? dépasser un maximum ? Puis on regarde de combien on s'est éloigné des données.",
          `$y = ${a} \\times ${x} + ${b} = ${y}$ : le calcul est juste, mais $${nuage.serie.y}$ ne peut pas être négatif. ` +
            `L'extrapolation porte de plus sur $${x - xMax}$ ${unites(x - xMax)} au-delà du dernier relevé.`,
          `On rejette la prévision parce qu'elle est impossible, pas parce qu'elle est mal calculée.`
        ),
        choiceDiagnostics: [
          {
            choice: "le calcul est faux : en refaisant la substitution, on trouve une valeur positive",
            cause: "le calcul est juste — c'est le MODÈLE qui ne vaut plus si loin des données",
          },
          {
            choice: "une droite d'ajustement ne sert jamais à faire des prévisions",
            cause: "elle en fait de très bonnes à l'intérieur des données observées : c'est le prolongement lointain qui pose problème",
          },
        ],
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

  {
    // ANGLE 2 — POURQUOI les carrés, et non plus QUOI. Le premier item fait
    // reconnaître la quantité minimisée ; celui-ci demande à quoi sert
    // l'élévation au carré. C'est la seule chose à comprendre du critère —
    // « aucun développement théorique n'est attendu », dit le BO — et sans elle
    // la méthode reste une formule qu'on récite.
    kind: "template",
    id: "stmg_stat_mc_principe_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_moindres_carres",
    microId: "statT_mc_principe",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi ce que donnerait la somme des écarts SANS les carrés, pour une droite qui coupe le nuage en deux.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 4 });
      const bonne =
        "pour que les écarts au-dessus et en dessous ne se compensent pas, et que les grands écarts pèsent davantage";
      return {
        text: "Dans la méthode des moindres carrés, pourquoi élève-t-on les écarts au CARRÉ ?",
        format: "qcm",
        choices: makeChoices(bonne, [
          "pour que tous les écarts deviennent des nombres entiers",
          "pour simplifier les calculs : un carré se calcule plus vite qu'une valeur absolue",
          "pour forcer la droite à passer par l'origine du repère",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet} et sa droite d'ajustement`, { a: nuage.a, b: nuage.b }),
        explanation: exp(
          "Le critère des moindres carrés mesure la qualité d'un ajustement par $\\sum_i \\left(y_i - (ax_i + b)\\right)^2$. Le carré y joue deux rôles à la fois.",
          "On regarde ce que deviendrait la somme sans les carrés : un point $3$ au-dessus et un point $3$ en dessous donneraient $+3$ et $-3$, donc une somme nulle — une droite très mauvaise passerait pour parfaite.",
          "Le carré rend d'abord tous les termes positifs, si bien que rien ne se compense. Il donne ensuite plus de poids aux grands écarts : un écart de $4$ compte $16$, quatre écarts de $1$ ne comptent que $4$. La droite retenue évite donc les gros ratés.",
          "On élève au carré pour empêcher les compensations et pour pénaliser les grands écarts."
        ),
        choiceDiagnostics: [
          {
            choice: "pour que tous les écarts deviennent des nombres entiers",
            cause: "les écarts sont déjà ce qu'ils sont : le carré ne change pas leur nature, il change leur POIDS",
          },
          {
            choice: "pour forcer la droite à passer par l'origine du repère",
            cause: "rien n'oblige une droite d'ajustement à passer par l'origine — son ordonnée à l'origine est justement libre",
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

  {
    // ANGLE 2 — repérer le point qui COÛTE le plus, au lieu de faire la somme.
    // Le premier item additionne les quatre carrés ; celui-ci demande lequel
    // pèse le plus lourd. C'est la lecture d'un statisticien : la somme dit
    // que l'ajustement est moyen, le point aberrant dit POURQUOI.
    kind: "template",
    id: "stmg_stat_mc_calculer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_moindres_carres",
    microId: "statT_mc_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le point qui pèse le plus est celui dont l'écart à la droite est le plus grand EN VALEUR ABSOLUE — au-dessus comme en dessous.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const serie = pick(SERIES);
      const a = pick([2, 3, 4, 5] as const);
      const b = randomInt(10, 30);
      const xs = [1, 2, 3, 4];
      // Un écart nettement plus grand que les autres, et UN SEUL : sinon deux
      // points pèsent autant et le QCM a deux bonnes réponses.
      const k = randomInt(0, 3);
      const gros = pick([5, 6, 7, -5, -6, -7] as const);
      const ecarts = xs.map((_, i) => (i === k ? gros : randomInt(-2, 2)));
      const ys = xs.map((x, i) => a * x + b + ecarts[i]);
      const nuage: Nuage = { serie, xs, ys, a, b };
      const bonne = `le point d'abscisse $${xs[k]}$`;
      return {
        text:
          `Pour la droite d'équation $y = ${a}x + ${b}$, quel point du nuage contribue LE PLUS ` +
          `à la somme des carrés des écarts ?`,
        format: "qcm",
        choices: makeChoices(
          bonne,
          xs.filter((_, i) => i !== k).map((x) => `le point d'abscisse $${x}$`)
        ),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableauNuage(nuage, `${serie.sujet} — quatre relevés`),
        explanation: exp(
          "Chaque point apporte à la somme le CARRÉ de son écart à la droite. Un point deux fois plus éloigné pèse donc quatre fois plus.",
          "Pour chaque point : on calcule la valeur prévue, l'écart avec la valeur observée, puis son carré ; on compare les quatre carrés.",
          xs
            .map(
              (x, i) =>
                `$x = ${x}$ : prévu $${a * x + b}$, observé $${ys[i]}$, écart $${ecarts[i]}$, carré $${ecarts[i] * ecarts[i]}$`
            )
            .join(" ; ") +
            `. Le plus lourd est $${gros * gros}$, pour $x = ${xs[k]}$.`,
          `C'est le point d'abscisse $${xs[k]}$ qui pèse le plus, avec un carré de $${gros * gros}$.`
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

  {
    // ANGLE 2 — ce qu'un point ABERRANT fait au critère. Le premier item
    // compare deux droites sur un même nuage ; celui-ci garde la droite et
    // change le nuage, en y ajoutant un relevé très éloigné. La somme des
    // carrés bondit — c'est la contrepartie du carré vue à l'œuvre, et c'est
    // pourquoi un relevé douteux se discute avant de se calculer.
    kind: "template",
    id: "stmg_stat_mc_comparer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_moindres_carres",
    microId: "statT_mc_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Un écart de $2$ apporte $4$ ; un écart de $20$ en apporte $400$.",
    tags: ["stmg", "maths", "statistiques", "canvas", "piege", "template"],
    generate: () => {
      const serie = pick(SERIES);
      const a = pick([3, 4, 5, 6] as const);
      const b = randomInt(10, 30);
      const xs = [1, 2, 3, 4, 5];
      const ecarts = xs.map(() => randomInt(-2, 2));
      const ys = xs.map((x, k) => a * x + b + ecarts[k]);
      const sommeAvant = ecarts.reduce((s, e) => s + e * e, 0);
      const ecartAberrant = pick([18, 20, 22, 25] as const);
      const xNouveau = 6;
      const yNouveau = a * xNouveau + b + ecartAberrant;
      const sommeApres = sommeAvant + ecartAberrant * ecartAberrant;
      const nuage: Nuage = {
        serie,
        xs: [...xs, xNouveau],
        ys: [...ys, yNouveau],
        a,
        b,
      };
      const bonne = `elle augmente fortement : elle passe de $${sommeAvant}$ à $${sommeApres}$`;
      return {
        text:
          `Pour la droite $y = ${a}x + ${b}$, la somme des carrés des écarts valait $${sommeAvant}$ sur les cinq premiers relevés. ` +
          `On ajoute un sixième relevé, très éloigné de la droite. Que devient cette somme ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "elle ne change pas : un seul point ne pèse rien sur six",
          `elle diminue, car le nuage compte maintenant plus de points`,
          "elle peut devenir négative si le point est au-dessous de la droite",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${serie.sujet} — un relevé s'écarte`, { a, b }),
        explanation: exp(
          "La somme des carrés des écarts additionne un terme positif par point : ajouter un relevé ne peut que la faire croître, et un relevé éloigné la fait croître énormément.",
          "On calcule le carré de l'écart du nouveau point et on l'ajoute à la somme précédente.",
          `Le nouveau point s'écarte de $${ecartAberrant}$ de la droite, ce qui apporte $${ecartAberrant} \\times ${ecartAberrant} = ${ecartAberrant * ecartAberrant}$ ` +
            `à lui seul — bien plus que les cinq autres réunis ($${sommeAvant}$). La somme passe à $${sommeApres}$.`,
          `Elle augmente fortement : $${sommeAvant}$ devient $${sommeApres}$. Un point aberrant pèse très lourd sur ce critère.`
        ),
        choiceDiagnostics: [
          {
            choice: "elle peut devenir négative si le point est au-dessous de la droite",
            cause: "un carré n'est jamais négatif : c'est justement à cela qu'il sert",
          },
          {
            choice: "elle ne change pas : un seul point ne pèse rien sur six",
            cause: "au contraire, c'est le point le plus éloigné qui pèse le plus lourd",
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

  {
    // ANGLE 2 — CHOISIR la transformation, au lieu de l'appliquer. Le premier
    // item pose $z = \log(y)$ et fait calculer ; celui-ci ne la donne pas. Or
    // un changement de variable ne s'improvise pas : il se choisit d'après la
    // FORME du nuage, et se tromper de transformation ne linéarise rien.
    kind: "template",
    id: "stmg_stat_cv_appliquer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_changement_variable",
    microId: "statT_cv_appliquer",
    difficulty: 2,
    theme: "neutral",
    hint: "Le nuage est multiplié par un même facteur à chaque pas : c'est le logarithme qui ramène une multiplication à une addition.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const serie = pick(SERIES);
      const xs = [1, 2, 3, 4, 5, 6];
      const facteur = pick([2, 3] as const);
      const depart = pick([5, 8, 10] as const);
      const ys = xs.map((x) => depart * Math.pow(facteur, x - 1));
      const nuage: Nuage = { serie, xs, ys, a: 0, b: 0 };
      const bonne = "$z = \\log(y)$ — on transforme les ORDONNÉES";
      return {
        text:
          `Ce nuage est multiplié par $${facteur}$ à chaque pas : il n'est pas aligné. ` +
          `Quelle transformation permet de le linéariser ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "$z = \\log(x)$ — on transforme les abscisses",
          "$z = y^2$ — on élève les ordonnées au carré",
          "$z = \\dfrac{1}{y}$ — on prend l'inverse des ordonnées",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${serie.sujet} — nuage non aligné`),
        explanation: exp(
          "Un changement de variable remplace l'une des deux variables par une fonction d'elle-même, pour rendre le nuage aligné. Le choix de la fonction dépend de la forme du nuage.",
          "Ici les ordonnées sont MULTIPLIÉES par un même facteur à chaque pas. Or le logarithme transforme un produit en somme : les $\\log$ des ordonnées, eux, s'ajouteront d'une constante à chaque pas.",
          `$y$ passe de $${ys[0]}$ à $${ys[1]}$, puis à $${ys[2]}$ : à chaque fois $\\times ${facteur}$. ` +
            `En posant $z = \\log(y)$, on ajoute $\\log(${facteur}) \\approx ${fr(Math.round(Math.log10(facteur) * 1000) / 1000)}$ à chaque pas — ` +
            `un pas constant, donc un nuage aligné.`,
          `C'est $z = \\log(y)$ qui linéarise : ce sont les ordonnées qu'il faut transformer.`
        ),
        choiceDiagnostics: [
          {
            choice: "$z = \\log(x)$ — on transforme les abscisses",
            cause: "ce sont les ordonnées qui sont multipliées ; les abscisses, elles, avancent déjà d'un pas constant",
          },
        ],
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

  {
    // ANGLE 2 — lire le TAUX caché dans la pente. Le premier item conclut « la
    // relation est exponentielle » ; celui-ci va au bout : de combien $y$ est-il
    // multiplié à chaque pas ? La réponse est $10^a$, et c'est ce nombre-là qui
    // intéresse — il rejoint le coefficient multiplicateur du chapitre des
    // évolutions.
    kind: "template",
    id: "stmg_stat_cv_lire_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_changement_variable",
    microId: "statT_cv_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Si $\\log(y) = ax + b$, alors $y = 10^{ax+b}$ : quand $x$ avance de $1$, $y$ est multiplié par $10^a$.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const serie = pick(SERIES);
      // On part du FACTEUR voulu, puis on en déduit la pente : le nombre
      // affiché est un arrondi, mais il retombe bien sur un facteur entier.
      const facteur = pick([2, 3, 4, 5] as const);
      const a = Math.round(Math.log10(facteur) * 1000) / 1000;
      const b = pick([1, 1.5, 2] as const);
      const xs = [1, 2, 3, 4, 5, 6];
      const zs = xs.map((x) => Math.round((a * x + b) * 100) / 100);
      const nuage: Nuage = { serie, xs, ys: zs, a, b };
      return {
        text:
          `Après le changement de variable $z = \\log(y)$, l'ajustement du nuage transformé donne ` +
          `$z = ${fr(a)}x + ${fr(b)}$. Par quel facteur « ${serie.y} » est-il multiplié ` +
          `chaque fois que « ${serie.x} » augmente de $1$ ? (arrondi à l'unité)`,
        format: "short",
        expected: [String(facteur)],
        comparator: "number_equal",
        canvas: canvasNuage(nuage, `Nuage transformé (x ; z) et son ajustement`, { a, b }),
        explanation: exp(
          "Si $\\log(y)$ est une fonction affine de $x$, alors $y$ est une fonction exponentielle de $x$ : $y = 10^{ax + b}$. Son coefficient multiplicateur est $10^a$.",
          "On passe de $x$ à $x + 1$ et l'on forme le quotient des deux valeurs de $y$ : tout ce qui ne dépend pas du pas disparaît.",
          `$\\dfrac{10^{a(x+1) + b}}{10^{ax + b}} = 10^{a} = 10^{${fr(a)}} \\approx ${facteur}$. ` +
            `La pente du nuage transformé ne se lit donc pas comme une augmentation de « ${serie.y} », mais comme une MULTIPLICATION.`,
          `« ${serie.y} » est multiplié par environ $${facteur}$ à chaque unité de « ${serie.x} ».`
        ),
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

  {
    // ANGLE 2 — DIAGNOSTIQUER le retour raté. Le premier item fait le chemin
    // correctement ; celui-ci met sous les yeux l'erreur qui se commet
    // réellement : écrire $10 \times z$ au lieu de $10^z$. Le calcul est
    // superbe jusque-là, et le résultat est faux d'un facteur cent.
    kind: "template",
    id: "stmg_stat_cv_revenir_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_changement_variable",
    microId: "statT_cv_revenir",
    difficulty: 3,
    theme: "neutral",
    hint: "$z = \\log(y)$ se défait avec une PUISSANCE de dix, pas avec une multiplication par dix.",
    tags: ["stmg", "maths", "statistiques", "canvas", "piege", "template"],
    generate: () => {
      const serie = pick(SERIES);
      const a = pick([0.1, 0.2, 0.25, 0.3] as const);
      const b = pick([1, 1.5, 2] as const);
      const x = randomInt(3, 8);
      const z = Math.round((a * x + b) * 100) / 100;
      const juste = Math.round(Math.pow(10, z));
      const faux = Math.round(10 * z);
      const xs = [1, 2, 3, 4, 5];
      const zs = xs.map((v) => Math.round((a * v + b) * 100) / 100);
      const nuage: Nuage = { serie, xs, ys: zs, a, b };
      const bonne = "il faut élever $10$ à la PUISSANCE $z$, et non multiplier $10$ par $z$";
      return {
        text:
          `Après le changement de variable $z = \\log(y)$, l'ajustement donne $z = ${fr(a)}x + ${fr(b)}$. ` +
          `Pour $x = ${x}$, un élève calcule $z = ${fr(z)}$, puis écrit ` +
          `« $y = 10 \\times ${fr(z)} = ${faux}$ ». Où est l'erreur ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "il faut multiplier par $100$ au lieu de $10$",
          "il faut reprendre le logarithme de $z$ pour revenir à $y$",
          "il n'y a pas d'erreur : le calcul est juste",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `Nuage transformé (x ; z) et son ajustement`, { a, b }),
        explanation: exp(
          "Le logarithme décimal et la puissance de dix se défont l'un l'autre : $\\log(y) = z$ équivaut à $y = 10^{z}$. Aucune multiplication n'intervient.",
          "On calcule $z$ avec l'ajustement, puis on remonte à $y$ en élevant $10$ à cette puissance.",
          `$z = ${fr(a)} \\times ${x} + ${fr(b)} = ${fr(z)}$ — jusqu'ici, tout est juste. ` +
            `Mais $y = 10^{${fr(z)}} \\approx ${juste}$, et non $10 \\times ${fr(z)} = ${faux}$. ` +
            `L'écart n'est pas un détail : le résultat est faux d'un facteur ${Math.round((juste / Math.max(1, faux)) * 10) / 10}.`,
          `L'erreur est d'avoir multiplié par $10$ au lieu d'élever $10$ à la puissance $z$ : la valeur prévue est $${juste}$.`
        ),
        choiceDiagnostics: [
          {
            choice: "il faut reprendre le logarithme de $z$ pour revenir à $y$",
            cause: "le logarithme a déjà été appliqué pour obtenir z : on le DÉFAIT, on ne le réapplique pas",
          },
          {
            choice: "il n'y a pas d'erreur : le calcul est juste",
            cause: `le calcul de z est juste, le retour à y ne l'est pas : $${juste}$ au lieu de $${faux}$`,
          },
        ],
      };
    },
  },
];
