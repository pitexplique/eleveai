// lib/tutor-v4/questionBank/seconde/maths/statistiques-descriptives.bank.ts
//
// Chapitre : Statistiques descriptives (notion statistiques_descriptives)
//
// REGLE DE DESIGN (option D) : fixed=remarquable/definition, templates dominants,
// QCM-raisonnement, short numerique (calculatrice dispo), pas d'open.
// Contextes : sport (buts, courses) et ecologie (dechets, eau, velos) pour motiver.
// Canvas : "stat_graph" (barres/batons) et "tableau_donnees".
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   stat_lire_serie        — Lire une serie statistique
//   stat_moyenne           — Calculer une moyenne
//   stat_moyenne_ponderee  — Calculer une moyenne ponderee
//   stat_mediane_quartiles — Mediane et quartiles
//   stat_frequence         — Calculer une frequence
//   stat_ecart_interquartile — Ecart interquartile
//   stat_ecart_type        — Ecart type (dispersion)
//   stat_interpreter       — Interpreter des indicateurs

import type { TutorBankItemV4, CanvasFigure } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

function barres(data: { label: string; value: number; color?: string }[], highlightIndex?: number): CanvasFigure {
  return {
    kind: "stat_graph",
    graphType: "barres",
    data,
    display: { showLabels: true, showValues: true, highlightIndex },
    size: { width: 320, height: 220 },
  };
}

