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
  deuxPersonnes,
  maj,
  objetsEnVrac,
  objetsGroupes,
  pick,
  quelquun,
  rep,
  rint,
  type Prenom,
} from "@/lib/tutor-v4/questionBank/ce2/maths/outils-calcul-ce2";

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
const deM = (mot: string) => (/^[aeiouàâéèêëîïôœ]/i.test(mot) ? `d’${mot}` : `de ${mot}`);

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
  if (Math.random() < 0.65 || /^(Pic |Défi|Nombre mystère)/.test(text)) return text;
  const p = quelquun();
  const suite = /^(On|Si|Tu|Une|Un|Quelle|Quel|Combien|Les|Famille|Avec|Complète|Diviser|Pour|Dans|Lis|Que|Comment|Trouve|Partage|Regarde|Au|Aux|À|Chez|Sur|Le|La|L’|Il|Elle|Avant|Sans|Pose|Effectue|Vérifie|Voici|Calcule|Nombre|Division|Après)(?=[\s’])/.test(text)
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

/* =========================================================
   DIVISION_POSEE, DIVISION_RESTE, DIVISION_PROBLEME, DIVISION_DEFI
   — LES GABARITS (14/11/2026)

   ⛔ POURQUOI. Mesuré avec scripts/mesurer-squelettes-coach.ts : 3, 6, 10 et
   8 squelettes, 11 à 18 répétitions sur 20 ; le problème n'avait aucun dessin
   et 46 % de Réunion (« au marché de Saint-Pierre » à chaque fois). Pas de
   vidéo branchée sur ces micros : vocabulaire du cycle 3 (dividende,
   diviseur, quotient, reste, la potence, « on commence par la gauche »,
   « dividende = diviseur × quotient + reste »).

   ⭐ LES PIÈGES = DE VRAIES ERREURS D'ÉLÈVE : diviser chiffre par chiffre
   sans reporter le reste (96 ÷ 6 → 11), oublier le 0 du quotient
   (412 ÷ 4 → 13), prendre le quotient pour le reste, garder un reste plus
   grand que le diviseur, oublier le reste, compter le reste comme un paquet
   complet (ou l'oublier quand il faut une voiture de plus).
   Signe « ÷ » partout, jamais « / ».
========================================================= */

type E5 = 1 | 2 | 3 | 4 | 5;

/** Une division euclidienne : dividende N, diviseur d, quotient q, reste r. */
type Div = { N: number; d: number; q: number; r: number };
const div = (d: number, q: number, r = 0): Div => ({ N: d * q + r, d, q, r });

/** « un », « une ». */
const unUne = (n: Nom) => (n.fem ? "une" : "un");
/** « complets », « complètes ». */
const complets = (n: Nom) => (n.fem ? "complètes" : "complets");

/**
 * Les nombres d'une division POSÉE, par étoile : 2 chiffres ÷ 1 chiffre à
 * quotient de 2 chiffres (★2 : 84 ÷ 4, 96 ÷ 6), jusqu'à 540 (★3), 3 chiffres
 * avec souvent un 0 au quotient (★4 : 412 ÷ 4 = 103).
 */
function tiragePose(e: E5, avecReste = false): Div {
  if (e <= 2) {
    const d = rint(2, 6);
    const r = avecReste ? rint(1, d - 1) : 0;
    return div(d, rint(11, Math.floor((99 - r) / d)), r);
  }
  if (e === 3) {
    const d = rint(3, 9);
    return div(d, rint(12, 60), avecReste ? rint(1, d - 1) : 0);
  }
  const d = rint(3, 9);
  const r = avecReste ? rint(1, d - 1) : 0;
  const qmin = Math.max(21, Math.ceil((100 - r) / d));
  const qmax = Math.floor((999 - r) / d);
  const tous = Array.from({ length: qmax - qmin + 1 }, (_, i) => qmin + i);
  const avecZero = tous.filter((q) => /.0/.test(String(q)));
  return div(d, Math.random() < 0.4 && avecZero.length ? pick(avecZero) : pick(tous), r);
}

/** Les nombres d'une division AVEC RESTE : tables (★3), quotient jusqu'à 15 (★4), petite collection à dessiner. */
function tirageReste(e: E5 | "petit"): Div {
  if (e === "petit") {
    const d = rint(2, 5);
    return div(d, rint(3, 5), rint(1, d - 1));
  }
  const d = rint(e <= 3 ? 2 : 3, 9);
  return div(d, e <= 3 ? rint(2, 9) : rint(6, 15), rint(1, d - 1));
}

/** L'erreur « chiffre par chiffre » : 96 ÷ 6 → 9 ÷ 6 = 1, 6 ÷ 6 = 1 → 11 (le reste n'est pas reporté). */
function chiffreParChiffre(N: number, d: number): number | undefined {
  const v = Number(
    String(N)
      .split("")
      .map((c) => Math.floor(Number(c) / d))
      .join(""),
  );
  return v > 0 ? v : undefined;
}
/** L'erreur du 0 oublié au quotient : 103 → 13, 120 → 12. */
const zeroOublie = (q: number) =>
  /.0/.test(String(q)) ? Number(String(q)[0] + String(q).slice(1).replace(/0/g, "")) : undefined;

const piegesPose = ({ N, d, q, r }: Div) =>
  [chiffreParChiffre(N, d), zeroOublie(q), q + 1, q - 1, q + 10, r > 0 ? r : N - d].filter(
    (v): v is number => v !== undefined,
  );

const RANGS: readonly [string, string][] = [
  ["unité", "unités"],
  ["dizaine", "dizaines"],
  ["centaine", "centaines"],
];
/** « 15 dizaines » : un nombre et son rang (0 = unités). */
const enRang = (k: number, rang: number) => `${k} ${k > 1 ? RANGS[rang][1] : RANGS[rang][0]}`;

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

const verif = ({ N, d, q, r }: Div) => `${d} × ${q}${r ? ` + ${r}` : ""} = ${N}`;

function expPose(D: Div, conclusion?: string): string {
  return exp(
    "Dans une division posée, on cherche combien de fois le diviseur est contenu dans le dividende.",
    "On commence par la gauche : on partage d’abord les plus grandes unités, puis on abaisse le chiffre suivant.",
    `${etapes(D.N, D.d)} Vérification : ${verif(D)}.`,
    conclusion ?? (D.r ? `${D.N} ÷ ${D.d} : quotient ${D.q}, reste ${D.r}.` : `${D.N} ÷ ${D.d} = ${D.q}.`),
  );
}

/** La potence, sans le résultat. */
const potence = (D: Div, questionLabel?: string, title?: string) =>
  divisionCanvas({ dividende: D.N, diviseur: D.d, quotient: D.q, reste: D.r, questionLabel, title, showResult: false });

/** La table du diviseur autour du dividende : « entre quels multiples se trouve 38 ? ». */
function tableMultiples({ N, d, q }: Div): TableauDonneesCanvasData {
  const k0 = Math.max(1, q - 1);
  const ks = [k0, k0 + 1, k0 + 2, k0 + 3];
  return {
    kind: "tableau_donnees",
    title: `La table de ${d}`,
    coin: "×",
    headers: ks.map(String),
    rows: [{ label: String(d), values: ks.map((k) => d * k) }],
    questionLabel: `Entre quels multiples de ${d} se trouve ${N} ?`,
    display: { compact: true },
  } as TableauDonneesCanvasData;
}

/** Le dessin d'une division avec reste : en vrac si la collection est petite, sinon la table ou la potence. */
function dessinReste(D: Div, s?: Sit): Q["canvas"] {
  if (s?.dessin && D.N <= 30 && Math.random() < 0.7) return objetsEnVrac(s.dessin, D.N);
  return Math.random() < 0.5 && D.q <= 20 ? tableMultiples(D) : potence(D, "Trouve le plus grand multiple du diviseur.");
}

const unMetier = () => pick(SITS.filter((s) => s.metier)).metier!;

/* ---------------- DIVISION_POSEE ---------------- */

function quotientQ(e: E5): Q {
  const D = tiragePose(e, e === 4 ? Math.random() < 0.5 : e === 3 ? Math.random() < 0.3 : false);
  const { N, d, q, r } = D;
  const p = quelquun();
  const m = unMetier();
  const quel = r ? " Quel est le quotient ?" : "";
  return qcmN(
    pick([
      `Pose et calcule ${N} ÷ ${d}.${quel}`,
      `Quel est le quotient de ${N} ÷ ${d} ?`,
      `${p.nom} pose la division ${N} ÷ ${d}. Quel quotient trouve-t-${p.il} ?`,
      `Calcule ${N} ÷ ${d} en posant la division.${quel}`,
      `Dans la potence de ${N} ÷ ${d}, quel nombre s’écrit sous le diviseur ?`,
      `Combien de fois ${d} est-il contenu dans ${N} ?`,
      `${m.nom} pose ${N} ÷ ${d} pour ses comptes. Quel quotient trouve-t-${m.il} ?`,
      `Sur son cahier, ${p.nom} pose ${N} ÷ ${d}. Quel nombre écrit-${p.il} au quotient ?`,
    ]),
    q,
    piegesPose(D),
    expPose(D),
    potence(D, pick(["Commence par la gauche.", "Quel est le quotient ?", "Pose la division."])),
  );
}

