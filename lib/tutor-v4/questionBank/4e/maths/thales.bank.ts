import type {
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
  ThalesCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * ⭐ LES NOMMAGES DE LA CONFIGURATION DE THALÈS, ajoutés le 30/08/2026.
 *
 * ⛔ Les trois gabarits de `thales_configuration` ne fabriquaient que deux
 * énoncés chacun, parce qu'ils écrivaient toujours « le triangle ABC, M sur
 * [AB], N sur [AC] ». Ce n'est pas qu'un problème de compteur : un élève qui ne
 * voit jamais que ces lettres-là retient une IMAGE au lieu d'une configuration,
 * et se bloque dès qu'un exercice nomme les points autrement.
 *
 * ⚠️ `A` est toujours le SOMMET commun aux deux droites sécantes — c'est la
 * géométrie du canvas, seuls les noms changent. Pas de I ni de O, qui se
 * confondent avec 1 et 0.
 */
const NOMS_THALES: { A: string; B: string; C: string; M: string; N: string }[] = [
  { A: "A", B: "B", C: "C", M: "M", N: "N" },
  { A: "S", B: "T", C: "U", M: "E", N: "F" },
  { A: "R", B: "P", C: "Q", M: "K", N: "L" },
  { A: "D", B: "G", C: "H", M: "V", N: "W" },
  { A: "F", B: "J", C: "L", M: "P", N: "R" },
  { A: "E", B: "X", C: "Y", M: "G", N: "H" },
  // 03/10/2026 : neuf nommages de plus (voir « DES QUESTIONS REVIENNENT »).
  { A: "K", B: "L", C: "J", M: "R", N: "S" },
  { A: "T", B: "R", C: "S", M: "U", N: "V" },
  { A: "P", B: "Q", C: "R", M: "E", N: "F" },
  { A: "G", B: "H", C: "J", M: "K", N: "L" },
  { A: "U", B: "V", C: "W", M: "X", N: "Y" },
  { A: "D", B: "E", C: "F", M: "G", N: "H" },
  { A: "J", B: "K", C: "L", M: "P", N: "Q" },
  { A: "H", B: "R", C: "S", M: "T", N: "U" },
  { A: "Z", B: "E", C: "F", M: "G", N: "H" },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function thalesCanvas(
  params: Omit<ThalesCanvasData, "kind" | "variant">
): ThalesCanvasData {
  return {
    kind: "thales",
    variant: "triangle",
    ...params,
  };
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/* ===========================================================================
   ⛔⛔ 03/10/2026 — « DES QUESTIONS REVIENNENT SOUVENT ».
   Mesuré avant (scripts/mesurer-squelettes-coach.ts 4e thales_theoreme) : 6 à
   23 squelettes d'énoncé par micro, 9 à 19 répétitions sur une série de 20.
   Les gabarits ne changeaient que les nombres : « AM = #, AB = #… Calculer AC »
   revenait mot pour mot. Chaque générateur compose maintenant :
     · un NOMMAGE (NOMS_THALES, quinze jeux de lettres — A reste le sommet commun) ;
     · une SITUATION (SUPPORTS : charpente, voile, rampe, étagère, escabeau,
       portique, pont en treillis, tente, chevalet, tremplin, jardin, panneau,
       maquette, séchoir, pignon de case créole — un seul contexte réunionnais —,
       figure au tableau, cerf-volant, pyramide en carton), ou aucune ;
     · une RÉDACTION de l'hypothèse (quatre façons d'écrire la configuration) ;
     · une TOURNURE de la question (3 à 5 par gabarit) ;
     · des LONGUEURS entières ou décimales, tirées dans une famille qui va avec
       l'objet (cm pour une étagère, m pour une charpente).
   ⚠️ Toujours la configuration « triangle » du fichier : pas de papillon (question
   posée à Frédéric, sans réponse). Le canvas reçoit les noms des points
   (`labels`) et n'affiche plus la formule AM/AB = AN/AC écrite avec les lettres
   par défaut — elle contredirait les noms tirés, et donnerait la réponse.
   Les objets réels (ombres, escabeau, voile…) n'ont pas de canvas : la figure
   du composant est toujours tracée sommet commun en bas à gauche, ce qui ne
   ressemble ni à un escabeau ni à une ombre.
=========================================================================== */

type Noms = { A: string; B: string; C: string; M: string; N: string };
type Seg = "AM" | "AB" | "AN" | "AC" | "MN" | "BC";
/** petit : une figure, une maquette (cm) ; moyen : une étagère, un panneau (cm) ;
 *  meuble : un escabeau, une tente (cm, jusqu'à 1,80 m) ; grand : une charpente (m). */
type Famille = "petit" | "moyen" | "meuble" | "grand";

/** 2.5 → « 2,5 ». Deux décimales au plus. */
const fr = (x: number) => String(Math.round(x * 100) / 100).replace(".", ",");
const r2 = (x: number) => Math.round(x * 100) / 100;
const auDixieme = (x: number) => Math.abs(x * 10 - Math.round(x * 10)) < 1e-6;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « le sol » → « du sol », « la bôme » → « de la bôme », « une latte » → « d'une latte ». */
function de(gn: string): string {
  if (gn.startsWith("le ")) return "du " + gn.slice(3);
  if (gn.startsWith("les ")) return "des " + gn.slice(4);
  if (gn.startsWith("un ") || gn.startsWith("une ")) return "d'" + gn;
  return "de " + gn;
}
/** « le sol » → « au sol », « la base » → « à la base ». */
function a(gn: string): string {
  if (gn.startsWith("le ")) return "au " + gn.slice(3);
  if (gn.startsWith("les ")) return "aux " + gn.slice(4);
  return "à " + gn;
}
/** Réécrit un nom de segment ou de triangle avec les lettres tirées : L(n, "AM") → « SE ». */
const L = (n: Noms, s: string) =>
  s
    .split("")
    .map((c) => (n as Record<string, string>)[c] ?? c)
    .join("");
const liste = (xs: string[]) =>
  xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} et ${xs[xs.length - 1]}`;
const expl = (def: string, meth: string, calc: string, concl: string) =>
  `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;
const DEF_THALES =
  "si, dans un triangle, une droite coupe deux côtés et est parallèle au troisième, les longueurs des deux triangles sont proportionnelles (théorème de Thalès).";
const DEF_RECIPROQUE =
  "si les points sont alignés dans le même ordre et si les rapports sont égaux, alors les droites sont parallèles (réciproque du théorème de Thalès).";

function figure(
  n: Noms,
  sides: Partial<Record<Seg, string>> = {},
  parallele = true,
): ThalesCanvasData {
  return thalesCanvas({
    labels: { A: n.A, B: n.B, C: n.C, M: n.M, N: n.N },
    sideLabels: sides,
    display: {
      showPoints: true,
      showLabels: true,
      showSideLabels: Object.keys(sides).length > 0,
      showParallelMarks: parallele,
      highlightParallel: parallele,
      showFormula: false,
    },
  });
}

// ⭐ LES SITUATIONS où l'on « repère » le triangle. La famille donne l'unité et
// l'ordre de grandeur des longueurs (une étagère ne fait pas 12 m).
const SUPPORTS: { intro: string; f: Famille }[] = [
  { intro: "Sur le schéma d'une charpente de toit", f: "grand" },
  { intro: "Sur le schéma d'une voile de bateau", f: "grand" },
  { intro: "Sur le plan d'une rampe d'accès", f: "grand" },
  { intro: "Sur le schéma d'une console d'étagère", f: "moyen" },
  { intro: "Sur le schéma d'un escabeau ouvert", f: "meuble" },
  { intro: "Sur le schéma du portique d'une balançoire", f: "grand" },
  { intro: "Sur le plan d'un pont en treillis", f: "grand" },
  { intro: "Sur le schéma de l'entrée d'une tente", f: "meuble" },
  { intro: "Sur le croquis d'un chevalet de peintre", f: "meuble" },
  { intro: "Sur le plan d'un tremplin de skate", f: "meuble" },
  { intro: "Sur le plan d'un jardin triangulaire", f: "grand" },
  { intro: "Sur le schéma d'un panneau de signalisation", f: "moyen" },
  { intro: "Sur la maquette d'un toit de chalet", f: "petit" },
  { intro: "Sur le schéma d'un séchoir à linge", f: "meuble" },
  { intro: "Sur le schéma du pignon d'une case créole", f: "grand" },
  { intro: "Sur une figure tracée au tableau", f: "petit" },
  { intro: "Sur le dessin d'un cerf-volant", f: "petit" },
  { intro: "Sur une face d'une pyramide en carton", f: "petit" },
];

/** Une situation, ou aucune (une fois sur quatre) : la figure nue reste un exercice. */
function tireSupport(): { intro: string | null; f: Famille } {
  if (Math.random() < 0.25) return { intro: null, f: randomChoice<Famille>(["petit", "moyen"]) };
  return randomChoice(SUPPORTS);
}

/** Quatre façons d'écrire l'hypothèse de Thalès. */
function hyp(n: Noms, style: number): string {
  const AB = L(n, "AB"), AC = L(n, "AC"), MN = L(n, "MN"), BC = L(n, "BC");
  switch (style % 4) {
    case 0:
      return `${n.M} est sur [${AB}], ${n.N} est sur [${AC}] et (${MN}) est parallèle à (${BC})`;
    case 1:
      return `${n.M} ∈ [${AB}], ${n.N} ∈ [${AC}] et (${MN}) // (${BC})`;
    case 2:
      return `les points ${n.M} et ${n.N} sont placés sur [${AB}] et [${AC}], et (${MN}) est parallèle à (${BC})`;
    default:
      return `la droite (${MN}), parallèle à (${BC}), coupe [${AB}] en ${n.M} et [${AC}] en ${n.N}`;
  }
}

/** La configuration complète, avec ou sans situation. */
function cadre(n: Noms, intro: string | null, style = randomInt(0, 3)): string {
  const tri = L(n, "ABC");
  return intro
    ? `${intro}, on repère le triangle ${tri} : ${hyp(n, style)}.`
    : `Dans le triangle ${tri}, ${hyp(n, style)}.`;
}

/** La configuration SANS le parallélisme (pour la réciproque). */
function cadreSansPara(n: Noms, intro: string | null, style = randomInt(0, 3)): string {
  const tri = L(n, "ABC"), AB = L(n, "AB"), AC = L(n, "AC");
  const pos = [
    `${n.M} est sur [${AB}] et ${n.N} est sur [${AC}]`,
    `${n.M} ∈ [${AB}] et ${n.N} ∈ [${AC}]`,
    `les points ${n.A}, ${n.M}, ${n.B} sont alignés dans cet ordre, ainsi que ${n.A}, ${n.N}, ${n.C}`,
    `${n.M} appartient au segment [${AB}] et ${n.N} au segment [${AC}]`,
  ][style % 4];
  return intro
    ? `${intro}, on repère le triangle ${tri} : ${pos}.`
    : `Dans le triangle ${tri}, ${pos}.`;
}

const BASES: Record<Famille, { u: string; v: number[] }> = {
  petit: { u: "cm", v: [2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8] },
  moyen: { u: "cm", v: [8, 10, 12, 14, 15, 16, 18, 20, 24, 25, 30] },
  meuble: { u: "cm", v: [20, 24, 25, 30, 32, 35, 36, 40, 45, 48, 50, 60] },
  grand: { u: "m", v: [0.6, 0.8, 1, 1.2, 1.5, 1.8, 2, 2.4, 2.5, 3, 4] },
};

type Longueurs = { k: number; u: string; v: Record<Seg, number> };

/**
 * Les petites longueurs AM, AN, MN (trois valeurs distinctes qui forment un
 * vrai triangle), les grandes = petites × k, toutes au dixième près.
 * `simple` : coefficient entier et longueurs entières (étoiles 2 et 3).
 * Pour les objets en mètres, le coefficient reste petit (pas de voile de 20 m).
 */
function tireLongueurs(f: Famille, simple: boolean): Longueurs {
  const b = BASES[f];
  const vs = simple ? b.v.filter((x) => Number.isInteger(x)) : b.v;
  const borne = f === "grand" || f === "meuble";
  const ks = simple
    ? borne ? [2, 3] : [2, 3, 4]
    : borne ? [1.5, 2, 2.5, 3] : [1.5, 2, 2.5, 3, 4, 5];
  for (let essai = 0; essai < 300; essai++) {
    const k = randomChoice(ks);
    const am = randomChoice(vs), an = randomChoice(vs), mn = randomChoice(vs);
    if (am === an || am === mn || an === mn) continue;
    if (mn >= am + an || mn <= Math.abs(am - an)) continue;
    const ab = r2(am * k), ac = r2(an * k), bc = r2(mn * k);
    if (![ab, ac, bc].every(auDixieme)) continue;
    return { k, u: b.u, v: { AM: am, AB: ab, AN: an, AC: ac, MN: mn, BC: bc } };
  }
  return { k: 2, u: b.u, v: { AM: 3, AB: 6, AN: 4, AC: 8, MN: 5, BC: 10 } };
}

const RAPPORTS: [Seg, Seg][] = [
  ["AM", "AB"],
  ["AN", "AC"],
  ["MN", "BC"],
];
const PETITS: Seg[] = ["AM", "AN", "MN"];

/** « AM = 3 cm, AB = 9 cm et AN = 4 cm », dans l'une de quatre phrases. */
function donnees(n: Noms, lg: Longueurs, segs: Seg[]): string {
  const xs = segs.map((s) => `${L(n, s)} = ${fr(lg.v[s])} ${lg.u}`);
  return randomChoice([
    `On donne ${liste(xs)}.`,
    `On sait que ${liste(xs)}.`,
    `Les mesures sont : ${liste(xs)}.`,
    `On a mesuré ${liste(xs)}.`,
  ]);
}

/**
 * Tout ce qu'il faut pour calculer `cible` : les trois longueurs connues,
 * l'égalité de rapports écrite avec les lettres puis avec les nombres, et le
 * calcul (produit en croix).
 */
function resoudre(n: Noms, lg: Longueurs, cible: Seg, autre?: number) {
  const i = RAPPORTS.findIndex((r) => r.includes(cible));
  const j = autre ?? randomChoice([0, 1, 2].filter((x) => x !== i));
  const [ni, di] = RAPPORTS[i], [nj, dj] = RAPPORTS[j];
  // cible = f0 × f1 ÷ f2
  const f: [Seg, Seg, Seg] = cible === ni ? [di, nj, dj] : [ni, dj, nj];
  const v = lg.v;
  const connus: Seg[] = [cible === ni ? di : ni, nj, dj];
  const egalite = `${L(n, ni)}/${L(n, di)} = ${L(n, nj)}/${L(n, dj)}`;
  const w = (s: Seg) => (s === cible ? L(n, s) : fr(v[s]));
  const avecNombres = `${w(ni)}/${w(di)} = ${w(nj)}/${w(dj)}`;
  const calcul = `${L(n, cible)} = ${fr(v[f[0]])} × ${fr(v[f[1]])} ÷ ${fr(v[f[2]])} = ${fr(v[cible])} ${lg.u}`;
  const inverse = r2((v[f[0]] * v[f[2]]) / v[f[1]]);
  // L'erreur additive : « on ajoute la même différence » au lieu de multiplier.
  const additif = PETITS.includes(cible)
    ? r2(v[f[0]] - (v[f[2]] - v[f[1]]))
    : r2(v[f[1]] + (v[f[0]] - v[f[2]]));
  return { connus, egalite, avecNombres, calcul, valeur: v[cible], inverse, additif };
}

const CHAINE = (n: Noms) =>
  `${L(n, "AM")}/${L(n, "AB")} = ${L(n, "AN")}/${L(n, "AC")} = ${L(n, "MN")}/${L(n, "BC")}`;

/** Trois leurres distincts, positifs, différents de la bonne longueur. */
function choixLongueur(valeur: number, pieges: number[], u: string) {
  const bons = Array.from(
    new Set([...pieges, r2(valeur + 1), r2(valeur * 2), r2(valeur + 2)].map(r2)),
  ).filter((x) => x > 0 && x !== valeur);
  return makeChoices(
    `${fr(valeur)} ${u}`,
    bons.map((x) => `${fr(x)} ${u}`),
  );
}

function questionLongueur(T: string, u: string): string {
  return randomChoice([
    `Calcule ${T}.`,
    `Quelle est la longueur ${T} ?`,
    `Combien mesure ${T} ?`,
    `Détermine la longueur ${T}, en ${u}.`,
    `Donne la valeur de ${T}.`,
  ]);
}

/* ---------------------------------------------------------------------------
   THALES_CONFIGURATION
--------------------------------------------------------------------------- */

/** ★1 — reconnaître les éléments de la configuration. */
function genConfigElements(): TutorGeneratedQuestionV4 {
  const n = randomChoice(NOMS_THALES);
  const s = tireSupport();
  const tri = L(n, "ABC"), petit = L(n, "AMN");
  const AB = L(n, "AB"), AC = L(n, "AC"), MN = L(n, "MN"), BC = L(n, "BC");
  const genres = [
    {
      q: randomChoice([
        `Quel est le sommet commun aux triangles ${petit} et ${tri} ?`,
        `Quel point est un sommet à la fois du triangle ${petit} et du triangle ${tri} ?`,
      ]),
      bon: n.A,
      pieges: [n.B, n.C, n.M, n.N],
      pourquoi: `les triangles ${petit} et ${tri} partagent le sommet ${n.A}, d'où partent [${AB}] et [${AC}].`,
    },
    {
      q: randomChoice([
        `Quelle droite est parallèle à (${BC}) ?`,
        `À quelle droite la droite (${BC}) est-elle parallèle ?`,
      ]),
      bon: `(${MN})`,
      pieges: [`(${AB})`, `(${AC})`, `(${L(n, "MC")})`, `(${L(n, "NB")})`],
      pourquoi: `l'énoncé dit que (${MN}) est parallèle à (${BC}).`,
    },
    {
      q: randomChoice([
        `Sur quel côté du triangle ${tri} se trouve le point ${n.M} ?`,
        `À quel segment le point ${n.M} appartient-il ?`,
      ]),
      bon: `[${AB}]`,
      pieges: [`[${AC}]`, `[${BC}]`, `[${MN}]`],
      pourquoi: `${n.M} est placé sur le côté [${AB}], issu du sommet ${n.A}.`,
    },
    {
      q: randomChoice([
        `Quel est le petit triangle de cette configuration ?`,
        `Quel triangle est une réduction du triangle ${tri} ?`,
      ]),
      bon: petit,
      pieges: [L(n, "MBC"), L(n, "BMN"), L(n, "ABN"), L(n, "MNC")],
      pourquoi: `le triangle ${petit} a le sommet ${n.A} en commun avec ${tri}, et son côté [${MN}] est parallèle à [${BC}] : c'est une réduction de ${tri}.`,
    },
    {
      q: randomChoice([
        `Dans le triangle ${petit}, quel côté correspond au côté [${BC}] du triangle ${tri} ?`,
        `Quel côté du petit triangle ${petit} est associé à [${BC}] ?`,
      ]),
      bon: `[${MN}]`,
      pieges: [`[${L(n, "AM")}]`, `[${L(n, "AN")}]`, `[${L(n, "MB")}]`],
      pourquoi: `[${MN}] et [${BC}] sont les deux côtés parallèles : ils se correspondent.`,
    },
  ];
  const g = randomChoice(genres);
  return {
    text: `${cadre(n, s.intro)} ${g.q}`,
    format: "qcm",
    choices: makeChoices(g.bon, g.pieges),
    expected: [g.bon],
    comparator: "mcq_exact",
    explanation: expl(
      "une configuration de Thalès, c'est un triangle coupé par une droite parallèle à l'un de ses côtés.",
      `on repère le sommet commun ${n.A}, les points ${n.M} et ${n.N} sur les côtés issus de ${n.A}, et les deux droites parallèles.`,
      `ici, ${g.pourquoi}`,
      `la réponse est ${g.bon}.`,
    ),
    canvas: figure(n),
  };
}

const QUESTIONS_APPLIQUER = [
  "Peut-on utiliser le théorème de Thalès ?",
  "Est-on dans une configuration de Thalès ?",
  "Peut-on appliquer directement le théorème de Thalès ?",
  "Le théorème de Thalès s'applique-t-il ici ?",
];

/** ★2 — parallélisme donné ou non. */
function genConfigOuiNon(): TutorGeneratedQuestionV4 {
  const parallel = randomChoice([true, false]);
  const n = randomChoice(NOMS_THALES);
  const s = tireSupport();
  const tri = L(n, "ABC"), AB = L(n, "AB"), AC = L(n, "AC"), MN = L(n, "MN"), BC = L(n, "BC");
  const manque = randomChoice([
    `mais on ne sait pas si (${MN}) est parallèle à (${BC})`,
    `mais rien n'indique que (${MN}) est parallèle à (${BC})`,
    `mais l'énoncé ne dit rien de la position de (${MN}) par rapport à (${BC})`,
  ]);
  const debut = s.intro ? `${s.intro}, on repère le triangle ${tri} : ` : `Dans le triangle ${tri}, `;
  const text = parallel
    ? `${cadre(n, s.intro)} ${randomChoice(QUESTIONS_APPLIQUER)}`
    : `${debut}${n.M} est sur [${AB}] et ${n.N} est sur [${AC}], ${manque}. ${randomChoice(QUESTIONS_APPLIQUER)}`;
  return {
    text,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [parallel ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(
      "le théorème de Thalès demande un triangle et une droite PARALLÈLE à l'un de ses côtés.",
      `on vérifie les trois conditions : ${n.M} sur [${AB}], ${n.N} sur [${AC}], (${MN}) // (${BC}).`,
      parallel
        ? "les trois conditions sont données par l'énoncé."
        : `le parallélisme de (${MN}) et (${BC}) n'est pas donné : il manque une condition.`,
      parallel
        ? "oui, on est dans une configuration de Thalès."
        : "non, on ne peut pas utiliser le théorème de Thalès directement.",
    ),
    canvas: figure(n, {}, parallel),
  };
}

/** ★2 — codé sur la figure, ou seulement « à l'air » parallèle. */
function genConfigCodage(): TutorGeneratedQuestionV4 {
  const parallel = randomChoice([true, false]);
  const n = randomChoice(NOMS_THALES);
  const s = tireSupport();
  const tri = L(n, "ABC"), AB = L(n, "AB"), AC = L(n, "AC"), MN = L(n, "MN"), BC = L(n, "BC");
  const debut = s.intro ? `${s.intro}, dans le triangle ${tri}` : `Dans le triangle ${tri}`;
  const pos = `${n.M} est sur [${AB}] et ${n.N} est sur [${AC}]`;
  const phrase = parallel
    ? randomChoice([
        `${debut}, ${pos} ; la droite (${MN}) est codée parallèle à (${BC}).`,
        `${debut}, ${pos}, et le codage indique que (${MN}) // (${BC}).`,
      ])
    : randomChoice([
        `${debut}, ${pos} ; (${MN}) semble parallèle à (${BC}) sur le dessin, mais aucun codage ne l'indique.`,
        `${debut}, ${pos} ; aucune droite n'est codée parallèle à un côté.`,
        `${debut}, ${pos} ; à l'œil, (${MN}) a l'air parallèle à (${BC}), sans aucun codage.`,
      ]);
  return {
    text: `${phrase} ${randomChoice(QUESTIONS_APPLIQUER)}`,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [parallel ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(
      "Thalès demande une droite parallèle à un côté du triangle, donnée par l'énoncé ou par un codage.",
      "on ne se fie jamais à l'allure du dessin : on cherche un codage ou une phrase de l'énoncé.",
      parallel
        ? `le parallélisme de (${MN}) et (${BC}) est codé.`
        : `rien ne prouve que (${MN}) est parallèle à (${BC}).`,
      parallel
        ? "oui, c'est une configuration de Thalès."
        : "non, ce n'est pas (encore) une configuration de Thalès.",
    ),
    canvas: figure(n, {}, parallel),
  };
}

/** ★2 — les points sont-ils bien placés ? (pas de canvas : la figure les placerait toujours bien) */
function genConfigPosition(): TutorGeneratedQuestionV4 {
  const n = randomChoice(NOMS_THALES);
  const s = tireSupport();
  const tri = L(n, "ABC"), AB = L(n, "AB"), AC = L(n, "AC"), MN = L(n, "MN"), BC = L(n, "BC");
  const debut = s.intro ? `${s.intro}, on repère le triangle ${tri} : ` : `Dans le triangle ${tri}, `;
  const cas = randomChoice(["ok", "ok", "surBC", "perp", "coupe"] as const);
  const phrase =
    cas === "ok"
      ? cadre(n, s.intro)
      : cas === "surBC"
        ? `${debut}${n.M} est sur [${AB}] et ${n.N} est sur [${BC}] (et non sur [${AC}]).`
        : cas === "perp"
          ? `${debut}${n.M} est sur [${AB}], ${n.N} est sur [${AC}], et (${MN}) est perpendiculaire à (${BC}).`
          : `${debut}${n.M} est sur [${AB}], ${n.N} est sur [${AC}], et la droite (${MN}) coupe la droite (${BC}).`;
  const ok = cas === "ok";
  const raison =
    cas === "ok"
      ? `${n.M} et ${n.N} sont sur les côtés issus de ${n.A} et (${MN}) // (${BC})`
      : cas === "surBC"
        ? `${n.N} n'est pas sur un côté issu du sommet ${n.A}`
        : cas === "perp"
          ? `(${MN}) est perpendiculaire à (${BC}), pas parallèle`
          : `deux droites qui se coupent ne sont pas parallèles`;
  return {
    text: `${phrase} ${randomChoice(QUESTIONS_APPLIQUER)}`,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [ok ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(
      "les deux points doivent être sur deux côtés issus du même sommet, et la droite qui les joint parallèle au troisième côté.",
      "on vérifie la position des points, puis le parallélisme.",
      `ici, ${raison}.`,
      ok ? "oui." : "non.",
    ),
  };
}

/* ---------------------------------------------------------------------------
   THALES_RAPPORT
--------------------------------------------------------------------------- */

/** ★2 — compléter une égalité de rapports. */
function genRapportCompleter(): TutorGeneratedQuestionV4 {
  const n = randomChoice(NOMS_THALES);
  const s = tireSupport();
  const i = randomInt(0, 2);
  const j = randomChoice([0, 1, 2].filter((x) => x !== i));
  const [ni, di] = RAPPORTS[i], [nj, dj] = RAPPORTS[j];
  const r = (x: string, y: string) => `${L(n, x)} / ${L(n, y)}`;
  const gauche = r(ni, di);
  const bon = r(nj, dj);
  // ⚠️ Jamais le TROISIÈME rapport de la chaîne parmi les leurres : il est juste aussi.
  const extra: Record<Seg, string> = { AM: "MB", AN: "NC", MN: "AB", AB: "AM", AC: "AN", BC: "MN" };
  const pieges = [r(dj, nj), r(nj, di), r(ni, nj), r(nj, extra[nj])];
  const q = randomChoice([
    `Complète : ${gauche} = …`,
    `À quel rapport ${gauche} est-il égal ?`,
    `Quel rapport est égal à ${gauche} ?`,
    `On écrit ${gauche} = … Quel rapport faut-il mettre ?`,
  ]);
  return {
    text: `${cadre(n, s.intro)} ${q}`,
    format: "qcm",
    choices: makeChoices(bon, pieges),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: expl(
      DEF_THALES,
      "on met chaque petite longueur sur la grande longueur qui lui correspond.",
      `${CHAINE(n)}, donc ${gauche} = ${bon}.`,
      `${gauche} = ${bon}.`,
    ),
    canvas: figure(n),
  };
}

/** ★2 — quelle égalité est juste (lettres seulement) ? */
function genRapportEgalite(): TutorGeneratedQuestionV4 {
  const n = randomChoice(NOMS_THALES);
  const s = tireSupport();
  const [i, j] = randomChoice([[0, 1], [0, 2], [1, 2]] as const);
  const [ni, di] = RAPPORTS[i], [nj, dj] = RAPPORTS[j];
  const r = (x: string, y: string) => `${L(n, x)} / ${L(n, y)}`;
  const bon = `${r(ni, di)} = ${r(nj, dj)}`;
  const extra: Record<string, string> = { AM: "MB", AN: "NC", MN: "AB" };
  const pieges = [
    `${r(di, ni)} = ${r(nj, dj)}`,
    `${r(ni, dj)} = ${r(nj, di)}`,
    `${r(ni, extra[ni])} = ${r(nj, dj)}`,
    `${r(ni, di)} = ${r(dj, nj)}`,
  ];
  const q = randomChoice([
    "Quelle égalité de rapports est correcte ?",
    "Quelle égalité donne le théorème de Thalès ?",
    "Parmi ces égalités, laquelle est juste ?",
    "Quelle égalité peut-on écrire ?",
  ]);
  return {
    text: `${cadre(n, s.intro)} ${q}`,
    format: "qcm",
    choices: makeChoices(bon, pieges),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: expl(
      DEF_THALES,
      "chaque rapport met une longueur du petit triangle sur la longueur correspondante du grand.",
      `${CHAINE(n)}.`,
      `l'égalité correcte est ${bon}.`,
    ),
    canvas: figure(n),
  };
}

/** ★3 — l'égalité de Thalès écrite avec des nombres. */
function genRapportNombres(simple: boolean): TutorGeneratedQuestionV4 {
  const n = randomChoice(NOMS_THALES);
  const s = tireSupport();
  const lg = tireLongueurs(s.f, simple);
  const [i, j] = simple ? [0, 1] : randomChoice([[0, 1], [0, 2], [1, 2]] as const);
  const [ni, di] = RAPPORTS[i], [nj, dj] = RAPPORTS[j];
  const [a1, b1, c1, d1] = [ni, di, nj, dj].map((x) => fr(lg.v[x]));
  const bon = `${a1}/${b1} = ${c1}/${d1}`;
  // ⛔ Pas « a/c = b/d » : c'est le produit en croix de Thalès, une égalité VRAIE.
  const pieges = [`${b1}/${a1} = ${c1}/${d1}`, `${a1}/${d1} = ${c1}/${b1}`, `${a1}/${b1} = ${d1}/${c1}`];
  const q = randomChoice([
    "Quelle égalité traduit le théorème de Thalès ?",
    "Quelle égalité de rapports est correcte ?",
    "Quelle égalité peut-on écrire avec ces longueurs ?",
    "Quelle comparaison correspond au théorème de Thalès ?",
  ]);
  const sides: Partial<Record<Seg, string>> = {};
  for (const x of [ni, di, nj, dj]) sides[x] = `${fr(lg.v[x])} ${lg.u}`;
  return {
    text: `${cadre(n, s.intro)} ${donnees(n, lg, [ni, di, nj, dj])} ${q}`,
    format: "qcm",
    choices: makeChoices(bon, pieges),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: expl(
      DEF_THALES,
      `on écrit ${L(n, ni)}/${L(n, di)} = ${L(n, nj)}/${L(n, dj)}, petite longueur sur grande longueur correspondante.`,
      `${L(n, ni)} = ${a1}, ${L(n, di)} = ${b1}, ${L(n, nj)} = ${c1} et ${L(n, dj)} = ${d1}.`,
      `l'égalité est ${bon}.`,
    ),
    canvas: figure(n, sides),
  };
}

/** ★3 — l'intrus : l'égalité qui n'est PAS celle de Thalès. */
function genRapportIntrus(): TutorGeneratedQuestionV4 {
  const n = randomChoice(NOMS_THALES);
  const s = tireSupport();
  const r = (x: string, y: string) => `${L(n, x)} / ${L(n, y)}`;
  const vraies = [
    `${r("AM", "AB")} = ${r("AN", "AC")}`,
    `${r("AM", "AB")} = ${r("MN", "BC")}`,
    `${r("AN", "AC")} = ${r("MN", "BC")}`,
    `${r("AB", "AM")} = ${r("AC", "AN")}`,
    `${r("BC", "MN")} = ${r("AB", "AM")}`,
  ];
  const fausses = [
    { e: `${r("AB", "AM")} = ${r("AN", "AC")}`, pourquoi: "un rapport est « grand sur petit », l'autre « petit sur grand »" },
    { e: `${r("AM", "AB")} = ${r("AC", "AN")}`, pourquoi: "le second rapport est renversé" },
    { e: `${r("AM", "AC")} = ${r("AN", "AB")}`, pourquoi: "les longueurs ne sont pas associées demi-droite par demi-droite" },
    { e: `${r("AM", "MB")} = ${r("AN", "AC")}`, pourquoi: `${L(n, "MB")} n'est pas un côté du grand triangle` },
    { e: `${r("MN", "BC")} = ${r("AB", "AM")}`, pourquoi: "le second rapport est renversé" },
  ];
  const intrus = randomChoice(fausses);
  const q = randomChoice([
    "Quelle égalité de rapports n'est PAS correcte ?",
    "Laquelle de ces égalités est fausse ?",
    "Une seule égalité est fausse. Laquelle ?",
    "Quelle égalité ne découle PAS du théorème de Thalès ?",
  ]);
  return {
    text: `${cadre(n, s.intro)} ${q}`,
    format: "qcm",
    choices: makeChoices(intrus.e, vraies),
    expected: [intrus.e],
    comparator: "mcq_exact",
    explanation: expl(
      DEF_THALES,
      `on part de ${CHAINE(n)} ; on peut aussi renverser TOUS les rapports à la fois.`,
      `dans ${intrus.e}, ${intrus.pourquoi}.`,
      `l'égalité fausse est ${intrus.e}.`,
    ),
    canvas: figure(n),
  };
}

/* ---------------------------------------------------------------------------
   THALES_CALCULER_LONGUEUR
--------------------------------------------------------------------------- */

function genCalcul(
  cibles: Seg[],
  simple: boolean,
  qcm = false,
): TutorGeneratedQuestionV4 {
  const n = randomChoice(NOMS_THALES);
  const s = tireSupport();
  const lg = tireLongueurs(s.f, simple);
  const cible = randomChoice(cibles);
  const r = resoudre(n, lg, cible);
  const T = L(n, cible);
  const sides: Partial<Record<Seg, string>> = { [cible]: "?" };
  for (const x of r.connus) sides[x] = `${fr(lg.v[x])} ${lg.u}`;
  const text = `${cadre(n, s.intro)} ${donnees(n, lg, r.connus)} ${questionLongueur(T, lg.u)}`;
  const explanation = expl(
    DEF_THALES,
    `dans le triangle ${L(n, "ABC")}, (${L(n, "MN")}) // (${L(n, "BC")}), donc ${CHAINE(n)}. On garde ${r.egalite}.`,
    `${r.avecNombres}, donc ${r.calcul}.`,
    `${T} = ${fr(r.valeur)} ${lg.u}.`,
  );
  if (qcm) {
    return {
      text,
      format: "qcm",
      choices: choixLongueur(r.valeur, [r.inverse, r.additif], lg.u),
      expected: [`${fr(r.valeur)} ${lg.u}`],
      comparator: "mcq_exact",
      explanation,
      canvas: figure(n, sides),
    };
  }
  return {
    text,
    format: "short",
    // ⚠️ 08/10/2026 : l'unité dans la réponse, et plus de « 2.4 » à point anglais.
    expected: [`${fr(r.valeur)} ${lg.u}`],
    comparator: "number_equal",
    explanation,
    canvas: figure(n, sides),
  };
}

/* ---------------------------------------------------------------------------
   THALES_RECIPROQUE_VERIFIER
--------------------------------------------------------------------------- */

/** ★2 — quels rapports comparer, ou calculer un rapport. */
function genRecipRapports(): TutorGeneratedQuestionV4 {
  const n = randomChoice(NOMS_THALES);
  const s = tireSupport();
  const AM = L(n, "AM"), AB = L(n, "AB"), AN = L(n, "AN"), AC = L(n, "AC"), MN = L(n, "MN"), BC = L(n, "BC");
  if (Math.random() < 0.5) {
    const bon = `${AM}/${AB} et ${AN}/${AC}`;
    const q = randomChoice([
      "Quels rapports faut-il comparer ?",
      "Quels quotients compare-t-on avec la réciproque du théorème de Thalès ?",
      "Quelle paire de rapports doit-on comparer ?",
    ]);
    return {
      text: `${cadreSansPara(n, s.intro)} On veut savoir si (${MN}) est parallèle à (${BC}). ${q}`,
      format: "qcm",
      choices: makeChoices(bon, [
        `${AM}/${AB} et ${AC}/${AN}`,
        `${AM}/${AC} et ${AN}/${AB}`,
        `${AM}/${L(n, "MB")} et ${AN}/${AC}`,
        `${AB}/${MN} et ${AC}/${BC}`,
      ]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: expl(
        DEF_RECIPROQUE,
        "on compare les rapports des longueurs prises sur chacune des deux demi-droites issues du sommet commun.",
        `sur [${AB}] : ${AM}/${AB} ; sur [${AC}] : ${AN}/${AC}.`,
        `on compare ${bon}.`,
      ),
      canvas: figure(n, {}, false),
    };
  }
  const f = s.f;
  const u = BASES[f].u;
  let am = 0, ab = 0, rapport = 0;
  for (let essai = 0; essai < 100; essai++) {
    const k = randomChoice([2, 4, 5, 2.5]);
    am = randomChoice(BASES[f].v);
    ab = r2(am * k);
    rapport = r2(1 / k);
    if (auDixieme(ab)) break;
  }
  if (!auDixieme(ab)) { am = 2; ab = 4; rapport = 0.5; }
  const q = randomChoice([
    `Calcule le rapport ${AM}/${AB}, en écriture décimale.`,
    `Donne la valeur décimale du quotient ${AM}/${AB}.`,
    `Que vaut ${AM}/${AB} ? Donne un nombre décimal.`,
  ]);
  return {
    text: `${cadreSansPara(n, s.intro)} On a ${AM} = ${fr(am)} ${u} et ${AB} = ${fr(ab)} ${u}. ${q}`,
    format: "short",
    expected: [fr(rapport)],
    comparator: "number_equal",
    explanation: expl(
      DEF_RECIPROQUE,
      "on divise la petite longueur par la grande, dans la même unité.",
      `${AM}/${AB} = ${fr(am)} ÷ ${fr(ab)} = ${fr(rapport)}.`,
      `${AM}/${AB} = ${fr(rapport)}.`,
    ),
    canvas: figure(n, { AM: `${fr(am)} ${u}`, AB: `${fr(ab)} ${u}` }, false),
  };
}

/** Pas d'écart pour le cas « presque égal » : un cran de la famille. */
const PAS: Record<Famille, number[]> = { petit: [0.5, 1], moyen: [1, 2], meuble: [1, 2], grand: [0.1, 0.2] };

/**
 * Les quatre longueurs AM, AB, AN, AC, avec AC décalé d'un cran quand les
 * rapports ne doivent PAS être égaux.
 */
function longueursReciproque(f: Famille, simple: boolean, egal: boolean) {
  const lg = tireLongueurs(f, simple);
  const vrai = lg.v.AC;
  if (!egal) {
    // En mode simple, l'écart reste entier (pas de « 7,9 m » à l'étoile 3).
    const d = randomChoice(simple ? [1, 2] : PAS[f]) * randomChoice([1, -1]);
    let ac = r2(vrai + d);
    if (ac <= lg.v.AN) ac = r2(vrai + Math.abs(d));
    lg.v.AC = ac;
  }
  return { lg, vrai };
}

const QUESTIONS_EGALITE = (n: Noms) => {
  const AM = L(n, "AM"), AB = L(n, "AB"), AN = L(n, "AN"), AC = L(n, "AC");
  return [
    `Les rapports ${AM}/${AB} et ${AN}/${AC} sont-ils égaux ?`,
    `A-t-on ${AM}/${AB} = ${AN}/${AC} ?`,
    `Les quotients ${AM}/${AB} et ${AN}/${AC} sont-ils égaux ?`,
    `Ces longueurs vérifient-elles ${AM}/${AB} = ${AN}/${AC} ?`,
  ];
};

/** ★3/★4 — les rapports sont-ils égaux ? Explication par le coefficient ou le produit en croix. */
function genRecipVerifier(simple: boolean, methode: "coef" | "croix"): TutorGeneratedQuestionV4 {
  const egal = randomChoice([true, false]);
  const n = randomChoice(NOMS_THALES);
  const s = tireSupport();
  const { lg, vrai } = longueursReciproque(s.f, simple, egal);
  const v = lg.v;
  const AM = L(n, "AM"), AB = L(n, "AB"), AN = L(n, "AN"), AC = L(n, "AC");
  const calc =
    methode === "coef"
      ? `${fr(v.AB)} ÷ ${fr(v.AM)} = ${fr(lg.k)}, donc ${AB} = ${fr(lg.k)} × ${AM}. Or ${fr(lg.k)} × ${fr(v.AN)} = ${fr(vrai)}${egal ? ` = ${AC}` : `, et ${AC} = ${fr(v.AC)}`}.`
      : `${AM} × ${AC} = ${fr(v.AM)} × ${fr(v.AC)} = ${fr(r2(v.AM * v.AC))} et ${AB} × ${AN} = ${fr(v.AB)} × ${fr(v.AN)} = ${fr(r2(v.AB * v.AN))}.`;
  return {
    text: `${cadreSansPara(n, s.intro)} ${donnees(n, lg, ["AM", "AB", "AN", "AC"])} ${randomChoice(QUESTIONS_EGALITE(n))}`,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [egal ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(
      "deux rapports a/b et c/d sont égaux quand a × d = b × c (produit en croix).",
      methode === "coef"
        ? `on cherche le coefficient qui fait passer de ${AM} à ${AB}, et on regarde s'il fait aussi passer de ${AN} à ${AC}.`
        : `on compare les produits en croix ${AM} × ${AC} et ${AB} × ${AN}.`,
      calc,
      egal ? "oui, les rapports sont égaux." : "non, les rapports ne sont pas égaux.",
    ),
    canvas: figure(
      n,
      { AM: `${fr(v.AM)} ${lg.u}`, AB: `${fr(v.AB)} ${lg.u}`, AN: `${fr(v.AN)} ${lg.u}`, AC: `${fr(v.AC)} ${lg.u}` },
      false,
    ),
  };
}

/** ★4 — le piège des unités : des cm et des m dans le même énoncé. */
function genRecipUnites(): TutorGeneratedQuestionV4 {
  const egal = randomChoice([true, false]);
  const n = randomChoice(NOMS_THALES);
  const s = randomChoice(SUPPORTS.filter((x) => x.f === "grand"));
  const { lg } = longueursReciproque("grand", false, egal);
  const v = lg.v;
  const AM = L(n, "AM"), AB = L(n, "AB"), AN = L(n, "AN"), AC = L(n, "AC");
  const cm = (x: number) => `${Math.round(x * 100)} cm`;
  const m = (x: number) => `${fr(x)} m`;
  const xs = [`${AM} = ${cm(v.AM)}`, `${AB} = ${m(v.AB)}`, `${AN} = ${cm(v.AN)}`, `${AC} = ${m(v.AC)}`];
  return {
    text: `${cadreSansPara(n, s.intro)} ${randomChoice(["On donne", "On a mesuré", "On sait que"])} ${liste(xs)}. ${randomChoice(QUESTIONS_EGALITE(n))}`,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [egal ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(
      "on ne compare des rapports qu'avec des longueurs exprimées dans la même unité.",
      `on convertit tout en mètres : ${AM} = ${m(v.AM)} et ${AN} = ${m(v.AN)} ; puis on fait le produit en croix.`,
      `${AM} × ${AC} = ${fr(v.AM)} × ${fr(v.AC)} = ${fr(r2(v.AM * v.AC))} et ${AB} × ${AN} = ${fr(v.AB)} × ${fr(v.AN)} = ${fr(r2(v.AB * v.AN))}.`,
      egal ? "oui, les rapports sont égaux." : "non, les rapports ne sont pas égaux.",
    ),
    canvas: figure(n, { AM: cm(v.AM), AB: m(v.AB), AN: cm(v.AN), AC: m(v.AC) }, false),
  };
}

/* ---------------------------------------------------------------------------
   THALES_RECIPROQUE_CONCLURE
--------------------------------------------------------------------------- */

/** ★3 — que conclure quand les rapports sont (ou ne sont pas) égaux ? */
function genConclureQcm(): TutorGeneratedQuestionV4 {
  const egal = randomChoice([true, false]);
  const n = randomChoice(NOMS_THALES);
  const s = tireSupport();
  const tri = L(n, "ABC"), AM = L(n, "AM"), AB = L(n, "AB"), AN = L(n, "AN"), AC = L(n, "AC"), MN = L(n, "MN"), BC = L(n, "BC");
  const valeurs = [0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8];
  const r1 = randomChoice(valeurs);
  const r2v = egal ? r1 : randomChoice(valeurs.filter((x) => x !== r1));
  const fait = randomChoice([
    egal ? `On a vérifié que ${AM}/${AB} = ${AN}/${AC}.` : `On a vérifié que ${AM}/${AB} ≠ ${AN}/${AC}.`,
    `On a calculé ${AM}/${AB} = ${fr(r1)} et ${AN}/${AC} = ${fr(r2v)}.`,
    `Les calculs donnent ${AM}/${AB} = ${fr(r1)} et ${AN}/${AC} = ${fr(r2v)}.`,
  ]);
  const q = randomChoice([
    "Que peut-on conclure ?",
    "Quelle conclusion est correcte ?",
    `Que peut-on en déduire pour les droites (${MN}) et (${BC}) ?`,
  ]);
  const para = `(${MN}) est parallèle à (${BC})`;
  const pasPara = `(${MN}) n'est pas parallèle à (${BC})`;
  const bon = egal ? para : pasPara;
  return {
    text: `${cadreSansPara(n, s.intro)} ${fait} ${q}`,
    format: "qcm",
    choices: makeChoices(bon, [
      egal ? pasPara : para,
      `(${MN}) est perpendiculaire à (${BC})`,
      `le triangle ${tri} est isocèle`,
      `le triangle ${tri} est rectangle en ${n.A}`,
    ]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: expl(
      DEF_RECIPROQUE,
      "rapports égaux (et points dans le même ordre) : les droites sont parallèles ; rapports différents : elles ne le sont pas, sinon le théorème de Thalès donnerait des rapports égaux.",
      egal ? "les deux rapports sont égaux." : "les deux rapports sont différents.",
      `${bon}.`,
    ),
    canvas: figure(n, {}, false),
  };
}

/** ★4 — conclure à partir des longueurs (oui / non, ou QCM de conclusion). */
function genConclure(qcm: boolean): TutorGeneratedQuestionV4 {
  const egal = randomChoice([true, false]);
  const n = randomChoice(NOMS_THALES);
  const s = tireSupport();
  const { lg } = longueursReciproque(s.f, false, egal);
  const v = lg.v;
  const tri = L(n, "ABC"), AM = L(n, "AM"), AB = L(n, "AB"), AN = L(n, "AN"), AC = L(n, "AC"), MN = L(n, "MN"), BC = L(n, "BC");
  const para = `(${MN}) est parallèle à (${BC})`;
  const pasPara = `(${MN}) n'est pas parallèle à (${BC})`;
  const debut = `${cadreSansPara(n, s.intro)} ${donnees(n, lg, ["AM", "AB", "AN", "AC"])}`;
  const explanation = expl(
    DEF_RECIPROQUE,
    `on compare ${AM}/${AB} et ${AN}/${AC} par produit en croix, puis on conclut.`,
    `${AM} × ${AC} = ${fr(v.AM)} × ${fr(v.AC)} = ${fr(r2(v.AM * v.AC))} et ${AB} × ${AN} = ${fr(v.AB)} × ${fr(v.AN)} = ${fr(r2(v.AB * v.AN))} : les rapports sont ${egal ? "égaux" : "différents"}.`,
    egal
      ? `d'après la réciproque du théorème de Thalès, ${para}.`
      : `${pasPara} (sinon, d'après le théorème de Thalès, les rapports seraient égaux).`,
  );
  const sides = { AM: `${fr(v.AM)} ${lg.u}`, AB: `${fr(v.AB)} ${lg.u}`, AN: `${fr(v.AN)} ${lg.u}`, AC: `${fr(v.AC)} ${lg.u}` };
  if (qcm) {
    const bon = egal ? para : pasPara;
    return {
      text: `${debut} ${randomChoice(["Quelle conclusion est correcte ?", "Que peut-on conclure ?", `Que dire des droites (${MN}) et (${BC}) ?`])}`,
      format: "qcm",
      choices: makeChoices(bon, [
        egal ? pasPara : para,
        `le triangle ${tri} est rectangle en ${n.A}`,
        `${AM} = ${AN}`,
        `(${MN}) est perpendiculaire à (${BC})`,
      ]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation,
      canvas: figure(n, sides, false),
    };
  }
  return {
    text: `${debut} ${randomChoice([
      `Peut-on conclure que (${MN}) est parallèle à (${BC}) ?`,
      `Les droites (${MN}) et (${BC}) sont-elles parallèles ?`,
      `Peut-on affirmer que (${MN}) // (${BC}) ?`,
      `(${MN}) et (${BC}) sont-elles parallèles ?`,
    ])}`,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [egal ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation,
    canvas: figure(n, sides, false),
  };
}

/* ---------------------------------------------------------------------------
   THALES_REDIGER
--------------------------------------------------------------------------- */

/** ★3 — choisir la bonne phrase de rédaction (début, justification, conclusion). */
function genRedigerQcm(): TutorGeneratedQuestionV4 {
  const n = randomChoice(NOMS_THALES);
  const s = tireSupport();
  const tri = L(n, "ABC"), AB = L(n, "AB"), AC = L(n, "AC"), MN = L(n, "MN"), BC = L(n, "BC");
  const AM = L(n, "AM"), AN = L(n, "AN");
  const genre = randomInt(0, 2);
  const avant = s.intro ? `${s.intro}, on étudie un triangle coupé par une droite. ` : "";
  if (genre === 0) {
    const cible = randomChoice(["AC", "BC", "AB", "MN"] as const);
    const bon = `Dans le triangle ${tri}, ${n.M} ∈ [${AB}], ${n.N} ∈ [${AC}] et (${MN}) // (${BC}).`;
    return {
      text: `${avant}On sait que (${MN}) // (${BC}), avec ${n.M} sur [${AB}] et ${n.N} sur [${AC}]. On veut calculer ${L(n, cible)} avec le théorème de Thalès. ${randomChoice([
        "Quelle phrase convient pour commencer la rédaction ?",
        "Par quelle phrase commence-t-on la rédaction ?",
        "Quelle première phrase faut-il écrire ?",
      ])}`,
      format: "qcm",
      choices: makeChoices(bon, [
        `Dans le triangle ${tri}, ${n.M} ∈ [${AB}], ${n.N} ∈ [${AC}] et (${MN}) ⊥ (${BC}).`,
        `Dans le triangle ${tri}, ${n.M} ∈ [${AB}], ${n.N} ∈ [${AC}] et (${AM}) // (${AN}).`,
        `Dans le triangle ${tri}, ${n.M} ∈ [${AB}], ${n.N} ∈ [${BC}] et (${MN}) // (${AC}).`,
        `Dans le triangle ${tri}, ${n.M} est le milieu de [${AB}] et (${MN}) coupe (${BC}).`,
      ]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: expl(
        DEF_THALES,
        "la rédaction commence par la configuration : le triangle, les deux points sur les côtés, la droite parallèle.",
        `« ${bon} »`,
        "on écrit ensuite l'égalité des rapports, puis on calcule.",
      ),
      canvas: figure(n),
    };
  }
  if (genre === 1) {
    const bon = `D'après la réciproque du théorème de Thalès, (${MN}) // (${BC}).`;
    return {
      text: `${avant}Dans le triangle ${tri}, les points ${n.A}, ${n.M}, ${n.B} et ${n.A}, ${n.N}, ${n.C} sont alignés dans le même ordre, et on a vérifié que ${AM}/${AB} = ${AN}/${AC}. ${randomChoice([
        `Quelle phrase justifie que (${MN}) // (${BC}) ?`,
        "Quelle phrase de conclusion est correcte ?",
        "Comment rédiger la conclusion ?",
      ])}`,
      format: "qcm",
      choices: makeChoices(bon, [
        `D'après le théorème de Thalès, (${MN}) // (${BC}).`,
        `D'après le théorème de Pythagore, (${MN}) // (${BC}).`,
        `D'après la réciproque du théorème de Pythagore, (${MN}) // (${BC}).`,
      ]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: expl(
        DEF_RECIPROQUE,
        "pour DÉMONTRER un parallélisme à partir de rapports égaux, on cite la réciproque, pas le théorème.",
        `les rapports ${AM}/${AB} et ${AN}/${AC} sont égaux et les points sont dans le même ordre.`,
        `« ${bon} »`,
      ),
      canvas: figure(n, {}, false),
    };
  }
  const lg = tireLongueurs(s.f, true);
  const r = resoudre(n, lg, "AC", 0);
  const bon = `D'après le théorème de Thalès, ${AM}/${AB} = ${AN}/${AC}, donc ${AC} = ${fr(lg.v.AC)} ${lg.u}.`;
  return {
    text: `${avant}Dans le triangle ${tri}, ${n.M} ∈ [${AB}], ${n.N} ∈ [${AC}] et (${MN}) // (${BC}). ${donnees(n, lg, ["AM", "AB", "AN"])} ${randomChoice([
      `Quelle phrase permet de trouver ${AC} ?`,
      "Quelle rédaction est correcte ?",
      `Quelle phrase conclut correctement le calcul de ${AC} ?`,
    ])}`,
    format: "qcm",
    choices: makeChoices(bon, [
      `D'après la réciproque du théorème de Thalès, ${AM}/${AB} = ${AN}/${AC}, donc ${AC} = ${fr(lg.v.AC)} ${lg.u}.`,
      `D'après le théorème de Pythagore, ${AM}/${AB} = ${AN}/${AC}, donc ${AC} = ${fr(lg.v.AC)} ${lg.u}.`,
      `D'après le théorème de Thalès, ${AM}/${AC} = ${AN}/${AB}, donc ${AC} = ${fr(r.inverse)} ${lg.u}.`,
    ]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: expl(
      DEF_THALES,
      "on cite le théorème de Thalès (les droites sont parallèles), on écrit la bonne égalité, puis on calcule.",
      `${r.avecNombres}, donc ${r.calcul}.`,
      `« ${bon} »`,
    ),
    canvas: figure(n, {
      AM: `${fr(lg.v.AM)} ${lg.u}`,
      AB: `${fr(lg.v.AB)} ${lg.u}`,
      AN: `${fr(lg.v.AN)} ${lg.u}`,
      AC: "?",
    }),
  };
}

/**
 * ★4 — la rédaction, avec les lettres tirées.
 * ⛔ 08/10/2026 (règle de Frédéric) : ce n'est plus une question ouverte à
 * mots-clés — « triangle » ou « parallèle » suffisaient à faire accepter
 * n'importe quelle phrase. C'est un QCM de rédactions sur les vrais pièges :
 * la réciproque citée à la place du théorème, un rapport renversé, les
 * longueurs mal associées, l'égalité qui ne contient pas les longueurs connues.
 */
function genRedigerOuvert(genre: "debut" | "egalite" | "raisonnement"): TutorGeneratedQuestionV4 {
  const n = randomChoice(NOMS_THALES);
  const s = tireSupport();
  const lg = tireLongueurs(s.f, true);
  const cible = randomChoice(["AC", "BC", "AB"] as const);
  const r = resoudre(n, lg, cible);
  const tri = L(n, "ABC"), AB = L(n, "AB"), AC = L(n, "AC"), MN = L(n, "MN"), BC = L(n, "BC");
  const T = L(n, cible);
  const data = r.connus.map((x) => `${L(n, x)} = ${fr(lg.v[x])} ${lg.u}`);
  const avant = s.intro ? `${s.intro}, on étudie un triangle coupé par une droite. ` : "";
  const [e1, e2] = r.egalite.split(" = ").map((x) => x.trim());
  // Les rapports écrits avec les lettres : renversé, mal associé, et le « troisième » de la chaîne.
  const renverse = (x: string) => x.split("/").reverse().join("/");
  const i = RAPPORTS.findIndex((p) => p.includes(cible));
  const autres = [0, 1, 2].filter((x) => x !== i).map((x) => `${L(n, RAPPORTS[x][0])}/${L(n, RAPPORTS[x][1])}`);
  const troisieme = autres.find((x) => x !== e1 && x !== e2)!;
  const melange = `${e1.split("/")[0]}/${e2.split("/")[1]} = ${e2.split("/")[0]}/${e1.split("/")[1]}`;
  const config = `Dans le triangle ${tri}, ${n.M} ∈ [${AB}], ${n.N} ∈ [${AC}] et (${MN}) // (${BC}).`;
  let text: string;
  let bon: string;
  let leurres: string[];
  if (genre === "egalite") {
    text = `${avant}On sait que (${MN}) // (${BC}), avec ${n.M} ∈ [${AB}] et ${n.N} ∈ [${AC}], et que ${liste(data)}. ${randomChoice([
      `Quelle égalité de rapports permet de trouver ${T} ?`,
      `Quelle égalité de rapports utilises-tu pour calculer ${T} ?`,
      `Quels rapports égaux sont utiles pour trouver ${T} ?`,
    ])}`;
    bon = `${e1} = ${e2}`;
    leurres = [
      `${e1} = ${renverse(e2)}`,
      melange,
      // ⛔ 08/10/2026 (Frédéric) : jamais un leurre VRAI. « e1 = troisième rapport »
      // était juste (seulement inutile) : l'élève avait raison de le choisir.
      `${e1} = ${renverse(troisieme)}`,
      `${renverse(e1)} = ${e2}`,
    ];
  } else if (genre === "debut") {
    text = `${avant}${randomChoice([
      `On rédige le début du raisonnement pour calculer ${T}`,
      `On écrit les deux premières phrases de la démonstration qui mène à ${T}`,
      `On commence la rédaction du calcul de ${T}`,
    ])}, sachant que ${n.M} ∈ [${AB}], ${n.N} ∈ [${AC}], (${MN}) // (${BC}), et que ${liste(data)}. Quel début est correct ?`;
    bon = `${config} D'après le théorème de Thalès, ${CHAINE(n)}.`;
    const [r1, r2b, r3] = CHAINE(n).split(" = ");
    leurres = [
      `${config} D'après la réciproque du théorème de Thalès, ${CHAINE(n)}.`,
      `${config} D'après le théorème de Thalès, ${r1} = ${renverse(r2b)} = ${r3}.`,
      `Dans le triangle ${tri}, ${n.M} ∈ [${AB}], ${n.N} ∈ [${AC}] et (${MN}) ⊥ (${BC}). D'après le théorème de Thalès, ${CHAINE(n)}.`,
    ];
  } else {
    text = `${avant}${randomChoice([
      `On rédige le raisonnement de Thalès pour calculer ${T}`,
      `On rédige la démonstration complète qui donne ${T}`,
      `On justifie par une rédaction complète le calcul de ${T}`,
    ])} (${data.join(", ")}, ${n.M} ∈ [${AB}], ${n.N} ∈ [${AC}], (${MN}) // (${BC})). Quelle rédaction est correcte ?`;
    const fin = (prop: string, eg: string, v: number) => `D'après ${prop}, ${eg}, donc ${T} = ${fr(v)} ${lg.u}.`;
    bon = fin("le théorème de Thalès", r.egalite, r.valeur);
    leurres = [
      fin("la réciproque du théorème de Thalès", r.egalite, r.valeur),
      fin("le théorème de Thalès", melange, r.inverse),
      ...(r.additif > 0 ? [fin("le théorème de Thalès", r.egalite, r.additif)] : []),
      fin("le théorème de Thalès", `${e1} = ${renverse(e2)}`, r.inverse),
    ];
  }
  const sides: Partial<Record<Seg, string>> = { [cible]: "?" };
  for (const x of r.connus) sides[x] = `${fr(lg.v[x])} ${lg.u}`;
  return {
    text,
    format: "qcm",
    choices: makeChoices(bon, leurres),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: expl(
      DEF_THALES,
      `« Dans le triangle ${tri}, ${n.M} ∈ [${AB}], ${n.N} ∈ [${AC}] et (${MN}) // (${BC}). D'après le théorème de Thalès, ${CHAINE(n)}. »`,
      `on garde ${r.egalite} : ${r.avecNombres}, donc ${r.calcul}.`,
      `${T} = ${fr(r.valeur)} ${lg.u}.`,
    ),
    canvas: figure(n, sides),
  };
}

/* ---------------------------------------------------------------------------
   THALES_DEFI — des objets réels
--------------------------------------------------------------------------- */

// ⭐ OBJETS schématisés par un triangle coupé par une parallèle. `mn` : la pièce
// qui joint M et N ; `bc` : ce à quoi elle est parallèle ; `bcLong` : la
// longueur BC dite en mots. Un seul objet réunionnais (la case créole).
const OBJETS: { objet: string; fem: boolean; f: Famille; mn: string; bc: string; bcLong: string }[] = [
  { objet: "Un escabeau ouvert", fem: false, f: "meuble", mn: "la barre de sécurité", bc: "le sol", bcLong: "l'écartement au sol" },
  { objet: "Le portique d'une balançoire", fem: false, f: "grand", mn: "la traverse", bc: "le sol", bcLong: "l'écart entre les pieds" },
  { objet: "La ferme d'une charpente", fem: true, f: "grand", mn: "l'entrait", bc: "la base", bcLong: "la portée de la ferme" },
  { objet: "La voile d'un voilier", fem: true, f: "grand", mn: "une latte", bc: "la bôme", bcLong: "la bordure de la voile" },
  { objet: "L'entrée d'une tente", fem: true, f: "meuble", mn: "la barre de renfort", bc: "le sol", bcLong: "la largeur au sol" },
  { objet: "Un chevalet de peintre", fem: false, f: "meuble", mn: "la tablette", bc: "le sol", bcLong: "l'écartement des pieds" },
  { objet: "La console d'une étagère", fem: true, f: "moyen", mn: "le renfort", bc: "la jambe de force", bcLong: "la longueur de la jambe de force" },
  { objet: "Une poutre d'un pont en treillis", fem: true, f: "grand", mn: "une barre du treillis", bc: "le tablier", bcLong: "la base de la poutre" },
  { objet: "Un séchoir à linge pliant", fem: false, f: "meuble", mn: "la tringle", bc: "le sol", bcLong: "l'écartement au sol" },
  { objet: "Un panneau de signalisation triangulaire", fem: false, f: "moyen", mn: "la bande réfléchissante", bc: "la base du panneau", bcLong: "la base du panneau" },
  { objet: "Le pignon d'une case créole", fem: false, f: "grand", mn: "la poutre de la mezzanine", bc: "le plancher", bcLong: "la largeur du pignon" },
  { objet: "Une face d'une pyramide de verre", fem: true, f: "grand", mn: "une traverse métallique", bc: "la base", bcLong: "la base de la face" },
  { objet: "Une rampe d'accès", fem: true, f: "grand", mn: "le support", bc: "le poteau", bcLong: "la hauteur du poteau" },
  { objet: "Un tremplin de skate", fem: false, f: "meuble", mn: "le montant intermédiaire", bc: "le montant arrière", bcLong: "la hauteur du tremplin" },
  { objet: "Un toboggan", fem: false, f: "grand", mn: "la barre de soutien", bc: "l'échelle", bcLong: "la longueur de l'échelle" },
  { objet: "La maquette d'un toit de chalet", fem: true, f: "petit", mn: "la poutre", bc: "la base", bcLong: "la largeur de la base" },
];

function poseObjet(o: (typeof OBJETS)[number], n: Noms, parallele: boolean): string {
  const tri = L(n, "ABC"), AB = L(n, "AB"), AC = L(n, "AC"), MN = L(n, "MN"), BC = L(n, "BC");
  const schem = o.fem ? "schématisée" : "schématisé";
  const pos = `${n.M} est sur [${AB}], ${n.N} est sur [${AC}]`;
  return parallele
    ? `${o.objet} est ${schem} par le triangle ${tri} : ${pos}, et ${o.mn} [${MN}] est parallèle ${a(o.bc)} (${BC}).`
    : `${o.objet} est ${schem} par le triangle ${tri} : ${pos}, et ${o.mn} [${MN}] relie ${n.M} à ${n.N} ; ${o.bc} correspond à [${BC}].`;
}

/** « une latte » → « la latte » : la pièce est déjà présentée, on la reprend au défini. */
const defini = (gn: string) => gn.replace(/^une /, "la ").replace(/^un /, "le ");

function nomCible(o: (typeof OBJETS)[number], n: Noms, c: Seg): string {
  if (c === "MN") return `la longueur ${de(defini(o.mn))} [${L(n, "MN")}]`;
  if (c === "BC") return `${o.bcLong} ${L(n, "BC")}`;
  return `la longueur ${L(n, c)}`;
}

/** ★4 / ★5 — un objet réel, une longueur à calculer. */
function genDefiObjet(cibles: Seg[], simple: boolean, qcm: boolean): TutorGeneratedQuestionV4 {
  const o = randomChoice(OBJETS);
  const n = randomChoice(NOMS_THALES);
  const lg = tireLongueurs(o.f, simple);
  const cible = randomChoice(cibles);
  const r = resoudre(n, lg, cible);
  const T = nomCible(o, n, cible);
  // ⚠️ Pas « Quelle est … » : « quelle est l'écartement » ne s'accorde pas.
  const q = randomChoice([
    `Calcule ${T}.`,
    `Que vaut ${T} ?`,
    `Détermine ${T}, en ${lg.u}.`,
    `Trouve ${T}.`,
  ]);
  const text = `${poseObjet(o, n, true)} ${donnees(n, lg, r.connus)} ${q}`;
  const explanation = expl(
    DEF_THALES,
    `${o.mn} est parallèle ${a(o.bc)} : dans le triangle ${L(n, "ABC")}, ${CHAINE(n)}. On garde ${r.egalite}.`,
    `${r.avecNombres}, donc ${r.calcul}.`,
    `${cap(T)} vaut ${fr(r.valeur)} ${lg.u}.`,
  );
  if (qcm) {
    return {
      text,
      format: "qcm",
      choices: choixLongueur(r.valeur, [r.inverse, r.additif], lg.u),
      expected: [`${fr(r.valeur)} ${lg.u}`],
      comparator: "mcq_exact",
      explanation,
    };
  }
  return {
    text,
    format: "short",
    expected: [`${fr(r.valeur)} ${lg.u}`],
    comparator: "number_equal",
    explanation,
  };
}

/** ★5 — un objet réel : la pièce est-elle parallèle ? (réciproque) */
function genDefiReciproque(): TutorGeneratedQuestionV4 {
  const egal = randomChoice([true, false]);
  const o = randomChoice(OBJETS);
  const n = randomChoice(NOMS_THALES);
  const { lg } = longueursReciproque(o.f, false, egal);
  const v = lg.v;
  const AM = L(n, "AM"), AB = L(n, "AB"), AN = L(n, "AN"), AC = L(n, "AC"), MN = L(n, "MN"), BC = L(n, "BC");
  // ⚠️ 08/10/2026 : « Une latte est-elle bien parallèle… » → « La latte… » (elle est déjà présentée).
  const piece = `${cap(defini(o.mn))} est-${/^(la|une) /.test(o.mn) ? "elle" : "il"} bien parallèle ${a(o.bc)} ?`;
  const q = randomChoice([
    `Peut-on affirmer que (${MN}) est parallèle à (${BC}) ?`,
    piece,
    `Les droites (${MN}) et (${BC}) sont-elles parallèles ?`,
    `Le constructeur peut-il conclure que (${MN}) // (${BC}) ?`,
  ]);
  return {
    text: `${poseObjet(o, n, false)} ${donnees(n, lg, ["AM", "AB", "AN", "AC"])} ${q}`,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [egal ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(
      DEF_RECIPROQUE,
      `on compare ${AM}/${AB} et ${AN}/${AC} par produit en croix.`,
      `${AM} × ${AC} = ${fr(v.AM)} × ${fr(v.AC)} = ${fr(r2(v.AM * v.AC))} et ${AB} × ${AN} = ${fr(v.AB)} × ${fr(v.AN)} = ${fr(r2(v.AB * v.AN))}.`,
      egal
        ? `les rapports sont égaux : d'après la réciproque du théorème de Thalès, (${MN}) // (${BC}).`
        : `les rapports sont différents : (${MN}) n'est pas parallèle à (${BC}).`,
    ),
    canvas: figure(
      n,
      { AM: `${fr(v.AM)} ${lg.u}`, AB: `${fr(v.AB)} ${lg.u}`, AN: `${fr(v.AN)} ${lg.u}`, AC: `${fr(v.AC)} ${lg.u}` },
      false,
    ),
  };
}

// ⭐ LES OMBRES : un petit objet vertical et un grand, au même instant. Les
// rayons du soleil sont parallèles : c'est une configuration de Thalès.
const PETITS_OBJETS: { nom: string; fem: boolean }[] = [
  { nom: "bâton vertical", fem: false },
  { nom: "piquet", fem: false },
  { nom: "règle graduée", fem: true },
  { nom: "poteau", fem: false },
  { nom: "jalon de géomètre", fem: false },
  { nom: "perche", fem: true },
];
const GRANDS_OBJETS: { nom: string; lieu: string; hmin: number; hmax: number }[] = [
  { nom: "l'arbre", lieu: "Dans un parc", hmin: 4, hmax: 25 },
  { nom: "l'immeuble", lieu: "En ville", hmin: 12, hmax: 45 },
  { nom: "le phare", lieu: "Au bord de la mer", hmin: 15, hmax: 50 },
  { nom: "le clocher", lieu: "Sur la place du village", hmin: 15, hmax: 45 },
  { nom: "le lampadaire", lieu: "Sur le parking", hmin: 4, hmax: 10 },
  { nom: "le mât du drapeau", lieu: "Dans la cour du collège", hmin: 5, hmax: 15 },
  { nom: "le pylône électrique", lieu: "Au bord d'un champ", hmin: 15, hmax: 45 },
  { nom: "la grue", lieu: "Sur un chantier", hmin: 15, hmax: 50 },
  { nom: "le château d'eau", lieu: "À l'entrée du village", hmin: 15, hmax: 40 },
  { nom: "le filao", lieu: "Sur la plage de L'Hermitage, à La Réunion", hmin: 6, hmax: 20 },
];

/** ★4 / ★5 — la hauteur (ou l'ombre) d'un grand objet. */
function genDefiOmbre(): TutorGeneratedQuestionV4 {
  const g = randomChoice(GRANDS_OBJETS);
  const p = randomChoice(PETITS_OBJETS);
  const un = p.fem ? "une" : "un";
  const le = p.fem ? "la" : "le";
  let h = 1, o = 1, k = 5;
  for (let essai = 0; essai < 300; essai++) {
    h = randomChoice([0.8, 1, 1.2, 1.5, 2]);
    o = randomChoice([0.4, 0.5, 0.6, 0.8, 1, 1.2, 1.5, 2, 2.5]);
    k = randomChoice([4, 5, 6, 8, 10, 12, 15, 20, 25]);
    const H0 = r2(h * k);
    if (H0 >= g.hmin && H0 <= g.hmax && auDixieme(H0) && auDixieme(r2(o * k))) break;
  }
  const H = r2(h * k), O = r2(o * k);
  const enCm = Math.random() < 0.3;
  const hTxt = enCm ? `${Math.round(h * 100)} cm` : `${fr(h)} m`;
  const oTxt = enCm ? `${Math.round(o * 100)} cm` : `${fr(o)} m`;
  const chercheHauteur = Math.random() < 0.65;
  const petitePhrase = randomChoice([
    `${un} ${p.nom} de ${hTxt} de haut a une ombre de ${oTxt}.`,
    `l'ombre ${de(`${le} ${p.nom}`)}, ${p.fem ? "haute" : "haut"} de ${hTxt}, mesure ${oTxt}.`,
    `on plante ${un} ${p.nom} de ${hTxt} : son ombre mesure ${oTxt}.`,
  ]);
  const grandePhrase = chercheHauteur
    ? `Au même moment, l'ombre ${de(g.nom)} mesure ${fr(O)} m.`
    : `Au même moment, ${g.nom} mesure ${fr(H)} m de haut.`;
  const q = chercheHauteur
    ? randomChoice([
        `Quelle est la hauteur ${de(g.nom)}, en m ?`,
        `Calcule la hauteur ${de(g.nom)} (en m).`,
        `Combien mesure ${g.nom} de haut, en m ?`,
      ])
    : randomChoice([
        `Quelle est la longueur de l'ombre ${de(g.nom)}, en m ?`,
        `Calcule la longueur de son ombre (en m).`,
        `Combien mesure son ombre, en m ?`,
      ]);
  const valeur = chercheHauteur ? H : O;
  const conv = enCm ? ` On convertit : ${hTxt} = ${fr(h)} m et ${oTxt} = ${fr(o)} m.` : "";
  return {
    text: `${g.lieu}, ${petitePhrase} ${grandePhrase} ${q}`,
    format: "short",
    expected: [`${fr(valeur)} m`],
    comparator: "number_equal",
    explanation: expl(
      "les rayons du soleil sont parallèles : l'objet, son ombre et le rayon forment une configuration de Thalès, donc hauteurs et ombres sont proportionnelles.",
      `on travaille dans la même unité.${conv} Puis on cherche le coefficient entre les deux objets.`,
      chercheHauteur
        ? `coefficient = ${fr(O)} ÷ ${fr(o)} = ${fr(k)} ; hauteur = ${fr(h)} × ${fr(k)} = ${fr(H)} m.`
        : `coefficient = ${fr(H)} ÷ ${fr(h)} = ${fr(k)} ; ombre = ${fr(o)} × ${fr(k)} = ${fr(O)} m.`,
      chercheHauteur ? `${cap(g.nom)} mesure ${fr(H)} m de haut.` : `L'ombre mesure ${fr(O)} m.`,
    ),
  };
}

/** ★5 — le coefficient d'agrandissement (ou de réduction). */
function genDefiCoefficient(): TutorGeneratedQuestionV4 {
  const n = randomChoice(NOMS_THALES);
  const avecObjet = Math.random() < 0.5;
  const o = randomChoice(OBJETS);
  const s = tireSupport();
  const reduction = Math.random() < 0.35;
  let lg = tireLongueurs(avecObjet ? o.f : s.f, false);
  for (let essai = 0; reduction && ![2, 2.5, 4, 5].includes(lg.k) && essai < 50; essai++) {
    lg = tireLongueurs(avecObjet ? o.f : s.f, false);
  }
  const red = reduction && [2, 2.5, 4, 5].includes(lg.k);
  const valeur = red ? r2(1 / lg.k) : lg.k;
  const [x, y] = randomChoice([["AM", "AB"], ["AN", "AC"], ["MN", "BC"]] as const);
  const petit = L(n, "AMN"), grand = L(n, "ABC");
  const q = red
    ? randomChoice([
        `Quel est le coefficient de réduction qui fait passer du triangle ${grand} au triangle ${petit} ?`,
        `Par quel nombre multiplie-t-on ${L(n, y)} pour obtenir ${L(n, x)} ?`,
      ])
    : randomChoice([
        `Quel est le coefficient d'agrandissement qui fait passer du triangle ${petit} au triangle ${grand} ?`,
        `Par quel nombre multiplie-t-on ${L(n, x)} pour obtenir ${L(n, y)} ?`,
        `Quel coefficient relie les longueurs du petit triangle à celles du grand ?`,
      ]);
  const debut = avecObjet ? poseObjet(o, n, true) : cadre(n, s.intro);
  return {
    text: `${debut} ${donnees(n, lg, [x, y])} ${q}`,
    format: "short",
    expected: [fr(valeur)],
    comparator: "number_equal",
    explanation: expl(
      "dans une configuration de Thalès, le grand triangle est un agrandissement du petit : toutes ses longueurs sont multipliées par le même coefficient.",
      red
        ? `coefficient de réduction = petite longueur ÷ grande longueur = ${L(n, x)} ÷ ${L(n, y)}.`
        : `coefficient d'agrandissement = grande longueur ÷ petite longueur = ${L(n, y)} ÷ ${L(n, x)}.`,
      red
        ? `${fr(lg.v[x])} ÷ ${fr(lg.v[y])} = ${fr(valeur)}.`
        : `${fr(lg.v[y])} ÷ ${fr(lg.v[x])} = ${fr(valeur)}.`,
      `le coefficient est ${fr(valeur)}.`,
    ),
  };
}

export const thalesBank: TutorBankItemV4[] = [
  /* =========================
     THALES_CONFIGURATION
  ========================= */

  {
    kind: "fixed",
    id: "thales_theoreme_configuration_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une configuration de Thalès en 4e, on cherche souvent...",
    format: "qcm",
    choices: [
      "deux droites parallèles dans un triangle",
      "un triangle rectangle",
      "un cercle et un diamètre",
      "un parallélogramme",
    ],
    expected: ["deux droites parallèles dans un triangle"],
    comparator: "mcq_exact",
    hint: "Thalès utilise une configuration avec des droites parallèles.",
    explanation:
      "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("En 4e, la configuration classique de Thalès se fait dans un triangle avec une droite parallèle à un côté.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    tags: ["thales_theoreme_theoreme", "configuration", "qcm"],
  },

  {
    kind: "fixed",
    id: "thales_theoreme_configuration_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 1,
    theme: "neutral",
    text: "Sur la figure, si (MN) est parallèle à (BC), peut-on reconnaître une configuration de Thalès ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Regarde si une droite est parallèle à un côté du triangle.",
    explanation:
      "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("Oui. Dans le triangle ABC, M est sur [AB], N est sur [AC] et (MN) est parallèle à (BC).") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    canvas: thalesCanvas({
      display: {
        showPoints: true,
        showLabels: true,
        showSideLabels: false,
        showParallelMarks: true,
        highlightParallel: true,
      },
    }),
    tags: ["thales_theoreme_theoreme", "configuration", "canvas"],
  },

  {
    kind: "template",
    id: "thales_theoreme_configuration_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    hint: "Thalès nécessite une droite parallèle à un côté du triangle.",
    tags: ["thales_theoreme_theoreme", "configuration", "template", "canvas"],
    // ⛔ RÉPARÉ LE 30/08/2026 : ce gabarit ne fabriquait que DEUX énoncés, un
    // par branche. Sa réponse variait déjà — c'était son seul mérite.
    // ⭐ Les points sont maintenant tirés d'une table de nommages. Ce n'est pas
    // cosmétique : un élève qui ne voit jamais que « ABC avec M et N » retient
    // des LETTRES au lieu de la configuration, et se bloque dès qu'un exercice
    // nomme les points autrement.
    // 03/10/2026 : situation + tournure de la question (genConfigOuiNon).
    generate: genConfigOuiNon,
  },

  /* =========================
     THALES_RAPPORTS
  ========================= */

  {
    kind: "fixed",
    id: "thales_theoreme_rapport_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle ABC, avec M sur [AB], N sur [AC] et (MN) parallèle à (BC), quelle égalité de rapports est correcte ?",
    format: "qcm",
    choices: [
      "AM / AB = AN / AC",
      "AB / AM = AN / BC",
      "AM / AC = AN / AB",
      "MN / AM = BC / AN",
    ],
    expected: ["AM / AB = AN / AC"],
    comparator: "mcq_exact",
    hint: "On compare les longueurs sur les mêmes demi-droites issues de A.",
    explanation:
      "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("Dans cette configuration, on a AM / AB = AN / AC = MN / BC.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    canvas: thalesCanvas({
      display: {
        showPoints: true,
        showLabels: true,
        showSideLabels: false,
        showParallelMarks: true,
      },
    }),
    tags: ["thales_theoreme_theoreme", "rapport", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "thales_theoreme_rapport_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 2,
    theme: "neutral",
    hint: "Associe les petites longueurs avec les grandes longueurs correspondantes.",
    tags: ["thales_theoreme_theoreme", "rapport", "template"],
    // 03/10/2026 : ne fabriquait qu'UN énoncé. Nommage + situation + tournure.
    generate: genRapportCompleter,
  },

  {
    kind: "template",
    id: "thales_theoreme_rapport_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Les rapports doivent comparer petit côté / grand côté sur les deux côtés du triangle.",
    tags: ["thales_theoreme_theoreme", "rapport", "piege", "template"],
    // 03/10/2026 : genRapportNombres. ⛔ Le piège « a/c = b/d » (produit en
    // croix de Thalès, égalité VRAIE) reste banni ; AM ≠ AN est garanti par
    // tireLongueurs (trois petites longueurs distinctes).
    generate: () => genRapportNombres(true),
  },

  /* =========================
     THALES_CALCULER_LONGUEUR
  ========================= */

  {
    kind: "fixed",
    id: "thales_theoreme_calculer_longueur_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une configuration de Thalès, AM = 3 cm, AB = 6 cm et AN = 4 cm. Quelle est la longueur AC ?",
    format: "qcm",
    choices: ["2 cm", "6 cm", "8 cm", "12 cm"],
    expected: ["8 cm"],
    comparator: "mcq_exact",
    hint: "3 / 6 = 4 / AC.",
    explanation:
      "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("On a 3 / 6 = 4 / AC. Comme 3 / 6 = 1 / 2, alors AC = 8 cm.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    canvas: thalesCanvas({
      sideLabels: {
        AM: "3 cm",
        AB: "6 cm",
        AN: "4 cm",
        AC: "?",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSideLabels: true,
        showParallelMarks: true,
      },
    }),
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "thales_theoreme_calculer_longueur_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris l’égalité des rapports : petite longueur sur grande longueur correspondante.",
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "template", "canvas"],
    // 03/10/2026 : nommage + situation + longueurs entières (genCalcul).
    generate: () => genCalcul(["AC", "AN"], true),
  },

  {
    kind: "template",
    id: "thales_theoreme_calculer_longueur_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "Cette fois, on cherche une longueur du petit triangle.",
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "template"],
    // 03/10/2026 : on cherche une PETITE longueur (genCalcul).
    generate: () => genCalcul(["AM", "AN", "MN"], true),
  },

  {
    kind: "template",
    id: "thales_theoreme_calculer_longueur_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris l’égalité de rapports, puis fais une quatrième proportionnelle.",
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "quatrieme_proportionnelle"],
    // 03/10/2026 : coefficient décimal possible (1,5 ; 2,5…), longueurs
    // décimales, n'importe quelle longueur cherchée (genCalcul).
    generate: () => genCalcul(["AC", "AB", "BC", "AM", "AN", "MN"], false),
  },

  /* =========================
     THALES_RECIPROQUE_VERIFIER
  ========================= */

  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_verifier_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "On a AM = 3 cm, AB = 6 cm, AN = 4 cm et AC = 8 cm. Les rapports AM/AB et AN/AC sont-ils égaux ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare 3/6 et 4/8.",
    explanation: "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("3/6 = 1/2 et 4/8 = 1/2. Les rapports sont égaux.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    canvas: thalesCanvas({
      sideLabels: {
        AM: "3 cm",
        AB: "6 cm",
        AN: "4 cm",
        AC: "8 cm",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSideLabels: true,
        showParallelMarks: false,
      },
    }),
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier"],
  },

  {
    kind: "template",
    id: "thales_theoreme_reciproque_verifier_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les deux rapports petit/grand.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "template"],
    // 03/10/2026 : nommage + situation + tournure ; explication par le coefficient.
    generate: () => genRecipVerifier(true, "coef"),
  },

  /* =========================
     THALES_RECIPROQUE_CONCLURE
  ========================= */

  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_conclure_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Si M est sur [AB], N est sur [AC] et AM/AB = AN/AC, alors on peut conclure que...",
    format: "qcm",
    choices: [
      "(MN) est parallèle à (BC)",
      "le triangle ABC est rectangle",
      "AB = AC",
      "M est le milieu de [AB]",
    ],
    expected: ["(MN) est parallèle à (BC)"],
    comparator: "mcq_exact",
    hint: "C’est la réciproque de Thalès.",
    explanation:
      "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("D’après la réciproque du théorème de Thalès, si les rapports sont égaux, alors les droites sont parallèles.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure"],
  },

  {
    kind: "template",
    id: "thales_theoreme_reciproque_conclure_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie d’abord l’égalité des rapports.",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure", "template"],
    // 03/10/2026 : nommage + situation + longueurs décimales (genConclure).
    generate: () => genConclure(false),
  },

  /* =========================
     THALES_REDIGER
  ========================= */

  {
    kind: "fixed",
    id: "thales_theoreme_rediger_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle phrase convient pour commencer une rédaction avec le théorème de Thalès ?",
    format: "qcm",
    choices: [
      "Dans le triangle ABC, M appartient à [AB], N appartient à [AC] et (MN) est parallèle à (BC).",
      "Dans le triangle ABC, M appartient à [AB], N appartient à [AC] et (MN) est perpendiculaire à (BC).",
      "Dans le triangle ABC, M appartient à [AB], N appartient à [AC] et (AM) est parallèle à (AN).",
      "Dans le triangle ABC, M est le milieu de [AB], N est le milieu de [AC] et (MN) coupe (BC).",
    ],
    expected: [
      "Dans le triangle ABC, M appartient à [AB], N appartient à [AC] et (MN) est parallèle à (BC).",
    ],
    comparator: "mcq_exact",
    hint: "Il faut annoncer la configuration et le parallélisme.",
    explanation:
      "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("Pour utiliser le théorème de Thalès, on commence par préciser la configuration et les droites parallèles.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    tags: ["thales_theoreme_theoreme", "redaction", "qcm"],
  },

  {
    kind: "fixed",
    id: "thales_theoreme_rediger_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    // ⛔ 08/10/2026 : QCM, plus une question à mots-clés (règle de Frédéric).
    text: "Quelle est la différence entre le théorème de Thalès et sa réciproque ?",
    format: "qcm",
    choices: [
      "Le théorème prouve que des droites sont parallèles ; la réciproque calcule une longueur.",
      "Le théorème calcule une longueur quand on SAIT que les droites sont parallèles ; la réciproque PROUVE que des droites sont parallèles.",
      "Le théorème sert dans un triangle rectangle ; la réciproque dans un triangle quelconque.",
      "Il n'y a aucune différence : ce sont deux noms de la même propriété.",
    ],
    expected: ["Le théorème calcule une longueur quand on SAIT que les droites sont parallèles ; la réciproque PROUVE que des droites sont parallèles."],
    comparator: "mcq_exact",
    hint: "Dans un cas, on sait déjà que les droites sont parallèles. Dans l’autre, on veut le prouver.",
    explanation:
      "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("Le théorème de Thalès sert à calculer une longueur quand on sait que les droites sont parallèles. La réciproque sert à démontrer que deux droites sont parallèles à partir de rapports égaux.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    tags: ["thales_theoreme_theoreme", "redaction", "open"],
  },

  {
    kind: "template",
    id: "thales_theoreme_rediger_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par écrire la configuration, puis l’égalité des rapports.",
    tags: ["thales_theoreme_theoreme", "redaction", "template"],
    // 03/10/2026 : nommage + situation + longueur cherchée variable (genRedigerOuvert).
    generate: () => genRedigerOuvert("debut"),
  },

  /* =========================
     THALES_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "thales_theoreme_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « Les longueurs sont dans un triangle, donc je peux toujours utiliser Thalès. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut une condition de parallélisme.",
    explanation:
      "Définition : le théorème de Thalès relie des longueurs dans une configuration avec des droites parallèles.\n\n" +
          "Méthode : on repère les triangles en situation de Thalès et on associe les côtés correspondants.\n\nCalcul : " +
          ("Non. Pour utiliser le théorème de Thalès, il faut une configuration avec des droites parallèles.") +
          "\n\nConclusion : la longueur ou la relation obtenue respecte la configuration de Thalès.",
    tags: ["thales_theoreme_theoreme", "defi", "erreur"],
  },

  {
    kind: "template",
    id: "thales_theoreme_defi_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Modélise la situation par une configuration de Thalès.",
    tags: ["thales_theoreme_theoreme", "defi", "objet_reel", "probleme"],
    // 03/10/2026 : n'était QUE réunionnais (« À La Réunion, un poteau… ») et
    // toujours la même phrase. Devient un objet réel parmi seize (un seul
    // réunionnais, la case créole), longueurs décimales (genDefiObjet).
    generate: () => genDefiObjet(["AC", "AB", "MN", "BC", "AM", "AN"], false, false),
  },

  {
    kind: "template",
    id: "thales_theoreme_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les rapports avant de conclure.",
    tags: ["thales_theoreme_theoreme", "defi", "reciproque", "piege"],
    // 03/10/2026 : un objet réel dont on vérifie la pièce (genDefiReciproque).
    generate: genDefiReciproque,
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- THALES_CONFIGURATION ----------
  {
    kind: "fixed",
    id: "thales_theoreme_configuration_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle condition est indispensable pour utiliser le théorème de Thalès ?",
    format: "qcm",
    choices: [
      "deux droites parallèles",
      "un angle droit",
      "trois côtés égaux",
      "un cercle",
    ],
    expected: ["deux droites parallèles"],
    comparator: "mcq_exact",
    hint: "Thalès repose sur le parallélisme.",
    explanation:
      "Définition : le théorème de Thalès s’applique dans une configuration avec deux droites parallèles.\n\n" +
      "Méthode : on vérifie la présence de droites parallèles.\n\n" +
      "Calcul : sans parallélisme, on ne peut pas appliquer Thalès.\n\n" +
      "Conclusion : il faut deux droites parallèles.",
    tags: ["thales_theoreme_theoreme", "configuration", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_configuration_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle ABC, M ∈ [AB] et N ∈ [AC]. Quelle information manque pour appliquer Thalès ?",
    format: "qcm",
    choices: [
      "savoir que (MN) est parallèle à (BC)",
      "savoir que ABC est isocèle",
      "connaître l’aire du triangle",
      "savoir que M est le milieu de [AB]",
    ],
    expected: ["savoir que (MN) est parallèle à (BC)"],
    comparator: "mcq_exact",
    hint: "Le parallélisme est la clé.",
    explanation:
      "Définition : Thalès nécessite une droite parallèle à un côté du triangle.\n\n" +
      "Méthode : on cherche l’information de parallélisme.\n\n" +
      "Calcul : il faut savoir que (MN) // (BC).\n\n" +
      "Conclusion : l’information manquante est le parallélisme de (MN) et (BC).",
    tags: ["thales_theoreme_theoreme", "configuration", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_configuration_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 1,
    theme: "neutral",
    text: "Dans quelle figure reconnaît-on une configuration de Thalès (en 4e) ?",
    format: "qcm",
    choices: [
      "un triangle coupé par une droite parallèle à un côté",
      "un triangle coupé par une droite perpendiculaire à un côté",
      "un triangle coupé par une de ses médianes en deux parts",
      "un parallélogramme coupé par une de ses diagonales",
    ],
    expected: ["un triangle coupé par une droite parallèle à un côté"],
    comparator: "mcq_exact",
    hint: "Triangle + droite parallèle.",
    explanation:
      "Définition : en 4e, la configuration de Thalès est un triangle coupé par une parallèle à un côté.\n\n" +
      "Méthode : on repère le triangle et la droite parallèle.\n\n" +
      "Calcul : c’est le triangle avec une parallèle à un côté.\n\n" +
      "Conclusion : la bonne figure est le triangle coupé par une parallèle.",
    tags: ["thales_theoreme_theoreme", "configuration", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_configuration_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle ABC, M ∈ [AB], N ∈ [AC] et (MN) // (BC). Quel sommet est commun aux deux triangles AMN et ABC ?",
    format: "qcm",
    choices: ["A", "B", "C", "M"],
    expected: ["A"],
    comparator: "mcq_exact",
    hint: "Les deux triangles partagent le sommet d’où partent les demi-droites.",
    explanation:
      "Définition : dans cette configuration, les triangles AMN et ABC partagent un sommet.\n\n" +
      "Méthode : on repère le sommet commun.\n\n" +
      "Calcul : les demi-droites partent de A.\n\n" +
      "Conclusion : le sommet commun est A.",
    canvas: thalesCanvas({
      display: { showPoints: true, showLabels: true, showSideLabels: false, showParallelMarks: true },
    }),
    tags: ["thales_theoreme_theoreme", "configuration", "canvas", "qcm"],
  },
  {
    kind: "template",
    id: "thales_theoreme_configuration_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    hint: "Thalès demande une parallèle à un côté.",
    tags: ["thales_theoreme_theoreme", "configuration", "template", "canvas"],
    // 03/10/2026 : codé, ou seulement « à l'air » parallèle (genConfigCodage).
    generate: genConfigCodage,
  },
  {
    kind: "template",
    id: "thales_theoreme_configuration_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    hint: "Les points doivent être sur les côtés issus du même sommet.",
    tags: ["thales_theoreme_theoreme", "configuration", "template"],
    // 03/10/2026 : points mal placés, droite perpendiculaire ou sécante (genConfigPosition).
    generate: genConfigPosition,
  },
  {
    kind: "fixed",
    id: "thales_theoreme_configuration_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle ABC, quels éléments forment une configuration de Thalès ?",
    format: "qcm",
    choices: [
      "M sur [AB], N sur [AC], et (MN) perpendiculaire à (BC)",
      "M sur [AB], N sur [AC], et (AM) parallèle à (AN)",
      "M sur [AB], N sur [AC], et (MN) parallèle à (BC)",
      "M milieu de [AB], et (MN) coupe (BC)",
    ],
    expected: ["M sur [AB], N sur [AC], et (MN) parallèle à (BC)"],
    comparator: "mcq_exact",
    hint: "Pense au triangle, aux points sur deux côtés et à la parallèle.",
    explanation:
      "Définition : une configuration de Thalès comprend un triangle, deux points sur deux côtés issus d’un même sommet, et une droite parallèle au troisième côté.\n\n" +
      "Méthode : on identifie ces trois éléments.\n\n" +
      "Calcul : par exemple M sur [AB], N sur [AC], (MN) // (BC).\n\n" +
      "Conclusion : triangle + points sur deux côtés + parallèle au troisième côté.",
    tags: ["thales_theoreme_theoreme", "configuration", "open"],
  },

  // ---------- THALES_RAPPORTS ----------
  {
    kind: "fixed",
    id: "thales_theoreme_rapport_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une configuration de Thalès, à quoi est égal AN / AC ?",
    format: "qcm",
    choices: ["AM / AB", "AB / AM", "AC / AN", "BC / MN"],
    expected: ["AM / AB"],
    comparator: "mcq_exact",
    hint: "Les longueurs correspondantes sont sur les mêmes demi-droites.",
    explanation:
      "Définition : Thalès donne AM / AB = AN / AC = MN / BC.\n\n" +
      "Méthode : on associe les longueurs correspondantes.\n\n" +
      "Calcul : AN / AC = AM / AB.\n\n" +
      "Conclusion : AN / AC = AM / AB.",
    tags: ["thales_theoreme_theoreme", "rapport", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_rapport_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une configuration de Thalès, à quoi est égal MN / BC ?",
    format: "qcm",
    choices: ["AM / AB", "AB / AM", "BC / MN", "AN / MN"],
    expected: ["AM / AB"],
    comparator: "mcq_exact",
    hint: "MN et BC sont les côtés « parallèles ».",
    explanation:
      "Définition : Thalès donne AM / AB = AN / AC = MN / BC.\n\n" +
      "Méthode : MN / BC complète la chaîne des rapports égaux.\n\n" +
      "Calcul : MN / BC = AM / AB.\n\n" +
      "Conclusion : MN / BC = AM / AB.",
    tags: ["thales_theoreme_theoreme", "rapport", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_rapport_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de rapports égaux écrit-on dans le théorème de Thalès ?",
    format: "qcm",
    choices: ["trois", "deux", "un", "quatre"],
    expected: ["trois"],
    comparator: "mcq_exact",
    hint: "AM/AB = AN/AC = MN/BC.",
    explanation:
      "Définition : Thalès écrit trois rapports égaux : AM/AB = AN/AC = MN/BC.\n\n" +
      "Méthode : on compte les rapports.\n\n" +
      "Calcul : il y en a trois.\n\n" +
      "Conclusion : trois rapports égaux.",
    tags: ["thales_theoreme_theoreme", "rapport", "qcm"],
  },
  {
    kind: "template",
    id: "thales_theoreme_rapport_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 2,
    theme: "neutral",
    hint: "Associe les longueurs correspondantes.",
    tags: ["thales_theoreme_theoreme", "rapport", "template"],
    // 03/10/2026 : ne fabriquait qu'UN énoncé. Quelle égalité est juste (genRapportEgalite).
    generate: genRapportEgalite,
  },
  {
    kind: "template",
    id: "thales_theoreme_rapport_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Petit côté / grand côté sur chaque demi-droite.",
    tags: ["thales_theoreme_theoreme", "rapport", "template"],
    // 03/10/2026 : longueurs décimales, n'importe quelle paire de rapports
    // (genRapportNombres). ⛔ Toujours pas de piège « a/c = b/d », égalité VRAIE.
    generate: () => genRapportNombres(false),
  },
  {
    kind: "template",
    id: "thales_theoreme_rapport_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le rapport qui ne respecte PAS Thalès.",
    tags: ["thales_theoreme_theoreme", "rapport", "piege", "template"],
    // 03/10/2026 : ne fabriquait qu'UN énoncé. Cinq intrus possibles (genRapportIntrus).
    generate: genRapportIntrus,
  },
  {
    kind: "fixed",
    id: "thales_theoreme_rapport_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rapport",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le triangle ABC, M ∈ [AB], N ∈ [AC] et (MN) // (BC). Comment associe-t-on les longueurs dans l’égalité de Thalès ?",
    format: "qcm",
    choices: [
      "AM avec AC, AN avec AB, MN avec BC",
      "AM avec BC, AN avec AB, MN avec AC",
      "dans n’importe quel ordre : le résultat est le même",
      "AM avec AB, AN avec AC, MN avec BC : chaque longueur du petit triangle avec celle qui lui correspond dans le grand",
    ],
    expected: ["AM avec AB, AN avec AC, MN avec BC : chaque longueur du petit triangle avec celle qui lui correspond dans le grand"],
    comparator: "mcq_exact",
    hint: "Les longueurs d’une même demi-droite vont ensemble.",
    explanation:
      "Définition : on compare les longueurs correspondantes des deux demi-droites issues du sommet.\n\n" +
      "Méthode : AM et AB sur la même demi-droite, AN et AC sur l’autre.\n\n" +
      "Calcul : on écrit AM/AB = AN/AC, et MN/BC pour les côtés parallèles.\n\n" +
      "Conclusion : on associe les longueurs correspondantes demi-droite par demi-droite.",
    tags: ["thales_theoreme_theoreme", "rapport", "open"],
  },

  // ---------- THALES_CALCULER_LONGUEUR ----------
  {
    kind: "fixed",
    id: "thales_theoreme_calculer_longueur_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une configuration de Thalès, AM = 2 cm, AB = 6 cm et AN = 3 cm. Quelle est AC ?",
    format: "qcm",
    choices: ["9 cm", "6 cm", "12 cm", "4 cm"],
    expected: ["9 cm"],
    comparator: "mcq_exact",
    hint: "2/6 = 3/AC.",
    explanation:
      "Définition : Thalès donne AM/AB = AN/AC.\n\n" +
      "Méthode : 2/6 = 1/3, donc le coefficient de AB à AM est 3.\n\n" +
      "Calcul : AC = 3 × 3 = 9 cm.\n\n" +
      "Conclusion : AC = 9 cm.",
    canvas: thalesCanvas({
      sideLabels: { AM: "2 cm", AB: "6 cm", AN: "3 cm", AC: "?" },
      display: { showPoints: true, showLabels: true, showSideLabels: true, showParallelMarks: true },
    }),
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "qcm", "canvas"],
  },
  {
    kind: "template",
    id: "thales_theoreme_calculer_longueur_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "Les deux côtés parallèles se correspondent : le rapport est le même que pour les autres côtés.",
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "template", "canvas"],
    // 03/10/2026 : le côté parallèle (genCalcul). ⚠️ Le canvas d'avant n'affichait
    // pas MN alors que l'énoncé la donnait : il reçoit maintenant les trois longueurs connues.
    generate: () => genCalcul(["BC", "MN"], true),
  },
  {
    kind: "template",
    id: "thales_theoreme_calculer_longueur_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "On cherche une longueur du grand triangle : utilise le coefficient d’agrandissement.",
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "template"],
    // 03/10/2026 : une grande longueur, nommage + situation (genCalcul).
    generate: () => genCalcul(["AB", "AC", "BC"], true),
  },
  {
    kind: "template",
    id: "thales_theoreme_calculer_longueur_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris l’égalité des rapports, puis calcule la quatrième proportionnelle (produit en croix).",
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "quatrieme_proportionnelle", "template"],
    // 03/10/2026 : quatrième proportionnelle, coefficient décimal (genCalcul).
    generate: () => genCalcul(["AC", "AB", "BC", "AM", "AN", "MN"], false),
  },
  {
    kind: "fixed",
    id: "thales_theoreme_calculer_longueur_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une configuration de Thalès, AM = 5 cm, AB = 15 cm et AN = 4 cm. Calculer AC.",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Le coefficient est 15 ÷ 5 = 3.",
    explanation:
      "Définition : Thalès donne AM/AB = AN/AC.\n\n" +
      "Méthode : le coefficient de AM à AB est 3.\n\n" +
      "Calcul : AC = 4 × 3 = 12 cm.\n\n" +
      "Conclusion : AC = 12 cm.",
    tags: ["thales_theoreme_theoreme", "calculer_longueur"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_calculer_longueur_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le triangle ABC, M ∈ [AB], N ∈ [AC] et (MN) // (BC). On donne AM = 3 cm, AB = 9 cm et AN = 5 cm. Combien mesure AC ?",
    format: "short",
    expected: ["15 cm"],
    comparator: "number_equal",
    hint: "Écris l’égalité des rapports puis isole AC.",
    explanation:
      "Définition : Thalès donne AM/AB = AN/AC.\n\n" +
      "Méthode : 3/9 = 1/3, donc le coefficient est 3.\n\n" +
      "Calcul : AC = 5 × 3 = 15.\n\n" +
      "Conclusion : AC = 15.",
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "open"],
  },

  // ---------- THALES_RECIPROQUE_VERIFIER ----------
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_verifier_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "On a AM = 2, AB = 5, AN = 4, AC = 10. Les rapports AM/AB et AN/AC sont-ils égaux ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare 2/5 et 4/10.",
    explanation:
      "Définition : on compare les deux rapports.\n\n" +
      "Méthode : on simplifie 4/10.\n\n" +
      "Calcul : 2/5 = 0,4 et 4/10 = 0,4. Égaux.\n\n" +
      "Conclusion : oui, les rapports sont égaux.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_verifier_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "On a AM = 3, AB = 5, AN = 4, AC = 7. Les rapports AM/AB et AN/AC sont-ils égaux ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare 3/5 et 4/7 par produit en croix.",
    explanation:
      "Définition : on compare par produit en croix.\n\n" +
      "Méthode : 3 × 7 = 21 et 5 × 4 = 20.\n\n" +
      "Calcul : 21 ≠ 20, donc les rapports diffèrent.\n\n" +
      "Conclusion : non, ils ne sont pas égaux.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_verifier_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Pour utiliser la réciproque de Thalès, quelle condition sur les points faut-il aussi vérifier ?",
    format: "qcm",
    choices: [
      "que les points soient alignés dans le même ordre",
      "que le triangle soit isocèle",
      "qu’il y ait un angle droit",
      "que les longueurs soient entières",
    ],
    expected: ["que les points soient alignés dans le même ordre"],
    comparator: "mcq_exact",
    hint: "L’alignement et l’ordre comptent.",
    explanation:
      "Définition : la réciproque exige l’égalité des rapports ET un alignement dans le même ordre.\n\n" +
      "Méthode : on vérifie la position des points A, M, B et A, N, C.\n\n" +
      "Calcul : les points doivent être alignés dans le même ordre.\n\n" +
      "Conclusion : il faut vérifier l’ordre d’alignement.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_verifier_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Pour appliquer la réciproque de Thalès, quels rapports compare-t-on ?",
    format: "qcm",
    choices: ["AM/AB et AN/AC", "AM/AN et AB/AC", "AB/MN et AC/BC", "AM/MN et AN/BC"],
    expected: ["AM/AB et AN/AC"],
    comparator: "mcq_exact",
    hint: "Les longueurs correspondantes sur chaque demi-droite.",
    explanation:
      "Définition : on compare les rapports des longueurs correspondantes.\n\n" +
      "Méthode : AM/AB sur une demi-droite, AN/AC sur l’autre.\n\n" +
      "Calcul : on compare AM/AB et AN/AC.\n\n" +
      "Conclusion : on compare AM/AB et AN/AC.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "qcm"],
  },
  {
    kind: "template",
    id: "thales_theoreme_reciproque_verifier_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare par produit en croix.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "template"],
    // 03/10/2026 : nommage + situation + tournure ; produit en croix (genRecipVerifier).
    generate: () => genRecipVerifier(true, "croix"),
  },
  {
    kind: "template",
    id: "thales_theoreme_reciproque_verifier_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule chaque rapport sous forme décimale.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "template"],
    // 03/10/2026 : longueurs décimales, écart d'un cran quand les rapports
    // diffèrent (genRecipVerifier). ⚠️ L'ancien corps tirait AC = 4 × 10 ÷ 3,
    // soit 13,333… affiché en entier : le tirage n'était pas toujours juste.
    generate: () => genRecipVerifier(false, "croix"),
  },
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_verifier_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "Pour vérifier que AM/AB = AN/AC avec le produit en croix, quels produits compare-t-on ?",
    format: "qcm",
    choices: ["AM × AB et AN × AC", "AM × AC et AB × AN", "AM × AN et AB × AC", "AM + AC et AB + AN"],
    expected: ["AM × AC et AB × AN"],
    comparator: "mcq_exact",
    hint: "On multiplie en croix et on compare.",
    explanation:
      "Définition : deux rapports a/b et c/d sont égaux si a × d = b × c.\n\n" +
      "Méthode : on multiplie en croix.\n\n" +
      "Calcul : si les produits sont égaux, les rapports le sont aussi.\n\n" +
      "Conclusion : on compare les produits en croix.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "open"],
  },

  // ---------- THALES_RECIPROQUE_CONCLURE ----------
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_conclure_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Les rapports AM/AB et AN/AC sont égaux et les points sont alignés dans le même ordre. Que peut-on conclure ?",
    format: "qcm",
    choices: ["(MN) est parallèle à (BC)", "(MN) est perpendiculaire à (BC)", "ABC est isocèle", "rien"],
    expected: ["(MN) est parallèle à (BC)"],
    comparator: "mcq_exact",
    hint: "C’est la réciproque de Thalès.",
    explanation:
      "Définition : la réciproque conclut au parallélisme.\n\n" +
      "Méthode : rapports égaux + bon ordre d’alignement.\n\n" +
      "Calcul : les conditions sont réunies.\n\n" +
      "Conclusion : (MN) est parallèle à (BC).",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_conclure_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Les rapports AM/AB et AN/AC ne sont pas égaux. Que peut-on conclure ?",
    format: "qcm",
    choices: [
      "(MN) n’est pas parallèle à (BC)",
      "(MN) est parallèle à (BC)",
      "ABC est rectangle",
      "M est le milieu de [AB]",
    ],
    expected: ["(MN) n’est pas parallèle à (BC)"],
    comparator: "mcq_exact",
    hint: "Sans égalité des rapports, pas de parallélisme.",
    explanation:
      "Définition : si les rapports diffèrent, les droites ne sont pas parallèles.\n\n" +
      "Méthode : on applique la contraposée de la réciproque.\n\n" +
      "Calcul : rapports différents ⇒ pas de parallélisme.\n\n" +
      "Conclusion : (MN) n’est pas parallèle à (BC).",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_conclure_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Quel outil permet de DÉMONTRER que deux droites sont parallèles ?",
    format: "qcm",
    choices: [
      "la réciproque du théorème de Thalès",
      "le théorème de Thalès direct",
      "le théorème de Pythagore",
      "la somme des angles",
    ],
    expected: ["la réciproque du théorème de Thalès"],
    comparator: "mcq_exact",
    hint: "Démontrer un parallélisme = réciproque.",
    explanation:
      "Définition : la réciproque de Thalès démontre le parallélisme.\n\n" +
      "Méthode : on vérifie l’égalité des rapports.\n\n" +
      "Calcul : si les rapports sont égaux, on conclut au parallélisme.\n\n" +
      "Conclusion : c’est la réciproque du théorème de Thalès.",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_conclure_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "AM/AB = AN/AC = 0,5 et les points sont bien alignés. La conclusion correcte est :",
    format: "qcm",
    choices: [
      // ⚠️ Ne PAS écrire « AM/AN = AB/AC » comme piège : l'égalité est vraie
      // (produit en croix), on aurait deux bonnes réponses. Même prudence pour
      // « MN = 0,5 × BC », vrai une fois le parallélisme établi.
      "(MN) // (BC) d’après la réciproque de Thalès",
      "(MN) // (BC) d’après le théorème de Thalès",
      "(AB) // (AC) d’après la réciproque de Thalès",
      "les triangles AMN et ABC ont le même périmètre",
    ],
    expected: ["(MN) // (BC) d’après la réciproque de Thalès"],
    comparator: "mcq_exact",
    hint: "Les rapports égaux donnent le parallélisme.",
    explanation:
      "Définition : rapports égaux + bon ordre ⇒ parallélisme.\n\n" +
      "Méthode : on cite la réciproque de Thalès.\n\n" +
      "Calcul : les deux rapports valent 0,5.\n\n" +
      "Conclusion : (MN) // (BC) d’après la réciproque de Thalès.",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure", "qcm"],
  },
  {
    kind: "template",
    id: "thales_theoreme_reciproque_conclure_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie les rapports avant de conclure.",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure", "template"],
    // 03/10/2026 : nommage + situation + longueurs décimales (genConclure).
    generate: () => genConclure(false),
  },
  {
    kind: "template",
    id: "thales_theoreme_reciproque_conclure_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    hint: "Rapports égaux ⇒ parallèle ; sinon non.",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure", "template"],
    // 03/10/2026 : QCM de conclusion, nommage + situation (genConclure). ⚠️ L'ancien
    // corps tirait AC = 5 × 8 ÷ 3, soit 13,333… : le tirage n'était pas toujours juste.
    generate: () => genConclure(true),
  },
  {
    kind: "fixed",
    id: "thales_theoreme_reciproque_conclure_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    text: "Avec la réciproque du théorème de Thalès (M ∈ [AB], N ∈ [AC]), que conclut-on, et à quelle condition ?",
    format: "qcm",
    choices: [
      "AM/AB = AN/AC, si (MN) // (BC)",
      "(MN) // (BC), si AM/AB = AN/AC et si les points sont alignés dans le même ordre",
      "le triangle ABC est rectangle, si AM/AB = AN/AC",
      "(MN) est perpendiculaire à (BC), si AM/AB = AN/AC",
    ],
    expected: ["(MN) // (BC), si AM/AB = AN/AC et si les points sont alignés dans le même ordre"],
    comparator: "mcq_exact",
    hint: "Condition = rapports égaux ; conclusion = parallélisme.",
    explanation:
      "Définition : la réciproque conclut au parallélisme.\n\n" +
      "Méthode : la condition est l’égalité des rapports (avec bon alignement).\n\n" +
      "Calcul : si AM/AB = AN/AC, alors (MN) // (BC).\n\n" +
      "Conclusion : rapports égaux ⇒ droites parallèles.",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure", "open"],
  },

  // ---------- THALES_REDIGER ----------
  {
    kind: "fixed",
    id: "thales_theoreme_rediger_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Dans une rédaction de Thalès, quelle est la dernière étape ?",
    format: "qcm",
    choices: [
      "écrire l’égalité des rapports puis calculer la longueur cherchée",
      "vérifier que les droites sont parallèles puis nommer les points",
      "mesurer les longueurs sur la figure puis contrôler au rapporteur",
      "écrire l’égalité des aires puis calculer la longueur cherchée",
    ],
    expected: ["écrire l’égalité des rapports puis calculer la longueur cherchée"],
    comparator: "mcq_exact",
    hint: "On finit par le calcul de la longueur.",
    explanation:
      "Définition : la rédaction se termine par le calcul de la longueur cherchée.\n\n" +
      "Méthode : configuration → égalité des rapports → calcul.\n\n" +
      "Calcul : on isole la longueur cherchée.\n\n" +
      "Conclusion : la dernière étape est le calcul à partir de l’égalité des rapports.",
    tags: ["thales_theoreme_theoreme", "redaction", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_rediger_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la bonne suite d’étapes pour rédiger avec Thalès ?",
    format: "qcm",
    choices: [
      "préciser la configuration et le parallélisme, écrire les rapports, calculer",
      "calculer la longueur cherchée, écrire les rapports, vérifier le parallélisme",
      "écrire les rapports, préciser le parallélisme, mesurer sur la figure",
      "préciser la configuration, mesurer les angles, conclure sans calcul",
    ],
    expected: ["préciser la configuration et le parallélisme, écrire les rapports, calculer"],
    comparator: "mcq_exact",
    hint: "On part de la configuration et on finit par le calcul.",
    explanation:
      "Définition : la rédaction suit un ordre logique.\n\n" +
      "Méthode : configuration + parallélisme, puis égalité des rapports, puis calcul.\n\n" +
      "Calcul : c’est l’enchaînement attendu.\n\n" +
      "Conclusion : configuration → rapports → calcul.",
    tags: ["thales_theoreme_theoreme", "redaction", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_rediger_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi doit-on mentionner le parallélisme dans la rédaction de Thalès ?",
    format: "qcm",
    choices: [
      "car c’est la condition qui permet d’appliquer le théorème",
      "car c’est la conclusion que le théorème permet d’obtenir",
      "car c’est ce qui prouve que les longueurs sont égales",
      "car c’est la propriété qui donne le coefficient de réduction",
    ],
    expected: ["car c’est la condition qui permet d’appliquer le théorème"],
    comparator: "mcq_exact",
    hint: "Le parallélisme est l’hypothèse de Thalès.",
    explanation:
      "Définition : le parallélisme est l’hypothèse du théorème de Thalès.\n\n" +
      "Méthode : on justifie l’application du théorème.\n\n" +
      "Calcul : sans parallélisme, l’égalité des rapports n’est pas garantie.\n\n" +
      "Conclusion : on mentionne le parallélisme car c’est la condition d’application.",
    tags: ["thales_theoreme_theoreme", "redaction", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_rediger_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Dans quel ordre rédige-t-on le calcul d’une longueur avec le théorème de Thalès ?",
    format: "qcm",
    choices: [
      "le calcul, puis l’égalité des rapports, puis la configuration",
      "l’égalité des rapports, puis le calcul, sans citer le parallélisme",
      "la configuration, puis le calcul, puis la réciproque du théorème",
      "la configuration et le parallélisme, puis l’égalité des rapports, puis le calcul",
    ],
    expected: ["la configuration et le parallélisme, puis l’égalité des rapports, puis le calcul"],
    comparator: "mcq_exact",
    hint: "Trois étapes : configuration, rapports, calcul.",
    explanation:
      "Définition : une rédaction comporte trois étapes.\n\n" +
      "Méthode : 1) préciser la configuration et le parallélisme ; 2) écrire l’égalité des rapports ; 3) calculer.\n\n" +
      "Calcul : on isole la longueur cherchée à la dernière étape.\n\n" +
      "Conclusion : configuration → rapports → calcul.",
    tags: ["thales_theoreme_theoreme", "redaction", "open"],
  },
  {
    kind: "template",
    id: "thales_theoreme_rediger_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris l’égalité des rapports adaptée aux longueurs données.",
    tags: ["thales_theoreme_theoreme", "redaction", "template"],
    // 03/10/2026 : nommage + situation + longueur cherchée variable (genRedigerOuvert).
    generate: () => genRedigerOuvert("egalite"),
  },
  {
    kind: "template",
    id: "thales_theoreme_rediger_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "Annonce la configuration puis l’égalité des rapports.",
    tags: ["thales_theoreme_theoreme", "redaction", "template"],
    // 03/10/2026 : rédaction complète, nommage + situation (genRedigerOuvert).
    generate: () => genRedigerOuvert("raisonnement"),
  },

  // ---------- THALES_DEFIS ----------
  {
    kind: "fixed",
    id: "thales_theoreme_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un poteau de 2 m projette une ombre de 3 m. Au même moment, un arbre projette une ombre de 12 m. En utilisant Thalès, quelle est la hauteur de l’arbre ?",
    format: "qcm",
    choices: ["8 m", "6 m", "18 m", "24 m"],
    expected: ["8 m"],
    comparator: "mcq_exact",
    hint: "Le coefficient des ombres est 12 ÷ 3 = 4.",
    explanation:
      "Définition : les rayons du soleil forment une configuration de Thalès.\n\n" +
      "Méthode : le coefficient des ombres est 12 ÷ 3 = 4.\n\n" +
      "Calcul : hauteur = 2 × 4 = 8 m.\n\n" +
      "Conclusion : l’arbre mesure 8 m.",
    tags: ["thales_theoreme_theoreme", "defi", "ombre", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève applique Thalès sans vérifier le parallélisme. Son raisonnement est-il valable ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le parallélisme est obligatoire.",
    explanation:
      "Définition : Thalès exige le parallélisme.\n\n" +
      "Méthode : on vérifie d’abord la condition.\n\n" +
      "Calcul : sans parallélisme, l’égalité des rapports n’est pas justifiée.\n\n" +
      "Conclusion : non, le raisonnement n’est pas valable.",
    tags: ["thales_theoreme_theoreme", "defi", "erreur", "qcm"],
  },
  {
    kind: "fixed",
    id: "thales_theoreme_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 4,
    theme: "neutral",
    text: "À quoi sert principalement la réciproque de Thalès dans un problème ?",
    format: "qcm",
    choices: [
      "à démontrer que deux droites sont parallèles",
      "à démontrer que deux droites sont perpendiculaires",
      "à calculer une longueur dans un triangle coupé",
      "à démontrer que trois points sont alignés",
    ],
    expected: ["à démontrer que deux droites sont parallèles"],
    comparator: "mcq_exact",
    hint: "Réciproque = preuve de parallélisme.",
    explanation:
      "Définition : la réciproque de Thalès démontre un parallélisme.\n\n" +
      "Méthode : on compare les rapports.\n\n" +
      "Calcul : rapports égaux ⇒ parallèle.\n\n" +
      "Conclusion : elle sert à démontrer le parallélisme.",
    tags: ["thales_theoreme_theoreme", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "thales_theoreme_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le coefficient des ombres s’applique à la hauteur.",
    tags: ["thales_theoreme_theoreme", "defi", "ombre", "template"],
    // 03/10/2026 : dix grands objets, six petits, hauteur OU ombre cherchée,
    // parfois en cm à convertir (genDefiOmbre).
    generate: genDefiOmbre,
  },
  {
    kind: "template",
    id: "thales_theoreme_defi_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Utilise le coefficient d’agrandissement.",
    tags: ["thales_theoreme_theoreme", "defi", "agrandissement", "template"],
    // 03/10/2026 : agrandissement ou réduction, objet réel ou figure (genDefiCoefficient).
    generate: genDefiCoefficient,
  },
  {
    kind: "fixed",
    id: "thales_theoreme_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un bâton vertical de 1 m a une ombre de 2 m. Au même moment, l’ombre d’un arbre mesure 16 m. Quelle est la hauteur de l’arbre, en m ?",
    format: "short",
    expected: ["8 m"],
    comparator: "number_equal",
    hint: "On compare l’ombre d’un objet connu et celle de l’arbre.",
    explanation:
      "Définition : les rayons du soleil créent des triangles semblables (configuration de Thalès).\n\n" +
      "Méthode : on compare l’ombre d’un objet de hauteur connue à celle de l’arbre.\n\n" +
      "Calcul : hauteur arbre ÷ ombre arbre = hauteur objet ÷ ombre objet.\n\n" +
      "Conclusion : la proportionnalité des ombres donne la hauteur de l’arbre.",
    tags: ["thales_theoreme_theoreme", "defi", "open"],
  },

  /* =========================================================
     03/10/2026 — DES GÉNÉRATEURS AUX ÉTOILES QUI N'AVAIENT QUE DU FIGÉ
     (configuration ★1, calculer ★2, vérifier ★2, conclure ★3, rédiger ★3,
     défi ★4) ou un seul gabarit (vérifier ★4). Sans eux, l'élève revoyait
     les quatre ou cinq mêmes items figés en boucle.
  ========================================================= */

  {
    kind: "template",
    id: "thales_theoreme_configuration_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_configuration",
    difficulty: 1,
    theme: "neutral",
    hint: "Repère le sommet commun, les deux points sur les côtés et les deux droites parallèles.",
    tags: ["thales_theoreme_theoreme", "configuration", "template", "canvas"],
    generate: genConfigElements,
  },
  {
    kind: "template",
    id: "thales_theoreme_calculer_longueur_tpl_7",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 2,
    theme: "neutral",
    hint: "Écris l’égalité des rapports (petite longueur sur grande longueur), puis utilise le coefficient.",
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "qcm", "template", "canvas"],
    generate: () => genCalcul(["AC", "AB", "AN", "AM"], true, true),
  },
  {
    kind: "template",
    id: "thales_theoreme_calculer_longueur_tpl_8",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_calculer_longueur",
    difficulty: 2,
    theme: "neutral",
    hint: "Le côté parallèle du petit triangle correspond au côté parallèle du grand.",
    tags: ["thales_theoreme_theoreme", "calculer_longueur", "qcm", "template", "canvas"],
    generate: () => genCalcul(["BC", "MN"], true, true),
  },
  {
    kind: "template",
    id: "thales_theoreme_reciproque_verifier_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    hint: "On compare les longueurs prises sur chacune des deux demi-droites issues du sommet commun.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "template", "canvas"],
    generate: genRecipRapports,
  },
  {
    kind: "template",
    id: "thales_theoreme_reciproque_verifier_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_verifier",
    difficulty: 4,
    theme: "neutral",
    hint: "Convertis d’abord toutes les longueurs dans la même unité.",
    tags: ["thales_theoreme_theoreme", "reciproque", "verifier", "unites", "template", "canvas"],
    generate: genRecipUnites,
  },
  {
    kind: "template",
    id: "thales_theoreme_reciproque_conclure_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    hint: "Rapports égaux : droites parallèles. Rapports différents : pas parallèles.",
    tags: ["thales_theoreme_theoreme", "reciproque", "conclure", "qcm", "template", "canvas"],
    generate: genConclureQcm,
  },
  {
    kind: "template",
    id: "thales_theoreme_rediger_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_rediger",
    difficulty: 3,
    theme: "neutral",
    hint: "Théorème pour calculer une longueur, réciproque pour démontrer un parallélisme.",
    tags: ["thales_theoreme_theoreme", "redaction", "qcm", "template", "canvas"],
    generate: genRedigerQcm,
  },
  {
    kind: "template",
    id: "thales_theoreme_defi_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Repère le triangle et la pièce parallèle, puis écris l’égalité des rapports.",
    tags: ["thales_theoreme_theoreme", "defi", "objet_reel", "qcm", "template"],
    generate: () => genDefiObjet(["AC", "AB", "MN", "BC", "AM", "AN"], true, true),
  },
  {
    kind: "template",
    id: "thales_theoreme_defi_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "thales_theoreme",
    microId: "thales_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Au même instant, hauteurs et ombres sont proportionnelles.",
    tags: ["thales_theoreme_theoreme", "defi", "ombre", "template"],
    generate: genDefiOmbre,
  },
];