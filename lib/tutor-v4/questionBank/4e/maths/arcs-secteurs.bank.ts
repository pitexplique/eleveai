// LONGUEUR D'UN ARC, AIRE D'UN SECTEUR, PAR PROPORTIONNALITÉ À L'ANGLE (05/11/2026).
//
// Québec, Suisse, Sénégal, Côte d'Ivoire. Hors du programme français au collège (l'arc
// revient en radians en 1re spé) : notion masquée, voir `lib/tutor-v4/micros-masquees.ts`.
//
// ⛔ ★1-★2 : phrase courte, sans contexte. L'arc et le secteur sont des PARTS du cercle et
// du disque : l'angle au centre sur 360° donne la part. Toute la notion tient là-dedans.

import { figureConstruction, point, surCercle, type P } from "@/lib/canvas/construction";
import { enDegres, entre, expliquer, fabriqueGabarits, fr, mesure, qcm, un, UNITES, valeurPi } from "@/lib/tutor-v4/questionBank/outils-geometrie";

const tpl = fabriqueGabarits("4e", "arcs_secteurs", ["arc", "secteur", "cercle", "canvas"]);

const DEF_ARC = "la longueur d’un arc est proportionnelle à l’angle au centre : arc = 2 × π × rayon × angle ÷ 360.";
const DEF_SEC = "l’aire d’un secteur est proportionnelle à l’angle au centre : secteur = π × rayon × rayon × angle ÷ 360.";

const phrase = (debuts: readonly string[], fins: readonly string[]) => `${un(debuts)} ${un(fins)}`;

const PARTS: Record<number, string> = { 180: "la moitié", 120: "le tiers", 90: "le quart", 72: "le cinquième", 60: "le sixième", 45: "le huitième", 36: "le dixième", 30: "le douzième" };
const ANGLES_PARTS = [180, 120, 90, 72, 60, 45, 36, 30] as const;
const SIMPLES = [180, 120, 90, 60, 45, 30] as const;
const AUTRES = [20, 40, 50, 75, 80, 100, 135, 140, 150, 160, 200, 210, 240, 270, 300] as const;

const estPropre = (x: number) => Number.isInteger(Math.round(x * 1e6) / 1e6);
const arrondi = (x: number) => Math.round(x * 10) / 10;

/** Un rayon et un angle dont le coefficient de π tombe juste, entier. */
function tirer(angles: readonly number[], coef: (r: number, a: number) => number, rmax = 24, rmin = 2): [number, number] {
  for (;;) {
    const r = entre(rmin, rmax);
    const a = un(angles);
    // Pas de coefficient 1 : « sous la forme aπ » n'a plus de sens, et « π » seul serait refusé.
    if (estPropre(coef(r, a)) && coef(r, a) > 1) return [r, a];
  }
}
const cArc = (r: number, a: number) => (r * a) / 180;
const cSec = (r: number, a: number) => (r * r * a) / 360;

/** Le cercle, le secteur coloré, l'arc en rouge. Les textes : ce qu'on donne, jamais ce qu'on cherche. */
function figure(angle: number, opts: { rayon?: string; angle?: string; secteur?: boolean; diametre?: string } = {}) {
  const O = point(0, 0);
  const debut = entre(-40, 40);
  const pts: Record<string, P> = { O, A: surCercle(O, 1, debut), B: surCercle(O, 1, debut + angle), x: surCercle(O, 1, debut + angle + (360 - angle) / 2) };
  const contour = Array.from({ length: 25 }, (_, k) => `s${k}`);
  contour.forEach((id, k) => (pts[id] = surCercle(O, 1, debut + (angle * k) / 24)));
  const petit = angle < 180;
  // Plus l'angle est fermé, plus sa mesure s'éloigne du centre : « 45° » touchait le rayon.
  const loinTexte = Math.min(72, Math.max(32, 15 / Math.sin((angle * Math.PI) / 360)));
  return figureConstruction(
    pts,
    {
      polygones: opts.secteur ? [{ sommets: ["O", ...contour], fond: "#fde68a", contour: "none" }] : [],
      cercles: [{ centre: "O", rayon: 1 }],
      arcs: [{ centre: "O", de: "A", vers: "B", eviter: "x" }],
      segments: [
        { a: "O", b: "A", couleur: "#2563eb", texte: opts.rayon },
        { a: "O", b: "B", couleur: "#2563eb" },
      ],
      angles: petit ? [{ sommet: "O", de: "A", vers: "B", couleur: "#2563eb", texte: opts.angle, rayon: 18, rayonTexte: loinTexte - 18 }] : [],
      description: opts.secteur ? "Un disque et un secteur coloré, de sommet le centre O" : "Un cercle et un arc en rouge, entre deux rayons",
    },
    ["x", ...contour],
  );
}

const CALC_ARC = (r: number, a: number) => qcm(`2 × π × ${r} × ${a} ÷ 360`, [`2 × π × ${r} × ${a}`, `π × ${r} × ${r} × ${a} ÷ 360`, `2 × π × ${r} ÷ ${a}`, `2 × π × ${r} × 360 ÷ ${a}`]);
const CALC_SEC = (r: number, a: number) => qcm(`π × ${r} × ${r} × ${a} ÷ 360`, [`π × ${r} × ${r} × ${a}`, `2 × π × ${r} × ${a} ÷ 360`, `π × ${r} × ${r} ÷ ${a}`, `π × ${r} × ${a} ÷ 360`]);

const FIN_PI = ["sous la forme aπ", "en valeur exacte, sous la forme aπ", "en gardant π, sous la forme aπ"];

