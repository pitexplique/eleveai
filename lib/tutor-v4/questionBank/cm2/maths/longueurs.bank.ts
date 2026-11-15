// lib/tutor-v4/questionBank/cm2/maths/longueurs.bank.ts
//
// Les LONGUEURS du CM2 : comparer, convertir, estimer, défi. Vidéo de la notion :
// manim/scripts/cm2/longueur.py (pièce 2 mm, règle 30 cm, piscine 25 m, trajet
// 25 km ; 80 cm contre 1 m ; 1 km = 1 000 m ; randonnée 3 km + 1 500 m).
//
// ⭐ 15/11/2026 — GÉNÉRATEURS ET DESSINS, sur le modèle du CM1 (403b5beb), un cran
// plus haut : les DÉCIMAUX (3,5 km = 3 500 m ; 750 m = 0,75 km ; 2,45 m = 245 cm),
// les conversions larges (km → cm, m → mm), les longueurs en unités mêlées
// (« 1 km 250 m », « 1,3 km », « 1 280 m ») et les problèmes à plusieurs étapes.
// Chaque gabarit tire une SITUATION × une TOURNURE × des nombres, et pose son
// dessin : TABLEAU DE CONVERSION (chiffres placés, virgule dans la colonne de
// l'unité, case cherchée surlignée), SCHÉMA EN BARRE, OBJETS à estimer.
// ⛔ Le dessin porte les DONNÉES, jamais la réponse.
// ⛔ `schema_barre` met ses parts à l'échelle des nombres de `value` : les
//    longueurs en unités mêlées vont dans `label`.
// ⛔ L'unité partout : dans l'énoncé et dans chaque choix.
// ⛔ CM2 = zéro clavier (`applyMathsKeyboardFree`) : que des QCM (3 ou 4 choix),
//    leurres = vraies erreurs d'élève : « 3,45 > 3,5 car 45 > 5 », comparer sans
//    convertir, 2,5 m lu 2 m 5 cm, 3,5 km = 35 m (virgule effacée), 3,5 km =
//    3 005 m, 75 m = 0,75 km, un zéro de trop ou de moins, oublier une étape.
// ⛔ Division : « ÷ ». La Réunion ≈ 2 % (un contexte sur une quarantaine).

