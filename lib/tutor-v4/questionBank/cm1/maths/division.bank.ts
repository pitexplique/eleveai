// lib/tutor-v4/question-banks/maths/cm1/division.bank.ts

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
  choix,
  choixN,
  maj,
  objetsEnVrac,
  objetsGroupes,
  pick,
  quelquun,
  rep,
  rint,
  type Prenom,
} from "@/lib/tutor-v4/questionBank/ce2/maths/outils-calcul-ce2";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return melangeEnPlace([...items]);
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

function divisionCanvas(data: {
  dividende: number;
  diviseur: number;
  quotient: number;
  reste?: number;
  title?: string;
  questionLabel?: string;
  showResult?: boolean;
}) {
  return calculPoseCanvas({
    operation: "division",
    title: data.title ?? "Division posée",
    numbers: [String(data.dividende), String(data.diviseur)],
    result: String(data.quotient),
    division: {
      dividende: String(data.dividende),
      diviseur: String(data.diviseur),
      quotient: String(data.quotient),
      reste: String(data.reste ?? 0),
    },
    questionLabel: data.questionLabel,
    display: {
      showResult: data.showResult ?? false,
      showRetenues: false,
    },
  });
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
   DIVISION_SENS et DIVISION_LIEN_MULTIPLICATION — LES GABARITS (14/11/2026)

   ⛔ POURQUOI. Mesuré avec scripts/mesurer-squelettes-coach.ts : 10 et
   5 squelettes, 16 à 18 répétitions sur 20, aucun dessin. Chaque gabarit tire
   maintenant une FAMILLE (prendre la question par un autre bout), une
   SITUATION (28 contextes de vie : métiers, sport, cuisine, jardin, jeux… ;
   le marché de Saint-Pierre n'est plus qu'UN contexte sur 28) et une TOURNURE.

   ⭐ LE VOCABULAIRE EST CELUI DES VIDÉOS branchées sur ces micros
   (manim/voix/bases-multiplication-division*.json) :
   - division_sens ← short « 4 : 12 = 3 ? Le piège de la division » : « une
     division ne se retourne pas », « le grand nombre se partage, il passe en
     premier » → `cm1_division_sens_tpl_piege_ordre_e2` / `_e3`.
   - division_lien_multiplication ← short « 3 × 4 = 12… et deux divisions
     offertes » : 12 billes en 3 rangées de 4, on encadre les rangées, puis les
     colonnes → `cm1_division_lien_tpl_rangees_colonnes_e2`,
     `cm1_division_lien_tpl_deux_divisions_e2`. Et la paysage : « 56 ÷ 8,
     c'est se demander : 8 fois combien font 56 ? », « une famille de
     nombres », lire le tableau (la ligne, le résultat, le haut de la colonne)
     → `cm1_division_lien_tpl_lire_tableau_e3`.

   ⭐ LES DESSINS (Frédéric adore les schémas de billes). Une collection À
   PARTAGER est dessinée EN VRAC (par cinq) : le dessin aide à compter sans
   donner la réponse. Les rangées toutes faites ne sont dessinées que pour une
   multiplication CONNUE (« 3 × 4 = 12 ») : c'est le lien × ↔ ÷. Sinon, un
   schéma en barres, ou le tableau des tables.
   Signe « ÷ » partout, jamais « / ».
========================================================= */

type Q = TutorGeneratedQuestionV4;
type Etoile = 1 | 2 | 3;

/** « de pommes », « d’œufs ». */
const deM = (mot: string) => (/^[aeiouyàâéèêëîïôœ]/i.test(mot) ? `d’${mot}` : `de ${mot}`);

type Nom = { un: string; des: string; fem: boolean };
const nm = (un: string, des: string, fem = false): Nom => ({ un, des, fem });

type Sit = {
  /** « Au goûter » : complément de lieu, en tête de phrase. */
  ou: string;
  /** Ce qu'on partage ou qu'on range. */
  chose: Nom;
  /** Le dessin de la bibliothèque `objets`, s'il existe. */
  dessin?: ObjetId;
  /** Entre qui (ou entre quoi) on partage. */
  qui: Nom;
  /** Le contenant d'un groupement. */
  boite: Nom;
  /** Le métier qui s'en occupe (les maths sont transversales). */
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
  { ou: "À la pâtisserie", chose: nm("cookie", "cookies"), qui: nm("assiette", "assiettes", true), boite: nm("boîte", "boîtes", true), metier: { nom: "Le pâtissier", il: "il" } },
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
  { ou: "Au zoo", chose: nm("carotte", "carottes", true), qui: nm("lapin", "lapins"), boite: nm("seau", "seaux"), metier: { nom: "La soigneuse", il: "elle" } },
  { ou: "Sur le chantier", chose: nm("brique", "briques", true), qui: nm("ouvrier", "ouvriers"), boite: nm("palette", "palettes", true), metier: { nom: "Le maçon", il: "il" } },
  { ou: "À la fête foraine", chose: nm("ticket", "tickets"), qui: nm("enfant", "enfants"), boite: nm("carnet", "carnets") },
];

const sit = () => pick(SITS);
const sitDessinable = () => pick(SITS.filter((s) => s.dessin));
/** « rangés », « rangées » : accord avec la chose. */
const accord = (participe: string, n: Nom) => `${participe}${n.fem ? "e" : ""}s`;
/** « La fermière » → « la fermière », au milieu d'une phrase. */
const minus = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
/** Le lieu, sauf s'il répète le métier (« Chez le primeur, le primeur… »). */
const ouSans = (s: Sit) =>
  s.metier && s.ou.includes(s.metier.nom.split(/[ ’]/).pop()!) ? pick(["Ce matin", "Aujourd’hui", "Pour la journée"]) : s.ou;
/** « chacun », « chacune ». */
const chacun = (n: Nom) => (n.fem ? "chacune" : "chacun");

/**
 * Une fois sur trois, un enfant pose la question (« Défi de Lou : … ») : la
 * même phrase revient moins vite à l'identique.
 */
function habille(text: string): string {
  if (Math.random() < 0.65 || /^Pic /.test(text)) return text;
  const p = quelquun();
  const suite = /^(On|Si|Tu|Une|Un|Quelle|Quel|Combien|Les|Famille|Avec|Complète|Diviser|Pour|Dans|Lis|Que|Comment|Trouve|Partage|Regarde|Au|Aux|À|Chez|Sur|Le|La|L’|Il|Elle)(?=[\s’])/.test(text)
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

/** Une question QCM à réponse numérique (CM1 : zéro clavier). */
function qcmN(text: string, n: number, pieges: readonly number[], explanation: string, canvas?: Q["canvas"]): Q {
  return {
    text: habille(text),
    format: "qcm",
    choices: choixN(n, pieges),
    expected: [rep(n)],
    comparator: "mcq_exact",
    explanation,
    ...(canvas ? { canvas } : {}),
  };
}

/** Une question QCM à réponse en mots ou en calcul. */
function qcmM(text: string, correct: string, pieges: readonly string[], explanation: string, canvas?: Q["canvas"]): Q {
  return {
    text: habille(text),
    format: "qcm",
    choices: choix(correct, pieges),
    expected: [correct],
    comparator: "mcq_exact",
    explanation,
    ...(canvas ? { canvas } : {}),
  };
}

const parfois = <T,>(p: number, f: () => T | undefined): T | undefined => (Math.random() < p ? f() : undefined);

/* ---------------- Les dessins ---------------- */

/** Une collection à partager, en vrac (par 5) : jamais les parts toutes faites. */
const vrac = (s: Sit, total: number): ObjetsCanvasData | undefined =>
  s.dessin && total <= 30 ? objetsEnVrac(s.dessin, total) : undefined;

/** Un groupement à faire : le total, un paquet connu, le nombre de paquets à trouver. */
const barreGroupes = (k: number, total: number, boite: Nom) =>
  barre([[`1 ${boite.un}`, String(k)], ["encore…", null]], String(total), `Combien ${deM(boite.des)} de ${k} dans ${total} ?`);

/** Le dessin d'un partage : en vrac si possible, sinon `n` parts égales inconnues. */
const dessinPartage = (s: Sit, total: number, n: number) => vrac(s, total) ?? barreEgale(n, null, String(total));
/** Le dessin d'un groupement : en vrac si possible, sinon la barre des paquets. */
const dessinGroupement = (s: Sit, total: number, k: number) => vrac(s, total) ?? barreGroupes(k, total, s.boite);

/**
 * Une multiplication CONNUE en rangées : `rangs` rangées de `parRang` objets
 * (le schéma de billes de la vidéo). Le canvas dessine 5 objets au plus par
 * case : on retourne le rectangle si besoin (3 × 7 = 7 × 3).
 */
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
const quoiDessin = (): ObjetId => sitDessinable().dessin!;

/**
 * Le tableau des tables, en morceau (3 lignes × 5 colonnes) : la ligne
 * `ligne`, la case `ligne × colonne` surlignée. `cacher` : l'en-tête de la
 * colonne (on cherche le quotient) ou la case (on cherche le produit).
 * La vidéo : « On va sur la ligne de 6. On avance jusqu'à 42. On remonte en
 * haut de la colonne. »
 */
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

/* ---------------- Les nombres, par étoile ---------------- */

/** [diviseur, quotient] : tables de 2 à 5 (★1), de 3 à 9 (★2), dizaines (★3). */
function nombres(e: Etoile): [number, number] {
  if (e === 1) return [rint(2, 5), rint(2, 9)];
  if (e === 2) return [rint(3, 9), rint(3, 9)];
  return [rint(2, 9), 10 * rint(2, 9)];
}

/** Le calcul d'un partage, expliqué comme dans la vidéo (dizaines à ★3). */
function calculDivision(t: number, n: number, q: number): string {
  if (q >= 10 && q % 10 === 0)
    return `${t} = ${t / 10} dizaines. ${t / 10} ÷ ${n} = ${q / 10}, car ${n} × ${q / 10} = ${t / 10}. Donc ${t} ÷ ${n} = ${q / 10} dizaines = ${q}.`;
  return `${n} fois combien font ${t} ? ${n} × ${q} = ${t}, donc ${t} ÷ ${n} = ${q}.`;
}

/** Les pièges d'un quotient : le diviseur, la soustraction, ±1, et à ★3 le zéro oublié. */
const piegesQuotient = (t: number, n: number, q: number) =>
  q >= 10 ? [q / 10, q * 10, n, t - n, q + 10, q - 10] : [n, t - n, q + 1, q - 1, t + n, q * 2];

/* ---------------- DIVISION_SENS ---------------- */

function textePartage(s: Sit, t: number, n: number, p: Prenom, e: Etoile): string {
  const c = s.chose;
  const q = s.qui;
  const tournures = [
    `${s.ou}, on partage ${t} ${c.des} entre ${n} ${q.des}. Combien ${deM(c.des)} pour chaque ${q.un} ?`,
    `On partage ${t} ${c.des} entre ${n} ${q.des}, à parts égales. Combien pour chaque ${q.un} ?`,
    `${p.nom} partage ${t} ${c.des} entre ${n} ${q.des}. Combien ${deM(c.des)} pour chaque ${q.un} ?`,
    `${t} ${c.des} à partager entre ${n} ${q.des}. Combien ${deM(c.des)} pour chaque ${q.un} ?`,
    `${s.ou}, ${t} ${c.des} sont ${accord("partagé", c)} en ${n} parts égales. Combien ${deM(c.des)} dans chaque part ?`,
    `Partage ${t} ${c.des} en ${n} parts égales. Combien ${deM(c.des)} dans chaque part ?`,
    `${p.nom} a ${t} ${c.des}. ${maj(p.il)} les partage entre ${n} ${q.des}. Combien pour chaque ${q.un} ?`,
    `${s.ou}, il y a ${t} ${c.des} pour ${n} ${q.des}, autant pour ${chacun(q)}. Combien pour chaque ${q.un} ?`,
    `${t} ÷ ${n} : on partage ${t} ${c.des} entre ${n} ${q.des}. Combien pour chaque ${q.un} ?`,
  ];
  if (s.metier) tournures.push(`${s.metier.nom} partage ${t} ${c.des} entre ${n} ${q.des}. Combien ${deM(c.des)} pour chaque ${q.un} ?`);
  if (e === 3 && s.metier)
    tournures.push(
      `${ouSans(s)}, ${minus(s.metier.nom)} a reçu ${t} ${c.des}. ${maj(s.metier.il)} les répartit en parts égales entre ${n} ${q.des}. Combien ${deM(c.des)} pour chaque ${q.un} ?`,
      `${s.metier.nom} doit répartir ${t} ${c.des} entre ${n} ${q.des}, sans en garder. Combien ${deM(c.des)} met-${s.metier.il} pour chaque ${q.un} ?`,
    );
  return pick(tournures);
}

function texteGroupement(s: Sit, t: number, k: number, p: Prenom, e: Etoile): string {
  const c = s.chose;
  const b = s.boite;
  const tournures = [
    `${s.ou}, on range ${t} ${c.des} dans des ${b.des} de ${k}. Combien ${deM(b.des)} remplit-on ?`,
    `${p.nom} met ${k} ${c.des} dans chaque ${b.un}. ${maj(p.il)} a ${t} ${c.des}. Combien ${deM(b.des)} remplit-${p.il} ?`,
    `${t} ${c.des}, ${k} par ${b.un}. Combien ${deM(b.des)} faut-il ?`,
    `Avec ${t} ${c.des}, combien ${deM(b.des)} de ${k} peut-on remplir ?`,
    `${s.ou}, il y a ${t} ${c.des}. On fait des ${b.des} de ${k}. Combien ${deM(b.des)} obtient-on ?`,
    `${p.nom} prépare des ${b.des} de ${k} ${c.des}. ${maj(p.il)} a ${t} ${c.des}. Combien ${deM(b.des)} prépare-t-${p.il} ?`,
    `On range ${t} ${c.des} par ${b.des} de ${k}. Combien de fois ${k} tient-il dans ${t} ?`,
  ];
  if (s.metier) tournures.push(`${s.metier.nom} range ${t} ${c.des} par ${b.des} de ${k}. Combien ${deM(b.des)} remplit-${s.metier.il} ?`);
  if (e === 3 && s.metier)
    tournures.push(
      `${ouSans(s)}, ${minus(s.metier.nom)} reçoit ${t} ${c.des}. ${maj(s.metier.il)} les range par ${b.des} de ${k}, sans en laisser. Combien ${deM(b.des)} lui faut-il ?`,
      `${s.metier.nom} a ${t} ${c.des} à ranger. Dans chaque ${b.un}, ${s.metier.il} en met ${k}. Combien ${deM(b.des)} remplit-${s.metier.il} ?`,
    );
  return pick(tournures);
}

function partageQ(e: Etoile): Q {
  const [n, q] = nombres(e);
  const t = n * q;
  const s = sit();
  return qcmN(
    textePartage(s, t, n, quelquun(), e),
    q,
    piegesQuotient(t, n, q),
    exp(
      "Partager en parts égales, c’est faire une division.",
      `Le nombre qu’on partage passe en premier : on calcule ${t} ÷ ${n}.`,
      calculDivision(t, n, q),
      `Il y a ${q} ${s.chose.des} pour chaque ${s.qui.un}.`,
    ),
    parfois(0.85, () => dessinPartage(s, t, n)),
  );
}

function groupementQ(e: Etoile): Q {
  const [k, q] = nombres(e);
  const t = k * q;
  const s = sit();
  return qcmN(
    texteGroupement(s, t, k, quelquun(), e),
    q,
    piegesQuotient(t, k, q),
    exp(
      "Faire des groupes de même taille et compter les groupes, c’est aussi une division.",
      `On cherche combien de fois ${k} tient dans ${t} : ${t} ÷ ${k}.`,
      calculDivision(t, k, q),
      `On remplit ${q} ${s.boite.des}.`,
    ),
    parfois(0.85, () => dessinGroupement(s, t, k)),
  );
}

/** Quel calcul écrire ? Le grand nombre se partage, il passe en premier. */
function ordreCalculQ(e: Etoile): Q {
  const [n, q] = nombres(e);
  const t = n * q;
  const s = sit();
  const c = s.chose;
  const p = quelquun();
  const groupement = Math.random() < 0.35;
  const text = groupement
    ? pick([
        `On range ${t} ${c.des} par ${s.boite.des} de ${n}. Quelle division donne le nombre ${deM(s.boite.des)} ?`,
        `${p.nom} fait des ${s.boite.des} de ${n} avec ${t} ${c.des}. Quel calcul donne le nombre ${deM(s.boite.des)} ?`,
        `${s.ou}, on met ${n} ${c.des} par ${s.boite.un}. Il y en a ${t}. Quel calcul écrire ?`,
      ])
    : pick([
        `Pour partager ${t} ${c.des} entre ${n} ${s.qui.des}, quel calcul écrit-on ?`,
        `${p.nom} partage ${t} ${c.des} entre ${n} ${s.qui.des}. Quelle division écrit-${p.il} ?`,
        `${s.ou}, on partage ${t} ${c.des} en ${n} parts égales. Quelle division faut-il faire ?`,
        `Quelle division donne la part de chaque ${s.qui.un} : ${t} ${c.des} partagés entre ${n} ${s.qui.des} ?`.replace(
          "partagés",
          accord("partagé", c),
        ),
      ]);
  return qcmM(
    text,
    `${t} ÷ ${n}`,
    [`${n} ÷ ${t}`, `${t} × ${n}`, `${t} − ${n}`, `${t} + ${n}`],
    exp(
      "Dans une division, le nombre qu’on partage s’écrit en premier.",
      "Le grand nombre se partage, il passe en premier : le total, puis « ÷ », puis le nombre de parts (ou la taille d’un groupe).",
      `${t} ÷ ${n} = ${q}. Attention : ${n} ÷ ${t}, ce serait partager ${n} en ${t} parts, ça ne fait pas ${q}.`,
      `On écrit ${t} ÷ ${n}.`,
    ),
    parfois(0.8, () => (groupement ? dessinGroupement(s, t, n) : dessinPartage(s, t, n))),
  );
}

/** Le piège du short : une division ne se retourne pas. */
function piegeOrdreQ(e: Etoile): Q {
  const [b, q] = e === 3 ? [rint(3, 9), rint(4, 12)] : nombres(e);
  const a = b * q;
  const p = quelquun();
  const text = pick([
    `${p.nom} dit : « ${a} ÷ ${b} = ${q}, donc ${b} ÷ ${a} = ${q} aussi. » A-t-${p.il} raison ?`,
    `${a} ÷ ${b} = ${q}. Est-ce que ${b} ÷ ${a} fait aussi ${q} ?`,
    `${p.nom} a écrit ${b} ÷ ${a} = ${q} au lieu de ${a} ÷ ${b} = ${q}. Est-ce pareil ?`,
    `Comme ${a} ÷ ${b} = ${q}, peut-on écrire ${b} ÷ ${a} = ${q} ?`,
    `On peut retourner ${q} × ${b} en ${b} × ${q}. Peut-on retourner ${a} ÷ ${b} en ${b} ÷ ${a} ?`,
    `Pic le paille-en-queue affirme : « ${b} ÷ ${a}, c’est pareil que ${a} ÷ ${b}. » A-t-il raison ?`,
  ]);
  return qcmM(
    text,
    `Non : ${b} ÷ ${a}, c’est partager ${b} en ${a} parts, ça ne fait pas ${q}.`,
    [
      "Oui : on peut échanger les deux nombres, comme dans une multiplication.",
      "Oui : les deux calculs ont les mêmes nombres.",
    ],
    exp(
      "Une multiplication se retourne : " + `${q} × ${b} = ${b} × ${q}. Une division, non.`,
      `${a} ÷ ${b}, c’est ${a} billes partagées en ${b} groupes : ${q} billes dans chaque groupe.`,
      `${b} ÷ ${a}, c’est ${b} billes partagées en ${a} groupes : il n’y a même pas une bille par groupe. Ça ne fait pas ${q}.`,
      "Le grand nombre se partage, il passe en premier.",
    ),
    parfois(0.75, () => barreEgale(b, null, String(a))),
  );
}

/** Quel nombre s'écrit en premier ? */
function grandPremierQ(e: Etoile): Q {
  const [n, q] = nombres(e);
  const t = n * q;
  const s = sit();
  const c = s.chose;
  const p = quelquun();
  return qcmM(
    pick([
      `On partage ${t} ${c.des} entre ${n} ${s.qui.des}. Quel nombre écrit-on en premier dans la division ?`,
      `${p.nom} partage ${t} ${c.des} entre ${n} ${s.qui.des}. Par quel nombre commence sa division ?`,
      `${s.ou}, on partage ${t} ${c.des} en ${n} parts égales. Quel nombre passe en premier ?`,
    ]),
    `${t}, le nombre ${deM(c.des)} à partager`,
    [`${n}, le nombre de parts`, "le plus petit des deux nombres", "peu importe l’ordre"],
    exp(
      "Dans une division, on écrit d’abord ce qu’on partage.",
      "Le grand nombre se partage, il passe en premier.",
      `On écrit ${t} ÷ ${n} = ${q}, et non ${n} ÷ ${t}.`,
      `On commence par ${t}.`,
    ),
    parfois(0.85, () => dessinPartage(s, t, n)),
  );
}

/** Lire le signe ÷. */
function signeQ(e: Etoile): Q {
  const [b, q] = nombres(e);
  const a = b * q;
  const p = quelquun();
  if (Math.random() < 0.6)
    return qcmM(
      pick([
        `Que veut dire ${a} ÷ ${b} ?`,
        `${p.nom} lit « ${a} ÷ ${b} ». Qu’est-ce que ça veut dire ?`,
        `Au tableau, la maîtresse écrit ${a} ÷ ${b}. Que veut dire ce calcul ?`,
        `Sur son ardoise, ${p.nom} écrit ${a} ÷ ${b}. Que veut dire ce calcul ?`,
      ]),
      `partager ${a} en ${b} parts égales`,
      [`partager ${b} en ${a} parts égales`, `ajouter ${a} et ${b}`, `enlever ${b} à ${a}`, `multiplier ${a} par ${b}`],
      exp("Le signe ÷ se lit « divisé par ».", `${a} ÷ ${b}, c’est partager ${a} en ${b} parts égales.`, `${a} ÷ ${b} = ${q}, car ${b} × ${q} = ${a}.`, `${a} ÷ ${b} veut dire partager ${a} en ${b} parts égales.`),
      parfois(0.8, () => barreEgale(b, null, String(a))),
    );
  return qcmM(
    pick([`Comment lit-on ${a} ÷ ${b} ?`, `${p.nom} doit lire « ${a} ÷ ${b} » à voix haute. Que dit-${p.il} ?`, `Comment dit-on ${a} ÷ ${b} en mots ?`]),
    `${a} divisé par ${b}`,
    [`${a} fois ${b}`, `${b} divisé par ${a}`, `${a} moins ${b}`],
    exp("Le signe ÷ se lit « divisé par ».", "On lit le premier nombre, puis « divisé par », puis le second.", `${a} ÷ ${b} se lit « ${a} divisé par ${b} » et vaut ${q}.`, `On dit « ${a} divisé par ${b} ».`),
    parfois(0.6, () => barreEgale(b, null, String(a))),
  );
}

/** Partage ou groupement : que cherche-t-on ? */
function queChercheQ(e: Etoile): Q {
  const [k, q] = nombres(e);
  const t = k * q;
  const s = sit();
  const c = s.chose;
  const p = quelquun();
  if (Math.random() < 0.5) {
    const b = s.boite;
    return qcmM(
      pick([
        `On range ${t} ${c.des} dans des ${b.des} de ${k}. Que cherche-t-on ?`,
        `${p.nom} met ${t} ${c.des} par ${b.des} de ${k}. Quelle question se pose-t-${p.il} ?`,
        `${s.ou}, on fait des ${b.des} de ${k} avec ${t} ${c.des}. Que faut-il trouver ?`,
      ]),
      `combien ${deM(b.des)} on remplit`,
      [`combien ${deM(c.des)} dans chaque ${b.un}`, `combien ${deM(c.des)} il y a en tout`, `combien ${deM(c.des)} il reste`],
      exp("Dans un groupement, on connaît la taille d’un groupe.", `On sait déjà qu’il y a ${k} ${c.des} par ${b.un} : on cherche le nombre ${deM(b.des)}.`, `${t} ÷ ${k} = ${q} ${b.des}.`, `On cherche combien ${deM(b.des)} on remplit.`),
      parfois(0.8, () => dessinGroupement(s, t, k)),
    );
  }
  return qcmM(
    pick([
      `On partage ${t} ${c.des} entre ${k} ${s.qui.des}. Que cherche-t-on ?`,
      `${p.nom} partage ${t} ${c.des} entre ${k} ${s.qui.des}. Quelle question se pose-t-${p.il} ?`,
      `${s.ou}, ${t} ${c.des} sont ${accord("partagé", c)} entre ${k} ${s.qui.des}. Que faut-il trouver ?`,
    ]),
    `combien ${deM(c.des)} pour chaque ${s.qui.un}`,
    [`combien ${deM(s.qui.des)} il y a`, `combien ${deM(c.des)} il y a en tout`, `combien ${deM(c.des)} il reste`],
    exp("Dans un partage, on connaît le nombre de parts.", `On sait déjà qu’il y a ${k} ${s.qui.des} : on cherche la part de ${chacun(s.qui)}.`, `${t} ÷ ${k} = ${q}.`, `On cherche combien ${deM(c.des)} pour chaque ${s.qui.un}.`),
    parfois(0.8, () => dessinPartage(s, t, k)),
  );
}

/** Choisir l'opération : partager (÷), grouper (÷) ou répéter (×). */
function choisirOperationQ(e: Etoile): Q {
  const [n, q] = nombres(e);
  const t = n * q;
  const s = sit();
  const c = s.chose;
  const p = quelquun();
  const question = pick(["Quel calcul faut-il faire ?", "Quelle opération permet de répondre ?", "Quel calcul choisis-tu ?"]);
  const f = rint(1, 3);
  if (f === 1) {
    // Une multiplication : le piège inverse (diviser quand il faut répéter).
    const k = e === 3 ? rint(3, 9) : Math.min(q, 9);
    return qcmM(
      pick([
        `${s.ou}, il y a ${n} ${s.boite.des} de ${k} ${c.des}. On veut le nombre ${deM(c.des)} en tout. ${question}`,
        `${p.nom} remplit ${n} ${s.boite.des} avec ${k} ${c.des} dans chacun. Combien ${deM(c.des)} en tout ? ${question}`.replace(
          "chacun",
          s.boite.fem ? "chacune" : "chacun",
        ),
      ]),
      `${n} × ${k}`,
      [`${n * k} ÷ ${n}`, `${n} + ${k}`, `${k} − ${n}`, `${k} ÷ ${n}`].filter((x) => !/^\d+ − \d+$/.test(x) || k > n),
      exp("On choisit l’opération d’après l’histoire.", `La même quantité (${k}) revient ${n} fois : c’est une multiplication.`, `${n} × ${k} = ${n * k}.`, `Le calcul est ${n} × ${k}.`),
      parfois(0.8, () => (s.dessin && k <= 5 && n <= 6 ? objetsGroupes(s.dessin, n, k) : barreEgale(n, String(k), null))),
    );
  }
  const partage = f === 2;
  return qcmM(
    partage
      ? pick([
          `${s.ou}, on partage ${t} ${c.des} entre ${n} ${s.qui.des}. On cherche la part de ${chacun(s.qui)}. ${question}`,
          `${p.nom} doit partager ${t} ${c.des} entre ${n} ${s.qui.des}. ${question}`,
        ])
      : pick([
          `${s.ou}, on range ${t} ${c.des} par ${s.boite.des} de ${n}. On cherche le nombre ${deM(s.boite.des)}. ${question}`,
          `${p.nom} fait des ${s.boite.des} de ${n} avec ${t} ${c.des}. ${question}`,
        ]),
    `${t} ÷ ${n}`,
    [`${t} × ${n}`, `${t} − ${n}`, `${t} + ${n}`, `${n} ÷ ${t}`],
    exp(
      partage ? "Partager en parts égales, c’est diviser." : "Faire des groupes de même taille et les compter, c’est diviser.",
      "Le grand nombre se partage, il passe en premier.",
      `${t} ÷ ${n} = ${q}.`,
      `Le calcul est ${t} ÷ ${n}.`,
    ),
    parfois(0.8, () => (partage ? dessinPartage(s, t, n) : dessinGroupement(s, t, n))),
  );
}

/** L'erreur d'un élève : il a multiplié, soustrait ou additionné au lieu de diviser. */
function erreurEleveQ(e: Etoile): Q {
  const [n, q] = nombres(e);
  const t = n * q;
  const s = sit();
  const c = s.chose;
  const p = quelquun();
  const op = pick(["÷", "×", "−", "+", "÷"]);
  const calc = op === "÷" ? `${t} ÷ ${n}` : `${t} ${op} ${n}`;
  const text = pick([
    `${p.nom} lit : « ${t} ${c.des} ${accord("partagé", c)} entre ${n} ${s.qui.des} ». ${maj(p.il)} calcule ${calc}. Qu’en penses-tu ?`,
    `Pour partager ${t} ${c.des} entre ${n} ${s.qui.des}, ${p.nom} écrit ${calc}. Est-ce le bon calcul ?`,
    `${s.ou}, il faut partager ${t} ${c.des} entre ${n} ${s.qui.des}. ${p.nom} propose ${calc}. Qu’en penses-tu ?`,
  ]);
  const juste = op === "÷";
  const bonne = juste ? `C’est juste : ${t} ÷ ${n} = ${q}.` : `C’est faux : il fallait ${t} ÷ ${n} = ${q}.`;
  const pieges = juste
    ? [`C’est faux : il fallait ${t} × ${n}.`, `C’est faux : il fallait ${n} ÷ ${t}.`, `C’est faux : il fallait ${t} − ${n}.`]
    : ["C’est juste.", `C’est faux : il fallait ${n} ÷ ${t}.`, ...(op !== "−" ? [`C’est faux : il fallait ${t} − ${n}.`] : [])];
  return qcmM(
    text,
    bonne,
    pieges,
    exp(
      "Partager une quantité entre plusieurs, c’est diviser.",
      "Le grand nombre se partage, il passe en premier : total ÷ nombre de parts.",
      `${t} ÷ ${n} = ${q}${juste ? "." : `, et non ${calc}.`}`,
      juste ? `${p.nom} a choisi le bon calcul.` : `${p.nom} s’est trompé${p.il === "elle" ? "e" : ""} d’opération.`,
    ),
    parfois(0.8, () => dessinPartage(s, t, n)),
  );
}

/* ---------------- DIVISION_LIEN_MULTIPLICATION ---------------- */

/** Deux facteurs différents, de 2 à 9 (★2) ou de 3 à 9 (★3). */
function facteurs(e: Etoile): [number, number] {
  const min = e === 3 ? 3 : 2;
  const a = rint(min, 9);
  let b = rint(min, 9);
  while (b === a) b = rint(min, 9);
  return [a, b];
}

/** Le dessin d'une multiplication connue : les rangées si elles tiennent, sinon la barre. */
const dessinProduit = (a: number, b: number, quoi: ObjetId = quoiDessin()) =>
  rangees(quoi, a, b) ?? barreEgale(a, String(b), String(a * b));

const expLien = (a: number, b: number, conclusion: string, calcul?: string) =>
  exp(
    "Une multiplication, deux divisions : la division cherche le nombre qui manque dans la multiplication.",
    `Les trois nombres ${a}, ${b} et ${a * b} forment une famille. Le plus grand, ${a * b}, passe en premier dans la division.`,
    calcul ?? `${a} × ${b} = ${a * b}, donc ${a * b} ÷ ${b} = ${a} et ${a * b} ÷ ${a} = ${b}.`,
    conclusion,
  );

function onSaitQueQ(e: Etoile): Q {
  const [a, b] = facteurs(e);
  const r = a * b;
  const d = pick([a, b]);
  const q = r / d;
  const p = quelquun();
  const s = sitDessinable();
  const tournures = [
    `On sait que ${a} × ${b} = ${r}. Combien font ${r} ÷ ${d} ?`,
    `${p.nom} connaît ${a} × ${b} = ${r}. Que vaut ${r} ÷ ${d} ?`,
    `${a} × ${b} = ${r}. Alors, ${r} ÷ ${d} = ?`,
    `Si ${a} × ${b} = ${r}, combien font ${r} ÷ ${d} ?`,
    `${p.nom} a écrit ${a} × ${b} = ${r} sur son ardoise. Combien font ${r} ÷ ${d} ?`,
    `Une multiplication, deux divisions : ${a} × ${b} = ${r}. Combien font ${r} ÷ ${d} ?`,
    `Tu connais ${b} × ${a} = ${r}. Combien font ${r} ÷ ${d} ?`,
  ];
  const dessin = rangees(s.dessin!, a, b);
  if (dessin && dessin.consigne === `${a} rangées de ${b}`)
    tournures.push(`${s.ou}, ${p.nom} range ${r} ${s.chose.des} en ${a} rangées de ${b}. Combien font ${r} ÷ ${d} ?`);
  return qcmN(
    pick(tournures),
    q,
    [d, r, r - d, q + 1, q - 1, r + d],
    expLien(a, b, `${r} ÷ ${d} = ${q}.`),
    parfois(0.85, () => dessinProduit(a, b, s.dessin!)),
  );
}

function deuxDivisionsQ(e: Etoile): Q {
  const [a, b] = facteurs(e);
  const r = a * b;
  const p = quelquun();
  const s = sitDessinable();
  const tournures = [
    `${a} × ${b} = ${r}. Quelles sont les deux divisions ?`,
    `Tu connais ${a} × ${b} = ${r}. Quelles divisions connais-tu aussi ?`,
    `${p.nom} sait que ${a} × ${b} = ${r}. Quelles deux divisions en tire-t-${p.il} ?`,
    `Une multiplication, deux divisions. Avec ${a} × ${b} = ${r}, lesquelles ?`,
    `${p.nom} lance un défi : « ${a} fois ${b} égale ${r}. Quelles sont les deux divisions ? »`,
  ];
  const dessin = rangees(s.dessin!, a, b);
  if (dessin && dessin.consigne === `${a} rangées de ${b}`)
    tournures.push(`Avec ${r} ${s.chose.des} en ${a} rangées de ${b}, quelles divisions peut-on écrire ?`);
  return qcmM(
    pick(tournures),
    `${r} ÷ ${b} = ${a} et ${r} ÷ ${a} = ${b}`,
    [
      `${a} ÷ ${r} = ${b} et ${b} ÷ ${r} = ${a}`,
      `${r} ÷ ${a} = ${a} et ${r} ÷ ${b} = ${b}`,
      `${r} − ${a} = ${b} et ${r} − ${b} = ${a}`,
      `${r} ÷ ${b} = ${a} et ${b} ÷ ${a} = ${r}`,
    ],
    expLien(a, b, `Les deux divisions sont ${r} ÷ ${b} = ${a} et ${r} ÷ ${a} = ${b}.`),
    parfois(0.85, () => dessinProduit(a, b, s.dessin!)),
  );
}

function familleQ(e: Etoile): Q {
  const [a, b] = facteurs(e);
  const r = a * b;
  const [x, y] = Math.random() < 0.5 ? [a, b] : [b, a];
  const p = quelquun();
  return qcmM(
    pick([
      `Les nombres ${a}, ${b} et ${r} forment une famille. Quelle division en fait partie ?`,
      `Famille de nombres : ${a}, ${b} et ${r}. Laquelle de ces divisions est juste ?`,
      `${p.nom} écrit la famille ${a}, ${b}, ${r}. Quelle division peut-${p.il} écrire avec ?`,
      `Avec la famille ${a}, ${b} et ${r}, quelle division est juste ?`,
    ]),
    `${r} ÷ ${x} = ${y}`,
    [`${x} ÷ ${r} = ${y}`, `${r} ÷ ${x} = ${x}`, `${y} ÷ ${x} = ${r}`, `${r} ÷ ${y} = ${y}`],
    expLien(a, b, `${r} ÷ ${x} = ${y} fait partie de la famille.`),
    parfois(0.8, () => dessinProduit(a, b)),
  );
}

/** Le schéma de billes du short : on encadre les rangées, puis les colonnes. */
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
  let text: string;
  let q: Q;
  if (f === 1) {
    text = `${debut} On les partage en ${a} groupes : les rangées. Combien ${deM(c.des)} dans chaque groupe ?`;
    q = qcmN(text, b, [a, r, a + b, b + 1, b - 1], expLien(a, b, `${r} ÷ ${a} = ${b} : ${b} ${c.des} dans chaque rangée.`, `On encadre les rangées : ${a} groupes de ${b}. ${r} ÷ ${a} = ${b}. On n’a pas bougé une seule ${c.un}.`));
  } else if (f === 2) {
    text = `${debut} On les partage en ${b} groupes : les colonnes. Combien ${deM(c.des)} dans chaque groupe ?`;
    q = qcmN(text, a, [b, r, a + b, a + 1, a - 1], expLien(a, b, `${r} ÷ ${b} = ${a} : ${a} ${c.des} dans chaque colonne.`, `On encadre les colonnes : ${b} groupes de ${a}. ${r} ÷ ${b} = ${a}. On n’a pas bougé une seule ${c.un}.`));
  } else {
    text = `${debut} On encadre les colonnes. Quelle division montre ce partage ?`;
    q = qcmM(text, `${r} ÷ ${b} = ${a}`, [`${r} ÷ ${a} = ${a}`, `${b} ÷ ${r} = ${a}`, `${r} − ${b} = ${a}`, `${a} ÷ ${b} = ${r}`], expLien(a, b, `La division est ${r} ÷ ${b} = ${a}.`, `Il y a ${b} colonnes de ${a} : ${r} partagés en ${b} groupes, ${a} dans chaque groupe.`));
  }
  // Le dessin est la question : toujours là, rangées exactes (b ≤ 5, a ≤ 6).
  return { ...q, canvas: rangees(s.dessin!, a, b) };
}

/** « 56 ÷ 8, c'est se demander : 8 fois combien font 56 ? » */
function trouTableQ(e: Etoile): Q {
  const b = rint(e === 3 ? 4 : 2, 9);
  const q = rint(e === 3 ? 4 : 2, 9);
  const r = b * q;
  const p = quelquun();
  return qcmN(
    pick([
      `Complète : ${b} × ? = ${r}. Donc ${r} ÷ ${b} = ?`,
      `${r} ÷ ${b} : ${b} fois combien font ${r} ?`,
      `Pour calculer ${r} ÷ ${b}, ${p.nom} se demande : ${b} fois combien font ${r} ? Que trouve-t-${p.il} ?`,
      `Diviser, c’est chercher le nombre qui manque. ${b} × ? = ${r}. Combien font ${r} ÷ ${b} ?`,
      `${r} ÷ ${b} sans poser la division : quel nombre multiplié par ${b} donne ${r} ?`,
      `${p.nom} récite la table de ${b} jusqu’à ${r}. Combien font ${r} ÷ ${b} ?`,
      `Pic le paille-en-queue cherche ${r} ÷ ${b} avec la table de ${b}. Que trouve-t-il ?`,
    ]),
    q,
    [b, q + 1, q - 1, r - b, r + b, q + 2],
    exp(
      `Diviser ${r} par ${b}, c’est se demander : ${b} fois combien font ${r} ?`,
      `On récite la table de ${b} : ${Array.from({ length: q }, (_, i) => b * (i + 1)).join(", ")}. Stop !`,
      `${b} × ${q} = ${r}, donc ${r} ÷ ${b} = ${q}. Et en cadeau : ${r} ÷ ${q} = ${b}.`,
      `${r} ÷ ${b} = ${q}.`,
    ),
    parfois(0.8, () =>
      Math.random() < 0.5 ? tableDesTables(b, q, "colonne", `Ligne de ${b} : où est ${r} ?`) : barreEgale(b, null, String(r)),
    ),
  );
}

function multAideQ(e: Etoile): Q {
  const b = rint(e === 3 ? 4 : 2, 9);
  let q = rint(e === 3 ? 4 : 2, 9);
  while (q === b) q = rint(e === 3 ? 4 : 2, 9);
  const r = b * q;
  const p = quelquun();
  return qcmM(
    pick([
      `Quelle multiplication aide à calculer ${r} ÷ ${b} ?`,
      `${p.nom} veut calculer ${r} ÷ ${b} sans poser la division. Quel résultat de table l’aide ?`,
      `Pour trouver ${r} ÷ ${b}, quelle multiplication faut-il connaître ?`,
      `Quelle ligne de la table de ${b} donne ${r} ÷ ${b} ?`,
    ]),
    `${b} × ${q} = ${r}`,
    [`${r} × ${b} = ${r * b}`, `${b} + ${q} = ${b + q}`, `${b} × ${q + 1} = ${b * (q + 1)}`, `${b} × ${b} = ${b * b}`],
    exp(
      "Pour diviser, on cherche dans la table du diviseur.",
      `${r} ÷ ${b}, c’est se demander : ${b} fois combien font ${r} ?`,
      `${b} × ${q} = ${r}, donc ${r} ÷ ${b} = ${q}.`,
      `La multiplication utile est ${b} × ${q} = ${r}.`,
    ),
    parfois(0.75, () => tableDesTables(b, q, "colonne")),
  );
}

function combienDeFoisQ(e: Etoile): Q {
  const b = rint(e === 3 ? 4 : 2, 9);
  const q = rint(e === 3 ? 4 : 2, 9);
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
      `Combien de fois faut-il ${b} pour faire ${r} ? Pense à ${b} × ? = ${r}.`,
    ]),
    q,
    [b, q + 1, q - 1, r - b, r + b, q + 2],
    exp(
      "Chercher combien de fois un nombre tient dans un autre, c’est diviser.",
      `On cherche dans la table de ${b} : ${b} × ? = ${r}.`,
      `${b} × ${q} = ${r}, donc ${b} tient ${q} fois dans ${r} : ${r} ÷ ${b} = ${q}.`,
      `${b} tient ${q} fois dans ${r}.`,
    ),
    parfois(0.75, () => vrac(s, r) ?? barreGroupes(b, r, nm("groupe", "groupes"))),
  );
}

