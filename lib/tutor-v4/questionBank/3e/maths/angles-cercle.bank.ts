// ANGLES INSCRITS, ANGLE AU CENTRE, TRIANGLE DANS UN DEMI-CERCLE ; SECTION D'UNE SPHÈRE (05/11/2026).
//
// Angles inscrits : Québec, Maroc, Suisse, Sénégal, Côte d'Ivoire. Retirés du programme
// français : notion `angles_cercle` masquée, voir `lib/tutor-v4/micros-masquees.ts`.
//
// `section_sphere` reste VISIBLE en France : le programme demande les « sections
// planes » des solides, dont la boule (`docs/bo-maths-cycle4-recopie.md`, p. 135-136),
// et la notion `sections_solides` n'avait rien sur elle.
//
// ⛔ ★1-★2 : phrase courte, sans contexte. Figures calculées, jamais dessinées à l'œil.

import { figureConstruction, point, surCercle } from "@/lib/canvas/construction";
import { ang, cap, enDegres, entre, expliquer, fabriqueGabarits, fr, melange, mesure, nomsLibres, nomsTriangle, qcm, un, UNITES, valeurPi } from "@/lib/tutor-v4/questionBank/outils-geometrie";

const tpl = fabriqueGabarits("3e", "angles_cercle", ["angle", "cercle", "canvas"]);
const tplSection = fabriqueGabarits("3e", "sections_solides", ["section", "sphere", "canvas"]);

const DEF_INSCRIT = "un angle inscrit a son sommet sur le cercle ; il vaut la moitié de l’angle au centre qui intercepte le même arc.";
const DEF_MEME_ARC = "deux angles inscrits qui interceptent le même arc sont égaux.";
const DEF_DEMI = "si un triangle a pour sommets les extrémités d’un diamètre et un autre point du cercle, il est rectangle en ce point.";

const TRIPLETS: [number, number, number][] = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20]];

const O_ = point(0, 0);

/** A et B sur le cercle, écartés de `centre` degrés ; M du grand côté de l'arc (angle inscrit aigu). */
function config(centre: number) {
  const rot = entre(-30, 30);
  const dA = -90 - centre / 2 + rot;
  const dB = dA + centre;
  const libres = 360 - centre;
  const dM = dB + libres * (0.32 + Math.random() * 0.36);
  const dN = dB + libres * (0.12 + Math.random() * 0.12);
  return { A: surCercle(O_, 1, dA), B: surCercle(O_, 1, dB), M: surCercle(O_, 1, dM), N: surCercle(O_, 1, dN) };
}

/** L'angle au centre, l'angle inscrit, l'arc en rouge ; `texte` : ce qu'on donne, jamais ce qu'on cherche. */
function figInscrit(noms: { a: string; b: string; m: string; o: string }, c: ReturnType<typeof config>, opts: { texteCentre?: string; texteInscrit?: string; centre?: boolean; inscrit?: boolean } = {}) {
  const { a, b, m, o } = noms;
  const centre = opts.centre ?? true;
  const inscrit = opts.inscrit ?? true;
  return figureConstruction(
    { [o]: O_, [a]: c.A, [b]: c.B, [m]: c.M },
    {
      cercles: [{ centre: o, rayon: 1 }],
      arcs: [{ centre: o, de: a, vers: b, eviter: m }],
      segments: [
        ...(centre ? [{ a: o, b: a, couleur: "#2563eb" }, { a: o, b, couleur: "#2563eb" }] : []),
        ...(inscrit ? [{ a: m, b: a, couleur: "#059669" }, { a: m, b, couleur: "#059669" }] : []),
      ],
      angles: [
        ...(centre ? [{ sommet: o, de: a, vers: b, couleur: "#2563eb", texte: opts.texteCentre, rayon: 20, rayonTexte: 14 }] : []),
        ...(inscrit ? [{ sommet: m, de: a, vers: b, couleur: "#059669", texte: opts.texteInscrit, rayon: 24, rayonTexte: 14 }] : []),
      ],
      description: "Un cercle, un angle au centre et un angle inscrit qui interceptent le même arc",
    },
  );
}

/** Deux angles inscrits qui interceptent le même arc. */
function figMemeArc(a: string, b: string, m: string, n: string, o: string, c: ReturnType<typeof config>, texteM?: string) {
  return figureConstruction(
    { [o]: O_, [a]: c.A, [b]: c.B, [m]: c.M, [n]: c.N },
    {
      cercles: [{ centre: o, rayon: 1 }],
      arcs: [{ centre: o, de: a, vers: b, eviter: m }],
      segments: [
        { a: m, b: a, couleur: "#059669" }, { a: m, b, couleur: "#059669" },
        { a: n, b: a, couleur: "#c2410c" }, { a: n, b, couleur: "#c2410c" },
      ],
      angles: [
        { sommet: m, de: a, vers: b, couleur: "#059669", texte: texteM, rayon: 22, rayonTexte: 14 },
        { sommet: n, de: a, vers: b, couleur: "#c2410c", rayon: 22 },
      ],
      description: "Deux angles inscrits qui interceptent le même arc",
    },
  );
}

/** Le triangle dans le demi-cercle ; [a b] est le diamètre. L'angle droit n'est PAS marqué : c'est ce qu'on cherche. */
function figDemi(a: string, b: string, m: string, o: string, dM: number, marquer = false) {
  const A = surCercle(O_, 1, 180);
  const B = surCercle(O_, 1, 0);
  const M = surCercle(O_, 1, dM);
  return figureConstruction(
    { [o]: O_, [a]: A, [b]: B, [m]: M },
    {
      cercles: [{ centre: o, rayon: 1 }],
      polygones: [{ sommets: [a, b, m] }],
      angles: marquer ? [{ sommet: m, de: a, vers: b, droit: true }] : [],
      description: "Un triangle dont un côté est un diamètre du cercle",
    },
  );
}

/** La sphère en coupe : le centre, le plan, le rayon de la section. */
function figCoupe(o: string, h: string, m: string, R: number, d: number, texteR?: string, texteD?: string, texteS?: string) {
  const O = O_;
  const H = point(0, d / R);
  const r = Math.sqrt(1 - (d * d) / (R * R));
  const M = point(r, d / R);
  const M2 = point(-r, d / R);
  // Un plan qui passe par le centre : H serait confondu avec le centre.
  const parLeCentre = d / R < 0.01;
  return figureConstruction(
    parLeCentre ? { [o]: O, [m]: M, x: M2 } : { [o]: O, [h]: H, [m]: M, x: M2 },
    {
      cercles: [{ centre: o, rayon: 1 }],
      segments: [
        { a: "x", b: m, couleur: "#dc2626", epais: true },
        ...(parLeCentre ? [] : [{ a: o, b: h, couleur: "#2563eb", texte: texteD }]),
        { a: o, b: m, couleur: "#059669", texte: texteR },
        ...(texteS ? [{ a: h, b: m, couleur: "#dc2626", texte: texteS }] : []),
      ],
      angles: parLeCentre ? [] : [{ sommet: h, de: o, vers: m, droit: true, couleur: "#2563eb" }],
      description: "Une sphère en coupe et le plan qui la coupe",
    },
    ["x"],
  );
}

