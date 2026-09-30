// lib/tutor-v4/question-banks/maths/4e/fractions.bank.ts
import type {
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
  FractionCanvasData,
} from "@/lib/tutor-v4/types";

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Les propositions d'un gabarit sont écrites à la main, et deux d'entre elles
// finissent par coïncider dès qu'un paramètre tombe sur une valeur particulière
// (a = b, un coefficient nul, une fraction qui se simplifie…). L'élève voyait
// alors deux fois la même ligne. Depuis le 30/09, `qcmQ` et `qcmTextes` (plus
// bas) mettent la bonne réponse de côté, tirent trois pièges réellement
// distincts — de VALEUR différente pour les fractions — et complètent au besoin.

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}

function frac(n: number, d: number) {
  return `${n}/${d}`;
}

function fractionCanvas(
  data: Omit<FractionCanvasData, "kind">
): FractionCanvasData {
  return { kind: "fraction", ...data };
}


/* ============================================================================
   ⛔⛔ 30/09/2026 — « DES QUESTIONS REVIENNENT SOUVENT ».
   Les élèves de 4e reconnaissaient la PHRASE, pas les nombres : 5 à 10
   squelettes d'énoncé par micro, 14 à 18 répétitions sur une série de 20.
   Chaque gabarit construit maintenant la LISTE de ses énoncés possibles
   (tournures × forme de l'expression × situations) et en tire UN, au hasard
   et uniformément : aucune phrase ne pèse plus qu'une autre.
   Les situations (tables ci-dessous) couvrent la lecture, le vélo, la course,
   le jardin, la cuisine, le bricolage, la musique, l'écologie, les sciences…
   La Réunion y reste UN contexte parmi d'autres (un champ de canne).
   Mesure : npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 4e fraction_nombre fraction_calcul
============================================================================ */

type Genere = TutorGeneratedQuestionV4;

/** Un rationnel : dénominateur positif. `q()` le rend irréductible. */
type Q = { n: number; d: number };

function q(n: number, d = 1): Q {
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = pgcd(Math.abs(n), d) || 1;
  return { n: n / g, d: d / g };
}
const qAdd = (x: Q, y: Q) => q(x.n * y.d + y.n * x.d, x.d * y.d);
const qMul = (x: Q, y: Q) => q(x.n * y.n, x.d * y.d);
const qDiv = (x: Q, y: Q) => q(x.n * y.d, x.d * y.n);
const memeValeur = (x: Q, y: Q) => x.n * y.d === y.n * x.d;
const ppcm = (a: number, b: number) => (a * b) / pgcd(a, b);

/** Entre dollars. */
const $m = (s: string) => `$${s}$`;
/** Une fraction ÉCRITE telle quelle (pas réduite) ; dénominateur 1 → entier. */
function tf(n: number, d: number): string {
  if (d === 1) return String(n);
  return n < 0 ? `-\\frac{${-n}}{${d}}` : `\\frac{${n}}{${d}}`;
}
const tq = (x: Q) => tf(x.n, x.d);
/** Toujours sous forme de fraction, même sur 1 : $\frac{7}{1}$. */
const tfFrac = (x: Q) => (x.n < 0 ? `-\\frac{${-x.n}}{${x.d}}` : `\\frac{${x.n}}{${x.d}}`);
/** Un terme négatif, dans une somme ou un produit, prend des parenthèses. */
const tp = (x: Q) => (x.n < 0 ? `\\left(${tq(x)}\\right)` : tq(x));
/** Ce que l'élève tape : « 3/4 », « -2/5 », « 3 ». */
const pq = (x: Q) => (x.d === 1 ? String(x.n) : `${x.n}/${x.d}`);
/** Les écritures tapées acceptées pour un rationnel (signe devant ou en bas). */
function reponsesTapees(x: Q, brut?: Q): string[] {
  const r = [pq(x)];
  if (x.n < 0) r.push(x.d === 1 ? `−${-x.n}` : `−${-x.n}/${x.d}`, x.d === 1 ? String(x.n) : `${-x.n}/-${x.d}`);
  if (brut && !(brut.n === x.n && brut.d === x.d) && brut.d !== 0) r.push(`${brut.n}/${brut.d}`);
  return Array.from(new Set(r));
}
/** 0,75 — virgule française, quatre décimales au plus. */
const virgule = (v: number) => String(Math.round(v * 10000) / 10000).replace(".", ",");
/** 0{,}75 — la même, dans une formule. */
const tv = (v: number) => virgule(v).replace(",", "{,}");

const expl = (def: string, meth: string, calc: string, concl: string) =>
  `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;

/** Une fraction irréductible n/d, 0 < n < d ≤ dMax. */
function tirerFraction(dMax: number, dMin = 2): Q {
  let n: number;
  let d: number;
  do {
    d = randomInt(dMin, dMax);
    n = randomInt(1, d - 1);
  } while (pgcd(n, d) !== 1);
  return { n, d };
}

/**
 * QCM de rationnels. La bonne réponse, puis des pièges de VALEUR différente :
 * deux écritures du même nombre seraient deux bonnes réponses. On complète
 * avec des voisins s'il en manque — toujours quatre lignes.
 */
function qcmQ(bonne: Q, pieges: Q[], affiche: (x: Q) => string = tq) {
  const bon = $m(affiche(bonne));
  const vus: Q[] = [bonne];
  const out: string[] = [];
  const essai = (p: Q) => {
    if (out.length >= 3) return;
    if (!Number.isInteger(p.n) || !Number.isInteger(p.d) || p.d <= 0) return;
    // « 0/8 » n'est un piège sérieux que là où on l'a voulu (écriture fractionnaire).
    if (p.n === 0 && affiche === tq) return;
    if (vus.some((v) => memeValeur(v, p))) return;
    const s = $m(affiche(p));
    if (s === bon || out.includes(s)) return;
    vus.push(p);
    out.push(s);
  };
  pieges.forEach(essai);
  for (let k = 1; out.length < 3 && k < 40; k++) {
    essai({ n: bonne.n + k, d: bonne.d });
    essai({ n: bonne.n, d: bonne.d + k });
    essai({ n: -bonne.n - k, d: bonne.d });
  }
  return { choices: shuffle([bon, ...out]), expected: [bon] };
}

/** QCM de textes : la bonne, trois pièges distincts, complétés au besoin. */
function qcmTextes(bonne: string, pieges: string[], reserve: string[] = []) {
  const out: string[] = [];
  for (const p of [...pieges, ...reserve]) {
    if (out.length >= 3) break;
    if (p !== bonne && !out.includes(p)) out.push(p);
  }
  return { choices: shuffle([bonne, ...out]), expected: [bonne] };
}

const LETTRES_EXPR = ["A", "B", "C", "D", "E", "K", "M", "P"];
const LETTRES_INC = ["x", "a", "t", "y", "n"];

/** Les consignes d'un calcul nu. `e` : l'expression LaTeX, sans dollars. */
const CALCULE: ((e: string) => string)[] = [
  (e) => `Calcule $${e}$.`,
  (e) => `Calculer $${e}$.`,
  (e) => `Donne la valeur de $${e}$.`,
  (e) => `Que vaut $${e}$ ?`,
  (e) => `Effectue $${e}$.`,
  (e) => `Quel est le résultat de $${e}$ ?`,
  (e) => `Écris $${e}$ sous la forme d'une seule fraction.`,
  (e) => `Calcule $${e}$, puis simplifie le résultat si possible.`,
  (e) => `On pose $${randomChoice(LETTRES_EXPR)} = ${e}$. Calcule ce nombre.`,
  (e) => `Trouve la valeur exacte de $${e}$.`,
  (e) => `À quoi est égal $${e}$ ?`,
  (e) => `Calcule et donne le résultat sous la forme la plus simple : $${e}$.`,
];

/* ---------------------------------------------------------------------------
   LES SITUATIONS. Les groupes nominaux portent leur article contracté
   (« du roman », « de l'étape »), pour que les questions s'accordent.
--------------------------------------------------------------------------- */

/** Une part d'un tout. */
const PARTS: { s: (f: string) => string; tout: string }[] = [
  { s: (f) => `Léa a lu ${f} de son roman.`, tout: "du roman" },
  { s: (f) => `Hugo a peint ${f} du mur de sa chambre.`, tout: "du mur" },
  { s: (f) => `Un cycliste a parcouru ${f} de son étape.`, tout: "de l'étape" },
  { s: (f) => `On a rempli ${f} d'une cuve de récupération d'eau de pluie.`, tout: "de la cuve" },
  { s: (f) => `Une coureuse a couvert ${f} du parcours d'un semi-marathon.`, tout: "du parcours" },
  { s: (f) => `Au jardin, on a planté des tomates sur ${f} du potager.`, tout: "du potager" },
  { s: (f) => `Pendant une sortie, un vélo électrique a utilisé ${f} de la charge de sa batterie.`, tout: "de la charge" },
  { s: (f) => `Samia a écouté ${f} d'un album.`, tout: "de l'album" },
  { s: (f) => `Tom a assemblé ${f} d'un puzzle.`, tout: "du puzzle" },
  { s: (f) => `Un agriculteur a moissonné ${f} de son champ de blé.`, tout: "du champ" },
  { s: (f) => `Une fromagerie a vendu ${f} d'une meule de comté.`, tout: "de la meule" },
  { s: (f) => `Une randonneuse a fait ${f} de la montée vers le refuge.`, tout: "de la montée" },
  { s: (f) => `Un carreleur a posé ${f} du carrelage d'une terrasse.`, tout: "du carrelage" },
  { s: (f) => `Un planteur a coupé ${f} de son champ de canne à sucre.`, tout: "du champ de canne" },
  { s: (f) => `Un orchestre a joué ${f} de son programme.`, tout: "du programme" },
  { s: (f) => `Une équipe de scientifiques a analysé ${f} des échantillons prélevés dans une rivière.`, tout: "des échantillons" },
  { s: (f) => `Une imprimante a déjà imprimé ${f} d'un dossier.`, tout: "du dossier" },
  { s: (f) => `Un nageur a effectué ${f} de son entraînement.`, tout: "de l'entraînement" },
];

/** Deux parts de deux touts identiques (on les compare). */
const DUOS: ((a: string, b: string) => string)[] = [
  (a, b) => `Léa a lu ${a} de son roman, Hugo a lu ${b} du même roman.`,
  (a, b) => `Deux cyclistes font la même étape : l'un en a parcouru ${a}, l'autre ${b}.`,
  (a, b) => `Deux cuves identiques sont remplies, l'une à ${a} de sa capacité, l'autre à ${b}.`,
  (a, b) => `Deux pizzas ont la même taille : Inès mange ${a} de la sienne, Malik ${b} de la sienne.`,
  (a, b) => `Deux jardiniers ont des parcelles identiques : l'un a semé ${a} de la sienne, l'autre ${b}.`,
  (a, b) => `Sur la même piste, Nora a fait ${a} d'un tour et Emma ${b} d'un tour.`,
  (a, b) => `Deux téléphones identiques ont utilisé ${a} et ${b} de leur batterie.`,
  (a, b) => `Deux recettes utilisent ${a} et ${b} d'une même tablette de chocolat.`,
  (a, b) => `Deux élèves ont colorié ${a} et ${b} de deux rectangles identiques.`,
  (a, b) => `Deux groupes de randonneurs ont gravi ${a} et ${b} de la même montée.`,
  (a, b) => `Dans un collège, ${a} des élèves de 4e A et ${b} des élèves de 4e B font partie d'un club sportif.`,
  (a, b) => `Deux musiciens ont appris ${a} et ${b} du même morceau.`,
  (a, b) => `Dans deux champs de canne de même surface, on a coupé ${a} du premier et ${b} du second.`,
  (a, b) => `Deux imprimantes ont imprimé ${a} et ${b} du même dossier.`,
  (a, b) => `Deux panneaux solaires identiques sont couverts de poussière sur ${a} et ${b} de leur surface.`,
  (a, b) => `Deux nageurs ont fait ${a} et ${b} du même entraînement.`,
];

/** Deux parts successives d'un même tout : on les additionne, ou on cherche le reste. */
const ETAPES: { s: (a: string, b: string) => string; total: string; reste: string }[] = [
  { s: (a, b) => `Un randonneur parcourt ${a} d'un sentier le matin et ${b} l'après-midi.`, total: "Quelle fraction du sentier a-t-il parcourue dans la journée ?", reste: "Quelle fraction du sentier lui reste-t-il à parcourir ?" },
  { s: (a, b) => `Léa lit ${a} d'un roman samedi et ${b} dimanche.`, total: "Quelle fraction du roman a-t-elle lue pendant le week-end ?", reste: "Quelle fraction du roman lui reste-t-il à lire ?" },
  { s: (a, b) => `Un peintre repeint ${a} d'une façade lundi et ${b} mardi.`, total: "Quelle fraction de la façade a-t-il repeinte en deux jours ?", reste: "Quelle fraction de la façade reste-t-il à repeindre ?" },
  { s: (a, b) => `Une famille consacre ${a} de son budget au logement et ${b} à l'alimentation.`, total: "Quelle fraction du budget ces deux postes représentent-ils ensemble ?", reste: "Quelle fraction du budget reste-t-il pour les autres dépenses ?" },
  { s: (a, b) => `Dans un potager, on plante des salades sur ${a} de la surface et des carottes sur ${b}.`, total: "Quelle fraction du potager est plantée ?", reste: "Quelle fraction du potager reste libre ?" },
  { s: (a, b) => `Une cycliste fait ${a} de son parcours sur piste cyclable et ${b} sur une petite route.`, total: "Quelle fraction du parcours cela représente-t-il en tout ?", reste: "Quelle fraction du parcours se fait sur d'autres voies ?" },
  { s: (a, b) => `Une cuve d'arrosage perd ${a} de son contenu la première semaine et ${b} la deuxième.`, total: "Quelle fraction du contenu a-t-elle perdue en deux semaines ?", reste: "Quelle fraction du contenu reste-t-il dans la cuve ?" },
  { s: (a, b) => `Dans une playlist, ${a} des morceaux sont du rap et ${b} du reggae.`, total: "Quelle fraction des morceaux sont du rap ou du reggae ?", reste: "Quelle fraction des morceaux ne sont ni du rap ni du reggae ?" },
  { s: (a, b) => `Parmi les adhérents d'un club, ${a} font du football et ${b} du basket.`, total: "Quelle fraction des adhérents pratiquent l'un de ces deux sports ?", reste: "Quelle fraction des adhérents ne pratiquent aucun de ces deux sports ?" },
  { s: (a, b) => `Un maçon monte ${a} d'un mur le matin et ${b} l'après-midi.`, total: "Quelle fraction du mur a-t-il montée dans la journée ?", reste: "Quelle fraction du mur reste-t-il à monter ?" },
  { s: (a, b) => `Au tri sélectif d'un collège, ${a} des déchets sont du papier et ${b} du plastique.`, total: "Quelle fraction des déchets sont du papier ou du plastique ?", reste: "Quelle fraction des déchets ne sont ni du papier ni du plastique ?" },
  { s: (a, b) => `Une nageuse effectue ${a} de son entraînement en crawl et ${b} en dos.`, total: "Quelle fraction de l'entraînement se fait en crawl ou en dos ?", reste: "Quelle fraction de l'entraînement se fait dans d'autres nages ?" },
  { s: (a, b) => `Un groupe de musique répète ${a} de son concert le vendredi et ${b} le samedi.`, total: "Quelle fraction du concert a-t-il répétée ?", reste: "Quelle fraction du concert reste-t-il à répéter ?" },
  { s: (a, b) => `Une imprimante imprime ${a} d'un dossier avant la pause et ${b} après.`, total: "Quelle fraction du dossier est imprimée ?", reste: "Quelle fraction du dossier reste-t-il à imprimer ?" },
  { s: (a, b) => `Pendant un trajet, une voiture électrique utilise ${a} de sa batterie sur autoroute et ${b} en ville.`, total: "Quelle fraction de la batterie a-t-elle utilisée ?", reste: "Quelle fraction de la batterie reste-t-il ?" },
  { s: (a, b) => `Un agriculteur récolte ${a} de ses pommes de terre en juillet et ${b} en août.`, total: "Quelle fraction de la récolte est faite à la fin du mois d'août ?", reste: "Quelle fraction de la récolte reste-t-il à faire en septembre ?" },
];

/** Une fraction d'une fraction : on multiplie. */
const PARMI: { s: (a: string, b: string) => string; q: string }[] = [
  { s: (a, b) => `Un jardin occupe ${a} d'un terrain, et les tomates occupent ${b} du jardin.`, q: "Quelle fraction du terrain les tomates occupent-elles ?" },
  { s: (a, b) => `Dans un collège, ${a} des élèves sont demi-pensionnaires, et ${b} des demi-pensionnaires sont des filles.`, q: "Quelle fraction des élèves du collège sont des filles demi-pensionnaires ?" },
  { s: (a, b) => `Une famille consacre ${a} de son budget aux loisirs, et ${b} de cette somme va au sport.`, q: "Quelle fraction du budget va au sport ?" },
  { s: (a, b) => `Une forêt couvre ${a} d'une commune, et les chênes occupent ${b} de la forêt.`, q: "Quelle fraction de la commune les chênes occupent-ils ?" },
  { s: (a, b) => `Sur une plage, ${a} des déchets ramassés sont en plastique, et ${b} de ces déchets en plastique sont des bouteilles.`, q: "Quelle fraction des déchets ramassés sont des bouteilles en plastique ?" },
  { s: (a, b) => `À un concert, ${a} des spectateurs sont venus en train, et ${b} d'entre eux avaient un billet à tarif réduit.`, q: "Quelle fraction des spectateurs sont venus en train avec un billet à tarif réduit ?" },
  { s: (a, b) => `Un trajet à vélo se fait sur piste cyclable pour ${a} de sa longueur, et ${b} de cette piste est en montée.`, q: "Quelle fraction du trajet se fait sur piste cyclable en montée ?" },
  { s: (a, b) => `Dans une playlist, ${a} des morceaux sont du rap, et ${b} de ces morceaux sont en français.`, q: "Quelle fraction de la playlist est du rap en français ?" },
  { s: (a, b) => `Dans un club, ${a} des adhérents jouent au football, et ${b} des footballeurs font de la compétition.`, q: "Quelle fraction des adhérents sont des footballeurs en compétition ?" },
  { s: (a, b) => `Une ferme cultive ${a} de ses terres, et le maïs occupe ${b} des terres cultivées.`, q: "Quelle fraction des terres de la ferme est occupée par le maïs ?" },
  { s: (a, b) => `Des panneaux solaires fournissent ${a} de l'électricité d'une maison, et ${b} de cette électricité sert à chauffer l'eau.`, q: "Quelle fraction de l'électricité de la maison est de l'électricité solaire qui chauffe l'eau ?" },
  { s: (a, b) => `On peint en bleu ${a} d'une planche, puis on vernit ${b} de la partie bleue.`, q: "Quelle fraction de la planche est bleue et vernie ?" },
  { s: (a, b) => `Dans une bibliothèque, ${a} des livres sont des romans, et ${b} des romans sont des romans policiers.`, q: "Quelle fraction des livres sont des romans policiers ?" },
  { s: (a, b) => `Dans un aquarium, ${a} des poissons sont des guppys, et ${b} des guppys sont des femelles.`, q: "Quelle fraction des poissons sont des guppys femelles ?" },
  { s: (a, b) => `Un parc naturel est couvert de prairies sur ${a} de sa surface, et ${b} des prairies sont fauchées en juin.`, q: "Quelle fraction du parc est fauchée en juin ?" },
];

/**
 * Une fraction d'une quantité. `lo`–`hi` : l'ordre de grandeur plausible du
 * total ; `pas` : le total est un multiple de d × pas (des pages par dizaines…).
 */
const QUANTITES: { s: (f: string, n: string) => string; q: string; r: string; lo: number; hi: number; pas: number; unite: string }[] = [
  { s: (f, n) => `Une classe compte ${n} élèves ; ${f} d'entre eux font de l'allemand.`, q: "Combien d'élèves font de l'allemand ?", r: "Combien d'élèves ne font pas d'allemand ?", lo: 20, hi: 36, pas: 1, unite: "élèves" },
  { s: (f, n) => `Un roman compte ${n} pages ; Léa en a lu ${f}.`, q: "Combien de pages a-t-elle lues ?", r: "Combien de pages lui reste-t-il à lire ?", lo: 120, hi: 480, pas: 10, unite: "pages" },
  { s: (f, n) => `Un randonneur doit parcourir ${n} km ; il en a déjà fait ${f}.`, q: "Combien de kilomètres a-t-il parcourus ?", r: "Combien de kilomètres lui reste-t-il à parcourir ?", lo: 12, hi: 40, pas: 1, unite: "km" },
  { s: (f, n) => `Une cuve contient ${n} litres d'eau de pluie ; on en utilise ${f} pour arroser le potager.`, q: "Combien de litres utilise-t-on ?", r: "Combien de litres reste-t-il dans la cuve ?", lo: 200, hi: 1000, pas: 50, unite: "L" },
  { s: (f, n) => `Samir a ${n} € d'économies et en dépense ${f} pour acheter un vélo.`, q: "Combien dépense-t-il ?", r: "Combien d'argent lui reste-t-il ?", lo: 120, hi: 400, pas: 10, unite: "€" },
  { s: (f, n) => `Un match de handball dure ${n} minutes ; une joueuse est restée sur le terrain pendant ${f} du match.`, q: "Combien de minutes a-t-elle joué ?", r: "Combien de minutes est-elle restée sur le banc ?", lo: 60, hi: 60, pas: 1, unite: "minutes" },
  { s: (f, n) => `Un paquet contient ${n} g de farine ; on en utilise ${f} pour une recette de crêpes.`, q: "Combien de grammes de farine utilise-t-on ?", r: "Combien de grammes de farine reste-t-il dans le paquet ?", lo: 500, hi: 1000, pas: 50, unite: "g" },
  { s: (f, n) => `Une salle de concert compte ${n} places ; ${f} des places sont déjà vendues.`, q: "Combien de places sont vendues ?", r: "Combien de places reste-t-il à vendre ?", lo: 300, hi: 1200, pas: 50, unite: "places" },
  { s: (f, n) => `Un verger compte ${n} arbres ; ${f} d'entre eux sont des pommiers.`, q: "Combien y a-t-il de pommiers ?", r: "Combien d'arbres ne sont pas des pommiers ?", lo: 30, hi: 120, pas: 1, unite: "arbres" },
  { s: (f, n) => `Une course cycliste fait ${n} km ; ${f} du parcours est en montagne.`, q: "Combien de kilomètres se font en montagne ?", r: "Combien de kilomètres ne sont pas en montagne ?", lo: 120, hi: 200, pas: 10, unite: "km" },
  { s: (f, n) => `Un film dure ${n} minutes ; on en a déjà regardé ${f}.`, q: "Combien de minutes a-t-on regardées ?", r: "Combien de minutes de film reste-t-il ?", lo: 90, hi: 150, pas: 1, unite: "minutes" },
  { s: (f, n) => `Un collège trie ${n} kg de déchets par semaine ; ${f} de ces déchets sont recyclables.`, q: "Combien de kilogrammes de déchets sont recyclables ?", r: "Combien de kilogrammes de déchets ne sont pas recyclables ?", lo: 100, hi: 400, pas: 10, unite: "kg" },
  { s: (f, n) => `Au marché, un panier contient ${n} fruits ; ${f} des fruits sont des mangues.`, q: "Combien y a-t-il de mangues ?", r: "Combien de fruits ne sont pas des mangues ?", lo: 12, hi: 48, pas: 1, unite: "fruits" },
  { s: (f, n) => `Un groupe de ${n} randonneurs part en montagne ; ${f} d'entre eux atteignent le sommet.`, q: "Combien de randonneurs atteignent le sommet ?", r: "Combien de randonneurs n'atteignent pas le sommet ?", lo: 12, hi: 40, pas: 1, unite: "randonneurs" },
  { s: (f, n) => `Une chorale compte ${n} choristes ; ${f} sont des sopranos.`, q: "Combien y a-t-il de sopranos ?", r: "Combien de choristes ne sont pas des sopranos ?", lo: 20, hi: 60, pas: 1, unite: "choristes" },
  { s: (f, n) => `Pour une expérience de SVT, on sème ${n} graines ; ${f} ont germé au bout d'une semaine.`, q: "Combien de graines ont germé ?", r: "Combien de graines n'ont pas germé ?", lo: 20, hi: 100, pas: 1, unite: "graines" },
  { s: (f, n) => `Un bricoleur a une planche de ${n} cm ; il en coupe ${f}.`, q: "Combien de centimètres coupe-t-il ?", r: "Quelle longueur de planche lui reste-t-il, en centimètres ?", lo: 60, hi: 240, pas: 10, unite: "cm" },
];

