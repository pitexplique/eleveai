// ─── Distances et milieu d'un segment (6e) ─────────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (22/08/2026). « Distances » ouvre le chapitre
// « Étude de configurations planes » du programme de 6e, avant les cercles,
// avant la médiatrice, avant les angles. C'est la première notion de géométrie
// de l'année — et le coach n'en avait AUCUNE micro.
//
// Les objectifs, mot pour mot (Exemples pour la mise en œuvre des programmes,
// 6e, 2025, p. 11) :
//   · « Connaître et utiliser la définition de la distance entre deux points » ;
//   · « Connaître et utiliser la définition du milieu d'un segment ».
//
// Et l'exemple de réussite qui porte tout le reste de l'année :
//   « L'élève admet que le plus court chemin pour aller de A à B est le segment
//   [AB]. Il en déduit que, pour tout point C, AC + CB ⩾ AB, l'égalité étant
//   réalisée pour tous les points appartenant au segment [AB], et uniquement
//   pour eux. »
//
// ⭐ CE QUI SE JOUE ICI ET NULLE PART AILLEURS : la différence entre (AB), [AB]
// et AB. Une droite, un segment, un NOMBRE. Un élève qui écrit « [AB] = 5 cm »
// confond un objet et sa mesure — et il l'écrira encore en 3e si personne ne le
// reprend en 6e.
//
// ⚠️ `distance_inegalite` et `triangle_possible_ou_non` se ressemblent : ce sont
// deux visages de la même inégalité. Ici on regarde TROIS POINTS et on demande
// s'ils sont alignés ; là on regarde TROIS LONGUEURS et on demande si un
// triangle se construit. Le BO les range dans deux chapitres différents, et
// l'élève ne les rencontre pas au même moment de l'année.

import type { TutorBankItemV4, DroitesCanvasData } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : la distance entre deux points A et B est la longueur du segment [AB], notée AB.\n\n" +
    "Méthode : on distingue l'objet (le segment [AB], la droite (AB)) de sa mesure (le nombre AB).\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

/** Un segment [AB] avec, si on veut, un point posé dessus ou à côté. */
function segment(
  labelA: string,
  labelB: string,
  opts: {
    etiquette?: string;
    milieu?: { label: string; sur: boolean };
    horsSegment?: { label: string; x: number; y: number };
  } = {}
): DroitesCanvasData {
  const A = { x: 45, y: 150 };
  const B = { x: 295, y: 150 };
  const points: DroitesCanvasData["points"] = [
    { x: A.x, y: A.y, label: labelA },
    { x: B.x, y: B.y, label: labelB },
  ];
  const lines: DroitesCanvasData["lines"] = [
    {
      id: "AB",
      type: "segment",
      from: A,
      to: B,
      label: opts.etiquette,
      display: { showLabel: Boolean(opts.etiquette) },
    },
  ];
  if (opts.milieu) {
    points.push({
      x: (A.x + B.x) / 2,
      y: A.y,
      label: opts.milieu.label,
      color: "#ef4444",
      highlight: true,
    });
  }
  if (opts.horsSegment) {
    points.push({
      x: opts.horsSegment.x,
      y: opts.horsSegment.y,
      label: opts.horsSegment.label,
      color: "#ef4444",
      highlight: true,
    });
    lines.push(
      {
        id: "AC",
        type: "segment",
        from: A,
        to: { x: opts.horsSegment.x, y: opts.horsSegment.y },
        dashed: true,
        color: "#ef4444",
      },
      {
        id: "CB",
        type: "segment",
        from: { x: opts.horsSegment.x, y: opts.horsSegment.y },
        to: B,
        dashed: true,
        color: "#ef4444",
      }
    );
  }
  return {
    kind: "droites",
    size: { width: 340, height: 220 },
    lines,
    points,
    display: { showLabels: true, showPoints: true },
  };
}

