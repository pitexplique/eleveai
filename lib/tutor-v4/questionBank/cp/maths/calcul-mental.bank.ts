// lib/tutor-v4/questionBank/cp/maths/calcul-mental.bank.ts
//
// Le calcul mental du CP, écrit à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « La fluence attendue en fin de CP est la restitution de NEUF RÉSULTATS
//     EN TROIS MINUTES » ; l'élève sait aussi compléter huit égalités à trou
//     en une minute ;
//   — « Tous les travaux de calcul mental sont menés sur le champ numérique du
//     CP (nombres jusqu'à 100) » : les nombres en jeu ET les résultats
//     cherchés restent inférieurs ou égaux à cent ;
//   — MÉMORISER : les tables d'addition dans les deux sens ; les doubles des
//     nombres de 1 à 10 et des dizaines entières 20, 30, 40, 50 ; les moitiés
//     des nombres pairs de 2 à 20 et des dizaines entières 40, 60, 80, 100 ;
//   — NUMÉRATION : ajouter ou soustraire 1 ou 2 ; ajouter ou soustraire 10 ;
//     ajouter ou soustraire 20, 30, 40, 50, 60, 70, 80 ou 90 ;
//   — PROCÉDURES, que le BO nomme une à une : trouver le complément à la
//     dizaine supérieure ; ajouter un nombre inférieur à 9 ; ajouter 9 ;
//     ajouter deux nombres inférieurs à 100 (l'ardoise du BO : 47 + 28,
//     40 + 20 = 60, 7 + 8 = 15, 60 + 15 = 75) ; déterminer la moitié d'un
//     nombre pair ; soustraire un nombre inférieur à 10 à un nombre entier de
//     dizaines.
//   ⛔ « Les élèves ne seront pas amenés à utiliser de calculatrice au
//     cycle 2. »
//
// LE PIÈGE DE LA NOTION : ajouter 10 en touchant le mauvais chiffre. L'élève
// qui calcule 37 + 10 et répond 38 a ajouté une unité au lieu d'une dizaine.
// Son cousin vit dans le comptage sur les doigts : pour 3 + 2, on part de 3 et
// on avance de DEUX — quatre, cinq — et non « trois, quatre ».
//
// ⭐ 10/11/2026 — ROBUSTESSE ET DESSINS (enfants de 6 ans). Chaque gabarit
// tire une SITUATION (le goûter, la ferme, l'aquarium, la fête…) et une
// TOURNURE ; la question se prend aussi par l'autre bout (le résultat donné,
// on cherche la donnée). Mesure : scripts/mesurer-squelettes-coach.ts cp
// calcul_mental. Les dessins AIDENT À COMPTER sans écrire la réponse :
// cadres de dix (jetons rouges + jetons bleus), barres de dix et cubes,
// objets à compter, pièces et billets, un enfant de la troupe qui parle.
// ⛔ Retenue (passage de la dizaine dans un calcul à deux chiffres) seulement
// à ★4-★5. Phrases courtes : une idée par phrase.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

import type {
  BaseDixCanvasData,
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
  { pl: "oiseaux", sg: "oiseau", lieu: "sur la branche", dessin: "oiseau", arrive: (n) => `${n} autres se posent.`, part: (n) => `${n} oiseaux s'envolent.` },
  { pl: "poissons", sg: "poisson", lieu: "dans l'aquarium", dessin: "poisson", arrive: (n) => `On en ajoute ${n}.`, part: (n) => `${n} poissons vont dans l'autre bassin.` },
  { pl: "pommes", sg: "pomme", lieu: "dans le panier", dessin: "pomme", arrive: (n) => `On en ajoute ${n}.`, part: (n) => `On prend ${n} pommes pour la tarte.` },
  { pl: "bananes", sg: "banane", lieu: "sur la table", dessin: "banane", arrive: (n) => `On en pose ${n} autres.`, part: (n) => `Les enfants mangent ${n} bananes.` },
  { pl: "ballons", sg: "ballon", lieu: "à la fête", arrive: (n) => `On en gonfle ${n} autres.`, part: (n) => `${n} ballons s'envolent dans le ciel.` },
  { pl: "papillons", sg: "papillon", lieu: "dans le jardin", dessin: "papillon", arrive: (n) => `${n} autres arrivent.`, part: (n) => `${n} papillons s'envolent.` },
  { pl: "fleurs", sg: "fleur", lieu: "dans le vase", dessin: "fleur", arrive: (n) => `On en ajoute ${n}.`, part: (n) => `On enlève ${n} fleurs fanées.` },
  { pl: "livres", sg: "livre", lieu: "sur l'étagère", dessin: "livre", arrive: (n) => `On en pose ${n} autres.`, part: (n) => `Les élèves empruntent ${n} livres.` },
  { pl: "voitures", sg: "voiture", lieu: "sur le tapis", dessin: "voiture", arrive: (n) => `Malo en apporte ${n}.`, part: (n) => `${n} petites voitures roulent sous le lit.` },
  { pl: "bateaux", sg: "bateau", lieu: "dans le port", dessin: "bateau", arrive: (n) => `${n} autres arrivent.`, part: (n) => `${n} bateaux partent en mer.` },
  { pl: "étoiles", sg: "étoile", lieu: "dans le ciel", dessin: "etoile", arrive: (n) => `${n} autres s'allument.`, part: (n) => `Un nuage cache ${n} étoiles.` },
  { pl: "chats", sg: "chat", lieu: "dans la cour", dessin: "chat", arrive: (n) => `${n} autres arrivent.`, part: (n) => `${n} chats vont dormir dans la grange.` },
  { pl: "chapeaux", sg: "chapeau", lieu: "dans le coffre", dessin: "chapeau", arrive: (n) => `On en ajoute ${n}.`, part: (n) => `Les clowns prennent ${n} chapeaux.` },
  { pl: "graines", sg: "graine", lieu: "dans la mangeoire", arrive: (n) => `On en ajoute ${n}.`, part: (n) => `Pic le paille-en-queue picore ${n} graines.` },
  { pl: "dinosaures", sg: "dinosaure", lieu: "dans la boîte", arrive: (n) => `Ravi en range ${n} autres.`, part: (n) => `Ravi prend ${n} dinosaures pour jouer.` },
  { pl: "croissants", sg: "croissant", lieu: "sur le plateau", arrive: (n) => `On en sort ${n} du four.`, part: (n) => `La boulangère vend ${n} croissants.` },
  { pl: "enfants", sg: "enfant", lieu: "dans la piscine", arrive: (n) => `${n} autres sautent dans l'eau.`, part: (n) => `${n} enfants sortent de l'eau.` },
  { pl: "voyageurs", sg: "voyageur", lieu: "dans le train", arrive: (n) => `${n} voyageurs montent.`, part: (n) => `${n} voyageurs descendent.` },
  { pl: "moutons", sg: "mouton", lieu: "dans le pré", arrive: (n) => `Le berger en fait entrer ${n}.`, part: (n) => `${n} moutons rentrent à la bergerie.` },
  { pl: "coquillages", sg: "coquillage", lieu: "dans le seau", arrive: (n) => `On en ramasse ${n} autres.`, part: (n) => `On rend ${n} coquillages à la mer.` },
  { pl: "bougies", sg: "bougie", lieu: "sur le gâteau", arrive: (n) => `On en plante ${n} autres.`, part: (n) => `On enlève ${n} bougies.` },
  { pl: "singes", sg: "singe", lieu: "dans l'arbre", arrive: (n) => `${n} autres grimpent.`, part: (n) => `${n} singes descendent manger.` },
];
const monde = (dessinable = false) => randomChoice(dessinable ? MONDES.filter((m) => m.dessin) : MONDES);

