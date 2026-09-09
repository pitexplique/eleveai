// ─── Fiche de cours : les vecteurs du plan (2de) ──────────────────────────────
//
// Neuvième fiche de seconde, et la dernière notion du contrôle commun de
// mars 2025. Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/vecteurs-plan.bank.ts
// (notion vecteurs_plan), et sur la 5e comme étalon.
//
// ⭐ CE QUE LA MESURE A CHANGÉ AU COACH, le 09/09/2026 : sur les 60 items de la
// notion, 40 travaillaient EN COORDONNÉES et les 20 autres étaient tous FIXES —
// pas un seul générateur ne fonctionnait sans repère. Or l'exercice 3 du
// contrôle est entièrement « vecteurs SANS repérage ». Deux micros ont été
// écrites pour ça : `vecteur_chasles_calcul` et `vecteur_point_defini`.
//
// ⛔ ET LA SOUSTRACTION N'EXISTAIT NULLE PART : zéro item sur AB − AC, qui est
// pourtant LE piège de Chasles. La fiche lui donne un piège et un exercice.
//
// ⭐ L'IDÉE DIRECTRICE : un vecteur n'est pas un objet posé quelque part, c'est
// un DÉPLACEMENT. Il n'a pas de position — seulement une direction, un sens et
// une longueur. C'est ce qui explique que deux flèches éloignées puissent être
// le même vecteur, et c'est le point qui bloque le plus d'élèves.
//
// Micro-compétences couvertes :
// - vecteur_definition       → définition, propriété « Trois données », exemple 1
// - vecteur_egalite          → propriété « Deux vecteurs égaux », usages, exo 2
// - vecteur_somme            → propriété « Chasles », exemple 2
// - vecteur_chasles_calcul   → méthode entière, exemples 2-3, exos 3-4-5-6
// - vecteur_point_defini     → usages « Placer un point », exemple 4, exos 7-8
// - vecteur_coordonnees      → propriété « En coordonnées », exo 9
// - vecteur_norme            → propriété « En coordonnées », exo 10
// - vecteur_colinearite      → usages « Prouver un alignement »

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

/**
 * Un tableau — HTML, donc lisible partout, y compris dans `methode` et
 * `exemples` dont les blocs peuvent ne faire que 80 px.
 *
 * ⛔ ET IL NE PREND QUE DU TEXTE NU : `TexteMath` ne le traverse jamais, ses
 * textes arrivant en DONNÉES de figure. C'est particulièrement gênant ICI, car
 * un vecteur s'écrit normalement avec une flèche — et « $\vec{AB}$ » afficherait
 * ses dollars à l'élève.
 *
 * ⛔⛔ ET LA FLÈCHE UNICODE NE MARCHE PAS NON PLUS. J'ai d'abord écrit « AB⃗ »
 * avec le diacritique combinant U+20D7. Mesuré au rendu : « AB⃗ » est 12 px plus
 * LARGE que « AB », alors qu'un combinant correctement composé ajoute ZÉRO
 * largeur. Il ne se posait donc pas sur la lettre — il s'affichait comme un
 * glyphe séparé, et par-dessus une seule des deux lettres qui plus est.
 *
 * ⭐ La solution retenue : dans les tableaux, les vecteurs s'écrivent en lettres
 * NUES — « AB + BC = AC ». Le titre du tableau et le texte qui l'entoure, eux,
 * passent par KaTeX et portent la notation complète. Le tableau n'enseigne pas
 * l'écriture, il montre le résultat.
 *
 * ⚠️ Le test, en une ligne dans la console de la page :
 *   c.measureText("AB⃗").width - c.measureText("AB").width   // 0 = composé
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
 * ⭐ DESSINER UN VECTEUR — ajouté le 09/09/2026, Frédéric : « ce qui me dérange,
 * c'est aucun dessin ». Une fiche sur les vecteurs sans une seule flèche,
 * pendant que la règle du site demande un visuel par bloc.
 *
 * ⛔ AUCUN CANVAS NE SAIT DESSINER UN VECTEUR. Le catalogue en compte trente-cinq
 * et pas un ne trace de flèche entre deux points — c'est pour ça que la fiche
 * était vide. On le fabrique donc avec `fonctionGraphique`, dont le champ
 * `courbes` accepte PLUSIEURS polylignes : une pour la hampe, deux pour les
 * barbes de la pointe. Trois polylignes de la même couleur font une flèche.
 *
 * ⚠️ LA FENÊTRE DOIT ÊTRE CARRÉE, sinon la pointe part de travers : le canvas
 * met à l'échelle x et y indépendamment. On garde donc `xmax - xmin` égal à
 * `ymax - ymin`, et une taille 220 × 220.
 */
