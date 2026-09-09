// ─── Fiche de cours : la racine carrée (2de) ──────────────────────────────────
//
// Quatrième fiche de seconde. Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/racine-carree.bank.ts
// (notion racine_carree_2de), et sur la 5e comme étalon.
//
// ⭐ PRIORITÉ DONNÉE PAR LE CONTRÔLE COMMUN de mars 2025 : sa question 2.3
// demande $\sqrt{75} - \sqrt{48}$ sous la forme $a\sqrt{3}$. Il faut simplifier
// CHAQUE racine, puis soustraire des radicaux identiques — les deux gestes que
// la fiche enchaîne.
//
// ⛔ LE PIÈGE CENTRAL, ET IL STRUCTURE LA FICHE (Frédéric, 08/09/2026) : une
// racine NE S'ADDITIONNE PAS avec une autre. $\sqrt{2} + \sqrt{3}$ reste tel
// quel, et surtout ne vaut PAS $\sqrt{5}$ — sauf si les radicaux sont les mêmes,
// et alors $\sqrt{2} + 3\sqrt{2} = 4\sqrt{2}$.
//
// ⭐ POURQUOI L'ERREUR EST TENACE : elle imite la règle du PRODUIT, qui elle est
// vraie. La fiche casse ce parallèle en le vérifiant sur des carrés parfaits.
//
// Micro-compétences couvertes :
// - racine_calcul         → définition, figure, exos 1-2
// - racine_domaine        → propriété « refuse les négatifs » (la courbe), exos 3
//   ⭐ Ce micro a ete CREE pour cette fiche : Frederic introduit la fonction
//   des le chapitre de la racine, la ou les manuels attendent les fonctions
//   de reference. « Je fais calculer l'image de 4 et je montre que -1 n'a pas
//   d'image. » La regle cesse d'etre un decret, elle se voit.
// - racine_carre_de_a2    → propriété « La racine d'un carré », exos 3
// - racine_produit        → propriété « Le produit passe », usages, exos 4-5
// - racine_simplification → propriété « Sortir un carré », méthode 2, exemples 1-2, exos 6-7
// - racine_somme          → propriété « La somme NE passe pas », méthode 3, exemples 3-4, exos 8-9-10

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

/**
 * Un tableau de données — HTML, donc lisible même dans un bloc de 80 px.
 *
 * ⛔ C'EST LE SEUL CANVAS UTILISABLE DANS `methode` ET `exemples` : ces blocs
 * font 80 px de large, et un canvas SVG y rendrait ses textes à 4 px.
 */
