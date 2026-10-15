// lib/tutor-v4/questionBank/premiere-spe/maths/probabilites-conditionnelles.bank.ts
//
// Chapitre : Probabilités conditionnelles et indépendance (notion "probabilites_conditionnelles")
// microSkills :
//   pc_conditionnelle             — calculer une probabilité conditionnelle P_A(B)
//   pc_registres                  — passer de la langue naturelle à l'écriture symbolique
//   pc_tableau                    — probabilité conditionnelle dans un tableau croisé
//   pc_arbre_construire           — construire un arbre pondéré à partir d'un énoncé
//   pc_arbre                      — arbre pondéré : règle du produit et de la somme
//   pc_partition                  — reconnaître une partition de l'univers
//   pc_totales                    — formule des probabilités totales
//   pc_inverser                   — distinguer P_A(B) et P_B(A) : les faux positifs
//   pc_independance               — indépendance de deux événements
//   pc_independance_incompatible  — ne pas confondre indépendants et incompatibles
//   pc_succession                 — succession de deux épreuves indépendantes
//
// ⚠️ Quinze items écrits avant le découpage en onze micro-compétences sont
// restés à leur place dans le fichier, mais leur `microId` a été réaffecté
// (leur `id` est inchangé). C'est le `microId` qui fait foi, pas le
// commentaire de section.
//
// PÉRIMÈTRE BO Première spé. Conventions : LaTeX, règle QCM.
// Canvas : arbre_proba, tableau_donnees (tableau croisé).
//
// Règle d'écriture : un `fixed` pour une valeur exceptionnelle, un piège, une
// propriété ou un contexte 974 ; un `template` pour tout calcul dont on peut
// changer les nombres ; plusieurs ouvertes dont un template ouvert.

import type { TutorBankItemV4, CanvasFigure, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

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


function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickOne<T>(arr: readonly T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

// Format virgule française pour l'affichage des probabilités dans l'arbre.
function fr(x: number): string {
  return String(Math.round(x * 100) / 100).replace(".", ",");
}

function arbre(pA: number, pBsiA: number, pBsiNonA: number): CanvasFigure {
  return {
    kind: "arbre_proba",
    titre: "Arbre pondéré",
    racineEnfants: [
      {
        label: "A",
        proba: fr(pA),
        enfants: [
          { label: "B", proba: fr(pBsiA) },
          { label: "B̄", proba: fr(1 - pBsiA) },
        ],
      },
      {
        label: "Ā",
        proba: fr(1 - pA),
        enfants: [
          { label: "B", proba: fr(pBsiNonA) },
          { label: "B̄", proba: fr(1 - pBsiNonA) },
        ],
      },
    ],
  };
}

/* =========================================================================
   ⛔⛔ 15/10/2026 — PC_CONDITIONNELLE : « DES QUESTIONS REVIENNENT ».
   Mesuré avant (scripts/mesurer-squelettes-coach.ts premiere-spe
   probabilites_conditionnelles) : 9 squelettes, environ 17 répétitions sur une
   série de 20 à chaque étoile. Le seul gabarit tirait des NOMBRES dans une
   phrase fixe (« On a P(A) = … et P(A ∩ B) = … »).
   Même méthode que les probabilités de 3e (dd5e9f75) : chaque gabarit compose
     · une SITUATION (seize : car jaune du lycée, dépistage de la dengue, Grand
       Raid, météo de Saint-Pierre, spécialité maths, contrôle dans le car,
       ananas Victoria, vaccin contre la grippe, filtre anti-spam, bac blanc,
       Piton de la Fournaise, vols de Roland-Garros…), avec ses deux
       événements écrits au singulier, au pluriel et à la forme négative ;
     · une PRÉSENTATION des données (effectifs « parmi… », probabilités,
       pourcentages) ;
     · une TOURNURE (« sachant que… », « parmi les… », notation $P_C(R)$…).
   Les nombres sont des EFFECTIFS entiers tirés pour que le quotient demandé
   tombe juste (au millième au plus) : réponse exacte, corrigé au texte exact.
   QCM : les leurres sont les vraies erreurs (diviser par l'effectif total,
   prendre $P_B(A)$ au lieu de $P_A(B)$, donner $P(A \cap B)$, oublier le
   complémentaire) et deux choix n'ont jamais la même VALEUR.
========================================================================= */

/** Un événement d'une situation : singulier, pluriel, et leurs négations. */
type PcEv = { L: string; s: string; p: string; ns: string; np: string };
type PcCtx = {
  /** « On a interrogé 240 élèves d'un lycée de Saint-Denis. » */
  pop: string;
  /** « les élèves qui… » */
  court: string;
  un: string;
  le: string;
  il: string;
  eux: string;
  ceux: string;
  A: PcEv;
  B: PcEv;
  /** Le verbe du recueil : « On a interrogé », « On a observé »… */
  verbe: string;
};

const PC_CTX: readonly PcCtx[] = [
  {
    verbe: "On a interrogé", pop: "élèves d'un lycée de Saint-Denis", court: "élèves", un: "un élève", le: "l'élève", il: "il", eux: "eux", ceux: "ceux",
    A: { L: "C", s: "prend le car jaune", p: "prennent le car jaune", ns: "ne prend pas le car jaune", np: "ne prennent pas le car jaune" },
    B: { L: "R", s: "est arrivé en retard ce mois-ci", p: "sont arrivés en retard ce mois-ci", ns: "n'est jamais arrivé en retard ce mois-ci", np: "ne sont jamais arrivés en retard ce mois-ci" },
  },
  {
    verbe: "Lors d'une campagne de dépistage de la dengue, on a testé", pop: "personnes", court: "personnes", un: "une personne", le: "la personne", il: "elle", eux: "elles", ceux: "celles",
    A: { L: "M", s: "est porteuse du virus", p: "sont porteuses du virus", ns: "n'est pas porteuse du virus", np: "ne sont pas porteuses du virus" },
    B: { L: "T", s: "a un test positif", p: "ont un test positif", ns: "a un test négatif", np: "ont un test négatif" },
  },
  {
    verbe: "Au départ du Grand Raid, on a suivi", pop: "coureurs", court: "coureurs", un: "un coureur", le: "le coureur", il: "il", eux: "eux", ceux: "ceux",
    A: { L: "J", s: "a moins de 30 ans", p: "ont moins de 30 ans", ns: "a 30 ans ou plus", np: "ont 30 ans ou plus" },
    B: { L: "F", s: "termine la course", p: "terminent la course", ns: "abandonne", np: "abandonnent" },
  },
  {
    verbe: "Une station météo de Saint-Pierre a relevé", pop: "jours", court: "jours", un: "un jour", le: "le jour", il: "il", eux: "eux", ceux: "ceux",
    A: { L: "V", s: "a du vent fort", p: "ont du vent fort", ns: "n'a pas de vent fort", np: "n'ont pas de vent fort" },
    B: { L: "P", s: "est pluvieux", p: "sont pluvieux", ns: "est sec", np: "sont secs" },
  },
  {
    verbe: "On a sondé", pop: "élèves de première d'un lycée du Tampon", court: "élèves", un: "un élève", le: "l'élève", il: "il", eux: "eux", ceux: "ceux",
    A: { L: "M", s: "a choisi la spécialité maths", p: "ont choisi la spécialité maths", ns: "n'a pas choisi la spécialité maths", np: "n'ont pas choisi la spécialité maths" },
    B: { L: "S", s: "fait du sport en club", p: "font du sport en club", ns: "ne fait pas de sport en club", np: "ne font pas de sport en club" },
  },
  {
    verbe: "Sur une ligne de car, on a compté", pop: "voyageurs", court: "voyageurs", un: "un voyageur", le: "le voyageur", il: "il", eux: "eux", ceux: "ceux",
    A: { L: "A", s: "a un abonnement", p: "ont un abonnement", ns: "n'a pas d'abonnement", np: "n'ont pas d'abonnement" },
    B: { L: "K", s: "est contrôlé", p: "sont contrôlés", ns: "n'est pas contrôlé", np: "ne sont pas contrôlés" },
  },
  {
    verbe: "Dans une exploitation de Saint-André, on a examiné", pop: "ananas Victoria", court: "ananas", un: "un ananas", le: "l'ananas", il: "il", eux: "eux", ceux: "ceux",
    A: { L: "H", s: "vient de la parcelle du haut", p: "viennent de la parcelle du haut", ns: "vient de la parcelle du bas", np: "viennent de la parcelle du bas" },
    B: { L: "V", s: "est assez mûr pour être vendu", p: "sont assez mûrs pour être vendus", ns: "n'est pas assez mûr", np: "ne sont pas assez mûrs" },
  },
  {
    verbe: "Une entreprise du Port a interrogé", pop: "salariés", court: "salariés", un: "un salarié", le: "le salarié", il: "il", eux: "eux", ceux: "ceux",
    A: { L: "V", s: "est vacciné contre la grippe", p: "sont vaccinés contre la grippe", ns: "n'est pas vacciné contre la grippe", np: "ne sont pas vaccinés contre la grippe" },
    B: { L: "G", s: "a eu la grippe cet hiver", p: "ont eu la grippe cet hiver", ns: "n'a pas eu la grippe cet hiver", np: "n'ont pas eu la grippe cet hiver" },
  },
  {
    verbe: "Un magasin d'électroménager a suivi", pop: "clients", court: "clients", un: "un client", le: "le client", il: "il", eux: "eux", ceux: "ceux",
    A: { L: "E", s: "a pris l'extension de garantie", p: "ont pris l'extension de garantie", ns: "n'a pas pris l'extension de garantie", np: "n'ont pas pris l'extension de garantie" },
    B: { L: "D", s: "a eu une panne la première année", p: "ont eu une panne la première année", ns: "n'a eu aucune panne la première année", np: "n'ont eu aucune panne la première année" },
  },
  {
    verbe: "Une plateforme de musique a étudié", pop: "abonnés réunionnais", court: "abonnés", un: "un abonné", le: "l'abonné", il: "il", eux: "eux", ceux: "ceux",
    A: { L: "M", s: "écoute du maloya", p: "écoutent du maloya", ns: "n'écoute pas de maloya", np: "n'écoutent pas de maloya" },
    B: { L: "S", s: "écoute du séga", p: "écoutent du séga", ns: "n'écoute pas de séga", np: "n'écoutent pas de séga" },
  },
  {
    verbe: "Sur la plage de l'Hermitage, on a interrogé", pop: "baigneurs", court: "baigneurs", un: "un baigneur", le: "le baigneur", il: "il", eux: "eux", ceux: "ceux",
    A: { L: "O", s: "habite dans l'Ouest", p: "habitent dans l'Ouest", ns: "n'habite pas dans l'Ouest", np: "n'habitent pas dans l'Ouest" },
    B: { L: "H", s: "vient chaque semaine", p: "viennent chaque semaine", ns: "vient moins souvent", np: "viennent moins souvent" },
  },
  {
    verbe: "Une messagerie a analysé", pop: "courriels", court: "courriels", un: "un courriel", le: "le courriel", il: "il", eux: "eux", ceux: "ceux",
    A: { L: "S", s: "est un spam", p: "sont des spams", ns: "n'est pas un spam", np: "ne sont pas des spams" },
    B: { L: "F", s: "est classé indésirable par le filtre", p: "sont classés indésirables par le filtre", ns: "n'est pas classé indésirable", np: "ne sont pas classés indésirables" },
  },
  {
    verbe: "Après le bac blanc, on a interrogé", pop: "élèves de terminale", court: "élèves", un: "un élève", le: "l'élève", il: "il", eux: "eux", ceux: "ceux",
    A: { L: "R", s: "a révisé avec des annales", p: "ont révisé avec des annales", ns: "n'a pas révisé avec des annales", np: "n'ont pas révisé avec des annales" },
    B: { L: "M", s: "a eu la moyenne", p: "ont eu la moyenne", ns: "n'a pas eu la moyenne", np: "n'ont pas eu la moyenne" },
  },
  {
    verbe: "Au Pas de Bellecombe, on a interrogé", pop: "randonneurs montés au Piton de la Fournaise", court: "randonneurs", un: "un randonneur", le: "le randonneur", il: "il", eux: "eux", ceux: "ceux",
    A: { L: "T", s: "est parti avant l'aube", p: "sont partis avant l'aube", ns: "est parti après l'aube", np: "sont partis après l'aube" },
    B: { L: "D", s: "a vu le cratère sans nuages", p: "ont vu le cratère sans nuages", ns: "a trouvé le cratère dans les nuages", np: "ont trouvé le cratère dans les nuages" },
  },
  {
    verbe: "L'aéroport Roland-Garros a recensé", pop: "vols au départ", court: "vols", un: "un vol", le: "le vol", il: "il", eux: "eux", ceux: "ceux",
    A: { L: "M", s: "part vers la métropole", p: "partent vers la métropole", ns: "part vers une autre destination", np: "partent vers une autre destination" },
    B: { L: "R", s: "décolle en retard", p: "décollent en retard", ns: "décolle à l'heure", np: "décollent à l'heure" },
  },
  {
    verbe: "Lors d'un concours de pêche à Saint-Leu, on a pesé", pop: "poissons", court: "poissons", un: "un poisson", le: "le poisson", il: "il", eux: "eux", ceux: "ceux",
    A: { L: "L", s: "a été pris au large", p: "ont été pris au large", ns: "a été pris près du bord", np: "ont été pris près du bord" },
    B: { L: "K", s: "pèse plus d'un kilo", p: "pèsent plus d'un kilo", ns: "pèse un kilo ou moins", np: "pèsent un kilo ou moins" },
  },
];

/** « qu'il », « qu'elle ». */
const pcQue = (il: string) => `qu'${il}`;
const pcMaj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Le quotient a/b tombe-t-il juste avec au plus `dec` décimales ? */
function pcJuste(a: number, b: number, dec = 3): boolean {
  if (b <= 0) return false;
  const v = (a / b) * 10 ** dec;
  return Math.abs(v - Math.round(v)) < 1e-9;
}
/** a/b en écriture décimale française, sans bruit de calcul flottant. */
function pcDec(a: number, b: number): string {
  return String(Math.round((a / b) * 10000) / 10000).replace(".", ",");
}
/** La même chose, pour l'intérieur des $…$ : « 0{,}375 ». */
const pcM = (a: number, b: number) => pcDec(a, b).replace(",", "{,}");
/** Un pourcentage a/b (doit tomber juste au dixième) : « 37,5 % ». */
const pcPct = (a: number, b: number) => `${pcDec(100 * a, b)} %`;
const pcPctM = (a: number, b: number) => `${pcM(100 * a, b)}\\,\\%`;
function pcPgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pcPgcd(b, a % b);
}
const pcFrac = (a: number, b: number) => `\\dfrac{${a}}{${b}}`;
/** Toutes les écritures acceptées d'un quotient a/b qui tombe juste. */
function pcEcritures(a: number, b: number): string[] {
  const g = pcPgcd(a, b);
  const d = pcDec(a, b);
  return [...new Set([d, d.replace(",", "."), `${a / g}/${b / g}`, `${a}/${b}`, pcPct(a, b), pcPct(a, b).replace(" ", "")])];
}

/**
 * Les effectifs d'une situation : N individus, nA dans A, nAB dans A et B,
 * nB dans B. `ok` filtre (quotient juste, leurres distincts…).
 */
type PcEff = { N: number; nA: number; nAB: number; nB: number };
function pcTirer(ok: (e: PcEff) => boolean, totaux?: readonly number[]): PcEff {
  for (let t = 0; t < 20000; t++) {
    const N = totaux ? pickOne(totaux) : randomInt(6, 60) * 10;
    const nA = randomInt(Math.ceil(0.2 * N), Math.floor(0.7 * N));
    const nAB = randomInt(Math.max(1, Math.ceil(0.1 * nA)), Math.floor(0.9 * nA));
    const reste = N - nA;
    const nB = nAB + randomInt(Math.max(1, Math.ceil(0.1 * reste)), Math.floor(0.85 * reste));
    const e = { N, nA, nAB, nB };
    if (nAB < nA && nB < N && ok(e)) return e;
  }
  return { N: 200, nA: 80, nAB: 30, nB: 90 };
}

/** Bonne réponse + trois leurres de VALEURS distinctes (fractions [a, b]). */
function pcQcm(bon: [number, number], leurres: [number, number][]): { choices: string[]; expected: string } {
  const val = (f: [number, number]) => f[0] / f[1];
  const pris: [number, number][] = [];
  for (const l of leurres) {
    if (l[1] <= 0) continue;
    if (Math.abs(val(l) - val(bon)) < 1e-9) continue;
    if (pris.some((p) => Math.abs(val(p) - val(l)) < 1e-9)) continue;
    pris.push(l);
    if (pris.length === 3) break;
  }
  const txt = (f: [number, number]) => `$${pcFrac(f[0], f[1])}$`;
  return { choices: shuffle([txt(bon), ...pris.map(txt)]), expected: txt(bon) };
}
/** Nombre de leurres de valeurs distinctes entre eux et de la bonne réponse. */
function pcDistincts(bon: [number, number], leurres: [number, number][]): number {
  const vals = [bon[0] / bon[1]];
  for (const l of leurres) {
    const v = l[0] / l[1];
    if (l[1] > 0 && !vals.some((x) => Math.abs(x - v) < 1e-9)) vals.push(v);
  }
  return vals.length - 1;
}

/** La phrase des données, en effectifs, avec la condition « parmi ». */
function pcDonneesEff(c: PcCtx, e: PcEff, avecB: boolean): string {
  const v = pickOne([0, 1, 2]);
  const fin = avecB ? ` Au total, $${e.nB}$ ${c.court} ${c.B.p}.` : "";
  if (v === 0) return `${c.verbe} $${e.N}$ ${c.pop}. Parmi ${c.eux}, $${e.nA}$ ${c.A.p} ; parmi ces $${e.nA}$, $${e.nAB}$ ${c.B.p}.${fin}`;
  if (v === 1) return `${c.verbe} $${e.N}$ ${c.pop} : $${e.nA}$ ${c.A.p} et, parmi ${c.eux}, $${e.nAB}$ ${c.B.p}.${fin}`;
  return `${c.verbe} $${e.N}$ ${c.pop}. $${e.nA}$ d'entre ${c.eux} ${c.A.p}, les autres ${c.A.np}. Enfin, $${e.nAB}$ ${c.court} ${c.A.p} et ${c.B.p}.${fin}`;
}

/** La question « probabilité de B sachant A », sous une tournure tirée. */
// `avecDef` vide : les données ont déjà tiré l'individu et nommé les événements.
function pcQuestionSachant(c: PcCtx, cond: string, condP: string, cible: string, cibleP: string, notation: string, avecDef: string): string {
  const deja = avecDef === "";
  const t = pickOne([0, 1, 2, 3]);
  if (t === 0)
    return deja
      ? `Sachant que ${c.le} ${cond}, quelle est la probabilité de l'événement « ${c.il} ${cible} » ?`
      : `On choisit ${c.un} au hasard. Sachant ${pcQue(c.il)} ${cond}, quelle est la probabilité de l'événement « ${c.il} ${cible} » ?`;
  if (t === 1) return `On choisit au hasard ${c.un} qui ${cond}. Quelle est la probabilité de l'événement « ${c.il} ${cible} » ?`;
  if (t === 2) return `Parmi les ${c.court} qui ${condP}, quelle est la proportion de ${c.ceux} qui ${cibleP} ? Donne-la en écriture décimale.`;
  return deja ? `Calcule $${notation}$.` : `On choisit ${c.un} au hasard. ${avecDef} Calcule $${notation}$.`;
}
/** « On note C : « l'élève prend le car » et R : « … ». » */
/** Les deux lettres d'une situation sont distinctes (sinon on renomme B). */
const pcLettres = (c: PcCtx) => ({ a: c.A.L, b: c.B.L === c.A.L ? `${c.B.L}'` : c.B.L });
const pcDef = (c: PcCtx) => {
  const { a, b } = pcLettres(c);
  return `On note $${a}$ l'événement « ${c.le} ${c.A.s} » et $${b}$ l'événement « ${c.le} ${c.B.s} ».`;
};

/** Les données en probabilités, ou en pourcentages de la population. */
function pcDonneesProba(c: PcCtx, e: PcEff, pct: boolean): string {
  const { a, b } = pcLettres(c);
  if (pct)
    return `${c.verbe} des ${c.pop} : $${pcPctM(e.nA, e.N)}$ d'entre ${c.eux} ${c.A.p}, et $${pcPctM(e.nAB, e.N)}$ ${c.A.p} et ${c.B.p} à la fois.`;
  return `On choisit ${c.un} au hasard. On note $${a}$ l'événement « ${c.le} ${c.A.s} » et $${b}$ l'événement « ${c.le} ${c.B.s} ». On sait que $P(${a}) = ${pcM(e.nA, e.N)}$ et $P(${a} \\cap ${b}) = ${pcM(e.nAB, e.N)}$.`;
}

/* ---------- Les titres courts (tableaux, arbres), dans l'ordre de PC_CTX ---------- */
const PC_TITRES: readonly [string, string, string, string][] = [
  ["Car jaune", "Pas le car", "En retard", "Jamais en retard"],
  ["Porteuses", "Non porteuses", "Test positif", "Test négatif"],
  ["Moins de 30 ans", "30 ans ou plus", "Finishers", "Abandons"],
  ["Vent fort", "Pas de vent fort", "Pluvieux", "Secs"],
  ["Spé maths", "Sans spé maths", "Sport en club", "Pas de club"],
  ["Abonnés", "Sans abonnement", "Contrôlés", "Non contrôlés"],
  ["Parcelle du haut", "Parcelle du bas", "Mûrs", "Pas mûrs"],
  ["Vaccinés", "Non vaccinés", "Grippe", "Pas de grippe"],
  ["Avec extension", "Sans extension", "Panne", "Sans panne"],
  ["Maloya", "Pas de maloya", "Séga", "Pas de séga"],
  ["Ouest", "Hors de l'Ouest", "Chaque semaine", "Moins souvent"],
  ["Spams", "Pas des spams", "Indésirables", "Non classés"],
  ["Annales", "Sans annales", "Moyenne", "Sous la moyenne"],
  ["Avant l'aube", "Après l'aube", "Sans nuages", "Dans les nuages"],
  ["Métropole", "Autres destinations", "En retard", "À l'heure"],
  ["Au large", "Près du bord", "Plus d'un kilo", "Un kilo ou moins"],
];
/** Une situation tirée, avec ses titres courts et ses lettres. */
function pcSituation() {
  const k = randomInt(0, PC_CTX.length - 1);
  const c = PC_CTX[k];
  const [tA, ntA, tB, ntB] = PC_TITRES[k];
  return { c, tA, ntA, tB, ntB, ...pcLettres(c) };
}
/** Le tableau croisé d'effectifs d'une situation (lignes : A / non A). */
function pcTableau(s: ReturnType<typeof pcSituation>, e: PcEff, highlight?: { row?: number; col?: number }): CanvasFigure {
  const ab = e.nB - e.nAB;
  return {
    kind: "tableau_donnees",
    title: `Répartition des ${s.c.court}`,
    headers: ["", s.tB, s.ntB, "Total"],
    rows: [
      { label: s.tA, values: [e.nAB, e.nA - e.nAB, e.nA] },
      { label: s.ntA, values: [ab, e.N - e.nA - ab, e.N - e.nA] },
      { label: "Total", values: [e.nB, e.N - e.nB, e.N] },
    ],
    ...(highlight ? { highlight } : {}),
  } as CanvasFigure;
}
/** L'arbre pondéré d'une situation, probabilités écrites à la française. */
function pcArbreFig(a: string, b: string, pA: string, pBA: string, pBnA: string, qA: string, qBA: string, qBnA: string): CanvasFigure {
  return {
    kind: "arbre_proba",
    titre: "Arbre pondéré",
    racineEnfants: [
      { label: a, proba: pA, enfants: [{ label: b, proba: pBA }, { label: `${b}̄`, proba: qBA }] },
      { label: `${a}̄`, proba: qA, enfants: [{ label: b, proba: pBnA }, { label: `${b}̄`, proba: qBnA }] },
    ],
  };
}
/** Deux décimaux exacts en millièmes : « 0,35 » à partir de 350 ‰. */
const pcMil = (m: number) => pcDec(m, 1000);
const pcMilM = (m: number) => pcM(m, 1000);

/* ===================== PC_TABLEAU : générateurs ===================== */
type PcS = ReturnType<typeof pcSituation>;
/** Effectif d'une case du tableau (ligne A ou Ā, colonne B ou B̄). */
function pcCase(e: PcEff, enA: boolean, enB: boolean): number {
  const ab = e.nB - e.nAB;
  if (enA) return enB ? e.nAB : e.nA - e.nAB;
  return enB ? ab : e.N - e.nA - ab;
}
const pcLigne = (e: PcEff, enA: boolean) => (enA ? e.nA : e.N - e.nA);
const pcColonne = (e: PcEff, enB: boolean) => (enB ? e.nB : e.N - e.nB);
/** La cible d'une question de tableau : condition sur une ligne ou une colonne. */
function pcCibleTableau(s: PcS, parLigne: boolean) {
  const enA = Math.random() < 0.6;
  const enB = Math.random() < 0.6;
  const A = s.c.A, B = s.c.B;
  const la = enA ? s.a : `\\overline{${s.a}}`, lb = enB ? s.b : `\\overline{${s.b}}`;
  return parLigne
    ? { enA, enB, cond: enA ? A.s : A.ns, condP: enA ? A.p : A.np, cible: enB ? B.s : B.ns, cibleP: enB ? B.p : B.np, not: `P_{${la}}(${lb})`, autre: `P_{${lb}}(${la})` }
    : { enA, enB, cond: enB ? B.s : B.ns, condP: enB ? B.p : B.np, cible: enA ? A.s : A.ns, cibleP: enA ? A.p : A.np, not: `P_{${lb}}(${la})`, autre: `P_{${la}}(${lb})` };
}
/** ★4 (QCM, condition sur une ligne) et ★5 (condition sur une colonne). */
function pcGenTableauQcm(parLigne: boolean): TutorGeneratedQuestionV4 {
  const s = pcSituation();
  const t = pcCibleTableau(s, parLigne);
  const den = (e: PcEff) => (parLigne ? pcLigne(e, t.enA) : pcColonne(e, t.enB));
  const fausses = (e: PcEff): [number, number][] => {
    const n = pcCase(e, t.enA, t.enB);
    return [[n, e.N], [n, parLigne ? pcColonne(e, t.enB) : pcLigne(e, t.enA)], [den(e), e.N], [den(e) - n, den(e)]];
  };
  const e = pcTirer((x) => pcCase(x, t.enA, t.enB) > 0 && pcCase(x, !t.enA, !t.enB) > 0 && pcDistincts([pcCase(x, t.enA, t.enB), den(x)], fausses(x)) >= 3);
  const n = pcCase(e, t.enA, t.enB);
  const q = pcQcm([n, den(e)], fausses(e));
  return {
    text: `Le tableau donne la répartition de $${e.N}$ ${s.c.pop}. ${pcQuestionSachant(s.c, t.cond, t.condP, t.cible, t.cibleP, t.not, pcDef(s.c)).replace(" Donne-la en écriture décimale.", "")}`,
    format: "qcm",
    choices: q.choices,
    expected: [q.expected],
    comparator: "mcq_exact",
    canvas: pcTableau(s, e),
    explanation: exp(
      `La condition est « ${s.c.le} ${t.cond} » : on ne lit que la ${parLigne ? "LIGNE" : "COLONNE"} « ${parLigne ? (t.enA ? s.tA : s.ntA) : t.enB ? s.tB : s.ntB} », d'effectif $${den(e)}$.`,
      `Dans cette ${parLigne ? "ligne" : "colonne"}, la case « ${t.cible} » contient $${n}$ ${s.c.court}.`,
      `$${t.not} = \\dfrac{${n}}{${den(e)}}$. Diviser par $${e.N}$ donnerait la probabilité de l'intersection ; diviser par $${parLigne ? pcColonne(e, t.enB) : pcLigne(e, t.enA)}$ donnerait $${t.autre}$.`,
      `La bonne réponse est $\\dfrac{${n}}{${den(e)}}$.`
    ),
  };
}
/** ★4 / ★5 (réponse décimale) : ligne ou colonne. */
function pcGenTableauCourt(parLigne: boolean): TutorGeneratedQuestionV4 {
  const s = pcSituation();
  const t = pcCibleTableau(s, parLigne);
  const den = (e: PcEff) => (parLigne ? pcLigne(e, t.enA) : pcColonne(e, t.enB));
  const e = pcTirer((x) => pcCase(x, t.enA, t.enB) > 0 && pcJuste(pcCase(x, t.enA, t.enB), den(x)));
  const n = pcCase(e, t.enA, t.enB);
  return {
    text: `Le tableau donne la répartition de $${e.N}$ ${s.c.pop}. ${pcQuestionSachant(s.c, t.cond, t.condP, t.cible, t.cibleP, t.not, pcDef(s.c))}`,
    format: "short",
    expected: pcEcritures(n, den(e)),
    comparator: "number_equal",
    canvas: pcTableau(s, e),
    explanation: exp(
      `« Sachant que ${s.c.le} ${t.cond} » : l'univers se réduit à la ${parLigne ? "ligne" : "colonne"} « ${parLigne ? (t.enA ? s.tA : s.ntA) : t.enB ? s.tB : s.ntB} », d'effectif $${den(e)}$.`,
      `On y lit la case de la ${parLigne ? "colonne" : "ligne"} « ${parLigne ? (t.enB ? s.tB : s.ntB) : t.enA ? s.tA : s.ntA} » : $${n}$.`,
      `$${t.not} = \\dfrac{${n}}{${den(e)}} = ${pcM(n, den(e))}$ (et non $\\dfrac{${n}}{${e.N}}$ : le total $${e.N}$ ne sert pas).`,
      `La probabilité est $${pcM(n, den(e))}$.`
    ),
  };
}
/** ★5 ouverte : les DEUX conditionnelles d'une même case, et laquelle est la plus grande. */
function pcGenTableauOuvert(): TutorGeneratedQuestionV4 {
  const s = pcSituation();
  const e = pcTirer((x) => pcJuste(x.nAB, x.nA) && pcJuste(x.nAB, x.nB) && x.nA !== x.nB);
  const r1 = pcDec(e.nAB, e.nA), r2 = pcDec(e.nAB, e.nB);
  const plusA = e.nA < e.nB; // P_A(B) > P_B(A) ssi nA < nB
  const q = pickOne([
    `Calcule $P_{${s.a}}(${s.b})$ et $P_{${s.b}}(${s.a})$, puis dis laquelle est la plus grande.`,
    `Calcule la proportion de ${s.c.ceux} qui ${s.c.B.p} parmi les ${s.c.court} qui ${s.c.A.p}, puis la proportion de ${s.c.ceux} qui ${s.c.A.p} parmi les ${s.c.court} qui ${s.c.B.p}. Laquelle est la plus grande ?`,
  ]);
  return {
    text: `Le tableau donne la répartition de $${e.N}$ ${s.c.pop}. ${pcDef(s.c)} ${q}`,
    format: "open",
    expected: [r1, r2, r1.replace(",", "."), r2.replace(",", ".")],
    comparator: "contains_keyword",
    canvas: pcTableau(s, e),
    explanation: exp(
      `Les deux probabilités utilisent la même case ($${e.nAB}$ ${s.c.court}), mais pas le même groupe de référence.`,
      `$P_{${s.a}}(${s.b}) = \\dfrac{${e.nAB}}{${e.nA}} = ${pcM(e.nAB, e.nA)}$ (ligne « ${s.tA} ») et $P_{${s.b}}(${s.a}) = \\dfrac{${e.nAB}}{${e.nB}} = ${pcM(e.nAB, e.nB)}$ (colonne « ${s.tB} »).`,
      `Même numérateur : la plus grande est celle dont le dénominateur est le plus petit, ici $${plusA ? e.nA : e.nB}$.`,
      `$${plusA ? `P_{${s.a}}(${s.b})` : `P_{${s.b}}(${s.a})`}$ est la plus grande.`
    ),
  };
}

/* ===================== PC_INVERSER : générateurs ===================== */
/** Arrondi au centième, à la française. */
const pcCent = (x: number) => String(Math.round(x * 100) / 100).replace(".", ",");
/** ★4 QCM : traduire « x % des … qui … » — la condition est le groupe de référence. */
function pcGenInverserTraduire(): TutorGeneratedQuestionV4 {
  const s = pcSituation();
  const surA = Math.random() < 0.5; // condition sur A (sinon sur B)
  const neg = Math.random() < 0.3; // la cible est niée
  const x = randomInt(4, 19) * 5;
  const [C, K] = surA ? [s.c.A, s.c.B] : [s.c.B, s.c.A];
  const [lc, lk] = surA ? [s.a, s.b] : [s.b, s.a];
  const lkN = neg ? `\\overline{${lk}}` : lk;
  const cibleP = neg ? K.np : K.p;
  const v = pcM(x, 100);
  const info = pickOne([
    `« Parmi les ${s.c.court} qui ${C.p}, $${x}\\,\\%$ ${cibleP}. »`,
    `« $${x}\\,\\%$ des ${s.c.court} qui ${C.p} ${cibleP}. »`,
    `« Chez les ${s.c.court} qui ${C.p}, la proportion de ${s.c.ceux} qui ${cibleP} est de $${x}\\,\\%$. »`,
  ]);
  const bon = `$P_{${lc}}(${lkN}) = ${v}$`;
  const choices = shuffle([bon, `$P_{${lkN}}(${lc}) = ${v}$`, `$P(${lc} \\cap ${lkN}) = ${v}$`, `$P(${lkN}) = ${v}$`]);
  return {
    text: `${s.c.verbe} des ${s.c.pop}. ${pcDef(s.c)} On lit : ${info} Quelle écriture traduit cette information ?`,
    format: "qcm",
    choices,
    expected: [bon],
    comparator: "mcq_exact",
    explanation: exp(
      `Le groupe de référence est celui qui suit « parmi » / « des … qui » : les ${s.c.court} qui ${C.p}, c'est-à-dire l'événement $${lc}$.`,
      `Ce groupe est la CONDITION : il va en indice. On calcule la proportion de « ${cibleP} » à l'intérieur.`,
      `$P_{${lkN}}(${lc})$ inverserait les rôles (le groupe de référence serait « ${cibleP} ») ; $P(${lc} \\cap ${lkN})$ serait une part de TOUS les ${s.c.court}.`,
      `L'information s'écrit $P_{${lc}}(${lkN}) = ${v}$.`
    ),
  };
}
/** Les données « faux positifs » : P(A), P_A(B), P_Ā(B) en pourcentages entiers. */
function pcDonneesBayes() {
  const s = pcSituation();
  const p = randomInt(5, 60), q = randomInt(55, 98), r = randomInt(2, 35);
  const inter = p * q, autre = (100 - p) * r; // en dix-millièmes
  const pBA = inter / (inter + autre);
  const texte = `${s.c.verbe} des ${s.c.pop}. $${p}\\,\\%$ d'entre ${s.c.eux} ${s.c.A.p}. Parmi ${s.c.ceux}-ci, $${q}\\,\\%$ ${s.c.B.p} ; parmi les autres, $${r}\\,\\%$ ${s.c.B.p}.`;
  const calc =
    `$P(${s.a} \\cap ${s.b}) = ${pcM(p, 100)} \\times ${pcM(q, 100)} = ${pcM(inter, 10000)}$ et $P(\\overline{${s.a}} \\cap ${s.b}) = ${pcM(100 - p, 100)} \\times ${pcM(r, 100)} = ${pcM(autre, 10000)}$, ` +
    `donc $P(${s.b}) = ${pcM(inter + autre, 10000)}$ et $P_{${s.b}}(${s.a}) = \\dfrac{${pcM(inter, 10000)}}{${pcM(inter + autre, 10000)}} \\approx ${pcCent(pBA).replace(",", "{,}")}$.`;
  return { s, p, q, r, inter, autre, pBA, texte, calc };
}
/** ★5 (court) : retourner la condition, P_B(A), avec les probabilités totales. */
function pcGenInverserBayes(): TutorGeneratedQuestionV4 {
  const d = pcDonneesBayes();
  const { s } = d;
  const question = pcQuestionSachant(s.c, s.c.B.s, s.c.B.p, s.c.A.s, s.c.A.p, `P_{${s.b}}(${s.a})`, pcDef(s.c));
  const r = pcCent(d.pBA);
  return {
    text: `${d.texte} ${question} Arrondis au centième.`,
    format: "short",
    expected: [r, r.replace(",", ".")],
    comparator: "number_equal",
    explanation: exp(
      `On connaît des probabilités sachant « ${s.c.A.s} » ; on demande l'inverse, sachant « ${s.c.B.s} ». $P_{${s.b}}(${s.a}) = \\dfrac{P(${s.a} \\cap ${s.b})}{P(${s.b})}$.`,
      `$P(${s.b})$ se calcule par les probabilités totales (les deux chemins qui mènent à « ${s.c.B.s} »).`,
      d.calc,
      `$P_{${s.b}}(${s.a}) \\approx ${r.replace(",", "{,}")}$ : bien différent de $P_{${s.a}}(${s.b}) = ${pcM(d.q, 100)}$.`
    ),
  };
}
/** ★5 QCM : la valeur de P_B(A) au milieu des confusions. */
function pcGenInverserQcm(): TutorGeneratedQuestionV4 {
  let d = pcDonneesBayes();
  const vals = (x: typeof d) => [x.pBA, x.q / 100, x.inter / 10000, (x.inter + x.autre) / 10000].map(pcCent);
  for (let k = 0; k < 50 && new Set(vals(d)).size < 4; k++) d = pcDonneesBayes();
  const [bon, ...leurres] = vals(d);
  const { s } = d;
  const choices = makeChoices(`$${bon.replace(",", "{,}")}$`, leurres.map((l) => `$${l.replace(",", "{,}")}$`));
  return {
    text: `${d.texte} On choisit ${s.c.un} au hasard. Sachant ${pcQue(s.c.il)} ${s.c.B.s}, quelle est la probabilité de l'événement « ${s.c.il} ${s.c.A.s} » ? (valeurs arrondies au centième)`,
    format: "qcm",
    choices,
    expected: [`$${bon.replace(",", "{,}")}$`],
    comparator: "mcq_exact",
    explanation: exp(
      `${pcDef(s.c)} On cherche $P_{${s.b}}(${s.a})$ : la condition est « ${s.c.B.s} ».`,
      `Les pièges : $${pcM(d.q, 100)}$ est $P_{${s.a}}(${s.b})$ (l'inverse), $${pcM(d.inter, 10000)}$ est $P(${s.a} \\cap ${s.b})$, $${pcM(d.inter + d.autre, 10000)}$ est $P(${s.b})$.`,
      d.calc,
      `La bonne réponse est $${bon.replace(",", "{,}")}$.`
    ),
  };
}
/** ★5 ouverte : calculer P_B(A) et la comparer à P_A(B). */
function pcGenInverserOuvert(): TutorGeneratedQuestionV4 {
  const d = pcDonneesBayes();
  const { s } = d;
  const r = pcCent(d.pBA);
  return {
    text: `${d.texte} ${pcDef(s.c)} Calcule $P_{${s.b}}(${s.a})$ (arrondie au centième) et compare-la à $P_{${s.a}}(${s.b})$.`,
    format: "open",
    expected: [r, r.replace(",", ".")],
    comparator: "contains_keyword",
    explanation: exp(
      `$P_{${s.a}}(${s.b}) = ${pcM(d.q, 100)}$ est donnée ; $P_{${s.b}}(${s.a})$ change de groupe de référence.`,
      `On calcule $P(${s.b})$ par les probabilités totales, puis on divise.`,
      d.calc,
      `$P_{${s.b}}(${s.a}) \\approx ${r.replace(",", "{,}")}$, ${d.pBA < d.q / 100 ? "plus petite" : "plus grande"} que $P_{${s.a}}(${s.b}) = ${pcM(d.q, 100)}$ : on ne peut pas inverser la condition.`
    ),
  };
}

/* ===================== PC_REGISTRES : générateurs ===================== */
type PcEcrit = { not: string; phrases: string[] };
/** Les écritures d'une situation, chacune avec plusieurs phrases en français. */
function pcEcritures2(s: PcS): Record<string, PcEcrit> {
  const { c, a, b } = s;
  const A = c.A, B = c.B;
  return {
    aSachantB: { not: `P_{${b}}(${a})`, phrases: [`parmi les ${c.court} qui ${B.p}, la proportion de ${c.ceux} qui ${A.p}`, `la probabilité de l'événement « ${c.il} ${A.s} », sachant que ${c.le} ${B.s}`] },
    bSachantA: { not: `P_{${a}}(${b})`, phrases: [`parmi les ${c.court} qui ${A.p}, la proportion de ${c.ceux} qui ${B.p}`, `la probabilité de l'événement « ${c.il} ${B.s} », sachant que ${c.le} ${A.s}`] },
    inter: { not: `P(${a} \\cap ${b})`, phrases: [`la probabilité de l'événement « ${c.le} ${A.s} et ${B.s} »`, `parmi tous les ${c.court}, la proportion de ${c.ceux} qui ${A.p} et ${B.p}`] },
    bSachantNonA: { not: `P_{\\overline{${a}}}(${b})`, phrases: [`parmi les ${c.court} qui ${A.np}, la proportion de ${c.ceux} qui ${B.p}`, `la probabilité de l'événement « ${c.il} ${B.s} », sachant que ${c.le} ${A.ns}`] },
    nonBSachantA: { not: `P_{${a}}(\\overline{${b}})`, phrases: [`parmi les ${c.court} qui ${A.p}, la proportion de ${c.ceux} qui ${B.np}`, `la probabilité de l'événement « ${c.il} ${B.ns} », sachant que ${c.le} ${A.s}`] },
    a: { not: `P(${a})`, phrases: [`parmi tous les ${c.court}, la proportion de ${c.ceux} qui ${A.p}`, `la probabilité de l'événement « ${c.le} ${A.s} »`] },
  };
}
/** Pour chaque écriture, les confusions les plus probables. */
const PC_LEURRES: Record<string, string[]> = {
  aSachantB: ["bSachantA", "inter", "a"],
  bSachantA: ["aSachantB", "inter", "bSachantNonA"],
  inter: ["bSachantA", "aSachantB", "a"],
  bSachantNonA: ["bSachantA", "aSachantB", "nonBSachantA"],
  nonBSachantA: ["bSachantA", "bSachantNonA", "aSachantB"],
  a: ["inter", "bSachantA", "aSachantB"],
};
/** ★3 (phrase → écriture) ou ★4 (écriture → phrase). */
function pcGenRegistresQcm(versNotation: boolean, cles: readonly string[]): TutorGeneratedQuestionV4 {
  const s = pcSituation();
  const E = pcEcritures2(s);
  const k = pickOne(cles);
  const leurres = PC_LEURRES[k];
  const phrase = pickOne(E[k].phrases);
  if (versNotation) {
    const bon = `$${E[k].not}$`;
    return {
      text: `${pcDef(s.c)} Comment s'écrit : ${phrase} ?`,
      format: "qcm",
      choices: makeChoices(bon, leurres.map((l) => `$${E[l].not}$`)),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        "Dans $P_X(Y)$, l'événement en indice $X$ est la CONDITION : le groupe dans lequel on compte (« parmi … », « sachant que … »).",
        k === "inter" || k === "a" ? "Ici aucun groupe n'est imposé : on compte parmi TOUS les individus, sans indice." : `Ici le groupe de référence est donné par « ${phrase.split(",")[phrase.startsWith("parmi") ? 0 : 1].trim()} ».`,
        `D'où l'écriture $${E[k].not}$.`,
        `La phrase s'écrit $${E[k].not}$.`
      ),
    };
  }
  const bon = pcMaj(phrase);
  return {
    text: `${pcDef(s.c)} Que représente $${E[k].not}$ ?`,
    format: "qcm",
    choices: makeChoices(bon, leurres.map((l) => pcMaj(E[l].phrases[E[k].phrases.indexOf(phrase)] ?? E[l].phrases[0]))),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: exp(
      "On lit l'indice d'abord : c'est la condition, le groupe dans lequel on compte. Sans indice, on compte parmi tous.",
      `Dans $${E[k].not}$, ${k === "inter" || k === "a" ? "il n'y a pas d'indice" : "l'indice désigne le groupe de référence"}.`,
      `$${E[k].not}$ : ${phrase}.`,
      `La bonne phrase est : « ${bon} ».`
    ),
  };
}
/** ★4 court / ★5 ouverte : lire « x % parmi … » et donner P_C(K) ou P_C(K̄). */
function pcGenRegistresValeur(ouvert: boolean): TutorGeneratedQuestionV4 {
  const s = pcSituation();
  const surA = Math.random() < 0.5;
  const [C, K] = surA ? [s.c.A, s.c.B] : [s.c.B, s.c.A];
  const [lc, lk] = surA ? [s.a, s.b] : [s.b, s.a];
  const x = randomInt(3, 19) * 5;
  const contraire = ouvert || Math.random() < 0.5;
  const not = contraire ? `P_{${lc}}(\\overline{${lk}})` : `P_{${lc}}(${lk})`;
  const val = contraire ? 100 - x : x;
  const info = pickOne([`« Parmi les ${s.c.court} qui ${C.p}, $${x}\\,\\%$ ${K.p}. »`, `« $${x}\\,\\%$ des ${s.c.court} qui ${C.p} ${K.p}. »`]);
  const q = ouvert
    ? `Écris cette information avec la notation $P_\\ldots(\\ldots)$, puis donne la valeur de $${not}$.`
    : `Quelle est la valeur de $${not}$ ?`;
  return {
    text: `${s.c.verbe} des ${s.c.pop}. ${pcDef(s.c)} On lit : ${info} ${q}`,
    format: ouvert ? "open" : "short",
    expected: pcEcritures(val, 100),
    comparator: ouvert ? "contains_keyword" : "number_equal",
    explanation: exp(
      `« Parmi les ${s.c.court} qui ${C.p} » donne la condition : $${lc}$ en indice.`,
      `L'information s'écrit $P_{${lc}}(${lk}) = ${pcM(x, 100)}$.`,
      contraire ? `Dans le même groupe, les autres ${K.np} : $${not} = 1 - ${pcM(x, 100)} = ${pcM(val, 100)}$.` : `C'est directement la valeur demandée.`,
      `$${not} = ${pcM(val, 100)}$.`
    ),
  };
}

