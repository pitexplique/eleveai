// ─── Fiche de cours : les angles (6e) ──────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach (angles.bank.ts).
// Micro-compétences couvertes → blocs :
//   angle_reconnaitre → Définition, méthode « Reconnaître », usage 1, exemple 1, exercice 1
//   angle_droit       → Propriété « L'angle droit », formule, à retenir, exercice 4
//   angle_comparer    → Propriétés aigu/obtus, usage 1, exemple 2, exercice 2
//   angle_mesurer     → Carte d'identité (rapporteur), méthode « Mesurer », usage 2, piège 1
//   angle_tracer      → Méthode « Tracer », usage 3, exercice 3
//   angle_defi        → Exemple 2 et exercice 4 (comparer à l'angle droit)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// L'angle droit dessiné par le moteur du coach (le petit carré au sommet).
const schemaAngleDroit = (
  <CanvasRenderer
    figure={{
      kind: "angle",
      size: { width: 220, height: 180 },
      angle: {
        angleDeg: 90,
        labels: { angle: "90°" },
        display: { showArc: true, showRightAngle: true, showMeasure: true, showLabels: true },
      },
    }}
  />
);

const pieges = [
  "Lire la mauvaise graduation du rapporteur : il y a deux échelles, on suit celle qui commence à 0 sur un côté de l'angle.",
  "Croire qu'un angle aux côtés plus longs est plus grand : la longueur des côtés ne change pas l'ouverture.",
  "Mal placer le rapporteur : son centre doit être exactement sur le sommet de l'angle.",
];

const aRetenir = [
  "Un angle est formé par deux demi-droites de même origine. Ce point commun s'appelle le sommet.",
  "On mesure un angle en degrés avec un rapporteur. Un angle droit mesure 90°, un angle plat 180°.",
  "Un angle aigu mesure moins de 90°, un angle obtus mesure entre 90° et 180°.",
];

// Un angle « générique » dessiné par le moteur du coach : sommet + deux côtés.
const schemaAngle = (
  <CanvasRenderer
    figure={{
      kind: "angle",
      size: { width: 260, height: 190 },
      angle: {
        angleDeg: 55,
        labels: { vertex: "sommet", left: "côté", right: "côté" },
        display: { showArc: true, showMeasure: false, showLabels: true, showRightAngle: false },
      },
    }}
  />
);

// Un angle obtus (118°) mesuré, pour l'exemple de comparaison à l'angle droit.
const schemaAngleObtus = (
  <CanvasRenderer
    figure={{
      kind: "angle",
      size: { width: 240, height: 180 },
      angle: {
        angleDeg: 118,
        labels: { angle: "118°" },
        display: { showArc: true, showMeasure: true, showLabels: true, showRightAngle: false },
      },
    }}
  />
);

