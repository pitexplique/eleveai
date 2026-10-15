// lib/tutor-v4/questionBank/premiere-spe/maths/variables-aleatoires.bank.ts
//
// Chapitre : Variables aléatoires réelles (notion "variables_aleatoires")
// microSkills :
//   va_definition         — une variable aléatoire est une FONCTION sur l'univers
//   va_notation           — interpréter les notations {X = a}, P(X ⩽ a)
//   va_modeliser          — modéliser une situation par une variable aléatoire
//   va_loi                — déterminer la loi de probabilité
//   va_esperance          — calculer une espérance
//   va_esperance_probleme — mise, gain net, jeu équitable
//   va_variance           — calculer une variance
//   va_ecart_type         — calculer et interpréter un écart-type
//   va_simulation         — simuler une variable aléatoire avec Python
//   va_echantillon        — moyenne d'un échantillon et espérance
//
// ⚠️ Treize items écrits avant le découpage en dix micro-compétences sont
// restés à leur place dans le fichier, mais leur `microId` a été réaffecté
// (leur `id` est inchangé). C'est le `microId` qui fait foi.
//
// PÉRIMÈTRE BO Première spé. Conventions : LaTeX, règle QCM.
// Canvas : stat_graph (loi en bâtons), scratch (algorithmes de simulation).
//
// Règle d'écriture : un `fixed` pour une valeur exceptionnelle, un piège, une
// propriété ou un contexte 974 ; un `template` pour tout calcul dont on peut
// changer les nombres ; plusieurs ouvertes dont un template ouvert.

import type {
  TutorBankItemV4,
  CanvasFigure,
  DifficultyLevel,
  QuestionTheme,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Les propositions d'un gabarit sont écrites à la main, et deux d'entre elles
// finissent par coïncider dès qu'un paramètre tombe sur une valeur particulière
// (a = b, un coefficient nul, une fraction qui se simplifie…). L'élève voyait
// alors deux fois la même ligne. On met la bonne réponse de côté, on tire trois
// pièges réellement distincts, puis on mélange l'ensemble.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}


function pickOne<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Affichage à la française : la virgule décimale, comme au tableau. */
function fr(x: number): string {
  return String(Math.round(x * 100) / 100).replace(".", ",");
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

function loiGraph(valeurs: number[], probas: number[]): CanvasFigure {
  return {
    kind: "stat_graph",
    graphType: "batons",
    title: "Loi de probabilité de X",
    size: { width: 320, height: 240 },
    data: valeurs.map((v, i) => ({ label: String(v), value: probas[i] })),
    display: { showValues: true, showLabels: true },
  };
}

/* =========================================================================
   ⛔⛔ 15/10/2026 — « DES QUESTIONS REVIENNENT », LES VARIABLES ALÉATOIRES.
   Mesuré avant (scripts/mesurer-squelettes-coach.ts premiere-spe
   variables_aleatoires) : les 10 micros sous le seuil, 8 à 18 squelettes par
   micro, 12 à 18 répétitions sur une série de 20 à la même étoile. Les
   gabarits tiraient des NOMBRES dans une phrase fixe (« $X$ vaut #, #, # avec
   probabilités #, #, # ») : l'élève reconnaissait la phrase.
   Même méthode que les probabilités de 3e (dd5e9f75) : chaque gabarit compose
     · une SITUATION (SITS : roue de la kermesse, tombola, jeu de l'oie,
       lancers francs, car jaune, letchis, Cilaos, Piton de la Fournaise,
       fléchettes, coffre d'un jeu vidéo…) qui donne le sens de $X$ et ses
       valeurs ;
     · une écriture de la LOI (quatre tournures) ;
     · une TOURNURE de la question, et un type de question par étoile.
   Probabilités tirées en CENTIÈMES entiers : sommes, espérances et
   variances sont calculées exactement (entiers), jamais en flottants.
   ⭐ Les items `open` des gabarits sont devenus des cas chiffrés précis
   (questions-ouvertes-doivent-etre-precises) ; ids gardés.
========================================================================= */
type Q = TutorGeneratedQuestionV4;
const pick = pickOne;
const ri = randomInt;
function melange<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const range = (a: number, b: number) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const listeFr = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} et ${xs[xs.length - 1]}`);
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** 0.35 → « 0,35 » (arrondi au dix-millième). */
const f4 = (x: number) => String(Math.round(x * 10000) / 10000).replace(".", ",");
/** 0.35 → « 0{,}35 » pour le LaTeX. */
const tx = (x: number) => f4(x).replace(",", "{,}");
/** Les écritures acceptées d'un décimal : virgule et point. */
const acc = (x: number) => [...new Set([f4(x), f4(x).replace(",", ".")])];
/** Un nombre entre parenthèses s'il est négatif : « (-2) ». */
const par = (x: number) => (x < 0 ? `(${tx(x)})` : tx(x));
function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}
const red = (a: number, b: number): [number, number] => (a === 0 ? [0, 1] : [a / pgcd(a, b), b / pgcd(a, b)]);
const tf = (a: number, b: number) => {
  const [n, d] = red(a, b);
  return n === 0 ? "$0$" : d === 1 ? `$${n}$` : `$\\dfrac{${n}}{${d}}$`;
};
/** Toutes les écritures acceptées de a/b : irréductible, non simplifiée, décimal s'il tombe juste. */
function ecritures(a: number, b: number): string[] {
  const [n, d] = red(a, b);
  const out = [d === 1 ? String(n) : `${n}/${d}`, `${a}/${b}`];
  let q = d;
  while (q % 2 === 0) q /= 2;
  while (q % 5 === 0) q /= 5;
  if (q === 1) out.push(...acc(n / d));
  return [...new Set(out)];
}

/**
 * QCM à réponses numériques : la bonne et trois leurres DISTINCTS EN VALEUR
 * (les erreurs visées d'abord, puis des voisins de secours).
 */
function qcmN(bon: number, leurres: number[], ecrire: (x: number) => string = (x) => `$${tx(x)}$`) {
  const pris: number[] = [];
  const secours = [bon + 1, bon - 1, bon * 2, bon + 0.5, bon + 2, bon - 2, -bon];
  for (const l of [...melange(leurres), ...secours]) {
    if (pris.length === 3) break;
    if (!Number.isFinite(l)) continue;
    if ([bon, ...pris].some((g) => Math.abs(g - l) < 1e-9)) continue;
    pris.push(Math.round(l * 10000) / 10000);
  }
  const c = ecrire(bon);
  return { choices: melange([c, ...pris.map(ecrire)]), expected: [c] };
}
/** QCM à réponses textuelles, distinctes au texte. */
function qcmT(bon: string, leurres: string[]) {
  const d = melange([...new Set(leurres)].filter((w) => w !== bon)).slice(0, 3);
  return { choices: melange([bon, ...d]), expected: [bon] };
}

/**
 * k entiers > 0, multiples de `pas`, de somme 100 : des probabilités en
 * CENTIÈMES. Tous les calculs se font sur ces entiers.
 */
function partition(k: number, pas: number, total = 100): number[] {
  const u = Math.floor(total / pas);
  const coupes = melange(range(1, u - 1)).slice(0, k - 1).sort((a, b) => a - b);
  const bornes = [0, ...coupes, u];
  return range(1, k).map((i) => (bornes[i] - bornes[i - 1]) * pas);
}
/** E(X) × 100, exact. */
const som1 = (v: number[], c: number[]) => v.reduce((s, x, i) => s + x * c[i], 0);
/** E(X²) × 100, exact. */
const som2 = (v: number[], c: number[]) => v.reduce((s, x, i) => s + x * x * c[i], 0);
/** V(X) × 10 000, exact : 100·Σx²p − (Σxp)². */
const var4 = (v: number[], c: number[]) => 100 * som2(v, c) - som1(v, c) ** 2;
/** « 0 \times 0{,}2 + 5 \times 0{,}3 » */
const sommeProduits = (v: number[], c: number[]) => v.map((x, i) => `${par(x)} \\times ${tx(c[i] / 100)}`).join(" + ");

/* =========================================================================
   LES SITUATIONS : le sens de X, ses valeurs possibles (k valeurs, 2 à 5).
     intro : la phrase qui pose le décor (elle peut dépendre des valeurs) ;
     X     : ce qui suit « On note $X$ » ;
     moy   : ce que l'espérance représente, en clair ;
     u     : l'unité écrite après une valeur (« € », « points »…).
========================================================================= */
type Sit = { intro: (v: number[]) => string; X: string; moy: string; vals: (k: number) => number[]; u: string; th: QuestionTheme };
/** k valeurs triées, tirées dans une liste. */
const parmi = (pool: number[]) => (k: number) => melange(pool).slice(0, k).sort((a, b) => a - b);
/** k valeurs consécutives, la plus petite entre a et b. */
const suite = (a: number, b: number) => (k: number) => {
  const s = ri(a, b);
  return range(s, s + k - 1);
};
/** 0, 1, …, k − 1 : un comptage qui part de zéro. */
const deZero = (k: number) => range(0, k - 1);

const SITS: Sit[] = [
  { intro: () => "À la kermesse du lycée, on fait tourner une roue.", X: "le gain, en euros, d'un tour de roue", moy: "le gain moyen par tour, en euros", vals: parmi([0, 1, 2, 3, 5, 8, 10, 20]), u: " €", th: "neutral" },
  { intro: () => "Pour la tombola de l'association des parents d'élèves, on achète un billet.", X: "la valeur, en euros, du lot gagné", moy: "la valeur moyenne d'un lot par billet, en euros", vals: parmi([0, 2, 5, 10, 15, 20, 50]), u: " €", th: "neutral" },
  { intro: () => "Sur le marché forain de Saint-Paul, un stand vend des cartes à gratter.", X: "le montant, en euros, gagné avec une carte", moy: "le montant moyen gagné par carte, en euros", vals: parmi([0, 1, 2, 4, 6, 10, 25]), u: " €", th: "reunion" },
  { intro: () => "Au jeu de l'oie, une case « bonus » fait avancer le pion d'un nombre de cases tiré au hasard.", X: "le nombre de cases dont le pion avance", moy: "le nombre moyen de cases gagnées", vals: parmi([1, 2, 3, 4, 5, 6, 8, 10]), u: " cases", th: "neutral" },
  { intro: (v) => `Au club de basket de Saint-Denis, Noa tente ${v.length - 1} lancers francs.`, X: "le nombre de lancers francs réussis", moy: "le nombre moyen de paniers réussis", vals: deZero, u: "", th: "sport" },
  { intro: () => "L'équipe de football du lycée joue un match du championnat UNSS.", X: "le nombre de buts qu'elle marque", moy: "le nombre moyen de buts par match", vals: suite(0, 1), u: " buts", th: "sport" },
  { intro: () => "Le car jaune qui relie Saint-Pierre au Tampon arrive parfois en retard.", X: "le retard du car, en minutes", moy: "le retard moyen du car, en minutes", vals: parmi([0, 5, 10, 15, 20, 30]), u: " min", th: "reunion" },
  { intro: () => "Un marchand de letchis de Saint-André vend ses fruits en barquettes.", X: "le nombre de letchis abîmés dans une barquette", moy: "le nombre moyen de letchis abîmés par barquette", vals: deZero, u: "", th: "reunion" },
  { intro: (v) => `À Cilaos, on observe la météo pendant une semaine de vacances (au plus ${v[v.length - 1]} jours de pluie).`, X: "le nombre de jours de pluie de la semaine", moy: "le nombre moyen de jours de pluie par semaine", vals: suite(0, 2), u: " jours", th: "reunion" },
  { intro: () => "On s'intéresse aux éruptions du Piton de la Fournaise au cours d'une année.", X: "le nombre d'éruptions dans l'année", moy: "le nombre moyen d'éruptions par an", vals: deZero, u: "", th: "reunion" },
  { intro: () => "Dans un jeu vidéo, ouvrir un coffre rapporte des pièces d'or.", X: "le nombre de pièces trouvées dans un coffre", moy: "le nombre moyen de pièces par coffre", vals: parmi([5, 10, 20, 25, 50, 100, 200]), u: " pièces", th: "jeux_video" },
  { intro: () => "Léa ouvre un booster de cartes Pokémon.", X: "le nombre de cartes rares du booster", moy: "le nombre moyen de cartes rares par booster", vals: deZero, u: "", th: "jeux_video" },
  { intro: () => "Au club de fléchettes, Tom lance une fléchette sur la cible.", X: "le nombre de points marqués", moy: "le nombre moyen de points par fléchette", vals: parmi([0, 5, 10, 15, 25, 50]), u: " points", th: "sport" },
  { intro: () => "Au bowling, Inès joue le premier lancer d'une partie.", X: "le nombre de quilles renversées", moy: "le nombre moyen de quilles renversées", vals: suite(5, 6), u: " quilles", th: "sport" },
  { intro: () => "On lance un dé truqué à six faces.", X: "le numéro obtenu", moy: "la valeur moyenne du numéro obtenu", vals: parmi([1, 2, 3, 4, 5, 6]), u: "", th: "neutral" },
  { intro: () => "Dans un quartier de Saint-Leu, on choisit une famille au hasard.", X: "le nombre d'enfants de la famille", moy: "le nombre moyen d'enfants par famille", vals: suite(0, 1), u: " enfants", th: "reunion" },
  { intro: () => "Pendant la récréation, on choisit un élève au hasard.", X: "le nombre de messages qu'il reçoit sur son téléphone", moy: "le nombre moyen de messages reçus", vals: suite(0, 2), u: " messages", th: "neutral" },
  { intro: () => "Un jour de classe, on regarde une classe de seconde choisie au hasard.", X: "le nombre d'élèves absents", moy: "le nombre moyen d'absents par classe", vals: deZero, u: " absents", th: "neutral" },
  { intro: () => "Un pêcheur de Saint-Gilles part en mer pour la matinée.", X: "le nombre de poissons qu'il ramène", moy: "le nombre moyen de poissons par sortie", vals: suite(0, 3), u: " poissons", th: "reunion" },
  { intro: (v) => `À un quiz de ${v[v.length - 1]} questions, un élève répond au hasard.`, X: "le nombre de bonnes réponses", moy: "le nombre moyen de bonnes réponses", vals: deZero, u: "", th: "neutral" },
  { intro: () => "Au loto de la fête du village, on joue un carton.", X: "le gain, en euros, du carton", moy: "le gain moyen par carton, en euros", vals: parmi([0, 5, 10, 15, 30, 50, 100]), u: " €", th: "reunion" },
  { intro: () => "Au snack du front de mer, un client commande des samoussas.", X: "le nombre de samoussas commandés", moy: "le nombre moyen de samoussas par client", vals: suite(1, 3), u: " samoussas", th: "cuisine" },
  { intro: () => "Au club de tir à l'arc, Sacha tire une flèche.", X: "le score de la flèche", moy: "le score moyen d'une flèche", vals: parmi([0, 2, 4, 6, 8, 10]), u: " points", th: "sport" },
  { intro: () => "Au Scrabble, on pioche une lettre dans le sac.", X: "la valeur en points de la lettre piochée", moy: "la valeur moyenne d'une lettre piochée", vals: parmi([1, 2, 3, 4, 8, 10]), u: " points", th: "neutral" },
  { intro: () => "Un surfeur de Saint-Leu fait une session du matin.", X: "le nombre de vagues qu'il surfe", moy: "le nombre moyen de vagues par session", vals: suite(2, 5), u: " vagues", th: "sport" },
  { intro: () => "Aux petits chevaux, on lance le dé pour sortir ses chevaux pendant un tour de jeu.", X: "le nombre de chevaux sortis", moy: "le nombre moyen de chevaux sortis par tour", vals: deZero, u: "", th: "neutral" },
  { intro: () => "Un magasin de sport du Port suit les achats de ses clients.", X: "le nombre d'articles achetés par un client", moy: "le nombre moyen d'articles par client", vals: suite(1, 2), u: " articles", th: "neutral" },
  { intro: () => "Sur le parking de la plage de l'Hermitage, on choisit une voiture au hasard.", X: "la durée de stationnement, en heures", moy: "la durée moyenne de stationnement, en heures", vals: suite(1, 2), u: " h", th: "reunion" },
  { intro: () => "Dans un jeu en ligne, un défi quotidien rapporte de l'expérience.", X: "le nombre de points d'expérience gagnés", moy: "le nombre moyen de points d'expérience par défi", vals: parmi([10, 20, 30, 50, 80, 100, 150]), u: " points", th: "jeux_video" },
  { intro: () => "Au marché de Saint-Pierre, un vendeur de mangues pèse ses cagettes.", X: "le nombre de mangues trop mûres dans une cagette", moy: "le nombre moyen de mangues trop mûres par cagette", vals: deZero, u: "", th: "reunion" },
  { intro: () => "Une compagnie aérienne surveille un vol Saint-Denis – Paris.", X: "le nombre de passagers qui ne se présentent pas à l'embarquement", moy: "le nombre moyen de passagers absents par vol", vals: suite(0, 2), u: " passagers", th: "reunion" },
  { intro: () => "Au lycée, on interroge au hasard un élève de première.", X: "le nombre de fois où il est monté au Piton de la Fournaise", moy: "le nombre moyen de montées au volcan par élève", vals: deZero, u: "", th: "reunion" },
];

/** Une loi tirée : une situation, k valeurs, k probabilités en centièmes. */
type Loi = { s: Sit; v: number[]; c: number[] };
function tirerLoi(k: number, pas: 5 | 10, gains?: boolean): Loi {
  const pool = gains ? SITS.filter((s) => s.u === " €") : SITS;
  const s = pick(pool);
  return { s, v: s.vals(k), c: partition(k, pas) };
}
const decor = (L: Loi) => `${L.s.intro(L.v)} On note $X$ ${L.s.X}.`;
const pc = (c: number) => tx(c / 100);
/** La loi écrite, en quatre tournures. `cache` : l'indice dont la probabilité s'écrit `nom`. */
function loiTexte(v: number[], c: number[], cache = -1, nom = "p"): string {
  const P = (i: number) => (i === cache ? nom : pc(c[i]));
  const egal = v.map((x, i) => `$P(X=${tx(x)}) = ${P(i)}$`);
  switch (ri(0, 3)) {
    case 0:
      return `Sa loi : ${listeFr(egal)}.`;
    case 1:
      return `$X$ prend les valeurs ${listeFr(v.map((x) => `$${tx(x)}$`))} avec les probabilités respectives ${listeFr(v.map((_, i) => `$${P(i)}$`))}.`;
    case 2:
      return `Valeurs de $X$ : ${v.map((x) => `$${tx(x)}$`).join(" ; ")}. Probabilités : ${v.map((_, i) => `$${P(i)}$`).join(" ; ")}.`;
    default:
      return `La loi de $X$ est donnée par ${listeFr(egal)}.`;
  }
}
const graphe = (L: Loi) => loiGraph(L.v, L.c.map((x) => x / 100));

/* ---------- va_loi ---------- */
function loiManquante(e: DifficultyLevel): Q {
  const k = e <= 2 ? 3 : ri(3, 4);
  const L = tirerLoi(k, e <= 2 ? 10 : 5);
  const i = ri(0, k - 1);
  const autres = L.c.filter((_, j) => j !== i);
  const q = pick(["Combien vaut $p$ ?", "Détermine $p$.", "Quelle est la valeur de $p$ ?", "Calcule la probabilité manquante $p$."]);
  return {
    text: `${decor(L)} ${loiTexte(L.v, L.c, i)} ${q}`,
    format: "short",
    expected: acc(L.c[i] / 100),
    comparator: "number_equal",
    explanation: exp(
      "Dans une loi de probabilité, la somme des probabilités de toutes les valeurs vaut $1$.",
      `$p = 1 - (${autres.map(pc).join(" + ")})$.`,
      `$${autres.map(pc).join(" + ")} = ${tx(autres.reduce((a, b) => a + b, 0) / 100)}$, donc $p = 1 - ${tx(autres.reduce((a, b) => a + b, 0) / 100)} = ${pc(L.c[i])}$.`,
      `$P(X=${tx(L.v[i])}) = ${pc(L.c[i])}$.`,
    ),
  };
}

function loiValide(e: DifficultyLevel): Q {
  const k = e <= 3 ? ri(3, 4) : ri(4, 5);
  const L = tirerLoi(k, 5);
  const c = [...L.c];
  const cas = ri(0, 2);
  const i = ri(0, k - 1);
  let j = ri(0, k - 2);
  if (j >= i) j++;
  if (cas === 1) c[i] += pick(c[i] > 10 ? [-5, 5, 10] : [5, 10]); // la somme ne fait plus 1
  if (cas === 2) {
    const d = pick([5, 10]);
    c[j] += c[i] + d; // la somme reste 1, mais une probabilité devient négative
    c[i] = -d;
  }
  const S = c.reduce((a, b) => a + b, 0);
  const OUI = "oui, c'est une loi de probabilité";
  const SOMME = `non : la somme des probabilités vaut ${f4(S / 100)}`;
  const NEG = "non : une probabilité est négative";
  const bon = cas === 0 ? OUI : cas === 1 ? SOMME : NEG;
  const fausseSomme = `non : la somme des probabilités vaut ${f4((S + pick([-10, 10])) / 100)}`;
  const q = pick([
    "Cela définit-il bien une loi de probabilité ?",
    "Peut-on parler d'une loi de probabilité ?",
    "Cette loi est-elle possible ?",
  ]);
  const verif =
    `On vérifie deux choses : chaque probabilité est entre $0$ et $1$, et leur somme vaut $1$. ` +
    `Ici : $${c.map((x) => tx(x / 100)).join(" + ")} = ${tx(S / 100)}$.`;
  return {
    text: `${decor(L)} On propose : ${listeFr(L.v.map((x, n) => `$P(X=${tx(x)}) = ${tx(c[n] / 100)}$`))}. ${q}`,
    format: "qcm",
    ...qcmT(bon, [OUI, S === 100 ? fausseSomme : SOMME, NEG, "non : les valeurs de $X$ doivent être des probabilités"]),
    comparator: "mcq_exact",
    explanation: exp(
      "Une loi de probabilité associe à chaque valeur une probabilité comprise entre $0$ et $1$, et la somme de ces probabilités vaut $1$.",
      "Les valeurs de $X$, elles, peuvent être n'importe quels nombres.",
      verif + (cas === 2 ? ` La somme fait bien $1$, mais $${tx(c[i] / 100)}$ est négatif : impossible pour une probabilité.` : ""),
      bon === OUI ? "Oui : c'est bien une loi de probabilité." : `${maj(bon.replace("non : ", ""))} : ce n'est pas une loi de probabilité.`,
    ),
  };
}

