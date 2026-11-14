// lib/tutor-v4/questionBank/cm2/maths/algebre-outils.ts
//
// ⭐ 14/11/2026 — LES GABARITS DE L'ALGÈBRE DU CM2 (notion `algebre`). Avant :
// 1 à 7 squelettes par micro, 13 à 19 répétitions sur 20 (une phrase par
// gabarit). Même architecture que le CM1 (cm1/maths/algebre-outils.ts,
// 898371d8), au niveau CM2 : nombres jusqu'à quelques centaines, DÉCIMAUX
// (dixièmes, centièmes, prix en euros), × et ÷, DEUX opérations, relations à
// formule « × 3 + 1 », motifs qui se répètent (rang lointain).
// Vocabulaire de la vidéo `manim/scripts/cm2/algebre.py` et du cycle 3 :
// « égalité », « le signe = veut dire a la même valeur que », « balance en
// équilibre », « nombre inconnu », « x représente le nombre inconnu »,
// « opération inverse », « schéma en barres », « motif », « règle »,
// « relation », « modéliser ».
// Chaque gabarit tire une SITUATION (métiers, sport, cuisine, jardin, école,
// jeux…) × une TOURNURE × des nombres.
// ⛔ CM2 = zéro clavier : que des QCM, leurres = vraies erreurs d'élève :
//   - le signe = lu comme « donne le résultat » (« 25 × 4 = 100 + 30 = 130 »,
//     « 37 + 18 = … + 20 » → 55) ;
//   - additionner au lieu de soustraire, multiplier au lieu de diviser ;
//   - les décimaux additionnés comme des entiers (2,7 + 1,5 = 3,12) ;
//   - × 10 / × 100 / × 1 000 confondus ;
//   - défaire deux opérations dans le mauvais ordre ;
//   - la proportionnalité appliquée à une relation « × 3 + 1 » ;
//   - « de plus » qui fait additionner quand il faut soustraire.
// ⛔ Division : « ÷ », jamais de barre oblique.
// Dessins : `schema_barre` (⚠️ son `value` est lu comme un NOMBRE pour la
// largeur : les écritures « 6 × 8 » vont dans `label` ou `total`),
// `tableau_donnees` (balances, relations, tableaux, numération), `stat_graph`
// (motifs qui grandissent), `suite` (suites de nombres), `algebre` (paniers
// et bocaux qui cachent un nombre inconnu, comme la vidéo). Le dessin porte
// les DONNÉES, jamais la réponse.

import type { CanvasFigure, DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { cap, entre, etapes, fr, qcm, qcmN, un } from "../../cm1/maths/trous-outils";

type G = Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure };

const tpl = (microId: string, n: string, difficulty: DifficultyLevel, hint: string, generate: () => G): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `cm2_${microId}_tpl_${n}`,
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm2", "algebre", microId, "template"],
    generate,
  }) as TutorBankItemV4;

/* ───────────────────────── Nombres ───────────────────────── */

const r2 = (x: number) => Math.round(x * 100) / 100;
/** Un nombre à un chiffre après la virgule entre a et b. */
const dix = (a: number, b: number) => entre(Math.round(a * 10), Math.round(b * 10)) / 10;
/** Un décimal qui n'est pas entier. */
const dixNE = (a: number, b: number) => {
  let v = dix(a, b);
  for (let i = 0; i < 20 && Number.isInteger(v); i++) v = dix(a, b);
  return Number.isInteger(v) ? r2(v + 0.5) : v;
};
/** Écriture d'un prix : « 4 € », « 2,30 € ». */
const eur = (v: number) => {
  const x = r2(v);
  return Number.isInteger(x) ? `${fr(x)} €` : `${x.toFixed(2).replace(".", ",")} €`;
};
/** QCM de prix : leurres distincts en valeur, complétés par des voisins. */
function qcmE(juste: number, faux: number[], pas = 1) {
  const j = r2(juste);
  const vals: number[] = [];
  for (const v of faux.map(r2)) if (v > 0 && v !== j && !vals.includes(v)) vals.push(v);
  for (let k = 1; vals.length < 3 && k < 30; k++) for (const v of [r2(j + k * pas), r2(j - k * pas)]) if (v > 0 && !vals.includes(v) && vals.length < 3) vals.push(v);
  return qcm(eur(j), vals.map(eur));
}

/* ───────────────────────── Les personnes ───────────────────────── */