function verifierQ(): Q {
  const b = rint(3, 9);
  let q = rint(3, 9);
  while (q === b) q = rint(3, 9);
  const r = b * q;
  const p = quelquun();
  return qcmM(
    pick([
      `Quelle multiplication vérifie que ${r} ÷ ${b} = ${q} ?`,
      `${p.nom} trouve ${r} ÷ ${b} = ${q}. Quel calcul permet de vérifier ?`,
      `Pour être sûr que ${r} ÷ ${b} = ${q}, quel calcul fait-on ?`,
      `${p.nom} veut vérifier sa division : ${r} ÷ ${b} = ${q}. Que calcule-t-${p.il} ?`,
    ]),
    `${b} × ${q} = ${r}`,
    [`${r} × ${b} = ${r * b}`, `${r} − ${b} = ${r - b}`, `${q} + ${b} = ${q + b}`, `${r} × ${q} = ${r * q}`],
    exp(
      "Une division se vérifie avec une multiplication.",
      "On multiplie le diviseur par le résultat : on doit retrouver le nombre de départ.",
      `${b} × ${q} = ${r} : c’est bien le nombre de départ.`,
      `On vérifie avec ${b} × ${q} = ${r}.`,
    ),
    parfois(0.8, () => barreEgale(b, String(q), String(r))),
  );
}