/* ===================== PC_ARBRE : générateurs ===================== */
/** Un arbre tiré : P(A) = p %, P_A(B) = q %, P_Ā(B) = r % (multiples de 5). */
function pcArbreTire() {
  const s = pcSituation();
  let p = 0, q = 0, r = 0;
  do {
    p = randomInt(2, 18) * 5; q = randomInt(2, 18) * 5; r = randomInt(1, 18) * 5;
  } while (q === r || p === 50);
  const P = (x: number) => pcM(x, 100);
  const fig = pcArbreFig(s.a, s.b, pcDec(p, 100), pcDec(q, 100), pcDec(r, 100), pcDec(100 - p, 100), pcDec(100 - q, 100), pcDec(100 - r, 100));
  return { s, p, q, r, P, fig };
}
/** Les quatre chemins : [nom de l'événement, écriture, facteurs en %, produit en dix-millièmes]. */
function pcChemins(t: ReturnType<typeof pcArbreTire>) {
  const { s, p, q, r } = t;
  const A = s.c.A, B = s.c.B;
  return [
    { ev: `${A.s} et ${B.s}`, not: `${s.a} \\cap ${s.b}`, f: [p, q], v: p * q },
    { ev: `${A.s} et ${B.ns}`, not: `${s.a} \\cap \\overline{${s.b}}`, f: [p, 100 - q], v: p * (100 - q) },
    { ev: `${A.ns} et ${B.s}`, not: `\\overline{${s.a}} \\cap ${s.b}`, f: [100 - p, r], v: (100 - p) * r },
    { ev: `${A.ns} et ${B.ns}`, not: `\\overline{${s.a}} \\cap \\overline{${s.b}}`, f: [100 - p, 100 - r], v: (100 - p) * (100 - r) },
  ];
}
/** ★2 QCM / ★3 court : la probabilité d'UN chemin. */
function pcGenArbreChemin(qcm: boolean): TutorGeneratedQuestionV4 {
  const t = pcArbreTire();
  const { s, P } = t;
  const ch = pickOne(pcChemins(t));
  const [f1, f2] = ch.f;
  const question = pickOne([
    `On choisit ${s.c.un} au hasard. Quelle est la probabilité de l'événement « ${s.c.le} ${ch.ev} » ?`,
    `Calcule $P(${ch.not})$.`,
  ]);
  const base = {
    text: `${s.c.verbe} des ${s.c.pop}. ${pcDef(s.c)} L'arbre pondéré résume la situation. ${question}`,
    canvas: t.fig,
    explanation: exp(
      `L'événement « ${ch.ev} » correspond à UN chemin de l'arbre : une branche du premier niveau ($${P(f1)}$), puis une du second ($${P(f2)}$).`,
      "Règle du produit : on multiplie les probabilités rencontrées le long du chemin.",
      `$P(${ch.not}) = ${P(f1)} \\times ${P(f2)} = ${pcM(ch.v, 10000)}$.`,
      `La probabilité est $${pcM(ch.v, 10000)}$.`
    ),
  };
  if (!qcm) return { ...base, format: "short", expected: pcEcritures(ch.v, 10000), comparator: "number_equal" };
  const vals = [ch.v / 10000, (f1 + f2) / 100, f2 / 100, f1 / 100];
  const txt = [`$${pcM(ch.v, 10000)}$`, `$${pcM(f1 + f2, 100)}$`, `$${P(f2)}$`, `$${P(f1)}$`];
  vals.push(1 - ch.v / 10000, (f1 * (100 - f2)) / 10000);
  txt.push(`$${pcM(10000 - ch.v, 10000)}$`, `$${pcM(f1 * (100 - f2), 10000)}$`);
  const ok = txt.filter((_, i) => vals.findIndex((v) => Math.abs(v - vals[i]) < 1e-9) === i);
  return { ...base, format: "qcm", choices: makeChoices(txt[0], ok.slice(1, 4)), expected: [txt[0]], comparator: "mcq_exact" };
}
/** ★4 : deux chemins à additionner (exactement un des deux) ou le chemin « ni l'un ni l'autre ». */
function pcGenArbreDeux(): TutorGeneratedQuestionV4 {
  const t = pcArbreTire();
  const { s, P } = t;
  const [, c2, c3, c4] = pcChemins(t);
  const exact = Math.random() < 0.6;
  const v = exact ? c2.v + c3.v : c4.v;
  const q = exact
    ? pickOne([
        `Quelle est la probabilité qu'UN SEUL des deux événements $${s.a}$ et $${s.b}$ soit réalisé ?`,
        `Calcule $P(${c2.not}) + P(${c3.not})$, la probabilité qu'exactement un des deux événements soit réalisé.`,
      ])
    : pickOne([`Quelle est la probabilité qu'aucun des deux événements $${s.a}$ et $${s.b}$ ne soit réalisé ?`, `Calcule $P(${c4.not})$.`]);
  return {
    text: `${s.c.verbe} des ${s.c.pop}. ${pcDef(s.c)} L'arbre pondéré résume la situation. ${q}`,
    format: "short",
    expected: pcEcritures(v, 10000),
    comparator: "number_equal",
    canvas: t.fig,
    explanation: exact
      ? exp(
          `« Un seul des deux » regroupe deux chemins : $${c2.not}$ et $${c3.not}$.`,
          "On multiplie le long de chaque chemin, puis on ADDITIONNE les chemins.",
          `$${P(c2.f[0])} \\times ${P(c2.f[1])} + ${P(c3.f[0])} \\times ${P(c3.f[1])} = ${pcM(c2.v, 10000)} + ${pcM(c3.v, 10000)} = ${pcM(v, 10000)}$.`,
          `La probabilité est $${pcM(v, 10000)}$.`
        )
      : exp(
          `« Aucun des deux » est le chemin $${c4.not}$ : les deux branches « contraires ».`,
          `Sur la branche $\\overline{${s.a}}$ on lit $${P(100 - t.p)}$, puis $${P(100 - t.r)}$ vers $\\overline{${s.b}}$ (pas $${P(100 - t.q)}$, qui part de $${s.a}$).`,
          `$${P(c4.f[0])} \\times ${P(c4.f[1])} = ${pcM(v, 10000)}$.`,
          `La probabilité est $${pcM(v, 10000)}$.`
        ),
  };
}
/** ★5 court / ouverte : arbre sans dessin, une branche à compléter avant le produit. */
function pcGenArbreACompleter(ouvert: boolean): TutorGeneratedQuestionV4 {
  const t = pcArbreTire();
  const { s, p, q, P } = t;
  const v = p * (100 - q);
  const texte = pickOne([
    `${s.c.verbe} des ${s.c.pop} : $${p}\\,\\%$ d'entre ${s.c.eux} ${s.c.A.p} et, parmi ${s.c.ceux}-ci, $${q}\\,\\%$ ${s.c.B.p}. ${pcDef(s.c)}`,
    `${s.c.verbe} des ${s.c.pop}. ${pcDef(s.c)} On sait que $P(${s.a}) = ${P(p)}$ et $P_{${s.a}}(${s.b}) = ${P(q)}$.`,
    `${s.c.verbe} des ${s.c.pop}. $${p}\\,\\%$ ${s.c.A.p} ; $${q}\\,\\%$ des ${s.c.court} qui ${s.c.A.p} ${s.c.B.p}. ${pcDef(s.c)}`,
  ]);
  const question = ouvert
    ? `Construis l'arbre pondéré (premier niveau : $${s.a}$), puis calcule la probabilité de l'événement « ${s.c.le} ${s.c.A.s} et ${s.c.B.ns} ».`
    : pickOne([`Calcule $P(${s.a} \\cap \\overline{${s.b}})$.`, `On choisit ${s.c.un} au hasard. Quelle est la probabilité de l'événement « ${s.c.il} ${s.c.A.s} et ${s.c.B.ns} » ?`]);
  return {
    text: `${texte} ${question}`,
    format: ouvert ? "open" : "short",
    expected: pcEcritures(v, 10000),
    comparator: ouvert ? "contains_keyword" : "number_equal",
    explanation: exp(
      `Premier niveau : $P(${s.a}) = ${P(p)}$. Second niveau depuis $${s.a}$ : $P_{${s.a}}(${s.b}) = ${P(q)}$, donc la branche $\\overline{${s.b}}$ porte $1 - ${P(q)} = ${P(100 - q)}$.`,
      "Les branches issues d'un même nœud ont une somme égale à $1$ ; puis on multiplie le long du chemin.",
      `$P(${s.a} \\cap \\overline{${s.b}}) = ${P(p)} \\times ${P(100 - q)} = ${pcM(v, 10000)}$.`,
      `La probabilité est $${pcM(v, 10000)}$.`
    ),
  };
}

