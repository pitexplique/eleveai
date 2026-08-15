// lib/tutor-v4/questionBank/premiere/maths/fonction-exponentielle.bank.ts
//
// Notions : expo_fonction, expo_fonction_lecture, expo_taux_moyen,
//           expo_modeliser, expo_seuil (domaine BOP1VE)
//
// Le programme présente la fonction exponentielle comme le PROLONGEMENT d'une
// suite géométrique : « Les fonctions exponentielles sont présentées comme un
// prolongement des suites géométriques de raison positive à des valeurs non
// entières positives. » Et il suggère explicitement de « compléter le nuage de
// points représentant une suite géométrique pour obtenir la courbe d'une
// fonction continue ». C'est l'ordre suivi ici.
//
// Contenus : introduction de x ↦ a^x (a > 0, x ⩾ 0), propriétés algébriques
// ADMISES, variations, représentation graphique, cas particulier de l'exposant
// 1/n, taux d'évolution moyen correspondant à n évolutions successives.
//
// ⚠️ Sans calculatrice : les bases et les exposants sont choisis pour tomber
// juste. Un taux moyen ne se demande que lorsque la racine est entière —
// 1,44 sur deux périodes donne 1,2 ; 8 sur trois périodes donne 2.
//
// Situations du BO : élimination d'une substance dans le sang, triangle de
// Sierpinski, intérêts composés, modèle de Malthus, propagation d'une rumeur,
// demi-vie et carbone 14, taux de reproduction R0 d'un virus.

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

/**
 * Le nuage des valeurs d'une exponentielle. Le canvas ne trace pas de courbe
 * exponentielle : on place les points, ce qui est justement la démarche du
 * programme — on « complète » ensuite le nuage pour obtenir une courbe.
 */
function canvasExponentielle(valeurs: number[], titre: string): CanvasFigure {
  const ymax = Math.max(...valeurs);
  return {
    kind: "fonctionGraphique",
    titre,
    xmin: -0.5,
    xmax: valeurs.length - 0.5,
    ymin: 0,
    ymax: Math.ceil((ymax * 1.2) / 10) * 10 || 10,
    grille: true,
    points: valeurs.map((v, k) => ({ x: k, y: v })),
  };
}

