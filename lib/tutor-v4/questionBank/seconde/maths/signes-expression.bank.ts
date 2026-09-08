// lib/tutor-v4/questionBank/seconde/maths/signes-expression.bank.ts
//
// Chapitre : Signe d'une expression et tableau de signes
// (notion signes_expression_2de)
//
// ⭐ NOTION CREEE LE 08/09/2026, a la demande de Frederic. Le tableau de signes
// logeait jusque-la dans « Vocabulaire des fonctions », a cote de image et
// antecedent — or ce n'est pas du vocabulaire, c'est une TECHNIQUE, enseignee
// comme un chapitre a part vers novembre-decembre. La STMG portait deja une
// notion dediee (`auto_signes`) avec la meme progression.
//
// ⭐ CE QUI COINCE, ET DONC CE QUE LES ITEMS TRAVAILLENT : le POSITIONNEMENT.
// « Les eleves ont beaucoup de mal a bien positionner » — dans quelle colonne
// tombe le zero, combien de colonnes le tableau doit avoir, ou va la double
// barre. Pas « quel est le signe de », qu'ils savent faire isolement.
//
// ⛔ LA DOUBLE BARRE N'EST PAS UN ZERO : sur un quotient, la valeur qui annule
// le denominateur est INTERDITE. Les confondre, c'est enseigner qu'on peut
// diviser par zero.
//
// microSkills :
//   signes_premier_degre     — Signe de ax + b
//   signes_produit           — Tableau de signes d'un produit
//   signes_quotient          — Tableau d'un quotient, et la valeur interdite
//   signes_resoudre_equation   — Resoudre f(x) = 0, tableau OU courbe
//   signes_resoudre_inequation — Resoudre f(x) > 0, tableau OU courbe