function vraiFauxLienQ(): Q {
  const [a, b] = facteurs(3);
  const r = a * b;
  const p = quelquun();
  const cas = rint(1, 3);
  const affirm = cas === 1 ? `${r} ÷ ${a} = ${b}` : cas === 2 ? `${a} ÷ ${r} = ${b}` : `${r} ÷ ${a} = ${a}`;
  const text = pick([
    `${p.nom} dit : « Comme ${a} × ${b} = ${r}, alors ${affirm}. » A-t-${p.il} raison ?`,
    `Sur son cahier, ${p.nom} écrit : « ${a} × ${b} = ${r}, donc ${affirm} ». Est-ce juste ?`,
    `${a} × ${b} = ${r}. Pic le paille-en-queue en déduit ${affirm}. A-t-il raison ?`,
  ]);
  const [bonne, pieges] =
    cas === 1
      ? [`Oui : ${a} × ${b} = ${r}, donc ${r} ÷ ${a} = ${b}.`, ["Non : il faut poser la division pour le savoir.", "Non : une multiplication ne dit rien sur une division."]]
      : cas === 2
        ? [`Non : c’est ${r} ÷ ${a} = ${b}, le grand nombre passe en premier.`, ["Oui : on peut écrire les nombres dans n’importe quel ordre.", "Oui : c’est la même famille de nombres."]]
        : [`Non : ${r} ÷ ${a} = ${b}, et non ${a}.`, ["Oui : c’est la même famille de nombres.", `Oui : car ${a} × ${b} = ${r}.`]];
  return qcmM(text, bonne, pieges, expLien(a, b, cas === 1 ? "L’affirmation est juste." : `L’affirmation est fausse : ${r} ÷ ${a} = ${b}.`), parfois(0.75, () => dessinProduit(a, b)));
}