function fleche(
  id: string,
  de: { x: number; y: number },
  vers: { x: number; y: number },
  couleur: string,
) {
  const dx = vers.x - de.x;
  const dy = vers.y - de.y;
  const L = Math.hypot(dx, dy);
  const [ux, uy] = [dx / L, dy / L];
  // Une barbe part de la pointe, en arrière, à 30° de part et d'autre de l'axe.
  const r = Math.min(0.55, L * 0.22);
  const barbe = (angle: number) => {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
      x: +(vers.x + r * (ux * c - uy * s)).toFixed(3),
      y: +(vers.y + r * (ux * s + uy * c)).toFixed(3),
    };
  };
  const a = (150 * Math.PI) / 180;
  return [
    { id: `${id}-hampe`, type: "points" as const, couleur, points: [de, vers] },
    { id: `${id}-b1`, type: "points" as const, couleur, points: [vers, barbe(a)] },
    { id: `${id}-b2`, type: "points" as const, couleur, points: [vers, barbe(-a)] },
  ];
}

/**
 * Le repère qui accueille les flèches — SVG, donc réservé à `proprietes`
 * (225 px) et `usages` (220 px), et fenêtre étroite : la leçon des treize
 * étiquettes qui se chevauchaient est payée depuis la fiche du repère.
 *
 * ⛔ Aucun point ne se pose SUR le bord : son étiquette déborderait. Une unité
 * de marge au minimum.
 */
function figureVecteurs(
  courbes: ReturnType<typeof fleche>[],
  points: { x: number; y: number; label: string; couleur?: string }[],
  fenetre: { min: number; max: number },
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "fonctionGraphique",
        size: { width: 220, height: 220 },
        xmin: fenetre.min,
        xmax: fenetre.max,
        ymin: fenetre.min,
        ymax: fenetre.max,
        grille: true,
        courbes: courbes.flat(),
        points,
      }}
    />
  );
}

const BLEU = "#2563eb";
const ROUGE = "#dc2626";
const VERT = "#059669";

