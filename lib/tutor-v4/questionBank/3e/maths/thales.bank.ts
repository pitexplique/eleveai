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
  showParallelMarks?: boolean;
  highlightParallel?: boolean;
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
      showParallelMarks: data.showParallelMarks ?? true,
      highlightParallel: data.highlightParallel ?? true,
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
    id: "3e_thales_theoreme_configuration_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
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
    tags: ["thales_theoreme", "configuration", "paralleles", "qcm"],

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
    id: "3e_thales_theoreme_configuration_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
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
    tags: ["thales_theoreme", "configuration", "qcm"],
  },

  {
    kind: "template",
    id: "3e_thales_theoreme_configuration_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère les droites parallèles.",
    tags: ["thales_theoreme", "configuration", "template"],

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
    id: "3e_thales_theoreme_rapport_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
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
    tags: ["thales_theoreme", "rapport", "qcm"],
  },

  {
    kind: "template",
    id: "3e_thales_theoreme_rapport_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Associe les côtés correspondants.",
    tags: ["thales_theoreme", "rapport", "template"],

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
    id: "3e_thales_theoreme_calculer_longueur_tpl_1_trouver_ac",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise AM/AB = AN/AC puis fais un produit en croix.",
    tags: ["thales_theoreme", "calculer_longueur", "produit_en_croix", "template"],

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
    id: "3e_thales_theoreme_calculer_longueur_tpl_2_trouver_an",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "Le petit triangle est une réduction du grand triangle.",
    tags: ["thales_theoreme", "calculer_longueur", "reduction", "template"],

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
    id: "3e_thales_theoreme_calculer_longueur_tpl_3_trouver_mn",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise aussi le rapport MN/BC.",
    tags: ["thales_theoreme", "calculer_longueur", "mn_bc", "template"],

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
    id: "3e_thales_theoreme_calculer_longueur_tpl_4_produit_croix",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "Produit en croix : AM × AC = AB × AN.",
    tags: ["thales_theoreme", "calculer_longueur", "produit_en_croix", "template"],

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
    id: "3e_thales_theoreme_calculer_longueur_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
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
    tags: ["thales_theoreme", "piege", "rapport", "correspondance"],
  },

  {
    kind: "fixed",
    id: "3e_thales_theoreme_calculer_longueur_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
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
    tags: ["thales_theoreme", "calculer_longueur", "open", "methode"],
  },
    /* =========================
     THALES_RECIPROQUE
  ========================= */

  {
    kind: "template",
    id: "3e_thales_theoreme_reciproque_tpl_1_verifier_oui",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare les rapports AM/AB et AN/AC.",
    tags: ["thales_theoreme", "reciproque", "paralleles", "template"],

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
          showParallelMarks: false,
          highlightParallel: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_thales_theoreme_reciproque_tpl_2_verifier_non",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque",
    difficulty: 4,
    theme: "neutral",
    hint: "Si les rapports ne sont pas égaux, les droites ne sont pas parallèles.",
    tags: ["thales_theoreme", "reciproque", "non_paralleles", "template"],

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
          showParallelMarks: false,
          highlightParallel: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_thales_theoreme_reciproque_tpl_3_qcm_rapport",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule les deux rapports puis compare-les.",
    tags: ["thales_theoreme", "reciproque", "rapport", "qcm", "template"],

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
          showParallelMarks: false,
          highlightParallel: false,
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_thales_theoreme_reciproque_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
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
    tags: ["thales_theoreme", "reciproque", "piege", "figure"],
  },

  {
    kind: "fixed",
    id: "3e_thales_theoreme_reciproque_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
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
    tags: ["thales_theoreme", "reciproque", "open", "redaction"],
  },
    /* =========================
     THALES_REDIGER
  ========================= */

  {
    kind: "fixed",
    id: "3e_thales_theoreme_rediger_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    text:
      "Dans une rédaction avec Thalès, quelle information faut-il écrire avant les rapports ?",
    format: "qcm",
    choices: [
      "les points alignés et les droites parallèles",
      "seulement le résultat final",
      "l’aire du triangle",
      "le périmètre du triangle",
    ],
    expected: ["les points alignés et les droites parallèles"],
    comparator: "mcq_exact",
    hint: "Il faut d’abord justifier que Thalès peut s’appliquer.",
    explanation:
      "Définition : une rédaction avec Thalès doit montrer que les conditions du théorème sont réunies.\n\n" +
      "Méthode : on commence par citer les points alignés et les droites parallèles.\n\n" +
      "Calcul : ensuite seulement, on écrit les rapports égaux.\n\n" +
      "Conclusion : il faut toujours annoncer les conditions avant les calculs.",
    tags: ["thales_theoreme", "redaction", "qcm", "methode"],
  },

  {
    kind: "template",
    id: "3e_thales_theoreme_rediger_tpl_1_choisir_phrase",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "Une bonne phrase cite les alignements et le parallélisme.",
    tags: ["thales_theoreme", "rediger", "template", "qcm"],

    generate: () => {
      return {
        text:
          "Quelle phrase convient le mieux pour commencer une rédaction avec le théorème de Thalès ?",
        format: "qcm",
        choices: makeChoices(
          "Les points A, M, B sont alignés, les points A, N, C sont alignés et (MN) // (BC).",
          [
            "Le triangle ABC est rectangle.",
            "Les longueurs sont à peu près proportionnelles sur le dessin.",
            "On voit que les droites ont l’air parallèles.",
          ]
        ),
        expected: [
          "Les points A, M, B sont alignés, les points A, N, C sont alignés et (MN) // (BC).",
        ],
        comparator: "mcq_exact",
        explanation:
          "Définition : pour utiliser Thalès, il faut une configuration avec points alignés et droites parallèles.\n\n" +
          "Méthode : la rédaction commence par vérifier ces conditions.\n\n" +
          "Calcul : aucune longueur n’est encore calculée à cette étape.\n\n" +
          "Conclusion : la bonne phrase annonce clairement les alignements et le parallélisme.",
        canvas: thalesCanvas({
          sideLabels: {
            AM: "3 cm",
            AB: "6 cm",
            AN: "4 cm",
            AC: "8 cm",
          },
          showFormula: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_thales_theoreme_rediger_tpl_2_calcul_ac",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 5,
    theme: "neutral",
    hint: "Rédige : conditions, rapports, remplacement, calcul, conclusion.",
    tags: ["thales_theoreme", "rediger", "calcul", "template"],

    generate: () => {
      const AM = randomChoice([2, 3, 4]);
      const k = randomChoice([2, 3]);
      const AB = AM * k;
      const AN = randomChoice([3, 4, 5]);
      const AC = AN * k;

      return {
        text:
          `Rédiger le calcul de AC sachant que A, M, B sont alignés, A, N, C sont alignés, (MN) // (BC), ` +
          `AM = ${AM} cm, AB = ${AB} cm et AN = ${AN} cm.`,
        format: "open",
        expected: ["alignés", "parallèles", "AM", "AB", "AN", "AC"],
        comparator: "contains_keyword",
        explanation:
          "Définition : le théorème de Thalès permet de calculer une longueur dans une configuration de droites parallèles.\n\n" +
          "Méthode : on rédige les conditions, puis les rapports.\n\n" +
          `Calcul : les points A, M, B sont alignés, les points A, N, C sont alignés et (MN) // (BC).\n` +
          `D’après le théorème de Thalès : AM/AB = AN/AC.\n` +
          `Donc ${AM}/${AB} = ${AN}/AC.\n` +
          `Comme ${AB} = ${k} × ${AM}, on obtient AC = ${k} × ${AN} = ${AC}.\n\n` +
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
    id: "3e_thales_theoreme_rediger_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 5,
    theme: "neutral",
    text:
      "Explique les étapes d’une rédaction complète avec le théorème de Thalès.",
    format: "open",
    expected: ["alignés", "parallèles", "rapports", "conclusion"],
    comparator: "contains_keyword",
    hint: "Pense à l’ordre : conditions → théorème → rapports → calcul → conclusion.",
    explanation:
      "Définition : une rédaction complète avec Thalès doit justifier l’utilisation du théorème.\n\n" +
      "Méthode : on écrit d’abord les points alignés et les droites parallèles, puis on cite le théorème.\n\n" +
      "Calcul : on écrit les rapports, on remplace par les valeurs et on calcule la longueur cherchée.\n\n" +
      "Conclusion : on termine par une phrase avec l’unité.",
    tags: ["thales_theoreme", "redaction", "open", "methode"],
  },
  /* =========================
     THALES_DEFIS
  ========================= */

  {
    kind: "template",
    id: "3e_thales_theoreme_defi_tpl_1_brevet_calcul",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Repère les triangles semblables puis utilise les rapports de Thalès.",
    tags: ["thales_theoreme", "defi", "brevet", "calcul", "template"],

    generate: () => {
      const AM = randomChoice([2, 3, 4, 5]);
      const k = randomChoice([2, 3]);
      const AB = AM * k;
      const AN = randomChoice([3, 4, 5, 6]);
      const AC = AN * k;

      return {
        text:
          `Dans une configuration de Thalès, A, M, B sont alignés, A, N, C sont alignés et (MN) // (BC). ` +
          `On sait que AM = ${AM} cm, AB = ${AB} cm et AN = ${AN} cm. Calculer AC.`,
        format: "short",
        expected: [String(AC)],
        comparator: "number_equal",
        explanation:
          "Définition : Thalès permet de calculer une longueur grâce à des rapports égaux.\n\n" +
          "Méthode : on écrit AM/AB = AN/AC.\n\n" +
          `Calcul : ${AM}/${AB} = ${AN}/AC. Le coefficient est ${AB} ÷ ${AM} = ${k}. Donc AC = ${AN} × ${k} = ${AC}.\n\n` +
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
    id: "3e_thales_theoreme_defi_tpl_2_reciproque",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les deux rapports.",
    tags: ["thales_theoreme", "defi", "reciproque", "template"],

    generate: () => {
      const same = randomChoice([true, false]);

      const AM = 4;
      const AB = 8;
      const AN = 5;
      const AC = same ? 10 : 11;

      const correct = same ? "oui" : "non";

      return {
        text:
          `Les points A, M, B sont alignés et les points A, N, C sont alignés dans le même ordre. ` +
          `AM = ${AM} cm, AB = ${AB} cm, AN = ${AN} cm et AC = ${AC} cm. ` +
          `Peut-on conclure que (MN) // (BC) ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la réciproque de Thalès permet de prouver un parallélisme.\n\n" +
          "Méthode : on compare AM/AB et AN/AC.\n\n" +
          `Calcul : AM/AB = ${AM}/${AB} = 1/2. AN/AC = ${AN}/${AC} ${
            same ? "= 1/2" : "≠ 1/2"
          }.\n\n` +
          `Conclusion : la réponse est ${correct}.`,
        canvas: thalesCanvas({
          sideLabels: {
            AM: `${AM} cm`,
            AB: `${AB} cm`,
            AN: `${AN} cm`,
            AC: `${AC} cm`,
          },
          showFormula: false,
          showParallelMarks: false,
          highlightParallel: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_thales_theoreme_defi_tpl_3_papillon_calcul",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Dans la configuration papillon, on compare les distances depuis le point d’intersection.",
    tags: ["thales_theoreme", "defi", "papillon", "template"],

    generate: () => {
      const AB = randomChoice([3, 4, 5]);
      const k = randomChoice([2, 3]);
      const AC = AB * k;

      const AM = randomChoice([2, 3, 4]);
      const AN = AM * k;

      return {
        text:
          `Dans une configuration papillon de Thalès, les droites (BM) et (CN) sont parallèles. ` +
          `On sait que AB = ${AB} cm, AC = ${AC} cm et AM = ${AM} cm. Calculer AN.`,
        format: "short",
        expected: [String(AN)],
        comparator: "number_equal",
        explanation:
          "Définition : dans une configuration papillon, Thalès s’applique aussi avec deux droites sécantes et deux parallèles.\n\n" +
          "Méthode : on compare les longueurs situées sur les mêmes droites sécantes.\n\n" +
          `Calcul : AC/AB = ${AC}/${AB} = ${k}. Donc AN = ${AM} × ${k} = ${AN}.\n\n` +
          `Conclusion : AN = ${AN} cm.`,
        canvas: thalesCanvas({
          variant: "papillon",
          sideLabels: {
            AB: `${AB} cm`,
            AC: `${AC} cm`,
            AM: `${AM} cm`,
            AN: "?",
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_thales_theoreme_defi_tpl_4_reunion_ombre",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Les rayons du soleil sont parallèles : les triangles sont proportionnels.",
    tags: ["thales_theoreme", "defi", "reunion", "ombre", "template"],

    generate: () => {
      const batonHauteur = randomChoice([1, 2]);
      const batonOmbre = randomChoice([2, 3]);
      const arbreOmbre = batonOmbre * randomChoice([4, 5, 6]);
      const arbreHauteur = (batonHauteur * arbreOmbre) / batonOmbre;

      return {
        text:
          `À La Réunion, un bâton de ${batonHauteur} m projette une ombre de ${batonOmbre} m. ` +
          `Au même moment, un arbre projette une ombre de ${arbreOmbre} m. Quelle est la hauteur de l’arbre ?`,
        format: "short",
        expected: [String(arbreHauteur)],
        comparator: "number_equal",
        explanation:
          "Définition : les rayons du soleil peuvent être considérés comme parallèles, ce qui crée une situation de Thalès.\n\n" +
          "Méthode : les hauteurs et les ombres sont proportionnelles.\n\n" +
          `Calcul : hauteur arbre / ${arbreOmbre} = ${batonHauteur} / ${batonOmbre}.\n` +
          `Donc hauteur arbre = ${arbreOmbre} × ${batonHauteur} ÷ ${batonOmbre} = ${arbreHauteur}.\n\n` +
          `Conclusion : l’arbre mesure ${arbreHauteur} m.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_thales_theoreme_defi_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    text:
      "Un élève applique Thalès uniquement parce que deux segments semblent parallèles sur le dessin. Est-ce suffisant ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une figure peut ne pas être à l’échelle.",
    explanation:
      "Définition : Thalès nécessite des droites parallèles indiquées ou démontrées.\n\n" +
      "Méthode : on ne se fie jamais seulement à l’apparence du dessin.\n\n" +
      "Calcul : si le parallélisme n’est pas donné ou prouvé, on ne peut pas appliquer directement Thalès.\n\n" +
      "Conclusion : ce n’est pas suffisant.",
    tags: ["thales_theoreme", "defi", "piege", "figure"],
  },

  {
    kind: "fixed",
    id: "3e_thales_theoreme_defi_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    text:
      "Explique la différence entre le théorème de Thalès et sa réciproque.",
    format: "open",
    expected: ["calculer", "longueur", "prouver", "parallèles"],
    comparator: "contains_keyword",
    hint: "Le théorème calcule une longueur ; la réciproque prouve un parallélisme.",
    explanation:
      "Définition : le théorème de Thalès et sa réciproque n’ont pas le même objectif.\n\n" +
      "Méthode : le théorème s’utilise quand les parallèles sont connues ; la réciproque s’utilise quand on veut prouver le parallélisme.\n\n" +
      "Calcul : avec le théorème, on écrit des rapports pour calculer une longueur. Avec la réciproque, on compare des rapports pour conclure que des droites sont parallèles.\n\n" +
      "Conclusion : théorème = calculer ; réciproque = prouver.",
    tags: ["thales_theoreme", "defi", "open", "theoreme", "reciproque"],
  },

  /* =========================
     THALES_CONFIGURATION (compléments)
  ========================= */

  {
    kind: "fixed",
    id: "3e_thales_theoreme_configuration_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 1,
    theme: "neutral",
    text: "Une configuration de Thalès met en jeu…",
    format: "qcm",
    choices: [
      "deux droites parallèles coupées par deux droites sécantes",
      "deux droites perpendiculaires",
      "un triangle rectangle",
      "un cercle et une tangente",
    ],
    expected: ["deux droites parallèles coupées par deux droites sécantes"],
    comparator: "mcq_exact",
    hint: "Pense à deux sécantes et deux parallèles.",
    explanation:
      "Définition : une configuration de Thalès comporte deux droites parallèles coupées par deux sécantes.\n\n" +
      "Méthode : on repère les deux sécantes et les deux parallèles.\n\n" +
      "Calcul : la configuration usuelle est un triangle coupé par une parallèle à un côté.\n\n" +
      "Conclusion : ce sont deux droites parallèles coupées par deux sécantes.",
    tags: ["thales_theoreme", "configuration", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_thales_theoreme_configuration_fixed_4",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle $ABC$ avec $M$ sur $[AB]$ et $N$ sur $[AC]$, quelles sont les deux droites sécantes de la configuration ?",
    format: "qcm",
    choices: ["$(AB)$ et $(AC)$", "$(MN)$ et $(BC)$", "$(AB)$ et $(MN)$", "$(BC)$ et $(AC)$"],
    expected: ["$(AB)$ et $(AC)$"],
    comparator: "mcq_exact",
    hint: "Les sécantes passent par le sommet $A$.",
    explanation:
      "Définition : les deux sécantes se croisent au sommet du triangle.\n\n" +
      "Méthode : on repère les droites passant par $A$.\n\n" +
      "Calcul : ce sont $(AB)$ et $(AC)$, coupées par les parallèles $(MN)$ et $(BC)$.\n\n" +
      "Conclusion : les sécantes sont $(AB)$ et $(AC)$.",
    canvas: thalesCanvas({ sideLabels: { AM: "3", AB: "6", AN: "2", AC: "4" } }),
    tags: ["thales_theoreme", "configuration", "secantes", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_thales_theoreme_configuration_fixed_5_papillon",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une configuration « papillon », les deux triangles sont situés…",
    format: "qcm",
    choices: [
      "de part et d’autre du point d’intersection des sécantes",
      "du même côté du point d’intersection",
      "l’un dans l’autre",
      "côte à côte sans point commun",
    ],
    expected: ["de part et d’autre du point d’intersection des sécantes"],
    comparator: "mcq_exact",
    hint: "Les deux triangles forment des « ailes » opposées.",
    explanation:
      "Définition : la configuration papillon a deux triangles opposés par le sommet d’intersection.\n\n" +
      "Méthode : on repère le point où se croisent les sécantes.\n\n" +
      "Calcul : les deux triangles sont situés de part et d’autre de ce point.\n\n" +
      "Conclusion : ils sont de part et d’autre du point d’intersection.",
    canvas: thalesCanvas({ variant: "papillon", sideLabels: { AB: "3 cm", AC: "6 cm", AM: "2 cm", AN: "4 cm" } }),
    tags: ["thales_theoreme", "configuration", "papillon", "qcm"],
  },
  {
    kind: "template",
    id: "3e_thales_theoreme_configuration_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    hint: "Les parallèles sont $(MN)$ et $(BC)$.",
    tags: ["thales_theoreme", "configuration", "canvas", "template"],
    generate: () => {
      return {
        text: "Dans cette configuration de Thalès, quelles droites sont parallèles ?",
        format: "qcm",
        choices: shuffle(["$(MN)$ et $(BC)$", "$(AB)$ et $(AC)$", "$(AM)$ et $(AN)$", "$(AB)$ et $(MN)$"]),
        expected: ["$(MN)$ et $(BC)$"],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans cette configuration, la parallèle coupe les deux côtés du triangle.\n\n" +
          "Méthode : on repère les marques de parallélisme.\n\n" +
          "Calcul : les droites parallèles sont $(MN)$ et $(BC)$.\n\n" +
          "Conclusion : $(MN)$ et $(BC)$ sont parallèles.",
        canvas: thalesCanvas({ sideLabels: { AM: "3", AB: "9", AN: "2", AC: "6" } }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_thales_theoreme_configuration_fixed_6_conditions",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 3,
    theme: "neutral",
    text: "Pour appliquer le théorème de Thalès, il faut que les points soient alignés et que…",
    format: "qcm",
    choices: [
      "deux droites soient parallèles",
      "le triangle soit rectangle",
      "les longueurs soient entières",
      "les angles soient égaux à $60^\\circ$",
    ],
    expected: ["deux droites soient parallèles"],
    comparator: "mcq_exact",
    hint: "Le parallélisme est indispensable.",
    explanation:
      "Définition : Thalès exige des points alignés et deux droites parallèles.\n\n" +
      "Méthode : on vérifie l’alignement et le parallélisme.\n\n" +
      "Calcul : sans parallélisme, les rapports ne sont pas garantis égaux.\n\n" +
      "Conclusion : il faut que deux droites soient parallèles.",
    tags: ["thales_theoreme", "configuration", "conditions", "qcm"],
  },

  /* =========================
     THALES_RAPPORT (compléments)
  ========================= */

  {
    kind: "fixed",
    id: "3e_thales_theoreme_rapport_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle égalité de rapports traduit complètement le théorème de Thalès ?",
    format: "qcm",
    choices: [
      "$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$",
      "$\\dfrac{AM}{AN} = \\dfrac{AB}{BC}$",
      "$\\dfrac{AB}{AC} = \\dfrac{MN}{AM}$",
      "$AM + AN = MN$",
    ],
    expected: ["$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$"],
    comparator: "mcq_exact",
    hint: "Trois rapports correspondants sont égaux.",
    explanation:
      "Définition : Thalès donne trois rapports de longueurs correspondantes égaux.\n\n" +
      "Méthode : on associe $AM$ à $AB$, $AN$ à $AC$ et $MN$ à $BC$.\n\n" +
      "Calcul : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.\n\n" +
      "Conclusion : c’est la première égalité.",
    tags: ["thales_theoreme", "rapport", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_thales_theoreme_rapport_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 2,
    theme: "neutral",
    text: "Dans $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$, à quel côté correspond $MN$ ?",
    format: "qcm",
    choices: ["$BC$", "$AB$", "$AC$", "$AM$"],
    expected: ["$BC$"],
    comparator: "mcq_exact",
    hint: "$MN$ est le segment parallèle à un côté du triangle.",
    explanation:
      "Définition : $MN$ est parallèle à $BC$ et lui correspond.\n\n" +
      "Méthode : on ajoute le rapport $\\dfrac{MN}{BC}$ à l’égalité.\n\n" +
      "Calcul : $MN$ correspond à $BC$.\n\n" +
      "Conclusion : $MN$ correspond à $BC$.",
    tags: ["thales_theoreme", "rapport", "correspondance", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_thales_theoreme_rapport_fixed_4_completer",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 2,
    theme: "neutral",
    text: "Complète l’égalité de Thalès : $\\dfrac{AM}{AB} = \\dfrac{\\square}{AC}$.",
    format: "qcm",
    choices: ["$AN$", "$MN$", "$BC$", "$AB$"],
    expected: ["$AN$"],
    comparator: "mcq_exact",
    hint: "$AM$ va avec $AB$ ; il faut le côté qui va avec $AC$.",
    explanation:
      "Définition : les rapports comparent des côtés correspondants.\n\n" +
      "Méthode : $AM$ correspond à $AB$, donc le numérateur du second rapport correspond à $AC$.\n\n" +
      "Calcul : c’est $AN$.\n\n" +
      "Conclusion : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$.",
    tags: ["thales_theoreme", "rapport", "completer", "qcm"],
  },
  {
    kind: "template",
    id: "3e_thales_theoreme_rapport_tpl_2_choisir",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Associe les côtés correspondants sur les deux sécantes.",
    tags: ["thales_theoreme", "rapport", "qcm", "template"],
    generate: () => {
      return {
        text: "Quel rapport est égal à $\\dfrac{AM}{AB}$ dans une configuration de Thalès ?",
        format: "qcm",
        choices: shuffle(["$\\dfrac{AN}{AC}$", "$\\dfrac{AC}{AN}$", "$\\dfrac{AB}{AM}$", "$\\dfrac{BC}{MN}$"]),
        expected: ["$\\dfrac{AN}{AC}$"],
        comparator: "mcq_exact",
        explanation:
          "Définition : les rapports de Thalès comparent des côtés correspondants dans le même ordre.\n\n" +
          "Méthode : $AM$ correspond à $AB$ sur une sécante, $AN$ à $AC$ sur l’autre.\n\n" +
          "Calcul : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$.\n\n" +
          "Conclusion : le rapport égal est $\\dfrac{AN}{AC}$.",
        canvas: thalesCanvas({ sideLabels: { AM: "3", AB: "6", AN: "4", AC: "8" } }),
      };
    },
  },
  {
    kind: "template",
    id: "3e_thales_theoreme_rapport_tpl_3_coefficient",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient d’agrandissement est $AB \\div AM$.",
    tags: ["thales_theoreme", "rapport", "coefficient", "template"],
    generate: () => {
      const AM = randomChoice([2, 3, 4]);
      const k = randomChoice([2, 3]);
      const AB = AM * k;
      return {
        text: `Dans une configuration de Thalès, $AM = ${AM}$ cm et $AB = ${AB}$ cm. Par quel coefficient passe-t-on du petit triangle au grand triangle ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation:
          `Définition : le coefficient d’agrandissement relie les longueurs correspondantes.\n\n` +
          `Méthode : on calcule $AB \\div AM$.\n\n` +
          `Calcul : $${AB} \\div ${AM} = ${k}$.\n\n` +
          `Conclusion : le coefficient est $${k}$.`,
        canvas: thalesCanvas({ sideLabels: { AM: `${AM} cm`, AB: `${AB} cm`, AN: "", AC: "" } }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_thales_theoreme_rapport_fixed_5_reduction",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une configuration de Thalès classique, le petit triangle $AMN$ est…",
    format: "qcm",
    choices: [
      "une réduction du grand triangle $ABC$",
      "un agrandissement du grand triangle",
      "un triangle rectangle",
      "sans rapport avec $ABC$",
    ],
    expected: ["une réduction du grand triangle $ABC$"],
    comparator: "mcq_exact",
    hint: "$M$ est sur $[AB]$ et $N$ sur $[AC]$.",
    explanation:
      "Définition : les triangles $AMN$ et $ABC$ ont les mêmes angles.\n\n" +
      "Méthode : on compare leurs longueurs correspondantes.\n\n" +
      "Calcul : $AMN$ a des côtés plus courts, proportionnels à ceux de $ABC$.\n\n" +
      "Conclusion : $AMN$ est une réduction de $ABC$.",
    tags: ["thales_theoreme", "rapport", "reduction", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_thales_theoreme_rapport_fixed_6_mn_bc",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi est égal le rapport $\\dfrac{MN}{BC}$ dans une configuration de Thalès ?",
    format: "qcm",
    choices: ["$\\dfrac{AM}{AB}$", "$\\dfrac{AB}{AM}$", "$\\dfrac{BC}{MN}$", "$\\dfrac{AC}{AN}$"],
    expected: ["$\\dfrac{AM}{AB}$"],
    comparator: "mcq_exact",
    hint: "Tous les rapports de Thalès sont égaux entre eux.",
    explanation:
      "Définition : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.\n\n" +
      "Méthode : on relie $\\dfrac{MN}{BC}$ aux autres rapports.\n\n" +
      "Calcul : il est égal à $\\dfrac{AM}{AB}$.\n\n" +
      "Conclusion : $\\dfrac{MN}{BC} = \\dfrac{AM}{AB}$.",
    tags: ["thales_theoreme", "rapport", "mn_bc", "qcm"],
  },

  /* =========================
     THALES_CALCULER_LONGUEUR (compléments)
  ========================= */

  {
    kind: "fixed",
    id: "3e_thales_theoreme_calculer_longueur_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le triangle $ABC$, $(MN) // (BC)$, $AM = 3$ cm, $AB = 9$ cm et $AN = 4$ cm. Combien vaut $AC$ (en cm) ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "$AB = 3 \\times AM$, donc $AC = 3 \\times AN$.",
    explanation:
      "Définition : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$.\n\n" +
      "Méthode : on cherche le coefficient $AB \\div AM = 3$.\n\n" +
      "Calcul : $AC = 3 \\times AN = 3 \\times 4 = 12$.\n\n" +
      "Conclusion : $AC = 12$ cm.",
    canvas: thalesCanvas({ sideLabels: { AM: "3 cm", AB: "9 cm", AN: "4 cm", AC: "?" } }),
    tags: ["thales_theoreme", "calculer_longueur", "short"],
  },
  {
    kind: "template",
    id: "3e_thales_theoreme_calculer_longueur_tpl_5_ab",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "Produit en croix : $AM \\times AC = AB \\times AN$.",
    tags: ["thales_theoreme", "calculer_longueur", "produit_croix", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const AN = randomChoice([2, 3, 4]);
      const AC = AN * k;
      const AM = randomChoice([3, 5]);
      const AB = AM * k;
      return {
        text: `Dans le triangle $ABC$, $(MN) // (BC)$. On sait que $AN = ${AN}$ cm, $AC = ${AC}$ cm et $AM = ${AM}$ cm. Calcule $AB$ (en cm).`,
        format: "short",
        expected: [String(AB)],
        comparator: "number_equal",
        explanation:
          `Définition : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$.\n\n` +
          `Méthode : le coefficient est $AC \\div AN = ${k}$.\n\n` +
          `Calcul : $AB = ${k} \\times AM = ${k} \\times ${AM} = ${AB}$.\n\n` +
          `Conclusion : $AB = ${AB}$ cm.`,
        canvas: thalesCanvas({ sideLabels: { AM: `${AM} cm`, AB: "?", AN: `${AN} cm`, AC: `${AC} cm` } }),
      };
    },
  },
  {
    kind: "template",
    id: "3e_thales_theoreme_calculer_longueur_tpl_6_bc",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\dfrac{MN}{BC} = \\dfrac{AM}{AB}$.",
    tags: ["thales_theoreme", "calculer_longueur", "mn_bc", "template"],
    generate: () => {
      const AM = randomChoice([2, 3, 4]);
      const k = randomChoice([2, 3]);
      const AB = AM * k;
      const MN = randomChoice([3, 4, 5]);
      const BC = MN * k;
      return {
        text: `Dans le triangle $ABC$, $(MN) // (BC)$. On sait que $AM = ${AM}$ cm, $AB = ${AB}$ cm et $MN = ${MN}$ cm. Calcule $BC$ (en cm).`,
        format: "short",
        expected: [String(BC)],
        comparator: "number_equal",
        explanation:
          `Définition : $\\dfrac{MN}{BC} = \\dfrac{AM}{AB}$.\n\n` +
          `Méthode : le coefficient d’agrandissement est $AB \\div AM = ${k}$.\n\n` +
          `Calcul : $BC = ${k} \\times MN = ${k} \\times ${MN} = ${BC}$.\n\n` +
          `Conclusion : $BC = ${BC}$ cm.`,
        canvas: thalesCanvas({ sideLabels: { AM: `${AM} cm`, AB: `${AB} cm`, MN: `${MN} cm`, BC: "?" } }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_thales_theoreme_calculer_longueur_fixed_2_croix",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    text: "Dans le triangle $ABC$, $(MN) // (BC)$, $AM = 4$ cm, $AB = 6$ cm et $AN = 6$ cm. Combien vaut $AC$ (en cm) ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "$\\dfrac{4}{6} = \\dfrac{6}{AC}$, produit en croix.",
    explanation:
      "Définition : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$.\n\n" +
      "Méthode : produit en croix $AM \\times AC = AB \\times AN$.\n\n" +
      "Calcul : $4 \\times AC = 6 \\times 6 = 36$, donc $AC = 9$.\n\n" +
      "Conclusion : $AC = 9$ cm.",
    canvas: thalesCanvas({ sideLabels: { AM: "4 cm", AB: "6 cm", AN: "6 cm", AC: "?" } }),
    tags: ["thales_theoreme", "calculer_longueur", "produit_croix", "short"],
  },

  /* =========================
     THALES_RECIPROQUE (compléments)
  ========================= */

  {
    kind: "fixed",
    id: "3e_thales_theoreme_reciproque_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi sert la réciproque du théorème de Thalès ?",
    format: "qcm",
    choices: [
      "à prouver que deux droites sont parallèles",
      "à calculer une longueur",
      "à calculer un angle",
      "à mesurer une aire",
    ],
    expected: ["à prouver que deux droites sont parallèles"],
    comparator: "mcq_exact",
    hint: "On part de longueurs pour conclure sur le parallélisme.",
    explanation:
      "Définition : la réciproque de Thalès conclut sur un parallélisme.\n\n" +
      "Méthode : on compare deux rapports de longueurs.\n\n" +
      "Calcul : si les rapports sont égaux (et les points alignés dans le même ordre), les droites sont parallèles.\n\n" +
      "Conclusion : la réciproque sert à prouver que deux droites sont parallèles.",
    tags: ["thales_theoreme", "reciproque", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_thales_theoreme_reciproque_fixed_3_oui",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque",
    difficulty: 3,
    theme: "neutral",
    text: "$A$, $M$, $B$ alignés et $A$, $N$, $C$ alignés dans le même ordre. $AM = 3$, $AB = 6$, $AN = 5$, $AC = 10$. $(MN)$ et $(BC)$ sont-elles parallèles ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare $\\dfrac{3}{6}$ et $\\dfrac{5}{10}$.",
    explanation:
      "Définition : on applique la réciproque de Thalès.\n\n" +
      "Méthode : on compare $\\dfrac{AM}{AB}$ et $\\dfrac{AN}{AC}$.\n\n" +
      "Calcul : $\\dfrac{3}{6} = \\dfrac{1}{2}$ et $\\dfrac{5}{10} = \\dfrac{1}{2}$ : rapports égaux.\n\n" +
      "Conclusion : oui, $(MN) // (BC)$.",
    tags: ["thales_theoreme", "reciproque", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_thales_theoreme_reciproque_fixed_4_non",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque",
    difficulty: 3,
    theme: "neutral",
    text: "$AM = 2$, $AB = 5$, $AN = 3$, $AC = 6$ (points alignés dans le même ordre). $(MN)$ et $(BC)$ sont-elles parallèles ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare $\\dfrac{2}{5}$ et $\\dfrac{3}{6}$.",
    explanation:
      "Définition : on applique la réciproque de Thalès.\n\n" +
      "Méthode : on compare $\\dfrac{AM}{AB}$ et $\\dfrac{AN}{AC}$.\n\n" +
      "Calcul : $\\dfrac{2}{5} = 0{,}4$ et $\\dfrac{3}{6} = 0{,}5$ : rapports différents.\n\n" +
      "Conclusion : non, les droites ne sont pas parallèles.",
    tags: ["thales_theoreme", "reciproque", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_thales_theoreme_reciproque_fixed_5_ordre",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque",
    difficulty: 4,
    theme: "neutral",
    text: "Pour appliquer la réciproque de Thalès, en plus de l’égalité des rapports, que faut-il vérifier ?",
    format: "qcm",
    choices: [
      "que les points sont alignés dans le même ordre",
      "que le triangle est isocèle",
      "que les longueurs sont entières",
      "que les angles valent $90^\\circ$",
    ],
    expected: ["que les points sont alignés dans le même ordre"],
    comparator: "mcq_exact",
    hint: "L’ordre des points sur les sécantes compte.",
    explanation:
      "Définition : la réciproque exige l’alignement des points dans le même ordre.\n\n" +
      "Méthode : on vérifie l’ordre des points sur chaque sécante avant de conclure.\n\n" +
      "Calcul : sans cette condition, l’égalité des rapports ne suffit pas.\n\n" +
      "Conclusion : il faut que les points soient alignés dans le même ordre.",
    tags: ["thales_theoreme", "reciproque", "condition", "qcm"],
  },
  {
    kind: "template",
    id: "3e_thales_theoreme_reciproque_tpl_4",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare les deux rapports après simplification.",
    tags: ["thales_theoreme", "reciproque", "qcm", "template"],
    generate: () => {
      const same = randomChoice([true, false]);
      const AM = 3;
      const AB = 9;
      const AN = 4;
      const AC = same ? 12 : 10;
      return {
        text: `$A$, $M$, $B$ et $A$, $N$, $C$ sont alignés dans le même ordre. $AM = ${AM}$, $AB = ${AB}$, $AN = ${AN}$, $AC = ${AC}$. $(MN) // (BC)$ ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [same ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : on compare $\\dfrac{AM}{AB}$ et $\\dfrac{AN}{AC}$.\n\n` +
          `Méthode : on simplifie chaque rapport.\n\n` +
          `Calcul : $\\dfrac{${AM}}{${AB}} = \\dfrac{1}{3}$ et $\\dfrac{${AN}}{${AC}} ${same ? "= \\dfrac{1}{3}" : "\\neq \\dfrac{1}{3}"}$.\n\n` +
          `Conclusion : ${same ? "oui, les droites sont parallèles." : "non, les droites ne sont pas parallèles."}`,
        canvas: thalesCanvas({
          sideLabels: { AM: `${AM}`, AB: `${AB}`, AN: `${AN}`, AC: `${AC}` },
          showFormula: false,
          showParallelMarks: false,
          highlightParallel: false,
        }),
      };
    },
  },

  /* =========================
     THALES_REDIGER (compléments)
  ========================= */

  {
    kind: "fixed",
    id: "3e_thales_theoreme_rediger_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est le bon ordre d’une rédaction avec le théorème de Thalès ?",
    format: "qcm",
    choices: [
      "conditions (alignés + parallèles) → rapports → remplacement → calcul → conclusion",
      "calcul → conclusion → conditions",
      "conclusion → rapports → conditions",
      "rapports → conclusion → calcul",
    ],
    expected: ["conditions (alignés + parallèles) → rapports → remplacement → calcul → conclusion"],
    comparator: "mcq_exact",
    hint: "On justifie d’abord, on calcule ensuite.",
    explanation:
      "Définition : une rédaction suit une logique justifiée.\n\n" +
      "Méthode : on annonce les conditions, on écrit les rapports, on remplace, on calcule, on conclut.\n\n" +
      "Calcul : cet ordre rend la démarche claire.\n\n" +
      "Conclusion : conditions → rapports → remplacement → calcul → conclusion.",
    tags: ["thales_theoreme", "rediger", "ordre", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_thales_theoreme_rediger_fixed_3_citer",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Dans la rédaction, après avoir vérifié les conditions, que cite-t-on ?",
    format: "qcm",
    choices: [
      "le théorème de Thalès",
      "le théorème de Pythagore",
      "la formule de l’aire",
      "le théorème de l’angle inscrit",
    ],
    expected: ["le théorème de Thalès"],
    comparator: "mcq_exact",
    hint: "On nomme le théorème utilisé.",
    explanation:
      "Définition : on doit nommer le théorème appliqué.\n\n" +
      "Méthode : après les conditions, on écrit « d’après le théorème de Thalès ».\n\n" +
      "Calcul : puis on écrit l’égalité des rapports.\n\n" +
      "Conclusion : on cite le théorème de Thalès.",
    tags: ["thales_theoreme", "rediger", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_thales_theoreme_rediger_fixed_4_unite",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Comment termine-t-on une rédaction qui calcule une longueur avec Thalès ?",
    format: "qcm",
    choices: [
      "par une phrase de conclusion avec l’unité",
      "par le mot « fin »",
      "par le dessin de la figure",
      "par la liste des angles",
    ],
    expected: ["par une phrase de conclusion avec l’unité"],
    comparator: "mcq_exact",
    hint: "On répond à la question avec l’unité (cm, m…).",
    explanation:
      "Définition : la conclusion répond à la question posée.\n\n" +
      "Méthode : on écrit la longueur trouvée avec son unité.\n\n" +
      "Calcul : par exemple « donc $AC = 12$ cm ».\n\n" +
      "Conclusion : on termine par une phrase de conclusion avec l’unité.",
    tags: ["thales_theoreme", "rediger", "conclusion", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_thales_theoreme_rediger_fixed_5_erreur",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit directement $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$ sans dire que $(MN) // (BC)$. Sa rédaction est-elle complète ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "L’égalité des rapports vient du parallélisme.",
    explanation:
      "Définition : Thalès exige de justifier le parallélisme.\n\n" +
      "Méthode : on doit citer l’alignement des points et le parallélisme avant les rapports.\n\n" +
      "Calcul : sans cette justification, l’égalité n’est pas fondée.\n\n" +
      "Conclusion : non, la rédaction n’est pas complète.",
    tags: ["thales_theoreme", "rediger", "erreur", "qcm"],
  },
  {
    kind: "template",
    id: "3e_thales_theoreme_rediger_tpl_3_phrase",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 5,
    theme: "neutral",
    hint: "La bonne phrase cite les alignements et le parallélisme.",
    tags: ["thales_theoreme", "rediger", "qcm", "template"],
    generate: () => {
      const correct =
        "Les points $A$, $M$, $B$ sont alignés, les points $A$, $N$, $C$ sont alignés et $(MN) // (BC)$.";
      return {
        text: "Quelle phrase commence correctement une rédaction de Thalès ?",
        format: "qcm",
        choices: shuffle([
          correct,
          "Le triangle $ABC$ est rectangle en $A$.",
          "Les droites ont l’air parallèles sur le dessin.",
          "Le périmètre du triangle est connu.",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la rédaction commence par les conditions d’application.\n\n" +
          "Méthode : on cite les points alignés et le parallélisme.\n\n" +
          "Calcul : aucune longueur n’est encore calculée.\n\n" +
          "Conclusion : la bonne phrase annonce les alignements et le parallélisme.",
        canvas: thalesCanvas({ sideLabels: { AM: "3 cm", AB: "6 cm", AN: "4 cm", AC: "8 cm" }, showFormula: false }),
      };
    },
  },

  /* =========================
     THALES_DEFIS (compléments)
  ========================= */

  {
    kind: "template",
    id: "3e_thales_theoreme_defi_tpl_5_immeuble",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Hauteurs et ombres sont proportionnelles (rayons du soleil parallèles).",
    tags: ["thales_theoreme", "defi", "reunion", "ombre", "template"],
    generate: () => {
      const personneH = 2;
      const personneOmbre = randomChoice([1, 2]);
      const immeubleOmbre = personneOmbre * randomChoice([5, 6, 7]);
      const immeubleH = (personneH * immeubleOmbre) / personneOmbre;
      return {
        text: `À Saint-Denis, une personne de ${personneH} m projette une ombre de ${personneOmbre} m. Au même instant, un immeuble projette une ombre de ${immeubleOmbre} m. Quelle est la hauteur de l’immeuble (en m) ?`,
        format: "short",
        expected: [String(immeubleH)],
        comparator: "number_equal",
        explanation:
          `Définition : les rayons du soleil étant parallèles, on a une situation de Thalès.\n\n` +
          `Méthode : $\\dfrac{\\text{hauteur immeuble}}{\\text{ombre immeuble}} = \\dfrac{\\text{hauteur personne}}{\\text{ombre personne}}$.\n\n` +
          `Calcul : hauteur $= ${immeubleOmbre} \\times ${personneH} \\div ${personneOmbre} = ${immeubleH}$.\n\n` +
          `Conclusion : l’immeuble mesure ${immeubleH} m.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_thales_theoreme_defi_fixed_1_choix",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On connaît plusieurs longueurs et on veut PROUVER que deux droites sont parallèles. Que faut-il utiliser ?",
    format: "qcm",
    choices: [
      "la réciproque du théorème de Thalès",
      "le théorème de Thalès direct",
      "le théorème de Pythagore",
      "la trigonométrie",
    ],
    expected: ["la réciproque du théorème de Thalès"],
    comparator: "mcq_exact",
    hint: "« Prouver un parallélisme » = réciproque.",
    explanation:
      "Définition : la réciproque conclut sur le parallélisme.\n\n" +
      "Méthode : on compare des rapports pour prouver que deux droites sont parallèles.\n\n" +
      "Calcul : le théorème direct, lui, sert à calculer une longueur.\n\n" +
      "Conclusion : on utilise la réciproque du théorème de Thalès.",
    tags: ["thales_theoreme", "defi", "choix", "qcm"],
  },
  {
    kind: "template",
    id: "3e_thales_theoreme_defi_tpl_6_papillon",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Configuration papillon : compare les longueurs sur les sécantes.",
    tags: ["thales_theoreme", "defi", "papillon", "template"],
    generate: () => {
      const OA = randomChoice([2, 3, 4]);
      const k = randomChoice([2, 3]);
      const OB = OA * k;
      const OC = randomChoice([3, 4, 5]);
      const OD = OC * k;
      return {
        text: `Dans une configuration papillon, $(AC) // (BD)$ et les sécantes se coupent en $O$. On a $OA = ${OA}$ cm, $OB = ${OB}$ cm et $OC = ${OC}$ cm. Calcule $OD$ (en cm).`,
        format: "short",
        expected: [String(OD)],
        comparator: "number_equal",
        explanation:
          `Définition : dans la configuration papillon, $\\dfrac{OA}{OB} = \\dfrac{OC}{OD}$.\n\n` +
          `Méthode : le coefficient est $OB \\div OA = ${k}$.\n\n` +
          `Calcul : $OD = ${k} \\times OC = ${k} \\times ${OC} = ${OD}$.\n\n` +
          `Conclusion : $OD = ${OD}$ cm.`,
        canvas: thalesCanvas({ variant: "papillon", sideLabels: { AB: `${OA} cm`, AC: `${OB} cm`, AM: `${OC} cm`, AN: "?" } }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_thales_theoreme_defi_fixed_2_brevet",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Type brevet : $(MN) // (BC)$, $AM = 5$ cm, $AB = 15$ cm, $AN = 4$ cm. Combien vaut $AC$ (en cm) ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Coefficient $= 15 \\div 5 = 3$.",
    explanation:
      "Définition : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$.\n\n" +
      "Méthode : le coefficient est $AB \\div AM = 3$.\n\n" +
      "Calcul : $AC = 3 \\times AN = 3 \\times 4 = 12$.\n\n" +
      "Conclusion : $AC = 12$ cm.",
    canvas: thalesCanvas({ sideLabels: { AM: "5 cm", AB: "15 cm", AN: "4 cm", AC: "?" } }),
    tags: ["thales_theoreme", "defi", "brevet", "short"],
  },
];

