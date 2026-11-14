// lib/tutor-v4/question-banks/maths/cm2/division.bank.ts

import type {
  TutorBankItemV4,
  CalculPoseCanvasData,
  ObjetId,
  ObjetsCanvasData,
  TableauDonneesCanvasData,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";
import {
  barre,
  barreEgale,
  deuxPersonnes,
  maj,
  objetsEnVrac,
  objetsGroupes,
  pick,
  quelquun,
  rint,
  type Prenom,
} from "@/lib/tutor-v4/questionBank/ce2/maths/outils-calcul-ce2";
import { eur, fr, net } from "./trous-outils";

function shuffle<T>(items: T[]): T[] {
  return melangeEnPlace([...items]);
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
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

/* =========================================================
   LA DIVISION DE CM2 — LES GABARITS (14/11/2026)

   ⛔ POURQUOI. Mesuré avec .tmp-mesurer-cm.ts : 5 à 13 squelettes par
   micro, 14 à 19 répétitions sur 20, presque aucun dessin, « au marché de
   Saint-Pierre » servi à chaque fois. Architecture reprise du CM1 (commit
   46517f9e) : chaque gabarit tire une FAMILLE, une SITUATION (28 contextes de
   vie, métiers inclus ; la Réunion n'en est plus qu'UN) et une TOURNURE.

   ⭐ LE NIVEAU MONTE PAR RAPPORT AU CM1 : dizaines et centaines (2 400 ÷ 6),
   diviseurs à 2 chiffres (864 ÷ 32), quotient décimal (7 ÷ 4 = 1,75),
   division d'un décimal par un entier (8,4 ÷ 4 = 2,1).

   ⭐ LES PIÈGES = DE VRAIES ERREURS D'ÉLÈVE : le 0 oublié au quotient
   (412 ÷ 4 → 13), un reste plus grand que le diviseur, le quotient pris pour
   le reste, la virgule oubliée au quotient (8,4 ÷ 4 → 21), le reste écrit
   derrière la virgule (7 ÷ 4 → 1,3), s'arrêter au reste au lieu de continuer,
   compter le reste comme un paquet complet (ou l'oublier quand il faut une
   voiture de plus). Signe « ÷ » partout, jamais « / ». Dans un schéma en
   barres, les calculs vont dans le `label`, jamais dans la `value` (le canvas
   lit la value comme un nombre).
========================================================= */

type Q = TutorGeneratedQuestionV4;
type E3 = 1 | 2 | 3;
type E5 = 1 | 2 | 3 | 4 | 5;

/** Les décimales d'un nombre (après nettoyage du flottant). */
const nbDec = (x: number) => (String(net(x)).split(".")[1] ?? "").length;
/** Un nombre lu à la française, avec son unité : « 1,75 L », « 3,50 € ». */
const lu = (x: number, u = "") => `${u === "€" ? eur(x) : fr(x)}${u ? ` ${u}` : ""}`;

/** Trois pièges DISTINCTS en valeur, positifs, complétés par des voisins. */
function choixX(n: number, pieges: readonly number[], u = ""): string[] {
  const j = net(n);
  const ok = (v: number) => Number.isFinite(v) && v > 0 && v <= 100000;
  const vus = new Set<number>([j]);
  const propres: number[] = [];
  for (const f of pieges.map(net)) if (ok(f) && !vus.has(f)) { vus.add(f); propres.push(f); }
  const trois = shuffle(propres).slice(0, 3);
  for (const f of trois) vus.add(f);
  const pas = nbDec(j) ? 10 ** -nbDec(j) : 1;
  for (let k = 1; trois.length < 3 && k < 40; k++)
    for (const f of [net(j + k * pas), net(j - k * pas)]) if (trois.length < 3 && ok(f) && !vus.has(f)) { vus.add(f); trois.push(f); }
  return shuffle([j, ...trois]).map((v) => lu(v, u));
}

const choixM = (correct: string, pieges: readonly string[]) =>
  shuffle([correct, ...shuffle(Array.from(new Set(pieges)).filter((p) => p && p !== correct)).slice(0, 3)]);

/** « de pommes », « d’œufs ». */
const deM = (mot: string) => (/^[aeiouàâéèêëîïôœh]/i.test(mot) ? `d’${mot}` : `de ${mot}`);

type Nom = { un: string; des: string; fem: boolean };
const nm = (un: string, des: string, fem = false): Nom => ({ un, des, fem });

type Sit = {
  ou: string;
  chose: Nom;
  dessin?: ObjetId;
  qui: Nom;
  boite: Nom;
  metier?: { nom: string; il: "il" | "elle" };
};

const SITS: readonly Sit[] = [
  { ou: "Au goûter", chose: nm("pomme", "pommes", true), dessin: "pomme", qui: nm("enfant", "enfants"), boite: nm("panier", "paniers") },
  { ou: "Chez le primeur", chose: nm("banane", "bananes", true), dessin: "banane", qui: nm("corbeille", "corbeilles", true), boite: nm("cagette", "cagettes", true), metier: { nom: "Le primeur", il: "il" } },
  { ou: "Au club de foot", chose: nm("ballon", "ballons"), dessin: "ballon", qui: nm("équipe", "équipes", true), boite: nm("filet", "filets"), metier: { nom: "L’entraîneuse", il: "elle" } },
  { ou: "À l’animalerie", chose: nm("poisson", "poissons"), dessin: "poisson", qui: nm("aquarium", "aquariums"), boite: nm("bocal", "bocaux"), metier: { nom: "Le vendeur", il: "il" } },
  { ou: "Chez la fleuriste", chose: nm("fleur", "fleurs", true), dessin: "fleur", qui: nm("vase", "vases"), boite: nm("bouquet", "bouquets"), metier: { nom: "La fleuriste", il: "elle" } },
  { ou: "À la bibliothèque", chose: nm("livre", "livres"), dessin: "livre", qui: nm("classe", "classes", true), boite: nm("étagère", "étagères", true), metier: { nom: "La bibliothécaire", il: "elle" } },
  { ou: "Pour la fête de l’école", chose: nm("étoile en papier", "étoiles en papier", true), dessin: "etoile", qui: nm("guirlande", "guirlandes", true), boite: nm("sachet", "sachets") },
  { ou: "Au magasin de jouets", chose: nm("petite voiture", "petites voitures", true), dessin: "voiture", qui: nm("étagère", "étagères", true), boite: nm("boîte", "boîtes", true), metier: { nom: "La vendeuse", il: "elle" } },
  { ou: "À l’atelier de dessin", chose: nm("feuille", "feuilles", true), dessin: "feuille", qui: nm("élève", "élèves"), boite: nm("pochette", "pochettes", true) },
  { ou: "À l’anniversaire", chose: nm("chapeau de fête", "chapeaux de fête"), dessin: "chapeau", qui: nm("table", "tables", true), boite: nm("sachet", "sachets") },
  { ou: "À la récré", chose: nm("bille", "billes", true), qui: nm("joueur", "joueurs"), boite: nm("sachet", "sachets") },
  { ou: "À la pâtisserie", chose: nm("macaron", "macarons"), qui: nm("assiette", "assiettes", true), boite: nm("boîte", "boîtes", true), metier: { nom: "Le pâtissier", il: "il" } },
  { ou: "Au marché de Saint-Pierre", chose: nm("letchi", "letchis"), qui: nm("cliente", "clientes", true), boite: nm("sachet", "sachets"), metier: { nom: "La marchande", il: "elle" } },
  { ou: "Dans la classe", chose: nm("crayon", "crayons"), qui: nm("groupe", "groupes"), boite: nm("trousse", "trousses", true), metier: { nom: "La maîtresse", il: "elle" } },
  { ou: "À la ferme", chose: nm("œuf", "œufs"), qui: nm("panier", "paniers"), boite: nm("boîte", "boîtes", true), metier: { nom: "La fermière", il: "elle" } },
  { ou: "Au potager", chose: nm("graine", "graines", true), qui: nm("jardinière", "jardinières", true), boite: nm("sachet", "sachets"), metier: { nom: "Le jardinier", il: "il" } },
  { ou: "À la boulangerie", chose: nm("croissant", "croissants"), qui: nm("vitrine", "vitrines", true), boite: nm("plateau", "plateaux"), metier: { nom: "La boulangère", il: "elle" } },
  { ou: "À la cantine", chose: nm("yaourt", "yaourts"), qui: nm("table", "tables", true), boite: nm("pack", "packs"), metier: { nom: "Le cuisinier", il: "il" } },
  { ou: "À la papeterie", chose: nm("cahier", "cahiers"), qui: nm("classe", "classes", true), boite: nm("paquet", "paquets"), metier: { nom: "Le libraire", il: "il" } },
  { ou: "Au musée", chose: nm("carte postale", "cartes postales", true), qui: nm("présentoir", "présentoirs"), boite: nm("pochette", "pochettes", true), metier: { nom: "La guide", il: "elle" } },
  { ou: "À l’atelier couture", chose: nm("bouton", "boutons"), qui: nm("gilet", "gilets"), boite: nm("boîte", "boîtes", true), metier: { nom: "La couturière", il: "elle" } },
  { ou: "À la piscine", chose: nm("bouée", "bouées", true), qui: nm("couloir", "couloirs"), boite: nm("filet", "filets"), metier: { nom: "Le maître-nageur", il: "il" } },
  { ou: "À l’atelier de perles", chose: nm("perle", "perles", true), qui: nm("collier", "colliers"), boite: nm("pot", "pots") },
  { ou: "Au bureau de poste", chose: nm("lettre", "lettres", true), qui: nm("facteur", "facteurs"), boite: nm("sac", "sacs"), metier: { nom: "La postière", il: "elle" } },
  { ou: "Sur le bateau pirate", chose: nm("pièce d’or", "pièces d’or", true), qui: nm("pirate", "pirates"), boite: nm("coffre", "coffres"), metier: { nom: "La capitaine", il: "elle" } },
  { ou: "Au zoo", chose: nm("carotte", "carottes", true), qui: nm("enclos", "enclos"), boite: nm("seau", "seaux"), metier: { nom: "La soigneuse", il: "elle" } },
  { ou: "Sur le chantier", chose: nm("brique", "briques", true), qui: nm("ouvrier", "ouvriers"), boite: nm("palette", "palettes", true), metier: { nom: "Le maçon", il: "il" } },
  { ou: "À l’imprimerie", chose: nm("affiche", "affiches", true), qui: nm("école", "écoles", true), boite: nm("carton", "cartons"), metier: { nom: "L’imprimeur", il: "il" } },
];

const sit = () => pick(SITS);
const sitDessinable = () => pick(SITS.filter((s) => s.dessin));
const accord = (participe: string, n: Nom) => `${participe}${n.fem ? "e" : ""}s`;
const minus = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const ouSans = (s: Sit) =>
  s.metier && s.ou.includes(s.metier.nom.split(/[ ’]/).pop()!) ? pick(["Ce matin", "Aujourd’hui", "Pour la journée"]) : s.ou;
const chacun = (n: Nom) => (n.fem ? "chacune" : "chacun");
const unUne = (n: Nom) => (n.fem ? "une" : "un");
const complets = (n: Nom) => (n.fem ? "complètes" : "complets");
const unMetier = () => pick(SITS.filter((s) => s.metier)).metier!;

/** Une fois sur trois, un enfant pose la question : la même phrase revient moins vite. */
function habille(text: string): string {
  if (Math.random() < 0.65 || /^(Défi|Nombre mystère)/.test(text)) return text;
  const p = quelquun();
  const suite = /^(On|Si|Tu|Une|Un|Quelle|Quel|Quels|Combien|Les|Famille|Avec|Complète|Diviser|Pour|Dans|Lis|Que|Comment|Trouve|Partage|Regarde|Au|Aux|À|Chez|Sur|Le|La|L’|Il|Elle|Avant|Sans|Pose|Effectue|Vérifie|Voici|Calcule|Nombre|Division|Après|Entre|Par|Peut-on|Est-ce)(?=[\s’-])/.test(text)
    ? minus(text)
    : text;
  return pick([
    `Défi ${deM(p.nom)} : ${suite}`,
    `Question ${deM(p.nom)} : ${suite}`,
    `${p.nom} te demande : ${suite}`,
    `Calcul éclair : ${suite}`,
    `À toi de jouer : ${suite}`,
  ]);
}

/** QCM à réponse numérique (entier ou décimal), avec son unité éventuelle. */
function qcmN(text: string, n: number, pieges: readonly number[], explanation: string, canvas?: Q["canvas"], u = ""): Q {
  return {
    text: habille(text),
    format: "qcm",
    choices: choixX(n, pieges, u),
    expected: [lu(n, u)],
    comparator: "mcq_exact",
    explanation,
    ...(canvas ? { canvas } : {}),
  };
}

/** QCM à réponse en mots ou en calcul. */
function qcmM(text: string, correct: string, pieges: readonly string[], explanation: string, canvas?: Q["canvas"]): Q {
  return {
    text: habille(text),
    format: "qcm",
    choices: choixM(correct, pieges),
    expected: [correct],
    comparator: "mcq_exact",
    explanation,
    ...(canvas ? { canvas } : {}),
  };
}

const parfois = <T,>(p: number, f: () => T | undefined): T | undefined => (Math.random() < p ? f() : undefined);

/* ---------------- Les dessins ---------------- */

function divisionCanvas(data: {
  dividende: number | string;
  diviseur: number | string;
  quotient: number | string;
  reste?: number | string;
  title?: string;
  questionLabel?: string;
  showResult?: boolean;
}) {
  const s = (x: number | string) => (typeof x === "number" ? fr(x) : x);
  return calculPoseCanvas({
    operation: "division",
    title: data.title ?? "Division posée",
    numbers: [s(data.dividende), s(data.diviseur)],
    result: s(data.quotient),
    division: {
      dividende: s(data.dividende),
      diviseur: s(data.diviseur),
      quotient: s(data.quotient),
      reste: s(data.reste ?? 0),
    },
    questionLabel: data.questionLabel,
    display: { showResult: data.showResult ?? false, showRetenues: false },
  });
}

/** Une collection à partager, en vrac (par 5) : jamais les parts toutes faites. */
const vrac = (s: Sit, total: number): ObjetsCanvasData | undefined =>
  s.dessin && total <= 30 ? objetsEnVrac(s.dessin, total) : undefined;

/** Un groupement à faire : le total, un paquet connu, le nombre de paquets à trouver. */
const barreGroupes = (k: number | string, total: number | string, boite: Nom) =>
  barre([[`1 ${boite.un}`, typeof k === "number" ? fr(k) : k], ["encore…", null]], typeof total === "number" ? fr(total) : total, `Combien ${deM(boite.des)} de ${typeof k === "number" ? fr(k) : k} ?`);

/** n parts égales inconnues ; au-delà de 8 parts, la barre ne tient plus : la potence. */
const dessinPartage = (s: Sit, t: number, n: number) =>
  vrac(s, t) ??
  barreEgale(n, null, fr(t)) ??
  divisionCanvas({ dividende: t, diviseur: n, quotient: t / n, questionLabel: `${fr(t)} partagés en ${n} parts égales.` });
const dessinGroupement = (s: Sit, t: number, k: number) => vrac(s, t) ?? barreGroupes(k, t, s.boite);

/** Une multiplication CONNUE en rangées (le schéma de billes). */
function rangees(quoi: ObjetId, a: number, b: number): ObjetsCanvasData | undefined {
  let rangs = a;
  let parRang = b;
  if (parRang > 5 && rangs <= 5 && parRang <= 6) [rangs, parRang] = [parRang, rangs];
  if (parRang > 5 || rangs > 6) return undefined;
  return {
    kind: "objets",
    mode: "couleur",
    elements: Array.from({ length: rangs }, () => ({ quoi, nombre: parRang })),
    colonnes: 1,
    consigne: `${rangs} rangées de ${parRang}`,
  };
}

/** Le tableau des tables, en morceau : la ligne `ligne`, la case surlignée. */
function tableDesTables(ligne: number, colonne: number, cacher: "colonne" | "case", questionLabel?: string): TableauDonneesCanvasData | undefined {
  if (ligne < 2 || ligne > 10 || colonne < 1 || colonne > 10) return undefined;
  const l0 = Math.min(Math.max(ligne - 1, 2), 8);
  const c0 = Math.min(Math.max(colonne - 2, 1), 6);
  const lignes = [l0, l0 + 1, l0 + 2];
  const cols = [c0, c0 + 1, c0 + 2, c0 + 3, c0 + 4];
  return {
    kind: "tableau_donnees",
    title: "Le tableau des tables",
    coin: "×",
    headers: cols.map((c) => (c === colonne && cacher === "colonne" ? "?" : String(c))),
    rows: lignes.map((l) => ({
      label: String(l),
      values: cols.map((c) => (l === ligne && c === colonne && cacher === "case" ? "?" : l * c)),
    })),
    highlight: { cell: { row: lignes.indexOf(ligne), col: cols.indexOf(colonne) } },
    ...(questionLabel ? { questionLabel } : {}),
    display: { compact: true },
  } as TableauDonneesCanvasData;
}

/** Quelques multiples d'un diviseur (à 1 ou 2 chiffres) autour d'un nombre. */
function tableMultiples(d: number, autour: number, question?: string): TableauDonneesCanvasData {
  const k0 = Math.max(1, Math.floor(autour / d) - 1);
  const ks = [k0, k0 + 1, k0 + 2, k0 + 3];
  return {
    kind: "tableau_donnees",
    title: `Les multiples de ${d}`,
    coin: "×",
    headers: ks.map(String),
    rows: [{ label: String(d), values: ks.map((k) => fr(d * k)) }],
    questionLabel: question ?? `Entre quels multiples de ${d} se trouve ${fr(autour)} ?`,
    display: { compact: true },
  } as TableauDonneesCanvasData;
}

/* ---------------- DIVISION_SENS ---------------- */

/** [diviseur, quotient] : tables (★1), dizaines et centaines (★2), diviseur à 2 chiffres (★3). */
function nombresSens(e: E3): [number, number] {
  if (e === 1) return [rint(3, 9), rint(3, 9)];
  if (e === 2) return Math.random() < 0.65 ? [rint(2, 9), 10 * rint(2, 9)] : [rint(2, 6), 100 * rint(2, 9)];
  return [pick([11, 12, 12, 15, 15, 20, 25, 25, 30, 40, 50]), rint(3, 9)];
}

/** Le calcul d'une division exacte, expliqué : dizaines, centaines, ou multiplication à trou. */
function calculDivision(t: number, n: number, q: number): string {
  if (n < 10 && q >= 100 && q % 100 === 0)
    return `${fr(t)} = ${t / 100} centaines. ${t / 100} ÷ ${n} = ${q / 100}, car ${n} × ${q / 100} = ${t / 100}. Donc ${fr(t)} ÷ ${n} = ${q / 100} centaines = ${fr(q)}.`;
  if (n < 10 && q >= 10 && q % 10 === 0)
    return `${fr(t)} = ${t / 10} dizaines. ${t / 10} ÷ ${n} = ${q / 10}, car ${n} × ${q / 10} = ${t / 10}. Donc ${fr(t)} ÷ ${n} = ${q / 10} dizaines = ${fr(q)}.`;
  return `${n} fois combien font ${fr(t)} ? ${n} × ${q} = ${fr(t)}, donc ${fr(t)} ÷ ${n} = ${q}.`;
}

/** Les pièges d'un quotient : le diviseur, la soustraction, ±1, et le zéro oublié ou ajouté. */
const piegesQuotient = (t: number, n: number, q: number) =>
  q >= 100 && q % 100 === 0
    ? [q / 10, q / 100, q * 10, n, q + 100, q - 100]
    : q >= 10 && q % 10 === 0
      ? [q / 10, q * 10, n, q + 10, q - 10, t - n]
      : [n, t - n, q + 1, q - 1, t + n, q * 2];

function textePartage(s: Sit, t: number, n: number, p: Prenom, e: E5): string {
  const c = s.chose;
  const q = s.qui;
  const T = fr(t);
  const tournures = [
    `${s.ou}, on partage ${T} ${c.des} entre ${n} ${q.des}. Combien ${deM(c.des)} pour chaque ${q.un} ?`,
    `On partage ${T} ${c.des} entre ${n} ${q.des}, à parts égales. Combien pour chaque ${q.un} ?`,
    `${p.nom} partage ${T} ${c.des} entre ${n} ${q.des}. Combien ${deM(c.des)} pour chaque ${q.un} ?`,
    `${T} ${c.des} à partager entre ${n} ${q.des}. Combien ${deM(c.des)} pour chaque ${q.un} ?`,
    `${s.ou}, ${T} ${c.des} sont ${accord("partagé", c)} en ${n} parts égales. Combien ${deM(c.des)} dans chaque part ?`,
    `Partage ${T} ${c.des} en ${n} parts égales. Combien ${deM(c.des)} dans chaque part ?`,
    `${p.nom} a ${T} ${c.des}. ${maj(p.il)} les partage entre ${n} ${q.des}. Combien pour chaque ${q.un} ?`,
    `${s.ou}, il y a ${T} ${c.des} pour ${n} ${q.des}, autant pour ${chacun(q)}. Combien pour chaque ${q.un} ?`,
  ];
  if (s.metier) tournures.push(`${s.metier.nom} partage ${T} ${c.des} entre ${n} ${q.des}. Combien ${deM(c.des)} pour chaque ${q.un} ?`);
  if (e >= 3 && s.metier)
    tournures.push(
      `${ouSans(s)}, ${minus(s.metier.nom)} a reçu ${T} ${c.des}. ${maj(s.metier.il)} les répartit en parts égales entre ${n} ${q.des}. Combien ${deM(c.des)} pour chaque ${q.un} ?`,
      `${s.metier.nom} doit répartir ${T} ${c.des} entre ${n} ${q.des}, sans en garder. Combien ${deM(c.des)} met-${s.metier.il} pour chaque ${q.un} ?`,
    );
  return pick(tournures);
}

function texteGroupement(s: Sit, t: number, k: number, p: Prenom, e: E5): string {
  const c = s.chose;
  const b = s.boite;
  const T = fr(t);
  const tournures = [
    `${s.ou}, on range ${T} ${c.des} dans des ${b.des} de ${k}. Combien ${deM(b.des)} remplit-on ?`,
    `${p.nom} met ${k} ${c.des} dans chaque ${b.un}. ${maj(p.il)} a ${T} ${c.des}. Combien ${deM(b.des)} remplit-${p.il} ?`,
    `${T} ${c.des}, ${k} par ${b.un}. Combien ${deM(b.des)} faut-il ?`,
    `Avec ${T} ${c.des}, combien ${deM(b.des)} de ${k} peut-on remplir ?`,
    `${s.ou}, il y a ${T} ${c.des}. On fait des ${b.des} de ${k}. Combien ${deM(b.des)} obtient-on ?`,
    `${p.nom} prépare des ${b.des} de ${k} ${c.des}. ${maj(p.il)} a ${T} ${c.des}. Combien ${deM(b.des)} prépare-t-${p.il} ?`,
    `On range ${T} ${c.des} par ${b.des} de ${k}. Combien de fois ${k} tient-il dans ${T} ?`,
  ];
  if (s.metier) tournures.push(`${s.metier.nom} range ${T} ${c.des} par ${b.des} de ${k}. Combien ${deM(b.des)} remplit-${s.metier.il} ?`);
  if (e >= 3 && s.metier)
    tournures.push(
      `${ouSans(s)}, ${minus(s.metier.nom)} reçoit ${T} ${c.des}. ${maj(s.metier.il)} les range par ${b.des} de ${k}, sans en laisser. Combien ${deM(b.des)} lui faut-il ?`,
      `${s.metier.nom} a ${T} ${c.des} à ranger. Dans chaque ${b.un}, ${s.metier.il} en met ${k}. Combien ${deM(b.des)} remplit-${s.metier.il} ?`,
    );
  return pick(tournures);
}

function partageQ(e: E3): Q {
  const [n, q] = nombresSens(e);
  const t = n * q;
  const s = sit();
  return qcmN(
    textePartage(s, t, n, quelquun(), e),
    q,
    piegesQuotient(t, n, q),
    exp(
      "Partager en parts égales, c’est faire une division.",
      `Le nombre qu’on partage passe en premier : on calcule ${fr(t)} ÷ ${n}.`,
      calculDivision(t, n, q),
      `Il y a ${fr(q)} ${s.chose.des} pour chaque ${s.qui.un}.`,
    ),
    parfois(0.85, () => dessinPartage(s, t, n)),
  );
}

function groupementQ(e: E3): Q {
  const [k, q] = nombresSens(e);
  const t = k * q;
  const s = sit();
  return qcmN(
    texteGroupement(s, t, k, quelquun(), e),
    q,
    piegesQuotient(t, k, q),
    exp(
      "Faire des groupes de même taille et compter les groupes, c’est aussi une division.",
      `On cherche combien de fois ${k} tient dans ${fr(t)} : ${fr(t)} ÷ ${k}.`,
      calculDivision(t, k, q),
      `On remplit ${fr(q)} ${s.boite.des}.`,
    ),
    parfois(0.85, () => dessinGroupement(s, t, k)),
  );
}

/** Quel calcul écrire ? Le nombre qu'on partage passe en premier. */
function ordreCalculQ(e: E3): Q {
  const [n, q] = nombresSens(e);
  const t = n * q;
  const T = fr(t);
  const s = sit();
  const c = s.chose;
  const p = quelquun();
  const groupement = Math.random() < 0.35;
  const text = groupement
    ? pick([
        `On range ${T} ${c.des} par ${s.boite.des} de ${n}. Quelle division donne le nombre ${deM(s.boite.des)} ?`,
        `${p.nom} fait des ${s.boite.des} de ${n} avec ${T} ${c.des}. Quel calcul donne le nombre ${deM(s.boite.des)} ?`,
        `${s.ou}, on met ${n} ${c.des} par ${s.boite.un}. Il y en a ${T}. Quel calcul écrire ?`,
      ])
    : pick([
        `Pour partager ${T} ${c.des} entre ${n} ${s.qui.des}, quel calcul écrit-on ?`,
        `${p.nom} partage ${T} ${c.des} entre ${n} ${s.qui.des}. Quelle division écrit-${p.il} ?`,
        `${s.ou}, on partage ${T} ${c.des} en ${n} parts égales. Quelle division faut-il faire ?`,
      ]);
  return qcmM(
    text,
    `${T} ÷ ${n}`,
    [`${n} ÷ ${T}`, `${T} × ${n}`, `${T} − ${n}`, `${T} + ${n}`],
    exp(
      "Dans une division, le nombre qu’on partage s’écrit en premier : c’est le dividende.",
      "Le dividende, puis « ÷ », puis le diviseur (le nombre de parts ou la taille d’un groupe).",
      `${T} ÷ ${n} = ${fr(q)}. Attention : ${n} ÷ ${T}, ce serait partager ${n} en ${T} parts.`,
      `On écrit ${T} ÷ ${n}.`,
    ),
    parfois(0.8, () => (groupement ? dessinGroupement(s, t, n) : dessinPartage(s, t, n))),
  );
}

/** Une division ne se retourne pas. */
function piegeOrdreQ(e: E3): Q {
  const [b, q] = nombresSens(e);
  const a = b * q;
  const A = fr(a);
  const p = quelquun();
  const text = pick([
    `${p.nom} dit : « ${A} ÷ ${b} = ${fr(q)}, donc ${b} ÷ ${A} = ${fr(q)} aussi. » A-t-${p.il} raison ?`,
    `${A} ÷ ${b} = ${fr(q)}. Est-ce que ${b} ÷ ${A} fait aussi ${fr(q)} ?`,
    `${p.nom} a écrit ${b} ÷ ${A} = ${fr(q)} au lieu de ${A} ÷ ${b} = ${fr(q)}. Est-ce pareil ?`,
    `On peut retourner ${fr(q)} × ${b} en ${b} × ${fr(q)}. Peut-on retourner ${A} ÷ ${b} en ${b} ÷ ${A} ?`,
  ]);
  return qcmM(
    text,
    `Non : ${b} ÷ ${A}, c’est partager ${b} en ${A} parts, ça ne fait pas ${fr(q)}.`,
    ["Oui : on peut échanger les deux nombres, comme dans une multiplication.", "Oui : les deux calculs ont les mêmes nombres.", "Oui : le résultat ne dépend pas de l’ordre."],
    exp(
      `Une multiplication se retourne : ${fr(q)} × ${b} = ${b} × ${fr(q)}. Une division, non.`,
      `${A} ÷ ${b}, c’est ${A} partagés en ${b} parts : ${fr(q)} dans chaque part.`,
      `${b} ÷ ${A}, c’est ${b} partagés en ${A} parts : chaque part est plus petite que 1.`,
      "Le dividende (le nombre qu’on partage) passe en premier.",
    ),
    parfois(0.75, () => barreEgale(b, null, A) ?? divisionCanvas({ dividende: a, diviseur: b, quotient: q })),
  );
}

/** Le vocabulaire : dividende, diviseur. */
function grandPremierQ(e: E3): Q {
  const [n, q] = nombresSens(e);
  const t = n * q;
  const T = fr(t);
  const s = sit();
  const c = s.chose;
  const p = quelquun();
  if (Math.random() < 0.5)
    return qcmM(
      pick([
        `On partage ${T} ${c.des} entre ${n} ${s.qui.des}. Quel nombre écrit-on en premier dans la division ?`,
        `${p.nom} partage ${T} ${c.des} entre ${n} ${s.qui.des}. Par quel nombre commence sa division ?`,
        `${s.ou}, on partage ${T} ${c.des} en ${n} parts égales. Quel nombre passe en premier ?`,
      ]),
      `${T}, le nombre ${deM(c.des)} à partager`,
      [`${n}, le nombre de parts`, "le plus petit des deux nombres", "peu importe l’ordre"],
      exp("Dans une division, on écrit d’abord ce qu’on partage : le dividende.", "Le dividende passe en premier, le diviseur ensuite.", `On écrit ${T} ÷ ${n} = ${fr(q)}, et non ${n} ÷ ${T}.`, `On commence par ${T}.`),
      parfois(0.85, () => dessinPartage(s, t, n)),
    );
  const quoi = pick(["dividende", "diviseur", "quotient"] as const);
  const bon = quoi === "dividende" ? T : quoi === "diviseur" ? String(n) : fr(q);
  return qcmM(
    pick([
      `Dans ${T} ÷ ${n} = ${fr(q)}, quel nombre est le ${quoi} ?`,
      `${p.nom} écrit ${T} ÷ ${n} = ${fr(q)}. Quel est le ${quoi} ?`,
      `On partage ${T} ${c.des} entre ${n} ${s.qui.des} : ${T} ÷ ${n} = ${fr(q)}. Quel est le ${quoi} ?`,
    ]),
    bon,
    [T, String(n), fr(q), String(n + q)],
    exp(
      "Dans une division : dividende ÷ diviseur = quotient.",
      "Le dividende est le nombre qu’on partage, le diviseur le nombre de parts, le quotient la valeur d’une part.",
      `${T} est le dividende, ${n} le diviseur, ${fr(q)} le quotient.`,
      `Le ${quoi} est ${bon}.`,
    ),
    parfois(0.8, () => divisionCanvas({ dividende: t, diviseur: n, quotient: q, showResult: true, title: "Dividende ÷ diviseur" })),
  );
}

/** Lire le signe ÷. */
function signeQ(e: E3): Q {
  const [b, q] = nombresSens(e);
  const a = b * q;
  const A = fr(a);
  const p = quelquun();
  if (Math.random() < 0.6)
    return qcmM(
      pick([
        `Que veut dire ${A} ÷ ${b} ?`,
        `${p.nom} lit « ${A} ÷ ${b} ». Qu’est-ce que ça veut dire ?`,
        `Au tableau, le maître écrit ${A} ÷ ${b}. Que veut dire ce calcul ?`,
        `Sur son cahier, ${p.nom} écrit ${A} ÷ ${b}. Que veut dire ce calcul ?`,
      ]),
      `partager ${A} en ${b} parts égales`,
      [`partager ${b} en ${A} parts égales`, `ajouter ${A} et ${b}`, `enlever ${b} à ${A}`, `multiplier ${A} par ${b}`],
      exp("Le signe ÷ se lit « divisé par ».", `${A} ÷ ${b}, c’est partager ${A} en ${b} parts égales (ou chercher combien de fois ${b} tient dans ${A}).`, `${A} ÷ ${b} = ${fr(q)}, car ${b} × ${fr(q)} = ${A}.`, `${A} ÷ ${b} veut dire partager ${A} en ${b} parts égales.`),
      parfois(0.8, () => barreEgale(b, null, A) ?? divisionCanvas({ dividende: a, diviseur: b, quotient: q })),
    );
  return qcmM(
    pick([`Comment lit-on ${A} ÷ ${b} ?`, `${p.nom} doit lire « ${A} ÷ ${b} » à voix haute. Que dit-${p.il} ?`, `Comment dit-on ${A} ÷ ${b} en mots ?`]),
    `${A} divisé par ${b}`,
    [`${A} fois ${b}`, `${b} divisé par ${A}`, `${A} moins ${b}`],
    exp("Le signe ÷ se lit « divisé par ».", "On lit le dividende, puis « divisé par », puis le diviseur.", `${A} ÷ ${b} se lit « ${A} divisé par ${b} » et vaut ${fr(q)}.`, `On dit « ${A} divisé par ${b} ».`),
    parfois(0.6, () => barreEgale(b, null, A) ?? divisionCanvas({ dividende: a, diviseur: b, quotient: q })),
  );
}

/** Partage ou groupement : que cherche-t-on ? */
function queChercheQ(e: E3): Q {
  const [k, q] = nombresSens(e);
  const t = k * q;
  const T = fr(t);
  const s = sit();
  const c = s.chose;
  const p = quelquun();
  if (Math.random() < 0.5) {
    const b = s.boite;
    return qcmM(
      pick([
        `On range ${T} ${c.des} dans des ${b.des} de ${k}. Que cherche-t-on ?`,
        `${p.nom} met ${T} ${c.des} par ${b.des} de ${k}. Quelle question se pose-t-${p.il} ?`,
        `${s.ou}, on fait des ${b.des} de ${k} avec ${T} ${c.des}. Que faut-il trouver ?`,
      ]),
      `combien ${deM(b.des)} on remplit`,
      [`combien ${deM(c.des)} dans chaque ${b.un}`, `combien ${deM(c.des)} il y a en tout`, `combien ${deM(c.des)} il reste`],
      exp("Dans un groupement, on connaît la taille d’un groupe.", `On sait déjà qu’il y a ${k} ${c.des} par ${b.un} : on cherche le nombre ${deM(b.des)}.`, `${T} ÷ ${k} = ${fr(q)} ${b.des}.`, `On cherche combien ${deM(b.des)} on remplit.`),
      parfois(0.8, () => dessinGroupement(s, t, k)),
    );
  }
  return qcmM(
    pick([
      `On partage ${T} ${c.des} entre ${k} ${s.qui.des}. Que cherche-t-on ?`,
      `${p.nom} partage ${T} ${c.des} entre ${k} ${s.qui.des}. Quelle question se pose-t-${p.il} ?`,
      `${s.ou}, ${T} ${c.des} sont ${accord("partagé", c)} entre ${k} ${s.qui.des}. Que faut-il trouver ?`,
    ]),
    `combien ${deM(c.des)} pour chaque ${s.qui.un}`,
    [`combien ${deM(s.qui.des)} il y a`, `combien ${deM(c.des)} il y a en tout`, `combien ${deM(c.des)} il reste`],
    exp("Dans un partage, on connaît le nombre de parts.", `On sait déjà qu’il y a ${k} ${s.qui.des} : on cherche la part de ${chacun(s.qui)}.`, `${T} ÷ ${k} = ${fr(q)}.`, `On cherche combien ${deM(c.des)} pour chaque ${s.qui.un}.`),
    parfois(0.8, () => dessinPartage(s, t, k)),
  );
}

/** Choisir l'opération : partager (÷), grouper (÷) ou répéter (×). */
function choisirOperationQ(e: E3): Q {
  const [n, q] = nombresSens(e);
  const t = n * q;
  const T = fr(t);
  const s = sit();
  const c = s.chose;
  const p = quelquun();
  const question = pick(["Quel calcul faut-il faire ?", "Quelle opération permet de répondre ?", "Quel calcul choisis-tu ?"]);
  const f = rint(1, 3);
  if (f === 1) {
    const k = rint(3, 9);
    return qcmM(
      pick([
        `${s.ou}, il y a ${n} ${s.boite.des} de ${k} ${c.des}. On veut le nombre ${deM(c.des)} en tout. ${question}`,
        `${p.nom} remplit ${n} ${s.boite.des} avec ${k} ${c.des} dans ${s.boite.fem ? "chacune" : "chacun"}. Combien ${deM(c.des)} en tout ? ${question}`,
      ]),
      `${n} × ${k}`,
      [`${n * k} ÷ ${n}`, `${n} + ${k}`, `${k} ÷ ${n}`, ...(n > k ? [`${n} − ${k}`] : [])],
      exp("On choisit l’opération d’après l’histoire.", `La même quantité (${k}) revient ${n} fois : c’est une multiplication.`, `${n} × ${k} = ${n * k}.`, `Le calcul est ${n} × ${k}.`),
      parfois(0.8, () => (s.dessin && k <= 5 && n <= 6 ? objetsGroupes(s.dessin, n, k) : barreEgale(n, String(k), null) ?? barre([[`1 ${s.boite.un}`, String(k)], ["…", null]], null, `${n} ${s.boite.des}`))),
    );
  }
  const partage = f === 2;
  return qcmM(
    partage
      ? pick([
          `${s.ou}, on partage ${T} ${c.des} entre ${n} ${s.qui.des}. On cherche la part de ${chacun(s.qui)}. ${question}`,
          `${p.nom} doit partager ${T} ${c.des} entre ${n} ${s.qui.des}. ${question}`,
        ])
      : pick([
          `${s.ou}, on range ${T} ${c.des} par ${s.boite.des} de ${n}. On cherche le nombre ${deM(s.boite.des)}. ${question}`,
          `${p.nom} fait des ${s.boite.des} de ${n} avec ${T} ${c.des}. ${question}`,
        ]),
    `${T} ÷ ${n}`,
    [`${T} × ${n}`, `${T} − ${n}`, `${T} + ${n}`, `${n} ÷ ${T}`],
    exp(
      partage ? "Partager en parts égales, c’est diviser." : "Faire des groupes de même taille et les compter, c’est diviser.",
      "Le nombre qu’on partage (le dividende) passe en premier.",
      `${T} ÷ ${n} = ${fr(q)}.`,
      `Le calcul est ${T} ÷ ${n}.`,
    ),
    parfois(0.8, () => (partage ? dessinPartage(s, t, n) : dessinGroupement(s, t, n))),
  );
}

/** L'erreur d'un élève : il a multiplié, soustrait ou additionné au lieu de diviser. */
function erreurEleveQ(e: E3): Q {
  const [n, q] = nombresSens(e);
  const t = n * q;
  const T = fr(t);
  const s = sit();
  const c = s.chose;
  const p = quelquun();
  const op = pick(["÷", "×", "−", "+", "÷"]);
  const calc = `${T} ${op} ${n}`;
  const text = pick([
    `${p.nom} lit : « ${T} ${c.des} ${accord("partagé", c)} entre ${n} ${s.qui.des} ». ${maj(p.il)} calcule ${calc}. Qu’en penses-tu ?`,
    `Pour partager ${T} ${c.des} entre ${n} ${s.qui.des}, ${p.nom} écrit ${calc}. Est-ce le bon calcul ?`,
    `${s.ou}, il faut partager ${T} ${c.des} entre ${n} ${s.qui.des}. ${p.nom} propose ${calc}. Qu’en penses-tu ?`,
  ]);
  const juste = op === "÷";
  const bonne = juste ? `C’est juste : ${T} ÷ ${n} = ${fr(q)}.` : `C’est faux : il fallait ${T} ÷ ${n} = ${fr(q)}.`;
  const pieges = juste
    ? [`C’est faux : il fallait ${T} × ${n}.`, `C’est faux : il fallait ${n} ÷ ${T}.`, `C’est faux : il fallait ${T} − ${n}.`]
    : ["C’est juste.", `C’est faux : il fallait ${n} ÷ ${T}.`, ...(op !== "−" ? [`C’est faux : il fallait ${T} − ${n}.`] : [`C’est faux : il fallait ${T} × ${n}.`])];
  return qcmM(
    text,
    bonne,
    pieges,
    exp(
      "Partager une quantité entre plusieurs, c’est diviser.",
      "Le dividende (ce qu’on partage) ÷ le diviseur (le nombre de parts).",
      `${T} ÷ ${n} = ${fr(q)}${juste ? "." : `, et non ${calc}.`}`,
      juste ? `${p.nom} a choisi le bon calcul.` : `${p.nom} s’est trompé${p.il === "elle" ? "e" : ""} d’opération.`,
    ),
    parfois(0.8, () => dessinPartage(s, t, n)),
  );
}

/** Les partages qui tombent juste… après la virgule : 7 ÷ 4 = 1,75. */
type PartageDec = { u: string; texte: (a: string, n: number, p: Prenom) => string; d?: readonly number[] };
const PARTAGES_DEC: readonly PartageDec[] = [
  { u: "L", texte: (a, n) => `On verse ${a} L de jus dans ${n} carafes, autant dans chacune. Combien de litres par carafe ?` },
  { u: "€", texte: (a, n) => `${n} amis se partagent ${a} € à parts égales. Combien reçoit chacun ?`, d: [2, 4, 5] },
  { u: "m", texte: (a, n) => `La couturière coupe un ruban de ${a} m en ${n} morceaux égaux. Combien mesure un morceau ?` },
  { u: "kg", texte: (a, n) => `${a} kg de pommes sont répartis dans ${n} cagettes, autant dans chacune. Combien de kilos par cagette ?` },
  { u: "km", texte: (a, n) => `Une randonnée de ${a} km se fait en ${n} étapes de même longueur. Combien de kilomètres par étape ?` },
  { u: "m", texte: (a, n) => `Le menuisier scie une planche de ${a} m en ${n} morceaux égaux. Combien mesure chaque morceau ?` },
  { u: "kg", texte: (a, n) => `La boulangère répartit ${a} kg de farine dans ${n} bocaux, autant dans chacun. Combien de kilos par bocal ?` },
  { u: "km", texte: (a, n) => `Un relais de ${a} km est couru par ${n} coureurs, chacun la même distance. Combien de kilomètres court chacun ?` },
  { u: "L", texte: (a, n) => `Le jardinier répartit ${a} L d’eau dans ${n} arrosoirs, autant dans chacun. Combien de litres par arrosoir ?` },
  { u: "€", texte: (a, n) => `${n} cousins offrent un cadeau à ${a} €. Chacun paie la même somme. Combien paie chacun ?`, d: [2, 4, 5] },
  { u: "L", texte: (a, n) => `Le peintre répartit ${a} L de peinture dans ${n} pots égaux. Combien de litres par pot ?` },
  { u: "€", texte: (a, n, p) => `${p.nom} achète ${n} stylos identiques pour ${a} €. Combien coûte un stylo ?`, d: [2, 4, 5] },
  { u: "m", texte: (a, n) => `L’électricienne coupe ${a} m de câble en ${n} morceaux de même longueur. Combien mesure un morceau ?` },
  { u: "kg", texte: (a, n) => `Le soigneur du zoo partage ${a} kg de viande entre ${n} lions, à parts égales. Combien de kilos pour chaque lion ?` },
];

/** Un entier non multiple de n, pour un quotient décimal exact (n = 2, 4, 5, 8). */
function dividendeDecimal(n: number, max = 40): number {
  let a = rint(n + 1, max);
  while (a % n === 0) a = rint(n + 1, max);
  return a;
}
/** Les pièges d'un quotient décimal : s'arrêter au reste, le reste derrière la virgule, la virgule oubliée. */
function piegesDec(a: number, n: number): number[] {
  const q = Math.floor(a / n);
  const r = a - q * n;
  const j = net(a / n);
  return [q, net(q + r / 10), q + 1, net(j * 10), net(j * 100), net(j + 1), r];
}
function expDec(a: number, n: number, u = ""): string {
  const q = Math.floor(a / n);
  const r = a - q * n;
  return exp(
    "Quand une quantité se mesure (litres, mètres, euros…), on peut continuer la division après la virgule.",
    `On partage d’abord les unités, puis le reste devient des dixièmes, puis des centièmes : ${a} = ${a},00.`,
    `${a} ÷ ${n} : ${q} unité${q > 1 ? "s" : ""}, il reste ${r}, soit ${r * 10} dixièmes. On continue jusqu’à un reste 0. ${a} ÷ ${n} = ${fr(a / n)} (vérification : ${n} × ${fr(a / n)} = ${a}).`,
    `Chaque part vaut ${lu(a / n, u)}.`,
  );
}

function partageDecimalQ(): Q {
  const P = pick(PARTAGES_DEC);
  const n = pick(P.d ?? [2, 4, 5, 8]);
  const a = dividendeDecimal(n, n === 8 ? 60 : 40);
  return qcmN(
    P.texte(String(a), n, quelquun()),
    a / n,
    piegesDec(a, n),
    expDec(a, n, P.u),
    Math.random() < 0.6 ? barreEgale(n, null, lu(a, P.u)) : divisionCanvas({ dividende: a, diviseur: n, quotient: fr(a / n), questionLabel: "Continue après la virgule." }),
    P.u,
  );
}

/** Peut-on continuer après la virgule ? Des euros oui, des enfants non. */
function virguleOuResteQ(): Q {
  const n = pick([2, 4, 5]);
  const a = dividendeDecimal(n, 39);
  const q = Math.floor(a / n);
  const r = a - q * n;
  const p = quelquun();
  const GENS = [
    { t: `ranger ${a} enfants en équipes de ${n}`, rep: `${q} équipes, et ${r} enfant${r > 1 ? "s" : ""} sans équipe` },
    { t: `mettre ${a} œufs dans des boîtes de ${n}`, rep: `${q} boîtes, et ${r} œuf${r > 1 ? "s" : ""} à part` },
    { t: `asseoir ${a} invités à des tables de ${n}`, rep: `${q} tables pleines, et ${r} invité${r > 1 ? "s" : ""} de plus` },
    { t: `partager ${a} billes entre ${n} joueurs`, rep: `${q} billes chacun, et ${r} bille${r > 1 ? "s" : ""} de reste` },
  ];
  const MESURES = [
    { t: `partager ${a} € entre ${n} amis`, rep: `${eur(a / n)} € chacun` },
    { t: `couper un ruban de ${a} m en ${n} morceaux égaux`, rep: `${fr(a / n)} m par morceau` },
    { t: `verser ${a} L de jus dans ${n} carafes égales`, rep: `${fr(a / n)} L par carafe` },
    { t: `répartir ${a} kg de sable dans ${n} seaux égaux`, rep: `${fr(a / n)} kg par seau` },
  ];
  const g = pick(GENS);
  const m = pick(MESURES);
  if (Math.random() < 0.5)
    return qcmM(
      pick([
        `Dans quelle situation la réponse peut-elle avoir une virgule ?`,
        `${p.nom} calcule ${a} ÷ ${n}. Dans quelle histoire peut-${p.il} continuer après la virgule ?`,
        `Quelle situation se termine par un quotient décimal ?`,
      ]),
      m.t,
      [pick(GENS.filter((x) => x !== g)).t, g.t, `compter ${a} élèves`],
      exp(
        "On continue après la virgule seulement si la quantité se coupe : des euros, des mètres, des litres, des kilos.",
        "Des enfants, des œufs, des billes ne se coupent pas : on s’arrête au reste.",
        `${a} ÷ ${n} = ${q} reste ${r}, ou ${fr(a / n)} si on continue après la virgule.`,
        `La bonne situation : ${m.t}.`,
      ),
      barreEgale(n, null, String(a)),
    );
  const quelle = Math.random() < 0.5;
  const s = quelle ? m : g;
  const autre = quelle ? `${q} reste ${r} pour chacun` : `${fr(a / n)} chacun`;
  return qcmM(
    pick([`On veut ${s.t}. Quelle réponse convient ?`, `${p.nom} doit ${s.t}. Quelle est la bonne réponse ?`, `Il faut ${s.t}. Que trouve-t-on ?`]),
    s.rep,
    [quelle ? g.rep : m.rep, autre, `${q + 1}`],
    exp(
      "On continue après la virgule seulement si la quantité se coupe.",
      quelle ? "Des euros, des mètres, des litres, des kilos se coupent : on continue la division." : "Des enfants, des œufs, des billes ne se coupent pas : on s’arrête au reste.",
      `${a} ÷ ${n} = ${q} reste ${r}, et ${a} ÷ ${n} = ${fr(a / n)} si on continue après la virgule.`,
      `La bonne réponse : ${s.rep}.`,
    ),
    divisionCanvas({ dividende: a, diviseur: n, quotient: quelle ? fr(a / n) : q, reste: quelle ? 0 : r, questionLabel: quelle ? "Continue-t-on après la virgule ?" : "S’arrête-t-on au reste ?" }),
  );
}

/* ---------------- DIVISION_LIEN_MULTIPLICATION ---------------- */

/** Deux facteurs : les tables (★1), un facteur à 2 chiffres (★2), deux grands facteurs (★3). */
function facteurs(e: E3): [number, number] {
  if (e === 1) {
    const a = rint(3, 9);
    let b = rint(3, 9);
    while (b === a) b = rint(3, 9);
    return [a, b];
  }
  if (e === 2) return [rint(3, 9), Math.random() < 0.5 ? rint(11, 25) : 10 * rint(2, 9)];
  return [pick([11, 12, 15, 20, 25]), rint(4, 30)];
}

const dessinProduit = (a: number, b: number) =>
  rangees(sitDessinable().dessin!, a, b) ??
  barreEgale(a, String(b), fr(a * b)) ??
  barreEgale(b, String(a), fr(a * b)) ??
  barre([[`1 groupe`, String(b)], ["…", null]], fr(a * b), `${a} groupes de ${b}`);

const expLien = (a: number, b: number, conclusion: string, calcul?: string) =>
  exp(
    "Une multiplication, deux divisions : la division cherche le nombre qui manque dans la multiplication.",
    `Les trois nombres ${a}, ${b} et ${fr(a * b)} forment une famille. Le plus grand, ${fr(a * b)}, est le dividende.`,
    calcul ?? `${a} × ${b} = ${fr(a * b)}, donc ${fr(a * b)} ÷ ${b} = ${a} et ${fr(a * b)} ÷ ${a} = ${b}.`,
    conclusion,
  );

function onSaitQueQ(e: E3): Q {
  const [a, b] = facteurs(e);
  const r = a * b;
  const R = fr(r);
  const d = pick([a, b]);
  const q = r / d;
  const p = quelquun();
  return qcmN(
    pick([
      `On sait que ${a} × ${b} = ${R}. Combien font ${R} ÷ ${d} ?`,
      `${p.nom} connaît ${a} × ${b} = ${R}. Que vaut ${R} ÷ ${d} ?`,
      `${a} × ${b} = ${R}. Alors, ${R} ÷ ${d} = ?`,
      `Si ${a} × ${b} = ${R}, combien font ${R} ÷ ${d} ?`,
      `${p.nom} a écrit ${a} × ${b} = ${R} sur son cahier. Combien font ${R} ÷ ${d} ?`,
      `Une multiplication, deux divisions : ${a} × ${b} = ${R}. Combien font ${R} ÷ ${d} ?`,
      `Tu connais ${b} × ${a} = ${R}. Combien font ${R} ÷ ${d} ?`,
    ]),
    q,
    [d, r, r - d, q + 1, q - 1, r + d],
    expLien(a, b, `${R} ÷ ${d} = ${q}.`),
    parfois(0.85, () => dessinProduit(a, b)),
  );
}

function deuxDivisionsQ(e: E3): Q {
  const [a, b] = facteurs(e);
  const r = a * b;
  const R = fr(r);
  const p = quelquun();
  return qcmM(
    pick([
      `${a} × ${b} = ${R}. Quelles sont les deux divisions ?`,
      `Tu connais ${a} × ${b} = ${R}. Quelles divisions connais-tu aussi ?`,
      `${p.nom} sait que ${a} × ${b} = ${R}. Quelles deux divisions en tire-t-${p.il} ?`,
      `Une multiplication, deux divisions. Avec ${a} × ${b} = ${R}, lesquelles ?`,
    ]),
    `${R} ÷ ${b} = ${a} et ${R} ÷ ${a} = ${b}`,
    [
      `${a} ÷ ${R} = ${b} et ${b} ÷ ${R} = ${a}`,
      `${R} ÷ ${a} = ${a} et ${R} ÷ ${b} = ${b}`,
      `${R} − ${a} = ${b} et ${R} − ${b} = ${a}`,
      `${R} ÷ ${b} = ${a} et ${b} ÷ ${a} = ${R}`,
    ],
    expLien(a, b, `Les deux divisions sont ${R} ÷ ${b} = ${a} et ${R} ÷ ${a} = ${b}.`),
    parfois(0.85, () => dessinProduit(a, b)),
  );
}

function familleQ(e: E3): Q {
  const [a, b] = facteurs(e);
  const r = a * b;
  const R = fr(r);
  const [x, y] = Math.random() < 0.5 ? [a, b] : [b, a];
  const p = quelquun();
  return qcmM(
    pick([
      `Les nombres ${a}, ${b} et ${R} forment une famille. Quelle division en fait partie ?`,
      `Famille de nombres : ${a}, ${b} et ${R}. Laquelle de ces divisions est juste ?`,
      `${p.nom} écrit la famille ${a}, ${b}, ${R}. Quelle division peut-${p.il} écrire avec ?`,
    ]),
    `${R} ÷ ${x} = ${y}`,
    [`${x} ÷ ${R} = ${y}`, `${R} ÷ ${x} = ${x}`, `${y} ÷ ${x} = ${R}`, `${R} ÷ ${y} = ${y}`],
    expLien(a, b, `${R} ÷ ${x} = ${y} fait partie de la famille.`),
    parfois(0.8, () => dessinProduit(a, b)),
  );
}

/** Le schéma de billes : on encadre les rangées, puis les colonnes. */
function rangeesColonnesQ(): Q {
  const s = sitDessinable();
  const c = s.chose;
  const a = rint(2, 6);
  let b = rint(2, 5);
  while (b === a) b = rint(2, 5);
  const r = a * b;
  const p = quelquun();
  const debut = pick([
    `${s.ou}, ${r} ${c.des} sont ${accord("rangé", c)} en ${a} rangées de ${b}.`,
    `${p.nom} range ${r} ${c.des} en ${a} rangées de ${b}.`,
    `Regarde : ${r} ${c.des}, en ${a} rangées de ${b}.`,
  ]);
  const f = rint(1, 3);
  let q: Q;
  if (f === 1)
    q = qcmN(`${debut} On les partage en ${a} groupes : les rangées. Combien ${deM(c.des)} dans chaque groupe ?`, b, [a, r, a + b, b + 1, b - 1], expLien(a, b, `${r} ÷ ${a} = ${b}.`, `On encadre les rangées : ${a} groupes de ${b}. ${r} ÷ ${a} = ${b}.`));
  else if (f === 2)
    q = qcmN(`${debut} On les partage en ${b} groupes : les colonnes. Combien ${deM(c.des)} dans chaque groupe ?`, a, [b, r, a + b, a + 1, a - 1], expLien(a, b, `${r} ÷ ${b} = ${a}.`, `On encadre les colonnes : ${b} groupes de ${a}. ${r} ÷ ${b} = ${a}.`));
  else
    q = qcmM(`${debut} On encadre les colonnes. Quelle division montre ce partage ?`, `${r} ÷ ${b} = ${a}`, [`${r} ÷ ${a} = ${a}`, `${b} ÷ ${r} = ${a}`, `${r} − ${b} = ${a}`, `${a} ÷ ${b} = ${r}`], expLien(a, b, `La division est ${r} ÷ ${b} = ${a}.`, `Il y a ${b} colonnes de ${a} : ${r} partagés en ${b} groupes, ${a} dans chaque groupe.`));
  return { ...q, canvas: rangees(s.dessin!, a, b) };
}

/** « 56 ÷ 8, c'est se demander : 8 fois combien font 56 ? » (et 84 ÷ 12 à ★2). */
function trouTableQ(e: E3): Q {
  const b = e === 1 ? rint(3, 9) : pick([11, 12, 15, 20, 25]);
  const q = rint(e === 1 ? 3 : 2, 9);
  const r = b * q;
  const p = quelquun();
  return qcmN(
    pick([
      `Complète : ${b} × ? = ${r}. Donc ${r} ÷ ${b} = ?`,
      `${r} ÷ ${b} : ${b} fois combien font ${r} ?`,
      `Pour calculer ${r} ÷ ${b}, ${p.nom} se demande : ${b} fois combien font ${r} ? Que trouve-t-${p.il} ?`,
      `Diviser, c’est chercher le nombre qui manque. ${b} × ? = ${r}. Combien font ${r} ÷ ${b} ?`,
      `${r} ÷ ${b} sans poser la division : quel nombre multiplié par ${b} donne ${r} ?`,
      `${p.nom} compte de ${b} en ${b} jusqu’à ${r}. Combien font ${r} ÷ ${b} ?`,
    ]),
    q,
    [b, q + 1, q - 1, r - b, r + b, q + 2],
    exp(
      `Diviser ${r} par ${b}, c’est se demander : ${b} fois combien font ${r} ?`,
      `On récite les multiples de ${b} : ${Array.from({ length: q }, (_, i) => b * (i + 1)).join(", ")}. Stop !`,
      `${b} × ${q} = ${r}, donc ${r} ÷ ${b} = ${q}. Et en cadeau : ${r} ÷ ${q} = ${b}.`,
      `${r} ÷ ${b} = ${q}.`,
    ),
    parfois(0.8, () => (b <= 9 && Math.random() < 0.5 ? tableDesTables(b, q, "colonne", `Ligne de ${b} : où est ${r} ?`) : tableMultiples(b, r, `Où est ${r} dans les multiples de ${b} ?`))),
  );
}

function multAideQ(e: E3): Q {
  const b = e === 1 ? rint(3, 9) : pick([11, 12, 15, 20, 25]);
  let q = rint(3, 9);
  while (q === b) q = rint(3, 9);
  const r = b * q;
  const p = quelquun();
  return qcmM(
    pick([
      `Quelle multiplication aide à calculer ${r} ÷ ${b} ?`,
      `${p.nom} veut calculer ${r} ÷ ${b} sans poser la division. Quel calcul l’aide ?`,
      `Pour trouver ${r} ÷ ${b}, quelle multiplication faut-il connaître ?`,
    ]),
    `${b} × ${q} = ${r}`,
    [`${r} × ${b} = ${fr(r * b)}`, `${b} + ${q} = ${b + q}`, `${b} × ${q + 1} = ${b * (q + 1)}`, `${b} × ${b} = ${b * b}`],
    exp("Pour diviser, on cherche dans les multiples du diviseur.", `${r} ÷ ${b}, c’est se demander : ${b} fois combien font ${r} ?`, `${b} × ${q} = ${r}, donc ${r} ÷ ${b} = ${q}.`, `La multiplication utile est ${b} × ${q} = ${r}.`),
    parfois(0.75, () => (b <= 9 ? tableDesTables(b, q, "colonne") : tableMultiples(b, r))),
  );
}

function combienDeFoisQ(e: E3): Q {
  const b = e === 1 ? rint(3, 9) : pick([11, 12, 13, 15, 20, 25]);
  const q = rint(3, 9);
  const r = b * q;
  const p = quelquun();
  const s = sit();
  return qcmN(
    pick([
      `Combien de fois ${b} tient-il dans ${r} ?`,
      `Dans ${r}, combien de fois y a-t-il ${b} ?`,
      `${p.nom} compte de ${b} en ${b} jusqu’à ${r}. Combien de bonds fait-${p.il} ?`,
      `La grenouille ${deM(p.nom)} fait des bonds de ${b}. Combien de bonds pour aller de 0 à ${r} ?`,
      `${s.ou}, combien ${deM(s.boite.des)} de ${b} remplit-on avec ${r} ${s.chose.des} ?`,
    ]),
    q,
    [b, q + 1, q - 1, r - b, r + b, q + 2],
    exp("Chercher combien de fois un nombre tient dans un autre, c’est diviser.", `On cherche dans les multiples de ${b} : ${b} × ? = ${r}.`, `${b} × ${q} = ${r}, donc ${r} ÷ ${b} = ${q}.`, `${b} tient ${q} fois dans ${r}.`),
    parfois(0.8, () => barreGroupes(b, r, nm("groupe", "groupes"))),
  );
}

function verifierQ(e: E3): Q {
  const [a, b] = facteurs(e);
  const r = a * b;
  const R = fr(r);
  const p = quelquun();
  return qcmM(
    pick([
      `Quelle multiplication vérifie que ${R} ÷ ${a} = ${b} ?`,
      `${p.nom} trouve ${R} ÷ ${a} = ${b}. Quel calcul permet de vérifier ?`,
      `Pour être sûr que ${R} ÷ ${a} = ${b}, quel calcul fait-on ?`,
      `${p.nom} veut vérifier sa division : ${R} ÷ ${a} = ${b}. Que calcule-t-${p.il} ?`,
    ]),
    `${a} × ${b} = ${R}`,
    [`${R} × ${a} = ${fr(r * a)}`, `${R} − ${a} = ${fr(r - a)}`, `${b} + ${a} = ${a + b}`, `${R} × ${b} = ${fr(r * b)}`],
    exp("Une division se vérifie avec une multiplication.", "On multiplie le diviseur par le quotient : on doit retrouver le dividende.", `${a} × ${b} = ${R} : c’est bien le dividende.`, `On vérifie avec ${a} × ${b} = ${R}.`),
    parfois(0.8, () => barreEgale(a, String(b), R) ?? divisionCanvas({ dividende: r, diviseur: a, quotient: b, showResult: true, title: "À vérifier" })),
  );
}

function vraiFauxLienQ(e: E3): Q {
  const [a, b] = facteurs(e);
  const r = a * b;
  const R = fr(r);
  const p = quelquun();
  const cas = rint(1, 3);
  const affirm = cas === 1 ? `${R} ÷ ${a} = ${b}` : cas === 2 ? `${a} ÷ ${R} = ${b}` : `${R} ÷ ${a} = ${a}`;
  const text = pick([
    `${p.nom} dit : « Comme ${a} × ${b} = ${R}, alors ${affirm}. » A-t-${p.il} raison ?`,
    `Sur son cahier, ${p.nom} écrit : « ${a} × ${b} = ${R}, donc ${affirm} ». Est-ce juste ?`,
    `${a} × ${b} = ${R}. ${p.nom} en déduit ${affirm}. A-t-${p.il} raison ?`,
  ]);
  const [bonne, pieges] =
    cas === 1
      ? [`Oui : ${a} × ${b} = ${R}, donc ${R} ÷ ${a} = ${b}.`, ["Non : il faut poser la division pour le savoir.", "Non : une multiplication ne dit rien sur une division.", `Non : c’est ${a} ÷ ${R} = ${b}.`]]
      : cas === 2
        ? [`Non : c’est ${R} ÷ ${a} = ${b}, le dividende passe en premier.`, ["Oui : on peut écrire les nombres dans n’importe quel ordre.", "Oui : c’est la même famille de nombres.", `Oui : car ${a} × ${b} = ${R}.`]]
        : [`Non : ${R} ÷ ${a} = ${b}, et non ${a}.`, ["Oui : c’est la même famille de nombres.", `Oui : car ${a} × ${b} = ${R}.`, "Oui : le diviseur et le quotient sont toujours égaux."]];
  return qcmM(text, bonne, pieges, expLien(a, b, cas === 1 ? "L’affirmation est juste." : `L’affirmation est fausse : ${R} ÷ ${a} = ${b}.`), parfois(0.75, () => dessinProduit(a, b)));
}

/** Lire une division dans le tableau des tables. */
function lireTableauQ(): Q {
  const a = rint(3, 9);
  let b = rint(3, 9);
  while (b === a) b = rint(3, 9);
  const r = a * b;
  const p = quelquun();
  if (Math.random() < 0.6)
    return qcmN(
      pick([
        `Lis le tableau : ligne de ${a}, on avance jusqu’à ${r}. Combien font ${r} ÷ ${a} ?`,
        `${p.nom} cherche ${r} ÷ ${a} dans le tableau des tables. Quel nombre trouve-t-${p.il} en haut de la colonne ?`,
        `Dans le tableau, ${r} est sur la ligne de ${a}. Combien font ${r} ÷ ${a} ?`,
      ]),
      b,
      [a, b + 1, b - 1, r - a, r + a],
      exp("Le tableau des tables se lit aussi pour diviser.", `On va sur la ligne de ${a}, on avance jusqu’à ${r}, on remonte en haut de la colonne.`, `${a} × ${b} = ${r}, donc ${r} ÷ ${a} = ${b}.`, `${r} ÷ ${a} = ${b}.`),
      tableDesTables(a, b, "colonne", `Ligne de ${a} : ${r}. En haut de la colonne ?`),
    );
  return qcmN(
    pick([
      `Dans le tableau, ${r} est sur la ligne de ${a}, dans la colonne de ${b}. Combien font ${r} ÷ ${b} ?`,
      `${p.nom} lit ${a} × ${b} = ${r} dans le tableau. Combien font ${r} ÷ ${b} ?`,
    ]),
    a,
    [b, a + 1, a - 1, r - b, r + b],
    exp("Une case du tableau donne une multiplication… et deux divisions.", `La case ${r} est sur la ligne de ${a} et dans la colonne de ${b}.`, `${a} × ${b} = ${r}, donc ${r} ÷ ${b} = ${a} et ${r} ÷ ${a} = ${b}.`, `${r} ÷ ${b} = ${a}.`),
    tableDesTables(a, b, "case", `La case surlignée vaut ${r}.`),
  );
}

function intrusQ(e: E3): Q {
  const [a, b] = facteurs(e);
  const r = a * b;
  const R = fr(r);
  const p = quelquun();
  const faux = Math.random() < 0.5 ? `${a} ÷ ${R} = ${b}` : `${b} ÷ ${R} = ${a}`;
  return qcmM(
    pick([
      `Quelle égalité ne vient PAS de ${a} × ${b} = ${R} ?`,
      `${p.nom} écrit la famille de ${a} × ${b} = ${R}. Quelle égalité est fausse ?`,
      `On sait que ${a} × ${b} = ${R}. Une seule de ces égalités est fausse. Laquelle ?`,
      `Trouve l’intrus dans la famille de ${a} × ${b} = ${R}.`,
    ]),
    faux,
    [`${R} ÷ ${a} = ${b}`, `${R} ÷ ${b} = ${a}`, `${b} × ${a} = ${R}`],
    expLien(a, b, `L’intrus est ${faux} : une division ne se retourne pas, le dividende passe en premier.`),
    parfois(0.75, () => dessinProduit(a, b)),
  );
}

function problemeLienQ(e: E3): Q {
  const [a, b] = facteurs(e);
  const r = a * b;
  const R = fr(r);
  const s = sit();
  const c = s.chose;
  const p = quelquun();
  const groupement = Math.random() < 0.5;
  const qui = s.metier ? { nom: s.metier.nom, milieu: minus(s.metier.nom), il: s.metier.il } : { nom: p.nom, milieu: p.nom, il: p.il };
  const text = groupement
    ? pick([
        `${ouSans(s)}, ${qui.milieu} sait que ${a} × ${b} = ${R}. ${maj(qui.il)} range ${R} ${c.des} par ${s.boite.des} de ${b}. Combien ${deM(s.boite.des)} remplit-${qui.il} ?`,
        `${qui.nom} a ${R} ${c.des} et en met ${b} par ${s.boite.un}. ${maj(qui.il)} connaît ${a} × ${b} = ${R}. Combien ${deM(s.boite.des)} ?`,
      ])
    : pick([
        `${ouSans(s)}, ${qui.milieu} sait que ${a} × ${b} = ${R}. ${maj(qui.il)} partage ${R} ${c.des} entre ${a} ${s.qui.des}. Combien pour chaque ${s.qui.un} ?`,
        `${qui.nom} partage ${R} ${c.des} entre ${a} ${s.qui.des}. ${maj(qui.il)} pense à ${a} × ${b} = ${R}. Combien pour chaque ${s.qui.un} ?`,
      ]);
  const rep_ = groupement ? a : b;
  const autre = groupement ? b : a;
  return qcmN(
    text,
    rep_,
    [autre, r, r - autre, rep_ + 1, rep_ - 1],
    expLien(a, b, groupement ? `On remplit ${a} ${s.boite.des}.` : `Il y a ${b} ${c.des} pour chaque ${s.qui.un}.`, `${a} × ${b} = ${R}, donc ${R} ÷ ${autre} = ${rep_}.`),
    parfois(0.8, () => (groupement ? dessinGroupement(s, r, b) : dessinPartage(s, r, a))),
  );
}

/** Le lien avec un quotient décimal : 4 × 1,75 = 7, donc 7 ÷ 4 = 1,75. */
function lienDecimalQ(): Q {
  const n = pick([2, 4, 5, 8]);
  const a = dividendeDecimal(n, n === 8 ? 60 : 30);
  const q = net(a / n);
  const Qd = fr(q);
  const p = quelquun();
  if (Math.random() < 0.55)
    return qcmN(
      pick([
        `On sait que ${n} × ${Qd} = ${a}. Combien font ${a} ÷ ${n} ?`,
        `${p.nom} a vérifié : ${n} × ${Qd} = ${a}. Que vaut ${a} ÷ ${n} ?`,
        `${n} × ${Qd} = ${a}. Alors, ${a} ÷ ${n} = ?`,
        `Si ${Qd} × ${n} = ${a}, combien font ${a} ÷ ${n} ?`,
      ]),
      q,
      [net(q * 10), net(q * 100), Math.floor(q), net(Math.floor(q) + (a % n) / 10), n, a],
      exp("Une multiplication, deux divisions : c’est vrai aussi avec des décimaux.", `${n} × ${Qd} = ${a} : on cherche le nombre qui, multiplié par ${n}, donne ${a}.`, `${n} × ${Qd} = ${a}, donc ${a} ÷ ${n} = ${Qd}.`, `${a} ÷ ${n} = ${Qd}.`),
      parfois(0.8, () => barreEgale(n, Qd, String(a))),
    );
  return qcmM(
    pick([
      `Quelle multiplication vérifie que ${a} ÷ ${n} = ${Qd} ?`,
      `${p.nom} trouve ${a} ÷ ${n} = ${Qd}. Quel calcul permet de vérifier ?`,
      `Pour être sûr que ${a} ÷ ${n} = ${Qd}, quel calcul fait-on ?`,
    ]),
    `${n} × ${Qd} = ${a}`,
    [`${a} × ${n} = ${Qd}`, `${n} × ${fr(net(q * 100))} = ${a}`, `${Qd} + ${n} = ${a}`, `${a} × ${Qd} = ${n}`],
    exp("Une division se vérifie avec une multiplication, même avec des décimaux.", "Diviseur × quotient doit redonner le dividende.", `${n} × ${Qd} = ${a}.`, `On vérifie avec ${n} × ${Qd} = ${a}.`),
    parfois(0.8, () => barreEgale(n, Qd, String(a))),
  );
}

/* ---------------- La division posée : les nombres ---------------- */

type Div = { N: number; d: number; q: number; r: number };
const div = (d: number, q: number, r = 0): Div => ({ N: d * q + r, d, q, r });
const DIV2 = [11, 12, 13, 14, 15, 16, 18, 21, 22, 23, 24, 25, 31, 32, 35, 41, 42, 45];

/** Un quotient entre qmin et qmax, avec un 0 une fois sur trois s'il y en a. */
function quotientAvecZero(qmin: number, qmax: number, pZero = 0.35): number {
  const tous = Array.from({ length: Math.max(1, qmax - qmin + 1) }, (_, i) => qmin + i);
  const avecZero = tous.filter((q) => /.0/.test(String(q)));
  return Math.random() < pZero && avecZero.length ? pick(avecZero) : pick(tous);
}

/**
 * Les nombres d'une division POSÉE, par étoile : 2 chiffres ÷ 1 chiffre (★1),
 * 3 chiffres ÷ 1 chiffre avec souvent un 0 au quotient (★2), 3 chiffres ÷ 2
 * chiffres (★3), 4 chiffres ÷ 2 chiffres (★4).
 */
function tiragePose(e: E5, avecReste = false): Div {
  if (e <= 1) {
    const d = rint(2, 6);
    const r = avecReste ? rint(1, d - 1) : 0;
    return div(d, rint(11, Math.floor((99 - r) / d)), r);
  }
  if (e === 2) {
    const d = rint(3, 9);
    const r = avecReste ? rint(1, d - 1) : 0;
    return div(d, quotientAvecZero(Math.max(21, Math.ceil((100 - r) / d)), Math.floor((999 - r) / d), 0.4), r);
  }
  const d = pick(DIV2);
  const r = avecReste ? rint(1, d - 1) : 0;
  if (e === 3) return div(d, rint(Math.max(11, Math.ceil((100 - r) / d)), Math.min(60, Math.floor((999 - r) / d))), r);
  return div(d, quotientAvecZero(Math.max(25, Math.ceil((1000 - r) / d)), Math.min(400, Math.floor((9999 - r) / d)), 0.35), r);
}

/** Les nombres d'une division AVEC RESTE : tables (★2), diviseur à 2 chiffres (★3), mélange (★4). */
function tirageReste(e: E5 | "petit"): Div {
  if (e === "petit") {
    const d = rint(2, 5);
    return div(d, rint(3, 5), rint(1, d - 1));
  }
  if (e <= 2) {
    const d = rint(3, 9);
    return div(d, rint(3, 12), rint(1, d - 1));
  }
  if (e === 3 || Math.random() < 0.5) {
    const d = pick([11, 12, 13, 14, 15, 16, 18, 20, 21, 24, 25, 30]);
    return div(d, rint(2, e === 3 ? 12 : 30), rint(1, d - 1));
  }
  const d = rint(3, 9);
  return div(d, rint(12, 60), rint(1, d - 1));
}

/** L'erreur « chiffre par chiffre » : 96 ÷ 6 → 9 ÷ 6 = 1, 6 ÷ 6 = 1 → 11. */
function chiffreParChiffre(N: number, d: number): number | undefined {
  if (d >= 10) return undefined;
  const v = Number(String(N).split("").map((c) => Math.floor(Number(c) / d)).join(""));
  return v > 0 ? v : undefined;
}
/** L'erreur du 0 oublié au quotient : 103 → 13, 120 → 12. */
const zeroOublie = (q: number) => (/.0/.test(String(q)) ? Number(String(q)[0] + String(q).slice(1).replace(/0/g, "")) : undefined);

const piegesPose = ({ N, d, q, r }: Div) =>
  [chiffreParChiffre(N, d), zeroOublie(q), q + 1, q - 1, q + 10, r > 0 ? r : q * 10].filter((v): v is number => v !== undefined);

const RANGS: readonly [string, string][] = [
  ["unité", "unités"],
  ["dizaine", "dizaines"],
  ["centaine", "centaines"],
  ["millier", "milliers"],
];
const enRang = (k: number, rang: number) => `${fr(k)} ${k > 1 ? RANGS[rang][1] : RANGS[rang][0]}`;

/** Le premier partage : le plus petit début du dividende qui contient le diviseur. */
function premierMorceau(N: number, d: number): { k: number; debut: number } {
  const s = String(N);
  for (let k = 1; k <= s.length; k++) if (Number(s.slice(0, k)) >= d) return { k, debut: Number(s.slice(0, k)) };
  return { k: s.length, debut: N };
}

/** Les étapes de la potence, de la gauche vers la droite. */
function etapes(N: number, d: number): string {
  const s = String(N);
  const out: string[] = [];
  let cur = 0;
  for (let i = 0; i < s.length; i++) {
    cur = cur * 10 + Number(s[i]);
    if (!out.length && cur < d && i < s.length - 1) continue;
    const k = Math.floor(cur / d);
    out.push(`en ${enRang(cur, s.length - 1 - i)}, ${d} va ${k} fois, reste ${cur - k * d}`);
    cur -= k * d;
  }
  return maj(out.join(" ; ")) + ".";
}

const verif = ({ N, d, q, r }: Div) => `${d} × ${fr(q)}${r ? ` + ${r}` : ""} = ${fr(N)}`;

function expPose(D: Div, conclusion?: string): string {
  return exp(
    "Dans une division posée, on cherche combien de fois le diviseur est contenu dans le dividende.",
    D.d >= 10
      ? "On commence par la gauche ; avec un diviseur à 2 chiffres, on estime chaque chiffre du quotient (arrondis le diviseur), puis on abaisse le chiffre suivant."
      : "On commence par la gauche : on partage d’abord les plus grandes unités, puis on abaisse le chiffre suivant.",
    `${etapes(D.N, D.d)} Vérification : ${verif(D)}.`,
    conclusion ?? (D.r ? `${fr(D.N)} ÷ ${D.d} : quotient ${fr(D.q)}, reste ${D.r}.` : `${fr(D.N)} ÷ ${D.d} = ${fr(D.q)}.`),
  );
}

const potence = (D: Div, questionLabel?: string, title?: string) =>
  divisionCanvas({ dividende: D.N, diviseur: D.d, quotient: D.q, reste: D.r, questionLabel, title, showResult: false });

/* ---------------- DIVISION_POSEE ---------------- */

function quotientQ(e: E5): Q {
  const D = tiragePose(e, e >= 3 ? Math.random() < 0.4 : e === 2 ? Math.random() < 0.25 : false);
  const { N, d, q, r } = D;
  const n = fr(N);
  const p = quelquun();
  const m = unMetier();
  const quel = r ? " Quel est le quotient ?" : "";
  return qcmN(
    pick([
      `Pose et calcule ${n} ÷ ${d}.${quel}`,
      `Quel est le quotient de ${n} ÷ ${d} ?`,
      `${p.nom} pose la division ${n} ÷ ${d}. Quel quotient trouve-t-${p.il} ?`,
      `Calcule ${n} ÷ ${d} en posant la division.${quel}`,
      `Dans la potence de ${n} ÷ ${d}, quel nombre s’écrit sous le diviseur ?`,
      `Combien de fois ${d} est-il contenu dans ${n} ?`,
      `${m.nom} pose ${n} ÷ ${d} pour ses comptes. Quel quotient trouve-t-${m.il} ?`,
      `Sur son cahier, ${p.nom} pose ${n} ÷ ${d}. Quel nombre écrit-${p.il} au quotient ?`,
    ]),
    q,
    piegesPose(D),
    expPose(D),
    potence(D, pick(["Commence par la gauche.", "Quel est le quotient ?", "Pose la division.", d >= 10 ? "Arrondis le diviseur pour estimer." : "N’oublie pas les 0."])),
  );
}

/** Combien de chiffres aura le quotient ? */
function nbChiffresQ(e: E5): Q {
  const d = e <= 2 ? rint(3, 9) : pick(DIV2);
  const N = e <= 1 ? rint(Math.max(12, d + 1), 99) : e === 2 ? rint(102, 999) : e === 3 ? rint(Math.max(110, 4 * d), 999) : rint(1002, 9999);
  const q = Math.floor(N / d);
  const r = N % d;
  const n = String(q).length;
  const s = String(N);
  const { k, debut } = premierMorceau(N, d);
  const rang = s.length - k;
  const lib = (x: number) => `${x} chiffre${x > 1 ? "s" : ""}`;
  const p = quelquun();
  return qcmM(
    pick([
      `Sans finir le calcul : combien de chiffres aura le quotient de ${fr(N)} ÷ ${d} ?`,
      `${p.nom} va poser ${fr(N)} ÷ ${d}. Combien de chiffres aura son quotient ?`,
      `Avant de poser ${fr(N)} ÷ ${d}, on prévoit la taille du quotient. Combien de chiffres aura-t-il ?`,
      `Le quotient de ${fr(N)} ÷ ${d} s’écrira avec combien de chiffres ?`,
    ]),
    lib(n),
    [1, 2, 3, 4].filter((x) => x !== n).map(lib),
    exp(
      "Le premier partage dit le rang du premier chiffre du quotient.",
      "On cherche le plus petit début du dividende qui contient le diviseur.",
      `${k > 1 ? `${s.slice(0, k - 1)} < ${d}, on prend ${debut}. ` : `${debut} ≥ ${d}. `}On partage d’abord ${enRang(debut, rang)} : le quotient commence aux ${RANGS[rang][1]}. ${fr(N)} ÷ ${d} = ${fr(q)}${r ? ` reste ${r}` : ""}.`,
      `Le quotient a ${lib(n)}.`,
    ),
    parfois(0.8, () => potence(div(d, q, r), "Quel est le premier partage ?")),
  );
}

/** Le premier partage de la potence, ou le premier chiffre du quotient. */
function premierPasQ(e: E5): Q {
  const D = tiragePose(e, Math.random() < 0.4);
  const { N, d } = D;
  const s = String(N);
  const L = s.length;
  const { k, debut } = premierMorceau(N, d);
  const p = quelquun();
  const q1 = Math.floor(debut / d);
  if (Math.random() < 0.5)
    return qcmN(
      pick([
        `On pose ${fr(N)} ÷ ${d}. Quel est le premier chiffre du quotient ?`,
        `${p.nom} pose ${fr(N)} ÷ ${d}. Quel chiffre écrit-${p.il} en premier sous le diviseur ?`,
        `Dans la potence de ${fr(N)} ÷ ${d}, quel est le premier chiffre du quotient ?`,
      ]),
      q1,
      [Number(s[0]), q1 + 1, q1 - 1, Math.floor(debut / 10), d >= 10 ? Math.floor(debut / Math.floor(d / 10)) : debut - d],
      exp(
        "On commence la division posée par la gauche.",
        k > 1 ? `${s.slice(0, k - 1)} < ${d} : on prend ${enRang(debut, L - k)}.` : `${debut} ≥ ${d} : on partage ${enRang(debut, L - 1)}.`,
        `En ${debut}, ${d} va ${q1} fois (${d} × ${q1} = ${d * q1}${d * (q1 + 1) > debut ? `, et ${d} × ${q1 + 1} = ${d * (q1 + 1)}, c’est trop` : ""}).`,
        `Le premier chiffre du quotient est ${q1}.`,
      ),
      Math.random() < 0.5 && d >= 10 ? tableMultiples(d, debut, `Combien de fois ${d} dans ${debut} ?`) : potence(D, "On commence par la gauche."),
    );
  const correct = enRang(debut, L - k);
  const pieges = [
    k > 1 ? enRang(Number(s.slice(0, k - 1)), L - k + 1) : enRang(Number(s.slice(0, k + 1)), L - k - 1),
    enRang(Number(s[L - 1]), 0),
    k < L ? enRang(Number(s.slice(0, k + 1)), L - k - 1) : enRang(Number(s[0]), L - 1),
  ];
  return qcmM(
    pick([
      `On pose ${fr(N)} ÷ ${d}. On commence par la gauche : que partage-t-on en premier ?`,
      `${p.nom} pose ${fr(N)} ÷ ${d}. Quel est son premier partage ?`,
      `Dans la potence de ${fr(N)} ÷ ${d}, que partage-t-on d’abord ?`,
    ]),
    correct,
    pieges.filter((x) => x !== correct),
    exp(
      "On commence la division posée par la gauche, jamais par les unités.",
      "On prend le premier chiffre ; s’il est plus petit que le diviseur, on en prend un de plus.",
      k > 1 ? `${s.slice(0, k - 1)} < ${d} : on ne peut pas encore partager. On prend ${correct}.` : `${debut} ≥ ${d} : on partage d’abord ${correct}.`,
      `On partage d’abord ${correct}.`,
    ),
    potence(D, "Par où commence-t-on ?"),
  );
}

/** Les étapes d'une division à 2 chiffres ÷ 1 chiffre. */
function etapesQ(): Q {
  let D = tiragePose(1, Math.random() < 0.4);
  for (let i = 0; i < 30 && Math.floor(D.N / 10) % D.d === 0; i++) D = tiragePose(1, Math.random() < 0.4);
  const { N, d } = D;
  const t = Math.floor(N / 10);
  const u = N % 10;
  const f1 = Math.floor(t / d);
  const r1 = t % d;
  const p = quelquun();
  const fam = r1 > 0 ? rint(1, 3) : 1;
  const intro = pick([`On pose ${N} ÷ ${d}.`, `${p.nom} pose ${N} ÷ ${d}.`, `${p.nom} écrit la potence de ${N} ÷ ${d}.`]);
  if (fam === 1)
    return qcmN(`${intro} ${pick([`En ${enRang(t, 1)}, combien de fois ${d} ?`, `On partage d’abord les ${t} dizaines. Combien de dizaines dans chaque part ?`, "Quel chiffre écrit-on d’abord au quotient ?"])}`, f1, [t, r1, f1 + 1, d], expPose(D), potence(D, "On commence par les dizaines."));
  if (fam === 2)
    return qcmN(`${intro} ${pick([`En ${enRang(t, 1)}, ${d} va ${f1} fois. Combien de dizaines reste-t-il ?`, `Après le partage des ${t} dizaines, combien de dizaines reste-t-il ?`])}`, r1, [f1, t - f1, d - r1, r1 + 1], expPose(D), potence(D, "Que reste-t-il des dizaines ?"));
  return qcmN(
    `${intro} ${pick([`Il reste ${enRang(r1, 1)}. On abaisse le ${u}. Combien d’unités partage-t-on maintenant ?`, `Après les dizaines, il reste ${enRang(r1, 1)}. Avec les ${u} unités, combien d’unités faut-il partager ?`])}`,
    r1 * 10 + u,
    [u, r1 + u, r1 * 10, (r1 + 1) * 10 + u],
    exp("Le reste des dizaines n’est pas perdu : on l’échange contre des unités.", `${enRang(r1, 1)}, c’est ${r1 * 10} unités ; on ajoute les ${u} unités abaissées.`, `${r1 * 10} + ${u} = ${r1 * 10 + u}. Puis ${etapes(N, d)}`, `On partage ${r1 * 10 + u} unités.`),
    potence(D, "On abaisse le chiffre des unités."),
  );
}

/** Le vocabulaire de la division posée. */
function vocabulaireQ(e: E5): Q {
  let D = tiragePose(e, true);
  for (let i = 0; i < 30 && new Set([D.N, D.d, D.q, D.r]).size < 4; i++) D = tiragePose(e, true);
  const { N, d, q, r } = D;
  const p = quelquun();
  const role = pick(["dividende", "diviseur", "quotient", "reste"] as const);
  const val = { dividende: fr(N), diviseur: String(d), quotient: fr(q), reste: String(r) }[role];
  const NOMS = ["le dividende", "le diviseur", "le quotient", "le reste"];
  if (Math.random() < 0.5)
    return qcmM(
      pick([
        `${fr(N)} ÷ ${d} = ${fr(q)} reste ${r}. Comment s’appelle ${val} ?`,
        `Dans la division ${fr(N)} ÷ ${d} = ${fr(q)} reste ${r}, que représente ${val} ?`,
        `${p.nom} pose ${fr(N)} ÷ ${d} : quotient ${fr(q)}, reste ${r}. Quel est le nom de ${val} ?`,
      ]),
      `le ${role}`,
      NOMS.filter((x) => x !== `le ${role}`),
      exp("dividende ÷ diviseur = quotient, reste …", "Le dividende est partagé, le diviseur est le nombre de parts, le quotient est la valeur d’une part, le reste ce qui ne se partage pas.", `${fr(N)} = dividende, ${d} = diviseur, ${fr(q)} = quotient, ${r} = reste.`, `${val} est le ${role}.`),
      divisionCanvas({ dividende: N, diviseur: d, quotient: q, reste: r, showResult: true }),
    );
  return qcmN(
    pick([
      `${fr(N)} ÷ ${d} = ${fr(q)} reste ${r}. Quel est le ${role} ?`,
      `${p.nom} pose ${fr(N)} ÷ ${d} et trouve ${fr(q)}, reste ${r}. Quel nombre est le ${role} ?`,
      `Dans ${fr(N)} ÷ ${d} = ${fr(q)} reste ${r}, quel est le ${role} ?`,
    ]),
    Number(val.replace(/\s/g, "")),
    [N, d, q, r].filter((x) => x !== Number(val.replace(/\s/g, ""))),
    exp("dividende ÷ diviseur = quotient, reste …", "On lit la division dans l’ordre.", `${fr(N)} = dividende, ${d} = diviseur, ${fr(q)} = quotient, ${r} = reste.`, `Le ${role} est ${val}.`),
    divisionCanvas({ dividende: N, diviseur: d, quotient: q, reste: r, showResult: true }),
  );
}

/** Diviseur à 2 chiffres : estimer un chiffre du quotient (arrondir le diviseur). */
function estimerChiffreQ(e: E5): Q {
  const d = pick(DIV2);
  const c = rint(2, 9);
  const reste = rint(0, d - 1);
  const morceau = d * c + reste;
  const p = quelquun();
  const dArr = Math.round(d / 10) * 10;
  const N = Number(`${morceau}${rint(0, 9)}${e >= 4 && morceau < 100 ? rint(0, 9) : ""}`);
  // L'estimation par le diviseur arrondi, puis les essais jusqu'au bon chiffre.
  const est = Math.min(9, Math.max(1, Math.floor(morceau / dArr)));
  const essais: string[] = [];
  for (let x = est; ; x += x * d > morceau ? -1 : 1) {
    const trop = x * d > morceau;
    const petit = morceau - x * d >= d;
    essais.push(`on essaie ${x} : ${d} × ${x} = ${d * x}${trop ? ", c’est trop" : petit ? `, il reste ${morceau - x * d}, encore assez pour ${d}` : `, il reste ${morceau - x * d}, plus petit que ${d}`}`);
    if (!trop && !petit) break;
    if (essais.length > 9) break;
  }
  return qcmN(
    pick([
      `On pose ${fr(N)} ÷ ${d}. On commence par ${morceau}. Combien de fois ${d} dans ${morceau} ?`,
      `${p.nom} pose ${fr(N)} ÷ ${d}. En ${morceau}, combien de fois ${d} ?`,
      `Dans la potence de ${fr(N)} ÷ ${d}, on cherche combien de fois ${d} va dans ${morceau}. Quel chiffre écrire ?`,
      `Diviseur à 2 chiffres : combien de fois ${d} tient-il dans ${morceau} ?`,
    ]),
    c,
    [c + 1, c - 1, Math.floor(morceau / 10), Math.floor(morceau / Math.floor(d / 10)), Math.round(morceau / dArr)],
    exp(
      "Avec un diviseur à 2 chiffres, on estime le chiffre du quotient, puis on vérifie avec une multiplication.",
      `On arrondit ${d} à ${dArr} : ${morceau} ÷ ${dArr}, c’est environ ${est}. Puis on vérifie avec la multiplication.`,
      `${maj(essais.join(" ; "))}.`,
      `${d} va ${c} fois dans ${morceau}.`,
    ),
    Math.random() < 0.6 ? tableMultiples(d, morceau, `Combien de fois ${d} dans ${morceau} ?`) : potence(div(d, Math.floor(N / d), N % d), `En ${morceau}, combien de fois ${d} ?`),
  );
}

/** Quel calcul vérifie la division ? dividende = diviseur × quotient + reste. */
function verifierPoseQ(D: Div): Q {
  const { N, d, q, r } = D;
  const p = quelquun();
  const faux = (
    [
      [`${d} × ${fr(q)}`, d * q],
      [`${d} × ${fr(q)} − ${r}`, d * q - r],
      [`${fr(q)} × ${r} + ${d}`, q * r + d],
      [`${d} + ${fr(q)} + ${r}`, d + q + r],
      [`${fr(N)} × ${d} + ${r}`, N * d + r],
    ] as [string, number][]
  )
    .filter(([, v]) => v !== N)
    .map(([x]) => x);
  return qcmM(
    pick([
      `${p.nom} a posé ${fr(N)} ÷ ${d} : quotient ${fr(q)}, reste ${r}. Quel calcul doit redonner ${fr(N)} ?`,
      `Pour vérifier ${fr(N)} ÷ ${d} = ${fr(q)} reste ${r}, quel calcul fait-on ?`,
      `${fr(N)} ÷ ${d} : ${p.nom} trouve ${fr(q)} reste ${r}. Quel calcul permet de vérifier ?`,
      `On a trouvé ${fr(N)} ÷ ${d} = ${fr(q)} reste ${r}. Quel calcul doit donner ${fr(N)} ?`,
    ]),
    `${d} × ${fr(q)} + ${r}`,
    faux,
    exp("Une division se vérifie par une multiplication : dividende = diviseur × quotient + reste.", "On multiplie le diviseur par le quotient, puis on ajoute le reste.", `${d} × ${fr(q)} = ${fr(d * q)}, puis ${fr(d * q)} + ${r} = ${fr(N)}.`, `Le calcul est ${d} × ${fr(q)} + ${r}.`),
    divisionCanvas({ dividende: N, diviseur: d, quotient: q, reste: r, title: `La division ${deM(p.nom)}`, showResult: Math.random() < 0.5 }),
  );
}

/** Le travail d'un élève : juste, reste trop grand, quotient trop grand, 0 oublié, reste oublié. */
function erreurQ(D: Div): Q {
  const { N, d, q, r } = D;
  const p = quelquun();
  const z = zeroOublie(q);
  type T = "juste" | "resteTrop" | "quotientTrop" | "zero" | "oubliReste";
  const types: T[] = ["juste", "resteTrop", "quotientTrop"];
  if (z) types.push("zero", "zero");
  if (r > 0) types.push("oubliReste");
  const t = pick(types);
  const [qe, re] = t === "juste" ? [q, r] : t === "resteTrop" ? [q - 1, r + d] : t === "quotientTrop" ? [q + 1, r] : t === "zero" ? [z!, r] : [q, 0];
  const J = "C’est juste.";
  const RT = "Faux : le reste est trop grand, on pouvait faire un groupe de plus.";
  const QT = "Faux : le quotient est trop grand.";
  const Z = "Faux : il manque un 0 au quotient.";
  const OR = `Faux : ${p.il} a oublié le reste.`;
  const quatrieme = t === "zero" ? Z : t === "oubliReste" ? OR : z ? Z : OR;
  const bonne = { juste: J, resteTrop: RT, quotientTrop: QT, zero: Z, oubliReste: OR }[t];
  const pourquoi = {
    juste: `${verif(D)} et ${r} < ${d} : tout est juste.`,
    resteTrop: `Le reste ${re} n’est pas plus petit que ${d} : on pouvait encore faire un groupe. ${verif(D)}.`,
    quotientTrop: `${d} × ${fr(qe)} = ${fr(d * qe)}, c’est plus que ${fr(N)}. Le bon quotient est ${fr(q)}.`,
    zero: `${d} × ${fr(qe)} = ${fr(d * qe)}, très loin de ${fr(N)} : il manque un 0 au quotient. Le bon quotient est ${fr(q)}.`,
    oubliReste: `${d} × ${fr(q)} = ${fr(d * q)}, il manque ${r} pour faire ${fr(N)} : le reste est ${r}.`,
  }[t];
  return {
    text: habille(
      pick([
        `${p.nom} pose ${fr(N)} ÷ ${d} et trouve : quotient ${fr(qe)}, reste ${re}. Qu’en penses-tu ?`,
        `Voici la division ${deM(p.nom)} : ${fr(N)} ÷ ${d} = ${fr(qe)} reste ${re}. Est-ce juste ?`,
        `${p.nom} annonce : « ${fr(N)} ÷ ${d}, ça fait ${fr(qe)} et il reste ${re}. » A-t-${p.il} raison ?`,
        `Vérifie le travail ${deM(p.nom)} : ${fr(N)} ÷ ${d}, quotient ${fr(qe)}, reste ${re}.`,
      ]),
    ),
    format: "qcm",
    choices: shuffle([J, RT, QT, quatrieme]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "On vérifie une division : dividende = diviseur × quotient + reste, et le reste doit être plus petit que le diviseur.",
      `On calcule ${d} × ${fr(qe)} + ${re} et on compare à ${fr(N)}.`,
      pourquoi,
      t === "juste" ? `${p.nom} a raison.` : `${fr(N)} ÷ ${d} = ${fr(q)}${r ? ` reste ${r}` : ""}.`,
    ),
    canvas: divisionCanvas({ dividende: N, diviseur: d, quotient: qe, reste: re, title: `La division ${deM(p.nom)}`, showResult: true }),
  };
}

/** Un problème qui se résout par une division posée. */
function problemePoseQ(e: E5): Q {
  const D = tiragePose(e);
  const { N, d, q } = D;
  const s = sit();
  const p = quelquun();
  const partage = Math.random() < 0.55;
  return qcmN(
    partage ? textePartage(s, N, d, p, 3) : texteGroupement(s, N, d, p, 3),
    q,
    piegesPose(D),
    expPose(D, partage ? `Il y a ${fr(q)} ${s.chose.des} pour chaque ${s.qui.un}.` : `On remplit ${fr(q)} ${s.boite.des}.`),
    Math.random() < 0.7 ? potence(D, "Pose la division.") : partage ? barreEgale(d, null, fr(N)) ?? potence(D) : barreGroupes(d, N, s.boite),
  );
}

/** Un quotient décimal posé : 7 ÷ 4 = 1,75 ; 45 ÷ 8 = 5,625 ; 63 ÷ 25 = 2,52. */
function quotientDecimalQ(): Q {
  const n = pick([4, 5, 8, 4, 2, 20, 25]);
  const a = n >= 20 ? dividendeDecimal(n, 99) : dividendeDecimal(n, n === 8 ? 70 : 49);
  const q = net(a / n);
  const p = quelquun();
  const reste = a % n;
  return qcmN(
    pick([
      `Pose ${a} ÷ ${n} et continue après la virgule. Quel est le quotient ?`,
      `Calcule ${a} ÷ ${n} jusqu’à un reste 0.`,
      `${p.nom} pose ${a} ÷ ${n}. Il reste ${reste}, mais ${p.il} continue après la virgule. Quel quotient trouve-t-${p.il} ?`,
      `Quel est le quotient décimal de ${a} ÷ ${n} ?`,
      `${a} ÷ ${n} = ? Écris le quotient exact, avec la virgule.`,
      `On écrit ${a} = ${a},00 pour continuer la division par ${n}. Combien font ${a} ÷ ${n} ?`,
    ]),
    q,
    piegesDec(a, n),
    expDec(a, n),
    divisionCanvas({ dividende: a, diviseur: n, quotient: fr(q), questionLabel: pick([`${a} = ${a},00 : continue après la virgule.`, "Ne t’arrête pas au reste.", "Place la virgule quand les unités sont finies."]) }),
  );
}

/** Un décimal divisé par un entier : 8,4 ÷ 4 = 2,1 ; 6,18 ÷ 6 = 1,03. */
function tirageDecParEntier(): { a: number; n: number; q: number } {
  const n = pick([2, 3, 4, 5, 6, 7, 8, 9, 12, 15]);
  const deux = Math.random() < 0.4;
  let q = deux ? net(rint(1, 9) + rint(1, 99) / 100) : net(rint(1, 25) + rint(1, 9) / 10);
  if (deux && Math.random() < 0.35) q = net(rint(1, 9) + rint(1, 9) / 100); // le 0 du dixième : 1,03
  while (nbDec(q) === 0) q = net(q + 0.1);
  return { a: net(q * n), n, q };
}
function expDecParEntier(a: number, n: number, q: number): string {
  const dec = Math.max(nbDec(a), nbDec(q));
  const nom = dec === 1 ? "dixièmes" : "centièmes";
  const sv = Math.round(a * 10 ** dec);
  return exp(
    "On divise un décimal par un entier comme un entier, et on place la virgule au quotient quand on abaisse le premier chiffre après la virgule.",
    `${fr(a)}, c’est ${fr(sv)} ${nom} : on partage les ${nom}.`,
    `${fr(sv)} ${nom} ÷ ${n} = ${fr(sv / n)} ${nom}, c’est-à-dire ${fr(q)}. Vérification : ${n} × ${fr(q)} = ${fr(a)}.`,
    `${fr(a)} ÷ ${n} = ${fr(q)}.`,
  );
}
function piegesDecParEntier(a: number, n: number, q: number): number[] {
  const z = /,0/.test(fr(q)) ? Number(fr(q).replace(",0", ",").replace(",", ".")) : undefined;
  return [net(q * 10), net(q * 100), net(q / 10), net(q + 1), net(q + 0.1), ...(z ? [z, z] : []), Math.round(a * 10 ** nbDec(a)) / n].filter((x) => Number.isFinite(x));
}

function decimalParEntierQ(): Q {
  const { a, n, q } = tirageDecParEntier();
  const A = fr(a);
  const p = quelquun();
  return qcmN(
    pick([
      `Pose et calcule ${A} ÷ ${n}.`,
      `Combien font ${A} ÷ ${n} ?`,
      `${p.nom} pose ${A} ÷ ${n}. Quel quotient trouve-t-${p.il} ?`,
      `Quel est le quotient de ${A} ÷ ${n} ? Attention à la virgule.`,
      `${A} ÷ ${n} = ? Place bien la virgule au quotient.`,
    ]),
    q,
    piegesDecParEntier(a, n, q),
    expDecParEntier(a, n, q),
    divisionCanvas({ dividende: A, diviseur: n, quotient: fr(q), questionLabel: pick(["Où placer la virgule au quotient ?", "Abaisse les dixièmes : la virgule apparaît.", "Partage d’abord les unités."]) }),
  );
}

/** La virgule oubliée (ou mal placée) au quotient : 8,4 ÷ 4 → 21. */
function virguleOublieeQ(): Q {
  const { a, n, q } = tirageDecParEntier();
  const A = fr(a);
  const p = quelquun();
  const t = pick(["oubli", "oubli", "juste", "dix"] as const);
  const annonce = t === "juste" ? q : t === "oubli" ? Math.round(q * 10 ** nbDec(q)) : net(q / 10);
  const J = "C’est juste.";
  const O = `Faux : ${p.il} a oublié la virgule au quotient.`;
  const D = "Faux : la virgule est mal placée, le quotient est trop petit.";
  const M = `Faux : il fallait calculer ${n} ÷ ${A}.`;
  const bonne = t === "juste" ? J : t === "oubli" ? O : D;
  return {
    text: habille(
      pick([
        `${p.nom} pose ${A} ÷ ${n} et trouve ${fr(annonce)}. Qu’en penses-tu ?`,
        `Voici la division ${deM(p.nom)} : ${A} ÷ ${n} = ${fr(annonce)}. Est-ce juste ?`,
        `${p.nom} annonce : « ${A} ÷ ${n}, ça fait ${fr(annonce)}. » A-t-${p.il} raison ?`,
        `Vérifie le travail ${deM(p.nom)} : ${A} ÷ ${n} = ${fr(annonce)}.`,
      ]),
    ),
    format: "qcm",
    choices: shuffle([J, O, D, M]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "On vérifie l’ordre de grandeur : le quotient doit être proche de " + `${Math.round(a)} ÷ ${n}.`,
      `On multiplie : ${n} × ${fr(annonce)} = ${fr(net(n * annonce))}, et on compare à ${A}.`,
      `${fr(a)} ÷ ${n} = ${fr(q)}${t === "juste" ? "." : `, et non ${fr(annonce)}.`}`,
      t === "juste" ? `${p.nom} a raison.` : `Le bon quotient est ${fr(q)}.`,
    ),
    canvas: divisionCanvas({ dividende: A, diviseur: n, quotient: fr(annonce), title: `La division ${deM(p.nom)}`, showResult: true }),
  };
}

/* ---------------- DIVISION_RESTE ---------------- */

function dessinReste(D: Div, s?: Sit): Q["canvas"] {
  if (s?.dessin && D.N <= 30 && Math.random() < 0.7) return objetsEnVrac(s.dessin, D.N);
  return Math.random() < 0.5 ? tableMultiples(D.d, D.N) : potence(D, "Trouve le plus grand multiple du diviseur.");
}

function resteQ(e: E5): Q {
  const petit = e <= 2 && Math.random() < 0.3;
  const D = tirageReste(petit ? "petit" : e);
  const { N, d, q, r } = D;
  const p = quelquun();
  const m = unMetier();
  return qcmM(
    pick([
      `Quel est le reste de ${fr(N)} ÷ ${d} ?`,
      `Dans la division ${fr(N)} ÷ ${d}, quel est le reste ?`,
      `${p.nom} calcule ${fr(N)} ÷ ${d}. Combien reste-t-il à la fin ?`,
      `${fr(N)} ÷ ${d} = ${fr(q)} reste … Quel est le reste ?`,
      `Pose ${fr(N)} ÷ ${d}. Quel est le reste ?`,
      `Le plus grand multiple de ${d} avant ${fr(N)} est ${fr(d * q)}. Quel est le reste de ${fr(N)} ÷ ${d} ?`,
      `${m.nom} divise ${fr(N)} par ${d}. Quel reste trouve-t-${m.il} ?`,
    ]),
    String(r),
    [String(q), String(r + d), "0", String(d - r), String(r + 1), String(d)],
    exp(
      "Le reste, c’est ce qui reste quand on a fait tous les groupes complets. Il est toujours plus petit que le diviseur.",
      `On cherche le plus grand multiple de ${d} qui ne dépasse pas ${fr(N)}.`,
      `${d} × ${fr(q)} = ${fr(d * q)} et ${d} × ${fr(q + 1)} = ${fr(d * (q + 1))}. ${fr(N)} − ${fr(d * q)} = ${r}.`,
      `Le reste est ${r} (et le quotient ${fr(q)}).`,
    ),
    dessinReste(D, petit ? sitDessinable() : undefined),
  );
}

function quotientResteQ(e: E5): Q {
  const petit = e <= 2 && Math.random() < 0.25;
  const D = tirageReste(petit ? "petit" : e);
  const { N, d, q, r } = D;
  const p = quelquun();
  const f = (a: number, b: number) => `${fr(a)} reste ${b}`;
  const pieges = [f(q, 0), f(q + 1, r), f(q, r + 1)];
  if (q > 1) pieges.push(f(q - 1, r + d));
  if (r !== q && !(d * r + q === N && q < d)) pieges.push(f(r, q));
  return qcmM(
    pick([
      `${fr(N)} ÷ ${d} = ? Donne le quotient et le reste.`,
      `${p.nom} pose ${fr(N)} ÷ ${d}. Qu’écrit-${p.il} à la fin ?`,
      `Quel est le résultat de la division ${fr(N)} ÷ ${d} ?`,
      `Complète : ${fr(N)} ÷ ${d} = … reste …`,
      `Effectue la division ${fr(N)} ÷ ${d}.`,
    ]),
    f(q, r),
    pieges,
    exp(
      "Diviser avec un reste : dividende = diviseur × quotient + reste, avec un reste plus petit que le diviseur.",
      `On cherche combien de fois ${d} va dans ${fr(N)}, puis ce qui reste.`,
      `${d} × ${fr(q)} = ${fr(d * q)}, et ${fr(N)} − ${fr(d * q)} = ${r}, plus petit que ${d}.`,
      `${fr(N)} ÷ ${d} = ${fr(q)} reste ${r}.`,
    ),
    dessinReste(D, petit ? sitDessinable() : undefined),
  );
}

/** Quel reste est possible (ou impossible) dans une division par d ? */
function restePossibleQ(e: E5): Q {
  const d = e <= 2 ? rint(3, 9) : pick([11, 12, 15, 20, 25]);
  const p = quelquun();
  const fam = rint(1, 3);
  const regle = exp(
    "Le reste est toujours plus petit que le diviseur.",
    `Si le reste valait ${d} ou plus, on pourrait encore faire un groupe de ${d}.`,
    `Dans une division par ${d}, les restes possibles vont de 0 à ${d - 1}.`,
    "",
  );
  const dessin = () => (d <= 5 ? objetsGroupes(sitDessinable().dessin!, 2, d, d - 1) : tableMultiples(d, d * 3, `Après ${d * 3}, le multiple suivant est ${d * 4}.`));
  if (fam === 1) {
    const ok = rint(1, d - 1);
    return qcmM(
      pick([`Dans une division par ${d}, quel nombre peut être le reste ?`, `${p.nom} divise un nombre par ${d}. Quel reste peut-${p.il} trouver ?`, `On divise par ${d}. Lequel de ces nombres peut être le reste ?`]),
      String(ok),
      [String(d), String(d + 1), String(d + 2), String(2 * d)],
      regle + `${ok} est plus petit que ${d} : c’est possible.`,
      parfois(0.7, dessin),
    );
  }
  if (fam === 2) {
    const ko = d + rint(0, 2);
    const oks = shuffle(Array.from({ length: d - 1 }, (_, i) => i + 1)).slice(0, 3);
    return qcmM(
      pick([`Dans une division par ${d}, quel reste est impossible ?`, `${p.nom} divise par ${d}. Quel reste ne peut-${p.il} PAS trouver ?`, `On divise par ${d}. Lequel de ces nombres ne peut pas être le reste ?`]),
      String(ko),
      oks.map(String),
      regle + `${ko} n’est pas plus petit que ${d} : c’est impossible.`,
      parfois(0.7, dessin),
    );
  }
  return qcmN(
    pick([`Quel est le plus grand reste possible dans une division par ${d} ?`, `${p.nom} divise un nombre par ${d}. Quel est le plus grand reste qu’${p.il} peut trouver ?`, `Dans une division par ${d}, le reste peut aller jusqu’à combien ?`]),
    d - 1,
    [d, d + 1, d - 2, 2 * d - 1],
    regle + `Le plus grand reste est ${d - 1}.`,
    parfois(0.7, dessin),
  );
}

/** Combien de paquets COMPLETS ? Le reste ne fait pas un paquet. */
function sachetsCompletsQ(e: E5): Q {
  const petit = e <= 2 && Math.random() < 0.35;
  const s = petit ? sitDessinable() : sit();
  const D = tirageReste(petit ? "petit" : e);
  const { N, d: k, q, r } = D;
  const c = s.chose;
  const b = s.boite;
  const p = quelquun();
  const n = fr(N);
  const tournures = [
    `${s.ou}, on range ${n} ${c.des} dans des ${b.des} de ${k}. Combien ${deM(b.des)} ${complets(b)} ?`,
    `${p.nom} a ${n} ${c.des}. ${maj(p.il)} les met par ${k} dans des ${b.des}. Combien ${deM(b.des)} ${complets(b)} remplit-${p.il} ?`,
    `Avec ${n} ${c.des}, combien ${deM(b.des)} ${complets(b)} de ${k} peut-on faire ?`,
    `${n} ${c.des}, ${k} par ${b.un} : combien ${deM(b.des)} ${complets(b)} ?`,
  ];
  if (s.metier) tournures.push(`${s.metier.nom} range ${n} ${c.des} par ${b.des} de ${k}. Combien ${deM(b.des)} ${complets(b)} obtient-${s.metier.il} ?`);
  return qcmN(
    pick(tournures),
    q,
    [q + 1, r, q - 1, k, N - k],
    exp("Quand on demande les groupes complets, le reste ne compte pas comme un groupe.", `On divise : ${n} ÷ ${k}.`, `${k} × ${fr(q)} = ${fr(k * q)}, il reste ${r} ${c.des}, pas assez pour ${unUne(b)} ${b.un} de plus.`, `On remplit ${fr(q)} ${b.des} ${complets(b)}.`),
    petit && s.dessin ? objetsEnVrac(s.dessin, N) : Math.random() < 0.5 ? barreGroupes(k, N, b) : potence(D, `Combien ${deM(b.des)} ${complets(b)} ?`),
  );
}

/** Combien en reste-t-il à part ? */
function resteContexteQ(e: E5): Q {
  const petit = e <= 2 && Math.random() < 0.35;
  const s = petit ? sitDessinable() : sit();
  const D = tirageReste(petit ? "petit" : e);
  const { N, d: k, q, r } = D;
  const c = s.chose;
  const b = s.boite;
  const p = quelquun();
  const n = fr(N);
  const pleins = `${b.fem ? "toutes" : "tous"} les ${b.des} sont ${b.fem ? "pleines" : "pleins"}`;
  const tournures = [
    `${s.ou}, on range ${n} ${c.des} dans des ${b.des} de ${k}. Combien ${deM(c.des)} reste-t-il à part ?`,
    `${p.nom} fait des ${b.des} de ${k} avec ${n} ${c.des}. Combien ${deM(c.des)} restent hors des ${b.des} ?`,
    `On met ${n} ${c.des} par ${k}. Quand ${pleins}, combien ${deM(c.des)} reste-t-il ?`,
    `${n} ${c.des} à ranger par ${b.des} de ${k}. Combien en reste-t-il à la fin ?`,
  ];
  if (s.metier) tournures.push(`${s.metier.nom} range ${n} ${c.des} par ${b.des} de ${k}. Combien ${deM(c.des)} lui reste-t-il à part ?`);
  return qcmN(
    pick(tournures),
    r,
    [q, r + k, k - r, k, r + 1],
    exp("Le reste, c’est ce qui ne remplit pas un groupe complet.", `On divise : ${n} ÷ ${k}.`, `${k} × ${fr(q)} = ${fr(k * q)}, et ${n} − ${fr(k * q)} = ${r}.`, `Il reste ${r} ${c.des} (${fr(q)} ${b.des} sont ${b.fem ? "pleines" : "pleins"}).`),
    petit && s.dessin ? objetsEnVrac(s.dessin, N) : dessinReste(D),
  );
}

type Transport = { ou: string; qui: string; cont: Nom; max?: number };
const TRANSPORTS: readonly Transport[] = [
  { ou: "Pour la sortie scolaire", qui: "élèves", cont: nm("minibus", "minibus") },
  { ou: "Au camping", qui: "campeurs", cont: nm("tente", "tentes", true), max: 8 },
  { ou: "À la cantine", qui: "enfants", cont: nm("table", "tables", true) },
  { ou: "Au lac", qui: "promeneurs", cont: nm("barque", "barques", true), max: 6 },
  { ou: "À la montagne", qui: "skieurs", cont: nm("cabine", "cabines", true) },
  { ou: "Au spectacle de l’école", qui: "parents", cont: nm("rangée de chaises", "rangées de chaises", true) },
  { ou: "Au parc d’attractions", qui: "visiteurs", cont: nm("wagon", "wagons") },
  { ou: "Pour le voyage de fin d’année", qui: "élèves", cont: nm("car", "cars") },
  { ou: "Au club de canoë", qui: "sportifs", cont: nm("canoë", "canoës"), max: 4 },
  { ou: "Pour l’excursion", qui: "randonneurs", cont: nm("voiture", "voitures", true), max: 5 },
  { ou: "En colonie", qui: "enfants", cont: nm("chambre", "chambres", true), max: 8 },
  { ou: "Au mariage", qui: "invités", cont: nm("table", "tables", true) },
  { ou: "Au stade", qui: "supporters", cont: nm("bus", "bus") },
  { ou: "À l’aéroport", qui: "passagers", cont: nm("navette", "navettes", true) },
];

/** Il faut UN de plus pour le reste : « combien de cars pour tout le monde ? ». */
function combienFautIlQ(e: E5): Q {
  const T = pick(TRANSPORTS);
  let D = e >= 5 ? div(pick([12, 15, 18, 24, 25, 30, 45, 50]), rint(4, 20), 0) : tirageReste(e);
  if (T.max && D.d > T.max) {
    const d = rint(3, T.max);
    D = div(d, rint(5, 30), rint(1, d - 1));
  }
  if (D.r === 0) D = div(D.d, D.q, rint(1, D.d - 1));
  const { N, d: k, q, r } = D;
  const c = T.cont;
  const p = quelquun();
  const n = fr(N);
  const vides = e >= 5 && Math.random() < 0.35;
  const text = vides
    ? pick([
        `${T.ou}, ${n} ${T.qui} prennent place dans des ${c.des} de ${k} places. On remplit au maximum. Combien de places restent vides dans ${c.fem ? "la dernière" : "le dernier"} ?`,
        `${n} ${T.qui}, ${k} places par ${c.un}. On en remplit le plus possible. Combien de places vides reste-t-il dans ${c.fem ? "la dernière" : "le dernier"} ?`,
      ])
    : pick([
        `${T.ou}, ${n} ${T.qui} doivent prendre place dans des ${c.des} de ${k} places. Combien ${deM(c.des)} faut-il au minimum ?`,
        `${n} ${T.qui}, ${k} places par ${c.un}. Combien ${deM(c.des)} faut-il pour que personne ne reste à part ?`,
        `${T.ou}, chaque ${c.un} a ${k} places. Il y a ${n} ${T.qui}. Combien ${deM(c.des)} faut-il pour tout le monde ?`,
        `${p.nom} organise : ${n} ${T.qui}, des ${c.des} de ${k} places. Combien ${deM(c.des)} doit-${p.il} prévoir ?`,
      ]);
  return qcmN(
    text,
    vides ? k - r : q + 1,
    vides ? [r, k, q, k - r + 1] : [q, r, q + r, q + 2],
    exp(
      "Le reste aussi a besoin de place : il faut parfois un groupe de plus.",
      `On divise : ${n} ÷ ${k}.`,
      `${n} ÷ ${k} = ${fr(q)} reste ${r} : ${fr(q)} ${c.des} ${c.fem ? "pleines" : "pleins"}, et ${r} ${T.qui} de plus.`,
      vides ? `${c.fem ? "La dernière" : "Le dernier"} n’a que ${r} ${T.qui} : il reste ${k - r} places vides.` : `Il faut ${fr(q + 1)} ${c.des}.`,
    ),
    Math.random() < 0.5 ? barre([[`1 ${c.un}`, `${k} places`], ["encore…", null]], `${n} ${T.qui}`, `Combien ${deM(c.des)} pour tout le monde ?`) : potence(D, "Et ceux qui restent ?"),
  );
}

/** Combien en manque-t-il pour remplir un paquet de plus ? */
function combienManqueQ(e: E5): Q {
  const s = sit();
  const D = tirageReste(e);
  const { N, d: k, q, r } = D;
  const c = s.chose;
  const b = s.boite;
  const p = quelquun();
  const n = fr(N);
  return qcmN(
    pick([
      `On range ${n} ${c.des} par ${b.des} de ${k}. Combien ${deM(c.des)} manque-t-il pour remplir ${unUne(b)} ${b.un} de plus ?`,
      `${p.nom} a ${n} ${c.des} et fait des ${b.des} de ${k}. Combien ${deM(c.des)} lui manque-t-il pour ${unUne(b)} ${b.un} de plus ?`,
      `${s.ou}, ${n} ${c.des} sont ${accord("rangé", c)} par ${k}. Combien en faudrait-il en plus pour que le dernier paquet soit plein ?`,
    ]),
    k - r,
    [r, k, q, k - r + 1, k + r],
    exp("Le reste ne remplit pas un paquet : il manque la différence avec le diviseur.", `On divise ${n} ÷ ${k}, puis on compare le reste à ${k}.`, `${n} ÷ ${k} = ${fr(q)} reste ${r}, et ${k} − ${r} = ${k - r}.`, `Il manque ${k - r} ${c.des}.`),
    potence(D, "Que reste-t-il ? Combien en manque-t-il ?"),
  );
}

/** dividende = diviseur × quotient + reste. */
function egaliteQ(e: E5): Q {
  const D = tirageReste(e);
  const { N, d, q, r } = D;
  const n = fr(N);
  const p = quelquun();
  if (Math.random() < 0.5) {
    const faux = (
      [
        [`${n} = ${d} × ${fr(q)} − ${r}`, d * q - r],
        [`${n} = ${d} × ${r} + ${fr(q)}`, d * r + q],
        [`${n} = ${d} + ${fr(q)} + ${r}`, d + q + r],
        [`${n} = ${d} × ${fr(q + 1)} + ${r}`, d * (q + 1) + r],
      ] as [string, number][]
    )
      .filter(([, v]) => v !== N)
      .map(([x]) => x);
    return qcmM(
      pick([`${n} ÷ ${d} = ${fr(q)} reste ${r}. Quelle égalité est juste ?`, `${p.nom} trouve ${n} ÷ ${d} = ${fr(q)} reste ${r}. Quelle égalité le prouve ?`, `Quelle égalité correspond à la division ${n} ÷ ${d} = ${fr(q)} reste ${r} ?`]),
      `${n} = ${d} × ${fr(q)} + ${r}`,
      faux,
      exp("dividende = diviseur × quotient + reste.", "On multiplie le diviseur par le quotient, puis on ajoute le reste.", `${d} × ${fr(q)} = ${fr(d * q)} ; ${fr(d * q)} + ${r} = ${n}.`, `${n} = ${d} × ${fr(q)} + ${r}.`),
      potence(D, "dividende = diviseur × quotient + reste"),
    );
  }
  return qcmN(
    pick([`Complète : ${n} = ${d} × ${fr(q)} + … (le reste).`, `${n} = ${d} × ${fr(q)} + ? Quel nombre manque ?`, `${p.nom} écrit ${n} = ${d} × ${fr(q)} + … Que vaut le reste ?`]),
    r,
    [q, r + d, d, r + 1, d - r],
    exp("dividende = diviseur × quotient + reste.", `On calcule ${d} × ${fr(q)}, puis ce qui manque pour aller jusqu’à ${n}.`, `${d} × ${fr(q)} = ${fr(d * q)}, et ${n} − ${fr(d * q)} = ${r}.`, `Le reste est ${r}.`),
    parfois(0.8, () => tableMultiples(d, N)),
  );
}

/** Le dessin des paquets : quelle division raconte-t-il ? */
function dessinResteQ(): Q {
  const s = sitDessinable();
  const k = rint(2, 5);
  const q = rint(2, 6);
  const r = rint(1, k - 1);
  const N = k * q + r;
  const c = s.chose;
  const p = quelquun();
  const f = (a: number, b: number) => `${N} ÷ ${k} = ${a} reste ${b}`;
  return qcmM(
    pick([
      `Le dessin montre ${N} ${c.des} ${accord("rangé", c)} par ${k}. Quelle division correspond ?`,
      `${p.nom} a rangé ses ${N} ${c.des} par ${k}. Quelle division raconte le dessin ?`,
      `Regarde le dessin : ${N} ${c.des} en paquets de ${k}. Quelle division écrire ?`,
    ]),
    f(q, r),
    [f(q, 0), f(q + 1, r), ...(q > 1 ? [f(q - 1, r + k)] : []), f(r, q)],
    exp("Le dessin montre les paquets complets (le quotient) et ce qui reste à part (le reste).", `On compte les paquets de ${k}, puis les ${c.des} ${accord("seul", c)}.`, `${q} paquets de ${k} : ${k * q} ; il en reste ${r}. ${k} × ${q} + ${r} = ${N}.`, `${f(q, r)}.`),
    objetsGroupes(s.dessin!, q, k, r),
  );
}

/* ---------------- DIVISION_PROBLEME ---------------- */

type Recit = {
  sens: "partage" | "groupement";
  u: string;
  ut: string;
  un: string;
  texte: (t: string, n: number, p: Prenom) => string;
  n?: [number, number];
  q?: [number, number];
  /** À ★3 : un diviseur à 2 chiffres, quand l'histoire le permet. */
  n3?: [number, number];
  q3?: [number, number];
};
const rc = (sens: Recit["sens"], u: string, ut: string, un: string, texte: Recit["texte"], o: Partial<Pick<Recit, "n" | "q" | "n3" | "q3">> = {}): Recit => ({ sens, u, ut, un, texte, ...o });

const RECITS_MESURES: readonly Recit[] = [
  rc("groupement", "morceaux", "cm", "morceau", (t, n) => `La couturière coupe un ruban de ${t} cm en morceaux de ${n} cm. Combien de morceaux obtient-elle ?`),
  rc("partage", "cm", "cm", "", (t, n, p) => `${p.nom} scie une planche de ${t} cm en ${n} morceaux de même longueur. Combien mesure un morceau ?`, { n3: [11, 15] }),
  rc("partage", "m", "m", "", (t, n) => `Une course de relais fait ${t} m. Les ${n} coureurs de l’équipe courent la même distance. Combien de mètres court chacun ?`, { q: [25, 60], n3: [10, 12], q3: [25, 80] }),
  rc("partage", "km", "km", "", (t, n) => `Une cycliste parcourt ${t} km en ${n} étapes de même longueur. Combien de kilomètres fait chaque étape ?`, { q: [12, 40], n3: [11, 21], q3: [12, 40] }),
  rc("groupement", "guirlandes", "m", "guirlande", (t, n) => `Avec ${t} m de fil, la décoratrice fait des guirlandes de ${n} m. Combien de guirlandes fait-elle ?`, { n3: [11, 15] }),
  rc("partage", "bulbes", "bulbes", "", (t, n) => `Le jardinier plante ${t} bulbes de tulipes en ${n} massifs égaux. Combien de bulbes par massif ?`, { n3: [11, 20] }),
  rc("partage", "L", "L", "", (t, n) => `Le pompier verse ${t} litres d’eau dans ${n} seaux, autant dans chacun. Combien de litres par seau ?`, { n3: [11, 20], q3: [5, 15] }),
  rc("partage", "kg", "kg", "", (t, n) => `Le maçon répartit ${t} kg de sable dans ${n} brouettes, autant dans chacune. Combien de kilos par brouette ?`, { n3: [11, 15], q3: [20, 40] }),
  rc("groupement", "bouteilles", "L", "bouteille", (t, n) => `La cuisinière verse ${t} L de jus dans des bouteilles de ${n} L. Combien de bouteilles remplit-elle ?`, { n: [2, 5], n3: [2, 5], q3: [20, 60] }),
  rc("groupement", "rouleaux", "m", "rouleau", (t, n) => `La tapissière a ${t} m de papier peint en rouleaux de ${n} m. Combien de rouleaux a-t-elle ?`, { n3: [10, 15] }),
];

const RECITS_ARGENT: readonly Recit[] = [
  rc("groupement", "livres", "€", "livre", (t, n, p) => `${p.nom} a ${t} € d’économies. Un livre coûte ${n} €. Combien de livres peut-${p.il} acheter ?`, { n3: [11, 25] }),
  rc("partage", "€", "€", "", (t, n) => `${n} amis offrent un cadeau qui coûte ${t} €. Chacun paie la même somme. Combien paie chacun ?`, { n3: [11, 25] }),
  rc("partage", "€", "€", "", (t, n) => `Le club achète ${n} ballons identiques pour ${t} €. Combien coûte un ballon ?`, { n3: [11, 20] }),
  rc("groupement", "places", "€", "place", (t, n) => `La maîtresse a ${t} € pour la sortie. Une place de cinéma coûte ${n} €. Combien de places peut-elle payer ?`, { n3: [11, 15], q3: [20, 30] }),
  rc("partage", "€", "€", "", (t, n) => `${n} enfants se partagent ${t} € gagnés à la vente de gâteaux. Combien reçoit chacun ?`, { n3: [11, 25] }),
  rc("groupement", "plants", "€", "plant", (t, n) => `La paysagiste dépense ${t} € en arbustes à ${n} € l’arbuste. Combien d’arbustes achète-t-elle ?`, { n3: [11, 25] }),
  rc("groupement", "semaines", "€", "semaine", (t, n, p) => `${p.nom} met ${n} € de côté chaque semaine. Combien de semaines lui faut-il pour avoir ${t} € ?`, { n3: [11, 20] }),
  rc("partage", "€", "€", "", (t, n) => `Le fleuriste vend ${n} bouquets identiques pour ${t} € en tout. Combien coûte un bouquet ?`, { n3: [11, 15] }),
  rc("partage", "€", "€", "", (t, n) => `Une association partage un don de ${t} € entre ${n} écoles, à parts égales. Combien reçoit chaque école ?`, { q: [20, 90], n3: [11, 25], q3: [20, 60] }),
];

const RECITS_QUOTIDIEN: readonly Recit[] = [
  rc("groupement", "jours", "pages", "jour", (t, n, p) => `Un livre a ${t} pages. ${p.nom} lit ${n} pages par jour. En combien de jours finit-${p.il} le livre ?`, { n3: [11, 25], q3: [8, 20] }),
  rc("partage", "baguettes", "baguettes", "", (t, n) => `La boulangère cuit ${t} baguettes en ${n} fournées égales. Combien de baguettes par fournée ?`, { n3: [11, 12] }),
  rc("groupement", "voyages", "caisses", "voyage", (t, n) => `Un camion porte ${n} caisses à chaque voyage. Il doit livrer ${t} caisses. Combien de voyages fait-il ?`, { n3: [11, 25] }),
  rc("partage", "salades", "salades", "", (t, n) => `Le maraîcher plante ${t} salades en ${n} rangées égales. Combien de salades par rangée ?`, { n3: [11, 20] }),
  rc("partage", "min", "min", "", (t, n) => `La maîtresse a ${t} minutes pour ${n} ateliers de même durée. Combien de minutes dure chaque atelier ?`, { n: [2, 6], q: [8, 15], n3: [10, 12], q3: [5, 10] }),
  rc("groupement", "jours", "comprimés", "jour", (t, n) => `La vétérinaire donne ${n} comprimés par jour à un chien. La boîte en contient ${t}. Combien de jours dure la boîte ?`, { n: [2, 4], n3: [2, 4], q3: [20, 45] }),
  rc("groupement", "minutes", "pages", "minute", (t, n) => `L’imprimante sort ${n} pages par minute. Combien de minutes pour imprimer ${t} pages ?`, { n3: [11, 25] }),
  rc("partage", "élèves", "élèves", "", (t, n) => `L’école répartit ${t} élèves en ${n} classes de même effectif. Combien d’élèves par classe ?`, { n: [3, 6], q: [20, 28], n3: [11, 15], q3: [20, 28] }),
  rc("groupement", "rangées", "chaises", "rangée", (t, n) => `Le gardien installe ${t} chaises par rangées de ${n}. Combien de rangées obtient-il ?`, { n3: [11, 25] }),
  rc("partage", "pommes", "pommes", "", (t, n) => `L’arboricultrice cueille ${t} pommes sur ${n} arbres, autant sur chacun. Combien de pommes par arbre ?`, { n3: [11, 25] }),
  rc("groupement", "boîtes", "œufs", "boîte", (t, n) => `Le fermier range ${t} œufs dans des boîtes de ${n}. Combien de boîtes remplit-il ?`, { n: [6, 6], n3: [12, 12], q3: [10, 40] }),
  rc("groupement", "équipes", "joueurs", "équipe", (t, n) => `Au tournoi, ${t} joueurs forment des équipes de ${n}. Combien d’équipes y a-t-il ?`, { n: [5, 7], n3: [11, 15] }),
  rc("partage", "affiches", "affiches", "", (t, n) => `L’imprimeur livre ${t} affiches à ${n} écoles, autant à chacune. Combien d’affiches par école ?`, { n3: [11, 25] }),
];

const piegesPb = (t: number, n: number, q: number) => [t - n, n, q + 1, q - 1, t * n, q + n, q * 10];

function partagePbQ(e: E5): Q {
  const n = e >= 3 ? pick([11, 12, 15, 20, 25]) : rint(2, 9);
  const q = rint(4, e >= 3 ? 15 : 25);
  const t = n * q;
  const s = sit();
  return qcmN(
    textePartage(s, t, n, quelquun(), 3),
    q,
    piegesPb(t, n, q),
    exp("Partager en parts égales, c’est diviser.", `On divise le total par le nombre de parts : ${fr(t)} ÷ ${n}.`, calculDivision(t, n, q), `Il y a ${q} ${s.chose.des} pour chaque ${s.qui.un}.`),
    dessinPartage(s, t, n),
  );
}

function groupementPbQ(e: E5): Q {
  const n = e >= 3 ? pick([11, 12, 15, 20, 25]) : rint(2, 9);
  const q = rint(4, e >= 3 ? 15 : 25);
  const t = n * q;
  const s = sit();
  return qcmN(
    texteGroupement(s, t, n, quelquun(), 3),
    q,
    piegesPb(t, n, q),
    exp("Faire des groupes de même taille et les compter, c’est diviser.", `On cherche combien de fois ${n} tient dans ${fr(t)} : ${fr(t)} ÷ ${n}.`, calculDivision(t, n, q), `On remplit ${q} ${s.boite.des}.`),
    dessinGroupement(s, t, n),
  );
}

function recitNombres(R: Recit, e: E5): [number, number] {
  if (e >= 3) return [rint(...(R.n3 ?? [11, 25])), rint(...(R.q3 ?? R.q ?? [3, 15]))];
  return [rint(...(R.n ?? [2, 9])), rint(...(R.q ?? [4, 25]))];
}

function dessinRecit(R: Recit, t: number, n: number): Q["canvas"] {
  const lt = (v: number) => (["€", "cm", "m", "km", "L", "kg", "min"].includes(R.ut) ? `${fr(v)} ${R.ut}` : fr(v));
  return R.sens === "partage"
    ? barreEgale(n, null, `${fr(t)} ${R.ut}`) ?? divisionCanvas({ dividende: t, diviseur: n, quotient: t / n, questionLabel: `${n} parts égales` })
    : barre([[`1 ${R.un}`, lt(n)], ["encore…", null]], `${fr(t)} ${R.ut}`, `Combien de fois ${lt(n)} dans ${fr(t)} ${R.ut} ?`);
}

function recitQ(liste: readonly Recit[], e: E5): Q {
  const R = pick(liste);
  const [n, q] = recitNombres(R, e);
  const t = n * q;
  const partage = R.sens === "partage";
  return qcmN(
    R.texte(fr(t), n, quelquun()),
    q,
    piegesPb(t, n, q),
    exp(
      partage ? "Partager en parts égales, c’est diviser." : "Chercher combien de fois une quantité tient dans une autre, c’est diviser.",
      partage ? `On divise le total par le nombre de parts : ${fr(t)} ÷ ${n}.` : `On cherche combien de fois ${n} tient dans ${fr(t)} : ${fr(t)} ÷ ${n}.`,
      calculDivision(t, n, q),
      `La réponse est ${q} ${R.u}.`,
    ),
    dessinRecit(R, t, n),
    R.u,
  );
}

/** Quel calcul résout le problème ? Parfois c'est une multiplication. */
function choisirCalculPbQ(e: E5): Q {
  const R = pick([...RECITS_MESURES, ...RECITS_ARGENT, ...RECITS_QUOTIDIEN]);
  const [n, q] = recitNombres(R, e);
  const t = n * q;
  const T = fr(t);
  const p = quelquun();
  const question = pick(["Quel calcul permet de répondre ?", "Quel calcul faut-il faire ?", "Quelle opération choisis-tu ?"]);
  if (Math.random() < 0.3) {
    const s = sit();
    const text = pick([
      `${s.ou}, on remplit ${n} ${s.boite.des} de ${q} ${s.chose.des}. Combien ${deM(s.chose.des)} en tout ? ${question}`,
      `${p.nom} lit ${n} pages par jour pendant ${q} jours. Combien de pages lit-${p.il} ? ${question}`,
      `Un ticket coûte ${n} €. On en achète ${q}. Combien paie-t-on ? ${question}`,
      `Une caisse pèse ${n} kg. Le camion en porte ${q}. Quelle masse porte-t-il ? ${question}`,
    ]);
    return qcmM(
      text,
      `${n} × ${q}`,
      [`${T} ÷ ${n}`, `${n} + ${q}`, `${q} ÷ ${n}`],
      exp("On choisit l’opération d’après l’histoire.", "La même quantité revient plusieurs fois : c’est une multiplication, pas une division.", `${n} × ${q} = ${T}.`, `Le calcul est ${n} × ${q}.`),
      barreEgale(n, String(q), null) ?? barre([["1 fois", String(q)], ["…", null]], null, `${n} fois ${q}`),
    );
  }
  return qcmM(
    `${R.texte(T, n, p)} ${question}`,
    `${T} ÷ ${n}`,
    [`${T} × ${n}`, `${n} ÷ ${T}`, `${T} − ${n}`, `${T} + ${n}`],
    exp(
      R.sens === "partage" ? "Partager en parts égales, c’est diviser." : "Chercher combien de fois une quantité tient dans une autre, c’est diviser.",
      "Le nombre qu’on partage (le dividende) passe en premier.",
      `${T} ÷ ${n} = ${q}.`,
      `Le calcul est ${T} ÷ ${n}.`,
    ),
    dessinRecit(R, t, n),
  );
}

type Duo = { ou: string; a: string; b: string; boite: Nom };
const DUOS: readonly Duo[] = [
  { ou: "À la cantine", a: "pommes", b: "poires", boite: nm("corbeille", "corbeilles", true) },
  { ou: "Dans la classe", a: "crayons", b: "gommes", boite: nm("trousse", "trousses", true) },
  { ou: "Chez la fleuriste", a: "roses", b: "tulipes", boite: nm("bouquet", "bouquets") },
  { ou: "À la récré", a: "billes", b: "cartes", boite: nm("sachet", "sachets") },
  { ou: "À la boulangerie", a: "croissants", b: "pains au chocolat", boite: nm("plateau", "plateaux") },
  { ou: "À la ferme", a: "œufs", b: "fromages", boite: nm("boîte", "boîtes", true) },
  { ou: "Au club de foot", a: "ballons", b: "maillots", boite: nm("filet", "filets") },
  { ou: "À la bibliothèque", a: "romans", b: "bandes dessinées", boite: nm("étagère", "étagères", true) },
  { ou: "Au magasin de jouets", a: "petites voitures", b: "toupies", boite: nm("boîte", "boîtes", true) },
  { ou: "Au potager", a: "radis", b: "carottes", boite: nm("botte", "bottes", true) },
  { ou: "À la papeterie", a: "cahiers", b: "classeurs", boite: nm("paquet", "paquets") },
  { ou: "À l’animalerie", a: "poissons rouges", b: "tortues", boite: nm("aquarium", "aquariums") },
  { ou: "À l’entrepôt", a: "colis", b: "palettes", boite: nm("camion", "camions") },
];

/** Une donnée inutile : on ne divise que ce que la question demande. */
function donneeInutileQ(e: E5): Q {
  const D = pick(DUOS);
  const k = e >= 3 ? pick([11, 12, 15, 20, 25]) : rint(2, 9);
  const q = rint(3, 15);
  let m = rint(2, 15);
  while (m === q) m = rint(2, 15);
  const t = k * q;
  const x = k * m;
  const p = quelquun();
  const b = D.boite;
  return qcmN(
    pick([
      `${D.ou}, il y a ${fr(t)} ${D.a} et ${fr(x)} ${D.b}. On fait des ${b.des} de ${k} ${D.a}. Combien ${deM(b.des)} ${deM(D.a)} ?`,
      `${p.nom} a ${fr(x)} ${D.b} et ${fr(t)} ${D.a}. ${maj(p.il)} range seulement les ${D.a}, par ${b.des} de ${k}. Combien ${deM(b.des)} remplit-${p.il} ?`,
      `${D.ou}, on compte ${fr(t)} ${D.a} et ${fr(x)} ${D.b}. Les ${D.a} vont par ${k} dans des ${b.des}. Combien ${deM(b.des)} faut-il ?`,
    ]),
    q,
    [q + m, m, q + 1, t - k, (t + x) / k],
    exp("Dans un problème, on choisit les nombres utiles : la question ne parle que d’une sorte d’objets.", `Les ${fr(x)} ${D.b} ne servent pas. On divise : ${fr(t)} ÷ ${k}.`, calculDivision(t, k, q), `Il faut ${q} ${b.des}.`),
    barreGroupes(k, t, b),
  );
}

type Groupe = { ou: string; qui: string; g: Nom; chef?: { nom: string; il: "il" | "elle" } };
const GROUPES: readonly Groupe[] = [
  { ou: "Au tournoi de basket", qui: "joueurs", g: nm("équipe", "équipes", true), chef: { nom: "L’entraîneuse", il: "elle" } },
  { ou: "Au cours de danse", qui: "danseurs", g: nm("groupe", "groupes"), chef: { nom: "Le professeur de danse", il: "il" } },
  { ou: "À la chorale", qui: "chanteurs", g: nm("rang", "rangs"), chef: { nom: "La cheffe de chœur", il: "elle" } },
  { ou: "En classe de découverte", qui: "élèves", g: nm("chambre", "chambres", true), chef: { nom: "L’animateur", il: "il" } },
  { ou: "Au club d’échecs", qui: "joueurs", g: nm("table", "tables", true) },
  { ou: "Pour le cross du collège", qui: "coureurs", g: nm("vague", "vagues", true), chef: { nom: "Le professeur de sport", il: "il" } },
  { ou: "Au centre aéré", qui: "enfants", g: nm("atelier", "ateliers"), chef: { nom: "La directrice", il: "elle" } },
  { ou: "À la piscine", qui: "nageurs", g: nm("couloir", "couloirs"), chef: { nom: "La maîtresse-nageuse", il: "elle" } },
  { ou: "Au festival", qui: "spectateurs", g: nm("tribune", "tribunes", true), chef: { nom: "L’organisatrice", il: "elle" } },
  { ou: "À l’atelier cuisine", qui: "apprentis cuisiniers", g: nm("plan de travail", "plans de travail"), chef: { nom: "Le chef cuisinier", il: "il" } },
  { ou: "À la fanfare", qui: "musiciens", g: nm("rangée", "rangées", true) },
  { ou: "Au mariage", qui: "invités", g: nm("table", "tables", true), chef: { nom: "Le traiteur", il: "il" } },
  { ou: "Au musée", qui: "visiteurs", g: nm("groupe", "groupes"), chef: { nom: "La guide", il: "elle" } },
];

function equipesQ(e: E5): Q {
  const G = pick(GROUPES);
  const n = e >= 3 ? pick([11, 12, 15, 20, 25]) : rint(3, 9);
  const q = rint(3, e >= 3 ? 12 : 15);
  const t = n * q;
  const T = fr(t);
  const g = G.g;
  if (Math.random() < 0.4) {
    const egaux = g.fem ? "égales" : "égaux";
    return qcmN(
      pick([
        `${G.ou}, ${T} ${G.qui} se répartissent en ${n} ${g.des} ${egaux}. Combien ${deM(G.qui)} dans chaque ${g.un} ?`,
        `${G.chef ? G.chef.nom : "On"} répartit ${T} ${G.qui} en ${n} ${g.des} ${egaux}. Combien ${deM(G.qui)} par ${g.un} ?`,
      ]),
      q,
      piegesPb(t, n, q),
      exp("Partager en parts égales, c’est diviser.", `${T} ÷ ${n}.`, calculDivision(t, n, q), `Il y a ${q} ${G.qui} par ${g.un}.`),
      barreEgale(n, null, `${T} ${G.qui}`) ?? divisionCanvas({ dividende: t, diviseur: n, quotient: q, questionLabel: `${n} ${g.des}` }),
    );
  }
  return qcmN(
    pick([
      `${G.ou}, ${T} ${G.qui} font des ${g.des} de ${n}. Combien ${deM(g.des)} y a-t-il ?`,
      `${G.ou}, on répartit ${T} ${G.qui} en ${g.des} de ${n}. Combien ${deM(g.des)} forme-t-on ?`,
      `${T} ${G.qui} se mettent par ${g.des} de ${n}. Combien ${deM(g.des)} ?`,
      `${G.chef ? `${G.chef.nom} a` : "Il y a"} ${T} ${G.qui}. ${G.chef ? maj(G.chef.il) : "On"} fait des ${g.des} de ${n}. Combien ${deM(g.des)} ?`,
    ]),
    q,
    piegesPb(t, n, q),
    exp("Faire des groupes de même taille et les compter, c’est diviser.", `On cherche combien de fois ${n} tient dans ${T} : ${T} ÷ ${n}.`, calculDivision(t, n, q), `On forme ${q} ${g.des}.`),
    barre([[`1 ${g.un}`, String(n)], ["encore…", null]], `${T} ${G.qui}`, `Combien ${deM(g.des)} de ${n} ?`),
  );
}

/** Un problème avec reste : groupes complets, un de plus, ce qui reste (★3-★4). */
function resteProblemeQ(e: E5): Q {
  const f = rint(1, 3);
  return f === 1 ? combienFautIlQ(e) : f === 2 ? sachetsCompletsQ(e) : resteContexteQ(e);
}

/** Un problème à quotient décimal : 15 € entre 4 → 3,75 €. */
function recitDecimalQ(): Q {
  return partageDecimalQ();
}

/** Un problème avec un décimal divisé par un entier : 12,6 kg en 3 → 4,2 kg. */
type PbDec = { u: string; texte: (a: string, n: number, p: Prenom) => string };
const PBS_DEC: readonly PbDec[] = [
  { u: "kg", texte: (a, n) => `Un sac de ${a} kg de riz est partagé en ${n} paquets égaux. Combien pèse un paquet ?` },
  { u: "m", texte: (a, n) => `Une corde de ${a} m est coupée en ${n} morceaux égaux. Combien mesure un morceau ?` },
  { u: "€", texte: (a, n, p) => `${p.nom} paie ${a} € pour ${n} cahiers identiques. Combien coûte un cahier ?` },
  { u: "L", texte: (a, n) => `Une cuve de ${a} L d’eau remplit ${n} bidons égaux. Combien de litres par bidon ?` },
  { u: "km", texte: (a, n) => `Une coureuse fait ${a} km en ${n} tours de piste. Combien mesure un tour ?` },
  { u: "kg", texte: (a, n) => `Le fromager coupe une meule de ${a} kg en ${n} parts égales. Combien pèse une part ?` },
  { u: "€", texte: (a, n) => `${n} amis partagent une addition de ${a} € à parts égales. Combien paie chacun ?` },
  { u: "m", texte: (a, n) => `L’architecte partage un mur de ${a} m en ${n} panneaux égaux. Combien mesure un panneau ?` },
  { u: "L", texte: (a, n) => `L’infirmière répartit ${a} L de sérum dans ${n} flacons égaux. Combien de litres par flacon ?` },
  { u: "km", texte: (a, n) => `Un sentier de ${a} km est balisé en ${n} tronçons égaux. Combien mesure un tronçon ?` },
  { u: "kg", texte: (a, n) => `La chocolatière répartit ${a} kg de chocolat dans ${n} moules égaux. Combien de kilos par moule ?` },
];
function decimalParEntierPbQ(): Q {
  const P = pick(PBS_DEC);
  let { a, n, q } = tirageDecParEntier();
  if (P.u === "€") while (nbDec(q) > 2 || nbDec(a) > 2) ({ a, n, q } = tirageDecParEntier());
  const A = P.u === "€" ? eur(a) : fr(a);
  return qcmN(
    P.texte(A, n, quelquun()),
    q,
    piegesDecParEntier(a, n, q),
    expDecParEntier(a, n, q),
    barreEgale(n, null, `${A} ${P.u}`) ?? divisionCanvas({ dividende: A, diviseur: n, quotient: fr(q), questionLabel: `${n} parts égales` }),
    P.u,
  );
}

/* ---------------- DIVISION_DEFI ---------------- */

function deuxEtapesQ(e: E5): Q {
  const s = sit();
  const c = s.chose;
  const w = s.qui;
  const n = e >= 5 ? pick([11, 12, 15, 4, 6, 8]) : rint(3, 9);
  const q = rint(6, 25);
  const a = rint(2, Math.min(5, q - 1));
  const retire = Math.random() < 0.5;
  const fin = retire ? q - a : q + a;
  const etape2 = retire ? `on reprend ${a} ${c.des} à chaque ${w.un}` : `on donne encore ${a} ${c.des} à chaque ${w.un}`;
  const t = n * q;
  if (e >= 5) {
    const [p1, p2] = deuxPersonnes();
    const x = rint(Math.ceil(t / 4), Math.floor((3 * t) / 4));
    const y = t - x;
    const ils = p1.il === "elle" && p2.il === "elle" ? "Elles" : "Ils";
    return qcmN(
      `Défi : ${p1.nom} a ${fr(x)} ${c.des}, ${p2.nom} en a ${fr(y)}. ${ils} réunissent tout et partagent entre ${n} ${w.des}. Puis ${etape2}. Combien ${deM(c.des)} pour chaque ${w.un} ?`,
      fin,
      [q, retire ? q + a : q - a, t - a, Math.floor(x / n), fin + 1],
      exp("Un défi en trois étapes : réunir, partager, puis ajuster.", "On calcule dans l’ordre de l’histoire.", `${fr(x)} + ${fr(y)} = ${fr(t)} ; ${fr(t)} ÷ ${n} = ${q} ; ${q} ${retire ? "−" : "+"} ${a} = ${fin}.`, `Il y a ${fin} ${c.des} pour chaque ${w.un}.`),
      barre([[p1.nom, fr(x)], [p2.nom, fr(y)]], null, `Puis ÷ ${n}, puis ${retire ? "−" : "+"} ${a}`),
    );
  }
  return qcmN(
    pick([
      `Défi : ${fr(t)} ${c.des} sont ${accord("partagé", c)} entre ${n} ${w.des}. Puis ${etape2}. Combien ${deM(c.des)} pour chaque ${w.un} maintenant ?`,
      `${s.ou}, on partage ${fr(t)} ${c.des} entre ${n} ${w.des}. Ensuite, ${etape2}. Combien ${deM(c.des)} pour chaque ${w.un} ?`,
      `${s.metier ? s.metier.nom : "On"} partage ${fr(t)} ${c.des} entre ${n} ${w.des}, puis ${s.metier ? etape2.replace(/^on /, "") : etape2}. Combien ${deM(c.des)} pour chaque ${w.un} à la fin ?`,
    ]),
    fin,
    [q, retire ? q + a : q - a, t - a, t + a, fin + 1],
    exp("Un défi en deux étapes : d’abord partager, puis ajuster.", "On calcule dans l’ordre de l’histoire.", `${fr(t)} ÷ ${n} = ${q}, puis ${q} ${retire ? "−" : "+"} ${a} = ${fin}.`, `Il y a ${fin} ${c.des} pour chaque ${w.un}.`),
    barreEgale(n, null, fr(t)) ?? divisionCanvas({ dividende: t, diviseur: n, quotient: q, questionLabel: `Puis ${retire ? "−" : "+"} ${a}` }),
  );
}

function reunirPartagerQ(): Q {
  const s = sit();
  const c = s.chose;
  const [p1, p2] = deuxPersonnes();
  const n = rint(3, 9);
  const q = rint(6, 30);
  const t = n * q;
  const x = rint(Math.ceil(t / 4), Math.floor((3 * t) / 4));
  const y = t - x;
  const ils = p1.il === "elle" && p2.il === "elle" ? "elles" : "ils";
  const sansNoms = Math.random() < 0.33;
  return qcmN(
    sansNoms
      ? `Défi : ${fr(x)} ${c.des} d’un côté, ${fr(y)} de l’autre. On réunit tout et on partage entre ${n} ${s.qui.des}. Combien pour chaque ${s.qui.un} ?`
      : pick([
          `${p1.nom} a ${fr(x)} ${c.des} et ${p2.nom} en a ${fr(y)}. ${maj(ils)} mettent tout ensemble et font ${n} parts égales. Combien ${deM(c.des)} dans chaque part ?`,
          `${s.ou}, ${p1.nom} apporte ${fr(x)} ${c.des} et ${p2.nom} ${fr(y)}. On les partage entre ${n} ${s.qui.des}. Combien ${deM(c.des)} pour chaque ${s.qui.un} ?`,
        ]),
    q,
    [t, t - n, q + 1, Math.floor(x / n) + y, q - 1],
    exp("Deux étapes : d’abord réunir, ensuite partager.", "On additionne, puis on divise le total.", `${fr(x)} + ${fr(y)} = ${fr(t)}, puis ${fr(t)} ÷ ${n} = ${q}.`, `${q} ${c.des} dans chaque part.`),
    barre(sansNoms ? [["d’un côté", fr(x)], ["de l’autre", fr(y)]] : [[p1.nom, fr(x)], [p2.nom, fr(y)]], null, `Le total, puis ÷ ${n}`),
  );
}

function nombreMystereQ(): Q {
  const d = Math.random() < 0.5 ? rint(3, 9) : pick([11, 12, 15, 20, 25]);
  const q = rint(4, 25);
  const r = rint(1, d - 1);
  const N = d * q + r;
  const p = quelquun();
  return qcmN(
    pick([
      `Défi : je pense à un nombre. Divisé par ${d}, il donne ${q} et il reste ${r}. Quel est ce nombre ?`,
      `${p.nom} pense à un nombre. Dans la division par ${d}, le quotient est ${q} et le reste ${r}. Quel est ce nombre ?`,
      `Nombre mystère : ? ÷ ${d} = ${q} reste ${r}. Quel est le nombre caché ?`,
    ]),
    N,
    [d * q, q + d + r, d * q - r, d * (q + 1), q * r + d],
    exp("On remonte la division : dividende = diviseur × quotient + reste.", `On multiplie ${d} par ${q}, puis on ajoute le reste ${r}.`, `${d} × ${q} = ${d * q}, puis ${d * q} + ${r} = ${N}.`, `Le nombre est ${N}.`),
    calculPoseCanvas({
      operation: "division",
      title: "Le nombre mystère",
      numbers: ["?", String(d)],
      result: String(q),
      division: { dividende: "?", diviseur: String(d), quotient: String(q), reste: String(r) },
      questionLabel: "dividende = diviseur × quotient + reste",
      display: { showResult: true, showRetenues: false },
    }),
  );
}

function extremeDividendeQ(): Q {
  const d = Math.random() < 0.5 ? rint(3, 9) : pick([11, 12, 15, 20, 25]);
  const q = rint(4, 20);
  const grand = Math.random() < 0.6;
  const p = quelquun();
  const rep_ = grand ? d * q + d - 1 : d * q;
  return qcmN(
    grand
      ? pick([`Défi : dans une division par ${d}, le quotient est ${q}. Quel est le plus grand dividende possible ?`, `${p.nom} divise un nombre par ${d} et trouve le quotient ${q}. Quel est le plus grand nombre possible ?`])
      : pick([`Défi : dans une division par ${d}, le quotient est ${q}. Quel est le plus petit dividende possible ?`, `${p.nom} divise un nombre par ${d} et trouve le quotient ${q}. Quel est le plus petit nombre possible ?`]),
    rep_,
    grand ? [d * q, d * (q + 1), d * q + d, d + q] : [d * q - 1, d * q + 1, d * q + d - 1, d + q],
    exp("dividende = diviseur × quotient + reste, et le reste va de 0 au diviseur moins 1.", grand ? `Le plus grand reste possible est ${d - 1}.` : "Le plus petit reste possible est 0.", `${d} × ${q} + ${grand ? d - 1 : 0} = ${rep_}.`, `Le ${grand ? "plus grand" : "plus petit"} dividende est ${rep_}.`),
    calculPoseCanvas({
      operation: "division",
      title: "Quel dividende ?",
      numbers: ["?", String(d)],
      result: String(q),
      division: { dividende: "?", diviseur: String(d), quotient: String(q), reste: "?" },
      questionLabel: `Le reste peut aller de 0 à ${d - 1}.`,
      display: { showResult: true, showRetenues: false },
    }),
  );
}

const ARTICLES: readonly string[] = [
  "stylos", "cahiers", "croissants", "places de cinéma", "cartes postales", "balles de tennis",
  "pots de peinture", "plants de tomates", "tickets de bus", "livres de poche", "bouquets de fleurs", "paquets de graines",
];

/** Le prix d'un, puis le prix de plusieurs : diviser, puis multiplier (prix décimal à ★5). */
function prixUnitaireQ(e: E5): Q {
  const art = pick(ARTICLES);
  const n = e >= 5 ? pick([2, 4, 5]) : rint(3, 9);
  let m = rint(2, 12);
  while (m === n) m = rint(2, 12);
  const k = e >= 5 ? net(rint(1, 9) + pick([0.25, 0.5, 0.75, 0.2, 0.4, 0.6, 0.8])) : rint(2, 8);
  const t = net(k * n);
  const p = quelquun();
  const T = eur(t);
  const fin = net(m * k);
  return qcmN(
    pick([
      `${n} ${art} coûtent ${T} €. Combien coûtent ${m} ${art} ?`,
      `${p.nom} paie ${T} € pour ${n} ${art}. Combien paierait-${p.il} pour ${m} ${art} ?`,
      `Défi : si ${n} ${art} coûtent ${T} €, combien coûtent ${m} ${art} au même prix ?`,
      `Au magasin, ${n} ${art} valent ${T} €. Quel est le prix de ${m} ${art} ?`,
    ]),
    fin,
    [k, net(t * m), net(t + m - n), net(fin + k), net(fin * 10), net(fin - k)],
    exp("Deux étapes : d’abord le prix d’un, ensuite le prix de plusieurs.", `On divise ${T} € par ${n}, puis on multiplie par ${m}.`, `${T} ÷ ${n} = ${eur(k)} € ; ${eur(k)} × ${m} = ${eur(fin)} €.`, `${m} ${art} coûtent ${eur(fin)} €.`),
    {
      kind: "tableau_donnees",
      coin: "",
      headers: ["Achat 1", "Achat 2"],
      rows: [
        { label: `Nombre de ${art}`, values: [n, m] },
        { label: "Prix (€)", values: [T, "?"] },
      ],
      display: { compact: true },
    } as TableauDonneesCanvasData,
    "€",
  );
}

function partageDeuxFoisQ(): Q {
  const s = sit();
  const c = s.chose;
  const G = pick([
    { g: nm("classe", "classes", true), m: "groupes" },
    { g: nm("équipe", "équipes", true), m: "joueurs" },
    { g: nm("groupe", "groupes"), m: "enfants" },
    { g: nm("famille", "familles", true), m: "enfants" },
    { g: nm("patrouille", "patrouilles", true), m: "scouts" },
    { g: nm("cabane", "cabanes", true), m: "campeurs" },
    { g: nm("école", "écoles", true), m: "classes" },
  ]);
  const a = rint(2, 6);
  const b = rint(2, 6);
  const q = rint(3, 15);
  const t = a * b * q;
  return qcmN(
    pick([
      `Défi : ${fr(t)} ${c.des} sont ${accord("partagé", c)} entre ${a} ${G.g.des}. Dans chaque ${G.g.un}, on partage ensuite entre ${b} ${G.m}. Combien ${deM(c.des)} pour chacun des ${G.m} ?`,
      `Défi : on partage ${fr(t)} ${c.des} entre ${a} ${G.g.des}, puis chaque ${G.g.un} partage sa part entre ses ${b} ${G.m}. Combien ${deM(c.des)} pour chacun ?`,
    ]),
    q,
    [t / a, t / b, a * b, q + 1, Number.isInteger(t / (a + b)) ? t / (a + b) : q * a],
    exp("Deux partages à la suite (ou un seul partage en " + `${a} × ${b} = ${a * b} parts).`, `On partage d’abord entre les ${a} ${G.g.des}, puis chaque part entre ${b}.`, `${fr(t)} ÷ ${a} = ${t / a}, puis ${t / a} ÷ ${b} = ${q}.`, `Chacun reçoit ${q} ${c.des}.`),
    barreEgale(a, null, fr(t)),
  );
}

function partsInegalesQ(): Q {
  const [p1, p2] = deuxPersonnes();
  const c = sit().chose;
  const m = rint(2, 6);
  const x = rint(4, 30);
  const t = x * (m + 1);
  const eux = p1.il === "elle" && p2.il === "elle" ? "elles" : "eux";
  const ils = eux === "elles" ? "elles" : "ils";
  const pourP2 = Math.random() < 0.6;
  const rep_ = pourP2 ? x : x * m;
  return qcmN(
    `Défi : ${p1.nom} a ${m} fois plus ${deM(c.des)} ${/^[aeiouyàâéèêëîïôœh]/i.test(p2.nom) ? "qu’" : "que "}${p2.nom}. À ${eux} deux, ${ils} en ont ${fr(t)}. Combien ${pourP2 ? p2.nom : p1.nom} en a-t-${(pourP2 ? p2 : p1).il} ?`,
    rep_,
    pourP2 ? [Math.floor(t / m), x * m, Math.floor(t / 2), t - m] : [x, Math.floor(t / m), Math.floor(t / 2), t - x * (m - 1)],
    exp(`${p2.nom} a 1 part, ${p1.nom} en a ${m} : ensemble, ${m + 1} parts égales.`, `On divise le total par ${m + 1}.`, `${fr(t)} ÷ ${m + 1} = ${x} ; ${p1.nom} a ${m} × ${x} = ${x * m}.`, `${pourP2 ? p2.nom : p1.nom} a ${rep_} ${c.des}.`),
    barre([[p2.nom, null], ...Array.from({ length: m }, () => [p1.nom, null] as [string, null])], fr(t)),
  );
}

/** Le défi décimal : partager une somme au centime, puis comparer ou ajouter. */
function defiDecimalQ(): Q {
  const n = pick([4, 5, 8]);
  const a = dividendeDecimal(n, n === 8 ? 90 : 60);
  const q = net(a / n);
  const [p1] = deuxPersonnes();
  const u = pick(["€", "m", "L", "kg"]);
  const k = rint(2, n - 1);
  const fin = net(q * k);
  const T = lu(a, u);
  const textes: Record<string, string> = {
    "€": `Défi : ${n} amis paient ensemble ${T} à parts égales. ${p1.nom} paie aussi la part de ${k - 1 === 1 ? "son frère" : `${k - 1} copains`}. Combien ${p1.nom} paie-t-${p1.il} en tout ?`,
    m: `Défi : un ruban de ${T} est coupé en ${n} morceaux égaux. ${p1.nom} en prend ${k}. Quelle longueur de ruban a-t-${p1.il} ?`,
    L: `Défi : ${T} de jus remplissent ${n} carafes égales. On en sert ${k} à la table de ${p1.nom}. Combien de litres sur sa table ?`,
    kg: `Défi : ${T} de farine sont répartis dans ${n} sacs égaux. ${p1.nom} achète ${k} sacs. Quelle masse de farine achète-t-${p1.il} ?`,
  };
  return qcmN(
    textes[u],
    fin,
    [q, net(fin * 10), net(Math.floor(q) * k), net((Math.floor(q) + (a % n) / 10) * k), net(a - fin), a],
    exp("Deux étapes : la valeur d’une part (on continue après la virgule), puis plusieurs parts.", `On calcule ${a} ÷ ${n}, puis on multiplie par ${k}.`, `${a} ÷ ${n} = ${fr(q)} ; ${fr(q)} × ${k} = ${fr(fin)}.`, `La réponse est ${lu(fin, u)}.`),
    barreEgale(n, null, T),
    u,
  );
}

/* ---------------- L'installation ---------------- */

function gab(id: string, microId: string, difficulty: E5, hint: string, tags: string[], generate: () => Q): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm2", "division", ...tags, "template"],
    generate,
  } as TutorBankItemV4;
}

