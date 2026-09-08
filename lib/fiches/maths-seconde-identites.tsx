// ─── Fiche de cours : les identités remarquables (2de) ────────────────────────
//
// Cinquième fiche de seconde. Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/identites-remarquables.bank.ts
// (notion identites_remarquables_2de), et sur la 5e comme étalon.
//
// ⭐ PRIORITÉ DONNÉE PAR LE CONTRÔLE COMMUN de mars 2025 : sa question 2.4
// demande de factoriser $x^2 + 10x + 25$ et $9x^2 - 16$ — une identité dans
// chaque sens.
//
// ⭐ LES RACINES Y ONT LEUR PLACE (Frédéric, 08/09/2026) : « tu peux aussi
// $(2 + \sqrt{3})^2$ ». Le coach les traite déjà — dix items. Deux usages :
//   — le carré d'une somme fait APPARAÎTRE une racine : $(2+\sqrt{3})^2 = 7 + 4\sqrt{3}$ ;
//   — le produit conjugué la fait DISPARAÎTRE : $(2+\sqrt{3})(2-\sqrt{3}) = 1$.
// Le second est le plus utile : c'est ce qui permet de nettoyer un dénominateur.
//
// ⛔ LE PIÈGE CENTRAL : le DOUBLE PRODUIT. $(a+b)^2 \neq a^2 + b^2$ — il manque
// $2ab$, et c'est l'erreur la plus fréquente de tout le programme.
//
// Micro-compétences couvertes :
// - ir_carre_somme       → définition, propriété « Le carré d'une somme », exemple 1, exos 1-2
// - ir_carre_difference  → propriété « Le carré d'une différence », exos 3
// - ir_difference_carres → propriété « La différence de deux carrés », méthode 3, exemple 4, exos 4-5-6
// - ir_calcul_mental     → usages « Calculer de tête », exos 7
// - ir_application       → méthode, exemples 2-3, exos 8-9-10

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

/**
 * Un tableau — HTML, donc lisible partout, y compris dans `methode` et
 * `exemples` dont les blocs peuvent ne faire que 80 px.
 *
 * ⛔ Un canvas SVG y rendrait ses textes à 4 px : la règle est mesurée, pas
 * théorique.
 *
 * ⛔⛔ ET IL NE PREND QUE DU TEXTE NU, SANS UN SEUL DOLLAR. `TexteMath` ne le
 * traverse jamais : ses textes arrivent en DONNÉES de figure — `headers`,
 * `values`, `label`, `title` — et non en enfants. Écrire « $(a+b)^2$ » affichait
 * les dollars à l'élève : 80 d'un coup, mesurés au rendu. On écrit « (a+b)² » en
 * Unicode.
 *
 * ⚠️ Piège : `tableau_signes`, son voisin, fait l'INVERSE — il passe ses libellés
 * par `TexteMath` et attend donc du LaTeX. Deux canvas de tableau, deux règles
 * opposées.
 */
function tableau(
  headers: string[],
  rows: { label: string; values: (string | number)[] }[],
  title?: string,
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_donnees",
        title,
        headers,
        rows,
        display: { striped: true, compact: true },
      }}
    />
  );
}

