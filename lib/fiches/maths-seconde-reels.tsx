// ─── Fiche de cours : nombres réels, intervalles et valeur absolue (2de) ──────
//
// Dix-septième fiche de seconde (21/09/2026). Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/reels-intervalles.bank.ts (notion
// reels_intervalles). Écrite APRÈS sa feuille d'exercices
// (lib/fiches-exercices/maths-seconde-reels.tsx), dans l'ordre demandé par
// Frédéric : « toutes les fiches exercices, puis les deux fiches de cours ».
// ⛔ Aucun nombre de la feuille n'est repris ici.
//
// ⭐ L'IDÉE DIRECTRICE : UNE SEULE IMAGE, LA DROITE GRADUÉE. Un réel est un
// point de la droite ; un intervalle en est un morceau sans trou ; une valeur
// absolue y mesure un écart. Chaque propriété se dessine donc sur la même
// droite — c'est l'option `intervalles` du canvas `number_line`, ajoutée le
// 21/09 : le crochet du dessin est celui qu'on écrit.
//
// ⭐ LA VALEUR ABSOLUE EST ENSEIGNÉE EN DÉBUT D'ANNÉE (Frédéric, 04/09) et se
// résout par la DISTANCE — sur la droite ou par le calcul, jamais sur la courbe.
//
// ⛔ LE PIÈGE CENTRAL : |x + 5| est la distance à −5, pas à 5.
//
// ⛔ Canvas SVG (droite graduée) seulement dans `figure`, `proprietes` et
// `usages`, cadre de 240 : dans `methode` et `exemples` (80 px), seuls les
// tableaux HTML sont lisibles. Voir la note « largeur des blocs ».
//
// Micro-compétences couvertes :
// - reels_ensembles         → définition, propriétés 1-2, exemple 1, exos 1-2
// - reels_droite_graduee    → figure, méthode 1, exo 3
// - intervalle_representer  → propriété 3, usage 1, exemple 2, exos 4-5
// - intervalle_appartenance → propriété 4, exo 6
// - valeur_absolue_distance → propriétés 5-6, usages 2-3, exemples 3-4, exos 7-9
// - reels_encadrement       → propriété 7, exo 10

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

/** Un tableau HTML : lisible partout, même dans un bloc de 80 px.
 *  ⛔ Du texte NU, sans dollar. ⛔ Deux colonnes de valeurs au plus. */
function tableau(
  headers: [string, string],
  rows: { label: string; values: [string, string] }[],
  title?: string,
) {
  return (
    <CanvasRenderer
      figure={{ kind: "tableau_donnees", title, headers, rows, display: { striped: true, compact: true } }}
    />
  );
}

/** La droite graduée, avec des points et/ou un intervalle.
 *  ⛔ SVG : seulement dans `figure`, `proprietes`, `usages`. Cadre de 240 et
 *  huit graduations au plus. */
function droite(
  min: number,
  max: number,
  options: {
    points?: { value: number; label?: string; color?: string }[];
    intervalle?: { de?: number; a?: number; deInclus?: boolean; aInclus?: boolean; label?: string };
  },
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min,
        max,
        step: 1,
        size: { width: 240, height: 80 },
        points: options.points ?? [],
        intervalles: options.intervalle ? [options.intervalle] : [],
      }}
    />
  );
}

