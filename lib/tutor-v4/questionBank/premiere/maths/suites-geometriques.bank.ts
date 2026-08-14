// lib/tutor-v4/questionBank/premiere/maths/suites-geometriques.bank.ts
//
// Notions : expo_suite_geometrique et expo_suite_terme_general
//           (domaine BOP1VE — Variation exponentielle)
//
// L'autre moitié de l'exercice 2 des sujets de juin 2026, en miroir des suites
// arithmétiques : le capital placé à 2 % (Métropole), la forêt qui gagne 5 %
// par an (Antilles), la potion magique qui augmente de 20 % par niveau (Asie),
// le club de handball dont les adhérents sont multipliés par 1,2 (Centres
// étrangers).
//
// ⛔ Le programme est explicite : suites géométriques à TERMES STRICTEMENT
// POSITIFS. Aucune raison négative, aucun premier terme négatif ici.
//
// ⚠️ Épreuve sans calculatrice : les raisons et les rangs sont choisis pour
// que le résultat tombe juste (1,2² = 1,44 ; 1,25² = 1,5625 ; 1,5³ = 3,375 ;
// 0,5³ = 0,125). Les sujets, eux, fournissent un tableau de puissances — le
// coach fait autrement : il garde des nombres calculables de tête.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

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
  const arrondi = Math.round(n * 1000000) / 1000000;
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

// Taux dont le coefficient donne des puissances exactes sur de petits rangs.
const TAUX_EXACTS = [20, 25, 50, 100] as const;