const S = "division_sens";
const L = "division_lien_multiplication";
const P = "division_posee";
const R_ = "division_reste";
const PB = "division_probleme";
const DF = "division_defi";

/** Les anciens gabarits gardent leur id, branchés sur les nouveaux générateurs. */
const GABARITS_REPRIS: TutorBankItemV4[] = [
  gab("cm2_division_sens_tpl_1_partage", S, 1, "On cherche la part de chacun.", ["sens", "partage"], () => partageQ(1)),
  gab("cm2_division_sens_tpl_2_groupement", S, 2, "On cherche combien de groupes identiques on peut faire.", ["sens", "groupement"], () => groupementQ(2)),
  gab("cm2_division_sens_tpl_3_choisir_operation", S, 2, "Partager ou grouper : ÷. Répéter la même quantité : ×.", ["sens", "choisir_operation"], () => choisirOperationQ(2)),
  gab("cm2_division_sens_tpl_4_reunion", S, 3, "Avec un diviseur à 2 chiffres, pense à la multiplication à trou.", ["sens", "partage"], () => partageQ(3)),
  gab("cm2_division_lien_multiplication_tpl_1_direct", L, 1, "La multiplication donne la division toute faite.", ["lien_multiplication"], () => onSaitQueQ(1)),
  gab("cm2_division_lien_multiplication_tpl_2_verifier_qcm", L, 2, "On multiplie le diviseur par le quotient.", ["lien_multiplication", "verification"], () => verifierQ(2)),
  gab("cm2_division_lien_multiplication_tpl_3_facteur_manquant", L, 2, "Diviser, c’est chercher le nombre qui manque.", ["lien_multiplication"], () => trouTableQ(2)),
  gab("cm2_division_lien_multiplication_tpl_4_erreur", L, 3, "Le dividende passe en premier.", ["lien_multiplication", "erreur"], () => vraiFauxLienQ(3)),
  gab("cm2_division_lien_multiplication_tpl_5_famille", L, 3, "Le plus grand nombre de la famille s’écrit en premier.", ["lien_multiplication", "famille"], () => familleQ(3)),
  gab("cm2_division_posee_tpl_1_sans_reste", P, 2, "N’oublie pas le 0 quand le diviseur ne va pas.", ["posee", "canvas"], () => quotientQ(2)),
  gab("cm2_division_posee_tpl_2_avec_reste_quotient", P, 3, "Arrondis le diviseur pour estimer chaque chiffre.", ["posee", "canvas"], () => quotientQ(3)),
  gab("cm2_division_posee_tpl_3_avec_reste_reste", P, 3, "Arrondis le diviseur pour estimer.", ["posee", "estimation", "canvas"], () => estimerChiffreQ(3)),
  gab("cm2_division_posee_tpl_4_verification", P, 4, "dividende = diviseur × quotient + reste.", ["posee", "verification", "canvas"], () => verifierPoseQ(tiragePose(4, true))),
  gab("cm2_division_posee_tpl_5_erreur_reste_trop_grand", P, 4, "Vérifie : diviseur × quotient + reste, et reste plus petit que le diviseur.", ["posee", "erreur", "canvas"], () => erreurQ(tiragePose(4, Math.random() < 0.6))),
  gab("cm2_division_reste_tpl_1_trouver_reste", R_, 3, "Cherche le plus grand multiple du diviseur qui ne dépasse pas.", ["reste", "canvas"], () => resteQ(3)),
  gab("cm2_division_reste_tpl_2_reste_zero", R_, 2, "Le reste est plus petit que le diviseur.", ["reste", "canvas"], () => quotientResteQ(2)),
  gab("cm2_division_reste_tpl_3_interpreter_voitures", R_, 4, "Ceux qui restent ont besoin de place aussi.", ["reste", "interpretation", "canvas"], () => combienFautIlQ(4)),
  gab("cm2_division_reste_tpl_4_reunion_sachets", R_, 3, "Le reste ne fait pas un paquet complet.", ["reste", "interpretation", "canvas"], () => sachetsCompletsQ(3)),
  gab("cm2_division_reste_tpl_5_erreur_reste", R_, 4, "Vérifie : diviseur × quotient + reste, et reste plus petit que le diviseur.", ["reste", "erreur", "canvas"], () => erreurQ(tirageReste(4))),
  gab("cm2_division_probleme_tpl_1_partage", PB, 2, "Partager en parts égales, c’est diviser.", ["probleme", "partage", "canvas"], () => partagePbQ(2)),
  gab("cm2_division_probleme_tpl_2_groupement", PB, 2, "Combien de fois le petit nombre tient-il dans le grand ?", ["probleme", "groupement", "canvas"], () => groupementPbQ(2)),
  gab("cm2_division_probleme_tpl_3_reunion_fruits", PB, 3, "Partager ou faire des groupes : c’est une division.", ["probleme", "canvas"], () => recitQ(RECITS_QUOTIDIEN, 3)),
  gab("cm2_division_probleme_tpl_4_dechets", PB, 3, "Combien de fois le diviseur tient-il dans le total ?", ["probleme", "groupement", "canvas"], () => groupementPbQ(3)),
  gab("cm2_division_probleme_tpl_5_choisir_operation", PB, 3, "Partager ou grouper : ÷. Répéter la même quantité : ×.", ["probleme", "choisir_operation", "canvas"], () => choisirCalculPbQ(3)),
  gab("cm2_division_probleme_tpl_6_partage_avec_reste_canvas", PB, 4, "Que fait-on du reste ? Lis bien la question.", ["probleme", "reste", "canvas"], () => resteProblemeQ(4)),
  gab("cm2_division_probleme_tpl_7_nombre_groupes_canvas", PB, 4, "Des euros, des mètres, des litres : on continue après la virgule.", ["probleme", "decimal", "canvas"], recitDecimalQ),
  gab("cm2_division_probleme_tpl_8_erreur_operation", PB, 4, "Partager ou grouper : ÷. Répéter la même quantité : ×.", ["probleme", "choisir_operation", "canvas"], () => choisirCalculPbQ(4)),
  gab("cm2_division_defi_tpl_1_tresor", DF, 4, "Partage d’abord, puis ajuste.", ["defi", "deux_etapes", "canvas"], () => deuxEtapesQ(4)),
  gab("cm2_division_defi_tpl_2_margouillats", DF, 4, "Réunis d’abord, partage ensuite.", ["defi", "deux_etapes", "canvas"], reunirPartagerQ),
  gab("cm2_division_defi_tpl_3_groupement_reste", DF, 5, "Le reste va de 0 au diviseur moins 1.", ["defi", "reste", "canvas"], extremeDividendeQ),
  gab("cm2_division_defi_tpl_4_voitures", DF, 5, "Ceux qui restent ont besoin de place aussi.", ["defi", "reste", "canvas"], () => combienFautIlQ(5)),
  gab("cm2_division_defi_tpl_5_erreur_reste", DF, 5, "Remonte la division : diviseur × quotient + reste.", ["defi", "mystere", "canvas"], nombreMystereQ),
  gab("cm2_division_defi_tpl_6_reunion_eau", DF, 5, "Deux partages à la suite.", ["defi", "deux_etapes", "canvas"], partageDeuxFoisQ),
];

