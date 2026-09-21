// ─── Fiche d'exercices : les identités remarquables (seconde) — 20 exercices ───
//
// Quatrième feuille du bloc « Nombres et calculs » (21/09/2026). Alignée sur la
// banque `lib/tutor-v4/questionBank/seconde/maths/identites-remarquables.bank.ts`
// (notionId identites_remarquables_2de) et sur la fiche de cours
// `lib/fiches/maths-seconde-identites.tsx`.
// ⛔ Aucun calcul de la fiche de cours n'est repris : ni (2x + 5)², ni
// (2 + √3)², ni 9x² − 16, ni x² + 10x + 25, ni 102², ni ses dix exercices.
// Et rien de la feuille du développement (x² − 49, x² + 8x + 16, (x + 1)² − 9).
//
// ⛔ LE PIÈGE CENTRAL, celui de la fiche : le DOUBLE PRODUIT. (a + b)² ≠ a² + b².
// L'exercice 4 le démonte par un essai numérique, l'exercice 17 par une aire.
//
// ⭐ LES RACINES (Frédéric, 08/09/2026 : « tu peux aussi (2 + √3)² ») : le carré
// d'une somme fait APPARAÎTRE une racine (11), le produit conjugué la fait
// DISPARAÎTRE (12, 19).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-identites.mjs` — chaque
// forme est lue telle qu'elle est écrite et comparée à l'expression de départ
// en neuf valeurs de x ; les racines en décimal.
//
// Micro-compétences : ir_carre_somme (1, 4, 9, 11, 17, 20), ir_carre_difference
// (2, 9, 10, 11), ir_difference_carres (3, 5, 10, 12, 13, 14, 18, 19, 20),
// ir_calcul_mental (7, 16, 20), ir_application (6, 8, 13, 14, 15, 18, 19). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// ⛔ Deux colonnes de valeurs, jamais trois, et du texte NU (x², pas `$`).
const tableau = (
  title: string,
  headers: [string, string],
  rows: { label: string; values: [string, string] }[],
) => (
  <div className="mx-auto w-full max-w-[26rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", title, headers, rows }} />
  </div>
);

