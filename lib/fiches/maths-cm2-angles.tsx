// ─── Fiche de cours : les angles (CM2) ──────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/angles.bank.ts (notionId angle).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On DESSINE l'angle et le
// rapporteur (canvas angle du coach).
//
// Micro-compétences couvertes (les 5 de la banque) :
// - angle_reconnaitre → definition (2 demi-droites, sommet), figure (angle 60°), propriété « Sommet et côtés »
// - angle_droit       → propriété « L'angle droit », exemple « L'angle droit » (90°, l'équerre)
// - angle_type        → propriété « Les familles », exemple « Aigu ou obtus » (aigu 40, obtus 130)
// - angle_mesurer     → propriété « Le rapporteur », exemple « Mesurer » (rapporteur), méthode
// - angle_defi        → défi dessiné (l'aiguille de l'horloge à 3 h → angle droit)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const angle = (
  angleDeg: number,
  opts: { showMeasure?: boolean; placeholder?: string; showRightAngle?: boolean } = {}
) => (
  <CanvasRenderer
    figure={{
      kind: "angle",
      angle: {
        angleDeg,
        labels: { vertex: "O", left: "A", right: "B", angle: `${angleDeg}°` },
        display: {
          showLabels: true,
          showMeasure: opts.showMeasure ?? true,
          showArc: true,
          showRightAngle: opts.showRightAngle ?? angleDeg === 90,
          placeholder: opts.placeholder,
        },
      },
    }}
  />
);

const pieges = [
  "Croire qu'un angle « plus long » est plus grand : l'angle mesure l'OUVERTURE, pas la longueur des côtés.",
  "Mal placer le rapporteur : son centre doit être pile sur le sommet, un 0 aligné sur un côté.",
  "Dire « c'est grand donc obtus » : un angle obtus mesure entre 90° et 180°, ce n'est pas une impression.",
];

const aRetenir = [
  "Un angle, c'est l'ouverture entre deux demi-droites qui partent du même point : le sommet.",
  "Aigu < 90° ; droit = 90° ; obtus entre 90° et 180° ; plat = 180°.",
  "On mesure en degrés (°) avec un rapporteur : centre sur le sommet, un 0 sur un côté.",
];