/* ===================== PC_ARBRE_CONSTRUIRE : générateurs ===================== */
/** L'énoncé d'un arbre : « p % … ; parmi ceux-ci q % … ; parmi les autres r % … ». */
function pcEnonceArbre(t: ReturnType<typeof pcArbreTire>): string {
  const { s, p, q, r } = t;
  const c = s.c;
  return pickOne([
    `${c.verbe} des ${c.pop} : $${p}\\,\\%$ d'entre ${c.eux} ${c.A.p}. Parmi ${c.ceux}-ci, $${q}\\,\\%$ ${c.B.p} ; parmi les autres, $${r}\\,\\%$ ${c.B.p}.`,
    `${c.verbe} des ${c.pop}. $${p}\\,\\%$ ${c.A.p}, les autres ${c.A.np}. $${q}\\,\\%$ des ${c.court} qui ${c.A.p} ${c.B.p}, contre $${r}\\,\\%$ de ${c.ceux} qui ${c.A.np}.`,
  ]);
}
/** ★3 (branche donnée directement) / ★4 (branche contraire) / ★5 ouverte. */
function pcGenArbreBranche(niveau: 3 | 4 | 5): TutorGeneratedQuestionV4 {
  const t = pcArbreTire();
  const { s, p, q, r, P } = t;
  const na = `\\overline{${s.a}}`, nb = `\\overline{${s.b}}`;
  const directes = [
    { de: "la racine", vers: s.a, v: p, pourquoi: `$${p}\\,\\%$ ${s.c.A.p} : c'est $P(${s.a})$.` },
    { de: s.a, vers: s.b, v: q, pourquoi: `« parmi ${s.c.ceux} qui ${s.c.A.p}, $${q}\\,\\%$ » : c'est $P_{${s.a}}(${s.b})$.` },
    { de: na, vers: s.b, v: r, pourquoi: `« parmi les autres, $${r}\\,\\%$ » : c'est $P_{${na}}(${s.b})$.` },
  ];
  const contraires = [
    { de: "la racine", vers: na, v: 100 - p, pourquoi: `Les branches issues de la racine ont une somme égale à $1$ : $1 - ${P(p)} = ${P(100 - p)}$.` },
    { de: s.a, vers: nb, v: 100 - q, pourquoi: `Depuis $${s.a}$, les deux branches ont une somme égale à $1$ : $1 - ${P(q)} = ${P(100 - q)}$.` },
    { de: na, vers: nb, v: 100 - r, pourquoi: `Depuis $${na}$, les deux branches ont une somme égale à $1$ : $1 - ${P(r)} = ${P(100 - r)}$.` },
  ];
  const b = pickOne(niveau === 3 ? directes : contraires);
  const de = b.de === "la racine" ? "la racine" : `le nœud $${b.de}$`;
  const question = `On construit l'arbre pondéré avec $${s.a}$ au premier niveau. Quelle probabilité porte la branche qui va de ${de} vers $${b.vers}$ ?`;
  const base = `${pcEnonceArbre(t)} ${pcDef(s.c)} ${question}`;
  const explication = exp(
    "Au premier niveau : les probabilités de $" + s.a + "$ et de son contraire. Au second : des probabilités CONDITIONNELLES, sachant la branche d'où l'on part.",
    b.pourquoi,
    `La branche porte $${P(b.v)}$.`,
    `Réponse : $${P(b.v)}$.`
  );
  if (niveau === 5)
    return { text: `${base} Justifie.`, format: "open", expected: pcEcritures(b.v, 100), comparator: "contains_keyword", explanation: explication };
  const cand = [b.v, p, q, r, 100 - p, 100 - q, 100 - r].filter((x, i, arr) => arr.indexOf(x) === i);
  const bon = `$${P(b.v)}$`;
  const leurres = cand.slice(1).map((x) => `$${P(x)}$`);
  const extras = [p * q, p * (100 - q), (100 - p) * r].map((x) => `$${pcM(x, 10000)}$`);
  leurres.push(...extras.filter((x) => x !== bon && !leurres.includes(x)));
  return { text: base, format: "qcm", choices: makeChoices(bon, shuffle(leurres)), expected: [bon], comparator: "mcq_exact", explanation: explication };
}
/** ★5 QCM : quel événement mettre au premier niveau ? (celui qui sert de condition). */
function pcGenArbrePremierNiveau(): TutorGeneratedQuestionV4 {
  const s = pcSituation();
  const surB = Math.random() < 0.5;
  const [C, K] = surB ? [s.c.B, s.c.A] : [s.c.A, s.c.B];
  const [lc, lk] = surB ? [s.b, s.a] : [s.a, s.b];
  const x = randomInt(2, 18) * 5, y = randomInt(2, 18) * 5, z = randomInt(2, 18) * 5;
  const bon = `$${lc}$, puis $${lk}$ au second niveau`;
  const choices = makeChoices(bon, [`$${lk}$, puis $${lc}$ au second niveau`, `$${lc} \\cap ${lk}$ au premier niveau`, "peu importe : les deux arbres se construisent sans calcul"]);
  return {
    text: `${s.c.verbe} des ${s.c.pop}. ${pcDef(s.c)} On sait que $${x}\\,\\%$ d'entre ${s.c.eux} ${C.p} ; parmi ${s.c.ceux}-ci, $${y}\\,\\%$ ${K.p}, et parmi les autres, $${z}\\,\\%$ ${K.p}. Quel arbre pondéré construire pour placer directement ces données ?`,
    format: "qcm",
    choices,
    expected: [bon],
    comparator: "mcq_exact",
    explanation: exp(
      "Le second niveau d'un arbre porte des probabilités conditionnelles SACHANT le premier niveau.",
      `Les données « parmi ${s.c.ceux} qui ${C.p} » sont des probabilités sachant $${lc}$ : $P_{${lc}}(${lk}) = ${pcM(y, 100)}$ et $P_{\\overline{${lc}}}(${lk}) = ${pcM(z, 100)}$.`,
      `Donc $${lc}$ au premier niveau (avec $${pcM(x, 100)}$ et $${pcM(100 - x, 100)}$), $${lk}$ au second. L'autre ordre demanderait de calculer $P_{${lk}}(${lc})$ d'abord.`,
      `On place $${lc}$ au premier niveau.`
    ),
  };
}

/* ===================== PC_SUCCESSION : générateurs ===================== */
type PcEpreuve = { il: string; qui: string; e: string; fois: string; s: string; ns: string; min: number; max: number };
const PC_EPREUVES: readonly PcEpreuve[] = [
  { il: "il", qui: "le footballeur", e: "Un footballeur tire un penalty", fois: "deux penalties, dans les mêmes conditions", s: "marque", ns: "rate", min: 12, max: 18 },
  { il: "il", qui: "l'élève au carrefour", e: "Le matin, un élève arrive au feu du carrefour", fois: "deux matins de suite", s: "trouve le feu vert", ns: "trouve le feu rouge", min: 6, max: 12 },
  { il: "il", qui: "l'élève qui attend le car", e: "Un élève attend le car jaune", fois: "deux jours de suite", s: "voit le car arriver à l'heure", ns: "voit le car arriver en retard", min: 14, max: 19 },
  { il: "elle", qui: "la basketteuse", e: "Une basketteuse tire un lancer franc", fois: "deux lancers francs", s: "réussit son tir", ns: "manque son tir", min: 10, max: 17 },
  { il: "elle", qui: "la famille", e: "Une famille part en sortie en mer à Saint-Gilles", fois: "deux sorties", s: "aperçoit des dauphins", ns: "ne voit aucun dauphin", min: 8, max: 16 },
  { il: "il", qui: "le jardinier", e: "Un jardinier sème une graine de vacoa", fois: "deux graines", s: "voit la graine germer", ns: "ne voit pas la graine germer", min: 8, max: 16 },
  { il: "il", qui: "le joueur de pétanque", e: "Un joueur de pétanque tire une boule", fois: "deux boules", s: "fait un carreau", ns: "ne fait pas de carreau", min: 2, max: 7 },
  { il: "elle", qui: "la volleyeuse", e: "Une volleyeuse sert", fois: "deux services", s: "réussit son service", ns: "met le service dans le filet", min: 14, max: 19 },
  { il: "il", qui: "le randonneur", e: "Un randonneur arrive au belvédère du Maïdo", fois: "deux matins différents", s: "a une vue dégagée", ns: "trouve le cirque dans les nuages", min: 6, max: 14 },
  { il: "on", qui: "on", e: "On pioche un letchi dans un grand panier", fois: "deux letchis (le panier est si grand que les proportions ne changent pas)", s: "tombe sur un letchi bien sucré", ns: "tombe sur un letchi acide", min: 12, max: 18 },
  { il: "il", qui: "l'archer", e: "Un archer tire une flèche", fois: "deux flèches", s: "touche le centre", ns: "manque le centre", min: 3, max: 9 },
  { il: "il", qui: "le surfeur", e: "Un surfeur part sur une vague", fois: "deux vagues", s: "réussit son take-off", ns: "chute", min: 8, max: 16 },
];
/** ★3 / ★4 / ★5 : deux (ou trois) épreuves identiques et indépendantes. */
function pcGenSuccession(niveau: 3 | 4 | 5, format: "short" | "qcm" | "open"): TutorGeneratedQuestionV4 {
  const ep = pickOne(PC_EPREUVES);
  let p = randomInt(ep.min, ep.max) * 5; // en %
  if (p === 50) p = pickOne([45, 55]); // à 0,5, succès et échec se confondent : les leurres coïncident
  const q = 100 - p;
  const P = (x: number) => pcM(x, 100);
  type Cas = { ev: string; v: number; den: number; calc: string; leurres: [number, number][] };
  const cas: Cas[] =
    niveau === 3
      ? [
          { ev: `${ep.il} ${ep.s} les deux fois`, v: p * p, den: 10000, calc: `$${P(p)} \\times ${P(p)} = ${pcM(p * p, 10000)}$`, leurres: [[2 * p, 100], [p, 100], [p * q, 10000]] },
          { ev: `${ep.il} ${ep.ns} les deux fois`, v: q * q, den: 10000, calc: `$${P(q)} \\times ${P(q)} = ${pcM(q * q, 10000)}$`, leurres: [[1, 1], [q, 100], [p * p, 10000]] },
          { ev: `${ep.il} ${ep.s} la première fois, puis ${ep.ns} la seconde`, v: p * q, den: 10000, calc: `$${P(p)} \\times ${P(q)} = ${pcM(p * q, 10000)}$`, leurres: [[2 * p * q, 10000], [p * p, 10000], [100, 100]] },
        ]
      : niveau === 4
        ? [
            { ev: `${ep.il} ${ep.s} au moins une fois`, v: 10000 - q * q, den: 10000, calc: `$1 - ${P(q)} \\times ${P(q)} = 1 - ${pcM(q * q, 10000)} = ${pcM(10000 - q * q, 10000)}$ (le contraire de « au moins une fois » est « jamais »)`, leurres: [[2 * p, 100], [p * p, 10000], [2 * p * q, 10000]] },
            { ev: `${ep.il} ${ep.s} exactement une fois`, v: 2 * p * q, den: 10000, calc: `deux chemins : $${P(p)} \\times ${P(q)} + ${P(q)} \\times ${P(p)} = ${pcM(2 * p * q, 10000)}$`, leurres: [[p * q, 10000], [10000 - q * q, 10000], [p, 100]] },
          ]
        : [
            { ev: `${ep.il} ${ep.s} au moins une fois en trois essais`, v: 1000000 - q * q * q, den: 1000000, calc: `$1 - ${P(q)}^3 = 1 - ${pcM(q * q * q, 1000000)} = ${pcM(1000000 - q * q * q, 1000000)}$`, leurres: [[3 * p, 100], [p * p * p, 1000000], [10000 - q * q, 10000]] },
            { ev: `${ep.il} ${ep.s} les trois fois`, v: p * p * p, den: 1000000, calc: `$${P(p)}^3 = ${pcM(p * p * p, 1000000)}$`, leurres: [[3 * p, 100], [p * p, 10000], [p, 100]] },
            { ev: `${ep.il} ${ep.ns} une seule fois sur trois essais`, v: 3 * q * p * p, den: 1000000, calc: `trois chemins (l'échec au 1er, au 2e ou au 3e essai) : $3 \\times ${P(q)} \\times ${P(p)}^2 = ${pcM(3 * q * p * p, 1000000)}$`, leurres: [[q * p * p, 1000000], [q, 100], [p * p, 10000]] },
          ];
  const c = pickOne(cas);
  const repet = niveau === 5 ? "trois essais" : ep.fois;
  const text = `${ep.e} : ${ep.il} ${ep.s} avec une probabilité de $${P(p)}$. On répète l'expérience : ${repet}, les essais étant indépendants. ${pickOne([
    `Quelle est la probabilité de l'événement « ${c.ev} » ?`,
    `Calcule la probabilité que l'on observe : « ${c.ev} ».`,
  ])}`;
  const explanation = exp(
    "Les épreuves sont indépendantes : la probabilité d'un chemin est le PRODUIT des probabilités, sans condition à prendre en compte.",
    `Succès : $${P(p)}$ ; échec : $1 - ${P(p)} = ${P(q)}$.`,
    `On calcule : ${c.calc}.`,
    `La probabilité est $${pcM(c.v, c.den)}$.`
  );
  if (format === "short") return { text, format, expected: pcEcritures(c.v, c.den), comparator: "number_equal", explanation };
  if (format === "open") return { text: `${text} Justifie avec un arbre.`, format, expected: pcEcritures(c.v, c.den), comparator: "contains_keyword", explanation };
  const extras: [number, number][] = [[p, 100], [q, 100], [p * p, 10000], [q * q, 10000], [2 * p * q, 10000]];
  const ok = [...c.leurres, ...extras].filter((l) => l[0] / l[1] <= 1 && Math.abs(l[0] / l[1] - c.v / c.den) > 1e-9);
  const bon = `$${pcM(c.v, c.den)}$`;
  return { text, format, choices: makeChoices(bon, [...new Set(ok.map((l) => `$${pcM(l[0], l[1])}$`))].slice(0, 3)), expected: [bon], comparator: "mcq_exact", explanation };
}

/* ===================== PC_TOTALES : générateurs ===================== */
/** ★3 QCM « quel calcul » / ★4 court / ★5 ouverte : P(B) par les probabilités totales. */
function pcGenTotales(format: "qcm" | "short" | "open"): TutorGeneratedQuestionV4 {
  const t = pcArbreTire();
  const { s, p, q, r, P } = t;
  const vB = p * q + (100 - p) * r;
  const avecArbre = Math.random() < 0.5;
  const donnees = avecArbre ? `${s.c.verbe} des ${s.c.pop}. ${pcDef(s.c)} L'arbre pondéré résume la situation.` : `${pcEnonceArbre(t)} ${pcDef(s.c)}`;
  const question = pickOne([
    `Calcule $P(${s.b})$.`,
    `On choisit ${s.c.un} au hasard. Quelle est la probabilité de l'événement « ${s.c.il} ${s.c.B.s} » ?`,
    `Quelle proportion de l'ensemble des ${s.c.court} ${s.c.B.p} ? Donne-la en écriture décimale.`,
  ]);
  const explanation = exp(
    `$${s.a}$ et $\\overline{${s.a}}$ forment une partition : « ${s.c.B.s} » se produit par deux chemins, $${s.a} \\cap ${s.b}$ et $\\overline{${s.a}} \\cap ${s.b}$.`,
    `Formule des probabilités totales : $P(${s.b}) = P(${s.a}) \\times P_{${s.a}}(${s.b}) + P(\\overline{${s.a}}) \\times P_{\\overline{${s.a}}}(${s.b})$.`,
    `$P(${s.b}) = ${P(p)} \\times ${P(q)} + ${P(100 - p)} \\times ${P(r)} = ${pcM(p * q, 10000)} + ${pcM((100 - p) * r, 10000)} = ${pcM(vB, 10000)}$.`,
    `$P(${s.b}) = ${pcM(vB, 10000)}$.`
  );
  const canvas = avecArbre ? { canvas: t.fig } : {};
  if (format === "short") return { text: `${donnees} ${question}`, format, expected: pcEcritures(vB, 10000), comparator: "number_equal", explanation, ...canvas };
  if (format === "open")
    return { text: `${donnees} ${question} Écris la formule utilisée.`, format, expected: pcEcritures(vB, 10000), comparator: "contains_keyword", explanation, ...canvas };
  const bon = `$${P(p)} \\times ${P(q)} + ${P(100 - p)} \\times ${P(r)}$`;
  const fausses: [string, number][] = [
    [`$${P(q)} + ${P(r)}$`, (q + r) / 100],
    [`$${P(p)} \\times ${P(q)}$`, (p * q) / 10000],
    [`$${P(p)} \\times ${P(q)} + ${P(r)}$`, (p * q) / 10000 + r / 100],
    [`$${P(p)} \\times ${P(q)} + ${P(p)} \\times ${P(r)}$`, (p * (q + r)) / 10000],
  ];
  const ok = fausses.filter(([, v], i) => Math.abs(v - vB / 10000) > 1e-9 && fausses.findIndex(([, w]) => Math.abs(w - v) < 1e-9) === i).map(([x]) => x);
  const qq = pickOne([
    `Quel calcul donne $P(${s.b})$ ?`,
    `Quel calcul donne la probabilité de l'événement « ${s.c.le} ${s.c.B.s} » ?`,
    `Quel calcul donne la proportion de l'ensemble des ${s.c.court} qui ${s.c.B.p} ?`,
  ]);
  return { text: `${donnees} ${qq}`, format, choices: makeChoices(bon, ok), expected: [bon], comparator: "mcq_exact", explanation, ...canvas };
}
/** ★5 court : la formule à l'envers — retrouver P_Ā(B) ou P(A) connaissant P(B). */
function pcGenTotalesInverse(): TutorGeneratedQuestionV4 {
  const t = pcArbreTire();
  const { s, p, q, r, P } = t;
  const vB = p * q + (100 - p) * r;
  const chercheR = Math.random() < 0.5;
  const c = s.c;
  const texte = chercheR
    ? `${c.verbe} des ${c.pop} : $${p}\\,\\%$ d'entre ${c.eux} ${c.A.p}, et $${q}\\,\\%$ de ${c.ceux}-ci ${c.B.p}. Au total, $${pcPctM(vB, 10000)}$ des ${c.court} ${c.B.p}. ${pcDef(c)} Calcule $P_{\\overline{${s.a}}}(${s.b})$.`
    : `${c.verbe} des ${c.pop}. $${q}\\,\\%$ des ${c.court} qui ${c.A.p} ${c.B.p}, contre $${r}\\,\\%$ de ${c.ceux} qui ${c.A.np}. Au total, $${pcPctM(vB, 10000)}$ des ${c.court} ${c.B.p}. ${pcDef(c)} Calcule $P(${s.a})$.`;
  return {
    text: texte,
    format: "short",
    expected: pcEcritures(chercheR ? r : p, 100),
    comparator: "number_equal",
    explanation: chercheR
      ? exp(
          `Probabilités totales : $P(${s.b}) = P(${s.a}) P_{${s.a}}(${s.b}) + P(\\overline{${s.a}}) P_{\\overline{${s.a}}}(${s.b})$, avec une seule inconnue $x = P_{\\overline{${s.a}}}(${s.b})$.`,
          `$${pcM(vB, 10000)} = ${P(p)} \\times ${P(q)} + ${P(100 - p)} \\, x$, soit $${pcM(vB, 10000)} = ${pcM(p * q, 10000)} + ${P(100 - p)} \\, x$.`,
          `$x = \\dfrac{${pcM(vB, 10000)} - ${pcM(p * q, 10000)}}{${P(100 - p)}} = \\dfrac{${pcM((100 - p) * r, 10000)}}{${P(100 - p)}} = ${P(r)}$.`,
          `$P_{\\overline{${s.a}}}(${s.b}) = ${P(r)}$.`
        )
      : exp(
          `Probabilités totales avec l'inconnue $x = P(${s.a})$ : $P(${s.b}) = x \\times ${P(q)} + (1 - x) \\times ${P(r)}$.`,
          `$${pcM(vB, 10000)} = ${P(r)} + x \\, (${P(q)} - ${P(r)})$, soit $${pcM(vB, 10000)} - ${P(r)} = ${pcM(q - r, 100)} \\, x$.`,
          `$x = \\dfrac{${pcM(vB - 100 * r, 10000)}}{${pcM(q - r, 100)}} = ${P(p)}$.`,
          `$P(${s.a}) = ${P(p)}$.`
        ),
  };
}