/* Le rayon d'abord, l'angle ensuite : le correcteur les relit ainsi. */
const ARCS: { o: (r: string, a: string) => string; q: string; u: string; r: [number, number] }[] = [
  { o: (r, a) => `Un essuie-glace de ${r} balaie un angle de ${a}.`, q: "Quelle distance parcourt son extrémité ?", u: "cm", r: [30, 60] },
  { o: (r, a) => `Une balançoire a des cordes de ${r} et oscille sur un angle de ${a}.`, q: "Quelle distance parcourt le siège ?", u: "m", r: [2, 5] },
  { o: (r, a) => `Le balancier d’une horloge, long de ${r}, oscille sur ${a}.`, q: "Quelle distance parcourt son extrémité ?", u: "cm", r: [20, 80] },
  { o: (r, a) => `Un virage de piste d’athlétisme a un rayon de ${r} et un angle de ${a}.`, q: "Quelle est la longueur de ce virage ?", u: "m", r: [30, 40] },
  { o: (r, a) => `Le battant d’un portail mesure ${r} et s’ouvre de ${a}.`, q: "Quelle distance parcourt son extrémité ?", u: "m", r: [2, 4] },
  { o: (r, a) => `Une pale d’éolienne mesure ${r} et tourne de ${a}.`, q: "Quelle distance parcourt sa pointe ?", u: "m", r: [30, 60] },
  { o: (r, a) => `Le bras d’une grue mesure ${r} et pivote de ${a}.`, q: "Quelle distance parcourt son extrémité ?", u: "m", r: [15, 50] },
  { o: (r, a) => `Une route de montagne décrit un lacet de rayon ${r}, sur un angle de ${a}.`, q: "Quelle est la longueur de ce lacet ?", u: "m", r: [10, 30] },
  { o: (r, a) => `Un voilier vire autour d’une bouée, à ${r} d’elle, sur un angle de ${a}.`, q: "Quelle distance parcourt-il ?", u: "m", r: [10, 40] },
  { o: (r, a) => `Le bras d’un tourne-disque, long de ${r}, pivote de ${a}.`, q: "Quelle distance parcourt sa pointe ?", u: "cm", r: [15, 30] },
  { o: (r, a) => `Une gymnaste a les pieds à ${r} de la barre et tourne autour d’elle d’un angle de ${a}.`, q: "Quelle distance parcourent ses pieds ?", u: "cm", r: [150, 190] },
  { o: (r, a) => `Une nacelle de manège tourne à ${r} du centre, d’un angle de ${a}.`, q: "Quelle distance parcourt-elle ?", u: "m", r: [4, 15] },
];

const SECTEURS: { o: (r: string, a: string) => string; q: string; u: string; r: [number, number] }[] = [
  { o: (r, a) => `Un arroseur a une portée de ${r} et tourne sur ${a}.`, q: "Quelle surface de pelouse arrose-t-il ?", u: "m", r: [3, 12] },
  { o: (r, a) => `Une porte de ${r} de large s’ouvre de ${a}.`, q: "Quelle surface de sol balaie-t-elle ?", u: "cm", r: [70, 95] },
  { o: (r, a) => `Une part de tarte a un rayon de ${r} et un angle de ${a}.`, q: "Quelle est l’aire de cette part ?", u: "cm", r: [10, 16] },
  { o: (r, a) => `Le faisceau d’un phare éclaire jusqu’à ${r}, sur un angle de ${a}.`, q: "Quelle surface de mer éclaire-t-il ?", u: "m", r: [50, 150] },
  { o: (r, a) => `Un éventail ouvert a des branches de ${r} et s’ouvre sur ${a}.`, q: "Quelle surface de papier faut-il ?", u: "cm", r: [15, 30] },
  { o: (r, a) => `Un radar surveille jusqu’à ${r} de distance, sur un angle de ${a}.`, q: "Quelle surface surveille-t-il ?", u: "km", r: [5, 40] },
  { o: (r, a) => `Une chèvre, attachée à un coin d’enclos par une corde de ${r}, peut brouter sur un angle de ${a}.`, q: "Quelle surface d’herbe peut-elle brouter ?", u: "m", r: [2, 10] },
  { o: (r, a) => `La zone de chute du lancer du disque a un rayon de ${r} et un angle de ${a}.`, q: "Quelle est son aire ?", u: "m", r: [50, 80] },
  { o: (r, a) => `Une scène en éventail a un rayon de ${r} et un angle de ${a}.`, q: "Quelle surface de plancher faut-il ?", u: "m", r: [5, 15] },
  { o: (r, a) => `Une caméra de surveillance voit jusqu’à ${r}, sur un angle de ${a}.`, q: "Quelle surface de parking voit-elle ?", u: "m", r: [10, 30] },
  { o: (r, a) => `Un store en éventail a un rayon de ${r} et un angle de ${a}.`, q: "Quelle surface de toile faut-il ?", u: "m", r: [2, 6] },
  { o: (r, a) => `Un champ de canne à La Réunion est arrosé par un canon d’une portée de ${r}, sur un angle de ${a}.`, q: "Quelle surface arrose-t-il ?", u: "m", r: [20, 40] },
];

