// ─── Fiche d'exercices : calculer avec les fractions (4e) — 20 exercices corrigés ─
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-fraction-calcul.tsx` et sur
// les sept micros du coach de 4e, notionId `fraction_calcul`. L'angle de la 4e,
// comme le cours : la 5e additionnait et multipliait des fractions POSITIVES ; la
// 4e y ajoute les RELATIFS (le signe d'une somme, d'un produit), l'OPPOSÉ et
// l'INVERSE — qu'on confond —, la DIVISION par une fraction, et les PRIORITÉS
// avec tout cela à la fois.
//
// ⛔ La notion sœur `fraction_nombre` (fractions égales, simplifier, comparer,
// écriture décimale) a sa propre feuille : ici, on CALCULE. Simplifier n'arrive
// qu'en fin de calcul, jamais comme exercice.
//
// ⛔ Aucun exemple de la fiche de cours n'est repris (ni 1/4 + 2/4, ni 2/3 × 3/5,
// ni 3/4 de 20, ni 1/2 de 30, ni l'inverse de 3/5, ni l'opposé de 3/7, ni
// « diviser par 2/3 », ni 1/2 + 1/3 = 2/5, ni 1/2 ÷ 1/4, ni le rougail pour
// quatre). ⛔ Ni ceux de la feuille de 5e (3/8 + 2/8, 1/4 + 1/6, le gâteau, les
// letchis, la recette pour quatre), ni ceux de la feuille de 3e (3/4 + 1/6,
// 3/4 ÷ 9/10, −5/6 + 3/4, le trail, les gobelets).
//
// Les pièges nommés : additionner les dénominateurs (1, 16), perdre le signe
// d'une différence (2), chercher un dénominateur commun pour multiplier (3),
// multiplier aussi le dénominateur par l'entier (4), l'inverse qui change de
// signe (5, 12, 19), l'inverse pris pour l'opposé (6), retourner la PREMIÈRE
// fraction (7, 14), échanger numérateur et dénominateur dans « les 5/9 de »
// (8), calculer de gauche à droite (9), la règle des signes oubliée (10), les
// parenthèses oubliées (11), multiplier au lieu de diviser par un entier (13),
// la fraction prise sur le mauvais tout (15, 18), recharger ce qui est déjà là
// (17), additionner des durées au lieu des débits, et 2,4 h lu 2 h 40 (20).
//
// Le chiffre du monde, et d'où il vient :
// - l'eau de la Terre (ex. 18) : 2,5 % d'eau douce, dont 68,7 % dans les
//   glaciers et calottes (USGS Water Science School, « Where is Earth's
//   water? », d'après Shiklomanov 1993). Arrondis ici à 1/40 (exactement 2,5 %)
//   et « environ 2/3 ». La cuve de 1 200 L est une image, choisie pour tomber
//   juste.
// - tout le reste (la forêt, le club de foot, Nina et ses fractionnés, la
//   batterie du vélo, la citerne du jardin) est IMAGINÉ, à l'ordre de grandeur
//   réel (un vélo à assistance électrique fait couramment 60 à 100 km par charge).
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les vingt corrigés en ont
// un. Droite graduée quand le SIGNE ou la TAILLE du résultat se voit (1, 2, 4,
// 6, 7, 14, 16, 17), bande de fraction pour « les 5/9 de » (8), tableau quand on
// met des nombres en regard (inverse, opposé, effectifs, litres, débits), et
// trace des étapes quand ce sont les PRIORITÉS qui comptent (9, 10, 11, 19).
// ⛔ Texte NU dans les dessins : « −5/12 », jamais de `$`.
//
// Les corrigés sont écrits à la première personne (« je retourne »), comme les
// autres feuilles : c'est la voix du cahier, pas celle du manuel.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-fractions-calcul-4e.mjs`.
//
// Micro-compétences : fraction_additionner (1, 2, 9, 10, 11, 16, 17, 18, 19,
// 20), fraction_multiplier (3, 4, 10, 15, 18, 19), fraction_quantite (8, 15,
// 17, 18), fraction_inverse (5, 7, 12, 13, 19, 20), fraction_diviser (7, 9, 11,
// 13, 14, 17, 18, 20), fraction_oppose (6, 12, 16), fraction_defi (14, 16, 17,
// 18, 19, 20). 7/7.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { BLEU, ORANGE, intervalles, tableau, trace } from "@/lib/fiches-exercices/figures";

/** Une bande de fraction (le canvas `fraction` du coach), comme la feuille de
 *  5e : 140 de haut et 16 rem de large, sinon la barre flotte dans une carte vide. */
const barre = (n: number, d: number) => (
  <div className="mx-auto w-full max-w-[16rem]">
    <CanvasRenderer
      figure={{
        kind: "fraction",
        model: "bar",
        fraction: { numerator: n, denominator: d },
        size: { width: 320, height: 140 },
      }}
    />
  </div>
);

