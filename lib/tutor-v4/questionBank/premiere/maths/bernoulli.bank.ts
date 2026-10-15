// lib/tutor-v4/questionBank/premiere/maths/bernoulli.bank.ts
//
// Notions : alea_bernoulli et alea_bernoulli_calcul (domaine BOP1AL)
//
// Capacité attendue, mot pour mot : « Représenter par un arbre de probabilités
// la répétition de $n$ épreuves aléatoires identiques et indépendantes de
// Bernoulli avec $n \leqslant 4$ afin de calculer des probabilités. »
//
// ⛔ Le n ⩽ 4 est une borne du programme, pas une commodité : aucun item ne va
// au-delà. Et la loi binomiale n'est PAS au programme — on ne parle jamais de
// coefficients binomiaux, on compte les chemins sur l'arbre.
//
// Le programme insiste sur la simulation « avec remise dans une urne » : c'est
// la remise qui garantit l'indépendance, et c'est elle qu'on interroge.
//
// ⛔⛔ 15/10/2026 — « DES QUESTIONS REVIENNENT ». Mesuré avant
// (scripts/mesurer-squelettes-coach.ts premiere alea_bernoulli
// alea_bernoulli_calcul) : 3 à 14 squelettes par micro, 8 à 17 répétitions sur
// une série de 20. Les gabarits tiraient des NOMBRES dans une phrase fixe.
// Même méthode que la 3e (dd5e9f75) : chaque gabarit croise
//   · une SITUATION : trente-deux répétitions concrètes (conteneurs du port de
//     la Pointe des Galets, lancers francs, QCM au hasard, car jaune en retard,
//     graines de letchi, fleurs de vanille, roue de la kermesse, coffres d'un
//     jeu vidéo, brouillard au Piton de la Fournaise…), seize expériences à
//     juger « Bernoulli ou non », dix urnes AVEC ou SANS remise ;
//   · une TOURNURE (plusieurs questions par situation : paramètres, chemins,
//     branche, chemin précis, « exactement k », « au moins un », « au plus »…).
// Les valeurs sont exactes (p à un chiffre après la virgule, n ⩽ 4 : au plus
// quatre décimales), l'explication refait le calcul avec les nombres du cas.

import type { CanvasFigure, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

/* ─────────────────────────── outils ─────────────────────────── */

type Q = TutorGeneratedQuestionV4;

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Arrondi de sécurité contre les erreurs de virgule flottante (0,1 × 3…). */
const r8 = (x: number) => Math.round(x * 1e8) / 1e8;

function fr(n: number): string {
  const arrondi = Math.round(n * 1000000) / 1000000;
  return String(arrondi).replace(".", ",");
}

/** Les écritures acceptées d'un décimal : virgule et point. */
const reponses = (x: number) => [...new Set([fr(r8(x)), String(r8(x))])];

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  const distracteurs = Array.from(new Set(wrongs)).filter((w) => w !== correct);
  return shuffle([correct, ...distracteurs.slice(0, 3)]);
}

/**
 * QCM numérique : la bonne valeur et trois leurres DISTINCTS EN VALEUR, pris
 * dans [0 ; 1]. Les pièges passent d'abord ; des voisins complètent au besoin.
 */
function qcmNum(bon: number, pieges: number[]): { choices: string[]; expected: string[] } {
  const b = r8(bon);
  const secours = [b + 0.1, b - 0.1, b / 2, b + 0.2, b - 0.2, 1 - b / 2].map(r8);
  const pris: number[] = [];
  for (const x of [...pieges.map(r8), ...secours]) {
    if (pris.length === 3) break;
    if (!(x > 0 && x < 1)) continue;
    if ([b, ...pris].some((y) => Math.abs(y - x) < 1e-9)) continue;
    pris.push(x);
  }
  return { choices: shuffle([fr(b), ...pris.map(fr)]), expected: [fr(b)] };
}

function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}
/** « $\dfrac{3}{9}$ », écrit tel quel (on ne simplifie pas : l'élève reconnaît le calcul). */
const tf = (a: number, b: number) => (a === 0 ? "$0$" : `$\\dfrac{${a}}{${b}}$`);

/** QCM de fractions : la bonne et trois leurres distincts EN VALEUR. */
function qcmFrac(bon: [number, number], pieges: [number, number][]): { choices: string[]; expected: string[] } {
  const v = (f: [number, number]) => f[0] / f[1];
  const pris: [number, number][] = [];
  const secours: [number, number][] = [
    [bon[0] + 1, bon[1]],
    [bon[0], bon[1] + 1],
    [bon[0] + 1, bon[1] + 1],
  ];
  for (const f of [...pieges, ...secours]) {
    if (pris.length === 3) break;
    if (f[1] <= 0 || f[0] < 0 || f[0] > f[1]) continue;
    if ([bon, ...pris].some((g) => Math.abs(v(g) - v(f)) < 1e-9)) continue;
    pris.push(f);
  }
  const c = tf(bon[0], bon[1]);
  return { choices: shuffle([c, ...pris.map((f) => tf(f[0], f[1]))]), expected: [c] };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

/** L'arbre d'une répétition de n épreuves identiques (n ⩽ 4, borne du BO). */
function canvasRepetition(p: number, n: number, titre: string): CanvasFigure {
  const q = r8(1 - p);
  const noeud = (profondeur: number): { label: string; proba: string; enfants?: any[] }[] => {
    if (profondeur > n) return [];
    const enfants = profondeur < n ? noeud(profondeur + 1) : undefined;
    return [
      { label: "S", proba: fr(p), ...(enfants ? { enfants } : {}) },
      { label: "S̄", proba: fr(q), ...(enfants ? { enfants } : {}) },
    ];
  };
  return {
    kind: "arbre_proba",
    titre,
    racineEnfants: noeud(1),
  };
}

/** Tous les chemins de longueur n : tableaux de booléens (true = succès). */
function chemins(n: number): boolean[][] {
  const out: boolean[][] = [];
  for (let m = 0; m < 2 ** n; m++) out.push(Array.from({ length: n }, (_, i) => ((m >> (n - 1 - i)) & 1) === 0));
  return out;
}
const nbSucces = (c: boolean[]) => c.filter(Boolean).length;
/** Un chemin écrit en LaTeX : « S\,\overline{S}\,S ». */
const ecrireChemin = (c: boolean[]) => c.map((s) => (s ? "S" : "\\overline{S}")).join("\\,");
/** « 0,3 \times 0,7 \times 0,3 » pour un chemin. */
const facteurs = (c: boolean[], p: number) => c.map((s) => fr(s ? p : r8(1 - p))).join(" \\times ");
const probaChemin = (c: boolean[], p: number) => r8(c.reduce((acc, s) => acc * (s ? p : 1 - p), 1));
/** « 0,3 », « (0,3)^{2} » : une puissance lisible. */
const pw = (x: number, e: number) => (e === 1 ? fr(x) : `(${fr(x)})^{${e}}`);
const ORD = ["", "première", "deuxième", "troisième", "quatrième"] as const;

function gab(
  id: string,
  notionId: "alea_bernoulli" | "alea_bernoulli_calcul",
  microId: string,
  difficulty: 2 | 3 | 4 | 5,
  hint: string,
  tags: string[],
  generate: () => Q,
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "premiere",
    matiere: "maths",
    notionId,
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["premiere", "maths", "probabilites", "bernoulli", ...tags, "template"],
    generate,
  };
}

/* ───────────────────── les situations répétées ─────────────────────
   Chaque situation est une répétition d'épreuves identiques et
   indépendantes. Le succès S est une phrase sur UNE épreuve ; on écrit
   « ${v} $n$ ${pl} » (« On contrôle $3$ conteneurs »). `ps` : les valeurs
   de p plausibles (par défaut P_CALC). */

