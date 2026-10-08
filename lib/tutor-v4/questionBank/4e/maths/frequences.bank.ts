// lib/tutor-v4/questionBank/4e/maths/frequences.bank.ts
//
// ⭐ NOTION OUVERTE LE 28/08/2026 : `proba_frequence`, le lien entre la
// fréquence observée et la probabilité calculée. Elle ferme la puce
// 4e-B-probabilites-7 du BO — « Faire le lien entre fréquence et probabilité » —
// qui était vide : le mot « fréquence » n'existait dans `probabilites.bank.ts`
// que comme LEURRE d'un QCM de vocabulaire.
//
// ⭐ TROIS MICROS RÉACTIVENT LA 6e, avec ses identifiants exacts
// (`proba_frequence_calculer`, `_comparer`, `_repeter`). La règle est posée
// depuis les échelles : renvoyer un élève de 4e vers une fiche de 6e serait un
// jugement, et le moteur d'étoiles fait le tri sans rien dire à personne.
//
// ⭐⭐ ET LE SAUT DE LA 4e EST LE PREMIER RAISONNEMENT STATISTIQUE DE LA
// SCOLARITÉ. La 6e CONSTATE que l'écart se réduit quand on répète ; la 4e dit
// POURQUOI ça compte : six lancers donnant quatre « pile » ne prouvent rien,
// six cents lancers donnant quatre cents « pile » prouvent que la pièce est
// truquée. C'est la TAILLE DE L'ÉCHANTILLON qui décide de ce qu'on a le droit
// de conclure — et cette idée ne se redit nulle part ailleurs au programme.
//
// ⛔ LE PIÈGE PÉDAGOGIQUE, ET IL EST SYMÉTRIQUE. Deux erreurs opposées guettent,
// et les items traitent LES DEUX :
//   · exiger que l'expérience donne le résultat calculé (« la probabilité est
//     1/2, donc sur 10 lancers il doit y avoir 5 piles ») ;
//   · en déduire que le calcul est faux quand elle ne le donne pas.
// La vérité tient entre les deux : l'écart est NORMAL, et il se resserre quand
// le nombre d'essais grandit.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux deux VALEURS
// PARTICULIÈRES : la définition d'une fréquence, et le cas emblématique des
// dix lancers qui ne prouvent rien.
//
// ⭐⭐ 04/10/2026 — LES PHRASES REVENAIENT. Mesuré avec
// scripts/mesurer-squelettes-coach.ts : 2 à 6 squelettes d'énoncés par micro,
// 15 à 19 répétitions sur 20 questions. Chaque gabarit compose désormais une
// EXPÉRIENCE (table `CONTEXTES` : dé, pièce, roue, sac, cartes, tableur, coffre
// de jeu vidéo, punaise, bouchon, gobelet, tartine, lancers francs, graines,
// ampoules, feu tricolore, tirs au but, météo, sorties en mer…) × une TOURNURE.
//
// ⭐ HONNÊTETÉ STATISTIQUE. Quand un énoncé dit « l'écart est normal » ou
// « l'écart est suspect », le générateur le VÉRIFIE par la loi binomiale
// (`queueBinomiale`) avant de servir la question : un « c'est le hasard » ne
// doit jamais être servi sur un tirage qui n'arriverait qu'une fois sur cent.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type {
  CanvasProbabilitesData,
  StatGraphCanvasData,
  TableauDonneesCanvasData,
} from "@/lib/tutor-v4/types_canvas";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois : il faut
// donc fournir PLUS de quatre leurres, sinon le QCM tombe à trois lignes.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/** QCM de NOMBRES : deux écritures de même valeur (« 2/4 » et « 1/2 ») ne cohabitent jamais. */
function choixValeurs(
  correct: { t: string; v: number },
  wrongs: { t: string; v: number }[]
) {
  const vues = [correct.v];
  const out: string[] = [];
  for (const w of shuffle(wrongs)) {
    if (!Number.isFinite(w.v) || vues.some((v) => Math.abs(v - w.v) < 1e-9)) continue;
    vues.push(w.v);
    out.push(w.t);
    if (out.length === 3) break;
  }
  return shuffle([correct.t, ...out]);
}

/** 1500 → « 1 500 » ; 0.42 → « 0,42 ». L'élève lit des nombres français. */
function fr(n: number): string {
  return Number.isInteger(n)
    ? n.toLocaleString("fr-FR").replace(/[  ]/g, " ")
    : String(n).replace(".", ",");
}

/** Une fréquence en pourcentage, arrondie au dixième s'il le faut. */
function pct(part: number, total: number): string {
  const v = Math.round((part / total) * 1000) / 10;
  return fr(v) + " %";
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function pgcd(a: number, b: number): number {
  return b === 0 ? a : pgcd(b, a % b);
}

/** 12/40 → « 3/10 ». */
function fracIrr(k: number, n: number): string {
  const d = pgcd(k, n);
  return `${k / d}/${n / d}`;
}

/** P(X ≥ k) si k est au-dessus de la moyenne, P(X ≤ k) sinon — X suit la loi binomiale (n, p). */
function queueBinomiale(n: number, p: number, k: number): number {
  const lf = [0];
  for (let i = 1; i <= n; i++) lf[i] = lf[i - 1] + Math.log(i);
  const pmf = (i: number) =>
    Math.exp(lf[n] - lf[i] - lf[n - i] + i * Math.log(p) + (n - i) * Math.log(1 - p));
  let s = 0;
  if (k >= n * p) for (let i = k; i <= n; i++) s += pmf(i);
  else for (let i = 0; i <= k; i++) s += pmf(i);
  return Math.min(1, s);
}

/** « environ 23 % du temps » / « moins d'une fois sur mille ». */
function direQueue(q: number): string {
  if (q < 0.001) return "moins d'une fois sur mille";
  if (q < 0.01) return "moins d'une fois sur cent";
  return `environ ${Math.round(q * 100)} % du temps`;
}

// ⭐ LE DÉ, LA ROUE ET LES BILLES — les trois objets du hasard que l'élève
// reconnaît. On les fait tourner pour que l'expérience change de support sans
// que la question change de nature.
function de(faces: Array<1 | 2 | 3 | 4 | 5 | 6>, surligne?: Array<1 | 2 | 3 | 4 | 5 | 6>): CanvasProbabilitesData {
  return {
    kind: "probabilites",
    variant: "de",
    de: { faces, surligne },
    size: { width: 300, height: 190 },
  };
}

function billes(n1: number, c1: string, n2: number, c2: string): CanvasProbabilitesData {
  return {
    kind: "probabilites",
    variant: "billes",
    billes: {
      elements: [
        ...Array.from({ length: n1 }, () => ({ couleur: c1 })),
        ...Array.from({ length: n2 }, () => ({ couleur: c2 })),
      ],
    },
    size: { width: 300, height: 190 },
  };
}

// ⭐ LA COURBE QUI SE STABILISE. C'est le dessin de la notion : la fréquence
// observée saute dans tous les sens sur les premiers essais, puis se colle à la
// probabilité quand le nombre d'essais grandit. Aucune phrase ne le montre
// aussi vite.
function barresFrequence(
  data: { label: string; value: number; color?: string }[]
): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    graphType: "barres",
    data,
    display: { showValues: true, showLabels: true },
    size: { width: 300, height: 190 },
  };
}

function tableau(
  headers: string[],
  rows: { values: (string | number)[] }[],
  caption?: string,
  highlight?: { row?: number; col?: number }
): TableauDonneesCanvasData {
  return {
    kind: "tableau_donnees",
    headers,
    rows,
    caption,
    highlight,
    display: { compact: true, striped: true },
  };
}

/* ===========================================================================
   LES EXPÉRIENCES — situations × tournures
   ===========================================================================
   Chaque contexte est une FABRIQUE (la face du dé, la composition du sac… sont
   tirées à chaque appel). Les phrases sont écrites pour se lire après un
   prénom (`action`), après deux-points (`res`), ou seules (`resNom`).        */

type Face = 1 | 2 | 3 | 4 | 5 | 6;

type Ctx = {
  /** « lance une punaise 50 fois » — se lit après un prénom ou « on ». */
  action: (n: string) => string;
  /** « elle retombe 18 fois pointe en haut » — se lit après « : ». */
  res: (k: string) => string;
  /** « la punaise est retombée 18 fois pointe en haut » — phrase autonome. */
  resNom: (k: string) => string;
  /** Pluriel et singulier du mot « essai » dans ce contexte. */
  essais: string;
  essai: string;
  /** Ce qui suit « la fréquence » : « de l'issue « pointe en haut » ». */
  freq: string;
  /** L'issue et son contraire, entre guillemets. */
  evt: string;
  autre: string;
  /** « Combien de fois la punaise est-elle retombée pointe en haut ? » */
  combien: string;
  /** Fréquences plausibles, en pourcentage entier. */
  plage: [number, number];
  /** Nombre d'essais plausible au plus (on ne relève pas la météo 5 000 jours). */
  maxN: number;
  /** Probabilité calculable (situation équiprobable), sinon absente. */
  proba?: { num: number; den: number };
  /** « le dé est truqué » — l'hypothèse qu'on soupçonne. */
  truque?: string;
  /** « aucun « pile » n'est sorti lors des 6 derniers lancers » */
  aucun?: (k: string) => string;
  canvas?: CanvasProbabilitesData;
};

function autour(num: number, den: number, d: number): [number, number] {
  const p = (100 * num) / den;
  return [Math.max(2, Math.floor(p - d)), Math.min(98, Math.ceil(p + d))];
}

