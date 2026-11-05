// ÉQUATIONS DU TYPE x² = a (05/11/2026).
//
// Trou du programme de cycle 4 (BO 2020, p. 132, évalué au brevet) : le dépôt ne
// posait aucune équation x² = a ; √ n'existait que comme méthode de calcul d'une
// racine, avec une seule solution. Deux micros :
//   - equation_carre_egal_a : deux solutions ±√a, une si a = 0, aucune si a < 0 ;
//   - equation_carre_factoriser : x² − 9 = 0 et (x − 2)² = 25, par a² − b².
//
// ⛔ Règles du collège : ★1-★2 phrase courte, sans prénom ni contexte ; contexte à
// partir de ★3. ⚠️ Pour le correcteur : une équation s'écrit toujours avec ses
// espaces (« x² − 5 = 20 »), le moins est « − » et les mesures gardent leur unité.

import type { TutorBankItemV4, FonctionGraphiqueCanvasData, DifficultyLevel } from "@/lib/tutor-v4/types";

const entre = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const un = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
const melange = <T,>(l: T[]): T[] => l.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
const pgcd = (a: number, b: number): number => (b ? pgcd(b, a % b) : Math.abs(a));

const fr = (n: number) => String(Math.round(n * 1000) / 1000).replace(".", ",").replace("-", "−");
const LETTRES = ["x", "x", "x", "y", "t", "z", "u"] as const;
const lettre = () => un(LETTRES);

/** « x = 7 ou x = −7 » : la solution positive d'abord, sauf si le gabarit en décide autrement. */
const deuxSol = (L: string, s: string) => `${L} = ${s} ou ${L} = −${s}`;
const AUCUNE = "aucune solution";