/** Probabilités écrites p, 2p, 3p… pour une partie des valeurs : on trouve p par la somme. */
function loiParametre(e: DifficultyLevel): Q {
  let k = 3, m = 2, p = 10, a: number[] = [], fixes: number[] = [];
  for (let essai = 0; essai < 50; essai++) {
    k = ri(3, 4);
    m = ri(2, k - 1);
    p = pick([5, 10, 15, 20, 25]);
    a = range(1, m).map(() => ri(1, 4));
    const R = 100 - a.reduce((s, x) => s + x, 0) * p;
    if (R >= 5 * (k - m) && new Set(a).size > 1) {
      fixes = partition(k - m, 5, R);
      break;
    }
  }
  const s = pick(SITS);
  const v = s.vals(k);
  // Les valeurs « en p » sont mêlées aux autres.
  const quiP = melange(range(0, k - 1)).slice(0, m).sort((x, y) => x - y);
  const ecrit: string[] = [];
  const c: number[] = [];
  let ia = 0, ifx = 0;
  const coef: number[] = [];
  for (let i = 0; i < k; i++) {
    if (quiP.includes(i)) {
      const ai = a[ia++];
      coef.push(ai);
      ecrit.push(ai === 1 ? "p" : `${ai}p`);
      c.push(ai * p);
    } else {
      coef.push(0);
      ecrit.push(pc(fixes[ifx]));
      c.push(fixes[ifx++]);
    }
  }
  const C = a.reduce((x, y) => x + y, 0);
  const R = 100 - C * p;
  const fixesTxt = c.filter((_, i) => coef[i] === 0).map(pc);
  const cible = range(0, k - 1).filter((i) => coef[i] >= 2);
  const j = cible.length ? pick(cible) : -1;
  const demandeP = e <= 4 || j < 0;
  const q = demandeP
    ? pick(["Détermine $p$.", "Combien vaut $p$ ?", "Quelle valeur doit prendre $p$ ?"])
    : pick([`Calcule $P(X=${tx(v[j])})$.`, `Combien vaut $P(X=${tx(v[j])})$ ?`]);
  const rep = demandeP ? p / 100 : c[j] / 100;
  return {
    text: `${s.intro(v)} On note $X$ ${s.X}. Sa loi : ${listeFr(v.map((x, i) => `$P(X=${tx(x)}) = ${ecrit[i]}$`))}. ${q}`,
    format: "short",
    expected: acc(rep),
    comparator: "number_equal",
    explanation: exp(
      "La somme des probabilités d'une loi vaut $1$.",
      `$${ecrit.join(" + ")} = 1$, soit $${C}p + ${fixesTxt.length > 1 ? `(${fixesTxt.join(" + ")})` : fixesTxt[0]} = 1$.`,
      `$${C}p = 1 - ${tx(R / 100)} = ${tx((C * p) / 100)}$, donc $p = ${tx((C * p) / 100)} \\div ${C} = ${tx(p / 100)}$.` +
        (demandeP ? "" : ` Puis $P(X=${tx(v[j])}) = ${coef[j]}p = ${coef[j]} \\times ${tx(p / 100)} = ${tx(c[j] / 100)}$.`),
      demandeP ? `$p = ${tx(p / 100)}$.` : `$P(X=${tx(v[j])}) = ${tx(c[j] / 100)}$.`,
    ),
  };
}

/** Une roue, une urne… équiprobable : la loi se compte. */
const CONTENANTS = [
  { pose: (N: number) => `Une roue de la kermesse est partagée en $${N}$ secteurs identiques`, el: "secteurs", verbe: "rapportent", el1: "secteur", verbe1: "rapporte", tire: "On fait tourner la roue" },
  { pose: (N: number) => `Une urne de la fête de l'école contient $${N}$ jetons indiscernables au toucher`, el: "jetons", verbe: "valent", el1: "jeton", verbe1: "vaut", tire: "On tire un jeton au hasard" },
  { pose: (N: number) => `Pour la tombola du club de foot, on a préparé $${N}$ enveloppes`, el: "enveloppes", verbe: "contiennent", el1: "enveloppe", verbe1: "contient", tire: "On choisit une enveloppe au hasard" },
  { pose: (N: number) => `Au stand des cartes à retourner, il y a $${N}$ cartes faces cachées`, el: "cartes", verbe: "font gagner", el1: "carte", verbe1: "fait gagner", tire: "On retourne une carte au hasard" },
  { pose: (N: number) => `Un sachet de $${N}$ bonbons coco cache des bons d'achat sous les emballages`, el: "bonbons", verbe: "cachent", el1: "bonbon", verbe1: "cache", tire: "On prend un bonbon au hasard" },
  { pose: (N: number) => `Au jeu des canards de la fête foraine de Saint-Pierre, $${N}$ canards flottent sur l'eau`, el: "canards", verbe: "font gagner", el1: "canard", verbe1: "fait gagner", tire: "On pêche un canard au hasard" },
];
type Compte = { N: number; v: number[]; n: number[]; texte: string };
function tirerCompte(k: number): Compte {
  const ct = pick(CONTENANTS);
  const N = pick([8, 10, 12, 15, 16, 20, 24, 25]);
  const v = parmi([0, 1, 2, 3, 5, 10, 20])(k);
  const n = partition(k, 1, N);
  const parts = v.map((x, i) => (n[i] > 1 ? `$${n[i]}$ ${ct.el} ${ct.verbe} $${x}$ €` : `$1$ ${ct.el1} ${ct.verbe1} $${x}$ €`));
  return { N, v, n, texte: `${ct.pose(N)} : ${listeFr(parts)}. ${ct.tire} et on note $X$ le gain obtenu, en euros.` };
}
function loiCompte(e: DifficultyLevel): Q {
  const C = tirerCompte(ri(3, 4));
  const k = C.v.length;
  const kind = e <= 4 ? 0 : ri(0, 2);
  const j = ri(kind === 1 ? 1 : 0, kind === 2 ? k - 2 : k - 1);
  const ens = kind === 0 ? [j] : kind === 1 ? range(j, k - 1) : range(0, j);
  const nom = kind === 0 ? `P(X=${C.v[j]})` : kind === 1 ? `P(X \\geqslant ${C.v[j]})` : `P(X \\leqslant ${C.v[j]})`;
  const fav = ens.reduce((s, i) => s + C.n[i], 0);
  const q = pick([`Calcule $${nom}$.`, `Combien vaut $${nom}$ ?`, `Donne $${nom}$ sous forme de fraction.`]);
  return {
    text: `${C.texte} ${q}`,
    format: "short",
    expected: ecritures(fav, C.N),
    comparator: "fraction_decimal_equivalent",
    explanation: exp(
      `Les $${C.N}$ issues sont équiprobables : une probabilité se calcule par « cas favorables ÷ cas possibles ».`,
      kind === 0 ? `L'événement $\\{X=${C.v[j]}\\}$ correspond aux $${C.n[j]}$ issue(s) qui donnent $${C.v[j]}$ €.` : `On réunit les valeurs concernées : ${listeFr(ens.map((i) => `$${C.v[i]}$`))}, soit ${ens.length > 1 ? `$${ens.map((i) => C.n[i]).join(" + ")} = ${fav}$` : `$${fav}$`} issues.`,
      `$${nom} = \\dfrac{${fav}}{${C.N}}$${red(fav, C.N)[0] !== fav ? ` $= ${tf(fav, C.N).slice(1, -1)}$` : ""}.`,
      `$${nom} = ${tf(fav, C.N).slice(1, -1)}$.`,
    ),
  };
}

/* ---------- va_notation ---------- */
type Rel = { sym: (a: string, b?: string) => string; ok: (x: number, a: number, b?: number) => boolean; mots: string[] };
const REL: Record<string, Rel> = {
  ge: { sym: (a) => `X \\geqslant ${a}`, ok: (x, a) => x >= a, mots: ["est au moins égal à", "est supérieur ou égal à", "vaut au minimum"] },
  gt: { sym: (a) => `X > ${a}`, ok: (x, a) => x > a, mots: ["est strictement supérieur à", "dépasse strictement"] },
  le: { sym: (a) => `X \\leqslant ${a}`, ok: (x, a) => x <= a, mots: ["est au plus égal à", "ne dépasse pas", "vaut au maximum"] },
  lt: { sym: (a) => `X < ${a}`, ok: (x, a) => x < a, mots: ["est strictement inférieur à"] },
  ne: { sym: (a) => `X \\neq ${a}`, ok: (x, a) => x !== a, mots: ["est différent de"] },
  ab: { sym: (a, b) => `${a} \\leqslant X \\leqslant ${b}`, ok: (x, a, b) => x >= a && x <= (b as number), mots: ["est compris entre"] },
  ab2: { sym: (a, b) => `${a} < X \\leqslant ${b}`, ok: (x, a, b) => x > a && x <= (b as number), mots: [] },
};

function notationCalcul(e: DifficultyLevel): Q {
  const k = e <= 2 ? 3 : e === 3 ? ri(3, 4) : ri(4, 5);
  const L = tirerLoi(k, e <= 2 ? 10 : 5);
  const rels = e <= 2 ? ["ge", "le"] : e === 3 ? ["ge", "le", "gt", "lt"] : ["gt", "lt", "ne", "ab", "ab2", "ge", "le"];
  const r = pick(rels);
  // Le seuil : une valeur prise par X, sauf aux étoiles 5 où il peut tomber entre deux valeurs.
  const i = ri(1, k - 2);
  let a = L.v[i];
  if (e >= 5 && (r === "le" || r === "ge" || r === "gt" || r === "lt") && Math.random() < 0.5) a = (L.v[i] + L.v[i + 1]) / 2;
  const b = L.v[ri(i + 1, k - 1)];
  const nom = `P(${REL[r].sym(tx(a), tx(b))})`;
  const ens = range(0, k - 1).filter((n) => REL[r].ok(L.v[n], a, b));
  const S = ens.reduce((s, n) => s + L.c[n], 0);
  const q = pick([`Calcule $${nom}$.`, `Combien vaut $${nom}$ ?`, `Donne la valeur de $${nom}$.`]);
  return {
    text: `${decor(L)} ${loiTexte(L.v, L.c)} ${q}`,
    format: "short",
    expected: acc(S / 100),
    comparator: "number_equal",
    canvas: graphe(L),
    explanation: exp(
      `L'événement $\\{${REL[r].sym(tx(a), tx(b))}\\}$ réunit les valeurs de $X$ qui vérifient la condition ; on additionne leurs probabilités.`,
      `Valeurs retenues : ${listeFr(ens.map((n) => `$${tx(L.v[n])}$`))}${r === "gt" || r === "lt" || r === "ab2" ? " (le symbole strict exclut la borne)" : ""}.`,
      `$${nom} = ${ens.map((n) => pc(L.c[n])).join(" + ")} = ${tx(S / 100)}$.`,
      `$${nom} = ${tx(S / 100)}$.`,
    ),
  };
}

function notationTraduire(e: DifficultyLevel): Q {
  const L = tirerLoi(4, 10);
  const a = L.v[ri(1, 2)];
  if (e >= 4 && Math.random() < 0.5) {
    // Le contraire d'un événement.
    const [r, contr] = pick([["le", "gt"], ["lt", "ge"], ["ge", "lt"], ["gt", "le"]] as const);
    const ecr = (x: string) => `$\\{${REL[x].sym(tx(a))}\\}$`;
    const q = pick(["Quel est l'événement contraire de", "Quel événement est le contraire de", "L'événement contraire de"]);
    return {
      text: `${decor(L)} ${q} ${ecr(r)} ?`,
      format: "qcm",
      ...qcmT(ecr(contr), ["le", "lt", "ge", "gt", "ne"].map(ecr)),
      comparator: "mcq_exact",
      explanation: exp(
        "Le contraire d'un événement est réalisé exactement quand l'événement ne l'est pas.",
        `Le contraire de « ${REL[r].mots[0]} $${tx(a)}$ » est « ${REL[contr].mots[0]} $${tx(a)}$ » : la borne $${tx(a)}$ change de camp.`,
        `Le contraire de ${ecr(r)} est ${ecr(contr)}, et $P(${REL[contr].sym(tx(a))}) = 1 - P(${REL[r].sym(tx(a))})$.`,
        `${ecr(contr)}.`,
      ),
    };
  }
  const r = pick(e <= 2 ? ["ge", "le"] : ["ge", "gt", "le", "lt", "ne"]);
  const mot = pick(REL[r].mots);
  const ecr = (x: string) => `$\\{${REL[x].sym(tx(a))}\\}$`;
  const q = pick(["Quelle notation traduit l'événement", "Comment note-t-on l'événement", "Quel événement correspond à la phrase"]);
  return {
    text: `${decor(L)} ${q} « ${L.s.X.replace(/^le |^la /, (m) => maj(m))} ${mot} $${tx(a)}$ » ?`,
    format: "qcm",
    ...qcmT(ecr(r), ["ge", "gt", "le", "lt"].map(ecr)),
    comparator: "mcq_exact",
    explanation: exp(
      "Un événement lié à $X$ se note entre accolades, avec le symbole de comparaison qui traduit la phrase.",
      "« au moins », « au minimum », « supérieur ou égal » donnent $\\geqslant$ ; « au plus », « ne dépasse pas » donnent $\\leqslant$ ; « strictement » exclut la borne.",
      `« ${mot} $${tx(a)}$ » se traduit par ${ecr(r)}.`,
      `${ecr(r)}.`,
    ),
  };
}

/** P(X ≤ a) connue, P(X > a) cherchée : le contraire. */
function notationContraire(e: DifficultyLevel): Q {
  const s = pick(SITS);
  const v = s.vals(4);
  const a = v[ri(1, 2)];
  const q = ri(1, 19) * 5;
  const [r, contr] = pick([["le", "gt"], ["lt", "ge"], ["ge", "lt"], ["gt", "le"]] as const);
  const conn = `P(${REL[r].sym(tx(a))})`;
  const cher = `P(${REL[contr].sym(tx(a))})`;
  const qq = pick([`Combien vaut $${cher}$ ?`, `Déduis-en $${cher}$.`, `Calcule $${cher}$.`]);
  return {
    text: `${s.intro(v)} On note $X$ ${s.X}. On sait que $${conn} = ${tx(q / 100)}$. ${qq}`,
    format: "short",
    expected: acc(1 - q / 100),
    comparator: "number_equal",
    explanation: exp(
      `Les événements $\\{${REL[r].sym(tx(a))}\\}$ et $\\{${REL[contr].sym(tx(a))}\\}$ sont contraires : chaque issue réalise l'un ou l'autre, jamais les deux.`,
      `Donc $${cher} = 1 - ${conn}$.`,
      `$${cher} = 1 - ${tx(q / 100)} = ${tx((100 - q) / 100)}$.`,
      `$${cher} = ${tx((100 - q) / 100)}$.`,
    ),
  };
}

function genNotation(e: DifficultyLevel): Q {
  if (e <= 2) return pick([notationCalcul, notationTraduire])(2);
  if (e === 3) return pick([notationCalcul, notationTraduire])(3);
  if (e === 4) return pick([notationCalcul, notationTraduire, notationContraire])(4);
  return pick([notationCalcul, notationContraire, notationTraduire])(5);
}

