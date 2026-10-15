// lib/tutor-v4/questionBank/terminale-spe/maths/concentration.bank.ts
//
// Notion : Concentration, loi des grands nombres (concentration_echantillonnage)
//
// microSkills couverts (~10 items chacun, difficultés étalées 1→5) :
//   concentration_echantillon_moyenne      — E(Mₙ)=μ, V(Mₙ)=σ²/n
//   concentration_inegalite_bienayme       — Inégalité de Bienaymé-Tchebychev
//   concentration_inegalite_concentration  — Inégalité de concentration
//   concentration_loi_grands_nombres       — Loi des grands nombres
//   concentration_fluctuation              — Fluctuation d'une fréquence
//   concentration_defi                     — Exercice type bac
//
// Rappels : Mₙ = (X₁+…+Xₙ)/n ; E(Mₙ)=μ ; V(Mₙ)=σ²/n.
//   Bienaymé : P(|X−μ|≥δ) ≤ V(X)/δ². Concentration : P(|Mₙ−μ|≥δ) ≤ σ²/(nδ²).
//   Fréquence : E(Fₙ)=p ; V(Fₙ)=p(1−p)/n.

import type { DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Écriture décimale EXACTE de num/den (au plus `max` décimales), ou null si le
 * quotient ne tombe pas juste : les générateurs écartent alors le tirage plutôt
 * que d'afficher un arrondi ou un 0,30000000000000004.
 */
function decimalExact(num: number, den: number, max = 4): string | null {
  for (let k = 0; k <= max; k++) {
    const scaled = num * 10 ** k;
    if (Number.isInteger(scaled) && scaled % den === 0) {
      return String(scaled / den / 10 ** k).replace(".", ",");
    }
  }
  return null;
}

/** « 0,25 » → « 0{,}25 » pour l'écrire dans une formule. */
function tex(s: string): string {
  return s.replace(",", "{,}");
}

/* =========================================================================
   ⛔⛔ 15/10/2026 — « DES QUESTIONS REVIENNENT » : LA CONCENTRATION.
   Mesuré avant (scripts/mesurer-squelettes-coach.ts terminale-spe
   concentration_echantillonnage) : les 6 micros sous le seuil, 10 à 13
   squelettes par micro, 13 à 18 répétitions sur une série de 20.
   Même méthode que les probabilités de 3e (dd5e9f75) : chaque gabarit croise
     · une SITUATION (vingt-quatre grandeurs : masse d'un letchi, attente du
       car jaune, pluie à Cilaos, trajet du téléphérique Papang, ananas
       Victoria, vagues de Saint-Leu… ; vingt épreuves de Bernoulli ; des dés
       et des stands de kermesse pour la loi des grands nombres) ;
     · une TOURNURE (trois façons de poser le modèle, trois façons de décrire
       l'échantillon, plusieurs façons de poser la question) ;
     · des NOMBRES tirés pour que le résultat tombe JUSTE (`decimalExact`).
   L'explication refait le calcul avec les nombres de la question.
========================================================================= */

type Q = TutorGeneratedQuestionV4;

const ri = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
function melange<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
/** 0.25 → « 0,25 » (au plus 4 décimales, jamais de 0,30000000000000004). */
function fr(x: number): string {
  return String(Math.round(x * 10000) / 10000).replace(".", ",");
}
/** Un nombre écrit dans une formule : « 0{,}25 ». */
const fm = (x: number) => tex(fr(x));
/** « de letchis », « d'ampoules ». */
const deN = (w: string) => (/^[aeiouéèêh]/i.test(w) ? `d'${w}` : `de ${w}`);
/** Vrai si x s'écrit exactement avec au plus 4 décimales. */
const net = (x: number) => Math.abs(x * 10000 - Math.round(x * 10000)) < 1e-6;

/**
 * QCM numérique : la bonne valeur et trois leurres DISTINCTS EN VALEUR, tous
 * écrits juste (au plus 4 décimales) ; des voisins de secours complètent.
 */
function qcmVal(bon: number, leurres: number[]): { choices: string[]; expected: string[] } {
  const vus = [bon];
  const pris: number[] = [];
  const secours = [bon * 2, bon / 2, bon * 10, bon / 10, bon + 1, bon * 3];
  for (const l of [...melange(leurres), ...secours]) {
    if (pris.length === 3) break;
    if (!Number.isFinite(l) || l < 0 || !net(l)) continue;
    if (vus.some((v) => Math.abs(v - l) < 1e-9)) continue;
    vus.push(l);
    pris.push(l);
  }
  const w = (v: number) => `$${fm(v)}$`;
  return { choices: melange([w(bon), ...pris.map(w)]), expected: [w(bon)] };
}

function gab(
  id: string,
  microId: string,
  difficulty: DifficultyLevel,
  hint: string,
  tags: string[],
  generate: () => Q,
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["terminale-spe", "concentration", ...tags, "template"],
    generate,
  };
}

/* ---------- Les grandeurs mesurées (X d'espérance μ, d'écart-type σ) ---------- */
type Sit = { x: string; lot: string; mus: readonly number[]; sigmas: readonly number[] };
const SITUATIONS: readonly Sit[] = [
  { x: "la masse, en grammes, d'un letchi cueilli à Saint-Denis", lot: "letchis cueillis au hasard", mus: [18, 20, 22, 25], sigmas: [2, 3, 4] },
  { x: "le temps d'attente, en minutes, du car jaune à un arrêt de Saint-Pierre", lot: "attentes relevées des jours différents", mus: [8, 10, 12, 15], sigmas: [2, 3, 4, 5] },
  { x: "la masse, en grammes, d'un samoussa du pique-nique", lot: "samoussas choisis au hasard", mus: [40, 45, 50], sigmas: [2, 3, 4, 5] },
  { x: "la hauteur de pluie, en millimètres, tombée en un jour à Cilaos", lot: "jours pris au hasard", mus: [10, 12, 15], sigmas: [4, 5, 6] },
  { x: "le nombre de bonbons d'un sachet de la kermesse", lot: "sachets pris au hasard", mus: [30, 40, 50], sigmas: [2, 3, 4] },
  { x: "la durée de vie, en heures, d'une ampoule", lot: "ampoules prises au hasard", mus: [800, 1000, 1200], sigmas: [20, 30, 50, 100] },
  { x: "la note sur 20 d'un élève à un devoir commun", lot: "copies tirées au hasard", mus: [10, 11, 12, 13], sigmas: [2, 3, 4] },
  { x: "la durée, en minutes, du trajet Saint-Denis – Saint-Paul en voiture", lot: "trajets relevés au hasard", mus: [30, 35, 40, 45], sigmas: [5, 6, 8, 10] },
  { x: "la masse, en kilogrammes, d'un régime de bananes", lot: "régimes pris au hasard", mus: [15, 18, 20], sigmas: [2, 3, 4] },
  { x: "le nombre de cases parcourues en dix tours au jeu de l'oie", lot: "parties prises au hasard", mus: [65, 70, 75], sigmas: [5, 6, 7] },
  { x: "la contenance, en millilitres, d'une bouteille d'eau de Cilaos", lot: "bouteilles prises au hasard", mus: [500, 750, 1000], sigmas: [2, 3, 4, 5] },
  { x: "la distance, en mètres, d'un lancer de javelot à l'entraînement", lot: "lancers à l'entraînement", mus: [40, 45, 50], sigmas: [3, 4, 5] },
  { x: "le nombre de clients servis en une heure au snack du front de mer", lot: "heures prises au hasard", mus: [20, 25, 30], sigmas: [4, 5, 6] },
  { x: "la vitesse, en km/h, d'une voiture sur la route des Tamarins", lot: "voitures contrôlées au hasard", mus: [100, 105, 110], sigmas: [5, 6, 8, 10] },
  { x: "la taille, en centimètres, d'un élève de terminale", lot: "élèves choisis au hasard", mus: [170, 172, 175], sigmas: [6, 7, 8, 10] },
  { x: "la durée, en minutes, d'un trajet du téléphérique Papang", lot: "trajets relevés au hasard", mus: [12, 14, 15], sigmas: [1, 2] },
  { x: "la masse, en grammes, d'un ananas Victoria", lot: "ananas choisis au hasard", mus: [800, 900, 1000], sigmas: [30, 40, 50, 60, 100] },
  { x: "le nombre de vagues surfées pendant une session à Saint-Leu", lot: "sessions prises au hasard", mus: [15, 20, 25], sigmas: [3, 4, 5] },
  { x: "le temps, en secondes, d'un élève au 100 mètres", lot: "courses chronométrées", mus: [14, 15, 16], sigmas: [1, 2] },
  { x: "le montant, en euros, d'un ticket de caisse au marché forain de Saint-Paul", lot: "tickets pris au hasard", mus: [12, 15, 20], sigmas: [3, 4, 5, 6] },
  { x: "le nombre de randonneurs passant en un jour au Pas de Bellecombe", lot: "jours pris au hasard", mus: [400, 500, 600], sigmas: [20, 30, 40, 50] },
  { x: "la durée, en minutes, d'une partie de petits chevaux", lot: "parties prises au hasard", mus: [30, 40, 45], sigmas: [5, 6, 8, 10] },
  { x: "le score, en points, d'un joueur de basket du club de Saint-Louis lors d'un match", lot: "matchs pris au hasard", mus: [12, 15, 18, 20], sigmas: [4, 5, 6] },
  { x: "la durée, en minutes, de la recharge d'une trottinette électrique", lot: "recharges relevées au hasard", mus: [180, 200, 240], sigmas: [10, 15, 20] },
];

/** La phrase qui pose le modèle, en donnant la variance (« v ») ou l'écart-type (« s »). */
function poserX(s: Sit, mu: number, sigma: number, forme: "v" | "s"): string {
  const v = sigma * sigma;
  const loi = forme === "v" ? `de variance $${v}$` : `d'écart-type $${sigma}$`;
  const loiF = forme === "v" ? `$V(X) = ${v}$` : `$\\sigma(X) = ${sigma}$`;
  return pick([
    `On note $X$ ${s.x}, d'espérance $${mu}$ et ${loi}.`,
    `On modélise ${s.x} par une variable aléatoire $X$ telle que $E(X) = ${mu}$ et ${loiF}.`,
    `Une étude indique que, si $X$ désigne ${s.x}, alors $E(X) = ${mu}$ et ${loiF}.`,
  ]);
}
/** La phrase qui décrit l'échantillon et la moyenne Mₙ. */
function poserEchantillon(s: Sit, n: number): string {
  return pick([
    `On relève cette grandeur sur $${n}$ ${s.lot}, de manière indépendante ; $M_{${n}}$ désigne la moyenne de ces $${n}$ valeurs.`,
    `On constitue un échantillon $(X_1, \\dots, X_{${n}})$ de taille $${n}$ de la loi de $X$ (${s.lot}) et on pose $M_{${n}} = \\dfrac{X_1 + \\dots + X_{${n}}}{${n}}$.`,
    `On étudie la moyenne $M_{${n}}$ des valeurs de $X$ observées sur $${n}$ ${s.lot}, supposées indépendantes.`,
  ]);
}
const varDe = (sigma: number, forme: "v" | "s") =>
  forme === "v" ? `$V(X) = ${sigma * sigma}$` : `$V(X) = \\sigma^2 = ${sigma}^2 = ${sigma * sigma}$`;

/* ---------- concentration_echantillon_moyenne : E(Mₙ) = μ, V(Mₙ) = σ²/n ---------- */
const TAILLES = [4, 5, 8, 10, 16, 20, 25, 40, 50, 100, 200, 250, 400, 500, 1000] as const;
const RACINES = [2, 3, 4, 5, 6, 8, 10, 20] as const;
const DEF_MOY = "Pour un échantillon de $n$ variables indépendantes de même loi que $X$ : $E(M_n) = E(X)$ et $V(M_n) = \\dfrac{V(X)}{n}$.";

