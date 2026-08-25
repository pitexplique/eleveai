// ─── Fiche de cours : les angles (6e) ──────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach (angles.bank.ts).
// Micro-compétences couvertes → blocs :
//   angle_reconnaitre → Définition, méthode « Reconnaître », usage 1, exemple 1, exercice 1
//   angle_droit       → Propriété « L'angle droit », formule, à retenir, exercice 4
//   angle_comparer    → Propriétés aigu/obtus, usage 1, exemple 2, exercice 2
//   angle_mesurer     → Carte d'identité (rapporteur), méthode « Mesurer », usage 2, piège 1
//   angle_tracer      → Méthode « Tracer », usage 3, exercice 3
//   angle_defi        → Exemple 2 et exercice 4 (comparer à l'angle droit)

//
// ⭐ UN DESSIN PAR BLOC (REGLES.md § 2 bis), et HUIT IMAGES DIFFÉRENTES. Les
// quatre propriétés d'une fiche d'angles glissent naturellement vers quatre fois
// le même angle — donc quatre règles identiques aux yeux d'un élève de 6e. Ici :
// le carré et ses coins codés (l'angle droit est un COIN), deux ouvertures
// comparées, l'angle plat dont les côtés s'alignent, une droite graduée de 0 à
// 180 (comparer deux angles, c'est comparer deux NOMBRES), les deux demi-droites
// avant l'angle (ce qu'on repère), et le rapporteur sur deux de ses trois gestes.
//
// ⭐ LE PATRON VIENT DE LA 5e (`maths-5e-angles.tsx`) : même helper `angle()`,
// pour que l'élève qui monte d'une classe retrouve exactement le même dessin.
// Sa `rangee()` en deux colonnes est ici une `pile()` — mesuré plus bas.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const BLEU = "#2563eb";
const ROUGE = "#dc2626";

// Un angle du moteur du coach, en un appel — et, au besoin, le RAPPORTEUR posé
// dessus : `rapporteur` allume un des trois gestes de la mesure sans changer de
// dessin (le centre sur le sommet, le 0 sur un côté, la graduation atteinte).
const angle = (
  angleDeg: number,
  opts: {
    showMeasure?: boolean;
    placeholder?: string;
    labels?: { vertex?: string; left?: string; right?: string };
    /** "pose" = l'instrument entier, sans geste allumé. */
    rapporteur?: "pose" | "vertex" | "zero" | "reading";
    size?: { width?: number; height?: number };
  } = {}
) => (
  <CanvasRenderer
    figure={{
      kind: "angle",
      size: opts.size,
      angle: {
        angleDeg,
        labels: {
          vertex: opts.labels?.vertex ?? "",
          left: opts.labels?.left ?? "",
          right: opts.labels?.right ?? "",
          angle: `${angleDeg}°`,
        },
        display: {
          showLabels: !!opts.labels,
          showMeasure: opts.showMeasure ?? true,
          showArc: true,
          showRightAngle: angleDeg === 90,
          placeholder: opts.placeholder,
          showProtractor: !!opts.rapporteur,
          protractorStep: opts.rapporteur === "pose" ? undefined : opts.rapporteur,
        },
      },
    }}
  />
);

// Deux angles sous leur nom : « plus petit qu'un angle droit » n'a de sens que
// CONTRE quelque chose. Un 130° tout seul ne montre rien.
//
// ⛔ EMPILÉS, JAMAIS CÔTE À CÔTE (§ 2 ter, et c'est MESURÉ ici, pas repris) :
// une carte de propriété fait 225 px de large sur un écran de 1280 comme sur un
// téléphone de 375 — donc 97 px par cellule en deux colonnes. Le cadre se serre
// sur le dessin, et un OBTUS est large : son « 130° » tombait à 9,1 px sur
// ordinateur et 9,0 px sur téléphone. Empilé, chaque angle reprend les 225 px
// et son étiquette remonte à 21 px.
const pile = (items: { deg: number; nom: string }[]) => (
  <div className="grid grid-cols-1 gap-2">
    {items.map((it) => (
      <div key={it.nom}>
        <CanvasRenderer
          figure={{
            kind: "angle",
            size: { width: 150, height: 120 },
            angle: {
              angleDeg: it.deg,
              labels: { vertex: "", left: "", right: "", angle: `${it.deg}°` },
              display: { showLabels: false, showMeasure: true, showArc: true },
            },
          }}
        />
        <p className="mt-1 text-center text-xs font-black text-slate-700">{it.nom}</p>
      </div>
    ))}
  </div>
);

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// L'ANGLE DROIT EST UN COIN. Le petit carré tout seul, l'élève le prend pour une
// décoration ; sur les quatre coins d'un carré, il devient ce qu'il est — la
// forme qu'on vérifie à l'équerre. Le 90° dessiné nu reste sur la formule.
const carreCoins = legende(
  <CanvasRenderer
    figure={{
      kind: "quadrilatere",
      size: { width: 200, height: 180 },
      points: {
        A: { x: 45, y: 35 },
        B: { x: 155, y: 35 },
        C: { x: 155, y: 145 },
        D: { x: 45, y: 145 },
      },
      display: { showPoints: false, showLabels: false, showSides: false, showAngles: false },
      marks: { rightAnglesAt: ["A", "B", "C", "D"] },
    }}
  />,
  "les 4 coins d'un carré : 90° chacun"
);