/* ---------- va_esperance ---------- */
const Q_ESP = (L: Loi) => [
  "Calcule $E(X)$.",
  "Quelle est l'espérance de $X$ ?",
  `Calcule $E(X)$, c'est-à-dire ${L.s.moy} sur un grand nombre de répétitions.`,
  "Détermine l'espérance $E(X)$.",
];
function espCalcul(e: DifficultyLevel): Q {
  const k = e <= 2 ? ri(2, 3) : e === 3 ? ri(3, 4) : ri(4, 5);
  const L = tirerLoi(k, e <= 2 ? 10 : 5);
  const E = som1(L.v, L.c) / 100;
  const base = {
    text: `${decor(L)} ${loiTexte(L.v, L.c)} ${pick(Q_ESP(L))}`,
    canvas: graphe(L),
    explanation: exp(
      "L'espérance est la moyenne des valeurs de $X$ pondérée par leurs probabilités : $E(X) = \\sum x_i \\, P(X = x_i)$.",
      `$E(X) = ${sommeProduits(L.v, L.c)}$.`,
      `$E(X) = ${L.v.map((x, i) => tx((x * L.c[i]) / 100)).join(" + ")} = ${tx(E)}$.`,
      `$E(X) = ${tx(E)}$ : c'est ${L.s.moy} sur un grand nombre de répétitions.`,
    ),
  };
  if (e <= 3 && Math.random() < 0.5) {
    const moyVal = L.v.reduce((a, b) => a + b, 0) / k;
    const sansUne = E - (L.v[k - 1] * L.c[k - 1]) / 100;
    const sommeP = L.v.reduce((s, x, i) => s + x + L.c[i] / 100, 0);
    return { ...base, format: "qcm", ...qcmN(E, [Math.round(moyVal * 100) / 100, sansUne, sommeP, L.v[L.c.indexOf(Math.max(...L.c))]]), comparator: "mcq_exact" };
  }
  return { ...base, format: "short", expected: acc(E), comparator: "number_equal" };
}

/** Une probabilité manque : on la trouve, puis on calcule E(X). */
function espDeuxEtapes(e: DifficultyLevel): Q {
  const L = tirerLoi(ri(3, 4), 5);
  const i = ri(0, L.v.length - 1);
  const autres = L.c.filter((_, j) => j !== i);
  const E = som1(L.v, L.c) / 100;
  return {
    text: `${decor(L)} ${loiTexte(L.v, L.c, i)} ${pick(["Calcule $p$, puis $E(X)$. Donne $E(X)$.", "Après avoir trouvé $p$, calcule l'espérance de $X$.", "Quelle est l'espérance de $X$ ? (Commence par trouver $p$.)"])}`,
    format: "short",
    expected: acc(E),
    comparator: "number_equal",
    explanation: exp(
      "Il faut d'abord la loi complète : la somme des probabilités vaut $1$. Puis $E(X) = \\sum x_i \\, P(X = x_i)$.",
      `$p = 1 - (${autres.map(pc).join(" + ")}) = ${pc(L.c[i])}$.`,
      `$E(X) = ${sommeProduits(L.v, L.c)} = ${tx(E)}$.`,
      `$E(X) = ${tx(E)}$.`,
    ),
  };
}

/** Y = aX + b : la linéarité de l'espérance. */
function espLineaire(e: DifficultyLevel): Q {
  const L = tirerLoi(ri(3, 4), e >= 5 ? 5 : 10);
  const E = som1(L.v, L.c) / 100;
  const a = pick([2, 3, 4, 5, -1, -2, 10]);
  const b = pick([-5, -3, -2, 1, 2, 4, 5, 10]);
  const EY = a * E + b;
  const Y = `${a === -1 ? "-" : a}X ${b < 0 ? "-" : "+"} ${Math.abs(b)}`;
  const avecLoi = Math.random() < 0.5;
  const pose = avecLoi ? `${loiTexte(L.v, L.c)}` : `On a calculé $E(X) = ${tx(E)}$.`;
  const q = pick([`On pose $Y = ${Y}$. Calcule $E(Y)$.`, `Quelle est l'espérance de $Y = ${Y}$ ?`, `Combien vaut $E(${Y})$ ?`]);
  return {
    text: `${decor(L)} ${pose} ${q}`,
    format: "qcm",
    ...qcmN(EY, [a * E, E + b, a * (E + b), Math.abs(a) * E + b]),
    comparator: "mcq_exact",
    explanation: exp(
      "L'espérance est linéaire : $E(aX + b) = a\\,E(X) + b$.",
      avecLoi ? `D'abord $E(X) = ${sommeProduits(L.v, L.c)} = ${tx(E)}$.` : `On part de $E(X) = ${tx(E)}$.`,
      `$E(Y) = ${par(a)} \\times ${par(E)} ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${tx(EY)}$.`,
      `$E(Y) = ${tx(EY)}$.`,
    ),
  };
}

/** Une valeur de X est inconnue ; E(X) est connue. */
function espInconnue(e: DifficultyLevel): Q {
  const L = tirerLoi(ri(3, 4), 5);
  const i = pick(range(0, L.v.length - 1).filter((j) => L.v[j] !== 0));
  const E = som1(L.v, L.c) / 100;
  const reste = (som1(L.v, L.c) - L.v[i] * L.c[i]) / 100;
  const vt = L.v.map((x, j) => (j === i ? "a" : tx(x)));
  return {
    text: `${L.s.intro(L.v)} On note $X$ ${L.s.X}. $X$ prend les valeurs ${listeFr(vt.map((x) => `$${x}$`))} avec les probabilités respectives ${listeFr(L.c.map((c) => `$${pc(c)}$`))}. On sait que $E(X) = ${tx(E)}$. ${pick(["Combien vaut $a$ ?", "Détermine la valeur $a$.", "Retrouve la valeur manquante $a$."])}`,
    format: "short",
    expected: acc(L.v[i]),
    comparator: "number_equal",
    explanation: exp(
      "$E(X) = \\sum x_i \\, P(X = x_i)$ donne une équation d'inconnue $a$.",
      `$${vt.map((x, j) => `${x} \\times ${pc(L.c[j])}`).join(" + ")} = ${tx(E)}$, soit $${pc(L.c[i])}\\,a + ${par(reste)} = ${tx(E)}$.`,
      `$${pc(L.c[i])}\\,a = ${tx(E)} - ${par(reste)} = ${tx(E - reste)}$, donc $a = ${tx(E - reste)} \\div ${pc(L.c[i])} = ${tx(L.v[i])}$.`,
      `$a = ${tx(L.v[i])}$.`,
    ),
  };
}

function genEsperance(e: DifficultyLevel): Q {
  if (e <= 3) return espCalcul(e);
  if (e === 4) return pick([espCalcul, espDeuxEtapes, espLineaire])(4);
  return pick([espLineaire, espInconnue, espDeuxEtapes])(5);
}

/* ---------- va_esperance_probleme : mise, gain net, jeu équitable ---------- */
const JEUX = [
  "À la kermesse du lycée, une partie de roue coûte",
  "Au stand de la fête de Saint-Gilles, une partie coûte",
  "Un jeu de grattage du marché forain coûte",
  "Pour la tombola du club de handball, un billet coûte",
  "Au jeu des canards de la fête foraine, une pêche coûte",
  "Dans un jeu en ligne, une partie classée coûte",
  "À la fête de l'école, un tirage dans l'urne coûte",
  "Au loto du quartier, un carton coûte",
];
type Jeu = { mise: number; v: number[]; c: number[]; texte: string; E: number };
/** Un jeu : mise, gains BRUTS (ce que l'on reçoit) et leurs probabilités en centièmes. */
function tirerJeu(): Jeu {
  const k = ri(3, 4);
  const v = parmi([0, 1, 2, 3, 4, 5, 8, 10, 15, 20, 50])(k);
  if (v[0] !== 0) v[0] = 0;
  const c = partition(k, 5);
  // Le perdant (gain 0) est le plus probable, comme dans un vrai jeu.
  c.sort((a, b) => b - a);
  const mise = pick([1, 2, 3, 4, 5]);
  const tour = pick([
    () => `${pick(JEUX)} $${mise}$ €. On reçoit ${listeFr(v.map((x, i) => `$${x}$ € avec la probabilité $${pc(c[i])}$`))}.`,
    () => `${pick(JEUX)} $${mise}$ €. La somme reçue vaut ${listeFr(v.map((x) => `$${x}$`))} € avec les probabilités respectives ${listeFr(c.map((x) => `$${pc(x)}$`))}.`,
  ])();
  return { mise, v, c, texte: tour, E: som1(v, c) / 100 };
}

function espNet(e: DifficultyLevel): Q {
  const J = tirerJeu();
  const net = J.E - J.mise;
  const kind = e <= 3 ? ri(0, 1) : ri(0, 2);
  const Gx = "On note $G$ le gain NET du joueur (somme reçue moins la mise).";
  if (kind === 0) {
    // E(G) directement.
    return {
      text: `${J.texte} ${Gx} ${pick(["Calcule $E(G)$.", "Quelle est l'espérance du gain net ?", "Combien un joueur gagne-t-il en moyenne par partie, mise déduite ?"])}`,
      format: "qcm",
      ...qcmN(net, [J.E, J.E + J.mise, -J.mise, net - J.mise]),
      comparator: "mcq_exact",
      explanation: exp(
        "Le gain net retranche la mise dans TOUS les cas : $G = X - m$, où $X$ est la somme reçue, donc $E(G) = E(X) - m$.",
        `$E(X) = ${sommeProduits(J.v, J.c)} = ${tx(J.E)}$.`,
        `$E(G) = ${tx(J.E)} - ${J.mise} = ${tx(net)}$.`,
        `$E(G) = ${tx(net)}$ € par partie.`,
      ),
    };
  }
  if (kind === 1) {
    const verdict = net > 0 ? "favorable au joueur" : net < 0 ? "défavorable au joueur" : "équitable";
    return {
      text: `${J.texte} ${Gx} ${pick(["Le jeu est-il favorable au joueur ?", "Que dire de ce jeu pour le joueur ?", "Ce jeu est-il équitable ?"])}`,
      format: "qcm",
      ...qcmT(verdict, ["favorable au joueur", "défavorable au joueur", "équitable", "on ne peut pas savoir sans jouer"]),
      comparator: "mcq_exact",
      explanation: exp(
        "On compare l'espérance du gain net à $0$ : positive, le jeu est favorable ; négative, défavorable ; nulle, équitable.",
        `$E(X) = ${sommeProduits(J.v, J.c)} = ${tx(J.E)}$, donc $E(G) = ${tx(J.E)} - ${J.mise} = ${tx(net)}$.`,
        `$E(G) ${net > 0 ? ">" : net < 0 ? "<" : "="} 0$.`,
        `Le jeu est ${verdict}.`,
      ),
    };
  }
  // Le bénéfice de l'organisateur sur n parties.
  const n = pick([50, 100, 200, 250, 500, 1000]);
  const benef = n * (J.mise - J.E);
  return {
    text: `${J.texte} ${pick([`L'organisateur prévoit $${n}$ parties.`, `On attend $${n}$ joueurs, une partie chacun.`])} ${pick(["Quel bénéfice moyen, en euros, peut-il espérer ?", "Combien d'euros l'organisateur peut-il espérer gagner au total ?"])}`,
    format: "short",
    expected: acc(benef),
    comparator: "number_equal",
    explanation: exp(
      "Par partie, l'organisateur encaisse la mise et verse la somme gagnée : son gain moyen est $m - E(X)$.",
      `$E(X) = ${sommeProduits(J.v, J.c)} = ${tx(J.E)}$, donc par partie : $${J.mise} - ${tx(J.E)} = ${tx(J.mise - J.E)}$ €.`,
      `Sur $${n}$ parties : $${n} \\times ${par(J.mise - J.E)} = ${tx(benef)}$ €.`,
      `Environ $${tx(benef)}$ € ${benef < 0 ? "(une perte : le jeu est favorable aux joueurs)" : ""}.`,
    ),
  };
}

/** La mise ou le gros lot qui rendent le jeu équitable. */
function espEquitable(e: DifficultyLevel): Q {
  const J = tirerJeu();
  if (Math.random() < 0.5) {
    return {
      text: `${J.texte.replace(/ coûte \$\d+\$ €\./, " coûte $m$ €.")} ${pick(["Quelle mise $m$ rend le jeu équitable ?", "Pour quelle valeur de $m$ le jeu est-il équitable ?", "Combien doit coûter la partie pour que le jeu soit équitable ?"])}`,
      format: "short",
      expected: acc(J.E),
      comparator: "number_equal",
      explanation: exp(
        "Un jeu est équitable quand l'espérance du gain net est nulle : $E(X) - m = 0$, donc $m = E(X)$.",
        `$E(X) = ${sommeProduits(J.v, J.c)}$.`,
        `$E(X) = ${tx(J.E)}$.`,
        `La mise équitable est $m = ${tx(J.E)}$ €.`,
      ),
    };
  }
  // Le gros lot inconnu : E(X) = mise.
  const k = J.v.length;
  const reste = (som1(J.v, J.c) - J.v[k - 1] * J.c[k - 1]) / 100;
  const cible = pick([J.mise, J.mise + 1, J.mise + 2].filter((m) => (m - reste) / (J.c[k - 1] / 100) > J.v[k - 2]));
  const mise = cible ?? Math.ceil(J.E) + 1;
  const lot = ((mise - reste) * 100) / J.c[k - 1];
  const vt = J.v.map((x, i) => (i === k - 1 ? "L" : String(x)));
  return {
    text: `${pick(JEUX)} $${mise}$ €. On reçoit ${listeFr(vt.map((x, i) => `$${x}$ € avec la probabilité $${pc(J.c[i])}$`))}. ${pick(["Quel montant $L$ du gros lot rend le jeu équitable ?", "Combien doit valoir le gros lot $L$ pour que le jeu soit équitable ?"])} (Arrondis au centième si besoin.)`,
    format: "short",
    expected: acc(Math.round(lot * 100) / 100),
    comparator: "number_equal",
    explanation: exp(
      "Le jeu est équitable quand la somme reçue en moyenne égale la mise : $E(X) = m$.",
      `$${vt.map((x, i) => `${x} \\times ${pc(J.c[i])}`).join(" + ")} = ${mise}$, soit $${pc(J.c[k - 1])}\\,L + ${tx(reste)} = ${mise}$.`,
      `$L = (${mise} - ${tx(reste)}) \\div ${pc(J.c[k - 1])} ${Math.abs(lot - Math.round(lot * 100) / 100) < 1e-9 ? "=" : "\\approx"} ${tx(Math.round(lot * 100) / 100)}$.`,
      `Le gros lot doit valoir $${tx(Math.round(lot * 100) / 100)}$ €.`,
    ),
  };
}

function genEspProbleme(e: DifficultyLevel): Q {
  if (e <= 3) return espNet(3);
  if (e === 4) return pick([espNet, espNet, espEquitable])(4);
  return pick([espEquitable, espNet])(5);
}

/* ---------- va_variance et va_ecart_type ---------- */
/** Une loi dont la variance reste lisible (valeurs pas trop grandes). */
function tirerLoiV(k: number, pas: 5 | 10): Loi {
  for (let essai = 0; essai < 30; essai++) {
    const L = tirerLoi(k, pas);
    if (Math.max(...L.v.map(Math.abs)) <= 20) return L;
  }
  return tirerLoi(k, pas);
}
/** « (x − E)² × p » détaillé, pour l'explication. */
const ecartsCarres = (L: Loi, E: number) => L.v.map((x, i) => `${pc(L.c[i])} \\times (${tx(x)} - ${par(E)})^2`).join(" + ");
/** Arrondi annoncé ou non : la valeur exacte quand elle tombe au centième. */
function arrondi(x: number) {
  const r = Math.round(x * 100) / 100;
  return { r, exact: Math.abs(x - r) < 1e-9, txt: Math.abs(x - r) < 1e-9 ? "" : " Arrondis au centième." };
}

function varCalcul(e: DifficultyLevel): Q {
  const k = e <= 3 ? 3 : ri(3, 4);
  const L = tirerLoiV(k, e <= 3 ? 10 : 5);
  const E = som1(L.v, L.c) / 100;
  const V = var4(L.v, L.c) / 10000;
  const A = arrondi(V);
  const EX2 = som2(L.v, L.c) / 100;
  const donneE = e <= 3 && Math.random() < 0.6;
  const q = pick(["Calcule $V(X)$.", "Quelle est la variance de $X$ ?", "Détermine la variance $V(X)$."]);
  const koenig = Math.random() < 0.5;
  return {
    text: `${decor(L)} ${loiTexte(L.v, L.c)}${donneE ? ` On a $E(X) = ${tx(E)}$.` : ""} ${q}${A.txt}`,
    format: "short",
    expected: acc(A.r),
    comparator: "number_equal",
    canvas: graphe(L),
    explanation: exp(
      "La variance mesure la dispersion autour de l'espérance : $V(X) = \\sum P(X = x_i)\\,(x_i - E(X))^2 = E(X^2) - E(X)^2$.",
      donneE ? `$E(X) = ${tx(E)}$ est donnée.` : `D'abord $E(X) = ${sommeProduits(L.v, L.c)} = ${tx(E)}$.`,
      koenig
        ? `$E(X^2) = ${L.v.map((x, i) => `${par(x)}^2 \\times ${pc(L.c[i])}`).join(" + ")} = ${tx(EX2)}$, puis $V(X) = ${tx(EX2)} - ${par(E)}^2 = ${tx(V)}$.`
        : `$V(X) = ${ecartsCarres(L, E)} = ${tx(V)}$.`,
      `$V(X) ${A.exact ? "=" : "\\approx"} ${tx(A.r)}$.`,
    ),
  };
}

/** König-Huygens : E(X²) et E(X) donnés. */
function varKoenig(e: DifficultyLevel): Q {
  const L = tirerLoiV(ri(3, 4), 10);
  const E = som1(L.v, L.c) / 100;
  const EX2 = som2(L.v, L.c) / 100;
  const V = var4(L.v, L.c) / 10000;
  return {
    text: `${decor(L)} On a calculé $E(X) = ${tx(E)}$ et $E(X^2) = ${tx(EX2)}$. ${pick(["Calcule $V(X)$.", "Déduis-en la variance de $X$.", "Combien vaut $V(X)$ ?"])}`,
    format: "qcm",
    ...qcmN(V, [EX2 - E, EX2, EX2 + E * E, E * E - EX2, EX2 - 2 * E]),
    comparator: "mcq_exact",
    explanation: exp(
      "Formule de König-Huygens : $V(X) = E(X^2) - E(X)^2$ — on élève l'espérance au carré.",
      `$E(X)^2 = ${par(E)}^2 = ${tx(E * E)}$.`,
      `$V(X) = ${tx(EX2)} - ${tx(E * E)} = ${tx(V)}$.`,
      `$V(X) = ${tx(V)}$.`,
    ),
  };
}

