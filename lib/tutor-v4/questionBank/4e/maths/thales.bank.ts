import type {
  TutorBankItemV4,
  ThalesCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function thalesCanvas(
  params: Omit<ThalesCanvasData, "kind" | "variant">
): ThalesCanvasData {
  return {
    kind: "thales",
    variant: "triangle",
    ...params,
  };
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

export const thalesBank: TutorBankItemV4[] = [
  /* =========================
     THALES_CONFIGURATION
  ========================= */

  {
    kind: "fixed",
    id: "thales_theoreme_configuration_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une configuration de Thalès en 4e, on cherche souvent...",
    format: "qcm",
    choices: [
      "deux droites parallèles dans un triangle",
      "un triangle rectangle",
      "un cercle et un diamètre",
      "un parallélogramme",
    ],
    expected: ["deux droites parallèles dans un triangle"],
    comparator: "mcq_exact",
    hint: "Thalès utilise une configuration avec des droites parallèles.",
    explanation:
      "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("En 4e, la configuration classique de Thalès se fait dans un triangle avec une droite parallèle à un côté.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    tags: ["thales_theoreme_theoreme", "configuration", "qcm"],
  },

  {
    kind: "fixed",
    id: "thales_theoreme_configuration_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 1,
    theme: "neutral",
    text: "Sur la figure, si (MN) est parallèle à (BC), peut-on reconnaître une configuration de Thalès ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Regarde si une droite est parallèle à un côté du triangle.",
    explanation:
      "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("Oui. Dans le triangle ABC, M est sur [AB], N est sur [AC] et (MN) est parallèle à (BC).") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    canvas: thalesCanvas({
      display: {
        showPoints: true,
        showLabels: true,
        showSideLabels: false,
        showParallelMarks: true,
        highlightParallel: true,
      },
    }),
    tags: ["thales_theoreme_theoreme", "configuration", "canvas"],
  },

  {
    kind: "template",
    id: "thales_theoreme_configuration_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    hint: "Thalès nécessite une droite parallèle à un côté du triangle.",
    tags: ["thales_theoreme_theoreme", "configuration", "template", "canvas"],
    generate: () => {
      const parallel = randomChoice([true, false]);

      return {
        text: parallel
          ? "Dans le triangle ABC, M est sur [AB], N est sur [AC] et (MN) est parallèle à (BC). Peut-on utiliser Thalès ?"
          : "Dans le triangle ABC, M est sur [AB], N est sur [AC], mais on ne sait pas si (MN) est parallèle à (BC). Peut-on utiliser Thalès directement ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: [parallel ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          (parallel
          ? "Oui, les conditions de la configuration de Thalès sont réunies."
          : "Non, il manque l’information de parallélisme. On ne peut pas utiliser Thalès directement.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
        canvas: thalesCanvas({
          display: {
            showPoints: true,
            showLabels: true,
            showSideLabels: false,
            showParallelMarks: parallel,
            highlightParallel: parallel,
          },
        }),
      };
    },
  },

  /* =========================
     THALES_RAPPORTS
  ========================= */

  {
    kind: "fixed",
    id: "thales_theoreme_rapport_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle ABC, avec M sur [AB], N sur [AC] et (MN) parallèle à (BC), quelle égalité de rapports est correcte ?",
    format: "qcm",
    choices: [
      "AM / AB = AN / AC",
      "AB / AM = AN / BC",
      "AM / AC = AN / AB",
      "MN / AM = BC / AN",
    ],
    expected: ["AM / AB = AN / AC"],
    comparator: "mcq_exact",
    hint: "On compare les longueurs sur les mêmes demi-droites issues de A.",
    explanation:
      "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("Dans cette configuration, on a AM / AB = AN / AC = MN / BC.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    canvas: thalesCanvas({
      display: {
        showPoints: true,
        showLabels: true,
        showSideLabels: false,
        showParallelMarks: true,
      },
    }),
    tags: ["thales_theoreme_theoreme", "rapport", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "thales_theoreme_rapport_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 2,
    theme: "neutral",
    hint: "Associe les petites longueurs avec les grandes longueurs correspondantes.",
    tags: ["thales_theoreme_theoreme", "rapport", "template"],
    generate: () => {
      return {
        text: "Dans une configuration de Thalès, complète : AM / AB = ...",
        format: "qcm",
        choices: makeChoices("AN / AC", [
          "AC / AN",
          "AB / AM",
          "MN / AM",
        ]),
        expected: ["AN / AC"],
        comparator: "mcq_exact",
        explanation:
          "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("Les longueurs AM et AB sont sur la même demi-droite. De même, AN et AC sont sur l’autre demi-droite. Donc AM / AB = AN / AC.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
        canvas: thalesCanvas({
          display: {
            showPoints: true,
            showLabels: true,
            showSideLabels: false,
            showParallelMarks: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "thales_theoreme_rapport_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Les rapports doivent comparer petit côté / grand côté sur les deux côtés du triangle.",
    tags: ["thales_theoreme_theoreme", "rapport", "piege", "template"],
    generate: () => {
      const am = randomInt(2, 6);
      const ab = am * 2;
      const an = randomInt(3, 7);
      const ac = an * 2;

      return {
        text: `On sait que AM = ${am} cm, AB = ${ab} cm, AN = ${an} cm et AC = ${ac} cm. Quelle comparaison correspond à Thalès ?`,
        format: "qcm",
        choices: makeChoices(`${am}/${ab} = ${an}/${ac}`, [
          `${ab}/${am} = ${an}/${ac}`,
          `${am}/${ac} = ${an}/${ab}`,
          `${am}/${an} = ${ab}/${ac}`,
        ]),
        expected: [`${am}/${ab} = ${an}/${ac}`],
        comparator: "mcq_exact",
        explanation: "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          (`On compare les longueurs correspondantes : AM / AB = AN / AC, donc ${am}/${ab} = ${an}/${ac}.`) +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
        canvas: thalesCanvas({
          sideLabels: {
            AM: `${am} cm`,
            AB: `${ab} cm`,
            AN: `${an} cm`,
            AC: `${ac} cm`,
          },
          display: {
            showPoints: true,
            showLabels: true,
            showSideLabels: true,
            showParallelMarks: true,
          },
        }),
      };
    },
  },

  /* =========================
     THALES_CALCULER_LONGUEUR
  ========================= */

  {
    kind: "fixed",
    id: "thales_theoreme_calculer_longueur_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une configuration de Thalès, AM = 3 cm, AB = 6 cm et AN = 4 cm. Quelle est la longueur AC ?",
    format: "qcm",
    choices: ["2 cm", "6 cm", "8 cm", "12 cm"],
    expected: ["8 cm"],
    comparator: "mcq_exact",
    hint: "3 / 6 = 4 / AC.",
    explanation:
      "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("On a 3 / 6 = 4 / AC. Comme 3 / 6 = 1 / 2, alors AC = 8 cm.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    canvas: thalesCanvas({
      sideLabels: {
        AM: "3 cm",
        AB: "6 cm",
        AN: "4 cm",
        AC: "?",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSideLabels: true,
        showParallelMarks: true,
      },
    }),
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "thales_theoreme_calculer_longueur_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise AM / AB = AN / AC.",
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "template", "canvas"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const am = randomInt(2, 6);
      const an = randomInt(2, 7);
      const ab = am * k;
      const ac = an * k;

      return {
        text: `Dans une configuration de Thalès, AM = ${am} cm, AB = ${ab} cm et AN = ${an} cm. Calculer AC.`,
        format: "short",
        expected: [String(ac)],
        comparator: "number_equal",
        explanation: "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          (`AM / AB = AN / AC, donc ${am}/${ab} = ${an}/AC. Le coefficient est ${k}, donc AC = ${an} × ${k} = ${ac} cm.`) +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
        canvas: thalesCanvas({
          sideLabels: {
            AM: `${am} cm`,
            AB: `${ab} cm`,
            AN: `${an} cm`,
            AC: "?",
          },
          display: {
            showPoints: true,
            showLabels: true,
            showSideLabels: true,
            showParallelMarks: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "thales_theoreme_calculer_longueur_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "Cette fois, on cherche la petite longueur AM.",
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const am = randomInt(2, 6);
      const an = randomInt(2, 7);
      const ab = am * k;
      const ac = an * k;

      return {
        text: `Dans une configuration de Thalès, AB = ${ab} cm, AN = ${an} cm et AC = ${ac} cm. Calculer AM.`,
        format: "short",
        expected: [String(am)],
        comparator: "number_equal",
        explanation: "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          (`On a AM / AB = AN / AC. Or ${an}/${ac} = 1/${k}. Donc AM / ${ab} = 1/${k}, alors AM = ${am} cm.`) +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
        canvas: thalesCanvas({
          sideLabels: {
            AM: "?",
            AB: `${ab} cm`,
            AN: `${an} cm`,
            AC: `${ac} cm`,
          },
          display: {
            showPoints: true,
            showLabels: true,
            showSideLabels: true,
            showParallelMarks: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "thales_theoreme_calculer_longueur_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris l’égalité de rapports, puis fais une quatrième proportionnelle.",
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "quatrieme_proportionnelle"],
    generate: () => {
      const am = randomChoice([3, 4, 5, 6]);
      const ab = randomChoice([9, 12, 15, 18]);
      const an = randomChoice([4, 5, 7, 8]);
      const ac = (ab * an) / am;

      if (!Number.isInteger(ac)) {
        return {
          text: `Dans une configuration de Thalès, AM = 4 cm, AB = 12 cm et AN = 5 cm. Calculer AC.`,
          format: "short",
          expected: ["15"],
          comparator: "number_equal",
          explanation:
            "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("AM / AB = AN / AC, donc 4 / 12 = 5 / AC. Le coefficient est 3, donc AC = 15 cm.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
          canvas: thalesCanvas({
            sideLabels: {
              AM: "4 cm",
              AB: "12 cm",
              AN: "5 cm",
              AC: "?",
            },
            display: {
              showPoints: true,
              showLabels: true,
              showSideLabels: true,
              showParallelMarks: true,
            },
          }),
        };
      }

      return {
        text: `Dans une configuration de Thalès, AM = ${am} cm, AB = ${ab} cm et AN = ${an} cm. Calculer AC.`,
        format: "short",
        expected: [String(ac)],
        comparator: "number_equal",
        explanation: "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          (`AM / AB = AN / AC, donc ${am}/${ab} = ${an}/AC. Ainsi AC = ${ab} × ${an} ÷ ${am} = ${ac} cm.`) +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
        canvas: thalesCanvas({
          sideLabels: {
            AM: `${am} cm`,
            AB: `${ab} cm`,
            AN: `${an} cm`,
            AC: "?",
          },
          display: {
            showPoints: true,
            showLabels: true,
            showSideLabels: true,
            showParallelMarks: true,
          },
        }),
      };
    },
  },

  /* =========================
     THALES_RECIPROQUE_VERIFIER
  ========================= */

  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_verifier_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "On a AM = 3 cm, AB = 6 cm, AN = 4 cm et AC = 8 cm. Les rapports AM/AB et AN/AC sont-ils égaux ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare 3/6 et 4/8.",
    explanation: "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("3/6 = 1/2 et 4/8 = 1/2. Les rapports sont égaux.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    canvas: thalesCanvas({
      sideLabels: {
        AM: "3 cm",
        AB: "6 cm",
        AN: "4 cm",
        AC: "8 cm",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSideLabels: true,
        showParallelMarks: false,
      },
    }),
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier"],
  },

  {
    kind: "template",
    id: "thales_theoreme_reciproque_verifier_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les deux rapports petit/grand.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "template"],
    generate: () => {
      const equal = randomChoice([true, false]);
      const k = randomChoice([2, 3, 4]);
      const am = randomInt(2, 6);
      const an = randomInt(2, 7);
      const ab = am * k;
      const ac = equal ? an * k : an * k + randomChoice([1, 2]);

      return {
        text: `On a AM = ${am} cm, AB = ${ab} cm, AN = ${an} cm et AC = ${ac} cm. Les rapports AM/AB et AN/AC sont-ils égaux ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [equal ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          (equal
          ? `${am}/${ab} = ${an}/${ac}. Les rapports sont égaux.`
          : `${am}/${ab} n’est pas égal à ${an}/${ac}. Les rapports ne sont pas égaux.`) +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
        canvas: thalesCanvas({
          sideLabels: {
            AM: `${am} cm`,
            AB: `${ab} cm`,
            AN: `${an} cm`,
            AC: `${ac} cm`,
          },
          display: {
            showPoints: true,
            showLabels: true,
            showSideLabels: true,
            showParallelMarks: false,
          },
        }),
      };
    },
  },

  /* =========================
     THALES_RECIPROQUE_CONCLURE
  ========================= */

  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_conclure_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Si M est sur [AB], N est sur [AC] et AM/AB = AN/AC, alors on peut conclure que...",
    format: "qcm",
    choices: [
      "(MN) est parallèle à (BC)",
      "le triangle ABC est rectangle",
      "AB = AC",
      "M est le milieu de [AB]",
    ],
    expected: ["(MN) est parallèle à (BC)"],
    comparator: "mcq_exact",
    hint: "C’est la réciproque de Thalès.",
    explanation:
      "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("D’après la réciproque du théorème de Thalès, si les rapports sont égaux, alors les droites sont parallèles.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure"],
  },

  {
    kind: "template",
    id: "thales_theoreme_reciproque_conclure_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie d’abord l’égalité des rapports.",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure", "template"],
    generate: () => {
      const equal = randomChoice([true, false]);
      const k = randomChoice([2, 3]);
      const am = randomChoice([3, 4, 5]);
      const an = randomChoice([4, 6, 7]);
      const ab = am * k;
      const ac = equal ? an * k : an * k + 1;

      return {
        text: `M est sur [AB] et N est sur [AC]. AM = ${am}, AB = ${ab}, AN = ${an}, AC = ${ac}. Peut-on conclure que (MN) est parallèle à (BC) ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [equal ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          (equal
          ? `Oui. ${am}/${ab} = ${an}/${ac}. D’après la réciproque de Thalès, (MN) est parallèle à (BC).`
          : `Non. ${am}/${ab} n’est pas égal à ${an}/${ac}. On ne peut pas conclure que (MN) est parallèle à (BC).`) +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
        canvas: thalesCanvas({
          sideLabels: {
            AM: `${am}`,
            AB: `${ab}`,
            AN: `${an}`,
            AC: `${ac}`,
          },
          display: {
            showPoints: true,
            showLabels: true,
            showSideLabels: true,
            showParallelMarks: false,
          },
        }),
      };
    },
  },

  /* =========================
     THALES_REDIGER
  ========================= */

  {
    kind: "fixed",
    id: "thales_theoreme_rediger_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle phrase convient pour commencer une rédaction avec le théorème de Thalès ?",
    format: "qcm",
    choices: [
      "Dans le triangle ABC, M appartient à [AB], N appartient à [AC] et (MN) est parallèle à (BC).",
      "Dans le triangle ABC rectangle en A.",
      "Comme les diagonales se coupent en leur milieu.",
      "On additionne toutes les longueurs.",
    ],
    expected: [
      "Dans le triangle ABC, M appartient à [AB], N appartient à [AC] et (MN) est parallèle à (BC).",
    ],
    comparator: "mcq_exact",
    hint: "Il faut annoncer la configuration et le parallélisme.",
    explanation:
      "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("Pour utiliser le théorème de Thalès, on commence par préciser la configuration et les droites parallèles.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    tags: ["thales_theoreme_theoreme", "redaction", "qcm"],
  },

  {
    kind: "fixed",
    id: "thales_theoreme_rediger_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre le théorème de Thalès et sa réciproque.",
    format: "open",
    expected: ["théorème", "réciproque", "parallèle"],
    comparator: "contains_keyword",
    hint: "Dans un cas, on sait déjà que les droites sont parallèles. Dans l’autre, on veut le prouver.",
    explanation:
      "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("Le théorème de Thalès sert à calculer une longueur quand on sait que les droites sont parallèles. La réciproque sert à démontrer que deux droites sont parallèles à partir de rapports égaux.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    tags: ["thales_theoreme_theoreme", "redaction", "open"],
  },

  {
    kind: "template",
    id: "thales_theoreme_rediger_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par écrire la configuration, puis l’égalité des rapports.",
    tags: ["thales_theoreme_theoreme", "redaction", "template"],
    generate: () => {
      const k = randomChoice([2, 3]);
      const am = randomInt(2, 6);
      const an = randomInt(3, 7);
      const ab = am * k;
      const ac = an * k;

      return {
        text: `Rédige le début du raisonnement pour calculer AC sachant que AM = ${am}, AB = ${ab}, AN = ${an} et (MN) // (BC).`,
        format: "open",
        expected: ["triangle", "parallèle", "AM", "AB", "AN", "AC"],
        comparator: "contains_keyword",
        explanation: "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          (`Dans le triangle ABC, M appartient à [AB], N appartient à [AC] et (MN) est parallèle à (BC). D’après le théorème de Thalès, AM/AB = AN/AC.`) +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
        canvas: thalesCanvas({
          sideLabels: {
            AM: `${am}`,
            AB: `${ab}`,
            AN: `${an}`,
            AC: "?",
          },
          display: {
            showPoints: true,
            showLabels: true,
            showSideLabels: true,
            showParallelMarks: true,
          },
        }),
      };
    },
  },

  /* =========================
     THALES_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "thales_theoreme_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « Les longueurs sont dans un triangle, donc je peux toujours utiliser Thalès. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut une condition de parallélisme.",
    explanation:
      "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("Non. Pour utiliser le théorème de Thalès, il faut une configuration avec des droites parallèles.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    tags: ["thales_theoreme_theoreme", "defi", "erreur"],
  },

  {
    kind: "template",
    id: "thales_theoreme_defi_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Modélise la situation par une configuration de Thalès.",
    tags: ["thales_theoreme_theoreme", "defi", "reunion", "probleme"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const petit = randomChoice([2, 3, 4, 5]);
      const ombreObjet = randomChoice([3, 4, 5, 6]);
      const grand = petit * k;
      const ombreArbre = ombreObjet * k;

      return {
        text: `À La Réunion, un poteau de ${petit} m a une ombre de ${ombreObjet} m. Au même moment, l’ombre d’un arbre mesure ${ombreArbre} m. Quelle est la hauteur de l’arbre ?`,
        format: "short",
        expected: [String(grand)],
        comparator: "number_equal",
        explanation: "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          (`Les rayons du soleil donnent une configuration de Thalès. Le coefficient est ${ombreArbre} ÷ ${ombreObjet} = ${k}. La hauteur de l’arbre vaut ${petit} × ${k} = ${grand} m.`) +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
      };
    },
  },

  {
    kind: "template",
    id: "thales_theoreme_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les rapports avant de conclure.",
    tags: ["thales_theoreme_theoreme", "defi", "reciproque", "piege"],
    generate: () => {
      const equal = randomChoice([true, false]);
      const k = randomChoice([2, 3]);
      const am = randomChoice([3, 4, 5]);
      const an = randomChoice([4, 5, 6]);
      const ab = am * k;
      const ac = equal ? an * k : an * k + 2;

      return {
        text: `Pour vérifier si deux droites sont parallèles, on mesure : AM = ${am}, AB = ${ab}, AN = ${an}, AC = ${ac}. Peut-on conclure que les droites sont parallèles ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [equal ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          (equal
          ? `Oui, car ${am}/${ab} = ${an}/${ac}. Les rapports sont égaux.`
          : `Non, car ${am}/${ab} n’est pas égal à ${an}/${ac}.`) +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
        canvas: thalesCanvas({
          sideLabels: {
            AM: `${am}`,
            AB: `${ab}`,
            AN: `${an}`,
            AC: `${ac}`,
          },
          display: {
            showPoints: true,
            showLabels: true,
            showSideLabels: true,
            showParallelMarks: false,
          },
        }),
      };
    },
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- THALES_CONFIGURATION ----------
  {
    kind: "fixed",
    id: "thales_theoreme_configuration_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle condition est indispensable pour utiliser le théorème de Thalès ?",
    format: "qcm",
    choices: [
      "deux droites parallèles",
      "un angle droit",
      "trois côtés égaux",
      "un cercle",
    ],
    expected: ["deux droites parallèles"],
    comparator: "mcq_exact",
    hint: "Thalès repose sur le parallélisme.",
    explanation:
      "Définition : le théorème de Thalès s’applique dans une configuration avec deux droites parallèles.\n\n" +
      "Méthode : on vérifie la présence de droites parallèles.\n\n" +
      "Calcul : sans parallélisme, on ne peut pas appliquer Thalès.\n\n" +
      "Conclusion : il faut deux droites parallèles.",
    tags: ["thales_theoreme_theoreme", "configuration", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_configuration_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle ABC, M ∈ [AB] et N ∈ [AC]. Quelle information manque pour appliquer Thalès ?",
    format: "qcm",
    choices: [
      "savoir que (MN) est parallèle à (BC)",
      "savoir que ABC est isocèle",
      "connaître l’aire du triangle",
      "savoir que M est le milieu de [AB]",
    ],
    expected: ["savoir que (MN) est parallèle à (BC)"],
    comparator: "mcq_exact",
    hint: "Le parallélisme est la clé.",
    explanation:
      "Définition : Thalès nécessite une droite parallèle à un côté du triangle.\n\n" +
      "Méthode : on cherche l’information de parallélisme.\n\n" +
      "Calcul : il faut savoir que (MN) // (BC).\n\n" +
      "Conclusion : l’information manquante est le parallélisme de (MN) et (BC).",
    tags: ["thales_theoreme_theoreme", "configuration", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_configuration_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 1,
    theme: "neutral",
    text: "Dans quelle figure reconnaît-on une configuration de Thalès (en 4e) ?",
    format: "qcm",
    choices: [
      "un triangle coupé par une droite parallèle à un côté",
      "un carré",
      "un cercle",
      "un losange",
    ],
    expected: ["un triangle coupé par une droite parallèle à un côté"],
    comparator: "mcq_exact",
    hint: "Triangle + droite parallèle.",
    explanation:
      "Définition : en 4e, la configuration de Thalès est un triangle coupé par une parallèle à un côté.\n\n" +
      "Méthode : on repère le triangle et la droite parallèle.\n\n" +
      "Calcul : c’est le triangle avec une parallèle à un côté.\n\n" +
      "Conclusion : la bonne figure est le triangle coupé par une parallèle.",
    tags: ["thales_theoreme_theoreme", "configuration", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_configuration_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle ABC, M ∈ [AB], N ∈ [AC] et (MN) // (BC). Quel sommet est commun aux deux triangles AMN et ABC ?",
    format: "qcm",
    choices: ["A", "B", "C", "M"],
    expected: ["A"],
    comparator: "mcq_exact",
    hint: "Les deux triangles partagent le sommet d’où partent les demi-droites.",
    explanation:
      "Définition : dans cette configuration, les triangles AMN et ABC partagent un sommet.\n\n" +
      "Méthode : on repère le sommet commun.\n\n" +
      "Calcul : les demi-droites partent de A.\n\n" +
      "Conclusion : le sommet commun est A.",
    canvas: thalesCanvas({
      display: { showPoints: true, showLabels: true, showSideLabels: false, showParallelMarks: true },
    }),
    tags: ["thales_theoreme_theoreme", "configuration", "canvas", "qcm"],
  },
  {
    kind: "template",
    id: "thales_theoreme_configuration_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    hint: "Thalès demande une parallèle à un côté.",
    tags: ["thales_theoreme_theoreme", "configuration", "template", "canvas"],
    generate: () => {
      const parallel = randomChoice([true, false]);
      return {
        text: parallel
          ? "Dans le triangle ABC, (MN) est codée parallèle à (BC). Est-on dans une configuration de Thalès ?"
          : "Dans le triangle ABC, aucune droite n’est codée parallèle à un côté. Est-on dans une configuration de Thalès ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: [parallel ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : Thalès demande une droite parallèle à un côté du triangle.\n\n" +
          "Méthode : on vérifie le parallélisme.\n\n" +
          `Calcul : ${parallel ? "le parallélisme est présent" : "aucun parallélisme n’est indiqué"}.\n\n` +
          `Conclusion : ${parallel ? "oui, c’est une configuration de Thalès" : "non, ce n’est pas une configuration de Thalès"}.`,
        canvas: thalesCanvas({
          display: {
            showPoints: true,
            showLabels: true,
            showSideLabels: false,
            showParallelMarks: parallel,
            highlightParallel: parallel,
          },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "thales_theoreme_configuration_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    hint: "Les points doivent être sur les côtés issus du même sommet.",
    tags: ["thales_theoreme_theoreme", "configuration", "template"],
    generate: () => {
      const ok = randomChoice([true, false]);
      return {
        text: ok
          ? "M est sur [AB], N est sur [AC] et (MN) // (BC). Peut-on appliquer Thalès dans le triangle ABC ?"
          : "M est sur [AB], N est sur [BC] (pas sur [AC]). Peut-on appliquer Thalès dans le triangle ABC comme d’habitude ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: [ok ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : les points doivent être sur deux côtés issus du même sommet, avec une parallèle au troisième.\n\n" +
          "Méthode : on vérifie la position des points et le parallélisme.\n\n" +
          `Calcul : ${ok ? "M et N sont bien sur [AB] et [AC] avec (MN) // (BC)" : "N n’est pas sur [AC], la configuration n’est pas standard"}.\n\n` +
          `Conclusion : ${ok ? "oui" : "non"}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "thales_theoreme_configuration_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    text: "Décris les éléments d’une configuration de Thalès dans un triangle.",
    format: "open",
    expected: ["triangle", "parallèle", "points"],
    comparator: "contains_keyword",
    hint: "Pense au triangle, aux points sur deux côtés et à la parallèle.",
    explanation:
      "Définition : une configuration de Thalès comprend un triangle, deux points sur deux côtés issus d’un même sommet, et une droite parallèle au troisième côté.\n\n" +
      "Méthode : on identifie ces trois éléments.\n\n" +
      "Calcul : par exemple M sur [AB], N sur [AC], (MN) // (BC).\n\n" +
      "Conclusion : triangle + points sur deux côtés + parallèle au troisième côté.",
    tags: ["thales_theoreme_theoreme", "configuration", "open"],
  },

  // ---------- THALES_RAPPORTS ----------
  {
    kind: "fixed",
    id: "thales_theoreme_rapport_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une configuration de Thalès, à quoi est égal AN / AC ?",
    format: "qcm",
    choices: ["AM / AB", "AB / AM", "AC / AN", "BC / MN"],
    expected: ["AM / AB"],
    comparator: "mcq_exact",
    hint: "Les longueurs correspondantes sont sur les mêmes demi-droites.",
    explanation:
      "Définition : Thalès donne AM / AB = AN / AC = MN / BC.\n\n" +
      "Méthode : on associe les longueurs correspondantes.\n\n" +
      "Calcul : AN / AC = AM / AB.\n\n" +
      "Conclusion : AN / AC = AM / AB.",
    tags: ["thales_theoreme_theoreme", "rapport", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_rapport_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une configuration de Thalès, à quoi est égal MN / BC ?",
    format: "qcm",
    choices: ["AM / AB", "AB / AM", "BC / MN", "AN / MN"],
    expected: ["AM / AB"],
    comparator: "mcq_exact",
    hint: "MN et BC sont les côtés « parallèles ».",
    explanation:
      "Définition : Thalès donne AM / AB = AN / AC = MN / BC.\n\n" +
      "Méthode : MN / BC complète la chaîne des rapports égaux.\n\n" +
      "Calcul : MN / BC = AM / AB.\n\n" +
      "Conclusion : MN / BC = AM / AB.",
    tags: ["thales_theoreme_theoreme", "rapport", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_rapport_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de rapports égaux écrit-on dans le théorème de Thalès ?",
    format: "qcm",
    choices: ["trois", "deux", "un", "quatre"],
    expected: ["trois"],
    comparator: "mcq_exact",
    hint: "AM/AB = AN/AC = MN/BC.",
    explanation:
      "Définition : Thalès écrit trois rapports égaux : AM/AB = AN/AC = MN/BC.\n\n" +
      "Méthode : on compte les rapports.\n\n" +
      "Calcul : il y en a trois.\n\n" +
      "Conclusion : trois rapports égaux.",
    tags: ["thales_theoreme_theoreme", "rapport", "qcm"],
  },
  {
    kind: "template",
    id: "thales_theoreme_rapport_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 2,
    theme: "neutral",
    hint: "Associe les longueurs correspondantes.",
    tags: ["thales_theoreme_theoreme", "rapport", "template"],
    generate: () => {
      return {
        text: "Dans une configuration de Thalès, complète : AN / AC = ...",
        format: "qcm",
        choices: makeChoices("AM / AB", ["AB / AM", "AC / AN", "BC / AN"]),
        expected: ["AM / AB"],
        comparator: "mcq_exact",
        explanation:
          "Définition : Thalès donne AM / AB = AN / AC = MN / BC.\n\n" +
          "Méthode : on associe les longueurs correspondantes.\n\n" +
          "Calcul : AN / AC = AM / AB.\n\n" +
          "Conclusion : AN / AC = AM / AB.",
        canvas: thalesCanvas({
          display: { showPoints: true, showLabels: true, showSideLabels: false, showParallelMarks: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "thales_theoreme_rapport_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Petit côté / grand côté sur chaque demi-droite.",
    tags: ["thales_theoreme_theoreme", "rapport", "template"],
    generate: () => {
      const k = randomChoice([2, 3]);
      const am = randomInt(2, 6);
      const an = randomInt(2, 7);
      const ab = am * k;
      const ac = an * k;
      return {
        text: `On a AM = ${am}, AB = ${ab}, AN = ${an}, AC = ${ac}. Quelle égalité de Thalès est correcte ?`,
        format: "qcm",
        choices: makeChoices(`${am}/${ab} = ${an}/${ac}`, [
          `${ab}/${am} = ${an}/${ac}`,
          `${am}/${an} = ${ab}/${ac}`,
          `${am}/${ac} = ${an}/${ab}`,
        ]),
        expected: [`${am}/${ab} = ${an}/${ac}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : Thalès compare les longueurs correspondantes.\n\n" +
          "Méthode : AM et AB sur une demi-droite, AN et AC sur l’autre.\n\n" +
          `Calcul : ${am}/${ab} = ${an}/${ac}.\n\n` +
          "Conclusion : l’égalité correcte est AM/AB = AN/AC.",
        canvas: thalesCanvas({
          sideLabels: { AM: `${am} cm`, AB: `${ab} cm`, AN: `${an} cm`, AC: `${ac} cm` },
          display: { showPoints: true, showLabels: true, showSideLabels: true, showParallelMarks: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "thales_theoreme_rapport_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le rapport qui ne respecte PAS Thalès.",
    tags: ["thales_theoreme_theoreme", "rapport", "piege", "template"],
    generate: () => {
      return {
        text: "Quelle égalité de rapports n’est PAS celle de Thalès ?",
        format: "qcm",
        choices: makeChoices("AB / AM = AN / AC", [
          "AM / AB = AN / AC",
          "AM / AB = MN / BC",
          "AN / AC = MN / BC",
        ]),
        expected: ["AB / AM = AN / AC"],
        comparator: "mcq_exact",
        explanation:
          "Définition : Thalès écrit AM/AB = AN/AC = MN/BC (petit sur grand).\n\n" +
          "Méthode : on repère le rapport inversé.\n\n" +
          "Calcul : AB / AM met le grand sur le petit : ce n’est pas la forme de Thalès.\n\n" +
          "Conclusion : l’intrus est AB / AM = AN / AC.",
      };
    },
  },
  {
    kind: "fixed",
    id: "thales_theoreme_rapport_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment associer les longueurs dans l’égalité de Thalès.",
    format: "open",
    expected: ["demi-droite", "correspondantes", "AM"],
    comparator: "contains_keyword",
    hint: "Les longueurs d’une même demi-droite vont ensemble.",
    explanation:
      "Définition : on compare les longueurs correspondantes des deux demi-droites issues du sommet.\n\n" +
      "Méthode : AM et AB sur la même demi-droite, AN et AC sur l’autre.\n\n" +
      "Calcul : on écrit AM/AB = AN/AC, et MN/BC pour les côtés parallèles.\n\n" +
      "Conclusion : on associe les longueurs correspondantes demi-droite par demi-droite.",
    tags: ["thales_theoreme_theoreme", "rapport", "open"],
  },

  // ---------- THALES_CALCULER_LONGUEUR ----------
  {
    kind: "fixed",
    id: "thales_theoreme_calculer_longueur_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une configuration de Thalès, AM = 2 cm, AB = 6 cm et AN = 3 cm. Quelle est AC ?",
    format: "qcm",
    choices: ["9 cm", "6 cm", "12 cm", "4 cm"],
    expected: ["9 cm"],
    comparator: "mcq_exact",
    hint: "2/6 = 3/AC.",
    explanation:
      "Définition : Thalès donne AM/AB = AN/AC.\n\n" +
      "Méthode : 2/6 = 1/3, donc le coefficient de AB à AM est 3.\n\n" +
      "Calcul : AC = 3 × 3 = 9 cm.\n\n" +
      "Conclusion : AC = 9 cm.",
    canvas: thalesCanvas({
      sideLabels: { AM: "2 cm", AB: "6 cm", AN: "3 cm", AC: "?" },
      display: { showPoints: true, showLabels: true, showSideLabels: true, showParallelMarks: true },
    }),
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "qcm", "canvas"],
  },
  {
    kind: "template",
    id: "thales_theoreme_calculer_longueur_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "MN / BC = AM / AB.",
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "template", "canvas"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const am = randomInt(2, 5);
      const mn = randomInt(2, 6);
      const ab = am * k;
      const bc = mn * k;
      return {
        text: `Dans une configuration de Thalès, AM = ${am} cm, AB = ${ab} cm et MN = ${mn} cm. Calculer BC.`,
        format: "short",
        expected: [String(bc)],
        comparator: "number_equal",
        explanation:
          "Définition : Thalès donne AM/AB = MN/BC.\n\n" +
          `Méthode : le coefficient de AM à AB est ${k}.\n\n` +
          `Calcul : BC = ${mn} × ${k} = ${bc} cm.\n\n` +
          `Conclusion : BC = ${bc} cm.`,
        canvas: thalesCanvas({
          sideLabels: { AM: `${am} cm`, AB: `${ab} cm`, BC: "?" },
          display: { showPoints: true, showLabels: true, showSideLabels: true, showParallelMarks: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "thales_theoreme_calculer_longueur_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche AB connaissant AM, AN, AC.",
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const am = randomInt(2, 6);
      const an = randomInt(2, 6);
      const ab = am * k;
      const ac = an * k;
      return {
        text: `Dans une configuration de Thalès, AM = ${am} cm, AN = ${an} cm et AC = ${ac} cm. Calculer AB.`,
        format: "short",
        expected: [String(ab)],
        comparator: "number_equal",
        explanation:
          "Définition : Thalès donne AM/AB = AN/AC.\n\n" +
          `Méthode : le coefficient de AN à AC est ${k}.\n\n` +
          `Calcul : AB = ${am} × ${k} = ${ab} cm.\n\n` +
          `Conclusion : AB = ${ab} cm.`,
      };
    },
  },
  {
    kind: "template",
    id: "thales_theoreme_calculer_longueur_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "Quatrième proportionnelle : AC = AB × AN ÷ AM.",
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "quatrieme_proportionnelle", "template"],
    generate: () => {
      const am = randomChoice([2, 3, 4]);
      const an = randomChoice([3, 5, 6]);
      const ab = am * randomChoice([3, 4, 5]);
      const ac = (ab * an) / am;
      return {
        text: `Dans une configuration de Thalès, AM = ${am} cm, AB = ${ab} cm et AN = ${an} cm. Calculer AC.`,
        format: "short",
        expected: [String(ac)],
        comparator: "number_equal",
        explanation:
          "Définition : Thalès donne AM/AB = AN/AC.\n\n" +
          "Méthode : on isole AC (quatrième proportionnelle).\n\n" +
          `Calcul : AC = AB × AN ÷ AM = ${ab} × ${an} ÷ ${am} = ${ac} cm.\n\n` +
          `Conclusion : AC = ${ac} cm.`,
        canvas: thalesCanvas({
          sideLabels: { AM: `${am} cm`, AB: `${ab} cm`, AN: `${an} cm`, AC: "?" },
          display: { showPoints: true, showLabels: true, showSideLabels: true, showParallelMarks: true },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "thales_theoreme_calculer_longueur_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une configuration de Thalès, AM = 5 cm, AB = 15 cm et AN = 4 cm. Calculer AC.",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Le coefficient est 15 ÷ 5 = 3.",
    explanation:
      "Définition : Thalès donne AM/AB = AN/AC.\n\n" +
      "Méthode : le coefficient de AM à AB est 3.\n\n" +
      "Calcul : AC = 4 × 3 = 12 cm.\n\n" +
      "Conclusion : AC = 12 cm.",
    tags: ["thales_theoreme_theoreme", "calculer_longueur"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_calculer_longueur_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment calculer AC quand AM = 3, AB = 9 et AN = 5.",
    format: "open",
    expected: ["AM/AB", "AN/AC", "15"],
    comparator: "contains_keyword",
    hint: "Écris l’égalité des rapports puis isole AC.",
    explanation:
      "Définition : Thalès donne AM/AB = AN/AC.\n\n" +
      "Méthode : 3/9 = 1/3, donc le coefficient est 3.\n\n" +
      "Calcul : AC = 5 × 3 = 15.\n\n" +
      "Conclusion : AC = 15.",
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "open"],
  },

  // ---------- THALES_RECIPROQUE_VERIFIER ----------
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_verifier_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "On a AM = 2, AB = 5, AN = 4, AC = 10. Les rapports AM/AB et AN/AC sont-ils égaux ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare 2/5 et 4/10.",
    explanation:
      "Définition : on compare les deux rapports.\n\n" +
      "Méthode : on simplifie 4/10.\n\n" +
      "Calcul : 2/5 = 0,4 et 4/10 = 0,4. Égaux.\n\n" +
      "Conclusion : oui, les rapports sont égaux.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_verifier_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "On a AM = 3, AB = 5, AN = 4, AC = 7. Les rapports AM/AB et AN/AC sont-ils égaux ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare 3/5 et 4/7 par produit en croix.",
    explanation:
      "Définition : on compare par produit en croix.\n\n" +
      "Méthode : 3 × 7 = 21 et 5 × 4 = 20.\n\n" +
      "Calcul : 21 ≠ 20, donc les rapports diffèrent.\n\n" +
      "Conclusion : non, ils ne sont pas égaux.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_verifier_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Pour utiliser la réciproque de Thalès, quelle condition sur les points faut-il aussi vérifier ?",
    format: "qcm",
    choices: [
      "que les points soient alignés dans le même ordre",
      "que le triangle soit isocèle",
      "qu’il y ait un angle droit",
      "que les longueurs soient entières",
    ],
    expected: ["que les points soient alignés dans le même ordre"],
    comparator: "mcq_exact",
    hint: "L’alignement et l’ordre comptent.",
    explanation:
      "Définition : la réciproque exige l’égalité des rapports ET un alignement dans le même ordre.\n\n" +
      "Méthode : on vérifie la position des points A, M, B et A, N, C.\n\n" +
      "Calcul : les points doivent être alignés dans le même ordre.\n\n" +
      "Conclusion : il faut vérifier l’ordre d’alignement.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_verifier_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Pour appliquer la réciproque de Thalès, quels rapports compare-t-on ?",
    format: "qcm",
    choices: ["AM/AB et AN/AC", "AM/AN et AB/AC", "AB/MN et AC/BC", "AM/MN et AN/BC"],
    expected: ["AM/AB et AN/AC"],
    comparator: "mcq_exact",
    hint: "Les longueurs correspondantes sur chaque demi-droite.",
    explanation:
      "Définition : on compare les rapports des longueurs correspondantes.\n\n" +
      "Méthode : AM/AB sur une demi-droite, AN/AC sur l’autre.\n\n" +
      "Calcul : on compare AM/AB et AN/AC.\n\n" +
      "Conclusion : on compare AM/AB et AN/AC.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "qcm"],
  },
  {
    kind: "template",
    id: "thales_theoreme_reciproque_verifier_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare par produit en croix.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "template"],
    generate: () => {
      const equal = randomChoice([true, false]);
      const k = randomChoice([2, 3]);
      const am = randomInt(2, 5);
      const an = randomInt(2, 6);
      const ab = am * k;
      const ac = equal ? an * k : an * k + randomChoice([1, 2]);
      return {
        text: `On a AM = ${am}, AB = ${ab}, AN = ${an}, AC = ${ac}. Les rapports AM/AB et AN/AC sont-ils égaux ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [equal ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : on compare par produit en croix.\n\n" +
          `Méthode : ${am} × ${ac} et ${ab} × ${an}.\n\n` +
          `Calcul : ${am * ac} et ${ab * an}.\n\n` +
          `Conclusion : ${equal ? "égaux, oui" : "différents, non"}.`,
        canvas: thalesCanvas({
          sideLabels: { AM: `${am}`, AB: `${ab}`, AN: `${an}`, AC: `${ac}` },
          display: { showPoints: true, showLabels: true, showSideLabels: true, showParallelMarks: false },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "thales_theoreme_reciproque_verifier_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule chaque rapport sous forme décimale.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "template"],
    generate: () => {
      const equal = randomChoice([true, false]);
      const am = randomChoice([2, 3, 4]);
      const ab = randomChoice([8, 10, 12]);
      const an = randomChoice([3, 5, 6]);
      const ac = equal ? (an * ab) / am : (an * ab) / am + 2;
      return {
        text: `On a AM = ${am}, AB = ${ab}, AN = ${an}, AC = ${ac}. Peut-on dire que AM/AB = AN/AC ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [equal ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : on compare les deux rapports.\n\n" +
          "Méthode : on calcule chaque rapport.\n\n" +
          `Calcul : ${am}/${ab} et ${an}/${ac}.\n\n` +
          `Conclusion : ${equal ? "ils sont égaux, oui" : "ils sont différents, non"}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_verifier_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment vérifier que deux rapports sont égaux avec le produit en croix.",
    format: "open",
    expected: ["produit en croix", "égaux", "multiplie"],
    comparator: "contains_keyword",
    hint: "On multiplie en croix et on compare.",
    explanation:
      "Définition : deux rapports a/b et c/d sont égaux si a × d = b × c.\n\n" +
      "Méthode : on multiplie en croix.\n\n" +
      "Calcul : si les produits sont égaux, les rapports le sont aussi.\n\n" +
      "Conclusion : on compare les produits en croix.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "open"],
  },

  // ---------- THALES_RECIPROQUE_CONCLURE ----------
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_conclure_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Les rapports AM/AB et AN/AC sont égaux et les points sont alignés dans le même ordre. Que peut-on conclure ?",
    format: "qcm",
    choices: ["(MN) est parallèle à (BC)", "(MN) est perpendiculaire à (BC)", "ABC est isocèle", "rien"],
    expected: ["(MN) est parallèle à (BC)"],
    comparator: "mcq_exact",
    hint: "C’est la réciproque de Thalès.",
    explanation:
      "Définition : la réciproque conclut au parallélisme.\n\n" +
      "Méthode : rapports égaux + bon ordre d’alignement.\n\n" +
      "Calcul : les conditions sont réunies.\n\n" +
      "Conclusion : (MN) est parallèle à (BC).",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_conclure_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Les rapports AM/AB et AN/AC ne sont pas égaux. Que peut-on conclure ?",
    format: "qcm",
    choices: [
      "(MN) n’est pas parallèle à (BC)",
      "(MN) est parallèle à (BC)",
      "ABC est rectangle",
      "M est le milieu de [AB]",
    ],
    expected: ["(MN) n’est pas parallèle à (BC)"],
    comparator: "mcq_exact",
    hint: "Sans égalité des rapports, pas de parallélisme.",
    explanation:
      "Définition : si les rapports diffèrent, les droites ne sont pas parallèles.\n\n" +
      "Méthode : on applique la contraposée de la réciproque.\n\n" +
      "Calcul : rapports différents ⇒ pas de parallélisme.\n\n" +
      "Conclusion : (MN) n’est pas parallèle à (BC).",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_conclure_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Quel outil permet de DÉMONTRER que deux droites sont parallèles ?",
    format: "qcm",
    choices: [
      "la réciproque du théorème de Thalès",
      "le théorème de Thalès direct",
      "le théorème de Pythagore",
      "la somme des angles",
    ],
    expected: ["la réciproque du théorème de Thalès"],
    comparator: "mcq_exact",
    hint: "Démontrer un parallélisme = réciproque.",
    explanation:
      "Définition : la réciproque de Thalès démontre le parallélisme.\n\n" +
      "Méthode : on vérifie l’égalité des rapports.\n\n" +
      "Calcul : si les rapports sont égaux, on conclut au parallélisme.\n\n" +
      "Conclusion : c’est la réciproque du théorème de Thalès.",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_conclure_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "AM/AB = AN/AC = 0,5 et les points sont bien alignés. La conclusion correcte est :",
    format: "qcm",
    choices: [
      "(MN) // (BC) d’après la réciproque de Thalès",
      "AM = AN",
      "le triangle est équilatéral",
      "on ne peut rien dire",
    ],
    expected: ["(MN) // (BC) d’après la réciproque de Thalès"],
    comparator: "mcq_exact",
    hint: "Les rapports égaux donnent le parallélisme.",
    explanation:
      "Définition : rapports égaux + bon ordre ⇒ parallélisme.\n\n" +
      "Méthode : on cite la réciproque de Thalès.\n\n" +
      "Calcul : les deux rapports valent 0,5.\n\n" +
      "Conclusion : (MN) // (BC) d’après la réciproque de Thalès.",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure", "qcm"],
  },
  {
    kind: "template",
    id: "thales_theoreme_reciproque_conclure_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie les rapports avant de conclure.",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure", "template"],
    generate: () => {
      const equal = randomChoice([true, false]);
      const k = randomChoice([2, 3]);
      const am = randomChoice([3, 4, 5]);
      const an = randomChoice([4, 6, 8]);
      const ab = am * k;
      const ac = equal ? an * k : an * k + 1;
      return {
        text: `AM = ${am}, AB = ${ab}, AN = ${an}, AC = ${ac} (points alignés dans le même ordre). Peut-on conclure que (MN) // (BC) ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [equal ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : on applique la réciproque si les rapports sont égaux.\n\n" +
          `Méthode : on compare ${am}/${ab} et ${an}/${ac}.\n\n` +
          `Calcul : ${equal ? "les rapports sont égaux" : "les rapports diffèrent"}.\n\n` +
          `Conclusion : ${equal ? "oui, (MN) // (BC)" : "non, on ne peut pas conclure au parallélisme"}.`,
        canvas: thalesCanvas({
          sideLabels: { AM: `${am}`, AB: `${ab}`, AN: `${an}`, AC: `${ac}` },
          display: { showPoints: true, showLabels: true, showSideLabels: true, showParallelMarks: false },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "thales_theoreme_reciproque_conclure_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    hint: "Rapports égaux ⇒ parallèle ; sinon non.",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure", "template"],
    generate: () => {
      const equal = randomChoice([true, false]);
      const am = randomChoice([2, 3, 4]);
      const ab = randomChoice([6, 8, 10]);
      const an = randomChoice([3, 5]);
      const ac = equal ? (an * ab) / am : (an * ab) / am + 2;
      const correct = equal
        ? "(MN) est parallèle à (BC)"
        : "(MN) n’est pas parallèle à (BC)";
      return {
        text: `AM = ${am}, AB = ${ab}, AN = ${an}, AC = ${ac}. Quelle conclusion est correcte ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          equal ? "(MN) n’est pas parallèle à (BC)" : "(MN) est parallèle à (BC)",
          "le triangle est rectangle",
          "AM = AN",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : on conclut selon l’égalité des rapports.\n\n" +
          `Méthode : on compare ${am}/${ab} et ${an}/${ac}.\n\n` +
          `Calcul : ${equal ? "les rapports sont égaux" : "les rapports diffèrent"}.\n\n` +
          `Conclusion : ${correct}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_conclure_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    text: "Explique ce qu’on conclut avec la réciproque de Thalès, et à quelle condition.",
    format: "open",
    expected: ["rapports", "égaux", "parallèle"],
    comparator: "contains_keyword",
    hint: "Condition = rapports égaux ; conclusion = parallélisme.",
    explanation:
      "Définition : la réciproque conclut au parallélisme.\n\n" +
      "Méthode : la condition est l’égalité des rapports (avec bon alignement).\n\n" +
      "Calcul : si AM/AB = AN/AC, alors (MN) // (BC).\n\n" +
      "Conclusion : rapports égaux ⇒ droites parallèles.",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure", "open"],
  },

  // ---------- THALES_REDIGER ----------
  {
    kind: "fixed",
    id: "thales_theoreme_rediger_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Dans une rédaction de Thalès, quelle est la dernière étape ?",
    format: "qcm",
    choices: [
      "écrire l’égalité des rapports puis calculer la longueur cherchée",
      "tracer un cercle",
      "mesurer les angles",
      "additionner toutes les longueurs",
    ],
    expected: ["écrire l’égalité des rapports puis calculer la longueur cherchée"],
    comparator: "mcq_exact",
    hint: "On finit par le calcul de la longueur.",
    explanation:
      "Définition : la rédaction se termine par le calcul de la longueur cherchée.\n\n" +
      "Méthode : configuration → égalité des rapports → calcul.\n\n" +
      "Calcul : on isole la longueur cherchée.\n\n" +
      "Conclusion : la dernière étape est le calcul à partir de l’égalité des rapports.",
    tags: ["thales_theoreme_theoreme", "redaction", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_rediger_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la bonne suite d’étapes pour rédiger avec Thalès ?",
    format: "qcm",
    choices: [
      "préciser la configuration et le parallélisme, écrire les rapports, calculer",
      "calculer, puis vérifier le parallélisme",
      "mesurer, puis additionner",
      "tracer la figure, puis conclure sans calcul",
    ],
    expected: ["préciser la configuration et le parallélisme, écrire les rapports, calculer"],
    comparator: "mcq_exact",
    hint: "On part de la configuration et on finit par le calcul.",
    explanation:
      "Définition : la rédaction suit un ordre logique.\n\n" +
      "Méthode : configuration + parallélisme, puis égalité des rapports, puis calcul.\n\n" +
      "Calcul : c’est l’enchaînement attendu.\n\n" +
      "Conclusion : configuration → rapports → calcul.",
    tags: ["thales_theoreme_theoreme", "redaction", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_rediger_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi doit-on mentionner le parallélisme dans la rédaction de Thalès ?",
    format: "qcm",
    choices: [
      "car c’est la condition qui permet d’appliquer le théorème",
      "car cela donne l’aire",
      "car cela prouve un angle droit",
      "ce n’est pas nécessaire",
    ],
    expected: ["car c’est la condition qui permet d’appliquer le théorème"],
    comparator: "mcq_exact",
    hint: "Le parallélisme est l’hypothèse de Thalès.",
    explanation:
      "Définition : le parallélisme est l’hypothèse du théorème de Thalès.\n\n" +
      "Méthode : on justifie l’application du théorème.\n\n" +
      "Calcul : sans parallélisme, l’égalité des rapports n’est pas garantie.\n\n" +
      "Conclusion : on mentionne le parallélisme car c’est la condition d’application.",
    tags: ["thales_theoreme_theoreme", "redaction", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_rediger_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Rédige les étapes pour calculer une longueur avec le théorème de Thalès.",
    format: "open",
    expected: ["configuration", "rapports", "calcul"],
    comparator: "contains_keyword",
    hint: "Trois étapes : configuration, rapports, calcul.",
    explanation:
      "Définition : une rédaction comporte trois étapes.\n\n" +
      "Méthode : 1) préciser la configuration et le parallélisme ; 2) écrire l’égalité des rapports ; 3) calculer.\n\n" +
      "Calcul : on isole la longueur cherchée à la dernière étape.\n\n" +
      "Conclusion : configuration → rapports → calcul.",
    tags: ["thales_theoreme_theoreme", "redaction", "open"],
  },
  {
    kind: "template",
    id: "thales_theoreme_rediger_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris l’égalité des rapports adaptée aux longueurs données.",
    tags: ["thales_theoreme_theoreme", "redaction", "template"],
    generate: () => {
      const am = randomInt(2, 6);
      const ab = am * randomChoice([2, 3]);
      const an = randomInt(2, 6);
      return {
        text: `On sait que (MN) // (BC), AM = ${am}, AB = ${ab}, AN = ${an}. Écris l’égalité de rapports de Thalès permettant de trouver AC.`,
        format: "open",
        expected: ["AM/AB", "AN/AC", "Thalès"],
        comparator: "contains_keyword",
        explanation:
          "Définition : Thalès donne AM/AB = AN/AC.\n\n" +
          "Méthode : on écrit l’égalité avec les longueurs connues.\n\n" +
          `Calcul : ${am}/${ab} = ${an}/AC.\n\n` +
          "Conclusion : l’égalité est AM/AB = AN/AC.",
        canvas: thalesCanvas({
          sideLabels: { AM: `${am}`, AB: `${ab}`, AN: `${an}`, AC: "?" },
          display: { showPoints: true, showLabels: true, showSideLabels: true, showParallelMarks: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "thales_theoreme_rediger_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "Annonce la configuration puis l’égalité des rapports.",
    tags: ["thales_theoreme_theoreme", "redaction", "template"],
    generate: () => {
      const am = randomInt(2, 5);
      const ab = am * randomChoice([2, 3]);
      const an = randomInt(3, 7);
      return {
        text: `Rédige le début du raisonnement de Thalès pour calculer AC (AM = ${am}, AB = ${ab}, AN = ${an}, (MN) // (BC)).`,
        format: "open",
        expected: ["triangle", "parallèle", "AM/AB"],
        comparator: "contains_keyword",
        explanation:
          "Définition : on annonce la configuration puis on applique Thalès.\n\n" +
          "Méthode : « Dans le triangle ABC, M ∈ [AB], N ∈ [AC] et (MN) // (BC). »\n\n" +
          "Calcul : « D’après le théorème de Thalès, AM/AB = AN/AC. »\n\n" +
          "Conclusion : on commence par la configuration, puis l’égalité des rapports.",
        canvas: thalesCanvas({
          sideLabels: { AM: `${am}`, AB: `${ab}`, AN: `${an}`, AC: "?" },
          display: { showPoints: true, showLabels: true, showSideLabels: true, showParallelMarks: true },
        }),
      };
    },
  },

  // ---------- THALES_DEFIS ----------
  {
    kind: "fixed",
    id: "thales_theoreme_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un poteau de 2 m projette une ombre de 3 m. Au même moment, un arbre projette une ombre de 12 m. En utilisant Thalès, quelle est la hauteur de l’arbre ?",
    format: "qcm",
    choices: ["8 m", "6 m", "18 m", "24 m"],
    expected: ["8 m"],
    comparator: "mcq_exact",
    hint: "Le coefficient des ombres est 12 ÷ 3 = 4.",
    explanation:
      "Définition : les rayons du soleil forment une configuration de Thalès.\n\n" +
      "Méthode : le coefficient des ombres est 12 ÷ 3 = 4.\n\n" +
      "Calcul : hauteur = 2 × 4 = 8 m.\n\n" +
      "Conclusion : l’arbre mesure 8 m.",
    tags: ["thales_theoreme_theoreme", "defi", "ombre", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève applique Thalès sans vérifier le parallélisme. Son raisonnement est-il valable ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le parallélisme est obligatoire.",
    explanation:
      "Définition : Thalès exige le parallélisme.\n\n" +
      "Méthode : on vérifie d’abord la condition.\n\n" +
      "Calcul : sans parallélisme, l’égalité des rapports n’est pas justifiée.\n\n" +
      "Conclusion : non, le raisonnement n’est pas valable.",
    tags: ["thales_theoreme_theoreme", "defi", "erreur", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 4,
    theme: "neutral",
    text: "À quoi sert principalement la réciproque de Thalès dans un problème ?",
    format: "qcm",
    choices: [
      "à démontrer que deux droites sont parallèles",
      "à calculer une aire",
      "à mesurer un angle",
      "à tracer un cercle",
    ],
    expected: ["à démontrer que deux droites sont parallèles"],
    comparator: "mcq_exact",
    hint: "Réciproque = preuve de parallélisme.",
    explanation:
      "Définition : la réciproque de Thalès démontre un parallélisme.\n\n" +
      "Méthode : on compare les rapports.\n\n" +
      "Calcul : rapports égaux ⇒ parallèle.\n\n" +
      "Conclusion : elle sert à démontrer le parallélisme.",
    tags: ["thales_theoreme_theoreme", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "thales_theoreme_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le coefficient des ombres s’applique à la hauteur.",
    tags: ["thales_theoreme_theoreme", "defi", "ombre", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5]);
      const hauteur = randomChoice([2, 3, 4]);
      const ombrePetit = randomChoice([2, 3, 4]);
      const ombreGrand = ombrePetit * k;
      const grand = hauteur * k;
      return {
        text: `Un piquet de ${hauteur} m a une ombre de ${ombrePetit} m. Au même instant, un mât a une ombre de ${ombreGrand} m. Quelle est la hauteur du mât (en m) ?`,
        format: "short",
        expected: [String(grand)],
        comparator: "number_equal",
        explanation:
          "Définition : les ombres au même instant forment une configuration de Thalès.\n\n" +
          `Méthode : le coefficient est ${ombreGrand} ÷ ${ombrePetit} = ${k}.\n\n` +
          `Calcul : hauteur = ${hauteur} × ${k} = ${grand} m.\n\n` +
          `Conclusion : le mât mesure ${grand} m.`,
      };
    },
  },
  {
    kind: "template",
    id: "thales_theoreme_defi_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Utilise le coefficient d’agrandissement.",
    tags: ["thales_theoreme_theoreme", "defi", "agrandissement", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const am = randomChoice([3, 4, 5]);
      const an = randomChoice([4, 6, 7]);
      const ab = am * k;
      const ac = an * k;
      return {
        text: `Dans une configuration de Thalès, AM = ${am} cm, AB = ${ab} cm et AN = ${an} cm. On veut AC. Quel est le coefficient qui relie les petites longueurs aux grandes ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation:
          "Définition : le coefficient relie les longueurs correspondantes.\n\n" +
          `Méthode : coefficient = AB ÷ AM.\n\n` +
          `Calcul : ${ab} ÷ ${am} = ${k} (et AC vaudrait ${ac}).\n\n` +
          `Conclusion : le coefficient est ${k}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "thales_theoreme_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment Thalès permet de mesurer la hauteur d’un arbre sans y monter.",
    format: "open",
    expected: ["ombre", "proportionnel", "hauteur"],
    comparator: "contains_keyword",
    hint: "On compare l’ombre d’un objet connu et celle de l’arbre.",
    explanation:
      "Définition : les rayons du soleil créent des triangles semblables (configuration de Thalès).\n\n" +
      "Méthode : on compare l’ombre d’un objet de hauteur connue à celle de l’arbre.\n\n" +
      "Calcul : hauteur arbre ÷ ombre arbre = hauteur objet ÷ ombre objet.\n\n" +
      "Conclusion : la proportionnalité des ombres donne la hauteur de l’arbre.",
    tags: ["thales_theoreme_theoreme", "defi", "open"],
  },
];