export const ficheAnglesCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "angle",
  titre: "Les angles",
  accroche:
    "Un angle, c'est une ouverture entre deux demi-droites, comme les branches d'une paire de ciseaux. On les range en familles (aigu, droit, obtus) et on les mesure en degrés.",
  identite: [
    { label: "Mots clés", valeur: "Angle, sommet, côté, degré, aigu, droit, obtus" },
    { label: "Le secret", valeur: "On compare toujours à l'angle droit (90°)" },
    { label: "Outil", valeur: "L'équerre (angle droit) et le rapporteur (degrés)" },
  ],
  definition: {
    texte:
      "Un angle est l'ouverture entre deux demi-droites qui partent d'un même point, appelé le sommet. Les deux demi-droites sont les côtés de l'angle. Plus l'ouverture est grande, plus l'angle est grand — la longueur des côtés ne change rien.",
  },
  figure: {
    schema: angle(60),
    legende: "L'angle de sommet O : son ouverture mesure 60°. A et B sont sur les deux côtés.",
  },
  proprietes: [
    {
      titre: "Sommet et côtés",
      texte: "Le sommet est le point où les deux côtés se rejoignent. Les côtés sont les deux demi-droites.",
    },
    {
      titre: "L'angle droit",
      texte: "Un angle droit mesure 90°. C'est le coin d'une feuille, d'un cahier : on le vérifie avec l'équerre.",
    },
    {
      titre: "Les familles",
      texte: "Aigu (plus petit qu'un angle droit), droit (= 90°), obtus (plus grand qu'un angle droit), plat (= 180°).",
    },
    {
      titre: "Le rapporteur",
      texte: "Pour mesurer en degrés : centre sur le sommet, un 0 aligné sur un côté, on lit sur l'autre côté.",
    },
  ],
  reel: {
    texte:
      "Les angles sont partout à La Réunion : les branches d'un margouillat, l'ouverture d'une paire de ciseaux, le coin d'un carreau (angle droit), la pente d'un toit, les aiguilles de l'horloge. À 3 heures, les aiguilles forment un angle droit.",
  },
  historique: {
    texte:
      "Le degré vient des Babyloniens, il y a plus de 4000 ans : ils comptaient en base 60 et ont partagé le tour complet en 360 degrés. C'est pour ça qu'un tour fait 360°, un demi-tour 180° et un quart de tour 90°.",
  },
  methode: [
    { titre: "Je compare à l'angle droit", texte: "Plus petit que 90° → aigu. Égal → droit. Plus grand → obtus." },
    { titre: "Je place le rapporteur", texte: "Centre sur le sommet, un 0 sur un côté." },
    { titre: "Je lis les degrés", texte: "Je suis l'autre côté et je lis la graduation." },
  ],
  usages: [
    { titre: "Reconnaître", detail: "L'angle est-il aigu, droit ou obtus ?" },
    { titre: "Vérifier l'angle droit", detail: "Le coin est-il bien à 90° ? On utilise l'équerre." },
    { titre: "Mesurer", detail: "Combien de degrés ? On utilise le rapporteur." },
  ],
  exemples: [
    {
      titre: "L'angle droit",
      donnees: "On observe le coin d'un carreau.",
      question: "Combien mesure un angle droit ?",
      schema: angle(90),
      solution:
        "Un angle droit mesure 90°. On le reconnaît au petit carré dessiné dans le coin. C'est l'angle d'une feuille.",
    },
    {
      titre: "Un angle aigu",
      donnees: "Une ouverture plus petite que l'angle droit.",
      question: "Cet angle est-il aigu ou obtus ?",
      schema: angle(40),
      solution:
        "40° est plus petit que 90° : l'angle est plus fermé que l'angle droit. C'est un angle aigu.",
    },
    {
      titre: "Un angle obtus",
      donnees: "Une ouverture plus grande que l'angle droit.",
      question: "Cet angle est-il aigu ou obtus ?",
      schema: angle(130),
      solution:
        "130° est plus grand que 90° (mais plus petit que 180°) : l'angle est plus ouvert que l'angle droit. C'est un angle obtus.",
    },
    {
      titre: "Mesurer au rapporteur",
      donnees: "On veut mesurer un angle.",
      question: "Comment lire sa mesure ?",
      schema: angle(60, { showMeasure: false, placeholder: "?" }),
      solution:
        "On met le centre du rapporteur sur le sommet, un 0 aligné sur un côté, puis on lit la graduation sur l'autre côté : ici 60°.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un angle mesure 50°. Est-il aigu, droit ou obtus ?",
      correction:
        "50° est plus petit que 90° : c'est un angle aigu.",
    },
    {
      question: "Combien mesure un angle droit ? Et un angle plat ?",
      correction:
        "Un angle droit mesure 90°, un angle plat mesure 180° (les deux côtés sont alignés).",
    },
    {
      question: "Un angle mesure 120°. Dans quelle famille est-il ?",
      correction:
        "120° est entre 90° et 180° : c'est un angle obtus.",
    },
    {
      question: "À 3 heures, quel angle forment les deux aiguilles de l'horloge ?",
      correction:
        "La petite sur le 3, la grande sur le 12 : elles forment un quart de tour, donc un angle droit (90°).",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesAnglesCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Angles - CM2",
    section: {
      type: "objectif",
      phrase: "Reconnaître, ranger et mesurer les angles",
      sousPhrase:
        "Un angle, c'est l'ouverture entre deux demi-droites qui partent du même point, le sommet.",
      encadre: {
        titre: "L'idée",
        texte: "On compare toujours à l'angle droit (90°).",
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
          "Une paire de ciseaux, le coin d'un carreau, la pente d'un toit, les aiguilles de l'horloge.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le degré vient des Babyloniens : ils ont partagé le tour complet en 360°. Un quart de tour fait 90°.",
      },
    },
  },
  {
    titre: "Les familles d'angles",
    badge: "À connaître",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Aigu", texte: "Plus petit que 90° (plus fermé que l'angle droit)." },
        { titre: "Droit", texte: "Exactement 90° (le coin d'une feuille)." },
        { titre: "Obtus", texte: "Entre 90° et 180° (plus ouvert que l'angle droit)." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheAnglesCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Aigu ou obtus ?",
    section: {
      type: "exemple",
      enonce: "Un angle mesure 130°.",
      question: "Est-il aigu ou obtus ?",
      correction: "130° est plus grand que 90° : c'est un angle obtus.",
    },
  },
  {
    titre: "Mesurer au rapporteur",
    badge: "La méthode",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Je place",
        contenu: "Le centre du rapporteur pile sur le sommet, un 0 aligné sur un côté.",
      },
      droite: {
        variante: "ok",
        titre: "Je lis",
        contenu: "Je suis l'autre côté et je lis la graduation, en degrés.",
      },
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
      enonce: "À 3 heures, on regarde les aiguilles de l'horloge.",
      question: "Quel angle forment-elles ?",
      indice: "De 12 à 3, c'est un quart de tour. Un tour complet fait 360°.",
      correction: "Un quart de tour = 360 ÷ 4 = 90° : c'est un angle droit.",
    },
  },
];
