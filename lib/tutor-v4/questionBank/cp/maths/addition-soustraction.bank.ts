// lib/tutor-v4/questionBank/cp/maths/addition-soustraction.bank.ts
//
// Les opérations du CP, écrites à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — comprendre le sens de l'addition et de la soustraction, et comprendre
//     que « la soustraction est l'opération inverse de l'addition » : on a
//     32 + 15 = 47, donc 47 - 32 = 15 et 47 - 15 = 32 ;
//   — comprendre que « l'ordre des termes n'a pas d'importance pour
//     l'addition, mais qu'il n'en est pas de même pour la soustraction » ;
//   — utiliser les symboles « + », « - » et « = » ;
//   — POSER une addition de deux ou trois nombres à un ou deux chiffres, en
//     positionnant les unités sous les unités et les dizaines sous les
//     dizaines. ⚠️ « Au CP, l'addition posée n'est introduite qu'en période 4
//     ou 5 » : c'est le dernier attendu de l'année ;
//   — comprendre le SENS de la multiplication, par des additions itérées et
//     par le mot « fois ». ⛔ Aucune table à savoir, aucune multiplication à
//     poser : cela commence au CE1.
//   — tous les nombres en jeu restent inférieurs ou égaux à cent.
//
// LE PIÈGE DE LA NOTION, et le BO l'écrit noir sur blanc : « L'élève sait que
// le symbole "=" ne peut être placé qu'entre deux termes égaux. Ainsi, il
// comprend que, pour calculer 47 + 8 en décomposant 8 en 3 + 5, l'écriture
// "47 + 3 = 50 + 5 = 55" est incorrecte. » L'élève lit « = » comme « ça
// donne », une flèche qui avance — et il écrit une suite de calculs faux.
// Le même malentendu bloque « 5 + ... = 8 » : il additionne tout ce qu'il voit
// et répond 13.
//
// ⭐ 10/11/2026 — ROBUSTESSE ET DESSINS (enfants de 6 ans). Chaque gabarit
// tire une SITUATION et une TOURNURE ; mesure : scripts/mesurer-squelettes-
// coach.ts cp addition_soustraction. Les dessins aident à compter sans écrire
// la réponse : objets, cadres de dix, barres et cubes, billets et pièces,
// l'addition posée (résultat caché), un enfant de la troupe qui parle.
// ⛔ Pas de retenue ni de dizaine à casser à ★2-★3.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