function genMoy(star: 2 | 3 | 4 | 5): Q {
  const s = pick(SITUATIONS);
  const mu = pick(s.mus);
  const sigma = pick(s.sigmas);
  const v = sigma * sigma;
  const forme = pick(["v", "s"] as const);
  const sortes = {
    2: ["E", "V", "V"],
    3: ["sig", "Vs", "VX"],
    4: ["nV", "nSig", "SE", "SV"],
    5: ["qcmV", "k", "sigS"],
  }[star];
  const sorte = pick(sortes);
  // n tel que V(Mₙ) = v/n tombe juste ; r tel que σ/r tombe juste (n = r²).
  let n = 0;
  do n = pick(TAILLES); while (decimalExact(v, n) === null || v / n < 0.0001);
  const tV = v / n;
  let r = 0;
  do r = pick(RACINES); while (!net(sigma / r) || sigma / r < 0.01);
  const n2 = r * r;
  const tS = sigma / r;
  const res = (text: string, rep: number, calcul: string, conclusion: string, methode: string): Q => ({
    text,
    format: "short",
    expected: [fr(rep)],
    comparator: "number_equal",
    explanation: exp(DEF_MOY, methode, calcul, conclusion),
  });

  if (sorte === "E") {
    const q = pick([`Que vaut $E(M_{${n}})$ ?`, `Quelle est l'espérance de $M_{${n}}$ ?`, `Autour de quelle valeur la moyenne $M_{${n}}$ est-elle centrée ? Donne $E(M_{${n}})$.`]);
    return res(`${poserX(s, mu, sigma, forme)} ${poserEchantillon(s, n)} ${q}`, mu,
      `$E(M_{${n}}) = E(X) = ${mu}$ : la taille $${n}$ ne change pas l'espérance.`, `$E(M_{${n}}) = ${mu}$.`,
      "La moyenne d'échantillon a la même espérance qu'une valeur isolée ; ⚠️ on ne divise pas par $n$.");
  }
  if (sorte === "V" || sorte === "Vs") {
    const f = sorte === "V" ? "v" : "s";
    const q = pick([`Que vaut $V(M_{${n}})$ ?`, `Calcule la variance de $M_{${n}}$.`, `Quelle est la variance de la moyenne $M_{${n}}$ ?`]);
    return res(`${poserX(s, mu, sigma, f)} ${poserEchantillon(s, n)} ${q}`, tV,
      `${varDe(sigma, f)}, donc $V(M_{${n}}) = \\dfrac{${v}}{${n}} = ${fm(tV)}$.`, `$V(M_{${n}}) = ${fm(tV)}$.`,
      f === "s" ? "On passe de l'écart-type à la variance (on l'élève au carré), puis on divise par $n$." : "On divise la variance de $X$ par la taille de l'échantillon (par $n$, pas par $n^2$).");
  }
  if (sorte === "sig") {
    const q = pick([`Quel est l'écart-type de $M_{${n2}}$ ?`, `Que vaut $\\sigma(M_{${n2}})$ ?`, `Calcule l'écart-type de la moyenne $M_{${n2}}$.`]);
    return res(`${poserX(s, mu, sigma, forme)} ${poserEchantillon(s, n2)} ${q}`, tS,
      `${forme === "v" ? `$\\sigma(X) = \\sqrt{${v}} = ${sigma}$, puis ` : ""}$\\sigma(M_{${n2}}) = \\dfrac{${sigma}}{\\sqrt{${n2}}} = \\dfrac{${sigma}}{${r}} = ${fm(tS)}$.`,
      `$\\sigma(M_{${n2}}) = ${fm(tS)}$.`, "$\\sigma(M_n) = \\sqrt{V(M_n)} = \\dfrac{\\sigma}{\\sqrt{n}}$ : on divise par $\\sqrt{n}$, pas par $n$.");
  }
  if (sorte === "VX") {
    const q = pick([`Quelle est la variance $V(X)$ ?`, `Retrouve $V(X)$.`, `Que vaut la variance de $X$ ?`]);
    return res(`On note $X$ ${s.x}. Sur un échantillon de $${n}$ ${s.lot} (relevés indépendants), la moyenne $M_{${n}}$ a pour variance $${fm(tV)}$. ${q}`, v,
      `$V(M_{${n}}) = \\dfrac{V(X)}{${n}}$, donc $V(X) = ${n} \\times ${fm(tV)} = ${v}$.`, `$V(X) = ${v}$.`,
      "On remonte la formule : on multiplie $V(M_n)$ par $n$.");
  }
  if (sorte === "nV") {
    const q = pick([`Quelle taille $n$ d'échantillon donne $V(M_n) = ${fm(tV)}$ ?`, `Pour quelle valeur de $n$ la variance de $M_n$ vaut-elle $${fm(tV)}$ ?`, `Combien de valeurs faut-il moyenner pour que $V(M_n) = ${fm(tV)}$ ?`]);
    return res(`${poserX(s, mu, sigma, forme)} On note $M_n$ la moyenne d'un échantillon de taille $n$ de la loi de $X$. ${q}`, n,
      `${varDe(sigma, forme)} ; $\\dfrac{${v}}{n} = ${fm(tV)}$ donne $n = \\dfrac{${v}}{${fm(tV)}} = ${n}$.`, `$n = ${n}$.`,
      "On écrit $\\dfrac{V(X)}{n}$ égal à la valeur voulue et on isole $n$.");
  }
  if (sorte === "nSig") {
    const q = pick([`Quelle taille $n$ d'échantillon donne $\\sigma(M_n) = ${fm(tS)}$ ?`, `Pour quelle valeur de $n$ l'écart-type de $M_n$ vaut-il $${fm(tS)}$ ?`, `Combien de valeurs faut-il moyenner pour que $\\sigma(M_n) = ${fm(tS)}$ ?`]);
    return res(`${poserX(s, mu, sigma, "s")} On note $M_n$ la moyenne d'un échantillon de taille $n$ de la loi de $X$. ${q}`, n2,
      `$\\dfrac{${sigma}}{\\sqrt{n}} = ${fm(tS)}$ donne $\\sqrt{n} = \\dfrac{${sigma}}{${fm(tS)}} = ${r}$, donc $n = ${r}^2 = ${n2}$.`, `$n = ${n2}$.`,
      "$\\sigma(M_n) = \\dfrac{\\sigma}{\\sqrt{n}}$ : on trouve $\\sqrt{n}$, puis on l'élève au carré.");
  }
  if (sorte === "SE" || sorte === "SV") {
    const e = sorte === "SE";
    const q = e
      ? pick([`Que vaut $E(S_{${n}})$ ?`, `Quelle est l'espérance de la somme $S_{${n}}$ ?`])
      : pick([`Que vaut $V(S_{${n}})$ ?`, `Quelle est la variance de la somme $S_{${n}}$ ?`]);
    const rep = e ? n * mu : n * v;
    return res(`${poserX(s, mu, sigma, forme)} Sur un échantillon de $${n}$ ${s.lot} (relevés indépendants), on note $S_{${n}} = X_1 + \\dots + X_{${n}}$ le total obtenu. ${q}`, rep,
      e ? `$E(S_{${n}}) = ${n} \\times ${mu} = ${rep}$.` : `${varDe(sigma, forme)}, donc $V(S_{${n}}) = ${n} \\times ${v} = ${rep}$.`,
      e ? `$E(S_{${n}}) = ${rep}$.` : `$V(S_{${n}}) = ${rep}$.`,
      e ? "L'espérance d'une somme est la somme des espérances : $E(S_n) = nE(X)$." : "Les $X_i$ sont indépendantes : les variances s'ajoutent, $V(S_n) = nV(X)$ (et $V(M_n) = \\dfrac{V(S_n)}{n^2} = \\dfrac{V(X)}{n}$).");
  }
  if (sorte === "k") {
    const k = pick([2, 3, 4, 5, 10] as const);
    const q = pick([
      `Par combien faut-il multiplier la taille de l'échantillon pour diviser l'écart-type de $M_n$ par $${k}$ ?`,
      `On veut une moyenne $M_n$ dont l'écart-type est $${k}$ fois plus petit. Par quel nombre faut-il multiplier $n$ ?`,
      `Pour que $\\sigma(M_n)$ soit divisé par $${k}$, par combien multiplie-t-on le nombre de ${s.lot} ?`,
    ]);
    return res(`${poserX(s, mu, sigma, "s")} ${q}`, k * k,
      `$\\dfrac{\\sigma}{\\sqrt{${k * k}n}} = \\dfrac{\\sigma}{${k}\\sqrt{n}}$ : multiplier $n$ par $${k * k}$ divise l'écart-type par $\\sqrt{${k * k}} = ${k}$.`,
      `Il faut multiplier $n$ par $${k * k}$ (et non par $${k}$).`, "$\\sigma(M_n) = \\dfrac{\\sigma}{\\sqrt{n}}$ : l'écart-type décroît comme $\\dfrac{1}{\\sqrt{n}}$.");
  }
  if (sorte === "sigS") {
    const q = pick([`Quel est l'écart-type de $S_{${n2}}$ ?`, `Que vaut $\\sigma(S_{${n2}})$ ?`]);
    return res(`${poserX(s, mu, sigma, "s")} Sur $${n2}$ ${s.lot} (relevés indépendants), on note $S_{${n2}}$ le total des $${n2}$ valeurs. ${q}`, sigma * r,
      `$V(S_{${n2}}) = ${n2} \\times ${v} = ${n2 * v}$, donc $\\sigma(S_{${n2}}) = \\sqrt{${n2 * v}} = ${sigma} \\times ${r} = ${sigma * r}$.`,
      `$\\sigma(S_{${n2}}) = ${sigma * r}$.`, "Les variances s'ajoutent, pas les écarts-types : $\\sigma(S_n) = \\sigma\\sqrt{n}$.");
  }
  // qcmV : V(Mₙ) à partir de l'écart-type, avec les erreurs typiques.
  return qcmMoy(s, mu, sigma, n, tV);
}

/* ---------- concentration_inegalite_bienayme : P(|X − μ| ≥ δ) ≤ V(X)/δ² ---------- */
const DEF_BIEN = "Inégalité de Bienaymé-Tchebychev : pour tout $\\delta > 0$, $P(|X - \\mu| \\ge \\delta) \\le \\dfrac{V(X)}{\\delta^2}$.";

/** Un écart δ entier, plus petit que μ, qui rend V/δ² exact et utile (entre 0,01 et 0,5). */
function tirerDelta(mu: number, v: number): number | null {
  const cands = [2, 3, 4, 5, 6, 8, 10, 12, 15, 16, 20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 200, 250, 300];
  const ok = cands.filter((d) => d < mu && decimalExact(v, d * d) !== null && v / (d * d) <= 0.5 && v / (d * d) >= 0.01);
  return ok.length ? pick(ok) : null;
}

function genBien(star: 2 | 3 | 4 | 5): Q {
  let s = pick(SITUATIONS);
  let mu = pick(s.mus);
  let sigma = pick(s.sigmas);
  let d = tirerDelta(mu, sigma * sigma);
  while (d === null) {
    s = pick(SITUATIONS);
    mu = pick(s.mus);
    sigma = pick(s.sigmas);
    d = tirerDelta(mu, sigma * sigma);
  }
  const v = sigma * sigma;
  const maj = v / (d * d);
  const forme = star === 2 ? "v" : pick(["v", "s"] as const);
  const sorte = pick({ 2: ["maj", "maj"], 3: ["majI", "maj"], 4: ["min", "minI", "k"], 5: ["delta", "minAB"] }[star]);
  const intro = poserX(s, mu, sigma, forme);
  const calc = `${varDe(sigma, forme)} et $\\delta = ${d}$ : $\\dfrac{${v}}{${d}^2} = \\dfrac{${v}}{${d * d}} = ${fm(maj)}$`;
  const sh = (text: string, rep: number, methode: string, calcul: string, conclusion: string): Q => ({
    text, format: "short", expected: [fr(rep)], comparator: "number_equal", explanation: exp(DEF_BIEN, methode, calcul, conclusion),
  });

  if (sorte === "maj" || sorte === "majI") {
    const evt = sorte === "maj" ? `|X - ${mu}| \\ge ${d}` : `X \\le ${mu - d} \\text{ ou } X \\ge ${mu + d}`;
    const q = pick([
      `Quel majorant l'inégalité de Bienaymé-Tchebychev donne-t-elle pour $P(${evt})$ ?`,
      `D'après l'inégalité de Bienaymé-Tchebychev, $P(${evt})$ est au plus égale à quel nombre ?`,
      `Majore $P(${evt})$ à l'aide de l'inégalité de Bienaymé-Tchebychev.`,
    ]);
    return sh(`${intro} ${q}`, maj,
      sorte === "maj" ? `On repère $\\mu = ${mu}$ et $\\delta = ${d}$, puis on divise la variance par $\\delta^2$ (pas par $\\delta$).`
        : `« $X \\le ${mu - d}$ ou $X \\ge ${mu + d}$ » veut dire « $X$ s'écarte de $${mu}$ d'au moins $${d}$ » : c'est $|X - ${mu}| \\ge ${d}$.`,
      `${calc}.`, `$P(${evt}) \\le ${fm(maj)}$.`);
  }
  if (sorte === "min" || sorte === "minI") {
    const evt = sorte === "min" ? `|X - ${mu}| < ${d}` : `${mu - d} < X < ${mu + d}`;
    const q = pick([
      `Quel minorant l'inégalité de Bienaymé-Tchebychev donne-t-elle pour $P(${evt})$ ?`,
      `Montre que $P(${evt})$ est au moins égale à un nombre que tu donneras.`,
      `D'après Bienaymé-Tchebychev, $P(${evt})$ vaut au moins combien ?`,
    ]);
    return sh(`${intro} ${q}`, 1 - maj,
      `On passe à l'événement contraire : $P(|X - ${mu}| < ${d}) = 1 - P(|X - ${mu}| \\ge ${d}) \\ge 1 - \\dfrac{V(X)}{\\delta^2}$.`,
      `${calc}, puis $1 - ${fm(maj)} = ${fm(1 - maj)}$.`, `$P(${evt}) \\ge ${fm(1 - maj)}$.`);
  }
  if (sorte === "k") {
    const k = pick([2, 3, 4, 5, 10] as const);
    const q = pick([
      `Quel majorant Bienaymé-Tchebychev donne-t-il pour la probabilité que $X$ s'écarte de son espérance d'au moins $${k}$ écarts-types ?`,
      `Majore $P(|X - ${mu}| \\ge ${k * sigma})$, sachant que $${k * sigma} = ${k}\\sigma$.`,
    ]);
    const bon: [number, number] = [1, k * k];
    const t = (a: number, b: number) => (b === 1 ? `$${a}$` : `$\\dfrac{${a}}{${b}}$`);
    // Leurres : diviser par k, prendre le minorant 1 − 1/k², diviser par 2k².
    const choix = [t(1, k * k), t(1, k), t(k * k - 1, k * k), t(1, 2 * k * k)];
    return {
      text: `${poserX(s, mu, sigma, "s")} ${q}`, format: "qcm", choices: melange(choix), expected: [t(bon[0], bon[1])], comparator: "mcq_exact",
      explanation: exp(DEF_BIEN, "Avec $\\delta = k\\sigma$ : $\\dfrac{\\sigma^2}{(k\\sigma)^2} = \\dfrac{1}{k^2}$, quelle que soit la loi.",
        `$\\delta = ${k} \\times ${sigma} = ${k * sigma}$ ; $\\dfrac{${v}}{${k * sigma}^2} = \\dfrac{${v}}{${k * k * v}} = \\dfrac{1}{${k * k}}$.`,
        `La probabilité est au plus $\\dfrac{1}{${k * k}}$ (on divise par $k^2$, pas par $k$).`),
    };
  }
  if (sorte === "delta") {
    const q = pick([
      `Quel est le plus petit écart $\\delta > 0$ pour lequel Bienaymé-Tchebychev garantit $P(|X - ${mu}| \\ge \\delta) \\le ${fm(maj)}$ ?`,
      `Pour quelle valeur minimale de $\\delta$ la majoration $\\dfrac{V(X)}{\\delta^2} \\le ${fm(maj)}$ est-elle vraie ?`,
      `On veut $\\dfrac{V(X)}{\\delta^2} \\le ${fm(maj)}$. Donne la plus petite valeur positive de $\\delta$ qui convient.`,
    ]);
    return sh(`${intro} ${q}`, d, "On résout $\\dfrac{V(X)}{\\delta^2} \\le \\alpha$, c'est-à-dire $\\delta^2 \\ge \\dfrac{V(X)}{\\alpha}$.",
      `${varDe(sigma, forme)} ; $\\delta^2 \\ge \\dfrac{${v}}{${fm(maj)}} = ${d * d}$, donc $\\delta \\ge \\sqrt{${d * d}} = ${d}$.`, `$\\delta = ${d}$.`);
  }
  // minAB : l'intervalle est donné par ses bornes, il faut retrouver μ et δ.
  const q = pick([
    `Quel minorant l'inégalité de Bienaymé-Tchebychev donne-t-elle pour la probabilité que $X$ soit strictement entre $${mu - d}$ et $${mu + d}$ ?`,
    `Montre que $P(${mu - d} < X < ${mu + d})$ dépasse un nombre que tu donneras.`,
  ]);
  return sh(`${intro} ${q}`, 1 - maj,
    `L'intervalle $]${mu - d} \\,;\\, ${mu + d}[$ est centré en $\\dfrac{${mu - d} + ${mu + d}}{2} = ${mu}$, de demi-largeur $\\delta = ${d}$ : c'est $|X - ${mu}| < ${d}$, contraire de $|X - ${mu}| \\ge ${d}$.`,
    `${calc}, puis $1 - ${fm(maj)} = ${fm(1 - maj)}$.`, `$P(${mu - d} < X < ${mu + d}) \\ge ${fm(1 - maj)}$.`);
}

/* ---------- concentration_inegalite_concentration : P(|Mₙ − μ| ≥ δ) ≤ σ²/(nδ²) ---------- */
const DEF_CONC = "Inégalité de concentration : pour un échantillon de taille $n$, $P(|M_n - \\mu| \\ge \\delta) \\le \\dfrac{V(X)}{n\\delta^2}$.";
const TAILLES_C = [10, 20, 25, 40, 50, 80, 100, 125, 200, 250, 400, 500, 1000, 2000] as const;
const DIXIEMES = [1, 2, 3, 4, 5, 10, 15, 20, 30, 40, 50, 100] as const; // δ = d/10

