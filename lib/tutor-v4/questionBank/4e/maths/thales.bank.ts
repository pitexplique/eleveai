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

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

export const thalesBank: TutorBankItemV4[] = [
  /* =========================
     THALES_CONFIGURATION
  ========================= */

  {
    kind: "fixed",
    id: "thales_configuration_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
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
      "En 4e, la configuration classique de Thalès se fait dans un triangle avec une droite parallèle à un côté.",
    tags: ["thales", "configuration", "qcm"],
  },

  {
    kind: "fixed",
    id: "thales_configuration_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
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
      "Oui. Dans le triangle ABC, M est sur [AB], N est sur [AC] et (MN) est parallèle à (BC).",
    canvas: thalesCanvas({
      display: {
        showPoints: true,
        showLabels: true,
        showSideLabels: false,
        showParallelMarks: true,
        highlightParallel: true,
      },
    }),
    tags: ["thales", "configuration", "canvas"],
  },

  {
    kind: "template",
    id: "thales_configuration_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    hint: "Thalès nécessite une droite parallèle à un côté du triangle.",
    tags: ["thales", "configuration", "template", "canvas"],
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
        explanation: parallel
          ? "Oui, les conditions de la configuration de Thalès sont réunies."
          : "Non, il manque l’information de parallélisme. On ne peut pas utiliser Thalès directement.",
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
    id: "thales_rapports_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_rapports",
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
      "Dans cette configuration, on a AM / AB = AN / AC = MN / BC.",
    canvas: thalesCanvas({
      display: {
        showPoints: true,
        showLabels: true,
        showSideLabels: false,
        showParallelMarks: true,
      },
    }),
    tags: ["thales", "rapports", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "thales_rapports_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_rapports",
    difficulty: 2,
    theme: "neutral",
    hint: "Associe les petites longueurs avec les grandes longueurs correspondantes.",
    tags: ["thales", "rapports", "template"],
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
          "Les longueurs AM et AB sont sur la même demi-droite. De même, AN et AC sont sur l’autre demi-droite. Donc AM / AB = AN / AC.",
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
    id: "thales_rapports_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_rapports",
    difficulty: 3,
    theme: "neutral",
    hint: "Les rapports doivent comparer petit côté / grand côté sur les deux côtés du triangle.",
    tags: ["thales", "rapports", "piege", "template"],
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
        explanation: `On compare les longueurs correspondantes : AM / AB = AN / AC, donc ${am}/${ab} = ${an}/${ac}.`,
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
    id: "thales_calculer_longueur_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
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
      "On a 3 / 6 = 4 / AC. Comme 3 / 6 = 1 / 2, alors AC = 8 cm.",
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
    tags: ["thales", "calculer_longueur", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "thales_calculer_longueur_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise AM / AB = AN / AC.",
    tags: ["thales", "calculer_longueur", "template", "canvas"],
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
        explanation: `AM / AB = AN / AC, donc ${am}/${ab} = ${an}/AC. Le coefficient est ${k}, donc AC = ${an} × ${k} = ${ac} cm.`,
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
    id: "thales_calculer_longueur_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "Cette fois, on cherche la petite longueur AM.",
    tags: ["thales", "calculer_longueur", "template"],
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
        explanation: `On a AM / AB = AN / AC. Or ${an}/${ac} = 1/${k}. Donc AM / ${ab} = 1/${k}, alors AM = ${am} cm.`,
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
    id: "thales_calculer_longueur_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris l’égalité de rapports, puis fais une quatrième proportionnelle.",
    tags: ["thales", "calculer_longueur", "quatrieme_proportionnelle"],
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
            "AM / AB = AN / AC, donc 4 / 12 = 5 / AC. Le coefficient est 3, donc AC = 15 cm.",
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
        explanation: `AM / AB = AN / AC, donc ${am}/${ab} = ${an}/AC. Ainsi AC = ${ab} × ${an} ÷ ${am} = ${ac} cm.`,
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
    id: "thales_reciproque_verifier_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "On a AM = 3 cm, AB = 6 cm, AN = 4 cm et AC = 8 cm. Les rapports AM/AB et AN/AC sont-ils égaux ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare 3/6 et 4/8.",
    explanation: "3/6 = 1/2 et 4/8 = 1/2. Les rapports sont égaux.",
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
    tags: ["thales", "reciproque", "verifier"],
  },

  {
    kind: "template",
    id: "thales_reciproque_verifier_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les deux rapports petit/grand.",
    tags: ["thales", "reciproque", "verifier", "template"],
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
        explanation: equal
          ? `${am}/${ab} = ${an}/${ac}. Les rapports sont égaux.`
          : `${am}/${ab} n’est pas égal à ${an}/${ac}. Les rapports ne sont pas égaux.`,
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
    id: "thales_reciproque_conclure_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
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
      "D’après la réciproque du théorème de Thalès, si les rapports sont égaux, alors les droites sont parallèles.",
    tags: ["thales", "reciproque", "conclure"],
  },

  {
    kind: "template",
    id: "thales_reciproque_conclure_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie d’abord l’égalité des rapports.",
    tags: ["thales", "reciproque", "conclure", "template"],
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
        explanation: equal
          ? `Oui. ${am}/${ab} = ${an}/${ac}. D’après la réciproque de Thalès, (MN) est parallèle à (BC).`
          : `Non. ${am}/${ab} n’est pas égal à ${an}/${ac}. On ne peut pas conclure que (MN) est parallèle à (BC).`,
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
    id: "thales_rediger_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
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
      "Pour utiliser le théorème de Thalès, on commence par préciser la configuration et les droites parallèles.",
    tags: ["thales", "redaction", "qcm"],
  },

  {
    kind: "fixed",
    id: "thales_rediger_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre le théorème de Thalès et sa réciproque.",
    format: "open",
    expected: ["théorème", "réciproque", "parallèle"],
    comparator: "contains_keyword",
    hint: "Dans un cas, on sait déjà que les droites sont parallèles. Dans l’autre, on veut le prouver.",
    explanation:
      "Le théorème de Thalès sert à calculer une longueur quand on sait que les droites sont parallèles. La réciproque sert à démontrer que deux droites sont parallèles à partir de rapports égaux.",
    tags: ["thales", "redaction", "open"],
  },

  {
    kind: "template",
    id: "thales_rediger_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par écrire la configuration, puis l’égalité des rapports.",
    tags: ["thales", "redaction", "template"],
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
        explanation: `Dans le triangle ABC, M appartient à [AB], N appartient à [AC] et (MN) est parallèle à (BC). D’après le théorème de Thalès, AM/AB = AN/AC.`,
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
    id: "thales_defis_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « Les longueurs sont dans un triangle, donc je peux toujours utiliser Thalès. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut une condition de parallélisme.",
    explanation:
      "Non. Pour utiliser le théorème de Thalès, il faut une configuration avec des droites parallèles.",
    tags: ["thales", "defi", "erreur"],
  },

  {
    kind: "template",
    id: "thales_defis_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_defis",
    difficulty: 5,
    theme: "reunion",
    hint: "Modélise la situation par une configuration de Thalès.",
    tags: ["thales", "defi", "reunion", "probleme"],
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
        explanation: `Les rayons du soleil donnent une configuration de Thalès. Le coefficient est ${ombreArbre} ÷ ${ombreObjet} = ${k}. La hauteur de l’arbre vaut ${petit} × ${k} = ${grand} m.`,
      };
    },
  },

  {
    kind: "template",
    id: "thales_defis_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les rapports avant de conclure.",
    tags: ["thales", "defi", "reciproque", "piege"],
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
        explanation: equal
          ? `Oui, car ${am}/${ab} = ${an}/${ac}. Les rapports sont égaux.`
          : `Non, car ${am}/${ab} n’est pas égal à ${an}/${ac}.`,
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
];