export const ficheReelsSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "reels-intervalles",
  titre: "Nombres réels, intervalles et valeur absolue",
  accroche:
    "Tous les nombres ont leur place sur une droite graduée. Un intervalle est un morceau de cette droite. Une valeur absolue mesure un écart sur cette droite. Trois outils, une seule image : la droite.",
  identite: [
    { label: "Mots clés", valeur: "N, Z, D, Q, R, intervalle, crochet, valeur absolue, distance" },
    { label: "Le secret", valeur: "Le crochet tourné vers le nombre le contient" },
    { label: "Outil", valeur: "La droite graduée : on dessine avant d'écrire" },
  ],

  definition: {
    texte:
      "L'ensemble des nombres RÉELS, noté $\\mathbb{R}$, contient tous les nombres qu'on peut placer sur une droite graduée. Un INTERVALLE est un morceau de la droite, sans trou : $[1\\,;\\,4[$ contient tous les réels $x$ tels que $1 \\leqslant x < 4$. La VALEUR ABSOLUE $|a - b|$ est la distance entre $a$ et $b$ sur la droite : elle n'est jamais négative.",
  },

  figure: {
    schema: droite(-1, 6, { intervalle: { de: 1, a: 4, deInclus: true, aInclus: false, label: "[1 ; 4[" } }),
    legende:
      "L'intervalle $[1\\,;\\,4[$ : le crochet est tourné vers $1$, donc $1$ est compris. Il est tourné à l'envers devant $4$, donc $4$ n'est pas compris. Tous les nombres entre les deux sont dedans.",
  },

  proprietes: [
    {
      titre: "Cinq ensembles emboîtés",
      texte:
        "$\\mathbb{N}$ : les entiers positifs ($0$, $1$, $2$…). $\\mathbb{Z}$ : tous les entiers, négatifs compris. $\\mathbb{D}$ : les décimaux, dont l'écriture s'arrête. $\\mathbb{Q}$ : les fractions. $\\mathbb{R}$ : tous les nombres de la droite. Chacun contient le précédent : $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$.",
      schema: tableau(
        ["exemple", "pas dans"],
        [
          { label: "N", values: ["12", "—"] },
          { label: "Z", values: ["−6", "N"] },
          { label: "D", values: ["2,75", "Z"] },
          { label: "Q", values: ["5/7", "D"] },
          { label: "R", values: ["√3", "Q"] },
        ],
        "Un nombre de chaque ensemble",
      ),
      micros: ["reels_ensembles"],
    },
    {
      titre: "Décimal ou pas ?",
      texte:
        "Un nombre DÉCIMAL a une écriture qui s'arrête. Une fraction irréductible est décimale quand son dénominateur n'a pas d'autre facteur que $2$ et $5$. $\\dfrac{9}{20} = 0{,}45$ est décimal. $\\dfrac{1}{6} = 0{,}1666\\ldots$ ne l'est pas : le facteur $3$ de $6$ l'en empêche.",
      schema: tableau(
        ["dénominateur", "décimal ?"],
        [
          { label: "9/20", values: ["20 = 2 × 2 × 5", "oui : 0,45"] },
          { label: "1/6", values: ["6 = 2 × 3", "non : 0,1666…"] },
        ],
        "Tout se joue au dénominateur",
      ),
      micros: ["reels_ensembles"],
    },
    {
      titre: "Lire un intervalle",
      texte:
        "Le crochet tourné vers le nombre le CONTIENT : on écrit $\\leqslant$. Tourné à l'envers, il l'EXCLUT : on écrit $<$. Du côté de l'infini, le crochet est toujours ouvert, car l'infini n'est pas un nombre qu'on atteint.",
      schema: tableau(
        ["inégalité", "bornes"],
        [
          { label: "[2 ; 5]", values: ["2 ≤ x ≤ 5", "2 et 5 compris"] },
          { label: "]2 ; 5[", values: ["2 < x < 5", "2 et 5 exclus"] },
          { label: "[2 ; +∞[", values: ["x ≥ 2", "2 compris"] },
          { label: "]−∞ ; 5[", values: ["x < 5", "5 exclu"] },
        ],
        "Quatre intervalles à lire",
      ),
      micros: ["intervalle_representer"],
    },
    {
      titre: "Appartenir à un intervalle",
      texte:
        "Le symbole $\\in$ se lit « appartient à ». $5 \\in [2\\,;\\,5]$, mais $5 \\notin [2\\,;\\,5[$. Et $4{,}99 \\in [2\\,;\\,5[$ : seul le nombre $5$ lui-même est exclu, pas ses voisins.",
      schema: droite(0, 7, { intervalle: { de: 2, a: 5, deInclus: true, aInclus: false, label: "[2 ; 5[" } }),
      micros: ["intervalle_appartenance"],
    },
    {
      titre: "La valeur absolue est une distance",
      texte:
        "$|a|$ vaut $a$ si $a$ est positif, et $-a$ s'il est négatif : $|-6| = 6$. Et $|a - b|$ est la DISTANCE entre $a$ et $b$ : entre $2$ et $9$, elle vaut $|9 - 2| = 7$. Une distance n'est jamais négative.",
      schema: droite(0, 10, {
        points: [
          { value: 2, label: "A", color: "#2563eb" },
          { value: 9, label: "B", color: "#2563eb" },
        ],
      }),
      micros: ["valeur_absolue_distance"],
    },
    {
      titre: "« À moins de r de a » : un intervalle",
      texte:
        "$|x - a| \\leqslant r$ veut dire : $x$ est à une distance au plus $r$ de $a$. On va de $a - r$ à $a + r$. Par exemple, $|x - 4| \\leqslant 1$ donne $x \\in [3\\,;\\,5]$ : l'intervalle de centre $4$, de demi-largeur $1$.",
      schema: droite(1, 7, { intervalle: { de: 3, a: 5, deInclus: true, aInclus: true, label: "|x − 4| ≤ 1" } }),
      micros: ["valeur_absolue_distance", "intervalle_representer"],
    },
    {
      titre: "Encadrer un réel",
      texte:
        "Pour encadrer $\\sqrt{5}$, on cherche des carrés autour de $5$. $2^2 = 4$ et $3^2 = 9$, donc $2 < \\sqrt{5} < 3$. Plus finement : $2{,}2^2 = 4{,}84$ et $2{,}3^2 = 5{,}29$, donc $2{,}2 < \\sqrt{5} < 2{,}3$.",
      schema: tableau(
        ["le carré", "encadre 5 ?"],
        [
          { label: "2 et 3", values: ["4 et 9", "oui"] },
          { label: "2,2 et 2,3", values: ["4,84 et 5,29", "oui"] },
        ],
        "De l'unité au dixième",
      ),
      micros: ["reels_encadrement"],
    },
  ],

  reel: {
    texte:
      "Aucune mesure n'est exacte. Un thermomètre qui affiche $36{,}8$ °C à $0{,}1$ près dit en réalité : la température est dans $[36{,}7\\,;\\,36{,}9]$. Un panneau « $50$ » dit : la vitesse autorisée est dans $[0\\,;\\,50]$. Et entre une nuit d'hiver au Maïdo, à $-2$ °C, et un après-midi d'été à Saint-Gilles, à $31$ °C, l'écart vaut $|31 - (-2)| = 33$ degrés. Intervalles et valeurs absolues sont la langue des mesures.",
  },

  historique: {
    texte:
      "Selon la légende, les disciples de Pythagore découvrent, il y a environ $2\\,500$ ans, que la diagonale d'un carré de côté $1$ ne s'écrit pas comme une fraction : c'est $\\sqrt{2}$. La droite des nombres a donc des « trous » que les fractions ne remplissent pas, et il faudra attendre le XIXe siècle pour définir proprement tous les réels. La notation $|x|$ date de la même époque : Karl Weierstrass l'utilise en 1841.",
  },

  methode: [
    {
      titre: "1. Je place le nombre",
      texte:
        "J'écris le nombre en décimal pour savoir entre quelles graduations il tombe : $\\dfrac{9}{4} = 2{,}25$, un quart après $2$.",
      micros: ["reels_droite_graduee"],
    },
    {
      titre: "2. Je lis les crochets",
      texte:
        "Crochet tourné vers le nombre : il est compris, j'écris $\\leqslant$. À l'envers : il est exclu, j'écris $<$. Côté infini : toujours ouvert.",
      micros: ["intervalle_representer"],
    },
    {
      titre: "3. Je traduis la valeur absolue",
      texte:
        "$|x - a|$ : la distance entre $x$ et $a$. $|x + a|$ : la distance entre $x$ et $-a$, car $x + a = x - (-a)$.",
      micros: ["valeur_absolue_distance"],
    },
    {
      titre: "4. Je dessine, puis j'écris",
      texte:
        "Je trace la droite, je pose le centre et je compte la distance de chaque côté. La réponse se lit sur le dessin.",
      micros: ["valeur_absolue_distance", "intervalle_representer"],
    },
  ],

  usages: [
    {
      titre: "Écrire les solutions d'une inéquation",
      detail: "Les solutions de $x > -2$ forment $]{-2}\\,;\\,+\\infty[$. On dessine, puis on écrit.",
      schema: droite(-4, 3, { intervalle: { de: -2, deInclus: false, label: "x > −2" } }),
      micros: ["intervalle_representer"],
    },
    {
      titre: "Donner une précision",
      detail:
        "« $g$ vaut $9{,}81$ à $0{,}01$ près » s'écrit $|g - 9{,}81| \\leqslant 0{,}01$, c'est-à-dire $g \\in [9{,}80\\,;\\,9{,}82]$.",
      schema: tableau(["valeur", "précision"], [{ label: "g", values: ["9,81", "± 0,01"] }], "Une mesure est un intervalle"),
      micros: ["valeur_absolue_distance"],
    },
    {
      titre: "Mesurer un écart",
      detail: "Entre $-4$ °C et $7$ °C, l'écart vaut $|7 - (-4)| = 11$ degrés. On soustrait $-4$ : on ajoute $4$.",
      schema: droite(-5, 8, {
        points: [
          { value: -4, label: "−4", color: "#2563eb" },
          { value: 7, label: "7", color: "#dc2626" },
        ],
      }),
      micros: ["valeur_absolue_distance"],
    },
  ],

  exemples: [
    {
      titre: "Ranger des nombres",
      donnees: "$\\dfrac{11}{4}$ ; $-9$ ; $\\sqrt{25}$ ; $\\dfrac{1}{7}$.",
      question: "Donner le plus petit ensemble qui contient chaque nombre.",
      schema: tableau(
        ["vaut", "ensemble"],
        [
          { label: "11/4", values: ["2,75", "D"] },
          { label: "−9", values: ["−9", "Z"] },
          { label: "√25", values: ["5", "N"] },
          { label: "1/7", values: ["0,142857…", "Q"] },
        ],
      ),
      solution:
        "$\\dfrac{11}{4} = 2{,}75$ : $\\mathbb{D}$. $-9$ est un entier négatif : $\\mathbb{Z}$. $\\sqrt{25} = 5$ : $\\mathbb{N}$. $\\dfrac{1}{7} = 0{,}142857\\ldots$ ne s'arrête jamais : $\\mathbb{Q}$.",
      micros: ["reels_ensembles"],
    },
    {
      titre: "Du texte à l'intervalle",
      donnees: "Les réels strictement plus grands que $-1$ et inférieurs ou égaux à $6$.",
      question: "Écrire cet ensemble sous forme d'intervalle.",
      schema: tableau(["borne", "crochet"], [
        { label: "−1 exclu", values: ["−1", "]"] },
        { label: "6 compris", values: ["6", "]"] },
      ]),
      solution:
        "$-1$ est exclu (« strictement ») : crochet à l'envers. $6$ est compris (« ou égal ») : crochet tourné vers lui. C'est $]{-1}\\,;\\,6]$.",
      micros: ["intervalle_representer"],
    },
    {
      titre: "Une équation avec valeur absolue",
      donnees: "$|x - 6| = 2$.",
      question: "Résoudre.",
      schema: tableau(["calcul", "solution"], [
        { label: "à gauche de 6", values: ["6 − 2", "4"] },
        { label: "à droite de 6", values: ["6 + 2", "8"] },
      ]),
      solution:
        "On cherche les nombres à la distance $2$ de $6$. Il y en a un de chaque côté : $6 - 2 = 4$ et $6 + 2 = 8$. Les solutions sont $4$ et $8$.",
      micros: ["valeur_absolue_distance"],
    },
    {
      titre: "Une inéquation avec valeur absolue",
      donnees: "$|x + 1| < 3$.",
      question: "Écrire les solutions sous forme d'intervalle.",
      schema: tableau(["centre", "demi-largeur"], [{ label: "|x + 1| < 3", values: ["−1", "3"] }]),
      solution:
        "$|x + 1|$ est la distance entre $x$ et $-1$. On va de $-1 - 3 = -4$ à $-1 + 3 = 2$, bornes exclues (inégalité stricte) : $]{-4}\\,;\\,2[$.",
      micros: ["valeur_absolue_distance", "intervalle_representer"],
    },
  ],

  pieges: [
    "Un décimal n'est pas « un nombre à virgule ». $\\dfrac{1}{3}$ s'écrit avec une virgule mais n'est pas décimal ; $4$ n'a pas de virgule et il est décimal.",
    "Le crochet de l'infini est toujours ouvert : $]{-\\infty}\\,;\\,2]$, jamais $[-\\infty$.",
    "$|x + 5|$ est la distance entre $x$ et $-5$, pas $5$.",
    "$|x - a| = r$ a DEUX solutions, une de chaque côté de $a$ (quand $r > 0$).",
    "$|\\pi - 3|$ vaut $\\pi - 3$, mais $|\\pi - 4|$ vaut $4 - \\pi$. On regarde le signe avant d'enlever les barres.",
  ],

  aRetenir: [
    "$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$.",
    "Le crochet tourné vers le nombre le contient ; côté infini, toujours ouvert.",
    "$|a - b|$ est la distance entre $a$ et $b$.",
    "$|x - a| \\leqslant r$ équivaut à $x \\in [a - r\\,;\\,a + r]$.",
    "Pour encadrer une racine, on encadre son carré.",
  ],

  entrainement: [
    {
      question: "Donner le plus petit ensemble qui contient $-\\dfrac{12}{4}$.",
      correction: "$-\\dfrac{12}{4} = -3$ : c'est un entier négatif, donc $\\mathbb{Z}$.",
      micros: ["reels_ensembles"],
    },
    {
      question: "$\\dfrac{3}{40}$ est-il un nombre décimal ?",
      correction: "Oui : $40 = 2 \\times 2 \\times 2 \\times 5$ n'a que des facteurs $2$ et $5$. Et $\\dfrac{3}{40} = 0{,}075$.",
      micros: ["reels_ensembles"],
    },
    {
      question: "Entre quelles graduations entières tombe le nombre $-\\dfrac{7}{3}$ ?",
      correction: "$-\\dfrac{7}{3} \\approx -2{,}33$ : entre $-3$ et $-2$, plus près de $-2$.",
      micros: ["reels_droite_graduee"],
    },
    {
      question: "Écrire $-2 < x \\leqslant 0$ sous forme d'intervalle.",
      correction: "$]{-2}\\,;\\,0]$ : $-2$ exclu, $0$ compris.",
      micros: ["intervalle_representer"],
    },
    {
      question: "Traduire $x \\in [7\\,;\\,+\\infty[$ par une inégalité.",
      correction: "$x \\geqslant 7$.",
      micros: ["intervalle_representer"],
    },
    {
      question: "Le nombre $-1$ appartient-il à $]{-1}\\,;\\,1]$ ?",
      correction: "Non : le crochet est tourné à l'envers devant $-1$, il est exclu.",
      micros: ["intervalle_appartenance"],
    },
    {
      question: "Calculer $|5 - 12|$ et $|\\sqrt{3} - 2|$.",
      correction: "$|5 - 12| = |-7| = 7$. Et $\\sqrt{3} \\approx 1{,}73$, donc $\\sqrt{3} - 2$ est négatif : $|\\sqrt{3} - 2| = 2 - \\sqrt{3}$.",
      micros: ["valeur_absolue_distance"],
    },
    {
      question: "Résoudre $|x + 3| = 1$.",
      correction: "La distance entre $x$ et $-3$ vaut $1$ : $x = -4$ ou $x = -2$.",
      micros: ["valeur_absolue_distance"],
    },
    {
      question: "Écrire les solutions de $|x - 10| \\leqslant 2$ sous forme d'intervalle.",
      correction: "De $10 - 2 = 8$ à $10 + 2 = 12$, bornes comprises : $[8\\,;\\,12]$.",
      micros: ["valeur_absolue_distance", "intervalle_representer"],
    },
    {
      question: "Encadrer $\\sqrt{11}$ entre deux entiers, puis au dixième.",
      correction: "$9 < 11 < 16$, donc $3 < \\sqrt{11} < 4$. Puis $3{,}3^2 = 10{,}89$ et $3{,}4^2 = 11{,}56$, donc $3{,}3 < \\sqrt{11} < 3{,}4$.",
      micros: ["reels_encadrement"],
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesReelsSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Réels et intervalles - 2de",
    section: {
      type: "objectif",
      phrase: "Placer un nombre, écrire un intervalle, mesurer un écart : tout se lit sur la droite",
      sousPhrase:
        "Les ensembles de nombres, les crochets qui disent « compris » ou « exclu », et la valeur absolue qui est une distance.",
    },
  },
];
