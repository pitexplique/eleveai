// ─── Médiatrices d'un triangle et cercle circonscrit (6e) ──────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (22/08/2026). Le programme de 6e demande, sous
// « Triangles » : « Savoir que les médiatrices d'un triangle sont concourantes »
// et « Connaître et construire le cercle circonscrit à un triangle ». Le coach
// n'en avait aucune micro.
//
// ⭐ C'EST LA PREMIÈRE PREUVE DE L'ANNÉE, ET LE BO LE DIT : « l'élève comprend
// POURQUOI les trois médiatrices d'un triangle sont concourantes et il est
// capable de RESTITUER LES ARGUMENTS DE LA PREUVE de ce résultat ». Ce n'est
// donc pas un résultat à admettre — c'est un raisonnement à refaire. D'où le
// poids donné ici aux questions ouvertes : restituer une preuve ne se coche pas
// dans un QCM.
//
// La preuve, en trois lignes, et elle ne tient que par la propriété
// caractéristique de la médiatrice, dans les DEUX sens :
//   · O est sur la médiatrice de [AB], donc OA = OB ;
//   · O est sur la médiatrice de [BC], donc OB = OC ;
//   · donc OA = OC, donc O est sur la médiatrice de [AC].
// Le troisième pas utilise le sens « équidistant ⇒ sur la médiatrice », celui
// que l'élève oublie. C'est pour cela que `mediatrice_propriete` le porte dans
// les deux ordres : cette notion-ci en dépend entièrement.
//
// ⭐ ET LE CERCLE CIRCONSCRIT TOMBE TOUT SEUL : OA = OB = OC, donc les trois
// sommets sont à la même distance de O — ils sont sur un même cercle de centre
// O. La construction n'est que la lecture de la preuve.

import type { TutorBankItemV4, CercleCanvasData } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : le cercle circonscrit à un triangle est le cercle qui passe par ses trois sommets.\n\n" +
    "Méthode : son centre est le point de concours des médiatrices des côtés — c'est le seul point à égale distance des trois sommets.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

/**
 * Un triangle INSCRIT dans son cercle circonscrit : les trois sommets sur le
 * cercle, les trois côtés dessinés comme des cordes, le centre O au milieu.
 *
 * ⚠️ Le canvas `triangle` ne sait pas dessiner de cercle, et le canvas `cercle`
 * ne sait pas dessiner de triangle — mais il sait tracer des CORDES. Trois
 * cordes bout à bout font le triangle, et c'est la figure exacte dont on a
 * besoin : elle montre en même temps le triangle, le cercle et le centre.
 */
function triangleInscrit(opts: { centreVisible: boolean; rayons?: boolean }): CercleCanvasData {
  const cx = 170;
  const cy = 155;
  const r = 95;
  const pos = (deg: number) => ({
    x: cx + r * Math.cos((deg * Math.PI) / 180),
    y: cy - r * Math.sin((deg * Math.PI) / 180),
  });
  const A = pos(205);
  const B = pos(335);
  const C = pos(95);

  const points: CercleCanvasData["points"] = [
    { id: "A", x: A.x, y: A.y, label: "A" },
    { id: "B", x: B.x, y: B.y, label: "B" },
    { id: "C", x: C.x, y: C.y, label: "C" },
  ];
  const segments: CercleCanvasData["segments"] = [
    { id: "AB", kind: "corde", from: "A", to: "B" },
    { id: "BC", kind: "corde", from: "B", to: "C" },
    { id: "CA", kind: "corde", from: "C", to: "A" },
  ];

  if (opts.centreVisible) {
    points.push({ id: "O", x: cx, y: cy, label: "O", color: "#ef4444", highlight: true });
    if (opts.rayons) {
      segments.push(
        { id: "OA", kind: "rayon", from: "O", to: "A", dashed: true },
        { id: "OB", kind: "rayon", from: "O", to: "B", dashed: true },
        { id: "OC", kind: "rayon", from: "O", to: "C", dashed: true }
      );
    }
  }

  return {
    kind: "cercle",
    size: { width: 340, height: 310 },
    circle: { cx, cy, r, showCircle: true },
    points,
    segments,
    display: { showLabels: true, showPoints: true, showCenter: opts.centreVisible },
  };
}

