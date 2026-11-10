// lib/tutor-v4/questionBank/cp/maths/probleme.bank.ts
//
// La résolution de problèmes au CP, écrite à la main. C'est le cœur du
// programme : « Les élèves doivent traiter AU MOINS DIX PROBLÈMES PAR
// SEMAINE », et les deux tiers du temps de mathématiques vont aux nombres, au
// calcul et aux problèmes.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — résoudre des problèmes additifs en une étape du type PARTIES-TOUT. Les
//     problèmes de transformation — ajout, retrait — se traitent comme des
//     problèmes de parties-tout ;
//   — résoudre des problèmes additifs EN DEUX ÉTAPES, champ numérique
//     inférieur ou égal à 30 ;
//   — résoudre des problèmes MULTIPLICATIFS en une étape, champ numérique
//     inférieur ou égal à 30 : chercher la valeur d'un tout fait de parts
//     égales, chercher le nombre de parts, ou chercher la valeur d'une part ;
//   — « Les données numériques des problèmes proposés aux élèves sont dans le
//     champ numérique maitrisé au CP, à savoir les nombres entiers jusqu'à
//     cent. »
//   — le BO décrit quatre phases : comprendre, modéliser, calculer, répondre.
//     Et il ajoute la RÉGULATION : se demander si le résultat trouvé est
//     possible.
//
// LE PIÈGE DE LA NOTION, et c'est le BO qui demande de le tendre :
// « L'enseignant veille à ce que les élèves n'automatisent pas l'opération à
// effectuer à partir de termes de l'énoncé, en proposant régulièrement des
// problèmes contenant des termes qui n'induisent pas l'opération attendue, par
// exemple des énoncés comportant le mot "plus" alors que l'opération à
// effectuer est une soustraction. » L'élève qui a appris « plus → addition,
// reste → soustraction » se fait prendre. Il faut lire l'histoire, pas les
// mots-clés.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas — même pour « explique ».
//
// ⭐ 10/11/2026 — RÉÉCRIT EN GÉNÉRATEURS. Situations × tournures × prénoms de
// la troupe (Nina, Téo, Zoé, Ravi, Pic) et d'ailleurs ; les réponses NOMBRE
// sont des QCM aux leurres d'enfant (`court`), jamais des « short » que
// `applyMathsKeyboardFree` changerait en QCM aux leurres absurdes. Les dessins :
// schéma en barre pour les parts et le tout, objets pour les groupes égaux,
// monnaie pour les euros, un enfant de la troupe pour poser la question.
// Sans retenue à ★3 ; ids, micros et étoiles d'origine conservés.