function genConc(star: 3 | 4 | 5, defi = false): Q {
  // Tirage : n, δ = d/10 (au plus σ), majorant 100v/(n·d²) exact entre 0,01 et 0,5.
  let s = pick(SITUATIONS), mu = 0, sigma = 0, n = 0, d = 0, maj = 0;
  for (;;) {
    s = pick(SITUATIONS);
    mu = pick(s.mus);
    sigma = pick(s.sigmas);
    n = pick(TAILLES_C);
    d = pick(DIXIEMES);
    maj = (100 * sigma * sigma) / (n * d * d);
    if (d / 10 <= sigma && decimalExact(100 * sigma * sigma, n * d * d) !== null && maj >= 0.01 && maj <= 0.5) break;
  }
  const v = sigma * sigma;
  const delta = fm(d / 10);
  const delta2 = fm((d * d) / 100);
  const forme = pick(["v", "s"] as const);
  const sorte = pick({ 3: ["maj", "majI"], 4: ["min", "minI"], 5: ["nmin", "nmin", "minI"] }[star]);
  const lo = fm(mu - d / 10);
  const hi = fm(mu + d / 10);
  const calc = `${varDe(sigma, forme)}, $n = ${n}$, $\\delta = ${delta}$ : $\\dfrac{${v}}{${n} \\times ${delta}^2} = \\dfrac{${v}}{${n} \\times ${delta2}} = ${fm(maj)}$`;
  const ouvre = defi ? `${pick(["Exercice type bac.", "Extrait de sujet de bac.", "Problème."])} ` : "";
  const sh = (text: string, rep: number, methode: string, calcul: string, conclusion: string): Q => ({
    text: ouvre + text, format: "short", expected: [fr(rep)], comparator: "number_equal", explanation: exp(DEF_CONC, methode, calcul, conclusion),
  });

  if (sorte === "maj" || sorte === "majI") {
    const evt = sorte === "maj" ? `|M_{${n}} - ${mu}| \\ge ${delta}` : `M_{${n}} \\le ${lo} \\text{ ou } M_{${n}} \\ge ${hi}`;
    const q = pick([
      `Quel majorant l'inégalité de concentration donne-t-elle pour $P(${evt})$ ?`,
      `D'après l'inégalité de concentration, $P(${evt})$ est au plus égale à quel nombre ?`,
      `Majore la probabilité $P(${evt})$.`,
    ]);
    return sh(`${poserX(s, mu, sigma, forme)} ${poserEchantillon(s, n)} ${q}`, maj,
      sorte === "maj" ? "On remplace dans la formule, en élevant $\\delta$ au carré et en multipliant par $n$."
        : `« $M_{${n}} \\le ${lo}$ ou $M_{${n}} \\ge ${hi}$ » s'écrit $|M_{${n}} - ${mu}| \\ge ${delta}$.`,
      `${calc}.`, `$P(${evt}) \\le ${fm(maj)}$.`);
  }
  if (sorte === "min" || sorte === "minI") {
    const evt = sorte === "min" ? `|M_{${n}} - ${mu}| < ${delta}` : `${lo} < M_{${n}} < ${hi}`;
    const q = pick([
      `Quel minorant l'inégalité de concentration donne-t-elle pour $P(${evt})$ ?`,
      `Montre que $P(${evt})$ est au moins égale à un nombre que tu donneras.`,
      `Avec l'inégalité de concentration, $P(${evt})$ vaut au moins combien ?`,
    ]);
    return sh(`${poserX(s, mu, sigma, forme)} ${poserEchantillon(s, n)} ${q}`, 1 - maj,
      `On passe à l'événement contraire : $P(|M_n - \\mu| < \\delta) \\ge 1 - \\dfrac{V(X)}{n\\delta^2}$${sorte === "minI" ? ` ; ici l'intervalle est centré en $${mu}$, de demi-largeur $${delta}$` : ""}.`,
      `${calc}, puis $1 - ${fm(maj)} = ${fm(1 - maj)}$.`, `$P(${evt}) \\ge ${fm(1 - maj)}$.`);
  }
  // nmin : la plus petite taille qui garantit P(|Mₙ − μ| ≥ δ) ≤ α.
  const a = pick([1, 2, 4, 5, 10, 20, 25] as const);
  const alpha = fm(a / 100);
  const borne = (10000 * v) / (a * d * d);
  const nmin = Math.max(2, Math.floor((10000 * v + a * d * d - 1) / (a * d * d)));
  if (nmin > 200000) return genConc(star, defi);
  const q = pick([
    `Quelle taille minimale $n$ d'échantillon l'inégalité de concentration garantit-elle pour avoir $P(|M_n - ${mu}| \\ge ${delta}) \\le ${alpha}$ ?`,
    `Combien ${deN(s.lot.split(" ")[0])} faut-il au minimum pour que la moyenne $M_n$ soit à moins de $${delta}$ de $${mu}$ avec une probabilité d'au moins $${fm(1 - a / 100)}$, d'après l'inégalité de concentration ?`,
    `Détermine le plus petit entier $n$ tel que $\\dfrac{V(X)}{n \\times ${delta}^2} \\le ${alpha}$.`,
  ]);
  return sh(`${poserX(s, mu, sigma, forme)} On note $M_n$ la moyenne d'un échantillon de taille $n$ de la loi de $X$. ${q}`, nmin,
    "On résout $\\dfrac{V(X)}{n\\delta^2} \\le \\alpha$, c'est-à-dire $n \\ge \\dfrac{V(X)}{\\alpha\\,\\delta^2}$, puis on prend le premier entier.",
    `${varDe(sigma, forme)} ; $n \\ge \\dfrac{${v}}{${alpha} \\times ${delta2}} ${net(borne) ? "=" : "\\approx"} ${fm(borne)}$.`,
    `La plus petite taille est $n = ${nmin}$.`);
}

/* ---------- concentration_loi_grands_nombres : Mₙ se rapproche de μ ---------- */
const DEF_LGN = "Loi des grands nombres : pour tout $\\delta > 0$, $P(|M_n - \\mu| \\ge \\delta) \\to 0$ quand $n \\to +\\infty$ ; la moyenne observée se rapproche de l'espérance $\\mu$.";
const PRENOMS_T = ["Léa", "Noah", "Inès", "Kylian", "Maëlys", "Ethan", "Anaïs", "Teddy", "Chloé", "Mathis", "Jade", "Yanis"] as const;
const DES = [
  { nom: "un dé cubique équilibré", k: 6 },
  { nom: "un dé tétraédrique équilibré (faces 1 à 4)", k: 4 },
  { nom: "un dé octaédrique équilibré (faces 1 à 8)", k: 8 },
  { nom: "un dé équilibré à 10 faces numérotées de 1 à 10", k: 10 },
  { nom: "un dé équilibré à 12 faces numérotées de 1 à 12", k: 12 },
  { nom: "un dé de jeu de rôle à 20 faces, équilibré", k: 20 },
] as const;
const OCCASIONS = [
  "pendant une partie de petits chevaux", "au club de jeux de société du lycée", "pendant une veillée au gîte de Cilaos",
  "en attendant le car jaune", "pour tester un nouveau jeu de plateau", "pendant la pause méridienne",
] as const;
const STANDS = [
  "la roue de la fortune de la kermesse du lycée", "le stand de pêche aux canards de la fête de l'école", "le jeu de fléchettes de la fête foraine du Port",
  "le chamboule-tout de la kermesse de Saint-André", "le ticket à gratter du club de foot de Saint-Louis", "le jeu de dés du club de jeux de société",
  "la loterie du marché forain de Saint-Paul", "le jeu de palets de la fête de quartier", "le jeu de quilles de la kermesse de Cilaos",
] as const;

function genLgn(star: 2 | 3 | 4 | 5): Q {
  const sorte = pick({ 2: ["de", "de2"], 3: ["gain2", "concept"], 4: ["gain3", "gain3", "freq"], 5: ["total", "total", "total", "concept5"] }[star]);
  const qui = pick(PRENOMS_T);
  const sh = (text: string, rep: number, methode: string, calcul: string, conclusion: string): Q => ({
    text, format: "short", expected: [fr(rep)], comparator: "number_equal", explanation: exp(DEF_LGN, methode, calcul, conclusion),
  });
  if (sorte === "de" || sorte === "de2" || sorte === "freq") {
    const de = pick(DES);
    const fois = pick(["un très grand nombre de fois", "des milliers de fois", "$n$ fois, avec $n$ très grand"]);
    const occ = pick(OCCASIONS);
    if (sorte === "freq") {
      const m = ri(2, de.k - 1);
      const g = (a: number, b: number) => { let x = a, y = b; while (y) [x, y] = [y, x % y]; return x; };
      const t = (a: number, b: number) => { const c = g(a, b); return b / c === 1 ? `$${a / c}$` : `$\\dfrac{${a / c}}{${b / c}}$`; };
      const bon = de.k - m + 1;
      const vals: [number, number][] = [[bon, de.k], [de.k - m, de.k], [1, de.k], [m, de.k], [bon, de.k + 1]];
      const pris: [number, number][] = [];
      for (const f of vals) if (pris.length < 4 && f[0] > 0 && !pris.some((p) => p[0] * f[1] === f[0] * p[1])) pris.push(f);
      return {
        text: `${qui} lance ${de.nom} ${fois} ${occ}. Vers quelle valeur la fréquence des lancers donnant au moins $${m}$ se rapproche-t-elle ?`,
        format: "qcm", choices: melange(pris.map((f) => t(f[0], f[1]))), expected: [t(bon, de.k)], comparator: "mcq_exact",
        explanation: exp(DEF_LGN, "La fréquence d'un événement est la moyenne de variables de Bernoulli : elle se rapproche de sa probabilité.",
          `Les faces $${m}$ à $${de.k}$ sont au nombre de $${de.k} - ${m} + 1 = ${bon}$ sur $${de.k}$ : $p = \\dfrac{${bon}}{${de.k}}$ ⚠️ « au moins » inclut $${m}$.`,
          `La fréquence se rapproche de ${t(bon, de.k)}.`),
      };
    }
    const deux = sorte === "de2";
    const mu = deux ? de.k + 1 : (de.k + 1) / 2;
    const q = deux
      ? pick([`${qui} lance deux fois ${de.nom} note la somme, puis recommence ${fois} ${occ}. Vers quelle valeur la moyenne des sommes obtenues se rapproche-t-elle ?`,
        `${occ.charAt(0).toUpperCase() + occ.slice(1)}, ${qui} répète ${fois} l'expérience suivante : lancer deux fois ${de.nom} et additionner les deux résultats. Autour de quelle valeur la moyenne des sommes se stabilise-t-elle ?`])
      : pick([`${qui} lance ${de.nom} ${fois} ${occ}. Vers quelle valeur la moyenne des résultats obtenus se rapproche-t-elle ?`,
        `${occ.charAt(0).toUpperCase() + occ.slice(1)}, ${qui} lance ${de.nom} ${fois} et calcule la moyenne $M_n$ des faces obtenues. Vers quel nombre $M_n$ se rapproche-t-elle ?`]);
    return sh(q, mu, "On calcule l'espérance d'un lancer : c'est la valeur dont la moyenne se rapproche.",
      deux ? `Un lancer : $E = \\dfrac{1 + ${de.k}}{2} = ${fm((de.k + 1) / 2)}$ ; la somme de deux lancers : $E = 2 \\times ${fm((de.k + 1) / 2)} = ${mu}$.`
        : `$E(X) = \\dfrac{1 + 2 + \\dots + ${de.k}}{${de.k}} = \\dfrac{1 + ${de.k}}{2} = ${fm(mu)}$.`,
      `La moyenne se rapproche de $${fm(mu)}$ (même si ce résultat n'est pas une face possible).`);
  }
  // Les stands : un gain net X = gain − mise.
  const stand = pick(STANDS);
  const c = pick([1, 2, 3, 5] as const);
  let p1 = 0, p2 = 0, g1 = 0, g2 = 0, brut = 0;
  do {
    p1 = pick([5, 10, 15, 20, 25] as const); // en centièmes
    p2 = sorte === "gain2" || sorte === "concept" ? 0 : pick([10, 20, 25, 30, 40] as const);
    g1 = pick([5, 10, 15, 20, 50] as const);
    g2 = pick([2, 3, 4] as const);
    brut = (p1 * g1 + p2 * g2) / 100;
  } while (((sorte === "total" || sorte === "concept5") && brut >= c) || Math.abs(brut - c) < 1e-9 || Math.abs(brut - c - 1) < 1e-9);
  const E = brut - c;
  const loi = p2 === 0
    ? `on gagne $${g1}$ € avec une probabilité $${fm(p1 / 100)}$, et rien sinon`
    : `on gagne $${g1}$ € avec une probabilité $${fm(p1 / 100)}$, $${g2}$ € avec une probabilité $${fm(p2 / 100)}$, et rien sinon`;
  const aStand = stand.startsWith("le ") ? `au ${stand.slice(3)}` : `à ${stand}`;
  const intro = `${aStand.charAt(0).toUpperCase() + aStand.slice(1)}, une partie coûte $${c}$ € ; ${loi}. On note $X$ le gain net d'une partie (gain moins mise).`;
  const calcE = `$E(X) = ${p2 ? `${fm(p1 / 100)} \\times ${g1} + ${fm(p2 / 100)} \\times ${g2}` : `${fm(p1 / 100)} \\times ${g1}`} - ${c} = ${fm(brut)} - ${c} = ${fm(E)}$`;
  if (sorte === "concept" || sorte === "concept5") {
    const choix = ["elle tend vers $0$", "elle tend vers $1$", "elle reste égale à $\\dfrac{V(X)}{\\delta^2}$", `elle tend vers $${fm(E)}$`];
    const q = pick([`On note $M_n$ le gain net moyen sur $n$ parties et $\\mu = E(X)$. Que devient $P(|M_n - \\mu| \\ge 0{,}1)$ quand $n$ tend vers $+\\infty$ ?`,
      `$M_n$ est le gain net moyen sur $n$ parties. Quand $n$ devient très grand, que devient la probabilité que $M_n$ s'écarte de $E(X)$ d'au moins $0{,}1$ ?`]);
    return {
      text: `${intro} ${q}`, format: "qcm", choices: melange(choix), expected: ["elle tend vers $0$"], comparator: "mcq_exact",
      explanation: exp(DEF_LGN, "On reconnaît l'espérance du gain net, puis on applique la loi des grands nombres.", `${calcE} : c'est $\\mu$.`,
        "La probabilité d'un écart d'au moins $0{,}1$ tend vers $0$ : le gain moyen se rapproche de $E(X)$."),
    };
  }
  if (sorte === "total") {
    const N = pick([200, 300, 500, 1000, 2000] as const);
    const q = pick([`L'association prévoit $${N}$ parties. D'après la loi des grands nombres, quel bénéfice total, en euros, peut-elle espérer à peu près ?`,
      `Sur $${N}$ parties dans la journée, combien d'euros le stand rapporte-t-il environ à l'organisateur, d'après la loi des grands nombres ?`,
      `Pour l'association, ${qui} prévoit $${N}$ parties dans la journée. Quel bénéfice, en euros, peut-on attendre à peu près ?`,
      `${qui} tient le stand et compte sur $${N}$ parties. D'après la loi des grands nombres, combien d'euros la caisse devrait-elle gagner environ ?`]);
    return sh(`${intro} ${q}`, -N * E, "Le gain moyen d'un joueur se rapproche de $E(X)$ ; ce que perdent les joueurs, l'organisateur le gagne.",
      `${calcE} ; l'organisateur gagne en moyenne $${fm(-E)}$ € par partie, soit $${N} \\times ${fm(-E)} = ${fm(-N * E)}$ €.`,
      `Bénéfice espéré : environ $${fm(-N * E)}$ €.`);
  }
  const q = pick([`D'après la loi des grands nombres, vers quelle valeur le gain net moyen par partie se rapproche-t-il après un très grand nombre de parties ?`,
    `${qui} joue des centaines de parties. Autour de quelle valeur son gain net moyen par partie se stabilise-t-il ?`,
    `On note $M_n$ le gain net moyen sur $n$ parties. Vers quel nombre $M_n$ se rapproche-t-il quand $n$ devient grand ?`]);
  return sh(`${intro} ${q}`, E, "Le gain moyen se rapproche de l'espérance $E(X)$ ; on n'oublie pas de retirer la mise.",
    `${calcE}.`, `Le gain net moyen se rapproche de $${fm(E)}$ €${E < 0 ? " : à la longue, le joueur perd de l'argent" : ""}.`);
}