const GABARITS_CM2: TutorBankItemV4[] = [
  // DIVISION_SENS ★1 : les tables.
  gab("cm2_division_sens_tpl_groupement_e1", S, 1, "Combien de fois le petit nombre tient-il dans le grand ?", ["sens", "groupement"], () => groupementQ(1)),
  gab("cm2_division_sens_tpl_ordre_calcul_e1", S, 1, "Le nombre qu’on partage passe en premier.", ["sens", "choisir_operation"], () => ordreCalculQ(1)),
  gab("cm2_division_sens_tpl_vocabulaire_e1", S, 1, "Dividende ÷ diviseur = quotient.", ["sens", "vocabulaire"], () => grandPremierQ(1)),
  gab("cm2_division_sens_tpl_signe_e1", S, 1, "Le signe ÷ se lit « divisé par ».", ["sens", "symbole"], () => signeQ(1)),
  gab("cm2_division_sens_tpl_que_cherche_e1", S, 1, "Connaît-on le nombre de parts, ou la taille d’un groupe ?", ["sens"], () => queChercheQ(1)),
  // ★2 : dizaines et centaines.
  gab("cm2_division_sens_tpl_partage_e2", S, 2, "Pense en dizaines ou en centaines : 2 400, c’est 24 centaines.", ["sens", "partage", "dizaines"], () => partageQ(2)),
  gab("cm2_division_sens_tpl_piege_ordre_e2", S, 2, "Une multiplication se retourne, une division non.", ["sens", "piege", "ordre"], () => piegeOrdreQ(2)),
  gab("cm2_division_sens_tpl_erreur_e2", S, 2, "Partager, c’est diviser : dividende ÷ nombre de parts.", ["sens", "erreur"], () => erreurEleveQ(2)),
  gab("cm2_division_sens_tpl_que_cherche_e2", S, 2, "Connaît-on le nombre de parts, ou la taille d’un groupe ?", ["sens"], () => queChercheQ(2)),
  gab("cm2_division_sens_tpl_signe_e2", S, 2, "Le signe ÷ se lit « divisé par ».", ["sens", "symbole"], () => signeQ(2)),
  // ★3 : diviseur à 2 chiffres, quotient décimal.
  gab("cm2_division_sens_tpl_groupement_e3", S, 3, "Combien de fois le diviseur tient-il dans le dividende ?", ["sens", "groupement"], () => groupementQ(3)),
  gab("cm2_division_sens_tpl_decimal_e3", S, 3, "Des litres, des mètres, des euros se coupent : on continue après la virgule.", ["sens", "decimal"], partageDecimalQ),
  gab("cm2_division_sens_tpl_virgule_ou_reste_e3", S, 3, "Des enfants ne se coupent pas ; des euros, si.", ["sens", "decimal", "reste"], virguleOuResteQ),
  gab("cm2_division_sens_tpl_choisir_operation_e3", S, 3, "Partager ou grouper : ÷. Répéter la même quantité : ×.", ["sens", "choisir_operation"], () => choisirOperationQ(3)),
  gab("cm2_division_sens_tpl_erreur_e3", S, 3, "Partager, c’est diviser : dividende ÷ nombre de parts.", ["sens", "erreur"], () => erreurEleveQ(3)),
  gab("cm2_division_sens_tpl_vocabulaire_e3", S, 3, "Dividende ÷ diviseur = quotient.", ["sens", "vocabulaire"], () => grandPremierQ(3)),

  // DIVISION_LIEN_MULTIPLICATION ★1 : les tables.
  gab("cm2_division_lien_tpl_deux_divisions_e1", L, 1, "Une multiplication, deux divisions.", ["lien_multiplication", "famille"], () => deuxDivisionsQ(1)),
  gab("cm2_division_lien_tpl_rangees_colonnes_e1", L, 1, "Encadre les rangées, puis les colonnes.", ["lien_multiplication", "billes", "canvas"], rangeesColonnesQ),
  gab("cm2_division_lien_tpl_trou_e1", L, 1, "Diviser, c’est chercher le nombre qui manque.", ["lien_multiplication", "table"], () => trouTableQ(1)),
  gab("cm2_division_lien_tpl_lire_tableau_e1", L, 1, "La ligne, le résultat, puis le haut de la colonne.", ["lien_multiplication", "tableau", "canvas"], lireTableauQ),
  gab("cm2_division_lien_tpl_mult_aide_e1", L, 1, "Cherche dans la table du diviseur.", ["lien_multiplication"], () => multAideQ(1)),
  // ★2 : un facteur à 2 chiffres.
  gab("cm2_division_lien_tpl_on_sait_que_e2", L, 2, "La multiplication donne la division toute faite.", ["lien_multiplication"], () => onSaitQueQ(2)),
  gab("cm2_division_lien_tpl_deux_divisions_e2", L, 2, "Une multiplication, deux divisions.", ["lien_multiplication", "famille"], () => deuxDivisionsQ(2)),
  gab("cm2_division_lien_tpl_combien_de_fois_e2", L, 2, "Compte de tant en tant jusqu’au total.", ["lien_multiplication"], () => combienDeFoisQ(2)),
  gab("cm2_division_lien_tpl_mult_aide_e2", L, 2, "Cherche dans les multiples du diviseur.", ["lien_multiplication"], () => multAideQ(2)),
  gab("cm2_division_lien_tpl_intrus_e2", L, 2, "Une division ne se retourne pas.", ["lien_multiplication", "famille"], () => intrusQ(2)),
  // ★3 : grands facteurs, décimaux, problèmes.
  gab("cm2_division_lien_tpl_on_sait_que_e3", L, 3, "La multiplication donne la division toute faite.", ["lien_multiplication"], () => onSaitQueQ(3)),
  gab("cm2_division_lien_tpl_decimal_e3", L, 3, "Une multiplication, deux divisions : aussi avec des décimaux.", ["lien_multiplication", "decimal"], lienDecimalQ),
  gab("cm2_division_lien_tpl_verifier_e3", L, 3, "On multiplie le diviseur par le quotient.", ["lien_multiplication", "verification"], () => verifierQ(3)),
  gab("cm2_division_lien_tpl_probleme_e3", L, 3, "Quelle multiplication connue cache la réponse ?", ["lien_multiplication", "probleme"], () => problemeLienQ(3)),
  gab("cm2_division_lien_tpl_intrus_e3", L, 3, "Une division ne se retourne pas.", ["lien_multiplication", "famille"], () => intrusQ(3)),

  // DIVISION_POSEE ★1 : 2 chiffres ÷ 1 chiffre, le vocabulaire.
  gab("cm2_division_posee_tpl_quotient_e1", P, 1, "Commence par la gauche : les dizaines d’abord.", ["posee", "canvas"], () => quotientQ(1)),
  gab("cm2_division_posee_tpl_etapes_e1", P, 1, "Le reste des dizaines s’échange contre des unités.", ["posee", "etapes", "canvas"], etapesQ),
  gab("cm2_division_posee_tpl_vocabulaire_e1", P, 1, "dividende ÷ diviseur = quotient, reste …", ["posee", "vocabulaire", "canvas"], () => vocabulaireQ(1)),
  gab("cm2_division_posee_tpl_premier_pas_e1", P, 1, "On commence par la gauche, jamais par les unités.", ["posee", "methode", "canvas"], () => premierPasQ(1)),
  gab("cm2_division_posee_tpl_nb_chiffres_e1", P, 1, "Compare le premier chiffre à gauche au diviseur.", ["posee", "estimation"], () => nbChiffresQ(1)),
  // ★2 : 3 chiffres ÷ 1 chiffre, le 0 du quotient.
  gab("cm2_division_posee_tpl_nb_chiffres_e2", P, 2, "Compare le premier chiffre à gauche au diviseur.", ["posee", "estimation"], () => nbChiffresQ(2)),
  gab("cm2_division_posee_tpl_premier_pas_e2", P, 2, "Si le premier chiffre est trop petit, prends les deux premiers.", ["posee", "methode", "canvas"], () => premierPasQ(2)),
  gab("cm2_division_posee_tpl_erreur_e2", P, 2, "Vérifie avec diviseur × quotient : il manque peut-être un 0.", ["posee", "erreur", "zero", "canvas"], () => erreurQ(tiragePose(2, Math.random() < 0.4))),
  gab("cm2_division_posee_tpl_verifier_e2", P, 2, "dividende = diviseur × quotient + reste.", ["posee", "verification", "canvas"], () => verifierPoseQ(tiragePose(2, true))),
  gab("cm2_division_posee_tpl_probleme_e2", P, 2, "Pose la division : total ÷ nombre de parts.", ["posee", "probleme", "canvas"], () => problemePoseQ(2)),
  // ★3 : diviseur à 2 chiffres.
  gab("cm2_division_posee_tpl_nb_chiffres_e3", P, 3, "Avec un diviseur à 2 chiffres, prends assez de chiffres au dividende.", ["posee", "estimation"], () => nbChiffresQ(3)),
  gab("cm2_division_posee_tpl_premier_pas_e3", P, 3, "Prends assez de chiffres pour contenir le diviseur.", ["posee", "methode", "canvas"], () => premierPasQ(3)),
  gab("cm2_division_posee_tpl_verifier_e3", P, 3, "dividende = diviseur × quotient + reste.", ["posee", "verification", "canvas"], () => verifierPoseQ(tiragePose(3, true))),
  gab("cm2_division_posee_tpl_erreur_e3", P, 3, "Vérifie : diviseur × quotient + reste, et reste plus petit que le diviseur.", ["posee", "erreur", "canvas"], () => erreurQ(tiragePose(3, Math.random() < 0.6))),
  gab("cm2_division_posee_tpl_probleme_e3", P, 3, "Pose la division : total ÷ nombre de parts.", ["posee", "probleme", "canvas"], () => problemePoseQ(3)),
  // ★4 : 4 chiffres ÷ 2 chiffres, quotient décimal, décimal ÷ entier.
  gab("cm2_division_posee_tpl_quotient_e4", P, 4, "Arrondis le diviseur, et n’oublie pas les 0.", ["posee", "zero", "canvas"], () => quotientQ(4)),
  gab("cm2_division_posee_tpl_quotient_decimal_e4", P, 4, "Ne t’arrête pas au reste : 7 = 7,00.", ["posee", "decimal", "canvas"], quotientDecimalQ),
  gab("cm2_division_posee_tpl_decimal_par_entier_e4", P, 4, "Place la virgule au quotient quand tu abaisses les dixièmes.", ["posee", "decimal", "canvas"], decimalParEntierQ),
  gab("cm2_division_posee_tpl_virgule_e4", P, 4, "Vérifie l’ordre de grandeur : où est la virgule ?", ["posee", "decimal", "erreur", "canvas"], virguleOublieeQ),
  gab("cm2_division_posee_tpl_estimer_e4", P, 4, "Arrondis le diviseur pour estimer.", ["posee", "estimation", "canvas"], () => estimerChiffreQ(4)),

  // DIVISION_RESTE ★2 : les tables.
  gab("cm2_division_reste_tpl_reste_e2", R_, 2, "Cherche le plus grand multiple du diviseur qui ne dépasse pas.", ["reste", "canvas"], () => resteQ(2)),
  gab("cm2_division_reste_tpl_possible_e2", R_, 2, "Le reste est toujours plus petit que le diviseur.", ["reste", "propriete"], () => restePossibleQ(2)),
  gab("cm2_division_reste_tpl_complets_e2", R_, 2, "Le reste ne fait pas un paquet complet.", ["reste", "interpretation", "canvas"], () => sachetsCompletsQ(2)),
  gab("cm2_division_reste_tpl_a_part_e2", R_, 2, "Ce qui ne remplit pas un paquet, c’est le reste.", ["reste", "interpretation", "canvas"], () => resteContexteQ(2)),
  gab("cm2_division_reste_tpl_dessin_e2", R_, 2, "Compte les paquets complets, puis ce qui reste à part.", ["reste", "canvas"], dessinResteQ),
  // ★3 : diviseur à 2 chiffres.
  gab("cm2_division_reste_tpl_quotient_reste_e3", R_, 3, "Le reste est plus petit que le diviseur.", ["reste", "canvas"], () => quotientResteQ(3)),
  gab("cm2_division_reste_tpl_possible_e3", R_, 3, "Le reste est toujours plus petit que le diviseur.", ["reste", "propriete"], () => restePossibleQ(3)),
  gab("cm2_division_reste_tpl_a_part_e3", R_, 3, "Ce qui ne remplit pas un paquet, c’est le reste.", ["reste", "interpretation", "canvas"], () => resteContexteQ(3)),
  gab("cm2_division_reste_tpl_faut_il_e3", R_, 3, "Ceux qui restent ont besoin de place aussi.", ["reste", "interpretation", "canvas"], () => combienFautIlQ(3)),
  gab("cm2_division_reste_tpl_egalite_e3", R_, 3, "dividende = diviseur × quotient + reste.", ["reste", "verification", "canvas"], () => egaliteQ(3)),
  // ★4 : interpréter, vérifier, virgule ou reste.
  gab("cm2_division_reste_tpl_quotient_reste_e4", R_, 4, "Le reste est plus petit que le diviseur.", ["reste", "canvas"], () => quotientResteQ(4)),
  gab("cm2_division_reste_tpl_manque_e4", R_, 4, "Compare le reste au diviseur.", ["reste", "interpretation", "canvas"], () => combienManqueQ(4)),
  gab("cm2_division_reste_tpl_egalite_e4", R_, 4, "dividende = diviseur × quotient + reste.", ["reste", "verification", "canvas"], () => egaliteQ(4)),
  gab("cm2_division_reste_tpl_virgule_ou_reste_e4", R_, 4, "Des enfants ne se coupent pas ; des euros, si.", ["reste", "decimal", "interpretation"], virguleOuResteQ),
  gab("cm2_division_reste_tpl_complets_e4", R_, 4, "Le reste ne fait pas un paquet complet.", ["reste", "interpretation", "canvas"], () => sachetsCompletsQ(4)),

  // DIVISION_PROBLEME ★2 : des récits de la vie, diviseur à 1 chiffre.
  gab("cm2_division_probleme_tpl_mesures_e2", PB, 2, "Longueurs, masses, litres : on divise comme pour des objets.", ["probleme", "mesures", "canvas"], () => recitQ(RECITS_MESURES, 2)),
  gab("cm2_division_probleme_tpl_argent_e2", PB, 2, "Le prix total ÷ le prix d’un, ou ÷ le nombre de personnes.", ["probleme", "argent", "canvas"], () => recitQ(RECITS_ARGENT, 2)),
  gab("cm2_division_probleme_tpl_quotidien_e2", PB, 2, "Partager ou faire des groupes : c’est une division.", ["probleme", "canvas"], () => recitQ(RECITS_QUOTIDIEN, 2)),
  gab("cm2_division_probleme_tpl_equipes_e2", PB, 2, "Partager ou faire des groupes : c’est une division.", ["probleme", "groupes", "canvas"], () => equipesQ(2)),
  // ★3 : diviseur à 2 chiffres, donnée inutile.
  gab("cm2_division_probleme_tpl_partage_e3", PB, 3, "Partager en parts égales, c’est diviser.", ["probleme", "partage", "canvas"], () => partagePbQ(3)),
  gab("cm2_division_probleme_tpl_mesures_e3", PB, 3, "Longueurs, masses, litres : on divise comme pour des objets.", ["probleme", "mesures", "canvas"], () => recitQ(RECITS_MESURES, 3)),
  gab("cm2_division_probleme_tpl_argent_e3", PB, 3, "Le prix total ÷ le prix d’un, ou ÷ le nombre de personnes.", ["probleme", "argent", "canvas"], () => recitQ(RECITS_ARGENT, 3)),
  gab("cm2_division_probleme_tpl_inutile_e3", PB, 3, "Garde seulement les nombres dont la question a besoin.", ["probleme", "donnee_inutile", "canvas"], () => donneeInutileQ(3)),
  gab("cm2_division_probleme_tpl_equipes_e3", PB, 3, "Partager ou faire des groupes : c’est une division.", ["probleme", "groupes", "canvas"], () => equipesQ(3)),
  // ★4 : quotient décimal, décimal ÷ entier, reste à interpréter.
  gab("cm2_division_probleme_tpl_decimal_par_entier_e4", PB, 4, "Partage les dixièmes : la virgule reste au même rang.", ["probleme", "decimal", "canvas"], decimalParEntierPbQ),
  gab("cm2_division_probleme_tpl_reste_e4", PB, 4, "Que fait-on du reste ? Lis bien la question.", ["probleme", "reste", "canvas"], () => resteProblemeQ(4)),
  gab("cm2_division_probleme_tpl_quotidien_e4", PB, 4, "Partager ou faire des groupes : c’est une division.", ["probleme", "canvas"], () => recitQ(RECITS_QUOTIDIEN, 4)),
  gab("cm2_division_probleme_tpl_inutile_e4", PB, 4, "Garde seulement les nombres dont la question a besoin.", ["probleme", "donnee_inutile", "canvas"], () => donneeInutileQ(4)),

  // DIVISION_DEFI ★4 : deux étapes.
  gab("cm2_division_defi_tpl_prix_e4", DF, 4, "Trouve d’abord le prix d’un.", ["defi", "deux_etapes", "canvas"], () => prixUnitaireQ(4)),
  gab("cm2_division_defi_tpl_parts_e4", DF, 4, "Compte les parts égales en tout.", ["defi", "parts", "canvas"], partsInegalesQ),
  gab("cm2_division_defi_tpl_verifier_e4", DF, 4, "dividende = diviseur × quotient + reste.", ["defi", "verification", "canvas"], () => verifierPoseQ(tirageReste(4))),
  gab("cm2_division_defi_tpl_places_e4", DF, 4, "Ceux qui restent ont besoin de place aussi.", ["defi", "reste", "canvas"], () => combienFautIlQ(4)),
  gab("cm2_division_defi_tpl_mystere_e4", DF, 4, "Remonte la division : diviseur × quotient + reste.", ["defi", "mystere", "canvas"], nombreMystereQ),
  // ★5 : trois étapes, décimaux.
  gab("cm2_division_defi_tpl_trois_etapes_e5", DF, 5, "Réunis, partage, puis ajuste.", ["defi", "deux_etapes", "canvas"], () => deuxEtapesQ(5)),
  gab("cm2_division_defi_tpl_prix_e5", DF, 5, "Le prix d’un peut avoir des centimes.", ["defi", "decimal", "canvas"], () => prixUnitaireQ(5)),
  gab("cm2_division_defi_tpl_decimal_e5", DF, 5, "La valeur d’une part, puis plusieurs parts.", ["defi", "decimal", "canvas"], defiDecimalQ),
  gab("cm2_division_defi_tpl_parts_e5", DF, 5, "Compte les parts égales en tout.", ["defi", "parts", "canvas"], partsInegalesQ),
];