import type {
  BaseDixCanvasData,
  CanvasFigure,
  MonnaieCanvasData,
  MonnaieElement,
  ObjetId,
  ObjetsCanvasData,
  PersonnageCanvasData,
  PersonnageId,
  SchemaBarreCanvasData,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return melangeEnPlace([...items]);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/** QCM de nombres : les pièges d'abord, complétés par ±1, ±2, ±10 (jamais négatifs ni > 100). */
function choixNombres(bon: number, pieges: readonly number[], unite = "") {
  const f = (n: number) => (unite ? `${n} ${unite}` : String(n));
  const vus = new Set<number>([bon]);
  const retenus: number[] = [];
  for (const n of [...shuffle(pieges), bon + 1, bon - 1, bon + 10, bon - 10, bon + 2, bon - 2]) {
    if (retenus.length === 3) break;
    if (n < 0 || n > 100 || vus.has(n)) continue;
    vus.add(n);
    retenus.push(n);
  }
  return shuffle([bon, ...retenus]).map(f);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

type Q = TutorGeneratedQuestionV4;
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « de pommes », « d'oiseaux ». */
const de = (mot: string) => (/^[aeiouyàâéèêëîïôœh]/i.test(mot) ? `d'${mot}` : `de ${mot}`);

/**
 * Une réponse NOMBRE, servie en QCM avec des leurres d'enfant : compter le
 * point de départ (±1), se tromper de dizaine (±10), ou le leurre propre à la
 * micro (`pieges`). ⚠️ Pas de « short » : `applyMathsKeyboardFree` en ferait
 * un QCM aux leurres ×2 et ×3 — « 126 » pour 38 + 4, hors du champ du CP.
 */
function court(text: string, expected: number, explanation: string, canvas?: CanvasFigure, pieges: readonly number[] = []): Q {
  return qcm(
    text,
    choixNombres(expected, [...pieges, expected - 1, expected + 1, expected + 10, expected - 10].slice(0, Math.max(4, pieges.length))),
    String(expected),
    explanation,
    canvas,
  );
}

function qcm(text: string, choices: string[], bonne: string, explanation: string, canvas?: CanvasFigure): Q {
  return { text, format: "qcm", choices, expected: [bonne], comparator: "mcq_exact", explanation, ...(canvas ? { canvas } : {}) };
}

/* =========================================================
   LES ENFANTS : la troupe du site (Nina, Téo, Zoé, Ravi) et
   des prénoms variés. `perso` : l'enfant peut être dessiné.
========================================================= */
type Enfant = { nom: string; il: "il" | "elle"; perso?: PersonnageId };
const ENFANTS: readonly Enfant[] = [
  { nom: "Nina", il: "elle", perso: "nina" },
  { nom: "Téo", il: "il", perso: "teo" },
  { nom: "Zoé", il: "elle", perso: "zoe" },
  { nom: "Ravi", il: "il", perso: "ravi" },
  { nom: "Lou", il: "elle" },
  { nom: "Malo", il: "il" },
  { nom: "Inès", il: "elle" },
  { nom: "Sacha", il: "il" },
  { nom: "Amir", il: "il" },
  { nom: "Jade", il: "elle" },
  { nom: "Naïa", il: "elle" },
  { nom: "Tom", il: "il" },
  { nom: "Lina", il: "elle" },
  { nom: "Yanis", il: "il" },
  { nom: "Rose", il: "elle" },
  { nom: "Noé", il: "il" },
];
const TROUPE = ENFANTS.filter((e) => e.perso);
const enfant = () => randomChoice(ENFANTS);
function deuxEnfants(): [Enfant, Enfant] {
  const a = enfant();
  let b = enfant();
  while (b.nom === a.nom) b = enfant();
  return [a, b];
}
/** « de Téo », « d'Inès ». */
const deN = (e: Enfant) => (/^[AEIOUÉÈÎ]/.test(e.nom) ? `d'${e.nom}` : `de ${e.nom}`);
/** « que Téo », « qu'Inès ». */
const queN = (e: Enfant) => (/^[AEIOUÉÈÎ]/.test(e.nom) ? `qu'${e.nom}` : `que ${e.nom}`);
const ils = (a: Enfant, b: Enfant) => (a.il === "elle" && b.il === "elle" ? "elles" : "ils");

/* =========================================================
   LES MONDES : un lieu, des choses à compter, ce qui arrive,
   ce qui part. `dessin` : la chose existe dans `objets`.
========================================================= */
type Monde = {
  pl: string;
  sg: string;
  lieu: string;
  dessin?: ObjetId;
  arrive: (n: number) => string;
  part: (n: number) => string;
};
const MONDES: readonly Monde[] = [
  { pl: "oiseaux", sg: "oiseau", lieu: "sur la branche", dessin: "oiseau", arrive: (n) => `${n} autres oiseaux se posent.`, part: (n) => `${n} oiseaux s'envolent.` },
  { pl: "poissons", sg: "poisson", lieu: "dans l'aquarium", dessin: "poisson", arrive: (n) => `On ajoute ${n} poissons.`, part: (n) => `${n} poissons vont dans l'autre bassin.` },
  { pl: "pommes", sg: "pomme", lieu: "dans le panier", dessin: "pomme", arrive: (n) => `On ajoute ${n} pommes.`, part: (n) => `On prend ${n} pommes pour la tarte.` },
  { pl: "bananes", sg: "banane", lieu: "sur la table du goûter", dessin: "banane", arrive: (n) => `On pose ${n} autres bananes.`, part: (n) => `Les enfants mangent ${n} bananes.` },
  { pl: "ballons", sg: "ballon", lieu: "à la fête d'anniversaire", arrive: (n) => `On gonfle ${n} autres ballons.`, part: (n) => `${n} ballons s'envolent dans le ciel.` },
  { pl: "papillons", sg: "papillon", lieu: "dans le jardin", dessin: "papillon", arrive: (n) => `${n} autres papillons arrivent.`, part: (n) => `${n} papillons s'envolent.` },
  { pl: "fleurs", sg: "fleur", lieu: "dans le vase", dessin: "fleur", arrive: (n) => `Le jardinier ajoute ${n} fleurs.`, part: (n) => `On enlève ${n} fleurs fanées.` },
  { pl: "livres", sg: "livre", lieu: "sur l'étagère de la classe", dessin: "livre", arrive: (n) => `La maîtresse pose ${n} autres livres.`, part: (n) => `Les élèves empruntent ${n} livres.` },
  { pl: "petites voitures", sg: "petite voiture", lieu: "sur le tapis de jeu", dessin: "voiture", arrive: (n) => `Malo apporte ${n} autres petites voitures.`, part: (n) => `${n} petites voitures roulent sous le lit.` },
  { pl: "bateaux", sg: "bateau", lieu: "dans le port", dessin: "bateau", arrive: (n) => `${n} autres bateaux arrivent.`, part: (n) => `${n} bateaux partent en mer.` },
  { pl: "étoiles", sg: "étoile", lieu: "dans le ciel", dessin: "etoile", arrive: (n) => `${n} autres étoiles s'allument.`, part: (n) => `Un nuage cache ${n} étoiles.` },
  { pl: "chats", sg: "chat", lieu: "dans la cour de la ferme", dessin: "chat", arrive: (n) => `${n} autres chats arrivent.`, part: (n) => `${n} chats vont dormir dans la grange.` },
  { pl: "chapeaux", sg: "chapeau", lieu: "dans le coffre à déguisements", dessin: "chapeau", arrive: (n) => `On ajoute ${n} chapeaux.`, part: (n) => `Les clowns prennent ${n} chapeaux.` },
  { pl: "graines", sg: "graine", lieu: "dans la mangeoire de Pic", arrive: (n) => `On ajoute ${n} graines.`, part: (n) => `Pic le paille-en-queue picore ${n} graines.` },
  { pl: "dinosaures", sg: "dinosaure", lieu: "dans la boîte à jouets", arrive: (n) => `Ravi range ${n} autres dinosaures.`, part: (n) => `Ravi prend ${n} dinosaures pour jouer.` },
  { pl: "croissants", sg: "croissant", lieu: "sur le plateau de la boulangère", arrive: (n) => `La boulangère sort ${n} croissants du four.`, part: (n) => `La boulangère vend ${n} croissants.` },
  { pl: "enfants", sg: "enfant", lieu: "dans la piscine", arrive: (n) => `${n} autres enfants sautent dans l'eau.`, part: (n) => `${n} enfants sortent de l'eau.` },
  { pl: "voyageurs", sg: "voyageur", lieu: "dans le petit train", arrive: (n) => `${n} voyageurs montent.`, part: (n) => `${n} voyageurs descendent.` },
  { pl: "moutons", sg: "mouton", lieu: "dans le pré", arrive: (n) => `Le berger fait entrer ${n} moutons.`, part: (n) => `${n} moutons rentrent à la bergerie.` },
  { pl: "coquillages", sg: "coquillage", lieu: "dans le seau", arrive: (n) => `On ramasse ${n} autres coquillages.`, part: (n) => `On rend ${n} coquillages à la mer.` },
  { pl: "bougies", sg: "bougie", lieu: "sur le gâteau", arrive: (n) => `On plante ${n} autres bougies.`, part: (n) => `On enlève ${n} bougies.` },
  { pl: "singes", sg: "singe", lieu: "dans l'arbre du zoo", arrive: (n) => `${n} autres singes grimpent.`, part: (n) => `${n} singes descendent manger.` },
];
const monde = (dessinable = false) => randomChoice(dessinable ? MONDES.filter((m) => m.dessin) : MONDES);

/** Les choses qu'un enfant possède ou collectionne. */
type Chose = { pl: string; sg: string; dessin?: ObjetId };
const CHOSES: readonly Chose[] = [
  { pl: "billes", sg: "bille" },
  { pl: "images", sg: "image" },
  { pl: "autocollants", sg: "autocollant" },
  { pl: "cartes de dragons", sg: "carte de dragon" },
  { pl: "perles", sg: "perle" },
  { pl: "crayons", sg: "crayon" },
  { pl: "coquillages", sg: "coquillage" },
  { pl: "petites voitures", sg: "petite voiture", dessin: "voiture" },
  { pl: "livres", sg: "livre", dessin: "livre" },
  { pl: "ballons", sg: "ballon", dessin: "ballon" },
  { pl: "fleurs", sg: "fleur", dessin: "fleur" },
  { pl: "pommes", sg: "pomme", dessin: "pomme" },
  { pl: "étoiles dorées", sg: "étoile dorée", dessin: "etoile" },
  { pl: "bonbons", sg: "bonbon" },
  { pl: "dinosaures", sg: "dinosaure" },
  { pl: "gâteaux", sg: "gâteau" },
];
const chose = (dessinable = false) => randomChoice(dessinable ? CHOSES.filter((c) => c.dessin) : CHOSES);

/* =========================================================
   LES DESSINS
========================================================= */
/** Cadres de dix : `nombre` jetons rouges, puis `ajout` jetons bleus. */
function cadres(nombre: number, ajout = 0, nb?: number): BaseDixCanvasData {
  return { kind: "base_dix", variante: "cadres", nombre, ...(ajout ? { ajout } : {}), ...(nb ? { cadres: nb } : {}), mode: "couleur" };
}
/** Barres de dix et cubes : le nombre n, sans jamais l'écrire. */
function materiel(n: number, echange?: "unites"): BaseDixCanvasData {
  return {
    kind: "base_dix",
    dizaines: Math.floor(n / 10),
    unites: n % 10,
    etiquettes: true,
    ...(echange ? { echange } : {}),
    mode: "couleur",
  };
}
/** Une rangée par groupe (5 objets au plus par rangée). */
function rangees(quoi: ObjetId, groupes: readonly number[], colonnes = 1): ObjetsCanvasData {
  return { kind: "objets", mode: "couleur", colonnes, elements: groupes.map((n) => ({ quoi, nombre: n })), size: { width: 300 } };
}
/** Le dessin d'une collection de n objets : objets si n ≤ 10, sinon cadres. */
function collection(quoi: ObjetId | undefined, n: number): CanvasFigure {
  if (quoi && n <= 10) return rangees(quoi, n > 5 ? [5, n - 5] : [n]);
  return cadres(n);
}
/** Deux collections : une rangée chacune quand elles tiennent, sinon jetons rouges et bleus. */
function deuxCollections(quoi: ObjetId | undefined, a: number, b: number): CanvasFigure {
  if (quoi && a <= 5 && b <= 5) return rangees(quoi, [a, b]);
  return cadres(a, b);
}
/** Un enfant de la troupe qui parle. */
function parle(perso: PersonnageId, texte: string, expression: PersonnageCanvasData["expression"] = "sourire"): PersonnageCanvasData {
  return {
    kind: "personnage",
    personnage: perso,
    ...(perso === "pic" ? {} : { pose: "montre" as const, expression }),
    bulle: { texte, forme: expression === "pense" ? "pensee" : "parole" },
    mode: "couleur",
  };
}
/** Des billets de 10 € et des pièces de 1 € : la valeur des chiffres, en argent. */
function porteMonnaie(euros: number): MonnaieCanvasData {
  const el: MonnaieElement[] = [];
  if (euros >= 10) el.push({ valeur: "10e", nombre: Math.floor(euros / 10) });
  if (euros % 10) el.push({ valeur: "1e", nombre: euros % 10 });
  return { kind: "monnaie", elements: el };
}

/* =========================================================
   DES FAMILLES COMMUNES
========================================================= */
/** Une histoire où l'on ajoute b à a. Le dessin montre les deux quantités. */
function histoireAjout(a: number, b: number, dessin = true) {
  const m = monde(dessin && a <= 10 && b <= 10);
  const question = randomChoice([
    `Combien y a-t-il ${de(m.pl)} maintenant ?`,
    `Combien ${de(m.pl)} y a-t-il à la fin ?`,
    `Trouve le nombre ${de(m.pl)} à la fin.`,
    `Combien ${de(m.pl)} en tout ?`,
  ]);
  return {
    text: `${maj(m.lieu)}, il y a ${a} ${m.pl}. ${m.arrive(b)} ${question}`,
    canvas: dessin && a <= 10 && b <= 10 ? deuxCollections(m.dessin, a, b) : undefined,
    m,
  };
}
/** Deux enfants réunissent leurs collections. */
function histoireReunion(a: number, b: number, dessin = true) {
  const [p, q] = deuxEnfants();
  const c = chose(dessin && a <= 5 && b <= 5);
  const question = randomChoice([
    `Combien ${de(c.pl)} ont-${ils(p, q)} ensemble ?`,
    `Combien cela fait-il ${de(c.pl)} en tout ?`,
    `${p.nom} et ${q.nom} mettent tout ensemble. Combien ${de(c.pl)} ?`,
  ]);
  return {
    text: `${p.nom} a ${a} ${c.pl}. ${q.nom} en a ${b}. ${question}`,
    canvas: dessin && a <= 10 && b <= 10 ? deuxCollections(c.dessin, a, b) : undefined,
  };
}

/** Un calcul nu, dit de plusieurs façons. */
const calculNu = (calcul: string) =>
  randomChoice([
    `Combien font ${calcul} ?`,
    `Calcule : ${calcul}.`,
    `${calcul} = ?`,
    `Trouve le résultat de ${calcul}.`,
    `Quel est le résultat de ${calcul} ?`,
    `Dans ta tête : ${calcul}. Combien trouves-tu ?`,
  ]);

/* =========================================================
   LES FABRIQUES D'ITEMS
========================================================= */
const COMMUN = { niveau: "cp" as const, matiere: "maths" as const, notionId: "probleme", theme: "neutral" as const };
function gabarit(
  id: string,
  microId: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
  hint: string,
  tags: string[],
  generate: () => Q,
): TutorBankItemV4 {
  return { kind: "template", id, ...COMMUN, microId, difficulty, hint, tags: ["cp", "probleme", ...tags, "template"], generate };
}

/** Schéma en barre : le tout au-dessus, les parts dedans ; `null` = ce qu'on cherche. */
function barre(total: number | null, parts: readonly (readonly [string, number | null])[]): SchemaBarreCanvasData {
  return {
    kind: "schema_barre",
    total: total === null ? "?" : String(total),
    parts: parts.map(([label, v]) => (v === null ? { label, unknown: true } : { label, value: String(v) })),
    display: { showTotal: true, showPartLabels: true, showValues: true },
  };
}
/** Un enfant de la troupe, différent de `sauf`. */
function membreTroupe(sauf?: Enfant): Enfant {
  let t = randomChoice(TROUPE);
  while (sauf && t.nom === sauf.nom) t = randomChoice(TROUPE);
  return t;
}
/** « On ajoute… » → « on ajoute… » après « Puis », sans toucher aux prénoms. */
const minus = (s: string) => s.replace(/^(On|Les|La|Le|Un|Une) /, (m) => m.toLowerCase());
/** Des objets par rangées de 5 : on les compte, le dessin ne fait pas les groupes. */
function enVrac(quoi: ObjetId, n: number): ObjetsCanvasData {
  const r: number[] = [];
  for (let k = n; k > 0; k -= 5) r.push(Math.min(5, k));
  return rangees(quoi, r, 2);
}
/** Unités du premier ≥ unités du second : pas de retenue. */
const sansRetenueMoins = (a: number, b: number) => a % 10 >= b % 10;
const sansRetenuePlus = (a: number, b: number) => (a % 10) + (b % 10) <= 9;

export const problemeBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_PROBLEME_IDENTIFIER — comprendre ce qu'on cherche
     La phase que le BO dit « particulièrement importante ».
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_probleme_identifier_fixed_1",
    ...COMMUN,
    microId: "cp_probleme_identifier",
    difficulty: 3,
    text: "« Anna avait 43 cerises. Elle en a mangé 18. » Que cherche-t-on si la question est : combien lui en reste-t-il ?",
    format: "qcm",
    choices: [
      "les cerises qui restent après le repas",
      "les cerises qu'elle a mangées",
      "les cerises qu'elle avait au début",
      "le nombre de cerises en trop",
    ],
    expected: ["les cerises qui restent après le repas"],
    comparator: "mcq_exact",
    hint: "Relis la question, pas seulement l'histoire.",
    explanation: exp(
      "Comprendre un problème, c'est savoir dire ce que l'on cherche, avec ses propres mots.",
      "On relit la question et on la reformule avant de calculer.",
      "L'histoire donne deux nombres : 43 au départ, 18 mangées. La question porte sur ce qui reste dans le bol à la fin. C'est cela qu'il faudra calculer, et rien d'autre.",
      "On cherche les cerises qui restent.",
    ),
    canvas: parle("zoe", "Combien lui en reste-t-il ?", "pense"),
    tags: ["cp", "probleme", "identifier", "methode", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "cp_probleme_identifier_fixed_2",
    ...COMMUN,
    microId: "cp_probleme_identifier",
    difficulty: 4,
    text: "« Léa a 3 billes de PLUS que Tom. Tom en a 8. Combien Léa en a-t-elle ? » Quelle opération faut-il faire ?",
    format: "qcm",
    choices: ["8 + 3", "8 - 3", "3 - 8", "8 + 8"],
    expected: ["8 + 3"],
    comparator: "mcq_exact",
    hint: "Qui en a le plus ? Pars de celui dont tu connais le nombre.",
    explanation: exp(
      "Dans un problème de comparaison, on part de la quantité connue et on applique l'écart.",
      "On repère qui en a le plus, puis on ajoute ou on enlève l'écart.",
      "Tom a 8 billes. Léa en a 3 de plus que lui, donc davantage : 8 + 3 = 11. Ici le mot « plus » annonce bien une addition — mais ce n'est pas toujours le cas, et c'est l'histoire qui décide.",
      "Il faut calculer 8 + 3.",
    ),
    tags: ["cp", "probleme", "identifier", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_probleme_identifier_fixed_3",
    ...COMMUN,
    microId: "cp_probleme_identifier",
    difficulty: 5,
    text: "« Léa a 12 billes. Elle en a 3 de PLUS que Tom. Combien Tom en a-t-il ? » Quelle opération faut-il faire ?",
    format: "qcm",
    choices: ["12 - 3", "12 + 3", "3 - 12", "12 + 12"],
    expected: ["12 - 3"],
    comparator: "mcq_exact",
    hint: "Le mot « plus » est là, mais qui en a le plus ? Ce n'est pas Tom.",
    explanation: exp(
      "Le mot d'un énoncé ne décide pas de l'opération : c'est l'histoire qui décide.",
      "On regarde de qui on connait la quantité, et si celui qu'on cherche en a plus ou moins.",
      "On connait Léa : 12 billes. Léa en a 3 de plus que Tom, donc Tom en a 3 de MOINS qu'elle : 12 - 3 = 9. Le mot « plus » est bien dans l'énoncé, et pourtant il faut soustraire.",
      "Il faut calculer 12 - 3.",
    ),
    tags: ["cp", "probleme", "identifier", "piege", "qcm"],
  },
  gabarit(
    "cp_probleme_identifier_tpl_1",
    "cp_probleme_identifier",
    3,
    "Relis la question : que demande-t-elle exactement ?",
    ["identifier", "canvas"],
    () => {
      const debut = randomInt(12, 40);
      const change = randomInt(3, 9);
      const p = enfant();
      const c = chose();
      const qu = `ce qu'${p.il}`;
      const cas = randomChoice([
        {
          histoire: `${p.nom} a ${debut} ${c.pl}. ${maj(p.il)} en gagne ${change}.`,
          question: randomChoice([`Combien en a-t-${p.il} maintenant ?`, `Combien en a-t-${p.il} à la fin ?`]),
          cherche: `${qu} a à la fin`,
          pieges: [`${qu} gagne`, `${qu} avait au début`, `${qu} a perdu`],
        },
        {
          histoire: `${p.nom} avait ${debut} ${c.pl}. Maintenant, ${p.il} en a ${debut + change}.`,
          question: `Combien en a-t-${p.il} gagné ?`,
          cherche: `${qu} a gagné`,
          pieges: [`${qu} a à la fin`, `${qu} avait au début`, `${qu} a perdu`],
        },
        {
          histoire: `${p.nom} a ${debut} ${c.pl}. ${maj(p.il)} en perd ${change}.`,
          question: randomChoice([`Combien lui en reste-t-il ?`, `Combien en garde-t-${p.il} ?`]),
          cherche: "ce qui lui reste",
          pieges: [`${qu} perd`, `${qu} avait au début`, `${qu} gagne`],
        },
        {
          histoire: `${p.nom} avait ${debut} ${randomChoice(["bonbons", "gâteaux", "biscuits"])}. Il ne lui en reste que ${debut - change}.`,
          question: `Combien en a-t-${p.il} mangé ?`,
          cherche: `${qu} a mangé`,
          pieges: ["ce qui lui reste", `${qu} avait au début`, `${qu} a acheté`],
        },
        {
          histoire: `${p.nom} a perdu ${change} ${c.pl}. Il lui en reste ${debut}.`,
          question: `Combien en avait-${p.il} au début ?`,
          cherche: `${qu} avait au début`,
          pieges: ["ce qui lui reste", `${qu} a perdu`, `${qu} a gagné`],
        },
        {
          histoire: `${p.nom} a ${debut} ${c.pl}. ${maj(p.il)} en donne ${change} à un ami.`,
          question: `Combien en a-t-${p.il} donné ?`,
          cherche: `${qu} a donné`,
          pieges: ["ce qui lui reste", `${qu} avait au début`, `${qu} a reçu`],
        },
      ]);
      const t = membreTroupe(p);
      const fin = randomChoice(["Que cherche-t-on ?", "Que demande la question ?", "Qu'est-ce qu'on cherche ?"]);
      return qcm(
        `« ${cas.histoire} » ${t.nom} demande : « ${cas.question} » ${fin}`,
        makeChoices(cas.cherche, cas.pieges),
        cas.cherche,
        exp(
          "Comprendre un problème, c'est savoir dire ce que l'on cherche avant de calculer.",
          "On relit la question seule, sans l'histoire, et on la redit avec ses propres mots.",
          `L'histoire donne deux nombres, mais la question ne porte que sur une chose : ${cas.cherche}. Les autres nombres sont déjà connus, ou ne sont pas demandés.`,
          `On cherche ${cas.cherche}.`,
        ),
        parle(t.perso!, cas.question, "pense"),
      );
    },
  ),
  gabarit(
    "cp_probleme_identifier_tpl_2",
    "cp_probleme_identifier",
    5,
    "Qui en a le plus ? Que demande la question, au juste ?",
    ["identifier", "piege", "canvas"],
    () => {
      const [a, b] = deuxEnfants();
      const c = chose();
      const n = randomInt(12, 40);
      const e = randomInt(2, 9);
      const cas = randomChoice([
        {
          histoire: `${a.nom} a ${n} ${c.pl}. ${maj(a.il)} en a ${e} de PLUS ${queN(b)}.`,
          question: `Combien ${b.nom} en a-t-${b.il} ?`,
          cherche: `ce ${queN(b)} a`,
        },
        {
          histoire: `${a.nom} a ${n} ${c.pl}. ${b.nom} en a ${n - e}.`,
          question: `Combien ${a.nom} en a-t-${a.il} de plus ?`,
          cherche: `l'écart entre ${a.nom} et ${b.nom}`,
        },
        {
          histoire: `${a.nom} a ${n} ${c.pl}. ${b.nom} en a ${e} de MOINS.`,
          question: `Combien en ont-${ils(a, b)} à eux deux ?`,
          cherche: `ce qu'${ils(a, b)} ont ensemble`,
        },
        {
          histoire: `${a.nom} a ${n} ${c.pl}. ${maj(a.il)} en a ${e} de MOINS ${queN(b)}.`,
          question: `Combien ${b.nom} en a-t-${b.il} ?`,
          cherche: `ce ${queN(b)} a`,
        },
      ]);
      const pieges = [`ce ${queN(b)} a`, `ce ${queN(a)} a`, `l'écart entre ${a.nom} et ${b.nom}`, `ce qu'${ils(a, b)} ont ensemble`].filter((x) => x !== cas.cherche);
      const t = membreTroupe(a);
      return qcm(
        `« ${cas.histoire} ${cas.question} » Que cherche-t-on ?`,
        makeChoices(cas.cherche, pieges),
        cas.cherche,
        exp(
          "Le mot « plus » ou « moins » ne dit pas ce qu'on cherche : c'est la question qui le dit.",
          "On relit la question seule, puis on dit avec ses mots ce qu'il faut trouver.",
          `La question est : « ${cas.question} ». On cherche donc ${cas.cherche}.`,
          `On cherche ${cas.cherche}.`,
        ),
        parle(t.perso!, cas.question, "pense"),
      );
    },
  ),

  /* =========================================================
     CP_PROBLEME_ADDITIF — parties-tout en une étape
  ========================================================= */
  gabarit(
    "cp_probleme_additif_tpl_1",
    "cp_probleme_additif",
    3,
    "On réunit deux parts : c'est le tout qu'on cherche.",
    ["additif", "canvas"],
    () => {
      let a = randomInt(11, 45);
      let b = randomInt(6, 40);
      while (!sansRetenuePlus(a, b)) { a = randomInt(11, 45); b = randomInt(6, 40); }
      const total = a + b;
      const p = enfant();
      const [r, s] = deuxEnfants();
      const c = chose();
      const m = monde();
      const h = randomChoice([
        { t: `${p.nom} ramasse ${a} coquillages le matin et ${b} l'après-midi. Combien en a-t-${p.il} en tout ?`, l: ["matin", "après-midi"] },
        { t: `Dans la classe ${deN(p)}, il y a ${a} filles et ${b} garçons. Combien d'élèves en tout ?`, l: ["filles", "garçons"] },
        { t: `${r.nom} a ${a} ${c.pl}. ${s.nom} en a ${b}. Combien en ont-${ils(r, s)} ensemble ?`, l: [r.nom, s.nom] },
        { t: `${maj(m.lieu)}, il y a ${a} ${m.pl}. ${m.arrive(b)} Combien ${de(m.pl)} maintenant ?`, l: ["avant", "en plus"] },
        { t: `${p.nom} colle ${a} images lundi et ${b} images mardi. Combien d'images a-t-${p.il} collées ?`, l: ["lundi", "mardi"] },
        { t: `Dans le bus de l'école, ${a} enfants sont assis devant et ${b} derrière. Combien d'enfants dans le bus ?`, l: ["devant", "derrière"] },
        { t: `Le fermier a ${a} poules et ${b} canards. Combien d'animaux a-t-il ?`, l: ["poules", "canards"] },
        { t: `Pic le paille-en-queue mange ${a} graines le matin et ${b} le soir. Combien de graines en tout ?`, l: ["matin", "soir"] },
      ]);
      return court(
        h.t,
        total,
        exp(
          "Chercher un tout à partir de ses deux parts, c'est une addition.",
          "On repère les deux parts, puis on les réunit.",
          `Les deux parts sont ${a} et ${b} : ${a} + ${b} = ${total}.`,
          `Il y en a ${total} en tout.`,
        ),
        barre(null, [[h.l[0], a], [h.l[1], b]]),
        [Math.abs(a - b), total + 10],
      );
    },
  ),
  gabarit(
    "cp_probleme_additif_tpl_2",
    "cp_probleme_additif",
    4,
    "Trois parts : on les réunit toutes.",
    ["additif", "canvas"],
    () => {
      const a = randomInt(10, 30);
      const b = randomInt(10, 35);
      const c = randomInt(5, 25);
      const total = a + b + c;
      const p = enfant();
      const [r, s] = deuxEnfants();
      const h = randomChoice([
        { t: `Dans un train de trois wagons, il y a ${a} voyageurs dans le premier, ${b} dans le deuxième et ${c} dans le troisième.`, q: "voyageurs", l: ["wagon 1", "wagon 2", "wagon 3"] },
        { t: `${p.nom} lit ${a} pages lundi, ${b} pages mardi et ${c} pages mercredi.`, q: "pages", l: ["lundi", "mardi", "mercredi"] },
        { t: `${r.nom} a ${a} billes, ${s.nom} en a ${b} et la maîtresse en a ${c}.`, q: "billes", l: [r.nom, s.nom, "maîtresse"] },
        { t: `À la fête ${deN(p)}, il y a ${a} ballons rouges, ${b} bleus et ${c} jaunes.`, q: "ballons", l: ["rouges", "bleus", "jaunes"] },
        { t: `Au verger, ${p.nom} cueille ${a} pommes, ${b} poires et ${c} prunes.`, q: "fruits", l: ["pommes", "poires", "prunes"] },
        { t: `Pic le paille-en-queue voit ${a} poissons, puis ${b}, puis encore ${c}.`, q: "poissons", l: ["d'abord", "puis", "encore"] },
        { t: `${r.nom} colle ${a} images, ${s.nom} en colle ${b} et ${p.nom === r.nom || p.nom === s.nom ? "la maîtresse" : p.nom} en colle ${c}.`, q: "images", l: [r.nom, s.nom, "le 3e"] },
        { t: `Au zoo, ${p.nom} compte ${a} singes, ${b} perroquets et ${c} zèbres.`, q: "animaux", l: ["singes", "perroquets", "zèbres"] },
        { t: `La boulangère vend ${a} croissants le matin, ${b} à midi et ${c} le soir.`, q: "croissants", l: ["matin", "midi", "soir"] },
        { t: `${p.nom} range ses livres : ${a} sur l'étagère du haut, ${b} au milieu et ${c} en bas.`, q: "livres", l: ["haut", "milieu", "bas"] },
      ]);
      const q = randomChoice([`Combien ${de(h.q)} en tout ?`, `Combien y a-t-il ${de(h.q)} en tout ?`, `Trouve le nombre total ${de(h.q)}.`]);
      return court(
        `${h.t} ${q}`,
        total,
        exp(
          "Un tout peut être fait de plus de deux parts : on les réunit toutes.",
          "On additionne les parts une par une.",
          `${a} + ${b} = ${a + b}, puis ${a + b} + ${c} = ${total}.`,
          `Il y en a ${total} en tout.`,
        ),
        barre(null, [[h.l[0], a], [h.l[1], b], [h.l[2], c]]),
        [a + b, b + c, total - 10],
      );
    },
  ),
  {
    kind: "fixed",
    id: "cp_probleme_additif_fixed_1",
    ...COMMUN,
    microId: "cp_probleme_additif",
    difficulty: 5,
    text: "Il y avait 36 oiseaux dans l'arbre. Il n'en reste plus que 21. Combien d'oiseaux se sont envolés ?",
    format: "qcm",
    choices: ["57", "15", "25", "14"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "On connait le début et la fin : c'est ce qui est parti qu'on cherche.",
    explanation: exp(
      "Quand on connait l'état de départ et l'état d'arrivée, on cherche la transformation : ce qui a changé.",
      "On calcule l'écart entre le début et la fin.",
      "36 - 21 = 15. Autrement dit : 21 + 15 = 36. Quinze oiseaux ont quitté l'arbre.",
      "15 oiseaux se sont envolés.",
    ),
    canvas: barre(36, [["restent", 21], ["envolés", null]]),
    tags: ["cp", "probleme", "additif", "piege", "qcm", "canvas"],
  },

  /* =========================================================
     CP_PROBLEME_SOUSTRACTIF — retrait et écart
  ========================================================= */
  gabarit(
    "cp_probleme_soustractif_tpl_1",
    "cp_probleme_soustractif",
    3,
    "On enlève au départ ce qui est parti.",
    ["soustractif", "canvas"],
    () => {
      let depart = randomInt(20, 60);
      let pris = randomInt(3, depart - 8);
      while (!sansRetenueMoins(depart, pris)) { depart = randomInt(20, 60); pris = randomInt(3, depart - 8); }
      const reste = depart - pris;
      const p = enfant();
      const c = chose();
      const m = monde();
      const h = randomChoice([
        { t: `${p.nom} avait ${depart} ${c.pl}. ${maj(p.il)} en a perdu ${pris}. Combien lui en reste-t-il ?`, l: "perdus" },
        { t: `${p.nom} a ${depart} ${c.pl}. ${maj(p.il)} en donne ${pris} à ${randomChoice(["un ami", "une amie", "son frère", "sa sœur"])}. Combien en garde-t-${p.il} ?`, l: "donnés" },
        { t: `${maj(m.lieu)}, il y a ${depart} ${m.pl}. ${m.part(pris)} Combien en reste-t-il ?`, l: "partis" },
        { t: `La boulangère a ${depart} croissants. Elle en vend ${pris}. Combien lui en reste-t-il ?`, l: "vendus" },
        { t: `${p.nom} avait ${depart} bonbons. ${maj(p.il)} en a mangé ${pris}. Combien lui en reste-t-il ?`, l: "mangés" },
        { t: `Dans la bibliothèque, il y a ${depart} livres. Les enfants en empruntent ${pris}. Combien de livres restent ?`, l: "empruntés" },
      ]);
      return court(
        h.t,
        reste,
        exp(
          "Chercher ce qui reste après un retrait, c'est une soustraction.",
          "On part du nombre du début et on enlève ce qui est parti.",
          `${depart} - ${pris} = ${reste}.`,
          `Il en reste ${reste}.`,
        ),
        barre(depart, [[h.l, pris], ["reste", null]]),
        [depart + pris, pris],
      );
    },
  ),
  gabarit(
    "cp_probleme_soustractif_tpl_2",
    "cp_probleme_soustractif",
    4,
    "On cherche l'écart entre les deux nombres.",
    ["soustractif", "comparaison", "piege", "canvas"],
    () => {
      const [a, b] = deuxEnfants();
      const c = chose();
      const grand = randomInt(25, 70);
      const petit = randomInt(8, grand - 4);
      const ecart = grand - petit;
      const debut = `${a.nom} a ${grand} ${c.pl} et ${b.nom} en a ${petit}.`;
      const q = randomChoice([
        `Combien ${a.nom} en a-t-${a.il} de plus ${queN(b)} ?`,
        `Combien ${b.nom} en a-t-${b.il} de moins ${queN(a)} ?`,
        `Combien ${b.nom} doit-${b.il} en trouver pour en avoir autant ${queN(a)} ?`,
        `Quel est l'écart entre ${a.nom} et ${b.nom} ?`,
      ]);
      return court(
        `${debut} ${q}`,
        ecart,
        exp(
          "Comparer deux quantités, c'est chercher leur écart.",
          "On enlève la plus petite quantité à la plus grande.",
          `${grand} - ${petit} = ${ecart}. Le mot « plus » peut apparaitre dans la question, et pourtant c'est bien une soustraction : on cherche la différence.`,
          `L'écart est de ${ecart}.`,
        ),
        barre(grand, [[b.nom, petit], ["écart", null]]),
        [grand + petit > 100 ? grand : grand + petit, petit],
      );
    },
  ),
  gabarit(
    "cp_probleme_soustractif_tpl_3",
    "cp_probleme_soustractif",
    3,
    "Acheter, c'est dépenser : l'argent diminue.",
    ["soustractif", "monnaie", "canvas"],
    () => {
      let somme = randomInt(25, 80);
      let prix = randomInt(4, 19);
      while (!sansRetenueMoins(somme, prix)) { somme = randomInt(25, 80); prix = randomInt(4, 19); }
      const reste = somme - prix;
      const p = enfant();
      const achat = randomChoice(["un livre", "un jeu", "un ballon", "une trousse", "un cerf-volant", "un puzzle", "une peluche", "une boîte de feutres"]);
      const ou = randomChoice(["dans son porte-monnaie", "dans sa tirelire", "dans sa poche"]);
      const q = randomChoice([`Combien lui reste-t-il ?`, `Combien d'euros lui reste-t-il ?`, `Combien d'euros a-t-${p.il} encore ?`]);
      return qcm(
        `${p.nom} a ${somme} € ${ou}. ${maj(p.il)} achète ${achat} à ${prix} €. ${q}`,
        choixNombres(reste, [somme + prix, prix, reste - 10], "€"),
        `${reste} €`,
        exp(
          "Une dépense diminue la somme dont on dispose.",
          "On enlève le prix à la somme de départ.",
          `${somme} - ${prix} = ${reste}.`,
          `Il lui reste ${reste} €.`,
        ),
        porteMonnaie(somme),
      );
    },
  ),

  /* =========================================================
     CP_PROBLEME_SCHEMA — dessiner pour comprendre
     La phase « modéliser » du BO, avec le schéma en barre.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_probleme_schema_fixed_1",
    ...COMMUN,
    microId: "cp_probleme_schema",
    difficulty: 3,
    text: "À quoi sert de faire un schéma avant de calculer ?",
    format: "qcm",
    choices: [
      "à voir si l'on cherche le tout ou une part",
      "à rendre la copie plus jolie",
      "à trouver le résultat sans calculer",
      "à gagner du temps sur le calcul",
    ],
    expected: ["à voir si l'on cherche le tout ou une part"],
    comparator: "mcq_exact",
    hint: "Le schéma ne calcule rien : il montre ce qui est connu et ce qui manque.",
    explanation: exp(
      "Un schéma représente l'histoire du problème : il montre les parts, le tout, et ce qu'on cherche.",
      "On dessine ce qu'on connait, on met un point d'interrogation sur ce qu'on cherche.",
      "Une fois le schéma fait, on voit d'un coup d'œil si le point d'interrogation est sur le tout — alors on additionne — ou sur une part — alors on soustrait. Le schéma ne donne pas le résultat, il donne l'opération.",
      "Le schéma sert à voir si l'on cherche le tout ou une part.",
    ),
    canvas: barre(null, [["part", 12], ["part", 7]]),
    tags: ["cp", "probleme", "schema", "methode", "qcm", "canvas"],
  },
  gabarit(
    "cp_probleme_schema_tpl_1",
    "cp_probleme_schema",
    4,
    "Regarde où est le point d'interrogation sur le schéma.",
    ["schema", "canvas"],
    () => {
      const part1 = randomInt(8, 35);
      const part2 = randomInt(6, 30);
      const total = part1 + part2;
      const chercheTout = randomChoice([true, false]);
      const p = enfant();
      const ctx = randomChoice([
        { quoi: "les élèves de la classe", l: ["filles", "garçons"] },
        { quoi: `les billes ${deN(p)}`, l: ["bleues", "rouges"] },
        { quoi: "les livres de l'étagère", l: ["albums", "contes"] },
        { quoi: "les fleurs du jardin", l: ["roses", "tulipes"] },
        { quoi: "les animaux de la ferme", l: ["poules", "lapins"] },
        { quoi: "les voyageurs du train", l: ["devant", "derrière"] },
        { quoi: `les images ${deN(p)}`, l: ["gardées", "données"] },
        { quoi: "les poissons de l'aquarium", l: ["rouges", "jaunes"] },
      ]);
      const debut = randomChoice([
        `Ce schéma montre ${ctx.quoi}.`,
        `${p.nom} a dessiné un schéma pour ${ctx.quoi}.`,
        `Voici le schéma pour ${ctx.quoi}.`,
      ]);
      const q = randomChoice([
        "Quel nombre cache le point d'interrogation ?",
        "Que vaut le « ? » ?",
        chercheTout ? "Combien y en a-t-il en tout ?" : `Combien y a-t-il de ${ctx.l[1]} ?`,
      ]);
      if (chercheTout) {
        return court(
          `${debut} ${q}`,
          total,
          exp(
            "Sur un schéma en barre, le tout est la barre entière et les parts sont ses morceaux.",
            "Quand les deux parts sont connues, on les additionne pour obtenir le tout.",
            `${part1} + ${part2} = ${total}.`,
            `Le tout vaut ${total}.`,
          ),
          barre(null, [[ctx.l[0], part1], [ctx.l[1], part2]]),
          [Math.abs(part1 - part2), total + 10],
        );
      }
      return court(
        `${debut} ${q}`,
        part2,
        exp(
          "Sur un schéma en barre, une part manquante se retrouve en enlevant l'autre part au tout.",
          "On enlève la part connue au tout.",
          `${total} - ${part1} = ${part2}.`,
          `La part qui manque vaut ${part2}.`,
        ),
        barre(total, [[ctx.l[0], part1], [ctx.l[1], null]]),
        [total + part1 > 100 ? total : total + part1, part1],
      );
    },
  ),
  gabarit(
    "cp_probleme_schema_tpl_2",
    "cp_probleme_schema",
    4,
    "Le tout est connu ou non ? C'est cela qui décide.",
    ["schema", "canvas"],
    () => {
      const chercheTout = randomChoice([true, false]);
      const a = randomInt(6, 30);
      const b = randomInt(5, 25);
      const t = a + b;
      const p = enfant();
      const c = chose();
      const m = monde();
      const histoire = chercheTout
        ? randomChoice([
            { t: `${p.nom} a ${a} ${c.pl}. On lui en donne ${b}.`, l: ["avant", "reçus"] },
            { t: `${maj(m.lieu)}, il y a ${a} ${m.pl}. ${m.arrive(b)}`, l: ["avant", "arrivés"] },
            { t: `Dans la cour, ${a} enfants jouent au ballon et ${b} à la corde.`, l: ["ballon", "corde"] },
          ])
        : randomChoice([
            { t: `${p.nom} avait ${t} ${c.pl}. Il lui en reste ${a}.`, l: ["reste", "partis"] },
            { t: `${maj(m.lieu)}, il y avait ${t} ${m.pl}. Il en reste ${a}.`, l: ["reste", "partis"] },
            { t: `Dans la cour de l'école, il y a ${t} enfants. ${a} sont des filles.`, l: ["filles", "garçons"] },
          ]);
      const bonne = chercheTout ? `${a} + ${b}` : `${t} - ${a}`;
      const pieges = chercheTout ? [`${Math.max(a, b)} - ${Math.min(a, b)}`, `${a} + ${a}`, `${b} - ${a}`, `${b} + ${b}`] : [`${t} + ${a}`, `${a} - ${t}`, `${a} + ${a}`];
      const q = randomChoice(["Regarde le schéma. Quel calcul faut-il faire ?", "Le schéma raconte l'histoire. Choisis le bon calcul.", "Quel calcul donne le nombre du « ? » ?"]);
      return qcm(
        `${histoire.t} ${q}`,
        makeChoices(bonne, pieges.filter((x) => x !== bonne)),
        bonne,
        exp(
          "Le schéma en barre range toujours les mêmes trois nombres : deux parts et un tout.",
          "On regarde lequel des trois manque.",
          chercheTout
            ? `Le tout manque : on réunit les deux parts, donc on additionne : ${a} + ${b}.`
            : `Une part manque : on enlève la part connue au tout, donc on soustrait : ${t} - ${a}.`,
          `Le bon calcul est ${bonne}.`,
        ),
        chercheTout ? barre(null, [[histoire.l[0], a], [histoire.l[1], b]]) : barre(t, [[histoire.l[0], a], [histoire.l[1], null]]),
      );
    },
  ),

  /* =========================================================
     CP_PROBLEME_DEUX_ETAPES — champ numérique ≤ 30
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_probleme_deux_etapes_fixed_1",
    ...COMMUN,
    microId: "cp_probleme_deux_etapes",
    difficulty: 5,
    text: "Sur l'étagère de la bibliothèque, il y a 24 livres : 7 albums, 6 bandes dessinées, et le reste sont des documentaires. Combien y a-t-il de documentaires ?",
    format: "qcm",
    choices: ["17", "11", "13", "12"],
    expected: ["11"],
    comparator: "mcq_exact",
    hint: "Réunis d'abord les albums et les bandes dessinées.",
    explanation: exp(
      "Un problème en deux étapes demande un calcul intermédiaire avant la réponse.",
      "On réunit d'abord ce qu'on connait, puis on l'enlève au total.",
      "Première étape : 7 + 6 = 13 livres qui ne sont pas des documentaires. Deuxième étape : 24 - 13 = 11.",
      "Il y a 11 documentaires.",
    ),
    canvas: barre(24, [["albums", 7], ["BD", 6], ["docs", null]]),
    tags: ["cp", "probleme", "deux_etapes", "piege", "qcm", "canvas"],
  },
  gabarit(
    "cp_probleme_deux_etapes_tpl_1",
    "cp_probleme_deux_etapes",
    5,
    "Deux étapes : la première, puis la seconde.",
    ["deux_etapes"],
    () => {
      const depart = randomInt(14, 25);
      const x = randomInt(3, 9);
      const y = randomInt(2, 8);
      const partEnPremier = randomChoice([true, false]);
      const apres1 = partEnPremier ? depart - x : depart + y;
      const total = depart - x + y;
      const m = monde();
      const p = enfant();
      const c = chose();
      const h = randomChoice([
        partEnPremier
          ? `Il y a ${depart} enfants dans le bus. Au premier arrêt, ${x} descendent. Au deuxième arrêt, ${y} montent.`
          : `Il y a ${depart} enfants dans le bus. Au premier arrêt, ${y} montent. Au deuxième arrêt, ${x} descendent.`,
        partEnPremier
          ? `${maj(m.lieu)}, il y a ${depart} ${m.pl}. ${m.part(x)} Puis ${minus(m.arrive(y))}`
          : `${maj(m.lieu)}, il y a ${depart} ${m.pl}. ${m.arrive(y)} Puis ${minus(m.part(x))}`,
        partEnPremier
          ? `${p.nom} a ${depart} ${c.pl}. ${maj(p.il)} en perd ${x}, puis ${p.il} en gagne ${y}.`
          : `${p.nom} a ${depart} ${c.pl}. ${maj(p.il)} en gagne ${y}, puis ${p.il} en perd ${x}.`,
      ]);
      const q = randomChoice(["Combien maintenant ?", "Combien y en a-t-il à la fin ?", "Trouve le nombre à la fin."]);
      return court(
        `${h} ${q}`,
        total,
        exp(
          "Un problème en deux étapes se résout dans l'ordre où les évènements arrivent.",
          "On traite la première étape, on note le résultat, puis on traite la seconde.",
          partEnPremier
            ? `Première étape : ${depart} - ${x} = ${apres1}. Deuxième étape : ${apres1} + ${y} = ${total}.`
            : `Première étape : ${depart} + ${y} = ${apres1}. Deuxième étape : ${apres1} - ${x} = ${total}.`,
          `À la fin, il y en a ${total}.`,
        ),
        undefined,
        [depart - x - y, depart + x + y, apres1],
      );
    },
  ),
  gabarit(
    "cp_probleme_deux_etapes_tpl_2",
    "cp_probleme_deux_etapes",
    5,
    "Réunis d'abord les deux parts connues.",
    ["deux_etapes", "canvas"],
    () => {
      const a = randomInt(3, 9);
      const b = randomInt(3, 9);
      const total = randomInt(a + b + 2, 30);
      const reste = total - a - b;
      const p = enfant();
      const ctx = randomChoice([
        { lieu: "dans le panier", tout: "fruits", un: "pommes", deux: "bananes", trois: "poires" },
        { lieu: `dans la trousse ${deN(p)}`, tout: "crayons", un: "rouges", deux: "bleus", trois: "verts", nom: "crayons" },
        { lieu: "dans l'aquarium", tout: "poissons", un: "rouges", deux: "jaunes", trois: "bleus", nom: "poissons" },
        { lieu: "à la fête", tout: "ballons", un: "rouges", deux: "verts", trois: "jaunes", nom: "ballons" },
        { lieu: "dans le vase", tout: "fleurs", un: "roses", deux: "tulipes", trois: "marguerites" },
        { lieu: "dans la cour de la ferme", tout: "animaux", un: "poules", deux: "canards", trois: "lapins" },
        { lieu: "sur le parking", tout: "voitures", un: "rouges", deux: "blanches", trois: "noires", nom: "voitures" },
      ]);
      const nom = (k: string) => ("nom" in ctx && ctx.nom ? `${ctx.nom} ${k}` : k);
      const q = randomChoice([`Combien y a-t-il de ${nom(ctx.trois)} ?`, `Combien de ${nom(ctx.trois)} ?`, `Trouve le nombre de ${nom(ctx.trois)}.`]);
      return court(
        `${maj(ctx.lieu)}, il y a ${total} ${ctx.tout} : ${a} ${nom(ctx.un)}, ${b} ${ctx.deux}, et les autres sont ${"nom" in ctx && ctx.nom ? ctx.trois : `des ${ctx.trois}`}. ${q}`,
        reste,
        exp(
          "Quand une part est « les autres », on la trouve en enlevant au tout toutes les autres parts.",
          "On réunit d'abord les parts connues, puis on les enlève au tout.",
          `Première étape : ${a} + ${b} = ${a + b}. Deuxième étape : ${total} - ${a + b} = ${reste}.`,
          `Il y en a ${reste}.`,
        ),
        barre(total, [[ctx.un, a], [ctx.deux, b], [ctx.trois, null]]),
        [total - a, total - b, a + b],
      );
    },
  ),

  /* =========================================================
     CP_PROBLEME_MULTIPLICATIF — des groupes égaux, champ ≤ 30
  ========================================================= */
  gabarit(
    "cp_probleme_multiplicatif_tpl_3",
    "cp_probleme_multiplicatif",
    4,
    "Compte une rangée, puis répète autant de fois qu'il y a de rangées.",
    ["multiplicatif", "canvas"],
    () => {
      // La disposition en rangées, que le BO fait dessiner : on voit les
      // parts égales sans les compter une à une.
      const r = randomInt(2, 5);
      const k = randomInt(2, 5);
      const total = r * k;
      const c = randomChoice([
        { f: true, pl: "pommes", lieu: "dans la caisse", d: "pomme" as ObjetId },
        { f: true, pl: "fleurs", lieu: "dans le jardin", d: "fleur" as ObjetId },
        { f: true, pl: "voitures", lieu: "sur le parking", d: "voiture" as ObjetId },
        { pl: "arbres", lieu: "dans le verger", d: "arbre" as ObjetId },
        { f: true, pl: "maisons", lieu: "dans le village", d: "maison" as ObjetId },
        { pl: "verres", lieu: "sur le plateau", d: "verre" as ObjetId },
        { f: true, pl: "tasses", lieu: "sur l'étagère", d: "tasse" as ObjetId },
        { pl: "bateaux", lieu: "dans le port", d: "bateau" as ObjetId },
        { pl: "cartables", lieu: "au vestiaire", d: "cartable" as ObjetId },
      ]);
      const t = randomChoice([
        `${maj(c.lieu)}, il y a ${r} rangées de ${k} ${c.pl}. Combien ${de(c.pl)} en tout ?`,
        `${maj(c.lieu)}, les ${c.pl} sont ${c.f ? "rangées" : "rangés"} en ${r} rangées. Chaque rangée a ${k} ${c.pl}. Combien en tout ?`,
        `${enfant().nom} compte les ${c.pl} ${c.lieu} : ${r} rangées de ${k}. Combien en trouve-t-on ?`,
      ]);
      return court(
        t,
        total,
        exp(
          "Des objets rangés en rangées égales forment des parts égales.",
          "On compte une rangée, puis on l'additionne autant de fois qu'il y a de rangées.",
          `${Array.from({ length: r }, () => k).join(" + ")} = ${total}. On dit aussi « ${r} fois ${k} ».`,
          `Il y en a ${total}.`,
        ),
        rangees(c.d, Array.from({ length: r }, () => k)),
        [r + k, total + k, total - k],
      );
    },
  ),
  gabarit(
    "cp_probleme_multiplicatif_tpl_1",
    "cp_probleme_multiplicatif",
    4,
    "Toutes les parts sont pareilles : on répète l'addition.",
    ["multiplicatif", "canvas"],
    () => {
      const g = randomInt(2, 5);
      const k = randomInt(2, 6);
      const total = g * k;
      const c = randomChoice([
        { des: "sachets", un: "sachet", pl: "bonbons" },
        { des: "boîtes", un: "boîte", pl: "billes" },
        { des: "paniers", un: "panier", pl: "pommes", d: "pomme" as ObjetId },
        { des: "vases", un: "vase", pl: "fleurs", d: "fleur" as ObjetId },
        { des: "filets", un: "filet", pl: "ballons", d: "ballon" as ObjetId },
        { des: "bocaux", un: "bocal", pl: "poissons", d: "poisson" as ObjetId },
        { des: "assiettes", un: "assiette", pl: "gâteaux" },
        { des: "pochettes", un: "pochette", pl: "images" },
        { des: "nids", un: "nid", pl: "oiseaux", d: "oiseau" as ObjetId },
      ]);
      const p = enfant();
      const t = randomChoice([
        `Il y a ${g} ${c.des}. Chaque ${c.un} contient ${k} ${c.pl}. Combien ${de(c.pl)} en tout ?`,
        `${p.nom} a ${g} ${c.des} de ${k} ${c.pl}. Combien ${de(c.pl)} a-t-${p.il} ?`,
        `Dans chaque ${c.un}, il y a ${k} ${c.pl}. ${p.nom} prend ${g} ${c.des}. Combien ${de(c.pl)} ?`,
      ]);
      return court(
        t,
        total,
        exp(
          "Chercher le tout quand toutes les parts sont égales, c'est une addition répétée.",
          "On additionne la quantité d'une part autant de fois qu'il y a de parts.",
          `${Array.from({ length: g }, () => k).join(" + ")} = ${total}.`,
          `Il y en a ${total}.`,
        ),
        "d" in c && c.d && k <= 5 ? rangees(c.d, Array.from({ length: g }, () => k)) : undefined,
        [g + k, total + k, total - k],
      );
    },
  ),
  gabarit(
    "cp_probleme_multiplicatif_tpl_2",
    "cp_probleme_multiplicatif",
    5,
    "Combien de paquets peut-on faire ? Compte de paquet en paquet.",
    ["multiplicatif", "canvas"],
    () => {
      const k = randomChoice([2, 3, 4, 5]);
      const n = randomInt(2, 6);
      const total = k * n;
      const p = enfant();
      const c = randomChoice([
        { t: `Il y a ${total} élèves dans la classe. On fait des équipes de ${k}. Combien d'équipes ?` },
        { t: `${p.nom} a ${total} pommes. ${maj(p.il)} les met dans des sacs de ${k}. Combien de sacs remplit-${p.il} ?`, d: "pomme" as ObjetId },
        { t: `Le fleuriste a ${total} fleurs. Il fait des bouquets de ${k} fleurs. Combien de bouquets ?`, d: "fleur" as ObjetId },
        { t: `Il y a ${total} enfants pour le manège. Chaque voiture du manège prend ${k} enfants. Combien de voitures faut-il ?` },
        { t: `On range ${total} livres sur des étagères, ${k} par étagère. Combien d'étagères faut-il ?`, d: "livre" as ObjetId },
        { t: `${p.nom} a ${total} ballons. ${maj(p.il)} fait des grappes de ${k} ballons. Combien de grappes ?` },
        { t: `Il y a ${total} poissons à mettre dans des bocaux, ${k} par bocal. Combien de bocaux faut-il ?`, d: "poisson" as ObjetId },
      ]);
      return court(
        c.t,
        n,
        exp(
          "Chercher le nombre de parts d'un partage, c'est faire des groupes.",
          "On compte de groupe en groupe jusqu'à atteindre le total.",
          `On compte : ${Array.from({ length: n }, (_, i) => (i + 1) * k).join(", ")}. Il a fallu ${n} groupes de ${k}.`,
          `La réponse est ${n}.`,
        ),
        "d" in c && c.d && total <= 15 ? enVrac(c.d, total) : cadres(total, 0, Math.ceil(total / 10)),
        [total - k, k, n + 1, n - 1],
      );
    },
  ),

  /* =========================================================
     CP_PROBLEME_PARTAGE — chercher la valeur d'une part
  ========================================================= */
  gabarit(
    "cp_probleme_partage_tpl_3",
    "cp_probleme_partage",
    5,
    "Vérifie : la part annoncée, répétée pour chacun, redonne-t-elle le total ?",
    ["partage", "regulation", "canvas"],
    () => {
      const enfants = randomChoice([2, 3, 4, 5]);
      const part = randomInt(2, 6);
      const total = enfants * part;
      const juste = randomChoice([true, false]);
      const annonce = juste ? part : part + randomChoice([-1, 1]);
      const t = randomChoice(TROUPE);
      const c = chose();
      const debut = randomChoice([
        `${enfants} enfants se partagent ${total} ${c.pl} en parts égales.`,
        `On partage ${total} ${c.pl} entre ${enfants} enfants. Chacun en a autant.`,
        `${total} ${c.pl} sont à partager entre ${enfants} amis, sans en laisser.`,
      ]);
      return qcm(
        `${debut} ${t.nom} dit : « Chacun en aura ${annonce}. » A-t-${t.il} raison ?`,
        shuffle(["oui", "non"]),
        juste ? "oui" : "non",
        exp(
          "Un partage est juste quand les parts réunies redonnent exactement le total.",
          "On répète la part annoncée autant de fois qu'il y a d'enfants, puis on compare au total.",
          `${Array.from({ length: enfants }, () => annonce).join(" + ")} = ${annonce * enfants}. ${
            juste
              ? `C'est bien le total de ${total} : le partage tombe juste.`
              : `Or le total est ${total}, pas ${annonce * enfants}. La part annoncée est ${annonce > part ? "trop grande" : "trop petite"} : chacun doit en recevoir ${part}.`
          }`,
          juste ? "Oui, chacun en aura bien autant." : `Non : chacun en aura ${part}.`,
        ),
        parle(t.perso!, `Chacun en aura ${annonce} !`),
      );
    },
  ),
  gabarit(
    "cp_probleme_partage_tpl_1",
    "cp_probleme_partage",
    4,
    "Cherche le nombre qui, répété, donne le total.",
    ["partage", "canvas"],
    () => {
      const enfants = randomChoice([2, 3, 4, 5]);
      const part = randomInt(2, 6);
      const total = enfants * part;
      const c = chose();
      const [a, b] = deuxEnfants();
      const t = randomChoice([
        `${enfants} enfants se partagent ${total} ${c.pl} en parts égales. Combien chacun en reçoit-il ?`,
        `On partage ${total} ${c.pl} entre ${enfants} enfants. Chacun en a autant. Combien pour chacun ?`,
        ...(enfants === 2 ? [`${a.nom} et ${b.nom} se partagent ${total} ${c.pl}, autant chacun. Combien chacun en a-t-il ?`] : []),
        `La maîtresse distribue ${total} ${c.pl} à ${enfants} enfants, autant à chacun. Combien chaque enfant en reçoit-il ?`,
      ]);
      return court(
        t,
        part,
        exp(
          "Dans un partage équitable, chacun reçoit la même chose.",
          "On distribue un à un jusqu'à épuisement, ou on cherche la part qui, répétée, donne le total.",
          `${Array.from({ length: enfants }, () => part).join(" + ")} = ${total}. Chacun reçoit donc ${part}.`,
          `Chaque enfant en reçoit ${part}.`,
        ),
        c.dessin && total <= 15 ? enVrac(c.dessin, total) : cadres(total, 0, Math.ceil(total / 10)),
        [total - enfants, enfants, part + 2],
      );
    },
  ),
  gabarit(
    "cp_probleme_partage_tpl_2",
    "cp_probleme_partage",
    5,
    "Attention : on ne cherche pas la même chose que d'habitude.",
    ["partage", "piege", "canvas"],
    () => {
      const parts = randomChoice([2, 3, 4, 5]);
      const v = randomInt(3, 6);
      const total = parts * v;
      const chercheNombreDeParts = randomChoice([true, false]);
      const bonne = chercheNombreDeParts ? parts : v;
      const c = randomChoice([
        { pl: "œufs", boite: "boîtes", une: "une boîte" },
        { pl: "pommes", boite: "paniers", une: "un panier", d: "pomme" as ObjetId },
        { pl: "fleurs", boite: "vases", une: "un vase", d: "fleur" as ObjetId },
        { pl: "livres", boite: "cartons", une: "un carton", d: "livre" as ObjetId },
        { pl: "billes", boite: "sachets", une: "un sachet" },
        { pl: "poissons", boite: "bocaux", une: "un bocal", d: "poisson" as ObjetId },
      ]);
      const text = chercheNombreDeParts
        ? `On range ${total} ${c.pl} dans des ${c.boite} de ${v}. Combien de ${c.boite} faut-il ?`
        : `On range ${total} ${c.pl} dans ${parts} ${c.boite}, autant dans chaque ${c.une.split(" ")[1]}. Combien ${de(c.pl)} dans ${c.une} ?`;
      return court(
        text,
        bonne,
        exp(
          "Un même partage pose deux questions différentes : combien de parts, ou combien dans chaque part.",
          "On lit bien ce que l'énoncé donne et ce qu'il cherche.",
          chercheNombreDeParts
            ? `On sait combien il y a dans chaque groupe (${v}), on cherche le NOMBRE de groupes. On compte : ${Array.from({ length: parts }, (_, i) => (i + 1) * v).join(", ")}. Il en faut ${parts}.`
            : `On sait combien il y a de groupes (${parts}), on cherche COMBIEN DANS CHACUN : ${Array.from({ length: parts }, () => v).join(" + ")} = ${total}, donc ${v} dans chacun.`,
          `La réponse est ${bonne}.`,
        ),
        "d" in c && c.d && total <= 15 ? enVrac(c.d, total) : cadres(total, 0, Math.ceil(total / 10)),
        [chercheNombreDeParts ? v : parts, total - bonne, bonne + 1],
      );
    },
  ),

  /* =========================================================
     CP_PROBLEME_REPONSE — répondre, et vérifier que c'est possible
     La phase « Régulation » du BO, avec ses questions types.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_probleme_reponse_fixed_1",
    ...COMMUN,
    microId: "cp_probleme_reponse",
    difficulty: 4,
    text: "Dans une boîte de 20 jetons, il y a des rouges et des verts. Téo trouve 24 jetons rouges. Est-ce possible ?",
    format: "qcm",
    choices: [
      "non, il ne peut pas y en avoir plus que le total",
      "oui, si les verts sont nombreux",
      "oui, cela arrive parfois",
      "on ne peut pas savoir",
    ],
    expected: ["non, il ne peut pas y en avoir plus que le total"],
    comparator: "mcq_exact",
    hint: "Une part ne peut jamais dépasser le tout.",
    explanation: exp(
      "Avant d'écrire sa réponse, on vérifie qu'elle est possible : c'est la régulation.",
      "On compare le résultat trouvé avec ce que dit l'énoncé.",
      "La boîte contient 20 jetons en tout. Les rouges sont une PART de ces 20 : ils ne peuvent pas être 24. Il y a donc une erreur dans le calcul, et il faut le refaire.",
      "Non : une part ne peut pas dépasser le total.",
    ),
    canvas: parle("teo", "J'ai trouvé 24 rouges !"),
    tags: ["cp", "probleme", "regulation", "piege", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "cp_probleme_reponse_fixed_2",
    ...COMMUN,
    microId: "cp_probleme_reponse",
    difficulty: 3,
    text: "Après avoir calculé, que faut-il faire avant de passer au problème suivant ?",
    format: "qcm",
    choices: [
      "relire la question et vérifier que la réponse y répond",
      "recopier le calcul au propre",
      "effacer le brouillon",
      "commencer le problème suivant tout de suite",
    ],
    expected: ["relire la question et vérifier que la réponse y répond"],
    comparator: "mcq_exact",
    hint: "Le calcul donne un nombre. La question demande peut-être autre chose.",
    explanation: exp(
      "Résoudre un problème, ce n'est pas seulement calculer : c'est répondre à la question posée.",
      "On relit la question, puis on vérifie que le nombre trouvé y répond et qu'il est possible.",
      "On peut faire un calcul juste et répondre à côté : trouver le nombre de garçons alors qu'on demandait le nombre d'élèves. Relire la question évite cette erreur-là.",
      "Il faut relire la question et vérifier que la réponse y répond.",
    ),
    tags: ["cp", "probleme", "regulation", "methode", "qcm"],
  },
  gabarit(
    "cp_probleme_reponse_tpl_1",
    "cp_probleme_reponse",
    4,
    "Compare le résultat à ce que dit l'histoire.",
    ["regulation", "piege", "canvas"],
    () => {
      const total = randomInt(15, 40);
      const possible = randomChoice([true, false]);
      const t = randomChoice(TROUPE);
      const famille = randomInt(0, 2);
      if (famille === 0) {
        // Une part ne dépasse pas le tout.
        const trouve = possible ? randomInt(2, total - 2) : total + randomInt(1, 12);
        const ctx = randomChoice([
          { tout: `un sac de ${total} billes`, part: "billes bleues", autre: "rouges" },
          { tout: `une école de ${total} élèves`, part: "filles", autre: "garçons" },
          { tout: `une boîte de ${total} crayons`, part: "crayons rouges", autre: "bleus" },
          { tout: `un panier de ${total} fruits`, part: "pommes", autre: "bananes" },
          { tout: `un bus de ${total} enfants`, part: "enfants devant", autre: "enfants derrière" },
          { tout: `un vase de ${total} fleurs`, part: "roses", autre: "tulipes" },
        ]);
        return qcm(
          `Dans ${ctx.tout}, il y a des ${ctx.part} et des ${ctx.autre}. ${t.nom} trouve ${trouve} ${ctx.part}. Est-ce possible ?`,
          shuffle(["oui", "non"]),
          possible ? "oui" : "non",
          exp(
            "Une part ne peut jamais être plus grande que le tout dont elle fait partie.",
            "On compare le résultat trouvé au total de l'énoncé.",
            possible
              ? `${trouve} est plus petit que ${total} : c'est possible, et il en resterait ${total - trouve} pour les ${ctx.autre}.`
              : `${trouve} est plus grand que ${total}, le total. Une part ne peut pas dépasser le tout : le calcul est à refaire.`,
            possible ? "Oui, c'est possible." : "Non, ce n'est pas possible.",
          ),
          parle(t.perso!, `J'ai trouvé ${trouve} !`, "pense"),
        );
      }
      // Après une perte, il reste MOINS ; après un gain, on a PLUS.
      const p = enfant();
      const c = chose();
      const change = randomInt(3, 9);
      const perd = famille === 1;
      const vrai = perd ? total - change : total + change;
      const trouve = possible ? vrai : perd ? total + change : total - change;
      const histoire = perd
        ? `${p.nom} avait ${total} ${c.pl}. ${maj(p.il)} en a perdu ${change}.`
        : `${p.nom} avait ${total} ${c.pl}. ${maj(p.il)} en a gagné ${change}.`;
      return qcm(
        `${histoire} ${t.nom} dit qu'${perd ? "il lui en reste" : `${p.il} en a maintenant`} ${trouve}. Est-ce possible ?`,
        shuffle(["oui", "non"]),
        possible ? "oui" : "non",
        exp(
          perd ? "Quand on perd des objets, on en a MOINS qu'au début." : "Quand on gagne des objets, on en a PLUS qu'au début.",
          "On compare la réponse au nombre du début : doit-elle être plus grande ou plus petite ?",
          possible
            ? `${perd ? `${total} - ${change}` : `${total} + ${change}`} = ${vrai} : c'est bien ${trouve}.`
            : `${trouve} est ${perd ? "plus grand" : "plus petit"} que ${total}, alors qu'${p.il} a ${perd ? "perdu" : "gagné"} des ${c.pl}. Ce n'est pas possible : il fallait trouver ${vrai}.`,
          possible ? "Oui, c'est possible." : "Non, ce n'est pas possible.",
        ),
        parle(t.perso!, `${maj(p.il)} en a ${trouve} !`, "pense"),
      );
    },
  ),

  /* =========================================================
     CP_PROBLEME_DEFI — l'état initial, et la question à choisir
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_probleme_defi_fixed_1",
    ...COMMUN,
    microId: "cp_probleme_defi",
    difficulty: 5,
    text: "Dans la boîte, j'ai mangé 6 bonbons et il en reste encore 21. Combien y avait-il de bonbons dans la boîte avant que j'en mange ?",
    format: "qcm",
    choices: ["15", "27", "26", "37"],
    expected: ["27"],
    comparator: "mcq_exact",
    hint: "Remets dans la boîte ce que tu as mangé.",
    explanation: exp(
      "Chercher l'état de départ, c'est remonter le temps : on remet ce qui a été enlevé.",
      "On réunit ce qui reste et ce qui est parti.",
      "21 + 6 = 27. Le mot « mangé » fait penser à une soustraction, mais c'est le DÉPART qu'on cherche : il était forcément plus grand que ce qui reste.",
      "Il y avait 27 bonbons.",
    ),
    canvas: barre(null, [["restent", 21], ["mangés", 6]]),
    tags: ["cp", "probleme", "defi", "piege", "qcm", "canvas"],
  },
  gabarit(
    "cp_probleme_defi_tpl_1",
    "cp_probleme_defi",
    5,
    "Le départ est-il plus grand ou plus petit que ce qui reste ?",
    ["defi", "piege", "canvas"],
    () => {
      const reste = randomInt(12, 45);
      const parti = randomInt(4, 20);
      const depart = reste + parti;
      const h = randomChoice([
        { objet: "bonbons", verbe: "mangé", l: "mangés" },
        { objet: "billes", verbe: "perdu", l: "perdues" },
        { objet: "images", verbe: "donné", l: "données" },
        { objet: "gâteaux", verbe: "mangé", l: "mangés" },
        { objet: "autocollants", verbe: "collé", l: "collés" },
        { objet: "cartes", verbe: "échangé", l: "échangées" },
      ]);
      const p = enfant();
      const t = randomChoice([
        `J'ai ${h.verbe} ${parti} ${h.objet}, et il m'en reste ${reste}. Combien en avais-je au départ ?`,
        `${p.nom} a ${h.verbe} ${parti} ${h.objet}. Il lui en reste ${reste}. Combien en avait-${p.il} au départ ?`,
        `Il reste ${reste} ${h.objet} à ${p.nom}. ${maj(p.il)} en a ${h.verbe} ${parti}. Combien en avait-${p.il} avant ?`,
      ]);
      return court(
        t,
        depart,
        exp(
          "Pour retrouver l'état de départ, on remet ce qui a été enlevé.",
          "On réunit ce qui reste et ce qui est parti.",
          `${reste} + ${parti} = ${depart}. Le départ est forcément plus grand que ce qui reste : c'est un bon moyen de vérifier.`,
          `Au départ, il y en avait ${depart}.`,
        ),
        barre(null, [["reste", reste], [h.l, parti]]),
        [Math.abs(reste - parti), depart + 10],
      );
    },
  ),
  gabarit(
    "cp_probleme_defi_tpl_2",
    "cp_probleme_defi",
    5,
    "Lis l'histoire jusqu'au bout : le mot de l'énoncé n'annonce pas toujours l'opération.",
    ["defi", "piege", "canvas"],
    () => {
      const a = randomChoice(TROUPE);
      let b = enfant();
      while (b.nom === a.nom) b = enfant();
      const c = chose();
      const connu = randomInt(12, 40);
      const ecart = randomInt(3, 9);
      // On connait celui qui en a le PLUS, et on cherche l'autre : le mot
      // « plus » est dans l'énoncé, et pourtant il faut soustraire. Et
      // l'inverse avec « moins ».
      const plus = randomChoice([true, false]);
      const bonne = plus ? `${connu} - ${ecart}` : `${connu} + ${ecart}`;
      const q = randomChoice([`Quel calcul donne le nombre ${de(c.pl)} ${deN(b)} ?`, `Choisis le calcul pour trouver ce ${queN(b)} a.`]);
      return qcm(
        `${a.nom} a ${connu} ${c.pl}. ${maj(a.il)} en a ${ecart} de ${plus ? "PLUS" : "MOINS"} ${queN(b)}. ${q}`,
        makeChoices(bonne, [plus ? `${connu} + ${ecart}` : `${connu} - ${ecart}`, `${ecart} - ${connu}`, `${connu} + ${connu}`, `${ecart} + ${ecart}`]),
        bonne,
        exp(
          "Le mot d'un énoncé n'impose pas l'opération : c'est l'histoire qui décide.",
          "On regarde de qui on connait la quantité, et si l'autre en a plus ou moins.",
          plus
            ? `On connait ${a.nom} : ${connu}. ${a.nom} en a ${ecart} de plus ${queN(b)}, donc ${b.nom} en a ${ecart} de MOINS : ${connu} - ${ecart} = ${connu - ecart}. Le mot « plus » est là, et pourtant on soustrait.`
            : `On connait ${a.nom} : ${connu}. ${a.nom} en a ${ecart} de moins ${queN(b)}, donc ${b.nom} en a ${ecart} de PLUS : ${connu} + ${ecart} = ${connu + ecart}. Le mot « moins » est là, et pourtant on additionne.`,
          `Le calcul est ${bonne}.`,
        ),
        parle(a.perso!, `J'en ai ${ecart} de ${plus ? "plus" : "moins"} ${queN(b)} !`),
      );
    },
  ),
];