export const ficheAngles6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "angle-mesure",
  titre: "Les angles",
  accroche:
    "Un angle, c'est une ouverture entre deux demi-droites qui partent du même point. En 6e, on apprend à reconnaître un angle, à le comparer, à le mesurer au rapporteur et à le tracer.",
  identite: [
    { label: "Prérequis", valeur: "Demi-droite, point, segment" },
    { label: "Outil", valeur: "Le rapporteur, gradué en degrés" },
    { label: "Unité", valeur: "Le degré, noté °" },
  ],
  definition: {
    texte:
      "Un angle est formé par deux demi-droites qui ont la même origine. Ce point commun s'appelle le sommet de l'angle, et les deux demi-droites sont ses côtés. La mesure de l'angle, c'est la taille de l'ouverture entre les deux côtés.",
  },
  figure: {
    schema: schemaAngle,
    legende: "Un angle : un sommet et deux côtés.",
  },
  proprietes: [
    {
      titre: "L'angle droit",
      texte:
        "Un angle droit mesure exactement 90°. C'est l'angle des coins d'un carré ou d'un rectangle. On le vérifie avec une équerre.",
    },
    {
      titre: "Aigu ou obtus",
      texte:
        "Un angle aigu mesure moins de 90° : il est plus petit qu'un angle droit. Un angle obtus mesure entre 90° et 180° : il est plus grand qu'un angle droit.",
    },
    {
      titre: "L'angle plat",
      texte:
        "Un angle plat mesure 180°. Ses deux côtés sont alignés : ils forment une ligne droite qui passe par le sommet.",
    },
    {
      titre: "Le degré",
      texte:
        "On mesure les angles en degrés, notés °. Comparer deux angles donnés en degrés, c'est comparer leurs mesures : 80° est plus grand que 30°.",
    },
  ],
  reel: {
    texte:
      "Les angles sont partout : la pente d'une route ou d'une rampe de skate, l'inclinaison des poutres d'une charpente, l'ouverture des aiguilles d'une montre, la direction d'un avion ou d'un bateau. Mesurer un angle, c'est décrire une ouverture ou une pente avec un nombre précis.",
  },
  historique: {
    texte:
      "Les 360° du tour complet viennent des Babyloniens, il y a environ 4000 ans. Ils comptaient en base 60 et ont partagé le cercle en 360 parts : c'est de là que viennent nos degrés, et aussi nos 60 minutes et 60 secondes.",
  },
  formule: {
    contexte: "Les deux angles de référence",
    expression: "angle droit = 90° et angle plat = 180°",
    legende: "Tous les autres angles se comparent à eux : aigu si moins de 90°, obtus entre 90° et 180°.",
    schema: schemaAngleDroit,
  },
  methode: [
    {
      titre: "Reconnaître",
      texte:
        "On repère les deux demi-droites et leur point commun : le sommet. Puis on classe l'angle en le comparant à l'angle droit : aigu, droit, obtus ou plat.",
    },
    {
      titre: "Mesurer",
      texte:
        "On place le centre du rapporteur sur le sommet, le zéro sur un côté, puis on lit la graduation traversée par l'autre côté.",
    },
    {
      titre: "Tracer",
      texte:
        "On commence par placer le sommet et un premier côté. Ensuite, avec le rapporteur, on marque la mesure voulue et on trace le deuxième côté.",
    },
  ],
  usages: [
    {
      titre: "Reconnaître et comparer",
      detail:
        "On identifie le sommet et les côtés, puis on compare les angles : celui qui a la plus grande mesure en degrés est le plus grand.",
    },
    {
      titre: "Mesurer un angle",
      detail:
        "On utilise le rapporteur : centre sur le sommet, zéro sur un côté, lecture sur l'autre côté. Le résultat est en degrés.",
    },
    {
      titre: "Tracer un angle",
      detail:
        "On place d'abord le sommet, on trace un premier côté, puis on utilise le rapporteur pour placer le deuxième côté à la bonne mesure.",
    },
  ],
  exemples: [
    {
      titre: "Reconnaître un angle",
      donnees: "Sur une figure, deux demi-droites partent du même point O.",
      question: "Que forment-elles, et comment s'appelle le point O ?",
      solution:
        "Deux demi-droites de même origine forment un angle. Le point O, commun aux deux côtés, s'appelle le sommet de l'angle.",
    },
    {
      titre: "Comparer à l'angle droit",
      donnees: "Un angle mesure 118°.",
      question: "Est-il aigu, droit ou obtus ?",
      schema: schemaAngleObtus,
      solution:
        "Un angle droit mesure 90°. Comme 118 est plus grand que 90 et plus petit que 180, l'angle de 118° est plus grand qu'un angle droit : il est obtus.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Combien de demi-droites forment un angle, et comment s'appelle leur point commun ?",
      correction:
        "Un angle est formé par deux demi-droites. Elles partent du même point, et ce point commun s'appelle le sommet de l'angle.",
    },
    {
      question: "Quel angle est le plus grand : 35° ou 80° ?",
      correction:
        "On compare les mesures : 80 est plus grand que 35. Donc l'angle de 80° est le plus grand. La longueur des côtés dessinés ne compte pas, seule la mesure en degrés compte.",
    },
    {
      question:
        "Pour tracer un angle de 40°, quel instrument utilises-tu et par quoi commences-tu ?",
      correction:
        "On utilise un rapporteur, car il est gradué en degrés. On commence par placer le sommet et tracer un premier côté. Puis on met le centre du rapporteur sur le sommet, le zéro sur ce côté, on marque 40° et on trace le deuxième côté.",
    },
    {
      question:
        "Un angle de 120° est-il plus petit, égal ou plus grand qu'un angle droit ?",
      correction:
        "Un angle droit mesure 90°. On compare : 120 est plus grand que 90, et plus petit que 180. Donc un angle de 120° est plus grand qu'un angle droit : c'est un angle obtus.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesAngles6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les angles - 6e",
    section: {
      type: "objectif",
      phrase: "Reconnaître, mesurer et tracer un angle",
      sousPhrase:
        "Un angle, c'est l'ouverture entre deux demi-droites qui partent du même point : le sommet.",
      encadre: {
        titre: "L'idée",
        texte: "Une ouverture se mesure avec un nombre : les degrés.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "Pente d'une route ou d'une rampe de skate, poutres d'une charpente, aiguilles d'une montre, direction d'un avion ou d'un bateau.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Les 360° du cercle viennent des Babyloniens, il y a 4000 ans : ils comptaient en base 60, comme nos minutes et nos secondes.",
      },
    },
  },
  {
    titre: "La définition",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "Deux demi-droites de même origine",
      sousPhrase:
        "Le point commun s'appelle le sommet, les deux demi-droites sont les côtés de l'angle.",
      encadre: {
        titre: "Attention",
        texte: "La longueur des côtés ne change pas la mesure de l'angle.",
      },
    },
  },
  {
    titre: "La famille des angles",
    badge: "4 repères",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Aigu", texte: "Moins de 90° : plus petit qu'un angle droit." },
        { titre: "Droit", texte: "Exactement 90° : le coin d'un carré." },
        { titre: "Obtus", texte: "Entre 90° et 180° : plus grand qu'un angle droit." },
        { titre: "Plat", texte: "Exactement 180° : les deux côtés sont alignés." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheAngles6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheAngles6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Comparer à l'angle droit",
    section: {
      type: "exemple",
      enonce: "Un angle mesure 118°.",
      question: "Est-il aigu, droit ou obtus ?",
      correction:
        "Un angle droit mesure 90°. Comme 118 est entre 90 et 180, cet angle est obtus.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    section: {
      type: "exercice",
      enonce: "Un angle mesure 120°.",
      question: "Est-il plus petit, égal ou plus grand qu'un angle droit ?",
      indice: "Un angle droit mesure 90°.",
      correction:
        "120 est plus grand que 90 et plus petit que 180 : l'angle est plus grand qu'un angle droit, il est obtus.",
    },
  },
];