/** La paysage : lire une division dans le tableau des tables. */
function lireTableauQ(): Q {
  const a = rint(3, 9);
  let b = rint(3, 9);
  while (b === a) b = rint(3, 9);
  const r = a * b;
  const p = quelquun();
  if (Math.random() < 0.7)
    return qcmN(
      pick([
        `Lis le tableau : ligne de ${a}, on avance jusqu’à ${r}. Combien font ${r} ÷ ${a} ?`,
        `${p.nom} cherche ${r} ÷ ${a} dans le tableau des tables. Quel nombre trouve-t-${p.il} en haut de la colonne ?`,
        `Dans le tableau, ${r} est sur la ligne de ${a}. Combien font ${r} ÷ ${a} ?`,
        `${r} ÷ ${a} : va sur la ligne de ${a}, trouve ${r}, remonte en haut de la colonne. Quel nombre ?`,
      ]),
      b,
      [a, b + 1, b - 1, r - a, r + a],
      exp(
        "Le tableau des tables se lit aussi pour diviser.",
        `On va sur la ligne de ${a}, on avance jusqu’à ${r}, on remonte en haut de la colonne.`,
        `${a} × ${b} = ${r}, donc ${r} ÷ ${a} = ${b}. Et en même temps, ${r} ÷ ${b} = ${a}.`,
        `${r} ÷ ${a} = ${b}.`,
      ),
      tableDesTables(a, b, "colonne", `Ligne de ${a} : ${r}. En haut de la colonne ?`),
    );
  return qcmN(
    pick([
      `Dans le tableau, ${r} est sur la ligne de ${a}, dans la colonne de ${b}. Combien font ${r} ÷ ${b} ?`,
      `Le tableau donne ${r} ÷ ${a} = ${b}. Quelle est la deuxième division offerte : ${r} ÷ ${b} = ?`,
      `${p.nom} lit ${a} × ${b} = ${r} dans le tableau. Combien font ${r} ÷ ${b} ?`,
    ]),
    a,
    [b, a + 1, a - 1, r - b, r + b],
    exp(
      "Une case du tableau donne une multiplication… et deux divisions.",
      `La case ${r} est sur la ligne de ${a} et dans la colonne de ${b}.`,
      `${a} × ${b} = ${r}, donc ${r} ÷ ${b} = ${a} et ${r} ÷ ${a} = ${b}.`,
      `${r} ÷ ${b} = ${a}.`,
    ),
    tableDesTables(a, b, "case", `La case surlignée vaut ${r}.`),
  );
}

/** Le texte de CE2 : « 7 × 13 = 91, donc 91 ÷ 7 = 13 et 91 ÷ 13 = 7 ». */
function grandsFacteursQ(): Q {
  const a = rint(2, 9);
  const b = Math.random() < 0.5 ? rint(11, 25) : 10 * rint(2, 9);
  const r = a * b;
  const p = quelquun();
  const s = sit();
  const parA = Math.random() < 0.65;
  const d = parA ? a : b;
  const q = r / d;
  const tournures = [
    `On sait que ${a} × ${b} = ${r}. Combien font ${r} ÷ ${d} ?`,
    `${p.nom} a calculé ${a} × ${b} = ${r}. Sans poser de division, combien font ${r} ÷ ${d} ?`,
    `${a} × ${b} = ${r}. Quelle est la division offerte : ${r} ÷ ${d} = ?`,
  ];
  if (parA && s.metier)
    tournures.push(
      `${s.metier.nom} sait que ${a} × ${b} = ${r}. ${maj(s.metier.il)} partage ${r} ${s.chose.des} entre ${a} ${s.qui.des}. Combien pour chaque ${s.qui.un} ?`,
    );
  return qcmN(
    pick(tournures),
    q,
    [d, r - d, q + 1, q - 1, q + 10, r + d],
    expLien(a, b, `${r} ÷ ${d} = ${q}.`),
    parfois(0.75, () => barreEgale(d, null, String(r))),
  );
}

function intrusQ(): Q {
  const [a, b] = facteurs(3);
  const r = a * b;
  const p = quelquun();
  const faux = Math.random() < 0.5 ? `${a} ÷ ${r} = ${b}` : `${b} ÷ ${r} = ${a}`;
  return qcmM(
    pick([
      `Quelle égalité ne vient PAS de ${a} × ${b} = ${r} ?`,
      `${p.nom} écrit la famille de ${a} × ${b} = ${r}. Quelle égalité est fausse ?`,
      `On sait que ${a} × ${b} = ${r}. Une seule de ces égalités est fausse. Laquelle ?`,
      `Trouve l’intrus dans la famille de ${a} × ${b} = ${r}.`,
    ]),
    faux,
    [`${r} ÷ ${a} = ${b}`, `${r} ÷ ${b} = ${a}`, `${b} × ${a} = ${r}`],
    expLien(a, b, `L’intrus est ${faux} : une division ne se retourne pas, le grand nombre passe en premier.`),
    parfois(0.75, () => dessinProduit(a, b)),
  );
}