const ROUES = [
  { o: "Un cadran d’horloge", n: 12, chose: "nombres" },
  { o: "Une roue de vélo à rayons réguliers", n: 36, chose: "rayons" },
  { o: "Un carrousel", n: 20, chose: "chevaux" },
  { o: "Une table ronde", n: 10, chose: "convives" },
  { o: "Une grande roue", n: 24, chose: "nacelles" },
  { o: "Un gâteau rond", n: 8, chose: "bougies" },
];
const SCENES = [
  { lieu: "Un stade circulaire", vu: "le but", qui: "un spectateur", u: "" },
  { lieu: "Un théâtre rond", vu: "la scène", qui: "une spectatrice", u: "" },
  { lieu: "Un rond-point", vu: "le panneau", qui: "un cycliste", u: "" },
  { lieu: "Une piste circulaire", vu: "la ligne d’arrivée", qui: "une coureuse", u: "" },
  { lieu: "Un bassin rond", vu: "le ponton", qui: "un pêcheur", u: "" },
  { lieu: "Une arène", vu: "la porte", qui: "un photographe", u: "" },
  { lieu: "Un cirque", vu: "le trapèze", qui: "une enfant", u: "" },
  { lieu: "Un phare entouré d’une digue ronde", vu: "le quai", qui: "un gardien", u: "" },
];
const EQUERRES = [
  { o: "une assiette", q: "Un cuisinier" },
  { o: "un disque en bois", q: "Une menuisière" },
  { o: "un couvercle rond", q: "Un élève" },
  { o: "une table ronde", q: "Un ébéniste" },
  { o: "une pièce de métal ronde", q: "Une ajusteuse" },
  { o: "un vitrail rond", q: "Un verrier" },
  { o: "une plaque d’égout", q: "Une technicienne" },
  { o: "une rondelle de bois", q: "Un charpentier" },
];
const COUPES = [
  { o: "une orange", u: "cm" },
  { o: "une pastèque", u: "cm" },
  { o: "une boule de pétanque", u: "mm" },
  { o: "un globe de verre", u: "cm" },
  { o: "une sphère de savon", u: "mm" },
  { o: "un dôme sphérique", u: "m" },
  { o: "une citerne sphérique", u: "dm" },
  { o: "une boule de glace", u: "mm" },
  { o: "un melon", u: "cm" },
  { o: "une bille de roulement", u: "mm" },
];

const nomsCercle = () => {
  const [a, b, m] = nomsTriangle();
  const [n, autre] = nomsLibres([a, b, m], 2);
  return { a, b, m, n, autre, o: "O" };
};

const CENTRES_SPHERE = ["O", "C", "S", "K", "P", "T"];
/** Nomme le centre de la sphère dans la phrase, si elle ne le nomme pas déjà. */
const sphereNommee = (t: string, c: string) => (/centre [A-Z]|de O\b/.test(t) ? t : t.replace(/sphère/, `sphère de centre ${c}`));