export const suitesGeometriquesBank: TutorBankItemV4[] = [
  /* ═══════════════ expo_suite_reconnaitre ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_reconnaitre_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_suite_geometrique",
    microId: "expo_suite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise un terme par le précédent : obtiens-tu toujours le même nombre ?",
    tags: ["premiere", "maths", "suites", "geometrique", "template", "short"],
    generate: () => {
      const u0 = pick([100, 200, 400, 800, 1000] as const);
      const q = pick([0.5, 1.5, 2, 3] as const);
      const termes = [u0, u0 * q, u0 * q * q, u0 * q * q * q];
      return {
        text:
          `On donne les premiers termes d'une suite géométrique : ` +
          `$${termes.map((t) => fr(t)).join(" \\; ; \\; ")}$. Quelle est sa raison ?`,
        format: "short",
        expected: [fr(q)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une suite géométrique, on passe d'un terme au suivant en multipliant toujours par le même nombre : la raison $q$.",
          "On divise un terme par le précédent.",
          `$\\dfrac{${fr(termes[1])}}{${fr(termes[0])}} = ${fr(q)}$, et l'on vérifie : $\\dfrac{${fr(termes[2])}}{${fr(termes[1])}} = ${fr(q)}$.`,
          `La raison est $q = ${fr(q)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_expo_reconnaitre_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_suite_geometrique",
    microId: "expo_suite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Un POURCENTAGE constant, c'est une multiplication répétée.",
    tags: ["premiere", "maths", "suites", "geometrique", "template"],
    generate: () => {
      const t = pick([2, 5, 10, 20] as const);
      const somme = pick([100, 200, 500] as const);
      const geometrique = Math.random() < 0.5;
      return {
        text: geometrique
          ? `Un capital augmente de $${t}\\,\\%$ chaque année. La suite des capitaux annuels est :`
          : `Un capital augmente de $${somme}$ € chaque année. La suite des capitaux annuels est :`,
        format: "qcm",
        choices: makeChoices(geometrique ? "géométrique" : "arithmétique", [
          geometrique ? "arithmétique" : "géométrique",
          "ni arithmétique ni géométrique",
          "constante",
        ]),
        expected: [geometrique ? "géométrique" : "arithmétique"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un POURCENTAGE constant donne une suite géométrique ; une SOMME constante donne une suite arithmétique.",
          "On repère si l'énoncé parle d'un taux ou d'un montant.",
          geometrique
            ? `« Augmente de $${t}\\,\\%$ » : on multiplie chaque année par $${fr(1 + t / 100)}$.`
            : `« Augmente de $${somme}$ € » : on ajoute chaque année $${somme}$.`,
          geometrique
            ? `La suite est géométrique de raison $q = ${fr(1 + t / 100)}$.`
            : `La suite est arithmétique de raison $r = ${somme}$.`
        ),
      };
    },
  },

  /* ═══════════════ expo_suite_recurrence ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_recurrence_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_suite_geometrique",
    microId: "expo_suite_recurrence",
    difficulty: 2,
    theme: "neutral",
    hint: "Le terme suivant s'obtient en MULTIPLIANT le terme actuel.",
    tags: ["premiere", "maths", "suites", "geometrique", "recurrence", "template"],
    generate: () => {
      const t = pick([2, 5, 10, 20] as const);
      const q = 1 + t / 100;
      return {
        text:
          `Un capital augmente de $${t}\\,\\%$ chaque année. On note $u_n$ le capital au bout de $n$ années. ` +
          `Quelle relation traduit cette situation ?`,
        format: "qcm",
        choices: makeChoices(`$u_{n+1} = ${fr(q)} \\times u_n$`, [
          `$u_{n+1} = u_n + ${t}$`,
          `$u_{n+1} = ${fr(t / 100)} \\times u_n$`,
          `$u_{n+1} = u_n + ${fr(q)}$`,
        ]),
        expected: [`$u_{n+1} = ${fr(q)} \\times u_n$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Augmenter de $t\\,\\%$ revient à multiplier par $1 + \\dfrac{t}{100}$ : la relation est $u_{n+1} = q \\times u_n$.",
          "On calcule le coefficient multiplicateur, qui est la raison de la suite.",
          `$q = 1 + \\dfrac{${t}}{100} = ${fr(q)}$, donc $u_{n+1} = ${fr(q)} \\times u_n$.`,
          `La suite est géométrique de raison $q = ${fr(q)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$u_{n+1} = ${fr(t / 100)} \\times u_n$`,
            cause: "a multiplié par le taux seul : le capital fondrait au lieu d'augmenter",
            prereqMicroId: "auto_evo_additif_multiplicatif",
          },
          {
            choice: `$u_{n+1} = u_n + ${t}$`,
            cause: "a ajouté le taux comme une somme d'euros",
          },
        ],
      };
    },
  },

  /* ═══════════════ expo_suite_taux ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_taux_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_suite_geometrique",
    microId: "expo_suite_taux",
    difficulty: 2,
    theme: "neutral",
    hint: "Raison $q$ et taux $t$ sont liés par $q = 1 + \\frac{t}{100}$.",
    tags: ["premiere", "maths", "suites", "geometrique", "taux", "template", "short"],
    generate: () => {
      const t = pick([2, 4, 5, 10, 20, 25, 50] as const);
      const hausse = Math.random() < 0.6;
      const q = hausse ? 1 + t / 100 : 1 - t / 100;
      return {
        text:
          `Une quantité ${hausse ? "augmente" : "diminue"} de $${t}\\,\\%$ à chaque étape. ` +
          `Quelle est la raison de la suite géométrique associée ?`,
        format: "short",
        expected: [fr(q)],
        comparator: "number_equal",
        explanation: exp(
          "La raison d'une suite géométrique est le coefficient multiplicateur de l'évolution.",
          `${hausse ? "Augmenter" : "Diminuer"} de $t\\,\\%$ revient à multiplier par $1 ${hausse ? "+" : "-"} \\dfrac{t}{100}$.`,
          `$q = 1 ${hausse ? "+" : "-"} ${fr(t / 100)} = ${fr(q)}$.`,
          `La raison est $q = ${fr(q)}$${hausse ? "" : " — une raison inférieure à 1, mais toujours strictement positive"}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_expo_taux_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_suite_geometrique",
    microId: "expo_suite_taux",
    difficulty: 3,
    theme: "neutral",
    hint: "Retire $1$ à la raison, puis lis le résultat en pourcentage.",
    tags: ["premiere", "maths", "suites", "geometrique", "taux", "template"],
    generate: () => {
      const t = pick([2, 5, 10, 20, 25] as const);
      const q = 1 + t / 100;
      return {
        text: `Une suite géométrique a pour raison $q = ${fr(q)}$. À quelle évolution correspond-elle ?`,
        format: "qcm",
        choices: makeChoices(`une hausse de $${t}\\,\\%$ à chaque étape`, [
          `une baisse de $${t}\\,\\%$ à chaque étape`,
          `une hausse de $${fr(q * 100)}\\,\\%$ à chaque étape`,
          `une hausse de $${fr(q)}\\,\\%$ à chaque étape`,
        ]),
        expected: [`une hausse de $${t}\\,\\%$ à chaque étape`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une raison $q$ correspond au taux $t$ tel que $q = 1 + \\dfrac{t}{100}$.",
          "On retire $1$ à la raison.",
          `$${fr(q)} - 1 = ${fr(t / 100)}$, soit $${t}\\,\\%$.`,
          `La suite traduit une hausse de $${t}\\,\\%$ à chaque étape.`
        ),
        choiceDiagnostics: [
          {
            choice: `une hausse de $${fr(q * 100)}\\,\\%$ à chaque étape`,
            cause: "a lu la raison comme un pourcentage sans retirer le capital de départ",
          },
        ],
      };
    },
  },

  /* ═══════════════ expo_suite_terme_rang ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_terme_rang_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_suite_geometrique",
    microId: "expo_suite_terme_rang",
    difficulty: 2,
    theme: "neutral",
    hint: "On multiplie par la raison autant de fois que le rang.",
    tags: ["premiere", "maths", "suites", "geometrique", "terme", "template", "short"],
    generate: () => {
      const u0 = pick([100, 200, 400, 800, 1000, 2000] as const);
      const q = pick([0.5, 1.5, 2] as const);
      const n = randomInt(2, 3);
      const un = u0 * q ** n;
      return {
        text:
          `Une suite géométrique a pour premier terme $u_0 = ${u0}$ et pour raison $q = ${fr(q)}$. ` +
          `Combien vaut $u_{${n}}$ ?`,
        format: "short",
        expected: [fr(un)],
        comparator: "number_equal",
        explanation: exp(
          "Pour une suite géométrique, $u_n = u_0 \\times q^n$.",
          "On multiplie le premier terme par la raison élevée à la puissance du rang.",
          `$u_{${n}} = ${u0} \\times ${fr(q)}^{${n}} = ${u0} \\times ${fr(q ** n)} = ${fr(un)}$.`,
          `$u_{${n}} = ${fr(un)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_expo_terme_rang_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_suite_geometrique",
    microId: "expo_suite_terme_rang",
    difficulty: 3,
    theme: "neutral",
    hint: "Traduis d'abord le pourcentage en coefficient, puis applique-le deux fois.",
    tags: ["premiere", "maths", "suites", "geometrique", "terme", "template", "short"],
    generate: () => {
      const t = pick(TAUX_EXACTS);
      const q = 1 + t / 100;
      const u0 = pick([100, 200, 400, 800] as const);
      const u2 = u0 * q * q;
      return {
        text:
          `Une quantité vaut $${u0}$ au départ et augmente de $${t}\\,\\%$ à chaque étape. ` +
          `Combien vaut-elle au bout de $2$ étapes ?`,
        format: "short",
        expected: [fr(u2)],
        comparator: "number_equal",
        explanation: exp(
          "Deux hausses successives du même taux reviennent à multiplier deux fois par le même coefficient.",
          "On calcule le coefficient, puis on l'applique deux fois.",
          `$q = ${fr(q)}$, donc $u_2 = ${u0} \\times ${fr(q)}^2 = ${u0} \\times ${fr(q * q)} = ${fr(u2)}$.`,
          `La quantité vaut $${fr(u2)}$ — et non $${fr(u0 * (1 + (2 * t) / 100))}$, car les taux ne s'additionnent pas.`
        ),
      };
    },
  },

  /* ═══════════════ expo_suite_explicite ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_explicite_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_suite_terme_general",
    microId: "expo_suite_explicite",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour une suite géométrique, la raison est en EXPOSANT.",
    tags: ["premiere", "maths", "suites", "geometrique", "explicite", "template"],
    generate: () => {
      const t = pick([2, 5, 10, 20] as const);
      const q = 1 + t / 100;
      const u0 = pick([1000, 2000, 5000, 20000] as const);
      return {
        text:
          `Un capital de $${u0}$ € est placé à $${t}\\,\\%$ par an. ` +
          `On note $u_n$ le capital au bout de $n$ années. Quelle est l'expression de $u_n$ ?`,
        format: "qcm",
        choices: makeChoices(`$u_n = ${u0} \\times ${fr(q)}^n$`, [
          `$u_n = ${u0} + ${t}n$`,
          `$u_n = ${u0} \\times ${fr(q)} \\times n$`,
          `$u_n = ${u0} \\times ${fr(t / 100)}^n$`,
        ]),
        expected: [`$u_n = ${u0} \\times ${fr(q)}^n$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour une suite géométrique de premier terme $u_0$ et de raison $q$ : $u_n = u_0 \\times q^n$.",
          "Le nombre d'années est en exposant, parce qu'on multiplie une fois par an.",
          `$u_n = ${u0} \\times ${fr(q)}^n$.`,
          `On vérifie : $u_1 = ${u0} \\times ${fr(q)} = ${fr(u0 * q)}$ €, ce qui est bien une hausse de $${t}\\,\\%$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$u_n = ${u0} + ${t}n$`,
            cause: "a modélisé par une suite arithmétique : ce serait un intérêt SIMPLE, pas composé",
          },
          {
            choice: `$u_n = ${u0} \\times ${fr(q)} \\times n$`,
            cause: "a multiplié par le rang au lieu de l'utiliser comme exposant",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "premiere_expo_explicite_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_suite_terme_general",
    microId: "expo_suite_explicite",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace $n$ par sa valeur, puis calcule la puissance.",
    tags: ["premiere", "maths", "suites", "geometrique", "explicite", "template", "short"],
    generate: () => {
      const u0 = pick([16, 32, 64, 128] as const);
      const q = 0.5;
      const n = randomInt(2, 4);
      return {
        text:
          `Une substance présente dans le sang est divisée par $2$ toutes les heures. ` +
          `Sa quantité initiale est de $${u0}$ mg, et l'on note $u_n = ${u0} \\times ${fr(q)}^n$ ` +
          `la quantité au bout de $n$ heures. Combien en reste-t-il au bout de $${n}$ heures, en mg ?`,
        format: "short",
        expected: [fr(u0 * q ** n)],
        comparator: "number_equal",
        explanation: exp(
          "La forme explicite donne directement le terme de rang $n$.",
          `On remplace $n$ par $${n}$.`,
          `$u_{${n}} = ${u0} \\times ${fr(q)}^{${n}} = ${u0} \\times ${fr(q ** n)} = ${fr(u0 * q ** n)}$.`,
          `Il reste $${fr(u0 * q ** n)}$ mg : la quantité diminue mais ne s'annule jamais — les termes restent strictement positifs.`
        ),
      };
    },
  },

  /* ═══════════════ expo_suite_variation ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_variation_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_suite_terme_general",
    microId: "expo_suite_variation",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare la raison à $1$ — et non à $0$.",
    tags: ["premiere", "maths", "suites", "geometrique", "variation", "template"],
    generate: () => {
      const croissante = Math.random() < 0.5;
      const q = croissante ? pick([1.2, 1.5, 2, 3] as const) : pick([0.2, 0.5, 0.8, 0.9] as const);
      const u0 = pick([100, 500, 1000] as const);
      return {
        text:
          `Une suite géométrique à termes strictement positifs a pour premier terme $u_0 = ${u0}$ ` +
          `et pour raison $q = ${fr(q)}$. Elle est :`,
        format: "qcm",
        choices: makeChoices(croissante ? "croissante" : "décroissante", [
          croissante ? "décroissante" : "croissante",
          "constante",
          "négative à partir d'un certain rang",
        ]),
        expected: [croissante ? "croissante" : "décroissante"],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour une suite géométrique à termes positifs : si $q > 1$ elle est croissante, si $0 < q < 1$ elle est décroissante.",
          "On compare la raison à $1$.",
          `Ici $q = ${fr(q)}$, donc $q ${croissante ? ">" : "<"} 1$.`,
          `La suite est ${croissante ? "croissante" : "décroissante"}${croissante ? "" : ", mais elle reste strictement positive : elle s'approche de zéro sans jamais l'atteindre"}.`
        ),
        choiceDiagnostics: [
          {
            choice: "négative à partir d'un certain rang",
            cause: "une suite géométrique de raison positive et de premier terme positif garde tous ses termes positifs",
          },
        ],
      };
    },
  },

  /* ═══════════════ expo_suite_graphique ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_expo_graphique_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_suite_terme_general",
    microId: "expo_suite_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "On place les points $(n \\, ; \\, u_n)$ d'une suite géométrique de raison $q = 1,5$ et de premier terme positif. Que voit-on ?",
    format: "qcm",
    choices: [
      "Des points de plus en plus écartés, qui montent de plus en plus vite",
      "Des points alignés",
      "Des points de plus en plus resserrés",
      "Des points alignés sur une droite horizontale",
    ],
    expected: ["Des points de plus en plus écartés, qui montent de plus en plus vite"],
    comparator: "mcq_exact",
    hint: "L'écart entre deux termes consécutifs est-il constant ?",
    explanation: exp(
      "Pour une suite géométrique, l'écart entre deux termes consécutifs est lui-même multiplié par $q$ à chaque étape.",
      "On compare avec une suite arithmétique, dont les points sont alignés parce que l'écart y est constant.",
      "Avec $u_0 = 100$ : $100 ; 150 ; 225 ; 337,5$. Les écarts valent $50$, puis $75$, puis $112,5$ — ils grandissent.",
      "Les points s'écartent de plus en plus : la courbe s'incurve vers le haut. C'est la signature visuelle d'une croissance exponentielle, à ne pas confondre avec l'alignement d'une croissance linéaire."
    ),
    choiceDiagnostics: [
      {
        choice: "Des points alignés",
        cause: "décrit une suite arithmétique : l'alignement vient d'un écart constant",
        prereqMicroId: "lin_suite_graphique",
      },
    ],
    tags: ["premiere", "maths", "suites", "geometrique", "graphique"],
  },

  {
    kind: "template",
    id: "premiere_expo_graphique_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_suite_terme_general",
    microId: "expo_suite_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde si les écarts entre valeurs successives sont constants ou s'ils grandissent.",
    tags: ["premiere", "maths", "suites", "geometrique", "graphique", "template"],
    generate: () => {
      const geometrique = Math.random() < 0.5;
      const u0 = 1000;
      const q = 1.2;
      const r = 200;
      const termes = geometrique
        ? [u0, u0 * q, u0 * q * q, u0 * q ** 3]
        : [u0, u0 + r, u0 + 2 * r, u0 + 3 * r];
      return {
        text:
          `Un relevé donne les valeurs $${termes.map((t) => fr(t)).join(" \\; ; \\; ")}$. ` +
          `Représentés dans un repère, ces points sont :`,
        format: "qcm",
        choices: makeChoices(
          geometrique ? "sur une courbe qui s'incurve vers le haut" : "alignés",
          [
            geometrique ? "alignés" : "sur une courbe qui s'incurve vers le haut",
            "sur une courbe qui s'incurve vers le bas",
            "sur une droite horizontale",
          ]
        ),
        expected: [geometrique ? "sur une courbe qui s'incurve vers le haut" : "alignés"],
        comparator: "mcq_exact",
        explanation: exp(
          "Des écarts constants donnent des points alignés (suite arithmétique) ; des écarts qui grandissent donnent une courbe qui s'incurve (suite géométrique).",
          "On calcule les écarts successifs.",
          `Écarts : $${fr(termes[1] - termes[0])}$, puis $${fr(termes[2] - termes[1])}$, puis $${fr(termes[3] - termes[2])}$ — ${geometrique ? "ils grandissent" : "ils sont constants"}.`,
          geometrique
            ? "Les points s'incurvent vers le haut : la croissance est exponentielle."
            : "Les points sont alignés : la croissance est linéaire."
        ),
      };
    },
  },

  /* ═══════════════ expo_suite_interpreter ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_interpreter_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_suite_terme_general",
    microId: "expo_suite_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Que compte l'indice, et que compte la valeur ?",
    tags: ["premiere", "maths", "suites", "geometrique", "interpreter", "template"],
    generate: () => {
      const annee = pick([2025, 2026] as const);
      const n = randomInt(4, 10);
      const u0 = pick([1000, 2000] as const);
      const t = 5;
      const valeur = u0 * (1 + t / 100) ** n;
      return {
        text:
          `Une forêt compte $${u0}$ arbres au 1er janvier $${annee}$ et leur nombre augmente de $${t}\\,\\%$ par an. ` +
          `On note $u_n$ le nombre d'arbres l'année $${annee} + n$. ` +
          `On calcule $u_{${n}} \\approx ${fr(Math.round(valeur))}$. Que signifie ce résultat ?`,
        format: "qcm",
        choices: makeChoices(
          `en $${annee + n}$, la forêt comptera environ $${fr(Math.round(valeur))}$ arbres`,
          [
            `en $${annee + n}$, on aura planté environ $${fr(Math.round(valeur))}$ arbres de plus`,
            `il faudra environ $${fr(Math.round(valeur))}$ années pour doubler`,
            `en $${annee + n + 1}$, la forêt comptera environ $${fr(Math.round(valeur))}$ arbres`,
          ]
        ),
        expected: [`en $${annee + n}$, la forêt comptera environ $${fr(Math.round(valeur))}$ arbres`],
        comparator: "mcq_exact",
        explanation: exp(
          `L'énoncé pose $u_n$ = nombre TOTAL d'arbres l'année $${annee} + n$.`,
          `On traduit l'indice en année : $${annee} + ${n} = ${annee + n}$.`,
          `$u_{${n}} \\approx ${fr(Math.round(valeur))}$ arbres en $${annee + n}$.`,
          `C'est le nombre total d'arbres cette année-là. Les arbres AJOUTÉS depuis $${annee}$ seraient $${fr(Math.round(valeur) - u0)}$, ce qui est une autre question.`
        ),
        choiceDiagnostics: [
          {
            choice: `en $${annee + n}$, on aura planté environ $${fr(Math.round(valeur))}$ arbres de plus`,
            cause: "confond le total et l'augmentation depuis le début",
          },
        ],
      };
    },
  },
];