/** V(aX + b) = a² V(X) ; σ(aX + b) = |a| σ(X). */
function varAffine(e: DifficultyLevel, sigma: boolean): Q {
  const s = pick(SITS);
  const a = pick([2, 3, -2, -3, 5, 10, -1, 4]);
  const b = pick([-10, -4, -2, 3, 5, 7, 20]);
  const sX = pick([0.5, 1.2, 1.5, 2, 2.5, 3, 4, 0.8, 1.4]);
  const vX = Math.round(sX * sX * 100) / 100;
  const Y = `${a === -1 ? "-" : a}X ${b < 0 ? "-" : "+"} ${Math.abs(b)}`;
  const donne = sigma ? `$\\sigma(X) = ${tx(sX)}$` : `$V(X) = ${tx(vX)}$`;
  const rep = sigma ? Math.abs(a) * sX : a * a * vX;
  const q = sigma
    ? pick([`Calcule $\\sigma(Y)$ pour $Y = ${Y}$.`, `Quel est l'écart-type de $Y = ${Y}$ ?`])
    : pick([`Calcule $V(Y)$ pour $Y = ${Y}$.`, `Quelle est la variance de $Y = ${Y}$ ?`]);
  const leurres = sigma ? [a * sX, Math.abs(a) * sX + b, a * a * sX, sX] : [a * vX, a * a * vX + b, a * vX + b, vX];
  return {
    text: `${s.intro(s.vals(3))} On note $X$ ${s.X}, et on sait que ${donne}. ${q}`,
    format: "qcm",
    ...qcmN(Math.round(rep * 10000) / 10000, leurres),
    comparator: "mcq_exact",
    explanation: exp(
      sigma
        ? "Un décalage $+b$ ne change pas la dispersion ; un facteur $a$ la multiplie par $|a|$ : $\\sigma(aX + b) = |a|\\,\\sigma(X)$."
        : "Un décalage $+b$ ne change pas la dispersion ; un facteur $a$ multiplie la variance par $a^2$ : $V(aX + b) = a^2\\,V(X)$.",
      `Ici $a = ${a}$ et $b = ${b}$ : le $${b}$ disparaît${a < 0 ? ", et le signe de $a$ aussi" : ""}.`,
      sigma ? `$\\sigma(Y) = |${a}| \\times ${tx(sX)} = ${tx(rep)}$.` : `$V(Y) = ${par(a)}^2 \\times ${tx(vX)} = ${a * a} \\times ${tx(vX)} = ${tx(rep)}$.`,
      sigma ? `$\\sigma(Y) = ${tx(rep)}$.` : `$V(Y) = ${tx(rep)}$.`,
    ),
  };
}

function genVariance(e: DifficultyLevel): Q {
  if (e <= 3) return varCalcul(3);
  if (e === 4) return pick([varCalcul, varKoenig])(4);
  return pick([varCalcul, varKoenig, (x: DifficultyLevel) => varAffine(x, false)])(5);
}

function etDepuisV(e: DifficultyLevel): Q {
  const s = pick(SITS);
  const exact = Math.random() < 0.5;
  const V = exact ? Math.round(pick([0.5, 0.6, 0.7, 0.8, 0.9, 1.1, 1.2, 1.3, 1.5, 2, 2.5, 3, 4, 1.6, 0.4]) ** 2 * 100) / 100 : ri(2, 60) / 4;
  const sig = Math.sqrt(V);
  const A = arrondi(sig);
  return {
    text: `${s.intro(s.vals(3))} On note $X$ ${s.X}, et $V(X) = ${tx(V)}$. ${pick(["Calcule l'écart-type $\\sigma(X)$.", "Quel est l'écart-type de $X$ ?", "Déduis-en $\\sigma(X)$."])}${A.txt}`,
    format: "qcm",
    ...qcmN(A.r, [V / 2, V * V, Math.round((V * V) * 100) / 100, Math.round(Math.sqrt(V / 2) * 100) / 100, V]),
    comparator: "mcq_exact",
    explanation: exp(
      "L'écart-type est la racine carrée de la variance : $\\sigma(X) = \\sqrt{V(X)}$. Il s'exprime dans la même unité que $X$.",
      `$\\sigma(X) = \\sqrt{${tx(V)}}$.`,
      `$\\sqrt{${tx(V)}} ${A.exact ? "=" : "\\approx"} ${tx(A.r)}$${A.exact ? `, car $${tx(A.r)}^2 = ${tx(V)}$` : ""}.`,
      `$\\sigma(X) ${A.exact ? "=" : "\\approx"} ${tx(A.r)}$.`,
    ),
  };
}

const DUOS: [string, string][] = [["Noa", "Inès"], ["Lucas", "Maëlys"], ["Tom", "Léa"], ["Sacha", "Emma"], ["Kylian", "Jade"], ["Nathan", "Chloé"], ["Enzo", "Lina"]];
const COMPARE = [
  { quoi: "le nombre de points marqués par match au basket", reg: "le plus régulier" },
  { quoi: "le score d'une volée au tir à l'arc", reg: "le plus régulier" },
  { quoi: "le temps, en minutes, d'un trajet en car jaune jusqu'au lycée", reg: "le plus régulier" },
  { quoi: "le nombre de vagues surfées par session à Saint-Leu", reg: "le plus régulier" },
  { quoi: "le gain, en euros, à un jeu de grattage", reg: "le moins risqué" },
  { quoi: "le nombre de poissons pêchés par sortie", reg: "le plus régulier" },
  { quoi: "la note sur 20 aux contrôles de maths", reg: "le plus régulier" },
  { quoi: "le temps, en minutes, d'une montée au Piton des Neiges", reg: "le plus régulier" },
];
function etInterpreter(e: DifficultyLevel): Q {
  const [A, B] = melange(pick(DUOS));
  const c = pick(COMPARE);
  const E = ri(4, 40);
  const sA = ri(2, 15) / 2;
  let sB = ri(2, 15) / 2;
  if (sB === sA) sB += 2;
  const gagnant = sA < sB ? A : B;
  const perdant = sA < sB ? B : A;
  const bon = `${gagnant}, car son écart-type est plus petit`;
  return {
    text: `On modélise ${c.quoi} par une variable aléatoire $X$ pour ${A}, et $Y$ pour ${B}. On a $E(X) = E(Y) = ${E}$, $\\sigma(X) = ${tx(sA)}$ et $\\sigma(Y) = ${tx(sB)}$. ${pick(["Qui est", "Lequel des deux est"])} ${c.reg} ?`,
    format: "qcm",
    ...qcmT(bon, [`${perdant}, car son écart-type est plus grand`, "aucun : ils ont la même espérance", `${perdant}, car son écart-type est plus petit`, `${gagnant}, car son espérance est plus grande`]),
    comparator: "mcq_exact",
    explanation: exp(
      "L'espérance donne la valeur moyenne ; l'écart-type mesure à quel point les valeurs s'en écartent.",
      `Les espérances sont égales ($${E}$) : elles ne permettent pas de départager. On compare les écarts-types : $${tx(Math.min(sA, sB))} < ${tx(Math.max(sA, sB))}$.`,
      `Les valeurs ${/^[aeiouéèêh]/i.test(gagnant) ? "d'" : "de "}${gagnant} restent plus proches de $${E}$ : moins de dispersion.`,
      `Réponse : ${gagnant}, dont l'écart-type est le plus petit.`,
    ),
  };
}

function etCalcul(e: DifficultyLevel): Q {
  const L = tirerLoiV(e <= 4 ? 3 : ri(3, 4), e <= 4 ? 10 : 5);
  const E = som1(L.v, L.c) / 100;
  const V = var4(L.v, L.c) / 10000;
  const A = arrondi(Math.sqrt(V));
  return {
    text: `${decor(L)} ${loiTexte(L.v, L.c)} ${pick(["Calcule l'écart-type $\\sigma(X)$.", "Quel est l'écart-type de $X$ ?", "Détermine $\\sigma(X)$."])}${A.txt}`,
    format: "short",
    expected: acc(A.r),
    comparator: "number_equal",
    canvas: graphe(L),
    explanation: exp(
      "On calcule $E(X)$, puis $V(X)$, puis $\\sigma(X) = \\sqrt{V(X)}$.",
      `$E(X) = ${sommeProduits(L.v, L.c)} = ${tx(E)}$.`,
      `$V(X) = ${ecartsCarres(L, E)} = ${tx(V)}$, donc $\\sigma(X) = \\sqrt{${tx(V)}} ${A.exact ? "=" : "\\approx"} ${tx(A.r)}$.`,
      `$\\sigma(X) ${A.exact ? "=" : "\\approx"} ${tx(A.r)}$${L.s.u} : c'est l'écart typique à la moyenne $${tx(E)}$.`,
    ),
  };
}

function genEcartType(e: DifficultyLevel): Q {
  if (e <= 3) return pick([etDepuisV, etInterpreter])(3);
  if (e === 4) return pick([etCalcul, etDepuisV, etInterpreter])(4);
  return pick([etCalcul, (x: DifficultyLevel) => varAffine(x, true)])(5);
}

/* ---------- va_definition ---------- */
const EXPERIENCES: { exp: string; num: string[]; non: string[] }[] = [
  { exp: "On lance deux dés à six faces.", num: ["la somme des deux résultats", "le plus grand des deux résultats", "le produit des deux résultats"], non: ["le couple formé par les deux résultats", "la mention « double » ou « pas double »"] },
  { exp: "On tire une carte dans un jeu de $32$ cartes.", num: ["le nombre de points de la carte à la belote", "le gain : $5$ € pour un as, $0$ € sinon", "le nombre de cœurs tirés (0 ou 1)"], non: ["la couleur de la carte (cœur, carreau, pique ou trèfle)", "le nom de la carte tirée"] },
  { exp: "On lance trois fois une pièce.", num: ["le nombre de PILE obtenus", "le gain : $2$ € par PILE", "le nombre de FACE moins le nombre de PILE"], non: ["la suite des côtés obtenus, comme PFP", "le côté obtenu au premier lancer"] },
  { exp: "On interroge un élève du lycée au hasard.", num: ["sa taille en centimètres", "son nombre de frères et sœurs", "sa note au dernier contrôle"], non: ["sa commune (Saint-Paul, Le Port…)", "son sport préféré"] },
  { exp: "On observe le car jaune Saint-Pierre – Le Tampon un matin.", num: ["son retard en minutes", "le nombre de passagers à bord"], non: ["le nom du chauffeur", "la mention « à l'heure » ou « en retard »"] },
  { exp: "On observe la météo à Cilaos un jour de juillet.", num: ["la quantité de pluie en millimètres", "la température maximale en degrés"], non: ["le temps qu'il fait : soleil, nuages ou pluie", "la direction du vent"] },
  { exp: "On fait tourner la roue de la kermesse.", num: ["le gain en euros", "le numéro du secteur obtenu"], non: ["la couleur du secteur obtenu", "le nom du lot gagné (peluche, ballon…)"] },
  { exp: "On ouvre un coffre dans un jeu vidéo.", num: ["le nombre de pièces d'or trouvées", "les points d'expérience gagnés"], non: ["le type d'objet trouvé (épée, bouclier…)", "la rareté de l'objet (commun, rare, légendaire)"] },
  { exp: "L'équipe du lycée joue un match de football.", num: ["le nombre de buts marqués", "l'écart de buts à la fin du match"], non: ["le résultat : victoire, nul ou défaite", "le nom du buteur"] },
  { exp: "On tire trois billes, avec remise, dans un sac de billes rouges et bleues.", num: ["le nombre de billes rouges tirées", "le gain : $3$ € par bille rouge"], non: ["la couleur de la première bille", "la liste des couleurs tirées"] },
  { exp: "On achète une barquette de letchis au marché.", num: ["le nombre de letchis abîmés", "la masse de la barquette en grammes"], non: ["la variété des letchis", "le nom du vendeur"] },
];
function defEstVA(e: DifficultyLevel): Q {
  const x = pick(EXPERIENCES);
  const ok = Math.random() < 0.55;
  const d = pick(ok ? x.num : x.non);
  const OUI = "oui";
  const NON = "non : elle ne donne pas un nombre";
  const q = pick([
    `On note $X$ ${d}. $X$ est-elle une variable aléatoire réelle ?`,
    `On s'intéresse ${/^le /.test(d) ? d.replace(/^le /, "au ") : /^les /.test(d) ? d.replace(/^les /, "aux ") : `à ${d}`}. Peut-on en faire une variable aléatoire $X$ telle quelle ?`,
    `On définit $X$ comme ${d}. Est-ce une variable aléatoire ?`,
  ]);
  return {
    text: `${x.exp} ${q}`,
    format: "qcm",
    ...qcmT(ok ? OUI : NON, [OUI, NON, "non : ce n'est pas aléatoire", "oui : toute information sur l'issue convient"]),
    comparator: "mcq_exact",
    explanation: exp(
      "Une variable aléatoire est une FONCTION qui associe un NOMBRE réel à chaque issue de l'expérience.",
      `On regarde ce que « ${d} » associe à une issue.`,
      ok ? "C'est un nombre, qui dépend du hasard : la définition est respectée." : "Ce n'est pas un nombre mais une catégorie ou une liste. On pourrait la CODER par des nombres (par exemple $1$ et $0$) : c'est alors ce codage qui serait une variable aléatoire.",
      ok ? "Oui, $X$ est une variable aléatoire." : "Non, pas en l'état : il faut un nombre.",
    ),
  };
}

/** Deux dés à n faces, ou n pièces : de quoi compter valeurs et issues. */
const DES: [number, string][] = [[4, "deux dés tétraédriques (faces 1 à 4)"], [6, "deux dés à six faces"], [8, "deux dés à huit faces de jeu de rôle"], [10, "deux dés à dix faces (1 à 10)"], [12, "deux dés à douze faces"]];
type Regle = { nom: string; f: (i: number, j: number) => number };
const REGLES: Regle[] = [
  { nom: "la somme des deux résultats", f: (i, j) => i + j },
  { nom: "le plus grand des deux résultats", f: (i, j) => Math.max(i, j) },
  { nom: "l'écart entre les deux résultats (le plus grand moins le plus petit)", f: (i, j) => Math.abs(i - j) },
  { nom: "le plus petit des deux résultats", f: (i, j) => Math.min(i, j) },
];
type Modele = { exp: string; X: string; issues: number[]; nIssues: string };
function tirerModele(): Modele {
  if (Math.random() < 0.7) {
    const [n, nom] = pick(DES);
    const r = pick(REGLES);
    const issues = range(1, n).flatMap((i) => range(1, n).map((j) => r.f(i, j)));
    return { exp: `On lance ${nom}, bien équilibrés.`, X: r.nom, issues, nIssues: `$${n} \\times ${n} = ${n * n}$ couples équiprobables` };
  }
  const n = ri(2, 5);
  const a = pick([1, 2, 3, 5]);
  const issues = range(0, 2 ** n - 1).map((m) => m.toString(2).split("").filter((b) => b === "1").length * a);
  return {
    exp: `On lance ${n} fois une pièce équilibrée.`,
    X: a === 1 ? "le nombre de PILE obtenus" : `le gain, en euros : $${a}$ € par PILE`,
    issues,
    nIssues: `$2^${n} = ${2 ** n}$ suites équiprobables`,
  };
}
function defValeurs(e: DifficultyLevel): Q {
  const M = tirerModele();
  const vals = [...new Set(M.issues)].sort((x, y) => x - y);
  const kind = ri(0, 2);
  const q = [
    "Combien de valeurs différentes $X$ peut-elle prendre ?",
    "Quelle est la plus grande valeur prise par $X$ ?",
    "Quelle est la plus petite valeur prise par $X$ ?",
  ][kind];
  const rep = kind === 0 ? vals.length : kind === 1 ? vals[vals.length - 1] : vals[0];
  return {
    text: `${M.exp} On note $X$ ${M.X}. ${q}`,
    format: "short",
    expected: [String(rep)],
    comparator: "number_equal",
    explanation: exp(
      "L'univers contient les ISSUES ; $X$ leur associe des NOMBRES. Plusieurs issues peuvent donner la même valeur.",
      `Ici l'univers compte ${M.nIssues}.`,
      `$X$ prend les valeurs ${vals.length <= 12 ? listeFr(vals.map((v) => `$${v}$`)) : `de $${vals[0]}$ à $${vals[vals.length - 1]}$`}, soit $${vals.length}$ valeurs.`,
      kind === 0 ? `$${vals.length}$ valeurs différentes.` : `$${rep}$.`,
    ),
  };
}
function defIssues(e: DifficultyLevel): Q {
  const M = tirerModele();
  const s = pick(M.issues);
  const nb = M.issues.filter((x) => x === s).length;
  return {
    text: `${M.exp} On note $X$ ${M.X}. ${pick([`Combien d'issues réalisent l'événement $\\{X = ${s}\\}$ ?`, `Combien d'issues de l'univers $X$ envoie-t-elle sur la valeur $${s}$ ?`, `L'événement $\\{X = ${s}\\}$ contient combien d'issues ?`])}`,
    format: "short",
    expected: [String(nb)],
    comparator: "number_equal",
    explanation: exp(
      `L'événement $\\{X = ${s}\\}$ est l'ensemble des issues auxquelles $X$ associe $${s}$.`,
      `L'univers compte ${M.nIssues} ; on liste celles qui donnent $${s}$.`,
      `On en trouve $${nb}$.`,
      `$${nb}$ issues, d'où $P(X = ${s}) = ${tf(nb, M.issues.length).slice(1, -1)}$.`,
    ),
  };
}

function genDefinition(e: DifficultyLevel): Q {
  if (e <= 3) return defEstVA(3);
  if (e === 4) return pick([defEstVA, defValeurs])(4);
  return pick([defValeurs, defIssues])(5);
}

/* ---------- va_modeliser ---------- */
const CONDS: { nom: string; ok: (r: number, n: number) => boolean }[] = [
  { nom: "pair", ok: (r) => r % 2 === 0 },
  { nom: "un multiple de $3$", ok: (r) => r % 3 === 0 },
  { nom: "supérieur ou égal à $5$", ok: (r) => r >= 5 },
  { nom: "un nombre premier", ok: (r) => [2, 3, 5, 7, 11, 13, 17, 19].includes(r) },
  { nom: "strictement inférieur à $3$", ok: (r) => r < 3 },
  { nom: "le plus grand numéro du dé", ok: (r, n) => r === n },
  { nom: "un multiple de $4$", ok: (r) => r % 4 === 0 },
];
const UN_DE: [number, string][] = [[6, "un dé équilibré à six faces"], [8, "un dé équilibré à huit faces"], [10, "un dé équilibré à dix faces"], [12, "un dé équilibré à douze faces"], [20, "un dé à vingt faces de jeu de rôle"]];
const LIEUX = ["À la fête de l'école", "Au stand de la kermesse", "Dans un jeu de société", "À la fête foraine de Saint-Denis", "Pendant la soirée jeux du club", "Au jeu de la buvette du stade"];

function modGain(e: DifficultyLevel): Q {
  const [n, de] = pick(UN_DE);
  const cond = pick(CONDS.filter((c) => range(1, n).some((r) => c.ok(r, n)) && !range(1, n).every((r) => c.ok(r, n))));
  const f = range(1, n).filter((r) => cond.ok(r, n)).length;
  const a = pick([2, 3, 4, 5, 8, 10]);
  const b = pick([1, 2, 3, 4]);
  const intro = `${pick(LIEUX)}, on lance ${de}. Si le résultat est ${cond.nom}, on gagne $${a}$ € ; sinon, on perd $${b}$ €. On note $X$ le gain algébrique, en euros.`;
  if (Math.random() < 0.4) {
    const bon = `$\\{-${b} ; ${a}\\}$`;
    return {
      text: `${intro} ${pick(["Quelles valeurs $X$ peut-elle prendre ?", "Quel est l'ensemble des valeurs de $X$ ?"])}`,
      format: "qcm",
      ...qcmT(bon, [`$\\{${b} ; ${a}\\}$`, `$\\{0 ; ${a}\\}$`, `$\\{1 ; 2 ; \\ldots ; ${n}\\}$`, `$\\{${a - b}\\}$`]),
      comparator: "mcq_exact",
      explanation: exp(
        "Modéliser, c'est dire quel NOMBRE $X$ associe à chaque issue.",
        `Les issues sont les $${n}$ faces ; chacune donne soit un gain de $${a}$ €, soit une perte de $${b}$ €.`,
        `Une perte s'écrit avec un signe moins : $X = -${b}$.`,
        `$X$ prend les valeurs $-${b}$ et $${a}$.`,
      ),
    };
  }
  const gagne = Math.random() < 0.5;
  const nom = gagne ? `P(X = ${a})` : `P(X = -${b})`;
  const fav = gagne ? f : n - f;
  return {
    text: `${intro} ${pick([`Calcule $${nom}$.`, `Combien vaut $${nom}$ ?`])}`,
    format: "short",
    expected: ecritures(fav, n),
    comparator: "fraction_decimal_equivalent",
    explanation: exp(
      `$\\{X = ${gagne ? a : -b}\\}$ est l'événement « le résultat ${gagne ? "est" : "n'est pas"} ${cond.nom} ».`,
      `Résultats ${cond.nom} : ${listeFr(range(1, n).filter((r) => cond.ok(r, n)).map((r) => `$${r}$`))}, soit $${f}$ sur $${n}$ faces équiprobables${gagne ? "" : ` ; les autres sont $${n} - ${f} = ${n - f}$`}.`,
      `$${nom} = \\dfrac{${fav}}{${n}}$${red(fav, n)[1] !== n ? ` $= ${tf(fav, n).slice(1, -1)}$` : ""}.`,
      `$${nom} = ${tf(fav, n).slice(1, -1)}$.`,
    ),
  };
}