import type {
  BaseDixCanvasData,
  CalculPoseCanvasData,
  CanvasFigure,
  MonnaieCanvasData,
  MonnaieElement,
  ObjetId,
  ObjetsCanvasData,
  PersonnageCanvasData,
  PersonnageId,
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

/** L'addition posée, résultat caché. */
function calculPose(numbers: number[]): CalculPoseCanvasData {
  return {
    kind: "calcul_pose",
    operation: "addition",
    numbers: numbers.map(String),
    // ⛔ Le résultat resterait affiché sous la barre : la question n'aurait plus d'objet.
    display: { showResult: false, showRetenues: false },
  };
}

/* =========================================================
   LES FABRIQUES D'ITEMS
========================================================= */
const COMMUN = { niveau: "cp" as const, matiere: "maths" as const, notionId: "addition_soustraction", theme: "neutral" as const };
function gabarit(
  id: string,
  microId: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
  hint: string,
  tags: string[],
  generate: () => Q,
): TutorBankItemV4 {
  return { kind: "template", id, ...COMMUN, microId, difficulty, hint, tags: ["cp", "addition_soustraction", ...tags, "template"], generate };
}

/** Les quatre calculs d'un QCM « quel calcul ? » : le bon, l'opération contraire, l'ordre inversé, un double. */
function choixCalcul(a: number, b: number, bonne: string) {
  return makeChoices(bonne, [`${a} + ${b}`, `${a} - ${b}`, `${b} - ${a}`, `${a} + ${a}`, `${b} + ${b}`]);
}

/** Une histoire qui AUGMENTE ou DIMINUE une quantité (★2-★3 : petits nombres, dessin). */
function histoireChange(a: number, b: number, ajoute: boolean) {
  const famille = randomInt(0, 1);
  if (famille === 0) {
    const m = monde(a <= 10);
    return {
      texte: `${maj(m.lieu)}, il y a ${a} ${m.pl}. ${ajoute ? m.arrive(b) : m.part(b)}`,
      canvas: a <= 10 ? collection(m.dessin, a) : undefined,
    };
  }
  const p = enfant();
  const c = chose(a <= 10);
  const verbe = ajoute
    ? randomChoice([`${maj(p.il)} en gagne ${b}.`, `On lui en donne ${b}.`, `${maj(p.il)} en trouve encore ${b}.`])
    : randomChoice([`${maj(p.il)} en perd ${b}.`, `${maj(p.il)} en donne ${b} à un ami.`, `${maj(p.il)} en range ${b} dans sa boîte.`]);
  return { texte: `${p.nom} a ${a} ${c.pl}. ${verbe}`, canvas: a <= 10 ? collection(c.dessin, a) : undefined };
}

/** La fin d'un énoncé d'addition posée. */
const FIN_POSE = [
  "Pose l'addition et calcule.",
  "Calcule l'addition posée.",
  "Trouve le total avec l'addition posée.",
  "Combien en tout ? Calcule l'addition posée.",
];
/** Une histoire à deux ou trois nombres, pour l'addition posée. */
function histoirePose(n: readonly number[]) {
  const fin = randomChoice(FIN_POSE);
  const famille = randomInt(0, 2);
  if (famille === 0) {
    const [p, q] = deuxEnfants();
    const c = chose();
    if (n.length === 2) return `${p.nom} a ${n[0]} ${c.pl}. ${q.nom} en a ${n[1]}. ${fin}`;
    return `${p.nom} a ${n[0]} ${c.pl}, ${q.nom} en a ${n[1]}, et la maîtresse en a ${n[2]}. ${fin}`;
  }
  if (famille === 1) {
    const m = monde();
    if (n.length === 2) return `${maj(m.lieu)}, il y a ${n[0]} ${m.pl}. ${m.arrive(n[1])} ${fin}`;
    return `${maj(m.lieu)}, il y a ${n[0]} ${m.pl}. ${m.arrive(n[1])} Puis ${m.arrive(n[2]).charAt(0).toLowerCase()}${m.arrive(n[2]).slice(1)} ${fin}`;
  }
  const jours = n.length === 2 ? ["lundi", "mardi"] : ["lundi", "mardi", "mercredi"];
  const s = randomChoice([
    { qui: "La fermière ramasse", pl: "œufs" },
    { qui: "La boulangère vend", pl: "croissants" },
    { qui: "Le jardinier plante", pl: "fleurs" },
    { qui: "Le vétérinaire soigne", pl: "animaux" },
    { qui: "La bibliothèque prête", pl: "livres" },
    { qui: "Le cirque accueille", pl: "enfants" },
    { qui: "Le chef cuisinier prépare", pl: "crêpes" },
    { qui: "Pic le paille-en-queue mange", pl: "graines" },
  ]);
  return `${s.qui} ${n.map((x, i) => `${x} ${s.pl} ${jours[i]}`).join(n.length === 2 ? " et " : ", ").replace(/, ([^,]*)$/, " et $1")}. ${fin}`;
}

export const additionSoustractionBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_ADD_SENS — ce que veut dire additionner
  ========================================================= */
  gabarit(
    "cp_add_sens_tpl_2",
    "cp_add_sens",
    3,
    "Réunir deux tas, c'est additionner.",
    ["sens", "canvas"],
    () => {
      // Le sens de RÉUNION, distinct du sens d'AJOUT du gabarit voisin : deux
      // collections existent déjà, et on cherche ce qu'elles font ensemble.
      // ⚠️ b ≠ a : sinon « a + a » vaut la bonne réponse et le QCM s'effondre.
      const a = randomInt(3, 9);
      let b = randomInt(2, 9);
      if (b === a) b = a === 9 ? 8 : a + 1;
      const bonne = `${a} + ${b}`;
      const explication = exp(
        "Additionner, c'est aussi réunir deux collections qui existent déjà.",
        "On repère les deux quantités, puis on les met ensemble.",
        `On réunit ${a} et ${b} : ${a} + ${b} = ${a + b}.`,
        `Le calcul est ${bonne}.`,
      );
      const famille = randomInt(0, 2);
      if (famille === 0) {
        const [p, q] = deuxEnfants();
        const c = chose(a <= 5 && b <= 5);
        const t = randomChoice([
          `${p.nom} a ${a} ${c.pl} et ${q.nom} en a ${b}. Quel calcul donne le nombre ${de(c.pl)} qu'${ils(p, q)} ont ENSEMBLE ?`,
          `${p.nom} a ${a} ${c.pl}. ${q.nom} en a ${b}. ${maj(ils(p, q))} les mettent dans la même boîte. Quel calcul faut-il faire ?`,
          `${p.nom} et ${q.nom} réunissent leurs ${c.pl} : ${a} et ${b}. Choisis le bon calcul.`,
        ]);
        return qcm(t, choixCalcul(a, b, bonne), bonne, explication, deuxCollections(c.dessin, a, b));
      }
      const s = randomChoice([
        { t: `Dans le panier, il y a ${a} pommes rouges et ${b} pommes vertes.`, q: "Quel calcul donne le nombre de pommes ?", d: "pomme" as ObjetId },
        { t: `Sur la branche, il y a ${a} oiseaux. Sur le toit, il y en a ${b}.`, q: "Quel calcul donne le nombre d'oiseaux en tout ?", d: "oiseau" as ObjetId },
        { t: `Dans l'aquarium, il y a ${a} poissons rouges et ${b} poissons jaunes.`, q: "Quel calcul donne le nombre de poissons ?", d: "poisson" as ObjetId },
        { t: `Au port, ${a} bateaux sont à gauche du quai et ${b} à droite.`, q: "Quel calcul donne le nombre de bateaux ?", d: "bateau" as ObjetId },
        { t: `Dans le jardin, il y a ${a} papillons sur les fleurs et ${b} sur l'herbe.`, q: "Quel calcul donne le nombre de papillons ?", d: "papillon" as ObjetId },
        { t: `Le vase bleu a ${a} fleurs. Le vase jaune en a ${b}.`, q: "Quel calcul donne le nombre de fleurs ?", d: "fleur" as ObjetId },
        { t: `À la ferme, ${a} chats dorment et ${b} chats jouent.`, q: "Quel calcul donne le nombre de chats ?", d: "chat" as ObjetId },
        { t: `Sur l'étagère du haut, il y a ${a} livres. Sur celle du bas, ${b}.`, q: "Quel calcul donne le nombre de livres ?", d: "livre" as ObjetId },
        { t: `Dans le ciel, ${a} étoiles brillent à gauche et ${b} à droite.`, q: "Quel calcul donne le nombre d'étoiles ?", d: "etoile" as ObjetId },
        { t: `Au cirque, ${a} clowns ont un chapeau rouge et ${b} un chapeau bleu.`, q: "Quel calcul donne le nombre de clowns ?", d: "chapeau" as ObjetId },
        { t: `Sur le tapis, ${a} petites voitures sont rouges et ${b} sont bleues.`, q: "Quel calcul donne le nombre de petites voitures ?", d: "voiture" as ObjetId },
        { t: `Au goûter, il y a ${a} bananes sur la table et ${b} dans le sac.`, q: "Quel calcul donne le nombre de bananes ?", d: "banane" as ObjetId },
      ]);
      const q = famille === 1 ? s.q : randomChoice(["Choisis le bon calcul pour trouver le total.", "Quel calcul faut-il faire pour tout compter ?"]);
      return qcm(`${s.t} ${q}`, choixCalcul(a, b, bonne), bonne, explication, deuxCollections(s.d, a, b));
    },
  ),
  {
    kind: "fixed",
    id: "cp_add_sens_fixed_2",
    ...COMMUN,
    microId: "cp_add_sens",
    difficulty: 3,
    text: "Est-ce que 7 + 3 donne le même résultat que 3 + 7 ?",
    format: "qcm",
    choices: [
      "oui, l'ordre ne change rien pour une addition",
      "non, il faut toujours commencer par le plus grand",
      "non, cela donne 10 et 4",
      "on ne peut pas savoir",
    ],
    expected: ["oui, l'ordre ne change rien pour une addition"],
    comparator: "mcq_exact",
    hint: "Imagine deux tas de billes qu'on réunit : peu importe lequel on pousse en premier.",
    explanation: exp(
      "Dans une addition, on peut échanger les deux nombres sans changer le résultat.",
      "On calcule les deux façons et on compare.",
      "7 + 3 = 10 et 3 + 7 = 10. Un tas de 7 et un tas de 3, réunis dans un sens ou dans l'autre, font le même tas. ⚠️ Cela ne marche PAS pour la soustraction.",
      "Oui, l'ordre ne change rien pour une addition.",
    ),
    canvas: cadres(7, 3),
    tags: ["cp", "addition_soustraction", "sens", "piege", "qcm", "canvas"],
  },
  gabarit(
    "cp_add_sens_tpl_1",
    "cp_add_sens",
    2,
    "La quantité augmente-t-elle ou diminue-t-elle ?",
    ["sens", "canvas"],
    () => {
      // ⚠️ b < a - 1 : « a + a » et « b + b » ne valent jamais la bonne réponse.
      const a = randomInt(5, 10);
      const b = randomInt(2, Math.min(5, a - 2));
      const ajoute = randomChoice([true, false]);
      const h = histoireChange(a, b, ajoute);
      const bonne = ajoute ? `${a} + ${b}` : `${a} - ${b}`;
      const q = randomChoice([
        "Quel calcul faut-il faire ?",
        "Choisis le bon calcul.",
        "Quel calcul donne le nombre à la fin ?",
        "Pour savoir combien il y en a à la fin, quel calcul fais-tu ?",
      ]);
      return qcm(
        `${h.texte} ${q}`,
        choixCalcul(a, b, bonne),
        bonne,
        exp(
          "On choisit l'opération d'après ce qui arrive à la quantité.",
          "Y en a-t-il plus ou moins à la fin qu'au début ?",
          ajoute
            ? `Ici, la quantité augmente : on ajoute. On écrit ${a} + ${b}.`
            : `Ici, la quantité diminue : on enlève. On écrit ${a} - ${b}, en commençant par le nombre du début.`,
          `Le calcul est ${bonne}.`,
        ),
        h.canvas,
      );
    },
  ),

  /* =========================================================
     CP_SOUS_SENS — enlever, et l'opération inverse
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_sous_sens_fixed_1",
    ...COMMUN,
    microId: "cp_sous_sens",
    difficulty: 4,
    text: "On sait que 32 + 15 = 47. Que vaut alors 47 - 15 ?",
    format: "qcm",
    choices: ["32", "62", "33", "15"],
    expected: ["32"],
    comparator: "mcq_exact",
    hint: "La soustraction défait ce que l'addition a fait.",
    explanation: exp(
      "La soustraction est l'opération inverse de l'addition : elle défait l'ajout.",
      "On repart du total et on enlève ce qu'on avait ajouté.",
      "On était parti de 32, on avait ajouté 15 et obtenu 47. En enlevant les 15, on revient à 32. Pas besoin de calculer : l'addition connue donne la réponse.",
      "47 - 15 = 32.",
    ),
    tags: ["cp", "addition_soustraction", "sens", "piege"],
  },
  {
    kind: "fixed",
    id: "cp_sous_sens_fixed_2",
    ...COMMUN,
    microId: "cp_sous_sens",
    difficulty: 4,
    text: "Est-ce que 9 - 4 donne le même résultat que 4 - 9 ?",
    format: "qcm",
    choices: [
      "non, l'ordre compte pour une soustraction",
      "oui, comme pour l'addition",
      "oui, cela donne 5 les deux fois",
      "on ne peut pas savoir",
    ],
    expected: ["non, l'ordre compte pour une soustraction"],
    comparator: "mcq_exact",
    hint: "Peut-on enlever 9 objets d'un tas qui n'en a que 4 ?",
    explanation: exp(
      "Dans une soustraction, on ne peut pas échanger les deux nombres.",
      "On regarde ce que veut dire chaque écriture.",
      "9 - 4, c'est enlever 4 objets à un tas de 9 : il en reste 5. 4 - 9, ce serait enlever 9 objets à un tas qui n'en a que 4 : c'est impossible au CP. L'ordre change tout.",
      "Non : l'ordre compte pour une soustraction.",
    ),
    canvas: cadres(9),
    tags: ["cp", "addition_soustraction", "sens", "piege", "qcm", "canvas"],
  },
  gabarit(
    "cp_sous_sens_tpl_1",
    "cp_sous_sens",
    4,
    "La soustraction défait l'addition.",
    ["sens", "canvas"],
    () => {
      const famille = randomInt(0, 2);
      if (famille === 0) {
        // L'opération inverse : l'addition connue donne la réponse.
        const a = randomInt(10, 50);
        const b = randomInt(5, 40);
        const t0 = a + b;
        const cherche = randomChoice([a, b]);
        const enleve = cherche === a ? b : a;
        const p = randomChoice(TROUPE);
        const t = randomChoice([
          `On sait que ${a} + ${b} = ${t0}. Que vaut ${t0} - ${enleve} ?`,
          `${a} + ${b} = ${t0}. Sans calculer, trouve ${t0} - ${enleve}.`,
          `${p.nom} sait que ${a} + ${b} = ${t0}. Combien font ${t0} - ${enleve} ?`,
          `Regarde : ${a} + ${b} = ${t0}. Alors ${t0} - ${enleve} = ?`,
        ]);
        return court(
          t,
          cherche,
          exp(
            "La soustraction défait l'addition : c'est son opération inverse.",
            "On repart du total et on retire l'un des deux nombres de départ.",
            `${a} et ${b} réunis font ${t0}. Si on retire ${enleve}, il reste l'autre : ${cherche}.`,
            `${t0} - ${enleve} = ${cherche}.`,
          ),
          famille === 0 && p.perso ? parle(p.perso, `${a} + ${b} = ${t0}`, "sourire") : undefined,
          [enleve, t0 + enleve, cherche + 10],
        );
      }
      // Enlever : le nombre du début vient EN PREMIER.
      const a = randomInt(6, 10);
      const b = randomInt(2, a - 2);
      const h = histoireChange(a, b, false);
      if (famille === 1) {
        const bonne = `${a} - ${b}`;
        const q = randomChoice([
          "Quel calcul donne ce qui reste ?",
          "Quel calcul faut-il écrire ?",
          "Choisis la bonne soustraction.",
        ]);
        return qcm(
          `${h.texte} ${q}`,
          makeChoices(bonne, [`${b} - ${a}`, `${a} + ${b}`, `${a} - ${a - b}`]),
          bonne,
          exp(
            "Dans une soustraction, on écrit d'abord le nombre du début, puis ce qu'on enlève.",
            "On part de ce qu'il y avait, et on retire ce qui part.",
            `Au début : ${a}. On enlève ${b}. On écrit ${a} - ${b} = ${a - b}. Écrire ${b} - ${a}, ce serait enlever ${a} à ${b} : impossible.`,
            `Le calcul est ${bonne}.`,
          ),
          h.canvas,
        );
      }
      const q = randomChoice(["Combien en reste-t-il ?", "Combien y en a-t-il maintenant ?", "Trouve ce qui reste."]);
      return court(
        `${h.texte} ${q}`,
        a - b,
        exp(
          "Enlever une quantité, c'est faire une soustraction.",
          "On part du nombre du début et on recule de ce qui part.",
          `${a} - ${b} = ${a - b}. On vérifie : ${a - b} + ${b} = ${a}.`,
          `Il en reste ${a - b}.`,
        ),
        h.canvas,
        [a + b, b, a - b + 1, a - b - 1],
      );
    },
  ),

  /* =========================================================
     CP_SIGNE_EGAL — LE piège de la notion
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_signe_egal_fixed_1",
    ...COMMUN,
    microId: "cp_signe_egal",
    difficulty: 4,
    text: "Que veut dire le signe = entre deux écritures ?",
    format: "qcm",
    choices: [
      "que les deux côtés valent exactement la même chose",
      "que le résultat arrive juste après",
      "qu'il faut calculer",
      "que le calcul est fini",
    ],
    expected: ["que les deux côtés valent exactement la même chose"],
    comparator: "mcq_exact",
    hint: "Pense à une balance en équilibre : les deux plateaux se valent.",
    explanation: exp(
      "Le signe = dit que ce qui est écrit à sa gauche et ce qui est écrit à sa droite valent la même chose.",
      "On vérifie que les deux côtés ont bien la même valeur.",
      "Ce n'est pas une flèche qui veut dire « ça donne ». C'est une balance : 5 + 3 = 8, et on peut aussi écrire 8 = 5 + 3.",
      "Le signe = dit que les deux côtés valent la même chose.",
    ),
    tags: ["cp", "addition_soustraction", "signe_egal", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_signe_egal_fixed_2",
    ...COMMUN,
    microId: "cp_signe_egal",
    difficulty: 5,
    text: "Un élève calcule 47 + 8 et écrit : « 47 + 3 = 50 + 5 = 55 ». Son résultat est bon, mais son écriture est-elle correcte ?",
    format: "qcm",
    choices: [
      "non, car 47 + 3 ne vaut pas 50 + 5",
      "oui, puisque le résultat est juste",
      "non, car il fallait écrire 47 + 8 au début",
      "oui, c'est comme cela qu'on écrit un calcul",
    ],
    expected: ["non, car 47 + 3 ne vaut pas 50 + 5"],
    comparator: "mcq_exact",
    hint: "Calcule ce que vaut chaque morceau : 47 + 3, puis 50 + 5.",
    explanation: exp(
      "Le signe = ne se place qu'entre deux écritures qui valent la même chose.",
      "On calcule chaque morceau séparément et on compare.",
      "47 + 3 vaut 50, et 50 + 5 vaut 55. Or 50 n'est pas égal à 55 : le premier signe = est faux. Il fallait écrire deux lignes : 47 + 3 = 50, puis 50 + 5 = 55.",
      "Non : l'écriture est incorrecte, même si 55 est le bon résultat.",
    ),
    tags: ["cp", "addition_soustraction", "signe_egal", "piege", "qcm"],
  },
  gabarit(
    "cp_signe_egal_tpl_1",
    "cp_signe_egal",
    4,
    "Calcule les deux côtés et compare-les.",
    ["signe_egal", "piege", "canvas"],
    () => {
      const famille = randomChoice([0, 1, 2, 3, 4, 4]);
      const p = randomChoice(TROUPE);
      if (famille === 4) {
        // Le = dit « autant » : deux collections de même valeur.
        const a = randomInt(2, 9);
        const b = randomInt(2, 9);
        const vrai = randomChoice([true, false]);
        const x = vrai ? a + b : a + b + randomChoice([-2, -1, 1, 2]);
        const [r, s] = deuxEnfants();
        const c = chose();
        const t = randomChoice([
          `${r.nom} a ${a} ${c.pl} dans une main et ${b} dans l'autre. ${s.nom} en a ${x}. Ont-${ils(r, s)} autant ${de(c.pl)} ?`,
          `${r.nom} a ${a} ${c.pl} dans une boîte et ${b} sur la table. ${s.nom} en a ${x}. Ont-${ils(r, s)} le même nombre ?`,
          `${r.nom} dit : « Mes ${c.pl}, c'est ${a} + ${b}. » ${s.nom} dit : « Les miens, c'est ${x}. » En ont-${ils(r, s)} autant ?`,
          `Lis : ${a} + ${b} = ${x}. Les deux côtés ont-ils la même valeur ?`,
        ]);
        return qcm(
          t,
          shuffle(["oui", "non"]),
          vrai ? "oui" : "non",
          exp(
            "Le signe = veut dire « autant » : les deux côtés ont la même valeur.",
            "On calcule le côté où il y a l'addition, puis on compare.",
            vrai ? `${a} + ${b} = ${a + b}, et l'autre côté vaut ${x} : c'est pareil.` : `${a} + ${b} = ${a + b}, mais l'autre côté vaut ${x} : ce n'est pas pareil.`,
            vrai ? "Oui, autant." : "Non, pas autant.",
          ),
          cadres(a, b),
        );
      }
      if (famille === 0) {
        // Vrai ou faux : « a + b = c », écrite d'un côté ou de l'autre.
        const a = randomInt(3, 12);
        const b = randomInt(2, 9);
        const total = a + b;
        const vrai = randomChoice([true, false]);
        const droite = vrai ? total : total + randomChoice([-2, -1, 1, 2, 10]);
        const ecrit = randomChoice([`${a} + ${b} = ${droite}`, `${droite} = ${a} + ${b}`]);
        const t = randomChoice([
          `Cette écriture est-elle correcte : ${ecrit} ?`,
          `${p.nom} écrit ${ecrit}. A-t-${p.il} raison ?`,
          `Vrai ou faux ? ${ecrit}`,
        ]);
        const oui = t.startsWith("Vrai") ? "vrai" : "oui";
        const non = t.startsWith("Vrai") ? "faux" : "non";
        return qcm(
          t,
          shuffle([oui, non]),
          vrai ? oui : non,
          exp(
            "Le signe = n'est juste que si les deux côtés valent la même chose.",
            "On calcule le côté où il y a l'addition, puis on compare à l'autre côté.",
            vrai
              ? `${a} + ${b} = ${total}, et il y a bien ${droite} de l'autre côté : les deux côtés se valent.`
              : `${a} + ${b} = ${total}, mais il y a ${droite} de l'autre côté. ${total} n'est pas égal à ${droite}.`,
            vrai ? "L'écriture est correcte." : "L'écriture est fausse.",
          ),
          parle(p.perso!, ecrit, "sourire"),
        );
      }
      if (famille === 1) {
        // La balance : a + b = … + c.
        const a = randomInt(2, 9);
        const b = randomInt(2, 9);
        const c = randomInt(1, a + b - 1);
        const manque = a + b - c;
        const t = randomChoice([
          `Complète pour que ce soit juste : ${a} + ${b} = … + ${c}`,
          `${a} + ${b} = ${c} + … Quel nombre manque ?`,
          `Les deux côtés doivent valoir pareil : ${a} + ${b} = ${c} + …`,
        ]);
        return court(
          t,
          manque,
          exp(
            "Le signe = est une balance : les deux côtés valent la même chose.",
            "On calcule le côté complet, puis on cherche ce qui manque de l'autre côté.",
            `${a} + ${b} = ${a + b}. De l'autre côté, il y a déjà ${c}. Il manque ${manque}, car ${c} + ${manque} = ${a + b}.`,
            `Le nombre qui manque est ${manque}.`,
          ),
          cadres(a, b),
          [a + b, a + b + c, manque + 1, manque - 1],
        );
      }
      if (famille === 2) {
        // Quelle écriture est juste ?
        const a = randomInt(2, 9);
        const b = randomInt(2, 9);
        const t0 = a + b;
        const bonne = randomChoice([`${t0} = ${a} + ${b}`, `${a} + ${b} = ${b} + ${a}`, `${a} + ${b} = ${t0}`]);
        const fausses = [`${a} + ${b} = ${t0 + 1}`, `${t0} = ${a} + ${b + 1}`, `${a} + ${b} = ${a} + ${b + 2}`, `${a} = ${a} + ${b}`];
        const t = randomChoice([
          "Quelle écriture est juste ?",
          `${p.nom} hésite. Quelle écriture est correcte ?`,
          "Une seule écriture est vraie. Laquelle ?",
        ]);
        return qcm(
          t,
          makeChoices(bonne, fausses),
          bonne,
          exp(
            "Une égalité est juste quand les deux côtés du signe = ont la même valeur.",
            "On calcule chaque côté et on compare.",
            `${a} + ${b} vaut ${t0}. Dans « ${bonne} », les deux côtés valent ${t0}.`,
            `L'écriture juste est ${bonne}.`,
          ),
          parle(p.perso!, "Laquelle est juste ?", "pense"),
        );
      }
      // Le = « flèche » : une suite de calculs mal écrite.
      const n = randomInt(2, 6) * 10 + randomInt(4, 9);
      const v = 10 - (n % 10);
      const b = randomInt(v + 1, 9);
      const dizaine = n + v;
      const ecrit = `${n} + ${v} = ${dizaine} + ${b - v} = ${n + b}`;
      const t = randomChoice([
        `${p.nom} calcule ${n} + ${b}. ${maj(p.il)} écrit : ${ecrit}. Son écriture est-elle correcte ?`,
        `Pour ${n} + ${b}, ${p.nom} écrit : ${ecrit}. Est-ce bien écrit ?`,
      ]);
      return qcm(
        t,
        makeChoices(`non, car ${n} + ${v} ne vaut pas ${dizaine} + ${b - v}`, [
          "oui, puisque le résultat est juste",
          `non, car ${n} + ${b} ne fait pas ${n + b}`,
          "oui, on écrit toujours comme ça",
        ]),
        `non, car ${n} + ${v} ne vaut pas ${dizaine} + ${b - v}`,
        exp(
          "Le signe = ne se place qu'entre deux écritures qui valent la même chose.",
          "On calcule chaque morceau séparément.",
          `${n} + ${v} vaut ${dizaine}, et ${dizaine} + ${b - v} vaut ${n + b}. Ce n'est pas pareil : le premier = est faux. Il faut deux lignes : ${n} + ${v} = ${dizaine}, puis ${dizaine} + ${b - v} = ${n + b}.`,
          "Non : le résultat est bon, mais l'écriture est fausse.",
        ),
        parle(p.perso!, ecrit, "sourire"),
      );
    },
  ),

  /* =========================================================
     CP_ADD_CALCULER — calculer une addition
     ⛔ Pas de retenue à ★2-★3 : les unités ne dépassent pas 9.
  ========================================================= */
  gabarit(
    "cp_add_calculer_tpl_1",
    "cp_add_calculer",
    2,
    "Pars du plus grand nombre et avance.",
    ["calculer", "canvas"],
    () => {
      const d = randomInt(1, 5);
      const u = randomInt(0, 6);
      const a = d * 10 + u;
      const b = randomInt(2, 9 - u);
      const total = a + b;
      const explication = exp(
        "Additionner, c'est réunir deux quantités.",
        "On part du plus grand nombre et on avance du second.",
        `On part de ${a} et on avance de ${b} : ${total}. Les ${d} dizaines ne bougent pas.`,
        `${a} + ${b} = ${total}.`,
      );
      const famille = randomInt(0, 2);
      if (famille === 0) return court(calculNu(`${a} + ${b}`), total, explication, materiel(a), [a + b * 10, total + 10]);
      const p = enfant();
      const c = chose();
      if (famille === 1) {
        const t = randomChoice([
          `${p.nom} a ${a} ${c.pl}. ${maj(p.il)} en gagne ${b}. Combien en a-t-${p.il} maintenant ?`,
          `${p.nom} a ${a} ${c.pl}. On lui en donne ${b}. Combien en a-t-${p.il} ?`,
          `${p.nom} a ${a} ${c.pl} et en trouve ${b}. Combien en tout ?`,
        ]);
        return court(t, total, explication, materiel(a), [a + b * 10]);
      }
      const m = monde();
      const t = randomChoice([
        `${maj(m.lieu)}, il y a ${a} ${m.pl}. ${m.arrive(b)} Combien y en a-t-il maintenant ?`,
        `${maj(m.lieu)}, il y a ${a} ${m.pl}. ${m.arrive(b)} Combien ${de(m.pl)} en tout ?`,
      ]);
      return court(t, total, explication, materiel(a), [a + b * 10]);
    },
  ),
  gabarit(
    "cp_add_calculer_tpl_2",
    "cp_add_calculer",
    3,
    "Ajoute les dizaines entre elles, puis les unités.",
    ["calculer", "canvas"],
    () => {
      const dA = randomInt(1, 4);
      const uA = randomInt(1, 5);
      const dB = randomInt(1, 4);
      const uB = randomInt(1, 9 - uA);
      const a = dA * 10 + uA;
      const b = dB * 10 + uB;
      const total = a + b;
      const explication = exp(
        "Pour ajouter deux nombres à deux chiffres, on peut les couper en dizaines et unités.",
        "On ajoute les dizaines entre elles, les unités entre elles, puis on réunit.",
        `${dA * 10} + ${dB * 10} = ${(dA + dB) * 10}, et ${uA} + ${uB} = ${uA + uB}. On réunit : ${total}.`,
        `${a} + ${b} = ${total}.`,
      );
      const [p, q] = deuxEnfants();
      const famille = randomChoice([0, 1, 2, 2, 3, 3]);
      if (famille === 0) return court(calculNu(`${a} + ${b}`), total, explication, undefined, [total + 10, total - 10, a + dB * 10]);
      if (famille === 3) {
        const c = chose();
        const t = randomChoice([
          `${p.nom} a ${a} ${c.pl}. ${q.nom} en a ${b}. Combien en ont-${ils(p, q)} ensemble ?`,
          `${p.nom} a ${a} ${c.pl}. ${q.nom} lui en donne ${b}. Combien en a ${p.nom} maintenant ?`,
          `${p.nom} et ${q.nom} mettent leurs ${c.pl} ensemble : ${a} et ${b}. Combien cela fait-il ?`,
        ]);
        return court(t, total, explication, materiel(a), [total + 10, total - 10, a + dB * 10]);
      }
      if (famille === 1) {
        const t = randomChoice([
          `${p.nom} a ${a} €. ${q.nom} a ${b} €. Combien d'euros ont-${ils(p, q)} ensemble ?`,
          `${p.nom} met ${a} € et ${q.nom} met ${b} € dans la tirelire de la classe. Combien d'euros en tout ?`,
          `Un livre coûte ${a} €. Un jeu coûte ${b} €. Combien coûtent-ils ensemble ?`,
        ]);
        return qcm(
          t,
          choixNombres(total, [total + 10, total - 10, a + dB * 10, total + 1], "€"),
          `${total} €`,
          explication,
          { kind: "monnaie", groupes: [{ nom: t.startsWith("Un livre") ? "livre" : p.nom, elements: porteMonnaie(a).elements! }, { nom: t.startsWith("Un livre") ? "jeu" : q.nom, elements: porteMonnaie(b).elements! }] },
        );
      }
      const s = randomChoice([
        `Au zoo, il y a ${a} flamants roses et ${b} canards. Combien d'oiseaux en tout ?`,
        `La boulangère vend ${a} croissants le matin et ${b} l'après-midi. Combien en tout ?`,
        `${p.nom} lit ${a} pages lundi et ${b} pages mardi. Combien de pages en tout ?`,
        `Dans le train, ${a} voyageurs sont devant et ${b} derrière. Combien de voyageurs ?`,
        `Le jardinier plante ${a} tulipes et ${b} roses. Combien de fleurs ?`,
        `À la piscine, ${a} enfants nagent et ${b} jouent au bord. Combien d'enfants ?`,
        `${p.nom} a ${a} images. ${q.nom} en a ${b}. Combien d'images ont-${ils(p, q)} ensemble ?`,
        `Le chef cuisinier fait ${a} crêpes, puis ${b} autres. Combien de crêpes ?`,
        `La fusée emporte ${a} caisses d'eau et ${b} caisses de nourriture. Combien de caisses ?`,
        `Le vétérinaire a soigné ${a} chiens et ${b} chats ce mois-ci. Combien d'animaux ?`,
      ]);
      return court(s, total, explication, undefined, [total + 10, total - 10, a + dB * 10]);
    },
  ),
  gabarit(
    "cp_add_calculer_tpl_3",
    "cp_add_calculer",
    3,
    "Les dizaines ne changent pas : seul le chiffre des unités bouge.",
    ["calculer", "canvas"],
    () => {
      const d = randomInt(2, 8);
      const u = randomInt(1, 5);
      const a = d * 10 + u;
      const b = randomInt(2, 9 - u);
      const total = a + b;
      const explication = exp(
        "Ajouter un petit nombre ne touche que les unités, tant qu'on ne dépasse pas la dizaine.",
        "On ajoute les unités entre elles.",
        `${u} + ${b} = ${u + b}, ce qui ne dépasse pas 9 : les ${d} dizaines restent. On obtient ${total}.`,
        `${a} + ${b} = ${total}.`,
      );
      const famille = randomChoice([0, 1, 2, 3, 3]);
      if (famille === 0) return court(calculNu(`${a} + ${b}`), total, explication, materiel(a), [a + b * 10, d * 10 + b]);
      const p = enfant();
      if (famille === 3) {
        const m = monde();
        const t = randomChoice([
          `${maj(m.lieu)}, il y a ${a} ${m.pl}. ${m.arrive(b)} Combien y en a-t-il maintenant ?`,
          `${maj(m.lieu)}, il y a ${a} ${m.pl}. ${m.arrive(b)} Combien ${de(m.pl)} en tout ?`,
          `${maj(m.lieu)}, il y a ${a} ${m.pl}. ${m.arrive(b)} Trouve le nombre ${de(m.pl)}.`,
        ]);
        return court(t, total, explication, materiel(a), [a + b * 10, d * 10 + b]);
      }
      const s = randomChoice([
        `Le pion ${deN(p)} est sur la case ${a}. Il avance de ${b} cases. Sur quelle case arrive-t-il ?`,
        `${p.nom} a ${a} autocollants. ${maj(p.il)} en reçoit ${b}. Combien en a-t-${p.il} ?`,
        `Il y a ${a} moutons dans le pré. Le berger en fait entrer ${b}. Combien de moutons maintenant ?`,
        `La maîtresse a ${a} cahiers. Elle en achète ${b}. Combien de cahiers a-t-elle ?`,
        `Il y a ${a} enfants au cirque. ${b} autres arrivent. Combien d'enfants maintenant ?`,
        `Pic le paille-en-queue a ${a} graines. Il en trouve ${b}. Combien en a-t-il ?`,
        `${p.nom} a ${a} €. ${maj(p.il)} gagne ${b} € à la kermesse. Combien d'euros a-t-${p.il} ?`,
        `Le petit train porte ${a} voyageurs. ${b} montent. Combien de voyageurs maintenant ?`,
        `Dans la bibliothèque, il y a ${a} albums. On en ajoute ${b}. Combien d'albums ?`,
      ]);
      const argent = s.includes("€");
      return argent
        ? qcm(s, choixNombres(total, [a + b * 10, d * 10 + b, total + 10, total - 1], "€"), `${total} €`, explication, porteMonnaie(a))
        : court(s, total, explication, famille === 1 ? materiel(a) : undefined, [a + b * 10, d * 10 + b]);
    },
  ),

  /* =========================================================
     CP_SOUS_CALCULER — calculer une soustraction
     ⛔ Pas de « dizaine à casser » à ★2 : il y a assez d'unités.
  ========================================================= */
  gabarit(
    "cp_sous_calculer_tpl_1",
    "cp_sous_calculer",
    2,
    "Pars du grand nombre et recule.",
    ["calculer", "canvas"],
    () => {
      const d = randomInt(1, 5);
      const u = randomInt(3, 9);
      const a = d * 10 + u;
      const b = randomInt(2, u);
      const r = a - b;
      const explication = exp(
        "Soustraire, c'est enlever une quantité à une autre.",
        "On part du grand nombre et on recule de ce qu'on enlève.",
        `On part de ${a} et on recule de ${b} : ${r}. Il y a assez d'unités : les ${d} dizaines ne bougent pas.`,
        `${a} - ${b} = ${r}.`,
      );
      const famille = randomInt(0, 3);
      if (famille === 0) return court(calculNu(`${a} - ${b}`), r, explication, materiel(a), [a + b, r - 10]);
      if (famille === 1) {
        const m = monde();
        const t = randomChoice([
          `${maj(m.lieu)}, il y a ${a} ${m.pl}. ${m.part(b)} Combien en reste-t-il ?`,
          `${maj(m.lieu)}, il y a ${a} ${m.pl}. ${m.part(b)} Combien ${de(m.pl)} reste-t-il ?`,
          `${maj(m.lieu)}, il y a ${a} ${m.pl}. ${m.part(b)} Combien y en a-t-il maintenant ?`,
        ]);
        return court(t, r, explication, materiel(a), [a + b]);
      }
      const p = enfant();
      if (famille === 2) {
        const c = chose();
        const t = randomChoice([
          `${p.nom} a ${a} ${c.pl}. ${maj(p.il)} en perd ${b}. Combien lui en reste-t-il ?`,
          `${p.nom} a ${a} ${c.pl}. ${maj(p.il)} en donne ${b} à ${randomChoice(TROUPE.filter((e) => e.nom !== p.nom)).nom}. Combien lui en reste-t-il ?`,
          `${p.nom} a ${a} ${c.pl}. ${maj(p.il)} en range ${b} dans un tiroir. Combien en garde-t-${p.il} sur la table ?`,
        ]);
        return court(t, r, explication, undefined, [a + b]);
      }
      const t = randomChoice([
        `${p.nom} a ${a} €. ${maj(p.il)} achète une glace à ${b} €. Combien d'euros lui reste-t-il ?`,
        `${p.nom} a ${a} €. ${maj(p.il)} paie un ticket de manège à ${b} €. Combien lui reste-t-il ?`,
      ]);
      return qcm(t, choixNombres(r, [a + b, r - 10, r + 1, r - 1], "€"), `${r} €`, explication, porteMonnaie(a));
    },
  ),
  gabarit(
    "cp_sous_calculer_tpl_2",
    "cp_sous_calculer",
    4,
    "Il faut casser une dizaine pour pouvoir enlever.",
    ["calculer", "piege", "canvas"],
    () => {
      // Le cassage de dizaine, que le BO installe dès la période 3.
      const d = randomInt(2, 8);
      const depart = d * 10;
      const b = randomInt(2, 9);
      const r = depart - b;
      const explication = exp(
        "Quand il n'y a pas assez d'unités pour enlever, on casse une dizaine.",
        "On change une dizaine en dix unités, puis on retire.",
        `${depart}, c'est ${d} dizaines. On casse une dizaine : ${d - 1} dizaine${d > 2 ? "s" : ""} et 10 unités. On enlève ${b} aux 10 unités : il en reste ${10 - b}. Cela fait ${r}.`,
        `${depart} - ${b} = ${r}.`,
      );
      const famille = randomInt(0, 2);
      if (famille === 0) return court(calculNu(`${depart} - ${b}`), r, explication, materiel(depart, "unites"), [depart + b, depart - 10 + b, r - 10]);
      const p = enfant();
      if (famille === 1) {
        const t = randomChoice([
          `${p.nom} a ${d} billets de 10 €. ${maj(p.il)} achète un ballon à ${b} €. Combien d'euros lui reste-t-il ?`,
          `${p.nom} a ${depart} €. ${maj(p.il)} paie un livre à ${b} €. Combien lui reste-t-il ?`,
          `Avec ${depart} €, ${p.nom} achète un cerf-volant à ${b} €. Combien d'euros lui reste-t-il ?`,
        ]);
        return qcm(t, choixNombres(r, [depart - 10 + b, depart + b, r - 10, r + 1], "€"), `${r} €`, explication, { kind: "monnaie", elements: [{ valeur: "10e", nombre: d }] });
      }
      const s = randomChoice([
        `La fermière a ${d} boîtes de 10 œufs. Elle prend ${b} œufs pour une omelette.`,
        `Il y a ${depart} chaises dans la salle. On en sort ${b}.`,
        `${p.nom} a ${depart} perles. ${maj(p.il)} en met ${b} sur un collier.`,
        `Le jardinier a ${depart} graines. Il en sème ${b}.`,
        `La boulangère a fait ${depart} croissants. Elle en vend ${b}.`,
        `Le bateau pirate porte ${depart} tonneaux. ${b} roulent dans l'eau.`,
        `Il y a ${depart} poissons dans le bassin. ${b} partent dans la rivière.`,
        `${p.nom} a ${depart} cartes de dragons. ${maj(p.il)} en échange ${b}.`,
      ]);
      const q = randomChoice(["Combien en reste-t-il ?", "Combien en reste-t-il maintenant ?", "Trouve ce qui reste."]);
      return court(`${s} ${q}`, r, explication, materiel(depart, "unites"), [depart - 10 + b, depart + b, r - 10]);
    },
  ),
  gabarit(
    "cp_sous_calculer_tpl_3",
    "cp_sous_calculer",
    4,
    "Retire les dizaines, puis les unités.",
    ["calculer", "canvas"],
    () => {
      const dA = randomInt(3, 9);
      const uA = randomInt(4, 9);
      const dB = randomInt(1, dA - 1);
      const uB = randomInt(1, uA - 1);
      const a = dA * 10 + uA;
      const b = dB * 10 + uB;
      const r = a - b;
      const explication = exp(
        "Pour soustraire un nombre à deux chiffres, on peut le couper en dizaines et unités.",
        "On retire d'abord les dizaines, puis les unités.",
        `${b}, c'est ${dB * 10} et ${uB}. ${a} - ${dB * 10} = ${a - dB * 10}. Puis ${a - dB * 10} - ${uB} = ${r}.`,
        `${a} - ${b} = ${r}.`,
      );
      const famille = randomInt(0, 2);
      if (famille === 0) return court(calculNu(`${a} - ${b}`), r, explication, materiel(a), [r + 10, r - 10, a + b > 100 ? r + 2 : a + b]);
      const p = enfant();
      if (famille === 1) {
        const t = randomChoice([
          `${p.nom} a ${a} €. ${maj(p.il)} achète un jeu à ${b} €. Combien d'euros lui reste-t-il ?`,
          `${p.nom} a ${a} € dans sa tirelire. ${maj(p.il)} en sort ${b} € pour un cadeau. Combien reste-t-il ?`,
        ]);
        return qcm(t, choixNombres(r, [r + 10, r - 10, r + 1], "€"), `${r} €`, explication, porteMonnaie(a));
      }
      const s = randomChoice([
        `Le livre ${deN(p)} a ${a} pages. ${maj(p.il)} en a lu ${b}. Combien de pages reste-t-il ?`,
        `Il y a ${a} enfants dans la cour. ${b} rentrent en classe. Combien restent dans la cour ?`,
        `La boulangère a ${a} croissants. Elle en vend ${b}. Combien lui en reste-t-il ?`,
        `Il y a ${a} moutons dans le pré. ${b} rentrent à la bergerie. Combien restent dans le pré ?`,
        `Le train porte ${a} voyageurs. ${b} descendent. Combien de voyageurs restent ?`,
        `${p.nom} a ${a} images. ${maj(p.il)} en colle ${b}. Combien lui en reste-t-il à coller ?`,
        `Au zoo, il y a ${a} flamants roses. ${b} s'envolent. Combien en reste-t-il ?`,
        `La bibliothèque a ${a} albums. On en prête ${b}. Combien en reste-t-il ?`,
      ]);
      return court(s, r, explication, materiel(a), [r + 10, r - 10]);
    },
  ),

  /* =========================================================
     CP_ADD_SOUS_LIGNE — l'égalité à trou
     Là où le malentendu sur le « = » se voit tout de suite.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_add_sous_ligne_fixed_1",
    ...COMMUN,
    microId: "cp_add_sous_ligne",
    difficulty: 4,
    text: "Complète : 5 + … = 8",
    format: "qcm",
    choices: ["13", "3", "4", "2"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Le trou n'est pas le résultat : on cherche ce qui manque pour arriver à 8.",
    explanation: exp(
      "Dans une égalité à trou, les deux côtés du signe = doivent avoir la même valeur.",
      "On cherche le nombre qui, ajouté à celui de gauche, donne celui de droite.",
      "De 5 à 8, il manque 3 : 5 + 3 = 8. Répondre 13, c'est additionner 5 et 8 sans regarder où est le trou.",
      "Le nombre manquant est 3.",
    ),
    canvas: cadres(5),
    tags: ["cp", "addition_soustraction", "egalite_trou", "piege", "canvas"],
  },
  gabarit(
    "cp_add_sous_ligne_tpl_1",
    "cp_add_sous_ligne",
    4,
    "Cherche ce qui manque, pas la somme de ce que tu vois.",
    ["egalite_trou", "piege", "canvas"],
    () => {
      const a = randomInt(2, 9);
      const manque = randomInt(2, 10 - a + 4);
      const total = a + manque;
      const famille = randomChoice([0, 1, 1, 2, 2]);
      const explication = exp(
        "Une égalité à trou demande le nombre qui rend les deux côtés égaux.",
        "On part du nombre connu et on cherche ce qui manque pour arriver au total.",
        `De ${a} à ${total}, il manque ${manque} : ${a} + ${manque} = ${total}.`,
        `Le nombre qui manque est ${manque}.`,
      );
      if (famille === 0) {
        const t = randomChoice([
          `Complète : ${a} + … = ${total}`,
          `Complète : … + ${a} = ${total}`,
          `Quel nombre manque ? ${a} + ? = ${total}`,
          `Complète : ${total} - … = ${a}`,
          `${randomChoice(TROUPE).nom} cherche le nombre caché : ${a} + ? = ${total}.`,
          `Complète pour que ce soit juste : ${a} + … = ${total}`,
        ]);
        return court(t, manque, explication, cadres(a, 0, 2), [a + total, total, manque + 1, manque - 1]);
      }
      const p = enfant();
      if (famille === 1) {
        const c = chose();
        const t = randomChoice([
          `${p.nom} a ${a} ${c.pl}. ${maj(p.il)} en veut ${total}. Combien lui en manque-t-il ?`,
          `Il faut ${total} ${c.pl} pour le jeu. ${p.nom} en a ${a}. Combien doit-${p.il} en trouver ?`,
          `${p.nom} avait ${a} ${c.pl}. Maintenant, ${p.il} en a ${total}. Combien en a-t-${p.il} gagné ?`,
        ]);
        return court(t, manque, explication, cadres(a, 0, 2), [a + total, total, manque + 1]);
      }
      const m = monde();
      const t = randomChoice([
        `${maj(m.lieu)}, il y avait ${a} ${m.pl}. Maintenant, il y en a ${total}. Combien y en a-t-il de plus ?`,
        `${maj(m.lieu)}, il y a ${a} ${m.pl}. Il en faut ${total}. Combien en manque-t-il ?`,
      ]);
      return court(t, manque, explication, cadres(a, 0, 2), [a + total, total, manque + 1]);
    },
  ),
  gabarit(
    "cp_add_sous_ligne_tpl_2",
    "cp_add_sous_ligne",
    5,
    "Le résultat est écrit à GAUCHE cette fois. Le signe = se lit dans les deux sens.",
    ["egalite_trou", "piege", "canvas"],
    () => {
      const famille = randomInt(0, 2);
      if (famille === 0) {
        const a = randomInt(2, 9);
        const b = randomInt(2, 9);
        const total = a + b;
        const t = randomChoice([`Complète : ${total} = ${a} + …`, `Complète : ${total} = … + ${a}`, `Quel nombre manque ? ${total} = ${a} + ?`, `Complète : ${a} = ${total} - …`]);
        return court(
          t,
          b,
          exp(
            "Le signe = est une balance : elle se lit de gauche à droite comme de droite à gauche.",
            "On cherche ce qu'il faut ajouter pour retrouver le nombre seul.",
            `On a déjà ${a}. Pour arriver à ${total}, il faut ajouter ${b} : ${total} = ${a} + ${b}.`,
            `Le nombre qui manque est ${b}.`,
          ),
          cadres(a, 0, 2),
          [a + total, total, b + 1, b - 1],
        );
      }
      // Trou dans une soustraction, avec des nombres jusqu'à 50.
      const d = randomInt(2, 4);
      const u = randomInt(5, 9);
      const a = d * 10 + u;
      const b = randomInt(2, u);
      const r = a - b;
      const p = randomChoice(TROUPE);
      if (famille === 1) {
        const m = monde();
        const t = randomChoice([
          `Complète : ${a} - … = ${r}`,
          `Complète : ${r} = ${a} - …`,
          `${a} - ? = ${r}. Quel nombre manque ?`,
          `${maj(m.lieu)}, il y avait ${a} ${m.pl}. Il en reste ${r}. Combien y en a-t-il en moins ?`,
          `${p.nom} avait ${a} images. ${maj(p.il)} en a collé. Il en reste ${r}. Combien en a-t-${p.il} collé ?`,
        ]);
        return court(
          t,
          b,
          exp(
            "Dans une soustraction à trou, on cherche ce qu'on a enlevé.",
            "On compte l'écart entre les deux nombres.",
            `De ${r} à ${a}, il y a ${b} : ${a} - ${b} = ${r}.`,
            `Le nombre qui manque est ${b}.`,
          ),
          materiel(a),
          [a + r > 100 ? b + 2 : a + r, b + 1, b + 10],
        );
      }
      const m = monde();
      const c = chose();
      const t = randomChoice([
        `${p.nom} avait des billes. ${maj(p.il)} en a perdu ${b}. Il lui en reste ${r}. Complète : … - ${b} = ${r}`,
        `Complète : … - ${b} = ${r}`,
        `Quel nombre manque ? … = ${r} + ${b}`,
        `${maj(m.lieu)}, il y avait des ${m.pl}. ${m.part(b)} Il en reste ${r}. Combien y en avait-il au début ?`,
        `${maj(m.lieu)}, il y avait des ${m.pl}. ${m.part(b)} Il en reste ${r}. Complète : … - ${b} = ${r}`,
        `${p.nom} avait des ${c.pl}. ${maj(p.il)} en a donné ${b}. Il lui en reste ${r}. Combien en avait-${p.il} ?`,
        `${p.nom} a rangé ${b} ${c.pl}. Il en reste ${r} sur la table. Combien y en avait-il au début ?`,
      ]);
      return court(
        t,
        a,
        exp(
          "Si on a enlevé un nombre, on retrouve le départ en le remettant.",
          "On ajoute ce qu'on a enlevé à ce qui reste.",
          `${r} + ${b} = ${a}. On vérifie : ${a} - ${b} = ${r}.`,
          `Le nombre qui manque est ${a}.`,
        ),
        parle(p.perso!, `? - ${b} = ${r}`, "pense"),
        [r - b, r, a + 10],
      );
    },
  ),

  /* =========================================================
     CP_ADD_POSE — l'addition en colonnes
     Le BO la place en période 4 ou 5 : c'est le dernier
     apprentissage de l'année. ★3 sans retenue, ★4 avec.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_add_pose_fixed_1",
    ...COMMUN,
    microId: "cp_add_pose",
    difficulty: 4,
    text: "Pour poser l'addition 45 + 37 en colonnes, que faut-il aligner ?",
    format: "qcm",
    choices: [
      "les unités sous les unités et les dizaines sous les dizaines",
      "les nombres à gauche, l'un sous l'autre",
      "le plus grand nombre en haut, peu importe le reste",
      "les chiffres dans l'ordre où on les écrit",
    ],
    expected: ["les unités sous les unités et les dizaines sous les dizaines"],
    comparator: "mcq_exact",
    hint: "Chaque colonne ne doit contenir qu'une seule sorte de chiffres.",
    explanation: exp(
      "Poser une addition, c'est ranger les chiffres en colonnes selon leur valeur.",
      "On écrit les unités sous les unités, les dizaines sous les dizaines.",
      "Dans 45 + 37, le 5 et le 7 vont dans la même colonne : ce sont les unités. Le 4 et le 3 vont dans la colonne d'à côté : ce sont les dizaines.",
      "On aligne les unités sous les unités et les dizaines sous les dizaines.",
    ),
    tags: ["cp", "addition_soustraction", "pose", "piege", "qcm"],
  },
  gabarit(
    "cp_add_pose_tpl_1",
    "cp_add_pose",
    4,
    "Commence par la colonne des unités, à droite.",
    ["pose", "canvas"],
    () => {
      const dA = randomInt(1, 5);
      const uA = randomInt(2, 9);
      const dB = randomInt(1, 8 - dA);
      const uB = randomInt(1, 9);
      const a = dA * 10 + uA;
      const b = dB * 10 + uB;
      const total = a + b;
      const su = uA + uB;
      const retenue = su >= 10;
      const t = randomChoice([0, 1, 1, 1]) === 0 ? randomChoice(["Calcule cette addition posée.", `${enfant().nom} a posé une addition. Trouve le résultat.`]) : histoirePose([a, b]);
      return court(
        t,
        total,
        exp(
          "Dans une addition posée, on calcule colonne par colonne, en commençant par les unités.",
          "On ajoute les unités, puis les dizaines (sans oublier la retenue).",
          retenue
            ? `Unités : ${uA} + ${uB} = ${su}. On écrit ${su - 10} et on retient 1 dizaine. Dizaines : 1 + ${dA} + ${dB} = ${dA + dB + 1}. Résultat : ${total}.`
            : `Unités : ${uA} + ${uB} = ${su}. Dizaines : ${dA} + ${dB} = ${dA + dB}. Résultat : ${total}.`,
          `${a} + ${b} = ${total}.`,
        ),
        calculPose([a, b]),
        // Retenue oubliée : 10 de moins.
        retenue ? [total - 10, total + 10, total + 1] : [total + 10, total - 10, total + 1],
      );
    },
  ),
  gabarit(
    "cp_add_pose_tpl_2",
    "cp_add_pose",
    3,
    "Trois nombres, une seule addition : on les empile.",
    ["pose", "canvas"],
    () => {
      // ★3 sans retenue : les unités comme les dizaines restent sous 10.
      const uA = randomInt(1, 4), uB = randomInt(2, 3), uC = randomInt(0, 9 - uA - uB);
      const dA = randomInt(1, 3), dC = randomInt(1, 5 - dA);
      const a = dA * 10 + uA;
      const b = uB + randomInt(0, 1) * 10;
      const c = dC * 10 + uC;
      const total = a + b + c;
      const t = randomChoice([0, 1, 1, 1]) === 0 ? randomChoice(["Calcule cette addition posée.", `${enfant().nom} a posé une addition de trois nombres. Trouve le résultat.`]) : histoirePose([a, b, c]);
      return court(
        t,
        total,
        exp(
          "Une addition posée peut réunir deux ou trois nombres.",
          "On empile les nombres en alignant les unités, puis on ajoute colonne par colonne.",
          `Unités : ${uA} + ${uB} + ${uC} = ${uA + uB + uC}. Dizaines : ${Math.floor(total / 10)}. Résultat : ${total}.`,
          `${a} + ${b} + ${c} = ${total}.`,
        ),
        calculPose([a, b, c]),
        [total + 10, total - 10, total + 1, total - 1],
      );
    },
  ),

  /* =========================================================
     CP_MULT_SENS — le sens de la multiplication
     ⛔ Aucune table à savoir au CP : on additionne encore.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_mult_sens_fixed_1",
    ...COMMUN,
    microId: "cp_mult_sens",
    difficulty: 3,
    text: "Jan a 3 paquets de biscuits. Chaque paquet contient 20 biscuits. Quel calcul donne le nombre de biscuits ?",
    format: "qcm",
    choices: ["20 + 20 + 20", "20 + 3", "20 - 3", "3 + 3 + 3"],
    expected: ["20 + 20 + 20"],
    comparator: "mcq_exact",
    hint: "Chaque paquet apporte 20 biscuits, et il y a 3 paquets.",
    explanation: exp(
      "Quand plusieurs groupes contiennent la même quantité, on additionne cette quantité autant de fois qu'il y a de groupes.",
      "On compte combien de groupes, et combien il y a dans chaque groupe.",
      "3 paquets de 20 biscuits, c'est « trois fois vingt biscuits » : 20 + 20 + 20. Écrire 20 + 3 reviendrait à ajouter 3 biscuits, pas 3 paquets.",
      "Le calcul est 20 + 20 + 20.",
    ),
    tags: ["cp", "addition_soustraction", "multiplication", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_mult_sens_fixed_2",
    ...COMMUN,
    microId: "cp_mult_sens",
    difficulty: 3,
    text: "Que veut dire « 4 fois 5 » ?",
    format: "qcm",
    choices: ["5 + 5 + 5 + 5", "4 + 5", "5 - 4", "4 + 4 + 4 + 4 + 4 + 4"],
    expected: ["5 + 5 + 5 + 5"],
    comparator: "mcq_exact",
    hint: "« 4 fois », c'est quatre paquets. Chaque paquet contient 5.",
    explanation: exp(
      "« Tant de fois » dit le nombre de groupes égaux à réunir.",
      "On écrit la quantité d'un groupe, autant de fois qu'il y a de groupes.",
      "« 4 fois 5 », c'est quatre groupes de 5 : 5 + 5 + 5 + 5, ce qui fait 20.",
      "« 4 fois 5 » veut dire 5 + 5 + 5 + 5.",
    ),
    canvas: rangees("etoile", [5, 5, 5, 5]),
    tags: ["cp", "addition_soustraction", "multiplication", "definition", "qcm", "canvas"],
  },
  gabarit(
    "cp_mult_sens_tpl_1",
    "cp_mult_sens",
    3,
    "Additionne la quantité d'un groupe autant de fois qu'il y a de groupes.",
    ["multiplication", "canvas"],
    () => {
      const groupes = randomInt(2, 5);
      const k = randomInt(2, 5);
      const total = groupes * k;
      const G = randomChoice([
        { un: "assiette", des: "assiettes", pl: "pommes", d: "pomme" as ObjetId, prep: "Sur chaque" },
        { un: "vase", des: "vases", pl: "fleurs", d: "fleur" as ObjetId, prep: "Dans chaque" },
        { un: "bocal", des: "bocaux", pl: "poissons", d: "poisson" as ObjetId, prep: "Dans chaque" },
        { un: "branche", des: "branches", pl: "oiseaux", d: "oiseau" as ObjetId, prep: "Sur chaque" },
        { un: "étagère", des: "étagères", pl: "livres", d: "livre" as ObjetId, prep: "Sur chaque" },
        { un: "filet", des: "filets", pl: "ballons", d: "ballon" as ObjetId, prep: "Dans chaque" },
        { un: "boîte", des: "boîtes", pl: "petites voitures", d: "voiture" as ObjetId, prep: "Dans chaque" },
        { un: "panier", des: "paniers", pl: "bananes", d: "banane" as ObjetId, prep: "Dans chaque" },
        { un: "carte", des: "cartes", pl: "étoiles", d: "etoile" as ObjetId, prep: "Sur chaque" },
        { un: "port", des: "ports", pl: "bateaux", d: "bateau" as ObjetId, prep: "Dans chaque" },
        { un: "panier", des: "paniers", pl: "chatons", d: "chat" as ObjetId, prep: "Dans chaque" },
        { un: "arbre", des: "arbres", pl: "papillons", d: "papillon" as ObjetId, prep: "Sur chaque" },
        { un: "patère", des: "patères", pl: "chapeaux", d: "chapeau" as ObjetId, prep: "Sur chaque" },
      ]);
      const somme = Array.from({ length: groupes }, () => k).join(" + ");
      const explication = exp(
        "Des groupes qui ont tous la même quantité se comptent par additions répétées.",
        "On additionne la quantité d'un groupe autant de fois qu'il y a de groupes.",
        `${somme} = ${total}. On dit aussi « ${groupes} fois ${k} ».`,
        `Il y a ${total} ${G.pl}.`,
      );
      const canvas = rangees(G.d, Array.from({ length: groupes }, () => k), k <= 3 ? 2 : 1);
      const debut = `Il y a ${groupes} ${G.des}. ${G.prep} ${G.un}, il y a ${k} ${G.pl}.`;
      // Leurres d'enfant : additionner les deux nombres, inverser les rôles, un groupe de trop ou de moins.
      const repete = (n: number, fois: number) => Array.from({ length: fois }, () => n).join(" + ");
      const candidats = [
        `${groupes} + ${k}`,
        repete(groupes, k),
        repete(k, groupes + 1),
        repete(k, groupes - 1),
        k !== groupes ? `${Math.max(k, groupes)} - ${Math.min(k, groupes)}` : repete(k, groupes + 2),
        repete(k + 1, groupes),
      ];
      const leurres = [...new Set(candidats)].filter((x) => x !== somme && x !== String(k)).slice(0, 3);
      const famille = randomInt(0, 2);
      if (famille === 0) {
        const t = randomChoice([`Combien ${de(G.pl)} en tout ?`, `Combien y a-t-il ${de(G.pl)} ?`, `Compte les ${G.pl}. Combien en tout ?`]);
        return court(`${debut} ${t}`, total, explication, canvas, [groupes + k, total + k, total - k]);
      }
      if (famille === 1) {
        const t = randomChoice(["Quel calcul donne le nombre total ?", "Choisis le bon calcul.", "Quel calcul permet de tout compter ?"]);
        return qcm(
          `${debut} ${t}`,
          makeChoices(somme, leurres),
          somme,
          explication,
          canvas,
        );
      }
      const t = randomChoice([`Que veut dire « ${groupes} fois ${k} » ?`, `« ${groupes} fois ${k} », c'est quel calcul ?`, `Quelle addition est la même chose que « ${groupes} fois ${k} » ?`]);
      return qcm(
        t,
        makeChoices(somme, leurres),
        somme,
        explication,
        canvas,
      );
    },
  ),

  /* =========================================================
     CP_ADD_SOUS_DEFI
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_add_sous_defi_fixed_1",
    ...COMMUN,
    microId: "cp_add_sous_defi",
    difficulty: 5,
    text: "Dans la boîte, j'ai mangé 6 bonbons et il en reste encore 21. Combien y avait-il de bonbons dans la boîte au départ ?",
    format: "qcm",
    choices: ["15", "27", "26", "37"],
    expected: ["27"],
    comparator: "mcq_exact",
    hint: "Ce qui reste plus ce qui a été mangé, cela redonne le début.",
    explanation: exp(
      "Quand on cherche le départ, on remonte le temps : on remet ce qui a été enlevé.",
      "On additionne ce qui reste et ce qui a été pris.",
      "Il reste 21 bonbons et 6 ont été mangés : 21 + 6 = 27. Le mot « mangé » fait penser à une soustraction, mais c'est le DÉPART qu'on cherche.",
      "Il y avait 27 bonbons au départ.",
    ),
    tags: ["cp", "addition_soustraction", "defi", "piege"],
  },
  gabarit(
    "cp_add_sous_defi_tpl_1",
    "cp_add_sous_defi",
    5,
    "On cherche le DÉPART : remets ce qui a été enlevé.",
    ["defi", "piege", "canvas"],
    () => {
      const reste = randomInt(10, 40);
      const pris = randomInt(3, 15);
      const depart = reste + pris;
      const p = enfant();
      const h = randomChoice([
        { pl: "bonbons", v: `${maj(p.il)} en a mangé ${pris}` },
        { pl: "billes", v: `${maj(p.il)} en a perdu ${pris} à la récré` },
        { pl: "images", v: `${maj(p.il)} en a donné ${pris}` },
        { pl: "autocollants", v: `${maj(p.il)} en a collé ${pris}` },
        { pl: "perles", v: `${maj(p.il)} en a mis ${pris} sur un collier` },
        { pl: "cartes de dragons", v: `${maj(p.il)} en a échangé ${pris}` },
        { pl: "graines", v: `${maj(p.il)} en a donné ${pris} à Pic` },
        { pl: "crayons", v: `${maj(p.il)} en a prêté ${pris}` },
        { pl: "coquillages", v: `${maj(p.il)} en a rendu ${pris} à la mer` },
      ]);
      const q = randomChoice([
        `Combien ${de(h.pl)} avait-${p.il} au départ ?`,
        `Combien ${de(h.pl)} avait-${p.il} avant ?`,
        `Retrouve le nombre ${de(h.pl)} du début.`,
      ]);
      const texte = randomChoice([
        `${p.nom} avait des ${h.pl}. ${h.v}. Il lui en reste ${reste}. ${q}`,
        `Au début, ${p.nom} avait un tas de ${h.pl}. ${h.v}. Maintenant, il lui en reste ${reste}. ${q}`,
      ]);
      return court(
        texte,
        depart,
        exp(
          "Pour retrouver le départ, on remet ce qui a été enlevé.",
          "On additionne ce qui reste et ce qui est parti.",
          `${reste} + ${pris} = ${depart}. Le verbe fait penser à une soustraction, mais on cherche le départ : il était plus grand que ce qui reste.`,
          `Au départ, il y en avait ${depart}.`,
        ),
        {
          kind: "schema_barre",
          total: "?",
          parts: [
            { label: "reste", value: String(reste) },
            { label: "parti", value: String(pris) },
          ],
          display: { showTotal: true, showPartLabels: true, showValues: true },
        },
        [reste - pris, depart + 10, depart - 10, depart + 1],
      );
    },
  ),
  gabarit(
    "cp_add_sous_defi_tpl_2",
    "cp_add_sous_defi",
    5,
    "Fais les deux étapes dans l'ordre.",
    ["defi", "canvas"],
    () => {
      const depart = randomInt(15, 29);
      const moins = randomInt(3, 10);
      const plus = randomInt(2, 8);
      const total = depart - moins + plus;
      const s = randomChoice([
        { t: `Il y avait ${depart} enfants dans le bus. Au premier arrêt, ${moins} descendent. Au deuxième arrêt, ${plus} montent.`, q: "Combien d'enfants dans le bus maintenant ?" },
        { t: `Il y a ${depart} poissons dans le bassin. ${moins} partent dans la rivière. Puis ${plus} reviennent.`, q: "Combien de poissons dans le bassin ?" },
        { t: `Sur la branche, ${depart} oiseaux. ${moins} s'envolent. Puis ${plus} se posent.`, q: "Combien d'oiseaux sur la branche ?" },
        { t: `La boulangère a ${depart} croissants. Elle en vend ${moins}. Puis elle en cuit ${plus}.`, q: "Combien de croissants a-t-elle ?" },
        { t: `Dans la piscine, il y a ${depart} enfants. ${moins} sortent. Puis ${plus} sautent dans l'eau.`, q: "Combien d'enfants dans la piscine ?" },
        { t: `Le bateau pirate porte ${depart} pirates. ${moins} descendent sur l'île. Puis ${plus} remontent.`, q: "Combien de pirates sur le bateau ?" },
        { t: `Au zoo, ${depart} singes sont dans l'arbre. ${moins} descendent manger. Puis ${plus} remontent.`, q: "Combien de singes dans l'arbre ?" },
        { t: `Nina a ${depart} billes. Elle en perd ${moins}. Puis elle en gagne ${plus}.`, q: "Combien de billes a-t-elle ?" },
        { t: `Dans la bibliothèque, ${depart} livres sont sur la table. On en range ${moins}. Puis on en pose ${plus}.`, q: "Combien de livres sur la table ?" },
        { t: `Dans la fusée, il y a ${depart} caisses. On en sort ${moins}. Puis on en charge ${plus}.`, q: "Combien de caisses dans la fusée ?" },
      ]);
      const q = randomChoice([s.q, "Combien maintenant ?", "Trouve le nombre à la fin."]);
      return court(
        `${s.t} ${q}`,
        total,
        exp(
          "Un problème en deux étapes se résout dans l'ordre où les choses arrivent.",
          "On fait la première étape, on note le résultat, puis la seconde.",
          `D'abord : ${depart} - ${moins} = ${depart - moins}. Ensuite : ${depart - moins} + ${plus} = ${total}.`,
          `À la fin : ${total}.`,
        ),
        s.t.startsWith("Nina") ? parle("nina", `J'avais ${depart} billes !`, "sourire") : undefined,
        [depart + moins + plus, depart - moins - plus, depart - moins, total + 10],
      );
    },
  ),
];