export const divisionBank: TutorBankItemV4[] = [
  // ============================================================
  // DIVISION_SENS
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_division_sens_fixed_1_partage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 1,
    theme: "neutral",
    text: "On partage 24 bonbons entre 6 enfants. Combien chaque enfant reçoit-il de bonbons ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "On cherche la part de chaque enfant.",
    explanation: exp(
      "La division permet de partager une quantité en parts égales.",
      "On divise le nombre total par le nombre de parts.",
      "24 ÷ 6 = 4.",
      "Chaque enfant reçoit 4 bonbons."
    ),
    tags: ["cm2", "division", "sens", "partage"],
  },

  {
    kind: "fixed",
    id: "cm2_division_sens_fixed_2_groupement",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 1,
    theme: "neutral",
    text: "On range 30 cartes par paquets de 5. Combien peut-on faire de paquets ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "On cherche combien de groupes de 5 on peut faire.",
    explanation: exp(
      "La division peut aussi servir à faire des groupes de même taille.",
      "On cherche combien de fois 5 entre dans 30.",
      "30 ÷ 5 = 6.",
      "On peut faire 6 paquets."
    ),
    tags: ["cm2", "division", "sens", "groupement"],
  },

  {
    kind: "fixed",
    id: "cm2_division_sens_fixed_3_qcm",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "neutral",
    text: "Dans quelle situation utilise-t-on une division ?",
    format: "qcm",
    choices: [
      "partager 32 objets entre 4 élèves",
      "ajouter 32 objets et 4 objets",
      "enlever 4 objets à 32 objets",
      "compter 4 objets seulement",
    ],
    expected: ["partager 32 objets entre 4 élèves"],
    comparator: "mcq_exact",
    hint: "La division sert souvent à partager équitablement.",
    explanation: exp(
      "La division est utile quand on partage ou quand on fait des groupes égaux.",
      "On repère la situation où une quantité est répartie en parts égales.",
      "Partager 32 objets entre 4 élèves correspond à 32 ÷ 4.",
      "Cette situation utilise une division."
    ),
    tags: ["cm2", "division", "sens", "qcm", "choisir_operation"],
  },

  {
    kind: "fixed",
    id: "cm2_division_sens_fixed_4_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève partage 20 billes entre 5 enfants et calcule 20 + 5. A-t-il choisi la bonne opération ?",
    format: "qcm",
    choices: ["Non : il fallait 20 ÷ 5.", "Oui : on ajoute les billes et les enfants.", "Non : il fallait 20 − 5."],
    expected: ["Non : il fallait 20 ÷ 5."],
    comparator: "mcq_exact",
    hint: "Le mot « partage » indique souvent une division.",
    explanation: exp(
      "Il faut choisir l’opération qui correspond à la situation.",
      "Quand on partage une quantité en parts égales, on utilise une division.",
      "Il fallait calculer 20 ÷ 5 = 4, et non 20 + 5.",
      "L’élève n’a pas choisi la bonne opération."
    ),
    tags: ["cm2", "division", "sens", "erreur", "choisir_operation"],
  },

  {
    kind: "fixed",
    id: "cm2_division_sens_fixed_5_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, 36 letchis sont partagés également dans 4 sachets. Combien de letchis y a-t-il dans chaque sachet ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "On partage 36 en 4 parts égales.",
    explanation: exp(
      "La division permet de partager une quantité en parts égales.",
      "On divise le nombre total de letchis par le nombre de sachets.",
      "36 ÷ 4 = 9.",
      "Il y a 9 letchis dans chaque sachet."
    ),
    tags: ["cm2", "division", "sens", "reunion", "marche"],
  },

  {
    kind: "fixed",
    id: "cm2_division_sens_fixed_6_groupes_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 3,
    theme: "reunion",
    text: "Une classe ramasse 48 déchets. On fait des sacs de 8 déchets. Combien de sacs peut-on remplir ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "On cherche combien de groupes de 8 on peut faire.",
    explanation: exp(
      "La division peut servir à faire des groupes de même taille.",
      "On cherche combien de sacs de 8 déchets on peut remplir avec 48 déchets.",
      "48 ÷ 8 = 6.",
      "On peut remplir 6 sacs."
    ),
    tags: ["cm2", "division", "sens", "reunion", "dechet", "groupement"],
  },

    // ============================================================
  // DIVISION_LIEN_MULTIPLICATION
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_division_lien_multiplication_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 1,
    theme: "neutral",
    text: "Si 6 × 4 = 24, alors 24 ÷ 6 = ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "La division retrouve un facteur de la multiplication.",
    explanation: exp(
      "La division est liée à la multiplication.",
      "Si on connaît une multiplication, on peut retrouver une division.",
      "6 × 4 = 24, donc 24 ÷ 6 = 4.",
      "La réponse est 4."
    ),
    tags: ["cm2", "division", "lien_multiplication", "table"],
  },

  {
    kind: "fixed",
    id: "cm2_division_lien_multiplication_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle multiplication permet de vérifier 35 ÷ 5 = 7 ?",
    format: "qcm",
    choices: ["5 × 7 = 35", "35 × 5 = 7", "7 - 5 = 35", "35 + 5 = 40"],
    expected: ["5 × 7 = 35"],
    comparator: "mcq_exact",
    choiceDiagnostics: [
      {
        choice: "35 × 5 = 7",
        cause:
          "Pour vérifier une division, on multiplie le diviseur par le quotient (5 × 7), pas le dividende",
        prereqMicroId: "multiplication_table",
        errorKind: "conceptual",
      },
      {
        choice: "7 - 5 = 35",
        cause: "Une division se vérifie avec une multiplication, pas une soustraction",
        prereqMicroId: "division_sens",
        errorKind: "conceptual",
      },
      {
        choice: "35 + 5 = 40",
        cause: "Une division se vérifie avec une multiplication, pas une addition",
        prereqMicroId: "division_sens",
        errorKind: "conceptual",
      },
    ],
    hint: "On vérifie une division avec diviseur × quotient.",
    explanation: exp(
      "On peut vérifier une division avec une multiplication.",
      "On multiplie le diviseur par le quotient.",
      "5 × 7 = 35.",
      "La multiplication 5 × 7 = 35 vérifie la division."
    ),
    tags: ["cm2", "division", "lien_multiplication", "verification", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_division_lien_multiplication_fixed_3_trou",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 48 ÷ ? = 6",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Cherche quel nombre multiplié par 6 donne 48.",
    explanation: exp(
      "Une division à trou peut se résoudre avec une multiplication.",
      "On cherche le nombre qui multiplié par 6 donne 48.",
      "8 × 6 = 48, donc 48 ÷ 8 = 6.",
      "Le nombre manquant est 8."
    ),
    tags: ["cm2", "division", "lien_multiplication", "facteur_manquant"],
  },

  {
    kind: "fixed",
    id: "cm2_division_lien_multiplication_fixed_4_famille",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Avec l’égalité 8 × 7 = 56, quelle division est vraie ?",
    format: "qcm",
    choices: ["56 ÷ 8 = 7", "56 ÷ 7 = 9", "8 ÷ 56 = 7", "7 ÷ 8 = 56"],
    expected: ["56 ÷ 8 = 7"],
    comparator: "mcq_exact",
    choiceDiagnostics: [
      {
        choice: "56 ÷ 7 = 9",
        cause: "Erreur de table : 7 × 9 = 63, pas 56 (c'est 7 × 8 = 56)",
        prereqMicroId: "multiplication_table",
        errorKind: "conceptual",
      },
      {
        choice: "8 ÷ 56 = 7",
        cause: "Tu as inversé : on divise le produit (56) par un facteur, pas l'inverse",
        prereqMicroId: "division_sens",
        errorKind: "conceptual",
      },
      {
        choice: "7 ÷ 8 = 56",
        cause: "Tu as inversé le sens de la division : 56 est le nombre à partager",
        prereqMicroId: "division_sens",
        errorKind: "conceptual",
      },
    ],
    hint: "Le produit 56 peut être divisé par un facteur pour retrouver l’autre facteur.",
    explanation: exp(
      "Une multiplication donne une famille de calculs liés.",
      "Avec 8 × 7 = 56, on peut diviser 56 par 8 pour retrouver 7.",
      "56 ÷ 8 = 7.",
      "La division vraie est 56 ÷ 8 = 7."
    ),
    tags: ["cm2", "division", "lien_multiplication", "famille", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_division_lien_multiplication_fixed_5_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme : comme 9 × 6 = 54, alors 54 ÷ 9 = 6. A-t-il raison ?",
    format: "qcm",
    choices: ["Oui : 9 × 6 = 54, donc 54 ÷ 9 = 6.", "Non : il faut poser la division pour le savoir.", "Non : c’est 9 ÷ 54 = 6."],
    expected: ["Oui : 9 × 6 = 54, donc 54 ÷ 9 = 6."],
    comparator: "mcq_exact",
    hint: "On divise le produit par un facteur pour retrouver l’autre facteur.",
    explanation: exp(
      "La division permet de retrouver un facteur d’une multiplication.",
      "On vérifie avec la multiplication donnée.",
      "9 × 6 = 54, donc 54 ÷ 9 = 6.",
      "L’élève a raison."
    ),
    tags: ["cm2", "division", "lien_multiplication", "verification", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_division_lien_multiplication_fixed_6_erreur_piege",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme : comme 7 × 8 = 56, alors 56 ÷ 7 = 6. A-t-il raison ?",
    format: "qcm",
    choices: ["Non : 7 × 8 = 56, donc 56 ÷ 7 = 8.", "Oui : 7 × 8 = 56, donc 56 ÷ 7 = 6.", "Non : c’est 7 ÷ 56 = 8."],
    expected: ["Non : 7 × 8 = 56, donc 56 ÷ 7 = 8."],
    comparator: "mcq_exact",
    hint: "Vérifie : 7 × 6 donne-t-il 56 ?",
    explanation: exp(
      "Pour vérifier une division, on utilise une multiplication.",
      "On multiplie le diviseur par le quotient proposé.",
      "7 × 6 = 42, pas 56. En réalité, 56 ÷ 7 = 8.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm2", "division", "lien_multiplication", "erreur", "piege"],
  },

    // ============================================================
  // DIVISION_POSEE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_division_posee_fixed_1_vocabulaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 1,
    theme: "neutral",
    text: "Dans la division 36 ÷ 4, comment s’appelle le nombre 36 ?",
    format: "qcm",
    choices: ["le dividende", "le diviseur", "le quotient", "le reste"],
    expected: ["le dividende"],
    comparator: "mcq_exact",
    hint: "Le dividende est le nombre que l’on partage ou que l’on divise.",
    explanation: exp(
      "Dans une division, le dividende est le nombre que l’on divise.",
      "On repère le premier nombre de la division.",
      "Dans 36 ÷ 4, le nombre divisé est 36.",
      "36 est le dividende."
    ),
    tags: ["cm2", "division", "posee", "vocabulaire", "qcm"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Vocabulaire de la division",
      numbers: ["36", "4"],
      division: {
        dividende: "36",
        diviseur: "4",
        quotient: "9",
        reste: "0",
      },
      questionLabel: "36 est le nombre que l’on divise.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_posee_fixed_2_sans_reste",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 48 ÷ 6",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Cherche combien de fois 6 entre dans 48.",
    explanation: exp(
      "Une division permet de chercher combien de fois un nombre entre dans un autre.",
      "On peut utiliser les tables de multiplication.",
      "6 × 8 = 48, donc 48 ÷ 6 = 8.",
      "Le quotient est 8."
    ),
    tags: ["cm2", "division", "posee", "sans_reste", "canvas"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Division sans reste",
      numbers: ["48", "6"],
      division: {
        dividende: "48",
        diviseur: "6",
        quotient: "8",
        reste: "0",
      },
      questionLabel: "On cherche le quotient.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_posee_fixed_3_avec_reste",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Dans la division de 37 par 5, quel est le quotient ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche le plus grand multiple de 5 inférieur ou égal à 37.",
    explanation: exp(
      "Dans une division avec reste, le quotient indique le nombre de groupes complets.",
      "On cherche le plus grand multiple du diviseur sans dépasser le dividende.",
      "5 × 7 = 35 et 5 × 8 = 40, trop grand.",
      "Le quotient est 7."
    ),
    tags: ["cm2", "division", "posee", "quotient", "reste", "canvas"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Division avec reste",
      numbers: ["37", "5"],
      division: {
        dividende: "37",
        diviseur: "5",
        quotient: "7",
        reste: "2",
      },
      questionLabel: "5 × 7 = 35, il reste 2.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_posee_fixed_4_reste",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Dans la division de 37 par 5, quel est le reste ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "5 × 7 = 35. Compare 35 avec 37.",
    explanation: exp(
      "Le reste est ce qui reste après avoir fait le plus de groupes possibles.",
      "On calcule le plus grand multiple du diviseur sans dépasser le dividende.",
      "5 × 7 = 35, puis 37 - 35 = 2.",
      "Le reste est 2."
    ),
    tags: ["cm2", "division", "posee", "reste", "canvas"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Trouver le reste",
      numbers: ["37", "5"],
      division: {
        dividende: "37",
        diviseur: "5",
        quotient: "7",
        reste: "2",
      },
      questionLabel: "Reste = 37 - 35.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_posee_fixed_6_verification",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle égalité vérifie la division : 37 ÷ 5 = 7 reste 2 ?",
    format: "qcm",
    choices: [
      "37 = 5 × 7 + 2",
      "37 = 5 + 7 + 2",
      "37 = 7 × 2 + 5",
      "37 = 5 × 2 + 7",
    ],
    expected: ["37 = 5 × 7 + 2"],
    comparator: "mcq_exact",
    hint: "Utilise : dividende = diviseur × quotient + reste.",
    explanation: exp(
      "Une division avec reste se vérifie avec une multiplication et une addition.",
      "On utilise la formule : dividende = diviseur × quotient + reste.",
      "5 × 7 + 2 = 35 + 2 = 37.",
      "L’égalité correcte est 37 = 5 × 7 + 2."
    ),
    tags: ["cm2", "division", "posee", "verification", "qcm", "canvas"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Vérifier une division",
      numbers: ["37", "5"],
      division: {
        dividende: "37",
        diviseur: "5",
        quotient: "7",
        reste: "2",
      },
      questionLabel: "dividende = diviseur × quotient + reste",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

    // ============================================================
  // DIVISION_RESTE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_division_reste_fixed_1_comprendre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 2,
    theme: "neutral",
    text: "On partage 26 cartes entre 4 élèves. Chaque élève reçoit 6 cartes. Combien de cartes restent ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "4 × 6 = 24. Compare avec 26.",
    explanation: exp(
      "Le reste est ce qui ne peut pas être partagé également.",
      "On calcule d’abord ce qui est distribué.",
      "4 × 6 = 24, puis 26 - 24 = 2.",
      "Il reste 2 cartes."
    ),
    tags: ["cm2", "division", "reste", "partage"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Comprendre le reste",
      numbers: ["26", "4"],
      division: {
        dividende: "26",
        diviseur: "4",
        quotient: "6",
        reste: "2",
      },
      questionLabel: "Le reste est ce qui n’est pas partagé.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_reste_fixed_2_interpreter",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 3,
    theme: "neutral",
    text: "29 élèves montent dans des voitures de 4 places. Combien de voitures faut-il prévoir ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "7 voitures ne suffisent pas, car il resterait 1 élève.",
    explanation: exp(
      "Le reste doit être interprété selon la situation.",
      "On cherche combien de groupes de 4 on peut faire, puis on regarde s’il reste des élèves.",
      "29 ÷ 4 = 7 reste 1. Il faut donc une voiture de plus.",
      "Il faut prévoir 8 voitures."
    ),
    tags: ["cm2", "division", "reste", "interpretation", "probleme"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Interpréter le reste",
      numbers: ["29", "4"],
      division: {
        dividende: "29",
        diviseur: "4",
        quotient: "7",
        reste: "1",
      },
      questionLabel: "Le reste oblige à prévoir une voiture de plus.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_reste_fixed_3_reste_zero",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 2,
    theme: "neutral",
    text: "Dans la division 42 ÷ 7, quel est le reste ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "42 est exactement dans la table de 7.",
    explanation: exp(
      "Le reste peut être égal à 0.",
      "On vérifie si le dividende est exactement un multiple du diviseur.",
      "7 × 6 = 42, donc 42 ÷ 7 = 6 reste 0.",
      "Le reste est 0."
    ),
    tags: ["cm2", "division", "reste", "reste_zero"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Division sans reste",
      numbers: ["42", "7"],
      division: {
        dividende: "42",
        diviseur: "7",
        quotient: "6",
        reste: "0",
      },
      questionLabel: "Ici, il ne reste rien.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_reste_fixed_4_qcm",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une division euclidienne, le reste doit toujours être...",
    format: "qcm",
    choices: [
      "plus petit que le diviseur",
      "plus grand que le diviseur",
      "égal au quotient",
      "égal au dividende",
    ],
    expected: ["plus petit que le diviseur"],
    comparator: "mcq_exact",
    hint: "Si le reste est trop grand, on peut encore faire un groupe.",
    explanation: exp(
      "Dans une division euclidienne, le reste a une règle importante.",
      "On vérifie que le reste est inférieur au diviseur.",
      "Si le reste est supérieur ou égal au diviseur, on peut encore faire un groupe.",
      "Le reste doit toujours être plus petit que le diviseur."
    ),
    tags: ["cm2", "division", "reste", "qcm", "regle"],
  },

  {
    kind: "fixed",
    id: "cm2_division_reste_fixed_5_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché, on veut mettre 50 letchis dans des sachets de 6. Combien de letchis resteront sans sachet complet ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Cherche le plus grand multiple de 6 inférieur à 50.",
    explanation: exp(
      "Le reste correspond à ce qui ne rentre pas dans les groupes complets.",
      "On cherche combien de sachets complets de 6 on peut faire.",
      "6 × 8 = 48, puis 50 - 48 = 2.",
      "Il restera 2 letchis."
    ),
    tags: ["cm2", "division", "reste", "reunion", "marche"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Sachets de letchis",
      numbers: ["50", "6"],
      division: {
        dividende: "50",
        diviseur: "6",
        quotient: "8",
        reste: "2",
      },
      questionLabel: "Le reste correspond aux letchis non groupés.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

    // ============================================================
  // DIVISION_PROBLEME
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_division_probleme_fixed_1_partage_simple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Une maîtresse partage 48 cahiers également entre 6 groupes. Combien de cahiers reçoit chaque groupe ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On partage 48 en 6 parts égales.",
    explanation: exp(
      "Un problème de division peut demander de partager une quantité.",
      "On divise le total par le nombre de groupes.",
      "48 ÷ 6 = 8.",
      "Chaque groupe reçoit 8 cahiers."
    ),
    tags: ["cm2", "division", "probleme", "partage"],
  },

  {
    kind: "fixed",
    id: "cm2_division_probleme_fixed_2_groupement_simple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "On range 72 cartes dans des pochettes de 9 cartes. Combien de pochettes peut-on remplir ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On cherche combien de groupes de 9 on peut faire.",
    explanation: exp(
      "Un problème de division peut demander de faire des groupes de même taille.",
      "On divise le nombre total de cartes par le nombre de cartes dans une pochette.",
      "72 ÷ 9 = 8.",
      "On peut remplir 8 pochettes."
    ),
    tags: ["cm2", "division", "probleme", "groupement"],
  },

  {
    kind: "fixed",
    id: "cm2_division_probleme_fixed_3_reunion_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, 64 fruits sont répartis également dans 8 paniers. Combien de fruits y a-t-il dans chaque panier ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On partage 64 fruits en 8 paniers.",
    explanation: exp(
      "La division permet de répartir une quantité en parts égales.",
      "On divise le nombre total de fruits par le nombre de paniers.",
      "64 ÷ 8 = 8.",
      "Il y a 8 fruits dans chaque panier."
    ),
    tags: ["cm2", "division", "probleme", "reunion", "marche", "partage"],
  },

  {
    kind: "fixed",
    id: "cm2_division_probleme_fixed_4_dechets_groupes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Pendant une sortie nature, 96 déchets sont rangés dans des sacs de 12 déchets. Combien de sacs peut-on remplir ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On cherche combien de groupes de 12 on peut faire.",
    explanation: exp(
      "La division peut servir à faire des groupes de même taille.",
      "On divise le nombre total de déchets par le nombre de déchets par sac.",
      "96 ÷ 12 = 8.",
      "On peut remplir 8 sacs."
    ),
    tags: ["cm2", "division", "probleme", "reunion", "dechet", "ecologie"],
  },

  {
    kind: "fixed",
    id: "cm2_division_probleme_fixed_5_jeu_video",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un jeu vidéo, 120 pièces sont partagées également entre 5 joueurs. Combien de pièces reçoit chaque joueur ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "On partage 120 en 5 parts égales.",
    explanation: exp(
      "La division permet de partager une quantité en parts égales.",
      "On divise le nombre total de pièces par le nombre de joueurs.",
      "120 ÷ 5 = 24.",
      "Chaque joueur reçoit 24 pièces."
    ),
    tags: ["cm2", "division", "probleme", "jeu_video", "pieces"],
  },

  {
    kind: "fixed",
    id: "cm2_division_probleme_fixed_6_choisir_operation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Quel calcul permet de résoudre : « 84 élèves sont répartis également dans 7 groupes » ?",
    format: "qcm",
    choices: ["84 ÷ 7", "84 × 7", "84 + 7", "84 - 7"],
    expected: ["84 ÷ 7"],
    comparator: "mcq_exact",
    hint: "Le mot « répartis également » indique une division.",
    explanation: exp(
      "Choisir l’opération dépend du sens du problème.",
      "Quand une quantité est répartie également, on utilise une division.",
      "Le calcul adapté est 84 ÷ 7.",
      "La bonne réponse est 84 ÷ 7."
    ),
    tags: ["cm2", "division", "probleme", "choisir_operation", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_division_probleme_fixed_7_piege_multiplication",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève lit : « 90 images sont rangées par paquets de 10 ». Il calcule 90 × 10. A-t-il choisi la bonne opération ?",
    format: "qcm",
    choices: ["Non : il fallait 90 ÷ 10.", "Oui : on multiplie les images par la taille d’un paquet.", "Non : il fallait 90 − 10."],
    expected: ["Non : il fallait 90 ÷ 10."],
    comparator: "mcq_exact",
    hint: "On cherche combien de paquets de 10 on peut faire.",
    explanation: exp(
      "Il faut choisir l’opération qui correspond à la question.",
      "Quand on cherche combien de groupes on peut faire, on divise.",
      "Il fallait calculer 90 ÷ 10 = 9, et non 90 × 10.",
      "L’élève n’a pas choisi la bonne opération."
    ),
    tags: ["cm2", "division", "probleme", "erreur", "piege", "choisir_operation"],
  },

  {
    kind: "fixed",
    id: "cm2_division_probleme_fixed_8_canvas_partage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "On partage 75 cartes entre 6 élèves. Combien de cartes reçoit chaque élève ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Cherche le quotient. Le reste ne change pas le nombre reçu par chaque élève.",
    explanation: exp(
      "Dans un partage avec reste, le quotient indique ce que chacun reçoit.",
      "On cherche combien de cartes chaque élève peut recevoir.",
      "75 ÷ 6 = 12 reste 3.",
      "Chaque élève reçoit 12 cartes."
    ),
    tags: ["cm2", "division", "probleme", "partage", "reste", "canvas"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Problème de partage",
      numbers: ["75", "6"],
      division: {
        dividende: "75",
        diviseur: "6",
        quotient: "12",
        reste: "3",
      },
      questionLabel: "Chaque élève reçoit le quotient.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

    // ============================================================
  // DIVISION_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_division_defi_fixed_1_tresor_partage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi trésor : 96 pièces sont partagées également entre 8 pirates. Combien de pièces reçoit chaque pirate ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "On partage 96 en 8 parts égales.",
    explanation: exp(
      "Un défi de division peut être une situation de partage.",
      "On divise le nombre total de pièces par le nombre de pirates.",
      "96 ÷ 8 = 12.",
      "Chaque pirate reçoit 12 pièces."
    ),
    tags: ["cm2", "division", "defi", "tresor", "pieces"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Défi trésor",
      numbers: ["96", "8"],
      division: {
        dividende: "96",
        diviseur: "8",
        quotient: "12",
        reste: "0",
      },
      questionLabel: "Chaque pirate reçoit le quotient.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_defi_fixed_2_margouillats",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Défi margouillats : 72 margouillats sont répartis également sur 9 murs. Combien y a-t-il de margouillats par mur ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On partage 72 en 9 parts égales.",
    explanation: exp(
      "La division permet de répartir une quantité en parts égales.",
      "On divise le nombre total de margouillats par le nombre de murs.",
      "72 ÷ 9 = 8.",
      "Il y a 8 margouillats par mur."
    ),
    tags: ["cm2", "division", "defi", "reunion", "margouillat"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Défi margouillats",
      numbers: ["72", "9"],
      division: {
        dividende: "72",
        diviseur: "9",
        quotient: "8",
        reste: "0",
      },
      questionLabel: "On répartit en parts égales.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_defi_fixed_3_requin_groupement",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Défi requin : dans un jeu d’observation marine, 54 points sont rangés par groupes de 6. Combien de groupes complets peut-on faire ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "On cherche combien de groupes de 6 on peut faire.",
    explanation: exp(
      "La division peut servir à faire des groupes de même taille.",
      "On divise le total par la taille d’un groupe.",
      "54 ÷ 6 = 9.",
      "On peut faire 9 groupes complets."
    ),
    tags: ["cm2", "division", "defi", "reunion", "requin", "groupement"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Défi requin",
      numbers: ["54", "6"],
      division: {
        dividende: "54",
        diviseur: "6",
        quotient: "9",
        reste: "0",
      },
      questionLabel: "On cherche le nombre de groupes complets.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_defi_fixed_4_eau_reste",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Défi eau : on veut remplir des bouteilles de 6 L avec 50 L d’eau. Combien de bouteilles complètes peut-on remplir ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On cherche le quotient : le nombre de bouteilles complètes.",
    explanation: exp(
      "Dans une division avec reste, le quotient donne le nombre de groupes complets.",
      "On divise la quantité totale par la contenance d’une bouteille.",
      "50 ÷ 6 = 8 reste 2.",
      "On peut remplir 8 bouteilles complètes."
    ),
    tags: ["cm2", "division", "defi", "reunion", "eau", "reste"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Défi eau",
      numbers: ["50", "6"],
      division: {
        dividende: "50",
        diviseur: "6",
        quotient: "8",
        reste: "2",
      },
      questionLabel: "Le quotient donne les bouteilles complètes.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_defi_fixed_5_voitures",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Défi transport : 35 élèves montent dans des voitures de 4 places. Combien de voitures faut-il prévoir ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "S’il reste des élèves, il faut une voiture de plus.",
    explanation: exp(
      "Le reste doit être interprété selon la situation.",
      "On calcule le nombre de voitures complètes, puis on regarde s’il reste des élèves.",
      "35 ÷ 4 = 8 reste 3. Il faut donc une voiture de plus.",
      "Il faut prévoir 9 voitures."
    ),
    tags: ["cm2", "division", "defi", "reste", "interpretation", "transport"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Défi transport",
      numbers: ["35", "4"],
      division: {
        dividende: "35",
        diviseur: "4",
        quotient: "8",
        reste: "3",
      },
      questionLabel: "Le reste impose une voiture supplémentaire.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_defi_fixed_7_deux_etapes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Défi marché : 96 fruits sont répartis dans 8 paniers. Ensuite, chaque panier est vendu 3 €. Combien rapporte la vente de tous les paniers ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Trouve d’abord le nombre de fruits par panier, puis utilise le prix.",
    explanation: exp(
      "Un défi peut contenir plusieurs étapes.",
      "On commence par la division, puis on répond à la question finale.",
      "96 ÷ 8 = 12 fruits par panier. Mais on demande la vente des paniers : 8 × 3 = 24.",
      "La vente rapporte 24 €."
    ),
    tags: ["cm2", "division", "defi", "reunion", "marche", "deux_etapes"],
  },

  // 14/11/2026 : les gabarits (anciens id gardés + nouveaux), voir plus haut.
  ...GABARITS_REPRIS,
  ...GABARITS_CM2,
];