/* ===================== PC_PARTITION : générateurs ===================== */
/** Un univers numéroté de 1 à n, et une famille d'événements tirée ; le verdict est CALCULÉ. */
function pcGenPartitionDe(ouvert: boolean): TutorGeneratedQuestionV4 {
  const univers = pickOne([
    (n: number) => `On lance un dé équilibré à $${n}$ faces numérotées de $1$ à $${n}$.`,
    (n: number) => `On tire une boule dans une urne contenant $${n}$ boules numérotées de $1$ à $${n}$.`,
    (n: number) => `La roue de la kermesse a $${n}$ secteurs numérotés de $1$ à $${n}$ ; on la fait tourner.`,
    (n: number) => `On tire au sort un dossard parmi $${n}$ dossards numérotés de $1$ à $${n}$ au trail de Cilaos.`,
    (n: number) => `On tire un ticket de tombola parmi $${n}$ tickets numérotés de $1$ à $${n}$.`,
  ]);
  const n = pickOne([6, 8, 10, 12, 20]);
  const k = randomInt(2, n - 2);
  type Ev = { nom: string; f: (x: number) => boolean };
  const familles: Ev[][] = [
    [{ nom: "obtenir un nombre pair", f: (x) => x % 2 === 0 }, { nom: "obtenir un nombre impair", f: (x) => x % 2 === 1 }],
    [{ nom: `obtenir un nombre inférieur ou égal à $${k}$`, f: (x) => x <= k }, { nom: `obtenir un nombre supérieur ou égal à $${k + 1}$`, f: (x) => x >= k + 1 }],
    [{ nom: `obtenir un nombre strictement inférieur à $${k}$`, f: (x) => x < k }, { nom: `obtenir un nombre strictement supérieur à $${k}$`, f: (x) => x > k }],
    [{ nom: `obtenir un nombre inférieur ou égal à $${k}$`, f: (x) => x <= k }, { nom: `obtenir un nombre supérieur ou égal à $${k}$`, f: (x) => x >= k }],
    [{ nom: "obtenir un multiple de $2$", f: (x) => x % 2 === 0 }, { nom: "obtenir un multiple de $3$", f: (x) => x % 3 === 0 }],
    [{ nom: "obtenir un multiple de $3$", f: (x) => x % 3 === 0 }, { nom: "obtenir un nombre dont le reste dans la division par $3$ est $1$", f: (x) => x % 3 === 1 }, { nom: "obtenir un nombre dont le reste dans la division par $3$ est $2$", f: (x) => x % 3 === 2 }],
    [{ nom: `obtenir un nombre inférieur ou égal à $${k}$`, f: (x) => x <= k }, { nom: "obtenir un nombre pair", f: (x) => x % 2 === 0 }],
    [{ nom: "obtenir un nombre premier", f: (x) => [2, 3, 5, 7, 11, 13, 17, 19].includes(x) }, { nom: "obtenir un nombre pair", f: (x) => x % 2 === 0 }],
    [{ nom: "obtenir un nombre premier", f: (x) => [2, 3, 5, 7, 11, 13, 17, 19].includes(x) }, { nom: "obtenir un nombre qui n'est pas premier", f: (x) => ![2, 3, 5, 7, 11, 13, 17, 19].includes(x) }],
  ];
  const fam = pickOne(familles);
  const issues = Array.from({ length: n }, (_, i) => i + 1);
  const communes = issues.filter((x) => fam.filter((e) => e.f(x)).length >= 2);
  const oubliees = issues.filter((x) => fam.every((e) => !e.f(x)));
  const liste = fam.map((e) => `« ${e.nom} »`).join(fam.length === 2 ? " et " : ", ");
  const verdict =
    !communes.length && !oubliees.length ? "oui"
    : communes.length && oubliees.length ? "non : des issues sont communes ET d'autres ne sont dans aucun événement"
    : communes.length ? "non : des issues appartiennent à deux événements"
    : "non : des issues n'appartiennent à aucun événement";
  const lst = (xs: number[]) => xs.map((x) => `$${x}$`).join(", ");
  const explanation = exp(
    "Une partition : des événements non vides, deux à deux incompatibles (aucune issue commune), dont la réunion est l'univers entier (aucune issue oubliée).",
    communes.length ? `Issues communes : ${lst(communes)} — les événements ne sont pas incompatibles.` : "Aucune issue n'appartient à deux événements : ils sont incompatibles.",
    oubliees.length ? `Issues oubliées : ${lst(oubliees)} — la réunion n'est pas l'univers.` : "Chaque issue appartient à l'un des événements : la réunion est l'univers.",
    verdict === "oui" ? "Oui, c'est une partition." : `Non, ce n'est pas une partition.`
  );
  if (ouvert) {
    const nb = communes.length + oubliees.length;
    return {
      text: `${univers(n)} ${pickOne(["On considère les événements", "On s'intéresse aux événements", "Un camarade propose les événements"])} ${liste}. Combien d'issues empêchent ces événements de former une partition (issues communes à deux événements, ou dans aucun) ? Réponds $0$ si c'est une partition.`,
      format: "short",
      expected: [String(nb)],
      comparator: "number_equal",
      explanation,
    };
  }
  const options = ["oui", "non : des issues appartiennent à deux événements", "non : des issues n'appartiennent à aucun événement", "non : des issues sont communes ET d'autres ne sont dans aucun événement"];
  return {
    text: `${univers(n)} ${pickOne([
      `Les événements ${liste} forment-ils une partition de l'univers ?`,
      `On considère les événements ${liste}. Peut-on dire qu'ils forment une partition de l'univers ?`,
      `Un élève affirme que les événements ${liste} forment une partition de l'univers. A-t-il raison ?`,
    ])}`,
    format: "qcm",
    choices: makeChoices(verdict, options),
    expected: [verdict],
    comparator: "mcq_exact",
    explanation,
  };
}
/** « un élève » → « l'élève », « un jour » → « le jour ». */
function pcLeDe(un: string): string {
  const nom = un.replace(/^une? /, "");
  if (/^[aeiouéèêh]/i.test(nom)) return `l'${nom}`;
  return `${un.startsWith("une ") ? "la" : "le"} ${nom}`;
}
/** Des partitions concrètes en 3 ou 4 parties. */
const PC_PARTITIONS: readonly { univ: string; un: string; parts: string[]; cond: string }[] = [
  { univ: "élèves d'un lycée de Saint-Paul", un: "un élève", parts: ["est en seconde", "est en première", "est en terminale"], cond: "pratique un sport en club" },
  { univ: "élèves d'un collège de Saint-Benoît", un: "un élève", parts: ["vient en car", "vient en voiture", "vient à pied ou à vélo"], cond: "arrive en retard au moins une fois par mois" },
  { univ: "jours de juillet à Cilaos", un: "un jour", parts: ["est ensoleillé", "est nuageux sans pluie", "est pluvieux"], cond: "voit plus de cent randonneurs au départ du sentier" },
  { univ: "coureurs de la Diagonale des Fous", un: "un coureur", parts: ["finit en moins de 40 heures", "finit en 40 heures ou plus", "abandonne"], cond: "a déjà couru le Grand Raid" },
  { univ: "bonbons coco d'un sachet", un: "un bonbon", parts: ["est blanc", "est rose", "est marron"], cond: "est trop sucré au goût du goûteur" },
  { univ: "donneurs de sang d'une collecte à Saint-Pierre", un: "un donneur", parts: ["est du groupe A", "est du groupe B", "est du groupe AB", "est du groupe O"], cond: "donne son sang pour la première fois" },
  { univ: "clients d'un snack", un: "un client", parts: ["paie en espèces", "paie par carte", "paie avec son téléphone"], cond: "commande un cari" },
  { univ: "colis d'un transporteur", un: "un colis", parts: ["arrive en avance", "arrive à l'heure", "arrive en retard"], cond: "est abîmé" },
  { univ: "joueurs d'un club de football de Saint-Louis", un: "un joueur", parts: ["est gardien", "est défenseur", "est milieu", "est attaquant"], cond: "a marqué cette saison" },
  { univ: "visiteurs de la Cité du Volcan", un: "un visiteur", parts: ["vient de La Réunion", "vient de métropole", "vient d'un autre pays"], cond: "achète un souvenir" },
  { univ: "cartes d'un jeu de 32 cartes", un: "une carte", parts: ["est un cœur", "est un carreau", "est un pique", "est un trèfle"], cond: "est une figure" },
  { univ: "repas servis à la cantine", un: "un repas", parts: ["est un cari", "est un rougail", "est un plat végétarien"], cond: "est fini par l'élève" },
  { univ: "vélos d'une station de location", un: "un vélo", parts: ["est un vélo électrique", "est un VTT", "est un vélo de ville"], cond: "tombe en panne dans le mois" },
  { univ: "ananas d'une récolte", un: "un ananas", parts: ["pèse moins d'un kilo", "pèse entre un et deux kilos", "pèse plus de deux kilos"], cond: "est exporté" },
  { univ: "letchis d'une cagette", un: "un letchi", parts: ["est petit", "est moyen", "est gros"], cond: "est bien sucré" },
  { univ: "spectateurs d'un concert de maloya", un: "un spectateur", parts: ["habite dans le Nord", "habite dans le Sud", "habite dans l'Est", "habite dans l'Ouest"], cond: "vient pour la première fois" },
];
/** ★4 : la part manquante d'une partition ; ★5 : probabilités totales à trois branches. */
function pcGenPartitionProba(totales: boolean): TutorGeneratedQuestionV4 {
  const P0 = pickOne(PC_PARTITIONS);
  const m = P0.parts.length;
  let ps: number[];
  do {
    ps = Array.from({ length: m - 1 }, () => randomInt(2, 9) * 5);
  } while (ps.reduce((u, v) => u + v, 0) > 90);
  ps.push(100 - ps.reduce((u, v) => u + v, 0));
  const descr = P0.parts.map((e, i) => `$E_${i + 1}$ : « ${pcLeDe(P0.un)} ${e} »`).join(", ");
  const nommer = `On choisit ${P0.un} parmi les ${P0.univ}, et on note ${descr}.`;
  if (!totales) {
    const i = randomInt(0, m - 1);
    const connues = ps.map((v, j) => (j === i ? null : `$P(E_${j + 1}) = ${pcM(v, 100)}$`)).filter(Boolean).join(", ");
    return {
      text: `${nommer} ${pickOne([
        `Ces événements forment une partition de l'univers, avec ${connues}. Calcule $P(E_${i + 1})$.`,
        `On sait que ${connues}, et que ces événements forment une partition. Quelle est la probabilité de l'événement $E_${i + 1}$ ?`,
        `Ces événements sont deux à deux incompatibles et couvrent tous les cas ; de plus ${connues}. Déduis-en $P(E_${i + 1})$.`,
      ])}`,
      format: "short",
      expected: pcEcritures(ps[i], 100),
      comparator: "number_equal",
      explanation: exp(
        "Les événements d'une partition sont incompatibles et recouvrent tout l'univers : leurs probabilités ont une somme égale à $1$.",
        `$P(E_${i + 1}) = 1 - (${ps.filter((_, j) => j !== i).map((v) => pcM(v, 100)).join(" + ")})$.`,
        `$P(E_${i + 1}) = ${pcM(ps[i], 100)}$.`,
        `$P(E_${i + 1}) = ${pcM(ps[i], 100)}$.`
      ),
    };
  }
  const qs = ps.map(() => randomInt(1, 19) * 5);
  const v = ps.reduce((u, x, j) => u + x * qs[j], 0);
  const cond = P0.cond;
  return {
    text: `${nommer} Ces événements forment une partition, avec ${ps.map((x, j) => `$P(E_${j + 1}) = ${pcM(x, 100)}$`).join(", ")}. On note $S$ : « ${pcLeDe(P0.un)} ${cond} », avec ${qs.map((x, j) => `$P_{E_${j + 1}}(S) = ${pcM(x, 100)}$`).join(", ")}. ${pickOne(["Calcule $P(S)$.", "Quelle est la probabilité de l'événement $S$ ?", "Calcule $P(S)$ avec la formule des probabilités totales."])}`,
    format: "short",
    expected: pcEcritures(v, 10000),
    comparator: "number_equal",
    explanation: exp(
      `Les $E_i$ forment une partition : $S$ se produit par ${m} chemins, un par partie.`,
      `Probabilités totales : $P(S) = ${ps.map((_, j) => `P(E_${j + 1}) P_{E_${j + 1}}(S)`).join(" + ")}$.`,
      `$P(S) = ${ps.map((x, j) => `${pcM(x, 100)} \\times ${pcM(qs[j], 100)}`).join(" + ")} = ${pcM(v, 10000)}$.`,
      `$P(S) = ${pcM(v, 10000)}$.`
    ),
  };
}

/* ===================== PC_INDEPENDANCE : générateurs ===================== */
/** Deux épreuves sans lien entre elles : A et B sont naturellement indépendants. */
function pcDeuxEpreuves() {
  const [e1, e2] = shuffle(PC_EPREUVES).slice(0, 2);
  const p = randomInt(e1.min, e1.max) * 5, q = randomInt(e2.min, e2.max) * 5;
  const texte = `${e1.e} : ${e1.il} ${e1.s} avec une probabilité de $${pcM(p, 100)}$. De son côté, sans aucun lien, ${e2.e.charAt(0).toLowerCase()}${e2.e.slice(1)} : ${e2.il} ${e2.s} avec une probabilité de $${pcM(q, 100)}$. On note $A$ : « ${e1.qui} ${e1.s} » et $B$ : « ${e2.qui} ${e2.s} ».`;
  return { e1, e2, p, q, texte };
}
/** ★2 QCM / ★3 court : P(A ∩ B) (ou avec un contraire) pour deux événements indépendants. */
function pcGenIndependanceProduit(qcm: boolean): TutorGeneratedQuestionV4 {
  const d = pcDeuxEpreuves();
  const { p, q } = d;
  const cas = qcm
    ? [{ not: "A \\cap B", u: p, v: q }]
    : [{ not: "A \\cap B", u: p, v: q }, { not: "A \\cap \\overline{B}", u: p, v: 100 - q }, { not: "\\overline{A} \\cap B", u: 100 - p, v: q }, { not: "\\overline{A} \\cap \\overline{B}", u: 100 - p, v: 100 - q }];
  const c = pickOne(cas);
  const r = c.u * c.v;
  const explanation = exp(
    "Les deux épreuves n'ont aucun lien : $A$ et $B$ sont indépendants (et leurs contraires aussi).",
    "Pour deux événements indépendants : $P(A \\cap B) = P(A) \\times P(B)$.",
    `$P(${c.not}) = ${pcM(c.u, 100)} \\times ${pcM(c.v, 100)} = ${pcM(r, 10000)}$.`,
    `$P(${c.not}) = ${pcM(r, 10000)}$.`
  );
  const text = `${d.texte} ${pickOne([`Calcule $P(${c.not})$.`, `Quelle est la probabilité de l'événement $${c.not}$ ?`])}`;
  if (!qcm) return { text, format: "short", expected: pcEcritures(r, 10000), comparator: "number_equal", explanation };
  const bon = `$${pcM(r, 10000)}$`;
  const leurres = [[p + q, 100], [100 * (p + q) - r, 10000], [Math.abs(p - q), 100]]
    .filter(([a, b]) => a > 0 && a / b !== r / 10000 && a / b <= 1)
    .map(([a, b]) => `$${pcM(a, b)}$`);
  leurres.push(`$${pcM(p, 100)}$`, `$${pcM(q, 100)}$`, `$${pcM(10000 - r, 10000)}$`);
  return { text, format: "qcm", choices: makeChoices(bon, leurres), expected: [bon], comparator: "mcq_exact", explanation };
}
/** ★4 QCM : tester l'indépendance à partir de P(A), P(B), P(A ∩ B) (situation d'enquête). */
function pcGenIndependanceTest(): TutorGeneratedQuestionV4 {
  const s = pcSituation();
  const indep = Math.random() < 0.5;
  const e = pcTirer(
    (x) => [x.nA, x.nB, x.nAB].every((n) => pcJuste(n, x.N, 2)) && (indep ? x.nAB * x.N === x.nA * x.nB : Math.abs(x.nAB * x.N - x.nA * x.nB) >= 0.02 * x.N * x.N),
    [100, 200, 400, 500],
  );
  const PA = pcM(e.nA, e.N), PB = pcM(e.nB, e.N), PAB = pcM(e.nAB, e.N), prod = pcM(e.nA * e.nB, e.N * e.N);
  const oui = `oui : $P(${s.a} \\cap ${s.b}) = P(${s.a}) \\times P(${s.b})$`;
  const non = `non : $P(${s.a} \\cap ${s.b}) \\neq P(${s.a}) \\times P(${s.b})$`;
  const bon = indep ? oui : non;
  const choices = makeChoices(bon, [indep ? non : oui, "non : ils sont incompatibles", `oui : $P(${s.a} \\cap ${s.b}) \\neq 0$`]);
  return {
    text: `${Math.random() < 0.5 ? `On choisit ${s.c.un} au hasard parmi des ${s.c.pop}. ${pcDef(s.c)} On sait que $P(${s.a}) = ${PA}$, $P(${s.b}) = ${PB}$ et $P(${s.a} \\cap ${s.b}) = ${PAB}$.` : `${s.c.verbe} des ${s.c.pop} : $${pcPctM(e.nA, e.N)}$ d'entre ${s.c.eux} ${s.c.A.p}, $${pcPctM(e.nB, e.N)}$ ${s.c.B.p}, et $${pcPctM(e.nAB, e.N)}$ ${s.c.A.p} et ${s.c.B.p}. On choisit ${s.c.un} au hasard. ${pcDef(s.c)}`} ${pickOne([
      `Les événements $${s.a}$ et $${s.b}$ sont-ils indépendants ?`,
      `Peut-on dire que $${s.a}$ et $${s.b}$ sont indépendants ?`,
      `Savoir que ${s.c.le} ${s.c.A.s} change-t-il la probabilité de $${s.b}$ ? Autrement dit, $${s.a}$ et $${s.b}$ sont-ils indépendants ?`,
    ])}`,
    format: "qcm",
    choices,
    expected: [bon],
    comparator: "mcq_exact",
    explanation: exp(
      `$${s.a}$ et $${s.b}$ sont indépendants si et seulement si $P(${s.a} \\cap ${s.b}) = P(${s.a}) \\times P(${s.b})$.`,
      `$P(${s.a}) \\times P(${s.b}) = ${PA} \\times ${PB} = ${prod}$, à comparer à $P(${s.a} \\cap ${s.b}) = ${PAB}$.`,
      indep ? "Les deux nombres sont égaux." : "Les deux nombres sont différents.",
      indep ? "Les événements sont indépendants." : `Les événements ne sont pas indépendants (ni incompatibles : $P(${s.a} \\cap ${s.b}) \\neq 0$).`
    ),
  };
}
/** ★5 court : retrouver P(B), ou calculer P(A ∪ B), sous l'hypothèse d'indépendance. */
function pcGenIndependanceInverse(): TutorGeneratedQuestionV4 {
  const d = pcDeuxEpreuves();
  const { p, q } = d;
  const union = Math.random() < 0.5;
  if (union) {
    const v = 100 * (p + q) - p * q;
    return {
      text: `${d.texte} Calcule $P(A \\cup B)$, la probabilité qu'au moins un des deux événements soit réalisé.`,
      format: "short",
      expected: pcEcritures(v, 10000),
      comparator: "number_equal",
      explanation: exp(
        "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$, et ici $P(A \\cap B) = P(A) \\times P(B)$ (indépendance).",
        `$P(A \\cap B) = ${pcM(p, 100)} \\times ${pcM(q, 100)} = ${pcM(p * q, 10000)}$.`,
        `$P(A \\cup B) = ${pcM(p, 100)} + ${pcM(q, 100)} - ${pcM(p * q, 10000)} = ${pcM(v, 10000)}$ (ou $1 - ${pcM(100 - p, 100)} \\times ${pcM(100 - q, 100)}$).`,
        `$P(A \\cup B) = ${pcM(v, 10000)}$.`
      ),
    };
  }
  const s = pcSituation();
  return {
    text: `On choisit ${s.c.un} au hasard parmi des ${s.c.pop}. ${pcDef(s.c)} On admet que $${s.a}$ et $${s.b}$ sont indépendants, avec $P(${s.a}) = ${pcM(p, 100)}$ et $P(${s.a} \\cap ${s.b}) = ${pcM(p * q, 10000)}$. Calcule $P(${s.b})$.`,
    format: "short",
    expected: pcEcritures(q, 100),
    comparator: "number_equal",
    explanation: exp(
      `Indépendance : $P(${s.a} \\cap ${s.b}) = P(${s.a}) \\times P(${s.b})$, donc $P(${s.b}) = \\dfrac{P(${s.a} \\cap ${s.b})}{P(${s.a})}$.`,
      `C'est aussi $P_{${s.a}}(${s.b})$ : sous l'indépendance, savoir $${s.a}$ ne change rien.`,
      `$P(${s.b}) = \\dfrac{${pcM(p * q, 10000)}}{${pcM(p, 100)}} = ${pcM(q, 100)}$.`,
      `$P(${s.b}) = ${pcM(q, 100)}$.`
    ),
  };
}
/** ★5 ouverte : tableau d'effectifs, comparer P_A(B) et P(B). */
function pcGenIndependanceOuvert(): TutorGeneratedQuestionV4 {
  const s = pcSituation();
  const indep = Math.random() < 0.4;
  const e = pcTirer(
    (x) => pcJuste(x.nAB, x.nA) && pcJuste(x.nB, x.N) && (indep ? x.nAB * x.N === x.nA * x.nB : Math.abs(x.nAB * x.N - x.nA * x.nB) >= 0.02 * x.N * x.N),
    [100, 200, 400, 500, 1000],
  );
  const r = pcDec(e.nAB, e.nA);
  return {
    text: `Le tableau donne la répartition de $${e.N}$ ${s.c.pop}. ${pcDef(s.c)} Calcule $P_{${s.a}}(${s.b})$ et $P(${s.b})$, puis dis si $${s.a}$ et $${s.b}$ sont indépendants.`,
    format: "open",
    expected: [r, r.replace(",", ".")],
    comparator: "contains_keyword",
    canvas: pcTableau(s, e),
    explanation: exp(
      `$${s.a}$ et $${s.b}$ sont indépendants si et seulement si $P_{${s.a}}(${s.b}) = P(${s.b})$ (savoir $${s.a}$ ne change rien).`,
      `$P_{${s.a}}(${s.b}) = \\dfrac{${e.nAB}}{${e.nA}} = ${pcM(e.nAB, e.nA)}$ et $P(${s.b}) = \\dfrac{${e.nB}}{${e.N}} = ${pcM(e.nB, e.N)}$.`,
      indep ? "Les deux valeurs sont égales." : "Les deux valeurs sont différentes.",
      indep ? "Les événements sont indépendants." : "Les événements ne sont pas indépendants."
    ),
  };
}

