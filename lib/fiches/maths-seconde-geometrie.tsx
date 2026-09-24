// ─── Fiche de cours : problèmes de géométrie plane (2de) ──────────────────────
//
// ⭐ ÉCRITE APRÈS LA VIDÉO, le 24/09/2026 — l'inverse de l'ordre habituel. La
// notion avait sa feuille d'exercices (`762583f9`) et sa leçon vidéo, mais pas
// de fiche : c'était le seul chapitre de seconde dans ce cas.
// ⛔ LES NOMBRES SONT CEUX DE LA VIDÉO ET DE LA FEUILLE, sans exception : le
// triangle 3-4-5, cos x = 0,6, HA = 5 et MA = 13, AB = 8 avec 30°, les 60 m de
// clôture, la pente à 12 %. Un élève qui regarde la vidéo puis ouvre la fiche
// doit retrouver SES chiffres — sinon il croit changer d'exercice.
//
// Alignée sur la banque `geometrie-problemes-plan` (notion
// geometrie_problemes_plan). Micro-compétences couvertes :
// - geo_trigonometrie      → propriété « Les trois rapports », exemple 1, exos 1-3
// - geo_trig_identite      → propriété « cos² + sin² = 1 », exemple 2, exos 4-5
// - geo_projete_orthogonal → propriété « Le projeté », méthode 2, exemple 3, exos 6-7
// - geo_longueurs_aires    → propriété « La hauteur », usages, exemple 4, exos 8-9
// - geo_optimisation       → usages « Chercher un maximum », exo 10
//
// ⛔ LE PIÈGE CENTRAL : un pourcentage de pente est une TANGENTE, jamais un
// angle. Et ce que mesure un compteur, c'est l'hypoténuse — donc un sinus.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

/**
 * Un tableau — HTML, donc lisible partout.
 * ⛔ DEUX COLONNES, JAMAIS TROIS : au-delà, les cellules tombent sous la
 * largeur lisible dans un bloc de 225 px.
 * ⛔ ET IL NE PREND QUE DU TEXTE NU : `TexteMath` ne le traverse jamais.
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

/**
 * Un triangle rectangle — LE MÊME CANVAS QUE LE COACH (`kind: "triangle"`,
 * banque `geometrie-problemes-plan.bank.ts`). L'élève retrouve dans la fiche
 * la figure exacte qu'il voit dans ses séries : même angle droit marqué,
 * mêmes étiquettes de côtés.
 * ⛔ Largeur 225 px : au-delà, un bloc de propriété déborde.
 */
function triangle(
  cotes: { AB?: string; BC?: string; CA?: string },
  angleDroitEn: "A" | "B" | "C" = "B",
  points?: { A: { x: number; y: number }; B: { x: number; y: number }; C: { x: number; y: number } },
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "triangle",
        size: { width: 225, height: 195 },
        points: points ?? { A: { x: 0, y: 0 }, B: { x: 4, y: 0 }, C: { x: 4, y: 3 } },
        display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
        labels: { A: "A", B: "B", C: "C" },
        sideLabels: cotes,
        marks: { rightAngleAt: angleDroitEn },
      }}
    />
  );
}

