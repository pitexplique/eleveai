// lib/tutor-v4/questionBank/premiere/maths/derivee-lecture.bank.ts
//
// Notions : der_graphique et der_nombre_derive (domaine BOP1DE)
//
// La dérivée telle qu'on la RENCONTRE d'abord : sur une courbe, avec une
// tangente tracée. Le programme en vigueur (BO du 7 juillet 2022) l'introduit
// exactement ainsi — « le nombre dérivé peut être présenté comme le
// coefficient directeur de la tangente, position limite des sécantes » — et la
// première capacité attendue est de l'interpréter, pas de le calculer.
//
// C'est l'exercice 3 du sujet d'Asie, juin 2026 : la courbe de croissance de
// Juliette, trois tangentes tracées, et quatre questions dont aucune ne demande
// un calcul — à quel âge grandissait-elle le plus vite, pourquoi peut-on dire
// que sa croissance est terminée, quelle sera sa taille adulte.
//
// Chaque item porte la courbe ET sa tangente. Une tangente se voit ; décrite
// avec des mots, elle ne veut plus rien dire.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* ─────────────────────────── outils ─────────────────────────── */

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

/**
 * Une parabole f(x) = ax² + bx + c et sa tangente au point d'abscisse x0.
 * Le nombre dérivé f'(x0) vaut 2a·x0 + b : c'est le coefficient directeur de
 * la tangente, et c'est ce que l'élève doit lire.
 *
 * ⛔ ET LA FENÊTRE SE CALCULE. Elle était fixe — [−5 ; 5] × [−8 ; 10] quelle que
 * soit la pente —, et c'est ce que Frédéric voyait le 12/09/2026 : « il me
 * semble qu'il y a des erreurs parfois » sur les dérivées graphiques. Mesuré
 * sur 200 tirages :
 *
 *   - le point A tombait HORS du cadre (A(4 ; 14) pour une fenêtre qui
 *     s'arrête à 10) : on demandait la pente en un point invisible ;
 *   - 19 fois sur 200, la tangente quittait la figure AVANT un pas de 1, donc
 *     le geste même qu'enseigne l'exercice — « avance de 1, regarde de combien
 *     elle monte » — ne pouvait pas se faire.
 *
 * La fenêtre est donc centrée sur A, et son demi-côté vaut |pente| + 2 : à un
 * pas de 1 la tangente est montée de |pente|, il reste deux unités de marge.
 *
 * ⭐ ET ELLE EST CARRÉE EN UNITÉS. Sur un repère dont les deux axes n'ont pas la
 * même échelle, une pente de 1 ne se dessine pas à 45° : l'élève qui apprend à
 * LIRE une pente apprendrait un réflexe faux. Le carré rend le dessin honnête.
 */
function canvasTangente(
  a: number,
  b: number,
  c: number,
  x0: number,
  titre?: string
): CanvasFigure {
  const pente = 2 * a * x0 + b;
  const yx0 = a * x0 * x0 + b * x0 + c;
  const demi = Math.max(3, Math.ceil(Math.abs(pente)) + 2);
  return {
    kind: "fonctionGraphique",
    titre: titre ?? "La courbe de f et sa tangente au point A",
    xmin: x0 - demi,
    xmax: x0 + demi,
    ymin: yx0 - demi,
    ymax: yx0 + demi,
    grille: true,
    courbes: [
      { id: "f", type: "quadratique", a, b, c, couleur: "#e11d48" },
      { id: "t", type: "affine", a: pente, b: yx0 - pente * x0, couleur: "#0284c7" },
    ],
    points: [{ x: x0, y: yx0, label: "A" }],
  };
}