function problemeLienQ(): Q {
  const [a, b] = facteurs(3);
  const r = a * b;
  const s = sit();
  const c = s.chose;
  const p = quelquun();
  const groupement = Math.random() < 0.5;
  const qui = s.metier
    ? { nom: s.metier.nom, milieu: minus(s.metier.nom), il: s.metier.il }
    : { nom: p.nom, milieu: p.nom, il: p.il };
  const text = groupement
    ? pick([
        `${ouSans(s)}, ${qui.milieu} sait que ${a} × ${b} = ${r}. ${maj(qui.il)} range ${r} ${c.des} par ${s.boite.des} de ${b}. Combien ${deM(s.boite.des)} remplit-${qui.il} ?`,
        `${qui.nom} a ${r} ${c.des} et en met ${b} par ${s.boite.un}. ${maj(qui.il)} connaît ${a} × ${b} = ${r}. Combien ${deM(s.boite.des)} ?`,
      ])
    : pick([
        `${ouSans(s)}, ${qui.milieu} sait que ${a} × ${b} = ${r}. ${maj(qui.il)} partage ${r} ${c.des} entre ${a} ${s.qui.des}. Combien pour chaque ${s.qui.un} ?`,
        `${qui.nom} partage ${r} ${c.des} entre ${a} ${s.qui.des}. ${maj(qui.il)} pense à ${a} × ${b} = ${r}. Combien pour chaque ${s.qui.un} ?`,
      ]);
  const rep_ = groupement ? a : b;
  const autre = groupement ? b : a;
  return qcmN(
    text,
    rep_,
    [autre, r, r - autre, rep_ + 1, rep_ - 1],
    expLien(a, b, groupement ? `On remplit ${a} ${s.boite.des}.` : `Il y a ${b} ${c.des} pour chaque ${s.qui.un}.`, `${a} × ${b} = ${r}, donc ${r} ÷ ${autre} = ${rep_}.`),
    parfois(0.8, () => (groupement ? dessinGroupement(s, r, b) : dessinPartage(s, r, a))),
  );
}

/* ---------------- L'installation ---------------- */

function gab(id: string, microId: string, difficulty: Etoile, hint: string, tags: string[], generate: () => Q): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm1", "division", ...tags, "template"],
    generate,
  } as TutorBankItemV4;
}

const S = "division_sens";
const L = "division_lien_multiplication";

const GABARITS_SENS_LIEN: TutorBankItemV4[] = [
  // DIVISION_SENS ★1 : partager, grouper, lire « ÷ », le grand nombre en premier.
  gab("cm1_division_sens_tpl_partage_e1", S, 1, "Partager en parts égales, c’est diviser.", ["sens", "partage"], () => partageQ(1)),
  gab("cm1_division_sens_tpl_groupement_e1", S, 1, "Combien de fois le petit nombre tient-il dans le grand ?", ["sens", "groupements"], () => groupementQ(1)),
  gab("cm1_division_sens_tpl_ordre_calcul_e1", S, 1, "Le grand nombre se partage, il passe en premier.", ["sens", "choisir_operation"], () => ordreCalculQ(1)),
  gab("cm1_division_sens_tpl_grand_premier_e1", S, 1, "Qu’est-ce qu’on partage ? C’est lui qui s’écrit d’abord.", ["sens", "ordre"], () => grandPremierQ(1)),
  gab("cm1_division_sens_tpl_signe_e1", S, 1, "Le signe ÷ se lit « divisé par ».", ["sens", "symbole"], () => signeQ(1)),
  // DIVISION_SENS ★2 : le piège du short, partage ou groupement, l'erreur d'opération.
  gab("cm1_division_sens_tpl_piege_ordre_e2", S, 2, "Une multiplication se retourne, une division non.", ["sens", "piege", "ordre"], () => piegeOrdreQ(2)),
  gab("cm1_division_sens_tpl_que_cherche_e2", S, 2, "Connaît-on le nombre de parts, ou la taille d’un groupe ?", ["sens", "partage", "groupements"], () => queChercheQ(2)),
  gab("cm1_division_sens_tpl_choisir_operation_e2", S, 2, "Partager ou grouper : ÷. Répéter la même quantité : ×.", ["sens", "choisir_operation"], () => choisirOperationQ(2)),
  gab("cm1_division_sens_tpl_erreur_e2", S, 2, "Partager, c’est diviser : total ÷ nombre de parts.", ["sens", "erreur"], () => erreurEleveQ(2)),
  gab("cm1_division_sens_tpl_ordre_calcul_e2", S, 2, "Le grand nombre se partage, il passe en premier.", ["sens", "choisir_operation"], () => ordreCalculQ(2)),
  // DIVISION_SENS ★3 : les dizaines (240 ÷ 6), les mêmes questions avec de plus grands nombres.
  gab("cm1_division_sens_tpl_partage_e3", S, 3, "Pense en dizaines : 240, c’est 24 dizaines.", ["sens", "partage", "dizaines"], () => partageQ(3)),
  gab("cm1_division_sens_tpl_groupement_e3", S, 3, "Pense en dizaines : combien de fois le petit nombre tient-il ?", ["sens", "groupements", "dizaines"], () => groupementQ(3)),
  gab("cm1_division_sens_tpl_piege_ordre_e3", S, 3, "Une multiplication se retourne, une division non.", ["sens", "piege", "ordre"], () => piegeOrdreQ(3)),
  gab("cm1_division_sens_tpl_erreur_e3", S, 3, "Partager, c’est diviser : total ÷ nombre de parts.", ["sens", "erreur"], () => erreurEleveQ(3)),
  gab("cm1_division_sens_tpl_choisir_operation_e3", S, 3, "Partager ou grouper : ÷. Répéter la même quantité : ×.", ["sens", "choisir_operation"], () => choisirOperationQ(3)),
  gab("cm1_division_sens_tpl_que_cherche_e3", S, 3, "Connaît-on le nombre de parts, ou la taille d’un groupe ?", ["sens", "partage", "groupements"], () => queChercheQ(3)),

  // DIVISION_LIEN_MULTIPLICATION ★2 : une multiplication, deux divisions.
  gab("cm1_division_lien_tpl_on_sait_que_e2", L, 2, "La multiplication donne la division toute faite.", ["lien_multiplication"], () => onSaitQueQ(2)),
  gab("cm1_division_lien_tpl_deux_divisions_e2", L, 2, "Une multiplication, deux divisions : le grand nombre passe en premier.", ["lien_multiplication", "famille"], () => deuxDivisionsQ(2)),
  gab("cm1_division_lien_tpl_famille_e2", L, 2, "Le plus grand nombre de la famille s’écrit en premier.", ["lien_multiplication", "famille"], () => familleQ(2)),
  gab("cm1_division_lien_tpl_rangees_colonnes_e2", L, 2, "Encadre les rangées, puis les colonnes : on n’a pas bougé une seule bille.", ["lien_multiplication", "billes", "canvas"], rangeesColonnesQ),
  gab("cm1_division_lien_tpl_trou_e2", L, 2, "Diviser, c’est chercher le nombre qui manque.", ["lien_multiplication", "table"], () => trouTableQ(2)),
  gab("cm1_division_lien_tpl_mult_aide_e2", L, 2, "Cherche dans la table du diviseur.", ["lien_multiplication", "qcm"], () => multAideQ(2)),
  gab("cm1_division_lien_tpl_verifier_e2", L, 2, "On multiplie le diviseur par le résultat.", ["lien_multiplication", "verification"], verifierQ),
  gab("cm1_division_lien_tpl_combien_de_fois_e2", L, 2, "Compte de tant en tant jusqu’au total.", ["lien_multiplication"], () => combienDeFoisQ(2)),
  // DIVISION_LIEN_MULTIPLICATION ★3 : vérifier, lire le tableau, l'intrus, les grands facteurs.
  gab("cm1_division_lien_tpl_verifier_e3", L, 3, "On multiplie le diviseur par le résultat.", ["lien_multiplication", "verification"], verifierQ),
  gab("cm1_division_lien_tpl_vrai_faux_e3", L, 3, "Le grand nombre passe en premier.", ["lien_multiplication", "erreur"], vraiFauxLienQ),
  gab("cm1_division_lien_tpl_lire_tableau_e3", L, 3, "La ligne, le résultat, puis le haut de la colonne.", ["lien_multiplication", "tableau", "canvas"], lireTableauQ),
  gab("cm1_division_lien_tpl_grands_facteurs_e3", L, 3, "Une multiplication connue donne deux divisions, même avec de grands nombres.", ["lien_multiplication"], grandsFacteursQ),
  gab("cm1_division_lien_tpl_intrus_e3", L, 3, "Une division ne se retourne pas.", ["lien_multiplication", "famille"], intrusQ),
  gab("cm1_division_lien_tpl_probleme_e3", L, 3, "Quelle multiplication connue cache la réponse ?", ["lien_multiplication", "probleme"], problemeLienQ),
  gab("cm1_division_lien_tpl_deux_divisions_e3", L, 3, "Une multiplication, deux divisions.", ["lien_multiplication", "famille"], () => deuxDivisionsQ(3)),
  gab("cm1_division_lien_tpl_mult_aide_e3", L, 3, "Cherche dans la table du diviseur.", ["lien_multiplication", "qcm"], () => multAideQ(3)),
];