export const exercicesIdentitesSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "identites-remarquables-2de",
  titre: "Les identités remarquables",
  accroche:
    "Vingt exercices, du calcul seul au problème : développer, factoriser, calculer de tête, faire disparaître une racine. Et une preuve que tu sauras refaire. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    { href: "/fiches-cours/maths/seconde/identites-remarquables-2de", titre: "Les identités remarquables" },
  ],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une identité par exercice. On écrit d'abord qui est a et qui est b.",
      rappel: [
        "$(a + b)^2 = a^2 + 2ab + b^2$ et $(a - b)^2 = a^2 - 2ab + b^2$ : trois termes, dont le DOUBLE PRODUIT $2ab$ au milieu.",
        "$(a - b)(a + b) = a^2 - b^2$ : deux termes seulement, les produits du milieu s'annulent.",
        "Dans l'autre sens, on factorise : on cherche deux carrés, puis on vérifie le terme du milieu.",
      ],
      exercices: [
        {
          enonce: "Développer et réduire.\na) $(x + 7)^2$\nb) $(3x + 1)^2$\nc) $(5 + 2x)^2$",
          correction:
            "On applique $(a + b)^2 = a^2 + 2ab + b^2$ : le carré du premier, le double produit, le carré du second.\na) Ici $a = x$ et $b = 7$ : $(x + 7)^2 = x^2 + 2 \\times x \\times 7 + 7^2 = x^2 + 14x + 49$.\nb) Ici $a = 3x$ et $b = 1$ : $(3x + 1)^2 = (3x)^2 + 2 \\times 3x \\times 1 + 1^2 = 9x^2 + 6x + 1$.\nc) Ici $a = 5$ et $b = 2x$ : $(5 + 2x)^2 = 25 + 20x + 4x^2$, qu'on range en $4x^2 + 20x + 25$.\n⛔ Le piège au b) : écrire $(3x)^2 = 3x^2$. Le carré porte sur le $3$ ET sur le $x$ : $(3x)^2 = 9x^2$.",
          micros: ["ir_carre_somme"],
        },
        {
          enonce: "Développer et réduire.\na) $(x - 9)^2$\nb) $(2x - 5)^2$\nc) $(1 - 3x)^2$",
          correction:
            "On applique $(a - b)^2 = a^2 - 2ab + b^2$ : seul le double produit prend le signe moins.\na) $(x - 9)^2 = x^2 - 2 \\times x \\times 9 + 81 = x^2 - 18x + 81$.\nb) $(2x - 5)^2 = 4x^2 - 2 \\times 2x \\times 5 + 25 = 4x^2 - 20x + 25$.\nc) $(1 - 3x)^2 = 1 - 6x + 9x^2$, qu'on range en $9x^2 - 6x + 1$.\n⛔ Le piège : écrire $(x - 9)^2 = x^2 - 81$. Le dernier terme est un CARRÉ, donc toujours positif : $+81$.",
          micros: ["ir_carre_difference"],
        },
        {
          enonce: "Développer et réduire.\na) $(x - 8)(x + 8)$\nb) $(3x + 2)(3x - 2)$\nc) $(5 - x)(5 + x)$",
          correction:
            "On applique $(a - b)(a + b) = a^2 - b^2$.\na) $(x - 8)(x + 8) = x^2 - 8^2 = x^2 - 64$.\nb) $(3x + 2)(3x - 2) = (3x)^2 - 2^2 = 9x^2 - 4$.\nc) $(5 - x)(5 + x) = 5^2 - x^2 = 25 - x^2$.\n⭐ On le voit en développant le a) : $x^2 + 8x - 8x - 64$. Les deux termes du milieu s'annulent.\n⛔ Le piège au c) : écrire $x^2 - 25$. On soustrait le carré du terme qui change de signe, ici $x$.",
          micros: ["ir_difference_carres"],
        },
        {
          enonce: "Un élève écrit : $(x + 3)^2 = x^2 + 9$.\na) Tester son égalité avec $x = 1$.\nb) Corriger son calcul.",
          correction:
            "a) À gauche : $(1 + 3)^2 = 4^2 = 16$. À droite : $1^2 + 9 = 10$. On ne trouve pas la même chose : l'égalité est fausse.\nb) Il a oublié le double produit : $(x + 3)^2 = x^2 + 2 \\times x \\times 3 + 9 = x^2 + 6x + 9$.\nOn vérifie avec $x = 1$ : $1 + 6 + 9 = 16$. ✓\n⭐ Un seul essai qui échoue suffit à prouver qu'une égalité est fausse. Mais un essai qui réussit ne prouve pas qu'elle est vraie.",
          micros: ["ir_carre_somme"],
        },
        {
          enonce: "Factoriser.\na) $x^2 - 100$\nb) $4x^2 - 25$\nc) $49 - 16x^2$",
          correction:
            "On reconnaît une différence de deux carrés : $a^2 - b^2 = (a - b)(a + b)$.\na) $x^2 - 100 = x^2 - 10^2 = (x - 10)(x + 10)$.\nb) $4x^2 = (2x)^2$ et $25 = 5^2$, donc $4x^2 - 25 = (2x - 5)(2x + 5)$.\nc) $49 = 7^2$ et $16x^2 = (4x)^2$, donc $49 - 16x^2 = (7 - 4x)(7 + 4x)$.\n⛔ Le piège au b) : prendre $a = 4x$. Il faut $a^2 = 4x^2$, donc $a = 2x$.",
          micros: ["ir_difference_carres"],
        },
        {
          enonce: "Factoriser.\na) $x^2 + 20x + 100$\nb) $9x^2 - 12x + 4$\nc) $4x^2 + 4x + 1$",
          correction:
            "On cherche deux carrés aux extrémités, puis on vérifie que le terme du milieu vaut $2ab$.\na) $x^2$ et $100 = 10^2$. Le milieu : $2 \\times x \\times 10 = 20x$. Donc $x^2 + 20x + 100 = (x + 10)^2$.\nb) $9x^2 = (3x)^2$ et $4 = 2^2$. Le milieu : $2 \\times 3x \\times 2 = 12x$, avec un moins. Donc $9x^2 - 12x + 4 = (3x - 2)^2$.\nc) $4x^2 = (2x)^2$ et $1 = 1^2$. Le milieu : $2 \\times 2x \\times 1 = 4x$. Donc $4x^2 + 4x + 1 = (2x + 1)^2$.\n⛔ Le piège : s'arrêter aux deux carrés sans vérifier le milieu. L'exercice 8 montre une expression qui a deux carrés et ne se factorise pas.",
          micros: ["ir_application"],
        },
        {
          enonce: "Calculer de tête, à l'aide d'une identité remarquable.\na) $41^2$\nb) $29^2$\nc) $38 \\times 42$",
          correction:
            "On écrit chaque nombre à côté d'une dizaine ronde.\na) $41^2 = (40 + 1)^2 = 1\\,600 + 80 + 1 = 1\\,681$.\nb) $29^2 = (30 - 1)^2 = 900 - 60 + 1 = 841$.\nc) $38 \\times 42 = (40 - 2)(40 + 2) = 1\\,600 - 4 = 1\\,596$.\n⛔ Le piège au a) : écrire $1\\,600 + 1 = 1\\,601$. Le double produit $2 \\times 40 \\times 1 = 80$ ne disparaît pas.",
          micros: ["ir_calcul_mental"],
        },
        {
          enonce: "Pour chaque expression, dire quelle identité permet de la factoriser, ou qu'aucune ne convient. Factoriser quand c'est possible.\na) $x^2 - 36$\nb) $x^2 + 36$\nc) $x^2 - 10x + 25$\nd) $x^2 + 5x + 25$",
          correction:
            "a) Une différence de deux carrés : $x^2 - 36 = (x - 6)(x + 6)$.\nb) Une SOMME de deux carrés : aucune identité ne la factorise.\nc) Deux carrés, $x^2$ et $5^2$, et le milieu vaut bien $2 \\times x \\times 5 = 10x$, avec un moins : $x^2 - 10x + 25 = (x - 5)^2$.\nd) Deux carrés, $x^2$ et $5^2$, mais le milieu devrait valoir $10x$, pas $5x$ : aucune identité ne convient.\n⭐ Trois termes ne suffisent pas : c'est le terme du milieu qui décide.",
          micros: ["ir_application"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle. On reconnaît l'identité avant de calculer.",
      rappel: [
        "Un carré $(a \\pm b)^2$ donne TROIS termes ; un produit $(a - b)(a + b)$ en donne DEUX.",
        "$A^2 - B^2 = (A - B)(A + B)$, même quand $A$ et $B$ sont des parenthèses : on les garde entre crochets.",
        "Avec des racines : $\\left(\\sqrt{a}\\right)^2 = a$. Le produit $\\left(c - \\sqrt{a}\\right)\\left(c + \\sqrt{a}\\right) = c^2 - a$ n'a plus de racine.",
      ],
      exercices: [
        {
          enonce: "Développer et réduire $A = (x + 4)^2 - (x - 4)^2$.",
          correction:
            "On développe chaque carré, et on met le second entre crochets à cause du signe moins.\n$(x + 4)^2 = x^2 + 8x + 16$ et $(x - 4)^2 = x^2 - 8x + 16$.\n$A = x^2 + 8x + 16 - [x^2 - 8x + 16] = x^2 + 8x + 16 - x^2 + 8x - 16 = 16x$.\n⭐ Autre chemin : c'est une différence de deux carrés. $[(x + 4) - (x - 4)][(x + 4) + (x - 4)] = 8 \\times 2x$, ce qui donne encore $16x$.\n⛔ Le piège : écrire $- x^2 - 8x + 16$, où seul le premier signe a changé. Le moins change les TROIS signes.",
          micros: ["ir_carre_somme", "ir_carre_difference"],
        },
        {
          enonce: "Développer et réduire $B = (2x - 1)^2 - (x + 3)(x - 3)$.",
          correction:
            "On développe chaque morceau avec son identité.\n$(2x - 1)^2 = 4x^2 - 4x + 1$.\n$(x + 3)(x - 3) = x^2 - 9$.\n$B = 4x^2 - 4x + 1 - [x^2 - 9] = 4x^2 - 4x + 1 - x^2 + 9 = 3x^2 - 4x + 10$.\n⛔ Le piège : calculer $1 - 9 = -8$. On retire $x^2 - 9$, donc on AJOUTE $9$ : $1 + 9 = 10$.",
          micros: ["ir_carre_difference", "ir_difference_carres"],
        },
        {
          enonce: "Développer et réduire.\na) $\\left(3 + \\sqrt{2}\\right)^2$\nb) $\\left(\\sqrt{5} - 1\\right)^2$",
          correction:
            "Les identités marchent avec des racines, et $\\left(\\sqrt{a}\\right)^2 = a$.\na) $\\left(3 + \\sqrt{2}\\right)^2 = 9 + 2 \\times 3 \\times \\sqrt{2} + 2 = 11 + 6\\sqrt{2}$.\nb) $\\left(\\sqrt{5} - 1\\right)^2 = 5 - 2\\sqrt{5} + 1 = 6 - 2\\sqrt{5}$.\n⛔ Le piège au a) : additionner $9 + 2 = 11$ et oublier le double produit $6\\sqrt{2}$. Dans le carré d'une somme, la racine ne disparaît pas.",
          micros: ["ir_carre_somme", "ir_carre_difference"],
        },
        {
          enonce: "Calculer.\na) $\\left(4 - \\sqrt{3}\\right)\\left(4 + \\sqrt{3}\\right)$\nb) $\\left(2\\sqrt{5} + 3\\right)\\left(2\\sqrt{5} - 3\\right)$",
          correction:
            "On reconnaît $(a - b)(a + b) = a^2 - b^2$ : les racines disparaissent.\na) $\\left(4 - \\sqrt{3}\\right)\\left(4 + \\sqrt{3}\\right) = 4^2 - \\left(\\sqrt{3}\\right)^2 = 16 - 3 = 13$.\nb) $\\left(2\\sqrt{5}\\right)^2 = 4 \\times 5 = 20$, donc $\\left(2\\sqrt{5} + 3\\right)\\left(2\\sqrt{5} - 3\\right) = 20 - 9 = 11$.\n⛔ Le piège au b) : écrire $\\left(2\\sqrt{5}\\right)^2 = 2 \\times 5 = 10$. Le $2$ aussi est au carré.",
          micros: ["ir_difference_carres"],
        },
        {
          enonce: "Factoriser $C = (2x + 1)^2 - 25$.",
          correction:
            "On reconnaît $A^2 - B^2$ avec $A = 2x + 1$ et $B = 5$.\n$C = [(2x + 1) - 5][(2x + 1) + 5] = (2x - 4)(2x + 6)$.\nOn peut encore sortir $2$ de chaque parenthèse : $C = 2(x - 2) \\times 2(x + 3) = 4(x - 2)(x + 3)$.\n⭐ On vérifie avec $x = 0$ : $(0 + 1)^2 - 25 = -24$, et $4 \\times (-2) \\times 3 = -24$. ✓",
          micros: ["ir_difference_carres", "ir_application"],
        },
        {
          enonce: "Factoriser $D = (x - 3)^2 - (2x + 1)^2$.",
          correction:
            "C'est $A^2 - B^2$ avec $A = x - 3$ et $B = 2x + 1$. On garde les parenthèses entre crochets.\n$D = [(x - 3) - (2x + 1)][(x - 3) + (2x + 1)]$.\nPremier crochet : $x - 3 - 2x - 1 = -x - 4$. Second crochet : $x - 3 + 2x + 1 = 3x - 2$.\nDonc $D = (-x - 4)(3x - 2)$.\n⛔ Le piège : écrire $x - 3 - 2x + 1$ dans le premier crochet. Le moins porte sur TOUT $(2x + 1)$.",
          micros: ["ir_difference_carres", "ir_application"],
        },
        {
          enonce: "Résoudre les équations.\na) $x^2 - 6x + 9 = 0$\nb) $4x^2 - 9 = 0$",
          correction:
            "On factorise avec une identité, puis on utilise le produit nul.\na) $x^2 - 6x + 9 = (x - 3)^2$. Donc $(x - 3)^2 = 0$, soit $x - 3 = 0$ : une seule solution, $x = 3$.\nb) $4x^2 - 9 = (2x - 3)(2x + 3)$. Donc $2x - 3 = 0$ ou $2x + 3 = 0$ : $x = \\dfrac{3}{2}$ ou $x = -\\dfrac{3}{2}$.\n⛔ Le piège au b) : diviser par $4$ et répondre $x = \\dfrac{9}{4}$. On a oublié la racine carrée, et une des deux solutions.",
          micros: ["ir_application"],
        },
        {
          enonce: "Calculer sans calculatrice.\na) $999^2$\nb) $1\\,003 \\times 997$\nc) $75^2 - 25^2$",
          correction:
            "a) $999^2 = (1\\,000 - 1)^2 = 1\\,000\\,000 - 2\\,000 + 1 = 998\\,001$.\nb) $1\\,003 \\times 997 = (1\\,000 + 3)(1\\,000 - 3) = 1\\,000\\,000 - 9 = 999\\,991$.\nc) $75^2 - 25^2 = (75 - 25)(75 + 25) = 50 \\times 100 = 5\\,000$.\n⭐ Au c), on ne calcule aucun carré : la factorisation transforme deux gros calculs en un produit facile.",
          micros: ["ir_calcul_mental"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations complètes, et deux preuves. On calcule avec une lettre, et on conclut par une phrase.",
      rappel: [
        "$(a + b)^2$ se DESSINE : le carré de côté $a + b$ se découpe en un carré $a^2$, un carré $b^2$ et deux rectangles $ab$.",
        "Pour démontrer qu'une propriété est vraie pour TOUS les nombres, on calcule avec une lettre. Un exemple ne démontre rien.",
      ],
      exercices: [
        {
          titre: "Le carré agrandi",
          enonce: "On agrandit un carré de côté $x$ cm en ajoutant $3$ cm à son côté.\na) Exprimer l'augmentation de l'aire en fonction de $x$, sous forme réduite.\nb) Un élève dit : « l'aire augmente de $3^2 = 9$ cm² ». Calculer l'augmentation pour $x = 10$, et conclure.\nc) Pour quelle valeur de $x$ l'aire augmente-t-elle de $51$ cm² ?",
          correction:
            "a) La nouvelle aire vaut $(x + 3)^2 = x^2 + 6x + 9$. L'augmentation : $x^2 + 6x + 9 - x^2 = 6x + 9$.\nb) Pour $x = 10$ : $6 \\times 10 + 9 = 69$ cm², et non $9$. L'élève a oublié les deux bandes de $3$ cm sur $x$ cm, qui font $6x$. Il n'a compté que le petit carré du coin.\nc) $6x + 9 = 51$, donc $6x = 42$ et $x = 7$. L'aire d'un carré de $7$ cm de côté augmente de $51$ cm².\n⭐ La figure montre l'identité : $(x + 3)^2$, c'est le carré $x^2$, deux bandes de $3x$ et le petit carré de $9$.",
          schema: tableau("Le carré agrandi, découpé", ["aire", "pour x = 10"], [
            { label: "Carré de départ", values: ["x²", "100"] },
            { label: "Deux bandes", values: ["2 × 3x = 6x", "60"] },
            { label: "Petit carré", values: ["3² = 9", "9"] },
          ]),
          micros: ["ir_carre_somme"],
        },
        {
          titre: "Deux impairs qui se suivent",
          enonce: "On prend deux nombres impairs qui se suivent, comme $3$ et $5$, ou $11$ et $13$.\na) Calculer $5^2 - 3^2$, puis $13^2 - 11^2$. Que remarque-t-on ?\nb) Un nombre impair s'écrit $2n + 1$, avec $n$ entier ; l'impair suivant est $2n + 3$. Factoriser $(2n + 3)^2 - (2n + 1)^2$.\nc) En déduire que la différence est toujours un multiple de $8$.",
          correction:
            "a) $5^2 - 3^2 = 25 - 9 = 16$ et $13^2 - 11^2 = 169 - 121 = 48$. Les deux sont des multiples de $8$ : $16 = 8 \\times 2$ et $48 = 8 \\times 6$.\nb) C'est $A^2 - B^2$ : $[(2n + 3) - (2n + 1)][(2n + 3) + (2n + 1)] = 2(4n + 4)$.\nc) $2(4n + 4) = 8n + 8 = 8(n + 1)$. Comme $n + 1$ est un entier, la différence est toujours un multiple de $8$.\n⛔ Le piège : s'arrêter au a). Deux exemples ne font pas une preuve ; le calcul avec $n$ vaut pour tous les impairs.",
          micros: ["ir_difference_carres", "ir_application"],
        },
        {
          titre: "Chasser une racine du dénominateur",
          enonce: "a) Calculer $\\left(\\sqrt{2} - 1\\right)\\left(\\sqrt{2} + 1\\right)$.\nb) En déduire que $\\dfrac{1}{\\sqrt{2} - 1} = \\sqrt{2} + 1$.\nc) Vérifier à la calculatrice, avec $\\sqrt{2} \\approx 1{,}414$.",
          correction:
            "a) C'est $(a - b)(a + b)$ avec $a = \\sqrt{2}$ et $b = 1$ : $\\left(\\sqrt{2}\\right)^2 - 1^2 = 2 - 1 = 1$.\nb) Le produit de $\\sqrt{2} - 1$ et de $\\sqrt{2} + 1$ vaut $1$ : ces deux nombres sont INVERSES l'un de l'autre. Donc $\\dfrac{1}{\\sqrt{2} - 1} = \\sqrt{2} + 1$.\nc) $\\dfrac{1}{1{,}414 - 1} = \\dfrac{1}{0{,}414} \\approx 2{,}415$, et $\\sqrt{2} + 1 \\approx 2{,}414$. Les deux valeurs se rejoignent, à l'arrondi près.\n⭐ C'est à cela que sert le produit conjugué : il fait disparaître la racine du dénominateur.",
          micros: ["ir_difference_carres", "ir_application"],
        },
        {
          titre: "Le nombre 2 025",
          enonce: "a) Vérifier que $2\\,025 = 45^2$, en écrivant $45 = 40 + 5$.\nb) En déduire, sans calculatrice, le produit $2\\,024 \\times 2\\,026$.\nc) Calculer $2\\,026^2 - 2\\,024^2$ sans calculer aucun carré.",
          correction:
            "a) $45^2 = (40 + 5)^2 = 1\\,600 + 400 + 25 = 2\\,025$.\nb) $2\\,024 \\times 2\\,026 = (2\\,025 - 1)(2\\,025 + 1) = 2\\,025^2 - 1$.\nEt $2\\,025^2 = (2\\,000 + 25)^2 = 4\\,000\\,000 + 100\\,000 + 625 = 4\\,100\\,625$.\nDonc $2\\,024 \\times 2\\,026 = 4\\,100\\,625 - 1 = 4\\,100\\,624$.\nc) $2\\,026^2 - 2\\,024^2 = (2\\,026 - 2\\,024)(2\\,026 + 2\\,024) = 2 \\times 4\\,050 = 8\\,100$. Et $8\\,100 = 90^2$ : encore un carré.\n⭐ Trois identités, trois calculs à quatre chiffres faits de tête.",
          micros: ["ir_calcul_mental", "ir_carre_somme", "ir_difference_carres"],
        },
      ],
    },
  ],
};
