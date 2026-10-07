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
import { PRENOMS, pick, de, il, Il, nf, avecUnite, deuxPrenoms, type Prenom } from "./aires.bank";

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

// ═══════════════════════════════════════════════════════════════════════════
// ⭐ 06/10/2026 — DES SITUATIONS, PAS UNE PHRASE. Mesuré le 05/10 : 6 à 12
// squelettes par micro, 11 à 18 répétitions sur 20. Les points changent de
// nom (pas toujours A et B), les situations (corde, pont, carte, cour…) et
// les prénoms aussi ; les canvas portent les MÊMES lettres que le texte.
// Unité dans la réponse (« 6 cm »), division « ÷ ». Correcteurs :
// correcteurs/distances.ts.
// ═══════════════════════════════════════════════════════════════════════════

/** Lettres de points : pas de I, O, Q, W (on les confond), ni les lettres des milieux. */
const LETTRES = "ABCDEFGHLNPRSTUVXYZ".split("");
const LETTRES_MILIEU = ["M", "K", "J", "I"];
function lettres(n: number, exclure: string[] = []): string[] {
  const pris: string[] = [];
  while (pris.length < n) {
    const x = pick(LETTRES);
    if (!pris.includes(x) && !exclure.includes(x)) pris.push(x);
  }
  return pris;
}

// ─── distance_definition ────────────────────────────────────────────────────

function genDistanceNotation() {
  const [P, Q] = lettres(2);
  const n = pick(PRENOMS);
  const u = pick(["cm", "cm", "cm", "m", "km"]);
  const d = u === "km" ? randomInt(2, 40) : u === "m" ? randomInt(2, 30) : randomInt(2, 15) + pick([0, 0, 0.5]);
  const D = `${nf(d)} ${u}`;
  const situation =
    u === "cm"
      ? pick([
          `Sur son cahier, ${n.nom} trace le segment [${P}${Q}]. Il mesure ${D}.`,
          `${n.nom} mesure la distance entre les points ${P} et ${Q} : ${D}.`,
          `Le segment [${P}${Q}] mesure ${D}.`,
        ])
      : u === "m"
        ? pick([
            `Dans la cour, ${n.nom} trace à la craie un segment [${P}${Q}] de ${D}.`,
            `Au stade, ${n.nom} court en ligne droite du plot ${P} au plot ${Q} : ${D}.`,
          ])
        : pick([
            `À vol d’oiseau, le village ${P} et le village ${Q} sont à ${D} l’un de l’autre.`,
            `${n.nom} regarde une carte : la distance entre la ville ${P} et la ville ${Q} est ${D}.`,
          ]);
  if (Math.random() < 0.6) {
    const bonne = `${P}${Q} = ${D}`;
    return {
      text: `${situation} ${pick(["Quelle écriture est correcte ?", "Comment écrire cette information ?", "Laquelle de ces égalités est juste ?"])}`,
      format: "qcm" as const,
      choices: shuffle([bonne, `[${P}${Q}] = ${D}`, `(${P}${Q}) = ${D}`, `${P}${Q} = [${D}]`]),
      expected: [bonne],
      comparator: "mcq_exact" as const,
      explanation: expl(`[${P}${Q}] est le segment, un objet ; (${P}${Q}) est la droite. Leur longueur, un NOMBRE, se note ${P}${Q} sans crochets : ${P}${Q} = ${D}.`),
    };
  }
  // Que désigne cette écriture ?
  const sens = [
    { ecr: `(${P}${Q})`, rep: `la droite qui passe par ${P} et ${Q}` },
    { ecr: `[${P}${Q}]`, rep: `le segment d’extrémités ${P} et ${Q}` },
    { ecr: `${P}${Q}`, rep: `la longueur du segment [${P}${Q}]` },
    { ecr: `[${P}${Q})`, rep: `la demi-droite d’origine ${P} qui passe par ${Q}` },
  ];
  const s = pick(sens);
  return {
    text: `${n.nom} lit l’écriture « ${s.ecr} » dans son cahier. ${pick(["Que désigne cette écriture ?", "Que veut dire cette écriture ?", "Quel objet, ou quelle mesure, cette écriture désigne-t-elle ?"])}`,
    format: "qcm" as const,
    choices: shuffle(sens.map((x) => x.rep)),
    expected: [s.rep],
    comparator: "mcq_exact" as const,
    explanation: expl(`(${P}${Q}) est une droite, [${P}${Q}] un segment, [${P}${Q}) une demi-droite : trois dessins. ${P}${Q} sans rien autour est un nombre, la longueur du segment. Ici « ${s.ecr} » désigne ${s.rep}.`),
  };
}

