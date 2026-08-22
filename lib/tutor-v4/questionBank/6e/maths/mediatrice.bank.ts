// ─── La médiatrice d'un segment (6e) ───────────────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (22/08/2026). La médiatrice est un chapitre
// entier du programme de 6e — trois objectifs d'apprentissage — et le coach
// n'en avait AUCUNE micro. C'est pourtant la notion qui tient toute la
// géométrie de l'année : la symétrie axiale se DÉFINIT par elle (« (d) est la
// médiatrice de [MM'] »), le cercle circonscrit en découle, et la construction
// du milieu au compas n'est rien d'autre qu'elle.
//
// Les objectifs, mot pour mot (Exemples pour la mise en œuvre des programmes,
// 6e, 2025, p. 12-13) :
//   · « Connaître la définition de la médiatrice d'un segment » ;
//   · « Comprendre et utiliser la propriété caractéristique de la médiatrice
//     d'un segment » ;
//   · « Résoudre des problèmes en s'appuyant sur la propriété caractéristique
//     de la médiatrice ».
//
// ⭐ « PROPRIÉTÉ CARACTÉRISTIQUE » VEUT DIRE DEUX SENS, ET C'EST TOUT L'ENJEU.
// Le BO les énonce séparément, et l'élève n'en retient qu'un :
//   · si un point est SUR la médiatrice, alors il est équidistant de A et B ;
//   · si un point est équidistant de A et B, alors il est SUR la médiatrice.
// C'est le second qui sert à DÉMONTRER — retrouver le centre d'un cercle,
// prouver qu'un point est sur la médiatrice — et c'est celui qu'on oublie.
// `mediatrice_propriete` porte les deux, dans les deux ordres.
//
// Les deux problèmes que le BO cite sont ici : « l'élève place le milieu d'une
// corde d'un cercle de centre connu en utilisant une équerre » et « l'élève
// détermine le centre inconnu d'un cercle et justifie sa construction ».

import type { TutorBankItemV4, DroitesCanvasData, CercleCanvasData } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : la médiatrice d'un segment est la droite perpendiculaire à ce segment passant par son milieu.\n\n" +
    "Méthode : on retient la propriété caractéristique dans les DEUX sens — être sur la médiatrice, c'est être à égale distance des deux extrémités, et réciproquement.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

const A = { x: 55, y: 175 };
const B = { x: 285, y: 175 };
const M = { x: (A.x + B.x) / 2, y: A.y };

/**
 * [AB] et une droite qui le coupe. `perpendiculaire` et `parMilieu` se règlent
 * séparément — c'est ainsi qu'on montre qu'il FAUT les deux : une droite qui
 * ne remplit qu'une des deux conditions n'est pas la médiatrice.
 */
function segmentEtDroite(opts: {
  perpendiculaire: boolean;
  parMilieu: boolean;
  labelDroite?: string;
  pointSurDroite?: { label: string; hauteur: number };
  marquerMilieu?: boolean;
}): DroitesCanvasData {
  const xCoupe = opts.parMilieu ? M.x : M.x + 55;
  const haut = opts.perpendiculaire
    ? { x: xCoupe, y: 45 }
    : { x: xCoupe - 55, y: 45 };
  const bas = opts.perpendiculaire
    ? { x: xCoupe, y: 285 }
    : { x: xCoupe + 55, y: 285 };

  const points: DroitesCanvasData["points"] = [
    { x: A.x, y: A.y, label: "A" },
    { x: B.x, y: B.y, label: "B" },
  ];
  if (opts.marquerMilieu) {
    points.push({ x: M.x, y: M.y, label: "M", color: "#ef4444", highlight: true });
  }
  if (opts.pointSurDroite) {
    points.push({
      x: xCoupe,
      y: opts.pointSurDroite.hauteur,
      label: opts.pointSurDroite.label,
      color: "#7c3aed",
      highlight: true,
    });
  }

  const lines: DroitesCanvasData["lines"] = [
    { id: "AB", type: "segment", from: A, to: B },
    {
      id: "d",
      type: "droite",
      from: haut,
      to: bas,
      color: "#2563eb",
      label: opts.labelDroite,
      display: { showLabel: Boolean(opts.labelDroite), extend: true },
    },
  ];

  if (opts.pointSurDroite) {
    lines.push(
      {
        id: "PA",
        type: "segment",
        from: { x: xCoupe, y: opts.pointSurDroite.hauteur },
        to: A,
        dashed: true,
        color: "#7c3aed",
      },
      {
        id: "PB",
        type: "segment",
        from: { x: xCoupe, y: opts.pointSurDroite.hauteur },
        to: B,
        dashed: true,
        color: "#7c3aed",
      }
    );
  }

  return {
    kind: "droites",
    size: { width: 340, height: 320 },
    lines,
    points,
    markers: opts.perpendiculaire
      ? { rightAngles: [{ x: xCoupe, y: A.y, lineA: "AB", lineB: "d" }] }
      : undefined,
    display: {
      showLabels: true,
      showPoints: true,
      showRightAngleMarkers: opts.perpendiculaire,
    },
  };
}