function modCompte(e: DifficultyLevel): Q {
  const M = tirerModele();
  const s = pick(M.issues);
  const nb = M.issues.filter((x) => x === s).length;
  const N = M.issues.length;
  return {
    text: `${M.exp} On note $X$ ${M.X}. ${pick([`Calcule $P(X = ${s})$.`, `Quelle est la probabilité que $X$ prenne la valeur $${s}$ ?`, `Combien vaut $P(X = ${s})$ ?`])}`,
    format: "short",
    expected: ecritures(nb, N),
    comparator: "fraction_decimal_equivalent",
    explanation: exp(
      "On modélise : l'univers est formé d'issues équiprobables, et $\\{X = s\\}$ regroupe celles qui donnent la valeur $s$.",
      `L'univers compte ${M.nIssues}.`,
      `$${nb}$ issue${nb > 1 ? "s donnent" : " donne"} $X = ${s}$, donc $P(X = ${s}) = \\dfrac{${nb}}{${N}}$.`,
      `$P(X = ${s}) = ${tf(nb, N).slice(1, -1)}$.`,
    ),
  };
}

/** Le gain NET : la mise est retranchée dans tous les cas. */
function modNet(e: DifficultyLevel): Q {
  const mise = pick([1, 2, 3, 5]);
  const lot = pick([10, 15, 20, 30, 50, 100]);
  const N = pick([10, 20, 25, 40, 50, 100]);
  const g = ri(1, Math.max(1, Math.floor(N / 5)));
  const decor2 = pick([
    `À la tombola de la kermesse, un billet coûte $${mise}$ € ; sur $${N}$ billets, $${g}$ font gagner un lot de $${lot}$ €.`,
    `Une partie de roue coûte $${mise}$ € ; la roue a $${N}$ secteurs identiques, dont $${g}$ font gagner $${lot}$ €.`,
    `Au jeu des canards, une pêche coûte $${mise}$ € ; $${g}$ des $${N}$ canards font gagner $${lot}$ €.`,
    `Une carte à gratter coûte $${mise}$ € ; dans un lot de $${N}$ cartes, $${g}$ rapportent $${lot}$ €.`,
    `Au loto de la fête du village, un carton coûte $${mise}$ € ; on vend $${N}$ cartons, dont $${g}$ gagnent $${lot}$ €.`,
    `Dans un jeu en ligne, ouvrir un coffre coûte $${mise}$ € ; sur $${N}$ coffres, $${g}$ contiennent un bon de $${lot}$ €.`,
    `À la fête de l'école, une enveloppe coûte $${mise}$ € ; parmi les $${N}$ enveloppes, $${g}$ contiennent $${lot}$ €.`,
    `Au stand des boîtes surprises de la kermesse, une boîte coûte $${mise}$ € ; parmi les $${N}$ boîtes, $${g}$ contiennent $${lot}$ €.`,
  ]);
  const kind = ri(0, 2);
  const X = "On note $X$ le gain NET du joueur, mise déduite.";
  if (kind === 0) {
    return {
      text: `${decor2} ${X} ${pick(["Quelle valeur prend $X$ quand le joueur gagne ?", "Que vaut $X$ en cas de gain ?"])}`,
      format: "qcm",
      ...qcmN(lot - mise, [lot, lot + mise, -mise]),
      comparator: "mcq_exact",
      explanation: exp(
        "Le gain net retranche la mise dans TOUS les cas, gagnant compris.",
        `Le joueur reçoit $${lot}$ € mais a payé $${mise}$ €.`,
        `$X = ${lot} - ${mise} = ${lot - mise}$.`,
        `$X = ${lot - mise}$ € en cas de gain, et $X = -${mise}$ € sinon.`,
      ),
    };
  }
  const nom = kind === 1 ? `P(X = ${lot - mise})` : `P(X = -${mise})`;
  const fav = kind === 1 ? g : N - g;
  return {
    text: `${decor2} ${X} ${pick([`Calcule $${nom}$.`, `Combien vaut $${nom}$ ?`])}`,
    format: "short",
    expected: ecritures(fav, N),
    comparator: "fraction_decimal_equivalent",
    explanation: exp(
      `$X$ vaut $${lot - mise}$ (gain du lot, mise déduite) ou $-${mise}$ (perte de la mise).`,
      `$\\{${nom.slice(2, -1)}\\}$ correspond aux $${fav}$ cas ${kind === 1 ? "gagnants" : "perdants"} sur $${N}$.`,
      `$${nom} = \\dfrac{${fav}}{${N}}$${red(fav, N)[1] !== N ? ` $= ${tf(fav, N).slice(1, -1)}$` : ""}.`,
      `$${nom} = ${tf(fav, N).slice(1, -1)}$.`,
    ),
  };
}

function genModeliser(e: DifficultyLevel): Q {
  if (e <= 3) return modGain(3);
  if (e === 4) return pick([modGain, modCompte])(4);
  return pick([modCompte, modNet])(5);
}

/* ---------- va_simulation (Python) ---------- */
const EVTS_P = [
  "Noa réussit son lancer franc",
  "il pleut à Cilaos un jour donné",
  "le car jaune arrive en retard",
  "un letchi de la barquette est abîmé",
  "une graine du jardin créole germe",
  "un coffre du jeu vidéo contient un objet rare",
  "Sacha touche le centre de la cible",
  "un client du snack commande un bouchon",
];
const PY = "En Python (avec `from random import randint, random`)";
/** Le cadre de la simulation : pourquoi on programme. */
const CADRES = [
  "Pour un jeu de société programmé en cours de SNT",
  "Pour préparer les stands de la kermesse du lycée",
  "Pour tester une stratégie avant un tournoi",
  "Pour un projet de jeu vidéo du club informatique",
  "Pour vérifier un calcul de probabilité par l'expérience",
  "Pour une simulation présentée en classe",
  "Pour le jeu de la fête de l'école",
];
function simInstruction(e: DifficultyLevel): Q {
  const kind = ri(0, 2);
  if (kind === 2) {
    const evt = pick(EVTS_P);
    const p = pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9]);
    const ps = String(p);
    const bon = `random() < ${ps}`;
    return {
      text: `${pick(CADRES)}, on admet ${/^[aeiouéèêh]/i.test(evt) ? "qu'" : "que "}${evt} avec la probabilité $${tx(p)}$. ${PY}, ${pick(["quel test simule cet événement ?", "quelle condition est vraie avec cette probabilité ?", "quelle condition faut-il écrire ?"])}`,
      format: "qcm",
      ...qcmT(bon, [`random() > ${ps}`, `random() == ${ps}`, `randint(0, 1) < ${ps}`, `random() * ${ps}`]),
      comparator: "mcq_exact",
      explanation: exp(
        "`random()` tire un décimal au hasard entre $0$ et $1$ ; la probabilité de tomber dans un intervalle est sa longueur.",
        `L'intervalle $[0 ; ${tx(p)}[$ a pour longueur $${tx(p)}$.`,
        `\`random() < ${ps}\` est vrai avec la probabilité $${tx(p)}$ ; \`random() > ${ps}\` le serait avec $${tx(1 - p)}$.`,
        `\`${bon}\`.`,
      ),
    };
  }
  const [n, quoi] =
    kind === 0
      ? pick([[4, "le lancer d'un dé tétraédrique (faces 1 à 4)"], [6, "le lancer d'un dé à six faces"], [8, "le lancer d'un dé à huit faces"], [12, "le lancer d'un dé à douze faces"], [20, "le lancer d'un dé à vingt faces"]] as [number, string][])
      : pick([[10, "le tirage d'un jeton numéroté de 1 à 10"], [24, "le choix d'un élève par son numéro, dans une classe de 24"], [30, "le choix d'une place numérotée de 1 à 30 dans le car jaune"], [16, "le tirage d'une case numérotée de 1 à 16"], [36, "le choix d'un numéro de 1 à 36 à la roue de la kermesse"]] as [number, string][]);
  const bon = `randint(1, ${n})`;
  return {
    text: `${pick(CADRES)}, on veut simuler ${quoi}. ${PY}, ${pick(["quelle instruction choisir ?", "quelle instruction convient ?", "quelle instruction donne exactement les bons résultats ?"])}`,
    format: "qcm",
    ...qcmT(bon, [`randint(0, ${n})`, `randint(1, ${n + 1})`, `randint(0, ${n - 1})`, `random() * ${n}`]),
    comparator: "mcq_exact",
    explanation: exp(
      "`randint(a, b)` tire un entier entre $a$ et $b$, les DEUX bornes incluses, de façon équiprobable.",
      `On veut les entiers de $1$ à $${n}$, chacun avec la probabilité $\\dfrac{1}{${n}}$.`,
      `\`randint(0, ${n})\` ajouterait $0$ ; \`randint(1, ${n + 1})\` ajouterait $${n + 1}$ ; \`random() * ${n}\` donne un décimal.`,
      `\`${bon}\`.`,
    ),
  };
}

/** Une fonction `partie()` : ce qu'elle renvoie, avec quelles probabilités. */
type Partie = { code: string; a: number; b: number; pA: number; detail: string };
function tirerPartie(): Partie {
  const a = pick([2, 3, 5, 8, 10, 20]);
  const b = pick([0, -1, -2, -3, -5]);
  if (Math.random() < 0.5) {
    const n = pick([4, 5, 8, 10, 20]);
    const s = ri(1, n - 1);
    const op = pick(["<=", ">"]);
    const fav = op === "<=" ? s : n - s;
    return {
      code: `\`d = randint(1, ${n})\`, puis renvoie \`${a}\` si \`d ${op} ${s}\`, et \`${b}\` sinon`,
      a, b, pA: fav / n,
      detail: `$d$ est équiprobable parmi $1, \\ldots, ${n}$ ; \`d ${op} ${s}\` est vrai pour $${fav}$ valeurs, donc avec la probabilité $\\dfrac{${fav}}{${n}} = ${tx(fav / n)}$`,
    };
  }
  const p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.6, 0.7, 0.75, 0.8]);
  return {
    code: `\`u = random()\`, puis renvoie \`${a}\` si \`u < ${p}\`, et \`${b}\` sinon`,
    a, b, pA: p,
    detail: `\`u < ${p}\` est vrai avec la probabilité $${tx(p)}$`,
  };
}
function simLire(e: DifficultyLevel): Q {
  const P = tirerPartie();
  const fn = pick(["partie", "tirage", "jeu", "lancer", "tour"]);
  const intro = `${pick(CADRES)}, on écrit la fonction Python \`${fn}()\` : elle calcule ${P.code}.`;
  if (e <= 4) {
    const quoi = Math.random() < 0.5;
    const val = quoi ? P.a : P.b;
    const pr = quoi ? P.pA : 1 - P.pA;
    return {
      text: `${intro} ${pick([`Quelle est la probabilité que \`${fn}()\` renvoie \`${val}\` ?`, `Avec quelle probabilité obtient-on \`${val}\` ?`])}`,
      format: "short",
      expected: acc(pr),
      comparator: "number_equal",
      explanation: exp(
        "La fonction simule une variable aléatoire $X$ à deux valeurs : il suffit de trouver la probabilité de la condition.",
        `${maj(P.detail)}.`,
        quoi ? `Donc $P(X = ${P.a}) = ${tx(P.pA)}$.` : `Donc $P(X = ${P.b}) = 1 - ${tx(P.pA)} = ${tx(1 - P.pA)}$.`,
        `$${tx(pr)}$.`,
      ),
    };
  }
  const N = pick([1000, 10000, 100000]);
  const E = P.a * P.pA + P.b * (1 - P.pA);
  return {
    text: `${intro} On appelle $${N}$ fois \`${fn}()\` et on affiche la moyenne des résultats. ${pick(["Autour de quelle valeur cette moyenne se stabilise-t-elle ?", "Quelle valeur la moyenne affichée approche-t-elle ?"])}`,
    format: "short",
    expected: acc(Math.round(E * 10000) / 10000),
    comparator: "number_equal",
    explanation: exp(
      "Sur un grand nombre de répétitions, la moyenne des valeurs simulées se rapproche de l'espérance $E(X)$.",
      `${maj(P.detail)}. Donc $P(X = ${P.a}) = ${tx(P.pA)}$ et $P(X = ${P.b}) = ${tx(1 - P.pA)}$.`,
      `$E(X) = ${P.a} \\times ${tx(P.pA)} + ${par(P.b)} \\times ${tx(1 - P.pA)} = ${tx(E)}$.`,
      `La moyenne se stabilise autour de $${tx(E)}$.`,
    ),
  };
}

/** Une boucle qui compte les succès : la fréquence estime une probabilité. */
function simBoucle(e: DifficultyLevel): Q {
  const N = pick([1000, 5000, 10000, 100000]);
  const cpt = pick(["c", "compteur", "succes", "nb"]);
  const n = pick([4, 5, 8, 10, 20]);
  const op = pick(["<=", ">", "<"]);
  const s = ri(op === "<" ? 2 : 1, n - 1);
  const fav = op === "<=" ? s : op === ">" ? n - s : s - 1;
  const lignes = `\`${cpt} = 0\`, puis, $${N}$ fois : \`if randint(1, ${n}) ${op} ${s}: ${cpt} = ${cpt} + 1\`, et enfin \`print(${cpt} / ${N})\``;
  const sens = pick(["Autour de quelle valeur le nombre affiché se stabilise-t-il ?", "Quelle probabilité ce programme estime-t-il ? Donne sa valeur exacte.", "Vers quelle valeur le résultat affiché tend-il quand on relance le programme ?"]);
  return {
    text: `${pick(CADRES)}, on exécute : ${lignes}. ${sens}`,
    format: "short",
    expected: acc(fav / n),
    comparator: "number_equal",
    explanation: exp(
      `Le programme compte les succès sur $${N}$ essais, puis divise : il affiche une FRÉQUENCE, qui se rapproche de la probabilité du succès.`,
      `\`randint(1, ${n})\` est équiprobable sur $1, \\ldots, ${n}$ ; la condition \`${op} ${s}\` est vraie pour $${fav}$ valeurs${op === "<" ? ` (le $${s}$ est exclu)` : ""}.`,
      `Probabilité : $\\dfrac{${fav}}{${n}} = ${tx(fav / n)}$.`,
      `Le nombre affiché se stabilise autour de $${tx(fav / n)}$.`,
    ),
  };
}

function genSimulation(e: DifficultyLevel): Q {
  if (e <= 3) return simInstruction(3);
  if (e === 4) return pick([simInstruction, simLire, simBoucle])(4);
  return pick([simLire, simBoucle])(5);
}

/* ---------- va_echantillon ---------- */
function echMoyenne(e: DifficultyLevel): Q {
  const k = ri(3, 4);
  const s = pick(SITS);
  const v = s.vals(k);
  const n = pick([20, 25, 40, 50, 60, 80, 100]);
  const eff = partition(k, 1, n);
  const tot = v.reduce((t, x, i) => t + x * eff[i], 0);
  const A = arrondi(tot / n);
  const qui = pick(["On répète l'expérience", "On relève les résultats sur", "Un élève observe"]);
  return {
    text: `${s.intro(v)} On note $X$ ${s.X}. ${qui} $${n}$ fois : ${listeFr(v.map((x, i) => `$${x}$ apparaît $${eff[i]}$ fois`))}. ${pick(["Calcule la moyenne de cet échantillon.", "Quelle est la valeur moyenne observée ?", "Calcule la moyenne $\\overline{x}$ des valeurs obtenues."])}${A.txt}`,
    format: "short",
    expected: acc(A.r),
    comparator: "number_equal",
    explanation: exp(
      "La moyenne d'un échantillon est la somme des valeurs observées divisée par la taille de l'échantillon.",
      `Somme : $${v.map((x, i) => `${x} \\times ${eff[i]}`).join(" + ")} = ${tot}$.`,
      `$\\overline{x} = ${tot} \\div ${n} ${A.exact ? "=" : "\\approx"} ${tx(A.r)}$.`,
      `$\\overline{x} ${A.exact ? "=" : "\\approx"} ${tx(A.r)}$ — pour un grand échantillon, cette moyenne est proche de $E(X)$.`,
    ),
  };
}

/** Sur N répétitions, on prévoit un total d'environ N × E(X). */
function echTotal(e: DifficultyLevel): Q {
  const L = tirerLoi(ri(3, 4), e >= 5 ? 5 : 10);
  const E = som1(L.v, L.c) / 100;
  const N = pick([50, 100, 200, 365, 500, 1000]);
  const avecLoi = e >= 5;
  return {
    text: `${decor(L)} ${avecLoi ? loiTexte(L.v, L.c) : `On a calculé $E(X) = ${tx(E)}$.`} ${pick([`On répète l'expérience $${N}$ fois, de façon indépendante. Quel total des valeurs de $X$ peut-on prévoir ?`, `Sur $${N}$ répétitions indépendantes, quelle somme des valeurs obtenues peut-on attendre ?`, `On réalise un échantillon de taille $${N}$. Quelle valeur peut-on prévoir pour la somme des résultats ?`])}`,
    format: "short",
    expected: acc(Math.round(N * E * 10000) / 10000),
    comparator: "number_equal",
    explanation: exp(
      "Sur un échantillon de grande taille, la moyenne des résultats est proche de $E(X)$ ; la somme est donc proche de $N \\times E(X)$.",
      avecLoi ? `$E(X) = ${sommeProduits(L.v, L.c)} = ${tx(E)}$.` : `$E(X) = ${tx(E)}$.`,
      `$${N} \\times ${tx(E)} = ${tx(N * E)}$.`,
      `Environ $${tx(N * E)}$ — ${L.s.moy} reste proche de $${tx(E)}$.`,
    ),
  };
}