const CONTEXTES_PROBA: (() => Ctx)[] = [
  () => {
    const f = randomInt(1, 6) as Face;
    return {
      action: (n) => `lance un dé cubique équilibré ${n} fois`,
      res: (k) => `le ${f} sort ${k} fois`,
      resNom: (k) => `le ${f} est sorti ${k} fois`,
      essais: "lancers",
      essai: "lancer",
      freq: `du ${f}`,
      evt: `« ${f} »`,
      autre: "« autre face »",
      combien: `Combien de fois le ${f} est-il sorti ?`,
      plage: [10, 24],
      maxN: 100000,
      proba: { num: 1, den: 6 },
      truque: "le dé est truqué",
      aucun: (k) => `le ${f} n'est sorti à aucun des ${k} derniers lancers d'un dé équilibré`,
      canvas: de([1, 2, 3, 4, 5, 6], [f]),
    };
  },
  () => ({
    action: (n) => `lance un dé cubique équilibré ${n} fois`,
    res: (k) => `un nombre pair sort ${k} fois`,
    resNom: (k) => `un nombre pair est sorti ${k} fois`,
    essais: "lancers",
    essai: "lancer",
    freq: "des nombres pairs",
    evt: "« nombre pair »",
    autre: "« nombre impair »",
    combien: "Combien de fois un nombre pair est-il sorti ?",
    plage: [40, 60],
    maxN: 100000,
    proba: { num: 1, den: 2 },
    truque: "le dé est truqué",
    aucun: (k) => `aucun nombre pair n'est sorti lors des ${k} derniers lancers d'un dé équilibré`,
    canvas: de([1, 2, 3, 4, 5, 6], [2, 4, 6]),
  }),
  () => ({
    action: (n) => `lance une pièce de monnaie ${n} fois`,
    res: (k) => `elle tombe ${k} fois sur « pile »`,
    resNom: (k) => `la pièce est tombée ${k} fois sur « pile »`,
    essais: "lancers",
    essai: "lancer",
    freq: "de « pile »",
    evt: "« pile »",
    autre: "« face »",
    combien: "Combien de « pile » a-t-on obtenus ?",
    plage: [40, 60],
    maxN: 100000,
    proba: { num: 1, den: 2 },
    truque: "la pièce est truquée",
    aucun: (k) => `une pièce équilibrée est tombée sur « face » à chacun des ${k} derniers lancers`,
  }),
  () => {
    const s = randomChoice([4, 5, 10]);
    return {
      action: (n) => `fait tourner ${n} fois une roue de loterie partagée en ${s} secteurs égaux (un seul est rouge)`,
      res: (k) => `la roue s'arrête ${k} fois sur le rouge`,
      resNom: (k) => `la roue s'est arrêtée ${k} fois sur le rouge`,
      essais: "tours",
      essai: "tour",
      freq: "du secteur rouge",
      evt: "« rouge »",
      autre: "« autre couleur »",
      combien: "Combien de fois la roue s'est-elle arrêtée sur le rouge ?",
      plage: autour(1, s, 8),
      maxN: 100000,
      proba: { num: 1, den: s },
      truque: "la roue est truquée",
      aucun: (k) => `une roue partagée en ${s} secteurs égaux, dont un rouge, ne s'est arrêtée sur le rouge à aucun des ${k} derniers tours`,
    };
  },
  () => {
    const v = randomInt(2, 4);
    return {
      action: (n) => `tire ${n} fois, avec remise, une boule dans un sac de ${v} boules vertes et ${10 - v} boules jaunes`,
      res: (k) => `une boule verte sort ${k} fois`,
      resNom: (k) => `une boule verte est sortie ${k} fois`,
      essais: "tirages",
      essai: "tirage",
      freq: "des boules vertes",
      evt: "« boule verte »",
      autre: "« boule jaune »",
      combien: "Combien de fois une boule verte est-elle sortie ?",
      plage: autour(v, 10, 8),
      maxN: 100000,
      proba: { num: v, den: 10 },
      truque: "le sac n'a pas la composition annoncée",
      aucun: (k) => `en tirant avec remise dans un sac de ${v} boules vertes et ${10 - v} boules jaunes, aucune boule verte n'est sortie lors des ${k} derniers tirages`,
      canvas: billes(v, "#16a34a", 10 - v, "#facc15"),
    };
  },
  () => ({
    action: (n) => `tire ${n} fois, avec remise, une carte dans un jeu de 32 cartes`,
    res: (k) => `un cœur sort ${k} fois`,
    resNom: (k) => `un cœur est sorti ${k} fois`,
    essais: "tirages",
    essai: "tirage",
    freq: "des cœurs",
    evt: "« cœur »",
    autre: "« autre couleur »",
    combien: "Combien de cœurs sont sortis ?",
    plage: [17, 33],
    maxN: 100000,
    proba: { num: 1, den: 4 },
    truque: "le jeu de cartes est truqué",
    aucun: (k) => `en tirant avec remise dans un jeu de 32 cartes, aucun cœur n'est sorti lors des ${k} derniers tirages`,
  }),
  () => {
    const f = randomInt(1, 4);
    return {
      action: (n) => `lance ${n} fois un dé équilibré à 4 faces`,
      res: (k) => `le ${f} sort ${k} fois`,
      resNom: (k) => `le ${f} est sorti ${k} fois`,
      essais: "lancers",
      essai: "lancer",
      freq: `du ${f}`,
      evt: `« ${f} »`,
      autre: "« autre face »",
      combien: `Combien de fois le ${f} est-il sorti ?`,
      plage: [17, 33],
      maxN: 100000,
      proba: { num: 1, den: 4 },
      truque: "le dé est truqué",
      aucun: (k) => `le ${f} n'est sorti à aucun des ${k} derniers lancers d'un dé à 4 faces équilibré`,
    };
  },
  () => {
    const m = randomInt(1, 10);
    return {
      action: (n) => `fait simuler par un tableur ${n} tirages d'un nombre entier au hasard entre 1 et 10`,
      res: (k) => `le ${m} sort ${k} fois`,
      resNom: (k) => `le ${m} est sorti ${k} fois`,
      essais: "tirages",
      essai: "tirage",
      freq: `du ${m}`,
      evt: `« ${m} »`,
      autre: "« autre nombre »",
      combien: `Combien de fois le ${m} est-il sorti ?`,
      plage: [4, 16],
      maxN: 100000,
      proba: { num: 1, den: 10 },
      truque: "le tableur est déréglé",
      aucun: (k) => `un tableur qui tire un entier au hasard entre 1 et 10 n'a donné le ${m} à aucun des ${k} derniers tirages`,
    };
  },
  () => {
    const s = randomChoice([4, 5]);
    const f = randomInt(1, s);
    return {
      action: (n) => `tire ${n} fois, avec remise, un jeton dans une boîte de jetons numérotés de 1 à ${s}`,
      res: (k) => `le jeton n° ${f} sort ${k} fois`,
      resNom: (k) => `le jeton n° ${f} est sorti ${k} fois`,
      essais: "tirages",
      essai: "tirage",
      freq: `du jeton n° ${f}`,
      evt: `« jeton n° ${f} »`,
      autre: "« autre jeton »",
      combien: `Combien de fois le jeton n° ${f} est-il sorti ?`,
      plage: autour(1, s, 8),
      maxN: 100000,
      proba: { num: 1, den: s },
      truque: "la boîte est truquée",
      aucun: (k) => `dans une boîte de jetons numérotés de 1 à ${s}, tirés avec remise, le jeton n° ${f} n'est sorti à aucun des ${k} derniers tirages`,
    };
  },
  () => {
    const s = randomChoice([4, 5, 10]);
    return {
      action: (n) => `ouvre ${n} coffres dans un jeu vidéo (le jeu annonce une chance sur ${s} d'y trouver un objet rare)`,
      res: (k) => `un objet rare apparaît ${k} fois`,
      resNom: (k) => `un objet rare est apparu ${k} fois`,
      essais: "coffres ouverts",
      essai: "coffre",
      freq: "des objets rares",
      evt: "« objet rare »",
      autre: "« rien de rare »",
      combien: "Combien de fois un objet rare est-il apparu ?",
      plage: autour(1, s, 8),
      maxN: 100000,
      proba: { num: 1, den: s },
      truque: "le jeu ment sur ses chances",
      aucun: (k) => `dans un jeu vidéo qui annonce une chance sur ${s} de trouver un objet rare dans un coffre, aucun objet rare n'est apparu dans les ${k} derniers coffres`,
    };
  },
];

const CONTEXTES_MESURE: (() => Ctx)[] = [
  () => ({
    action: (n) => `lance une punaise ${n} fois`,
    res: (k) => `elle retombe ${k} fois pointe en haut`,
    resNom: (k) => `la punaise est retombée ${k} fois pointe en haut`,
    essais: "lancers",
    essai: "lancer",
    freq: "de l'issue « pointe en haut »",
    evt: "« pointe en haut »",
    autre: "« pointe en bas »",
    combien: "Combien de fois la punaise est-elle retombée pointe en haut ?",
    plage: [30, 70],
    maxN: 100000,
  }),
  () => ({
    action: (n) => `lance un bouchon de bouteille ${n} fois`,
    res: (k) => `il retombe ${k} fois sur le côté`,
    resNom: (k) => `le bouchon est retombé ${k} fois sur le côté`,
    essais: "lancers",
    essai: "lancer",
    freq: "de l'issue « sur le côté »",
    evt: "« sur le côté »",
    autre: "« à plat »",
    combien: "Combien de fois le bouchon est-il retombé sur le côté ?",
    plage: [55, 85],
    maxN: 100000,
  }),
  () => ({
    action: (n) => `lance un gobelet en plastique ${n} fois`,
    res: (k) => `il retombe ${k} fois debout`,
    resNom: (k) => `le gobelet est retombé ${k} fois debout`,
    essais: "lancers",
    essai: "lancer",
    freq: "de l'issue « debout »",
    evt: "« debout »",
    autre: "« couché »",
    combien: "Combien de fois le gobelet est-il retombé debout ?",
    plage: [10, 30],
    maxN: 100000,
  }),
  () => ({
    action: (n) => `fait tomber ${n} fois une tartine beurrée du bord de la table`,
    res: (k) => `elle atterrit ${k} fois côté beurre`,
    resNom: (k) => `la tartine a atterri ${k} fois côté beurre`,
    essais: "chutes",
    essai: "chute",
    freq: "de l'issue « côté beurre »",
    evt: "« côté beurre »",
    autre: "« côté pain »",
    combien: "Combien de fois la tartine a-t-elle atterri côté beurre ?",
    plage: [45, 75],
    maxN: 5000,
  }),
  () => ({
    action: (n) => `tente ${n} lancers francs au basket`,
    res: (k) => `${k} sont réussis`,
    resNom: (k) => `${k} ont été réussis`,
    essais: "lancers francs",
    essai: "lancer franc",
    freq: "des lancers francs réussis",
    evt: "« réussi »",
    autre: "« raté »",
    combien: "Combien de lancers francs ont été réussis ?",
    plage: [55, 85],
    maxN: 500,
  }),
  () => ({
    action: (n) => `sème ${n} graines de tomate`,
    res: (k) => `${k} d'entre elles germent`,
    resNom: (k) => `${k} ont germé`,
    essais: "graines semées",
    essai: "graine",
    freq: "des graines qui ont germé",
    evt: "« a germé »",
    autre: "« n'a pas germé »",
    combien: "Combien de graines ont germé ?",
    plage: [60, 95],
    maxN: 100000,
  }),
  () => ({
    action: (n) => `teste ${n} ampoules prises au hasard dans la production d'une usine`,
    res: (k) => `${k} sont défectueuses`,
    resNom: (k) => `${k} étaient défectueuses`,
    essais: "ampoules testées",
    essai: "ampoule",
    freq: "des ampoules défectueuses",
    evt: "« défectueuse »",
    autre: "« en bon état »",
    combien: "Combien d'ampoules étaient défectueuses ?",
    plage: [2, 10],
    maxN: 100000,
  }),
  () => ({
    action: (n) => `passe à vélo devant le même feu tricolore pendant ${n} matins`,
    res: (k) => `le feu est rouge ${k} fois`,
    resNom: (k) => `le feu était rouge ${k} fois`,
    essais: "passages",
    essai: "passage",
    freq: "de l'issue « feu rouge »",
    evt: "« feu rouge »",
    autre: "« feu vert ou orange »",
    combien: "Combien de fois le feu était-il rouge ?",
    plage: [25, 55],
    maxN: 200,
  }),
  () => ({
    action: (n) => `fait ${n} sorties en mer au large de Saint-Gilles`,
    res: (k) => `des dauphins sont aperçus ${k} fois`,
    resNom: (k) => `des dauphins ont été aperçus ${k} fois`,
    essais: "sorties",
    essai: "sortie",
    freq: "des sorties avec dauphins",
    evt: "« dauphins aperçus »",
    autre: "« pas de dauphins »",
    combien: "Lors de combien de sorties a-t-on aperçu des dauphins ?",
    plage: [40, 80],
    maxN: 100,
  }),
  () => ({
    action: (n) => `observe ${n} tirs au but d'un même attaquant`,
    res: (k) => `le ballon part ${k} fois à droite du gardien`,
    resNom: (k) => `le ballon est parti ${k} fois à droite du gardien`,
    essais: "tirs",
    essai: "tir",
    freq: "des tirs à droite",
    evt: "« à droite »",
    autre: "« à gauche ou au centre »",
    combien: "Combien de tirs sont partis à droite du gardien ?",
    plage: [35, 65],
    maxN: 500,
  }),
  () => ({
    action: (n) => `relève la météo pendant ${n} jours`,
    res: (k) => `il pleut ${k} jours`,
    resNom: (k) => `il a plu ${k} jours`,
    essais: "jours",
    essai: "jour",
    freq: "des jours de pluie",
    evt: "« pluie »",
    autre: "« sec »",
    combien: "Combien de jours a-t-il plu ?",
    plage: [20, 60],
    maxN: 100,
  }),
];

const CONTEXTES = [...CONTEXTES_PROBA, ...CONTEXTES_MESURE];

const PRENOMS = [
  "Léa", "Nathan", "Inès", "Hugo", "Chloé", "Yanis", "Jade", "Malo", "Sofia", "Adam",
  "Lina", "Noah", "Emma", "Rayan", "Zoé", "Tom", "Maëlys", "Kylian", "Rose", "Sacha",
];

/** « de Léa », « d'Inès », « d'un journaliste », « d'une association ». */
function deQui(q: string): string {
  const s = q.replace(/^Un /, "un ").replace(/^Une /, "une ");
  // ⛔ 08/10 : pas de « Y » — « de Yanis », pas « d'Yanis ».
  return /^[AEIOUÉÈÂaeiouéèâ]/.test(s) ? `d'${s}` : `de ${s}`;
}