export const ficheIdentitesSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "identites-remarquables-2de",
  titre: "Les identités remarquables",
  accroche:
    "Trois égalités, et tout un chapitre : elles se lisent de gauche à droite pour DÉVELOPPER, de droite à gauche pour FACTORISER. Savoir dans quel sens on va, c'est déjà la moitié du travail.",
  identite: [
    { label: "Mots clés", valeur: "Développer, factoriser, double produit, conjugué" },
    { label: "Le secret", valeur: "Le double produit $2ab$, qu'on oublie" },
    { label: "Outil", valeur: "Les trois identités, dans les deux sens" },
  ],

  definition: {
    texte:
      "Pour tous nombres $a$ et $b$ : $(a+b)^2 = a^2 + 2ab + b^2$, $(a-b)^2 = a^2 - 2ab + b^2$, et $(a-b)(a+b) = a^2 - b^2$. Ces égalités sont vraies TOUJOURS — pour des nombres, des lettres, et aussi pour des racines carrées.",
  },

  figure: {
    schema: tableau(
      ["", "(a+b)²", "(a−b)²", "(a−b)(a+b)"],
      [{ label: "égale", values: ["a² + 2ab + b²", "a² − 2ab + b²", "a² − b²"] }],
      "Les trois identités",
    ),
    legende:
      "Les deux premières ont TROIS termes, la troisième n'en a que deux — c'est elle qui fait disparaître le double produit.",
  },

  proprietes: [
    {
      titre: "Le carré d'une somme",
      texte:
        "$(a+b)^2 = a^2 + 2ab + b^2$. ⛔ Ce n'est PAS $a^2 + b^2$ : il manque le double produit $2ab$, et c'est l'erreur la plus fréquente du programme.",
      schema: tableau(
        ["", "(3+4)²", "3² + 4²"],
        [{ label: "vaut", values: ["49", "25"] }],
        "49 ≠ 25 : le double produit manque",
      ),
    },
    {
      titre: "Le carré d'une différence",
      texte:
        "$(a-b)^2 = a^2 - 2ab + b^2$. Seul le double produit change de signe : le terme $b^2$, lui, reste POSITIF — c'est un carré.",
      schema: tableau(
        ["", "a²", "−2ab", "+b²"],
        [{ label: "(x−5)²", values: ["x²", "−10x", "+25"] }],
      ),
    },
    {
      titre: "La différence de deux carrés",
      texte:
        "$(a-b)(a+b) = a^2 - b^2$. Le double produit s'annule de lui-même : c'est la seule identité dont le résultat n'a que deux termes.",
      schema: tableau(
        ["", "(x−3)(x+3)"],
        [{ label: "égale", values: ["x² − 9"] }],
        "Deux termes, pas trois",
      ),
    },
    {
      titre: "Avec des racines carrées",
      texte:
        "Elles marchent aussi sur les racines. Le carré d'une somme en fait APPARAÎTRE une ; le produit conjugué la fait DISPARAÎTRE — car $(\\sqrt{3})^2 = 3$.",
      schema: tableau(
        ["", "(2+√3)²", "(2+√3)(2−√3)"],
        [{ label: "égale", values: ["7 + 4√3", "1"] }],
        "Elle apparait / elle disparait",
      ),
    },
  ],

  reel: {
    texte:
      "Un jardin carré de $x$ mètres de côté est agrandi de $3$ m dans les deux directions. Sa nouvelle aire n'est pas $x^2 + 9$ : elle vaut $(x+3)^2 = x^2 + 6x + 9$. Les $6x$ oubliés sont les deux bandes ajoutées le long des côtés — le double produit a une surface bien réelle.",
  },

  historique: {
    texte:
      "Les Babyloniens résolvaient déjà des problèmes par « complétion du carré », mille ans avant notre ère — sans écriture algébrique, en raisonnant sur des aires. Al-Khwârizmî, au IXᵉ siècle, en fait une méthode générale ; les lettres $a$ et $b$, elles, n'arriveront qu'avec Viète, au XVIᵉ.",
  },

  methode: [
    {
      titre: "Je reconnais la forme",
      texte:
        "Deux termes entre parenthèses, le tout au carré ? C'est une des deux premières. Un produit de la forme somme × différence ? C'est la troisième.",
      schema: tableau(
        ["expression", "(x+7)²", "(x−7)²", "(x−7)(x+7)"],
        [{ label: "identité", values: ["1re", "2e", "3e"] }],
      ),
    },
    {
      titre: "J'identifie $a$ et $b$",
      texte:
        "$a$ est ce qui est au début, $b$ ce qui suit. Dans $(3x+2)^2$ : $a = 3x$ et $b = 2$ — attention, $a^2$ vaut alors $9x^2$, pas $3x^2$.",
      schema: tableau(
        ["", "a", "b", "a²", "2ab", "b²"],
        [{ label: "(3x+2)²", values: ["3x", "2", "9x²", "12x", "4"] }],
      ),
    },
    {
      titre: "Je choisis mon sens",
      texte:
        "Développer : je pars de la parenthèse. Factoriser : je pars de la somme et je reconnais les carrés. Le contrôle demande souvent le SECOND.",
      schema: tableau(
        ["", "développer", "factoriser"],
        [{ label: "x² − 16", values: ["—", "(x−4)(x+4)"] }],
      ),
    },
  ],

  usages: [
    {
      titre: "Factoriser",
      detail:
        "$x^2 + 10x + 25$ : je reconnais $x^2$, $5^2$, et $2 \\times x \\times 5$. C'est $(x+5)^2$.",
      schema: tableau(
        ["", "x² + 10x + 25", "9x² − 16"],
        [{ label: "factorisé", values: ["(x+5)²", "(3x−4)(3x+4)"] }],
        "Les deux du contrôle",
      ),
    },
    {
      titre: "Calculer de tête",
      detail:
        "$101^2 = (100+1)^2 = 10\\,000 + 200 + 1 = 10\\,201$. Et $99 \\times 101 = (100-1)(100+1) = 9\\,999$.",
      schema: tableau(
        ["", "101²", "99²", "99 × 101"],
        [{ label: "vaut", values: ["10 201", "9 801", "9 999"] }],
      ),
    },
    {
      titre: "Faire disparaître une racine",
      detail:
        "$(3+\\sqrt{2})(3-\\sqrt{2}) = 9 - 2 = 7$. Le produit conjugué transforme une écriture avec racine en un entier.",
      schema: tableau(
        ["", "(3+√2)(3−√2)", "(√5−1)(√5+1)"],
        [{ label: "vaut", values: [7, 4] }],
        "La racine s'en va",
      ),
    },
  ],

  exemples: [
    {
      titre: "Développer",
      donnees: "$(2x + 5)^2$.",
      question: "Développer et réduire.",
      schema: tableau(
        ["", "a²", "2ab", "b²"],
        [{ label: "vaut", values: ["4x²", "20x", "25"] }],
      ),
      solution:
        "Ici $a = 2x$ et $b = 5$. Donc $a^2 = 4x^2$ (et non $2x^2$), $2ab = 2 \\times 2x \\times 5 = 20x$, et $b^2 = 25$. Résultat : $4x^2 + 20x + 25$.",
    },
    {
      titre: "Avec une racine",
      donnees: "$(2 + \\sqrt{3})^2$.",
      question: "Développer.",
      schema: tableau(
        ["", "a²", "2ab", "b²"],
        [{ label: "vaut", values: ["4", "4√3", "3"] }],
      ),
      solution:
        "$a = 2$ et $b = \\sqrt{3}$. On a $a^2 = 4$, $2ab = 2 \\times 2 \\times \\sqrt{3} = 4\\sqrt{3}$, et $b^2 = (\\sqrt{3})^2 = 3$. Total : $4 + 4\\sqrt{3} + 3 = 7 + 4\\sqrt{3}$. ⭐ La racine RESTE, car le double produit en contient une.",
    },
    {
      titre: "Le produit conjugué",
      donnees: "$(2 + \\sqrt{3})(2 - \\sqrt{3})$.",
      question: "Calculer.",
      schema: tableau(
        ["", "a²", "b²", "a² − b²"],
        [{ label: "vaut", values: ["4", "3", "1"] }],
      ),
      solution:
        "C'est la troisième identité, avec $a = 2$ et $b = \\sqrt{3}$ : le résultat vaut $a^2 - b^2 = 4 - 3 = 1$. ⭐ Ici la racine DISPARAÎT, car il n'y a pas de double produit — c'est tout l'intérêt du conjugué.",
    },
    {
      titre: "La question du contrôle",
      donnees: "$9x^2 - 16$.",
      question: "Factoriser.",
      schema: tableau(
        ["", "9x²", "16"],
        [{ label: "est le carré de", values: ["3x", "4"] }],
      ),
      solution:
        "On reconnaît une différence de deux carrés : $9x^2 = (3x)^2$ et $16 = 4^2$. Donc $9x^2 - 16 = (3x - 4)(3x + 4)$.",
    },
  ],

  pieges: [
    "⛔ $(a+b)^2 \\neq a^2 + b^2$. Il manque le DOUBLE PRODUIT $2ab$ — l'erreur la plus fréquente du programme. Contrôle imparable : $(3+4)^2 = 49$, alors que $3^2 + 4^2 = 25$.",
    "⛔ Dans $(a-b)^2$, le terme $b^2$ reste POSITIF. Seul le double produit change de signe : un carré n'est jamais négatif.",
    "⛔ $a$ n'est pas toujours une lettre seule. Dans $(3x+2)^2$, $a = 3x$ donc $a^2 = 9x^2$ — pas $3x^2$.",
    "⛔ $a^2 + b^2$ ne se factorise PAS. Seule la DIFFÉRENCE de deux carrés se factorise : $x^2 + 9$ reste tel quel.",
    "⛔ Une racine ne disparaît que dans le produit conjugué. $(2+\\sqrt{3})^2$ la garde — $7 + 4\\sqrt{3}$ — parce que le double produit en contient une.",
  ],

  aRetenir: [
    "$(a+b)^2 = a^2 + 2ab + b^2$ — trois termes.",
    "$(a-b)^2 = a^2 - 2ab + b^2$ — seul le milieu change de signe.",
    "$(a-b)(a+b) = a^2 - b^2$ — deux termes seulement.",
    "De gauche à droite : je développe. De droite à gauche : je factorise.",
    "Pour factoriser, je cherche deux CARRÉS et je vérifie le double produit.",
    "Le produit conjugué fait disparaître une racine : $(3+\\sqrt{2})(3-\\sqrt{2}) = 7$.",
  ],

  entrainement: [
    {
      question: "Développer $(x + 6)^2$.",
      correction:
        "$a = x$, $b = 6$ : $x^2 + 2 \\times x \\times 6 + 36 = x^2 + 12x + 36$.",
    },
    {
      question: "Développer $(4x + 3)^2$.",
      correction:
        "$a = 4x$ donc $a^2 = 16x^2$ — pas $4x^2$. Puis $2ab = 24x$ et $b^2 = 9$ : $16x^2 + 24x + 9$.",
    },
    {
      question: "Développer $(x - 7)^2$.",
      correction:
        "$x^2 - 14x + 49$. ⚠️ Le $49$ est POSITIF : c'est un carré, seul le double produit porte le signe moins.",
    },
    {
      question: "Développer $(x - 5)(x + 5)$.",
      correction:
        "C'est la troisième identité : $x^2 - 25$. Le double produit s'annule, il ne reste que deux termes.",
    },
    {
      question: "Factoriser $x^2 - 49$.",
      correction:
        "Une différence de deux carrés : $x^2 - 7^2 = (x - 7)(x + 7)$.",
    },
    {
      question: "Factoriser $9x^2 - 16$.",
      correction:
        "$9x^2 = (3x)^2$ et $16 = 4^2$, donc $9x^2 - 16 = (3x - 4)(3x + 4)$.",
    },
    {
      question: "Calculer $102^2$ de tête.",
      correction:
        "$(100 + 2)^2 = 10\\,000 + 400 + 4 = 10\\,404$. Le double produit vaut $2 \\times 100 \\times 2 = 400$.",
    },
    {
      question: "Peut-on factoriser $x^2 + 16$ ?",
      correction:
        "Non. Seule la DIFFÉRENCE de deux carrés se factorise. Une somme de deux carrés reste telle quelle.",
    },
    {
      question: "Développer $(1 + \\sqrt{2})^2$.",
      correction:
        "$a = 1$, $b = \\sqrt{2}$ : $1 + 2\\sqrt{2} + 2 = 3 + 2\\sqrt{2}$. La racine reste, portée par le double produit.",
    },
    {
      question: "Calculer $(\\sqrt{7} - 2)(\\sqrt{7} + 2)$.",
      correction:
        "Produit conjugué : $a^2 - b^2 = (\\sqrt{7})^2 - 2^2 = 7 - 4 = 3$. La racine a disparu — il n'y a pas de double produit.",
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesIdentitesSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Identités remarquables - 2de",
    section: {
      type: "objectif",
      phrase: "Développer et factoriser avec les trois identités",
      sousPhrase:
        "De gauche à droite je développe, de droite à gauche je factorise. Et le double produit $2ab$ est ce qu'on oublie.",
    },
  },
];
