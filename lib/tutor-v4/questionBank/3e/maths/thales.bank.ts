import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function formatNumber(n: number) {
  return Number.isInteger(n)
    ? String(n)
    : String(n).replace(".", ",");
}

function thalesCanvas(data: {
  sideLabels?: Record<string, string>;
  labels?: Record<string, string>;
  variant?: "triangle" | "papillon";
  showFormula?: boolean;
}) {
  return {
    kind: "thales" as const,
    variant: data.variant ?? "triangle",

    labels: {
      A: "A",
      B: "B",
      C: "C",
      M: "M",
      N: "N",
      ...(data.labels ?? {}),
    },

    sideLabels: data.sideLabels ?? {},

    display: {
      showPoints: true,
      showLabels: true,
      showSideLabels: true,
      showParallelMarks: true,
      highlightParallel: true,
      showFormula: data.showFormula ?? true,
    },
  };
}

export const thalesBank: TutorBankItemV4[] = [

  /* =========================
     THALES_CONFIGURATION
  ========================= */

  {
    kind: "fixed",
    id: "3e_thales_configuration_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_configuration",
    difficulty: 1,
    theme: "neutral",
    text:
      "Dans une configuration de Thalès, quelles droites doivent être parallèles ?",
    format: "qcm",
    choices: [
      "(MN) et (BC)",
      "(AM) et (AB)",
      "(AN) et (AC)",
      "(AB) et (AC)",
    ],
    expected: ["(MN) et (BC)"],
    comparator: "mcq_exact",
    hint: "Cherche les droites coupées par deux sécantes.",
    explanation:
      "Définition : dans une configuration de Thalès, deux droites parallèles sont coupées par deux droites sécantes.\n\n" +
      "Méthode : on identifie les droites parallèles représentées sur la figure.\n\n" +
      "Calcul : ici, les droites (MN) et (BC) sont parallèles.\n\n" +
      "Conclusion : la configuration permet donc d’utiliser le théorème de Thalès.",
    tags: ["thales", "configuration", "paralleles", "qcm"],

    canvas: thalesCanvas({
      sideLabels: {
        AM: "3",
        AB: "6",
        AN: "2",
        AC: "4",
      },
    }),
  },

  {
    kind: "fixed",
    id: "3e_thales_configuration_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    text:
      "Peut-on utiliser le théorème de Thalès si les droites ne sont pas parallèles ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les parallèles sont indispensables.",
    explanation:
      "Définition : le théorème de Thalès nécessite une configuration avec des droites parallèles.\n\n" +
      "Méthode : on vérifie toujours l’existence du parallélisme avant d’utiliser Thalès.\n\n" +
      "Calcul : sans droites parallèles, les rapports ne sont pas garantis égaux.\n\n" +
      "Conclusion : on ne peut donc pas appliquer le théorème.",
    tags: ["thales", "configuration", "qcm"],
  },

  {
    kind: "template",
    id: "3e_thales_configuration_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère les droites parallèles.",
    tags: ["thales", "configuration", "template"],

    generate: () => {
      const correct = randomChoice([
        "(MN) et (BC)",
        "(BC) et (MN)",
      ]);

      return {
        text:
          "Dans cette figure, quelles droites sont parallèles ?",

        format: "qcm",

        choices: shuffle([
          correct,
          "(AB) et (AC)",
          "(AM) et (AN)",
          "(AC) et (BC)",
        ]),

        expected: [correct],

        comparator: "mcq_exact",

        explanation:
          "Définition : dans une configuration de Thalès, deux droites parallèles sont coupées par deux sécantes.\n\n" +
          "Méthode : on repère les marques de parallélisme.\n\n" +
          "Calcul : les droites parallèles sont (MN) et (BC).\n\n" +
          "Conclusion : la figure est bien une configuration de Thalès.",

        canvas: thalesCanvas({
          sideLabels: {
            AM: "4",
            AB: "8",
            AN: "3",
            AC: "6",
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
    id: "3e_thales_rapports_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_rapports",
    difficulty: 2,
    theme: "neutral",
    text:
      "Quelle égalité traduit correctement le théorème de Thalès ?",
    format: "qcm",
    choices: [
      "AM/AB = AN/AC",
      "AM/AN = AB/BC",
      "AB/AC = BC/MN",
      "AM + AB = AC",
    ],
    expected: ["AM/AB = AN/AC"],
    comparator: "mcq_exact",
    hint: "Les rapports doivent comparer les longueurs correspondantes.",
    explanation:
      "Définition : le théorème de Thalès permet d’écrire des rapports égaux.\n\n" +
      "Méthode : on associe les côtés correspondants.\n\n" +
      "Calcul : ici, AM correspond à AB et AN correspond à AC.\n\n" +
      "Conclusion : on écrit donc AM/AB = AN/AC.",
    tags: ["thales", "rapports", "qcm"],
  },

  {
    kind: "template",
    id: "3e_thales_rapports_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_rapports",
    difficulty: 3,
    theme: "neutral",
    hint: "Associe les côtés correspondants.",
    tags: ["thales", "rapports", "template"],

    generate: () => {
      const a = randomChoice([2, 3, 4, 5]);
      const k = randomChoice([2, 3]);

      return {
        text:
          "Compléter l’égalité de Thalès : AM / AB = ... / AC",

        format: "short",

        expected: ["AN"],

        comparator: "exact_text",

        explanation:
          "Définition : dans le théorème de Thalès, les rapports comparent des côtés correspondants.\n\n" +
          "Méthode : AM correspond à AB et AN correspond à AC.\n\n" +
          "Calcul : on complète donc par AN.\n\n" +
          "Conclusion : l’égalité correcte est AM/AB = AN/AC.",

        canvas: thalesCanvas({
          sideLabels: {
            AM: String(a),
            AB: String(a * k),
            AN: String(a + 1),
            AC: String((a + 1) * k),
          },
        }),
      };
    },
  },
    /* =========================
     THALES_CALCULER_LONGUEUR
  ========================= */

  {
    kind: "template",
    id: "3e_thales_calculer_longueur_tpl_1_trouver_ac",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise AM/AB = AN/AC puis fais un produit en croix.",
    tags: ["thales", "calculer_longueur", "produit_en_croix", "template"],

    generate: () => {
      const AM = randomChoice([2, 3, 4, 5]);
      const k = randomChoice([2, 3, 4]);
      const AB = AM * k;

      const AN = randomChoice([3, 4, 5, 6]);
      const AC = AN * k;

      return {
        text:
          `Dans le triangle ABC, les droites (MN) et (BC) sont parallèles. ` +
          `On sait que AM = ${AM} cm, AB = ${AB} cm et AN = ${AN} cm. Calculer AC.`,
        format: "short",
        expected: [String(AC)],
        comparator: "number_equal",
        explanation:
          "Définition : le théorème de Thalès permet d’écrire des rapports égaux dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on écrit AM/AB = AN/AC.\n\n" +
          `Calcul : ${AM}/${AB} = ${AN}/AC.\n` +
          `Comme ${AB} = ${k} × ${AM}, alors AC = ${k} × ${AN} = ${AC}.\n\n` +
          `Conclusion : AC = ${AC} cm.`,
        canvas: thalesCanvas({
          sideLabels: {
            AM: `${AM} cm`,
            AB: `${AB} cm`,
            AN: `${AN} cm`,
            AC: "?",
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_thales_calculer_longueur_tpl_2_trouver_an",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "Le petit triangle est une réduction du grand triangle.",
    tags: ["thales", "calculer_longueur", "reduction", "template"],

    generate: () => {
      const AN = randomChoice([2, 3, 4, 5]);
      const k = randomChoice([2, 3, 4]);
      const AC = AN * k;

      const AM = randomChoice([3, 4, 5]);
      const AB = AM * k;

      return {
        text:
          `Dans une configuration de Thalès, (MN) est parallèle à (BC). ` +
          `On sait que AM = ${AM} cm, AB = ${AB} cm et AC = ${AC} cm. Calculer AN.`,
        format: "short",
        expected: [String(AN)],
        comparator: "number_equal",
        explanation:
          "Définition : avec Thalès, les longueurs correspondantes sont proportionnelles.\n\n" +
          "Méthode : on utilise AM/AB = AN/AC.\n\n" +
          `Calcul : ${AM}/${AB} = AN/${AC}.\n` +
          `Le coefficient de réduction est ${AM}/${AB} = 1/${k}. Donc AN = ${AC} ÷ ${k} = ${AN}.\n\n` +
          `Conclusion : AN = ${AN} cm.`,
        canvas: thalesCanvas({
          sideLabels: {
            AM: `${AM} cm`,
            AB: `${AB} cm`,
            AN: "?",
            AC: `${AC} cm`,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_thales_calculer_longueur_tpl_3_trouver_mn",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise aussi le rapport MN/BC.",
    tags: ["thales", "calculer_longueur", "mn_bc", "template"],

    generate: () => {
      const AM = randomChoice([2, 3, 4]);
      const k = randomChoice([2, 3]);
      const AB = AM * k;

      const MN = randomChoice([3, 4, 5]);
      const BC = MN * k;

      return {
        text:
          `Dans le triangle ABC, les droites (MN) et (BC) sont parallèles. ` +
          `On sait que AM = ${AM} cm, AB = ${AB} cm et BC = ${BC} cm. Calculer MN.`,
        format: "short",
        expected: [String(MN)],
        comparator: "number_equal",
        explanation:
          "Définition : dans une configuration de Thalès, AM/AB = AN/AC = MN/BC.\n\n" +
          "Méthode : on utilise les deux rapports AM/AB et MN/BC.\n\n" +
          `Calcul : ${AM}/${AB} = MN/${BC}.\n` +
          `Le coefficient est ${AM}/${AB} = 1/${k}. Donc MN = ${BC} ÷ ${k} = ${MN}.\n\n` +
          `Conclusion : MN = ${MN} cm.`,
        canvas: thalesCanvas({
          sideLabels: {
            AM: `${AM} cm`,
            AB: `${AB} cm`,
            MN: "?",
            BC: `${BC} cm`,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_thales_calculer_longueur_tpl_4_produit_croix",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "Produit en croix : AM × AC = AB × AN.",
    tags: ["thales", "calculer_longueur", "produit_en_croix", "template"],

    generate: () => {
      const AM = randomChoice([3, 4, 5]);
      const AB = randomChoice([6, 8, 10, 12]);
      const AN = randomChoice([2, 3, 4, 5]);

      const AC = (AB * AN) / AM;

      if (!Number.isInteger(AC)) {
        return {
          text:
            `Dans le triangle ABC, (MN) // (BC). On sait que AM = 4 cm, AB = 8 cm et AN = 5 cm. Calculer AC.`,
          format: "short",
          expected: ["10"],
          comparator: "number_equal",
          explanation:
            "Définition : le théorème de Thalès permet d’écrire AM/AB = AN/AC.\n\n" +
            "Méthode : on utilise un produit en croix.\n\n" +
            "Calcul : 4/8 = 5/AC, donc 4 × AC = 8 × 5 = 40, donc AC = 10.\n\n" +
            "Conclusion : AC = 10 cm.",
          canvas: thalesCanvas({
            sideLabels: {
              AM: "4 cm",
              AB: "8 cm",
              AN: "5 cm",
              AC: "?",
            },
          }),
        };
      }

      return {
        text:
          `Dans le triangle ABC, (MN) // (BC). On sait que AM = ${AM} cm, AB = ${AB} cm et AN = ${AN} cm. Calculer AC.`,
        format: "short",
        expected: [String(AC)],
        comparator: "number_equal",
        explanation:
          "Définition : le théorème de Thalès donne une égalité de rapports.\n\n" +
          "Méthode : on écrit AM/AB = AN/AC puis on fait un produit en croix.\n\n" +
          `Calcul : ${AM}/${AB} = ${AN}/AC.\n` +
          `${AM} × AC = ${AB} × ${AN} = ${AB * AN}.\n` +
          `AC = ${AB * AN} ÷ ${AM} = ${AC}.\n\n` +
          `Conclusion : AC = ${AC} cm.`,
        canvas: thalesCanvas({
          sideLabels: {
            AM: `${AM} cm`,
            AB: `${AB} cm`,
            AN: `${AN} cm`,
            AC: "?",
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_thales_calculer_longueur_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    text:
      "Dans une configuration de Thalès, un élève écrit AM/AN = AB/AC sans vérifier les côtés correspondants. Est-ce toujours correct ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut respecter les côtés correspondants.",
    explanation:
      "Définition : le théorème de Thalès compare des longueurs correspondantes.\n\n" +
      "Méthode : on écrit les rapports dans le même ordre sur les deux demi-droites.\n\n" +
      "Calcul : dans la configuration usuelle, on écrit plutôt AM/AB = AN/AC = MN/BC.\n\n" +
      "Conclusion : l’élève risque de mélanger les rapports.",
    tags: ["thales", "piege", "rapports", "correspondance"],
  },

  {
    kind: "fixed",
    id: "3e_thales_calculer_longueur_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    text:
      "Explique la méthode pour calculer une longueur avec le théorème de Thalès.",
    format: "open",
    expected: ["parallèles", "rapports", "produit", "croix"],
    comparator: "contains_keyword",
    hint: "Tu dois parler des droites parallèles et des rapports égaux.",
    explanation:
      "Définition : le théorème de Thalès s’applique quand deux droites parallèles coupent deux droites sécantes.\n\n" +
      "Méthode : on vérifie le parallélisme, puis on écrit les rapports de longueurs correspondantes.\n\n" +
      "Calcul : on remplace les longueurs connues et on utilise un produit en croix pour trouver la longueur manquante.\n\n" +
      "Conclusion : Thalès permet de calculer une longueur grâce à la proportionnalité.",
    tags: ["thales", "calculer_longueur", "open", "methode"],
  },
    /* =========================
     THALES_RECIPROQUE
  ========================= */

  {
    kind: "template",
    id: "3e_thales_reciproque_tpl_1_verifier_oui",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_reciproque",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare les rapports AM/AB et AN/AC.",
    tags: ["thales", "reciproque", "paralleles", "template"],

    generate: () => {
      const AM = randomChoice([2, 3, 4, 5]);
      const k = randomChoice([2, 3, 4]);
      const AB = AM * k;

      const AN = randomChoice([3, 4, 5, 6]);
      const AC = AN * k;

      return {
        text:
          `Dans la figure, les points A, M, B sont alignés et les points A, N, C sont alignés dans le même ordre. ` +
          `AM = ${AM} cm, AB = ${AB} cm, AN = ${AN} cm et AC = ${AC} cm. Peut-on conclure que (MN) est parallèle à (BC) ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          "Définition : la réciproque du théorème de Thalès permet de prouver que deux droites sont parallèles.\n\n" +
          "Méthode : on compare les rapports AM/AB et AN/AC.\n\n" +
          `Calcul : AM/AB = ${AM}/${AB} = 1/${k} et AN/AC = ${AN}/${AC} = 1/${k}.\n\n` +
          "Conclusion : les rapports sont égaux, donc (MN) est parallèle à (BC).",
        canvas: thalesCanvas({
          sideLabels: {
            AM: `${AM} cm`,
            AB: `${AB} cm`,
            AN: `${AN} cm`,
            AC: `${AC} cm`,
          },
          showFormula: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_thales_reciproque_tpl_2_verifier_non",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_reciproque",
    difficulty: 4,
    theme: "neutral",
    hint: "Si les rapports ne sont pas égaux, les droites ne sont pas parallèles.",
    tags: ["thales", "reciproque", "non_paralleles", "template"],

    generate: () => {
      const AM = randomChoice([2, 3, 4]);
      const AB = AM * 2;

      const AN = randomChoice([3, 4, 5]);
      const AC = AN * 2 + randomChoice([1, 2]);

      return {
        text:
          `Les points A, M, B sont alignés et les points A, N, C sont alignés dans le même ordre. ` +
          `AM = ${AM} cm, AB = ${AB} cm, AN = ${AN} cm et AC = ${AC} cm. Peut-on conclure que (MN) est parallèle à (BC) ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : la réciproque de Thalès s’utilise en comparant deux rapports.\n\n" +
          "Méthode : on calcule AM/AB et AN/AC.\n\n" +
          `Calcul : AM/AB = ${AM}/${AB}, tandis que AN/AC = ${AN}/${AC}. Ces rapports ne sont pas égaux.\n\n` +
          "Conclusion : on ne peut pas conclure que (MN) est parallèle à (BC).",
        canvas: thalesCanvas({
          sideLabels: {
            AM: `${AM} cm`,
            AB: `${AB} cm`,
            AN: `${AN} cm`,
            AC: `${AC} cm`,
          },
          showFormula: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_thales_reciproque_tpl_3_qcm_rapports",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_reciproque",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule les deux rapports puis compare-les.",
    tags: ["thales", "reciproque", "rapports", "qcm", "template"],

    generate: () => {
      const same = randomChoice([true, false]);

      const AM = 3;
      const AB = 6;
      const AN = 4;
      const AC = same ? 8 : 9;

      const expected = same
        ? "les droites sont parallèles"
        : "les droites ne sont pas parallèles";

      return {
        text:
          `On sait que AM = ${AM}, AB = ${AB}, AN = ${AN} et AC = ${AC}. ` +
          `Quelle conclusion est correcte ?`,
        format: "qcm",
        choices: makeChoices(expected, [
          "les droites sont perpendiculaires",
          "le triangle est rectangle",
          same ? "les droites ne sont pas parallèles" : "les droites sont parallèles",
        ]),
        expected: [expected],
        comparator: "mcq_exact",
        explanation:
          "Définition : la réciproque de Thalès permet de tester un parallélisme.\n\n" +
          "Méthode : on compare AM/AB et AN/AC.\n\n" +
          `Calcul : AM/AB = ${AM}/${AB} = 1/2. AN/AC = ${AN}/${AC} ${
            same ? "= 1/2" : "≠ 1/2"
          }.\n\n` +
          `Conclusion : ${expected}.`,
        canvas: thalesCanvas({
          sideLabels: {
            AM: `${AM}`,
            AB: `${AB}`,
            AN: `${AN}`,
            AC: `${AC}`,
          },
          showFormula: false,
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_thales_reciproque_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_reciproque",
    difficulty: 4,
    theme: "neutral",
    text:
      "Pour utiliser la réciproque de Thalès, suffit-il de vérifier que deux rapports sont à peu près égaux sur un dessin ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une figure peut être trompeuse.",
    explanation:
      "Définition : la réciproque de Thalès demande une égalité exacte de rapports.\n\n" +
      "Méthode : on utilise les longueurs données et un calcul, pas seulement l’apparence du dessin.\n\n" +
      "Calcul : deux segments peuvent sembler parallèles sur une figure sans l’être exactement.\n\n" +
      "Conclusion : il faut comparer les rapports par le calcul.",
    tags: ["thales", "reciproque", "piege", "figure"],
  },

  {
    kind: "fixed",
    id: "3e_thales_reciproque_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_reciproque",
    difficulty: 5,
    theme: "neutral",
    text:
      "Explique comment utiliser la réciproque du théorème de Thalès pour prouver que deux droites sont parallèles.",
    format: "open",
    expected: ["alignés", "rapports", "égaux", "parallèles"],
    comparator: "contains_keyword",
    hint: "Tu dois parler des points alignés et des rapports égaux.",
    explanation:
      "Définition : la réciproque de Thalès permet de démontrer un parallélisme.\n\n" +
      "Méthode : on vérifie d’abord que les points sont alignés dans le même ordre, puis on compare deux rapports de longueurs correspondantes.\n\n" +
      "Calcul : si les rapports sont égaux, alors les droites correspondantes sont parallèles.\n\n" +
      "Conclusion : la réciproque transforme une égalité de rapports en conclusion de parallélisme.",
    tags: ["thales", "reciproque", "open", "redaction"],
  },
]