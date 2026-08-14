// lib/tutor-v4/questionBank/premiere/maths/suites-arithmetiques.bank.ts
//
// Notions : lin_suite_arithmetique et lin_suite_terme_general
//           (domaine BOP1VL — Variation linéaire)
//
// L'exercice 2 de presque tous les sujets de juin 2026. Les contextes ci-dessous
// sont ceux des sujets eux-mêmes, paramétrés :
//   - un capital qui gagne la même somme chaque année (Métropole : 20 000 €,
//     + 200 € par an) ;
//   - une forêt où l'on plante le même nombre d'arbres (Antilles : 1 200 arbres,
//     + 100 par an) ;
//   - un club qui perd le même nombre d'adhérents (Centres étrangers : 900
//     adhérents, − 10 par an) ;
//   - des points d'expérience gagnés par niveau (Asie : 20 au départ, + 80).
//
// Le programme demande d'utiliser d'abord la notation FONCTIONNELLE u(n) avant
// la notation indicielle uₙ. Les deux sont travaillées, et le passage de l'une
// à l'autre est une micro-compétence à part entière.

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

// Les termes d'une suite, placés dans un repère : les points $(n \, ; \, u_n)$.
// C'est là que l'alignement se VOIT — et le programme demande explicitement de
// « réaliser et exploiter la représentation graphique des termes d'une suite ».
// `droite` superpose la droite qui les porte, quand la question est justement
// de constater qu'ils sont alignés.
function canvasNuage(
  termes: number[],
  options?: { titre?: string; droite?: { a: number; b: number } }
): CanvasFigure {
  const ymax = Math.max(...termes);
  const ymin = Math.min(...termes, 0);
  const marge = Math.max(1, Math.round((ymax - ymin) * 0.15));
  return {
    kind: "fonctionGraphique",
    titre: options?.titre ?? "Les termes de la suite",
    xmin: -0.5,
    xmax: termes.length - 0.5,
    ymin: ymin - marge,
    ymax: ymax + marge,
    grille: true,
    courbes: options?.droite
      ? [{ id: "droite", type: "affine", a: options.droite.a, b: options.droite.b, couleur: "#94a3b8" }]
      : undefined,
    points: termes.map((u, n) => ({ x: n, y: u, label: `u${n}` })),
  };
}

// Contextes des sujets 2026. `unite` sert aux phrases de conclusion.
const CONTEXTES = [
  { sujet: "Un capital", unite: "€", nom: "le capital" },
  { sujet: "Une forêt", unite: "arbres", nom: "le nombre d'arbres" },
  { sujet: "Un club", unite: "adhérents", nom: "le nombre d'adhérents" },
] as const;