/**
 * ⛔ 06/10/2026 — LES ANCIENNES QUESTIONS OUVERTES DEVIENNENT DES QCM. En
 * « contains_keyword », le seul mot « segment » validait n'importe quelle
 * réponse. Même raisonnement, même pièges, mais une explication à CHOISIR.
 * Les lettres et la personne changent à chaque tirage.
 */
type CasRaisonnement = {
  q: (P: string, Q: string, R: string, n: Prenom) => string;
  bonne: (P: string, Q: string, R: string) => string;
  pieges: (P: string, Q: string, R: string) => string[];
  r: (P: string, Q: string, R: string) => string;
};
function genDistanceOuverte(cas: CasRaisonnement[]) {
  const [P, Q, R] = lettres(3);
  const n = pick(PRENOMS);
  const c = pick(cas);
  const bonne = c.bonne(P, Q, R);
  return {
    text: c.q(P, Q, R, n),
    format: "qcm" as const,
    choices: shuffle([bonne, ...c.pieges(P, Q, R)]),
    expected: [bonne],
    comparator: "mcq_exact" as const,
    explanation: expl(c.r(P, Q, R)),
  };
}

const OUVERTES_DEFINITION: CasRaisonnement[] = [
  {
    q: (P, Q, _R, n) => pick([`Quelle est la différence entre (${P}${Q}), [${P}${Q}] et ${P}${Q} ?`, `${n.nom} confond (${P}${Q}), [${P}${Q}] et ${P}${Q}. Quelle explication est juste ?`]),
    bonne: (P, Q) => `(${P}${Q}) est une droite, [${P}${Q}] un segment, ${P}${Q} une longueur (un nombre)`,
    pieges: (P, Q) => [
      `(${P}${Q}) est un segment, [${P}${Q}] une droite, ${P}${Q} une longueur (un nombre)`,
      `(${P}${Q}) est une longueur, [${P}${Q}] un segment, ${P}${Q} une droite`,
      `les trois écritures désignent le même segment`,
    ],
    r: (P, Q) => `(${P}${Q}) est la DROITE qui passe par ${P} et ${Q} : elle se prolonge des deux côtés. [${P}${Q}] est le SEGMENT : le morceau limité par ${P} et par ${Q}. ${P}${Q} est la LONGUEUR de ce segment, c'est-à-dire un nombre. Deux dessins et une mesure.`,
  },
  {
    q: (P, Q, _R, n) => `${n.nom} a écrit « [${P}${Q}] = 7 cm ». Pourquoi est-ce faux ?`,
    bonne: (P, Q) => `[${P}${Q}] est un segment, pas un nombre : il faut écrire ${P}${Q} = 7 cm`,
    pieges: (P, Q) => [`il faut écrire (${P}${Q}) = 7 cm`, `il faut écrire [${P}${Q}] = 7, sans unité`, `ce n’est pas faux, on peut l’écrire ainsi`],
    r: (P, Q) => `[${P}${Q}] est un objet géométrique, un segment : il ne peut pas être égal à un nombre. C'est sa longueur qui mesure 7 cm, et elle se note ${P}${Q} sans crochets. On écrit ${P}${Q} = 7 cm.`,
  },
  {
    q: (P, Q, R, n) => `${n.nom} veut aller de ${P} à ${Q} en passant par ${R}. Pourquoi ce chemin n’est-il jamais plus court que le segment [${P}${Q}] ?`,
    bonne: (P, Q, R) => `le segment [${P}${Q}] est le plus court chemin de ${P} à ${Q} : passer par ${R} fait un détour, ou au mieux la même longueur`,
    pieges: (P, Q, R) => [`parce que ${R} est toujours loin du segment [${P}${Q}]`, `c’est faux : passer par ${R} peut être plus court`, `parce que ${P}${R} est toujours égal à ${R}${Q}`],
    r: (P, Q, R) => `Tout chemin qui passe ailleurs fait un détour, et un détour rallonge. En 6e on l'admet, et on en tire une conséquence qui sert toute l'année : pour tout point ${R}, ${P}${R} + ${R}${Q} est supérieur ou égal à ${P}${Q}, avec égalité seulement si ${R} est sur le segment [${P}${Q}].`,
  },
];