type Ctx = {
  intro: string;
  S: string;
  v: string;
  pl: string;
  /** Pourquoi les épreuves sont identiques et indépendantes, dit avec le décor. */
  pourquoi: string;
  ps?: readonly number[];
};

const P_CALC = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9] as const;
const P_DEFAUT = [0.1, 0.2, 0.3] as const;
const GRAND_LOT = "le lot est si grand qu'un prélèvement ne change pas la proportion restante";

const CONTEXTES: readonly Ctx[] = [
  {
    // L'exemple dont Frédéric se sert en classe : le conteneur contrôlé à
    // l'arrivée au port. On dit CE QU'ON CHERCHE dedans.
    intro: "Au port de la Pointe des Galets, on ouvre au hasard des conteneurs réfrigérés débarqués d'un très grand cargo.",
    S: "la chaîne du froid du conteneur a été rompue",
    v: "On contrôle",
    pl: "conteneurs",
    pourquoi: GRAND_LOT,
    ps: P_DEFAUT,
  },
  {
    intro: "Dans une fromagerie, chaque camembert doit peser entre 245 g et 255 g ; on en prélève au hasard dans une production de plusieurs milliers.",
    S: "le camembert est hors du poids autorisé",
    v: "On prélève",
    pl: "camemberts",
    pourquoi: GRAND_LOT,
    ps: P_DEFAUT,
  },
  {
    intro: "En fin de chaîne, chaque moteur passe au banc d'essai ; l'usine en sort des centaines par jour.",
    S: "le moteur ne démarre pas du premier coup",
    v: "On teste",
    pl: "moteurs",
    pourquoi: GRAND_LOT,
    ps: P_DEFAUT,
  },
  {
    intro: "Une embouteilleuse remplit des milliers de bouteilles de jus de goyave ; le bouchon est parfois mal serré.",
    S: "la bouteille fuit",
    v: "On vérifie",
    pl: "bouteilles prises au hasard",
    pourquoi: GRAND_LOT,
    ps: P_DEFAUT,
  },
  {
    intro: "Dans un atelier, des sachets de riz sont remplis automatiquement, par milliers.",
    S: "le sachet est sous-rempli",
    v: "On pèse",
    pl: "sachets pris au hasard",
    pourquoi: GRAND_LOT,
    ps: P_DEFAUT,
  },
  {
    intro: "Un joueur de basket tire des lancers francs ; ses tirs n'ont aucune influence les uns sur les autres.",
    S: "le lancer franc est réussi",
    v: "Il tire",
    pl: "lancers francs",
    pourquoi: "le joueur garde la même adresse à chaque tir, et un tir ne change rien au suivant",
  },
  {
    intro: "Un élève répond complètement au hasard aux questions d'un QCM ; chaque question a quatre propositions, dont une seule est juste.",
    S: "la réponse à la question est juste",
    v: "Il répond au hasard à",
    pl: "questions",
    pourquoi: "chaque question offre une chance sur quatre, quel qu'ait été le hasard aux questions précédentes",
    ps: [0.25],
  },
  {
    intro: "Une élève répond au hasard à un questionnaire où chaque question propose cinq réponses, dont une seule est juste.",
    S: "la réponse à la question est juste",
    v: "Elle répond au hasard à",
    pl: "questions",
    pourquoi: "chaque question offre une chance sur cinq, quoi qu'il soit arrivé aux précédentes",
    ps: [0.2],
  },
  {
    intro: "Au stade de Saint-Pierre, une gardienne de but s'entraîne aux tirs au but ; chaque tir est indépendant des autres.",
    S: "la gardienne arrête le tir",
    v: "Elle affronte",
    pl: "tirs au but",
    pourquoi: "ses chances d'arrêt restent les mêmes à chaque tir, sans influence d'un tir sur l'autre",
  },
  {
    intro: "Au fond de la salle de jeux, Noé lance des fléchettes ; ses lancers sont indépendants.",
    S: "la fléchette atteint le centre de la cible",
    v: "Il lance",
    pl: "fléchettes",
    pourquoi: "sa précision ne change pas d'un lancer à l'autre",
  },
  {
    intro: "Une archère s'entraîne au club de tir à l'arc ; chaque flèche est tirée dans les mêmes conditions.",
    S: "la flèche touche le cœur jaune de la cible",
    v: "Elle tire",
    pl: "flèches",
    pourquoi: "chaque flèche est tirée dans les mêmes conditions, sans influence des précédentes",
  },
  {
    intro: "Lina prend le car jaune chaque matin pour aller au lycée ; on admet que les retards d'un matin à l'autre sont indépendants.",
    S: "le car arrive en retard",
    v: "On observe",
    pl: "matins",
    pourquoi: "on admet que la probabilité de retard est la même chaque matin et qu'un retard n'en entraîne pas un autre",
  },
  {
    intro: "Sur le trajet de Tom, les feux tricolores fonctionnent indépendamment les uns des autres.",
    S: "le feu est vert à son arrivée",
    v: "Il franchit",
    pl: "feux",
    pourquoi: "chaque feu a la même probabilité d'être vert, et les feux ne sont pas synchronisés",
  },
  {
    intro: "À la kermesse du lycée, une roue porte un secteur doré ; chaque tour de roue est indépendant des autres.",
    S: "la roue s'arrête sur le secteur doré",
    v: "On fait",
    pl: "tours de roue",
    pourquoi: "la roue ne garde aucune mémoire : chaque tour repart du même partage en secteurs",
  },
  {
    intro: "Un pépiniériste de Saint-Paul sème des graines de letchi ; chacune germe ou non, indépendamment des autres.",
    S: "la graine germe",
    v: "On sème",
    pl: "graines",
    pourquoi: "les graines viennent d'un très grand stock et germent sans s'influencer",
  },
  {
    intro: "Dans une plantation de vanille de Sainte-Rose, chaque fleur est fécondée à la main ; la réussite d'une fleur n'influence pas les autres.",
    S: "la fleur fécondée donne une gousse",
    v: "On féconde",
    pl: "fleurs",
    pourquoi: "chaque fleur a la même chance de donner une gousse, sans influence des autres",
  },
  {
    intro: "Une usine fabrique des ampoules LED par dizaines de milliers.",
    S: "l'ampoule est défectueuse",
    v: "On teste",
    pl: "ampoules prises au hasard",
    pourquoi: GRAND_LOT,
    ps: P_DEFAUT,
  },
  {
    intro: "Dans un jeu vidéo, chaque coffre ouvert contient un objet rare ou non, indépendamment des coffres précédents.",
    S: "le coffre contient un objet rare",
    v: "On ouvre",
    pl: "coffres",
    pourquoi: "le jeu tire chaque coffre avec la même probabilité, sans tenir compte des précédents",
    ps: [0.1, 0.2, 0.3],
  },
  {
    intro: "Des pochettes de cartes à collectionner sont produites par millions ; certaines contiennent une carte brillante.",
    S: "la pochette contient une carte brillante",
    v: "On achète",
    pl: "pochettes",
    pourquoi: GRAND_LOT,
  },
  {
    intro: "Un fabricant de céréales glisse une figurine rare dans certaines boîtes, produites en très grand nombre.",
    S: "la boîte contient la figurine rare",
    v: "On achète",
    pl: "boîtes de céréales",
    pourquoi: GRAND_LOT,
    ps: [0.1, 0.2, 0.3],
  },
  {
    intro: "Un élevage de poules produit des milliers d'œufs par jour.",
    S: "l'œuf a deux jaunes",
    v: "On casse",
    pl: "œufs pris au hasard",
    pourquoi: GRAND_LOT,
    ps: P_DEFAUT,
  },
  {
    intro: "Au marché de gros de Saint-Pierre, un grossiste reçoit des mangues par tonnes.",
    S: "la mangue est abîmée",
    v: "On prend au hasard",
    pl: "mangues",
    pourquoi: GRAND_LOT,
    ps: P_DEFAUT,
  },
  {
    intro: "On lance une pièce truquée ; les lancers sont indépendants.",
    S: "la pièce tombe sur pile",
    v: "On la lance",
    pl: "fois",
    pourquoi: "la pièce n'a pas de mémoire : chaque lancer a la même probabilité de donner pile",
    ps: [0.3, 0.4, 0.6, 0.7],
  },
  {
    intro: "Aux petits chevaux, Inès joue avec un dé truqué ; les lancers sont indépendants.",
    S: "le dé donne un six",
    v: "Elle lance le dé",
    pl: "fois",
    pourquoi: "le dé n'a pas de mémoire : chaque lancer a la même probabilité de donner six",
    ps: [0.2, 0.3, 0.4],
  },
  {
    intro: "Une joueuse de tennis passe sa première balle de service ou non, indépendamment d'un service à l'autre.",
    S: "la première balle de service est bonne",
    v: "Elle sert",
    pl: "fois",
    pourquoi: "sa réussite ne dépend pas des services précédents",
  },
  {
    intro: "Dans une grande ville, on interroge des habitants choisis au hasard parmi des centaines de milliers.",
    S: "la personne interrogée est favorable au nouveau tram",
    v: "On interroge",
    pl: "personnes",
    pourquoi: "la population est si grande qu'interroger une personne ne change pas la proportion de favorables",
  },
  {
    intro: "Dans les bus de la ville, un contrôleur vérifie des voyageurs pris au hasard parmi des milliers d'usagers.",
    S: "le voyageur contrôlé n'a pas de ticket",
    v: "Il contrôle",
    pl: "voyageurs",
    pourquoi: "les usagers sont si nombreux qu'un contrôle ne change pas la proportion de fraudeurs",
    ps: P_DEFAUT,
  },
  {
    intro: "Au volley, un joueur réussit son service ou non, indépendamment des services précédents.",
    S: "le service est réussi",
    v: "Il sert",
    pl: "fois",
    pourquoi: "sa réussite reste la même à chaque service, sans influence des précédents",
  },
  {
    intro: "À la pétanque, une joueuse tente de tirer sur une boule adverse ; chaque tir est indépendant.",
    S: "elle touche la boule visée",
    v: "Elle tente",
    pl: "tirs",
    pourquoi: "son adresse est la même à chaque tir, sans influence du précédent",
  },
  {
    intro: "Un guide emmène des randonneurs au Piton de la Fournaise ; on admet que, d'une sortie à l'autre, le brouillard au sommet apparaît indépendamment.",
    S: "le sommet est dans le brouillard",
    v: "On considère",
    pl: "sorties",
    pourquoi: "on admet que la probabilité de brouillard est la même à chaque sortie et qu'une sortie n'influence pas la suivante",
  },
  {
    intro: "Un pêcheur de Saint-Gilles relève ses casiers ; chaque casier se remplit indépendamment des autres.",
    S: "le casier contient une langouste",
    v: "Il relève",
    pl: "casiers",
    pourquoi: "chaque casier a la même chance d'être garni, sans influence des voisins",
  },
  {
    intro: "Une application envoie des notifications ; chacune est ouverte ou non, indépendamment des autres.",
    S: "la notification est ouverte",
    v: "On envoie",
    pl: "notifications",
    pourquoi: "chaque notification a la même chance d'être ouverte, sans influence des précédentes",
  },
];