/** Un total multiple de d × pas, entre lo et hi ; null s'il n'y en a pas. */
function totalEntre(d: number, lo: number, hi: number, pas: number): number | null {
  const ok: number[] = [];
  for (let t = d * pas; t <= hi; t += d * pas) if (t >= lo) ok.push(t);
  return ok.length ? randomChoice(ok) : null;
}

/** Une quantité et une fraction qui tombent juste pour ce contexte. */
function tirerQuantite(ds: number[]) {
  for (;;) {
    const c = randomChoice(QUANTITES);
    const d = randomChoice(ds);
    const total = totalEntre(d, c.lo, c.hi, c.pas);
    if (total === null) continue;
    const n = randomChoice(Array.from({ length: d - 1 }, (_, i) => i + 1).filter((k) => pgcd(k, d) === 1));
    return { c, f: { n, d } as Q, total, part: (total / d) * n };
  }
}

/** Les fractions qui se disent en mots. */
const FRACTIONS_EN_MOTS: { n: number; d: number; mot: string }[] = [
  { n: 1, d: 2, mot: "la moitié" },
  { n: 1, d: 3, mot: "le tiers" },
  { n: 2, d: 3, mot: "les deux tiers" },
  { n: 1, d: 4, mot: "le quart" },
  { n: 3, d: 4, mot: "les trois quarts" },
  { n: 1, d: 5, mot: "le cinquième" },
  { n: 2, d: 5, mot: "les deux cinquièmes" },
  { n: 3, d: 5, mot: "les trois cinquièmes" },
  { n: 4, d: 5, mot: "les quatre cinquièmes" },
  { n: 1, d: 10, mot: "le dixième" },
  { n: 3, d: 10, mot: "les trois dixièmes" },
];

/** Une mesure, pour les écritures décimales. */
const MESURES: { s: (x: string) => string; nom: string; unite: string; deUnite: string }[] = [
  { s: (x) => `Une recette demande ${x} kg de farine.`, nom: "cette masse", unite: "kilogrammes", deUnite: "de kilogramme" },
  { s: (x) => `Un randonneur marche pendant ${x} h.`, nom: "cette durée", unite: "heures", deUnite: "d'heure" },
  { s: (x) => `Une bouteille contient ${x} L d'eau.`, nom: "cette quantité", unite: "litres", deUnite: "de litre" },
  { s: (x) => `Une planche mesure ${x} m.`, nom: "cette longueur", unite: "mètres", deUnite: "de mètre" },
  { s: (x) => `Une nageuse parcourt ${x} km.`, nom: "cette distance", unite: "kilomètres", deUnite: "de kilomètre" },
  { s: (x) => `Un fromager coupe un morceau de ${x} kg.`, nom: "cette masse", unite: "kilogrammes", deUnite: "de kilogramme" },
  { s: (x) => `Un escargot avance de ${x} m en une minute.`, nom: "cette distance", unite: "mètres", deUnite: "de mètre" },
  { s: (x) => `Un arrosoir contient ${x} L d'eau.`, nom: "cette quantité", unite: "litres", deUnite: "de litre" },
  { s: (x) => `Une pousse de bambou grandit de ${x} m en une journée.`, nom: "cette longueur", unite: "mètres", deUnite: "de mètre" },
  { s: (x) => `Un morceau de musique dure ${x} min.`, nom: "cette durée", unite: "minutes", deUnite: "de minute" },
  { s: (x) => `Un colis pèse ${x} kg.`, nom: "cette masse", unite: "kilogrammes", deUnite: "de kilogramme" },
  { s: (x) => `Une rampe d'accès monte de ${x} m.`, nom: "cette hauteur", unite: "mètres", deUnite: "de mètre" },
  { s: (x) => `Un cycliste roule pendant ${x} h.`, nom: "cette durée", unite: "heures", deUnite: "d'heure" },
  { s: (x) => `On verse ${x} L d'huile dans le moteur d'une tondeuse.`, nom: "cette quantité", unite: "litres", deUnite: "de litre" },
];

/** Un nombre relatif en situation. */
const NOMBRES_EN_SITUATION: { s: (x: string) => string; signe: "pos" | "neg" | "tous" }[] = [
  { s: (x) => `Un thermomètre affiche ${x} °C.`, signe: "tous" },
  { s: (x) => `Un plongeur se trouve à l'altitude ${x} m.`, signe: "neg" },
  { s: (x) => `Le solde d'un compte bancaire est de ${x} €.`, signe: "tous" },
  { s: (x) => `Sur une droite graduée, le point M a pour abscisse ${x}.`, signe: "tous" },
  { s: (x) => `Un sac contient ${x} kg de sucre.`, signe: "pos" },
  { s: (x) => `La température d'un congélateur est de ${x} °C.`, signe: "neg" },
  { s: (x) => `Une balance indique ${x} kg.`, signe: "pos" },
  { s: (x) => `Dans un jeu de société, Karim a un score de ${x} points.`, signe: "tous" },
  { s: (x) => `Un tableur affiche ${x} dans une cellule.`, signe: "tous" },
  { s: (x) => `Une randonneuse a parcouru ${x} km.`, signe: "pos" },
  { s: (x) => `Le niveau d'un lac a varié de ${x} cm en un mois.`, signe: "tous" },
  { s: (x) => `Pendant un orage, il est tombé ${x} mm de pluie en une heure.`, signe: "pos" },
];

const PRENOMS: { nom: string; il: "il" | "elle" }[] = [
  { nom: "Tom", il: "il" },
  { nom: "Inès", il: "elle" },
  { nom: "Yanis", il: "il" },
  { nom: "Chloé", il: "elle" },
  { nom: "Malik", il: "il" },
  { nom: "Sarah", il: "elle" },
  { nom: "Noé", il: "il" },
  { nom: "Jade", il: "elle" },
  { nom: "Lucas", il: "il" },
  { nom: "Aïcha", il: "elle" },
];

/* ===========================================================================
   FRACTION_EGALE
=========================================================================== */

function enoncesEgale(F: string): string[] {
  return [
    `Quelle fraction est égale à ${F} ?`,
    `Parmi ces fractions, laquelle est égale à ${F} ?`,
    `Quelle fraction a la même valeur que ${F} ?`,
    `Quelle fraction est équivalente à ${F} ?`,
    `${F} est égale à l'une de ces fractions. Laquelle ?`,
    `Laquelle de ces écritures désigne le même nombre que ${F} ?`,
    `Trouve, parmi les propositions, une fraction égale à ${F}.`,
    `Quelle fraction repère le même point que ${F} sur une droite graduée ?`,
    `Quelle écriture fractionnaire est égale à ${F} ?`,
    `Une seule de ces fractions est égale à ${F}. Laquelle ?`,
    ...PARTS.flatMap((p) => [
      `${p.s(F)} Quelle autre fraction ${p.tout} représente la même part ?`,
      `${p.s(F)} Un camarade écrit cette part autrement. Quelle écriture est juste ?`,
      `${p.s(F)} Quelle fraction ${p.tout} est égale à cette part ?`,
    ]),
  ];
}

/** ★1 : on multiplie ; ★2 : on simplifie d'abord, puis on multiplie. */
function genEgaleQcm(niveau: 1 | 2): Genere {
  const base = tirerFraction(niveau === 1 ? 9 : 7);
  const k1 = niveau === 1 ? 1 : randomInt(2, 4);
  let k2 = randomInt(2, 5);
  while (k2 === k1) k2 = randomInt(2, 5);
  const F = { n: base.n * k1, d: base.d * k1 };
  const bonne = { n: base.n * k2, d: base.d * k2 };
  const { choices, expected } = qcmQ(bonne, [
    { n: F.n + k2, d: F.d + k2 },
    { n: F.n * k2, d: F.d },
    { n: F.n, d: F.d * k2 },
    { n: F.d, d: F.n },
    { n: bonne.n + 1, d: bonne.d },
    { n: bonne.n, d: bonne.d + 1 },
  ]);
  const Ft = tf(F.n, F.d);
  const Bt = tf(bonne.n, bonne.d);
  return {
    text: randomChoice(enoncesEgale($m(Ft))),
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation: expl(
      "deux fractions sont égales quand on passe de l'une à l'autre en multipliant (ou en divisant) le numérateur et le dénominateur par un même nombre non nul.",
      niveau === 1
        ? `on multiplie le numérateur et le dénominateur de $${Ft}$ par ${k2}.`
        : `on divise ${F.n} et ${F.d} par ${k1}, puis on multiplie le numérateur et le dénominateur obtenus par ${k2}.`,
      niveau === 1
        ? `$${Ft} = \\frac{${F.n} \\times ${k2}}{${F.d} \\times ${k2}} = ${Bt}$.`
        : `$${Ft} = ${tf(base.n, base.d)} = \\frac{${base.n} \\times ${k2}}{${base.d} \\times ${k2}} = ${Bt}$.`,
      `la fraction égale à $${Ft}$ est $${Bt}$.`,
    ),
  };
}

/** Le numérateur (ou le dénominateur) manquant d'une égalité de fractions. */
function genEgaleManquant(): Genere {
  const base = tirerFraction(7);
  const k1 = randomChoice([1, 1, 2, 3]);
  let k2 = randomInt(2, 6);
  while (k2 === k1) k2 = randomInt(2, 6);
  const F = { n: base.n * k1, d: base.d * k1 };
  const T = { n: base.n * k2, d: base.d * k2 };
  const surNum = Math.random() < 0.5;
  const gauche = Math.random() < 0.5;
  const L = randomChoice(LETTRES_INC);
  const Ft = tf(F.n, F.d);
  const trou = (s: string) => (surNum ? `\\frac{${s}}{${T.d}}` : `\\frac{${T.n}}{${s}}`);
  const eg = (s: string) => (gauche ? `${trou(s)} = ${Ft}` : `${Ft} = ${trou(s)}`);
  const rep = surNum ? T.n : T.d;
  const textes = [
    `Complète l'égalité : $${eg("?")}$.`,
    `Quel nombre faut-il écrire à la place du point d'interrogation : $${eg("?")}$ ?`,
    `Trouve le nombre manquant : $${eg("?")}$.`,
    `Quelle valeur de $${L}$ rend l'égalité $${eg(L)}$ vraie ?`,
    `Détermine $${L}$ sachant que $${eg(L)}$.`,
    `Complète : $${eg("\\ldots")}$.`,
    ...PARTS.flatMap((p) => [
      surNum
        ? `${p.s($m(Ft))} Écris cette part avec le dénominateur ${T.d} : quel est le numérateur ?`
        : `${p.s($m(Ft))} Écris cette part avec le numérateur ${T.n} : quel est le dénominateur ?`,
      `${p.s($m(Ft))} Complète pour écrire la même part ${p.tout} : $${eg("?")}$.`,
    ]),
  ];
  const chemin =
    k1 === 1
      ? `$${Ft} = \\frac{${base.n} \\times ${k2}}{${base.d} \\times ${k2}} = ${tf(T.n, T.d)}$`
      : `$${Ft} = ${tf(base.n, base.d)} = \\frac{${base.n} \\times ${k2}}{${base.d} \\times ${k2}} = ${tf(T.n, T.d)}$`;
  return {
    text: randomChoice(textes),
    format: "short",
    expected: [String(rep)],
    comparator: "number_equal",
    explanation: expl(
      "pour obtenir une fraction égale, on multiplie (ou on divise) le numérateur et le dénominateur par le même nombre.",
      k1 === 1
        ? `on passe de ${surNum ? F.d : F.n} à ${surNum ? T.d : T.n} en multipliant par ${k2} ; on fait de même pour ${surNum ? "le numérateur" : "le dénominateur"}.`
        : `on simplifie d'abord $${Ft}$ en $${tf(base.n, base.d)}$ (division par ${k1}), puis on multiplie par ${k2}.`,
      `${chemin}.`,
      `le nombre manquant est ${rep}.`,
    ),
  };
}

/** « Ces deux fractions sont-elles égales ? » — ★2 multiples simples, ★3 produits en croix. */
function genEgalesOuiNon(niveau: 2 | 3): { g: Genere; a: Q; b: Q } {
  const base = tirerFraction(niveau === 2 ? 6 : 7);
  const egal = Math.random() < 0.5;
  let a: Q;
  let b: Q;
  if (niveau === 2) {
    a = base;
    const k = randomInt(2, 3);
    b = { n: base.n * k, d: base.d * k };
  } else {
    const k1 = randomInt(2, 4);
    let k2 = randomInt(2, 5);
    while (k2 === k1) k2 = randomInt(2, 5);
    a = { n: base.n * k1, d: base.d * k1 };
    b = { n: base.n * k2, d: base.d * k2 };
  }
  if (!egal) {
    const bouge = randomChoice(["n+", "n-", "d+"]);
    if (bouge === "n+" || b.n === 1) b = { n: b.n + 1, d: b.d };
    else if (bouge === "n-") b = { n: b.n - 1, d: b.d };
    else b = { n: b.n, d: b.d + 1 };
    if (b.n >= b.d) b = { n: b.n, d: b.n + 1 };
  }
  if (Math.random() < 0.5) [a, b] = [b, a];
  const rep = memeValeur(a, b) ? "oui" : "non";
  const at = tf(a.n, a.d);
  const bt = tf(b.n, b.d);
  const A = $m(at);
  const B = $m(bt);
  const suites = [
    "Les deux fractions sont-elles égales ?",
    "Est-ce la même proportion dans les deux cas ?",
    "Réponds par oui ou par non : ces deux fractions ont-elles la même valeur ?",
    ...(niveau === 3 ? ["Ces deux parts sont-elles égales ? Aide-toi des produits en croix."] : []),
  ];
  const textes = [
    `Les fractions ${A} et ${B} sont-elles égales ?`,
    `A-t-on $${at} = ${bt}$ ?`,
    `Est-il vrai que $${at} = ${bt}$ ?`,
    `${A} et ${B} désignent-elles le même nombre ?`,
    `Les nombres ${A} et ${B} ont-ils la même valeur ?`,
    `Un élève affirme que ${A} et ${B} sont égales. A-t-il raison ?`,
    `L'égalité $${at} = ${bt}$ est-elle vraie ?`,
    `Les fractions ${A} et ${B} représentent-elles la même proportion ?`,
    `Sur une droite graduée, ${A} et ${B} repèrent-elles le même point ?`,
    ...DUOS.flatMap((s) => suites.map((suite) => `${s(A, B)} ${suite}`)),
  ];
  return {
    a,
    b,
    g: {
      text: randomChoice(textes),
      format: "qcm",
      choices: ["oui", "non"],
      expected: [rep],
      comparator: "mcq_exact",
      explanation: expl(
        "deux fractions $\\frac{a}{b}$ et $\\frac{c}{d}$ sont égales exactement quand les produits en croix $a \\times d$ et $b \\times c$ sont égaux.",
        "on calcule les deux produits en croix et on les compare.",
        `$${a.n} \\times ${b.d} = ${a.n * b.d}$ et $${a.d} \\times ${b.n} = ${a.d * b.n}$.`,
        rep === "oui"
          ? `les produits sont égaux : $${at} = ${bt}$, la réponse est oui.`
          : `les produits sont différents : $${at} \\neq ${bt}$, la réponse est non.`,
      ),
    },
  };
}

/* ===========================================================================
   FRACTION_SIMPLIFIER
=========================================================================== */

function enoncesSimplifier(F: string): string[] {
  return [
    `Simplifie ${F}.`,
    `Simplifier la fraction ${F}.`,
    `Écris ${F} sous forme irréductible.`,
    `Quelle est la forme irréductible de ${F} ?`,
    `Rends la fraction ${F} irréductible.`,
    `Simplifie ${F} au maximum.`,
    `Quelle fraction irréductible est égale à ${F} ?`,
    `Écris ${F} avec le plus petit dénominateur possible.`,
    `Réduis la fraction ${F} : quelle fraction obtiens-tu ?`,
    `Un élève doit simplifier ${F} au maximum. Quel résultat doit-il trouver ?`,
    `Donne l'écriture irréductible de ${F}.`,
    ...PARTS.flatMap((p) => [
      `${p.s(F)} Simplifie cette fraction au maximum.`,
      `${p.s(F)} Écris cette part ${p.tout} sous forme irréductible.`,
      `${p.s(F)} Quelle fraction irréductible ${p.tout} cela représente-t-il ?`,
    ]),
  ];
}

/** ★1 : un seul diviseur (2, 3 ou 5) ; ★2 : un diviseur jusqu'à 6. */
function tirerASimplifier(niveau: 1 | 2) {
  const base = tirerFraction(niveau === 1 ? 7 : 9);
  const k = niveau === 1 ? randomChoice([2, 3, 5]) : randomInt(2, 6);
  return { base, k, F: { n: base.n * k, d: base.d * k } };
}

function explSimplifier(F: Q, base: Q, k: number) {
  return expl(
    "simplifier une fraction, c'est écrire une fraction égale avec des nombres plus petits ; elle est irréductible quand on ne peut plus la simplifier.",
    `on divise le numérateur et le dénominateur par leur plus grand diviseur commun, ${k}.`,
    `$${tf(F.n, F.d)} = \\frac{${F.n} \\div ${k}}{${F.d} \\div ${k}} = ${tf(base.n, base.d)}$.`,
    `la forme irréductible est $${tf(base.n, base.d)}$.`,
  );
}

function genSimplifierQcm(niveau: 1 | 2): Genere {
  const { base, k, F } = tirerASimplifier(niveau);
  const { choices, expected } = qcmQ(q(base.n, base.d), [
    { n: base.n + 1, d: base.d },
    { n: F.n, d: base.d },
    { n: base.d, d: base.n },
    { n: base.n, d: F.d },
    { n: F.n - k, d: F.d - k },
    { n: base.n, d: base.d + 1 },
  ]);
  return {
    text: randomChoice(enoncesSimplifier($m(tf(F.n, F.d)))),
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation: explSimplifier(F, base, k),
  };
}

function genSimplifierCourt(niveau: 1 | 2): { g: Genere; F: Q } {
  const { base, k, F } = tirerASimplifier(niveau);
  return {
    F,
    g: {
      text: randomChoice(enoncesSimplifier($m(tf(F.n, F.d)))),
      format: "short",
      expected: [pq(base)],
      comparator: "fraction_decimal_equivalent",
      explanation: explSimplifier(F, base, k),
    },
  };
}

/** ★3 : par quel nombre diviser pour simplifier en une seule étape ? */
function genSimplifierPgcd(): Genere {
  const base = tirerFraction(7);
  const k = randomInt(2, 8);
  const n = base.n * k;
  const d = base.d * k;
  const F = $m(tf(n, d));
  const textes = [
    `Par quel nombre faut-il diviser le numérateur et le dénominateur de ${F} pour la rendre irréductible en une seule étape ?`,
    `Quel est le plus grand nombre qui divise à la fois ${n} et ${d} ?`,
    `Pour simplifier ${F} en une seule division, par quel nombre divise-t-on ?`,
    `Quel est le plus grand diviseur commun de ${n} et ${d} ?`,
    `On veut simplifier ${F} en une seule étape : par combien faut-il diviser ?`,
    `Trouve le plus grand diviseur commun au numérateur et au dénominateur de ${F}.`,
    `Quel diviseur commun permet de rendre ${F} irréductible d'un seul coup ?`,
    `${n} et ${d} sont le numérateur et le dénominateur d'une fraction. Quel est le plus grand nombre qui les divise tous les deux ?`,
    ...PARTS.flatMap((p) => [
      `${p.s(F)} Pour simplifier cette fraction en une seule étape, par quel nombre faut-il diviser son numérateur et son dénominateur ?`,
      `${p.s(F)} Quel est le plus grand nombre qui divise à la fois ${n} et ${d} ?`,
    ]),
  ];
  return {
    text: randomChoice(textes),
    format: "short",
    expected: [String(k)],
    comparator: "number_equal",
    explanation: expl(
      "pour simplifier en une seule étape, on divise par le plus grand diviseur commun du numérateur et du dénominateur.",
      `on cherche le plus grand nombre qui divise ${n} et ${d}.`,
      `$${n} = ${k} \\times ${base.n}$ et $${d} = ${k} \\times ${base.d}$, et ${base.n} et ${base.d} n'ont plus de diviseur commun autre que 1.`,
      `on divise par ${k} : $${tf(n, d)} = ${tf(base.n, base.d)}$.`,
    ),
  };
}

/** ★3 : la fraction est-elle irréductible ? (des pièges comme 9/14 ou 15/21). */
function genIrreductible(): Genere {
  const irr = Math.random() < 0.5;
  let n: number;
  let d: number;
  if (irr) {
    do {
      d = randomInt(5, 21);
      n = randomInt(2, d - 1);
    } while (pgcd(n, d) !== 1);
  } else {
    const base = tirerFraction(7);
    const k = randomChoice([2, 3, 3, 5, 7]);
    n = base.n * k;
    d = base.d * k;
  }
  const g = pgcd(n, d);
  const F = $m(tf(n, d));
  // [énoncé, la réponse « oui » veut-elle dire « irréductible » ?]
  const textes: [string, boolean][] = [
    [`La fraction ${F} est-elle irréductible ?`, true],
    [`${F} est-elle impossible à simplifier ?`, true],
    [`Peut-on encore simplifier ${F} ?`, false],
    [`Le numérateur et le dénominateur de ${F} ont-ils un diviseur commun autre que 1 ?`, false],
    [`Un élève affirme que ${F} est irréductible. A-t-il raison ?`, true],
    [`Une élève affirme que ${F} peut encore se simplifier. A-t-elle raison ?`, false],
    [`La fraction ${F} est-elle écrite sous sa forme la plus simple ?`, true],
    [`Existe-t-il un nombre, autre que 1, qui divise à la fois ${n} et ${d} ?`, false],
    [`${n} et ${d} ont-ils un diviseur commun autre que 1 ?`, false],
    ...PARTS.flatMap((p): [string, boolean][] => [
      [`${p.s(F)} Cette fraction est-elle irréductible ?`, true],
      [`${p.s(F)} Peut-on simplifier cette fraction ?`, false],
    ]),
  ];
  const [text, ouiSiIrr] = randomChoice(textes);
  const rep = ouiSiIrr === irr ? "oui" : "non";
  return {
    text,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [rep],
    comparator: "mcq_exact",
    explanation: expl(
      "une fraction est irréductible quand son numérateur et son dénominateur n'ont pas d'autre diviseur commun que 1.",
      `on cherche un diviseur commun à ${n} et ${d}.`,
      irr
        ? `${n} et ${d} n'ont que 1 comme diviseur commun.`
        : `${n} et ${d} sont tous les deux divisibles par ${g} : $${tf(n, d)} = ${tf(n / g, d / g)}$.`,
      irr ? `$${tf(n, d)}$ est irréductible : la réponse est ${rep}.` : `$${tf(n, d)}$ se simplifie encore : la réponse est ${rep}.`,
    ),
  };
}