const PARTAGES = [
  { o: "Une pizza", f: true, p: "parts égales", u: "cm", r: [14, 20], q: "Quelle est l’aire d’une part ?" },
  { o: "Une tarte", f: true, p: "parts égales", u: "cm", r: [10, 16], q: "Quelle est l’aire d’une part ?" },
  { o: "Un gâteau d’anniversaire rond", f: false, p: "parts égales", u: "cm", r: [10, 18], q: "Quelle est l’aire du dessus d’une part ?" },
  { o: "Un parterre rond", f: false, p: "massifs égaux", u: "m", r: [3, 9], q: "Quelle est l’aire d’un massif ?" },
  { o: "Une roue de loterie", f: true, p: "secteurs égaux", u: "cm", r: [20, 50], q: "Quelle est l’aire d’un secteur ?" },
  { o: "Une table ronde", f: true, p: "places égales", u: "cm", r: [60, 90], q: "Quelle surface de table a chaque convive ?" },
  { o: "Un vitrail rond", f: false, p: "morceaux égaux", u: "cm", r: [30, 60], q: "Quelle est l’aire d’un morceau ?" },
  { o: "Un rond-point fleuri", f: false, p: "massifs égaux", u: "m", r: [4, 12], q: "Quelle est l’aire d’un massif ?" },
  { o: "Une pelouse ronde", f: true, p: "zones égales", u: "m", r: [3, 8], q: "Quelle est l’aire d’une zone ?" },
  { o: "Un fromage rond", f: false, p: "portions égales", u: "cm", r: [6, 12], q: "Quelle est l’aire du dessus d’une portion ?" },
  { o: "Une salle ronde", f: true, p: "coins égaux", u: "m", r: [6, 14], q: "Quelle surface de sol a chaque coin ?" },
];
const N_PARTS = [3, 4, 5, 6, 8, 9, 10, 12] as const;