export const cercleCirconscritBank: TutorBankItemV4[] = [
  // =========================
  // CIRCONSCRIT_CONCOURANTES — le résultat, et sa preuve
  // =========================
  {
    kind: "fixed",
    id: "circonscrit_concourantes_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_concourantes",
    difficulty: 2,
    theme: "neutral",
    text: "Que peut-on dire des trois médiatrices des côtés d'un triangle ?",
    format: "qcm",
    choices: [
      "elles se coupent toutes les trois en un même point",
      "elles sont parallèles entre elles",
      "elles se coupent deux à deux en trois points différents",
      "elles passent toutes les trois par le milieu du plus grand côté",
    ],
    expected: ["elles se coupent toutes les trois en un même point"],
    comparator: "mcq_exact",
    hint: "On dit qu'elles sont concourantes.",
    explanation: expl(
      "Les trois médiatrices d'un triangle sont CONCOURANTES : elles passent toutes par un même point. Ce point est à égale distance des trois sommets, et c'est le centre du cercle circonscrit."
    ),
    tags: ["cercle_circonscrit", "concourantes", "qcm"],
    canvas: triangleInscrit({ centreVisible: true, rayons: true }),
  },
  {
    kind: "fixed",
    id: "circonscrit_concourantes_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_concourantes",
    difficulty: 3,
    theme: "neutral",
    text: "Le point O est le point de concours des médiatrices du triangle ABC. Que peut-on dire des longueurs OA, OB et OC ?",
    format: "qcm",
    choices: [
      "elles sont toutes les trois égales",
      "OA = OB, mais OC peut être différente",
      "elles sont toutes différentes",
      "leur somme est égale au périmètre du triangle",
    ],
    expected: ["elles sont toutes les trois égales"],
    comparator: "mcq_exact",
    hint: "Sur chaque médiatrice, deux distances sont égales.",
    explanation: expl(
      "O est sur la médiatrice de [AB], donc OA = OB. O est sur la médiatrice de [BC], donc OB = OC. Les trois longueurs sont donc égales : OA = OB = OC. C'est ce qui fait de O le centre d'un cercle passant par les trois sommets."
    ),
    tags: ["cercle_circonscrit", "concourantes", "qcm"],
  },
  {
    kind: "fixed",
    id: "circonscrit_concourantes_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_concourantes",
    difficulty: 4,
    theme: "neutral",
    text: "Dans la preuve, on sait déjà que OA = OB et que OB = OC. Quel argument permet de conclure que O est aussi sur la médiatrice de [AC] ?",
    format: "qcm",
    choices: [
      "OA = OC, or tout point équidistant de A et de C est sur la médiatrice de [AC]",
      "O est le milieu de [AC]",
      "les trois côtés du triangle ont la même longueur",
      "O est le centre de gravité du triangle",
    ],
    expected: [
      "OA = OC, or tout point équidistant de A et de C est sur la médiatrice de [AC]",
    ],
    comparator: "mcq_exact",
    hint: "C'est le sens de la propriété caractéristique qui sert à démontrer.",
    explanation: expl(
      "De OA = OB et OB = OC, on tire OA = OC : le point O est à égale distance de A et de C. Or tout point équidistant des deux extrémités d'un segment appartient à sa médiatrice. Donc O est sur la médiatrice de [AC] — et les trois médiatrices passent bien par O."
    ),
    tags: ["cercle_circonscrit", "concourantes", "preuve", "qcm"],
  },
  {
    kind: "fixed",
    id: "circonscrit_concourantes_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_concourantes",
    difficulty: 3,
    theme: "neutral",
    text: "Pour démontrer que les trois médiatrices sont concourantes, par quoi commence-t-on ?",
    format: "qcm",
    choices: [
      "on appelle O le point d'intersection de DEUX des médiatrices",
      "on suppose que les trois se coupent au même point",
      "on mesure les trois médiatrices",
      "on trace le cercle circonscrit puis on cherche son centre",
    ],
    expected: ["on appelle O le point d'intersection de DEUX des médiatrices"],
    comparator: "mcq_exact",
    hint: "On ne peut pas partir de ce qu'on veut démontrer.",
    explanation: expl(
      "On part de deux médiatrices seulement — elles ne sont pas parallèles, donc elles se coupent en un point qu'on nomme O. Tout le raisonnement consiste ensuite à montrer que la TROISIÈME passe elle aussi par ce point. Supposer d'emblée que les trois se coupent reviendrait à admettre ce qu'on veut prouver."
    ),
    tags: ["cercle_circonscrit", "concourantes", "preuve", "qcm"],
  },
  {
    kind: "template",
    id: "circonscrit_concourantes_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_concourantes",
    difficulty: 3,
    theme: "neutral",
    hint: "Toutes les distances du centre aux sommets sont égales.",
    tags: ["cercle_circonscrit", "concourantes", "template"],
    generate: () => {
      const d = randomInt(3, 12);
      const sommets: [string, string, string][] = [
        ["A", "B", "C"],
        ["M", "N", "P"],
        ["E", "F", "G"],
        ["R", "S", "T"],
      ];
      const [a, b, c] = sommets[randomInt(0, sommets.length - 1)];
      return {
        text: `Le point O est le point de concours des médiatrices du triangle ${a}${b}${c}, et O${a} = ${d} cm. Combien mesure O${c} ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation: expl(
          `O est sur les médiatrices des trois côtés, donc O${a} = O${b} = O${c}. Comme O${a} = ${d} cm, on a O${c} = ${d} cm.`
        ),
        canvas: triangleInscrit({ centreVisible: true, rayons: true }),
      };
    },
  },
  {
    kind: "template",
    id: "circonscrit_concourantes_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_concourantes",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque étape se justifie par la propriété caractéristique de la médiatrice.",
    tags: ["cercle_circonscrit", "concourantes", "preuve", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Démontre que les trois médiatrices d'un triangle ABC sont concourantes.",
          mots: ["OA = OB", "OB = OC", "OA = OC", "médiatrice", "mediatrice", "équidistant", "equidistant"],
          r: "On appelle O le point d'intersection des médiatrices de [AB] et de [BC]. Comme O est sur la médiatrice de [AB], on a OA = OB. Comme O est sur la médiatrice de [BC], on a OB = OC. On en déduit OA = OC : O est donc à égale distance de A et de C, donc il appartient à la médiatrice de [AC]. Les trois médiatrices passent bien par le même point O.",
        },
        {
          q: "Explique pourquoi, dans cette preuve, on ne part que de DEUX médiatrices et pas des trois.",
          mots: ["démontrer", "demontrer", "suppose", "admettre", "conclusion", "prouver"],
          r: "Parce que « les trois se coupent au même point » est justement ce qu'on veut démontrer : on ne peut pas s'en servir comme point de départ. On part donc de deux médiatrices, qui se coupent forcément puisqu'elles ne sont pas parallèles, et on prouve que la troisième passe par leur point d'intersection.",
        },
        {
          q: "Explique quel rôle joue la propriété caractéristique de la médiatrice dans cette preuve, et dans quel sens on l'utilise à chaque étape.",
          mots: ["deux sens", "équidistant", "equidistant", "réciproque", "reciproque", "distances"],
          r: "On l'utilise dans les deux sens. D'abord dans le sens « sur la médiatrice, donc équidistant » : de O sur la médiatrice de [AB] on tire OA = OB, et de même pour [BC]. Ensuite dans l'autre sens, « équidistant, donc sur la médiatrice » : de OA = OC on conclut que O appartient à la médiatrice de [AC]. Sans ce second sens, la preuve s'arrête.",
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
  // CIRCONSCRIT_CONSTRUIRE
  // =========================
  {
    kind: "fixed",
    id: "circonscrit_construire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'appelle-t-on le cercle circonscrit à un triangle ?",
    format: "qcm",
    choices: [
      "le cercle qui passe par les trois sommets du triangle",
      "le cercle tracé à l'intérieur du triangle, touchant les trois côtés",
      "le cercle de centre le milieu du plus grand côté",
      "le plus petit cercle qui contient le triangle",
    ],
    expected: ["le cercle qui passe par les trois sommets du triangle"],
    comparator: "mcq_exact",
    hint: "« Circonscrit » veut dire « tracé autour ».",
    explanation: expl(
      "Le cercle circonscrit passe par les trois SOMMETS. Son centre est le point de concours des médiatrices, et son rayon est la distance commune de ce centre aux trois sommets."
    ),
    tags: ["cercle_circonscrit", "construire", "canvas", "qcm"],
    canvas: triangleInscrit({ centreVisible: false }),
  },
  {
    kind: "fixed",
    id: "circonscrit_construire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de médiatrices faut-il tracer, au minimum, pour trouver le centre du cercle circonscrit ?",
    format: "short",
    expected: ["2", "deux"],
    comparator: "contains_keyword",
    hint: "Deux droites qui se coupent donnent déjà un point.",
    explanation: expl(
      "Deux suffisent : leur point d'intersection est déjà à égale distance des trois sommets, puisque la troisième médiatrice y passe forcément. On trace souvent la troisième quand même — comme vérification, pour voir si elle tombe bien sur le même point."
    ),
    tags: ["cercle_circonscrit", "construire", "short"],
  },
  {
    kind: "fixed",
    id: "circonscrit_construire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Une fois le centre O trouvé, comment règle-t-on l'écartement du compas pour tracer le cercle circonscrit ?",
    format: "qcm",
    choices: [
      "on pointe en O et on ouvre le compas jusqu'à l'un des trois sommets",
      "on ouvre le compas de la longueur du plus grand côté",
      "on ouvre le compas de la moitié du plus grand côté",
      "on ouvre le compas au hasard, puis on ajuste",
    ],
    expected: ["on pointe en O et on ouvre le compas jusqu'à l'un des trois sommets"],
    comparator: "mcq_exact",
    hint: "Le rayon, c'est la distance du centre à un sommet.",
    explanation: expl(
      "Le rayon du cercle circonscrit est OA, c'est-à-dire la distance de O à n'importe lequel des trois sommets — elles sont égales. On pointe donc en O, on ouvre jusqu'à A, et on trace : le cercle passe alors aussi par B et par C."
    ),
    tags: ["cercle_circonscrit", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "circonscrit_construire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Le rayon du cercle circonscrit au triangle ABC mesure 6 cm. Combien mesure la distance du centre O au sommet B ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Les trois sommets sont sur le cercle.",
    explanation: expl(
      "B est un point du cercle de centre O, donc [OB] est un rayon : OB = 6 cm. C'est vrai pour les trois sommets, puisqu'ils sont tous sur ce cercle."
    ),
    tags: ["cercle_circonscrit", "construire", "canvas", "short"],
    canvas: triangleInscrit({ centreVisible: true, rayons: true }),
  },
  {
    kind: "template",
    id: "circonscrit_construire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "Tous les sommets sont à la même distance du centre.",
    tags: ["cercle_circonscrit", "construire", "template"],
    generate: () => {
      const r = randomInt(3, 11);
      const sommet = ["A", "B", "C"][randomInt(0, 2)];
      return {
        text: `Le cercle circonscrit au triangle ABC a pour centre O et pour rayon ${r} cm. Combien mesure O${sommet} ?`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: expl(
          `${sommet} est un sommet du triangle, donc il appartient au cercle circonscrit : [O${sommet}] est un rayon, et O${sommet} = ${r} cm.`
        ),
        canvas: triangleInscrit({ centreVisible: true, rayons: true }),
      };
    },
  },
  {
    kind: "template",
    id: "circonscrit_construire_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_construire",
    difficulty: 5,
    theme: "neutral",
    hint: "Des étapes qu'un camarade puisse suivre sans te voir faire.",
    tags: ["cercle_circonscrit", "construire", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Écris un programme de construction du cercle circonscrit à un triangle ABC.",
          mots: ["médiatrice", "mediatrice", "intersection", "compas", "sommet", "rayon"],
          r: "1. Construire la médiatrice de [AB] au compas. 2. Construire la médiatrice de [BC] de la même façon. 3. Appeler O leur point d'intersection. 4. Pointer le compas en O et l'ouvrir jusqu'au sommet A. 5. Tracer le cercle : il passe par A, B et C.",
        },
        {
          q: "Explique pourquoi deux médiatrices suffisent à trouver le centre du cercle circonscrit.",
          mots: ["troisième", "troisieme", "passe", "concourantes", "démontré", "demontre"],
          r: "Parce qu'on a démontré que les trois médiatrices sont concourantes : la troisième passe forcément par le point d'intersection des deux premières. La tracer n'apporterait aucune information nouvelle — seulement une vérification du tracé.",
        },
        {
          q: "Explique pourquoi le cercle tracé depuis O en passant par A passe forcément aussi par B et par C.",
          mots: ["OA = OB", "OB = OC", "même distance", "meme distance", "rayon", "égale", "egale"],
          r: "Le point O est à égale distance des trois sommets : OA = OB = OC. Le cercle de centre O et de rayon OA contient donc tous les points situés à cette distance de O — ce qui inclut B et C. Il passe par les trois sommets sans qu'on ait rien à ajuster.",
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
  // CIRCONSCRIT_DEFI
  // =========================
  {
    kind: "fixed",
    id: "circonscrit_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Trois maisons ne sont pas alignées. On veut creuser un puits à égale distance des trois. Où faut-il le placer ?",
    format: "qcm",
    choices: [
      "au point de concours des médiatrices du triangle formé par les trois maisons",
      "au milieu de la maison la plus centrale",
      "n'importe où sur la médiatrice de deux d'entre elles",
      "il n'existe aucun emplacement possible",
    ],
    expected: ["au point de concours des médiatrices du triangle formé par les trois maisons"],
    comparator: "mcq_exact",
    hint: "Le point à égale distance de trois points, c'est exactement le centre du cercle circonscrit.",
    explanation: expl(
      "Les trois maisons forment un triangle. Le seul point à égale distance de ses trois sommets est le point de concours des médiatrices — le centre du cercle circonscrit. Une seule médiatrice ne suffirait pas : elle donne une droite entière de candidats, tous à égale distance de DEUX maisons seulement."
    ),
    tags: ["cercle_circonscrit", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "circonscrit_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Trois points A, B et C sont ALIGNÉS. Peut-on tracer un cercle qui passe par les trois ?",
    format: "qcm",
    choices: [
      "non : les médiatrices sont alors parallèles et ne se coupent jamais",
      "oui : il suffit de prendre un cercle assez grand",
      "oui : le centre est le milieu de [AC]",
      "oui, mais seulement si B est le milieu de [AC]",
    ],
    expected: ["non : les médiatrices sont alors parallèles et ne se coupent jamais"],
    comparator: "mcq_exact",
    hint: "Trace les médiatrices de [AB] et de [BC] quand les trois points sont sur une même droite.",
    explanation: expl(
      "Si A, B et C sont alignés, les médiatrices de [AB] et de [BC] sont toutes deux perpendiculaires à la même droite : elles sont donc parallèles et ne se coupent pas. Il n'existe aucun point à égale distance des trois, donc aucun cercle ne passe par eux. C'est pourquoi on parle du cercle circonscrit à un TRIANGLE — et un triangle a ses trois sommets non alignés."
    ),
    tags: ["cercle_circonscrit", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "circonscrit_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le rayon est la distance commune du centre aux sommets.",
    tags: ["cercle_circonscrit", "defi", "template"],
    generate: () => {
      const r = randomInt(4, 12);
      return {
        text: `Le centre O du cercle circonscrit au triangle ABC vérifie OB = ${r} cm. Quel est le diamètre de ce cercle ?`,
        format: "short",
        expected: [String(2 * r)],
        comparator: "number_equal",
        explanation: expl(
          `OB est un rayon du cercle circonscrit, donc le rayon vaut ${r} cm. Le diamètre est le double du rayon : 2 × ${r} = ${2 * r} cm.`
        ),
        canvas: triangleInscrit({ centreVisible: true, rayons: true }),
      };
    },
  },
  {
    kind: "template",
    id: "circonscrit_defi_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Reviens toujours à « à égale distance de… ».",
    tags: ["cercle_circonscrit", "defi", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi trois points alignés n'ont pas de cercle qui passe par eux trois.",
          mots: ["parallèles", "paralleles", "alignés", "alignes", "perpendiculaires", "ne se coupent"],
          r: "Les médiatrices de [AB] et de [BC] sont toutes deux perpendiculaires à la droite qui porte les trois points : elles sont donc parallèles entre elles et ne se coupent jamais. Sans point de concours, aucun point n'est à égale distance des trois, donc aucun cercle ne les contient tous les trois.",
        },
        {
          q: "Une commune veut placer une antenne à égale distance de trois villages non alignés. Explique la démarche, et pourquoi la solution est unique.",
          mots: ["médiatrices", "mediatrices", "concours", "triangle", "un seul", "unique"],
          r: "On trace le triangle formé par les trois villages, puis les médiatrices de deux de ses côtés. Leur point d'intersection est à égale distance des trois. Deux droites non parallèles ne se coupent qu'en un point : la solution est donc unique — contrairement au cas de deux villages seulement, où toute une droite convenait.",
        },
        {
          q: "Explique le lien entre « les médiatrices sont concourantes » et « le cercle circonscrit existe ».",
          mots: ["égale distance", "egale distance", "rayon", "centre", "trois sommets"],
          r: "Ce sont deux façons de dire la même chose. Si les trois médiatrices se coupent en O, alors OA = OB = OC : les trois sommets sont à la même distance de O, donc ils sont sur un même cercle de centre O et de rayon OA. L'existence du cercle circonscrit est la conséquence directe du point de concours.",
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

// `shuffle` sert aux gabarits à choix multiples ; il reste ici pour la symétrie
// avec les autres banques du niveau.
void shuffle;