/** Les choses qu'un enfant possède ou collectionne. */
type Chose = { pl: string; sg: string; dessin?: ObjetId };
const CHOSES: readonly Chose[] = [
  { pl: "billes", sg: "bille" },
  { pl: "images", sg: "image" },
  { pl: "autocollants", sg: "autocollant" },
  { pl: "cartes", sg: "carte" },
  { pl: "perles", sg: "perle" },
  { pl: "crayons", sg: "crayon" },
  { pl: "coquillages", sg: "coquillage" },
  { pl: "voitures", sg: "voiture", dessin: "voiture" },
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
    "Combien maintenant ?",
    `Combien ${de(m.pl)} à la fin ?`,
    "Combien en tout ?",
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
    `Combien ${de(c.pl)} en tout ?`,
    `Ensemble, combien ${de(c.pl)} ont-${ils(p, q)} ?`,
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
const COMMUN = { niveau: "cp" as const, matiere: "maths" as const, notionId: "calcul_mental", theme: "neutral" as const };
function gabarit(
  id: string,
  microId: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
  hint: string,
  tags: string[],
  generate: () => Q,
): TutorBankItemV4 {
  return { kind: "template", id, ...COMMUN, microId, difficulty, hint, tags: ["cp", "calcul_mental", ...tags, "template"], generate };
}

export const calculMentalBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_CALCUL_TABLES_ADDITION — dans les deux sens
     Le BO insiste sur « les deux sens » : A + B = C, mais aussi
     C = A + B. C'est le même savoir, et pas la même question.
  ========================================================= */
  gabarit(
    "cp_calcul_tables_addition_tpl_3",
    "cp_calcul_tables_addition",
    3,
    "Cherche le double le plus proche, puis ajoute 1.",
    ["tables", "presque_double", "canvas"],
    () => {
      // Les « presque-doubles » : 6 + 7, 8 + 9… Le BO fait des doubles un
      // appui pour toute la table d'addition.
      const n = randomInt(2, 9);
      const total = 2 * n + 1;
      const explication = exp(
        "Un résultat de table se retrouve avec un double qu'on connaît.",
        "On prend le double le plus proche, puis on ajoute 1.",
        `${n} + ${n} = ${2 * n}. Et ${n + 1}, c'est ${n} et encore 1 : ${2 * n} + 1 = ${total}.`,
        `${n} + ${n + 1} = ${total}.`,
      );
      const famille = randomInt(0, 2);
      if (famille === 0) return court(calculNu(`${n} + ${n + 1}`), total, explication, cadres(n, n + 1));
      if (famille === 1) {
        const [p, q] = deuxEnfants();
        const c = chose(n + 1 <= 5);
        const question = randomChoice([
          `Combien ${de(c.pl)} ont-${ils(p, q)} ensemble ?`,
          `Combien ${de(c.pl)} en tout ?`,
          `Ils réunissent tout. Combien ${de(c.pl)} ?`,
        ]);
        return court(
          `${p.nom} a ${n} ${c.pl}. ${q.nom} en a ${n + 1}. ${question}`,
          total,
          explication,
          deuxCollections(c.dessin, n, n + 1),
        );
      }
      const h = histoireAjout(n, n + 1);
      return court(h.text, total, explication, h.canvas);
    },
  ),
  gabarit(
    "cp_calcul_tables_addition_tpl_1",
    "cp_calcul_tables_addition",
    2,
    "Pars du plus grand nombre et avance.",
    ["tables", "canvas"],
    () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const explication = exp(
        "Les tables d'addition donnent la somme de deux petits nombres.",
        "On la sait par cœur ; sinon, on part du plus grand et on avance.",
        `On part de ${Math.max(a, b)} et on avance de ${Math.min(a, b)} : ${a} + ${b} = ${a + b}.`,
        `${a} + ${b} = ${a + b}.`,
      );
      const famille = randomInt(0, 3);
      if (famille === 0) return court(calculNu(`${a} + ${b}`), a + b, explication, cadres(a, b));
      if (famille === 1) {
        const h = histoireReunion(a, b);
        return court(h.text, a + b, explication, h.canvas);
      }
      const h = histoireAjout(a, b);
      return court(h.text, a + b, explication, h.canvas);
    },
  ),
  gabarit(
    "cp_calcul_tables_addition_tpl_2",
    "cp_calcul_tables_addition",
    4,
    "Le résultat est déjà écrit : cherche ce qui manque.",
    ["tables", "piege", "canvas"],
    () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const total = a + b;
      const explication = exp(
        "Une table d'addition se connaît dans les deux sens : la somme, et aussi le nombre qui manque.",
        "On part du nombre connu et on avance jusqu'au total.",
        `De ${a} à ${total}, on avance de ${b} : ${a} + ${b} = ${total}.`,
        `Le nombre qui manque est ${b}.`,
      );
      const famille = randomInt(0, 2);
      if (famille === 0) {
        const t = randomChoice([
          `Complète : ${total} = ${a} + …`,
          `Complète : ${a} + … = ${total}`,
          `Quel nombre manque ? ${total} = ${a} + ?`,
          `${a} et combien font ${total} ?`,
        ]);
        return court(t, b, explication, cadres(a, 0, 2));
      }
      if (famille === 1) {
        const p = enfant();
        const c = chose();
        const t = randomChoice([
          `${p.nom} veut ${total} ${c.pl}. ${maj(p.il)} en a déjà ${a}. Combien lui en manque-t-il ?`,
          `${p.nom} a ${a} ${c.pl}. Il en faut ${total} pour le jeu. Combien en manque-t-il ?`,
          `Il faut ${total} ${c.pl}. ${p.nom} en a ${a}. Combien doit-${p.il} en trouver encore ?`,
        ]);
        return court(t, b, explication, cadres(a, 0, 2));
      }
      const m = monde();
      const t = randomChoice([
        `Il y avait ${a} ${m.pl}. Maintenant, il y en a ${total}. Combien de plus ?`,
        `Il y a ${a} ${m.pl}. On en veut ${total}. Combien en faut-il encore ?`,
      ]);
      return court(t, b, explication, cadres(a, 0, 2));
    },
  ),

  /* =========================================================
     CP_CALCUL_COMPLEMENTS_10 — les compléments à 10
  ========================================================= */
  gabarit(
    "cp_calcul_complements_10_tpl_3",
    "cp_calcul_complements_10",
    2,
    "Compte les cases vides du cadre.",
    ["complement_10", "canvas"],
    () => {
      const deja = randomInt(2, 9);
      const manque = 10 - deja;
      // Un contenant de 10 places, dont `deja` sont remplies.
      const debut = randomChoice([
        `Une boîte de 10 œufs contient seulement ${deja} œufs.`,
        `Une barquette de 10 fraises contient seulement ${deja} fraises.`,
        `Le petit train a 10 places. ${deja} enfants sont montés.`,
        `La trousse a 10 places. Il y a ${deja} crayons dedans.`,
        `Le gâteau doit avoir 10 bougies. On en a planté ${deja}.`,
        `La barque a 10 places. ${deja} pirates sont assis.`,
        `Le carton a 10 places. Il y a ${deja} bouteilles.`,
        `Il y a 10 chaises. ${deja} enfants sont assis.`,
        `La fusée a 10 hublots. Zoé en a peint ${deja}.`,
        `Le garage a 10 places. Il y a ${deja} voitures.`,
        `Le nid tient 10 œufs. Il y en a ${deja}.`,
        `L'étagère a 10 places. On y a rangé ${deja} livres.`,
        `Le bus a 10 places. ${deja} enfants sont assis.`,
        `La boîte de 10 cases contient ${deja} jetons.`,
      ]);
      const question = randomChoice([
        "Combien en manque-t-il ?",
        "Combien en faut-il encore ?",
        "Il en manque combien ?",
        "Combien pour que ce soit plein ?",
      ]);
      return court(
        `${debut} ${question}`,
        manque,
        exp(
          "Compléter à 10, c'est trouver ce qui manque pour une dizaine pleine.",
          "On part de ce qu'on a et on compte jusqu'à 10.",
          `De ${deja}, on avance jusqu'à 10 : cela fait ${manque} pas. ${deja} + ${manque} = 10.`,
          `Il en manque ${manque}.`,
        ),
        cadres(deja, 0, 1),
        [deja, 10 + deja, manque + 1, manque - 1],
      );
    },
  ),
  gabarit(
    "cp_calcul_complements_10_tpl_1",
    "cp_calcul_complements_10",
    2,
    "Les deux nombres réunis doivent faire 10.",
    ["complement_10", "canvas"],
    () => {
      const n = randomInt(1, 9);
      const c = 10 - n;
      const explication = exp(
        "Le complément à 10, c'est ce qui manque pour arriver à dix.",
        "On part du nombre et on compte jusqu'à 10.",
        `${n} + ${c} = 10. Ces deux nombres vont ensemble : ils font une dizaine.`,
        `La réponse est ${c}.`,
      );
      const famille = randomInt(0, 2);
      if (famille === 0) {
        const t = randomChoice([
          `Complète : ${n} + … = 10`,
          `Complète : … + ${n} = 10`,
          `Quel nombre faut-il ajouter à ${n} pour avoir 10 ?`,
          `${n} et combien font 10 ?`,
          `Complète : 10 = ${n} + …`,
        ]);
        return court(t, c, explication, cadres(n, 0, 1), [n, 10 + n, c + 1, c - 1]);
      }
      // Un tout de 10, deux parts : on connaît l'une, on cherche l'autre.
      const s = randomChoice([
        { tout: "Il y a 10 enfants dans l'équipe.", p1: "filles", p2: "garçons" },
        { tout: "Le collier a 10 perles.", p1: "perles rouges", p2: "perles bleues" },
        { tout: "Il y a 10 poules.", p1: "poules dedans", p2: "poules dehors" },
        { tout: "Il y a 10 pirates.", p1: "pirates sur le pont", p2: "pirates dans la cale" },
        { tout: "Nina a 10 doigts.", p1: "doigts levés", p2: "doigts baissés" },
        { tout: "Il y a 10 dinosaures.", p1: "dinosaures verts", p2: "dinosaures orange" },
        { tout: "Le zoo a 10 singes.", p1: "singes dans l'arbre", p2: "singes au sol" },
        { tout: "Le vétérinaire soigne 10 animaux.", p1: "chiens", p2: "chats" },
        { tout: "La fusée emporte 10 caisses.", p1: "caisses de nourriture", p2: "caisses d'outils" },
        { tout: "Le cirque a 10 clowns.", p1: "clowns sur la piste", p2: "clowns cachés" },
        { tout: "Il y a 10 billes.", p1: "billes rouges", p2: "billes vertes" },
        { tout: "La maîtresse a 10 cahiers.", p1: "cahiers rouges", p2: "cahiers bleus" },
      ]);
      // 2 à 8 : jamais « 1 perles rouges ».
      const k = randomInt(2, 8);
      const question = randomChoice([
        `Il y a ${k} ${s.p1}. Combien de ${s.p2} ?`,
        `${k} ${s.p1}. Combien de ${s.p2} ?`,
        `On compte ${k} ${s.p1}. Et combien de ${s.p2} ?`,
      ]);
      return court(
        `${s.tout} ${question}`.replace(/ de ([aeiouyéèh])/g, " d'$1"),
        10 - k,
        exp(
          "Le complément à 10, c'est ce qui manque pour arriver à dix.",
          "On part du nombre connu et on compte jusqu'à 10.",
          `${k} + ${10 - k} = 10.`,
          `La réponse est ${10 - k}.`,
        ),
        cadres(k, 0, 1),
      );
    },
  ),
  gabarit(
    "cp_calcul_complements_10_tpl_2",
    "cp_calcul_complements_10",
    3,
    "Cherche le nombre qui va avec, pour faire 10.",
    ["complement_10", "canvas"],
    () => {
      const n = randomInt(1, 9);
      const c = 10 - n;
      const explication = exp(
        "Deux nombres qui font 10 ensemble sont des compléments à 10.",
        "On enlève le nombre connu à 10.",
        `10 - ${n} = ${c}. On vérifie : ${n} + ${c} = 10.`,
        `La réponse est ${c}.`,
      );
      const famille = randomInt(0, 2);
      if (famille === 0) {
        const p = enfant();
        const t = randomChoice([
          `${p.nom} a un billet de 10 €. ${maj(p.il)} achète un jouet à ${n} €. Combien d'euros lui reste-t-il ?`,
          `${p.nom} paie un livre à ${n} € avec un billet de 10 €. Combien la vendeuse lui rend-elle ?`,
          `Une glace coûte ${n} €. ${p.nom} donne un billet de 10 €. Combien lui rend-on ?`,
        ]);
        return qcm(t, choixNombres(c, [10 + n, n, c + 1, c - 1], "€"), `${c} €`, explication, { kind: "monnaie", elements: [{ valeur: "10e" }] });
      }
      if (famille === 1) {
        const t = randomChoice([
          `Deux nombres font 10 ensemble. L'un est ${n}. Quel est l'autre ?`,
          `Quel nombre va avec ${n} pour faire 10 ?`,
          `${n} + ? = 10. Choisis le bon nombre.`,
          `Pic veut 10 graines. Il en a ${n}. Combien lui en manque-t-il ?`,
        ]);
        return qcm(t, choixNombres(c, [10 + n, n, c + 1, c - 1]), String(c), explication, cadres(n, 0, 1));
      }
      const [p, q] = deuxEnfants();
      const t = randomChoice([
        `${p.nom} et ${q.nom} lancent 10 anneaux. ${p.nom} en lance ${n}. Combien ${q.nom} en lance-t-${q.il} ?`,
        `Il y a 10 parts de gâteau. ${p.nom} en sert ${n}, ${q.nom} le reste. Combien pour ${q.nom} ?`,
        `${p.nom} et ${q.nom} ont 10 bonbons à eux deux. ${p.nom} en a ${n}. Combien en a ${q.nom} ?`,
      ]);
      return qcm(t, choixNombres(c, [10 + n, n, c + 1, c - 1]), String(c), explication, cadres(n, 0, 1));
    },
  ),

  /* =========================================================
     CP_CALCUL_DOUBLES — les doubles jusqu'à 10, et ceux des
     dizaines entières 20, 30, 40 et 50.
  ========================================================= */
  gabarit(
    "cp_calcul_doubles_tpl_3",
    "cp_calcul_doubles",
    3,
    "Deux fois la même chose : c'est un double.",
    ["doubles", "canvas"],
    () => {
      const n = randomInt(2, 10);
      const s = randomChoice([
        { t: (p: Enfant) => `${p.nom} a ${n} billes dans chaque poche. ${maj(p.il)} a deux poches.`, pl: "billes" },
        { t: (p: Enfant) => `${p.nom} a deux paquets de ${n} images.`, pl: "images" },
        { t: (p: Enfant) => `${p.nom} tient ${n} cerises dans chaque main.`, pl: "cerises" },
        { t: () => `La coccinelle a ${n} points sur chaque aile. Elle a deux ailes.`, pl: "points" },
        { t: () => `Deux équipes jouent au foot. Chaque équipe a ${n} joueurs.`, pl: "joueurs" },
        { t: () => `Le dragon a deux têtes. Chaque tête a ${n} dents.`, pl: "dents" },
        { t: () => `Le domino géant a ${n} points de chaque côté.`, pl: "points" },
        { t: () => `Dans la fusée, il y a deux rangées de ${n} sièges.`, pl: "sièges" },
        { t: () => `La boulangère remplit deux plateaux de ${n} croissants.`, pl: "croissants" },
        { t: (p: Enfant) => `${p.nom} construit deux tours de ${n} cubes.`, pl: "cubes" },
        { t: () => `Le train a deux wagons. Chaque wagon porte ${n} voyageurs.`, pl: "voyageurs" },
        { t: () => `Au cirque, deux clowns jonglent chacun avec ${n} balles.`, pl: "balles" },
        { t: () => `Le jardinier plante deux rangs de ${n} salades.`, pl: "salades" },
        { t: () => `Deux nids ont chacun ${n} œufs.`, pl: "œufs" },
      ]);
      const question = randomChoice([`Combien ${de(s.pl)} en tout ?`, `Combien y a-t-il ${de(s.pl)} ?`, `Trouve le nombre ${de(s.pl)}.`]);
      return court(
        `${s.t(enfant())} ${question}`,
        2 * n,
        exp(
          "Deux quantités pareilles réunies, c'est un double.",
          "On ajoute le nombre à lui-même.",
          `${n} + ${n} = ${2 * n}. C'est le double de ${n}.`,
          `Cela fait ${2 * n} ${s.pl}.`,
        ),
        cadres(n, n),
        [n, n + 2, 2 * n + 1, 2 * n - 1],
      );
    },
  ),
  gabarit(
    "cp_calcul_doubles_tpl_1",
    "cp_calcul_doubles",
    2,
    "Deux fois le même nombre.",
    ["doubles", "canvas"],
    () => {
      const n = randomChoice([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50]);
      const dizaines = n >= 20;
      const t = randomChoice([
        `Quel est le double de ${n} ?`,
        `Calcule le double de ${n}.`,
        `Combien font ${n} + ${n} ?`,
        `Le double de ${n}, c'est combien ?`,
        `Combien font deux fois ${n} ?`,
        `${n} + ${n} = ?`,
        `${randomChoice(TROUPE).nom} dit un nombre : ${n}. Quel est son double ?`,
        `Pic le paille-en-queue voit ${n} graines, puis encore ${n}. Combien de graines ?`,
        `Quel nombre est le double de ${n} ?`,
      ]);
      return court(
        t,
        2 * n,
        exp(
          "Le double d'un nombre, c'est ce nombre ajouté à lui-même.",
          "On ajoute le nombre à lui-même.",
          dizaines
            ? `${n}, c'est ${n / 10} dizaines. ${n / 10} + ${n / 10} = ${n / 5} dizaines, donc ${n} + ${n} = ${2 * n}.`
            : `${n} + ${n} = ${2 * n}.`,
          `Le double de ${n} est ${2 * n}.`,
        ),
        dizaines ? materiel(n) : cadres(n, n),
        dizaines ? [n + 20, n + 2, 2 * n + 10, n] : [n, n + 2, 2 * n + 1, 2 * n - 1],
      );
    },
  ),
  gabarit(
    "cp_calcul_doubles_tpl_2",
    "cp_calcul_doubles",
    3,
    "On te donne le double : cherche le nombre de départ.",
    ["doubles", "canvas"],
    () => {
      const n = randomInt(2, 10);
      const d = 2 * n;
      const explication = exp(
        "Chercher le nombre dont on connaît le double, c'est chercher sa moitié.",
        "On cherche le nombre qui, ajouté à lui-même, donne le total.",
        `${n} + ${n} = ${d}. Le nombre cherché est donc ${n}.`,
        `C'est ${n}.`,
      );
      const famille = randomInt(0, 1);
      if (famille === 0) {
        const t = randomChoice([
          `Le double d'un nombre est ${d}. Quel est ce nombre ?`,
          `Complète : … + … = ${d}, avec deux fois le même nombre.`,
          `Quel nombre, ajouté à lui-même, donne ${d} ?`,
          `${d} est le double de quel nombre ?`,
        ]);
        return court(t, n, explication, cadres(d, 0, 2), [d, n + 1, n - 1, n + 2]);
      }
      const p = enfant();
      const s = randomChoice([
        `${p.nom} a ${d} billes. ${maj(p.il)} en met autant dans chaque poche.`,
        `${p.nom} range ${d} livres sur deux étagères, autant sur chacune.`,
        `Il y a ${d} enfants. Ils forment deux équipes pareilles.`,
        `La coccinelle a ${d} points. Elle en a autant sur chaque aile.`,
        `Deux nids ont ${d} œufs en tout, autant chacun.`,
        `${p.nom} a ${d} cerises. ${maj(p.il)} en tient autant dans chaque main.`,
        `Le dragon a deux têtes et ${d} dents, autant sur chaque tête.`,
        `Le jardinier plante ${d} salades en deux rangs pareils.`,
      ]);
      const question = randomChoice([
        "Combien dans chaque part ?",
        "Combien dans une seule part ?",
        "Combien pour une part ?",
      ]);
      return court(`${s} ${question}`, n, explication, cadres(d, 0, 2), [d, n + 1, n - 1, n + 2]);
    },
  ),

  /* =========================================================
     CP_CALCUL_MOITIE — la moitié d'un nombre pair
     Le BO donne la procédure : 46 = 40 + 6, moitié de 40 = 20,
     moitié de 6 = 3, donc 23.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_calcul_moitie_fixed_1",
    ...COMMUN,
    microId: "cp_calcul_moitie",
    difficulty: 4,
    text: "Quelle est la moitié de 46 ?",
    format: "qcm",
    choices: ["23", "32", "22", "26"],
    expected: ["23"],
    comparator: "mcq_exact",
    hint: "Coupe le nombre en deux morceaux : 40 et 6.",
    explanation: exp(
      "La moitié d'un nombre, c'est une des deux parts égales quand on le partage en deux.",
      "On coupe le nombre en dizaines et unités, on prend la moitié de chaque morceau, puis on réunit.",
      "46 = 40 + 6. La moitié de 40 est 20, la moitié de 6 est 3. On réunit : 20 + 3 = 23.",
      "La moitié de 46 est 23.",
    ),
    canvas: materiel(46),
    tags: ["cp", "calcul_mental", "moitie", "piege", "canvas"],
  },
  gabarit(
    "cp_calcul_moitie_tpl_1",
    "cp_calcul_moitie",
    2,
    "En deux parts égales.",
    ["moitie", "canvas"],
    () => {
      const n = randomChoice([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 40, 60, 80, 100]);
      const m = n / 2;
      const explication = exp(
        "La moitié, c'est une des deux parts égales d'un partage en deux.",
        "On cherche le nombre qui, ajouté à lui-même, redonne le nombre de départ.",
        `${m} + ${m} = ${n}. La moitié de ${n} est donc ${m}.`,
        `C'est ${m}.`,
      );
      const canvas = n <= 20 ? cadres(n, 0, 2) : materiel(n);
      if (randomInt(0, 2) === 0) {
        const t = randomChoice([
          `Quelle est la moitié de ${n} ?`,
          `Partage ${n} en deux parts égales. Combien dans chaque part ?`,
          `La moitié de ${n}, c'est combien ?`,
          `Quel nombre est la moitié de ${n} ?`,
        ]);
        return court(t, m, explication, canvas, [n, m + 1, m - 1, m + 2]);
      }
      const [p, q] = deuxEnfants();
      const c = chose();
      const t = randomChoice([
        `${p.nom} et ${q.nom} se partagent ${n} ${c.pl}. Chacun en a autant. Combien pour ${p.nom} ?`,
        `${p.nom} a ${n} ${c.pl}. ${maj(p.il)} en donne la moitié à ${q.nom}. Combien en donne-t-${p.il} ?`,
        `${p.nom} range ${n} ${c.pl} dans deux boîtes, autant dans chaque boîte. Combien par boîte ?`,
        `${n} ${c.pl} pour ${p.nom} et ${q.nom}, en parts égales. Combien chacun ?`,
      ]);
      return court(t, m, explication, canvas, [n, m + 1, m - 1, m + 2]);
    },
  ),
  gabarit(
    "cp_calcul_moitie_tpl_2",
    "cp_calcul_moitie",
    5,
    "Coupe le nombre en dizaines et unités avant de partager.",
    ["moitie", "canvas"],
    () => {
      const d = randomChoice([2, 4, 6, 8]);
      const u = randomChoice([2, 4, 6, 8]);
      const n = d * 10 + u;
      const explication = exp(
        "Un nombre pair se partage en deux parts égales.",
        "On le coupe en dizaines et unités, on prend la moitié de chaque morceau, puis on réunit.",
        `${n} = ${d * 10} + ${u}. La moitié de ${d * 10} est ${d * 5}, la moitié de ${u} est ${u / 2}. On réunit : ${d * 5} + ${u / 2} = ${n / 2}.`,
        `La moitié de ${n} est ${n / 2}.`,
      );
      const famille = randomChoice([0, 1, 1, 2]);
      if (famille === 0) {
        const t = randomChoice([
          `Quelle est la moitié de ${n} ?`,
          `Partage ${n} en deux parts égales. Combien dans chaque part ?`,
          `La moitié de ${n}, c'est combien ?`,
          `Quel nombre, ajouté à lui-même, donne ${n} ?`,
          `${n} est le double de quel nombre ?`,
          `Coupe ${n} en deux parts pareilles. Que vaut une part ?`,
        ]);
        return court(t, n / 2, explication, materiel(n), [d * 5 + u, d * 10 + u / 2, n / 2 + 1, n / 2 - 1]);
      }
      if (famille === 1) {
        const [p, q] = deuxEnfants();
        const c = chose();
        const t = randomChoice([
          `${p.nom} et ${q.nom} se partagent ${n} ${c.pl} en deux parts égales. Combien chacun ?`,
          `${p.nom} a ${n} ${c.pl}. ${maj(p.il)} en donne la moitié à ${q.nom}. Combien en donne-t-${p.il} ?`,
          `${p.nom} range ${n} ${c.pl} dans deux boîtes pareilles. Combien dans une boîte ?`,
          `${n} ${c.pl} pour deux équipes, autant pour chacune. Combien par équipe ?`,
        ]);
        return court(t, n / 2, explication, materiel(n), [d * 5 + u, d * 10 + u / 2, n / 2 + 1, n / 2 - 1]);
      }
      const [p, q] = deuxEnfants();
      const t = randomChoice([
        `${p.nom} et ${q.nom} se partagent ${n} € en parts égales. Combien d'euros chacun ?`,
        `${p.nom} a ${n} €. ${maj(p.il)} en garde la moitié pour la kermesse. Combien garde-t-${p.il} ?`,
        `Un jeu coûte ${n} €. ${p.nom} et ${q.nom} paient chacun la moitié. Combien paie ${p.nom} ?`,
        `${p.nom} met la moitié de ses ${n} € dans sa tirelire. Combien d'euros met-${p.il} ?`,
      ]);
      return qcm(t, choixNombres(n / 2, [d * 5 + u, d + u / 2, n / 2 + 10, n / 2 - 1], "€"), `${n / 2} €`, explication, porteMonnaie(n));
    },
  ),

  /* =========================================================
     CP_CALCUL_PLUS_MOINS_1_2_10 — LE piège de la notion
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_calcul_plus_moins_1_2_10_fixed_1",
    ...COMMUN,
    microId: "cp_calcul_plus_moins_1_2_10",
    difficulty: 3,
    text: "Combien font 37 + 10 ?",
    format: "qcm",
    choices: ["47", "38", "137", "39"],
    expected: ["47"],
    comparator: "mcq_exact",
    hint: "Ajouter 10, c'est ajouter UNE DIZAINE : c'est le chiffre de gauche qui bouge.",
    explanation: exp(
      "Ajouter 10 à un nombre, c'est lui ajouter une dizaine.",
      "Le chiffre des dizaines monte de un. Les unités ne bougent pas.",
      "37, c'est 3 dizaines et 7 unités. Une dizaine de plus : 4 dizaines et toujours 7 unités, soit 47. Répondre 38, c'est avoir ajouté une unité au lieu d'une dizaine.",
      "37 + 10 = 47.",
    ),
    canvas: materiel(37),
    tags: ["cp", "calcul_mental", "plus_dix", "piege", "qcm", "canvas"],
  },
  gabarit(
    "cp_calcul_plus_moins_1_2_10_tpl_1",
    "cp_calcul_plus_moins_1_2_10",
    3,
    "Regarde bien si on ajoute une unité ou une dizaine.",
    ["plus_dix", "piege", "canvas"],
    () => {
      // ★3 : sans passer la dizaine — les unités restent entre 2 et 7.
      const n = randomInt(1, 8) * 10 + randomInt(2, 7);
      const pas = randomChoice([1, 2, 10]);
      const ajoute = pas === 10 ? n + 10 <= 99 && randomChoice([true, false]) : randomChoice([true, false]);
      const r = ajoute ? n + pas : n - pas;
      const signe = ajoute ? "+" : "-";
      const explication = exp(
        pas === 10 ? "Ajouter ou retirer 10, c'est ajouter ou retirer UNE DIZAINE." : "Ajouter ou retirer 1 ou 2, c'est avancer ou reculer dans la suite des nombres.",
        pas === 10 ? "Le chiffre des dizaines change de un. Les unités ne bougent pas." : `On ${ajoute ? "avance" : "recule"} de ${pas}.`,
        pas === 10
          ? `${n}, c'est ${Math.floor(n / 10)} dizaines et ${n % 10} unités. ${ajoute ? "Une dizaine de plus" : "Une dizaine de moins"} : ${r}.`
          : `On part de ${n} et on ${ajoute ? "avance" : "recule"} de ${pas} : ${r}.`,
        `${n} ${signe} ${pas} = ${r}.`,
      );
      const famille = randomInt(0, 2);
      if (famille === 0) return court(calculNu(`${n} ${signe} ${pas}`), r, explication, materiel(n));
      const p = enfant();
      const s1 = pas === 1;
      const s = randomChoice([
        { t: `${p.nom} est à la page ${n}. ${maj(p.il)} ${ajoute ? "avance" : "recule"} de ${pas} ${s1 ? "page" : "pages"}.`, q: `À quelle page arrive-t-${p.il} ?` },
        { t: `Le pion ${deN(p)} est sur la case ${n}. Il ${ajoute ? "avance" : "recule"} de ${pas} ${s1 ? "case" : "cases"}.`, q: "Où arrive-t-il ?" },
        { t: `${p.nom} a ${n} autocollants. ${maj(p.il)} en ${ajoute ? "gagne" : "colle"} ${pas}.`, q: ajoute ? `Combien en a-t-${p.il} maintenant ?` : "Combien lui en reste-t-il ?" },
        { t: `Il y a ${n} enfants dans la cour. ${s1 ? `1 enfant ${ajoute ? "arrive" : "rentre en classe"}` : `${pas} enfants ${ajoute ? "arrivent" : "rentrent en classe"}`}.`, q: "Combien maintenant ?" },
        { t: `La boulangère a ${n} croissants. Elle en ${ajoute ? "cuit encore" : "vend"} ${pas}.`, q: "Combien en a-t-elle maintenant ?" },
        { t: `La fusée est à ${n} mètres. Elle ${ajoute ? "monte" : "descend"} de ${pas}.`, q: "À combien de mètres est-elle ?" },
        { t: `Le train porte ${n} voyageurs. ${s1 ? `1 voyageur ${ajoute ? "monte" : "descend"}` : `${pas} voyageurs ${ajoute ? "montent" : "descendent"}`}.`, q: "Combien de voyageurs maintenant ?" },
        { t: `Pic a ${n} graines. On lui en ${ajoute ? "donne" : "prend"} ${pas}.`, q: "Combien en a-t-il maintenant ?" },
      ]);
      return court(`${s.t} ${s.q}`, r, explication, materiel(n));
    },
  ),
  gabarit(
    "cp_calcul_plus_moins_1_2_10_tpl_2",
    "cp_calcul_plus_moins_1_2_10",
    4,
    "Une dizaine de plus, ce n'est pas une unité de plus.",
    ["plus_dix", "piege", "canvas"],
    () => {
      const n = randomInt(21, 79);
      const ajoute = randomChoice([true, true, false]);
      const r = ajoute ? n + 10 : n - 10;
      const signe = ajoute ? "+" : "-";
      const pieges = ajoute ? [n + 1, n - 10, n + 2, n + 20] : [n - 1, n + 10, n - 2, n - 20];
      const explication = exp(
        `${ajoute ? "Ajouter" : "Retirer"} 10, c'est ${ajoute ? "ajouter" : "retirer"} une dizaine.`,
        "Le chiffre des dizaines change de un. Les unités ne bougent pas.",
        `${n}, c'est ${Math.floor(n / 10)} dizaines et ${n % 10} unités. Avec une dizaine ${ajoute ? "de plus" : "de moins"} : ${r}. Répondre ${pieges[0]}, c'est avoir changé les unités.`,
        `${n} ${signe} 10 = ${r}.`,
      );
      const p = enfant();
      const t = randomChoice([
        `Combien font ${n} ${signe} 10 ?`,
        `Quel nombre a une dizaine de ${ajoute ? "plus" : "moins"} que ${n} ?`,
        `${p.nom} a ${n} billes. ${maj(p.il)} ${ajoute ? "gagne" : "perd"} un sac de 10 billes. Combien en a-t-${p.il} maintenant ?`,
        `${p.nom} a ${n} €. ${maj(p.il)} ${ajoute ? "reçoit" : "dépense"} un billet de 10 €. Combien a-t-${p.il} maintenant ?`,
        `Le pion ${deN(p)} est sur la case ${n}. Il ${ajoute ? "avance" : "recule"} de 10 cases. Où arrive-t-il ?`,
        `Il y a ${n} œufs. On ${ajoute ? "ajoute" : "vend"} une boîte de 10 œufs. Combien d'œufs maintenant ?`,
        `${p.nom} compte de 10 en 10 ${ajoute ? "en avançant" : "en reculant"}. ${maj(p.il)} dit ${n}. Quel nombre dit-${p.il} ensuite ?`,
        `Le robot ${deN(p)} est sur la case ${n}. Il fait 10 pas ${ajoute ? "en avant" : "en arrière"}. Où arrive-t-il ?`,
      ]);
      const argent = t.includes("€");
      return qcm(
        t,
        choixNombres(r, pieges, argent ? "€" : ""),
        argent ? `${r} €` : String(r),
        explication,
        argent ? porteMonnaie(n) : materiel(n),
      );
    },
  ),

  /* =========================================================
     CP_CALCUL_DIZAINES_ENTIERES — ajouter ou retirer 20 à 90
     Le BO donne la procédure : « 30, c'est 3 dizaines. 7 dizaines
     - 3 dizaines = 4 dizaines. Donc 76 - 30 = 46. »
  ========================================================= */
  gabarit(
    "cp_calcul_dizaines_entieres_tpl_3",
    "cp_calcul_dizaines_entieres",
    5,
    "Compare les dizaines des deux nombres.",
    ["dizaines_entieres", "canvas"],
    () => {
      const u = randomInt(1, 9);
      const d1 = randomInt(2, 5);
      const d2 = randomInt(d1 + 2, 9);
      const depart = d1 * 10 + u;
      const arrivee = d2 * 10 + u;
      const pas = (d2 - d1) * 10;
      const explication = exp(
        "Deux nombres qui ont les mêmes unités ne changent que par leurs dizaines.",
        "On compare les chiffres des dizaines, puis on écrit l'écart en dizaines.",
        `${depart} a ${d1} dizaines, ${arrivee} en a ${d2}. L'écart est de ${d2 - d1} dizaines, c'est-à-dire ${pas}. Les ${u} unités ne bougent pas.`,
        `Il faut ajouter ${pas}.`,
      );
      const p = enfant();
      const famille = randomInt(0, 2);
      if (famille === 0) {
        const t = randomChoice([
          `Quel nombre faut-il ajouter à ${depart} pour obtenir ${arrivee} ?`,
          `Complète : ${depart} + … = ${arrivee}`,
          `Complète : ${arrivee} = ${depart} + …`,
          `De ${depart} à ${arrivee}, combien faut-il ajouter ?`,
        ]);
        return court(t, pas, explication, materiel(depart));
      }
      if (famille === 1) {
        const t = randomChoice([
          `${p.nom} a ${depart} €. ${maj(p.il)} veut ${arrivee} € pour un vélo. Combien d'euros lui manque-t-il ?`,
          `${p.nom} avait ${depart} €. Avec les billets de Mamie, ${p.il} a ${arrivee} €. Combien Mamie a-t-elle donné ?`,
        ]);
        return qcm(t, choixNombres(pas, [d2 - d1, pas + 10, pas - 10, arrivee], "€"), `${pas} €`, explication, porteMonnaie(depart));
      }
      const t = randomChoice([
        `Le livre ${deN(p)} a ${arrivee} pages. ${maj(p.il)} est à la page ${depart}. Combien en reste-t-il ?`,
        `Le pion ${deN(p)} est sur la case ${depart}. Il va à la case ${arrivee}. De combien avance-t-il ?`,
        `Il y avait ${depart} poussins. Il y en a maintenant ${arrivee}. Combien sont nés ?`,
        `La fusée est à ${depart} mètres. Elle doit aller à ${arrivee} mètres. De combien monte-t-elle ?`,
        `La boulangère a fait ${depart} pains. Il en faut ${arrivee}. Combien en manque-t-il ?`,
      ]);
      return court(t, pas, explication, materiel(depart));
    },
  ),
  gabarit(
    "cp_calcul_dizaines_entieres_tpl_1",
    "cp_calcul_dizaines_entieres",
    4,
    "Compte en dizaines : les unités ne bougent pas.",
    ["dizaines_entieres", "canvas"],
    () => {
      // ⚠️ Les bornes gardent le résultat sous cent, et le pas entre 20 et 90
      // (le BO : « ajouter ou soustraire 20, 30… 90 » ; 10 a sa micro).
      const ajoute = randomChoice([true, false]);
      const d = ajoute ? randomInt(2, 7) : randomInt(3, 8);
      const u = randomInt(1, 9);
      const n = d * 10 + u;
      const k = ajoute ? randomInt(2, 9 - d) : randomInt(2, d - 1);
      const pas = k * 10;
      const r = ajoute ? n + pas : n - pas;
      const signe = ajoute ? "+" : "-";
      const explication = exp(
        "Ajouter ou retirer des dizaines entières ne change que le chiffre des dizaines.",
        "On écrit le pas en dizaines, puis on compte en dizaines.",
        `${pas}, c'est ${k} dizaine${k > 1 ? "s" : ""}. ${n} en a ${d}. ${d} ${signe} ${k} = ${Math.floor(r / 10)} dizaines. Les ${u} unités ne bougent pas : ${r}.`,
        `${n} ${signe} ${pas} = ${r}.`,
      );
      const famille = randomInt(0, 2);
      if (famille === 0) return court(calculNu(`${n} ${signe} ${pas}`), r, explication, materiel(n));
      const p = enfant();
      if (famille === 1) {
        const t = ajoute
          ? randomChoice([
              `${p.nom} a ${n} €. ${maj(p.il)} reçoit ${k} billets de 10 €. Combien d'euros a-t-${p.il} maintenant ?`,
              `${p.nom} a ${n} €. Papi lui donne ${pas} €. Combien d'euros a-t-${p.il} maintenant ?`,
            ])
          : randomChoice([
              `${p.nom} a ${n} €. ${maj(p.il)} paie ${pas} € avec des billets de 10 €. Combien lui reste-t-il ?`,
              `${p.nom} a ${n} €. ${maj(p.il)} achète un jeu à ${pas} €. Combien d'euros lui reste-t-il ?`,
            ]);
        return qcm(t, choixNombres(r, [ajoute ? n + k : n - k, r + 10, r - 10, ajoute ? r + u : r - u], "€"), `${r} €`, explication, porteMonnaie(n));
      }
      const s = ajoute
        ? randomChoice([
            `Il y a ${n} œufs. Le fermier apporte ${k} boîtes de 10. Combien d'œufs maintenant ?`,
            `${p.nom} a ${n} cartes de dragons. ${maj(p.il)} reçoit ${k} paquets de 10 cartes. Combien de cartes a-t-${p.il} ?`,
            `Il y a ${n} livres. On ajoute ${k} cartons de 10. Combien de livres maintenant ?`,
            `${p.nom} a ${n} perles. ${maj(p.il)} ouvre ${k} sachets de 10 perles. Combien de perles a-t-${p.il} ?`,
          ])
        : randomChoice([
            `Il y a ${n} œufs. Le fermier vend ${k} boîtes de 10. Combien en reste-t-il ?`,
            `${p.nom} a ${n} cartes de dragons. ${maj(p.il)} donne ${k} paquets de 10 cartes. Combien lui en reste-t-il ?`,
            `Dans la bibliothèque, il y a ${n} livres. On en prête ${pas}. Combien de livres reste-t-il ?`,
            `La boulangère a ${n} croissants. Elle vend ${k} plateaux de 10 croissants. Combien en reste-t-il ?`,
          ]);
      return court(s, r, explication, materiel(n));
    },
  ),
  gabarit(
    "cp_calcul_dizaines_entieres_tpl_2",
    "cp_calcul_dizaines_entieres",
    3,
    "Combien de dizaines ajoute-t-on ?",
    ["dizaines_entieres", "canvas"],
    () => {
      const d = randomInt(2, 5);
      const u = randomInt(1, 9);
      const n = d * 10 + u;
      const k = randomInt(2, 4);
      const pas = k * 10;
      const r = n + pas;
      const explication = exp(
        "Ajouter des dizaines entières ne change pas les unités.",
        "On ajoute les dizaines entre elles.",
        `${d} dizaines + ${k} dizaines = ${d + k} dizaines, et les ${u} unités restent : ${r}.`,
        `${n} + ${pas} = ${r}.`,
      );
      const p = enfant();
      const t = randomChoice([
        `Combien font ${n} + ${pas} ?`,
        `Calcule : ${n} + ${pas}.`,
        `Choisis le résultat de ${n} + ${pas}.`,
        `${p.nom} a ${n} billes. ${maj(p.il)} gagne ${k} sacs de 10 billes. Combien de billes a-t-${p.il} ?`,
        `${p.nom} a ${n} €. ${maj(p.il)} reçoit ${k} billets de 10 €. Combien a-t-${p.il} maintenant ?`,
        `Il y a ${n} poules à la ferme. Le fermier en achète ${pas}. Combien de poules maintenant ?`,
        `Le train porte ${n} voyageurs. ${pas} voyageurs montent. Combien sont-ils maintenant ?`,
        `${p.nom} a ${n} perles. ${maj(p.il)} ouvre ${k} sachets de 10 perles. Combien de perles a-t-${p.il} ?`,
        `Pic le paille-en-queue a ${n} graines. On lui en donne ${pas}. Combien en a-t-il ?`,
        `Au zoo, ${n} enfants regardent les singes. ${pas} autres arrivent. Combien d'enfants maintenant ?`,
      ]);
      const pieges = [n + k, r + 10, r - 10, r + u];
      return t.includes("€")
        ? qcm(t, choixNombres(r, pieges, "€"), `${r} €`, explication, porteMonnaie(n))
        : qcm(t, choixNombres(r, pieges), String(r), explication, materiel(n));
    },
  ),

  /* =========================================================
     CP_CALCUL_COMPLEMENT_DIZAINE — jusqu'à la dizaine du dessus
     Le BO : « pour trouver le complément de 74 à la dizaine
     supérieure… le complément à 10 de 4 est 6. »
  ========================================================= */
  gabarit(
    "cp_calcul_complement_dizaine_tpl_3",
    "cp_calcul_complement_dizaine",
    4,
    "Il ne manque que des unités pour finir la dizaine.",
    ["complement_dizaine", "canvas"],
    () => {
      const d = randomInt(1, 8);
      const u = randomInt(1, 9);
      const deja = d * 10 + u;
      const cible = (d + 1) * 10;
      const manque = cible - deja;
      const p = enfant();
      const s = randomChoice([
        `Il y a ${deja} chaises dans la salle des fêtes. Il en faut ${cible}.`,
        `On a rangé ${deja} livres. Il y en a ${cible} à ranger.`,
        `${deja} enfants sont arrivés au cirque. Ils sont ${cible} en tout.`,
        `${p.nom} a collé ${deja} images. L'album en contient ${cible}.`,
        `La fermière a ramassé ${deja} œufs. Elle en veut ${cible}.`,
        `Le jardinier a planté ${deja} fleurs. Il en a ${cible} à planter.`,
        `${p.nom} a lu ${deja} pages. Le livre en a ${cible}.`,
        `Le pompier a déroulé ${deja} mètres de tuyau. Il lui en faut ${cible}.`,
        `${deja} pirates sont montés sur le bateau. L'équipage compte ${cible} pirates.`,
        `Le puzzle ${deN(p)} a ${cible} pièces. ${maj(p.il)} en a posé ${deja}.`,
        `Le chef cuisinier a préparé ${deja} crêpes. Il en faut ${cible}.`,
        `Il y a ${deja} poissons dans le bassin. Le soigneur en veut ${cible}.`,
      ]);
      const question = randomChoice([
        "Combien en manque-t-il ?",
        "Combien en faut-il encore ?",
        "Combien reste-t-il à faire ?",
        "Combien en faut-il pour finir ?",
        "Trouve combien il en manque.",
      ]);
      return court(
        `${s} ${question}`,
        manque,
        exp(
          "Aller jusqu'à la dizaine du dessus, c'est compléter les unités.",
          "On cherche le complément à 10 du chiffre des unités.",
          `${deja} a ${u} unités. Le complément à 10 de ${u} est ${manque} : ${deja} + ${manque} = ${cible}.`,
          `Il en manque ${manque}.`,
        ),
        materiel(deja),
      );
    },
  ),
  gabarit(
    "cp_calcul_complement_dizaine_tpl_1",
    "cp_calcul_complement_dizaine",
    4,
    "Le complément à 10 du chiffre des unités suffit.",
    ["complement_dizaine", "canvas"],
    () => {
      const d = randomInt(1, 8);
      const u = randomInt(1, 9);
      const n = d * 10 + u;
      const manque = 10 - u;
      const cible = (d + 1) * 10;
      const p = enfant();
      const c = chose();
      const t = randomChoice([
        `${p.nom} a ${n} ${c.pl}. Combien lui en faut-il pour en avoir ${cible} ?`,
        `${p.nom} a ${n} ${c.pl}. ${maj(p.il)} en veut ${cible}. Combien lui en manque-t-il ?`,
        `${p.nom} a ${n} ${c.pl}. ${maj(p.il)} veut finir la dizaine. Combien doit-${p.il} en trouver ?`,
        `Combien faut-il ajouter à ${n} pour arriver à ${cible} ?`,
        `Complète : ${n} + … = ${cible}`,
        `Complète : ${cible} = ${n} + …`,
        `De ${n} à ${cible}, combien de pas ?`,
        `${n} et combien font ${cible} ?`,
        `Quel nombre ajouter à ${n} pour finir la dizaine ?`,
        `${randomChoice(TROUPE).nom} est sur la case ${n}. Combien de cases pour aller sur la case ${cible} ?`,
        `Pic a ${n} graines. Combien lui en faut-il pour en avoir ${cible} ?`,
        `Il faut ${cible} cubes pour la tour. On en a ${n}. Combien en manque-t-il ?`,
      ]);
      return court(
        t,
        manque,
        exp(
          "Pour aller jusqu'à la dizaine du dessus, on complète les unités.",
          "On cherche le complément à 10 du chiffre des unités.",
          `${n}, c'est ${d} dizaine${d > 1 ? "s" : ""} et ${u} unités. Le complément à 10 de ${u} est ${manque} : ${n} + ${manque} = ${cible}.`,
          `Il faut ajouter ${manque}.`,
        ).replace(" et 1 unités", " et 1 unité"),
        materiel(n),
      );
    },
  ),
  gabarit(
    "cp_calcul_complement_dizaine_tpl_2",
    "cp_calcul_complement_dizaine",
    3,
    "La dizaine du dessus se termine toujours par zéro.",
    ["complement_dizaine", "canvas"],
    () => {
      const d = randomInt(1, 8);
      const u = randomInt(1, 9);
      const n = d * 10 + u;
      const cible = (d + 1) * 10;
      const p = enfant();
      const t = randomChoice([
        `Quelle est la dizaine juste au-dessus de ${n} ?`,
        `${n} est entre deux dizaines. Quelle est la plus grande ?`,
        `Après ${n}, quelle est la première dizaine ?`,
        `${p.nom} compte à partir de ${n}. Quelle dizaine dit-${p.il} en premier ?`,
        `${p.nom} a ${n} billes. ${maj(p.il)} veut finir la dizaine. Combien de billes aura-t-${p.il} alors ?`,
        `On range ${n} œufs dans des boîtes de 10. Avec combien d'œufs toutes les boîtes seront-elles pleines ?`,
        `Le pion est sur la case ${n}. Quelle est la prochaine case qui finit par 0 ?`,
        `Pic est sur ${n}. Il vole jusqu'à la dizaine suivante. Où arrive-t-il ?`,
        `Sur la frise, ${n} est entre deux dizaines. Laquelle vient juste après ?`,
      ]);
      return qcm(
        t,
        choixNombres(cible, [d * 10, cible + 10, n + 1, cible + u]),
        String(cible),
        exp(
          "Les dizaines entières sont les nombres qui finissent par zéro.",
          "On cherche la dizaine entière qui vient juste après le nombre.",
          `${n} est entre ${d * 10} et ${cible}. La dizaine juste au-dessus est ${cible}.`,
          `C'est ${cible}.`,
        ),
        materiel(n),
      );
    },
  ),

  /* =========================================================
     CP_CALCUL_AJOUTER_9 — +10 puis -1
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_calcul_ajouter_9_fixed_1",
    ...COMMUN,
    microId: "cp_calcul_ajouter_9",
    difficulty: 4,
    text: "Pour ajouter 9 à 37, quelle est la façon la plus rapide ?",
    format: "qcm",
    choices: [
      "ajouter 10, puis retirer 1",
      "ajouter 9 un par un",
      "ajouter 10, puis ajouter 1",
      "retirer 10, puis ajouter 1",
    ],
    expected: ["ajouter 10, puis retirer 1"],
    comparator: "mcq_exact",
    hint: "9, c'est presque 10 : il en manque juste un.",
    explanation: exp(
      "Ajouter 9, c'est ajouter une dizaine, puis retirer l'unité en trop.",
      "On ajoute 10, puis on recule de 1.",
      "37 + 10 = 47, puis 47 - 1 = 46. Et en effet 37 + 9 = 46.",
      "On ajoute 10, puis on retire 1.",
    ),
    tags: ["cp", "calcul_mental", "ajouter_9", "methode", "qcm"],
  },
  gabarit(
    "cp_calcul_ajouter_9_tpl_1",
    "cp_calcul_ajouter_9",
    4,
    "Ajoute 10, puis retire 1.",
    ["ajouter_9", "canvas"],
    () => {
      const n = randomInt(12, 85);
      const r = n + 9;
      const explication = exp(
        "Ajouter 9, c'est ajouter 10 puis retirer 1.",
        "On monte d'une dizaine, puis on recule d'une unité.",
        `${n} + 10 = ${n + 10}, puis ${n + 10} - 1 = ${r}.`,
        `${n} + 9 = ${r}.`,
      );
      const famille = randomInt(0, 2);
      if (famille === 0) return court(calculNu(`${n} + 9`), r, explication, materiel(n));
      const p = enfant();
      if (famille === 1) {
        const t = randomChoice([
          `${p.nom} a ${n} €. ${maj(p.il)} gagne 9 € à la kermesse. Combien d'euros a-t-${p.il} ?`,
          `${p.nom} a ${n} €. Papi lui donne 9 €. Combien a-t-${p.il} maintenant ?`,
        ]);
        return qcm(t, choixNombres(r, [n + 10, n + 8, n + 1, r + 10], "€"), `${r} €`, explication, porteMonnaie(n));
      }
      const s = randomChoice([
        `${p.nom} a ${n} billes. ${maj(p.il)} en gagne 9 à la récré.`,
        `Il y a ${n} moutons dans le pré. 9 autres arrivent.`,
        `${p.nom} a lu ${n} pages. Ce soir, ${p.il} en lit encore 9.`,
        `La boulangère a ${n} croissants. Elle en sort 9 du four.`,
        `Le compteur du jeu affiche ${n} points. On gagne encore 9 points.`,
        `${p.nom} a ${n} points au jeu. ${maj(p.il)} gagne encore 9 points.`,
        `Il y a ${n} enfants au cirque. 9 autres entrent.`,
        `Le vétérinaire a soigné ${n} animaux. Il en soigne 9 de plus.`,
        `Pic le paille-en-queue a ${n} graines. Il en trouve encore 9.`,
      ]);
      const question = randomChoice(["Combien maintenant ?", "Combien cela fait-il en tout ?", "Calcule le nouveau nombre."]);
      return court(`${s} ${question}`, r, explication, materiel(n), [n + 10, n + 8]);
    },
  ),
  gabarit(
    "cp_calcul_ajouter_9_tpl_2",
    "cp_calcul_ajouter_9",
    5,
    "Regarde ce qui a été ajouté en trop.",
    ["ajouter_9", "piege", "canvas"],
    () => {
      const n = randomInt(15, 80);
      const r = n + 9;
      const p = randomChoice(TROUPE);
      const famille = randomInt(0, 2);
      if (famille === 0) {
        const bulles = [`${n} + 10 = ${n + 10}. Fini ?`, `${n} + 10 = ${n + 10}… et après ?`, `J'ajoute 10 : ${n + 10}.`];
        const t = randomChoice([
          `${p.nom} calcule ${n} + 9. Que doit-${p.il} encore faire ?`,
          `${p.nom} veut ${n} + 9. ${maj(p.il)} a déjà ajouté 10. Et maintenant ?`,
          `Aide ${p.nom} à finir ${n} + 9. Que reste-t-il à faire ?`,
        ]);
        return qcm(
          t,
          makeChoices("retirer 1", ["ajouter 1", "retirer 10", "ajouter 9", "rien, c'est fini"]),
          "retirer 1",
          exp(
            "Quand on ajoute 10 au lieu de 9, on en a mis 1 de trop.",
            "On retire ce qu'on a ajouté en trop.",
            `Il fallait ajouter 9, ${p.il} a ajouté 10 : il y a 1 de trop. ${n + 10} - 1 = ${r}.`,
            "Il faut retirer 1.",
          ),
          parle(p.perso!, randomChoice(bulles), "pense"),
        );
      }
      if (famille === 1) {
        const faux = randomChoice([n + 10, n + 8, n + 1]);
        const juste = randomChoice([true, false]);
        const dit = juste ? r : faux;
        const t = randomChoice([
          `${p.nom} dit : « ${n} + 9 = ${dit} ». A-t-${p.il} raison ?`,
          `${p.nom} a calculé ${n} + 9. ${maj(p.il)} trouve ${dit}. Est-ce juste ?`,
        ]);
        return qcm(
          t,
          shuffle(["oui", "non"]),
          juste ? "oui" : "non",
          exp(
            "Ajouter 9, c'est ajouter 10 puis retirer 1.",
            "On refait le calcul et on compare.",
            `${n} + 10 = ${n + 10}, puis ${n + 10} - 1 = ${r}. ${juste ? `${p.nom} a bien trouvé ${r}.` : `${p.nom} a trouvé ${dit}, pas ${r}.`}`,
            juste ? `Oui, ${n} + 9 = ${r}.` : `Non, ${n} + 9 = ${r}.`,
          ),
          parle(p.perso!, `${n} + 9 = ${dit}`, "sourire"),
        );
      }
      const t = randomChoice([
        `Pour ajouter 9 à ${n}, ${p.nom} ajoute d'abord 10. Quel nombre trouve-t-${p.il} à la fin ?`,
        `${n} + 10 = ${n + 10}. Alors, combien font ${n} + 9 ?`,
        `${p.nom} sait que ${n} + 10 = ${n + 10}. Combien font ${n} + 9 ?`,
      ]);
      return qcm(
        t,
        choixNombres(r, [n + 10, n + 11, n + 8, n + 1]),
        String(r),
        exp(
          "9, c'est 1 de moins que 10.",
          "On prend le résultat avec 10, puis on retire 1.",
          `${n} + 10 = ${n + 10}, donc ${n} + 9 = ${n + 10} - 1 = ${r}.`,
          `${n} + 9 = ${r}.`,
        ),
        materiel(n),
      );
    },
  ),

  /* =========================================================
     CP_CALCUL_AJOUTER_DEUX_NOMBRES — 47 + 28
     Au programme du CP : « ajouter deux nombres inférieurs à 100 ».
     Le BO donne l'ardoise : 40 + 20 = 60, 7 + 8 = 15, 60 + 15 = 75.
     ⭐ La retenue reste à ★4-★5 : c'est la procédure de fin d'année.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_calcul_ajouter_deux_nombres_fixed_1",
    ...COMMUN,
    microId: "cp_calcul_ajouter_deux_nombres",
    difficulty: 5,
    text: "Calcule : 47 + 28",
    format: "qcm",
    choices: ["65", "75", "74", "85"],
    expected: ["75"],
    comparator: "mcq_exact",
    hint: "Les dizaines ensemble, les unités ensemble, puis on réunit.",
    explanation: exp(
      "Pour ajouter deux nombres à deux chiffres, on les coupe en dizaines et unités.",
      "On ajoute les dizaines entre elles, les unités entre elles, puis on réunit.",
      "40 + 20 = 60. Et 7 + 8 = 15. On réunit : 60 + 15 = 75.",
      "47 + 28 = 75.",
    ),
    tags: ["cp", "calcul_mental", "ajouter_deux", "piege"],
  },
  gabarit(
    "cp_calcul_ajouter_deux_nombres_tpl_1",
    "cp_calcul_ajouter_deux_nombres",
    5,
    "Coupe les deux nombres en dizaines et unités.",
    ["ajouter_deux", "canvas"],
    () => {
      const dA = randomInt(1, 4);
      const uA = randomInt(3, 9);
      const dB = randomInt(1, 4);
      const uB = randomInt(Math.max(3, 11 - uA), 9);
      const a = dA * 10 + uA;
      const b = dB * 10 + uB;
      const total = a + b;
      const sd = (dA + dB) * 10;
      const su = uA + uB;
      const explication = exp(
        "Deux nombres à deux chiffres s'ajoutent en séparant dizaines et unités.",
        "On ajoute les dizaines, puis les unités, puis on réunit.",
        `${dA * 10} + ${dB * 10} = ${sd}. Et ${uA} + ${uB} = ${su}. On réunit : ${sd} + ${su} = ${total}.`,
        `${a} + ${b} = ${total}.`,
      );
      const famille = randomInt(0, 2);
      if (famille === 0) return court(calculNu(`${a} + ${b}`), total, explication);
      const [p, q] = deuxEnfants();
      if (famille === 1) {
        const t = randomChoice([
          `${p.nom} a ${a} €. ${q.nom} a ${b} €. Combien d'euros ont-${ils(p, q)} ensemble ?`,
          `Pour un cadeau, ${p.nom} donne ${a} €, ${q.nom} ${b} €. Combien en tout ?`,
        ]);
        // Billets de 10 € et pièces de 1 € : 24 dessins au plus en tout.
        const dessin: MonnaieCanvasData | undefined =
          dA + uA + dB + uB <= 24
            ? { kind: "monnaie", groupes: [{ nom: p.nom, elements: porteMonnaie(a).elements! }, { nom: q.nom, elements: porteMonnaie(b).elements! }] }
            : undefined;
        // Pièges : oublier la retenue (dizaines + unités sans échange), ±10, ±1.
        return qcm(t, choixNombres(total, [total - 10, total + 10, sd + (su % 10), total + 1], "€"), `${total} €`, explication, dessin);
      }
      const s = randomChoice([
        `${p.nom} a ${a} images. ${q.nom} lui en donne ${b}. Combien d'images a ${p.nom} ?`,
        `Le matin, la boulangère vend ${a} croissants. L'après-midi, elle en vend ${b}. Combien en tout ?`,
        `Au zoo, il y a ${a} flamants roses et ${b} canards. Combien d'oiseaux en tout ?`,
        `${p.nom} marque ${a} points, puis ${b} points. Combien de points en tout ?`,
        `Un wagon a ${a} voyageurs, l'autre ${b}. Combien en tout ?`,
        `La bibliothèque a ${a} albums et ${b} bandes dessinées. Combien de livres en tout ?`,
        `Le jardinier plante ${a} tulipes et ${b} roses. Combien de fleurs ?`,
        `À la kermesse, ${a} enfants jouent au chamboule-tout et ${b} pêchent des canards. Combien d'enfants ?`,
      ]);
      return court(s, total, explication);
    },
  ),
  gabarit(
    "cp_calcul_ajouter_deux_nombres_tpl_2",
    "cp_calcul_ajouter_deux_nombres",
    4,
    "Passe d'abord par la dizaine du dessus.",
    ["ajouter_deux", "canvas"],
    () => {
      const d = randomInt(2, 8);
      const u = randomInt(4, 9);
      const a = d * 10 + u;
      const v = 10 - u;
      const b = randomInt(v + 1, 9);
      const total = a + b;
      const explication = exp(
        "Pour ajouter un petit nombre, on passe d'abord par la dizaine du dessus.",
        "On ajoute ce qui manque pour finir la dizaine, puis le reste.",
        `De ${a}, il faut ${v} pour arriver à ${(d + 1) * 10}. Il reste ${b} - ${v} = ${b - v} à ajouter : ${(d + 1) * 10} + ${b - v} = ${total}.`,
        `${a} + ${b} = ${total}.`,
      );
      const famille = randomChoice([0, 1, 1, 2]);
      if (famille === 0) return court(calculNu(`${a} + ${b}`), total, explication, materiel(a));
      const p = enfant();
      if (famille === 2) {
        const c = chose();
        const t = randomChoice([
          `${p.nom} a ${a} ${c.pl}. ${maj(p.il)} en reçoit ${b}. Combien en a-t-${p.il} maintenant ?`,
          `${p.nom} a ${a} ${c.pl}. On lui en donne encore ${b}. Combien en a-t-${p.il} ?`,
          `${p.nom} collectionne les ${c.pl}. ${maj(p.il)} en a ${a} et en trouve ${b}. Combien en tout ?`,
        ]);
        return court(t, total, explication, materiel(a));
      }
      const s = randomChoice([
        `${p.nom} a ${a} billes. ${maj(p.il)} en gagne ${b}.`,
        `Il y a ${a} poules dans le poulailler. ${b} autres rentrent.`,
        `${p.nom} a ${a} autocollants. On lui en offre ${b}.`,
        `Au cirque, ${a} enfants sont assis. ${b} autres arrivent.`,
        `Il y a ${a} enfants à la piscine. ${b} autres arrivent.`,
        `La maîtresse a ${a} crayons. Elle en achète ${b}.`,
        `Dans la fusée, il y a ${a} caisses. On en charge ${b} autres.`,
        `${p.nom} a lu ${a} pages. ${maj(p.il)} en lit encore ${b}.`,
        `Le chef cuisinier a fait ${a} crêpes. Il en fait encore ${b}.`,
      ]);
      const question = randomChoice(["Combien maintenant ?", "Combien cela fait-il ?", "Quel nombre trouves-tu ?"]);
      return court(`${s} ${question}`, total, explication, materiel(a));
    },
  ),

  /* =========================================================
     CP_CALCUL_SOUSTRAIRE_DIZAINE — 50 - 6
     Le BO : « 50 c'est 5 dizaines, je casse une dizaine… »
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_calcul_soustraire_dizaine_fixed_1",
    ...COMMUN,
    microId: "cp_calcul_soustraire_dizaine",
    difficulty: 4,
    text: "Calcule : 50 - 6",
    format: "qcm",
    choices: ["56", "46", "44", "54"],
    expected: ["44"],
    comparator: "mcq_exact",
    hint: "Casse une dizaine : il te reste 4 dizaines et 10 unités.",
    explanation: exp(
      "Pour retirer des unités à un nombre de dizaines entières, on casse d'abord une dizaine.",
      "On change une dizaine en dix unités, puis on retire.",
      "50, c'est 5 dizaines. On casse une dizaine : 4 dizaines et 10 unités. 10 - 6 = 4. Cela fait 4 dizaines et 4 unités : 44.",
      "50 - 6 = 44.",
    ),
    canvas: materiel(50, "unites"),
    tags: ["cp", "calcul_mental", "casser_dizaine", "piege", "canvas"],
  },
  gabarit(
    "cp_calcul_soustraire_dizaine_tpl_1",
    "cp_calcul_soustraire_dizaine",
    4,
    "Casse une dizaine en 10 unités, puis retire.",
    ["casser_dizaine", "canvas"],
    () => {
      const d = randomInt(2, 9);
      const depart = d * 10;
      const b = randomInt(2, 9);
      const r = depart - b;
      const explication = exp(
        "Un nombre de dizaines entières n'a pas d'unités : on en casse une pour pouvoir retirer.",
        "On casse une dizaine en dix unités, puis on retire.",
        `${depart}, c'est ${d} dizaines. On casse une dizaine : ${d - 1} dizaine${d - 1 > 1 ? "s" : ""} et 10 unités. 10 - ${b} = ${10 - b}. Cela fait ${r}.`,
        `${depart} - ${b} = ${r}.`,
      );
      const famille = randomInt(0, 2);
      if (famille === 0) return court(calculNu(`${depart} - ${b}`), r, explication, materiel(depart, "unites"));
      const p = enfant();
      if (famille === 1) {
        const t = randomChoice([
          `${p.nom} a ${d} billets de 10 €. ${maj(p.il)} achète un livre à ${b} €. Combien d'euros lui reste-t-il ?`,
          `${p.nom} a ${depart} €. ${maj(p.il)} paie une place de cirque à ${b} €. Combien lui reste-t-il ?`,
          `${p.nom} a ${depart} € pour la kermesse. ${maj(p.il)} dépense ${b} €. Combien d'euros lui reste-t-il ?`,
        ]);
        return qcm(t, choixNombres(r, [depart - 10 + b, r + 10, depart - b - 10, r + 1], "€"), `${r} €`, explication, {
          kind: "monnaie",
          elements: [{ valeur: "10e", nombre: d }],
        });
      }
      const s = randomChoice([
        `La fermière a ${d} boîtes de 10 œufs. Elle utilise ${b} œufs pour un gâteau.`,
        `Il y a ${depart} chaises dans la salle. On en sort ${b}.`,
        `${p.nom} a ${depart} perles. ${maj(p.il)} en met ${b} sur un bracelet.`,
        `Le jardinier a ${depart} graines. Il en sème ${b}.`,
        `Il y a ${depart} livres sur l'étagère. Les élèves en empruntent ${b}.`,
        `La boulangère a fait ${depart} croissants. Elle en vend ${b}.`,
        `${depart} enfants regardent les singes. ${b} partent voir les lions.`,
        `Le bateau pirate porte ${depart} tonneaux. ${b} roulent dans l'eau.`,
      ]);
      const question = randomChoice(["Combien en reste-t-il ?", "Combien reste-t-il ?", "Combien en reste-t-il maintenant ?"]);
      return court(`${s} ${question}`, r, explication, materiel(depart, "unites"));
    },
  ),
  gabarit(
    "cp_calcul_soustraire_dizaine_tpl_2",
    "cp_calcul_soustraire_dizaine",
    5,
    "Après avoir cassé une dizaine, combien de dizaines entières reste-t-il ?",
    ["casser_dizaine", "piege", "canvas"],
    () => {
      const d = randomInt(3, 9);
      const depart = d * 10;
      const b = randomInt(2, 9);
      const r = depart - b;
      const p = randomChoice(TROUPE);
      const famille = randomInt(0, 2);
      if (famille === 0) {
        const t = randomChoice([
          `Pour calculer ${depart} - ${b}, on casse une dizaine. Combien de dizaines entières reste-t-il ?`,
          `${p.nom} calcule ${depart} - ${b}. ${maj(p.il)} casse une barre de dix. Combien de barres reste-t-il ?`,
          `${depart}, c'est ${d} dizaines. On en casse une pour retirer ${b}. Combien de dizaines restent entières ?`,
        ]);
        return court(
          t,
          d - 1,
          exp(
            "Casser une dizaine, c'est la changer en dix unités : elle quitte les dizaines.",
            "On enlève une dizaine au compte des dizaines.",
            `${depart} a ${d} dizaines. Après en avoir cassé une, il en reste ${d - 1}, plus 10 unités. On retire ${b} : ${r}.`,
            `Il reste ${d - 1} dizaines entières.`,
          ),
          materiel(depart, "unites"),
        );
      }
      if (famille === 1) {
        const t = randomChoice([
          `${p.nom} calcule ${depart} - ${b}. Combien d'unités reste-t-il dans la dizaine cassée ?`,
          `On casse une dizaine pour faire ${depart} - ${b}. Combien de cubes restent après avoir retiré ${b} ?`,
        ]);
        return court(
          t,
          10 - b,
          exp(
            "Une dizaine cassée donne 10 unités.",
            "On retire le petit nombre à ces 10 unités.",
            `10 - ${b} = ${10 - b}. Avec les ${d - 1} dizaines qui restent, cela fait ${r}.`,
            `Il reste ${10 - b} unités.`,
          ),
          materiel(depart, "unites"),
        );
      }
      const faux = randomChoice([depart - 10 + b, r + 10, depart - b + 1]);
      const juste = randomChoice([true, false]);
      const dit = juste ? r : faux;
      return qcm(
        randomChoice([`${p.nom} dit : « ${depart} - ${b} = ${dit} ». A-t-${p.il} raison ?`, `${p.nom} trouve ${depart} - ${b} = ${dit}. Est-ce juste ?`]),
        shuffle(["oui", "non"]),
        juste ? "oui" : "non",
        exp(
          "Pour retirer des unités à des dizaines entières, on casse une dizaine.",
          "On refait le calcul et on compare.",
          `${depart}, c'est ${d - 1} dizaines et 10 unités. 10 - ${b} = ${10 - b}. Donc ${depart} - ${b} = ${r}.`,
          juste ? "Oui, c'est juste." : `Non, la bonne réponse est ${r}.`,
        ),
        parle(p.perso!, `${depart} - ${b} = ${dit}`, "sourire"),
      );
    },
  ),

  /* =========================================================
     CP_CALCUL_DEFI — la fluence, et le choix de la procédure
     « Il faut aussi savoir dans quels contextes il est pertinent
     d'utiliser une procédure donnée », dit le BO.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_calcul_defi_fixed_1",
    ...COMMUN,
    microId: "cp_calcul_defi",
    difficulty: 5,
    text: "Pour calculer 46 + 9 dans sa tête, quelle est la meilleure façon de faire ?",
    format: "qcm",
    choices: [
      "ajouter 10, puis retirer 1",
      "compter 9 fois de un en un",
      "ajouter 9 dizaines",
      "poser l'opération en colonnes",
    ],
    expected: ["ajouter 10, puis retirer 1"],
    comparator: "mcq_exact",
    hint: "La meilleure façon est celle qui a le moins d'étapes.",
    explanation: exp(
      "Calculer dans sa tête, c'est aussi choisir la façon la plus rapide.",
      "On regarde les nombres avant de commencer.",
      "9 est tout près de 10 : 46 + 10 = 56, puis 56 - 1 = 55. Deux étapes faciles.",
      "On ajoute 10, puis on retire 1.",
    ),
    tags: ["cp", "calcul_mental", "defi", "methode", "qcm"],
  },
  gabarit(
    "cp_calcul_defi_tpl_1",
    "cp_calcul_defi",
    5,
    "Regarde les nombres avant de choisir ta méthode.",
    ["defi", "canvas"],
    () => {
      const n = randomInt(21, 70);
      const cas = randomChoice([
        { calcul: `${n} + 9`, bonne: "ajouter 10, puis retirer 1", pieges: ["ajouter 10, puis ajouter 1", "compter de un en un", "ajouter 9 dizaines"] },
        { calcul: `${n} + 10`, bonne: "monter d'une dizaine", pieges: ["monter d'une unité", "compter de un en un", "ajouter 100"] },
        { calcul: `${n} + 2`, bonne: "avancer de deux dans la comptine", pieges: ["monter d'une dizaine", "ajouter 20", "reculer de deux"] },
        { calcul: `${n} - 10`, bonne: "descendre d'une dizaine", pieges: ["descendre d'une unité", "ajouter 10", "retirer 100"] },
        { calcul: `${n} + 11`, bonne: "ajouter 10, puis ajouter 1", pieges: ["ajouter 10, puis retirer 1", "ajouter 11 dizaines", "compter de un en un"] },
        { calcul: `${n} - 9`, bonne: "retirer 10, puis ajouter 1", pieges: ["retirer 10, puis retirer 1", "ajouter 10", "retirer 9 dizaines"] },
        { calcul: `${n} + 30`, bonne: "ajouter 3 dizaines", pieges: ["ajouter 3 unités", "compter de un en un", "ajouter 30 dizaines"] },
        { calcul: `${n} - 1`, bonne: "reculer de un", pieges: ["descendre d'une dizaine", "avancer de un", "retirer 10"] },
        { calcul: `${n} - 20`, bonne: "retirer 2 dizaines", pieges: ["retirer 2 unités", "ajouter 2 dizaines", "compter de un en un"] },
        { calcul: `${n} + 1`, bonne: "avancer de un", pieges: ["monter d'une dizaine", "reculer de un", "ajouter 10"] },
      ]);
      const p = randomChoice(TROUPE);
      const t = randomChoice([
        `Pour calculer ${cas.calcul} dans sa tête, que vaut-il mieux faire ?`,
        `${p.nom} veut calculer ${cas.calcul} très vite. Quelle est la bonne idée ?`,
        `Quelle est la façon la plus rapide de calculer ${cas.calcul} ?`,
        `${p.nom} doit trouver ${cas.calcul} sans poser l'opération. Comment faire ?`,
        `Aide ${p.nom} : quelle est la bonne méthode pour ${cas.calcul} ?`,
      ]);
      return qcm(
        t,
        makeChoices(cas.bonne, cas.pieges),
        cas.bonne,
        exp(
          "En calcul mental, on choisit la façon la mieux adaptée aux nombres.",
          "On regarde le nombre à ajouter ou à retirer : est-il proche de 10 ? est-il tout petit ?",
          `Pour ${cas.calcul}, le plus sûr et le plus rapide est de ${cas.bonne}.`,
          `Il vaut mieux ${cas.bonne}.`,
        ),
        parle(p.perso!, `${cas.calcul}, comment faire ?`, "pense"),
      );
    },
  ),
  gabarit(
    "cp_calcul_defi_tpl_2",
    "cp_calcul_defi",
    5,
    "Deux étapes : d'abord jusqu'à la dizaine, ensuite le reste.",
    ["defi", "canvas"],
    () => {
      const d = randomInt(2, 7);
      const u = randomInt(5, 9);
      const n = d * 10 + u;
      const v = 10 - u;
      // ⚠️ Le nombre à ajouter dépasse ce qui manque pour la dizaine.
      const b = randomInt(v + 1, 9);
      const total = n + b;
      const dizaine = (d + 1) * 10;
      const famille = randomInt(0, 2);
      const explication = exp(
        "Passer par la dizaine, c'est couper l'ajout en deux morceaux.",
        "On ajoute d'abord ce qui manque pour la dizaine, puis le reste.",
        `De ${n} à ${dizaine}, il faut ${v}. Sur les ${b} à ajouter, il reste ${b} - ${v} = ${b - v}. On arrive à ${total}.`,
        `${n} + ${b} = ${total}.`,
      );
      if (famille === 0) {
        const t = randomChoice([
          `Pour calculer ${n} + ${b}, on passe par ${dizaine}. Combien reste-t-il à ajouter ensuite ?`,
          `${n} + ${b} : on va d'abord jusqu'à ${dizaine}. Que faut-il ajouter après ?`,
          `On découpe ${b} pour calculer ${n} + ${b} : ${v} pour aller à ${dizaine}, et combien ensuite ?`,
        ]);
        return court(t, b - v, explication, materiel(n));
      }
      if (famille === 1) {
        const t = randomChoice([
          `Pour calculer ${n} + ${b}, combien faut-il d'abord pour aller jusqu'à ${dizaine} ?`,
          `${n} + ${b} : de ${n}, combien de pas pour arriver à ${dizaine} ?`,
          `On calcule ${n} + ${b} en deux étapes. Première étape : ${n} + … = ${dizaine}. Quel nombre ?`,
          `Pour faire ${n} + ${b}, on finit d'abord la dizaine. Combien ajoute-t-on d'abord ?`,
        ]);
        return court(t, v, explication, materiel(n));
      }
      const p = randomChoice(TROUPE);
      return court(
        randomChoice([
          `${p.nom} passe par ${dizaine} pour calculer ${n} + ${b}. Quel résultat trouve-t-${p.il} ?`,
          `Défi ${deN(p)} : calcule ${n} + ${b} en passant par ${dizaine}.`,
          `${p.nom} a ${n} billes et en gagne ${b}. ${maj(p.il)} passe par ${dizaine}. Combien de billes a-t-${p.il} ?`,
          `Le pion ${deN(p)} est sur la case ${n}. Il avance de ${b} cases. Où arrive-t-il ?`,
          `Dans le bus, il y a ${n} enfants. ${b} montent. Combien sont-ils ? Passe par ${dizaine} !`,
        ]),
        total,
        explication,
        parle(p.perso!, `${n} + ${b}, je passe par ${dizaine} !`, "sourire"),
      );
    },
  ),
];