/* ---------- concentration_fluctuation : Fₙ, E(Fₙ) = p, V(Fₙ) = p(1 − p)/n ---------- */
const DEF_FLUC = "$F_n$ est la moyenne de $n$ variables de Bernoulli de paramètre $p$ : $E(F_n) = p$, $V(F_n) = \\dfrac{p(1-p)}{n}$ et $P(|F_n - p| \\ge \\delta) \\le \\dfrac{p(1-p)}{n\\delta^2}$.";
const BERNOULLI = [
  { essai: "un letchi d'une barquette du marché", evt: "il est véreux" },
  { essai: "une graine de vanille plantée", evt: "elle germe" },
  { essai: "un passager du car jaune", evt: "il a un abonnement" },
  { essai: "un tir au but d'une joueuse du club de Saint-Louis", evt: "il est réussi" },
  { essai: "un lancer d'une pièce truquée", evt: "elle tombe sur pile" },
  { essai: "un élève du lycée", evt: "il vient en bus" },
  { essai: "un jour de juillet à Cilaos", evt: "il pleut" },
  { essai: "un randonneur du Piton de la Fournaise", evt: "il monte jusqu'au cratère Dolomieu" },
  { essai: "un appel au standard d'une mairie", evt: "il aboutit du premier coup" },
  { essai: "un ananas Victoria de la récolte", evt: "il pèse plus d'un kilogramme" },
  { essai: "un bonbon tiré d'un grand sachet", evt: "il est à la fraise" },
  { essai: "un billet de la tombola de la kermesse", evt: "il est gagnant" },
  { essai: "une bouteille sortant de la chaîne d'embouteillage", evt: "elle est mal remplie" },
  { essai: "un lancer au jeu de fléchettes", evt: "il touche le centre" },
  { essai: "un spectateur du festival Sakifo", evt: "il vient du Sud de l'île" },
  { essai: "un vol Paris – Saint-Denis", evt: "il arrive à l'heure" },
  { essai: "un samoussa du pique-nique", evt: "il est au poulet" },
  { essai: "une ampoule d'un lot", evt: "elle est défectueuse" },
  { essai: "un surfeur de Saint-Leu interrogé", evt: "il surfe depuis plus de cinq ans" },
  { essai: "une partie de petits chevaux", evt: "elle dure plus d'une heure" },
] as const;

function genFluc(star: 2 | 3 | 4 | 5, defi = false): Q {
  const b = pick(BERNOULLI);
  const sorte = pick({ 2: ["E", "V", "V"], 3: ["maj", "maj"], 4: ["min", "quart"], 5: ["nmin", "nminQ"] }[star]);
  // p = q/100, δ = d/100 : le majorant vaut q(100 − q) / (n·d²) — calcul entier.
  let q = 0, n = 0, d = 0, maj = 0;
  for (;;) {
    q = pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 65, 70, 75, 80, 85, 90, 95] as const);
    n = pick([50, 100, 200, 250, 400, 500, 1000, 2000, 2500, 5000] as const);
    d = pick([2, 4, 5, 10, 20] as const);
    const num = sorte === "quart" ? 2500 : q * (100 - q);
    maj = num / (n * d * d);
    if (sorte === "E" || sorte === "V" || sorte === "nmin" || sorte === "nminQ") break;
    if (decimalExact(num, n * d * d) !== null && maj >= 0.01 && maj <= 0.5) break;
  }
  const p = fm(q / 100);
  const pq = fm((q * (100 - q)) / 10000);
  const delta = fm(d / 100);
  const pose = pick([
    `Pour ${b.essai}, la probabilité de l'événement « ${b.evt} » vaut $p = ${p}$.`,
    `On admet que, pour ${b.essai}, l'événement « ${b.evt} » a pour probabilité $p = ${p}$.`,
    `Une étude indique que, pour ${b.essai}, l'événement « ${b.evt} » se produit avec une probabilité $${p}$.`,
  ]);
  const ech = (k: number) => pick([
    `On observe $${k}$ cas indépendants et on note $F_{${k}}$ la fréquence des cas où ${b.evt}.`,
    `Sur un échantillon de $${k}$ cas indépendants, $F_{${k}}$ désigne la fréquence observée de l'événement « ${b.evt} ».`,
  ]);
  const ouvre = defi ? `${pick(["Exercice type bac.", "Sondage.", "Contrôle qualité.", "Étude statistique."])} ` : "";
  const sh = (text: string, rep: number, methode: string, calcul: string, conclusion: string): Q => ({
    text: ouvre + text, format: "short", expected: [fr(rep)], comparator: "number_equal", explanation: exp(DEF_FLUC, methode, calcul, conclusion),
  });
  if (sorte === "E" || sorte === "V") {
    const e = sorte === "E";
    const k = e ? n : pick([10, 20, 25, 40, 50, 100, 200, 250] as const);
    // V(Fₙ) doit tomber juste à 4 décimales au plus : sinon on retire.
    if (!e && decimalExact(q * (100 - q), 10000 * k) === null) return genFluc(star, defi);
    const v = (q * (100 - q)) / (10000 * k);
    return sh(`${pose} ${ech(k)} ${e ? pick([`Que vaut $E(F_{${k}})$ ?`, `Quelle est l'espérance de $F_{${k}}$ ?`]) : pick([`Que vaut $V(F_{${k}})$ ?`, `Quelle est la variance de $F_{${k}}$ ?`])}`,
      e ? q / 100 : v, e ? "L'espérance de la fréquence est la probabilité $p$ : elle ne dépend pas de $n$." : "On calcule $p(1-p)$, puis on divise par $n$.",
      e ? `$E(F_{${k}}) = p = ${p}$.` : `$p(1-p) = ${p} \\times ${fm(1 - q / 100)} = ${pq}$, puis $\\dfrac{${pq}}{${k}} = ${fm(v)}$.`,
      e ? `$E(F_{${k}}) = ${p}$.` : `$V(F_{${k}}) = ${fm(v)}$.`);
  }
  if (sorte === "maj" || sorte === "min") {
    const m = sorte === "maj";
    const evt = m ? `|F_{${n}} - ${p}| \\ge ${delta}` : `|F_{${n}} - ${p}| < ${delta}`;
    const qq = m
      ? pick([`Quel majorant l'inégalité de concentration donne-t-elle pour $P(${evt})$ ?`, `Majore la probabilité que la fréquence s'écarte de $${p}$ d'au moins $${delta}$.`])
      : pick([`Quel minorant l'inégalité de concentration donne-t-elle pour $P(${evt})$ ?`, `Avec quelle probabilité minimale la fréquence est-elle à moins de $${delta}$ de $${p}$, d'après l'inégalité de concentration ?`]);
    return sh(`${pose} ${ech(n)} ${qq}`, m ? maj : 1 - maj,
      m ? "On applique l'inégalité de concentration avec $\\sigma^2 = p(1-p)$." : "On passe à l'événement contraire : $P(|F_n - p| < \\delta) \\ge 1 - \\dfrac{p(1-p)}{n\\delta^2}$.",
      `$p(1-p) = ${pq}$ ; $\\dfrac{${pq}}{${n} \\times ${delta}^2} = ${fm(maj)}$${m ? "" : `, puis $1 - ${fm(maj)} = ${fm(1 - maj)}$`}.`,
      m ? `$P(${evt}) \\le ${fm(maj)}$.` : `$P(${evt}) \\ge ${fm(1 - maj)}$.`);
  }
  if (sorte === "quart") {
    return sh(`On ne connaît pas la probabilité $p$ de l'événement « ${b.evt} », pour ${b.essai}. ${ech(n)} Sachant que $p(1-p) \\le 0{,}25$ pour tout $p$, quel majorant obtient-on pour $P(|F_{${n}} - p| \\ge ${delta})$ ?`, maj,
      "Comme $p$ est inconnu, on majore $p(1-p)$ par $\\dfrac{1}{4}$ (son maximum, atteint en $p = 0{,}5$).",
      `$\\dfrac{0{,}25}{${n} \\times ${delta}^2} = ${fm(maj)}$.`, `$P(|F_{${n}} - p| \\ge ${delta}) \\le ${fm(maj)}$, quelle que soit $p$.`);
  }
  // nmin / nminQ : taille minimale pour P(|Fₙ − p| ≥ δ) ≤ α.
  const a = pick([1, 2, 5, 10, 20] as const);
  const alpha = fm(a / 100);
  const num = sorte === "nminQ" ? 2500 : q * (100 - q); // p(1−p) en dix-millièmes
  // n ≥ p(1−p)/(α δ²) = (num/10⁴) / ((a/100)(d²/10⁴)) = 100·num/(a·d²)
  const den = a * d * d;
  const nmin = Math.floor((100 * num + den - 1) / den);
  const borne = (100 * num) / den;
  const qq = sorte === "nminQ"
    ? `On ne connaît pas $p$ ; on utilise $p(1-p) \\le 0{,}25$. Quelle taille minimale $n$ garantit $P(|F_n - p| \\ge ${delta}) \\le ${alpha}$ ?`
    : pick([`Quelle taille minimale $n$ d'échantillon garantit, d'après l'inégalité de concentration, $P(|F_n - ${p}| \\ge ${delta}) \\le ${alpha}$ ?`,
      `Combien de cas faut-il observer au minimum pour que la fréquence soit à moins de $${delta}$ de $${p}$ avec une probabilité d'au moins $${fm(1 - a / 100)}$ ?`]);
  const poseQ = pick([
    `On veut estimer la probabilité $p$ de l'événement « ${b.evt} », pour ${b.essai}.`,
    `Pour ${b.essai}, la probabilité $p$ de l'événement « ${b.evt} » est inconnue : on veut l'estimer.`,
    `Un enquêteur cherche à estimer $p$, la probabilité de l'événement « ${b.evt} » pour ${b.essai}.`,
  ]);
  return sh(`${sorte === "nminQ" ? poseQ : pose} On note $F_n$ la fréquence observée sur $n$ cas indépendants. ${qq}`, nmin,
    "On résout $\\dfrac{p(1-p)}{n\\delta^2} \\le \\alpha$, soit $n \\ge \\dfrac{p(1-p)}{\\alpha\\,\\delta^2}$, et on prend le premier entier.",
    `$n \\ge \\dfrac{${sorte === "nminQ" ? "0{,}25" : pq}}{${alpha} \\times ${delta}^2} ${net(borne) ? "=" : "\\approx"} ${fm(borne)}$.`,
    `La plus petite taille est $n = ${nmin}$.`);
}

/* ---------- concentration_defi : exercices type bac ---------- */
/** Faire varier n ou δ : comment la taille doit-elle changer ? */
function genEchelle(): Q {
  const s = pick(SITUATIONS);
  const mu = pick(s.mus);
  const sigma = pick(s.sigmas);
  const n = pick([20, 25, 40, 50, 100, 200, 500] as const);
  const surDelta = Math.random() < 0.5;
  const j = surDelta ? pick([2, 3, 4, 5] as const) : pick([2, 3, 4, 5, 10] as const);
  const rep = surDelta ? n * j * j : n * j;
  const q = surDelta
    ? pick([`On veut garder le même majorant mais avec un écart $\\delta$ ${j === 2 ? "deux" : j === 3 ? "trois" : j === 4 ? "quatre" : "cinq"} fois plus petit. Quelle taille d'échantillon faut-il alors ?`,
      `Si l'on divise $\\delta$ par $${j}$, quelle taille $n$ redonne le même majorant $\\dfrac{V(X)}{n\\delta^2}$ ?`])
    : pick([`On veut, pour le même $\\delta$, un majorant $${j}$ fois plus petit. Quelle taille d'échantillon faut-il ?`,
      `Quelle taille d'échantillon divise par $${j}$ le majorant de l'inégalité de concentration, $\\delta$ restant le même ?`]);
  return {
    text: `${pick(["Exercice type bac.", "Problème.", "Étude statistique."])} ${poserX(s, mu, sigma, "s")} Avec un échantillon de taille $${n}$, on a majoré $P(|M_{${n}} - ${mu}| \\ge \\delta)$ par l'inégalité de concentration. ${q}`,
    format: "short",
    expected: [String(rep)],
    comparator: "number_equal",
    explanation: exp(DEF_CONC,
      surDelta ? "$\\delta$ est au carré dans le dénominateur : diviser $\\delta$ par $j$ multiplie le majorant par $j^2$ ; il faut compenser en multipliant $n$ par $j^2$."
        : "Le majorant $\\dfrac{V(X)}{n\\delta^2}$ est inversement proportionnel à $n$.",
      surDelta ? `$\\dfrac{V(X)}{n'(\\delta/${j})^2} = \\dfrac{${j * j}\\,V(X)}{n'\\delta^2}$ : il faut $n' = ${j * j} \\times ${n} = ${rep}$.`
        : `Pour diviser le majorant par $${j}$, on multiplie $n$ par $${j}$ : $${j} \\times ${n} = ${rep}$.`,
      `Il faut un échantillon de taille $${rep}$.`),
  };
}

function genDefi(star: 4 | 5): Q {
  const r = Math.random();
  if (star === 5 && r < 0.34) return genEchelle();
  return r < 0.67 ? genConc(star, true) : genFluc(star, true);
}

function qcmMoy(s: Sit, mu: number, sigma: number, n: number, tV: number): Q {
  const v = sigma * sigma;
  const q = pick([`Que vaut $V(M_{${n}})$ ?`, `Quelle est la variance de $M_{${n}}$ ?`, `Parmi ces valeurs, laquelle est $V(M_{${n}})$ ?`]);
  return {
    text: `${poserX(s, mu, sigma, "s")} ${poserEchantillon(s, n)} ${q}`,
    format: "qcm",
    ...qcmVal(tV, [sigma / n, v, v / (n * n), n * v, sigma / Math.sqrt(n)]),
    comparator: "mcq_exact",
    explanation: exp(DEF_MOY, "⚠️ L'énoncé donne l'écart-type : on l'élève au carré AVANT de diviser par $n$.",
      `$V(X) = ${sigma}^2 = ${v}$, donc $V(M_{${n}}) = \\dfrac{${v}}{${n}} = ${fm(tV)}$.`, `$V(M_{${n}}) = ${fm(tV)}$.`),
  };
}