export const distancesBank: TutorBankItemV4[] = [
  // =========================
  // DISTANCE_DEFINITION — l'objet et sa mesure
  // =========================
  {
    kind: "fixed",
    id: "distance_definition_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_definition",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'appelle-t-on la distance entre deux points A et B ?",
    format: "qcm",
    choices: [
      "la longueur du segment [AB]",
      "la droite qui passe par A et par B",
      "le segment [AB] lui-même",
      "le nombre de points situés entre A et B",
    ],
    expected: ["la longueur du segment [AB]"],
    comparator: "mcq_exact",
    hint: "Une distance est un nombre, pas un dessin.",
    explanation: expl(
      "La distance entre A et B est la LONGUEUR du segment [AB]. C'est un nombre, qu'on note AB, et qui s'exprime avec une unité de longueur."
    ),
    tags: ["distance_segment", "definition", "qcm"],
    canvas: segment("A", "B", { etiquette: "AB" }),
  },
  {
    kind: "fixed",
    id: "distance_definition_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Que désigne l'écriture [AB] ?",
    format: "qcm",
    choices: [
      "le segment d'extrémités A et B",
      "la longueur du segment, c'est-à-dire un nombre",
      "la droite passant par A et B",
      "la demi-droite d'origine A passant par B",
    ],
    expected: ["le segment d'extrémités A et B"],
    comparator: "mcq_exact",
    hint: "Les crochets désignent un objet dessiné, pas une mesure.",
    explanation: expl(
      "[AB] est le SEGMENT : le morceau de droite limité par A et par B. (AB) est la DROITE, qui se prolonge des deux côtés. AB, sans crochets ni parenthèses, est la LONGUEUR — un nombre."
    ),
    tags: ["distance_segment", "definition", "notation", "qcm"],
  },
  {
    kind: "fixed",
    id: "distance_definition_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève écrit : « [AB] = 5 cm ». Cette écriture est-elle correcte ?",
    format: "qcm",
    choices: [
      "non : il faut écrire AB = 5 cm, sans crochets",
      "oui : les crochets ne changent rien",
      "non : il faut écrire (AB) = 5 cm",
      "oui, mais seulement si A et B sont sur un quadrillage",
    ],
    expected: ["non : il faut écrire AB = 5 cm, sans crochets"],
    comparator: "mcq_exact",
    hint: "Peut-on dire qu'un dessin est égal à 5 cm ?",
    explanation: expl(
      "[AB] est un segment, donc un objet : il ne vaut pas 5 cm, il MESURE 5 cm. C'est sa longueur, notée AB sans crochets, qui vaut 5 cm. On écrit donc AB = 5 cm."
    ),
    tags: ["distance_segment", "definition", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "distance_definition_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le plus court chemin pour aller du point A au point B ?",
    format: "qcm",
    choices: [
      "le segment [AB]",
      "un arc de cercle passant par A et B",
      "une ligne brisée passant par un troisième point",
      "cela dépend de la position de A et de B",
    ],
    expected: ["le segment [AB]"],
    comparator: "mcq_exact",
    hint: "C'est ce qu'on admet en 6e, et tout le reste en découle.",
    explanation: expl(
      "Le plus court chemin d'un point à un autre est le segment qui les joint. C'est de là que vient l'inégalité AC + CB ⩾ AB : passer par un point C ne peut jamais raccourcir le trajet."
    ),
    tags: ["distance_segment", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "distance_definition_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_definition",
    difficulty: 2,
    theme: "neutral",
    hint: "Une distance est un nombre : on l'écrit sans crochets.",
    tags: ["distance_segment", "definition", "template"],
    generate: () => {
      const paires: [string, string][] = [
        ["A", "B"],
        ["M", "N"],
        ["E", "F"],
        ["R", "S"],
        ["K", "L"],
      ];
      const [p, q] = paires[randomInt(0, paires.length - 1)];
      const d = randomInt(3, 12);
      const bonne = `${p}${q} = ${d} cm`;
      return {
        text: `Le segment [${p}${q}] mesure ${d} cm. Quelle écriture est correcte ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `[${p}${q}] = ${d} cm`,
          `(${p}${q}) = ${d} cm`,
          `${p}${q} = [${d} cm]`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: expl(
          `[${p}${q}] est le segment, un objet. Sa LONGUEUR se note ${p}${q}, sans crochets : ${p}${q} = ${d} cm.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "distance_definition_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_definition",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis ce que chaque écriture DÉSIGNE : un dessin, ou un nombre ?",
    tags: ["distance_segment", "definition", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique la différence entre (AB), [AB] et AB.",
          mots: ["droite", "segment", "longueur", "nombre"],
          r: "(AB) est la DROITE qui passe par A et B : elle se prolonge des deux côtés. [AB] est le SEGMENT : le morceau limité par A et par B. AB est la LONGUEUR de ce segment, c'est-à-dire un nombre. Deux dessins et une mesure.",
        },
        {
          q: "Explique pourquoi on ne peut pas écrire « [AB] = 7 cm ».",
          mots: ["objet", "segment", "longueur", "mesure", "nombre"],
          r: "[AB] est un objet géométrique, un segment : il ne peut pas être égal à un nombre. C'est sa longueur qui mesure 7 cm, et elle se note AB sans crochets. On écrit AB = 7 cm.",
        },
        {
          q: "Explique pourquoi le plus court chemin entre deux points est le segment qui les joint.",
          mots: ["détour", "detour", "plus long", "droit", "admet"],
          r: "Tout chemin qui passe ailleurs fait un détour, et un détour rallonge. En 6e on l'admet, et on en tire une conséquence qui sert toute l'année : pour tout point C, AC + CB est supérieur ou égal à AB, avec égalité seulement si C est sur le segment [AB].",
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
  // DISTANCE_MILIEU
  // =========================
  {
    kind: "fixed",
    id: "distance_milieu_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_milieu",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'est-ce que le milieu d'un segment [AB] ?",
    format: "qcm",
    choices: [
      "le point de [AB] situé à égale distance de A et de B",
      "n'importe quel point situé à égale distance de A et de B",
      "le point situé au milieu de la droite (AB)",
      "le point où le segment change de direction",
    ],
    expected: ["le point de [AB] situé à égale distance de A et de B"],
    comparator: "mcq_exact",
    hint: "Deux conditions : il est SUR le segment, et à égale distance des extrémités.",
    explanation: expl(
      "Le milieu M de [AB] est le point du segment tel que MA = MB. Les deux conditions comptent : d'autres points sont à égale distance de A et de B, mais ils ne sont pas sur [AB] — ils forment la médiatrice."
    ),
    tags: ["distance_segment", "milieu", "qcm"],
    canvas: segment("A", "B", { milieu: { label: "M", sur: true } }),
  },
  {
    kind: "fixed",
    id: "distance_milieu_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_milieu",
    difficulty: 1,
    theme: "neutral",
    text: "M est le milieu de [AB] et AB = 12 cm. Combien mesure AM ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Le milieu partage le segment en deux morceaux égaux.",
    explanation: expl("AM = MB = AB ÷ 2 = 12 ÷ 2 = 6 cm."),
    tags: ["distance_segment", "milieu", "short"],
  },
  {
    kind: "fixed",
    id: "distance_milieu_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_milieu",
    difficulty: 2,
    theme: "neutral",
    text: "M est le milieu de [AB] et AM = 4,5 cm. Combien mesure AB ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Le segment vaut deux fois la moitié.",
    explanation: expl("AB = 2 × AM = 2 × 4,5 = 9 cm."),
    tags: ["distance_segment", "milieu", "short"],
  },
  {
    kind: "fixed",
    id: "distance_milieu_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_milieu",
    difficulty: 3,
    theme: "neutral",
    text: "Comment construire le milieu d'un segment avec un compas et une règle NON graduée ?",
    format: "qcm",
    choices: [
      "on trace deux arcs de même rayon depuis A et depuis B, puis on joint leurs intersections",
      "on mesure le segment, puis on divise par deux",
      "on trace un cercle de centre A passant par B",
      "on place le compas au hasard sur le segment jusqu'à ce que ça tombe juste",
    ],
    expected: [
      "on trace deux arcs de même rayon depuis A et depuis B, puis on joint leurs intersections",
    ],
    comparator: "mcq_exact",
    hint: "La droite obtenue coupe le segment en son milieu : c'est sa médiatrice.",
    explanation: expl(
      "Avec le même écartement de compas, on trace deux arcs depuis A et deux depuis B : ils se coupent en deux points, situés à égale distance de A et de B. La droite qui les joint est la médiatrice de [AB], et elle coupe le segment exactement en son milieu. On peut aussi plier la feuille pour amener A sur B."
    ),
    tags: ["distance_segment", "milieu", "construction", "qcm"],
  },
  {
    kind: "fixed",
    id: "distance_milieu_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_milieu",
    difficulty: 3,
    theme: "neutral",
    text: "Un point P vérifie PA = PB. Est-ce forcément le milieu de [AB] ?",
    format: "qcm",
    choices: [
      "non : il faut aussi que P soit sur le segment [AB]",
      "oui : PA = PB suffit à définir le milieu",
      "non : il faut que PA = PB = AB",
      "oui, à condition que AB soit un nombre entier",
    ],
    expected: ["non : il faut aussi que P soit sur le segment [AB]"],
    comparator: "mcq_exact",
    hint: "Pense au sommet d'un triangle isocèle.",
    explanation: expl(
      "Tous les points à égale distance de A et de B forment la médiatrice de [AB] — une droite entière. Un seul d'entre eux est sur le segment : c'est le milieu. Le sommet d'un triangle isocèle vérifie PA = PB sans être le milieu de [AB]."
    ),
    tags: ["distance_segment", "milieu", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "distance_milieu_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_milieu",
    difficulty: 2,
    theme: "neutral",
    hint: "Le milieu coupe le segment en deux morceaux égaux.",
    tags: ["distance_segment", "milieu", "template"],
    generate: () => {
      const demi = randomInt(2, 12);
      const versLeTout = Math.random() < 0.5;
      const total = 2 * demi;
      return versLeTout
        ? {
            text: `M est le milieu de [AB] et AM = ${demi} cm. Combien mesure AB ?`,
            format: "short",
            expected: [String(total)],
            comparator: "number_equal",
            explanation: expl(`AB = 2 × AM = 2 × ${demi} = ${total} cm.`),
            canvas: segment("A", "B", { milieu: { label: "M", sur: true } }),
          }
        : {
            text: `M est le milieu de [AB] et AB = ${total} cm. Combien mesure MB ?`,
            format: "short",
            expected: [String(demi)],
            comparator: "number_equal",
            explanation: expl(`MB = AB ÷ 2 = ${total} ÷ 2 = ${demi} cm.`),
            canvas: segment("A", "B", { milieu: { label: "M", sur: true } }),
          };
    },
  },
  {
    kind: "template",
    id: "distance_milieu_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_milieu",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis les DEUX conditions, pas une seule.",
    tags: ["distance_segment", "milieu", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi « M est à égale distance de A et de B » ne suffit pas à dire que M est le milieu de [AB].",
          mots: ["segment", "médiatrice", "mediatrice", "appartient", "sur"],
          r: "Tous les points à égale distance de A et de B forment une droite entière : la médiatrice de [AB]. Un seul de ces points appartient au segment, et c'est lui le milieu. Il faut donc les deux conditions : M sur [AB], et MA = MB.",
        },
        {
          q: "Explique comment placer le milieu d'un segment sans utiliser de règle graduée.",
          mots: ["compas", "arcs", "pliage", "médiatrice", "mediatrice"],
          r: "Avec le même écartement de compas, on trace des arcs depuis A puis depuis B : ils se coupent en deux points, à égale distance de A et de B. La droite qui les joint coupe [AB] en son milieu. Le pliage marche aussi : on amène A sur B, et le pli passe par le milieu.",
        },
        {
          q: "Explique pourquoi le milieu d'un segment est unique.",
          mots: ["un seul", "unique", "segment", "médiatrice", "mediatrice"],
          r: "La médiatrice de [AB] est une droite ; elle coupe le segment [AB] en un seul point, puisque deux droites non confondues ne se coupent qu'une fois. Il n'y a donc qu'un point à la fois sur le segment et à égale distance des extrémités.",
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
  // DISTANCE_INEGALITE — AC + CB ⩾ AB
  // =========================
  {
    kind: "fixed",
    id: "distance_inegalite_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_inegalite",
    difficulty: 2,
    theme: "neutral",
    text: "Pour un point C quelconque, que peut-on dire de AC + CB comparé à AB ?",
    format: "qcm",
    choices: [
      "AC + CB est toujours supérieur ou égal à AB",
      "AC + CB est toujours égal à AB",
      "AC + CB est toujours inférieur à AB",
      "on ne peut rien dire sans connaître les longueurs",
    ],
    expected: ["AC + CB est toujours supérieur ou égal à AB"],
    comparator: "mcq_exact",
    hint: "Passer par C, c'est au mieux ne pas faire de détour.",
    explanation: expl(
      "Le plus court chemin de A à B est le segment [AB]. Passer par C ne peut donc pas raccourcir : AC + CB ⩾ AB. Il y a égalité uniquement quand C est sur le segment [AB]."
    ),
    tags: ["distance_segment", "inegalite", "qcm"],
    canvas: segment("A", "B", { horsSegment: { label: "C", x: 170, y: 60 } }),
  },
  {
    kind: "fixed",
    id: "distance_inegalite_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_inegalite",
    difficulty: 3,
    theme: "neutral",
    text: "On sait que AC = 5 cm, CB = 7 cm et AB = 12 cm. Le point C appartient-il au segment [AB] ?",
    format: "qcm",
    choices: [
      "oui : 5 + 7 = 12, donc il y a égalité",
      "non : C est forcément en dehors",
      "on ne peut pas le savoir",
      "oui, mais seulement si C est le milieu",
    ],
    expected: ["oui : 5 + 7 = 12, donc il y a égalité"],
    comparator: "mcq_exact",
    hint: "Compare AC + CB à AB.",
    explanation: expl(
      "AC + CB = 5 + 7 = 12 = AB. L'égalité n'est réalisée que pour les points du segment [AB] : C appartient donc à [AB]. Les trois points sont alignés."
    ),
    tags: ["distance_segment", "inegalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "distance_inegalite_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_inegalite",
    difficulty: 3,
    theme: "neutral",
    text: "On sait que AC = 5 cm, CB = 7 cm et AB = 10 cm. Le point C appartient-il au segment [AB] ?",
    format: "qcm",
    choices: [
      "non : 5 + 7 = 12, ce qui est plus grand que 10",
      "oui : 5 et 7 sont plus petits que 10",
      "oui : 5 + 7 est plus grand que 10, donc C est dessus",
      "on ne peut pas le savoir sans dessin",
    ],
    expected: ["non : 5 + 7 = 12, ce qui est plus grand que 10"],
    comparator: "mcq_exact",
    hint: "Il n'y a égalité que si C est sur le segment.",
    explanation: expl(
      "AC + CB = 12, alors que AB = 10. On a donc AC + CB > AB, sans égalité : le point C fait un détour, il n'est pas sur le segment [AB]. Les trois points ne sont pas alignés."
    ),
    tags: ["distance_segment", "inegalite", "qcm"],
  },
  {
    kind: "template",
    id: "distance_inegalite_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_inegalite",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare AC + CB à AB : l'égalité signifie « C est sur le segment ».",
    tags: ["distance_segment", "inegalite", "template"],
    generate: () => {
      const ac = randomInt(3, 9);
      const cb = randomInt(3, 9);
      const aligne = Math.random() < 0.5;
      const ab = aligne ? ac + cb : ac + cb - randomInt(1, Math.min(ac, cb));
      return {
        text: `On sait que AC = ${ac} cm, CB = ${cb} cm et AB = ${ab} cm. Le point C appartient-il au segment [AB] ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [aligne ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(
          aligne
            ? `AC + CB = ${ac} + ${cb} = ${ab} = AB : il y a égalité, donc C appartient au segment [AB].`
            : `AC + CB = ${ac} + ${cb} = ${ac + cb}, alors que AB = ${ab}. Comme ${ac + cb} est plus grand que ${ab}, il n'y a pas égalité : C n'est pas sur le segment [AB].`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "distance_inegalite_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_inegalite",
    difficulty: 4,
    theme: "neutral",
    hint: "Parle du détour.",
    tags: ["distance_segment", "inegalite", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi AC + CB ne peut jamais être plus petit que AB.",
          mots: ["plus court", "détour", "detour", "segment", "droit"],
          r: "Le segment [AB] est le plus court chemin de A à B. Le trajet A → C → B est un chemin de A à B lui aussi : il ne peut donc pas être plus court. Au mieux il est aussi court, et c'est le cas quand C est posé sur [AB].",
        },
        {
          q: "Explique comment savoir si trois points A, B et C sont alignés en connaissant seulement leurs distances.",
          mots: ["égalité", "egalite", "somme", "AB", "additionne"],
          r: "On regarde si l'une des trois distances est la somme des deux autres. Si AC + CB = AB, alors C est sur le segment [AB], donc les trois points sont alignés. Si la somme est strictement plus grande, il y a un détour : ils ne le sont pas.",
        },
        {
          q: "Un élève affirme que si AC + CB est plus grand que AB, alors C est loin du segment. Que penses-tu de cette affirmation ?",
          mots: ["peu", "près", "pres", "loin", "légèrement", "legerement", "écart", "ecart"],
          r: "Elle est trop forte. Dès que C n'est pas sur [AB], la somme dépasse AB — même si C n'en est qu'à un millimètre. L'inégalité dit que C n'est PAS sur le segment ; elle ne dit rien de la distance à laquelle il se trouve. C'est l'écart entre AC + CB et AB qui, lui, grandit quand C s'éloigne.",
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
  // DISTANCE_DEFI
  // =========================
  {
    kind: "fixed",
    id: "distance_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_defi",
    difficulty: 4,
    theme: "neutral",
    text: "M est le milieu de [AB] et N est le milieu de [MB]. Si AB = 20 cm, combien mesure AN ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Place d'abord M, puis N, et compte.",
    explanation: expl(
      "M est le milieu de [AB], donc AM = MB = 10 cm. N est le milieu de [MB], donc MN = 5 cm. Alors AN = AM + MN = 10 + 5 = 15 cm."
    ),
    tags: ["distance_segment", "defi", "short"],
  },
  {
    kind: "fixed",
    id: "distance_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Trois villages : de Saint-Pierre à Le Tampon il y a 12 km, du Tampon à Saint-Joseph 25 km, et de Saint-Pierre à Saint-Joseph 33 km en ligne droite. Ces trois villages sont-ils alignés ?",
    format: "qcm",
    choices: [
      "non : 12 + 25 = 37, ce qui dépasse 33",
      "oui : 12 + 25 = 33",
      "oui : 33 est la plus grande des trois distances",
      "on ne peut pas le savoir sans une carte",
    ],
    expected: ["non : 12 + 25 = 37, ce qui dépasse 33"],
    comparator: "mcq_exact",
    hint: "Additionne les deux petits trajets et compare au grand.",
    explanation: expl(
      "12 + 25 = 37 km, alors que la distance directe est 33 km. Passer par Le Tampon fait donc un détour de 4 km : les trois villages ne sont pas alignés."
    ),
    tags: ["distance_segment", "defi", "974", "qcm"],
  },
  {
    kind: "template",
    id: "distance_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux milieux emboîtés : fais un dessin à main levée.",
    tags: ["distance_segment", "defi", "template"],
    generate: () => {
      const quart = randomInt(2, 8);
      const ab = 4 * quart;
      return {
        text: `M est le milieu de [AB] et N est le milieu de [AM]. Si AB = ${ab} cm, combien mesure NB ?`,
        format: "short",
        expected: [String(3 * quart)],
        comparator: "number_equal",
        explanation: expl(
          `AM = ${ab} ÷ 2 = ${2 * quart} cm. N est le milieu de [AM], donc AN = ${quart} cm. Alors NB = AB − AN = ${ab} − ${quart} = ${3 * quart} cm.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "distance_defi_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Appuie-toi sur ce qu'on admet : le plus court chemin est le segment.",
    tags: ["distance_segment", "defi", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi un détour par un troisième point est toujours au moins aussi long que le trajet direct, même si le détour est minuscule.",
          mots: ["plus court", "segment", "droit", "détour", "detour"],
          r: "Parce que le trajet direct est, par définition, le plus court de tous les chemins de A à B. Tout autre chemin, aussi proche soit-il du segment, en fait partie : il ne peut donc pas être plus court. Il est égal seulement s'il se confond avec le segment.",
        },
        {
          q: "Un GPS annonce 33 km entre deux villes, mais 37 km si on passe par une troisième. Explique ce que cela dit de la position de cette troisième ville.",
          mots: ["alignées", "alignees", "pas sur", "détour", "detour", "écart", "ecart"],
          r: "Le trajet indirect dépasse le trajet direct de 4 km : la troisième ville n'est donc pas sur la ligne droite qui joint les deux autres. Si elle l'était, les deux distances seraient égales. Les trois villes ne sont pas alignées.",
        },
        {
          q: "Explique comment couper un segment en quatre parts égales avec un compas seulement.",
          mots: ["milieu", "deux fois", "médiatrice", "mediatrice", "recommence"],
          r: "On construit d'abord le milieu M de [AB] au compas — deux arcs depuis A, deux depuis B, on joint les intersections. On recommence ensuite sur [AM], puis sur [MB] : chaque moitié se coupe en deux, ce qui donne quatre parts égales.",
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