import type { DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { ObjetId, ObjetsCanvasData, SchemaBarreCanvasData, TableauDonneesCanvasData } from "@/lib/tutor-v4/types_canvas";
import { cap, entre, fr, melange, net, un } from "./trous-outils";

type Gen = TutorGeneratedQuestionV4;

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

const lg = (v: number, u: string) => `${fr(v)} ${u}`;
const entier = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
const nbDec = (x: number) => (String(net(x)).split(".")[1] ?? "").length;

type Qcm = Pick<Gen, "format" | "choices" | "expected" | "comparator">;
/** QCM à propositions écrites : jamais deux fois la même, 4 au plus. */
function qcm(juste: string, faux: string[]): Qcm {
  const d = melange([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  return { format: "qcm", choices: melange([juste, ...d]), expected: [juste], comparator: "mcq_exact" };
}
/** QCM de longueurs dans UNE unité : leurres positifs, distincts en VALEUR, voisins s'il en manque. */
function qcmL(juste: number, faux: number[], u: string): Qcm {
  const j = net(juste);
  const ok: number[] = [];
  for (const f of faux.map(net)) if (f > 0 && f !== j && !ok.includes(f)) ok.push(f);
  const pas = 10 ** -nbDec(j);
  for (let k = 1; ok.length < 3 && k < 30; k++)
    for (const f of [net(j + k * pas), net(j - k * pas)]) if (f > 0 && !ok.includes(f) && ok.length < 3) ok.push(f);
  return qcm(lg(j, u), ok.map((f) => lg(f, u)));
}

/* ───────────────────────── Les mots ───────────────────────── */

const VOY = /^(?!haric)[aeiouyàâéèêëîïôûh]/i;
/** « de Nina », « d'Aya ». */
const dN = (nom: string) => (/^[aeiouéèh]/i.test(nom) ? `d'${nom}` : `de ${nom}`);
const nomDe = (o: string) => o.replace(/^une? /, "");
const estF = (o: string) => o.startsWith("une ");
/** « du trajet » / « de la longueur » / « de l'épaisseur », pour un groupe déjà déterminé. */
const deArt = (q: string) => (q.startsWith("le ") ? `du ${q.slice(3)}` : `de ${q}`);
const pluriel = (o: string) => {
  const [w, ...r] = nomDe(o).split(" ");
  const p = /[sxz]$/.test(w) ? w : /(eau|au|eu)$/.test(w) ? `${w}x` : `${w}s`;
  return [p, ...r].join(" ");
};

const NOMS_F = ["Nina", "Zoé", "Lou", "Inès", "Jade", "Maya", "Lina", "Emma", "Léa", "Sarah", "Chloé", "Aya", "Rose", "Alice", "Mila", "Anaïs"];
const NOMS_M = ["Téo", "Ravi", "Malo", "Sacha", "Amir", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Hugo", "Enzo", "Bilal", "Jules", "Adam", "Ilan"];
type Metier = readonly [string, string];
type Perso = { nom: string; il: "il" | "elle"; txt: string; f: boolean };
/** Un prénom, et souvent son métier : « Nina, couturière, ». */
function perso(metier?: Metier, sauf: string[] = []): Perso {
  const f = Math.random() < 0.5;
  const noms = (f ? NOMS_F : NOMS_M).filter((n) => !sauf.includes(n));
  const nom = un(noms);
  const m = metier ? (f ? metier[0] : metier[1]) : "";
  return { nom, il: f ? "elle" : "il", txt: m && Math.random() < 0.7 ? `${nom}, ${m},` : nom, f };
}
const sujet = (p: Perso) => cap(p.il);

/* ───────────────────────── Les unités ───────────────────────── */

const COL = ["km", "hm", "dam", "m", "dm", "cm", "mm"] as const;
type Un = (typeof COL)[number];
const NOM_U: Record<Un, string> = { km: "kilomètres", hm: "hectomètres", dam: "décamètres", m: "mètres", dm: "décimètres", cm: "centimètres", mm: "millimètres" };
const rang = (u: Un) => COL.indexOf(u);
/** Combien de « vers » dans un « de » : m → cm = 100 ; cm → m = 0,01. */
const facteur = (de: Un, vers: Un) => 10 ** (rang(vers) - rang(de));
const egalite = (grand: Un, petit: Un) => `1 ${grand} = ${fr(facteur(grand, petit))} ${petit}`;
const conv = (v: number, de: Un, vers: Un) => net(v * facteur(de, vers));

/* ───────────────────────── Les dessins ───────────────────────── */

type Ligne = { label: string; parts: [number, Un][] };
/** Le tableau de conversion : chaque chiffre dans sa colonne, la virgule dans la colonne de
 *  l'unité, les zéros intérieurs écrits, la case cherchée surlignée (1re ligne). */
function tableauConv(lignes: Ligne[], cible?: Un): TableauDonneesCanvasData {
  let lo = 6;
  let hi = 0;
  const grilles = lignes.map((l) => {
    const cells: string[] = COL.map(() => "");
    for (const [v, u] of l.parts) {
      const [e, d = ""] = String(net(v)).split(".");
      const fin = rang(u);
      for (let i = 0; i < e.length; i++) {
        const c = fin - (e.length - 1 - i);
        if (c >= 0) cells[c] = e[i];
      }
      if (d) {
        cells[fin] += ",";
        for (let i = 0; i < d.length; i++) if (fin + 1 + i <= 6) cells[fin + 1 + i] = d[i];
      }
      lo = Math.min(lo, Math.max(0, fin - e.length + 1));
      hi = Math.max(hi, Math.min(6, fin + d.length));
    }
    const pleins = cells.map((c, i) => (c ? i : -1)).filter((i) => i >= 0);
    if (pleins.length) for (let i = pleins[0]; i <= pleins[pleins.length - 1]; i++) if (!cells[i]) cells[i] = "0";
    return cells;
  });
  if (cible) {
    lo = Math.min(lo, rang(cible));
    hi = Math.max(hi, rang(cible));
  }
  while (hi - lo < 3) {
    if (hi < 6) hi++;
    else lo--;
  }
  return {
    kind: "tableau_donnees",
    title: "Tableau de conversion",
    headers: ["", ...COL.slice(lo, hi + 1)],
    rows: lignes.map((l, i) => ({ values: [l.label, ...grilles[i].slice(lo, hi + 1)] })),
    display: { compact: true },
    ...(cible ? { highlight: { cell: { row: 0, col: rang(cible) - lo + 1 } } } : {}),
  };
}
/** Un tableau simple : qui, et quelle longueur. */
const tableauLongueurs = (lignes: [string, string][], tete = "Prénom"): TableauDonneesCanvasData => ({
  kind: "tableau_donnees",
  headers: [tete, "Longueur"],
  rows: lignes.map(([a, b]) => ({ values: [a, b] })),
  display: { compact: true },
});
/** Le schéma en barre ; ⛔ les longueurs dans `label` (unités mêlées). */
const barre = (parts: { label: string; unknown?: boolean }[], total?: string): SchemaBarreCanvasData => ({
  kind: "schema_barre",
  parts: parts.map((p) => (p.unknown ? { label: p.label, unknown: true } : { label: p.label })),
  ...(total ? { total } : {}),
});
const objetsCanvas = (elements: { quoi: ObjetId; label: string }[]): ObjetsCanvasData => ({ kind: "objets", mode: "couleur", elements, size: { width: 320 } });

/* ───────────────────────── Les fabricants ───────────────────────── */

const atelier =
  (micro: string) =>
  (suffixe: string, difficulty: DifficultyLevel, hint: string, generate: () => Gen): TutorBankItemV4 => ({
    kind: "template",
    id: `cm2_longueur_${micro}_tpl_${suffixe}`,
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: `longueur_${micro}`,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm2", "longueur", micro, "template"],
    generate,
  });

type Fixe = Omit<Extract<TutorBankItemV4, { kind: "fixed" }>, "kind" | "niveau" | "matiere" | "notionId" | "format" | "comparator" | "theme">;
const fixe = (f: Fixe): TutorBankItemV4 => ({ kind: "fixed", niveau: "cm2", matiere: "maths", notionId: "longueur", format: "qcm", comparator: "mcq_exact", theme: "neutral", ...f });

/* ───────────────────────── Les contextes ───────────────────────── */

/** Ce qu'on compare (échelle du mètre) : [nom, féminin, métier]. */
const LONGS: readonly (readonly [string, boolean, Metier])[] = [
  ["ruban", false, ["couturière", "couturier"]],
  ["corde", true, ["marin", "marin"]],
  ["planche", true, ["menuisière", "menuisier"]],
  ["écharpe", true, ["tricoteuse", "tricoteur"]],
  ["guirlande", true, ["décoratrice", "décorateur"]],
  ["fil de laine", false, ["tricoteuse", "tricoteur"]],
  ["tuyau", false, ["plombière", "plombier"]],
  ["câble", false, ["électricienne", "électricien"]],
  ["tige de bambou", true, ["jardinière", "jardinier"]],
  ["ficelle", true, ["fleuriste", "fleuriste"]],
  ["frise", true, ["graphiste", "graphiste"]],
  ["banderole", true, ["animatrice", "animateur"]],
  ["corde à sauter", true, ["animatrice", "animateur"]],
  ["barre de rideau", true, ["décoratrice", "décorateur"]],
  ["poutre", true, ["charpentière", "charpentier"]],
  ["rouleau de tissu", false, ["couturière", "couturier"]],
  ["tuyau d'arrosage", false, ["paysagiste", "paysagiste"]],
  ["rallonge électrique", true, ["électricienne", "électricien"]],
];
type Long = { nom: string; f: boolean; un: string; celui: string; ils: string; long: string; court: string; metier: Metier };
function tireLong(): Long {
  const [nom, f, metier] = un(LONGS);
  return { nom, f, un: `${f ? "une" : "un"} ${nom}`, celui: f ? "celle" : "celui", ils: f ? "elles" : "ils", long: f ? "longue" : "long", court: f ? "courte" : "court", metier };
}
const leN = (x: Long) => (VOY.test(x.nom) ? `l'${x.nom}` : `${x.f ? "la" : "le"} ${x.nom}`);
const art = (x: Long) => (x.f ? "la" : "le");

/** Petits objets (échelle du cm et du mm). */
const PETITS: readonly (readonly [string, boolean, Metier])[] = [
  ["crayon", false, ["dessinatrice", "dessinateur"]],
  ["vis", true, ["mécanicienne", "mécanicien"]],
  ["clé", true, ["serrurière", "serrurier"]],
  ["plume", true, ["ornithologue", "ornithologue"]],
  ["clou", false, ["menuisière", "menuisier"]],
  ["chenille", true, ["biologiste", "biologiste"]],
  ["pinceau", false, ["peintre", "peintre"]],
  ["coquillage", false, ["biologiste marine", "biologiste marin"]],
  ["sauterelle", true, ["biologiste", "biologiste"]],
  ["feutre", false, ["illustratrice", "illustrateur"]],
  ["barrette", true, ["coiffeuse", "coiffeur"]],
  ["fève de cacao", true, ["chocolatière", "chocolatier"]],
];
function tirePetit(): Long {
  const [nom, f, metier] = un(PETITS);
  return { nom, f, un: `${f ? "une" : "un"} ${nom}`, celui: f ? "celle" : "celui", ils: f ? "elles" : "ils", long: f ? "longue" : "long", court: f ? "courte" : "court", metier };
}

/** Les trajets pour les km : [verbe + préposition, métier]. */
const TRAJETS: readonly (readonly [string, Metier])[] = [
  ["court", ["coureuse", "coureur"]],
  ["marche", ["randonneuse", "randonneur"]],
  ["roule à vélo sur", ["cycliste", "cycliste"]],
  ["livre des colis sur", ["livreuse", "livreur"]],
  ["fait sa tournée sur", ["factrice", "facteur"]],
  ["rame en kayak sur", ["kayakiste", "kayakiste"]],
  ["fait du roller sur", ["animatrice", "animateur"]],
  ["patrouille sur", ["garde forestière", "garde forestier"]],
  ["promène les chiens sur", ["promeneuse de chiens", "promeneur de chiens"]],
  ["nage", ["nageuse", "nageur"]],
  ["fait du ski de fond sur", ["monitrice", "moniteur"]],
  ["galope à cheval sur", ["cavalière", "cavalier"]],
];

/** Une partie décimale « propre » : 1 chiffre (0,5) ou 2 (0,45 / 0,05). */
const decimale = (max2 = true) => (max2 && Math.random() < 0.5 ? un([entre(11, 99), entre(1, 9)]) / 100 : entre(1, 9) / 10);

/* =========================================================
   LONGUEUR_COMPARER — décimaux, puis convertir avant de comparer
========================================================= */
const COMP = atelier("comparer");

/** Deux décimaux de même partie entière, souvent le piège « 3,45 > 3,5 car 45 > 5 ». */
function paireDec(nMax = 9): [number, number] {
  const n = entre(1, nMax);
  const r = Math.random();
  let x: number;
  let y: number;
  if (r < 0.4) {
    const a = entre(2, 9);
    x = n + a / 10;
    y = n + (10 * (Math.random() < 0.5 ? a - 1 : a) + entre(1, 9)) / 100;
  } else if (r < 0.65) {
    x = n + entre(1, 9) / 100;
    y = n + entre(1, 9) / 10;
  } else if (r < 0.85) {
    const a = entre(1, 8);
    x = n + a / 10;
    y = n + entre(a + 1, 9) / 10;
  } else {
    x = n + entre(1, 9) / 10;
    y = n + 1 + entre(1, 9) / 100;
  }
  x = net(x);
  y = net(y);
  if (x === y) y = net(y + 0.1);
  return Math.random() < 0.5 ? [x, y] : [y, x];
}

const choixDe = (celui: string, p: Perso, t: string) => `${celui} ${dN(p.nom)} (${t})`;

/** ★1 — deux décimaux dans la même unité (m ou km). */
function compDecimal(): Gen {
  const enKm = Math.random() < 0.4;
  const [a, b] = paireDec(enKm ? 12 : 6);
  const plusLong = Math.random() < 0.6;
  let intro: string;
  let q: string;
  let celui: string;
  let p1: Perso;
  let p2: Perso;
  const u = enKm ? "km" : "m";
  const ta = lg(a, u);
  const tb = lg(b, u);
  if (enKm) {
    const [act, metier] = un(TRAJETS);
    p1 = perso(metier);
    p2 = perso(undefined, [p1.nom]);
    intro = un([`${p1.txt} ${act} ${ta}. ${p2.nom} ${act} ${tb}.`, `Le parcours ${dN(p1.nom)} fait ${ta}, celui ${dN(p2.nom)} fait ${tb}.`, `${p1.txt} a fait ${ta} et ${p2.nom} ${tb}.`, `Aujourd'hui, ${p1.nom} ${act} ${ta} ; ${p2.nom}, ${tb}.`]);
    q = un([`Quel parcours est le plus ${plusLong ? "long" : "court"} ?`, `Qui a fait le parcours le plus ${plusLong ? "long" : "court"} ?`, `Lequel des deux a parcouru la plus ${plusLong ? "grande" : "petite"} distance ?`]);
    celui = "celui";
  } else {
    const x = tireLong();
    p1 = perso(x.metier);
    p2 = perso(undefined, [p1.nom]);
    intro = un([
      `${p1.txt} a ${x.un} de ${ta}. ${p2.nom} a ${x.un} de ${tb}.`,
      `${cap(leN(x))} ${dN(p1.nom)} mesure ${ta}, ${x.celui} ${dN(p2.nom)} mesure ${tb}.`,
      `${p1.txt} et ${p2.nom} comparent leurs ${pluriel(x.un)} : ${ta} pour ${p1.nom}, ${tb} pour ${p2.nom}.`,
      `${p1.txt} mesure ${x.f ? "sa" : "son"} ${x.nom} : ${ta}. ${p2.nom} trouve ${tb} pour ${x.f ? "la sienne" : "le sien"}.`,
    ]);
    const adj = `${art(x)} plus ${plusLong ? x.long : x.court}`;
    q = un([`Qui a ${leN(x)} ${adj} ?`, `${x.f ? "Laquelle" : "Lequel"} est ${adj} ?`, `${x.f ? "Quelle" : "Quel"} ${x.nom} est ${adj} ?`]);
    celui = x.celui;
  }
  const g1 = plusLong === a > b;
  return {
    text: `${intro} ${q}`,
    ...qcm(g1 ? choixDe(celui, p1, ta) : choixDe(celui, p2, tb), [choixDe(celui, p1, ta), choixDe(celui, p2, tb), "les deux ont la même longueur"]),
    explanation: exp(
      "Pour comparer deux nombres décimaux, on compare d'abord les parties entières, puis les dixièmes, puis les centièmes.",
      "⚠️ Le nombre qui a le plus de chiffres après la virgule n'est pas forcément le plus grand : on compare chiffre par chiffre, en partant de la gauche.",
      `${fr(Math.max(a, b))} > ${fr(Math.min(a, b))}.`,
      `${plusLong ? "Le plus long" : "Le plus court"} : ${lg(plusLong ? Math.max(a, b) : Math.min(a, b), u)}.`,
    ),
    canvas: tableauConv([
      { label: p1.nom, parts: [[a, u]] },
      { label: p2.nom, parts: [[b, u]] },
    ]),
  };
}

/** ★1 — trois ou quatre longueurs décimales, même unité. */
function compTrois(): Gen {
  const x = tireLong();
  const p1 = perso(x.metier);
  const n = un([3, 3, 4]);
  const ps = [p1];
  while (ps.length < n) ps.push(perso(undefined, ps.map((p) => p.nom)));
  const e = entre(1, 5);
  const vals: number[] = [];
  while (vals.length < n) {
    const v = net(e + (Math.random() < 0.2 ? 1 : 0) + decimale());
    if (!vals.includes(v)) vals.push(v);
  }
  const plusLong = Math.random() < 0.55;
  const adj = plusLong ? x.long : x.court;
  const cible = plusLong ? Math.max(...vals) : Math.min(...vals);
  const liste = ps.map((p, i) => `${p.nom} : ${lg(vals[i], "m")}`).join(", ");
  const intro = un([
    `${n === 3 ? "Trois" : "Quatre"} amis mesurent leur ${x.nom}. ${liste}.`,
    `${p1.txt} compare les ${pluriel(x.un)} de son équipe. ${liste}.`,
    `Voici la longueur des ${pluriel(x.un)} : ${liste}.`,
    `Dans l'atelier, chacun a mesuré ${x.f ? "sa" : "son"} ${x.nom}. ${liste}.`,
  ]);
  const q = un([`Qui a ${leN(x)} ${art(x)} plus ${adj} ?`, `${x.f ? "Quelle" : "Quel"} ${x.nom} est ${art(x)} plus ${adj} ?`, `À qui est ${leN(x)} ${art(x)} plus ${adj} ?`]);
  const ix = vals.indexOf(cible);
  return {
    text: `${intro} ${q}`,
    ...qcm(`${ps[ix].nom} (${lg(cible, "m")})`, ps.filter((_, i) => i !== ix).map((p) => `${p.nom} (${lg(vals[ps.indexOf(p)], "m")})`)),
    explanation: exp(
      "Même unité : on compare les nombres décimaux.",
      "Les parties entières d'abord, puis les dixièmes, puis les centièmes. ⚠️ 2,5 > 2,45 : 5 dixièmes, c'est plus que 4 dixièmes.",
      `Les longueurs : ${vals.map((v) => lg(v, "m")).join(" ; ")}.`,
      `${cap(art(x))} plus ${adj} mesure ${lg(cible, "m")} : c'est ${x.celui} ${dN(ps[ix].nom)}.`,
    ),
    canvas: tableauConv(ps.map((p, i) => ({ label: p.nom, parts: [[vals[i], "m"]] as [number, Un][] }))),
  };
}

/** Les trois phrases « a … b » ; la juste selon les valeurs `va`, `vb` (ramenées à la même unité). */
function signes(ta: string, tb: string, va: number, vb: number) {
  const s = va < vb ? "<" : va > vb ? ">" : "=";
  return qcm(`${ta} ${s} ${tb}`, ["<", ">", "="].filter((x) => x !== s).map((x) => `${ta} ${x} ${tb}`));
}
const QSIGNE = (ta: string, tb: string) => [
  `Complète avec <, > ou = : ${ta} … ${tb}.`,
  `Quel signe faut-il mettre entre ${ta} et ${tb} ?`,
  `Compare ${ta} et ${tb} : quelle écriture est juste ?`,
  `Choisis l'écriture juste pour comparer ${ta} et ${tb}.`,
  `${ta} ou ${tb} : quelle écriture est vraie ?`,
];

/** ★1 — le signe entre deux longueurs décimales (ou entières à 4 chiffres) de même unité. */
function compSigne(): Gen {
  const u = un(["m", "km", "cm", "m"] as const);
  let a: number;
  let b: number;
  if (u === "cm" || Math.random() < 0.25) {
    const m = entre(1, 9) * 1000;
    const c = entre(1, 9);
    const d = entre(1, 9);
    [a, b] = Math.random() < 0.5 ? [m + 100 * c + d, m + 10 * c + d] : [m + 100 * c + 10 * d, m + 100 * d + 10 * c];
    if (a === b) b += 10;
  } else [a, b] = paireDec();
  if (Math.random() < 0.1) b = a;
  const ta = lg(a, u);
  const tb = lg(b, u);
  return {
    text: un(QSIGNE(ta, tb)),
    ...signes(ta, tb, a, b),
    explanation: exp(
      "« < » se lit « est plus petit que », « > » « est plus grand que ».",
      "Même unité : on compare les nombres chiffre par chiffre, en partant de la gauche (le tableau aligne les rangs).",
      a === b ? `${fr(a)} = ${fr(b)}.` : `${fr(Math.min(a, b))} < ${fr(Math.max(a, b))}.`,
      `${ta} ${a < b ? "<" : a > b ? ">" : "="} ${tb}.`,
    ),
    canvas: tableauConv([
      { label: ta, parts: [[a, u]] },
      { label: tb, parts: [[b, u]] },
    ]),
  };
}

/** Une longueur décimale en grande unité, l'autre en petite unité, souvent proches ou piégées. */
function deuxUnites(grand: Un, petit: Un): { X: number; Y: number; vX: number; vY: number } {
  const F = facteur(grand, petit);
  const n = grand === "km" ? entre(1, 9) : grand === "m" ? entre(1, 6) : entre(2, 15);
  const d = F >= 1000 ? un([entre(1, 9) / 10, entre(11, 99) / 100, entre(1, 9) / 100]) : F >= 100 ? decimale() : entre(1, 9) / 10;
  const X = net(n + d);
  const vX = conv(X, grand, petit);
  const r = Math.random();
  let Y: number;
  if (r < 0.15) Y = vX;
  else if (r < 0.45) {
    // le piège : la partie décimale « recollée » derrière la partie entière (2,5 m lu 2 m 5 cm)
    const dec = String(X).split(".")[1];
    Y = n * F + Number(dec);
    if (Y === vX) Y = vX + (F >= 1000 ? 50 : F >= 100 ? 5 : 1);
  } else {
    const pas = F >= 1000 ? un([50, 100, 200, 300]) : F >= 100 ? un([5, 10, 20, 30]) : entre(1, 4);
    Y = vX + (Math.random() < 0.5 ? pas : -pas);
  }
  if (Y <= 0) Y = vX + 1;
  return { X, Y, vX, vY: Y };
}

/** ★2-★3 — deux personnes, deux unités. */
function compUnites(familles: readonly (readonly [Un, Un])[]): () => Gen {
  return () => {
    const [grand, petit] = un(familles);
    const { X, Y, vX, vY } = deuxUnites(grand, petit);
    const plusLong = Math.random() < 0.6;
    const tX = lg(X, grand);
    const tY = lg(Y, petit);
    let intro: string;
    let q: string;
    let celui: string;
    let p1: Perso;
    let p2: Perso;
    if (grand === "km") {
      const [act, metier] = un(TRAJETS);
      p1 = perso(metier);
      p2 = perso(undefined, [p1.nom]);
      intro = un([`${p1.txt} ${act} ${tX}. ${p2.nom} ${act} ${tY}.`, `Le parcours ${dN(p1.nom)} fait ${tX}, celui ${dN(p2.nom)} fait ${tY}.`, `${p1.txt} a fait ${tX} et ${p2.nom} ${tY}.`, `Ce matin, ${p1.nom} ${act} ${tX} ; ${p2.nom}, ${tY}.`]);
      q = un([`Qui a fait le parcours le plus ${plusLong ? "long" : "court"} ?`, `Quel parcours est le plus ${plusLong ? "long" : "court"} ?`, `Lequel des deux a parcouru la plus ${plusLong ? "grande" : "petite"} distance ?`]);
      celui = "celui";
    } else {
      const x = grand === "cm" ? tirePetit() : tireLong();
      p1 = perso(x.metier);
      p2 = perso(undefined, [p1.nom]);
      intro = un([
        `${p1.txt} a ${x.un} de ${tX}. ${p2.nom} a ${x.un} de ${tY}.`,
        `${cap(leN(x))} ${dN(p1.nom)} mesure ${tX}, ${x.celui} ${dN(p2.nom)} mesure ${tY}.`,
        `${p1.txt} mesure ${x.f ? "sa" : "son"} ${x.nom} : ${tX}. ${p2.nom} trouve ${tY} pour ${x.f ? "la sienne" : "le sien"}.`,
        `${p1.txt} et ${p2.nom} comparent leurs ${pluriel(x.un)} : ${tX} et ${tY}.`,
      ]);
      const adj = `${art(x)} plus ${plusLong ? x.long : x.court}`;
      q = un([`Qui a ${leN(x)} ${adj} ?`, `${x.f ? "Laquelle" : "Lequel"} est ${adj} ?`, `${x.f ? "Quelle" : "Quel"} ${x.nom} est ${adj} ?`]);
      celui = x.celui;
    }
    const egal = vX === vY;
    const choixX = choixDe(celui, p1, tX);
    const choixY = choixDe(celui, p2, tY);
    const choixE = "les deux ont la même longueur";
    const juste = egal ? choixE : plusLong === vX > vY ? choixX : choixY;
    const decX = Number(String(X).split(".")[1]);
    const mauvaiseLecture = Math.floor(X) * facteur(grand, petit) + decX;
    return {
      text: `${intro} ${q}`,
      ...qcm(juste, [choixX, choixY, choixE]),
      explanation: exp(
        "Pour comparer deux longueurs écrites dans deux unités, on les écrit d'abord dans la même unité.",
        mauvaiseLecture !== vX
          ? `On utilise ${egalite(grand, petit)}. ⚠️ ${tX}, ce n'est pas ${fr(Math.floor(X))} ${grand} ${decX} ${petit}.`
          : `On utilise ${egalite(grand, petit)} : on multiplie par ${fr(facteur(grand, petit))}.`,
        `${tX} = ${lg(vX, petit)} ; on compare ${lg(vX, petit)} et ${tY}.`,
        egal ? "Les deux longueurs sont égales." : `${lg(Math.max(vX, vY), petit)} > ${lg(Math.min(vX, vY), petit)}.`,
      ),
      canvas: tableauConv([
        { label: p1.nom, parts: [[X, grand]] },
        { label: p2.nom, parts: [[Y, petit]] },
      ]),
    };
  };
}

/** ★2 — le signe entre deux longueurs d'unités différentes. */
function compSigneUnites(): Gen {
  const [grand, petit] = un([["m", "cm"], ["cm", "mm"], ["km", "m"], ["m", "mm"], ["m", "cm"]] as const);
  const { X, Y, vX, vY } = deuxUnites(grand, petit);
  const tX = lg(X, grand);
  const tY = lg(Y, petit);
  const inverse = Math.random() < 0.4;
  const [ta, tb, va, vb] = inverse ? [tY, tX, vY, vX] : [tX, tY, vX, vY];
  return {
    text: un([...QSIGNE(ta, tb), `Attention aux unités ! Quelle écriture est juste pour ${ta} et ${tb} ?`]),
    ...signes(ta, tb, va, vb),
    explanation: exp("On ne compare deux longueurs que dans la même unité.", `On utilise ${egalite(grand, petit)} : on multiplie par ${fr(facteur(grand, petit))}.`, `${tX} = ${lg(vX, petit)}, à comparer avec ${tY}.`, `${ta} ${va < vb ? "<" : va > vb ? ">" : "="} ${tb}.`),
    canvas: tableauConv([
      { label: ta, parts: [[inverse ? Y : X, inverse ? petit : grand]] },
      { label: tb, parts: [[inverse ? X : Y, inverse ? grand : petit]] },
    ]),
  };
}

/** ★3 — « a m b cm » contre une longueur décimale en m, ou en cm : sport. */
const SAUTS: readonly (readonly [string, Metier])[] = [
  ["saute", ["athlète", "athlète"]],
  ["lance son poids à", ["athlète", "athlète"]],
  ["lance son javelot à", ["entraîneuse", "entraîneur"]],
  ["fait glisser son palet jusqu'à", ["joueuse de curling", "joueur de curling"]],
  ["lance son avion en papier à", ["pilote", "pilote"]],
  ["lance son frisbee à", ["animatrice", "animateur"]],
  ["fait un triple saut de", ["athlète", "athlète"]],
  ["lance sa boule de pétanque à", ["joueuse", "joueur"]],
];
function compMixte(): Gen {
  const [act, metier] = un(SAUTS);
  const p1 = perso(metier);
  const p2 = perso(undefined, [p1.nom]);
  const a = entre(2, 9);
  const b = un([5, 8, 15, 20, 25, 30, 40, 45, 50, 60, 75, 80, 90]);
  const v1 = a * 100 + b;
  const r = Math.random();
  // les pièges : « a,b m » (3 m 5 cm lu 3,5 m), ou une valeur proche
  const v2 = r < 0.15 ? v1 : r < 0.5 && b < 10 ? a * 100 + b * 10 : v1 + un([-30, -20, -10, -5, 5, 10, 20, 30]);
  const t1 = `${a} m ${b} cm`;
  const enM = Math.random() < 0.6;
  const t2 = enM ? lg(v2 / 100, "m") : lg(v2, "cm");
  const plusLoin = Math.random() < 0.65;
  const intro = un([`${p1.txt} ${act} ${t1}. ${p2.nom} ${act} ${t2}.`, `Au concours, ${p1.nom} ${act} ${t1} et ${p2.nom} ${t2}.`, `${p1.txt} ${act} ${t1} ; ${p2.nom}, ${t2}.`]);
  const q = plusLoin ? un(["Qui est allé le plus loin ?", "Qui gagne ?", "Qui a fait le meilleur essai ?"]) : un(["Qui est allé le moins loin ?", "Qui a fait l'essai le plus court ?"]);
  const egal = v1 === v2;
  const juste = egal ? "les deux sont à égalité" : plusLoin === v1 > v2 ? `${p1.nom} (${t1})` : `${p2.nom} (${t2})`;
  return {
    text: `${intro} ${q}`,
    ...qcm(juste, [`${p1.nom} (${t1})`, `${p2.nom} (${t2})`, "les deux sont à égalité"]),
    explanation: exp(
      "Pour comparer, on écrit les deux longueurs dans la même unité.",
      "1 m = 100 cm : on écrit tout en centimètres.",
      `${t1} = ${a * 100} cm + ${b} cm = ${lg(v1, "cm")} ; ${t2}${enM ? ` = ${lg(v2, "cm")}` : ""}.`,
      egal ? "Les deux longueurs sont égales." : `${lg(Math.max(v1, v2), "cm")} > ${lg(Math.min(v1, v2), "cm")}.`,
    ),
    canvas: tableauConv([
      { label: p1.nom, parts: [[a, "m"], [b, "cm"]] },
      { label: p2.nom, parts: [enM ? [v2 / 100, "m"] : [v2, "cm"]] },
    ]),
  };
}

/** ★3 — ranger trois ou quatre longueurs écrites de façons différentes. */
function compRanger(): Gen {
  const [grand, petit] = un([["m", "cm"], ["km", "m"], ["km", "m"], ["cm", "mm"]] as const);
  const F = facteur(grand, petit);
  const base = grand === "cm" ? entre(2, 15) : entre(1, 5);
  const n = un([3, 4]);
  const vals = new Set<number>();
  while (vals.size < n) {
    const d = F >= 1000 ? entre(1, 19) * 50 : F >= 100 ? entre(1, 19) * 5 : entre(1, 9);
    vals.add(base * F + d);
  }
  const vs = melange([...vals]);
  // chaque longueur dans une écriture : décimale (1,25 m), petite unité (125 cm), mêlée (1 m 25 cm)
  const formes = melange(["dec", "petit", "mixte", un(["dec", "petit", "mixte"])]).slice(0, n);
  const ecr = (v: number, i: number) => (formes[i] === "dec" ? lg(v / F, grand) : formes[i] === "petit" ? lg(v, petit) : `${Math.floor(v / F)} ${grand} ${v % F} ${petit}`);
  const tx = vs.map(ecr);
  const ordre = vs.map((_, i) => i).sort((i, j) => vs[i] - vs[j]);
  const juste = ordre.map((i) => tx[i]).join(" < ");
  // piège : ranger les nombres écrits sans regarder l'unité
  const lu = (i: number) => (formes[i] === "dec" ? vs[i] / F : formes[i] === "petit" ? vs[i] : Math.floor(vs[i] / F) + (vs[i] % F) / 1000);
  const parNombres = vs.map((_, i) => i).sort((i, j) => lu(i) - lu(j)).map((i) => tx[i]).join(" < ");
  const inverse = [...ordre].reverse().map((i) => tx[i]).join(" < ");
  const autre = [ordre[1], ordre[0], ...ordre.slice(2)].map((i) => tx[i]).join(" < ");
  const autre2 = [ordre[0], ...ordre.slice(2), ordre[1]].map((i) => tx[i]).join(" < ");
  const x = tireLong();
  const p = perso(x.metier);
  const intro = un([
    `Range ces ${grand === "km" ? "distances" : "longueurs"} de la plus courte à la plus longue :`,
    "Range dans l'ordre croissant :",
    `${p.txt} veut ranger ${grand === "km" ? "ces distances" : "ces longueurs"} de la plus petite à la plus grande :`,
    "Quel est le bon rangement, du plus court au plus long ?",
    "Attention aux écritures ! Range du plus petit au plus grand :",
  ]);
  return {
    text: `${intro} ${tx.join(" ; ")}.`,
    ...qcm(juste, [parNombres, inverse, autre, autre2]),
    explanation: exp("Pour ranger des longueurs, il faut qu'elles soient écrites dans la même unité.", `On utilise ${egalite(grand, petit)} et on écrit tout en ${NOM_U[petit]}.`, vs.map((v, i) => `${tx[i]} = ${lg(v, petit)}`).join(" ; ") + ".", `Rangement : ${juste}.`),
    canvas: tableauConv(vs.map((v, i) => ({ label: tx[i], parts: (formes[i] === "dec" ? [[v / F, grand]] : formes[i] === "petit" ? [[v, petit]] : [[Math.floor(v / F), grand], [v % F, petit]]) as [number, Un][] }))),
  };
}

/** ★3 — de combien l'une est-elle plus longue que l'autre (unités différentes) ? */
function compEcart(): Gen {
  const [grand, petit] = un([["m", "cm"], ["m", "cm"], ["km", "m"]] as const);
  const F = facteur(grand, petit);
  const n = grand === "km" ? entre(1, 6) : entre(1, 4);
  const X = net(n + (grand === "km" ? un([entre(1, 9) / 10, entre(11, 99) / 100]) : decimale()));
  const vX = conv(X, grand, petit);
  const ec = grand === "km" ? un([entre(1, 9) * 50, entre(1, 9) * 100, entre(11, 19) * 50]) : un([entre(1, 9) * 5, entre(11, 60)]);
  const vY = vX - ec > 0 ? vX - ec : vX + ec;
  const ecart = Math.abs(vX - vY);
  let intro: string;
  let q: string;
  if (grand === "km") {
    const [act, metier] = un(TRAJETS);
    const p1 = perso(metier);
    const p2 = perso(undefined, [p1.nom]);
    intro = un([`${p1.txt} ${act} ${lg(X, "km")}, ${p2.nom} ${lg(vY, "m")}.`, `Le parcours ${dN(p1.nom)} mesure ${lg(X, "km")} ; celui ${dN(p2.nom)}, ${lg(vY, "m")}.`]);
    q = un(["Quelle est la différence entre les deux parcours, en mètres ?", "De combien de mètres les deux parcours diffèrent-ils ?", "Combien de mètres de plus pour le plus long parcours ?"]);
  } else {
    const x = tireLong();
    const p1 = perso(x.metier);
    const p2 = perso(undefined, [p1.nom]);
    intro = un([`${cap(leN(x))} ${dN(p1.nom)} mesure ${lg(X, "m")}, ${x.celui} ${dN(p2.nom)} ${lg(vY, "cm")}.`, `${p1.txt} a ${x.un} de ${lg(X, "m")} ; ${p2.nom} ${x.f ? "une" : "un"} de ${lg(vY, "cm")}.`]);
    q = un([`Quelle est la différence de longueur, en centimètres ?`, `De combien de centimètres ${x.f ? "l'une" : "l'un"} dépasse-t-${x.f ? "elle" : "il"} l'autre ?`, "Quel est l'écart entre les deux, en cm ?"]);
  }
  return {
    text: `${intro} ${q}`,
    ...qcmL(ecart, [ecart + (F >= 1000 ? 100 : 10), Math.abs(vX / 10 - vY), vX + vY, ecart * 10, ecart - (F >= 1000 ? 100 : 10)].filter((x) => entier(x)), petit),
    explanation: exp("La différence de deux longueurs, c'est la plus grande moins la plus petite, dans la même unité.", `On utilise ${egalite(grand, petit)}.`, `${lg(X, grand)} = ${lg(vX, petit)} ; ${fr(Math.max(vX, vY))} − ${fr(Math.min(vX, vY))} = ${fr(ecart)}.`, `L'écart est de ${lg(ecart, petit)}.`),
    canvas: tableauConv([
      { label: lg(X, grand), parts: [[X, grand]] },
      { label: lg(vY, petit), parts: [[vY, petit]] },
    ]),
  };
}

const compUnites2 = compUnites([["m", "cm"], ["cm", "mm"], ["m", "cm"], ["m", "mm"]]);
const compUnitesKm = compUnites([["km", "m"]]);

const comparerItems: TutorBankItemV4[] = [
  fixe({
    id: "cm2_longueur_comparer_fixed_3_cm_m",
    microId: "longueur_comparer",
    difficulty: 2,
    text: "Compare : 120 cm et 1 m.",
    choices: ["120 cm est plus grand", "1 m est plus grand", "ils sont égaux"],
    expected: ["120 cm est plus grand"],
    hint: "1 m = 100 cm.",
    explanation: exp("Pour comparer deux longueurs, on les met dans la même unité.", "On convertit 1 m en centimètres.", "1 m = 100 cm. Or 120 cm > 100 cm.", "120 cm est plus grand que 1 m."),
    tags: ["cm2", "longueur", "comparer", "m_cm", "qcm"],
  }),
  fixe({
    id: "cm2_longueur_comparer_fixed_4_erreur_unites",
    microId: "longueur_comparer",
    difficulty: 3,
    text: "Un élève dit : « 80 cm est plus grand que 1 m, parce que 80 est plus grand que 1. » Que faut-il lui répondre ?",
    choices: ["il a tort : 1 m = 100 cm, donc 1 m est plus long", "il a raison : 80 est plus grand que 1", "les deux longueurs sont égales"],
    expected: ["il a tort : 1 m = 100 cm, donc 1 m est plus long"],
    hint: "Il faut tenir compte des unités.",
    explanation: exp("On ne compare des nombres que s'ils sont dans la même unité.", "On convertit 1 m en centimètres.", "1 m = 100 cm et 100 cm > 80 cm.", "1 m est plus long que 80 cm."),
    tags: ["cm2", "longueur", "comparer", "erreur", "qcm"],
  }),
  COMP("decimal", 1, "Compare les parties entières, puis les dixièmes, puis les centièmes.", compDecimal),
  COMP("trois", 1, "Même unité : compare chiffre par chiffre, en partant de la gauche.", compTrois),
  COMP("signe", 1, "« < » : est plus petit que ; « > » : est plus grand que.", compSigne),
  COMP("unites", 2, "Écris les deux longueurs dans la même unité avant de comparer.", compUnites2),
  COMP("km_m", 2, "1 km = 1 000 m : 1,5 km = 1 500 m.", compUnitesKm),
  COMP("signe_unites", 2, "Convertis d'abord : 1 m = 100 cm, 1 km = 1 000 m.", compSigneUnites),
  COMP("mixte", 3, "Écris tout en centimètres.", compMixte),
  COMP("ranger", 3, "Écris tout dans la même unité, puis range.", compRanger),
  COMP("ecart", 3, "Convertis, puis fais la plus grande moins la plus petite.", compEcart),
];

/* =========================================================
   LONGUEUR_CONVERTIR — le tableau, la virgule, les zéros
========================================================= */
const CONV = atelier("convertir");

const CTX_CONV: Record<"mini" | "petit" | "moyen" | "grand", readonly (readonly [string, Metier])[]> = {
  mini: [
    ["une vis", ["mécanicienne", "mécanicien"]],
    ["une perle", ["bijoutière", "bijoutier"]],
    ["une pièce de moteur", ["mécanicienne", "mécanicien"]],
    ["un clou", ["menuisière", "menuisier"]],
    ["une graine", ["jardinière", "jardinier"]],
    ["un insecte", ["biologiste", "biologiste"]],
    ["un bouton", ["couturière", "couturier"]],
    ["une puce électronique", ["informaticienne", "informaticien"]],
  ],
  petit: [
    ["un ruban", ["couturière", "couturier"]],
    ["une bande de papier", ["maîtresse", "maître"]],
    ["un fil de laine", ["tricoteuse", "tricoteur"]],
    ["une frise", ["graphiste", "graphiste"]],
    ["un galon", ["couturière", "couturier"]],
    ["une baguette de bois", ["menuisière", "menuisier"]],
    ["un lacet", ["cordonnière", "cordonnier"]],
    ["une écharpe", ["tricoteuse", "tricoteur"]],
    ["une étagère", ["menuisière", "menuisier"]],
  ],
  moyen: [
    ["une corde", ["marin", "marin"]],
    ["un tuyau d'arrosage", ["jardinière", "jardinier"]],
    ["une banderole", ["animatrice", "animateur"]],
    ["un câble", ["électricienne", "électricien"]],
    ["une guirlande", ["décoratrice", "décorateur"]],
    ["une clôture", ["agricultrice", "agriculteur"]],
    ["un rouleau de tissu", ["couturière", "couturier"]],
    ["une piste de saut", ["athlète", "athlète"]],
    ["une poutre", ["charpentière", "charpentier"]],
    ["un mur", ["maçonne", "maçon"]],
  ],
  grand: [
    ["un sentier", ["guide", "guide"]],
    ["une piste cyclable", ["cycliste", "cycliste"]],
    ["une route", ["cantonnière", "cantonnier"]],
    ["un parcours de course", ["coureuse", "coureur"]],
    ["une randonnée", ["randonneuse", "randonneur"]],
    ["une tournée de livraison", ["livreuse", "livreur"]],
    ["une ligne de bus", ["conductrice de bus", "conducteur de bus"]],
    ["une course de kayak", ["kayakiste", "kayakiste"]],
    ["un tunnel", ["ingénieure", "ingénieur"]],
    ["un pont", ["ingénieure", "ingénieur"]],
  ],
};
const echelle = (a: Un, b: Un): "petit" | "moyen" | "grand" => (a === "km" || b === "km" || a === "hm" || b === "hm" ? "grand" : a === "m" || b === "m" || a === "dam" || b === "dam" ? "moyen" : "petit");
const unOuUne = (quoi: string) => (quoi.startsWith("un ") ? "d'un" : "d'une");

/** L'échelle d'après la vraie longueur, en mètres : un ruban, une corde, un sentier. */
const echelleM = (m: number): "mini" | "petit" | "moyen" | "grand" => (m < 0.1 ? "mini" : m < 1.5 ? "petit" : m < 1000 ? "moyen" : "grand");
/** Les phrases d'une conversion ; `t` = la donnée écrite, `vers` = l'unité d'arrivée, `m` = la longueur en mètres. */
function phrasesConv(t: string, vers: Un, de: Un, m?: number): string {
  const [quoi, metier] = un(CTX_CONV[m === undefined ? echelle(de, vers) : echelleM(m)]);
  const p = perso(metier);
  if (Math.random() < 0.3)
    return `${cap(quoi)} mesure ${t}. ${un([`Combien cela fait-il de ${NOM_U[vers]} ?`, `Quelle est cette longueur en ${NOM_U[vers]} ?`, `Écris cette longueur en ${NOM_U[vers]}.`])}`;
  if (Math.random() < 0.5)
    return un([
      `Convertis ${t} en ${NOM_U[vers]}.`,
      `Complète : ${t} = … ${vers}.`,
      `Combien de ${NOM_U[vers]} y a-t-il dans ${t} ?`,
      `${t}, cela fait combien de ${NOM_U[vers]} ?`,
      `Écris ${t} en ${NOM_U[vers]}.`,
      `Quelle longueur en ${vers} est égale à ${t} ?`,
    ]);
  return `${un([`${p.txt} mesure ${quoi} : ${t}.`, `${p.txt} a besoin ${unOuUne(quoi)} ${nomDe(quoi)} de ${t}.`, `${p.txt} note ${t} pour ${quoi}.`])} ${un([`Combien cela fait-il de ${NOM_U[vers]} ?`, `Quelle est cette longueur en ${NOM_U[vers]} ?`, `Écris cette longueur en ${NOM_U[vers]}.`, `Que doit-${p.il} écrire en ${vers} ?`])}`;
}
const methodeConv = (de: Un, vers: Un) => {
  const f = facteur(de, vers);
  return f >= 1
    ? `Vers une unité plus petite, on multiplie par ${fr(f)} : dans le tableau, on décale la virgule de ${rang(vers) - rang(de)} colonne${rang(vers) - rang(de) > 1 ? "s" : ""} vers la droite, en ajoutant des zéros s'il le faut.`
    : `Vers une unité plus grande, on divise par ${fr(1 / f)} : dans le tableau, la virgule se place juste après la colonne ${vers}.`;
};
const calculConv = (v: number, de: Un, vers: Un) => {
  const f = facteur(de, vers);
  return f >= 1 ? `${fr(v)} × ${fr(f)} = ${fr(conv(v, de, vers))}.` : `${fr(v)} ÷ ${fr(1 / f)} = ${fr(conv(v, de, vers))}.`;
};
const defConv = (de: Un, vers: Un) => `${facteur(de, vers) >= 1 ? egalite(de, vers) : egalite(vers, de)}.`;

const PAIRES_ENT: readonly (readonly [Un, Un])[] = [
  ["m", "cm"], ["km", "m"], ["km", "m"], ["cm", "mm"], ["m", "mm"], ["km", "cm"], ["dm", "cm"], ["hm", "m"], ["dam", "m"],
  ["cm", "m"], ["m", "km"], ["mm", "cm"], ["mm", "m"], ["cm", "dm"],
];
/** Une valeur entière à convertir de `de` vers `vers` (résultat entier). */
function valeurPour(de: Un, vers: Un): number {
  const f = facteur(de, vers);
  if (f >= 1) return f >= 1000 ? entre(2, 12) : f >= 100 ? entre(2, 40) : entre(2, 90);
  const k = Math.round(1 / f);
  return entre(2, k >= 1000 ? 15 : 40) * k;
}

/** ★1 — une conversion entière. */
function convSimple(): Gen {
  const [de, vers] = un(PAIRES_ENT);
  const v = valeurPour(de, vers);
  const r = conv(v, de, vers);
  return {
    text: phrasesConv(lg(v, de), vers, de, conv(v, de, "m")),
    ...qcmL(r, [r * 10, r / 10, v, r * 100, r / 100].filter((x) => entier(x)), vers),
    explanation: exp(defConv(de, vers), methodeConv(de, vers), calculConv(v, de, vers), `${lg(v, de)} = ${lg(r, vers)}.`),
    canvas: tableauConv([{ label: lg(v, de), parts: [[v, de]] }], vers),
  };
}

/** ★1 — retrouver l'unité qui manque. */
function convUnite(): Gen {
  const [de, vers] = un(PAIRES_ENT);
  const v = valeurPour(de, vers);
  const r = conv(v, de, vers);
  const autres = (["km", "m", "dm", "cm", "mm"] as Un[]).filter((u) => u !== vers && u !== de);
  return {
    text: un([`Quelle unité manque ? ${lg(v, de)} = ${fr(r)} …`, `Complète avec la bonne unité : ${lg(v, de)} = ${fr(r)} …`, `Trouve l'unité : ${lg(v, de)} = ${fr(r)} …`, `${lg(v, de)}, c'est ${fr(r)} quoi ?`, `Par quelle unité finir l'égalité ${lg(v, de)} = ${fr(r)} … ?`]),
    ...qcm(lg(r, vers), melange(autres).slice(0, 3).map((u) => lg(r, u))),
    explanation: exp("Une même longueur s'écrit avec un nombre plus grand dans une unité plus petite.", "On place le nombre dans le tableau de conversion et on cherche la colonne où il finit.", `${lg(v, de)} = ${lg(r, vers)} car ${defConv(de, vers).slice(0, -1)}.`, `L'unité qui manque est le ${vers}.`),
    canvas: tableauConv([{ label: lg(v, de), parts: [[v, de]] }]),
  };
}

const PAIRES_DEC: readonly (readonly [Un, Un])[] = [["km", "m"], ["km", "m"], ["m", "cm"], ["m", "cm"], ["cm", "mm"], ["m", "mm"], ["km", "cm"], ["dm", "mm"]];
/** Un décimal à convertir vers une unité plus petite (résultat entier). */
function decimalPour(de: Un, vers: Un): number {
  const f = facteur(de, vers);
  const n = un([0, entre(1, 9), entre(1, 9), entre(10, 25)]);
  const maxDec = Math.min(f >= 1000 ? 3 : f >= 100 ? 2 : 1, 3);
  const k = entre(1, maxDec);
  const d = k === 1 ? entre(1, 9) / 10 : k === 2 ? un([entre(11, 99), entre(1, 9)]) / 100 : un([entre(101, 999), entre(1, 99)]) / 1000;
  return net(n + d);
}

/** ★2 — un décimal vers une unité plus petite : 3,5 km = 3 500 m. */
function convDecimal(): Gen {
  const [de, vers] = un(PAIRES_DEC);
  const v = decimalPour(de, vers);
  const f = facteur(de, vers);
  const r = conv(v, de, vers);
  const [e, d] = String(v).split(".");
  const efface = Number(e + d); // la virgule effacée : 3,5 → 35
  const colle = Number(e) * f + Number(d); // 3,5 km → 3 005 m
  return {
    text: phrasesConv(lg(v, de), vers, de, conv(v, de, "m")),
    ...qcmL(r, [efface, colle, r / 10, r * 10, v * 10].filter((x) => x !== r), vers),
    explanation: exp(defConv(de, vers), methodeConv(de, vers), calculConv(v, de, vers), `${lg(v, de)} = ${lg(r, vers)}.`),
    canvas: tableauConv([{ label: lg(v, de), parts: [[v, de]] }], vers),
  };
}

/** ★2 — quelle égalité est vraie ? (avec des décimaux) */
function convEgalite(): Gen {
  const fam = melange([["m", "cm"], ["km", "m"], ["cm", "mm"], ["m", "mm"], ["km", "m"]] as [Un, Un][]);
  const [g, pt] = fam[0];
  const k = decimalPour(g, pt);
  const F = facteur(g, pt);
  const r = conv(k, g, pt);
  const juste = `${fr(k)} ${g} = ${fr(r)} ${pt}`;
  const faux = [`${fr(k)} ${g} = ${fr(net(r / 10))} ${pt}`, `${fr(k)} ${g} = ${fr(net(r * 10))} ${pt}`, `${fr(k)} ${g} = ${fr(Number(String(k).replace(".", "")))} ${pt}`, ...fam.slice(1, 3).map(([g2, p2]) => `${fr(k)} ${g2} = ${fr(net(conv(k, g2, p2) * (Math.random() < 0.5 ? 10 : 0.1)))} ${p2}`)];
  return {
    text: un(["Quelle égalité est vraie ?", "Une seule de ces conversions est juste. Laquelle ?", "Quelle conversion est correcte ?", "Trouve la conversion sans erreur.", "Laquelle de ces égalités est exacte ?"]),
    ...qcm(juste, faux.filter((x) => x !== juste)),
    explanation: exp(`${egalite(g, pt)}.`, "Pour vérifier, on multiplie par le bon nombre (10, 100 ou 1 000) : la virgule se décale vers la droite.", `${fr(k)} × ${fr(F)} = ${fr(r)}.`, `La conversion juste est : ${juste}.`),
    canvas: tableauConv([{ label: lg(k, g), parts: [[k, g]] }], pt),
  };
}

/** ★2 — « 2,45 m » → « 2 m 45 cm » ; « 3,25 km » → « 3 km 250 m ». */
function convDecompose(): Gen {
  const [g, pt] = un([["m", "cm"], ["km", "m"], ["cm", "mm"], ["m", "cm"], ["km", "m"]] as const);
  const F = facteur(g, pt);
  const n = entre(1, 9);
  const b = F === 10 ? entre(1, 9) : F === 100 ? un([entre(11, 99), entre(1, 9), entre(1, 9) * 10]) : un([entre(1, 9) * 100, entre(11, 99) * 10, entre(101, 999), entre(1, 9) * 10]);
  const v = net(n + b / F);
  const juste = `${n} ${g} ${b} ${pt}`;
  const dec = String(v).split(".")[1];
  const faux = [`${n} ${g} ${Number(dec)} ${pt}`, `${n} ${g} ${b * 10} ${pt}`, `${n * 10} ${g} ${b} ${pt}`, `${b} ${g} ${n} ${pt}`, ...(b % 10 === 0 ? [`${n} ${g} ${b / 10} ${pt}`] : [])];
  const [quoi, metier] = un(CTX_CONV[echelle(g, pt)]);
  const p = perso(metier);
  return {
    text: un([
      `Écris ${lg(v, g)} en ${NOM_U[g]} et ${NOM_U[pt]}.`,
      `Complète : ${lg(v, g)} = … ${g} … ${pt}.`,
      `${p.txt} mesure ${quoi} : ${lg(v, g)}. Comment l'écrire en ${g} et ${pt} ?`,
      `${cap(quoi)} mesure ${lg(v, g)}. Combien de ${NOM_U[g]} et de ${NOM_U[pt]} ?`,
      `Décompose ${lg(v, g)} en ${g} et ${pt}.`,
      `${p.txt} lit ${lg(v, g)}. Quelle écriture en ${g} et ${pt} est juste ?`,
    ]),
    ...qcm(juste, faux.filter((s) => s !== juste)),
    explanation: exp(`${egalite(g, pt)}.`, `La partie entière donne les ${NOM_U[g]} ; la partie décimale, convertie en ${NOM_U[pt]}, donne le reste.`, `${lg(v, g)} = ${lg(n, g)} + ${lg(net(b / F), g)} ; ${lg(net(b / F), g)} = ${lg(b, pt)}.`, `${lg(v, g)} = ${juste}.`),
    canvas: tableauConv([{ label: lg(v, g), parts: [[v, g]] }], pt),
  };
}

/** ★3 — vers une unité plus grande : 750 m = 0,75 km ; 36 cm = 0,36 m. */
function convVersDecimal(): Gen {
  const [de, vers] = un([["m", "km"], ["m", "km"], ["cm", "m"], ["cm", "m"], ["mm", "cm"], ["mm", "m"], ["m", "km"]] as const);
  const F = Math.round(1 / facteur(de, vers));
  let v = 0;
  while (v % F === 0)
    v = F === 10 ? un([entre(11, 99), entre(1, 9), entre(101, 499)]) : F === 100 ? un([entre(11, 99), entre(101, 999), entre(1, 9)]) : un([entre(1, 9) * 100, entre(11, 99) * 10, entre(1001, 9999), entre(11, 99), entre(1, 9) * 1000 + entre(1, 9) * 10]);
  const r = net(v / F);
  return {
    text: phrasesConv(lg(v, de), vers, de, conv(v, de, "m")),
    ...qcmL(r, [net(r * 10), net(r / 10), net(r * 100), net(v / (F / 10)), v], vers),
    explanation: exp(defConv(de, vers), methodeConv(de, vers), calculConv(v, de, vers), `${lg(v, de)} = ${lg(r, vers)}.`),
    canvas: tableauConv([{ label: lg(v, de), parts: [[v, de]] }], vers),
  };
}

/** ★3 — « 3 km 250 m » → « 3,25 km » ou « 3 250 m ». */
function convCompose(): Gen {
  const [g, pt] = un([["m", "cm"], ["km", "m"], ["cm", "mm"], ["km", "m"], ["m", "cm"]] as const);
  const F = facteur(g, pt);
  const a = g === "cm" ? entre(2, 40) : entre(1, 12);
  const b = F === 10 ? entre(1, 9) : F === 100 ? un([entre(1, 9), entre(11, 99), entre(11, 99)]) : un([entre(1, 9) * 100, entre(1, 9) * 10, entre(101, 999), entre(11, 99) * 10]);
  const t = `${a} ${g} ${b} ${pt}`;
  const enGrand = Math.random() < 0.5;
  const r = enGrand ? net(a + b / F) : a * F + b;
  const u = enGrand ? g : pt;
  const faux = enGrand ? [Number(`${a}.${b}`), net(a + b / (F * 10)), net(a + b / (F / 10)), net((a * F + b) / 10)] : [Number(`${a}${b}`), a * F * 10 + b, a + b, a * F + b * 10];
  return {
    text: phrasesConv(t, u, g, conv(r, u, "m")),
    ...qcmL(r, faux.filter((x) => net(x) !== r), u),
    explanation: exp(
      `${egalite(g, pt)}.`,
      enGrand ? `On écrit ${lg(b, pt)} en ${NOM_U[g]} (${lg(net(b / F), g)}), puis on ajoute les ${NOM_U[g]}. ⚠️ On ne colle pas les nombres derrière la virgule.` : `On change les ${NOM_U[g]} en ${NOM_U[pt]}, puis on ajoute les ${NOM_U[pt]}. ⚠️ On ne colle pas les nombres.`,
      enGrand ? `${lg(b, pt)} = ${lg(net(b / F), g)} ; ${fr(a)} + ${fr(net(b / F))} = ${fr(r)}.` : `${lg(a, g)} = ${lg(a * F, pt)} ; ${fr(a * F)} + ${fr(b)} = ${fr(r)}.`,
      `${t} = ${lg(r, u)}.`,
    ),
    canvas: tableauConv([{ label: t, parts: [[a, g], [b, pt]] }], u),
  };
}

/** ★3 — les grands écarts d'unités : km → cm, m → mm, hm → dm, avec ou sans virgule. */
function convLarge(): Gen {
  const [de, vers] = un([["km", "cm"], ["m", "mm"], ["km", "dm"], ["hm", "cm"], ["dam", "mm"], ["km", "cm"], ["m", "mm"]] as const);
  const v = Math.random() < 0.5 ? entre(2, 9) : net(entre(1, 9) + entre(1, 9) / 10);
  const r = conv(v, de, vers);
  return {
    text: phrasesConv(lg(v, de), vers, de, conv(v, de, "m")),
    ...qcmL(r, [r * 10, r / 10, r / 100, r * 100, conv(v, de, COL[rang(vers) - 1])], vers),
    explanation: exp(`${defConv(de, vers)} Il y a ${rang(vers) - rang(de)} colonnes de ${de} à ${vers}.`, methodeConv(de, vers), calculConv(v, de, vers), `${lg(v, de)} = ${lg(r, vers)}.`),
    canvas: tableauConv([{ label: lg(v, de), parts: [[v, de]] }], vers),
  };
}

const convertirItems: TutorBankItemV4[] = [
  fixe({
    id: "cm2_longueur_convertir_fixed_1_m_cm",
    microId: "longueur_convertir",
    difficulty: 1,
    text: "Convertis : 3 m = … cm",
    choices: ["300 cm", "30 cm", "3 cm", "3 000 cm"],
    expected: ["300 cm"],
    hint: "1 m = 100 cm.",
    explanation: exp("1 m = 100 cm.", "Pour passer des mètres aux centimètres, on multiplie par 100.", "3 × 100 = 300.", "3 m = 300 cm."),
    tags: ["cm2", "longueur", "convertir", "m_cm", "qcm"],
  }),
  fixe({
    id: "cm2_longueur_convertir_fixed_2_km_m",
    microId: "longueur_convertir",
    difficulty: 1,
    text: "Convertis : 2 km = … m",
    choices: ["2 000 m", "200 m", "20 m", "20 000 m"],
    expected: ["2 000 m"],
    hint: "1 km = 1 000 m.",
    explanation: exp("1 km = 1 000 m.", "Pour passer des kilomètres aux mètres, on multiplie par 1 000.", "2 × 1 000 = 2 000.", "2 km = 2 000 m."),
    tags: ["cm2", "longueur", "convertir", "km_m", "qcm"],
  }),
  fixe({
    id: "cm2_longueur_convertir_fixed_3_cm_m",
    microId: "longueur_convertir",
    difficulty: 2,
    text: "Convertis : 250 cm = … m",
    choices: ["2,5 m", "25 m", "250 m", "0,25 m"],
    expected: ["2,5 m"],
    hint: "100 cm = 1 m.",
    explanation: exp("1 m = 100 cm.", "Pour passer des centimètres aux mètres, on divise par 100.", "250 ÷ 100 = 2,5.", "250 cm = 2,5 m."),
    tags: ["cm2", "longueur", "convertir", "cm_m", "qcm"],
  }),
  fixe({
    id: "cm2_longueur_convertir_fixed_7_tableau_decimal",
    microId: "longueur_convertir",
    difficulty: 2,
    text: "Avec le tableau de conversion : 1,5 m = … cm",
    choices: ["150 cm", "15 cm", "1,5 cm", "1 500 cm"],
    expected: ["150 cm"],
    hint: "1 m = 100 cm, donc 0,5 m = 50 cm.",
    explanation: exp("1 m = 100 cm.", "On place 1 dans la colonne m et 5 dans la colonne dm, puis on complète avec un 0 jusqu'à la colonne cm.", "1,5 × 100 = 150.", "1,5 m = 150 cm."),
    canvas: tableauConv([{ label: "1,5 m", parts: [[1.5, "m"]] }], "cm"),
    tags: ["cm2", "longueur", "convertir", "tableau", "qcm"],
  }),
  CONV("simple", 1, "Place le nombre dans le tableau de conversion.", convSimple),
  CONV("simple_bis", 1, "1 km = 1 000 m ; 1 m = 100 cm ; 1 cm = 10 mm.", convSimple),
  CONV("unite", 1, "Dans une unité plus petite, le nombre est plus grand.", convUnite),
  CONV("decimal", 2, "La virgule se place dans la colonne de l'unité : 3,5 km = 3 500 m.", convDecimal),
  CONV("decimal_bis", 2, "Multiplie par 10, 100 ou 1 000 : la virgule se décale vers la droite.", convDecimal),
  CONV("egalite", 2, "Vérifie la place de la virgule et le nombre de zéros.", convEgalite),
  CONV("decompose", 2, "La partie entière d'un côté, la partie décimale convertie de l'autre.", convDecompose),
  CONV("vers_decimal", 3, "Vers une unité plus grande, on divise : 750 m = 0,75 km.", convVersDecimal),
  CONV("compose", 3, "Convertis, puis ajoute ; ne colle pas les nombres.", convCompose),
  CONV("large", 3, "Compte les colonnes entre les deux unités.", convLarge),
];

/* =========================================================
   LONGUEUR_ESTIMER — l'ordre de grandeur, l'unité adaptée
========================================================= */
const EST = atelier("estimer");

type U4 = "mm" | "cm" | "m" | "km";
type Est = { quoi: string; dessin?: ObjetId; nom?: string; u: U4; v: number; dec?: number };
const E = (quoi: string, u: U4, v: number, dessin?: ObjetId, nom?: string, dec?: number): Est => ({ quoi, u, v, dessin, nom, dec });
const ESTIM: readonly Est[] = [
  E("la longueur d'un livre", "cm", 25, "livre", "le livre"),
  E("la longueur d'une clé", "cm", 6, "cle", "la clé"),
  E("la longueur d'une banane", "cm", 18, "banane", "la banane"),
  E("la hauteur d'une tasse", "cm", 9, "tasse", "la tasse"),
  E("la hauteur d'un verre", "cm", 12, "verre", "le verre"),
  E("la longueur d'une voiture", "m", 4, "voiture", "la voiture", 4.2),
  E("la hauteur d'une maison", "m", 8, "maison", "la maison"),
  E("la hauteur d'un grand arbre", "m", 15, "arbre", "l'arbre"),
  E("la longueur d'un bateau de pêche", "m", 10, "bateau", "le bateau"),
  E("la longueur d'un chat", "cm", 45, "chat", "le chat"),
  E("la longueur d'un poisson rouge", "cm", 8, "poisson", "le poisson"),
  E("la hauteur d'une tulipe", "cm", 40, "fleur", "la tulipe"),
  E("la longueur d'une feuille d'arbre", "cm", 12, "feuille", "la feuille"),
  E("la largeur d'un cartable", "cm", 40, "cartable", "le cartable"),
  E("la largeur d'un ballon de foot", "cm", 22, "ballon", "le ballon"),
  E("la largeur d'un chapeau", "cm", 30, "chapeau", "le chapeau"),
  E("la hauteur d'une pomme", "cm", 8, "pomme", "la pomme"),
  E("la longueur d'un moineau", "cm", 15, "oiseau", "l'oiseau"),
  E("la largeur d'un papillon", "cm", 5, "papillon", "le papillon"),
  E("l'épaisseur d'une pièce de 1 euro", "mm", 2),
  E("la longueur d'une fourmi", "mm", 5),
  E("l'épaisseur d'un cahier", "mm", 8),
  E("la longueur d'un grain de riz", "mm", 6),
  E("l'épaisseur d'un téléphone", "mm", 9),
  E("la distance entre Paris et Lyon", "km", 400),
  E("la longueur d'un marathon", "km", 42, undefined, undefined, 42.2),
  E("la longueur de la Loire", "km", 1000),
  E("la longueur d'une randonnée d'une journée", "km", 15, undefined, undefined, 15.5),
  E("la montée au Piton des Neiges depuis Cilaos", "km", 8),
  E("un trajet en voiture d'une demi-heure", "km", 25),
  E("la longueur d'une piscine", "m", 25),
  E("la hauteur d'une porte", "m", 2, undefined, undefined, 2.1),
  E("la longueur d'un bus", "m", 12, undefined, undefined, 11.5),
  E("la longueur d'une salle de classe", "m", 8, undefined, undefined, 8.5),
  E("la longueur d'un terrain de foot", "m", 100),
  E("la longueur d'un crayon", "cm", 15, undefined, undefined, 15.5),
  E("la longueur d'une règle de classe", "cm", 30),
  E("la longueur d'une fourchette", "cm", 20),
  E("la taille d'un enfant de CM2", "m", 1, undefined, undefined, 1.4),
  E("la longueur d'un lit", "m", 2, undefined, undefined, 1.9),
  E("la hauteur d'une table", "cm", 75, undefined, undefined),
  E("la hauteur de la tour Eiffel", "m", 330),
  E("la longueur d'une girafe, du sol à la tête", "m", 5, undefined, undefined, 5.5),
  E("la longueur d'un pont au-dessus d'un fleuve", "m", 300),
];
const ESTIM_DESSIN = ESTIM.filter((x) => x.dessin);
const ESTIM_DEC = ESTIM.filter((x) => x.dec);
const U4S: readonly U4[] = ["mm", "cm", "m", "km"];
const NOM_U4: Record<U4, string> = { mm: "en millimètres (mm)", cm: "en centimètres (cm)", m: "en mètres (m)", km: "en kilomètres (km)" };
const enCm = (x: { u: U4; v: number }) => x.v * { mm: 0.1, cm: 1, m: 100, km: 100000 }[x.u];
const dessinDe = (x: Est) => (x.dessin ? { canvas: objetsCanvas([{ quoi: x.dessin, label: (x.nom ?? "").replace(/^(le |la |l')/, "") }]) } : {});
const METIERS_EST: readonly Metier[] = [["maîtresse", "maître"], ["architecte", "architecte"], ["menuisière", "menuisier"], ["scientifique", "scientifique"], ["géomètre", "géomètre"], ["couturière", "couturier"], ["urbaniste", "urbaniste"], ["décoratrice", "décorateur"]];
const estUnAuHasard = () => (Math.random() < 0.6 ? un(ESTIM_DESSIN) : un(ESTIM));
/** Un repère connu pour l'unité, dessiné quand c'est possible. */
const repereDe = (x: Est): Pick<Gen, "canvas"> =>
  x.dessin
    ? dessinDe(x)
    : {
        canvas: tableauLongueurs(
          ([["une pièce de 1 euro (épaisseur)", "2 mm", "pièce"], ["une règle de classe", "30 cm", "règle"], ["une porte (hauteur)", "2 m", "porte"], ["un terrain de foot", "100 m", "terrain"], ["une heure de marche", "5 km", "randonnée"]] as const)
            .filter(([, , mot]) => !x.quoi.includes(mot))
            .map(([a, b]) => [a, b] as [string, string]),
          "Repère",
        ),
      };

/** ★1 — l'unité adaptée. */
function estUnite(): Gen {
  const x = estUnAuHasard();
  const p = perso(un(METIERS_EST));
  return {
    text: un([
      `Quelle unité choisir pour mesurer ${x.quoi} ?`,
      `Pour mesurer ${x.quoi}, quelle unité est la mieux adaptée ?`,
      `${p.txt} veut mesurer ${x.quoi}. Quelle unité doit-${p.il} utiliser ?`,
      `En quelle unité exprime-t-on ${x.quoi} ?`,
      `Quelle est la bonne unité pour ${x.quoi} ?`,
    ]),
    ...qcm(NOM_U4[x.u], U4S.map((u) => NOM_U4[u])),
    explanation: exp("On choisit l'unité qui donne un nombre simple, ni minuscule ni énorme.", "mm pour le tout petit, cm pour ce qui tient dans la main, m pour une pièce ou une maison, km pour un trajet.", `${cap(x.quoi)} : environ ${lg(x.v, x.u)}.`, `On mesure ${NOM_U4[x.u]}.`),
    ...repereDe(x),
  };
}

/** ★1 — le même nombre, quatre unités. */
function estValeur(): Gen {
  const x = estUnAuHasard();
  const p = perso(un(METIERS_EST));
  return {
    text: un([`${cap(x.quoi)} est d'environ…`, `Quelle mesure convient pour ${x.quoi} ?`, `Estime ${x.quoi}.`, `${p.txt} estime ${x.quoi}. Que trouve-t-${p.il} ?`, `Quelle est la mesure la plus vraisemblable ${deArt(x.quoi)} ?`]),
    ...qcm(lg(x.v, x.u), U4S.filter((u) => u !== x.u).map((u) => lg(x.v, u))),
    explanation: exp("Estimer, c'est trouver une mesure qui a du sens sans mesurer.", "Le nombre est le même : c'est l'unité qui décide si la mesure est trop petite ou trop grande.", `${cap(x.quoi)} : environ ${lg(x.v, x.u)}.`, `La bonne estimation est ${lg(x.v, x.u)}.`),
    ...repereDe(x),
  };
}

/** ★1 — corriger l'unité d'un camarade. */
function estTrop(): Gen {
  const x = estUnAuHasard();
  const p = perso(un(METIERS_EST));
  const wu = un(U4S.filter((u) => u !== x.u));
  const trop = enCm({ u: wu, v: x.v }) > enCm(x);
  return {
    text: `${p.nom} écrit : « ${cap(x.quoi)} : ${lg(x.v, wu)} ». ${un([`Quelle unité aurait-${p.il} dû écrire ?`, "Corrige son unité.", `Quelle mesure aurait-${p.il} dû écrire ?`, "Quelle est la bonne mesure ?"])}`,
    ...qcm(lg(x.v, x.u), U4S.filter((u) => u !== x.u).map((u) => lg(x.v, u))),
    explanation: exp("Une estimation doit avoir du sens.", `${lg(x.v, wu)}, c'est beaucoup ${trop ? "trop grand" : "trop petit"} pour ${x.quoi}.`, `${cap(x.quoi)} : environ ${lg(x.v, x.u)}.`, `Il fallait écrire ${lg(x.v, x.u)}.`),
    ...repereDe(x),
  };
}

/** ★2 — même unité, le bon ordre de grandeur. */
function estOrdre(): Gen {
  const x = estUnAuHasard();
  const p = perso(un(METIERS_EST));
  const faux = [x.v * 10, x.v * 100, x.v % 10 === 0 ? x.v / 10 : x.v * 1000];
  return {
    text: un([`${cap(x.quoi)} : quelle mesure est la plus proche de la réalité ?`, `Quelle mesure est vraisemblable pour ${x.quoi} ?`, `${p.txt} hésite entre ces mesures pour ${x.quoi}. Laquelle est la bonne ?`, `Choisis la mesure la plus réaliste pour ${x.quoi}.`]),
    ...qcm(lg(x.v, x.u), faux.map((v) => lg(v, x.u))),
    explanation: exp("Estimer, c'est choisir un ordre de grandeur réaliste.", "On compare avec un objet connu : une règle de classe mesure 30 cm, une porte 2 m.", `${cap(x.quoi)} : environ ${lg(x.v, x.u)} ; ${lg(x.v * 10, x.u)} serait dix fois trop.`, `La bonne mesure est ${lg(x.v, x.u)}.`),
    ...repereDe(x),
  };
}

/** ★2 — quel objet mesure environ… ? (quatre objets dessinés) */
function estObjet(): Gen {
  const cible = un(ESTIM_DESSIN);
  const autres: Est[] = [];
  for (const y of melange([...ESTIM_DESSIN])) {
    if (autres.length === 3) break;
    const loin = (a: Est, b: Est) => Math.max(enCm(a), enCm(b)) / Math.min(enCm(a), enCm(b)) >= 3;
    if (y !== cible && loin(y, cible) && autres.every((z) => z.dessin !== y.dessin)) autres.push(y);
  }
  const tous = melange([cible, ...autres]);
  const p = perso(un(METIERS_EST));
  const m = lg(cible.v, cible.u);
  return {
    text: un([`Lequel de ces objets mesure environ ${m} ?`, `${p.txt} a mesuré un de ces objets et trouvé environ ${m}. Lequel ?`, `Quel objet a une taille d'environ ${m} ?`, `Environ ${m} : de quel objet s'agit-il ?`]),
    ...qcm(cible.nom ?? "", autres.map((z) => z.nom ?? "")),
    explanation: exp("Estimer, c'est relier une mesure à un objet réel.", "On imagine chaque objet à côté d'une règle ou d'une porte.", `${cap(cible.quoi)} : environ ${m}.`, `C'est ${cible.nom}.`),
    canvas: objetsCanvas(tous.map((z) => ({ quoi: z.dessin as ObjetId, label: (z.nom ?? "").replace(/^(le |la |l')/, "") }))),
  };
}

/** ★2 — la seule phrase vraisemblable. */
function estIntrus(): Gen {
  const tires = melange([...ESTIM]).slice(0, 4);
  if (!tires.some((x) => x.dessin)) tires[0] = un(ESTIM_DESSIN);
  const [juste, ...reste] = tires;
  const faux = reste.map((x) => `${cap(x.quoi)} : ${lg(x.v, un(U4S.filter((u) => u !== x.u)))}`);
  const dessines = tires.filter((x) => x.dessin);
  return {
    text: un(["Une seule de ces mesures est vraisemblable. Laquelle ?", "Quelle mesure est réaliste ?", "Laquelle de ces phrases est vraie ?", "Trouve la seule mesure qui a du sens."]),
    ...qcm(`${cap(juste.quoi)} : ${lg(juste.v, juste.u)}`, faux),
    explanation: exp("Une mesure a du sens si le nombre ET l'unité correspondent à la vraie taille.", "On vérifie chaque phrase en imaginant l'objet.", `${cap(juste.quoi)} : environ ${lg(juste.v, juste.u)}. Les autres ont la mauvaise unité.`, `La phrase vraisemblable : ${juste.quoi}, ${lg(juste.v, juste.u)}.`),
    ...(dessines.length ? { canvas: objetsCanvas(dessines.map((z) => ({ quoi: z.dessin as ObjetId, label: (z.nom ?? "").replace(/^(le |la |l')/, "") }))) } : {}),
  };
}

/** ★3 — l'estimation écrite dans une autre unité : une porte ≈ 200 cm. */
function estAutreUnite(): Gen {
  const x = un(ESTIM.filter((e) => e.u !== "mm" && e.v < 500));
  const petit: Un = x.u === "km" ? "m" : x.u === "m" ? "cm" : "mm";
  const r = conv(x.v, x.u as Un, petit);
  const p = perso(un(METIERS_EST));
  return {
    text: un([
      `${p.txt} veut écrire ${x.quoi} en ${NOM_U[petit]}. Quelle mesure est vraisemblable ?`,
      `En ${NOM_U[petit]}, ${x.quoi} est d'environ…`,
      `Quelle estimation ${deArt(x.quoi)} en ${petit} est réaliste ?`,
      `${cap(x.quoi)}, en ${NOM_U[petit]} : laquelle de ces mesures convient ?`,
    ]),
    ...qcmL(r, [r * 10, r / 10, r * 100, x.v], petit),
    explanation: exp("Estimer, c'est choisir une mesure réaliste, quelle que soit l'unité.", `On estime d'abord dans l'unité naturelle, puis on convertit (${egalite(x.u as Un, petit)}).`, `${cap(x.quoi)} : environ ${lg(x.v, x.u)} = ${lg(r, petit)}.`, `La bonne estimation est ${lg(r, petit)}.`),
    ...repereDe(x),
  };
}

/** ★3 — l'estimation décimale : une porte ≈ 2,1 m. */
function estDecimal(): Gen {
  const x = un(ESTIM_DEC);
  const d = x.dec as number;
  const p = perso(un(METIERS_EST));
  return {
    text: un([`${cap(x.quoi)} est d'environ…`, `Quelle mesure est la plus vraisemblable pour ${x.quoi} ?`, `${p.txt} estime ${x.quoi}. Quelle mesure peut-${p.il} écrire ?`, `Choisis l'estimation réaliste ${deArt(x.quoi)}.`]),
    ...qcmL(d, [net(d * 10), net(d / 10), net(d * 100)], x.u),
    explanation: exp("Une estimation peut s'écrire avec un nombre décimal.", "On compare avec un repère connu (une porte : 2 m ; une règle : 30 cm) ; un nombre dix fois trop grand ou trop petit n'a pas de sens.", `${cap(x.quoi)} : environ ${lg(d, x.u)}.`, `La bonne estimation est ${lg(d, x.u)}.`),
    ...repereDe(x),
  };
}

/** ★3 — combien de fois environ ? (un objet connu reporté) */
function estCombien(): Gen {
  const paires: readonly (readonly [string, string, number, string, number])[] = [
    ["une règle de 30 cm", "cm", 30, "la longueur d'une table de 1,5 m", 150],
    ["un crayon de 15 cm", "cm", 15, "la largeur d'une porte de 90 cm", 90],
    ["une voiture de 4 m", "m", 4, "une rue de 200 m", 200],
    ["un pas de 50 cm", "cm", 50, "un couloir de 10 m", 1000],
    ["une piscine de 25 m", "m", 25, "une course de 1 km", 1000],
    ["un bus de 12 m", "m", 12, "un quai de 60 m", 60],
    ["un livre de 25 cm", "cm", 25, "une étagère de 2 m", 200],
    ["un pas de 50 cm", "cm", 50, "une cour de 30 m", 3000],
    ["un terrain de foot de 100 m", "m", 100, "une balade de 2 km", 2000],
    ["une feuille de 30 cm", "cm", 30, "un tableau de 3 m", 300],
  ];
  const [unite, , L, total, T] = un(paires);
  const n = Math.round(T / L);
  const p = perso(un(METIERS_EST));
  return {
    text: un([`Combien de fois faut-il reporter ${unite} pour mesurer ${total} ?`, `${p.txt} reporte ${unite} pour mesurer ${total}. Combien de fois environ ?`, `${cap(total)} : combien de fois ${unite} environ ?`]),
    ...qcmL(n, [n * 10, Math.max(1, Math.round(n / 10)), n * 100], "fois"),
    explanation: exp("Estimer une longueur, c'est aussi la comparer à une longueur connue.", "On écrit les deux longueurs dans la même unité, puis on cherche combien de fois l'une rentre dans l'autre.", `${fr(T)} ÷ ${fr(L)} = ${fr(n)} (dans la même unité).`, `Environ ${n} fois.`),
    canvas: barre([...Array.from({ length: Math.min(n, 6) }, () => ({ label: unite.replace(/^une? /, "") })), ...(n > 6 ? [{ label: "…", unknown: true }] : [])], total.replace(/^(la |une |un |le )/, "")),
  };
}

const estimerItems: TutorBankItemV4[] = [
  fixe({
    id: "cm2_longueur_estimer_fixed_1_crayon",
    microId: "longueur_estimer",
    difficulty: 1,
    text: "Quelle unité convient le mieux pour mesurer la longueur d'un crayon ?",
    choices: ["cm", "km", "m", "mm"],
    expected: ["cm"],
    hint: "Un crayon tient dans la main.",
    explanation: exp("On choisit une unité adaptée à la taille de l'objet.", "Un crayon tient dans la main : on le mesure en centimètres.", "Un crayon mesure environ 15 cm.", "L'unité qui convient est le centimètre."),
    tags: ["cm2", "longueur", "estimer", "unite", "qcm"],
  }),
  fixe({
    id: "cm2_longueur_estimer_fixed_2_trajet",
    microId: "longueur_estimer",
    difficulty: 1,
    text: "Quelle unité convient le mieux pour mesurer la distance entre deux villes ?",
    choices: ["km", "cm", "mm", "m"],
    expected: ["km"],
    hint: "Entre deux villes, la distance est grande.",
    explanation: exp("On choisit une unité adaptée à la longueur mesurée.", "Entre deux villes, il y a plusieurs kilomètres.", "Exemple : environ 25 km.", "L'unité qui convient est le kilomètre."),
    tags: ["cm2", "longueur", "estimer", "unite", "qcm"],
  }),
  EST("unite", 1, "Pense à la vraie taille : dans la main (cm), une pièce (m), un trajet (km).", estUnite),
  EST("valeur", 1, "Le nombre ne change pas : c'est l'unité qui compte.", estValeur),
  EST("trop", 1, "Imagine l'objet à côté d'une règle.", estTrop),
  EST("ordre", 2, "Compare avec une règle (30 cm) ou une porte (2 m).", estOrdre),
  EST("objet", 2, "Imagine chaque objet à côté d'une règle.", estObjet),
  EST("intrus", 2, "Vérifie le nombre ET l'unité.", estIntrus),
  EST("autre_unite", 3, "Estime dans l'unité naturelle, puis convertis.", estAutreUnite),
  EST("decimal", 3, "Un nombre dix fois trop grand ou trop petit n'a pas de sens.", estDecimal),
  EST("combien", 3, "Même unité, puis cherche combien de fois.", estCombien),
];

/* =========================================================
   LONGUEUR_DEFI — problèmes à étapes : convertir avant de calculer
========================================================= */
const DEFI = atelier("defi");

const BUTS = ["aller à l'école", "rejoindre la plage", "livrer un colis", "arriver au refuge", "finir sa course", "atteindre le phare", "arriver à la ferme", "rentrer à la maison", "rejoindre le stade", "arriver au marché", "atteindre le sommet", "rejoindre le camping"];

/** ★4 — a,b km puis c m : distance totale, en m ou en km. */
function defiAjout(): Gen {
  const [act, metier] = un(TRAJETS);
  const p = perso(metier);
  const km = net(entre(1, 8) + un([0, entre(1, 9) / 10, entre(1, 9) / 10, entre(11, 99) / 100]));
  const m = un([entre(1, 9) * 100, entre(11, 19) * 100, entre(1, 9) * 50, entre(1, 9) * 10 + 200]);
  const total = conv(km, "km", "m") + m;
  const enKm = Math.random() < 0.45;
  const ordre = un([["le matin", "l'après-midi"], ["d'abord", "ensuite"], ["à l'aller", "au retour"], ["avant la pause", "après la pause"]]);
  const intro = un([`${p.txt} ${act} ${lg(km, "km")} ${ordre[0]}, puis ${lg(m, "m")} ${ordre[1]}.`, `${ordre[0] === "d'abord" ? "D'abord" : cap(ordre[0])}, ${p.nom} ${act} ${lg(km, "km")} ; ${ordre[1]}, ${lg(m, "m")}.`, `${p.txt} ${act} ${lg(km, "km")}, puis encore ${lg(m, "m")}.`]);
  const q = enKm
    ? un([`Quelle distance a-t-${p.il} parcourue en tout, en kilomètres ?`, `Combien de kilomètres a-t-${p.il} faits en tout ?`, "Quelle est la longueur totale du trajet, en km ?"])
    : un([`Quelle distance a-t-${p.il} parcourue en tout, en mètres ?`, `Combien de mètres a-t-${p.il} faits en tout ?`, "Quelle est la longueur totale du trajet, en mètres ?"]);
  const r = enKm ? net(total / 1000) : total;
  const faux = enKm ? [net(km + m), net(km + m / 100), net(total / 100), net(km + m / 10000)] : [net(km + m), net(km * 100 + m), net(km * 10000 + m), net(km * 1000 + m * 10)];
  return {
    text: `${intro} ${q}`,
    ...qcmL(r, faux, enKm ? "km" : "m"),
    explanation: exp("On n'additionne que des longueurs écrites dans la même unité.", "1 km = 1 000 m : on convertit, puis on additionne.", `${lg(km, "km")} = ${lg(conv(km, "km", "m"), "m")} ; ${fr(conv(km, "km", "m"))} + ${fr(m)} = ${fr(total)}${enKm ? ` ; ${lg(total, "m")} = ${lg(r, "km")}` : ""}.`, `${cap(p.il)} a parcouru ${lg(r, enKm ? "km" : "m")}.`),
    canvas: barre([{ label: `${ordre[0]} : ${lg(km, "km")}` }, { label: `${ordre[1]} : ${lg(m, "m")}` }], enKm ? "? km" : "? m"),
  };
}

const RESTES: readonly (readonly [string, Metier])[] = [
  ["un rouleau de ruban", ["couturière", "couturier"]],
  ["une corde", ["marin", "marin"]],
  ["un tuyau", ["plombière", "plombier"]],
  ["un câble", ["électricienne", "électricien"]],
  ["un rouleau de papier peint", ["décoratrice", "décorateur"]],
  ["une planche", ["menuisière", "menuisier"]],
  ["une guirlande", ["décoratrice", "décorateur"]],
  ["un rouleau de tissu", ["couturière", "couturier"]],
  ["une ficelle", ["fleuriste", "fleuriste"]],
  ["un fil électrique", ["électricienne", "électricien"]],
  ["une bande de cuir", ["maroquinière", "maroquinier"]],
  ["un rouleau de grillage", ["éleveuse", "éleveur"]],
];
/** ★4 — M,m m ; on coupe deux morceaux en cm : il reste ? cm. */
function defiReste(): Gen {
  const [o, metier] = un(RESTES);
  const p = perso(metier);
  const M = net(entre(2, 6) + un([0, 0.5, entre(1, 9) / 10, 0.25, 0.75]));
  const tot = Math.round(M * 100);
  const c1 = un([entre(3, 9) * 10, entre(11, 99), entre(101, 180)]);
  const c2 = un([entre(2, 9) * 5, entre(21, 95)]);
  const reste = tot - c1 - c2;
  const deux = reste > 0 && Math.random() < 0.6;
  const r = deux ? reste : tot - c1;
  const intro = deux
    ? un([`${p.txt} a ${o} de ${lg(M, "m")}. ${sujet(p)} en coupe un morceau de ${c1} cm, puis un autre de ${c2} cm.`, `${cap(o)} mesure ${lg(M, "m")}. ${p.nom} y coupe ${c1} cm, puis ${c2} cm.`])
    : un([`${p.txt} a ${o} de ${lg(M, "m")}. ${sujet(p)} en coupe ${c1} cm.`, `${cap(o)} mesure ${lg(M, "m")}. ${p.nom} en coupe un morceau de ${c1} cm.`, `${p.txt} coupe ${c1} cm dans ${o} de ${lg(M, "m")}.`]);
  const q = un(["Quelle longueur reste-t-il, en centimètres ?", "Combien de centimètres reste-t-il ?", "Que reste-t-il, en cm ?", "Quelle est la longueur du morceau restant, en centimètres ?"]);
  return {
    text: `${intro} ${q}`,
    ...qcmL(r, [tot + c1, Math.round(M * 10) - c1, r + 100, r - 10, deux ? tot - c1 : r + c1, Math.floor(M) * 100 + Math.round((M % 1) * 10) - c1 - (deux ? c2 : 0)], "cm"),
    explanation: exp("On ne soustrait que des longueurs écrites dans la même unité.", "1 m = 100 cm : on convertit, puis on enlève ce qui est coupé.", `${lg(M, "m")} = ${lg(tot, "cm")} ; ${fr(tot)} − ${c1}${deux ? ` − ${c2}` : ""} = ${fr(r)}.`, `Il reste ${lg(r, "cm")}.`),
    canvas: barre([{ label: `coupé : ${c1} cm` }, ...(deux ? [{ label: `coupé : ${c2} cm` }] : []), { label: "reste : ?", unknown: true }], lg(M, "m")),
  };
}

const PISTES: readonly (readonly [string, number[], Metier])[] = [
  ["d'une piste d'athlétisme", [400], ["athlète", "athlète"]],
  ["d'un stade", [300, 350, 400], ["entraîneuse", "entraîneur"]],
  ["d'un parc", [500, 600, 700, 750, 800], ["coureuse", "coureur"]],
  ["d'un lac", [800, 900, 1200, 1500], ["randonneuse", "randonneur"]],
  ["de la cour de l'école", [150, 200, 250], ["maîtresse", "maître"]],
  ["d'un circuit de karting", [600, 700, 800, 900], ["pilote", "pilote"]],
  ["d'un hippodrome", [1200, 1500, 1800], ["jockey", "jockey"]],
  ["d'un vélodrome", [250, 400], ["cycliste", "cycliste"]],
  ["d'une piste de roller", [200, 250, 300], ["animatrice", "animateur"]],
  ["d'un îlot en kayak", [1500, 2000, 2500], ["kayakiste", "kayakiste"]],
];
/** ★4 — n tours de X m : en km (décimal) ou en m. */
function defiTours(): Gen {
  const [piste, longueurs, metier] = un(PISTES);
  const p = perso(metier);
  const X = un(longueurs);
  let n = entre(3, 12);
  while (n * X < 1000) n++;
  const T = n * X;
  const intro = un([`${p.txt} fait ${n} tours ${piste}. Un tour mesure ${lg(X, "m")}.`, `Un tour ${piste} fait ${lg(X, "m")}. ${p.txt} en fait ${n}.`, `${p.txt} s'entraîne : ${n} tours ${piste} de ${lg(X, "m")} chacun.`]);
  const enKm = Math.random() < 0.6;
  const r = enKm ? net(T / 1000) : T;
  return {
    text: `${intro} ${enKm ? un([`Quelle distance parcourt-${p.il}, en kilomètres ?`, "Écris la distance totale en km.", `Combien de kilomètres fait-${p.il} en tout ?`]) : un([`Quelle distance parcourt-${p.il} en tout, en mètres ?`, "Combien de mètres en tout ?", `Combien de mètres fait-${p.il} ?`])}`,
    ...qcmL(r, enKm ? [net(T / 100), net(T / 10000), net((n - 1) * X / 1000), net((n + X) / 1000)] : [n + X, T * 10, T / 10, (n - 1) * X, T + X], enKm ? "km" : "m"),
    explanation: exp("Un tour se répète : c'est une multiplication.", `On multiplie la longueur d'un tour par ${n}${enKm ? ", puis on convertit en km (1 km = 1 000 m)" : ""}.`, `${n} × ${fr(X)} = ${fr(T)}${enKm ? ` ; ${lg(T, "m")} = ${lg(r, "km")}` : ""}.`, `${cap(p.il)} parcourt ${lg(r, enKm ? "km" : "m")}.`),
    canvas: barre(Array.from({ length: Math.min(n, 8) }, () => ({ label: `${fr(X)} m` })), `${n} tours : ?`),
  };
}

/** ★4 — M,m m coupés en n morceaux égaux : chaque morceau en cm. */
function defiMorceaux(): Gen {
  const [o, metier] = un(RESTES);
  const p = perso(metier);
  let tot = 0;
  let n = 0;
  for (let k = 0; k < 80; k++) {
    tot = entre(15, 95) * 10 + un([0, 0, 50]);
    n = un([3, 4, 5, 6, 8, 12]);
    if (tot % n === 0 && tot % 100 !== 0) break;
  }
  if (tot % n !== 0 || tot % 100 === 0) [tot, n] = [450, 6];
  const M = net(tot / 100);
  const r = tot / n;
  const intro = un([`${p.txt} coupe ${o} de ${lg(M, "m")} en ${n} morceaux de même longueur.`, `${cap(o)} mesure ${lg(M, "m")}. ${p.nom} ${estF(o) ? "la" : "le"} partage en ${n} morceaux égaux.`, `${p.txt} partage ${o} de ${lg(M, "m")} en ${n} parts égales.`]);
  const q = un(["Combien mesure chaque morceau, en centimètres ?", "Quelle est la longueur d'un morceau, en cm ?", "Combien de centimètres mesure un morceau ?"]);
  return {
    text: `${intro} ${q}`,
    ...qcmL(r, [net((tot / 10) / n), tot * n, tot - n, net((tot * 10) / n), r + 10, Math.round(M) * 100 / n].filter((x) => entier(x)), "cm"),
    explanation: exp("Partager en morceaux égaux, c'est diviser.", "1 m = 100 cm : on convertit d'abord, puis on divise.", `${lg(M, "m")} = ${lg(tot, "cm")} ; ${fr(tot)} ÷ ${n} = ${fr(r)}.`, `Chaque morceau mesure ${lg(r, "cm")}.`),
    canvas: barre(Array.from({ length: n }, () => ({ label: "?" })), lg(M, "m")),
  };
}

const ASSEZ: readonly (readonly [string, string, Metier])[] = [
  ["ruban", "emballer des cadeaux", ["vendeuse", "vendeur"]],
  ["ficelle", "attacher des bouquets", ["fleuriste", "fleuriste"]],
  ["tissu", "coudre des écharpes", ["couturière", "couturier"]],
  ["corde", "faire des cordes à sauter", ["animatrice", "animateur"]],
  ["fil électrique", "brancher des lampes", ["électricienne", "électricien"]],
  ["galon", "border des coussins", ["couturière", "couturier"]],
  ["guirlande", "décorer des fenêtres", ["décoratrice", "décorateur"]],
  ["laine", "tricoter des bracelets", ["tricoteuse", "tricoteur"]],
  ["baguette de bois", "faire des cadres", ["encadreuse", "encadreur"]],
  ["tuyau", "arroser des jardinières", ["jardinière", "jardinier"]],
];
/** ★4 — est-ce assez ? (M,m m pour n morceaux de c cm) */
function defiAssez(): Gen {
  const [fil, but, metier] = un(ASSEZ);
  const p = perso(metier);
  const M = net(entre(2, 7) + un([0, 0.5, entre(1, 9) / 10]));
  const n = entre(3, 8);
  const c = un([45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 120, 150]);
  const besoin = n * c;
  const dispo = Math.round(M * 100);
  const phrase = (d: number) => (d === 0 ? "oui, c'est juste assez" : d > 0 ? `oui, il en reste ${lg(d, "cm")}` : `non, il en manque ${lg(-d, "cm")}`);
  const d = dispo - besoin;
  const faux = [phrase(Math.round(M * 10) - besoin), phrase(dispo - c), phrase(-d === 0 ? 10 : -d), phrase(dispo - besoin - c)];
  return {
    text: `${p.txt} a ${lg(M, "m")} de ${fil}. ${sujet(p)} veut ${but} : il faut ${n} morceaux de ${c} cm. ${un(["A-t-il assez ?", "Est-ce assez ?", "Y en a-t-il assez ?"]).replace("A-t-il", `A-t-${p.il}`)}`,
    ...qcm(phrase(d), faux.filter((s) => s !== phrase(d))),
    explanation: exp("On compare ce qu'il faut et ce qu'on a, dans la même unité.", `On calcule le besoin (${n} × ${c} cm), et on écrit ${lg(M, "m")} en centimètres.`, `${n} × ${c} = ${besoin} cm ; ${lg(M, "m")} = ${dispo} cm ; ${dispo} − ${besoin} = ${d}.`, `Réponse : ${phrase(d)}.`),
    canvas: barre(Array.from({ length: n }, () => ({ label: `${c} cm` })), `${lg(M, "m")} de ${fil}`),
  };
}

const CHEMINS = ["par la forêt", "par la plage", "par le pont", "par le village", "par la rivière", "par le marché", "par la colline", "par le parc", "par le port", "par les champs"];
/** ★5 — deux chemins en deux étapes, unités mêlées et décimaux : lequel est le plus court ? */
function defiChemins(): Gen {
  const [c1, c2] = melange([...CHEMINS]).slice(0, 2);
  const p = perso(un([["factrice", "facteur"], ["randonneuse", "randonneur"], ["promeneuse de chiens", "promeneur de chiens"], ["guide", "guide"], ["infirmière", "infirmier"], ["livreuse", "livreur"]] as Metier[]));
  const a1 = net(entre(1, 3) + entre(1, 9) / 10);
  const a2 = entre(1, 9) * 100 + un([0, 50]);
  const T1 = Math.round(a1 * 1000) + a2;
  const r = Math.random();
  const T2 = r < 0.15 ? T1 : T1 + un([-300, -200, -150, -100, 100, 150, 200, 300]);
  const b2 = un([0.4, 0.5, 0.8, 1, 1.2, 1.5].filter((x) => x * 1000 <= T2 - 200));
  const b1 = T2 - Math.round(b2 * 1000);
  const plusCourt = Math.random() < 0.6;
  const tA = `${lg(a1, "km")} puis ${lg(a2, "m")}`;
  const tB = `${lg(b1, "m")} puis ${lg(b2, "km")}`;
  const intro = `Pour ${un(BUTS)}, ${p.txt} peut passer ${c1} (${tA}) ou ${c2} (${tB}).`;
  const q = plusCourt ? un(["Quel chemin est le plus court ?", `Quel chemin doit-${p.il} prendre pour marcher le moins ?`, "Quel chemin fait marcher le moins ?"]) : un(["Quel chemin est le plus long ?", "Quel chemin fait marcher le plus ?", `Par où marchera-t-${p.il} le plus ?`]);
  const egal = T1 === T2;
  const juste = egal ? "les deux chemins ont la même longueur" : plusCourt === T1 < T2 ? `le chemin ${c1}` : `le chemin ${c2}`;
  return {
    text: `${intro} ${q}`,
    ...qcm(juste, [`le chemin ${c1}`, `le chemin ${c2}`, "les deux chemins ont la même longueur"]),
    explanation: exp("On calcule la longueur de chaque chemin, dans la même unité.", "1 km = 1 000 m : on écrit tout en mètres, puis on additionne les étapes.", `${c1} : ${fr(Math.round(a1 * 1000))} + ${fr(a2)} = ${lg(T1, "m")} ; ${c2} : ${fr(b1)} + ${fr(Math.round(b2 * 1000))} = ${lg(T2, "m")}.`, egal ? "Les deux chemins ont la même longueur." : `Réponse : ${juste}.`),
    canvas: tableauLongueurs([[c1, tA], [c2, tB]], "Chemin"),
  };
}

/** ★5 — trois étapes en unités mêlées : la distance totale en km. */
function defiEtapes(): Gen {
  const [act, metier] = un(TRAJETS.filter(([v]) => v !== "nage"));
  const p = perso(metier);
  const s1 = net(entre(1, 6) + entre(1, 9) / 10);
  const s2 = entre(2, 9) * 100 + un([0, 50]);
  const s3a = entre(1, 4);
  const s3b = entre(1, 9) * 100 + un([0, 50]);
  const T = Math.round(s1 * 1000) + s2 + s3a * 1000 + s3b;
  const r = net(T / 1000);
  const intro = un([
    `${p.txt} ${act} ${lg(s1, "km")}, puis ${lg(s2, "m")}, puis ${s3a} km ${s3b} m.`,
    `Le parcours ${dN(p.nom)} a trois étapes : ${lg(s1, "km")}, ${lg(s2, "m")} et ${s3a} km ${s3b} m.`,
    `En trois étapes, ${p.nom} ${act} ${lg(s1, "km")}, ${lg(s2, "m")}, puis ${s3a} km ${s3b} m.`,
  ]);
  const q = un(["Quelle distance totale, en kilomètres ?", `Combien de kilomètres a-t-${p.il} parcourus en tout ?`, "Écris la longueur du parcours en km."]);
  return {
    text: `${intro} ${q}`,
    ...qcmL(r, [net(s1 + s2 + s3a + s3b), net((Math.round(s1 * 1000) + s3a * 1000 + s3b) / 1000), net(T / 100), net(s1 + s3a + (s2 + s3b) / 100), net(r + 1)], "km"),
    explanation: exp("Une distance totale, c'est la somme des étapes, toutes écrites dans la même unité.", "On écrit tout en mètres (1 km = 1 000 m), on additionne, puis on revient en km.", `${fr(Math.round(s1 * 1000))} + ${fr(s2)} + ${fr(s3a * 1000 + s3b)} = ${fr(T)} m = ${lg(r, "km")}.`, `Le parcours mesure ${lg(r, "km")}.`),
    canvas: barre([{ label: lg(s1, "km") }, { label: lg(s2, "m") }, { label: `${s3a} km ${s3b} m` }], "? km"),
  };
}

const LIEUX_AR: readonly (readonly [string, Metier])[] = [
  ["l'école", ["élève", "élève"]],
  ["la boulangerie", ["boulangère", "boulanger"]],
  ["le stade", ["footballeuse", "footballeur"]],
  ["la piscine", ["nageuse", "nageur"]],
  ["son travail", ["infirmière", "infirmier"]],
  ["la bibliothèque", ["bibliothécaire", "bibliothécaire"]],
  ["le centre équestre", ["cavalière", "cavalier"]],
  ["le marché", ["maraîchère", "maraîcher"]],
  ["la caserne", ["pompière", "pompier"]],
  ["le port", ["pêcheuse", "pêcheur"]],
];
/** ★5 — aller-retour, plusieurs jours : en km. */
function defiAllerRetour(): Gen {
  const [lieu, metier] = un(LIEUX_AR);
  const p = perso(metier);
  const d = un([entre(3, 9) * 100, entre(11, 25) * 50, entre(1, 3) * 1000 + entre(1, 9) * 100]);
  const j = un([2, 4, 5, 6, 10]);
  const T = d * 2 * j;
  const r = net(T / 1000);
  const td = d >= 1000 && Math.random() < 0.5 ? lg(net(d / 1000), "km") : lg(d, "m");
  const intro = un([`${p.txt} habite à ${td} de ${lieu}. ${sujet(p)} fait l'aller-retour une fois par jour, pendant ${j} jours.`, `Chaque jour, ${p.nom} fait l'aller et le retour entre chez ${p.f ? "elle" : "lui"} et ${lieu}, soit ${td} dans chaque sens. ${sujet(p)} le fait ${j} jours.`, `De chez ${p.nom} à ${lieu}, il y a ${td}. En ${j} jours, ${p.il} y va et revient chaque jour.`]);
  const q = un(["Combien de kilomètres parcourt-il en tout ?".replace("-il", `-${p.il}`), "Quelle distance totale, en km ?", "Écris la distance parcourue en kilomètres."]);
  return {
    text: `${intro} ${q}`,
    ...qcmL(r, [net((d * j) / 1000), net((d * 2) / 1000), net(T / 100), net(T / 10000), net((d * 2 * (j - 1)) / 1000)], "km"),
    explanation: exp("Un aller-retour, c'est deux fois la distance.", `On calcule un aller-retour, on le multiplie par ${j} jours, puis on convertit (1 km = 1 000 m).`, `${fr(d)} × 2 = ${fr(2 * d)} m ; ${fr(2 * d)} × ${j} = ${fr(T)} m = ${lg(r, "km")}.`, `${cap(p.il)} parcourt ${lg(r, "km")}.`),
    canvas: barre([{ label: `aller : ${td}` }, { label: `retour : ${td}` }], `× ${j} jours : ? km`),
  };
}

const FILES: readonly (readonly [string, string, number[], number[], Metier])[] = [
  ["voitures", "garées en file", [3.8, 4, 4.2, 4.5], [0.5, 1], ["policière", "policier"]],
  ["bus", "alignés au dépôt", [12, 11.5], [1.5, 2], ["conductrice de bus", "conducteur de bus"]],
  ["wagons", "accrochés", [14.5, 16, 20], [0.5, 1], ["cheminote", "cheminot"]],
  ["bateaux", "amarrés le long du quai", [6.5, 8, 9.5], [1.5, 2, 2.5], ["capitaine", "capitaine"]],
  ["chars", "en file pour le défilé", [7.5, 8, 9], [2, 2.5, 3], ["animatrice", "animateur"]],
  ["camions", "en file au péage", [12, 15, 16.5], [2, 3], ["camionneuse", "camionneur"]],
  ["tables", "pour le repas de fête, avec un espace", [1.8, 2, 2.5], [0.5, 1], ["traiteuse", "traiteur"]],
];
/** ★5 — n objets de L m en file, e m entre deux : longueur de la file. */
function defiFile(): Gen {
  const [quoi, ou, Ls, es, metier] = un(FILES);
  const p = perso(metier);
  const L = un(Ls);
  const e = un(es);
  const n = entre(4, 12);
  const T = net(n * L + (n - 1) * e);
  const fem = quoi === "voitures" || quoi === "tables";
  const intro = un([`${n} ${quoi} de ${lg(L, "m")} sont ${ou}, avec ${lg(e, "m")} entre deux.`, `${p.txt} compte ${n} ${quoi} ${ou} : chacun${fem ? "e" : ""} mesure ${lg(L, "m")}, et il y a ${lg(e, "m")} entre deux.`]);
  const q = un(["Quelle est la longueur de la file, du début à la fin ?", "Combien de mètres mesure la file en tout ?", "Quelle longueur occupe la file, en mètres ?"]);
  return {
    text: `${intro} ${q}`,
    ...qcmL(T, [net(n * (L + e)), net(n * L), net(n * L + (n - 2) * e), net(n * L + (n - 1) * e * 10)], "m"),
    explanation: exp("Entre n objets en file, il y a n − 1 espaces.", `On calcule la longueur des ${quoi}, puis celle des espaces, et on ajoute.`, `${n} × ${fr(L)} = ${fr(net(n * L))} ; ${n - 1} × ${fr(e)} = ${fr(net((n - 1) * e))} ; ${fr(net(n * L))} + ${fr(net((n - 1) * e))} = ${fr(T)}.`, `La file mesure ${lg(T, "m")}.`),
    canvas: barre(
      Array.from({ length: Math.min(n, 4) * 2 - 1 }, (_, i): { label: string; unknown?: boolean } => ({ label: i % 2 ? `${fr(e)} m` : `${fr(L)} m` })).concat(n > 4 ? [{ label: "…", unknown: true }] : []),
      `${n} ${quoi} : ? m`,
    ),
  };
}

const defiItems: TutorBankItemV4[] = [
  fixe({
    id: "cm2_longueur_defi_fixed_1_trajet_reunion",
    microId: "longueur_defi",
    difficulty: 4,
    text: "Une randonnée fait 3 km le matin et 1 500 m l'après-midi. Quelle est la distance totale en mètres ?",
    choices: ["4 500 m", "1 503 m", "3 500 m", "4 000 m"],
    expected: ["4 500 m"],
    hint: "Convertis 3 km en mètres.",
    explanation: exp("On additionne des longueurs écrites dans la même unité.", "1 km = 1 000 m : on convertit 3 km en mètres.", "3 km = 3 000 m ; 3 000 + 1 500 = 4 500.", "La distance totale est 4 500 m."),
    canvas: barre([{ label: "matin : 3 km" }, { label: "après-midi : 1 500 m" }], "? m"),
    tags: ["cm2", "longueur", "defi", "km_m", "qcm"],
  }),
  DEFI("ajout", 4, "Convertis les km en m avant d'additionner.", defiAjout),
  DEFI("reste", 4, "Convertis les m en cm avant de soustraire.", defiReste),
  DEFI("tours", 4, "Un tour, n fois : multiplie, puis convertis.", defiTours),
  DEFI("morceaux", 4, "Convertis en cm, puis divise.", defiMorceaux),
  DEFI("assez", 4, "Calcule ce qu'il faut, convertis ce qu'on a, compare.", defiAssez),
  DEFI("chemins", 5, "Calcule chaque chemin en mètres.", defiChemins),
  DEFI("etapes", 5, "Tout en mètres, additionne, puis reviens en km.", defiEtapes),
  DEFI("aller_retour", 5, "Un aller-retour = deux fois la distance.", defiAllerRetour),
  DEFI("file", 5, "n objets en file : n − 1 espaces.", defiFile),
];

export const longueursBank: TutorBankItemV4[] = [...comparerItems, ...convertirItems, ...estimerItems, ...defiItems];