/** Un cercle et une corde : le support des deux problèmes du BO. */
function cercleAvecCorde(opts: { centreVisible: boolean }): CercleCanvasData {
  const cx = 170;
  const cy = 140;
  const r = 90;
  const points: CercleCanvasData["points"] = [
    { id: "P", x: cx - 64, y: cy - 63, label: "P" },
    { id: "Q", x: cx + 80, y: cy + 41, label: "Q" },
  ];
  if (opts.centreVisible) {
    points.unshift({ id: "O", x: cx, y: cy, label: "O", color: "#ef4444", highlight: true });
  }
  return {
    kind: "cercle",
    size: { width: 340, height: 290 },
    circle: { cx, cy, r, showCircle: true },
    points,
    segments: [{ id: "corde", kind: "corde", from: "P", to: "Q", label: "corde", highlight: true }],
    display: { showLabels: true, showPoints: true, showCenter: opts.centreVisible },
  };
}

export const mediatriceBank: TutorBankItemV4[] = [
  // =========================
  // MEDIATRICE_DEFINITION — les DEUX conditions
  // =========================
  {
    kind: "fixed",
    id: "mediatrice_definition_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_definition",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'est-ce que la médiatrice d'un segment [AB] ?",
    format: "qcm",
    choices: [
      "la droite perpendiculaire à [AB] qui passe par son milieu",
      "la droite qui passe par le milieu de [AB]",
      "la droite perpendiculaire à [AB]",
      "le segment qui joint le milieu de [AB] à un autre point",
    ],
    expected: ["la droite perpendiculaire à [AB] qui passe par son milieu"],
    comparator: "mcq_exact",
    hint: "Il faut DEUX conditions, pas une.",
    explanation: expl(
      "La médiatrice de [AB] est la droite qui remplit deux conditions à la fois : elle est perpendiculaire à [AB], ET elle passe par son milieu. Une seule des deux ne suffit pas."
    ),
    tags: ["mediatrice_segment", "definition", "canvas", "qcm"],
    canvas: segmentEtDroite({ perpendiculaire: true, parMilieu: true, labelDroite: "(d)", marquerMilieu: true }),
  },
  {
    kind: "fixed",
    id: "mediatrice_definition_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. La droite (d) est-elle la médiatrice de [AB] ?",
    format: "qcm",
    choices: [
      "non : elle est bien perpendiculaire à [AB], mais elle ne passe pas par son milieu",
      "oui : elle est perpendiculaire à [AB]",
      "non : elle passe par le milieu, mais elle n'est pas perpendiculaire",
      "oui : elle coupe le segment [AB]",
    ],
    expected: [
      "non : elle est bien perpendiculaire à [AB], mais elle ne passe pas par son milieu",
    ],
    comparator: "mcq_exact",
    hint: "Le petit carré rouge dit qu'elle est perpendiculaire. Et le milieu ?",
    explanation: expl(
      "La marque d'angle droit montre que (d) est perpendiculaire à [AB]. Mais elle coupe le segment à côté du milieu : la seconde condition n'est pas remplie, ce n'est donc pas la médiatrice."
    ),
    tags: ["mediatrice_segment", "definition", "canvas", "piege", "qcm"],
    canvas: segmentEtDroite({ perpendiculaire: true, parMilieu: false, labelDroite: "(d)", marquerMilieu: true }),
  },
  {
    kind: "fixed",
    id: "mediatrice_definition_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. La droite (d) est-elle la médiatrice de [AB] ?",
    format: "qcm",
    choices: [
      "non : elle passe bien par le milieu, mais elle n'est pas perpendiculaire",
      "oui : elle passe par le milieu de [AB]",
      "non : elle ne coupe pas le segment",
      "oui : elle est perpendiculaire à [AB]",
    ],
    expected: ["non : elle passe bien par le milieu, mais elle n'est pas perpendiculaire"],
    comparator: "mcq_exact",
    hint: "Aucune marque d'angle droit sur la figure.",
    explanation: expl(
      "La droite coupe [AB] en son milieu, mais elle est penchée : il n'y a pas d'angle droit. La première condition manque, ce n'est donc pas la médiatrice."
    ),
    tags: ["mediatrice_segment", "definition", "canvas", "piege", "qcm"],
    canvas: segmentEtDroite({ perpendiculaire: false, parMilieu: true, labelDroite: "(d)", marquerMilieu: true }),
  },
  {
    kind: "fixed",
    id: "mediatrice_definition_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Combien un segment a-t-il de médiatrices ?",
    format: "qcm",
    choices: ["une seule", "deux", "une infinité", "aucune, sauf s'il est horizontal"],
    expected: ["une seule"],
    comparator: "mcq_exact",
    hint: "Le milieu est unique, et la perpendiculaire en ce point aussi.",
    explanation: expl(
      "Un segment n'a qu'un seul milieu, et par un point donné il ne passe qu'une seule perpendiculaire à une droite donnée. La médiatrice est donc unique."
    ),
    tags: ["mediatrice_segment", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "mediatrice_definition_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_definition",
    difficulty: 3,
    theme: "neutral",
    text: "La médiatrice d'un segment est-elle un segment, une demi-droite ou une droite ?",
    format: "qcm",
    choices: [
      "une droite : elle se prolonge des deux côtés, sans fin",
      "un segment, de même longueur que [AB]",
      "une demi-droite, d'origine le milieu de [AB]",
      "cela dépend de la longueur de [AB]",
    ],
    expected: ["une droite : elle se prolonge des deux côtés, sans fin"],
    comparator: "mcq_exact",
    hint: "Les points à égale distance de A et de B ne s'arrêtent nulle part.",
    explanation: expl(
      "C'est une DROITE. On la dessine souvent en trait court, faute de place, mais elle se prolonge indéfiniment des deux côtés : tous ses points, même très éloignés, restent à égale distance de A et de B."
    ),
    tags: ["mediatrice_segment", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "mediatrice_definition_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie les DEUX conditions, une par une.",
    tags: ["mediatrice_segment", "definition", "template"],
    generate: () => {
      const cas = [
        {
          desc: "perpendiculaire à [AB] et passant par son milieu",
          rep: "oui",
          why: "Les deux conditions sont remplies : c'est bien la médiatrice.",
        },
        {
          desc: "perpendiculaire à [AB], mais passant à 1 cm du milieu",
          rep: "non",
          why: "Elle est perpendiculaire, mais elle ne passe pas par le milieu : il manque la seconde condition.",
        },
        {
          desc: "passant par le milieu de [AB], mais faisant un angle de 70° avec lui",
          rep: "non",
          why: "Elle passe par le milieu, mais l'angle n'est pas droit : il manque la première condition.",
        },
        {
          desc: "parallèle à [AB] et passant à égale distance de A et de B",
          rep: "non",
          why: "Une droite parallèle à [AB] ne le coupe jamais : elle ne peut ni passer par son milieu, ni lui être perpendiculaire.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: `Une droite est ${c.desc}. Est-ce la médiatrice de [AB] ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [c.rep],
        comparator: "mcq_exact",
        explanation: expl(c.why),
      };
    },
  },
  {
    kind: "template",
    id: "mediatrice_definition_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_definition",
    difficulty: 4,
    theme: "neutral",
    hint: "Nomme les deux conditions, et dis ce qui se passe si l'une manque.",
    tags: ["mediatrice_segment", "definition", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi il ne suffit pas qu'une droite coupe [AB] en son milieu pour être sa médiatrice.",
          mots: ["perpendiculaire", "angle droit", "droit", "deux"],
          r: "Une infinité de droites passent par le milieu de [AB] : elles font toutes les inclinaisons possibles. Une seule est perpendiculaire au segment, et c'est elle la médiatrice. La condition d'angle droit est donc indispensable.",
        },
        {
          q: "Explique pourquoi il ne suffit pas qu'une droite soit perpendiculaire à [AB] pour être sa médiatrice.",
          mots: ["milieu", "deux", "passe"],
          r: "Une infinité de droites sont perpendiculaires à [AB] : une par point du segment, et même au-delà. Une seule passe par le milieu, et c'est elle la médiatrice. La condition du milieu est donc indispensable.",
        },
        {
          q: "Explique pourquoi la médiatrice d'un segment est une droite et non un segment.",
          mots: ["prolonge", "infini", "tous les points", "égale distance", "egale distance"],
          r: "Les points à égale distance de A et de B ne s'arrêtent nulle part : aussi loin qu'on s'éloigne du segment, il en existe encore. L'ensemble de ces points est donc une droite entière, qu'on prolonge des deux côtés — même si, sur une feuille, on n'en dessine qu'un morceau.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // =========================
  // MEDIATRICE_PROPRIETE — la propriété caractéristique, DANS LES DEUX SENS
  // =========================
  {
    kind: "fixed",
    id: "mediatrice_propriete_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Le point P est sur la médiatrice de [AB]. Que peut-on en déduire ?",
    format: "qcm",
    choices: [
      "PA = PB",
      "P est le milieu de [AB]",
      "PA + PB = AB",
      "P est à égale distance de A, de B et du milieu",
    ],
    expected: ["PA = PB"],
    comparator: "mcq_exact",
    hint: "La médiatrice est l'ensemble des points équidistants des extrémités.",
    explanation: expl(
      "La médiatrice de [AB] est l'ensemble des points situés à égale distance de A et de B. Si P y est, alors PA = PB — quelle que soit sa position sur la droite."
    ),
    tags: ["mediatrice_segment", "propriete", "canvas", "qcm"],
    canvas: segmentEtDroite({
      perpendiculaire: true,
      parMilieu: true,
      labelDroite: "(d)",
      pointSurDroite: { label: "P", hauteur: 70 },
    }),
  },
  {
    kind: "fixed",
    id: "mediatrice_propriete_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "On sait que MA = MB. Que peut-on en déduire sur le point M ?",
    format: "qcm",
    choices: [
      "M est sur la médiatrice de [AB]",
      "M est le milieu de [AB]",
      "M est sur le segment [AB]",
      "on ne peut rien en déduire",
    ],
    expected: ["M est sur la médiatrice de [AB]"],
    comparator: "mcq_exact",
    hint: "C'est le sens de la propriété qui sert à démontrer.",
    explanation: expl(
      "Tout point à égale distance de A et de B appartient à la médiatrice de [AB]. C'est ce sens-là de la propriété qui permet de DÉMONTRER qu'un point est sur la médiatrice — et c'est celui qu'on oublie. Attention : M n'est pas forcément le milieu, il ne l'est que s'il est aussi sur le segment."
    ),
    tags: ["mediatrice_segment", "propriete", "qcm"],
  },
  {
    kind: "fixed",
    id: "mediatrice_propriete_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Le point P est sur la médiatrice de [AB] et PA = 7 cm. Combien mesure PB ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Équidistant veut dire : les deux distances sont égales.",
    explanation: expl("P est sur la médiatrice, donc PA = PB. Comme PA = 7 cm, PB = 7 cm."),
    tags: ["mediatrice_segment", "propriete", "short"],
  },
  {
    kind: "fixed",
    id: "mediatrice_propriete_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Un point N n'est PAS sur la médiatrice de [AB]. Que peut-on dire de NA et NB ?",
    format: "qcm",
    choices: [
      "elles sont différentes : N est plus proche de l'une des deux extrémités",
      "elles sont égales quand même",
      "NA + NB = AB",
      "on ne peut rien dire",
    ],
    expected: ["elles sont différentes : N est plus proche de l'une des deux extrémités"],
    comparator: "mcq_exact",
    hint: "La médiatrice contient TOUS les points équidistants, et eux seuls.",
    explanation: expl(
      "La médiatrice contient exactement les points à égale distance de A et de B. Un point qui n'y est pas ne peut donc pas être équidistant : il est forcément plus proche de A, ou plus proche de B."
    ),
    tags: ["mediatrice_segment", "propriete", "qcm"],
  },
  {
    kind: "template",
    id: "mediatrice_propriete_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "Sur la médiatrice, les deux distances sont égales.",
    tags: ["mediatrice_segment", "propriete", "template"],
    generate: () => {
      const d = randomInt(3, 14);
      const noms: [string, string][] = [
        ["P", "[AB]"],
        ["K", "[EF]"],
        ["S", "[MN]"],
        ["T", "[RU]"],
      ];
      const [p, seg] = noms[randomInt(0, noms.length - 1)];
      const a = seg[1];
      const b = seg[2];
      return {
        text: `Le point ${p} est sur la médiatrice de ${seg} et ${p}${a} = ${d} cm. Combien mesure ${p}${b} ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation: expl(
          `${p} est sur la médiatrice de ${seg}, donc ${p}${a} = ${p}${b}. Comme ${p}${a} = ${d} cm, on a ${p}${b} = ${d} cm.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "mediatrice_propriete_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_propriete",
    difficulty: 4,
    theme: "neutral",
    hint: "Dans quel sens lit-on la propriété : pour déduire, ou pour démontrer ?",
    tags: ["mediatrice_segment", "propriete", "template"],
    generate: () => {
      const d1 = randomInt(4, 12);
      const cas = [
        {
          text: `On sait que le point K vérifie KA = KB = ${d1} cm. K appartient-il à la médiatrice de [AB] ?`,
          rep: "oui",
          why: `KA = KB, donc K est à égale distance de A et de B : il appartient à la médiatrice de [AB]. C'est le sens de la propriété qui sert à démontrer.`,
        },
        {
          text: `On sait que le point K vérifie KA = ${d1} cm et KB = ${d1 + randomInt(1, 5)} cm. K appartient-il à la médiatrice de [AB] ?`,
          rep: "non",
          why: `Les deux distances sont différentes : K n'est pas équidistant de A et de B, il n'appartient donc pas à la médiatrice.`,
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.text,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [c.rep],
        comparator: "mcq_exact",
        explanation: expl(c.why),
      };
    },
  },
  {
    kind: "template",
    id: "mediatrice_propriete_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_propriete",
    difficulty: 5,
    theme: "neutral",
    hint: "Une propriété caractéristique se lit dans les deux sens : dis lesquels.",
    tags: ["mediatrice_segment", "propriete", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Énonce la propriété caractéristique de la médiatrice d'un segment, dans les deux sens.",
          mots: ["égale distance", "egale distance", "équidistant", "equidistant", "réciproque", "reciproque", "appartient"],
          r: "Premier sens : si un point est sur la médiatrice de [AB], alors il est à égale distance de A et de B. Second sens : si un point est à égale distance de A et de B, alors il est sur la médiatrice de [AB]. On dit que la médiatrice est l'ENSEMBLE des points équidistants des extrémités.",
        },
        {
          q: "Explique lequel des deux sens de la propriété sert à DÉMONTRER qu'un point est sur la médiatrice.",
          mots: ["égale distance", "egale distance", "équidistant", "equidistant", "distances", "mesure"],
          r: "C'est le sens « si les deux distances sont égales, alors le point est sur la médiatrice ». On part de ce qu'on connaît — deux longueurs égales — pour conclure sur la position du point. L'autre sens sert au contraire à déduire des longueurs quand on sait déjà où est le point.",
        },
        {
          q: "Un élève dit : « MA = MB, donc M est le milieu de [AB] ». Explique son erreur.",
          mots: ["médiatrice", "mediatrice", "segment", "sur", "aussi"],
          r: "De MA = MB, on déduit seulement que M est sur la MÉDIATRICE de [AB] — une droite entière. Pour être le milieu, il faudrait en plus que M soit sur le segment [AB]. Le sommet d'un triangle isocèle est un contre-exemple : il vérifie MA = MB sans être le milieu.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // =========================
  // MEDIATRICE_CONSTRUIRE
  // =========================
  {
    kind: "fixed",
    id: "mediatrice_construire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Comment construire la médiatrice de [AB] avec un compas et une règle non graduée ?",
    format: "qcm",
    choices: [
      "on trace deux arcs de même écartement depuis A puis depuis B, et on joint les deux points d'intersection",
      "on mesure [AB], on marque le milieu, puis on trace au jugé",
      "on trace le cercle de centre A passant par B",
      "on trace deux arcs d'écartements différents depuis A et depuis B",
    ],
    expected: [
      "on trace deux arcs de même écartement depuis A puis depuis B, et on joint les deux points d'intersection",
    ],
    comparator: "mcq_exact",
    hint: "Les points obtenus sont à égale distance de A et de B — par construction.",
    explanation: expl(
      "Avec le MÊME écartement, les arcs tracés depuis A et depuis B se coupent en deux points situés à égale distance de A et de B. D'après la propriété caractéristique, ces deux points sont sur la médiatrice : la droite qui les joint EST la médiatrice."
    ),
    tags: ["mediatrice_segment", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "mediatrice_construire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi faut-il garder le MÊME écartement de compas depuis A et depuis B ?",
    format: "qcm",
    choices: [
      "pour que les points obtenus soient à égale distance de A et de B",
      "pour que le dessin soit plus joli",
      "pour que les arcs se coupent, quel que soit l'écartement",
      "pour que la droite obtenue soit horizontale",
    ],
    expected: ["pour que les points obtenus soient à égale distance de A et de B"],
    comparator: "mcq_exact",
    hint: "L'écartement du compas EST une distance.",
    explanation: expl(
      "Un point du premier arc est à une distance de A égale à l'écartement ; un point du second est à cette même distance de B. Aux intersections, les deux distances sont donc égales : ces points sont équidistants de A et de B, donc sur la médiatrice. Avec deux écartements différents, ce raisonnement tombe."
    ),
    tags: ["mediatrice_segment", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "mediatrice_construire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_construire",
    difficulty: 2,
    theme: "neutral",
    text: "On plie une feuille de façon à amener le point A exactement sur le point B. Que représente le pli obtenu ?",
    format: "qcm",
    choices: [
      "la médiatrice de [AB]",
      "le segment [AB]",
      "la perpendiculaire à [AB] passant par A",
      "une droite parallèle à [AB]",
    ],
    expected: ["la médiatrice de [AB]"],
    comparator: "mcq_exact",
    hint: "Le pli est l'axe de symétrie qui échange A et B.",
    explanation: expl(
      "Le pli qui amène A sur B est l'axe de symétrie du segment : chacun de ses points est à égale distance de A et de B. C'est donc la médiatrice de [AB] — et c'est aussi pour cela que la symétrie axiale se définira, plus tard dans l'année, avec la médiatrice."
    ),
    tags: ["mediatrice_segment", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "mediatrice_construire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Avec une règle graduée et une équerre, comment tracer la médiatrice de [AB] ?",
    format: "qcm",
    choices: [
      "on mesure [AB], on marque le milieu, puis on trace la perpendiculaire en ce point avec l'équerre",
      "on trace la perpendiculaire à [AB] passant par A, puis on la décale",
      "on mesure [AB] et on trace une parallèle à mi-hauteur",
      "on place l'équerre au hasard : toute perpendiculaire convient",
    ],
    expected: [
      "on mesure [AB], on marque le milieu, puis on trace la perpendiculaire en ce point avec l'équerre",
    ],
    comparator: "mcq_exact",
    hint: "Les deux conditions se construisent l'une après l'autre.",
    explanation: expl(
      "On construit les deux conditions dans l'ordre : d'abord le milieu, à la règle graduée (AB ÷ 2) ; ensuite la perpendiculaire en ce point, à l'équerre. Les deux outils font chacun une moitié du travail."
    ),
    tags: ["mediatrice_segment", "construire", "qcm"],
  },
  {
    kind: "template",
    id: "mediatrice_construire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "Le milieu se calcule, la perpendiculaire se trace.",
    tags: ["mediatrice_segment", "construire", "template"],
    generate: () => {
      const demi = randomInt(2, 9);
      const ab = 2 * demi;
      return {
        text: `On veut tracer la médiatrice de [AB], avec AB = ${ab} cm, à la règle graduée et à l'équerre. À quelle distance de A faut-il placer le point où l'on posera l'équerre ?`,
        format: "short",
        expected: [String(demi)],
        comparator: "number_equal",
        explanation: expl(
          `L'équerre se pose au MILIEU de [AB], donc à ${ab} ÷ 2 = ${demi} cm de A. On y trace ensuite la perpendiculaire au segment.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "mediatrice_construire_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_construire",
    difficulty: 5,
    theme: "neutral",
    hint: "Justifie la construction par la propriété, pas par le dessin.",
    tags: ["mediatrice_segment", "construire", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi la construction au compas donne bien la médiatrice, et pas seulement une droite qui y ressemble.",
          mots: ["égale distance", "egale distance", "équidistant", "equidistant", "écartement", "ecartement", "propriété", "propriete"],
          r: "Chaque point d'intersection des arcs est à une distance de A égale à l'écartement, et à cette même distance de B. Ces deux points sont donc équidistants de A et de B : d'après la propriété caractéristique, ils appartiennent à la médiatrice. Comme deux points suffisent à définir une droite, la droite qui les joint EST la médiatrice. Ce n'est pas une ressemblance, c'est une preuve.",
        },
        {
          q: "Explique pourquoi il suffit de deux points pour tracer la médiatrice.",
          mots: ["deux points", "droite", "unique", "une seule"],
          r: "Par deux points distincts il ne passe qu'une seule droite. Si on sait que deux points appartiennent à la médiatrice, la droite qui les joint ne peut être qu'elle. C'est pourquoi la construction au compas s'arrête après deux intersections.",
        },
        {
          q: "Écris un programme de construction de la médiatrice de [AB] au compas, pour qu'un camarade puisse la refaire sans te voir.",
          mots: ["compas", "écartement", "ecartement", "arcs", "joindre", "règle", "regle"],
          r: "1. Ouvrir le compas d'un écartement plus grand que la moitié de AB. 2. Pointer en A et tracer un arc au-dessus et un arc au-dessous du segment. 3. Sans changer l'écartement, pointer en B et tracer deux arcs qui coupent les précédents. 4. Tracer à la règle la droite passant par les deux points d'intersection : c'est la médiatrice de [AB].",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // =========================
  // MEDIATRICE_PROBLEME — les deux problèmes du BO
  // =========================
  {
    kind: "fixed",
    id: "mediatrice_probleme_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un cercle de centre O est tracé, et [PQ] est une corde de ce cercle. Comment placer le milieu de [PQ] avec une équerre seulement ?",
    format: "qcm",
    choices: [
      "on trace la perpendiculaire à [PQ] passant par O : elle coupe la corde en son milieu",
      "on trace la perpendiculaire à [PQ] passant par P",
      "on joint O à P : le milieu est au croisement avec le cercle",
      "on ne peut pas le faire sans règle graduée",
    ],
    expected: [
      "on trace la perpendiculaire à [PQ] passant par O : elle coupe la corde en son milieu",
    ],
    comparator: "mcq_exact",
    hint: "O est à égale distance de P et de Q — ce sont deux rayons.",
    explanation: expl(
      "OP et OQ sont deux rayons du même cercle, donc OP = OQ : le centre O est à égale distance de P et de Q. D'après la propriété caractéristique, O appartient à la médiatrice de [PQ]. Cette médiatrice est perpendiculaire à [PQ] et passe par son milieu : la perpendiculaire à [PQ] menée depuis O coupe donc la corde exactement en son milieu."
    ),
    tags: ["mediatrice_segment", "probleme", "canvas", "qcm"],
    canvas: cercleAvecCorde({ centreVisible: true }),
  },
  {
    kind: "fixed",
    id: "mediatrice_probleme_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "On a tracé un cercle mais on a perdu son centre. Comment le retrouver ?",
    format: "qcm",
    choices: [
      "on trace deux cordes, puis leurs médiatrices : le centre est leur point d'intersection",
      "on trace une seule corde et on prend son milieu",
      "on plie la feuille en deux, une seule fois",
      "on mesure le diamètre au hasard et on divise par deux",
    ],
    expected: [
      "on trace deux cordes, puis leurs médiatrices : le centre est leur point d'intersection",
    ],
    comparator: "mcq_exact",
    hint: "Le centre est à égale distance de TOUS les points du cercle.",
    explanation: expl(
      "Le centre est à égale distance des deux extrémités de n'importe quelle corde (ce sont deux rayons) : il appartient donc à la médiatrice de chaque corde. Une médiatrice ne suffit pas — elle donne une droite entière de candidats. Avec DEUX cordes, on obtient deux médiatrices, et leur unique point d'intersection est le centre."
    ),
    tags: ["mediatrice_segment", "probleme", "canvas", "qcm"],
    canvas: cercleAvecCorde({ centreVisible: false }),
  },
  {
    kind: "fixed",
    id: "mediatrice_probleme_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Deux villages, Saint-Leu et L'Étang-Salé, veulent une antenne située exactement à la même distance de chacun. Où peut-on la placer ?",
    format: "qcm",
    choices: [
      "n'importe où sur la médiatrice du segment qui joint les deux villages",
      "exactement au milieu du segment qui joint les deux villages, et nulle part ailleurs",
      "sur la droite qui joint les deux villages",
      "il n'existe aucun emplacement possible",
    ],
    expected: ["n'importe où sur la médiatrice du segment qui joint les deux villages"],
    comparator: "mcq_exact",
    hint: "Combien de points sont à égale distance de deux points donnés ?",
    explanation: expl(
      "Les emplacements à égale distance des deux villages sont exactement les points de la médiatrice du segment qui les joint : il y en a une infinité. Le milieu en fait partie, mais ce n'est qu'un point parmi tous les autres — ce qui laisse le choix du terrain."
    ),
    tags: ["mediatrice_segment", "probleme", "974", "qcm"],
  },
  {
    kind: "template",
    id: "mediatrice_probleme_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux rayons d'un même cercle ont la même longueur.",
    tags: ["mediatrice_segment", "probleme", "template"],
    generate: () => {
      const r = randomInt(3, 9);
      return {
        text: `Un cercle de centre O a pour rayon ${r} cm, et [PQ] est une corde de ce cercle. Quelle est la distance de O au point P ?`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: expl(
          `P est un point du cercle, donc [OP] est un rayon : OP = ${r} cm. Il en va de même pour Q, et c'est cette égalité OP = OQ qui place O sur la médiatrice de la corde [PQ].`
        ),
        canvas: cercleAvecCorde({ centreVisible: true }),
      };
    },
  },
  {
    kind: "template",
    id: "mediatrice_probleme_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Justifie chaque étape par la propriété caractéristique.",
    tags: ["mediatrice_segment", "probleme", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique, en justifiant, pourquoi la perpendiculaire à une corde passant par le centre du cercle coupe cette corde en son milieu.",
          mots: ["rayon", "rayons", "égale distance", "egale distance", "médiatrice", "mediatrice"],
          r: "Soit [PQ] une corde du cercle de centre O. [OP] et [OQ] sont deux rayons, donc OP = OQ : O est à égale distance de P et de Q, donc O appartient à la médiatrice de [PQ]. Or cette médiatrice est perpendiculaire à [PQ] et passe par son milieu. La perpendiculaire à [PQ] menée depuis O est donc la médiatrice elle-même : elle coupe la corde en son milieu.",
        },
        {
          q: "Explique pourquoi une seule corde ne suffit pas à retrouver le centre d'un cercle, et pourquoi deux suffisent.",
          mots: ["droite", "infinité", "infinite", "deux", "intersection", "croisent"],
          r: "La médiatrice d'une corde contient le centre, mais elle contient aussi une infinité d'autres points : elle ne désigne donc pas le centre à elle seule. Avec une deuxième corde, on obtient une deuxième médiatrice, qui contient elle aussi le centre. Deux droites non parallèles se coupent en un seul point : c'est le centre.",
        },
        {
          q: "Une commune veut installer un point d'eau à égale distance de deux écoles. Explique comment le placer, et pourquoi il y a plusieurs solutions.",
          mots: ["médiatrice", "mediatrice", "infinité", "infinite", "plusieurs", "droite"],
          r: "On joint les deux écoles par un segment et on trace sa médiatrice : tous ses points sont à égale distance des deux écoles. Comme une droite contient une infinité de points, il y a une infinité d'emplacements possibles — ce qui permet de choisir selon le terrain, la route ou le budget.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // =========================
  // MEDIATRICE_DEFI
  // =========================
  {
    kind: "fixed",
    id: "mediatrice_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Le triangle ABC est isocèle en A. Que représente la droite qui passe par A et par le milieu de [BC] ?",
    format: "qcm",
    choices: [
      "la médiatrice de [BC]",
      "la médiatrice de [AB]",
      "une droite quelconque",
      "la parallèle à [BC] passant par A",
    ],
    expected: ["la médiatrice de [BC]"],
    comparator: "mcq_exact",
    hint: "Isocèle en A signifie AB = AC.",
    explanation: expl(
      "Le triangle est isocèle en A, donc AB = AC : le point A est à égale distance de B et de C, il appartient donc à la médiatrice de [BC]. Le milieu de [BC] y appartient aussi, par définition. La droite qui joint ces deux points est donc la médiatrice de [BC]."
    ),
    tags: ["mediatrice_segment", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "mediatrice_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Peut-on trouver un point à égale distance de A et de B qui soit AUSSI à égale distance de B et de C, si A, B et C ne sont pas alignés ?",
    format: "qcm",
    choices: [
      "oui : c'est le point où les médiatrices de [AB] et de [BC] se coupent",
      "non : c'est impossible",
      "oui, mais seulement si le triangle est équilatéral",
      "oui : c'est le milieu de [AC]",
    ],
    expected: ["oui : c'est le point où les médiatrices de [AB] et de [BC] se coupent"],
    comparator: "mcq_exact",
    hint: "Chaque condition décrit une médiatrice.",
    explanation: expl(
      "« À égale distance de A et de B » décrit la médiatrice de [AB] ; « à égale distance de B et de C » décrit celle de [BC]. Le point cherché est sur les deux à la fois, donc à leur intersection. Ce point sera aussi à égale distance de A et de C — c'est le centre du cercle circonscrit au triangle."
    ),
    tags: ["mediatrice_segment", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "mediatrice_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris ce que chaque égalité de longueurs t'apprend.",
    tags: ["mediatrice_segment", "defi", "template"],
    generate: () => {
      const d = randomInt(4, 11);
      const autre = d + randomInt(1, 4);
      const cas = [
        {
          text: `Un point S vérifie SA = SB = ${d} cm. La droite (SM), où M est le milieu de [AB], est-elle la médiatrice de [AB] ?`,
          rep: "oui",
          why: `SA = SB place S sur la médiatrice de [AB]. Le milieu M y est aussi. Deux points suffisent à définir une droite : (SM) est donc la médiatrice de [AB].`,
        },
        {
          text: `Un point S vérifie SA = ${d} cm et SB = ${autre} cm. Le point S appartient-il à la médiatrice de [AB] ?`,
          rep: "non",
          why: `SA et SB sont différentes (${d} cm et ${autre} cm) : S n'est pas équidistant de A et de B, il n'est donc pas sur la médiatrice — il est plus proche de A.`,
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.text,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [c.rep],
        comparator: "mcq_exact",
        explanation: expl(c.why),
      };
    },
  },
  {
    kind: "template",
    id: "mediatrice_defi_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Traduis chaque condition en « médiatrice de … ».",
    tags: ["mediatrice_segment", "defi", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi, dans un triangle isocèle en A, la médiatrice de la base passe forcément par le sommet A.",
          mots: ["AB = AC", "égale distance", "egale distance", "isocèle", "isocele", "équidistant", "equidistant"],
          r: "Isocèle en A veut dire AB = AC : le sommet A est à égale distance de B et de C. D'après la propriété caractéristique, A appartient donc à la médiatrice de [BC]. Ce n'est pas un hasard du dessin, c'est une conséquence de l'égalité des deux côtés.",
        },
        {
          q: "Trois maisons ne sont pas alignées. Explique comment placer un puits à égale distance des trois.",
          mots: ["médiatrices", "mediatrices", "deux", "intersection", "croisent"],
          r: "On trace la médiatrice du segment joignant les deux premières maisons, puis celle du segment joignant deux autres. Le premier ensemble donne les points à égale distance des maisons 1 et 2, le second ceux à égale distance des maisons 2 et 3. Leur point d'intersection est à égale distance des trois : c'est là qu'il faut creuser.",
        },
        {
          q: "Explique pourquoi la médiatrice est l'axe de symétrie du segment.",
          mots: ["pliage", "pli", "symétrie", "symetrie", "A sur B", "échange", "echange"],
          r: "Si on plie la feuille le long de la médiatrice, A vient exactement sur B : le pli échange les deux extrémités et laisse le segment sur lui-même. C'est la définition d'un axe de symétrie. C'est aussi la raison pour laquelle la symétrie axiale, plus tard dans l'année, se définit avec la médiatrice.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },
];