function deuxPrenoms(): [string, string] {
  const a = randomChoice(PRENOMS);
  let b = randomChoice(PRENOMS);
  while (b === a) b = randomChoice(PRENOMS);
  return [a, b];
}

/** Tire un contexte qui vérifie le filtre (la face du dé, la roue… changent à chaque appel). */
function tirerCtx(liste: (() => Ctx)[], filtre: (c: Ctx) => boolean = () => true): Ctx {
  for (let t = 0; t < 200; t++) {
    const c = randomChoice(liste)();
    if (filtre(c)) return c;
  }
  return liste[0]();
}

const pctEntier = (c: Ctx) => !!c.proba && ((100 * c.proba.num) % c.proba.den === 0);
const probaTxt = (c: Ctx) => `${c.proba!.num}/${c.proba!.den}`;
const probaPct = (c: Ctx) => (100 * c.proba!.num) / c.proba!.den;

/** n essais et k succès dont la fréquence est un pourcentage ENTIER, dans la plage du contexte. */
function tirerSerie(c: Ctx, tailles: number[]): { n: number; k: number; p: number } {
  const ok = tailles.filter((n) => n <= c.maxN);
  const liste = ok.length ? ok : [Math.min(...tailles)];
  for (let t = 0; t < 300; t++) {
    const n = randomChoice(liste);
    const p = randomInt(c.plage[0], c.plage[1]);
    const k = (n * p) / 100;
    if (Number.isInteger(k) && k > 0 && k < n && 2 * k !== n) return { n, k, p };
  }
  return { n: 100, k: c.plage[0], p: c.plage[0] };
}

const TAILLES = [20, 25, 40, 50, 80, 100, 200, 250, 400, 500];

/** Trois façons de raconter la même série. */
function raconter(c: Ctx, qui: string, n: number, k: number): string {
  const N = fr(n);
  const K = fr(k);
  return randomChoice([
    `${qui} ${c.action(N)} : ${c.res(K)}.`,
    `${qui} ${c.action(N)}. Sur ces ${N} ${c.essais}, ${c.resNom(K)}.`,
    `${qui} ${c.action(N)} et note les résultats : ${c.evt} ${K} fois, ${c.autre} ${fr(n - k)} fois.`,
  ]);
}

/* --- Les sondages : la taille de l'échantillon hors du jeu de hasard. --- */
type Sondage = {
  pop: string; // « élèves du collège »
  verbe: string; // « viennent à vélo »
  unite: string; // « élèves »
  f: boolean; // unité féminine (accord de « choisis »)
  enquete: (n: string) => string; // « interroge 12 élèves du collège »
};

const SONDAGES: Sondage[] = [
  { pop: "élèves du collège", verbe: "viennent à vélo", unite: "élèves", f: false, enquete: (n) => `interroge ${n} élèves du collège` },
  { pop: "habitants de la ville", verbe: "trient leurs déchets", unite: "habitants", f: false, enquete: (n) => `interroge ${n} habitants de la ville` },
  { pop: "clients de la boulangerie", verbe: "achètent une baguette tradition", unite: "clients", f: false, enquete: (n) => `observe ${n} clients de la boulangerie` },
  { pop: "spectateurs du concert", verbe: "sont venus en transports en commun", unite: "spectateurs", f: false, enquete: (n) => `interroge ${n} spectateurs du concert` },
  { pop: "voitures qui passent sur l'autoroute", verbe: "sont électriques", unite: "voitures", f: true, enquete: (n) => `observe ${n} voitures sur l'autoroute` },
  { pop: "graines du sachet", verbe: "germent", unite: "graines", f: true, enquete: (n) => `sème ${n} graines du sachet` },
  { pop: "pièces fabriquées par l'usine", verbe: "sont défectueuses", unite: "pièces", f: true, enquete: (n) => `contrôle ${n} pièces fabriquées par l'usine` },
  { pop: "adultes du pays", verbe: "font du sport chaque semaine", unite: "adultes", f: false, enquete: (n) => `interroge ${n} adultes` },
  { pop: "coureurs du marathon", verbe: "finissent en moins de quatre heures", unite: "coureurs", f: false, enquete: (n) => `relève le temps de ${n} coureurs du marathon` },
  { pop: "élèves du conservatoire", verbe: "jouent du piano", unite: "élèves", f: false, enquete: (n) => `interroge ${n} élèves du conservatoire` },
  { pop: "randonneurs du piton des Neiges", verbe: "partent avant l'aube", unite: "randonneurs", f: false, enquete: (n) => `interroge ${n} randonneurs du piton des Neiges` },
  { pop: "foyers de la commune", verbe: "ont un potager", unite: "foyers", f: false, enquete: (n) => `interroge ${n} foyers de la commune` },
  { pop: "abeilles du rucher", verbe: "portent un parasite", unite: "abeilles", f: true, enquete: (n) => `examine ${n} abeilles du rucher` },
  { pop: "cyclistes de la ville", verbe: "portent un casque", unite: "cyclistes", f: false, enquete: (n) => `observe ${n} cyclistes de la ville` },
  { pop: "lecteurs de la médiathèque", verbe: "empruntent des bandes dessinées", unite: "lecteurs", f: false, enquete: (n) => `interroge ${n} lecteurs de la médiathèque` },
];