/** Combien de chiffres aura le quotient ? On regarde le premier chiffre à gauche. */
function nbChiffresQ(e: E5): Q {
  const d = rint(e <= 2 ? 3 : 2, 9);
  const N = e <= 2 ? rint(12, 99) : rint(102, 999);
  const q = Math.floor(N / d);
  const r = N % d;
  const n = String(q).length;
  const s = String(N);
  const premier = Number(s[0]);
  const haut = s.length - 1;
  const lib = (k: number) => `${k} chiffre${k > 1 ? "s" : ""}`;
  const p = quelquun();
  return qcmM(
    pick([
      `Sans finir le calcul : combien de chiffres aura le quotient de ${N} ÷ ${d} ?`,
      `${p.nom} va poser ${N} ÷ ${d}. Combien de chiffres aura son quotient ?`,
      `Avant de poser ${N} ÷ ${d}, on prévoit la taille du quotient. Combien de chiffres aura-t-il ?`,
      `Le quotient de ${N} ÷ ${d} s’écrira avec combien de chiffres ?`,
    ]),
    lib(n),
    [1, 2, 3].filter((k) => k !== n).map(lib),
    exp(
      "Le premier chiffre du quotient dit son rang : il y a autant de chiffres que de rangs à partir de celui-là.",
      "On regarde le premier chiffre à gauche du dividende et on le compare au diviseur.",
      premier >= d
        ? `${premier} ≥ ${d} : on partage déjà les ${RANGS[haut][1]}, le quotient commence aux ${RANGS[haut][1]}. ${N} ÷ ${d} = ${q}${r ? ` reste ${r}` : ""}.`
        : `${premier} < ${d} : on prend ${enRang(Number(s.slice(0, 2)), haut - 1)}, le quotient commence aux ${RANGS[haut - 1][1]}. ${N} ÷ ${d} = ${q}${r ? ` reste ${r}` : ""}.`,
      `Le quotient a ${lib(n)}.`,
    ),
    parfois(0.8, () => potence(div(d, q, r), "Regarde le premier chiffre à gauche.")),
  );
}

/** Le premier partage de la potence, ou le premier chiffre du quotient. */
function premierPasQ(e: E5): Q {
  const D = tiragePose(e, Math.random() < 0.4);
  const { N, d } = D;
  const s = String(N);
  const L = s.length;
  const c = Number(s[0]);
  const deux = Number(s.slice(0, 2));
  const unites = Number(s[L - 1]);
  const p = quelquun();
  const debut = c >= d ? c : deux;
  if (Math.random() < 0.5) {
    const q1 = Math.floor(debut / d);
    return qcmN(
      pick([
        `On pose ${N} ÷ ${d}. Quel est le premier chiffre du quotient ?`,
        `${p.nom} pose ${N} ÷ ${d}. Quel chiffre écrit-${p.il} en premier sous le diviseur ?`,
        `Dans la potence de ${N} ÷ ${d}, quel est le premier chiffre du quotient ?`,
      ]),
      q1,
      [c, q1 + 1, d, debut - d, Math.floor(unites / d)],
      exp(
        "On commence la division posée par la gauche.",
        `${c >= d ? `${c} ≥ ${d} : on partage ${enRang(c, L - 1)}.` : `${c} < ${d} : on prend ${enRang(deux, L - 2)}.`}`,
        `En ${debut}, ${d} va ${q1} fois (${d} × ${q1} = ${d * q1}).`,
        `Le premier chiffre du quotient est ${q1}.`,
      ),
      potence(D, "On commence par la gauche."),
    );
  }
  const correct = c >= d ? enRang(c, L - 1) : enRang(deux, L - 2);
  const pieges =
    c >= d
      ? [L === 3 ? enRang(Number(s[1]), 1) : enRang(1, 1), enRang(unites, 0)]
      : [enRang(c, L - 1), enRang(unites, 0)];
  return qcmM(
    pick([
      `On pose ${N} ÷ ${d}. On commence par la gauche : que partage-t-on en premier ?`,
      `${p.nom} pose ${N} ÷ ${d}. Quel est son premier partage ?`,
      `Dans la potence de ${N} ÷ ${d}, que partage-t-on d’abord ?`,
    ]),
    correct,
    pieges.filter((x) => x !== correct),
    exp(
      "On commence la division posée par la gauche, jamais par les unités.",
      "On prend le premier chiffre ; s’il est plus petit que le diviseur, on prend les deux premiers.",
      c >= d
        ? `${c} ≥ ${d} : on partage d’abord ${correct}.`
        : `${c} < ${d} : ${enRang(c, L - 1)} ne se partage pas en ${d}. On prend ${correct}.`,
      `On partage d’abord ${correct}.`,
    ),
    potence(D, "Par où commence-t-on ?"),
  );
}

/** Les étapes d'une division à 2 chiffres : le chiffre des dizaines, le reste des dizaines, les unités abaissées. */
function etapesQ(e: E5): Q {
  let D = tiragePose(2, e >= 3 && Math.random() < 0.5);
  for (let i = 0; i < 30 && Math.floor(D.N / 10) % D.d === 0; i++) D = tiragePose(2, e >= 3 && Math.random() < 0.5);
  if (e >= 3 && Math.random() < 0.5) {
    const d = rint(6, 8);
    const r = Math.random() < 0.5 ? rint(1, d - 1) : 0;
    D = div(d, rint(11, Math.floor((99 - r) / d)), r);
  }
  const { N, d } = D;
  const t = Math.floor(N / 10);
  const u = N % 10;
  const f1 = Math.floor(t / d);
  const r1 = t % d;
  const p = quelquun();
  const fam = r1 > 0 ? rint(1, 3) : 1;
  const intro = pick([`On pose ${N} ÷ ${d}.`, `${p.nom} pose ${N} ÷ ${d}.`, `${p.nom} écrit la potence de ${N} ÷ ${d}.`]);
  const expl = expPose(D);
  if (fam === 1)
    return qcmN(
      `${intro} ${pick([`En ${enRang(t, 1)}, combien de fois ${d} ?`, `On partage d’abord les ${t} dizaines. Combien de dizaines dans chaque part ?`, `Quel chiffre écrit-on d’abord au quotient ?`])}`,
      f1,
      [t, r1, f1 + 1, d],
      expl,
      potence(D, "On commence par les dizaines."),
    );
  if (fam === 2)
    return qcmN(
      `${intro} ${pick([`En ${enRang(t, 1)}, ${d} va ${f1} fois. Combien de dizaines reste-t-il ?`, `Après le partage des ${t} dizaines, combien de dizaines reste-t-il ?`])}`,
      r1,
      [f1, t - f1, d - r1, r1 + 1],
      expl,
      potence(D, "Que reste-t-il des dizaines ?"),
    );
  return qcmN(
    `${intro} ${pick([
      `Il reste ${enRang(r1, 1)}. On abaisse le ${u}. Combien d’unités partage-t-on maintenant ?`,
      `Après les dizaines, il reste ${enRang(r1, 1)}. Avec les ${u} unités, combien d’unités faut-il partager ?`,
    ])}`,
    r1 * 10 + u,
    [u, r1 + u, r1 * 10, (r1 + 1) * 10 + u],
    exp(
      "Le reste des dizaines n’est pas perdu : on l’échange contre des unités.",
      `${enRang(r1, 1)}, c’est ${r1 * 10} unités ; on ajoute les ${u} unités abaissées.`,
      `${r1 * 10} + ${u} = ${r1 * 10 + u}. Puis ${etapes(N, d)}`,
      `On partage ${r1 * 10 + u} unités.`,
    ),
    potence(D, "On abaisse le chiffre des unités."),
  );
}