function tableau(headers: string[], rows: { label: string; values: (string | number)[] }[], title?: string) {
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

/**
 * Une droite graduée, pour poser les racines parmi les nombres ordinaires.
 * ⛔ SVG : réservée à `figure`, `proprietes` et `usages`.
 */
function droite(points: { value: number; label: string; color?: string }[], min = 0, max = 5) {
  return (
    <CanvasRenderer
      figure={{
        kind: "number_line",
        // ⛔ 280 ET NON 320. Les nombres d'une droite graduee sont ecrits en 14 :
        // dans le bloc `usages`, large de 235 px, un viewBox de 320 les rendait a
        // 10,3 px. Il faut 235 x 14 / 11 = 299 au plus, d'ou 280.
        //
        // ⚠️ Et la largeur d'un bloc VARIE d'une fiche a l'autre : ici `figure`
        // fait 302 px quand elle en faisait 130 sur la fiche des fonctions. On
        // mesure par fiche, on ne generalise pas.
        size: { width: 280, height: 100 },
        min,
        max,
        step: 1,
        points,
        display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
      }}
    />
  );
}

/**
 * La courbe de la fonction racine carrée.
 *
 * ⭐ Elle sert un point que Frédéric introduit ICI et que les manuels reportent
 * au chapitre des fonctions de référence : $4$ a une image, $-1$ n'en a pas. La
 * règle « pas de racine d'un négatif » cesse d'être un décret, elle se VOIT —
 * la courbe n'existe pas à gauche de zéro.
 *
 * ⛔ Type « points » et non « quadratique » : le canvas ne connaît pas la racine
 * comme fonction, on lui donne donc les points calculés.
 * ⛔ Et viewBox sous 225, huit unités par axe au plus.
 */
function courbeRacine() {
  const points: { x: number; y: number }[] = [];
  for (let x = 0; x <= 6; x += 0.25) points.push({ x, y: Math.sqrt(x) });
  return (
    <CanvasRenderer
      figure={{
        kind: "fonctionGraphique",
        size: { width: 215, height: 175 },
        xmin: -2,
        xmax: 6,
        ymin: -1,
        ymax: 3,
        grille: true,
        courbes: [{ id: "r", type: "points", couleur: "#2563eb", points }],
        misesEnEvidence: [{ point: { x: 4, y: 2, label: "2", couleur: "#dc2626" } }],
      }}
    />
  );
}

export const ficheRacinesSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "racine-carree-2de",
  titre: "La racine carrée",
  accroche:
    "La racine carrée traverse les produits sans effort — $\\sqrt{4 \\times 9} = 2 \\times 3$ — mais elle butte sur les sommes. C'est toute la difficulté du chapitre : une règle vraie d'un côté, fausse de l'autre, et rien dans l'écriture ne prévient.",
  identite: [
    { label: "Mots clés", valeur: "Radical, carré parfait, simplifier, radicaux identiques" },
    { label: "Le secret", valeur: "Le produit passe, la somme non" },
    { label: "Outil", valeur: "La liste des carrés parfaits" },
  ],

  definition: {
    texte:
      "Pour un nombre $a$ positif ou nul, $\\sqrt{a}$ est le nombre POSITIF dont le carré vaut $a$. C'est un nombre comme un autre : $\\sqrt{2}$ vaut environ $1{,}41$ et se place entre $1$ et $2$ sur la droite graduée. Un nombre négatif, lui, n'a pas de racine carrée.",
  },

  figure: {
    schema: droite([
      { value: 1.41, label: "√2", color: "#dc2626" },
      { value: 1.73, label: "√3", color: "#b45309" },
      { value: 3, label: "√9", color: "#15803d" },
    ]),
    legende:
      "$\\sqrt{2} \\approx 1{,}41$, $\\sqrt{3} \\approx 1{,}73$, et $\\sqrt{9} = 3$ tout rond. Une racine n'est pas un symbole étrange : c'est un point sur la droite.",
  },

  proprietes: [
    {
      titre: "Les carrés parfaits",
      texte:
        "Certaines racines tombent juste. Les connaître par cœur est ce qui permet de repérer un carré caché dans un nombre.",
      schema: tableau(
        ["1", "4", "9", "16", "25", "36", "49", "64", "81", "100"],
        [{ label: "√a", values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }],
        "À connaître par cœur",
      ),
    },
    {
      titre: "Une fonction qui refuse les négatifs",
      texte:
        "Sur la courbe, $4$ a bien une image : $\\sqrt{4} = 2$. Mais $-1$ n'en a AUCUNE — la courbe s'arrête à zéro et ne va pas à gauche. C'est cela, « pas de racine d'un négatif ».",
      schema: courbeRacine(),
    },
    {
      titre: "Le PRODUIT passe",
      texte:
        "$\\sqrt{a \\times b} = \\sqrt{a} \\times \\sqrt{b}$. C'est cette règle qui permet de simplifier — et c'est aussi elle qui rend l'erreur sur la somme si tentante.",
      schema: tableau(
        ["√(4 × 9)", "√4 × √9"],
        [{ label: "vaut", values: ["√36 = 6", "2 × 3 = 6"] }],
        "Les deux donnent 6 ✓",
      ),
    },
    {
      titre: "⛔ La SOMME ne passe pas",
      texte:
        "$\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$. On le vérifie sur des carrés parfaits, où tout se calcule : il n'y a pas de doute possible.",
      schema: tableau(
        ["√(9 + 16)", "√9 + √16"],
        [{ label: "vaut", values: ["√25 = 5", "3 + 4 = 7"] }],
        "5 ≠ 7 : la règle est FAUSSE",
      ),
    },
    {
      titre: "La racine d'un carré",
      texte:
        "$\\sqrt{a^2} = |a|$, et non $a$ : la racine rend toujours un résultat POSITIF. Pour $a$ négatif, elle rend son opposé.",
      schema: tableau(
        ["5", "−5", "3", "−3"],
        [{ label: "√(a²)", values: [5, 5, 3, 3] }],
        "Toujours positif",
      ),
    },
  ],

  reel: {
    texte:
      "Pour vérifier qu'un mur est bien d'équerre, un maçon mesure 3 m sur un côté, 4 m sur l'autre, et contrôle que la diagonale fait 5 m — car $\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$. ⚠️ Et cela n'a rien à voir avec $\\sqrt{9} + \\sqrt{16} = 7$ : on additionne les CARRÉS avant de prendre la racine, jamais les racines entre elles.",
  },

  historique: {
    texte:
      "Les Grecs ont découvert que $\\sqrt{2}$ ne s'écrit avec aucune fraction — la légende dit que cette découverte fut si dérangeante qu'on tenta de l'étouffer. Le symbole $\\sqrt{\\phantom{x}}$, lui, date de 1525 : c'est un $r$ déformé, pour « radix », la racine en latin.",
  },

  methode: [
    {
      titre: "Je cherche un carré en facteur",
      texte:
        "Je décompose le nombre sous le radical en cherchant le plus GRAND carré parfait qui le divise. Pour $50$ : c'est $25$.",
      schema: tableau(
        ["50", "12", "75", "48"],
        [{ label: "carré caché", values: ["25 × 2", "4 × 3", "25 × 3", "16 × 3"] }],
      ),
    },
    {
      titre: "Je le sors du radical",
      texte:
        "$\\sqrt{25 \\times 2} = \\sqrt{25} \\times \\sqrt{2} = 5\\sqrt{2}$. Le carré sort en devenant sa racine ; le reste demeure dessous.",
      schema: tableau(
        ["√50", "√12", "√75", "√48"],
        [{ label: "devient", values: ["5√2", "2√3", "5√3", "4√3"] }],
      ),
    },
    {
      titre: "J'additionne les radicaux IDENTIQUES",
      texte:
        "Une fois simplifiés, deux termes de même radical s'additionnent par leurs coefficients — exactement comme $x + 3x = 4x$.",
      schema: tableau(
        ["√75 − √48", "5√3 − 4√3"],
        [{ label: "vaut", values: ["√3", "√3"] }],
        "On simplifie AVANT",
      ),
    },
  ],

  usages: [
    {
      titre: "Simplifier une écriture",
      detail:
        "$\\sqrt{8} = 2\\sqrt{2}$ : la forme simplifiée est plus courte, et surtout elle révèle le radical commun.",
      schema: tableau(
        ["√8", "√18", "√32"],
        [{ label: "devient", values: ["2√2", "3√2", "4√2"] }],
        "Même radical : √2",
      ),
    },
    {
      titre: "Additionner",
      detail:
        "$\\sqrt{8} + \\sqrt{18} = 2\\sqrt{2} + 3\\sqrt{2} = 5\\sqrt{2}$. Impossible à voir sans simplifier d'abord.",
      schema: droite([{ value: 2.83, label: "√8", color: "#dc2626" }, { value: 4.24, label: "√18", color: "#b45309" }], 0, 6),
    },
    {
      titre: "Calculer une longueur",
      detail:
        "Une diagonale, une hypoténuse : $\\sqrt{a^2 + b^2}$. On additionne les CARRÉS, puis on prend la racine.",
      schema: tableau(
        ["3 et 4", "6 et 8", "5 et 12"],
        [{ label: "diagonale", values: [5, 10, 13] }],
      ),
    },
  ],

  exemples: [
    {
      titre: "Simplifier",
      donnees: "$\\sqrt{8}$.",
      question: "Écrire cette racine sous forme simplifiée.",
      schema: tableau(["8"], [{ label: "=", values: ["4 × 2"] }]),
      solution:
        "On cherche le plus grand carré parfait qui divise $8$ : c'est $4$. Donc $\\sqrt{8} = \\sqrt{4 \\times 2} = \\sqrt{4} \\times \\sqrt{2} = 2\\sqrt{2}$.",
    },
    {
      titre: "Un carré plus grand",
      donnees: "$\\sqrt{72}$.",
      question: "Simplifier au maximum.",
      schema: tableau(["72"], [{ label: "=", values: ["36 × 2"] }]),
      solution:
        "$72 = 36 \\times 2$, et $36$ est le plus GRAND carré qui le divise : $\\sqrt{72} = 6\\sqrt{2}$. ⚠️ Prendre $4$ au lieu de $36$ donnerait $2\\sqrt{18}$ — exact, mais pas simplifié jusqu'au bout.",
    },
    {
      titre: "Une somme impossible",
      donnees: "$\\sqrt{2} + \\sqrt{3}$.",
      question: "Peut-on simplifier ?",
      schema: tableau(
        ["√2 + √3", "√5"],
        [{ label: "vaut environ", values: ["3,15", "2,24"] }],
      ),
      solution:
        "Non. Les radicaux diffèrent — $2$ et $3$ — donc rien ne se regroupe. Et surtout $\\sqrt{2} + \\sqrt{3} \\neq \\sqrt{5}$ : les valeurs approchées le montrent, $3{,}15$ contre $2{,}24$. La réponse est $\\sqrt{2} + \\sqrt{3}$, telle quelle.",
    },
    {
      titre: "La question du contrôle",
      donnees: "$C = \\sqrt{75} - \\sqrt{48}$.",
      question: "Écrire $C$ sous la forme $a\\sqrt{3}$.",
      schema: tableau(
        ["√75", "√48"],
        [{ label: "devient", values: ["5√3", "4√3"] }],
      ),
      solution:
        "On simplifie chacune : $75 = 25 \\times 3$ donne $5\\sqrt{3}$, et $48 = 16 \\times 3$ donne $4\\sqrt{3}$. Le radical est le même, on soustrait les coefficients : $C = 5\\sqrt{3} - 4\\sqrt{3} = \\sqrt{3}$, donc $a = 1$.",
    },
  ],

  pieges: [
    "⛔ $\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$. L'erreur imite la règle du PRODUIT, qui elle est vraie — c'est ce qui la rend tenace. Contrôle imparable : $\\sqrt{9} + \\sqrt{16} = 7$, alors que $\\sqrt{25} = 5$.",
    "⛔ $\\sqrt{2} + \\sqrt{3}$ ne se simplifie pas, et c'est une RÉPONSE COMPLÈTE. Laisser une racine dans le résultat n'est pas un échec.",
    "⛔ On SIMPLIFIE avant d'additionner. $\\sqrt{75} - \\sqrt{48}$ semble irréductible ; écrit $5\\sqrt{3} - 4\\sqrt{3}$, c'est immédiat.",
    "⛔ $\\sqrt{a^2} = |a|$, pas $a$. Une racine ne rend jamais un résultat négatif.",
    "⛔ On cherche le PLUS GRAND carré en facteur. $\\sqrt{72} = 2\\sqrt{18}$ est exact mais pas fini : c'est $6\\sqrt{2}$.",
  ],

  aRetenir: [
    "$\\sqrt{a}$ est le nombre POSITIF dont le carré vaut $a$.",
    "$\\sqrt{a \\times b} = \\sqrt{a} \\times \\sqrt{b}$ — le produit passe.",
    "$\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$ — la somme ne passe pas.",
    "Simplifier : sortir le plus grand carré parfait, $\\sqrt{50} = 5\\sqrt{2}$.",
    "$a\\sqrt{k} + b\\sqrt{k} = (a+b)\\sqrt{k}$ — comme $x + 3x = 4x$.",
    "Radicaux différents : on n'additionne pas, on laisse tel quel.",
  ],

  entrainement: [
    {
      question: "Combien vaut $\\sqrt{64}$ ?",
      correction: "$8$, car $8^2 = 64$. C'est un carré parfait, la racine tombe juste.",
    },
    {
      question: "Pourquoi $\\sqrt{-9}$ n'existe-t-elle pas ?",
      correction:
        "Aucun nombre au carré ne donne un résultat négatif : un carré est toujours positif ou nul. La racine carrée n'est définie que pour $a \\geqslant 0$.",
    },
    {
      question: "Combien vaut $\\sqrt{(-7)^2}$ ?",
      correction:
        "$(-7)^2 = 49$, donc $\\sqrt{49} = 7$. On retient $\\sqrt{a^2} = |a|$ : le résultat est POSITIF, ce n'est pas $-7$.",
    },
    {
      question: "Calculer $\\sqrt{4} \\times \\sqrt{25}$.",
      correction:
        "$\\sqrt{4} \\times \\sqrt{25} = 2 \\times 5 = 10$. On peut aussi écrire $\\sqrt{4 \\times 25} = \\sqrt{100} = 10$ : le produit passe dans les deux sens.",
    },
    {
      question: "Est-il vrai que $\\sqrt{16 + 9} = \\sqrt{16} + \\sqrt{9}$ ?",
      correction:
        "Non. À gauche : $\\sqrt{25} = 5$. À droite : $4 + 3 = 7$. La racine ne se distribue PAS sur une somme.",
    },
    {
      question: "Simplifier $\\sqrt{18}$.",
      correction:
        "$18 = 9 \\times 2$, et $9$ est un carré parfait : $\\sqrt{18} = 3\\sqrt{2}$.",
    },
    {
      question: "Simplifier $\\sqrt{200}$.",
      correction:
        "$200 = 100 \\times 2$, et $100$ est le plus grand carré qui le divise : $\\sqrt{200} = 10\\sqrt{2}$. Passer par $4 \\times 50$ donnerait $2\\sqrt{50}$, exact mais pas fini.",
    },
    {
      question: "Combien vaut $\\sqrt{5} + 4\\sqrt{5}$ ?",
      correction:
        "Même radical, donc on additionne les coefficients — en n'oubliant pas le $1$ sous-entendu : $1\\sqrt{5} + 4\\sqrt{5} = 5\\sqrt{5}$.",
    },
    {
      question: "Combien vaut $\\sqrt{3} + \\sqrt{7}$ ?",
      correction:
        "Rien de plus : les radicaux diffèrent, on ne peut pas les regrouper. La réponse est $\\sqrt{3} + \\sqrt{7}$ — et surtout pas $\\sqrt{10}$.",
    },
    {
      question:
        "Sur la courbe de la fonction racine carrée, quelle est l'image de $9$ ? Et celle de $-4$ ?",
      correction:
        "L'image de $9$ est $\\sqrt{9} = 3$. Celle de $-4$ n'existe pas : la courbe ne va pas à gauche de zéro, donc $-4$ n'a AUCUNE image. Le domaine de la fonction racine carrée est $[0\\,;\\,+\\infty[$.",
    },
    {
      question: "Écrire $\\sqrt{50} + \\sqrt{8}$ sous la forme $a\\sqrt{2}$.",
      correction:
        "On simplifie d'abord : $\\sqrt{50} = 5\\sqrt{2}$ et $\\sqrt{8} = 2\\sqrt{2}$. Le radical est le même, on additionne les coefficients : $5\\sqrt{2} + 2\\sqrt{2} = 7\\sqrt{2}$, donc $a = 7$.",
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesRacinesSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Racine carrée - 2de",
    section: {
      type: "objectif",
      phrase: "Simplifier une racine, et savoir quand deux racines s'additionnent",
      sousPhrase:
        "Le produit passe, la somme non. $\\sqrt{2} + \\sqrt{3}$ reste tel quel ; $\\sqrt{2} + 3\\sqrt{2}$ fait $4\\sqrt{2}$.",
    },
  },
];
