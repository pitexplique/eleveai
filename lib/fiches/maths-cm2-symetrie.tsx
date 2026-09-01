// ─── Fiche de cours : la symétrie axiale (CM2) ──────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/symetrie.bank.ts (notionId symetrie).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On DESSINE le « miroir »
// (canvas transformation symetrie_axiale du coach).
//
// Micro-compétences couvertes (les 5 de la banque) :
// - symetrie_axe       → definition (l'axe = un miroir), figure (figure + image), propriété « L'axe », usages (axes carré/rectangle)
// - symetrie_propriete → propriété « Même distance », exemple « Le point » (A à 3 carreaux → A')
// - symetrie_completer → exemple « Compléter » (l'autre moitié)
// - symetrie_construire→ propriété « Construire », méthode, exemple « Construire l'image »
// - symetrie_defi      → défi dessiné (pliage : combien d'axes pour un carré ?)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const AXE = { type: "vertical" as const, x: 4, label: "axe" };
const GRID = { rows: 6, cols: 8 };
const SIZE = { cellSize: 30, padding: 18 };
// ⭐ LE TITRE EST DEMANDÉ EXPLICITEMENT — le défaut de `TransformationCanvas`
// est passé à `false` le 01/09/2026, parce qu'il divulguait la réponse de
// quatre questions du coach (« Quelle transformation retourne une figure comme
// dans un miroir ? », avec « Symétrie axiale » écrit au-dessus du dessin).
// ⚠️ Dans une FICHE, c'est l'inverse : ce titre est la seule étiquette du
// dessin. Mesuré après l'inversion, avant ce correctif : 17 dessins de fiche
// se retrouvaient sans aucun texte autour d'eux.
const DISPLAY = {
  showGrid: true,
  showLabels: true,
  showPoints: true,
  showDashedLinks: true,
  showTransformationInfo: true,
};

// Une figure bleue et son image de l'autre côté de l'axe (le miroir).
const schemaSymetrie = (
  <CanvasRenderer
    figure={{
      kind: "transformation",
      transformation: "symetrie_axiale",
      grid: GRID,
      size: SIZE,
      axis: AXE,
      source: { points: [{ x: 1, y: 1 }, { x: 3, y: 2 }, { x: 1, y: 4 }], label: "figure" },
      image: { points: [{ x: 7, y: 1 }, { x: 5, y: 2 }, { x: 7, y: 4 }], label: "image" },
      display: DISPLAY,
    }}
  />
);

// L'image A' d'un point A situé à 3 carreaux de l'axe (même distance de l'autre côté).
const symPoint = (
  <CanvasRenderer
    figure={{
      kind: "transformation",
      transformation: "symetrie_axiale",
      grid: GRID,
      size: SIZE,
      axis: AXE,
      source: { points: [{ x: 1, y: 3 }], label: "A" },
      image: { points: [{ x: 7, y: 3 }], label: "A'" },
      display: DISPLAY,
    }}
  />
);

// Compléter : une moitié bleue, on cherche l'autre moitié (l'image).
const symCompleter = (
  <CanvasRenderer
    figure={{
      kind: "transformation",
      transformation: "symetrie_axiale",
      grid: GRID,
      size: SIZE,
      axis: AXE,
      source: { points: [{ x: 2, y: 1 }, { x: 2, y: 5 }, { x: 3, y: 3 }], label: "moitié" },
      image: { points: [{ x: 6, y: 1 }, { x: 6, y: 5 }, { x: 5, y: 3 }], label: "l'autre moitié" },
      display: DISPLAY,
    }}
  />
);

const pieges = [
  "Placer l'image du bon côté mais pas à la bonne distance : le point et son image sont à la MÊME distance de l'axe.",
  "Confondre l'axe et un simple trait : l'axe est une droite « miroir » qui plie la figure en deux moitiés identiques.",
  "Croire que toute figure a un axe : certaines n'en ont aucun, d'autres en ont plusieurs (le carré en a 4).",
];

const aRetenir = [
  "Un axe de symétrie est comme un miroir : chaque point a une image de l'autre côté.",
  "Le point et son image sont à la même distance de l'axe, sur une ligne perpendiculaire à l'axe.",
  "Le rectangle a 2 axes de symétrie, le carré en a 4.",
];