/** Un contexte et une probabilité plausible pour lui. */
function tirerCtx(): { ctx: Ctx; p: number } {
  const ctx = pick(CONTEXTES);
  return { ctx, p: pick(ctx.ps ?? P_CALC) };
}
/** « On contrôle $3$ conteneurs. » */
const repete = (ctx: Ctx, n: number) => `${ctx.v} $${n}$ ${ctx.pl}.`;
/** « On appelle succès S l'évènement « … », de probabilité $p$. » — trois façons de le dire. */
function annonce(ctx: Ctx, p: number): string {
  return pick([
    `On appelle succès l'évènement S : « ${ctx.S} », de probabilité $p = ${fr(p)}$ à chaque épreuve.`,
    `À chaque épreuve, le succès S : « ${ctx.S} » a pour probabilité $${fr(p)}$.`,
    `On note S l'évènement « ${ctx.S} » : $P(S) = ${fr(p)}$ à chaque fois.`,
  ]);
}

/* ─────────── les expériences à juger : Bernoulli ou non ─────────── */

type Experience = { e: string; bern: boolean; issues: string };
const EXPERIENCES: readonly Experience[] = [
  { e: "On lance un dé à six faces et l'on regarde si l'on obtient un six.", bern: true, issues: "« six » ou « pas six »" },
  { e: "On lance un dé à six faces et l'on note le numéro obtenu.", bern: false, issues: "1, 2, 3, 4, 5 ou 6 — six issues" },
  { e: "On lance une pièce et l'on note pile ou face.", bern: true, issues: "pile ou face" },
  { e: "On tire une carte d'un jeu de 32 et l'on regarde si c'est un cœur.", bern: true, issues: "« cœur » ou « pas cœur »" },
  { e: "On tire une carte d'un jeu de 32 et l'on note sa couleur : cœur, carreau, trèfle ou pique.", bern: false, issues: "cœur, carreau, trèfle ou pique — quatre issues" },
  { e: "Un sac contient des billes rouges, vertes et bleues ; on en tire une et l'on note sa couleur.", bern: false, issues: "rouge, verte ou bleue — trois issues" },
  { e: "Un sac contient des billes rouges, vertes et bleues ; on en tire une et l'on regarde si elle est rouge.", bern: true, issues: "« rouge » ou « pas rouge »" },
  { e: "À la kermesse, on fait tourner une roue à huit secteurs numérotés et l'on note le numéro.", bern: false, issues: "les huit numéros — huit issues" },
  { e: "À la kermesse, on fait tourner une roue et l'on regarde si elle s'arrête sur le secteur gagnant.", bern: true, issues: "« gagnant » ou « perdant »" },
  { e: "Un basketteur tire un lancer franc : il le marque ou le manque.", bern: true, issues: "« marqué » ou « manqué »" },
  { e: "On demande à un passant choisi au hasard s'il est pour ou contre le nouveau tram.", bern: true, issues: "« pour » ou « contre »" },
  { e: "On demande à un élève choisi au hasard son mois de naissance.", bern: false, issues: "les douze mois — douze issues" },
  { e: "On note la météo du lendemain à Cilaos : soleil, nuages ou pluie.", bern: false, issues: "soleil, nuages ou pluie — trois issues" },
  { e: "On regarde s'il pleuvra demain à Cilaos.", bern: true, issues: "« pluie » ou « pas de pluie »" },
  { e: "On prend un letchi au hasard dans une barquette et l'on regarde s'il est abîmé.", bern: true, issues: "« abîmé » ou « sain »" },
  { e: "On lance deux dés et l'on note la somme des faces.", bern: false, issues: "de 2 à 12 — onze issues" },
  { e: "On lance deux dés et l'on regarde si l'on obtient un double.", bern: true, issues: "« double » ou « pas double »" },
  { e: "Au jeu de l'oie, on lance le dé et l'on note de combien de cases on avance.", bern: false, issues: "de 1 à 6 cases — six issues" },
  { e: "On contrôle un conteneur à l'arrivée au port : la chaîne du froid a tenu ou non.", bern: true, issues: "« froid rompu » ou « froid conservé »" },
  { e: "On tire au hasard le numéro d'un billet de tombola parmi 500.", bern: false, issues: "les 500 numéros — 500 issues" },
  { e: "On tire au hasard un billet de tombola et l'on regarde s'il est gagnant.", bern: true, issues: "« gagnant » ou « perdant »" },
];

/* ───────────── les urnes : deux tirages AVEC ou SANS remise ───────────── */

