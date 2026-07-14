// ─── Fiche de cours : les angles (5e) ──────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/angles.bank.ts (notionId angle_mesure).
// Dessinée par le canvas « angle » du coach (arc + mesure + angle droit).
//
// Micro-compétences couvertes :
// - angle_lire      → définition + figure (60°), identité, propriété « Les 4 types »
// - angle_mesurer   → propriété « Le rapporteur » + exemple 1 (mesurer 45°), méthode
// - angle_tracer    → exemple 2 (tracer 50°), méthode
// - angle_estimer   → propriété « Comparer à 90° » + exemples 3-4 (aigu 50° / obtus 120°)
// - angle_defi      → pièges + défi 974 (randonnée 120° obtus)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Un angle dessiné par le moteur du coach (arc + éventuelle mesure).
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
  "Mal placer le centre du rapporteur : il doit être pile sur le sommet, sinon la mesure est fausse.",
  "Lire la mauvaise graduation : le rapporteur a deux séries de nombres, on part du 0 aligné sur un côté.",
  "Dire « c'est grand donc obtus » : un angle obtus, c'est une mesure entre 90° et 180°, pas une impression.",
];

const aRetenir = [
  "Un angle mesure une ouverture, en degrés (°), avec un rapporteur.",
  "Aigu < 90° ; droit = 90° ; 90° < obtus < 180° ; plat = 180°.",
  "Rapporteur : centre sur le sommet, un 0 sur un côté, on lit sur l'autre côté.",
];