export const ficheGeometrieSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "geometrie-problemes-plan",
  titre: "Problèmes de géométrie plane",
  accroche:
    "Mesurer un arbre sans y grimper, trouver le chemin le plus court jusqu'à un phare, ou le plus grand enclos possible avec 60 mètres de clôture. Tout ça tient dans un seul triangle rectangle — à condition de savoir quel côté est l'hypoténuse.",
  identite: [
    { label: "Mots clés", valeur: "Sinus, cosinus, tangente, projeté orthogonal" },
    { label: "Le secret", valeur: "C'est l'angle regardé qui décide du nom des côtés" },
    { label: "Outil", valeur: "Le projeté orthogonal : il donne la distance ET la hauteur" },
  ],

  definition: {
    texte:
      "Dans un triangle rectangle, pour un angle aigu $x$ : l'HYPOTÉNUSE est le côté opposé à l'angle droit, le côté ADJACENT à $x$ est celui qui le touche sans être l'hypoténuse, et le côté OPPOSÉ à $x$ est le troisième. On pose alors $\\cos x = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$, $\\sin x = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$ et $\\tan x = \\dfrac{\\text{opposé}}{\\text{adjacent}}$.",
  },

  figure: {
    schema: triangle({ AB: "4", BC: "5", CA: "3" }, "A", { A: { x: 0, y: 0 }, B: { x: 4, y: 0 }, C: { x: 0, y: 3 } }),
    legende:
      "⭐ Retenir le mot « CAH SOH TOA » : Cosinus-Adjacent-Hypoténuse, Sinus-Opposé-Hypoténuse, Tangente-Opposé-Adjacent. ⛔ Et se rappeler que l'hypoténuse ne change jamais, alors que « adjacent » et « opposé » S'ÉCHANGENT quand on regarde l'autre angle aigu.",
  },

  proprietes: [
    {
      titre: "Les trois rapports, sur un triangle connu",
      texte:
        "Dans le triangle $ABC$ rectangle en $A$, avec $AB = 4$, $AC = 3$ et $BC = 5$, on regarde l'angle $\\widehat{B}$. L'hypoténuse est $BC = 5$, l'adjacent est $AB = 4$, l'opposé est $AC = 3$. Donc $\\cos\\widehat{B} = 0{,}8$, $\\sin\\widehat{B} = 0{,}6$ et $\\tan\\widehat{B} = 0{,}75$.",
      schema: triangle({ AB: "adjacent 4", BC: "hypoténuse 5", CA: "opposé 3" },
                       "A", { A: { x: 0, y: 0 }, B: { x: 4, y: 0 }, C: { x: 0, y: 3 } }),
    },
    {
      titre: "⭐ $\\cos^2 x + \\sin^2 x = 1$",
      texte:
        "Vrai pour TOUT angle. C'est le théorème de Pythagore dans un triangle rectangle d'hypoténuse $1$, dont les côtés mesurent alors $\\cos x$ et $\\sin x$. Cette égalité donne l'un des deux quand on connaît l'autre, SANS jamais calculer l'angle.",
      schema: tableau(
        ["on connaît", "on trouve"],
        [
          { label: "cos x = 0,6", values: ["0,36 + sin²x = 1", "sin x = 0,8"] },
          { label: "sin x = 0,8", values: ["cos²x + 0,64 = 1", "cos x = 0,6"] },
        ],
      ),
    },
    {
      titre: "Le projeté orthogonal : le point le plus proche",
      texte:
        "Le projeté orthogonal d'un point $M$ sur une droite $d$ est le point $H$ de $d$ tel que $(MH)$ soit perpendiculaire à $d$. ⭐ Parmi TOUS les points de $d$, $H$ est le plus proche de $M$ — car pour tout autre point $A$ de $d$, $MA$ est l'hypoténuse du triangle $MHA$, donc $MA > MH$. La longueur $MH$ s'appelle la distance de $M$ à la droite $d$.",
      schema: tableau(
        ["données", "résultat"],
        [
          { label: "HA", values: ["5 m", "MH² = 169 − 25"] },
          { label: "MA", values: ["13 m", "MH = 12 m"] },
        ],
      ),
    },
    {
      titre: "Le projeté fabrique la hauteur, donc l'aire",
      texte:
        "Dans le triangle $ABC$ avec $AB = 8$ cm, $AC = 6$ cm et $\\widehat{A} = 30°$, on appelle $H$ le projeté orthogonal de $C$ sur $(AB)$. Le triangle $AHC$ est rectangle en $H$ : $\\sin 30° = \\dfrac{CH}{6}$, donc $CH = 3$ cm. L'aire vaut alors $\\dfrac{8 \\times 3}{2} = 12$ cm².",
      schema: tableau(
        ["le calcul", "le résultat"],
        [
          { label: "la hauteur", values: ["CH = 6 × sin 30°", "3 cm"] },
          { label: "l'aire", values: ["8 × 3 ÷ 2", "12 cm²"] },
        ],
      ),
    },
  ],

  reel: {
    texte:
      "Un panneau de col annonce « pente 12 % » : la route monte de $12$ m pour $100$ m parcourus à l'HORIZONTALE. Ce n'est donc pas un angle, c'est une tangente — et l'angle vaut seulement $6{,}8°$. ⛔ Et si ton compteur affiche $2$ km, ces $2$ km sont mesurés le long de la route : c'est l'hypoténuse. La montée vaut $2000 \\times \\sin 6{,}8° \\approx 238$ m, et non $240$. Même géométrie pour l'arbre qu'on mesure de loin, la rampe d'accès d'un bâtiment, ou le plus court chemin d'une route vers un phare.",
  },

  historique: {
    texte:
      "Les premières tables trigonométriques sont des tables de CORDES, dressées par Hipparque de Nicée au IIᵉ siècle avant notre ère pour prévoir la position des astres. Le mot « sinus » vient d'une méprise : les mathématiciens indiens puis arabes notaient ce rapport par un mot signifiant « corde d'arc », que les traducteurs latins du XIIᵉ siècle ont confondu avec un mot voisin voulant dire « pli, repli » — sinus en latin. Le nom est resté.",
  },

  methode: [
    {
      titre: "1. Je repère l'angle droit, puis mon angle",
      texte:
        "L'hypoténuse est toujours en face de l'angle droit. Ensuite seulement je regarde MON angle : le côté qui le touche est l'adjacent, le dernier est l'opposé.",
      schema: tableau(
        ["d'abord", "ensuite"],
        [{ label: "l'angle droit", values: ["donne l'hypoténuse", "puis adjacent / opposé"] }],
      ),
    },
    {
      titre: "2. Je choisis le bon rapport",
      texte:
        "Je regarde ce que je connais et ce que je cherche : deux côtés parmi trois désignent un seul des trois rapports. ⛔ Si l'hypoténuse n'intervient pas, c'est la tangente.",
      schema: tableau(
        ["j'utilise"],
        [
          { label: "hypoténuse + adjacent", values: ["cosinus"] },
          { label: "hypoténuse + opposé", values: ["sinus"] },
          { label: "opposé + adjacent", values: ["tangente"] },
        ],
      ),
    },
    {
      titre: "3. Pour une aire, je fabrique la hauteur",
      texte:
        "Pas de hauteur dans l'énoncé ? Je place le projeté orthogonal d'un sommet sur le côté opposé : il crée un triangle rectangle, donc un sinus, donc la hauteur.",
      schema: tableau(
        ["je place", "j'obtiens"],
        [{ label: "le projeté H", values: ["un triangle rectangle", "la hauteur, puis l'aire"] }],
      ),
    },
  ],

  usages: [
    {
      titre: "Lire un pourcentage de pente",
      detail:
        "$12$ % signifie $12$ m de montée pour $100$ m à l'horizontale : c'est $\\tan\\alpha = 0{,}12$, donc $\\alpha \\approx 6{,}8°$. ⛔ Un pourcentage de pente n'est JAMAIS un angle.",
      schema: tableau(
        ["pente", "angle"],
        [
          { label: "12 %", values: ["tan α = 0,12", "6,8°"] },
          { label: "100 %", values: ["tan α = 1", "45°"] },
        ],
        "La pente est une tangente",
      ),
    },
    {
      titre: "Trouver la distance à une droite",
      detail:
        "C'est toujours la perpendiculaire, et rien d'autre. Le pied de cette perpendiculaire est le projeté orthogonal ; tout autre chemin est une hypoténuse, donc plus long.",
      schema: tableau(
        ["chemin", "longueur"],
        [
          { label: "par H (perpendiculaire)", values: ["MH", "la plus courte"] },
          { label: "par un autre point A", values: ["MA", "toujours plus grande"] },
        ],
      ),
    },
    {
      titre: "Chercher un maximum",
      detail:
        "Avec $60$ m de clôture le long d'une rivière, l'aire vaut $A(x) = x(60 - 2x) = 450 - 2(x-15)^2$. Un carré est toujours positif ou nul, donc on retire toujours quelque chose à $450$ — sauf si $x = 15$. Aire maximale : $450$ m², pour $15$ m sur $30$ m.",
      schema: tableau(
        ["aire"],
        [
          { label: "10 m", values: ["400 m²"] },
          { label: "15 m", values: ["450 m² ← maximum"] },
          { label: "20 m", values: ["400 m²"] },
        ],
        "Deux largeurs, la même aire",
      ),
    },
  ],

  exemples: [
    {
      titre: "Les trois rapports d'un coup",
      donnees: "$ABC$ rectangle en $A$, $AB = 4$, $AC = 3$, $BC = 5$.",
      question: "Calculer $\\cos\\widehat{B}$, $\\sin\\widehat{B}$ et $\\tan\\widehat{B}$.",
      schema: tableau(
        ["valeur"],
        [
          { label: "cos B", values: ["4/5 = 0,8"] },
          { label: "sin B", values: ["3/5 = 0,6"] },
          { label: "tan B", values: ["3/4 = 0,75"] },
        ],
      ),
      solution:
        "Pour l'angle $\\widehat{B}$ : l'hypoténuse est $BC = 5$, l'adjacent est $AB = 4$, l'opposé est $AC = 3$. Donc $\\cos\\widehat{B} = \\dfrac{4}{5} = 0{,}8$, $\\sin\\widehat{B} = \\dfrac{3}{5} = 0{,}6$ et $\\tan\\widehat{B} = \\dfrac{3}{4} = 0{,}75$. ⭐ Si on regardait $\\widehat{C}$, l'adjacent et l'opposé s'échangeraient : le cosinus deviendrait $0{,}6$.",
    },
    {
      titre: "⭐ Trouver un sinus sans l'angle",
      donnees: "$x$ est un angle aigu et $\\cos x = 0{,}6$.",
      question: "Calculer $\\sin x$ sans calculer $x$.",
      schema: tableau(
        ["calcul"],
        [
          { label: "on remplace", values: ["0,36 + sin²x = 1"] },
          { label: "on isole", values: ["sin²x = 0,64"] },
        ],
      ),
      solution:
        "$\\cos^2 x + \\sin^2 x = 1$ donne $0{,}6^2 + \\sin^2 x = 1$, c'est-à-dire $0{,}36 + \\sin^2 x = 1$, donc $\\sin^2 x = 0{,}64$ et $\\sin x = 0{,}8$. ⛔ On garde la racine POSITIVE parce que l'angle est aigu : le sinus d'un angle aigu est toujours positif.",
    },
    {
      titre: "La distance à une droite",
      donnees: "$H$ est le projeté orthogonal de $M$ sur $d$. $A$ est sur $d$, $HA = 5$ m et $MA = 13$ m.",
      question: "Quelle est la distance de $M$ à la droite $d$ ?",
      schema: tableau(
        ["valeur"],
        [
          { label: "MA (hypoténuse)", values: ["13 m"] },
          { label: "MH (distance)", values: ["12 m"] },
        ],
      ),
      solution:
        "Le triangle $MHA$ est rectangle en $H$, donc Pythagore : $MH^2 + 5^2 = 13^2$, d'où $MH^2 = 169 - 25 = 144$ et $MH = 12$ m. ⭐ C'est bien la distance de $M$ à $d$ : tous les autres points de $d$ sont plus loin, puisque le segment qui les joint à $M$ serait une hypoténuse.",
    },
    {
      titre: "Une aire sans hauteur donnée",
      donnees: "$AB = 8$ cm, $AC = 6$ cm, $\\widehat{A} = 30°$.",
      question: "Calculer l'aire du triangle $ABC$.",
      schema: tableau(
        ["valeur"],
        [
          { label: "hauteur CH", values: ["6 × sin 30° = 3 cm"] },
          { label: "aire", values: ["8 × 3 ÷ 2 = 12 cm²"] },
        ],
      ),
      solution:
        "On place $H$, projeté orthogonal de $C$ sur $(AB)$. Dans le triangle $AHC$ rectangle en $H$, l'hypoténuse est $AC = 6$ et le côté opposé à $\\widehat{A}$ est $CH$ : donc $\\sin 30° = \\dfrac{CH}{6}$, d'où $CH = 6 \\times 0{,}5 = 3$ cm. L'aire vaut $\\dfrac{AB \\times CH}{2} = \\dfrac{8 \\times 3}{2} = 12$ cm².",
    },
  ],

  pieges: [
    "⛔ Un pourcentage de pente est une TANGENTE, pas un angle. $12$ % donne $\\alpha \\approx 6{,}8°$, pas $12°$.",
    "⛔ Ce que mesure un compteur le long d'une route, c'est l'HYPOTÉNUSE. Pour la montée, il faut donc un sinus, pas une tangente.",
    "⛔ « Adjacent » et « opposé » dépendent de l'angle REGARDÉ, et s'échangent quand on passe à l'autre angle aigu. Seule l'hypoténuse ne bouge jamais.",
    "⛔ Un sinus et un cosinus d'angle aigu sont toujours compris entre $0$ et $1$. Un résultat supérieur à $1$ signale une erreur de rapport.",
    "⛔ La distance d'un point à une droite n'est pas la distance à un point quelconque de cette droite : c'est la PERPENDICULAIRE, et elle seule.",
    "⛔ Dans $\\cos^2 x + \\sin^2 x = 1$, on écrit $\\cos^2 x$ pour $(\\cos x)^2$. Ce n'est pas le cosinus de $x^2$.",
  ],

  aRetenir: [
    "CAH SOH TOA : cosinus = adjacent/hypoténuse, sinus = opposé/hypoténuse, tangente = opposé/adjacent.",
    "L'hypoténuse est toujours en face de l'angle droit — et c'est le plus grand côté.",
    "$\\cos^2 x + \\sin^2 x = 1$ : elle donne l'un quand on connaît l'autre, sans calculer l'angle.",
    "Le projeté orthogonal $H$ de $M$ sur $d$ est le point de $d$ le plus PROCHE de $M$ ; $MH$ est la distance de $M$ à $d$.",
    "Ce même segment $MH$ est aussi une hauteur : il donne l'aire d'un triangle.",
    "Une aire écrite sous la forme $450 - 2(x-15)^2$ livre son maximum sans calcul : il est atteint quand le carré s'annule.",
  ],

  entrainement: [
    {
      question: "Dans un triangle rectangle, quel côté est l'hypoténuse ?",
      correction:
        "Celui qui est en face de l'angle droit. C'est aussi le plus grand des trois côtés.",
    },
    {
      question: "$ABC$ est rectangle en $C$ avec $CA = 6$ et $CB = 8$. Que vaut $\\tan\\widehat{A}$ ?",
      correction:
        "Pour l'angle $\\widehat{A}$, l'opposé est $CB = 8$ et l'adjacent est $CA = 6$. Donc $\\tan\\widehat{A} = \\dfrac{8}{6} \\approx 1{,}33$.",
    },
    {
      question: "$ABC$ est rectangle en $B$, $\\widehat{A} = 35°$ et $AC = 10$ cm. Comment calculer $BC$ ?",
      correction:
        "$AC$ est l'hypoténuse et $BC$ est le côté opposé à $\\widehat{A}$ : on utilise le sinus. $BC = 10 \\times \\sin 35° \\approx 5{,}74$ cm.",
    },
    {
      question: "$x$ est un angle aigu et $\\sin x = \\dfrac{5}{13}$. Que vaut $\\cos x$ ?",
      correction:
        "$\\cos^2 x = 1 - \\dfrac{25}{169} = \\dfrac{144}{169}$, donc $\\cos x = \\dfrac{12}{13}$. On garde la valeur positive, l'angle étant aigu.",
    },
    {
      question: "Peut-on avoir $\\cos x = 1{,}2$ pour un angle aigu ?",
      correction:
        "Non. Le cosinus est un côté divisé par l'hypoténuse, or l'hypoténuse est le plus grand côté : le quotient est toujours compris entre $0$ et $1$.",
    },
    {
      question: "$ABC$ est rectangle en $A$. Quel est le projeté orthogonal de $B$ sur $(AC)$ ?",
      correction:
        "C'est le point $A$ lui-même, puisque $(AB)$ est déjà perpendiculaire à $(AC)$.",
    },
    {
      question: "$H$ est le projeté orthogonal de $M$ sur $d$, avec $MH = 4$. Un point $A$ de $d$ peut-il vérifier $MA = 3$ ?",
      correction:
        "Non. $MA$ est l'hypoténuse du triangle $MHA$, donc $MA \\geqslant MH = 4$. Une distance de $3$ est impossible.",
    },
    {
      question: "$ABC$ est isocèle en $A$ avec $AB = AC = 5$ cm et $BC = 6$ cm. Où est le projeté orthogonal $I$ de $A$ sur $(BC)$ ?",
      correction:
        "Au milieu de $[BC]$, car le triangle est isocèle en $A$. Donc $BI = 3$, et Pythagore donne $AI = \\sqrt{25-9} = 4$ cm.",
    },
    {
      question: "Avec le triangle précédent, quelle est l'aire de $ABC$ ?",
      correction:
        "La hauteur est $AI = 4$ cm et la base $BC = 6$ cm, donc l'aire vaut $\\dfrac{6 \\times 4}{2} = 12$ cm².",
    },
    {
      question: "Un rectangle a un périmètre de $20$ cm et une largeur $x$. Son aire vaut $A(x) = 25 - (x-5)^2$. Quelle est l'aire maximale ?",
      correction:
        "$25$ cm², atteinte quand le carré s'annule, c'est-à-dire pour $x = 5$ : le rectangle est alors un carré de côté $5$ cm.",
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesGeometrieSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Géométrie plane - 2de",
    section: {
      type: "objectif",
      phrase: "Un triangle rectangle, et tout se calcule",
      sousPhrase:
        "Sinus, cosinus, tangente ; le projeté orthogonal qui donne la distance ET la hauteur ; et un maximum qui se lit sans calcul.",
    },
  },
];