export const concentrationBank: TutorBankItemV4[] = [
  /* =========================================================
     CONCENTRATION_ECHANTILLON_MOYENNE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_conc_moy_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_echantillon_moyenne",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $M_n$ la moyenne d'un échantillon de $n$ variables identiques d'espérance $\\mu$. Que vaut $E(M_n)$ ?",
    format: "qcm",
    choices: ["$\\mu$", "$\\dfrac{\\mu}{n}$", "$n\\mu$", "$\\mu^2$"],
    expected: ["$\\mu$"],
    comparator: "mcq_exact",
    hint: "La moyenne d'échantillon a la même espérance que chaque variable.",
    explanation: exp(
      "L'espérance de la moyenne d'échantillon se conserve.",
      "On utilise $E(M_n) = \\mu$.",
      "$E(M_n) = \\mu$, l'espérance commune.",
      "$E(M_n) = \\mu$."
    ),
    tags: ["terminale-spe", "concentration", "echantillon", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_moy_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_echantillon_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Avec les mêmes notations (variance commune $\\sigma^2$), que vaut $V(M_n)$ ?",
    format: "qcm",
    choices: ["$\\dfrac{\\sigma^2}{n}$", "$\\sigma^2$", "$n\\sigma^2$", "$\\dfrac{\\sigma}{n}$"],
    expected: ["$\\dfrac{\\sigma^2}{n}$"],
    comparator: "mcq_exact",
    hint: "La variance de la moyenne diminue avec $n$.",
    explanation: exp(
      "La variance de la moyenne d'échantillon décroît avec la taille.",
      "On utilise $V(M_n) = \\dfrac{\\sigma^2}{n}$.",
      "$V(M_n) = \\dfrac{\\sigma^2}{n}$.",
      "$V(M_n) = \\dfrac{\\sigma^2}{n}$."
    ),
    tags: ["terminale-spe", "concentration", "echantillon", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_moy_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_echantillon_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Si $\\sigma^2 = 9$ et $n = 9$, que vaut $V(M_n)$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "$V(M_n) = \\dfrac{9}{9}$.",
    explanation: exp(
      "On applique $V(M_n) = \\dfrac{\\sigma^2}{n}$.",
      "$V(M_n) = \\dfrac{9}{9}$.",
      "$= 1$.",
      "$V(M_n) = 1$."
    ),
    tags: ["terminale-spe", "concentration", "echantillon", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_moy_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_echantillon_moyenne",
    difficulty: 4,
    theme: "neutral",
    text: "Si $\\sigma^2 = 8$ et $n = 2$, que vaut $V(M_n)$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$\\dfrac{8}{2}$.",
    explanation: exp(
      "On applique $V(M_n) = \\dfrac{\\sigma^2}{n}$.",
      "$V(M_n) = \\dfrac{8}{2}$.",
      "$= 4$.",
      "$V(M_n) = 4$."
    ),
    tags: ["terminale-spe", "concentration", "echantillon", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_moy_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_echantillon_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Quand la taille $n$ de l'échantillon augmente, la variance $V(M_n)$ :",
    format: "qcm",
    choices: ["diminue", "augmente", "reste constante", "devient négative"],
    expected: ["diminue"],
    comparator: "mcq_exact",
    hint: "$V(M_n) = \\dfrac{\\sigma^2}{n}$ : $n$ est au dénominateur.",
    explanation: exp(
      "On observe la dépendance en $n$ de $V(M_n)$.",
      "$V(M_n) = \\dfrac{\\sigma^2}{n}$ : plus $n$ grandit, plus le quotient est petit.",
      "Donc $V(M_n)$ diminue.",
      "La variance $V(M_n)$ diminue."
    ),
    tags: ["terminale-spe", "concentration", "echantillon", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_moy_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_echantillon_moyenne",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut l'écart-type $\\sigma(M_n)$ de la moyenne d'échantillon ?",
    format: "qcm",
    choices: ["$\\dfrac{\\sigma}{\\sqrt{n}}$", "$\\dfrac{\\sigma}{n}$", "$\\sigma\\sqrt{n}$", "$\\sigma^2 n$"],
    expected: ["$\\dfrac{\\sigma}{\\sqrt{n}}$"],
    comparator: "mcq_exact",
    hint: "$\\sigma(M_n) = \\sqrt{V(M_n)} = \\sqrt{\\sigma^2/n}$.",
    explanation: exp(
      "L'écart-type est la racine de la variance.",
      "$\\sigma(M_n) = \\sqrt{\\dfrac{\\sigma^2}{n}}$.",
      "$= \\dfrac{\\sigma}{\\sqrt{n}}$.",
      "$\\sigma(M_n) = \\dfrac{\\sigma}{\\sqrt{n}}$."
    ),
    tags: ["terminale-spe", "concentration", "echantillon", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_moy_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_echantillon_moyenne",
    difficulty: 4,
    theme: "neutral",
    text: "Si $\\sigma^2 = 4$ et $n = 100$, que vaut $V(M_n)$ ?",
    format: "qcm",
    choices: ["$0{,}04$", "$0{,}4$", "$4$", "$25$"],
    expected: ["$0{,}04$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{4}{100}$.",
    explanation: exp(
      "On applique $V(M_n) = \\dfrac{\\sigma^2}{n}$.",
      "$V(M_n) = \\dfrac{4}{100}$.",
      "$= 0{,}04$.",
      "$V(M_n) = 0{,}04$."
    ),
    tags: ["terminale-spe", "concentration", "echantillon", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_moy_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_echantillon_moyenne",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi $E(M_n) = \\mu$ ne dépend-il pas de $n$, alors que $V(M_n)$ en dépend ?",
    format: "qcm",
    choices: [
      "la moyenne reste centrée sur $\\mu$, mais se concentre quand $n$ grandit",
      "car $\\mu$ change avec $n$",
      "car la variance est toujours nulle",
      "c'est une erreur, les deux dépendent de $n$",
    ],
    expected: ["la moyenne reste centrée sur $\\mu$, mais se concentre quand $n$ grandit"],
    comparator: "mcq_exact",
    hint: "L'espérance = centre ; la variance = dispersion.",
    explanation: exp(
      "L'espérance situe le centre, la variance mesure la dispersion.",
      "$M_n$ reste centrée sur $\\mu$ (espérance constante).",
      "Mais sa dispersion $V(M_n) = \\sigma^2/n$ diminue : elle se concentre autour de $\\mu$.",
      "$M_n$ reste centrée sur $\\mu$ et se concentre quand $n$ grandit."
    ),
    tags: ["terminale-spe", "concentration", "echantillon", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_moy_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_echantillon_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Si $\\sigma^2 = 12$ et $n = 3$, que vaut $V(M_n)$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$\\dfrac{12}{3}$.",
    explanation: exp(
      "On applique $V(M_n) = \\dfrac{\\sigma^2}{n}$.",
      "$V(M_n) = \\dfrac{12}{3}$.",
      "$= 4$.",
      "$V(M_n) = 4$."
    ),
    tags: ["terminale-spe", "concentration", "echantillon", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_moy_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_echantillon_moyenne",
    difficulty: 4,
    theme: "neutral",
    text: "Un échantillon de $n = 25$ variables de variance $\\sigma^2 = 5$. Que vaut $V(M_n)$ ?",
    format: "qcm",
    choices: ["$0{,}2$", "$5$", "$125$", "$0{,}04$"],
    expected: ["$0{,}2$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{5}{25}$.",
    explanation: exp(
      "On applique $V(M_n) = \\dfrac{\\sigma^2}{n}$.",
      "$V(M_n) = \\dfrac{5}{25}$.",
      "$= 0{,}2$.",
      "$V(M_n) = 0{,}2$."
    ),
    tags: ["terminale-spe", "concentration", "echantillon", "qcm"],
  },

  /* =========================================================
     CONCENTRATION_INEGALITE_BIENAYME
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_conc_bien_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_bienayme",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l'inégalité de Bienaymé-Tchebychev pour une variable $X$ ?",
    format: "qcm",
    choices: [
      "$P(|X - \\mu| \\ge \\delta) \\le \\dfrac{V(X)}{\\delta^2}$",
      "$P(|X - \\mu| \\ge \\delta) \\le \\dfrac{V(X)}{\\delta}$",
      "$P(|X - \\mu| \\ge \\delta) \\ge \\dfrac{V(X)}{\\delta^2}$",
      "$P(|X - \\mu| \\ge \\delta) = V(X)\\delta^2$",
    ],
    expected: ["$P(|X - \\mu| \\ge \\delta) \\le \\dfrac{V(X)}{\\delta^2}$"],
    comparator: "mcq_exact",
    hint: "Variance divisée par $\\delta$ au carré, et c'est un majorant.",
    explanation: exp(
      "L'inégalité de Bienaymé-Tchebychev majore une probabilité d'écart.",
      "On retient la formule du cours.",
      "$P(|X - \\mu| \\ge \\delta) \\le \\dfrac{V(X)}{\\delta^2}$.",
      "C'est $P(|X - \\mu| \\ge \\delta) \\le \\dfrac{V(X)}{\\delta^2}$."
    ),
    tags: ["terminale-spe", "concentration", "bienayme", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_bien_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_bienayme",
    difficulty: 3,
    theme: "neutral",
    text: "Avec $V(X) = 4$ et $\\delta = 2$, quel majorant donne Bienaymé-Tchebychev pour $P(|X - \\mu| \\ge 2)$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "$\\dfrac{V(X)}{\\delta^2} = \\dfrac{4}{4}$.",
    explanation: exp(
      "On applique $\\dfrac{V(X)}{\\delta^2}$.",
      "$\\dfrac{4}{2^2} = \\dfrac{4}{4}$.",
      "$= 1$.",
      "Le majorant est $1$ (peu informatif ici, mais valide)."
    ),
    tags: ["terminale-spe", "concentration", "bienayme", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_bien_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_bienayme",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $V(X) = 1$ et $\\delta = 2$, quel majorant donne Bienaymé-Tchebychev pour $P(|X - \\mu| \\ge 2)$ ?",
    format: "qcm",
    choices: ["$0{,}25$", "$0{,}5$", "$2$", "$1$"],
    expected: ["$0{,}25$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{1}{2^2} = \\dfrac{1}{4}$.",
    explanation: exp(
      "On applique $\\dfrac{V(X)}{\\delta^2}$.",
      "$\\dfrac{1}{4}$.",
      "$= 0{,}25$.",
      "Le majorant est $0{,}25$."
    ),
    tags: ["terminale-spe", "concentration", "bienayme", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_bien_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_bienayme",
    difficulty: 3,
    theme: "neutral",
    text: "L'inégalité de Bienaymé-Tchebychev fournit, sur une probabilité, un :",
    format: "qcm",
    choices: ["majorant (borne supérieure)", "minorant", "valeur exacte", "intervalle de confiance"],
    expected: ["majorant (borne supérieure)"],
    comparator: "mcq_exact",
    hint: "Le symbole est $\\le$.",
    explanation: exp(
      "L'inégalité encadre la probabilité par le haut.",
      "$P(\\dots) \\le \\dfrac{V(X)}{\\delta^2}$ : c'est une borne supérieure.",
      "Elle ne donne pas la valeur exacte.",
      "Elle fournit un majorant."
    ),
    tags: ["terminale-spe", "concentration", "bienayme", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_bien_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_bienayme",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $V(X) = 9$ et $\\delta = 3$, quel majorant pour $P(|X - \\mu| \\ge 3)$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "$\\dfrac{9}{3^2}$.",
    explanation: exp(
      "On applique $\\dfrac{V(X)}{\\delta^2}$.",
      "$\\dfrac{9}{9}$.",
      "$= 1$.",
      "Le majorant est $1$."
    ),
    tags: ["terminale-spe", "concentration", "bienayme", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_bien_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_bienayme",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $V(X) = 2$ et $\\delta = 2$, quel majorant pour $P(|X - \\mu| \\ge 2)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$1$", "$0{,}25$", "$4$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{2}{4}$.",
    explanation: exp(
      "On applique $\\dfrac{V(X)}{\\delta^2}$.",
      "$\\dfrac{2}{4}$.",
      "$= 0{,}5$.",
      "Le majorant est $0{,}5$."
    ),
    tags: ["terminale-spe", "concentration", "bienayme", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_bien_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_bienayme",
    difficulty: 5,
    theme: "neutral",
    text: "Que se passe-t-il pour le majorant $\\dfrac{V(X)}{\\delta^2}$ quand $\\delta$ augmente ?",
    format: "qcm",
    choices: [
      "il diminue (les grands écarts sont plus rares)",
      "il augmente",
      "il reste constant",
      "il devient négatif",
    ],
    expected: ["il diminue (les grands écarts sont plus rares)"],
    comparator: "mcq_exact",
    hint: "$\\delta$ est au dénominateur (au carré).",
    explanation: exp(
      "On étudie la dépendance du majorant en $\\delta$.",
      "$\\dfrac{V(X)}{\\delta^2}$ décroît quand $\\delta$ augmente.",
      "Les écarts de plus en plus grands sont de plus en plus improbables.",
      "Le majorant diminue."
    ),
    tags: ["terminale-spe", "concentration", "bienayme", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_bien_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_bienayme",
    difficulty: 3,
    theme: "neutral",
    text: "Avec $V(X) = 5$ et $\\delta = 5$, quel majorant pour $P(|X - \\mu| \\ge 5)$ ?",
    format: "qcm",
    choices: ["$0{,}2$", "$1$", "$5$", "$0{,}04$"],
    expected: ["$0{,}2$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{5}{25}$.",
    explanation: exp(
      "On applique $\\dfrac{V(X)}{\\delta^2}$.",
      "$\\dfrac{5}{5^2} = \\dfrac{5}{25}$.",
      "$= 0{,}2$.",
      "Le majorant est $0{,}2$."
    ),
    tags: ["terminale-spe", "concentration", "bienayme", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_bien_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_bienayme",
    difficulty: 5,
    theme: "neutral",
    text: "À quoi sert principalement l'inégalité de Bienaymé-Tchebychev ?",
    format: "qcm",
    choices: [
      "majorer la probabilité de s'écarter de la moyenne",
      "calculer une dérivée",
      "résoudre une équation différentielle",
      "tracer une courbe",
    ],
    expected: ["majorer la probabilité de s'écarter de la moyenne"],
    comparator: "mcq_exact",
    hint: "Elle borne $P(|X - \\mu| \\ge \\delta)$.",
    explanation: exp(
      "L'inégalité contrôle les écarts à la moyenne.",
      "Elle majore $P(|X - \\mu| \\ge \\delta)$ par $\\dfrac{V(X)}{\\delta^2}$.",
      "Elle sert donc à borner la probabilité d'un grand écart.",
      "Elle sert à majorer la probabilité de s'écarter de la moyenne."
    ),
    tags: ["terminale-spe", "concentration", "bienayme", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_bien_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_bienayme",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $V(X) = 1$ et $\\delta = 5$, quel majorant pour $P(|X - \\mu| \\ge 5)$ ?",
    format: "qcm",
    choices: ["$0{,}04$", "$0{,}2$", "$0{,}25$", "$1$"],
    expected: ["$0{,}04$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{1}{25}$.",
    explanation: exp(
      "On applique $\\dfrac{V(X)}{\\delta^2}$.",
      "$\\dfrac{1}{25}$.",
      "$= 0{,}04$.",
      "Le majorant est $0{,}04$."
    ),
    tags: ["terminale-spe", "concentration", "bienayme", "qcm"],
  },

  /* =========================================================
     CONCENTRATION_INEGALITE_CONCENTRATION
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_conc_conc_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_concentration",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est l'inégalité de concentration pour la moyenne $M_n$ ?",
    format: "qcm",
    choices: [
      "$P(|M_n - \\mu| \\ge \\delta) \\le \\dfrac{\\sigma^2}{n\\delta^2}$",
      "$P(|M_n - \\mu| \\ge \\delta) \\le \\dfrac{\\sigma^2}{\\delta^2}$",
      "$P(|M_n - \\mu| \\ge \\delta) \\le \\dfrac{n\\sigma^2}{\\delta^2}$",
      "$P(|M_n - \\mu| \\ge \\delta) = \\dfrac{\\sigma^2}{n}$",
    ],
    expected: ["$P(|M_n - \\mu| \\ge \\delta) \\le \\dfrac{\\sigma^2}{n\\delta^2}$"],
    comparator: "mcq_exact",
    hint: "C'est Bienaymé appliqué à $M_n$, dont la variance est $\\sigma^2/n$.",
    explanation: exp(
      "On applique Bienaymé-Tchebychev à $M_n$, de variance $\\dfrac{\\sigma^2}{n}$.",
      "$P(|M_n - \\mu| \\ge \\delta) \\le \\dfrac{V(M_n)}{\\delta^2} = \\dfrac{\\sigma^2/n}{\\delta^2}$.",
      "$= \\dfrac{\\sigma^2}{n\\delta^2}$.",
      "C'est $P(|M_n - \\mu| \\ge \\delta) \\le \\dfrac{\\sigma^2}{n\\delta^2}$."
    ),
    tags: ["terminale-spe", "concentration", "concentration", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_conc_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_concentration",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $\\sigma^2 = 0{,}25$, $n = 100$, $\\delta = 0{,}1$, quel majorant pour $P(|M_n - \\mu| \\ge 0{,}1)$ ?",
    format: "qcm",
    choices: ["$0{,}25$", "$1$", "$0{,}025$", "$2{,}5$"],
    expected: ["$0{,}25$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{0{,}25}{100 \\times 0{,}01}$.",
    explanation: exp(
      "On applique $\\dfrac{\\sigma^2}{n\\delta^2}$.",
      "$\\dfrac{0{,}25}{100 \\times 0{,}1^2} = \\dfrac{0{,}25}{100 \\times 0{,}01} = \\dfrac{0{,}25}{1}$.",
      "$= 0{,}25$.",
      "Le majorant est $0{,}25$."
    ),
    tags: ["terminale-spe", "concentration", "concentration", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_conc_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_concentration",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $\\sigma^2 = 4$, $n = 400$, $\\delta = 1$, quel majorant pour $P(|M_n - \\mu| \\ge 1)$ ?",
    format: "qcm",
    choices: ["$0{,}01$", "$0{,}1$", "$1$", "$0{,}04$"],
    expected: ["$0{,}01$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{4}{400 \\times 1}$.",
    explanation: exp(
      "On applique $\\dfrac{\\sigma^2}{n\\delta^2}$.",
      "$\\dfrac{4}{400 \\times 1^2} = \\dfrac{4}{400}$.",
      "$= 0{,}01$.",
      "Le majorant est $0{,}01$."
    ),
    tags: ["terminale-spe", "concentration", "concentration", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_conc_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_concentration",
    difficulty: 4,
    theme: "neutral",
    text: "Dans le majorant $\\dfrac{\\sigma^2}{n\\delta^2}$, que se passe-t-il quand $n$ augmente ?",
    format: "qcm",
    choices: [
      "le majorant diminue (la moyenne se concentre)",
      "le majorant augmente",
      "rien ne change",
      "le majorant devient négatif",
    ],
    expected: ["le majorant diminue (la moyenne se concentre)"],
    comparator: "mcq_exact",
    hint: "$n$ est au dénominateur.",
    explanation: exp(
      "On observe la dépendance en $n$.",
      "$\\dfrac{\\sigma^2}{n\\delta^2}$ décroît quand $n$ augmente.",
      "La probabilité d'écart diminue : $M_n$ se concentre autour de $\\mu$.",
      "Le majorant diminue."
    ),
    tags: ["terminale-spe", "concentration", "concentration", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_conc_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_concentration",
    difficulty: 5,
    theme: "neutral",
    text: "Avec $\\sigma^2 = 1$, $n = 25$, $\\delta = 0{,}2$, quel majorant pour $P(|M_n - \\mu| \\ge 0{,}2)$ ?",
    format: "qcm",
    choices: ["$1$", "$0{,}25$", "$0{,}04$", "$4$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{1}{25 \\times 0{,}04}$.",
    explanation: exp(
      "On applique $\\dfrac{\\sigma^2}{n\\delta^2}$.",
      "$\\dfrac{1}{25 \\times 0{,}2^2} = \\dfrac{1}{25 \\times 0{,}04} = \\dfrac{1}{1}$.",
      "$= 1$.",
      "Le majorant est $1$ (ici non informatif)."
    ),
    tags: ["terminale-spe", "concentration", "concentration", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_conc_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_concentration",
    difficulty: 3,
    theme: "neutral",
    text: "L'inégalité de concentration s'obtient en appliquant Bienaymé-Tchebychev à :",
    format: "qcm",
    choices: ["la moyenne $M_n$", "une seule variable $X$", "la variance", "l'écart-type"],
    expected: ["la moyenne $M_n$"],
    comparator: "mcq_exact",
    hint: "On remplace $X$ par $M_n$ et $V(X)$ par $V(M_n)$.",
    explanation: exp(
      "L'inégalité de concentration est un cas particulier de Bienaymé.",
      "On l'applique à la variable $M_n$, de variance $\\dfrac{\\sigma^2}{n}$.",
      "On obtient $P(|M_n - \\mu| \\ge \\delta) \\le \\dfrac{\\sigma^2}{n\\delta^2}$.",
      "On l'applique à la moyenne $M_n$."
    ),
    tags: ["terminale-spe", "concentration", "concentration", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_conc_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_concentration",
    difficulty: 5,
    theme: "neutral",
    text: "Avec $\\sigma^2 = 2$, $n = 200$, $\\delta = 0{,}1$, quel majorant pour $P(|M_n - \\mu| \\ge 0{,}1)$ ?",
    format: "qcm",
    choices: ["$1$", "$0{,}5$", "$0{,}1$", "$2$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{2}{200 \\times 0{,}01}$.",
    explanation: exp(
      "On applique $\\dfrac{\\sigma^2}{n\\delta^2}$.",
      "$\\dfrac{2}{200 \\times 0{,}01} = \\dfrac{2}{2}$.",
      "$= 1$.",
      "Le majorant est $1$."
    ),
    tags: ["terminale-spe", "concentration", "concentration", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_conc_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_concentration",
    difficulty: 4,
    theme: "neutral",
    text: "Pour rendre $P(|M_n - \\mu| \\ge \\delta)$ aussi petite qu'on veut, on peut :",
    format: "qcm",
    choices: [
      "augmenter la taille $n$ de l'échantillon",
      "diminuer $n$",
      "diminuer $\\delta$ seulement",
      "rien, c'est impossible",
    ],
    expected: ["augmenter la taille $n$ de l'échantillon"],
    comparator: "mcq_exact",
    hint: "Le majorant $\\dfrac{\\sigma^2}{n\\delta^2}$ tend vers 0 quand $n \\to +\\infty$.",
    explanation: exp(
      "Le majorant dépend de $n$ au dénominateur.",
      "En augmentant $n$, $\\dfrac{\\sigma^2}{n\\delta^2} \\to 0$.",
      "La probabilité d'écart devient aussi petite que voulu.",
      "On augmente la taille $n$ de l'échantillon."
    ),
    tags: ["terminale-spe", "concentration", "concentration", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_conc_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_concentration",
    difficulty: 5,
    theme: "neutral",
    text: "Avec $\\sigma^2 = 0{,}25$, $n = 2500$, $\\delta = 0{,}1$, quel majorant pour $P(|M_n - \\mu| \\ge 0{,}1)$ ?",
    format: "qcm",
    choices: ["$0{,}01$", "$0{,}1$", "$1$", "$0{,}25$"],
    expected: ["$0{,}01$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{0{,}25}{2500 \\times 0{,}01}$.",
    explanation: exp(
      "On applique $\\dfrac{\\sigma^2}{n\\delta^2}$.",
      "$\\dfrac{0{,}25}{2500 \\times 0{,}01} = \\dfrac{0{,}25}{25}$.",
      "$= 0{,}01$.",
      "Le majorant est $0{,}01$."
    ),
    tags: ["terminale-spe", "concentration", "concentration", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_conc_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_concentration",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $\\sigma^2 = 9$, $n = 100$, $\\delta = 3$, quel majorant pour $P(|M_n - \\mu| \\ge 3)$ ?",
    format: "qcm",
    choices: ["$0{,}01$", "$0{,}1$", "$1$", "$0{,}09$"],
    expected: ["$0{,}01$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{9}{100 \\times 9}$.",
    explanation: exp(
      "On applique $\\dfrac{\\sigma^2}{n\\delta^2}$.",
      "$\\dfrac{9}{100 \\times 3^2} = \\dfrac{9}{900}$.",
      "$= 0{,}01$.",
      "Le majorant est $0{,}01$."
    ),
    tags: ["terminale-spe", "concentration", "concentration", "qcm"],
  },

  /* =========================================================
     CONCENTRATION_LOI_GRANDS_NOMBRES
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_conc_lgn_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_loi_grands_nombres",
    difficulty: 2,
    theme: "neutral",
    text: "Que dit la loi des grands nombres pour la moyenne $M_n$ d'un échantillon ?",
    format: "qcm",
    choices: [
      "$M_n$ se rapproche de $\\mu$ quand $n$ devient grand",
      "$M_n$ s'éloigne de $\\mu$",
      "$M_n$ est toujours égale à $\\mu$",
      "$M_n$ devient nulle",
    ],
    expected: ["$M_n$ se rapproche de $\\mu$ quand $n$ devient grand"],
    comparator: "mcq_exact",
    hint: "La moyenne se stabilise sur l'espérance.",
    explanation: exp(
      "La loi des grands nombres relie moyenne observée et espérance.",
      "Quand $n$ grandit, $M_n$ se concentre autour de $\\mu$.",
      "$M_n$ se rapproche de $\\mu$.",
      "$M_n$ se rapproche de $\\mu$ quand $n$ devient grand."
    ),
    tags: ["terminale-spe", "concentration", "lgn", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_lgn_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_loi_grands_nombres",
    difficulty: 3,
    theme: "neutral",
    text: "D'après la loi des grands nombres, pour tout $\\delta > 0$, $P(|M_n - \\mu| \\ge \\delta)$ :",
    format: "qcm",
    choices: ["tend vers $0$ quand $n \\to +\\infty$", "tend vers $1$", "reste constante", "tend vers $\\mu$"],
    expected: ["tend vers $0$ quand $n \\to +\\infty$"],
    comparator: "mcq_exact",
    hint: "C'est la conséquence de l'inégalité de concentration.",
    explanation: exp(
      "On utilise l'inégalité de concentration et la limite.",
      "$P(|M_n - \\mu| \\ge \\delta) \\le \\dfrac{\\sigma^2}{n\\delta^2} \\to 0$.",
      "Donc la probabilité d'écart tend vers $0$.",
      "$P(|M_n - \\mu| \\ge \\delta) \\to 0$."
    ),
    tags: ["terminale-spe", "concentration", "lgn", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_lgn_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_loi_grands_nombres",
    difficulty: 3,
    theme: "neutral",
    text: "En lançant un dé équilibré un très grand nombre de fois, la moyenne des résultats se rapproche de :",
    format: "qcm",
    choices: ["$3{,}5$", "$6$", "$1$", "$0$"],
    expected: ["$3{,}5$"],
    comparator: "mcq_exact",
    hint: "C'est l'espérance d'un dé.",
    explanation: exp(
      "La loi des grands nombres : la moyenne tend vers l'espérance.",
      "Pour un dé, $E(X) = 3{,}5$.",
      "La moyenne observée se rapproche de $3{,}5$.",
      "Elle se rapproche de $3{,}5$."
    ),
    tags: ["terminale-spe", "concentration", "lgn", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_lgn_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_loi_grands_nombres",
    difficulty: 4,
    theme: "neutral",
    text: "La loi des grands nombres justifie qu'on estime une probabilité par :",
    format: "qcm",
    choices: [
      "la fréquence observée sur un grand échantillon",
      "une seule observation",
      "la variance",
      "l'écart-type",
    ],
    expected: ["la fréquence observée sur un grand échantillon"],
    comparator: "mcq_exact",
    hint: "Fréquence ≈ probabilité pour $n$ grand.",
    explanation: exp(
      "La loi des grands nombres relie fréquence et probabilité.",
      "Sur un grand échantillon, la fréquence se stabilise sur la probabilité.",
      "On peut donc estimer une probabilité par une fréquence observée.",
      "Par la fréquence observée sur un grand échantillon."
    ),
    tags: ["terminale-spe", "concentration", "lgn", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_lgn_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_loi_grands_nombres",
    difficulty: 4,
    theme: "neutral",
    text: "La loi des grands nombres garantit-elle que $M_n$ soit EXACTEMENT égale à $\\mu$ pour $n$ grand ?",
    format: "qcm",
    choices: [
      "Non, elle s'en rapproche seulement (avec forte probabilité)",
      "Oui, exactement",
      "Oui, dès $n = 10$",
      "Non, $M_n$ s'en éloigne",
    ],
    expected: ["Non, elle s'en rapproche seulement (avec forte probabilité)"],
    comparator: "mcq_exact",
    hint: "C'est un résultat de probabilité, pas une égalité.",
    explanation: exp(
      "La loi des grands nombres est un énoncé probabiliste.",
      "$M_n$ reste aléatoire ; elle se concentre autour de $\\mu$.",
      "On a une forte probabilité d'être proche, pas une égalité exacte.",
      "Non, $M_n$ se rapproche de $\\mu$ avec forte probabilité."
    ),
    tags: ["terminale-spe", "concentration", "lgn", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_lgn_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_loi_grands_nombres",
    difficulty: 3,
    theme: "neutral",
    text: "En lançant une pièce équilibrée un grand nombre de fois, la fréquence de « pile » se rapproche de :",
    format: "qcm",
    choices: ["$0{,}5$", "$1$", "$0$", "$0{,}25$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "$P(\\text{pile}) = 0{,}5$.",
    explanation: exp(
      "La fréquence tend vers la probabilité théorique.",
      "Pour une pièce équilibrée, $P(\\text{pile}) = 0{,}5$.",
      "La fréquence se rapproche de $0{,}5$.",
      "Elle se rapproche de $0{,}5$."
    ),
    tags: ["terminale-spe", "concentration", "lgn", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_lgn_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_loi_grands_nombres",
    difficulty: 5,
    theme: "neutral",
    text: "La loi des grands nombres est une conséquence directe de :",
    format: "qcm",
    choices: [
      "l'inégalité de concentration",
      "la dérivation",
      "le théorème des valeurs intermédiaires",
      "la formule du binôme",
    ],
    expected: ["l'inégalité de concentration"],
    comparator: "mcq_exact",
    hint: "Le majorant $\\sigma^2/(n\\delta^2)$ tend vers 0.",
    explanation: exp(
      "On déduit la loi des grands nombres d'une majoration.",
      "L'inégalité de concentration donne $P(|M_n-\\mu|\\ge\\delta) \\le \\dfrac{\\sigma^2}{n\\delta^2}$.",
      "Ce majorant tend vers $0$, d'où la loi des grands nombres.",
      "C'est une conséquence de l'inégalité de concentration."
    ),
    tags: ["terminale-spe", "concentration", "lgn", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_lgn_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_loi_grands_nombres",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi un sondage sur 1000 personnes est-il plus fiable qu'un sondage sur 10 personnes ?",
    format: "qcm",
    choices: [
      "car la fréquence se concentre autour de la vraie proportion quand $n$ augmente",
      "car 1000 est un nombre rond",
      "car la variance augmente",
      "ce n'est pas plus fiable",
    ],
    expected: ["car la fréquence se concentre autour de la vraie proportion quand $n$ augmente"],
    comparator: "mcq_exact",
    hint: "Loi des grands nombres + concentration.",
    explanation: exp(
      "La fiabilité augmente avec la taille de l'échantillon.",
      "Quand $n$ grandit, la fréquence se concentre autour de la vraie proportion.",
      "Un grand $n$ réduit la fluctuation d'échantillonnage.",
      "Car la fréquence se concentre autour de la vraie proportion quand $n$ augmente."
    ),
    tags: ["terminale-spe", "concentration", "lgn", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_lgn_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_loi_grands_nombres",
    difficulty: 3,
    theme: "neutral",
    text: "La loi des grands nombres concerne le comportement de $M_n$ lorsque :",
    format: "qcm",
    choices: ["$n$ tend vers $+\\infty$", "$n = 1$", "$\\delta$ tend vers $+\\infty$", "$\\mu = 0$"],
    expected: ["$n$ tend vers $+\\infty$"],
    comparator: "mcq_exact",
    hint: "« Grands nombres » = grande taille d'échantillon.",
    explanation: exp(
      "Le nom indique le régime concerné.",
      "On s'intéresse au comportement pour $n$ très grand.",
      "$n \\to +\\infty$.",
      "Elle concerne $n \\to +\\infty$."
    ),
    tags: ["terminale-spe", "concentration", "lgn", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_lgn_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_loi_grands_nombres",
    difficulty: 5,
    theme: "neutral",
    text: "Un casino gagne « en moyenne » à long terme grâce à un léger avantage par partie. Quel principe l'explique ?",
    format: "qcm",
    choices: [
      "la loi des grands nombres (la moyenne des gains se stabilise sur l'espérance)",
      "la dérivation",
      "le théorème de Pascal",
      "la convexité",
    ],
    expected: ["la loi des grands nombres (la moyenne des gains se stabilise sur l'espérance)"],
    comparator: "mcq_exact",
    hint: "Sur un très grand nombre de parties, la moyenne tend vers $E$.",
    explanation: exp(
      "Sur un grand nombre de parties, la moyenne des gains se stabilise.",
      "Elle tend vers l'espérance de gain par partie (favorable au casino).",
      "C'est la loi des grands nombres.",
      "C'est la loi des grands nombres."
    ),
    tags: ["terminale-spe", "concentration", "lgn", "qcm"],
  },

  /* =========================================================
     CONCENTRATION_FLUCTUATION
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_conc_fluc_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_fluctuation",
    difficulty: 2,
    theme: "neutral",
    text: "Pour une fréquence $F_n$ de succès (proportion $p$), que vaut $E(F_n)$ ?",
    format: "qcm",
    choices: ["$p$", "$np$", "$\\dfrac{p}{n}$", "$p(1-p)$"],
    expected: ["$p$"],
    comparator: "mcq_exact",
    hint: "La fréquence estime la proportion $p$.",
    explanation: exp(
      "L'espérance de la fréquence est la proportion théorique.",
      "$F_n = \\dfrac{X}{n}$ avec $X \\sim \\mathcal{B}(n,p)$, donc $E(F_n) = \\dfrac{np}{n}$.",
      "$= p$.",
      "$E(F_n) = p$."
    ),
    tags: ["terminale-spe", "concentration", "fluctuation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_fluc_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_fluctuation",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut la variance $V(F_n)$ d'une fréquence ?",
    format: "qcm",
    choices: ["$\\dfrac{p(1-p)}{n}$", "$p(1-p)$", "$np(1-p)$", "$\\dfrac{p}{n}$"],
    expected: ["$\\dfrac{p(1-p)}{n}$"],
    comparator: "mcq_exact",
    hint: "$V(F_n) = \\dfrac{V(X)}{n^2}$ avec $V(X) = np(1-p)$.",
    explanation: exp(
      "On divise la variance de $X \\sim \\mathcal{B}(n,p)$ par $n^2$.",
      "$V(F_n) = \\dfrac{V(X)}{n^2} = \\dfrac{np(1-p)}{n^2}$.",
      "$= \\dfrac{p(1-p)}{n}$.",
      "$V(F_n) = \\dfrac{p(1-p)}{n}$."
    ),
    tags: ["terminale-spe", "concentration", "fluctuation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_fluc_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_fluctuation",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $p = 0{,}5$ et $n = 100$, que vaut $V(F_n)$ ?",
    format: "qcm",
    choices: ["$0{,}0025$", "$0{,}25$", "$0{,}025$", "$0{,}5$"],
    expected: ["$0{,}0025$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{0{,}5 \\times 0{,}5}{100}$.",
    explanation: exp(
      "On applique $V(F_n) = \\dfrac{p(1-p)}{n}$.",
      "$\\dfrac{0{,}5 \\times 0{,}5}{100} = \\dfrac{0{,}25}{100}$.",
      "$= 0{,}0025$.",
      "$V(F_n) = 0{,}0025$."
    ),
    tags: ["terminale-spe", "concentration", "fluctuation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_fluc_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_fluctuation",
    difficulty: 4,
    theme: "neutral",
    text: "Quand $n$ augmente, la fréquence $F_n$ d'un échantillon :",
    format: "qcm",
    choices: [
      "fluctue de moins en moins autour de $p$",
      "fluctue de plus en plus",
      "devient égale à $1$",
      "ne dépend plus de $p$",
    ],
    expected: ["fluctue de moins en moins autour de $p$"],
    comparator: "mcq_exact",
    hint: "$V(F_n) = \\dfrac{p(1-p)}{n}$ diminue.",
    explanation: exp(
      "La fluctuation se mesure par la variance.",
      "$V(F_n) = \\dfrac{p(1-p)}{n}$ diminue quand $n$ augmente.",
      "La fréquence se resserre autour de $p$.",
      "Elle fluctue de moins en moins autour de $p$."
    ),
    tags: ["terminale-spe", "concentration", "fluctuation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_fluc_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_fluctuation",
    difficulty: 5,
    theme: "neutral",
    text: "Avec $p = 0{,}2$ et $n = 100$, que vaut $V(F_n)$ ?",
    format: "qcm",
    choices: ["$0{,}0016$", "$0{,}16$", "$0{,}016$", "$0{,}2$"],
    expected: ["$0{,}0016$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{0{,}2 \\times 0{,}8}{100}$.",
    explanation: exp(
      "On applique $V(F_n) = \\dfrac{p(1-p)}{n}$.",
      "$\\dfrac{0{,}2 \\times 0{,}8}{100} = \\dfrac{0{,}16}{100}$.",
      "$= 0{,}0016$.",
      "$V(F_n) = 0{,}0016$."
    ),
    tags: ["terminale-spe", "concentration", "fluctuation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_fluc_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_fluctuation",
    difficulty: 3,
    theme: "neutral",
    text: "La « fluctuation d'échantillonnage » désigne :",
    format: "qcm",
    choices: [
      "la variation de la fréquence d'un échantillon à l'autre",
      "une erreur de calcul",
      "la moyenne théorique",
      "la dérivée de la fréquence",
    ],
    expected: ["la variation de la fréquence d'un échantillon à l'autre"],
    comparator: "mcq_exact",
    hint: "Deux échantillons donnent des fréquences différentes.",
    explanation: exp(
      "La fluctuation décrit la variabilité due au hasard de l'échantillon.",
      "D'un échantillon à l'autre, la fréquence observée change.",
      "C'est la fluctuation d'échantillonnage.",
      "C'est la variation de la fréquence d'un échantillon à l'autre."
    ),
    tags: ["terminale-spe", "concentration", "fluctuation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_fluc_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_fluctuation",
    difficulty: 5,
    theme: "neutral",
    text: "Avec $p = 0{,}145$, l'expression $p(1-p)$ vaut $0{,}123975$. Que vaut alors $V(F_n)$ en fonction de $n$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{0{,}123975}{n}$",
      "$0{,}123975 \\times n$",
      "$\\dfrac{0{,}145}{n}$",
      "$\\dfrac{0{,}123975}{n^2}$",
    ],
    expected: ["$\\dfrac{0{,}123975}{n}$"],
    comparator: "mcq_exact",
    hint: "$V(F_n) = \\dfrac{p(1-p)}{n}$.",
    explanation: exp(
      "On applique $V(F_n) = \\dfrac{p(1-p)}{n}$.",
      "Avec $p(1-p) = 0{,}123975$.",
      "$V(F_n) = \\dfrac{0{,}123975}{n}$.",
      "$V(F_n) = \\dfrac{0{,}123975}{n}$ (cf. bac Amérique du Nord 2025)."
    ),
    tags: ["terminale-spe", "concentration", "fluctuation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_fluc_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_fluctuation",
    difficulty: 4,
    theme: "neutral",
    text: "Une fréquence observée $F_n$ est utilisée pour estimer :",
    format: "qcm",
    choices: ["la proportion $p$ dans la population", "la variance", "la taille $n$", "l'écart-type seul"],
    expected: ["la proportion $p$ dans la population"],
    comparator: "mcq_exact",
    hint: "$E(F_n) = p$.",
    explanation: exp(
      "La fréquence est un estimateur de la proportion.",
      "Comme $E(F_n) = p$, $F_n$ estime $p$.",
      "On estime ainsi la proportion inconnue de la population.",
      "Elle estime la proportion $p$."
    ),
    tags: ["terminale-spe", "concentration", "fluctuation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_fluc_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_fluctuation",
    difficulty: 5,
    theme: "neutral",
    text: "Avec $p = 0{,}1$ et $n = 900$, que vaut $V(F_n)$ ?",
    format: "qcm",
    choices: ["$0{,}0001$", "$0{,}001$", "$0{,}09$", "$0{,}01$"],
    expected: ["$0{,}0001$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{0{,}1 \\times 0{,}9}{900} = \\dfrac{0{,}09}{900}$.",
    explanation: exp(
      "On applique $V(F_n) = \\dfrac{p(1-p)}{n}$.",
      "$\\dfrac{0{,}1 \\times 0{,}9}{900} = \\dfrac{0{,}09}{900}$.",
      "$= 0{,}0001$.",
      "$V(F_n) = 0{,}0001$."
    ),
    tags: ["terminale-spe", "concentration", "fluctuation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_fluc_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_fluctuation",
    difficulty: 4,
    theme: "neutral",
    text: "Pour réduire la fluctuation d'une fréquence (la rendre plus fiable), il faut :",
    format: "qcm",
    choices: ["augmenter $n$", "diminuer $n$", "changer $p$", "rien faire"],
    expected: ["augmenter $n$"],
    comparator: "mcq_exact",
    hint: "$V(F_n) = \\dfrac{p(1-p)}{n}$ : $n$ au dénominateur.",
    explanation: exp(
      "La fluctuation se mesure par $V(F_n)$.",
      "$V(F_n) = \\dfrac{p(1-p)}{n}$ diminue quand $n$ augmente.",
      "Un plus grand échantillon réduit la fluctuation.",
      "Il faut augmenter $n$."
    ),
    tags: ["terminale-spe", "concentration", "fluctuation", "qcm"],
  },

  /* =========================================================
     CONCENTRATION_DEFI — Type bac
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_conc_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Bac 2025 : $F_n$ a pour variance $V(F_n) = \\dfrac{0{,}123975}{n}$. Par l'inégalité de concentration, $P(|F_n - 0{,}145| \\ge 0{,}1)$ est majorée par :",
    format: "qcm",
    choices: [
      "$\\dfrac{12{,}3975}{n}$",
      "$\\dfrac{0{,}123975}{n}$",
      "$\\dfrac{1{,}23975}{n}$",
      "$\\dfrac{0{,}1}{n}$",
    ],
    expected: ["$\\dfrac{12{,}3975}{n}$"],
    comparator: "mcq_exact",
    hint: "Majorant $= \\dfrac{V(F_n)}{\\delta^2} = \\dfrac{0{,}123975/n}{0{,}1^2}$.",
    explanation: exp(
      "On applique l'inégalité de concentration avec $\\delta = 0{,}1$.",
      "Majorant $= \\dfrac{V(F_n)}{\\delta^2} = \\dfrac{0{,}123975/n}{0{,}01}$.",
      "$= \\dfrac{12{,}3975}{n}$ (que l'on majore par $\\dfrac{12{,}5}{n}$ au bac).",
      "Le majorant est $\\dfrac{12{,}3975}{n}$."
    ),
    tags: ["terminale-spe", "concentration", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un responsable observe $F_{1000} = 0{,}3$ alors que la proportion attendue est $p = 0{,}145$. L'écart $|0{,}3 - 0{,}145| = 0{,}155$ est :",
    format: "qcm",
    choices: [
      "anormalement grand (dysfonctionnement probable)",
      "tout à fait normal",
      "impossible",
      "égal à la variance",
    ],
    expected: ["anormalement grand (dysfonctionnement probable)"],
    comparator: "mcq_exact",
    hint: "Avec $n = 1000$, la concentration rend un tel écart très improbable.",
    explanation: exp(
      "On compare l'écart observé à ce que permet la concentration.",
      "Pour $n = 1000$, $P(|F_n - 0{,}145| \\ge 0{,}1) \\le \\dfrac{12{,}5}{1000} = 0{,}0125$.",
      "Un écart de $0{,}155 > 0{,}1$ est donc très improbable : anomalie.",
      "L'écart est anormalement grand : le responsable a raison de soupçonner un problème."
    ),
    tags: ["terminale-spe", "concentration", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On veut $P(|M_n - \\mu| \\ge 0{,}1) \\le 0{,}01$ avec $\\sigma^2 = 1$. L'inégalité de concentration donne $\\dfrac{1}{n \\times 0{,}01} \\le 0{,}01$. Quelle valeur de $n$ convient ?",
    format: "qcm",
    choices: ["$n = 10\\,000$", "$n = 100$", "$n = 1\\,000$", "$n = 10$"],
    expected: ["$n = 10\\,000$"],
    comparator: "mcq_exact",
    hint: "Résous $\\dfrac{1}{0{,}01\\,n} \\le 0{,}01$, soit $\\dfrac{100}{n} \\le 0{,}01$.",
    explanation: exp(
      "On résout l'inéquation en $n$.",
      "$\\dfrac{\\sigma^2}{n\\delta^2} = \\dfrac{1}{n \\times 0{,}01} = \\dfrac{100}{n} \\le 0{,}01$.",
      "$n \\ge \\dfrac{100}{0{,}01} = 10\\,000$.",
      "$n = 10\\,000$ convient."
    ),
    tags: ["terminale-spe", "concentration", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un sondage : on interroge $n$ personnes, fréquence de « oui » $F_n$, proportion réelle $p$. Pourquoi un grand $n$ donne-t-il un sondage fiable ?",
    format: "qcm",
    choices: [
      "car $V(F_n) = \\dfrac{p(1-p)}{n}$ devient petite : $F_n$ se concentre sur $p$",
      "car $E(F_n)$ augmente",
      "car $p$ change",
      "car la fluctuation augmente",
    ],
    expected: ["car $V(F_n) = \\dfrac{p(1-p)}{n}$ devient petite : $F_n$ se concentre sur $p$"],
    comparator: "mcq_exact",
    hint: "Variance de la fréquence en $1/n$.",
    explanation: exp(
      "La fiabilité dépend de la variance de la fréquence.",
      "$V(F_n) = \\dfrac{p(1-p)}{n}$ décroît en $\\dfrac{1}{n}$.",
      "Pour $n$ grand, $F_n$ se concentre autour de $p$ (loi des grands nombres).",
      "Car $V(F_n)$ devient petite : $F_n$ se concentre sur $p$."
    ),
    tags: ["terminale-spe", "concentration", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_defi_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un échantillon de $n = 100$ pièces, $X \\sim \\mathcal{B}(100\\,;0{,}5)$, $M_n = \\dfrac{X}{100} = F_n$. Que vaut $E(F_n)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$50$", "$0{,}25$", "$100$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "$E(F_n) = p$.",
    explanation: exp(
      "La fréquence a pour espérance la proportion.",
      "$E(F_n) = p = 0{,}5$.",
      "$= 0{,}5$.",
      "$E(F_n) = 0{,}5$."
    ),
    tags: ["terminale-spe", "concentration", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_defi_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour estimer $p$ à $\\pm 0{,}05$ avec une bonne fiabilité, on doit surtout :",
    format: "qcm",
    choices: [
      "choisir une grande taille d'échantillon $n$",
      "choisir $n = 5$",
      "changer la valeur de $p$",
      "augmenter $\\delta$",
    ],
    expected: ["choisir une grande taille d'échantillon $n$"],
    comparator: "mcq_exact",
    hint: "La précision exige $V(F_n)$ petite, donc $n$ grand.",
    explanation: exp(
      "La précision d'une estimation dépend de la taille de l'échantillon.",
      "Plus $n$ est grand, plus la fréquence est proche de $p$ (faible fluctuation).",
      "Pour une marge de $\\pm 0{,}05$ fiable, il faut $n$ grand.",
      "Il faut choisir une grande taille $n$."
    ),
    tags: ["terminale-spe", "concentration", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_defi_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Avec $\\sigma^2 = 1$, on veut $\\dfrac{\\sigma^2}{n\\delta^2} \\le 0{,}05$ pour $\\delta = 0{,}2$. Quelle est la plus petite valeur de $n$ ?",
    format: "qcm",
    choices: ["$500$", "$50$", "$100$", "$2000$"],
    expected: ["$500$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{1}{n \\times 0{,}04} \\le 0{,}05$.",
    explanation: exp(
      "On résout l'inéquation en $n$.",
      "$\\dfrac{1}{n \\times 0{,}2^2} = \\dfrac{1}{0{,}04\\,n} = \\dfrac{25}{n} \\le 0{,}05$.",
      "$n \\ge \\dfrac{25}{0{,}05} = 500$.",
      "La plus petite valeur est $n = 500$."
    ),
    tags: ["terminale-spe", "concentration", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_defi_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_defi",
    difficulty: 4,
    theme: "neutral",
    text: "La loi des grands nombres et l'inégalité de concentration justifient ensemble que :",
    format: "qcm",
    choices: [
      "la moyenne (ou fréquence) d'un grand échantillon est une bonne estimation",
      "une seule mesure suffit",
      "le hasard n'existe pas",
      "la variance est toujours nulle",
    ],
    expected: ["la moyenne (ou fréquence) d'un grand échantillon est une bonne estimation"],
    comparator: "mcq_exact",
    hint: "C'est le fondement de l'estimation statistique.",
    explanation: exp(
      "Ces résultats fondent l'estimation par échantillon.",
      "Concentration + loi des grands nombres : la moyenne se concentre sur $\\mu$.",
      "Un grand échantillon donne donc une estimation fiable.",
      "La moyenne (ou fréquence) d'un grand échantillon est une bonne estimation."
    ),
    tags: ["terminale-spe", "concentration", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_defi_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Si pour $n = 1000$ le majorant de $P(|F_n - p| \\ge 0{,}1)$ vaut $0{,}0125$, alors un écart supérieur à $0{,}1$ se produit :",
    format: "qcm",
    choices: [
      "au plus dans 1,25 % des cas",
      "dans au moins 98,75 % des cas",
      "toujours",
      "jamais",
    ],
    expected: ["au plus dans 1,25 % des cas"],
    comparator: "mcq_exact",
    hint: "$0{,}0125 = 1{,}25\\,\\%$ est un majorant de probabilité.",
    explanation: exp(
      "Le majorant borne la probabilité de l'événement.",
      "$P(|F_n - p| \\ge 0{,}1) \\le 0{,}0125$.",
      "Soit au plus $1{,}25\\,\\%$ des cas.",
      "Un tel écart se produit au plus dans 1,25 % des cas."
    ),
    tags: ["terminale-spe", "concentration", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_conc_defi_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $p = 0{,}5$ et $n = 400$, que vaut $V(F_n)$ ?",
    format: "qcm",
    choices: ["$0{,}000625$", "$0{,}25$", "$0{,}0025$", "$0{,}1$"],
    expected: ["$0{,}000625$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{0{,}25}{400}$.",
    explanation: exp(
      "On applique $V(F_n) = \\dfrac{p(1-p)}{n}$.",
      "$\\dfrac{0{,}5 \\times 0{,}5}{400} = \\dfrac{0{,}25}{400}$.",
      "$= 0{,}000625$.",
      "$V(F_n) = 0{,}000625$."
    ),
    tags: ["terminale-spe", "concentration", "type_bac", "qcm"],
  },

  /* =========================================================
     GÉNÉRATEURS (29/09/2026)
     L'évaluation par chapitres tire jusqu'à 20 questions sur cette seule
     notion en mode Révision (difficultés 1 à 3) : les items figés n'en
     offraient que 19. Chaque générateur écarte les tirages dont le résultat
     ne tombe pas juste (voir `decimalExact`) et ceux dont le majorant
     dépasserait 1 — un majorant de probabilité supérieur à 1 ne dit rien.
  ========================================================= */

  {
    kind: "template",
    id: "terminale_spe_conc_moy_tpl_variance",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_echantillon_moyenne",
    difficulty: 2,
    theme: "neutral",
    hint: "$V(M_n) = \\dfrac{V(X)}{n}$ : la variance est divisée par $n$, pas par $n^2$.",
    tags: ["terminale-spe", "concentration", "echantillon", "template", "short"],
    generate: () => genMoy(2),
  },

  {
    kind: "template",
    id: "terminale_spe_conc_moy_tpl_ecart_type",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_echantillon_moyenne",
    difficulty: 3,
    theme: "neutral",
    hint: "$V(M_n) = \\dfrac{\\sigma^2}{n}$, donc $\\sigma(M_n) = \\dfrac{\\sigma}{\\sqrt{n}}$.",
    tags: ["terminale-spe", "concentration", "echantillon", "template", "short"],
    generate: () => genMoy(3),
  },

  {
    kind: "template",
    id: "terminale_spe_conc_bien_tpl_majorant",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_bienayme",
    difficulty: 3,
    theme: "neutral",
    hint: "$P(|X - \\mu| \\ge \\delta) \\le \\dfrac{V(X)}{\\delta^2}$ : repère d'abord $\\mu$ et $\\delta$.",
    tags: ["terminale-spe", "concentration", "bienayme", "template", "short"],
    generate: () => genBien(3),
  },

  {
    kind: "template",
    id: "terminale_spe_conc_conc_tpl_majorant",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_inegalite_concentration",
    difficulty: 3,
    theme: "neutral",
    hint: "$P(|M_n - \\mu| \\ge \\delta) \\le \\dfrac{\\sigma^2}{n\\delta^2}$.",
    tags: ["terminale-spe", "concentration", "concentration", "template", "short"],
    generate: () => genConc(3),
  },

  {
    kind: "template",
    id: "terminale_spe_conc_fluc_tpl_majorant",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "concentration_echantillonnage",
    microId: "concentration_fluctuation",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour une fréquence, $\\sigma^2$ devient $p(1-p)$ : $P(|F_n - p| \\ge \\delta) \\le \\dfrac{p(1-p)}{n\\delta^2}$.",
    tags: ["terminale-spe", "concentration", "fluctuation", "template", "short"],
    generate: () => genFluc(3),
  },

  /* ---------- 15/10/2026 : un gabarit (au moins) à chaque étoile servie ---------- */
  gab("terminale_spe_conc_moy_tpl_e2", "concentration_echantillon_moyenne", 2,
    "$E(M_n) = E(X)$ et $V(M_n) = \\dfrac{V(X)}{n}$.", ["echantillon", "short"], () => genMoy(2)),
  gab("terminale_spe_conc_moy_tpl_e3", "concentration_echantillon_moyenne", 3,
    "$\\sigma(M_n) = \\dfrac{\\sigma}{\\sqrt{n}}$ ; si l'on donne l'écart-type, la variance est son carré.", ["echantillon", "short"], () => genMoy(3)),
  gab("terminale_spe_conc_moy_tpl_e4", "concentration_echantillon_moyenne", 4,
    "Écris la formule ($V(M_n)$, $\\sigma(M_n)$, $E(S_n)$ ou $V(S_n)$), puis isole l'inconnue.", ["echantillon", "short"], () => genMoy(4)),
  gab("terminale_spe_conc_moy_tpl_e5", "concentration_echantillon_moyenne", 5,
    "Les VARIANCES se divisent par $n$ ; l'écart-type, lui, se divise par $\\sqrt{n}$.", ["echantillon"], () => genMoy(5)),
  gab("terminale_spe_conc_bien_tpl_e2", "concentration_inegalite_bienayme", 2,
    "$P(|X - \\mu| \\ge \\delta) \\le \\dfrac{V(X)}{\\delta^2}$ : on divise par $\\delta^2$.", ["bienayme", "short"], () => genBien(2)),
  gab("terminale_spe_conc_bien_tpl_e3", "concentration_inegalite_bienayme", 3,
    "Repère $\\mu$ et $\\delta$ : « $X \\le \\mu - \\delta$ ou $X \\ge \\mu + \\delta$ » s'écrit $|X - \\mu| \\ge \\delta$.", ["bienayme", "short"], () => genBien(3)),
  gab("terminale_spe_conc_bien_tpl_e4", "concentration_inegalite_bienayme", 4,
    "Pour un minorant, passe à l'événement contraire : $1 - \\dfrac{V(X)}{\\delta^2}$.", ["bienayme"], () => genBien(4)),
  gab("terminale_spe_conc_bien_tpl_e5", "concentration_inegalite_bienayme", 5,
    "Retrouve le centre et la demi-largeur de l'intervalle, ou résous $\\dfrac{V(X)}{\\delta^2} \\le \\alpha$.", ["bienayme", "short"], () => genBien(5)),
  gab("terminale_spe_conc_conc_tpl_e4", "concentration_inegalite_concentration", 4,
    "$P(|M_n - \\mu| < \\delta) \\ge 1 - \\dfrac{V(X)}{n\\delta^2}$.", ["concentration", "short"], () => genConc(4)),
  gab("terminale_spe_conc_conc_tpl_e5", "concentration_inegalite_concentration", 5,
    "Résous $\\dfrac{V(X)}{n\\delta^2} \\le \\alpha$ : $n \\ge \\dfrac{V(X)}{\\alpha\\delta^2}$, puis prends le premier entier.", ["concentration", "short"], () => genConc(5)),
  gab("terminale_spe_conc_lgn_tpl_e2", "concentration_loi_grands_nombres", 2,
    "La moyenne d'un grand nombre de lancers se rapproche de l'espérance d'un lancer.", ["loi_grands_nombres", "short"], () => genLgn(2)),
  gab("terminale_spe_conc_lgn_tpl_e3", "concentration_loi_grands_nombres", 3,
    "Calcule l'espérance du gain net (sans oublier la mise) : c'est vers elle que va le gain moyen.", ["loi_grands_nombres"], () => genLgn(3)),
  gab("terminale_spe_conc_lgn_tpl_e4", "concentration_loi_grands_nombres", 4,
    "$E(X) = \\sum x_i\\,p_i$ ; une fréquence se rapproche de la probabilité.", ["loi_grands_nombres"], () => genLgn(4)),
  gab("terminale_spe_conc_lgn_tpl_e5", "concentration_loi_grands_nombres", 5,
    "Sur $N$ parties, le total est proche de $N \\times E(X)$.", ["loi_grands_nombres"], () => genLgn(5)),
  gab("terminale_spe_conc_fluc_tpl_e2", "concentration_fluctuation", 2,
    "$E(F_n) = p$ et $V(F_n) = \\dfrac{p(1-p)}{n}$.", ["fluctuation", "short"], () => genFluc(2)),
  gab("terminale_spe_conc_fluc_tpl_e4", "concentration_fluctuation", 4,
    "Minorant : $1 - \\dfrac{p(1-p)}{n\\delta^2}$ ; si $p$ est inconnu, $p(1-p) \\le 0{,}25$.", ["fluctuation", "short"], () => genFluc(4)),
  gab("terminale_spe_conc_fluc_tpl_e5", "concentration_fluctuation", 5,
    "Résous $\\dfrac{p(1-p)}{n\\delta^2} \\le \\alpha$ et prends le premier entier.", ["fluctuation", "short"], () => genFluc(5)),
  gab("terminale_spe_conc_defi_tpl_e4", "concentration_defi", 4,
    "Identifie $V(X)$ (ou $p(1-p)$), $n$ et $\\delta$, puis applique l'inégalité de concentration.", ["defi", "short"], () => genDefi(4)),
  gab("terminale_spe_conc_defi_tpl_e5", "concentration_defi", 5,
    "Le majorant $\\dfrac{V(X)}{n\\delta^2}$ : $n$ au dénominateur, $\\delta$ au carré.", ["defi", "short"], () => genDefi(5)),
];