// ─── distance_milieu ────────────────────────────────────────────────────────
// Une situation, puis la donnée écrite comme en classe : « M est le milieu de
// [AB] » et une longueur.
const SITUATIONS_MILIEU: { u: string; lo: number; hi: number; phrase: (n: Prenom, A: string, B: string, M: string) => string }[] = [
  { u: "cm", lo: 4, hi: 24, phrase: (n, A, B, M) => `Sur son cahier, ${n.nom} trace un segment [${A}${B}]. ${Il(n)} place le point ${M}, milieu de [${A}${B}].` },
  { u: "m", lo: 4, hi: 30, phrase: (n, A, B, M) => `${n.nom} tend une corde entre deux piquets ${A} et ${B}. ${Il(n)} fait un nœud en ${M}, le milieu de [${A}${B}].` },
  { u: "m", lo: 10, hi: 80, phrase: (n, A, B, M) => `Un pont relie la rive ${A} à la rive ${B}. ${n.nom} s’arrête en ${M}, le milieu de [${A}${B}].` },
  { u: "km", lo: 6, hi: 40, phrase: (n, A, B, M) => `${n.nom} fait une randonnée en ligne droite du village ${A} au village ${B}. Le refuge ${M} est le milieu de [${A}${B}].` },
  { u: "cm", lo: 10, hi: 30, phrase: (n, A, B, M) => `${n.nom} pose sa règle de ${A} à ${B} et marque le point ${M}, milieu de [${A}${B}].` },
  { u: "m", lo: 20, hi: 100, phrase: (n, A, B, M) => `Au stade, ${n.nom} court en ligne droite du plot ${A} au plot ${B}. Le plot ${M} est le milieu de [${A}${B}].` },
  { u: "dm", lo: 6, hi: 30, phrase: (n, A, B, M) => `${n.nom} veut scier une planche [${A}${B}] en deux morceaux égaux. ${Il(n)} trace le point ${M}, milieu de [${A}${B}].` },
  { u: "cm", lo: 6, hi: 20, phrase: (n, A, B, M) => `${n.nom} plie une bande de papier [${A}${B}] pour amener ${A} sur ${B}. Le pli passe par ${M}, le milieu de [${A}${B}].` },
  { u: "m", lo: 6, hi: 40, phrase: (n, A, B, M) => `Dans le jardin, une allée droite va du portail ${A} à la porte ${B}. ${n.nom} plante un arbre en ${M}, le milieu de [${A}${B}].` },
];

function genDistanceMilieu(etoile: 1 | 2) {
  const s = pick(SITUATIONS_MILIEU);
  const n = pick(PRENOMS);
  const [A, B] = lettres(2);
  const M = pick(LETTRES_MILIEU);
  // À une étoile, le segment est pair : la moitié tombe juste.
  let total = randomInt(s.lo, s.hi);
  if (etoile === 1 && total % 2) total += 1;
  const demi = total / 2;
  const versLeTout = etoile === 2 && Math.random() < 0.5;
  const [x, y] = Math.random() < 0.5 ? [A, M] : [M, B];
  const donnee = versLeTout ? `${x}${y} = ${nf(demi)} ${s.u}` : `${A}${B} = ${nf(total)} ${s.u}`;
  const cherche = versLeTout ? `${A}${B}` : pick([`${A}${M}`, `${M}${B}`, `${M}${A}`, `${B}${M}`]);
  const r = versLeTout ? total : demi;
  const question = pick([`Combien mesure ${cherche} ?`, `Quelle est la longueur ${cherche} ?`, `Calcule ${cherche}.`]);
  return {
    text: `${s.phrase(n, A, B, M)} On sait que ${donnee}. ${question}`,
    format: "short" as const,
    expected: avecUnite(r, s.u),
    comparator: "number_equal" as const,
    explanation: expl(
      versLeTout
        ? `${M} est le milieu de [${A}${B}] : ${A}${M} = ${M}${B}. Le segment entier vaut deux moitiés : ${A}${B} = 2 × ${nf(demi)} = ${nf(total)} ${s.u}.`
        : `${M} est le milieu de [${A}${B}] : il coupe le segment en deux longueurs égales. ${cherche} = ${nf(total)} ÷ 2 = ${nf(demi)} ${s.u}.`
    ),
    canvas: segment(A, B, { milieu: { label: M, sur: true } }),
  };
}