// CE QU'ON REPÈRE AVANT DE VOIR UN ANGLE : deux demi-droites et leur point
// commun. Pas d'arc, pas de mesure — l'angle n'est pas encore nommé, c'est tout
// l'objet de la méthode « Reconnaître ». Aucun canvas `angle` ne sait montrer ça,
// puisqu'il dessine toujours l'angle déjà formé.
const deuxDemiDroites = (
  <CanvasRenderer
    figure={{
      kind: "droites",
      size: { width: 260, height: 170 },
      lines: [
        {
          id: "d1",
          type: "demi_droite",
          from: { x: 45, y: 130 },
          to: { x: 235, y: 130 },
          color: BLEU,
          display: { showArrows: true, showLabel: false },
        },
        {
          id: "d2",
          type: "demi_droite",
          from: { x: 45, y: 130 },
          to: { x: 190, y: 30 },
          color: BLEU,
          display: { showArrows: true, showLabel: false },
        },
      ],
      points: [{ x: 45, y: 130, label: "le sommet", color: ROUGE, highlight: true }],
    }}
  />
);

// COMPARER DEUX ANGLES, C'EST COMPARER DEUX NOMBRES. Le degré est une unité :
// posé sur une droite graduée de 0 à 180 — le tour du rapporteur mis à plat —
// 80° est à droite de 30°, comme n'importe quel nombre plus grand.
const echelleDesDegres = (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 180,
      step: 30,
      points: [
        { value: 30, label: "30°", color: BLEU },
        { value: 80, label: "80°", color: ROUGE },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
      // ⚠️ MESURÉ, pas estimé (§ 2 quater) : à 360 de viewBox, la droite tombe à
      // 8,8 px de texte dans une carte de propriété de 250 px — refusée par
      // `apercu-canvas.mjs`. Le cadre serré à 280 la remonte à 11,3 px.
      size: { width: 280, height: 90 },
    }}
  />
);

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
      micros: ["angle_droit"],
      texte:
        "Un angle droit mesure exactement 90°. C'est l'angle des coins d'un carré ou d'un rectangle. On le vérifie avec une équerre.",
      schema: carreCoins,
    },
    {
      titre: "Aigu ou obtus",
      micros: ["angle_comparer"],
      texte:
        "Un angle aigu mesure moins de 90° : il est plus petit qu'un angle droit. Un angle obtus mesure entre 90° et 180° : il est plus grand qu'un angle droit.",
      // ⚠️ Le canvas `angle` ne montre QU'UN angle (CATALOGUE.md) : deux ouvertures
      // à comparer, ce sont deux dessins posés l'un à côté de l'autre.
      schema: pile([
        { deg: 50, nom: "aigu : < 90°" },
        { deg: 130, nom: "obtus : > 90°" },
      ]),
    },
    {
      titre: "L'angle plat",
      micros: ["angle_reconnaitre"],
      texte:
        "Un angle plat mesure 180°. Ses deux côtés sont alignés : ils forment une ligne droite qui passe par le sommet.",
      // Le seul angle de la fiche dont le dessin est une LIGNE DROITE : c'est
      // exactement ce qui étonne, et c'est ce qu'il faut voir.
      schema: angle(180, { labels: { vertex: "sommet", left: "côté", right: "côté" } }),
    },
    {
      titre: "Le degré",
      micros: ["angle_mesurer"],
      texte:
        "On mesure les angles en degrés, notés °. Comparer deux angles donnés en degrés, c'est comparer leurs mesures : 80° est plus grand que 30°.",
      schema: echelleDesDegres,
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
      micros: ["angle_reconnaitre"],
      texte:
        "On repère les deux demi-droites et leur point commun : le sommet. Puis on classe l'angle en le comparant à l'angle droit : aigu, droit, obtus ou plat.",
      schema: legende(deuxDemiDroites, "deux demi-droites, un point commun"),
    },
    {
      titre: "Mesurer",
      micros: ["angle_mesurer"],
      texte:
        "On place le centre du rapporteur sur le sommet, le zéro sur un côté, puis on lit la graduation traversée par l'autre côté.",
      // Le geste « reading » : le rapporteur en place, la graduation atteinte
      // mise en avant. La mesure reste un « ? » — c'est ce qu'on cherche.
      schema: angle(55, { showMeasure: false, placeholder: "?", rapporteur: "reading" }),
    },
    {
      titre: "Tracer",
      micros: ["angle_tracer"],
      texte:
        "On commence par placer le sommet et un premier côté. Ensuite, avec le rapporteur, on marque la mesure voulue et on trace le deuxième côté.",
      // Le geste « zero » : le premier côté est déjà là, le 0 vient se poser
      // dessus. C'est le départ du tracé, pas la lecture.
      schema: angle(40, { showMeasure: false, placeholder: "40°", rapporteur: "zero" }),
    },
  ],
  usages: [
    {
      titre: "Reconnaître et comparer",
      micros: ["angle_reconnaitre", "angle_comparer"],
      detail:
        "On identifie le sommet et les côtés, puis on compare les angles : celui qui a la plus grande mesure en degrés est le plus grand.",
    },
    {
      titre: "Mesurer un angle",
      micros: ["angle_mesurer"],
      detail:
        "On utilise le rapporteur : centre sur le sommet, zéro sur un côté, lecture sur l'autre côté. Le résultat est en degrés.",
    },
    {
      titre: "Tracer un angle",
      micros: ["angle_tracer"],
      detail:
        "On place d'abord le sommet, on trace un premier côté, puis on utilise le rapporteur pour placer le deuxième côté à la bonne mesure.",
    },
  ],
  exemples: [
    {
      titre: "Reconnaître un angle",
      micros: ["angle_reconnaitre"],
      donnees: "Sur une figure, deux demi-droites partent du même point O.",
      question: "Que forment-elles, et comment s'appelle le point O ?",
      // L'énoncé dessiné : l'angle AOB, ses trois lettres, sans mesure — la
      // question porte sur les mots, pas sur un nombre.
      schema: angle(65, {
        showMeasure: false,
        labels: { vertex: "O", left: "A", right: "B" },
      }),
      solution:
        "Deux demi-droites de même origine forment un angle. Le point O, commun aux deux côtés, s'appelle le sommet de l'angle.",
    },
    {
      titre: "Comparer à l'angle droit",
      micros: ["angle_droit", "angle_comparer"],
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
      micros: ["angle_reconnaitre"],
    },
    {
      question: "Quel angle est le plus grand : 35° ou 80° ?",
      correction:
        "On compare les mesures : 80 est plus grand que 35. Donc l'angle de 80° est le plus grand. La longueur des côtés dessinés ne compte pas, seule la mesure en degrés compte.",
      micros: ["angle_comparer"],
    },
    {
      question:
        "Pour tracer un angle de 40°, quel instrument utilises-tu et par quoi commences-tu ?",
      correction:
        "On utilise un rapporteur, car il est gradué en degrés. On commence par placer le sommet et tracer un premier côté. Puis on met le centre du rapporteur sur le sommet, le zéro sur ce côté, on marque 40° et on trace le deuxième côté.",
      micros: ["angle_tracer"],
    },
    {
      question:
        "Un angle de 120° est-il plus petit, égal ou plus grand qu'un angle droit ?",
      correction:
        "Un angle droit mesure 90°. On compare : 120 est plus grand que 90, et plus petit que 180. Donc un angle de 120° est plus grand qu'un angle droit : c'est un angle obtus.",
      micros: ["angle_droit", "angle_defi"],
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