/** Écart entre la moyenne observée et l'espérance. */
function echEcart(e: DifficultyLevel): Q {
  const L = tirerLoi(3, 10);
  const E = som1(L.v, L.c) / 100;
  const n = pick([20, 50, 100, 200, 1000]);
  const ecart = pick([-1, 1]) * ri(1, 30) / 100;
  const m = Math.round((E + ecart) * 100) / 100;
  return {
    text: `${decor(L)} ${loiTexte(L.v, L.c)} Sur un échantillon de taille $${n}$, la moyenne observée vaut $${tx(m)}$. ${pick(["Quel est l'écart entre cette moyenne et $E(X)$, en valeur absolue ?", "De combien la moyenne observée s'écarte-t-elle de $E(X)$ (en valeur absolue) ?"])}`,
    format: "short",
    expected: acc(Math.abs(Math.round((m - E) * 100) / 100)),
    comparator: "number_equal",
    explanation: exp(
      "On calcule l'espérance, puis on compare : la moyenne d'un échantillon fluctue autour de $E(X)$.",
      `$E(X) = ${sommeProduits(L.v, L.c)} = ${tx(E)}$.`,
      `$|${tx(m)} - ${par(E)}| = ${tx(Math.abs(Math.round((m - E) * 100) / 100))}$.`,
      `L'écart vaut $${tx(Math.abs(Math.round((m - E) * 100) / 100))}$ ; plus l'échantillon est grand, plus cet écart a tendance à être petit.`,
    ),
  };
}

function genEchantillon(e: DifficultyLevel): Q {
  if (e <= 4) return pick([echMoyenne, echTotal])(4);
  return pick([echTotal, echEcart, echMoyenne])(5);
}

function genLoi(e: DifficultyLevel): Q {
  if (e <= 2) return loiManquante(2);
  if (e === 3) return pick([loiManquante, loiManquante, loiValide])(3);
  if (e === 4) return pick([loiParametre, loiValide, loiCompte, loiManquante])(4);
  return pick([loiParametre, loiCompte])(5);
}

/** Un gabarit de la notion, pour les étoiles qui n'en avaient pas. */
function gab(id: string, microId: string, difficulty: DifficultyLevel, hint: string, tag: string, generate: () => Q): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["premiere", "maths", "variables_aleatoires", tag, "template"],
    generate,
  };
}

