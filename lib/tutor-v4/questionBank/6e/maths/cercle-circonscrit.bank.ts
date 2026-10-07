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
import { PRENOMS, pick } from "./entiers.bank";

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

// =========================
// ⭐ 06/10/2026 — LETTRES, SITUATIONS, PRÉNOMS, TOURNURES
// (PASSATION-COACH-MATHS-6E-CONSIGNE.md). Mesuré le 06/10 : 6 à 11 squelettes
// par micro, 10 à 16 répétitions sur 20 : le triangle s'appelait toujours ABC
// et le centre O. Les questions ouvertes à mots-clés (toute réponse contenant
// « médiatrice » passait) deviennent des QCM sur CHAQUE PAS de la preuve et du
// programme de construction : la restitution se fait pas à pas, et elle est
// corrigée. Correcteurs : correcteurs/cercle-circonscrit.ts.
// =========================

const LETTRES = "ABCDEFGHIJKLMNPRSTUVWXYZ".split("");
function lettres(k: number): string[] {
  return shuffle(LETTRES).slice(0, k);
}
const maj = (s: string) => s[0].toUpperCase() + s.slice(1);
/** Un triangle R S T, son centre K : des lettres tirées au sort. */
function triangleEtCentre() {
  const [a, b, c, o] = lettres(4);
  return { a, b, c, o, nom: `${a}${b}${c}` };
}
/**
 * Le triangle inscrit, avec les lettres de l'énoncé, une forme qui change, et
 * (si `rayon`) la longueur écrite sur le rayon [o s].
 */