export const fonctionExponentielleBank: TutorBankItemV4[] = [
  /* ═══════════════ expo_fct_reconnaitre ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_fct_reconnaitre_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_fonction",
    microId: "expo_fct_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans une fonction exponentielle, c'est la VARIABLE qui est en exposant.",
    tags: ["premiere", "maths", "exponentielle", "template"],
    generate: () => {
      const a = pick([2, 3, 1.5] as const);
      const n = pick([2, 3] as const);
      return {
        text: "Laquelle de ces fonctions est une fonction exponentielle ?",
        format: "qcm",
        choices: makeChoices(`$f(x) = ${fr(a)}^x$`, [
          `$g(x) = x^${n}$`,
          `$h(x) = ${fr(a)}x$`,
          `$k(x) = x^x$`,
        ]),
        expected: [`$f(x) = ${fr(a)}^x$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fonction exponentielle de base $a$ s'écrit $x \\mapsto a^x$, avec $a > 0$ : la base est fixe, l'exposant est la variable.",
          "On regarde qui est en exposant : un nombre fixe, ou $x$ ?",
          `$${fr(a)}^x$ a bien la variable en exposant. $x^${n}$ est une fonction PUISSANCE : c'est l'inverse, base variable et exposant fixe.`,
          `$f(x) = ${fr(a)}^x$ est la fonction exponentielle. La différence n'est pas cosmétique : $x^2$ double quand $x$ double, $2^x$ est multiplié par $2$ quand $x$ augmente de $1$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$g(x) = x^${n}$`,
            cause: "c'est une fonction puissance : la variable est en base, pas en exposant",
          },
        ],
      };
    },
  },

  /* ═══════════════ expo_fct_calculer ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_fct_calculer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_fonction",
    microId: "expo_fct_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "$a^x$ signifie qu'on multiplie $a$ par lui-même $x$ fois.",
    tags: ["premiere", "maths", "exponentielle", "template", "short"],
    generate: () => {
      const a = pick([2, 3, 5, 10] as const);
      const x = pick([2, 3] as const);
      return {
        text: `Soit $f(x) = ${a}^x$. Combien vaut $f(${x})$ ?`,
        format: "short",
        expected: [fr(a ** x)],
        comparator: "number_equal",
        explanation: exp(
          "Pour un exposant entier, $a^x$ est le produit de $x$ facteurs égaux à $a$.",
          "On développe le produit.",
          `$${a}^${x} = ${Array(x).fill(a).join(" \\times ")} = ${fr(a ** x)}$.`,
          `$f(${x}) = ${fr(a ** x)}$.`
        ),
      };
    },
  },

  /* ═══════════════ expo_fct_proprietes ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_proprietes_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_fonction",
    microId: "expo_fct_proprietes",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplier deux puissances de même base revient à ADDITIONNER les exposants.",
    tags: ["premiere", "maths", "exponentielle", "proprietes", "template"],
    generate: () => {
      const a = pick([2, 3, 5] as const);
      const p = pick([2, 3] as const);
      // ⛔ p + q ≠ p × q : avec p = q = 2 les deux valent 4, et le piège
      // « exposants multipliés » deviendrait la bonne réponse.
      const q = pick(([2, 4] as const).filter((v) => p + v !== p * v));
      return {
        text: `À quoi est égal $${a}^{${p}} \\times ${a}^{${q}}$ ?`,
        format: "qcm",
        choices: makeChoices(`$${a}^{${p + q}}$`, [
          `$${a}^{${p * q}}$`,
          `$${a * a}^{${p + q}}$`,
          `$${a}^{${Math.abs(p - q)}}$`,
        ]),
        expected: [`$${a}^{${p + q}}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Les propriétés algébriques des exponentielles sont admises, par extension de celles des puissances entières : $a^x \\times a^y = a^{x+y}$.",
          "On additionne les exposants, en gardant la base inchangée.",
          `$${a}^{${p}} \\times ${a}^{${q}} = ${a}^{${p}+${q}} = ${a}^{${p + q}}$, et l'on vérifie : $${fr(a ** p)} \\times ${fr(a ** q)} = ${fr(a ** (p + q))}$.`,
          `$${a}^{${p}} \\times ${a}^{${q}} = ${a}^{${p + q}}$. La base ne change JAMAIS : c'est l'erreur la plus fréquente.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${a * a}^{${p + q}}$`,
            cause: "a multiplié les bases en plus d'additionner les exposants",
          },
          {
            choice: `$${a}^{${p * q}}$`,
            cause: "a multiplié les exposants : c'est la règle de $(a^p)^q$, pas celle d'un produit",
          },
        ],
      };
    },
  },

  /* ═══════════════ expo_fct_exposant_fractionnaire ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_exposant_frac_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_fonction",
    microId: "expo_fct_exposant_fractionnaire",
    difficulty: 4,
    theme: "neutral",
    hint: "$a^{1/n}$ est le nombre qui, élevé à la puissance $n$, redonne $a$.",
    tags: ["premiere", "maths", "exponentielle", "racine", "template", "short"],
    generate: () => {
      const base = pick([4, 9, 16, 25, 100] as const);
      return {
        text: `Combien vaut $${base}^{\\frac{1}{2}}$ ?`,
        format: "short",
        expected: [fr(Math.sqrt(base))],
        comparator: "number_equal",
        explanation: exp(
          "L'exposant $\\dfrac{1}{n}$ correspond à la racine $n$-ième : $a^{1/n}$ est le nombre positif dont la puissance $n$-ième vaut $a$.",
          "Pour $n = 2$, il s'agit de la racine carrée.",
          `$${base}^{1/2} = \\sqrt{${base}} = ${fr(Math.sqrt(base))}$, car $${fr(Math.sqrt(base))}^2 = ${base}$.`,
          `$${base}^{\\frac{1}{2}} = ${fr(Math.sqrt(base))}$. C'est cohérent avec les propriétés : $a^{1/2} \\times a^{1/2} = a^{1} = a$.`
        ),
      };
    },
  },

  /* ═══════════════ expo_fct_variations ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_fct_variations_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_fonction_lecture",
    microId: "expo_fct_variations",
    difficulty: 3,
    theme: "neutral",
    hint: "Comparer la base à $1$, comme on compare la raison d'une suite géométrique à $1$.",
    tags: ["premiere", "maths", "exponentielle", "variations", "template"],
    generate: () => {
      const croissante = Math.random() < 0.5;
      const a = croissante ? pick([1.5, 2, 3] as const) : pick([0.2, 0.5, 0.8] as const);
      return {
        text: `Soit $f(x) = ${fr(a)}^x$ définie pour $x \\geq 0$. Cette fonction est :`,
        format: "qcm",
        choices: makeChoices(croissante ? "croissante" : "décroissante", [
          croissante ? "décroissante" : "croissante",
          "constante",
          "négative",
        ]),
        expected: [croissante ? "croissante" : "décroissante"],
        comparator: "mcq_exact",
        canvas: canvasExponentielle(
          [0, 1, 2, 3, 4].map((k) => Math.round(100 * a ** k) / 100),
          `Les valeurs de ${fr(a)}^x`
        ),
        explanation: exp(
          "Une fonction exponentielle $x \\mapsto a^x$ est croissante si $a > 1$, décroissante si $0 < a < 1$.",
          "On compare la base à $1$ — exactement comme pour la raison d'une suite géométrique.",
          `Ici $a = ${fr(a)}$, donc $a ${croissante ? ">" : "<"} 1$.`,
          `La fonction est ${croissante ? "croissante" : "décroissante"}${croissante ? "" : ", et toujours strictement positive : elle s'approche de zéro sans jamais l'atteindre"}.`
        ),
        choiceDiagnostics: [
          {
            choice: "négative",
            cause: "une exponentielle de base positive est toujours strictement positive",
          },
        ],
      };
    },
  },

  /* ═══════════════ expo_fct_graphique ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_fct_graphique_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_fonction_lecture",
    microId: "expo_fct_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "On repère l'abscisse, puis on lit l'ordonnée du point correspondant.",
    tags: ["premiere", "maths", "exponentielle", "graphique", "template", "short"],
    generate: () => {
      const a = pick([2, 3] as const);
      const x = pick([1, 2, 3] as const);
      const valeurs = [0, 1, 2, 3, 4].map((k) => a ** k);
      return {
        text:
          `Les points ci-contre sont ceux de la fonction $f(x) = ${a}^x$. ` +
          `Quelle est l'ordonnée du point d'abscisse $${x}$ ?`,
        format: "short",
        expected: [fr(a ** x)],
        comparator: "number_equal",
        canvas: canvasExponentielle(valeurs, `Les valeurs de ${a}^x`),
        explanation: exp(
          "La représentation graphique d'une fonction exponentielle se lit comme celle de n'importe quelle fonction : l'ordonnée d'un point est l'image de son abscisse.",
          "On repère l'abscisse demandée et l'on lit la valeur correspondante.",
          `$f(${x}) = ${a}^{${x}} = ${fr(a ** x)}$.`,
          `L'ordonnée vaut $${fr(a ** x)}$. On voit aussi que les points s'écartent de plus en plus : la croissance s'accélère.`
        ),
      };
    },
  },

  /* ═══════════════ expo_fct_prolonger_suite ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_expo_prolonger_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_fonction_lecture",
    microId: "expo_fct_prolonger_suite",
    difficulty: 4,
    theme: "neutral",
    text:
      "Une suite géométrique de raison $2$ et de premier terme $1$ donne les valeurs $1 ; 2 ; 4 ; 8 ; 16$. " +
      "Quel est le lien entre cette suite et la fonction $f(x) = 2^x$ ?",
    format: "qcm",
    choices: [
      "La fonction prolonge la suite : elle donne aussi une valeur pour les $x$ non entiers",
      "Ce sont deux objets sans rapport",
      "La fonction ne coïncide avec la suite qu'en $x = 0$",
      "La suite est croissante, la fonction décroissante",
    ],
    expected: ["La fonction prolonge la suite : elle donne aussi une valeur pour les $x$ non entiers"],
    comparator: "mcq_exact",
    hint: "Que vaut $f(3)$ ? Et que vaut le terme de rang $3$ de la suite ?",
    explanation: exp(
      "Le programme présente les fonctions exponentielles comme « un prolongement des suites géométriques de raison positive à des valeurs non entières ».",
      "On compare les valeurs de la suite et celles de la fonction aux rangs entiers.",
      "$f(0) = 1$, $f(1) = 2$, $f(2) = 4$, $f(3) = 8$ : la fonction passe exactement par les points de la suite. Mais elle donne en plus $f(1{,}5) \\approx 2{,}83$, ce que la suite ne sait pas faire.",
      "La fonction prolonge la suite. Graphiquement : on place les points de la suite, puis on « complète » le nuage pour obtenir une courbe continue."
    ),
    tags: ["premiere", "maths", "exponentielle", "suites"],
  },

  {
    kind: "template",
    id: "premiere_expo_prolonger_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_fonction_lecture",
    microId: "expo_fct_prolonger_suite",
    difficulty: 4,
    theme: "neutral",
    hint: "La suite ne donne des valeurs qu'aux rangs entiers ; la fonction, partout.",
    tags: ["premiere", "maths", "exponentielle", "suites", "template"],
    generate: () => {
      const a = pick([2, 3, 1.5] as const);
      const cas = pick([
        {
          question: `Que vaut $f(2)$ pour $f(x) = ${fr(a)}^x$, comparé au terme de rang $2$ de la suite géométrique de raison $${fr(a)}$ et de premier terme $1$ ?`,
          bonne: "les deux valent la même chose",
          pieges: [
            "la fonction donne le double",
            "la suite donne une valeur plus grande",
            "on ne peut pas les comparer",
          ],
          cle: `$f(2) = ${fr(a)}^2 = ${fr(a * a)}$, et le terme de rang $2$ de la suite vaut aussi $${fr(a * a)}$`,
        },
        {
          question: `Que peut calculer la fonction $f(x) = ${fr(a)}^x$ que la suite géométrique correspondante ne peut PAS calculer ?`,
          bonne: "une valeur pour un rang non entier, comme $1{,}5$",
          pieges: [
            "une valeur pour un rang négatif seulement",
            "rien de plus, elles sont identiques",
            "la somme de tous les termes",
          ],
          cle: "la suite n'est définie qu'aux rangs entiers ; la fonction l'est pour tout réel positif",
        },
        {
          question: `Graphiquement, quel est le lien entre les points de la suite géométrique de raison $${fr(a)}$ et la courbe de $f(x) = ${fr(a)}^x$ ?`,
          bonne: "la courbe passe exactement par tous les points de la suite",
          pieges: [
            "la courbe passe au-dessus de tous les points",
            "la courbe ne rencontre les points qu'en $x = 0$",
            "les points sont alignés sur la courbe, qui est une droite",
          ],
          cle: "on place les points de la suite, puis on « complète » le nuage pour obtenir la courbe continue",
        },
        {
          question: `Pourquoi le programme présente-t-il la fonction exponentielle APRÈS les suites géométriques ?`,
          bonne: "parce qu'elle en est le prolongement à des valeurs non entières",
          pieges: [
            "parce qu'elle est plus difficile à calculer",
            "parce qu'elle n'a rien à voir avec elles",
            "parce qu'elle décroît toujours",
          ],
          cle: "le texte dit : « présentées comme un prolongement des suites géométriques de raison positive à des valeurs non entières positives »",
        },
      ] as const);
      return {
        text: cas.question,
        format: "qcm",
        choices: makeChoices(cas.bonne, cas.pieges),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fonction exponentielle prolonge une suite géométrique : elle coïncide avec elle aux rangs entiers, et donne en plus une valeur partout ailleurs.",
          "On compare ce que chacune sait calculer.",
          `Ici, ${cas.cle}.`,
          `${cas.bonne.charAt(0).toUpperCase()}${cas.bonne.slice(1)}.`
        ),
      };
    },
  },

  /* ═══════════════ expo_taux_moyen_sens ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_expo_taux_moyen_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_taux_moyen",
    microId: "expo_taux_moyen_sens",
    difficulty: 3,
    theme: "neutral",
    text: "Qu'appelle-t-on taux d'évolution moyen sur $n$ périodes ?",
    format: "qcm",
    choices: [
      "Le taux qui, appliqué $n$ fois, donnerait la même évolution globale",
      "La moyenne arithmétique des $n$ taux",
      "Le taux global divisé par $n$",
      "Le plus grand des $n$ taux",
    ],
    expected: ["Le taux qui, appliqué $n$ fois, donnerait la même évolution globale"],
    comparator: "mcq_exact",
    hint: "« Moyen » ne veut pas dire « moyenne des taux ».",
    explanation: exp(
      "Le taux d'évolution moyen sur $n$ périodes est le taux constant qui produirait la même évolution globale.",
      "Son coefficient $c$ vérifie $c^n = C$, où $C$ est le coefficient global.",
      "Une hausse de $20\\,\\%$ suivie d'une baisse de $20\\,\\%$ donne un coefficient global de $1{,}2 \\times 0{,}8 = 0{,}96$, alors que la moyenne des taux vaudrait $0\\,\\%$ : les deux ne coïncident pas.",
      "C'est le taux qui, appliqué $n$ fois, donne la même évolution globale — et non la moyenne des taux, ni le taux global divisé par $n$."
    ),
    choiceDiagnostics: [
      {
        choice: "La moyenne arithmétique des $n$ taux",
        cause: "les taux ne s'additionnent pas : ce sont les coefficients qui se multiplient",
      },
    ],
    tags: ["premiere", "maths", "exponentielle", "taux-moyen"],
  },

  {
    kind: "template",
    id: "premiere_expo_taux_moyen_sens_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_taux_moyen",
    microId: "expo_taux_moyen_sens",
    difficulty: 3,
    theme: "neutral",
    hint: "« Moyen » ne veut pas dire « moyenne des taux » : les coefficients se multiplient.",
    tags: ["premiere", "maths", "exponentielle", "taux-moyen", "template"],
    generate: () => {
      const n = pick([3, 4, 5] as const);
      const cas = pick([
        {
          question: `Qu'appelle-t-on taux d'évolution moyen sur $${n}$ périodes ?`,
          bonne: `le taux qui, appliqué $${n}$ fois, donnerait la même évolution globale`,
          pieges: [
            `la moyenne arithmétique des $${n}$ taux`,
            `le taux global divisé par $${n}$`,
            `le plus grand des $${n}$ taux`,
          ],
          cle: "son coefficient $c$ vérifie $c^n = C$, où $C$ est le coefficient global",
        },
        {
          question:
            "Une hausse de $20\\,\\%$ suivie d'une baisse de $20\\,\\%$ : que vaut le taux d'évolution moyen ?",
          bonne: "il est légèrement négatif",
          pieges: ["il est nul", "il vaut $20\\,\\%$", "il est légèrement positif"],
          cle: "le coefficient global vaut $1{,}2 \\times 0{,}8 = 0{,}96 < 1$, donc l'évolution d'ensemble est une baisse",
        },
        {
          question:
            "Le taux d'évolution moyen d'une population sur dix ans est de $3\\,\\%$. Chaque année a-t-elle connu une hausse de $3\\,\\%$ ?",
          bonne: "non, seule l'évolution d'ensemble équivaut à cela",
          pieges: [
            "oui, c'est la définition",
            "oui, sauf la première année",
            "non, aucune année n'a pu être à $3\\,\\%$",
          ],
          cle: "le taux moyen résume le résultat final, il ne décrit pas chaque période",
        },
        {
          question:
            "Pour trouver le coefficient moyen sur $4$ périodes, connaissant le coefficient global $C$, que fait-on ?",
          bonne: "on cherche le nombre dont la puissance quatrième vaut $C$",
          pieges: [
            "on divise $C$ par $4$",
            "on multiplie $C$ par $4$",
            "on prend la moitié de $C$",
          ],
          cle: "on résout $c^4 = C$, c'est-à-dire $c = C^{1/4}$",
        },
      ] as const);
      return {
        text: cas.question,
        format: "qcm",
        choices: makeChoices(cas.bonne, cas.pieges),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le taux d'évolution moyen sur $n$ périodes est le taux CONSTANT qui produirait la même évolution globale.",
          "On raisonne sur les coefficients, qui se multiplient, et non sur les taux, qui ne s'additionnent pas.",
          `Ici, ${cas.cle}.`,
          `${cas.bonne.charAt(0).toUpperCase()}${cas.bonne.slice(1)}.`
        ),
      };
    },
  },

  /* ═══════════════ expo_taux_moyen_calculer ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_taux_moyen_calculer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_taux_moyen",
    microId: "expo_taux_moyen_calculer",
    difficulty: 4,
    theme: "neutral",
    hint: "On cherche le coefficient $c$ tel que $c^n$ égale le coefficient global.",
    tags: ["premiere", "maths", "exponentielle", "taux-moyen", "template", "short"],
    generate: () => {
      // Cas où la racine tombe juste : coefficient moyen c, sur n périodes.
      const c = pick([1.2, 1.5, 2, 0.5] as const);
      const n = pick([2, 3] as const);
      const global = c ** n;
      return {
        text:
          `Sur $${n}$ périodes, une quantité a été multipliée par $${fr(global)}$. ` +
          `Quel est le coefficient multiplicateur moyen par période ?`,
        format: "short",
        expected: [fr(c)],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient moyen $c$ sur $n$ périodes vérifie $c^n = C$, où $C$ est le coefficient global.",
          "On cherche le nombre qui, élevé à la puissance $n$, redonne le coefficient global.",
          `$c^{${n}} = ${fr(global)}$, et $${fr(c)}^{${n}} = ${fr(global)}$, donc $c = ${fr(c)}$.`,
          `Le coefficient moyen vaut $${fr(c)}$, soit un taux moyen de $${fr(Math.round((c - 1) * 1000) / 10)}\\,\\%$ par période. ` +
            `⚠️ Diviser $${fr(global)}$ par $${n}$ n'aurait rien donné de juste.`
        ),
      };
    },
  },

  /* ═══════════════ expo_taux_moyen_global ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_taux_global_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_taux_moyen",
    microId: "expo_taux_moyen_global",
    difficulty: 4,
    theme: "neutral",
    hint: "Le coefficient global est le produit des coefficients de chaque période.",
    tags: ["premiere", "maths", "exponentielle", "taux-moyen", "template", "short"],
    generate: () => {
      const t = pick([10, 20, 50] as const);
      const n = pick([2, 3] as const);
      const coef = 1 + t / 100;
      const global = coef ** n;
      return {
        text:
          `Une quantité augmente de $${t}\\,\\%$ par période pendant $${n}$ périodes. ` +
          `Quel est le coefficient multiplicateur global ?`,
        format: "short",
        expected: [fr(global)],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient global de $n$ évolutions identiques est le coefficient d'une période élevé à la puissance $n$.",
          "On calcule le coefficient d'une période, puis sa puissance.",
          `$c = ${fr(coef)}$, donc $C = ${fr(coef)}^{${n}} = ${fr(global)}$.`,
          `Le coefficient global vaut $${fr(global)}$, soit une hausse totale de $${fr(Math.round((global - 1) * 1000) / 10)}\\,\\%$ — ` +
            `et non de $${t * n}\\,\\%$, car les taux ne s'additionnent pas.`
        ),
      };
    },
  },

  /* ═══════════════ expo_taux_moyen_interpreter ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_taux_interpreter_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_taux_moyen",
    microId: "expo_taux_moyen_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Un taux moyen ne dit pas ce qui s'est passé chaque année, seulement le résultat d'ensemble.",
    tags: ["premiere", "maths", "exponentielle", "taux-moyen", "template"],
    generate: () => {
      const t = pick([3, 5, 8] as const);
      const n = pick([4, 5, 10] as const);
      return {
        text:
          `Une population a augmenté avec un taux d'évolution moyen de $${t}\\,\\%$ par an sur $${n}$ ans. ` +
          `Que peut-on en conclure ?`,
        format: "qcm",
        choices: makeChoices(
          `elle a augmenté chaque année, mais pas forcément de $${t}\\,\\%$`,
          [
            `elle a augmenté d'exactement $${t}\\,\\%$ chaque année`,
            `elle a augmenté de $${t * n}\\,\\%$ au total`,
            `elle a doublé en $${n}$ ans`,
          ]
        ),
        expected: [`elle a augmenté chaque année, mais pas forcément de $${t}\\,\\%$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Le taux moyen résume une évolution globale : il ne décrit pas chaque période prise séparément.",
          "On distingue ce que le taux moyen garantit de ce qu'il ne dit pas.",
          `Un taux moyen de $${t}\\,\\%$ signifie qu'une hausse constante de $${t}\\,\\%$ par an aurait donné le même résultat final. ` +
            `Les années ont pu être très inégales, voire l'une d'elles en baisse.`,
          `On sait seulement que le résultat global équivaut à $${t}\\,\\%$ par an. ` +
            `Le total n'est pas $${t * n}\\,\\%$ non plus : les coefficients se multiplient.`
        ),
        choiceDiagnostics: [
          {
            choice: `elle a augmenté d'exactement $${t}\\,\\%$ chaque année`,
            cause: "un taux moyen ne renseigne pas sur chaque période prise à part",
          },
        ],
      };
    },
  },

  /* ═══════════════ expo_modele_reconnaitre / choisir ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_modele_choisir_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_modeliser",
    microId: "expo_modele_choisir",
    difficulty: 3,
    theme: "neutral",
    hint: "Une quantité multipliée par le même nombre à chaque étape : c'est une exponentielle.",
    tags: ["premiere", "maths", "exponentielle", "modelisation", "template"],
    generate: () => {
      const depart = pick([10, 20, 50] as const);
      const t = pick([20, 50] as const);
      const coef = 1 + t / 100;
      return {
        text:
          `Une quantité vaut $${depart}$ au départ et augmente de $${t}\\,\\%$ à chaque étape. ` +
          `Quelle fonction donne sa valeur après $x$ étapes ?`,
        format: "qcm",
        choices: makeChoices(`$f(x) = ${depart} \\times ${fr(coef)}^x$`, [
          `$f(x) = ${depart} + ${t}x$`,
          `$f(x) = ${depart} \\times ${fr(coef)} \\times x$`,
          `$f(x) = ${depart}^{${fr(coef)}x}$`,
        ]),
        expected: [`$f(x) = ${depart} \\times ${fr(coef)}^x$`],
        comparator: "mcq_exact",
        canvas: canvasExponentielle(
          [0, 1, 2, 3, 4].map((k) => Math.round(depart * coef ** k)),
          "Évolution étape par étape"
        ),
        explanation: exp(
          "Une évolution à taux constant se modélise par $f(x) = V_0 \\times c^x$, où $c$ est le coefficient multiplicateur.",
          "On identifie la valeur initiale et le coefficient.",
          `$V_0 = ${depart}$ et $c = ${fr(coef)}$, donc $f(x) = ${depart} \\times ${fr(coef)}^x$.`,
          `On vérifie : $f(0) = ${depart}$ et $f(1) = ${fr(depart * coef)}$, ce qui correspond bien à une hausse de $${t}\\,\\%$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$f(x) = ${depart} + ${t}x$`,
            cause: "a modélisé par une croissance linéaire alors que le taux est constant",
          },
          {
            choice: `$f(x) = ${depart} \\times ${fr(coef)} \\times x$`,
            cause: "a multiplié par le rang au lieu de l'utiliser comme exposant",
          },
        ],
      };
    },
  },

  /* ═══════════════ expo_modele_reconnaitre ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_modele_reconnaitre_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_modeliser",
    microId: "expo_modele_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde si l'on passe d'une valeur à la suivante en ajoutant, ou en multipliant.",
    tags: ["premiere", "maths", "exponentielle", "modelisation", "template"],
    generate: () => {
      const expo = Math.random() < 0.5;
      const depart = pick([100, 200] as const);
      const q = pick([1.5, 2] as const);
      const r = pick([50, 100] as const);
      const valeurs = expo
        ? [0, 1, 2, 3].map((k) => depart * q ** k)
        : [0, 1, 2, 3].map((k) => depart + r * k);
      return {
        text:
          `Un relevé donne les valeurs $${valeurs.map((v) => fr(v)).join(" \\, ; \\, ")}$. ` +
          `De quel type de croissance s'agit-il ?`,
        format: "qcm",
        choices: makeChoices(expo ? "exponentielle" : "linéaire", [
          expo ? "linéaire" : "exponentielle",
          "il n'y a pas de croissance",
          "quadratique",
        ]),
        expected: [expo ? "exponentielle" : "linéaire"],
        comparator: "mcq_exact",
        canvas: canvasExponentielle(valeurs, "Le relevé"),
        explanation: exp(
          "Une croissance est linéaire quand on AJOUTE toujours la même quantité, exponentielle quand on MULTIPLIE toujours par le même nombre.",
          "On calcule les différences, puis les quotients.",
          expo
            ? `Différences : $${fr(valeurs[1] - valeurs[0])}$ puis $${fr(valeurs[2] - valeurs[1])}$ — elles changent. ` +
              `Quotients : $${fr(valeurs[1] / valeurs[0])}$ puis $${fr(valeurs[2] / valeurs[1])}$ — ils sont constants.`
            : `Différences : $${fr(valeurs[1] - valeurs[0])}$ puis $${fr(valeurs[2] - valeurs[1])}$ — elles sont constantes.`,
          expo
            ? "La croissance est exponentielle : les points s'incurvent vers le haut."
            : "La croissance est linéaire : les points sont alignés."
        ),
      };
    },
  },

  /* ═══════════════ expo_modele_comparer ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_comparer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_modeliser",
    microId: "expo_modele_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Une exponentielle finit toujours par dépasser une croissance linéaire, même en partant plus bas.",
    tags: ["premiere", "maths", "exponentielle", "modelisation", "template"],
    generate: () => {
      const lineaireDepart = pick([1000, 1200] as const);
      const lineaireAjout = pick([100, 150] as const);
      const expoDepart = pick([500, 600] as const);
      return {
        text:
          `Une population A part de $${lineaireDepart}$ et gagne $${lineaireAjout}$ individus par an. ` +
          `Une population B part de $${expoDepart}$ et augmente de $20\\,\\%$ par an. ` +
          `Que peut-on dire à long terme ?`,
        format: "qcm",
        choices: makeChoices("B finira par dépasser A", [
          "A restera toujours devant B",
          "les deux resteront égales",
          "B ne dépassera A que si elle part plus haut",
        ]),
        expected: ["B finira par dépasser A"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une croissance exponentielle finit toujours par dépasser une croissance linéaire, quelles que soient les valeurs de départ.",
          "On compare la nature des deux modèles, pas leurs premières valeurs.",
          `A suit $${lineaireDepart} + ${lineaireAjout}x$ : elle gagne toujours $${lineaireAjout}$ par an. ` +
            `B suit $${expoDepart} \\times 1{,}2^x$ : son gain annuel AUGMENTE, puisqu'il vaut $20\\,\\%$ d'une quantité de plus en plus grande.`,
          `B finira par dépasser A. C'est le cœur du modèle de Malthus, cité par le programme : ` +
            `des ressources qui croissent linéairement ne suivent pas une population qui croît exponentiellement.`
        ),
        choiceDiagnostics: [
          {
            choice: "A restera toujours devant B",
            cause: "s'en tient à l'écart de départ : l'exponentielle rattrape toujours, tôt ou tard",
          },
        ],
      };
    },
  },

  /* ═══════════════ expo_ordre_grandeur ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_ordre_grandeur_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_modeliser",
    microId: "expo_ordre_grandeur",
    difficulty: 4,
    theme: "neutral",
    hint: "Doubler dix fois, ce n'est pas multiplier par vingt.",
    tags: ["premiere", "maths", "exponentielle", "ordre-de-grandeur", "template", "short"],
    generate: () => {
      const n = pick([5, 6, 10] as const);
      const depart = pick([1, 2] as const);
      return {
        text:
          `Une rumeur se propage : chaque personne informée en informe deux autres à chaque étape, ` +
          `de sorte que le nombre de nouvelles personnes DOUBLE à chaque fois. ` +
          `En partant de $${depart}$ personne(s), combien en sont informées à l'étape $${n}$ ?`,
        format: "short",
        expected: [fr(depart * 2 ** n)],
        comparator: "number_equal",
        explanation: exp(
          "Un doublement à chaque étape correspond à une suite géométrique de raison $2$ : la valeur au rang $n$ est $V_0 \\times 2^n$.",
          "On applique la puissance, sans chercher à additionner.",
          `$${depart} \\times 2^{${n}} = ${depart} \\times ${fr(2 ** n)} = ${fr(depart * 2 ** n)}$.`,
          `$${fr(depart * 2 ** n)}$ personnes. C'est ce que le programme appelle « estimer les ordres de grandeur » : ` +
            `l'intuition sous-estime toujours une croissance exponentielle.`
        ),
      };
    },
  },

  /* ═══════════════ expo_seuil_calcul ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_seuil_calcul_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_seuil",
    microId: "expo_seuil_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "On teste les puissances successives jusqu'à dépasser le seuil.",
    tags: ["premiere", "maths", "exponentielle", "seuil", "template", "short"],
    generate: () => {
      const depart = pick([100, 200] as const);
      const n = pick([3, 4, 5] as const);
      const seuil = depart * 2 ** n - 1;
      return {
        text:
          `Une quantité vaut $${depart}$ et double à chaque étape. ` +
          `À partir de quelle étape dépasse-t-elle $${seuil}$ ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème de seuil sur une croissance exponentielle se résout en testant les valeurs successives.",
          "On calcule les termes jusqu'à franchir le seuil.",
          `Étapes : ${[0, 1, 2, 3, 4, 5].slice(0, n + 1).map((k) => fr(depart * 2 ** k)).join(" ; ")}. ` +
            `La première valeur strictement supérieure à $${seuil}$ est $${fr(depart * 2 ** n)}$, à l'étape $${n}$.`,
          `Le seuil est franchi à l'étape $${n}$.`
        ),
      };
    },
  },

  /* ═══════════════ expo_seuil_tableau ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_seuil_tableau_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_seuil",
    microId: "expo_seuil_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "On lit la colonne jusqu'à la première valeur qui atteint la cible.",
    tags: ["premiere", "maths", "exponentielle", "seuil", "tableau", "template", "short"],
    generate: () => {
      const depart = 20000;
      const coef = 1.02;
      const valeurs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => [
        n,
        Math.round(depart * coef ** n),
      ]);
      const cible = pick([21000, 22000, 23000] as const);
      const premier = valeurs.find((v) => (v[1] as number) >= cible)![0];
      return {
        text:
          `Un capital de $${depart}$ € est placé à $2\\,\\%$ par an. ` +
          `À l'aide du tableau ci-contre, détermine à partir de quelle année il atteint $${cible}$ €.`,
        format: "short",
        expected: [String(premier)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: "Capital placé à 2 % par an (arrondi à l'euro)",
          headers: ["", "Année", "Capital (€)"],
          rows: valeurs.map((v, i) => ({ label: String(i + 1), values: v })),
        },
        explanation: exp(
          "Un extrait de tableur permet de résoudre un problème de seuil par lecture, sans logarithme — qui n'est pas au programme.",
          "On parcourt la colonne des capitaux jusqu'à atteindre la somme visée.",
          `La première valeur supérieure ou égale à $${cible}$ € apparaît à l'année $${premier}$.`,
          `Le capital atteint $${cible}$ € au bout de $${premier}$ années. C'est la démarche de l'exercice 2 du sujet de Métropole.`
        ),
      };
    },
  },

  /* ═══════════════ expo_seuil_graphique ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_seuil_graphique_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_seuil",
    microId: "expo_seuil_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "On repère la hauteur du seuil, puis le premier point qui la dépasse.",
    tags: ["premiere", "maths", "exponentielle", "seuil", "graphique", "template", "short"],
    generate: () => {
      const depart = pick([100, 200] as const);
      const q = 2;
      const valeurs = [0, 1, 2, 3, 4].map((k) => depart * q ** k);
      const rang = pick([2, 3, 4] as const);
      const seuil = valeurs[rang] - depart / 2;
      return {
        text:
          `Le graphique ci-contre donne l'évolution d'une population qui double à chaque étape. ` +
          `À partir de quelle étape dépasse-t-elle $${fr(seuil)}$ individus ?`,
        format: "short",
        expected: [String(rang)],
        comparator: "number_equal",
        canvas: canvasExponentielle(valeurs, "Population à chaque étape"),
        explanation: exp(
          "Résoudre graphiquement un problème de seuil, c'est repérer le premier point situé au-dessus de la hauteur visée.",
          `On trace mentalement la ligne horizontale à $${fr(seuil)}$, puis on regarde quel point la dépasse en premier.`,
          `Les valeurs sont $${valeurs.map((v) => fr(v)).join(" \\, ; \\, ")}$. La première qui dépasse $${fr(seuil)}$ est $${fr(valeurs[rang])}$, à l'étape $${rang}$.`,
          `Le seuil est franchi à l'étape $${rang}$. Une lecture graphique suffit — et le programme l'autorise explicitement, au même titre que le calcul ou l'outil numérique.`
        ),
      };
    },
  },

  /* ═══════════════ expo_demi_vie ═══════════════ */

  {
    kind: "template",
    id: "premiere_expo_demi_vie_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "expo_seuil",
    microId: "expo_demi_vie",
    difficulty: 4,
    theme: "neutral",
    hint: "À chaque demi-vie, il reste la moitié de ce qu'il y avait.",
    tags: ["premiere", "maths", "exponentielle", "demi-vie", "template", "short"],
    generate: () => {
      const duree = pick([5, 8, 10, 20] as const);
      const nb = pick([2, 3] as const);
      const masse = pick([80, 160, 320] as const);
      return {
        text:
          `Un échantillon radioactif de $${masse}$ g a une demi-vie de $${duree}$ ans. ` +
          `Quelle masse reste-t-il au bout de $${duree * nb}$ ans ?`,
        format: "short",
        expected: [fr(masse / 2 ** nb)],
        comparator: "number_equal",
        explanation: exp(
          "La demi-vie est la durée au bout de laquelle il reste la moitié de la quantité initiale.",
          "On compte combien de demi-vies se sont écoulées, puis on divise autant de fois par $2$.",
          `$${duree * nb} \\div ${duree} = ${nb}$ demi-vies, donc il reste $${masse} \\times \\left(\\dfrac{1}{2}\\right)^{${nb}} = ${fr(masse / 2 ** nb)}$ g.`,
          `Il reste $${fr(masse / 2 ** nb)}$ g. ⚠️ Deux demi-vies ne font PAS disparaître toute la matière : ` +
            `il en reste toujours, de moins en moins — c'est le principe de la datation au carbone 14.`
        ),
      };
    },
  },
];