/** Quel calcul vérifie la division ? dividende = diviseur × quotient + reste. */
function verifierPoseQ(D: Div): Q {
  const { N, d, q, r } = D;
  const p = quelquun();
  const faux = (
    [
      [`${d} × ${q}`, d * q],
      [`${d} × ${q} − ${r}`, d * q - r],
      [`${q} × ${r} + ${d}`, q * r + d],
      [`${d} + ${q} + ${r}`, d + q + r],
      [`${N} × ${d} + ${r}`, N * d + r],
    ] as [string, number][]
  )
    .filter(([, v]) => v !== N)
    .map(([x]) => x);
  return qcmM(
    pick([
      `${p.nom} a posé ${N} ÷ ${d} : quotient ${q}, reste ${r}. Quel calcul doit redonner ${N} ?`,
      `Pour vérifier ${N} ÷ ${d} = ${q} reste ${r}, quel calcul fait-on ?`,
      `${N} ÷ ${d} : ${p.nom} trouve ${q} reste ${r}. Quel calcul permet de vérifier ?`,
      `On a trouvé ${N} ÷ ${d} = ${q} reste ${r}. Quel calcul doit donner ${N} ?`,
    ]),
    `${d} × ${q} + ${r}`,
    faux,
    exp(
      "Une division se vérifie par une multiplication : dividende = diviseur × quotient + reste.",
      "On multiplie le diviseur par le quotient, puis on ajoute le reste.",
      `${d} × ${q} = ${d * q}, puis ${d * q} + ${r} = ${N}.`,
      `Le calcul est ${d} × ${q} + ${r}.`,
    ),
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
  if (z) types.push("zero");
  if (r > 0) types.push("oubliReste");
  const t = pick(types);
  const [qe, re] =
    t === "juste" ? [q, r] : t === "resteTrop" ? [q - 1, r + d] : t === "quotientTrop" ? [q + 1, r] : t === "zero" ? [z!, r] : [q, 0];
  const J = "C’est juste.";
  const RT = "Faux : le reste est trop grand, on pouvait faire un groupe de plus.";
  const QT = "Faux : le quotient est trop grand.";
  const Z = "Faux : il manque un 0 au quotient.";
  const OR = `Faux : ${p.il} a oublié le reste.`;
  const quatrieme = t === "zero" ? Z : t === "oubliReste" ? OR : z ? Z : OR;
  const bonne = { juste: J, resteTrop: RT, quotientTrop: QT, zero: Z, oubliReste: OR }[t];
  const choices = shuffle([J, RT, QT, quatrieme]);
  const pourquoi = {
    juste: `${d} × ${q}${r ? ` + ${r}` : ""} = ${N} et ${r} < ${d} : tout est juste.`,
    resteTrop: `Le reste ${re} n’est pas plus petit que ${d} : on pouvait encore faire un groupe. ${verif(D)}.`,
    quotientTrop: `${d} × ${qe} = ${d * qe}, c’est plus que ${N}. Le bon quotient est ${q}.`,
    zero: `${d} × ${qe} = ${d * qe}, très loin de ${N} : il manque un 0 au quotient. Le bon quotient est ${q}.`,
    oubliReste: `${d} × ${q} = ${d * q}, il manque ${r} pour faire ${N} : le reste est ${r}.`,
  }[t];
  return {
    text: habille(
      pick([
        `${p.nom} pose ${N} ÷ ${d} et trouve : quotient ${qe}, reste ${re}. Qu’en penses-tu ?`,
        `Voici la division ${deM(p.nom)} : ${N} ÷ ${d} = ${qe} reste ${re}. Est-ce juste ?`,
        `${p.nom} annonce : « ${N} ÷ ${d}, ça fait ${qe} et il reste ${re}. » A-t-${p.il} raison ?`,
        `Vérifie le travail ${deM(p.nom)} : ${N} ÷ ${d}, quotient ${qe}, reste ${re}.`,
      ]),
    ),
    format: "qcm",
    choices,
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "On vérifie une division : dividende = diviseur × quotient + reste, et le reste doit être plus petit que le diviseur.",
      `On calcule ${d} × ${qe} + ${re} et on compare à ${N}.`,
      pourquoi,
      t === "juste" ? `${p.nom} a raison.` : `${N} ÷ ${d} = ${q}${r ? ` reste ${r}` : ""}.`,
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
    expPose(D, partage ? `Il y a ${q} ${s.chose.des} pour chaque ${s.qui.un}.` : `On remplit ${q} ${s.boite.des}.`),
    Math.random() < 0.75 ? potence(D, "Pose la division.") : partage ? barreEgale(d, null, String(N)) : barreGroupes(d, N, s.boite),
  );
}

/* ---------------- DIVISION_RESTE ---------------- */

function resteQ(e: E5): Q {
  const petit = e <= 3 && Math.random() < 0.3;
  const D = tirageReste(petit ? "petit" : e);
  const { N, d, q, r } = D;
  const p = quelquun();
  const m = unMetier();
  const s = petit ? sitDessinable() : undefined;
  return qcmM(
    pick([
      `Quel est le reste de ${N} ÷ ${d} ?`,
      `Dans la division ${N} ÷ ${d}, quel est le reste ?`,
      `${p.nom} calcule ${N} ÷ ${d}. Combien reste-t-il à la fin ?`,
      `${N} ÷ ${d} = ${q} reste … Quel est le reste ?`,
      `Pose ${N} ÷ ${d}. Quel est le reste ?`,
      `Dans la table de ${d}, le multiple juste avant ${N} est ${d * q}. Quel est le reste de ${N} ÷ ${d} ?`,
      `${m.nom} divise ${N} par ${d}. Quel reste trouve-t-${m.il} ?`,
    ]),
    String(r),
    [String(q), String(r + d), "0", String(d - r), String(r + 1), String(d)],
    exp(
      "Le reste, c’est ce qui reste quand on a fait tous les groupes complets. Il est toujours plus petit que le diviseur.",
      `On cherche le plus grand multiple de ${d} qui ne dépasse pas ${N}.`,
      `${d} × ${q} = ${d * q} et ${d} × ${q + 1} = ${d * (q + 1)}. ${N} − ${d * q} = ${r}.`,
      `Le reste est ${r} (et le quotient ${q}).`,
    ),
    dessinReste(D, s),
  );
}

function quotientResteQ(e: E5): Q {
  const petit = e <= 3 && Math.random() < 0.25;
  const D = tirageReste(petit ? "petit" : e);
  const { N, d, q, r } = D;
  const p = quelquun();
  const f = (a: number, b: number) => `${a} reste ${b}`;
  const pieges = [f(q, 0), f(q + 1, r), f(q, r + 1)];
  if (q > 1) pieges.push(f(q - 1, r + d));
  if (r !== q && !(d * r + q === N && q < d)) pieges.push(f(r, q));
  return qcmM(
    pick([
      `${N} ÷ ${d} = ? Donne le quotient et le reste.`,
      `${p.nom} pose ${N} ÷ ${d}. Qu’écrit-${p.il} à la fin ?`,
      `Quel est le résultat de la division ${N} ÷ ${d} ?`,
      `Complète : ${N} ÷ ${d} = … reste …`,
      `Effectue la division ${N} ÷ ${d}.`,
    ]),
    f(q, r),
    pieges,
    exp(
      "Diviser avec un reste : dividende = diviseur × quotient + reste, avec un reste plus petit que le diviseur.",
      `On cherche combien de fois ${d} va dans ${N}, puis ce qui reste.`,
      `${d} × ${q} = ${d * q}, et ${N} − ${d * q} = ${r}, plus petit que ${d}.`,
      `${N} ÷ ${d} = ${q} reste ${r}.`,
    ),
    dessinReste(D, petit ? sitDessinable() : undefined),
  );
}

/** Quel reste est possible (ou impossible) dans une division par d ? */
function restePossibleQ(): Q {
  const d = rint(3, 9);
  const p = quelquun();
  const fam = rint(1, 3);
  const regle = exp(
    "Le reste est toujours plus petit que le diviseur.",
    `Si le reste valait ${d} ou plus, on pourrait encore faire un groupe de ${d}.`,
    `Dans une division par ${d}, les restes possibles vont de 0 à ${d - 1}.`,
    "",
  );
  const dessin = () => (d <= 5 ? objetsGroupes(quoiDessin(), 2, d, d - 1) : undefined);
  if (fam === 1) {
    const ok = rint(1, d - 1);
    return qcmM(
      pick([
        `Dans une division par ${d}, quel nombre peut être le reste ?`,
        `${p.nom} divise un nombre par ${d}. Quel reste peut-${p.il} trouver ?`,
        `On divise par ${d}. Lequel de ces nombres peut être le reste ?`,
      ]),
      String(ok),
      [String(d), String(d + 1), String(d + 2), String(2 * d)],
      regle + `${ok} est plus petit que ${d} : c’est possible.`,
      parfois(0.6, dessin),
    );
  }
  if (fam === 2) {
    const ko = d + rint(0, 2);
    const oks = shuffle(Array.from({ length: d - 1 }, (_, i) => i + 1)).slice(0, 3);
    return qcmM(
      pick([
        `Dans une division par ${d}, quel reste est impossible ?`,
        `${p.nom} divise par ${d}. Quel reste ne peut-${p.il} PAS trouver ?`,
        `On divise par ${d}. Lequel de ces nombres ne peut pas être le reste ?`,
      ]),
      String(ko),
      oks.map(String),
      regle + `${ko} n’est pas plus petit que ${d} : c’est impossible.`,
      parfois(0.6, dessin),
    );
  }
  return qcmN(
    pick([
      `Quel est le plus grand reste possible dans une division par ${d} ?`,
      `${p.nom} divise un nombre par ${d}. Quel est le plus grand reste qu’${p.il} peut trouver ?`,
      `Dans une division par ${d}, le reste peut aller jusqu’à combien ?`,
    ]),
    d - 1,
    [d, d + 1, d - 2, 2 * d - 1],
    regle + `Le plus grand reste est ${d - 1}.`,
    parfois(0.7, dessin),
  );
}

/** Combien de paquets COMPLETS ? Le reste ne fait pas un paquet. */
function sachetsCompletsQ(e: E5): Q {
  const petit = e <= 3 && Math.random() < 0.35;
  const s = petit ? sitDessinable() : sit();
  const D = tirageReste(petit ? "petit" : e);
  const { N, d: k, q, r } = D;
  const c = s.chose;
  const b = s.boite;
  const p = quelquun();
  const tournures = [
    `${s.ou}, on range ${N} ${c.des} dans des ${b.des} de ${k}. Combien ${deM(b.des)} ${complets(b)} ?`,
    `${p.nom} a ${N} ${c.des}. ${maj(p.il)} les met par ${k} dans des ${b.des}. Combien ${deM(b.des)} ${complets(b)} remplit-${p.il} ?`,
    `Avec ${N} ${c.des}, combien ${deM(b.des)} ${complets(b)} de ${k} peut-on faire ?`,
    `${N} ${c.des}, ${k} par ${b.un} : combien ${deM(b.des)} ${complets(b)} ?`,
  ];
  if (s.metier) tournures.push(`${s.metier.nom} range ${N} ${c.des} par ${b.des} de ${k}. Combien ${deM(b.des)} ${complets(b)} obtient-${s.metier.il} ?`);
  return qcmN(
    pick(tournures),
    q,
    [q + 1, r, q - 1, k, N - k],
    exp(
      "Quand on demande les groupes complets, le reste ne compte pas comme un groupe.",
      `On divise : ${N} ÷ ${k}.`,
      `${k} × ${q} = ${k * q}, il reste ${r} ${c.des}, pas assez pour ${unUne(b)} ${b.un} de plus.`,
      `On remplit ${q} ${b.des} ${complets(b)}.`,
    ),
    petit && s.dessin ? objetsEnVrac(s.dessin, N) : Math.random() < 0.5 ? barreGroupes(k, N, b) : potence(D, `Combien ${deM(b.des)} ${complets(b)} ?`),
  );
}

/** Combien en reste-t-il à part ? */
function resteContexteQ(e: E5): Q {
  const petit = e <= 3 && Math.random() < 0.35;
  const s = petit ? sitDessinable() : sit();
  const D = tirageReste(petit ? "petit" : e);
  const { N, d: k, q, r } = D;
  const c = s.chose;
  const b = s.boite;
  const p = quelquun();
  const pleins = `${b.fem ? "toutes" : "tous"} les ${b.des} sont ${b.fem ? "pleines" : "pleins"}`;
  const tournures = [
    `${s.ou}, on range ${N} ${c.des} dans des ${b.des} de ${k}. Combien ${deM(c.des)} reste-t-il à part ?`,
    `${p.nom} fait des ${b.des} de ${k} avec ${N} ${c.des}. Combien ${deM(c.des)} restent hors des ${b.des} ?`,
    `On met ${N} ${c.des} par ${k}. Quand ${pleins}, combien ${deM(c.des)} reste-t-il ?`,
    `${N} ${c.des} à ranger par ${b.des} de ${k}. Combien en reste-t-il à la fin ?`,
  ];
  if (s.metier) tournures.push(`${s.metier.nom} range ${N} ${c.des} par ${b.des} de ${k}. Combien ${deM(c.des)} lui reste-t-il à part ?`);
  return qcmN(
    pick(tournures),
    r,
    [q, r + k, k - r, k, r + 1],
    exp(
      "Le reste, c’est ce qui ne remplit pas un groupe complet.",
      `On divise : ${N} ÷ ${k}.`,
      `${k} × ${q} = ${k * q}, et ${N} − ${k * q} = ${r}.`,
      `Il reste ${r} ${c.des} (${q} ${b.des} sont ${b.fem ? "pleines" : "pleins"}).`,
    ),
    petit && s.dessin ? objetsEnVrac(s.dessin, N) : dessinReste(D),
  );
}

type Transport = { ou: string; qui: string; cont: Nom };
const TRANSPORTS: readonly Transport[] = [
  { ou: "Pour la sortie scolaire", qui: "élèves", cont: nm("minibus", "minibus") },
  { ou: "Au camping", qui: "campeurs", cont: nm("tente", "tentes", true) },
  { ou: "À la cantine", qui: "enfants", cont: nm("table", "tables", true) },
  { ou: "Au lac", qui: "promeneurs", cont: nm("barque", "barques", true) },
  { ou: "À la montagne", qui: "skieurs", cont: nm("cabine", "cabines", true) },
  { ou: "Au spectacle de l’école", qui: "parents", cont: nm("rangée de chaises", "rangées de chaises", true) },
  { ou: "Au parc d’attractions", qui: "visiteurs", cont: nm("wagon", "wagons") },
  { ou: "À la gare", qui: "voyageurs", cont: nm("taxi", "taxis") },
  { ou: "Au club de canoë", qui: "sportifs", cont: nm("canoë", "canoës") },
  { ou: "Pour l’excursion", qui: "randonneurs", cont: nm("voiture", "voitures", true) },
  { ou: "En colonie", qui: "enfants", cont: nm("chambre", "chambres", true) },
  { ou: "Au mariage", qui: "invités", cont: nm("table", "tables", true) },
  { ou: "Au stade", qui: "supporters", cont: nm("car", "cars") },
  { ou: "À l’aéroport", qui: "passagers", cont: nm("navette", "navettes", true) },
];

/** Il faut UN de plus pour le reste : « combien de voitures pour tout le monde ? ». */
function combienFautIlQ(e: E5): Q {
  const T = pick(TRANSPORTS);
  const D = e >= 5 ? div(rint(4, 9), rint(8, 20)) : tirageReste(e);
  if (D.r === 0) {
    D.r = rint(1, D.d - 1);
    D.N += D.r;
  }
  const { N, d: k, q, r } = D;
  const c = T.cont;
  const p = quelquun();
  const vides = e >= 5 && Math.random() < 0.35;
  const text = vides
    ? pick([
        `${T.ou}, ${N} ${T.qui} prennent place dans des ${c.des} de ${k} places. On remplit au maximum. Combien de places restent vides dans ${c.fem ? "la dernière" : "le dernier"} ?`,
        `${N} ${T.qui}, ${k} places par ${c.un}. On en remplit le plus possible. Combien de places vides reste-t-il dans ${c.fem ? "la dernière" : "le dernier"} ?`,
      ])
    : pick([
        `${T.ou}, ${N} ${T.qui} doivent prendre place dans des ${c.des} de ${k} places. Combien ${deM(c.des)} faut-il au minimum ?`,
        `${N} ${T.qui}, ${k} places par ${c.un}. Combien ${deM(c.des)} faut-il pour que personne ne reste à part ?`,
        `${T.ou}, chaque ${c.un} a ${k} places. Il y a ${N} ${T.qui}. Combien ${deM(c.des)} faut-il pour tout le monde ?`,
        `${p.nom} organise : ${N} ${T.qui}, des ${c.des} de ${k} places. Combien ${deM(c.des)} doit-${p.il} prévoir ?`,
      ]);
  return qcmN(
    text,
    vides ? k - r : q + 1,
    vides ? [r, k, q, k - r + 1] : [q, r, q + r, q + 2],
    exp(
      "Le reste aussi a besoin de place : il faut parfois un groupe de plus.",
      `On divise : ${N} ÷ ${k}.`,
      `${N} ÷ ${k} = ${q} reste ${r} : ${q} ${c.des} pleins, et ${r} ${T.qui} de plus.`.replace(" pleins", c.fem ? " pleines" : " pleins"),
      vides
        ? `${c.fem ? "La dernière" : "Le dernier"} n’a que ${r} ${T.qui} : il reste ${k - r} places vides.`
        : `Il faut ${q + 1} ${c.des}.`,
    ),
    Math.random() < 0.5
      ? barre([[`1 ${c.un}`, `${k} places`], ["encore…", null]], `${N} ${T.qui}`, `Combien ${deM(c.des)} pour tout le monde ?`)
      : potence(D, "Et ceux qui restent ?"),
  );
}

/** Combien en manque-t-il pour remplir un paquet de plus ? */
function combienManqueQ(e: E5): Q {
  const petit = e <= 3 && Math.random() < 0.3;
  const s = petit ? sitDessinable() : sit();
  const D = tirageReste(petit ? "petit" : e);
  const { N, d: k, q, r } = D;
  const c = s.chose;
  const b = s.boite;
  const p = quelquun();
  return qcmN(
    pick([
      `On range ${N} ${c.des} par ${b.des} de ${k}. Combien ${deM(c.des)} manque-t-il pour remplir ${unUne(b)} ${b.un} de plus ?`,
      `${p.nom} a ${N} ${c.des} et fait des ${b.des} de ${k}. Combien ${deM(c.des)} lui manque-t-il pour ${unUne(b)} ${b.un} de plus ?`,
      `${s.ou}, ${N} ${c.des} sont ${accord("rangé", c)} par ${k}. Combien en faudrait-il en plus pour que le dernier paquet soit plein ?`,
    ]),
    k - r,
    [r, k, q, k - r + 1, k + r],
    exp(
      "Le reste ne remplit pas un paquet : il manque la différence avec le diviseur.",
      `On divise ${N} ÷ ${k}, puis on compare le reste à ${k}.`,
      `${N} ÷ ${k} = ${q} reste ${r}, et ${k} − ${r} = ${k - r}.`,
      `Il manque ${k - r} ${c.des}.`,
    ),
    petit && s.dessin ? objetsEnVrac(s.dessin, N) : potence(D, "Que reste-t-il ? Combien en manque-t-il ?"),
  );
}

/** dividende = diviseur × quotient + reste. */
function egaliteQ(e: E5): Q {
  const D = tirageReste(e);
  const { N, d, q, r } = D;
  const p = quelquun();
  if (Math.random() < 0.5) {
    const faux = (
      [
        [`${N} = ${d} × ${q} − ${r}`, d * q - r],
        [`${N} = ${d} × ${r} + ${q}`, d * r + q],
        [`${N} = ${d} + ${q} + ${r}`, d + q + r],
        [`${N} = ${d} × ${q + 1} + ${r}`, d * (q + 1) + r],
      ] as [string, number][]
    )
      .filter(([, v]) => v !== N)
      .map(([x]) => x);
    return qcmM(
      pick([
        `${N} ÷ ${d} = ${q} reste ${r}. Quelle égalité est juste ?`,
        `${p.nom} trouve ${N} ÷ ${d} = ${q} reste ${r}. Quelle égalité le prouve ?`,
        `Quelle égalité correspond à la division ${N} ÷ ${d} = ${q} reste ${r} ?`,
      ]),
      `${N} = ${d} × ${q} + ${r}`,
      faux,
      exp("dividende = diviseur × quotient + reste.", "On multiplie le diviseur par le quotient, puis on ajoute le reste.", `${d} × ${q} = ${d * q} ; ${d * q} + ${r} = ${N}.`, `${N} = ${d} × ${q} + ${r}.`),
      potence(D, "dividende = diviseur × quotient + reste"),
    );
  }
  return qcmN(
    pick([`Complète : ${N} = ${d} × ${q} + … (le reste).`, `${N} = ${d} × ${q} + ? Quel nombre manque ?`, `${p.nom} écrit ${N} = ${d} × ${q} + … Que vaut le reste ?`]),
    r,
    [q, r + d, d, r + 1, d - r],
    exp("dividende = diviseur × quotient + reste.", `On calcule ${d} × ${q}, puis ce qui manque pour aller jusqu’à ${N}.`, `${d} × ${q} = ${d * q}, et ${N} − ${d * q} = ${r}.`, `Le reste est ${r}.`),
    parfois(0.7, () => tableMultiples(D)),
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
    [f(q, 0), f(q + 1, r), ...(q > 1 ? [f(q - 1, r + k)] : []), f(q, r + 1)],
    exp("Le dessin montre les paquets complets (le quotient) et ce qui reste à part (le reste).", `On compte les paquets de ${k}, puis les ${c.des} ${accord("seul", c)}.`, `${q} paquets de ${k} : ${k * q} ; il en reste ${r}. ${k} × ${q} + ${r} = ${N}.`, `${f(q, r)}.`),
    objetsGroupes(s.dessin!, q, k, r),
  );
}

/* ---------------- DIVISION_PROBLEME ---------------- */

/** Les nombres d'un problème (★3) : n de 2 à 8 (le dessin en barres tient), quotient de 4 à 15. */
const nombresPb = (): [number, number] => [rint(2, 8), rint(4, 15)];
const piegesPb = (t: number, n: number, q: number) => [t - n, n, q + 1, q - 1, t * n, q + n];

function partagePbQ(): Q {
  const [n, q] = nombresPb();
  const t = n * q;
  const s = sit();
  return qcmN(
    textePartage(s, t, n, quelquun(), 3),
    q,
    piegesPb(t, n, q),
    exp("Partager en parts égales, c’est diviser.", `On divise le total par le nombre de parts : ${t} ÷ ${n}.`, calculDivision(t, n, q), `Il y a ${q} ${s.chose.des} pour chaque ${s.qui.un}.`),
    dessinPartage(s, t, n),
  );
}

function groupementPbQ(): Q {
  const [n, q] = nombresPb();
  const t = n * q;
  const s = sit();
  return qcmN(
    texteGroupement(s, t, n, quelquun(), 3),
    q,
    piegesPb(t, n, q),
    exp("Faire des groupes de même taille et les compter, c’est diviser.", `On cherche combien de fois ${n} tient dans ${t} : ${t} ÷ ${n}.`, calculDivision(t, n, q), `On remplit ${q} ${s.boite.des}.`),
    dessinGroupement(s, t, n),
  );
}

/**
 * Un récit de la vie : un partage (n parts, on cherche la part) ou un
 * groupement (n = la taille d'un groupe, on cherche le nombre de groupes).
 */
type Recit = {
  sens: "partage" | "groupement";
  /** L'unité de la réponse (« cm », « € », « jours »…). */
  u: string;
  /** L'unité du total, pour le dessin. */
  ut: string;
  /** Un groupe, pour le dessin d'un groupement (« 1 morceau »). */
  un: string;
  texte: (t: number, n: number, p: Prenom) => string;
  /** Les bornes de n et du quotient si les nombres par défaut sonnent faux. */
  n?: [number, number];
  q?: [number, number];
};
const rc = (sens: Recit["sens"], u: string, ut: string, un: string, texte: Recit["texte"], n?: [number, number], q?: [number, number]): Recit => ({ sens, u, ut, un, texte, n, q });

const RECITS_MESURES: readonly Recit[] = [
  rc("groupement", "morceaux", "cm", "morceau", (t, n) => `La couturière coupe un ruban de ${t} cm en morceaux de ${n} cm. Combien de morceaux obtient-elle ?`),
  rc("partage", "cm", "cm", "", (t, n, p) => `${p.nom} scie une planche de ${t} cm en ${n} morceaux de même longueur. Combien mesure un morceau ?`),
  rc("partage", "m", "m", "", (t, n) => `Une course de relais fait ${t} m. Les ${n} coureurs de l’équipe courent la même distance. Combien de mètres court chacun ?`, [2, 8], [25, 60]),
  rc("partage", "km", "km", "", (t, n) => `Une cycliste parcourt ${t} km en ${n} étapes de même longueur. Combien de kilomètres fait chaque étape ?`, [3, 8], [12, 40]),
  rc("groupement", "guirlandes", "m", "guirlande", (t, n) => `Avec ${t} m de fil, la décoratrice fait des guirlandes de ${n} m. Combien de guirlandes fait-elle ?`),
  rc("partage", "bulbes", "bulbes", "", (t, n) => `Le jardinier plante ${t} bulbes de tulipes en ${n} massifs égaux. Combien de bulbes par massif ?`),
  rc("partage", "L", "L", "", (t, n) => `Le pompier verse ${t} litres d’eau dans ${n} seaux, autant dans chacun. Combien de litres par seau ?`),
  rc("partage", "kg", "kg", "", (t, n) => `Le maçon répartit ${t} kg de sable dans ${n} brouettes, autant dans chacune. Combien de kilos par brouette ?`),
  rc("groupement", "bouteilles", "L", "bouteille", (t, n) => `La cuisinière verse ${t} L de jus dans des bouteilles de ${n} L. Combien de bouteilles remplit-elle ?`, [2, 5]),
];

const RECITS_ARGENT: readonly Recit[] = [
  rc("groupement", "livres", "€", "livre", (t, n, p) => `${p.nom} a ${t} € d’économies. Un livre coûte ${n} €. Combien de livres peut-${p.il} acheter ?`),
  rc("partage", "€", "€", "", (t, n) => `${n} amis offrent un cadeau qui coûte ${t} €. Chacun paie la même somme. Combien paie chacun ?`),
  rc("partage", "€", "€", "", (t, n) => `Le club achète ${n} ballons identiques pour ${t} €. Combien coûte un ballon ?`),
  rc("groupement", "places", "€", "place", (t, n) => `La maîtresse a ${t} € pour la sortie. Une place de cinéma coûte ${n} €. Combien de places peut-elle payer ?`),
  rc("partage", "€", "€", "", (t, n) => `${n} enfants se partagent ${t} € gagnés à la vente de gâteaux. Combien reçoit chacun ?`),
  rc("groupement", "plants", "€", "plant", (t, n) => `La jardinière dépense ${t} € en plants de tomates à ${n} € le plant. Combien de plants achète-t-elle ?`),
  rc("groupement", "semaines", "€", "semaine", (t, n, p) => `${p.nom} met ${n} € de côté chaque semaine. Combien de semaines lui faut-il pour avoir ${t} € ?`),
  rc("partage", "€", "€", "", (t, n) => `Le fleuriste vend ${n} bouquets identiques pour ${t} € en tout. Combien coûte un bouquet ?`),
];

const RECITS_QUOTIDIEN: readonly Recit[] = [
  rc("groupement", "jours", "pages", "jour", (t, n, p) => `Un livre a ${t} pages. ${p.nom} lit ${n} pages par jour. En combien de jours finit-${p.il} le livre ?`),
  rc("partage", "baguettes", "baguettes", "", (t, n) => `La boulangère cuit ${t} baguettes en ${n} fournées égales. Combien de baguettes par fournée ?`),
  rc("groupement", "voyages", "caisses", "voyage", (t, n) => `Un camion porte ${n} caisses à chaque voyage. Il doit livrer ${t} caisses. Combien de voyages fait-il ?`),
  rc("partage", "salades", "salades", "", (t, n) => `Le maraîcher plante ${t} salades en ${n} rangées égales. Combien de salades par rangée ?`),
  rc("partage", "min", "min", "", (t, n) => `La maîtresse a ${t} minutes pour ${n} ateliers de même durée. Combien de minutes dure chaque atelier ?`, [2, 6], [8, 15]),
  rc("groupement", "jours", "comprimés", "jour", (t, n) => `La vétérinaire donne ${n} comprimés par jour à un chien. La boîte en contient ${t}. Combien de jours dure la boîte ?`, [2, 4]),
  rc("groupement", "minutes", "pages", "minute", (t, n) => `L’imprimante sort ${n} pages par minute. Combien de minutes pour imprimer ${t} pages ?`),
  rc("partage", "élèves", "élèves", "", (t, n) => `L’école répartit ${t} élèves en ${n} classes de même effectif. Combien d’élèves par classe ?`, [3, 6], [20, 28]),
  rc("groupement", "rangées", "chaises", "rangée", (t, n) => `Le gardien installe ${t} chaises par rangées de ${n}. Combien de rangées obtient-il ?`),
  rc("partage", "pommes", "pommes", "", (t, n) => `L’arboricultrice cueille ${t} pommes sur ${n} arbres, autant sur chacun. Combien de pommes par arbre ?`),
];

function recitQ(liste: readonly Recit[]): Q {
  const R = pick(liste);
  const n = rint(...(R.n ?? [2, 8]));
  const q = rint(...(R.q ?? [4, 15]));
  const t = n * q;
  const p = quelquun();
  const partage = R.sens === "partage";
  const lu = (v: number) => (["€", "cm", "m", "km", "L", "kg", "min"].includes(R.ut) ? `${v} ${R.ut}` : String(v));
  const pieges = piegesPb(t, n, q);
  const Qn = qcmN(
    R.texte(t, n, p),
    q,
    pieges,
    exp(
      partage ? "Partager en parts égales, c’est diviser." : "Chercher combien de fois une quantité tient dans une autre, c’est diviser.",
      partage ? `On divise le total par le nombre de parts : ${t} ÷ ${n}.` : `On cherche combien de fois ${n} tient dans ${t} : ${t} ÷ ${n}.`,
      calculDivision(t, n, q),
      `La réponse est ${q} ${R.u}.`,
    ),
    partage
      ? barreEgale(n, null, `${t} ${R.ut}`)
      : barre([[`1 ${R.un}`, lu(n)], ["encore…", null]], `${t} ${R.ut}`, `Combien de fois ${lu(n)} dans ${t} ${R.ut} ?`),
  );
  // L'unité dans les choix : « 12 cm », « 7 jours ».
  return { ...Qn, choices: choixN(q, pieges, R.u), expected: [rep(q, R.u)] };
}

/** Quel calcul résout le problème ? Parfois c'est une multiplication (le piège inverse). */
function choisirCalculPbQ(): Q {
  const R = pick([...RECITS_MESURES, ...RECITS_ARGENT, ...RECITS_QUOTIDIEN]);
  const n = rint(...(R.n ?? [2, 8]));
  const q = rint(...(R.q ?? [4, 15]));
  const t = n * q;
  const p = quelquun();
  const question = pick(["Quel calcul permet de répondre ?", "Quel calcul faut-il faire ?", "Quelle opération choisis-tu ?"]);
  if (Math.random() < 0.3) {
    // La même quantité répétée : une multiplication.
    const s = sit();
    const text = pick([
      `${s.ou}, on remplit ${n} ${s.boite.des} de ${q} ${s.chose.des}. Combien ${deM(s.chose.des)} en tout ? ${question}`,
      `${p.nom} lit ${n} pages par jour pendant ${q} jours. Combien de pages lit-${p.il} ? ${question}`,
      `Un ticket coûte ${n} €. On en achète ${q}. Combien paie-t-on ? ${question}`,
    ]);
    return qcmM(
      text,
      `${n} × ${q}`,
      [`${n * q} ÷ ${n}`, `${n} + ${q}`, `${q} ÷ ${n}`],
      exp("On choisit l’opération d’après l’histoire.", "La même quantité revient plusieurs fois : c’est une multiplication, pas une division.", `${n} × ${q} = ${n * q}.`, `Le calcul est ${n} × ${q}.`),
      barreEgale(n, String(q), null),
    );
  }
  return qcmM(
    `${R.texte(t, n, p)} ${question}`,
    `${t} ÷ ${n}`,
    [`${t} × ${n}`, `${n} ÷ ${t}`, `${t} − ${n}`, `${t} + ${n}`],
    exp(
      R.sens === "partage" ? "Partager en parts égales, c’est diviser." : "Chercher combien de fois une quantité tient dans une autre, c’est diviser.",
      "Le grand nombre se partage, il passe en premier.",
      `${t} ÷ ${n} = ${q}.`,
      `Le calcul est ${t} ÷ ${n}.`,
    ),
    R.sens === "partage" ? barreEgale(n, null, `${t} ${R.ut}`) : barre([[`1 ${R.un}`, `${n}`], ["encore…", null]], `${t} ${R.ut}`),
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
  { ou: "À l’atelier de perles", a: "perles bleues", b: "perles rouges", boite: nm("collier", "colliers") },
];

/** Une donnée inutile : on ne divise que ce que la question demande. */
function donneeInutileQ(): Q {
  const D = pick(DUOS);
  const k = rint(2, 8);
  const q = rint(3, 12);
  let m = rint(2, 9);
  while (m === q) m = rint(2, 9);
  const t = k * q;
  const x = k * m;
  const p = quelquun();
  const b = D.boite;
  return qcmN(
    pick([
      `${D.ou}, il y a ${t} ${D.a} et ${x} ${D.b}. On fait des ${b.des} de ${k} ${D.a}. Combien ${deM(b.des)} ${deM(D.a)} ?`,
      `${p.nom} a ${x} ${D.b} et ${t} ${D.a}. ${maj(p.il)} range seulement les ${D.a}, par ${b.des} de ${k}. Combien ${deM(b.des)} remplit-${p.il} ?`,
      `${D.ou}, on compte ${t} ${D.a} et ${x} ${D.b}. Les ${D.a} vont par ${k} dans des ${b.des}. Combien ${deM(b.des)} faut-il ?`,
    ]),
    q,
    [q + m, m, q + 1, t - k],
    exp(
      "Dans un problème, on choisit les nombres utiles : la question ne parle que d’une sorte d’objets.",
      `Les ${x} ${D.b} ne servent pas. On divise : ${t} ÷ ${k}.`,
      calculDivision(t, k, q),
      `Il faut ${q} ${b.des}.`,
    ),
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
  { ou: "Pour le cross de l’école", qui: "coureurs", g: nm("vague", "vagues", true), chef: { nom: "Le professeur de sport", il: "il" } },
  { ou: "Au centre aéré", qui: "enfants", g: nm("atelier", "ateliers"), chef: { nom: "La directrice", il: "elle" } },
  { ou: "À la piscine", qui: "nageurs", g: nm("couloir", "couloirs"), chef: { nom: "La maîtresse-nageuse", il: "elle" } },
  { ou: "Au club de rugby", qui: "joueurs", g: nm("équipe", "équipes", true) },
  { ou: "À l’atelier cuisine", qui: "apprentis cuisiniers", g: nm("plan de travail", "plans de travail"), chef: { nom: "Le chef cuisinier", il: "il" } },
  { ou: "À la fanfare", qui: "musiciens", g: nm("rangée", "rangées", true) },
  { ou: "Au mariage", qui: "invités", g: nm("table", "tables", true), chef: { nom: "Le traiteur", il: "il" } },
  { ou: "Au musée", qui: "visiteurs", g: nm("groupe", "groupes"), chef: { nom: "La guide", il: "elle" } },
  { ou: "Au club de théâtre", qui: "acteurs", g: nm("troupe", "troupes", true) },
];

/** Des équipes, des groupes, des tables : grouper ou partager des personnes. */
function equipesQ(): Q {
  const G = pick(GROUPES);
  const [n, q] = nombresPb();
  const t = n * q;
  const g = G.g;
  const partage = Math.random() < 0.4;
  if (partage) {
    const egaux = g.fem ? "égales" : "égaux";
    return qcmN(
      pick([
        `${G.ou}, ${t} ${G.qui} se répartissent en ${n} ${g.des} ${egaux}. Combien ${deM(G.qui)} dans chaque ${g.un} ?`,
        `${G.chef ? G.chef.nom : "On"} répartit ${t} ${G.qui} en ${n} ${g.des} ${egaux}. Combien ${deM(G.qui)} par ${g.un} ?`,
        `${t} ${G.qui}, ${n} ${g.des}, autant dans chacun : combien ${deM(G.qui)} par ${g.un} ?`.replace("chacun", g.fem ? "chacune" : "chacun"),
      ]),
      q,
      piegesPb(t, n, q),
      exp("Partager en parts égales, c’est diviser.", `${t} ÷ ${n}.`, calculDivision(t, n, q), `Il y a ${q} ${G.qui} par ${g.un}.`),
      barreEgale(n, null, `${t} ${G.qui}`),
    );
  }
  return qcmN(
    pick([
      `${G.ou}, ${t} ${G.qui} font des ${g.des} de ${n}. Combien ${deM(g.des)} y a-t-il ?`,
      `${G.ou}, on répartit ${t} ${G.qui} en ${g.des} de ${n}. Combien ${deM(g.des)} forme-t-on ?`,
      `${t} ${G.qui} se mettent par ${g.des} de ${n}. Combien ${deM(g.des)} ?`,
      `${G.chef ? `${G.chef.nom} a` : "Il y a"} ${t} ${G.qui}. ${G.chef ? maj(G.chef.il) : "On"} fait des ${g.des} de ${n}. Combien ${deM(g.des)} ?`,
    ]),
    q,
    piegesPb(t, n, q),
    exp("Faire des groupes de même taille et les compter, c’est diviser.", `On cherche combien de fois ${n} tient dans ${t} : ${t} ÷ ${n}.`, calculDivision(t, n, q), `On forme ${q} ${g.des}.`),
    barre([[`1 ${g.un}`, String(n)], ["encore…", null]], `${t} ${G.qui}`, `Combien ${deM(g.des)} de ${n} ?`),
  );
}

/* ---------------- DIVISION_DEFI ---------------- */

/** Deux étapes (★4) ou trois (★5) : partager puis ajouter ou retirer. */
function deuxEtapesQ(e: E5): Q {
  const s = sit();
  const c = s.chose;
  const w = s.qui;
  const n = rint(3, 8);
  const q = rint(5, 12);
  const a = rint(2, Math.min(4, q - 1));
  const retire = Math.random() < 0.5;
  const fin = retire ? q - a : q + a;
  const etape2 = retire ? `on reprend ${a} ${c.des} à chaque ${w.un}` : `on donne encore ${a} ${c.des} à chaque ${w.un}`;
  if (e >= 5) {
    const [p1, p2] = deuxPersonnes();
    const t = n * q;
    const x = rint(Math.ceil(t / 4), Math.floor((3 * t) / 4));
    const y = t - x;
    const ils = p1.il === "elle" && p2.il === "elle" ? "Elles" : "Ils";
    return qcmN(
      `Défi : ${p1.nom} a ${x} ${c.des}, ${p2.nom} en a ${y}. ${ils} réunissent tout et partagent entre ${n} ${w.des}. Puis ${etape2}. Combien ${deM(c.des)} pour chaque ${w.un} ?`,
      fin,
      [q, retire ? q + a : q - a, t - a, Math.floor(x / n), fin + 1],
      exp("Un défi en trois étapes : réunir, partager, puis ajuster.", "On calcule dans l’ordre de l’histoire.", `${x} + ${y} = ${t} ; ${t} ÷ ${n} = ${q} ; ${q} ${retire ? "−" : "+"} ${a} = ${fin}.`, `Il y a ${fin} ${c.des} pour chaque ${w.un}.`),
      barre([[p1.nom, String(x)], [p2.nom, String(y)]], null, `Puis ÷ ${n}, puis ${retire ? "−" : "+"} ${a}`),
    );
  }
  const t = n * q;
  return qcmN(
    pick([
      `Défi : ${t} ${c.des} sont ${accord("partagé", c)} entre ${n} ${w.des}. Puis ${etape2}. Combien ${deM(c.des)} pour chaque ${w.un} maintenant ?`,
      `${s.ou}, on partage ${t} ${c.des} entre ${n} ${w.des}. Ensuite, ${etape2}. Combien ${deM(c.des)} pour chaque ${w.un} ?`,
      `${s.metier ? s.metier.nom : "On"} partage ${t} ${c.des} entre ${n} ${w.des}, puis ${etape2.replace(/^on /, s.metier ? "" : "on ")}. Combien ${deM(c.des)} pour chaque ${w.un} à la fin ?`,
    ]),
    fin,
    [q, retire ? q + a : q - a, t - a, t + a, fin + 1],
    exp("Un défi en deux étapes : d’abord partager, puis ajuster.", "On calcule dans l’ordre de l’histoire.", `${t} ÷ ${n} = ${q}, puis ${q} ${retire ? "−" : "+"} ${a} = ${fin}.`, `Il y a ${fin} ${c.des} pour chaque ${w.un}.`),
    parfois(0.8, () => barreEgale(n, null, String(t))),
  );
}

/** Réunir deux quantités, puis partager. */
function reunirPartagerQ(): Q {
  const s = sit();
  const c = s.chose;
  const [p1, p2] = deuxPersonnes();
  const n = rint(3, 8);
  const q = rint(4, 12);
  const t = n * q;
  const x = rint(Math.ceil(t / 4), Math.floor((3 * t) / 4));
  const y = t - x;
  const ils = p1.il === "elle" && p2.il === "elle" ? "elles" : "ils";
  return qcmN(
    pick([
      `${p1.nom} a ${x} ${c.des} et ${p2.nom} en a ${y}. ${maj(ils)} mettent tout ensemble et font ${n} parts égales. Combien ${deM(c.des)} dans chaque part ?`,
      `Défi : ${x} ${c.des} d’un côté, ${y} de l’autre. On réunit tout et on partage entre ${n} ${s.qui.des}. Combien pour chaque ${s.qui.un} ?`,
      `${s.ou}, ${p1.nom} apporte ${x} ${c.des} et ${p2.nom} ${y}. On les partage entre ${n} ${s.qui.des}. Combien ${deM(c.des)} pour chaque ${s.qui.un} ?`,
    ]),
    q,
    [t, t - n, q + 1, Math.floor(x / n) + y, q - 1],
    exp("Deux étapes : d’abord réunir, ensuite partager.", "On additionne, puis on divise le total.", `${x} + ${y} = ${t}, puis ${t} ÷ ${n} = ${q}.`, `${q} ${c.des} dans chaque part.`),
    barre([[p1.nom, String(x)], [p2.nom, String(y)]], null, `Le total, puis ÷ ${n}`),
  );
}

/** Je pense à un nombre : divisé par d, il donne q reste r. */
function nombreMystereQ(): Q {
  const d = rint(3, 9);
  const q = rint(4, 15);
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

/** Le plus grand (ou le plus petit) dividende pour un quotient donné. */
function extremeDividendeQ(): Q {
  const d = rint(3, 9);
  const q = rint(4, 12);
  const grand = Math.random() < 0.6;
  const p = quelquun();
  const rep_ = grand ? d * q + d - 1 : d * q;
  return qcmN(
    grand
      ? pick([
          `Défi : dans une division par ${d}, le quotient est ${q}. Quel est le plus grand dividende possible ?`,
          `${p.nom} divise un nombre par ${d} et trouve le quotient ${q}. Quel est le plus grand nombre possible ?`,
        ])
      : pick([
          `Défi : dans une division par ${d}, le quotient est ${q}. Quel est le plus petit dividende possible ?`,
          `${p.nom} divise un nombre par ${d} et trouve le quotient ${q}. Quel est le plus petit nombre possible ?`,
        ]),
    rep_,
    grand ? [d * q, d * (q + 1), d * q + d, d + q] : [d * q - 1, d * q + 1, d * q + d - 1, d + q],
    exp(
      "dividende = diviseur × quotient + reste, et le reste va de 0 au diviseur moins 1.",
      grand ? `Le plus grand reste possible est ${d - 1}.` : "Le plus petit reste possible est 0.",
      `${d} × ${q} + ${grand ? d - 1 : 0} = ${rep_}.`,
      `Le ${grand ? "plus grand" : "plus petit"} dividende est ${rep_}.`,
    ),
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

/** Le prix d'un, puis le prix de plusieurs : diviser, puis multiplier. */
function prixUnitaireQ(): Q {
  const art = pick(ARTICLES);
  const k = rint(2, 9);
  const n = rint(3, 8);
  let m = rint(2, 9);
  while (m === n) m = rint(2, 9);
  const t = k * n;
  const p = quelquun();
  return {
    ...qcmN(
      pick([
        `${n} ${art} coûtent ${t} €. Combien coûtent ${m} ${art} ?`,
        `${p.nom} paie ${t} € pour ${n} ${art}. Combien paierait-${p.il} pour ${m} ${art} ?`,
        `Défi : si ${n} ${art} coûtent ${t} €, combien coûtent ${m} ${art} au même prix ?`,
        `Au magasin, ${n} ${art} valent ${t} €. Quel est le prix de ${m} ${art} ?`,
      ]),
      m * k,
      [k, n * m, t + m - n, t * m, m * k + k],
      exp("Deux étapes : d’abord le prix d’un, ensuite le prix de plusieurs.", `On divise ${t} € par ${n}, puis on multiplie par ${m}.`, `${t} ÷ ${n} = ${k} € ; ${k} × ${m} = ${m * k} €.`, `${m} ${art} coûtent ${m * k} €.`),
      {
        kind: "tableau_donnees",
        coin: "",
        headers: ["Achat 1", "Achat 2"],
        rows: [
          { label: `Nombre de ${art}`, values: [n, m] },
          { label: "Prix (€)", values: [t, "?"] },
        ],
        display: { compact: true },
      } as TableauDonneesCanvasData,
    ),
    choices: choixN(m * k, [k, n * m, t + m - n, t * m, m * k + k], "€"),
    expected: [rep(m * k, "€")],
  };
}

/** Partager deux fois : entre les groupes, puis dans chaque groupe. */
function partageDeuxFoisQ(): Q {
  const s = sit();
  const c = s.chose;
  const G = pick([
    { g: nm("classe", "classes", true), m: "groupes" },
    { g: nm("équipe", "équipes", true), m: "joueurs" },
    { g: nm("table", "tables", true), m: "enfants" },
    { g: nm("famille", "familles", true), m: "enfants" },
    { g: nm("patrouille", "patrouilles", true), m: "scouts" },
    { g: nm("cabane", "cabanes", true), m: "campeurs" },
  ]);
  const a = rint(2, 5);
  const b = rint(2, 5);
  const q = rint(2, 9);
  const t = a * b * q;
  return qcmN(
    pick([
      `Défi : ${t} ${c.des} sont ${accord("partagé", c)} entre ${a} ${G.g.des}. Dans chaque ${G.g.un}, on partage ensuite entre ${b} ${G.m}. Combien ${deM(c.des)} pour chacun des ${G.m} ?`,
      `Pour la grande fête, on partage ${t} ${c.des} entre ${a} ${G.g.des}, puis chaque ${G.g.un} partage sa part entre ses ${b} ${G.m}. Combien ${deM(c.des)} pour chacun ?`,
    ]),
    q,
    [t / a, t / b, a * b, q + 1, Number.isInteger(t / (a + b)) ? t / (a + b) : q * a],
    exp("Deux partages à la suite.", `On partage d’abord entre les ${a} ${G.g.des}, puis chaque part entre ${b}.`, `${t} ÷ ${a} = ${t / a}, puis ${t / a} ÷ ${b} = ${q}.`, `Chacun reçoit ${q} ${c.des}.`),
    barreEgale(a, null, String(t)),
  );
}

/** « 3 fois plus » : le total en parts égales. */
function partsInegalesQ(): Q {
  const [p1, p2] = deuxPersonnes();
  const c = sit().chose;
  const m = rint(2, 5);
  const x = rint(3, 15);
  const t = x * (m + 1);
  const eux = p1.il === "elle" && p2.il === "elle" ? "elles" : "eux";
  const ils = eux === "elles" ? "elles" : "ils";
  const pourP2 = Math.random() < 0.6;
  const rep_ = pourP2 ? x : x * m;
  return qcmN(
    `Défi : ${p1.nom} a ${m} fois plus ${deM(c.des)} ${/^[aeiouyàâéèêëîïôœh]/i.test(p2.nom) ? "qu’" : "que "}${p2.nom}. À ${eux} deux, ${ils} en ont ${t}. Combien ${pourP2 ? p2.nom : p1.nom} en a-t-${(pourP2 ? p2 : p1).il} ?`,
    rep_,
    pourP2 ? [Math.floor(t / m), x * m, Math.floor(t / 2), t - m] : [x, Math.floor(t / m), Math.floor(t / 2), t - x * (m - 1)],
    exp(
      `${p2.nom} a 1 part, ${p1.nom} en a ${m} : ensemble, ${m + 1} parts égales.`,
      `On divise le total par ${m + 1}.`,
      `${t} ÷ ${m + 1} = ${x} ; ${p1.nom} a ${m} × ${x} = ${x * m}.`,
      `${pourP2 ? p2.nom : p1.nom} a ${rep_} ${c.des}.`,
    ),
    barre(
      [[p2.nom, null], ...Array.from({ length: m }, () => [p1.nom, null] as [string, null])],
      String(t),
    ),
  );
}

/* ---------------- L'installation ---------------- */

function gab5(id: string, microId: string, difficulty: E5, hint: string, tags: string[], generate: () => Q): TutorBankItemV4 {
  return { ...gab(id, microId, 1, hint, tags, generate), difficulty } as TutorBankItemV4;
}

const P = "division_posee";
const R_ = "division_reste";
const PB = "division_probleme";
const DF = "division_defi";

const GABARITS_POSEE_DEFI: TutorBankItemV4[] = [
  // DIVISION_POSEE ★2 : 2 chiffres ÷ 1 chiffre, les étapes de la potence.
  gab5("cm1_division_posee_tpl_quotient_e2", P, 2, "Commence par la gauche : les dizaines d’abord.", ["posee", "canvas"], () => quotientQ(2)),
  gab5("cm1_division_posee_tpl_etapes_e2", P, 2, "Le reste des dizaines s’échange contre des unités.", ["posee", "etapes", "canvas"], () => etapesQ(2)),
  gab5("cm1_division_posee_tpl_nb_chiffres_e2", P, 2, "Compare le premier chiffre à gauche au diviseur.", ["posee", "estimation"], () => nbChiffresQ(2)),
  gab5("cm1_division_posee_tpl_premier_pas_e2", P, 2, "On commence par la gauche, jamais par les unités.", ["posee", "methode", "canvas"], () => premierPasQ(2)),
  gab5("cm1_division_posee_tpl_probleme_e2", P, 2, "Pose la division : total ÷ nombre de parts.", ["posee", "probleme", "canvas"], () => problemePoseQ(2)),
  // ★3 : jusqu'à 3 chiffres, vérifier.
  gab5("cm1_division_posee_tpl_etapes_e3", P, 3, "Le reste des dizaines s’échange contre des unités.", ["posee", "etapes", "canvas"], () => etapesQ(3)),
  gab5("cm1_division_posee_tpl_nb_chiffres_e3", P, 3, "Compare le premier chiffre à gauche au diviseur.", ["posee", "estimation"], () => nbChiffresQ(3)),
  gab5("cm1_division_posee_tpl_premier_pas_e3", P, 3, "Si le premier chiffre est trop petit, prends les deux premiers.", ["posee", "methode", "canvas"], () => premierPasQ(3)),
  gab5("cm1_division_posee_tpl_verifier_e3", P, 3, "dividende = diviseur × quotient + reste.", ["posee", "verification", "canvas"], () => verifierPoseQ(tiragePose(3, true))),
  gab5("cm1_division_posee_tpl_probleme_e3", P, 3, "Pose la division : total ÷ nombre de parts.", ["posee", "probleme", "canvas"], () => problemePoseQ(3)),
  // ★4 : 3 chiffres, le 0 du quotient, l'erreur d'un élève.
  gab5("cm1_division_posee_tpl_quotient_e4", P, 4, "N’oublie pas le 0 quand le diviseur ne va pas.", ["posee", "zero", "canvas"], () => quotientQ(4)),
  gab5("cm1_division_posee_tpl_nb_chiffres_e4", P, 4, "Compare le premier chiffre à gauche au diviseur.", ["posee", "estimation"], () => nbChiffresQ(4)),
  gab5("cm1_division_posee_tpl_premier_pas_e4", P, 4, "Si le premier chiffre est trop petit, prends les deux premiers.", ["posee", "methode", "canvas"], () => premierPasQ(4)),
  gab5("cm1_division_posee_tpl_verifier_e4", P, 4, "dividende = diviseur × quotient + reste.", ["posee", "verification", "canvas"], () => verifierPoseQ(tiragePose(4, true))),
  gab5("cm1_division_posee_tpl_probleme_e4", P, 4, "Pose la division : total ÷ nombre de parts.", ["posee", "probleme", "canvas"], () => problemePoseQ(4)),

  // DIVISION_RESTE ★3 : trouver le reste, le reste plus petit que le diviseur.
  gab5("cm1_division_reste_tpl_reste_e3", R_, 3, "Cherche le plus grand multiple du diviseur qui ne dépasse pas.", ["reste", "canvas"], () => resteQ(3)),
  gab5("cm1_division_reste_tpl_quotient_reste_e3", R_, 3, "Le reste est plus petit que le diviseur.", ["reste", "canvas"], () => quotientResteQ(3)),
  gab5("cm1_division_reste_tpl_possible_e3", R_, 3, "Le reste est toujours plus petit que le diviseur.", ["reste", "propriete"], restePossibleQ),
  gab5("cm1_division_reste_tpl_complets_e3", R_, 3, "Le reste ne fait pas un paquet complet.", ["reste", "interpretation", "canvas"], () => sachetsCompletsQ(3)),
  gab5("cm1_division_reste_tpl_a_part_e3", R_, 3, "Ce qui ne remplit pas un paquet, c’est le reste.", ["reste", "interpretation", "canvas"], () => resteContexteQ(3)),
  gab5("cm1_division_reste_tpl_dessin_e3", R_, 3, "Compte les paquets complets, puis ce qui reste à part.", ["reste", "canvas"], dessinResteQ),
  // ★4 : interpréter le reste, l'égalité, l'erreur d'un élève.
  gab5("cm1_division_reste_tpl_quotient_reste_e4", R_, 4, "Le reste est plus petit que le diviseur.", ["reste", "canvas"], () => quotientResteQ(4)),
  gab5("cm1_division_reste_tpl_a_part_e4", R_, 4, "Ce qui ne remplit pas un paquet, c’est le reste.", ["reste", "interpretation", "canvas"], () => resteContexteQ(4)),
  gab5("cm1_division_reste_tpl_faut_il_e4", R_, 4, "Ceux qui restent ont besoin de place aussi.", ["reste", "interpretation", "canvas"], () => combienFautIlQ(4)),
  gab5("cm1_division_reste_tpl_manque_e4", R_, 4, "Compare le reste au diviseur.", ["reste", "interpretation", "canvas"], () => combienManqueQ(4)),
  gab5("cm1_division_reste_tpl_egalite_e4", R_, 4, "dividende = diviseur × quotient + reste.", ["reste", "verification", "canvas"], () => egaliteQ(4)),
  gab5("cm1_division_reste_tpl_erreur_e4", R_, 4, "Vérifie : diviseur × quotient + reste, et reste plus petit que le diviseur.", ["reste", "erreur", "canvas"], () => erreurQ(tirageReste(4))),

  // DIVISION_PROBLEME ★3 : des récits de la vie, chacun son dessin.
  gab5("cm1_division_probleme_tpl_partage_e3", PB, 3, "Partager en parts égales, c’est diviser.", ["probleme", "partage", "canvas"], partagePbQ),
  gab5("cm1_division_probleme_tpl_groupement_e3", PB, 3, "Combien de fois le petit nombre tient-il dans le grand ?", ["probleme", "groupes", "canvas"], groupementPbQ),
  gab5("cm1_division_probleme_tpl_mesures_e3", PB, 3, "Longueurs, masses, litres : on divise comme pour des objets.", ["probleme", "mesures", "canvas"], () => recitQ(RECITS_MESURES)),
  gab5("cm1_division_probleme_tpl_argent_e3", PB, 3, "Le prix total ÷ le prix d’un, ou ÷ le nombre de personnes.", ["probleme", "argent", "canvas"], () => recitQ(RECITS_ARGENT)),
  gab5("cm1_division_probleme_tpl_quotidien_e3", PB, 3, "Partager ou faire des groupes : c’est une division.", ["probleme", "canvas"], () => recitQ(RECITS_QUOTIDIEN)),
  gab5("cm1_division_probleme_tpl_choisir_e3", PB, 3, "Partager ou grouper : ÷. Répéter la même quantité : ×.", ["probleme", "choisir_operation", "canvas"], choisirCalculPbQ),

  // DIVISION_DEFI ★4 : deux étapes.
  gab5("cm1_division_defi_tpl_deux_etapes_e4", DF, 4, "Partage d’abord, puis ajuste.", ["defi", "deux_etapes", "canvas"], () => deuxEtapesQ(4)),
  gab5("cm1_division_defi_tpl_reunir_e4", DF, 4, "Réunis d’abord, partage ensuite.", ["defi", "deux_etapes", "canvas"], reunirPartagerQ),
  gab5("cm1_division_defi_tpl_prix_e4", DF, 4, "Trouve d’abord le prix d’un.", ["defi", "deux_etapes", "canvas"], prixUnitaireQ),
  gab5("cm1_division_defi_tpl_parts_e4", DF, 4, "Compte les parts égales en tout.", ["defi", "parts", "canvas"], partsInegalesQ),
  gab5("cm1_division_defi_tpl_verifier_e4", DF, 4, "dividende = diviseur × quotient + reste.", ["defi", "verification", "canvas"], () => verifierPoseQ(tirageReste(4))),
  // ★5 : trois étapes, nombre mystère, le reste qui demande une place de plus.
  gab5("cm1_division_defi_tpl_mystere_e5", DF, 5, "Remonte la division : diviseur × quotient + reste.", ["defi", "mystere", "canvas"], nombreMystereQ),
  gab5("cm1_division_defi_tpl_partage_deux_fois_e5", DF, 5, "Deux partages à la suite.", ["defi", "deux_etapes", "canvas"], partageDeuxFoisQ),
  gab5("cm1_division_defi_tpl_extreme_e5", DF, 5, "Le reste va de 0 au diviseur moins 1.", ["defi", "reste", "canvas"], extremeDividendeQ),
  gab5("cm1_division_defi_tpl_places_e5", DF, 5, "Ceux qui restent ont besoin de place aussi.", ["defi", "reste", "canvas"], () => combienFautIlQ(5)),
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
    // 14/11/2026 : une seule phrase « Calcule : … ÷ … » devenue 8 tournures, avec reste parfois.
    generate: () => quotientQ(3),
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
    // 14/11/2026 : la réponse était TOUJOURS « non » ; maintenant juste, reste trop grand, quotient trop grand, 0 oublié ou reste oublié.
    generate: () => erreurQ(tiragePose(4, Math.random() < 0.6)),
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
    // 14/11/2026 : 7 tournures, pièges = quotient pris pour le reste, reste ≥ diviseur, reste oublié.
    generate: () => resteQ(4),
  },

  {
    kind: "template",
    id: "cm1_division_reste_tpl_2_reunion_sachets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 4,
    theme: "neutral",
    hint: "Le reste ne permet pas de faire un sachet complet.",
    tags: ["cm1", "division", "reste", "template", "canvas"],
    // 14/11/2026 : « On a … fruits » à chaque fois ; maintenant 28 situations (La Réunion ≈ 1 sur 28).
    generate: () => sachetsCompletsQ(4),
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
    // 14/11/2026 : 14 situations de groupes (sport, danse, chorale, mariage…), grouper ou partager, avec le dessin.
    generate: () => equipesQ(),
  },

  {
    kind: "template",
    id: "cm1_division_probleme_tpl_2_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "On partage les fruits en sachets identiques.",
    tags: ["cm1", "division", "probleme", "marche", "template"],
    // 14/11/2026 : « Au marché de Saint-Pierre » servi à chaque fois ; devenu un problème à donnée inutile, 13 situations.
    generate: () => donneeInutileQ(),
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
    // 14/11/2026 : trois étapes (réunir, partager, ajuster), 28 situations.
    generate: () => deuxEtapesQ(5),
  },

  {
    kind: "template",
    id: "cm1_division_defi_tpl_2_reste_canvas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "On ne compte que les groupes complets.",
    tags: ["cm1", "division", "defi", "reste", "template", "canvas"],
    // 14/11/2026 : « Défi sortie nature » figé ; maintenant 28 situations, grands nombres.
    generate: () => sachetsCompletsQ(5),
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
    // 14/11/2026 : question « open » (CM1 = zéro clavier) devenue un QCM.
    text: "Comment vérifie-t-on le résultat d’une division avec un reste ?",
    format: "qcm",
    choices: [
      "On multiplie le diviseur par le quotient, puis on ajoute le reste : on doit retrouver le dividende.",
      "On additionne le diviseur et le quotient : on doit retrouver le dividende.",
      "On multiplie le dividende par le reste : on doit retrouver le quotient.",
      "On divise le quotient par le diviseur : on doit retrouver le reste.",
    ],
    expected: ["On multiplie le diviseur par le quotient, puis on ajoute le reste : on doit retrouver le dividende."],
    comparator: "mcq_exact",
    hint: "Pense à la multiplication inverse.",
    explanation: exp(
      "Une division peut être vérifiée avec une multiplication.",
      "On multiplie le diviseur par le quotient, puis on ajoute le reste s’il y en a un.",
      "Par exemple, si 38 ÷ 6 = 6 reste 2, on vérifie : 6 × 6 + 2 = 38.",
      "La multiplication permet donc de vérifier la division."
    ),
    tags: ["cm1", "division", "defi", "qcm", "verification"],
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
  // DIVISION_POSEE, _RESTE, _PROBLEME, _DEFI : les gabarits du 14/11/2026.
  ...GABARITS_POSEE_DEFI,
];