const NOMS_F = ["Inès", "Zoé", "Lou", "Clara", "Jade", "Maya", "Lina", "Manon", "Léa", "Sarah", "Chloé", "Sofia", "Rose", "Nora", "Ambre", "Alice"];
const NOMS_M = ["Téo", "Ravi", "Malo", "Sacha", "Rayan", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Nathan", "Sami", "Bilal", "Jules", "Hugo", "Adam"];
type Perso = { nom: string; il: "il" | "elle" };
const perso = (): Perso => (Math.random() < 0.5 ? { nom: un(NOMS_F), il: "elle" } : { nom: un(NOMS_M), il: "il" });
const deux = (): [Perso, Perso] => {
  const a = perso();
  let b = perso();
  while (b.nom === a.nom) b = perso();
  return [a, b];
};
const trois = (): [Perso, Perso, Perso] => {
  const [a, b] = deux();
  let c = perso();
  while (c.nom === a.nom || c.nom === b.nom) c = perso();
  return [a, b, c];
};
/** « de cubes », « d'allumettes ». */
const de = (x: string) => (/^[aeiouéèêâîôœh]/i.test(x) ? `d'${x}` : `de ${x}`);
/** « de un colis » → « d'un colis ». */
const deUn = (x: string) => (/^une? /.test(x) ? `d'${x}` : `de ${x}`);
const phrase = (...l: string[]) => l.filter(Boolean).join(" ");

/* ───────────────────────── Les dessins ───────────────────────── */

type Part = { label: string; value?: number; unknown?: boolean };
function barre(o: { title?: string; total?: string; parts: Part[]; question?: string }): CanvasFigure {
  return {
    kind: "schema_barre",
    ...(o.title ? { title: o.title } : {}),
    ...(o.total !== undefined ? { total: o.total } : {}),
    parts: o.parts.map((p) => (p.unknown ? { label: p.label, unknown: true } : { label: p.label, value: String(p.value) })),
    ...(o.question ? { questionLabel: o.question } : {}),
    display: { showTotal: o.total !== undefined, showPartLabels: true, showValues: true, showQuestion: !!o.question },
  } as CanvasFigure;
}
/** k parts égales, toutes inconnues (ou toutes de valeur v). */
const parts = (k: number, label: string, v?: number): Part[] =>
  Array.from({ length: k }, () => (v === undefined ? { label, unknown: true } : { label, value: v }));

function tableau(o: {
  title?: string;
  coin?: string;
  headers: (string | number)[];
  rows: { label?: string; values: (string | number)[] }[];
  cell?: { row: number; col: number };
}): CanvasFigure {
  return {
    kind: "tableau_donnees",
    ...(o.title ? { title: o.title } : {}),
    ...(o.coin !== undefined ? { coin: o.coin } : {}),
    headers: o.headers.map(String),
    rows: o.rows.map((r) => ({ ...r, values: r.values.map((v) => (typeof v === "number" ? fr(v) : v)) })),
    ...(o.cell ? { highlight: { cell: o.cell } } : {}),
    display: { compact: true, striped: false },
  } as CanvasFigure;
}

function barres(labels: string[], values: number[]): CanvasFigure {
  return {
    kind: "stat_graph",
    graphType: "barres",
    data: labels.map((label, i) => ({ label, value: values[i] })),
    display: { showValues: true, showLabels: true },
  } as CanvasFigure;
}

function frise(terms: (number | string)[], missingIndex?: number): CanvasFigure {
  return {
    kind: "suite",
    theme: "nombre",
    terms: terms.map((t) => (typeof t === "number" ? fr(t) : t)),
    ...(missingIndex !== undefined ? { missingIndex } : {}),
    display: { showArrows: false, showRule: false, showLabels: false, showIcons: false },
  } as CanvasFigure;
}

/** Paniers ou bocaux qui cachent le même nombre (le canvas de la vidéo). */
function cache(theme: "pomme" | "pieces", k: number, b: number, expression: string, phraseC: string): CanvasFigure {
  return {
    kind: "algebre",
    theme,
    titre: "Le nombre inconnu",
    groupesCaches: k,
    objetsVisibles: b,
    symbole: "x",
    expression,
    phrase: phraseC,
    display: { showConcret: true, showExpression: true, showPhrase: true, showLabels: true },
  } as CanvasFigure;
}

/** Le tableau de numération d'un nombre (jusqu'aux centièmes). */
function numeration(n: number): CanvasFigure {
  const c = Math.round(n * 100);
  const ch = [Math.floor(c / 10000) % 10, Math.floor(c / 1000) % 10, Math.floor(c / 100) % 10, Math.floor(c / 10) % 10, c % 10];
  const premier = ch.findIndex((v, i) => v !== 0 || i >= 2);
  return tableau({
    coin: "Nombre",
    headers: ["centaines", "dizaines", "unités", "dixièmes", "centièmes"],
    rows: [{ label: fr(n), values: ch.map((v, i) => (i < premier ? "" : v)) }],
  });
}

/* ───────────────────────── Les écritures ───────────────────────── */

type Forme = "plus" | "moins" | "fois" | "div";
type Ex = { t: string; v: number; f: Forme; a: number; b: number };
function ecrire(v: number, f: Forme): Ex | null {
  if (f === "plus") {
    if (v < 6) return null;
    const c = entre(Math.max(1, Math.ceil(v * 0.15)), Math.floor(v * 0.85));
    return { t: `${fr(c)} + ${fr(v - c)}`, v, f, a: c, b: v - c };
  }
  if (f === "moins") {
    const q = entre(3, 45);
    return { t: `${fr(v + q)} − ${q}`, v, f, a: v + q, b: q };
  }
  if (f === "fois") {
    const ds: number[] = [];
    for (let d = 2; d <= 12; d++) if (v % d === 0 && v / d >= 2 && v / d <= 25) ds.push(d);
    if (!ds.length) return null;
    const d = un(ds);
    return { t: `${d} × ${v / d}`, v, f, a: d, b: v / d };
  }
  if (v < 2 || v > 150) return null;
  const k = v <= 25 ? entre(2, 9) : un([2, 4, 5, 10]);
  return { t: `${fr(v * k)} ÷ ${k}`, v, f, a: v * k, b: k };
}
/** Une écriture de v, d'une forme permise (et pas `sauf`). */
function expr(v: number, permis: Forme[] = ["plus", "moins", "fois", "div"], sauf?: Forme): Ex {
  const l = permis.filter((f) => f !== sauf);
  for (let i = 0; i < 20; i++) {
    const e = ecrire(v, un(l));
    if (e) return e;
  }
  return ecrire(v, "plus") ?? { t: `${v} + 0`, v, f: "plus", a: v, b: 0 };
}
/** Une écriture d'un décimal (somme, différence, ÷ 10). */
function exprDec(v: number): string {
  const f = un(["plus", "moins", "div"] as const);
  if (f === "div" && Number.isInteger(r2(v * 10))) return `${fr(r2(v * 10))} ÷ 10`;
  if (f === "moins") {
    const q = dixNE(0.5, 4.5);
    return `${fr(r2(v + q))} − ${fr(q)}`;
  }
  if (v < 1) return `${fr(r2(v + 1))} − 1`;
  const c = dixNE(0.1, Math.max(0.2, v - 0.1));
  return c < v ? `${fr(c)} + ${fr(r2(v - c))}` : `${fr(r2(v + 1))} − 1`;
}

/* ───────────────────────── Les mondes ───────────────────────── */

/** Ce qu'on a, ce qu'on gagne, ce qu'on perd. */
const STOCKS = [
  { qui: "la boulangère", il: "elle", obj: "croissants", gagne: "en fait cuire", perd: "en vend" },
  { qui: "le fermier", il: "il", obj: "œufs", gagne: "en ramasse", perd: "en vend" },
  { qui: "la bibliothécaire", il: "elle", obj: "livres", gagne: "en reçoit", perd: "en prête" },
  { qui: "le fleuriste", il: "il", obj: "roses", gagne: "en reçoit", perd: "en vend" },
  { qui: "Inès", il: "elle", obj: "cartes de foot", gagne: "en gagne", perd: "en perd" },
  { qui: "le pêcheur", il: "il", obj: "poissons", gagne: "en pêche", perd: "en vend" },
  { qui: "l'infirmière", il: "elle", obj: "pansements", gagne: "en reçoit", perd: "en utilise" },
  { qui: "le directeur de l'école", il: "il", obj: "cahiers", gagne: "en commande", perd: "en distribue" },
  { qui: "Hugo", il: "il", obj: "billes", gagne: "en gagne", perd: "en perd" },
  { qui: "la factrice", il: "elle", obj: "lettres", gagne: "en reçoit", perd: "en distribue" },
  { qui: "le glacier", il: "il", obj: "cornets", gagne: "en prépare", perd: "en vend" },
  { qui: "Lina", il: "elle", obj: "autocollants", gagne: "en reçoit", perd: "en donne" },
  { qui: "le maraîcher", il: "il", obj: "salades", gagne: "en cueille", perd: "en vend" },
  { qui: "l'apicultrice", il: "elle", obj: "pots de miel", gagne: "en remplit", perd: "en vend" },
  { qui: "le gardien du zoo", il: "il", obj: "bananes", gagne: "en reçoit", perd: "en distribue" },
  { qui: "le libraire", il: "il", obj: "bandes dessinées", gagne: "en reçoit", perd: "en vend" },
  { qui: "la cuisinière de la cantine", il: "elle", obj: "yaourts", gagne: "en reçoit", perd: "en sert" },
  { qui: "le jardinier", il: "il", obj: "plants de tomates", gagne: "en achète", perd: "en plante" },
  { qui: "Maya", il: "elle", obj: "perles", gagne: "en achète", perd: "en utilise" },
  { qui: "la vétérinaire", il: "elle", obj: "sachets de croquettes", gagne: "en commande", perd: "en donne" },
  { qui: "Yanis", il: "il", obj: "figurines", gagne: "en reçoit", perd: "en échange" },
  { qui: "la pâtissière", il: "elle", obj: "macarons", gagne: "en prépare", perd: "en vend" },
  { qui: "le marchand du marché de Saint-Paul", il: "il", obj: "mangues", gagne: "en reçoit", perd: "en vend" },
  { qui: "le moniteur de voile", il: "il", obj: "gilets de sauvetage", gagne: "en achète", perd: "en prête" },
  { qui: "la gérante du cinéma", il: "elle", obj: "billets", gagne: "en imprime", perd: "en vend" },
  { qui: "le magasinier", il: "il", obj: "cartons", gagne: "en reçoit", perd: "en expédie" },
] as const;

/** Des contenants qui ont tous autant d'objets. g = genre du contenant. */
const PACKS = [
  { qui: "le fleuriste", il: "il", c: "bouquet", cs: "bouquets", o: "roses", g: "m" },
  { qui: "la fermière", il: "elle", c: "boîte", cs: "boîtes", o: "œufs", g: "f" },
  { qui: "le directeur", il: "il", c: "carton", cs: "cartons", o: "cahiers", g: "m" },
  { qui: "le pâtissier", il: "il", c: "plateau", cs: "plateaux", o: "éclairs", g: "m" },
  { qui: "la confiseuse", il: "elle", c: "sachet", cs: "sachets", o: "bonbons", g: "m" },
  { qui: "le maraîcher", il: "il", c: "cagette", cs: "cagettes", o: "melons", g: "f" },
  { qui: "le libraire", il: "il", c: "étagère", cs: "étagères", o: "livres", g: "f" },
  { qui: "l'entraîneuse", il: "elle", c: "équipe", cs: "équipes", o: "joueurs", g: "f" },
  { qui: "le moniteur de tennis", il: "il", c: "seau", cs: "seaux", o: "balles", g: "m" },
  { qui: "l'épicière", il: "elle", c: "pack", cs: "packs", o: "bouteilles d'eau", g: "m" },
  { qui: "le jardinier", il: "il", c: "rangée", cs: "rangées", o: "salades", g: "f" },
  { qui: "la photographe", il: "elle", c: "page", cs: "pages", o: "photos", g: "f" },
  { qui: "le cuisinier de la cantine", il: "il", c: "plateau", cs: "plateaux", o: "yaourts", g: "m" },
  { qui: "la vendeuse de jouets", il: "elle", c: "boîte", cs: "boîtes", o: "petites voitures", g: "f" },
  { qui: "le facteur", il: "il", c: "sacoche", cs: "sacoches", o: "lettres", g: "f" },
  { qui: "la bibliothécaire", il: "elle", c: "caisse", cs: "caisses", o: "albums", g: "f" },
  { qui: "l'organisateur du tournoi", il: "il", c: "poule", cs: "poules", o: "équipes", g: "f" },
  { qui: "l'animatrice du centre de loisirs", il: "elle", c: "pochette", cs: "pochettes", o: "feutres", g: "f" },
  { qui: "le chauffeur du car", il: "il", c: "rangée", cs: "rangées", o: "sièges", g: "f" },
] as const;

const PESEES = [
  ["La pâtissière", "des sacs de farine"],
  ["Le maraîcher", "des cageots de tomates"],
  ["Le facteur", "des colis"],
  ["La vétérinaire", "des sacs de croquettes"],
  ["Le jardinier", "des sacs de terreau"],
  ["Le pêcheur", "des caisses de poissons"],
  ["La boulangère", "des sacs de sucre"],
  ["Le magasinier", "des cartons"],
  ["Le cuisinier de la cantine", "des sacs de pommes de terre"],
  ["La fermière", "des paniers de pommes"],
  ["Le libraire", "des piles de livres"],
  ["Le maçon", "des sacs de sable"],
  ["L'épicière", "des sacs de riz"],
  ["La professeure de sciences", "des masses marquées"],
  ["La déménageuse", "des caisses de vaisselle"],
  ["Le chef du restaurant", "des sacs de légumes"],
] as const;

const BALANCE_OBJ = ["un colis", "une valise", "un sac de riz", "une pastèque", "une citrouille", "un cartable", "un sac de pommes de terre", "une caisse de livres", "un pot de peinture", "un sac de sable", "un bidon d'eau", "un panier de fruits", "un sac de croquettes", "un carton de jouets", "un sac de ciment", "une caisse à outils"];
const BALANCE_QUI = ["Au marché, la marchande", "À la poste, le facteur", "Au laboratoire, la chercheuse", "À l'épicerie, le vendeur", "En classe, la maîtresse", "À la ferme, le fermier", "À l'aéroport, l'agente", "Dans son atelier, le menuisier", "À la clinique, la vétérinaire", "Au port, le docker"];

/* ═════════════════════════ ALGEBRE_EGALITE ═════════════════════════ */

const E = "algebre_egalite";
const LEADS_EG = (p: Perso) => [
  "",
  "Au tableau, la maîtresse écrit quatre égalités.",
  `Sur son ardoise, ${p.nom} écrit quatre égalités.`,
  "Le signe = veut dire « a la même valeur que ».",
  `${p.nom} vérifie ses calculs.`,
  "Dans le cahier du jour, on lit ces égalités.",
  "Le maître propose un jeu du vrai ou faux.",
  "Au rallye maths, voici quatre égalités.",
];
const Q_VRAIE = ["Quelle égalité est vraie ?", "Laquelle de ces égalités est juste ?", "Une seule est vraie : laquelle ?", "Quelle écriture est juste ?", "Trouve l'égalité vraie."];

const CTX_CALCUL = [
  "Pour compter les points de son équipe",
  "Pour calculer le prix de ses courses",
  "Pour compter les élèves de l'école",
  "Pour compter les places du cinéma",
  "Pour additionner ses scores au jeu vidéo",
  "Pour compter les livres de la bibliothèque",
  "Pour compter les œufs de la semaine",
  "Pour calculer la longueur de sa frise",
  "Pour compter les tickets vendus à la kermesse",
  "Pour compter les passagers du train",
  "Pour calculer ses économies",
  "Pour compter les fleurs à planter",
  "Pour calculer la masse des colis",
  "Pour compter ses tours de piste",
];

const egalite: TutorBankItemV4[] = [
  // ★1 — quelle égalité est vraie (additions, et « 85 = 40 + 45 » lu à l'envers).
  tpl(E, "g01", 1, "Calcule la valeur de chaque côté du signe =.", () => {
    const p = perso();
    const T = entre(4, 30) * 5 + entre(0, 4);
    const a = entre(8, T - 8);
    const b = T - a;
    let c = entre(8, T - 8);
    while (c === a || c === b) c = entre(8, T - 8);
    const d = T - c;
    const seul = Math.random() < 0.3;
    const g = seul ? String(T) : `${a} + ${b}`;
    const vraie = `${g} = ${c} + ${d}`;
    const e = entre(4, 9);
    const faux = [`${g} = ${c} + ${d + 10}`, `${g} = ${c + 1} + ${d + 1}`, seul ? `${T} = ${c} + ${d - 1}` : `${a} + ${b} = ${T} + ${e}`, `${g} = ${c + 10} + ${d}`];
    return {
      text: phrase(un(LEADS_EG(p)), un(Q_VRAIE)),
      ...qcm(vraie, faux),
      explanation: etapes(
        "Une égalité est vraie quand les deux côtés du signe = ont la même valeur. On calcule chaque côté.",
        seul ? `${c} + ${d} = ${T}.` : `${a} + ${b} = ${T} et ${c} + ${d} = ${T}.`,
        `L'égalité vraie est ${vraie}.`,
      ),
    };
  }),

  // ★1 — la balance à deux plateaux (vidéo, écran 1).
  tpl(E, "g02", 1, "Calcule la masse de chaque plateau, puis compare.", () => {
    const [qui, choses] = un(PESEES);
    const a = entre(5, 45);
    const b = entre(5, 45);
    const L = a + b;
    const cas = un([0, 1, 2]);
    const R = cas === 0 ? L : cas === 1 ? L - entre(1, 5) : L + entre(1, 5);
    let c = entre(3, R - 3);
    for (let i = 0; i < 10 && (c === a || c === b); i++) c = entre(3, R - 3);
    const d = R - c;
    const juste = cas === 0 ? "Elle est en équilibre." : cas === 1 ? "Elle penche à gauche." : "Elle penche à droite.";
    return {
      text: `${qui} pose ${choses} sur une balance à deux plateaux. À gauche : ${a} kg et ${b} kg. À droite : ${c} kg et ${d} kg. ${un([
        "La balance est-elle en équilibre ?",
        "Que fait la balance ?",
        "Que va faire la balance ?",
        "Comment se place la balance ?",
      ])}`,
      ...qcm(juste, ["Elle est en équilibre.", "Elle penche à gauche.", "Elle penche à droite."]),
      explanation: etapes(
        "Une balance en équilibre, c'est une égalité : les deux plateaux ont la même masse. Elle penche du côté le plus lourd.",
        `À gauche : ${a} + ${b} = ${L} kg. À droite : ${c} + ${d} = ${R} kg.`,
        cas === 0 ? `${a} + ${b} = ${c} + ${d} : elle est en équilibre.` : `${L} kg et ${R} kg : ${juste.toLowerCase()}`,
      ),
      canvas: tableau({
        title: "La balance",
        coin: "Plateau",
        headers: ["Masses posées", "Masse totale"],
        rows: [
          { label: "Gauche", values: [`${a} kg + ${b} kg`, "?"] },
          { label: "Droite", values: [`${c} kg + ${d} kg`, "?"] },
        ],
      }),
    };
  }),

  // ★1 — vrai ou faux, avec la raison.
  tpl(E, "g03", 1, "Calcule le côté gauche, puis le côté droit.", () => {
    const p = perso();
    const op = un(["+", "×", "−"] as const);
    const vrai = Math.random() < 0.5;
    let L = "", R = "", V = 0, W = 0;
    if (op === "+") {
      V = entre(30, 160);
      const a = entre(10, V - 10);
      let c = entre(10, V - 20);
      while (c === a || c === V - a) c = entre(10, V - 20);
      W = vrai ? V : V + un([1, 2, 10, -1, -10]);
      L = `${a} + ${V - a}`;
      R = `${c} + ${W - c}`;
    } else if (op === "×") {
      V = un([24, 30, 36, 40, 48, 60, 72, 80, 90, 100]);
      const fs: [number, number][] = [];
      for (let d = 2; d <= 12; d++) if (V % d === 0 && V / d >= 2 && V / d <= 50 && d <= V / d) fs.push([d, V / d]);
      const [a, b] = un(fs);
      const autres = fs.filter(([x]) => x !== a);
      if (vrai && autres.length) {
        const [c, d] = un(autres);
        W = V;
        R = `${c} × ${d}`;
      } else {
        W = b * (a + 1);
        R = `${a + 1} × ${b}`;
      }
      L = `${a} × ${b}`;
    } else {
      const A = entre(40, 150), B = entre(10, 35), d = entre(2, 9);
      V = A - B;
      L = `${A} − ${B}`;
      R = vrai ? `${A + d} − ${B + d}` : `${A + d} − ${B}`;
      W = vrai ? V : V + d;
    }
    const estVrai = V === W;
    const e = un([1, 2, 10]);
    const juste = estVrai ? `Vrai : les deux côtés valent ${fr(V)}.` : `Faux : à gauche ${fr(V)}, à droite ${fr(W)}.`;
    const faux = estVrai
      ? [`Faux : à gauche ${fr(V)}, à droite ${fr(V + e)}.`, "Faux : les nombres ne sont pas les mêmes des deux côtés.", `Vrai : les deux côtés valent ${fr(V + e)}.`]
      : [`Vrai : les deux côtés valent ${fr(V)}.`, `Vrai : les deux côtés valent ${fr(W)}.`, `Faux : à gauche ${fr(W)}, à droite ${fr(V)}.`];
    return {
      text: phrase(
        un(["", `${p.nom} écrit au tableau :`, "Dans le cahier, on lit :", "Au jeu du vrai ou faux :", `Sur l'ardoise de ${p.nom} :`]),
        `${L} = ${R}.`,
        un(["Cette égalité est-elle vraie ?", "Est-ce une égalité vraie ?", "Cette égalité est-elle juste ?", "Vrai ou faux ?"]),
      ),
      ...qcm(juste, faux),
      explanation: etapes("On calcule chaque côté du signe = : l'égalité est vraie s'ils ont la même valeur.", `${L} = ${fr(V)} et ${R} = ${fr(W)}.`, estVrai ? "L'égalité est vraie." : "L'égalité est fausse."),
      canvas: tableau({
        coin: "",
        headers: ["Calcul", "Valeur"],
        rows: [
          { label: "À gauche du =", values: [L, "?"] },
          { label: "À droite du =", values: [R, "?"] },
        ],
      }),
    };
  }),

  // ★1 — quelle écriture vaut ce nombre ?
  tpl(E, "g04", 1, "Calcule chaque écriture : une seule donne le nombre.", () => {
    const p = perso();
    const V = un([24, 30, 36, 40, 45, 48, 50, 60, 64, 72, 75, 80, 90, 100]);
    const J = expr(V, ["fois", "plus", "moins"]);
    const faux = [
      expr(V + un([1, 2, 10]), ["plus", "moins", "fois"]).t,
      expr(V - un([1, 2, 10]), ["plus", "moins"]).t,
      J.f === "fois" ? `${J.a} + ${J.b}` : `${V} + ${entre(2, 9)}`,
      expr(V + un([-5, 5, 20]), ["plus", "moins"]).t,
    ].filter((x) => x !== J.t);
    return {
      text: un([
        `Quelle écriture est égale à ${V} ?`,
        `Quel calcul vaut ${V} ?`,
        `${p.nom} cherche une écriture de ${V}. Laquelle est juste ?`,
        `Laquelle de ces écritures donne ${V} ?`,
        `On veut écrire ${V} = … Quel calcul convient ?`,
      ]),
      ...qcm(J.t, faux),
      explanation: etapes("Une égalité relie deux écritures qui ont la même valeur.", `${J.t} = ${V}.`, `On peut écrire ${V} = ${J.t}.`),
    };
  }),

  // ★2 — « 25 × 4 = 100 + 30 = 130 » : le signe = lu comme « donne le résultat ».
  tpl(E, "g05", 2, "Les deux côtés de CHAQUE signe = doivent avoir la même valeur.", () => {
    const p = perso();
    const o1 = un(["+", "×"]);
    const o2 = un(["+", "−"]);
    const a = o1 === "×" ? entre(3, 12) : entre(25, 150);
    const b = o1 === "×" ? entre(11, 25) : entre(15, 90);
    const s = o1 === "×" ? a * b : a + b;
    const c = o2 === "−" ? entre(5, Math.max(6, Math.floor(s / 2))) : entre(5, 60);
    const t = o2 === "−" ? s - c : s + c;
    const bien = Math.random() < 0.35;
    const ecrit = bien ? `${a} ${o1} ${b} = ${s}, puis ${s} ${o2} ${c} = ${t}.` : `${a} ${o1} ${b} = ${s} ${o2} ${c} = ${t}.`;
    const J1 = `Non : ${a} ${o1} ${b} ne vaut pas ${s} ${o2} ${c}.`;
    const J2 = `Oui : ${a} ${o1} ${b} fait bien ${s}.`;
    const J3 = `Oui : le résultat ${t} est juste.`;
    const J4 = "Oui : chaque égalité est vraie.";
    const J5 = `Non : le résultat ${t} est faux.`;
    const J6 = `Non : ${s} ${o2} ${c} ne vaut pas ${t}.`;
    return {
      text: phrase(
        `${un(CTX_CALCUL)}, ${p.nom} calcule ${a} ${o1} ${b} ${o2} ${c}. ${cap(p.il)} écrit : ${ecrit}`,
        un(["Son écriture est-elle juste ?", `A-t-${p.il} le droit d'écrire cela ?`, "Que penses-tu de son écriture ?", "Ces signes = sont-ils bien utilisés ?"]),
      ),
      ...(bien ? qcm(J4, [J5, J6, J1]) : qcm(J1, [J2, J3, J5])),
      explanation: etapes(
        "Le signe = ne veut pas dire « voici le résultat » : il dit que ce qui est à gauche a la même valeur que ce qui est à droite.",
        bien ? `${a} ${o1} ${b} = ${s} est vrai, ${s} ${o2} ${c} = ${t} est vrai.` : `${a} ${o1} ${b} vaut ${s}, mais ${s} ${o2} ${c} vaut ${t} : ${s} n'est pas égal à ${t}.`,
        bien ? "L'écriture est juste." : `Il fallait écrire deux égalités : ${a} ${o1} ${b} = ${s}, puis ${s} ${o2} ${c} = ${t}.`,
      ),
      canvas: tableau({
        title: `Ce qu'a écrit ${p.nom}`,
        headers: ["Ce qui est écrit", "Ce que ça vaut"],
        rows: [{ values: [`${a} ${o1} ${b}`, "?"] }, { values: [`${s} ${o2} ${c}`, "?"] }],
      }),
    };
  }),

  // ★2 — égalités à opérations mêlées, avec ÷ (le piège « 4 × 12 = 4 + 12 »).
  tpl(E, "g06", 2, "Calcule chaque côté : ×, ÷, + et − ne donnent pas la même chose.", () => {
    const p = perso();
    const V = un([24, 36, 40, 48, 50, 60, 72, 75, 80, 90, 96, 100]);
    const L = expr(V, ["plus", "fois", "moins"]);
    const R = expr(V, ["plus", "moins", "fois", "div"], L.f);
    const vraie = `${L.t} = ${R.t}`;
    const e = entre(4, 9);
    const faux = [
      `${L.t} = ${expr(V + entre(1, 3), ["plus", "moins", "fois"]).t}`,
      `${L.t} = ${V} + ${e}`,
      L.f === "fois" ? `${L.t} = ${L.a} + ${L.b}` : `${L.t} = ${expr(V - entre(1, 3), ["plus", "moins"]).t}`,
      `${L.t} = ${fr(V * 2)} ÷ ${un([4, 5, 10])}`,
    ];
    return {
      text: phrase(un(LEADS_EG(p)), un(Q_VRAIE)),
      ...qcm(vraie, faux.filter((f) => f !== vraie)),
      explanation: etapes("On calcule la valeur de chaque côté du signe =. Attention : ×, ÷, + et − ne donnent pas le même résultat.", `${L.t} = ${V} et ${R.t} = ${V}.`, `L'égalité vraie est ${vraie}.`),
    };
  }),

  // ★2 — quel calcul écrire après le signe = ?
  tpl(E, "g07", 2, "Le calcul de droite doit avoir la même valeur que celui de gauche.", () => {
    const p = perso();
    const V = un([30, 36, 40, 45, 48, 50, 60, 64, 72, 80, 100]);
    const L = expr(V, ["plus", "fois"]);
    const R = expr(V, ["plus", "moins", "fois", "div"], L.f);
    const e = entre(4, 9);
    const faux = [
      `${V} + ${e}`,
      expr(V + un([1, 2, -1, -2, 10]), ["plus", "moins"]).t,
      L.f === "fois" ? `${L.a} + ${L.b}` : L.a > 1 && L.b > 1 && L.a * L.b !== V && L.a <= 12 ? `${L.a} × ${L.b}` : expr(V + 3, ["plus"]).t,
    ].filter((x) => x !== R.t);
    const eq = `${L.t} = …`;
    const parts0: Part[] = L.f === "plus" ? [{ label: String(L.a), value: L.a }, { label: String(L.b), value: L.b }] : L.a <= 8 ? parts(L.a, String(L.b), L.b) : [{ label: L.t, value: V }];
    return {
      text: un([
        `Pour que l'égalité soit vraie, que peut-on écrire à la place des pointillés ? ${eq}`,
        `Complète avec un calcul qui a la même valeur : ${eq}`,
        `Quel calcul peut-on écrire après le signe = ? ${eq}`,
        `${p.nom} veut écrire une égalité vraie : ${eq} Que peut-${p.il} écrire ?`,
        `Quel calcul vaut autant que ${L.t} ?`,
      ]),
      ...qcm(R.t, faux),
      explanation: etapes("Après le signe =, on écrit un calcul qui a la même valeur que le côté gauche.", `${L.t} = ${V} et ${R.t} = ${V}.`, `On peut écrire ${L.t} = ${R.t}.`),
      canvas: barre({ title: `${L.t} = …`, parts: parts0, question: "Même valeur des deux côtés du signe =" }),
    };
  }),

  // ★2 — égalités avec des décimaux (le piège 2,7 + 1,5 = 3,12).
  tpl(E, "g08", 2, "Additionne les dixièmes avec les dixièmes : 10 dixièmes font 1 unité.", () => {
    const p = perso();
    let a = 0, b = 0, ta = 0, tb = 0;
    for (let i = 0; i < 40; i++) {
      a = dixNE(1, 9);
      b = dixNE(1, 9);
      ta = Math.round((a * 10) % 10);
      tb = Math.round((b * 10) % 10);
      if (ta + tb > 10) break;
    }
    const S = r2(a + b);
    const g = `${fr(a)} + ${fr(b)}`;
    const vraie = `${g} = ${exprDec(S)}`;
    const piege = ta + tb > 10 ? `${Math.floor(a) + Math.floor(b)},${ta + tb}` : fr(r2(S + 1));
    const faux = [`${g} = ${piege}`, `${g} = ${exprDec(r2(S + 1))}`, `${g} = ${fr(r2(S * 10))} ÷ 100`, `${g} = ${exprDec(r2(S - 0.1))}`];
    return {
      text: phrase(
        un(["", `${p.nom} additionne deux longueurs.`, `${p.nom} additionne deux prix.`, "Au marché, on pèse deux sacs.", "Avec des nombres décimaux :", `${p.nom} vérifie ses égalités.`]),
        un(Q_VRAIE),
      ),
      ...qcm(vraie, faux),
      explanation: etapes(
        "On calcule chaque côté. Les unités avec les unités, les dixièmes avec les dixièmes : 10 dixièmes font 1 unité.",
        `${g} = ${fr(S)}.`,
        `L'égalité vraie est ${vraie}.`,
      ),
      canvas: tableau({
        coin: "Nombre",
        headers: ["unités", "dixièmes"],
        rows: [
          { label: fr(a), values: [Math.floor(a), ta] },
          { label: fr(b), values: [Math.floor(b), tb] },
        ],
      }),
    };
  }),

  // ★2 — paquets à comparer : 4 × 15 = 6 × 10 ?
  tpl(E, "g09", 2, "Calcule le total de chacun : nombre de paquets × nombre par paquet.", () => {
    const [A, B] = deux();
    const pk = un(PACKS);
    const egal = Math.random() < 0.4;
    let n1 = 0, k1 = 0, n2 = 0, k2 = 0;
    if (egal) {
      const V = un([24, 36, 48, 60, 72, 80, 90, 96, 100, 120]);
      const fs: [number, number][] = [];
      for (let d = 2; d <= 12; d++) if (V % d === 0 && V / d >= 3 && V / d <= 30) fs.push([d, V / d]);
      [n1, k1] = un(fs);
      [n2, k2] = un(fs.filter(([x]) => x !== n1));
    } else {
      for (let i = 0; i < 40; i++) {
        n1 = entre(3, 12); k1 = entre(6, 25); n2 = entre(3, 12); k2 = entre(6, 25);
        const ecart = Math.abs(n1 * k1 - n2 * k2);
        if (n1 !== n2 && ecart > 0 && ecart <= 20 && (i > 25 || n1 + k1 === n2 + k2 || Math.random() < 0.3)) break;
      }
    }
    const P1 = n1 * k1, P2 = n2 * k2;
    const pareil = `C'est pareil : ${n1} × ${k1} = ${n2} × ${k2}.`;
    const juste = P1 === P2 ? pareil : P1 > P2 ? `${A.nom} en a plus.` : `${B.nom} en a plus.`;
    const faux = [pareil, `${A.nom} en a plus.`, `${B.nom} en a plus.`];
    if (n1 + k1 === n2 + k2 && P1 !== P2) faux.push(`C'est pareil : ${n1} + ${k1} = ${n2} + ${k2}.`);
    return {
      text: phrase(
        `${A.nom} a ${n1} ${pk.cs} de ${k1} ${pk.o}. ${B.nom} a ${n2} ${pk.cs} de ${k2} ${pk.o}.`,
        un([`Qui a le plus ${de(pk.o)} ?`, `Compare : qui a le plus ${de(pk.o)} ?`, `Lequel des deux a le plus ${de(pk.o)} ?`, "Qui en a le plus ?"]),
      ),
      ...qcm(juste, faux),
      explanation: etapes(
        "On calcule le total de chacun, puis on compare : il ne faut pas additionner le nombre de paquets et le nombre par paquet.",
        `${A.nom} : ${n1} × ${k1} = ${P1}. ${B.nom} : ${n2} × ${k2} = ${P2}.`,
        P1 === P2 ? `${n1} × ${k1} = ${n2} × ${k2} : c'est pareil.` : juste,
      ),
      canvas: tableau({
        coin: "",
        headers: [cap(pk.cs), `${cap(pk.o)} par ${pk.c}`, "Total"],
        rows: [
          { label: A.nom, values: [n1, k1, "?"] },
          { label: B.nom, values: [n2, k2, "?"] },
        ],
      }),
    };
  }),

  // ★2 — sans calculer : on ajoute d'un côté, on enlève de l'autre ; on double et on prend la moitié.
  tpl(E, "g10", 2, "Regarde comment chaque nombre a changé entre les deux côtés.", () => {
    const p = perso();
    const d = un([1, 2, 5, 10, 20]);
    const cas = un(["plusVrai", "plusFaux", "moinsVrai", "moinsFaux", "foisVrai", "foisFaux"] as const);
    const a = entre(25, 180);
    const b = entre(d + 8, 120);
    let eq = "", avant: number[] = [], apres: number[] = [];
    if (cas === "plusVrai") { eq = `${a} + ${b} = ${a + d} + ${b - d}`; avant = [a, b]; apres = [a + d, b - d]; }
    if (cas === "plusFaux") { eq = `${a} + ${b} = ${a + d} + ${b + d}`; avant = [a, b]; apres = [a + d, b + d]; }
    const g = Math.max(a, b) + 10, h = Math.min(a, b);
    if (cas === "moinsVrai") { eq = `${g} − ${h} = ${g + d} − ${h + d}`; avant = [g, h]; apres = [g + d, h + d]; }
    if (cas === "moinsFaux") { eq = `${g} − ${h} = ${g + d} − ${h - d}`; avant = [g, h]; apres = [g + d, h - d]; }
    const u = entre(3, 15), v = 2 * entre(3, 25);
    if (cas === "foisVrai") { eq = `${u} × ${v} = ${2 * u} × ${v / 2}`; avant = [u, v]; apres = [2 * u, v / 2]; }
    if (cas === "foisFaux") { eq = `${u} × ${v} = ${2 * u} × ${2 * v}`; avant = [u, v]; apres = [2 * u, 2 * v]; }
    const S = {
      plusVrai: `Vrai : on ajoute ${d} à un nombre et on enlève ${d} à l'autre.`,
      plusFaux: `Faux : les deux nombres ont augmenté de ${d}.`,
      moinsVrai: `Vrai : les deux nombres ont augmenté de ${d}, l'écart ne change pas.`,
      moinsFaux: "Faux : l'écart entre les deux nombres a changé.",
      foisVrai: "Vrai : on double un nombre et on prend la moitié de l'autre.",
      foisFaux: "Faux : les deux nombres ont été doublés.",
    };
    const piege = "Faux : les nombres ne sont pas les mêmes des deux côtés.";
    const juste = S[cas];
    const fam = cas.startsWith("plus") ? [S.plusVrai, S.plusFaux] : cas.startsWith("moins") ? [S.moinsVrai, S.moinsFaux] : [S.foisVrai, S.foisFaux];
    const vrai = cas.endsWith("Vrai");
    // Leurres : le verdict contraire, et des raisons qui ne collent pas à l'égalité écrite.
    const autres = vrai
      ? [piege, ...[S.plusFaux, S.moinsFaux, S.foisFaux].filter((x) => !fam.includes(x))]
      : [S.plusVrai, S.moinsVrai, S.foisVrai].filter((x) => !fam.includes(x));
    return {
      text: phrase(
        un(["Sans poser le calcul :", "Sans tout calculer :", "Astuce de calcul mental :", `${p.nom} a écrit dans son cahier :`, "Au jeu du vrai ou faux :", "Regarde bien les nombres :"]),
        eq + ".",
        un(["Cette égalité est-elle vraie ?", "Est-ce une égalité vraie ?", "L'égalité est-elle juste ?"]),
      ),
      ...qcm(juste, [...fam.filter((x) => x !== juste), ...autres]),
      explanation: etapes(
        cas.startsWith("plus")
          ? "Dans une somme, si on ajoute à un nombre ce qu'on enlève à l'autre, la somme ne change pas."
          : cas.startsWith("moins")
            ? "Dans une différence, si on ajoute le même nombre aux deux, l'écart ne change pas."
            : "Dans un produit, si on double un nombre et qu'on prend la moitié de l'autre, le produit ne change pas.",
        `On vérifie : ${eq.replace("=", "et")} valent ${vrai ? "la même chose" : "deux nombres différents"}.`,
        vrai ? "L'égalité est vraie." : "L'égalité est fausse.",
      ),
      canvas: tableau({
        title: "Ce qui change",
        coin: "",
        headers: ["À gauche", "À droite"],
        rows: [
          { label: "1er nombre", values: [avant[0], apres[0]] },
          { label: "2e nombre", values: [avant[1], apres[1]] },
        ],
      }),
    };
  }),

  // ★2 — une seule égalité fausse.
  tpl(E, "g11", 2, "Calcule les deux côtés de chaque égalité.", () => {
    const p = perso();
    const pool = [24, 30, 36, 40, 48, 50, 60, 72, 80, 100];
    const Vs = pool.sort(() => Math.random() - 0.5).slice(0, 4);
    const vraies = Vs.slice(0, 3).map((V) => {
      const L = expr(V, ["plus", "fois", "moins"]);
      return `${L.t} = ${expr(V, ["plus", "moins", "fois", "div"], L.f).t}`;
    });
    const V = Vs[3];
    const type = un(["chaine", "confusion", "decale"] as const);
    let fausse: string;
    if (type === "chaine") {
      const a = entre(5, V - 5);
      fausse = `${a} + ${V - a} = ${V} + ${entre(2, 9)}`;
    } else if (type === "confusion") {
      const L = expr(V, ["fois"]);
      fausse = L.f === "fois" ? `${L.t} = ${L.a} + ${L.b}` : `${L.t} = ${expr(V + 2, ["plus"]).t}`;
    } else {
      const L = expr(V, ["plus", "fois"]);
      fausse = `${L.t} = ${expr(V + un([1, -1, 2, 10]), ["plus", "moins"]).t}`;
    }
    return {
      text: phrase(
        un(["", `${p.nom} a écrit quatre égalités.`, "La maîtresse affiche quatre égalités.", "Au jeu du vrai ou faux :", "Attention, piège !"]),
        un(["Une seule de ces égalités est fausse. Laquelle ?", "Trouve l'égalité fausse.", "Laquelle de ces égalités n'est pas vraie ?", "Une seule est fausse : laquelle ?"]),
      ),
      ...qcm(fausse, vraies),
      explanation: etapes("Une égalité est fausse quand ses deux côtés n'ont pas la même valeur.", `Dans ${fausse}, les deux côtés ne valent pas la même chose.`, `L'égalité fausse est ${fausse}.`),
    };
  }),

  // ★2 — la balance avec des masses décimales.
  tpl(E, "g12", 2, "Additionne les masses de chaque plateau, dixièmes avec dixièmes.", () => {
    const [qui, choses] = un(PESEES);
    const a = dixNE(1.5, 6), b = dixNE(1.5, 6);
    const L = r2(a + b);
    const cas = un([0, 1, 2]);
    const R = cas === 0 ? L : cas === 1 ? r2(L - un([0.1, 0.2, 0.5, 1])) : r2(L + un([0.1, 0.2, 0.5, 1]));
    let c = dixNE(0.3, Math.max(0.4, R - 0.3));
    for (let i = 0; i < 10 && (c === a || c === b || c >= R); i++) c = dixNE(0.3, Math.max(0.4, R - 0.3));
    if (c >= R) c = r2(R / 2);
    const d = r2(R - c);
    const juste = cas === 0 ? "Elle est en équilibre." : cas === 1 ? "Elle penche à gauche." : "Elle penche à droite.";
    return {
      text: `${qui} pose ${choses} sur une balance à deux plateaux. À gauche : ${fr(a)} kg et ${fr(b)} kg. À droite : ${fr(c)} kg et ${fr(d)} kg. ${un([
        "La balance est-elle en équilibre ?",
        "Que fait la balance ?",
        "Comment se place la balance ?",
      ])}`,
      ...qcm(juste, ["Elle est en équilibre.", "Elle penche à gauche.", "Elle penche à droite."]),
      explanation: etapes(
        "Une balance en équilibre, c'est une égalité : les deux plateaux ont la même masse.",
        `À gauche : ${fr(a)} + ${fr(b)} = ${fr(L)} kg. À droite : ${fr(c)} + ${fr(d)} = ${fr(R)} kg.`,
        cas === 0 ? "Les deux plateaux ont la même masse : elle est en équilibre." : `${fr(L)} kg et ${fr(R)} kg : ${juste.toLowerCase()}`,
      ),
      canvas: tableau({
        title: "La balance",
        coin: "Plateau",
        headers: ["Masses posées", "Masse totale"],
        rows: [
          { label: "Gauche", values: [`${fr(a)} kg + ${fr(b)} kg`, "?"] },
          { label: "Droite", values: [`${fr(c)} kg + ${fr(d)} kg`, "?"] },
        ],
      }),
    };
  }),
];

/* ═════════════════════════ ALGEBRE_COMPLETER_EGALITE ═════════════════════════ */

const C = "algebre_completer_egalite";
const SYMB = ["…", "?", "■", "★", "▲"];
const Q_COMPLETE = (eq: string, s: string) => [
  `Complète l'égalité : ${eq}`,
  `Quel nombre manque ? ${eq}`,
  `Par quel nombre remplacer ${s} ? ${eq}`,
  `Trouve le nombre caché : ${eq}`,
  `${eq} Quel nombre faut-il écrire à la place de ${s} ?`,
  `Pour que l'égalité soit vraie, que vaut ${s} ? ${eq}`,
  `Quel nombre rend l'égalité vraie ? ${eq}`,
];

type Trou = { eq: string; x: number; faux: number[]; calc: string; canvas?: CanvasFigure };
function trouSimple(s: string, op: string): Trou {
  if (op === "a+x" || op === "x+b") {
    const a = entre(25, 400), x = entre(12, 300), c = a + x;
    const eq = op === "a+x" ? `${a} + ${s} = ${c}` : `${s} + ${a} = ${c}`;
    return { eq, x, faux: [c + a, x + 10, x - 1, c, x + 100], calc: `${c} − ${a} = ${x}`, canvas: barre({ title: eq, total: String(c), parts: op === "a+x" ? [{ label: String(a), value: a }, { label: "?", unknown: true }] : [{ label: "?", unknown: true }, { label: String(a), value: a }] }) };
  }
  if (op === "a−x") {
    const c = entre(20, 300), x = entre(12, 250), a = c + x;
    const eq = `${a} − ${s} = ${c}`;
    return { eq, x, faux: [a + c, x + 10, c, x + 1, x - 10], calc: `${a} − ${c} = ${x}`, canvas: barre({ title: eq, total: String(a), parts: [{ label: "on enlève ?", unknown: true }, { label: "il reste", value: c }] }) };
  }
  if (op === "x−b") {
    const b = entre(12, 200), c = entre(20, 300), x = b + c;
    const eq = `${s} − ${b} = ${c}`;
    return { eq, x, faux: [Math.abs(c - b), x + 10, x - 1, c, x - 100], calc: `${c} + ${b} = ${x}`, canvas: barre({ title: eq, total: "?", parts: [{ label: "on enlève", value: b }, { label: "il reste", value: c }] }) };
  }
  if (op === "a×x" || op === "x×b") {
    const rond = Math.random() < 0.3;
    const a = rond ? un([20, 25, 50]) : entre(3, 12), x = rond ? un([2, 3, 4, 5, 6, 8]) : entre(3, 12), c = a * x;
    const eq = op === "a×x" ? `${a} × ${s} = ${c}` : `${s} × ${a} = ${c}`;
    return { eq, x, faux: [c - a, c + a, x + 1, x - 1, c], calc: `${c} ÷ ${a} = ${x}`, canvas: a <= 10 ? barre({ title: eq, total: String(c), parts: parts(a, "?") }) : tableau({ coin: "", headers: ["Facteur connu", "Facteur caché", "Produit"], rows: [{ values: [a, "?", c] }], cell: { row: 0, col: 1 } }) };
  }
  if (op === "x÷k") {
    const k = entre(2, 9), q = entre(3, 15), x = k * q;
    const eq = `${s} ÷ ${k} = ${q}`;
    return { eq, x, faux: [q + k, x + k, x - k, Math.abs(q - k)], calc: `${q} × ${k} = ${x}`, canvas: barre({ title: eq, total: "?", parts: parts(k, String(q), q) }) };
  }
  // a ÷ x = q
  const q = entre(3, 12), x = entre(2, 9), a = q * x;
  const eq = `${a} ÷ ${s} = ${q}`;
  return { eq, x, faux: [a * q, a - q, x + 1, x - 1], calc: `${a} ÷ ${q} = ${x}`, canvas: barre({ title: eq, total: String(a), parts: parts(x, String(q), q) }) };
}

const completer: TutorBankItemV4[] = [
  // ★1 — le trou dans une addition ou une soustraction.
  tpl(C, "g01", 1, "Cherche le nombre qui rend les deux côtés égaux : pense à l'opération inverse.", () => {
    const s = un(SYMB);
    const t = trouSimple(s, un(["a+x", "x+b", "a−x", "x−b"]));
    return {
      text: un(Q_COMPLETE(t.eq, s)),
      ...qcmN(t.x, t.faux),
      explanation: etapes("On cherche le nombre qui rend l'égalité vraie, avec l'opération inverse.", `${t.calc}.`, `On vérifie : ${t.eq.replace(s, String(t.x))}.`),
      ...(t.canvas ? { canvas: t.canvas } : {}),
    };
  }),

  // ★1 — le trou dans une multiplication ou une division.
  tpl(C, "g02", 1, "Pense à la table : la multiplication et la division se défont l'une l'autre.", () => {
    const s = un(SYMB);
    const t = trouSimple(s, un(["a×x", "x×b", "x÷k", "a÷x"]));
    return {
      text: un(Q_COMPLETE(t.eq, s)),
      ...qcmN(t.x, t.faux),
      explanation: etapes("On cherche le nombre qui rend l'égalité vraie, avec l'opération inverse.", `${t.calc}.`, `On vérifie : ${t.eq.replace(s, String(t.x))}.`),
      ...(t.canvas ? { canvas: t.canvas } : {}),
    };
  }),

  // ★1 — compléter dans une situation : ce qui manque, ce qui est parti.
  tpl(C, "g03", 1, "Écris l'égalité de la situation, puis cherche le nombre manquant.", () => {
    const st = un(STOCKS);
    const plus = Math.random() < 0.55;
    const a = entre(25, 180), x = entre(12, 150);
    if (plus) {
      const c = a + x;
      const eq = `${a} + … = ${c}`;
      return {
        text: phrase(
          `${cap(st.qui)} a ${a} ${st.obj}. ${cap(st.il)} voudrait en avoir ${c}.`,
          un([`Complète : ${eq}.`, `Combien lui en manque-t-il ? ${eq}`, `Quel nombre complète l'égalité ${eq} ?`, `Il lui en manque combien ? Complète ${eq}.`]),
        ),
        ...qcmN(x, [a + c, c, x + 10, x - 1]),
        explanation: etapes("Ce qu'on a, plus ce qui manque, donne ce qu'on veut : on calcule la différence.", `${c} − ${a} = ${x}.`, `${a} + ${x} = ${c}.`),
        canvas: barre({ title: eq, total: String(c), parts: [{ label: "déjà là", value: a }, { label: "manque", unknown: true }] }),
      };
    }
    const A = a + x;
    const eq = `${A} − … = ${a}`;
    return {
      text: phrase(
        `${cap(st.qui)} a ${A} ${st.obj}. ${cap(st.il)} ${st.perd} une partie ; il lui en reste ${a}.`,
        un([`Complète : ${eq}.`, `Quel nombre complète ${eq} ?`, `Trouve le nombre manquant : ${eq}.`, `Combien en sont partis ? Complète ${eq}.`]),
      ),
      ...qcmN(x, [A + a, a, x + 10, x + 1]),
      explanation: etapes("Ce qui est parti, c'est l'écart entre le début et ce qui reste.", `${A} − ${a} = ${x}.`, `${A} − ${x} = ${a}.`),
      canvas: barre({ title: eq, total: String(A), parts: [{ label: "partis", unknown: true }, { label: "reste", value: a }] }),
    };
  }),

  // ★2 — « 37 + 18 = … + 20 » : le piège du résultat (55).
  tpl(C, "g04", 2, "Calcule d'abord le côté complet, puis cherche ce qui manque de l'autre côté.", () => {
    const s = un(SYMB);
    const a = entre(15, 150), b = entre(15, 150), T = a + b;
    const d = entre(5, T - 6), x = T - d;
    const forme = un([0, 1, 2]);
    const eq = forme === 0 ? `${a} + ${b} = ${s} + ${d}` : forme === 1 ? `${a} + ${b} = ${d} + ${s}` : `${s} + ${d} = ${a} + ${b}`;
    return {
      text: un(Q_COMPLETE(eq, s)),
      ...qcmN(x, [T, T + d, x + 1, x - 10]),
      explanation: etapes(
        `Le signe = veut dire « a la même valeur que ». ${s} n'est pas le résultat de ${a} + ${b} : il faut que les deux côtés valent autant.`,
        `${a} + ${b} = ${T}, puis ${T} − ${d} = ${x}.`,
        `${a} + ${b} = ${x} + ${d} : les deux côtés valent ${T}.`,
      ),
      canvas: barre({ title: eq, total: `${a} + ${b}`, parts: [{ label: "?", unknown: true }, { label: String(d), value: d }] }),
    };
  }),

  // ★2 — compléter avec des décimaux, et × 10, × 100, × 1 000.
  tpl(C, "g05", 2, "Avec les décimaux : dixièmes avec dixièmes ; × 10 décale chaque chiffre d'un rang.", () => {
    const s = un(SYMB);
    const forme = un(["plus", "moins", "x10", "div10"] as const);
    if (forme === "plus") {
      const a = dixNE(0.5, 9.5), x = dixNE(0.5, 6), c = r2(a + x);
      const eq = `${fr(a)} + ${s} = ${fr(c)}`;
      return {
        text: un(Q_COMPLETE(eq, s)),
        ...qcmN(x, [r2(c + a), r2(x + 1), r2(c - Math.floor(a)), r2(x + 0.1)]),
        explanation: etapes("On cherche ce qu'il faut ajouter : on calcule la différence.", `${fr(c)} − ${fr(a)} = ${fr(x)}.`, `${fr(a)} + ${fr(x)} = ${fr(c)}.`),
        canvas: barre({ title: eq, total: fr(c), parts: [{ label: fr(a), value: a }, { label: "?", unknown: true }] }),
      };
    }
    if (forme === "moins") {
      const b = dixNE(0.5, 5), c = dixNE(0.5, 8), x = r2(b + c);
      const eq = `${s} − ${fr(b)} = ${fr(c)}`;
      return {
        text: un(Q_COMPLETE(eq, s)),
        ...qcmN(x, [Math.abs(r2(c - b)), r2(x + 1), r2(x - 1), r2(x + 0.1)]),
        explanation: etapes("On a enlevé : pour retrouver le nombre de départ, on ajoute.", `${fr(c)} + ${fr(b)} = ${fr(x)}.`, `${fr(x)} − ${fr(b)} = ${fr(c)}.`),
        canvas: barre({ title: eq, total: "?", parts: [{ label: "on enlève", value: b }, { label: "il reste", value: c }] }),
      };
    }
    if (forme === "x10") {
      const k = un([10, 100, 1000]);
      const a = Math.random() < 0.5 ? dixNE(1, 9.9) : entre(101, 999) / 100;
      const c = r2(a * k);
      const eq = `${fr(a)} × ${s} = ${fr(c)}`;
      return {
        text: un(Q_COMPLETE(eq, s)),
        ...qcmN(k, [1, 10, 100, 1000, 10000].filter((v) => v !== k)),
        explanation: etapes("Multiplier par 10, 100 ou 1 000 décale chaque chiffre de 1, 2 ou 3 rangs vers la gauche.", `Le chiffre des unités ${Math.floor(a) % 10} de ${fr(a)} devient le chiffre des ${k === 10 ? "dizaines" : k === 100 ? "centaines" : "milliers"}.`, `${fr(a)} × ${fr(k)} = ${fr(c)}.`),
        canvas: numeration(a),
      };
    }
    const k = un([10, 100]);
    const q = k === 10 ? dixNE(1, 9.9) : entre(101, 999) / 100;
    const x = r2(q * k);
    const eq = `${s} ÷ ${k} = ${fr(q)}`;
    return {
      text: un(Q_COMPLETE(eq, s)),
      ...qcmN(x, [r2(x * 10), r2(x / 10), r2(q + k), r2(x + 1)]),
      explanation: etapes(`Pour défaire « ÷ ${k} », on multiplie par ${k}.`, `${fr(q)} × ${k} = ${fr(x)}.`, `${fr(x)} ÷ ${k} = ${fr(q)}.`),
      canvas: numeration(q),
    };
  }),

  // ★2 — compléter une multiplication en situation (6 × … confondu avec 6 + …).
  tpl(C, "g06", 2, "Cherche dans la table : combien de fois ce nombre ?", () => {
    const pk = un(PACKS);
    const k = entre(3, 12), n = entre(3, 12), N = k * n;
    const parPaquet = Math.random() < 0.45;
    const chacun = pk.g === "f" ? "chacune" : "chacun";
    if (parPaquet) {
      const eq = `${n} × … = ${N}`;
      return {
        text: phrase(
          `${cap(pk.qui)} répartit ${N} ${pk.o} dans ${n} ${pk.cs}, autant dans ${chacun}.`,
          un([`Complète : ${eq}.`, `Combien ${de(pk.o)} par ${pk.c} ? Complète ${eq}.`, `Quel nombre complète ${eq} ?`]),
        ),
        ...qcmN(k, [N - n, N + n, k + 1, k - 1]),
        explanation: etapes(`${n} fois combien font ${N} ? On cherche dans la table de ${n}.`, `${N} ÷ ${n} = ${k}.`, `${n} × ${k} = ${N}.`),
        canvas: tableau({ coin: cap(pk.cs), headers: ["1", n], rows: [{ label: cap(pk.o), values: ["?", N] }], cell: { row: 0, col: 0 } }),
      };
    }
    const eq = `${k} × … = ${N}`;
    return {
      text: phrase(
        `${cap(pk.qui)} range ${N} ${pk.o} par ${pk.cs} de ${k}.`,
        un([`Combien de ${pk.cs} lui faut-il ? Complète : ${eq}.`, `Complète l'égalité ${eq} pour trouver le nombre de ${pk.cs}.`, `Quel nombre complète ${eq} ?`]),
      ),
      ...qcmN(n, [N - k, N + k, n + 1, n - 1]),
      explanation: etapes(`${k} fois combien font ${N} ? On cherche dans la table de ${k}.`, `${N} ÷ ${k} = ${n}.`, `${k} × ${n} = ${N}.`),
      canvas: tableau({ coin: cap(pk.cs), headers: ["1", "?"], rows: [{ label: cap(pk.o), values: [k, N] }], cell: { row: 0, col: 1 } }),
    };
  }),

  // ★3 — un produit d'un côté : « 7 × 8 = 40 + … ».
  tpl(C, "g07", 3, "Calcule le côté complet, puis cherche le nombre qui donne la même valeur.", () => {
    const s = un(SYMB);
    const a = entre(3, 12), b = entre(4, 15), P = a * b;
    const forme = un(["plus", "fois", "moins", "somme"] as const);
    if (forme === "plus") {
      const c = entre(5, P - 3), x = P - c;
      const eq = `${a} × ${b} = ${c} + ${s}`;
      return {
        text: un(Q_COMPLETE(eq, s)),
        ...qcmN(x, [P, P + c, a + b - c, x + 1]),
        explanation: etapes(`${a} × ${b} vaut ${P} ; il faut que ${c} + ${s} vaille aussi ${P}.`, `${P} − ${c} = ${x}.`, `${a} × ${b} = ${c} + ${x}.`),
        canvas: barre({ title: eq, total: `${a} × ${b}`, parts: [{ label: String(c), value: c }, { label: "?", unknown: true }] }),
      };
    }
    if (forme === "fois") {
      const ds: number[] = [];
      for (let d = 2; d <= 12; d++) if (P % d === 0 && d !== a && d !== b && P / d >= 2 && P / d <= 30) ds.push(d);
      if (ds.length) {
        const d = un(ds), x = P / d;
        const eq = `${a} × ${b} = ${s} × ${d}`;
        return {
          text: un(Q_COMPLETE(eq, s)),
          ...qcmN(x, [P, P - d, a + b - d, x + 1]),
          explanation: etapes(`${a} × ${b} vaut ${P} ; il faut que ${s} × ${d} vaille aussi ${P}.`, `${P} ÷ ${d} = ${x}.`, `${a} × ${b} = ${x} × ${d}.`),
          canvas: d <= 8 ? barre({ title: eq, total: `${a} × ${b}`, parts: parts(d, "?") }) : tableau({ coin: "", headers: ["À gauche", "À droite"], rows: [{ values: [`${a} × ${b}`, `? × ${d}`] }] }),
        };
      }
    }
    if (forme === "somme") {
      const c = un([2, 3, 4, 5, 6, 8]), x = entre(4, 15), T = c * x, u = entre(3, T - 3);
      const eq = `${u} + ${T - u} = ${c} × ${s}`;
      return {
        text: un(Q_COMPLETE(eq, s)),
        ...qcmN(x, [T, T - c, x + 1, x - 1]),
        explanation: etapes(`${u} + ${T - u} vaut ${T} ; il faut que ${c} × ${s} vaille aussi ${T}.`, `${T} ÷ ${c} = ${x}.`, `${u} + ${T - u} = ${c} × ${x}.`),
        canvas: barre({ title: eq, total: `${u} + ${T - u}`, parts: parts(c, "?") }),
      };
    }
    const d = entre(5, 40), x = P + d;
    const eq = `${a} × ${b} = ${s} − ${d}`;
    return {
      text: un(Q_COMPLETE(eq, s)),
      ...qcmN(x, [P, P - d, x + 1, x - 10]),
      explanation: etapes(`${a} × ${b} vaut ${P} ; il faut que ${s} − ${d} vaille aussi ${P}.`, `${P} + ${d} = ${x}.`, `${a} × ${b} = ${x} − ${d}.`),
      canvas: barre({ title: eq, total: "?", parts: [{ label: `${a} × ${b}`, value: P }, { label: "on enlève", value: d }] }),
    };
  }),

  // ★3 — autant de paquets ? « 6 × 12 = 8 × … ».
  tpl(C, "g08", 3, "Calcule d'abord le total du premier, puis partage-le.", () => {
    const [A, B] = deux();
    const pk = un(PACKS);
    const V = un([24, 36, 48, 60, 72, 80, 90, 96, 100, 120]);
    const fs: [number, number][] = [];
    for (let d = 2; d <= 12; d++) if (V % d === 0 && V / d >= 3 && V / d <= 30) fs.push([d, V / d]);
    const [n1, k1] = un(fs);
    const [n2, x] = un(fs.filter(([d]) => d !== n1));
    const eq = `${n1} × ${k1} = ${n2} × …`;
    return {
      text: phrase(
        `${A.nom} a ${n1} ${pk.cs} de ${k1} ${pk.o}. ${B.nom} veut autant ${de(pk.o)} avec ${n2} ${pk.cs} identiques.`,
        un([`Combien ${de(pk.o)} dans chaque ${pk.c} ? Complète : ${eq}`, `Complète l'égalité ${eq}`, `Quel nombre complète ${eq} ?`]),
      ),
      ...qcmN(x, [V, V - n2, k1, k1 + n1 - n2, x + 1]),
      explanation: etapes(`${A.nom} a ${n1} × ${k1} = ${V} ${pk.o}. Il en faut ${V} aussi avec ${n2} ${pk.cs}.`, `${V} ÷ ${n2} = ${x}.`, `${n1} × ${k1} = ${n2} × ${x}.`),
      canvas: tableau({
        coin: "",
        headers: [cap(pk.cs), `${cap(pk.o)} par ${pk.c}`, "Total"],
        rows: [
          { label: A.nom, values: [n1, k1, "?"] },
          { label: B.nom, values: [n2, "?", "?"] },
        ],
        cell: { row: 1, col: 1 },
      }),
    };
  }),

  // ★3 — la balance en équilibre, masses décimales.
  tpl(C, "g09", 3, "Les deux plateaux ont la même masse : calcule le plateau complet.", () => {
    const obj = un(BALANCE_OBJ);
    const a = dixNE(1, 9), b = dixNE(1, 9), T = r2(a + b);
    let c = dixNE(0.5, T - 0.5);
    for (let i = 0; i < 10 && c >= T; i++) c = dixNE(0.5, T - 0.5);
    if (c >= T) c = r2(T / 2);
    const x = r2(T - c);
    return {
      text: phrase(
        `${un(BALANCE_QUI)} pèse ${obj} sur une balance à deux plateaux. La balance est en équilibre. À gauche : ${fr(a)} kg et ${fr(b)} kg. À droite : ${fr(c)} kg et ${obj}.`,
        un([`Combien pèse ${obj} ?`, `Quelle est la masse ${deUn(obj)} ?`, `Complète : ${fr(a)} + ${fr(b)} = ${fr(c)} + … Combien pèse ${obj} ?`]),
      ),
      ...qcmN(x, [T, r2(T + c), r2(x + 1), r2(x + 0.1)], "kg"),
      explanation: etapes("Une balance en équilibre, c'est une égalité : les deux plateaux ont la même masse.", `${fr(a)} + ${fr(b)} = ${fr(T)} ; ${fr(T)} − ${fr(c)} = ${fr(x)}.`, `${fr(a)} + ${fr(b)} = ${fr(c)} + ${fr(x)} : il pèse ${fr(x)} kg.`),
      canvas: barre({ title: "Balance en équilibre", total: `${fr(a)} kg + ${fr(b)} kg`, parts: [{ label: `${fr(c)} kg`, value: c }, { label: "l'objet", unknown: true }] }),
    };
  }),

  // ★3 — soustractions des deux côtés.
  tpl(C, "g10", 3, "Calcule le côté complet ; le nombre caché doit donner la même valeur.", () => {
    const s = un(SYMB);
    const forme = un([0, 1, 2]);
    if (forme === 0) {
      const a = entre(60, 250), b = entre(10, 50), D = a - b, d = entre(5, 40), x = D + d;
      const eq = `${a} − ${b} = ${s} − ${d}`;
      return {
        text: un(Q_COMPLETE(eq, s)),
        ...qcmN(x, [D, D - d, x + 10, x - 1]),
        explanation: etapes(`${a} − ${b} vaut ${D} : il faut que ${s} − ${d} vaille aussi ${D}.`, `${D} + ${d} = ${x}.`, `${a} − ${b} = ${x} − ${d}.`),
        canvas: barre({ title: eq, total: "?", parts: [{ label: `${a} − ${b}`, value: D }, { label: "on enlève", value: d }] }),
      };
    }
    if (forme === 1) {
      const a = entre(60, 250), b = entre(10, 50), D = a - b, c = D + entre(10, 60), x = c - D;
      const eq = `${a} − ${b} = ${c} − ${s}`;
      return {
        text: un(Q_COMPLETE(eq, s)),
        ...qcmN(x, [D, c + D, x + 10, x + 1]),
        explanation: etapes(`${a} − ${b} vaut ${D} : il faut que ${c} − ${s} vaille aussi ${D}.`, `${c} − ${D} = ${x}.`, `${a} − ${b} = ${c} − ${x}.`),
        canvas: barre({ title: eq, total: String(c), parts: [{ label: `${a} − ${b}`, value: D }, { label: "?", unknown: true }] }),
      };
    }
    const a = entre(20, 120), b = entre(20, 120), T = a + b, d = entre(5, 40), x = T + d;
    const eq = `${a} + ${b} = ${s} − ${d}`;
    return {
      text: un(Q_COMPLETE(eq, s)),
      ...qcmN(x, [T, T - d, x + 1, x - 10]),
      explanation: etapes(`${a} + ${b} vaut ${T} : il faut que ${s} − ${d} vaille aussi ${T}.`, `${T} + ${d} = ${x}.`, `${a} + ${b} = ${x} − ${d}.`),
      canvas: barre({ title: eq, total: "?", parts: [{ label: `${a} + ${b}`, value: T }, { label: "on enlève", value: d }] }),
    };
  }),

  // ★3 — divisions et produits des deux côtés : « 72 ÷ 8 = … ÷ 4 ».
  tpl(C, "g11", 3, "Calcule le côté complet, puis défais l'opération de l'autre côté.", () => {
    const s = un(SYMB);
    const forme = un(["divdiv", "foisdiv", "divfois"] as const);
    if (forme === "divdiv") {
      const q = entre(3, 12), k1 = entre(2, 9), k2 = un([2, 3, 4, 5].filter((v) => v !== k1)), x = q * k2;
      const eq = `${q * k1} ÷ ${k1} = ${s} ÷ ${k2}`;
      return {
        text: un(Q_COMPLETE(eq, s)),
        ...qcmN(x, [q, q * k1, q + k2, x + k2]),
        explanation: etapes(`${q * k1} ÷ ${k1} vaut ${q} ; il faut que ${s} ÷ ${k2} vaille aussi ${q}.`, `${q} × ${k2} = ${x}.`, `${q * k1} ÷ ${k1} = ${x} ÷ ${k2}.`),
        canvas: barre({ title: eq, total: "?", parts: parts(k2, String(q), q) }),
      };
    }
    if (forme === "foisdiv") {
      const a = entre(3, 9), b = entre(3, 9), P = a * b, k = un([2, 3, 4]), x = P * k;
      const eq = `${a} × ${b} = ${s} ÷ ${k}`;
      return {
        text: un(Q_COMPLETE(eq, s)),
        ...qcmN(x, [P, P + k, Math.max(1, Math.round(P / k)), x + k]),
        explanation: etapes(`${a} × ${b} vaut ${P} ; il faut que ${s} ÷ ${k} vaille aussi ${P}.`, `${P} × ${k} = ${x}.`, `${a} × ${b} = ${x} ÷ ${k}.`),
        canvas: barre({ title: eq, total: "?", parts: parts(k, `${a} × ${b}`, P) }),
      };
    }
    const q = entre(4, 15), k1 = entre(2, 6), A = q * k1;
    const ds: number[] = [];
    for (let d = 2; d <= 9; d++) if (q % d === 0 && q / d >= 2) ds.push(d);
    const d = ds.length ? un(ds) : 1;
    if (d === 1) {
      const eq = `${A} ÷ ${k1} = ${s} + ${Math.max(1, q - 3)}`;
      const x = q - Math.max(1, q - 3);
      return {
        text: un(Q_COMPLETE(eq, s)),
        ...qcmN(x, [q, q + 3, A - k1, x + 1]),
        explanation: etapes(`${A} ÷ ${k1} vaut ${q}.`, `${q} − ${Math.max(1, q - 3)} = ${x}.`, `${A} ÷ ${k1} = ${x} + ${Math.max(1, q - 3)}.`),
        canvas: barre({ title: eq, total: `${A} ÷ ${k1}`, parts: [{ label: "?", unknown: true }, { label: String(Math.max(1, q - 3)), value: Math.max(1, q - 3) }] }),
      };
    }
    const x = q / d;
    const eq = `${A} ÷ ${k1} = ${d} × ${s}`;
    return {
      text: un(Q_COMPLETE(eq, s)),
      ...qcmN(x, [q, q * d, q - d, x + 1]),
      explanation: etapes(`${A} ÷ ${k1} vaut ${q} ; il faut que ${d} × ${s} vaille aussi ${q}.`, `${q} ÷ ${d} = ${x}.`, `${A} ÷ ${k1} = ${d} × ${x}.`),
      canvas: barre({ title: eq, total: `${A} ÷ ${k1}`, parts: parts(d, "?") }),
    };
  }),
];

/* ═════════════════════════ ALGEBRE_NOMBRE_INCONNU ═════════════════════════ */

const N = "algebre_nombre_inconnu";
type Op = "+" | "−" | "×" | "÷";
function devinette(op: Op, x: number, k: number) {
  const je = Math.random() < 0.5;
  const P = perso();
  const lead = je
    ? un(["Je pense à un nombre.", "Devine mon nombre mystère.", "J'ai choisi un nombre secret.", "Voici ma devinette."])
    : un([`${P.nom} pense à un nombre.`, `Devinette de ${P.nom} : ${P.il} a choisi un nombre secret.`, `${P.nom} cache un nombre dans sa tête.`, `Le magicien demande à ${P.nom} de choisir un nombre.`]);
  const S = je ? "Je" : cap(P.il);
  const verbe =
    op === "+" ? `${S} lui ajoute ${k}`
    : op === "−" ? `${S} lui ${un(["enlève", "retire"])} ${k}`
    : op === "×" ? (k === 2 && Math.random() < 0.4 ? `${S} le double` : k === 3 && Math.random() < 0.4 ? `${S} le triple` : `${S} le multiplie par ${k}`)
    : k === 2 && Math.random() < 0.4 ? (je ? "J'en prends la moitié" : `${S} en prend la moitié`) : `${S} le divise par ${k}`;
  const r = op === "+" ? x + k : op === "−" ? x - k : op === "×" ? x * k : x / k;
  const fin = je ? un([`et j'obtiens ${r}.`, `: je trouve ${r}.`, `et le résultat est ${r}.`]) : un([`et ${P.il} obtient ${r}.`, `: ${P.il} trouve ${r}.`, `et le résultat est ${r}.`]);
  const q = je
    ? un(["Quel est ce nombre ?", "Quel nombre ai-je choisi ?", "Quel est mon nombre de départ ?", "Retrouve mon nombre."])
    : un(["Quel est ce nombre ?", `Quel nombre a-t-${P.il} choisi ?`, "Quel est le nombre de départ ?", "Retrouve le nombre secret."]);
  return { text: phrase(lead, `${verbe} ${fin}`, q), r };
}
const INVERSE: Record<Op, string> = { "+": "−", "−": "+", "×": "÷", "÷": "×" };

const ARTICLES_PRIX = [
  { un: "un cahier", des: "cahiers", qui: "À la papeterie" },
  { un: "un croissant", des: "croissants", qui: "À la boulangerie" },
  { un: "un ticket de manège", des: "tickets de manège", qui: "À la fête foraine" },
  { un: "un paquet de cartes", des: "paquets de cartes", qui: "Au magasin de jeux" },
  { un: "un pot de peinture", des: "pots de peinture", qui: "Au magasin de bricolage" },
  { un: "un ballon", des: "ballons", qui: "Au magasin de sport" },
  { un: "un jus de fruits", des: "jus de fruits", qui: "À la cafétéria" },
  { un: "un livre de poche", des: "livres de poche", qui: "À la librairie" },
  { un: "un sachet de graines", des: "sachets de graines", qui: "À la jardinerie" },
  { un: "une place de piscine", des: "places de piscine", qui: "À la piscine" },
  { un: "un tube de colle", des: "tubes de colle", qui: "À la papeterie" },
  { un: "une crêpe", des: "crêpes", qui: "À la crêperie" },
  { un: "une baguette", des: "baguettes", qui: "À la boulangerie" },
  { un: "un bouquet de tulipes", des: "bouquets de tulipes", qui: "Chez la fleuriste" },
  { un: "un billet de bus", des: "billets de bus", qui: "Au guichet" },
  { un: "un kilo de pommes", des: "kilos de pommes", qui: "Au marché" },
];
const prixDe = (a: string) => (a.startsWith("une ") ? `d'une ${a.slice(4)}` : `d'un ${a.slice(3)}`);

const inconnu: TutorBankItemV4[] = [
  // ★2 — je pense à un nombre (une opération).
  tpl(N, "g01", 2, "Fais l'opération inverse pour revenir au nombre de départ.", () => {
    const op = un(["+", "−", "×", "÷"] as Op[]);
    const k = op === "+" || op === "−" ? entre(12, 90) : entre(2, 9);
    const x = op === "+" ? entre(20, 300) : op === "−" ? entre(k + 10, 300) : op === "×" ? entre(3, 25) : k * entre(3, 25);
    const { text, r } = devinette(op, x, k);
    const faux = op === "+" ? [r + k, x + 10, x - 1] : op === "−" ? [r - k, x + 10, x - 1] : op === "×" ? [r - k, r + k, x + 1, r * k] : [r + k, Math.abs(r - k), x + k, r];
    const canvas =
      op === "+" ? barre({ total: String(r), parts: [{ label: "nombre", unknown: true }, { label: `+ ${k}`, value: k }] })
      : op === "−" ? barre({ total: "?", parts: [{ label: `on enlève ${k}`, value: k }, { label: "il reste", value: r }] })
      : op === "×" ? barre({ total: String(r), parts: parts(k, "?") })
      : barre({ total: "?", parts: parts(k, String(r), r) });
    return {
      text,
      ...qcmN(x, faux.filter((v) => v > 0)),
      explanation: etapes(`On remonte le calcul avec l'opération inverse : le contraire de « ${op} » est « ${INVERSE[op]} ».`, `${r} ${INVERSE[op]} ${k} = ${x}.`, `Le nombre est ${x} : ${x} ${op} ${k} = ${r}.`),
      canvas,
    };
  }),

  // ★2 — le nombre caché sous un symbole.
  tpl(N, "g02", 2, "Le symbole cache un nombre : utilise l'opération inverse.", () => {
    const s = un(["★", "■", "▲", "●", "♥", "?"]);
    const t = trouSimple(s, un(["a+x", "x+b", "a−x", "x−b", "a×x", "x×b", "x÷k", "a÷x"]));
    return {
      text: un([`Quel nombre se cache sous ${s} ? ${t.eq}`, `${t.eq} Que vaut ${s} ?`, `Trouve la valeur de ${s} : ${t.eq}`, `Dans ${t.eq}, quel nombre remplace ${s} ?`, `${s} est un nombre mystère : ${t.eq}. Lequel ?`]),
      ...qcmN(t.x, t.faux),
      explanation: etapes("On trouve le nombre caché avec l'opération inverse.", `${t.calc}.`, `${s} = ${t.x}, car ${t.eq.replace(s, String(t.x))}.`),
      ...(t.canvas ? { canvas: t.canvas } : {}),
    };
  }),

  // ★2 — combien au début ? (stock qui monte ou qui baisse).
  tpl(N, "g03", 2, "Remonte le temps : fais l'inverse de ce qui s'est passé.", () => {
    const st = un(STOCKS);
    const gain = Math.random() < 0.5;
    const b = entre(12, 90), x = entre(b + 15, 300);
    const c = gain ? x + b : x - b;
    const fin = gain ? `Maintenant, ${st.il} en a ${c}.` : `Il lui en reste ${c}.`;
    return {
      text: phrase(
        `${cap(st.qui)} a des ${st.obj}. ${cap(st.il)} ${gain ? st.gagne : st.perd} ${b}. ${fin}`,
        un([`Combien ${de(st.obj)} avait-${st.il} au début ?`, `Combien en avait-${st.il} au départ ?`, `Combien ${de(st.obj)} y avait-il avant ?`]),
      ),
      ...qcmN(x, gain ? [c + b, c, x + 10] : [c - b, c, x - 10]),
      explanation: etapes(
        gain ? "On a ajouté : pour revenir au début, on soustrait." : "On a enlevé : pour revenir au début, on ajoute.",
        gain ? `${c} − ${b} = ${x}.` : `${c} + ${b} = ${x}.`,
        `Au début, il y en avait ${x}.`,
      ),
      canvas: gain
        ? barre({ title: "Au début ?", total: String(c), parts: [{ label: "au début", unknown: true }, { label: "en plus", value: b }] })
        : barre({ title: "Au début ?", total: "?", parts: [{ label: "partis", value: b }, { label: "reste", value: c }] }),
    };
  }),

  // ★2 — quel calcul fait trouver l'inconnu ?
  tpl(N, "g04", 2, "Pour défaire une addition, on soustrait ; pour défaire une multiplication, on divise.", () => {
    const s = un(["★", "■", "▲", "●", "?", "x"]);
    const P = perso();
    const op = un(["+", "−", "×", "÷"] as Op[]);
    let eq = "", juste = "", faux: string[] = [], canvas: CanvasFigure;
    if (op === "+") {
      const b = entre(15, 120), x = entre(15, 200), c = x + b;
      eq = un([`${s} + ${b} = ${c}`, `${b} + ${s} = ${c}`]);
      juste = `${c} − ${b}`; faux = [`${c} + ${b}`, `${b} − ${c}`, `${c} × ${b}`];
      canvas = barre({ title: eq, total: String(c), parts: [{ label: s, unknown: true }, { label: String(b), value: b }] });
    } else if (op === "−") {
      const b = entre(15, 120), c = entre(15, 200);
      eq = `${s} − ${b} = ${c}`;
      juste = `${c} + ${b}`; faux = [`${c} − ${b}`, `${b} − ${c}`, `${c} × ${b}`];
      canvas = barre({ title: eq, total: s, parts: [{ label: "on enlève", value: b }, { label: "il reste", value: c }] });
    } else if (op === "×") {
      const k = entre(3, 12), x = entre(3, 15), c = k * x;
      eq = un([`${s} × ${k} = ${c}`, `${k} × ${s} = ${c}`]);
      juste = `${c} ÷ ${k}`; faux = [`${c} − ${k}`, `${c} × ${k}`, `${c} + ${k}`];
      canvas = k <= 10 ? barre({ title: eq, total: String(c), parts: parts(k, s) }) : tableau({ coin: "", headers: ["Facteur connu", "Facteur caché", "Produit"], rows: [{ values: [k, s, c] }], cell: { row: 0, col: 1 } });
    } else {
      const k = entre(2, 9), q = entre(3, 15);
      eq = `${s} ÷ ${k} = ${q}`;
      juste = `${q} × ${k}`; faux = [`${q} ÷ ${k}`, `${q} + ${k}`, `${q} − ${k}`];
      canvas = barre({ title: eq, total: s, parts: parts(k, String(q), q) });
    }
    return {
      text: un([`Pour trouver ${s} dans ${eq}, quel calcul fais-tu ?`, `Quel calcul donne ${s} ? ${eq}`, `${P.nom} cherche ${s} dans ${eq}. Quel calcul doit-${P.il} faire ?`, `${eq} Quelle opération permet de trouver ${s} ?`]),
      ...qcm(juste, faux),
      explanation: etapes("On utilise l'opération inverse : + se défait par −, − par +, × par ÷, ÷ par ×.", `Pour ${eq}, on calcule ${juste}.`, `Le bon calcul est ${juste}.`),
      canvas,
    };
  }),

  // ★2 — la lettre x représente le nombre inconnu (vidéo, écran 2 : x + 9 = 20).
  tpl(N, "g05", 2, "x représente un nombre : fais l'opération inverse pour le trouver.", () => {
    const forme = un(["x+a", "a+x", "x−b", "k×x", "x÷k"] as const);
    let eq = "", x = 0, calc = "", faux: number[] = [], canvas: CanvasFigure;
    if (forme === "x+a" || forme === "a+x") {
      const petit = Math.random() < 0.35;
      const a = petit ? entre(4, 9) : entre(12, 90), c = petit ? entre(a + 5, 30) : entre(a + 15, 300);
      x = c - a;
      eq = forme === "x+a" ? `x + ${a} = ${c}` : `${a} + x = ${c}`;
      calc = `${c} − ${a} = ${x}`;
      faux = [c + a, c, x + 1, x - 10];
      canvas = barre({ title: eq, total: String(c), parts: forme === "x+a" ? [{ label: "x", unknown: true }, { label: String(a), value: a }] : [{ label: String(a), value: a }, { label: "x", unknown: true }] });
    } else if (forme === "x−b") {
      const b = entre(8, 90), c = entre(10, 200);
      x = b + c;
      eq = `x − ${b} = ${c}`;
      calc = `${c} + ${b} = ${x}`;
      faux = [Math.abs(c - b), c, x + 10, x - 1];
      canvas = barre({ title: eq, total: "x", parts: [{ label: "on enlève", value: b }, { label: "il reste", value: c }] });
    } else if (forme === "k×x") {
      const k = entre(2, 9), c = k * entre(3, 15);
      x = c / k;
      eq = `${k} × x = ${c}`;
      calc = `${c} ÷ ${k} = ${x}`;
      faux = [c - k, c + k, c * k, x + 1];
      canvas = barre({ title: eq, total: String(c), parts: parts(k, "x") });
    } else {
      const k = entre(2, 9), q = entre(3, 15);
      x = k * q;
      eq = `x ÷ ${k} = ${q}`;
      calc = `${q} × ${k} = ${x}`;
      faux = [q + k, Math.abs(q - k), x + k, x - 1];
      canvas = barre({ title: eq, total: "x", parts: parts(k, String(q), q) });
    }
    return {
      text: un([
        `La lettre x représente un nombre inconnu : ${eq}. Quel est ce nombre ?`,
        `On cherche le nombre x tel que ${eq}. Que vaut x ?`,
        `${eq} Quelle est la valeur de x ?`,
        `Trouve x : ${eq}`,
        `x est un nombre mystère et ${eq}. Que vaut x ?`,
        `Dans l'égalité ${eq}, quel nombre se cache derrière x ?`,
      ]),
      ...qcmN(x, faux.filter((v) => v > 0)),
      explanation: etapes("x représente le nombre inconnu. On le trouve avec l'opération inverse.", `${calc}.`, `x = ${x}, car ${eq.replace("x", String(x))}.`),
      canvas,
    };
  }),

  // ★3 — deux opérations : « je multiplie par 4 puis j'ajoute 7 ».
  tpl(N, "g06", 3, "Défais les opérations dans l'ordre inverse : la dernière d'abord.", () => {
    const je = Math.random() < 0.5;
    const P = perso();
    const k = entre(2, 9), b = entre(3, 40), x = entre(4, 25);
    const forme = un(["fois", "fois", "div"] as const);
    const lead = je ? un(["Je pense à un nombre.", "Voici ma devinette.", "J'ai choisi un nombre secret."]) : un([`${P.nom} pense à un nombre.`, `Devinette de ${P.nom} :`, `${P.nom} a choisi un nombre secret.`]);
    const S = je ? "je" : P.il;
    const obtient = (r: number) => (je ? `J'obtiens ${r}.` : `${cap(P.il)} obtient ${r}.`);
    const ajoute = (moins: boolean) => (moins ? `${je ? "j'enlève" : `${P.il} enlève`} ${b}` : `${je ? "j'ajoute" : `${P.il} ajoute`} ${b}`);
    if (forme === "div") {
      const X = k * x, r = x + b;
      return {
        text: phrase(lead, `${cap(S)} le divise par ${k}, puis ${ajoute(false)}. ${obtient(r)}`, un(["Quel est le nombre de départ ?", "Quel est ce nombre ?", "Retrouve le nombre choisi."])),
        ...qcmN(X, [r * k - b, x, r * k, (r + b) * k]),
        explanation: etapes("On défait les opérations en partant de la fin, avec les opérations inverses.", `${r} − ${b} = ${x}, puis ${x} × ${k} = ${X}.`, `Le nombre est ${X} : ${X} ÷ ${k} + ${b} = ${r}.`),
        canvas: barre({ title: `? ÷ ${k} + ${b} = ${r}`, total: String(r), parts: [{ label: `? ÷ ${k}`, unknown: true }, { label: `+ ${b}`, value: b }] }),
      };
    }
    const moins = Math.random() < 0.4 && x * k > b + 2;
    const r = moins ? x * k - b : x * k + b;
    const fois = k === 2 ? un(["le double", `le multiplie par ${k}`]) : k === 3 ? un(["le triple", `le multiplie par ${k}`]) : `le multiplie par ${k}`;
    const faux = moins ? [r + b, Math.round((r - b) / k) || 1, x + 1, r * k] : [r - b, Math.floor(r / k) - b, x + 1, r + b];
    return {
      text: phrase(lead, `${cap(S)} ${fois}, puis ${ajoute(moins)}. ${obtient(r)}`, un(["Quel est le nombre de départ ?", "Quel est ce nombre ?", "Retrouve le nombre choisi."])),
      ...qcmN(x, faux.filter((v) => v > 0)),
      explanation: etapes(
        "On défait les opérations en partant de la fin, avec les opérations inverses.",
        moins ? `${r} + ${b} = ${x * k}, puis ${x * k} ÷ ${k} = ${x}.` : `${r} − ${b} = ${x * k}, puis ${x * k} ÷ ${k} = ${x}.`,
        `Le nombre est ${x} : ${x} × ${k} ${moins ? "−" : "+"} ${b} = ${r}.`,
      ),
      canvas: moins
        ? barre({ title: `? × ${k} − ${b} = ${r}`, total: `${x * k}`, parts: [{ label: "résultat", value: r }, { label: `on enlève ${b}`, value: b }] })
        : barre({ title: `? × ${k} + ${b} = ${r}`, total: String(r), parts: [...parts(Math.min(k, 9), "?"), { label: `+ ${b}`, value: b }] }),
    };
  }),

  // ★3 — le prix inconnu (décimaux) ou le nombre d'articles.
  tpl(N, "g07", 3, "Écris la multiplication à trou, puis divise.", () => {
    const P = perso();
    const ar = un(ARTICLES_PRIX);
    const n = entre(2, 6);
    const x = entre(11, 95) / 10;
    const T = r2(n * x);
    const combien = Math.random() < 0.35;
    if (combien) {
      return {
        text: phrase(
          `${ar.qui}, ${ar.un} coûte ${eur(x)}. ${P.nom} paie ${eur(T)} pour des ${ar.des} identiques.`,
          un([`Combien de ${ar.des} achète-t-${P.il} ?`, `Combien de ${ar.des} a-t-${P.il} pris ?`, `Trouve le nombre de ${ar.des} : ? × ${eur(x)} = ${eur(T)}.`]),
        ),
        ...qcmN(n, [n + 1, n - 1, n + 2, Math.round(T)]),
        explanation: etapes(`Le nombre ${de(ar.des)} est l'inconnu : ? × ${eur(x)} = ${eur(T)}.`, `${eur(T)} ÷ ${eur(x)} = ${n}, car ${n} × ${eur(x)} = ${eur(T)}.`, `${cap(P.il)} achète ${n} ${ar.des}.`),
        canvas: tableau({ coin: cap(ar.des), headers: ["1", "?"], rows: [{ label: "Prix", values: [eur(x), eur(T)] }], cell: { row: 0, col: 1 } }),
      };
    }
    return {
      text: phrase(
        `${ar.qui}, ${P.nom} paie ${eur(T)} pour ${n} ${ar.des} identiques.`,
        un([`Combien coûte ${ar.un} ?`, `Quel est le prix ${prixDe(ar.un)} ?`, `Trouve le prix ${prixDe(ar.un)} : ${n} × ? = ${eur(T)}.`]),
      ),
      ...qcmE(x, [r2(T - n), r2(x + 1), r2(x * 10), r2(T / (n + 1)), r2(x + 0.1)], 0.1),
      explanation: etapes(`Le prix ${prixDe(ar.un)} est l'inconnu : ${n} × ? = ${eur(T)}.`, `${eur(T)} ÷ ${n} = ${eur(x)}.`, `${cap(ar.un)} coûte ${eur(x)}.`),
      canvas: barre({ total: eur(T), parts: parts(n, "?") }),
    };
  }),

  // ★3 — deux événements : il reçoit puis il donne.
  tpl(N, "g08", 3, "Repars de la fin et fais les opérations inverses, une à une.", () => {
    const st = un(STOCKS);
    const b = entre(12, 80), d = entre(10, 70), x = entre(Math.max(d, 20) + 15, 250);
    const gagneDabord = Math.random() < 0.5;
    const c = x + b - d;
    const e1 = gagneDabord ? `${st.gagne} ${b}` : `${st.perd} ${d}`;
    const e2 = gagneDabord ? `${st.perd} ${d}` : `${st.gagne} ${b}`;
    return {
      text: phrase(
        `${cap(st.qui)} a des ${st.obj}. ${cap(st.il)} ${e1}, puis ${st.il} ${e2}. Maintenant, ${st.il} en a ${c}.`,
        un([`Combien ${de(st.obj)} avait-${st.il} au début ?`, `Combien en avait-${st.il} au départ ?`, "Quel était le nombre de départ ?"]),
      ),
      ...qcmN(x, [c - b - d, c + b + d, c + b - d, c].filter((v) => v > 0)),
      explanation: etapes(`${b} en plus et ${d} en moins : on défait avec les opérations inverses.`, `${c} − ${b} + ${d} = ${x}.`, `Au début, il y en avait ${x}.`),
      canvas: barre({ title: "Au début ?", total: String(c), parts: [{ label: "au début", unknown: true }, { label: `+ ${b}`, value: b }, { label: `− ${d}`, value: d }] }),
    };
  }),

  // ★3 — le même symbole plusieurs fois : ★ + ★ + ★ = 63, 3 × ★ + 8 = 50.
  tpl(N, "g09", 3, "Quand le même symbole revient, il vaut toujours le même nombre.", () => {
    const s = un(["★", "■", "▲", "●", "♥"]);
    const forme = un([0, 1, 2]);
    if (forme === 0) {
      const k = un([2, 3, 4, 5]), x = entre(6, 40), T = k * x;
      const eq = Array.from({ length: k }, () => s).join(" + ") + ` = ${T}`;
      return {
        text: un([`Que vaut ${s} ? ${eq}`, `${eq} Quel nombre se cache sous ${s} ?`, `Trouve ${s} : ${eq}`, `Les ${s} cachent tous le même nombre : ${eq}. Lequel ?`]),
        ...qcmN(x, [T - k, T, x + 1, Math.floor(T / (k + 1))]),
        explanation: etapes(`${eq} veut dire ${k} × ${s} = ${T}.`, `${T} ÷ ${k} = ${x}.`, `${s} = ${x}.`),
        canvas: barre({ title: eq, total: String(T), parts: parts(k, s) }),
      };
    }
    const k = un([2, 3, 4]), b = entre(3, 30), x = entre(4, 25), T = k * x + b;
    const eq = forme === 1 ? `${Array.from({ length: k }, () => s).join(" + ")} + ${b} = ${T}` : `${k} × ${s} + ${b} = ${T}`;
    return {
      text: un([`Que vaut ${s} ? ${eq}`, `${eq} Quel nombre se cache sous ${s} ?`, `Trouve ${s} : ${eq}`, `Le symbole ${s} cache toujours le même nombre : ${eq}. Lequel ?`]),
      ...qcmN(x, [T - b, Math.floor(T / k), x + 1, T - b - k]),
      explanation: etapes(`On enlève d'abord ${b}, puis on partage en ${k}.`, `${T} − ${b} = ${T - b}, puis ${T - b} ÷ ${k} = ${x}.`, `${s} = ${x}.`),
      canvas: barre({ title: eq, total: String(T), parts: [...parts(k, s), { label: String(b), value: b }] }),
    };
  }),

  // ★3 — modéliser (vidéo, écran 3) : 3 paniers cachent x pommes, plus 2 pommes.
  tpl(N, "g10", 3, "Écris l'égalité : nombre de paniers × x + objets visibles = total.", () => {
    const pomme = Math.random() < 0.5;
    const P = perso();
    const k = entre(2, 5), b = entre(2, 9), x = entre(4, 20), T = k * x + b;
    const cont = pomme ? { c: "paniers", c1: "panier", o: "pommes" } : { c: "bocaux", c1: "bocal", o: "pièces" };
    const qui = pomme
      ? un([`${P.nom} cueille des pommes au verger.`, "Le marchand de fruits prépare sa vitrine.", "La cantine reçoit des pommes.", `${P.nom} aide la fermière.`, "Au marché, la primeure range ses fruits."])
      : un([`${P.nom} range ses économies.`, "Le caissier compte la monnaie.", "Le trésorier du club fait les comptes.", `${P.nom} vide sa tirelire.`, "La boulangère prépare son fond de caisse."]);
    const modele = Math.random() < 0.4;
    if (modele) {
      const J = `${k} × x + ${b} = ${T}`;
      return {
        text: phrase(
          qui,
          `${k} ${cont.c} contiennent chacun le même nombre ${de(cont.o)}, et ${b} ${cont.o} sont à côté. En tout : ${T} ${cont.o}.`,
          un([`On appelle x le nombre ${de(cont.o)} d'un ${cont.c1}. Quelle égalité modélise la situation ?`, `x représente le nombre ${de(cont.o)} par ${cont.c1}. Quelle égalité est juste ?`]),
        ),
        ...qcm(J, [`${k} + x + ${b} = ${T}`, `${b} × x + ${k} = ${T}`, `x + ${b} = ${T}`, `${k} × x = ${T} + ${b}`]),
        explanation: etapes(`${k} ${cont.c} de x ${cont.o}, c'est ${k} × x. On ajoute les ${b} ${cont.o} visibles.`, `${k} × x + ${b} = ${T}.`, `L'égalité est ${J}.`),
        canvas: { ...cache(pomme ? "pomme" : "pieces", k, b, "", `${k} ${cont.c} cachent le même nombre ${de(cont.o)}.`), display: { showConcret: true, showExpression: false, showPhrase: true, showLabels: true } } as CanvasFigure,
      };
    }
    return {
      text: phrase(
        qui,
        `${k} ${cont.c} contiennent chacun le même nombre ${de(cont.o)}, et ${b} ${cont.o} sont à côté. En tout : ${T} ${cont.o}.`,
        un([`Combien ${de(cont.o)} dans un ${cont.c1} ?`, `Que vaut x, le nombre ${de(cont.o)} d'un ${cont.c1} ?`, `Trouve x : ${k} × x + ${b} = ${T}.`]),
      ),
      ...qcmN(x, [T - b, Math.floor(T / k), x + b, x + 1]),
      explanation: etapes(`On modélise : ${k} × x + ${b} = ${T}. On enlève d'abord les ${b} ${cont.o} visibles, puis on partage.`, `${T} − ${b} = ${T - b}, puis ${T - b} ÷ ${k} = ${x}.`, `x = ${x} : il y a ${x} ${cont.o} dans un ${cont.c1}.`),
      canvas: cache(pomme ? "pomme" : "pieces", k, b, `${k}x + ${b} = ${T}`, `${k} ${cont.c} cachent le même nombre ${de(cont.o)} ; ${b} ${cont.o} sont visibles.`),
    };
  }),
];

/* ═════════════════════════ ALGEBRE_SCHEMA_BARRE ═════════════════════════ */

const S = "algebre_schema_barre";
const DEUX_GROUPES = [
  { g: "Dans le collège du quartier", A: "filles", B: "garçons", u: "élèves" },
  { g: "Dans le verger", A: "pommiers", B: "poiriers", u: "arbres" },
  { g: "Au refuge", A: "chats", B: "chiens", u: "animaux" },
  { g: "À la médiathèque", A: "albums", B: "romans", u: "livres" },
  { g: "Sur le parking du supermarché", A: "voitures", B: "motos", u: "véhicules" },
  { g: "Dans le stock de la papeterie", A: "stylos rouges", B: "stylos bleus", u: "stylos" },
  { g: "Au club de sport", A: "judokas", B: "nageurs", u: "inscrits" },
  { g: "Dans l'élevage de la fermière", A: "poules", B: "canards", u: "volailles" },
  { g: "Dans la vitrine du pâtissier", A: "éclairs", B: "tartelettes", u: "gâteaux" },
  { g: "Dans l'aquarium géant", A: "poissons rouges", B: "poissons-clowns", u: "poissons" },
  { g: "Sur l'étal du maraîcher", A: "tomates", B: "courgettes", u: "légumes" },
  { g: "Dans la collection de Malo", A: "cartes de foot", B: "cartes de basket", u: "cartes" },
  { g: "Dans la salle de concert", A: "adultes", B: "enfants", u: "spectateurs" },
  { g: "Dans l'entrepôt du magasin", A: "cartons de jouets", B: "cartons de livres", u: "cartons" },
  { g: "Dans les serres de la fleuriste", A: "roses", B: "tulipes", u: "fleurs" },
  { g: "Dans l'atelier du réparateur", A: "vélos", B: "trottinettes", u: "engins" },
  { g: "À la cantine", A: "élèves de CM1", B: "élèves de CM2", u: "élèves" },
  { g: "Dans le potager de l'école", A: "salades", B: "poireaux", u: "plants" },
  { g: "Sur le marché de Saint-Pierre, chez le marchand de fruits", A: "letchis", B: "mangues", u: "fruits" },
  { g: "Dans le hangar du club de voile", A: "planches à voile", B: "kayaks", u: "bateaux" },
  { g: "Dans le train", A: "voyageurs assis", B: "voyageurs debout", u: "voyageurs" },
] as const;

/** Une longueur, un trajet, une somme d'argent dont on a déjà une partie. */
const RESTES = [
  { t: (T: string, a: string, p: Perso) => `${p.nom} lit un livre de ${T} pages. ${cap(p.il)} en a déjà lu ${a}.`, q: "Combien de pages lui reste-t-il à lire ?", u: "", dec: false },
  { t: (T: string, a: string, p: Perso) => `${p.nom} fait une randonnée de ${T} km. ${cap(p.il)} a déjà parcouru ${a} km.`, q: "Combien de kilomètres lui reste-t-il ?", u: "km", dec: true },
  { t: (T: string, a: string) => `La couturière coupe ${a} m dans un rouleau de tissu de ${T} m.`, q: "Quelle longueur de tissu reste-t-il ?", u: "m", dec: true },
  { t: (T: string, a: string) => `Le film dure ${T} minutes. On en a déjà regardé ${a} minutes.`, q: "Combien de minutes reste-t-il ?", u: "min", dec: false },
  { t: (T: string, a: string) => `Une corde de ${T} m est coupée en deux morceaux. L'un mesure ${a} m.`, q: "Combien mesure l'autre morceau ?", u: "m", dec: true },
  { t: (T: string, a: string) => `Le pâtissier a besoin de ${T} g de farine. Il en a déjà pesé ${a} g.`, q: "Combien de grammes doit-il encore ajouter ?", u: "g", dec: false },
  { t: (T: string, a: string, p: Perso) => `À la piscine, ${p.nom} doit nager ${T} m. ${cap(p.il)} en a déjà nagé ${a}.`, q: "Combien de mètres lui reste-t-il à nager ?", u: "m", dec: false },
  { t: (T: string, a: string) => `Le camion de livraison doit parcourir ${T} km. La chauffeuse a déjà roulé ${a} km.`, q: "Combien de kilomètres lui reste-t-il ?", u: "km", dec: true },
  { t: (T: string, a: string) => `Le peintre doit poser ${T} m de frise. Il en a posé ${a} m.`, q: "Combien de mètres lui reste-t-il à poser ?", u: "m", dec: true },
  { t: (T: string, a: string) => `Pour la kermesse, il faut vendre ${T} tickets. On en a vendu ${a}.`, q: "Combien de tickets reste-t-il à vendre ?", u: "", dec: false },
  { t: (T: string, a: string) => `La jardinière doit planter ${T} bulbes. Elle en a planté ${a}.`, q: "Combien de bulbes lui reste-t-il à planter ?", u: "", dec: false },
  { t: (T: string, a: string, p: Perso) => `Le puzzle de ${p.nom} a ${T} pièces. ${cap(p.il)} en a posé ${a}.`, q: "Combien de pièces reste-t-il à poser ?", u: "", dec: false },
  { t: (T: string, a: string) => `La cycliste fait une course de ${T} km. Elle a déjà roulé ${a} km.`, q: "Combien de kilomètres lui reste-t-il ?", u: "km", dec: true },
  { t: (T: string, a: string) => `Le réservoir contient ${T} L d'eau. Le jardinier en utilise ${a} L.`, q: "Combien de litres reste-t-il ?", u: "L", dec: true },
];

const TROIS_GROUPES = [
  { g: "Dans le verger", A: "pommiers", B: "poiriers", C: "cerisiers", u: "arbres" },
  { g: "Sur le parking", A: "voitures", B: "motos", C: "camions", u: "véhicules" },
  { g: "Au refuge", A: "chats", B: "chiens", C: "lapins", u: "animaux" },
  { g: "Dans le stock de la papeterie", A: "crayons", B: "feutres", C: "stylos", u: "objets" },
  { g: "Au club de sport", A: "judokas", B: "nageurs", C: "danseurs", u: "inscrits" },
  { g: "Dans la vitrine de la boulangerie", A: "croissants", B: "pains au chocolat", C: "brioches", u: "viennoiseries" },
  { g: "Dans le jardin public", A: "rosiers", B: "tulipes", C: "marguerites", u: "plantes" },
  { g: "À la ferme", A: "poules", B: "canards", C: "oies", u: "volailles" },
  { g: "À la médiathèque", A: "albums", B: "romans", C: "bandes dessinées", u: "livres" },
  { g: "Au zoo, dans la volière", A: "perroquets", B: "flamants", C: "toucans", u: "oiseaux" },
  { g: "Au marché, sur l'étal", A: "tomates", B: "carottes", C: "courgettes", u: "légumes" },
  { g: "Dans le magasin de jouets", A: "puzzles", B: "ballons", C: "peluches", u: "jouets" },
  { g: "À l'école", A: "élèves de CE2", B: "élèves de CM1", C: "élèves de CM2", u: "élèves" },
] as const;

const ACHATS = [
  ["un livre", "un jeu"], ["un ballon", "une gourde"], ["un tee-shirt", "une casquette"], ["une trousse", "un compas"],
  ["un puzzle", "une peluche"], ["un cahier de dessin", "des feutres"], ["une place de cinéma", "un pot de pop-corn"],
  ["un bouquet", "un vase"], ["des chaussettes", "un bonnet"], ["un masque de plongée", "un tuba"], ["une raquette", "des balles"],
  ["un sac de billes", "un yoyo"], ["un pain", "une tarte"], ["un kilo de tomates", "un melon"],
] as const;

const MOITIE = [
  { t: (T: number, k: number) => `Le maraîcher récolte ${T} kg de tomates. Il vend la moitié au marché, puis range le reste dans ${k} cagettes identiques.`, q: "Combien de kilos de tomates y a-t-il dans une cagette ?", u: "kg" },
  { t: (T: number, k: number) => `Une école reçoit ${T} cahiers. La moitié va aux CM2, le reste est partagé également entre ${k} autres classes.`, q: "Combien de cahiers reçoit chacune de ces classes ?", u: "" },
  { t: (T: number, k: number, p: Perso) => `${p.nom} a ${T} €. ${cap(p.il)} dépense la moitié, puis partage le reste également entre ${k} tirelires.`, q: "Combien d'euros met-on dans chaque tirelire ?", u: "€" },
  { t: (T: number, k: number) => `La fermière ramasse ${T} œufs. Elle en garde la moitié et range le reste dans ${k} boîtes identiques.`, q: "Combien d'œufs y a-t-il dans une boîte ?", u: "" },
  { t: (T: number, k: number) => `Un rouleau de ${T} m de tissu est coupé en deux moitiés. La couturière coupe une moitié en ${k} morceaux égaux.`, q: "Combien mesure un morceau ?", u: "m" },
  { t: (T: number, k: number) => `La bibliothécaire a ${T} livres neufs. Elle en place la moitié en rayon et range le reste dans ${k} caisses identiques.`, q: "Combien de livres y a-t-il dans une caisse ?", u: "" },
  { t: (T: number, k: number) => `Le pâtissier prépare ${T} macarons. Il en vend la moitié le matin et emballe le reste dans ${k} boîtes identiques.`, q: "Combien de macarons dans une boîte ?", u: "" },
  { t: (T: number, k: number) => `Un club a ${T} ballons. La moitié reste au gymnase, le reste est partagé entre ${k} équipes.`, q: "Combien de ballons reçoit chaque équipe ?", u: "" },
];

const schemaBarre: TutorBankItemV4[] = [
  // ★2 — la partie manquante.
  tpl(S, "g01", 2, "Le tout moins la partie connue donne la partie cachée.", () => {
    const c = un(DEUX_GROUPES);
    const T = entre(120, 950), a = entre(40, T - 40), b = T - a;
    return {
      text: phrase(
        `${c.g}, il y a ${fr(T)} ${c.u} : ${a} ${c.A} et des ${c.B}.`,
        un([`Combien ${de(c.B)} y a-t-il ?`, `Combien ${de(c.B)} ?`, `Trouve le nombre ${de(c.B)}.`, `Aide-toi du schéma : combien ${de(c.B)} ?`]),
      ),
      ...qcmN(b, [T + a, a, b + 10, b - 100, b + 100]),
      explanation: etapes("Sur le schéma, la barre entière est le tout ; on enlève la partie connue.", `${T} − ${a} = ${b}.`, `Il y a ${b} ${c.B}.`),
      canvas: barre({ total: String(T), parts: [{ label: c.A, value: a }, { label: c.B, unknown: true }] }),
    };
  }),

  // ★2 — le tout.
  tpl(S, "g02", 2, "Les deux parties mises bout à bout forment le tout.", () => {
    const c = un(DEUX_GROUPES);
    const a = entre(60, 480), b = entre(60, 480), T = a + b;
    return {
      text: phrase(
        `${c.g}, il y a ${a} ${c.A} et ${b} ${c.B}.`,
        un([`Combien ${de(c.u)} y a-t-il en tout ?`, `Combien ${de(c.u)} au total ?`, `Quel est le nombre total ${de(c.u)} ?`, `Aide-toi du schéma : combien ${de(c.u)} en tout ?`]),
      ),
      ...qcmN(T, [Math.abs(a - b), T + 10, T - 10, T + 100]),
      explanation: etapes("Le tout, c'est les deux parties ensemble : on additionne.", `${a} + ${b} = ${T}.`, `Il y a ${fr(T)} ${c.u} en tout.`),
      canvas: barre({ total: "?", parts: [{ label: c.A, value: a }, { label: c.B, value: b }] }),
    };
  }),

  // ★2 — quel calcul le schéma montre-t-il ?
  tpl(S, "g03", 2, "Regarde où est le « ? » : c'est une partie ou le tout ?", () => {
    const c = un(DEUX_GROUPES);
    const T = entre(150, 900), a = entre(40, T - 40), b = T - a;
    const tout = Math.random() < 0.4;
    if (tout) {
      const juste = `${a} + ${b}`;
      return {
        text: phrase(
          `${c.g}, il y a ${a} ${c.A} et ${b} ${c.B}. Le schéma montre la situation.`,
          un([`Quel calcul donne le nombre total ${de(c.u)} ?`, "Quel calcul permet de trouver le « ? » ?", `Quel calcul faut-il faire pour trouver le nombre total ${de(c.u)} ?`]),
        ),
        ...qcm(juste, [`${Math.max(a, b)} − ${Math.min(a, b)}`, `${a} × ${b}`, `${a} + ${a}`]),
        explanation: etapes("Le « ? » est sur toute la barre : c'est le tout. On additionne les parties.", `${a} + ${b} = ${T}.`, `Le calcul est ${juste}.`),
        canvas: barre({ total: "?", parts: [{ label: c.A, value: a }, { label: c.B, value: b }] }),
      };
    }
    const juste = `${T} − ${a}`;
    return {
      text: phrase(
        `${c.g}, il y a ${T} ${c.u}, dont ${a} ${c.A}. Les autres sont des ${c.B}.`,
        un([`Quel calcul donne le nombre ${de(c.B)} ?`, "Quel calcul permet de trouver le « ? » du schéma ?", `Quel calcul faut-il faire pour trouver le nombre ${de(c.B)} ?`]),
      ),
      ...qcm(juste, [`${T} + ${a}`, `${a} − ${T}`, T % 2 === 0 ? `${T} ÷ 2` : `${a} + ${a}`]),
      explanation: etapes("Le « ? » est une partie de la barre : on enlève la partie connue du tout.", `${T} − ${a} = ${b}.`, `Le calcul est ${juste}.`),
      canvas: barre({ total: String(T), parts: [{ label: c.A, value: a }, { label: c.B, unknown: true }] }),
    };
  }),

  // ★2 — ce qui reste (longueurs, durées, masses : avec l'unité, parfois décimale).
  tpl(S, "g04", 2, "Le tout moins ce qui est déjà fait donne ce qui reste.", () => {
    const r = un(RESTES);
    const p = perso();
    const dec = r.dec && Math.random() < 0.5;
    const T = dec ? dixNE(10, 60) : r.u === "min" ? entre(80, 200) : entre(100, 900);
    const a = dec ? dixNE(2, T - 2) : entre(25, T - 25);
    const b = r2(T - a);
    return {
      text: phrase(r.t(fr(T), fr(a), p), r.q),
      ...qcmN(b, dec ? [r2(T + a), a, r2(b + 1), r2(b + 0.1)] : [T + a, a, b + 10, b - 100], r.u),
      explanation: etapes("Sur le schéma, le tout est la barre entière ; on enlève la partie déjà faite.", `${fr(T)} − ${fr(a)} = ${fr(b)}.`, `Il reste ${fr(b)}${r.u ? ` ${r.u}` : ""}.`),
      canvas: barre({ total: `${fr(T)}${r.u ? ` ${r.u}` : ""}`, parts: [{ label: "déjà fait", value: a }, { label: "reste", unknown: true }] }),
    };
  }),

  // ★3 — comparer : « de plus », « de moins » (et le piège à l'envers).
  tpl(S, "g05", 3, "Fais le schéma des deux quantités : qui en a le plus ?", () => {
    const [A, B] = deux();
    const o = un(["billes", "cartes", "timbres", "images", "perles", "autocollants", "coquillages", "points", "figurines", "abonnés", "pas"]);
    const a = entre(40, 300), d = entre(12, Math.min(90, a - 15));
    const cas = un(["plus", "moins", "inverse"] as const);
    if (cas === "plus") {
      return {
        text: phrase(`${A.nom} a ${a} ${o}. ${B.nom} en a ${d} de plus.`, un([`Combien ${de(o)} a ${B.nom} ?`, `Combien ${B.nom} en a-t-${B.il} ?`, `Quel est le nombre ${de(o)} de ${B.nom} ?`])),
        ...qcmN(a + d, [a - d, d, a + d + 10]),
        explanation: etapes(`${B.nom} a autant que ${A.nom}, plus ${d}.`, `${a} + ${d} = ${a + d}.`, `${B.nom} a ${a + d} ${o}.`),
        canvas: barre({ title: B.nom, total: "?", parts: [{ label: `comme ${A.nom}`, value: a }, { label: "de plus", value: d }] }),
      };
    }
    if (cas === "moins") {
      return {
        text: phrase(`${A.nom} a ${a} ${o}. ${B.nom} en a ${d} de moins.`, un([`Combien ${de(o)} a ${B.nom} ?`, `Combien ${B.nom} en a-t-${B.il} ?`, `Quel est le nombre ${de(o)} de ${B.nom} ?`])),
        ...qcmN(a - d, [a + d, d, a - d - 10]),
        explanation: etapes(`${B.nom} a ${d} de moins que ${A.nom} : on enlève ${d}.`, `${a} − ${d} = ${a - d}.`, `${B.nom} a ${a - d} ${o}.`),
        canvas: barre({ title: A.nom, total: String(a), parts: [{ label: B.nom, unknown: true }, { label: "de moins", value: d }] }),
      };
    }
    const b = a + d;
    return {
      text: phrase(`${B.nom} a ${b} ${o}. C'est ${d} de plus que ${A.nom}.`, un([`Combien ${de(o)} a ${A.nom} ?`, `Combien ${A.nom} en a-t-${A.il} ?`, `Quel est le nombre ${de(o)} de ${A.nom} ?`])),
      ...qcmN(a, [b + d, d, a + 1]),
      explanation: etapes(`Attention au piège : « de plus » parle de ${B.nom}. ${A.nom} en a MOINS : on soustrait.`, `${b} − ${d} = ${a}.`, `${A.nom} a ${a} ${o}.`),
      canvas: barre({ title: B.nom, total: String(b), parts: [{ label: A.nom, unknown: true }, { label: "de plus", value: d }] }),
    };
  }),

  // ★3 — parts égales et « fois plus ».
  tpl(S, "g06", 3, "Compte les parts égales du schéma, puis partage le tout.", () => {
    const fois = Math.random() < 0.5;
    if (!fois) {
      const pk = un(PACKS);
      const k = entre(3, 9), x = entre(6, 40), T = k * x;
      return {
        text: phrase(
          `${cap(pk.qui)} partage ${T} ${pk.o} en ${k} ${pk.cs} ${pk.g === "f" ? "égales" : "égaux"}.`,
          un([`Combien ${de(pk.o)} dans chaque ${pk.c} ?`, `Combien ${de(pk.o)} par ${pk.c} ?`, "Que vaut une part du schéma ?"]),
        ),
        ...qcmN(x, [T - k, T + k, x + 1, x - 1]),
        explanation: etapes(`Le tout est partagé en ${k} parts égales : on divise.`, `${T} ÷ ${k} = ${x}.`, `Il y en a ${x} par ${pk.c}.`),
        canvas: barre({ total: String(T), parts: parts(k, pk.c) }),
      };
    }
    const [A, B] = deux();
    const o = un(["billes", "cartes", "timbres", "images", "perles", "coquillages", "autocollants", "points"]);
    const k = un([2, 3, 4, 5]), x = entre(8, 60), T = (k + 1) * x;
    const demandeA = Math.random() < 0.6;
    return {
      text: phrase(`${B.nom} a ${k} fois plus ${de(o)} que ${A.nom}. Ensemble, ${A.nom} et ${B.nom} en ont ${T}.`, `Combien ${de(o)} a ${demandeA ? A.nom : B.nom} ?`),
      ...qcmN(demandeA ? x : k * x, demandeA ? [Math.floor(T / k), T - k, k * x] : [x, Math.floor(T / k), T - x - 1]),
      explanation: etapes(`${A.nom} : 1 part ; ${B.nom} : ${k} parts. En tout : ${k + 1} parts égales.`, `${T} ÷ ${k + 1} = ${x}${demandeA ? "" : `, puis ${k} × ${x} = ${k * x}`}.`, `${demandeA ? A.nom : B.nom} a ${demandeA ? x : k * x} ${o}.`),
      canvas: barre({ total: String(T), parts: [{ label: A.nom, unknown: true }, ...parts(k, B.nom)] }),
    };
  }),

  // ★3 — trois parties.
  tpl(S, "g07", 3, "Enlève les deux parties connues du tout.", () => {
    const c = un(TROIS_GROUPES);
    const a = entre(25, 250), b = entre(25, 250), x = entre(15, 250), T = a + b + x;
    return {
      text: phrase(`${c.g}, il y a ${T} ${c.u} : ${a} ${c.A}, ${b} ${c.B} et des ${c.C}.`, un([`Combien ${de(c.C)} y a-t-il ?`, `Combien ${de(c.C)} ?`, `Trouve le nombre ${de(c.C)}.`])),
      ...qcmN(x, [T - a, T - b, a + b, x + 10]),
      explanation: etapes("Le tout est fait de trois parties : on enlève les deux connues.", `${T} − ${a} − ${b} = ${x}.`, `Il y a ${x} ${c.C}.`),
      canvas: barre({ total: String(T), parts: [{ label: c.A, value: a }, { label: c.B, value: b }, { label: c.C, unknown: true }] }),
    };
  }),

  // ★3 — deux achats avec des centimes, ce qu'il reste.
  tpl(S, "g08", 3, "Le budget, c'est la barre entière : enlève les deux achats.", () => {
    const p = perso();
    const [o1, o2] = un(ACHATS);
    const T = un([20, 25, 30, 40, 50]);
    let a = 0, b = 0;
    for (let i = 0; i < 30; i++) {
      a = entre(40, Math.round(T * 10)) * 5 / 100;
      b = entre(40, Math.round(T * 10)) * 5 / 100;
      if (a + b < T - 1 && !(Number.isInteger(a) && Number.isInteger(b))) break;
    }
    if (a + b >= T - 1) { a = 6.5; b = 4.75; }
    const x = r2(T - a - b);
    return {
      text: phrase(
        `${p.nom} a ${eur(T)}. ${cap(p.il)} achète ${o1} à ${eur(a)} et ${o2} à ${eur(b)}.`,
        un(["Combien d'argent lui reste-t-il ?", "Combien lui reste-t-il ?", "Quelle somme lui reste-t-il ?"]),
      ),
      ...qcmE(x, [r2(T - a), r2(T - b), r2(a + b), r2(x + 1), r2(x - 0.1)], 0.5),
      explanation: etapes("La barre entière est l'argent de départ ; les deux achats en sont deux parties.", `${eur(a)} + ${eur(b)} = ${eur(a + b)}, puis ${eur(T)} − ${eur(a + b)} = ${eur(x)}.`, `Il lui reste ${eur(x)}.`),
      canvas: barre({ total: eur(T), parts: [{ label: o1.replace(/^(un|une|des) /, ""), value: a }, { label: o2.replace(/^(un|une|des) /, ""), value: b }, { label: "reste", unknown: true }] }),
    };
  }),

  // ★4 — la somme et la différence.
  tpl(S, "g09", 4, "Enlève d'abord l'écart : il reste deux parts égales.", () => {
    const c = un(DEUX_GROUPES);
    const x = entre(30, 300), d = entre(10, 90), T = 2 * x + d;
    const demandeA = Math.random() < 0.55;
    const juste = demandeA ? x : x + d;
    return {
      text: phrase(
        `${c.g}, il y a ${T} ${c.u}. Il y a ${d} ${c.B} de plus que ${de(c.A)}.`,
        un([`Combien ${de(demandeA ? c.A : c.B)} y a-t-il ?`, `Fais un schéma : combien ${de(demandeA ? c.A : c.B)} ?`, `Trouve le nombre ${de(demandeA ? c.A : c.B)}.`]),
      ),
      ...qcmN(juste, demandeA ? [Math.floor(T / 2), T - d, x + d] : [Math.floor(T / 2), x, T - d]),
      explanation: etapes(
        `Les ${c.B}, c'est autant que les ${c.A}, plus ${d}. On enlève ${d}, puis on partage en deux.`,
        `${T} − ${d} = ${2 * x}, puis ${2 * x} ÷ 2 = ${x}${demandeA ? "" : `, et ${x} + ${d} = ${x + d}`}.`,
        `Il y a ${juste} ${demandeA ? c.A : c.B}.`,
      ),
      canvas: barre({ total: String(T), parts: [{ label: c.A, unknown: true }, { label: c.B, unknown: true }, { label: `${d} de plus`, value: d }] }),
    };
  }),

  // ★4 — « k fois plus » et l'écart.
  tpl(S, "g10", 4, "L'écart correspond aux parts en plus : partage l'écart.", () => {
    const c = un(DEUX_GROUPES);
    const k = un([2, 3, 4, 5]), x = entre(12, 80), D = (k - 1) * x;
    const q = un(["A", "B", "T"] as const);
    const juste = q === "A" ? x : q === "B" ? k * x : (k + 1) * x;
    const qt = q === "A" ? `Combien ${de(c.A)} y a-t-il ?` : q === "B" ? `Combien ${de(c.B)} y a-t-il ?` : `Combien ${de(c.u)} y a-t-il en tout ?`;
    return {
      text: phrase(`${c.g}, il y a ${k} fois plus ${de(c.B)} que ${de(c.A)}. Il y a ${D} ${c.B} de plus que ${de(c.A)}.`, qt),
      ...qcmN(juste, q === "A" ? [Math.round(D / k), D, D + k] : q === "B" ? [D, D + x + 1, k * D] : [D, k * x, D + k]),
      explanation: etapes(
        `${cap(c.A)} : 1 part. ${cap(c.B)} : ${k} parts. L'écart, ce sont les ${k - 1} parts en plus.`,
        `${D} ÷ ${k - 1} = ${x}${q === "B" ? `, puis ${k} × ${x} = ${k * x}` : q === "T" ? `, puis ${k + 1} × ${x} = ${(k + 1) * x}` : ""}.`,
        `La réponse est ${juste}.`,
      ),
      canvas: barre({ title: cap(c.B), parts: [{ label: `comme les ${c.A}`, unknown: true }, ...parts(k - 1, "en plus")], question: `${D} de plus` }),
    };
  }),

  // ★4 — trois personnes reliées : B a d de plus que A, C a le double de A.
  tpl(S, "g11", 4, "Exprime tout avec la part de la première personne, puis compte les parts.", () => {
    const [A, B, Cc] = trois();
    const o = un(["points", "cartes", "billes", "timbres", "euros", "pages lues", "kilomètres parcourus"]);
    const x = entre(8, 60), d = entre(3, 25), T = 4 * x + d;
    const demande = un(["A", "B", "C"] as const);
    const juste = demande === "A" ? x : demande === "B" ? x + d : 2 * x;
    const nom = demande === "A" ? A.nom : demande === "B" ? B.nom : Cc.nom;
    return {
      text: phrase(
        `${A.nom}, ${B.nom} et ${Cc.nom} ont ${T} ${o} à eux trois. ${B.nom} en a ${d} de plus que ${A.nom}. ${Cc.nom} en a le double de ${A.nom}.`,
        `Combien ${de(o)} a ${nom} ?`,
      ),
      ...qcmN(juste, [Math.floor(T / 3), Math.floor((T - d) / 3), x + d, 2 * x, x, T - d].filter((v) => v !== juste)),
      explanation: etapes(
        `${A.nom} : 1 part. ${B.nom} : 1 part + ${d}. ${Cc.nom} : 2 parts. En tout : 4 parts + ${d}.`,
        `${T} − ${d} = ${T - d}, puis ${T - d} ÷ 4 = ${x}.`,
        `${nom} a ${juste} ${o}.`,
      ),
      canvas: barre({ total: String(T), parts: [{ label: A.nom, unknown: true }, { label: B.nom, unknown: true }, { label: `+ ${d}`, value: d }, { label: Cc.nom, unknown: true }, { label: Cc.nom, unknown: true }] }),
    };
  }),

  // ★4 — la moitié, puis un partage du reste.
  tpl(S, "g12", 4, "Prends d'abord la moitié du tout, puis partage le reste.", () => {
    const m = un(MOITIE);
    const p = perso();
    const k = entre(3, 8), x = entre(4, 25), T = 2 * k * x;
    return {
      text: phrase(m.t(T, k, p), m.q),
      ...qcmN(x, [Math.round(T / k), T / 2, x * 2, T / 2 - k], m.u),
      explanation: etapes("Sur le schéma, la moitié du tout est mise de côté ; l'autre moitié est partagée en parts égales.", `${T} ÷ 2 = ${T / 2}, puis ${T / 2} ÷ ${k} = ${x}.`, `La réponse est ${x}${m.u ? ` ${m.u}` : ""}.`),
      canvas: barre({ total: `${T}${m.u ? ` ${m.u}` : ""}`, parts: [{ label: "la moitié", unknown: true }, ...parts(k, "?")] }),
    };
  }),
];

/* ═════════════════════════ ALGEBRE_MOTIF ═════════════════════════ */

const M = "algebre_motif";
type Monde = { intro: (p: Perso) => string; P: string; u: string; q: (n: number, p: Perso) => string; uq?: string };
const CROISSANCE: Monde[] = [
  { intro: (p) => `${p.nom} construit des tours de cubes.`, P: "Étape", u: "cubes", q: (n) => `Combien de cubes à l'étape ${n} ?` },
  { intro: () => "Avec des allumettes, on fabrique des figures qui grandissent.", P: "Figure", u: "allumettes", q: (n) => `Combien d'allumettes pour la figure ${n} ?` },
  { intro: () => "Une plante grimpante pousse le long du mur de l'école.", P: "Semaine", u: "cm", q: (n) => `Quelle hauteur aura-t-elle la semaine ${n} ?`, uq: "cm" },
  { intro: (p) => `${p.nom} met de l'argent dans sa tirelire chaque semaine.`, P: "Semaine", u: "€", q: (n, p) => `Combien aura-t-${p.il} la semaine ${n} ?`, uq: "€" },
  { intro: () => "Dans le jeu vidéo, chaque niveau rapporte plus de pièces.", P: "Niveau", u: "pièces", q: (n) => `Combien de pièces au niveau ${n} ?` },
  { intro: (p) => `${p.nom} s'entraîne à sauter à la corde.`, P: "Jour", u: "sauts", q: (n, p) => `Combien de sauts fera-t-${p.il} le jour ${n} ?` },
  { intro: () => "Au théâtre, chaque rangée a plus de sièges que la précédente.", P: "Rangée", u: "sièges", q: (n) => `Combien de sièges dans la rangée ${n} ?` },
  { intro: () => "Un escargot grimpe le long d'un arrosoir.", P: "Minute", u: "cm", q: (n) => `À quelle hauteur sera-t-il à la minute ${n} ?`, uq: "cm" },
  { intro: () => "Au club de judo, des élèves s'inscrivent chaque mois.", P: "Mois", u: "inscrits", q: (n) => `Combien d'inscrits au mois ${n} ?` },
  { intro: (p) => `${p.nom} colle des timbres dans son album.`, P: "Page", u: "timbres", q: (n) => `Combien de timbres sur la page ${n} ?` },
  { intro: () => "Le jardinier plante des rangées de tulipes de plus en plus longues.", P: "Rangée", u: "tulipes", q: (n) => `Combien de tulipes dans la rangée ${n} ?` },
  { intro: () => "La chaîne vidéo de la classe gagne des abonnés chaque semaine.", P: "Semaine", u: "abonnés", q: (n) => `Combien d'abonnés la semaine ${n} ?` },
  { intro: () => "La pâtissière empile des macarons en pyramides.", P: "Pyramide", u: "macarons", q: (n) => `Combien de macarons dans la pyramide ${n} ?` },
  { intro: (p) => `${p.nom} lit un peu plus de pages chaque jour.`, P: "Jour", u: "pages", q: (n, p) => `Combien de pages lira-t-${p.il} le jour ${n} ?` },
  { intro: () => "La coureuse allonge son footing chaque semaine.", P: "Semaine", u: "minutes", q: (n) => `Combien de minutes courra-t-elle la semaine ${n} ?` },
  { intro: () => "Le boulanger cuit chaque jour plus de baguettes pour la fête du village.", P: "Jour", u: "baguettes", q: (n) => `Combien de baguettes le jour ${n} ?` },
];
const DECROISSANCE: Monde[] = [
  { intro: () => "Pendant la canicule, l'eau du bassin s'évapore.", P: "Jour", u: "cm", q: (n) => `Quelle hauteur d'eau restera-t-il le jour ${n} ?`, uq: "cm" },
  { intro: (p) => `${p.nom} mange des bonbons de son paquet chaque jour.`, P: "Jour", u: "bonbons", q: (n) => `Combien de bonbons restera-t-il le jour ${n} ?` },
  { intro: () => "À la boulangerie, on note le stock de baguettes plusieurs fois dans la matinée.", P: "Relevé", u: "baguettes", q: (n) => `Combien de baguettes au relevé ${n} ?` },
  { intro: () => "Le compte à rebours de la fusée défile.", P: "Écran", u: "secondes", q: (n) => `Combien de secondes sur l'écran ${n} ?` },
  { intro: () => "Le pirate dépense des pièces d'or à chaque escale.", P: "Escale", u: "pièces d'or", q: (n) => `Combien de pièces d'or lui restera-t-il à l'escale ${n} ?` },
  { intro: (p) => `${p.nom} rembourse son grand frère chaque semaine.`, P: "Semaine", u: "€", q: (n, p) => `Combien devra-t-${p.il} encore la semaine ${n} ?`, uq: "€" },
  { intro: () => "Une grande bougie fond petit à petit.", P: "Heure", u: "mm", q: (n) => `Quelle sera sa hauteur à l'heure ${n} ?`, uq: "mm" },
  { intro: () => "À la papeterie, le stock de cahiers baisse chaque jour de la rentrée.", P: "Jour", u: "cahiers", q: (n) => `Combien de cahiers restera-t-il le jour ${n} ?` },
  { intro: () => "La neige fond sur le toit du chalet.", P: "Jour", u: "cm", q: (n) => `Quelle épaisseur de neige restera-t-il le jour ${n} ?`, uq: "cm" },
  { intro: () => "La batterie du robot baisse à chaque mission.", P: "Mission", u: "points d'énergie", q: (n) => `Combien de points d'énergie restera-t-il à la mission ${n} ?` },
  { intro: () => "Le réservoir d'eau du jardin se vide un peu à chaque arrosage.", P: "Arrosage", u: "litres", q: (n) => `Combien de litres restera-t-il à l'arrosage ${n} ?` },
];
const ligne = (m: Monde, t: number[]) => t.map((v, i) => `${i === 0 ? m.P : m.P.toLowerCase()} ${i + 1} : ${fr(v)} ${m.u}`).join(" ; ") + ".";
const etiquettes = (m: Monde, n: number) => Array.from({ length: n }, (_, i) => `${m.P} ${i + 1}`);

/** Les motifs qui se répètent. */
const REPETES = [
  { intro: (p: Perso) => `${p.nom} enfile des perles sur un collier, toujours dans le même ordre :`, el: ["rouge", "bleue", "bleue"], autre: "verte", q: (n: number) => `De quelle couleur sera la ${n}e perle ?`, mot: "perle" },
  { intro: () => "Le carreleur pose une frise de carreaux, toujours dans le même ordre :", el: ["blanc", "noir", "gris", "noir"], autre: "rouge", q: (n: number) => `De quelle couleur sera le ${n}e carreau ?`, mot: "carreau" },
  { intro: () => "Sur la guirlande de la fête, les fanions se suivent ainsi :", el: ["jaune", "vert", "rouge"], autre: "bleu", q: (n: number) => `De quelle couleur sera le ${n}e fanion ?`, mot: "fanion" },
  { intro: () => "La frise du couloir répète ces formes :", el: ["rond", "carré", "triangle", "carré"], autre: "losange", q: (n: number) => `Quelle forme sera en position ${n} ?`, mot: "forme" },
  { intro: () => "Le pâtissier aligne des gâteaux dans la vitrine, toujours dans le même ordre :", el: ["éclair", "tarte", "tarte"], autre: "chou", q: (n: number) => `Quel gâteau sera à la place ${n} ?`, mot: "gâteau" },
  { intro: () => "Le jardinier plante une bordure de fleurs, toujours dans le même ordre :", el: ["rose", "tulipe", "iris", "tulipe"], autre: "lys", q: (n: number) => `Quelle fleur sera la ${n}e ?`, mot: "fleur" },
  { intro: (p: Perso) => `Au tambour, ${p.nom} joue un rythme qui se répète :`, el: ["fort", "doux", "doux", "fort", "doux"], autre: "silence", q: (n: number) => `Comment sera le ${n}e coup ?`, mot: "coup" },
  { intro: () => "La maîtresse range les élèves en file, dans cet ordre qui se répète :", el: ["fille", "garçon", "garçon"], autre: "adulte", q: (n: number) => `Qui sera à la ${n}e place ?`, mot: "place" },
  { intro: () => "Sur le bracelet brésilien, les fils se suivent ainsi :", el: ["orange", "violet", "blanc"], autre: "noir", q: (n: number) => `De quelle couleur sera le ${n}e fil ?`, mot: "fil" },
  { intro: () => "Les feux d'un manège clignotent dans cet ordre qui se répète :", el: ["rouge", "vert", "bleu", "vert"], autre: "jaune", q: (n: number) => `De quelle couleur sera le ${n}e éclair de lumière ?`, mot: "éclair" },
  { intro: () => "Le boulanger range ses pains sur l'étagère, toujours dans le même ordre :", el: ["baguette", "pain rond", "baguette", "ficelle"], autre: "brioche", q: (n: number) => `Quel pain sera à la place ${n} ?`, mot: "pain" },
  { intro: () => "La semaine des menus de la cantine se répète :", el: ["pâtes", "riz", "frites", "lentilles"], autre: "purée", q: (n: number) => `Quel plat sera servi le ${n}e jour de cantine ?`, mot: "jour" },
];

const motif: TutorBankItemV4[] = [
  // ★2 — le terme suivant d'un motif qui grandit.
  tpl(M, "g01", 2, "Cherche de combien on augmente à chaque fois.", () => {
    const m = un(CROISSANCE);
    const p = perso();
    const r = entre(3, 25), a = entre(5, 60);
    const n = un([3, 4]);
    const t = Array.from({ length: n }, (_, i) => a + i * r);
    const x = a + n * r;
    return {
      text: phrase(m.intro(p), ligne(m, t), m.q(n + 1, p)),
      ...qcmN(x, [x + 1, t[n - 1] + 1, t[n - 1] * 2, x - 1, x + r], m.uq ?? ""),
      explanation: etapes(`On cherche la règle : à chaque fois, on ajoute ${r}.`, `${t[n - 1]} + ${r} = ${x}.`, `Il y en aura ${x}.`),
      canvas: barres(etiquettes(m, n), t),
    };
  }),

  // ★2 — la suite de nombres, entiers ou décimaux : nombre suivant ou nombre manquant.
  tpl(M, "g02", 2, "Trouve l'écart entre deux nombres voisins : il ne change pas.", () => {
    const p = perso();
    const decim = Math.random() < 0.4;
    const monte = Math.random() < 0.7;
    const r = decim ? un([0.5, 0.25, 1.5, 2.5, 0.2, 0.1]) : un([3, 4, 6, 7, 8, 9, 11, 12, 15, 20, 25, 50]);
    const a = decim ? (monte ? dix(0, 10) : r2(5 * r + dix(1, 10))) : monte ? entre(1, 90) : entre(5 * r + 5, 5 * r + 90);
    const t = Array.from({ length: 5 }, (_, i) => r2(monte ? a + i * r : a - i * r));
    const trou = Math.random() < 0.4 ? entre(1, 3) : 4;
    const x = t[trou];
    const vis = t.map((v, i) => (i === trou ? "?" : fr(v)));
    const lead = un(["Observe la suite :", "Voici le début d'une suite de nombres :", "Sur la frise du couloir, on lit :", "Le robot affiche :", `${p.nom} écrit :`, "Au jeu du furet, les élèves disent :"]);
    const pasP = decim ? 0.1 : 1;
    return {
      text: phrase(
        lead,
        trou === 4 ? `${vis.slice(0, 4).join(" ; ")} ; …` : `${vis.join(" ; ")}.`,
        trou === 4 ? un(["Quel est le nombre suivant ?", "Quel nombre vient ensuite ?", "Continue la suite : quel nombre écris-tu ?"]) : un(["Quel nombre manque ?", "Quel nombre remplace le « ? » ?", "Retrouve le nombre effacé."]),
      ),
      ...qcmN(x, [r2(monte ? x + pasP : x - pasP), r2(monte ? x - r + pasP : x + r - pasP), r2(monte ? x + r : x - r), r2(x + 2 * pasP)], "", pasP),
      explanation: etapes(`On cherche l'écart : on ${monte ? "ajoute" : "enlève"} ${fr(r)} à chaque fois.`, `${fr(t[trou - 1])} ${monte ? "+" : "−"} ${fr(r)} = ${fr(x)}.`, `Le nombre est ${fr(x)}.`),
      canvas: frise(vis, trou),
    };
  }),

  // ★2 — de combien le motif augmente-t-il ?
  tpl(M, "g03", 2, "Compare deux étapes qui se suivent.", () => {
    const m = un(CROISSANCE);
    const p = perso();
    const r = entre(3, 25), a = entre(r + 1, 60);
    const t = [a, a + r, a + 2 * r];
    return {
      text: phrase(m.intro(p), ligne(m, t), un([`De combien augmente-t-on à chaque ${m.P.toLowerCase()} ?`, "Quelle est la règle : on ajoute combien à chaque fois ?", "Combien en ajoute-t-on à chaque fois ?"])),
      ...qcmN(r, [a, 2 * r, r + 1, t[2]]),
      explanation: etapes("On compare deux étapes qui se suivent.", `${t[1]} − ${t[0]} = ${r} et ${t[2]} − ${t[1]} = ${r}.`, `On ajoute ${r} à chaque fois.`),
      canvas: barres(etiquettes(m, 3), t),
    };
  }),

  // ★2 — un motif qui se répète : quel élément à la place n ?
  tpl(M, "g04", 2, "Repère le motif qui se répète, puis avance motif par motif.", () => {
    const mo = un(REPETES);
    const p = perso();
    const L = mo.el.length;
    const vus = 2 * L;
    const n = entre(vus + 1, vus + 8);
    const juste = mo.el[(n - 1) % L];
    const dist = [...new Set(mo.el)];
    const choix = [...dist, mo.autre];
    const affiche = Array.from({ length: vus }, (_, i) => mo.el[i % L]);
    return {
      text: phrase(mo.intro(p), affiche.join(", ") + ", …", mo.q(n)),
      ...qcm(juste, choix.filter((c) => c !== juste)),
      explanation: etapes(
        `Le motif « ${mo.el.join(", ")} » a ${L} éléments et se répète.`,
        `On continue : ${Array.from({ length: n - vus }, (_, i) => `${vus + i + 1}e : ${mo.el[(vus + i) % L]}`).join(", ")}.`,
        `À la place ${n} : ${juste}.`,
      ),
      canvas: tableau({ title: "Le motif", coin: "Place", headers: [...Array.from({ length: vus }, (_, i) => i + 1), n], rows: [{ label: cap(mo.mot), values: [...affiche, "?"] }], cell: { row: 0, col: vus } }),
    };
  }),

  // ★3 — une étape lointaine.
  tpl(M, "g05", 3, "Compte combien de fois on ajoute l'écart depuis l'étape 1.", () => {
    const m = un(CROISSANCE);
    const p = perso();
    const r = entre(3, 15), a = entre(r + 1, 40);
    const t = [a, a + r, a + 2 * r];
    const n = un([8, 10, 12, 15, 20]);
    const x = a + (n - 1) * r;
    return {
      text: phrase(m.intro(p), ligne(m, t), un(["La règle ne change pas.", "On continue de la même façon.", ""]), m.q(n, p)),
      ...qcmN(x, [a + n * r, n * r, t[2] + r, x + 1, n * a], m.uq ?? ""),
      explanation: etapes(`On ajoute ${r} à chaque fois. De l'étape 1 à l'étape ${n}, on ajoute ${n - 1} fois ${r}.`, `${a} + ${n - 1} × ${r} = ${a} + ${(n - 1) * r} = ${x}.`, `Il y en aura ${x}.`),
      canvas: barres(etiquettes(m, 3), t),
    };
  }),

  // ★3 — quelle est la règle ? (+, × 2 ou × 3 : 3 ; 6 ; 12 n'est pas « + 3 »).
  tpl(M, "g06", 3, "Vérifie ta règle sur TOUS les nombres, pas seulement les deux premiers.", () => {
    const m = un(CROISSANCE);
    const p = perso();
    const type = un(["plus", "double", "triple"] as const);
    const a = type === "plus" ? entre(2, 30) : type === "double" ? entre(2, 12) : entre(2, 5);
    const r = type === "plus" ? entre(3, 20) : a;
    const t = type === "plus" ? [a, a + r, a + 2 * r, a + 3 * r] : type === "double" ? [a, 2 * a, 4 * a, 8 * a] : [a, 3 * a, 9 * a, 27 * a];
    const R = {
      plus: `On ajoute ${r} à chaque fois.`,
      double: "On multiplie par 2 à chaque fois.",
      triple: "On multiplie par 3 à chaque fois.",
      plus1: `On ajoute ${r + 1} à chaque fois.`,
      plusA: `On ajoute ${t[1] - t[0]} à chaque fois.`,
      plus2a: `On ajoute ${2 * a} à chaque fois.`,
    };
    const juste = R[type];
    const faux = type === "plus" ? [R.double, R.plus1, R.triple] : type === "double" ? [R.plusA, R.triple, R.plus2a] : [R.plusA, R.double, R.plus2a];
    return {
      text: phrase(m.intro(p), ligne(m, t), un(["Quelle est la règle ?", "Quelle règle permet de passer d'un nombre au suivant ?", "Comment passe-t-on d'une étape à la suivante ?"])),
      ...qcm(juste, faux.filter((f) => f !== juste)),
      explanation: etapes(
        "On teste la règle sur chaque passage.",
        type === "plus"
          ? `${t[0]} + ${r} = ${t[1]}, ${t[1]} + ${r} = ${t[2]}, ${t[2]} + ${r} = ${t[3]}.`
          : `${t[0]} × ${type === "double" ? 2 : 3} = ${t[1]}, ${t[1]} × ${type === "double" ? 2 : 3} = ${t[2]}, ${t[2]} × ${type === "double" ? 2 : 3} = ${t[3]} ; « + ${t[1] - t[0]} » marche seulement au début.`,
        juste,
      ),
      canvas: barres(etiquettes(m, 4), t),
    };
  }),

  // ★3 — un motif qui diminue.
  tpl(M, "g07", 3, "Cherche ce qu'on enlève à chaque fois.", () => {
    const m = un(DECROISSANCE);
    const p = perso();
    const r = entre(3, 15);
    const a = entre(10 * r + 5, 10 * r + 80);
    const t = [a, a - r, a - 2 * r, a - 3 * r];
    const loin = Math.random() < 0.6;
    const n = loin ? entre(6, 10) : 5;
    const x = a - (n - 1) * r;
    return {
      text: phrase(m.intro(p), ligne(m, t), m.q(n, p)),
      ...qcmN(x, [a - n * r, t[3] + r, loin ? t[3] - r : x - 1, x + 1], m.uq ?? ""),
      explanation: etapes(`On enlève ${r} à chaque fois.`, loin ? `${a} − ${n - 1} × ${r} = ${a} − ${(n - 1) * r} = ${x}.` : `${t[3]} − ${r} = ${x}.`, `Il en restera ${x}.`),
      canvas: barres(etiquettes(m, 4), t),
    };
  }),

  // ★3 — un motif qui se répète, rang lointain (la division et son reste).
  tpl(M, "g08", 3, "Divise la place par la longueur du motif : le reste dit où tu es dans le motif.", () => {
    const mo = un(REPETES);
    const p = perso();
    const L = mo.el.length;
    const n = entre(30, 120);
    const q = Math.floor(n / L), reste = n % L;
    const juste = mo.el[(n - 1) % L];
    const dist = [...new Set(mo.el)];
    const choix = [...dist, mo.autre];
    return {
      text: phrase(mo.intro(p), mo.el.join(", ") + ", " + mo.el.join(", ") + ", …", mo.q(n)),
      ...qcm(juste, choix.filter((c) => c !== juste)),
      explanation: etapes(
        `Le motif a ${L} éléments. On cherche combien de motifs entiers il y a avant la place ${n}.`,
        `${n} ÷ ${L} = ${q}, reste ${reste}.${reste === 0 ? ` La place ${n} est la dernière du ${q}e motif.` : ` Après ${q} motifs complets, on est au ${reste}e élément du motif.`}`,
        `À la place ${n} : ${juste}.`,
      ),
      canvas: tableau({ title: "Le motif qui se répète", coin: "Place dans le motif", headers: Array.from({ length: L }, (_, i) => i + 1), rows: [{ label: cap(mo.mot), values: mo.el }] }),
    };
  }),

  // ★3 — à quelle étape aura-t-on … ?
  tpl(M, "g09", 3, "Enlève la valeur de départ, puis compte combien de fois tu as ajouté l'écart.", () => {
    const m = un(CROISSANCE.filter((c) => !c.uq));
    const p = perso();
    const r = entre(3, 12), a = entre(r + 1, 30);
    const t = [a, a + r, a + 2 * r];
    const n = entre(7, 20);
    const V = a + (n - 1) * r;
    return {
      text: phrase(m.intro(p), ligne(m, t), un(["La règle ne change pas.", "On continue de la même façon.", ""]), un([`À quelle étape y aura-t-il ${V} ${m.u} ?`, `Quel est le numéro de l'étape qui aura ${V} ${m.u} ?`, `Quand atteindra-t-on ${V} ${m.u} ? Donne le numéro de l'étape.`, `On veut ${V} ${m.u}. À quelle étape y arrive-t-on ?`])),
      ...qcmN(n, [n - 1, n + 1, Math.round(V / r), Math.round(V / a)].filter((v) => v !== n)),
      explanation: etapes(`On part de ${a} et on ajoute ${r} à chaque fois.`, `${V} − ${a} = ${V - a} ; ${V - a} ÷ ${r} = ${n - 1} écarts ; donc l'étape ${n - 1} + 1 = ${n}.`, `C'est l'étape ${n}.`),
      canvas: barres(etiquettes(m, 3), t),
    };
  }),
];

/* ═════════════════════════ ALGEBRE_RELATION ═════════════════════════ */

const R = "algebre_relation";
const RELS = [
  { art: "Un", a: "vélo", as: "vélos", v: "a", b: "roues", k: [2] },
  { art: "Un", a: "tricycle", as: "tricycles", v: "a", b: "roues", k: [3] },
  { art: "Une", a: "voiture", as: "voitures", v: "a", b: "roues", k: [4] },
  { art: "Une", a: "araignée", as: "araignées", v: "a", b: "pattes", k: [8] },
  { art: "Une", a: "fourmi", as: "fourmis", v: "a", b: "pattes", k: [6] },
  { art: "Une", a: "étoile de mer", as: "étoiles de mer", v: "a", b: "bras", k: [5] },
  { art: "Une", a: "pieuvre", as: "pieuvres", v: "a", b: "bras", k: [8] },
  { art: "Une", a: "semaine", as: "semaines", v: "compte", b: "jours", k: [7] },
  { art: "Une", a: "boîte d'œufs", as: "boîtes d'œufs", v: "contient", b: "œufs", k: [6, 12] },
  { art: "Une", a: "équipe de basket", as: "équipes de basket", v: "compte", b: "joueurs", k: [5] },
  { art: "Une", a: "équipe de foot", as: "équipes de foot", v: "compte", b: "joueurs", k: [11] },
  { art: "Une", a: "table de la cantine", as: "tables de la cantine", v: "a", b: "chaises", k: [4, 6, 8] },
  { art: "Un", a: "carton de jus", as: "cartons de jus", v: "contient", b: "bouteilles", k: [6, 12] },
  { art: "Une", a: "rangée du potager", as: "rangées du potager", v: "compte", b: "salades", k: [7, 9, 12] },
  { art: "Un", a: "bouquet de la fleuriste", as: "bouquets de la fleuriste", v: "contient", b: "roses", k: [5, 7, 9] },
  { art: "Une", a: "page de l'album photo", as: "pages de l'album photo", v: "contient", b: "photos", k: [4, 6] },
  { art: "Un", a: "paquet de mouchoirs", as: "paquets de mouchoirs", v: "contient", b: "mouchoirs", k: [9, 10] },
  { art: "Un", a: "car scolaire", as: "cars scolaires", v: "transporte", b: "élèves", k: [50, 60] },
  { art: "Une", a: "heure", as: "heures", v: "compte", b: "minutes", k: [60] },
  { art: "Un", a: "camion du magasin", as: "camions du magasin", v: "livre", b: "colis", k: [25, 40] },
];
const AFFINES = [
  { intro: "On aligne des tables carrées bout à bout et on place une chaise de chaque côté libre.", n1: "table", n: "tables", r: "chaises", k: 2, c: 2 },
  { intro: "Avec des allumettes, on fabrique des carrés collés en ligne.", n1: "carré", n: "carrés", r: "allumettes", k: 3, c: 1 },
  { intro: "Avec des allumettes, on construit des maisons collées en ligne.", n1: "maison", n: "maisons", r: "allumettes", k: 5, c: 1 },
  { intro: "Avec des allumettes, on fabrique une bande de triangles, pointe en haut puis pointe en bas.", n1: "triangle", n: "triangles", r: "allumettes", k: 2, c: 1 },
  { intro: "Un petit train a une locomotive et des wagons. On compte toutes les roues.", n1: "wagon", n: "wagons", r: "roues", k: 4, c: 6 },
  { intro: "Au restaurant, on assemble des tables rectangulaires bout à bout pour un grand repas.", n1: "table", n: "tables", r: "places", k: 4, c: 2 },
  { intro: "Le loueur de vélos fait payer le casque, puis chaque heure de location.", n1: "heure", n: "heures", r: "euros", k: 3, c: 4 },
  { intro: "Pour une chenille en perles, on enfile une tête puis des anneaux.", n1: "anneau", n: "anneaux", r: "perles", k: 2, c: 3 },
  { intro: "Le taxi compte un prix de départ, puis chaque kilomètre.", n1: "kilomètre", n: "kilomètres", r: "euros", k: 2, c: 3 },
  { intro: "Le carreleur entoure une ligne de carreaux rouges avec des carreaux blancs.", n1: "carreau rouge", n: "carreaux rouges", r: "carreaux blancs", k: 2, c: 6 },
  { intro: "Au club de natation, on paie l'inscription, puis chaque mois.", n1: "mois", n: "mois", r: "euros", k: 8, c: 12 },
  { intro: "Avec des allumettes, on fabrique des pentagones collés en ligne.", n1: "pentagone", n: "pentagones", r: "allumettes", k: 4, c: 1 },
  { intro: "Avec des allumettes, on fabrique des hexagones collés en ligne.", n1: "hexagone", n: "hexagones", r: "allumettes", k: 5, c: 1 },
  { intro: "Le plombier fait payer son déplacement, puis chaque heure de travail.", n1: "heure", n: "heures", r: "euros", k: 40, c: 30 },
];
type Af = (typeof AFFINES)[number];
const qte = (i: number, un1: string, des: string) => `${i} ${i === 1 ? un1 : des}`;
const paires = (af: Af, ns: number[]) => ns.map((i) => `${qte(i, af.n1, af.n)} : ${af.k * i + af.c} ${af.r}`).join(" ; ") + ".";
const tabAffine = (af: Af, ns: number[], q: number | string) =>
  tableau({ coin: cap(af.n), headers: [...ns, q], rows: [{ label: cap(af.r), values: [...ns.map((i) => af.k * i + af.c), "?"] }], cell: { row: 0, col: ns.length } });

/** Les machines à nombres « × k + c ». */
const MACHINES = [
  "Le robot transforme chaque nombre qu'on lui donne :",
  "La machine à nombres suit toujours la même règle :",
  "Dans le jeu « Calcul-Express », la carte magique dit :",
  "Le programme de la calculatrice fait ceci :",
  "Le magicien applique toujours le même tour :",
  "Au rallye maths, la machine mystère fonctionne ainsi :",
];
type Regle = { k: number; c: number; moins: boolean };
const dire = (g: Regle) => `il multiplie par ${g.k}, puis ${g.moins ? "enlève" : "ajoute"} ${g.c}`;
const ecrireR = (g: Regle) => `× ${g.k} ${g.moins ? "−" : "+"} ${g.c}`;
const appliquer = (g: Regle, n: number) => (g.moins ? g.k * n - g.c : g.k * n + g.c);

/** Prix avec une part fixe et une part par unité (décimaux). */
const TARIFS = [
  { intro: "Location de kayak : le gilet coûte {c}, puis {k} par heure.", u1: "heure", us: "heures" },
  { intro: "Le taxi coûte {c} au départ, puis {k} par kilomètre.", u1: "kilomètre", us: "kilomètres" },
  { intro: "À la piscine, la carte coûte {c}, puis {k} par entrée.", u1: "entrée", us: "entrées" },
  { intro: "L'imprimeur fait payer {c} de frais, puis {k} par affiche.", u1: "affiche", us: "affiches" },
  { intro: "Au parking, on paie {c} en entrant, puis {k} par heure.", u1: "heure", us: "heures" },
  { intro: "Le club de tennis demande {c} d'inscription, puis {k} par cours.", u1: "cours", us: "cours" },
  { intro: "Location de vélo : le casque coûte {c}, puis {k} par heure.", u1: "heure", us: "heures" },
  { intro: "Au cinéma, la carte de fidélité coûte {c}, puis {k} par séance.", u1: "séance", us: "séances" },
];

const relation: TutorBankItemV4[] = [
  // ★3 — chaque … a k … : combien pour n ?
  tpl(R, "g01", 3, "Pour un, il y en a k ; pour n, on multiplie.", () => {
    const re = un(RELS);
    const k = un(re.k), n = entre(11, 30), x = k * n;
    return {
      text: phrase(
        un(["", `Le nombre ${de(re.b)} dépend du nombre ${de(re.as)}.`]),
        `${re.art} ${re.a} ${re.v} ${k} ${re.b}.`,
        un([`Combien ${de(re.b)} pour ${n} ${re.as} ?`, `Combien y a-t-il ${de(re.b)} pour ${n} ${re.as} ?`, `Avec ${n} ${re.as}, combien ${de(re.b)} en tout ?`, `Et pour ${n} ${re.as} ?`]),
      ),
      ...qcmN(x, [k + n, x + k, x - k, x + 10]),
      explanation: etapes(`Pour 1, il y en a ${k} ; pour ${n}, il y en a ${n} fois plus.`, `${n} × ${k} = ${fr(x)}.`, `Il y a ${fr(x)} ${re.b}.`),
      canvas: tableau({ coin: cap(re.as), headers: [1, n], rows: [{ label: cap(re.b), values: [k, "?"] }], cell: { row: 0, col: 1 } }),
    };
  }),

  // ★3 — le tableau à compléter.
  tpl(R, "g02", 3, "Cherche par combien on multiplie le nombre du haut.", () => {
    const re = un(RELS);
    const k = un(re.k);
    const ns = un([[1, 2, 5], [2, 3, 10], [1, 4, 10], [2, 5, 10], [3, 5, 6]]);
    const n = un([12, 15, 20, 25, 30, 50].filter((v) => !ns.includes(v)));
    const x = k * n;
    const der = ns[ns.length - 1];
    return {
      text: phrase(
        `Le nombre ${de(re.b)} dépend du nombre ${de(re.as)}.`,
        ns.map((i) => `${qte(i, re.a, re.as)} : ${fr(k * i)} ${re.b}`).join(" ; ") + ".",
        un([`Combien ${de(re.b)} pour ${n} ${re.as} ?`, `Complète le tableau : combien ${de(re.b)} pour ${n} ${re.as} ?`, "Quel nombre va dans la case « ? » ?"]),
      ),
      ...qcmN(x, [k * der + (n - der), x + k, x - k, k + n]),
      explanation: etapes(`Pour 1, il y a ${k} ${re.b} : on multiplie le nombre ${de(re.as)} par ${k}.`, `${n} × ${k} = ${fr(x)}.`, `La case « ? » vaut ${fr(x)}.`),
      canvas: tableau({ coin: cap(re.as), headers: [...ns, n], rows: [{ label: cap(re.b), values: [...ns.map((i) => k * i), "?"] }], cell: { row: 0, col: ns.length } }),
    };
  }),

  // ★3 — quelle phrase décrit la relation ?
  tpl(R, "g03", 3, "Teste la phrase sur chaque colonne du tableau.", () => {
    const re = un(RELS);
    const k = un(re.k);
    const ns = un([[3, 4, 6], [3, 5, 7], [4, 5, 8], [3, 6, 10], [2, 7, 9]]);
    const J = `Le nombre ${de(re.b)} est ${k} fois le nombre ${de(re.as)}.`;
    return {
      text: phrase(
        ns.map((i) => `${qte(i, re.a, re.as)} : ${fr(k * i)} ${re.b}`).join(" ; ") + ".",
        un(["Quelle phrase décrit la relation ?", "Quelle règle relie les deux nombres ?", `Comment trouver le nombre ${de(re.b)} ?`]),
      ),
      ...qcm(J, [`On ajoute ${k} au nombre ${de(re.as)}.`, `Le nombre ${de(re.b)} est ${k + 1} fois le nombre ${de(re.as)}.`, `Le nombre ${de(re.as)} est ${k} fois le nombre ${de(re.b)}.`]),
      explanation: etapes("On vérifie la phrase sur toutes les colonnes.", ns.map((i) => `${i} × ${k} = ${fr(k * i)}`).join(" ; ") + ".", J),
      canvas: tableau({ coin: cap(re.as), headers: ns, rows: [{ label: cap(re.b), values: ns.map((i) => k * i) }] }),
    };
  }),

  // ★3 — une relation qui AJOUTE (âges, scores, prix, étages).
  tpl(R, "g04", 3, "L'écart reste le même : on ajoute (ou on enlève) toujours le même nombre.", () => {
    const [A, B] = deux();
    const d = entre(3, 15);
    const x1 = entre(4, 12), x2 = x1 + entre(2, 6), x = x2 + entre(5, 40);
    const inverse = Math.random() < 0.35;
    const ctx = un([
      { t: `${A.nom} a ${d} ans de plus que ${B.nom}.`, q: inverse ? `Quand ${A.nom} aura ${x + d} ans, quel âge aura ${B.nom} ?` : `Quand ${B.nom} aura ${x} ans, quel âge aura ${A.nom} ?`, la: `Âge de ${A.nom}`, lb: `Âge de ${B.nom}`, u: "ans" },
      { t: `La tour de ${A.nom} a toujours ${d} cubes de plus que celle de ${B.nom}.`, q: inverse ? `Quand la tour de ${A.nom} a ${x + d} cubes, combien de cubes a celle de ${B.nom} ?` : `Quand la tour de ${B.nom} a ${x} cubes, combien de cubes a celle de ${A.nom} ?`, la: `Tour de ${A.nom}`, lb: `Tour de ${B.nom}`, u: "" },
      { t: `Au cinéma, une place adulte coûte toujours ${d} € de plus qu'une place enfant.`, q: inverse ? `Si la place adulte coûte ${x + d} €, combien coûte la place enfant ?` : `Si la place enfant coûte ${x} €, combien coûte la place adulte ?`, la: "Place adulte (€)", lb: "Place enfant (€)", u: "€" },
      { t: `Aux fléchettes, ${A.nom} marque toujours ${d} points de plus que ${B.nom}.`, q: inverse ? `À une partie, ${A.nom} marque ${x + d} points. Combien en marque ${B.nom} ?` : `À une partie, ${B.nom} marque ${x} points. Combien en marque ${A.nom} ?`, la: `Points de ${A.nom}`, lb: `Points de ${B.nom}`, u: "" },
      { t: `Le thermomètre du jardin affiche toujours ${d} degrés de plus que celui de la cave.`, q: inverse ? `Le jardin affiche ${x + d} degrés. Que montre la cave ?` : `La cave affiche ${x} degrés. Que montre le jardin ?`, la: "Jardin (°C)", lb: "Cave (°C)", u: "" },
      { t: `Dans la tour de bureaux, l'ascenseur B monte toujours ${d} étages plus haut que l'ascenseur A.`, q: inverse ? `L'ascenseur B s'arrête au ${x + d}e étage. À quel étage monte l'ascenseur A ?` : `L'ascenseur A monte au ${x}e étage. À quel étage monte l'ascenseur B ?`, la: "Ascenseur B", lb: "Ascenseur A", u: "" },
    ]);
    const juste = inverse ? x : x + d;
    return {
      text: phrase(ctx.t, ctx.q),
      ...qcmN(juste, inverse ? [x + 2 * d, x + d + 1, d * (x + d)] : [x - d, x, d * x, x + 2 * d], ctx.u === "€" || ctx.u === "ans" ? ctx.u : ""),
      explanation: etapes(`L'écart est toujours de ${d} : on ${inverse ? "enlève" : "ajoute"} ${d}, on ne multiplie pas.`, inverse ? `${x + d} − ${d} = ${x}.` : `${x} + ${d} = ${x + d}.`, `La réponse est ${juste}${ctx.u ? ` ${ctx.u}` : ""}.`),
      canvas: tableau({ coin: ctx.lb, headers: [x1, x2, inverse ? "?" : x], rows: [{ label: ctx.la, values: [x1 + d, x2 + d, inverse ? x + d : "?"] }], cell: { row: 0, col: 2 } }),
    };
  }),

  // ★3 — la relation à l'envers : combien de cars pour 300 élèves ?
  tpl(R, "g05", 3, "Pour revenir au nombre d'objets, on divise.", () => {
    const re = un(RELS);
    const k = un(re.k), n = entre(6, 25), T = k * n;
    return {
      text: phrase(
        `${re.art} ${re.a} ${re.v} ${k} ${re.b}.`,
        un([`Combien ${de(re.as)} pour ${fr(T)} ${re.b} ?`, `On compte ${fr(T)} ${re.b}. Combien y a-t-il ${de(re.as)} ?`, `Avec ${fr(T)} ${re.b}, combien ${de(re.as)} ?`]),
      ),
      ...qcmN(n, [T - k, T + k, k, n + 1, n * 10]),
      explanation: etapes(`Pour 1, il y a ${k} ${re.b} : on cherche combien de fois ${k} dans ${fr(T)}.`, `${fr(T)} ÷ ${k} = ${n}.`, `Il y a ${n} ${re.as}.`),
      canvas: tableau({ coin: cap(re.as), headers: [1, "?"], rows: [{ label: cap(re.b), values: [k, T] }], cell: { row: 0, col: 1 } }),
    };
  }),

  // ★3 — la machine « × 3 + 1 » : quel nombre sort ?
  tpl(R, "g06", 3, "Applique la règle dans l'ordre : d'abord ×, puis + ou −.", () => {
    const moins = Math.random() < 0.3;
    const k = entre(2, 9);
    const g: Regle = { k, c: moins ? entre(1, k - 1) : entre(1, 15), moins };
    const n = entre(3, 25);
    const x = appliquer(g, n);
    const ex = [entre(1, 2), entre(3, 4)];
    return {
      text: phrase(un(MACHINES), `${dire(g)}.`, un([`Si on entre ${n}, quel nombre sort ?`, `On lui donne ${n}. Que trouve-t-il ?`, `Que devient le nombre ${n} ?`, `Avec ${n} au départ, quel est le résultat ?`])),
      ...qcmN(x, [g.moins ? n * (g.k - g.c) : n * (g.k + g.c), g.moins ? (n - g.c) * g.k : (n + g.c) * g.k, g.k * n, n + g.k + g.c].filter((v) => v > 0 && v !== x)),
      explanation: etapes(`La règle est « ${ecrireR(g)} » : d'abord on multiplie par ${g.k}, ensuite on ${g.moins ? "enlève" : "ajoute"} ${g.c}.`, `${n} × ${g.k} = ${g.k * n}, puis ${g.k * n} ${g.moins ? "−" : "+"} ${g.c} = ${x}.`, `Il sort ${x}.`),
      canvas: tableau({ title: `Règle : ${ecrireR(g)}`, coin: "Entrée", headers: [...ex, n], rows: [{ label: "Sortie", values: [...ex.map((v) => appliquer(g, v)), "?"] }], cell: { row: 0, col: 2 } }),
    };
  }),

  // ★3 — tables et chaises : ce n'est PAS proportionnel.
  tpl(R, "g07", 3, "Regarde de combien on augmente à chaque fois, sans multiplier le premier nombre.", () => {
    const af = un(AFFINES);
    const n = entre(5, 9);
    const x = af.k * n + af.c;
    return {
      text: phrase(af.intro, paires(af, [1, 2, 3]), un([`Combien ${de(af.r)} pour ${n} ${af.n} ?`, `Et avec ${n} ${af.n}, combien ${de(af.r)} ?`, `Combien faut-il ${de(af.r)} pour ${n} ${af.n} ?`])),
      ...qcmN(x, [n * (af.k + af.c), af.k * n, af.k * 4 + af.c, x + 1], af.r === "euros" ? "€" : ""),
      explanation: etapes(`On ajoute ${af.k} à chaque ${af.n1} de plus. Attention : ce n'est pas ${n} fois le nombre pour 1.`, `${af.k + af.c} + ${n - 1} × ${af.k} = ${x}.`, `Il en faut ${x}.`),
      canvas: tabAffine(af, [1, 2, 3], n),
    };
  }),

  // ★4 — quelle formule ?
  tpl(R, "g08", 4, "Teste chaque formule sur deux colonnes au moins.", () => {
    const af = un(AFFINES);
    const ns = [1, 2, 3, 4];
    const nb = (s: string) => `nombre ${de(s)}`;
    const J = `${cap(nb(af.r))} = ${af.k} × ${nb(af.n)} + ${af.c}`;
    return {
      text: phrase(af.intro, paires(af, ns), un([`Quelle formule donne le ${nb(af.r)} ?`, `Quelle règle permet de calculer le ${nb(af.r)} ?`, "Quelle formule marche pour toutes les colonnes ?"])),
      ...qcm(J, [`${cap(nb(af.r))} = ${af.k + af.c} × ${nb(af.n)}`, `${cap(nb(af.r))} = ${nb(af.n)} + ${af.k + af.c - 1}`, `${cap(nb(af.r))} = ${af.k} × ${nb(af.n)}`, ...(af.c > 1 ? [`${cap(nb(af.r))} = ${af.c} × ${nb(af.n)} + ${af.k}`] : [])].filter((f) => f !== J)),
      explanation: etapes(`On ajoute ${af.k} à chaque fois, et il y a ${af.c} de plus au départ.`, ns.map((i) => `${af.k} × ${i} + ${af.c} = ${af.k * i + af.c}`).join(" ; ") + ".", J + "."),
      canvas: tableau({ coin: cap(af.n), headers: ns, rows: [{ label: cap(af.r), values: ns.map((i) => af.k * i + af.c) }] }),
    };
  }),

  // ★4 — pour un grand nombre.
  tpl(R, "g09", 4, "Trouve d'abord la règle, puis applique-la au grand nombre.", () => {
    const af = un(AFFINES);
    const n = un([10, 12, 15, 20, 25, 30, 50, 100]);
    const x = af.k * n + af.c;
    return {
      text: phrase(af.intro, paires(af, [1, 2, 3]), un([`Combien ${de(af.r)} pour ${n} ${af.n} ?`, `On en met ${n}. Combien ${de(af.r)} ?`, `Avec ${n} ${af.n}, combien faut-il ${de(af.r)} ?`])),
      ...qcmN(x, [n * (af.k + af.c), af.k * n, x + af.k, x - af.k], af.r === "euros" ? "€" : ""),
      explanation: etapes(`Règle : ${af.k} × le nombre ${de(af.n)}, plus ${af.c}.`, `${af.k} × ${n} + ${af.c} = ${fr(af.k * n)} + ${af.c} = ${fr(x)}.`, `Il en faut ${fr(x)}.`),
      canvas: tabAffine(af, [1, 2, 3], n),
    };
  }),

  // ★4 — à l'envers : combien de tables pour 42 chaises ?
  tpl(R, "g10", 4, "Enlève d'abord ce qu'il y a en plus au départ, puis divise.", () => {
    const af = un(AFFINES);
    const n = entre(6, 30);
    const T = af.k * n + af.c;
    return {
      text: phrase(af.intro, paires(af, [1, 2, 3]), un([`Il y a ${fr(T)} ${af.r}. Combien ${de(af.n)} ?`, `Avec ${fr(T)} ${af.r}, combien ${de(af.n)} a-t-on ?`, `On compte ${fr(T)} ${af.r}. Combien y a-t-il ${de(af.n)} ?`])),
      ...qcmN(n, [T - af.c, Math.round(T / af.k), Math.round(T / (af.k + af.c)), n + 1].filter((v) => v !== n)),
      explanation: etapes(`Règle : ${af.k} × le nombre ${de(af.n)} + ${af.c}. On la défait à l'envers.`, `${fr(T)} − ${af.c} = ${fr(T - af.c)}, puis ${fr(T - af.c)} ÷ ${af.k} = ${n}.`, `Il y a ${n} ${af.n}.`),
      canvas: tableau({ coin: cap(af.n), headers: [1, 2, 3, "?"], rows: [{ label: cap(af.r), values: [1, 2, 3].map((i) => af.k * i + af.c).concat([T]) }], cell: { row: 0, col: 3 } }),
    };
  }),

  // ★4 — la machine à l'envers, ou la règle à retrouver.
  tpl(R, "g11", 4, "Pour remonter la machine, défais la dernière opération d'abord.", () => {
    const g: Regle = { k: entre(2, 9), c: entre(1, 12), moins: false };
    const trouverRegle = Math.random() < 0.45;
    if (trouverRegle) {
      const ns = [1, 2, 3, 5];
      const J = `× ${g.k} + ${g.c}`;
      return {
        text: phrase(
          un(MACHINES),
          ns.map((v) => `${v} → ${appliquer(g, v)}`).join(" ; ") + ".",
          un(["Quelle est la règle de la machine ?", "Quelle règle transforme chaque nombre ?", "Quelle règle marche pour toutes les colonnes ?"]),
        ),
        ...qcm(J, [`× ${g.k + g.c}`, `+ ${g.k + g.c - 1}`, `× ${g.k} + ${g.c + 1}`, `× ${g.c} + ${g.k}`].filter((f) => f !== J)),
        explanation: etapes(`Quand l'entrée augmente de 1, la sortie augmente de ${g.k} : on multiplie par ${g.k}. Il reste ${g.c} de plus.`, ns.map((v) => `${v} × ${g.k} + ${g.c} = ${appliquer(g, v)}`).join(" ; ") + ".", `La règle est « ${J} ».`),
        canvas: tableau({ coin: "Entrée", headers: ns, rows: [{ label: "Sortie", values: ns.map((v) => appliquer(g, v)) }] }),
      };
    }
    const n = entre(4, 25), S = appliquer(g, n);
    return {
      text: phrase(un(MACHINES), `${dire(g)}.`, un([`Il sort ${S}. Quel nombre est entré ?`, `Le résultat est ${S}. Quel était le nombre de départ ?`, `On obtient ${S}. Quel nombre avait-on donné ?`])),
      ...qcmN(n, [Math.round(S / g.k), Math.round((S + g.c) / g.k), S - g.c, n + 1].filter((v) => v !== n)),
      explanation: etapes(`On remonte la machine : d'abord on défait « + ${g.c} », puis « × ${g.k} ».`, `${S} − ${g.c} = ${S - g.c}, puis ${S - g.c} ÷ ${g.k} = ${n}.`, `Le nombre entré est ${n}.`),
      canvas: tableau({ title: `Règle : ${ecrireR(g)}`, coin: "", headers: ["Entrée", "Sortie"], rows: [{ values: ["?", S] }], cell: { row: 0, col: 0 } }),
    };
  }),

  // ★4 — un tarif avec une part fixe et une part par unité (décimaux).
  tpl(R, "g12", 4, "Prix total = prix par unité × nombre d'unités + part fixe.", () => {
    const tf = un(TARIFS);
    const k = un([1.5, 2.5, 3.5, 4.5, 1.25, 2.25, 0.5, 1.2, 2.4]);
    const c = un([2, 3, 4, 5, 6, 8, 10]);
    const n = entre(2, 12);
    const T = r2(k * n + c);
    const intro = tf.intro.replace("{c}", eur(c)).replace("{k}", eur(k));
    const envers = Math.random() < 0.4;
    if (envers) {
      return {
        text: phrase(intro, un([`On paie ${eur(T)}. Pour combien ${de(tf.us)} ?`, `La facture est de ${eur(T)}. Combien ${de(tf.us)} ?`, `Le total vaut ${eur(T)}. Trouve le nombre ${de(tf.us)}.`])),
        ...qcmN(n, [Math.round(T / k), Math.round((T + c) / k), n + 1, n - 1].filter((v) => v !== n)),
        explanation: etapes(`On enlève d'abord la part fixe de ${eur(c)}, puis on cherche combien de fois ${eur(k)}.`, `${eur(T)} − ${eur(c)} = ${eur(k * n)}, puis ${eur(k * n)} ÷ ${eur(k)} = ${n}.`, `C'est pour ${n} ${n === 1 ? tf.u1 : tf.us}.`),
        canvas: tableau({ coin: cap(tf.us), headers: [1, 2, "?"], rows: [{ label: "Prix", values: [eur(k + c), eur(2 * k + c), eur(T)] }], cell: { row: 0, col: 2 } }),
      };
    }
    return {
      text: phrase(intro, un([`Combien paie-t-on pour ${n} ${tf.us} ?`, `Quel est le prix pour ${n} ${tf.us} ?`, `Calcule le prix total pour ${n} ${tf.us}.`])),
      ...qcmE(T, [r2(k * n), r2((k + c) * n), r2(k * (n + c)), r2(T + k)], 0.5),
      explanation: etapes("Prix total = prix par unité × nombre d'unités + part fixe.", `${eur(k)} × ${n} = ${eur(k * n)}, puis ${eur(k * n)} + ${eur(c)} = ${eur(T)}.`, `On paie ${eur(T)}.`),
      canvas: tableau({ coin: cap(tf.us), headers: [1, 2, n], rows: [{ label: "Prix", values: [eur(k + c), eur(2 * k + c), "?"] }], cell: { row: 0, col: 2 } }),
    };
  }),
];

/* ═════════════════════════ ALGEBRE_DEFI ═════════════════════════ */

const D = "algebre_defi";
const OBJ_DEFI = ["billes", "cartes", "timbres", "images", "perles", "autocollants", "coquillages", "points", "bonbons", "livres", "figurines", "euros"];
const SUITE_CTX = [
  { t: (s: number) => `On ouvre un livre : la somme des numéros de trois pages qui se suivent vaut ${s}.`, q: "Quel est le numéro de la première de ces pages ?" },
  { t: (s: number) => `Trois coureurs ont des dossards qui se suivent. La somme de leurs numéros vaut ${s}.`, q: "Quel est le plus petit numéro ?" },
  { t: (s: number) => `Trois casiers qui se suivent au vestiaire : la somme de leurs numéros vaut ${s}.`, q: "Quel est le numéro du premier casier ?" },
  { t: (s: number) => `Au cinéma, trois amis ont des sièges numérotés qui se suivent. La somme des numéros vaut ${s}.`, q: "Quel est le plus petit numéro de siège ?" },
  { t: (s: number) => `Trois nombres entiers se suivent. Leur somme vaut ${s}.`, q: "Quel est le plus petit de ces nombres ?" },
  { t: (s: number) => `Trois chambres d'hôtel qui se suivent ont des numéros dont la somme vaut ${s}.`, q: "Quel est le numéro de la première chambre ?" },
  { t: (s: number) => `Trois maisons voisines du même côté de la rue ont des numéros pairs qui se suivent. Leur somme vaut ${s}.`, q: "Quel est le plus petit numéro ?" },
];
const DEUX_BALANCES = [
  { a: "pomme", as: "pommes", b: "poire", fa: true, fb: true, u: "g" },
  { a: "orange", as: "oranges", b: "citron", fa: true, fb: false, u: "g" },
  { a: "livre", as: "livres", b: "cahier", fa: false, fb: false, u: "g" },
  { a: "boule de pétanque", as: "boules de pétanque", b: "cochonnet", fa: true, fb: false, u: "g" },
  { a: "brique", as: "briques", b: "tuile", fa: true, fb: true, u: "g" },
  { a: "pot de miel", as: "pots de miel", b: "pot de confiture", fa: false, fb: false, u: "g" },
];
const DEUX_PRIX = [
  { a: "cahier", as: "cahiers", b: "stylo", fa: false, fb: false },
  { a: "croissant", as: "croissants", b: "baguette", fa: false, fb: true },
  { a: "glace", as: "glaces", b: "crêpe", fa: true, fb: true },
  { a: "place enfant", as: "places enfant", b: "place adulte", fa: true, fb: true },
  { a: "ticket de bus", as: "tickets de bus", b: "ticket de métro", fa: false, fb: false },
];
const art = (f: boolean) => (f ? "une" : "un");

const defi: TutorBankItemV4[] = [
  // ★4 — le nombre mystère en deux opérations, dans les trois ordres (vidéo : défi 4x = 36).
  tpl(D, "g01", 4, "Repars du résultat et défais les opérations, la dernière en premier.", () => {
    const P = perso();
    const lead = un(["Défi :", `Défi de ${P.nom} :`, "Le magicien dit :", "Le robot calculateur affiche une devinette :", "Énigme du jour :"]);
    const k = entre(2, 9), b = entre(3, 30), x = entre(4, 25);
    const ordre = un(["fois_plus", "fois_moins", "plus_fois", "div_plus"] as const);
    let txt = "", r = 0, faux: number[] = [], calc = "", canvas: CanvasFigure, juste = x;
    if (ordre === "fois_plus") {
      r = k * x + b;
      txt = `je pense à un nombre, je le multiplie par ${k}, puis j'ajoute ${b}. J'obtiens ${r}.`;
      faux = [r - b, Math.floor(r / k) - b, Math.floor((r + b) / k), x + 1];
      calc = `${r} − ${b} = ${k * x}, puis ${k * x} ÷ ${k} = ${x}.`;
      canvas = barre({ title: `? × ${k} + ${b} = ${r}`, total: String(r), parts: [...parts(Math.min(k, 9), "?"), { label: `+ ${b}`, value: b }] });
    } else if (ordre === "fois_moins") {
      const bb = Math.min(b, k * x - 1);
      r = k * x - bb;
      txt = `je pense à un nombre, je le multiplie par ${k}, puis j'enlève ${bb}. J'obtiens ${r}.`;
      faux = [r + bb, Math.floor(r / k) + bb, Math.floor(Math.max(1, r - bb) / k), x + 1];
      calc = `${r} + ${bb} = ${k * x}, puis ${k * x} ÷ ${k} = ${x}.`;
      canvas = barre({ title: `? × ${k} − ${bb} = ${r}`, total: String(k * x), parts: [{ label: "résultat", value: r }, { label: `− ${bb}`, value: bb }] });
    } else if (ordre === "plus_fois") {
      r = (x + b) * k;
      txt = `je pense à un nombre, je lui ajoute ${b}, puis je multiplie par ${k}. J'obtiens ${r}.`;
      faux = [Math.floor((r - b) / k), r - b, x + b, x + 1];
      calc = `${r} ÷ ${k} = ${x + b}, puis ${x + b} − ${b} = ${x}.`;
      canvas = barre({ title: `(? + ${b}) × ${k} = ${r}`, total: String(r), parts: parts(Math.min(k, 9), `? + ${b}`) });
    } else {
      juste = k * x;
      r = x + b;
      txt = `je pense à un nombre, je le divise par ${k}, puis j'ajoute ${b}. J'obtiens ${r}.`;
      faux = [r * k - b, r * k, x, (r + b) * k];
      calc = `${r} − ${b} = ${x}, puis ${x} × ${k} = ${juste}.`;
      canvas = barre({ title: `? ÷ ${k} + ${b} = ${r}`, total: String(r), parts: [{ label: `? ÷ ${k}`, unknown: true }, { label: `+ ${b}`, value: b }] });
    }
    return {
      text: phrase(lead, txt, un(["Quel est ce nombre ?", "Quel nombre ai-je choisi ?", "Retrouve le nombre de départ."])),
      ...qcmN(juste, faux.filter((v) => v > 0 && v !== juste)),
      explanation: etapes("On défait les opérations en partant de la fin, chacune avec son opération inverse.", calc, `Le nombre est ${juste}.`),
      canvas,
    };
  }),

  // ★4 — à eux deux, et l'un a d de plus.
  tpl(D, "g02", 4, "Enlève d'abord ce que l'un a en plus : il reste deux parts égales.", () => {
    const [A, B] = deux();
    const o = un(OBJ_DEFI);
    const x = entre(20, 200), d = entre(6, 60), T = 2 * x + d;
    const demandeA = Math.random() < 0.6;
    const juste = demandeA ? x : x + d;
    return {
      text: phrase(`${A.nom} et ${B.nom} ont ${T} ${o} à eux deux. ${B.nom} en a ${d} de plus que ${A.nom}.`, `Combien ${de(o)} a ${demandeA ? A.nom : B.nom} ?`),
      ...qcmN(juste, demandeA ? [Math.floor(T / 2), T - d, x + d] : [Math.floor(T / 2), x, T - d]),
      explanation: etapes(
        `Sur le schéma, ${B.nom} a la part de ${A.nom} plus ${d}. On enlève ${d}, puis on partage en deux.`,
        `${T} − ${d} = ${2 * x}, puis ${2 * x} ÷ 2 = ${x}${demandeA ? "" : `, et ${x} + ${d} = ${x + d}`}.`,
        `${demandeA ? A.nom : B.nom} a ${juste} ${o}.`,
      ),
      canvas: barre({ total: String(T), parts: [{ label: A.nom, unknown: true }, { label: B.nom, unknown: true }, { label: `+ ${d} pour ${B.nom}`, value: d }] }),
    };
  }),

  // ★4 — prix d'un article quand on connaît le total (avec des centimes).
  tpl(D, "g03", 4, "Enlève le prix connu, puis partage entre les articles identiques.", () => {
    const P = perso();
    const ar = un(ARTICLES_PRIX);
    const autre = un(["un sac", "une boisson", "une carte cadeau", "un emballage", "un magazine", "une gourde"]);
    const n = entre(2, 6), x = entre(6, 40) / 4, p = entre(4, 30) / 2, T = r2(n * x + p);
    return {
      text: phrase(
        `${ar.qui}, ${P.nom} paie ${eur(T)} pour ${n} ${ar.des} et ${autre}. ${cap(autre)} coûte ${eur(p)}.`,
        un([`Combien coûte ${ar.un} ?`, `Quel est le prix ${prixDe(ar.un)} ?`, `Trouve le prix ${prixDe(ar.un)}.`]),
      ),
      ...qcmE(x, [r2(T - p), r2(T / n), r2(x + p), r2((T + p) / n)], 0.25),
      explanation: etapes(`On enlève le prix de ${autre}, puis on partage entre les ${n} ${ar.des}.`, `${eur(T)} − ${eur(p)} = ${eur(n * x)}, puis ${eur(n * x)} ÷ ${n} = ${eur(x)}.`, `${cap(ar.un)} coûte ${eur(x)}.`),
      canvas: barre({ total: eur(T), parts: [...parts(n, "?"), { label: eur(p), value: p }] }),
    };
  }),

  // ★4 — la balance : 3 boîtes + 5 kg = 26 kg.
  tpl(D, "g04", 4, "Enlève la même masse des deux plateaux, puis partage.", () => {
    const obj = un([["boîtes", "une boîte"], ["sacs de farine", "un sac de farine"], ["pastèques", "une pastèque"], ["briques", "une brique"], ["colis", "un colis"], ["citrouilles", "une citrouille"], ["pots de peinture", "un pot de peinture"], ["sacs de billes", "un sac de billes"], ["cartons de livres", "un carton de livres"], ["seaux de sable", "un seau de sable"]] as const);
    const k = un([2, 3, 4, 5, 6]), x = entre(2, 15), b = entre(1, 12), T = k * x + b;
    const qui = un(["Au marché", "Au laboratoire", "En classe de sciences", "À la ferme", "À la poste", "Dans l'atelier", "Au port"]);
    return {
      text: phrase(`${qui}, une balance est en équilibre. À gauche : ${k} ${obj[0]} identiques et ${b} kg. À droite : ${T} kg.`, un([`Combien pèse ${obj[1]} ?`, "Quelle est la masse d'un seul objet ?", `Quelle est la masse ${deUn(obj[1])} ?`])),
      ...qcmN(x, [T - b, Math.floor(T / k), Math.floor((T + b) / k), x + 1].filter((v) => v !== x), "kg"),
      explanation: etapes(`On enlève ${b} kg des deux côtés : la balance reste en équilibre. Puis on partage en ${k}.`, `${T} − ${b} = ${k * x}, puis ${k * x} ÷ ${k} = ${x}.`, `Un objet pèse ${x} kg.`),
      canvas: barre({ title: "Balance en équilibre", total: `${T} kg`, parts: [...parts(k, "?"), { label: `${b} kg`, value: b }] }),
    };
  }),

  // ★5 — « k fois plus » et le total.
  tpl(D, "g05", 5, "Compte les parts égales : 1 pour l'un, k pour l'autre.", () => {
    const [A, B] = deux();
    const o = un(OBJ_DEFI);
    const k = un([2, 3, 4, 5, 6]), x = entre(12, 80), T = (k + 1) * x;
    const demandeA = Math.random() < 0.5;
    const juste = demandeA ? x : k * x;
    return {
      text: phrase(un(["Défi !", "Petite énigme.", ""]), `${B.nom} a ${k} fois plus ${de(o)} que ${A.nom}. Ensemble, ${A.nom} et ${B.nom} en ont ${T}.`, `Combien ${de(o)} a ${demandeA ? A.nom : B.nom} ?`),
      ...qcmN(juste, demandeA ? [Math.floor(T / k), T - k, k * x, Math.floor(T / 2)] : [x, T - x - 1, Math.floor(T / 2), k * x + k]),
      explanation: etapes(`${A.nom} a 1 part, ${B.nom} a ${k} parts : ${k + 1} parts égales en tout.`, `${T} ÷ ${k + 1} = ${x}${demandeA ? "" : `, puis ${k} × ${x} = ${k * x}`}.`, `${demandeA ? A.nom : B.nom} a ${juste} ${o}.`),
      canvas: barre({ total: String(T), parts: [{ label: A.nom, unknown: true }, ...parts(k, B.nom)] }),
    };
  }),

  // ★5 — la grande balance, en grammes.
  tpl(D, "g06", 5, "Enlève la même masse des deux côtés, puis partage entre les objets identiques.", () => {
    const obj = un([["pommes", "pomme"], ["oranges", "orange"], ["boules de pétanque", "boule de pétanque"], ["savons", "savon"], ["tablettes de chocolat", "tablette de chocolat"], ["pots de yaourt", "pot de yaourt"], ["livres", "livre"], ["ballons", "ballon"], ["mangues", "mangue"]] as const);
    const fem = /^(pomme|orange|boule|tablette|mangue)/.test(obj[1]);
    const k = un([2, 3, 4, 5, 6]), x = un([120, 150, 175, 200, 250, 300, 350, 400, 450]), b = un([100, 250, 300, 500, 750]), T = k * x + b;
    return {
      text: phrase(
        `Sur une balance en équilibre, il y a d'un côté ${k} ${obj[0]} identiques et une masse de ${fr(b)} g, de l'autre une masse de ${fr(T)} g.`,
        un([`Combien pèse ${fem ? "une" : "un"} ${obj[1]} ?`, "Quelle est la masse d'un seul objet ?", `Trouve la masse ${fem ? "d'une" : "d'un"} ${obj[1]}.`]),
      ),
      ...qcmN(x, [T - b, Math.round(T / k), Math.round((T + b) / k), x + 50].filter((v) => v !== x), "g", 25),
      explanation: etapes(`On enlève ${fr(b)} g des deux côtés, puis on partage en ${k}.`, `${fr(T)} − ${fr(b)} = ${fr(k * x)}, puis ${fr(k * x)} ÷ ${k} = ${x}.`, `${cap(fem ? "une" : "un")} ${obj[1]} pèse ${x} g.`),
      canvas: barre({ title: "Balance en équilibre", total: `${fr(T)} g`, parts: [...parts(k, "?"), { label: `${fr(b)} g`, value: b }] }),
    };
  }),

  // ★5 — trois nombres qui se suivent.
  tpl(D, "g07", 5, "Trois nombres qui se suivent : le plus petit, puis 1 de plus, puis 2 de plus.", () => {
    const c = un(SUITE_CTX);
    const pairs = c === SUITE_CTX[6];
    const x = pairs ? 2 * entre(5, 120) : entre(10, 300);
    const e = pairs ? 2 : 1;
    const s = 3 * x + 3 * e;
    return {
      text: phrase(un(["Défi !", "Petite énigme.", ""]), c.t(s), c.q),
      ...qcmN(x, [x + e, x + 2 * e, x + 3, x - e, Math.round(s / 3)].filter((v) => v !== x), "", e),
      explanation: pairs
        ? etapes("Le plus petit, puis 2 de plus, puis 4 de plus : on enlève 2 + 4 = 6, il reste trois fois le plus petit.", `${s} − 6 = ${s - 6}, puis ${s - 6} ÷ 3 = ${x}.`, `${x} + ${x + 2} + ${x + 4} = ${s} : le plus petit est ${x}.`)
        : etapes("Le plus petit, puis 1 de plus, puis 2 de plus : on enlève 1 + 2 = 3, il reste trois fois le plus petit.", `${s} − 3 = ${s - 3}, puis ${s - 3} ÷ 3 = ${x}.`, `${x} + ${x + 1} + ${x + 2} = ${s} : le premier est ${x}.`),
      canvas: barre({ total: String(s), parts: [{ label: "?", unknown: true }, { label: `? + ${e}`, unknown: true }, { label: `? + ${2 * e}`, unknown: true }] }),
    };
  }),

  // ★5 — le nombre mystère à indices.
  tpl(D, "g08", 5, "Écris tous les nombres qui vérifient le premier indice, puis teste les autres.", () => {
    const P = perso();
    const somme = (v: number) => String(v).split("").reduce((a, ch) => a + Number(ch), 0);
    for (let essai = 0; essai < 60; essai++) {
      const t = entre(6, 15);
      const min = un([50, 100, 150, 200, 250, 300]);
      const max = min + un([50, 60, 80, 100]);
      const mult: number[] = [];
      for (let v = min + 1; v < max; v++) if (v % t === 0) mult.push(v);
      const cible = un(mult);
      if (!cible) continue;
      const S = somme(cible);
      if (mult.filter((v) => somme(v) === S).length !== 1) continue;
      const autresMult = mult.filter((v) => v !== cible);
      const memeSomme: number[] = [];
      for (let v = min + 1; v < max; v++) if (somme(v) === S && v % t !== 0) memeSomme.push(v);
      if (autresMult.length < 1 || memeSomme.length < 1) continue;
      const lead = un([`Devinette de ${P.nom} :`, `Le cadenas du coffre de ${P.nom} cache un nombre.`, "Le nombre mystère du jour :", `${P.nom} a écrit un nombre secret.`, "Le magicien pense à un nombre."]);
      return {
        text: phrase(lead, `Il est compris entre ${min} et ${max}. C'est un multiple de ${t}. La somme de ses chiffres vaut ${S}.`, un(["Quel est ce nombre ?", "Quel nombre est-ce ?", "Trouve-le."])),
        ...qcm(String(cible), [...autresMult.sort(() => Math.random() - 0.5).slice(0, 2), ...memeSomme.slice(0, 2)].map(String)),
        explanation: etapes(`Les multiples de ${t} entre ${min} et ${max} : ${mult.join(", ")}.`, `Parmi eux, seul ${cible} a des chiffres dont la somme vaut ${S}.`, `Le nombre est ${cible}.`),
        ...(mult.length <= 8 ? { canvas: tableau({ title: `Multiples de ${t} entre ${min} et ${max}`, headers: mult, rows: [{ label: "Somme des chiffres", values: mult.map(() => "?") }], coin: "Nombre" }) } : {}),
      };
    }
    return {
      text: "Le nombre mystère est compris entre 100 et 115. C'est un multiple de 9. La somme de ses chiffres vaut 9. Quel est ce nombre ?",
      ...qcm("108", ["117", "99", "105"]),
      explanation: etapes("Les multiples de 9 entre 100 et 115 : 108 seulement.", "1 + 0 + 8 = 9.", "Le nombre est 108."),
    };
  }),

  // ★5 — deux balances (ou deux tickets de caisse) : on compare pour trouver un objet.
  tpl(D, "g09", 5, "Compare les deux situations : ce qui change, c'est un objet de plus.", () => {
    const prix = Math.random() < 0.45;
    if (prix) {
      const c = un(DEUX_PRIX);
      const P = perso();
      const a = entre(4, 16) / 4, b = entre(4, 24) / 4;
      const k = un([2, 3]);
      const P1 = r2(a + b), P2 = r2(k * a + b);
      const demandeA = Math.random() < 0.5;
      const juste = demandeA ? a : b;
      return {
        text: phrase(
          `${P.nom} paie ${eur(P1)} pour ${art(c.fa)} ${c.a} et ${art(c.fb)} ${c.b}. Le lendemain, ${P.il} paie ${eur(P2)} pour ${k} ${c.as} et ${art(c.fb)} ${c.b}.`,
          `Combien coûte ${art(demandeA ? c.fa : c.fb)} ${demandeA ? c.a : c.b} ?`,
        ),
        ...qcmE(juste, demandeA ? [r2(P2 - P1 + 1), r2(P1 / 2), b, r2(P2 / k)] : [a, r2(P1 / 2), r2(P2 - P1), r2(b + 1)], 0.25),
        explanation: etapes(
          `Entre les deux achats, il y a ${k - 1} ${k - 1 === 1 ? c.a : c.as} de plus : c'est la différence des prix.`,
          `${eur(P2)} − ${eur(P1)} = ${eur(P2 - P1)}${k === 3 ? `, et ${eur(P2 - P1)} ÷ 2 = ${eur(a)}` : ""} ; ${demandeA ? `${art(c.fa)} ${c.a} coûte ${eur(a)}` : `${eur(P1)} − ${eur(a)} = ${eur(b)}`}.`,
          `${cap(art(demandeA ? c.fa : c.fb))} ${demandeA ? c.a : c.b} coûte ${eur(juste)}.`,
        ),
        canvas: tableau({ coin: "Achat", headers: ["Ce qu'on achète", "Prix"], rows: [{ label: "1", values: [`1 ${c.a} + 1 ${c.b}`, eur(P1)] }, { label: "2", values: [`${k} ${c.as} + 1 ${c.b}`, eur(P2)] }] }),
      };
    }
    const c = un(DEUX_BALANCES);
    const a = un([80, 100, 120, 150, 180, 200, 250]), b = un([60, 90, 110, 130, 160, 220]);
    const k = un([2, 3]);
    const P1 = a + b, P2 = k * a + b;
    const demandeA = Math.random() < 0.55;
    const juste = demandeA ? a : b;
    return {
      text: phrase(
        `Sur une balance, ${art(c.fa)} ${c.a} et ${art(c.fb)} ${c.b} pèsent ensemble ${P1} g. Sur une autre balance, ${k} ${c.as} et ${art(c.fb)} ${c.b} pèsent ${P2} g.`,
        `Combien pèse ${art(demandeA ? c.fa : c.fb)} ${demandeA ? c.a : c.b} ?`,
      ),
      ...qcmN(juste, demandeA ? [P2 - P1 + 10, Math.round(P1 / 2), b, Math.round(P2 / k)] : [a, Math.round(P1 / 2), P2 - P1, b + 10], "g", 10),
      explanation: etapes(
        `Entre les deux pesées, il y a ${k - 1} ${k - 1 === 1 ? c.a : c.as} de plus : c'est la différence des masses.`,
        `${P2} − ${P1} = ${P2 - P1}${k === 3 ? `, et ${P2 - P1} ÷ 2 = ${a}` : ""} ; ${demandeA ? `${art(c.fa)} ${c.a} pèse ${a} g` : `${P1} − ${a} = ${b}`}.`,
        `${cap(art(demandeA ? c.fa : c.fb))} ${demandeA ? c.a : c.b} pèse ${juste} g.`,
      ),
      canvas: tableau({ coin: "Pesée", headers: ["Sur le plateau", "Masse"], rows: [{ label: "1", values: [`1 ${c.a} + 1 ${c.b}`, `${P1} g`] }, { label: "2", values: [`${k} ${c.as} + 1 ${c.b}`, `${P2} g`] }] }),
    };
  }),
];

export const algebreGabaritsCm2: TutorBankItemV4[] = [...egalite, ...completer, ...inconnu, ...schemaBarre, ...motif, ...relation, ...defi];