export const ficheAngles5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "angle-mesure",
  titre: "Les angles",
  accroche:
    "Un angle, c'est une ouverture entre deux demi-droites. On la mesure en degrés, avec un rapporteur, et on la range en 4 familles.",
  identite: [
    { label: "Mots clés", valeur: "Sommet, côté, degré, aigu, droit, obtus" },
    { label: "Le secret", valeur: "On compare toujours à 90°" },
    { label: "Outil", valeur: "Le rapporteur (mesure en degrés)" },
  ],
  definition: {
    texte:
      "Un angle est l'ouverture entre deux demi-droites qui partent d'un même point, le sommet. On la mesure en degrés (°) avec un rapporteur. Dans l'angle AOB, la lettre du milieu (O) désigne le sommet ; A et B sont sur les deux côtés.",
  },
  figure: {
    schema: angle(60),
    legende: "L'angle AOB de sommet O : son ouverture mesure 60°.",
  },
  proprietes: [
    {
      titre: "Le sommet",
      texte: "C'est le point où les deux côtés se rejoignent (le O de AOB).",
    },
    {
      titre: "Les 4 types",
      texte: "Aigu (< 90°), droit (= 90°), obtus (entre 90° et 180°), plat (= 180°).",
    },
    {
      titre: "Le rapporteur",
      texte: "Centre sur le sommet, le 0 aligné sur un côté, on lit la graduation sur l'autre côté.",
    },
    {
      titre: "Estimer",
      texte: "Sans mesurer : plus petit que l'angle droit → aigu ; plus grand → obtus.",
    },
  ],
  reel: {
    texte:
      "Les angles sont partout : le virage à 90° d'un skateur, l'inclinaison d'un toit ou d'une rampe, l'ouverture d'une paire de ciseaux, l'orientation de deux chemins sur une carte de randonnée.",
  },
  historique: {
    texte:
      "Le degré (360° pour un tour complet) nous vient des astronomes de Babylone, il y a plus de 4000 ans. Ils comptaient en base 60, ce qui explique aussi les 60 minutes d'une heure.",
  },
  methode: [
    { titre: "Je place le centre", texte: "Le centre du rapporteur exactement sur le sommet de l'angle." },
    { titre: "J'aligne le zéro", texte: "Le 0 du rapporteur sur un des deux côtés de l'angle." },
    { titre: "Je lis / je trace", texte: "Je lis la graduation atteinte par l'autre côté (ou je marque la mesure voulue)." },
  ],
  usages: [
    { titre: "Lire un angle", detail: "La mesure est écrite : on la lit directement en degrés." },
    { titre: "Mesurer un angle", detail: "Avec le rapporteur, centre sur le sommet, 0 sur un côté." },
    { titre: "Tracer un angle", detail: "Sommet, premier côté, on repère la graduation voulue, on trace le second côté." },
  ],
  exemples: [
    {
      titre: "Reconnaître un angle droit",
      donnees: "Un angle qui mesure 90°.",
      question: "Comment l'appelle-t-on ?",
      schema: angle(90),
      solution:
        "Un angle de 90° est un angle droit. On le repère avec le petit carré à son sommet.",
    },
    {
      titre: "Mesurer un angle",
      donnees: "Un angle dont la mesure est cachée.",
      question: "Combien mesure-t-il ?",
      schema: angle(45, { showMeasure: false, placeholder: "?" }),
      solution:
        "Avec le rapporteur (centre sur le sommet, 0 sur un côté), on lit 45° : c'est la moitié d'un angle droit.",
    },
    {
      titre: "Un angle aigu",
      donnees: "Un angle d'environ 50°.",
      question: "Aigu, droit ou obtus ?",
      schema: angle(50, { showMeasure: false, placeholder: "?" }),
      solution:
        "50° est plus petit que 90° : c'est un angle aigu.",
    },
    {
      titre: "Un angle obtus",
      donnees: "Un angle d'environ 120°.",
      question: "Aigu, droit ou obtus ?",
      schema: angle(120, { showMeasure: false, placeholder: "?" }),
      solution:
        "120° est plus grand que 90° et plus petit que 180° : c'est un angle obtus.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un angle mesure 30°. Est-il aigu, droit ou obtus ?",
      correction: "30° < 90°, donc c'est un angle aigu.",
    },
    {
      question: "Pour tracer un angle de 50°, quelle graduation repérer sur le rapporteur ?",
      correction: "On repère la graduation 50° (après avoir placé le centre sur le sommet et le 0 sur un côté).",
    },
    {
      question: "Un skateur tourne d'environ 90°. Quel type d'angle ?",
      correction: "Un virage de 90° correspond à un angle droit.",
    },
    {
      question: "À La Réunion, deux chemins forment un angle d'environ 120°. Quel type d'angle ?",
      correction: "120° est entre 90° et 180° : c'est un angle obtus.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

export const slidesAngles5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Angles - 5e",
    section: {
      type: "objectif",
      phrase: "Lire, mesurer, tracer et nommer un angle",
      sousPhrase:
        "Un angle est une ouverture, mesurée en degrés avec un rapporteur. On la compare à 90°.",
      encadre: {
        titre: "L'idée",
        texte: "Aigu < 90° ; droit = 90° ; obtus entre 90° et 180° ; plat = 180°.",
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
          "Virage d'un skateur, inclinaison d'un toit ou d'une rampe, ciseaux, orientation de chemins sur une carte.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le degré (360° par tour) vient des astronomes de Babylone, il y a plus de 4000 ans (base 60).",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode (rapporteur)",
    section: {
      type: "cartes",
      cartes: ficheAngles5e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Lire, mesurer, tracer",
    badge: "3 usages",
    section: {
      type: "cartes",
      cartes: ficheAngles5e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Les 4 types",
    badge: "Comparer à 90°",
    section: {
      type: "objectif",
      phrase: "aigu < 90° < obtus < 180°",
      sousPhrase: "Droit = 90° (petit carré), plat = 180° (les côtés forment une ligne droite).",
      encadre: {
        titre: "Le réflexe",
        texte: "On compare toujours l'angle à l'angle droit.",
      },
    },
  },
  {
    titre: "Aigu ou obtus ?",
    badge: "Exemple guidé",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "50°",
        contenu: "Plus petit que 90° → angle aigu.",
      },
      droite: {
        variante: "ok",
        titre: "120°",
        contenu: "Entre 90° et 180° → angle obtus.",
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
      enonce: "À La Réunion, deux chemins de randonnée forment un angle d'environ 120°.",
      question: "Est-ce un angle aigu, droit ou obtus ?",
      indice: "Compare 120° à 90°.",
      correction: "120° est entre 90° et 180° : c'est un angle obtus.",
    },
  },
];