/* ===========================================================================
   FRACTION_DECIMAL
=========================================================================== */

const DECIMAUX_PAR_NIVEAU: Record<1 | 2 | 3, Q[]> = {
  1: [
    { n: 1, d: 2 }, { n: 1, d: 4 }, { n: 3, d: 4 }, { n: 1, d: 5 }, { n: 2, d: 5 }, { n: 3, d: 5 },
    { n: 4, d: 5 }, { n: 3, d: 2 }, { n: 5, d: 2 }, { n: 7, d: 10 }, { n: 3, d: 10 }, { n: 9, d: 10 },
  ],
  2: [
    { n: 5, d: 4 }, { n: 7, d: 4 }, { n: 7, d: 5 }, { n: 9, d: 5 }, { n: 1, d: 20 }, { n: 3, d: 20 },
    { n: 7, d: 20 }, { n: 9, d: 20 }, { n: 1, d: 25 }, { n: 4, d: 25 }, { n: 6, d: 25 }, { n: 1, d: 50 },
    { n: 7, d: 50 }, { n: 11, d: 20 }, { n: 12, d: 5 },
  ],
  3: [
    { n: 1, d: 8 }, { n: 3, d: 8 }, { n: 5, d: 8 }, { n: 7, d: 8 }, { n: 9, d: 4 }, { n: 11, d: 4 },
    { n: 13, d: 20 }, { n: 17, d: 20 }, { n: 11, d: 25 }, { n: 9, d: 8 }, { n: 21, d: 50 }, { n: 13, d: 5 },
  ],
};

const estDecimal = (v: number) => Math.abs(v * 10000 - Math.round(v * 10000)) < 1e-9;

function enoncesVersDecimal(F: string, x: Q): string[] {
  return [
    `À quel nombre décimal correspond ${F} ?`,
    `Écris ${F} sous forme décimale.`,
    `Donne l'écriture décimale de ${F}.`,
    `Quel est le nombre décimal égal à ${F} ?`,
    `Calcule le quotient ${x.n} ÷ ${x.d} : quelle écriture décimale obtiens-tu ?`,
    `Convertis ${F} en nombre décimal.`,
    `Quelle est la valeur décimale de ${F} ?`,
    `${F} peut aussi s'écrire avec une virgule. Comment ?`,
    `Sur une calculatrice, on tape ${x.n} ÷ ${x.d}. Quel nombre s'affiche ?`,
    `Transforme ${F} en nombre décimal.`,
    `Quel nombre décimal est égal au quotient de ${x.n} par ${x.d} ?`,
    `Une fraction est un quotient : que vaut ${F} en écriture décimale ?`,
    `Effectue la division ${x.n} ÷ ${x.d} et donne le résultat sous forme décimale.`,
    `Écris le nombre ${F} avec une virgule.`,
    `Quelle écriture décimale correspond à la fraction ${F} ?`,
    ...MESURES.flatMap((me) => [
      `${me.s(F)} Écris ${me.nom} sous forme décimale.`,
      `${me.s(F)} Quelle est ${me.nom} en écriture décimale, en ${me.unite} ?`,
      `${me.s(F)} Exprime ${me.nom} par un nombre décimal.`,
    ]),
  ];
}

function explVersDecimal(x: Q) {
  const v = x.n / x.d;
  return expl(
    "une fraction est un quotient : $\\frac{a}{b} = a \\div b$.",
    "on divise le numérateur par le dénominateur (ou on écrit une fraction égale sur 10, 100 ou 1 000).",
    `$${tf(x.n, x.d)} = ${x.n} \\div ${x.d} = ${tv(v)}$.`,
    `l'écriture décimale est ${virgule(v)}.`,
  );
}

/** Pièges décimaux d'une fraction : chiffres collés, quotient à l'envers, virgule mal placée… */
function piegesDecimaux(x: Q): string[] {
  const v = x.n / x.d;
  const bruts = [
    Number(`0.${x.n}${x.d}`),
    x.d / x.n,
    v * 10,
    v / 10,
    x.n / 10,
    v + 0.1,
    v > 0.05 ? v - 0.05 : v + 0.2,
    1 / x.d,
  ];
  return bruts.filter((w) => w > 0 && estDecimal(w)).map(virgule);
}

function genVersDecimalQcm(niveau: 1 | 2 | 3): Genere {
  const x = randomChoice(DECIMAUX_PAR_NIVEAU[niveau]);
  const bonne = virgule(x.n / x.d);
  const { choices, expected } = qcmTextes(bonne, shuffle(piegesDecimaux(x)), ["0,3", "1,5", "2,5", "0,15"]);
  return {
    text: randomChoice(enoncesVersDecimal($m(tf(x.n, x.d)), x)),
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation: explVersDecimal(x),
  };
}

/** Réponse tapée : une fraction sur 10 ou sur 100. */
function genVersDecimalCourt(sur: 10 | 100): Genere {
  const n = sur === 10 ? randomChoice([1, 2, 3, 4, 6, 7, 8, 9, 11, 13, 17, 23, 35]) : randomChoice([3, 7, 9, 12, 25, 45, 50, 75, 105, 130, 8, 64]);
  const x = { n, d: sur };
  const v = n / sur;
  return {
    text: randomChoice(enoncesVersDecimal($m(tf(n, sur)), x)),
    format: "short",
    expected: [String(v), virgule(v)],
    comparator: "number_equal",
    explanation: expl(
      "une fraction est un quotient : $\\frac{a}{b} = a \\div b$.",
      sur === 10 ? "diviser par 10 décale la virgule d'un rang vers la gauche." : "diviser par 100 décale la virgule de deux rangs vers la gauche.",
      `$${n} \\div ${sur} = ${tv(v)}$.`,
      `$${tf(n, sur)} = ${tv(v)}$.`,
    ),
  };
}

/** ★3 : du décimal vers la fraction irréductible. */
function genVersFraction(): Genere {
  const src = randomChoice([...DECIMAUX_PAR_NIVEAU[1], ...DECIMAUX_PAR_NIVEAU[2], ...DECIMAUX_PAR_NIVEAU[3]]);
  const x = q(src.n, src.d);
  const v = x.n / x.d;
  const D = virgule(v);
  const puissance = [10, 100, 1000].find((p) => Math.abs(v * p - Math.round(v * p)) < 1e-9) ?? 1000;
  const brut = { n: Math.round(v * puissance), d: puissance };
  const { choices, expected } = qcmQ(x, [
    { n: x.d, d: x.n },
    { n: 1, d: brut.n },
    { n: x.n, d: x.d + 1 },
    { n: x.n + 1, d: x.d },
    { n: brut.n, d: puissance * 10 },
  ]);
  const textes = [
    `Quelle fraction irréductible est égale au nombre décimal ${D} ?`,
    `Écris ${D} sous forme de fraction irréductible.`,
    `Quelle fraction est égale à ${D} ?`,
    `${D} est égal à quelle fraction ?`,
    `Quelle écriture fractionnaire correspond à ${D} ?`,
    `Transforme ${D} en fraction, puis simplifie-la.`,
    `Convertis le décimal ${D} en fraction irréductible.`,
    `Parmi ces fractions, laquelle vaut ${D} ?`,
    `Quelle fraction simplifiée représente ${D} ?`,
    `Une calculatrice affiche ${D}. De quelle fraction irréductible s'agit-il ?`,
    ...MESURES.flatMap((me) => [
      `${me.s(D)} Écris ${me.nom} sous forme de fraction irréductible.`,
      `${me.s(D)} Quelle fraction ${me.deUnite} est-ce ?`,
    ]),
  ];
  return {
    text: randomChoice(textes),
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation: expl(
      "un nombre décimal s'écrit comme une fraction de dénominateur 10, 100, 1 000…, que l'on simplifie ensuite.",
      `on écrit ${D} sur ${puissance}, puis on simplifie.`,
      `$${tv(v)} = \\frac{${brut.n}}{${puissance}} = ${tq(x)}$.`,
      `la fraction irréductible est $${tq(x)}$.`,
    ),
  };
}

/* ===========================================================================
   FRACTION_RATIONNEL
=========================================================================== */

/** Un nombre à écrire en fraction : entier, négatif, décimal. */
function tirerNombreRationnel(niveau: 1 | 2) {
  const genre = randomChoice(niveau === 1 ? ["entier", "decimal"] : ["entier", "negatif", "decimal", "decimal_negatif", "centiemes"]);
  let x: Q;
  if (genre === "entier") x = { n: randomInt(2, 15), d: 1 };
  else if (genre === "negatif") x = { n: -randomInt(2, 15), d: 1 };
  else if (genre === "decimal") x = { n: randomChoice([1, 3, 7, 9, 11, 13, 17, 21, 23, 27]), d: 10 };
  else if (genre === "decimal_negatif") x = { n: -randomChoice([1, 3, 7, 9, 13, 17, 23, 35]), d: 10 };
  else x = { n: randomChoice([3, 7, 11, 13, 19, 23, 37, 41, 57, 99, 101, 123]), d: 100 };
  return { x, v: x.n / x.d, entier: x.d === 1 };
}

/** ★1 et ★2 : quelle écriture fractionnaire est égale à ce nombre ? */
function genEcritureFractionnaire(niveau: 1 | 2): Genere {
  const { x, v, entier } = tirerNombreRationnel(niveau);
  const X = $m(entier ? String(x.n) : tv(v));
  const genre = entier ? "entier" : "décimal";
  const situations = NOMBRES_EN_SITUATION.filter((c) => c.signe === "tous" || (c.signe === "pos") === v > 0);
  const textes = [
    `Quelle écriture fractionnaire est égale à ${X} ?`,
    `Écris le nombre ${X} sous la forme d'un quotient de deux entiers.`,
    `Quelle fraction est égale au nombre ${genre} ${X} ?`,
    `Pour montrer que ${X} est un nombre rationnel, quelle écriture peut-on donner ?`,
    `Quel quotient de deux entiers est égal à ${X} ?`,
    `${X} est un nombre rationnel. Laquelle de ces fractions lui est égale ?`,
    `Parmi ces écritures, laquelle est égale à ${X} ?`,
    `Écris ${X} sous la forme $\\frac{a}{b}$, avec $a$ et $b$ entiers.`,
    ...situations.flatMap((c) => [
      `${c.s(X)} Écris ce nombre sous la forme d'une fraction.`,
      `${c.s(X)} Quelle fraction est égale à ce nombre ?`,
    ]),
  ];
  const s = x.n < 0 ? -1 : 1;
  const a = Math.abs(x.n);
  const { choices, expected } = qcmQ(
    x,
    entier
      ? [{ n: s, d: a }, { n: x.n, d: 10 }, { n: -x.n, d: 1 }, { n: a, d: a }, { n: 0, d: a }]
      : [{ n: s * x.d, d: a }, { n: x.n, d: x.d * 10 }, { n: -x.n, d: x.d }, { n: s, d: a }, { n: x.n, d: x.d / 10 }],
    tfFrac,
  );
  return {
    text: randomChoice(textes),
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation: expl(
      "un nombre rationnel est un nombre qui peut s'écrire $\\frac{a}{b}$, avec $a$ et $b$ entiers et $b \\neq 0$.",
      entier ? "un entier s'écrit sur le dénominateur 1." : `un décimal s'écrit sur ${x.d} : on compte les chiffres après la virgule.`,
      `$${entier ? String(x.n) : tv(v)} = ${tfFrac(x)}$.`,
      `l'écriture fractionnaire est $${tfFrac(x)}$ : ce nombre est rationnel.`,
    ),
  };
}

/** ★2 : ce nombre est-il rationnel ? (une écriture sur 0 n'est pas un nombre). */
function genEstRationnel(): Genere {
  if (Math.random() < 0.25) {
    const n = randomInt(1, 12);
    const X = $m(`\\frac{${n}}{0}`);
    const textes = [
      `L'écriture ${X} désigne-t-elle un nombre rationnel ?`,
      `${X} est-il un nombre rationnel ?`,
      `Un élève affirme que ${X} est un nombre rationnel. A-t-il raison ?`,
      `Peut-on dire que ${X} est le quotient de deux entiers avec un dénominateur non nul ?`,
      `L'écriture ${X} a-t-elle un sens ? Autrement dit, est-ce un nombre rationnel ?`,
    ];
    return {
      text: randomChoice(textes),
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["non"],
      comparator: "mcq_exact",
      explanation: expl(
        "un nombre rationnel s'écrit $\\frac{a}{b}$ avec $a$ et $b$ entiers et $b \\neq 0$.",
        "on regarde le dénominateur.",
        `dans $\\frac{${n}}{0}$, le dénominateur est 0 : on ne peut pas diviser par 0.`,
        "cette écriture ne désigne aucun nombre : la réponse est non.",
      ),
    };
  }
  const genre = randomChoice(["entier", "negatif", "decimal", "fraction", "fraction_negative"]);
  let X: string;
  let fracEcrite: string;
  let negatif = false;
  if (genre === "entier" || genre === "negatif") {
    negatif = genre === "negatif";
    const n = (negatif ? -1 : 1) * randomInt(2, 20);
    X = $m(String(n));
    fracEcrite = `${n} = \\frac{${n}}{1}`;
  } else if (genre === "decimal") {
    const k = randomChoice([3, 7, 9, 12, 15, 25, 37, 45]);
    X = $m(tv(k / 10));
    fracEcrite = `${tv(k / 10)} = \\frac{${k}}{10}`;
  } else {
    const f = tirerFraction(9);
    negatif = genre === "fraction_negative";
    const s = negatif ? -1 : 1;
    X = $m(tf(s * f.n, f.d));
    fracEcrite = `${tf(s * f.n, f.d)} = \\frac{${s * f.n}}{${f.d}}`;
  }
  const textes = [
    `Le nombre ${X} est-il rationnel ?`,
    `${X} est-il un nombre rationnel ?`,
    `Peut-on écrire ${X} comme le quotient de deux entiers (avec un dénominateur non nul) ?`,
    `Un élève affirme que ${X} est un nombre rationnel. A-t-il raison ?`,
    `Peut-on dire que ${X} est un nombre rationnel ?`,
    `Est-il vrai que ${X} est un nombre rationnel ?`,
    ...NOMBRES_EN_SITUATION.filter((c) => c.signe === "tous" || (c.signe === "neg") === negatif).flatMap((c) => [
      `${c.s(X)} Ce nombre est-il rationnel ?`,
      `${c.s(X)} Ce nombre peut-il s'écrire comme le quotient de deux entiers ?`,
    ]),
  ];
  return {
    text: randomChoice(textes),
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    explanation: expl(
      "un nombre rationnel s'écrit $\\frac{a}{b}$ avec $a$ et $b$ entiers et $b \\neq 0$ ; il peut être négatif.",
      "on cherche une écriture de ce nombre comme quotient de deux entiers.",
      `$${fracEcrite}$.`,
      "c'est un quotient de deux entiers : oui, c'est un nombre rationnel.",
    ),
  };
}

const GRILLES = [
  "Cette grille représente un potager : les cases colorées sont plantées en salades.",
  "Cette grille représente un parking : les cases colorées sont des places occupées.",
  "Cette grille représente les sièges d'une petite salle de cinéma : les cases colorées sont réservées.",
  "Cette grille représente un mur de carrelage : les carreaux colorés sont bleus.",
  "Cette grille représente une tablette de chocolat : les carrés colorés ont été mangés.",
  "Cette grille représente un panneau solaire : les cellules colorées sont couvertes de poussière.",
  "Cette grille représente les casiers d'un vestiaire : les cases colorées sont fermées à clé.",
  "Cette grille représente un champ découpé en parcelles : les parcelles colorées sont moissonnées.",
  "Cette grille représente une boîte d'œufs : les cases colorées contiennent un œuf.",
  "Cette grille représente les jours d'un défi sportif : les cases colorées sont les jours réussis.",
];

/** ★2 : la part colorée d'une grille (canvas), en fraction irréductible. */
function genGrille(): Genere {
  let rows: number;
  let cols: number;
  let shaded: number;
  do {
    rows = randomInt(2, 4);
    cols = randomInt(3, 6);
    shaded = randomInt(1, rows * cols - 1);
  } while (pgcd(shaded, rows * cols) === 1 && Math.random() < 0.7);
  const total = rows * cols;
  const blanc = Math.random() < 0.2;
  const compte = blanc ? total - shaded : shaded;
  const r = q(compte, total);
  const textes = blanc
    ? [
        "Quelle fraction de la grille n'est pas colorée ? Donne-la sous forme irréductible.",
        "Écris la partie non colorée de la grille sous forme de fraction irréductible.",
        "Quelle part de la figure est restée blanche ? Réponds par une fraction irréductible.",
      ]
    : [
        "Écris la partie colorée sous forme de fraction irréductible.",
        "Quelle fraction de la grille est colorée ? Donne-la sous forme irréductible.",
        "Quelle part de la figure est coloriée ? Réponds par une fraction irréductible.",
        "Compte les cases : quelle fraction irréductible de la grille est colorée ?",
        `La grille compte ${total} cases. Quelle fraction irréductible représente la partie colorée ?`,
        `${shaded} cases sur ${total} sont colorées. Écris cette part sous forme de fraction irréductible.`,
        ...GRILLES.flatMap((g) => [
          `${g} Quelle fraction de la grille cela représente-t-il ? Donne-la sous forme irréductible.`,
          `${g} Écris cette part sous forme de fraction irréductible.`,
        ]),
      ];
  return {
    text: randomChoice(textes),
    format: "short",
    expected: [pq(r)],
    comparator: "fraction_decimal_equivalent",
    explanation: expl(
      "une fraction est une écriture d'un nombre rationnel : ici, le nombre de cases comptées sur le nombre total de cases.",
      "on compte les cases, on écrit la fraction, puis on la simplifie.",
      `${compte} cases sur ${total} : $${tf(compte, total)} = ${tq(r)}$.`,
      `la fraction irréductible est $${tq(r)}$.`,
    ),
    canvas: fractionCanvas({ model: "grid", grid: { rows, cols, shaded } }),
  };
}

/* ===========================================================================
   FRACTION_COMPARER
=========================================================================== */

function enoncesPlusGrande(A: string, B: string, grand: boolean): string[] {
  const mot = grand ? "grande" : "petite";
  return [
    `Quelle fraction est la plus ${mot} : ${A} ou ${B} ?`,
    `Laquelle de ces deux fractions est la plus ${mot} : ${A} ou ${B} ?`,
    `Entre ${A} et ${B}, quelle est la plus ${mot} ?`,
    `Compare ${A} et ${B}. Laquelle est la plus ${mot} ?`,
    `On place ${A} et ${B} sur une droite graduée. Laquelle est la plus à ${grand ? "droite" : "gauche"} ?`,
    `Quelle est la plus ${mot} des deux fractions ${A} et ${B} ?`,
    `On range ${A} et ${B} dans l'ordre croissant. Laquelle vient en ${grand ? "dernier" : "premier"} ?`,
    ...DUOS.flatMap((s) => [
      `${s(A, B)} Laquelle de ces deux fractions est la plus ${mot} ?`,
      `${s(A, B)} Quelle est la plus ${mot} des deux parts ?`,
    ]),
  ];
}

function enoncesSigne(A: string, B: string): string[] {
  return [
    `Compare ${A} et ${B}. Réponds par >, < ou =.`,
    `Complète par <, > ou = : ${A} … ${B}.`,
    `Quel signe faut-il écrire entre ${A} et ${B} : <, > ou = ?`,
    `Place le bon signe (<, > ou =) entre ${A} et ${B}.`,
    `${A} est-elle plus petite (<), plus grande (>) ou égale (=) à ${B} ? Réponds par un signe.`,
    `Compare les fractions ${A} et ${B} à l'aide d'un signe <, > ou =.`,
    ...DUOS.flatMap((s) => [
      `${s(A, B)} Compare ces deux fractions : réponds par <, > ou =.`,
      `${s(A, B)} Complète par <, > ou = : ${A} … ${B}.`,
    ]),
  ];
}

/** Deux fractions à comparer. ★2 : même dénominateur ou même numérateur ; ★3 : quelconques. */
function tirerDeuxFractions(niveau: 2 | 3): [Q, Q] {
  for (;;) {
    let a: Q;
    let b: Q;
    if (niveau === 2) {
      if (Math.random() < 0.6) {
        // Des fractions plus petites que 1 : ce sont des parts (« 8/6 de la
        // batterie » n'aurait pas de sens dans les situations).
        const d = randomInt(5, 12);
        a = { n: randomInt(1, d - 1), d };
        b = { n: randomInt(1, d - 1), d };
      } else {
        const n = randomInt(1, 7);
        a = { n, d: randomInt(n + 1, 12) };
        b = { n, d: randomInt(n + 1, 12) };
      }
    } else {
      a = tirerFraction(9);
      b = tirerFraction(9);
      if (a.d === b.d || a.n === b.n) continue;
      if (Math.random() < 0.15) {
        const k = randomInt(2, 3);
        b = { n: a.n * k, d: a.d * k };
      }
    }
    if (a.n === b.n && a.d === b.d) continue;
    return [a, b];
  }
}

function explComparer(a: Q, b: Q, signe: string) {
  const meth =
    a.d === b.d
      ? "à dénominateur égal, la plus grande fraction est celle qui a le plus grand numérateur."
      : a.n === b.n
        ? "à numérateur égal, la plus grande fraction est celle qui a le plus petit dénominateur."
        : "on compare les produits en croix (ou on met les deux fractions au même dénominateur).";
  return expl(
    "comparer deux fractions, c'est comparer les nombres qu'elles représentent.",
    meth,
    `$${a.n} \\times ${b.d} = ${a.n * b.d}$ et $${b.n} \\times ${a.d} = ${b.n * a.d}$.`,
    `$${tf(a.n, a.d)} ${signe} ${tf(b.n, b.d)}$.`,
  );
}