function triangleInscritNomme(
  t: { a: string; b: string; c: string; o: string },
  opts: { rayon?: { vers: string; label: string } } = {},
): CercleCanvasData {
  const cx = 170;
  const cy = 155;
  const r = 95;
  const pos = (deg: number) => ({
    x: Math.round(cx + r * Math.cos((deg * Math.PI) / 180)),
    y: Math.round(cy - r * Math.sin((deg * Math.PI) / 180)),
  });
  const angles = [randomInt(190, 230), randomInt(310, 350), randomInt(70, 120)];
  const [A, B, C] = angles.map(pos);
  return {
    kind: "cercle",
    size: { width: 340, height: 310 },
    circle: { cx, cy, r, showCircle: true },
    points: [
      { id: t.a, x: A.x, y: A.y, label: t.a },
      { id: t.b, x: B.x, y: B.y, label: t.b },
      { id: t.c, x: C.x, y: C.y, label: t.c },
      { id: t.o, x: cx, y: cy, label: t.o, color: "#ef4444", highlight: true },
    ],
    segments: [
      { id: "c1", kind: "corde", from: t.a, to: t.b },
      { id: "c2", kind: "corde", from: t.b, to: t.c },
      { id: "c3", kind: "corde", from: t.c, to: t.a },
      ...[t.a, t.b, t.c].map((s) => ({
        id: `r${s}`,
        kind: "rayon" as const,
        from: t.o,
        to: s,
        dashed: !(opts.rayon && opts.rayon.vers === s),
        ...(opts.rayon && opts.rayon.vers === s ? { label: opts.rayon.label, highlight: true } : {}),
      })),
    ],
    display: { showLabels: true, showPoints: true, showCenter: true },
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
    // ⭐ 06/10 : lettres tirées au sort (triangle et centre), situations, tournures.
    generate: () => {
      const d = randomInt(3, 12);
      const T = triangleEtCentre();
      const { a, b, c, o } = T;
      const [x, y] = shuffle([a, b, c]).slice(0, 2);
      const p = pick(PRENOMS);
      const t = pick([
        `Le point ${o} est le point de concours des médiatrices du triangle ${T.nom}, et ${o}${x} = ${d} cm. Combien mesure ${o}${y} ?`,
        `Les médiatrices des côtés du triangle ${T.nom} se coupent en ${o}. On mesure ${o}${x} = ${d} cm. Que vaut ${o}${y} ?`,
        `${p.nom} trace les trois médiatrices du triangle ${T.nom} : elles se coupent en ${o}. ${p.f ? "Elle" : "Il"} mesure ${o}${x} = ${d} cm. Combien mesure ${o}${y} ?`,
        `Dans le triangle ${T.nom}, ${o} est sur les trois médiatrices. Sachant que ${o}${x} = ${d} cm, donne ${o}${y}.`,
      ]);
      return {
        text: t,
        format: "short",
        expected: [`${d} cm`, String(d)],
        comparator: "number_equal",
        explanation: expl(
          `${o} est sur les médiatrices des trois côtés, donc il est à égale distance des trois sommets : ${o}${a} = ${o}${b} = ${o}${c}. Comme ${o}${x} = ${d} cm, on a ${o}${y} = ${d} cm.`,
        ),
        canvas: triangleInscritNomme(T, { rayon: { vers: x, label: `${d} cm` } }),
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
    tags: ["cercle_circonscrit", "concourantes", "preuve", "template", "qcm"],
    // ⭐ 06/10 : la preuve se restitue PAS À PAS (cinq pas), lettres tirées au
    // sort. La question ouverte acceptait toute réponse contenant « médiatrice ».
    generate: () => {
      const { a, b, c, o, nom } = triangleEtCentre();
      const p = pick(PRENOMS);
      const intro = pick([
        `On démontre que les trois médiatrices du triangle ${nom} sont concourantes.`,
        `${p.nom} rédige la preuve : les médiatrices du triangle ${nom} sont concourantes.`,
        `Preuve, pour le triangle ${nom} : ses trois médiatrices passent par un même point.`,
      ]);
      const debut = `on appelle ${o} le point d’intersection des médiatrices de [${a}${b}] et de [${b}${c}]`;
      const PAS = [
        {
          q: `Par quoi commence la preuve ?`,
          bon: debut,
          faux: [`on suppose que les trois médiatrices se coupent en ${o}`, `on place ${o} au milieu de [${a}${c}]`, `on trace le cercle de centre ${o} qui passe par ${a}`],
          pourquoi: `On ne peut pas partir de ce qu’on veut démontrer : on part de DEUX médiatrices, qui se coupent en un point qu’on nomme ${o}.`,
        },
        {
          q: `${maj(debut)}. ${o} est sur la médiatrice de [${a}${b}]. Qu’en déduit-on ?`,
          bon: `${o}${a} = ${o}${b}`,
          faux: [`${o}${a} = ${o}${c}`, `${o}${b} = ${o}${c}`, `${o} est le milieu de [${a}${b}]`],
          pourquoi: `Tout point de la médiatrice de [${a}${b}] est à égale distance de ${a} et de ${b} : ${o}${a} = ${o}${b}.`,
        },
        {
          q: `${maj(debut)}. ${o} est sur la médiatrice de [${b}${c}]. Qu’en déduit-on ?`,
          bon: `${o}${b} = ${o}${c}`,
          faux: [`${o}${a} = ${o}${b}`, `${o}${a} = ${o}${c}`, `${o} est le milieu de [${b}${c}]`],
          pourquoi: `Tout point de la médiatrice de [${b}${c}] est à égale distance de ${b} et de ${c} : ${o}${b} = ${o}${c}.`,
        },
        {
          q: `On sait que ${o}${a} = ${o}${b} et que ${o}${b} = ${o}${c}. Qu’en déduit-on ?`,
          bon: `${o}${a} = ${o}${c}, donc ${o} est sur la médiatrice de [${a}${c}]`,
          faux: [`${o} est le milieu de [${a}${c}]`, `le triangle ${nom} est équilatéral`, `les médiatrices de [${a}${b}] et de [${b}${c}] sont parallèles`],
          pourquoi: `${o}${a} = ${o}${b} = ${o}${c}, donc ${o}${a} = ${o}${c} : ${o} est à égale distance de ${a} et de ${c}, il est donc sur la médiatrice de [${a}${c}].`,
        },
        {
          q: `Pourquoi ${o} est-il sur la médiatrice de [${a}${c}] ?`,
          bon: `parce que ${o} est à égale distance de ${a} et de ${c}`,
          faux: [`parce que ${o} est le milieu de [${a}${c}]`, `parce que [${a}${c}] est le plus grand côté`, `parce que ${o} est à l’intérieur du triangle`],
          pourquoi: `Un point à égale distance de ${a} et de ${c} est sur la médiatrice de [${a}${c}] : c’est la propriété de la médiatrice, utilisée dans l’autre sens.`,
        },
      ];
      const k = randomInt(0, PAS.length - 1);
      const s = PAS[k];
      // Aux pas 4 et 5, on rappelle d'où vient le point (sinon il tombe du ciel).
      const rappel = k >= 3 ? ` ${maj(debut)}.` : "";
      return {
        text: `${intro}${rappel} ${s.q}`,
        format: "qcm",
        choices: shuffle([s.bon, ...s.faux]),
        expected: [s.bon],
        comparator: "mcq_exact",
        explanation: expl(`${s.pourquoi} La preuve complète : ${debut} ; ${o}${a} = ${o}${b} ; ${o}${b} = ${o}${c} ; donc ${o}${a} = ${o}${c}, et ${o} est sur la médiatrice de [${a}${c}].`),
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
    // ⭐ 06/10 : QCM — le mot-clé « 2 » acceptait « 2 ou 3 », « 12 »…
    format: "qcm",
    choices: ["une", "deux", "trois", "aucune, le compas suffit"],
    expected: ["deux"],
    comparator: "mcq_exact",
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
    // ⭐ 06/10 : lettres tirées au sort ; le rayon donné, ou le diamètre.
    generate: () => {
      const r = randomInt(3, 11);
      const T = triangleEtCentre();
      const { o, nom } = T;
      const sommet = pick([T.a, T.b, T.c]);
      const p = pick(PRENOMS);
      const parDiametre = Math.random() < 0.35;
      const t = parDiametre
        ? pick([
            `Le cercle circonscrit au triangle ${nom} a pour centre ${o} et pour diamètre ${2 * r} cm. Combien mesure ${o}${sommet} ?`,
            `${p.nom} trace le cercle circonscrit au triangle ${nom} : centre ${o}, diamètre ${2 * r} cm. Quelle est la longueur ${o}${sommet} ?`,
          ])
        : pick([
            `Le cercle circonscrit au triangle ${nom} a pour centre ${o} et pour rayon ${r} cm. Combien mesure ${o}${sommet} ?`,
            `${p.nom} a tracé le cercle circonscrit au triangle ${nom}, de centre ${o}, avec un écart de compas de ${r} cm. Combien mesure ${o}${sommet} ?`,
            `Le cercle de centre ${o} et de rayon ${r} cm passe par les trois sommets du triangle ${nom}. Donne la longueur ${o}${sommet}.`,
          ]);
      return {
        text: t,
        format: "short",
        expected: [`${r} cm`, String(r)],
        comparator: "number_equal",
        explanation: expl(
          `${sommet} est un sommet du triangle, donc il est sur le cercle circonscrit : [${o}${sommet}] est un rayon${parDiametre ? `, la moitié du diamètre : ${2 * r} ÷ 2 = ${r} cm` : `, et ${o}${sommet} = ${r} cm`}.`,
        ),
        canvas: triangleInscritNomme(T, parDiametre ? {} : { rayon: { vers: sommet === T.a ? T.b : T.a, label: `${r} cm` } }),
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
    hint: "Deux médiatrices, leur point d'intersection, puis le compas ouvert jusqu'à un sommet.",
    tags: ["cercle_circonscrit", "construire", "template", "qcm"],
    // ⭐ 06/10 : le programme de construction se restitue étape par étape, et
    // ses deux « pourquoi » ; lettres tirées au sort. La question ouverte
    // acceptait toute réponse contenant « rayon ».
    generate: () => {
      const { a, b, c, o, nom } = triangleEtCentre();
      const p = pick(PRENOMS);
      // Les deux médiatrices forment UNE étape : l'une ou l'autre peut venir
      // en premier, les séparer donnerait deux bonnes réponses.
      const ETAPES = [
        `tracer les médiatrices de [${a}${b}] et de [${b}${c}]`,
        `appeler ${o} le point d’intersection de ces deux médiatrices`,
        `pointer le compas en ${o} et l’ouvrir jusqu’à ${a}`,
        `tracer le cercle de centre ${o} qui passe par ${a}`,
      ];
      const RANGS = ["la première", "la deuxième", "la troisième", "la dernière"];
      const cas = randomInt(0, 5);
      if (cas <= 3) {
        const k = cas;
        const t = pick([
          `${p.nom} construit le cercle circonscrit au triangle ${nom}. Quelle est ${RANGS[k]} étape ?`,
          `Programme de construction du cercle circonscrit au triangle ${nom} : quelle est ${RANGS[k]} étape ?`,
        ]);
        return {
          text: t,
          format: "qcm",
          choices: shuffle(ETAPES),
          expected: [ETAPES[k]],
          comparator: "mcq_exact",
          explanation: expl(`Le programme : ${ETAPES.map((e, i) => `${i + 1}) ${e}`).join(" ; ")}.`),
        };
      }
      if (cas === 4) {
        const bon = `parce que ${o}${a} = ${o}${b} = ${o}${c}`;
        return {
          text: pick([
            `${p.nom} trace le cercle de centre ${o} qui passe par ${a}. Pourquoi passe-t-il aussi par ${b} et par ${c} ?`,
            `Le cercle de centre ${o} passe par ${a}. Pourquoi est-on sûr qu’il passe aussi par ${b} et ${c} ?`,
          ]),
          format: "qcm",
          choices: shuffle([bon, `parce que ${o} est le milieu de [${b}${c}]`, `parce que le triangle ${nom} est équilatéral`, `parce qu’on a bien tenu le compas`]),
          expected: [bon],
          comparator: "mcq_exact",
          explanation: expl(`${o} est sur les trois médiatrices, donc à égale distance des trois sommets : ${o}${a} = ${o}${b} = ${o}${c}. Le cercle de rayon ${o}${a} passe donc par ${b} et ${c}.`),
          canvas: triangleInscritNomme({ a, b, c, o }),
        };
      }
      const bon = "parce que la troisième médiatrice passe forcément par leur point d’intersection";
      return {
        text: pick([
          `Pour trouver le centre du cercle circonscrit au triangle ${nom}, ${p.nom} ne trace que deux médiatrices. Pourquoi cela suffit-il ?`,
          `Pourquoi deux médiatrices suffisent-elles pour trouver le centre ${o} du cercle circonscrit au triangle ${nom} ?`,
        ]),
        format: "qcm",
        choices: shuffle([bon, "parce que la troisième médiatrice est toujours parallèle aux deux autres", `parce que le centre est toujours le milieu de [${a}${c}]`, "parce que deux droites ne se coupent jamais"]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: expl("On a démontré que les trois médiatrices d’un triangle sont concourantes : la troisième passe par le point d’intersection des deux premières. La tracer ne sert qu’à vérifier."),
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
    // ⭐ 06/10 : lettres tirées au sort ; en situation (puits, lampadaire,
    // arroseur à égale distance de trois points), en mètres.
    generate: () => {
      const T = triangleEtCentre();
      const { o, nom } = T;
      const s = pick([T.a, T.b, T.c]);
      const p = pick(PRENOMS);
      if (Math.random() < 0.5) {
        const r = randomInt(4, 12);
        const t = pick([
          `Le centre ${o} du cercle circonscrit au triangle ${nom} vérifie ${o}${s} = ${r} cm. Quel est le diamètre de ce cercle ?`,
          `${o} est le point de concours des médiatrices du triangle ${nom}, et ${o}${s} = ${r} cm. Quel est le diamètre du cercle circonscrit ?`,
        ]);
        return {
          text: t,
          format: "short",
          expected: [`${2 * r} cm`, String(2 * r)],
          comparator: "number_equal",
          explanation: expl(
            `${o}${s} est un rayon du cercle circonscrit, donc le rayon vaut ${r} cm. Le diamètre est le double du rayon : 2 × ${r} = ${2 * r} cm.`,
          ),
          canvas: triangleInscritNomme(T, { rayon: { vers: s, label: `${r} cm` } }),
        };
      }
      const sit = pick([
        { quoi: "un puits", trois: "trois maisons", chacun: "chacune" },
        { quoi: "un lampadaire", trois: "trois bancs", chacun: "chacun" },
        { quoi: "un arroseur", trois: "trois arbres", chacun: "chacun" },
        { quoi: "une antenne", trois: "trois villages", chacun: "chacun" },
        { quoi: "une table de pique-nique", trois: "trois tentes", chacun: "chacune" },
      ]);
      const r = sit.trois === "trois villages" ? randomInt(2, 9) : randomInt(5, 30);
      const u = sit.trois === "trois villages" ? "km" : "m";
      const t = pick([
        `${sit.quoi[0].toUpperCase()}${sit.quoi.slice(1)} est placé${sit.quoi.startsWith("une") ? "e" : ""} en ${o}, à égale distance de ${sit.trois} ${T.a}, ${T.b} et ${T.c}. ${o}${s} = ${r} ${u}. Quel est le diamètre du cercle qui passe par ${T.a}, ${T.b} et ${T.c} ?`,
        `${p.nom} repère ${sit.trois} ${T.a}, ${T.b} et ${T.c}, et ${sit.quoi} en ${o} à ${r} ${u} de ${sit.chacun}. Quel est le diamètre du cercle de centre ${o} qui passe par ${T.a}, ${T.b} et ${T.c} ?`,
      ]);
      return {
        text: t,
        format: "short",
        expected: [`${2 * r} ${u}`, String(2 * r)],
        comparator: "number_equal",
        explanation: expl(`${o} est à ${r} ${u} des trois points : c’est le centre de leur cercle circonscrit, de rayon ${r} ${u}. Diamètre : 2 × ${r} = ${2 * r} ${u}.`),
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
    tags: ["cercle_circonscrit", "defi", "template", "qcm"],
    // ⭐ 06/10 : la question ouverte à mots-clés devient trois défis en QCM,
    // lettres et situations tirées au sort : où placer le point à égale
    // distance de trois lieux ; trois points alignés ; deux lieux seulement.
    generate: () => {
      const [a, b, c] = lettres(3);
      const p = pick(PRENOMS);
      const sit = pick([
        { quoi: "un puits", trois: "maisons", f: true },
        { quoi: "une antenne", trois: "villages", f: false },
        { quoi: "un lampadaire", trois: "bancs", f: false },
        { quoi: "une fontaine", trois: "arbres", f: false },
        { quoi: "le ballon", trois: "joueurs", f: false },
        { quoi: "une table de pique-nique", trois: "tentes", f: true },
      ]);
      const alignes = sit.f ? "alignées" : "alignés";
      const le = sit.quoi.startsWith("une") ? "la" : "le";
      const cas = randomInt(0, 2);
      if (cas === 0) {
        const bon = `au point de concours des médiatrices du triangle ${a}${b}${c}`;
        const t = pick([
          `Les ${sit.trois} ${a}, ${b} et ${c} ne sont pas ${alignes}. On veut placer ${sit.quoi} à égale distance des trois. Où ?`,
          `${p.nom} veut mettre ${sit.quoi} à la même distance des ${sit.trois} ${a}, ${b} et ${c}, qui ne sont pas ${alignes}. Où doit-${p.f ? "elle" : "il"} ${le} placer ?`,
        ]);
        return {
          text: t,
          format: "qcm",
          choices: shuffle([bon, `au milieu de [${a}${c}]`, `n’importe où sur la médiatrice de [${a}${b}]`, "aucun endroit ne convient"]),
          expected: [bon],
          comparator: "mcq_exact",
          explanation: expl(`Le seul point à égale distance de ${a}, ${b} et ${c} est le point de concours des médiatrices du triangle ${a}${b}${c} : le centre de son cercle circonscrit. Une seule médiatrice ne donne l’égalité que pour deux des trois.`),
        };
      }
      if (cas === 1) {
        const bon = "non : les médiatrices sont parallèles et ne se coupent pas";
        const t = pick([
          `Les ${sit.trois} ${a}, ${b} et ${c} sont ${alignes}. Peut-on placer ${sit.quoi} à égale distance des trois ?`,
          `${p.nom} remarque que ${a}, ${b} et ${c} sont alignés. Existe-t-il un cercle qui passe par les trois ?`,
        ]);
        return {
          text: t,
          format: "qcm",
          choices: shuffle([bon, `oui : au milieu de [${a}${c}]`, "oui : il suffit de prendre un cercle assez grand", `oui, mais seulement si ${b} est le milieu de [${a}${c}]`]),
          expected: [bon],
          comparator: "mcq_exact",
          explanation: expl(`${a}, ${b} et ${c} sont sur une même droite : les médiatrices de [${a}${b}] et de [${b}${c}] sont perpendiculaires à cette droite, donc parallèles. Elles ne se coupent pas : aucun point n’est à égale distance des trois.`),
        };
      }
      const bon = `tous les points de la médiatrice de [${a}${b}]`;
      const t = pick([
        `Il n’y a que deux ${sit.trois}, ${a} et ${b}. Quels endroits sont à égale distance des deux ?`,
        `${p.nom} cherche où placer ${sit.quoi} à égale distance de deux ${sit.trois} seulement, ${a} et ${b}. Quels endroits conviennent ?`,
      ]);
      return {
        text: t,
        format: "qcm",
        choices: shuffle([bon, `seulement le milieu de [${a}${b}]`, "aucun endroit", `seulement les points du segment [${a}${b}]`]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: expl(`Avec deux points seulement, tous les points de la médiatrice de [${a}${b}] sont à égale distance de ${a} et de ${b} : il y en a une infinité. Il faut un troisième point pour n’en garder qu’un.`),
      };
    },
  },
];

// `shuffle` sert aux gabarits à choix multiples ; il reste ici pour la symétrie
// avec les autres banques du niveau.
void shuffle;