export const divisionBank: TutorBankItemV4[] = [
  // ============================================================
  // DIVISION_SENS
  // Comprendre le sens de la division
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_sens_fixed_1_partage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 1,
    theme: "neutral",
    text: "On partage 12 billes entre 3 enfants. Combien chaque enfant reçoit-il de billes ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Partager en parts égales, c’est utiliser une division.",
    explanation: exp(
      "Une division peut servir à partager une quantité en parts égales.",
      "On cherche combien reçoit chaque enfant.",
      "12 ÷ 3 = 4.",
      "Chaque enfant reçoit 4 billes."
    ),
    tags: ["cm1", "division", "sens", "partage"],
  },

  {
    kind: "fixed",
    id: "cm1_division_sens_fixed_2_groupements",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 1,
    theme: "neutral",
    text: "On range 20 crayons dans des boîtes de 5 crayons. Combien de boîtes peut-on remplir ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Cherche combien de groupes de 5 on peut faire avec 20.",
    explanation: exp(
      "Une division peut aussi servir à faire des groupes de même taille.",
      "On cherche combien de groupes de 5 sont contenus dans 20.",
      "20 ÷ 5 = 4.",
      "On peut remplir 4 boîtes."
    ),
    tags: ["cm1", "division", "sens", "groupements"],
  },

  {
    kind: "fixed",
    id: "cm1_division_sens_fixed_3_qcm_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle opération correspond à : « partager 24 bonbons entre 6 enfants » ?",
    format: "qcm",
    choices: ["24 ÷ 6", "24 × 6", "24 + 6", "24 - 6"],
    expected: ["24 ÷ 6"],
    comparator: "mcq_exact",
    hint: "Le mot partager indique souvent une division.",
    explanation: exp(
      "Choisir une opération demande de comprendre le sens de la situation.",
      "Quand on partage en parts égales, on utilise une division.",
      "Partager 24 entre 6 correspond à 24 ÷ 6.",
      "L’opération correcte est 24 ÷ 6."
    ),
    tags: ["cm1", "division", "sens", "choisir_operation", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_division_sens_fixed_4_erreur_multiplication",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève lit : « 30 cartes sont partagées entre 5 joueurs ». Il calcule 30 × 5. A-t-il choisi la bonne opération ?",
    format: "qcm",
    choices: [
      "Non : il fallait 30 ÷ 5.",
      "Oui : on multiplie le nombre de cartes par le nombre de joueurs.",
      "Non : il fallait 30 − 5.",
    ],
    expected: ["Non : il fallait 30 ÷ 5."],
    comparator: "mcq_exact",
    hint: "On partage les cartes, on ne les répète pas 5 fois.",
    explanation: exp(
      "Il faut choisir l’opération qui correspond à l’histoire.",
      "Partager une quantité entre plusieurs personnes correspond à une division.",
      "Il fallait calculer 30 ÷ 5 = 6, et non 30 × 5.",
      "L’élève n’a pas choisi la bonne opération."
    ),
    tags: ["cm1", "division", "sens", "erreur", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_division_sens_tpl_1_partage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "neutral",
    hint: "On partage en parts égales.",
    tags: ["cm1", "division", "sens", "partage", "template"],
    // 14/11/2026 : une phrase figée (« … cartes entre … enfants ») devenue
    // 28 situations × 9 à 12 tournures, avec son dessin.
    generate: () => partageQ(2),
  },

  {
    kind: "template",
    id: "cm1_division_sens_tpl_2_groupements",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "neutral",
    hint: "On cherche combien de groupes complets on peut faire.",
    tags: ["cm1", "division", "sens", "groupements", "template"],
    // 14/11/2026 : « au marché de Saint-Pierre, … letchis » servi à chaque
    // fois ; c'est maintenant UN contexte parmi 28 (La Réunion ≈ 4 %).
    generate: () => groupementQ(2),
  },

  // ============================================================
  // DIVISION_LIEN_MULTIPLICATION
  // Associer multiplication et division
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_lien_fixed_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Si 6 × 4 = 24, alors combien vaut 24 ÷ 6 ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "La division permet de retrouver un facteur.",
    explanation: exp(
      "Multiplication et division sont liées.",
      "Si 6 × 4 = 24, alors 24 partagé en groupes de 6 donne 4 groupes.",
      "24 ÷ 6 = 4.",
      "La réponse est 4."
    ),
    tags: ["cm1", "division", "lien_multiplication"],
  },

  {
    kind: "fixed",
    id: "cm1_division_lien_fixed_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul peut aider à trouver 56 ÷ 8 ?",
    format: "qcm",
    choices: ["8 × ? = 56", "56 × 8", "56 + 8", "56 - 8"],
    expected: ["8 × ? = 56"],
    comparator: "mcq_exact",
    hint: "Pour diviser, on peut chercher une multiplication à trou.",
    explanation: exp(
      "Une division peut être transformée en multiplication à trou.",
      "Pour calculer 56 ÷ 8, on cherche quel nombre multiplié par 8 donne 56.",
      "8 × 7 = 56.",
      "Le calcul utile est 8 × ? = 56."
    ),
    tags: ["cm1", "division", "lien_multiplication", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_division_lien_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : 7 × ? = 63. Donc 63 ÷ 7 = ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 7 ou de 9.",
    explanation: exp(
      "La multiplication à trou aide à calculer une division.",
      "On cherche le facteur manquant.",
      "7 × 9 = 63, donc 63 ÷ 7 = 9.",
      "La réponse est 9."
    ),
    tags: ["cm1", "division", "lien_multiplication", "table"],
  },

  {
    kind: "fixed",
    id: "cm1_division_lien_fixed_4_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « comme 8 × 6 = 48, alors 48 ÷ 8 = 6 ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "Oui : une multiplication donne deux divisions.",
      "Non : il faut poser la division pour le savoir.",
      "Non : c’est 8 ÷ 48 = 6.",
    ],
    expected: ["Oui : une multiplication donne deux divisions."],
    comparator: "mcq_exact",
    hint: "Vérifie le lien entre multiplication et division.",
    explanation: exp(
      "Une multiplication permet de vérifier une division.",
      "Si 8 × 6 = 48, alors 48 contient 6 groupes de 8.",
      "48 ÷ 8 = 6.",
      "L’élève a raison."
    ),
    tags: ["cm1", "division", "lien_multiplication", "verification", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_division_lien_tpl_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    hint: "Transforme la division en multiplication à trou.",
    tags: ["cm1", "division", "lien_multiplication", "template"],
    // 14/11/2026 : la tournure unique « Complète : … » devenue sept tournures
    // (« 8 fois combien font 56 ? », la vidéo), avec le tableau des tables.
    generate: () => trouTableQ(3),
  },

  // ============================================================
  // DIVISION_POSEE
  // Poser une division simple
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_posee_fixed_1_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une division posée, que cherche-t-on principalement ?",
    format: "qcm",
    choices: [
      "combien de fois le diviseur est contenu dans le dividende",
      "combien vaut la somme des deux nombres",
      "combien vaut le produit des deux nombres",
      "combien de chiffres contient le diviseur",
    ],
    expected: ["combien de fois le diviseur est contenu dans le dividende"],
    comparator: "mcq_exact",
    hint: "Diviser, c’est chercher combien de groupes égaux on peut faire.",
    explanation: exp(
      "Une division permet de partager ou de faire des groupes égaux.",
      "Dans une division posée, on cherche combien de fois le diviseur est contenu dans le dividende.",
      "Par exemple, 56 ÷ 7 revient à chercher combien de fois 7 est contenu dans 56.",
      "On cherche donc un quotient."
    ),
    canvas: divisionCanvas({
      dividende: 56,
      diviseur: 7,
      quotient: 8,
      title: "Division posée",
      questionLabel: "Observe : on cherche combien de groupes de 7 sont contenus dans 56.",
      showResult: false,
    }),
    tags: ["cm1", "division", "posee", "methode", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_posee_fixed_2_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 84 ÷ 4",
    format: "short",
    expected: ["21"],
    comparator: "number_equal",
    hint: "Tu peux chercher combien de fois 4 est contenu dans 84.",
    explanation: exp(
      "Une division posée aide à organiser le calcul.",
      "On cherche combien de groupes de 4 sont contenus dans 84.",
      "84 ÷ 4 = 21.",
      "Le quotient est 21."
    ),
    canvas: divisionCanvas({
      dividende: 84,
      diviseur: 4,
      quotient: 21,
      title: "Division posée",
      questionLabel: "Calcule le quotient.",
      showResult: false,
    }),
    tags: ["cm1", "division", "posee", "simple", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_posee_fixed_3_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 96 ÷ 6",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "Cherche combien de groupes de 6 on peut faire.",
    explanation: exp(
      "Une division posée permet de calculer étape par étape.",
      "On cherche combien de fois 6 est contenu dans 96.",
      "96 ÷ 6 = 16.",
      "Le quotient est 16."
    ),
    canvas: divisionCanvas({
      dividende: 96,
      diviseur: 6,
      quotient: 16,
      title: "Division posée",
      questionLabel: "Calcule le quotient.",
      showResult: false,
    }),
    tags: ["cm1", "division", "posee", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_posee_fixed_4_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 72 ÷ 8 = 8. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie avec une multiplication.",
    explanation: exp(
      "On peut vérifier une division avec une multiplication.",
      "Si 72 ÷ 8 valait 8, alors 8 × 8 devrait faire 72.",
      "8 × 8 = 64, mais 8 × 9 = 72.",
      "L’élève n’a pas raison : 72 ÷ 8 = 9."
    ),
    canvas: divisionCanvas({
      dividende: 72,
      diviseur: 8,
      quotient: 9,
      title: "Vérifier une division",
      questionLabel: "Vérifie avec une multiplication.",
      showResult: false,
    }),
    tags: ["cm1", "division", "posee", "verification", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "cm1_division_posee_tpl_1_exacte",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise les tables pour trouver le quotient.",
    tags: ["cm1", "division", "posee", "exacte", "template", "canvas"],
    generate: () => {
      const diviseur = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const quotient = randomChoice([11, 12, 13, 14, 15, 16, 18, 20]);
      const dividende = diviseur * quotient;

      return {
        text: `Calcule : ${dividende} ÷ ${diviseur}`,
        format: "short",
        expected: [String(quotient)],
        comparator: "number_equal",
        explanation: exp(
          "Une division exacte donne un reste égal à 0.",
          "On cherche combien de fois le diviseur est contenu dans le dividende.",
          `${dividende} ÷ ${diviseur} = ${quotient}.`,
          `Le quotient est ${quotient}.`
        ),
        canvas: divisionCanvas({
          dividende,
          diviseur,
          quotient,
          title: "Division posée",
          questionLabel: "Calcule le quotient.",
          showResult: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_division_posee_tpl_2_qcm_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie avec la multiplication inverse.",
    tags: ["cm1", "division", "posee", "erreur", "template", "qcm", "canvas"],
    generate: () => {
      const diviseur = randomChoice([4, 5, 6, 7, 8, 9]);
      const quotient = randomChoice([8, 9, 10, 11, 12]);
      const dividende = diviseur * quotient;
      const wrong = quotient + randomChoice([-2, -1, 1, 2]);

      return {
        text: `Un élève affirme que ${dividende} ÷ ${diviseur} = ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "On peut vérifier une division avec une multiplication.",
          "On multiplie le diviseur par le quotient annoncé.",
          `${diviseur} × ${quotient} = ${dividende}, donc ${dividende} ÷ ${diviseur} = ${quotient}, et non ${wrong}.`,
          "L’élève n’a pas raison."
        ),
        canvas: divisionCanvas({
          dividende,
          diviseur,
          quotient,
          title: "Vérifier une division",
          questionLabel: "Le quotient annoncé est-il correct ?",
          showResult: false,
        }),
      };
    },
  },

  // ============================================================
  // DIVISION_RESTE
  // Interpréter le reste d’une division
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_reste_fixed_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 3,
    theme: "neutral",
    text: "On range 26 crayons dans des boîtes de 5. Combien de crayons restent sans boîte complète ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "5 × 5 = 25, il reste ensuite 1.",
    explanation: exp(
      "Dans une division, le reste est ce qui n’a pas pu former un groupe complet.",
      "On cherche le plus grand multiple de 5 inférieur ou égal à 26.",
      "5 × 5 = 25, et 26 - 25 = 1.",
      "Il reste 1 crayon."
    ),
    canvas: divisionCanvas({
      dividende: 26,
      diviseur: 5,
      quotient: 5,
      reste: 1,
      title: "Division avec reste",
      questionLabel: "Combien reste-t-il après les groupes complets ?",
      showResult: false,
    }),
    tags: ["cm1", "division", "reste", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_reste_fixed_2_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 3,
    theme: "neutral",
    text: "Dans la division 38 ÷ 6, quel est le reste ?",
    format: "qcm",
    choices: ["2", "3", "4", "5"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand multiple de 6 inférieur à 38.",
    explanation: exp(
      "Le reste doit être plus petit que le diviseur.",
      "On cherche un multiple de 6 proche de 38.",
      "6 × 6 = 36, puis 38 - 36 = 2.",
      "Le reste est 2."
    ),
    canvas: divisionCanvas({
      dividende: 38,
      diviseur: 6,
      quotient: 6,
      reste: 2,
      title: "Division avec reste",
      questionLabel: "Quel est le reste ?",
      showResult: false,
    }),
    tags: ["cm1", "division", "reste", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_reste_fixed_3_interpreter",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 4,
    theme: "reunion",
    text: "On a 29 letchis. On prépare des sachets de 4 letchis. Combien de sachets complets peut-on faire ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Le reste ne forme pas un sachet complet.",
    explanation: exp(
      "Dans certains problèmes, on demande seulement les groupes complets.",
      "On cherche combien de sachets de 4 on peut faire avec 29 letchis.",
      "4 × 7 = 28, il reste 1 letchi.",
      "On peut faire 7 sachets complets."
    ),
    canvas: divisionCanvas({
      dividende: 29,
      diviseur: 4,
      quotient: 7,
      reste: 1,
      title: "Sachets de letchis",
      questionLabel: "On compte seulement les sachets complets.",
      showResult: false,
    }),
    tags: ["cm1", "division", "reste", "reunion", "interpretation", "canvas"],
  },

  {
    kind: "template",
    id: "cm1_division_reste_tpl_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche le plus grand multiple inférieur ou égal au nombre total.",
    tags: ["cm1", "division", "reste", "template", "canvas"],
    generate: () => {
      const diviseur = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const quotient = randomChoice([4, 5, 6, 7, 8, 9]);
      const reste = randomInt(1, diviseur - 1);
      const dividende = diviseur * quotient + reste;

      return {
        text: `Dans la division ${dividende} ÷ ${diviseur}, quel est le reste ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Le reste est ce qui reste après avoir formé tous les groupes complets.",
          "On cherche le plus grand multiple du diviseur inférieur ou égal au dividende.",
          `${diviseur} × ${quotient} = ${diviseur * quotient}, puis ${dividende} - ${diviseur * quotient} = ${reste}.`,
          `Le reste est ${reste}.`
        ),
        canvas: divisionCanvas({
          dividende,
          diviseur,
          quotient,
          reste,
          title: "Division avec reste",
          questionLabel: "Trouve le reste.",
          showResult: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_division_reste_tpl_2_reunion_sachets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 4,
    theme: "reunion",
    hint: "Le reste ne permet pas de faire un sachet complet.",
    tags: ["cm1", "division", "reste", "reunion", "template", "canvas"],
    generate: () => {
      const taille = randomChoice([4, 5, 6, 8]);
      const sachets = randomChoice([5, 6, 7, 8, 9]);
      const reste = randomInt(1, taille - 1);
      const total = taille * sachets + reste;

      return {
        text: `On a ${total} fruits. On prépare des sachets de ${taille} fruits. Combien de sachets complets peut-on faire ?`,
        format: "short",
        expected: [String(sachets)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on demande des groupes complets, le reste n’est pas compté comme un groupe.",
          "On cherche combien de sachets entiers on peut remplir.",
          `${taille} × ${sachets} = ${taille * sachets}, et il reste ${reste}.`,
          `On peut faire ${sachets} sachets complets.`
        ),
        canvas: divisionCanvas({
          dividende: total,
          diviseur: taille,
          quotient: sachets,
          reste,
          title: "Sachets complets",
          questionLabel: "Combien de sachets complets ?",
          showResult: false,
        }),
      };
    },
  },

  // ============================================================
  // DIVISION_PROBLEME
  // Utiliser la division dans un problème
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_probleme_fixed_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Une classe a 32 élèves. On fait des équipes de 4 élèves. Combien d’équipes peut-on former ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On cherche combien de groupes de 4 on peut faire.",
    explanation: exp(
      "La division sert à former des groupes égaux.",
      "On divise le nombre d’élèves par le nombre d’élèves par équipe.",
      "32 ÷ 4 = 8.",
      "On peut former 8 équipes."
    ),
    tags: ["cm1", "division", "probleme", "groupes"],
  },

  {
    kind: "fixed",
    id: "cm1_division_probleme_fixed_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Pour une sortie à Mafate, on prépare 54 biscuits. On met 6 biscuits par sachet. Combien de sachets peut-on préparer ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Chaque sachet contient 6 biscuits.",
    explanation: exp(
      "La division permet de calculer le nombre de groupes égaux.",
      "On divise le nombre total de biscuits par le nombre de biscuits par sachet.",
      "54 ÷ 6 = 9.",
      "On peut préparer 9 sachets."
    ),
    tags: ["cm1", "division", "probleme", "reunion", "mafatе"],
  },

  {
    kind: "fixed",
    id: "cm1_division_probleme_fixed_3_choisir_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Dans quel cas faut-il utiliser une division ?",
    format: "qcm",
    choices: [
      "partager 48 cartes entre 6 joueurs",
      "acheter 6 paquets de 8 cartes",
      "ajouter 48 cartes et 6 cartes",
      "enlever 6 cartes à 48 cartes",
    ],
    expected: ["partager 48 cartes entre 6 joueurs"],
    comparator: "mcq_exact",
    hint: "La division sert à partager ou à faire des groupes égaux.",
    explanation: exp(
      "Choisir l’opération dépend du sens du problème.",
      "La division sert souvent à partager une quantité en parts égales.",
      "Partager 48 cartes entre 6 joueurs correspond à 48 ÷ 6.",
      "C’est la situation qui utilise une division."
    ),
    tags: ["cm1", "division", "probleme", "choisir_operation", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_division_probleme_tpl_1_equipes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "On cherche combien de groupes identiques on peut faire.",
    tags: ["cm1", "division", "probleme", "equipes", "template"],
    generate: () => {
      const tailleEquipe = randomChoice([3, 4, 5, 6, 8]);
      const equipes = randomChoice([4, 5, 6, 7, 8]);
      const total = tailleEquipe * equipes;

      return {
        text: `On a ${total} élèves. On fait des équipes de ${tailleEquipe} élèves. Combien d’équipes peut-on former ?`,
        format: "short",
        expected: [String(equipes)],
        comparator: "number_equal",
        explanation: exp(
          "La division sert à former des groupes égaux.",
          "On divise le nombre total par la taille d’un groupe.",
          `${total} ÷ ${tailleEquipe} = ${equipes}.`,
          `On peut former ${equipes} équipes.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_division_probleme_tpl_2_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "On partage les fruits en sachets identiques.",
    tags: ["cm1", "division", "probleme", "reunion", "marche", "template"],
    generate: () => {
      const parSachet = randomChoice([4, 5, 6, 8, 10]);
      const sachets = randomChoice([4, 5, 6, 7, 8, 9]);
      const total = parSachet * sachets;

      return {
        text: `Au marché de Saint-Pierre, on range ${total} fruits dans des sachets de ${parSachet}. Combien de sachets peut-on préparer ?`,
        format: "short",
        expected: [String(sachets)],
        comparator: "number_equal",
        explanation: exp(
          "La division permet de calculer le nombre de groupes égaux.",
          "On divise le nombre total de fruits par le nombre de fruits dans un sachet.",
          `${total} ÷ ${parSachet} = ${sachets}.`,
          `On peut préparer ${sachets} sachets.`
        ),
      };
    },
  },

  // ============================================================
  // DIVISION_DEFI
  // Résoudre un défi de division
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_defi_fixed_1_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : 48 cartes sont partagées entre 6 joueurs. Puis chaque joueur donne 2 cartes. Combien de cartes reste-t-il à chaque joueur ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Calcule d’abord le partage, puis enlève 2.",
    explanation: exp(
      "Un défi peut demander plusieurs étapes.",
      "On commence par partager les cartes, puis on ajuste.",
      "48 ÷ 6 = 8, puis 8 - 2 = 6.",
      "Il reste 6 cartes à chaque joueur."
    ),
    tags: ["cm1", "division", "defi", "deux_etapes"],
  },

  {
    kind: "fixed",
    id: "cm1_division_defi_fixed_2_reste",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Défi randonnée : 50 biscuits sont rangés dans des sachets de 6. Combien de sachets complets peut-on préparer ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Le reste ne forme pas un sachet complet.",
    explanation: exp(
      "Un défi de division peut demander d’interpréter le reste.",
      "On cherche le nombre de sachets complets.",
      "6 × 8 = 48, et il reste 2 biscuits.",
      "On peut préparer 8 sachets complets."
    ),
    canvas: divisionCanvas({
      dividende: 50,
      diviseur: 6,
      quotient: 8,
      reste: 2,
      title: "Défi randonnée",
      questionLabel: "Combien de sachets complets ?",
      showResult: false,
    }),
    tags: ["cm1", "division", "defi", "reste", "reunion", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_defi_fixed_3_qcm_verification",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel calcul vérifie correctement que 72 ÷ 9 = 8 ?",
    format: "qcm",
    choices: ["9 × 8 = 72", "72 × 9 = 8", "72 + 9 = 8", "9 - 8 = 72"],
    expected: ["9 × 8 = 72"],
    comparator: "mcq_exact",
    hint: "Une division se vérifie avec une multiplication.",
    explanation: exp(
      "Une division peut être vérifiée avec une multiplication.",
      "On multiplie le diviseur par le quotient.",
      "9 × 8 = 72.",
      "Le calcul de vérification est 9 × 8 = 72."
    ),
    tags: ["cm1", "division", "defi", "verification", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_division_defi_tpl_1_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Partage d’abord, puis applique la deuxième étape.",
    tags: ["cm1", "division", "defi", "deux_etapes", "template"],
    generate: () => {
      const personnes = randomChoice([4, 5, 6, 8]);
      const chacun = randomChoice([6, 7, 8, 9, 10]);
      const retire = randomChoice([1, 2, 3]);
      const total = personnes * chacun;
      const final = chacun - retire;

      return {
        text: `Défi : ${total} objets sont partagés entre ${personnes} enfants. Puis chaque enfant donne ${retire} objets. Combien lui en reste-t-il ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à deux étapes demande de faire les calculs dans l’ordre.",
          "On partage d’abord, puis on retire une quantité.",
          `${total} ÷ ${personnes} = ${chacun}, puis ${chacun} - ${retire} = ${final}.`,
          `Il reste ${final} objets à chaque enfant.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_division_defi_tpl_2_reste_canvas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "On ne compte que les groupes complets.",
    tags: ["cm1", "division", "defi", "reste", "reunion", "template", "canvas"],
    generate: () => {
      const taille = randomChoice([4, 5, 6, 8]);
      const groupes = randomChoice([6, 7, 8, 9]);
      const reste = randomInt(1, taille - 1);
      const total = taille * groupes + reste;

      return {
        text: `Défi sortie nature : ${total} élèves doivent monter dans des groupes de ${taille}. Combien de groupes complets peut-on former ?`,
        format: "short",
        expected: [String(groupes)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on demande des groupes complets, le reste ne forme pas un groupe entier.",
          "On cherche combien de groupes de taille donnée on peut former.",
          `${taille} × ${groupes} = ${taille * groupes}, et il reste ${reste}.`,
          `On peut former ${groupes} groupes complets.`
        ),
        canvas: divisionCanvas({
          dividende: total,
          diviseur: taille,
          quotient: groupes,
          reste,
          title: "Défi division avec reste",
          questionLabel: "Combien de groupes complets ?",
          showResult: false,
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_division_defi_open_1_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment vérifier le résultat d’une division.",
    format: "open",
    expected: ["multiplier", "diviseur", "quotient", "reste", "vérifier"],
    comparator: "contains_keyword",
    hint: "Pense à la multiplication inverse.",
    explanation: exp(
      "Une division peut être vérifiée avec une multiplication.",
      "On multiplie le diviseur par le quotient, puis on ajoute le reste s’il y en a un.",
      "Par exemple, si 38 ÷ 6 = 6 reste 2, on vérifie : 6 × 6 + 2 = 38.",
      "La multiplication permet donc de vérifier la division."
    ),
    tags: ["cm1", "division", "defi", "open", "verification"],
  },

  // ============================================================
  // TOP-UP — DIVISION_SENS
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_sens_fixed_5_partage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 1,
    theme: "neutral",
    text: "On partage 15 bonbons entre 5 enfants. Combien chaque enfant reçoit-il de bonbons ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Partager en parts égales, c’est une division.",
    explanation: exp(
      "Une division sert à partager une quantité en parts égales.",
      "On divise le nombre de bonbons par le nombre d’enfants.",
      "15 ÷ 5 = 3.",
      "Chaque enfant reçoit 3 bonbons."
    ),
    tags: ["cm1", "division", "sens", "partage"],
  },

  {
    kind: "fixed",
    id: "cm1_division_sens_fixed_6_groupements",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 1,
    theme: "neutral",
    text: "On range 18 œufs dans des boîtes de 6 œufs. Combien de boîtes peut-on remplir ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Cherche combien de groupes de 6 il y a dans 18.",
    explanation: exp(
      "Une division sert aussi à faire des groupes de même taille.",
      "On cherche combien de groupes de 6 sont contenus dans 18.",
      "18 ÷ 6 = 3.",
      "On peut remplir 3 boîtes."
    ),
    tags: ["cm1", "division", "sens", "groupements"],
  },

  {
    kind: "fixed",
    id: "cm1_division_sens_fixed_7_qcm_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle opération correspond à : « partager 40 images entre 8 amis » ?",
    format: "qcm",
    choices: ["40 ÷ 8", "40 × 8", "40 + 8", "40 - 8"],
    expected: ["40 ÷ 8"],
    comparator: "mcq_exact",
    hint: "Le mot partager indique une division.",
    explanation: exp(
      "Choisir une opération demande de comprendre la situation.",
      "Partager en parts égales correspond à une division.",
      "Partager 40 entre 8 correspond à 40 ÷ 8.",
      "L’opération correcte est 40 ÷ 8."
    ),
    tags: ["cm1", "division", "sens", "choisir_operation", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_division_sens_fixed_8_effet",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "neutral",
    text: "Quand on partage une quantité en plusieurs parts égales, chaque part est…",
    format: "qcm",
    choices: [
      "plus petite que la quantité de départ",
      "plus grande que la quantité de départ",
      "égale à la quantité de départ",
      "toujours égale à 1",
    ],
    expected: ["plus petite que la quantité de départ"],
    comparator: "mcq_exact",
    hint: "Si on partage entre plusieurs, chacun a moins que le total.",
    explanation: exp(
      "Partager, c’est répartir le total entre plusieurs parts.",
      "On compare une part au total de départ.",
      "Comme on partage en plusieurs, chaque part est plus petite que le total.",
      "Chaque part est plus petite que la quantité de départ."
    ),
    tags: ["cm1", "division", "sens", "comprendre", "qcm"],
  },

  // ============================================================
  // TOP-UP — DIVISION_LIEN_MULTIPLICATION
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_lien_fixed_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Si 5 × 7 = 35, alors combien vaut 35 ÷ 5 ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "La division retrouve un facteur.",
    explanation: exp(
      "Multiplication et division sont liées.",
      "Si 5 × 7 = 35, alors 35 partagé en groupes de 5 donne 7.",
      "35 ÷ 5 = 7.",
      "La réponse est 7."
    ),
    tags: ["cm1", "division", "lien_multiplication"],
  },

  {
    kind: "fixed",
    id: "cm1_division_lien_fixed_6",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Si 9 × 6 = 54, alors combien vaut 54 ÷ 9 ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Utilise le produit pour retrouver le facteur.",
    explanation: exp(
      "Une multiplication connue aide à diviser.",
      "Si 9 × 6 = 54, alors 54 ÷ 9 retrouve l’autre facteur.",
      "54 ÷ 9 = 6.",
      "La réponse est 6."
    ),
    tags: ["cm1", "division", "lien_multiplication"],
  },

  {
    kind: "fixed",
    id: "cm1_division_lien_fixed_7_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    text: "Quel calcul peut aider à trouver 42 ÷ 7 ?",
    format: "qcm",
    choices: ["7 × ? = 42", "42 × 7", "42 + 7", "42 - 7"],
    expected: ["7 × ? = 42"],
    comparator: "mcq_exact",
    hint: "Pour diviser, cherche une multiplication à trou.",
    explanation: exp(
      "Une division peut devenir une multiplication à trou.",
      "Pour 42 ÷ 7, on cherche quel nombre multiplié par 7 donne 42.",
      "7 × 6 = 42.",
      "Le calcul utile est 7 × ? = 42."
    ),
    tags: ["cm1", "division", "lien_multiplication", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_division_lien_fixed_8_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : 8 × ? = 64. Donc 64 ÷ 8 = ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 8.",
    explanation: exp(
      "La multiplication à trou aide à calculer une division.",
      "On cherche le facteur manquant.",
      "8 × 8 = 64, donc 64 ÷ 8 = 8.",
      "La réponse est 8."
    ),
    tags: ["cm1", "division", "lien_multiplication", "table"],
  },

  {
    kind: "fixed",
    id: "cm1_division_lien_fixed_9_verif",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle multiplication vérifie que 36 ÷ 4 = 9 ?",
    format: "qcm",
    choices: ["4 × 9 = 36", "36 × 4 = 9", "4 + 9 = 36", "36 - 4 = 9"],
    expected: ["4 × 9 = 36"],
    comparator: "mcq_exact",
    hint: "On multiplie le diviseur par le quotient.",
    explanation: exp(
      "Une division se vérifie avec une multiplication.",
      "On multiplie le diviseur par le quotient.",
      "4 × 9 = 36.",
      "La vérification est 4 × 9 = 36."
    ),
    tags: ["cm1", "division", "lien_multiplication", "verification", "qcm"],
  },

  // ============================================================
  // TOP-UP — DIVISION_POSEE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_posee_fixed_5_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 75 ÷ 5",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Cherche combien de fois 5 est contenu dans 75.",
    explanation: exp(
      "Une division posée organise le calcul.",
      "On cherche combien de groupes de 5 il y a dans 75.",
      "75 ÷ 5 = 15.",
      "Le quotient est 15."
    ),
    canvas: divisionCanvas({
      dividende: 75,
      diviseur: 5,
      quotient: 15,
      title: "Division posée",
      questionLabel: "Calcule le quotient.",
      showResult: false,
    }),
    tags: ["cm1", "division", "posee", "simple", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_posee_fixed_6_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 64 ÷ 4",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "Cherche combien de fois 4 est contenu dans 64.",
    explanation: exp(
      "Une division posée aide à calculer étape par étape.",
      "On cherche combien de groupes de 4 il y a dans 64.",
      "64 ÷ 4 = 16.",
      "Le quotient est 16."
    ),
    canvas: divisionCanvas({
      dividende: 64,
      diviseur: 4,
      quotient: 16,
      title: "Division posée",
      questionLabel: "Calcule le quotient.",
      showResult: false,
    }),
    tags: ["cm1", "division", "posee", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_posee_fixed_7_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 90 ÷ 6",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Cherche combien de fois 6 est contenu dans 90.",
    explanation: exp(
      "Une division posée permet de calculer étape par étape.",
      "On cherche combien de fois 6 est contenu dans 90.",
      "90 ÷ 6 = 15.",
      "Le quotient est 15."
    ),
    canvas: divisionCanvas({
      dividende: 90,
      diviseur: 6,
      quotient: 15,
      title: "Division posée",
      questionLabel: "Calcule le quotient.",
      showResult: false,
    }),
    tags: ["cm1", "division", "posee", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_posee_fixed_8_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 88 ÷ 8",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "Cherche combien de fois 8 est contenu dans 88.",
    explanation: exp(
      "Une division posée permet de calculer étape par étape.",
      "On cherche combien de fois 8 est contenu dans 88.",
      "88 ÷ 8 = 11.",
      "Le quotient est 11."
    ),
    canvas: divisionCanvas({
      dividende: 88,
      diviseur: 8,
      quotient: 11,
      title: "Division posée",
      questionLabel: "Calcule le quotient.",
      showResult: false,
    }),
    tags: ["cm1", "division", "posee", "canvas"],
  },

  // ============================================================
  // TOP-UP — DIVISION_RESTE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_reste_fixed_4",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 3,
    theme: "neutral",
    text: "Dans la division 23 ÷ 4, quel est le reste ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Cherche le plus grand multiple de 4 inférieur à 23.",
    explanation: exp(
      "Le reste est ce qui reste après les groupes complets.",
      "On cherche le plus grand multiple de 4 inférieur ou égal à 23.",
      "4 × 5 = 20, puis 23 - 20 = 3.",
      "Le reste est 3."
    ),
    canvas: divisionCanvas({
      dividende: 23,
      diviseur: 4,
      quotient: 5,
      reste: 3,
      title: "Division avec reste",
      questionLabel: "Quel est le reste ?",
      showResult: false,
    }),
    tags: ["cm1", "division", "reste", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_reste_fixed_5_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 3,
    theme: "neutral",
    text: "Dans la division 45 ÷ 7, quel est le reste ?",
    format: "qcm",
    choices: ["3", "2", "4", "5"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand multiple de 7 inférieur à 45.",
    explanation: exp(
      "Le reste est plus petit que le diviseur.",
      "On cherche un multiple de 7 proche de 45.",
      "7 × 6 = 42, puis 45 - 42 = 3.",
      "Le reste est 3."
    ),
    canvas: divisionCanvas({
      dividende: 45,
      diviseur: 7,
      quotient: 6,
      reste: 3,
      title: "Division avec reste",
      questionLabel: "Quel est le reste ?",
      showResult: false,
    }),
    tags: ["cm1", "division", "reste", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_reste_fixed_6",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 3,
    theme: "neutral",
    text: "On range 34 billes dans des sachets de 5. Combien de billes restent sans sachet complet ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "5 × 6 = 30, il reste ensuite quelques billes.",
    explanation: exp(
      "Le reste est ce qui ne forme pas un groupe complet.",
      "On cherche le plus grand multiple de 5 inférieur ou égal à 34.",
      "5 × 6 = 30, puis 34 - 30 = 4.",
      "Il reste 4 billes."
    ),
    canvas: divisionCanvas({
      dividende: 34,
      diviseur: 5,
      quotient: 6,
      reste: 4,
      title: "Division avec reste",
      questionLabel: "Combien reste-t-il ?",
      showResult: false,
    }),
    tags: ["cm1", "division", "reste", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_reste_fixed_7",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 4,
    theme: "neutral",
    text: "Dans la division 50 ÷ 8, quel est le reste ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Cherche le plus grand multiple de 8 inférieur à 50.",
    explanation: exp(
      "Le reste est plus petit que le diviseur.",
      "On cherche un multiple de 8 proche de 50.",
      "8 × 6 = 48, puis 50 - 48 = 2.",
      "Le reste est 2."
    ),
    canvas: divisionCanvas({
      dividende: 50,
      diviseur: 8,
      quotient: 6,
      reste: 2,
      title: "Division avec reste",
      questionLabel: "Quel est le reste ?",
      showResult: false,
    }),
    tags: ["cm1", "division", "reste", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_reste_fixed_8_propriete",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une division par 6, le reste peut-il être égal à 6 ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le reste doit toujours être plus petit que le diviseur.",
    explanation: exp(
      "Le reste est toujours plus petit que le diviseur.",
      "On compare le reste possible au diviseur 6.",
      "Si le reste valait 6, on pourrait encore former un groupe de 6.",
      "Le reste ne peut pas être 6 : il doit être plus petit que 6."
    ),
    tags: ["cm1", "division", "reste", "propriete", "qcm"],
  },

  // ============================================================
  // TOP-UP — DIVISION_PROBLEME
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_probleme_fixed_4_bouquets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "On a 63 fleurs. On fait des bouquets de 9 fleurs. Combien de bouquets peut-on faire ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "On cherche combien de groupes de 9 il y a dans 63.",
    explanation: exp(
      "La division sert à former des groupes égaux.",
      "On divise le nombre de fleurs par le nombre de fleurs par bouquet.",
      "63 ÷ 9 = 7.",
      "On peut faire 7 bouquets."
    ),
    tags: ["cm1", "division", "probleme", "groupes"],
  },

  {
    kind: "fixed",
    id: "cm1_division_probleme_fixed_5_partage_argent",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "On partage 56 € entre 8 personnes, de façon égale. Combien reçoit chaque personne ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "On partage la somme en 8 parts égales.",
    explanation: exp(
      "La division sert à partager en parts égales.",
      "On divise la somme par le nombre de personnes.",
      "56 ÷ 8 = 7.",
      "Chaque personne reçoit 7 €."
    ),
    tags: ["cm1", "division", "probleme", "partage"],
  },

  {
    kind: "fixed",
    id: "cm1_division_probleme_fixed_6_corde",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Une corde de 24 m est coupée en morceaux de 4 m. Combien de morceaux obtient-on ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "On cherche combien de fois 4 m il y a dans 24 m.",
    explanation: exp(
      "La division sert à faire des groupes de même taille.",
      "On divise la longueur totale par la longueur d’un morceau.",
      "24 ÷ 4 = 6.",
      "On obtient 6 morceaux."
    ),
    tags: ["cm1", "division", "probleme", "longueur"],
  },

  {
    kind: "fixed",
    id: "cm1_division_probleme_fixed_7_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "On partage 40 letchis entre 5 enfants, de façon égale. Combien de letchis pour chaque enfant ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On partage en 5 parts égales.",
    explanation: exp(
      "La division sert à partager en parts égales.",
      "On divise le nombre de letchis par le nombre d’enfants.",
      "40 ÷ 5 = 8.",
      "Chaque enfant reçoit 8 letchis."
    ),
    tags: ["cm1", "division", "probleme", "reunion", "partage"],
  },

  {
    kind: "fixed",
    id: "cm1_division_probleme_fixed_8_choisir",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle opération permet de répondre à : « combien de paquets de 6 gâteaux dans 42 gâteaux » ?",
    format: "qcm",
    choices: ["42 ÷ 6", "42 × 6", "42 + 6", "42 - 6"],
    expected: ["42 ÷ 6"],
    comparator: "mcq_exact",
    hint: "On cherche combien de groupes de 6 il y a dans 42.",
    explanation: exp(
      "Choisir l’opération dépend du sens du problème.",
      "Faire des groupes de même taille correspond à une division.",
      "Combien de paquets de 6 dans 42 correspond à 42 ÷ 6.",
      "L’opération est 42 ÷ 6."
    ),
    tags: ["cm1", "division", "probleme", "choisir_operation", "qcm"],
  },

  // ============================================================
  // TOP-UP — DIVISION_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_defi_fixed_4_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : 36 bonbons sont partagés entre 6 enfants. Puis chaque enfant en mange 1. Combien lui en reste-t-il ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Partage d’abord, puis enlève 1.",
    explanation: exp(
      "Un défi peut demander plusieurs étapes.",
      "On partage d’abord, puis on enlève une quantité.",
      "36 ÷ 6 = 6, puis 6 - 1 = 5.",
      "Il reste 5 bonbons à chaque enfant."
    ),
    tags: ["cm1", "division", "defi", "deux_etapes"],
  },

  {
    kind: "fixed",
    id: "cm1_division_defi_fixed_5_arrondi_sup",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "neutral",
    text: "27 enfants doivent monter dans des voitures de 4 places. Combien de voitures faut-il pour emmener tout le monde ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Attention : il faut une voiture de plus pour le reste.",
    explanation: exp(
      "Parfois, il faut un groupe de plus pour le reste.",
      "On calcule la division, puis on ajoute une voiture pour les enfants restants.",
      "27 ÷ 4 = 6 reste 3 ; il faut donc une 7e voiture pour les 3 derniers.",
      "Il faut 7 voitures."
    ),
    canvas: divisionCanvas({
      dividende: 27,
      diviseur: 4,
      quotient: 6,
      reste: 3,
      title: "Défi voitures",
      questionLabel: "Combien de voitures pour tout le monde ?",
      showResult: false,
    }),
    tags: ["cm1", "division", "defi", "reste", "interpretation", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_defi_fixed_6_verification",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel calcul vérifie correctement que 56 ÷ 7 = 8 ?",
    format: "qcm",
    choices: ["7 × 8 = 56", "56 × 7 = 8", "56 + 7 = 8", "7 - 8 = 56"],
    expected: ["7 × 8 = 56"],
    comparator: "mcq_exact",
    hint: "Une division se vérifie avec une multiplication.",
    explanation: exp(
      "Une division se vérifie avec une multiplication.",
      "On multiplie le diviseur par le quotient.",
      "7 × 8 = 56.",
      "Le calcul de vérification est 7 × 8 = 56."
    ),
    tags: ["cm1", "division", "defi", "verification", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_division_defi_fixed_7_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Défi : 45 letchis sont partagés entre 5 enfants. Puis chaque enfant en reçoit 2 de plus. Combien de letchis a finalement chaque enfant ?",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "Partage d’abord, puis ajoute 2.",
    explanation: exp(
      "Un défi à deux étapes demande de calculer dans l’ordre.",
      "On partage d’abord, puis on ajoute une quantité.",
      "45 ÷ 5 = 9, puis 9 + 2 = 11.",
      "Chaque enfant a finalement 11 letchis."
    ),
    tags: ["cm1", "division", "defi", "deux_etapes", "reunion"],
  },

  // DIVISION_SENS et DIVISION_LIEN_MULTIPLICATION : les gabarits du 14/11/2026.
  ...GABARITS_SENS_LIEN,
];