function genPlusGrande(niveau: 2 | 3): Genere {
  const [a, b] = tirerDeuxFractions(niveau);
  const grand = Math.random() < 0.6;
  const A = $m(tf(a.n, a.d));
  const B = $m(tf(b.n, b.d));
  const g = a.n * b.d;
  const dr = b.n * a.d;
  const signe = g > dr ? ">" : g < dr ? "<" : "=";
  const correct = g === dr ? "elles sont égales" : (g > dr) === grand ? A : B;
  return {
    text: randomChoice(enoncesPlusGrande(A, B, grand)),
    format: "qcm",
    choices: [A, B, "elles sont égales"],
    expected: [correct],
    comparator: "mcq_exact",
    explanation: explComparer(a, b, signe),
  };
}

function genSigne(): { g: Genere; a: Q; b: Q } {
  const [a, b] = tirerDeuxFractions(3);
  const g = a.n * b.d;
  const dr = b.n * a.d;
  const signe = g > dr ? ">" : g < dr ? "<" : "=";
  return {
    a,
    b,
    g: {
      text: randomChoice(enoncesSigne($m(tf(a.n, a.d)), $m(tf(b.n, b.d)))),
      format: "short",
      expected: [signe],
      comparator: "contains_keyword",
      explanation: explComparer(a, b, signe),
    },
  };
}

const DUO_MESURES: ((a: string, b: string) => string)[] = [
  (a, b) => `Une bouteille contient ${a} L de jus, une autre ${b} L.`,
  (a, b) => `Lina a couru ${a} km, Paul ${b} km.`,
  (a, b) => `Un colis pèse ${a} kg, un autre ${b} kg.`,
  (a, b) => `Une planche mesure ${a} m, une autre ${b} m.`,
  (a, b) => `Un film a duré ${a} h, un autre ${b} h.`,
  (a, b) => `Une pousse de bambou a grandi de ${a} m, une autre de ${b} m.`,
  (a, b) => `Un arrosoir contient ${a} L d'eau, un autre ${b} L.`,
  (a, b) => `Au saut en longueur, une grenouille saute ${a} m, une autre ${b} m.`,
];

/** ★4 : une fraction face à un décimal. */
function genFractionContreDecimal(): Genere {
  const f = randomChoice([
    { n: 1, d: 2 }, { n: 3, d: 4 }, { n: 2, d: 5 }, { n: 1, d: 4 }, { n: 3, d: 5 }, { n: 4, d: 5 },
    { n: 7, d: 10 }, { n: 5, d: 4 }, { n: 3, d: 8 }, { n: 7, d: 20 },
  ]);
  const v = f.n / f.d;
  const dec = randomChoice([0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.65, 0.7, 0.75, 0.8, 1.2, 1.3]);
  const F = $m(tf(f.n, f.d));
  const D = virgule(dec);
  const grand = Math.random() < 0.6;
  const mot = grand ? "grand" : "petit";
  const [x, y] = Math.random() < 0.5 ? [F, D] : [D, F];
  const correct = v === dec ? "ils sont égaux" : (v > dec) === grand ? F : D;
  const textes = [
    `Lequel est le plus ${mot} : ${x} ou ${y} ?`,
    `Quel est le plus ${mot} des deux nombres ${x} et ${y} ?`,
    `Compare ${x} et ${y} : lequel est le plus ${mot} ?`,
    `Entre la fraction ${F} et le nombre décimal ${D}, lequel est le plus ${mot} ?`,
    `On place ${x} et ${y} sur une droite graduée. Lequel est le plus à ${grand ? "droite" : "gauche"} ?`,
    ...DUO_MESURES.map((s) => `${s(x, y)} Quel est le plus ${mot} de ces deux nombres ?`),
  ];
  return {
    text: randomChoice(textes),
    format: "qcm",
    choices: [F, D, "ils sont égaux"],
    expected: [correct],
    comparator: "mcq_exact",
    explanation: expl(
      "pour comparer une fraction et un décimal, on les écrit sous la même forme.",
      "on transforme la fraction en nombre décimal.",
      `$${tf(f.n, f.d)} = ${tv(v)}$, à comparer à ${D}.`,
      correct === "ils sont égaux" ? "les deux nombres sont égaux." : `le plus ${mot} est ${correct}.`,
    ),
  };
}

/* ===========================================================================
   FRACTION_ADDITIONNER
=========================================================================== */

type Terme = { op: "+" | "-"; x: Q };

/** L'expression LaTeX d'une somme ; un terme négatif prend des parenthèses. */
function exprSomme(termes: Terme[]): string {
  return termes
    .map((t, i) => {
      const brut = tf(t.x.n, t.x.d);
      if (i === 0) return t.op === "-" ? `-${brut}` : brut;
      return ` ${t.op} ${t.x.n < 0 ? `\\left(${brut}\\right)` : brut}`;
    })
    .join("");
}
const valeurSomme = (termes: Terme[]) =>
  termes.reduce((acc, t) => qAdd(acc, t.op === "-" ? { n: -t.x.n, d: t.x.d } : t.x), { n: 0, d: 1 } as Q);

/**
 * Les deux dénominateurs d'une somme. ★2 : identiques ; ★3 : l'un multiple de
 * l'autre ; ★4 : ni égaux ni multiples.
 */
function tirerDenominateurs(niveau: 2 | 3 | 4): [number, number] {
  if (niveau === 2) {
    const d = randomInt(3, 12);
    return [d, d];
  }
  if (niveau === 3) {
    const d1 = randomInt(2, 6);
    const d2 = d1 * randomInt(2, 4);
    return Math.random() < 0.5 ? [d1, d2] : [d2, d1];
  }
  const paires: [number, number][] = [[2, 3], [3, 4], [2, 5], [4, 6], [6, 8], [3, 5], [4, 10], [6, 9], [5, 6], [3, 8], [4, 5], [6, 10], [2, 7], [9, 12]];
  const p = randomChoice(paires);
  return Math.random() < 0.5 ? p : [p[1], p[0]];
}

/** Une somme non nulle : forme, termes, valeur. `canvas` : que des fractions positives. */
function tirerSomme(niveau: 2 | 3 | 4, canvas = false) {
  for (;;) {
    const s = tirerSommeUneFois(niveau, canvas);
    if (s.r.n !== 0) return s;
  }
}

function tirerSommeUneFois(niveau: 2 | 3 | 4, canvas: boolean) {
  const [d1, d2] = tirerDenominateurs(niveau);
  const a = { n: randomInt(1, d1 - 1), d: d1 };
  const b = { n: randomInt(1, d2 - 1), d: d2 };
  const formes = canvas ? ["a+b", "a-b"] : ["a+b", "a-b", "a+b+c", "-a+b", "a+(-b)", niveau === 2 ? "1-a" : "n+a"];
  const forme = randomChoice(formes);
  let termes: Terme[];
  if (forme === "a+b") termes = [{ op: "+", x: a }, { op: "+", x: b }];
  else if (forme === "a-b") {
    const [g, p] = canvas && a.n * b.d < b.n * a.d ? [b, a] : [a, b];
    termes = [{ op: "+", x: g }, { op: "-", x: p }];
  } else if (forme === "a+b+c") {
    const c = { n: randomInt(1, Math.max(1, d2 - 1)), d: d2 };
    termes = [{ op: "+", x: a }, { op: "+", x: b }, { op: Math.random() < 0.5 ? "+" : "-", x: c }];
  } else if (forme === "-a+b") termes = [{ op: "-", x: a }, { op: "+", x: b }];
  else if (forme === "a+(-b)") termes = [{ op: "+", x: a }, { op: "+", x: { n: -b.n, d: b.d } }];
  else if (forme === "1-a") termes = [{ op: "+", x: { n: 1, d: 1 } }, { op: "-", x: a }];
  else termes = [{ op: "+", x: { n: randomInt(1, 3), d: 1 } }, { op: "+", x: a }];
  return { termes, forme, r: valeurSomme(termes) };
}

function explSomme(termes: Terme[], r: Q) {
  const D = termes.reduce((acc, t) => ppcm(acc, t.x.d), 1);
  const conv = termes
    .map((t, i) => {
      const n = (t.x.n * D) / t.x.d;
      const pos = `\\frac{${Math.abs(n)}}{${D}}`;
      if (i === 0) return t.op === "-" || n < 0 ? `-${pos}` : pos;
      return ` ${t.op} ${n < 0 ? `\\left(-${pos}\\right)` : pos}`;
    })
    .join("");
  const N = r.n * (D / r.d);
  const dejaCommun = termes.every((t) => t.x.d === D);
  return expl(
    "pour additionner ou soustraire des fractions, il faut qu'elles aient le même dénominateur ; on additionne alors les numérateurs et on garde le dénominateur.",
    dejaCommun ? `les fractions ont déjà le dénominateur commun ${D}.` : `on écrit toutes les fractions avec le dénominateur commun ${D}.`,
    `$${exprSomme(termes)}${dejaCommun ? "" : ` = ${conv}`} = ${tf(N, D)}${N !== r.n || D !== r.d ? ` = ${tq(r)}` : ""}$.`,
    `le résultat est $${tq(r)}$.`,
  );
}

function enoncesSomme(termes: Terme[], forme: string): string[] {
  const e = exprSomme(termes);
  const textes = CALCULE.map((c) => c(e));
  const r = valeurSomme(termes);
  if (forme === "a+b" && r.n <= r.d) {
    const A = $m(tf(termes[0].x.n, termes[0].x.d));
    const B = $m(tf(termes[1].x.n, termes[1].x.d));
    textes.push(...ETAPES.map((c) => `${c.s(A, B)} ${c.total}`));
  }
  return textes;
}

function piegesSomme(termes: Terme[], r: Q): Q[] {
  const nums = termes.reduce((s, t) => s + (t.op === "-" ? -t.x.n : t.x.n), 0);
  const dens = termes.reduce((s, t) => s + t.x.d, 0);
  const dmax = Math.max(...termes.map((t) => t.x.d));
  const prod = termes.reduce((p, t) => p * t.x.d, 1);
  return [
    { n: nums, d: dens },
    { n: nums, d: dmax },
    { n: -r.n, d: r.d },
    { n: nums, d: prod },
    { n: r.n + 1, d: r.d },
    { n: r.n, d: r.d + 1 },
  ];
}

function genSommeQcm(niveau: 2 | 3 | 4): Genere {
  const { termes, forme, r } = tirerSomme(niveau);
  const { choices, expected } = qcmQ(r, piegesSomme(termes, r));
  return {
    text: randomChoice(enoncesSomme(termes, forme)),
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation: explSomme(termes, r),
  };
}

function genSommeCourt(niveau: 2 | 3, canvas = false): Genere {
  const { termes, forme, r } = tirerSomme(niveau, canvas);
  const D = termes.reduce((acc, t) => ppcm(acc, t.x.d), 1);
  const g: Genere = {
    text: randomChoice(enoncesSomme(termes, forme)),
    format: "short",
    expected: reponsesTapees(r, { n: r.n * (D / r.d), d: D }),
    comparator: "fraction_decimal_equivalent",
    explanation: explSomme(termes, r),
  };
  if (canvas) {
    g.canvas = fractionCanvas({
      model: "compare",
      fractions: termes.map((t) => ({ numerator: t.x.n, denominator: t.x.d, label: `${t.x.n}/${t.x.d}` })),
    });
  }
  return g;
}

/* ===========================================================================
   FRACTION_MULTIPLIER
=========================================================================== */

const FOIS: { s: (f: string, k: number) => string; q: string }[] = [
  { s: (f, k) => `Une recette demande ${f} L de lait. On prépare ${k} fois cette recette.`, q: "Quelle quantité de lait faut-il, en litres ?" },
  { s: (f, k) => `Un escargot avance de ${f} m par minute pendant ${k} minutes.`, q: "Quelle distance parcourt-il, en mètres ?" },
  { s: (f, k) => `Une bouteille contient ${f} L d'eau. Un pack contient ${k} bouteilles.`, q: "Quelle quantité d'eau contient le pack, en litres ?" },
  { s: (f, k) => `Une coureuse fait ${k} tours d'un circuit de ${f} km.`, q: "Quelle distance parcourt-elle, en kilomètres ?" },
  { s: (f, k) => `Une plante grimpante pousse de ${f} m par semaine, pendant ${k} semaines.`, q: "De combien a-t-elle poussé, en mètres ?" },
  { s: (f, k) => `Un morceau de fromage pèse ${f} kg. On en achète ${k} identiques.`, q: "Quelle masse de fromage achète-t-on, en kilogrammes ?" },
  { s: (f, k) => `Un robinet qui fuit perd ${f} L d'eau par heure. La fuite dure ${k} heures.`, q: "Combien de litres d'eau sont perdus ?" },
  { s: (f, k) => `Un bricoleur coupe ${k} baguettes de bois de ${f} m chacune.`, q: "Quelle longueur de bois utilise-t-il, en mètres ?" },
  { s: (f, k) => `Un arrosoir contient ${f} L. On le vide ${k} fois sur le potager.`, q: "Quelle quantité d'eau a-t-on versée, en litres ?" },
  { s: (f, k) => `Il faut ${f} m de ruban pour emballer un cadeau. On emballe ${k} cadeaux identiques.`, q: "Quelle longueur de ruban faut-il, en mètres ?" },
  { s: (f, k) => `Un musicien répète ${f} h par jour pendant ${k} jours.`, q: "Combien d'heures a-t-il répété en tout ?" },
  { s: (f, k) => `Une randonneuse boit ${f} L d'eau par heure de marche. Elle marche ${k} heures.`, q: "Quelle quantité d'eau boit-elle, en litres ?" },
];

const MOTS_FOIS: Record<number, string> = { 2: "double", 3: "triple", 4: "quadruple" };

/** ★2 : une fraction multipliée par un entier. */
function genFoisEntier(): Genere {
  const a = tirerFraction(9);
  const k = randomInt(2, 6);
  const forme = randomChoice(["a*k", "k*a", "-a*k", "k*(-a)"]);
  const signe = forme.includes("-") ? -1 : 1;
  const A = { n: signe * a.n, d: a.d };
  const e =
    forme === "a*k" ? `${tq(a)} \\times ${k}` : forme === "k*a" ? `${k} \\times ${tq(a)}` : forme === "-a*k" ? `${tq(A)} \\times ${k}` : `${k} \\times ${tp(A)}`;
  const r = q(A.n * k, a.d);
  const textes = [
    ...CALCULE.map((c) => c(e)),
    `Calcule le produit de ${$m(tq(A))} par ${k}.`,
    ...(signe > 0
      ? [
          ...FOIS.map((c) => `${c.s($m(tq(a)), k)} ${c.q}`),
          ...(MOTS_FOIS[k] ? [`Calcule le ${MOTS_FOIS[k]} de ${$m(tq(a))}.`, `Que vaut le ${MOTS_FOIS[k]} de ${$m(tq(a))} ?`] : []),
        ]
      : []),
  ];
  const { choices, expected } = qcmQ(r, [
    { n: A.n, d: a.d * k },
    { n: A.n * k, d: a.d * k },
    { n: A.n + k, d: a.d },
    { n: -r.n, d: r.d },
    { n: A.n, d: a.d },
  ]);
  return {
    text: randomChoice(textes),
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation: expl(
      "multiplier une fraction par un entier, c'est multiplier son numérateur par cet entier ; le dénominateur ne change pas.",
      `$${tq(A)} \\times ${k} = \\frac{${A.n} \\times ${k}}{${a.d}}$.`,
      `$${tq(A)} \\times ${k} = ${tf(A.n * k, a.d)}${r.n !== A.n * k || r.d !== a.d ? ` = ${tq(r)}` : ""}$.`,
      `le résultat est $${tq(r)}$.`,
    ),
  };
}

/** ★3 : le produit de deux fractions. */
function tirerProduit() {
  const a = tirerFraction(8);
  const b = tirerFraction(9);
  const forme = randomChoice(["a*b", "a*b", "-a*b", "a*(-b)", "de"]);
  const A = forme === "-a*b" ? { n: -a.n, d: a.d } : a;
  const B = forme === "a*(-b)" ? { n: -b.n, d: b.d } : b;
  const e = `${tq(A)} \\times ${tp(B)}`;
  const r = qMul(A, B);
  const textes =
    forme === "de"
      ? [
          `Calcule ${$m(tq(a))} de ${$m(tq(b))}.`,
          `Combien vaut ${$m(tq(a))} de ${$m(tq(b))} ?`,
          `Prendre ${$m(tq(a))} de ${$m(tq(b))} : quelle fraction obtient-on ?`,
          ...PARMI.map((c) => `${c.s($m(tq(b)), $m(tq(a)))} ${c.q}`),
        ]
      : CALCULE.map((c) => c(e));
  return { A, B, r, text: randomChoice(textes) };
}

function explProduit(A: Q, B: Q, r: Q) {
  const nb = A.n * B.n;
  const db = A.d * B.d;
  return expl(
    "pour multiplier deux fractions, on multiplie les numérateurs entre eux et les dénominateurs entre eux ; « prendre une fraction de », c'est multiplier.",
    "on multiplie, puis on simplifie.",
    `$${tq(A)} \\times ${tp(B)} = \\frac{${A.n} \\times ${B.n < 0 ? `(${B.n})` : B.n}}{${A.d} \\times ${B.d}} = ${tf(nb, db)}${nb !== r.n || db !== r.d ? ` = ${tq(r)}` : ""}$.`,
    `le résultat est $${tq(r)}$.`,
  );
}

function genProduitQcm(): Genere {
  const { A, B, r, text } = tirerProduit();
  const { choices, expected } = qcmQ(r, [
    { n: A.n + B.n, d: A.d + B.d },
    { n: A.n * B.d, d: A.d * B.n },
    { n: A.n * B.n, d: A.d + B.d },
    { n: -r.n, d: r.d },
    { n: r.n + 1, d: r.d },
  ]);
  return { text, format: "qcm", choices, expected, comparator: "mcq_exact", explanation: explProduit(A, B, r) };
}

function genProduitCourt(): Genere {
  const { A, B, r, text } = tirerProduit();
  return {
    text,
    format: "short",
    expected: reponsesTapees(r, { n: A.n * B.n, d: A.d * B.d }),
    comparator: "fraction_decimal_equivalent",
    explanation: explProduit(A, B, r),
  };
}

/** ★3 : une fraction fois un entier, qui tombe juste. */
function genFoisEntierJuste(): Genere {
  const a = tirerFraction(6);
  const total = a.d * randomInt(2, 8);
  const r = (total / a.d) * a.n;
  const A = $m(tq(a));
  const textes = [
    ...CALCULE.slice(0, 6).map((c) => c(`${tq(a)} \\times ${total}`)),
    ...CALCULE.slice(0, 6).map((c) => c(`${total} \\times ${tq(a)}`)),
    `Calcule le produit de ${A} par ${total}.`,
    `Que vaut ${A} de ${total} ?`,
    ...FOIS.map((c) => `${c.s(A, total)} ${c.q}`),
  ];
  return {
    text: randomChoice(textes),
    format: "short",
    expected: [String(r)],
    comparator: "number_equal",
    explanation: expl(
      "multiplier une fraction par un entier, c'est prendre cette fraction de l'entier.",
      "on divise l'entier par le dénominateur, puis on multiplie par le numérateur.",
      `$${total} \\div ${a.d} = ${total / a.d}$, puis $${total / a.d} \\times ${a.n} = ${r}$.`,
      `le résultat est ${r}.`,
    ),
  };
}

/* ===========================================================================
   FRACTION_INVERSE
=========================================================================== */

function enoncesInverse(x: string, X: string, entier: boolean): string[] {
  const L = randomChoice(["y", "a", "t", "n"]);
  return [
    `Quel est l'inverse de ${X} ?`,
    `Donne l'inverse de ${X}.`,
    `Par quel nombre faut-il multiplier ${X} pour obtenir 1 ?`,
    `Trouve le nombre qui, multiplié par ${X}, donne 1.`,
    `Complète : $${x} \\times \\ldots = 1$.`,
    `Quel nombre est l'inverse de ${X} ?`,
    `Écris l'inverse de ${X}.`,
    `Quel nombre $${L}$ vérifie $${x} \\times ${L} = 1$ ?`,
    `Quel est le nombre dont le produit avec ${X} vaut 1 ?`,
    `On cherche l'inverse de ${X}. Quel est-il ?`,
    `Un élève cherche l'inverse de ${X}. Que doit-il trouver ?`,
    ...(entier
      ? [`Quel est l'inverse de l'entier ${X} ?`, `Écris l'inverse du nombre entier ${X} sous forme de fraction.`]
      : [`Quelle fraction obtient-on en prenant l'inverse de ${X} ?`]),
  ];
}

/** L'inverse. `genres` : les formes possibles du nombre de départ. */
function tirerInverse(genres: string[]) {
  const genre = randomChoice(genres);
  let x: Q;
  if (genre === "frac") {
    const f = tirerFraction(9);
    x = Math.random() < 0.5 ? f : { n: f.d, d: f.n };
  } else if (genre === "-frac") {
    const f = tirerFraction(9);
    x = { n: -f.n, d: f.d };
  } else if (genre === "unitaire") x = { n: 1, d: randomInt(2, 12) };
  else if (genre === "entier") x = { n: randomInt(2, 12), d: 1 };
  else if (genre === "-entier") x = { n: -randomInt(2, 12), d: 1 };
  else x = randomChoice([{ n: 1, d: 2 }, { n: 1, d: 4 }, { n: 1, d: 5 }, { n: 5, d: 2 }, { n: 3, d: 2 }, { n: 2, d: 5 }, { n: 3, d: 4 }]);
  const inv = q(x.d, x.n);
  const decimal = genre === "decimal";
  const xt = decimal ? tv(x.n / x.d) : tq(x);
  return { x, inv, xt, entier: x.d === 1 };
}

function explInverse(x: Q, xt: string, inv: Q) {
  return expl(
    "l'inverse d'un nombre non nul est le nombre qui, multiplié par lui, donne 1 ; pour une fraction, on échange le numérateur et le dénominateur (le signe ne change pas).",
    x.d === 1
      ? `on écrit $${x.n} = \\frac{${x.n}}{1}$, puis on échange.`
      : xt === tq(x)
        ? `on échange le numérateur et le dénominateur de $${xt}$.`
        : `on écrit $${xt} = ${tq(x)}$ et on échange le numérateur et le dénominateur.`,
    `$${xt} \\times ${tp(inv)} = 1$.`,
    `l'inverse de $${xt}$ est $${tq(inv)}$.`,
  );
}

function genInverseCourt(): Genere {
  const { x, inv, xt, entier } = tirerInverse(["frac", "-frac", "unitaire"]);
  const attendu = reponsesTapees(inv);
  if (inv.d === 1) attendu.push(`${inv.n}/1`);
  return {
    text: randomChoice(enoncesInverse(xt, $m(xt), entier)),
    format: "short",
    expected: attendu,
    comparator: "fraction_decimal_equivalent",
    explanation: explInverse(x, xt, inv),
  };
}

function genInverseQcm(genres: string[]): Genere {
  const { x, inv, xt, entier } = tirerInverse(genres);
  const { choices, expected } = qcmQ(inv, [
    { n: -x.n, d: x.d },
    { n: x.n, d: x.d },
    { n: -inv.n, d: inv.d },
    { n: Math.abs(x.n) + x.d, d: Math.abs(x.n) },
    { n: x.d, d: Math.abs(x.n) + 1 },
  ]);
  return {
    text: randomChoice(enoncesInverse(xt, $m(xt), entier)),
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation: explInverse(x, xt, inv),
  };
}