export const ficheVecteursSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "vecteurs-plan",
  titre: "Les vecteurs du plan",
  accroche:
    "Un vecteur n'est pas un point : c'est un DÉPLACEMENT. Il ne dit pas où l'on est, il dit de combien on bouge et dans quelle direction. Deux flèches à l'autre bout de la figure peuvent donc être le même vecteur — et c'est exactement ce qui rend Chasles si puissant.",
  identite: [
    { label: "Mots clés", valeur: "Direction, sens, norme, Chasles, colinéaires" },
    { label: "Le secret", valeur: "$\\vec{AB} - \\vec{AC} = \\vec{CB}$, et non $\\vec{BC}$" },
    { label: "Outil", valeur: "Chasles, dans les deux sens" },
  ],

  definition: {
    texte:
      "Le vecteur $\\vec{AB}$ est le déplacement qui mène de $A$ à $B$. Il est défini par trois données seulement : sa DIRECTION (celle de la droite $(AB)$), son SENS (de $A$ vers $B$) et sa NORME $\\|\\vec{AB}\\|$, qui est la longueur $AB$. ⭐ Aucune de ces trois données ne dit OÙ se trouve le vecteur : il n'a pas de position.",
  },

  figure: {
    schema: tableau(
      ["direction", "sens", "norme"],
      [
        { label: "AB", values: ["celle de (AB)", "de A vers B", "longueur AB"] },
        { label: "BA", values: ["la même", "l'inverse", "la même"] },
      ],
      "Les vecteurs AB et BA",
    ),
    legende:
      "⚠️ Dans les tableaux de cette fiche, les vecteurs sont écrits en lettres nues : « AB » désigne $\\vec{AB}$. Une seule des trois données change entre $\\vec{AB}$ et $\\vec{BA}$ — le sens. C'est pour cela qu'ils sont opposés et non égaux, et c'est la source de la moitié des erreurs du chapitre.",
  },

  proprietes: [
    {
      titre: "Deux vecteurs égaux, c'est un parallélogramme",
      texte:
        "$\\vec{AB} = \\vec{CD}$ signifie même direction, même sens, même norme — les deux flèches sont parallèles, orientées pareil, et de même longueur. ⭐ Le quadrilatère $ABDC$ est alors un parallélogramme : attention à l'ordre des lettres.",
      // A(1;1) B(4;2) C(5;5) D(2;4) : AB⃗ = C − D = (3;1) = DC⃗, et ABCD est bien
      // un parallelogramme. Les deux fleches sont PARALLELES et de MEME LONGUEUR
      // a l'ecran — c'est ce que l'eleve doit voir avant toute formule.
      schema: figureVecteurs(
        [
          fleche("ab", { x: 1, y: 1 }, { x: 4, y: 2 }, BLEU),
          fleche("dc", { x: 2, y: 4 }, { x: 5, y: 5 }, BLEU),
        ],
        [
          { x: 1, y: 1, label: "A", couleur: ROUGE },
          { x: 4, y: 2, label: "B", couleur: ROUGE },
          { x: 5, y: 5, label: "C", couleur: ROUGE },
          { x: 2, y: 4, label: "D", couleur: ROUGE },
        ],
        { min: 0, max: 6 },
      ),
    },
    {
      titre: "La relation de Chasles",
      texte:
        "$\\vec{AB} + \\vec{BC} = \\vec{AC}$ : aller de $A$ à $B$ puis de $B$ à $C$, c'est aller de $A$ à $C$. La lettre du milieu DISPARAÎT — c'est le point de passage.",
      schema: tableau(
        ["AB + BC", "AB + BA", "AB + BC + CA"],
        [{ label: "vaut", values: ["AC", "0", "0"] }],
        "Le circuit fermé vaut le vecteur nul",
      ),
    },
    {
      titre: "⛔ La différence retourne les lettres",
      texte:
        "$\\vec{AB} - \\vec{AC} = \\vec{CB}$, et NON $\\vec{BC}$. Soustraire un vecteur, c'est ajouter son opposé : $-\\vec{AC} = \\vec{CA}$, donc $\\vec{AB} - \\vec{AC} = \\vec{CA} + \\vec{AB} = \\vec{CB}$. L'ordre du résultat est l'inverse de celui qu'on lit.",
      schema: tableau(
        ["AB − AC", "erreur classique"],
        [{ label: "vaut", values: ["CB", "BC — l'opposé"] }],
        "Les deux vecteurs partent du même point",
      ),
    },
    {
      titre: "En coordonnées : une soustraction",
      texte:
        "Si $A(x_A \\,;\\, y_A)$ et $B(x_B \\,;\\, y_B)$, alors $\\vec{AB}\\,(x_B - x_A \\,;\\, y_B - y_A)$ — l'arrivée MOINS le départ. Et dans un repère orthonormé, $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$.",
      schema: tableau(
        ["A(1 ; 2)", "B(4 ; 6)", "AB", "norme"],
        [{ label: "calcul", values: ["—", "—", "(3 ; 4)", "5"] }],
        "Arrivée moins départ",
      ),
    },
  ],

  reel: {
    texte:
      "Un avion vole vers l'ouest à $800$ km/h et rencontre un vent du sud à $60$ km/h. Sa trajectoire réelle n'est ni l'une ni l'autre : c'est la SOMME des deux vecteurs vitesse, et le pilote doit corriger son cap pour compenser. C'est exactement la relation de Chasles, appliquée à des vitesses plutôt qu'à des points. Les vecteurs sont nés de là — de la nécessité de composer deux effets qui agissent en même temps.",
  },

  historique: {
    texte:
      "L'idée de composer deux déplacements est très ancienne — Aristote parlait déjà de mouvements combinés — mais le vecteur comme objet mathématique n'apparaît qu'au XIXᵉ siècle. Michel Chasles, dont la relation porte le nom, publie en 1852 ; Hermann Grassmann avait posé les bases d'une « théorie de l'extension » dès 1844, dans un livre que presque personne ne comprit à l'époque. Le mot « vecteur » vient du latin vehere, « transporter » — ce qui décrit bien ce que fait un déplacement.",
  },

  methode: [
    {
      titre: "Je cherche la lettre de passage",
      texte:
        "Dans une somme, deux vecteurs s'enchaînent quand l'arrivée du premier est le départ du second. Cette lettre-là disparaît.",
      schema: tableau(
        ["AB + BC", "lettre commune"],
        [{ label: "donne", values: ["AC", "B, elle disparait"] }],
      ),
    },
    {
      titre: "Je réorganise si besoin",
      texte:
        "Une somme se réordonne librement. $\\vec{AB} + \\vec{CD} + \\vec{BC}$ ne s'enchaîne pas tel quel — remis dans l'ordre, il devient $\\vec{AB} + \\vec{BC} + \\vec{CD} = \\vec{AD}$.",
      schema: tableau(
        ["donné", "AB + CD + BC", "réordonné"],
        [{ label: "puis", values: ["—", "AB + BC + CD", "AD"] }],
      ),
    },
    {
      titre: "Je coupe quand je bloque",
      texte:
        "Chasles se lit aussi à l'envers : $\\vec{AB} = \\vec{AM} + \\vec{MB}$ pour N'IMPORTE quel point $M$. Insérer un point de passage bien choisi débloque presque tous les exercices sans repérage.",
      schema: tableau(
        ["AB", "coupé en M"],
        [{ label: "vaut", values: ["—", "AM + MB"] }],
      ),
    },
  ],

  usages: [
    {
      titre: "Prouver un parallélogramme",
      detail:
        "$ABCD$ est un parallélogramme si et seulement si $\\vec{AB} = \\vec{DC}$. ⭐ C'est la deuxième preuve du programme, à côté de celle par les milieux des diagonales — et celle-ci ne demande aucun repère.",
      schema: tableau(
        ["par les vecteurs", "par les milieux"],
        [{ label: "ABCD", values: ["AB = DC", "[AC] et [BD] même milieu"] }],
        "Deux preuves, au choix",
      ),
    },
    {
      titre: "Placer un point",
      detail:
        "Une égalité vectorielle DÉFINIT un point, et un seul. $\\vec{AM} = 2\\vec{AB}$ place $M$ tel que $B$ soit le milieu de $[AM]$ ; $\\vec{AM} = -\\vec{AB}$ place $M$ symétrique de $B$ par rapport à $A$.",
      schema: tableau(
        ["AB", "2AB", "−AB"],
        [{ label: "M est", values: ["confondu avec B", "B milieu de [AM]", "symétrique de B"] }],
        "Le coefficient dit où l'on tombe",
      ),
    },
    {
      titre: "Prouver un alignement",
      detail:
        "$A$, $B$, $C$ sont alignés si et seulement si $\\vec{AB}$ et $\\vec{AC}$ sont COLINÉAIRES. En coordonnées, on le teste par le déterminant $xy' - x'y = 0$.",
      schema: tableau(
        ["u(2 ; 4)", "v(1 ; 2)", "déterminant"],
        [{ label: "vaut", values: ["—", "—", "2×2 − 1×4 = 0"] }],
        "Nul : les vecteurs sont colinéaires",
      ),
    },
  ],

  exemples: [
    {
      titre: "Deux vecteurs opposés",
      donnees: "Les vecteurs $\\vec{AB}$ et $\\vec{BA}$.",
      question: "Sont-ils égaux ?",
      schema: tableau(
        ["direction", "sens", "norme"],
        [{ label: "identiques ?", values: ["oui", "NON", "oui"] }],
      ),
      solution:
        "Non. Ils ont la même direction et la même norme, mais des sens opposés : $\\vec{BA} = -\\vec{AB}$. ⭐ Leur somme vaut donc $\\vec{0}$ — on part de $A$, on revient en $A$.",
    },
    {
      titre: "Chasles avec un détour",
      donnees: "$\\vec{AB} + \\vec{CD} + \\vec{BC}$.",
      question: "Simplifier.",
      schema: tableau(
        ["réordonné", "puis", "puis"],
        [{ label: "on obtient", values: ["AB + BC + CD", "AC + CD", "AD"] }],
      ),
      solution:
        "Tel quel, rien ne s'enchaîne. Mais une somme se réordonne : $\\vec{AB} + \\vec{BC} + \\vec{CD}$. Alors $\\vec{AB} + \\vec{BC} = \\vec{AC}$, puis $\\vec{AC} + \\vec{CD} = \\vec{AD}$. Le résultat est $\\vec{AD}$ — on part de la première lettre et on arrive à la dernière.",
    },
    {
      titre: "⛔ La différence",
      donnees: "$\\vec{AB} - \\vec{AC}$.",
      question: "Simplifier.",
      schema: tableau(
        ["−AC", "on réordonne", "résultat"],
        [{ label: "vaut", values: ["CA", "CA + AB", "CB"] }],
      ),
      solution:
        "Soustraire, c'est ajouter l'opposé : $-\\vec{AC} = \\vec{CA}$. Donc $\\vec{AB} - \\vec{AC} = \\vec{AB} + \\vec{CA} = \\vec{CA} + \\vec{AB} = \\vec{CB}$. ⛔ Et non $\\vec{BC}$ : les deux vecteurs partent du même point $A$, et le résultat va du SECOND vers le PREMIER.",
    },
    {
      titre: "Placer un point",
      donnees: "$M$ est le point tel que $\\vec{AM} = 2\\vec{AB}$.",
      question: "Où se trouve $M$ ?",
      schema: tableau(
        ["déplacement", "distance", "M"],
        [{ label: "de A", values: ["même sens que AB", "le double", "B milieu de [AM]"] }],
      ),
      solution:
        "On part de $A$ et on parcourt DEUX fois le déplacement qui mène à $B$, dans le même sens. On arrive donc au-delà de $B$, à la même distance : $A$, $B$, $M$ sont alignés dans cet ordre et $AB = BM$. Autrement dit, $B$ est le milieu de $[AM]$ — et $M$ est le symétrique de $A$ par rapport à $B$.",
    },
  ],

  pieges: [
    "⛔ $\\vec{AB} - \\vec{AC} = \\vec{CB}$, et non $\\vec{BC}$. Soustraire, c'est ajouter l'opposé, et l'opposé retourne les lettres. C'est le piège numéro un du chapitre.",
    "⛔ $\\vec{AB}$ et $\\vec{BA}$ ne sont pas égaux : ils sont OPPOSÉS. Seul le sens change, mais ça suffit.",
    "⛔ Un vecteur n'a pas de position. Deux flèches éloignées l'une de l'autre sont le même vecteur si direction, sens et norme coïncident — c'est même tout l'intérêt de la notion.",
    "⛔ $\\vec{AB} = \\vec{DC}$ donne le parallélogramme $ABCD$, mais $\\vec{AB} = \\vec{CD}$ donne $ABDC$. L'ordre des sommets se lit sur l'égalité, il ne se devine pas.",
    "⛔ Les coordonnées d'un vecteur sont l'ARRIVÉE MOINS LE DÉPART : $\\vec{AB}\\,(x_B - x_A \\,;\\, y_B - y_A)$. Dans l'autre sens, on obtient $\\vec{BA}$.",
    "⛔ Une norme n'est jamais négative : c'est une longueur. Si un calcul en donne une, c'est qu'on a oublié un carré.",
  ],

  aRetenir: [
    "Un vecteur, c'est trois données : direction, sens, norme — et aucune position.",
    "Chasles : $\\vec{AB} + \\vec{BC} = \\vec{AC}$ — la lettre du milieu disparaît.",
    "Et à l'envers : $\\vec{AB} = \\vec{AM} + \\vec{MB}$ pour n'importe quel $M$.",
    "⛔ $\\vec{AB} - \\vec{AC} = \\vec{CB}$ — l'ordre s'inverse.",
    "$ABCD$ parallélogramme $\\iff$ $\\vec{AB} = \\vec{DC}$.",
    "Coordonnées : arrivée moins départ. Norme : $\\sqrt{x^2 + y^2}$, en repère orthonormé.",
  ],

  entrainement: [
    {
      question: "Que peut-on dire de $\\vec{AB}$ et $\\vec{BA}$ ?",
      correction:
        "Ils sont opposés : $\\vec{BA} = -\\vec{AB}$. Même direction, même norme, sens contraires. Leur somme vaut $\\vec{0}$.",
    },
    {
      question: "On sait que $\\vec{AB} = \\vec{DC}$. Quelle est la nature de $ABCD$ ?",
      correction:
        "Un parallélogramme. Les côtés $[AB]$ et $[DC]$ sont parallèles, de même longueur et orientés pareil.",
    },
    {
      question: "Simplifier $\\vec{EF} + \\vec{FG}$.",
      correction:
        "$\\vec{EG}$, par Chasles : la lettre $F$ est le point de passage, elle disparaît.",
    },
    {
      question: "Simplifier $\\vec{AB} + \\vec{CD} + \\vec{BC}$.",
      correction:
        "On réordonne en $\\vec{AB} + \\vec{BC} + \\vec{CD}$, ce qui donne $\\vec{AD}$. Une somme de vecteurs se réorganise librement.",
    },
    {
      question: "Simplifier $\\vec{MN} - \\vec{MP}$.",
      correction:
        "$\\vec{MN} - \\vec{MP} = \\vec{MN} + \\vec{PM} = \\vec{PM} + \\vec{MN} = \\vec{PN}$. ⛔ Et non $\\vec{NP}$ : c'est son opposé.",
    },
    {
      question: "Simplifier $\\vec{AB} + \\vec{BC} + \\vec{CA}$.",
      correction:
        "$\\vec{AC} + \\vec{CA} = \\vec{AA} = \\vec{0}$. Le circuit est fermé : on revient au point de départ.",
    },
    {
      question: "Où se trouve le point $M$ tel que $\\vec{AM} = -\\vec{AB}$ ?",
      correction:
        "Le coefficient négatif retourne le sens : $M$ est de l'autre côté de $A$, à la même distance que $B$. Donc $A$ est le milieu de $[BM]$.",
    },
    {
      question: "Le point $M$ vérifie $\\vec{AM} = \\vec{BC}$. Que peut-on dire de $ABCM$ ?",
      correction:
        "C'est un parallélogramme : $\\vec{AM} = \\vec{BC}$ équivaut à $\\vec{AB} = \\vec{MC}$, donc $[AB]$ et $[MC]$ sont parallèles et de même longueur.",
    },
    {
      question: "Calculer les coordonnées de $\\vec{AB}$ avec $A(-2 \\,;\\, 3)$ et $B(1 \\,;\\, -1)$.",
      correction:
        "Arrivée moins départ : $(1 - (-2) \\,;\\, -1 - 3) = (3 \\,;\\, -4)$.",
    },
    {
      question: "Calculer la norme du vecteur $\\vec{u}\\,(3 \\,;\\, -4)$ en repère orthonormé.",
      correction:
        "$\\|\\vec{u}\\| = \\sqrt{3^2 + (-4)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$. Le carré efface le signe : une norme est toujours positive.",
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesVecteursSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Vecteurs du plan - 2de",
    section: {
      type: "objectif",
      phrase: "Calculer avec des déplacements, sans repère",
      sousPhrase:
        "Chasles rassemble deux vecteurs et en coupe un en deux. Et la différence retourne les lettres : $\\vec{AB} - \\vec{AC} = \\vec{CB}$.",
    },
  },
];