export const exercicesFractionsCalcul4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "fraction-calcul",
  titre: "Calculer avec les fractions",
  accroche:
    "Vingt exercices, du calcul seul au problème : additionner avec des nombres négatifs, multiplier, prendre une fraction d'une quantité, l'opposé et l'inverse, diviser par une fraction, et les priorités avec tout cela. La forêt, le club de foot, la batterie du vélo, l'eau de la Terre, la citerne du jardin. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et un schéma.",

  fichesCours: [
    {
      href: "/fiches-cours/maths/4e/fraction-calcul",
      titre: "Calculer avec les fractions",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je regarde d'abord l'opération, puis le signe, et je donne le résultat irréductible.",
      rappel: [
        "Additionner ou soustraire : il faut le MÊME dénominateur. Sinon, je transforme une fraction, ou les deux, avant de calculer les numérateurs.",
        "Multiplier : $\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{a \\times c}{b \\times d}$, et le signe par la règle des relatifs. Aucun dénominateur commun.",
        "L'opposé change le signe : la somme fait $0$. L'inverse retourne la fraction et garde le signe : le produit fait $1$.",
        "Diviser par une fraction, c'est multiplier par son inverse : on retourne la SECONDE.",
      ],
      exercices: [
        {
          enonce: "Calcule $-\\dfrac{5}{12} + \\dfrac{3}{4}$ et donne le résultat sous forme irréductible.",
          correction:
            "Les dénominateurs sont différents, mais $12$ est un multiple de $4$ : je transforme seulement $\\dfrac{3}{4}$.\n$\\dfrac{3}{4} = \\dfrac{3 \\times 3}{4 \\times 3} = \\dfrac{9}{12}$.\nJ'additionne des douzièmes : $-5 + 9 = 4$, donc $-\\dfrac{5}{12} + \\dfrac{9}{12} = \\dfrac{4}{12}$.\nJe simplifie par $4$ : $\\dfrac{4}{12} = \\dfrac{1}{3}$.\n⭐ Contrôle du signe : j'ajoute $\\dfrac{9}{12}$, plus loin de zéro que $\\dfrac{5}{12}$ ; le résultat est positif.\n⛔ Le piège : additionner en haut ET en bas, $\\dfrac{-5 + 3}{12 + 4} = \\dfrac{-2}{16}$. Un résultat négatif, alors qu'on a ajouté plus qu'on n'avait retiré.\nRéponse : $-\\dfrac{5}{12} + \\dfrac{3}{4} = \\dfrac{1}{3}$.",
          schema: intervalles(-0.5, 0.5, [{ de: -0.417, a: 0.333, deInclus: true, aInclus: true, label: "on avance de 3/4", color: BLEU }], 0.25, [
            { value: -0.417, label: "−5/12", color: ORANGE },
            { value: 0.333, label: "1/3", color: ORANGE },
          ]),
          micros: ["fraction_additionner"],
        },
        {
          enonce: "Calcule $\\dfrac{1}{6} - \\dfrac{7}{9}$ et donne le résultat sous forme irréductible.",
          correction:
            "Ni $6$ ni $9$ n'est un multiple de l'autre. Je cherche un multiple commun : dans la table de $9$, il y a $9$ puis $18$, et $18$ est aussi dans la table de $6$.\n$\\dfrac{1}{6} = \\dfrac{3}{18}$ et $\\dfrac{7}{9} = \\dfrac{14}{18}$.\n$\\dfrac{3}{18} - \\dfrac{14}{18} = \\dfrac{-11}{18}$ : j'enlève $14$ parts alors que je n'en ai que $3$, le résultat passe sous zéro.\n$11$ est premier et ne divise pas $18$ : la fraction est irréductible.\n⛔ Le piège : faire « le grand moins le petit », $14 - 3 = 11$, et oublier le signe. $\\dfrac{1}{6}$ est plus petit que $\\dfrac{7}{9}$ : la différence est négative.\nRéponse : $\\dfrac{1}{6} - \\dfrac{7}{9} = -\\dfrac{11}{18}$.",
          schema: intervalles(-1, 0.5, [{ de: -0.611, a: 0.167, deInclus: true, aInclus: true, label: "on recule de 7/9", color: BLEU }], 0.25, [
            { value: -0.611, label: "−11/18", color: ORANGE },
            { value: 0.167, label: "1/6", color: ORANGE },
          ]),
          micros: ["fraction_additionner"],
        },
        {
          enonce: "Calcule $-\\dfrac{4}{15} \\times \\dfrac{5}{8}$ et donne le résultat sous forme irréductible.",
          correction:
            "Le signe d'abord : un négatif fois un positif donne un négatif.\nPuis haut fois haut, bas fois bas : $\\dfrac{4}{15} \\times \\dfrac{5}{8} = \\dfrac{4 \\times 5}{15 \\times 8} = \\dfrac{20}{120}$.\nJe simplifie par $20$ : $\\dfrac{20}{120} = \\dfrac{1}{6}$.\n⭐ Plus court : je simplifie AVANT de multiplier. $4$ et $8$ se divisent par $4$, $5$ et $15$ par $5$ : il reste $\\dfrac{1 \\times 1}{3 \\times 2} = \\dfrac{1}{6}$.\n⛔ Le piège : chercher un dénominateur commun, comme pour l'addition. Pour multiplier, on n'en a jamais besoin.\nRéponse : $-\\dfrac{4}{15} \\times \\dfrac{5}{8} = -\\dfrac{1}{6}$.",
          schema: tableau(["", "−4/15", "5/8", "produit"], ["signe", "−", "+", "−"]),
          micros: ["fraction_multiplier"],
        },
        {
          enonce: "Calcule $-6 \\times \\dfrac{7}{9}$ et donne le résultat sous forme irréductible.",
          correction:
            "J'écris l'entier comme une fraction : $-6 = \\dfrac{-6}{1}$.\n$\\dfrac{-6}{1} \\times \\dfrac{7}{9} = \\dfrac{-6 \\times 7}{1 \\times 9} = \\dfrac{-42}{9}$.\nJe simplifie par $3$ : $\\dfrac{-42}{9} = \\dfrac{-14}{3}$.\n⭐ Contrôle : $\\dfrac{7}{9}$ est plus petit que $1$, donc le produit est plus près de zéro que $-6$. Et $-\\dfrac{14}{3} \\approx -4{,}67$.\n⛔ Le piège : multiplier aussi le dénominateur, $\\dfrac{-6 \\times 7}{6 \\times 9} = \\dfrac{-42}{54}$. C'est encore $-\\dfrac{7}{9}$ : on a changé le signe, on n'a pas multiplié par $6$.\nRéponse : $-6 \\times \\dfrac{7}{9} = -\\dfrac{14}{3}$.",
          schema: intervalles(-7, 1, [{ de: -4.667, a: 0, deInclus: true, aInclus: true, label: "les 7/9 de 6, vers la gauche", color: BLEU }], 1, [
            { value: -6, label: "−6", color: ORANGE },
            { value: -4.667, label: "−14/3", color: ORANGE },
          ]),
          micros: ["fraction_multiplier"],
        },
        {
          enonce: "Donne l'inverse de chaque nombre, s'il existe.\na) $\\dfrac{4}{9}$\nb) $-6$\nc) $-\\dfrac{7}{2}$\nd) $0$",
          correction:
            "L'inverse d'un nombre, c'est le nombre par lequel le multiplier pour trouver $1$. Pour une fraction, je la retourne, et je garde le signe.\na) $\\dfrac{9}{4}$, car $\\dfrac{4}{9} \\times \\dfrac{9}{4} = \\dfrac{36}{36} = 1$.\nb) $-6 = \\dfrac{-6}{1}$ se retourne en $\\dfrac{1}{-6}$ : l'inverse est $-\\dfrac{1}{6}$. Contrôle : $-6 \\times \\left(-\\dfrac{1}{6}\\right) = 1$.\nc) $-\\dfrac{2}{7}$, car $-\\dfrac{7}{2} \\times \\left(-\\dfrac{2}{7}\\right) = \\dfrac{14}{14} = 1$.\nd) $0$ n'a pas d'inverse : $0$ multiplié par n'importe quel nombre donne $0$, jamais $1$.\n⛔ Le piège : changer le signe en retournant. L'inverse de $-6$ n'est ni $6$ (c'est son opposé) ni $\\dfrac{1}{6}$ : un nombre et son inverse ont toujours le MÊME signe.\nRéponse : $\\dfrac{9}{4}$ ; $-\\dfrac{1}{6}$ ; $-\\dfrac{2}{7}$ ; $0$ n'a pas d'inverse.",
          schema: tableau(["nombre", "4/9", "−6", "−7/2"], ["inverse", "9/4", "−1/6", "−2/7"]),
          micros: ["fraction_inverse"],
        },
        {
          enonce: "Donne l'opposé de chaque nombre.\na) $\\dfrac{5}{8}$\nb) $-\\dfrac{11}{4}$\nc) $0$",
          correction:
            "L'opposé d'un nombre, c'est le nombre qu'on lui ajoute pour trouver $0$. Je change le signe, et je ne retourne RIEN.\na) L'opposé de $\\dfrac{5}{8}$ est $-\\dfrac{5}{8}$, car $\\dfrac{5}{8} + \\left(-\\dfrac{5}{8}\\right) = 0$.\nb) L'opposé de $-\\dfrac{11}{4}$ est $\\dfrac{11}{4}$, car $-\\dfrac{11}{4} + \\dfrac{11}{4} = 0$.\nc) L'opposé de $0$ est $0$ lui-même.\n⭐ Sur la droite graduée, un nombre et son opposé sont à la même distance de zéro, de part et d'autre.\n⛔ Le piège : retourner la fraction. $\\dfrac{8}{5}$ est l'INVERSE de $\\dfrac{5}{8}$, pas son opposé : $\\dfrac{5}{8} + \\dfrac{8}{5}$ ne fait pas $0$.\nRéponse : $-\\dfrac{5}{8}$ ; $\\dfrac{11}{4}$ ; $0$.",
          schema: intervalles(-3, 3, [{ de: -2.75, a: 2.75, deInclus: true, aInclus: true, label: "même distance de 0", color: BLEU }], 1, [
            { value: -2.75, label: "−11/4", color: ORANGE },
            { value: -0.625, label: "−5/8", color: ORANGE },
            { value: 0.625, label: "5/8", color: ORANGE },
            { value: 2.75, label: "11/4", color: ORANGE },
          ]),
          micros: ["fraction_oppose"],
        },
        {
          enonce: "Calcule $\\dfrac{5}{6} \\div \\dfrac{10}{9}$ et donne le résultat sous forme irréductible.",
          correction:
            "Diviser par une fraction, c'est multiplier par son inverse. Je retourne la SECONDE, celle par laquelle je divise : l'inverse de $\\dfrac{10}{9}$ est $\\dfrac{9}{10}$.\n$\\dfrac{5}{6} \\times \\dfrac{9}{10} = \\dfrac{45}{60}$.\nJe simplifie par $15$ : $\\dfrac{45}{60} = \\dfrac{3}{4}$.\n⭐ Contrôle : je divise par un nombre plus grand que $1$, le résultat est plus PETIT que $\\dfrac{5}{6}$. Et $\\dfrac{3}{4} < \\dfrac{5}{6}$.\n⛔ Le piège : retourner la première fraction. $\\dfrac{6}{5} \\times \\dfrac{10}{9} = \\dfrac{60}{45} = \\dfrac{4}{3}$ : exactement l'inverse de la bonne réponse.\nRéponse : $\\dfrac{5}{6} \\div \\dfrac{10}{9} = \\dfrac{3}{4}$.",
          schema: intervalles(0, 1.5, [{ de: 0, a: 0.833, deInclus: true, aInclus: true, label: "5/6", color: BLEU }], 0.25, [
            { value: 0.75, label: "3/4", color: ORANGE },
            { value: 1.333, label: "4/3 (faux)", color: "#dc2626" },
          ]),
          micros: ["fraction_diviser", "fraction_inverse"],
        },
        {
          enonce:
            "Une forêt de $450$ hectares est couverte aux $\\dfrac{5}{9}$ de feuillus (chênes, hêtres), et le reste de résineux. Quelle surface couvrent les feuillus ? Et les résineux ?",
          correction:
            "« Les $\\dfrac{5}{9}$ de $450$ », c'est $\\dfrac{5}{9} \\times 450$.\nJe divise d'abord par le dénominateur : $450 \\div 9 = 50$ ha. C'est un neuvième de la forêt.\nPuis je multiplie par le numérateur : $50 \\times 5 = 250$ ha.\nLes résineux couvrent le reste : $450 - 250 = 200$ ha, soit les $\\dfrac{4}{9}$ de la forêt.\n⭐ Contrôle : $\\dfrac{5}{9}$ est un peu plus que la moitié, et $250$ est un peu plus que la moitié de $450$, qui vaut $225$.\n⛔ Le piège : échanger les rôles, $450 \\div 5 \\times 9 = 810$ ha. Plus que la forêt entière : impossible.\nRéponse : les feuillus couvrent $250$ ha et les résineux $200$ ha.",
          schema: barre(5, 9),
          micros: ["fraction_quantite"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme dans un contrôle. J'écris chaque étape et je respecte les priorités.",
      rappel: [
        "Les priorités : les parenthèses d'abord, puis les multiplications et les divisions, puis les additions et les soustractions.",
        "Le signe d'un produit ou d'un quotient : deux signes contraires donnent un négatif, deux signes pareils un positif.",
        "Deux nombres dont la somme fait $0$ sont opposés ; deux nombres dont le produit fait $1$ sont inverses.",
        "Un résultat se donne irréductible. Pour le contrôler, je le compare à $0$, à $1$ ou au nombre de départ.",
      ],
      exercices: [
        {
          enonce: "Calcule $A = \\dfrac{5}{3} - \\dfrac{2}{3} \\div \\dfrac{4}{9}$ et donne le résultat sous forme irréductible.",
          correction:
            "La division passe avant la soustraction : je commence par $\\dfrac{2}{3} \\div \\dfrac{4}{9}$.\nJe multiplie par l'inverse de $\\dfrac{4}{9}$ : $\\dfrac{2}{3} \\times \\dfrac{9}{4} = \\dfrac{18}{12} = \\dfrac{3}{2}$.\nIl reste $A = \\dfrac{5}{3} - \\dfrac{3}{2}$. En sixièmes : $\\dfrac{10}{6} - \\dfrac{9}{6} = \\dfrac{1}{6}$.\n⛔ Le piège : calculer de gauche à droite. $\\dfrac{5}{3} - \\dfrac{2}{3} = 1$, puis $1$ divisé par $\\dfrac{4}{9}$ donne $\\dfrac{9}{4}$ : un tout autre nombre.\nRéponse : $A = \\dfrac{1}{6}$.",
          schema: trace(["étape", "calcul", "résultat"], [["1. la division", "2/3 × 9/4", "3/2"], ["2. la soustraction", "5/3 − 3/2", "1/6"]]),
          micros: ["fraction_diviser", "fraction_additionner"],
        },
        {
          enonce: "Calcule $B = \\left(\\dfrac{3}{4} - \\dfrac{5}{6}\\right) \\times \\left(-\\dfrac{8}{5}\\right)$ et donne le résultat sous forme irréductible.",
          correction:
            "Les parenthèses d'abord. En douzièmes : $\\dfrac{3}{4} - \\dfrac{5}{6} = \\dfrac{9}{12} - \\dfrac{10}{12} = -\\dfrac{1}{12}$.\nPuis le produit. Le signe : négatif fois négatif, positif.\n$-\\dfrac{1}{12} \\times \\left(-\\dfrac{8}{5}\\right) = \\dfrac{1 \\times 8}{12 \\times 5} = \\dfrac{8}{60}$.\nJe simplifie par $4$ : $\\dfrac{8}{60} = \\dfrac{2}{15}$.\n⛔ Le piège : oublier la règle des signes et garder le moins. Deux facteurs négatifs, le produit est positif.\nRéponse : $B = \\dfrac{2}{15}$.",
          schema: trace(["étape", "calcul", "résultat"], [["1. la parenthèse", "9/12 − 10/12", "−1/12"], ["2. le produit", "−1/12 × (−8/5)", "2/15"]]),
          micros: ["fraction_additionner", "fraction_multiplier"],
        },
        {
          enonce: "Calcule $C = \\left(\\dfrac{2}{3} + \\dfrac{1}{4}\\right) \\div \\dfrac{11}{6}$ et donne le résultat sous forme irréductible.",
          correction:
            "Les parenthèses d'abord : $\\dfrac{2}{3} + \\dfrac{1}{4} = \\dfrac{8}{12} + \\dfrac{3}{12} = \\dfrac{11}{12}$.\nPuis la division, par l'inverse de $\\dfrac{11}{6}$ : $\\dfrac{11}{12} \\times \\dfrac{6}{11} = \\dfrac{66}{132}$.\nJe simplifie par $66$ : $\\dfrac{66}{132} = \\dfrac{1}{2}$.\n⭐ Plus court : les $11$ se simplifient avant de multiplier, il reste $\\dfrac{6}{12}$, c'est-à-dire $\\dfrac{1}{2}$.\n⛔ Le piège : oublier les parenthèses et ne diviser que $\\dfrac{1}{4}$. On trouverait $\\dfrac{1}{4} \\times \\dfrac{6}{11} = \\dfrac{3}{22}$, puis $\\dfrac{2}{3} + \\dfrac{3}{22} = \\dfrac{53}{66}$ : faux.\nRéponse : $C = \\dfrac{1}{2}$.",
          schema: trace(["étape", "calcul", "résultat"], [["1. la parenthèse", "8/12 + 3/12", "11/12"], ["2. la division", "11/12 × 6/11", "1/2"]]),
          micros: ["fraction_additionner", "fraction_diviser"],
        },
        {
          enonce:
            "On donne $x = -\\dfrac{5}{4}$.\na) Écris l'opposé de $x$, puis l'inverse de $x$.\nb) Vérifie tes deux réponses par un calcul.\nc) Quel nombre est égal à son opposé ? Quels nombres sont égaux à leur inverse ?",
          correction:
            "a) L'opposé : je change le signe. L'opposé de $-\\dfrac{5}{4}$ est $\\dfrac{5}{4}$.\nL'inverse : je retourne, et je GARDE le signe. L'inverse de $-\\dfrac{5}{4}$ est $-\\dfrac{4}{5}$.\nb) $-\\dfrac{5}{4} + \\dfrac{5}{4} = 0$ : c'est la marque de l'opposé.\n$-\\dfrac{5}{4} \\times \\left(-\\dfrac{4}{5}\\right) = \\dfrac{20}{20} = 1$ : c'est la marque de l'inverse.\nc) Un nombre égal à son opposé : seul $0$. Un nombre égal à son inverse : son carré vaut $1$, donc c'est $1$ ou $-1$.\n⛔ Le piège : écrire l'inverse $\\dfrac{4}{5}$. Alors $-\\dfrac{5}{4} \\times \\dfrac{4}{5} = -1$, pas $1$ : le signe s'est perdu.\nRéponse : l'opposé de $x$ est $\\dfrac{5}{4}$ et son inverse est $-\\dfrac{4}{5}$.",
          schema: tableau(["", "x", "son opposé", "son inverse"], ["valeur", "−5/4", "5/4", "−4/5"]),
          micros: ["fraction_oppose", "fraction_inverse"],
        },
        {
          enonce: "Calcule et donne le résultat sous forme irréductible.\na) $D = -\\dfrac{9}{10} \\div \\dfrac{3}{5}$\nb) $E = \\dfrac{7}{4} \\div (-14)$",
          correction:
            "a) Diviser par $\\dfrac{3}{5}$, c'est multiplier par $\\dfrac{5}{3}$. Le signe : un négatif divisé par un positif donne un négatif.\n$-\\dfrac{9}{10} \\times \\dfrac{5}{3} = -\\dfrac{45}{30} = -\\dfrac{3}{2}$.\nRéponse : $D = -\\dfrac{3}{2}$.\nb) Diviser par $-14$, c'est multiplier par son inverse, $-\\dfrac{1}{14}$.\n$\\dfrac{7}{4} \\times \\left(-\\dfrac{1}{14}\\right) = -\\dfrac{7}{56} = -\\dfrac{1}{8}$.\nRéponse : $E = -\\dfrac{1}{8}$.\n⛔ Le piège du b) : multiplier par $-14$ au lieu de diviser, $\\dfrac{7}{4} \\times (-14) = -\\dfrac{49}{2}$. Diviser par $14$ doit rapprocher le nombre de zéro, pas l'en éloigner.",
          schema: tableau(["diviser par", "3/5", "−14"], ["multiplier par", "5/3", "−1/14"]),
          micros: ["fraction_diviser", "fraction_inverse"],
        },
        {
          enonce:
            "Nina s'entraîne sur une boucle de $\\dfrac{3}{5}$ km. Elle veut savoir combien de fractionnés de $\\dfrac{3}{10}$ km tiennent dans une boucle. Elle écrit : $\\dfrac{3}{5} \\div \\dfrac{3}{10} = \\dfrac{5}{3} \\times \\dfrac{3}{10} = \\dfrac{1}{2}$.\na) Sans calculer, pourquoi sa réponse est-elle impossible ?\nb) Quelle erreur a-t-elle faite ?\nc) Donne la bonne réponse.",
          correction:
            "a) $\\dfrac{3}{10}$ km est plus court que $\\dfrac{3}{5}$ km : un fractionné tient AU MOINS une fois dans la boucle. Le quotient doit être plus grand que $1$, pas égal à $\\dfrac{1}{2}$.\nb) Elle a retourné la PREMIÈRE fraction. C'est celle par laquelle on divise, la seconde, qu'il faut retourner.\nc) $\\dfrac{3}{5} \\times \\dfrac{10}{3} = \\dfrac{30}{15} = 2$.\n⭐ Contrôle sans calcul : $\\dfrac{3}{5} = \\dfrac{6}{10}$, et six dixièmes, c'est deux fois trois dixièmes.\n⛔ Le piège : « retourner une fraction » sans savoir laquelle. On retourne le DIVISEUR.\nRéponse : deux fractionnés de $\\dfrac{3}{10}$ km tiennent dans la boucle.",
          schema: intervalles(0, 0.8, [{ de: 0, a: 0.6, deInclus: true, aInclus: true, label: "la boucle : 3/5 km", color: BLEU }], 0.1, [
            { value: 0.3, label: "1", color: ORANGE },
            { value: 0.6, label: "2", color: ORANGE },
          ]),
          micros: ["fraction_diviser", "fraction_defi"],
        },
        {
          enonce:
            "Un club de football compte $360$ licenciés. Les $\\dfrac{5}{8}$ sont des jeunes de moins de $18$ ans, et les $\\dfrac{2}{5}$ des jeunes sont des filles.\na) Combien le club compte-t-il de jeunes ?\nb) Combien de jeunes filles ?\nc) Quelle fraction du club les jeunes filles représentent-elles ?",
          correction:
            "a) Les $\\dfrac{5}{8}$ de $360$ : $360 \\div 8 = 45$, puis $45 \\times 5 = 225$. Réponse : le club compte $225$ jeunes.\nb) Les $\\dfrac{2}{5}$ DES JEUNES, pas du club : $225 \\div 5 = 45$, puis $45 \\times 2 = 90$. Réponse : il y a $90$ jeunes filles.\nc) « Les $\\dfrac{2}{5}$ des $\\dfrac{5}{8}$ » : « des » veut dire « fois ». $\\dfrac{2}{5} \\times \\dfrac{5}{8} = \\dfrac{10}{40} = \\dfrac{1}{4}$.\n⭐ Contrôle : $\\dfrac{90}{360} = \\dfrac{1}{4}$, les deux chemins se rejoignent.\n⛔ Le piège : prendre les $\\dfrac{2}{5}$ du club entier, $\\dfrac{2}{5} \\times 360 = 144$. L'énoncé dit « des jeunes ».\nRéponse : les jeunes filles sont le quart du club.",
          schema: tableau(["", "le club", "les jeunes", "les jeunes filles"], ["effectif", "360", "225", "90"]),
          micros: ["fraction_quantite", "fraction_multiplier"],
        },
        {
          enonce:
            "Léa écrit : $-\\dfrac{2}{3} + \\dfrac{2}{5} = \\dfrac{-2 + 2}{3 + 5} = 0$.\na) Pour que la somme de deux nombres fasse $0$, que doivent-ils être ? Est-ce le cas ici ?\nb) Calcule la somme correctement.\nc) Quel nombre faut-il ajouter à $-\\dfrac{2}{3}$ pour trouver vraiment $0$ ?",
          correction:
            "a) Deux nombres dont la somme fait $0$ sont OPPOSÉS : même distance à zéro, signes contraires. Or $\\dfrac{2}{3} \\approx 0{,}67$ et $\\dfrac{2}{5} = 0{,}4$ : les distances diffèrent. La somme ne peut pas faire $0$.\nb) Dénominateur commun $15$ : $-\\dfrac{2}{3} = -\\dfrac{10}{15}$ et $\\dfrac{2}{5} = \\dfrac{6}{15}$.\n$-\\dfrac{10}{15} + \\dfrac{6}{15} = -\\dfrac{4}{15}$.\nc) L'opposé de $-\\dfrac{2}{3}$, c'est-à-dire $\\dfrac{2}{3}$.\n⛔ Le piège : additionner les numérateurs ET les dénominateurs. Les numérateurs s'annulent, mais ils comptent des tiers d'un côté, des cinquièmes de l'autre : des parts de tailles différentes.\nRéponse : $-\\dfrac{2}{3} + \\dfrac{2}{5} = -\\dfrac{4}{15}$ ; pour trouver $0$, il faut ajouter $\\dfrac{2}{3}$.",
          schema: intervalles(-1, 0.5, [{ de: -0.667, a: -0.267, deInclus: true, aInclus: true, label: "on avance de 2/5", color: BLEU }], 0.25, [
            { value: -0.667, label: "−2/3", color: ORANGE },
            { value: -0.267, label: "−4/15", color: ORANGE },
          ]),
          micros: ["fraction_additionner", "fraction_oppose", "fraction_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation à traduire en calculs. Je note ce que représente chaque fraction, et je réponds par une phrase.",
      rappel: [
        "Avant de calculer, je note ce que représente chaque fraction : une fraction DE QUOI ? Une part d'une part se multiplie.",
        "« Combien de fois une quantité tient dans une autre » : c'est une division.",
        "Un débit et une durée sont inverses : remplir $\\dfrac{1}{5}$ d'une cuve par heure, c'est $5$ heures pour la remplir.",
      ],
      exercices: [
        {
          titre: "La batterie du vélo",
          enonce:
            "La batterie d'un vélo à assistance électrique est chargée aux $\\dfrac{3}{4}$. Pleine, elle permet de rouler $80$ km. L'aller-retour jusqu'au collège consomme les $\\dfrac{2}{5}$ d'une batterie pleine.\na) Quelle distance fait l'aller-retour ?\nb) Quelle fraction de la batterie reste-t-il après l'aller-retour ?\nc) La recharge ajoute $\\dfrac{1}{8}$ de batterie toutes les $10$ minutes. Combien de temps faut-il pour la remplir complètement ?\nd) Avec la charge de départ, aurait-on pu faire deux allers-retours sans recharger ?",
          correction:
            "a) Les $\\dfrac{2}{5}$ de $80$ km : $80 \\div 5 = 16$, puis $16 \\times 2 = 32$. Réponse : l'aller-retour fait $32$ km.\nb) J'enlève ce que le trajet consomme : $\\dfrac{3}{4} - \\dfrac{2}{5} = \\dfrac{15}{20} - \\dfrac{8}{20} = \\dfrac{7}{20}$. Réponse : il reste les $\\dfrac{7}{20}$ de la batterie.\nc) Pour être pleine, il manque $1 - \\dfrac{7}{20} = \\dfrac{13}{20}$ de batterie.\nCombien de fois $\\dfrac{1}{8}$ tient dans $\\dfrac{13}{20}$ : c'est une division, donc je multiplie par l'inverse de $\\dfrac{1}{8}$, qui est $8$. $\\dfrac{13}{20} \\times 8 = \\dfrac{104}{20} = 5{,}2$.\nIl faut $5{,}2$ fois $10$ minutes. Réponse : la recharge complète dure $52$ minutes.\nd) Deux allers-retours consomment $2 \\times \\dfrac{2}{5} = \\dfrac{4}{5}$ de batterie. Or $\\dfrac{4}{5} = \\dfrac{16}{20}$ et $\\dfrac{3}{4} = \\dfrac{15}{20}$ : il manque $\\dfrac{1}{20}$ de batterie, soit $4$ km. Réponse : non, la batterie serait vide $4$ km avant l'arrivée.\n⛔ Le piège du c) : diviser $\\dfrac{7}{20}$, ce qui est DÉJÀ dans la batterie. On recharge ce qui MANQUE.",
          schema: intervalles(0, 1, [
            { de: 0.35, a: 0.75, deInclus: true, aInclus: true, label: "l'aller-retour : 2/5", color: BLEU },
            { de: 0.35, a: 1, deInclus: true, aInclus: true, label: "la recharge : 13/20", color: ORANGE },
          ], 0.25, [
            { value: 0.35, label: "7/20", color: ORANGE },
            { value: 0.75, label: "3/4", color: ORANGE },
          ]),
          micros: ["fraction_quantite", "fraction_additionner", "fraction_diviser", "fraction_defi"],
        },
        {
          titre: "L'eau de la Terre",
          enonce:
            "Sur toute l'eau de la Terre, environ $\\dfrac{1}{40}$ seulement est de l'eau douce. Et de cette eau douce, environ les $\\dfrac{2}{3}$ sont gelés dans les glaciers et les calottes polaires.\na) Quelle fraction de toute l'eau de la Terre est gelée ?\nb) Quelle fraction de toute l'eau est de l'eau douce non gelée ?\nc) On représente toute l'eau de la Terre par une cuve de $1\\,200$ L. Combien de litres d'eau douce, d'eau gelée, d'eau douce non gelée ?\nd) Combien de fois plus d'eau salée que d'eau douce non gelée y a-t-il ?",
          correction:
            "a) « Les $\\dfrac{2}{3}$ de $\\dfrac{1}{40}$ » : « de » veut dire « fois ». $\\dfrac{2}{3} \\times \\dfrac{1}{40} = \\dfrac{2}{120} = \\dfrac{1}{60}$. Réponse : $\\dfrac{1}{60}$ de l'eau de la Terre est gelée.\nb) L'eau douce moins l'eau gelée : $\\dfrac{1}{40} - \\dfrac{1}{60} = \\dfrac{3}{120} - \\dfrac{2}{120} = \\dfrac{1}{120}$. Réponse : $\\dfrac{1}{120}$ seulement.\n⭐ Autre chemin : le tiers restant de l'eau douce, $\\dfrac{1}{3} \\times \\dfrac{1}{40} = \\dfrac{1}{120}$.\nc) $1\\,200 \\div 40 = 30$ L d'eau douce ; $1\\,200 \\div 60 = 20$ L gelés ; $1\\,200 \\div 120 = 10$ L d'eau douce non gelée. Contrôle : $20 + 10 = 30$.\nd) L'eau salée : $1 - \\dfrac{1}{40} = \\dfrac{39}{40}$. Combien de fois $\\dfrac{1}{120}$ tient dedans : je multiplie par l'inverse, $\\dfrac{39}{40} \\times 120 = 117$.\n⭐ Contrôle avec la cuve : $1\\,200 - 30 = 1\\,170$ L d'eau salée, et $1\\,170 \\div 10 = 117$.\n⛔ Le piège du a) : additionner $\\dfrac{1}{40}$ et $\\dfrac{2}{3}$. Les $\\dfrac{2}{3}$ ne sont pas une part de toute l'eau : c'est une part de l'eau DOUCE. Une part d'une part se multiplie.\nRéponse : il y a environ $117$ fois plus d'eau salée que d'eau douce non gelée.",
          schema: tableau(["eau", "douce", "gelée", "douce non gelée", "salée"], ["litres", "30", "20", "10", "1 170"], true),
          micros: ["fraction_multiplier", "fraction_quantite", "fraction_additionner", "fraction_diviser", "fraction_defi"],
        },
        {
          titre: "Le programme qui retourne",
          enonce:
            "Voici un programme de calcul.\n• Choisir un nombre non nul.\n• Prendre son inverse.\n• Soustraire $\\dfrac{3}{4}$.\n• Multiplier le résultat par $-2$.\na) Applique le programme au nombre $\\dfrac{4}{5}$.\nb) Applique-le au nombre $-\\dfrac{2}{3}$.\nc) Quel nombre faut-il choisir pour obtenir $0$ ?\nd) Pourquoi ne peut-on pas choisir $0$ ?",
          correction:
            "a) L'inverse de $\\dfrac{4}{5}$ est $\\dfrac{5}{4}$.\n$\\dfrac{5}{4} - \\dfrac{3}{4} = \\dfrac{2}{4} = \\dfrac{1}{2}$, puis $\\dfrac{1}{2} \\times (-2) = -1$. Réponse : on obtient $-1$.\nb) L'inverse de $-\\dfrac{2}{3}$ est $-\\dfrac{3}{2}$ : je retourne, je garde le signe.\n$-\\dfrac{3}{2} - \\dfrac{3}{4} = -\\dfrac{6}{4} - \\dfrac{3}{4} = -\\dfrac{9}{4}$, puis $-\\dfrac{9}{4} \\times (-2) = \\dfrac{18}{4} = \\dfrac{9}{2}$. Réponse : on obtient $\\dfrac{9}{2}$.\nc) Je remonte le programme. Un produit par $-2$ fait $0$ seulement si l'autre facteur fait $0$ : il faut que l'inverse moins $\\dfrac{3}{4}$ fasse $0$, donc que l'inverse soit $\\dfrac{3}{4}$. Le nombre de départ est l'inverse de $\\dfrac{3}{4}$, c'est-à-dire $\\dfrac{4}{3}$.\nContrôle : $\\dfrac{3}{4} - \\dfrac{3}{4} = 0$ et $0 \\times (-2) = 0$. Réponse : il faut choisir $\\dfrac{4}{3}$.\nd) $0$ n'a pas d'inverse : aucun nombre multiplié par $0$ ne donne $1$. Le programme bloque dès la deuxième ligne.\n⛔ Le piège du b) : prendre $\\dfrac{3}{2}$ pour inverse de $-\\dfrac{2}{3}$. Le signe reste : l'inverse d'un négatif est négatif.",
          schema: trace(["étape", "avec 4/5", "avec −2/3", "avec 4/3"], [["l'inverse", "5/4", "−3/2", "3/4"], ["moins 3/4", "1/2", "−9/4", "0"], ["fois −2", "−1", "9/2", "0"]]),
          micros: ["fraction_inverse", "fraction_additionner", "fraction_multiplier", "fraction_defi"],
        },
        {
          titre: "La citerne du jardin",
          enonce:
            "Pour arroser un jardin partagé, on remplit une citerne avec deux pompes. Seule, la pompe A la remplit en $3$ heures ; seule, la pompe B la remplit en $6$ heures.\na) Quelle fraction de la citerne chaque pompe remplit-elle en une heure ?\nb) Les deux pompes marchent ensemble. Quelle fraction de la citerne remplissent-elles en une heure ? En combien de temps la citerne est-elle pleine ?\nc) Une fuite viderait la citerne pleine en $12$ heures. Avec cette fuite, combien de temps faut-il aux deux pompes pour la remplir ? Donne la réponse en heures et minutes.",
          correction:
            "a) En $3$ heures, la pompe A remplit $1$ citerne : en une heure, elle en remplit $\\dfrac{1}{3}$. De même, la pompe B remplit $\\dfrac{1}{6}$ de citerne par heure.\nb) Ensemble, leurs débits s'ajoutent : $\\dfrac{1}{3} + \\dfrac{1}{6} = \\dfrac{2}{6} + \\dfrac{1}{6} = \\dfrac{3}{6} = \\dfrac{1}{2}$ citerne par heure.\nCombien de fois $\\dfrac{1}{2}$ tient dans $1$ citerne : $1 \\div \\dfrac{1}{2} = 2$, l'inverse du débit. Réponse : ensemble, elles remplissent la citerne en $2$ heures.\nc) La fuite retire $\\dfrac{1}{12}$ de citerne par heure : $\\dfrac{1}{2} - \\dfrac{1}{12} = \\dfrac{6}{12} - \\dfrac{1}{12} = \\dfrac{5}{12}$ de citerne par heure.\nLe temps est l'inverse du débit : $1 \\div \\dfrac{5}{12} = \\dfrac{12}{5} = 2{,}4$ heures.\n$0{,}4$ heure, c'est $0{,}4 \\times 60 = 24$ minutes. Réponse : il faut $2$ h $24$ min.\n⛔ Le piège du b) : ajouter les durées, $3 + 6 = 9$ heures. À deux pompes, on va plus VITE qu'avec la plus rapide seule : moins de $3$ heures.\n⛔ Et au c) : lire $2{,}4$ h comme « $2$ h $40$ min ». Une heure a $60$ minutes, pas $100$.",
          schema: tableau(["débit", "A", "B", "A et B", "avec la fuite"], ["par heure", "1/3", "1/6", "1/2", "5/12"], true),
          micros: ["fraction_additionner", "fraction_inverse", "fraction_diviser", "fraction_defi"],
        },
      ],
    },
  ],
};