/* ===========================================================================
   FRACTION_DIVISER
=========================================================================== */

const PARTAGES: { s: (n: string, f: string) => string; q: string }[] = [
  { s: (n, f) => `On partage ${n} m de ruban en morceaux de ${f} m.`, q: "Combien de morceaux obtient-on ?" },
  { s: (n, f) => `On verse ${n} L de jus dans des verres de ${f} L.`, q: "Combien de verres peut-on remplir ?" },
  { s: (n, f) => `Un sentier de ${n} km est découpé en étapes de ${f} km.`, q: "Combien d'étapes y a-t-il ?" },
  { s: (n, f) => `On coupe une planche de ${n} m en tasseaux de ${f} m.`, q: "Combien de tasseaux obtient-on ?" },
  { s: (n, f) => `Un fromager découpe ${n} kg de fromage en parts de ${f} kg.`, q: "Combien de parts obtient-il ?" },
  { s: (n, f) => `Un jardinier remplit des arrosoirs de ${f} L avec ${n} L d'eau de pluie.`, q: "Combien d'arrosoirs remplit-il ?" },
  { s: (n, f) => `Une course de relais de ${n} km est découpée en relais de ${f} km.`, q: "Combien de relais y a-t-il ?" },
  { s: (n, f) => `Un groupe de musique dispose de ${n} h de répétition, en séances de ${f} h.`, q: "Combien de séances peut-il faire ?" },
  { s: (n, f) => `On range ${n} kg de riz dans des sachets de ${f} kg.`, q: "Combien de sachets remplit-on ?" },
  { s: (n, f) => `Un tuyau d'arrosage de ${n} m est coupé en tronçons de ${f} m.`, q: "Combien de tronçons obtient-on ?" },
  { s: (n, f) => `Une cuve de ${n} L d'huile d'olive est mise en bouteilles de ${f} L.`, q: "Combien de bouteilles remplit-on ?" },
];

const PARTAGES_FRACTION: { s: (f: string, k: number) => string; q: string }[] = [
  { s: (f, k) => `Il reste ${f} d'une pizza, à partager équitablement entre ${k} amis.`, q: "Quelle fraction de la pizza chacun reçoit-il ?" },
  { s: (f, k) => `${k} jardiniers se partagent équitablement ${f} d'un potager.`, q: "Quelle fraction du potager chacun cultive-t-il ?" },
  { s: (f, k) => `${k} coureurs d'un relais se partagent équitablement ${f} d'un parcours.`, q: "Quelle fraction du parcours chacun court-il ?" },
  { s: (f, k) => `On répartit ${f} d'un budget à parts égales entre ${k} clubs sportifs.`, q: "Quelle fraction du budget chaque club reçoit-il ?" },
  { s: (f, k) => `${k} élèves se partagent équitablement ${f} d'un exposé à préparer.`, q: "Quelle fraction de l'exposé chacun prépare-t-il ?" },
  { s: (f, k) => `On partage ${f} d'un champ en ${k} parcelles identiques.`, q: "Quelle fraction du champ chaque parcelle représente-t-elle ?" },
  { s: (f, k) => `On verse ${f} d'une bouteille de jus, à parts égales, dans ${k} verres.`, q: "Quelle fraction de la bouteille chaque verre contient-il ?" },
  { s: (f, k) => `${k} peintres se partagent équitablement ${f} d'une façade.`, q: "Quelle fraction de la façade chacun peint-il ?" },
];

/** Un quotient. `avecEntier` : on divise une fraction par un entier (★4). */
function tirerQuotient(avecEntier: boolean) {
  const formes = avecEntier ? ["a/k", "a/k", "-a/k", "a/(-k)", "partage"] : ["a/b", "a/b", "-a/b", "a/(-b)", "k/a", "compte"];
  const forme = randomChoice(formes);
  let A: Q;
  let B: Q;
  let text: string;
  if (forme === "a/k" || forme === "-a/k" || forme === "a/(-k)" || forme === "partage") {
    const a = tirerFraction(9);
    const k = randomInt(2, 6);
    A = forme === "-a/k" ? { n: -a.n, d: a.d } : a;
    B = { n: forme === "a/(-k)" ? -k : k, d: 1 };
    text =
      forme === "partage"
        ? randomChoice([...PARTAGES_FRACTION.map((c) => `${c.s($m(tq(a)), k)} ${c.q}`), ...CALCULE.slice(0, 4).map((c) => c(`${tq(A)} \\div ${k}`))])
        : randomChoice([...CALCULE.map((c) => c(`${tq(A)} \\div ${tp(B)}`)), `Divise ${$m(tq(A))} par ${$m(tq(B))}.`]);
  } else if (forme === "k/a" || forme === "compte") {
    const a = tirerFraction(6);
    const m = randomInt(2, 8);
    const n = a.n * m;
    A = { n, d: 1 };
    B = a;
    text =
      forme === "compte"
        ? randomChoice(PARTAGES.map((c) => `${c.s(String(n), $m(tq(a)))} ${c.q}`))
        : randomChoice([...CALCULE.map((c) => c(`${n} \\div ${tq(a)}`)), `Combien de fois ${$m(tq(a))} y a-t-il dans ${n} ?`]);
  } else {
    let a: Q;
    let b: Q;
    do {
      a = tirerFraction(8);
      b = tirerFraction(8);
    } while (memeValeur(a, b));
    A = forme === "-a/b" ? { n: -a.n, d: a.d } : a;
    B = forme === "a/(-b)" ? { n: -b.n, d: b.d } : b;
    text = randomChoice([
      ...CALCULE.map((c) => c(`${tq(A)} \\div ${tp(B)}`)),
      `Calcule le quotient de ${$m(tq(A))} par ${$m(tq(B))}.`,
      `Divise ${$m(tq(A))} par ${$m(tq(B))}.`,
    ]);
  }
  return { A, B, r: qDiv(A, B), text };
}

function explQuotient(A: Q, B: Q, r: Q) {
  const inv = q(B.d, B.n);
  const nb = A.n * inv.n;
  const db = A.d * inv.d;
  return expl(
    "diviser par un nombre non nul, c'est multiplier par son inverse.",
    `l'inverse de $${tq(B)}$ est $${tq(inv)}$.`,
    `$${tq(A)} \\div ${tp(B)} = ${tq(A)} \\times ${tp(inv)} = ${tf(nb, db)}${nb !== r.n || db !== r.d ? ` = ${tq(r)}` : ""}$.`,
    `le résultat est $${tq(r)}$.`,
  );
}

function genQuotientQcm(avecEntier: boolean): Genere {
  const { A, B, r, text } = tirerQuotient(avecEntier);
  const { choices, expected } = qcmQ(r, [
    qMul(A, B),
    { n: B.n * A.d, d: B.d * A.n },
    { n: A.n, d: A.d },
    { n: -r.n, d: r.d },
    { n: A.n + B.n, d: A.d + B.d },
  ]);
  return { text, format: "qcm", choices, expected, comparator: "mcq_exact", explanation: explQuotient(A, B, r) };
}

function genQuotientCourt(): Genere {
  const { A, B, r, text } = tirerQuotient(Math.random() < 0.3);
  const s = A.d * B.n < 0 ? -1 : 1;
  return {
    text,
    format: "short",
    expected: reponsesTapees(r, { n: s * A.n * B.d, d: s * A.d * B.n }),
    comparator: "fraction_decimal_equivalent",
    explanation: explQuotient(A, B, r),
  };
}

/** ★3 : diviser par F revient à multiplier par… */
function genDiviserRevientA(): Genere {
  const genre = randomChoice(["frac", "frac", "unitaire", "entier", "-frac"]);
  let x: Q;
  if (genre === "frac") {
    const f = tirerFraction(8);
    x = Math.random() < 0.5 ? f : { n: f.d, d: f.n };
  } else if (genre === "unitaire") x = { n: 1, d: randomInt(2, 10) };
  else if (genre === "entier") x = { n: randomInt(2, 10), d: 1 };
  else {
    const f = tirerFraction(8);
    x = { n: -f.n, d: f.d };
  }
  const inv = q(x.d, x.n);
  const X = $m(tq(x));
  const L = randomChoice(LETTRES_INC);
  const textes = [
    `Diviser par ${X} revient à multiplier par…`,
    `Diviser un nombre par ${X}, c'est le multiplier par quel nombre ?`,
    `Par quel nombre faut-il multiplier pour obtenir le même résultat qu'en divisant par ${X} ?`,
    `Pour calculer $${L} \\div ${tp(x)}$, on peut calculer $${L} \\times \\ldots$ : par quoi remplace-t-on les points ?`,
    `Complète : diviser par ${X}, c'est multiplier par…`,
    `Une élève veut diviser par ${X}. Par quel nombre doit-elle multiplier à la place ?`,
    `Quelle multiplication remplace une division par ${X} ? Multiplier par…`,
    `Complète : $${L} \\div ${tp(x)} = ${L} \\times \\ldots$`,
  ];
  const { choices, expected } = qcmQ(inv, [
    x,
    { n: -x.n, d: x.d },
    { n: -inv.n, d: inv.d },
    { n: x.d + 1, d: Math.abs(x.n) },
  ]);
  return {
    text: randomChoice(textes),
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation: expl(
      "diviser par un nombre non nul revient à multiplier par son inverse.",
      `on cherche l'inverse de $${tq(x)}$ en échangeant le numérateur et le dénominateur.`,
      `l'inverse de $${tq(x)}$ est $${tq(inv)}$, car $${tq(x)} \\times ${tp(inv)} = 1$.`,
      `diviser par $${tq(x)}$, c'est multiplier par $${tq(inv)}$.`,
    ),
  };
}

/* ===========================================================================
   FRACTION_QUANTITE
=========================================================================== */

const UNITES_NUES = ["", " €", " km", " kg", " L", " minutes", " élèves"];

/** ★2 : F de N, dit en symboles ou en mots. */
function genFractionDe(): Genere {
  return tirerFractionDe().g;
}

function tirerFractionDe(): { g: Genere; f: Q } {
  const enMots = Math.random() < 0.4;
  const fm = randomChoice(FRACTIONS_EN_MOTS);
  const f: Q = enMots ? { n: fm.n, d: fm.d } : tirerFraction(6);
  const N = f.d * randomInt(3, 15);
  const r = (N / f.d) * f.n;
  const u = randomChoice(UNITES_NUES);
  const F = $m(tq(f));
  const textes = enMots
    ? [
        `Calcule ${fm.mot} de ${N}${u}.`,
        `Combien font ${fm.mot} de ${N}${u} ?`,
        `Détermine ${fm.mot} de ${N}${u}.`,
        `Trouve ${fm.mot} de ${N}${u}.`,
      ]
    : [
        `Calcule ${F} de ${N}${u}.`,
        `Calculer ${F} de ${N}${u}.`,
        `Combien vaut ${F} de ${N}${u} ?`,
        `Que vaut ${F} de ${N}${u} ?`,
        `Prends ${F} de ${N}${u} : combien obtiens-tu ?`,
        `Quel nombre représente ${F} de ${N}${u} ?`,
        `Trouve ${F} de ${N}${u}.`,
        `Calcule $${N} \\times ${tq(f)}$.`,
        `Calcule $${tq(f)} \\times ${N}$.`,
      ];
  return {
    f,
    g: {
      text: randomChoice(textes),
      format: "short",
      expected: [String(r)],
      comparator: "number_equal",
      explanation: expl(
        "prendre une fraction d'un nombre, c'est multiplier ce nombre par la fraction.",
        "on divise par le dénominateur, puis on multiplie par le numérateur.",
        `$${N} \\div ${f.d} = ${N / f.d}$, puis $${N / f.d} \\times ${f.n} = ${r}$.`,
        `${enMots ? fm.mot : `$${tq(f)}$`} de ${N}${u}, c'est ${r}${u}.`,
      ),
    },
  };
}

/** Une fraction d'une quantité en situation (canvas : un disque). */
function genQuantiteSituation(canvas = false): Genere {
  const { c, f, total, part } = tirerQuantite(canvas ? [3, 4, 5, 6] : [2, 3, 4, 5, 6, 8, 10]);
  const F = $m(tq(f));
  const g: Genere = {
    text: `${c.s(F, String(total))} ${c.q}`,
    format: "short",
    expected: [String(part)],
    comparator: "number_equal",
    explanation: expl(
      "prendre une fraction d'une quantité, c'est multiplier cette quantité par la fraction.",
      "on divise la quantité par le dénominateur, puis on multiplie par le numérateur.",
      `$${total} \\div ${f.d} = ${total / f.d}$, puis $${total / f.d} \\times ${f.n} = ${part}$.`,
      `la réponse est ${part} (${c.unite}).`,
    ),
  };
  if (canvas) g.canvas = fractionCanvas({ model: "circle", fraction: { numerator: f.n, denominator: f.d, label: `${f.n}/${f.d}` } });
  return g;
}

/**
 * ★3 : situation ou calcul nu, au hasard — les quatre gabarits de l'étoile le
 * partagent. Les situations seules ne font que 17 phrases : servies par quatre
 * gabarits, elles revenaient. Le disque du canvas reste juste dans les deux cas.
 */
function genQuantiteMixte(canvas = false): Genere {
  if (Math.random() < 0.5) return genQuantiteSituation(canvas);
  const { g, f } = tirerFractionDe();
  if (canvas) g.canvas = fractionCanvas({ model: "circle", fraction: { numerator: f.n, denominator: f.d, label: `${f.n}/${f.d}` } });
  return g;
}

const INVERSES_QUANTITE: { s: (f: string, v: number) => string; q: string }[] = [
  { s: (f, v) => `Léa a lu ${f} de son roman, soit ${v} pages.`, q: "Combien de pages compte le roman ?" },
  { s: (f, v) => `Dans un collège, ${v} élèves mangent à la cantine, soit ${f} des élèves.`, q: "Combien d'élèves compte le collège ?" },
  { s: (f, v) => `Un randonneur a parcouru ${f} d'un sentier, soit ${v} km.`, q: "Quelle est la longueur du sentier, en kilomètres ?" },
  { s: (f, v) => `Samir a dépensé ${f} de ses économies, soit ${v} €.`, q: "Combien avait-il d'économies ?" },
  { s: (f, v) => `Une cuve contient ${v} L d'eau, ce qui représente ${f} de sa capacité.`, q: "Quelle est la capacité de la cuve, en litres ?" },
  { s: (f, v) => `Dans un verger, ${v} arbres sont des pommiers, soit ${f} des arbres.`, q: "Combien d'arbres compte le verger ?" },
  { s: (f, v) => `Dans une salle de concert, ${v} places sont vendues, soit ${f} des places.`, q: "Combien de places compte la salle ?" },
  { s: (f, v) => `Une coureuse a fait ${v} tours de piste, soit ${f} de son entraînement.`, q: "Combien de tours compte son entraînement ?" },
  { s: (f, v) => `Un bricoleur a coupé ${v} cm d'une planche, soit ${f} de sa longueur.`, q: "Quelle est la longueur de la planche, en centimètres ?" },
  { s: (f, v) => `Dans une expérience, ${v} graines ont germé, soit ${f} des graines semées.`, q: "Combien de graines a-t-on semées ?" },
  { s: (f, v) => `Une chorale compte ${v} sopranos, soit ${f} des choristes.`, q: "Combien de choristes compte la chorale ?" },
  { s: (f, v) => `Au marché, ${v} fruits d'un étal sont des mangues, soit ${f} des fruits.`, q: "Combien de fruits y a-t-il sur l'étal ?" },
];

/** ★4 : on connaît la part, on cherche le tout. */
function genQuantiteInverse(): Genere {
  const f = Math.random() < 0.4 ? { n: 1, d: randomInt(2, 6) } : tirerFraction(6);
  const m = randomInt(2, 12);
  const total = f.d * m;
  const v = f.n * m;
  const F = $m(tq(f));
  const L = randomChoice(LETTRES_INC);
  const textes = [
    `${F} d'un nombre vaut ${v}. Quel est ce nombre ?`,
    `Quel est le nombre dont ${F} vaut ${v} ?`,
    `Si ${F} de $${L}$ est égal à ${v}, combien vaut $${L}$ ?`,
    `Complète : ${F} de … = ${v}.`,
    `On prend ${F} d'un nombre et on obtient ${v}. Quel était le nombre de départ ?`,
    `Trouve le nombre $${L}$ tel que $${tq(f)} \\times ${L} = ${v}$.`,
    ...INVERSES_QUANTITE.map((c) => `${c.s(F, v)} ${c.q}`),
  ];
  return {
    text: randomChoice(textes),
    format: "short",
    expected: [String(total)],
    comparator: "number_equal",
    explanation: expl(
      `si $${tq(f)}$ du tout vaut ${v}, alors $\\frac{1}{${f.d}}$ du tout vaut $${v} \\div ${f.n}$, et le tout vaut ${f.d} fois plus.`,
      f.n === 1 ? `on multiplie ${v} par ${f.d}.` : `on divise ${v} par ${f.n}, puis on multiplie par ${f.d}.`,
      f.n === 1 ? `$${v} \\times ${f.d} = ${total}$.` : `$${v} \\div ${f.n} = ${m}$, puis $${m} \\times ${f.d} = ${total}$.`,
      `le nombre cherché est ${total}.`,
    ),
  };
}

/* ===========================================================================
   FRACTION_OPPOSE
=========================================================================== */

function enoncesOppose(x: string, X: string): string[] {
  const L = randomChoice(["y", "a", "t", "n"]);
  const P = randomChoice(["A", "B", "C", "K", "M", "R"]);
  return [
    `Écris le nombre opposé à ${X}.`,
    `Quel nombre, ajouté à ${X}, donne une somme nulle ?`,
    `Sur une droite graduée, ${X} et son opposé sont symétriques par rapport à 0. Quel est cet opposé ?`,
    `Donne le nombre qui a la même distance à zéro que ${X}, mais le signe contraire.`,
    `Si $${L}$ est l'opposé de ${X}, combien vaut $${L}$ ?`,
    `Quel est l'opposé de ${X} ?`,
    `Donne l'opposé de ${X}.`,
    `Écris l'opposé de ${X}.`,
    `Quel nombre faut-il ajouter à ${X} pour obtenir 0 ?`,
    `Complète : $${x} + \\ldots = 0$.`,
    `Quel nombre $${L}$ vérifie $${x} + ${L} = 0$ ?`,
    `Quel nombre est à la même distance de 0 que ${X}, mais de l'autre côté ?`,
    `Sur une droite graduée, le point ${P} a pour abscisse ${X}. Quelle est l'abscisse du symétrique de ${P} par rapport à l'origine ?`,
    `Change le signe de ${X} : quel nombre obtiens-tu ?`,
    `Quel est le nombre dont la somme avec ${X} est nulle ?`,
    `Un élève cherche l'opposé de ${X}. Que doit-il trouver ?`,
    `Quel nombre est l'opposé de ${X} ?`,
    `Quel est le symétrique de ${X} par rapport à 0 ?`,
    `Calcule $-\\left(${x}\\right)$.`,
    `Que vaut $-\\left(${x}\\right)$ ?`,
  ];
}

/** L'écriture de départ : a/b, −a/b, (−a)/b ou a/(−b). */
function tirerOppose(formes: string[]) {
  const f = tirerFraction(10);
  const forme = randomChoice(formes);
  const xt =
    forme === "+" ? `\\frac{${f.n}}{${f.d}}` : forme === "-" ? `-\\frac{${f.n}}{${f.d}}` : forme === "num" ? `\\frac{-${f.n}}{${f.d}}` : `\\frac{${f.n}}{-${f.d}}`;
  const x: Q = forme === "+" ? f : { n: -f.n, d: f.d };
  const opp: Q = { n: -x.n, d: x.d };
  return { x, xt, opp, forme };
}

function explOppose(xt: string, x: Q, opp: Q, forme: string) {
  return expl(
    "l'opposé d'un nombre a la même distance à 0, de l'autre côté ; leur somme vaut 0.",
    forme === "num" || forme === "den"
      ? `d'abord, $${xt} = ${tq(x)}$ (un seul signe « − » suffit) ; puis on change le signe.`
      : "on change seulement le signe, sans toucher au numérateur ni au dénominateur.",
    `$${tp(x)} + ${tp(opp)} = 0$.`,
    `l'opposé de $${xt}$ est $${tq(opp)}$.`,
  );
}

function genOpposeCourt(): Genere {
  const { x, xt, opp, forme } = tirerOppose(["+", "-", "num", "den"]);
  return {
    text: randomChoice(enoncesOppose(xt, $m(xt))),
    format: "short",
    expected: reponsesTapees(opp),
    comparator: "fraction_decimal_equivalent",
    explanation: explOppose(xt, x, opp, forme),
  };
}

function genOpposeQcm(formes: string[]): Genere {
  const { x, xt, opp, forme } = tirerOppose(formes);
  const { choices, expected } = qcmQ(opp, [
    x,
    { n: x.d, d: Math.abs(x.n) },
    { n: -x.d, d: Math.abs(x.n) },
    { n: opp.n, d: opp.d + 1 },
  ]);
  return {
    text: randomChoice(enoncesOppose(xt, $m(xt))),
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation: explOppose(xt, x, opp, forme),
  };
}

/* ===========================================================================
   FRACTION_DEFI
=========================================================================== */

/** ★4 : ce qui reste, en fraction ; ou une fraction d'une fraction. */
function genDefiReste(): Genere {
  const type = randomChoice(["un", "un", "deux", "deux", "parmi", "mots"]);
  let r: Q;
  let text: string;
  let calc: string;
  let pieges: Q[];
  if (type === "un") {
    const a = tirerFraction(9);
    const p = randomChoice(PARTS);
    text = `${p.s($m(tq(a)))} ${randomChoice([`Quelle fraction ${p.tout} reste-t-il ?`, `Quelle part ${p.tout} reste-t-il ? Donne une fraction.`])}`;
    r = q(a.d - a.n, a.d);
    calc = `$1 - ${tq(a)} = \\frac{${a.d}}{${a.d}} - ${tq(a)} = ${tq(r)}$.`;
    pieges = [a, { n: 1, d: a.d }, { n: a.d - a.n, d: 2 * a.d }, { n: a.d, d: a.n + a.d }];
  } else if (type === "deux") {
    let a: Q;
    let b: Q;
    do {
      a = tirerFraction(6);
      b = tirerFraction(8);
    } while (a.n * b.d + b.n * a.d >= a.d * b.d);
    const c = randomChoice(ETAPES);
    text = `${c.s($m(tq(a)), $m(tq(b)))} ${c.reste}`;
    const somme = qAdd(a, b);
    r = q(somme.d - somme.n, somme.d);
    calc = `$${tq(a)} + ${tq(b)} = ${tq(somme)}$, puis $1 - ${tq(somme)} = ${tq(r)}$.`;
    pieges = [somme, { n: a.d + b.d - a.n - b.n, d: a.d + b.d }, { n: 1, d: somme.d }, { n: r.n + 1, d: r.d }];
  } else if (type === "parmi") {
    const a = tirerFraction(6);
    const b = tirerFraction(6);
    const c = randomChoice(PARMI);
    text = `${c.s($m(tq(a)), $m(tq(b)))} ${c.q}`;
    r = qMul(a, b);
    calc = `$${tq(b)} \\times ${tq(a)} = ${tf(a.n * b.n, a.d * b.d)}${r.n !== a.n * b.n || r.d !== a.d * b.d ? ` = ${tq(r)}` : ""}$ (« de » se traduit par une multiplication).`;
    pieges = [qAdd(a, b), { n: a.n + b.n, d: a.d + b.d }, { n: a.n * b.n, d: a.d + b.d }, q(a.n * b.d, a.d * b.n)];
  } else {
    const m = randomChoice(FRACTIONS_EN_MOTS.filter((x) => x.d <= 4));
    const b = tirerFraction(7);
    const B = $m(tq(b));
    text = randomChoice([`Calcule ${m.mot} de ${B}.`, `Que vaut ${m.mot} de ${B} ?`, `Quelle fraction obtient-on en prenant ${m.mot} de ${B} ?`]);
    r = qMul({ n: m.n, d: m.d }, b);
    calc = `$${tf(m.n, m.d)} \\times ${tq(b)} = ${tf(m.n * b.n, m.d * b.d)}${r.n !== m.n * b.n || r.d !== m.d * b.d ? ` = ${tq(r)}` : ""}$.`;
    pieges = [q(b.n * m.d, b.d * m.n), { n: b.n + m.n, d: b.d + m.d }, qAdd(b, { n: m.n, d: m.d }), { n: b.n, d: b.d * m.n + 1 }];
  }
  const { choices, expected } = qcmQ(r, pieges);
  return {
    text,
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation: expl(
      "le tout vaut 1 ; ce qui reste, c'est 1 moins les parts prises, et « une fraction de » se calcule par une multiplication.",
      "on traduit la situation par un calcul de fractions, puis on simplifie.",
      calc,
      `la réponse est $${tq(r)}$.`,
    ),
  };
}