export const deriveeLectureBank: TutorBankItemV4[] = [
  /* ═══════════════ der_tangente_lire ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_tangente_lire_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_graphique",
    microId: "der_tangente_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre dérivé se lit sur la TANGENTE : avance de $1$, regarde de combien elle monte.",
    tags: ["premiere", "maths", "derivation", "tangente", "template", "short"],
    generate: () => {
      const a = pick([0.5, 1] as const);
      const b = pick([-2, -1, 1, 2] as const);
      const c = pick([-2, 0, 2] as const);
      const x0 = pick([-2, -1, 1, 2] as const);
      const pente = 2 * a * x0 + b;
      return {
        text:
          `La courbe ci-contre représente une fonction $f$, et la droite bleue est sa tangente ` +
          `au point $A$ d'abscisse $${x0}$. Combien vaut $f'(${x0})$ ?`,
        format: "short",
        expected: [fr(pente)],
        comparator: "number_equal",
        canvas: canvasTangente(a, b, c, x0),
        explanation: exp(
          "Le nombre dérivé $f'(x_0)$ est le coefficient directeur de la tangente à la courbe au point d'abscisse $x_0$.",
          "On lit la pente de la tangente : quand on avance de $1$ vers la droite, de combien monte-t-elle ?",
          `La tangente au point $A$ a pour coefficient directeur $${fr(pente)}$.`,
          `$f'(${x0}) = ${fr(pente)}$ — c'est un nombre qu'on LIT sur la tangente, sans calcul.`
        ),
      };
    },
  },

  /* ═══════════════ der_tangente_signe ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_signe_tangente_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_graphique",
    microId: "der_tangente_signe",
    difficulty: 2,
    theme: "neutral",
    hint: "La courbe monte ? La tangente monte aussi, donc le nombre dérivé est positif.",
    tags: ["premiere", "maths", "derivation", "signe", "template"],
    generate: () => {
      const a = pick([0.5, 1] as const);
      const b = pick([-2, -1, 1, 2] as const);
      const c = 0;
      // On choisit x0 pour que la pente soit franchement non nulle.
      const x0 = pick(([-2, -1, 1, 2] as const).filter((v) => Math.abs(2 * a * v + b) >= 1));
      const pente = 2 * a * x0 + b;
      return {
        text:
          `La courbe ci-contre représente $f$, et la droite bleue est sa tangente au point ` +
          `d'abscisse $${x0}$. Quel est le signe de $f'(${x0})$ ?`,
        format: "qcm",
        choices: makeChoices(pente > 0 ? "positif" : "négatif", [
          pente > 0 ? "négatif" : "positif",
          "nul",
          "on ne peut pas le savoir sans l'expression de $f$",
        ]),
        expected: [pente > 0 ? "positif" : "négatif"],
        comparator: "mcq_exact",
        canvas: canvasTangente(a, b, c, x0),
        explanation: exp(
          "Le signe du nombre dérivé est celui du coefficient directeur de la tangente.",
          "Une tangente qui monte a un coefficient directeur positif ; une tangente qui descend, négatif.",
          `Ici la tangente ${pente > 0 ? "monte" : "descend"}, et $f'(${x0}) = ${fr(pente)}$.`,
          `$f'(${x0})$ est ${pente > 0 ? "positif" : "négatif"} : au voisinage de ce point, $f$ est ${pente > 0 ? "croissante" : "décroissante"}.`
        ),
        choiceDiagnostics: [
          {
            choice: "on ne peut pas le savoir sans l'expression de $f$",
            cause: "le signe se lit sur la tangente : l'expression n'est pas nécessaire",
          },
        ],
      };
    },
  },

  /* ═══════════════ der_tangente_horizontale ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_horizontale_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_graphique",
    microId: "der_tangente_horizontale",
    difficulty: 3,
    theme: "neutral",
    hint: "Une tangente horizontale a un coefficient directeur nul.",
    tags: ["premiere", "maths", "derivation", "extremum", "template", "short"],
    generate: () => {
      const a = pick([0.5, 1] as const);
      const sommetX = pick([-2, -1, 1, 2] as const);
      const b = -2 * a * sommetX;
      const c = pick([-2, 0, 2] as const);
      return {
        text:
          `La courbe ci-contre représente $f$, avec sa tangente au sommet. ` +
          `En quelle abscisse la tangente est-elle horizontale ?`,
        format: "short",
        expected: [fr(sommetX)],
        comparator: "number_equal",
        canvas: canvasTangente(a, b, c, sommetX, "La courbe de f et sa tangente au sommet"),
        explanation: exp(
          "Une tangente horizontale a un coefficient directeur nul : en ce point, $f'(x) = 0$.",
          "On repère l'endroit où la courbe cesse de descendre et se met à monter — son sommet.",
          `Le sommet a pour abscisse $${fr(sommetX)}$, et la tangente y est bien horizontale.`,
          `La tangente est horizontale en $x = ${fr(sommetX)}$, donc $f'(${fr(sommetX)}) = 0$. C'est là que $f$ atteint son minimum.`
        ),
      };
    },
  },

  /* ═══════════════ der_comparer_vitesses ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_comparer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_graphique",
    microId: "der_comparer_vitesses",
    difficulty: 4,
    theme: "neutral",
    hint: "Plus la courbe est raide, plus le nombre dérivé est grand.",
    tags: ["premiere", "maths", "derivation", "vitesse", "template"],
    generate: () => {
      const a = pick([0.5, 1] as const);
      const b = 0;
      const c = -2;
      const x1 = pick([1, 2] as const);
      const x2 = pick([3, 4] as const);
      return {
        text:
          `La courbe ci-contre représente la taille d'une plante en fonction du temps, ` +
          `avec sa tangente à l'instant $${x2}$. ` +
          `À quel instant la plante grandit-elle le plus vite : $${x1}$ ou $${x2}$ ?`,
        format: "qcm",
        choices: makeChoices(`à l'instant $${x2}$`, [
          `à l'instant $${x1}$`,
          "à la même vitesse aux deux instants",
          "on ne peut pas comparer",
        ]),
        expected: [`à l'instant $${x2}$`],
        comparator: "mcq_exact",
        canvas: canvasTangente(a, b, c, x2, "Taille de la plante en fonction du temps"),
        explanation: exp(
          "La vitesse de variation à un instant donné est le nombre dérivé en cet instant.",
          "On compare la raideur de la courbe aux deux endroits : plus elle est raide, plus la tangente est pentue.",
          `$f'(${x1}) = ${fr(2 * a * x1 + b)}$ et $f'(${x2}) = ${fr(2 * a * x2 + b)}$.`,
          `La plante grandit plus vite à l'instant $${x2}$ : la courbe y est nettement plus raide. C'est la question posée au sujet d'Asie sur la croissance de Juliette.`
        ),
      };
    },
  },

  /* ═══════════════ der_nombre_derive_sens ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_der_sens_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_nombre_derive_sens",
    difficulty: 2,
    theme: "neutral",
    text: "La taille d'un enfant est modélisée par une fonction $f$ du temps. Que représente $f'(12)$ ?",
    format: "qcm",
    choices: [
      "Sa vitesse de croissance à $12$ ans",
      "Sa taille à $12$ ans",
      "Sa taille moyenne entre $0$ et $12$ ans",
      "Le nombre d'années jusqu'à sa taille adulte",
    ],
    expected: ["Sa vitesse de croissance à $12$ ans"],
    comparator: "mcq_exact",
    hint: "$f$ donne la taille ; $f'$ donne la façon dont elle change.",
    explanation: exp(
      "Le nombre dérivé $f'(a)$ mesure la vitesse à laquelle la grandeur varie à l'instant $a$.",
      "On distingue la grandeur elle-même, $f$, et sa vitesse de variation, $f'$.",
      "$f(12)$ serait la taille à $12$ ans, en centimètres. $f'(12)$ est la vitesse de croissance à cet âge, en centimètres par an.",
      "$f'(12)$ est la vitesse de croissance à $12$ ans. (Formulation du sujet d'Asie, juin 2026 : « la vitesse de croissance à une date $t$ est égale au nombre dérivé $f'(t)$ ».)"
    ),
    choiceDiagnostics: [
      {
        choice: "Sa taille à $12$ ans",
        cause: "confond $f(12)$ et $f'(12)$ : la grandeur et sa vitesse de variation",
      },
    ],
    tags: ["premiere", "maths", "derivation", "interpretation", "sujet-2026"],
  },

  {
    kind: "template",
    id: "premiere_der_sens_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_nombre_derive_sens",
    difficulty: 3,
    theme: "neutral",
    hint: "$f$ donne la grandeur ; $f'$ donne la façon dont elle CHANGE.",
    tags: ["premiere", "maths", "derivation", "interpretation", "template"],
    generate: () => {
      const cas = pick([
        {
          grandeur: "la taille d'un enfant",
          variable: "le temps, en années",
          instant: 12,
          bonne: "sa vitesse de croissance à $12$ ans, en cm par an",
          pieges: ["sa taille à $12$ ans", "sa taille moyenne depuis la naissance", "son âge adulte"],
        },
        {
          grandeur: "la distance parcourue par un mobile",
          variable: "le temps, en secondes",
          instant: 5,
          bonne: "sa vitesse instantanée à $5$ secondes",
          pieges: [
            "la distance parcourue en $5$ secondes",
            "sa vitesse moyenne sur les $5$ secondes",
            "le temps mis pour parcourir $5$ mètres",
          ],
        },
        {
          grandeur: "le coût total de production d'une entreprise",
          variable: "la quantité produite",
          instant: 100,
          bonne: "le coût marginal : ce que coûte la centième unité supplémentaire",
          pieges: [
            "le coût total de $100$ unités",
            "le coût moyen par unité",
            "le bénéfice réalisé sur $100$ unités",
          ],
        },
        {
          grandeur: "le nombre d'abonnés d'un service",
          variable: "le temps, en mois",
          instant: 6,
          bonne: "la vitesse à laquelle le nombre d'abonnés change au sixième mois",
          pieges: [
            "le nombre d'abonnés au sixième mois",
            "le nombre total d'abonnés gagnés en six mois",
            "le nombre de mois pour atteindre six abonnés",
          ],
        },
        {
          grandeur: "la quantité d'un produit formé lors d'une réaction chimique",
          variable: "le temps, en minutes",
          instant: 3,
          bonne: "la vitesse d'apparition du produit à la troisième minute",
          pieges: [
            "la quantité de produit formée en $3$ minutes",
            "la quantité totale formée à la fin",
            "le temps nécessaire pour former $3$ grammes",
          ],
        },
      ] as const);
      return {
        text:
          `Une fonction $f$ modélise ${cas.grandeur} en fonction de ${cas.variable}. ` +
          `Que représente $f'(${cas.instant})$ ?`,
        format: "qcm",
        choices: makeChoices(cas.bonne, cas.pieges),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre dérivé $f'(a)$ mesure la vitesse à laquelle la grandeur varie à l'instant $a$.",
          "On distingue la grandeur elle-même, $f$, de sa vitesse de variation, $f'$.",
          `$f(${cas.instant})$ donnerait ${cas.grandeur} à cet instant. $f'(${cas.instant})$ donne la vitesse à laquelle elle change.`,
          `$f'(${cas.instant})$ est ${cas.bonne}. ⚠️ $f$ et $f'$ ne se mesurent même pas dans la même unité.`
        ),
      };
    },
  },

  /* ═══════════════ der_tangente_coefficient ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_der_coefficient_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_tangente_coefficient",
    difficulty: 3,
    theme: "neutral",
    text: "Géométriquement, que représente le nombre dérivé $f'(a)$ ?",
    format: "qcm",
    choices: [
      "Le coefficient directeur de la tangente à la courbe au point d'abscisse $a$",
      "L'ordonnée du point de la courbe d'abscisse $a$",
      "L'aire sous la courbe jusqu'à $a$",
      "La distance entre la courbe et l'axe des abscisses en $a$",
    ],
    expected: ["Le coefficient directeur de la tangente à la courbe au point d'abscisse $a$"],
    comparator: "mcq_exact",
    hint: "La tangente est la droite qui « épouse » la courbe en ce point.",
    explanation: exp(
      "La tangente en un point est la position limite des sécantes passant par ce point.",
      "Son coefficient directeur mesure la pente de la courbe à cet endroit précis.",
      "Ce coefficient directeur est, par définition, le nombre dérivé $f'(a)$.",
      "$f'(a)$ est le coefficient directeur de la tangente au point d'abscisse $a$. C'est ce qui permet de le LIRE sur un graphique sans connaître l'expression de $f$."
    ),
    tags: ["premiere", "maths", "derivation", "tangente"],
  },

  {
    kind: "template",
    id: "premiere_der_coefficient_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_tangente_coefficient",
    difficulty: 3,
    theme: "neutral",
    hint: "La tangente est la droite qui « épouse » la courbe en un point : sa pente est le nombre dérivé.",
    tags: ["premiere", "maths", "derivation", "tangente", "template"],
    generate: () => {
      const a = pick([0.5, 1] as const);
      const b = pick([-2, -1, 1, 2] as const);
      // ⛔ la pente ne doit valoir ni x0 ni −x0 : sinon les pièges « $x_0$ » et
      // « pente opposée » valent la bonne réponse.
      const x0 = pick(
        ([-2, -1, 1, 2] as const).filter(
          (v) => 2 * a * v + b !== v && 2 * a * v + b !== -v && 2 * a * v + b !== 0
        )
      );
      const pente = 2 * a * x0 + b;
      // ⛔⛔ LE DESSIN ÉTAIT COLLÉ AUX QUATRE CAS — corrigé le 12/09/2026, et
      // c'est le défaut que Frédéric signalait. Trois de ces questions ne
      // parlent pas de la figure, et l'une la CONTREDIT : on demandait « si la
      // tangente est HORIZONTALE, que vaut le nombre dérivé ? » sous un dessin
      // où la tangente a une pente de 1. L'élève lit la figure — c'est ce qu'on
      // lui apprend à faire — et la figure lui dit le contraire de l'énoncé.
      //
      // Chaque cas porte donc SON dessin, ou aucun :
      //   - la question sur la tangente horizontale en dessine une VRAIE, prise
      //     au sommet de la parabole, où la pente s'annule pour de bon ;
      //   - la question sur deux tangentes parallèles n'a pas de figure : la
      //     figure ne montre qu'une courbe, elle ne peut qu'égarer.
      const sommet = -b / (2 * a);
      const cas = pick([
        {
          question: "Géométriquement, que représente le nombre dérivé $f'(a)$ ?",
          bonne: "le coefficient directeur de la tangente au point d'abscisse $a$",
          pieges: [
            "l'ordonnée du point de la courbe d'abscisse $a$",
            "l'aire sous la courbe jusqu'à $a$",
            "la distance entre la courbe et l'axe des abscisses",
          ],
          figure: canvasTangente(a, b, 0, x0),
        },
        {
          question: `La tangente tracée ci-contre a pour coefficient directeur $${fr(pente)}$. Que vaut $f'(${x0})$ ?`,
          bonne: `$${fr(pente)}$`,
          pieges: [`$${fr(-pente)}$`, `$${fr(x0)}$`, "on ne peut pas le savoir sans l'expression de $f$"],
          figure: canvasTangente(a, b, 0, x0),
        },
        {
          question: "Sur la figure, la tangente à la courbe au point $A$ est HORIZONTALE. Que vaut le nombre dérivé en ce point ?",
          bonne: "$0$",
          pieges: ["$1$", "il n'existe pas", "il est infini"],
          figure: canvasTangente(a, b, 0, sommet, "Une tangente horizontale, au sommet"),
        },
        {
          question:
            "Deux courbes différentes ont, en un même point, des tangentes parallèles. Que peut-on dire de leurs nombres dérivés en ce point ?",
          bonne: "ils sont égaux",
          pieges: [
            "ils sont opposés",
            "ils sont nuls tous les deux",
            "on ne peut rien en dire",
          ],
          figure: undefined,
        },
      ] as const);
      return {
        text: cas.question,
        format: "qcm",
        choices: makeChoices(cas.bonne, cas.pieges),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        canvas: cas.figure,
        explanation: exp(
          "La tangente en un point est la position limite des sécantes passant par ce point ; son coefficient directeur EST le nombre dérivé.",
          "On relie ce que l'on voit (une pente) à ce que l'on calcule (un nombre dérivé).",
          "Des tangentes parallèles ont le même coefficient directeur, donc le même nombre dérivé ; une tangente horizontale a un coefficient directeur nul.",
          `${cas.bonne.charAt(0).toUpperCase()}${cas.bonne.slice(1)}. C'est ce lien qui permet de LIRE une dérivée sur un graphique, sans connaître l'expression de $f$.`
        ),
      };
    },
  },

  /* ═══════════════ der_modele_interpreter ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_modele_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_modele_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Une dérivée nulle ne veut pas dire une grandeur nulle : elle veut dire qu'elle ne bouge plus.",
    tags: ["premiere", "maths", "derivation", "interpretation", "template"],
    generate: () => {
      const age = pick([16, 17, 18] as const);
      return {
        text:
          `La taille d'une personne est modélisée par une fonction $f$ du temps, en années. ` +
          `À partir de $${age}$ ans, la courbe devient horizontale. Que peut-on en conclure ?`,
        format: "qcm",
        choices: makeChoices(
          `sa croissance est terminée : $f'(t)$ est nul à partir de $${age}$ ans`,
          [
            `sa taille est nulle à partir de $${age}$ ans`,
            `elle rapetisse à partir de $${age}$ ans`,
            `elle grandit à vitesse constante à partir de $${age}$ ans`,
          ]
        ),
        expected: [`sa croissance est terminée : $f'(t)$ est nul à partir de $${age}$ ans`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une courbe horizontale a des tangentes horizontales : le nombre dérivé y est nul.",
          "On traduit « dérivée nulle » dans le contexte : la grandeur ne varie plus.",
          `À partir de $${age}$ ans, $f'(t) = 0$ : la taille cesse d'augmenter.`,
          `La croissance est terminée, et la taille se stabilise à sa valeur adulte. ⚠️ $f'(t) = 0$ ne signifie pas $f(t) = 0$ : c'est la VARIATION qui s'annule, pas la taille.`
        ),
        choiceDiagnostics: [
          {
            choice: `sa taille est nulle à partir de $${age}$ ans`,
            cause: "confond « la dérivée s'annule » et « la fonction s'annule »",
          },
        ],
      };
    },
  },

  /* ═════════════ RENFORT DU 12/09/2026 ═════════════
   *
   * ⛔ LE TROU MESURÉ. Les micros étaient servies — lire une pente, son signe,
   * la tangente horizontale — mais l'ENCHAÎNEMENT du devoir n'existait pas :
   *
   *   - ZÉRO item donnant la courbe de $f'$ pour en déduire les variations de
   *     $f$. C'est LA question de lecture graphique des sujets, et celle qui
   *     porte la confusion la plus coûteuse de tout le chapitre : l'élève lit
   *     les variations de la courbe qu'il voit, alors qu'on lui montre la
   *     DÉRIVÉE. Une courbe de $f'$ qui descend ne dit rien de décroissant : ce
   *     qui compte est son SIGNE, pas son sens de variation.
   *   - ZÉRO association « cette courbe est-elle $f$ ou $f'$ ? ».
   *   - trois micros sous le seuil de renouvellement : der_modele_interpreter
   *     (3 énoncés), der_nombre_derive_sens (5), der_comparer_vitesses (8).
   */

  {
    kind: "template",
    id: "premiere_der_signe_depuis_courbe_derivee_tpl",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_graphique",
    microId: "der_tangente_signe",
    difficulty: 4,
    theme: "neutral",
    hint: "⚠️ La courbe tracée est celle de $f'$, pas de $f$. On regarde si elle est AU-DESSUS ou EN DESSOUS de l'axe, pas si elle monte.",
    tags: ["premiere", "maths", "derivation", "graphique", "signe", "template"],
    generate: () => {
      // f'(x) = m(x − r) : une droite qui coupe l'axe en r, de pente m.
      const r = pick([-2, -1, 1, 2] as const);
      const m = pick([-2, -1, 1, 2] as const);
      const x1 = pick(([-3, -2, -1, 0, 1, 2, 3] as const).filter((v) => v !== r));
      const valeur = m * (x1 - r);
      const croissante = valeur > 0;
      // ⛔ LE POINT MARQUE SORTAIT DU CADRE (recalcul independant, 500 tirages).
      // Le demi-cote se deduisait de la pente seule : pour m = 2, r = -2 et
      // x1 = 3, la valeur atteint 10 alors que la fenetre s'arretait a 8. On le
      // calcule donc sur la VALEUR reellement marquee.
      const correct = croissante
        ? `$f$ est CROISSANTE en $${x1}$, car $f'(${x1}) > 0$`
        : `$f$ est DÉCROISSANTE en $${x1}$, car $f'(${x1}) < 0$`;
      const demi = Math.max(4, Math.abs(valeur) + 2);
      return {
        text: `La courbe ci-contre est celle de la DÉRIVÉE $f'$. Que peut-on dire de $f$ en $x = ${x1}$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          croissante
            ? `$f$ est DÉCROISSANTE en $${x1}$, car $f'(${x1}) < 0$`
            : `$f$ est CROISSANTE en $${x1}$, car $f'(${x1}) > 0$`,
          m > 0
            ? `$f$ est croissante, car la courbe tracée MONTE`
            : `$f$ est décroissante, car la courbe tracée DESCEND`,
          "on ne peut rien dire sans l'expression de $f$",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: {
          kind: "fonctionGraphique",
          titre: "La courbe de f ′ (et non celle de f)",
          xmin: -4,
          xmax: 4,
          ymin: -demi,
          ymax: demi,
          grille: true,
          courbes: [{ id: "fp", type: "affine", a: m, b: -m * r, couleur: "#7c3aed" }],
          points: [{ x: x1, y: valeur, label: "" }],
        },
        explanation: exp(
          "Le SIGNE de $f'$ donne le sens de variation de $f$ : $f' > 0$ sur un intervalle, $f$ y est croissante ; $f' < 0$, $f$ y est décroissante.",
          "On repère $x = " + x1 + "$ sur l'axe, et on regarde si la courbe de $f'$ est au-dessus ou en dessous de l'axe des abscisses à cet endroit.",
          `En $x = ${x1}$, la courbe de $f'$ est ${croissante ? "AU-DESSUS" : "EN DESSOUS"} de l'axe : $f'(${x1}) = ${fr(valeur)}$, donc ${croissante ? "positif" : "négatif"}.`,
          `$f$ est donc ${croissante ? "croissante" : "décroissante"} en $${x1}$. ⛔ Le piège : cette courbe ${m > 0 ? "MONTE" : "DESCEND"}, et l'on est tenté d'en conclure que $f$ ${m > 0 ? "croît" : "décroît"}. Non : c'est la courbe de $f'$, seul son SIGNE parle de $f$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_der_f_ou_fprime_tpl",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_graphique",
    microId: "der_nombre_derive_sens",
    difficulty: 5,
    theme: "neutral",
    hint: "Là où $f$ a une tangente horizontale, $f'$ vaut $0$ : sa courbe coupe l'axe.",
    tags: ["premiere", "maths", "derivation", "graphique", "raisonnement", "template"],
    generate: () => {
      // f(x) = a(x − s)² + k, sommet en s : f' s'annule en s, et seulement là.
      const a = pick([0.5, 1] as const);
      const s = pick([-2, -1, 1, 2] as const);
      const correct = `en $x = ${s}$, là où la tangente à la courbe est horizontale`;
      return {
        text:
          `La courbe ci-contre est celle de $f$. En quel point la dérivée $f'$ s'annule-t-elle ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `en $x = 0$, là où la courbe coupe l'axe des ordonnées`,
          `là où la courbe coupe l'axe des abscisses`,
          `$f'$ ne s'annule jamais`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: canvasTangente(a, -2 * a * s, 0, s, "Où la tangente est-elle horizontale ?"),
        explanation: exp(
          "$f'(x_0) = 0$ signifie que la tangente au point d'abscisse $x_0$ a un coefficient directeur nul : elle est HORIZONTALE.",
          "On cherche donc sur la courbe l'endroit où la tangente est horizontale — le sommet de la parabole.",
          `Ce sommet est en $x = ${s}$ : la tangente y est parallèle à l'axe des abscisses.`,
          `$f'(${s}) = 0$. ⛔ Ce n'est PAS là où la courbe coupe un axe : couper l'axe des abscisses veut dire $f(x) = 0$, ce qui ne dit rien sur $f'$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_der_comparer_pentes_tpl",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_graphique",
    microId: "der_comparer_vitesses",
    difficulty: 4,
    theme: "neutral",
    hint: "Plus la tangente est RAIDE en montant, plus le nombre dérivé est grand.",
    tags: ["premiere", "maths", "derivation", "graphique", "comparer", "template"],
    generate: () => {
      const a = pick([0.5, 1] as const);
      const b = pick([-2, -1, 0, 1, 2] as const);
      // Deux abscisses distinctes, et des pentes franchement differentes.
      const paires = ([[-2, 1], [-1, 2], [-2, 2], [-1, 1], [0, 2], [-2, 0]] as const).filter(
        ([u, v]) => Math.abs((2 * a * u + b) - (2 * a * v + b)) >= 1,
      );
      const [u, v] = pick(paires);
      const pu = 2 * a * u + b;
      const pv = 2 * a * v + b;
      const plusGrand = pu > pv ? u : v;
      const correct = `$f'(${plusGrand})$, car la tangente y est la plus RAIDE en montant`;
      const autre = plusGrand === u ? v : u;
      return {
        text: `Sur la courbe de $f$, on compare les nombres dérivés en $${u}$ et en $${v}$. Lequel est le plus GRAND ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$f'(${autre})$, car la tangente y est la plus RAIDE en montant`,
          "ils sont égaux, puisque c'est la même courbe",
          "on ne peut pas comparer deux nombres dérivés",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: {
          kind: "fonctionGraphique",
          titre: `Deux tangentes : en ${u} et en ${v}`,
          xmin: Math.min(u, v) - 3,
          xmax: Math.max(u, v) + 3,
          ymin: Math.min(a * u * u + b * u, a * v * v + b * v) - 5,
          ymax: Math.max(a * u * u + b * u, a * v * v + b * v) + 6,
          grille: true,
          courbes: [
            { id: "f", type: "quadratique", a, b, c: 0, couleur: "#e11d48" },
            { id: "t1", type: "affine", a: pu, b: a * u * u + b * u - pu * u, couleur: "#0284c7" },
            { id: "t2", type: "affine", a: pv, b: a * v * v + b * v - pv * v, couleur: "#059669" },
          ],
          points: [
            { x: u, y: a * u * u + b * u, label: "A" },
            { x: v, y: a * v * v + b * v, label: "B" },
          ],
        },
        explanation: exp(
          "Le nombre dérivé est le coefficient directeur de la tangente : comparer deux nombres dérivés, c'est comparer deux pentes.",
          "On regarde les deux tangentes tracées et on compare leur inclinaison, signe compris.",
          `$f'(${u}) = ${fr(pu)}$ et $f'(${v}) = ${fr(pv)}$.`,
          `$f'(${plusGrand})$ est le plus grand. ⚠️ « Plus grand » ne veut pas dire « plus penché » : une tangente très raide en DESCENDANT donne un nombre dérivé très NÉGATIF, donc petit.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_der_interpreter_contexte_tpl",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_modele_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Un nombre dérivé porte une UNITÉ : celle de la grandeur, divisée par celle du temps (ou de la quantité).",
    tags: ["premiere", "maths", "derivation", "interpreter", "modele", "template"],
    generate: () => {
      const cas = pick([
        {
          quoi: "la taille (en cm) d'un enfant en fonction de son âge (en années)",
          a: "8",
          unite: "cm par an",
          phrase: "à 8 ans, l'enfant grandit de",
          faux: "l'enfant mesure",
          fauxUnite: "cm",
        },
        {
          quoi: "la distance (en km) parcourue en fonction du temps (en h)",
          a: "2",
          unite: "km par heure",
          phrase: "à 2 h de trajet, on avance à",
          faux: "on a parcouru",
          fauxUnite: "km",
        },
        {
          quoi: "le coût (en €) de production en fonction du nombre d'objets",
          a: "50",
          unite: "€ par objet",
          phrase: "à 50 objets produits, chaque objet de plus coûte environ",
          faux: "produire 50 objets coûte",
          fauxUnite: "€",
        },
        {
          quoi: "le volume d'eau (en L) d'un bassin en fonction du temps (en min)",
          a: "10",
          unite: "L par minute",
          phrase: "à la 10ᵉ minute, le bassin se remplit de",
          faux: "le bassin contient",
          fauxUnite: "L",
        },
      ] as const);
      const val = pick([3, 4, 5, 6, 7] as const);
      const correct = `${cas.phrase} $${val}$ ${cas.unite}`;
      return {
        text:
          `$f$ modélise ${cas.quoi}. On lit $f'(${cas.a}) = ${val}$. Comment l'interpréter ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${cas.faux} $${val}$ ${cas.fauxUnite}`,
          `${cas.phrase} $${cas.a}$ ${cas.unite}`,
          "cela ne s'interprète pas : c'est un nombre sans unité",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre dérivé $f'(a)$ est une VITESSE DE VARIATION : de combien la grandeur change quand la variable augmente d'une unité, au voisinage de $a$.",
          "On lit l'unité dans l'énoncé : unité de la grandeur DIVISÉE par unité de la variable.",
          `Ici $f'(${cas.a}) = ${val}$, donc ${cas.phrase} $${val}$ ${cas.unite}.`,
          `⛔ Le piège : confondre $f'(${cas.a})$ et $f(${cas.a})$. $f(${cas.a})$ serait une valeur (${cas.fauxUnite}) ; $f'(${cas.a})$ est une vitesse (${cas.unite}).`
        ),
      };
    },
  },

  /* ── un SECOND gabarit pour les micros de tangente (12/09/2026) ──
   *
   * ⚠️ ELLES AVAIENT DES ÉNONCÉS, PAS DES GABARITS. der_tangente_lire servait
   * 92 énoncés distincts — et tous sortaient d'un gabarit UNIQUE. Le mode
   * complet du coach oppose deux questions et exige donc deux items : une micro
   * à gabarit unique y tombe en panne, quel que soit son nombre d'énoncés.
   * Chacun des trois seconds gabarits demande un GESTE DIFFÉRENT du premier,
   * sinon on double la quantité sans rien ajouter à ce qu'on enseigne.
   */

  {
    kind: "template",
    id: "premiere_der_tangente_lire_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_graphique",
    microId: "der_tangente_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Entre deux points d'une droite : on divise la montée par le déplacement horizontal.",
    tags: ["premiere", "maths", "derivation", "tangente", "template", "short"],
    generate: () => {
      // Le geste change : on ne lit plus « avance de 1 », on utilise DEUX points
      // marqués de la tangente, comme le fait un sujet quand la pente n'est pas
      // entière.
      const x0 = pick([-2, -1, 0, 1, 2] as const);
      const dx = pick([2, 4] as const);
      const dy = pick([-6, -3, -2, 2, 3, 6] as const);
      const pente = dy / dx;
      const y0 = pick([-2, 0, 2] as const);
      const demi = Math.max(4, Math.ceil(Math.abs(dy)) + 1);
      return {
        text:
          `La tangente à la courbe de $f$ au point $A(${x0}\\,;\\,${y0})$ passe aussi par ` +
          `$B(${x0 + dx}\\,;\\,${y0 + dy})$. Combien vaut $f'(${x0})$ ?`,
        format: "short",
        expected: [fr(pente)],
        comparator: "number_equal",
        canvas: {
          kind: "fonctionGraphique",
          titre: "La tangente passe par A et par B",
          xmin: x0 - 2,
          xmax: x0 + dx + 2,
          ymin: Math.min(y0, y0 + dy) - 2,
          ymax: Math.min(y0, y0 + dy) - 2 + demi + 3,
          grille: true,
          courbes: [{ id: "t", type: "affine", a: pente, b: y0 - pente * x0, couleur: "#0284c7" }],
          points: [
            { x: x0, y: y0, label: "A" },
            { x: x0 + dx, y: y0 + dy, label: "B" },
          ],
        },
        explanation: exp(
          "Le nombre dérivé $f'(x_0)$ est le coefficient directeur de la tangente, et le coefficient directeur d'une droite se calcule avec deux de ses points.",
          "On divise la variation des ordonnées par celle des abscisses : $\\dfrac{y_B - y_A}{x_B - x_A}$.",
          `$\\dfrac{${y0 + dy} - (${y0})}{${x0 + dx} - (${x0})} = \\dfrac{${dy}}{${dx}} = ${fr(pente)}$.`,
          `$f'(${x0}) = ${fr(pente)}$. ⛔ On divise la MONTÉE par le déplacement horizontal, jamais l'inverse.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_der_horizontale_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_graphique",
    microId: "der_tangente_horizontale",
    difficulty: 4,
    theme: "neutral",
    hint: "Une tangente horizontale, c'est un sommet — le point où la courbe cesse de monter pour descendre, ou l'inverse.",
    tags: ["premiere", "maths", "derivation", "tangente", "extremum", "template", "short"],
    generate: () => {
      // Le geste change : on ne reconnait plus une tangente horizontale, on
      // CHERCHE l'abscisse ou elle l'est.
      const a = pick([0.5, 1] as const);
      const s = pick([-2, -1, 1, 2] as const);
      const c = pick([-2, 0, 2] as const);
      return {
        text:
          `La courbe ci-contre est celle de $f$. En quelle abscisse la tangente à la courbe ` +
          `est-elle HORIZONTALE ?`,
        format: "short",
        expected: [fr(s)],
        comparator: "number_equal",
        canvas: canvasTangente(a, -2 * a * s, c, s, "Cherche le point où la tangente est plate"),
        explanation: exp(
          "Une tangente horizontale a un coefficient directeur nul : c'est exactement l'endroit où $f'$ s'annule.",
          "Sur une parabole, ce point est le SOMMET : la courbe y cesse de descendre pour monter (ou l'inverse).",
          `Le sommet de cette parabole a pour abscisse $${fr(s)}$.`,
          `La tangente est horizontale en $x = ${fr(s)}$, et $f'(${fr(s)}) = 0$. ⚠️ C'est l'abscisse qu'on demande, pas la valeur de $f$ en ce point.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_der_coefficient_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_tangente_coefficient",
    difficulty: 4,
    theme: "neutral",
    hint: "Dans $y = mx + p$, le nombre dérivé est $m$ — le coefficient devant $x$, pas l'ordonnée à l'origine.",
    tags: ["premiere", "maths", "derivation", "tangente", "equation", "template"],
    generate: () => {
      // Le geste change : la tangente est donnee par son EQUATION, pas par un
      // dessin. C'est la forme sous laquelle un sujet la fournit le plus souvent
      // apres la premiere question.
      const m = pick([-4, -3, -2, 2, 3, 4] as const);
      // ⛔ LE QCM TOMBAIT A DEUX PROPOSITIONS (recalcul independant). Les trois
      // distracteurs sont p, f(x0) = m·x0 + p et x0 : rien n'empechait deux
      // d'entre eux de coincider, ni de valoir m — et `makeChoices` supprime
      // les doublons, donc la question se retrouvait a deux cases. On ne tire
      // que des configurations ou les quatre nombres sont deux a deux
      // differents.
      const combinaisons = ([-5, -3, -1, 1, 3, 5] as const).flatMap((pp) =>
        ([-2, -1, 1, 2, 3] as const).map((xx) => ({ p: pp, x0: xx })),
      ).filter(({ p: pp, x0: xx }) => new Set([m, pp, m * xx + pp, xx]).size === 4);
      const { p, x0 } = pick(combinaisons);
      const correct = `$${fr(m)}$`;
      return {
        text:
          `La tangente à la courbe de $f$ au point d'abscisse $${x0}$ a pour équation ` +
          `$y = ${fr(m)}x ${p >= 0 ? "+" : "-"} ${fr(Math.abs(p))}$. Que vaut $f'(${x0})$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$${fr(p)}$`,
          `$${fr(m * x0 + p)}$`,
          `$${fr(x0)}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre dérivé en $x_0$ est le COEFFICIENT DIRECTEUR de la tangente en ce point.",
          "Dans une équation $y = mx + p$, le coefficient directeur est $m$.",
          `Ici $m = ${fr(m)}$, donc $f'(${x0}) = ${fr(m)}$.`,
          `⛔ Les deux pièges : $${fr(p)}$ est l'ordonnée à l'origine de la tangente, et $${fr(m * x0 + p)}$ est $f(${x0})$ — la HAUTEUR du point de contact, pas la pente.`
        ),
      };
    },
  },
];