export const suitesArithmetiquesBank: TutorBankItemV4[] = [
  /* ═══════════════ lin_suite_reconnaitre ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_reconnaitre_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_suite_arithmetique",
    microId: "lin_suite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Calcule la différence entre deux termes consécutifs : est-elle toujours la même ?",
    tags: ["premiere", "maths", "suites", "arithmetique", "template", "short"],
    generate: () => {
      const u0 = randomInt(2, 30) * 10;
      const r = pick([-30, -20, -10, 10, 20, 25, 50, 100] as const);
      const termes = [u0, u0 + r, u0 + 2 * r, u0 + 3 * r];
      return {
        text:
          `On donne les premiers termes d'une suite arithmétique : ` +
          `$${termes.map((t) => fr(t)).join(" \\; ; \\; ")}$. Quelle est sa raison ?`,
        format: "short",
        expected: [fr(r)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une suite arithmétique, on passe d'un terme au suivant en ajoutant toujours le même nombre : la raison $r$.",
          "On soustrait deux termes consécutifs.",
          `$${fr(termes[1])} - ${fr(termes[0])} = ${fr(r)}$, et l'on vérifie : $${fr(termes[2])} - ${fr(termes[1])} = ${fr(r)}$.`,
          `La raison est $r = ${fr(r)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_lin_reconnaitre_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_suite_arithmetique",
    microId: "lin_suite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Arithmétique : on AJOUTE toujours la même chose. Géométrique : on MULTIPLIE toujours par la même chose.",
    tags: ["premiere", "maths", "suites", "arithmetique", "template"],
    generate: () => {
      const arithmetique = Math.random() < 0.5;
      const u0 = randomInt(2, 10) * 100;
      const r = pick([50, 100, 200] as const);
      const q = pick([1.5, 2] as const);
      const termes = arithmetique
        ? [u0, u0 + r, u0 + 2 * r, u0 + 3 * r]
        : [u0, u0 * q, u0 * q * q, u0 * q * q * q];
      return {
        text: `La suite $${termes.map((t) => fr(t)).join(" \\; ; \\; ")}$ est :`,
        format: "qcm",
        choices: makeChoices(arithmetique ? "arithmétique" : "géométrique", [
          arithmetique ? "géométrique" : "arithmétique",
          "ni arithmétique ni géométrique",
          "à la fois arithmétique et géométrique",
        ]),
        expected: [arithmetique ? "arithmétique" : "géométrique"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite est arithmétique si l'on passe d'un terme au suivant en AJOUTANT un nombre constant, géométrique si on le MULTIPLIE par un nombre constant.",
          "On regarde d'abord les différences ; si elles ne sont pas constantes, on regarde les quotients.",
          arithmetique
            ? `Différences : $${fr(termes[1] - termes[0])}$ puis $${fr(termes[2] - termes[1])}$ — constantes.`
            : `Différences : $${fr(termes[1] - termes[0])}$ puis $${fr(termes[2] - termes[1])}$ — non constantes. Quotients : $${fr(termes[1] / termes[0])}$ puis $${fr(termes[2] / termes[1])}$ — constants.`,
          `La suite est ${arithmetique ? "arithmétique" : "géométrique"}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_lin_reconnaitre_tpl_3",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_suite_arithmetique",
    microId: "lin_suite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "« La même somme chaque année » : c'est une addition répétée.",
    tags: ["premiere", "maths", "suites", "arithmetique", "template"],
    generate: () => {
      const r = pick([100, 150, 200, 250] as const);
      return {
        text:
          `Un capital augmente de $${r}$ € chaque année par rapport à l'année précédente. ` +
          `La suite des capitaux annuels est :`,
        format: "qcm",
        choices: makeChoices(`arithmétique de raison $${r}$`, [
          `géométrique de raison $${r}$`,
          `arithmétique de raison $${fr(1 + r / 100)}$`,
          `géométrique de raison $${fr(1 + r / 100)}$`,
        ]),
        expected: [`arithmétique de raison $${r}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une somme fixe ajoutée à chaque étape donne une suite arithmétique ; un POURCENTAGE fixe donnerait une suite géométrique.",
          "On lit l'énoncé : « augmente de $" + r + "$ € » est une somme en euros, pas un taux.",
          `On ajoute $${r}$ à chaque étape : la raison est $r = ${r}$.`,
          `La suite est arithmétique de raison $${r}$. (Si l'énoncé avait dit « augmente de $${r}\\,\\%$ », elle serait géométrique.)`
        ),
        choiceDiagnostics: [
          {
            choice: `géométrique de raison $${fr(1 + r / 100)}$`,
            cause: "a lu la somme en euros comme un pourcentage",
          },
        ],
      };
    },
  },

  /* ═══════════════ lin_suite_recurrence ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_recurrence_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_suite_arithmetique",
    microId: "lin_suite_recurrence",
    difficulty: 2,
    theme: "neutral",
    hint: "La relation de récurrence relie un terme au SUIVANT.",
    tags: ["premiere", "maths", "suites", "recurrence", "template"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const r = pick([-10, 100, 150, 200, 250] as const);
      return {
        text:
          `${ctx.sujet} ${r > 0 ? "gagne" : "perd"} $${Math.abs(r)}$ ${ctx.unite} chaque année. ` +
          `On note $u_n$ ${ctx.nom} au bout de $n$ années. Quelle relation traduit cette situation ?`,
        format: "qcm",
        choices: makeChoices(`$u_{n+1} = u_n ${r > 0 ? "+" : "-"} ${Math.abs(r)}$`, [
          `$u_{n+1} = u_n ${r > 0 ? "-" : "+"} ${Math.abs(r)}$`,
          `$u_{n+1} = ${Math.abs(r)} \\times u_n$`,
          `$u_n = u_{n+1} ${r > 0 ? "+" : "-"} ${Math.abs(r)}$`,
        ]),
        expected: [`$u_{n+1} = u_n ${r > 0 ? "+" : "-"} ${Math.abs(r)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "La relation de récurrence exprime le terme suivant $u_{n+1}$ à partir du terme actuel $u_n$.",
          `${r > 0 ? "Gagner" : "Perdre"} une somme fixe, c'est ${r > 0 ? "ajouter" : "soustraire"} cette somme au terme précédent.`,
          `$u_{n+1} = u_n ${r > 0 ? "+" : "-"} ${Math.abs(r)}$.`,
          `La suite est arithmétique de raison $r = ${r}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$u_n = u_{n+1} ${r > 0 ? "+" : "-"} ${Math.abs(r)}$`,
            cause: "a inversé le sens du temps : c'est le terme SUIVANT qui s'exprime à partir du terme actuel",
          },
          {
            choice: `$u_{n+1} = ${Math.abs(r)} \\times u_n$`,
            cause: "a multiplié au lieu d'ajouter — ce serait une suite géométrique",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "premiere_lin_recurrence_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_suite_arithmetique",
    microId: "lin_suite_recurrence",
    difficulty: 2,
    theme: "neutral",
    hint: "Applique la relation une fois, puis encore une fois.",
    tags: ["premiere", "maths", "suites", "recurrence", "template", "short"],
    generate: () => {
      const u0 = randomInt(10, 60) * 10;
      const r = pick([-20, -15, 25, 40, 60] as const);
      const u2 = u0 + 2 * r;
      return {
        text:
          `Une suite est définie par $u_0 = ${u0}$ et $u_{n+1} = u_n ${r > 0 ? "+" : "-"} ${Math.abs(r)}$ ` +
          `pour tout entier naturel $n$. Combien vaut $u_2$ ?`,
        format: "short",
        expected: [fr(u2)],
        comparator: "number_equal",
        explanation: exp(
          "Une relation de récurrence se déroule pas à pas depuis le premier terme.",
          "On calcule $u_1$, puis $u_2$.",
          `$u_1 = ${u0} ${r > 0 ? "+" : "-"} ${Math.abs(r)} = ${fr(u0 + r)}$, puis $u_2 = ${fr(u0 + r)} ${r > 0 ? "+" : "-"} ${Math.abs(r)} = ${fr(u2)}$.`,
          `$u_2 = ${fr(u2)}$.`
        ),
      };
    },
  },

  /* ═══════════════ lin_suite_notation ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_lin_notation_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_suite_arithmetique",
    microId: "lin_suite_notation",
    difficulty: 1,
    theme: "neutral",
    text: "Pour une suite $u$, comment se lit l'écriture $u_n$ ?",
    format: "qcm",
    choices: [
      "Le terme de rang $n$ de la suite",
      "Le produit de $u$ par $n$",
      "La somme des $n$ premiers termes",
      "La raison de la suite",
    ],
    expected: ["Le terme de rang $n$ de la suite"],
    comparator: "mcq_exact",
    hint: "$n$ est écrit en indice : il désigne une place, pas un facteur.",
    explanation: exp(
      "Une suite associe à chaque entier $n$ un nombre, noté $u_n$ ou $u(n)$.",
      "L'indice $n$ indique le RANG, c'est-à-dire la place du terme dans la liste.",
      "$u_0$ est le premier terme, $u_1$ le deuxième, $u_5$ le sixième.",
      "$u_n$ est le terme de rang $n$."
    ),
    choiceDiagnostics: [
      {
        choice: "Le produit de $u$ par $n$",
        cause: "a lu l'indice comme une multiplication",
      },
    ],
    tags: ["premiere", "maths", "suites", "notation"],
  },

  {
    kind: "template",
    id: "premiere_lin_notation_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_suite_arithmetique",
    microId: "lin_suite_notation",
    difficulty: 2,
    theme: "neutral",
    hint: "$u(n)$ et $u_n$ désignent la même chose : le terme de rang $n$.",
    tags: ["premiere", "maths", "suites", "notation", "template"],
    generate: () => {
      const annee = pick([2025, 2026] as const);
      const n = randomInt(3, 12);
      return {
        text:
          `On note $u(n)$ une population l'année $${annee} + n$. ` +
          `Comment s'écrit, en notation indicielle, la population de l'année $${annee + n}$ ?`,
        format: "qcm",
        choices: makeChoices(`$u_{${n}}$`, [
          `$u_{${annee + n}}$`,
          `$u_{${annee}}$`,
          `$u \\times ${n}$`,
        ]),
        expected: [`$u_{${n}}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "L'indice est le RANG $n$, pas l'année elle-même.",
          `On cherche $n$ tel que $${annee} + n = ${annee + n}$.`,
          `$n = ${annee + n} - ${annee} = ${n}$.`,
          `La population de $${annee + n}$ s'écrit $u_{${n}}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$u_{${annee + n}}$`,
            cause: "a mis l'année en indice au lieu du rang",
          },
        ],
      };
    },
  },

  /* ═══════════════ lin_suite_terme_rang ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_terme_rang_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_suite_arithmetique",
    microId: "lin_suite_terme_rang",
    difficulty: 2,
    theme: "neutral",
    hint: "Depuis $u_0$, il faut ajouter la raison $n$ fois.",
    tags: ["premiere", "maths", "suites", "terme", "template", "short"],
    generate: () => {
      const u0 = randomInt(100, 300) * 10;
      const r = pick([50, 100, 150, 200] as const);
      const n = randomInt(4, 12);
      return {
        text:
          `Une suite arithmétique a pour premier terme $u_0 = ${u0}$ et pour raison $r = ${r}$. ` +
          `Combien vaut $u_{${n}}$ ?`,
        format: "short",
        expected: [fr(u0 + n * r)],
        comparator: "number_equal",
        explanation: exp(
          "Pour une suite arithmétique, $u_n = u_0 + n \\times r$.",
          "On ajoute la raison autant de fois que le rang.",
          `$u_{${n}} = ${u0} + ${n} \\times ${r} = ${u0} + ${fr(n * r)} = ${fr(u0 + n * r)}$.`,
          `$u_{${n}} = ${fr(u0 + n * r)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_lin_terme_rang_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_suite_arithmetique",
    microId: "lin_suite_terme_rang",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention au rang : de $u_1$ à $u_n$, il n'y a que $n - 1$ pas.",
    tags: ["premiere", "maths", "suites", "terme", "template", "short"],
    generate: () => {
      const u1 = randomInt(20, 90) * 10;
      const r = pick([20, 25, 40, 50] as const);
      const n = randomInt(5, 15);
      return {
        text:
          `Une suite arithmétique de raison $r = ${r}$ a pour terme initial $u_1 = ${u1}$. ` +
          `Combien vaut $u_{${n}}$ ?`,
        format: "short",
        expected: [fr(u1 + (n - 1) * r)],
        comparator: "number_equal",
        explanation: exp(
          "Quand la suite commence au rang $1$, la formule devient $u_n = u_1 + (n - 1) \\times r$.",
          `Entre le rang $1$ et le rang $${n}$, on ajoute la raison $${n} - 1 = ${n - 1}$ fois, et non $${n}$ fois.`,
          `$u_{${n}} = ${u1} + ${n - 1} \\times ${r} = ${fr(u1 + (n - 1) * r)}$.`,
          `$u_{${n}} = ${fr(u1 + (n - 1) * r)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_lin_terme_rang_tpl_3",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_suite_arithmetique",
    microId: "lin_suite_terme_rang",
    difficulty: 3,
    theme: "jeux_video",
    hint: "Le niveau $0$ correspond à $n = 0$ : c'est le point de départ.",
    tags: ["premiere", "maths", "suites", "terme", "template", "short"],
    generate: () => {
      const depart = randomInt(1, 5) * 10;
      const gain = pick([50, 60, 80, 100] as const);
      const niveau = randomInt(6, 15);
      return {
        text:
          `Dans un jeu, ton personnage démarre au niveau $0$ avec $${depart}$ points d'expérience. ` +
          `Chaque passage au niveau supérieur rapporte $${gain}$ points. ` +
          `Combien a-t-il de points d'expérience au niveau $${niveau}$ ?`,
        format: "short",
        expected: [fr(depart + niveau * gain)],
        comparator: "number_equal",
        explanation: exp(
          "La situation se modélise par une suite arithmétique : $u_n = u_0 + n \\times r$.",
          `Ici $u_0 = ${depart}$ (niveau $0$) et $r = ${gain}$.`,
          `$u_{${niveau}} = ${depart} + ${niveau} \\times ${gain} = ${fr(depart + niveau * gain)}$.`,
          `Au niveau $${niveau}$, il a $${fr(depart + niveau * gain)}$ points d'expérience.`
        ),
      };
    },
  },

  /* ═══════════════ lin_suite_explicite ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_explicite_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_suite_terme_general",
    microId: "lin_suite_explicite",
    difficulty: 3,
    theme: "neutral",
    hint: "La forme explicite donne $u_n$ directement à partir de $n$, sans passer par les termes précédents.",
    tags: ["premiere", "maths", "suites", "explicite", "template"],
    generate: () => {
      const u0 = randomInt(50, 200) * 10;
      const r = pick([-50, 100, 150, 200] as const);
      return {
        text:
          `Une suite arithmétique vérifie $u_0 = ${u0}$ et $u_{n+1} = u_n ${r > 0 ? "+" : "-"} ${Math.abs(r)}$. ` +
          `Quelle est l'expression de $u_n$ en fonction de $n$ ?`,
        format: "qcm",
        choices: makeChoices(`$u_n = ${u0} ${r > 0 ? "+" : "-"} ${Math.abs(r)}n$`, [
          `$u_n = ${u0} \\times ${r}^n$`,
          `$u_n = ${r} ${u0 > 0 ? "+" : "-"} ${Math.abs(u0)}n$`,
          `$u_n = ${u0} ${r > 0 ? "+" : "-"} ${Math.abs(r)}(n - 1)$`,
        ]),
        expected: [`$u_n = ${u0} ${r > 0 ? "+" : "-"} ${Math.abs(r)}n$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour une suite arithmétique commençant au rang $0$ : $u_n = u_0 + n \\times r$.",
          "On identifie le premier terme et la raison, puis on remplace.",
          `$u_0 = ${u0}$ et $r = ${r}$, donc $u_n = ${u0} ${r > 0 ? "+" : "-"} ${Math.abs(r)}n$.`,
          `On vérifie : $u_0 = ${u0}$ et $u_1 = ${fr(u0 + r)}$, ce qui correspond bien.`
        ),
        choiceDiagnostics: [
          {
            choice: `$u_n = ${u0} \\times ${r}^n$`,
            cause: "a utilisé la formule d'une suite géométrique",
          },
          {
            choice: `$u_n = ${u0} ${r > 0 ? "+" : "-"} ${Math.abs(r)}(n - 1)$`,
            cause: "a utilisé la formule du rang 1 alors que la suite commence au rang 0",
          },
          {
            choice: `$u_n = ${r} ${u0 > 0 ? "+" : "-"} ${Math.abs(u0)}n$`,
            cause: "a échangé le premier terme et la raison",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "premiere_lin_explicite_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_suite_terme_general",
    microId: "lin_suite_explicite",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace $n$ par sa valeur dans l'expression.",
    tags: ["premiere", "maths", "suites", "explicite", "template", "short"],
    generate: () => {
      const u0 = randomInt(20, 120) * 10;
      const r = pick([-25, -10, 30, 45, 60] as const);
      const n = randomInt(8, 20);
      return {
        text:
          `Une suite est définie pour tout entier naturel $n$ par $u_n = ${u0} ${r > 0 ? "+" : "-"} ${Math.abs(r)}n$. ` +
          `Combien vaut $u_{${n}}$ ?`,
        format: "short",
        expected: [fr(u0 + r * n)],
        comparator: "number_equal",
        explanation: exp(
          "La forme explicite permet de calculer n'importe quel terme sans calculer les précédents.",
          `On remplace $n$ par $${n}$.`,
          `$u_{${n}} = ${u0} ${r > 0 ? "+" : "-"} ${Math.abs(r)} \\times ${n} = ${u0} ${r > 0 ? "+" : "-"} ${fr(Math.abs(r) * n)} = ${fr(u0 + r * n)}$.`,
          `$u_{${n}} = ${fr(u0 + r * n)}$.`
        ),
      };
    },
  },

  /* ═══════════════ lin_suite_variation ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_variation_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_suite_terme_general",
    microId: "lin_suite_variation",
    difficulty: 2,
    theme: "neutral",
    hint: "C'est le SIGNE de la raison qui décide, pas sa taille.",
    tags: ["premiere", "maths", "suites", "variation", "template"],
    generate: () => {
      const r = pick([-100, -50, -20, -5, 5, 20, 50, 100] as const);
      const u0 = randomInt(50, 200) * 10;
      return {
        text: `Une suite arithmétique a pour premier terme $u_0 = ${u0}$ et pour raison $r = ${r}$. Elle est :`,
        format: "qcm",
        choices: makeChoices(r > 0 ? "croissante" : "décroissante", [
          r > 0 ? "décroissante" : "croissante",
          "constante",
          "croissante puis décroissante",
        ]),
        expected: [r > 0 ? "croissante" : "décroissante"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite arithmétique est croissante si $r > 0$, décroissante si $r < 0$, constante si $r = 0$.",
          "On regarde uniquement le signe de la raison.",
          `Ici $r = ${r}$, donc $r ${r > 0 ? ">" : "<"} 0$.`,
          `La suite est ${r > 0 ? "croissante" : "décroissante"} : on ${r > 0 ? "ajoute" : "retire"} $${Math.abs(r)}$ à chaque étape, quel que soit le premier terme.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_lin_variation_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_suite_terme_general",
    microId: "lin_suite_variation",
    difficulty: 3,
    theme: "neutral",
    text: "Une suite arithmétique a pour premier terme $u_0 = -500$ et pour raison $r = 2$. Que peut-on dire de son sens de variation ?",
    format: "qcm",
    choices: [
      "Elle est croissante",
      "Elle est décroissante car son premier terme est négatif",
      "Elle est décroissante car sa raison est petite",
      "On ne peut pas savoir sans calculer plusieurs termes",
    ],
    expected: ["Elle est croissante"],
    comparator: "mcq_exact",
    hint: "Un premier terme négatif n'empêche pas d'augmenter.",
    explanation: exp(
      "Le sens de variation d'une suite arithmétique ne dépend QUE du signe de la raison.",
      "Le premier terme fixe le point de départ, pas le sens du mouvement.",
      "$r = 2 > 0$ : on ajoute $2$ à chaque étape. $-500 ; -498 ; -496 \\ldots$",
      "La suite est croissante, même si tous ses premiers termes sont négatifs."
    ),
    choiceDiagnostics: [
      {
        choice: "Elle est décroissante car son premier terme est négatif",
        cause: "confond le signe du premier terme et le signe de la raison",
      },
    ],
    tags: ["premiere", "maths", "suites", "variation", "piege"],
  },

  /* ═══════════════ lin_suite_graphique ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_lin_graphique_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_suite_terme_general",
    microId: "lin_suite_graphique",
    difficulty: 2,
    theme: "neutral",
    text: "Ci-contre, les points $(n \\, ; \\, u_n)$ d'une suite arithmétique de premier terme $2$ et de raison $3$. Comment sont-ils disposés ?",
    format: "qcm",
    choices: [
      "Ils sont alignés",
      "Ils sont sur une parabole",
      "Ils sont sur une courbe de plus en plus raide",
      "Ils sont disposés au hasard",
    ],
    expected: ["Ils sont alignés"],
    comparator: "mcq_exact",
    canvas: canvasNuage([2, 5, 8, 11, 14, 17], { titre: "u₀ = 2 et r = 3" }),
    hint: "$u_n = u_0 + rn$ ressemble à $y = mx + p$.",
    explanation: exp(
      "Pour une suite arithmétique, $u_n = u_0 + r \\times n$.",
      "C'est l'expression d'une fonction affine de $n$ : le coefficient directeur est la raison $r$, l'ordonnée à l'origine est $u_0$.",
      "Les points $(n \\, ; \\, u_n)$ appartiennent donc tous à une même droite.",
      "Ils sont alignés — c'est ce qui distingue à l'œil une croissance linéaire d'une croissance exponentielle, dont les points s'incurvent."
    ),
    choiceDiagnostics: [
      {
        choice: "Ils sont sur une courbe de plus en plus raide",
        cause: "décrit une suite géométrique de raison supérieure à 1, pas une suite arithmétique",
      },
    ],
    tags: ["premiere", "maths", "suites", "graphique"],
  },

  {
    kind: "template",
    id: "premiere_lin_graphique_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_suite_terme_general",
    microId: "lin_suite_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient directeur de la droite, c'est la raison.",
    tags: ["premiere", "maths", "suites", "graphique", "template", "short"],
    generate: () => {
      const u0 = randomInt(1, 8) * 100;
      const r = pick([25, 50, 75, 100] as const);
      return {
        text:
          `Ci-contre, les termes d'une suite arithmétique et la droite qui les porte. ` +
          `Cette droite passe par $(0 \\, ; \\, ${u0})$ et $(4 \\, ; \\, ${fr(u0 + 4 * r)})$. Quelle est la raison de la suite ?`,
        format: "short",
        expected: [fr(r)],
        comparator: "number_equal",
        canvas: canvasNuage(
          Array.from({ length: 5 }, (_, n) => u0 + n * r),
          { droite: { a: r, b: u0 } }
        ),
        explanation: exp(
          "La raison d'une suite arithmétique est le coefficient directeur de la droite qui porte ses points.",
          "On calcule ce coefficient à partir de deux points.",
          `$\\dfrac{${fr(u0 + 4 * r)} - ${u0}}{4 - 0} = \\dfrac{${fr(4 * r)}}{4} = ${fr(r)}$.`,
          `La raison est $r = ${fr(r)}$.`
        ),
      };
    },
  },

  /* ═══════════════ lin_suite_interpreter ═══════════════ */

  {
    kind: "template",
    id: "premiere_lin_interpreter_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "lin_suite_terme_general",
    microId: "lin_suite_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "L'indice compte les années ÉCOULÉES depuis l'année de départ.",
    tags: ["premiere", "maths", "suites", "interpreter", "template"],
    generate: () => {
      const annee = pick([2025, 2026] as const);
      const n = randomInt(3, 10);
      const arbres = randomInt(10, 20) * 100;
      const r = 100;
      return {
        text:
          `Au 1er janvier $${annee}$, une forêt compte $${arbres}$ arbres, et l'on en plante $${r}$ de plus chaque année. ` +
          `On note $u_n$ le nombre d'arbres au 1er janvier de l'année $${annee} + n$. ` +
          `Que représente $u_{${n}} = ${fr(arbres + n * r)}$ ?`,
        format: "qcm",
        choices: makeChoices(
          `le nombre d'arbres au 1er janvier $${annee + n}$`,
          [
            `le nombre d'arbres au 1er janvier $${annee + n + 1}$`,
            `le nombre d'arbres plantés en $${n}$ années`,
            `le nombre d'années nécessaires pour atteindre $${fr(arbres + n * r)}$ arbres`,
          ]
        ),
        expected: [`le nombre d'arbres au 1er janvier $${annee + n}$`],
        comparator: "mcq_exact",
        explanation: exp(
          `L'énoncé pose $u_n$ = nombre d'arbres l'année $${annee} + n$.`,
          `On remplace $n$ par $${n}$ : l'année concernée est $${annee} + ${n}$.`,
          `$u_{${n}} = ${arbres} + ${n} \\times ${r} = ${fr(arbres + n * r)}$ arbres en $${annee + n}$.`,
          `$u_{${n}}$ est le nombre d'arbres au 1er janvier $${annee + n}$. (Les arbres PLANTÉS depuis le début seraient $${fr(n * r)}$, c'est autre chose.)`
        ),
        choiceDiagnostics: [
          {
            choice: `le nombre d'arbres plantés en $${n}$ années`,
            cause: "a oublié le stock initial : la suite compte le total, pas l'ajout",
          },
          {
            choice: `le nombre d'arbres au 1er janvier $${annee + n + 1}$`,
            cause: `décalage d'un an : $u_0$ correspond à $${annee}$, pas à $${annee + 1}$`,
          },
        ],
      };
    },
  },
];