/** ★3 : est-ce le milieu ? Il faut les DEUX conditions : sur le segment, et à égale distance. */
function genDistanceEstMilieu() {
  const n = pick(PRENOMS);
  const [A, B] = lettres(2);
  const P = pick(LETTRES_MILIEU);
  const u = pick(["cm", "m"]);
  const d = randomInt(2, 15);
  const cas = pick(["oui", "oui", "inegal", "hors"] as const);
  const e = cas === "inegal" ? d + pick([1, 2, 3]) : d;
  const position =
    cas === "hors"
      ? pick([`${n.nom} place un point ${P} au-dessus du segment [${A}${B}], hors de la droite (${A}${B}).`, `${n.nom} dessine un triangle ${A}${B}${P}.`])
      : pick([`${n.nom} place un point ${P} sur le segment [${A}${B}].`, `Les points ${A}, ${P} et ${B} sont alignés dans cet ordre : ${P} est sur le segment [${A}${B}].`]);
  const oui = `oui : ${P} est sur [${A}${B}] et ${P}${A} = ${P}${B}`;
  const nonInegal = `non : ${P}${A} et ${P}${B} ne sont pas égales`;
  const nonHors = `non : ${P} n’est pas sur le segment [${A}${B}]`;
  const jamais = "on ne peut pas savoir";
  const juste = cas === "oui" ? oui : cas === "inegal" ? nonInegal : nonHors;
  return {
    text: `${position} ${P}${A} = ${e} ${u} et ${P}${B} = ${d} ${u}. ${P} est-il le milieu de [${A}${B}] ?`,
    format: "qcm" as const,
    choices: shuffle([oui, nonInegal, nonHors, jamais]),
    expected: [juste],
    comparator: "mcq_exact" as const,
    explanation: expl(
      `Le milieu de [${A}${B}] doit être SUR le segment ET à égale distance de ${A} et de ${B}. ${cas === "oui" ? `Ici les deux conditions sont vraies.` : cas === "inegal" ? `Ici ${e} ≠ ${d} : les deux longueurs ne sont pas égales.` : `Ici ${P}${A} = ${P}${B}, mais ${P} n’est pas sur le segment : il est sur la médiatrice, pas au milieu.`}`
    ),
  };
}