export const ficheSymetrieCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "symetrie",
  titre: "La symétrie axiale",
  accroche:
    "La symétrie axiale, c'est le reflet dans un miroir. L'axe plie la figure en deux moitiés qui se ressemblent exactement, comme un papillon ou ton visage.",
  identite: [
    { label: "Mots clés", valeur: "Axe, miroir, image, reflet, même distance" },
    { label: "Le secret", valeur: "L'axe est un miroir : chaque point a son image de l'autre côté" },
    { label: "Outil", valeur: "Le pliage (papier) et le quadrillage" },
  ],
  definition: {
    texte:
      "Une figure et son image sont symétriques par rapport à un axe quand l'axe se comporte comme un miroir : si on plie la feuille le long de l'axe, les deux moitiés se superposent exactement. Chaque point a une image de l'autre côté de l'axe, à la même distance.",
  },
  figure: {
    schema: schemaSymetrie,
    legende: "La figure (à gauche) et son image (à droite) : l'axe est le miroir entre les deux.",
  },
  proprietes: [
    {
      titre: "L'axe est un miroir",
      texte: "Si on plie le long de l'axe, la figure et son image se recouvrent exactement.",
    },
    {
      titre: "Même distance",
      texte: "Un point et son image sont à la même distance de l'axe, de part et d'autre.",
    },
    {
      titre: "Construire",
      texte: "Pour chaque point, on compte les carreaux jusqu'à l'axe, puis on reporte la même distance de l'autre côté.",
    },
    {
      titre: "Combien d'axes ?",
      texte: "Le rectangle a 2 axes de symétrie, le carré en a 4, le cercle en a une infinité.",
    },
  ],
  reel: {
    texte:
      "La symétrie est partout à La Réunion : les ailes d'un papillon La Pandore, un margouillat vu de face, le reflet du volcan dans un lagon calme, les motifs des tissus créoles. Notre visage est presque symétrique : un œil de chaque côté du nez.",
  },
  historique: {
    texte:
      "L'idée de symétrie est très ancienne : les artisans de l'Égypte et de la Grèce l'utilisaient déjà pour décorer temples et poteries. Le mot « symétrie » vient du grec « summetria » : « juste proportion ».",
  },
  methode: [
    { titre: "Je repère l'axe", texte: "C'est la droite « miroir » qui sépare la figure de son image." },
    { titre: "Je compte les carreaux", texte: "Pour un point : de combien de carreaux suis-je de l'axe ?" },
    { titre: "Je reporte de l'autre côté", texte: "Je place l'image à la même distance, de l'autre côté de l'axe." },
  ],
  usages: [
    { titre: "Reconnaître", detail: "La figure a-t-elle un axe (papillon, cœur, carré) ?" },
    { titre: "Compléter", detail: "On donne une moitié, on dessine l'autre par symétrie." },
    { titre: "Construire", detail: "On place l'image d'un point ou d'une figure, carreau par carreau." },
  ],
  exemples: [
    {
      titre: "L'image d'un point",
      donnees: "Le point A est à 3 carreaux de l'axe.",
      question: "Où se trouve son image A' ?",
      schema: symPoint,
      solution:
        "On reporte la même distance de l'autre côté : A' est aussi à 3 carreaux de l'axe, sur la même ligne. A et A' sont symétriques.",
    },
    {
      titre: "Compléter une figure",
      donnees: "On voit une moitié de la figure, à gauche de l'axe.",
      question: "Comment dessiner l'autre moitié ?",
      schema: symCompleter,
      solution:
        "Pour chaque point, on compte les carreaux jusqu'à l'axe et on reporte la même distance à droite. On obtient l'image, moitié par moitié.",
    },
    {
      titre: "Reconnaître une symétrie",
      donnees: "Une figure bleue et une figure « image » de l'autre côté de l'axe.",
      question: "Sont-elles bien symétriques ?",
      schema: schemaSymetrie,
      solution:
        "On vérifie que chaque point est à la même distance de l'axe des deux côtés (les traits en pointillés sont perpendiculaires à l'axe). Si oui, c'est bien une symétrie.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un point B est à 5 carreaux de l'axe. À quelle distance est son image B' ?",
      correction:
        "À la même distance : B' est à 5 carreaux de l'axe, de l'autre côté, sur la même ligne.",
    },
    {
      question: "Combien d'axes de symétrie possède un rectangle (qui n'est pas un carré) ?",
      correction:
        "2 axes : un vertical et un horizontal, qui passent par le milieu des côtés.",
    },
    {
      question: "Combien d'axes de symétrie possède un carré ?",
      correction:
        "4 axes : 2 par le milieu des côtés et 2 par les diagonales.",
    },
    {
      question: "Pour vérifier un axe de symétrie sur du papier, que peut-on faire ?",
      correction:
        "On plie la feuille le long de l'axe : si les deux moitiés se superposent exactement, c'est bien un axe de symétrie.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesSymetrieCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Symétrie - CM2",
    section: {
      type: "objectif",
      phrase: "Reconnaître, compléter et construire par symétrie",
      sousPhrase:
        "La symétrie axiale, c'est le reflet dans un miroir. L'axe plie la figure en deux moitiés identiques.",
      encadre: {
        titre: "L'idée",
        texte: "Chaque point a son image de l'autre côté de l'axe, à la même distance.",
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
          "Les ailes d'un papillon, un visage, le reflet du volcan dans un lagon, les motifs des tissus créoles.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Symétrie » vient du grec summetria (« juste proportion »). Les artisans grecs et égyptiens l'utilisaient déjà.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheSymetrieCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Combien d'axes ?",
    badge: "À connaître",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Rectangle", texte: "2 axes (vertical et horizontal, par le milieu des côtés)." },
        { titre: "Carré", texte: "4 axes (les côtés et les diagonales)." },
        { titre: "Cercle", texte: "Une infinité d'axes (tous passent par le centre)." },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "L'image d'un point",
    section: {
      type: "exemple",
      enonce: "Le point A est à 3 carreaux de l'axe.",
      question: "Où se trouve son image A' ?",
      correction: "À la même distance de l'autre côté : A' est à 3 carreaux de l'axe, sur la même ligne.",
    },
  },
  {
    titre: "Le pliage",
    badge: "Le test du miroir",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "On plie",
        contenu: "On plie la feuille le long de l'axe.",
      },
      droite: {
        variante: "ok",
        titre: "On vérifie",
        contenu: "Si les deux moitiés se superposent exactement, c'est bien un axe de symétrie.",
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
      enonce: "On veut vérifier si un carré a des axes de symétrie.",
      question: "Combien d'axes de symétrie a un carré ?",
      indice: "Pense au pliage : par le milieu des côtés, puis par les diagonales.",
      correction: "4 axes : 2 par le milieu des côtés et 2 par les diagonales.",
    },
  },
];