type Urne = {
  /** « Un carton contient $N$ bouteilles, dont $k$ ». */
  cont: (N: number, k: number) => string;
  /** Ce qui distingue les objets spéciaux, au pluriel et au singulier. */
  specP: string;
  specS: string;
  /** Le même au subjonctif : « que la deuxième fuie ». */
  specSj: string;
  /** « le premier objet tiré », « la première bille tirée ». */
  premier: string;
  second: string;
  /** Ce qu'on remet : « la remettre » / « le remettre ». */
  remettre: string;
  Ns: readonly number[];
  /** Objet féminin (bille, bouteille…) : « une », « elle », « la ». */
  f: boolean;
};
const URNES: readonly Urne[] = [
  { cont: (N, k) => `Un carton contient $${N}$ bouteilles de jus de goyave, dont $${k}$`, specP: "fuient", specSj: "fuie", specS: "fuit", premier: "la première bouteille sortie", second: "la deuxième", remettre: "la remettre", Ns: [8, 10, 12], f: true },
  { cont: (N, k) => `Un sac contient $${N}$ billes, dont $${k}$`, specP: "sont rouges", specSj: "soit rouge", specS: "est rouge", premier: "la première bille tirée", second: "la deuxième", remettre: "la remettre", Ns: [6, 8, 10], f: true },
  { cont: (N, k) => `Une barquette contient $${N}$ letchis, dont $${k}$`, specP: "sont abîmés", specSj: "soit abîmé", specS: "est abîmé", premier: "le premier letchi pris", second: "le deuxième", remettre: "le remettre", Ns: [10, 12, 15], f: false },
  { cont: (N, k) => `Une boîte contient $${N}$ bonbons coco, dont $${k}$`, specP: "sont à la vanille", specSj: "soit à la vanille", specS: "est à la vanille", premier: "le premier bonbon pris", second: "le deuxième", remettre: "le remettre", Ns: [8, 10, 12], f: false },
  { cont: (N, k) => `Une trousse contient $${N}$ stylos, dont $${k}$`, specP: "n'écrivent plus", specSj: "n'écrive plus", specS: "n'écrit plus", premier: "le premier stylo pris", second: "le deuxième", remettre: "le remettre", Ns: [6, 7, 8], f: false },
  { cont: (N, k) => `Un tiroir contient $${N}$ chaussettes, dont $${k}$`, specP: "sont noires", specSj: "soit noire", specS: "est noire", premier: "la première chaussette prise", second: "la deuxième", remettre: "la remettre", Ns: [8, 10, 12], f: true },
  { cont: (N, k) => `Une enveloppe contient $${N}$ tickets de tombola, dont $${k}$`, specP: "sont gagnants", specSj: "soit gagnant", specS: "est gagnant", premier: "le premier ticket tiré", second: "le deuxième", remettre: "le remettre", Ns: [10, 12, 20], f: false },
  { cont: (N, k) => `Un panier contient $${N}$ mangues, dont $${k}$`, specP: "sont mûres", specSj: "soit mûre", specS: "est mûre", premier: "la première mangue prise", second: "la deuxième", remettre: "la remettre", Ns: [8, 9, 10], f: true },
  { cont: (N, k) => `Une boîte contient $${N}$ œufs, dont $${k}$`, specP: "sont fêlés", specSj: "soit fêlé", specS: "est fêlé", premier: "le premier œuf pris", second: "le deuxième", remettre: "le remettre", Ns: [6, 10, 12], f: false },
  { cont: (N, k) => `Un sachet contient $${N}$ jetons, dont $${k}$`, specP: "portent une étoile", specSj: "porte une étoile", specS: "porte une étoile", premier: "le premier jeton tiré", second: "le deuxième", remettre: "le remettre", Ns: [5, 8, 10], f: false },
];

/** Des lots si grands que le tirage sans remise reste (presque) indépendant. */
const GRANDS_LOTS: readonly string[] = [
  "Sur une chaîne qui produit des milliers de pots de confiture de goyave par jour, on en prélève trois au hasard, sans les remettre, pour les peser.",
  "Dans une récolte de plusieurs tonnes de letchis, on prend deux fruits au hasard, sans les remettre, pour vérifier leur maturité.",
  "Parmi les 80 000 habitants d'une ville, on interroge successivement trois personnes différentes choisies au hasard.",
  "Dans un stock de 50 000 ampoules, on en prélève deux au hasard, sans les remettre, pour les tester.",
  "Au port, un cargo débarque 3 000 conteneurs ; on en ouvre deux au hasard, l'un après l'autre.",
  "Une usine produit des millions de pochettes de cartes ; on en achète trois au hasard.",
];

/* ═════════════════════════ la banque ═════════════════════════ */