/** ★5 : une erreur d'élève à expliquer. */
function genDefiErreur(): Genere {
  const p = randomChoice(PRENOMS);
  const type = randomChoice(["somme", "produit", "division", "inverse"]);
  let a: Q;
  let b: Q;
  do {
    a = tirerFraction(7);
    b = tirerFraction(7);
  } while (a.d === b.d || memeValeur(a, b));
  let e: string;
  let juste: string;
  let mots: string[];
  let lecon: string;
  if (type === "somme") {
    e = `$${tq(a)} + ${tq(b)} = ${tf(a.n + b.n, a.d + b.d)}$`;
    const r = qAdd(a, b);
    const D = ppcm(a.d, b.d);
    juste = `$${tq(a)} + ${tq(b)} = \\frac{${(a.n * D) / a.d}}{${D}} + \\frac{${(b.n * D) / b.d}}{${D}} = ${tq(r)}$`;
    mots = ["dénominateur", "commun", "même", pq(r)];
    lecon = "on n'additionne pas les dénominateurs : on met d'abord les fractions au même dénominateur.";
  } else if (type === "produit") {
    const D = ppcm(a.d, b.d);
    const na = (a.n * D) / a.d;
    const nb = (b.n * D) / b.d;
    e = `$${tq(a)} \\times ${tq(b)} = \\frac{${na}}{${D}} \\times \\frac{${nb}}{${D}} = \\frac{${na * nb}}{${D}}$`;
    const r = qMul(a, b);
    juste = `$${tq(a)} \\times ${tq(b)} = \\frac{${a.n * b.n}}{${a.d * b.d}}${r.n !== a.n * b.n || r.d !== a.d * b.d ? ` = ${tq(r)}` : ""}$`;
    mots = ["dénominateurs", "numérateurs", "multipli", pq(r)];
    lecon = "pour multiplier, on multiplie les numérateurs entre eux ET les dénominateurs entre eux ; le dénominateur commun ne sert qu'à additionner.";
  } else if (type === "division") {
    e = `$${tq(a)} \\div ${tq(b)} = ${tf(a.n * b.n, a.d * b.d)}$`;
    const r = qDiv(a, b);
    juste = `$${tq(a)} \\div ${tq(b)} = ${tq(a)} \\times ${tf(b.d, b.n)} = ${tq(r)}$`;
    mots = ["inverse", pq(r)];
    lecon = "diviser par une fraction, c'est multiplier par son INVERSE, pas par la fraction elle-même.";
  } else {
    e = `l'inverse de $${tq(a)}$ est $-${tq(a)}$`;
    juste = `l'inverse de $${tq(a)}$ est $${tf(a.d, a.n)}$, car $${tq(a)} \\times ${tf(a.d, a.n)} = 1$`;
    mots = ["inverse", "opposé", "échange", pq(q(a.d, a.n))];
    lecon = "l'opposé change le signe (somme nulle) ; l'inverse échange le numérateur et le dénominateur (produit égal à 1).";
  }
  const textes = [
    `${p.nom} écrit : ${e}. Explique son erreur.`,
    `${p.nom} affirme que ${e}. A-t-${p.il} raison ? Justifie.`,
    `Dans sa copie, ${p.nom} a écrit : ${e}. Où est l'erreur ? Donne le bon résultat.`,
    `D'après ${p.nom}, ${e}. Explique pourquoi c'est faux, puis corrige.`,
  ];
  return {
    text: randomChoice(textes),
    format: "open",
    expected: mots,
    comparator: "contains_keyword",
    explanation: expl(
      "chaque opération sur les fractions a sa règle.",
      lecon,
      `${juste}.`,
      `${p.nom} s'est trompé${p.il === "elle" ? "e" : ""} de règle.`,
    ),
  };
}

/** ★5 : une méthode annoncée est-elle correcte ? */
function genDefiMethode(): Genere {
  const p = randomChoice(PRENOMS);
  let a: Q;
  let b: Q;
  do {
    a = tirerFraction(7);
    b = tirerFraction(7);
  } while (a.d === b.d);
  const A = $m(tq(a));
  const B = $m(tq(b));
  const D = ppcm(a.d, b.d);
  const fois = $m(`${tq(a)} \\times ${tq(b)}`);
  const div = $m(`${tq(a)} \\div ${tq(b)}`);
  const plus = $m(`${tq(a)} + ${tq(b)}`);
  const moins = $m(`${tq(a)} - ${tq(b)}`);
  const methodes: { t: string; ok: boolean; calc: string }[] = [
    { t: `Pour calculer ${fois}, ${p.nom} met d'abord les fractions au même dénominateur, multiplie les numérateurs et garde le dénominateur commun.`, ok: false, calc: `$${tq(a)} \\times ${tq(b)} = \\frac{${a.n * b.n}}{${a.d * b.d}}$ : on multiplie directement numérateurs et dénominateurs.` },
    { t: `Pour calculer ${fois}, ${p.nom} multiplie les numérateurs entre eux et les dénominateurs entre eux.`, ok: true, calc: `$${tq(a)} \\times ${tq(b)} = \\frac{${a.n} \\times ${b.n}}{${a.d} \\times ${b.d}} = ${tq(qMul(a, b))}$.` },
    { t: `Pour calculer ${div}, ${p.nom} multiplie ${A} par l'inverse de ${B}.`, ok: true, calc: `$${tq(a)} \\div ${tq(b)} = ${tq(a)} \\times ${tf(b.d, b.n)} = ${tq(qDiv(a, b))}$.` },
    { t: `Pour calculer ${plus}, ${p.nom} additionne les numérateurs entre eux et les dénominateurs entre eux.`, ok: false, calc: `il faut un dénominateur commun : $${tq(a)} + ${tq(b)} = ${tq(qAdd(a, b))}$, et non $${tf(a.n + b.n, a.d + b.d)}$.` },
    { t: `Pour calculer ${plus}, ${p.nom} écrit les deux fractions avec le dénominateur ${D}, puis additionne les numérateurs.`, ok: true, calc: `$${tq(a)} + ${tq(b)} = \\frac{${(a.n * D) / a.d}}{${D}} + \\frac{${(b.n * D) / b.d}}{${D}} = ${tq(qAdd(a, b))}$.` },
    { t: `Pour calculer ${div}, ${p.nom} multiplie ${A} par l'opposé de ${B}.`, ok: false, calc: `on multiplie par l'INVERSE : $${tq(a)} \\div ${tq(b)} = ${tq(a)} \\times ${tf(b.d, b.n)} = ${tq(qDiv(a, b))}$.` },
    { t: `Pour calculer ${moins}, ${p.nom} écrit les deux fractions avec le dénominateur ${D}, puis soustrait les numérateurs.`, ok: true, calc: `$${tq(a)} - ${tq(b)} = \\frac{${(a.n * D) / a.d}}{${D}} - \\frac{${(b.n * D) / b.d}}{${D}} = ${tq(q(a.n * b.d - b.n * a.d, a.d * b.d))}$.` },
    { t: `Pour calculer ${fois}, ${p.nom} multiplie seulement les numérateurs et garde le dénominateur de ${A}.`, ok: false, calc: `les dénominateurs se multiplient aussi : $${tq(a)} \\times ${tq(b)} = \\frac{${a.n * b.n}}{${a.d * b.d}}$.` },
  ];
  const m = randomChoice(methodes);
  const suite = randomChoice([" Sa méthode est-elle correcte ?", ` A-t-${p.il} raison ?`, " Cette méthode donne-t-elle le bon résultat ?"]);
  const rep = m.ok ? "oui" : "non";
  return {
    text: m.t + suite,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [rep],
    comparator: "mcq_exact",
    explanation: expl(
      "additionner demande un dénominateur commun ; multiplier se fait « en haut avec en haut, en bas avec en bas » ; diviser, c'est multiplier par l'inverse.",
      "on vérifie la règle utilisée, puis on refait le calcul.",
      m.calc,
      m.ok ? "la méthode est correcte : oui." : "la méthode est fausse : non.",
    ),
  };
}

/** ★5 : ce qui reste d'une quantité, après en avoir pris une fraction. */
function genDefiResteQuantite(): Genere {
  const { c, f, total, part } = tirerQuantite([3, 4, 5, 6, 8]);
  const reste = total - part;
  return {
    text: `${c.s($m(tq(f)), String(total))} ${c.r}`,
    format: "short",
    expected: [String(reste)],
    comparator: "number_equal",
    explanation: expl(
      "on calcule la part prise, puis on la retire du total (ou on prend directement la fraction qui reste).",
      `la part prise vaut $${tq(f)}$ de ${total} ; il reste $1 - ${tq(f)} = ${tf(f.d - f.n, f.d)}$ du total.`,
      `$${total} \\div ${f.d} \\times ${f.n} = ${part}$, puis $${total} - ${part} = ${reste}$.`,
      `il reste ${reste} (${c.unite}).`,
    ),
  };
}