function qcm(juste: string, faux: string[]) {
  const d = melange([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  return melange([juste, ...d]);
}
const expl = (def: string, meth: string, calc: string, concl: string) =>
  `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;

const DEF_CARRE = "un carré n’est jamais négatif ; deux nombres opposés ont le même carré.";
const DEF_SIGNES = "si a > 0, x² = a a deux solutions, √a et −√a ; si a = 0, une seule, 0 ; si a < 0, aucune.";
const DEF_AB = "a² − b² = (a − b)(a + b), et un produit est nul si l’un de ses facteurs est nul.";

const NON_CARRES = [2, 3, 5, 6, 7, 8, 10, 11, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 26, 29, 30, 31, 33, 35, 37, 41, 43, 47, 50] as const;

/** La courbe de y = x² et la droite y = a : on compte les points communs. */
function figParabole(a: number): FonctionGraphiqueCanvasData {
  const haut = Math.max(a, 9) + 2;
  return {
    kind: "fonctionGraphique",
    titre: `La courbe y = x² et la droite y = ${fr(a)}`,
    size: { width: 320, height: 280 },
    xmin: -5,
    xmax: 5,
    ymin: a < 0 ? a - 2 : -2,
    ymax: haut,
    grille: true,
    courbes: [{ id: "carre", type: "quadratique", a: 1, b: 0, c: 0, couleur: "#2563eb" }],
    misesEnEvidence: [{ horizontale: { y: a, couleur: "#dc2626" } }],
  };
}

/** Ce que dit le signe de a, pour une explication. */
function resolution(L: string, a: number) {
  if (a < 0) return { n: 0, calc: `${L}² = ${fr(a)} : ce nombre est négatif, or un carré ne l’est jamais.`, concl: "l’équation n’a aucune solution." };
  if (a === 0) return { n: 1, calc: `seul 0 a pour carré 0.`, concl: `l’équation a une seule solution, ${L} = 0.` };
  const r = Math.sqrt(a);
  const s = Number.isInteger(r) ? String(r) : `√${a}`;
  const c = Number.isInteger(r) ? `${r} × ${r} = ${a} et (−${r}) × (−${r}) = ${a}.` : `${a} n’est pas un carré parfait : on garde l’écriture avec √.`;
  return { n: 2, calc: c, concl: `les solutions sont ${L} = ${s} et ${L} = −${s}.` };
}

const NOTION = "equation_resolution";
const tpl = (
  micro: "equation_carre_egal_a" | "equation_carre_factoriser",
  n: number,
  difficulty: DifficultyLevel,
  hint: string,
  generate: () => any,
): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `3e_${micro}_tpl_${n}`,
    niveau: "3e",
    matiere: "maths",
    notionId: NOTION,
    microId: micro,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["equation", micro === "equation_carre_egal_a" ? "carre" : "factoriser", "template"],
    generate,
  }) as TutorBankItemV4;

const MICRO_A = "equation_carre_egal_a";
const MICRO_F = "equation_carre_factoriser";

/* ───────────────────────── contextes (★3 et plus) ───────────────────────── */

const CARRES_CTX = [
  { o: "Un potager carré", u: "m" },
  { o: "Une nappe carrée", u: "dm" },
  { o: "Une dalle carrée", u: "dm" },
  { o: "Un tapis de judo carré", u: "m" },
  { o: "Une salle de classe carrée", u: "m" },
  { o: "Une photo carrée", u: "cm" },
  { o: "Un capteur d’appareil photo carré", u: "mm" },
  { o: "Un panneau solaire carré", u: "dm" },
  { o: "Une parcelle de vigne carrée", u: "m" },
  { o: "Un échiquier", u: "cm" },
  { o: "Une piste de danse carrée", u: "m" },
  { o: "Un bassin carré", u: "m" },
  { o: "Une tuile carrée", u: "cm" },
  { o: "Une case de bande dessinée carrée", u: "cm" },
];
const PRENOMS = ["Inès", "Noah", "Maëlle", "Yanis", "Chloé", "Sacha", "Lina", "Tom"] as const;

/* Une grandeur liée au carré d'une autre : la physique et la vie courante. */
type Formule = { texte: (v: number) => string[]; k: number; unite: string; uDonnee: string };
const FORMULES: Formule[] = [
  {
    k: 5, unite: "s", uDonnee: "m",
    texte: (v) => [
      `Un objet tombe de ${fr(v)} m. La distance de chute en mètres vaut d = 5 × t², avec t en secondes. Combien de temps dure la chute ?`,
      `Un plongeur saute de ${fr(v)} m. On admet que d = 5 × t² (d en mètres, t en secondes). Quelle est la durée du saut ?`,
    ],
  },
  {
    k: 4, unite: "A", uDonnee: "W",
    texte: (v) => [
      `Une résistance dissipe ${fr(v)} W. La puissance en watts vaut P = 4 × I², avec I en ampères. Quelle est l’intensité I ?`,
      `Dans un radiateur, P = 4 × I² (P en watts, I en ampères). Il consomme ${fr(v)} W. Que vaut l’intensité I ?`,
    ],
  },
  {
    k: 2, unite: "m", uDonnee: "m²",
    texte: (v) => [
      `Le toit d’un abri a deux pans carrés de côté c. Son aire est ${fr(v)} m², soit 2 × c². Quelle est la longueur c ?`,
      `Un drapeau est fait de deux carrés identiques de côté c. Son aire vaut ${fr(v)} m², donc 2 × c² = ${fr(v)}. Combien mesure c ?`,
    ],
  },
  {
    k: 3, unite: "cm", uDonnee: "cm²",
    texte: (v) => [
      `Une mosaïque compte 3 carreaux carrés de côté c. Son aire est ${fr(v)} cm², soit 3 × c². Combien mesure c ?`,
      `Un vitrail est fait de 3 carrés de côté c. Son aire totale vaut ${fr(v)} cm², donc 3 × c² = ${fr(v)}. Que vaut c ?`,
    ],
  },
];

const SOLIDES_K = [
  { o: "Une boîte de chocolats", pave: true, u: "cm" },
  { o: "Un aquarium", pave: true, u: "dm" },
  { o: "Une tour en carton", pave: true, u: "cm" },
  { o: "Un coffre à jouets", pave: true, u: "dm" },
  { o: "Une canette", pave: false, u: "cm" },
  { o: "Un pot de peinture", pave: false, u: "cm" },
  { o: "Un silo à grains", pave: false, u: "m" },
  { o: "Une colonne de musée", pave: false, u: "dm" },
];

const AGRANDIR = [
  { o: "une photo carrée", u: "cm" },
  { o: "un potager carré", u: "m" },
  { o: "une terrasse carrée", u: "m" },
  { o: "un écran carré", u: "cm" },
  { o: "une nappe carrée", u: "dm" },
  { o: "un tableau carré", u: "dm" },
  { o: "un enclos carré", u: "m" },
  { o: "une affiche carrée", u: "dm" },
  { o: "un bassin carré", u: "m" },
  { o: "une mosaïque carrée", u: "dm" },
];
const RECTANGLES = [
  { o: "Un terrain de volley", u: "m" },
  { o: "Une affiche", u: "dm" },
  { o: "Un tapis de yoga", u: "dm" },
  { o: "Un champ", u: "m" },
  { o: "Une fenêtre", u: "dm" },
  { o: "Un écran", u: "cm" },
  { o: "Une serre", u: "m" },
  { o: "Un carnet", u: "cm" },
];

/* ───────────────────────── equation_carre_egal_a ───────────────────────── */

const ENONCE_RESOUS = (L: string, eq: string) => [
  `Résous ${eq}.`,
  `Quelles sont les solutions de ${eq} ?`,
  `Trouve les solutions de ${eq}.`,
  `Résous l’équation ${eq}.`,
  `${eq}. Que vaut ${L} ?`,
  `Que peut valoir ${L} si ${eq} ?`,
  `Choisis les solutions de ${eq}.`,
  `Quelles valeurs de ${L} vérifient ${eq} ?`,
];

const egalA: TutorBankItemV4[] = [
  // ★1 : carré parfait, le QCM des deux solutions.
  tpl(MICRO_A, 1, 1, "Deux nombres opposés ont le même carré.", () => {
    const L = lettre();
    const r = entre(2, 13);
    const a = r * r;
    const eq = `${L}² = ${a}`;
    const juste = deuxSol(L, String(r));
    return {
      text: un(ENONCE_RESOUS(L, eq)),
      format: "qcm",
      choices: qcm(juste, [`${L} = ${r} seulement`, `${L} = −${r} seulement`, deuxSol(L, fr(a / 2)), deuxSol(L, String(a)), AUCUNE]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_CARRE, `on cherche les nombres dont le carré vaut ${a}.`, `${r} × ${r} = ${a} et (−${r}) × (−${r}) = ${a}.`, `les solutions sont ${L} = ${r} et ${L} = −${r}.`),
    };
  }),

  // ★1 : combien de solutions.
  tpl(MICRO_A, 2, 1, "Regarde le signe du nombre à droite du signe égal.", () => {
    const L = lettre();
    const tirage = Math.random();
    const a = tirage < 0.45 ? un([...NON_CARRES, 4, 9, 16, 25, 36, 49]) : tirage < 0.6 ? 0 : -entre(1, 40);
    const eq = `${L}² = ${fr(a)}`;
    const R = resolution(L, a);
    const text = un([
      `Combien de solutions a ${eq} ?`,
      `Combien de solutions a l’équation ${eq} ?`,
      `${eq} : combien de solutions ?`,
      `Donne le nombre de solutions de ${eq}.`,
      `Quel est le nombre de solutions de ${eq} ?`,
      `L’équation ${eq} a combien de solutions ?`,
    ]);
    const mots = R.n === 2 ? ["deux", "2 solutions", "deux solutions"] : R.n === 1 ? ["une", "une seule", "1 solution", "une solution", "une seule solution"] : ["aucune", "zéro", "0 solution", "aucune solution"];
    return {
      text,
      format: "short",
      expected: [String(R.n), ...mots],
      comparator: "exact_text",
      explanation: expl(DEF_SIGNES, `on regarde le signe de ${fr(a)}.`, R.calc, R.concl),
    };
  }),

  // ★1 : une solution, dite par son signe.
  tpl(MICRO_A, 3, 1, "Cherche le nombre dont le carré vaut ce nombre, puis pense au signe demandé.", () => {
    const L = lettre();
    const r = entre(2, 13);
    const a = r * r;
    const eq = `${L}² = ${a}`;
    const pos = Math.random() < 0.5;
    const mot = pos ? "positive" : "négative";
    const v = pos ? String(r) : `−${r}`;
    const text = un([
      `Donne la solution ${mot} de ${eq}.`,
      `Quelle est la solution ${mot} de ${eq} ?`,
      `${eq}. Quelle est la solution ${mot} ?`,
      `Écris la solution ${mot} de l’équation ${eq}.`,
      `Trouve la solution ${mot} de ${eq}.`,
      `L’équation ${eq} a une solution ${mot}. Laquelle ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [v, `${L} = ${v}`, ...(pos ? [] : [`-${r}`, `${L} = -${r}`])],
      comparator: "exact_text",
      explanation: expl(DEF_CARRE, `on cherche les deux nombres dont le carré vaut ${a}, puis on garde le ${mot === "positive" ? "positif" : "négatif"}.`, `${r} × ${r} = ${a} et (−${r}) × (−${r}) = ${a}.`, `la solution ${mot} est ${v}.`),
    };
  }),

  // ★1 : reconnaître une solution parmi des nombres.
  tpl(MICRO_A, 4, 1, "Calcule le carré de chaque proposition.", () => {
    const L = lettre();
    const r = entre(2, 12);
    const a = r * r;
    const s = Math.random() < 0.5 ? r : -r;
    const eq = `${L}² = ${a}`;
    const faux = [a, -a, 2 * r, -2 * r, r + 1, -(r + 1)].filter((v) => v !== s && v * v !== a);
    const text = un([
      `Lequel de ces nombres est solution de ${eq} ?`,
      `Quel nombre vérifie ${eq} ?`,
      `Quel nombre est solution de l’équation ${eq} ?`,
      `Choisis une solution de ${eq}.`,
      `${eq}. Quel nombre convient ?`,
      `Parmi ces nombres, lequel vérifie ${eq} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(fr(s), faux.map(fr)),
      expected: [fr(s)],
      comparator: "mcq_exact",
      explanation: expl(DEF_CARRE, "on calcule le carré du nombre proposé.", `(${fr(s)}) × (${fr(s)}) = ${a}.`, `${fr(s)} est solution de ${eq}.`),
    };
  }),

  // ★2 : solutions non entières.
  tpl(MICRO_A, 5, 2, "Si le nombre n’est pas un carré parfait, on écrit les solutions avec √.", () => {
    const L = lettre();
    const a = un(NON_CARRES);
    const eq = `${L}² = ${a}`;
    const juste = deuxSol(L, `√${a}`);
    return {
      text: un(ENONCE_RESOUS(L, eq)),
      format: "qcm",
      choices: qcm(juste, [`${L} = √${a} seulement`, deuxSol(L, fr(a / 2)), deuxSol(L, String(a)), AUCUNE]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_SIGNES, `${a} est positif : il y a deux solutions. ${a} n’est pas un carré parfait, on garde √.`, `(√${a})² = ${a} et (−√${a})² = ${a}.`, `les solutions sont ${L} = √${a} et ${L} = −√${a}.`),
    };
  }),

  // ★2 : a négatif ou nul.
  tpl(MICRO_A, 6, 2, "Un carré n’est jamais négatif. Seul 0 a pour carré 0.", () => {
    const L = lettre();
    const nul = Math.random() < 0.25;
    const r = entre(2, 11);
    const a = nul ? 0 : -r * r;
    const eq = `${L}² = ${fr(a)}`;
    const juste = nul ? `${L} = 0` : AUCUNE;
    const faux = nul
      ? [AUCUNE, `${L} = 1 ou ${L} = −1`, `${L} = 0 ou ${L} = 1`]
      : [deuxSol(L, String(r)), `${L} = −${r} seulement`, `${L} = ${r} seulement`];
    const R = resolution(L, a);
    return {
      text: un(ENONCE_RESOUS(L, eq)),
      format: "qcm",
      choices: qcm(juste, faux),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_SIGNES, `on regarde le signe de ${fr(a)}.`, R.calc, R.concl),
    };
  }),

  // ★2 : la figure.
  tpl(MICRO_A, 7, 2, "Compte les points communs à la courbe et à la droite.", () => {
    const tirage = Math.random();
    const a = tirage < 0.5 ? un([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16]) : tirage < 0.65 ? 0 : -entre(1, 6);
    const eq = `x² = ${fr(a)}`;
    const R = resolution("x", a);
    const text = un([
      `Regarde la figure. Combien de solutions a ${eq} ?`,
      `La droite coupe la courbe. Combien de solutions a ${eq} ?`,
      `Lis la figure : combien de solutions a l’équation ${eq} ?`,
      `D’après le graphique, combien de solutions a ${eq} ?`,
      `Compte les points communs. Combien de solutions a ${eq} ?`,
      `Observe la courbe et la droite. Combien de solutions a ${eq} ?`,
      `Avec ce graphique, donne le nombre de solutions de ${eq}.`,
      `Sur ce dessin, combien l’équation ${eq} a-t-elle de solutions ?`,
    ]);
    const mots = R.n === 2 ? ["deux", "2 solutions", "deux solutions"] : R.n === 1 ? ["une", "une seule", "1 solution", "une solution", "une seule solution"] : ["aucune", "zéro", "0 solution", "aucune solution"];
    return {
      text,
      format: "short",
      expected: [String(R.n), ...mots],
      comparator: "exact_text",
      canvas: figParabole(a),
      explanation: expl(
        "les solutions de x² = a sont les abscisses des points communs à la courbe y = x² et à la droite y = a.",
        "on compte les points où la droite coupe la courbe.",
        R.n === 2 ? "la droite coupe la courbe en deux points." : R.n === 1 ? "la droite touche la courbe en un seul point, le sommet." : "la droite passe sous la courbe : aucun point commun.",
        R.concl,
      ),
    };
  }),

  // ★2 : écrire une solution avec √.
  tpl(MICRO_A, 8, 2, "La solution positive de x² = a s’écrit √a.", () => {
    const L = lettre();
    const a = un(NON_CARRES);
    const eq = `${L}² = ${a}`;
    const pos = Math.random() < 0.6;
    const mot = pos ? "positive" : "négative";
    const v = `${pos ? "" : "−"}√${a}`;
    const lettres = [`racine de ${a}`, `racine carrée de ${a}`, `sqrt(${a})`, `rac(${a})`];
    const text = un([
      `Écris la solution ${mot} de ${eq} avec le signe √.`,
      `Donne la solution ${mot} de ${eq}. Utilise √.`,
      `${eq}. Quelle est la solution ${mot} ? Écris-la avec √.`,
      `Avec √, écris la solution ${mot} de l’équation ${eq}.`,
      `Quelle est la valeur exacte de la solution ${mot} de ${eq} ?`,
      `Donne la valeur exacte de la solution ${mot} de ${eq}.`,
    ]);
    return {
      text,
      format: "short",
      expected: [v, `${L} = ${v}`, ...(pos ? lettres : [`-√${a}`, `${L} = -√${a}`, ...lettres.map((x) => `-${x}`), ...lettres.map((x) => `moins ${x}`)])],
      comparator: "exact_text",
      explanation: expl(DEF_SIGNES, `${a} n’est pas un carré parfait : on garde l’écriture avec √.`, `(${pos ? "" : "−"}√${a})² = ${a}.`, `la solution ${mot} est ${v}.`),
    };
  }),

  // ★2 : laquelle de ces équations.
  tpl(MICRO_A, 9, 2, "Regarde le nombre à droite : positif, nul ou négatif.", () => {
    const L = lettre();
    const cas = un(["aucune", "seule", "deux"] as const);
    const p = () => entre(1, 40);
    const p1 = p();
    let p2 = p();
    while (p2 === p1) p2 = p();
    const eqs =
      cas === "aucune"
        ? { j: `${L}² = −${p1}`, f: [`${L}² = ${p1}`, `${L}² = ${p2}`, `${L}² = 0`] }
        : cas === "seule"
          ? { j: `${L}² = 0`, f: [`${L}² = ${p1}`, `${L}² = −${p1}`, `${L}² = ${p2}`] }
          : { j: `${L}² = ${p1}`, f: [`${L}² = 0`, `${L}² = −${p1}`, `${L}² = −${p2}`] };
    const dit = cas === "aucune" ? "n’a aucune solution" : cas === "seule" ? "a une seule solution" : "a deux solutions";
    const text = un([
      `Quelle équation ${dit} ?`,
      `Laquelle de ces équations ${dit} ?`,
      `Parmi ces équations, laquelle ${dit} ?`,
      `Choisis l’équation qui ${dit}.`,
      `Une seule de ces équations ${dit}. Laquelle ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: melange([eqs.j, ...eqs.f]),
      expected: [eqs.j],
      comparator: "mcq_exact",
      explanation: expl(DEF_SIGNES, "on regarde le signe du nombre à droite du signe égal.", `dans ${eqs.j}, ce nombre ${cas === "aucune" ? "est négatif" : cas === "seule" ? "est nul" : "est positif"}.`, `${eqs.j} ${dit}.`),
    };
  }),

  // ★3 : on isole le carré.
  tpl(MICRO_A, 10, 3, "Isole d’abord le carré, puis résous.", () => {
    const L = lettre();
    const r = entre(2, 12);
    const a = r * r;
    const forme = un(["+", "−", "k"] as const);
    let eq: string;
    let etape: string;
    if (forme === "k") {
      const k = entre(2, 6);
      eq = `${k}${L}² = ${k * a}`;
      etape = `${k * a} ÷ ${k} = ${a}`;
    } else {
      const c = entre(1, 40);
      eq = forme === "+" ? `${L}² + ${c} = ${a + c}` : `${L}² − ${c} = ${a - c < 0 ? `−${c - a}` : a - c}`;
      etape = forme === "+" ? `${a + c} − ${c} = ${a}` : `${fr(a - c)} + ${c} = ${a}`;
    }
    const juste = deuxSol(L, String(r));
    return {
      text: un(ENONCE_RESOUS(L, eq)),
      format: "qcm",
      choices: qcm(juste, [`${L} = ${r} seulement`, deuxSol(L, String(a)), deuxSol(L, String(r + 1)), AUCUNE]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_SIGNES, `on isole d’abord ${L}².`, `${etape}, donc ${L}² = ${a}. Or ${r} × ${r} = ${a}.`, `les solutions sont ${L} = ${r} et ${L} = −${r}.`),
    };
  }),

  // ★3 : la ligne qui suit.
  tpl(MICRO_A, 11, 3, "Fais la même opération des deux côtés de l’égalité.", () => {
    const L = lettre();
    const a = entre(2, 90);
    const c = entre(1, 30);
    const k = entre(2, 7);
    const forme = un(["+", "−", "k"] as const);
    const eq = forme === "k" ? `${k}${L}² = ${k * a}` : forme === "+" ? `${L}² + ${c} = ${a + c}` : `${L}² − ${c} = ${fr(a - c)}`;
    const juste = `${L}² = ${a}`;
    const faux =
      forme === "k"
        ? [`${L}² = ${k * a + k}`, `${L}² = ${k * k * a}`, `${L} = ${a}`, `${L}² = ${k * a - k}`]
        : forme === "+"
          ? [`${L}² = ${a + 2 * c}`, `${L} = ${a}`, `${L}² = ${a + c}`]
          : [`${L}² = ${fr(a - 2 * c)}`, `${L} = ${a}`, `${L}² = ${fr(a - c)}`];
    const text = un([
      `On résout ${eq}. Quelle ligne vient ensuite ?`,
      `Dans ${eq}, on isole ${L}². Qu’obtient-on ?`,
      `L’équation ${eq} revient à laquelle de ces égalités ?`,
      `Résous ${eq}. Quelle est la première étape ?`,
      `Pour résoudre ${eq}, quelle ligne écris-tu d’abord ?`,
      `Isole ${L}² dans l’équation ${eq}.`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, faux),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(
        "on peut faire la même opération des deux côtés d’une égalité.",
        forme === "k" ? `on divise les deux membres par ${k}.` : forme === "+" ? `on enlève ${c} des deux côtés.` : `on ajoute ${c} des deux côtés.`,
        forme === "k" ? `${k * a} ÷ ${k} = ${a}.` : forme === "+" ? `${a + c} − ${c} = ${a}.` : `${fr(a - c)} + ${c} = ${a}.`,
        `la ligne suivante est ${juste}.`,
      ),
    };
  }),

  // ★3 : le côté d'un carré.
  tpl(MICRO_A, 12, 3, "L’aire d’un carré est côté × côté. Une longueur est positive : on garde une seule solution.", () => {
    const C = un(CARRES_CTX);
    const r = entre(2, 15);
    const a = r * r;
    const text = un([
      `${C.o} a une aire de ${a} ${C.u}². Quelle est la longueur de son côté ?`,
      `${C.o} a pour aire ${a} ${C.u}². Combien mesure son côté ?`,
      `${C.o} couvre ${a} ${C.u}². Trouve la longueur de son côté.`,
    ]);
    return {
      text,
      format: "short",
      expected: [`${r} ${C.u}`, `${r}`],
      comparator: "number_equal",
      explanation: expl("l’aire d’un carré de côté c vaut c × c, soit c².", `on résout c² = ${a} ; une longueur est positive, on écarte −${r}.`, `${r} × ${r} = ${a}.`, `le côté mesure ${r} ${C.u}.`),
    };
  }),

  // ★3 : une formule en t².
  tpl(MICRO_A, 13, 3, "Divise d’abord pour isoler le carré. Cette grandeur est positive : garde une solution.", () => {
    const F = un(FORMULES);
    const r = entre(2, 9);
    const v = F.k * r * r;
    return {
      text: un(F.texte(v)),
      format: "short",
      expected: [`${r} ${F.unite}`, `${r}`],
      comparator: "number_equal",
      explanation: expl("on remplace la grandeur connue dans la formule, puis on résout l’équation.", `on divise par ${F.k}, puis on cherche le nombre positif dont le carré vaut le résultat.`, `${v} ÷ ${F.k} = ${r * r}, et ${r} × ${r} = ${r * r}.`, `la réponse est ${r} ${F.unite}.`),
    };
  }),

  // ★3 : l'erreur d'un élève.
  tpl(MICRO_A, 14, 3, "Combien de solutions doit-il y avoir ? Regarde le signe.", () => {
    const P = un(PRENOMS);
    const L = lettre();
    const r = entre(2, 12);
    const a = r * r;
    const cas = un(["oubli", "negatif", "juste"] as const);
    const ecrit =
      cas === "oubli"
        ? `${L}² = ${a} donc ${L} = ${r}`
        : cas === "negatif"
          ? `${L}² = −${a} donc ${L} = ${r} ou ${L} = −${r}`
          : `${L}² = ${a} donc ${L} = ${r} ou ${L} = −${r}`;
    const JUSTE = "C’est juste.";
    const OUBLI = `Il manque la solution ${L} = −${r}.`;
    const NEG = "Il n’y a aucune solution : un carré n’est jamais négatif.";
    const MOITIE = `Il fallait diviser par 2 : ${L} = ${fr(a / 2)}.`;
    const juste = cas === "oubli" ? OUBLI : cas === "negatif" ? NEG : JUSTE;
    const text = un([
      `${P} écrit : « ${ecrit} ». Que penses-tu de sa réponse ?`,
      `Sur sa copie, ${P} écrit : « ${ecrit} ». Est-ce correct ?`,
      `${P} propose cette réponse : « ${ecrit} ». Que lui dis-tu ?`,
      `${P} a écrit au tableau : « ${ecrit} ». Quel est ton avis ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: melange([JUSTE, OUBLI, NEG, MOITIE]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_SIGNES, "on regarde le signe du nombre, puis on compte les solutions.", cas === "negatif" ? `−${a} est négatif, or un carré ne l’est jamais.` : `${r} × ${r} = ${a} et (−${r}) × (−${r}) = ${a}.`, cas === "negatif" ? "l’équation n’a aucune solution." : `les solutions sont ${L} = ${r} et ${L} = −${r}.`),
    };
  }),

  // ★4 : deux étapes.
  tpl(MICRO_A, 15, 4, "Enlève le nombre seul, puis divise par le coefficient.", () => {
    const L = lettre();
    const r = entre(2, 9);
    const k = entre(2, 6);
    const c = entre(1, 20);
    const signe = Math.random() < 0.5 ? "+" : "−";
    const d = signe === "+" ? k * r * r + c : k * r * r - c;
    const eq = `${k}${L}² ${signe} ${c} = ${d}`;
    const pos = Math.random() < 0.5;
    const juste = deuxSol(L, String(r));
    const avecChoix = Math.random() < 0.5;
    const calc = `${signe === "+" ? `${d} − ${c}` : `${d} + ${c}`} = ${k * r * r}, puis ${k * r * r} ÷ ${k} = ${r * r}, donc ${L}² = ${r * r}.`;
    if (avecChoix)
      return {
        text: un(ENONCE_RESOUS(L, eq)),
        format: "qcm",
        choices: qcm(juste, [`${L} = ${r} seulement`, deuxSol(L, String(r * r)), deuxSol(L, String(r + 1)), AUCUNE]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(DEF_SIGNES, `on isole ${L}² en deux étapes.`, calc, `les solutions sont ${L} = ${r} et ${L} = −${r}.`),
      };
    const mot = pos ? "positive" : "négative";
    const v = pos ? String(r) : `−${r}`;
    return {
      text: un([`Donne la solution ${mot} de ${eq}.`, `Quelle est la solution ${mot} de ${eq} ?`, `Résous ${eq}. Écris la solution ${mot}.`]),
      format: "short",
      expected: [v, `${L} = ${v}`, ...(pos ? [] : [`-${r}`, `${L} = -${r}`])],
      comparator: "exact_text",
      explanation: expl(DEF_SIGNES, `on isole ${L}² en deux étapes.`, calc, `la solution ${mot} est ${v}.`),
    };
  }),

  // ★4 : un solide dont on cherche le côté ou le rayon.
  tpl(MICRO_A, 16, 4, "Remplace dans la formule du volume, puis isole le carré.", () => {
    const S = un(SOLIDES_K);
    const u = S.u;
    const r = entre(2, 6);
    const h = entre(4, 12);
    const V = r * r * h;
    if (S.pave) {
      return {
        text: un([
          `${S.o} a la forme d’un pavé à base carrée, de hauteur ${h} ${u}. Son volume est ${V} ${u}³. Quel est le côté de la base ?`,
          `${S.o} est un pavé à base carrée. Sa hauteur vaut ${h} ${u} et son volume ${V} ${u}³. Combien mesure le côté de sa base ?`,
        ]),
        format: "short",
        expected: [`${r} ${u}`, `${r}`],
        comparator: "number_equal",
        explanation: expl("le volume d’un pavé est aire de la base × hauteur.", `on résout c² × ${h} = ${V} ; une longueur est positive.`, `${V} ÷ ${h} = ${r * r}, et ${r} × ${r} = ${r * r}.`, `le côté mesure ${r} ${u}.`),
      };
    }
    return {
      text: un([
        `${S.o} a la forme d’un cylindre de hauteur ${h} ${u}. Son volume est ${V}π ${u}³. Quel est son rayon ?`,
        `${S.o} est un cylindre. Sa hauteur vaut ${h} ${u} et son volume ${V}π ${u}³. Combien mesure son rayon ?`,
      ]),
      format: "short",
      expected: [`${r} ${u}`, `${r}`],
      comparator: "number_equal",
      explanation: expl("le volume d’un cylindre est π × r² × h.", `on résout π × r² × ${h} = ${V}π ; un rayon est positif.`, `${V} ÷ ${h} = ${r * r}, et ${r} × ${r} = ${r * r}.`, `le rayon mesure ${r} ${u}.`),
    };
  }),

  // ★4 : raisonner sur les solutions.
  tpl(MICRO_A, 17, 4, "Deux nombres opposés ont le même carré.", () => {
    const L = lettre();
    const r = entre(2, 15);
    const s = Math.random() < 0.5 ? r : -r;
    const cas = un(["a", "autre"] as const);
    if (cas === "a")
      return {
        text: un([
          `Le nombre ${fr(s)} est une solution de ${L}² = a. Que vaut a ?`,
          `On sait que ${fr(s)} est solution de ${L}² = a. Trouve a.`,
          `${L}² = a a pour solution ${fr(s)}. Calcule a.`,
          `Quelle valeur de a donne ${fr(s)} comme solution de ${L}² = a ?`,
        ]),
        format: "short",
        expected: [String(r * r), `a = ${r * r}`],
        comparator: "exact_text",
        explanation: expl("une solution rend l’égalité vraie.", `on remplace ${L} par ${fr(s)}.`, `(${fr(s)}) × (${fr(s)}) = ${r * r}.`, `a = ${r * r}.`),
      };
    const autre = fr(-s);
    return {
      text: un([
        `Le nombre ${fr(s)} est une solution de ${L}² = a. Quelle est l’autre solution ?`,
        `${L}² = a a deux solutions. L’une vaut ${fr(s)}. Quelle est l’autre ?`,
        `On sait que ${fr(s)} est solution de ${L}² = a. Trouve l’autre solution.`,
        `L’équation ${L}² = a a pour solution ${fr(s)}. Donne son autre solution.`,
      ]),
      format: "short",
      expected: [autre, `${L} = ${autre}`, ...(s > 0 ? [`-${r}`, `${L} = -${r}`] : [])],
      comparator: "exact_text",
      explanation: expl(DEF_CARRE, "l’autre solution est l’opposé de la première.", `l’opposé de ${fr(s)} est ${autre}.`, `l’autre solution est ${autre}.`),
    };
  }),

  // ★4 : valeur exacte dans une figure.
  tpl(MICRO_A, 18, 4, "Écris l’équation, isole le carré, garde la valeur positive avec √.", () => {
    const cas = un(["carre", "isocele"] as const);
    const u = un(["cm", "m", "dm"]);
    if (cas === "carre") {
      const a = un(NON_CARRES);
      const O = un(["Un carré", "Une tuile carrée", "Un parterre carré", "Une plaque carrée", "Un cadre carré"]);
      const juste = `√${a} ${u}`;
      return {
        text: un([
          `${O} a une aire de ${a} ${u}². Quelle est la valeur exacte de son côté ?`,
          `${O} couvre ${a} ${u}². Donne la valeur exacte de son côté.`,
        ]),
        format: "qcm",
        choices: qcm(juste, [`${fr(a / 2)} ${u}`, `${fr(a / 4)} ${u}`, `${a} ${u}`, `−√${a} ${u}`]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl("l’aire d’un carré de côté c vaut c².", `on résout c² = ${a} ; une longueur est positive.`, `${a} n’est pas un carré parfait : on garde √${a}.`, `le côté mesure √${a} ${u}.`),
      };
    }
    const h = 2 * entre(2, 8);
    const a = (h * h) / 2;
    const r = Math.sqrt(a);
    const v = Number.isInteger(r) ? String(r) : `√${a}`;
    const juste = `${v} ${u}`;
    return {
      text: un([
        `Un triangle est rectangle et isocèle. Son hypoténuse mesure ${h} ${u}. Quelle est la valeur exacte de ses deux côtés égaux ?`,
        `Dans un triangle rectangle isocèle, l’hypoténuse vaut ${h} ${u}. Donne la valeur exacte de la longueur des côtés égaux.`,
      ]),
      format: "qcm",
      choices: qcm(juste, [`${h / 2} ${u}`, `√${h} ${u}`, `${a} ${u}`, `√${h * h} ${u}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("d’après Pythagore, c² + c² = hypoténuse².", `on résout 2 × c² = ${h * h} ; une longueur est positive.`, `${h * h} ÷ 2 = ${a}, donc c² = ${a}.`, `chaque côté égal mesure ${v} ${u}.`),
    };
  }),
];

/* ───────────────────────── equation_carre_factoriser ───────────────────────── */

const sgn = (L: string, p: number) => (p < 0 ? `${L} − ${-p}` : `${L} + ${p}`);

const factoriser: TutorBankItemV4[] = [
  // ★1 : factoriser.
  tpl(MICRO_F, 1, 1, "a² − b² = (a − b)(a + b).", () => {
    const L = lettre();
    const r = entre(2, 13);
    const a = r * r;
    const juste = `(${L} − ${r})(${L} + ${r})`;
    const text = un([
      `Factorise ${L}² − ${a}.`,
      `Quelle écriture factorisée est égale à ${L}² − ${a} ?`,
      `Écris ${L}² − ${a} sous forme de produit.`,
      `Quel produit est égal à ${L}² − ${a} ?`,
      `${L}² − ${a} est égal à quel produit ?`,
      `Choisis la factorisation de ${L}² − ${a}.`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [`(${L} − ${a})(${L} + ${a})`, `(${L} − ${r})²`, `(${L} + ${r})²`, `(${L} − ${r})(${L} + ${a})`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_AB, `on écrit ${a} comme le carré de ${r}.`, `${L}² − ${a} = ${L}² − ${r}².`, `${L}² − ${a} = ${juste}.`),
    };
  }),

  // ★1 : le nombre qui manque.
  tpl(MICRO_F, 2, 1, "Cherche le nombre dont le carré est le nombre soustrait.", () => {
    const L = lettre();
    const r = entre(2, 15);
    const a = r * r;
    const eg = `${L}² − ${a} = (${L} − …)(${L} + …)`;
    const text = un([
      `Quel nombre manque ? ${eg}`,
      `Complète : ${eg}`,
      `Trouve le nombre manquant : ${eg}`,
      `${eg}. Quel est ce nombre ?`,
      `Par quel nombre remplacer les pointillés ? ${eg}`,
    ]);
    return {
      text,
      format: "short",
      expected: [String(r)],
      comparator: "number_equal",
      explanation: expl(DEF_AB, `on cherche le nombre dont le carré vaut ${a}.`, `${r} × ${r} = ${a}.`, `le nombre manquant est ${r}.`),
    };
  }),

  // ★1 : le produit nul.
  tpl(MICRO_F, 3, 1, "Un produit est nul si l’un de ses facteurs est nul.", () => {
    const L = lettre();
    const r = entre(2, 15);
    const eq = `(${L} − ${r})(${L} + ${r}) = 0`;
    const juste = deuxSol(L, String(r));
    return {
      text: un(ENONCE_RESOUS(L, eq)),
      format: "qcm",
      choices: qcm(juste, [`${L} = ${r} seulement`, `${L} = −${r} seulement`, deuxSol(L, String(r * r)), `${L} = 0`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("un produit est nul si l’un de ses facteurs est nul.", "on annule chaque facteur.", `${L} − ${r} = 0 donne ${L} = ${r} ; ${L} + ${r} = 0 donne ${L} = −${r}.`, `les solutions sont ${L} = ${r} et ${L} = −${r}.`),
    };
  }),

  // ★1 : reconnaître a² − b².
  tpl(MICRO_F, 4, 1, "Le nombre soustrait doit être un carré parfait.", () => {
    const L = lettre();
    const r = entre(2, 12);
    const a = r * r;
    const juste = `${L}² − ${a}`;
    const texte = un([
      `Quelle expression est de la forme a² − b² ?`,
      `Laquelle de ces expressions est une différence de deux carrés ?`,
      `Choisis la différence de deux carrés.`,
      `Quelle expression se factorise avec a² − b² ?`,
      `Quelle expression peut s’écrire ${L}² − b², avec b entier ?`,
    ]);
    const eq = [`${L}² + ${a}`, `${L} − ${a}`, `${r}${L} − ${a}`, `${L}² + ${r}`];
    return {
      text: texte,
      format: "qcm",
      choices: qcm(juste, eq),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_AB, `on cherche une soustraction entre un carré et un carré parfait.`, `${a} = ${r} × ${r}.`, `${juste} = ${L}² − ${r}².`),
    };
  }),

  // ★2 : x² − a = 0.
  tpl(MICRO_F, 5, 2, "Factorise, puis annule chaque facteur.", () => {
    const L = lettre();
    const r = entre(2, 13);
    const a = r * r;
    const eq = `${L}² − ${a} = 0`;
    const juste = deuxSol(L, String(r));
    return {
      text: un(ENONCE_RESOUS(L, eq)),
      format: "qcm",
      choices: qcm(juste, [`${L} = ${r} seulement`, deuxSol(L, String(a)), `${L} = ${a} seulement`, AUCUNE]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_AB, `on factorise ${L}² − ${a}, puis on annule chaque facteur.`, `(${L} − ${r})(${L} + ${r}) = 0, donc ${L} = ${r} ou ${L} = −${r}.`, `les solutions sont ${L} = ${r} et ${L} = −${r}.`),
    };
  }),

  // ★2 : une des solutions de x² − a = 0.
  tpl(MICRO_F, 6, 2, "Factorise, puis annule chaque facteur.", () => {
    const L = lettre();
    const r = entre(2, 13);
    const a = r * r;
    const eq = `${L}² − ${a} = 0`;
    const pos = Math.random() < 0.5;
    const mot = pos ? "positive" : "négative";
    const v = pos ? String(r) : `−${r}`;
    const text = un([
      `Donne la solution ${mot} de ${eq}.`,
      `Quelle est la solution ${mot} de ${eq} ?`,
      `${eq}. Quelle est la solution ${mot} ?`,
      `Écris la solution ${mot} de l’équation ${eq}.`,
      `Résous ${eq}. Donne la solution ${mot}.`,
      `Trouve la solution ${mot} de ${eq}.`,
    ]);
    return {
      text,
      format: "short",
      expected: [v, `${L} = ${v}`, ...(pos ? [] : [`-${r}`, `${L} = -${r}`])],
      comparator: "exact_text",
      explanation: expl(DEF_AB, `on factorise, puis on annule chaque facteur.`, `(${L} − ${r})(${L} + ${r}) = 0, donc ${L} = ${r} ou ${L} = −${r}.`, `la solution ${mot} est ${v}.`),
    };
  }),

  // ★2 : la ligne qui suit (x − p)² = q².
  tpl(MICRO_F, 7, 2, "Deux nombres opposés ont le même carré.", () => {
    const L = lettre();
    const p = (Math.random() < 0.5 ? 1 : -1) * entre(1, 9);
    const q = entre(2, 12);
    const f = sgn(L, p);
    const eq = `(${f})² = ${q * q}`;
    const juste = `${f} = ${q} ou ${f} = −${q}`;
    const text = un([
      `On résout ${eq}. Quelle ligne vient ensuite ?`,
      `Dans ${eq}, quelle ligne suit ?`,
      `${eq}. Que peut valoir ${f} ?`,
      `Résous ${eq}. Quelle est la première étape ?`,
      `Quelle ligne écris-tu après ${eq} ?`,
      `L’équation ${eq} revient à quelle ligne ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [`${f} = ${q} seulement`, `${f} = ${q * q}`, `${L} = ${q} ou ${L} = −${q}`, `${f} = ${q * q} ou ${f} = −${q * q}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_CARRE, `le carré de ${f} vaut ${q * q} : ${f} vaut ${q} ou −${q}.`, `${q} × ${q} = ${q * q} et (−${q}) × (−${q}) = ${q * q}.`, `la ligne suivante est ${juste}.`),
    };
  }),

  // ★2 : la plus grande ou la plus petite solution.
  tpl(MICRO_F, 8, 2, "Écris les deux cas, puis isole la lettre.", () => {
    const L = lettre();
    const p = (Math.random() < 0.5 ? 1 : -1) * entre(1, 9);
    const q = entre(2, 12);
    const f = sgn(L, p);
    const eq = `(${f})² = ${q * q}`;
    const s1 = q - p;
    const s2 = -q - p;
    const grand = Math.random() < 0.5;
    const v = grand ? Math.max(s1, s2) : Math.min(s1, s2);
    const mot = grand ? "plus grande" : "plus petite";
    const text = un([
      `Donne la ${mot} solution de ${eq}.`,
      `Quelle est la ${mot} solution de ${eq} ?`,
      `${eq}. Quelle est la ${mot} solution ?`,
      `Résous ${eq}. Écris la ${mot} solution.`,
      `Trouve la ${mot} solution de ${eq}.`,
    ]);
    return {
      text,
      format: "short",
      expected: [fr(v), `${L} = ${fr(v)}`, ...(v < 0 ? [String(v), `${L} = ${v}`] : [])],
      comparator: "exact_text",
      explanation: expl(DEF_CARRE, `${f} vaut ${q} ou −${q}, puis on isole ${L}.`, `${f} = ${q} donne ${L} = ${fr(s1)} ; ${f} = −${q} donne ${L} = ${fr(s2)}.`, `la ${mot} solution est ${fr(v)}.`),
    };
  }),

  // ★3 : (x − p)² = q², solutions complètes.
  tpl(MICRO_F, 9, 3, "Écris les deux cas, puis isole la lettre.", () => {
    const L = lettre();
    const p = (Math.random() < 0.5 ? 1 : -1) * entre(1, 9);
    const q = entre(2, 12);
    const f = sgn(L, p);
    const eq = `(${f})² = ${q * q}`;
    const s1 = q - p;
    const s2 = -q - p;
    const juste = `${L} = ${fr(s1)} ou ${L} = ${fr(s2)}`;
    return {
      text: un(ENONCE_RESOUS(L, eq)),
      format: "qcm",
      choices: qcm(juste, [deuxSol(L, String(q)), `${L} = ${fr(q + p)} ou ${L} = ${fr(-q + p)}`, `${L} = ${fr(s1)} seulement`, `${L} = ${fr(q * q - p)} ou ${L} = ${fr(-q * q - p)}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_CARRE, `${f} vaut ${q} ou −${q}, puis on isole ${L}.`, `${f} = ${q} donne ${L} = ${fr(s1)} ; ${f} = −${q} donne ${L} = ${fr(s2)}.`, `les solutions sont ${L} = ${fr(s1)} et ${L} = ${fr(s2)}.`),
    };
  }),

  // ★3 : combien de solutions pour (x − p)² = a.
  tpl(MICRO_F, 10, 3, "Le carré de la parenthèse ne peut pas être négatif.", () => {
    const L = lettre();
    const p = (Math.random() < 0.5 ? 1 : -1) * entre(1, 9);
    const f = sgn(L, p);
    const tir = Math.random();
    const a = tir < 0.4 ? entre(1, 50) : tir < 0.65 ? 0 : -entre(1, 50);
    const eq = `(${f})² = ${fr(a)}`;
    const n = a > 0 ? 2 : a === 0 ? 1 : 0;
    const mots = n === 2 ? ["deux", "2 solutions", "deux solutions"] : n === 1 ? ["une", "une seule", "1 solution", "une solution", "une seule solution"] : ["aucune", "zéro", "0 solution", "aucune solution"];
    const text = un([
      `Combien de solutions a ${eq} ?`,
      `Combien de solutions a l’équation ${eq} ?`,
      `${eq} : combien de solutions ?`,
      `Donne le nombre de solutions de ${eq}.`,
      `Quel est le nombre de solutions de ${eq} ?`,
      `L’équation ${eq} a combien de solutions ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [String(n), ...mots],
      comparator: "exact_text",
      explanation: expl(DEF_CARRE, "on regarde le signe du nombre à droite, comme pour x² = a.", a > 0 ? `${fr(a)} est positif : deux valeurs opposées pour la parenthèse.` : a === 0 ? `la parenthèse doit valoir 0.` : `${fr(a)} est négatif, or un carré ne l’est jamais.`, n === 2 ? "l’équation a deux solutions." : n === 1 ? "l’équation a une seule solution." : "l’équation n’a aucune solution."),
    };
  }),

  // ★3 : kx² − r² = 0, solutions fractionnaires.
  tpl(MICRO_F, 11, 3, "Écris le premier terme comme un carré, puis factorise.", () => {
    const L = lettre();
    let k = entre(2, 7);
    let r = entre(1, 11);
    while (pgcd(k, r) !== 1) {
      k = entre(2, 7);
      r = entre(1, 11);
    }
    const eq = `${k * k}${L}² − ${r * r} = 0`;
    const f = `\\dfrac{${r}}{${k}}`;
    const i = `\\dfrac{${k}}{${r}}`;
    const juste = `$${L} = ${f}$ ou $${L} = -${f}$`;
    const faux = [
      `$${L} = ${f}$ seulement`,
      r === 1 ? `$${L} = ${k}$ ou $${L} = -${k}$` : `$${L} = ${i}$ ou $${L} = -${i}$`,
      `$${L} = \\dfrac{${r * r}}{${k * k}}$ ou $${L} = -\\dfrac{${r * r}}{${k * k}}$`,
      `$${L} = ${r}$ ou $${L} = -${r}$`,
    ];
    return {
      text: un(ENONCE_RESOUS(L, eq)),
      format: "qcm",
      choices: qcm(juste, faux),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_AB, `on écrit ${k * k}${L}² = (${k}${L})² et ${r * r} = ${r}².`, `(${k}${L} − ${r})(${k}${L} + ${r}) = 0, donc ${k}${L} = ${r} ou ${k}${L} = −${r}.`, `les solutions sont $${L} = ${f}$ et $${L} = -${f}$.`),
    };
  }),

  // ★3 : un carré qu'on agrandit.
  tpl(MICRO_F, 12, 3, "Écris l’aire avec le nouveau côté, puis garde la longueur positive.", () => {
    const C = un(AGRANDIR);
    const q = entre(5, 15);
    const p = entre(1, q - 2);
    const x = q - p;
    const text = un([
      `On agrandit ${C.o} : son côté gagne ${p} ${C.u}. Sa nouvelle aire est ${q * q} ${C.u}². Quel était son côté ?`,
      `On allonge de ${p} ${C.u} le côté d’${C.o}. L’aire devient ${q * q} ${C.u}². Combien mesurait le côté ?`,
      `Le côté d’${C.o} augmente de ${p} ${C.u}. L’aire atteint ${q * q} ${C.u}². Trouve le côté de départ.`,
    ]);
    return {
      text,
      format: "short",
      expected: [`${x} ${C.u}`, `${x}`],
      comparator: "number_equal",
      explanation: expl(`le nouveau côté est c + ${p}, et l’aire d’un carré est côté × côté.`, `on résout (c + ${p})² = ${q * q} ; une longueur est positive.`, `c + ${p} = ${q} (car ${q} × ${q} = ${q * q}), puis ${q} − ${p} = ${x}.`, `le côté de départ mesurait ${x} ${C.u}.`),
    };
  }),

  // ★4 : (x + p)² − q² = 0.
  tpl(MICRO_F, 13, 4, "Ici a est toute la parenthèse et b le nombre dont le carré est soustrait.", () => {
    const L = lettre();
    const p = (Math.random() < 0.5 ? 1 : -1) * entre(1, 9);
    const q = entre(2, 11);
    const f = sgn(L, p);
    const eq = `(${f})² − ${q * q} = 0`;
    const s1 = q - p;
    const s2 = -q - p;
    if (Math.random() < 0.4) {
      const juste = `(${f} − ${q})(${f} + ${q})`;
      return {
        text: un([
          `Factorise (${f})² − ${q * q}.`,
          `Quel produit est égal à (${f})² − ${q * q} ?`,
          `Écris (${f})² − ${q * q} sous forme de produit.`,
        ]),
        format: "qcm",
        choices: qcm(juste, [`(${f} − ${q * q})(${f} + ${q * q})`, `(${f} − ${q})²`, `(${L} − ${q})(${L} + ${q})`, `(${f} + ${q})²`]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(DEF_AB, `ici a = ${f} et b = ${q}.`, `(${f})² − ${q}² = (${f} − ${q})(${f} + ${q}).`, `le produit est ${juste}.`),
      };
    }
    const juste = `${L} = ${fr(s1)} ou ${L} = ${fr(s2)}`;
    return {
      text: un(ENONCE_RESOUS(L, eq)),
      format: "qcm",
      choices: qcm(juste, [deuxSol(L, String(q)), `${L} = ${fr(q + p)} ou ${L} = ${fr(-q + p)}`, `${L} = ${fr(s1)} seulement`, `${L} = ${fr(q * q - p)} ou ${L} = ${fr(-q * q - p)}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_AB, `ici a = ${f} et b = ${q}.`, `(${f} − ${q})(${f} + ${q}) = 0, donc ${L} = ${fr(s1)} ou ${L} = ${fr(s2)}.`, `les solutions sont ${L} = ${fr(s1)} et ${L} = ${fr(s2)}.`),
    };
  }),

  // ★4 : (kx + p)² = q².
  tpl(MICRO_F, 14, 4, "Écris les deux cas, puis isole la lettre en deux étapes.", () => {
    const L = lettre();
    const k = entre(2, 5);
    // on part de deux solutions entières : q − p et −q − p divisibles par k.
    let p = entre(-9, 9);
    let q = entre(1, 12);
    while (p === 0 || (q - p) % k !== 0 || (-q - p) % k !== 0) {
      p = entre(-9, 9);
      q = entre(1, 12);
    }
    const f = p < 0 ? `${k}${L} − ${-p}` : `${k}${L} + ${p}`;
    const eq = `(${f})² = ${q * q}`;
    const s1 = (q - p) / k;
    const s2 = (-q - p) / k;
    const juste = `${L} = ${fr(s1)} ou ${L} = ${fr(s2)}`;
    return {
      text: un(ENONCE_RESOUS(L, eq)),
      format: "qcm",
      choices: qcm(juste, [
        `${L} = ${fr(q - p)} ou ${L} = ${fr(-q - p)}`,
        `${L} = ${fr(s1)} seulement`,
        `${L} = ${fr(s1 + 1)} ou ${L} = ${fr(s2 - 1)}`,
        deuxSol(L, String(q)),
      ]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_CARRE, `${f} vaut ${q} ou −${q}, puis on isole ${L}.`, `${f} = ${q} donne ${L} = ${fr(s1)} ; ${f} = −${q} donne ${L} = ${fr(s2)}.`, `les solutions sont ${L} = ${fr(s1)} et ${L} = ${fr(s2)}.`),
    };
  }),

  // ★4 : un rectangle de côtés x − p et x + p.
  tpl(MICRO_F, 15, 4, "(x − p)(x + p) = x² − p². Isole le carré, garde la valeur positive.", () => {
    const R = un(RECTANGLES);
    const p = entre(1, 6);
    const x = entre(p + 1, p + 9);
    const A = x * x - p * p;
    const text = un([
      `${R.o} a pour longueur x + ${p} et pour largeur x − ${p}, en ${R.u}. Son aire est ${A} ${R.u}². Que vaut x ?`,
      `${R.o} mesure x + ${p} sur x − ${p}, en ${R.u}, et son aire vaut ${A} ${R.u}². Trouve x.`,
      `${R.o} est un rectangle de côtés x + ${p} et x − ${p}, en ${R.u}. Son aire est ${A} ${R.u}². Calcule x.`,
    ]);
    return {
      text,
      format: "short",
      expected: [`${x} ${R.u}`, `${x}`, `x = ${x}`],
      comparator: "number_equal",
      explanation: expl(`(x + ${p})(x − ${p}) = x² − ${p * p}.`, `on résout x² − ${p * p} = ${A} ; x est positif, car x − ${p} est une longueur.`, `${A} + ${p * p} = ${x * x}, et ${x} × ${x} = ${x * x}.`, `x = ${x}.`),
    };
  }),

  // ★4 : racine non entière.
  tpl(MICRO_F, 16, 4, "On peut écrire a = (√a)², même si a n’est pas un carré parfait.", () => {
    const L = lettre();
    const a = un(NON_CARRES);
    const eq = `${L}² − ${a} = 0`;
    if (Math.random() < 0.5) {
      const juste = `(${L} − √${a})(${L} + √${a})`;
      return {
        text: un([`Factorise ${L}² − ${a} avec √.`, `Écris ${L}² − ${a} sous forme de produit, avec √.`, `Quel produit est égal à ${L}² − ${a} ?`]),
        format: "qcm",
        choices: qcm(juste, [`(${L} − ${a})(${L} + ${a})`, `(${L} − √${a})²`, `(${L} + √${a})²`, `(${L} − ${fr(a / 2)})(${L} + ${fr(a / 2)})`]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(DEF_AB, `on écrit ${a} = (√${a})².`, `${L}² − (√${a})² = (${L} − √${a})(${L} + √${a}).`, `le produit est ${juste}.`),
      };
    }
    const juste = deuxSol(L, `√${a}`);
    return {
      text: un(ENONCE_RESOUS(L, eq)),
      format: "qcm",
      choices: qcm(juste, [deuxSol(L, String(a)), `${L} = √${a} seulement`, deuxSol(L, fr(a / 2)), AUCUNE]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_AB, `on écrit ${a} = (√${a})², puis on annule chaque facteur.`, `(${L} − √${a})(${L} + √${a}) = 0.`, `les solutions sont ${L} = √${a} et ${L} = −√${a}.`),
    };
  }),
];

export const equationsCarreBank: TutorBankItemV4[] = [...egalA, ...factoriser];