const OUVERTES_MILIEU: CasRaisonnement[] = [
  {
    q: (A, B, _R, n) => `${n.nom} dit : « M est à la même distance de ${A} et de ${B}, donc c’est le milieu de [${A}${B}]. » Est-ce sûr ?`,
    bonne: (A, B) => `pas forcément : il faut aussi que M soit sur le segment [${A}${B}]`,
    pieges: (A, B) => [`oui : M${A} = M${B} suffit toujours`, `non : le milieu n’est jamais à égale distance de ${A} et de ${B}`, `oui, si M${A} et M${B} sont des nombres entiers`],
    r: (A, B) => `Tous les points à égale distance de ${A} et de ${B} forment une droite entière : la médiatrice de [${A}${B}]. Un seul de ces points appartient au segment, et c'est lui le milieu. Il faut donc les deux conditions : M sur [${A}${B}], et M${A} = M${B}.`,
  },
  {
    q: (A, B, _R, n) => `${n.nom} n’a pas de règle graduée. Comment peut-${il(n)} placer le milieu de [${A}${B}] ?`,
    bonne: (A, B) => `avec un compas : deux arcs de même rayon depuis ${A} et depuis ${B}, puis on joint leurs points d’intersection`,
    pieges: (A, B) => [`on le place à l’œil, au milieu du dessin`, `on trace un cercle de centre ${A} qui passe par ${B}`, `c’est impossible sans règle graduée`],
    r: (A, B) => `Avec le même écartement de compas, on trace des arcs depuis ${A} puis depuis ${B} : ils se coupent en deux points, à égale distance de ${A} et de ${B}. La droite qui les joint coupe [${A}${B}] en son milieu. Le pliage marche aussi : on amène ${A} sur ${B}, et le pli passe par le milieu.`,
  },
  {
    q: (A, B, _R, n) => `${n.nom} se demande combien le segment [${A}${B}] a de milieux. Que lui répondre ?`,
    bonne: () => `un seul`,
    pieges: (A, B) => [`deux : un près de ${A} et un près de ${B}`, `une infinité`, `cela dépend de la longueur ${A}${B}`],
    r: (A, B) => `La médiatrice de [${A}${B}] est une droite ; elle coupe le segment [${A}${B}] en un seul point. Il n'y a donc qu'un point à la fois sur le segment et à égale distance des extrémités.`,
  },
];

// ─── distance_inegalite ─────────────────────────────────────────────────────
const LIEUX_TRAJET: { u: string; lo: number; hi: number; phrase: (n: Prenom, A: string, B: string, C: string) => string }[] = [
  { u: "m", lo: 150, hi: 900, phrase: (n, A, B, C) => `La maison ${de(n.nom)} est au point ${A}, l’école au point ${B} et la boulangerie au point ${C}.` },
  { u: "km", lo: 3, hi: 30, phrase: (_n, A, B, C) => `Trois villages sont placés aux points ${A}, ${B} et ${C}.` },
  { u: "m", lo: 5, hi: 40, phrase: (n, A, B, C) => `Dans le parc, ${n.nom} repère trois arbres : ${A}, ${B} et ${C}.` },
  { u: "cm", lo: 3, hi: 12, phrase: (n, A, B, C) => `Sur son cahier, ${n.nom} place trois points ${A}, ${B} et ${C}.` },
  { u: "km", lo: 2, hi: 15, phrase: (n, A, B, C) => `En vélo, ${n.nom} part du camping ${A} pour aller au lac ${B}. ${Il(n)} peut passer par la ferme ${C}.` },
  { u: "m", lo: 20, hi: 120, phrase: (n, A, B, C) => `Au stade, ${n.nom} pose trois plots ${A}, ${B} et ${C}.` },
];

function tirerTrajet() {
  const l = pick(LIEUX_TRAJET);
  const n = pick(PRENOMS);
  const [A, B, C] = lettres(3);
  const ac = randomInt(l.lo, l.hi);
  const cb = randomInt(l.lo, l.hi);
  const aligne = Math.random() < 0.5;
  // Sans alignement, AB reste plus grand que |AC − CB| : le triangle existe.
  const ab = aligne ? ac + cb : randomInt(Math.max(Math.abs(ac - cb) + 1, Math.ceil((ac + cb) * 0.6)), ac + cb - 1);
  return { l, n, A, B, C, ac, cb, ab, aligne };
}