export const variablesAleatoiresBank: TutorBankItemV4[] = [

  /* ===================== VA_LOI ===================== */
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 2,
    theme: "neutral",
    text: "Pour une loi de probabilité, la somme de toutes les probabilités vaut :",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Toutes les valeurs possibles sont couvertes.",
    explanation: exp(
      "La loi d'une variable aléatoire associe une probabilité à chaque valeur.",
      "Toutes les valeurs possibles couvrent tout l'univers.",
      "La somme des probabilités vaut donc $1$.",
      "La somme vaut $1$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 3,
    theme: "neutral",
    text: "$X$ prend les valeurs $0$, $1$, $2$ avec $P(X=0) = 0{,}3$ et $P(X=1) = 0{,}5$. Combien vaut $P(X=2)$ ?",
    format: "short",
    expected: ["0,2"],
    comparator: "number_equal",
    hint: "La somme des probabilités vaut $1$.",
    explanation: exp(
      "La somme des probabilités d'une loi vaut $1$.",
      "$P(X=2) = 1 - 0{,}3 - 0{,}5$.",
      "$= 0{,}2$.",
      "$P(X=2) = 0{,}2$."
    ),
    canvas: loiGraph([0, 1, 2], [0.3, 0.5, 0.2]),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 3,
    theme: "jeux_video",
    text: "Dans un jeu, le gain $X$ vaut $0$, $5$ ou $10$ avec $P(X=0) = 0{,}6$ et $P(X=5) = 0{,}3$. Combien vaut $P(X=10)$ ?",
    format: "short",
    expected: ["0,1"],
    comparator: "number_equal",
    hint: "Somme $= 1$.",
    explanation: exp(
      "La somme des probabilités vaut $1$.",
      "$P(X=10) = 1 - 0{,}6 - 0{,}3$.",
      "$= 0{,}1$.",
      "$P(X=10) = 0{,}1$."
    ),
    canvas: loiGraph([0, 5, 10], [0.6, 0.3, 0.1]),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 3,
    theme: "neutral",
    text: "On lance un dé équilibré et $X$ est le résultat. Combien vaut $P(X = 4)$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{6}$", "$\\dfrac{1}{4}$", "$\\dfrac{4}{6}$", "$\\dfrac{1}{2}$"],
    expected: ["$\\dfrac{1}{6}$"],
    comparator: "mcq_exact",
    hint: "Dé à $6$ faces équilibré.",
    explanation: exp(
      "Le dé a $6$ faces équiprobables.",
      "Chaque valeur a la même probabilité $\\dfrac{1}{6}$.",
      "$P(X=4) = \\dfrac{1}{6}$.",
      "$\\dfrac{1}{6}$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 4,
    theme: "neutral",
    text: "$X$ prend les valeurs $0$, $1$, $2$, $3$ avec $P(X=0) = 0{,}1$, $P(X=1) = 0{,}2$ et $P(X=2) = 0{,}4$. Combien vaut $P(X=3)$ ?",
    format: "short",
    expected: ["0,3"],
    comparator: "number_equal",
    hint: "La somme de toutes les probabilités vaut $1$.",
    explanation: exp(
      "Dans une loi de probabilité, la somme des probabilités de toutes les valeurs vaut $1$.",
      "$0{,}1 + 0{,}2 + 0{,}4 = 0{,}7$, il manque donc $1 - 0{,}7$.",
      "$P(X=3) = 0{,}3$.",
      "$P(X=3) = 0{,}3$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_modeliser",
    difficulty: 5,
    theme: "neutral",
    text: "On lance deux fois une pièce équilibrée et $X$ compte le nombre de PILE. Combien vaut $P(X = 0)$ ?",
    format: "short",
    expected: ["0,25"],
    comparator: "number_equal",
    hint: "$X = 0$ signifie « FACE puis FACE ».",
    explanation: exp(
      "On liste les issues équiprobables : PP, PF, FP, FF — quatre cas.",
      "$X = 0$ correspond au seul cas FF : $\\dfrac{1}{4}$.",
      "$= 0{,}25$. (On peut aussi multiplier : $0{,}5 \\times 0{,}5$, les lancers étant indépendants.)",
      "$P(X = 0) = 0{,}25$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 4,
    theme: "neutral",
    text: "Peut-on avoir une variable aléatoire prenant seulement les valeurs $1$ et $2$, avec $P(X=1) = 0{,}5$ et $P(X=2) = 0{,}6$ ?",
    format: "qcm",
    choices: [
      "non : la somme dépasse $1$",
      "oui, c'est une loi valable",
      "non : les probabilités doivent être égales",
      "oui, si $X$ prend d'autres valeurs",
    ],
    expected: ["non : la somme dépasse $1$"],
    comparator: "mcq_exact",
    hint: "Additionne les deux probabilités.",
    explanation: exp(
      "Pour définir une loi, il faut que toutes les probabilités soient dans $[0 ; 1]$ ET que leur somme fasse exactement $1$.",
      "Ici $0{,}5 + 0{,}6 = 1{,}1 > 1$.",
      "C'est impossible : $X$ ne prenant que ces deux valeurs, la somme devrait valoir $1$. Ajouter d'autres valeurs ne ferait qu'aggraver le dépassement.",
      "Non : la somme dépasse $1$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Qu'est-ce qu'une variable aléatoire ?",
    format: "qcm",
    choices: [
      "une fonction qui associe un nombre à chaque issue de l'expérience",
      "une probabilité comprise entre $0$ et $1$",
      "un nombre tiré au hasard entre $0$ et $1$",
      "l'ensemble de toutes les issues possibles",
    ],
    expected: [
      "une fonction qui associe un nombre à chaque issue de l'expérience",
    ],
    comparator: "mcq_exact",
    hint: "Elle traduit chaque résultat de l'expérience en un nombre.",
    explanation: exp(
      "Une variable aléatoire traduit le résultat d'une expérience en une valeur numérique.",
      "Exemple : on lance deux dés (l'issue est un couple de faces) et $X$ donne la somme obtenue.",
      "Elle n'est donc pas une probabilité : c'est une fonction définie sur l'univers, à valeurs dans les nombres.",
      "C'est une fonction qui associe un nombre à chaque issue."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_modeliser",
    difficulty: 3,
    theme: "neutral",
    text: "Une urne contient $5$ boules dont $2$ gagnantes. $X$ vaut $1$ si la boule tirée est gagnante, $0$ sinon. Combien vaut $P(X = 1)$ ?",
    format: "short",
    expected: ["0,4"],
    comparator: "number_equal",
    hint: "$\\dfrac{2}{5}$.",
    explanation: exp(
      "On compte les cas favorables sur le nombre total de cas, les tirages étant équiprobables.",
      "$P(X = 1) = \\dfrac{2}{5}$.",
      "$= 0{,}4$. On en déduit $P(X = 0) = 0{,}6$, et la somme vaut bien $1$.",
      "$P(X = 1) = 0{,}4$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_modeliser",
    difficulty: 4,
    theme: "neutral",
    text: "On lance un dé équilibré. $X$ vaut $10$ si on obtient $6$, et $0$ sinon. Combien vaut $P(X = 0)$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{5}{6}$",
      "$\\dfrac{1}{6}$",
      "$0$",
      "$\\dfrac{1}{2}$",
    ],
    expected: ["$\\dfrac{5}{6}$"],
    comparator: "mcq_exact",
    hint: "Combien de faces ne donnent pas $6$ ?",
    explanation: exp(
      "$X = 0$ correspond à toutes les issues sauf le $6$.",
      "Cinq faces sur six conviennent : $\\dfrac{5}{6}$.",
      "On peut aussi passer par l'événement contraire : $1 - \\dfrac{1}{6} = \\dfrac{5}{6}$.",
      "$P(X = 0) = \\dfrac{5}{6}$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 3,
    theme: "neutral",
    text: "Que signifie « donner la loi de probabilité de $X$ » ?",
    format: "qcm",
    choices: [
      "donner toutes les valeurs possibles de $X$ et leur probabilité",
      "donner uniquement l'espérance de $X$",
      "donner la plus grande valeur de $X$",
      "donner la formule de $X$",
    ],
    expected: [
      "donner toutes les valeurs possibles de $X$ et leur probabilité",
    ],
    comparator: "mcq_exact",
    hint: "C'est ce qu'on présente en général dans un tableau à deux lignes.",
    explanation: exp(
      "La loi de probabilité décrit complètement le comportement de $X$.",
      "On liste toutes les valeurs $x_i$ que $X$ peut prendre, et pour chacune la probabilité $P(X = x_i)$.",
      "On la présente souvent dans un tableau, dont la ligne des probabilités a pour somme $1$. L'espérance se calcule ENSUITE, à partir de cette loi.",
      "C'est donner toutes les valeurs possibles de $X$ et leur probabilité."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_va_loi_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 3,
    theme: "neutral",
    hint: "La somme des probabilités vaut $1$.",
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "template"],
    generate: () => genLoi(3),
  },

  /* ===================== VA_ESPERANCE ===================== */
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 2,
    theme: "neutral",
    text: "L'espérance d'une variable aléatoire $X$ se calcule par :",
    format: "qcm",
    choices: [
      "$E(X) = \\sum x_i \\, p_i$",
      "$E(X) = \\sum p_i$",
      "$E(X) = \\sum x_i$",
      "$E(X) = \\dfrac{\\sum x_i}{n}$",
    ],
    expected: ["$E(X) = \\sum x_i \\, p_i$"],
    comparator: "mcq_exact",
    hint: "Somme des valeurs pondérées par leurs probabilités.",
    explanation: exp(
      "L'espérance est une moyenne pondérée des valeurs.",
      "Chaque valeur $x_i$ est pondérée par sa probabilité $p_i$.",
      "$E(X) = \\sum x_i \\, p_i$.",
      "$E(X) = \\sum x_i \\, p_i$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 3,
    theme: "neutral",
    text: "$X$ vaut $0$, $1$, $2$ avec probabilités $0{,}3$, $0{,}5$, $0{,}2$. Calcule $E(X)$.",
    format: "short",
    expected: ["0,9"],
    comparator: "number_equal",
    hint: "$0 \\times 0{,}3 + 1 \\times 0{,}5 + 2 \\times 0{,}2$.",
    explanation: exp(
      "On applique $E(X) = \\sum x_i \\, p_i$.",
      "$0 \\times 0{,}3 + 1 \\times 0{,}5 + 2 \\times 0{,}2 = 0 + 0{,}5 + 0{,}4$.",
      "$= 0{,}9$.",
      "$E(X) = 0{,}9$."
    ),
    canvas: loiGraph([0, 1, 2], [0.3, 0.5, 0.2]),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance_probleme",
    difficulty: 4,
    theme: "jeux_video",
    text: "Un jeu coûte $2$ €. Le gain $X$ (déjà net) vaut $0$ € (proba $0{,}7$) ou $5$ € (proba $0{,}3$). Quelle est l'espérance de gain $E(X)$ ?",
    format: "short",
    expected: ["1,5"],
    comparator: "number_equal",
    hint: "$0 \\times 0{,}7 + 5 \\times 0{,}3$.",
    explanation: exp(
      "On calcule l'espérance du gain.",
      "$E(X) = 0 \\times 0{,}7 + 5 \\times 0{,}3$.",
      "$= 1{,}5$.",
      "$E(X) = 1{,}5$ € (le jeu coûtant $2$ €, il n'est pas favorable au joueur)."
    ),
    canvas: loiGraph([0, 5], [0.7, 0.3]),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un jeu est dit « équitable » lorsque l'espérance de gain (mise déduite) vaut :",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Ni favorable, ni défavorable.",
    explanation: exp(
      "Un jeu équitable n'avantage ni le joueur ni l'organisateur.",
      "Le gain moyen (mise déduite) est alors nul.",
      "$E(X) = 0$.",
      "L'espérance vaut $0$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 4,
    theme: "neutral",
    text: "$X$ vaut $1$, $2$ ou $3$ avec les probabilités $0{,}2$, $0{,}5$ et $0{,}3$. Calcule $E(X)$.",
    format: "short",
    expected: ["2,1"],
    comparator: "number_equal",
    hint: "$1 \\times 0{,}2 + 2 \\times 0{,}5 + 3 \\times 0{,}3$.",
    explanation: exp(
      "L'espérance est la somme des valeurs multipliées par leurs probabilités : $E(X) = \\sum x_i p_i$.",
      "$1 \\times 0{,}2 + 2 \\times 0{,}5 + 3 \\times 0{,}3 = 0{,}2 + 1 + 0{,}9$.",
      "$= 2{,}1$.",
      "$E(X) = 2{,}1$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 5,
    theme: "neutral",
    text: "$X$ vaut $-1$, $0$ ou $4$ avec les probabilités $0{,}5$, $0{,}3$ et $0{,}2$. Calcule $E(X)$.",
    format: "short",
    expected: ["0,3"],
    comparator: "number_equal",
    hint: "Attention au terme négatif : $-1 \\times 0{,}5 = -0{,}5$.",
    explanation: exp(
      "On applique $E(X) = \\sum x_i p_i$, valeurs négatives comprises.",
      "$(-1) \\times 0{,}5 + 0 \\times 0{,}3 + 4 \\times 0{,}2 = -0{,}5 + 0 + 0{,}8$.",
      "$= 0{,}3$.",
      "$E(X) = 0{,}3$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 5,
    theme: "neutral",
    text: "On lance un dé équilibré et $X$ est le résultat. Combien vaut $E(X)$ ?",
    format: "short",
    expected: ["3,5"],
    comparator: "number_equal",
    hint: "$\\dfrac{1 + 2 + 3 + 4 + 5 + 6}{6}$.",
    explanation: exp(
      "Toutes les faces ayant la même probabilité $\\dfrac{1}{6}$, l'espérance est la moyenne des valeurs.",
      "$E(X) = \\dfrac{1 + 2 + 3 + 4 + 5 + 6}{6} = \\dfrac{21}{6}$.",
      "$= 3{,}5$.",
      "$E(X) = 3{,}5$ : l'espérance n'est pas forcément une valeur que $X$ peut prendre."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 3,
    theme: "neutral",
    text: "Que représente concrètement l'espérance $E(X)$ ?",
    format: "qcm",
    choices: [
      "la valeur moyenne de $X$ si on répète l'expérience un très grand nombre de fois",
      "la valeur la plus probable de $X$",
      "la plus grande valeur que $X$ peut prendre",
      "la probabilité que $X$ soit positif",
    ],
    expected: [
      "la valeur moyenne de $X$ si on répète l'expérience un très grand nombre de fois",
    ],
    comparator: "mcq_exact",
    hint: "C'est une moyenne, pondérée par les probabilités.",
    explanation: exp(
      "L'espérance est la moyenne des valeurs de $X$, chacune pesée par sa probabilité.",
      "Sur un très grand nombre de répétitions, la moyenne des résultats observés se rapproche de $E(X)$.",
      "Ce n'est pas la valeur la plus probable : pour un dé, $E(X) = 3{,}5$, une valeur que le dé ne donne jamais.",
      "C'est la valeur moyenne sur un très grand nombre de répétitions."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "À un jeu, le gain NET $X$ vaut $-3$ € avec la probabilité $0{,}75$ et $7$ € avec la probabilité $0{,}25$. Calcule $E(X)$.",
    format: "short",
    expected: ["-0,5"],
    comparator: "number_equal",
    hint: "$(-3) \\times 0{,}75 + 7 \\times 0{,}25$.",
    explanation: exp(
      "Le gain net tient déjà compte de la mise : on applique directement $E(X) = \\sum x_i p_i$.",
      "$(-3) \\times 0{,}75 + 7 \\times 0{,}25 = -2{,}25 + 1{,}75$.",
      "$= -0{,}5$.",
      "$E(X) = -0{,}5$ € : le jeu est défavorable au joueur."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un jeu a une espérance de gain de $-0{,}5$ € par partie. Quelle perte moyenne peut-on prévoir sur $100$ parties, en euros ?",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "$100 \\times 0{,}5$.",
    explanation: exp(
      "L'espérance donne le gain moyen par partie : sur $n$ parties, on prévoit environ $n \\times E(X)$.",
      "$100 \\times (-0{,}5) = -50$.",
      "Le joueur perd donc en moyenne $50$ € sur $100$ parties.",
      "La perte moyenne prévisible est de $50$ €."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 3,
    theme: "neutral",
    text: "$X$ vaut $0$ avec la probabilité $0{,}9$ et $10$ avec la probabilité $0{,}1$. Calcule $E(X)$.",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "$0 \\times 0{,}9 + 10 \\times 0{,}1$.",
    explanation: exp(
      "On applique $E(X) = \\sum x_i p_i$.",
      "$0 \\times 0{,}9 + 10 \\times 0{,}1 = 0 + 1$.",
      "$= 1$.",
      "$E(X) = 1$ : un gros gain rare peut donner une espérance modeste."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "short"],
  },
  {
    kind: "template",
    id: "premiere_va_esp_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 3,
    theme: "neutral",
    hint: "$E(X) = \\sum x_i \\, p_i$.",
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "template"],
    generate: () => genEsperance(3),
  },

  /* ===================== VA_VARIANCE ===================== */
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 3,
    theme: "neutral",
    text: "La variance d'une variable aléatoire mesure :",
    format: "qcm",
    choices: [
      "la dispersion autour de l'espérance",
      "la valeur la plus probable",
      "la somme des valeurs",
      "le nombre de valeurs",
    ],
    expected: ["la dispersion autour de l'espérance"],
    comparator: "mcq_exact",
    hint: "Écart par rapport à la moyenne.",
    explanation: exp(
      "La variance quantifie l'éloignement des valeurs par rapport à l'espérance.",
      "$V(X) = \\sum p_i (x_i - E(X))^2$.",
      "Plus elle est grande, plus les valeurs sont dispersées.",
      "La dispersion autour de l'espérance."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
    difficulty: 3,
    theme: "neutral",
    text: "L'écart-type $\\sigma(X)$ se déduit de la variance par :",
    format: "qcm",
    choices: ["$\\sigma(X) = \\sqrt{V(X)}$", "$\\sigma(X) = V(X)^2$", "$\\sigma(X) = V(X)$", "$\\sigma(X) = \\dfrac{V(X)}{2}$"],
    expected: ["$\\sigma(X) = \\sqrt{V(X)}$"],
    comparator: "mcq_exact",
    hint: "Racine carrée.",
    explanation: exp(
      "L'écart-type est la racine carrée de la variance.",
      "$\\sigma(X) = \\sqrt{V(X)}$.",
      "Il a la même unité que $X$.",
      "$\\sigma(X) = \\sqrt{V(X)}$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 4,
    theme: "neutral",
    text: "$X$ vaut $0$ ou $2$ avec probabilité $0{,}5$ chacune. $E(X) = 1$. Calcule la variance $V(X)$.",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "$0{,}5(0-1)^2 + 0{,}5(2-1)^2$.",
    explanation: exp(
      "On applique $V(X) = \\sum p_i (x_i - E(X))^2$.",
      "$0{,}5 \\times (0 - 1)^2 + 0{,}5 \\times (2 - 1)^2 = 0{,}5 + 0{,}5$.",
      "$= 1$.",
      "$V(X) = 1$."
    ),
    canvas: loiGraph([0, 2], [0.5, 0.5]),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
    difficulty: 4,
    theme: "neutral",
    text: "Si $V(X) = 9$, combien vaut l'écart-type $\\sigma(X)$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$\\sqrt{9}$.",
    explanation: exp(
      "L'écart-type est la racine carrée de la variance.",
      "$\\sigma(X) = \\sqrt{9}$.",
      "$= 3$.",
      "$\\sigma(X) = 3$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
    difficulty: 3,
    theme: "neutral",
    text: "Si $V(X) = 16$, combien vaut l'écart-type $\\sigma(X)$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$\\sqrt{16}$.",
    explanation: exp(
      "L'écart-type est la racine carrée de la variance : $\\sigma(X) = \\sqrt{V(X)}$.",
      "$\\sigma(X) = \\sqrt{16}$.",
      "$= 4$. On prend la racine pour revenir à la même unité que $X$ : la variance, elle, s'exprime en unités au carré.",
      "$\\sigma(X) = 4$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 5,
    theme: "neutral",
    text: "$X$ vaut $0$ ou $4$ avec la probabilité $0{,}5$ chacune, et $E(X) = 2$. Calcule la variance $V(X)$.",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$(0-2)^2 \\times 0{,}5 + (4-2)^2 \\times 0{,}5$.",
    explanation: exp(
      "La variance est la moyenne des carrés des écarts à l'espérance : $V(X) = \\sum p_i (x_i - E(X))^2$.",
      "$(0 - 2)^2 \\times 0{,}5 + (4 - 2)^2 \\times 0{,}5 = 4 \\times 0{,}5 + 4 \\times 0{,}5$.",
      "$= 2 + 2 = 4$. Les écarts sont élevés au carré : la variance ne peut jamais être négative.",
      "$V(X) = 4$ (et $\\sigma(X) = 2$)."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
    difficulty: 4,
    theme: "neutral",
    text: "Si l'écart-type vaut $\\sigma(X) = 3$, combien vaut la variance $V(X)$ ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "La variance est le CARRÉ de l'écart-type.",
    explanation: exp(
      "Les deux quantités sont liées par $\\sigma(X) = \\sqrt{V(X)}$, donc $V(X) = \\sigma(X)^2$.",
      "$V(X) = 3^2$.",
      "$= 9$.",
      "$V(X) = 9$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle formule donne la variance de $X$ ?",
    format: "qcm",
    choices: [
      "$V(X) = \\sum p_i \\left(x_i - E(X)\\right)^2$",
      "$V(X) = \\sum p_i \\left(x_i - E(X)\\right)$",
      "$V(X) = \\sum x_i p_i$",
      "$V(X) = \\sqrt{\\sum p_i x_i^2}$",
    ],
    expected: ["$V(X) = \\sum p_i \\left(x_i - E(X)\\right)^2$"],
    comparator: "mcq_exact",
    hint: "Sans le carré, la somme des écarts vaudrait toujours $0$.",
    explanation: exp(
      "La variance mesure la dispersion autour de l'espérance : on part des écarts $x_i - E(X)$.",
      "Ces écarts sont élevés au CARRÉ, sinon les écarts positifs et négatifs se compenseraient et la somme vaudrait toujours $0$.",
      "Chaque carré est ensuite pesé par sa probabilité $p_i$. La formule $\\sum x_i p_i$, elle, donne l'espérance.",
      "$V(X) = \\sum p_i \\left(x_i - E(X)\\right)^2$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 4,
    theme: "neutral",
    text: "Deux variables ont la même espérance, mais $V(X) = 0{,}5$ et $V(Y) = 20$. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "les valeurs de $Y$ sont bien plus dispersées que celles de $X$",
      "les valeurs de $Y$ sont plus grandes que celles de $X$",
      "$Y$ a une plus grande probabilité d'être positive",
      "on ne peut rien comparer",
    ],
    expected: ["les valeurs de $Y$ sont bien plus dispersées que celles de $X$"],
    comparator: "mcq_exact",
    hint: "La variance mesure l'écartement autour de la moyenne, pas la taille des valeurs.",
    explanation: exp(
      "La variance mesure à quel point les valeurs s'écartent de l'espérance.",
      "$V(Y) = 20$ est bien supérieure à $V(X) = 0{,}5$ : les valeurs de $Y$ s'éloignent beaucoup plus de la moyenne.",
      "Cela ne dit rien de leur taille : les deux ont ici la même espérance. $X$ est simplement plus régulière, $Y$ plus imprévisible.",
      "Les valeurs de $Y$ sont bien plus dispersées."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 5,
    theme: "neutral",
    text: "Une variable aléatoire vérifie $V(X) = 0$. Que peut-on en déduire ?",
    format: "qcm",
    choices: [
      "$X$ prend toujours la même valeur",
      "$X$ vaut toujours $0$",
      "$E(X) = 0$",
      "c'est impossible",
    ],
    expected: ["$X$ prend toujours la même valeur"],
    comparator: "mcq_exact",
    hint: "Une somme de carrés est nulle seulement si chaque terme l'est.",
    explanation: exp(
      "La variance est une somme de termes positifs $p_i(x_i - E(X))^2$.",
      "Elle ne peut être nulle que si chaque écart $x_i - E(X)$ est nul : toutes les valeurs prises coïncident avec l'espérance.",
      "$X$ est donc constante — mais cette constante n'est pas forcément $0$ : une variable valant toujours $7$ a une variance nulle et une espérance de $7$.",
      "$X$ prend toujours la même valeur."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 5,
    theme: "neutral",
    text: "$X$ vaut $1$ ou $3$ avec la probabilité $0{,}5$ chacune, et $E(X) = 2$. Calcule $V(X)$.",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Chaque valeur est à une distance de $1$ de l'espérance.",
    explanation: exp(
      "On applique $V(X) = \\sum p_i (x_i - E(X))^2$.",
      "$(1 - 2)^2 \\times 0{,}5 + (3 - 2)^2 \\times 0{,}5 = 1 \\times 0{,}5 + 1 \\times 0{,}5$.",
      "$= 1$. Le carré rend positif l'écart $(1 - 2) = -1$.",
      "$V(X) = 1$ (et $\\sigma(X) = 1$)."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "short"],
  },
  {
    kind: "template",
    id: "premiere_va_var_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\sigma(X) = \\sqrt{V(X)}$.",
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "template"],
    generate: () => genEcartType(4),
  },
  {
    kind: "template",
    id: "premiere_va_var_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 4,
    theme: "neutral",
    hint: "$V(X) = \\sum p_i (x_i - E)^2$ avec deux valeurs équiprobables.",
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "template"],
    generate: () => genVariance(4),
  },

  /* ===================== VA_NOTATION ===================== */
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 2,
    theme: "neutral",
    text: "Que désigne l'événement $\\{X = 3\\}$ ?",
    format: "qcm",
    choices: [
      "« la variable $X$ prend la valeur $3$ »",
      "« $X$ est inférieur à $3$ »",
      "« $X$ vaut au moins $3$ »",
      "« la probabilité est $3$ »",
    ],
    expected: ["« la variable $X$ prend la valeur $3$ »"],
    comparator: "mcq_exact",
    hint: "Lecture directe.",
    explanation: exp(
      "$\\{X = a\\}$ est l'événement « $X$ prend la valeur $a$ ».",
      "Ici $a = 3$.",
      "C'est l'ensemble des issues où $X$ vaut exactement $3$.",
      "« $X$ prend la valeur $3$ »."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 3,
    theme: "neutral",
    text: "$X$ vaut $1$, $2$, $3$ avec $P(X=1)=0{,}2$, $P(X=2)=0{,}5$, $P(X=3)=0{,}3$. Combien vaut $P(X \\le 2)$ ?",
    format: "short",
    expected: ["0,7"],
    comparator: "number_equal",
    hint: "$P(X=1) + P(X=2)$.",
    explanation: exp(
      "$\\{X \\le 2\\}$ regroupe les valeurs $1$ et $2$.",
      "$P(X \\le 2) = P(X=1) + P(X=2) = 0{,}2 + 0{,}5$.",
      "$= 0{,}7$.",
      "$P(X \\le 2) = 0{,}7$."
    ),
    canvas: loiGraph([1, 2, 3], [0.2, 0.5, 0.3]),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 3,
    theme: "neutral",
    text: "Avec $P(X=1)=0{,}2$, $P(X=2)=0{,}5$, $P(X=3)=0{,}3$, combien vaut $P(X \\ge 2)$ ?",
    format: "short",
    expected: ["0,8"],
    comparator: "number_equal",
    hint: "$P(X=2) + P(X=3)$.",
    explanation: exp(
      "$\\{X \\ge 2\\}$ regroupe les valeurs $2$ et $3$.",
      "$P(X \\ge 2) = 0{,}5 + 0{,}3$.",
      "$= 0{,}8$.",
      "$P(X \\ge 2) = 0{,}8$."
    ),
    canvas: loiGraph([1, 2, 3], [0.2, 0.5, 0.3]),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 2,
    theme: "neutral",
    text: "L'événement $\\{X \\le 5\\}$ signifie :",
    format: "qcm",
    choices: [
      "« $X$ est inférieur ou égal à $5$ »",
      "« $X$ est égal à $5$ »",
      "« $X$ est strictement supérieur à $5$ »",
      "« $X$ vaut $5$ avec probabilité $1$ »",
    ],
    expected: ["« $X$ est inférieur ou égal à $5$ »"],
    comparator: "mcq_exact",
    hint: "Symbole $\\le$.",
    explanation: exp(
      "$\\{X \\le a\\}$ regroupe toutes les valeurs inférieures ou égales à $a$.",
      "Ici $a = 5$.",
      "C'est l'événement « $X \\le 5$ ».",
      "« $X$ est inférieur ou égal à $5$ »."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $P(X=1)=0{,}2$, $P(X=2)=0{,}5$ et $P(X=3)=0{,}3$, combien vaut $P(X < 3)$ ?",
    format: "short",
    expected: ["0,7"],
    comparator: "number_equal",
    hint: "Strictement inférieur à $3$ : les valeurs $1$ et $2$.",
    explanation: exp(
      "L'inégalité STRICTE $X < 3$ exclut la valeur $3$.",
      "Restent les valeurs $1$ et $2$ : $0{,}2 + 0{,}5$.",
      "$= 0{,}7$.",
      "$P(X < 3) = 0{,}7$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $P(X=1)=0{,}2$, $P(X=2)=0{,}5$ et $P(X=3)=0{,}3$, combien vaut $P(X > 1)$ ?",
    format: "short",
    expected: ["0,8"],
    comparator: "number_equal",
    hint: "Strictement supérieur à $1$ : les valeurs $2$ et $3$.",
    explanation: exp(
      "$X > 1$ exclut la valeur $1$ elle-même.",
      "Restent $2$ et $3$ : $0{,}5 + 0{,}3$.",
      "$= 0{,}8$. On peut aussi passer par l'événement contraire : $1 - P(X = 1) = 1 - 0{,}2$.",
      "$P(X > 1) = 0{,}8$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 3,
    theme: "neutral",
    text: "Que désigne l'événement $\\{X \\ge 2\\}$ ?",
    format: "qcm",
    choices: [
      "« $X$ prend la valeur $2$ ou une valeur plus grande »",
      "« $X$ prend une valeur strictement plus grande que $2$ »",
      "« $X$ est égal à $2$ »",
      "« $X$ prend une valeur plus petite que $2$ »",
    ],
    expected: ["« $X$ prend la valeur $2$ ou une valeur plus grande »"],
    comparator: "mcq_exact",
    hint: "Le trait sous le symbole $\\ge$ inclut l'égalité.",
    explanation: exp(
      "Le symbole $\\ge$ signifie « supérieur OU ÉGAL ».",
      "L'événement $\\{X \\ge 2\\}$ regroupe donc la valeur $2$ et toutes les valeurs au-dessus.",
      "Sans le trait, $\\{X > 2\\}$ exclurait la valeur $2$ : la différence porte exactement sur $P(X = 2)$.",
      "C'est « $X$ prend la valeur $2$ ou une valeur plus grande »."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 3,
    theme: "neutral",
    text: "Si $P(X = 2) = 0{,}5$, combien vaut la probabilité que $X$ ne prenne PAS la valeur $2$ ?",
    format: "short",
    expected: ["0,5"],
    comparator: "number_equal",
    hint: "Événement contraire : on retranche à $1$.",
    explanation: exp(
      "« Ne pas prendre la valeur $2$ » est l'événement contraire de $\\{X = 2\\}$.",
      "Sa probabilité vaut $1 - P(X = 2) = 1 - 0{,}5$.",
      "$= 0{,}5$.",
      "La probabilité est $0{,}5$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la différence entre $\\{X \\le 2\\}$ et $\\{X < 2\\}$ ?",
    format: "qcm",
    choices: [
      "le premier contient la valeur $2$, pas le second",
      "aucune, les deux sont identiques",
      "le second contient la valeur $2$, pas le premier",
      "le premier ne contient que la valeur $2$",
    ],
    expected: ["le premier contient la valeur $2$, pas le second"],
    comparator: "mcq_exact",
    hint: "$\\le$ autorise l'égalité, $<$ l'interdit.",
    explanation: exp(
      "$\\le$ signifie « inférieur ou égal », $<$ signifie « strictement inférieur ».",
      "$\\{X \\le 2\\}$ inclut donc la valeur $2$, que $\\{X < 2\\}$ exclut.",
      "L'écart entre les deux probabilités est exactement $P(X = 2)$. Pour une variable prenant des valeurs entières, $\\{X < 2\\}$ revient à $\\{X \\le 1\\}$.",
      "Le premier contient la valeur $2$, pas le second."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 5,
    theme: "neutral",
    text: "$X$ prend les valeurs $0$, $1$, $2$, $3$ avec les probabilités $0{,}1$, $0{,}2$, $0{,}4$ et $0{,}3$. Combien vaut $P(1 \\le X \\le 2)$ ?",
    format: "short",
    expected: ["0,6"],
    comparator: "number_equal",
    hint: "Les deux bornes sont incluses : additionne $P(X=1)$ et $P(X=2)$.",
    explanation: exp(
      "L'encadrement $1 \\le X \\le 2$ retient les valeurs comprises entre $1$ et $2$, bornes INCLUSES.",
      "Seules les valeurs $1$ et $2$ conviennent : $0{,}2 + 0{,}4$.",
      "$= 0{,}6$.",
      "$P(1 \\le X \\le 2) = 0{,}6$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 4,
    theme: "neutral",
    text: "$X$ prend uniquement les valeurs $1$, $2$ et $3$. Combien vaut $P(X \\le 3)$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Cet événement contient-il toutes les valeurs possibles ?",
    explanation: exp(
      "$\\{X \\le 3\\}$ regroupe les valeurs $1$, $2$ et $3$.",
      "Or ce sont les SEULES valeurs que $X$ peut prendre : l'événement est certain.",
      "Sa probabilité vaut donc $0{,}2 + 0{,}5 + 0{,}3 = 1$, quelle que soit la loi.",
      "$P(X \\le 3) = 1$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "short"],
  },
  {
    kind: "template",
    id: "premiere_va_not_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 3,
    theme: "neutral",
    hint: "$P(X \\le 2) = P(X=1) + P(X=2)$.",
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "template"],
    generate: () => genNotation(3),
  },

  /* ===================== VA_DEFINITION (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_va_def_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_definition",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi dit-on qu'une variable aléatoire est une FONCTION ?",
    format: "qcm",
    choices: [
      "parce qu'elle associe un nombre à chaque issue de l'univers",
      "parce qu'elle se représente par une courbe",
      "parce qu'elle prend des valeurs au hasard",
      "parce qu'elle a une dérivée",
    ],
    expected: ["parce qu'elle associe un nombre à chaque issue de l'univers"],
    comparator: "mcq_exact",
    hint: "Quel est l'ensemble de départ ? Quel est l'ensemble d'arrivée ?",
    explanation: exp(
      "Une fonction associe à chaque élément d'un ensemble de départ un unique élément d'un ensemble d'arrivée.",
      "Ici l'ensemble de départ est l'univers $\\Omega$ — l'ensemble des issues possibles — et l'ensemble d'arrivée est $\\mathbb{R}$.",
      "À chaque issue, $X$ associe donc un nombre, et un seul. Rien n'est « au hasard » dans $X$ elle-même : le hasard est dans le tirage de l'issue, pas dans la règle qui lui associe un nombre.",
      "C'est une fonction de $\\Omega$ vers $\\mathbb{R}$ — le nom « variable » est trompeur."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_def_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_definition",
    difficulty: 5,
    theme: "neutral",
    text: "On lance deux dés et $X$ désigne la somme obtenue. Quel est l'ensemble de départ de $X$ ?",
    format: "qcm",
    choices: [
      "l'ensemble des $36$ couples de résultats possibles",
      "l'ensemble $\\{2 ; 3 ; \\ldots ; 12\\}$ des sommes",
      "l'ensemble $\\{1 ; 2 ; \\ldots ; 6\\}$",
      "l'intervalle $[2 ; 12]$",
    ],
    expected: ["l'ensemble des $36$ couples de résultats possibles"],
    comparator: "mcq_exact",
    hint: "Ne pas confondre l'ensemble de DÉPART et l'ensemble des VALEURS prises.",
    explanation: exp(
      "L'ensemble de départ d'une variable aléatoire est l'univers : l'ensemble des issues de l'expérience.",
      "Ici une issue est un couple $(a ; b)$ donnant les deux faces : il y en a $6 \\times 6 = 36$.",
      "L'ensemble $\\{2 ; \\ldots ; 12\\}$ est celui des VALEURS prises par $X$, c'est-à-dire son ensemble d'arrivée utile — pas son ensemble de départ. Plusieurs issues donnent d'ailleurs la même valeur : $(1 ; 3)$, $(2 ; 2)$ et $(3 ; 1)$ donnent tous $4$.",
      "L'ensemble de départ est celui des $36$ couples."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "definition", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_va_def_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_definition",
    difficulty: 4,
    theme: "neutral",
    hint: "Une variable aléatoire associe un NOMBRE à chaque issue.",
    tags: ["premiere", "maths", "variables_aleatoires", "definition", "template"],
    generate: () => genDefinition(4),
  },
  {
    kind: "template",
    id: "premiere_va_def_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_definition",
    difficulty: 5,
    theme: "neutral",
    hint: "Sépare bien l'ensemble des ISSUES et l'ensemble des VALEURS prises.",
    tags: ["premiere", "maths", "variables_aleatoires", "definition", "template"],
    generate: () => genDefinition(5),
  },

  /* ===================== VA_MODELISER (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_va_mod_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_modeliser",
    difficulty: 5,
    theme: "reunion",
    text: "Une tombola d'école à Saint-Louis vend des tickets à $2$ €. Un ticket sur $50$ gagne un lot de $30$ €. Comment modéliser le gain NET d'un joueur ?",
    format: "qcm",
    choices: [
      "$X = 28$ avec la probabilité $\\dfrac{1}{50}$, et $X = -2$ avec la probabilité $\\dfrac{49}{50}$",
      "$X = 30$ avec la probabilité $\\dfrac{1}{50}$, et $X = 0$ avec la probabilité $\\dfrac{49}{50}$",
      "$X = 30$ avec la probabilité $\\dfrac{1}{50}$, et $X = -2$ avec la probabilité $\\dfrac{49}{50}$",
      "$X = 2$ avec la probabilité $\\dfrac{1}{50}$",
    ],
    expected: ["$X = 28$ avec la probabilité $\\dfrac{1}{50}$, et $X = -2$ avec la probabilité $\\dfrac{49}{50}$"],
    comparator: "mcq_exact",
    hint: "Le gain NET, c'est ce qu'on gagne moins ce qu'on a payé — y compris quand on gagne.",
    explanation: exp(
      "Modéliser un gain NET, c'est retrancher la mise dans TOUS les cas, y compris celui où l'on gagne.",
      "Le joueur paie $2$ € quoi qu'il arrive. S'il gagne, il reçoit $30$ € : son gain net est $30 - 2 = 28$ €.",
      "S'il perd, il ne reçoit rien : son gain net est $-2$ €. Les probabilités sont $\\dfrac{1}{50}$ et $\\dfrac{49}{50}$.",
      "$X$ vaut $28$ ou $-2$ — l'oubli classique est de garder $30$ pour le cas gagnant."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "modeliser", "reunion", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_va_mod_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_modeliser",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les issues favorables, puis divise par le nombre total d'issues.",
    tags: ["premiere", "maths", "variables_aleatoires", "modeliser", "template"],
    generate: () => genModeliser(4),
  },
  {
    kind: "template",
    id: "premiere_va_mod_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_modeliser",
    difficulty: 5,
    theme: "neutral",
    hint: "N'oublie pas de retrancher la mise dans TOUS les cas, gagnant compris.",
    tags: ["premiere", "maths", "variables_aleatoires", "modeliser", "template"],
    generate: () => genModeliser(5),
  },

  /* ===================== VA_ESPERANCE_PROBLEME (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_va_espp_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "L'espérance du gain net d'un jeu vaut $-0{,}4$ €. Que peut-on en conclure ?",
    format: "qcm",
    choices: [
      "le jeu est défavorable au joueur : il perd en moyenne $0{,}40$ € par partie",
      "le joueur perd exactement $0{,}40$ € à chaque partie",
      "le jeu est équitable",
      "le joueur ne peut jamais gagner",
    ],
    expected: ["le jeu est défavorable au joueur : il perd en moyenne $0{,}40$ € par partie"],
    comparator: "mcq_exact",
    hint: "L'espérance est une moyenne sur un grand nombre de parties, pas une garantie.",
    explanation: exp(
      "L'espérance est la valeur moyenne du gain, au sens où elle est approchée par la moyenne des gains sur un grand nombre de parties.",
      "Une espérance négative signifie que la moyenne est une perte : le jeu est défavorable au joueur.",
      "Mais elle ne dit rien d'une partie isolée : le joueur peut très bien gagner gros une fois. D'ailleurs, si $X$ ne prend que les valeurs $-2$ et $28$, il ne vaudra JAMAIS $-0{,}4$.",
      "Le jeu est défavorable : sur $100$ parties, on peut prévoir environ $40$ € de perte."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance_probleme", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_va_espp_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule l'espérance du gain brut, puis retranche la mise.",
    tags: ["premiere", "maths", "variables_aleatoires", "esperance_probleme", "template"],
    generate: () => genEspProbleme(5),
  },
  {
    kind: "template",
    id: "premiere_va_espp_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Le prix équitable est l'espérance du gain brut.",
    tags: ["premiere", "maths", "variables_aleatoires", "esperance_probleme", "template"],
    generate: () => genEspProbleme(5),
  },

  /* ===================== VA_ECART_TYPE (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_va_et_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi préfère-t-on souvent l'écart-type à la variance pour interpréter une situation ?",
    format: "qcm",
    choices: [
      "parce qu'il s'exprime dans la même unité que $X$",
      "parce qu'il est toujours plus petit",
      "parce qu'il est plus facile à calculer",
      "parce qu'il ne peut pas être nul",
    ],
    expected: ["parce qu'il s'exprime dans la même unité que $X$"],
    comparator: "mcq_exact",
    hint: "Si $X$ est en euros, en quoi est la variance ?",
    explanation: exp(
      "La variance est une moyenne de CARRÉS d'écarts : son unité est le carré de celle de $X$.",
      "Si $X$ est un gain en euros, la variance s'exprime en « euros au carré », ce qui ne veut rien dire concrètement.",
      "L'écart-type, sa racine carrée, revient dans l'unité de départ : on peut alors dire « les gains s'écartent en moyenne de $3$ € de l'espérance ».",
      "Même unité que $X$ : c'est ce qui le rend interprétable."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "ecart_type", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_et_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
    difficulty: 5,
    theme: "neutral",
    text: "Deux jeux ont la même espérance de gain, mais des écarts-types de $1$ € et $40$ €. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "le second est beaucoup plus risqué : les gains sont très dispersés",
      "le second rapporte plus en moyenne",
      "le premier est plus intéressant à coup sûr",
      "les deux jeux sont identiques",
    ],
    expected: ["le second est beaucoup plus risqué : les gains sont très dispersés"],
    comparator: "mcq_exact",
    hint: "L'écart-type mesure la dispersion, pas le niveau moyen.",
    explanation: exp(
      "L'espérance dit où se situe le centre ; l'écart-type dit à quel point les valeurs s'en écartent.",
      "Ici les deux jeux ont le même gain moyen : sur un très grand nombre de parties, ils rapportent pareil.",
      "Mais le second disperse beaucoup plus : de grosses pertes et de gros gains s'y compensent, alors que le premier donne des résultats presque toujours proches de la moyenne.",
      "Même espérance, risque très différent — c'est précisément ce que l'espérance seule ne dit pas."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "ecart_type", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_va_et_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les écarts-types, pas les espérances.",
    tags: ["premiere", "maths", "variables_aleatoires", "ecart_type", "template"],
    generate: () => genEcartType(5),
  },
  {
    kind: "template",
    id: "premiere_va_et_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
    difficulty: 4,
    theme: "neutral",
    hint: "L'écart-type est la racine carrée de la variance.",
    tags: ["premiere", "maths", "variables_aleatoires", "ecart_type", "template"],
    generate: () => genEcartType(4),
  },

  /* ===================== VA_SIMULATION ===================== */
  {
    kind: "fixed",
    id: "premiere_va_sim_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_simulation",
    difficulty: 3,
    theme: "neutral",
    text: "En Python, quelle instruction simule le lancer d'un dé équilibré à six faces ?",
    format: "qcm",
    choices: [
      "randint(1, 6)",
      "random()",
      "randint(0, 6)",
      "randint(1, 7)",
    ],
    expected: ["randint(1, 6)"],
    comparator: "mcq_exact",
    hint: "Attention aux bornes : quelles valeurs veut-on obtenir ?",
    explanation: exp(
      "Simuler une expérience aléatoire, c'est produire des issues avec les bonnes probabilités.",
      "Un dé donne un entier entre $1$ et $6$, chacun avec la probabilité $\\dfrac{1}{6}$ : c'est exactement ce que fait `randint(1, 6)`, dont les deux bornes sont incluses.",
      "`random()` renvoie un décimal entre $0$ et $1$ : utile pour simuler un événement de probabilité donnée, pas un dé. `randint(0, 6)` ajouterait un $0$ impossible.",
      "`randint(1, 6)` — vérifier les bornes est le premier réflexe de relecture d'une simulation."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "simulation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_sim_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_simulation",
    difficulty: 4,
    theme: "neutral",
    text: "Comment simuler un événement de probabilité $0{,}3$ avec `random()`, qui renvoie un décimal entre $0$ et $1$ ?",
    format: "qcm",
    choices: [
      "tester si `random() < 0.3`",
      "tester si `random() == 0.3`",
      "tester si `random() > 0.3`",
      "multiplier `random()` par $0{,}3$",
    ],
    expected: ["tester si `random() < 0.3`"],
    comparator: "mcq_exact",
    hint: "Quelle proportion des nombres entre $0$ et $1$ est inférieure à $0{,}3$ ?",
    explanation: exp(
      "`random()` tire un décimal uniformément entre $0$ et $1$ : la probabilité de tomber dans un intervalle est la longueur de cet intervalle.",
      "L'intervalle $[0 ; 0{,}3[$ a pour longueur $0{,}3$.",
      "Le test `random() < 0.3` est donc vrai avec la probabilité $0{,}3$. Tester l'égalité serait absurde : elle a une probabilité nulle avec des décimaux.",
      "`random() < 0.3` — et `random() < p` pour n'importe quelle probabilité $p$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "simulation", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_sim_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_simulation",
    difficulty: 5,
    theme: "neutral",
    text: "On simule $10\\,000$ parties et on obtient un gain moyen de $-0{,}52$ €. L'espérance calculée vaut $-0{,}5$ €. Que conclure ?",
    format: "qcm",
    choices: [
      "la simulation confirme le calcul : la moyenne s'approche de l'espérance quand $n$ grandit",
      "le calcul de l'espérance est faux",
      "la simulation est mal programmée",
      "l'espérance vaut en réalité $-0{,}52$ €",
    ],
    expected: ["la simulation confirme le calcul : la moyenne s'approche de l'espérance quand $n$ grandit"],
    comparator: "mcq_exact",
    hint: "Une simulation donne-t-elle exactement l'espérance ?",
    explanation: exp(
      "Une simulation produit une moyenne OBSERVÉE sur un échantillon : elle fluctue, elle ne tombe jamais exactement sur la valeur théorique.",
      "Ce qu'on attend, c'est que cette moyenne se rapproche de l'espérance quand le nombre de parties augmente.",
      "Un écart de $0{,}02$ sur $10\\,000$ parties est tout à fait normal ; ce serait un écart de $0{,}5$ qui devrait alerter.",
      "La simulation confirme le calcul — c'est une illustration de la loi des grands nombres, pas une preuve."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "simulation", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_va_sim_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_simulation",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie les bornes : sont-elles incluses ? Correspondent-elles aux valeurs possibles ?",
    tags: ["premiere", "maths", "variables_aleatoires", "simulation", "template"],
    generate: () => genSimulation(4),
  },
  {
    kind: "template",
    id: "premiere_va_sim_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_simulation",
    difficulty: 5,
    theme: "neutral",
    hint: "Décris la boucle, ce qu'on accumule, et ce qu'on affiche à la fin.",
    tags: ["premiere", "maths", "variables_aleatoires", "simulation", "template"],
    generate: () => genSimulation(5),
  },

  /* ===================== VA_ECHANTILLON ===================== */
  {
    kind: "fixed",
    id: "premiere_va_ech_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_echantillon",
    difficulty: 4,
    theme: "neutral",
    text: "Que dit la loi des grands nombres à propos de la moyenne d'un échantillon ?",
    format: "qcm",
    choices: [
      "elle se rapproche de l'espérance quand la taille de l'échantillon augmente",
      "elle est toujours égale à l'espérance",
      "elle s'éloigne de l'espérance quand la taille augmente",
      "elle ne dépend pas de la taille de l'échantillon",
    ],
    expected: ["elle se rapproche de l'espérance quand la taille de l'échantillon augmente"],
    comparator: "mcq_exact",
    hint: "Que se passe-t-il si on lance un dé $10$ fois, puis $10\\,000$ fois ?",
    explanation: exp(
      "Un échantillon de taille $n$ est une suite de $n$ répétitions indépendantes de la même expérience ; sa moyenne est une valeur observée, qui fluctue.",
      "La loi des grands nombres dit que cette moyenne observée se rapproche de l'espérance quand $n$ grandit.",
      "Sur $10$ lancers de dé, la moyenne peut valoir $2{,}8$ ou $4{,}5$ ; sur $10\\,000$, elle sera très proche de $3{,}5$.",
      "Elle se rapproche de l'espérance : c'est ce qui fait le lien entre le calcul théorique et l'observation."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "echantillon", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_ech_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_echantillon",
    difficulty: 5,
    theme: "neutral",
    text: "La moyenne observée sur $50$ lancers de dé vaut $3{,}9$, alors que l'espérance vaut $3{,}5$. Le dé est-il truqué ?",
    format: "qcm",
    choices: [
      "on ne peut pas le conclure : sur $50$ lancers, un tel écart est courant",
      "oui, la moyenne devrait être exactement $3{,}5$",
      "oui, l'écart dépasse $0{,}1$",
      "non, c'est impossible avec un dé truqué",
    ],
    expected: ["on ne peut pas le conclure : sur $50$ lancers, un tel écart est courant"],
    comparator: "mcq_exact",
    hint: "L'espérance est une limite de comportement, pas une valeur à atteindre.",
    explanation: exp(
      "La moyenne d'un échantillon fluctue autour de l'espérance : elle n'a aucune raison de tomber exactement dessus.",
      "L'ampleur de cette fluctuation dépend de la taille de l'échantillon : elle est grande pour $n$ petit, faible pour $n$ grand.",
      "Sur $50$ lancers, un écart de $0{,}4$ est banal. C'est en répétant sur des milliers de lancers, et en voyant l'écart PERSISTER, qu'on commencerait à soupçonner un truquage.",
      "On ne peut rien conclure : un échantillon de $50$ est trop petit pour trancher."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "echantillon", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_va_ech_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_echantillon",
    difficulty: 4,
    theme: "neutral",
    hint: "Sur un grand échantillon, la moyenne observée est proche de l'espérance.",
    tags: ["premiere", "maths", "variables_aleatoires", "echantillon", "template"],
    generate: () => genEchantillon(4),
  },
  {
    kind: "template",
    id: "premiere_va_ech_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_echantillon",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde la taille de l'échantillon avant de conclure.",
    tags: ["premiere", "maths", "variables_aleatoires", "echantillon", "template"],
    generate: () => genEchantillon(5),
  },

  /* =========================================================
     QUESTIONS OUVERTES — compléments du 02/08/2026.
     Quatre micro-compétences écrites avant le découpage n'avaient aucune
     question ouverte : deux ouvertes fixes + un TEMPLATE ouvert chacune.
  ========================================================= */

  {
    kind: "template",
    id: "premiere_va_not_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 5,
    theme: "neutral",
    hint: "Liste d'abord les valeurs concernées par l'inégalité, puis additionne leurs probabilités.",
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "template"],
    generate: () => genNotation(5),
  },

  {
    kind: "template",
    id: "premiere_va_loi_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 5,
    theme: "neutral",
    hint: "Liste les valeurs possibles, compte les issues favorables, vérifie que la somme fait $1$.",
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "template"],
    generate: () => genLoi(5),
  },

  {
    kind: "template",
    id: "premiere_va_esp_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque valeur multipliée par sa probabilité, puis on additionne.",
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "template"],
    generate: () => genEsperance(5),
  },

  {
    kind: "template",
    id: "premiere_va_var_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 5,
    theme: "neutral",
    hint: "Moyenne des carrés des écarts à l'espérance, pondérée par les probabilités.",
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "template"],
    generate: () => genVariance(5),
  },

  /* ===== 15/10/2026 — un gabarit à chaque étoile qui n'en avait pas ===== */
  gab("premiere_va_loi_tpl_e2", "va_loi", 2, "La somme des probabilités vaut $1$.", "loi", () => genLoi(2)),
  gab("premiere_va_loi_tpl_e4", "va_loi", 4, "La somme des probabilités vaut $1$ ; dans une situation équiprobable, on compte.", "loi", () => genLoi(4)),
  gab("premiere_va_mod_tpl_e3", "va_modeliser", 3, "Quel NOMBRE $X$ associe-t-elle à chaque issue ?", "modeliser", () => genModeliser(3)),
  gab("premiere_va_def_tpl_e3", "va_definition", 3, "Une variable aléatoire associe un NOMBRE à chaque issue.", "definition", () => genDefinition(3)),
  gab("premiere_va_esp_tpl_e2", "va_esperance", 2, "$E(X) = \\sum x_i \\, P(X = x_i)$.", "esperance", () => genEsperance(2)),
  gab("premiere_va_esp_tpl_e4", "va_esperance", 4, "$E(X) = \\sum x_i \\, P(X = x_i)$ et $E(aX + b) = a\\,E(X) + b$.", "esperance", () => genEsperance(4)),
  gab("premiere_va_espp_tpl_e3", "va_esperance_probleme", 3, "Gain net = somme reçue − mise, dans tous les cas.", "esperance", () => genEspProbleme(3)),
  gab("premiere_va_espp_tpl_e4", "va_esperance_probleme", 4, "Gain net = somme reçue − mise ; équitable quand $E = 0$.", "esperance", () => genEspProbleme(4)),
  gab("premiere_va_var_tpl_e3", "va_variance", 3, "$V(X) = \\sum P(X = x_i)\\,(x_i - E(X))^2$.", "variance", () => genVariance(3)),
  gab("premiere_va_et_tpl_e3", "va_ecart_type", 3, "$\\sigma(X) = \\sqrt{V(X)}$ ; plus il est petit, moins les valeurs s'écartent.", "ecart_type", () => genEcartType(3)),
  gab("premiere_va_not_tpl_e2", "va_notation", 2, "« au moins » : $\\geqslant$ ; « au plus » : $\\leqslant$.", "notation", () => genNotation(2)),
  gab("premiere_va_not_tpl_e4", "va_notation", 4, "Additionne les probabilités des valeurs qui vérifient la condition.", "notation", () => genNotation(4)),
  gab("premiere_va_sim_tpl_e3", "va_simulation", 3, "`randint(a, b)` inclut les deux bornes ; `random() < p` est vrai avec la probabilité $p$.", "simulation", () => genSimulation(3)),
];