export const bernoulliBank: TutorBankItemV4[] = [
  /* ═══════════════ alea_bern_epreuve ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_bern_epreuve_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_bernoulli",
    microId: "alea_bern_epreuve",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qu'une épreuve de Bernoulli ?",
    format: "qcm",
    choices: [
      "Une expérience aléatoire à deux issues seulement : succès ou échec",
      "Une expérience répétée un grand nombre de fois",
      "Une expérience dont toutes les issues sont équiprobables",
      "Une expérience à quatre issues au maximum",
    ],
    expected: ["Une expérience aléatoire à deux issues seulement : succès ou échec"],
    comparator: "mcq_exact",
    hint: "Le mot clé est « deux issues ».",
    explanation: exp(
      "Une épreuve de Bernoulli est une expérience aléatoire n'ayant que DEUX issues, qu'on appelle conventionnellement succès et échec.",
      "On vérifie qu'il n'y a bien que deux résultats possibles.",
      "Lancer une pièce : pile ou face, deux issues. Lancer un dé et regarder la face : six issues, ce n'est pas une épreuve de Bernoulli — mais « obtenir un six ou non » en est une.",
      "C'est une expérience à deux issues. Les issues n'ont AUCUN besoin d'être équiprobables : une pièce truquée convient parfaitement."
    ),
    choiceDiagnostics: [
      {
        choice: "Une expérience dont toutes les issues sont équiprobables",
        cause: "l'équiprobabilité n'est pas exigée : un succès peut avoir une probabilité de 0,1",
      },
    ],
    tags: ["premiere", "maths", "probabilites", "bernoulli"],
  },

  // Bernoulli ou non ? Vingt et une expériences × trois tournures.
  gab(
    "premiere_bern_epreuve_tpl_1",
    "alea_bernoulli",
    "alea_bern_epreuve",
    3,
    "Deux issues seulement : c'est le seul critère.",
    [],
    () => {
      const x = pick(EXPERIENCES);
      const question = pick([
        "S'agit-il d'une épreuve de Bernoulli ?",
        "Peut-on modéliser cette expérience par une épreuve de Bernoulli ?",
        "Cette expérience est-elle une épreuve de Bernoulli ?",
      ]);
      const oui = "Oui, il n'y a que deux issues";
      const non = "Non, il y a plus de deux issues";
      const bon = x.bern ? oui : non;
      return {
        text: `${x.e} ${question}`,
        format: "qcm",
        choices: makeChoices(bon, [
          x.bern ? non : oui,
          "Oui, car les issues sont équiprobables",
          "Non, car les issues ne sont pas équiprobables",
        ]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: exp(
          "Une épreuve de Bernoulli n'a que deux issues. Ce qui compte n'est pas l'objet manipulé, mais ce qu'on OBSERVE.",
          "On compte les issues de ce qu'on note.",
          `Ici, les issues possibles sont : ${x.issues}.`,
          x.bern
            ? "C'est une épreuve de Bernoulli : deux issues, un succès et un échec. Peu importe qu'elles soient équiprobables ou non."
            : "Ce n'est pas une épreuve de Bernoulli. Mais en regardant un seul résultat (« obtenir tel résultat ou non »), on en ferait une."
        ),
        choiceDiagnostics: [
          {
            choice: "Oui, car les issues sont équiprobables",
            cause: "l'équiprobabilité n'est ni nécessaire ni suffisante : seul compte le nombre d'issues (deux)",
          },
        ],
      };
    }
  ),

  // ★2 — le paramètre p : l'échec (1 − p) ou p lu dans une urne.
  gab(
    "premiere_bern_epreuve_tpl_2",
    "alea_bernoulli",
    "alea_bern_epreuve",
    2,
    "Succès et échec sont contraires : leurs probabilités ont pour somme 1.",
    [],
    () => {
      if (Math.random() < 0.6) {
        const { ctx, p } = tirerCtx();
        const q = r8(1 - p);
        const question = pick([
          "Quelle est la probabilité de l'échec ?",
          "Que vaut $P(\\overline{S})$ ?",
          `Quelle est la probabilité que ce ne soit pas le cas (échec) ?`,
        ]);
        return {
          text: `${ctx.intro} On s'intéresse à une seule épreuve. ${annonce(ctx, p)} ${question}`,
          format: "short",
          expected: reponses(q),
          comparator: "number_equal",
          explanation: exp(
            "Dans une épreuve de Bernoulli, l'échec $\\overline{S}$ est l'évènement contraire du succès S.",
            "On utilise $P(\\overline{S}) = 1 - P(S)$.",
            `$P(\\overline{S}) = 1 - ${fr(p)} = ${fr(q)}$.`,
            `La probabilité de l'échec vaut $${fr(q)}$.`
          ),
        };
      }
      // Le paramètre p d'une urne : k objets « succès » sur N.
      const u = pick(URNES);
      const N = pick([4, 5, 8, 10, 20, 25] as const);
      const k = 1 + Math.floor(Math.random() * (N - 1));
      const g = pgcd(k, N);
      const p = r8(k / N);
      const question = pick([
        "Quel est le paramètre $p$ (la probabilité du succès) de cette épreuve de Bernoulli ?",
        "Quelle est la probabilité $p$ du succès ? (réponse décimale ou fraction)",
      ]);
      return {
        text:
          `${u.cont(N, k)} ${u.specP}. On en prend ${u.f ? "une" : "un"} au hasard ; le succès est que ${u.f ? "celle" : "celui"} qu'on a pris${u.f ? "e" : ""} ${u.specSj}. ${question}`,
        format: "short",
        expected: [...reponses(p), `${k / g}/${N / g}`, `${k}/${N}`],
        comparator: "number_equal",
        explanation: exp(
          "Le paramètre $p$ d'une épreuve de Bernoulli est la probabilité du succès.",
          "Les objets ont tous la même chance d'être pris : $p$ = nombre de cas favorables ÷ nombre total.",
          `$p = \\dfrac{${k}}{${N}} = ${fr(p)}$.`,
          `Le paramètre vaut $p = ${fr(p)}$, et l'échec a pour probabilité $1 - ${fr(p)} = ${fr(r8(1 - p))}$.`
        ),
      };
    }
  ),

  /* ═══════════════ alea_bern_repetition ═══════════════ */

  gab(
    "premiere_bern_repetition_tpl_1",
    "alea_bernoulli",
    "alea_bern_repetition",
    3,
    "Identiques : la probabilité de succès ne change pas. Indépendantes : un résultat n'influence pas le suivant.",
    [],
    () => {
      const { ctx, p } = tirerCtx();
      const n = pick([2, 3, 4] as const);
      const mode = pick(["pourquoi", "parametres", "memoire"] as const);

      if (mode === "pourquoi") {
        const bon = "La probabilité de succès reste la même et un résultat n'influence pas les suivants";
        const question = pick([
          "Pourquoi peut-on parler de répétition d'épreuves identiques et indépendantes ?",
          "Qu'est-ce qui permet de modéliser cette situation par une répétition d'épreuves de Bernoulli identiques et indépendantes ?",
        ]);
        return {
          text: `${ctx.intro} ${repete(ctx, n)} ${question}`,
          format: "qcm",
          choices: makeChoices(bon, [
            "L'expérience est répétée plus de deux fois",
            "Toutes les issues sont équiprobables",
            "Le nombre de répétitions est inférieur à cinq",
          ]),
          expected: [bon],
          comparator: "mcq_exact",
          explanation: exp(
            "Une répétition d'épreuves de Bernoulli suppose deux choses : les épreuves sont IDENTIQUES (même probabilité de succès à chaque fois) et INDÉPENDANTES (un résultat ne modifie pas les probabilités des suivants).",
            "On cherche dans l'énoncé ce qui garantit ces deux conditions.",
            `Ici, ${ctx.pourquoi}.`,
            "Les deux conditions sont réunies. Le nombre de répétitions ne joue aucun rôle dans la définition — il limite seulement la taille de l'arbre."
          ),
        };
      }

      if (mode === "parametres") {
        const q = r8(1 - p);
        const c = (nn: number, pp: number) => `$n = ${nn}$ et $p = ${fr(pp)}$`;
        const bon = c(n, p);
        return {
          text:
            `${ctx.intro} ${annonce(ctx, p)} ${repete(ctx, n)} ` +
            pick([
              "Quels sont les paramètres de cette répétition d'épreuves de Bernoulli ?",
              "Cette situation est une répétition d'épreuves de Bernoulli : donne le nombre d'épreuves $n$ et la probabilité de succès $p$.",
            ]),
          format: "qcm",
          // 2^n : confondre le nombre d'épreuves avec le nombre de chemins de l'arbre.
          choices: makeChoices(bon, [c(n, q), c(n + 1, p), c(n - 1, p), c(2 ** n, p), c(n + 1, q)]),
          expected: [bon],
          comparator: "mcq_exact",
          explanation: exp(
            "Une répétition d'épreuves de Bernoulli se décrit par le nombre $n$ d'épreuves et la probabilité $p$ du succès à chaque épreuve.",
            "On lit $n$ dans le nombre de répétitions, $p$ dans la probabilité de S (pas celle de l'échec).",
            `On répète $${n}$ fois l'épreuve ; le succès S a pour probabilité $${fr(p)}$ (l'échec, $1 - ${fr(p)} = ${fr(q)}$).`,
            `Les paramètres sont $n = ${n}$ et $p = ${fr(p)}$.`
          ),
        };
      }

      // « Le hasard n'a pas de mémoire » : après k échecs (ou succès), la probabilité est toujours p.
      const k = Math.max(1, n - 1);
      const echecs = Math.random() < 0.5;
      const q = r8(1 - p);
      const piege = echecs ? q ** k * p : p ** (k + 1);
      const { choices, expected } = qcmNum(p, [q, piege, Math.min(r8(p * 2), 0.95)]);
      return {
        text:
          `${ctx.intro} ${annonce(ctx, p)} ${repete(ctx, n)} ` +
          (k === 1
            ? `La première épreuve a donné ${echecs ? "un échec" : "un succès"}. `
            : `Les $${k}$ premières épreuves ont toutes donné ${echecs ? "un échec" : "un succès"}. `) +
          pick([
            "Quelle est la probabilité que l'épreuve suivante soit un succès ?",
            "Quelle est alors la probabilité d'un succès à l'épreuve suivante ?",
          ]),
        format: "qcm",
        choices,
        expected,
        comparator: "mcq_exact",
        explanation: exp(
          "Les épreuves sont indépendantes : ce qui s'est passé avant ne change pas la probabilité de l'épreuve suivante.",
          "On ne multiplie PAS : la question porte sur une seule épreuve, dont on connaît déjà la probabilité de succès.",
          `Quels que soient les $${k}$ premiers résultats, $P(S) = ${fr(p)}$ à l'épreuve suivante. ` +
            `Le produit $${fr(piege)}$ serait la probabilité de toute une SUITE de résultats, calculée avant de commencer.`,
          `La probabilité vaut $${fr(p)}$. Croire qu'un succès « finit par arriver » après des échecs est une erreur classique : le hasard n'a pas de mémoire.`
        ),
      };
    }
  ),

  /* ═══════════════ alea_bern_avec_sans_remise ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_bern_remise_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_bernoulli",
    microId: "alea_bern_avec_sans_remise",
    difficulty: 4,
    theme: "neutral",
    text:
      "Un carton contient $10$ bouteilles, dont $3$ ont un bouchon mal serré. " +
      "On en sort deux pour les vérifier, sans les remettre dans le carton. " +
      "S'agit-il d'une répétition d'épreuves identiques et indépendantes ?",
    format: "qcm",
    choices: [
      "Non : après la première bouteille sortie, il n'en reste que $9$ dans le carton",
      "Oui, car une bouteille fuit ou ne fuit pas : deux issues",
      "Oui, car les deux vérifications se suivent",
      "Non, car les bouteilles abîmées sont moins nombreuses que les autres",
    ],
    expected: ["Non : après la première bouteille sortie, il n'en reste que $9$ dans le carton"],
    comparator: "mcq_exact",
    hint: "Quelle est la probabilité que la deuxième fuie ? Dépend-elle de la première ?",
    explanation: exp(
      "L'indépendance exige que la probabilité de succès soit la même à chaque épreuve, quoi qu'il se soit produit avant.",
      "On compare la probabilité pour la deuxième bouteille selon ce qu'a donné la première.",
      "Première bouteille : $P(\\text{fuit}) = \\frac{3}{10}$. Deuxième : $\\frac{2}{9}$ si la première fuyait, $\\frac{3}{9}$ sinon. Les deux diffèrent, donc les épreuves ne sont pas indépendantes.",
      "Ce n'est PAS une répétition d'épreuves indépendantes — le carton est trop petit. " +
        "Sur une CHAÎNE de production, en revanche, retirer un article d'un lot de plusieurs milliers ne change rien : c'est ce qui rend le contrôle qualité modélisable ainsi."
    ),
    choiceDiagnostics: [
      {
        choice: "Oui, car une bouteille fuit ou ne fuit pas : deux issues",
        cause: "deux issues font une épreuve de Bernoulli, mais ne garantissent pas l'indépendance des répétitions",
      },
    ],
    tags: ["premiere", "maths", "probabilites", "bernoulli", "piege"],
  },

  gab(
    "premiere_bern_remise_tpl_1",
    "alea_bernoulli",
    "alea_bern_avec_sans_remise",
    4,
    "La probabilité du second tirage change-t-elle selon ce qu'a donné le premier ?",
    [],
    () => {
      const mode = pick(["juger", "juger", "second", "grand"] as const);

      if (mode === "grand") {
        const s = pick(GRANDS_LOTS);
        const bon = "Oui, en bonne approximation : le lot est très grand";
        const question = pick([
          "Peut-on modéliser ces tirages par une répétition d'épreuves identiques et indépendantes ?",
          "S'agit-il (au moins approximativement) d'une répétition d'épreuves identiques et indépendantes ?",
        ]);
        return {
          text: `${s} ${question}`,
          format: "qcm",
          choices: makeChoices(bon, [
            "Non, car le tirage est fait sans remise",
            "Oui, mais seulement si les issues sont équiprobables",
            "On ne peut pas le savoir sans connaître les probabilités",
          ]),
          expected: [bon],
          comparator: "mcq_exact",
          explanation: exp(
            "Sans remise, la composition change après chaque tirage ; mais si le lot est très grand, ce changement est négligeable.",
            "On compare la taille de l'échantillon (deux ou trois objets) à celle du lot (des milliers).",
            "Retirer deux ou trois éléments d'un lot de plusieurs milliers ne modifie pratiquement pas la proportion restante.",
            "On peut modéliser la situation par une répétition d'épreuves de Bernoulli identiques et indépendantes : c'est ce qu'on fait en contrôle qualité ou dans un sondage."
          ),
          choiceDiagnostics: [
            {
              choice: "Non, car le tirage est fait sans remise",
              cause: "sans remise dans un lot immense, la proportion ne bouge presque pas : l'approximation est légitime",
            },
          ],
        };
      }

      const u = pick(URNES);
      const N = pick(u.Ns);
      const k = 2 + Math.floor(Math.random() * Math.max(1, Math.floor(N / 2) - 1));
      const avec = Math.random() < 0.5;
      const facon = avec
        ? pick([
            `On en prend ${u.f ? "une" : "un"} au hasard, on note ${u.f ? "si elle" : "s'il"} ${u.specS}, puis on va ${u.remettre} avant d'en prendre ${u.f ? "une seconde" : "un second"}.`,
            `On fait deux tirages au hasard AVEC remise : après le premier, on pense à ${u.remettre}.`,
          ])
        : pick([
            `On en prend deux au hasard, ${u.f ? "l'une après l'autre" : "l'un après l'autre"}, sans remise.`,
            `On en prend ${u.f ? "une" : "un"} au hasard, on ${u.f ? "la" : "le"} met de côté, puis on en prend ${u.f ? "une seconde" : "un second"}.`,
          ]);
      const debut = `${u.cont(N, k)} ${u.specP}. ${facon}`;

      if (mode === "juger") {
        const oui = "Oui : la composition est la même aux deux tirages";
        const non = `Non : après le premier tirage, il n'en reste que $${N - 1}$`;
        const bon = avec ? oui : non;
        return {
          text:
            `${debut} ` +
            pick([
              "S'agit-il d'une répétition d'épreuves identiques et indépendantes ?",
              "Peut-on modéliser ces deux tirages par une répétition de deux épreuves de Bernoulli identiques et indépendantes ?",
            ]),
          format: "qcm",
          choices: makeChoices(bon, [
            avec ? non : oui,
            "Oui, car chaque tirage n'a que deux issues",
            "Oui, mais seulement si les issues sont équiprobables",
          ]),
          expected: [bon],
          comparator: "mcq_exact",
          explanation: exp(
            "Des épreuves sont identiques et indépendantes lorsque la probabilité de succès reste la même à chaque fois, quoi qu'il se soit produit avant.",
            "On calcule la probabilité de succès au second tirage selon ce qu'a donné le premier.",
            avec
              ? `Avec remise, l'urne retrouve ses $${N}$ objets dont $${k}$ : la probabilité vaut $\\dfrac{${k}}{${N}}$ aux deux tirages.`
              : `Au premier tirage, $P = \\dfrac{${k}}{${N}}$. Au second : $\\dfrac{${k - 1}}{${N - 1}}$ si le premier ${u.specS}, $\\dfrac{${k}}{${N - 1}}$ sinon. Ces valeurs diffèrent.`,
            avec
              ? "C'est une répétition d'épreuves de Bernoulli identiques et indépendantes : c'est la REMISE qui le garantit."
              : "Ce n'est PAS une répétition d'épreuves indépendantes : le lot est trop petit pour que le retrait passe inaperçu."
          ),
          choiceDiagnostics: [
            {
              choice: "Oui, car chaque tirage n'a que deux issues",
              cause: "deux issues font une épreuve de Bernoulli, mais ne garantissent pas l'indépendance des répétitions",
            },
          ],
        };
      }

      // La probabilité au second tirage, sachant que le premier était un « succès ».
      const bon: [number, number] = avec ? [k, N] : [k - 1, N - 1];
      const { choices, expected } = qcmFrac(bon, [avec ? [k - 1, N - 1] : [k, N], [k - 1, N], [k, N - 1]]);
      return {
        text:
          `${debut} ` +
          pick([
            `${u.premier.charAt(0).toUpperCase() + u.premier.slice(1)} ${u.specS}. Quelle est la probabilité que ${u.second} ${u.specSj} aussi ?`,
            `Sachant que ${u.premier} ${u.specS}, quelle est la probabilité que ${u.second} ${u.specSj} aussi ?`,
          ]),
        format: "qcm",
        choices,
        expected,
        comparator: "mcq_exact",
        explanation: exp(
          "Au second tirage, la probabilité se calcule sur ce qui reste réellement dans le contenant.",
          avec ? "Avec remise, on retrouve exactement la composition de départ." : "Sans remise, il manque un objet — et c'était justement un objet « succès ».",
          avec
            ? `Il y a toujours $${N}$ objets, dont $${k}$ : $P = \\dfrac{${k}}{${N}}$.`
            : `Il reste $${N} - 1 = ${N - 1}$ objets, dont $${k} - 1 = ${k - 1}$ : $P = \\dfrac{${k - 1}}{${N - 1}}$.`,
          avec
            ? `La probabilité vaut $\\dfrac{${k}}{${N}}$, comme au premier tirage : les épreuves sont indépendantes.`
            : `La probabilité vaut $\\dfrac{${k - 1}}{${N - 1}}$, différente de $\\dfrac{${k}}{${N}}$ : les épreuves ne sont pas indépendantes.`
        ),
      };
    }
  ),

  /* ═══════════════ alea_bern_arbre ═══════════════ */

  gab(
    "premiere_bern_arbre_tpl_1",
    "alea_bernoulli_calcul",
    "alea_bern_arbre",
    3,
    "Chaque épreuve double le nombre de chemins ; sur chaque branche, on lit $p$ ou $1 - p$.",
    ["arbre", "short"],
    () => {
      const { ctx, p } = tirerCtx();
      const n = pick([2, 3, 4] as const);
      const q = r8(1 - p);
      const canvas = canvasRepetition(p, n, `Répétition de ${n} épreuves`);
      const debut = `${ctx.intro} ${annonce(ctx, p)} ${repete(ctx, n)} On représente la situation par l'arbre ci-contre.`;
      const mode = pick(["total", "k", "branche", "chemin", "auMoins"] as const);

      if (mode === "total") {
        return {
          text: `${debut} ${pick(["Combien de chemins l'arbre comporte-t-il au total ?", "Combien l'arbre a-t-il de feuilles (chemins complets) ?"])}`,
          format: "short",
          expected: [String(2 ** n)],
          comparator: "number_equal",
          canvas,
          explanation: exp(
            "À chaque épreuve, l'arbre se divise en deux branches : succès ou échec.",
            "On multiplie par $2$ à chaque niveau.",
            `Pour $${n}$ épreuves : $${Array(n).fill("2").join(" \\times ")} = ${2 ** n}$ chemins.`,
            `L'arbre comporte $${2 ** n}$ chemins. C'est pourquoi le programme s'arrête à $n \\leqslant 4$ : au-delà, l'arbre devient illisible.`
          ),
        };
      }

      if (mode === "k") {
        const k = 1 + Math.floor(Math.random() * (n - 1));
        const bons = chemins(n).filter((c) => nbSucces(c) === k);
        return {
          text: `${debut} ${pick([`Combien de chemins comportent exactement $${k}$ succès ?`, `Sur cet arbre, combien de chemins mènent à exactement $${k}$ succès ?`])}`,
          format: "short",
          expected: [String(bons.length)],
          comparator: "number_equal",
          canvas,
          explanation: exp(
            "Un chemin de l'arbre est une suite de succès (S) et d'échecs ($\\overline{S}$).",
            `On liste les chemins qui contiennent exactement $${k}$ fois S.`,
            `Ce sont : ${bons.map((c) => `$${ecrireChemin(c)}$`).join(" ; ")}.`,
            `Il y en a $${bons.length}$. On les COMPTE sur l'arbre : la loi binomiale n'est pas au programme.`
          ),
        };
      }

      if (mode === "branche") {
        const echec = Math.random() < 0.6;
        const { choices, expected } = qcmNum(echec ? q : p, [echec ? p : q, r8(p / 2), r8(p * p)]);
        return {
          text:
            `${debut} ` +
            (echec
              ? pick(["Quelle probabilité faut-il écrire sur chaque branche $\\overline{S}$ ?", "Quelle probabilité porte une branche « échec » de l'arbre ?"])
              : pick([`Quelle probabilité porte une branche S du ${ORD[n]} niveau ?`, "Quelle probabilité faut-il écrire sur chaque branche S ?"])),
          format: "qcm",
          choices,
          expected,
          comparator: "mcq_exact",
          canvas,
          explanation: exp(
            "Les épreuves sont identiques : à chaque niveau, l'arbre porte les mêmes probabilités.",
            "Une branche S porte $p$ ; une branche $\\overline{S}$ porte $1 - p$, à tous les niveaux.",
            `Ici, $p = ${fr(p)}$ et $1 - p = 1 - ${fr(p)} = ${fr(q)}$.`,
            echec ? `Chaque branche $\\overline{S}$ porte $${fr(q)}$.` : `Chaque branche S porte $${fr(p)}$, au ${ORD[n]} niveau comme au premier.`
          ),
        };
      }

      if (mode === "chemin") {
        const c = pick(chemins(n));
        const v = probaChemin(c, p);
        const { choices, expected } = qcmNum(v, [
          // additionner au lieu de multiplier (filtré s'il dépasse 1)
          r8(c.reduce((acc, s) => acc + (s ? p : q), 0)),
          probaChemin(c.map((s) => !s), p),
          r8(p ** n),
          r8(q ** n),
        ]);
        return {
          text: `${debut} ${pick([`Quelle est la probabilité du chemin $${ecrireChemin(c)}$ ?`, `Quelle est la probabilité d'obtenir, dans cet ordre, $${ecrireChemin(c)}$ ?`])}`,
          format: "qcm",
          choices,
          expected,
          comparator: "mcq_exact",
          canvas,
          explanation: exp(
            "La probabilité d'un chemin est le PRODUIT des probabilités portées par ses branches.",
            "On lit $p$ pour chaque S et $1 - p$ pour chaque $\\overline{S}$, puis on multiplie (on n'additionne pas).",
            `$${facteurs(c, p)} = ${fr(v)}$.`,
            `La probabilité du chemin $${ecrireChemin(c)}$ vaut $${fr(v)}$.`
          ),
        };
      }

      // Au moins un succès : tous les chemins sauf un.
      return {
        text: `${debut} ${pick(["Combien de chemins comportent au moins un succès ?", "Combien de chemins contiennent au moins une fois S ?"])}`,
        format: "short",
        expected: [String(2 ** n - 1)],
        comparator: "number_equal",
        canvas,
        explanation: exp(
          "« Au moins un succès » est le contraire de « aucun succès ».",
          "Un seul chemin ne contient aucun S : celui qui prend toujours la branche $\\overline{S}$. On le retire du total.",
          `L'arbre a $2^{${n}} = ${2 ** n}$ chemins ; on retire le chemin $${ecrireChemin(Array(n).fill(false))}$ : $${2 ** n} - 1 = ${2 ** n - 1}$.`,
          `$${2 ** n - 1}$ chemins comportent au moins un succès.`
        ),
      };
    }
  ),

  /* ═══════════════ alea_bern_calculer ═══════════════ */

  // ★4 — UN chemin : que des succès, aucun succès, ou une suite précise.
  gab(
    "premiere_bern_calculer_tpl_1",
    "alea_bernoulli_calcul",
    "alea_bern_calculer",
    4,
    "Un seul chemin correspond : on multiplie les probabilités le long de ce chemin.",
    ["short"],
    () => {
      const { ctx, p } = tirerCtx();
      const n = pick([2, 3, 4] as const);
      const q = r8(1 - p);
      const mode = pick(["tous", "aucun", "suite", "premier"] as const);
      let c: boolean[];
      let question: string;
      if (mode === "tous") {
        c = Array(n).fill(true);
        question = pick([`Quelle est la probabilité que les $${n}$ épreuves soient toutes des succès ?`, `Calcule la probabilité de n'obtenir que des succès.`]);
      } else if (mode === "aucun") {
        c = Array(n).fill(false);
        question = pick([`Quelle est la probabilité de n'obtenir aucun succès ?`, `Calcule la probabilité que les $${n}$ épreuves soient toutes des échecs.`]);
      } else if (mode === "premier") {
        // Le premier succès arrive à l'épreuve j (échecs avant), la suite est libre… ou non :
        // on impose « succès seulement à l'épreuve j », un seul chemin.
        const j = 1 + Math.floor(Math.random() * n);
        c = Array.from({ length: n }, (_, i) => i === j - 1);
        question = pick([
          `Quelle est la probabilité que seule la ${ORD[j]} épreuve soit un succès ?`,
          `Calcule la probabilité d'obtenir un succès à la ${ORD[j]} épreuve et des échecs à toutes les autres.`,
        ]);
      } else {
        c = Array.from({ length: n }, () => Math.random() < 0.5);
        question = pick([`Quelle est la probabilité d'obtenir, dans cet ordre, $${ecrireChemin(c)}$ ?`, `Calcule $P(${ecrireChemin(c)})$.`]);
      }
      const v = probaChemin(c, p);
      return {
        text: `${ctx.intro} ${annonce(ctx, p)} ${repete(ctx, n)} ${question}`,
        format: "short",
        expected: reponses(v),
        comparator: "number_equal",
        canvas: canvasRepetition(p, n, `Répétition de ${n} épreuves`),
        explanation: exp(
          "La probabilité d'un chemin est le produit des probabilités portées par ses branches.",
          `Un seul chemin convient : $${ecrireChemin(c)}$. Chaque S compte pour $${fr(p)}$, chaque $\\overline{S}$ pour $1 - ${fr(p)} = ${fr(q)}$.`,
          `$${facteurs(c, p)} = ${fr(v)}$.`,
          `La probabilité vaut $${fr(v)}$ (valeur exacte).`
        ),
      };
    }
  ),

  // ★5 — exactement k succès : plusieurs chemins, on additionne.
  gab(
    "premiere_bern_calculer_tpl_2",
    "alea_bernoulli_calcul",
    "alea_bern_calculer",
    5,
    "Plusieurs chemins mènent à « exactement k succès » : on les compte, puis on additionne.",
    ["short"],
    () => {
      const { ctx, p } = tirerCtx();
      const n = pick([2, 3, 3, 4] as const);
      const k = 1 + Math.floor(Math.random() * (n - 1));
      const q = r8(1 - p);
      const bons = chemins(n).filter((c) => nbSucces(c) === k);
      const un = probaChemin(bons[0], p);
      const valeur = r8(bons.length * un);
      const question = pick([
        `Quelle est la probabilité d'obtenir EXACTEMENT $${k}$ succès ?`,
        `Calcule la probabilité que S se réalise exactement $${k}$ fois.`,
        `Quelle est la probabilité d'avoir exactement $${k}$ succès et $${n - k}$ échecs ?`,
      ]);
      return {
        text: `${ctx.intro} ${annonce(ctx, p)} ${repete(ctx, n)} ${question}`,
        format: "short",
        expected: reponses(valeur),
        comparator: "number_equal",
        canvas: canvasRepetition(p, n, `Répétition de ${n} épreuves`),
        explanation: exp(
          "La probabilité d'un évènement atteint par plusieurs chemins est la SOMME des probabilités de ces chemins.",
          `On repère tous les chemins comportant exactement $${k}$ succès : ils ont tous la même probabilité $${pw(p, k)} \\times ${pw(q, n - k)}$.`,
          `Chemins : ${bons.map((c) => `$${ecrireChemin(c)}$`).join(" ; ")} — il y en a $${bons.length}$. ` +
            `Chacun vaut $${facteurs(bons[0], p)} = ${fr(un)}$. ` +
            `Total : $${bons.length} \\times ${fr(un)} = ${fr(valeur)}$.`,
          `La probabilité vaut $${fr(valeur)}$. On COMPTE les chemins sur l'arbre : la loi binomiale n'est pas au programme.`
        ),
      };
    }
  ),

  /* ═══════════════ alea_bern_au_moins_un ═══════════════ */

  gab(
    "premiere_bern_au_moins_un_tpl_1",
    "alea_bernoulli_calcul",
    "alea_bern_au_moins_un",
    5,
    "Le contraire de « au moins un succès » est « aucun succès » — un seul chemin.",
    ["short"],
    () => {
      const { ctx, p } = tirerCtx();
      const n = pick([2, 3, 4] as const);
      const q = r8(1 - p);
      const mode = pick(["auMoinsS", "auMoinsS", "auMoinsE", "pasTous", "auPlusUn"] as const);
      const debut = `${ctx.intro} ${annonce(ctx, p)} ${repete(ctx, n)}`;
      const canvas = canvasRepetition(p, n, `Répétition de ${n} épreuves`);

      if (mode === "auPlusUn") {
        const zero = r8(q ** n);
        const un = r8(n * p * q ** (n - 1));
        const v = r8(zero + un);
        return {
          text: `${debut} ${pick(["Quelle est la probabilité d'obtenir AU PLUS un succès ?", "Calcule la probabilité que S se réalise au plus une fois."])}`,
          format: "short",
          expected: reponses(v),
          comparator: "number_equal",
          canvas,
          explanation: exp(
            "« Au plus un succès » signifie zéro succès OU exactement un succès : on additionne les deux.",
            `Aucun succès : un seul chemin. Exactement un succès : $${n}$ chemins (le succès à l'une des $${n}$ places), de même probabilité.`,
            `$P(0) = ${Array(n).fill(fr(q)).join(" \\times ")} = ${fr(zero)}$ ; ` +
              `$P(1) = ${n} \\times ${fr(p)} \\times ${Array(n - 1).fill(fr(q)).join(" \\times ")} = ${fr(un)}$ ; ` +
              `total : $${fr(zero)} + ${fr(un)} = ${fr(v)}$.`,
          `La probabilité vaut $${fr(v)}$.`
          ),
        };
      }

      // Les trois autres modes : 1 − (un seul chemin).
      const contraireTous = mode === "auMoinsE" || mode === "pasTous"; // contraire : que des succès
      const seul = contraireTous ? r8(p ** n) : r8(q ** n);
      const v = r8(1 - seul);
      const question =
        mode === "auMoinsS"
          ? pick([
              "Quelle est la probabilité d'obtenir AU MOINS un succès ?",
              "Calcule la probabilité que S se réalise au moins une fois.",
              `Quelle est la probabilité que, sur les $${n}$ épreuves, S se produise au moins une fois ?`,
            ])
          : mode === "auMoinsE"
            ? pick(["Quelle est la probabilité d'obtenir AU MOINS un échec ?", "Calcule la probabilité que $\\overline{S}$ se réalise au moins une fois."])
            : pick(["Quelle est la probabilité que les épreuves ne soient PAS toutes des succès ?", `Calcule la probabilité d'obtenir au plus $${n - 1}$ succès.`]);
      const nomContraire = contraireTous ? "que des succès" : "aucun succès";
      const branche = contraireTous ? fr(p) : fr(q);
      return {
        text: `${debut} ${question}`,
        format: "short",
        expected: reponses(v),
        comparator: "number_equal",
        canvas,
        explanation: exp(
          `L'évènement demandé est le contraire de « ${nomContraire} ».`,
          `Plutôt que d'additionner $${2 ** n - 1}$ chemins, on calcule le seul chemin « ${nomContraire} » et on le retire à $1$.`,
          `« ${nomContraire.charAt(0).toUpperCase() + nomContraire.slice(1)} » : $${Array(n).fill(branche).join(" \\times ")} = ${fr(seul)}$. ` +
            `Donc la probabilité cherchée vaut $1 - ${fr(seul)} = ${fr(v)}$.`,
          `La probabilité vaut $${fr(v)}$. Passer par l'évènement contraire évite d'additionner $${2 ** n - 1}$ chemins.`
        ),
      };
    }
  ),
];