export const anglesCercleBank = [
  /* ===== ANGLE INSCRIT ET ANGLE AU CENTRE ===== */

  tpl("angle_inscrit_centre", 1, 1, "L’angle inscrit vaut la moitié de l’angle au centre.", () => {
    const { a, b, m, o } = nomsCercle();
    const c = 2 * entre(20, 75);
    const text = un([
      `Sur un cercle de centre ${o}, ${ang(a, o, b)} = ${c}°. ${m} est sur le grand arc ${a}${b}. Combien mesure ${ang(a, m, b)} ?`,
      `L’angle au centre ${ang(a, o, b)} mesure ${c}°. ${ang(a, m, b)} intercepte le même arc. Quelle est sa mesure ?`,
      `${ang(a, o, b)} = ${c}° dans un cercle de centre ${o}, et ${ang(a, m, b)} est inscrit dans ce cercle sur le même arc. Calcule ${ang(a, m, b)}.`,
      `Angle au centre : ${ang(a, o, b)} = ${c}°. Donne la mesure de l’angle inscrit ${ang(a, m, b)}, qui intercepte le même arc.`,
      `Quelle est la mesure de l’angle inscrit ${ang(a, m, b)}, si l’angle au centre ${ang(a, o, b)} qui intercepte le même arc fait ${c}° ?`,
      `Cercle de centre ${o}, ${ang(a, o, b)} = ${c}°. Que vaut ${ang(a, m, b)}, inscrit sur le même arc ?`,
    ]);
    return { text, format: "short", expected: enDegres(c / 2), comparator: "number_equal", canvas: figInscrit({ a, b, m, o }, config(c), { texteCentre: `${c}°` }), explanation: expliquer(DEF_INSCRIT, "on divise l’angle au centre par 2.", `${c} ÷ 2 = ${c / 2}.`, `${ang(a, m, b)} mesure ${c / 2}°.`) };
  }),

  tpl("angle_inscrit_centre", 2, 1, "L’angle au centre vaut le double de l’angle inscrit.", () => {
    const { a, b, m, o } = nomsCercle();
    const i = entre(20, 75);
    const text = un([
      `Sur un cercle de centre ${o}, l’angle inscrit ${ang(a, m, b)} mesure ${i}°. Combien mesure l’angle au centre ${ang(a, o, b)} ?`,
      `${ang(a, m, b)} = ${i}°, inscrit dans un cercle de centre ${o}. Calcule ${ang(a, o, b)}, qui intercepte le même arc.`,
      `Angle inscrit : ${ang(a, m, b)} = ${i}°. Quelle est la mesure de l’angle au centre ${ang(a, o, b)} interceptant le même arc ?`,
      `L’angle ${ang(a, m, b)} de ${i}° intercepte l’arc ${a}${b}. Que vaut l’angle au centre ${ang(a, o, b)} qui intercepte le même arc ?`,
      `Donne la mesure de ${ang(a, o, b)}, si ${ang(a, m, b)} = ${i}° intercepte le même arc.`,
      `Cercle de centre ${o}, angle inscrit ${ang(a, m, b)} = ${i}°. Quel est l’angle au centre correspondant, ${ang(a, o, b)} ?`,
    ]);
    return { text, format: "short", expected: enDegres(2 * i), comparator: "number_equal", canvas: figInscrit({ a, b, m, o }, config(2 * i), { texteInscrit: `${i}°` }), explanation: expliquer(DEF_INSCRIT, "on double l’angle inscrit.", `${i} × 2 = ${2 * i}.`, `${ang(a, o, b)} mesure ${2 * i}°.`) };
  }),

  tpl("angle_inscrit_centre", 3, 2, "Un angle inscrit a son sommet SUR le cercle ; un angle au centre, au centre.", () => {
    const { a, b, m, o } = nomsCercle();
    const c = config(2 * entre(25, 70));
    const veutInscrit = Math.random() < 0.5;
    const text = veutInscrit
      ? un([
          `Sur la figure, quel angle est un angle inscrit ?`,
          `Observe le cercle de centre ${o}. Lequel de ces angles est inscrit ?`,
          `Choisis l’angle inscrit dans le cercle de centre ${o}.`,
          `Le sommet d’un angle inscrit est sur le cercle. Lequel de ces angles convient ?`,
        ])
      : un([
          `Sur la figure, quel angle est un angle au centre ?`,
          `Observe le cercle de centre ${o}. Lequel de ces angles est un angle au centre ?`,
          `Choisis l’angle au centre du cercle de centre ${o}.`,
          `Le sommet d’un angle au centre est le centre du cercle. Lequel de ces angles convient ?`,
        ]);
    const inscrit = `${a}${m}${b}`;
    const centre = `${a}${o}${b}`;
    const juste = veutInscrit ? inscrit : centre;
    return {
      text,
      format: "qcm",
      choices: melange([inscrit, centre, `${m}${a}${o}`]),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figInscrit({ a, b, m, o }, c),
      explanation: expliquer(DEF_INSCRIT, "on regarde où est le sommet, la lettre du milieu.", veutInscrit ? `${m} est sur le cercle, et les côtés de ${ang(a, m, b)} passent par ${a} et ${b}.` : `${o} est le centre du cercle.`, `l’angle cherché est ${juste}.`),
    };
  }),

  tpl("angle_inscrit_centre", 4, 2, "L’arc intercepté est celui qui se trouve entre les côtés de l’angle.", () => {
    const { a, b, m, o } = nomsCercle();
    const c = 2 * entre(25, 70);
    const donne = Math.random() < 0.5;
    const text = donne
      ? un([
          `Un angle inscrit ${ang(a, m, b)} et l’angle au centre ${ang(a, o, b)} interceptent le même arc. Lequel est le plus grand ?`,
          `${ang(a, m, b)} est inscrit, ${ang(a, o, b)} est au centre, et ils interceptent le même arc. Lequel mesure le plus ?`,
          `Compare ${ang(a, m, b)}, inscrit, et ${ang(a, o, b)}, au centre, sur le même arc. Lequel est le plus grand ?`,
        ])
      : un([
          `L’angle au centre ${ang(a, o, b)} mesure ${c}°. Par combien faut-il le diviser pour obtenir l’angle inscrit ${ang(a, m, b)} sur le même arc ?`,
          `Angle au centre ${ang(a, o, b)} = ${c}°, angle inscrit ${ang(a, m, b)} sur le même arc. Par quel nombre diviser le premier pour obtenir le second ?`,
          `On passe de ${ang(a, o, b)} = ${c}° à ${ang(a, m, b)}, inscrit sur le même arc. Par quel nombre divise-t-on ?`,
        ]);
    const juste = donne ? `${ang(a, o, b)}, le double de l’autre` : "2";
    return {
      text,
      format: "qcm",
      choices: donne ? melange([juste, `${ang(a, m, b)}, le double de l’autre`, "Ils sont égaux", `${ang(a, o, b)}, le triple de l’autre`]) : melange(["2", "3", "4", "π"]),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figInscrit({ a, b, m, o }, config(c), donne ? {} : { texteCentre: `${c}°` }),
      explanation: expliquer(DEF_INSCRIT, "l’angle au centre est le double de l’angle inscrit sur le même arc.", donne ? "il est donc le plus grand." : "on divise par 2.", donne ? `${ang(a, o, b)} est le plus grand.` : "on divise par 2."),
    };
  }),

  tpl("angle_inscrit_centre", 5, 3, "D’abord l’angle au centre : le tour complet divisé en parts égales.", () => {
    const R = un(ROUES);
    const k = entre(2, Math.max(2, Math.floor(R.n / 3)));
    const c = (360 * k) / R.n;
    const fin = un([
      `On relie ces deux repères à un autre point du bord, situé de l’autre côté. Quel angle obtient-on en ce point ?`,
      `Un observateur placé sur le bord, de l’autre côté, voit ces deux repères. Sous quel angle ?`,
      `Depuis un point du bord situé de l’autre côté, sous quel angle voit-on ces deux repères ?`,
    ]);
    return {
      text: `${R.o} porte ${R.n} ${R.chose} régulièrement ${/bougies|nacelles/.test(R.chose) ? "réparties" : "répartis"} sur son bord. On en choisit deux, séparés par ${k} intervalles. ${fin}`,
      format: "short",
      expected: enDegres(c / 2),
      comparator: "number_equal",
      explanation: expliquer(DEF_INSCRIT, "l’angle au centre entre deux repères voisins est 360° ÷ le nombre de repères.", `360 ÷ ${R.n} × ${k} = ${c}, puis ${c} ÷ 2 = ${fr(c / 2)}.`, `l’angle est ${fr(c / 2)}°.`),
    };
  }),

  tpl("angle_inscrit_centre", 6, 3, "OAB est isocèle en O : ses deux angles à la base sont égaux.", () => {
    const { a, b, o } = nomsCercle();
    const base = entre(20, 70);
    const c = 180 - 2 * base;
    const text = un([
      `Sur un cercle de centre ${o}, le triangle ${o}${a}${b} a pour angle ${ang(o, a, b)} = ${base}°. Combien mesure l’angle au centre ${ang(a, o, b)} ?`,
      `${a} et ${b} sont sur un cercle de centre ${o}, et ${ang(o, a, b)} = ${base}°. Calcule ${ang(a, o, b)}.`,
      `Dans le cercle de centre ${o}, ${ang(o, a, b)} = ${base}°. Que vaut ${ang(a, o, b)} ?`,
      `${ang(o, a, b)} mesure ${base}°, avec ${a} et ${b} sur le cercle de centre ${o}. Quelle est la mesure de ${ang(a, o, b)} ?`,
    ]);
    const cf = config(c);
    return {
      text,
      format: "short",
      expected: enDegres(c),
      comparator: "number_equal",
      canvas: figureConstruction({ [o]: O_, [a]: cf.A, [b]: cf.B }, { cercles: [{ centre: o, rayon: 1 }], polygones: [{ sommets: [o, a, b] }], angles: [{ sommet: a, de: o, vers: b, texte: `${base}°`, couleur: "#2563eb", rayon: 18, rayonTexte: 16 }], segments: [{ a: o, b: a, code: 1 }, { a: o, b, code: 1 }], description: "Un triangle isocèle de sommet le centre du cercle" }),
      explanation: expliquer(`${o}${a} = ${o}${b} (deux rayons) : le triangle ${o}${a}${b} est isocèle en ${o}.`, "la somme des angles du triangle fait 180°.", `180 − 2 × ${base} = ${c}.`, `${ang(a, o, b)} mesure ${c}°.`),
    };
  }),

  tpl("angle_inscrit_centre", 7, 4, "Isocèle, puis angle au centre, puis moitié : trois étapes.", () => {
    const { a, b, m, o } = nomsCercle();
    const base = 2 * entre(10, 35) ;
    const c = 180 - 2 * base;
    const text = un([
      `Sur un cercle de centre ${o}, ${ang(o, a, b)} = ${base}°. ${m} est sur le grand arc ${a}${b}. Combien mesure ${ang(a, m, b)} ?`,
      `${a}, ${b} et ${m} sont sur un cercle de centre ${o}, avec ${m} sur le grand arc ${a}${b} et ${ang(o, a, b)} = ${base}°. Calcule ${ang(a, m, b)}.`,
      `${ang(o, a, b)} mesure ${base}° dans un cercle de centre ${o}. ${ang(a, m, b)} est inscrit sur le même arc que ${ang(a, o, b)}. Donne sa mesure.`,
    ]);
    const cf = config(c);
    return {
      text,
      format: "short",
      expected: enDegres(c / 2),
      comparator: "number_equal",
      canvas: figInscrit({ a, b, m, o }, cf),
      explanation: expliquer(DEF_INSCRIT, `${o}${a}${b} est isocèle en ${o} (deux rayons) : on trouve ${ang(a, o, b)}, puis sa moitié.`, `180 − 2 × ${base} = ${c}, puis ${c} ÷ 2 = ${c / 2}.`, `${ang(a, m, b)} mesure ${c / 2}°.`),
    };
  }),

  tpl("angle_inscrit_centre", 8, 4, "Dans un quadrilatère inscrit, deux angles opposés font 180°.", () => {
    const { a, b, m, n } = nomsCercle();
    const x = entre(40, 140);
    const quad = un([
      `${a}${b}${m}${n} est un quadrilatère dont les quatre sommets sont sur un même cercle. ${ang(n, a, b)} = ${x}°. Combien mesure ${ang(b, m, n)} ?`,
      `Les points ${a}, ${b}, ${m}, ${n} sont, dans cet ordre, sur un cercle. On sait que ${ang(n, a, b)} = ${x}°. Calcule ${ang(b, m, n)}.`,
      `Dans le quadrilatère inscrit ${a}${b}${m}${n}, ${ang(n, a, b)} mesure ${x}°. Que vaut l’angle opposé ${ang(b, m, n)} ?`,
    ]);
    return {
      text: quad,
      format: "short",
      expected: enDegres(180 - x),
      comparator: "number_equal",
      explanation: expliquer("les angles opposés d’un quadrilatère inscrit dans un cercle sont supplémentaires : leur somme vaut 180°.", "les deux arcs interceptés font le tour complet du cercle, soit 360° au centre.", `180 − ${x} = ${180 - x}.`, `${ang(b, m, n)} mesure ${180 - x}°.`),
    };
  }),

  /* ===== DEUX ANGLES INSCRITS, MÊME ARC ===== */

  tpl("angles_inscrits_meme_arc", 1, 1, "Même arc, même angle.", () => {
    const { a, b, m, n, o } = nomsCercle();
    const i = entre(20, 80);
    const text = un([
      `${ang(a, m, b)} et ${ang(a, n, b)} interceptent le même arc. ${ang(a, m, b)} = ${i}°. Combien mesure ${ang(a, n, b)} ?`,
      `Sur un cercle, ${m} et ${n} sont du même côté de [${a}${b}]. ${ang(a, m, b)} mesure ${i}°. Calcule ${ang(a, n, b)}.`,
      `${ang(a, m, b)} = ${i}°, et ${ang(a, n, b)} est inscrit sur le même arc. Que vaut ${ang(a, n, b)} ?`,
      `Deux angles inscrits interceptent le même arc ${a}${b}. L’un, ${ang(a, m, b)}, fait ${i}°. Quelle est la mesure de l’autre, ${ang(a, n, b)} ?`,
      `Donne la mesure de ${ang(a, n, b)}, sachant que ${ang(a, m, b)} = ${i}° et que tous deux interceptent le même arc.`,
      `Même arc pour ${ang(a, m, b)} et ${ang(a, n, b)}. Avec ${ang(a, m, b)} = ${i}°, quelle est la mesure de ${ang(a, n, b)} ?`,
    ]);
    return { text, format: "short", expected: enDegres(i), comparator: "number_equal", canvas: figMemeArc(a, b, m, n, o, config(2 * i), `${i}°`), explanation: expliquer(DEF_MEME_ARC, "les deux angles sont égaux.", `${ang(a, n, b)} = ${ang(a, m, b)}.`, `${ang(a, n, b)} mesure ${i}°.`) };
  }),

  tpl("angles_inscrits_meme_arc", 2, 1, "Regarde quel arc chaque angle intercepte.", () => {
    const { a, b, m, n, o } = nomsCercle();
    const i = entre(25, 75);
    const juste = "Ils sont égaux";
    const text = un([
      `${ang(a, m, b)} et ${ang(a, n, b)} sont inscrits et interceptent le même arc. Que peut-on dire de ces deux angles ?`,
      `Sur la figure, que peut-on dire de ${ang(a, m, b)} et de ${ang(a, n, b)} ?`,
      `${m} et ${n} sont sur le même arc du cercle. Comment sont ${ang(a, m, b)} et ${ang(a, n, b)} ?`,
      `Compare ${ang(a, m, b)} et ${ang(a, n, b)}, inscrits sur le même arc ${a}${b}.`,
      `Deux angles inscrits, ${ang(a, m, b)} et ${ang(a, n, b)}, ont le même arc. Choisis ce qui est vrai.`,
    ]);
    return { text, format: "qcm", choices: qcm(juste, [`${ang(a, m, b)} vaut le double de ${ang(a, n, b)}`, "Leur somme vaut 180°", "Leur somme vaut 90°"]), expected: [juste], comparator: "mcq_exact", canvas: figMemeArc(a, b, m, n, o, config(2 * i)), explanation: expliquer(DEF_MEME_ARC, "ils ont chacun la moitié du même angle au centre.", "même moitié, même mesure.", "ils sont égaux.") };
  }),

  tpl("angles_inscrits_meme_arc", 3, 2, "Repère quel arc intercepte l’angle donné, puis cherche un autre angle sur cet arc.", () => {
    const { a, b, m, n } = nomsCercle();
    const i = entre(20, 70);
    const text = un([
      `${a}, ${b}, ${m} et ${n} sont sur un cercle, dans cet ordre. ${ang(a, m, b)} = ${i}°. Quel autre angle mesure aussi ${i}° ?`,
      `Sur un cercle, les points sont placés dans l’ordre ${a}, ${b}, ${m}, ${n}. ${ang(a, m, b)} mesure ${i}°. Lequel de ces angles lui est égal ?`,
      `Points ${a}, ${b}, ${m}, ${n}, dans cet ordre, sur un même cercle. Choisis l’angle égal à ${ang(a, m, b)}.`,
      `${ang(a, m, b)} intercepte l’arc ${a}${b}. Les points ${a}, ${b}, ${m}, ${n} sont dans cet ordre sur le cercle. Quel angle intercepte le même arc ?`,
    ]);
    const juste = `${a}${n}${b}`;
    return {
      text,
      format: "qcm",
      choices: melange([juste, `${m}${a}${n}`, `${a}${b}${m}`, `${b}${a}${m}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expliquer(DEF_MEME_ARC, `on cherche un angle inscrit dont les côtés passent par ${a} et ${b}.`, `${ang(a, n, b)} intercepte l’arc ${a}${b}, comme ${ang(a, m, b)}.`, `c’est l’angle ${juste}.`),
    };
  }),

  tpl("angles_inscrits_meme_arc", 4, 2, "Le troisième angle du triangle se trouve avec la somme de 180°, puis on le reporte.", () => {
    const { a, b, m, n, o } = nomsCercle();
    const x = entre(35, 70);
    const y = entre(35, 70);
    const i = 180 - x - y;
    const text = un([
      `Dans le triangle ${a}${b}${m} inscrit dans un cercle, ${ang(m, a, b)} = ${x}° et ${ang(a, b, m)} = ${y}°. ${n} est sur le même arc que ${m}. Combien mesure ${ang(a, n, b)} ?`,
      `${ang(m, a, b)} = ${x}°, ${ang(a, b, m)} = ${y}°, et ${n} est du même côté que ${m} sur le cercle. Calcule ${ang(a, n, b)}.`,
      `Le triangle ${a}${b}${m} est inscrit dans un cercle, avec ${ang(m, a, b)} = ${x}° et ${ang(a, b, m)} = ${y}°. Que vaut ${ang(a, n, b)}, si ${n} est sur le même arc que ${m} ?`,
      `Triangle ${a}${b}${m} inscrit, ${ang(m, a, b)} = ${x}°, ${ang(a, b, m)} = ${y}°. ${n} est sur le même arc que ${m}. Donne ${ang(a, n, b)}.`,
    ]);
    return {
      text,
      format: "short",
      expected: enDegres(i),
      comparator: "number_equal",
      canvas: figMemeArc(a, b, m, n, o, config(2 * i)),
      explanation: expliquer(DEF_MEME_ARC, `on calcule ${ang(a, m, b)} avec la somme des angles du triangle, puis on reporte.`, `180 − ${x} − ${y} = ${i}.`, `${ang(a, n, b)} mesure ${i}°.`),
    };
  }),

  tpl("angles_inscrits_meme_arc", 5, 3, "Deux personnes qui voient la même chose depuis le même bord : même angle de vue.", () => {
    const S = un(SCENES);
    const i = entre(20, 75);
    const autre = un(["Un autre spectateur", "Une autre personne", "Son voisin", "Une amie", "Un technicien", "Une journaliste"]);
    const text = un([
      `Le bord de ${S.lieu.charAt(0).toLowerCase() + S.lieu.slice(1)} forme un cercle. Depuis ce bord, ${S.qui} voit ${S.vu} sous un angle de ${i}°. ${autre}, ailleurs sur le même arc, voit ${S.vu} sous quel angle ?`,
      `${S.lieu} : ${S.qui} placé${/une /.test(S.qui) ? "e" : ""} sur le bord voit ${S.vu} sous un angle de ${i}°. ${autre} se trouve sur le même arc. Sous quel angle voit-on ${S.vu} de là ?`,
      `Sur le bord de ${S.lieu.charAt(0).toLowerCase() + S.lieu.slice(1)}, ${S.qui} mesure un angle de ${i}° pour voir ${S.vu}. Que mesure ${autre.charAt(0).toLowerCase() + autre.slice(1)}, sur le même arc ?`,
    ]);
    return { text: text.replace(/ord de (une?) /, "ord d’$1 "), format: "short", expected: enDegres(i), comparator: "number_equal", explanation: expliquer(DEF_MEME_ARC, "les deux points de vue sont sur le même arc : les deux angles sont inscrits et interceptent le même arc.", `même mesure : ${i}°.`, `l’angle est ${i}°.`) };
  }),

  tpl("angles_inscrits_meme_arc", 6, 3, "Passe par l’angle au centre : il a le double de l’angle inscrit.", () => {
    const { a, b, m, n, o } = nomsCercle();
    const i = entre(20, 75);
    const text = un([
      `Sur un cercle de centre ${o}, ${ang(a, m, b)} = ${i}°. ${n} est sur le même arc que ${m}. Quelle est la somme de ${ang(a, n, b)} et ${ang(a, o, b)} ?`,
      `${ang(a, m, b)} mesure ${i}°, avec ${m} et ${n} sur le même arc du cercle de centre ${o}. Calcule ${ang(a, n, b)} + ${ang(a, o, b)}.`,
      `Cercle de centre ${o}, ${m} et ${n} sur le même arc, ${ang(a, m, b)} = ${i}°. Combien fait ${ang(a, n, b)} + ${ang(a, o, b)} ?`,
    ]);
    return {
      text,
      format: "short",
      expected: enDegres(3 * i),
      comparator: "number_equal",
      canvas: figMemeArc(a, b, m, n, o, config(2 * i), `${i}°`),
      explanation: expliquer(`${DEF_MEME_ARC} L’angle au centre en vaut le double.`, `${ang(a, n, b)} = ${i}° et ${ang(a, o, b)} = ${2 * i}°.`, `${i} + ${2 * i} = ${3 * i}.`, `la somme est ${3 * i}°.`),
    };
  }),

  tpl("angles_inscrits_meme_arc", 7, 4, "Reporte l’angle égal dans le triangle qui t’intéresse, puis utilise 180°.", () => {
    const { a, b, m, n } = nomsCercle();
    const i = entre(25, 60);
    const x = entre(25, 60);
    const text = un([
      `${a}, ${b}, ${m}, ${n} sont, dans cet ordre, sur un cercle. ${ang(a, m, b)} = ${i}° et ${ang(n, a, b)} = ${x}°. Dans le triangle ${a}${n}${b}, combien mesure ${ang(a, b, n)} ?`,
      `Sur un cercle, dans l’ordre : ${a}, ${b}, ${m}, ${n}. On sait que ${ang(a, m, b)} = ${i}° et ${ang(n, a, b)} = ${x}°. Calcule ${ang(a, b, n)} dans le triangle ${a}${n}${b}.`,
      `Quatre points ${a}, ${b}, ${m}, ${n} sont, dans cet ordre, sur un cercle, avec ${ang(a, m, b)} = ${i}° et ${ang(n, a, b)} = ${x}°. Que vaut ${ang(a, b, n)} ?`,
    ]);
    return { text, format: "short", expected: enDegres(180 - i - x), comparator: "number_equal", explanation: expliquer(DEF_MEME_ARC, `${ang(a, n, b)} = ${ang(a, m, b)} = ${i}° (même arc), puis la somme des angles du triangle ${a}${n}${b}.`, `180 − ${i} − ${x} = ${180 - i - x}.`, `${ang(a, b, n)} mesure ${180 - i - x}°.`) };
  }),

  tpl("angles_inscrits_meme_arc", 8, 4, "Les quatre angles aux sommets du quadrilatère inscrit : opposés, ils font 180°.", () => {
    const { a, b, m, n } = nomsCercle();
    const x = entre(50, 130);
    const y = entre(50, 130);
    const text = un([
      `${a}${b}${m}${n} est un quadrilatère inscrit dans un cercle. ${ang(n, a, b)} = ${x}° et ${ang(a, b, m)} = ${y}°. Calcule ${ang(b, m, n)} + ${ang(m, n, a)}.`,
      `Dans le quadrilatère inscrit ${a}${b}${m}${n}, ${ang(n, a, b)} mesure ${x}° et ${ang(a, b, m)} mesure ${y}°. Combien vaut ${ang(b, m, n)} + ${ang(m, n, a)} ?`,
      `Quadrilatère ${a}${b}${m}${n} inscrit : ${ang(n, a, b)} = ${x}°, ${ang(a, b, m)} = ${y}°. Donne la somme ${ang(b, m, n)} + ${ang(m, n, a)}.`,
    ]);
    const juste = 360 - x - y;
    return { text, format: "short", expected: enDegres(juste), comparator: "number_equal", explanation: expliquer("les angles opposés d’un quadrilatère inscrit font 180°.", `${ang(b, m, n)} = 180° − ${x}°, et ${ang(m, n, a)} = 180° − ${y}°.`, `${180 - x} + ${180 - y} = ${juste}.`, `la somme est ${juste}°.`) };
  }),

  /* ===== TRIANGLE DANS UN DEMI-CERCLE ===== */

  tpl("triangle_demi_cercle", 1, 1, "Un sommet sur le cercle, les deux autres aux extrémités d’un diamètre : angle droit.", () => {
    const { a, b, m, o } = nomsCercle();
    const text = un([
      `[${a}${b}] est un diamètre d’un cercle, et ${m} un autre point de ce cercle. Combien mesure ${ang(a, m, b)} ?`,
      `${m} est sur le cercle de diamètre [${a}${b}]. Que vaut ${ang(a, m, b)} ?`,
      `Sur un cercle de diamètre [${a}${b}], on place un point ${m}. Quelle est la mesure de ${ang(a, m, b)} ?`,
      `Le triangle ${a}${b}${m} a pour côté [${a}${b}], diamètre de son cercle circonscrit. Combien vaut ${ang(a, m, b)} ?`,
      `Cercle de diamètre [${a}${b}], point ${m} sur ce cercle : donne la mesure de ${ang(a, m, b)}.`,
      `Calcule ${ang(a, m, b)}, sachant que ${a}, ${b}, ${m} sont sur un cercle et que [${a}${b}] en est un diamètre.`,
    ]);
    return { text, format: "short", expected: enDegres(90), comparator: "number_equal", canvas: figDemi(a, b, m, o, entre(40, 140)), explanation: expliquer(DEF_DEMI, "l’angle au centre sur le diamètre vaut 180°, l’angle inscrit en vaut la moitié.", "180 ÷ 2 = 90.", `${ang(a, m, b)} mesure 90°.`) };
  }),

  tpl("triangle_demi_cercle", 2, 1, "Regarde quel côté est un diamètre.", () => {
    const { a, b, m, o } = nomsCercle();
    const text = un([
      `${a}, ${b}, ${m} sont sur un cercle, et [${a}${b}] en est un diamètre. Quelle est la nature du triangle ${a}${b}${m} ?`,
      `Le triangle ${a}${b}${m} a ses sommets sur un cercle de diamètre [${a}${b}]. Comment est-il ?`,
      `[${a}${b}] est un diamètre du cercle circonscrit au triangle ${a}${b}${m}. Choisis sa nature.`,
      `Sur un cercle de diamètre [${a}${b}], on place ${m}. Quel triangle obtient-on avec ${a}, ${b}, ${m} ?`,
      `${m} est un point du cercle de diamètre [${a}${b}]. Le triangle ${a}${b}${m} est…`,
    ]);
    const juste = `rectangle en ${m}`;
    return { text, format: "qcm", choices: qcm(juste, [`rectangle en ${a}`, `isocèle en ${m}`, "équilatéral"]), expected: [juste], comparator: "mcq_exact", canvas: figDemi(a, b, m, o, un([40, 55, 70, 110, 125, 140])), explanation: expliquer(DEF_DEMI, `le sommet qui n’est pas sur le diamètre est ${m}.`, `l’angle droit est en ${m}.`, `le triangle est rectangle en ${m}.`) };
  }),

  tpl("triangle_demi_cercle", 3, 2, "L’angle en M est droit : les deux autres font 90° à eux deux.", () => {
    const { a, b, m, o } = nomsCercle();
    const x = entre(20, 70);
    const text = un([
      `[${a}${b}] est un diamètre, ${m} est sur le cercle, et ${ang(m, a, b)} = ${x}°. Combien mesure ${ang(m, b, a)} ?`,
      `${m} est sur le cercle de diamètre [${a}${b}], avec ${ang(m, a, b)} = ${x}°. Calcule ${ang(m, b, a)}.`,
      `Cercle de diamètre [${a}${b}], point ${m}, ${ang(m, a, b)} = ${x}°. Que vaut ${ang(m, b, a)} ?`,
      `${ang(m, a, b)} mesure ${x}°, et ${m} est sur le cercle de diamètre [${a}${b}]. Donne ${ang(m, b, a)}.`,
      `Le triangle ${a}${b}${m} est inscrit dans un cercle de diamètre [${a}${b}], et ${ang(m, a, b)} = ${x}°. Quelle est la mesure de ${ang(m, b, a)} ?`,
    ]);
    return { text, format: "short", expected: enDegres(90 - x), comparator: "number_equal", canvas: figDemi(a, b, m, o, 2 * x, true), explanation: expliquer(DEF_DEMI, `le triangle est rectangle en ${m} : ses angles aigus font 90°.`, `90 − ${x} = ${90 - x}.`, `${ang(m, b, a)} mesure ${90 - x}°.`) };
  }),

  tpl("triangle_demi_cercle", 4, 2, "Le centre du cercle circonscrit à un triangle rectangle est le milieu de l’hypoténuse.", () => {
    const [a, b, c] = nomsTriangle();
    const u = un(UNITES);
    const H = 2 * entre(3, 30);
    const text = un([
      `Le triangle ${a}${b}${c} est rectangle en ${c}, d’hypoténuse ${a}${b} = ${H} ${u}. Quel est le rayon de son cercle circonscrit ?`,
      `${a}${b}${c} est rectangle en ${c}, avec ${a}${b} = ${H} ${u}. Calcule le rayon du cercle passant par ${a}, ${b} et ${c}.`,
      `Hypoténuse ${a}${b} = ${H} ${u}, angle droit en ${c}. Que vaut le rayon du cercle circonscrit à ce triangle ${a}${b}${c} ?`,
      `Rayon du cercle circonscrit au triangle ${a}${b}${c} rectangle en ${c}, si ${a}${b} = ${H} ${u} ?`,
      `Donne le rayon du cercle circonscrit à un triangle ${a}${b}${c} rectangle en ${c}, dont l’hypoténuse mesure ${H} ${u}.`,
    ]);
    return { text, format: "short", expected: mesure(H / 2, u), comparator: "number_equal", explanation: expliquer(DEF_DEMI, "l’hypoténuse est un diamètre du cercle circonscrit.", `${H} ÷ 2 = ${H / 2}.`, `le rayon est ${H / 2} ${u}.`) };
  }),

  tpl("triangle_demi_cercle", 5, 3, "Le triangle est rectangle : Pythagore s’applique, le diamètre est l’hypoténuse.", () => {
    const { a, b, m, o } = nomsCercle();
    const u = un(UNITES);
    const [x, y, z] = un(TRIPLETS);
    const text = un([
      `[${a}${b}] est un diamètre, ${m} est sur le cercle, ${a}${b} = ${z} ${u} et ${a}${m} = ${x} ${u}. Combien mesure ${b}${m} ?`,
      `${m} est sur le cercle de diamètre ${a}${b} = ${z} ${u}, avec ${a}${m} = ${x} ${u}. Calcule ${b}${m}.`,
      `Diamètre ${a}${b} = ${z} ${u}, ${m} sur le cercle, ${a}${m} = ${x} ${u}. Que vaut ${b}${m} ?`,
      `Le triangle ${a}${b}${m} est inscrit dans le cercle de diamètre ${a}${b} = ${z} ${u}, et ${a}${m} = ${x} ${u}. Donne ${b}${m}.`,
    ]);
    const dM = (2 * Math.atan2(y, x) * 180) / Math.PI;
    return { text, format: "short", expected: mesure(y, u), comparator: "number_equal", canvas: figDemi(a, b, m, o, dM, true), explanation: expliquer(DEF_DEMI, `rectangle en ${m}, d’hypoténuse [${a}${b}] : on applique le théorème de Pythagore.`, `${z}² − ${x}² = ${z * z - x * x} = ${y}².`, `${b}${m} = ${y} ${u}.`) };
  }),

  tpl("triangle_demi_cercle", 6, 3, "Le coin de l’équerre sur le bord : ses deux côtés coupent le cercle aux extrémités d’un diamètre.", () => {
    const E = un(EQUERRES);
    const [x, y, z] = un(TRIPLETS);
    const text = un([
      `${E.q} pose le coin d’une équerre sur le bord d’${E.o.replace(/^une? /, E.o.startsWith("une") ? "une " : "un ")}. Les côtés de l’équerre recoupent le bord à ${x} cm et à ${y} cm du coin. Quel est le diamètre ?`,
      `Pour mesurer ${E.o}, on place le coin d’une équerre sur son bord : les deux côtés coupent le bord à ${x} cm et à ${y} cm du coin. Calcule le diamètre.`,
      `Le coin d’une équerre touche le bord d’${E.o.replace(/^une? /, E.o.startsWith("une") ? "une " : "un ")}. Les côtés recoupent ce bord à ${x} cm et ${y} cm du coin. Combien mesure son diamètre ?`,
    ]);
    return { text, format: "short", expected: mesure(z, "cm"), comparator: "number_equal", explanation: expliquer(DEF_DEMI, "l’angle droit de l’équerre est inscrit : les deux points de coupe sont les extrémités d’un diamètre, et Pythagore donne sa longueur.", `${x}² + ${y}² = ${x * x + y * y} = ${z}².`, `le diamètre mesure ${z} cm.`) };
  }),

  tpl("triangle_demi_cercle", 7, 4, "Teste l’égalité de Pythagore : si elle est vraie, M est sur le cercle.", () => {
    const { a, b, m } = nomsCercle();
    const u = un(UNITES);
    const [x, y, z] = un(TRIPLETS);
    const vrai = Math.random() < 0.5;
    const zz = vrai ? z : z + entre(1, 2);
    const text = un([
      `${a}${b} = ${zz} ${u}, ${a}${m} = ${x} ${u} et ${b}${m} = ${y} ${u}. ${m} est-il sur le cercle de diamètre [${a}${b}] ?`,
      `On donne ${a}${b} = ${zz} ${u}, ${a}${m} = ${x} ${u}, ${b}${m} = ${y} ${u}. Le point ${m} appartient-il au cercle de diamètre [${a}${b}] ?`,
      `Le triangle ${a}${b}${m} a pour côtés ${a}${b} = ${zz} ${u}, ${a}${m} = ${x} ${u}, ${b}${m} = ${y} ${u}. ${m} est-il sur le cercle de diamètre [${a}${b}] ?`,
    ]);
    const oui = `Oui : ${a}${m}² + ${b}${m}² = ${a}${b}²`;
    const non = `Non : ${a}${m}² + ${b}${m}² ≠ ${a}${b}²`;
    return {
      text,
      format: "qcm",
      choices: melange([oui, non, `Oui : ${a}${m} + ${b}${m} > ${a}${b}`, `Non : ${a}${m} + ${b}${m} > ${a}${b}`]),
      expected: [vrai ? oui : non],
      comparator: "mcq_exact",
      explanation: expliquer(DEF_DEMI, `${m} est sur ce cercle exactement quand le triangle est rectangle en ${m}.`, `${x}² + ${y}² = ${x * x + y * y} et ${zz}² = ${zz * zz}.`, vrai ? `égalité vraie : ${m} est sur le cercle.` : `égalité fausse : ${m} n’est pas sur le cercle.`),
    };
  }),

  tpl("triangle_demi_cercle", 8, 4, "Pythagore donne le diamètre ; le rayon en est la moitié.", () => {
    const [a, b, c] = nomsTriangle();
    const u = un(UNITES);
    const [x, y, z] = un(TRIPLETS);
    const text = un([
      `Le triangle ${a}${b}${c} est rectangle en ${c}, avec ${a}${c} = ${x} ${u} et ${b}${c} = ${y} ${u}. Quel est le rayon de son cercle circonscrit ?`,
      `${a}${b}${c} est rectangle en ${c} : ${a}${c} = ${x} ${u}, ${b}${c} = ${y} ${u}. Calcule le rayon du cercle passant par ses trois sommets.`,
      `Angle droit en ${c}, ${a}${c} = ${x} ${u}, ${b}${c} = ${y} ${u}. Quel rayon a le cercle circonscrit à ce triangle ${a}${b}${c} ?`,
      `Donne le rayon du cercle circonscrit à un triangle ${a}${b}${c} rectangle en ${c}, où ${a}${c} = ${x} ${u} et ${b}${c} = ${y} ${u}.`,
    ]);
    return { text, format: "short", expected: mesure(z / 2, u), comparator: "number_equal", explanation: expliquer(DEF_DEMI, "l’hypoténuse est un diamètre : Pythagore, puis on divise par 2.", `${x}² + ${y}² = ${z}², puis ${z} ÷ 2 = ${fr(z / 2)}.`, `le rayon est ${fr(z / 2)} ${u}.`) };
  }),

  /* ===== SECTION D'UNE SPHÈRE (reste visible en France) ===== */

  tplSection("section_sphere", 1, 1, "Un plan qui coupe une sphère dessine toujours un cercle.", () => {
    const o = un(["O", "Ω", "C"]);
    const text = un([
      `Un plan coupe une sphère de centre ${o}. Quelle figure obtient-on ?`,
      `On coupe une sphère de centre ${o} par un plan. Quelle est la forme de la section ?`,
      `Quelle figure dessine un plan qui coupe une sphère de centre ${o} ?`,
      `Une sphère de centre ${o} est coupée par un plan. De quelle forme est la coupe ?`,
      `Section d’une sphère de centre ${o} par un plan : choisis sa forme.`,
      `Quelle est la section d’une sphère de centre ${o} par un plan qui la traverse ?`,
    ]);
    const juste = "un cercle";
    const opts = un([["un carré", "un rectangle", "une ellipse"], ["un triangle", "un rectangle", "un carré"], ["un carré", "un triangle", "un segment"]]);
    return { text, format: "qcm", choices: qcm(juste, opts), expected: [juste], comparator: "mcq_exact", explanation: expliquer("la section d’une sphère par un plan est un cercle, dont le centre est le pied de la perpendiculaire au plan menée depuis le centre.", "vue dans n’importe quel sens, la coupe reste ronde.", "plan + sphère = cercle.", "c’est un cercle.") };
  }),

  tplSection("section_sphere", 2, 1, "Un plan qui passe par le centre coupe la sphère selon un cercle de même rayon.", () => {
    const o = un(CENTRES_SPHERE);
    const u = un(UNITES);
    const R = entre(3, 40);
    const text = un([
      `Un plan passe par le centre ${o} d’une sphère de rayon ${R} ${u}. Quel est le rayon de la section ?`,
      `On coupe une sphère de rayon ${R} ${u} par un plan passant par son centre. Que vaut le rayon du cercle obtenu ?`,
      `Sphère de rayon ${R} ${u}, plan passant par son centre : quel rayon a la section ?`,
      `Le plan passe par le centre d’une sphère de ${R} ${u} de rayon. Donne le rayon de la section.`,
      `Un grand cercle est tracé sur une sphère de rayon ${R} ${u}. Quel est le rayon de ce grand cercle ?`,
      `Quel est le rayon de la section d’une sphère de rayon ${R} ${u} par un plan qui contient son centre ?`,
    ]);
    return { text: sphereNommee(text, o), format: "short", expected: mesure(R, u), comparator: "number_equal", canvas: figCoupe(o, "H", "M", R, 0.001), explanation: expliquer("un plan qui passe par le centre coupe la sphère selon un grand cercle, de même rayon que la sphère.", "aucun calcul : les deux rayons sont égaux.", `rayon de la section = ${R}.`, `le rayon est ${R} ${u}.`) };
  }),

  tplSection("section_sphere", 3, 2, "Compare la distance du plan au centre et le rayon de la sphère.", () => {
    const u = un(UNITES);
    const R = entre(5, 40);
    const cas = un(["coupe", "touche", "rate"] as const);
    const d = cas === "coupe" ? entre(1, R - 1) : cas === "touche" ? R : R + entre(1, 8);
    const text = un([
      `Une sphère a un rayon de ${R} ${u}. Un plan est à ${d} ${u} de son centre. Que se passe-t-il ?`,
      `Rayon de la sphère : ${R} ${u}. Distance du plan au centre : ${d} ${u}. Quelle est la position du plan ?`,
      `Un plan se trouve à ${d} ${u} du centre d’une sphère de rayon ${R} ${u}. Choisis ce qui est vrai.`,
      `Sphère de ${R} ${u} de rayon, plan à ${d} ${u} du centre : que peut-on dire ?`,
    ]);
    const TEXTE = { coupe: "Le plan coupe la sphère selon un cercle", touche: "Le plan touche la sphère en un seul point", rate: "Le plan ne touche pas la sphère" };
    return {
      text: sphereNommee(text, un(CENTRES_SPHERE)),
      format: "qcm",
      choices: melange([TEXTE.coupe, TEXTE.touche, TEXTE.rate, "Le plan coupe la sphère selon un carré"]),
      expected: [TEXTE[cas]],
      comparator: "mcq_exact",
      explanation: expliquer("si la distance du plan au centre est plus petite que le rayon, il y a un cercle ; égale, un seul point ; plus grande, rien.", "on compare les deux nombres.", `distance ${d}, rayon ${R}.`, `${TEXTE[cas]}.`),
    };
  }),

  tplSection("section_sphere", 4, 2, "Plus le plan est loin du centre, plus la section est petite.", () => {
    const u = un(UNITES);
    const R = entre(12, 40);
    const d1 = entre(1, Math.floor(R / 2));
    const d2 = entre(d1 + 1, R - 1);
    const text = un([
      `Une sphère a un rayon de ${R} ${u}. Un plan P est à ${d1} ${u} du centre, un plan Q à ${d2} ${u}. Quelle section a le plus grand rayon ?`,
      `Rayon de la sphère : ${R} ${u}. Distance au centre : ${d1} ${u} pour le plan P, ${d2} ${u} pour le plan Q. Laquelle des deux sections est la plus grande ?`,
      `Deux plans coupent une sphère de ${R} ${u} de rayon. P est à ${d1} ${u} du centre, Q à ${d2} ${u}. Quelle section a le plus grand rayon ?`,
      `Sphère de rayon ${R} ${u}, plan P à ${d1} ${u} du centre, plan Q à ${d2} ${u}. Quel cercle est le plus grand ?`,
    ]);
    return { text, format: "qcm", choices: melange(["Celle du plan P", "Celle du plan Q", "Elles sont égales", "Aucune des deux : ce sont des points"]), expected: ["Celle du plan P"], comparator: "mcq_exact", explanation: expliquer("le rayon de la section vaut √(R² − d²) : il diminue quand la distance d augmente.", "on regarde le plan le plus proche du centre.", `${d1} < ${d2}.`, "la section du plan P est la plus grande.") };
  }),

  tplSection("section_sphere", 5, 3, "Rayon de la sphère, distance au plan, rayon de la section : un triangle rectangle.", () => {
    const u = un(UNITES);
    const [d, r, R] = un(TRIPLETS);
    const text = un([
      `Une sphère de centre O a un rayon de ${R} ${u}. Un plan est à ${d} ${u} de O. Quel est le rayon de la section ?`,
      `Rayon de la sphère : ${R} ${u}. Distance du plan au centre : ${d} ${u}. Calcule le rayon du cercle de section.`,
      `Un plan coupe une sphère de ${R} ${u} de rayon, à ${d} ${u} de son centre. Que vaut le rayon de la section ?`,
      `Donne le rayon de la section d’une sphère de rayon ${R} ${u} par un plan situé à ${d} ${u} du centre.`,
    ]);
    return { text, format: "short", expected: mesure(r, u), comparator: "number_equal", canvas: figCoupe("O", "H", "M", R, d, `${R} ${u}`, `${d} ${u}`), explanation: expliquer("le centre O, le centre H de la section et un point M de la section forment un triangle rectangle en H.", "on applique le théorème de Pythagore.", `${R}² − ${d}² = ${R * R - d * d} = ${r}².`, `le rayon de la section est ${r} ${u}.`) };
  }),

  tplSection("section_sphere", 6, 3, "Dessine la coupe : un triangle rectangle apparaît.", () => {
    const C = un(COUPES);
    const [d, r, R] = un(TRIPLETS);
    const text = un([
      `On coupe ${C.o} de ${R} ${C.u} de rayon par un plan, à ${d} ${C.u} de son centre. Quel est le rayon du cercle de coupe ?`,
      `${cap(C.o)} est modélisée par une sphère de rayon ${R} ${C.u}. Le plan de coupe passe à ${d} ${C.u} du centre. Calcule le rayon de la section.`.replace(/^(Un .*?) est modélisée/, "$1 est modélisé"),
      `Un plan tranche ${C.o}, de rayon ${R} ${C.u}, à ${d} ${C.u} du centre. Combien mesure le rayon de la tranche ?`,
    ]);
    return { text, format: "short", expected: mesure(r, C.u), comparator: "number_equal", explanation: expliquer("le centre, le centre de la coupe et un point du bord de la coupe forment un triangle rectangle.", "on applique le théorème de Pythagore.", `${R}² − ${d}² = ${R * R - d * d} = ${r}².`, `le rayon est ${r} ${C.u}.`) };
  }),

  tplSection("section_sphere", 7, 4, "Même triangle rectangle : cette fois, c’est la distance au centre qu’on cherche.", () => {
    const u = un(UNITES);
    const [d, r, R] = un(TRIPLETS);
    const o = un(CENTRES_SPHERE);
    const text = un([
      `Une sphère a un rayon de ${R} ${u}. Un plan la coupe selon un cercle de rayon ${r} ${u}. À quelle distance du centre est le plan ?`,
      `Rayon de la sphère : ${R} ${u}. Rayon de la section : ${r} ${u}. Calcule la distance du plan au centre.`,
      `Un plan coupe une sphère de ${R} ${u} de rayon selon un cercle de ${r} ${u} de rayon. Que vaut la distance du plan au centre ?`,
      `La section d’une sphère de rayon ${R} ${u} a pour rayon ${r} ${u}. Donne la distance du centre au plan.`,
    ]);
    return { text: sphereNommee(text, o), format: "short", expected: mesure(d, u), comparator: "number_equal", canvas: figCoupe(o, "H", "M", R, d, `${R} ${u}`, undefined, `${r} ${u}`), explanation: expliquer("le centre de la sphère, le centre H de la section et un point M de la section forment un triangle rectangle en H.", "on applique le théorème de Pythagore.", `${R}² − ${r}² = ${R * R - r * r} = ${d}².`, `la distance est ${d} ${u}.`) };
  }),

  tplSection("section_sphere", 8, 4, "D’abord le rayon de la section (Pythagore), puis l’aire du disque.", () => {
    const u = un(UNITES);
    const [d, r, R] = un(TRIPLETS);
    const o = un(CENTRES_SPHERE);
    const text = un([
      `Une sphère a un rayon de ${R} ${u}. Un plan la coupe à ${d} ${u} de son centre. Quelle est l’aire du disque de section, sous la forme aπ ?`,
      `Rayon de la sphère : ${R} ${u}. Distance du plan au centre : ${d} ${u}. Calcule l’aire de la section, sous la forme aπ.`,
      `On coupe une sphère de ${R} ${u} de rayon par un plan, à ${d} ${u} du centre. Écris l’aire du disque obtenu sous la forme aπ.`,
    ]);
    return { text: sphereNommee(text, o), format: "short", expected: valeurPi(r * r, `${u}²`), comparator: "exact_text", canvas: figCoupe(o, "H", "M", R, d, `${R} ${u}`, `${d} ${u}`), explanation: expliquer("l’aire d’un disque de rayon r est π × r².", "le rayon de la section vient de Pythagore.", `${R}² − ${d}² = ${r * r}, donc r² = ${r * r}.`, `l’aire est ${r * r}π ${u}².`) };
  }),
];
