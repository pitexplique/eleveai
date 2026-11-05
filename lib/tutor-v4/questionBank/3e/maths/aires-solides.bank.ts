// AIRES LATÉRALES ET TOTALES, AIRE DE LA SPHÈRE (05/11/2026).
//
// Micros partagées par le Maroc, la Suisse, le Québec, la Belgique, le Sénégal et la
// Côte d'Ivoire. Le programme français (`docs/bo-maths-cycle4-recopie.md`) ne garde
// que les VOLUMES de ces solides : notion masquée en France, voir
// `lib/tutor-v4/micros-masquees.ts`.
//
// ⛔ ★1-★2 : phrase courte, sans contexte. Résultats exacts en aπ quand π est gardé.
// ⚠️ Pour le correcteur : les mesures sont TOUJOURS écrites dans l'ordre (rayon ou
// base avant hauteur).

import type { Solide3DCanvasData } from "@/lib/tutor-v4/types";
import { cap, entre, expliquer, fabriqueGabarits, fr, mesure, qcm, un, UNITES, valeurPi } from "@/lib/tutor-v4/questionBank/outils-geometrie";

const tpl = fabriqueGabarits("3e", "aire_solides", ["aire", "solide", "canvas"]);

const fig = (p: Omit<Solide3DCanvasData, "kind">): Solide3DCanvasData => ({ kind: "solide_3d", ...p });
const figCylindre = (r: number, h: number, u: string) =>
  fig({ solide: "cylindre", dimensions: { rayon: r, hauteur: h }, labels: { rayon: `${r} ${u}`, hauteur: `${h} ${u}` }, highlight: { base: false, hauteur: true }, display: { showLabels: true } });
const figCone = (r: number, h: number, u: string, gene?: string) =>
  fig({ solide: "cone", dimensions: { rayon: r, hauteur: h }, labels: gene ? { rayon: `${r} ${u}` } : { rayon: `${r} ${u}`, hauteur: `${h} ${u}` }, highlight: { base: false, hauteur: !gene }, display: { showLabels: true } });
const figPyramide = (h: number, base: string) =>
  fig({ solide: "pyramide", dimensions: { hauteur: h }, labels: { aireBase: base }, highlight: { base: true, hauteur: false }, display: { showLabels: true } });
const figBoule = (r: number, u: string) =>
  fig({ solide: "boule", dimensions: { rayon: r }, labels: { rayon: `${r} ${u}` }, display: { showLabels: true } });

const DEF_PRISME = "l’aire latérale d’un prisme droit est le périmètre de sa base × sa hauteur ; l’aire totale ajoute les deux bases.";
const DEF_CYL = "l’aire latérale d’un cylindre est 2 × π × rayon × hauteur ; l’aire totale ajoute les deux disques de base, π × rayon² chacun.";
const DEF_PYR = "l’aire latérale d’une pyramide régulière est la somme des aires de ses faces triangulaires ; chacune vaut côté × apothème ÷ 2.";
const DEF_CONE = "l’aire latérale d’un cône est π × rayon × génératrice ; l’aire totale ajoute le disque de base.";
const DEF_SPH = "l’aire d’une sphère de rayon r est 4 × π × r².";

const TRIPLETS: [number, number, number][] = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]];

const BOITES = [
  { o: "un coffret en carton", q: "de carton", u: "cm" },
  { o: "une boîte à chaussures", q: "de carton", u: "cm" },
  { o: "un aquarium", q: "de verre", u: "dm" },
  { o: "une caisse en bois", q: "de bois", u: "dm" },
  { o: "un conteneur métallique", q: "de peinture", u: "m" },
  { o: "une valise rigide", q: "de plastique", u: "dm" },
  { o: "un colis", q: "de papier kraft", u: "dm" },
  { o: "une armoire", q: "de vernis", u: "dm" },
  { o: "un paquet de céréales", q: "de carton", u: "cm" },
  { o: "une serre de jardin", q: "de film plastique", u: "m" },
];
const TUBES = [
  { o: "une boîte de conserve", u: "cm", r: [3, 6], h: [8, 15], q: "l’étiquette qui fait le tour" },
  { o: "un rouleau d’essuie-tout", u: "cm", r: [4, 6], h: [20, 28], q: "le papier qui recouvre le côté" },
  { o: "une colonne de temple", u: "dm", r: [3, 8], h: [30, 90], q: "la peinture de son pourtour" },
  { o: "un tambour", u: "cm", r: [15, 25], h: [20, 40], q: "la décoration de son flanc" },
  { o: "un silo à grains", u: "m", r: [3, 8], h: [8, 20], q: "le bardage de son pourtour" },
  { o: "un château d’eau cylindrique", u: "m", r: [5, 10], h: [10, 25], q: "la peinture de son pourtour" },
  { o: "un fût de pétrole", u: "dm", r: [2, 4], h: [8, 12], q: "la peinture de son flanc" },
  { o: "une pile de pièces", u: "mm", r: [10, 15], h: [20, 60], q: "le ruban qui en fait le tour" },
];
const COIFFES = [
  { o: "un chapeau de fête", u: "cm", r: [6, 10], g: [18, 30], q: "de papier" },
  { o: "un tipi", u: "m", r: [2, 3], g: [4, 7], q: "de toile" },
  { o: "le toit conique d’une tour", u: "m", r: [2, 5], g: [6, 10], q: "d’ardoises" },
  { o: "un abat-jour conique", u: "cm", r: [10, 15], g: [20, 30], q: "de tissu" },
  { o: "un cornet de glace", u: "cm", r: [2, 4], g: [10, 14], q: "de gaufrette" },
  { o: "un cône de chantier", u: "cm", r: [10, 15], g: [40, 60], q: "de plastique" },
  { o: "un entonnoir", u: "cm", r: [5, 9], g: [10, 18], q: "de métal" },
  { o: "un chapeau de paille conique", u: "cm", r: [15, 25], g: [30, 45], q: "de paille" },
];
const TOITS_P = [
  { o: "le toit d’un kiosque", u: "m", q: "de tuiles", c: [4, 8], a: [3, 7] },
  { o: "une tente pyramidale", u: "m", q: "de toile", c: [2, 4], a: [2, 4] },
  { o: "le sommet d’un clocher", u: "m", q: "d’ardoises", c: [3, 6], a: [5, 9] },
  { o: "une lampe décorative", u: "cm", q: "de papier", c: [10, 20], a: [12, 24] },
  { o: "un chocolat de Pâques", u: "cm", q: "d’aluminium", c: [4, 8], a: [4, 8] },
  { o: "une serre pyramidale", u: "m", q: "de verre", c: [4, 8], a: [3, 8] },
  { o: "le toit d’une ruche", u: "dm", q: "de zinc", c: [4, 8], a: [3, 6] },
  { o: "une pyramide de verre", u: "m", q: "de vitres", c: [10, 30], a: [12, 24] },
];
const BOULES = [
  { o: "un ballon de basket", u: "cm", r: [11, 13] },
  { o: "une boule de pétanque", u: "cm", r: [3, 4] },
  { o: "une balle de tennis", u: "cm", r: [3, 4] },
  { o: "un globe terrestre", u: "cm", r: [10, 25] },
  { o: "une boule de Noël", u: "cm", r: [3, 6] },
  { o: "un ballon-sonde", u: "m", r: [2, 6] },
  { o: "une citerne sphérique", u: "m", r: [3, 8] },
  { o: "une orange", u: "cm", r: [3, 5] },
  { o: "une montgolfière sphérique", u: "m", r: [7, 12] },
  { o: "une bille géante", u: "cm", r: [4, 9] },
];
const DOMES = [
  { o: "le dôme d’un observatoire", u: "m", r: [4, 12] },
  { o: "un igloo", u: "m", r: [2, 3] },
  { o: "la coupole d’une mosquée", u: "m", r: [5, 15] },
  { o: "un dôme géodésique", u: "m", r: [6, 20] },
  { o: "le couvercle d’une cloche à fromage", u: "cm", r: [10, 16] },
  { o: "un bol hémisphérique", u: "cm", r: [6, 12] },
];