export const frequencesBank: TutorBankItemV4[] = [
  /* =========================================================================
     PROBA_FREQUENCE_CALCULER — réactivation 6e, énoncés de 4e
  ========================================================================= */
  {
    // ⭐ VALEUR PARTICULIÈRE : la définition. Une fréquence n'est pas un
    // effectif, et la confusion est la première erreur du chapitre.
    kind: "fixed",
    id: "4e_proba_frequence_calculer_fixed_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_calculer",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'est-ce qu'une fréquence observée ?",
    format: "qcm",
    choices: [
      "le nombre de fois où l'événement s'est produit",
      "ce nombre divisé par le nombre total d'essais",
      "le nombre total d'essais",
      "la probabilité calculée à l'avance",
    ],
    expected: ["ce nombre divisé par le nombre total d'essais"],
    comparator: "mcq_exact",
    hint: "Une fréquence se compare à 1, un effectif non.",
    explanation:
      "Définition : la fréquence observée d'un événement est le nombre de fois où il s'est produit, DIVISÉ par le nombre total d'essais.\n\n" +
      "Méthode : on distingue l'EFFECTIF (un comptage) de la FRÉQUENCE (une part).\n\n" +
      "Calcul : sur 50 lancers avec 20 « pile », l'effectif est 20 et la fréquence est 20 ÷ 50 = 0,4, soit 40 %.\n\n" +
      "Conclusion : une fréquence est toujours comprise entre 0 et 1 — comme une probabilité, et c'est ce qui permet de les comparer.",
    tags: ["frequence", "definition", "valeur_particuliere", "qcm"],
  },
  {
    // ★1 — écrire la fréquence comme une fraction « succès / essais ».
    kind: "template",
    id: "4e_proba_frequence_calculer_tpl_4_fraction",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_calculer",
    difficulty: 1,
    theme: "neutral",
    hint: "Fréquence = nombre de fois où l'issue sort ÷ nombre total d'essais.",
    tags: ["frequence", "fraction", "template"],
    generate: () => {
      const c = tirerCtx(CONTEXTES);
      const { n, k } = tirerSerie(c, [10, 20, 25, 40, 50]);
      const qui = randomChoice(PRENOMS);
      const q = randomChoice([
        `Écris la fréquence ${c.freq} sous forme d'une fraction.`,
        `Quelle est la fréquence ${c.freq} ? Donne-la sous forme de fraction.`,
        `Donne, sous forme de fraction, la fréquence ${c.freq}.`,
        `Quelle fraction des ${c.essais} correspond à l'issue ${c.evt} ?`,
      ]);
      const irr = fracIrr(k, n);
      return {
        text: `${raconter(c, qui, n, k)} ${q}`,
        format: "short",
        expected: [`${k}/${n}`, irr, fr(k / n)],
        comparator: "number_equal",
        explanation:
          "Définition : la fréquence d'une issue est le nombre de fois où elle s'est produite, divisé par le nombre total d'essais.\n\n" +
          `Méthode : on place en haut l'effectif de l'issue ${c.evt} (${fr(k)}), en bas le TOTAL des ${c.essais} (${fr(n)}).\n\n` +
          `Calcul : fréquence = ${fr(k)}/${fr(n)}${irr !== `${k}/${n}` ? `, qui se simplifie en ${irr}` : ""}, soit ${fr(k / n)}.\n\n` +
          `Conclusion : ⚠️ on divise par le total (${fr(n)}), jamais par le nombre de fois où l'issue n'est pas sortie (${fr(n - k)}).`,
        canvas: c.canvas,
      };
    },
  },
  {
    // ★1 — reconnaître l'écriture de la fréquence parmi les pièges classiques.
    kind: "template",
    id: "4e_proba_frequence_calculer_tpl_5_ecriture",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_calculer",
    difficulty: 1,
    theme: "neutral",
    hint: "En haut : l'issue qui nous intéresse. En bas : TOUS les essais.",
    tags: ["frequence", "fraction", "qcm", "template"],
    generate: () => {
      const c = tirerCtx(CONTEXTES);
      const { n, k } = tirerSerie(c, [10, 20, 25, 40, 50]);
      const qui = randomChoice(PRENOMS);
      const q = randomChoice([
        `Laquelle de ces écritures donne la fréquence ${c.freq} ?`,
        `Quelle est la fréquence ${c.freq} ?`,
        `Que vaut la fréquence ${c.freq} ?`,
        `Quelle écriture correspond à la fréquence ${c.freq} ?`,
      ]);
      const correct = `${k}/${n}`;
      return {
        text: `${raconter(c, qui, n, k)} ${q}`,
        format: "qcm",
        choices: choixValeurs({ t: correct, v: k / n }, [
          { t: `${n}/${k}`, v: n / k },
          { t: fr(k), v: k },
          { t: `${k}/${n - k}`, v: k / (n - k) },
          { t: `${n - k}/${n}`, v: (n - k) / n },
          { t: fr(n), v: n },
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : fréquence = effectif de l'issue ÷ nombre total d'essais.\n\n" +
          `Méthode : l'issue ${c.evt} est sortie ${fr(k)} fois sur ${fr(n)} ${c.essais}.\n\n` +
          `Calcul : fréquence = ${k}/${n} = ${fr(k / n)}.\n\n` +
          `Conclusion : ⚠️ ${fr(k)} seul est un EFFECTIF ; ${k}/${n - k} compare l'issue à son contraire ; ${n - k}/${n} est la fréquence de ${c.autre}.`,
        canvas: c.canvas,
      };
    },
  },
  {
    kind: "template",
    id: "4e_proba_frequence_calculer_tpl_1_de",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "On divise le nombre de succès par le nombre total de lancers.",
    tags: ["frequence", "de", "template", "canvas"],
    generate: () => {
      const total = randomChoice([20, 25, 50, 100, 200]);
      const face = randomInt(1, 6) as Face;
      let succes = 0;
      do {
        succes = (total * randomInt(10, 25)) / 100;
      } while (!Number.isInteger(succes) || succes === 0);
      const qui = randomChoice(PRENOMS);
      const objet = randomChoice([
        { a: "un dé cubique", de: "d'un dé cubique" },
        { a: "un dé à six faces", de: "d'un dé à six faces" },
        { a: "le dé d'un jeu de société", de: "du dé d'un jeu de société" },
        { a: "un dé équilibré", de: "d'un dé équilibré" },
      ]);
      const T = fr(total);
      const S = fr(succes);
      const recit = randomChoice([
        `${qui} lance ${objet.a} ${T} fois. Le ${face} sort ${S} fois.`,
        `Sur ${T} lancers ${objet.de}, le ${face} est sorti ${S} fois.`,
        `Le ${face} est sorti ${S} fois quand ${qui} a lancé ${objet.a} ${T} fois.`,
      ]);
      const q = randomChoice([
        `Quelle est la fréquence observée du ${face}, en pourcentage ?`,
        `Calcule la fréquence du ${face} et exprime-la en pourcentage.`,
        `En pourcentage, quelle est la fréquence de sortie du ${face} ?`,
        `Exprime en pourcentage la fréquence du ${face}.`,
      ]);
      // ⛔ 08/10 : (7 ÷ 50) × 100 valait 14,000000000000002 dans les réponses acceptées.
      const v = Math.round((succes * 1000) / total) / 10;
      return {
        text: `${recit} ${q}`,
        format: "short",
        expected: [pct(succes, total), fr(v)],
        comparator: "number_equal",
        explanation:
          "Définition : la fréquence observée est le nombre de succès divisé par le nombre d'essais.\n\n" +
          "Méthode : on divise, puis on convertit en pourcentage.\n\n" +
          `Calcul : ${S} ÷ ${T} = ${fr(succes / total)}, soit ${pct(succes, total)}.\n\n` +
          `Conclusion : ⚠️ ${S} tout seul est un EFFECTIF, pas une fréquence — il ne dit rien tant qu'on ignore sur combien de lancers.`,
        canvas: de([1, 2, 3, 4, 5, 6], [face]),
      };
    },
  },
  {
    kind: "template",
    id: "4e_proba_frequence_calculer_tpl_2_billes",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "La fréquence se compte sur le TOTAL des tirages.",
    tags: ["frequence", "billes", "qcm", "template", "canvas"],
    generate: () => {
      const total = randomChoice([5, 8, 10, 20, 25]);
      let rouges = 0;
      do {
        rouges = randomInt(1, total - 1);
      } while (2 * rouges === total);
      const autres = total - rouges;
      const obj = randomChoice([
        { pl: "billes", f: true },
        { pl: "jetons", f: false },
        { pl: "boules", f: true },
        { pl: "perles", f: true },
        { pl: "bonbons", f: false },
        { pl: "cubes", f: false },
      ]);
      const [c1, c2] = shuffle([
        { m: "rouges", f: "rouges", s: "rouge", hex: "#dc2626" },
        { m: "bleus", f: "bleues", s: "bleue", hex: "#2563eb" },
        { m: "verts", f: "vertes", s: "verte", hex: "#16a34a" },
        { m: "jaunes", f: "jaunes", s: "jaune", hex: "#facc15" },
        { m: "noirs", f: "noires", s: "noire", hex: "#111827" },
        { m: "violets", f: "violettes", s: "violette", hex: "#7c3aed" },
      ]);
      const coul1 = obj.f ? c1.f : c1.m;
      const coul2 = obj.f ? c2.f : c2.m;
      const contenant = randomChoice(["Un sac", "Une boîte", "Une urne", "Un bocal"]);
      const tous = obj.f ? "toutes" : "tous";
      const un = obj.f ? "une" : "un";
      const recit = randomChoice([
        `${contenant} contient ${rouges} ${obj.pl} ${coul1} et ${autres} ${coul2}. On les sort ${tous}, ${un} par ${un}, en notant la couleur.`,
        `On vide ${contenant.toLowerCase()} de ${total} ${obj.pl} en notant la couleur de chacun${obj.f ? "e" : ""} : ${rouges} sont ${coul1}, les autres sont ${coul2}.`,
        `Dans ${contenant.toLowerCase()}, il y a ${autres} ${obj.pl} ${coul2} et ${rouges} ${coul1}. On les tire ${tous}, ${un} par ${un}.`,
      ]);
      const q = randomChoice([
        `Quelle est la fréquence des ${obj.pl} ${coul1}, en pourcentage ?`,
        `En pourcentage, quelle est la fréquence de la couleur ${c1.s} ?`,
        `Quelle part des ${obj.pl} sont ${coul1} ? Donne la fréquence en pourcentage.`,
      ]);
      const correct = pct(rouges, total);
      return {
        text: `${recit} ${q}`,
        format: "qcm",
        choices: makeChoices(correct, [
          pct(rouges, autres),
          pct(autres, total),
          fr(rouges) + " %",
          pct(rouges, total + 1),
          pct(autres, rouges),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la fréquence rapporte une part au TOTAL, jamais à l'autre part.\n\n" +
          `Méthode : le total vaut ${rouges} + ${autres} = ${total} ${obj.pl}.\n\n` +
          `Calcul : ${rouges} ÷ ${total} = ${fr(rouges / total)}, soit ${correct}.\n\n` +
          `Conclusion : ⚠️ ${rouges} ÷ ${autres} comparerait les ${obj.pl} ${coul1} aux ${coul2} — c'est un ratio, pas une fréquence.`,
        canvas: billes(rouges, c1.hex, autres, c2.hex),
      };
    },
  },
  {
    // ★2 — la fréquence, dans les trois écritures, sur toutes les expériences.
    kind: "template",
    id: "4e_proba_frequence_calculer_tpl_3_situations",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise le nombre de fois où l'issue sort par le nombre TOTAL d'essais.",
    tags: ["frequence", "template"],
    generate: () => {
      const c = tirerCtx(CONTEXTES);
      const { n, k, p } = tirerSerie(c, TAILLES);
      const qui = randomChoice(PRENOMS);
      const forme = randomChoice(["pct", "dec", "frac"] as const);
      const q =
        forme === "pct"
          ? randomChoice([
              `Quelle est la fréquence ${c.freq}, en pourcentage ?`,
              `Exprime en pourcentage la fréquence ${c.freq}.`,
              `Calcule la fréquence ${c.freq} et donne-la en pourcentage.`,
            ])
          : forme === "dec"
            ? randomChoice([
                `Quelle est la fréquence ${c.freq}, sous forme décimale ?`,
                `Donne la fréquence ${c.freq} sous forme d'un nombre décimal.`,
                `Calcule la fréquence ${c.freq} en écriture décimale.`,
              ])
            : randomChoice([
                `Quelle est la fréquence ${c.freq}, sous forme de fraction irréductible ?`,
                `Écris la fréquence ${c.freq} sous forme d'une fraction irréductible.`,
              ]);
      const dec = p / 100;
      const irr = fracIrr(k, n);
      const expected =
        forme === "pct"
          ? [`${p} %`, String(p)]
          : forme === "dec"
            ? [fr(dec), irr, `${k}/${n}`]
            : [irr];
      return {
        text: `${raconter(c, qui, n, k)} ${q}`,
        format: "short",
        expected,
        comparator: "number_equal",
        explanation:
          "Définition : fréquence = nombre de fois où l'issue s'est produite ÷ nombre total d'essais.\n\n" +
          `Méthode : l'issue ${c.evt} : ${fr(k)} fois ; total : ${fr(n)} ${c.essais}.\n\n` +
          `Calcul : ${fr(k)}/${fr(n)}${irr !== `${fr(k)}/${fr(n)}` ? ` = ${irr}` : ""} = ${fr(dec)} = ${p} %.\n\n` +
          `Conclusion : la fréquence ${c.freq} vaut ${forme === "pct" ? `${p} %` : forme === "dec" ? fr(dec) : irr}. Les trois écritures disent la même chose ; on donne celle qui est demandée.`,
        canvas: c.canvas,
      };
    },
  },
  {
    // ★2 — le chemin inverse : de la fréquence à l'effectif.
    kind: "template",
    id: "4e_proba_frequence_calculer_tpl_6_effectif",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Effectif = fréquence × nombre total d'essais.",
    tags: ["frequence", "effectif", "template"],
    generate: () => {
      const c = tirerCtx(CONTEXTES);
      const { n, k, p } = tirerSerie(c, TAILLES);
      const qui = randomChoice(PRENOMS);
      const N = fr(n);
      const text = randomChoice([
        `${qui} ${c.action(N)}. La fréquence ${c.freq} est de ${p} %. ${c.combien}`,
        `${qui} ${c.action(N)}. La fréquence ${c.freq} vaut ${fr(p / 100)}. ${c.combien}`,
        // ⛔ 08/10 : plus de parenthèse autour de l'action — « (Malo ouvre 25 coffres
        // dans un jeu vidéo (le jeu annonce…)) » faisait deux parenthèses imbriquées.
        `Sur ${N} ${c.essais}, la fréquence ${c.freq} a été de ${p} % : c'est le relevé ${deQui(qui)}, qui ${c.action(N)}. ${c.combien}`,
        `${qui} ${c.action(N)} ; la fréquence ${c.freq} est égale à ${fracIrr(k, n)}. ${c.combien}`,
      ]);
      return {
        text,
        format: "short",
        expected: [fr(k), String(k)],
        comparator: "number_equal",
        explanation:
          "Définition : fréquence = effectif ÷ total, donc effectif = fréquence × total.\n\n" +
          `Méthode : on multiplie la fréquence par les ${N} ${c.essais}.\n\n` +
          `Calcul : ${p} % de ${N}, c'est ${fr(p / 100)} × ${N} = ${fr(k)}.\n\n` +
          `Conclusion : l'issue ${c.evt} s'est produite ${fr(k)} fois. Vérification : ${fr(k)} ÷ ${N} = ${fr(p / 100)}.`,
        canvas: c.canvas,
      };
    },
  },

  /* =========================================================================
     PROBA_FREQUENCE_COMPARER — l'observé contre le calculé
  ========================================================================= */
  {
    kind: "template",
    id: "4e_proba_frequence_comparer_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "La probabilité se calcule à l'avance, la fréquence se mesure après.",
    tags: ["frequence", "comparer", "qcm", "template", "canvas"],
    generate: () => {
      const c = tirerCtx(CONTEXTES_PROBA);
      const { num, den } = c.proba!;
      const p = num / den;
      let n = 0, attendu = 0, observe = 0;
      for (let t = 0; t < 200; t++) {
        n = randomChoice([60, 100, 120, 200, 240, 300, 400, 600].filter((x) => (x * num) % den === 0));
        attendu = (n * num) / den;
        const sd = Math.sqrt(n * p * (1 - p));
        const ecart = Math.max(1, Math.round(sd * randomChoice([0.4, 0.6, 0.8, 1]))) * randomChoice([-1, 1]);
        observe = attendu + ecart;
        if (observe > 0 && observe < n && queueBinomiale(n, p, observe) >= 0.1) break;
      }
      const qui = randomChoice(PRENOMS);
      const N = fr(n), A = fr(attendu), O = fr(observe), PT = probaTxt(c);
      const recit = randomChoice([
        `${qui} ${c.action(N)}. La probabilité de l'issue ${c.evt} vaut ${PT} : on en attendait donc ${A}. On en observe ${O}.`,
        `${qui} ${c.action(N)} : ${c.res(O)}. D'après la probabilité, ${PT}, on en attendait ${A}.`,
        `D'après le calcul, l'issue ${c.evt} a une probabilité de ${PT}. ${qui} ${c.action(N)} ; au total, ${c.resNom(O)}, au lieu des ${A} attendus.`,
      ]);
      const q = randomChoice([
        "Que faut-il en conclure ?",
        "Que peut-on en dire ?",
        "Quelle conclusion est correcte ?",
      ]);
      const correct = "l'écart est normal : c'est le hasard";
      return {
        text: `${recit} ${q}`,
        format: "qcm",
        choices: makeChoices(correct, [
          c.truque!,
          "le calcul de la probabilité est faux",
          `il faut recommencer jusqu'à obtenir exactement ${A}`,
          `la probabilité n'est donc pas ${PT}`,
          "l'expérience ne sert à rien",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une probabilité annonce ce qui se passe EN MOYENNE sur un grand nombre d'essais, jamais ce qui se passera exactement.\n\n" +
          "Méthode : on compare la fréquence observée à la probabilité, sans exiger l'égalité.\n\n" +
          `Calcul : observé ${O} sur ${N}, soit ${pct(observe, n)}, contre ${A} attendus (${pct(attendu, n)}) — un écart de ${fr(Math.abs(observe - attendu))} sur ${N} ${c.essais}. Avec une probabilité exacte de ${PT}, un écart au moins aussi grand arrive ${direQueue(queueBinomiale(n, p, observe))}.\n\n` +
          "Conclusion : ⛔ LES DEUX ERREURS À ÉVITER SONT SYMÉTRIQUES — exiger que l'expérience donne le résultat calculé, et en déduire que le calcul est faux quand elle ne le donne pas.",
        canvas: c.canvas,
      };
    },
  },
  {
    kind: "template",
    id: "4e_proba_frequence_comparer_tpl_2_ecart",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Convertis la probabilité en pourcentage pour comparer.",
    tags: ["frequence", "comparer", "template", "canvas"],
    generate: () => {
      const c = tirerCtx(CONTEXTES_PROBA, pctEntier);
      const p0 = probaPct(c);
      let n = 100, k = p0, fObs = p0;
      for (let t = 0; t < 300; t++) {
        n = randomChoice([50, 100, 200, 250, 400, 500]);
        const d = randomChoice([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]);
        fObs = p0 + d;
        k = (n * fObs) / 100;
        if (fObs > 0 && Number.isInteger(k)) break;
      }
      const ecart = Math.abs(fObs - p0);
      const qui = randomChoice(PRENOMS);
      const N = fr(n), K = fr(k), PT = probaTxt(c);
      const text = randomChoice([
        `${qui} ${c.action(N)} : ${c.res(K)}. La probabilité de l'issue ${c.evt} vaut ${PT}. De combien de points la fréquence observée s'écarte-t-elle de cette probabilité ?`,
        `${qui} ${c.action(N)}. Au total, ${c.resNom(K)}, alors que la probabilité est de ${p0} %. Quel est l'écart, en points, entre la fréquence observée et la probabilité ?`,
        `La probabilité de l'issue ${c.evt} est ${PT}. ${qui} ${c.action(N)} et obtient l'issue ${c.evt} ${K} fois. Calcule l'écart, en points de pourcentage, entre fréquence observée et probabilité.`,
      ]);
      return {
        text,
        format: "short",
        expected: [fr(ecart), String(ecart), `${ecart} points`],
        comparator: "number_equal",
        explanation:
          `Définition : la probabilité de l'issue ${c.evt} vaut ${PT}, soit ${p0} %.\n\n` +
          "Méthode : on calcule la fréquence observée en pourcentage, puis la différence avec la probabilité.\n\n" +
          `Calcul : ${K} ÷ ${N} = ${fr(fObs / 100)}, soit ${fObs} % ; l'écart avec ${p0} % vaut ${fr(ecart)} point${ecart > 1 ? "s" : ""}.\n\n` +
          "Conclusion : un écart de quelques points est ordinaire. Ce qui compte n'est pas qu'il existe, c'est qu'il RÉTRÉCIT quand on fait davantage d'essais.",
        canvas: barresFrequence([
          { label: "probabilité", value: p0, color: "#94a3b8" },
          { label: "observé", value: fObs, color: "#2563eb" },
        ]),
      };
    },
  },
  {
    // ★3 — situer la fréquence observée par rapport à la probabilité.
    kind: "template",
    id: "4e_proba_frequence_comparer_tpl_3_situer",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris la fréquence et la probabilité sous la même forme (décimale ou pourcentage).",
    tags: ["frequence", "comparer", "qcm", "template"],
    generate: () => {
      const c = tirerCtx(CONTEXTES_PROBA);
      const { n, k } = tirerSerie(c, TAILLES);
      const { num, den } = c.proba!;
      const qui = randomChoice(PRENOMS);
      const PT = probaTxt(c);
      const q = randomChoice([
        `La fréquence observée de l'issue ${c.evt} est-elle supérieure, inférieure ou égale à sa probabilité, ${PT} ?`,
        `Compare la fréquence observée de l'issue ${c.evt} à sa probabilité, ${PT}.`,
        `Comment se situe la fréquence de l'issue ${c.evt} par rapport à la probabilité ${PT} ?`,
      ]);
      const cmp = k * den - n * num;
      const correct =
        cmp > 0
          ? "supérieure à la probabilité"
          : cmp < 0
            ? "inférieure à la probabilité"
            : "égale à la probabilité";
      const probaDec = Math.round((num / den) * 1000) / 1000;
      return {
        text: `${raconter(c, qui, n, k)} ${q}`,
        format: "qcm",
        choices: ["supérieure à la probabilité", "inférieure à la probabilité", "égale à la probabilité"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : fréquence et probabilité sont deux nombres entre 0 et 1 : on peut les comparer directement.\n\n" +
          "Méthode : on les écrit sous la même forme décimale.\n\n" +
          `Calcul : fréquence = ${fr(k)} ÷ ${fr(n)} = ${fr(k / n)} ; probabilité = ${PT} ${(num * 1000) % den === 0 ? "=" : "≈"} ${fr(probaDec)}.\n\n` +
          `Conclusion : la fréquence est ${correct}. ⚠️ Un écart, dans un sens ou dans l'autre, ne dit rien d'anormal à lui seul.`,
        canvas: c.canvas,
      };
    },
  },
  {
    // ★3 — ce que la probabilité « prévoit » sur n essais.
    kind: "template",
    id: "4e_proba_frequence_comparer_tpl_4_attendu",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Nombre attendu = probabilité × nombre d'essais.",
    tags: ["frequence", "comparer", "attendu", "template"],
    generate: () => {
      const c = tirerCtx(CONTEXTES_PROBA);
      const { num, den } = c.proba!;
      const n = randomChoice([60, 100, 120, 200, 240, 300, 400, 600, 1200].filter((x) => (x * num) % den === 0));
      const attendu = (n * num) / den;
      const qui = randomChoice(PRENOMS);
      const N = fr(n), PT = probaTxt(c);
      const text = randomChoice([
        `${qui} ${c.action(N)}. D'après la probabilité, combien de fois peut-on s'attendre à obtenir l'issue ${c.evt} ?`,
        `La probabilité de l'issue ${c.evt} vaut ${PT}. ${qui} ${c.action(N)}. Combien de fois l'issue ${c.evt} devrait-elle se produire, en théorie ?`,
        `${qui} ${c.action(N)}. Calcule combien de fois on obtiendrait l'issue ${c.evt} si la fréquence observée était exactement égale à sa probabilité, ${PT}.`,
        `Expérience : ${qui} ${c.action(N)}. Quel est le nombre de fois où l'issue ${c.evt} est attendue, d'après sa probabilité ${PT} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [fr(attendu), String(attendu)],
        comparator: "number_equal",
        explanation:
          `Définition : la probabilité de l'issue ${c.evt} vaut ${PT}.\n\n` +
          "Méthode : le nombre attendu est la probabilité multipliée par le nombre d'essais.\n\n" +
          `Calcul : ${PT} × ${N} = ${fr(attendu)}.\n\n` +
          `Conclusion : on attend ${fr(attendu)} fois l'issue ${c.evt}. ⚠️ Dans la vraie expérience, on obtiendra un nombre PROCHE, rarement exactement celui-là — et c'est normal.`,
        canvas: c.canvas,
      };
    },
  },

  /* =========================================================================
     PROBA_FREQUENCE_REPETER — l'écart se réduit
  ========================================================================= */
  {
    kind: "template",
    id: "4e_proba_frequence_repeter_tpl_1_serie",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_repeter",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde comment l'écart évolue quand le nombre d'essais grandit.",
    tags: ["frequence", "repeter", "qcm", "template", "canvas"],
    generate: () => {
      const c = tirerCtx(CONTEXTES_PROBA, pctEntier);
      const p0 = probaPct(c);
      const d1s = [-20, -15, -10, 10, 15, 20].filter((d) => p0 + d > 0 && p0 + d < 100);
      const f1 = p0 + randomChoice(d1s);
      const f2 = p0 + randomChoice([-4.5, -4, -3.5, -3, -2.5, 2.5, 3, 3.5, 4, 4.5]);
      const f3 = p0 + randomChoice([-0.6, -0.4, -0.3, -0.2, 0.2, 0.3, 0.4, 0.6]);
      const [n1, n2, n3] = [20, 200, 2000];
      const qui = randomChoice(PRENOMS);
      const F1 = fr(Math.round(f1 * 10) / 10), F2 = fr(Math.round(f2 * 10) / 10), F3 = fr(Math.round(f3 * 100) / 100);
      const recit = randomChoice([
        `${qui} ${c.action(fr(n3))} et note la fréquence de l'issue ${c.evt} en cours de route : ${F1} % après ${n1} ${c.essais}, ${F2} % après ${n2}, ${F3} % après ${fr(n3)}.`,
        `Voici la fréquence de l'issue ${c.evt} relevée par ${qui}, qui ${c.action(fr(n3))} : après ${n1} ${c.essais}, ${F1} % ; après ${n2}, ${F2} % ; après ${fr(n3)}, ${F3} %.`,
        `${qui} ${c.action(fr(n3))}. Fréquence de l'issue ${c.evt} : ${F1} % sur les ${n1} premiers ${c.essais}, ${F2} % sur les ${n2} premiers, ${F3} % sur l'ensemble.`,
      ]);
      const q = randomChoice([
        "Que constate-t-on ?",
        "Que peut-on dire de l'évolution de la fréquence ?",
        "Quelle phrase décrit le mieux ces résultats ?",
        "Qu'observe-t-on quand le nombre d'essais augmente ?",
      ]);
      const correct = `la fréquence se rapproche de la probabilité, ${p0} %`;
      return {
        text: `${recit} ${q}`,
        format: "qcm",
        choices: makeChoices(correct, [
          `la fréquence s'éloigne de ${p0} %`,
          "la fréquence ne change pas",
          "le hasard se corrige pour revenir à la probabilité",
          "les premiers essais étaient faux",
          `il faut s'arrêter à ${n2} ${c.essais}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : plus on répète une expérience, plus la fréquence observée se rapproche de la probabilité (ici ${probaTxt(c)}, soit ${p0} %).\n\n` +
          `Méthode : on regarde l'écart à ${p0} %, pas la fréquence elle-même.\n\n` +
          `Calcul : l'écart passe de ${fr(Math.round(Math.abs(f1 - p0) * 10) / 10)} points à ${fr(Math.round(Math.abs(f2 - p0) * 10) / 10)}, puis à ${fr(Math.round(Math.abs(f3 - p0) * 100) / 100)}.\n\n` +
          "Conclusion : ⚠️ l'objet n'a pas changé — c'est notre MESURE qui devient fiable. Le hasard ne se corrige pas, il se moyenne.",
        canvas: barresFrequence([
          { label: String(n1), value: f1, color: "#fca5a5" },
          { label: String(n2), value: f2, color: "#93c5fd" },
          { label: String(n3), value: f3, color: "#2563eb" },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "4e_proba_frequence_repeter_tpl_2_choisir",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_repeter",
    difficulty: 4,
    theme: "neutral",
    hint: "Sur laquelle des deux séries peut-on le plus se fier ?",
    tags: ["frequence", "repeter", "qcm", "template"],
    generate: () => {
      const c = tirerCtx(CONTEXTES, (x) => x.maxN >= 500);
      const petit = randomChoice([10, 12, 15, 20, 30]);
      const grand = randomChoice([500, 800, 1000, 2000].filter((x) => x <= c.maxN));
      const [a, b] = deuxPrenoms();
      const aPetit = Math.random() < 0.5;
      const [na, nb] = aPetit ? [petit, grand] : [grand, petit];
      const text = randomChoice([
        `${a} et ${b} veulent estimer la probabilité de l'issue ${c.evt}. ${a} ${c.action(fr(na))} ; ${b} ${c.action(fr(nb))}. Quelle estimation est la plus fiable ?`,
        `Pour estimer la probabilité de l'issue ${c.evt}, ${a} ${c.action(fr(na))} et ${b} ${c.action(fr(nb))}. Quelle fréquence observée faut-il croire le plus ?`,
        `${a} ${c.action(fr(na))}, ${b} ${c.action(fr(nb))}. Chacun calcule la fréquence de l'issue ${c.evt}. Quelle fréquence approche le mieux la probabilité ?`,
      ]);
      // ⛔ 08/10 : « celle de Adam » → « celle d'Adam ».
      const correct = `celle ${deQui(aPetit ? b : a)}`;
      return {
        text,
        format: "qcm",
        choices: shuffle([`celle ${deQui(a)}`, `celle ${deQui(b)}`, "les deux se valent"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la fréquence observée approche la probabilité d'autant mieux que les essais sont nombreux.\n\n" +
          "Méthode : on compare les nombres d'essais, pas les résultats.\n\n" +
          `Calcul : ${fr(grand)} ${c.essais} contre ${fr(petit)} — la série ${deQui(aPetit ? b : a)} est ${fr(Math.round(grand / petit))} fois plus grande (environ).\n\n` +
          `Conclusion : ⚠️ cela ne veut PAS dire que la série de ${fr(petit)} ${c.essais} est fausse. Elle est simplement moins informative : elle laisse plus de place au hasard.`,
      };
    },
  },
  {
    // ★4 — quand la probabilité ne se calcule pas, la plus longue série l'estime.
    kind: "template",
    id: "4e_proba_frequence_repeter_tpl_3_estimation",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_repeter",
    difficulty: 4,
    theme: "neutral",
    hint: "Quelle fréquence a été mesurée sur le plus grand nombre d'essais ?",
    tags: ["frequence", "repeter", "estimer", "qcm", "template", "canvas"],
    generate: () => {
      // Expériences NON calculables seulement : pour un dé, la « meilleure
      // estimation » serait 1/6, et une série tirée au hasard pourrait la contredire.
      const c = tirerCtx(CONTEXTES_MESURE, (x) => x.maxN >= 5000 && x.plage[1] >= 20);
      let f10 = 0, f100 = 0, f1000 = 0, f5000 = 0;
      for (let t = 0; t < 200; t++) {
        const p = randomInt(Math.max(c.plage[0], 12), Math.min(c.plage[1], 88));
        f10 = Math.round((p + randomChoice([-20, -10, 10, 20])) / 10) * 10;
        f100 = p + randomChoice([-8, -6, -5, 5, 6, 8]);
        f1000 = Math.round((p + randomChoice([-2.4, -1.7, -1.2, 1.3, 1.8, 2.2])) * 10) / 10;
        f5000 = Math.round((p + randomChoice([-0.6, -0.4, -0.2, 0.3, 0.5])) * 10) / 10;
        const vals = [f10, f100, f1000, f5000];
        if (vals.every((v) => v > 0 && v < 100) && new Set(vals).size === 4) break;
      }
      const qui = randomChoice(PRENOMS);
      const sujet = randomChoice([qui, "On", `La classe ${deQui(qui)}`]);
      const action = c.action("5 000");
      const recit = randomChoice([
        `${sujet} ${action} et calcule la fréquence de l'issue ${c.evt} en cours de route : ${fr(f10)} % après 10 ${c.essais}, ${fr(f100)} % après 100, ${fr(f1000)} % après 1 000 et ${fr(f5000)} % après 5 000.`,
        `${sujet} ${action}. Fréquence de l'issue ${c.evt} : ${fr(f10)} % sur 10 ${c.essais}, ${fr(f100)} % sur 100, ${fr(f1000)} % sur 1 000, ${fr(f5000)} % sur 5 000.`,
      ]);
      const q = randomChoice([
        `Quelle est la meilleure estimation de la probabilité de l'issue ${c.evt} ?`,
        "Quelle valeur faut-il retenir pour estimer cette probabilité ?",
        "Laquelle de ces fréquences estime le mieux la probabilité ?",
      ]);
      const correct = `${fr(f5000)} %`;
      return {
        text: `${recit} ${q}`,
        format: "qcm",
        choices: shuffle([`${fr(f10)} %`, `${fr(f100)} %`, `${fr(f1000)} %`, correct]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : quand on ne peut pas CALCULER une probabilité, on l'ESTIME par une fréquence observée.\n\n" +
          "Méthode : on retient la fréquence mesurée sur le plus grand nombre d'essais.\n\n" +
          `Calcul : ${fr(f10)} % ne repose que sur 10 ${c.essais} ; ${fr(f5000)} % repose sur 5 000.\n\n` +
          `Conclusion : la meilleure estimation est ${correct}. ⚠️ On ne fait pas la moyenne des quatre fréquences : les premières, mesurées sur peu d'essais, sont les moins fiables.`,
        canvas: barresFrequence([
          { label: "10", value: f10, color: "#fca5a5" },
          { label: "100", value: f100, color: "#fdba74" },
          { label: "1000", value: f1000, color: "#93c5fd" },
          { label: "5000", value: f5000, color: "#2563eb" },
        ]),
      };
    },
  },
  {
    // ★4 — le hasard n'a pas de mémoire : la série passée ne change rien.
    kind: "template",
    id: "4e_proba_frequence_repeter_tpl_4_memoire",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_repeter",
    difficulty: 4,
    theme: "neutral",
    hint: "L'objet se souvient-il des essais précédents ?",
    tags: ["frequence", "repeter", "piege", "qcm", "template"],
    generate: () => {
      const c = tirerCtx(CONTEXTES_PROBA, (x) => !!x.aucun);
      const { num, den } = c.proba!;
      const k = den === 2 ? randomInt(4, 8) : randomInt(6, 15);
      const qui = randomChoice(PRENOMS);
      const PT = probaTxt(c);
      const debut = randomChoice(["", `${qui} observe ceci : `, "Pendant une partie, "]);
      const fait = debut ? `${debut}${c.aucun!(fr(k))}.` : `${cap(c.aucun!(fr(k)))}.`;
      const forme = randomChoice(["a", "b", "c"] as const);
      if (forme === "c") {
        const correct = `${PT}, comme avant`;
        return {
          text: `${fait} Que vaut maintenant la probabilité d'obtenir l'issue ${c.evt} au prochain ${c.essai} ?`,
          format: "qcm",
          // ⛔ 08/10 : pour une pièce, « 1/1 » sortait comme leurre.
          choices: choixValeurs({ t: correct, v: num / den }, [
            ...(den - 1 > 1 ? [{ t: `${num}/${den - 1}`, v: num / (den - 1) }] : []),
            ...(num + 1 < den ? [{ t: `${num + 1}/${den}`, v: (num + 1) / den }] : []),
            { t: "0", v: 0 },
            { t: "1", v: 1 },
            { t: `${num}/${den + 1}`, v: num / (den + 1) },
          ]),
          expected: [correct],
          comparator: "mcq_exact",
          explanation:
            `Définition : la probabilité de l'issue ${c.evt} vaut ${PT} à CHAQUE ${c.essai}, quoi qu'il soit arrivé avant.\n\n` +
            "Méthode : on se demande si l'objet peut « se souvenir » des essais passés. Il ne le peut pas.\n\n" +
            `Calcul : rien n'a changé dans l'expérience, donc la probabilité reste ${PT}.\n\n` +
            "Conclusion : ⛔ le hasard ne se corrige pas, il se MOYENNE : la fréquence se rapproche de la probabilité parce que les nouveaux essais noient les anciens, pas parce que l'issue « rattrape » son retard.",
        };
      }
      const correct = forme === "a" ? `non : elle vaut toujours ${PT}` : `${qui} se trompe : la probabilité reste ${PT} à chaque ${c.essai}`;
      const wrongs =
        forme === "a"
          ? [
              "oui : l'issue est « en retard », elle doit se rattraper",
              "non : elle a diminué, puisque l'issue ne sort plus",
              "oui : la fréquence doit revenir à la probabilité",
              "on ne peut plus la calculer",
            ]
          : [
              `${qui} a raison : l'issue doit se rattraper`,
              `${qui} a raison : la fréquence doit revenir à ${PT}`,
              `${qui} se trompe : l'issue est devenue moins probable`,
              "on ne peut pas savoir",
            ];
      const q =
        forme === "a"
          ? `La probabilité d'obtenir l'issue ${c.evt} au prochain ${c.essai} a-t-elle augmenté ?`
          : `${qui} pense que l'issue ${c.evt} est « en retard » et va sortir au prochain ${c.essai}. Qu'en penser ?`;
      return {
        text: `${fait} ${q}`,
        format: "qcm",
        choices: makeChoices(correct, wrongs),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : la probabilité de l'issue ${c.evt} vaut ${PT} à CHAQUE ${c.essai}, quoi qu'il soit arrivé avant.\n\n` +
          `Méthode : ${fr(k)} ${c.essai}s sans l'issue ${c.evt} ne modifient pas l'objet : il n'a pas de mémoire.\n\n` +
          `Calcul : la probabilité au prochain ${c.essai} reste ${PT}.\n\n` +
          "Conclusion : ⛔ le hasard ne se corrige pas, il se MOYENNE : la fréquence se rapproche de la probabilité parce que les nouveaux essais noient les anciens, pas parce que l'issue « rattrape » son retard.",
      };
    },
  },

  /* =========================================================================
     PROBA_FREQUENCE_ECHANTILLON — ⭐ le premier raisonnement statistique
  ========================================================================= */
  {
    // ⭐ VALEUR PARTICULIÈRE, ET C'EST LE CŒUR DE LA NOTION. Dix lancers dont
    // sept « pile » : tout élève conclut que la pièce est truquée. Elle ne l'est
    // pas — et ce cas-là ne se génère pas, il se retient.
    kind: "fixed",
    id: "4e_proba_frequence_echantillon_fixed_dix_lancers",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_echantillon",
    difficulty: 3,
    theme: "neutral",
    text: "On lance une pièce 10 fois et on obtient 7 « pile ». Peut-on conclure qu'elle est truquée ?",
    format: "qcm",
    choices: [
      "non : 10 lancers, c'est beaucoup trop peu pour conclure",
      "oui : 70 % au lieu de 50 %, l'écart est trop grand",
      "oui, mais seulement si on refait la même série",
      "non : une pièce n'est jamais truquée",
    ],
    expected: ["non : 10 lancers, c'est beaucoup trop peu pour conclure"],
    comparator: "mcq_exact",
    hint: "Combien de lancers faudrait-il pour que 70 % devienne surprenant ?",
    explanation:
      "Définition : sur un petit nombre d'essais, une fréquence peut s'écarter beaucoup de la probabilité sans que rien ne soit anormal.\n\n" +
      "Méthode : on se demande toujours SUR COMBIEN D'ESSAIS avant de juger un écart.\n\n" +
      "Calcul : obtenir au moins 7 « pile » sur 10 avec une pièce équilibrée arrive environ une fois sur six — c'est courant. Obtenir 700 « pile » sur 1 000 n'arriverait pratiquement jamais.\n\n" +
      "Conclusion : ⭐ c'est la TAILLE DE L'ÉCHANTILLON qui décide de ce qu'on a le droit de conclure. Le même pourcentage ne dit pas la même chose sur 10 essais et sur 1 000.",
    tags: ["frequence", "echantillon", "valeur_particuliere", "qcm"],
  },
  {
    // ★3 — le cas des dix lancers, sur toutes les expériences : petit
    // échantillon, gros écart… et la loi binomiale vérifie que c'est banal.
    kind: "template",
    id: "4e_proba_frequence_echantillon_tpl_3_petit",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_echantillon",
    difficulty: 3,
    theme: "neutral",
    hint: "Sur combien d'essais cet écart a-t-il été observé ?",
    tags: ["frequence", "echantillon", "qcm", "template"],
    generate: () => {
      const c = tirerCtx(CONTEXTES_PROBA);
      const { num, den } = c.proba!;
      const p = num / den;
      let n = 10, attendu = 5, observe = 7, q = 0.17;
      for (let t = 0; t < 300; t++) {
        const ms = [1, 2, 3, 4, 5, 6, 8, 10].filter((m) => den * m >= 8 && den * m <= 30);
        n = den * randomChoice(ms);
        attendu = (n * num) / den;
        observe = attendu + randomChoice(attendu >= 3 ? [-2, 2, 3] : [2, 3]);
        if (observe < 0 || observe > n) continue;
        q = queueBinomiale(n, p, observe);
        if (q >= 0.08) break;
      }
      const qui = randomChoice(PRENOMS);
      const N = fr(n), A = fr(attendu), O = fr(observe), PT = probaTxt(c);
      const forme = randomChoice(["a", "b", "c"] as const);
      const text =
        forme === "a"
          ? `${qui} ${c.action(N)} : ${c.res(O)}, alors qu'on en attendait ${A}. Peut-on conclure que ${c.truque} ?`
          : forme === "b"
            ? `${qui} ${c.action(N)}. Sur ces ${N} ${c.essais}, ${c.resNom(O)} — au lieu des ${A} prévus par la probabilité ${PT}. ${qui} affirme : « ${cap(c.truque!)} ! » A-t-on assez d'éléments pour l'affirmer ?`
            : `${qui} ${c.action(N)} et obtient l'issue ${c.evt} ${O} fois, soit une fréquence de ${pct(observe, n)}, loin de la probabilité ${PT}. Ce résultat prouve-t-il que ${c.truque} ?`;
      const correct = forme === "a" ? `non : ${N} ${c.essais}, c'est beaucoup trop peu pour conclure` : `non : sur ${N} ${c.essais}, un tel écart peut venir du hasard`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          "oui : l'écart avec la probabilité est trop grand",
          "oui, à condition de refaire exactement la même série",
          "oui : la fréquence devrait être égale à la probabilité",
          "non : un objet de jeu n'est jamais truqué",
          `oui : on aurait dû obtenir exactement ${A}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : sur un petit nombre d'essais, une fréquence peut s'écarter beaucoup de la probabilité sans que rien ne soit anormal.\n\n" +
          "Méthode : on se demande toujours SUR COMBIEN D'ESSAIS avant de juger un écart.\n\n" +
          `Calcul : on attendait ${A} fois l'issue ${c.evt} sur ${N} ${c.essais} et on l'obtient ${O} fois. Si tout est normal (probabilité ${PT}), un écart au moins aussi grand arrive ${direQueue(q)} : c'est courant.\n\n` +
          "Conclusion : ⭐ c'est la TAILLE DE L'ÉCHANTILLON qui décide de ce qu'on a le droit de conclure. Il faudrait beaucoup plus d'essais pour soupçonner un trucage.",
      };
    },
  },
  {
    // ★3 — choisir l'échantillon le plus fiable, hors des jeux de hasard.
    kind: "template",
    id: "4e_proba_frequence_echantillon_tpl_4_taille",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_echantillon",
    difficulty: 3,
    theme: "neutral",
    hint: "Plus l'échantillon est grand, moins le hasard pèse.",
    tags: ["frequence", "echantillon", "sondage", "qcm", "template"],
    generate: () => {
      const s = randomChoice(SONDAGES);
      const ns = shuffle([randomChoice([10, 15, 20, 25]), randomChoice([50, 80, 100, 150]), randomChoice([500, 800, 1000, 2000])]);
      const max = Math.max(...ns);
      const qui = randomChoice(PRENOMS);
      const choisis = s.f ? "choisies" : "choisis";
      const text = randomChoice([
        `Pour estimer la part des ${s.pop} qui ${s.verbe}, trois enquêtes ont été faites, sur ${fr(ns[0])}, ${fr(ns[1])} et ${fr(ns[2])} ${s.unite} ${choisis} au hasard. Laquelle donne l'estimation la plus fiable ?`,
        `${qui} veut estimer la part des ${s.pop} qui ${s.verbe}. ${qui} hésite entre étudier ${fr(ns[0])}, ${fr(ns[1])} ou ${fr(ns[2])} ${s.unite} ${choisis} au hasard. Quel choix donnera la fréquence la plus fiable ?`,
        `Trois fréquences ${/^[aeiouyéèh]/i.test(s.pop) ? "d'" : "de "}${s.pop} qui ${s.verbe} ont été mesurées : sur ${fr(ns[0])} ${s.unite}, sur ${fr(ns[1])} et sur ${fr(ns[2])}, ${choisis} au hasard. Laquelle faut-il croire le plus ?`,
      ]);
      const correct = `celle sur ${fr(max)} ${s.unite}`;
      return {
        text,
        format: "qcm",
        choices: shuffle([...ns.map((n) => `celle sur ${fr(n)} ${s.unite}`), "les trois se valent"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une fréquence observée estime d'autant mieux une proportion que l'échantillon est grand.\n\n" +
          "Méthode : à méthode égale (au hasard), on compare seulement les tailles d'échantillon.\n\n" +
          `Calcul : ${fr(Math.min(...ns))} ${s.unite}, puis ${fr(ns.slice().sort((x, y) => x - y)[1])}, puis ${fr(max)} : le plus grand échantillon est ${fr(max)}.\n\n` +
          `Conclusion : l'enquête sur ${fr(max)} ${s.unite} est la plus fiable. ⚠️ Sur ${fr(Math.min(...ns))} ${s.unite}, une seule réponse change la fréquence de ${fr(Math.round(1000 / Math.min(...ns)) / 10)} points.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_proba_frequence_echantillon_tpl_1_meme_pourcentage",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_echantillon",
    difficulty: 5,
    theme: "neutral",
    hint: "Le pourcentage est le même : ce qui change, c'est le nombre d'essais.",
    tags: ["frequence", "echantillon", "qcm", "template", "canvas"],
    generate: () => {
      const c = tirerCtx(CONTEXTES_PROBA, pctEntier);
      const p0 = probaPct(c);
      const pr = p0 / 100;
      let petit = 10, grand = 1000, pObs = p0 + 20, qp = 0.17, qg = 0;
      for (let t = 0; t < 300; t++) {
        petit = randomChoice([10, 20]);
        grand = petit * randomChoice([50, 100]);
        pObs = p0 + randomChoice([10, 15, 20, 25]);
        const kp = (petit * pObs) / 100;
        if (pObs >= 100 || !Number.isInteger(kp)) continue;
        qp = queueBinomiale(petit, pr, kp);
        qg = queueBinomiale(grand, pr, (grand * pObs) / 100);
        if (qp >= 0.08 && qg < 0.001) break;
      }
      const qui = randomChoice(PRENOMS);
      const recit = randomChoice([
        `Deux séries donnent ${pObs} % pour l'issue ${c.evt}, dont la probabilité vaut ${probaTxt(c)} : l'une sur ${fr(petit)} ${c.essais}, l'autre sur ${fr(grand)}.`,
        `${qui} ${c.action(fr(petit))} et trouve une fréquence de ${pObs} % pour l'issue ${c.evt}. Une autre fois, ${qui} ${c.action(fr(grand))} et trouve encore ${pObs} %. La probabilité vaut pourtant ${probaTxt(c)}.`,
      ]);
      const q = randomChoice([
        `Laquelle des deux séries donne une vraie raison de penser que ${c.truque} ?`,
        "Laquelle des deux séries est vraiment suspecte ?",
        "Quelle série autorise à soupçonner un trucage ?",
      ]);
      const correct = `la série de ${fr(grand)} ${c.essais}`;
      return {
        text: `${recit} ${q}`,
        format: "qcm",
        choices: makeChoices(correct, [
          `la série de ${fr(petit)} ${c.essais}`,
          "les deux, puisque le pourcentage est le même",
          "aucune des deux",
          "celle qui a été faite en premier",
          "il faudrait un troisième essai pour trancher",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un même écart n'a pas le même poids selon le nombre d'essais.\n\n" +
          "Méthode : on ne regarde pas le pourcentage seul — on le lit AVEC son effectif.\n\n" +
          `Calcul : ${pObs} % au lieu de ${p0} % sur ${fr(petit)} ${c.essais}, c'est ${fr(((pObs - p0) * petit) / 100)} fois de plus que prévu : par hasard, cela arrive ${direQueue(qp)}. Sur ${fr(grand)} ${c.essais}, c'est ${fr(((pObs - p0) * grand) / 100)} fois de trop : par hasard, cela arrive ${direQueue(qg)}.\n\n` +
          "Conclusion : ⭐ un pourcentage sans son effectif ne veut rien dire. C'est vrai des dés comme des sondages.",
        canvas: tableau(
          ["série", "essais", "fréquence"],
          [
            { values: ["A", fr(petit), `${pObs} %`] },
            { values: ["B", fr(grand), `${pObs} %`] },
          ],
          "même fréquence, deux poids très différents",
          { row: 1 }
        ),
      };
    },
  },
  {
    kind: "template",
    id: "4e_proba_frequence_echantillon_tpl_2_sondage",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_echantillon",
    difficulty: 5,
    theme: "neutral",
    hint: "Sur combien de cas ce pourcentage a-t-il été mesuré ?",
    tags: ["frequence", "echantillon", "sondage", "qcm", "template"],
    generate: () => {
      const s = randomChoice(SONDAGES);
      let n = 10, k = 7, p = 70;
      for (let t = 0; t < 200; t++) {
        n = randomChoice([8, 10, 12, 15, 20, 25]);
        k = randomInt(Math.ceil(n * 0.55), Math.floor(n * 0.85));
        p = (100 * k) / n;
        if (Number.isInteger(p)) break;
      }
      const qui = randomChoice([...PRENOMS.slice(0, 6), "Un journaliste", "Une association", "Un élève"]);
      const recit = randomChoice([
        `${qui} ${s.enquete(fr(n))} et annonce : « ${p} % des ${s.pop} ${s.verbe}. »`,
        `« ${p} % des ${s.pop} ${s.verbe} » : c'est la conclusion ${deQui(qui)}, qui ${s.enquete(fr(n))}.`,
      ]);
      const q = randomChoice([
        "Quelle est la principale faiblesse de cette conclusion ?",
        "Qu'est-ce qui rend cette affirmation fragile ?",
        "Que faut-il reprocher d'abord à ce résultat ?",
      ]);
      const correct = "l'échantillon est trop petit pour conclure";
      return {
        text: `${recit} ${q}`,
        format: "qcm",
        choices: makeChoices(correct, [
          "le pourcentage est mal calculé",
          "il aurait fallu arrondir le pourcentage",
          "un pourcentage ne peut pas dépasser 50 %",
          "il fallait donner une fraction plutôt qu'un pourcentage",
          "aucune : la conclusion est correcte",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une fréquence observée n'estime bien une proportion que si l'échantillon est assez grand.\n\n" +
          "Méthode : on demande toujours SUR COMBIEN avant de croire un pourcentage.\n\n" +
          `Calcul : ${p} % de ${n}, c'est ${k} cas. Un seul de plus ou de moins change le résultat de ${fr(Math.round(1000 / n) / 10)} points.\n\n` +
          `Conclusion : ⭐ c'est le même raisonnement que pour les dés — un pourcentage se lit avec son effectif. ⚠️ Il faut aussi que les ${s.unite} soient ${s.f ? "choisies" : "choisis"} au hasard parmi ${s.f ? "toutes" : "tous"} les ${s.pop} : c'est une seconde condition, distincte.`,
      };
    },
  },
  {
    // ★5 — chiffrer l'excès, puis juger avec la taille de l'échantillon.
    kind: "template",
    id: "4e_proba_frequence_echantillon_tpl_5_exces",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_echantillon",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare le nombre observé au nombre attendu : probabilité × nombre d'essais.",
    tags: ["frequence", "echantillon", "template"],
    generate: () => {
      const c = tirerCtx(CONTEXTES_PROBA, pctEntier);
      const p0 = probaPct(c);
      let n = 200, pObs = p0 + 5, exces = 10;
      for (let t = 0; t < 200; t++) {
        n = randomChoice([50, 100, 200, 400, 500, 1000, 2000]);
        pObs = p0 + randomChoice([2, 3, 4, 5, 6, 8, 10]);
        exces = (n * (pObs - p0)) / 100;
        if (pObs < 100 && Number.isInteger(exces) && Number.isInteger((n * pObs) / 100)) break;
      }
      const observe = (n * pObs) / 100;
      const attendu = (n * p0) / 100;
      const q = queueBinomiale(n, p0 / 100, observe);
      const qui = randomChoice(PRENOMS);
      const N = fr(n);
      const text = randomChoice([
        `${qui} ${c.action(N)} : la fréquence de l'issue ${c.evt} est de ${pObs} %, contre ${p0} % prévus par la probabilité. Combien de fois l'issue ${c.evt} s'est-elle produite de plus que prévu ?`,
        `${qui} ${c.action(N)}. La probabilité de l'issue ${c.evt} vaut ${probaTxt(c)}, mais sa fréquence observée est de ${pObs} %. Combien de fois en trop l'issue ${c.evt} est-elle sortie, par rapport à ce que prévoit la probabilité ?`,
        `Sur ${N} ${c.essais}, l'issue ${c.evt} a une fréquence de ${pObs} % au lieu des ${p0} % attendus : c'est le relevé ${deQui(qui)}, qui ${c.action(N)}. Calcule l'écart entre le nombre de fois observé et le nombre de fois attendu.`,
      ]);
      return {
        text,
        format: "short",
        expected: [fr(exces), String(exces)],
        comparator: "number_equal",
        explanation:
          "Définition : nombre attendu = probabilité × nombre d'essais ; nombre observé = fréquence × nombre d'essais.\n\n" +
          `Méthode : on calcule les deux sur les ${N} ${c.essais}, puis la différence.\n\n` +
          `Calcul : observé ${pObs} % de ${N} = ${fr(observe)} ; attendu ${p0} % de ${N} = ${fr(attendu)} ; écart ${fr(observe)} − ${fr(attendu)} = ${fr(exces)}.\n\n` +
          `Conclusion : ${fr(exces)} fois de trop. Par hasard, un excès au moins aussi grand arrive ${direQueue(q)} sur ${N} ${c.essais}${q < 0.01 ? " : il devient suspect" : " : le hasard peut encore l'expliquer"}. ⭐ Le même écart en points pèse plus lourd quand l'échantillon grandit.`,
      };
    },
  },

  /* =========================================================================
     PROBA_FREQUENCE_DEFI
  ========================================================================= */
  {
    kind: "template",
    id: "4e_proba_frequence_defi_tpl_1_de_truque",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare la fréquence observée à la probabilité, et regarde le nombre d'essais.",
    tags: ["frequence", "defi", "de", "qcm", "template", "canvas"],
    generate: () => {
      const c = tirerCtx(CONTEXTES_PROBA);
      const { num, den } = c.proba!;
      // ⛔ 08/10 : 78 « 9 » sur 600 tirages (60 attendus) arrive une fois sur cent :
      // ce n'est pas assez rare pour dire « oui, l'écart est trop grand ». On tire
      // jusqu'à un écart qui arrive moins d'une fois sur mille.
      let n = 1200, attendu = 200, observe = 300, q = 0;
      for (let t = 0; t < 100; t++) {
        n = randomChoice([600, 1200, 2000, 3000].filter((x) => (x * num) % den === 0));
        attendu = (n * num) / den;
        observe = Math.round(attendu * randomChoice([1.3, 1.4, 1.5, 1.6, 1.8]));
        q = queueBinomiale(n, num / den, observe);
        if (q < 0.001) break;
      }
      const qui = randomChoice(PRENOMS);
      const N = fr(n), A = fr(attendu), O = fr(observe);
      const recit = randomChoice([
        `${qui} ${c.action(N)} : ${c.res(O)}, alors qu'on en attendait ${A}.`,
        `${qui} ${c.action(N)}. D'après la probabilité ${probaTxt(c)}, on attendait ${A} fois l'issue ${c.evt} ; on l'obtient ${O} fois.`,
        `On attendait ${A} fois l'issue ${c.evt}, et elle sort ${O} fois : c'est ce qu'observe ${qui}, qui ${c.action(N)}.`,
      ]);
      const qq = randomChoice([
        `Peut-on soupçonner que ${c.truque} ?`,
        `A-t-on de bonnes raisons de penser que ${c.truque} ?`,
        "Ce résultat est-il suspect ?",
      ]);
      const correct = "oui : l'écart est trop grand sur autant d'essais";
      return {
        text: `${recit} ${qq}`,
        format: "qcm",
        choices: makeChoices(correct, [
          "non : le hasard explique tout écart",
          "non : il faudrait 100 000 essais",
          "oui, mais seulement si l'objet est neuf",
          "on ne peut jamais rien conclure d'une expérience",
          `non : la probabilité reste ${probaTxt(c)} quoi qu'il arrive`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : plus l'échantillon est grand, plus un écart devient significatif.\n\n" +
          "Méthode : on compare la fréquence observée à la probabilité, ET on regarde le nombre d'essais.\n\n" +
          `Calcul : observé ${pct(observe, n)} contre ${pct(attendu, n)} attendus, sur ${N} ${c.essais} — soit ${fr(observe - attendu)} fois de trop. Par hasard, cela arrive ${direQueue(q)}.\n\n` +
          "Conclusion : ⭐ le même écart sur une douzaine d'essais ne prouverait rien. C'est la conjonction ÉCART + NOMBRE D'ESSAIS qui autorise le soupçon, jamais l'un des deux seul.",
        canvas: c.canvas,
      };
    },
  },
  {
    kind: "template",
    id: "4e_proba_frequence_defi_tpl_2_deux_erreurs",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux élèves se trompent en sens opposé.",
    tags: ["frequence", "defi", "piege", "qcm", "template"],
    generate: () => {
      const c = tirerCtx(CONTEXTES_PROBA);
      const { num, den } = c.proba!;
      const p = num / den;
      let n = 20, observe = 8;
      for (let t = 0; t < 200; t++) {
        n = den * randomChoice([3, 4, 5, 6, 8, 10].filter((m) => den * m >= 12 && den * m <= 60));
        const att = n * p;
        observe = att + Math.max(1, Math.round(Math.sqrt(n * p * (1 - p)) * randomChoice([0.5, 0.8, 1]))) * randomChoice([-1, 1]);
        if (observe > 0 && observe < n && queueBinomiale(n, p, observe) >= 0.1) break;
      }
      const [a, b] = deuxPrenoms();
      const PT = probaTxt(c);
      const recit = randomChoice([
        `${a} ${c.action(fr(n))} : ${c.res(fr(observe))}.`,
        `Sur ${fr(n)} ${c.essais}, ${c.resNom(fr(observe))} : c'est le relevé ${deQui(a)}, qui ${c.action(fr(n))}.`,
        `${a} ${c.action(fr(n))} et obtient l'issue ${c.evt} ${fr(observe)} fois.`,
      ]);
      const dits = `${a} dit : « la probabilité n'est donc pas ${PT} ». ${b} dit : « il faut continuer jusqu'à retomber exactement sur la proportion ${PT} ».`;
      const q = randomChoice(["Qui a raison ?", "Lequel des deux a raison ?", "Que penser de ces deux avis ?"]);
      const correct = `aucun des deux : l'écart est normal, et la probabilité reste ${PT}`;
      return {
        text: `${recit} ${dits} ${q}`,
        format: "qcm",
        choices: makeChoices(correct, [
          a,
          b,
          "les deux",
          `${a}, car la fréquence observée fait foi`,
          `${b}, car la moyenne doit se rétablir`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une probabilité ne prédit pas un résultat, elle décrit une tendance sur un grand nombre d'essais.\n\n" +
          "Méthode : on repère les DEUX erreurs symétriques.\n\n" +
          `Calcul : ${pct(observe, n)} au lieu de ${pct(num, den)} sur ${fr(n)} ${c.essais} — un écart ordinaire, qui arrive ${direQueue(queueBinomiale(n, p, observe))} par hasard.\n\n` +
          `Conclusion : ⛔ ${a} déduit du hasard que le calcul est faux ; ${b} attend du hasard qu'il se corrige. Les deux erreurs sont opposées et fausses toutes les deux — le hasard ne se corrige pas, il se moyenne.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_proba_frequence_defi_tpl_3_estimer",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Quand on ne peut pas calculer la probabilité, on l'estime en répétant.",
    tags: ["frequence", "defi", "estimer", "template", "canvas"],
    generate: () => {
      const c = tirerCtx(CONTEXTES_MESURE, (x) => x.maxN >= 200);
      const { n, k, p } = tirerSerie(c, [200, 250, 400, 500, 1000]);
      const qui = randomChoice(PRENOMS);
      const recit = randomChoice([
        `${qui} ${c.action(fr(n))} : ${c.res(fr(k))}.`,
        `${qui} ${c.action(fr(n))}. Sur ces ${fr(n)} ${c.essais}, ${c.resNom(fr(k))}.`,
        `${cap(c.resNom(fr(k)))} sur ${fr(n)} ${c.essais} : c'est le relevé ${deQui(qui)}, qui ${c.action(fr(n))}.`,
      ]);
      const q = randomChoice([
        `Estime la probabilité de l'issue ${c.evt}, en pourcentage.`,
        `On ne peut pas calculer la probabilité de l'issue ${c.evt}. Quelle estimation en donner, en pourcentage ?`,
        `Quelle valeur, en pourcentage, peut-on proposer pour la probabilité de l'issue ${c.evt} ?`,
      ]);
      return {
        text: `${recit} ${q}`,
        format: "short",
        expected: [`${p} %`, String(p)],
        comparator: "number_equal",
        explanation:
          "Définition : quand une situation n'est PAS équiprobable, on ne peut pas calculer la probabilité — on l'estime par la fréquence observée.\n\n" +
          "Méthode : on répète beaucoup, et on prend la fréquence obtenue comme estimation.\n\n" +
          `Calcul : ${fr(k)} ÷ ${fr(n)} = ${fr(p / 100)}, soit ${p} %.\n\n` +
          "Conclusion : ⭐ c'est l'usage le plus important de la notion. Un dé se calcule, une punaise se mesure — et c'est la répétition qui remplace le calcul.",
        canvas: barresFrequence([
          { label: c.evt.replace(/[«»]/g, "").trim(), value: p, color: "#2563eb" },
          { label: c.autre.replace(/[«»]/g, "").trim(), value: 100 - p, color: "#94a3b8" },
        ]),
      };
    },
  },
  {
    // ★5 — se servir de l'estimation pour prévoir.
    kind: "template",
    id: "4e_proba_frequence_defi_tpl_4_prevoir",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "La fréquence mesurée sur beaucoup d'essais sert d'estimation de la probabilité.",
    tags: ["frequence", "defi", "estimer", "template"],
    generate: () => {
      const c = tirerCtx(CONTEXTES_MESURE, (x) => x.maxN >= 200);
      const { n, p } = tirerSerie(c, [200, 400, 500, 1000]);
      let m = 100;
      for (let t = 0; t < 50; t++) {
        m = randomChoice([20, 25, 40, 50, 80, 100, 150, 200].filter((x) => x <= c.maxN));
        if (Number.isInteger((m * p) / 100)) break;
      }
      const prevu = (m * p) / 100;
      const qui = randomChoice(PRENOMS);
      const text = randomChoice([
        `${qui} ${c.action(fr(n))} : la fréquence de l'issue ${c.evt} est de ${p} %. ${qui} recommence avec ${fr(m)} autres ${c.essais}. Combien de fois peut-on s'attendre, environ, à l'issue ${c.evt} ?`,
        `Sur ${fr(n)} ${c.essais}, la fréquence de l'issue ${c.evt} a été de ${p} % : c'est le relevé ${deQui(qui)}, qui ${c.action(fr(n))}. Sur ${fr(m)} autres ${c.essais}, combien de fois l'issue ${c.evt} devrait-elle se produire environ ?`,
        `D'après ${fr(n)} ${c.essais}, l'issue ${c.evt} a une fréquence de ${fr(p / 100)}. Prévois le nombre approximatif d'issues ${c.evt} sur ${fr(m)} nouveaux essais.`,
      ]);
      return {
        text,
        format: "short",
        expected: [fr(prevu), String(prevu)],
        comparator: "number_equal",
        explanation:
          `Définition : sur ${fr(n)} ${c.essais}, la fréquence ${p} % est une bonne estimation de la probabilité.\n\n` +
          "Méthode : nombre attendu ≈ probabilité estimée × nombre d'essais.\n\n" +
          `Calcul : ${fr(p / 100)} × ${fr(m)} = ${fr(prevu)}.\n\n` +
          `Conclusion : on peut s'attendre à environ ${fr(prevu)} fois l'issue ${c.evt}. ⚠️ « Environ » : la nouvelle série donnera un nombre proche, pas forcément exactement celui-là.`,
      };
    },
  },
];