export const fractionsBank: TutorBankItemV4[] = [
  // =========================
  // FRACTION_EGALES
  // =========================
  {
    kind: "fixed",
    id: "fraction_egale_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle fraction est égale à 1/2 ?",
    format: "qcm",
    choices: ["2/4", "1/3", "3/5", "2/3"],
    expected: ["2/4"],
    comparator: "mcq_exact",
    hint: "Multiplie le numérateur et le dénominateur par le même nombre.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("1/2 = 2/4 car on multiplie 1 et 2 par 2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "egales", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_egale_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 1,
    theme: "neutral",
    hint: "Deux fractions sont égales si on multiplie haut et bas par le même nombre.",
    tags: ["fraction_nombre", "egales", "template"],
    generate: () => genEgaleQcm(1),
  },

  // =========================
  // FRACTION_SIMPLIFIER
  // =========================
  {
    kind: "fixed",
    id: "fraction_simplifier_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 1,
    theme: "neutral",
    text: "Simplifier 6/8.",
    format: "qcm",
    choices: ["3/4", "2/4", "6/4", "1/2"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Divise le numérateur et le dénominateur par 2.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("6/8 = 3/4 car on divise 6 et 8 par 2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "simplifier"],
  },
  {
    kind: "template",
    id: "fraction_simplifier_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche un diviseur commun.",
    tags: ["fraction_nombre", "simplifier", "template"],
    generate: () => genSimplifierCourt(2).g,
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi 8/12 peut se simplifier en 2/3.",
    format: "open",
    expected: ["divise", "4", "2/3"],
    comparator: "contains_keyword",
    hint: "Cherche par quel nombre on divise 8 et 12.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("On divise 8 et 12 par 4 : 8/12 = 2/3.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "simplifier", "open"],
  },

  // =========================
  // FRACTION_DECIMAL
  // =========================
  {
    kind: "fixed",
    id: "fraction_decimal_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 1,
    theme: "neutral",
    text: "À quel nombre décimal correspond 1/2 ?",
    format: "qcm",
    choices: ["0,2", "0,5", "1,2", "2"],
    expected: ["0,5"],
    comparator: "mcq_exact",
    hint: "1 ÷ 2 = 0,5.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("1/2 = 1 ÷ 2 = 0,5.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "decimal"],
  },
  {
    kind: "template",
    id: "fraction_decimal_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule le numérateur divisé par le dénominateur.",
    tags: ["fraction_nombre", "decimal", "template"],
    generate: () => genVersDecimalQcm(2),
  },

  // =========================
  // FRACTION_RATIONNEL
  // =========================
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 1,
    theme: "neutral",
    text: "Un nombre rationnel peut s’écrire sous la forme…",
    format: "qcm",
    choices: ["a/b avec b non nul", "a/b avec b = 0", "toujours un entier", "toujours positif"],
    expected: ["a/b avec b non nul"],
    comparator: "mcq_exact",
    hint: "Le dénominateur ne doit pas être nul.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("Un nombre rationnel peut s’écrire a/b avec b différent de 0.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "rationnel"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi 0,5 est un nombre rationnel.",
    format: "open",
    expected: ["0,5", "1/2", "fraction"],
    comparator: "contains_keyword",
    hint: "Essaie d’écrire 0,5 sous forme de fraction.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("0,5 = 1/2. Comme il peut s’écrire sous forme de fraction, c’est un nombre rationnel.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "rationnel", "open"],
  },

  // =========================
  // FRACTION_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est la plus grande ?",
    format: "qcm",
    choices: ["1/2", "1/3", "1/4", "1/5"],
    expected: ["1/2"],
    comparator: "mcq_exact",
    hint: "À numérateur égal, plus le dénominateur est petit, plus la fraction est grande.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("1/2 est plus grand que 1/3, 1/4 et 1/5.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "comparer"],
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Mets au même dénominateur ou compare les produits en croix.",
    tags: ["fraction_nombre", "comparer", "template"],
    // On compare par produit en croix, jamais en décimal : deux écritures de la
    // même valeur donnent « elles sont égales » (voir `genPlusGrande`).
    generate: () => genPlusGrande(3),
  },

  // =========================
  // FRACTION_ADDITION
  // =========================
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 1/4 + 2/4.",
    format: "qcm",
    choices: ["3/4", "3/8", "2/8", "1/2"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Les dénominateurs sont déjà les mêmes.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("1/4 + 2/4 = 3/4.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "addition"],
  },
  {
    kind: "template",
    id: "fraction_additionner_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    hint: "Mets les fractions au même dénominateur.",
    tags: ["fraction_nombre", "addition", "template"],
    generate: () => genSommeCourt(3),
  },
  {
    kind: "fixed",
    id: "fraction_additionner_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 1/2 + 1/3 ne vaut pas 2/5.",
    format: "open",
    expected: ["dénominateur", "commun", "5/6"],
    comparator: "contains_keyword",
    hint: "On n’additionne pas les dénominateurs.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("Il faut mettre au même dénominateur : 1/2 = 3/6 et 1/3 = 2/6, donc 1/2 + 1/3 = 5/6.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "addition", "erreur", "open"],
  },

  // =========================
  // FRACTION_PRODUIT
  // =========================
  {
    kind: "fixed",
    id: "fraction_multiplier_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 2/3 × 3/5.",
    format: "qcm",
    choices: ["6/15", "5/8", "6/8", "1/5"],
    expected: ["6/15"],
    comparator: "mcq_exact",
    hint: "On multiplie les numérateurs entre eux et les dénominateurs entre eux.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("2/3 × 3/5 = (2×3)/(3×5) = 6/15.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "produit"],
  },
  {
    kind: "template",
    id: "fraction_multiplier_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie haut avec haut, bas avec bas.",
    tags: ["fraction_nombre", "produit", "template"],
    generate: () => genProduitCourt(),
  },

  // =========================
  // FRACTION_INVERSE
  // =========================
  {
    kind: "fixed",
    id: "fraction_inverse_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’inverse de 3/5 ?",
    format: "qcm",
    choices: ["5/3", "-3/5", "3/5", "2/5"],
    expected: ["5/3"],
    comparator: "mcq_exact",
    hint: "On inverse le numérateur et le dénominateur.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("L’inverse de 3/5 est 5/3 car 3/5 × 5/3 = 1.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "inverse"],
  },
  {
    kind: "template",
    id: "fraction_inverse_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    hint: "Échange le numérateur et le dénominateur.",
    tags: ["fraction_nombre", "inverse", "template"],
    generate: () => genInverseCourt(),
  },

  // =========================
  // FRACTION_DIVISION
  // =========================
  {
    kind: "fixed",
    id: "fraction_diviser_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_diviser",
    difficulty: 3,
    theme: "neutral",
    text: "Diviser par 2/3 revient à multiplier par…",
    format: "qcm",
    choices: ["2/3", "3/2", "-2/3", "1/3"],
    expected: ["3/2"],
    comparator: "mcq_exact",
    hint: "On multiplie par l’inverse.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("Diviser par 2/3 revient à multiplier par son inverse, donc par 3/2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "division"],
  },
  {
    kind: "template",
    id: "fraction_diviser_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_diviser",
    difficulty: 4,
    theme: "neutral",
    hint: "Multiplier par l’inverse de la deuxième fraction.",
    tags: ["fraction_nombre", "division", "template"],
    generate: () => genQuotientCourt(),
  },
  {
    kind: "fixed",
    id: "fraction_diviser_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_diviser",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la méthode pour diviser par une fraction.",
    format: "open",
    expected: ["multiplier", "inverse"],
    comparator: "contains_keyword",
    hint: "On ne divise pas directement : on transforme.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("Pour diviser par une fraction, on multiplie par son inverse.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "division", "open"],
  },

  // =========================
  // FRACTION_QUANTITE
  // =========================
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 3/4 de 20.",
    format: "qcm",
    choices: ["15", "12", "10", "5"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "On calcule 20 ÷ 4 puis on multiplie par 3.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("3/4 de 20 = 20 × 3/4 = 15.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "quantite"],
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    hint: "Prends la fraction de la quantité totale.",
    tags: ["fraction_nombre", "quantite", "contexte", "template"],
    generate: () => genQuantiteMixte(),
  },

  // =========================
  // FRACTION_OPPOSE
  // =========================
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’opposé de 3/7 ?",
    format: "qcm",
    choices: ["-3/7", "7/3", "3/-7", "3/7"],
    expected: ["-3/7"],
    comparator: "mcq_exact",
    hint: "L’opposé change le signe.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("L’opposé de 3/7 est -3/7.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "oppose"],
  },
  {
    kind: "template",
    id: "fraction_oppose_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    hint: "Change seulement le signe.",
    tags: ["fraction_nombre", "oppose", "template"],
    generate: () => genOpposeCourt(),
  },

  // =========================
  // FRACTION_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "fraction_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève affirme que 1/2 + 1/3 = 2/5. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "On n’additionne pas les dénominateurs.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("Non. 1/2 + 1/3 = 3/6 + 2/6 = 5/6.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "defi", "erreur"],
  },
  {
    kind: "template",
    id: "fraction_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Repère l’erreur classique.",
    tags: ["fraction_nombre", "defi", "open", "erreur"],
    // Une vraie erreur d'élève, chiffrée : addition, produit, division ou inverse.
    generate: () => genDefiErreur(),
  },
    /* =========================
     RENFORT — FRACTION CANVAS 4e
  ========================= */

  {
    kind: "template",
    id: "4e_fraction_egale_canvas_compare_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    hint: "Observe si les deux parties colorées représentent la même proportion.",
    tags: ["fraction_nombre", "egales", "canvas", "compare", "template"],
    generate: () => {
      const { g, a, b } = genEgalesOuiNon(2);
      return {
        ...g,
        canvas: fractionCanvas({
          model: "compare",
          fractions: [
            { numerator: a.n, denominator: a.d, label: frac(a.n, a.d) },
            { numerator: b.n, denominator: b.d, label: frac(b.n, b.d) },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "4e_fraction_simplifier_canvas_bar_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche une fraction plus simple qui représente la même partie colorée.",
    tags: ["fraction_nombre", "simplifier", "canvas", "bar", "template"],
    // ⚠️ Avant le 30/09, la fraction de DÉPART était acceptée comme réponse :
    // l'élève qui recopiait l'énoncé avait juste. Seule l'irréductible compte.
    generate: () => {
      const { g, F } = genSimplifierCourt(2);
      return {
        ...g,
        canvas: fractionCanvas({
          model: "bar",
          fraction: { numerator: F.n, denominator: F.d, label: frac(F.n, F.d) },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "4e_fraction_comparer_canvas_compare_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les portions colorées ou utilise le produit en croix.",
    tags: ["fraction_nombre", "comparer", "canvas", "compare", "template"],
    generate: () => {
      const { g, a, b } = genSigne();
      return {
        ...g,
        canvas: fractionCanvas({
          model: "compare",
          fractions: [
            { numerator: a.n, denominator: a.d, label: frac(a.n, a.d) },
            { numerator: b.n, denominator: b.d, label: frac(b.n, b.d) },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "4e_fraction_additionner_canvas_bar_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    hint: "Les dénominateurs sont identiques : additionne les numérateurs.",
    tags: ["fraction_nombre", "addition", "canvas", "bar", "template"],
    // Le dessin montre les deux TERMES, pas le résultat (l'ancienne barre
    // dessinait la somme : la réponse était sous les yeux de l'élève).
    generate: () => genSommeCourt(2, true),
  },

  {
    kind: "template",
    id: "4e_fraction_quantite_canvas_circle_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    hint: "Divise par le dénominateur puis multiplie par le numérateur.",
    tags: ["fraction_nombre", "quantite", "canvas", "circle", "template"],
    generate: () => genQuantiteMixte(true),
  },

  {
    kind: "template",
    id: "4e_fraction_rationnel_canvas_grid_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    hint: "Un rationnel peut s’écrire comme quotient de deux entiers.",
    tags: ["fraction_nombre", "rationnel", "canvas", "grid", "template"],
    generate: () => genGrille(),
  },

  {
    kind: "fixed",
    id: "4e_fraction_piege_parts_inegales_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 3,
    theme: "neutral",
    text: "Deux figures ont 2 parts colorées sur 4. Peut-on toujours dire qu’elles représentent la même fraction ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut vérifier que les parts sont égales.",
    explanation:
      "Définition : une fraction représente des parts égales d’un même tout.\n\n" +
      "Méthode : avant d’écrire ou de comparer une fraction, on vérifie que le partage est régulier.\n\n" +
      "Observation : si les parts ne sont pas égales, l’écriture 2/4 n’est pas fiable.\n\n" +
      "Conclusion : on ne peut pas conclure sans parts égales.",
    tags: ["fraction_nombre", "piege", "parts_inegales", "canvas"],
    canvas: fractionCanvas({
      model: "bar",
      fraction: { numerator: 2, denominator: 4, label: "2/4 ?" },
      display: { unequalParts: true },
    }),
  },

  {
    kind: "fixed",
    id: "4e_fraction_additionner_erreur_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : 1/2 + 1/3 = 2/5. Explique son erreur.",
    format: "open",
    expected: ["dénominateur", "commun", "5/6", "additionne"],
    comparator: "contains_keyword",
    hint: "On n’additionne pas les dénominateurs.",
    explanation:
      "Définition : pour additionner deux fractions, il faut utiliser un dénominateur commun.\n\n" +
      "Méthode : on transforme les fractions avant d’additionner.\n\n" +
      "Calcul : 1/2 = 3/6 et 1/3 = 2/6, donc 1/2 + 1/3 = 5/6.\n\n" +
      "Conclusion : l’erreur est d’avoir additionné les dénominateurs.",
    tags: ["fraction_nombre", "erreur", "open", "addition"],
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
     Réponses-fractions → QCM LaTeX ; numériques → short.
  ========================================================= */

  // ---------- FRACTION_EGALE ----------
  {
    kind: "fixed",
    id: "fraction_egale_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle fraction est égale à $\\frac{2}{3}$ ?",
    format: "qcm",
    choices: ["$\\frac{4}{6}$", "$\\frac{2}{4}$", "$\\frac{3}{4}$", "$\\frac{1}{3}$"],
    expected: ["$\\frac{4}{6}$"],
    comparator: "mcq_exact",
    hint: "Multiplie le numérateur et le dénominateur par le même nombre.",
    explanation:
      "Définition : deux fractions sont égales si on multiplie haut et bas par le même nombre.\n\n" +
      "Méthode : on multiplie 2 et 3 par 2.\n\n" +
      "Calcul : $\\frac{2}{3} = \\frac{2\\times2}{3\\times2} = \\frac{4}{6}$.\n\n" +
      "Conclusion : la fraction égale est $\\frac{4}{6}$.",
    tags: ["fraction_nombre", "egales", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_egale_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    text: "À quelle fraction simple est égale $\\frac{6}{9}$ ?",
    format: "qcm",
    choices: ["$\\frac{2}{3}$", "$\\frac{3}{4}$", "$\\frac{6}{3}$", "$\\frac{1}{3}$"],
    expected: ["$\\frac{2}{3}$"],
    comparator: "mcq_exact",
    hint: "Divise le numérateur et le dénominateur par 3.",
    explanation:
      "Définition : deux fractions sont égales si on divise haut et bas par le même nombre.\n\n" +
      "Méthode : on divise 6 et 9 par 3.\n\n" +
      "Calcul : $\\frac{6}{9} = \\frac{6\\div3}{9\\div3} = \\frac{2}{3}$.\n\n" +
      "Conclusion : $\\frac{6}{9} = \\frac{2}{3}$.",
    tags: ["fraction_nombre", "egales", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_egale_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est égale à $\\frac{10}{15}$ ?",
    format: "qcm",
    choices: ["$\\frac{2}{3}$", "$\\frac{5}{3}$", "$\\frac{3}{5}$", "$\\frac{1}{2}$"],
    expected: ["$\\frac{2}{3}$"],
    comparator: "mcq_exact",
    hint: "Divise par 5.",
    explanation:
      "Définition : deux fractions sont égales si on divise haut et bas par le même nombre.\n\n" +
      "Méthode : on divise 10 et 15 par 5.\n\n" +
      "Calcul : $\\frac{10}{15} = \\frac{2}{3}$.\n\n" +
      "Conclusion : $\\frac{10}{15} = \\frac{2}{3}$.",
    tags: ["fraction_nombre", "egales", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_egale_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie le haut et le bas par le même nombre.",
    tags: ["fraction_nombre", "egales", "template"],
    generate: () => genEgaleQcm(2),
  },
  {
    kind: "template",
    id: "fraction_egale_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    hint: "Quel nombre a-t-on utilisé pour passer du dénominateur de départ à l’autre ?",
    tags: ["fraction_nombre", "egales", "numerateur", "template"],
    generate: () => genEgaleManquant(),
  },
  {
    kind: "template",
    id: "fraction_egale_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les produits en croix : a × d et b × c.",
    tags: ["fraction_nombre", "egales", "produit_croix", "template"],
    generate: () => genEgalesOuiNon(3).g,
  },

  // ---------- FRACTION_SIMPLIFIER ----------
  {
    kind: "fixed",
    id: "fraction_simplifier_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 1,
    theme: "neutral",
    text: "Simplifier $\\frac{4}{6}$.",
    format: "qcm",
    choices: ["$\\frac{2}{3}$", "$\\frac{1}{2}$", "$\\frac{4}{3}$", "$\\frac{3}{4}$"],
    expected: ["$\\frac{2}{3}$"],
    comparator: "mcq_exact",
    hint: "Divise par 2.",
    explanation:
      "Définition : simplifier, c’est écrire une fraction égale avec des nombres plus petits.\n\n" +
      "Méthode : on divise 4 et 6 par 2.\n\n" +
      "Calcul : $\\frac{4}{6} = \\frac{2}{3}$.\n\n" +
      "Conclusion : la forme simplifiée est $\\frac{2}{3}$.",
    tags: ["fraction_nombre", "simplifier", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Simplifier $\\frac{9}{12}$.",
    format: "qcm",
    choices: ["$\\frac{3}{4}$", "$\\frac{2}{3}$", "$\\frac{9}{4}$", "$\\frac{1}{3}$"],
    expected: ["$\\frac{3}{4}$"],
    comparator: "mcq_exact",
    hint: "Divise par 3.",
    explanation:
      "Définition : simplifier, c’est écrire une fraction égale avec des nombres plus petits.\n\n" +
      "Méthode : on divise 9 et 12 par 3.\n\n" +
      "Calcul : $\\frac{9}{12} = \\frac{3}{4}$.\n\n" +
      "Conclusion : la forme simplifiée est $\\frac{3}{4}$.",
    tags: ["fraction_nombre", "simplifier", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_simplifier_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise le haut et le bas par leur diviseur commun.",
    tags: ["fraction_nombre", "simplifier", "template"],
    generate: () => genSimplifierQcm(2),
  },
  {
    kind: "template",
    id: "fraction_simplifier_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le plus grand nombre qui divise à la fois le haut et le bas.",
    tags: ["fraction_nombre", "simplifier", "pgcd", "template"],
    generate: () => genSimplifierPgcd(),
  },
  {
    kind: "template",
    id: "fraction_simplifier_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Une fraction est irréductible si le seul diviseur commun est 1.",
    tags: ["fraction_nombre", "simplifier", "irreductible", "template"],
    generate: () => genIrreductible(),
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment simplifier la fraction $\\frac{12}{18}$.",
    format: "open",
    expected: ["divise", "6", "2/3"],
    comparator: "contains_keyword",
    hint: "Cherche par quel nombre diviser 12 et 18.",
    explanation:
      "Définition : simplifier, c’est diviser le numérateur et le dénominateur par un même nombre.\n\n" +
      "Méthode : on divise 12 et 18 par leur diviseur commun 6.\n\n" +
      "Calcul : $\\frac{12}{18} = \\frac{2}{3}$.\n\n" +
      "Conclusion : la forme simplifiée est $\\frac{2}{3}$.",
    tags: ["fraction_nombre", "simplifier", "open"],
  },

  // ---------- FRACTION_DECIMAL ----------
  {
    kind: "fixed",
    id: "fraction_decimal_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 1,
    theme: "neutral",
    text: "À quel nombre décimal correspond $\\frac{1}{4}$ ?",
    format: "qcm",
    choices: ["0,25", "0,4", "0,5", "0,75"],
    expected: ["0,25"],
    comparator: "mcq_exact",
    hint: "1 ÷ 4 = 0,25.",
    explanation:
      "Définition : une fraction est aussi un quotient.\n\n" +
      "Méthode : on calcule numérateur ÷ dénominateur.\n\n" +
      "Calcul : $1 \\div 4 = 0{,}25$.\n\n" +
      "Conclusion : $\\frac{1}{4} = 0{,}25$.",
    tags: ["fraction_nombre", "decimal", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_decimal_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 1,
    theme: "neutral",
    text: "À quel nombre décimal correspond $\\frac{3}{10}$ ?",
    format: "qcm",
    choices: ["0,3", "0,03", "3", "0,13"],
    expected: ["0,3"],
    comparator: "mcq_exact",
    hint: "Diviser par 10 décale la virgule d’un rang.",
    explanation:
      "Définition : une fraction est aussi un quotient.\n\n" +
      "Méthode : diviser par 10, c’est décaler la virgule d’un rang vers la gauche.\n\n" +
      "Calcul : $3 \\div 10 = 0{,}3$.\n\n" +
      "Conclusion : $\\frac{3}{10} = 0{,}3$.",
    tags: ["fraction_nombre", "decimal", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_decimal_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "À quel nombre décimal correspond $\\frac{1}{5}$ ?",
    format: "qcm",
    choices: ["0,2", "0,5", "0,15", "1,5"],
    expected: ["0,2"],
    comparator: "mcq_exact",
    hint: "$\\frac{1}{5} = \\frac{2}{10}$.",
    explanation:
      "Définition : une fraction est aussi un quotient.\n\n" +
      "Méthode : on transforme en dixièmes ou on calcule $1 \\div 5$.\n\n" +
      "Calcul : $\\frac{1}{5} = \\frac{2}{10} = 0{,}2$.\n\n" +
      "Conclusion : $\\frac{1}{5} = 0{,}2$.",
    tags: ["fraction_nombre", "decimal", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_decimal_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Diviser par 10 décale la virgule d’un rang.",
    tags: ["fraction_nombre", "decimal", "template"],
    generate: () => genVersDecimalCourt(10),
  },
  {
    kind: "template",
    id: "fraction_decimal_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Diviser par 100 décale la virgule de deux rangs.",
    tags: ["fraction_nombre", "decimal", "template"],
    generate: () => genVersDecimalCourt(100),
  },
  {
    kind: "template",
    id: "fraction_decimal_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule numérateur ÷ dénominateur.",
    tags: ["fraction_nombre", "decimal", "qcm", "template"],
    generate: () => genVersDecimalQcm(3),
  },
  {
    kind: "template",
    id: "fraction_decimal_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 3,
    theme: "neutral",
    hint: "Pense à la fraction décimale équivalente.",
    tags: ["fraction_nombre", "decimal", "qcm", "reciproque", "template"],
    // ⚠️ L'ancienne liste proposait $\frac{5}{10}$ en piège pour 0,5 : c'était
    // une DEUXIÈME bonne réponse. Les pièges sont désormais de valeur différente.
    generate: () => genVersFraction(),
  },
  {
    kind: "fixed",
    id: "fraction_decimal_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment transformer $\\frac{3}{4}$ en nombre décimal.",
    format: "open",
    expected: ["divise", "0,75", "quotient"],
    comparator: "contains_keyword",
    hint: "Une fraction est un quotient.",
    explanation:
      "Définition : une fraction est aussi un quotient.\n\n" +
      "Méthode : on divise le numérateur par le dénominateur.\n\n" +
      "Calcul : $3 \\div 4 = 0{,}75$.\n\n" +
      "Conclusion : $\\frac{3}{4} = 0{,}75$.",
    tags: ["fraction_nombre", "decimal", "open"],
  },

  // ---------- FRACTION_RATIONNEL ----------
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 1,
    theme: "neutral",
    text: "Le nombre entier 4 est-il un nombre rationnel ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Peut-on écrire 4 sous la forme a/b ?",
    explanation:
      "Définition : un nombre rationnel s’écrit $\\frac{a}{b}$ avec $b \\neq 0$.\n\n" +
      "Méthode : on cherche une écriture fractionnaire de 4.\n\n" +
      "Calcul : $4 = \\frac{4}{1}$.\n\n" +
      "Conclusion : oui, 4 est un nombre rationnel.",
    tags: ["fraction_nombre", "rationnel", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "Pourquoi l’écriture $\\frac{a}{0}$ n’a-t-elle pas de sens ?",
    format: "qcm",
    choices: [
      "car on ne peut pas diviser par 0",
      "car a est trop grand",
      "car a doit être nul",
      "car le résultat vaut 0",
    ],
    expected: ["car on ne peut pas diviser par 0"],
    comparator: "mcq_exact",
    hint: "Le dénominateur représente une division.",
    explanation:
      "Définition : un nombre rationnel s’écrit $\\frac{a}{b}$ avec $b \\neq 0$.\n\n" +
      "Méthode : le dénominateur correspond à une division par b.\n\n" +
      "Calcul : la division par 0 est impossible.\n\n" +
      "Conclusion : $\\frac{a}{0}$ n’a pas de sens.",
    tags: ["fraction_nombre", "rationnel", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre $-\\frac{3}{4}$ est-il rationnel ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un rationnel peut être négatif.",
    explanation:
      "Définition : un nombre rationnel s’écrit $\\frac{a}{b}$ avec $b \\neq 0$, et $a$ peut être négatif.\n\n" +
      "Méthode : on vérifie que c’est un quotient de deux entiers.\n\n" +
      "Calcul : $-\\frac{3}{4}$ est le quotient de $-3$ par $4$.\n\n" +
      "Conclusion : oui, c’est un nombre rationnel.",
    tags: ["fraction_nombre", "rationnel", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’écriture $\\frac{a}{b}$ d’un rationnel, que doit vérifier $b$ ?",
    format: "qcm",
    choices: ["b doit être différent de 0", "b doit être positif", "b doit être un entier pair", "b doit être égal à a"],
    expected: ["b doit être différent de 0"],
    comparator: "mcq_exact",
    hint: "On ne divise jamais par 0.",
    explanation:
      "Définition : un nombre rationnel s’écrit $\\frac{a}{b}$ avec $b \\neq 0$.\n\n" +
      "Méthode : on rappelle la condition sur le dénominateur.\n\n" +
      "Calcul : aucune autre condition n’est imposée à b.\n\n" +
      "Conclusion : b doit être différent de 0.",
    tags: ["fraction_nombre", "rationnel", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_rationnel_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    hint: "Tout nombre qui s’écrit comme quotient de deux entiers est rationnel.",
    tags: ["fraction_nombre", "rationnel", "template"],
    generate: () => genEstRationnel(),
  },
  {
    kind: "template",
    id: "fraction_rationnel_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    hint: "Un entier se met sur 1 ; un décimal sur 10, 100… selon le nombre de chiffres après la virgule.",
    tags: ["fraction_nombre", "rationnel", "qcm", "template"],
    generate: () => genEcritureFractionnaire(2),
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi tout nombre entier est aussi un nombre rationnel.",
    format: "open",
    expected: ["entier", "fraction", "1"],
    comparator: "contains_keyword",
    hint: "Écris un entier comme une fraction de dénominateur 1.",
    explanation:
      "Définition : un nombre rationnel s’écrit $\\frac{a}{b}$ avec $b \\neq 0$.\n\n" +
      "Méthode : on écrit l’entier sur un dénominateur 1.\n\n" +
      "Calcul : par exemple $7 = \\frac{7}{1}$.\n\n" +
      "Conclusion : tout entier est un rationnel car il s’écrit comme fraction de dénominateur 1.",
    tags: ["fraction_nombre", "rationnel", "open"],
  },

  // ---------- FRACTION_COMPARER ----------
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est la plus grande : $\\frac{2}{5}$ ou $\\frac{3}{5}$ ?",
    format: "qcm",
    choices: ["$\\frac{3}{5}$", "$\\frac{2}{5}$", "elles sont égales"],
    expected: ["$\\frac{3}{5}$"],
    comparator: "mcq_exact",
    hint: "Même dénominateur : on compare les numérateurs.",
    explanation:
      "Définition : à dénominateur égal, la plus grande fraction a le plus grand numérateur.\n\n" +
      "Méthode : on compare 2 et 3.\n\n" +
      "Calcul : $3 > 2$.\n\n" +
      "Conclusion : $\\frac{3}{5}$ est la plus grande.",
    tags: ["fraction_nombre", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "La fraction $\\frac{5}{4}$ est-elle plus grande ou plus petite que 1 ?",
    format: "qcm",
    choices: ["plus grande que 1", "plus petite que 1", "égale à 1"],
    expected: ["plus grande que 1"],
    comparator: "mcq_exact",
    hint: "Compare le numérateur et le dénominateur.",
    explanation:
      "Définition : une fraction est plus grande que 1 si son numérateur dépasse son dénominateur.\n\n" +
      "Méthode : on compare 5 et 4.\n\n" +
      "Calcul : $5 > 4$.\n\n" +
      "Conclusion : $\\frac{5}{4} > 1$.",
    tags: ["fraction_nombre", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "À numérateur égal, quelle fraction est la plus grande : $\\frac{3}{4}$ ou $\\frac{3}{7}$ ?",
    format: "qcm",
    choices: ["$\\frac{3}{4}$", "$\\frac{3}{7}$", "elles sont égales"],
    expected: ["$\\frac{3}{4}$"],
    comparator: "mcq_exact",
    hint: "À numérateur égal, plus le dénominateur est petit, plus la fraction est grande.",
    explanation:
      "Définition : à numérateur égal, la plus grande fraction a le plus petit dénominateur.\n\n" +
      "Méthode : on compare les dénominateurs 4 et 7.\n\n" +
      "Calcul : $4 < 7$, donc $\\frac{3}{4} > \\frac{3}{7}$.\n\n" +
      "Conclusion : $\\frac{3}{4}$ est la plus grande.",
    tags: ["fraction_nombre", "comparer", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Même dénominateur : on compare les numérateurs.",
    tags: ["fraction_nombre", "comparer", "template"],
    generate: () => genPlusGrande(2),
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise le produit en croix : a × d et c × b.",
    tags: ["fraction_nombre", "comparer", "produit_croix", "template"],
    generate: () => genSigne().g,
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Transforme la fraction en décimal pour comparer.",
    tags: ["fraction_nombre", "comparer", "decimal", "template"],
    generate: () => genFractionContreDecimal(),
  },

  // ---------- FRACTION_ADDITIONNER ----------
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer $\\frac{2}{5} + \\frac{1}{5}$.",
    format: "qcm",
    choices: ["$\\frac{3}{5}$", "$\\frac{3}{10}$", "$\\frac{2}{5}$", "$\\frac{3}{25}$"],
    expected: ["$\\frac{3}{5}$"],
    comparator: "mcq_exact",
    hint: "Même dénominateur : on additionne les numérateurs.",
    explanation:
      "Définition : pour additionner des fractions de même dénominateur, on additionne les numérateurs.\n\n" +
      "Méthode : on garde le dénominateur 5.\n\n" +
      "Calcul : $\\frac{2}{5} + \\frac{1}{5} = \\frac{3}{5}$.\n\n" +
      "Conclusion : le résultat est $\\frac{3}{5}$.",
    tags: ["fraction_nombre", "addition", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer $\\frac{1}{3} + \\frac{1}{3}$.",
    format: "qcm",
    choices: ["$\\frac{2}{3}$", "$\\frac{2}{6}$", "$\\frac{1}{3}$", "$\\frac{1}{6}$"],
    expected: ["$\\frac{2}{3}$"],
    comparator: "mcq_exact",
    hint: "On additionne les numérateurs et on garde le dénominateur.",
    explanation:
      "Définition : pour additionner des fractions de même dénominateur, on additionne les numérateurs.\n\n" +
      "Méthode : on garde le dénominateur 3.\n\n" +
      "Calcul : $\\frac{1}{3} + \\frac{1}{3} = \\frac{2}{3}$.\n\n" +
      "Conclusion : le résultat est $\\frac{2}{3}$.",
    tags: ["fraction_nombre", "addition", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_additionner_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    hint: "Un dénominateur est multiple de l’autre : mets-les au même dénominateur.",
    tags: ["fraction_nombre", "addition", "denominateur_multiple", "template"],
    generate: () => genSommeQcm(3),
  },
  {
    kind: "template",
    id: "fraction_additionner_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    hint: "Même dénominateur : additionne les numérateurs.",
    tags: ["fraction_nombre", "addition", "qcm", "template"],
    generate: () => genSommeQcm(2),
  },
  {
    kind: "template",
    id: "fraction_additionner_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche un dénominateur commun aux deux fractions.",
    tags: ["fraction_nombre", "addition", "soustraction", "template"],
    generate: () => genSommeQcm(4),
  },

  // ---------- FRACTION_MULTIPLIER ----------
  {
    kind: "fixed",
    id: "fraction_multiplier_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer $\\frac{1}{2} \\times \\frac{1}{3}$.",
    format: "qcm",
    choices: ["$\\frac{1}{6}$", "$\\frac{2}{3}$", "$\\frac{1}{5}$", "$\\frac{2}{6}$"],
    expected: ["$\\frac{1}{6}$"],
    comparator: "mcq_exact",
    hint: "On multiplie les numérateurs entre eux et les dénominateurs entre eux.",
    explanation:
      "Définition : pour multiplier deux fractions, on multiplie les numérateurs et les dénominateurs.\n\n" +
      "Méthode : $\\frac{1\\times1}{2\\times3}$.\n\n" +
      "Calcul : $\\frac{1}{2} \\times \\frac{1}{3} = \\frac{1}{6}$.\n\n" +
      "Conclusion : le résultat est $\\frac{1}{6}$.",
    tags: ["fraction_nombre", "produit", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer $\\frac{2}{5} \\times 3$.",
    format: "qcm",
    choices: ["$\\frac{6}{5}$", "$\\frac{2}{15}$", "$\\frac{6}{15}$", "$\\frac{5}{6}$"],
    expected: ["$\\frac{6}{5}$"],
    comparator: "mcq_exact",
    hint: "Un entier multiplie le numérateur.",
    explanation:
      "Définition : multiplier une fraction par un entier multiplie le numérateur.\n\n" +
      "Méthode : $3 = \\frac{3}{1}$, on multiplie haut et bas.\n\n" +
      "Calcul : $\\frac{2}{5} \\times 3 = \\frac{6}{5}$.\n\n" +
      "Conclusion : le résultat est $\\frac{6}{5}$.",
    tags: ["fraction_nombre", "produit", "entier", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    text: "Calculer puis simplifier $\\frac{2}{3} \\times \\frac{3}{4}$.",
    format: "qcm",
    choices: ["$\\frac{1}{2}$", "$\\frac{6}{12}$", "$\\frac{5}{7}$", "$\\frac{2}{4}$"],
    expected: ["$\\frac{1}{2}$"],
    comparator: "mcq_exact",
    hint: "Multiplie puis simplifie le résultat.",
    explanation:
      "Définition : on multiplie les numérateurs et les dénominateurs, puis on simplifie.\n\n" +
      "Méthode : $\\frac{2\\times3}{3\\times4} = \\frac{6}{12}$.\n\n" +
      "Calcul : $\\frac{6}{12} = \\frac{1}{2}$.\n\n" +
      "Conclusion : le résultat simplifié est $\\frac{1}{2}$.",
    tags: ["fraction_nombre", "produit", "simplifier", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_multiplier_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie haut avec haut, bas avec bas, puis simplifie.",
    tags: ["fraction_nombre", "produit", "qcm", "template"],
    // ⚠️ Les pièges se recoupaient quand les tirages tombaient mal ; `qcmQ`
    // écarte aussi ceux qui ont la même VALEUR que la bonne réponse
    // (l'ancien piège « non simplifié » était une deuxième bonne réponse).
    generate: () => genProduitQcm(),
  },
  {
    kind: "template",
    id: "fraction_multiplier_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    hint: "Un entier multiplie seulement le numérateur.",
    tags: ["fraction_nombre", "produit", "entier", "qcm", "template"],
    generate: () => genFoisEntier(),
  },
  {
    kind: "template",
    id: "fraction_multiplier_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    hint: "« Prendre la fraction d’un nombre », c’est multiplier.",
    tags: ["fraction_nombre", "produit", "fraction_de", "template"],
    generate: () => genFoisEntierJuste(),
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    text: "Explique la règle pour multiplier deux fractions.",
    format: "open",
    expected: ["numérateurs", "dénominateurs", "multiplie"],
    comparator: "contains_keyword",
    hint: "Que fait-on des numérateurs ? des dénominateurs ?",
    explanation:
      "Définition : multiplier deux fractions donne une nouvelle fraction.\n\n" +
      "Méthode : on multiplie les numérateurs entre eux et les dénominateurs entre eux.\n\n" +
      "Calcul : $\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a\\times c}{b\\times d}$.\n\n" +
      "Conclusion : on multiplie les numérateurs entre eux et les dénominateurs entre eux, puis on simplifie.",
    tags: ["fraction_nombre", "produit", "open"],
  },

  // ---------- FRACTION_INVERSE ----------
  {
    kind: "fixed",
    id: "fraction_inverse_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_inverse",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l’inverse de $\\frac{2}{7}$ ?",
    format: "qcm",
    choices: ["$\\frac{7}{2}$", "$-\\frac{2}{7}$", "$\\frac{2}{7}$", "$\\frac{7}{7}$"],
    expected: ["$\\frac{7}{2}$"],
    comparator: "mcq_exact",
    hint: "On échange numérateur et dénominateur.",
    explanation:
      "Définition : l’inverse d’une fraction s’obtient en échangeant numérateur et dénominateur.\n\n" +
      "Méthode : on échange 2 et 7.\n\n" +
      "Calcul : l’inverse de $\\frac{2}{7}$ est $\\frac{7}{2}$ (car $\\frac{2}{7} \\times \\frac{7}{2} = 1$).\n\n" +
      "Conclusion : l’inverse est $\\frac{7}{2}$.",
    tags: ["fraction_nombre", "inverse", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_inverse_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’inverse de l’entier 5 ?",
    format: "qcm",
    choices: ["$\\frac{1}{5}$", "$-5$", "$5$", "$\\frac{5}{1}$"],
    expected: ["$\\frac{1}{5}$"],
    comparator: "mcq_exact",
    hint: "$5 = \\frac{5}{1}$.",
    explanation:
      "Définition : l’inverse s’obtient en échangeant numérateur et dénominateur.\n\n" +
      "Méthode : on écrit $5 = \\frac{5}{1}$ puis on échange.\n\n" +
      "Calcul : l’inverse de $\\frac{5}{1}$ est $\\frac{1}{5}$.\n\n" +
      "Conclusion : l’inverse de 5 est $\\frac{1}{5}$.",
    tags: ["fraction_nombre", "inverse", "entier", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_inverse_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut le produit d’une fraction par son inverse ?",
    format: "qcm",
    choices: ["1", "0", "la fraction de départ", "l’opposé"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "C’est la propriété qui définit l’inverse.",
    explanation:
      "Définition : deux nombres sont inverses si leur produit vaut 1.\n\n" +
      "Méthode : on multiplie une fraction par son inverse.\n\n" +
      "Calcul : $\\frac{a}{b} \\times \\frac{b}{a} = 1$.\n\n" +
      "Conclusion : le produit vaut 1.",
    tags: ["fraction_nombre", "inverse", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_inverse_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_inverse",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est l’inverse de 1 ?",
    format: "qcm",
    choices: ["1", "0", "$\\frac{1}{0}$", "$-1$"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "Quel nombre multiplié par 1 donne 1 ?",
    explanation:
      "Définition : l’inverse de x est le nombre qui, multiplié par x, donne 1.\n\n" +
      "Méthode : on cherche y tel que $1 \\times y = 1$.\n\n" +
      "Calcul : $1 \\times 1 = 1$.\n\n" +
      "Conclusion : l’inverse de 1 est 1.",
    tags: ["fraction_nombre", "inverse", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_inverse_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    hint: "Échange le numérateur et le dénominateur.",
    tags: ["fraction_nombre", "inverse", "qcm", "template"],
    // ⚠️ Jamais une fraction égale à 1 : son inverse s'écrit comme elle
    // (`tirerFraction` donne toujours n < d, donc n ≠ d).
    generate: () => genInverseQcm(["frac", "-frac", "decimal"]),
  },
  {
    kind: "template",
    id: "fraction_inverse_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    hint: "L’inverse d’un entier n est 1/n.",
    tags: ["fraction_nombre", "inverse", "entier", "qcm", "template"],
    generate: () => genInverseQcm(["entier", "-entier", "unitaire"]),
  },
  {
    kind: "fixed",
    id: "fraction_inverse_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment trouver l’inverse d’une fraction et donne un exemple.",
    format: "open",
    expected: ["échange", "numérateur", "dénominateur"],
    comparator: "contains_keyword",
    hint: "Pense à ce qu’on échange.",
    explanation:
      "Définition : l’inverse d’une fraction s’obtient en échangeant numérateur et dénominateur.\n\n" +
      "Méthode : on met le numérateur en bas et le dénominateur en haut.\n\n" +
      "Calcul : par exemple l’inverse de $\\frac{3}{4}$ est $\\frac{4}{3}$.\n\n" +
      "Conclusion : on échange numérateur et dénominateur.",
    tags: ["fraction_nombre", "inverse", "open"],
  },

  // ---------- FRACTION_DIVISER ----------
  {
    kind: "fixed",
    id: "fraction_diviser_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_diviser",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer $\\frac{1}{2} \\div \\frac{1}{4}$.",
    format: "qcm",
    choices: ["$2$", "$\\frac{1}{8}$", "$\\frac{1}{2}$", "$\\frac{4}{2}$"],
    expected: ["$2$"],
    comparator: "mcq_exact",
    hint: "Diviser par $\\frac{1}{4}$, c’est multiplier par 4.",
    explanation:
      "Définition : diviser par une fraction revient à multiplier par son inverse.\n\n" +
      "Méthode : $\\frac{1}{2} \\div \\frac{1}{4} = \\frac{1}{2} \\times \\frac{4}{1}$.\n\n" +
      "Calcul : $= \\frac{4}{2} = 2$.\n\n" +
      "Conclusion : le résultat est 2.",
    tags: ["fraction_nombre", "division", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_diviser_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_diviser",
    difficulty: 3,
    theme: "neutral",
    text: "Calculer $\\frac{2}{3} \\div \\frac{5}{4}$.",
    format: "qcm",
    choices: ["$\\frac{8}{15}$", "$\\frac{10}{12}$", "$\\frac{2}{3}$", "$\\frac{5}{6}$"],
    expected: ["$\\frac{8}{15}$"],
    comparator: "mcq_exact",
    hint: "Multiplie par l’inverse de $\\frac{5}{4}$.",
    explanation:
      "Définition : diviser par une fraction revient à multiplier par son inverse.\n\n" +
      "Méthode : $\\frac{2}{3} \\div \\frac{5}{4} = \\frac{2}{3} \\times \\frac{4}{5}$.\n\n" +
      "Calcul : $= \\frac{8}{15}$.\n\n" +
      "Conclusion : le résultat est $\\frac{8}{15}$.",
    tags: ["fraction_nombre", "division", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_diviser_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_diviser",
    difficulty: 3,
    theme: "neutral",
    text: "Diviser un nombre par $\\frac{1}{2}$ revient à…",
    format: "qcm",
    choices: ["le multiplier par 2", "le diviser par 2", "le multiplier par $\\frac{1}{2}$", "lui enlever 2"],
    expected: ["le multiplier par 2"],
    comparator: "mcq_exact",
    hint: "L’inverse de $\\frac{1}{2}$ est 2.",
    explanation:
      "Définition : diviser par une fraction revient à multiplier par son inverse.\n\n" +
      "Méthode : l’inverse de $\\frac{1}{2}$ est 2.\n\n" +
      "Calcul : diviser par $\\frac{1}{2}$ = multiplier par 2.\n\n" +
      "Conclusion : on multiplie par 2.",
    tags: ["fraction_nombre", "division", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_diviser_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_diviser",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie par l’inverse de la deuxième fraction.",
    tags: ["fraction_nombre", "division", "qcm", "template"],
    // ⚠️ Des tirages abîmaient ce QCM (a/b = c/d : le piège inversé VALAIT la
    // bonne réponse). `tirerQuotient` écarte a/b = c/d, et `qcmQ` écarte tout
    // piège de même valeur que la bonne réponse.
    generate: () => genQuotientQcm(false),
  },
  {
    kind: "template",
    id: "fraction_diviser_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_diviser",
    difficulty: 4,
    theme: "neutral",
    hint: "Diviser par un entier n, c’est multiplier le dénominateur par n.",
    tags: ["fraction_nombre", "division", "entier", "qcm", "template"],
    generate: () => genQuotientQcm(true),
  },
  {
    kind: "template",
    id: "fraction_diviser_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_diviser",
    difficulty: 3,
    theme: "neutral",
    hint: "Par quelle fraction faut-il multiplier pour effectuer la division ?",
    tags: ["fraction_nombre", "division", "inverse", "qcm", "template"],
    generate: () => genDiviserRevientA(),
  },

  // ---------- FRACTION_QUANTITE ----------
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer $\\frac{1}{2}$ de 30.",
    format: "qcm",
    choices: ["15", "10", "20", "60"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "On divise 30 par 2.",
    explanation:
      "Définition : prendre une fraction d’un nombre, c’est multiplier.\n\n" +
      "Méthode : $\\frac{1}{2}$ de 30 = $30 \\div 2$.\n\n" +
      "Calcul : $30 \\div 2 = 15$.\n\n" +
      "Conclusion : $\\frac{1}{2}$ de 30 vaut 15.",
    tags: ["fraction_nombre", "quantite", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer $\\frac{1}{4}$ de 20.",
    format: "qcm",
    choices: ["5", "4", "16", "80"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "On divise 20 par 4.",
    explanation:
      "Définition : prendre une fraction d’un nombre, c’est multiplier.\n\n" +
      "Méthode : $\\frac{1}{4}$ de 20 = $20 \\div 4$.\n\n" +
      "Calcul : $20 \\div 4 = 5$.\n\n" +
      "Conclusion : $\\frac{1}{4}$ de 20 vaut 5.",
    tags: ["fraction_nombre", "quantite", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise par le dénominateur, multiplie par le numérateur.",
    tags: ["fraction_nombre", "quantite", "template"],
    generate: () => genFractionDe(),
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    hint: "Prends la fraction de la quantité totale.",
    tags: ["fraction_nombre", "quantite", "contexte", "template"],
    generate: () => genQuantiteMixte(),
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    hint: "Divise par le dénominateur, puis multiplie par le numérateur.",
    tags: ["fraction_nombre", "quantite", "contexte", "template"],
    generate: () => genQuantiteMixte(),
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 4,
    theme: "neutral",
    hint: "Si une part vaut le résultat, remonte au total.",
    tags: ["fraction_nombre", "quantite", "inverse", "template"],
    generate: () => genQuantiteInverse(),
  },
  {
    kind: "fixed",
    id: "fraction_quantite_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment calculer $\\frac{3}{5}$ de 40.",
    format: "open",
    expected: ["divise", "5", "24"],
    comparator: "contains_keyword",
    hint: "Divise d’abord par le dénominateur.",
    explanation:
      "Définition : prendre une fraction d’un nombre, c’est multiplier.\n\n" +
      "Méthode : on divise 40 par 5, puis on multiplie par 3.\n\n" +
      "Calcul : $40 \\div 5 = 8$, puis $8 \\times 3 = 24$.\n\n" +
      "Conclusion : $\\frac{3}{5}$ de 40 vaut 24.",
    tags: ["fraction_nombre", "quantite", "open"],
  },

  // ---------- FRACTION_OPPOSE ----------
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_oppose",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l’opposé de $-\\frac{2}{5}$ ?",
    format: "qcm",
    choices: ["$\\frac{2}{5}$", "$-\\frac{2}{5}$", "$\\frac{5}{2}$", "$-\\frac{5}{2}$"],
    expected: ["$\\frac{2}{5}$"],
    comparator: "mcq_exact",
    hint: "L’opposé change le signe.",
    explanation:
      "Définition : l’opposé d’un nombre est son symétrique par rapport à 0 ; il change de signe.\n\n" +
      "Méthode : on change le signe de $-\\frac{2}{5}$.\n\n" +
      "Calcul : l’opposé de $-\\frac{2}{5}$ est $\\frac{2}{5}$.\n\n" +
      "Conclusion : l’opposé est $\\frac{2}{5}$.",
    tags: ["fraction_nombre", "oppose", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’opposé de $\\frac{4}{9}$ ?",
    format: "qcm",
    choices: ["$-\\frac{4}{9}$", "$\\frac{9}{4}$", "$\\frac{4}{9}$", "$-\\frac{9}{4}$"],
    expected: ["$-\\frac{4}{9}$"],
    comparator: "mcq_exact",
    hint: "On change seulement le signe, pas la valeur.",
    explanation:
      "Définition : l’opposé change le signe d’un nombre.\n\n" +
      "Méthode : on met un signe « − » devant $\\frac{4}{9}$.\n\n" +
      "Calcul : l’opposé de $\\frac{4}{9}$ est $-\\frac{4}{9}$.\n\n" +
      "Conclusion : l’opposé est $-\\frac{4}{9}$.",
    tags: ["fraction_nombre", "oppose", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut la somme d’une fraction et de son opposé ?",
    format: "qcm",
    choices: ["0", "1", "2 fois la fraction", "l’inverse"],
    expected: ["0"],
    comparator: "mcq_exact",
    hint: "Une fraction plus son opposé s’annulent.",
    explanation:
      "Définition : deux nombres opposés ont une somme nulle.\n\n" +
      "Méthode : on ajoute une fraction et son opposé.\n\n" +
      "Calcul : $\\frac{a}{b} + \\left(-\\frac{a}{b}\\right) = 0$.\n\n" +
      "Conclusion : la somme vaut 0.",
    tags: ["fraction_nombre", "oppose", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle différence y a-t-il entre l’opposé et l’inverse de $\\frac{3}{4}$ ?",
    format: "qcm",
    choices: [
      "l’opposé est $-\\frac{3}{4}$, l’inverse est $\\frac{4}{3}$",
      "l’opposé est $\\frac{4}{3}$, l’inverse est $-\\frac{3}{4}$",
      "l’opposé est $-\\frac{3}{4}$, l’inverse est $-\\frac{4}{3}$",
      "l’opposé est $\\frac{4}{3}$, l’inverse est $\\frac{3}{4}$",
    ],
    expected: ["l’opposé est $-\\frac{3}{4}$, l’inverse est $\\frac{4}{3}$"],
    comparator: "mcq_exact",
    hint: "L’opposé change le signe, l’inverse échange haut et bas.",
    explanation:
      "Définition : l’opposé change le signe ; l’inverse échange numérateur et dénominateur.\n\n" +
      "Méthode : on applique chaque transformation à $\\frac{3}{4}$.\n\n" +
      "Calcul : opposé $= -\\frac{3}{4}$, inverse $= \\frac{4}{3}$.\n\n" +
      "Conclusion : ce sont deux notions différentes.",
    tags: ["fraction_nombre", "oppose", "inverse", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_oppose_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    hint: "On change uniquement le signe.",
    tags: ["fraction_nombre", "oppose", "qcm", "template"],
    generate: () => genOpposeQcm(["+", "den"]),
  },
  {
    kind: "template",
    id: "fraction_oppose_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    hint: "L’opposé d’un nombre négatif est positif.",
    tags: ["fraction_nombre", "oppose", "negatif", "qcm", "template"],
    generate: () => genOpposeQcm(["-", "num"]),
  },
  {
    kind: "fixed",
    id: "fraction_oppose_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Explique ce qu’est l’opposé d’une fraction et pourquoi leur somme est nulle.",
    format: "open",
    expected: ["signe", "0", "somme"],
    comparator: "contains_keyword",
    hint: "Pense à ce que vaut un nombre plus son opposé.",
    explanation:
      "Définition : l’opposé d’une fraction est cette fraction avec le signe changé.\n\n" +
      "Méthode : on ajoute la fraction et son opposé.\n\n" +
      "Calcul : $\\frac{a}{b} + \\left(-\\frac{a}{b}\\right) = 0$.\n\n" +
      "Conclusion : leur somme est nulle, c’est pourquoi ce sont des opposés.",
    tags: ["fraction_nombre", "oppose", "open"],
  },

  // ---------- FRACTION_DEFIS ----------
  {
    kind: "fixed",
    id: "fraction_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Léo mange $\\frac{2}{3}$ d’un gâteau. Quelle fraction du gâteau reste-t-il ?",
    format: "qcm",
    choices: ["$\\frac{1}{3}$", "$\\frac{2}{3}$", "$\\frac{1}{2}$", "$\\frac{3}{2}$"],
    expected: ["$\\frac{1}{3}$"],
    comparator: "mcq_exact",
    hint: "Le gâteau entier vaut $\\frac{3}{3}$.",
    explanation:
      "Définition : le gâteau entier vaut 1, soit $\\frac{3}{3}$.\n\n" +
      "Méthode : on soustrait la part mangée du total.\n\n" +
      "Calcul : $\\frac{3}{3} - \\frac{2}{3} = \\frac{1}{3}$.\n\n" +
      "Conclusion : il reste $\\frac{1}{3}$ du gâteau.",
    tags: ["fraction_nombre", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Lequel est le plus grand : $\\frac{2}{3}$ ou le décimal $0,7$ ?",
    format: "qcm",
    choices: ["$0,7$", "$\\frac{2}{3}$", "ils sont égaux"],
    expected: ["$0,7$"],
    comparator: "mcq_exact",
    hint: "$\\frac{2}{3} \\approx 0,66$.",
    explanation:
      "Définition : pour comparer, on met sous la même forme.\n\n" +
      "Méthode : on transforme $\\frac{2}{3}$ en décimal approché.\n\n" +
      "Calcul : $\\frac{2}{3} \\approx 0{,}67 < 0{,}7$.\n\n" +
      "Conclusion : $0,7$ est le plus grand.",
    tags: ["fraction_nombre", "defi", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Calculer $\\frac{1}{2}$ de $\\frac{2}{3}$.",
    format: "qcm",
    choices: ["$\\frac{1}{3}$", "$\\frac{2}{6}$", "$\\frac{3}{5}$", "$\\frac{2}{3}$"],
    expected: ["$\\frac{1}{3}$"],
    comparator: "mcq_exact",
    hint: "« de » signifie une multiplication.",
    explanation:
      "Définition : « la fraction d’une fraction » se calcule par une multiplication.\n\n" +
      "Méthode : $\\frac{1}{2} \\times \\frac{2}{3}$.\n\n" +
      "Calcul : $= \\frac{2}{6} = \\frac{1}{3}$.\n\n" +
      "Conclusion : le résultat est $\\frac{1}{3}$.",
    tags: ["fraction_nombre", "defi", "produit", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Rappelle-toi la règle de chaque opération : l'addition demande un dénominateur commun, le produit non, le quotient passe par l'inverse.",
    tags: ["fraction_nombre", "defi", "erreur", "template"],
    // Des méthodes justes ET fausses : la réponse n'est plus toujours « non ».
    generate: () => genDefiMethode(),
  },
  {
    kind: "template",
    id: "fraction_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Effectue d’abord la fraction de la quantité, puis ce qui reste.",
    tags: ["fraction_nombre", "defi", "contexte", "template"],
    generate: () => genDefiResteQuantite(),
  },
  {
    kind: "fixed",
    id: "fraction_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi diviser par une fraction plus petite que 1 donne un résultat plus grand que le nombre de départ.",
    format: "open",
    expected: ["inverse", "multiplier", "plus grand"],
    comparator: "contains_keyword",
    hint: "Diviser par une fraction, c’est multiplier par son inverse (qui est plus grand que 1).",
    explanation:
      "Définition : diviser par une fraction revient à multiplier par son inverse.\n\n" +
      "Méthode : si la fraction est plus petite que 1, son inverse est plus grand que 1.\n\n" +
      "Calcul : par exemple $6 \\div \\frac{1}{2} = 6 \\times 2 = 12$.\n\n" +
      "Conclusion : multiplier par un nombre plus grand que 1 donne un résultat plus grand.",
    tags: ["fraction_nombre", "defi", "open"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_open_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi on peut toujours écrire un nombre décimal comme une fraction, donc comme un rationnel.",
    format: "open",
    expected: ["décimal", "fraction", "10"],
    comparator: "contains_keyword",
    hint: "Pense aux dixièmes, centièmes…",
    explanation:
      "Définition : un nombre rationnel s’écrit comme quotient de deux entiers.\n\n" +
      "Méthode : un décimal s’écrit sur 10, 100, 1000… selon le nombre de chiffres après la virgule.\n\n" +
      "Calcul : par exemple $0{,}25 = \\frac{25}{100} = \\frac{1}{4}$.\n\n" +
      "Conclusion : tout décimal est une fraction, donc un nombre rationnel.",
    tags: ["fraction_nombre", "defi", "rationnel", "open"],
  },

  /* =========================================================
     30/09/2026 — LES ÉTOILES SANS GABARIT. Le coach sert les items de
     l'étoile EXACTE de l'élève ; à ★1 (simplifier, décimal, rationnel) et à
     ★4 (défi), il n'y avait que des items figés : vus une fois, ils étaient
     resservis en boucle (18 répétitions sur une série de 20).
  ========================================================= */
  {
    kind: "template",
    id: "fraction_simplifier_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 1,
    theme: "neutral",
    hint: "Divise le numérateur et le dénominateur par un même nombre : 2, 3 ou 5.",
    tags: ["fraction_nombre", "simplifier", "qcm", "template"],
    generate: () => genSimplifierQcm(1),
  },
  {
    kind: "template",
    id: "fraction_decimal_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 1,
    theme: "neutral",
    hint: "Une fraction est un quotient : divise le numérateur par le dénominateur.",
    tags: ["fraction_nombre", "decimal", "qcm", "template"],
    generate: () => genVersDecimalQcm(1),
  },
  {
    kind: "template",
    id: "fraction_rationnel_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 1,
    theme: "neutral",
    hint: "Un entier se met sur 1 ; un décimal sur 10, 100… selon le nombre de chiffres après la virgule.",
    tags: ["fraction_nombre", "rationnel", "qcm", "template"],
    generate: () => genEcritureFractionnaire(1),
  },
  {
    kind: "template",
    id: "fraction_defi_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Le tout vaut 1 : ce qui reste, c'est 1 moins ce qu'on a pris. « Une fraction de », c'est une multiplication.",
    tags: ["fraction_nombre", "defi", "contexte", "qcm", "template"],
    generate: () => genDefiReste(),
  },
];