function genDistanceInegalite() {
  const { l, n, A, B, C, ac, cb, ab, aligne } = tirerTrajet();
  const donnees = shuffle([`${A}${C} = ${ac} ${l.u}`, `${C}${B} = ${cb} ${l.u}`, `${A}${B} = ${ab} ${l.u}`]).join(", ").replace(/, ([^,]*)$/, " et $1");
  const forme = pick(["segment", "alignes", "detour", "longueur"] as const);
  const intro = `${l.phrase(n, A, B, C)} On sait que ${donnees}.`;
  const expliq = aligne
    ? `${A}${C} + ${C}${B} = ${ac} + ${cb} = ${ac + cb} = ${A}${B} : il y a égalité, donc ${C} est sur le segment [${A}${B}].`
    : `${A}${C} + ${C}${B} = ${ac} + ${cb} = ${ac + cb}, plus grand que ${A}${B} = ${ab} : pas d’égalité, ${C} n’est pas sur le segment [${A}${B}].`;
  if (forme === "longueur") {
    return {
      text: `${intro} De combien le trajet ${A} → ${C} → ${B} est-il plus long que le trajet direct de ${A} à ${B} ?`,
      format: "short" as const,
      expected: avecUnite(ac + cb - ab, l.u),
      comparator: "number_equal" as const,
      explanation: expl(`Trajet par ${C} : ${ac} + ${cb} = ${ac + cb} ${l.u}. Trajet direct : ${ab} ${l.u}. Différence : ${ac + cb} − ${ab} = ${ac + cb - ab} ${l.u}.${aligne ? ` Les points sont alignés : le détour est nul, ${C} est sur le segment [${A}${B}].` : ""}`),
    };
  }
  const q =
    forme === "segment"
      ? `Le point ${C} appartient-il au segment [${A}${B}] ?`
      : forme === "alignes"
        ? `Les points ${A}, ${B} et ${C} sont-ils alignés ?`
        : `Passer par ${C} pour aller de ${A} à ${B}, est-ce un détour ?`;
  const oui = forme === "detour" ? !aligne : aligne;
  return {
    text: `${intro} ${q}`,
    format: "qcm" as const,
    choices: shuffle(["oui", "non"]),
    expected: [oui ? "oui" : "non"],
    comparator: "mcq_exact" as const,
    explanation: expl(expliq),
  };
}

const OUVERTES_INEGALITE: CasRaisonnement[] = [
  {
    q: (A, B, C, n) => pick([`Peut-on avoir ${A}${C} + ${C}${B} plus petit que ${A}${B} ?`, `${n.nom} pense qu’en passant par ${C}, le trajet de ${A} à ${B} peut être plus court qu’en ligne droite. A-t-${il(n)} raison ?`]),
    bonne: (A, B, C) => `non : [${A}${B}] est le plus court chemin de ${A} à ${B}, donc ${A}${C} + ${C}${B} est au moins égal à ${A}${B}`,
    pieges: (A, B, C) => [`oui, si ${C} est tout près de [${A}${B}]`, `oui, si ${C} est le milieu de [${A}${B}]`, `on ne peut pas savoir sans mesurer`],
    r: (A: string, B: string, C: string) => `Le segment [${A}${B}] est le plus court chemin de ${A} à ${B}. Le trajet ${A} → ${C} → ${B} est un chemin de ${A} à ${B} lui aussi : il ne peut donc pas être plus court. Au mieux il est aussi court, et c'est le cas quand ${C} est posé sur [${A}${B}].`,
  },
  {
    q: (A, B, C, n) => `${n.nom} connaît les distances ${A}${B}, ${A}${C} et ${C}${B}, mais n’a pas de dessin. Comment savoir si ${A}, ${B} et ${C} sont alignés ?`,
    bonne: () => `on regarde si la plus grande distance est égale à la somme des deux autres`,
    pieges: (A, B) => [`on regarde si deux des distances sont égales`, `on regarde si ${A}${B} est la plus grande distance`, `c’est impossible sans dessin`],
    r: (A: string, B: string, C: string) => `On regarde si l'une des trois distances est la somme des deux autres. Si ${A}${C} + ${C}${B} = ${A}${B}, alors ${C} est sur le segment [${A}${B}], donc les trois points sont alignés. Si la somme est strictement plus grande, il y a un détour : ils ne le sont pas.`,
  },
  {
    q: (A, B, C, n) => `${n.nom} affirme : « si ${A}${C} + ${C}${B} est plus grand que ${A}${B}, alors ${C} est loin du segment [${A}${B}]. » Qu’en penses-tu ?`,
    bonne: (A, B, C) => `c’est faux : ${C} peut être tout près de [${A}${B}] ; on sait seulement qu’il n’est pas dessus`,
    pieges: (A, B, C) => [`c’est vrai : « plus grand » veut dire « loin »`, `c’est vrai, mais seulement si ${A}${B} est grand`, `c’est faux : ${C} est alors sur [${A}${B}]`],
    r: (A: string, B: string, C: string) => `C'est trop fort. Dès que ${C} n'est pas sur [${A}${B}], la somme dépasse ${A}${B} — même si ${C} n'en est qu'à un millimètre. L'inégalité dit que ${C} n'est PAS sur le segment ; elle ne dit rien de la distance à laquelle il se trouve. C'est l'écart entre ${A}${C} + ${C}${B} et ${A}${B} qui grandit quand ${C} s'éloigne.`,
  },
];