/* ===================== PC_INDEPENDANCE_INCOMPATIBLE : générateurs ===================== */
/** Deux événements : soit deux parties d'une partition (incompatibles), soit une situation d'enquête. */
function pcDeuxEvenements(incompatibles: boolean) {
  if (incompatibles) {
    const P0 = pickOne(PC_PARTITIONS);
    const [i, j] = shuffle(P0.parts.map((_, k) => k)).slice(0, 2);
    const le = pcLeDe(P0.un);
    return { intro: `On choisit ${P0.un} au hasard parmi les ${P0.univ}.`, a: "A", b: "B", def: `On note $A$ l'événement « ${le} ${P0.parts[i]} » et $B$ l'événement « ${le} ${P0.parts[j]} ».` };
  }
  const s = pcSituation();
  return { intro: `On choisit ${s.c.un} au hasard parmi des ${s.c.pop}.`, a: s.a, b: s.b, def: pcDef(s.c) };
}
const PC_VERDICTS = {
  incomp: "incompatibles, et donc pas indépendants",
  indep: "indépendants, mais pas incompatibles",
  ni: "ni indépendants, ni incompatibles",
  deux: "à la fois indépendants et incompatibles",
} as const;
/** ★4 QCM : classer deux événements à partir de P(A), P(B), P(A ∩ B). */
function pcGenIndIncClasser(): TutorGeneratedQuestionV4 {
  const cas = pickOne(["incomp", "indep", "ni"] as const);
  const d = pcDeuxEvenements(cas === "incomp");
  let p = 0, q = 0, inter = 0;
  do {
    p = randomInt(2, 12) * 5; q = randomInt(2, 12) * 5;
    inter = cas === "incomp" ? 0 : cas === "indep" ? p * q : randomInt(1, Math.min(p, q) - 1) * 100;
  } while ((cas === "ni" && inter === p * q) || p + q > 100);
  const { a, b } = d;
  const bon = PC_VERDICTS[cas];
  return {
    text: `${d.intro} ${d.def} On sait que $P(${a}) = ${pcM(p, 100)}$, $P(${b}) = ${pcM(q, 100)}$ et $P(${a} \\cap ${b}) = ${pcM(inter, 10000)}$. Les événements $${a}$ et $${b}$ sont :`,
    format: "qcm",
    choices: makeChoices(bon, Object.values(PC_VERDICTS)),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: exp(
      `Incompatibles : $P(${a} \\cap ${b}) = 0$. Indépendants : $P(${a} \\cap ${b}) = P(${a}) \\times P(${b})$.`,
      `Ici $P(${a} \\cap ${b}) = ${pcM(inter, 10000)}$ et $P(${a}) \\times P(${b}) = ${pcM(p, 100)} \\times ${pcM(q, 100)} = ${pcM(p * q, 10000)}$.`,
      cas === "incomp"
        ? `L'intersection est vide, mais le produit n'est pas nul : savoir $${a}$ réalisé rend $${b}$ IMPOSSIBLE, c'est le contraire de l'indépendance.`
        : cas === "indep"
          ? "L'intersection n'est pas nulle (pas incompatibles) et elle est égale au produit (indépendants)."
          : "L'intersection n'est ni nulle, ni égale au produit.",
      `Les événements sont ${bon}.`
    ),
  };
}
/** ★4 court : P(A ∪ B) selon que A et B sont incompatibles ou indépendants. */
function pcGenIndIncUnion(): TutorGeneratedQuestionV4 {
  const incomp = Math.random() < 0.5;
  const d = pcDeuxEvenements(incomp);
  const p = randomInt(2, 10) * 5, q = randomInt(2, 9) * 5;
  const v = incomp ? 100 * (p + q) : 100 * (p + q) - p * q;
  const { a, b } = d;
  return {
    text: `${d.intro} ${d.def} On sait que $P(${a}) = ${pcM(p, 100)}$ et $P(${b}) = ${pcM(q, 100)}$, et que $${a}$ et $${b}$ sont ${incomp ? "incompatibles" : "indépendants"}. Calcule $P(${a} \\cup ${b})$.`,
    format: "short",
    expected: pcEcritures(v, 10000),
    comparator: "number_equal",
    explanation: exp(
      `$P(${a} \\cup ${b}) = P(${a}) + P(${b}) - P(${a} \\cap ${b})$.`,
      incomp ? `Incompatibles : $P(${a} \\cap ${b}) = 0$.` : `Indépendants : $P(${a} \\cap ${b}) = ${pcM(p, 100)} \\times ${pcM(q, 100)} = ${pcM(p * q, 10000)}$.`,
      `$P(${a} \\cup ${b}) = ${pcM(p, 100)} + ${pcM(q, 100)}${incomp ? "" : ` - ${pcM(p * q, 10000)}`} = ${pcM(v, 10000)}$.`,
      `$P(${a} \\cup ${b}) = ${pcM(v, 10000)}$.`
    ),
  };
}
/** ★5 QCM / ouverte : A et B incompatibles — que vaut P_A(B), et sont-ils indépendants ? */
function pcGenIndIncConditionnelle(ouvert: boolean): TutorGeneratedQuestionV4 {
  const d = pcDeuxEvenements(true);
  const p = randomInt(2, 10) * 5, q = randomInt(2, 9) * 5;
  const { a, b } = d;
  const explanation = exp(
    `$${a}$ et $${b}$ sont deux parties distinctes d'un même découpage : ils sont incompatibles, $P(${a} \\cap ${b}) = 0$.`,
    `Donc $P_{${a}}(${b}) = \\dfrac{P(${a} \\cap ${b})}{P(${a})} = \\dfrac{0}{${pcM(p, 100)}} = 0$, alors que $P(${b}) = ${pcM(q, 100)}$.`,
    `Le produit $P(${a}) \\times P(${b}) = ${pcM(p * q, 10000)} \\neq 0$ : l'égalité de l'indépendance est fausse.`,
    `$P_{${a}}(${b}) = 0$ : savoir $${a}$ change tout ; les événements ne sont pas indépendants.`
  );
  const base = `${d.intro} ${d.def} On sait que $P(${a}) = ${pcM(p, 100)}$ et $P(${b}) = ${pcM(q, 100)}$.`;
  if (ouvert)
    return {
      text: `${base} Calcule $P(${a}) \\times P(${b})$ et compare-le à $P(${a} \\cap ${b})$ : $${a}$ et $${b}$ sont-ils indépendants ?`,
      format: "open",
      expected: pcEcritures(p * q, 10000),
      comparator: "contains_keyword",
      explanation,
    };
  const bon = "$0$";
  return {
    text: `${base} Que vaut $P_{${a}}(${b})$ ?`,
    format: "qcm",
    choices: makeChoices(bon, [`$${pcM(q, 100)}$`, `$${pcM(p * q, 10000)}$`, `$${pcM(100 - q, 100)}$`]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation,
  };
}

// ==== FIN DES OUTILS PC ====

export const probabilitesConditionnellesBank: TutorBankItemV4[] = [
  /* ===================== PC_CONDITIONNELLE ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 2,
    theme: "neutral",
    text: "La probabilité conditionnelle $P_A(B)$ se calcule par :",
    format: "qcm",
    choices: [
      "$\\dfrac{P(A \\cap B)}{P(A)}$",
      "$\\dfrac{P(A \\cap B)}{P(B)}$",
      "$P(A) \\times P(B)$",
      "$\\dfrac{P(A)}{P(B)}$",
    ],
    expected: ["$\\dfrac{P(A \\cap B)}{P(A)}$"],
    comparator: "mcq_exact",
    hint: "On divise par la probabilité de la condition $A$.",
    explanation: exp(
      "$P_A(B)$ est la probabilité de $B$ sachant que $A$ est réalisé.",
      "On divise la probabilité de l'intersection par celle de la condition.",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
      "$\\dfrac{P(A \\cap B)}{P(A)}$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    text: "On a $P(A) = 0{,}4$ et $P(A \\cap B) = 0{,}2$. Combien vaut $P_A(B)$ ?",
    format: "short",
    expected: ["0,5"],
    comparator: "number_equal",
    hint: "$\\dfrac{0{,}2}{0{,}4}$.",
    explanation: exp(
      "On applique $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
      "$\\dfrac{0{,}2}{0{,}4}$.",
      "$= 0{,}5$.",
      "$P_A(B) = 0{,}5$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une classe, $P(\\text{fille}) = 0{,}6$ et $P(\\text{fille et demi-pensionnaire}) = 0{,}3$. Quelle est la probabilité qu'une fille soit demi-pensionnaire ?",
    format: "short",
    expected: ["0,5"],
    comparator: "number_equal",
    hint: "$\\dfrac{0{,}3}{0{,}6}$.",
    explanation: exp(
      "On cherche $P_{\\text{fille}}(\\text{DP}) = \\dfrac{P(\\text{fille} \\cap \\text{DP})}{P(\\text{fille})}$.",
      "$\\dfrac{0{,}3}{0{,}6}$.",
      "$= 0{,}5$.",
      "La probabilité est $0{,}5$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "On lit dans un tableau : $50$ élèves dont $20$ font de l'anglais ; parmi ces $20$, $12$ font aussi espagnol. Quelle est la probabilité qu'un angliciste fasse espagnol ?",
    format: "short",
    expected: ["0,6"],
    comparator: "number_equal",
    hint: "$\\dfrac{12}{20}$.",
    explanation: exp(
      "On se restreint aux $20$ anglicistes (la condition).",
      "Parmi eux, $12$ font espagnol : $\\dfrac{12}{20}$.",
      "$= 0{,}6$.",
      "La probabilité est $0{,}6$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A) = 0{,}5$ et $P(A \\cap B) = 0{,}15$. Combien vaut $P_A(B)$ ?",
    format: "short",
    expected: ["0,3"],
    comparator: "number_equal",
    hint: "$\\dfrac{0{,}15}{0{,}5}$.",
    explanation: exp(
      "On applique $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
      "$\\dfrac{0{,}15}{0{,}5}$.",
      "$= 0{,}3$. Le dénominateur est toujours la probabilité de l'événement qui CONDITIONNE.",
      "$P_A(B) = 0{,}3$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "Sur $200$ clients, $80$ achètent le produit X ; parmi ces $80$, $40$ achètent aussi le produit Y. Quelle est la probabilité qu'un acheteur de X achète aussi Y ?",
    format: "short",
    expected: ["0,5"],
    comparator: "number_equal",
    hint: "On ne travaille plus que sur les $80$ acheteurs de X.",
    explanation: exp(
      "Conditionner, c'est réduire l'univers : on ne considère plus que les acheteurs de X.",
      "Parmi ces $80$, il y en a $40$ qui achètent Y : $\\dfrac{40}{80}$.",
      "$= 0{,}5$. Le total de $200$ ne sert pas ici : il servirait pour $P(X \\cap Y) = \\dfrac{40}{200}$.",
      "La probabilité est $0{,}5$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_inverser",
    difficulty: 5,
    theme: "neutral",
    text: "A-t-on toujours $P_A(B) = P_B(A)$ ?",
    format: "qcm",
    choices: [
      "non : les dénominateurs sont différents",
      "oui, toujours",
      "oui, si $A$ et $B$ sont indépendants",
      "oui, si $P(A \\cap B) > 0$",
    ],
    expected: ["non : les dénominateurs sont différents"],
    comparator: "mcq_exact",
    hint: "Écris les deux formules l'une sous l'autre.",
    explanation: exp(
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ et $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
      "Le numérateur est le même, mais le dénominateur change : elles ne sont égales que si $P(A) = P(B)$.",
      "Exemple : parmi les élèves qui prennent le bus, beaucoup arrivent en avance ; mais parmi ceux qui arrivent en avance, tous ne prennent pas le bus.",
      "Non : les deux probabilités conditionnelles sont différentes en général."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A) = 0{,}5$ et $P_A(B) = 0{,}4$. Combien vaut $P(A \\cap B)$ ?",
    format: "short",
    expected: ["0,2"],
    comparator: "number_equal",
    hint: "$P(A \\cap B) = P(A) \\times P_A(B)$.",
    explanation: exp(
      "En multipliant les deux membres de $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ par $P(A)$, on obtient $P(A \\cap B) = P(A) \\times P_A(B)$.",
      "$0{,}5 \\times 0{,}4$.",
      "$= 0{,}2$.",
      "$P(A \\cap B) = 0{,}2$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 4,
    theme: "reunion",
    text: "Sur $100$ élèves d'un collège, $60$ prennent le car ; parmi eux, $45$ arrivent avant $7$ h $30$. Quelle est la probabilité qu'un élève venant en car arrive avant $7$ h $30$ ?",
    format: "short",
    expected: ["0,75"],
    comparator: "number_equal",
    hint: "$\\dfrac{45}{60}$ : on se limite aux élèves du car.",
    explanation: exp(
      "L'énoncé impose une condition : « venant en car ». On se restreint donc à ces $60$ élèves.",
      "Parmi eux, $45$ arrivent avant $7$ h $30$ : $\\dfrac{45}{60}$.",
      "$= 0{,}75$.",
      "La probabilité est $0{,}75$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 3,
    theme: "neutral",
    text: "Que signifie la notation $P_A(B)$ ?",
    format: "qcm",
    choices: [
      "la probabilité de $B$ sachant que $A$ est réalisé",
      "la probabilité de $A$ sachant que $B$ est réalisé",
      "la probabilité que $A$ et $B$ soient réalisés",
      "la probabilité que $A$ ou $B$ soit réalisé",
    ],
    expected: ["la probabilité de $B$ sachant que $A$ est réalisé"],
    comparator: "mcq_exact",
    hint: "L'événement en indice est celui qu'on SUPPOSE réalisé.",
    explanation: exp(
      "Dans $P_A(B)$, l'événement écrit en indice est la CONDITION : on suppose $A$ déjà réalisé.",
      "On calcule alors la probabilité de $B$ dans cet univers réduit.",
      "La probabilité que les deux soient réalisés se note $P(A \\cap B)$ : c'est autre chose.",
      "$P_A(B)$ est la probabilité de $B$ sachant $A$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi la définition de $P_A(B)$ exige-t-elle $P(A) \\neq 0$ ?",
    format: "qcm",
    choices: [
      "car $P(A)$ est au dénominateur",
      "car une probabilité ne peut pas être nulle",
      "car $B$ doit être réalisé",
      "ce n'est pas exigé",
    ],
    expected: ["car $P(A)$ est au dénominateur"],
    comparator: "mcq_exact",
    hint: "Regarde la formule $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
    explanation: exp(
      "La probabilité conditionnelle est définie par le quotient $\\dfrac{P(A \\cap B)}{P(A)}$.",
      "Une division par zéro est impossible : il faut donc $P(A) \\neq 0$.",
      "C'est aussi logique : conditionner par un événement impossible n'a aucun sens.",
      "Parce que $P(A)$ figure au dénominateur."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_pc_cond_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "template"],
    // ★3 — les données en PROBABILITÉS ou en POURCENTAGES de la population.
    generate: () => {
      const c = pickOne(PC_CTX);
      const { a, b } = pcLettres(c);
      const pct = Math.random() < 0.5;
      const e = pcTirer((x) => pcJuste(100 * x.nA, x.N, 1) && pcJuste(100 * x.nAB, x.N, 1) && pcJuste(x.nAB, x.nA), [100, 200, 250, 400, 500, 1000]);
      const r = pcDec(e.nAB, e.nA);
      const text =
        pcDonneesProba(c, e, pct) + " " +
        pcQuestionSachant(c, c.A.s, c.A.p, c.B.s, c.B.p, `P_{${a}}(${b})`, pct ? pcDef(c) : "");
      const pa = pct ? pcPctM(e.nA, e.N) : pcM(e.nA, e.N);
      const pab = pct ? pcPctM(e.nAB, e.N) : pcM(e.nAB, e.N);
      return {
        text,
        format: "short",
        expected: pcEcritures(e.nAB, e.nA),
        comparator: "number_equal",
        explanation: exp(
          `On cherche la probabilité que ${c.le} ${c.B.s}, SACHANT ${pcQue(c.il)} ${c.A.s} : c'est $P_{${a}}(${b}) = \\dfrac{P(${a} \\cap ${b})}{P(${a})}$.`,
          `On divise la probabilité de « ${c.A.s} ET ${c.B.s} » par celle de la condition « ${c.A.s} »${pct ? " (les pourcentages se divisent comme les probabilités)" : ""}.`,
          `$P_{${a}}(${b}) = \\dfrac{${pab}}{${pa}} = \\dfrac{${pcM(e.nAB, e.N)}}{${pcM(e.nA, e.N)}} = ${pcM(e.nAB, e.nA)}$.`,
          `$P_{${a}}(${b}) = ${pcM(e.nAB, e.nA)}$ : parmi les ${c.court} qui ${c.A.p}, $${pcPctM(e.nAB, e.nA)}$ ${c.B.p}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_pc_cond_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 2,
    theme: "neutral",
    hint: "« Sachant que… » : on ne garde que le groupe de la condition, et on divise par SON effectif.",
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "template"],
    // ★2 — effectifs donnés avec « parmi » : lire la bonne division.
    generate: () => {
      const c = pickOne(PC_CTX);
      const { a, b } = pcLettres(c);
      const e = pcTirer((x) => pcJuste(x.nAB, x.nA));
      const text =
        pcDonneesEff(c, e, false) + " " +
        pcQuestionSachant(c, c.A.s, c.A.p, c.B.s, c.B.p, `P_{${a}}(${b})`, pcDef(c));
      return {
        text,
        format: "short",
        expected: pcEcritures(e.nAB, e.nA),
        comparator: "number_equal",
        explanation: exp(
          `La condition est « ${c.A.s} » : on se restreint aux $${e.nA}$ ${c.court} qui ${c.A.p}. Ils forment le nouvel univers.`,
          `Parmi ces $${e.nA}$, on compte ${c.ceux} qui ${c.B.p} : il y en a $${e.nAB}$. On divise par $${e.nA}$, pas par le total $${e.N}$.`,
          `$P_{${a}}(${b}) = \\dfrac{${e.nAB}}{${e.nA}} = ${pcM(e.nAB, e.nA)}$.`,
          `La probabilité est $${pcM(e.nAB, e.nA)}$, soit $${pcPctM(e.nAB, e.nA)}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_pc_cond_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 2,
    theme: "neutral",
    hint: "Le dénominateur est l'effectif du groupe qu'on SAIT réalisé.",
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "template", "qcm"],
    // ★2 — QCM : les leurres sont les divisions fausses.
    generate: () => {
      const c = pickOne(PC_CTX);
      const leurres = (x: PcEff): [number, number][] => [
        [x.nAB, x.N], [x.nAB, x.nB], [x.nA, x.N], [x.nA - x.nAB, x.nA],
      ];
      const e = pcTirer((x) => pcDistincts([x.nAB, x.nA], leurres(x)) >= 3);
      const q = pcQcm([e.nAB, e.nA], leurres(e));
      const t = pickOne([0, 1, 2]);
      const question =
        t === 0 ? `On choisit au hasard ${c.un} qui ${c.A.s}. Quelle est la probabilité de l'événement « ${c.il} ${c.B.s} » ?`
        : t === 1 ? `Quelle est la proportion de ${c.ceux} qui ${c.B.p} parmi les ${c.court} qui ${c.A.p} ?`
        : `On choisit ${c.un} au hasard. Sachant ${pcQue(c.il)} ${c.A.s}, quelle est la probabilité de l'événement « ${c.il} ${c.B.s} » ?`;
      return {
        text: pcDonneesEff(c, e, true) + " " + question,
        format: "qcm",
        choices: q.choices,
        expected: [q.expected],
        comparator: "mcq_exact",
        explanation: exp(
          `On SAIT que ${c.le} ${c.A.s} : on se restreint aux $${e.nA}$ ${c.court} qui ${c.A.p}.`,
          `Le numérateur : ${c.ceux} qui ${c.A.p} ET ${c.B.p}, soit $${e.nAB}$. Le dénominateur : l'effectif de la condition, $${e.nA}$.`,
          `$\\dfrac{${e.nAB}}{${e.nA}} = ${pcM(e.nAB, e.nA)}$. Les pièges : $\\dfrac{${e.nAB}}{${e.N}}$ est la probabilité de « ${c.A.s} ET ${c.B.s} » (division par le total), $\\dfrac{${e.nAB}}{${e.nB}}$ est la probabilité inverse, sachant « ${c.B.s} ».`,
          `La bonne réponse est $\\dfrac{${e.nAB}}{${e.nA}}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_pc_cond_tpl_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans le groupe de la condition, ceux qui ne vérifient pas l'événement sont « le reste ».",
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "template"],
    // ★3 — effectifs, la cible est le CONTRAIRE (B barre sachant A), ou B sachant A au milieu de données en trop.
    generate: () => {
      const c = pickOne(PC_CTX);
      const { a, b } = pcLettres(c);
      const contraire = Math.random() < 0.6;
      const e = pcTirer((x) => pcJuste(x.nA - x.nAB, x.nA) && pcJuste(x.nAB, x.nA));
      const num = contraire ? e.nA - e.nAB : e.nAB;
      const notation = contraire ? `P_{${a}}(\\overline{${b}})` : `P_{${a}}(${b})`;
      const text =
        pcDonneesEff(c, e, !contraire) + " " +
        pcQuestionSachant(c, c.A.s, c.A.p, contraire ? c.B.ns : c.B.s, contraire ? c.B.np : c.B.p, notation, pcDef(c));
      return {
        text,
        format: "short",
        expected: pcEcritures(num, e.nA),
        comparator: "number_equal",
        explanation: exp(
          `La condition est « ${c.A.s} » : on se restreint aux $${e.nA}$ ${c.court} qui ${c.A.p}.`,
          contraire
            ? `Parmi ${c.eux}, $${e.nAB}$ ${c.B.p} ; les autres ${c.B.np} : $${e.nA} - ${e.nAB} = ${num}$.`
            : `Parmi ${c.eux}, $${e.nAB}$ ${c.B.p}. Le nombre total $${e.nB}$ (et l'effectif $${e.N}$) ne sert pas : il mélange ceux qui ${c.A.np}.`,
          contraire
            ? `$${notation} = \\dfrac{${num}}{${e.nA}} = ${pcM(num, e.nA)}$ (on vérifie : $1 - ${pcM(e.nAB, e.nA)} = ${pcM(num, e.nA)}$).`
            : `$${notation} = \\dfrac{${num}}{${e.nA}} = ${pcM(num, e.nA)}$.`,
          `La probabilité est $${pcM(num, e.nA)}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_pc_cond_tpl_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ : on divise par la probabilité de la CONDITION.",
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "template", "qcm"],
    // ★3 — QCM « quel calcul » : P(A), P(B), P(A ∩ B) donnés, choisir le bon quotient.
    generate: () => {
      const c = pickOne(PC_CTX);
      const { a, b } = pcLettres(c);
      const inverse = Math.random() < 0.4; // on demande P_B(A)
      const vals = (x: PcEff) => ({ pA: x.nA / x.N, pB: x.nB / x.N, pAB: x.nAB / x.N });
      const ok = (x: PcEff) => {
        const v = vals(x);
        const cand = [v.pAB / (inverse ? v.pB : v.pA), v.pAB / (inverse ? v.pA : v.pB), v.pAB, v.pA * v.pB];
        return [x.nA, x.nB, x.nAB].every((n) => pcJuste(n, x.N, 2)) &&
          cand.every((u, i) => cand.every((w, j) => i === j || Math.abs(u - w) > 1e-9));
      };
      const e = pcTirer(ok, [100, 200, 400, 500]);
      const PA = pcM(e.nA, e.N), PB = pcM(e.nB, e.N), PAB = pcM(e.nAB, e.N);
      const [cond, condM] = inverse ? [b, PB] : [a, PA];
      const [autreM] = inverse ? [PA] : [PB];
      const cible = inverse ? a : b;
      const bon = `$\\dfrac{${PAB}}{${condM}}$`;
      const choices = shuffle([bon, `$\\dfrac{${PAB}}{${autreM}}$`, `$${PAB}$`, `$${PA} \\times ${PB}$`]);
      const t = pickOne([0, 1, 2]);
      const ev = (x: string) => (x === a ? c.A.s : c.B.s);
      const question =
        t === 0 ? `Quel calcul donne $P_{${cond}}(${cible})$ ?`
        : t === 1 ? `Quel calcul donne la probabilité de l'événement « ${c.il} ${ev(cible)} », sachant ${pcQue(c.il)} ${ev(cond)} ?`
        : `On choisit au hasard ${c.un} qui ${ev(cond)}. Quel calcul donne la probabilité de l'événement « ${c.il} ${ev(cible)} » ?`;
      return {
        text: `On choisit ${c.un} au hasard. ${pcDef(c)} On sait que $P(${a}) = ${PA}$, $P(${b}) = ${PB}$ et $P(${a} \\cap ${b}) = ${PAB}$. ${question}`,
        format: "qcm",
        choices,
        expected: [bon],
        comparator: "mcq_exact",
        explanation: exp(
          `La condition est l'événement écrit en indice, ici $${cond}$ (« ${ev(cond)} »).`,
          `$P_{${cond}}(${cible}) = \\dfrac{P(${a} \\cap ${b})}{P(${cond})}$ : on divise par la probabilité de la condition, pas par celle de $${cible}$.`,
          `$\\dfrac{${PAB}}{${condM}} = ${pcM(e.nAB, inverse ? e.nB : e.nA)}$. $\\dfrac{${PAB}}{${autreM}}$ serait l'autre probabilité conditionnelle ; $${PAB}$ seul est $P(${a} \\cap ${b})$ ; le produit $${PA} \\times ${PB}$ ne vaut $P(${a} \\cap ${b})$ que pour des événements indépendants.`,
          `Le bon calcul est $\\dfrac{${PAB}}{${condM}}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_pc_cond_tpl_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 4,
    theme: "neutral",
    hint: "$P(A \\cap B) = P(A) \\times P_A(B)$, et donc $P(A) = \\dfrac{P(A \\cap B)}{P_A(B)}$.",
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "template"],
    // ★4 — la formule retournée : trouver P(A ∩ B), ou trouver P(A).
    generate: () => {
      const c = pickOne(PC_CTX);
      const { a, b } = pcLettres(c);
      const chercheInter = Math.random() < 0.6;
      const e = pcTirer(
        (x) => pcJuste(100 * x.nA, x.N, 1) && pcJuste(100 * x.nAB, x.nA, 1) && pcJuste(100 * x.nAB, x.N, 1),
        [100, 200, 250, 400, 500, 1000],
      );
      const PA = pcM(e.nA, e.N), PAsB = pcM(e.nAB, e.nA), PAB = pcM(e.nAB, e.N);
      const sym = Math.random() < 0.5;
      let text: string;
      if (chercheInter) {
        const donnees = sym
          ? `On choisit ${c.un} au hasard. ${pcDef(c)} On sait que $P(${a}) = ${PA}$ et $P_{${a}}(${b}) = ${PAsB}$.`
          : `${c.verbe} des ${c.pop} : $${pcPctM(e.nA, e.N)}$ d'entre ${c.eux} ${c.A.p} et, parmi ${c.ceux}-ci, $${pcPctM(e.nAB, e.nA)}$ ${c.B.p}.`;
        const question = sym
          ? pickOne([`Calcule $P(${a} \\cap ${b})$.`, `Quelle est la probabilité de l'événement « ${c.le} ${c.A.s} et ${c.B.s} » ?`])
          : pickOne([
              `On choisit ${c.un} au hasard. Quelle est la probabilité de l'événement « ${c.il} ${c.A.s} et ${c.B.s} » ?`,
              `Quelle proportion de l'ensemble des ${c.court} ${c.A.p} et ${c.B.p} ? Donne-la en écriture décimale.`,
            ]);
        text = `${donnees} ${question}`;
      } else {
        const donnees = sym
          ? `On choisit ${c.un} au hasard. ${pcDef(c)} On sait que $P(${a} \\cap ${b}) = ${PAB}$ et $P_{${a}}(${b}) = ${PAsB}$.`
          : `${c.verbe} des ${c.pop} : $${pcPctM(e.nAB, e.N)}$ d'entre ${c.eux} ${c.A.p} et ${c.B.p}. Par ailleurs, parmi les ${c.court} qui ${c.A.p}, $${pcPctM(e.nAB, e.nA)}$ ${c.B.p}.`;
        const question = sym
          ? pickOne([`Calcule $P(${a})$.`, `Quelle est la probabilité de l'événement « ${c.le} ${c.A.s} » ?`])
          : pickOne([
              `On choisit ${c.un} au hasard. Quelle est la probabilité de l'événement « ${c.il} ${c.A.s} » ?`,
              `Quelle proportion des ${c.court} ${c.A.p} ? Donne-la en écriture décimale.`,
            ]);
        text = `${donnees} ${question}`;
      }
      return {
        text,
        format: "short",
        expected: chercheInter ? pcEcritures(e.nAB, e.N) : pcEcritures(e.nA, e.N),
        comparator: "number_equal",
        explanation: chercheInter
          ? exp(
              `De $P_{${a}}(${b}) = \\dfrac{P(${a} \\cap ${b})}{P(${a})}$, on tire $P(${a} \\cap ${b}) = P(${a}) \\times P_{${a}}(${b})$.`,
              `Le « parmi ${c.ceux}-ci » est une probabilité CONDITIONNELLE ; on la multiplie par la part de la condition.`,
              `$P(${a} \\cap ${b}) = ${PA} \\times ${PAsB} = ${PAB}$.`,
              `La probabilité est $${PAB}$, soit $${pcPctM(e.nAB, e.N)}$ de l'ensemble.`
            )
          : exp(
              `De $P(${a} \\cap ${b}) = P(${a}) \\times P_{${a}}(${b})$, on tire $P(${a}) = \\dfrac{P(${a} \\cap ${b})}{P_{${a}}(${b})}$.`,
              `$${PAB}$ est la part de l'ENSEMBLE ; $${PAsB}$ la part À L'INTÉRIEUR du groupe « ${c.A.s} ». On divise l'une par l'autre.`,
              `$P(${a}) = \\dfrac{${PAB}}{${PAsB}} = ${PA}$.`,
              `La probabilité est $${PA}$, soit $${pcPctM(e.nA, e.N)}$ des ${c.court}.`
            ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_pc_cond_tpl_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 4,
    theme: "neutral",
    hint: "Repère d'abord la CONDITION (après « sachant » ou « parmi ») : son effectif est le dénominateur.",
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "template"],
    // ★4 — effectifs complets : P_B(A), P_Ā(B) ou P_Ā(B̄), où la condition n'est plus « A ».
    generate: () => {
      const c = pickOne(PC_CTX);
      const { a, b } = pcLettres(c);
      const cas = pickOne(["BA", "nonA_B", "nonA_nonB"] as const);
      const frac = (x: PcEff): [number, number] =>
        cas === "BA" ? [x.nAB, x.nB] : cas === "nonA_B" ? [x.nB - x.nAB, x.N - x.nA] : [x.N - x.nA - (x.nB - x.nAB), x.N - x.nA];
      const e = pcTirer((x) => {
        const f = frac(x);
        return f[0] > 0 && pcJuste(f[0], f[1]);
      });
      const [num, den] = frac(e);
      const nonA = `\\overline{${a}}`;
      const s =
        cas === "BA"
          ? { cond: c.B.s, condP: c.B.p, cible: c.A.s, cibleP: c.A.p, not: `P_{${b}}(${a})` }
          : cas === "nonA_B"
            ? { cond: c.A.ns, condP: c.A.np, cible: c.B.s, cibleP: c.B.p, not: `P_{${nonA}}(${b})` }
            : { cond: c.A.ns, condP: c.A.np, cible: c.B.ns, cibleP: c.B.np, not: `P_{${nonA}}(\\overline{${b}})` };
      const calcul =
        cas === "BA"
          ? `La condition est « ${c.B.s} » : $${e.nB}$ ${c.court}. Parmi ${c.eux}, ${c.ceux} qui ${c.A.p} aussi sont $${e.nAB}$.`
          : cas === "nonA_B"
            ? `La condition est « ${c.A.ns} » : $${e.N} - ${e.nA} = ${den}$ ${c.court}. Parmi ${c.eux}, ${c.ceux} qui ${c.B.p} : $${e.nB} - ${e.nAB} = ${num}$.`
            : `La condition est « ${c.A.ns} » : $${e.N} - ${e.nA} = ${den}$ ${c.court}. Parmi ${c.eux}, $${e.nB} - ${e.nAB} = ${e.nB - e.nAB}$ ${c.B.p}, donc $${den} - ${e.nB - e.nAB} = ${num}$ ${c.B.np}.`;
      return {
        text: pcDonneesEff(c, e, true) + " " + pcQuestionSachant(c, s.cond, s.condP, s.cible, s.cibleP, s.not, pcDef(c)),
        format: "short",
        expected: pcEcritures(num, den),
        comparator: "number_equal",
        explanation: exp(
          `On cherche $${s.not}$ : la probabilité de « ${s.cible} » sachant « ${s.cond} ». On se restreint au groupe de la condition.`,
          calcul,
          `$${s.not} = \\dfrac{${num}}{${den}} = ${pcM(num, den)}$.${cas === "BA" ? ` Attention : ce n'est pas $P_{${a}}(${b}) = \\dfrac{${e.nAB}}{${e.nA}}$, le dénominateur change.` : ""}`,
          `La probabilité est $${pcM(num, den)}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_pc_cond_tpl_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 4,
    theme: "neutral",
    hint: "Même case du tableau, mais quel dénominateur ? Celui de la condition.",
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "template", "qcm", "piege"],
    // ★4 — QCM piège : on demande P_B(A) ; leurres P_A(B), P(A ∩ B), P(B).
    generate: () => {
      const c = pickOne(PC_CTX);
      const { a, b } = pcLettres(c);
      const leurres = (x: PcEff): [number, number][] => [[x.nAB, x.nA], [x.nAB, x.N], [x.nB, x.N], [x.nA, x.N]];
      const e = pcTirer((x) => pcDistincts([x.nAB, x.nB], leurres(x)) >= 3);
      const q = pcQcm([e.nAB, e.nB], leurres(e));
      const t = pickOne([0, 1, 2]);
      const question =
        t === 0 ? `On choisit au hasard ${c.un} qui ${c.B.s}. Quelle est la probabilité de l'événement « ${c.il} ${c.A.s} » ?`
        : t === 1 ? `${pcDef(c)} Quelle est la valeur de $P_{${b}}(${a})$ ?`
        : `Parmi les ${c.court} qui ${c.B.p}, quelle est la proportion de ${c.ceux} qui ${c.A.p} ?`;
      return {
        text: pcDonneesEff(c, e, true) + " " + question,
        format: "qcm",
        choices: q.choices,
        expected: [q.expected],
        comparator: "mcq_exact",
        explanation: exp(
          `Ici la condition est « ${c.B.s} » (et non « ${c.A.s} ») : on se restreint aux $${e.nB}$ ${c.court} qui ${c.B.p}.`,
          `Parmi ${c.eux}, $${e.nAB}$ ${c.A.p}.`,
          `$P_{${b}}(${a}) = \\dfrac{${e.nAB}}{${e.nB}} = ${pcM(e.nAB, e.nB)}$. Le piège $\\dfrac{${e.nAB}}{${e.nA}}$ est $P_{${a}}(${b})$ : même numérateur, autre condition.`,
          `La bonne réponse est $\\dfrac{${e.nAB}}{${e.nB}}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_pc_cond_tpl_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 5,
    theme: "neutral",
    hint: "D'abord $P(A \\cap B) = P(A) + P(B) - P(A \\cup B)$, puis la formule de la probabilité conditionnelle.",
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "template"],
    // ★5 — deux étapes : P(A ∪ B) donné, retrouver l'intersection, puis conditionner.
    generate: () => {
      const c = pickOne(PC_CTX);
      const { a, b } = pcLettres(c);
      const surB = Math.random() < 0.4;
      const e = pcTirer(
        (x) => [x.nA, x.nB, x.nAB].every((n) => pcJuste(100 * n, x.N, 1)) && pcJuste(x.nAB, surB ? x.nB : x.nA),
        [100, 200, 400, 500, 1000],
      );
      const nU = e.nA + e.nB - e.nAB;
      const pct = Math.random() < 0.5;
      const [cond, cible, den] = surB ? [b, a, e.nB] : [a, b, e.nA];
      const ev = (x: string) => (x === a ? c.A : c.B);
      const P = (n: number) => (pct ? pcPctM(n, e.N) : pcM(n, e.N));
      const donnees = pct
        ? `${c.verbe} des ${c.pop} : $${P(e.nA)}$ d'entre ${c.eux} ${c.A.p}, $${P(e.nB)}$ ${c.B.p}, et $${P(nU)}$ ${c.A.p} ou ${c.B.p} (au moins l'un des deux).`
        : `On choisit ${c.un} au hasard. ${pcDef(c)} On sait que $P(${a}) = ${P(e.nA)}$, $P(${b}) = ${P(e.nB)}$ et $P(${a} \\cup ${b}) = ${P(nU)}$.`;
      const question = pcQuestionSachant(c, ev(cond).s, ev(cond).p, ev(cible).s, ev(cible).p, `P_{${cond}}(${cible})`, pct ? pcDef(c) : "");
      return {
        text: `${donnees} ${question}`,
        format: "short",
        expected: pcEcritures(e.nAB, den),
        comparator: "number_equal",
        explanation: exp(
          `On cherche $P_{${cond}}(${cible}) = \\dfrac{P(${a} \\cap ${b})}{P(${cond})}$ ; il manque l'intersection.`,
          `« ${c.A.s} ou ${c.B.s} » est la réunion : $P(${a} \\cup ${b}) = P(${a}) + P(${b}) - P(${a} \\cap ${b})$, donc $P(${a} \\cap ${b}) = P(${a}) + P(${b}) - P(${a} \\cup ${b})$.`,
          `$P(${a} \\cap ${b}) = ${pcM(e.nA, e.N)} + ${pcM(e.nB, e.N)} - ${pcM(nU, e.N)} = ${pcM(e.nAB, e.N)}$, puis $P_{${cond}}(${cible}) = \\dfrac{${pcM(e.nAB, e.N)}}{${pcM(den, e.N)}} = ${pcM(e.nAB, den)}$.`,
          `$P_{${cond}}(${cible}) = ${pcM(e.nAB, den)}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_pc_cond_tpl_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule d'abord $P(A \\cap B) = P(A) \\times P_A(B)$, puis divise par $P(B)$.",
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "template"],
    // ★5 — on connaît P(A), P_A(B) et P(B) : retourner la condition, P_B(A).
    generate: () => {
      const c = pickOne(PC_CTX);
      const { a, b } = pcLettres(c);
      const e = pcTirer(
        (x) => pcJuste(100 * x.nA, x.N, 1) && pcJuste(100 * x.nB, x.N, 1) && pcJuste(100 * x.nAB, x.nA, 1) && pcJuste(x.nAB, x.nB) && pcJuste(x.nAB, x.N, 4),
        [100, 200, 250, 400, 500, 1000],
      );
      const pct = Math.random() < 0.5;
      const donnees = pct
        ? `${c.verbe} des ${c.pop} : $${pcPctM(e.nA, e.N)}$ d'entre ${c.eux} ${c.A.p} et, parmi ${c.ceux}-ci, $${pcPctM(e.nAB, e.nA)}$ ${c.B.p}. Au total, $${pcPctM(e.nB, e.N)}$ des ${c.court} ${c.B.p}.`
        : `On choisit ${c.un} au hasard. ${pcDef(c)} On sait que $P(${a}) = ${pcM(e.nA, e.N)}$, $P_{${a}}(${b}) = ${pcM(e.nAB, e.nA)}$ et $P(${b}) = ${pcM(e.nB, e.N)}$.`;
      const question = pcQuestionSachant(c, c.B.s, c.B.p, c.A.s, c.A.p, `P_{${b}}(${a})`, pct ? pcDef(c) : "");
      return {
        text: `${donnees} ${question}`,
        format: "short",
        expected: pcEcritures(e.nAB, e.nB),
        comparator: "number_equal",
        explanation: exp(
          `On cherche $P_{${b}}(${a}) = \\dfrac{P(${a} \\cap ${b})}{P(${b})}$ : la condition est maintenant « ${c.B.s} ».`,
          `L'intersection se calcule avec la donnée « parmi » : $P(${a} \\cap ${b}) = P(${a}) \\times P_{${a}}(${b})$.`,
          `$P(${a} \\cap ${b}) = ${pcM(e.nA, e.N)} \\times ${pcM(e.nAB, e.nA)} = ${pcM(e.nAB, e.N)}$, puis $P_{${b}}(${a}) = \\dfrac{${pcM(e.nAB, e.N)}}{${pcM(e.nB, e.N)}} = ${pcM(e.nAB, e.nB)}$.`,
          `$P_{${b}}(${a}) = ${pcM(e.nAB, e.nB)}$, différent de $P_{${a}}(${b}) = ${pcM(e.nAB, e.nA)}$.`
        ),
      };
    },
  },

  /* ===================== PC_ARBRE ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un arbre pondéré, la probabilité d'un chemin (de la racine à une feuille) s'obtient en :",
    format: "qcm",
    choices: [
      "multipliant les probabilités le long du chemin",
      "additionnant les probabilités le long du chemin",
      "prenant la plus grande probabilité",
      "soustrayant les probabilités",
    ],
    expected: ["multipliant les probabilités le long du chemin"],
    comparator: "mcq_exact",
    hint: "Règle du produit.",
    explanation: exp(
      "La probabilité d'un chemin suit la règle du produit.",
      "On multiplie les probabilités rencontrées le long du chemin.",
      "Ex. : $P(A \\cap B) = P(A) \\times P_A(B)$.",
      "On multiplie les probabilités le long du chemin."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 3,
    theme: "neutral",
    text: "Sur l'arbre, calcule $P(A \\cap B)$ avec $P(A) = 0{,}6$ et $P_A(B) = 0{,}5$.",
    format: "short",
    expected: ["0,3"],
    comparator: "number_equal",
    hint: "$0{,}6 \\times 0{,}5$.",
    explanation: exp(
      "On multiplie le long du chemin A → B.",
      "$P(A \\cap B) = P(A) \\times P_A(B) = 0{,}6 \\times 0{,}5$.",
      "$= 0{,}3$.",
      "$P(A \\cap B) = 0{,}3$."
    ),
    canvas: arbre(0.6, 0.5, 0.2),
    tags: ["premiere", "maths", "probas_cond", "arbre", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une branche issue d'un nœud, la somme des probabilités des sous-branches vaut :",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Toutes les possibilités sont couvertes.",
    explanation: exp(
      "À partir d'un nœud, les branches couvrent tous les cas possibles.",
      "Leurs probabilités forment une partition.",
      "Leur somme vaut donc $1$.",
      "La somme vaut $1$."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 4,
    theme: "neutral",
    text: "Sur l'arbre, $P(A) = 0{,}7$ et $P_A(B) = 0{,}4$. Quelle est la probabilité $P_A(\\bar{B})$ ?",
    format: "short",
    expected: ["0,6"],
    comparator: "number_equal",
    hint: "$P_A(\\bar B) = 1 - P_A(B)$.",
    explanation: exp(
      "Les deux sous-branches issues de $A$ ont une somme égale à $1$.",
      "$P_A(\\bar B) = 1 - P_A(B) = 1 - 0{,}4$.",
      "$= 0{,}6$.",
      "$P_A(\\bar B) = 0{,}6$."
    ),
    canvas: arbre(0.7, 0.4, 0.3),
    tags: ["premiere", "maths", "probas_cond", "arbre", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 4,
    theme: "neutral",
    text: "Sur l'arbre, $P(A) = 0{,}3$ et $P_A(B) = 0{,}8$. Combien vaut $P(A \\cap B)$ ?",
    format: "short",
    expected: ["0,24"],
    comparator: "number_equal",
    hint: "On MULTIPLIE les probabilités le long du chemin.",
    explanation: exp(
      "La probabilité d'un chemin est le produit des probabilités portées par ses branches.",
      "$P(A \\cap B) = P(A) \\times P_A(B) = 0{,}3 \\times 0{,}8$.",
      "$= 0{,}24$. On multiplie le long d'un chemin ; on additionne entre chemins différents.",
      "$P(A \\cap B) = 0{,}24$."
    ),
    canvas: arbre(0.3, 0.8, 0.5),
    tags: ["premiere", "maths", "probas_cond", "arbre", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un arbre, la branche menant à $\\bar A$ porte $0{,}6$. Que porte la branche menant à $A$ ?",
    format: "short",
    expected: ["0,4"],
    comparator: "number_equal",
    hint: "La somme des branches issues d'un même nœud vaut $1$.",
    explanation: exp(
      "Les branches issues d'un même nœud décrivent tous les cas possibles : leur somme vaut $1$.",
      "$P(A) = 1 - P(\\bar A) = 1 - 0{,}6$.",
      "$= 0{,}4$.",
      "La branche menant à $A$ porte $0{,}4$."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 4,
    theme: "neutral",
    text: "Sur l'arbre, $P(\\bar A) = 0{,}5$ et $P_{\\bar A}(B) = 0{,}6$. Combien vaut $P(\\bar A \\cap B)$ ?",
    format: "short",
    expected: ["0,3"],
    comparator: "number_equal",
    hint: "Même règle du produit, sur le chemin qui passe par $\\bar A$.",
    explanation: exp(
      "La règle du produit vaut pour tous les chemins de l'arbre, y compris ceux qui passent par l'événement contraire.",
      "$P(\\bar A \\cap B) = P(\\bar A) \\times P_{\\bar A}(B) = 0{,}5 \\times 0{,}6$.",
      "$= 0{,}3$.",
      "$P(\\bar A \\cap B) = 0{,}3$."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Que porte une branche du PREMIER niveau d'un arbre pondéré ?",
    format: "qcm",
    choices: [
      "une probabilité simple, comme $P(A)$",
      "une probabilité conditionnelle, comme $P_A(B)$",
      "une intersection, comme $P(A \\cap B)$",
      "toujours $0{,}5$",
    ],
    expected: ["une probabilité simple, comme $P(A)$"],
    comparator: "mcq_exact",
    hint: "Au premier niveau, aucune information n'est encore connue.",
    explanation: exp(
      "Le premier niveau part de la racine : rien n'est encore supposé réalisé.",
      "On y écrit donc des probabilités simples : $P(A)$ et $P(\\bar A)$.",
      "Les probabilités conditionnelles apparaissent au deuxième niveau, une fois qu'on sait par où l'on est passé.",
      "Une probabilité simple, comme $P(A)$."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Que porte une branche du DEUXIÈME niveau d'un arbre pondéré ?",
    format: "qcm",
    choices: [
      "une probabilité conditionnelle, comme $P_A(B)$",
      "une probabilité simple, comme $P(B)$",
      "une intersection, comme $P(A \\cap B)$",
      "la somme des probabilités précédentes",
    ],
    expected: ["une probabilité conditionnelle, comme $P_A(B)$"],
    comparator: "mcq_exact",
    hint: "Au deuxième niveau, on sait déjà par quelle branche on est passé.",
    explanation: exp(
      "Arrivé au deuxième niveau, on a déjà emprunté une branche : cette information conditionne la suite.",
      "On y écrit donc $P_A(B)$ ou $P_{\\bar A}(B)$ selon le chemin suivi.",
      "L'intersection $P(A \\cap B)$, elle, n'apparaît pas sur une branche : c'est le résultat du PRODUIT le long du chemin, écrit au bout.",
      "Une probabilité conditionnelle, comme $P_A(B)$."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Un arbre a deux niveaux, chacun avec deux branches ($A$ ou $\\bar A$, puis $B$ ou $\\bar B$). Combien de chemins complets compte-t-il ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$2$ possibilités, puis $2$ pour chacune.",
    explanation: exp(
      "Chaque chemin complet part de la racine et va jusqu'à une extrémité.",
      "Il y a $2$ choix au premier niveau, et pour chacun $2$ choix au second : $2 \\times 2$.",
      "$= 4$ chemins : $A \\cap B$, $A \\cap \\bar B$, $\\bar A \\cap B$, $\\bar A \\cap \\bar B$.",
      "L'arbre compte $4$ chemins, dont les probabilités ont pour somme $1$."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 5,
    theme: "neutral",
    text: "Un sac contient $3$ boules rouges et $2$ vertes. On tire une boule, on la REMET, puis on en tire une seconde. Quelle est la probabilité d'obtenir deux rouges ?",
    format: "short",
    expected: ["0,36"],
    comparator: "number_equal",
    hint: "Avec remise, la composition du sac ne change pas : $0{,}6$ à chaque tirage.",
    explanation: exp(
      "On construit un arbre à deux niveaux ; avec remise, les probabilités du second niveau sont les mêmes qu'au premier.",
      "$P(\\text{rouge}) = \\dfrac{3}{5} = 0{,}6$ à chaque tirage, et on multiplie le long du chemin.",
      "$0{,}6 \\times 0{,}6 = 0{,}36$.",
      "La probabilité est $0{,}36$."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "short"],
  },
  {
    kind: "template",
    id: "premiere_pc_arb_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 3,
    theme: "neutral",
    hint: "On multiplie le long d'un chemin ; on additionne les chemins.",
    tags: ["premiere", "maths", "probas_cond", "arbre", "template"],
    generate: () => pcGenArbreChemin(false),
  },

  /* ===================== PC_TOTALES ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 3,
    theme: "neutral",
    text: "Avec la partition $\\{A ; \\bar A\\}$, la formule des probabilités totales donne $P(B) =$",
    format: "qcm",
    choices: [
      "$P(A \\cap B) + P(\\bar A \\cap B)$",
      "$P(A) \\times P(B)$",
      "$P(A \\cap B) - P(\\bar A \\cap B)$",
      "$P(A) + P(B)$",
    ],
    expected: ["$P(A \\cap B) + P(\\bar A \\cap B)$"],
    comparator: "mcq_exact",
    hint: "On additionne les chemins menant à $B$.",
    explanation: exp(
      "$B$ est atteint soit via $A$, soit via $\\bar A$.",
      "On additionne les probabilités de ces deux chemins.",
      "$P(B) = P(A \\cap B) + P(\\bar A \\cap B)$.",
      "$P(A \\cap B) + P(\\bar A \\cap B)$."
    ),
    tags: ["premiere", "maths", "probas_cond", "totales", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}3$ et $P(\\bar A \\cap B) = 0{,}2$. Combien vaut $P(B)$ ?",
    format: "short",
    expected: ["0,5"],
    comparator: "number_equal",
    hint: "Somme des deux chemins menant à $B$.",
    explanation: exp(
      "On applique la formule des probabilités totales.",
      "$P(B) = P(A \\cap B) + P(\\bar A \\cap B) = 0{,}3 + 0{,}2$.",
      "$= 0{,}5$.",
      "$P(B) = 0{,}5$."
    ),
    tags: ["premiere", "maths", "probas_cond", "totales", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $P(A) = 0{,}6$, $P_A(B) = 0{,}5$, $P_{\\bar A}(B) = 0{,}25$, calcule $P(B)$.",
    format: "short",
    expected: ["0,4"],
    comparator: "number_equal",
    hint: "$P(B) = P(A)P_A(B) + P(\\bar A)P_{\\bar A}(B)$.",
    explanation: exp(
      "On applique la formule des probabilités totales développée.",
      "$P(B) = 0{,}6 \\times 0{,}5 + 0{,}4 \\times 0{,}25 = 0{,}3 + 0{,}1$.",
      "$= 0{,}4$.",
      "$P(B) = 0{,}4$."
    ),
    canvas: arbre(0.6, 0.5, 0.25),
    tags: ["premiere", "maths", "probas_cond", "totales", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 5,
    theme: "neutral",
    text: "Un test : $P(\\text{malade}) = 0{,}1$, $P_{\\text{malade}}(+) = 0{,}9$, $P_{\\text{sain}}(+) = 0{,}2$. Quelle est la probabilité d'avoir un test positif ?",
    format: "short",
    expected: ["0,27"],
    comparator: "number_equal",
    hint: "$0{,}1 \\times 0{,}9 + 0{,}9 \\times 0{,}2$.",
    explanation: exp(
      "On applique les probabilités totales sur la partition malade/sain.",
      "$P(+) = 0{,}1 \\times 0{,}9 + 0{,}9 \\times 0{,}2 = 0{,}09 + 0{,}18$.",
      "$= 0{,}27$.",
      "$P(+) = 0{,}27$."
    ),
    canvas: arbre(0.1, 0.9, 0.2),
    tags: ["premiere", "maths", "probas_cond", "totales", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 5,
    theme: "neutral",
    text: "Avec $P(A) = 0{,}3$, $P_A(B) = 0{,}6$ et $P_{\\bar A}(B) = 0{,}2$, calcule $P(B)$.",
    format: "short",
    expected: ["0,32"],
    comparator: "number_equal",
    hint: "$P(\\bar A) = 0{,}7$ : additionne les deux chemins menant à $B$.",
    explanation: exp(
      "La formule des probabilités totales additionne les chemins qui aboutissent à $B$ : $P(B) = P(A) \\times P_A(B) + P(\\bar A) \\times P_{\\bar A}(B)$.",
      "$P(\\bar A) = 1 - 0{,}3 = 0{,}7$, donc $P(B) = 0{,}3 \\times 0{,}6 + 0{,}7 \\times 0{,}2$.",
      "$= 0{,}18 + 0{,}14 = 0{,}32$.",
      "$P(B) = 0{,}32$."
    ),
    canvas: arbre(0.3, 0.6, 0.2),
    tags: ["premiere", "maths", "probas_cond", "totales", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 3,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}25$ et $P(\\bar A \\cap B) = 0{,}15$. Combien vaut $P(B)$ ?",
    format: "short",
    expected: ["0,4"],
    comparator: "number_equal",
    hint: "$B$ se réalise soit avec $A$, soit avec $\\bar A$ : il n'y a pas d'autre cas.",
    explanation: exp(
      "Tout événement $B$ se décompose selon la partition $\\{A ; \\bar A\\}$ : $P(B) = P(A \\cap B) + P(\\bar A \\cap B)$.",
      "$0{,}25 + 0{,}15$.",
      "$= 0{,}4$.",
      "$P(B) = 0{,}4$."
    ),
    tags: ["premiere", "maths", "probas_cond", "totales", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(B) = 0{,}5$ et $P(A \\cap B) = 0{,}2$. Combien vaut $P(\\bar A \\cap B)$ ?",
    format: "short",
    expected: ["0,3"],
    comparator: "number_equal",
    hint: "Les deux morceaux de $B$ ont pour somme $P(B)$.",
    explanation: exp(
      "$B$ se partage en deux morceaux disjoints : celui qui rencontre $A$ et celui qui rencontre $\\bar A$.",
      "$P(\\bar A \\cap B) = P(B) - P(A \\cap B) = 0{,}5 - 0{,}2$.",
      "$= 0{,}3$.",
      "$P(\\bar A \\cap B) = 0{,}3$."
    ),
    tags: ["premiere", "maths", "probas_cond", "totales", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_partition",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi $\\{A ; \\bar A\\}$ forme-t-il une partition de l'univers ?",
    format: "qcm",
    choices: [
      "car $A$ et $\\bar A$ sont incompatibles et couvrent tous les cas",
      "car $A$ et $\\bar A$ ont la même probabilité",
      "car $P(A) + P(\\bar A) = 0$",
      "car $A$ et $\\bar A$ sont indépendants",
    ],
    expected: ["car $A$ et $\\bar A$ sont incompatibles et couvrent tous les cas"],
    comparator: "mcq_exact",
    hint: "Une partition : aucun recouvrement, aucun oubli.",
    explanation: exp(
      "Une partition découpe l'univers en morceaux disjoints qui, réunis, le recouvrent entièrement.",
      "$A$ et $\\bar A$ ne peuvent pas se produire ensemble (incompatibles) et l'un des deux se produit forcément.",
      "C'est ce qui autorise la formule des probabilités totales. Leurs probabilités ont pour somme $1$, et non $0$ ; elles n'ont aucune raison d'être égales.",
      "Ils sont incompatibles et couvrent tous les cas."
    ),
    tags: ["premiere", "maths", "probas_cond", "totales", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 5,
    theme: "neutral",
    text: "Une usine a deux machines : la première produit $60\\%$ des pièces avec $2\\%$ de défauts, la seconde $40\\%$ avec $5\\%$ de défauts. Quelle est la probabilité qu'une pièce soit défectueuse ?",
    format: "short",
    expected: ["0,032"],
    comparator: "number_equal",
    hint: "$0{,}6 \\times 0{,}02 + 0{,}4 \\times 0{,}05$.",
    explanation: exp(
      "La machine d'origine forme une partition : on additionne les deux chemins menant à « défectueuse ».",
      "$P(D) = 0{,}6 \\times 0{,}02 + 0{,}4 \\times 0{,}05 = 0{,}012 + 0{,}02$.",
      "$= 0{,}032$, soit $3{,}2\\%$ des pièces.",
      "La probabilité est $0{,}032$."
    ),
    canvas: arbre(0.6, 0.02, 0.05),
    tags: ["premiere", "maths", "probas_cond", "totales", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 5,
    theme: "neutral",
    text: "A-t-on $P(B) = P_A(B) + P_{\\bar A}(B)$ ?",
    format: "qcm",
    choices: [
      "non : il faut pondérer par $P(A)$ et $P(\\bar A)$",
      "oui, toujours",
      "oui, si $A$ et $B$ sont indépendants",
      "oui, si $P(A) = 0{,}5$",
    ],
    expected: ["non : il faut pondérer par $P(A)$ et $P(\\bar A)$"],
    comparator: "mcq_exact",
    hint: "Cette somme pourrait dépasser $1$ : par exemple $0{,}9 + 0{,}8$.",
    explanation: exp(
      "La formule correcte est $P(B) = P(A) \\times P_A(B) + P(\\bar A) \\times P_{\\bar A}(B)$.",
      "Sans les poids $P(A)$ et $P(\\bar A)$, la somme peut dépasser $1$ : avec $P_A(B) = 0{,}9$ et $P_{\\bar A}(B) = 0{,}8$, on obtiendrait $1{,}7$, ce qui est impossible.",
      "Chaque probabilité conditionnelle doit être pesée par la probabilité du chemin qui y mène.",
      "Non : il faut pondérer par $P(A)$ et $P(\\bar A)$."
    ),
    tags: ["premiere", "maths", "probas_cond", "totales", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi sert la formule des probabilités totales ?",
    format: "qcm",
    choices: [
      "à calculer $P(B)$ en additionnant tous les chemins qui mènent à $B$",
      "à calculer $P_A(B)$ à partir de $P_B(A)$",
      "à vérifier que deux événements sont indépendants",
      "à calculer la somme des branches d'un nœud",
    ],
    expected: ["à calculer $P(B)$ en additionnant tous les chemins qui mènent à $B$"],
    comparator: "mcq_exact",
    hint: "Sur un arbre, combien de chemins aboutissent à $B$ ?",
    explanation: exp(
      "Un événement $B$ peut être atteint par plusieurs chemins de l'arbre.",
      "La formule additionne la probabilité de chacun de ces chemins pour reconstituer $P(B)$.",
      "C'est la règle « on multiplie le long d'un chemin, on additionne entre les chemins ».",
      "Elle sert à calculer $P(B)$ en additionnant tous les chemins qui mènent à $B$."
    ),
    tags: ["premiere", "maths", "probas_cond", "totales", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_pc_tot_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 4,
    theme: "neutral",
    hint: "$P(B) = P(A) P_A(B) + P(\bar A) P_{\bar A}(B)$.",
    tags: ["premiere", "maths", "probas_cond", "totales", "template"],
    generate: () => pcGenTotales("short"),
  },

  /* ===================== PC_INDEPENDANCE ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 2,
    theme: "neutral",
    text: "Deux événements $A$ et $B$ sont indépendants si et seulement si :",
    format: "qcm",
    choices: [
      "$P(A \\cap B) = P(A) \\times P(B)$",
      "$P(A \\cap B) = P(A) + P(B)$",
      "$P(A \\cap B) = 0$",
      "$P(A) = P(B)$",
    ],
    expected: ["$P(A \\cap B) = P(A) \\times P(B)$"],
    comparator: "mcq_exact",
    hint: "Produit des probabilités.",
    explanation: exp(
      "L'indépendance se caractérise par le produit.",
      "$A$ et $B$ indépendants $\\Leftrightarrow P(A \\cap B) = P(A) \\times P(B)$.",
      "C'est équivalent à $P_A(B) = P(B)$.",
      "$P(A \\cap B) = P(A) \\times P(B)$."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 3,
    theme: "neutral",
    text: "Si $A$ et $B$ sont indépendants avec $P(A) = 0{,}5$ et $P(B) = 0{,}4$, combien vaut $P(A \\cap B)$ ?",
    format: "short",
    expected: ["0,2"],
    comparator: "number_equal",
    hint: "$P(A) \\times P(B)$.",
    explanation: exp(
      "Pour des événements indépendants, $P(A \\cap B) = P(A) \\times P(B)$.",
      "$0{,}5 \\times 0{,}4$.",
      "$= 0{,}2$.",
      "$P(A \\cap B) = 0{,}2$."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A) = 0{,}5$, $P(B) = 0{,}4$, $P(A \\cap B) = 0{,}3$. Les événements sont-ils indépendants ?",
    format: "qcm",
    choices: [
      "Non, car $0{,}3 \\neq 0{,}5 \\times 0{,}4$",
      "Oui, car $0{,}3 = 0{,}5 \\times 0{,}4$",
      "Oui, toujours",
      "On ne peut pas savoir",
    ],
    expected: ["Non, car $0{,}3 \\neq 0{,}5 \\times 0{,}4$"],
    comparator: "mcq_exact",
    hint: "Compare $P(A \\cap B)$ et $P(A)P(B)$.",
    explanation: exp(
      "On compare $P(A \\cap B)$ et $P(A) \\times P(B)$.",
      "$P(A) \\times P(B) = 0{,}5 \\times 0{,}4 = 0{,}2$, or $P(A \\cap B) = 0{,}3$.",
      "$0{,}3 \\neq 0{,}2$ : pas indépendants.",
      "Non, ils ne sont pas indépendants."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 3,
    theme: "neutral",
    text: "Si $A$ et $B$ sont indépendants, alors $P_A(B)$ est égale à :",
    format: "qcm",
    choices: ["$P(B)$", "$P(A)$", "$0$", "$1$"],
    expected: ["$P(B)$"],
    comparator: "mcq_exact",
    hint: "L'événement $A$ n'influence pas $B$.",
    explanation: exp(
      "L'indépendance signifie que $A$ n'influe pas sur $B$.",
      "La probabilité de $B$ sachant $A$ est la même que celle de $B$.",
      "$P_A(B) = P(B)$.",
      "$P(B)$."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 3,
    theme: "neutral",
    text: "Si $A$ et $B$ sont indépendants avec $P(A) = 0{,}2$ et $P(B) = 0{,}5$, combien vaut $P(A \\cap B)$ ?",
    format: "short",
    expected: ["0,1"],
    comparator: "number_equal",
    hint: "Pour des événements indépendants, on multiplie simplement les probabilités.",
    explanation: exp(
      "L'indépendance se traduit par $P(A \\cap B) = P(A) \\times P(B)$.",
      "$0{,}2 \\times 0{,}5$.",
      "$= 0{,}1$.",
      "$P(A \\cap B) = 0{,}1$."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A) = 0{,}4$, $P(B) = 0{,}6$ et $P(A \\cap B) = 0{,}24$. Les événements sont-ils indépendants ?",
    format: "qcm",
    choices: [
      "oui, car $0{,}4 \\times 0{,}6 = 0{,}24$",
      "non, car $0{,}4 + 0{,}6 \\neq 0{,}24$",
      "non, car $P(A) \\neq P(B)$",
      "on ne peut pas conclure",
    ],
    expected: ["oui, car $0{,}4 \\times 0{,}6 = 0{,}24$"],
    comparator: "mcq_exact",
    hint: "Compare $P(A) \\times P(B)$ et $P(A \\cap B)$.",
    explanation: exp(
      "Le test d'indépendance consiste à comparer $P(A \\cap B)$ au produit $P(A) \\times P(B)$.",
      "$0{,}4 \\times 0{,}6 = 0{,}24$.",
      "C'est exactement la valeur de $P(A \\cap B)$ : le test est concluant.",
      "Oui, les événements sont indépendants."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(B) = 0{,}3$ et $P_A(B) = 0{,}3$. Que peut-on en déduire ?",
    format: "qcm",
    choices: [
      "$A$ et $B$ sont indépendants",
      "$A$ et $B$ sont incompatibles",
      "$P(A) = 0{,}3$",
      "$A$ est inclus dans $B$",
    ],
    expected: ["$A$ et $B$ sont indépendants"],
    comparator: "mcq_exact",
    hint: "Savoir que $A$ est réalisé change-t-il la probabilité de $B$ ?",
    explanation: exp(
      "L'indépendance signifie que la réalisation de $A$ ne modifie pas la probabilité de $B$.",
      "Ici $P_A(B) = P(B) = 0{,}3$ : l'information « $A$ est réalisé » n'apporte rien sur $B$.",
      "C'est exactement la caractérisation de l'indépendance ; on ne peut en revanche rien dire de $P(A)$.",
      "$A$ et $B$ sont indépendants."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance_incompatible",
    difficulty: 5,
    theme: "neutral",
    text: "Deux événements INCOMPATIBLES $A$ et $B$, de probabilités non nulles, sont-ils indépendants ?",
    format: "qcm",
    choices: [
      "non : $P(A \\cap B) = 0$ alors que $P(A) \\times P(B) > 0$",
      "oui : incompatibles et indépendants, c'est la même chose",
      "oui, si $P(A) = P(B)$",
      "on ne peut pas savoir",
    ],
    expected: ["non : $P(A \\cap B) = 0$ alors que $P(A) \\times P(B) > 0$"],
    comparator: "mcq_exact",
    hint: "Incompatibles signifie qu'ils ne peuvent pas se produire ensemble : que vaut alors $P(A \\cap B)$ ?",
    explanation: exp(
      "Incompatibles et indépendants sont deux notions différentes, souvent confondues.",
      "Incompatibles : $A \\cap B$ est impossible, donc $P(A \\cap B) = 0$. Or $P(A) \\times P(B) > 0$ puisque les deux probabilités sont non nulles.",
      "Les deux nombres diffèrent : les événements ne sont donc PAS indépendants. C'est même le contraire : savoir que $A$ est réalisé rend $B$ impossible.",
      "Non, ils ne sont pas indépendants."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 3,
    theme: "neutral",
    text: "On lance un dé deux fois de suite. Les résultats des deux lancers sont-ils indépendants ?",
    format: "qcm",
    choices: [
      "oui : le dé n'a pas de mémoire",
      "non : le premier lancer influence le second",
      "oui, seulement si le premier donne $6$",
      "non, car il s'agit du même dé",
    ],
    expected: ["oui : le dé n'a pas de mémoire"],
    comparator: "mcq_exact",
    hint: "Le résultat du premier lancer modifie-t-il les chances au second ?",
    explanation: exp(
      "Deux expériences sont indépendantes lorsque le résultat de l'une ne modifie pas les probabilités de l'autre.",
      "Un dé ne conserve aucune trace du lancer précédent : chaque face garde une probabilité de $\\dfrac{1}{6}$.",
      "Le fait que ce soit le même objet ne change rien ; c'est l'absence d'influence qui compte.",
      "Oui, les deux lancers sont indépendants."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 5,
    theme: "neutral",
    text: "On tire deux cartes SANS REMISE dans un jeu. Les deux tirages sont-ils indépendants ?",
    format: "qcm",
    choices: [
      "non : la première carte tirée modifie la composition du jeu",
      "oui : les cartes sont mélangées",
      "oui : chaque carte a la même probabilité",
      "cela dépend de la première carte",
    ],
    expected: ["non : la première carte tirée modifie la composition du jeu"],
    comparator: "mcq_exact",
    hint: "Après le premier tirage, combien de cartes reste-t-il ?",
    explanation: exp(
      "L'indépendance suppose que le premier résultat ne change rien aux probabilités du second.",
      "Sans remise, la carte tirée ne revient pas : le second tirage se fait sur un jeu réduit et modifié.",
      "Les probabilités du second tirage dépendent donc du premier : c'est le cas typique où l'on doit passer par un arbre et des probabilités conditionnelles.",
      "Non, les tirages ne sont pas indépendants."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 5,
    theme: "neutral",
    text: "$A$ et $B$ sont indépendants, $P(A) = 0{,}3$ et $P(A \\cap B) = 0{,}12$. Combien vaut $P(B)$ ?",
    format: "short",
    expected: ["0,4"],
    comparator: "number_equal",
    hint: "$0{,}3 \\times P(B) = 0{,}12$.",
    explanation: exp(
      "L'indépendance donne $P(A \\cap B) = P(A) \\times P(B)$ : on peut y voir une équation d'inconnue $P(B)$.",
      "$0{,}3 \\times P(B) = 0{,}12$.",
      "$P(B) = \\dfrac{0{,}12}{0{,}3} = 0{,}4$.",
      "$P(B) = 0{,}4$."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "short"],
  },
  {
    kind: "template",
    id: "premiere_pc_ind_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 3,
    theme: "neutral",
    hint: "Indépendants : $P(A \cap B) = P(A) \times P(B)$.",
    tags: ["premiere", "maths", "probas_cond", "independance", "template"],
    generate: () => pcGenIndependanceProduit(false),
  },

  /* ===================== PC_REGISTRES ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_reg_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 3,
    theme: "neutral",
    text: "« Parmi les élèves qui font de l'espagnol, quelle est la proportion de demi-pensionnaires ? » Comment cela s'écrit-il ?",
    format: "qcm",
    choices: [
      "$P_{\\text{espagnol}}(\\text{demi-pensionnaire})$",
      "$P_{\\text{demi-pensionnaire}}(\\text{espagnol})$",
      "$P(\\text{espagnol} \\cap \\text{demi-pensionnaire})$",
      "$P(\\text{espagnol}) \\times P(\\text{demi-pensionnaire})$",
    ],
    expected: ["$P_{\\text{espagnol}}(\\text{demi-pensionnaire})$"],
    comparator: "mcq_exact",
    hint: "Le mot « parmi » désigne l'ensemble dans lequel on se place : c'est la condition.",
    explanation: exp(
      "Dans $P_A(B)$, l'événement écrit EN INDICE est celui qu'on suppose déjà réalisé : c'est le monde dans lequel on se place.",
      "Le mot « parmi » signale toujours cette condition : « parmi les hispanisants » veut dire qu'on ne regarde plus que ces élèves-là.",
      "La condition est donc « espagnol », et l'événement dont on cherche la probabilité est « demi-pensionnaire ».",
      "Cela s'écrit $P_{\\text{espagnol}}(\\text{demi-pensionnaire})$."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "registres", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_reg_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 4,
    theme: "neutral",
    text: "« La probabilité qu'un élève fasse de l'espagnol ET soit demi-pensionnaire » s'écrit :",
    format: "qcm",
    choices: [
      "$P(\\text{espagnol} \\cap \\text{demi-pensionnaire})$",
      "$P_{\\text{espagnol}}(\\text{demi-pensionnaire})$",
      "$P(\\text{espagnol}) + P(\\text{demi-pensionnaire})$",
      "$P_{\\text{demi-pensionnaire}}(\\text{espagnol})$",
    ],
    expected: ["$P(\\text{espagnol} \\cap \\text{demi-pensionnaire})$"],
    comparator: "mcq_exact",
    hint: "Ici on tire un élève au hasard dans TOUTE la classe, pas parmi un sous-groupe.",
    explanation: exp(
      "Deux écritures voisines disent des choses différentes : $P(A \\cap B)$ se place dans l'univers entier, $P_A(B)$ se place à l'intérieur de $A$.",
      "Ici, on tire un élève au hasard dans toute la classe, et on demande qu'il vérifie les DEUX conditions à la fois.",
      "C'est donc une intersection : $P(\\text{espagnol} \\cap \\text{demi-pensionnaire})$. La phrase conditionnelle aurait contenu « parmi », « sachant que », ou « si l'on sait que ».",
      "L'écriture correcte est $P(\\text{espagnol} \\cap \\text{demi-pensionnaire})$."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "registres", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_reg_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 4,
    theme: "reunion",
    text: "Sur une plage de Saint-Gilles, on note $B$ « le baigneur porte un lycra » et $S$ « le baigneur a un coup de soleil ». Comment traduire « $30\\,\\%$ des baigneurs sans lycra ont un coup de soleil » ?",
    format: "qcm",
    choices: [
      "$P_{\\bar B}(S) = 0{,}3$",
      "$P_S(\\bar B) = 0{,}3$",
      "$P(\\bar B \\cap S) = 0{,}3$",
      "$P(\\bar B) = 0{,}3$",
    ],
    expected: ["$P_{\\bar B}(S) = 0{,}3$"],
    comparator: "mcq_exact",
    hint: "« des baigneurs sans lycra » : c'est le groupe dans lequel on compte les $30\\,\\%$.",
    explanation: exp(
      "Un pourcentage « de » quelque chose indique le groupe de référence : ce groupe devient la condition.",
      "« $30\\,\\%$ DES BAIGNEURS SANS LYCRA » : on se place parmi les baigneurs qui ne portent pas de lycra, c'est-à-dire dans $\\bar B$.",
      "Parmi eux, la proportion de coups de soleil est $0{,}3$ : cela s'écrit $P_{\\bar B}(S) = 0{,}3$.",
      "$P_{\\bar B}(S) = 0{,}3$ — l'indice porte le groupe de référence."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "registres", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_reg_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre $P(A \\cap B)$ et $P_A(B)$, avec un exemple de la vie courante.",
    format: "open",
    expected: ["univers", "parmi", "sachant", "sous-groupe", "reference", "référence", "denominateur", "dénominateur"],
    comparator: "contains_keyword",
    hint: "Dans chaque cas, sur quel groupe compte-t-on ?",
    explanation: exp(
      "Les deux nombres comptent la même chose au numérateur, mais pas sur le même groupe de référence.",
      "$P(A \\cap B)$ compte sur l'univers ENTIER : on tire au hasard dans toute la population et on demande les deux conditions.",
      "$P_A(B)$ ne compte que dans $A$ : on s'est déjà restreint. Exemple : sur $100$ élèves, $20$ font espagnol et $12$ d'entre eux sont demi-pensionnaires. Alors $P(A \\cap B) = \\dfrac{12}{100} = 0{,}12$, mais $P_A(B) = \\dfrac{12}{20} = 0{,}6$.",
      "Même numérateur, dénominateur différent : $P_A(B)$ change de monde, $P(A \\cap B)$ reste dans l'univers de départ."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "registres", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_reg_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 5,
    theme: "neutral",
    text: "Quels mots d'un énoncé signalent qu'il faut écrire une probabilité CONDITIONNELLE ?",
    format: "open",
    expected: ["parmi", "sachant", "si l'on sait", "des ", "sous-groupe"],
    comparator: "contains_keyword",
    hint: "Cherche les mots qui restreignent la population avant de poser la question.",
    explanation: exp(
      "Une probabilité conditionnelle apparaît dès que l'énoncé restreint la population AVANT de poser sa question.",
      "Les marqueurs les plus fréquents sont : « parmi », « sachant que », « si l'on sait que », « lorsqu'on a déjà », et le « des » d'un pourcentage (« $30\\,\\%$ DES fumeurs »).",
      "À l'inverse, « et », « à la fois », « les deux » signalent une intersection, calculée sur l'univers entier.",
      "« Parmi » et « sachant que » sont les deux signaux les plus sûrs : ils désignent ce qui va en indice."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "registres", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_reg_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 4,
    theme: "neutral",
    hint: "L'événement en indice est la condition : le groupe qui suit « parmi » ou « sachant que ».",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "registres", "template"],
    generate: () => pcGenRegistresQcm(false, Object.keys(PC_LEURRES)),
  },
  {
    kind: "template",
    id: "premiere_pc_reg_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 5,
    theme: "neutral",
    hint: "L'événement en indice est la condition : le groupe qui suit « parmi » ou « sachant que ».",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "registres", "open", "template"],
    generate: () => pcGenRegistresValeur(true),
  },

  /* ===================== PC_TABLEAU ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_tab_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "Dans ce tableau, quelle est la probabilité qu'un élève soit demi-pensionnaire, sachant qu'il est en seconde ?",
    format: "qcm",
    choices: [
      "$\\dfrac{45}{80}$",
      "$\\dfrac{45}{200}$",
      "$\\dfrac{45}{110}$",
      "$\\dfrac{80}{200}$",
    ],
    expected: ["$\\dfrac{45}{80}$"],
    comparator: "mcq_exact",
    hint: "« Sachant qu'il est en seconde » : quel effectif sert de dénominateur ?",
    explanation: exp(
      "Dans un tableau croisé, une probabilité conditionnelle se lit comme un quotient d'effectifs : la case, divisée par le TOTAL DE LA LIGNE (ou de la colonne) qui porte la condition.",
      "La condition est « être en seconde » : on ne regarde plus que cette ligne, dont le total est $80$.",
      "Parmi ces $80$ élèves, $45$ sont demi-pensionnaires : la probabilité vaut $\\dfrac{45}{80}$, soit environ $0{,}56$.",
      "$\\dfrac{45}{80}$ — le piège est de diviser par $200$, ce qui donnerait $P(\\text{seconde} \\cap \\text{DP})$."
    ),
    canvas: {
      kind: "tableau_donnees",
      title: "Régime des élèves par niveau",
      headers: ["", "Demi-pensionnaires", "Externes", "Total"],
      rows: [
        { label: "Seconde", values: [45, 35, 80] },
        { label: "Première", values: [65, 55, 120] },
        { label: "Total", values: [110, 90, 200] },
      ],
      highlight: { row: 0 },
    },
    tags: ["premiere", "maths", "probabilites_conditionnelles", "tableau", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tab_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 5,
    theme: "neutral",
    text: "Dans le même tableau, quelle est la probabilité qu'un élève soit en seconde, sachant qu'il est demi-pensionnaire ?",
    format: "qcm",
    choices: [
      "$\\dfrac{45}{110}$",
      "$\\dfrac{45}{80}$",
      "$\\dfrac{45}{200}$",
      "$\\dfrac{110}{200}$",
    ],
    expected: ["$\\dfrac{45}{110}$"],
    comparator: "mcq_exact",
    hint: "La condition a changé : ce n'est plus une ligne, c'est une colonne.",
    explanation: exp(
      "Le dénominateur d'une probabilité conditionnelle est toujours le total du groupe placé en condition.",
      "Ici la condition est « être demi-pensionnaire » : c'est la COLONNE, dont le total vaut $110$.",
      "Le numérateur reste la même case, $45$. On obtient $\\dfrac{45}{110} \\approx 0{,}41$, alors que la question précédente donnait $\\dfrac{45}{80} \\approx 0{,}56$.",
      "$\\dfrac{45}{110}$ — même case, autre dénominateur : $P_A(B)$ et $P_B(A)$ ne sont pas égales."
    ),
    canvas: {
      kind: "tableau_donnees",
      title: "Régime des élèves par niveau",
      headers: ["", "Demi-pensionnaires", "Externes", "Total"],
      rows: [
        { label: "Seconde", values: [45, 35, 80] },
        { label: "Première", values: [65, 55, 120] },
        { label: "Total", values: [110, 90, 200] },
      ],
      highlight: { col: 1 },
    },
    tags: ["premiere", "maths", "probabilites_conditionnelles", "tableau", "canvas", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tab_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un tableau croisé, comment sait-on quel effectif mettre au dénominateur d'une probabilité conditionnelle ?",
    format: "open",
    expected: ["condition", "total", "ligne", "colonne", "sous-groupe", "parmi"],
    comparator: "contains_keyword",
    hint: "Quel groupe l'énoncé désigne-t-il comme déjà connu ?",
    explanation: exp(
      "Une probabilité conditionnelle compte à l'intérieur d'un sous-groupe : ce sous-groupe fournit le dénominateur.",
      "On repère la condition — le « sachant que » ou le « parmi » — et on cherche son effectif TOTAL dans le tableau : c'est un total de ligne ou de colonne, jamais le total général.",
      "Le numérateur est la case qui croise les deux caractères. Par exemple $P_{\\text{seconde}}(\\text{DP})$ prend le total de la ligne « seconde » ; $P_{\\text{DP}}(\\text{seconde})$ prend le total de la colonne « DP ».",
      "Le dénominateur est toujours le total du groupe mis en condition ; le total général ne sert qu'aux probabilités simples et aux intersections."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "tableau", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tab_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève calcule $\\dfrac{45}{200}$ et annonce « la probabilité qu'un élève de seconde soit demi-pensionnaire ». Explique son erreur.",
    format: "open",
    expected: ["total general", "total général", "intersection", "denominateur", "dénominateur", "80"],
    comparator: "contains_keyword",
    hint: "Que représente vraiment le nombre qu'il a calculé ?",
    explanation: exp(
      "Le dénominateur dit sur quel groupe on compte : le changer change complètement le sens du résultat.",
      "En divisant par $200$, l'élève a compté sur l'ensemble des élèves du lycée : il a calculé $P(\\text{seconde} \\cap \\text{DP})$, la probabilité qu'un élève tiré au hasard soit à la fois en seconde et demi-pensionnaire.",
      "La question portait sur les élèves de seconde uniquement : le dénominateur devait être $80$, et non $200$. Les deux résultats diffèrent nettement : $0{,}225$ contre $0{,}56$.",
      "Il a calculé une intersection au lieu d'une conditionnelle : il fallait $\\dfrac{45}{80}$."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "tableau", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_tab_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 4,
    theme: "neutral",
    hint: "« Sachant que… » : on lit la ligne (ou la colonne) de la condition, et on divise par SON total.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "tableau", "canvas", "template"],
    generate: () => pcGenTableauQcm(true),
  },
  {
    kind: "template",
    id: "premiere_pc_tab_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 5,
    theme: "neutral",
    hint: "« Sachant que… » : on lit la ligne (ou la colonne) de la condition, et on divise par SON total.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "tableau", "canvas", "open", "template"],
    generate: () => pcGenTableauOuvert(),
  },

  /* ===================== PC_ARBRE_CONSTRUIRE (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_arbc_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 4,
    theme: "reunion",
    text: "Énoncé : « $70\\,\\%$ des élèves d'un collège de Saint-André viennent en car ; parmi eux, $80\\,\\%$ arrivent à l'heure. » Que porte la branche de second niveau « à l'heure » partant de « car » ?",
    format: "qcm",
    choices: ["$0{,}8$", "$0{,}7$", "$0{,}56$", "$0{,}2$"],
    expected: ["$0{,}8$"],
    comparator: "mcq_exact",
    hint: "Les branches de second niveau portent des probabilités CONDITIONNELLES, telles quelles.",
    explanation: exp(
      "Dans un arbre, une branche de second niveau porte une probabilité conditionnelle : celle de l'événement sachant le chemin déjà parcouru.",
      "« Parmi eux, $80\\,\\%$ arrivent à l'heure » se lit $P_{\\text{car}}(\\text{à l'heure}) = 0{,}8$ : c'est exactement ce que porte la branche.",
      "Le $0{,}56$ est le produit $0{,}7 \\times 0{,}8$ : c'est la probabilité du CHEMIN complet, écrite à son extrémité, pas sur la branche.",
      "La branche porte $0{,}8$."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "arbre_construire", "reunion", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arbc_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment on décide quel événement placer au PREMIER niveau d'un arbre pondéré.",
    format: "open",
    expected: ["conditionnelle", "sachant", "parmi", "donnee", "donnée", "premier"],
    comparator: "contains_keyword",
    hint: "Regarde quelles probabilités l'énoncé donne « toutes seules », sans condition.",
    explanation: exp(
      "Un arbre se construit dans l'ordre où l'information est donnée : au premier niveau, les événements dont on connaît la probabilité SANS condition.",
      "On repère dans l'énoncé les probabilités conditionnelles : leur condition doit déjà avoir été franchie quand on les rencontre.",
      "Si l'énoncé dit « $70\\,\\%$ viennent en car, et parmi eux $80\\,\\%$ sont à l'heure », alors « car » est au premier niveau et « à l'heure » au second — l'inverse obligerait à calculer avant de construire.",
      "Au premier niveau : l'événement qui sert de CONDITION aux autres ; au second : ceux qui s'écrivent avec « parmi » ou « sachant que »."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "arbre_construire", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arbc_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 5,
    theme: "neutral",
    text: "Comment vérifier qu'un arbre pondéré est correctement rempli, avant de s'en servir ?",
    format: "open",
    expected: ["somme", "1", "noeud", "nœud", "vaut 1", "chemins"],
    comparator: "contains_keyword",
    hint: "Deux contrôles : un sur chaque nœud, un sur l'ensemble des chemins.",
    explanation: exp(
      "Un arbre correct obéit à deux règles de somme, faciles à vérifier d'un coup d'œil.",
      "Premier contrôle : à chaque nœud, les branches qui en partent forment une partition, donc leurs probabilités s'additionnent à $1$.",
      "Second contrôle : la somme des probabilités de TOUS les chemins complets vaut également $1$, puisqu'ils décrivent tous les cas possibles.",
      "Si l'une des deux sommes ne tombe pas sur $1$, il y a une erreur — le plus souvent une conditionnelle confondue avec une probabilité simple."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "arbre_construire", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_arbc_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 4,
    theme: "neutral",
    hint: "Premier niveau : $P(A)$ ; second niveau : des probabilités SACHANT la branche d'où l'on part ; somme $1$ à chaque nœud.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "arbre_construire", "template"],
    generate: () => pcGenArbreBranche(4),
  },
  {
    kind: "template",
    id: "premiere_pc_arbc_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 5,
    theme: "neutral",
    hint: "Premier niveau : $P(A)$ ; second niveau : des probabilités SACHANT la branche d'où l'on part ; somme $1$ à chaque nœud.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "arbre_construire", "open", "template"],
    generate: () => pcGenArbreBranche(5),
  },

  /* ===================== PC_PARTITION (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_part_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_partition",
    difficulty: 4,
    theme: "neutral",
    text: "Quelles conditions définissent une partition de l'univers ?",
    format: "qcm",
    choices: [
      "les événements sont deux à deux incompatibles et leur réunion est l'univers",
      "les événements ont tous la même probabilité",
      "les événements sont indépendants deux à deux",
      "il y en a exactement deux",
    ],
    expected: ["les événements sont deux à deux incompatibles et leur réunion est l'univers"],
    comparator: "mcq_exact",
    hint: "Deux exigences : ne pas se chevaucher, et ne rien oublier.",
    explanation: exp(
      "Partitionner l'univers, c'est le découper en morceaux qui ne se chevauchent pas et qui, mis bout à bout, le recouvrent entièrement.",
      "Première condition : les événements sont deux à deux incompatibles — aucune issue ne peut appartenir à deux d'entre eux.",
      "Seconde condition : leur réunion est l'univers tout entier — aucune issue n'est oubliée. Les probabilités, elles, n'ont aucune raison d'être égales.",
      "Incompatibles deux à deux, et de réunion l'univers : ni chevauchement, ni oubli."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "partition", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_part_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_partition",
    difficulty: 5,
    theme: "neutral",
    text: "On lance un dé. Les événements « obtenir un nombre pair » et « obtenir un multiple de $3$ » forment-ils une partition ?",
    format: "qcm",
    choices: [
      "non : le $6$ appartient aux deux, et le $1$ à aucun",
      "oui : tout nombre est pair ou multiple de $3$",
      "non : ils n'ont pas la même probabilité",
      "oui : ils sont incompatibles",
    ],
    expected: ["non : le $6$ appartient aux deux, et le $1$ à aucun"],
    comparator: "mcq_exact",
    hint: "Regarde où tombe le $6$, puis où tombe le $1$.",
    explanation: exp(
      "Pour réfuter une partition, il suffit d'exhiber une issue qui appartient à deux événements, ou une issue qui n'appartient à aucun.",
      "Le $6$ est pair ET multiple de $3$ : les deux événements se chevauchent, ils ne sont pas incompatibles.",
      "Le $1$ n'est ni pair ni multiple de $3$ : leur réunion ne couvre pas l'univers. Les deux conditions échouent.",
      "Non : il y a à la fois chevauchement et oubli."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "partition", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_part_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_partition",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi la formule des probabilités totales exige-t-elle une partition de l'univers ?",
    format: "open",
    expected: ["compte deux fois", "oublie", "chevauche", "recouvre", "incompatibles", "reunion"],
    comparator: "contains_keyword",
    hint: "Que se passerait-il si deux morceaux se chevauchaient ? S'il en manquait un ?",
    explanation: exp(
      "La formule des probabilités totales découpe $B$ en morceaux selon les cas de la partition, puis additionne leurs probabilités.",
      "Si deux cas se chevauchaient, les issues communes seraient comptées DEUX FOIS : la somme dépasserait la vraie probabilité.",
      "Si les cas ne recouvraient pas tout l'univers, une partie de $B$ ne serait comptée nulle part : la somme serait trop petite.",
      "Il faut donc les deux conditions à la fois : ni double compte, ni oubli — c'est exactement la définition d'une partition."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "partition", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_part_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_partition",
    difficulty: 4,
    theme: "neutral",
    text: "Donne un exemple de partition de l'univers en trois événements, dans une situation de ton choix.",
    format: "open",
    expected: ["incompatibles", "reunion", "réunion", "univers", "tous les cas", "chacun"],
    comparator: "contains_keyword",
    hint: "Choisis un caractère qui range chaque individu dans une case et une seule.",
    explanation: exp(
      "Une partition découpe l'univers en cas qui ne se chevauchent pas et n'oublient personne.",
      "Il suffit de choisir un caractère qui classe chaque issue dans une case et une seule.",
      "Exemples : pour un lycée, « seconde », « première », « terminale » ; pour un dé, « moins de $3$ », « $3$ ou $4$ », « plus de $4$ » ; pour un trajet, « à pied », « en car », « autrement ».",
      "Le test : chaque individu tombe dans exactement une case — ni deux, ni zéro."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "partition", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_part_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_partition",
    difficulty: 4,
    theme: "neutral",
    hint: "Partition : aucune issue commune, aucune issue oubliée ; les probabilités ont une somme égale à $1$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "partition", "template"],
    generate: () => pcGenPartitionDe(false),
  },
  {
    kind: "template",
    id: "premiere_pc_part_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_partition",
    difficulty: 5,
    theme: "neutral",
    hint: "Partition : aucune issue commune, aucune issue oubliée ; les probabilités ont une somme égale à $1$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "partition", "open", "template"],
    generate: () => pcGenPartitionDe(true),
  },

  /* ===================== PC_INVERSER (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_inv_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_inverser",
    difficulty: 5,
    theme: "neutral",
    text: "Un test de dépistage détecte $99\\,\\%$ des malades. Dans une population où $1$ personne sur $1000$ est malade, un test positif signifie-t-il qu'on a $99\\,\\%$ de chances d'être malade ?",
    format: "qcm",
    choices: [
      "non : $P_{\\text{malade}}(+)$ et $P_{+}(\\text{malade})$ sont deux choses différentes",
      "oui : c'est la même probabilité",
      "oui, si le test est fiable",
      "non : la probabilité est alors de $1\\,\\%$",
    ],
    expected: ["non : $P_{\\text{malade}}(+)$ et $P_{+}(\\text{malade})$ sont deux choses différentes"],
    comparator: "mcq_exact",
    hint: "Le $99\\,\\%$ se compte parmi les malades. La question se compte parmi les tests positifs.",
    explanation: exp(
      "Inverser la condition change complètement le groupe de référence : $P_A(B)$ et $P_B(A)$ n'ont aucune raison d'être égales.",
      "Le $99\\,\\%$ annoncé est $P_{\\text{malade}}(+)$ : on se place PARMI LES MALADES.",
      "La question demande $P_{+}(\\text{malade})$ : on se place parmi les tests positifs, un groupe bien plus large, car il contient aussi les faux positifs — nombreux quand la maladie est rare. Sur $1000$ personnes avec $5\\,\\%$ de faux positifs, on aurait environ $1$ vrai positif pour $50$ faux.",
      "Non : c'est le paradoxe des faux positifs, l'erreur la plus répandue en probabilités."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "inverser", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_inv_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_inverser",
    difficulty: 4,
    theme: "neutral",
    text: "Dans quel cas particulier a-t-on $P_A(B) = P_B(A)$ ?",
    format: "qcm",
    choices: [
      "lorsque $P(A) = P(B)$",
      "toujours",
      "jamais",
      "lorsque $A$ et $B$ sont incompatibles",
    ],
    expected: ["lorsque $P(A) = P(B)$"],
    comparator: "mcq_exact",
    hint: "Écris les deux quotients : ils ont le même numérateur.",
    explanation: exp(
      "Les deux conditionnelles s'écrivent avec la même intersection au numérateur : $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ et $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
      "Elles ne diffèrent donc que par leur dénominateur.",
      "Elles sont égales exactement quand les deux dénominateurs le sont, c'est-à-dire quand $P(A) = P(B)$ — à condition que l'intersection ne soit pas nulle.",
      "Lorsque $P(A) = P(B)$ : c'est un cas particulier, pas une règle générale."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "inverser", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_inv_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_inverser",
    difficulty: 5,
    theme: "neutral",
    text: "Explique, avec tes mots, pourquoi « la plupart des accidents ont lieu près du domicile » ne veut PAS dire « rouler près de chez soi est dangereux ».",
    format: "open",
    expected: ["inverse", "condition", "plus souvent", "temps", "trajets", "denominateur", "dénominateur"],
    comparator: "contains_keyword",
    hint: "Compare « parmi les accidents » et « parmi les trajets ».",
    explanation: exp(
      "La phrase compare deux probabilités conditionnelles qui n'ont pas le même groupe de référence.",
      "L'affirmation vraie est $P_{\\text{accident}}(\\text{près de chez soi})$ : parmi les accidents, beaucoup ont lieu près du domicile.",
      "La conclusion tirée serait $P_{\\text{près de chez soi}}(\\text{accident})$ : parmi les trajets près de chez soi, la proportion d'accidents. Or on fait énormément plus de trajets près de chez soi qu'ailleurs : le dénominateur est immense, la proportion reste faible.",
      "On a inversé la condition : le groupe de référence n'est pas le même, la conclusion ne suit pas."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "inverser", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_inv_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_inverser",
    difficulty: 5,
    theme: "neutral",
    text: "Comment calcule-t-on $P_B(A)$ quand l'énoncé ne donne que $P(A)$, $P_A(B)$ et $P_{\\bar A}(B)$ ?",
    format: "open",
    expected: ["probabilites totales", "probabilités totales", "intersection", "denominateur", "dénominateur", "P(B)"],
    comparator: "contains_keyword",
    hint: "Il te manque le dénominateur : comment l'obtenir ?",
    explanation: exp(
      "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$ : il faut donc le numérateur et le dénominateur, qu'aucun n'est donné directement.",
      "Le numérateur s'obtient par la règle du produit : $P(A \\cap B) = P(A) \\times P_A(B)$ — c'est le premier chemin de l'arbre.",
      "Le dénominateur s'obtient par la formule des probabilités totales : $P(B) = P(A) \\times P_A(B) + P(\\bar A) \\times P_{\\bar A}(B)$, c'est-à-dire la somme des deux chemins menant à $B$.",
      "On divise ensuite l'un par l'autre : c'est exactement le calcul qui redresse l'illusion des faux positifs."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "inverser", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_inv_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_inverser",
    difficulty: 5,
    theme: "neutral",
    hint: "$P_A(B)$ et $P_B(A)$ ont le même numérateur $P(A \cap B)$, mais pas le même dénominateur.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "inverser", "template"],
    generate: () => pcGenInverserQcm(),
  },
  {
    kind: "template",
    id: "premiere_pc_inv_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_inverser",
    difficulty: 5,
    theme: "neutral",
    hint: "$P_A(B)$ et $P_B(A)$ ont le même numérateur $P(A \cap B)$, mais pas le même dénominateur.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "inverser", "open", "template"],
    generate: () => pcGenInverserOuvert(),
  },

  /* ===================== PC_INDEPENDANCE_INCOMPATIBLE (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_indinc_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance_incompatible",
    difficulty: 4,
    theme: "neutral",
    text: "Que signifie « $A$ et $B$ sont INCOMPATIBLES » ?",
    format: "qcm",
    choices: [
      "$A \\cap B = \\varnothing$ : ils ne peuvent pas se produire ensemble",
      "$P(A \\cap B) = P(A) \\times P(B)$",
      "la réalisation de l'un ne change pas la probabilité de l'autre",
      "$P(A) + P(B) = 1$",
    ],
    expected: ["$A \\cap B = \\varnothing$ : ils ne peuvent pas se produire ensemble"],
    comparator: "mcq_exact",
    hint: "Le mot parle de ce qui peut arriver EN MÊME TEMPS.",
    explanation: exp(
      "Deux événements incompatibles ne peuvent pas se réaliser simultanément : leur intersection est vide.",
      "C'est une propriété d'ENSEMBLES : elle se lit sur un diagramme, les deux parties ne se touchent pas.",
      "L'indépendance est tout autre chose : c'est une propriété de PROBABILITÉS, $P(A \\cap B) = P(A) \\times P(B)$, qui dit que savoir l'un ne renseigne pas sur l'autre.",
      "Incompatibles : $A \\cap B = \\varnothing$ — les deux mots n'ont rien à voir."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "independance_incompatible", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_indinc_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance_incompatible",
    difficulty: 5,
    theme: "neutral",
    text: "$A$ et $B$ sont incompatibles, avec $P(A) = 0{,}3$ et $P(B) = 0{,}5$. Combien vaut $P_A(B)$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Si $A$ est réalisé, $B$ peut-il l'être aussi ?",
    explanation: exp(
      "$P_A(B)$ mesure la probabilité de $B$ une fois qu'on sait $A$ réalisé.",
      "Or $A$ et $B$ sont incompatibles : si $A$ est réalisé, $B$ est impossible.",
      "Donc $P_A(B) = 0$. Le calcul le confirme : $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)} = \\dfrac{0}{0{,}3} = 0$. Et comme $P(B) = 0{,}5 \\neq 0$, on voit que savoir $A$ change tout : les événements ne sont PAS indépendants.",
      "$P_A(B) = 0$ — deux événements incompatibles de probabilités non nulles sont toujours dépendants."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "independance_incompatible", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_indinc_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance_incompatible",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi « incompatibles » et « indépendants » sont presque des contraires, alors qu'on les confond souvent.",
    format: "open",
    expected: ["intersection vide", "renseigne", "informe", "produit", "contraire", "exclut"],
    comparator: "contains_keyword",
    hint: "Si $A$ est réalisé, que sais-tu de $B$ dans chaque cas ?",
    explanation: exp(
      "Indépendants signifie : savoir que $A$ s'est produit n'apprend RIEN sur $B$, la probabilité de $B$ ne change pas.",
      "Incompatibles signifie : savoir que $A$ s'est produit apprend TOUT sur $B$ — il est devenu impossible.",
      "Le second cas est donc le comble de la dépendance. Deux événements incompatibles de probabilités non nulles ne peuvent jamais être indépendants : $P(A \\cap B) = 0$ alors que $P(A) \\times P(B) \\neq 0$.",
      "La confusion vient du vocabulaire courant, où « indépendant » évoque « séparé » : en probabilités, c'est presque l'inverse."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "independance_incompatible", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_indinc_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance_incompatible",
    difficulty: 5,
    theme: "neutral",
    text: "Donne un exemple de deux événements incompatibles, et un exemple de deux événements indépendants, avec un même dé ou deux dés.",
    format: "open",
    expected: ["deux des", "deux dés", "meme lancer", "même lancer", "pair", "impair", "intersection vide"],
    comparator: "contains_keyword",
    hint: "L'incompatibilité se joue dans un seul lancer ; l'indépendance demande souvent deux lancers.",
    explanation: exp(
      "Incompatibles : les deux ne peuvent pas se produire ensemble. Indépendants : l'un ne renseigne pas sur l'autre.",
      "Sur UN SEUL lancer, « obtenir un nombre pair » et « obtenir $3$ » sont incompatibles : leur intersection est vide.",
      "Sur DEUX lancers, « le premier dé donne $6$ » et « le second dé donne $6$ » sont indépendants : le premier résultat n'influence pas le second, et $P(A \\cap B) = \\dfrac{1}{36} = \\dfrac{1}{6} \\times \\dfrac{1}{6}$.",
      "Les deux notions ne parlent même pas de la même chose : l'une des issues possibles, l'autre de l'information apportée."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "independance_incompatible", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_indinc_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance_incompatible",
    difficulty: 4,
    theme: "neutral",
    hint: "Incompatibles : $P(A \cap B) = 0$ ; indépendants : $P(A \cap B) = P(A) \times P(B)$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "independance_incompatible", "template"],
    generate: () => pcGenIndIncClasser(),
  },
  {
    kind: "template",
    id: "premiere_pc_indinc_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance_incompatible",
    difficulty: 5,
    theme: "neutral",
    hint: "Incompatibles : $P(A \cap B) = 0$ ; indépendants : $P(A \cap B) = P(A) \times P(B)$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "independance_incompatible", "open", "template"],
    generate: () => pcGenIndIncConditionnelle(true),
  },

  /* ===================== PC_SUCCESSION (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_suc_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 3,
    theme: "neutral",
    text: "Lors d'une succession de deux épreuves INDÉPENDANTES, la probabilité d'un chemin de l'arbre s'obtient en :",
    format: "qcm",
    choices: [
      "multipliant les probabilités des deux branches",
      "additionnant les probabilités des deux branches",
      "prenant la plus grande des deux",
      "divisant la première par la seconde",
    ],
    expected: ["multipliant les probabilités des deux branches"],
    comparator: "mcq_exact",
    hint: "C'est la même règle que pour tout arbre pondéré.",
    explanation: exp(
      "Dans tout arbre pondéré, la probabilité d'un chemin est le produit des probabilités rencontrées le long de ce chemin.",
      "Quand les épreuves sont indépendantes, les branches du second niveau portent les probabilités SIMPLES de la seconde épreuve : elles ne dépendent pas de ce qui précède.",
      "L'arbre est alors particulièrement simple à remplir — toutes les sous-branches d'un même rang portent les mêmes nombres.",
      "On multiplie le long du chemin ; on n'additionne que pour réunir plusieurs chemins."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "succession", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_suc_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 5,
    theme: "neutral",
    text: "Un sac contient $3$ boules rouges et $2$ vertes. On tire deux boules SANS remise. Quelle est la probabilité d'obtenir deux rouges ?",
    format: "qcm",
    choices: [
      "$\\dfrac{3}{5} \\times \\dfrac{2}{4} = \\dfrac{3}{10}$",
      "$\\dfrac{3}{5} \\times \\dfrac{3}{5} = \\dfrac{9}{25}$",
      "$\\dfrac{3}{5} + \\dfrac{2}{4}$",
      "$\\dfrac{2}{5} \\times \\dfrac{1}{4}$",
    ],
    expected: ["$\\dfrac{3}{5} \\times \\dfrac{2}{4} = \\dfrac{3}{10}$"],
    comparator: "mcq_exact",
    hint: "Après le premier tirage, combien reste-t-il de boules, et de rouges ?",
    explanation: exp(
      "Sans remise, la composition du sac change entre les deux tirages : les épreuves ne sont PAS indépendantes.",
      "Premier tirage : $\\dfrac{3}{5}$ de chances d'obtenir une rouge. Le sac contient alors $4$ boules, dont $2$ rouges.",
      "La branche de second niveau porte donc la conditionnelle $\\dfrac{2}{4}$, et non $\\dfrac{3}{5}$. Le produit vaut $\\dfrac{3}{5} \\times \\dfrac{2}{4} = \\dfrac{3}{10}$.",
      "$\\dfrac{3}{10}$ — avec remise, on aurait trouvé $\\dfrac{9}{25}$ : c'est là toute la différence."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "succession", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_suc_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi un tirage AVEC remise donne des épreuves indépendantes, mais pas un tirage sans remise.",
    format: "open",
    expected: ["composition", "identique", "change", "remet", "meme sac", "même sac"],
    comparator: "contains_keyword",
    hint: "Dans quel état se trouve le sac au moment du second tirage, dans chaque cas ?",
    explanation: exp(
      "Deux épreuves sont indépendantes quand le résultat de la première ne change pas les probabilités de la seconde.",
      "Avec remise, on remet la boule : le sac retrouve exactement sa composition de départ. La seconde épreuve se déroule dans les mêmes conditions, quel que soit le premier résultat.",
      "Sans remise, il manque une boule — et pas n'importe laquelle : celle qu'on vient de tirer. Les proportions changent, et elles changent différemment selon ce qu'on a tiré.",
      "C'est la composition du sac au second tirage qui décide : identique → indépendance, modifiée → dépendance."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "succession", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_suc_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 5,
    theme: "neutral",
    text: "Un joueur a obtenu cinq fois « pile » de suite. Il affirme que « face » a maintenant plus de chances de sortir. Explique pourquoi il se trompe.",
    format: "open",
    expected: ["independant", "indépendant", "memoire", "mémoire", "toujours", "1/2", "0,5"],
    comparator: "contains_keyword",
    hint: "La pièce se souvient-elle des lancers précédents ?",
    explanation: exp(
      "Les lancers successifs d'une pièce sont des épreuves indépendantes : chaque lancer ignore complètement les précédents.",
      "La probabilité de « face » reste donc $\\dfrac{1}{2}$ au sixième lancer, exactement comme au premier.",
      "Ce qui est rare, c'est la SUITE de cinq piles vue d'avance ($\\dfrac{1}{32}$). Mais une fois qu'elle est réalisée, elle n'influence rien : la pièce n'a pas de mémoire.",
      "C'est l'erreur du joueur : confondre « une longue série est improbable au départ » et « elle doit se corriger ensuite »."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "succession", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_suc_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 4,
    theme: "neutral",
    hint: "Épreuves indépendantes : on multiplie les probabilités le long du chemin.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "succession", "template"],
    generate: () => pcGenSuccession(4, "qcm"),
  },
  {
    kind: "template",
    id: "premiere_pc_suc_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 5,
    theme: "neutral",
    hint: "Épreuves indépendantes : on multiplie les probabilités le long du chemin.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "succession", "open", "template"],
    generate: () => pcGenSuccession(5, "open"),
  },

  /* =========================================================
     QUESTIONS OUVERTES — compléments du 02/08/2026.
     Quatre micro-compétences écrites avant le découpage n'avaient aucune
     question ouverte : deux ouvertes fixes + un TEMPLATE ouvert chacune.
  ========================================================= */

  {
    kind: "fixed",
    id: "premiere_pc_cond_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi divise-t-on par $P(A)$ dans la formule $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ ?",
    format: "open",
    expected: ["nouvel univers", "univers", "reduit", "réduit", "ramene a 1", "ramène à 1", "reference"],
    comparator: "contains_keyword",
    hint: "Dans quel ensemble se place-t-on une fois qu'on sait $A$ réalisé ?",
    explanation: exp(
      "Savoir que $A$ est réalisé change le monde dans lequel on compte : les issues hors de $A$ n'existent plus.",
      "$A$ devient le nouvel univers. Or un univers doit avoir une probabilité totale égale à $1$, et $A$ ne pèse que $P(A)$.",
      "On divise donc tout par $P(A)$ pour « remettre à l'échelle » : c'est exactement ce que fait la formule. Le numérateur $P(A \\cap B)$ compte la part de $B$ qui survit dans ce nouvel univers.",
      "La division ramène le sous-groupe à un univers complet — d'où l'exigence $P(A) \\neq 0$ : on ne peut pas se placer dans un événement impossible."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "conditionnelle", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 5,
    theme: "neutral",
    text: "Peut-on avoir $P_A(B)$ plus grand que $P(B)$ ? Explique ce que cela signifie.",
    format: "open",
    expected: ["favorise", "augmente", "information", "plus probable", "lien", "oui"],
    comparator: "contains_keyword",
    hint: "Que dit-on quand savoir $A$ rend $B$ plus probable ?",
    explanation: exp(
      "$P(B)$ est la probabilité de $B$ dans la population entière ; $P_A(B)$ la même probabilité, mais restreinte aux individus de $A$.",
      "Rien n'oblige les deux à être égales : si $B$ est plus fréquent parmi les $A$ que dans l'ensemble, alors $P_A(B) > P(B)$.",
      "Cela signifie que savoir $A$ réalisé rend $B$ PLUS probable : les deux événements ne sont pas indépendants, $A$ « favorise » $B$. Exemple : parmi les élèves qui révisent, la proportion de bonnes notes dépasse celle de la classe entière.",
      "Oui, c'est courant — et l'égalité $P_A(B) = P(B)$ est justement le cas particulier de l'indépendance."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "conditionnelle", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_cond_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 5,
    theme: "neutral",
    hint: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ — puis compare le résultat à $P(B)$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "conditionnelle", "open", "template"],
    // ★5 ouverte — une situation tirée : calculer P_A(B), la comparer à P(B), interpréter.
    // Un tirage sur quatre est construit INDÉPENDANT (nAB × N = nA × nB).
    generate: () => {
      const c = pickOne(PC_CTX);
      const { a, b } = pcLettres(c);
      const indep = Math.random() < 0.25;
      const e = pcTirer(
        (x) =>
          [x.nA, x.nB, x.nAB].every((n) => pcJuste(n, x.N, 3)) &&
          pcJuste(x.nAB, x.nA) &&
          (indep ? x.nAB * x.N === x.nA * x.nB : Math.abs(x.nAB * x.N - x.nA * x.nB) >= 0.03 * x.N * x.N),
        [100, 200, 400, 500, 1000],
      );
      const r = pcDec(e.nAB, e.nA);
      const cmp = e.nAB * e.N - e.nA * e.nB; // signe de P_A(B) − P(B)
      const lien = cmp === 0 ? "n'influence pas" : cmp > 0 ? "favorise" : "défavorise";
      const pct = Math.random() < 0.5;
      const donnees = pct
        ? `${c.verbe} des ${c.pop} : $${pcPctM(e.nA, e.N)}$ d'entre ${c.eux} ${c.A.p}, $${pcPctM(e.nB, e.N)}$ ${c.B.p}, et $${pcPctM(e.nAB, e.N)}$ ${c.A.p} et ${c.B.p}. ${pcDef(c)}`
        : `On choisit ${c.un} au hasard. ${pcDef(c)} On donne $P(${a}) = ${pcM(e.nA, e.N)}$, $P(${b}) = ${pcM(e.nB, e.N)}$ et $P(${a} \\cap ${b}) = ${pcM(e.nAB, e.N)}$.`;
      const question = pickOne([
        `Calcule $P_{${a}}(${b})$, puis compare-la à $P(${b})$ et interprète.`,
        `Savoir que ${c.le} ${c.A.s} rend-il l'événement $${b}$ plus probable, moins probable, ou rien ne change ? Justifie par un calcul.`,
        `Calcule la probabilité de l'événement « ${c.le} ${c.B.s} » sachant que ${c.le} ${c.A.s}, et dis ce que ce résultat apprend en le comparant à $P(${b})$.`,
      ]);
      return {
        text: `${donnees} ${question}`,
        format: "open",
        expected: [r, "divise", lien.split(" ")[0], "compare", "independant"],
        comparator: "contains_keyword",
        explanation: exp(
          "Une probabilité conditionnelle se calcule en divisant l'intersection par la probabilité de la condition, puis s'interprète en la comparant à la probabilité simple.",
          `$P_{${a}}(${b}) = \\dfrac{P(${a} \\cap ${b})}{P(${a})} = \\dfrac{${pcM(e.nAB, e.N)}}{${pcM(e.nA, e.N)}} = ${pcM(e.nAB, e.nA)}$.`,
          `On compare à $P(${b}) = ${pcM(e.nB, e.N)}$ : la valeur conditionnelle est ${lien === "n'influence pas" ? "ÉGALE" : lien === "favorise" ? "PLUS GRANDE" : "PLUS PETITE"}.`,
          lien === "n'influence pas"
            ? `Savoir que ${c.le} ${c.A.s} ne change rien à la probabilité de $${b}$ : les deux événements sont indépendants.`
            : `Savoir que ${c.le} ${c.A.s} ${lien} l'événement « ${c.B.s} » : les deux événements ne sont pas indépendants.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_pc_arb_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un arbre pondéré, pourquoi multiplie-t-on le long d'un chemin, mais additionne-t-on entre plusieurs chemins ?",
    format: "open",
    expected: ["et", "ou", "successivement", "plusieurs chemins", "intersection", "reunion", "réunion"],
    comparator: "contains_keyword",
    hint: "Un chemin traduit un « et » ; plusieurs chemins traduisent un « ou ».",
    explanation: exp(
      "Un arbre traduit deux opérations logiques différentes, et chacune a son opération arithmétique.",
      "Suivre UN chemin, c'est réaliser une étape PUIS une autre : c'est un « et », donc une intersection. La règle du produit donne $P(A \\cap B) = P(A) \\times P_A(B)$.",
      "Emprunter plusieurs chemins pour atteindre un même événement, c'est réaliser l'un OU l'autre : ces chemins sont incompatibles — on ne peut pas passer par deux branches à la fois — donc leurs probabilités s'additionnent.",
      "Le long du chemin on multiplie (« et »), entre les chemins on additionne (« ou ») : c'est exactement la formule des probabilités totales."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "arbre", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 5,
    theme: "neutral",
    text: "Quels contrôles permettent de vérifier qu'un arbre pondéré est correct avant de s'en servir ?",
    format: "open",
    expected: ["somme", "1", "noeud", "nœud", "chemins", "verifie"],
    comparator: "contains_keyword",
    hint: "Deux sommes doivent valoir $1$ : lesquelles ?",
    explanation: exp(
      "Un arbre correct obéit à deux règles de somme, vérifiables d'un coup d'œil avant tout calcul.",
      "Premier contrôle, à chaque nœud : les branches qui en partent décrivent tous les cas possibles à cette étape, leurs probabilités totalisent donc $1$.",
      "Second contrôle, à la fin : la somme des probabilités de TOUS les chemins complets vaut également $1$, puisqu'ils épuisent les possibilités.",
      "Si l'une des deux sommes ne tombe pas sur $1$, il y a une erreur — le plus souvent une probabilité simple placée là où il fallait une conditionnelle."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "arbre", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_arb_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 5,
    theme: "neutral",
    hint: "On multiplie le long d'un chemin ; on additionne les chemins.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "arbre", "open", "template"],
    generate: () => pcGenArbreACompleter(true),
  },

  {
    kind: "fixed",
    id: "premiere_pc_tot_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 5,
    theme: "neutral",
    text: "Explique l'idée de la formule des probabilités totales, avec tes mots.",
    format: "open",
    expected: ["decoupe", "découpe", "cas", "morceaux", "additionne", "chemins"],
    comparator: "contains_keyword",
    hint: "On découpe un événement en morceaux : selon quoi ?",
    explanation: exp(
      "La formule des probabilités totales sert quand on ne sait pas calculer $P(B)$ directement, mais qu'on sait la calculer dans chaque cas de figure.",
      "On découpe l'univers en cas qui ne se chevauchent pas et n'oublient rien : une partition, souvent $\\{A ; \\bar A\\}$.",
      "L'événement $B$ se découpe alors en morceaux correspondants : $B \\cap A$ et $B \\cap \\bar A$. Comme ces morceaux sont incompatibles, leurs probabilités s'additionnent.",
      "$P(B) = P(A) \\times P_A(B) + P(\\bar A) \\times P_{\\bar A}(B)$ : sur l'arbre, c'est la somme de tous les chemins qui aboutissent à $B$."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "totales", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève écrit $P(B) = P_A(B) + P_{\\bar A}(B)$. Explique pourquoi c'est faux.",
    format: "open",
    expected: ["pondere", "pondéré", "poids", "P(A)", "multiplie", "depasser 1", "dépasser 1"],
    comparator: "contains_keyword",
    hint: "Que se passerait-il si les deux conditionnelles valaient $0{,}8$ ?",
    explanation: exp(
      "Les probabilités conditionnelles se calculent dans des sous-groupes de tailles différentes : on ne peut pas les additionner telles quelles.",
      "Il faut PONDÉRER chacune par la taille de son groupe, c'est-à-dire par $P(A)$ et $P(\\bar A)$.",
      "Sans ces poids, le résultat peut dépasser $1$ : si $P_A(B) = P_{\\bar A}(B) = 0{,}8$, sa somme vaudrait $1{,}6$, ce qui est impossible. Avec les poids, on retrouverait $0{,}8$, ce qui est cohérent.",
      "La formule correcte est $P(B) = P(A)P_A(B) + P(\\bar A)P_{\\bar A}(B)$ : c'est une moyenne pondérée, pas une somme."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "totales", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_tot_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 5,
    theme: "neutral",
    hint: "$P(B) = P(A) P_A(B) + P(\bar A) P_{\bar A}(B)$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "totales", "open", "template"],
    generate: () => pcGenTotales("open"),
  },

  {
    kind: "fixed",
    id: "premiere_pc_ind_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 5,
    theme: "neutral",
    text: "Que signifie concrètement « $A$ et $B$ sont indépendants » ? Explique sans formule.",
    format: "open",
    expected: ["n'apprend rien", "ne change pas", "information", "savoir", "meme probabilite", "même probabilité"],
    comparator: "contains_keyword",
    hint: "Que se passe-t-il pour la probabilité de $B$ quand on apprend que $A$ est réalisé ?",
    explanation: exp(
      "L'indépendance est une question d'INFORMATION : apprendre quelque chose modifie-t-il ce qu'on attend de l'autre ?",
      "Deux événements sont indépendants quand savoir que $A$ s'est produit n'apprend rien sur $B$ : sa probabilité reste la même.",
      "Cela s'écrit $P_A(B) = P(B)$, ou de façon équivalente $P(A \\cap B) = P(A) \\times P(B)$. Deux lancers de dé successifs sont indépendants : le premier résultat ne renseigne pas sur le second.",
      "À l'inverse, « être demi-pensionnaire » et « habiter loin » ne le sont probablement pas : connaître l'un change ce qu'on attend de l'autre."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "independance", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 5,
    theme: "neutral",
    text: "Comment démontre-t-on que deux événements sont indépendants, et pourquoi l'intuition ne suffit-elle pas ?",
    format: "open",
    expected: ["calcul", "produit", "P(A) x P(B)", "verifie", "vérifie", "intersection"],
    comparator: "contains_keyword",
    hint: "Quelle égalité doit-on vérifier avec des nombres ?",
    explanation: exp(
      "L'indépendance a une définition chiffrée : $P(A \\cap B) = P(A) \\times P(B)$. Ce n'est pas une impression, c'est une égalité à vérifier.",
      "On calcule donc séparément l'intersection d'un côté, le produit des deux probabilités de l'autre, puis on compare.",
      "L'intuition trompe souvent : deux tirages « qui n'ont rien à voir » peuvent être liés par une cause commune, et deux événements qui semblent liés peuvent être numériquement indépendants. Seul le calcul tranche.",
      "On compare $P(A \\cap B)$ et $P(A) \\times P(B)$ : égalité → indépendants, sinon non. Et attention, incompatibles ne veut pas dire indépendants — c'est même le contraire."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "independance", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_ind_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 5,
    theme: "neutral",
    hint: "Indépendants : $P(A \cap B) = P(A) \times P(B)$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "independance", "open", "template"],
    generate: () => pcGenIndependanceOuvert(),
  },

  /* ===== 15/10/2026 — gabarits ajoutés pour la robustesse (situation × tournure) ===== */
  {
    kind: "template",
    id: "premiere_pc_tab_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 4,
    theme: "neutral",
    hint: "« Sachant que… » : on lit la ligne (ou la colonne) de la condition, et on divise par SON total.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenTableauCourt(true),
  },
  {
    kind: "template",
    id: "premiere_pc_tab_tpl_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 5,
    theme: "neutral",
    hint: "« Sachant que… » : on lit la ligne (ou la colonne) de la condition, et on divise par SON total.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenTableauCourt(false),
  },
  {
    kind: "template",
    id: "premiere_pc_tab_tpl_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 5,
    theme: "neutral",
    hint: "« Sachant que… » : on lit la ligne (ou la colonne) de la condition, et on divise par SON total.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenTableauQcm(false),
  },
  {
    kind: "template",
    id: "premiere_pc_inv_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_inverser",
    difficulty: 4,
    theme: "neutral",
    hint: "$P_A(B)$ et $P_B(A)$ ont le même numérateur $P(A \cap B)$, mais pas le même dénominateur.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenInverserTraduire(),
  },
  {
    kind: "template",
    id: "premiere_pc_inv_tpl_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_inverser",
    difficulty: 5,
    theme: "neutral",
    hint: "$P_A(B)$ et $P_B(A)$ ont le même numérateur $P(A \cap B)$, mais pas le même dénominateur.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenInverserBayes(),
  },
  {
    kind: "template",
    id: "premiere_pc_reg_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 3,
    theme: "neutral",
    hint: "L'événement en indice est la condition : le groupe qui suit « parmi » ou « sachant que ».",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenRegistresQcm(true, Object.keys(PC_LEURRES)),
  },
  {
    kind: "template",
    id: "premiere_pc_reg_tpl_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 4,
    theme: "neutral",
    hint: "L'événement en indice est la condition : le groupe qui suit « parmi » ou « sachant que ».",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenRegistresValeur(false),
  },
  {
    kind: "template",
    id: "premiere_pc_reg_tpl_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 5,
    theme: "neutral",
    hint: "L'événement en indice est la condition : le groupe qui suit « parmi » ou « sachant que ».",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenRegistresQcm(true, ["bSachantNonA", "nonBSachantA", "aSachantB"]),
  },
  {
    kind: "template",
    id: "premiere_pc_arb_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 2,
    theme: "neutral",
    hint: "On multiplie le long d'un chemin ; on additionne les chemins.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenArbreChemin(true),
  },
  {
    kind: "template",
    id: "premiere_pc_arb_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 4,
    theme: "neutral",
    hint: "On multiplie le long d'un chemin ; on additionne les chemins.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenArbreDeux(),
  },
  {
    kind: "template",
    id: "premiere_pc_arb_tpl_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 5,
    theme: "neutral",
    hint: "On multiplie le long d'un chemin ; on additionne les chemins.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenArbreACompleter(false),
  },
  {
    kind: "template",
    id: "premiere_pc_arbc_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "Premier niveau : $P(A)$ ; second niveau : des probabilités SACHANT la branche d'où l'on part ; somme $1$ à chaque nœud.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenArbreBranche(3),
  },
  {
    kind: "template",
    id: "premiere_pc_arbc_tpl_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 5,
    theme: "neutral",
    hint: "Premier niveau : $P(A)$ ; second niveau : des probabilités SACHANT la branche d'où l'on part ; somme $1$ à chaque nœud.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenArbrePremierNiveau(),
  },
  {
    kind: "template",
    id: "premiere_pc_suc_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 3,
    theme: "neutral",
    hint: "Épreuves indépendantes : on multiplie les probabilités le long du chemin.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenSuccession(3, "short"),
  },
  {
    kind: "template",
    id: "premiere_pc_suc_tpl_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 4,
    theme: "neutral",
    hint: "Épreuves indépendantes : on multiplie les probabilités le long du chemin.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenSuccession(4, "short"),
  },
  {
    kind: "template",
    id: "premiere_pc_suc_tpl_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 5,
    theme: "neutral",
    hint: "Épreuves indépendantes : on multiplie les probabilités le long du chemin.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenSuccession(5, "short"),
  },
  {
    kind: "template",
    id: "premiere_pc_tot_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 3,
    theme: "neutral",
    hint: "$P(B) = P(A) P_A(B) + P(\bar A) P_{\bar A}(B)$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenTotales("qcm"),
  },
  {
    kind: "template",
    id: "premiere_pc_tot_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 5,
    theme: "neutral",
    hint: "$P(B) = P(A) P_A(B) + P(\bar A) P_{\bar A}(B)$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenTotalesInverse(),
  },
  {
    kind: "template",
    id: "premiere_pc_part_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_partition",
    difficulty: 4,
    theme: "neutral",
    hint: "Partition : aucune issue commune, aucune issue oubliée ; les probabilités ont une somme égale à $1$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenPartitionProba(false),
  },
  {
    kind: "template",
    id: "premiere_pc_part_tpl_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_partition",
    difficulty: 5,
    theme: "neutral",
    hint: "Partition : aucune issue commune, aucune issue oubliée ; les probabilités ont une somme égale à $1$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenPartitionProba(true),
  },
  {
    kind: "template",
    id: "premiere_pc_ind_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 2,
    theme: "neutral",
    hint: "Indépendants : $P(A \cap B) = P(A) \times P(B)$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenIndependanceProduit(true),
  },
  {
    kind: "template",
    id: "premiere_pc_ind_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 4,
    theme: "neutral",
    hint: "Indépendants : $P(A \cap B) = P(A) \times P(B)$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenIndependanceTest(),
  },
  {
    kind: "template",
    id: "premiere_pc_ind_tpl_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 5,
    theme: "neutral",
    hint: "Indépendants : $P(A \cap B) = P(A) \times P(B)$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenIndependanceInverse(),
  },
  {
    kind: "template",
    id: "premiere_pc_indinc_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance_incompatible",
    difficulty: 4,
    theme: "neutral",
    hint: "Incompatibles : $P(A \cap B) = 0$ ; indépendants : $P(A \cap B) = P(A) \times P(B)$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenIndIncUnion(),
  },
  {
    kind: "template",
    id: "premiere_pc_indinc_tpl_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance_incompatible",
    difficulty: 5,
    theme: "neutral",
    hint: "Incompatibles : $P(A \cap B) = 0$ ; indépendants : $P(A \cap B) = P(A) \times P(B)$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "template"],
    generate: () => pcGenIndIncConditionnelle(false),
  },
];