export const arcsSecteursBank = [
  /* ===== LONGUEUR D'UN ARC ===== */

  tpl("arc_longueur", 1, 1, "Arc = 2 × π × rayon × angle ÷ 360, puis on garde π.", () => {
    const u = un(UNITES);
    const [r, a] = tirer(SIMPLES, cArc);
    const c = cArc(r, a);
    const text = phrase(
      [
        `Un cercle a un rayon de ${r} ${u}. Un angle au centre de ${a}° intercepte un arc.`,
        `Dans un cercle de rayon ${r} ${u}, un arc correspond à un angle au centre de ${a}°.`,
        `Un arc d’un cercle de rayon ${r} ${u} a pour angle au centre ${a}°.`,
        `Sur un cercle de rayon ${r} ${u}, on trace un arc d’angle au centre ${a}°.`,
        `L’arc AB d’un cercle de centre O et de rayon ${r} ${u} a un angle au centre de ${a}°.`,
        `Un rayon de ${r} ${u} et un angle au centre de ${a}° : voilà un arc.`,
      ],
      FIN_PI.flatMap((f) => [`Donne sa longueur ${f}.`, `Quelle est sa longueur, ${f} ?`]),
    );
    return { text, format: "short", expected: valeurPi(c, u), comparator: "exact_text", canvas: figure(a, { rayon: `${r} ${u}`, angle: `${a}°` }), explanation: expliquer(DEF_ARC, "on calcule la part du cercle, en gardant π.", `2 × ${r} × ${a} ÷ 360 = ${fr(c)}.`, `l’arc mesure ${fr(c)}π ${u}.`) };
  }),

  tpl("arc_longueur", 2, 1, "L’angle sur 360° dit la part du cercle : 90° sur 360°, c’est le quart.", () => {
    const a = un(ANGLES_PARTS);
    const text = un([
      `Un angle au centre de ${a}° intercepte un arc. Quelle part du cercle cet arc représente-t-il ?`,
      `Un arc a un angle au centre de ${a}°. Quelle part du cercle est-ce ?`,
      `Quelle part du cercle représente un arc dont l’angle au centre mesure ${a}° ?`,
      `Un arc de ${a}° : quelle part du cercle fait-il ?`,
      `Dans un cercle, un angle au centre de ${a}° découpe un arc. Quelle part du cercle est-ce ?`,
      `On découpe un cercle selon un angle au centre de ${a}°. L’arc obtenu est quelle part du cercle ?`,
      `L’arc AB correspond à un angle au centre de ${a}°. Quelle part du cercle est-ce ?`,
    ]);
    const juste = `${PARTS[a]} du cercle`;
    return { text, format: "qcm", choices: qcm(juste, ANGLES_PARTS.filter((x) => x !== a).map((x) => `${PARTS[x]} du cercle`)), expected: [juste], comparator: "mcq_exact", canvas: figure(a), explanation: expliquer(DEF_ARC, "on compare l’angle au tour complet de 360°.", `360 ÷ ${a} = ${360 / a}.`, `c’est ${PARTS[a]} du cercle.`) };
  }),

  tpl("arc_longueur", 3, 1, "Arc = longueur du cercle × angle ÷ 360.", () => {
    const u = un(UNITES);
    const a = un(SIMPLES);
    const C = (360 / a) * entre(2, 30);
    const L = (C * a) / 360;
    const text = phrase(
      [
        `Un cercle a une longueur de ${C} ${u}. Un arc correspond à un angle au centre de ${a}°.`,
        `Le tour d’un cercle mesure ${C} ${u}. Un angle au centre de ${a}° y découpe un arc.`,
        `La longueur totale d’un cercle est de ${C} ${u}. On prend l’arc d’angle au centre ${a}°.`,
        `Un cercle fait ${C} ${u} de tour. Sur ce cercle, un arc a un angle au centre de ${a}°.`,
        `Sur un cercle de ${C} ${u} de long, un arc a pour angle au centre ${a}°.`,
      ],
      ["Quelle est la longueur de l’arc ?", "Combien mesure cet arc ?", "Calcule la longueur de l’arc.", "Donne la longueur de l’arc."],
    );
    return { text, format: "short", expected: mesure(L, u), comparator: "number_equal", canvas: figure(a, { angle: `${a}°` }), explanation: expliquer(DEF_ARC, "on prend la part du tour complet.", `${C} × ${a} ÷ 360 = ${fr(L)}.`, `l’arc mesure ${fr(L)} ${u}.`) };
  }),

  tpl("arc_longueur", 4, 1, "On part de la longueur du cercle, 2 × π × r, et on prend la part angle ÷ 360.", () => {
    const u = un(UNITES);
    const r = entre(2, 20);
    const a = un([...SIMPLES, ...AUTRES]);
    const text = phrase(
      [
        `Un cercle a un rayon de ${r} ${u}. Un arc a un angle au centre de ${a}°.`,
        `Dans un cercle de rayon ${r} ${u}, on considère un arc de ${a}°.`,
        `Un arc de ${a}° appartient à un cercle de rayon ${r} ${u}.`,
        `Sur un cercle de rayon ${r} ${u}, un angle au centre de ${a}° découpe un arc.`,
      ],
      ["Quel calcul donne la longueur de l’arc ?", "Lequel de ces calculs donne la longueur de l’arc ?", "Comment calculer la longueur de l’arc ?", "Quel calcul faut-il faire ?"],
    );
    const juste = `2 × π × ${r} × ${a} ÷ 360`;
    return { text, format: "qcm", choices: CALC_ARC(r, a), expected: [juste], comparator: "mcq_exact", canvas: figure(a, { rayon: `${r} ${u}` }), explanation: expliquer(DEF_ARC, "la longueur du cercle, puis la part de l’angle.", juste + ".", `le bon calcul est ${juste}.`) };
  }),

  tpl("arc_longueur", 5, 2, "Calcule 2 × π × r × angle ÷ 360, puis arrondis au dixième.", () => {
    const u = un(UNITES);
    const r = entre(2, 30);
    const a = un([...SIMPLES, ...AUTRES]);
    const L = arrondi(Math.PI * cArc(r, a));
    const text = phrase(
      [
        `Un cercle a un rayon de ${r} ${u}. Un arc a un angle au centre de ${a}°.`,
        `Dans un cercle de rayon ${r} ${u}, un arc correspond à un angle au centre de ${a}°.`,
        `Un arc de ${a}° appartient à un cercle de rayon ${r} ${u}.`,
        `Sur un cercle de rayon ${r} ${u}, on trace un arc d’angle au centre ${a}°.`,
      ],
      ["Donne sa longueur arrondie au dixième.", "Quelle est sa longueur, au dixième près ?", "Calcule une valeur approchée de sa longueur, au dixième.", "Arrondis sa longueur au dixième."],
    );
    return { text, format: "short", expected: mesure(L, u), comparator: "number_equal", canvas: figure(a, { rayon: `${r} ${u}`, angle: `${a}°` }), explanation: expliquer(DEF_ARC, "on calcule, puis on arrondit à la fin seulement.", `2 × π × ${r} × ${a} ÷ 360 ≈ ${fr(L)}.`, `l’arc mesure environ ${fr(L)} ${u}.`) };
  }),

  tpl("arc_longueur", 6, 2, "Le rayon est la moitié du diamètre.", () => {
    const u = un(UNITES);
    const [r, a] = tirer(AUTRES, cArc, 24, 3);
    const c = cArc(r, a);
    const text = phrase(
      [
        `Un cercle a un diamètre de ${2 * r} ${u}. Un arc a un angle au centre de ${a}°.`,
        `Dans un cercle de diamètre ${2 * r} ${u}, un arc correspond à un angle au centre de ${a}°.`,
        `Un arc de ${a}° appartient à un cercle de diamètre ${2 * r} ${u}.`,
        `Sur un cercle de diamètre ${2 * r} ${u}, on trace un arc d’angle au centre ${a}°.`,
      ],
      FIN_PI.flatMap((f) => [`Donne sa longueur ${f}.`, `Quelle est sa longueur, ${f} ?`]),
    );
    return { text, format: "short", expected: valeurPi(c, u), comparator: "exact_text", canvas: figure(a, { angle: a < 180 ? `${a}°` : undefined }), explanation: expliquer(DEF_ARC, `le rayon vaut ${2 * r} ÷ 2 = ${r}.`, `2 × ${r} × ${a} ÷ 360 = ${fr(c)}.`, `l’arc mesure ${fr(c)}π ${u}.`) };
  }),

  tpl("arc_longueur", 7, 2, "Dans un même cercle, l’arc est proportionnel à l’angle.", () => {
    const u = un(UNITES);
    const a1 = un([30, 40, 45, 60, 72, 90, 120]);
    const k = entre(1, 12);
    const L1 = (a1 / 10) * k;
    const a2 = un([20, 30, 50, 60, 80, 100, 135, 150, 180, 210, 240].filter((x) => x !== a1));
    const L2 = (L1 * a2) / a1;
    const text = phrase(
      [
        `Dans un cercle, un arc de ${a1}° mesure ${fr(L1)} ${u}.`,
        `Sur un cercle, l’arc d’angle au centre ${a1}° fait ${fr(L1)} ${u}.`,
        `Un angle au centre de ${a1}° intercepte un arc de ${fr(L1)} ${u}.`,
        `Un arc de ${fr(L1)} ${u} correspond à un angle au centre de ${a1}°.`,
      ],
      [`Sur le même cercle, combien mesure l’arc de ${a2}° ?`, `Dans ce même cercle, quelle est la longueur de l’arc de ${a2}° ?`, `Que mesure l’arc de ${a2}° du même cercle ?`, `Même cercle : calcule l’arc de ${a2}°.`],
    );
    return { text, format: "short", expected: mesure(L2, u), comparator: "number_equal", canvas: figure(a2), explanation: expliquer(DEF_ARC, "un tableau de proportionnalité : angle et arc.", `${fr(L1)} × ${a2} ÷ ${a1} = ${fr(L2)}.`, `l’arc mesure ${fr(L2)} ${u}.`) };
  }),

  tpl("arc_longueur", 8, 2, "Le grand arc complète le petit : 360° moins son angle.", () => {
    const u = un(UNITES);
    const [r, a] = tirer([30, 45, 60, 90, 120, 72, 36, 40, 80, 100, 150], (x, y) => cArc(x, 360 - y));
    const c = cArc(r, 360 - a);
    const text = phrase(
      [
        `Sur un cercle de rayon ${r} ${u}, le petit arc AB a un angle au centre de ${a}°.`,
        `A et B sont sur un cercle de rayon ${r} ${u}, et le petit arc AB correspond à ${a}°.`,
        `Un cercle de rayon ${r} ${u} est coupé en deux arcs par A et B. Le petit arc a un angle de ${a}°.`,
        `Dans un cercle de rayon ${r} ${u}, l’angle au centre du petit arc AB vaut ${a}°.`,
      ],
      ["Donne la longueur du grand arc AB, sous la forme aπ.", "Quelle est la longueur du grand arc, sous la forme aπ ?", "Calcule le grand arc, sous la forme aπ.", "Que mesure le grand arc ? Écris-le sous la forme aπ."],
    );
    return { text, format: "short", expected: valeurPi(c, u), comparator: "exact_text", canvas: figure(360 - a, { rayon: `${r} ${u}` }), explanation: expliquer(DEF_ARC, `l’angle du grand arc vaut 360 − ${a} = ${360 - a}.`, `2 × ${r} × ${360 - a} ÷ 360 = ${fr(c)}.`, `le grand arc mesure ${fr(c)}π ${u}.`) };
  }),

  tpl("arc_longueur", 9, 3, "Angle = 360 × arc ÷ (longueur du cercle).", () => {
    const u = un(UNITES);
    const [r, a] = tirer([...SIMPLES, ...AUTRES], cArc, 24, 3);
    const c = cArc(r, a);
    const text = phrase(
      [
        `Un cercle a un rayon de ${r} ${u}. Un de ses arcs mesure ${fr(c)}π ${u}.`,
        `Sur un cercle de rayon ${r} ${u}, un arc a une longueur de ${fr(c)}π ${u}.`,
        `Dans un cercle de rayon ${r} ${u}, on mesure un arc de ${fr(c)}π ${u}.`,
        `Un arc de ${fr(c)}π ${u} se trouve sur un cercle de rayon ${r} ${u}.`,
      ],
      ["Quel est son angle au centre ?", "Combien mesure son angle au centre ?", "Trouve l’angle au centre de cet arc.", "Calcule son angle au centre."],
    );
    return { text, format: "short", expected: enDegres(a), comparator: "number_equal", canvas: figure(a, { rayon: `${r} ${u}` }), explanation: expliquer(DEF_ARC, "la longueur du cercle, puis la part que l’arc en représente.", `le cercle mesure ${2 * r}π ; ${fr(c)} ÷ ${2 * r} × 360 = ${a}.`, `l’angle au centre mesure ${a}°.`) };
  }),

  tpl("arc_longueur", 10, 3, "Rayon = arc × 180 ÷ (π × angle).", () => {
    const u = un(UNITES);
    const [r, a] = tirer([...SIMPLES, ...AUTRES], cArc, 30, 3);
    const c = cArc(r, a);
    const text = phrase(
      [
        `Un arc de ${a}° mesure ${fr(c)}π ${u}.`,
        `L’arc d’angle au centre ${a}° a une longueur de ${fr(c)}π ${u}.`,
        `Dans un cercle, l’arc de ${a}° fait ${fr(c)}π ${u}.`,
        `Un angle au centre de ${a}° intercepte un arc de ${fr(c)}π ${u}.`,
      ],
      ["Quel est le rayon du cercle ?", "Combien mesure le rayon ?", "Trouve le rayon de ce cercle.", "Calcule le rayon."],
    );
    return { text, format: "short", expected: mesure(r, u), comparator: "number_equal", canvas: figure(a, { angle: a < 180 ? `${a}°` : undefined }), explanation: expliquer(DEF_ARC, "on remonte la formule.", `${fr(c)} × 180 ÷ ${a} = ${r}.`, `le rayon mesure ${r} ${u}.`) };
  }),

  tpl("arc_longueur", 11, 3, "Le rayon et l’angle sont dans le récit : l’arc est le chemin de l’extrémité.", () => {
    const o = un(ARCS);
    const r = entre(o.r[0], o.r[1]);
    const a = un([20, 30, 40, 45, 60, 75, 90, 100, 120, 135, 150]);
    const L = arrondi(Math.PI * cArc(r, a));
    const text = `${o.o(`${r} ${o.u}`, `${a}°`)} ${o.q} ${un(["Arrondis au dixième.", "Donne une valeur approchée au dixième.", "Réponds au dixième près."])}`;
    return { text, format: "short", expected: mesure(L, o.u), comparator: "number_equal", canvas: figure(a, { rayon: `${r} ${o.u}`, angle: `${a}°` }), explanation: expliquer(DEF_ARC, "l’extrémité décrit un arc de cercle.", `2 × π × ${r} × ${a} ÷ 360 ≈ ${fr(L)}.`, `environ ${fr(L)} ${o.u}.`) };
  }),

  tpl("arc_longueur", 12, 3, "En 60 minutes, la grande aiguille fait 360° : chaque minute vaut 6°.", () => {
    const r = entre(4, 40);
    const m = un([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
    const a = 6 * m;
    const u = "cm";
    const L = arrondi(Math.PI * cArc(r, a));
    const o = un([`d’une pendule`, `du beffroi`, `de l’horloge de la gare`, `du réveil`, `de la pendule du salon`, `du clocher du village`, `de l’horloge de la classe`, `de l’horloge du musée`]);
    const text = phrase(
      [
        `La grande aiguille ${o} mesure ${r} ${u}. Elle tourne pendant ${m} minutes.`,
        `Une aiguille des minutes ${o} a une longueur de ${r} ${u}. On attend ${m} minutes.`,
        `En ${m} minutes, la grande aiguille ${o}, longue de ${r} ${u}, avance.`,
      ],
      ["Quelle distance parcourt sa pointe, au dixième près ?", "Calcule le chemin de sa pointe, arrondi au dixième.", "Quelle longueur d’arc décrit sa pointe, au dixième ?"],
    );
    return { text, format: "short", expected: mesure(L, u), comparator: "number_equal", canvas: figure(a, { rayon: `${r} ${u}` }), explanation: expliquer(DEF_ARC, "une minute vaut 6°.", `${m} × 6 = ${a}°, puis 2 × π × ${r} × ${a} ÷ 360 ≈ ${fr(L)}.`, `environ ${fr(L)} ${u}.`) };
  }),

  /* ===== AIRE D'UN SECTEUR ===== */

  tpl("secteur_aire", 1, 1, "Secteur = π × r × r × angle ÷ 360, puis on garde π.", () => {
    const u = un(UNITES);
    const [r, a] = tirer(SIMPLES, cSec, 20);
    const c = cSec(r, a);
    const text = phrase(
      [
        `Un disque a un rayon de ${r} ${u}. Un secteur de ce disque a un angle de ${a}°.`,
        `Dans un disque de rayon ${r} ${u}, un secteur a un angle au centre de ${a}°.`,
        `Un secteur d’un disque de rayon ${r} ${u} a pour angle ${a}°.`,
        `On découpe dans un disque de rayon ${r} ${u} un secteur d’angle ${a}°.`,
        `Un secteur a un rayon de ${r} ${u} et un angle de ${a}°.`,
        `Dans le disque de centre O et de rayon ${r} ${u}, le secteur AOB a un angle de ${a}°.`,
      ],
      FIN_PI.flatMap((f) => [`Donne son aire ${f}.`, `Quelle est son aire, ${f} ?`]),
    );
    return { text, format: "short", expected: valeurPi(c, `${u}²`), comparator: "exact_text", canvas: figure(a, { secteur: true, rayon: `${r} ${u}`, angle: a < 180 ? `${a}°` : undefined }), explanation: expliquer(DEF_SEC, "on calcule la part du disque, en gardant π.", `${r} × ${r} × ${a} ÷ 360 = ${fr(c)}.`, `l’aire est de ${fr(c)}π ${u}².`) };
  }),

  tpl("secteur_aire", 2, 1, "L’angle sur 360° dit la part du disque : 60° sur 360°, c’est le sixième.", () => {
    const a = un(ANGLES_PARTS);
    const text = un([
      `Un secteur a un angle de ${a}°. Quelle part du disque représente-t-il ?`,
      `Quelle part du disque représente un secteur de ${a}° ?`,
      `On découpe dans un disque un secteur d’angle ${a}°. Quelle part du disque est-ce ?`,
      `Un secteur de ${a}° : quelle part du disque fait-il ?`,
      `Dans un disque, un angle au centre de ${a}° délimite un secteur. Quelle part du disque est-ce ?`,
      `Le secteur AOB a un angle de ${a}°. Quelle part du disque est-ce ?`,
      `Sur cette figure, le secteur coloré a un angle de ${a}°. Quelle part du disque est-ce ?`,
    ]);
    const juste = `${PARTS[a]} du disque`;
    return { text, format: "qcm", choices: qcm(juste, ANGLES_PARTS.filter((x) => x !== a).map((x) => `${PARTS[x]} du disque`)), expected: [juste], comparator: "mcq_exact", canvas: figure(a, { secteur: true }), explanation: expliquer(DEF_SEC, "on compare l’angle au tour complet de 360°.", `360 ÷ ${a} = ${360 / a}.`, `c’est ${PARTS[a]} du disque.`) };
  }),

  tpl("secteur_aire", 3, 1, "Secteur = aire du disque × angle ÷ 360.", () => {
    const u = un(UNITES);
    const a = un(SIMPLES);
    const D = (360 / a) * entre(2, 40);
    const S = (D * a) / 360;
    const text = phrase(
      [
        `Un disque a une aire de ${D} ${u}². Un secteur de ce disque a un angle de ${a}°.`,
        `L’aire d’un disque vaut ${D} ${u}². On y découpe un secteur d’angle ${a}°.`,
        `Un disque de ${D} ${u}² contient un secteur de ${a}°.`,
        `Dans un disque d’aire ${D} ${u}², un angle au centre de ${a}° délimite un secteur.`,
        `On prend un secteur de ${a}° dans un disque d’aire ${D} ${u}².`,
      ],
      ["Quelle est l’aire du secteur ?", "Combien vaut l’aire de ce secteur ?", "Calcule l’aire du secteur.", "Donne l’aire du secteur."],
    );
    return { text, format: "short", expected: mesure(S, `${u}²`), comparator: "number_equal", canvas: figure(a, { secteur: true, angle: `${a}°` }), explanation: expliquer(DEF_SEC, "on prend la part de l’aire du disque.", `${D} × ${a} ÷ 360 = ${fr(S)}.`, `le secteur a une aire de ${fr(S)} ${u}².`) };
  }),

  tpl("secteur_aire", 4, 1, "L’aire du disque, π × r × r, puis la part angle ÷ 360.", () => {
    const u = un(UNITES);
    const r = entre(2, 20);
    const a = un([...SIMPLES, ...AUTRES]);
    const text = phrase(
      [
        `Un disque a un rayon de ${r} ${u}. Un secteur a un angle de ${a}°.`,
        `Dans un disque de rayon ${r} ${u}, on considère un secteur de ${a}°.`,
        `Un secteur de ${a}° appartient à un disque de rayon ${r} ${u}.`,
        `On découpe dans un disque de rayon ${r} ${u} un secteur d’angle ${a}°.`,
      ],
      ["Quel calcul donne son aire ?", "Lequel de ces calculs donne son aire ?", "Comment calculer son aire ?", "Quel calcul faut-il faire ?"],
    );
    const juste = `π × ${r} × ${r} × ${a} ÷ 360`;
    return { text, format: "qcm", choices: CALC_SEC(r, a), expected: [juste], comparator: "mcq_exact", canvas: figure(a, { secteur: true, rayon: `${r} ${u}` }), explanation: expliquer(DEF_SEC, "l’aire du disque, puis la part de l’angle.", juste + ".", `le bon calcul est ${juste}.`) };
  }),

  tpl("secteur_aire", 5, 2, "Calcule π × r × r × angle ÷ 360, puis arrondis au dixième.", () => {
    const u = un(UNITES);
    const r = entre(2, 30);
    const a = un([...SIMPLES, ...AUTRES]);
    const S = arrondi(Math.PI * cSec(r, a));
    const text = phrase(
      [
        `Un disque a un rayon de ${r} ${u}. Un secteur a un angle de ${a}°.`,
        `Dans un disque de rayon ${r} ${u}, un secteur a un angle au centre de ${a}°.`,
        `Un secteur de ${a}° appartient à un disque de rayon ${r} ${u}.`,
        `On découpe dans un disque de rayon ${r} ${u} un secteur d’angle ${a}°.`,
      ],
      ["Donne son aire arrondie au dixième.", "Quelle est son aire, au dixième près ?", "Calcule une valeur approchée de son aire, au dixième.", "Arrondis son aire au dixième."],
    );
    return { text, format: "short", expected: mesure(S, `${u}²`), comparator: "number_equal", canvas: figure(a, { secteur: true, rayon: `${r} ${u}` }), explanation: expliquer(DEF_SEC, "on calcule, puis on arrondit à la fin seulement.", `π × ${r} × ${r} × ${a} ÷ 360 ≈ ${fr(S)}.`, `l’aire est d’environ ${fr(S)} ${u}².`) };
  }),

  tpl("secteur_aire", 6, 2, "Le rayon est la moitié du diamètre.", () => {
    const u = un(UNITES);
    const [r, a] = tirer(AUTRES, cSec, 24, 3);
    const c = cSec(r, a);
    const text = phrase(
      [
        `Un disque a un diamètre de ${2 * r} ${u}. Un secteur a un angle de ${a}°.`,
        `Dans un disque de diamètre ${2 * r} ${u}, un secteur a un angle au centre de ${a}°.`,
        `Un secteur de ${a}° appartient à un disque de diamètre ${2 * r} ${u}.`,
        `On découpe dans un disque de diamètre ${2 * r} ${u} un secteur d’angle ${a}°.`,
      ],
      FIN_PI.flatMap((f) => [`Donne son aire ${f}.`, `Quelle est son aire, ${f} ?`]),
    );
    return { text, format: "short", expected: valeurPi(c, `${u}²`), comparator: "exact_text", canvas: figure(a, { secteur: true }), explanation: expliquer(DEF_SEC, `le rayon vaut ${2 * r} ÷ 2 = ${r}.`, `${r} × ${r} × ${a} ÷ 360 = ${fr(c)}.`, `l’aire est de ${fr(c)}π ${u}².`) };
  }),

  tpl("secteur_aire", 7, 2, "Dans un même disque, l’aire du secteur est proportionnelle à l’angle.", () => {
    const u = un(UNITES);
    const a1 = un([30, 40, 45, 60, 72, 90, 120]);
    const k = entre(1, 12);
    const S1 = (a1 / 10) * k;
    const a2 = un([20, 30, 50, 60, 80, 100, 135, 150, 180, 210, 240].filter((x) => x !== a1));
    const S2 = (S1 * a2) / a1;
    const text = phrase(
      [
        `Dans un disque, un secteur de ${a1}° a une aire de ${fr(S1)} ${u}².`,
        `L’aire du secteur de ${a1}° d’un disque vaut ${fr(S1)} ${u}².`,
        `Un secteur d’angle ${a1}° a une aire de ${fr(S1)} ${u}².`,
        `Un secteur de ${fr(S1)} ${u}² correspond à un angle au centre de ${a1}°.`,
      ],
      [`Dans le même disque, quelle est l’aire d’un secteur de ${a2}° ?`, `Que vaut l’aire du secteur de ${a2}° du même disque ?`, `Même disque : calcule l’aire d’un secteur de ${a2}°.`, `Combien vaut un secteur de ${a2}°, dans ce même disque ?`],
    );
    return { text, format: "short", expected: mesure(S2, `${u}²`), comparator: "number_equal", canvas: figure(a2, { secteur: true }), explanation: expliquer(DEF_SEC, "un tableau de proportionnalité : angle et aire.", `${fr(S1)} × ${a2} ÷ ${a1} = ${fr(S2)}.`, `l’aire est de ${fr(S2)} ${u}².`) };
  }),

  tpl("secteur_aire", 8, 2, "Ce qui reste du disque a pour angle 360° moins l’angle retiré.", () => {
    const u = un(UNITES);
    const [r, a] = tirer([30, 45, 60, 90, 120, 72, 36, 40, 80, 100, 150], (x, y) => cSec(x, 360 - y), 20);
    const c = cSec(r, 360 - a);
    const text = phrase(
      [
        `On retire un secteur de ${a}° à un disque de rayon ${r} ${u}.`,
        `Un disque de rayon ${r} ${u} perd un secteur d’angle ${a}°.`,
        `Dans un disque de rayon ${r} ${u}, on enlève un secteur de ${a}°.`,
        `On découpe un secteur de ${a}° dans un disque de rayon ${r} ${u} et on le jette.`,
      ],
      ["Quelle est l’aire de ce qui reste, sous la forme aπ ?", "Donne l’aire restante, sous la forme aπ.", "Calcule l’aire de la partie restante, sous la forme aπ.", "Que vaut l’aire restante ? Écris-la sous la forme aπ."],
    );
    return { text, format: "short", expected: valeurPi(c, `${u}²`), comparator: "exact_text", canvas: figure(360 - a, { secteur: true, rayon: `${r} ${u}` }), explanation: expliquer(DEF_SEC, `il reste un secteur de 360 − ${a} = ${360 - a}°.`, `${r} × ${r} × ${360 - a} ÷ 360 = ${fr(c)}.`, `il reste ${fr(c)}π ${u}².`) };
  }),

  tpl("secteur_aire", 9, 3, "Angle = 360 × aire du secteur ÷ aire du disque.", () => {
    const u = un(UNITES);
    const [r, a] = tirer([...SIMPLES, ...AUTRES], cSec, 20, 3);
    const c = cSec(r, a);
    const text = phrase(
      [
        `Un disque a un rayon de ${r} ${u}. Un de ses secteurs a une aire de ${fr(c)}π ${u}².`,
        `Dans un disque de rayon ${r} ${u}, un secteur couvre ${fr(c)}π ${u}².`,
        `Un secteur d’aire ${fr(c)}π ${u}² appartient à un disque de rayon ${r} ${u}.`,
        `On découpe un secteur de ${fr(c)}π ${u}² dans un disque de rayon ${r} ${u}.`,
      ],
      ["Quel est son angle ?", "Combien mesure son angle au centre ?", "Trouve l’angle de ce secteur.", "Calcule son angle au centre."],
    );
    return { text, format: "short", expected: enDegres(a), comparator: "number_equal", canvas: figure(a, { secteur: true, rayon: `${r} ${u}` }), explanation: expliquer(DEF_SEC, "l’aire du disque, puis la part que représente le secteur.", `le disque vaut ${r * r}π ; ${fr(c)} ÷ ${r * r} × 360 = ${a}.`, `l’angle mesure ${a}°.`) };
  }),

  tpl("secteur_aire", 10, 3, "Rayon × rayon = aire × 360 ÷ (π × angle).", () => {
    const u = un(UNITES);
    const [r, a] = tirer([...SIMPLES, ...AUTRES], cSec, 20, 3);
    const c = cSec(r, a);
    const text = phrase(
      [
        `Un secteur de ${a}° a une aire de ${fr(c)}π ${u}².`,
        `L’aire d’un secteur d’angle ${a}° vaut ${fr(c)}π ${u}².`,
        `Dans un disque, le secteur de ${a}° couvre ${fr(c)}π ${u}².`,
        `Un angle au centre de ${a}° délimite un secteur de ${fr(c)}π ${u}².`,
      ],
      ["Quel est le rayon du disque ?", "Combien mesure le rayon ?", "Trouve le rayon de ce disque.", "Calcule le rayon."],
    );
    return { text, format: "short", expected: mesure(r, u), comparator: "number_equal", canvas: figure(a, { secteur: true }), explanation: expliquer(DEF_SEC, "on remonte : on retrouve rayon × rayon, puis le rayon.", `${fr(c)} × 360 ÷ ${a} = ${r * r}, et ${r} × ${r} = ${r * r}.`, `le rayon mesure ${r} ${u}.`) };
  }),

  tpl("secteur_aire", 11, 3, "Le rayon et l’angle sont dans le récit : la surface est un secteur.", () => {
    const o = un(SECTEURS);
    const r = entre(o.r[0], o.r[1]);
    const a = un([20, 30, 40, 45, 60, 75, 90, 100, 120, 135, 150]);
    const S = arrondi(Math.PI * cSec(r, a));
    const text = `${o.o(`${r} ${o.u}`, `${a}°`)} ${o.q} ${un(["Arrondis au dixième.", "Donne une valeur approchée au dixième.", "Réponds au dixième près."])}`;
    return { text, format: "short", expected: mesure(S, `${o.u}²`), comparator: "number_equal", canvas: figure(a, { secteur: true, rayon: `${r} ${o.u}`, angle: `${a}°` }), explanation: expliquer(DEF_SEC, "la zone est un secteur de disque.", `π × ${r} × ${r} × ${a} ÷ 360 ≈ ${fr(S)}.`, `environ ${fr(S)} ${o.u}².`) };
  }),

  tpl("secteur_aire", 12, 3, "Chaque part vaut l’aire du disque divisée par le nombre de parts.", () => {
    const o = un(PARTAGES);
    const r = entre(o.r[0], o.r[1]);
    const n = un(N_PARTS);
    const S = arrondi((Math.PI * r * r) / n);
    const text = phrase(
      [
        `${o.o} de ${r} ${o.u} de rayon est partagé${o.f ? "e" : ""} en ${n} ${o.p}.`,
        `On partage ${o.o.toLowerCase()} de ${r} ${o.u} de rayon en ${n} ${o.p}.`,
        `${o.o} a un rayon de ${r} ${o.u}. On ${o.f ? "la" : "le"} partage en ${n} ${o.p}.`,
      ],
      [`${o.q} Arrondis au dixième.`, `${o.q} Réponds au dixième près.`, `${o.q} Donne une valeur approchée au dixième.`],
    );
    return { text, format: "short", expected: mesure(S, `${o.u}²`), comparator: "number_equal", canvas: figure(360 / n, { secteur: true, rayon: `${r} ${o.u}` }), explanation: expliquer(DEF_SEC, `chaque part a pour angle 360 ÷ ${n}.`, `π × ${r} × ${r} ÷ ${n} ≈ ${fr(S)}.`, `environ ${fr(S)} ${o.u}².`) };
  }),
];