// ─── distance_defi ──────────────────────────────────────────────────────────
// Deux milieux emboîtés : M milieu de [AB], N milieu de [AM] ou de [MB].
function genDistanceDefiMilieux() {
  const n = pick(PRENOMS);
  const [A, B] = lettres(2);
  const [M, N] = shuffle(LETTRES_MILIEU).slice(0, 2);
  const u = pick(["cm", "m", "km"]);
  const quart = u === "cm" ? randomInt(1, 6) : randomInt(2, 15);
  const ab = 4 * quart;
  const coteA = Math.random() < 0.5;
  // Abscisses : A = 0, B = 4 quarts ; M = 2 ; N = 1 (milieu de [AM]) ou 3 (de [MB]).
  const pos: Record<string, number> = { [A]: 0, [B]: 4, [M]: 2, [N]: coteA ? 1 : 3 };
  const [X, Y] = pick([
    [N, B],
    [A, N],
    [N, M],
    [B, N],
  ]);
  const r = Math.abs(pos[X] - pos[Y]) * quart;
  const second = coteA ? `[${A}${M}]` : `[${M}${B}]`;
  const intros: [string[], string][] = [
    [["cm", "m", "km"], `${M} est le milieu de [${A}${B}] et ${N} est le milieu de ${second}.`],
    [["cm"], `${n.nom} trace un segment [${A}${B}]. ${Il(n)} place ${M}, le milieu de [${A}${B}], puis ${N}, le milieu de ${second}.`],
    [["km"], `Sur une route droite, le village ${M} est le milieu de [${A}${B}] et la fontaine ${N} est le milieu de ${second}.`],
    [["m"], `${n.nom} tend une corde du piquet ${A} au piquet ${B}. ${Il(n)} fait un nœud en ${M}, le milieu de [${A}${B}], puis un autre en ${N}, le milieu de ${second}.`],
    [["m"], `Au stade, ${n.nom} pose un plot en ${M}, le milieu de [${A}${B}], puis un autre en ${N}, le milieu de ${second}.`],
  ];
  const intro = pick(intros.filter(([us]) => us.includes(u)).map(([, s]) => s));
  return {
    text: `${intro} ${A}${B} = ${ab} ${u}. ${pick([`Combien mesure ${X}${Y} ?`, `Calcule ${X}${Y}.`, `Quelle est la longueur ${X}${Y} ?`])}`,
    format: "short" as const,
    expected: avecUnite(r, u),
    comparator: "number_equal" as const,
    explanation: expl(
      `${A}${M} = ${M}${B} = ${ab} ÷ 2 = ${2 * quart} ${u}. ${N} coupe ${second} en deux : chaque morceau mesure ${2 * quart} ÷ 2 = ${quart} ${u}. En comptant les morceaux de ${quart} ${u} entre ${X} et ${Y} : ${X}${Y} = ${r} ${u}.`
    ),
  };
}