import type { TutorBankItemV4, CanvasFigure } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: readonly T[]): T[] {
  const copie = [...arr];
  for (let i = copie.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

/** Quatre propositions garanties distinctes, melangees. */
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Le nom de la fonction, tire.
 * ⭐ Frederic, 08/09/2026 : « il peut y avoir fonction f ou g ou h, il faut
 * savoir varier, meme u(x) mais plus rare dans les enonces ».
 */
function nomFonction(): string {
  const r = Math.random();
  if (r < 0.45) return "f";
  if (r < 0.75) return "g";
  if (r < 0.93) return "h";
  return "u";
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
 * Une courbe, pour lire un signe A L'OEIL.
 * ⛔ L'axe des abscisses doit etre VISIBLE dans la fenetre, sinon la question
 * n'a plus de sens : c'est par rapport a lui qu'on lit le signe.
 */
function courbe(
  type: "affine" | "quadratique",
  a: number,
  b: number,
  c?: number,
  racines?: number[],
): CanvasFigure {
  return {
    kind: "fonctionGraphique",
    size: { width: 300, height: 300 },
    xmin: -6,
    xmax: 6,
    ymin: -6,
    ymax: 6,
    grille: true,
    courbes: [{ id: "f", type, a, b, c, couleur: "#2563eb" }],
    misesEnEvidence: (racines ?? []).map((r) => ({
      point: { x: r, y: 0, label: `${r}`, couleur: "#dc2626" },
    })),
  };
}

/** Le tableau de signes d'un produit ou d'un quotient. */
function tableauSignes(
  bornes: string[],
  lignes: { label: string; signes: ("+" | "-")[]; marques?: ("0" | "||" | "")[] }[],
  titre?: string,
): CanvasFigure {
  return { kind: "tableau_signes", titre, bornes, lignes };
}

export const signesExpressionBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "seconde_fct_sig_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_equation",
    difficulty: 2,
    theme: "neutral",
    text: "Un produit de deux facteurs est nul si et seulement si :",
    format: "qcm",
    choices: [
      "au moins un des facteurs est nul",
      "les deux facteurs sont égaux",
      "les deux facteurs sont positifs",
      "leur somme est nulle",
    ],
    expected: ["au moins un des facteurs est nul"],
    comparator: "mcq_exact",
    hint: "C'est la règle du produit nul.",
    explanation: exp(
      "La règle du produit nul est essentielle pour résoudre les équations produit.",
      "$A \\times B = 0 \\iff A = 0$ ou $B = 0$.",
      "Il suffit qu'un facteur soit nul.",
      "Au moins un des facteurs est nul."
    ),
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_sig_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_equation",
    difficulty: 3,
    theme: "neutral",
    text: "Quelles sont les solutions de l'équation $(x - 2)(x + 5) = 0$ ?",
    format: "qcm",
    choices: ["$x = 2$ ou $x = -5$", "$x = -2$ ou $x = 5$", "$x = 2$ ou $x = 5$", "$x = 0$"],
    expected: ["$x = 2$ ou $x = -5$"],
    comparator: "mcq_exact",
    hint: "On annule chaque facteur.",
    explanation: exp(
      "On applique la règle du produit nul.",
      "$x - 2 = 0$ ou $x + 5 = 0$.",
      "$x = 2$ ou $x = -5$.",
      "Les solutions sont $x = 2$ ou $x = -5$."
    ),
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_sig_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_premier_degre",
    difficulty: 3,
    theme: "neutral",
    text: "Le facteur $x - 3$ s'annule en $3$. Pour $x > 3$, quel est son signe ?",
    format: "qcm",
    choices: ["positif", "négatif", "nul", "indéfini"],
    expected: ["positif"],
    comparator: "mcq_exact",
    hint: "Teste avec $x = 4$ : $4 - 3 = 1$.",
    explanation: exp(
      "Un facteur affine $x - 3$ change de signe en $3$.",
      "Pour $x > 3$, par exemple $x = 4$ : $4 - 3 = 1 > 0$.",
      "Donc $x - 3$ est positif après $3$.",
      "Il est positif pour $x > 3$."
    ),
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_sig_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_produit",
    difficulty: 4,
    theme: "neutral",
    text: "À quoi sert un tableau de signes ?",
    format: "qcm",
    choices: [
      "À étudier le signe d'un produit/quotient selon les valeurs de $x$",
      "À calculer une moyenne",
      "À tracer une parabole",
      "À mesurer un angle",
    ],
    expected: ["À étudier le signe d'un produit/quotient selon les valeurs de $x$"],
    comparator: "mcq_exact",
    hint: "On y note le signe de chaque facteur, puis du produit.",
    explanation: exp(
      "Le tableau de signes organise l'étude du signe d'une expression factorisée.",
      "On indique le signe de chaque facteur, puis on multiplie les signes.",
      "Cela résout les inéquations produit/quotient.",
      "Il sert à étudier le signe d'un produit/quotient selon $x$."
    ),
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_fct_sig_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_equation",
    difficulty: 3,
    theme: "neutral",
    text: "La fonction affine $f(x) = 2x - 6$ s'annule en quelle valeur ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "On résout $2x - 6 = 0$.",
    explanation: exp(
      "Pour le tableau de signes, on cherche où $f$ s'annule.",
      "$2x - 6 = 0 \\Rightarrow 2x = 6$.",
      "$x = 3$.",
      "$f$ s'annule en $3$."
    ),
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "short"],
  },

  {
    kind: "template",
    id: "seconde_fct_sig_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_equation",
    difficulty: 3,
    theme: "neutral",
    hint: "On annule chaque facteur.",
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "template"],
    generate: () => {
      const a = randomInt(1, 6);
      const b = randomInt(1, 6);
      const correct = `$x = ${a}$ ou $x = ${-b}$`;
      const choices = [
        correct,
        `$x = ${-a}$ ou $x = ${b}$`,
        `$x = ${a}$ ou $x = ${b}$`,
        `$x = ${-a}$ ou $x = ${-b}$`,
      ];
      return {
        text: `Quelles sont les solutions de $(x - ${a})(x + ${b}) = 0$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On applique la règle du produit nul.",
          `$x - ${a} = 0$ ou $x + ${b} = 0$.`,
          `$x = ${a}$ ou $x = ${-b}$.`,
          `Les solutions sont $x = ${a}$ ou $x = ${-b}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_sig_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_equation",
    difficulty: 3,
    theme: "neutral",
    hint: "On résout $ax + b = 0$.",
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const x = randomInt(1, 6);
      const b = -a * x;
      const sb = b >= 0 ? `+ ${b}` : `- ${-b}`;
      return {
        text: `En quelle valeur la fonction affine $f(x) = ${a}x ${sb}$ s'annule-t-elle ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "On cherche où $f$ s'annule pour le tableau de signes.",
          `$${a}x ${sb} = 0 \\Rightarrow ${a}x = ${-b}$.`,
          `$x = ${x}$.`,
          `$f$ s'annule en $${x}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_fct_sig_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_inequation",
    difficulty: 4,
    theme: "neutral",
    text: "Pour résoudre l'inéquation $(x - 1)(x + 2) > 0$, l'outil le plus adapté est :",
    format: "qcm",
    choices: ["un tableau de signes", "le théorème de Pythagore", "la relation de Chasles", "un encadrement"],
    expected: ["un tableau de signes"],
    comparator: "mcq_exact",
    hint: "On étudie le signe de chaque facteur.",
    explanation: exp(
      "Une inéquation produit se résout avec un tableau de signes.",
      "On y note le signe de $x - 1$, de $x + 2$, puis du produit.",
      "On lit les intervalles où le produit est positif.",
      "On utilise un tableau de signes."
    ),
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "raisonnement", "qcm"],
  },

  /* ===================== FONCTION_DOMAINE ===================== */
  // ⛔ CETTE SECTION A REMPLACE CELLE DE LA PARITE, le 04/09/2026. Le mot
  // « paire » n'apparait nulle part dans le BO 2026 : ses neuf items faisaient
  // travailler l'eleve hors programme. La « recherche de domaine d'etude
  // (ensemble de definition) », elle, y figure en contenu explicite.
  // ⭐ Et le domaine est le prealable de tout le reste : on ne calcule pas une
  // image en une valeur interdite, et le tableau de signes d'un quotient
  // commence par la valeur qui annule le denominateur.

  {
    kind: "template",
    id: "seconde_fct_signes_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_produit",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque valeur qui annule un facteur coupe la droite en deux.",
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "placement", "template", "qcm"],
    generate: () => {
      const nb = randomInt(1, 3);
      const racines = [] as number[];
      let v = randomInt(-5, -2);
      for (let i = 0; i < nb; i += 1) {
        racines.push(v);
        v += randomInt(2, 4);
      }
      const nom = nomFonction();
      const produit = racines.map((r) => `(x ${r < 0 ? "+" : "-"} ${Math.abs(r)})`).join("");
      const correct = `${nb + 1}`;
      return {
        text: `Soit $${nom}(x) = ${produit}$. Combien de COLONNES de signes son tableau doit-il avoir ?`,
        format: "qcm",
        choices: makeChoices(correct, [`${nb}`, `${nb + 2}`, "2"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque valeur qui annule un facteur coupe la droite des réels en deux morceaux.",
          "On compte les valeurs qui annulent, puis on ajoute un.",
          `Il y a ${nb} valeur${nb > 1 ? "s" : ""} qui annule${nb > 1 ? "nt" : ""} : ${racines.join(", ")}. Elles découpent ${nb + 1} intervalles.`,
          `Le tableau a donc ${nb + 1} colonnes de signes — une de plus que le nombre de racines.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_signes_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_produit",
    difficulty: 4,
    theme: "neutral",
    hint: "Le zéro d'un facteur se pose SUR la valeur qui l'annule, pas ailleurs.",
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "placement", "canvas", "template", "qcm"],
    generate: () => {
      const a = randomInt(-4, 1);
      const b = a + randomInt(2, 4);
      const nom = nomFonction();
      const correct = `sous $${b}$, dans la ligne de $x - ${b}$`;
      return {
        text: `Ce tableau est celui de $${nom}(x) = (x ${a < 0 ? "+" : "-"} ${Math.abs(a)})(x - ${b})$, mais un zéro manque. Où faut-il le placer ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `sous $${a}$, dans la ligne de $x - ${b}$`,
          `sous $${b}$, dans la ligne de $x ${a < 0 ? "+" : "-"} ${Math.abs(a)}$`,
          "dans la dernière colonne, tout à droite",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: tableauSignes(
          ["$-\\infty$", `$${a}$`, `$${b}$`, "$+\\infty$"],
          [
            { label: `$x ${a < 0 ? "+" : "-"} ${Math.abs(a)}$`, signes: ["-", "+", "+"], marques: ["0", ""] },
            { label: `$x - ${b}$`, signes: ["-", "-", "+"], marques: ["", ""] },
          ],
          "Un zéro manque",
        ),
        explanation: exp(
          "Un zéro se place SUR la valeur qui annule le facteur de sa ligne, et nulle part ailleurs.",
          `On cherche quand $x - ${b}$ vaut zéro, puis on descend dans SA ligne.`,
          `$x - ${b} = 0$ donne $x = ${b}$ : le zéro va sous $${b}$, dans la ligne de $x - ${b}$.`,
          `Chaque ligne a exactement UN zéro, et il tombe sous sa propre racine — celui de l'autre facteur est déjà sous $${a}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_signes_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_quotient",
    difficulty: 5,
    theme: "neutral",
    hint: "Une valeur qui annule le DÉNOMINATEUR est interdite : elle ne se marque pas comme les autres.",
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "quotient", "canvas", "template", "qcm"],
    generate: () => {
      const a = randomInt(-3, 1);
      const b = a + randomInt(2, 4);
      const nom = nomFonction();
      const correct = `sous $${b}$, car $${b}$ est une valeur INTERDITE`;
      return {
        text: `Ce tableau est celui de $${nom}(x) = \\dfrac{x ${a < 0 ? "+" : "-"} ${Math.abs(a)}}{x - ${b}}$. Où faut-il placer la DOUBLE BARRE, sur la ligne du bas ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `sous $${a}$, car $${a}$ annule le numérateur`,
          "nulle part : un quotient n'a pas de double barre",
          `sous $${a}$ ET sous $${b}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: tableauSignes(
          ["$-\\infty$", `$${a}$`, `$${b}$`, "$+\\infty$"],
          [
            { label: `$x ${a < 0 ? "+" : "-"} ${Math.abs(a)}$`, signes: ["-", "+", "+"], marques: ["0", ""] },
            { label: `$x - ${b}$`, signes: ["-", "-", "+"], marques: ["", "0"] },
            { label: `$\\dfrac{x ${a < 0 ? "+" : "-"} ${Math.abs(a)}}{x - ${b}}$`, signes: ["+", "-", "+"], marques: ["0", ""] },
          ],
          "Où va la double barre ?",
        ),
        explanation: exp(
          "La double barre marque une valeur INTERDITE : celle qui annule le dénominateur.",
          "On cherche donc ce qui annule le bas de la fraction, et non le haut.",
          `$x - ${b} = 0$ donne $x = ${b}$ : en ce point le quotient n'existe pas.`,
          `La double barre va sous $${b}$. Sous $${a}$ on écrit un zéro, car le numérateur s'annule mais le quotient existe — écrire un zéro sous $${b}$ reviendrait à diviser par zéro.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_signes_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_inequation",
    difficulty: 4,
    theme: "neutral",
    hint: "Lis la DERNIÈRE ligne, et garde les colonnes où elle est positive.",
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "inequation", "canvas", "template", "qcm"],
    generate: () => {
      const a = randomInt(-4, 0);
      const b = a + randomInt(2, 4);
      const nom = nomFonction();
      const correct = `$]-\\infty\\,;\\,${a}[ \\cup ]${b}\\,;\\,+\\infty[$`;
      return {
        text: `D'après ce tableau, quelles sont les solutions de $${nom}(x) > 0$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$]${a}\\,;\\,${b}[$`,
          `$]-\\infty\\,;\\,${a}]$`,
          `$[${a}\\,;\\,${b}]$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: tableauSignes(
          ["$-\\infty$", `$${a}$`, `$${b}$`, "$+\\infty$"],
          [
            { label: `$x ${a < 0 ? "+" : "-"} ${Math.abs(a)}$`, signes: ["-", "+", "+"], marques: ["0", ""] },
            { label: `$x - ${b}$`, signes: ["-", "-", "+"], marques: ["", "0"] },
            { label: `$${nom}(x)$`, signes: ["+", "-", "+"], marques: ["0", "0"] },
          ],
        ),
        explanation: exp(
          "Résoudre une inéquation avec un tableau, c'est LIRE la dernière ligne.",
          "On repère les colonnes où le signe cherché apparaît, puis on écrit les intervalles correspondants.",
          `$${nom}(x)$ est positive avant $${a}$ et après $${b}$.`,
          `Les solutions sont $]-\\infty\\,;\\,${a}[ \\cup ]${b}\\,;\\,+\\infty[$ — bornes EXCLUES, car l'inégalité est stricte.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_signes_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_premier_degre",
    difficulty: 5,
    theme: "neutral",
    hint: "Attention au coefficient NÉGATIF devant le $x$ : il retourne le sens.",
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "piege", "canvas", "template", "qcm"],
    generate: () => {
      const b = randomInt(2, 6);
      const nom = nomFonction();
      const correct = "positif avant, négatif après";
      return {
        text: `Dans ce tableau, quel est le signe de $-x + ${b}$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "négatif avant, positif après",
          "positif partout",
          "négatif partout",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: tableauSignes(
          ["$-\\infty$", `$${b}$`, "$+\\infty$"],
          [{ label: `$-x + ${b}$`, signes: ["+", "-"], marques: ["0"] }],
          `Signe de $-x + ${b}$`,
        ),
        explanation: exp(
          "Le sens du signe dépend du COEFFICIENT devant le $x$, pas de la constante.",
          `On annule : $-x + ${b} = 0$ donne $x = ${b}$. Puis on teste une valeur de chaque côté.`,
          `En $x = 0$ : $-0 + ${b} = ${b}$, positif. En $x = ${b + 2}$ : $-${b + 2} + ${b} = -2$, négatif.`,
          `Le coefficient étant NÉGATIF, l'ordre est inversé : positif avant $${b}$, négatif après — l'erreur la plus fréquente est de recopier le schéma de $x - a$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_fct_signes_tpl_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_produit",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare la ligne du bas au produit des deux lignes du dessus, colonne par colonne.",
    tags: ["seconde", "maths", "fonctions", "tableau_signes", "erreur", "canvas", "template", "qcm"],
    generate: () => {
      const a = randomInt(-4, 0);
      const b = a + randomInt(2, 4);
      const nom = nomFonction();
      const correct = "la colonne du milieu : moins par plus donne moins";
      return {
        text: `Ce tableau contient UNE erreur dans la ligne de $${nom}(x)$. Laquelle ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "la première colonne : moins par moins donne moins",
          "la dernière colonne : plus par plus donne moins",
          "il n'y a pas d'erreur",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: tableauSignes(
          ["$-\\infty$", `$${a}$`, `$${b}$`, "$+\\infty$"],
          [
            { label: `$x ${a < 0 ? "+" : "-"} ${Math.abs(a)}$`, signes: ["-", "+", "+"], marques: ["0", ""] },
            { label: `$x - ${b}$`, signes: ["-", "-", "+"], marques: ["", "0"] },
            { label: `$${nom}(x)$`, signes: ["+", "+", "+"], marques: ["0", "0"] },
          ],
          "Trouve l'erreur",
        ),
        explanation: exp(
          "La dernière ligne est le PRODUIT des lignes du dessus, case par case.",
          "On multiplie les signes colonne par colonne et on compare à ce qui est écrit.",
          `Colonne du milieu : $+$ pour $x ${a < 0 ? "+" : "-"} ${Math.abs(a)}$ et $-$ pour $x - ${b}$, donc le produit vaut $-$ — or le tableau annonce $+$.`,
          "L'erreur est dans la colonne du milieu. Un contrôle rapide : un produit de deux facteurs change de signe à CHAQUE racine simple, il ne peut pas rester positif partout."
        ),
      };
    },
  },


  // ============================================================
  // signes_premier_degre — le signe de ax + b
  // ============================================================

  {
    kind: "fixed",
    id: "seconde_sgn_deg1_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_premier_degre",
    difficulty: 1,
    theme: "neutral",
    text: "Pour étudier le signe de $ax + b$, par quoi commence-t-on ?",
    format: "qcm",
    choices: [
      "on cherche la valeur qui l'annule",
      "on calcule son image en $0$",
      "on la factorise",
      "on trace sa courbe",
    ],
    expected: ["on cherche la valeur qui l'annule"],
    comparator: "mcq_exact",
    hint: "C'est cette valeur qui coupera la droite en deux.",
    explanation: exp(
      "Une expression du premier degré change de signe en un seul point : celui où elle s'annule.",
      "On résout donc $ax + b = 0$ avant toute chose.",
      "Cette racine découpe la droite des réels en deux morceaux.",
      "On cherche d'abord la valeur qui annule : c'est elle qui donne la colonne de séparation."
    ),
    tags: ["seconde", "maths", "signes", "premier-degre", "methode", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_sgn_deg1_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_premier_degre",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qui décide de l'ORDRE des signes de $ax + b$ — d'abord $-$ puis $+$, ou l'inverse ?",
    format: "qcm",
    choices: [
      "le signe de $a$",
      "le signe de $b$",
      "la valeur de la racine",
      "rien : c'est toujours $-$ puis $+$",
    ],
    expected: ["le signe de $a$"],
    comparator: "mcq_exact",
    hint: "Le coefficient devant le $x$ dit si la droite monte ou descend.",
    explanation: exp(
      "Le coefficient $a$ donne le sens de variation de la droite.",
      "On regarde uniquement son signe, sans calculer quoi que ce soit.",
      "Si $a > 0$ la droite monte : négative puis positive. Si $a < 0$ elle descend : positive puis négative.",
      "C'est le signe de $a$ qui décide — et recopier « $-$ puis $+$ » par habitude est l'erreur la plus fréquente."
    ),
    tags: ["seconde", "maths", "signes", "premier-degre", "piege", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_sgn_deg1_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_premier_degre",
    difficulty: 2,
    theme: "neutral",
    hint: "Résous $ax + b = 0$.",
    tags: ["seconde", "maths", "signes", "premier-degre", "template", "short"],
    generate: () => {
      const a = [2, 3, 4, 5][randomInt(0, 3)] * (Math.random() < 0.4 ? -1 : 1);
      const r = randomInt(-4, 4);
      const b = -a * r;
      return {
        text: `En quelle valeur l'expression $${a}x ${b < 0 ? "-" : "+"} ${Math.abs(b)}$ s'annule-t-elle ?`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: exp(
          "Une expression du premier degré s'annule en une seule valeur.",
          `On résout $${a}x ${b < 0 ? "-" : "+"} ${Math.abs(b)} = 0$.`,
          `$${a}x = ${-b}$, donc $x = \\dfrac{${-b}}{${a}} = ${r}$.`,
          `Elle s'annule en $${r}$ : c'est là que le tableau se coupera.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_sgn_deg1_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_premier_degre",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde le signe du coefficient devant le $x$.",
    tags: ["seconde", "maths", "signes", "premier-degre", "canvas", "template", "qcm"],
    generate: () => {
      const positif = Math.random() < 0.5;
      const a = (positif ? 1 : -1) * randomInt(1, 4);
      const r = randomInt(-3, 4);
      const b = -a * r;
      const expr = `${a === 1 ? "" : a === -1 ? "-" : a}x ${b < 0 ? "-" : "+"} ${Math.abs(b)}`;
      const correct = positif ? "négatif avant, positif après" : "positif avant, négatif après";
      return {
        text: `Quel est le signe de $${expr}$ de part et d'autre de $${r}$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          positif ? "positif avant, négatif après" : "négatif avant, positif après",
          "positif partout",
          "négatif partout",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: tableauSignes(
          ["$-\\infty$", `$${r}$`, "$+\\infty$"],
          [{ label: `$${expr}$`, signes: positif ? ["-", "+"] : ["+", "-"], marques: ["0"] }],
        ),
        explanation: exp(
          "L'ordre des signes suit le signe du coefficient devant le $x$.",
          "On repère ce coefficient, puis on teste une valeur d'un côté pour confirmer.",
          `Ici le coefficient vaut $${a}$, il est ${positif ? "POSITIF" : "NÉGATIF"}.`,
          positif
            ? `L'expression est négative avant $${r}$, positive après — la droite monte.`
            : `L'expression est positive avant $${r}$, négative après — la droite descend.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_sgn_deg1_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_premier_degre",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace $x$ par la valeur proposée et regarde le résultat.",
    tags: ["seconde", "maths", "signes", "premier-degre", "template", "qcm"],
    generate: () => {
      const a = randomInt(1, 4);
      const r = randomInt(-3, 3);
      const b = -a * r;
      const x = r + (Math.random() < 0.5 ? -randomInt(1, 3) : randomInt(1, 3));
      const val = a * x + b;
      const correct = val > 0 ? "positif" : "négatif";
      return {
        text: `Pour $x = ${x}$, l'expression $${a}x ${b < 0 ? "-" : "+"} ${Math.abs(b)}$ est-elle positive ou négative ?`,
        format: "qcm",
        choices: ["positif", "négatif"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Tester une valeur est le contrôle le plus rapide d'une ligne de tableau.",
          "On remplace $x$ par la valeur donnée et on calcule.",
          `$${a} \\times ${x} ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${val}$.`,
          `Le résultat est ${correct}. Comme $${x}$ est ${x < r ? "AVANT" : "APRÈS"} la racine $${r}$, cela confirme la colonne correspondante.`
        ),
      };
    },
  },

  // ============================================================
  // signes_produit — dresser le tableau d'un produit
  // ============================================================

  {
    kind: "fixed",
    id: "seconde_sgn_prod_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_produit",
    difficulty: 2,
    theme: "neutral",
    text: "Dans quel ORDRE range-t-on les valeurs sur la première ligne d'un tableau de signes ?",
    format: "qcm",
    choices: [
      "dans l'ordre croissant, de $-\\infty$ à $+\\infty$",
      "dans l'ordre où les facteurs apparaissent",
      "dans l'ordre décroissant",
      "l'ordre n'a pas d'importance",
    ],
    expected: ["dans l'ordre croissant, de $-\\infty$ à $+\\infty$"],
    comparator: "mcq_exact",
    hint: "La première ligne est une droite graduée couchée.",
    explanation: exp(
      "La ligne du haut représente la droite des réels, parcourue de gauche à droite.",
      "On rassemble toutes les racines, puis on les range du plus petit au plus grand.",
      "Suivre l'ordre d'écriture des facteurs donnerait une droite dans le désordre.",
      "On range toujours dans l'ordre CROISSANT, entre $-\\infty$ et $+\\infty$."
    ),
    tags: ["seconde", "maths", "signes", "produit", "placement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_sgn_prod_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_produit",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de zéros une LIGNE de facteur porte-t-elle dans un tableau de signes ?",
    format: "qcm",
    choices: ["un seul, sous sa propre racine", "un par colonne", "autant que de facteurs", "aucun"],
    expected: ["un seul, sous sa propre racine"],
    comparator: "mcq_exact",
    hint: "Un facteur du premier degré ne s'annule qu'une fois.",
    explanation: exp(
      "Chaque ligne décrit UN facteur, et un facteur du premier degré s'annule en une seule valeur.",
      "On repère la racine de ce facteur, et on descend dans sa ligne.",
      "Les autres colonnes de cette ligne ne portent rien : le facteur y est simplement positif ou négatif.",
      "Une ligne porte donc un seul zéro — c'est la ligne du BAS qui en porte plusieurs, un par racine."
    ),
    tags: ["seconde", "maths", "signes", "produit", "placement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_sgn_prod_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_produit",
    difficulty: 4,
    theme: "neutral",
    hint: "Multiplie les deux signes de la colonne demandée.",
    tags: ["seconde", "maths", "signes", "produit", "canvas", "template", "qcm"],
    generate: () => {
      const a = randomInt(-4, 0);
      const b = a + randomInt(2, 4);
      const col = randomInt(0, 2);
      const s1: ("+" | "-")[] = ["-", "+", "+"];
      const s2: ("+" | "-")[] = ["-", "-", "+"];
      const attendu = s1[col] === s2[col] ? "+" : "-";
      const nom = nomFonction();
      const ou = ["la PREMIÈRE", "celle du MILIEU", "la DERNIÈRE"][col];
      return {
        text: `Dans ce tableau, quel signe faut-il écrire dans ${ou} colonne de la ligne de $${nom}(x)$ ?`,
        format: "qcm",
        choices: makeChoices(attendu === "+" ? "$+$" : "$-$", ["$-$", "$+$", "$0$"]),
        expected: [attendu === "+" ? "$+$" : "$-$"],
        comparator: "mcq_exact",
        canvas: tableauSignes(
          ["$-\\infty$", `$${a}$`, `$${b}$`, "$+\\infty$"],
          [
            { label: `$x ${a < 0 ? "+" : "-"} ${Math.abs(a)}$`, signes: s1, marques: ["0", ""] },
            { label: `$x - ${b}$`, signes: s2, marques: ["", "0"] },
          ],
          `Ligne de $${nom}(x)$ à compléter`,
        ),
        explanation: exp(
          "La ligne du bas est le produit des lignes du dessus, colonne par colonne.",
          "On lit les deux signes de la colonne demandée, puis on applique la règle des signes.",
          `Dans cette colonne : $${s1[col]}$ et $${s2[col]}$, donc le produit vaut $${attendu}$.`,
          `On écrit $${attendu}$. Deux signes identiques donnent $+$, deux signes différents donnent $-$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_sgn_prod_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_produit",
    difficulty: 4,
    theme: "neutral",
    hint: "Range les racines dans l'ordre croissant.",
    tags: ["seconde", "maths", "signes", "produit", "placement", "template", "qcm"],
    generate: () => {
      const r1 = randomInt(-5, 0);
      const r2 = r1 + randomInt(2, 5);
      // ⛔ Les facteurs sont ecrits dans le DESORDRE : c'est le piege.
      const correct = `$-\\infty$, $${r1}$, $${r2}$, $+\\infty$`;
      return {
        text: `Pour dresser le tableau de $(x - ${r2})(x ${r1 < 0 ? "+" : "-"} ${Math.abs(r1)})$, quelle est la première ligne ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$-\\infty$, $${r2}$, $${r1}$, $+\\infty$`,
          `$${r1}$, $${r2}$`,
          `$-\\infty$, $${r1}$, $+\\infty$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La première ligne range TOUTES les racines dans l'ordre croissant, entre les deux infinis.",
          "On cherche chaque racine, puis on les ordonne — sans se laisser guider par l'ordre d'écriture.",
          `Les facteurs s'annulent en $${r2}$ et en $${r1}$, et $${r1} < ${r2}$.`,
          `La ligne est donc $-\\infty$, $${r1}$, $${r2}$, $+\\infty$ — l'ordre du produit n'est PAS celui du tableau.`
        ),
      };
    },
  },

  // ============================================================
  // signes_quotient — le quotient et la valeur interdite
  // ============================================================

  {
    kind: "fixed",
    id: "seconde_sgn_quot_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_quotient",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le tableau d'un quotient, que marque-t-on sous la valeur qui annule le DÉNOMINATEUR ?",
    format: "qcm",
    choices: [
      "une double barre, car la valeur est interdite",
      "un zéro, comme pour le numérateur",
      "rien du tout",
      "le signe $+$",
    ],
    expected: ["une double barre, car la valeur est interdite"],
    comparator: "mcq_exact",
    hint: "En ce point, le quotient n'existe pas.",
    explanation: exp(
      "Une valeur qui annule le dénominateur ne fait pas partie du domaine : le quotient n'y existe pas.",
      "On distingue donc ce qui annule le haut de ce qui annule le bas.",
      "Sous la racine du numérateur, le quotient vaut zéro : on écrit $0$. Sous celle du dénominateur, il n'existe pas.",
      "On marque une DOUBLE BARRE — écrire un zéro reviendrait à affirmer qu'on peut diviser par zéro."
    ),
    tags: ["seconde", "maths", "signes", "quotient", "placement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_sgn_quot_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_quotient",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche ce qui annule le BAS de la fraction.",
    tags: ["seconde", "maths", "signes", "quotient", "template", "short"],
    generate: () => {
      const a = randomInt(-4, 2);
      const b = a + randomInt(2, 5);
      const nom = nomFonction();
      return {
        text: `Quelle est la valeur INTERDITE de $${nom}(x) = \\dfrac{x ${a < 0 ? "+" : "-"} ${Math.abs(a)}}{x - ${b}}$ ?`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation: exp(
          "Une valeur interdite est une valeur qui annule le dénominateur.",
          "On résout donc l'équation du BAS de la fraction, pas celle du haut.",
          `$x - ${b} = 0$ donne $x = ${b}$.`,
          `La valeur interdite est $${b}$ — c'est elle qui portera la double barre, tandis que $${a}$ portera un zéro.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_sgn_quot_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_quotient",
    difficulty: 5,
    theme: "neutral",
    hint: "Le signe d'un quotient suit la même règle que celui d'un produit.",
    tags: ["seconde", "maths", "signes", "quotient", "canvas", "template", "qcm"],
    generate: () => {
      const a = randomInt(-4, 0);
      const b = a + randomInt(2, 4);
      const nom = nomFonction();
      const correct = `$]${a}\\,;\\,${b}[$`;
      return {
        text: `D'après ce tableau, sur quel intervalle $${nom}(x)$ est-elle NÉGATIVE ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$]-\\infty\\,;\\,${a}[$`,
          `$]${b}\\,;\\,+\\infty[$`,
          `$[${a}\\,;\\,${b}]$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: tableauSignes(
          ["$-\\infty$", `$${a}$`, `$${b}$`, "$+\\infty$"],
          [
            { label: `$x ${a < 0 ? "+" : "-"} ${Math.abs(a)}$`, signes: ["-", "+", "+"], marques: ["0", ""] },
            { label: `$x - ${b}$`, signes: ["-", "-", "+"], marques: ["", "0"] },
            { label: `$${nom}(x)$`, signes: ["+", "-", "+"], marques: ["0", "||"] },
          ],
        ),
        explanation: exp(
          "Le signe d'un quotient se lit sur la dernière ligne, comme celui d'un produit.",
          "On repère les colonnes marquées $-$.",
          `Seule la colonne du milieu porte un $-$, entre $${a}$ et $${b}$.`,
          `Les solutions forment $]${a}\\,;\\,${b}[$ : $${a}$ est exclue car $${nom}$ y vaut zéro, et $${b}$ car elle est INTERDITE.`
        ),
      };
    },
  },

  // ============================================================
  // LA SECONDE APPROCHE : partir d'une COURBE
  // ============================================================
  // ⭐ On ne calcule rien : on regarde de quel cote de l'AXE DES ABSCISSES la
  // courbe se trouve. ⛔ Et « la courbe descend » n'est PAS « la courbe est
  // negative » — c'est la confusion que ces items visent.

  {
    kind: "fixed",
    id: "seconde_sgn_courbe_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_premier_degre",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un graphique, comment lit-on que $f(x)$ est POSITIVE ?",
    format: "qcm",
    choices: [
      "la courbe est au-dessus de l'axe des abscisses",
      "la courbe monte",
      "la courbe est à droite de l'axe des ordonnées",
      "la courbe est au-dessus de l'axe des ordonnées",
    ],
    expected: ["la courbe est au-dessus de l'axe des abscisses"],
    comparator: "mcq_exact",
    hint: "Le signe de $f(x)$, c'est le signe d'une ORDONNÉE.",
    explanation: exp(
      "Le signe de $f(x)$ est le signe de l'ordonnée du point de la courbe.",
      "On compare donc la hauteur de la courbe à celle de l'axe des abscisses.",
      "Au-dessus de cet axe, l'ordonnée est positive ; en dessous, elle est négative.",
      "⚠️ « La courbe monte » décrit les VARIATIONS, pas le signe : une courbe peut monter tout en restant négative."
    ),
    tags: ["seconde", "maths", "signes", "graphique", "piege", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_sgn_courbe_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_produit",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une courbe, qu'est-ce qui donne les valeurs de la PREMIÈRE ligne du tableau de signes ?",
    format: "qcm",
    choices: [
      "les abscisses où la courbe coupe l'axe des abscisses",
      "les ordonnées des points les plus hauts",
      "les abscisses des extremums",
      "les points où la courbe change de sens",
    ],
    expected: ["les abscisses où la courbe coupe l'axe des abscisses"],
    comparator: "mcq_exact",
    hint: "Le signe ne peut changer qu'en traversant l'axe.",
    explanation: exp(
      "Une fonction ne change de signe qu'en passant par zéro, donc en traversant l'axe des abscisses.",
      "On repère les points d'intersection avec cet axe et on note leurs abscisses.",
      "Ce sont ces abscisses qui découpent la droite en intervalles.",
      "⚠️ Les extremums sont des points de VARIATION : un sommet ne fait pas changer le signe s'il ne touche pas l'axe."
    ),
    tags: ["seconde", "maths", "signes", "graphique", "placement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_sgn_courbe_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_premier_degre",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde de quel côté de l'axe horizontal la droite se trouve.",
    tags: ["seconde", "maths", "signes", "graphique", "canvas", "template", "qcm"],
    generate: () => {
      const monte = Math.random() < 0.5;
      const a = (monte ? 1 : -1) * randomInt(1, 2);
      const r = randomInt(-3, 3);
      const b = -a * r;
      const nom = nomFonction();
      const correct = monte ? `$]${r}\\,;\\,+\\infty[$` : `$]-\\infty\\,;\\,${r}[$`;
      return {
        text: `D'après cette courbe, sur quel intervalle $${nom}(x) > 0$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          monte ? `$]-\\infty\\,;\\,${r}[$` : `$]${r}\\,;\\,+\\infty[$`,
          "$\\mathbb{R}$",
          `$]-\\infty\\,;\\,${r}]$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: courbe("affine", a, b, undefined, [r]),
        explanation: exp(
          "$f(x) > 0$ se lit « la courbe est au-dessus de l'axe des abscisses ».",
          `On repère où la droite traverse l'axe — en $${r}$ — puis de quel côté elle est au-dessus.`,
          monte
            ? `La droite monte : elle passe au-dessus APRÈS $${r}$.`
            : `La droite descend : elle est au-dessus AVANT $${r}$.`,
          `${correct}, borne exclue puisque la fonction y vaut zéro.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_sgn_courbe_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_produit",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les points où la parabole traverse l'axe des abscisses.",
    tags: ["seconde", "maths", "signes", "graphique", "canvas", "template", "qcm"],
    generate: () => {
      const r1 = randomInt(-4, -1);
      // ⚠️ L'ECART RESTE LIBRE, pair ou impair (Frederic, 08/09/2026) : « on
      // peut parfois avoir des milieux de racines qui ne sont pas entiers,
      // mais parfois plus simple pour l'explication ». Le sommet d'une
      // parabole est au milieu de ses racines, donc un ecart impair le pose
      // sur un demi-entier — c'est legitime, et l'eleve doit le rencontrer.
      // ⭐ La preference pour l'entier vaut dans une FICHE, ou l'on explique ;
      // pas ici, ou l'on entraine et ou la variete compte.
      const r2 = r1 + randomInt(2, 4);
      const nom = nomFonction();
      // (x - r1)(x - r2) = x^2 - (r1+r2)x + r1 r2
      const correct = "3";
      return {
        text: `Combien de COLONNES de signes le tableau de $${nom}$ aura-t-il, d'après cette courbe ?`,
        format: "qcm",
        choices: makeChoices(correct, ["2", "4", "1"]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: courbe("quadratique", 1, -(r1 + r2), r1 * r2, [r1, r2]),
        explanation: exp(
          "Le nombre de colonnes vient du nombre de fois où la courbe traverse l'axe des abscisses.",
          "On compte les points d'intersection, puis on ajoute un.",
          `La parabole coupe l'axe en $${r1}$ et $${r2}$ : deux points, donc trois intervalles.`,
          "Le tableau aura 3 colonnes de signes — toujours une de plus que le nombre de racines."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_sgn_courbe_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_produit",
    difficulty: 4,
    theme: "neutral",
    hint: "Une parabole tournée vers le haut plonge sous l'axe ENTRE ses deux racines.",
    tags: ["seconde", "maths", "signes", "graphique", "canvas", "template", "qcm"],
    generate: () => {
      const r1 = randomInt(-4, -1);
      // ⚠️ L'ECART RESTE LIBRE, pair ou impair (Frederic, 08/09/2026) : « on
      // peut parfois avoir des milieux de racines qui ne sont pas entiers,
      // mais parfois plus simple pour l'explication ». Le sommet d'une
      // parabole est au milieu de ses racines, donc un ecart impair le pose
      // sur un demi-entier — c'est legitime, et l'eleve doit le rencontrer.
      // ⭐ La preference pour l'entier vaut dans une FICHE, ou l'on explique ;
      // pas ici, ou l'on entraine et ou la variete compte.
      const r2 = r1 + randomInt(2, 4);
      const nom = nomFonction();
      const correct = `$]${r1}\\,;\\,${r2}[$`;
      return {
        text: `D'après cette courbe, sur quel intervalle $${nom}(x) < 0$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$]-\\infty\\,;\\,${r1}[$`,
          `$]${r2}\\,;\\,+\\infty[$`,
          `$]-\\infty\\,;\\,${r1}[ \\cup ]${r2}\\,;\\,+\\infty[$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: courbe("quadratique", 1, -(r1 + r2), r1 * r2, [r1, r2]),
        explanation: exp(
          "$f(x) < 0$ se lit « la courbe est EN DESSOUS de l'axe des abscisses ».",
          "On repère les deux traversées, puis on regarde entre elles.",
          `La parabole, tournée vers le haut, plonge sous l'axe entre $${r1}$ et $${r2}$.`,
          `Les solutions sont $]${r1}\\,;\\,${r2}[$ — bornes exclues, la fonction y valant zéro.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_sgn_courbe_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_produit",
    difficulty: 5,
    theme: "neutral",
    hint: "Une parabole tournée vers le BAS est positive entre ses racines.",
    tags: ["seconde", "maths", "signes", "graphique", "canvas", "template", "qcm"],
    generate: () => {
      const r1 = randomInt(-4, -1);
      // ⚠️ L'ECART RESTE LIBRE, pair ou impair (Frederic, 08/09/2026) : « on
      // peut parfois avoir des milieux de racines qui ne sont pas entiers,
      // mais parfois plus simple pour l'explication ». Le sommet d'une
      // parabole est au milieu de ses racines, donc un ecart impair le pose
      // sur un demi-entier — c'est legitime, et l'eleve doit le rencontrer.
      // ⭐ La preference pour l'entier vaut dans une FICHE, ou l'on explique ;
      // pas ici, ou l'on entraine et ou la variete compte.
      const r2 = r1 + randomInt(2, 4);
      const nom = nomFonction();
      // -(x - r1)(x - r2)
      const correct = `$-$, $+$, $-$`;
      return {
        text: `Quelle est la ligne de signes de $${nom}$, d'après cette courbe ?`,
        format: "qcm",
        choices: makeChoices(correct, [`$+$, $-$, $+$`, `$-$, $-$, $+$`, `$+$, $+$, $+$`]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: courbe("quadratique", -1, r1 + r2, -r1 * r2, [r1, r2]),
        explanation: exp(
          "On lit le signe colonne par colonne, en regardant de quel côté de l'axe la courbe se trouve.",
          `On découpe en trois intervalles, séparés par $${r1}$ et $${r2}$.`,
          `Cette parabole est tournée vers le BAS : elle est sous l'axe avant $${r1}$, au-dessus entre les deux, sous l'axe après $${r2}$.`,
          "La ligne est donc $-$, $+$, $-$ — l'inverse d'une parabole tournée vers le haut."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_sgn_courbe_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_quotient",
    difficulty: 4,
    theme: "neutral",
    hint: "Une valeur interdite ne se voit pas comme une racine : la courbe n'y passe pas.",
    tags: ["seconde", "maths", "signes", "quotient", "graphique", "template", "qcm"],
    generate: () => {
      const b = randomInt(-3, 3);
      const nom = nomFonction();
      const correct = "la courbe est coupée en deux morceaux à cet endroit";
      return {
        text: `Sur le graphique d'un quotient, à quoi reconnaît-on une VALEUR INTERDITE ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "la courbe traverse l'axe des abscisses",
          "la courbe atteint son minimum",
          "la courbe change de sens de variation",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une valeur interdite n'appartient pas au domaine : la fonction n'y a aucune image.",
          "On cherche donc un endroit où la courbe s'INTERROMPT, et non où elle touche un axe.",
          `En $x = ${b}$, par exemple, la courbe part vers l'infini d'un côté et revient de l'autre : elle est coupée en deux branches.`,
          "C'est cette coupure qui se traduit par une double barre dans le tableau — traverser l'axe, au contraire, donne un zéro."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_sgn_courbe_tpl_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_quotient",
    difficulty: 5,
    theme: "neutral",
    hint: "Une courbe peut monter tout en restant en dessous de l'axe.",
    tags: ["seconde", "maths", "signes", "graphique", "piege", "canvas", "template", "qcm"],
    generate: () => {
      const r = randomInt(1, 3);
      const nom = nomFonction();
      const correct = "non : elle monte, mais elle reste négative jusqu'en " + r;
      return {
        text: `Cette droite monte sur tout $\\mathbb{R}$. Peut-on en conclure que $${nom}(x) > 0$ partout ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "oui : une fonction croissante est positive",
          "oui, sauf en un point",
          "on ne peut pas le savoir sans calcul",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: courbe("affine", 1, -r, undefined, [r]),
        explanation: exp(
          "Le SIGNE et les VARIATIONS sont deux lectures différentes du même graphique.",
          "On regarde d'abord le sens de la courbe, puis, séparément, sa position par rapport à l'axe.",
          `Cette droite monte partout, et pourtant elle reste SOUS l'axe tant que $x < ${r}$.`,
          `Elle n'est positive qu'après $${r}$. Croissante ne veut pas dire positive — c'est la confusion la plus tenace du chapitre.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_sgn_courbe_tpl_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_quotient",
    difficulty: 4,
    theme: "neutral",
    hint: "Sous la valeur interdite, on ne met jamais de zéro.",
    tags: ["seconde", "maths", "signes", "quotient", "placement", "canvas", "template", "qcm"],
    generate: () => {
      const a = randomInt(-3, 0);
      const b = a + randomInt(2, 4);
      const nom = nomFonction();
      const correct = `un $0$ sous $${a}$, une double barre sous $${b}$`;
      return {
        text: `Pour $${nom}(x) = \\dfrac{x ${a < 0 ? "+" : "-"} ${Math.abs(a)}}{x - ${b}}$, que porte la ligne du bas sous chaque valeur ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `une double barre sous $${a}$, un $0$ sous $${b}$`,
          `un $0$ sous $${a}$ et un $0$ sous $${b}$`,
          `une double barre sous $${a}$ et sous $${b}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: tableauSignes(
          ["$-\\infty$", `$${a}$`, `$${b}$`, "$+\\infty$"],
          [
            { label: `$x ${a < 0 ? "+" : "-"} ${Math.abs(a)}$`, signes: ["-", "+", "+"], marques: ["0", ""] },
            { label: `$x - ${b}$`, signes: ["-", "-", "+"], marques: ["", "0"] },
            { label: `$${nom}(x)$`, signes: ["+", "-", "+"], marques: ["0", "||"] },
          ],
        ),
        explanation: exp(
          "Le numérateur donne un zéro, le dénominateur une valeur interdite.",
          "On identifie ce que chaque racine annule, puis on marque en conséquence.",
          `$${a}$ annule le NUMÉRATEUR : le quotient y vaut zéro. $${b}$ annule le DÉNOMINATEUR : le quotient n'y existe pas.`,
          `Un $0$ sous $${a}$, une double barre sous $${b}$ — les intervertir reviendrait à diviser par zéro.`
        ),
      };
    },
  },

  // ============================================================
  // signes_resoudre_equation — lire les RACINES
  // ============================================================

  {
    kind: "fixed",
    id: "seconde_sgn_eq_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_equation",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un tableau de signes, où lit-on les solutions de $f(x) = 0$ ?",
    format: "qcm",
    choices: [
      "sous les $0$ de la dernière ligne",
      "dans les colonnes marquées $+$",
      "sous les doubles barres",
      "aux deux extrémités du tableau",
    ],
    expected: ["sous les $0$ de la dernière ligne"],
    comparator: "mcq_exact",
    hint: "Une solution de $f(x) = 0$ est une valeur où $f$ VAUT zéro.",
    explanation: exp(
      "Résoudre $f(x) = 0$, c'est chercher les valeurs où la fonction s'annule.",
      "On lit la dernière ligne du tableau et on repère les zéros.",
      "Chaque $0$ de cette ligne se trouve sous une valeur : cette valeur est une solution.",
      "⚠️ Une double barre n'est PAS un zéro : sous elle, la fonction n'existe pas — ce n'est donc jamais une solution."
    ),
    tags: ["seconde", "maths", "signes", "equation", "tableau", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_sgn_eq_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_equation",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère les $0$ de la dernière ligne.",
    tags: ["seconde", "maths", "signes", "equation", "tableau", "canvas", "template", "qcm"],
    generate: () => {
      const a = randomInt(-4, 0);
      const b = a + randomInt(2, 4);
      const nom = nomFonction();
      const correct = `$${a}$ et $${b}$`;
      return {
        text: `D'après ce tableau, quelles sont les solutions de $${nom}(x) = 0$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$${a}$ seulement`,
          `$${b}$ seulement`,
          "il n'y en a aucune",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: tableauSignes(
          ["$-\\infty$", `$${a}$`, `$${b}$`, "$+\\infty$"],
          [
            { label: `$x ${a < 0 ? "+" : "-"} ${Math.abs(a)}$`, signes: ["-", "+", "+"], marques: ["0", ""] },
            { label: `$x - ${b}$`, signes: ["-", "-", "+"], marques: ["", "0"] },
            { label: `$${nom}(x)$`, signes: ["+", "-", "+"], marques: ["0", "0"] },
          ],
        ),
        explanation: exp(
          "Les solutions de $f(x) = 0$ sont les valeurs sous lesquelles la dernière ligne porte un zéro.",
          "On parcourt la ligne du bas et on note chaque zéro.",
          `Il y en a deux : sous $${a}$ et sous $${b}$.`,
          `Les solutions sont $${a}$ et $${b}$ — un produit s'annule dès qu'un seul de ses facteurs s'annule.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_sgn_eq_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_equation",
    difficulty: 5,
    theme: "neutral",
    hint: "Une valeur où la fonction N'EXISTE PAS ne peut pas être solution.",
    tags: ["seconde", "maths", "signes", "equation", "quotient", "piege", "canvas", "template", "qcm"],
    generate: () => {
      const a = randomInt(-4, 0);
      const b = a + randomInt(2, 4);
      const nom = nomFonction();
      const correct = `$${a}$ seulement`;
      return {
        text: `D'après ce tableau, quelles sont les solutions de $${nom}(x) = 0$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$${a}$ et $${b}$`,
          `$${b}$ seulement`,
          "il n'y en a aucune",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: tableauSignes(
          ["$-\\infty$", `$${a}$`, `$${b}$`, "$+\\infty$"],
          [
            { label: `$x ${a < 0 ? "+" : "-"} ${Math.abs(a)}$`, signes: ["-", "+", "+"], marques: ["0", ""] },
            { label: `$x - ${b}$`, signes: ["-", "-", "+"], marques: ["", "0"] },
            { label: `$${nom}(x)$`, signes: ["+", "-", "+"], marques: ["0", "||"] },
          ],
          "Un quotient",
        ),
        explanation: exp(
          "Seul un ZÉRO de la dernière ligne donne une solution ; une double barre n'en donne aucune.",
          "On distingue donc les deux marques avant de conclure.",
          `Sous $${a}$ il y a un zéro : le quotient s'annule. Sous $${b}$ il y a une double barre : le quotient N'EXISTE PAS.`,
          `La seule solution est $${a}$. Répondre « $${a}$ et $${b}$ » revient à accepter une division par zéro.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_sgn_eq_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_equation",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche où la courbe touche l'axe des abscisses.",
    tags: ["seconde", "maths", "signes", "equation", "graphique", "canvas", "template", "qcm"],
    generate: () => {
      const r1 = randomInt(-4, -1);
      // ⚠️ L'ECART RESTE LIBRE, pair ou impair (Frederic, 08/09/2026) : « on
      // peut parfois avoir des milieux de racines qui ne sont pas entiers,
      // mais parfois plus simple pour l'explication ». Le sommet d'une
      // parabole est au milieu de ses racines, donc un ecart impair le pose
      // sur un demi-entier — c'est legitime, et l'eleve doit le rencontrer.
      // ⭐ La preference pour l'entier vaut dans une FICHE, ou l'on explique ;
      // pas ici, ou l'on entraine et ou la variete compte.
      const r2 = r1 + randomInt(2, 4);
      const nom = nomFonction();
      const correct = `$${r1}$ et $${r2}$`;
      return {
        text: `D'après cette courbe, quelles sont les solutions de $${nom}(x) = 0$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$0$ seulement`,
          `$${r1}$ seulement`,
          "il n'y en a aucune",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: courbe("quadratique", 1, -(r1 + r2), r1 * r2, [r1, r2]),
        explanation: exp(
          "Résoudre $f(x) = 0$ graphiquement, c'est chercher où la courbe rencontre l'axe des abscisses.",
          "On repère les points d'intersection, puis on lit leurs ABSCISSES.",
          `La parabole coupe l'axe en deux points, d'abscisses $${r1}$ et $${r2}$.`,
          `Les solutions sont $${r1}$ et $${r2}$ — on lit une abscisse, jamais une ordonnée.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_sgn_eq_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_equation",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les traversées de l'axe des abscisses.",
    tags: ["seconde", "maths", "signes", "equation", "graphique", "canvas", "template", "qcm"],
    generate: () => {
      const decale = Math.random() < 0.5;
      const r = randomInt(-3, 3);
      const nom = nomFonction();
      // Vers le haut, sommet au-dessus de l'axe : aucune solution.
      const correct = decale ? "aucune" : "deux";
      return {
        text: `Combien l'équation $${nom}(x) = 0$ a-t-elle de solutions, d'après cette courbe ?`,
        format: "qcm",
        choices: makeChoices(correct, ["une", "deux", "aucune", "trois"]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: decale
          ? courbe("quadratique", 1, -2 * r, r * r + 2)
          : courbe("quadratique", 1, -2 * r, r * r - 4, [r - 2, r + 2]),
        explanation: exp(
          "Le nombre de solutions de $f(x) = 0$ est le nombre de fois où la courbe rencontre l'axe des abscisses.",
          "On compte les points de contact avec cet axe.",
          decale
            ? "Cette parabole reste entièrement AU-DESSUS de l'axe : elle ne le touche jamais."
            : "Cette parabole traverse l'axe en deux points.",
          decale
            ? "L'équation n'a AUCUNE solution — et pourtant la fonction existe partout."
            : "L'équation a DEUX solutions."
        ),
      };
    },
  },

  // ============================================================
  // signes_resoudre_inequation — choisir des INTERVALLES
  // ============================================================

  {
    kind: "fixed",
    id: "seconde_sgn_ineq_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_inequation",
    difficulty: 3,
    theme: "neutral",
    text: "Quand une borne est-elle INCLUSE dans les solutions d'une inéquation ?",
    format: "qcm",
    choices: [
      "quand l'inégalité est large ($\\leqslant$ ou $\\geqslant$) et que la fonction existe en ce point",
      "toujours",
      "jamais",
      "quand l'inégalité est stricte",
    ],
    expected: [
      "quand l'inégalité est large ($\\leqslant$ ou $\\geqslant$) et que la fonction existe en ce point",
    ],
    comparator: "mcq_exact",
    hint: "Deux conditions, et la seconde est souvent oubliée.",
    explanation: exp(
      "Une inégalité large accepte l'égalité, donc les points où la fonction vaut zéro.",
      "On regarde d'abord le symbole, puis on vérifie que la fonction EXISTE en ce point.",
      "Une inégalité stricte exclut toujours les bornes ; une large les inclut, à une exception près.",
      "⛔ L'exception : une VALEUR INTERDITE reste exclue même avec $\\leqslant$ — la fonction n'y existe pas, elle ne peut donc rien vérifier."
    ),
    tags: ["seconde", "maths", "signes", "inequation", "piege", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_sgn_ineq_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_inequation",
    difficulty: 4,
    theme: "neutral",
    hint: "Inégalité LARGE : les zéros font partie des solutions.",
    tags: ["seconde", "maths", "signes", "inequation", "tableau", "canvas", "template", "qcm"],
    generate: () => {
      const a = randomInt(-4, 0);
      const b = a + randomInt(2, 4);
      const nom = nomFonction();
      const correct = `$[${a}\\,;\\,${b}]$`;
      return {
        text: `D'après ce tableau, quelles sont les solutions de $${nom}(x) \\leqslant 0$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$]${a}\\,;\\,${b}[$`,
          `$]-\\infty\\,;\\,${a}] \\cup [${b}\\,;\\,+\\infty[$`,
          `$[${a}\\,;\\,${b}[$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: tableauSignes(
          ["$-\\infty$", `$${a}$`, `$${b}$`, "$+\\infty$"],
          [
            { label: `$x ${a < 0 ? "+" : "-"} ${Math.abs(a)}$`, signes: ["-", "+", "+"], marques: ["0", ""] },
            { label: `$x - ${b}$`, signes: ["-", "-", "+"], marques: ["", "0"] },
            { label: `$${nom}(x)$`, signes: ["+", "-", "+"], marques: ["0", "0"] },
          ],
        ),
        explanation: exp(
          "Une inégalité large cherche les colonnes négatives ET les valeurs où la fonction s'annule.",
          "On repère la colonne marquée $-$, puis on décide du sort des bornes.",
          `La colonne du milieu porte un $-$, entre $${a}$ et $${b}$. Le symbole étant $\\leqslant$, les deux zéros conviennent aussi.`,
          `Les solutions sont $[${a}\\,;\\,${b}]$ — crochets FERMÉS, contrairement à une inégalité stricte.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_sgn_ineq_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_inequation",
    difficulty: 5,
    theme: "neutral",
    hint: "Même avec $\\geqslant$, une valeur interdite reste exclue.",
    tags: ["seconde", "maths", "signes", "inequation", "quotient", "piege", "canvas", "template", "qcm"],
    generate: () => {
      const a = randomInt(-4, 0);
      const b = a + randomInt(2, 4);
      const nom = nomFonction();
      const correct = `$]-\\infty\\,;\\,${a}] \\cup ]${b}\\,;\\,+\\infty[$`;
      return {
        text: `D'après ce tableau, quelles sont les solutions de $${nom}(x) \\geqslant 0$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$]-\\infty\\,;\\,${a}] \\cup [${b}\\,;\\,+\\infty[$`,
          `$]-\\infty\\,;\\,${a}[ \\cup ]${b}\\,;\\,+\\infty[$`,
          `$[${a}\\,;\\,${b}]$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: tableauSignes(
          ["$-\\infty$", `$${a}$`, `$${b}$`, "$+\\infty$"],
          [
            { label: `$x ${a < 0 ? "+" : "-"} ${Math.abs(a)}$`, signes: ["-", "+", "+"], marques: ["0", ""] },
            { label: `$x - ${b}$`, signes: ["-", "-", "+"], marques: ["", "0"] },
            { label: `$${nom}(x)$`, signes: ["+", "-", "+"], marques: ["0", "||"] },
          ],
          "Un quotient",
        ),
        explanation: exp(
          "Une inégalité large inclut les zéros, mais JAMAIS une valeur interdite.",
          "On prend les colonnes $+$, puis on traite chaque borne selon sa marque.",
          `Sous $${a}$ il y a un zéro : avec $\\geqslant$, il est inclus. Sous $${b}$ il y a une double barre : la fonction n'existe pas, la borne est EXCLUE.`,
          `Les solutions sont $]-\\infty\\,;\\,${a}] \\cup ]${b}\\,;\\,+\\infty[$ — un crochet fermé d'un côté, ouvert de l'autre.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_sgn_ineq_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_inequation",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche où la courbe est AU-DESSUS de l'axe.",
    tags: ["seconde", "maths", "signes", "inequation", "graphique", "canvas", "template", "qcm"],
    generate: () => {
      const r1 = randomInt(-4, -1);
      // ⚠️ L'ECART RESTE LIBRE, pair ou impair (Frederic, 08/09/2026) : « on
      // peut parfois avoir des milieux de racines qui ne sont pas entiers,
      // mais parfois plus simple pour l'explication ». Le sommet d'une
      // parabole est au milieu de ses racines, donc un ecart impair le pose
      // sur un demi-entier — c'est legitime, et l'eleve doit le rencontrer.
      // ⭐ La preference pour l'entier vaut dans une FICHE, ou l'on explique ;
      // pas ici, ou l'on entraine et ou la variete compte.
      const r2 = r1 + randomInt(2, 4);
      const nom = nomFonction();
      const correct = `$]-\\infty\\,;\\,${r1}[ \\cup ]${r2}\\,;\\,+\\infty[$`;
      return {
        text: `D'après cette courbe, quelles sont les solutions de $${nom}(x) > 0$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$]${r1}\\,;\\,${r2}[$`,
          `$[${r1}\\,;\\,${r2}]$`,
          `$]-\\infty\\,;\\,${r1}] \\cup [${r2}\\,;\\,+\\infty[$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: courbe("quadratique", 1, -(r1 + r2), r1 * r2, [r1, r2]),
        explanation: exp(
          "$f(x) > 0$ se lit « la courbe est strictement au-dessus de l'axe des abscisses ».",
          "On repère les deux traversées, puis les morceaux situés au-dessus.",
          `La parabole est au-dessus avant $${r1}$ et après $${r2}$ ; entre les deux, elle plonge en dessous.`,
          `Les solutions forment DEUX intervalles, $]-\\infty\\,;\\,${r1}[ \\cup ]${r2}\\,;\\,+\\infty[$, bornes exclues car l'inégalité est stricte.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_sgn_ineq_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_inequation",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche où la droite est EN DESSOUS de l'axe, bornes comprises.",
    tags: ["seconde", "maths", "signes", "inequation", "graphique", "canvas", "template", "qcm"],
    generate: () => {
      const r = randomInt(-3, 3);
      const nom = nomFonction();
      const correct = `$]-\\infty\\,;\\,${r}]$`;
      return {
        text: `D'après cette courbe, quelles sont les solutions de $${nom}(x) \\leqslant 0$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$]-\\infty\\,;\\,${r}[$`,
          `$[${r}\\,;\\,+\\infty[$`,
          `$]${r}\\,;\\,+\\infty[$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: courbe("affine", 1, -r, undefined, [r]),
        explanation: exp(
          "$f(x) \\leqslant 0$ se lit « la courbe est en dessous de l'axe, ou dessus ».",
          "On repère la traversée, puis on regarde de quel côté la droite est basse.",
          `La droite monte et coupe l'axe en $${r}$ : elle est donc en dessous AVANT $${r}$.`,
          `Les solutions sont $]-\\infty\\,;\\,${r}]$ — crochet FERMÉ en $${r}$, car l'inégalité est large et la fonction y vaut zéro.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_sgn_ineq_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_inequation",
    difficulty: 5,
    theme: "neutral",
    hint: "Trois facteurs : le signe change à chaque racine.",
    tags: ["seconde", "maths", "signes", "inequation", "tableau", "canvas", "template", "qcm"],
    generate: () => {
      const r1 = randomInt(-5, -3);
      const r2 = r1 + randomInt(2, 3);
      const r3 = r2 + randomInt(2, 3);
      const nom = nomFonction();
      const correct = `$]${r1}\\,;\\,${r2}[ \\cup ]${r3}\\,;\\,+\\infty[$`;
      return {
        text: `D'après ce tableau, quelles sont les solutions de $${nom}(x) > 0$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$]-\\infty\\,;\\,${r1}[ \\cup ]${r2}\\,;\\,${r3}[$`,
          `$]${r3}\\,;\\,+\\infty[$`,
          `$]${r1}\\,;\\,${r2}[$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: tableauSignes(
          ["$-\\infty$", `$${r1}$`, `$${r2}$`, `$${r3}$`, "$+\\infty$"],
          [
            { label: `$x + ${Math.abs(r1)}$`, signes: ["-", "+", "+", "+"], marques: ["0", "", ""] },
            { label: `$x ${r2 < 0 ? "+" : "-"} ${Math.abs(r2)}$`, signes: ["-", "-", "+", "+"], marques: ["", "0", ""] },
            { label: `$x - ${r3}$`, signes: ["-", "-", "-", "+"], marques: ["", "", "0"] },
            { label: `$${nom}(x)$`, signes: ["-", "+", "-", "+"], marques: ["0", "0", "0"] },
          ],
        ),
        explanation: exp(
          "Avec trois facteurs, la dernière ligne alterne : le signe change à chaque racine simple.",
          "On lit la ligne du bas et on retient toutes les colonnes marquées $+$.",
          `Deux colonnes sont positives : entre $${r1}$ et $${r2}$, puis après $${r3}$.`,
          `Les solutions sont $]${r1}\\,;\\,${r2}[ \\cup ]${r3}\\,;\\,+\\infty[$ — oublier le second morceau est l'erreur classique.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_sgn_ineq_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_inequation",
    difficulty: 4,
    theme: "neutral",
    text: "Les solutions d'une inéquation peuvent-elles former DEUX intervalles séparés ?",
    format: "qcm",
    choices: [
      "oui, dès que deux colonnes non voisines conviennent",
      "non, jamais",
      "seulement pour un quotient",
      "seulement avec trois facteurs",
    ],
    expected: ["oui, dès que deux colonnes non voisines conviennent"],
    comparator: "mcq_exact",
    hint: "Regarde une parabole tournée vers le haut : où est-elle positive ?",
    explanation: exp(
      "Les solutions rassemblent toutes les colonnes qui conviennent, voisines ou non.",
      "On lit la dernière ligne et on retient chaque colonne du bon signe.",
      "Un produit de deux facteurs est positif AVANT la première racine et APRÈS la seconde : deux morceaux séparés.",
      "On les réunit avec le symbole $\\cup$ — n'en garder qu'un est l'oubli le plus fréquent."
    ),
    tags: ["seconde", "maths", "signes", "inequation", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_sgn_ineq_tpl_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_resoudre_inequation",
    difficulty: 4,
    theme: "neutral",
    hint: "Une parabole tournée vers le bas est positive ENTRE ses racines.",
    tags: ["seconde", "maths", "signes", "inequation", "graphique", "canvas", "template", "qcm"],
    generate: () => {
      const r1 = randomInt(-4, -1);
      // ⚠️ L'ECART RESTE LIBRE, pair ou impair (Frederic, 08/09/2026) : « on
      // peut parfois avoir des milieux de racines qui ne sont pas entiers,
      // mais parfois plus simple pour l'explication ». Le sommet d'une
      // parabole est au milieu de ses racines, donc un ecart impair le pose
      // sur un demi-entier — c'est legitime, et l'eleve doit le rencontrer.
      // ⭐ La preference pour l'entier vaut dans une FICHE, ou l'on explique ;
      // pas ici, ou l'on entraine et ou la variete compte.
      const r2 = r1 + randomInt(2, 4);
      const nom = nomFonction();
      const correct = `$[${r1}\\,;\\,${r2}]$`;
      return {
        text: `D'après cette courbe, quelles sont les solutions de $${nom}(x) \\geqslant 0$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$]${r1}\\,;\\,${r2}[$`,
          `$]-\\infty\\,;\\,${r1}] \\cup [${r2}\\,;\\,+\\infty[$`,
          "$\\mathbb{R}$",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: courbe("quadratique", -1, r1 + r2, -r1 * r2, [r1, r2]),
        explanation: exp(
          "$f(x) \\geqslant 0$ se lit « la courbe est au-dessus de l'axe, ou dessus ».",
          "On repère les traversées, puis le morceau situé au-dessus.",
          `Cette parabole est tournée vers le BAS : elle passe au-dessus de l'axe entre $${r1}$ et $${r2}$.`,
          `Les solutions sont $[${r1}\\,;\\,${r2}]$ — UN seul intervalle, bornes incluses car l'inégalité est large.`
        ),
      };
    },
  },

  // ---- de quoi porter les deux micros de construction au seuil ----

  {
    kind: "template",
    id: "seconde_sgn_deg1_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_premier_degre",
    difficulty: 3,
    theme: "neutral",
    hint: "Mets d'abord l'expression sous la forme $ax + b$.",
    tags: ["seconde", "maths", "signes", "premier-degre", "template", "short"],
    generate: () => {
      const a = randomInt(2, 5);
      const r = randomInt(-3, 4);
      return {
        text: `En quelle valeur $${a}(x - ${r})$ s'annule-t-elle ?`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: exp(
          "Un produit est nul si et seulement si l'un de ses facteurs est nul.",
          `Le facteur $${a}$ n'est jamais nul : c'est donc $x - ${r}$ qui doit l'être.`,
          `$x - ${r} = 0$ donne $x = ${r}$.`,
          `Elle s'annule en $${r}$ — le coefficient $${a}$ ne déplace pas la racine, il ne fait qu'étirer.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_sgn_quot_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_quotient",
    difficulty: 3,
    theme: "neutral",
    text: "Le signe d'un quotient suit-il la même règle que celui d'un produit ?",
    format: "qcm",
    choices: [
      "oui : deux signes identiques donnent $+$, deux différents donnent $-$",
      "non : un quotient est toujours positif",
      "non : le signe du dénominateur ne compte pas",
      "non : il faut inverser le signe du dénominateur",
    ],
    expected: ["oui : deux signes identiques donnent $+$, deux différents donnent $-$"],
    comparator: "mcq_exact",
    hint: "Diviser par un négatif, c'est comme multiplier par un négatif.",
    explanation: exp(
      "La règle des signes est la même pour la multiplication et la division.",
      "On combine le signe du numérateur et celui du dénominateur, colonne par colonne.",
      "Deux signes identiques donnent $+$, deux signes différents donnent $-$.",
      "La seule différence avec un produit tient aux MARQUES : le dénominateur donne une double barre, pas un zéro."
    ),
    tags: ["seconde", "maths", "signes", "quotient", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_sgn_quot_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_quotient",
    difficulty: 4,
    theme: "neutral",
    hint: "Le domaine exclut ce qui annule le dénominateur.",
    tags: ["seconde", "maths", "signes", "quotient", "domaine", "template", "qcm"],
    generate: () => {
      const a = randomInt(-4, 1);
      const b = a + randomInt(2, 5);
      const nom = nomFonction();
      const correct = `$\\mathbb{R} \\setminus \\{${b}\\}$`;
      return {
        text: `Quel est le domaine de définition de $${nom}(x) = \\dfrac{x ${a < 0 ? "+" : "-"} ${Math.abs(a)}}{x - ${b}}$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$\\mathbb{R} \\setminus \\{${a}\\}$`,
          `$\\mathbb{R} \\setminus \\{${a}\\,;\\,${b}\\}$`,
          "$\\mathbb{R}$",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le domaine d'un quotient exclut les valeurs qui annulent le dénominateur.",
          "On résout l'équation du dénominateur, et on retire la solution trouvée.",
          `$x - ${b} = 0$ donne $x = ${b}$ : c'est la seule valeur à écarter.`,
          `Le domaine est $\\mathbb{R} \\setminus \\{${b}\\}$ — $${a}$ annule le numérateur, ce qui est parfaitement autorisé.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_sgn_quot_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "signes_expression_2de",
    microId: "signes_quotient",
    difficulty: 5,
    theme: "neutral",
    text: "Pour résoudre $\\dfrac{x - 1}{x - 4} > 0$, peut-on multiplier les deux membres par $x - 4$ ?",
    format: "qcm",
    choices: [
      "non : on ignore le signe de $x - 4$, qui peut retourner l'inégalité",
      "oui, c'est la méthode la plus rapide",
      "oui, à condition que $x$ soit positif",
      "non, mais on peut multiplier par $x - 1$",
    ],
    expected: ["non : on ignore le signe de $x - 4$, qui peut retourner l'inégalité"],
    comparator: "mcq_exact",
    hint: "Multiplier une inégalité par un nombre NÉGATIF en change le sens.",
    explanation: exp(
      "Multiplier une inégalité par un nombre change son sens si ce nombre est négatif.",
      "On se demande donc si $x - 4$ est positif ou négatif — et la réponse dépend de $x$.",
      "Or $x - 4$ est négatif quand $x < 4$ et positif quand $x > 4$ : on ne peut pas trancher d'avance.",
      "C'est exactement pour cela qu'on dresse un TABLEAU DE SIGNES : il traite les deux cas d'un seul coup, sans jamais multiplier."
    ),
    tags: ["seconde", "maths", "signes", "quotient", "piege", "qcm"],
  },
];
