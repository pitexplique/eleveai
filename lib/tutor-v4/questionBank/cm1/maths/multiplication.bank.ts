// lib/tutor-v4/question-banks/maths/cm1/multiplication.bank.ts

import type {
  TutorBankItemV4,
  CalculPoseCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
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

function calculPoseCanvas(
  data: Omit<CalculPoseCanvasData, "kind">
): CalculPoseCanvasData {
  return { kind: "calcul_pose", ...data };
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

// ============================================================
// VARIER LES PHRASES, PAS SEULEMENT LES NOMBRES (05/10/2026)
// ------------------------------------------------------------
// Des élèves de 6e révisent ici la multiplication. Ils reconnaissent la
// PHRASE, pas les nombres : « 3 paquets de 7 » et « 4 paquets de 9 » sont la
// même question pour eux. Mesuré avant : 5 à 14 squelettes par micro, 13 à 19
// répétitions sur 20 (scripts/mesurer-squelettes-coach.ts). Chaque gabarit
// tire donc une SITUATION (lieu, groupes, objets) et une TOURNURE.
// ⛔ Aucun item figé ajouté : ils ne se renouvellent pas.
// ⛔ `expected[0]` toujours SANS espace (« 1530 ») : la transformation
// sans clavier (mathsKeyboardFreeTransform) ne sait pas lire « 1 530 ».
// ============================================================

type Prenom = { p: string; il: "il" | "elle" };

const PRENOMS: readonly Prenom[] = [
  { p: "Léa", il: "elle" },
  { p: "Noah", il: "il" },
  { p: "Inès", il: "elle" },
  { p: "Hugo", il: "il" },
  { p: "Maya", il: "elle" },
  { p: "Adam", il: "il" },
  { p: "Chloé", il: "elle" },
  { p: "Yanis", il: "il" },
  { p: "Jade", il: "elle" },
  { p: "Lucas", il: "il" },
  { p: "Sofia", il: "elle" },
  { p: "Malo", il: "il" },
  { p: "Nour", il: "elle" },
  { p: "Timéo", il: "il" },
  { p: "Zoé", il: "elle" },
  { p: "Ilyes", il: "il" },
  { p: "Aïcha", il: "elle" },
  { p: "Raphaël", il: "il" },
  { p: "Emma", il: "elle" },
  { p: "Kenzo", il: "il" },
];

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function minuscule(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/** 1530 → « 1 530 » (affichage seulement, jamais dans `expected`). */
function fmt(n: number) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/** Une situation de GROUPES ÉGAUX : des groupes qui ont chacun autant d'objets. */
type Situation = {
  lieu: string; // en tête de phrase : « À la bibliothèque »
  g: string; // groupes au pluriel : « étagères »
  gs: string; // au singulier : « étagère »
  fem: boolean; // « chacune » ou « chacun »
  o: string; // objets au pluriel : « livres »
  deO: string; // « de livres », « d’œufs »
  verbe: string; // au pluriel : « portent »
  verbeS: string; // au singulier : « porte »
  sur: boolean; // « sur chaque étagère » ou « dans chaque boîte »
};

// Une seule situation réunionnaise (le marché de Saint-Paul) parmi vingt.
const SITUATIONS: readonly Situation[] = [
  { lieu: "À l’école", g: "boîtes", gs: "boîte", fem: true, o: "crayons", deO: "de crayons", verbe: "contiennent", verbeS: "contient", sur: false },
  { lieu: "Dans la cuisine", g: "plaques", gs: "plaque", fem: true, o: "cookies", deO: "de cookies", verbe: "portent", verbeS: "porte", sur: true },
  { lieu: "Au tournoi de handball", g: "équipes", gs: "équipe", fem: true, o: "joueurs", deO: "de joueurs", verbe: "comptent", verbeS: "compte", sur: false },
  { lieu: "Au jardin", g: "rangées", gs: "rangée", fem: true, o: "salades", deO: "de salades", verbe: "comptent", verbeS: "compte", sur: false },
  { lieu: "Au supermarché", g: "paquets", gs: "paquet", fem: false, o: "biscuits", deO: "de biscuits", verbe: "contiennent", verbeS: "contient", sur: false },
  { lieu: "À la bibliothèque", g: "étagères", gs: "étagère", fem: true, o: "livres", deO: "de livres", verbe: "portent", verbeS: "porte", sur: true },
  { lieu: "À la ferme", g: "cartons", gs: "carton", fem: false, o: "œufs", deO: "d’œufs", verbe: "contiennent", verbeS: "contient", sur: false },
  { lieu: "À la fête de l’école", g: "tables", gs: "table", fem: true, o: "invités", deO: "d’invités", verbe: "accueillent", verbeS: "accueille", sur: false },
  { lieu: "Au verger", g: "caisses", gs: "caisse", fem: true, o: "pommes", deO: "de pommes", verbe: "contiennent", verbeS: "contient", sur: false },
  { lieu: "Au cinéma", g: "rangées", gs: "rangée", fem: true, o: "fauteuils", deO: "de fauteuils", verbe: "comptent", verbeS: "compte", sur: false },
  { lieu: "Dans le train", g: "wagons", gs: "wagon", fem: false, o: "voyageurs", deO: "de voyageurs", verbe: "transportent", verbeS: "transporte", sur: false },
  { lieu: "À la papeterie", g: "lots", gs: "lot", fem: false, o: "cahiers", deO: "de cahiers", verbe: "contiennent", verbeS: "contient", sur: false },
  { lieu: "À la piscine", g: "couloirs", gs: "couloir", fem: false, o: "nageurs", deO: "de nageurs", verbe: "accueillent", verbeS: "accueille", sur: false },
  { lieu: "Au marché de Saint-Paul", g: "barquettes", gs: "barquette", fem: true, o: "letchis", deO: "de letchis", verbe: "contiennent", verbeS: "contient", sur: false },
  { lieu: "À l’atelier bijoux", g: "sachets", gs: "sachet", fem: false, o: "perles", deO: "de perles", verbe: "contiennent", verbeS: "contient", sur: false },
  { lieu: "Chez le fleuriste", g: "bouquets", gs: "bouquet", fem: false, o: "roses", deO: "de roses", verbe: "comptent", verbeS: "compte", sur: false },
  { lieu: "Au gymnase", g: "filets", gs: "filet", fem: false, o: "ballons", deO: "de ballons", verbe: "contiennent", verbeS: "contient", sur: false },
  { lieu: "À la boulangerie", g: "plateaux", gs: "plateau", fem: false, o: "croissants", deO: "de croissants", verbe: "portent", verbeS: "porte", sur: true },
  { lieu: "Au zoo", g: "enclos", gs: "enclos", fem: false, o: "chèvres", deO: "de chèvres", verbe: "abritent", verbeS: "abrite", sur: false },
  { lieu: "En classe", g: "groupes", gs: "groupe", fem: false, o: "élèves", deO: "d’élèves", verbe: "comptent", verbeS: "compte", sur: false },
];

// Les situations qui restent plausibles avec BEAUCOUP de groupes ou beaucoup
// d'objets par groupe (34 étagères de 20 livres, oui ; 34 couloirs de 20
// nageurs, non).
const GRANDES: readonly Situation[] = SITUATIONS.filter((s) =>
  [
    "crayons",
    "biscuits",
    "livres",
    "œufs",
    "pommes",
    "fauteuils",
    "salades",
    "cahiers",
    "perles",
    "croissants",
    "letchis",
  ].includes(s.o),
);

/** « de livres », « d’étagères » : l'élision devant une voyelle. */
function de(mot: string) {
  return /^[aeiouyéèêàâîôœ]/i.test(mot) ? `d’${mot}` : `de ${mot}`;
}

function chacun(s: Situation) {
  return s.fem ? "chacune" : "chacun";
}

function dans(s: Situation) {
  return s.sur ? "sur" : "dans";
}

/**
 * Énoncé « a groupes de b objets, combien en tout ? » : une situation tirée
 * au hasard × une tournure parmi cinq (≈ 100 phrases différentes).
 */
function enonceGroupes(s: Situation, a: number, b: number): string {
  const qui = randomChoice(PRENOMS);
  return randomChoice([
    () => `${s.lieu}, il y a ${a} ${s.g} de ${b} ${s.o}. Combien y a-t-il ${s.deO} en tout ?`,
    () => `${s.lieu}, ${a} ${s.g} ${s.verbe} ${chacun(s)} ${b} ${s.o}. Combien ${s.deO} cela fait-il au total ?`,
    () => `${s.lieu}, il y a ${b} ${s.o} ${dans(s)} chaque ${s.gs}. Combien y a-t-il ${s.deO} ${dans(s)} les ${a} ${s.g} ?`,
    () => `${qui.p} compte ${a} ${s.g} de ${b} ${s.o} ${minuscule(s.lieu)}. Combien ${s.deO} compte-t-${qui.il} en tout ?`,
    () => `${s.lieu}, on compte ${a} ${s.g}. ${cap(chacun(s))} ${s.verbeS} ${b} ${s.o}. Quel est le nombre total ${s.deO} ?`,
  ])();
}

function explicationGroupes(s: Situation, a: number, b: number) {
  const t = a * b;
  return exp(
    "La multiplication sert à compter des groupes égaux.",
    `On multiplie le nombre ${de(s.g)} par le nombre ${s.deO} ${dans(s)} chaque ${s.gs}.`,
    `${a} × ${b} = ${fmt(t)}.`,
    `Il y a ${fmt(t)} ${s.o} en tout.`
  );
}

type Tournure = () => string;

/**
 * Tire d'abord dans les tournures PROPRES au gabarit (« le double de… »),
 * sinon dans le fonds commun (« Calcule : … »). Le fonds commun est partagé
 * par tous les gabarits d'une micro : s'il pesait autant que le reste, ses
 * phrases reviendraient d'un gabarit à l'autre.
 */
function tirer(extras: Tournure[], base: Tournure[]): string {
  // Une tournure du fonds commun pèse moitié moins qu'une tournure propre.
  const partExtras = extras.length / (extras.length + base.length / 2);
  return (Math.random() < partExtras ? randomChoice(extras) : randomChoice(base))();
}

/**
 * « a × b » posé de mille façons : calcul nu, mais phrase qui change.
 * ⚠️ Les tournures propres à un gabarit s'AJOUTENT à la liste (`extras`) au
 * lieu d'être tirées à part : tirer « enonceProduit » une fois sur trois et
 * deux phrases fixes le reste du temps faisait revenir ces deux phrases un
 * tirage sur trois (mesuré : 4 phrases « efficaces » pour 52 différentes).
 */
function enonceProduit(
  a: number | string,
  b: number | string,
  extras: Tournure[] = [],
): string {
  const qui = randomChoice(PRENOMS);
  const ami = randomChoice(PRENOMS.filter((x) => x.p !== qui.p));
  return tirer(extras, [
    () => `Écris le résultat de ${a} × ${b}.`,
    () => `Combien obtient-on en multipliant ${a} par ${b} ?`,
    () => `${qui.p} et ${ami.p} jouent aux tables. ${ami.p} demande : « ${a} × ${b} ? ». Que doit répondre ${qui.p} ?`,
    () => `Quel nombre se cache derrière ${a} × ${b} ?`,
    () => `Le produit ${a} × ${b} est égal à combien ?`,
    () => `Calcule : ${a} × ${b}.`,
    () => `Combien font ${a} × ${b} ?`,
    () => `Quel est le produit de ${a} et de ${b} ?`,
    () => `${a} fois ${b}, cela fait combien ?`,
    () => `Complète : ${a} × ${b} = …`,
    () => `Que vaut ${a} × ${b} ?`,
    () => `Multiplie ${a} par ${b}. Quel nombre obtiens-tu ?`,
    () => `${a} multiplié par ${b}, combien cela fait-il ?`,
    () => `Trouve le résultat de ${a} × ${b}.`,
    () => `Sur son ardoise, ${qui.p} doit écrire le résultat de ${a} × ${b}. Que doit-${qui.il} écrire ?`,
    () => `La maîtresse demande : « ${a} × ${b} ? ». Quelle est la bonne réponse ?`,
    () => `${qui.p} tape ${a} × ${b} sur la calculatrice. Quel nombre s’affiche ?`,
  ]);
}

/**
 * « A-t-il raison ? » : l'égalité annoncée est juste une fois sur deux, sinon
 * l'élève apprend à répondre « non » sans calculer.
 */
function enonceVerifier(gauche: string, annonce: string, juste: boolean) {
  const qui = randomChoice(PRENOMS);
  const [question, oui, non] = randomChoice([
    [`${qui.p} affirme que ${gauche} = ${annonce}. A-t-${qui.il} raison ?`, "oui", "non"],
    [`Sur son ardoise, ${qui.p} a écrit : ${gauche} = ${annonce}. Est-ce juste ?`, "oui", "non"],
    [`Vrai ou faux : ${gauche} = ${annonce}.`, "vrai", "faux"],
    [`Au tableau, on lit : ${gauche} = ${annonce}. Cette égalité est-elle vraie ?`, "oui", "non"],
    [`${qui.p} pense que ${gauche} fait ${annonce}. Est-ce correct ?`, "oui", "non"],
    [`Dans son cahier, ${qui.p} a calculé ${gauche} et trouvé ${annonce}. Son résultat est-il juste ?`, "oui", "non"],
  ] as const);
  return {
    text: question,
    choices: [oui, non],
    expected: [juste ? oui : non],
  };
}

/** Calcul mental : la consigne change, le calcul reste nu. */
function enonceMental(
  a: number | string,
  b: number | string,
  extras: Tournure[] = [],
): string {
  const qui = randomChoice(PRENOMS);
  return tirer(extras, [
    () => `${qui.p} te lance un défi : ${a} × ${b}, de tête !`,
    () => `À l’oral, la maîtresse demande ${a} × ${b}. Quelle réponse donner ?`,
    () => `Calcul mental chronométré : ${a} × ${b} = ?`,
    () => `Trouve de tête le produit ${a} × ${b}.`,
    () => `${qui.p} n’a pas de brouillon. Combien trouve-t-${qui.il} pour ${a} × ${b} ?`,
    () => `Calcule mentalement : ${a} × ${b}.`,
    () => `De tête, combien font ${a} × ${b} ?`,
    () => `Sans poser l’opération, calcule ${a} × ${b}.`,
    () => `Calcul mental : ${a} × ${b} = …`,
    () => `${qui.p} calcule ${a} × ${b} dans sa tête. Que doit-${qui.il} trouver ?`,
    () => `Calcule de tête le produit de ${a} par ${b}.`,
    () => `Vite, de tête : ${a} fois ${b} ?`,
    () => `Quel est le résultat de ${a} × ${b} ? Calcule-le sans poser.`,
  ]);
}

// Des objets qu'on collectionne ou qu'on compte (« deux fois plus de… »).
const COLLECTIONS = [
  "billes",
  "cartes",
  "timbres",
  "autocollants",
  "coquillages",
  "figurines",
  "points",
  "images",
] as const;

// Des objets à l'unité, tous masculins : « Un livre coûte 14 €. »
const ARTICLES: readonly [string, string][] = [
  ["livre", "livres"],
  ["ballon", "ballons"],
  ["jeu de société", "jeux de société"],
  ["sac à dos", "sacs à dos"],
  ["puzzle", "puzzles"],
  ["T-shirt", "T-shirts"],
  ["casque de vélo", "casques de vélo"],
  ["maillot de foot", "maillots de foot"],
];

/** Multiplication posée : même calcul, consigne qui change. */
function enoncePose(a: number, b: number, extras: Tournure[] = []): string {
  const qui = randomChoice(PRENOMS);
  return tirer(extras, [
    () => `Pose et effectue : ${a} × ${b}.`,
    () => `Effectue la multiplication ${a} × ${b} en la posant.`,
    () => `${qui.p} vérifie son calcul de ${a} × ${b} en le posant. Quel résultat doit-${qui.il} trouver ?`,
    () => `Sur ton cahier, pose ${a} × ${b}. Quel nombre trouves-tu ?`,
    () => `Multiplication posée : ${a} × ${b} = ?`,
    () => `${qui.p} a oublié sa calculatrice. ${cap(qui.il)} pose ${a} × ${b}. Que trouve-t-${qui.il} ?`,
    () => `Pose et calcule : ${a} × ${b}.`,
    () => `Calcule en posant l’opération : ${a} × ${b}.`,
    () => `Pose la multiplication ${a} × ${b}. Quel résultat trouves-tu ?`,
    () => `Quel est le résultat de la multiplication posée ${a} × ${b} ?`,
    () => `${qui.p} pose ${a} × ${b} dans son cahier. Quel résultat doit-${qui.il} trouver ?`,
    () => `Écris ${a}, puis × ${b} en dessous, et calcule. Quel nombre obtiens-tu ?`,
    () => `Pose ${a} × ${b} en colonnes. Quel est le produit ?`,
    () => `Calcule : ${a} × ${b}.`,
  ]);
}

/** Le canvas d'une multiplication posée, résultat caché. */
function canvasPose(a: number, b: number, title: string, questionLabel: string) {
  return calculPoseCanvas({
    operation: "multiplication",
    title,
    numbers: [String(a), String(b)],
    result: String(a * b),
    questionLabel,
    display: {
      showResult: false,
      showRetenues: false,
    },
  });
}

/** Un nombre dont chaque chiffre, multiplié par b, reste sous 10 : aucune retenue. */
function sansRetenue(chiffres: number, b: number) {
  const max = Math.floor(9 / b);
  let n = 0;
  for (let i = 0; i < chiffres; i++) n = n * 10 + randomInt(1, max);
  return n;
}

// ⛔ Multiplier par 10, 100, 1 000 s'explique par la VALEUR DES CHIFFRES :
// chaque chiffre monte d'une, deux, trois colonnes (« 4 dizaines deviennent
// 4 centaines, 5 unités deviennent 5 dizaines : 450 »). Jamais « on ajoute
// un zéro » (décision de Frédéric, 05/10/2026) : la règle donne 3,47 × 10 =
// 3,470 en 6e. Le raccourci « la virgule se décale » vient APRÈS la raison,
// et seulement pour les décimaux (aucun ici, la banque CM1 reste en entiers).

/** n × 10, 100 ou 1 000, avec une consigne qui change. */
function enonceP10(n: number, f: number, extras: Tournure[] = []): string {
  const F = fmt(f);
  const qui = randomChoice(PRENOMS);
  return enonceProduit(n, F, [
    ...extras,
    () => `Quel nombre est ${F} fois plus grand que ${n} ?`,
    () => `Écris le nombre égal à ${n} × ${F}.`,
    () => `On rend ${n} plus grand en le multipliant par ${F}. Quel nombre obtient-on ?`,
    () => `${qui.p} écrit ${n} puis le multiplie par ${F}. Quel nombre écrit-${qui.il} ensuite ?`,
    () => `Sans calculatrice : ${n} × ${F} = ?`,
  ]);
}

const RANGS: readonly [string, string][] = [
  ["unité", "unités"],
  ["dizaine", "dizaines"],
  ["centaine", "centaines"],
  ["millier", "milliers"],
  ["dizaine de milliers", "dizaines de milliers"],
  ["centaine de milliers", "centaines de milliers"],
  ["million", "millions"],
];

/** « Multiplier par 10, c'est rendre chaque chiffre dix fois plus grand : il monte d'une colonne. » */
function methodeP10(f: number) {
  return f === 10
    ? "Multiplier par 10, c’est rendre chaque chiffre dix fois plus grand : il monte d’une colonne."
    : f === 100
      ? "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes."
      : "Multiplier par 1 000, c’est rendre chaque chiffre mille fois plus grand : il monte de trois colonnes.";
}

/** « 4 dizaines deviennent 4 centaines, 5 unités deviennent 5 dizaines : 45 × 10 = 450 » */
function calculP10(n: number, f: number) {
  const k = String(f).length - 1;
  const chiffres = String(n);
  const morceaux: string[] = [];
  chiffres.split("").forEach((c, i) => {
    const d = Number(c);
    if (d === 0) return;
    const r = chiffres.length - 1 - i;
    const un = d === 1 ? 0 : 1;
    morceaux.push(`${d} ${RANGS[r][un]} ${d === 1 ? "devient" : "deviennent"} ${d} ${RANGS[r + k][un]}`);
  });
  return `${cap(morceaux.join(", "))} : ${n} × ${fmt(f)} = ${fmt(n * f)}`;
}

function explicationP10(n: number, f: number) {
  const F = fmt(f);
  return exp(
    `Multiplier par ${F} rend un nombre ${F} fois plus grand.`,
    methodeP10(f),
    `${calculP10(n, f)}.`,
    `Le résultat est ${fmt(n * f)}.`
  );
}

/**
 * Multiplication par un nombre à DEUX chiffres (23 × 14), expliquée par la
 * valeur des chiffres (décision de Frédéric, 05/10/2026) : 23 × 14, c'est
 * 23 × 4 unités, puis 23 × 1 dizaine = 23 dizaines = 230. ⛔ Jamais « on met
 * un zéro au début de la deuxième ligne » comme recette.
 */
function deuxChiffres(a: number, b: number) {
  const u = b % 10;
  const d = Math.floor(b / 10);
  const l1 = a * u;
  const l2 = a * d * 10;
  return { u, d, l1, l2, r: a * b };
}

function explicationDeuxChiffres(a: number, b: number) {
  const { u, d, l1, l2, r } = deuxChiffres(a, b);
  const diz = d === 1 ? "dizaine" : "dizaines";
  return exp(
    `Multiplier par ${b}, c’est multiplier par ${u} unités, puis par ${d} ${diz}, et additionner.`,
    "Première ligne : les unités. Deuxième ligne : les dizaines ; elle compte des dizaines, d’où le décalage d’une colonne vers la gauche.",
    `${a} × ${u} = ${fmt(l1)}. Puis ${a} × ${d} ${diz} = ${a * d} dizaines = ${fmt(l2)}. On additionne : ${fmt(l1)} + ${fmt(l2)} = ${fmt(r)}.`,
    `${a} × ${b} = ${fmt(r)}.`
  );
}

/** Deux nombres à deux chiffres, unités du multiplicateur non nulles. */
function tirerDeuxChiffres(bMax: number) {
  const a = randomInt(12, 98);
  const b = randomInt(1, Math.floor(bMax / 10)) * 10 + randomInt(2, 9);
  return { a, b };
}

// Des actions pour la nature, faites par plusieurs groupes égaux.
type ActionNature = {
  qui: string;
  fem: boolean;
  verbe: string;
  o: string;
  oFem: boolean; // « comptées » ou « comptés »
  deO: string;
  ou: string;
};

const ACTIONS_NATURE: readonly ActionNature[] = [
  { qui: "groupes", fem: false, verbe: "ramassent", o: "déchets", oFem: false, deO: "de déchets", ou: "sur une plage" },
  { qui: "classes", fem: true, verbe: "plantent", o: "arbres", oFem: false, deO: "d’arbres", ou: "au bord de la rivière" },
  { qui: "équipes", fem: true, verbe: "trient", o: "bouteilles en plastique", oFem: true, deO: "de bouteilles en plastique", ou: "pour le recyclage" },
  { qui: "jardiniers", fem: false, verbe: "plantent", o: "fleurs", oFem: true, deO: "de fleurs", ou: "pour les abeilles" },
  { qui: "bénévoles", fem: false, verbe: "ramassent", o: "canettes", oFem: true, deO: "de canettes", ou: "au bord de la route" },
  { qui: "familles", fem: true, verbe: "rapportent", o: "piles usagées", oFem: true, deO: "de piles usagées", ou: "à la collecte" },
  { qui: "élèves", fem: false, verbe: "comptent", o: "oiseaux", oFem: false, deO: "d’oiseaux", ou: "pendant la sortie" },
];

export const multiplicationBank: TutorBankItemV4[] = [
  // ============================================================
  // MULTIPLICATION_TABLE
  // Connaître les tables de multiplication
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_multiplication_table_fixed_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 6 × 7",
    format: "short",
    expected: ["42"],
    comparator: "number_equal",
    hint: "Pense à la table de 6 ou à la table de 7.",
    explanation: exp(
      "Une table de multiplication permet de connaître rapidement certains produits.",
      "On utilise la table de 6 ou la table de 7.",
      "6 × 7 = 42.",
      "La réponse est 42."
    ),
    tags: ["cm1", "multiplication", "table", "automatisme"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_table_fixed_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 1,
    theme: "neutral",
    text: "8 × 5 = ?",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "8 × 5, c’est aussi 5 × 8.",
    explanation: exp(
      "Dans une multiplication, on peut changer l’ordre des facteurs.",
      "On utilise une table connue.",
      "8 × 5 = 40.",
      "La réponse est 40."
    ),
    tags: ["cm1", "multiplication", "table", "commutativite"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_table_fixed_3",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 1,
    theme: "neutral",
    text: "Donne le résultat de 9 × 4.",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 9 ou de 4.",
    explanation: exp(
      "Les tables de multiplication permettent de calculer sans poser l’opération.",
      "On cherche le produit dans une table connue.",
      "9 × 4 = 36.",
      "La réponse est 36."
    ),
    tags: ["cm1", "multiplication", "table", "automatisme"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_table_fixed_4_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 7 × ? = 56",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 7.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver un facteur manquant.",
      "On cherche quel nombre multiplié par 7 donne 56.",
      "7 × 8 = 56.",
      "Le nombre manquant est 8."
    ),
    tags: ["cm1", "multiplication", "table", "facteur_manquant"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_table_fixed_5_inverse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : ? × 9 = 63",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche quel nombre multiplié par 9 donne 63.",
    explanation: exp(
      "On peut utiliser les tables pour retrouver un facteur manquant.",
      "On cherche dans la table de 9.",
      "7 × 9 = 63.",
      "Le nombre manquant est 7."
    ),
    tags: ["cm1", "multiplication", "table", "facteur_manquant"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_table_fixed_6_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    text: "Quel produit est égal à 36 ?",
    format: "qcm",
    choices: ["4 × 9", "5 × 8", "6 × 7", "3 × 11"],
    expected: ["4 × 9"],
    comparator: "mcq_exact",
    hint: "Cherche un calcul qui donne 36.",
    explanation: exp(
      "Un produit est le résultat d’une multiplication.",
      "On calcule ou on reconnaît chaque produit proposé.",
      "4 × 9 = 36.",
      "Le produit égal à 36 est 4 × 9."
    ),
    tags: ["cm1", "multiplication", "table", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_table_fixed_7_piege",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève dit que 6 × 8 = 46. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie dans la table de 6 ou de 8.",
    explanation: exp(
      "Une table de multiplication doit être vérifiée avec précision.",
      "On calcule le produit annoncé.",
      "6 × 8 = 48, et non 46.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "multiplication", "table", "erreur", "piege"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_table_fixed_8_commutativite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul donne le même résultat que 4 × 8 ?",
    format: "qcm",
    choices: ["8 × 4", "8 + 4", "8 - 4", "4 × 4"],
    expected: ["8 × 4"],
    comparator: "mcq_exact",
    hint: "Dans une multiplication, on peut échanger l’ordre des facteurs.",
    explanation: exp(
      "La multiplication est commutative : on peut changer l’ordre des facteurs.",
      "On échange les deux nombres de la multiplication.",
      "4 × 8 = 8 × 4 = 32.",
      "Le calcul équivalent est 8 × 4."
    ),
    tags: ["cm1", "multiplication", "table", "commutativite", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_multiplication_table_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 1,
    theme: "neutral",
    hint: "Utilise tes tables de multiplication.",
    tags: ["cm1", "multiplication", "table", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
      const b = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
      const result = a * b;

      return {
        text: enonceProduit(a, b, [
          () => `Dans la table de ${a}, combien vaut ${a} × ${b} ?`,
          () => `Récite la table de ${a} : ${a} × ${b} = ?`,
        ]),
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Les tables de multiplication permettent de calculer rapidement.",
          "On cherche le produit des deux facteurs.",
          `${a} × ${b} = ${result}.`,
          `La réponse est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_table_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche dans la table du nombre donné.",
    tags: ["cm1", "multiplication", "table", "facteur_manquant", "template"],
    generate: () => {
      const a = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const missing = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
      const result = a * missing;
      const qui = randomChoice(PRENOMS);

      return {
        text: randomChoice([
          () => `Complète : ${a} × ? = ${result}`,
          () => `Quel nombre manque ? ? × ${a} = ${result}`,
          () => `Par quel nombre faut-il multiplier ${a} pour obtenir ${result} ?`,
          () => `${a} fois combien font ${result} ?`,
          () => `Dans la table de ${a}, quel nombre multiplié par ${a} donne ${result} ?`,
          () => `Trouve le nombre manquant : ${a} × … = ${result}.`,
          () => `${qui.p} pense à un nombre. ${cap(qui.il)} le multiplie par ${a} et obtient ${result}. À quel nombre a-t-${qui.il} pensé ?`,
          () => `${qui.p} récite la table de ${a} et arrive à ${result}. Combien de fois ${a} a-t-${qui.il} compté ?`,
          () => `${result} = ${a} × ? Quel est le nombre caché ?`,
        ])(),
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication à trou demande de retrouver un facteur.",
          "On cherche quel nombre multiplié par le facteur connu donne le résultat.",
          `${a} × ${missing} = ${result}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_table_tpl_3_qcm_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule chaque produit proposé si besoin.",
    tags: ["cm1", "multiplication", "table", "qcm", "template"],
    generate: () => {
      const a = randomChoice([4, 5, 6, 7, 8, 9]);
      const b = randomChoice([3, 4, 5, 6, 7, 8]);
      const result = a * b;

      const correct = `${a} × ${b}`;
      const qui = randomChoice(PRENOMS);

      // ⚠️ On filtre sur la VALEUR : (a − 1) × (b + 1) vaut a × b dès que
      // a = b + 1 (5 × 4 et 4 × 5…), et l'élève voyait deux bonnes réponses.
      const wrongs = [
        [a, b - 1],
        [a, b + 1],
        [a + 1, b],
        [a - 1, b],
        [a - 1, b + 1],
        [a + 1, b - 1],
      ]
        .filter(([x, y]) => x >= 2 && y >= 2 && x * y !== result)
        .map(([x, y]) => `${x} × ${y}`);

      return {
        text: randomChoice([
          () => `Quel produit est égal à ${result} ?`,
          () => `Quelle multiplication donne ${result} ?`,
          () => `Lequel de ces calculs fait ${result} ?`,
          () => `Choisis le calcul dont le résultat est ${result}.`,
          () => `${result} est le résultat de quelle multiplication ?`,
          () => `${qui.p} a trouvé ${result} en faisant une multiplication. Laquelle ?`,
          () => `Dans quelle table trouve-t-on ${result} ? Choisis le bon calcul.`,
        ])(),
        format: "qcm",
        choices: makeChoices(correct, wrongs),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un produit est le résultat d’une multiplication.",
          "On cherche quelle multiplication donne le nombre demandé.",
          `${a} × ${b} = ${result}.`,
          `Le bon produit est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_table_tpl_4_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie le produit avec ta table.",
    tags: ["cm1", "multiplication", "table", "erreur", "template"],
    generate: () => {
      const a = randomChoice([6, 7, 8, 9]);
      const b = randomChoice([3, 4, 6, 7, 8, 9]);
      const correct = a * b;
      const juste = Math.random() < 0.5;
      // Le faux résultat est une erreur d'élève : la case voisine de la table.
      const annonce = juste ? correct : correct + randomChoice([-a, a, -b, b, -2, 2]);
      const q = enonceVerifier(`${a} × ${b}`, String(annonce), juste);

      return {
        text: q.text,
        format: "qcm",
        choices: q.choices,
        expected: q.expected,
        comparator: "mcq_exact",
        explanation: exp(
          "Une erreur dans une table peut changer tout le calcul.",
          "On recalcule le produit avec la table et on compare.",
          juste
            ? `${a} × ${b} = ${correct} : c’est bien le résultat annoncé.`
            : `${a} × ${b} = ${correct}, et non ${annonce}.`,
          juste ? "L’égalité est juste." : "L’égalité est fausse."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_table_tpl_5_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque groupe contient le même nombre d’objets : on multiplie.",
    tags: ["cm1", "multiplication", "table", "groupes_egaux", "template"],
    generate: () => {
      // Le marché de Saint-Pierre seul revenait à chaque tirage : il devient
      // une situation parmi vingt (le marché réunionnais y reste, une fois).
      const s = randomChoice(SITUATIONS);
      const a = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const b = randomChoice([4, 5, 6, 7, 8, 9]);

      return {
        text: enonceGroupes(s, a, b),
        format: "short",
        expected: [String(a * b)],
        comparator: "number_equal",
        explanation: explicationGroupes(s, a, b),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_table_tpl_6_groupes_petites_tables",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 1,
    theme: "neutral",
    hint: "Autant d’objets dans chaque groupe : on multiplie.",
    tags: ["cm1", "multiplication", "table", "groupes_egaux", "template"],
    generate: () => {
      const s = randomChoice(SITUATIONS);
      const a = randomChoice([2, 3, 4, 5]);
      const b = randomChoice([2, 3, 4, 5, 6, 7, 8, 9, 10]);

      return {
        text: enonceGroupes(s, a, b),
        format: "short",
        expected: [String(a * b)],
        comparator: "number_equal",
        explanation: explicationGroupes(s, a, b),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_table_tpl_7_addition_repetee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte combien de fois le même nombre est ajouté.",
    tags: ["cm1", "multiplication", "table", "addition_repetee", "template"],
    generate: () => {
      const n = randomChoice([3, 4, 5]);
      const v = randomChoice([2, 3, 6, 7, 8, 9].filter((x) => x !== n));
      const somme = Array(n).fill(v).join(" + ");
      const correct = `${n} × ${v}`;
      const qui = randomChoice(PRENOMS);

      const explanation = exp(
        "Une addition répétée du même nombre peut s’écrire avec une multiplication.",
        `Le nombre ${v} est ajouté ${n} fois.`,
        `${somme} = ${n} × ${v} = ${n * v}.`,
        `${somme} s’écrit ${correct} et vaut ${n * v}.`
      );

      // Deux façons de prendre la question : reconnaître le calcul (QCM) ou
      // trouver le résultat en passant par la table (réponse numérique).
      if (Math.random() < 0.5) {
        return {
          text: randomChoice([
            () => `Quel calcul correspond à ${somme} ?`,
            () => `Quelle multiplication remplace ${somme} ?`,
            () => `${somme}, c’est la même chose que :`,
            () => `Écris ${somme} avec le signe × :`,
            () => `${qui.p} ajoute ${n} fois le nombre ${v}. Quelle multiplication peut-${qui.il} faire à la place ?`,
          ])(),
          format: "qcm",
          choices: makeChoices(correct, [
            `${v} × ${v}`,
            `${n} + ${v}`,
            `${n + 1} × ${v}`,
            `${n - 1} × ${v}`,
          ]),
          expected: [correct],
          comparator: "mcq_exact",
          explanation,
        };
      }
      return {
        text: randomChoice([
          () => `Calcule ${somme} en utilisant une table de multiplication.`,
          () => `Combien font ${somme} ?`,
          () => `${qui.p} ajoute ${n} fois le nombre ${v}. Quel résultat trouve-t-${qui.il} ?`,
          () => `Combien font ${n} fois ${v} ? (C’est ${somme}.)`,
        ])(),
        format: "short",
        expected: [String(n * v)],
        comparator: "number_equal",
        explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_table_tpl_8_dans_la_table",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Récite la table et regarde si tu tombes sur ce nombre.",
    tags: ["cm1", "multiplication", "table", "dans_la_table", "template"],
    generate: () => {
      const a = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const k = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const oui = Math.random() < 0.5;
      // Le « non » tombe entre deux cases de la table, jamais sur une autre.
      const r = oui ? a * k : a * k + randomInt(1, a - 1);
      const qui = randomChoice(PRENOMS);
      const voisinBas = Math.floor(r / a) * a;

      return {
        text: randomChoice([
          () => `Le nombre ${r} est-il dans la table de ${a} ?`,
          () => `Peut-on trouver ${r} dans la table de ${a} ?`,
          () => `${qui.p} récite la table de ${a}. Va-t-${qui.il} dire ${r} ?`,
          () => `En comptant de ${a} en ${a} à partir de 0, tombe-t-on sur ${r} ?`,
          () => `${qui.p} range des objets par paquets de ${a}, sans reste. Peut-${qui.il} en avoir exactement ${r} ?`,
        ])(),
        format: "qcm",
        choices: ["oui", "non"],
        expected: [oui ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          `Un nombre est dans la table de ${a} s’il est égal à ${a} × un nombre entier.`,
          `On cherche un nombre qui, multiplié par ${a}, donne ${r}.`,
          oui
            ? `${a} × ${k} = ${r}.`
            : `${a} × ${voisinBas / a} = ${voisinBas} et ${a} × ${voisinBas / a + 1} = ${voisinBas + a} : ${r} tombe entre les deux.`,
          oui
            ? `Oui, ${r} est dans la table de ${a}.`
            : `Non, ${r} n’est pas dans la table de ${a}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_table_tpl_9_plus_grand_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule chaque produit avec tes tables, puis compare.",
    tags: ["cm1", "multiplication", "table", "comparer", "qcm", "template"],
    generate: () => {
      // Quatre produits de valeurs différentes, choisis près les uns des
      // autres (6 × 8, 7 × 7, 5 × 9…) pour qu'il faille vraiment calculer.
      const produits: [number, number][] = [];
      const valeurs = new Set<number>();
      let essais = 0;
      while (produits.length < 4 && essais < 200) {
        essais++;
        const x = randomInt(3, 9);
        const y = randomInt(3, 9);
        const v = x * y;
        if (valeurs.has(v)) continue;
        if (produits.length && Math.abs(v - produits[0][0] * produits[0][1]) > 20) continue;
        produits.push([x, y]);
        valeurs.add(v);
      }
      while (produits.length < 4) {
        // Filet de sécurité : n'arrive pratiquement jamais.
        const x = produits.length + 2;
        produits.push([x, 10]);
      }
      const plusGrand = Math.random() < 0.5;
      const cible = [...produits].sort((p, q) =>
        plusGrand ? q[0] * q[1] - p[0] * p[1] : p[0] * p[1] - q[0] * q[1],
      )[0];
      const correct = `${cible[0]} × ${cible[1]}`;
      const mot = plusGrand ? "le plus grand" : "le plus petit";
      const qui = randomChoice(PRENOMS);

      return {
        text: randomChoice([
          () => `Lequel de ces produits est ${mot} ?`,
          () => `Quel calcul donne le résultat ${mot} ?`,
          () => `Sans te tromper de table : quel produit est ${mot} ?`,
          () => `${qui.p} doit entourer le produit ${mot}. Lequel ?`,
          () => `Calcule de tête et choisis le produit ${mot}.`,
        ])(),
        format: "qcm",
        choices: shuffle(produits.map(([x, y]) => `${x} × ${y}`)),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer des produits, on calcule chacun d’eux.",
          "On utilise les tables, puis on compare les résultats.",
          produits.map(([x, y]) => `${x} × ${y} = ${x * y}`).join(" ; ") + ".",
          `Le produit ${mot} est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_table_tpl_10_facteur_en_situation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche dans la table : combien de fois ce nombre donne le total ?",
    tags: ["cm1", "multiplication", "table", "facteur_manquant", "template"],
    generate: () => {
      const s = randomChoice(SITUATIONS);
      const chercheGroupes = Math.random() < 0.5;
      const a = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      // « Combien de groupes ? » : groupes de 2, 3, 4 ou 8 seulement (Frédéric, 05/10).
      const b = chercheGroupes ? randomChoice([2, 3, 4, 8, 8]) : randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const r = a * b;

      // On cherche soit le nombre d'objets par groupe, soit le nombre de
      // groupes : les deux se lisent dans la même case de la table.
      const text = chercheGroupes
        ? randomChoice([
            () => `${s.lieu}, il y a ${r} ${s.o} en tout, ${b} ${dans(s)} chaque ${s.gs}. Combien y a-t-il ${de(s.g)} ?`,
            () => `${s.lieu}, on place ${r} ${s.o} par ${b}. Combien ${de(s.g)} faut-il ?`,
            () => `${s.lieu}, ${b} ${s.o} ${dans(s)} chaque ${s.gs}, ${r} ${s.o} en tout : combien ${de(s.g)} ?`,
          ])()
        : randomChoice([
            () => `${s.lieu}, on répartit ${r} ${s.o} ${dans(s)} ${a} ${s.g}, autant ${dans(s)} chaque ${s.gs}. Combien y a-t-il ${s.deO} ${dans(s)} chaque ${s.gs} ?`,
            () => `${s.lieu}, ${a} ${s.g} ${s.verbe} en tout ${r} ${s.o}, autant ${dans(s)} chaque ${s.gs}. Combien ${s.deO} ${dans(s)} ${s.fem ? "une seule" : "un seul"} ${s.gs} ?`,
            () => `${s.lieu}, il y a ${r} ${s.o} pour ${a} ${s.g} identiques. Combien ${s.deO} ${dans(s)} chaque ${s.gs} ?`,
          ])();
      const reponse = chercheGroupes ? a : b;

      return {
        text,
        format: "short",
        expected: [String(reponse)],
        comparator: "number_equal",
        explanation: exp(
          "Retrouver un facteur, c’est chercher dans la table le nombre manquant.",
          chercheGroupes
            ? `On cherche combien de fois ${b} donne ${r} : ? × ${b} = ${r}.`
            : `On cherche ${a} × ? = ${r}.`,
          chercheGroupes && b === 8
            ? `${a} × 8 = ${r}. On peut aussi diviser par 2 trois fois : ${r} → ${r / 2} → ${r / 4} → ${r / 8}.`
            : `${a} × ${b} = ${r}.`,
          chercheGroupes
            ? `Il y a ${a} ${s.g}.`
            : `Il y a ${b} ${s.o} ${dans(s)} chaque ${s.gs}.`
        ),
      };
    },
  },
    // ============================================================
  // MULTIPLICATION_MENTAL
  // Multiplier mentalement
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_1_double",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule mentalement : 18 × 2",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "Multiplier par 2, c’est doubler.",
    explanation: exp(
      "Multiplier mentalement, c’est utiliser une stratégie rapide sans poser l’opération.",
      "Pour multiplier par 2, on double le nombre.",
      "18 × 2 = 18 + 18 = 36.",
      "La réponse est 36."
    ),
    tags: ["cm1", "multiplication", "mental", "double"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_2_triple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 1,
    theme: "neutral",
    text: "De tête : combien font 12 × 3 ?",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "Multiplier par 3, c’est ajouter trois fois le même nombre.",
    explanation: exp(
      "Multiplier par 3 revient à prendre trois fois le même nombre.",
      "On peut décomposer ou additionner.",
      "12 × 3 = 12 + 12 + 12 = 36.",
      "La réponse est 36."
    ),
    tags: ["cm1", "multiplication", "mental", "triple"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_3_par_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule mentalement : 24 × 5",
    format: "short",
    expected: ["120"],
    comparator: "number_equal",
    hint: "Multiplier par 5, c’est multiplier par 10 puis prendre la moitié.",
    explanation: exp(
      "Multiplier mentalement peut se faire avec une stratégie.",
      "Pour multiplier par 5, on peut multiplier par 10 puis diviser par 2.",
      "24 × 10 = 240, et la moitié de 240 est 120.",
      "Donc 24 × 5 = 120."
    ),
    tags: ["cm1", "multiplication", "mental", "par_5", "strategie"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_4_par_9",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    text: "Trouve 17 × 9 sans poser l’opération.",
    format: "short",
    expected: ["153"],
    comparator: "number_equal",
    hint: "Multiplier par 9, c’est multiplier par 10 puis enlever le nombre.",
    explanation: exp(
      "Une stratégie mentale permet d’éviter un calcul posé.",
      "Pour multiplier par 9, on peut faire ×10 puis enlever une fois le nombre.",
      "17 × 10 = 170, puis 170 - 17 = 153.",
      "Donc 17 × 9 = 153."
    ),
    tags: ["cm1", "multiplication", "mental", "par_9", "strategie"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_5_decomposer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule de tête 14 × 6, en décomposant 14.",
    format: "short",
    expected: ["84"],
    comparator: "number_equal",
    hint: "Tu peux décomposer 14 en 10 + 4.",
    explanation: exp(
      "Décomposer un nombre peut aider à multiplier mentalement.",
      "On transforme 14 × 6 en (10 × 6) + (4 × 6).",
      "10 × 6 = 60 et 4 × 6 = 24. Donc 60 + 24 = 84.",
      "La réponse est 84."
    ),
    tags: ["cm1", "multiplication", "mental", "decomposition"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_6_par_20",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 13 × 20 ? Calcule-le de tête.",
    format: "short",
    expected: ["260"],
    comparator: "number_equal",
    hint: "Multiplier par 20, c’est multiplier par 2 puis par 10.",
    explanation: exp(
      "Multiplier mentalement peut se faire en décomposant le multiplicateur.",
      "20 = 2 × 10, donc on peut doubler puis multiplier par 10.",
      "13 × 2 = 26, puis 26 × 10 = 260.",
      "Donc 13 × 20 = 260."
    ),
    tags: ["cm1", "multiplication", "mental", "par_20", "strategie"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_7_piege_par_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : 19 × 5 = 90. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Calcule 19 × 10 puis prends la moitié.",
    explanation: exp(
      "Une stratégie mentale permet de vérifier rapidement un résultat.",
      "Pour multiplier par 5, on peut multiplier par 10 puis diviser par 2.",
      "19 × 10 = 190, et la moitié de 190 est 95.",
      "Donc 19 × 5 = 95, pas 90."
    ),
    tags: ["cm1", "multiplication", "mental", "par_5", "erreur", "piege"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_8_choisir_strategie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle stratégie est pratique pour calculer 32 × 5 ?",
    format: "qcm",
    choices: [
      "faire 32 × 10 puis diviser par 2",
      "faire 32 + 5",
      "faire 32 - 5",
      "faire 32 ÷ 5",
    ],
    expected: ["faire 32 × 10 puis diviser par 2"],
    comparator: "mcq_exact",
    hint: "Multiplier par 5, c’est prendre la moitié de ×10.",
    explanation: exp(
      "Multiplier mentalement, c’est choisir une méthode efficace.",
      "Pour multiplier par 5, on peut passer par ×10.",
      "32 × 10 = 320, puis 320 ÷ 2 = 160.",
      "La stratégie correcte est de faire 32 × 10 puis diviser par 2."
    ),
    tags: ["cm1", "multiplication", "mental", "strategie", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_mental_fixed_9_decomposer_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle décomposition aide à calculer 23 × 4 ?",
    format: "qcm",
    choices: [
      "20 × 4 + 3 × 4",
      "20 + 4 + 3",
      "23 + 4",
      "23 - 4",
    ],
    expected: ["20 × 4 + 3 × 4"],
    comparator: "mcq_exact",
    hint: "Décompose 23 en 20 + 3.",
    explanation: exp(
      "Décomposer un nombre permet de transformer un produit en calculs plus simples.",
      "On écrit 23 = 20 + 3, puis on multiplie chaque partie par 4.",
      "23 × 4 = 20 × 4 + 3 × 4.",
      "La bonne décomposition est 20 × 4 + 3 × 4."
    ),
    tags: ["cm1", "multiplication", "mental", "decomposition", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_1_double",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 1,
    theme: "neutral",
    hint: "Multiplier par 2, c’est doubler.",
    tags: ["cm1", "multiplication", "mental", "double", "template"],
    generate: () => {
      const n = randomInt(11, 49);
      const result = n * 2;
      const qui = randomChoice(PRENOMS);
      const ami = randomChoice(PRENOMS.filter((x) => x.p !== qui.p));
      const objet = randomChoice(COLLECTIONS);
      const [article, articles] = randomChoice(ARTICLES);

      return {
        text: enonceMental(n, 2, [
          () => `Quel est le double de ${n} ?`,
          () => `Combien font ${n} + ${n} ?`,
          () => `Double le nombre ${n}. Que trouves-tu ?`,
          () => `${qui.p} a ${n} ${objet}. ${ami.p} en a deux fois plus. Combien ${de(objet)} a ${ami.p} ?`,
          () => `${qui.p} lit ${n} pages le samedi et autant le dimanche. Combien de pages lit-${qui.il} en tout ?`,
          () => `Un ${article} coûte ${n} €. Combien coûtent 2 ${articles} ?`,
          () => `Une paire de chaussettes, c’est 2 chaussettes. Combien de chaussettes y a-t-il dans ${n} paires ?`,
          () => `Un vélo a 2 roues. Combien de roues ont ${n} vélos ?`,
          () => `${qui.p} gagne ${n} points, puis encore autant. Combien de points a-t-${qui.il} ?`,
          () => `Quel nombre est deux fois plus grand que ${n} ?`,
          () => `${qui.p} et ${ami.p} ont chacun ${n} ${objet}. Combien en ont-ils à eux deux ?`,
        ]),
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 2 revient à doubler un nombre.",
          "On ajoute le nombre à lui-même.",
          `${n} × 2 = ${n} + ${n} = ${result}.`,
          `La réponse est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_2_par_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 5, c’est multiplier par 10 puis diviser par 2.",
    tags: ["cm1", "multiplication", "mental", "par_5", "template"],
    generate: () => {
      const n = randomInt(12, 48);
      const result = n * 5;
      const qui = randomChoice(PRENOMS);
      const objet = randomChoice(COLLECTIONS);
      const s = randomChoice(GRANDES);

      return {
        text: enonceMental(n, 5, [
          () => `Combien font 5 fois ${n} ?`,
          () => `Calcule ${n} × 5 en passant par ${n} × 10.`,
          () => `${qui.p} a ${n} billets de 5 €. Combien d’euros a-t-${qui.il} ?`,
          () => `${qui.p} marche 5 minutes par jour pendant ${n} jours. Combien de minutes a-t-${qui.il} marché en tout ?`,
          () => `Une main a 5 doigts. Combien de doigts ont ${n} mains ?`,
          () => `${qui.p} range ses ${objet} par 5. ${cap(qui.il)} fait ${n} tas. Combien ${de(objet)} a-t-${qui.il} ?`,
          () => `Quel nombre vaut la moitié de ${n} × 10 ?`,
          () => `Une entrée à la piscine coûte 5 €. Combien coûtent ${n} entrées ?`,
          () => enonceGroupes(s, n, 5),
        ]),
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 5 peut se faire en utilisant ×10.",
          "On multiplie par 10 puis on prend la moitié.",
          `${n} × 10 = ${n * 10}, et la moitié de ${n * 10} est ${result}.`,
          `Donc ${n} × 5 = ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_3_par_9",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplier par 9, c’est faire ×10 puis enlever une fois le nombre.",
    tags: ["cm1", "multiplication", "mental", "par_9", "template"],
    generate: () => {
      const n = randomInt(11, 39);
      const result = n * 9;
      const qui = randomChoice(PRENOMS);
      const s = randomChoice(GRANDES);
      const [, articles] = randomChoice(ARTICLES);

      return {
        text: enonceMental(n, 9, [
          () => `Combien font 9 fois ${n} ?`,
          () => `Calcule ${n} × 9 en passant par ${n} × 10.`,
          () => `${qui.p} achète 9 ${articles} à ${n} € pièce. Combien paie-t-${qui.il} ?`,
          () => `${qui.p} fait 9 tours d’une piste de ${n} mètres. Combien de mètres parcourt-${qui.il} ?`,
          () => `Quel nombre vaut ${n} × 10 − ${n} ?`,
          () => `${qui.p} s’entraîne ${n} minutes par jour pendant 9 jours. Combien de minutes en tout ?`,
          () => `Quel nombre est 9 fois plus grand que ${n} ?`,
          () => enonceGroupes(s, 9, n),
        ]),
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 9 peut se faire à partir de ×10.",
          "On multiplie par 10 puis on enlève le nombre de départ.",
          `${n} × 10 = ${n * 10}, puis ${n * 10} - ${n} = ${result}.`,
          `Donc ${n} × 9 = ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_4_decomposer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Décompose le premier nombre en dizaines et unités.",
    tags: ["cm1", "multiplication", "mental", "decomposition", "template"],
    generate: () => {
      const tens = randomChoice([10, 20, 30, 40]);
      const units = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
      const n = tens + units;
      const factor = randomChoice([3, 4, 5, 6]);
      const result = n * factor;
      const s = randomChoice(GRANDES);
      const qui = randomChoice(PRENOMS);
      const objet = randomChoice(COLLECTIONS);
      const [article, articles] = randomChoice(ARTICLES);

      return {
        text: enonceMental(n, factor, [
          () => `Décompose ${n} pour calculer ${n} × ${factor} de tête.`,
          () => `Calcule ${n} × ${factor} en faisant ${tens} × ${factor}, puis ${units} × ${factor}.`,
          () => `${n} = ${tens} + ${units}. Utilise-le pour calculer ${n} × ${factor}.`,
          () => `${qui.p} calcule ${n} × ${factor} en deux morceaux. Quel résultat trouve-t-${qui.il} ?`,
          () => `Calcule de tête ${factor} fois ${n}.`,
          () => `${factor} amis ont chacun ${n} ${objet}. Combien ${de(objet)} ont-ils en tout ?`,
          () => `Un ${article} coûte ${n} €. Combien coûtent ${factor} ${articles} ?`,
          () => enonceGroupes(s, factor, n),
        ]),
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Décomposer un nombre facilite parfois le calcul mental.",
          `On écrit ${n} = ${tens} + ${units}.`,
          `${tens} × ${factor} = ${tens * factor} et ${units} × ${factor} = ${
            units * factor
          }. Donc ${tens * factor} + ${units * factor} = ${result}.`,
          `La réponse est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_5_par_20",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 20, c’est doubler puis multiplier par 10.",
    tags: ["cm1", "multiplication", "mental", "par_20", "template"],
    generate: () => {
      const n = randomInt(11, 49);
      const result = n * 20;
      const qui = randomChoice(PRENOMS);
      const s = randomChoice(GRANDES);

      return {
        text: enonceMental(n, 20, [
          () => `Combien font 20 fois ${n} ?`,
          () => `Calcule ${n} × 20 : double ${n}, puis multiplie par 10.`,
          () => `${qui.p} a ${n} billets de 20 €. Combien d’euros a-t-${qui.il} ?`,
          () => `Une boîte contient 20 craies. Combien de craies y a-t-il dans ${n} boîtes ?`,
          () => `Quel nombre est 20 fois plus grand que ${n} ?`,
          () => `${qui.p} lit ${n} pages par jour pendant 20 jours. Combien de pages lit-${qui.il} ?`,
          () => `Chaque car transporte 20 enfants. Combien d’enfants y a-t-il dans ${n} cars ?`,
          () => enonceGroupes(s, n, 20),
        ]),
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 20 peut se faire avec une stratégie.",
          "On multiplie d’abord par 2, puis par 10.",
          `${n} × 2 = ${n * 2}, puis ${n * 2} × 10 = ${result}.`,
          `Donc ${n} × 20 = ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_6_reunion_dechets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Même nombre d’objets dans chaque groupe : on multiplie.",
    tags: ["cm1", "multiplication", "mental", "nature", "dechet", "template"],
    generate: () => {
      const groupes = randomChoice([4, 5, 6, 8]);
      const objets = randomChoice([12, 15, 20, 25]);
      const total = groupes * objets;
      const a = randomChoice(ACTIONS_NATURE);
      const phrase = `${groupes} ${a.qui} ${a.verbe} ${a.fem ? "chacune" : "chacun"} ${objets} ${a.o} ${a.ou}`;

      return {
        text: randomChoice([
          () => `${cap(phrase)}. Combien ${a.deO} en tout ? Calcule de tête.`,
          () => `Pour la journée de la nature, ${phrase}. Quel est le nombre total ${a.deO} ?`,
          () => `${cap(phrase)}. De tête : combien ${a.deO} au total ?`,
        ])(),
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La multiplication permet de calculer rapidement des groupes égaux.",
          `On multiplie le nombre ${de(a.qui)} par le nombre ${a.deO} de ${a.fem ? "chacune" : "chacun"}.`,
          `${groupes} × ${objets} = ${total}.`,
          `Au total, cela fait ${total} ${a.o}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_7_triple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 1,
    theme: "neutral",
    hint: "Multiplier par 3, c’est prendre trois fois le nombre.",
    tags: ["cm1", "multiplication", "mental", "triple", "template"],
    generate: () => {
      const n = randomInt(11, 33);
      const result = n * 3;
      const qui = randomChoice(PRENOMS);
      const objet = randomChoice(COLLECTIONS);
      const [article, articles] = randomChoice(ARTICLES);
      const d = Math.floor(n / 10) * 10;
      const u = n - d;

      return {
        text: enonceMental(n, 3, [
          () => `Quel est le triple de ${n} ?`,
          () => `Combien font ${n} + ${n} + ${n} ?`,
          () => `Trois enfants ont chacun ${n} ${objet}. Combien ${de(objet)} ont-ils ensemble ?`,
          () => `Un ${article} coûte ${n} €. ${qui.p} en achète 3. Combien paie-t-${qui.il} ?`,
          () => `${qui.p} s’entraîne ${n} minutes, trois jours de suite. Combien de minutes en tout ?`,
          () => `Trois ${articles} à ${n} € chacun : combien faut-il payer ?`,
          () => `Un tricycle a 3 roues. Combien de roues ont ${n} tricycles ?`,
          () => `Quel nombre est trois fois plus grand que ${n} ?`,
          () => `${qui.p} lit ${n} pages par jour pendant 3 jours. Combien de pages lit-${qui.il} en tout ?`,
          () => `Un triangle a 3 côtés. Combien de côtés ont ${n} triangles ?`,
        ]),
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 3, c’est prendre trois fois le même nombre.",
          u === 0
            ? `${n} = ${d / 10} dizaines, donc on triple les dizaines.`
            : `On décompose ${n} = ${d} + ${u} et on multiplie chaque partie par 3.`,
          u === 0
            ? `${n} × 3 = ${result}.`
            : `${d} × 3 = ${d * 3} et ${u} × 3 = ${u * 3}, donc ${n} × 3 = ${d * 3} + ${u * 3} = ${result}.`,
          `La réponse est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_8_dizaines",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 1,
    theme: "neutral",
    hint: "Calcule avec la table, puis n’oublie pas les dizaines.",
    tags: ["cm1", "multiplication", "mental", "dizaines", "template"],
    generate: () => {
      const d = randomInt(2, 9);
      const k = randomInt(2, 9);
      const n = d * 10;
      const result = n * k;
      const qui = randomChoice(PRENOMS);
      const objet = randomChoice(COLLECTIONS);

      return {
        text: enonceMental(n, k, [
          () => enonceMental(k, n),
          () => `${k} fois ${d} dizaines, cela fait combien ?`,
          () => `Sachant que ${d} × ${k} = ${d * k}, combien font ${n} × ${k} ?`,
          () => `Un paquet contient ${n} feuilles. Combien de feuilles y a-t-il dans ${k} paquets ?`,
          () => `Une boîte contient ${n} trombones. Combien de trombones y a-t-il dans ${k} boîtes ?`,
          () => `${k} enfants ont chacun ${n} ${objet}. Combien ${de(objet)} ont-ils en tout ?`,
          () => `${qui.p} court ${n} mètres, ${k} fois de suite. Combien de mètres parcourt-${qui.il} ?`,
          () => `Dans la salle, il y a ${k} rangées de ${n} chaises. Combien de chaises en tout ?`,
          () => `${qui.p} dit : « ${d} × ${k} = ${d * k} ». Combien font alors ${n} × ${k} ?`,
        ]),
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          `${n}, c’est ${d} dizaines.`,
          `On calcule ${d} × ${k} avec la table, puis on obtient des dizaines.`,
          `${d} × ${k} = ${d * k}, donc ${n} × ${k} = ${d * k} dizaines = ${result}.`,
          `La réponse est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_9_par_4",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 4, c’est doubler, puis doubler encore.",
    tags: ["cm1", "multiplication", "mental", "par_4", "template"],
    generate: () => {
      const n = randomInt(12, 35);
      const result = n * 4;
      const qui = randomChoice(PRENOMS);
      const s = randomChoice(GRANDES);
      const [, articles] = randomChoice(ARTICLES);

      return {
        text: enonceMental(n, 4, [
          () => `Quel est le double du double de ${n} ?`,
          () => `Calcule ${n} × 4 en doublant deux fois.`,
          () => `Une voiture a 4 roues. Combien de roues ont ${n} voitures ?`,
          () => `${qui.p} achète 4 ${articles} à ${n} € pièce. Combien paie-t-${qui.il} ?`,
          () => `Un chat a 4 pattes. Combien de pattes ont ${n} chats ?`,
          () => `Quel nombre est quatre fois plus grand que ${n} ?`,
          () => `Un carré a des côtés de ${n} cm. Quel est son périmètre, en cm ?`,
          () => `${qui.p} lit ${n} pages par jour pendant 4 jours. Combien de pages lit-${qui.il} ?`,
          () => enonceGroupes(s, 4, n),
        ]),
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 4 revient à doubler deux fois, car 4 = 2 × 2.",
          "On double le nombre, puis on double le résultat.",
          `Le double de ${n} est ${n * 2}, le double de ${n * 2} est ${result}.`,
          `Donc ${n} × 4 = ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_10_par_11",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplier par 11, c’est multiplier par 10 puis ajouter une fois le nombre.",
    tags: ["cm1", "multiplication", "mental", "par_11", "template"],
    generate: () => {
      const n = randomInt(12, 45);
      const result = n * 11;
      const qui = randomChoice(PRENOMS);

      return {
        text: enonceMental(n, 11, [
          () => `Combien font 11 fois ${n} ?`,
          () => `Calcule ${n} × 11 en passant par ${n} × 10.`,
          () => `Une équipe de foot compte 11 joueurs. Combien de joueurs y a-t-il dans ${n} équipes ?`,
          () => `${qui.p} économise ${n} € par mois pendant 11 mois. Combien a-t-${qui.il} économisé ?`,
          () => `Quel nombre vaut ${n} × 10 + ${n} ?`,
          () => `Quel nombre est 11 fois plus grand que ${n} ?`,
          () => `${qui.p} fait 11 sauts de ${n} cm. Quelle distance parcourt-${qui.il}, en cm ?`,
          () => `Combien de biscuits y a-t-il dans 11 paquets de ${n} biscuits ?`,
        ]),
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "11, c’est 10 + 1.",
          "On multiplie par 10, puis on ajoute une fois le nombre.",
          `${n} × 10 = ${n * 10}, puis ${n * 10} + ${n} = ${result}.`,
          `Donc ${n} × 11 = ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_11_choisir_strategie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche un calcul facile avec 10 : ×5, ×9, ×11 et ×20 s’en servent.",
    tags: ["cm1", "multiplication", "mental", "strategie", "qcm", "template"],
    generate: () => {
      const n = randomInt(13, 48);
      const strategies: Record<number, { bonne: string; calcul: string }> = {
        5: { bonne: `${n} × 10, puis la moitié`, calcul: `${n} × 10 = ${n * 10}, la moitié est ${n * 5}` },
        9: { bonne: `${n} × 10, puis enlever ${n}`, calcul: `${n} × 10 = ${n * 10}, puis ${n * 10} − ${n} = ${n * 9}` },
        11: { bonne: `${n} × 10, puis ajouter ${n}`, calcul: `${n} × 10 = ${n * 10}, puis ${n * 10} + ${n} = ${n * 11}` },
        20: { bonne: `le double de ${n}, puis × 10`, calcul: `${n} × 2 = ${n * 2}, puis ${n * 2} × 10 = ${n * 20}` },
      };
      const f = randomChoice([5, 9, 11, 20]);
      const correct = strategies[f].bonne;
      // Les pièges : les bonnes stratégies… des AUTRES multiplicateurs.
      const wrongs = Object.entries(strategies)
        .filter(([k]) => Number(k) !== f)
        .map(([, v]) => v.bonne);
      const qui = randomChoice(PRENOMS);

      return {
        text: randomChoice([
          () => `Quelle méthode permet de calculer ${n} × ${f} de tête ?`,
          () => `${qui.p} veut calculer ${n} × ${f} sans poser. Que doit-${qui.il} faire ?`,
          () => `Pour trouver ${n} × ${f} mentalement, on peut faire :`,
          () => `Quel calcul donne le même résultat que ${n} × ${f} ?`,
          () => `${qui.p} n’a ni papier ni calculatrice. Comment peut-${qui.il} calculer ${n} × ${f} ?`,
          () => `Quelle astuce marche pour calculer ${n} × ${f} ?`,
          () => `On veut ${n} × ${f} sans poser. Quelle méthode est juste ?`,
          () => `${qui.p} a trouvé ${n * f} pour ${n} × ${f}, de tête. Quelle méthode a-t-${qui.il} pu utiliser ?`,
          () => `Calcul mental : quelle étape mène à ${n} × ${f} ?`,
        ])(),
        format: "qcm",
        choices: makeChoices(correct, wrongs),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "En calcul mental, on passe par un calcul facile avec 10.",
          `Pour × ${f}, on fait : ${correct}.`,
          `${strategies[f].calcul}.`,
          `${n} × ${f} = ${n * f}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_mental_tpl_12_par_50",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 50, c’est multiplier par 100 puis prendre la moitié.",
    tags: ["cm1", "multiplication", "mental", "par_50", "template"],
    generate: () => {
      const n = randomChoice([randomInt(2, 9) * 2, randomInt(11, 29)]);
      const result = n * 50;
      const qui = randomChoice(PRENOMS);

      return {
        text: enonceMental(n, 50, [
          () => `Combien font 50 fois ${n} ?`,
          () => `Calcule ${n} × 50 en passant par ${n} × 100.`,
          () => `${qui.p} a ${n} billets de 50 €. Combien d’euros cela fait-il ?`,
          () => `Quel nombre vaut la moitié de ${n} × 100 ?`,
          () => `Un rouleau contient 50 tickets. Combien de tickets y a-t-il dans ${n} rouleaux ?`,
          () => `Une piscine a des couloirs de 50 m. ${qui.p} nage ${n} longueurs. Combien de mètres nage-t-${qui.il} ?`,
          () => `Quel nombre est 50 fois plus grand que ${n} ?`,
          () => `Un sac de billes en contient 50. Combien de billes dans ${n} sacs ?`,
        ]),
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 50, c’est multiplier par 100 puis diviser par 2, car 50 est la moitié de 100.",
          "On multiplie par 100, puis on prend la moitié.",
          `${n} × 100 = ${fmt(n * 100)}, et la moitié de ${fmt(n * 100)} est ${fmt(result)}.`,
          `Donc ${n} × 50 = ${fmt(result)}.`
        ),
      };
    },
  },
    // ============================================================
  // MULTIPLICATION_POSEE
  // Poser une multiplication simple
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_multiplication_posee_fixed_1_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une multiplication posée, pourquoi faut-il bien aligner les chiffres ?",
    format: "qcm",
    choices: [
      "pour respecter le rang des chiffres",
      "pour écrire plus vite",
      "pour éviter de multiplier",
      "pour changer le résultat",
    ],
    expected: ["pour respecter le rang des chiffres"],
    comparator: "mcq_exact",
    hint: "Chaque chiffre a une valeur selon sa position : unités, dizaines, centaines.",
    explanation: exp(
      "Une multiplication posée organise un calcul en colonnes.",
      "On place les chiffres en respectant leur rang.",
      "Les unités, dizaines et centaines n’ont pas la même valeur.",
      "Il faut aligner correctement les chiffres pour ne pas mélanger les rangs."
    ),
    tags: ["cm1", "multiplication", "posee", "methode", "qcm", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication posée",
      numbers: ["124", "3"],
      result: "372",
      questionLabel: "Observe le rang des chiffres.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_posee_fixed_2_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule la multiplication posée : 123 × 3",
    format: "short",
    expected: ["369"],
    comparator: "number_equal",
    hint: "Multiplie 3 par chaque chiffre : unités, dizaines, centaines.",
    explanation: exp(
      "Poser une multiplication permet de multiplier un nombre par étapes.",
      "On multiplie chaque chiffre du nombre du haut par le nombre du bas.",
      "123 × 3 = 369.",
      "Le résultat est 369."
    ),
    tags: ["cm1", "multiplication", "posee", "simple", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication posée",
      numbers: ["123", "3"],
      result: "369",
      questionLabel: "Multiplie colonne par colonne.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_posee_fixed_3_sans_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 212 × 4",
    format: "short",
    expected: ["848"],
    comparator: "number_equal",
    hint: "Multiplie 4 par les unités, puis les dizaines, puis les centaines.",
    explanation: exp(
      "Une multiplication posée permet de calculer avec méthode.",
      "On multiplie chaque chiffre en respectant son rang.",
      "212 × 4 = 848.",
      "Le résultat est 848."
    ),
    tags: ["cm1", "multiplication", "posee", "sans_retenue", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication sans retenue",
      numbers: ["212", "4"],
      result: "848",
      questionLabel: "Chaque chiffre garde son rang.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_posee_fixed_4_avec_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 247 × 4",
    format: "short",
    expected: ["988"],
    comparator: "number_equal",
    hint: "Attention aux retenues.",
    explanation: exp(
      "Une retenue apparaît quand un produit dépasse 9 dans une colonne.",
      "On multiplie colonne par colonne et on reporte les retenues.",
      "247 × 4 = 988.",
      "Le résultat est 988."
    ),
    tags: ["cm1", "multiplication", "posee", "retenue", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication avec retenues",
      numbers: ["247", "4"],
      result: "988",
      questionLabel: "Pense aux retenues.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_posee_fixed_5_zero",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Pose et calcule 306 × 5 (attention au zéro).",
    format: "short",
    expected: ["1530", "1 530"],
    comparator: "number_equal",
    hint: "N’oublie pas le zéro dans le nombre 306.",
    explanation: exp(
      "Dans une multiplication posée, chaque chiffre compte, même le zéro.",
      "On multiplie chaque chiffre en respectant son rang.",
      "306 × 5 = 1 530.",
      "Le résultat est 1 530."
    ),
    tags: ["cm1", "multiplication", "posee", "zero", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication avec zéro",
      numbers: ["306", "5"],
      result: "1530",
      questionLabel: "Le zéro garde son rang.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_posee_fixed_6_erreur_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule 126 × 4 et oublie une retenue. Pourquoi son résultat peut-il être faux ?",
    format: "open",
    expected: ["retenue", "reporter", "colonne", "résultat", "faux"],
    comparator: "contains_keyword",
    hint: "Une retenue oubliée change la colonne suivante.",
    explanation: exp(
      "Une retenue est une quantité à reporter dans la colonne suivante.",
      "On doit multiplier puis ajouter la retenue au bon moment.",
      "Si une retenue est oubliée, une colonne devient fausse.",
      "Oublier une retenue peut rendre tout le résultat faux."
    ),
    tags: ["cm1", "multiplication", "posee", "erreur", "retenue", "open", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Erreur fréquente",
      numbers: ["126", "4"],
      result: "504",
      questionLabel: "La retenue doit être reportée.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_posee_fixed_7_qcm_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 234 × 3 = 612. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie en multipliant chaque chiffre par 3.",
    explanation: exp(
      "Vérifier une multiplication posée permet de repérer une erreur.",
      "On refait le calcul colonne par colonne.",
      "234 × 3 = 702, et non 612.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "multiplication", "posee", "erreur", "qcm", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Vérifier une multiplication",
      numbers: ["234", "3"],
      result: "702",
      questionLabel: "Refais le calcul pour vérifier.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_1_un_chiffre_sans_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie chaque chiffre du nombre par le chiffre du bas.",
    tags: ["cm1", "multiplication", "posee", "template", "sans_retenue", "canvas"],
    generate: () => {
      const b = randomChoice([2, 3, 4]);
      const a = sansRetenue(3, b);
      const result = a * b;

      return {
        text: enoncePose(a, b),
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication posée permet de calculer en colonnes.",
          "On multiplie chaque chiffre du nombre par le chiffre du bas.",
          `${a} × ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Multiplication posée",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Multiplie chaque colonne.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_2_un_chiffre_avec_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie colonne par colonne et pense aux retenues.",
    tags: ["cm1", "multiplication", "posee", "retenue", "template", "canvas"],
    generate: () => {
      // Unités ≥ 4 et multiplicateur ≥ 3 : au moins une retenue, toujours.
      const a = randomInt(1, 9) * 100 + randomInt(1, 9) * 10 + randomInt(4, 9);
      const b = randomInt(3, 9);
      const result = a * b;

      return {
        text: enoncePose(a, b),
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication posée peut nécessiter des retenues.",
          "On multiplie chaque colonne et on reporte les retenues.",
          `${a} × ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Multiplication avec retenues",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Attention aux retenues.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_3_avec_zero",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Le zéro est un chiffre : il garde sa place.",
    tags: ["cm1", "multiplication", "posee", "zero", "template", "canvas"],
    generate: () => {
      // Le zéro tombe aux dizaines (408) ou aux unités (470).
      const h = randomInt(1, 9);
      const c = randomInt(1, 9);
      const a = Math.random() < 0.5 ? h * 100 + c : h * 100 + c * 10;
      const b = randomInt(2, 9);
      const result = a * b;

      return {
        text: enoncePose(a, b),
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Le zéro dans un nombre garde son rang.",
          "On pose la multiplication en respectant chaque chiffre.",
          `${a} × ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Multiplication avec zéro",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Ne supprime pas le zéro : il garde une place.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_4_erreur_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Refais la multiplication ou estime le résultat.",
    tags: [
      "cm1",
      "multiplication",
      "posee",
      "erreur",
      "verification",
      "template",
      "canvas",
    ],
    generate: () => {
      const a = randomInt(1, 9) * 100 + randomInt(1, 9) * 10 + randomInt(4, 9);
      const b = randomInt(3, 7);
      const correct = a * b;
      // L'erreur imitée est la plus fréquente : une retenue oubliée (−10,
      // −100) ou ajoutée en trop (+10). Juste une fois sur deux.
      const juste = Math.random() < 0.5;
      const annonce = juste ? correct : correct + randomChoice([-10, -20, -100, 10]);
      const q = enonceVerifier(`${a} × ${b}`, String(annonce), juste);

      return {
        text: q.text,
        format: "qcm",
        choices: q.choices,
        expected: q.expected,
        comparator: "mcq_exact",
        explanation: exp(
          "Vérifier une multiplication permet de repérer une erreur.",
          "On refait le calcul posé, colonne par colonne, sans oublier les retenues.",
          juste
            ? `${a} × ${b} = ${correct} : c’est bien le résultat annoncé.`
            : `${a} × ${b} = ${correct}, et non ${annonce}.`,
          juste ? "Le résultat est juste." : "Le résultat est faux."
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Vérifier une multiplication",
          numbers: [String(a), String(b)],
          result: String(correct),
          questionLabel: "Compare le résultat annoncé avec le calcul correct.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_5_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Même quantité répétée plusieurs fois : on multiplie.",
    tags: [
      "cm1",
      "multiplication",
      "posee",
      "probleme",
      "template",
      "canvas",
    ],
    generate: () => {
      // Le marché seul revenait à chaque fois : une situation parmi d'autres.
      const s = randomChoice(GRANDES);
      const groupes = randomInt(12, 29);
      const objets = randomInt(4, 9);

      return {
        text: enonceGroupes(s, groupes, objets),
        format: "short",
        expected: [String(groupes * objets)],
        comparator: "number_equal",
        explanation: explicationGroupes(s, groupes, objets),
        canvas: canvasPose(groupes, objets, "Problème — on pose", "On peut poser la multiplication."),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_6_deux_chiffres_sans_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 1,
    theme: "neutral",
    hint: "Commence par les unités, puis les dizaines.",
    tags: ["cm1", "multiplication", "posee", "sans_retenue", "template", "canvas"],
    generate: () => {
      const b = randomChoice([2, 3, 4]);
      const a = sansRetenue(2, b);
      const result = a * b;
      const u = a % 10;
      const d = Math.floor(a / 10);

      return {
        text: enoncePose(a, b),
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une multiplication posée, on multiplie chaque chiffre en commençant par les unités.",
          "On écrit le résultat de chaque colonne sous son rang.",
          `Unités : ${u} × ${b} = ${u * b}. Dizaines : ${d} × ${b} = ${d * b}. Donc ${a} × ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: canvasPose(a, b, "Multiplication posée", "Unités d’abord, puis dizaines."),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_7_premiere_etape",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 1,
    theme: "neutral",
    hint: "On commence toujours par la colonne des unités.",
    tags: ["cm1", "multiplication", "posee", "methode", "template", "canvas"],
    generate: () => {
      // Trois chiffres différents, pour que les propositions le soient aussi.
      const [c, d, u] = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
      const a = c * 100 + d * 10 + u;
      const b = randomChoice([2, 3, 4, 5, 6, 7, 8, 9].filter((x) => ![c, d, u].includes(x)));
      const qui = randomChoice(PRENOMS);
      const explanation = exp(
        "Une multiplication posée se calcule colonne par colonne, de droite à gauche.",
        "On commence par les unités, puis les dizaines, puis les centaines.",
        `Dans ${a} × ${b}, le premier calcul est ${u} × ${b} = ${u * b}.`,
        `On commence par ${u} × ${b}.`
      );

      if (Math.random() < 0.5) {
        const correct = `${u} × ${b}`;
        return {
          text: randomChoice([
            () => `On pose ${a} × ${b}. Par quel calcul commence-t-on ?`,
            () => `${qui.p} pose ${a} × ${b}. Quel est son premier calcul ?`,
            () => `Dans la multiplication posée ${a} × ${b}, quel calcul fait-on en premier ?`,
            () => `Pour poser ${a} × ${b}, on commence par :`,
          ])(),
          format: "qcm",
          choices: makeChoices(correct, [
            `${c} × ${b}`,
            `${d} × ${b}`,
            `${a} + ${b}`,
          ]),
          expected: [correct],
          comparator: "mcq_exact",
          explanation,
          canvas: canvasPose(a, b, "Par où commencer ?", "Regarde la colonne de droite."),
        };
      }
      return {
        text: randomChoice([
          () => `On pose ${a} × ${b}. On commence par les unités : combien font ${u} × ${b} ?`,
          () => `${qui.p} pose ${a} × ${b}. ${cap(qui.il)} commence par la colonne des unités. Quel nombre trouve-t-${qui.il} ?`,
          () => `Première étape de ${a} × ${b} : multiplie le chiffre des unités par ${b}. Quel résultat ?`,
        ])(),
        format: "short",
        expected: [String(u * b)],
        comparator: "number_equal",
        explanation,
        canvas: canvasPose(a, b, "Par où commencer ?", "Regarde la colonne de droite."),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_8_probleme_facile",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 1,
    theme: "neutral",
    hint: "Autant d’objets dans chaque groupe : on pose la multiplication.",
    tags: ["cm1", "multiplication", "posee", "probleme", "template", "canvas"],
    generate: () => {
      const s = randomChoice(GRANDES);
      const b = randomChoice([2, 3]);
      const a = sansRetenue(2, b);

      return {
        text: enonceGroupes(s, b, a),
        format: "short",
        expected: [String(a * b)],
        comparator: "number_equal",
        explanation: explicationGroupes(s, b, a),
        canvas: canvasPose(a, b, "Problème — on pose", "On peut poser la multiplication."),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_9_deux_chiffres_avec_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Quand le produit d’une colonne dépasse 9, on retient les dizaines.",
    tags: ["cm1", "multiplication", "posee", "retenue", "template", "canvas"],
    generate: () => {
      const u = randomInt(4, 9);
      const d = randomInt(1, 9);
      const a = d * 10 + u;
      const b = randomInt(3, 9);
      const result = a * b;
      const pu = u * b;

      return {
        text: enoncePose(a, b),
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une retenue apparaît quand le produit d’une colonne dépasse 9.",
          "On écrit le chiffre des unités et on reporte la dizaine dans la colonne suivante.",
          `${u} × ${b} = ${pu} : on écrit ${pu % 10}, on retient ${Math.floor(pu / 10)}. Puis ${d} × ${b} = ${d * b}, plus ${Math.floor(pu / 10)} : ${d * b + Math.floor(pu / 10)}.`,
          `Donc ${a} × ${b} = ${result}.`
        ),
        canvas: canvasPose(a, b, "Multiplication avec retenue", "Pense à la retenue."),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_10_la_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Le chiffre des unités s’écrit, la dizaine se retient.",
    tags: ["cm1", "multiplication", "posee", "retenue", "template", "canvas"],
    generate: () => {
      const u = randomInt(3, 9);
      const b = randomInt(4, 9);
      const pu = u * b; // toujours ≥ 12 : il y a une retenue
      const a = randomInt(1, 9) * 10 + u;
      const qui = randomChoice(PRENOMS);
      const retenue = Math.floor(pu / 10);
      const chiffre = pu % 10;
      const demandeRetenue = Math.random() < 0.5;

      const text = demandeRetenue
        ? randomChoice([
            () => `On pose ${a} × ${b}. On calcule ${u} × ${b} = ${pu}. Combien retient-on ?`,
            () => `${qui.p} pose ${a} × ${b} et trouve ${pu} dans la colonne des unités. Quelle retenue doit-${qui.il} écrire ?`,
            () => `Dans ${a} × ${b}, la colonne des unités donne ${pu}. Quelle est la retenue ?`,
            () => `${u} × ${b} = ${pu}. Dans la multiplication posée ${a} × ${b}, quel chiffre va en retenue ?`,
            () => `${qui.p} pose ${a} × ${b}. Quel petit chiffre écrit-${qui.il} en haut, au-dessus des dizaines ?`,
          ])()
        : randomChoice([
            () => `On pose ${a} × ${b}. On calcule ${u} × ${b} = ${pu}. Quel chiffre écrit-on aux unités du résultat ?`,
            () => `${qui.p} pose ${a} × ${b}. Quel chiffre écrit-${qui.il} sous la colonne des unités ?`,
            () => `Dans ${a} × ${b}, quel est le chiffre des unités du résultat ?`,
            () => `${u} × ${b} = ${pu}. Dans ${a} × ${b} posé, quel chiffre écrit-on en bas, sous les unités ?`,
            () => `Sans tout calculer : par quel chiffre se termine ${a} × ${b} ?`,
          ])();

      return {
        text,
        format: "short",
        expected: [String(demandeRetenue ? retenue : chiffre)],
        comparator: "number_equal",
        explanation: exp(
          "Quand le produit d’une colonne dépasse 9, on n’écrit que le chiffre des unités.",
          "La dizaine est retenue et s’ajoute à la colonne suivante.",
          `${u} × ${b} = ${pu} : on écrit ${chiffre} et on retient ${retenue}.`,
          demandeRetenue ? `On retient ${retenue}.` : `On écrit ${chiffre} aux unités.`
        ),
        canvas: canvasPose(a, b, "La retenue", "Regarde la colonne des unités."),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_11_probleme_avec_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Autant d’objets dans chaque groupe : pose la multiplication, pense à la retenue.",
    tags: ["cm1", "multiplication", "posee", "probleme", "retenue", "template", "canvas"],
    generate: () => {
      const s = randomChoice(GRANDES);
      const a = randomInt(1, 9) * 10 + randomInt(4, 9);
      const b = randomInt(3, 9);

      return {
        text: enonceGroupes(s, b, a),
        format: "short",
        expected: [String(a * b)],
        comparator: "number_equal",
        explanation: explicationGroupes(s, b, a),
        canvas: canvasPose(a, b, "Problème — on pose", "Pose la multiplication, pense à la retenue."),
      };
    },
  },

  // ---- Multiplication par un nombre à deux chiffres (★3-★4) ----

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_12_deux_chiffres_par_deux_chiffres",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "D’abord les unités du multiplicateur, puis ses dizaines (deuxième ligne, décalée), puis on additionne.",
    tags: ["cm1", "multiplication", "posee", "deux_chiffres", "template", "canvas"],
    generate: () => {
      const { a, b } = tirerDeuxChiffres(29);
      const qui = randomChoice(PRENOMS);

      return {
        text: enoncePose(a, b, [
          () => `Pose ${a} × ${b} : une ligne pour les unités, une ligne pour les dizaines. Quel est le résultat ?`,
          () => `${qui.p} pose ${a} × ${b} sur deux lignes, puis additionne. Que trouve-t-${qui.il} ?`,
          () => `Multiplication à deux lignes : ${a} × ${b} = ?`,
          () => `Calcule ${a} × ${b} en posant l’opération (le multiplicateur a deux chiffres).`,
        ]),
        format: "short",
        expected: [String(a * b)],
        comparator: "number_equal",
        explanation: explicationDeuxChiffres(a, b),
        canvas: canvasPose(a, b, "Multiplication à deux lignes", "Unités, puis dizaines, puis on additionne."),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_13_deuxieme_ligne",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "La deuxième ligne multiplie par les dizaines : elle compte des dizaines.",
    tags: ["cm1", "multiplication", "posee", "deux_chiffres", "methode", "template", "canvas"],
    generate: () => {
      const { a, b } = tirerDeuxChiffres(49);
      const { u, d, l1, l2 } = deuxChiffres(a, b);
      const qui = randomChoice(PRENOMS);
      const diz = d === 1 ? "dizaine" : "dizaines";
      const premiere = Math.random() < 0.4;

      const text = premiere
        ? randomChoice([
            () => `On pose ${a} × ${b}. Que vaut la première ligne, celle des unités ?`,
            () => `${qui.p} pose ${a} × ${b}. ${cap(qui.il)} commence par ${a} × ${u}. Quel nombre écrit-${qui.il} sur la première ligne ?`,
            () => `Dans ${a} × ${b} posé, quel nombre trouve-t-on sur la ligne des unités ?`,
          ])()
        : randomChoice([
            () => `On pose ${a} × ${b}. Que vaut la deuxième ligne, celle des dizaines ?`,
            () => `${qui.p} pose ${a} × ${b}. Sur la deuxième ligne, ${qui.il} calcule ${a} × ${d} ${diz}. Quel nombre cela fait-il ?`,
            () => `Dans ${a} × ${b}, combien valent ${a} × ${d} ${diz} ?`,
            () => `${a} × ${d} ${diz}, c’est ${a * d} dizaines. Quel nombre est-ce ?`,
          ])();

      return {
        text,
        format: "short",
        expected: [String(premiere ? l1 : l2)],
        comparator: "number_equal",
        explanation: exp(
          `Dans ${a} × ${b}, ${b} c’est ${u} unités et ${d} ${diz}.`,
          "Première ligne : on multiplie par les unités. Deuxième ligne : par les dizaines ; elle compte des dizaines, d’où le décalage d’une colonne.",
          `Première ligne : ${a} × ${u} = ${fmt(l1)}. Deuxième ligne : ${a} × ${d} ${diz} = ${a * d} dizaines = ${fmt(l2)}.`,
          premiere ? `La première ligne vaut ${fmt(l1)}.` : `La deuxième ligne vaut ${fmt(l2)}.`
        ),
        canvas: canvasPose(a, b, "Les deux lignes", "Unités d’abord, puis dizaines."),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_14_deux_chiffres_probleme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Autant d’objets dans chaque groupe : pose la multiplication sur deux lignes.",
    tags: ["cm1", "multiplication", "posee", "deux_chiffres", "probleme", "template", "canvas"],
    generate: () => {
      const s = randomChoice(GRANDES);
      const { a, b } = tirerDeuxChiffres(39);
      const [groupes, objets] = Math.random() < 0.5 ? [a, b] : [b, a];

      return {
        text: enonceGroupes(s, groupes, objets),
        format: "short",
        expected: [String(a * b)],
        comparator: "number_equal",
        explanation: explicationDeuxChiffres(a, b),
        canvas: canvasPose(a, b, "Problème — on pose", "Unités, puis dizaines, puis on additionne."),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_15_deux_chiffres_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie que la deuxième ligne est bien décalée : elle compte des dizaines.",
    tags: ["cm1", "multiplication", "posee", "deux_chiffres", "qcm", "template", "canvas"],
    generate: () => {
      const { a, b } = tirerDeuxChiffres(59);
      const { d, l1, r } = deuxChiffres(a, b);
      const qui = randomChoice(PRENOMS);
      // Pièges réalistes : deuxième ligne non décalée, retenue oubliée,
      // et l'addition prise pour une multiplication.
      const wrongs = [l1 + a * d, r - 10, r - 100, a + b, r + 10].map(fmt);

      return {
        text: randomChoice([
          () => `Quel est le résultat de ${a} × ${b} ?`,
          () => `${qui.p} pose ${a} × ${b}. Quel résultat est le bon ?`,
          () => `Choisis le bon résultat de la multiplication posée ${a} × ${b}.`,
          () => `Pose ${a} × ${b} au brouillon, puis choisis le résultat.`,
          () => `Un seul de ces nombres est égal à ${a} × ${b}. Lequel ?`,
        ])(),
        format: "qcm",
        choices: makeChoices(fmt(r), wrongs),
        expected: [fmt(r)],
        comparator: "mcq_exact",
        explanation: explicationDeuxChiffres(a, b),
        canvas: canvasPose(a, b, "Multiplication à deux lignes", "Attention au décalage de la deuxième ligne."),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_posee_tpl_16_deux_chiffres_verifier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Refais les deux lignes : unités, puis dizaines (décalées), puis additionne.",
    tags: ["cm1", "multiplication", "posee", "deux_chiffres", "erreur", "template", "canvas"],
    generate: () => {
      const { a, b } = tirerDeuxChiffres(59);
      const { d, l1, l2, r } = deuxChiffres(a, b);
      const juste = Math.random() < 0.5;
      const erreur = randomChoice(["decalage", "retenue"] as const);
      const annonce = juste ? r : erreur === "decalage" ? l1 + a * d : r - randomChoice([10, 100]);
      const q = enonceVerifier(`${a} × ${b}`, fmt(annonce), juste);

      return {
        text: q.text,
        format: "qcm",
        choices: q.choices,
        expected: q.expected,
        comparator: "mcq_exact",
        explanation: exp(
          "Pour vérifier, on refait la multiplication ligne par ligne.",
          "Première ligne : les unités. Deuxième ligne : les dizaines, décalée d’une colonne parce qu’elle compte des dizaines.",
          `${fmt(l1)} + ${fmt(l2)} = ${fmt(r)}.`,
          juste
            ? "Le résultat annoncé est juste."
            : erreur === "decalage"
              ? `C’est faux : la deuxième ligne n’a pas été décalée (${fmt(l1)} + ${fmt(a * d)} = ${fmt(annonce)}). Le bon résultat est ${fmt(r)}.`
              : `C’est faux : une retenue a été oubliée. Le bon résultat est ${fmt(r)}.`
        ),
        canvas: canvasPose(a, b, "Vérifier une multiplication", "Refais les deux lignes."),
      };
    },
  },
    // ============================================================
  // MULTIPLICATION_PUISSANCE_DIX
  // Multiplier par 10, 100 ou 1 000
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_1_par_10",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 34 × 10",
    format: "short",
    expected: ["340"],
    comparator: "number_equal",
    hint: "Multiplier par 10, c’est rendre chaque chiffre dix fois plus grand : il monte d’une colonne.",
    explanation: exp(
      "Multiplier par 10, 100 ou 1 000 permet de rendre un nombre 10, 100 ou 1 000 fois plus grand.",
      "Multiplier par 10, c’est rendre chaque chiffre dix fois plus grand : il monte d’une colonne.",
      "3 dizaines deviennent 3 centaines, 4 unités deviennent 4 dizaines : 34 × 10 = 340.",
      "Le résultat est 340."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "par_10"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_2_par_100",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 56 × 100",
    format: "short",
    expected: ["5600", "5 600"],
    comparator: "number_equal",
    hint: "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes.",
    explanation: exp(
      "Multiplier par 100 rend un nombre 100 fois plus grand.",
      "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes.",
      "5 dizaines deviennent 5 milliers, 6 unités deviennent 6 centaines : 56 × 100 = 5 600.",
      "Le résultat est 5 600."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "par_100"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_3_par_1000",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 7 × 1 000",
    format: "short",
    expected: ["7000", "7 000"],
    comparator: "number_equal",
    hint: "Multiplier par 1 000, c’est rendre chaque chiffre mille fois plus grand : il monte de trois colonnes.",
    explanation: exp(
      "Multiplier par 1 000 rend un nombre 1 000 fois plus grand.",
      "Multiplier par 1 000, c’est rendre chaque chiffre mille fois plus grand : il monte de trois colonnes.",
      "7 unités deviennent 7 milliers : 7 × 1 000 = 7 000.",
      "Le résultat est 7 000."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "par_1000"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le résultat de 48 × 10 ?",
    format: "qcm",
    choices: ["480", "48", "4 800", "58"],
    expected: ["480"],
    comparator: "mcq_exact",
    hint: "Multiplier par 10 donne un nombre 10 fois plus grand.",
    explanation: exp(
      "Multiplier par 10 rend un nombre 10 fois plus grand.",
      "Multiplier par 10, c’est rendre chaque chiffre dix fois plus grand : il monte d’une colonne.",
      "4 dizaines deviennent 4 centaines, 8 unités deviennent 8 dizaines : 48 × 10 = 480.",
      "La bonne réponse est 480."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "qcm", "par_10"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_5_piege_zero",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève affirme que 205 × 10 = 2 050. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le zéro déjà présent dans 205 reste dans le nombre.",
    explanation: exp(
      "Multiplier un entier par 10 revient à rendre le nombre 10 fois plus grand.",
      "Multiplier par 10, c’est rendre chaque chiffre dix fois plus grand : il monte d’une colonne.",
      "2 centaines deviennent 2 milliers, 5 unités deviennent 5 dizaines : 205 × 10 = 2 050.",
      "L’élève a raison."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "zero", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_6_piege_nombre_grand",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 73 × 100 = 730. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes.",
    explanation: exp(
      "Multiplier par 100 rend un nombre 100 fois plus grand.",
      "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes.",
      "7 dizaines deviennent 7 milliers, 3 unités deviennent 3 centaines : 73 × 100 = 7 300, et non 730.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "erreur", "piege"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_7_rang",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi 42 × 100 est-il plus grand que 42 × 10 ?",
    format: "open",
    expected: ["100", "10", "plus grand", "dix fois", "zéro"],
    comparator: "contains_keyword",
    hint: "100 est dix fois plus grand que 10.",
    explanation: exp(
      "Multiplier par 10 ou par 100 ne donne pas le même ordre de grandeur.",
      "On compare les multiplicateurs 10 et 100.",
      "100 est dix fois plus grand que 10, donc 42 × 100 est dix fois plus grand que 42 × 10.",
      "Multiplier par 100 donne un résultat plus grand que multiplier par 10."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "open", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_8_nombre_avec_zero",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 120 × 100",
    format: "short",
    expected: ["12000", "12 000"],
    comparator: "number_equal",
    hint: "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes, même un zéro.",
    explanation: exp(
      "Multiplier par 100 rend un nombre 100 fois plus grand.",
      "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes.",
      "1 centaine devient 1 dizaine de milliers, 2 dizaines deviennent 2 milliers : 120 × 100 = 12 000.",
      "Le résultat est 12 000."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "zero", "par_100"],
  },

  // Les douze gabarits de cette micro venaient par paires IDENTIQUES (un bloc
  // copié deux fois) : 8 squelettes en tout. Chaque paire garde ses deux ids
  // et ses étoiles, mais les deux membres posent désormais la question
  // différemment (calcul nu / situation, résultat / facteur manquant…).

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_1_par_10",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    hint: "Multiplier par 10, c’est rendre chaque chiffre dix fois plus grand : il monte d’une colonne.",
    tags: ["cm1", "multiplication", "puissance_dix", "par_10", "template"],
    generate: () => {
      const n = randomChoice([randomInt(2, 99), randomInt(101, 999)]);
      return {
        text: enonceP10(n, 10),
        format: "short",
        expected: [String(n * 10)],
        comparator: "number_equal",
        explanation: explicationP10(n, 10),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_1_par_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    hint: "10 objets par groupe : on multiplie par 10.",
    tags: ["cm1", "multiplication", "puissance_dix", "par_10", "dizaines", "template"],
    generate: () => {
      const n = randomInt(3, 99);
      const qui = randomChoice(PRENOMS);
      const objet = randomChoice(COLLECTIONS);
      const s = randomChoice(GRANDES);

      return {
        text: randomChoice([
          () => `${n} dizaines, c’est combien d’unités ?`,
          () => `Combien d’unités y a-t-il dans ${n} dizaines ?`,
          () => `${qui.p} a ${n} billets de 10 €. Combien d’euros a-t-${qui.il} ?`,
          () => `Un paquet contient 10 ${objet}. Combien ${de(objet)} y a-t-il dans ${n} paquets ?`,
          () => `${qui.p} range ses ${objet} par paquets de 10. ${cap(qui.il)} fait ${n} paquets. Combien ${de(objet)} a-t-${qui.il} ?`,
          () => enonceGroupes(s, n, 10),
        ])(),
        format: "short",
        expected: [String(n * 10)],
        comparator: "number_equal",
        explanation: exp(
          `Une dizaine, c’est 10 unités : ${n} groupes de 10, c’est ${n} dizaines.`,
          "Multiplier par 10, c’est rendre chaque chiffre dix fois plus grand : il monte d’une colonne.",
          `${calculP10(n, 10)}.`,
          `La réponse est ${fmt(n * 10)}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_7_rang",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    hint: "Multiplier par 10 fait glisser chaque chiffre d’un rang vers la gauche.",
    tags: ["cm1", "multiplication", "puissance_dix", "rang", "template"],
    generate: () => {
      const n = randomInt(12, 98);
      const u = n % 10;
      const f = randomChoice([10, 100]);
      const qui = randomChoice(PRENOMS);
      const rang = f === 10 ? "dizaines" : "centaines";
      const correct = `il devient le chiffre des ${rang}`;
      const explanation = exp(
        `${n} × ${f}, c’est ${n} ${rang}.`,
        `Chaque chiffre prend une valeur ${f} fois plus grande : le chiffre des unités passe aux ${rang}.`,
        `${calculP10(n, f)}.`,
        `Le chiffre ${u} est maintenant le chiffre des ${rang}.`
      );

      if (Math.random() < 0.5) {
        return {
          text: randomChoice([
            () => `On multiplie ${n} par ${f}. Que devient le chiffre des unités, ${u} ?`,
            () => `${qui.p} calcule ${n} × ${f}. Où se retrouve le chiffre ${u} de ${n} ?`,
            () => `Dans ${n} × ${f}, que devient le chiffre des unités de ${n} ?`,
          ])(),
          format: "qcm",
          choices: makeChoices(correct, [
            "il reste le chiffre des unités",
            "il devient le chiffre des dizaines",
            "il devient le chiffre des centaines",
            "il devient le chiffre des milliers",
          ]),
          expected: [correct],
          comparator: "mcq_exact",
          explanation,
        };
      }
      return {
        text: randomChoice([
          () => `Quel est le chiffre des ${rang} de ${n} × ${f} ?`,
          () => `${qui.p} écrit le résultat de ${n} × ${f}. Quel chiffre est au rang des ${rang} ?`,
          () => `Sans tout écrire : dans ${n} × ${f}, quel est le chiffre des ${rang} ?`,
        ])(),
        format: "short",
        expected: [String(u)],
        comparator: "number_equal",
        explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_2_par_100",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes.",
    tags: ["cm1", "multiplication", "puissance_dix", "par_100", "template"],
    generate: () => {
      const n = randomChoice([randomInt(2, 99), randomInt(101, 999)]);
      return {
        text: enonceP10(n, 100),
        format: "short",
        expected: [String(n * 100)],
        comparator: "number_equal",
        explanation: explicationP10(n, 100),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_2_par_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "100 dans chaque groupe : on multiplie par 100.",
    tags: ["cm1", "multiplication", "puissance_dix", "par_100", "centaines", "template"],
    generate: () => {
      const n = randomInt(3, 99);
      const qui = randomChoice(PRENOMS);
      const [texte, conclusion] = randomChoice([
        [`${n} centaines, c’est combien d’unités ?`, `${n} centaines, ce sont ${fmt(n * 100)} unités.`],
        [`Combien d’unités y a-t-il dans ${n} centaines ?`, `Il y a ${fmt(n * 100)} unités.`],
        [`1 € = 100 centimes. Combien de centimes y a-t-il dans ${n} € ?`, `${n} € = ${fmt(n * 100)} centimes.`],
        [`1 m = 100 cm. Une corde mesure ${n} m. Combien mesure-t-elle en centimètres ?`, `La corde mesure ${fmt(n * 100)} cm.`],
        [`Une boîte contient 100 trombones. Combien de trombones y a-t-il dans ${n} boîtes ?`, `Il y a ${fmt(n * 100)} trombones.`],
        [`Un rouleau contient 100 tickets. ${qui.p} en vend ${n} rouleaux. Combien de tickets a-t-${qui.il} vendus ?`, `${cap(qui.il)} a vendu ${fmt(n * 100)} tickets.`],
        [`1 L = 100 cL. Combien de centilitres y a-t-il dans ${n} L ?`, `${n} L = ${fmt(n * 100)} cL.`],
        [`${qui.p} colle 100 gommettes sur chacune des ${n} pages de son album. Combien de gommettes en tout ?`, `${cap(qui.il)} colle ${fmt(n * 100)} gommettes.`],
        [`${qui.p} met 100 graines dans chaque sachet et remplit ${n} sachets. Combien de graines utilise-t-${qui.il} ?`, `${cap(qui.il)} utilise ${fmt(n * 100)} graines.`],
        [`Un paquet contient 100 feuilles. Combien de feuilles y a-t-il dans ${n} paquets ?`, `Il y a ${fmt(n * 100)} feuilles.`],
        [`${qui.p} a ${n} pièces de 1 €. Combien de centimes cela fait-il ?`, `Cela fait ${fmt(n * 100)} centimes.`],
      ] as const);

      return {
        text: texte,
        format: "short",
        expected: [String(n * 100)],
        comparator: "number_equal",
        explanation: exp(
          `Une centaine, c’est 100 unités : ${n} groupes de 100, c’est ${n} centaines.`,
          "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes.",
          `${calculP10(n, 100)}.`,
          conclusion
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_3_par_1000",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 1 000, c’est rendre chaque chiffre mille fois plus grand : il monte de trois colonnes.",
    tags: ["cm1", "multiplication", "puissance_dix", "par_1000", "template"],
    generate: () => {
      const n = randomInt(2, 99);
      return {
        text: enonceP10(n, 1000),
        format: "short",
        expected: [String(n * 1000)],
        comparator: "number_equal",
        explanation: explicationP10(n, 1000),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_3_par_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "1 000 dans chaque unité : on multiplie par 1 000.",
    tags: ["cm1", "multiplication", "puissance_dix", "par_1000", "mesures", "template"],
    generate: () => {
      const n = randomInt(2, 60);
      const qui = randomChoice(PRENOMS);
      const r = fmt(n * 1000);
      const [texte, conclusion] = randomChoice([
        [`${n} milliers, c’est combien d’unités ?`, `${n} milliers, ce sont ${r} unités.`],
        [`1 kg = 1 000 g. Combien de grammes pèse un sac de ${n} kg ?`, `Le sac pèse ${r} g.`],
        [`1 km = 1 000 m. ${qui.p} parcourt ${n} km à vélo. Combien de mètres cela fait-il ?`, `${cap(qui.il)} parcourt ${r} m.`],
        [`1 L = 1 000 mL. Combien de millilitres y a-t-il dans ${n} L ?`, `${n} L = ${r} mL.`],
        [`Un carton contient 1 000 feuilles. Combien de feuilles y a-t-il dans ${n} cartons ?`, `Il y a ${r} feuilles.`],
        [`Une salle de spectacle a 1 000 places. Combien de places y a-t-il dans ${n} salles comme celle-ci ?`, `Il y a ${r} places.`],
        [`${qui.p} achète ${n} paquets de 1 kg de farine. Combien de grammes de farine cela fait-il ?`, `Cela fait ${r} g de farine.`],
        [`Un concert accueille 1 000 spectateurs chaque soir. Combien de spectateurs en ${n} soirs ?`, `Il y a ${r} spectateurs.`],
        [`${qui.p} remplit ${n} bouteilles de 1 L. Combien de millilitres d’eau a-t-${qui.il} versés ?`, `${cap(qui.il)} a versé ${r} mL.`],
        [`Une forêt compte ${n} parcelles de 1 000 arbres. Combien d’arbres en tout ?`, `Il y a ${r} arbres.`],
      ] as const);

      return {
        text: texte,
        format: "short",
        expected: [String(n * 1000)],
        comparator: "number_equal",
        explanation: exp(
          `Mille, c’est 1 000 unités : ${n} fois 1 000, c’est ${n} milliers.`,
          "Multiplier par 1 000, c’est rendre chaque chiffre mille fois plus grand : il monte de trois colonnes.",
          `${calculP10(n, 1000)}.`,
          conclusion
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "× 10 donne des dizaines, × 100 des centaines, × 1 000 des milliers.",
    tags: ["cm1", "multiplication", "puissance_dix", "qcm", "template"],
    generate: () => {
      const n = randomInt(12, 98);
      const f = randomChoice([10, 100, 1000]);
      const r = n * f;
      const qui = randomChoice(PRENOMS);
      // Pièges : un zéro de trop, un zéro de moins, et « + » au lieu de « × ».
      const wrongs = [n * f * 10, f > 10 ? (n * f) / 10 : n, n + f].map(fmt);

      return {
        text: randomChoice([
          () => `Quel est le résultat de ${n} × ${fmt(f)} ?`,
          () => `Choisis le bon résultat : ${n} × ${fmt(f)}.`,
          () => `${qui.p} calcule ${n} × ${fmt(f)}. Quel nombre doit-${qui.il} trouver ?`,
          () => `Quel nombre est ${fmt(f)} fois plus grand que ${n} ?`,
          () => `${n} × ${fmt(f)} = ?`,
        ])(),
        format: "qcm",
        choices: makeChoices(fmt(r), wrongs),
        expected: [fmt(r)],
        comparator: "mcq_exact",
        explanation: explicationP10(n, f),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_4_qcm_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde en quoi le nombre est compté : dizaines, centaines ou milliers ?",
    tags: ["cm1", "multiplication", "puissance_dix", "facteur_manquant", "qcm", "template"],
    generate: () => {
      const n = randomInt(12, 98);
      const f = randomChoice([10, 100, 1000]);
      const r = fmt(n * f);
      const qui = randomChoice(PRENOMS);

      return {
        text: randomChoice([
          () => `Complète : ${n} × … = ${r}.`,
          () => `Par quel nombre faut-il multiplier ${n} pour obtenir ${r} ?`,
          () => `${qui.p} a multiplié ${n} par un nombre et a obtenu ${r}. Par quel nombre ?`,
          () => `${r} est combien de fois plus grand que ${n} ?`,
          () => `Quel nombre manque ? ${n} × ? = ${r}`,
        ])(),
        format: "qcm",
        choices: shuffle(["10", "100", "1 000", "10 000"]),
        expected: [fmt(f)],
        comparator: "mcq_exact",
        explanation: exp(
          "Multiplier par 10, 100 ou 1 000 rend chaque chiffre 10, 100 ou 1 000 fois plus grand.",
          methodeP10(f),
          `${calculP10(n, f)}.`,
          `Le nombre manquant est ${fmt(f)}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_5_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    hint: "La même quantité, 10, 100 ou 1 000 fois : on multiplie.",
    tags: ["cm1", "multiplication", "puissance_dix", "probleme", "template"],
    generate: () => {
      // Le marché de Saint-Pierre revenait seul : des situations variées.
      const n = randomInt(12, 250);
      const f = randomChoice([10, 100, 1000]);
      const F = fmt(f);
      const r = fmt(n * f);
      const [texte, conclusion] = randomChoice([
        [`Une usine fabrique ${n} jouets par jour. Combien de jouets fabrique-t-elle en ${F} jours ?`, `Elle fabrique ${r} jouets.`],
        [`Un stylo coûte ${n} centimes. Combien coûtent ${F} stylos, en centimes ?`, `${F} stylos coûtent ${r} centimes.`],
        [`Un car transporte ${n} passagers par jour. Combien de passagers en ${F} jours ?`, `Le car transporte ${r} passagers.`],
        [`Une imprimante imprime ${n} pages par heure. Combien de pages en ${F} heures ?`, `Elle imprime ${r} pages.`],
        [`Un livre a ${n} pages. La bibliothèque en a ${F} exemplaires. Combien de pages cela fait-il en tout ?`, `Cela fait ${r} pages.`],
        [`Une ruche produit ${n} grammes de miel par semaine. Combien de grammes produisent ${F} ruches pareilles ?`, `Elles produisent ${r} grammes de miel.`],
        [`Un randonneur fait ${n} pas par minute. Combien de pas en ${F} minutes ?`, `Il fait ${r} pas.`],
      ] as const);

      return {
        text: texte,
        format: "short",
        expected: [String(n * f)],
        comparator: "number_equal",
        explanation: exp(
          "La même quantité répétée plusieurs fois se calcule avec une multiplication.",
          methodeP10(f),
          `${calculP10(n, f)}.`,
          conclusion
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_5_reunion_marche_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque chiffre, même un zéro, prend une valeur 10, 100 ou 1 000 fois plus grande.",
    tags: ["cm1", "multiplication", "puissance_dix", "zero", "template"],
    generate: () => {
      // Le piège classique : un nombre qui contient DÉJÀ des zéros (120, 305).
      const n = randomChoice([
        randomInt(2, 99) * 10,
        randomInt(1, 9) * 100 + randomInt(1, 9),
        randomInt(1, 9) * 100,
      ]);
      const f = randomChoice([10, 100, 1000]);
      const qui = randomChoice(PRENOMS);
      const F = fmt(f);

      return {
        text: enonceP10(n, f, [
          () => `Attention aux zéros : calcule ${n} × ${F}.`,
          () => `${qui.p} doit calculer ${n} × ${F} sans perdre les zéros déjà présents. Quel résultat doit-${qui.il} trouver ?`,
          () => `Un carton contient ${n} objets. Combien d’objets y a-t-il dans ${F} cartons ?`,
        ]),
        format: "short",
        expected: [String(n * f)],
        comparator: "number_equal",
        explanation: explicationP10(n, f),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_6_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    hint: "× 10 donne des dizaines, × 100 des centaines, × 1 000 des milliers : vérifie le rang des chiffres.",
    tags: ["cm1", "multiplication", "puissance_dix", "erreur", "template"],
    generate: () => {
      const n = randomChoice([randomInt(12, 99), randomInt(2, 9) * 10 + randomInt(0, 9)]);
      const f = randomChoice([10, 100, 1000]);
      const correct = n * f;
      const juste = Math.random() < 0.5;
      // Un zéro oublié ou un zéro de trop : l'erreur réelle des élèves.
      const annonce = juste ? correct : randomChoice([correct * 10, correct / 10]);
      const q = enonceVerifier(`${n} × ${fmt(f)}`, fmt(annonce), juste);

      return {
        text: q.text,
        format: "qcm",
        choices: q.choices,
        expected: q.expected,
        comparator: "mcq_exact",
        explanation: exp(
          "Multiplier par 10, 100 ou 1 000 rend chaque chiffre 10, 100 ou 1 000 fois plus grand.",
          methodeP10(f),
          juste
            ? `${calculP10(n, f)} : c’est bien le résultat annoncé.`
            : `${calculP10(n, f)}, et non ${fmt(annonce)}.`,
          juste ? "L’égalité est juste." : "L’égalité est fausse."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_puissance_dix_tpl_6_erreur_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    hint: "× 10 donne des dizaines, × 100 des centaines, × 1 000 des milliers.",
    tags: ["cm1", "multiplication", "puissance_dix", "qcm", "template"],
    generate: () => {
      const n = randomInt(12, 99);
      const f = randomChoice([10, 100, 1000]);
      const r = fmt(n * f);
      const correct = `${n} × ${fmt(f)}`;
      const qui = randomChoice(PRENOMS);
      // Aucun piège n'a la même valeur que la bonne réponse.
      const wrongs = [10, 100, 1000, 10000]
        .filter((g) => g !== f)
        .map((g) => `${n} × ${fmt(g)}`);

      return {
        text: randomChoice([
          () => `Quel calcul donne ${r} ?`,
          () => `Lequel de ces calculs a pour résultat ${r} ?`,
          () => `${qui.p} a trouvé ${r}. Quel calcul a-t-${qui.il} fait ?`,
          () => `${r} est égal à :`,
        ])(),
        format: "qcm",
        choices: makeChoices(correct, wrongs),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Multiplier par 10, 100 ou 1 000 rend chaque chiffre 10, 100 ou 1 000 fois plus grand.",
          methodeP10(f),
          `${calculP10(n, f)}.`,
          `Le bon calcul est ${correct}.`
        ),
      };
    },
  },
    // ============================================================
  // MULTIPLICATION_PUISSANCE_DIX
  // Multiplier par 10, 100 ou 1 000
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_1_par_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    text: "Combien font 58 × 10 ?",
    format: "short",
    expected: ["580"],
    comparator: "number_equal",
    hint: "Multiplier par 10, c’est rendre chaque chiffre dix fois plus grand : il monte d’une colonne.",
    explanation: exp(
      "Multiplier par 10, 100 ou 1 000 permet de rendre un nombre 10, 100 ou 1 000 fois plus grand.",
      "Multiplier par 10, c’est rendre chaque chiffre dix fois plus grand : il monte d’une colonne.",
      "5 dizaines deviennent 5 centaines, 8 unités deviennent 8 dizaines : 58 × 10 = 580.",
      "Le résultat est 580."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "par_10"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_2_par_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est 100 fois plus grand que 47 ?",
    format: "short",
    expected: ["4700", "4 700"],
    comparator: "number_equal",
    hint: "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes.",
    explanation: exp(
      "Multiplier par 100 rend un nombre 100 fois plus grand.",
      "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes.",
      "4 dizaines deviennent 4 milliers, 7 unités deviennent 7 centaines : 47 × 100 = 4 700.",
      "Le résultat est 4 700."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "par_100"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_3_par_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    text: "Combien d’unités y a-t-il dans 9 milliers ?",
    format: "short",
    expected: ["9000", "9 000"],
    comparator: "number_equal",
    hint: "Multiplier par 1 000, c’est rendre chaque chiffre mille fois plus grand : il monte de trois colonnes.",
    explanation: exp(
      "Multiplier par 1 000 rend un nombre 1 000 fois plus grand.",
      "Multiplier par 1 000, c’est rendre chaque chiffre mille fois plus grand : il monte de trois colonnes.",
      "9 unités deviennent 9 milliers : 9 × 1 000 = 9 000.",
      "Le résultat est 9 000."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "par_1000"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_4_qcm_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    text: "Choisis le résultat de 63 × 10.",
    format: "qcm",
    // Les pièges « 4 800 » et « 58 » étaient recopiés de l'item 48 × 10.
    choices: ["630", "63", "6 300", "73"],
    expected: ["630"],
    comparator: "mcq_exact",
    hint: "Multiplier par 10 donne un nombre 10 fois plus grand.",
    explanation: exp(
      "Multiplier par 10 rend un nombre 10 fois plus grand.",
      "Multiplier par 10, c’est rendre chaque chiffre dix fois plus grand : il monte d’une colonne.",
      "6 dizaines deviennent 6 centaines, 3 unités deviennent 3 dizaines : 63 × 10 = 630.",
      "La bonne réponse est 630."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "qcm", "par_10"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_5_piege_zero_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    text: "Vrai ou faux : 308 × 10 = 3 080.",
    format: "qcm",
    choices: ["vrai", "faux"],
    expected: ["vrai"],
    comparator: "mcq_exact",
    hint: "Le zéro déjà présent dans 308 reste dans le nombre.",
    explanation: exp(
      "Multiplier un entier par 10 revient à rendre le nombre 10 fois plus grand.",
      "Multiplier par 10, c’est rendre chaque chiffre dix fois plus grand : il monte d’une colonne.",
      "3 centaines deviennent 3 milliers, 8 unités deviennent 8 dizaines : 308 × 10 = 3 080.",
      "L’égalité est vraie."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "zero", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_6_piege_nombre_grand_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    text: "Sur son ardoise, Malo a écrit : 46 × 100 = 460. Est-ce juste ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes.",
    explanation: exp(
      "Multiplier par 100 rend un nombre 100 fois plus grand.",
      "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes.",
      "4 dizaines deviennent 4 milliers, 6 unités deviennent 6 centaines : 46 × 100 = 4 600, et non 460.",
      "Malo s’est trompé : ce n’est pas juste."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "erreur", "piege"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_7_rang_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi 65 × 100 est-il plus grand que 65 × 10 ?",
    format: "open",
    expected: ["100", "10", "plus grand", "dix fois", "zéro"],
    comparator: "contains_keyword",
    hint: "100 est dix fois plus grand que 10.",
    explanation: exp(
      "Multiplier par 10 ou par 100 ne donne pas le même ordre de grandeur.",
      "On compare les multiplicateurs 10 et 100.",
      "100 est dix fois plus grand que 10, donc 65 × 100 est dix fois plus grand que 65 × 10.",
      "Multiplier par 100 donne un résultat plus grand que multiplier par 10."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "open", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_puissance_dix_fixed_8_nombre_avec_zero_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    text: "Attention aux zéros : combien font 250 × 100 ?",
    format: "short",
    expected: ["25000", "25 000"],
    comparator: "number_equal",
    hint: "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes, même un zéro.",
    explanation: exp(
      "Multiplier par 100 rend un nombre 100 fois plus grand.",
      "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes.",
      "2 centaines deviennent 2 dizaines de milliers, 5 dizaines deviennent 5 milliers : 250 × 100 = 25 000.",
      "Le résultat est 25 000."
    ),
    tags: ["cm1", "multiplication", "puissance_dix", "zero", "par_100"],
  },

    // ============================================================
  // MULTIPLICATION_PROBLEME
  // Utiliser la multiplication dans un problème
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_1_groupes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Il y a 6 boîtes avec 8 crayons dans chaque boîte. Combien y a-t-il de crayons au total ?",
    format: "short",
    expected: ["48"],
    comparator: "number_equal",
    hint: "Il y a le même nombre de crayons dans chaque boîte.",
    explanation: exp(
      "La multiplication permet de calculer rapidement des groupes égaux.",
      "On multiplie le nombre de boîtes par le nombre de crayons dans chaque boîte.",
      "6 × 8 = 48.",
      "Il y a 48 crayons au total."
    ),
    tags: ["cm1", "multiplication", "probleme", "groupes_egaux"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_2_addition_repetee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul correspond à 9 + 9 + 9 + 9 ?",
    format: "qcm",
    choices: ["4 × 9", "9 × 9", "4 + 9", "9 - 4"],
    expected: ["4 × 9"],
    comparator: "mcq_exact",
    hint: "Le nombre 9 est répété 4 fois.",
    explanation: exp(
      "Une multiplication peut remplacer une addition répétée.",
      "On compte combien de fois le même nombre est ajouté.",
      "9 + 9 + 9 + 9 correspond à 4 fois 9, donc 4 × 9.",
      "Le calcul correspondant est 4 × 9."
    ),
    tags: ["cm1", "multiplication", "probleme", "addition_repetee", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_3_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, un vendeur prépare 7 paniers avec 6 mangues dans chaque panier. Combien y a-t-il de mangues au total ?",
    format: "short",
    expected: ["42"],
    comparator: "number_equal",
    hint: "Chaque panier contient le même nombre de mangues.",
    explanation: exp(
      "La multiplication sert à calculer un total quand des groupes sont identiques.",
      "On multiplie le nombre de paniers par le nombre de mangues dans chaque panier.",
      "7 × 6 = 42.",
      "Il y a 42 mangues au total."
    ),
    tags: ["cm1", "multiplication", "probleme", "reunion", "marche"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_4_dechets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Pendant une sortie nature, 5 groupes ramassent chacun 12 déchets. Combien de déchets sont ramassés au total ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Chaque groupe ramasse 12 déchets.",
    explanation: exp(
      "La multiplication permet de calculer des groupes égaux.",
      "On multiplie le nombre de groupes par le nombre de déchets ramassés par groupe.",
      "5 × 12 = 60.",
      "Au total, 60 déchets sont ramassés."
    ),
    tags: ["cm1", "multiplication", "probleme", "reunion", "dechet", "ecologie"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_5_pieces",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un jeu vidéo, un coffre donne 25 pièces. Combien de pièces donnent 4 coffres ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "Chaque coffre donne 25 pièces.",
    explanation: exp(
      "La multiplication permet de calculer une même quantité répétée plusieurs fois.",
      "On multiplie le nombre de coffres par le nombre de pièces par coffre.",
      "4 × 25 = 100.",
      "Les 4 coffres donnent 100 pièces."
    ),
    tags: ["cm1", "multiplication", "probleme", "jeu_video", "pieces"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_6_choisir_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Dans quel cas faut-il utiliser une multiplication ?",
    format: "qcm",
    choices: [
      "8 sacs avec 6 objets dans chaque sac",
      "8 objets auxquels on enlève 6 objets",
      "8 objets partagés entre 6 élèves",
      "8 objets et encore 6 objets",
    ],
    expected: ["8 sacs avec 6 objets dans chaque sac"],
    comparator: "mcq_exact",
    hint: "La multiplication sert souvent à calculer des groupes égaux.",
    explanation: exp(
      "Choisir l’opération dépend du sens du problème.",
      "On utilise une multiplication quand une même quantité est répétée plusieurs fois.",
      "8 sacs avec 6 objets dans chaque sac correspond à 8 × 6.",
      "C’est donc la situation qui utilise une multiplication."
    ),
    tags: ["cm1", "multiplication", "probleme", "choisir_operation", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_7_piege_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève lit : « 6 sachets contiennent chacun 8 bonbons ». Il calcule 6 + 8 = 14. A-t-il choisi la bonne opération ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le mot « chacun » indique des groupes égaux.",
    explanation: exp(
      "Dans un problème, il faut choisir l’opération qui correspond à la situation.",
      "Quand plusieurs groupes contiennent chacun la même quantité, on multiplie.",
      "6 sachets de 8 bonbons donnent 6 × 8 = 48, et non 6 + 8.",
      "L’élève n’a pas choisi la bonne opération."
    ),
    tags: [
      "cm1",
      "multiplication",
      "probleme",
      "erreur",
      "piege",
      "choisir_operation",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_8_phrase_reponse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi faut-il écrire une phrase-réponse après un problème de multiplication ?",
    format: "open",
    expected: ["phrase", "réponse", "unité", "problème", "conclusion"],
    comparator: "contains_keyword",
    hint: "Le nombre seul ne dit pas toujours ce qu’il représente.",
    explanation: exp(
      "Une phrase-réponse relie le calcul au contexte du problème.",
      "On reprend les mots de la question et on ajoute l’unité si nécessaire.",
      "Par exemple, 6 × 8 = 48 doit devenir : il y a 48 crayons.",
      "La phrase-réponse permet de conclure clairement."
    ),
    tags: ["cm1", "multiplication", "probleme", "open", "redaction"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_probleme_fixed_9_canvas_posee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Une école commande 14 boîtes de 6 feutres. Combien de feutres y a-t-il au total ?",
    format: "short",
    expected: ["84"],
    comparator: "number_equal",
    hint: "Même nombre de feutres dans chaque boîte : on multiplie.",
    explanation: exp(
      "Un problème de groupes égaux se résout avec une multiplication.",
      "On multiplie le nombre de boîtes par le nombre de feutres par boîte.",
      "14 × 6 = 84.",
      "Il y a 84 feutres au total."
    ),
    tags: ["cm1", "multiplication", "probleme", "canvas", "groupes_egaux"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Problème — groupes égaux",
      numbers: ["14", "6"],
      result: "84",
      questionLabel: "On peut poser la multiplication.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "template",
    id: "cm1_multiplication_probleme_tpl_1_groupes_egaux",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "Même quantité dans chaque groupe : on multiplie.",
    tags: ["cm1", "multiplication", "probleme", "groupes_egaux", "template"],
    generate: () => {
      const s = randomChoice(SITUATIONS);
      const a = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const b = randomChoice([4, 5, 6, 7, 8, 9]);

      return {
        text: enonceGroupes(s, a, b),
        format: "short",
        expected: [String(a * b)],
        comparator: "number_equal",
        explanation: explicationGroupes(s, a, b),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_probleme_tpl_2_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Beaucoup d’objets dans chaque groupe : on multiplie quand même.",
    tags: ["cm1", "multiplication", "probleme", "groupes_egaux", "template"],
    generate: () => {
      // Le marché de Saint-Pierre seul revenait : des situations variées,
      // avec des groupes plus garnis (12 à 25 objets).
      const s = randomChoice(GRANDES);
      const a = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const b = randomInt(12, 25);

      return {
        text: enonceGroupes(s, a, b),
        format: "short",
        expected: [String(a * b)],
        comparator: "number_equal",
        explanation: explicationGroupes(s, a, b),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_probleme_tpl_3_dechets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque groupe fait la même chose : on multiplie.",
    tags: ["cm1", "multiplication", "probleme", "nature", "dechet", "template"],
    generate: () => {
      const a = randomChoice(ACTIONS_NATURE);
      const groupes = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const n = randomChoice([10, 12, 14, 15, 16, 18, 20, 24, 25]);
      const total = groupes * n;
      const ch = a.fem ? "chacune" : "chacun";

      return {
        text: randomChoice([
          () => `${groupes} ${a.qui} ${a.verbe} ${ch} ${n} ${a.o} ${a.ou}. Combien ${a.deO} en tout ?`,
          () => `Pour protéger la nature, ${groupes} ${a.qui} ${a.verbe} ${ch} ${n} ${a.o} ${a.ou}. Quel est le nombre total ${a.deO} ?`,
          () => `${cap(a.ou)}, ${groupes} ${a.qui} ${a.verbe} ${n} ${a.o} ${ch}. Combien ${a.deO} au total ?`,
          () => `${n} ${a.o} pour ${ch} des ${groupes} ${a.qui} : combien ${a.deO} en tout ?`,
        ])(),
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication permet de calculer le total de plusieurs groupes égaux.",
          `On multiplie le nombre ${de(a.qui)} par le nombre ${a.deO} de ${ch}.`,
          `${groupes} × ${n} = ${total}.`,
          `Au total, cela fait ${total} ${a.o}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_probleme_tpl_4_jeu_video",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque partie rapporte la même chose : on multiplie.",
    tags: ["cm1", "multiplication", "probleme", "jeu", "template"],
    generate: () => {
      const fois = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const gain = randomChoice([10, 15, 20, 25, 30, 50]);
      const total = fois * gain;
      const qui = randomChoice(PRENOMS);
      const [texte, unite] = randomChoice([
        [`Dans un jeu vidéo, chaque coffre donne ${gain} pièces. Combien de pièces donnent ${fois} coffres ?`, "pièces"],
        [`Dans un jeu, chaque niveau réussi rapporte ${gain} étoiles. ${qui.p} réussit ${fois} niveaux. Combien d’étoiles gagne-t-${qui.il} ?`, "étoiles"],
        [`Pour le défi lecture, ${qui.p} lit ${gain} pages par jour. Combien de pages lit-${qui.il} en ${fois} jours ?`, "pages"],
        [`Au bowling, ${qui.p} marque ${gain} points à chaque partie. Combien de points en ${fois} parties ?`, "points"],
        [`Une carte rare vaut ${gain} points. ${qui.p} en a ${fois}. Combien de points cela fait-il ?`, "points"],
        [`À la kermesse, chaque lancer réussi rapporte ${gain} tickets. ${qui.p} réussit ${fois} lancers. Combien de tickets gagne-t-${qui.il} ?`, "tickets"],
        [`Dans une course d’orientation, chaque balise trouvée rapporte ${gain} points. L’équipe en trouve ${fois}. Combien de points marque-t-elle ?`, "points"],
      ] as const);

      return {
        text: texte,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication permet de calculer un gain répété plusieurs fois.",
          `On multiplie le nombre de fois (${fois}) par le gain à chaque fois (${gain}).`,
          `${fois} × ${gain} = ${total}.`,
          `Cela fait ${total} ${unite}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_probleme_tpl_5_choisir_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche si on regroupe, enlève, partage ou répète.",
    tags: ["cm1", "multiplication", "probleme", "choisir_operation", "template"],
    generate: () => {
      const s = randomChoice(SITUATIONS);
      const groupes = randomChoice([4, 5, 6, 8, 9]);
      const quantite = randomChoice([7, 12, 15, 24].filter((q) => q !== groupes));
      const correct = `${groupes} × ${quantite}`;
      const situation = randomChoice([
        () => `${s.lieu}, ${groupes} ${s.g} ${s.verbe} ${chacun(s)} ${quantite} ${s.o}.`,
        () => `${s.lieu}, il y a ${groupes} ${s.g} et ${quantite} ${s.o} ${dans(s)} chaque ${s.gs}.`,
        () => `${s.lieu}, chaque ${s.gs} ${s.verbeS} ${quantite} ${s.o} ; il y a ${groupes} ${s.g}.`,
      ])();

      return {
        text: randomChoice([
          () => `${situation} Quel calcul donne le nombre total ${s.deO} ?`,
          () => `${situation} Quel calcul faut-il faire pour savoir combien il y a ${s.deO} ?`,
          () => `Lis bien : « ${situation} » Quel calcul permet de trouver le total ?`,
        ])(),
        format: "qcm",
        choices: makeChoices(correct, [
          `${groupes} + ${quantite}`,
          `${Math.max(groupes, quantite)} − ${Math.min(groupes, quantite)}`,
          `${quantite} ÷ ${groupes}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Choisir l’opération consiste à comprendre le sens du problème.",
          "La même quantité est répétée dans chaque groupe : c’est une multiplication.",
          `Il faut calculer ${groupes} × ${quantite} = ${groupes * quantite}.`,
          `Le bon calcul est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_probleme_tpl_6_canvas_posee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Tu peux poser la multiplication si le calcul est trop grand.",
    tags: ["cm1", "multiplication", "probleme", "canvas", "template"],
    generate: () => {
      // Le marché seul revenait : des situations variées, à poser.
      const s = randomChoice(GRANDES);
      const groupes = randomInt(12, 39);
      const objets = randomInt(4, 9);

      return {
        text: enonceGroupes(s, groupes, objets),
        format: "short",
        expected: [String(groupes * objets)],
        comparator: "number_equal",
        explanation: explicationGroupes(s, groupes, objets),
        canvas: canvasPose(groupes, objets, "Problème — multiplication", "On peut poser la multiplication."),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_probleme_tpl_7_addition_repetee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "Le même nombre ajouté plusieurs fois, c’est une multiplication.",
    tags: ["cm1", "multiplication", "probleme", "addition_repetee", "qcm", "template"],
    generate: () => {
      const n = randomChoice([3, 4, 5, 6]);
      const v = randomChoice([7, 8, 9, 12, 15, 20].filter((x) => x !== n));
      const somme = Array(n).fill(v).join(" + ");
      const correct = `${n} × ${v}`;
      const qui = randomChoice(PRENOMS);
      const situation = randomChoice([
        `${qui.p} range ${v} livres sur chacune de ses ${n} étagères. Pour compter, ${qui.il} écrit ${somme}.`,
        `${qui.p} économise ${v} € par semaine pendant ${n} semaines. ${cap(qui.il)} calcule ${somme}.`,
        `Chaque jour, ${qui.p} lit ${v} pages, pendant ${n} jours. ${cap(qui.il)} écrit ${somme}.`,
        `${n} amis apportent chacun ${v} gâteaux pour la fête. On compte ${somme}.`,
        `Un bus fait ${n} trajets avec ${v} passagers à chaque fois. On calcule ${somme}.`,
      ]);

      return {
        text: randomChoice([
          () => `${situation} Quelle multiplication donne le même résultat ?`,
          () => `${situation} Par quel calcul plus rapide peut-on remplacer cette addition ?`,
          () => `${situation} Quel calcul est équivalent ?`,
        ])(),
        format: "qcm",
        choices: makeChoices(correct, [
          `${n} + ${v}`,
          `${v} × ${v}`,
          `${n + 1} × ${v}`,
          `${n - 1} × ${v}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une addition répétée du même nombre se remplace par une multiplication.",
          `Le nombre ${v} est ajouté ${n} fois.`,
          `${somme} = ${n} × ${v} = ${n * v}.`,
          `Le calcul équivalent est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_probleme_tpl_8_prix",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "Le même prix pour chaque objet : on multiplie le prix par le nombre d’objets.",
    tags: ["cm1", "multiplication", "probleme", "prix", "template"],
    generate: () => {
      const [article, articles] = randomChoice(ARTICLES);
      const prix = randomInt(3, 9);
      const nb = randomInt(3, 9);
      const total = prix * nb;
      const qui = randomChoice(PRENOMS);

      return {
        text: randomChoice([
          () => `Un ${article} coûte ${prix} €. Combien coûtent ${nb} ${articles} ?`,
          () => `${qui.p} achète ${nb} ${articles} à ${prix} € pièce. Combien paie-t-${qui.il} ?`,
          () => `Au vide-grenier, chaque ${article} est vendu ${prix} €. ${qui.p} en achète ${nb}. Quel est le prix total ?`,
          () => `Pour la classe, on commande ${nb} ${articles}. Chacun coûte ${prix} €. Combien faut-il payer ?`,
        ])(),
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Quand chaque objet a le même prix, le prix total se calcule avec une multiplication.",
          "On multiplie le nombre d’objets par le prix d’un objet.",
          `${nb} × ${prix} = ${total}.`,
          `Le prix total est ${total} €.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_probleme_tpl_9_rangees_colonnes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Un rectangle de rangées et de colonnes : nombre de rangées × nombre par rangée.",
    tags: ["cm1", "multiplication", "probleme", "disposition_rectangulaire", "template"],
    generate: () => {
      const r = randomInt(4, 15);
      const c = randomInt(4, 12);
      const total = r * c;
      const [texte, objets] = randomChoice([
        [`Une tablette de chocolat a ${r} rangées de ${c} carrés. Combien de carrés en tout ?`, "carrés"],
        [`Un parking a ${r} rangées de ${c} places. Combien de voitures peut-il accueillir ?`, "places"],
        [`Dans la salle des fêtes, on installe ${r} rangées de ${c} chaises. Combien de chaises en tout ?`, "chaises"],
        [`Un potager a ${r} rangs de ${c} pieds de tomates. Combien de pieds de tomates en tout ?`, "pieds de tomates"],
        [`Un mur est couvert de ${r} rangées de ${c} carreaux. Combien de carreaux en tout ?`, "carreaux"],
        [`Une boîte de chocolats a ${r} lignes et ${c} colonnes, pleines. Combien de chocolats contient-elle ?`, "chocolats"],
        [`Dans le verger, on a planté ${r} rangées de ${c} arbres. Combien d’arbres y a-t-il ?`, "arbres"],
        [`Une feuille de timbres a ${r} lignes de ${c} timbres. Combien de timbres sur la feuille ?`, "timbres"],
      ] as const);

      return {
        text: texte,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Des objets rangés en rectangle se comptent avec une multiplication.",
          "On multiplie le nombre de rangées par le nombre d’objets dans une rangée.",
          `${r} × ${c} = ${total}.`,
          `Il y a ${total} ${objets}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_probleme_tpl_10_erreur_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Des groupes égaux se comptent avec une multiplication.",
    tags: ["cm1", "multiplication", "probleme", "erreur", "choisir_operation", "template"],
    generate: () => {
      const s = randomChoice(SITUATIONS);
      const a = randomInt(3, 9);
      const b = randomInt(4, 12);
      const qui = randomChoice(PRENOMS);
      // Une fois sur deux l'élève a bien choisi la multiplication.
      const bon = Math.random() < 0.5;
      const calcul = bon ? `${a} × ${b} = ${a * b}` : `${a} + ${b} = ${a + b}`;
      const [question, oui, non] = randomChoice([
        [`A-t-${qui.il} choisi la bonne opération ?`, "oui", "non"],
        [`Son calcul est-il le bon ?`, "oui", "non"],
        [`Vrai ou faux : ce calcul répond à la question.`, "vrai", "faux"],
      ] as const);

      return {
        text: `${s.lieu}, ${a} ${s.g} ${s.verbe} ${chacun(s)} ${b} ${s.o}. Pour trouver le nombre total ${s.deO}, ${qui.p} calcule ${calcul}. ${question}`,
        format: "qcm",
        choices: [oui, non],
        expected: [bon ? oui : non],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans un problème, il faut choisir l’opération qui correspond à la situation.",
          `« ${cap(chacun(s))} » indique des groupes égaux : on multiplie.`,
          `Il faut calculer ${a} × ${b} = ${a * b}.`,
          bon ? `${cap(qui.il)} a bien choisi.` : `${cap(qui.il)} aurait dû multiplier, pas additionner.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_probleme_tpl_11_nombre_de_groupes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche combien de fois la quantité d’un groupe tient dans le total.",
    tags: ["cm1", "multiplication", "probleme", "facteur_manquant", "template"],
    generate: () => {
      const s = randomChoice(GRANDES);
      const a = randomInt(3, 9);
      // Décision de Frédéric (05/10) : la taille des groupes reste dans les
      // tables de 2, 3, 4 ou 8 (8 est la référence).
      const b = randomChoice([2, 3, 4, 8, 8]);
      const r = a * b;

      return {
        text: randomChoice([
          () => `${s.lieu}, on a ${r} ${s.o}. On les met par ${b} ${dans(s)} des ${s.g}. Combien ${de(s.g)} remplit-on ?`,
          () => `${s.lieu}, ${b} ${s.o} ${dans(s)} chaque ${s.gs}, ${r} ${s.o} en tout. Combien y a-t-il ${de(s.g)} ?`,
          () => `${s.lieu}, il faut ranger ${r} ${s.o}, ${b} par ${s.gs}. Combien ${de(s.g)} faut-il ?`,
        ])(),
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: exp(
          "Retrouver le nombre de groupes, c’est chercher le facteur manquant.",
          `On cherche ? × ${b} = ${r}.`,
          b === 8
            ? `${a} × 8 = ${r}. On peut aussi diviser par 2 trois fois : ${r} → ${r / 2} → ${r / 4} → ${r / 8}.`
            : `${a} × ${b} = ${r}.`,
          `Il faut ${a} ${s.g}.`
        ),
      };
    },
  },
    // ============================================================
  // MULTIPLICATION_DEFI
  // Résoudre un défi de multiplication
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_fixed_1_tresor",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi trésor : un coffre contient 25 pièces. Il y a 8 coffres. Combien de pièces y a-t-il au total ?",
    format: "short",
    expected: ["200"],
    comparator: "number_equal",
    hint: "Calcule 25 × 8. Tu peux faire 25 × 4 puis doubler.",
    explanation: exp(
      "Un défi de multiplication peut demander une stratégie rapide.",
      "On repère des groupes égaux : 8 coffres de 25 pièces.",
      "25 × 8 = 200.",
      "Il y a 200 pièces au total."
    ),
    tags: ["cm1", "multiplication", "defi", "tresor", "pieces"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_fixed_2_margouillats",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Défi margouillats : on observe 6 murs. Sur chaque mur, il y a 7 margouillats. Combien observe-t-on de margouillats en tout ?",
    format: "short",
    expected: ["42"],
    comparator: "number_equal",
    hint: "Même nombre de margouillats sur chaque mur : on multiplie.",
    explanation: exp(
      "La multiplication permet de calculer des groupes égaux.",
      "On multiplie le nombre de murs par le nombre de margouillats sur chaque mur.",
      "6 × 7 = 42.",
      "On observe 42 margouillats en tout."
    ),
    tags: ["cm1", "multiplication", "defi", "reunion", "margouillat"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_fixed_3_erreur_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève lit : « 9 équipes ont chacune 12 bouteilles d’eau ». Il calcule 9 + 12 = 21. A-t-il choisi la bonne opération ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le mot « chacune » indique des groupes égaux.",
    explanation: exp(
      "Dans un problème, il faut choisir l’opération adaptée.",
      "Le mot « chacune » indique que la même quantité est répétée plusieurs fois.",
      "Il faut calculer 9 × 12 = 108, et non 9 + 12.",
      "L’élève n’a pas choisi la bonne opération."
    ),
    tags: [
      "cm1",
      "multiplication",
      "defi",
      "erreur",
      "choisir_operation",
      "eau",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_fixed_4_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Au marché, une famille achète 4 paniers de 12 mangues et 3 paniers de 8 letchis. Combien de fruits achète-t-elle en tout ?",
    format: "short",
    expected: ["72"],
    comparator: "number_equal",
    hint: "Calcule d’abord les mangues, puis les letchis, puis additionne.",
    explanation: exp(
      "Un problème à deux étapes demande plusieurs calculs.",
      "On calcule chaque groupe, puis on additionne les résultats.",
      "4 × 12 = 48 et 3 × 8 = 24. Puis 48 + 24 = 72.",
      "La famille achète 72 fruits en tout."
    ),
    tags: ["cm1", "multiplication", "defi", "reunion", "deux_etapes", "marche"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_fixed_5_canvas_posee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Défi calcul posé : calcule 348 × 6.",
    format: "short",
    expected: ["2088", "2 088"],
    comparator: "number_equal",
    hint: "Pose la multiplication et pense aux retenues.",
    explanation: exp(
      "Une multiplication posée aide à organiser un calcul difficile.",
      "On multiplie colonne par colonne en pensant aux retenues.",
      "348 × 6 = 2 088.",
      "Le résultat est 2 088."
    ),
    tags: ["cm1", "multiplication", "defi", "posee", "retenue", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Défi calcul posé",
      numbers: ["348", "6"],
      result: "2088",
      questionLabel: "Pense aux retenues.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_fixed_6_estimation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Avant de calculer 198 × 4, quel ordre de grandeur est le plus raisonnable ?",
    format: "qcm",
    choices: ["environ 800", "environ 80", "environ 8 000", "environ 200"],
    expected: ["environ 800"],
    comparator: "mcq_exact",
    hint: "198 est proche de 200.",
    explanation: exp(
      "Estimer un résultat permet de vérifier s’il est raisonnable.",
      "On remplace 198 par un nombre proche plus simple : 200.",
      "200 × 4 = 800.",
      "Un ordre de grandeur raisonnable est environ 800."
    ),
    tags: ["cm1", "multiplication", "defi", "estimation", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_fixed_7_ecologie_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Défi écologie : 7 classes ramassent chacune 18 déchets. Ensuite, 20 déchets sont retirés car ils ont déjà été comptés. Combien de déchets reste-t-il dans le total ?",
    format: "short",
    expected: ["106"],
    comparator: "number_equal",
    hint: "Calcule d’abord 7 × 18, puis enlève 20.",
    explanation: exp(
      "Un défi peut combiner multiplication et soustraction.",
      "On calcule d’abord le total des groupes égaux, puis on ajuste.",
      "7 × 18 = 126. Puis 126 - 20 = 106.",
      "Il reste 106 déchets dans le total."
    ),
    tags: [
      "cm1",
      "multiplication",
      "defi",
      "reunion",
      "ecologie",
      "deux_etapes",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_fixed_8_canvas_probleme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Défi marché : 16 sacs contiennent chacun 7 fruits. Combien y a-t-il de fruits en tout ?",
    format: "short",
    expected: ["112"],
    comparator: "number_equal",
    hint: "Tu peux poser 16 × 7.",
    explanation: exp(
      "Un défi de multiplication peut se résoudre avec un calcul posé.",
      "On identifie les groupes égaux : 16 sacs de 7 fruits.",
      "16 × 7 = 112.",
      "Il y a 112 fruits en tout."
    ),
    tags: ["cm1", "multiplication", "defi", "reunion", "canvas", "marche"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Défi marché",
      numbers: ["16", "7"],
      result: "112",
      questionLabel: "On peut poser la multiplication.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "template",
    id: "cm1_multiplication_defi_tpl_1_tresor",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Même quantité à chaque fois : on multiplie. Astuce : 25 × 4 = 100.",
    tags: ["cm1", "multiplication", "defi", "tresor", "template"],
    generate: () => {
      const c = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const p = randomChoice([15, 20, 25, 30, 40, 50]);
      const total = c * p;
      const qui = randomChoice(PRENOMS);
      const [texte, unite] = randomChoice([
        [`Défi trésor : ${c} coffres contiennent chacun ${p} pièces d’or. Combien de pièces y a-t-il au total ?`, "pièces"],
        [`Défi pirates : ${c} sacs renferment chacun ${p} perles. Combien de perles les pirates ont-ils ?`, "perles"],
        [`Défi chasse aux œufs : ${c} équipes trouvent chacune ${p} œufs. Combien d’œufs sont trouvés en tout ?`, "œufs"],
        [`Défi sport : ${qui.p} fait ${p} sauts à la corde, ${c} fois dans la journée. Combien de sauts en tout ?`, "sauts"],
        [`Défi lecture : ${qui.p} lit ${p} pages par jour pendant ${c} jours. Combien de pages a-t-${qui.il} lues ?`, "pages"],
        [`Défi tirelire : ${qui.p} met ${p} € de côté chaque mois pendant ${c} mois. Combien a-t-${qui.il} économisé ?`, "euros"],
        [`Défi course : un coureur fait ${c} tours de stade. Chaque tour lui rapporte ${p} points. Combien de points marque-t-il ?`, "points"],
        [`Défi rangement : ${c} étagères portent chacune ${p} livres. Combien de livres y a-t-il ?`, "livres"],
      ] as const);

      return {
        text: texte,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La multiplication permet de calculer des groupes égaux.",
          `On multiplie ${c} par ${p}. On peut s’aider de ${p} × 2 = ${p * 2}.`,
          `${c} × ${p} = ${total}.`,
          `Cela fait ${total} ${unite}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_defi_tpl_2_margouillats",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Même nombre d’animaux à chaque endroit : on multiplie.",
    tags: ["cm1", "multiplication", "defi", "nature", "observation", "template"],
    generate: () => {
      // Les margouillats restent (une observation réunionnaise), parmi d'autres.
      const m = randomInt(4, 9);
      const k = randomInt(6, 14);
      const total = m * k;
      const [lieux, animaux, sur] = randomChoice([
        ["murs", "margouillats", "sur chaque mur"],
        ["arbres", "nids", "dans chaque arbre"],
        ["mares", "grenouilles", "dans chaque mare"],
        ["fils électriques", "moineaux", "sur chaque fil"],
        ["rochers", "crabes", "sous chaque rocher"],
        ["massifs de fleurs", "abeilles", "dans chaque massif"],
        ["branches", "chenilles", "sur chaque branche"],
      ] as const);

      return {
        text: randomChoice([
          () => `Défi nature : on observe ${m} ${lieux} avec ${k} ${animaux} ${sur}. Combien ${de(animaux)} observe-t-on en tout ?`,
          () => `Défi observation : il y a ${k} ${animaux} ${sur}, et ${m} ${lieux}. Combien ${de(animaux)} en tout ?`,
          () => `Pendant la sortie, la classe compte ${k} ${animaux} ${sur}. Il y a ${m} ${lieux}. Combien ${de(animaux)} la classe compte-t-elle en tout ?`,
        ])(),
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication peut modéliser une observation répétée.",
          `On multiplie le nombre ${de(lieux)} par le nombre ${de(animaux)} ${sur}.`,
          `${m} × ${k} = ${total}.`,
          `On observe ${total} ${animaux} en tout.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_defi_tpl_3_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule chaque groupe à part, puis combine les deux résultats.",
    tags: ["cm1", "multiplication", "defi", "deux_etapes", "template"],
    generate: () => {
      const s = randomChoice(GRANDES);
      // Le premier lot est toujours le plus gros, pour que « de plus » ait un sens.
      let p1 = 0;
      let f1 = 0;
      let p2 = 0;
      let f2 = 0;
      do {
        p1 = randomInt(3, 8);
        f1 = randomChoice([8, 10, 12, 15, 20]);
        p2 = randomInt(2, 6);
        f2 = randomChoice([6, 8, 9, 12]);
      } while (p1 * f1 <= p2 * f2 || f1 === f2);
      const t1 = p1 * f1;
      const t2 = p2 * f2;
      const difference = Math.random() < 0.35;
      const reponse = difference ? t1 - t2 : t1 + t2;
      const lots = `${p1} ${s.g} de ${f1} ${s.o} et ${p2} ${s.g} de ${f2} ${s.o}`;

      const text = difference
        ? randomChoice([
            () => `${s.lieu}, on compte ${lots}. Combien ${s.deO} de plus y a-t-il dans les ${s.g} de ${f1} ?`,
            () => `Défi : ${minuscule(s.lieu)}, il y a ${lots}. Quelle est la différence entre les deux lots ?`,
          ])()
        : randomChoice([
            () => `${s.lieu}, on compte ${lots}. Combien y a-t-il ${s.deO} en tout ?`,
            () => `Défi : ${minuscule(s.lieu)}, il y a ${lots}. Quel est le nombre total ${s.deO} ?`,
            () => `${s.lieu}, ${p1} ${s.g} ${s.verbe} ${chacun(s)} ${f1} ${s.o}, et ${p2} autres en ${s.verbe} ${chacun(s)} ${f2}. Combien ${s.deO} en tout ?`,
          ])();

      return {
        text,
        format: "short",
        expected: [String(reponse)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à deux étapes demande de traiter chaque partie.",
          difference
            ? "On calcule chaque lot, puis on fait la différence."
            : "On calcule chaque lot, puis on additionne.",
          `${p1} × ${f1} = ${t1} et ${p2} × ${f2} = ${t2}. Puis ${t1} ${difference ? "−" : "+"} ${t2} = ${reponse}.`,
          difference
            ? `Il y a ${reponse} ${s.o} de plus.`
            : `Il y a ${reponse} ${s.o} en tout.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_defi_tpl_4_canvas_posee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Pose la multiplication et vérifie les retenues.",
    tags: ["cm1", "multiplication", "defi", "posee", "canvas", "template"],
    generate: () => {
      const a = randomInt(2, 9) * 100 + randomInt(1, 9) * 10 + randomInt(5, 9);
      const b = randomInt(4, 9);
      const result = a * b;

      return {
        text: randomChoice([
          () => `Défi calcul posé. ${enoncePose(a, b)}`,
          () => `Grand défi ! ${enoncePose(a, b)}`,
          () => enoncePose(a, b),
        ])(),
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication posée permet de traiter un calcul difficile.",
          "On multiplie colonne par colonne et on pense aux retenues.",
          `${a} × ${b} = ${fmt(result)}.`,
          `Le résultat est ${fmt(result)}.`
        ),
        canvas: canvasPose(a, b, "Défi calcul posé", "Attention aux retenues."),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_defi_tpl_5_erreur_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie l’opération choisie, puis le calcul lui-même.",
    tags: [
      "cm1",
      "multiplication",
      "defi",
      "erreur",
      "choisir_operation",
      "template",
    ],
    generate: () => {
      const s = randomChoice(GRANDES);
      const a = randomInt(5, 9);
      const b = randomChoice([8, 9, 12, 15, 20, 25]);
      const p = a * b;
      const qui = randomChoice(PRENOMS);
      // Trois cas : tout est juste ; « + » au lieu de « × » ; bon calcul
      // mais résultat faux. Seul le premier mérite un « oui ».
      const cas = randomChoice(["juste", "addition", "resultat"] as const);
      const calcul =
        cas === "juste"
          ? `${a} × ${b} = ${p}`
          : cas === "addition"
            ? `${a} + ${b} = ${a + b}`
            : `${a} × ${b} = ${p + randomChoice([-10, 10, -2, 2])}`;
      const [question, oui, non] = randomChoice([
        [`A-t-${qui.il} raison ?`, "oui", "non"],
        [`Sa réponse est-elle juste ?`, "oui", "non"],
        [`Vrai ou faux : ${qui.p} a trouvé le bon total.`, "vrai", "faux"],
      ] as const);

      return {
        text: `${s.lieu}, ${a} ${s.g} ${s.verbe} ${chacun(s)} ${b} ${s.o}. ${qui.p} écrit : ${calcul}. ${question}`,
        format: "qcm",
        choices: [oui, non],
        expected: [cas === "juste" ? oui : non],
        comparator: "mcq_exact",
        explanation: exp(
          "Il faut vérifier deux choses : l’opération choisie et le calcul.",
          `« ${cap(chacun(s))} » indique des groupes égaux : on multiplie.`,
          `${a} × ${b} = ${p}.`,
          cas === "juste"
            ? `${qui.p} a raison : il y a ${p} ${s.o}.`
            : cas === "addition"
              ? `${qui.p} a additionné au lieu de multiplier : il y a ${p} ${s.o}.`
              : `${qui.p} a bien choisi la multiplication mais s’est trompé${qui.il === "elle" ? "e" : ""} dans le calcul : il y a ${p} ${s.o}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_defi_tpl_6_ecologie_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule d’abord le total, puis corrige-le.",
    tags: [
      "cm1",
      "multiplication",
      "defi",
      "ecologie",
      "deux_etapes",
      "template",
    ],
    generate: () => {
      const act = randomChoice(ACTIONS_NATURE);
      const g = randomInt(4, 9);
      const n = randomChoice([12, 14, 15, 16, 18, 20, 25]);
      const d = randomChoice([8, 10, 12, 15, 20, 25]);
      const brut = g * n;
      const ajoute = Math.random() < 0.4;
      const total = ajoute ? brut + d : brut - d;
      const ch = act.fem ? "chacune" : "chacun";
      const debut = `Défi écologie : ${g} ${act.qui} ${act.verbe} ${ch} ${n} ${act.o} ${act.ou}.`;
      const e = act.oFem ? "e" : "";
      const ils = act.oFem ? "elles" : "ils";

      const text = ajoute
        ? randomChoice([
            () => `${debut} Les animateurs en ajoutent ${d}. Combien ${act.deO} en tout ?`,
            () => `${debut} Le lendemain, ${d} de plus s’ajoutent. Quel est le nouveau total ?`,
          ])()
        : randomChoice([
            () => `${debut} On s’aperçoit que ${d} ont été compté${e}s deux fois. Quel est le vrai total ?`,
            () => `${debut} On retire ${d} ${act.o} déjà compté${e}s. Quel est le total corrigé ?`,
            () => `${debut} ${d} ne comptent pas car ${ils} ont été noté${e}s en double. Combien en reste-t-il dans le total ?`,
          ])();

      return {
        text,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un défi peut combiner multiplication et addition ou soustraction.",
          "On calcule d’abord le total par multiplication, puis on corrige.",
          `${g} × ${n} = ${brut}, puis ${brut} ${ajoute ? "+" : "−"} ${d} = ${total}.`,
          `Le total est ${total} ${act.o}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_defi_tpl_7_estimation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Arrondis le grand nombre à la centaine la plus proche.",
    tags: ["cm1", "multiplication", "defi", "estimation", "template"],
    generate: () => {
      const rounded = randomInt(2, 9) * 100;
      const a = rounded + randomChoice([-4, -3, -2, -1, 1, 2, 3, 4]);
      const b = randomInt(3, 9);
      const approx = rounded * b;
      const correct = `environ ${fmt(approx)}`;
      const qui = randomChoice(PRENOMS);

      return {
        text: randomChoice([
          () => `Avant de calculer exactement ${a} × ${b}, quel ordre de grandeur est raisonnable ?`,
          () => `${qui.p} va poser ${a} × ${b}. Quel résultat doit-${qui.il} attendre, à peu près ?`,
          () => `Sans poser l’opération, estime ${a} × ${b}.`,
          () => `Un magasin vend ${b} vélos à ${a} € l’un. À peu près combien encaisse-t-il ?`,
        ])(),
        format: "qcm",
        choices: makeChoices(correct, [
          `environ ${fmt(approx * 10)}`,
          `environ ${fmt(approx / 10)}`,
          `environ ${fmt(rounded + b)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une estimation permet de vérifier si un résultat est raisonnable.",
          "On arrondit le nombre le plus compliqué à la centaine.",
          `${a} est proche de ${rounded}, donc ${a} × ${b} est proche de ${rounded} × ${b} = ${fmt(approx)}.`,
          `Un ordre de grandeur raisonnable est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_defi_tpl_8_comparer_lots",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule le total de chaque lot, puis compare.",
    tags: ["cm1", "multiplication", "defi", "comparer", "qcm", "template"],
    generate: () => {
      const s = randomChoice(GRANDES);
      const a1 = randomInt(3, 9);
      const b1 = randomInt(4, 12);
      let a2 = 0;
      let b2 = 0;
      // Une fois sur quatre, les deux lots sont égaux (6 × 8 et 4 × 12).
      const egal = Math.random() < 0.25;
      const t1 = a1 * b1;
      const diviseurs = [2, 3, 4, 5, 6, 8, 9, 10, 12].filter(
        (d) => t1 % d === 0 && d !== a1 && t1 / d >= 3 && t1 / d <= 15,
      );
      if (egal && diviseurs.length) {
        a2 = randomChoice(diviseurs);
        b2 = t1 / a2;
      } else {
        do {
          a2 = randomInt(3, 9);
          b2 = randomInt(4, 12);
        } while (a2 * b2 === t1);
      }
      const t2 = a2 * b2;
      const qui = randomChoice(PRENOMS);
      const correct = t1 > t2 ? "le lot A" : t2 > t1 ? "le lot B" : "autant dans les deux";

      return {
        text: randomChoice([
          () => `${s.lieu}, lot A : ${a1} ${s.g} de ${b1} ${s.o}. Lot B : ${a2} ${s.g} de ${b2} ${s.o}. Où y a-t-il le plus ${s.deO} ?`,
          () => `${qui.p} hésite entre ${a1} ${s.g} de ${b1} ${s.o} (lot A) et ${a2} ${s.g} de ${b2} ${s.o} (lot B). Lequel contient le plus ${s.deO} ?`,
          () => `Défi : compare le lot A (${a1} ${s.g} de ${b1} ${s.o}) et le lot B (${a2} ${s.g} de ${b2} ${s.o}). Lequel en a le plus ?`,
        ])(),
        format: "qcm",
        choices: ["le lot A", "le lot B", "autant dans les deux"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer deux lots de groupes égaux, on calcule chaque total.",
          "On multiplie, puis on compare les deux résultats.",
          `Lot A : ${a1} × ${b1} = ${t1}. Lot B : ${a2} × ${b2} = ${t2}.`,
          t1 === t2
            ? `Il y a autant ${s.deO} dans les deux lots.`
            : `C’est ${correct} qui en contient le plus.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_multiplication_defi_tpl_9_rendre_la_monnaie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule d’abord le prix total, puis ce qu’il reste du billet.",
    tags: ["cm1", "multiplication", "defi", "deux_etapes", "monnaie", "template"],
    generate: () => {
      const [, articles] = randomChoice(ARTICLES);
      const n = randomInt(2, 6);
      const p = randomInt(4, 15);
      const total = n * p;
      const billet = [20, 50, 100].find((x) => x > total) ?? 100;
      const rendu = billet - total;
      const qui = randomChoice(PRENOMS);

      return {
        text: randomChoice([
          () => `${qui.p} achète ${n} ${articles} à ${p} € pièce. ${cap(qui.il)} paie avec un billet de ${billet} €. Combien lui rend-on ?`,
          () => `Défi monnaie : ${n} ${articles} coûtent ${p} € chacun. On paie avec ${billet} €. Combien d’argent reste-t-il ?`,
          () => `Avec un billet de ${billet} €, ${qui.p} achète ${n} ${articles} à ${p} € l’un. Combien lui reste-t-il ?`,
        ])(),
        format: "short",
        expected: [String(rendu)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à deux étapes : on calcule le prix, puis la monnaie.",
          "On multiplie le prix d’un objet par le nombre d’objets, puis on soustrait du billet.",
          `${n} × ${p} = ${total}, puis ${billet} − ${total} = ${rendu}.`,
          `On rend ${rendu} €.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_multiplication_defi_open_1_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la multiplication est utile dans la vie quotidienne.",
    format: "open",
    expected: ["groupes", "répéter", "calculer", "fois", "total"],
    comparator: "contains_keyword",
    hint: "Pense aux groupes égaux : paquets, prix, équipes, objets.",
    explanation: exp(
      "La multiplication sert à calculer plus vite des quantités répétées.",
      "On l’utilise quand on a plusieurs groupes identiques ou une même quantité plusieurs fois.",
      "Par exemple, 6 paquets de 8 objets se calculent avec 6 × 8.",
      "La multiplication est utile pour trouver rapidement un total."
    ),
    tags: ["cm1", "multiplication", "defi", "open", "sens"],
  },
];