const OUVERTES_DEFI: CasRaisonnement[] = [
  {
    q: (A, B, C, n) => `Pour aller de ${A} à ${B}, ${n.nom} fait un tout petit détour par ${C}. Comparé au trajet direct, ce chemin est…`,
    bonne: (A, B, C) => `au moins aussi long : il n’est égal que si ${C} est sur [${A}${B}]`,
    pieges: () => [`plus court, puisque le détour est tout petit`, `toujours deux fois plus long`, `plus court ou plus long selon le sens du trajet`],
    r: (A: string, B: string) => `Parce que le trajet direct, le segment [${A}${B}], est le plus court de tous les chemins de ${A} à ${B}. Tout autre chemin, aussi proche soit-il du segment, ne peut donc pas être plus court. Il est égal seulement s'il se confond avec le segment.`,
  },
  {
    q: (A, B, C, n) => `Le GPS ${de(n.nom)} annonce 33 km entre les villes ${A} et ${B}, mais 37 km en passant par la ville ${C}. Que peut-on dire de ${C} ?`,
    bonne: (A, B) => `elle n’est pas sur le segment [${A}${B}] : les trois villes ne sont pas alignées`,
    pieges: (A, B) => [`elle est sur le segment [${A}${B}]`, `elle est au milieu de [${A}${B}]`, `on ne peut rien dire sans carte`],
    r: (A: string, B: string, C: string) => `Le trajet par ${C} dépasse le trajet direct de 4 km : ${C} n'est donc pas sur la ligne droite qui joint ${A} et ${B}. Si elle l'était, les deux distances seraient égales. Les trois villes ne sont pas alignées.`,
  },
  {
    q: (A, B, _C, n) => `${n.nom} veut partager le segment [${A}${B}] en quatre parts égales, avec un compas. Comment faire ?`,
    bonne: (A, B) => `construire le milieu M de [${A}${B}], puis le milieu de [${A}M] et celui de [M${B}]`,
    pieges: (A, B) => [`tracer quatre arcs de cercle depuis ${A}`, `construire le milieu de [${A}${B}], et s’arrêter là`, `tracer un cercle de centre ${B} qui passe par ${A}`],
    r: (A: string, B: string) => `On construit d'abord le milieu M de [${A}${B}] au compas — deux arcs depuis ${A}, deux depuis ${B}, on joint les intersections. On recommence ensuite sur [${A}M], puis sur [M${B}] : chaque moitié se coupe en deux, ce qui donne quatre parts égales.`,
  },
];

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
    generate: () => genDistanceNotation(),
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
    // Ancienne question ouverte (le seul mot « segment » suffisait) : QCM sur
    // les mêmes pièges, lettres et personne variées. Voir genDistanceOuverte.
    generate: () => genDistanceOuverte(OUVERTES_DEFINITION),
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
    expected: ["6 cm"],
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
    expected: ["9 cm"],
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
    id: "distance_milieu_tpl_e1",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_milieu",
    difficulty: 1,
    theme: "neutral",
    hint: "Le milieu coupe le segment en deux morceaux égaux.",
    tags: ["distance_segment", "milieu", "template"],
    generate: () => genDistanceMilieu(1),
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
    // Le canvas porte les lettres du texte (pas toujours A, B, M).
    generate: () => genDistanceMilieu(2),
  },
  {
    kind: "template",
    id: "distance_milieu_tpl_e3",
    niveau: "6e",
    matiere: "maths",
    notionId: "distance_segment",
    microId: "distance_milieu",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux conditions : sur le segment, et à égale distance des deux bouts.",
    tags: ["distance_segment", "milieu", "template"],
    generate: () => (Math.random() < 0.6 ? genDistanceEstMilieu() : genDistanceMilieu(2)),
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
    // Ancienne question ouverte (le seul mot « segment » suffisait) : QCM sur
    // les mêmes pièges, lettres et personne variées. Voir genDistanceOuverte.
    generate: () => genDistanceOuverte(OUVERTES_MILIEU),
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
    generate: () => genDistanceInegalite(),
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
    // Ancienne question ouverte (le seul mot « segment » suffisait) : QCM sur
    // les mêmes pièges, lettres et personne variées. Voir genDistanceOuverte.
    generate: () => genDistanceOuverte(OUVERTES_INEGALITE),
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
    expected: ["15 cm"],
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
    generate: () => genDistanceDefiMilieux(),
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
    // Ancienne question ouverte (le seul mot « segment » suffisait) : QCM sur
    // les mêmes pièges, lettres et personne variées. Voir genDistanceOuverte.
    generate: () => genDistanceOuverte(OUVERTES_DEFI),
  },
];