export const statistiquesDescriptivesBank: TutorBankItemV4[] = [
  /* ===================== STAT_LIRE_SERIE ===================== */

  {
    kind: "fixed",
    id: "seconde_stat_lire_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_lire_serie",
    difficulty: 2,
    theme: "sport",
    text: "Le graphique montre les buts marqués par une équipe sur 4 matchs. Combien de buts au match 3 ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    canvas: barres([
      { label: "M1", value: 2 },
      { label: "M2", value: 1 },
      { label: "M3", value: 5 },
      { label: "M4", value: 3 },
    ], 2),
    hint: "On lit la hauteur de la barre du match 3.",
    explanation: exp(
      "On lit la valeur sur le diagramme en barres.",
      "On repère la barre « M3 ».",
      "Sa hauteur indique $5$ buts.",
      "Au match 3, l'équipe a marqué $5$ buts."
    ),
    tags: ["seconde", "maths", "statistiques", "lire_serie", "canvas", "sport", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_lire_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_lire_serie",
    difficulty: 2,
    theme: "neutral",
    text: "Le graphique montre les déchets recyclés (kg) sur 4 jours. Quel jour a recyclé le plus ?",
    format: "qcm",
    choices: ["Jeudi", "Lundi", "Mardi", "Mercredi"],
    expected: ["Jeudi"],
    comparator: "mcq_exact",
    canvas: barres([
      { label: "Lundi", value: 4, color: "#22c55e" },
      { label: "Mardi", value: 6, color: "#22c55e" },
      { label: "Mercredi", value: 3, color: "#22c55e" },
      { label: "Jeudi", value: 8, color: "#22c55e" },
    ], 3),
    hint: "On cherche la barre la plus haute.",
    explanation: exp(
      "Sur un diagramme en barres, la plus haute correspond au maximum.",
      "On compare les hauteurs : $4$, $6$, $3$, $8$.",
      "La plus grande est $8$ (jeudi).",
      "C'est jeudi qui a recyclé le plus."
    ),
    tags: ["seconde", "maths", "statistiques", "lire_serie", "canvas", "ecologie", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_lire_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_lire_serie",
    difficulty: 2,
    theme: "neutral",
    text: "L'effectif total d'une série statistique correspond :",
    format: "qcm",
    choices: ["à la somme de tous les effectifs", "à la plus grande valeur", "à la moyenne", "au nombre de catégories"],
    expected: ["à la somme de tous les effectifs"],
    comparator: "mcq_exact",
    hint: "C'est le « nombre total » d'individus.",
    explanation: exp(
      "L'effectif total compte tous les individus de la série.",
      "On additionne tous les effectifs.",
      "C'est la somme des effectifs.",
      "L'effectif total est la somme des effectifs."
    ),
    tags: ["seconde", "maths", "statistiques", "lire_serie", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_lire_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_lire_serie",
    difficulty: 3,
    theme: "sport",
    text: "Les temps (en min) de 5 coureurs sont : $20$, $25$, $18$, $30$, $22$. Quelle est l'étendue de la série ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Étendue $=$ valeur max $-$ valeur min.",
    explanation: exp(
      "L'étendue mesure la dispersion totale.",
      "Max $= 30$, min $= 18$ ; étendue $= 30 - 18$.",
      "$= 12$.",
      "L'étendue est $12$ min."
    ),
    tags: ["seconde", "maths", "statistiques", "lire_serie", "sport", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_lire_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_lire_serie",
    difficulty: 2,
    theme: "neutral",
    text: "L'étendue d'une série statistique se calcule par :",
    format: "qcm",
    choices: ["valeur maximale $-$ valeur minimale", "somme $\\div$ effectif", "valeur du milieu", "max $+$ min"],
    expected: ["valeur maximale $-$ valeur minimale"],
    comparator: "mcq_exact",
    hint: "Différence entre les extrêmes.",
    explanation: exp(
      "L'étendue mesure l'écart entre les valeurs extrêmes.",
      "On soustrait la plus petite valeur à la plus grande.",
      "Étendue $=$ max $-$ min.",
      "C'est max $-$ min."
    ),
    tags: ["seconde", "maths", "statistiques", "lire_serie", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_lire_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_lire_serie",
    difficulty: 3,
    theme: "sport",
    text: "Le graphique montre les buts sur 4 matchs. Quel est l'effectif total (total de buts) ?",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    canvas: barres([
      { label: "M1", value: 2 },
      { label: "M2", value: 1 },
      { label: "M3", value: 5 },
      { label: "M4", value: 3 },
    ]),
    hint: "On additionne tous les buts.",
    explanation: exp(
      "Le total de buts est la somme des valeurs.",
      "$2 + 1 + 5 + 3$.",
      "$= 11$.",
      "Le total est $11$ buts."
    ),
    tags: ["seconde", "maths", "statistiques", "lire_serie", "canvas", "sport", "short"],
  },

  {
    kind: "template",
    id: "seconde_stat_lire_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_lire_serie",
    difficulty: 3,
    theme: "neutral",
    hint: "Étendue $=$ max $-$ min.",
    tags: ["seconde", "maths", "statistiques", "lire_serie", "ecologie", "template"],
    generate: () => {
      const vals = [randomInt(2, 6), randomInt(7, 12), randomInt(1, 4), randomInt(13, 20)];
      const max = Math.max(...vals);
      const min = Math.min(...vals);
      return {
        text: `Consommation d'eau (en L) sur 4 jours : ${vals.join(", ")}. Quelle est l'étendue ?`,
        format: "short",
        expected: [String(max - min)],
        comparator: "number_equal",
        explanation: exp(
          "L'étendue est la différence entre le max et le min.",
          `Max $= ${max}$, min $= ${min}$.`,
          `$${max} - ${min} = ${max - min}$.`,
          `L'étendue est $${max - min}$ L.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_stat_lire_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_lire_serie",
    difficulty: 2,
    theme: "neutral",
    hint: "On additionne toutes les valeurs.",
    tags: ["seconde", "maths", "statistiques", "lire_serie", "ecologie", "template"],
    generate: () => {
      const vals = [randomInt(2, 8), randomInt(2, 8), randomInt(2, 8), randomInt(2, 8)];
      const total = vals.reduce((s, v) => s + v, 0);
      return {
        text: `Vélos en libre-service loués (en centaines) sur 4 jours : ${vals.join(", ")}. Quel est le total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le total est la somme des effectifs.",
          `$${vals.join(" + ")}$.`,
          `$= ${total}$.`,
          `Le total est $${total}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_stat_lire_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_lire_serie",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une série, une « valeur » accompagnée de son « effectif » indique :",
    format: "qcm",
    choices: [
      "combien de fois cette valeur apparaît",
      "la moyenne de la série",
      "la valeur la plus grande",
      "le total de la série",
    ],
    expected: ["combien de fois cette valeur apparaît"],
    comparator: "mcq_exact",
    hint: "Effectif = nombre d'apparitions.",
    explanation: exp(
      "L'effectif d'une valeur compte ses apparitions.",
      "Ex. note $12$ d'effectif $5$ : cinq élèves ont eu $12$.",
      "C'est le nombre d'apparitions de la valeur.",
      "Combien de fois la valeur apparaît."
    ),
    tags: ["seconde", "maths", "statistiques", "lire_serie", "raisonnement", "qcm"],
  },

  /* ===================== STAT_MOYENNE ===================== */

  {
    kind: "fixed",
    id: "seconde_stat_moy_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_moyenne",
    difficulty: 1,
    theme: "neutral",
    text: "La moyenne d'une série se calcule par :",
    format: "qcm",
    choices: [
      "somme des valeurs $\\div$ nombre de valeurs",
      "max $-$ min",
      "valeur du milieu",
      "valeur la plus fréquente",
    ],
    expected: ["somme des valeurs $\\div$ nombre de valeurs"],
    comparator: "mcq_exact",
    hint: "On partage le total équitablement.",
    explanation: exp(
      "La moyenne répartit le total également entre les valeurs.",
      "On divise la somme par l'effectif.",
      "Moyenne $= \\dfrac{\\text{somme}}{\\text{effectif}}$.",
      "Somme $\\div$ nombre de valeurs."
    ),
    tags: ["seconde", "maths", "statistiques", "moyenne", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_moy_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_moyenne",
    difficulty: 2,
    theme: "sport",
    text: "Un joueur marque $1$, $2$, $3$ et $4$ buts sur 4 matchs. Quelle est sa moyenne de buts par match ?",
    format: "short",
    expected: ["2,5", "2.5"],
    comparator: "number_equal",
    hint: "$\\dfrac{1+2+3+4}{4}$.",
    explanation: exp(
      "On divise le total de buts par le nombre de matchs.",
      "$\\dfrac{1 + 2 + 3 + 4}{4} = \\dfrac{10}{4}$.",
      "$= 2{,}5$.",
      "La moyenne est $2{,}5$ buts par match."
    ),
    tags: ["seconde", "maths", "statistiques", "moyenne", "sport", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_moy_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_moyenne",
    difficulty: 2,
    theme: "neutral",
    text: "Une ville recycle $3$, $5$ et $4$ tonnes de plastique sur 3 mois. Quelle est la moyenne mensuelle ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$\\dfrac{3+5+4}{3}$.",
    explanation: exp(
      "On divise le total par le nombre de mois.",
      "$\\dfrac{3 + 5 + 4}{3} = \\dfrac{12}{3}$.",
      "$= 4$.",
      "La moyenne est $4$ tonnes par mois."
    ),
    tags: ["seconde", "maths", "statistiques", "moyenne", "ecologie", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_moy_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule la moyenne de la série : $8$, $10$, $12$, $14$.",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "Somme $= 44$, effectif $= 4$.",
    explanation: exp(
      "On additionne puis on divise par l'effectif.",
      "$8 + 10 + 12 + 14 = 44$ ; $\\dfrac{44}{4}$.",
      "$= 11$.",
      "La moyenne est $11$."
    ),
    tags: ["seconde", "maths", "statistiques", "moyenne", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_moy_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "sport",
    text: "Le graphique montre les buts sur 4 matchs. Quelle est la moyenne de buts par match ?",
    format: "short",
    expected: ["2,75", "2.75"],
    comparator: "number_equal",
    canvas: barres([
      { label: "M1", value: 2 },
      { label: "M2", value: 1 },
      { label: "M3", value: 5 },
      { label: "M4", value: 3 },
    ]),
    hint: "Total $11$ buts sur $4$ matchs.",
    explanation: exp(
      "On divise le total par le nombre de matchs.",
      "$\\dfrac{2 + 1 + 5 + 3}{4} = \\dfrac{11}{4}$.",
      "$= 2{,}75$.",
      "La moyenne est $2{,}75$ buts par match."
    ),
    tags: ["seconde", "maths", "statistiques", "moyenne", "canvas", "sport", "short"],
  },

  {
    kind: "template",
    id: "seconde_stat_moy_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_moyenne",
    difficulty: 2,
    theme: "neutral",
    hint: "Somme $\\div$ effectif.",
    tags: ["seconde", "maths", "statistiques", "moyenne", "ecologie", "template"],
    generate: () => {
      const n = 4;
      const base = randomInt(2, 6);
      const vals = [base, base + 2, base + 4, base + 6]; // somme divisible par 4
      const total = vals.reduce((s, v) => s + v, 0);
      const moy = total / n;
      const moyStr = String(moy).replace(".", ",");
      return {
        text: `Émissions de CO₂ (en tonnes) sur 4 ans : ${vals.join(", ")}. Quelle est la moyenne annuelle ?`,
        format: "short",
        expected: [moyStr, String(moy)],
        comparator: "number_equal",
        explanation: exp(
          "On divise la somme par le nombre d'années.",
          `$\\dfrac{${vals.join(" + ")}}{4} = \\dfrac{${total}}{4}$.`,
          `$= ${moyStr}$.`,
          `La moyenne est $${moyStr}$ tonnes par an.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_stat_moy_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "sport",
    hint: "Somme des distances $\\div$ nombre de jours.",
    tags: ["seconde", "maths", "statistiques", "moyenne", "sport", "template"],
    generate: () => {
      const vals = [randomInt(3, 8), randomInt(3, 8), randomInt(3, 8)];
      const total = vals.reduce((s, v) => s + v, 0);
      const moy = Math.round((total / 3) * 100) / 100;
      const moyStr = String(moy).replace(".", ",");
      return {
        text: `Un coureur parcourt ${vals.join(", ")} km sur 3 jours. Quelle est sa distance moyenne par jour ?`,
        format: "short",
        expected: [moyStr, String(moy)],
        comparator: "number_equal",
        explanation: exp(
          "On divise le total par le nombre de jours.",
          `$\\dfrac{${vals.join(" + ")}}{3} = \\dfrac{${total}}{3}$.`,
          `$\\approx ${moyStr}$.`,
          `La moyenne est $${moyStr}$ km par jour.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_stat_moy_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_moyenne",
    difficulty: 4,
    theme: "neutral",
    text: "La moyenne de 4 valeurs est $10$. Quelle est la somme de ces valeurs ?",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "Somme $=$ moyenne $\\times$ effectif.",
    explanation: exp(
      "On inverse la formule de la moyenne.",
      "Somme $=$ moyenne $\\times$ effectif $= 10 \\times 4$.",
      "$= 40$.",
      "La somme est $40$."
    ),
    tags: ["seconde", "maths", "statistiques", "moyenne", "raisonnement", "short"],
  },

  /* ===================== STAT_MOYENNE_PONDEREE ===================== */

  {
    kind: "fixed",
    id: "seconde_stat_pond_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_moyenne_ponderee",
    difficulty: 2,
    theme: "neutral",
    text: "Une moyenne pondérée tient compte :",
    format: "qcm",
    choices: [
      "des effectifs (ou coefficients) de chaque valeur",
      "uniquement de la plus grande valeur",
      "de l'étendue",
      "de la médiane",
    ],
    expected: ["des effectifs (ou coefficients) de chaque valeur"],
    comparator: "mcq_exact",
    hint: "Chaque valeur compte selon son poids.",
    explanation: exp(
      "La moyenne pondérée pondère chaque valeur par son effectif.",
      "Une valeur qui apparaît souvent « pèse » davantage.",
      "On utilise les effectifs (ou coefficients).",
      "Elle tient compte des effectifs."
    ),
    tags: ["seconde", "maths", "statistiques", "moyenne_ponderee", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_pond_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_moyenne_ponderee",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une classe : $10$ élèves ont eu $8$, et $10$ élèves ont eu $12$. Quelle est la moyenne ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "$\\dfrac{10 \\times 8 + 10 \\times 12}{20}$.",
    explanation: exp(
      "On pondère chaque note par son effectif.",
      "$\\dfrac{10 \\times 8 + 10 \\times 12}{20} = \\dfrac{80 + 120}{20} = \\dfrac{200}{20}$.",
      "$= 10$.",
      "La moyenne est $10$."
    ),
    tags: ["seconde", "maths", "statistiques", "moyenne_ponderee", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_pond_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_moyenne_ponderee",
    difficulty: 4,
    theme: "neutral",
    text: "Notes et coefficients : $12$ (coef $1$), $8$ (coef $3$). Quelle est la moyenne pondérée ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "$\\dfrac{12 \\times 1 + 8 \\times 3}{1 + 3}$.",
    explanation: exp(
      "On multiplie chaque note par son coefficient, puis on divise par la somme des coefficients.",
      "$\\dfrac{12 \\times 1 + 8 \\times 3}{4} = \\dfrac{12 + 24}{4} = \\dfrac{36}{4}$.",
      "$= 9$.",
      "La moyenne pondérée est $9$."
    ),
    tags: ["seconde", "maths", "statistiques", "moyenne_ponderee", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_pond_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_moyenne_ponderee",
    difficulty: 3,
    theme: "sport",
    text: "Un club a $20$ joueurs de $15$ ans et $30$ joueurs de $10$ ans. Quel est l'âge moyen ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "$\\dfrac{20 \\times 15 + 30 \\times 10}{50}$.",
    explanation: exp(
      "On pondère chaque âge par l'effectif correspondant.",
      "$\\dfrac{20 \\times 15 + 30 \\times 10}{50} = \\dfrac{300 + 300}{50} = \\dfrac{600}{50}$.",
      "$= 12$.",
      "L'âge moyen est $12$ ans."
    ),
    tags: ["seconde", "maths", "statistiques", "moyenne_ponderee", "sport", "short"],
  },

  {
    kind: "template",
    id: "seconde_stat_pond_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_moyenne_ponderee",
    difficulty: 4,
    theme: "neutral",
    hint: "Somme des (valeur × effectif) ÷ effectif total.",
    tags: ["seconde", "maths", "statistiques", "moyenne_ponderee", "template"],
    generate: () => {
      const v1 = randomInt(6, 10);
      const v2 = v1 + randomInt(2, 6);
      const n1 = randomInt(2, 5);
      const n2 = n1; // effectifs égaux -> moyenne = (v1+v2)/2 entière si pair
      const moy = (v1 * n1 + v2 * n2) / (n1 + n2);
      const moyStr = String(Math.round(moy * 100) / 100).replace(".", ",");
      return {
        text: `$${n1}$ valeurs égales à $${v1}$ et $${n2}$ valeurs égales à $${v2}$. Quelle est la moyenne pondérée ?`,
        format: "short",
        expected: [moyStr, String(Math.round(moy * 100) / 100)],
        comparator: "number_equal",
        explanation: exp(
          "On pondère chaque valeur par son effectif.",
          `$\\dfrac{${n1} \\times ${v1} + ${n2} \\times ${v2}}{${n1 + n2}} = \\dfrac{${v1 * n1 + v2 * n2}}{${n1 + n2}}$.`,
          `$= ${moyStr}$.`,
          `La moyenne pondérée est $${moyStr}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_stat_pond_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_moyenne_ponderee",
    difficulty: 4,
    theme: "neutral",
    hint: "Note × coef, puis ÷ somme des coefs.",
    tags: ["seconde", "maths", "statistiques", "moyenne_ponderee", "template"],
    generate: () => {
      const n1 = randomInt(8, 14);
      const c1 = 1;
      const n2 = randomInt(8, 14);
      const c2 = 3;
      const moy = (n1 * c1 + n2 * c2) / (c1 + c2);
      const moyStr = String(Math.round(moy * 100) / 100).replace(".", ",");
      return {
        text: `Deux notes : $${n1}$ (coef $${c1}$) et $${n2}$ (coef $${c2}$). Quelle est la moyenne pondérée ?`,
        format: "short",
        expected: [moyStr, String(Math.round(moy * 100) / 100)],
        comparator: "number_equal",
        explanation: exp(
          "On multiplie chaque note par son coefficient.",
          `$\\dfrac{${n1} \\times ${c1} + ${n2} \\times ${c2}}{${c1 + c2}} = \\dfrac{${n1 * c1 + n2 * c2}}{${c1 + c2}}$.`,
          `$= ${moyStr}$.`,
          `La moyenne pondérée est $${moyStr}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_stat_pond_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_moyenne_ponderee",
    difficulty: 2,
    theme: "neutral",
    text: "Si toutes les valeurs ont le même effectif, la moyenne pondérée est-elle différente de la moyenne simple ?",
    format: "qcm",
    choices: ["Non, elles sont égales", "Oui, toujours plus grande", "Oui, toujours plus petite", "On ne peut pas savoir"],
    expected: ["Non, elles sont égales"],
    comparator: "mcq_exact",
    hint: "Mêmes poids = moyenne classique.",
    explanation: exp(
      "La pondération n'a d'effet que si les poids diffèrent.",
      "Avec des effectifs égaux, chaque valeur compte pareil.",
      "On retrouve alors la moyenne simple.",
      "Non, elles sont égales."
    ),
    tags: ["seconde", "maths", "statistiques", "moyenne_ponderee", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_pond_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_moyenne_ponderee",
    difficulty: 4,
    theme: "neutral",
    text: "Notes : $15$ (coef $2$) et $5$ (coef $2$). Quelle est la moyenne pondérée ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Coefficients égaux → moyenne simple.",
    explanation: exp(
      "Les coefficients sont égaux, donc c'est la moyenne simple.",
      "$\\dfrac{15 \\times 2 + 5 \\times 2}{4} = \\dfrac{40}{4}$.",
      "$= 10$.",
      "La moyenne pondérée est $10$."
    ),
    tags: ["seconde", "maths", "statistiques", "moyenne_ponderee", "short"],
  },

  /* ===================== STAT_MEDIANE_QUARTILES ===================== */

  {
    kind: "fixed",
    id: "seconde_stat_med_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_mediane_quartiles",
    difficulty: 2,
    theme: "neutral",
    text: "La médiane d'une série partage les valeurs ordonnées en :",
    format: "qcm",
    choices: ["deux moitiés (autant en dessous qu'au-dessus)", "quatre quarts", "trois tiers", "deux parts inégales"],
    expected: ["deux moitiés (autant en dessous qu'au-dessus)"],
    comparator: "mcq_exact",
    hint: "Médiane = au milieu.",
    explanation: exp(
      "La médiane sépare la série ordonnée en deux groupes de même effectif.",
      "Au moins la moitié est inférieure ou égale, au moins la moitié supérieure ou égale.",
      "Elle partage en deux moitiés.",
      "En deux moitiés."
    ),
    tags: ["seconde", "maths", "statistiques", "mediane", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_med_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_mediane_quartiles",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la médiane de la série ordonnée : $3$, $5$, $7$, $9$, $11$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Valeur du milieu (5 valeurs → la 3e).",
    explanation: exp(
      "Pour $5$ valeurs, la médiane est la $3^e$ (celle du milieu).",
      "La série est déjà ordonnée.",
      "La valeur centrale est $7$.",
      "La médiane est $7$."
    ),
    tags: ["seconde", "maths", "statistiques", "mediane", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_med_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_mediane_quartiles",
    difficulty: 3,
    theme: "sport",
    text: "Temps (min) ordonnés de 7 coureurs : $18$, $20$, $21$, $23$, $25$, $28$, $30$. Quelle est la médiane ?",
    format: "short",
    expected: ["23"],
    comparator: "number_equal",
    hint: "7 valeurs → la 4e.",
    explanation: exp(
      "Pour $7$ valeurs, la médiane est la $4^e$ valeur.",
      "On compte jusqu'à la position centrale.",
      "La $4^e$ valeur est $23$.",
      "La médiane est $23$ min."
    ),
    tags: ["seconde", "maths", "statistiques", "mediane", "sport", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_med_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_mediane_quartiles",
    difficulty: 3,
    theme: "neutral",
    text: "Le premier quartile $Q_1$ d'une série est une valeur telle qu'au moins :",
    format: "qcm",
    choices: [
      "$25\\,\\%$ des données lui sont inférieures ou égales",
      "$50\\,\\%$ des données lui sont inférieures",
      "$75\\,\\%$ des données lui sont supérieures",
      "toutes les données lui sont égales",
    ],
    expected: ["$25\\,\\%$ des données lui sont inférieures ou égales"],
    comparator: "mcq_exact",
    hint: "$Q_1$ → un quart.",
    explanation: exp(
      "$Q_1$ se situe au premier quart de la série ordonnée.",
      "Au moins $25\\,\\%$ des valeurs sont $\\le Q_1$.",
      "C'est le quartile inférieur.",
      "Au moins $25\\,\\%$ lui sont inférieures ou égales."
    ),
    tags: ["seconde", "maths", "statistiques", "quartiles", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_med_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_mediane_quartiles",
    difficulty: 4,
    theme: "neutral",
    text: "Série ordonnée de 8 valeurs : $2$, $4$, $5$, $7$, $9$, $10$, $12$, $14$. Quelle est la médiane ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "8 valeurs (pair) : moyenne des 4e et 5e.",
    explanation: exp(
      "Pour un effectif pair, la médiane est la moyenne des deux valeurs centrales.",
      "$4^e = 7$, $5^e = 9$ ; $\\dfrac{7 + 9}{2}$.",
      "$= 8$.",
      "La médiane est $8$."
    ),
    tags: ["seconde", "maths", "statistiques", "mediane", "short"],
  },

  {
    kind: "template",
    id: "seconde_stat_med_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_mediane_quartiles",
    difficulty: 3,
    theme: "neutral",
    hint: "Série de 5 valeurs ordonnées → la 3e.",
    tags: ["seconde", "maths", "statistiques", "mediane", "template"],
    generate: () => {
      const start = randomInt(1, 6);
      const step = randomInt(2, 4);
      const vals = [start, start + step, start + 2 * step, start + 3 * step, start + 4 * step];
      const med = vals[2];
      return {
        text: `Quelle est la médiane de la série ordonnée : ${vals.join(", ")} ?`,
        format: "short",
        expected: [String(med)],
        comparator: "number_equal",
        explanation: exp(
          "Pour $5$ valeurs, la médiane est la $3^e$.",
          "La série est déjà ordonnée.",
          `La valeur centrale est $${med}$.`,
          `La médiane est $${med}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_stat_med_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_mediane_quartiles",
    difficulty: 4,
    theme: "neutral",
    hint: "6 valeurs (pair) : moyenne des 3e et 4e.",
    tags: ["seconde", "maths", "statistiques", "mediane", "template"],
    generate: () => {
      const a = randomInt(1, 5);
      const vals = [a, a + 2, a + 4, a + 6, a + 8, a + 10];
      const med = (vals[2] + vals[3]) / 2;
      const medStr = String(med).replace(".", ",");
      return {
        text: `Série ordonnée de 6 valeurs : ${vals.join(", ")}. Quelle est la médiane ?`,
        format: "short",
        expected: [medStr, String(med)],
        comparator: "number_equal",
        explanation: exp(
          "Pour un effectif pair, la médiane est la moyenne des deux valeurs centrales.",
          `$3^e = ${vals[2]}$, $4^e = ${vals[3]}$ ; $\\dfrac{${vals[2]} + ${vals[3]}}{2}$.`,
          `$= ${medStr}$.`,
          `La médiane est $${medStr}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_stat_med_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_mediane_quartiles",
    difficulty: 3,
    theme: "neutral",
    text: "La médiane est-elle sensible aux valeurs extrêmes (très grandes ou très petites) ?",
    format: "qcm",
    choices: [
      "Non, peu sensible (contrairement à la moyenne)",
      "Oui, très sensible",
      "Oui, autant que la moyenne",
      "Seulement si la série est paire",
    ],
    expected: ["Non, peu sensible (contrairement à la moyenne)"],
    comparator: "mcq_exact",
    hint: "La médiane = position centrale.",
    explanation: exp(
      "La médiane ne dépend que de la position centrale.",
      "Une valeur extrême ne déplace pas le milieu.",
      "La moyenne, elle, est très influencée par les extrêmes.",
      "Non, la médiane est peu sensible aux extrêmes."
    ),
    tags: ["seconde", "maths", "statistiques", "mediane", "raisonnement", "qcm"],
  },

  /* ===================== STAT_FREQUENCE ===================== */

  {
    kind: "fixed",
    id: "seconde_stat_freq_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "La fréquence d'une valeur se calcule par :",
    format: "qcm",
    choices: [
      "$\\dfrac{\\text{effectif de la valeur}}{\\text{effectif total}}$",
      "effectif $\\times$ total",
      "max $-$ min",
      "somme $\\div 2$",
    ],
    expected: ["$\\dfrac{\\text{effectif de la valeur}}{\\text{effectif total}}$"],
    comparator: "mcq_exact",
    hint: "Part de la valeur dans le total.",
    explanation: exp(
      "La fréquence est la proportion d'une valeur dans la série.",
      "On divise son effectif par l'effectif total.",
      "Fréquence $= \\dfrac{\\text{effectif}}{\\text{total}}$.",
      "$\\dfrac{\\text{effectif}}{\\text{total}}$."
    ),
    tags: ["seconde", "maths", "statistiques", "frequence", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_freq_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Sur $30$ trajets, $12$ sont faits à vélo. Quelle est la fréquence des trajets à vélo, en pourcentage ?",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "$\\dfrac{12}{30} \\times 100$.",
    explanation: exp(
      "On calcule la proportion de trajets à vélo.",
      "$\\dfrac{12}{30} \\times 100 = 0{,}4 \\times 100$.",
      "$= 40$.",
      "La fréquence est $40\\,\\%$."
    ),
    tags: ["seconde", "maths", "statistiques", "frequence", "ecologie", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_freq_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_frequence",
    difficulty: 3,
    theme: "sport",
    text: "Un basketteur réussit $18$ paniers sur $25$ tirs. Quelle est sa fréquence de réussite, en pourcentage ?",
    format: "short",
    expected: ["72"],
    comparator: "number_equal",
    hint: "$\\dfrac{18}{25} \\times 100$.",
    explanation: exp(
      "On calcule la proportion de tirs réussis.",
      "$\\dfrac{18}{25} \\times 100 = 0{,}72 \\times 100$.",
      "$= 72$.",
      "La fréquence de réussite est $72\\,\\%$."
    ),
    tags: ["seconde", "maths", "statistiques", "frequence", "sport", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_freq_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "La somme de toutes les fréquences d'une série vaut :",
    format: "qcm",
    choices: ["$1$ (ou $100\\,\\%$)", "$0$", "l'effectif total", "la moyenne"],
    expected: ["$1$ (ou $100\\,\\%$)"],
    comparator: "mcq_exact",
    hint: "Toutes les parts réunies = le tout.",
    explanation: exp(
      "Les fréquences représentent des parts du total.",
      "En les additionnant, on reconstitue tout le total.",
      "La somme vaut $1$, soit $100\\,\\%$.",
      "$1$ (ou $100\\,\\%$)."
    ),
    tags: ["seconde", "maths", "statistiques", "frequence", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_stat_freq_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_frequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Fréquence $= \\dfrac{\\text{effectif}}{\\text{total}} \\times 100$.",
    tags: ["seconde", "maths", "statistiques", "frequence", "ecologie", "template"],
    generate: () => {
      const total = [20, 25, 40, 50][randomInt(0, 3)];
      const pct = [10, 20, 40, 60, 80][randomInt(0, 4)];
      const eff = (pct * total) / 100;
      return {
        text: `Sur $${total}$ familles, $${eff}$ trient leurs déchets. Quelle est la fréquence, en pourcentage ?`,
        format: "short",
        expected: [String(pct)],
        comparator: "number_equal",
        explanation: exp(
          "On calcule la proportion par rapport au total.",
          `$\\dfrac{${eff}}{${total}} \\times 100$.`,
          `$= ${pct}$.`,
          `La fréquence est $${pct}\\,\\%$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_stat_freq_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_frequence",
    difficulty: 3,
    theme: "sport",
    hint: "Réussites ÷ tentatives × 100.",
    tags: ["seconde", "maths", "statistiques", "frequence", "sport", "template"],
    generate: () => {
      const total = [20, 25, 50][randomInt(0, 2)];
      const pct = [40, 60, 72, 80][randomInt(0, 3)];
      const reussites = Math.round((pct * total) / 100);
      const realPct = Math.round((reussites / total) * 100);
      return {
        text: `Un joueur réussit $${reussites}$ tirs sur $${total}$. Quelle est sa fréquence de réussite, en pourcentage ?`,
        format: "short",
        expected: [String(realPct)],
        comparator: "number_equal",
        explanation: exp(
          "On divise les réussites par le nombre de tirs.",
          `$\\dfrac{${reussites}}{${total}} \\times 100$.`,
          `$= ${realPct}$.`,
          `La fréquence est $${realPct}\\,\\%$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_stat_freq_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_frequence",
    difficulty: 4,
    theme: "neutral",
    text: "Une valeur a une fréquence de $0{,}25$. Sur $200$ individus, quel est son effectif ?",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "Effectif $=$ fréquence $\\times$ total.",
    explanation: exp(
      "On retrouve l'effectif à partir de la fréquence.",
      "Effectif $= 0{,}25 \\times 200$.",
      "$= 50$.",
      "L'effectif est $50$."
    ),
    tags: ["seconde", "maths", "statistiques", "frequence", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_freq_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_frequence",
    difficulty: 3,
    theme: "neutral",
    text: "Une fréquence est toujours comprise :",
    format: "qcm",
    choices: ["entre $0$ et $1$", "entre $0$ et $100$ (jamais en décimal)", "supérieure à $1$", "négative possible"],
    expected: ["entre $0$ et $1$"],
    comparator: "mcq_exact",
    hint: "C'est une proportion.",
    explanation: exp(
      "Une fréquence est une proportion du total.",
      "Elle vaut au minimum $0$, au maximum $1$ (tout le total).",
      "On peut l'exprimer en % (de $0$ à $100$).",
      "Entre $0$ et $1$."
    ),
    tags: ["seconde", "maths", "statistiques", "frequence", "raisonnement", "qcm"],
  },

  /* ===================== STAT_ECART_INTERQUARTILE ===================== */

  {
    kind: "fixed",
    id: "seconde_stat_eiq_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_ecart_interquartile",
    difficulty: 2,
    theme: "neutral",
    text: "L'écart interquartile se calcule par :",
    format: "qcm",
    choices: ["$Q_3 - Q_1$", "$Q_3 + Q_1$", "médiane $\\times 2$", "max $-$ min"],
    expected: ["$Q_3 - Q_1$"],
    comparator: "mcq_exact",
    hint: "Différence des quartiles.",
    explanation: exp(
      "L'écart interquartile mesure la dispersion des $50\\,\\%$ centraux.",
      "On soustrait le premier quartile au troisième.",
      "Écart interquartile $= Q_3 - Q_1$.",
      "$Q_3 - Q_1$."
    ),
    tags: ["seconde", "maths", "statistiques", "ecart_interquartile", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_eiq_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_ecart_interquartile",
    difficulty: 2,
    theme: "neutral",
    text: "Une série a $Q_1 = 8$ et $Q_3 = 15$. Quel est l'écart interquartile ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "$Q_3 - Q_1 = 15 - 8$.",
    explanation: exp(
      "On applique $Q_3 - Q_1$.",
      "$15 - 8$.",
      "$= 7$.",
      "L'écart interquartile est $7$."
    ),
    tags: ["seconde", "maths", "statistiques", "ecart_interquartile", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_eiq_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_ecart_interquartile",
    difficulty: 3,
    theme: "neutral",
    text: "L'écart interquartile mesure la dispersion :",
    format: "qcm",
    choices: [
      "des $50\\,\\%$ de valeurs centrales",
      "de toutes les valeurs",
      "des valeurs extrêmes uniquement",
      "de la moyenne",
    ],
    expected: ["des $50\\,\\%$ de valeurs centrales"],
    comparator: "mcq_exact",
    hint: "Entre $Q_1$ et $Q_3$.",
    explanation: exp(
      "Entre $Q_1$ et $Q_3$ se trouvent les $50\\,\\%$ centraux.",
      "L'écart interquartile mesure leur étendue.",
      "Il ignore les valeurs extrêmes.",
      "Il mesure la dispersion des $50\\,\\%$ centraux."
    ),
    tags: ["seconde", "maths", "statistiques", "ecart_interquartile", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_eiq_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_ecart_interquartile",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi préférer l'écart interquartile à l'étendue pour mesurer la dispersion ?",
    format: "qcm",
    choices: [
      "Il n'est pas affecté par les valeurs extrêmes",
      "Il est toujours plus grand",
      "Il est plus facile à lire",
      "Il vaut toujours $0$",
    ],
    expected: ["Il n'est pas affecté par les valeurs extrêmes"],
    comparator: "mcq_exact",
    hint: "L'étendue dépend du max et du min.",
    explanation: exp(
      "L'étendue dépend uniquement des extrêmes (sensible aux valeurs aberrantes).",
      "L'écart interquartile se concentre sur les $50\\,\\%$ centraux.",
      "Il est donc plus robuste.",
      "Il n'est pas affecté par les valeurs extrêmes."
    ),
    tags: ["seconde", "maths", "statistiques", "ecart_interquartile", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_stat_eiq_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_ecart_interquartile",
    difficulty: 3,
    theme: "neutral",
    hint: "$Q_3 - Q_1$.",
    tags: ["seconde", "maths", "statistiques", "ecart_interquartile", "template"],
    generate: () => {
      const q1 = randomInt(3, 10);
      const eiq = randomInt(3, 9);
      const q3 = q1 + eiq;
      return {
        text: `Une série a $Q_1 = ${q1}$ et $Q_3 = ${q3}$. Quel est l'écart interquartile ?`,
        format: "short",
        expected: [String(eiq)],
        comparator: "number_equal",
        explanation: exp(
          "On applique $Q_3 - Q_1$.",
          `$${q3} - ${q1}$.`,
          `$= ${eiq}$.`,
          `L'écart interquartile est $${eiq}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_stat_eiq_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_ecart_interquartile",
    difficulty: 3,
    theme: "sport",
    hint: "Écart interquartile $= Q_3 - Q_1$.",
    tags: ["seconde", "maths", "statistiques", "ecart_interquartile", "sport", "template"],
    generate: () => {
      const q1 = randomInt(10, 18);
      const eiq = randomInt(4, 10);
      const q3 = q1 + eiq;
      return {
        text: `Pour les temps (min) d'un marathon, $Q_1 = ${q1}$ et $Q_3 = ${q3}$. Quel est l'écart interquartile ?`,
        format: "short",
        expected: [String(eiq)],
        comparator: "number_equal",
        explanation: exp(
          "On soustrait $Q_1$ à $Q_3$.",
          `$${q3} - ${q1}$.`,
          `$= ${eiq}$.`,
          `L'écart interquartile est $${eiq}$ min.`
        ),
      };
    },
  },

  /* ===================== STAT_ECART_TYPE ===================== */

  {
    kind: "fixed",
    id: "seconde_stat_et_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_ecart_type",
    difficulty: 2,
    theme: "neutral",
    text: "Que mesure l'écart type d'une série ?",
    format: "qcm",
    choices: [
      "la dispersion des valeurs autour de la moyenne",
      "la valeur centrale",
      "la plus grande valeur",
      "le nombre de valeurs",
    ],
    expected: ["la dispersion des valeurs autour de la moyenne"],
    comparator: "mcq_exact",
    hint: "Écart type → dispersion.",
    explanation: exp(
      "L'écart type est un indicateur de dispersion.",
      "Il mesure à quel point les valeurs s'écartent de la moyenne.",
      "Plus il est grand, plus les valeurs sont dispersées.",
      "Il mesure la dispersion autour de la moyenne."
    ),
    tags: ["seconde", "maths", "statistiques", "ecart_type", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_et_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_ecart_type",
    difficulty: 3,
    theme: "neutral",
    text: "Plus l'écart type est grand, plus les valeurs sont :",
    format: "qcm",
    choices: ["dispersées (éloignées de la moyenne)", "regroupées", "égales", "petites"],
    expected: ["dispersées (éloignées de la moyenne)"],
    comparator: "mcq_exact",
    hint: "Grand écart type = grande dispersion.",
    explanation: exp(
      "L'écart type quantifie l'éloignement à la moyenne.",
      "Un grand écart type signale des valeurs très étalées.",
      "Un petit écart type signale des valeurs regroupées.",
      "Plus dispersées."
    ),
    tags: ["seconde", "maths", "statistiques", "ecart_type", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_et_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_ecart_type",
    difficulty: 3,
    theme: "neutral",
    text: "Toutes les valeurs d'une série sont égales à $7$. Que vaut l'écart type ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Aucune dispersion.",
    explanation: exp(
      "Si toutes les valeurs sont identiques, elles sont toutes égales à la moyenne.",
      "Il n'y a aucun écart à la moyenne.",
      "L'écart type vaut donc $0$.",
      "L'écart type est $0$."
    ),
    tags: ["seconde", "maths", "statistiques", "ecart_type", "raisonnement", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_et_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_ecart_type",
    difficulty: 4,
    theme: "sport",
    text: "Deux joueurs ont la même moyenne de buts, mais l'un a un écart type plus grand. Que peut-on dire de lui ?",
    format: "qcm",
    choices: [
      "Il est plus irrégulier (résultats plus dispersés)",
      "Il est plus régulier",
      "Il marque plus de buts en moyenne",
      "Il joue moins de matchs",
    ],
    expected: ["Il est plus irrégulier (résultats plus dispersés)"],
    comparator: "mcq_exact",
    hint: "Grand écart type = grande variabilité.",
    explanation: exp(
      "À moyenne égale, l'écart type compare la régularité.",
      "Un écart type plus grand signifie des performances plus variables.",
      "Le joueur est donc plus irrégulier.",
      "Il est plus irrégulier."
    ),
    tags: ["seconde", "maths", "statistiques", "ecart_type", "sport", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_et_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_ecart_type",
    difficulty: 2,
    theme: "neutral",
    text: "L'écart type peut-il être négatif ?",
    format: "qcm",
    choices: ["Non, jamais (c'est une mesure d'écart)", "Oui, si la moyenne est négative", "Oui, parfois", "Oui, si les valeurs baissent"],
    expected: ["Non, jamais (c'est une mesure d'écart)"],
    comparator: "mcq_exact",
    hint: "Une dispersion est positive ou nulle.",
    explanation: exp(
      "L'écart type est une mesure d'écart (basée sur des carrés).",
      "Il est toujours positif ou nul.",
      "Il vaut $0$ uniquement si toutes les valeurs sont égales.",
      "Non, l'écart type n'est jamais négatif."
    ),
    tags: ["seconde", "maths", "statistiques", "ecart_type", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_et_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_ecart_type",
    difficulty: 4,
    theme: "neutral",
    text: "Dans une fonction Python renvoyant la moyenne $m$ et l'écart type $s$, que représente l'intervalle $[m - 2s\\,;m + 2s]$ ?",
    format: "qcm",
    choices: [
      "une plage autour de la moyenne contenant la plupart des valeurs",
      "la valeur maximale",
      "la médiane",
      "l'effectif total",
    ],
    expected: ["une plage autour de la moyenne contenant la plupart des valeurs"],
    comparator: "mcq_exact",
    hint: "$m \\pm 2s$ : autour de la moyenne.",
    explanation: exp(
      "On encadre la moyenne avec deux écarts types.",
      "$[m - 2s\\,;m + 2s]$ contient en général une grande part des données.",
      "C'est une plage de valeurs « habituelles ».",
      "Une plage autour de la moyenne contenant la plupart des valeurs."
    ),
    tags: ["seconde", "maths", "statistiques", "ecart_type", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_et_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_ecart_type",
    difficulty: 3,
    theme: "neutral",
    text: "Une série A a un écart type de $1$, une série B de $5$ (même moyenne). Laquelle est la plus régulière ?",
    format: "qcm",
    choices: ["La série A", "La série B", "Elles sont identiques", "On ne peut pas savoir"],
    expected: ["La série A"],
    comparator: "mcq_exact",
    hint: "Petit écart type = valeurs regroupées.",
    explanation: exp(
      "Un petit écart type signale des valeurs proches de la moyenne.",
      "La série A ($1$) est plus regroupée que B ($5$).",
      "A est donc plus régulière.",
      "La série A est la plus régulière."
    ),
    tags: ["seconde", "maths", "statistiques", "ecart_type", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_et_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_ecart_type",
    difficulty: 2,
    theme: "neutral",
    text: "L'écart type et la moyenne forment souvent un couple d'indicateurs. La moyenne indique le « centre », et l'écart type indique :",
    format: "qcm",
    choices: ["la dispersion", "le maximum", "la médiane", "l'effectif"],
    expected: ["la dispersion"],
    comparator: "mcq_exact",
    hint: "Centre + étalement.",
    explanation: exp(
      "Moyenne et écart type se complètent.",
      "La moyenne situe le centre, l'écart type mesure l'étalement.",
      "C'est le couple (position, dispersion).",
      "L'écart type indique la dispersion."
    ),
    tags: ["seconde", "maths", "statistiques", "ecart_type", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_et_fixed_9",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_ecart_type",
    difficulty: 3,
    theme: "neutral",
    text: "Comment obtient-on en pratique l'écart type d'une série en seconde ?",
    format: "qcm",
    choices: [
      "avec la calculatrice ou un programme (Python, tableur)",
      "en calculant max $-$ min",
      "en prenant la médiane",
      "en additionnant les valeurs",
    ],
    expected: ["avec la calculatrice ou un programme (Python, tableur)"],
    comparator: "mcq_exact",
    hint: "Le calcul à la main est long ; on utilise un outil.",
    explanation: exp(
      "Le calcul de l'écart type est fastidieux à la main.",
      "En seconde, on l'obtient avec la calculatrice, un tableur ou Python.",
      "On se concentre sur son interprétation.",
      "Avec la calculatrice ou un programme."
    ),
    tags: ["seconde", "maths", "statistiques", "ecart_type", "raisonnement", "qcm"],
  },

  /* ===================== STAT_INTERPRETER ===================== */

  {
    kind: "fixed",
    id: "seconde_stat_int_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Deux séries ont la même moyenne mais des écarts types différents. Cela signifie qu'elles diffèrent par leur :",
    format: "qcm",
    choices: ["dispersion", "centre", "effectif", "médiane forcément"],
    expected: ["dispersion"],
    comparator: "mcq_exact",
    hint: "Même centre, étalement différent.",
    explanation: exp(
      "La moyenne (centre) est identique.",
      "L'écart type (dispersion) diffère.",
      "Elles diffèrent donc par leur dispersion.",
      "Par leur dispersion."
    ),
    tags: ["seconde", "maths", "statistiques", "interpreter", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_int_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une entreprise, la moyenne des salaires est élevée mais la médiane est faible. Cela suggère :",
    format: "qcm",
    choices: [
      "quelques très hauts salaires tirent la moyenne vers le haut",
      "tous les salaires sont identiques",
      "il n'y a pas de hauts salaires",
      "la moyenne est fausse",
    ],
    expected: ["quelques très hauts salaires tirent la moyenne vers le haut"],
    comparator: "mcq_exact",
    hint: "La moyenne est sensible aux extrêmes, pas la médiane.",
    explanation: exp(
      "La moyenne est sensible aux valeurs extrêmes ; la médiane non.",
      "Moyenne élevée + médiane faible = quelques très grandes valeurs.",
      "Ces hauts salaires tirent la moyenne vers le haut.",
      "Quelques très hauts salaires tirent la moyenne vers le haut."
    ),
    tags: ["seconde", "maths", "statistiques", "interpreter", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_int_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_interpreter",
    difficulty: 2,
    theme: "sport",
    text: "Un joueur a une moyenne de $2$ buts/match avec un petit écart type. Cela signifie qu'il est :",
    format: "qcm",
    choices: ["régulier", "irrégulier", "le meilleur buteur", "blessé"],
    expected: ["régulier"],
    comparator: "mcq_exact",
    hint: "Petit écart type = régulier.",
    explanation: exp(
      "Un petit écart type indique peu de variation.",
      "Le joueur marque un nombre de buts proche de $2$ à chaque match.",
      "Il est donc régulier.",
      "Il est régulier."
    ),
    tags: ["seconde", "maths", "statistiques", "interpreter", "sport", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_int_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Pour comparer deux séries, on s'appuie en général sur :",
    format: "qcm",
    choices: [
      "un indicateur de position (moyenne/médiane) ET un de dispersion (écart type/écart interquartile)",
      "uniquement la plus grande valeur",
      "uniquement l'effectif",
      "uniquement l'étendue",
    ],
    expected: ["un indicateur de position (moyenne/médiane) ET un de dispersion (écart type/écart interquartile)"],
    comparator: "mcq_exact",
    hint: "Centre + étalement.",
    explanation: exp(
      "Comparer deux séries demande deux types d'indicateurs.",
      "Position (où est le centre) et dispersion (comment c'est étalé).",
      "On combine donc moyenne/médiane et écart type/écart interquartile.",
      "Un indicateur de position ET un de dispersion."
    ),
    tags: ["seconde", "maths", "statistiques", "interpreter", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_int_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle ville a un climat plus « stable » : A (températures d'écart type $2°$) ou B (écart type $9°$) ?",
    format: "qcm",
    choices: ["La ville A", "La ville B", "Identique", "On ne peut pas savoir"],
    expected: ["La ville A"],
    comparator: "mcq_exact",
    hint: "Stable = peu de variation.",
    explanation: exp(
      "Un climat stable a des températures peu dispersées.",
      "La ville A a un écart type plus petit ($2°$ contre $9°$).",
      "Ses températures varient moins.",
      "La ville A a le climat le plus stable."
    ),
    tags: ["seconde", "maths", "statistiques", "interpreter", "ecologie", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_int_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "La médiane est souvent préférée à la moyenne quand la série contient :",
    format: "qcm",
    choices: ["des valeurs extrêmes (aberrantes)", "uniquement des valeurs égales", "peu de valeurs", "des valeurs positives"],
    expected: ["des valeurs extrêmes (aberrantes)"],
    comparator: "mcq_exact",
    hint: "La médiane résiste aux extrêmes.",
    explanation: exp(
      "La moyenne est tirée par les valeurs extrêmes ; la médiane non.",
      "En présence de valeurs aberrantes, la médiane est plus représentative.",
      "On la préfère alors à la moyenne.",
      "Quand la série contient des valeurs extrêmes."
    ),
    tags: ["seconde", "maths", "statistiques", "interpreter", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_int_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "La moyenne d'une série est un indicateur de :",
    format: "qcm",
    choices: ["position (tendance centrale)", "dispersion", "fréquence", "effectif"],
    expected: ["position (tendance centrale)"],
    comparator: "mcq_exact",
    hint: "Elle situe le « centre ».",
    explanation: exp(
      "La moyenne résume la série par une valeur centrale.",
      "C'est un indicateur de position (ou tendance centrale).",
      "Elle ne mesure pas la dispersion.",
      "Indicateur de position."
    ),
    tags: ["seconde", "maths", "statistiques", "interpreter", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_stat_int_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Deux quartiers trient en moyenne autant de déchets, mais le quartier X a un écart interquartile bien plus grand. Cela indique que dans X :",
    format: "qcm",
    choices: [
      "les comportements sont plus variés d'un foyer à l'autre",
      "tous les foyers trient pareil",
      "personne ne trie",
      "il y a moins de foyers",
    ],
    expected: ["les comportements sont plus variés d'un foyer à l'autre"],
    comparator: "mcq_exact",
    hint: "Grand écart interquartile = grande dispersion.",
    explanation: exp(
      "À moyenne égale, l'écart interquartile compare la dispersion.",
      "Un grand écart interquartile signale des comportements très variés.",
      "Dans X, les foyers trient de façon plus hétérogène.",
      "Les comportements sont plus variés."
    ),
    tags: ["seconde", "maths", "statistiques", "interpreter", "ecologie", "raisonnement", "qcm"],
  },
];