/** Le prisme dont on parle : la nature de sa base ne change pas le calcul, seulement la phrase. */
const prismeVarie = (t: string) => {
  const base = un(["", "", " à base triangulaire", " à base rectangulaire", " à base pentagonale", " à base hexagonale", " à base carrée", " à base trapézoïdale"]);
  return t.replace(/([Pp]risme droit)/g, `$1${base}`);
};
const NOMS_BASE = ["ABC", "DEF", "RST", "KLM", "PQR", "UVW", "XYZ", "EFG"];

export const airesSolidesBank = [
  /* ===== PRISME DROIT ===== */

  tpl("aire_prisme_droit", 1, 1, "Aire latérale = périmètre de la base × hauteur.", () => {
    const u = un(UNITES);
    const p = entre(8, 60);
    const h = entre(2, 25);
    const text = un([
      `Un prisme droit a une base de périmètre ${p} ${u} et une hauteur de ${h} ${u}. Quelle est son aire latérale ?`,
      `Calcule l’aire latérale d’un prisme droit : périmètre de la base ${p} ${u}, hauteur ${h} ${u}.`,
      `Périmètre de la base : ${p} ${u}. Hauteur : ${h} ${u}. Quelle est l’aire latérale de ce prisme droit ?`,
      `Quelle est l’aire latérale d’un prisme droit de périmètre de base ${p} ${u} et de hauteur ${h} ${u} ?`,
      `Prisme droit : périmètre de base ${p} ${u}, hauteur ${h} ${u}. Donne son aire latérale.`,
      `La base d’un prisme droit a un périmètre de ${p} ${u}, sa hauteur vaut ${h} ${u}. Trouve son aire latérale.`,
    ]);
    return { text: prismeVarie(text), format: "short", expected: mesure(p * h, `${u}²`), comparator: "number_equal", canvas: fig({ solide: "prisme", dimensions: { hauteur: h }, labels: { hauteur: `${h} ${u}` }, display: { showLabels: true } }), explanation: expliquer(DEF_PRISME, "on multiplie le périmètre de la base par la hauteur.", `${p} × ${h} = ${p * h}.`, `l’aire latérale est ${p * h} ${u}².`) };
  }),

  tpl("aire_prisme_droit", 2, 1, "Le périmètre de la base est multiplié par la hauteur.", () => {
    const u = un(UNITES);
    const p = entre(8, 60);
    const h = entre(2, 25);
    const juste = `${p} × ${h}`;
    const text = un([
      `Un prisme droit a une base de périmètre ${p} ${u} et une hauteur de ${h} ${u}. Quel calcul donne son aire latérale ?`,
      `Quel calcul donne l’aire latérale d’un prisme droit de périmètre de base ${p} ${u} et de hauteur ${h} ${u} ?`,
      `Périmètre de la base : ${p} ${u}. Hauteur : ${h} ${u}. Choisis le calcul de l’aire latérale.`,
      `Pour ce prisme droit (périmètre de base ${p} ${u}, hauteur ${h} ${u}), quel calcul faut-il faire pour l’aire latérale ?`,
      `Parmi ces calculs, lequel donne l’aire latérale d’un prisme droit de périmètre de base ${p} ${u} et de hauteur ${h} ${u} ?`,
    ]);
    return { text: prismeVarie(text), format: "qcm", choices: qcm(juste, [`${p} + ${h}`, `${p} × ${h} ÷ 2`, `${p} × ${h} ÷ 3`, `2 × (${p} + ${h})`]), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_PRISME, "la face latérale déroulée est un rectangle : le périmètre de la base en longueur, la hauteur en largeur.", juste + ".", `le bon calcul est ${juste}.`) };
  }),

  tpl("aire_prisme_droit", 3, 2, "Commence par le périmètre du triangle de base : on ajoute ses trois côtés.", () => {
    const u = un(UNITES);
    const a = entre(4, 12);
    const b = entre(4, 12);
    const c = entre(Math.abs(a - b) + 1, a + b - 1);
    const h = entre(3, 20);
    const P = a + b + c;
    const T = un(NOMS_BASE);
    const text = un([
      `La base d’un prisme droit est le triangle ${T}, de côtés ${a} ${u}, ${b} ${u} et ${c} ${u}. Sa hauteur est ${h} ${u}. Quelle est son aire latérale ?`,
      `Triangle ${T} de côtés ${a} ${u}, ${b} ${u}, ${c} ${u} : c’est la base d’un prisme droit de hauteur ${h} ${u}. Calcule son aire latérale.`,
      `Un prisme droit a pour base le triangle ${T}, de côtés ${a} ${u}, ${b} ${u}, ${c} ${u}, et pour hauteur ${h} ${u}. Donne son aire latérale.`,
      `Un prisme droit a pour base un triangle de côtés ${a} ${u}, ${b} ${u} et ${c} ${u}. Sa hauteur est ${h} ${u}. Quelle est son aire latérale ?`,
      `Base : triangle de côtés ${a} ${u}, ${b} ${u}, ${c} ${u}. Hauteur du prisme droit : ${h} ${u}. Calcule son aire latérale.`,
      `Calcule l’aire latérale d’un prisme droit dont la base triangulaire a pour côtés ${a} ${u}, ${b} ${u}, ${c} ${u}, et de hauteur ${h} ${u}.`,
      `Prisme droit à base triangulaire (${a} ${u}, ${b} ${u}, ${c} ${u}) et de hauteur ${h} ${u} : donne son aire latérale.`,
      `Le triangle de base d’un prisme droit mesure ${a} ${u}, ${b} ${u} et ${c} ${u}. Avec une hauteur de ${h} ${u}, quelle est l’aire latérale ?`,
    ]);
    return { text, format: "short", expected: mesure(P * h, `${u}²`), comparator: "number_equal", explanation: expliquer(DEF_PRISME, "on calcule le périmètre du triangle, puis on multiplie par la hauteur.", `${a} + ${b} + ${c} = ${P}, puis ${P} × ${h} = ${P * h}.`, `l’aire latérale est ${P * h} ${u}².`) };
  }),

  tpl("aire_prisme_droit", 4, 2, "Aire totale = aire latérale + 2 × aire d’une base.", () => {
    const u = un(UNITES);
    const L = entre(30, 300);
    const B = entre(6, 80);
    const text = un([
      `Un prisme droit a une aire latérale de ${L} ${u}² et une base de ${B} ${u}². Quelle est son aire totale ?`,
      `Aire latérale : ${L} ${u}². Aire d’une base : ${B} ${u}². Calcule l’aire totale de ce prisme droit.`,
      `Quelle est l’aire totale d’un prisme droit d’aire latérale ${L} ${u}², dont chaque base mesure ${B} ${u}² ?`,
      `Prisme droit : aire latérale ${L} ${u}², aire de la base ${B} ${u}². Donne son aire totale.`,
      `L’aire latérale d’un prisme droit vaut ${L} ${u}² et chacune de ses bases ${B} ${u}². Trouve son aire totale.`,
      `Calcule l’aire totale d’un prisme droit : aire latérale ${L} ${u}², base ${B} ${u}².`,
    ]);
    return { text: prismeVarie(text), format: "short", expected: mesure(L + 2 * B, `${u}²`), comparator: "number_equal", explanation: expliquer(DEF_PRISME, "un prisme a DEUX bases.", `${L} + 2 × ${B} = ${L + 2 * B}.`, `l’aire totale est ${L + 2 * B} ${u}².`) };
  }),

  tpl("aire_prisme_droit", 5, 3, "Six faces rectangulaires, deux par deux égales.", () => {
    const B = un(BOITES);
    const L = entre(3, 12) * (B.u === "cm" ? 2 : 1);
    const l = entre(2, Math.max(2, L - 1));
    const h = entre(2, 10);
    const A = 2 * (L * l + L * h + l * h);
    const text = un([
      `On fabrique ${B.o} en forme de pavé droit de ${L} ${B.u} sur ${l} ${B.u} et ${h} ${B.u} de haut. Quelle surface ${B.q} faut-il, en comptant les six faces ?`,
      `${cap(B.o)} a la forme d’un pavé droit : ${L} ${B.u}, ${l} ${B.u} et ${h} ${B.u}. Quelle est son aire totale ?`,
      `Quelle surface ${B.q} faut-il pour couvrir toutes les faces d’${B.o}, pavé droit de ${L} ${B.u} × ${l} ${B.u} × ${h} ${B.u} ?`,
    ]);
    return { text, format: "short", expected: mesure(A, `${B.u}²`), comparator: "number_equal", canvas: fig({ solide: "pave_droit", dimensions: { longueur: L, largeur: l, hauteur: h }, labels: { longueur: `${L} ${B.u}`, largeur: `${l} ${B.u}`, hauteur: `${h} ${B.u}` }, display: { showLabels: true } }), explanation: expliquer(DEF_PRISME, "un pavé est un prisme droit à base rectangulaire : aire latérale + deux bases.", `périmètre de base : 2 × (${L} + ${l}) = ${2 * (L + l)} ; aire latérale : ${2 * (L + l)} × ${h} = ${2 * (L + l) * h} ; bases : 2 × ${L} × ${l} = ${2 * L * l} ; total : ${A}.`, `il faut ${A} ${B.u}².`) };
  }),

  tpl("aire_prisme_droit", 6, 3, "Sans couvercle, une seule base compte.", () => {
    const O = un([
      ["un bac à fleurs", "de plastique", "dm"], ["un aquarium", "de verre", "dm"], ["une piscine", "de carrelage", "m"], ["un bassin", "de carrelage", "m"],
      ["une jardinière", "de bois", "dm"], ["un tiroir", "de bois", "cm"], ["une boîte à outils", "de métal", "dm"], ["un bac à sable", "de bois", "m"],
    ] as const);
    const L = entre(3, 12);
    const l = entre(2, L);
    const h = entre(1, 8);
    const A = 2 * (L + l) * h + L * l;
    const text = un([
      `${cap(O[0])}, ouvert en haut, mesure ${L} ${O[2]} sur ${l} ${O[2]} et ${h} ${O[2]} de profondeur. Quelle surface ${O[1]} faut-il ?`,
      `On construit ${O[0]} sans couvercle : ${L} ${O[2]} de long, ${l} ${O[2]} de large, ${h} ${O[2]} de haut. Calcule la surface ${O[1]} nécessaire.`,
      `Quelle surface ${O[1]} faut-il pour ${O[0]} sans dessus, de ${L} ${O[2]} sur ${l} ${O[2]} et de ${h} ${O[2]} de haut ?`,
    ]);
    return { text: text.replace(/(Une? [^,]*), ouvert/, (m) => (m.startsWith("Une") ? m.replace(", ouvert", ", ouverte") : m)), format: "short", expected: mesure(A, `${O[2]}²`), comparator: "number_equal", explanation: expliquer(DEF_PRISME, "aire latérale + UNE seule base, puisque le dessus est ouvert.", `2 × (${L} + ${l}) × ${h} = ${2 * (L + l) * h}, puis ${2 * (L + l) * h} + ${L} × ${l} = ${A}.`, `il faut ${A} ${O[2]}².`) };
  }),

  tpl("aire_prisme_droit", 7, 4, "Aire latérale = périmètre × hauteur, donc hauteur = aire latérale ÷ périmètre.", () => {
    const u = un(UNITES);
    const p = entre(6, 40);
    const h = entre(3, 25);
    const text = un([
      `Un prisme droit a une aire latérale de ${p * h} ${u}² et une base de périmètre ${p} ${u}. Quelle est sa hauteur ?`,
      `Aire latérale : ${p * h} ${u}². Périmètre de la base : ${p} ${u}. Calcule la hauteur de ce prisme droit.`,
      `Quelle hauteur a un prisme droit d’aire latérale ${p * h} ${u}² et de périmètre de base ${p} ${u} ?`,
      `L’aire latérale d’un prisme droit vaut ${p * h} ${u}², le périmètre de sa base ${p} ${u}. Trouve sa hauteur.`,
      `On connaît l’aire latérale d’un prisme droit, ${p * h} ${u}², et le périmètre de sa base, ${p} ${u}. Combien mesure sa hauteur ?`,
    ]);
    return { text: prismeVarie(text), format: "short", expected: mesure(h, u), comparator: "number_equal", explanation: expliquer(DEF_PRISME, "on divise l’aire latérale par le périmètre.", `${p * h} ÷ ${p} = ${h}.`, `la hauteur est ${h} ${u}.`) };
  }),

  tpl("aire_prisme_droit", 8, 4, "La base est un triangle rectangle : son aire est le demi-produit des côtés de l’angle droit.", () => {
    const u = un(UNITES);
    const [x, y, z] = un(TRIPLETS);
    const h = entre(3, 20);
    const P = x + y + z;
    const A = P * h + x * y;
    const text = un([
      `Un prisme droit a pour base un triangle rectangle de côtés ${x} ${u}, ${y} ${u} et ${z} ${u}. Sa hauteur est ${h} ${u}. Quelle est son aire totale ?`,
      `Base : triangle rectangle de côtés ${x} ${u}, ${y} ${u}, ${z} ${u}. Hauteur du prisme droit : ${h} ${u}. Calcule son aire totale.`,
      `Calcule l’aire totale d’un prisme droit de hauteur ${h} ${u} : sa base est un triangle rectangle, de côtés ${x} ${u}, ${y} ${u}, ${z} ${u}.`,
      `Quelle est l’aire totale de ce prisme droit ? Base en triangle rectangle : ${x} ${u}, ${y} ${u}, ${z} ${u} ; hauteur : ${h} ${u}.`,
    ]);
    return { text, format: "short", expected: mesure(A, `${u}²`), comparator: "number_equal", explanation: expliquer(DEF_PRISME, "aire latérale, puis deux bases : deux triangles rectangles font un rectangle.", `${P} × ${h} = ${P * h} ; 2 × (${x} × ${y} ÷ 2) = ${x * y} ; ${P * h} + ${x * y} = ${A}.`, `l’aire totale est ${A} ${u}².`) };
  }),

  /* ===== CYLINDRE ===== */

  tpl("aire_cylindre", 1, 1, "Aire latérale = 2 × π × rayon × hauteur.", () => {
    const u = un(UNITES);
    const r = entre(2, 12);
    const h = entre(2, 20);
    const debut = un([
      `Un cylindre a un rayon de ${r} ${u} et une hauteur de ${h} ${u}.`,
      `Rayon : ${r} ${u}. Hauteur : ${h} ${u}.`,
      `Voici un cylindre de rayon ${r} ${u} et de hauteur ${h} ${u}.`,
      `Cylindre : rayon ${r} ${u}, hauteur ${h} ${u}.`,
      `La base d’un cylindre a pour rayon ${r} ${u}. Sa hauteur vaut ${h} ${u}.`,
    ]);
    const fin = un(["Calcule son aire latérale, sous la forme aπ.", "Quelle est son aire latérale ? Écris-la sous la forme aπ.", "Donne la valeur exacte de l’aire latérale, sous la forme aπ.", "Écris l’aire latérale sous la forme aπ."]);
    const a = 2 * r * h;
    return { text: `${debut} ${fin}`, format: "short", expected: valeurPi(a, `${u}²`), comparator: "exact_text", canvas: figCylindre(r, h, u), explanation: expliquer(DEF_CYL, "on calcule 2 × rayon × hauteur et on garde π.", `2 × ${r} × ${h} = ${a}.`, `l’aire latérale est ${a}π ${u}².`) };
  }),

  tpl("aire_cylindre", 2, 1, "Le flanc déroulé est un rectangle : le tour de la base × la hauteur.", () => {
    const u = un(UNITES);
    const r = entre(2, 12);
    const h = entre(3, 20);
    const juste = `2 × π × ${r} × ${h}`;
    const text = un([
      `Un cylindre a un rayon de ${r} ${u} et une hauteur de ${h} ${u}. Quel calcul donne son aire latérale ?`,
      `Quel calcul donne l’aire latérale d’un cylindre de rayon ${r} ${u} et de hauteur ${h} ${u} ?`,
      `Rayon : ${r} ${u}. Hauteur : ${h} ${u}. Quel calcul donne l’aire latérale du cylindre ?`,
      `Choisis le bon calcul de l’aire latérale : cylindre de rayon ${r} ${u}, hauteur ${h} ${u}.`,
      `Parmi ces calculs, lequel donne l’aire latérale d’un cylindre de rayon ${r} ${u} et de hauteur ${h} ${u} ?`,
    ]);
    return { text, format: "qcm", choices: qcm(juste, [`π × ${r} × ${r} × ${h}`, `π × ${r} × ${h}`, `2 × π × ${r} × ${r}`, `π × ${r} × ${h} ÷ 3`]), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_CYL, "le tour de la base mesure 2 × π × rayon, et on multiplie par la hauteur. π × r² × h, c’est le volume.", juste + ".", `le bon calcul est ${juste}.`) };
  }),

  tpl("aire_cylindre", 3, 2, "Le rayon est la moitié du diamètre.", () => {
    const u = un(UNITES);
    const r = entre(2, 10);
    const h = entre(2, 20);
    const debut = un([
      `Un cylindre a une base de diamètre ${2 * r} ${u} et une hauteur de ${h} ${u}.`,
      `Diamètre de la base : ${2 * r} ${u}. Hauteur : ${h} ${u}.`,
      `La base d’un cylindre mesure ${2 * r} ${u} de diamètre. Sa hauteur vaut ${h} ${u}.`,
      `Cylindre : diamètre ${2 * r} ${u}, hauteur ${h} ${u}.`,
    ]);
    const fin = un(["Calcule son aire latérale, sous la forme aπ.", "Quelle est son aire latérale ? Écris-la sous la forme aπ.", "Donne l’aire latérale exacte, sous la forme aπ.", "Écris l’aire latérale sous la forme aπ."]);
    const a = 2 * r * h;
    return { text: `${debut} ${fin}`, format: "short", expected: valeurPi(a, `${u}²`), comparator: "exact_text", canvas: figCylindre(r, h, u), explanation: expliquer(DEF_CYL, `le rayon vaut ${2 * r} ÷ 2 = ${r}.`, `2 × ${r} × ${h} = ${a}.`, `l’aire latérale est ${a}π ${u}².`) };
  }),

  tpl("aire_cylindre", 4, 2, "Aire totale = aire latérale + deux disques.", () => {
    const u = un(UNITES);
    const r = entre(2, 10);
    const h = entre(2, 20);
    const debut = un([
      `Un cylindre a un rayon de ${r} ${u} et une hauteur de ${h} ${u}.`,
      `Rayon : ${r} ${u}. Hauteur : ${h} ${u}.`,
      `Voici un cylindre de rayon ${r} ${u} et de hauteur ${h} ${u}.`,
      `Cylindre : rayon ${r} ${u}, hauteur ${h} ${u}.`,
    ]);
    const fin = un(["Calcule son aire totale, sous la forme aπ.", "Quelle est son aire totale ? Écris-la sous la forme aπ.", "Donne la valeur exacte de l’aire totale, sous la forme aπ.", "Écris l’aire totale sous la forme aπ."]);
    const a = 2 * r * h + 2 * r * r;
    return { text: `${debut} ${fin}`, format: "short", expected: valeurPi(a, `${u}²`), comparator: "exact_text", canvas: figCylindre(r, h, u), explanation: expliquer(DEF_CYL, "aire latérale, plus les deux disques de base.", `2 × ${r} × ${h} = ${2 * r * h} ; 2 × ${r} × ${r} = ${2 * r * r} ; total ${a}.`, `l’aire totale est ${a}π ${u}².`) };
  }),

  tpl("aire_cylindre", 5, 3, "Le pourtour du cylindre, c’est son aire latérale, sans les disques.", () => {
    const T = un(TUBES);
    const r = entre(T.r[0], T.r[1]);
    const h = entre(T.h[0], T.h[1]);
    const V = Math.round(2 * r * h * 314) / 100;
    const text = un([
      `Pour ${T.o} de rayon ${r} ${T.u} et de hauteur ${h} ${T.u}, on prévoit ${T.q}. Quelle aire cela représente-t-il ? Prends π ≈ 3,14.`,
      `${cap(T.o)} a la forme d’un cylindre : rayon ${r} ${T.u}, hauteur ${h} ${T.u}. Quelle est son aire latérale, avec π ≈ 3,14 ?`,
      `Rayon ${r} ${T.u}, hauteur ${h} ${T.u} : voilà ${T.o}. Prends π ≈ 3,14 et calcule l’aire de son flanc.`,
    ]);
    return { text, format: "short", expected: mesure(V, `${T.u}²`), comparator: "number_equal", canvas: figCylindre(r, h, T.u), explanation: expliquer(DEF_CYL, "seule l’aire latérale compte ici.", `2 × 3,14 × ${r} × ${h} = ${fr(V)}.`, `il faut prévoir ${fr(V)} ${T.u}².`) };
  }),

  tpl("aire_cylindre", 6, 3, "Une seule base si le récipient est ouvert.", () => {
    const O = un([
      ["un pot de fleurs cylindrique", "cm"], ["un seau cylindrique", "cm"], ["une casserole", "cm"], ["un gobelet", "cm"],
      ["une citerne cylindrique", "m"], ["un réservoir cylindrique", "m"], ["une boîte cylindrique", "cm"], ["un bassin rond", "m"],
    ] as const);
    const r = entre(2, 12);
    const h = entre(2, 20);
    const a = 2 * r * h + r * r;
    const text = un([
      `${cap(O[0])}, sans couvercle, a un rayon de ${r} ${O[1]} et une hauteur de ${h} ${O[1]}. Quelle est l’aire de sa surface, sous la forme aπ ?`,
      `On peint l’extérieur d’${O[0]} sans couvercle : rayon ${r} ${O[1]}, hauteur ${h} ${O[1]}. Quelle aire faut-il peindre, sous la forme aπ ?`,
      `Quelle surface de métal faut-il pour ${O[0]} sans couvercle, de rayon ${r} ${O[1]} et de hauteur ${h} ${O[1]} ? Écris-la sous la forme aπ.`,
    ]);
    return { text, format: "short", expected: valeurPi(a, `${O[1]}²`), comparator: "exact_text", explanation: expliquer(DEF_CYL, "aire latérale, plus UN seul disque.", `2 × ${r} × ${h} = ${2 * r * h} ; ${r} × ${r} = ${r * r} ; total ${a}.`, `l’aire est ${a}π ${O[1]}².`) };
  }),

  tpl("aire_cylindre", 7, 4, "2 × π × r × h = aire latérale : on retrouve h en divisant.", () => {
    const u = un(UNITES);
    const r = entre(2, 10);
    const h = entre(3, 20);
    const a = 2 * r * h;
    const text = un([
      `Un cylindre a une aire latérale de ${a}π ${u}² et un rayon de ${r} ${u}. Quelle est sa hauteur ?`,
      `Aire latérale d’un cylindre : ${a}π ${u}². Rayon : ${r} ${u}. Calcule sa hauteur.`,
      `L’aire latérale d’un cylindre vaut ${a}π ${u}² et sa base a pour rayon ${r} ${u}. Trouve sa hauteur.`,
      `Quelle hauteur a un cylindre d’aire latérale ${a}π ${u}² et de rayon ${r} ${u} ?`,
      `Un cylindre de rayon ${r} ${u} a une aire latérale de ${a}π ${u}². Combien mesure sa hauteur ?`,
    ]);
    return { text, format: "short", expected: mesure(h, u), comparator: "number_equal", explanation: expliquer(DEF_CYL, "on divise le coefficient par 2 × rayon.", `${a} ÷ (2 × ${r}) = ${h}.`, `la hauteur est ${h} ${u}.`) };
  }),

  tpl("aire_cylindre", 8, 4, "Rayon et hauteur comptent chacun une fois dans l’aire latérale.", () => {
    const u = un(UNITES);
    const a = entre(4, 60);
    const cas = un([
      { t: "On double sa hauteur sans changer son rayon.", k: 2 },
      { t: "On triple sa hauteur sans changer son rayon.", k: 3 },
      { t: "On double son rayon sans changer sa hauteur.", k: 2 },
      { t: "On triple son rayon sans changer sa hauteur.", k: 3 },
      { t: "On double son rayon et sa hauteur.", k: 4 },
    ]);
    const debut = un([`Un cylindre a une aire latérale de ${a} ${u}².`, `L’aire latérale d’un cylindre est ${a} ${u}².`, `On part d’un cylindre d’aire latérale ${a} ${u}².`, `Voici un cylindre dont le flanc mesure ${a} ${u}².`]);
    const fin = un(["Quelle est sa nouvelle aire latérale ?", "Que vaut maintenant son aire latérale ?", "Combien vaut son aire latérale maintenant ?"]);
    return { text: `${debut} ${cas.t} ${fin}`, format: "short", expected: mesure(a * cas.k, `${u}²`), comparator: "number_equal", explanation: expliquer(DEF_CYL, "dans 2 × π × r × h, le rayon et la hauteur comptent chacun une fois.", `${a} × ${cas.k} = ${a * cas.k}.`, `la nouvelle aire latérale est ${a * cas.k} ${u}².`) };
  }),

  /* ===== PYRAMIDE RÉGULIÈRE ET CÔNE ===== */

  tpl("aire_pyramide_cone", 1, 1, "Quatre triangles égaux : côté × apothème ÷ 2 pour chacun.", () => {
    const u = un(UNITES);
    const c = entre(2, 16);
    const a = entre(Math.floor(c / 2) + 1, 20);
    const A = 2 * c * a;
    const text = un([
      `Une pyramide régulière à base carrée a un côté de ${c} ${u} et un apothème de ${a} ${u}. Quelle est son aire latérale ?`,
      `Calcule l’aire latérale d’une pyramide régulière à base carrée : côté ${c} ${u}, apothème ${a} ${u}.`,
      `Côté de la base carrée : ${c} ${u}. Apothème : ${a} ${u}. Quelle est l’aire latérale de cette pyramide régulière ?`,
      `Pyramide régulière à base carrée, côté ${c} ${u}, apothème ${a} ${u}. Donne son aire latérale.`,
      `Quelle est l’aire latérale d’une pyramide régulière de base carrée de côté ${c} ${u}, d’apothème ${a} ${u} ?`,
    ]);
    return { text, format: "short", expected: mesure(A, `${u}²`), comparator: "number_equal", canvas: figPyramide(a, `côté ${c} ${u}`), explanation: expliquer(DEF_PYR, "il y a quatre faces triangulaires égales, de base le côté et de hauteur l’apothème.", `${c} × ${a} ÷ 2 = ${fr((c * a) / 2)}, puis ${fr((c * a) / 2)} × 4 = ${A}.`, `l’aire latérale est ${A} ${u}².`) };
  }),

  tpl("aire_pyramide_cone", 2, 1, "Aire latérale d’un cône = π × rayon × génératrice.", () => {
    const u = un(UNITES);
    const r = entre(2, 12);
    const g = entre(r + 1, r + 12);
    const debut = un([
      `Un cône a un rayon de ${r} ${u} et une génératrice de ${g} ${u}.`,
      `Rayon : ${r} ${u}. Génératrice : ${g} ${u}.`,
      `Voici un cône de rayon ${r} ${u} et de génératrice ${g} ${u}.`,
      `Cône : rayon ${r} ${u}, génératrice ${g} ${u}.`,
    ]);
    const fin = un(["Calcule son aire latérale, sous la forme aπ.", "Quelle est son aire latérale ? Écris-la sous la forme aπ.", "Donne la valeur exacte de l’aire latérale, sous la forme aπ.", "Écris l’aire latérale sous la forme aπ."]);
    return { text: `${debut} ${fin}`, format: "short", expected: valeurPi(r * g, `${u}²`), comparator: "exact_text", canvas: figCone(r, g, u, `génératrice ${g} ${u}`), explanation: expliquer(DEF_CONE, "on calcule rayon × génératrice et on garde π.", `${r} × ${g} = ${r * g}.`, `l’aire latérale est ${r * g}π ${u}².`) };
  }),

  tpl("aire_pyramide_cone", 3, 2, "Ajoute l’aire du carré de base aux quatre faces.", () => {
    const u = un(UNITES);
    const c = entre(2, 14);
    const a = entre(Math.floor(c / 2) + 1, 18);
    const A = 2 * c * a + c * c;
    const text = un([
      `Une pyramide régulière à base carrée a un côté de ${c} ${u} et un apothème de ${a} ${u}. Quelle est son aire totale ?`,
      `Calcule l’aire totale d’une pyramide régulière à base carrée : côté ${c} ${u}, apothème ${a} ${u}.`,
      `Côté de la base : ${c} ${u}. Apothème : ${a} ${u}. Donne l’aire totale de cette pyramide régulière à base carrée.`,
      `Pyramide régulière à base carrée, côté ${c} ${u}, apothème ${a} ${u}. Trouve son aire totale.`,
    ]);
    return { text, format: "short", expected: mesure(A, `${u}²`), comparator: "number_equal", canvas: figPyramide(a, `côté ${c} ${u}`), explanation: expliquer(DEF_PYR, "aire latérale, plus l’aire de la base (une seule).", `4 × ${c} × ${a} ÷ 2 = ${2 * c * a} ; ${c} × ${c} = ${c * c} ; total ${A}.`, `l’aire totale est ${A} ${u}².`) };
  }),

  tpl("aire_pyramide_cone", 4, 2, "Aire totale du cône = π × r × g + π × r².", () => {
    const u = un(UNITES);
    const r = entre(2, 10);
    const g = entre(r + 1, r + 10);
    const debut = un([
      `Un cône a un rayon de ${r} ${u} et une génératrice de ${g} ${u}.`,
      `Rayon : ${r} ${u}. Génératrice : ${g} ${u}.`,
      `Voici un cône de rayon ${r} ${u} et de génératrice ${g} ${u}.`,
      `Cône : rayon ${r} ${u}, génératrice ${g} ${u}.`,
    ]);
    const fin = un(["Calcule son aire totale, sous la forme aπ.", "Quelle est son aire totale ? Écris-la sous la forme aπ.", "Donne la valeur exacte de l’aire totale, sous la forme aπ.", "Écris l’aire totale sous la forme aπ."]);
    const a = r * g + r * r;
    return { text: `${debut} ${fin}`, format: "short", expected: valeurPi(a, `${u}²`), comparator: "exact_text", canvas: figCone(r, g, u, `génératrice ${g} ${u}`), explanation: expliquer(DEF_CONE, "aire latérale, plus le disque de base.", `${r} × ${g} = ${r * g} ; ${r} × ${r} = ${r * r} ; total ${a}.`, `l’aire totale est ${a}π ${u}².`) };
  }),

  tpl("aire_pyramide_cone", 5, 2, "Le rayon est multiplié par la génératrice, pas par la hauteur.", () => {
    const u = un(UNITES);
    const r = entre(3, 12);
    const g = entre(r + 1, r + 12);
    const juste = `π × ${r} × ${g}`;
    const text = un([
      `Un cône a un rayon de ${r} ${u} et une génératrice de ${g} ${u}. Quel calcul donne son aire latérale ?`,
      `Quel calcul donne l’aire latérale d’un cône de rayon ${r} ${u} et de génératrice ${g} ${u} ?`,
      `Rayon : ${r} ${u}. Génératrice : ${g} ${u}. Choisis le calcul de l’aire latérale du cône.`,
      `Parmi ces calculs, lequel donne l’aire latérale d’un cône de rayon ${r} ${u} et de génératrice ${g} ${u} ?`,
    ]);
    return { text, format: "qcm", choices: qcm(juste, [`π × ${r} × ${r} × ${g}`, `2 × π × ${r} × ${g}`, `π × ${r} × ${r}`, `π × ${r} × ${g} ÷ 3`]), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_CONE, "on multiplie π, le rayon et la génératrice.", juste + ".", `le bon calcul est ${juste}.`) };
  }),

  tpl("aire_pyramide_cone", 6, 3, "Seules les quatre faces sont à couvrir : la base reste au sol.", () => {
    const T = un(TOITS_P);
    const c = entre(T.c[0], T.c[1]);
    const a = Math.max(entre(T.a[0], T.a[1]), Math.floor(c / 2) + 1);
    const A = 2 * c * a;
    const text = un([
      `${cap(T.o)} est une pyramide régulière à base carrée : côté ${c} ${T.u}, apothème ${a} ${T.u}. Quelle surface ${T.q} couvre ses quatre faces ?`,
      `On habille ${T.o}, pyramide à base carrée de côté ${c} ${T.u} et d’apothème ${a} ${T.u}. Quelle surface ${T.q} faut-il, sans la base ?`,
      `Pour couvrir ${T.o} (pyramide régulière, base carrée de ${c} ${T.u}, apothème ${a} ${T.u}), quelle surface ${T.q} faut-il ?`,
    ]);
    return { text, format: "short", expected: mesure(A, `${T.u}²`), comparator: "number_equal", canvas: figPyramide(a, `côté ${c} ${T.u}`), explanation: expliquer(DEF_PYR, "quatre triangles, de base le côté et de hauteur l’apothème.", `4 × ${c} × ${a} ÷ 2 = ${A}.`, `il faut ${A} ${T.u}².`) };
  }),

  tpl("aire_pyramide_cone", 7, 3, "La surface du cône, sans sa base : π × r × g.", () => {
    const C = un(COIFFES);
    const r = entre(C.r[0], C.r[1]);
    const g = entre(C.g[0], C.g[1]);
    const text = un([
      `${cap(C.o)} a la forme d’un cône de rayon ${r} ${C.u} et de génératrice ${g} ${C.u}. Quelle surface ${C.q} faut-il, sous la forme aπ ?`,
      `On fabrique ${C.o} : rayon ${r} ${C.u}, génératrice ${g} ${C.u}, sans base. Calcule la surface ${C.q}, sous la forme aπ.`,
      `Quelle surface ${C.q} couvre ${C.o} de rayon ${r} ${C.u} et de génératrice ${g} ${C.u} ? Écris-la sous la forme aπ.`,
    ]);
    return { text, format: "short", expected: valeurPi(r * g, `${C.u}²`), comparator: "exact_text", canvas: figCone(r, g, C.u, `génératrice ${g} ${C.u}`), explanation: expliquer(DEF_CONE, "seule l’aire latérale compte.", `${r} × ${g} = ${r * g}.`, `il faut ${r * g}π ${C.u}².`) };
  }),

  tpl("aire_pyramide_cone", 8, 4, "Rayon, hauteur et génératrice forment un triangle rectangle : Pythagore donne g.", () => {
    const u = un(UNITES);
    const [r, h, g] = un(TRIPLETS);
    const debut = un([
      `Un cône a un rayon de ${r} ${u} et une hauteur de ${h} ${u}.`,
      `Rayon : ${r} ${u}. Hauteur : ${h} ${u}.`,
      `Voici un cône de rayon ${r} ${u} et de hauteur ${h} ${u}.`,
      `Cône : rayon ${r} ${u}, hauteur ${h} ${u}.`,
    ]);
    const fin = un(["Calcule son aire latérale, sous la forme aπ.", "Quelle est son aire latérale ? Écris-la sous la forme aπ.", "Trouve la génératrice, puis écris l’aire latérale sous la forme aπ."]);
    return { text: `${debut} ${fin}`, format: "short", expected: valeurPi(r * g, `${u}²`), comparator: "exact_text", canvas: figCone(r, h, u), explanation: expliquer(DEF_CONE, "le rayon, la hauteur et la génératrice forment un triangle rectangle.", `${r}² + ${h}² = ${r * r + h * h} = ${g}², donc g = ${g} ; puis ${r} × ${g} = ${r * g}.`, `l’aire latérale est ${r * g}π ${u}².`) };
  }),

  tpl("aire_pyramide_cone", 9, 4, "La demi-base, la hauteur et l’apothème forment un triangle rectangle.", () => {
    const u = un(UNITES);
    const [x, h, a] = un(TRIPLETS);
    const c = 2 * x;
    const A = 2 * c * a;
    const text = un([
      `Une pyramide régulière a une base carrée de côté ${c} ${u} et une hauteur de ${h} ${u}. Quelle est son aire latérale ?`,
      `Côté de la base carrée : ${c} ${u}. Hauteur de la pyramide régulière : ${h} ${u}. Calcule son aire latérale.`,
      `Pyramide régulière, base carrée de ${c} ${u} de côté, hauteur ${h} ${u}. Trouve l’apothème, puis l’aire latérale.`,
      `Quelle est l’aire latérale d’une pyramide régulière de base carrée de côté ${c} ${u} et de hauteur ${h} ${u} ?`,
    ]);
    return { text, format: "short", expected: mesure(A, `${u}²`), comparator: "number_equal", canvas: figPyramide(h, `côté ${c} ${u}`), explanation: expliquer(DEF_PYR, "le centre de la base est à une demi-base du milieu d’un côté : Pythagore donne l’apothème.", `${x}² + ${h}² = ${x * x + h * h} = ${a}², donc l’apothème vaut ${a} ; puis 4 × ${c} × ${a} ÷ 2 = ${A}.`, `l’aire latérale est ${A} ${u}².`) };
  }),

  /* ===== SPHÈRE ===== */

  tpl("aire_sphere", 1, 1, "Aire de la sphère = 4 × π × rayon².", () => {
    const u = un(UNITES);
    const r = entre(2, 15);
    const debut = un([
      `Une sphère a un rayon de ${r} ${u}.`,
      `Rayon de la sphère : ${r} ${u}.`,
      `Voici une sphère de rayon ${r} ${u}.`,
      `On considère une sphère de ${r} ${u} de rayon.`,
      `Sphère : rayon ${r} ${u}.`,
    ]);
    const fin = un(["Calcule son aire, sous la forme aπ.", "Quelle est son aire ? Écris-la sous la forme aπ.", "Donne la valeur exacte de son aire, sous la forme aπ.", "Écris son aire sous la forme aπ."]);
    const a = 4 * r * r;
    return { text: `${debut} ${fin}`, format: "short", expected: valeurPi(a, `${u}²`), comparator: "exact_text", canvas: figBoule(r, u), explanation: expliquer(DEF_SPH, "on calcule 4 × rayon × rayon et on garde π.", `4 × ${r} × ${r} = ${a}.`, `l’aire est ${a}π ${u}².`) };
  }),

  tpl("aire_sphere", 2, 1, "Quatre fois π, puis le rayon au carré.", () => {
    const u = un(UNITES);
    const r = entre(2, 15);
    const juste = `4 × π × ${r} × ${r}`;
    const text = un([
      `Une sphère a un rayon de ${r} ${u}. Quel calcul donne son aire ?`,
      `Quel calcul donne l’aire d’une sphère de rayon ${r} ${u} ?`,
      `Rayon : ${r} ${u}. Choisis le calcul de l’aire de la sphère.`,
      `Parmi ces calculs, lequel donne l’aire d’une sphère de rayon ${r} ${u} ?`,
      `Pour une sphère de ${r} ${u} de rayon, quel calcul faut-il faire ?`,
    ]);
    return { text, format: "qcm", choices: qcm(juste, [`π × ${r} × ${r}`, `2 × π × ${r}`, `4 × π × ${r}`, `4 × π × ${r} × ${r} × ${r} ÷ 3`]), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_SPH, "π × r², c’est un disque ; 4 × π × r³ ÷ 3, c’est le volume.", juste + ".", `le bon calcul est ${juste}.`) };
  }),

  tpl("aire_sphere", 3, 2, "Le rayon est la moitié du diamètre.", () => {
    const u = un(UNITES);
    const r = entre(2, 15);
    const debut = un([
      `Une sphère a un diamètre de ${2 * r} ${u}.`,
      `Diamètre de la sphère : ${2 * r} ${u}.`,
      `Voici une sphère de diamètre ${2 * r} ${u}.`,
      `On considère une sphère de ${2 * r} ${u} de diamètre.`,
    ]);
    const fin = un(["Calcule son aire, sous la forme aπ.", "Quelle est son aire ? Écris-la sous la forme aπ.", "Donne la valeur exacte de son aire, sous la forme aπ.", "Écris son aire sous la forme aπ."]);
    const a = 4 * r * r;
    return { text: `${debut} ${fin}`, format: "short", expected: valeurPi(a, `${u}²`), comparator: "exact_text", explanation: expliquer(DEF_SPH, `le rayon vaut ${2 * r} ÷ 2 = ${r}.`, `4 × ${r} × ${r} = ${a}.`, `l’aire est ${a}π ${u}².`) };
  }),

  tpl("aire_sphere", 4, 2, "Remplace π par 3,14 à la fin du calcul.", () => {
    const u = un(UNITES);
    const r = entre(1, 12);
    const V = Math.round(4 * r * r * 314) / 100;
    const debut = un([
      `Une sphère a un rayon de ${r} ${u}.`,
      `Rayon de la sphère : ${r} ${u}.`,
      `Voici une sphère de rayon ${r} ${u}.`,
      `Sphère : rayon ${r} ${u}.`,
    ]);
    const fin = un(["Calcule son aire en prenant π ≈ 3,14.", "Avec π ≈ 3,14, quelle est son aire ?", "Prends π ≈ 3,14 et donne son aire.", "Que vaut son aire, avec π ≈ 3,14 ?"]);
    return { text: `${debut} ${fin}`, format: "short", expected: mesure(V, `${u}²`), comparator: "number_equal", canvas: figBoule(r, u), explanation: expliquer(DEF_SPH, "on calcule 4 × r × r, puis on multiplie par 3,14.", `4 × ${r} × ${r} = ${4 * r * r}, puis ${4 * r * r} × 3,14 = ${fr(V)}.`, `l’aire est ${fr(V)} ${u}².`) };
  }),

  tpl("aire_sphere", 5, 3, "La surface de l’objet est celle d’une sphère : 4 × π × r².", () => {
    const B = un(BOULES);
    const r = entre(B.r[0], B.r[1]);
    const a = 4 * r * r;
    const text = un([
      `${cap(B.o)} est une sphère de rayon ${r} ${B.u}. Quelle est l’aire de sa surface, sous la forme aπ ?`,
      `On modélise ${B.o} par une sphère de rayon ${r} ${B.u}. Calcule son aire, sous la forme aπ.`,
      `Quelle surface faut-il recouvrir pour ${B.o}, de rayon ${r} ${B.u} ? Écris-la sous la forme aπ.`,
      `On veut peindre ${B.o} de ${r} ${B.u} de rayon. Quelle aire faut-il couvrir, sous la forme aπ ?`,
    ]);
    return { text, format: "short", expected: valeurPi(a, `${B.u}²`), comparator: "exact_text", canvas: figBoule(r, B.u), explanation: expliquer(DEF_SPH, "on applique la formule avec le rayon donné.", `4 × ${r} × ${r} = ${a}.`, `l’aire est ${a}π ${B.u}².`) };
  }),

  tpl("aire_sphere", 6, 3, "Une demi-sphère sans sa base : la moitié de 4 × π × r².", () => {
    const D = un(DOMES);
    const r = entre(D.r[0], D.r[1]);
    const a = 2 * r * r;
    const text = un([
      `${cap(D.o)} a la forme d’une demi-sphère de rayon ${r} ${D.u}. Quelle est l’aire de sa surface courbe, sous la forme aπ ?`,
      `On modélise ${D.o} par une demi-sphère de rayon ${r} ${D.u}. Calcule l’aire de la partie arrondie, sous la forme aπ.`,
      `Quelle aire couvre ${D.o}, demi-sphère de ${r} ${D.u} de rayon, sans compter la base ? Écris-la sous la forme aπ.`,
    ]);
    return { text, format: "short", expected: valeurPi(a, `${D.u}²`), comparator: "exact_text", explanation: expliquer(DEF_SPH, "la partie arrondie vaut la moitié de la sphère.", `4 × ${r} × ${r} ÷ 2 = ${a}.`, `l’aire est ${a}π ${D.u}².`) };
  }),

  tpl("aire_sphere", 7, 4, "4 × r² = le coefficient : on divise par 4, puis on cherche le carré.", () => {
    const u = un(UNITES);
    const r = entre(2, 15);
    const a = 4 * r * r;
    const text = un([
      `Une sphère a une aire de ${a}π ${u}². Quel est son rayon ?`,
      `Aire d’une sphère : ${a}π ${u}². Calcule son rayon.`,
      `L’aire d’une sphère vaut ${a}π ${u}². Trouve son rayon.`,
      `Quel rayon a une sphère d’aire ${a}π ${u}² ?`,
      `On sait qu’une sphère mesure ${a}π ${u}². Combien mesure son rayon ?`,
      `Donne le rayon d’une sphère dont l’aire est ${a}π ${u}².`,
    ]);
    return { text, format: "short", expected: mesure(r, u), comparator: "number_equal", explanation: expliquer(DEF_SPH, "on divise le coefficient par 4, puis on cherche le nombre dont le carré donne ce résultat.", `${a} ÷ 4 = ${r * r} = ${r} × ${r}.`, `le rayon est ${r} ${u}.`) };
  }),

  tpl("aire_sphere", 8, 4, "Le rayon compte deux fois dans l’aire : double du rayon, quatre fois l’aire.", () => {
    const u = un(UNITES);
    const A = entre(4, 60);
    const cas = un([
      { t: "On double son rayon.", k: 4 },
      { t: "On triple son rayon.", k: 9 },
      { t: "On multiplie son rayon par 4.", k: 16 },
      { t: "On multiplie son rayon par 5.", k: 25 },
    ]);
    const debut = un([`Une sphère a une aire de ${A} ${u}².`, `L’aire d’une sphère est ${A} ${u}².`, `On part d’une sphère de ${A} ${u}².`, `Voici une sphère dont l’aire mesure ${A} ${u}².`]);
    const fin = un(["Quelle est sa nouvelle aire ?", "Que vaut maintenant son aire ?", "Combien vaut son aire maintenant ?"]);
    return { text: `${debut} ${cas.t} ${fin}`, format: "short", expected: mesure(A * cas.k, `${u}²`), comparator: "number_equal", explanation: expliquer(DEF_SPH, "le rayon compte deux fois (r × r).", `${A} × ${cas.k} = ${A * cas.k}.`, `la nouvelle aire est ${A * cas.k} ${u}².`) };
  }),
];
