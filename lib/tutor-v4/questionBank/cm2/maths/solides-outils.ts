// lib/tutor-v4/questionBank/cm2/maths/solides-outils.ts
//
// ⭐ 15/11/2026 — LES GABARITS DES SOLIDES DU CM2 (notion `solide`). Avant : peu de
// squelettes par micro, des oui/non à deux choix, sept items « à La Réunion ».
// Socle repris du CM1 (cm1/maths/solides-outils.ts, commit 0818f7f9), monté d'un cran
// comme les vidéos CM2 (manim/voix/cm2-solides-*.json) : pyramides et prismes à base
// pentagonale, hexagonale, octogonale COMPTÉS PAR RÈGLE (pyramide : 2 × n arêtes,
// n + 1 sommets ; prisme : 3 × n arêtes, 2 × n sommets), la règle à l'envers
// (« 10 arêtes : combien de côtés à la base ? »), les mesures des faces d'un pavé
// (« le dessus : la longueur sur la largeur »), les bords qui se collent dans un
// patron, et à ★4-★5 les défis de l'aquarium (joint = 4 longueurs + 4 largeurs +
// 4 hauteurs, en cm puis en m ; vitres d'un aquarium ouvert ; combien d'aquariums).
// Vocabulaire des vidéos : « ça roule », « une pointe », « deux bases face à face »,
// « disque ou polygone », « étage par étage », « les faces cachées », « plier dans sa tête ».
// Chaque gabarit tire une SITUATION (objets du quotidien, métiers, jeux, bricolage,
// monuments…) × une TOURNURE × un solide × des nombres.
// ⛔ CM2 = zéro clavier : que des QCM. Leurres = vraies erreurs d'élève : compter
// les faces VISIBLES seulement (3 pour un dé), « un cube a 4 faces » (oublier le
// dessus et le dessous), confondre arête et sommet, oublier la base ou la pointe
// d'une pyramide, compter la surface courbe du cylindre comme une face plane,
// cylindre / cône, prisme / pyramide, cube / pavé, patron qui ne se referme pas.
// ⛔ Les dessins `solide_3d` sont SANS étiquette : le canvas écrivait « cône »,
// « pyramide », « boule » ou « base carrée » sur la figure, c'est-à-dire la réponse.
// Dessins : `solide_3d` (le solide, l'assemblage de petits cubes), `patron_solide`
// (dépliages calculés par lib/canvas/patron-solide.ts), `patrons_cube` et
// `figure_libre` (patrons de cube sur quadrillage, PLIÉS pour de vrai, comme au CE2).

import type { CanvasFigure, DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { FigureLibreCanvasData, PatronsCubeCanvasData, Solide3DCanvasData } from "@/lib/tutor-v4/types_canvas";
import {
  cotePiece,
  patronCylindre,
  patronPave,
  patronPrisme,
  patronPyramide,
  type DefautCylindre,
  type DefautPave,
  type DefautPrisme,
  type DefautPyramide,
  type PanneauPatron,
} from "@/lib/canvas/patron-solide";
import { cap, entre, fr, un } from "./trous-outils";

type G = Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure };

const melange = <T,>(l: T[]): T[] => l.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
type Qcm = Pick<TutorGeneratedQuestionV4, "format" | "choices" | "expected" | "comparator">;
/** QCM à propositions écrites : jamais deux fois la même, 4 au plus. */
function qcm(juste: string, faux: string[]): Qcm {
  const d = melange([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  return { format: "qcm", choices: melange([juste, ...d]), expected: [juste], comparator: "mcq_exact" };
}
/** QCM de nombres : leurres distincts en VALEUR, complétés par des voisins s'il en manque. */
function qcmN(juste: number, faux: number[], u = "", pas = 1): Qcm {
  const ecr = (v: number) => (u ? `${fr(v)} ${u}` : fr(v));
  const arr = (v: number) => Math.round(v * 1000) / 1000;
  const vals: number[] = [];
  for (const v of melange(faux.map(arr))) if (v > 0 && v !== arr(juste) && !vals.includes(v)) vals.push(v);
  for (let k = 1; vals.length < 3 && k < 30; k++) {
    for (const v of [arr(juste + k * pas), arr(juste - k * pas)]) if (v > 0 && !vals.includes(v) && vals.length < 3) vals.push(v);
  }
  return qcm(ecr(juste), vals.slice(0, 3).map(ecr));
}

const tpl = (microId: string, n: string, difficulty: DifficultyLevel, hint: string, generate: () => G): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `cm2_${microId}_tpl_${n}`,
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm2", "solide", microId, "template", "canvas"],
    generate: () => {
      const q = generate();
      return { ...q, text: elision(q.text), explanation: q.explanation ? elision(q.explanation) : q.explanation };
    },
  }) as TutorBankItemV4;

/** « de Inès » → « d'Inès », « que Enzo » → « qu'Enzo », « le objet » n'arrive jamais. */
const elision = (t: string) =>
  t
    .replace(/\b(de|que) (?=[AEIOUÉÈ][a-zàâéèêëîïôûü])/g, (_m, w: string) => (w === "de" ? "d'" : "qu'"))
    .replace(/\bque (?=(un|une|il|elle)\b)/g, "qu'");

/* ───────────────────────── Les personnes ───────────────────────── */

const NOMS_F = ["Nina", "Zoé", "Lou", "Inès", "Jade", "Maya", "Lina", "Emma", "Léa", "Sarah", "Chloé", "Aya", "Rose", "Alma", "Naïa", "Manon", "Julia", "Lisa", "Anna"];
const NOMS_M = ["Téo", "Ravi", "Malo", "Sacha", "Amir", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Hugo", "Enzo", "Bilal", "Jules", "Adam", "Léon", "Gabriel", "Victor", "Ethan"];
type Perso = { nom: string; il: "il" | "elle" };
const perso = (): Perso => (Math.random() < 0.5 ? { nom: un(NOMS_F), il: "elle" } : { nom: un(NOMS_M), il: "il" });
/** Deux personnes différentes. */
function deux(): [Perso, Perso] {
  const a = perso();
  for (;;) {
    const b = perso();
    if (b.nom !== a.nom) return [a, b];
  }
}

/* ───────────────────────── Les articles ───────────────────────── */

const voy = (s: string) => /^[aeiouyéèêâîôœAEIOUÉÈ]/.test(s);
/** « une boîte » → « cette boîte », « un ours » → « cet ours », « la pyramide » → « cette pyramide ». */
const ce = (o: string) => {
  if (o.startsWith("une ")) return `cette ${o.slice(4)}`;
  if (o.startsWith("un ")) return voy(o.slice(3)) ? `cet ${o.slice(3)}` : `ce ${o.slice(3)}`;
  if (o.startsWith("la ")) return `cette ${o.slice(3)}`;
  if (o.startsWith("le ")) return `ce ${o.slice(3)}`;
  return o;
};
/** « une boîte » → « la boîte », « un étui » → « l'étui ». */
const le = (o: string) => {
  if (o.startsWith("une ")) return voy(o.slice(4)) ? `l'${o.slice(4)}` : `la ${o.slice(4)}`;
  if (o.startsWith("un ")) return voy(o.slice(3)) ? `l'${o.slice(3)}` : `le ${o.slice(3)}`;
  return o;
};
/** « un cube » → « d'un cube », « la pyramide » → « de la pyramide », « le toit » → « du toit ». */
const de = (o: string) => {
  if (o.startsWith("le ")) return `du ${o.slice(3)}`;
  if (o.startsWith("un ") || o.startsWith("une ")) return `d'${o}`;
  return `de ${o}`;
};

/* ───────────────────────── Les solides ───────────────────────── */

type Cle = "cube" | "pave" | "prisme" | "pyrC" | "pyrT" | "cyl" | "cone" | "boule";
type Poly = "cube" | "pave" | "prisme" | "pyrC" | "pyrT";
type Quoi = "faces" | "sommets" | "aretes";

type Sol = {
  un: string;
  /** Le nom sans article : « en forme de cube ». */
  nom: string;
  faces?: number;
  sommets?: number;
  aretes?: number;
  /** Faces planes (plates). */
  planes: number;
  /** Ce qui le fait reconnaître. */
  raison: string;
  /** Les confusions d'élève, de la plus fréquente à la moins fréquente. */
  voisins: Cle[];
  /** Des objets qu'on tient dans la main. */
  objets: string[];
  /** Des objets trop grands pour la main (monuments, tentes…). */
  lieux: string[];
  /** Des objets au pluriel, pour « 4 boîtes de céréales ». */
  pluriels: string[];
};

const S: Record<Cle, Sol> = {
  cube: {
    un: "un cube", nom: "cube", faces: 6, sommets: 8, aretes: 12, planes: 6,
    raison: "six faces carrées, toutes pareilles",
    voisins: ["pave", "prisme", "pyrC"],
    objets: ["un dé à jouer", "un Rubik's cube", "un glaçon tout carré", "une boîte cadeau aux faces toutes carrées", "un bloc de bois du jeu de construction", "un dé en mousse", "un coffret à bijoux aux faces toutes carrées"],
    lieux: ["un aquarium aux faces toutes carrées"],
    pluriels: ["dés en bois", "Rubik's cubes", "boîtes cadeaux aux faces carrées", "dés en mousse"],
  },
  pave: {
    un: "un pavé droit", nom: "pavé droit", faces: 6, sommets: 8, aretes: 12, planes: 6,
    raison: "six faces rectangulaires, pas toutes carrées",
    voisins: ["cube", "prisme", "cyl"],
    objets: ["une boîte de céréales", "une brique de lait", "une boîte à chaussures", "un livre fermé", "une gomme", "une boîte d'allumettes", "une tablette de chocolat", "une brique de maçon", "une trousse rigide", "un carton de déménagement"],
    lieux: ["un conteneur de bateau", "une tour de bureaux toute droite"],
    pluriels: ["boîtes de céréales", "cartons de déménagement", "boîtes à chaussures", "briques de lait"],
  },
  prisme: {
    un: "un prisme droit à base triangulaire", nom: "prisme droit", faces: 5, sommets: 6, aretes: 9, planes: 5,
    raison: "deux faces en triangle et trois faces rectangulaires",
    voisins: ["pyrC", "pave", "pyrT"],
    objets: ["une cale-porte en bois", "une boîte de chocolats en forme de toit", "le prisme en verre de la classe", "une portion de fromage en triangle", "un présentoir de table en triangle"],
    lieux: ["une tente canadienne", "le toit d'une cabane posé au sol"],
    pluriels: ["cale-portes en bois", "boîtes de chocolats en forme de toit", "tentes canadiennes en carton"],
  },
  pyrC: {
    un: "une pyramide à base carrée", nom: "pyramide à base carrée", faces: 5, sommets: 5, aretes: 8, planes: 5,
    raison: "une base carrée et quatre faces en triangle qui se rejoignent en pointe",
    voisins: ["prisme", "cone", "pyrT"],
    objets: ["un presse-papier pointu à base carrée", "une maquette de la pyramide du Louvre", "une maquette de pyramide d'Égypte", "une lampe de jardin à base carrée et en pointe"],
    lieux: ["la pyramide du Louvre", "une pyramide d'Égypte", "le toit à quatre pans d'un kiosque", "le toit pointu d'un clocher à base carrée"],
    pluriels: ["maquettes de la pyramide du Louvre", "presse-papiers à base carrée", "maquettes de pyramide d'Égypte"],
  },
  pyrT: {
    un: "une pyramide à base triangulaire", nom: "pyramide à base triangulaire", faces: 4, sommets: 4, aretes: 6, planes: 4,
    raison: "quatre faces, toutes en triangle",
    voisins: ["pyrC", "prisme", "cone"],
    objets: ["un dé à quatre faces", "un berlingot de lait", "un berlingot de bonbons"],
    lieux: [],
    pluriels: ["dés à quatre faces", "berlingots de lait"],
  },
  cyl: {
    un: "un cylindre", nom: "cylindre", planes: 2,
    raison: "deux disques plats et une surface courbe qui roule",
    voisins: ["cone", "pave", "boule"],
    objets: ["une boîte de conserve", "un rouleau d'essuie-tout", "une canette", "une pile", "un tambour", "un rondin de bois", "un bâton de colle", "une boîte de chips en tube"],
    lieux: ["un château d'eau tout droit", "une colonne de temple"],
    pluriels: ["boîtes de conserve", "canettes"],
  },
  cone: {
    un: "un cône", nom: "cône", planes: 1,
    raison: "un seul disque plat, une surface courbe et une pointe",
    voisins: ["pyrC", "cyl", "boule"],
    objets: ["un cornet de glace", "un chapeau de fête", "un plot de sport", "un chapeau de sorcière", "un chapeau pointu de clown"],
    lieux: ["un tipi", "le toit pointu d'une tour de château"],
    pluriels: ["chapeaux de fête", "plots de sport"],
  },
  boule: {
    un: "une boule", nom: "boule", planes: 0,
    raison: "aucune face plate, une surface toute ronde",
    voisins: ["cyl", "cone", "cube"],
    objets: ["un ballon de foot", "une bille", "une orange", "une balle de tennis", "une perle", "une balle de ping-pong", "un ballon de basket"],
    lieux: ["un globe terrestre géant", "une montgolfière gonflée"],
    pluriels: ["ballons de foot", "oranges"],
  },
};

const TOUS: Cle[] = ["cube", "pave", "prisme", "pyrC", "pyrT", "cyl", "cone", "boule"];
const POLY: Poly[] = ["cube", "pave", "prisme", "pyrC", "pyrT"];
const NOM_DU_SOLIDE = /cube|pavé|prisme|pyramide|cylindre|cône|boule/i;
/** Les objets qui ne disent pas le nom du solide (pour « reconnaître »). */
const objetsMuets = (c: Cle) => S[c].objets.filter((o) => !NOM_DU_SOLIDE.test(o));
const unNom = (c: Cle) => S[c].un;

/** Le solide dessiné, SANS étiquette ni cote : le canvas écrivait le nom du solide. */
function dessin(c: Cle): CanvasFigure {
  const data: Solide3DCanvasData = {
    kind: "solide_3d",
    solide: c === "pave" ? "pave_droit" : c === "pyrC" || c === "pyrT" ? "pyramide" : c === "cyl" ? "cylindre" : c,
    ...(c === "pyrT" ? { baseTriangulaire: true } : {}),
    highlight: { base: false, hauteur: false },
    display: { showLabels: false, showDimensions: false, showFormulaHint: false },
  };
  return data as CanvasFigure;
}

/* ───────────────────────── Les comptages et leurs pièges ───────────────────────── */

const MOT: Record<Quoi, string> = { faces: "faces", sommets: "sommets", aretes: "arêtes" };
/** Les vraies erreurs : faces visibles, « 4 faces », oublier la base ou la pointe, arête ↔ sommet. */
const PIEGES: Record<Poly, Record<Quoi, number[]>> = {
  cube: { faces: [3, 4, 8, 12], sommets: [4, 6, 7, 12], aretes: [8, 9, 6, 4] },
  pave: { faces: [3, 4, 8, 12], sommets: [4, 6, 7, 12], aretes: [8, 9, 6, 4] },
  prisme: { faces: [3, 2, 6, 9], sommets: [3, 5, 9], aretes: [6, 5, 3, 8] },
  pyrC: { faces: [4, 8, 6], sommets: [1, 4, 8], aretes: [4, 5, 12] },
  pyrT: { faces: [3, 6, 1], sommets: [1, 3, 6], aretes: [3, 4, 8] },
};
const compte = (c: Poly, q: Quoi) => S[c][q] as number;
const DEFS: Record<Quoi, string> = {
  faces: "Une face est une partie plate du solide ; on compte aussi les faces cachées, derrière et dessous.",
  sommets: "Un sommet est un coin pointu, là où plusieurs arêtes se rejoignent ; on compte aussi ceux qu'on ne voit pas.",
  aretes: "Une arête est le bord droit entre deux faces ; on compte aussi les arêtes cachées.",
};
const DETAIL: Record<Poly, Record<Quoi, string>> = {
  cube: { faces: "dessus, dessous, devant, derrière, gauche, droite : 6", sommets: "4 coins en haut et 4 en bas : 8", aretes: "4 en haut, 4 en bas, 4 debout : 12" },
  pave: { faces: "dessus, dessous, devant, derrière, gauche, droite : 6", sommets: "4 coins en haut et 4 en bas : 8", aretes: "4 en haut, 4 en bas, 4 debout : 12" },
  prisme: { faces: "2 triangles et 3 rectangles : 5", sommets: "3 coins sur chaque triangle : 3 + 3 = 6", aretes: "3 sur chaque triangle et 3 qui les relient : 9" },
  pyrC: { faces: "la base carrée et 4 triangles : 5", sommets: "4 coins de la base et la pointe : 5", aretes: "4 autour de la base et 4 qui montent à la pointe : 8" },
  pyrT: { faces: "la base et 3 triangles : 4", sommets: "3 coins de la base et la pointe : 4", aretes: "3 autour de la base et 3 qui montent à la pointe : 6" },
};
const expliquerCompte = (c: Poly, q: Quoi, fin: string) => `${DEFS[q]} ${cap(DETAIL[c][q])}. ${fin}`;

/* ═════════════════════════ SOLIDE_RECONNAITRE ═════════════════════════ */

const PRESENTE_DESSIN = (P: Perso) => [
  "Voici un solide.", "Regarde ce solide.", "Observe bien ce dessin.",
  `${P.nom} a trouvé ce solide dans la boîte de jeux.`, "La maîtresse pose ce solide sur son bureau.",
  "Le maître montre ce solide à la classe.", `${P.nom} a fabriqué ce solide en pâte à modeler.`,
  "Le potier a façonné ce solide en argile.", "Le menuisier a taillé ce solide dans du bois.",
  "Dans la vitrine du magasin de jouets, il y a ce solide.", `Au musée des sciences, ${P.nom} observe ce solide.`,
  "L'architecte a dessiné ce solide.", `${P.nom} dessine ce solide sur son cahier.`,
  "Le pâtissier a fait un gâteau de cette forme.", "La fleuriste a choisi un vase de cette forme.",
  `Pour son anniversaire, ${P.nom} reçoit un paquet de cette forme.`,
];

function nommerDessin(): G {
  const c = un(TOUS);
  const s = S[c];
  const P = perso();
  return {
    text: `${un(PRESENTE_DESSIN(P))} ${un(["Quel est le nom de ce solide ?", "Comment s'appelle ce solide ?", "Quel est ce solide ?", "De quel solide s'agit-il ?"])}`,
    ...qcm(s.un, s.voisins.map(unNom)),
    explanation: `On regarde les faces : ce solide a ${s.raison}. C'est ${s.un}.`,
    canvas: dessin(c),
  };
}

/** Un objet et sa phrase d'arrivée : on « tient » un dé, on « photographie » la pyramide du Louvre. */
function presenteObjet(c: Cle, P: Perso, muet: boolean): { o: string; intro: string } {
  const objets = muet ? objetsMuets(c) : S[c].objets;
  const lieux = muet ? S[c].lieux.filter((o) => !NOM_DU_SOLIDE.test(o)) : S[c].lieux;
  if (lieux.length && Math.random() < 0.25) {
    const o = un(lieux);
    return { o, intro: un([`${P.nom} photographie ${o}.`, `Sur une carte postale, ${P.nom} voit ${o}.`, `Le guide montre ${o} aux touristes.`, `${P.nom} dessine ${o}.`, `En promenade, ${P.nom} passe devant ${o}.`]) };
  }
  const o = un(objets);
  return {
    o,
    intro: un([
      `${P.nom} tient ${o}.`, `Sur l'étagère du magasin, il y a ${o}.`, `Le vendeur emballe ${o}.`,
      `Dans la cuisine, ${P.nom} prend ${o}.`, `${P.nom} met ${o} dans son sac.`,
      `Pour la chasse aux formes, ${P.nom} rapporte ${o}.`, `Le livreur dépose ${o}.`,
      `Au marché, la marchande montre ${o}.`, `Sur la table de la classe, il y a ${o}.`,
      `${P.nom} trouve ${o} dans le grenier.`, `La caissière scanne ${o}.`,
    ]),
  };
}

function objetVersSolide(): G {
  const c = un(TOUS);
  const s = S[c];
  const P = perso();
  const { o, intro } = presenteObjet(c, P, true);
  return {
    text: `${intro} ${un([`Quelle est la forme de ${ce(o)} ?`, `${cap(ce(o))} a la forme de quel solide ?`, `Quel solide a la même forme que ${le(o)} ?`, "Quel solide reconnais-tu ?"])}`,
    ...qcm(s.un, s.voisins.map(unNom)),
    explanation: `${cap(le(o))} a ${s.raison} : c'est ${s.un}.`,
  };
}

function dessinVersObjet(): G {
  const c = un(TOUS);
  const s = S[c];
  const P = perso();
  const juste = un(objetsMuets(c));
  const faux = s.voisins.map((v) => un(objetsMuets(v)));
  return {
    text: `${un([
      "Voici un solide.", `${P.nom} cherche un objet de cette forme.`, `Pour la chasse aux formes, ${P.nom} doit trouver un objet comme ce solide.`,
      "La maîtresse demande un objet de cette forme.", `${P.nom} veut ranger avec ce solide un objet de la même forme.`,
      "Le vendeur cherche un emballage de cette forme.", `Pour un jeu de Kim, ${P.nom} doit trouver un objet de cette forme.`,
      "Le décorateur cherche un objet de cette forme pour sa vitrine.",
    ])} ${un(["Lequel choisir ?", "Quel objet convient ?", "Quel objet a la même forme ?", "Lequel de ces objets a cette forme ?"])}`,
    ...qcm(juste, faux),
    explanation: `Ce solide est ${s.un} : ${s.raison}. ${cap(le(juste))} a la même forme.`,
    canvas: dessin(c),
  };
}

function aTilRaison(): G {
  const c = un(TOUS);
  const s = S[c];
  const P = perso();
  const w = s.voisins[Math.random() < 0.7 ? 0 : 1];
  const autres = s.voisins.filter((v) => v !== w);
  return {
    text: `${un(["Regarde ce solide.", `${P.nom} a reçu un cadeau de cette forme.`, `Au rayon des emballages, ${P.nom} montre ce solide.`, "Voici un solide en bois.", `${P.nom} a modelé ce solide en argile.`, "Le potier présente ce solide."])} ${un([`${P.nom} dit que c'est ${S[w].un}.`, `« C'est ${S[w].un} ! » affirme ${P.nom}.`, `${P.nom} pense que c'est ${S[w].un}.`])} ${un([`A-t-${P.il} raison ?`, "Qu'en penses-tu ?", "Est-ce juste ?"])}`,
    ...qcm(`non, c'est ${s.un}`, [`oui, c'est bien ${S[w].un}`, ...autres.map((v) => `non, c'est ${S[v].un}`)]),
    explanation: `${cap(S[w].un)} a ${S[w].raison}. Ce solide, lui, a ${s.raison} : c'est ${s.un}.`,
    canvas: dessin(c),
  };
}

function intrus(): G {
  const c = un(TOUS.filter((k) => objetsMuets(k).length >= 3));
  const s = S[c];
  const P = perso();
  const bons = melange([...objetsMuets(c)]).slice(0, 3);
  const v = un(s.voisins);
  const juste = un(objetsMuets(v));
  return {
    text: `${un([
      "Le magasinier range ensemble les objets qui ont la forme de ce solide.", `${P.nom} trie ses jouets : ceux qui ont la forme de ce solide vont dans la même caisse.`,
      "La maîtresse a mis sur une table des objets de la forme de ce solide.", `Pour la chasse aux formes, ${P.nom} a rapporté des objets comme ce solide.`,
      "Le vendeur a rangé sur un rayon les objets qui ont cette forme.", `${P.nom} a rangé dans une boîte les objets de cette forme.`,
    ])} ${un(["Lequel n'a PAS cette forme ?", "Quel objet s'est glissé là par erreur ?", "Lequel est l'intrus ?"])}`,
    ...qcm(juste, bons),
    explanation: `Ce solide est ${s.un} : ${s.raison}. ${cap(le(juste))} a la forme ${de(S[v].un)} : c'est l'intrus.`,
    canvas: dessin(c),
  };
}

const PORTRAITS: Record<Cle, string[]> = {
  cube: ["J'ai six faces, toutes des carrés pareils.", "Je ne roule pas, et toutes mes faces sont carrées."],
  pave: ["J'ai six faces rectangulaires, pas toutes carrées.", "Je ne roule pas ; mes six faces sont des rectangles, et elles ne sont pas toutes carrées."],
  prisme: ["J'ai deux faces en triangle et trois faces rectangulaires.", "Mes deux bouts sont des triangles, mes trois côtés sont des rectangles."],
  pyrC: ["J'ai une base carrée et quatre faces en triangle qui montent en pointe.", "J'ai une pointe, et ma base est un carré."],
  pyrT: ["J'ai quatre faces, et ce sont toutes des triangles.", "J'ai une pointe, et ma base est un triangle."],
  cyl: ["J'ai deux disques plats et je roule tout droit.", "Je peux rouler, et aussi glisser sur un de mes deux disques."],
  cone: ["J'ai un seul disque plat et une pointe.", "Je roule en tournant en rond, et j'ai une pointe."],
  boule: ["Je n'ai aucune face plate : je roule dans tous les sens.", "Je suis toute ronde, sans pointe ni bord."],
};

function portrait(): G {
  const c = un(TOUS);
  const s = S[c];
  const P = perso();
  const d = un(PORTRAITS[c]);
  return {
    text: un([
      `Devinette de ${P.nom} : « ${d} » Qui suis-je ?`, `Pour le jeu du portrait, ${P.nom} lit : « ${d} » Quel est ce solide ?`,
      `${P.nom} cache un solide dans un sac et dit : « ${d} » Quel solide est-ce ?`, `Le magicien annonce : « ${d} » De quel solide parle-t-il ?`,
      `Sur la carte du jeu, il est écrit : « ${d} » Quel est ce solide ?`, `Au jeu des devinettes, la maîtresse dit : « ${d} » Qui est-ce ?`,
    ]),
    ...qcm(s.un, s.voisins.map(unNom)),
    explanation: `${cap(s.un)} a ${s.raison}.`,
  };
}

const ROULE: Record<Cle, string> = {
  boule: "oui, dans tous les sens", cyl: "oui, tout droit, sur sa surface courbe", cone: "oui, mais en tournant en rond autour de sa pointe",
  cube: "non, il glisse sans rouler", pave: "non, il glisse sans rouler", prisme: "non, il glisse sans rouler", pyrC: "non, il glisse sans rouler", pyrT: "non, il glisse sans rouler",
};

function rouleOuPas(): G {
  const c = un(TOUS);
  const P = perso();
  const juste = ROULE[c];
  return {
    text: `${un([
      "Le livreur pose ce colis sur une pente.", `${P.nom} pose ce solide en haut d'un toboggan.`, "Le cuisinier pose ce gâteau sur un plateau penché.",
      `${P.nom} lâche ce solide sur une planche inclinée.`, "Le déménageur pose ce carton sur une rampe.", `Au parc, ${P.nom} pose ce solide sur une pente d'herbe.`,
    ])} ${un(["Va-t-il rouler ?", "Peut-il rouler ?", "Que va-t-il se passer ?"])}`,
    ...qcm(juste, Object.values(ROULE)),
    explanation:
      c === "boule" || c === "cyl" || c === "cone"
        ? `Ce solide est ${S[c].un} : sa surface courbe le fait rouler (${juste.replace(/^oui, /, "")}).`
        : `Ce solide est ${S[c].un} : il n'a que des faces planes, il ne peut pas rouler.`,
    canvas: dessin(c),
  };
}

/* ═════════════════════════ SOLIDE_SOMMET_ARETE_FACE ═════════════════════════ */

function objetPoly(c: Poly, avecLieux = false): string {
  return avecLieux && S[c].lieux.length && Math.random() < 0.25 ? un(S[c].lieux) : un(S[c].objets);
}

function quellePartie(): G {
  const c = un(POLY);
  const o = objetPoly(c);
  const P = perso();
  const quoi = un<Quoi>(["faces", "sommets", "aretes"]);
  const gestes: Record<Quoi, string[]> = {
    sommets: [
      `${P.nom} pose le doigt sur un coin pointu de ${ce(o)}.`, `${P.nom} colle une gommette sur un coin pointu de ${ce(o)}.`,
      `Une coccinelle se pose sur un coin pointu de ${ce(o)}.`, `${P.nom} met une goutte de peinture sur un coin pointu de ${ce(o)}.`,
    ],
    aretes: [
      `${P.nom} passe le doigt le long d'un bord droit de ${ce(o)}, entre deux faces.`, `${P.nom} colle du ruban adhésif sur un pli de ${ce(o)}, entre deux faces.`,
      `Une fourmi marche sur le bord entre deux faces de ${ce(o)}.`, `${P.nom} trace un trait de feutre sur un bord droit de ${ce(o)}.`,
    ],
    faces: [
      `${P.nom} colle une étiquette sur une partie plate de ${ce(o)}.`, `${P.nom} peint en bleu une partie plate de ${ce(o)}.`,
      `${P.nom} pose ${ce(o)} : une partie plate touche la table.`, `Une coccinelle se promène sur une partie plate de ${ce(o)}.`,
    ],
  };
  const juste = { faces: "une face", sommets: "un sommet", aretes: "une arête" }[quoi];
  return {
    text: `${un(gestes[quoi])} ${un(["Comment s'appelle cette partie du solide ?", "Quel est le nom de cette partie ?", "En maths, comment s'appelle cette partie ?"])}`,
    ...qcm(juste, ["une face", "un sommet", "une arête"]),
    explanation: `${DEFS[quoi]} Ici, c'est ${juste}.`,
    canvas: dessin(c),
  };
}

const GESTES_COMPTE = (q: Quoi, P: Perso, o: string): string[] =>
  ({
    faces: [
      `${P.nom} colle une gommette sur chaque face de ${ce(o)}. Combien de gommettes lui faut-il ?`,
      `${P.nom} peint chaque face de ${ce(o)} d'une couleur différente. Combien de couleurs lui faut-il ?`,
      `${P.nom} compte les faces de ${ce(o)}. Combien en trouve-t-${P.il} ?`, `Combien de faces a ${ce(o)} ?`,
      `${P.nom} pose une étiquette sur chaque face de ${ce(o)}. Combien d'étiquettes faut-il ?`,
    ],
    sommets: [
      `${P.nom} pose une perle sur chaque sommet de ${ce(o)}. Combien de perles faut-il ?`,
      `${P.nom} met une gommette sur chaque sommet de ${ce(o)}. Combien de gommettes faut-il ?`,
      `Combien de sommets a ${ce(o)} ?`, `${P.nom} compte les sommets de ${ce(o)}. Combien en trouve-t-${P.il} ?`,
      `${P.nom} plante une petite épingle à chaque sommet de ${ce(o)}. Combien d'épingles faut-il ?`,
    ],
    aretes: [
      `${P.nom} colle un ruban sur chaque arête de ${ce(o)}. Combien de rubans faut-il ?`,
      `${P.nom} repasse chaque arête de ${ce(o)} au feutre. Combien de traits trace-t-${P.il} ?`,
      `Combien d'arêtes a ${ce(o)} ?`, `Avec des pailles, ${P.nom} veut refaire chaque arête de ${ce(o)}. Combien de pailles faut-il ?`,
      `${P.nom} compte les arêtes de ${ce(o)}. Combien en trouve-t-${P.il} ?`,
    ],
  })[q];

function compter(polys: Poly[], quoi: Quoi[]): () => G {
  return () => {
    const c = un(polys);
    const q = un(quoi);
    const P = perso();
    const o = objetPoly(c);
    const n = compte(c, q);
    return {
      text: un(GESTES_COMPTE(q, P, o)),
      ...qcmN(n, PIEGES[c][q]),
      explanation: expliquerCompte(c, q, `${cap(ce(o))} a ${n} ${MOT[q]}.`),
      canvas: dessin(c),
    };
  };
}

function erreurDeCompte(): G {
  const c = un<Poly>(["cube", "pave"]);
  const o = objetPoly(c);
  const P = perso();
  const il = P.il;
  const R = {
    vu: `non, ${il} oublie les faces cachées : il y en a 6`,
    quatre: `non, ${il} oublie le dessus et le dessous : il y en a 6`,
    somArete: `non, ${il} confond avec les arêtes : il y a 8 sommets`,
    areteSom: `non, ${il} confond avec les sommets : il y a 12 arêtes`,
    ok: "oui, c'est juste",
  };
  const cas = un([
    { dit: "Il y a 3 faces.", juste: R.vu },
    { dit: "Il y a 4 faces.", juste: R.quatre },
    { dit: "Il y a 12 sommets.", juste: R.somArete },
    { dit: "Il y a 8 arêtes.", juste: R.areteSom },
    { dit: "Il y a 8 sommets.", juste: R.ok },
    { dit: "Il y a 6 faces.", juste: R.ok },
    { dit: "Il y a 12 arêtes.", juste: R.ok },
  ]);
  return {
    text: `${un([`${P.nom} regarde ${ce(o)}.`, `${P.nom} tient ${ce(o)} dans ses mains.`, `En classe, ${P.nom} étudie ${ce(o)}.`, `Au club de maths, ${P.nom} prend ${ce(o)}.`])} ${cap(il)} dit : « ${cas.dit} » ${un([`A-t-${il} raison ?`, "Qu'en penses-tu ?"])}`,
    ...qcm(cas.juste, Object.values(R)),
    explanation: `${cap(S[c].un)} a 6 faces, 8 sommets (les coins) et 12 arêtes (les bords entre deux faces), cachés compris.`,
    canvas: dessin(c),
  };
}

const MATERIAUX: [string, string][] = [
  ["pailles", "boules de pâte à modeler"], ["cure-dents", "guimauves"], ["bâtonnets de bois", "billes d'argile"],
  ["tiges aimantées", "boules aimantées"], ["spaghettis crus", "bonbons gélifiés"], ["baguettes de bambou", "bouchons de liège"],
];

function squelette(): G {
  const c = un(POLY);
  const s = S[c];
  const P = perso();
  const [m, j] = un(MATERIAUX);
  const quoi = un(["aretes", "sommets", "tout"] as const);
  const a = s.aretes as number;
  const so = s.sommets as number;
  const juste = quoi === "aretes" ? a : quoi === "sommets" ? so : a + so;
  const faux = quoi === "aretes" ? [so, s.faces as number, ...PIEGES[c].aretes] : quoi === "sommets" ? [a, s.faces as number, ...PIEGES[c].sommets] : [a, so, a + (s.faces as number), so + (s.faces as number)];
  const objet = Math.random() < 0.5 ? s.un : un(s.objets);
  return {
    text: `${un([
      `En arts plastiques, ${P.nom} fabrique le squelette ${de(objet)}`, `Pour la fête de la science, ${P.nom} construit le squelette ${de(objet)}`,
      `Le sculpteur prépare la carcasse ${de(objet)}`, `Au centre de loisirs, ${P.nom} construit le squelette ${de(objet)}`,
      `Pour décorer la classe, ${P.nom} fabrique le squelette ${de(objet)}`,
    ])} : des ${m} pour les arêtes, des ${j} pour les sommets. ${quoi === "aretes" ? `Combien de ${m} faut-il ?` : quoi === "sommets" ? `Combien de ${j} faut-il ?` : `Combien d'objets faut-il en tout, ${m} et ${j} ensemble ?`}`,
    ...qcmN(juste, faux),
    explanation:
      quoi === "tout"
        ? `${cap(s.un)} a ${a} arêtes et ${so} sommets : ${a} ${m} et ${so} ${j}, soit ${a} + ${so} = ${a + so}.`
        : expliquerCompte(c, quoi, `Il faut ${juste} ${quoi === "aretes" ? m : j}.`),
    canvas: dessin(c),
  };
}

function plusieurs(): G {
  const c = un(POLY);
  const s = S[c];
  const P = perso();
  const n = entre(2, 6);
  const pl = un(s.pluriels);
  const quoi = un<Quoi>(["faces", "sommets", "aretes"]);
  const k = compte(c, quoi);
  const phrases: Record<Quoi, string[]> = {
    aretes: [
      `Le menuisier colle une baguette sur chaque arête de ${n} ${pl}. Combien de baguettes lui faut-il ?`,
      `${P.nom} entoure chaque arête de ${n} ${pl} avec du ruban doré. Combien de morceaux de ruban faut-il ?`,
      `Le décorateur pose une guirlande lumineuse sur chaque arête de ${n} ${pl}. Combien de guirlandes faut-il ?`,
    ],
    sommets: [
      `Le déménageur protège chaque sommet de ${n} ${pl} avec un coin en mousse. Combien de coins en mousse faut-il ?`,
      `${P.nom} colle une perle sur chaque sommet de ${n} ${pl}. Combien de perles faut-il ?`,
      `La décoratrice accroche un grelot à chaque sommet de ${n} ${pl}. Combien de grelots faut-il ?`,
    ],
    faces: [
      `Le peintre peint chaque face de ${n} ${pl}. Combien de faces peint-il ?`,
      `${P.nom} colle une étiquette sur chaque face de ${n} ${pl}. Combien d'étiquettes faut-il ?`,
      `L'emballeuse recouvre chaque face de ${n} ${pl} de papier cadeau. Combien de morceaux de papier découpe-t-elle ?`,
    ],
  };
  const autres = (["faces", "sommets", "aretes"] as Quoi[]).filter((x) => x !== quoi).map((x) => n * compte(c, x));
  return {
    text: un(phrases[quoi]),
    ...qcmN(n * k, [...autres, k, n + k, n * PIEGES[c][quoi][0]]),
    explanation: expliquerCompte(c, quoi, `Pour ${n} objets : ${n} × ${k} = ${n * k}.`),
    canvas: dessin(c),
  };
}

function enigmeComptes(): G {
  const c = un(POLY);
  const s = S[c];
  const P = perso();
  const formes = c === "cube" ? " Toutes mes faces sont des carrés pareils." : c === "pave" ? " Mes faces sont des rectangles, pas toutes carrées." : "";
  const formes3 = c === "cube" ? " Ses faces sont toutes des carrés : c'est un cube, pas un pavé droit." : c === "pave" ? " Ses faces ne sont pas toutes carrées : c'est un pavé droit, pas un cube." : "";
  const d = `J'ai ${s.faces} faces, ${s.sommets} sommets et ${s.aretes} arêtes.${formes}`;
  return {
    text: un([
      `Devinette de ${P.nom} : « ${d} » Qui suis-je ?`, `Le magicien sort un solide de son chapeau : « ${d} » Quel solide est-ce ?`,
      `Sur la carte du jeu, il est écrit : « ${d} » Quel est ce solide ?`, `${P.nom} décrit un solide caché : « ${d} » De quel solide s'agit-il ?`,
    ]),
    ...qcm(s.un, [...POLY.filter((x) => x !== c).map(unNom), "un cylindre"]),
    explanation: `${cap(s.un)} a ${s.faces} faces, ${s.sommets} sommets et ${s.aretes} arêtes.${formes3}`,
  };
}

/* ═════════════════════════ SOLIDE_FACE ═════════════════════════ */

const objetCle = (c: Cle) => (S[c].lieux.length && Math.random() < 0.2 ? un(S[c].lieux) : un(S[c].objets));

function formeDesFaces(): G {
  const c = un<Cle>(["cube", "pave", "prisme", "pyrC", "pyrT", "cyl", "cone"]);
  const o = un(S[c].objets);
  const P = perso();
  const Q: Record<string, { q: string; r: string; faux: string[] }[]> = {
    cube: [{ q: "la forme de ses faces", r: "des carrés", faux: ["des triangles", "des disques", "des rectangles pas carrés"] }],
    pave: [{ q: "la forme de ses faces", r: "des rectangles", faux: ["des triangles", "des disques", "seulement des carrés"] }],
    prisme: [
      { q: "la forme de ses deux faces des bouts", r: "des triangles", faux: ["des rectangles", "des disques", "des carrés"] },
      { q: "la forme de ses trois faces de côté", r: "des rectangles", faux: ["des triangles", "des disques"] },
    ],
    pyrC: [
      { q: "la forme des faces qui montent vers la pointe", r: "des triangles", faux: ["des carrés", "des disques", "des rectangles"] },
      { q: "la forme de sa base", r: "un carré", faux: ["un triangle", "un disque", "un rectangle pas carré"] },
    ],
    pyrT: [
      { q: "la forme de sa base", r: "un triangle", faux: ["un carré", "un disque", "un rectangle"] },
      { q: "la forme des faces qui montent vers la pointe", r: "des triangles", faux: ["des carrés", "des disques", "des rectangles"] },
    ],
    cyl: [{ q: "la forme de son dessus et de son dessous", r: "des disques", faux: ["des carrés", "des triangles", "des rectangles"] }],
    cone: [{ q: "la forme de sa face plate", r: "un disque", faux: ["un triangle", "un carré", "un rectangle"] }],
  };
  const x = un(Q[c]);
  return {
    text: un([
      `${P.nom} observe ${o}. Quelle est ${x.q} ?`, `Sur ${ce(o)}, quelle est ${x.q} ?`,
      `${P.nom} touche ${o}. Quelle est ${x.q} ?`, `Le vendeur montre ${o}. Quelle est ${x.q} ?`,
    ]),
    ...qcm(x.r, x.faux),
    explanation: `${cap(le(o))} a la forme ${de(S[c].un)} : ${S[c].raison}. Réponse : ${x.r}.`,
    canvas: dessin(c),
  };
}

const EMPREINTE: Partial<Record<Cle, string>> = {
  cube: "seulement des carrés", pave: "des rectangles", prisme: "des rectangles et des triangles", pyrC: "un carré et des triangles",
  pyrT: "seulement des triangles", cyl: "deux disques", cone: "un seul disque",
};

function empreintes(): G {
  const c = un<Cle>(["cube", "pave", "prisme", "pyrC", "pyrT", "cyl", "cone"]);
  const o = un(S[c].objets);
  const P = perso();
  const juste = EMPREINTE[c] as string;
  const faux = Object.entries(EMPREINTE)
    .filter(([k, v]) => k !== c && !(c === "cube" && k === "pave") && v !== juste)
    .map(([, v]) => v as string);
  if (c === "cyl") faux.push("deux disques et un rectangle");
  if (c === "cube") faux.push("trois carrés seulement");
  return {
    text: `${un(["En arts plastiques, ", "Pour décorer une nappe, ", "Au centre de loisirs, ", "Pour une carte d'anniversaire, ", ""])}${P.nom} trempe chaque face plate de ${ce(o)} dans la peinture, puis la pose sur une feuille. ${un(["Quelles formes voit-on sur la feuille ?", `Quelles empreintes obtient-${P.il} ?`, "Que dessine la peinture sur la feuille ?"])}`.replace(/^(.)/, (m) => m.toUpperCase()),
    ...qcm(juste, faux),
    explanation: `Chaque face plate laisse sa forme. ${cap(S[c].un)} a ${S[c].raison} : on obtient ${juste}.`,
    canvas: dessin(c),
  };
}

function facesDUneForme(): G {
  const cas = un([
    { c: "prisme" as Cle, adj: "triangulaires", pl: "triangles", n: 2, faux: [1, 3, 5] },
    { c: "prisme" as Cle, adj: "rectangulaires", pl: "rectangles", n: 3, faux: [2, 4, 5] },
    { c: "pyrC" as Cle, adj: "triangulaires", pl: "triangles", n: 4, faux: [3, 5, 2] },
    { c: "pyrC" as Cle, adj: "carrées", pl: "carrés", n: 1, faux: [0, 2, 4] },
    { c: "pyrT" as Cle, adj: "triangulaires", pl: "triangles", n: 4, faux: [3, 1, 6] },
    { c: "cube" as Cle, adj: "carrées", pl: "carrés", n: 6, faux: [3, 4, 8] },
    { c: "cyl" as Cle, adj: "en forme de disque", pl: "disques", n: 2, faux: [1, 3, 0] },
  ]);
  const o = objetCle(cas.c);
  const P = perso();
  return {
    text: un([
      `Combien de faces ${cas.adj} a ${ce(o)} ?`, `${P.nom} compte les faces ${cas.adj} de ${ce(o)}. Combien en trouve-t-${P.il} ?`,
      `${P.nom} veut colorier en rouge les faces ${cas.adj} de ${ce(o)}. Combien de faces va-t-${P.il} colorier ?`,
      `Sur ${ce(o)}, combien de faces sont des ${cas.pl} ?`,
    ]),
    ...qcmN(cas.n, cas.faux),
    explanation: `${cap(le(o))} a la forme ${de(S[cas.c].un)} : ${S[cas.c].raison}. On compte aussi les faces cachées : ${cas.n}.`,
    canvas: dessin(cas.c),
  };
}

function planesOuCourbes(): G {
  const cas = un([
    { c: "cyl" as Cle, q: "planes", n: 2, faux: [3, 1, 0] },
    { c: "cyl" as Cle, q: "courbes", n: 1, faux: [2, 0, 3] },
    { c: "cone" as Cle, q: "planes", n: 1, faux: [2, 0, 3] },
    { c: "cone" as Cle, q: "courbes", n: 1, faux: [0, 2, 3] },
    { c: "boule" as Cle, q: "planes", n: 0, faux: [1, 2, 6] },
    { c: "cube" as Cle, q: "planes", n: 6, faux: [3, 4, 8] },
    { c: "pave" as Cle, q: "courbes", n: 0, faux: [1, 2, 6] },
  ]);
  const o = objetCle(cas.c);
  const P = perso();
  const text =
    cas.q === "planes"
      ? un([
          `Combien de faces planes a ${ce(o)} ?`, `${P.nom} compte les faces planes de ${ce(o)}. Combien en trouve-t-${P.il} ?`,
          `${P.nom} veut faire des empreintes avec les faces planes de ${ce(o)}. Combien de faces planes y a-t-il ?`,
          `Combien de faces bien plates compte ${ce(o)} ?`,
        ])
      : un([
          `Combien de surfaces courbes, qui roulent, a ${ce(o)} ?`, `${P.nom} cherche sur ${ce(o)} les surfaces courbes, qui roulent. Combien y en a-t-il ?`,
          `Combien de parties arrondies (surfaces courbes) a ${ce(o)} ?`,
        ]);
  // qcmN ne garde que des valeurs > 0 : 0 s'écrit à part.
  const vals = melange(cas.faux.filter((v) => v !== cas.n)).slice(0, 3);
  return {
    text,
    ...qcm(String(cas.n), vals.map(String)),
    explanation: `Une face plane est toute plate ; une surface courbe est arrondie et roule. ${cap(le(o))} a la forme ${de(S[cas.c].un)} : ${S[cas.c].raison}. Réponse : ${cas.n}.`,
    canvas: dessin(cas.c),
  };
}

function saufLeDessous(): G {
  const c = un(POLY);
  const s = S[c];
  const P = perso();
  const F = s.faces as number;
  const base = c === "pyrC" || c === "pyrT" ? "la base posée sur le plat" : "celle posée sur le plat";
  if (Math.random() < 0.5) {
    const phrase = un([
      `Le pâtissier recouvre de chocolat toutes les faces d'un gâteau en forme de ${s.nom}, sauf ${base}. Combien de faces recouvre-t-il ?`,
      `${P.nom} peint toutes les faces d'une caisse en forme de ${s.nom}, sauf celle posée au sol. Combien de faces peint-${P.il} ?`,
      `L'emballeuse colle du papier doré sur toutes les faces d'une boîte en forme de ${s.nom}, sauf le dessous. Combien de faces recouvre-t-elle ?`,
      `${P.nom} décore de gommettes toutes les faces d'une maquette en forme de ${s.nom}, sauf celle collée sur le socle. Combien de faces décore-t-${P.il} ?`,
    ]);
    return {
      text: phrase,
      ...qcmN(F - 1, [F, F - 2, 3, F + 1]),
      explanation: `${cap(s.un)} a ${F} faces (${DETAIL[c].faces.replace(/ : \d+$/, "")}). Sans celle du dessous : ${F} − 1 = ${F - 1}.`,
      canvas: dessin(c),
    };
  }
  const n = entre(2, 5);
  return {
    text: un([
      `Le menuisier vernit ${n} caisses en forme de ${s.nom} : toutes les faces, sauf celle du dessous. Combien de faces vernit-il en tout ?`,
      `La pâtissière glace ${n} gâteaux en forme de ${s.nom}, toutes les faces sauf celle posée sur le plat. Combien de faces glace-t-elle en tout ?`,
      `${P.nom} peint ${n} boîtes en forme de ${s.nom}, toutes les faces sauf le dessous. Combien de faces peint-${P.il} en tout ?`,
    ]),
    ...qcmN(n * (F - 1), [n * F, F - 1, n * (F - 2), n + F - 1]),
    explanation: `Chaque objet a ${F} faces ; sans le dessous, ${F - 1}. Pour ${n} objets : ${n} × ${F - 1} = ${n * (F - 1)}.`,
    canvas: dessin(c),
  };
}

const LISTES: { c: Cle; l: string }[] = [
  { c: "cube", l: "6 carrés pareils" },
  { c: "pave", l: "2 carrés pareils et 4 rectangles pareils" },
  { c: "pave", l: "6 rectangles, pareils deux par deux" },
  { c: "prisme", l: "2 triangles pareils et 3 rectangles" },
  { c: "pyrC", l: "1 carré et 4 triangles pareils" },
  { c: "pyrT", l: "4 triangles" },
  { c: "cyl", l: "2 disques pareils et un rectangle souple qu'on enroule" },
  { c: "cone", l: "1 disque et une portion de disque qu'on enroule en pointe" },
];

function facesVersSolide(): G {
  const x = un(LISTES);
  const P = perso();
  return {
    text: `${un([
      `${P.nom} a découpé ces faces dans du carton : ${x.l}. ${cap(P.il)} les assemble.`, `Le fabricant d'emballages prépare ${x.l}.`,
      `Dans la boîte de construction, ${P.nom} trouve ${x.l}.`, `Pour la kermesse, ${P.nom} découpe ${x.l}.`, `L'architecte a dessiné les faces d'une maquette : ${x.l}.`,
    ])} ${un(["Quel solide peut-on fabriquer ?", "Quel solide obtient-on ?", "Quel solide va-t-on construire ?"])}`,
    ...qcm(S[x.c].un, S[x.c].voisins.map(unNom)),
    explanation: `${cap(S[x.c].un)} a ${S[x.c].raison}.`,
  };
}

const AFFIRMATIONS: Record<Cle, { dit: string; juste: string }[]> = {
  cube: [
    { dit: "Les 6 faces de ce solide sont des carrés pareils.", juste: "c'est vrai" },
    { dit: "Je vois 3 faces, donc ce solide a 3 faces.", juste: "c'est faux : les faces cachées comptent aussi, il y en a 6" },
  ],
  pave: [
    { dit: "Toutes les faces de ce solide sont des carrés.", juste: "c'est faux : ses faces sont des rectangles, pas toutes carrées" },
    { dit: "Les faces de ce solide sont des rectangles.", juste: "c'est vrai" },
  ],
  prisme: [
    { dit: "Toutes les faces de ce solide sont des triangles.", juste: "c'est faux : seules les deux faces des bouts sont des triangles" },
    { dit: "Ce solide a 2 faces triangulaires et 3 faces rectangulaires.", juste: "c'est vrai" },
  ],
  pyrC: [
    { dit: "Toutes les faces de ce solide sont des triangles.", juste: "c'est faux : sa base est un carré" },
    { dit: "La base de ce solide est un carré.", juste: "c'est vrai" },
  ],
  pyrT: [
    { dit: "Toutes les faces de ce solide sont des triangles.", juste: "c'est vrai" },
    { dit: "La base de ce solide est un carré.", juste: "c'est faux : sa base est un triangle" },
  ],
  cyl: [
    { dit: "Ce solide a 3 faces planes.", juste: "c'est faux : il a 2 faces planes et une surface courbe" },
    { dit: "Ce solide a 2 faces planes.", juste: "c'est vrai" },
  ],
  cone: [
    { dit: "Ce solide n'a aucune face plane.", juste: "c'est faux : sa base est un disque plat" },
    { dit: "Ce solide a une seule face plane : un disque.", juste: "c'est vrai" },
  ],
  boule: [
    { dit: "Ce solide a une face plane.", juste: "c'est faux : il n'a aucune face plane" },
    { dit: "Ce solide n'a aucune face plane.", juste: "c'est vrai" },
  ],
};
/** Des raisons toujours fausses : elles ne peuvent pas devenir une deuxième bonne réponse. */
const FAUSSES_RAISONS = [
  "c'est faux : les faces cachées ne comptent pas",
  "c'est faux : les arêtes comptent aussi comme des faces",
  "c'est faux : une surface courbe est une face plane",
];

function vraiOuFaux(): G {
  const c = un(TOUS);
  const o = un(S[c].objets);
  const P = perso();
  const a = un(AFFIRMATIONS[c]);
  const faux = a.juste === "c'est vrai" ? FAUSSES_RAISONS : ["c'est vrai", ...melange([...FAUSSES_RAISONS]).slice(0, 2)];
  return {
    text: `${un([`${P.nom} regarde ${ce(o)} et dit :`, `En classe, ${P.nom} montre ${ce(o)} et dit :`, `${P.nom} tient ${ce(o)} et affirme :`, `Au club de maths, ${P.nom} observe ${ce(o)} et dit :`])} « ${a.dit} » ${un(["Qu'en penses-tu ?", `A-t-${P.il} raison ?`])}`,
    ...qcm(a.juste, faux),
    explanation: `${cap(le(o))} a la forme ${de(S[c].un)} : ${S[c].raison}.`,
    canvas: dessin(c),
  };
}

/* ═════════════════════════ SOLIDE_PATRON ═════════════════════════ */

/* ─── Les patrons de cube : on PLIE vraiment, en roulant le cube (repris du CE2) ───
   Plier un patron, c'est faire rouler le cube sur ses carrés. Six faces différentes
   au sol = un patron de cube ; deux fois la même = deux carrés qui se superposent. */
type Case = [number, number];
type V3 = [number, number, number];
const neg = (v: V3): V3 => [-v[0], -v[1], -v[2]];
const cle3 = (v: V3) => v.join(",");
const kc = (c: Case) => c.join(",");

function plier(cases: Case[]): string[] | null {
  const faces = new Map<string, string>();
  const dans = new Set(cases.map(kc));
  const pile: Array<{ c: Case; b: V3; n: V3; e: V3 }> = [{ c: cases[0], b: [0, 0, -1], n: [0, 1, 0], e: [1, 0, 0] }];
  faces.set(kc(cases[0]), cle3([0, 0, -1]));
  while (pile.length) {
    const { c, b, n, e } = pile.pop()!;
    const pas: Array<[Case, V3, V3, V3]> = [
      [[c[0], c[1] + 1], e, n, neg(b)],
      [[c[0], c[1] - 1], neg(e), n, b],
      [[c[0] - 1, c[1]], n, neg(b), e],
      [[c[0] + 1, c[1]], neg(n), b, e],
    ];
    for (const [v, nb, nn, ne] of pas) {
      if (!dans.has(kc(v)) || faces.has(kc(v))) continue;
      faces.set(kc(v), cle3(nb));
      pile.push({ c: v, b: nb, n: nn, e: ne });
    }
  }
  const res = cases.map((c) => faces.get(kc(c))!);
  return new Set(res).size === 6 ? res : null;
}

function hexomino(): Case[] {
  for (;;) {
    const cs: Case[] = [[0, 0]];
    while (cs.length < 6) {
      const [r, c] = un(cs);
      const v = un<Case>([[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]);
      if (!cs.some((x) => kc(x) === kc(v))) cs.push(v);
    }
    const r0 = Math.min(...cs.map((x) => x[0]));
    const c0 = Math.min(...cs.map((x) => x[1]));
    let n: Case[] = cs.map(([r, c]) => [r - r0, c - c0]);
    const h = Math.max(...n.map((x) => x[0])) + 1;
    const w = Math.max(...n.map((x) => x[1])) + 1;
    if (h > w) n = n.map(([r, c]) => [c, r]);
    if (Math.max(h, w) <= 5 && Math.min(h, w) <= 4) return n.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  }
}
const forme = (cs: Case[]) => cs.map(kc).sort().join(";");
function unPatron(valide: boolean, eviter: string[] = []): Case[] {
  for (;;) {
    const h = hexomino();
    if ((plier(h) !== null) === valide && !eviter.includes(forme(h))) return h;
  }
}
const patrons = (liste: PatronsCubeCanvasData["patrons"]): CanvasFigure => ({ kind: "patrons_cube", patrons: liste }) as CanvasFigure;
/** Un patron seul se dessine en grand sur le quadrillage (le canvas des patrons le rendait à 112 px). */
const surQuadrillage = (cs: Case[]): CanvasFigure => {
  const h = Math.max(...cs.map((c) => c[0])) + 1;
  const w = Math.max(...cs.map((c) => c[1])) + 1;
  const f: FigureLibreCanvasData = {
    kind: "figure_libre",
    grid: { rows: h + 2, cols: w + 2, filledCells: cs.map(([r, c]) => [r + 1, c + 1] as [number, number]) },
    display: { showGrid: true, showFilled: true, showPerimeter: false },
  };
  return f as CanvasFigure;
};
const figurePatron = (panneaux: PanneauPatron[], description: string): CanvasFigure => ({ kind: "patron_solide", panneaux, description }) as CanvasFigure;

/* ─── Les dépliages calculés (pavé, prisme, cylindre, pyramides) ─── */
type Plat = "pave" | "prisme" | "cyl" | "pyrC" | "pyrT";
const PLATS: Plat[] = ["pave", "prisme", "cyl", "pyrC", "pyrT"];
const PIECES: Record<Plat | "cube", number> = { cube: 6, pave: 6, prisme: 5, cyl: 3, pyrC: 5, pyrT: 4 };

/** Trois dimensions bien différentes : un couvercle trop large se VOIT. */
function dimsPave() {
  const l = entre(2, 3);
  const h = l + entre(2, 3);
  const L = un([h + 1, h + 2, l + 1].filter((v) => v !== h && v !== l));
  return { L, l, h };
}
type Defaut = DefautPave | DefautPrisme | DefautCylindre | DefautPyramide;
/** Un atelier de dépliages : les mêmes dimensions pour le vrai patron et les faux qu'on compare. */
function atelierPatron(p: Plat): (defaut?: Defaut, nom?: string) => PanneauPatron {
  if (p === "pave") {
    const { L, l, h } = dimsPave();
    return (defaut, nom) => patronPave(L, l, h, { haut: un([0, 1] as const), bas: un([0, 1] as const), defaut: defaut as DefautPave, nom });
  }
  if (p === "prisme") {
    const [a, b, c] = un([[3, 4, 5], [3, 3, 3], [4, 4, 3], [3, 3, 4], [4, 5, 4]]);
    const h = entre(4, 6);
    return (defaut, nom) => patronPrisme(a, b, c, h, { defaut: defaut as DefautPrisme, nom });
  }
  if (p === "cyl") {
    const r = un([1, 1.2, 1.4]);
    const h = entre(3, 5);
    return (defaut, nom) => patronCylindre(r, h, { defaut: defaut as DefautCylindre, nom, decalageHaut: Math.random(), decalageBas: Math.random() });
  }
  const s = entre(4, 5);
  return (defaut, nom) => patronPyramide(p === "pyrC" ? 4 : 3, 3, s, { defaut: defaut as DefautPyramide, nom });
}
const deplier = (p: Plat, defaut?: Defaut, nom?: string) => atelierPatron(p)(defaut, nom);

const RAISONS = {
  ok: "oui, il se referme bien",
  manque: "non, il manque une face",
  trop: "non, il y a une face en trop",
  dessus: "non, deux faces se retrouvent l'une sur l'autre",
  taille: "non, une face n'a pas la bonne taille",
};
const DEFAUTS: Record<Plat, { d: Defaut; r: keyof typeof RAISONS }[]> = {
  pave: [{ d: "face_manquante", r: "manque" }, { d: "deux_couvercles_meme_cote", r: "dessus" }, { d: "couvercle_trop_large", r: "taille" }],
  prisme: [{ d: "rectangle_manquant", r: "manque" }, { d: "deux_triangles_meme_cote", r: "dessus" }, { d: "rectangle_trop_large", r: "taille" }, { d: "triangle_faux", r: "taille" }],
  cyl: [{ d: "disque_manquant", r: "manque" }, { d: "disques_meme_cote", r: "dessus" }, { d: "disque_trop_grand", r: "taille" }, { d: "rectangle_diametre", r: "taille" }],
  pyrC: [{ d: "triangle_manquant", r: "manque" }, { d: "triangle_de_trop", r: "trop" }, { d: "triangles_trop_courts", r: "taille" }],
  pyrT: [{ d: "triangle_manquant", r: "manque" }, { d: "triangle_de_trop", r: "trop" }, { d: "triangles_trop_courts", r: "taille" }],
};
/** Des objets qu'on fabrique vraiment en carton. */
const EN_CARTON: Partial<Record<Cle, string[]>> = {
  cube: ["un dé à jouer", "un Rubik's cube", "une boîte cadeau aux faces toutes carrées"],
  pave: ["une boîte de céréales", "une brique de lait", "une boîte à chaussures", "une boîte d'allumettes", "un carton de déménagement"],
  prisme: ["une boîte de chocolats en forme de toit", "une maquette de tente canadienne", "un présentoir de table en triangle"],
  cyl: ["une boîte de conserve", "une boîte de chips en tube", "une canette", "un tambour en carton", "un pot à crayons avec couvercle"],
  pyrC: ["une maquette de la pyramide du Louvre", "une maquette de pyramide d'Égypte", "une boîte cadeau en pointe à base carrée"],
  pyrT: ["un berlingot de lait", "un berlingot de bonbons"],
  cone: ["un chapeau de fête", "un chapeau de sorcière", "un cornet de glace", "un chapeau pointu de clown"],
};
const enCarton = (c: Cle) => un(EN_CARTON[c] as string[]);
const DEF_PATRON = "Un patron, c'est le solide déplié à plat : en le pliant, chaque face trouve sa place, sans trou ni face en double.";

const DECOUPE = (P: Perso) => [
  "Le fabricant d'emballages découpe ce patron dans du carton.", `${P.nom} a dessiné ce patron sur une feuille.`,
  "Le pâtissier découpe ce carton pour une boîte à gâteau.", `Pour la kermesse, ${P.nom} découpe ce patron.`,
  "À l'usine, une machine découpe ce patron.", `En arts plastiques, ${P.nom} plie ce patron.`, "La maîtresse distribue ce patron.",
  `${P.nom} trouve ce carton déplié au fond d'un placard.`, "L'architecte prépare ce patron pour une maquette.",
];
const VOISINS_PATRON: Record<Plat | "cube", Cle[]> = {
  cube: ["pave", "pyrC", "prisme"], pave: ["cube", "prisme", "cyl"], prisme: ["pyrT", "pave", "pyrC"],
  cyl: ["cone", "pave", "prisme"], pyrC: ["prisme", "pyrT", "cone"], pyrT: ["pyrC", "prisme", "cone"],
};

function patronQuelSolide(): G {
  const p = un<Plat | "cube">(["cube", "pave", "prisme", "cyl", "pyrC", "pyrT"]);
  const P = perso();
  const canvas = p === "cube" ? surQuadrillage(unPatron(true)) : figurePatron([deplier(p)], "Un patron de solide");
  return {
    text: `${un(DECOUPE(P))} ${un(["Quel solide obtient-on en le pliant ?", "Une fois plié, quel solide donne-t-il ?", "Quel solide va-t-on fabriquer ?", "Plié, que devient ce patron ?"])}`,
    ...qcm(S[p].un, VOISINS_PATRON[p].map(unNom)),
    explanation: `${DEF_PATRON} Ici : ${S[p].raison}. C'est le patron ${de(S[p].un)}.`,
    canvas,
  };
}

function patronPieces(): G {
  const p = un<Plat | "cube">(["cube", "pave", "prisme", "cyl", "pyrC", "pyrT"]);
  const P = perso();
  const n = PIECES[p];
  const canvas = p === "cube" ? surQuadrillage(unPatron(true)) : figurePatron([deplier(p)], "Un patron de solide");
  const faux = p === "cube" || p === "pave" ? [4, 3, 8] : p === "cyl" ? [2, 1, 4] : p === "pyrT" ? [3, 5, 6] : [4, 6, 8];
  return {
    text: `${un(DECOUPE(P))} ${un([
      "Combien de pièces compte ce patron ?", "Combien de morceaux faut-il plier ?",
      `${P.nom} colorie chaque pièce d'une couleur. Combien de couleurs faut-il ?`, "Combien de faces dessine ce patron ?",
    ])}`,
    ...qcmN(n, faux),
    explanation: `${DEF_PATRON} ${cap(S[p].un)} : ${n} pièces, une par face.`,
    canvas,
  };
}

const OUI_CUBE = "oui, il se referme en cube";
const NON_CUBE = "non, deux carrés se retrouvent l'un sur l'autre";

function patronCubeOuiNon(): G {
  const P = perso();
  const valide = Math.random() < 0.5;
  const cs = unPatron(valide);
  return {
    text: `${un([
      `${P.nom} découpe ces six carrés pour fabriquer un dé.`, `Pour emballer un cadeau en forme de cube, ${P.nom} dessine ce patron.`,
      `Le fabricant de Rubik's cubes teste ce patron.`, `Le pâtissier découpe ce carton pour une boîte à gâteau en forme de cube.`,
      `La maîtresse donne ce patron à ${P.nom}.`, `${P.nom} a dessiné ces six carrés sur du carton.`, "Le menuisier prépare ces six planches carrées.",
    ])} ${un(["Obtient-on un cube ?", "Peut-on fermer un cube avec ?", "Est-ce un patron de cube ?"])}`,
    ...qcm(valide ? OUI_CUBE : NON_CUBE, [OUI_CUBE, NON_CUBE, "non, il manque un carré", "non, il y a un carré en trop"]),
    explanation: `${DEF_PATRON} ${valide ? "En repliant les carrés autour du fond, chacun trouve sa place : c'est un patron de cube." : "En repliant, deux carrés tombent au même endroit et une face reste ouverte : ce n'est pas un patron de cube."}`,
    canvas: surQuadrillage(cs),
  };
}

function patronCubeTrois(): G {
  const P = perso();
  const chercheBon = Math.random() < 0.6;
  const intrusCs = unPatron(chercheBon);
  const a1 = unPatron(!chercheBon);
  const a2 = unPatron(!chercheBon, [forme(a1)]);
  const ordre = melange([intrusCs, a1, a2]);
  const noms = ["A", "B", "C"];
  const lettre = noms[ordre.indexOf(intrusCs)];
  const juste = `le patron ${lettre}`;
  return {
    text: `${un([
      `${P.nom} a dessiné trois patrons pour fabriquer un dé.`, "Voici trois assemblages de six carrés.", "Le fabricant de boîtes cadeaux hésite entre ces trois patrons.",
      `Pour son Rubik's cube en carton, ${P.nom} prépare trois patrons.`, "Le menuisier a posé six planches carrées de trois façons.",
    ])} ${chercheBon ? un(["Lequel est un patron de cube ?", "Lequel se replie en cube ?", "Avec lequel peut-on fermer un cube ?"]) : un(["Lequel NE se replie PAS en cube ?", "Lequel n'est pas un patron de cube ?", "Avec lequel ne peut-on PAS fermer un cube ?"])}`,
    ...qcm(juste, noms.map((n) => `le patron ${n}`)),
    explanation: `${DEF_PATRON} ${chercheBon ? `Seul le patron ${lettre} se replie sans que deux carrés se superposent.` : `Les deux autres se ferment bien ; le patron ${lettre} pose deux carrés au même endroit.`}`,
    canvas: patrons(ordre.map((cases, i) => ({ nom: noms[i], cases }))),
  };
}

function patronComparer(): G {
  const p = un(PLATS);
  const P = perso();
  const fauxD = melange([...DEFAUTS[p]]).slice(0, 2);
  const noms = ["A", "B", "C"];
  const tous = melange([{ ok: true, d: undefined as Defaut | undefined }, ...fauxD.map((f) => ({ ok: false, d: f.d as Defaut | undefined }))]);
  const fab = atelierPatron(p);
  const panneaux = tous.map((x, i) => fab(x.d, noms[i]));
  const lettre = noms[tous.findIndex((x) => x.ok)];
  const o = enCarton(p);
  return {
    text: `${un([
      `Le fabricant d'emballages hésite entre ces trois patrons pour ${o}.`, `${P.nom} a dessiné trois patrons pour fabriquer ${o}.`,
      `Pour une maquette, l'architecte compare ces trois patrons ${de(S[p].un)}.`, `À l'usine, une machine a découpé ces trois cartons pour ${o}.`,
    ])} ${un([`Lequel se replie en ${S[p].nom} ?`, "Lequel est un vrai patron ?", "Avec lequel peut-on fermer le solide ?"])}`,
    ...qcm(`le patron ${lettre}`, noms.map((n) => `le patron ${n}`)),
    explanation: `${DEF_PATRON} Les deux autres ont un défaut : ${[...new Set(fauxD.map((f) => RAISONS[f.r].replace(/^non, /, "")))].join(" ; ")}.`,
    canvas: figurePatron(panneaux, `Trois patrons ${de(S[p].un)}`),
  };
}

function patronSeReferme(): G {
  const p = un(PLATS);
  const P = perso();
  const valide = Math.random() < 0.4;
  const f = valide ? null : un(DEFAUTS[p]);
  const juste = valide ? RAISONS.ok : RAISONS[f!.r];
  const o = enCarton(p);
  return {
    text: `${un([
      `${P.nom} veut fabriquer ${o} avec ce patron.`, `Le fabricant d'emballages a découpé ce patron pour ${o}.`,
      `Pour la kermesse, ${P.nom} prépare ce patron ${de(S[p].un)}.`, `L'architecte a dessiné ce patron ${de(S[p].un)} pour sa maquette.`,
    ])} ${un([`Ce patron se referme-t-il en ${S[p].nom} ?`, `Peut-on fermer ${S[p].un} avec ce patron ?`, "Ce patron est-il juste ?"])}`,
    ...qcm(juste, Object.values(RAISONS)),
    explanation: `${DEF_PATRON} ${cap(S[p].un)} a ${S[p].raison}. ${valide ? "Ici, chaque face trouve sa place." : `Ici, ${juste.replace(/^non, /, "")}.`}`,
    canvas: figurePatron([deplier(p, f?.d)], `Un patron ${de(S[p].un)}`),
  };
}

/** Un dé déplié : les nombres au hasard, il faut PLIER pour trouver la face d'en face. */
function patronDe(): G {
  const P = perso();
  const cs = unPatron(true);
  const f = plier(cs)!;
  const nombres = melange([1, 2, 3, 4, 5, 6]);
  const i = Math.floor(Math.random() * 6);
  const opp = f.findIndex((x) => x === cle3(neg(f[i].split(",").map(Number) as V3)));
  const juste = nombres[opp];
  const faux = nombres.filter((_, j) => j !== i && j !== opp);
  return {
    text: `${un([
      `${P.nom} fabrique un dé avec ce patron.`, "On plie ce patron pour faire un dé.", `Pour le jeu de l'oie, ${P.nom} fabrique un dé tout neuf.`,
      "Le fabricant de jouets imprime ce patron de dé.", `Le magicien montre à ${P.nom} un dé déplié.`,
    ])} ${un([`Quel nombre sera en face du ${nombres[i]} ?`, `Quand le dé est fermé, quel nombre est opposé au ${nombres[i]} ?`, `Si le ${nombres[i]} est dessous, quel nombre est dessus ?`])}`,
    ...qcm(String(juste), faux.map(String)),
    explanation: `${DEF_PATRON} On pose le ${nombres[i]} au fond et on replie : les carrés qui le touchent deviennent les côtés, celui qui reste vient en face. C'est le ${juste}.`,
    canvas: patrons([{ cases: cs, textes: cs.map((c, j) => ({ case: c, texte: String(nombres[j]) })) }]),
  };
}

/** Un vrai dé : deux faces opposées font 7. Trois nombres écrits, un « ? » en face de l'un d'eux. */
function patronDeSept(): G {
  const P = perso();
  const cs = unPatron(true);
  const f = plier(cs)!;
  // Les trois paires de faces opposées (indices des carrés).
  const paires: [number, number][] = [];
  const vus = new Set<number>();
  for (let i = 0; i < 6; i++) {
    if (vus.has(i)) continue;
    const j = f.findIndex((x) => x === cle3(neg(f[i].split(",").map(Number) as V3)));
    paires.push([i, j]);
    vus.add(i);
    vus.add(j);
  }
  const valeurs = melange([[1, 6], [2, 5], [3, 4]] as [number, number][]);
  const texte = new Map<number, string>();
  const montres: number[] = [];
  paires.forEach(([i, j], k) => {
    const a = un(valeurs[k]);
    texte.set(i, String(a));
    montres.push(a);
    if (k === 0) texte.set(j, "?");
  });
  const juste = 7 - montres[0];
  return {
    text: `${un([
      `${P.nom} fabrique un vrai dé avec ce patron.`, "Le fabricant de jeux imprime ce patron de dé.", `Pour le jeu de l'oie, ${P.nom} écrit les nombres sur ce patron de dé.`,
      `${P.nom} a commencé à remplir ce patron de dé.`,
    ])} Sur un vrai dé, deux faces opposées font toujours 7. ${un(["Quel nombre écrire à la place du « ? » ?", "Que faut-il écrire dans la case « ? » ?", "Quel nombre manque dans la case « ? » ?"])}`,
    ...qcm(String(juste), [String(montres[0]), String(7 - montres[1]), String(7 - montres[2])]),
    explanation: `On plie dans sa tête : la case « ? » vient en face du ${montres[0]}. Les deux font 7 : 7 − ${montres[0]} = ${juste}.`,
    canvas: patrons([{ cases: cs, textes: [...texte.entries()].map(([k, t]) => ({ case: cs[k], texte: t })) }]),
  };
}

/** Il manque un carré : une seule des trois places ferme le cube. */
function patronManque(): G {
  const P = perso();
  for (;;) {
    const net = unPatron(true);
    const enleve = Math.floor(Math.random() * 6);
    const cinq = net.filter((_, j) => j !== enleve);
    const vus = new Set([kc(cinq[0])]);
    const file = [cinq[0]];
    while (file.length) {
      const [r, c] = file.pop()!;
      for (const v of cinq)
        if (!vus.has(kc(v)) && Math.abs(v[0] - r) + Math.abs(v[1] - c) === 1) {
          vus.add(kc(v));
          file.push(v);
        }
    }
    if (vus.size !== 5) continue;
    const voisins = new Map<string, Case>();
    for (const [r, c] of cinq)
      for (const v of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]] as Case[])
        if (!cinq.some((x) => kc(x) === kc(v))) voisins.set(kc(v), v);
    const bons = [...voisins.values()].filter((v) => plier([...cinq, v]) !== null);
    const mauvais = [...voisins.values()].filter((v) => plier([...cinq, v]) === null);
    if (bons.length < 1 || mauvais.length < 2) continue;
    const places = melange([un(bons), ...melange(mauvais).slice(0, 2)]);
    const toutes = [...cinq, ...places];
    const larg = Math.max(...toutes.map((x) => x[1])) - Math.min(...toutes.map((x) => x[1]));
    const haut = Math.max(...toutes.map((x) => x[0])) - Math.min(...toutes.map((x) => x[0]));
    if (Math.max(larg, haut) > 4 || Math.min(larg, haut) > 3) continue;
    const noms = ["A", "B", "C"];
    const lettre = noms[places.findIndex((p) => plier([...cinq, p]) !== null)];
    const juste = `à la place ${lettre}`;
    return {
      text: `${un([
        `${P.nom} a perdu un carré de son patron de cube.`, "Il manque un carré à ce patron de dé.", `${P.nom} doit coller un sixième carré pour fermer sa boîte cadeau.`,
        "Le fabricant d'emballages a oublié une face de ce patron de cube.", `Pour finir son Rubik's cube en carton, ${P.nom} doit ajouter un carré.`,
      ])} ${un(["Où faut-il l'ajouter ?", "À quelle place faut-il le coller pour fermer le cube ?", "Quelle place permet d'obtenir un cube ?"])}`,
      ...qcm(juste, noms.map((n) => `à la place ${n}`)),
      explanation: `${DEF_PATRON} Collé en ${lettre}, le sixième carré ferme la face qui restait ouverte ; aux deux autres places, il se poserait sur un carré déjà là.`,
      canvas: patrons([{ cases: cinq, places: places.map((p, j) => ({ case: p, texte: noms[j] })) }]),
    };
  }
}

const A_DECOUPER: Partial<Record<Cle, string>> = {
  cube: "6 carrés pareils", pave: "6 rectangles, pareils deux par deux", prisme: "2 triangles et 3 rectangles", pyrC: "1 carré et 4 triangles",
  pyrT: "4 triangles", cyl: "2 disques et 1 rectangle", cone: "1 disque et 1 portion de disque",
};
const PIEGES_DECOUPE: Partial<Record<Cle, string[]>> = {
  cube: ["4 carrés pareils", "3 carrés pareils"], pave: ["4 rectangles", "3 rectangles"], prisme: ["3 triangles et 2 rectangles", "2 triangles et 2 rectangles"],
  pyrC: ["4 triangles", "1 carré et 3 triangles"], pyrT: ["1 carré et 3 triangles", "3 triangles"], cyl: ["2 disques seulement", "2 disques et 1 triangle"],
  cone: ["1 disque et 1 triangle", "2 disques et 1 rectangle"],
};

function piecesADecouper(): G {
  const c = un<Cle>(["cube", "pave", "prisme", "pyrC", "pyrT", "cyl", "cone"]);
  const o = enCarton(c);
  const P = perso();
  const juste = A_DECOUPER[c] as string;
  const autres = Object.entries(A_DECOUPER).filter(([k]) => k !== c && !(c === "cube" && k === "pave")).map(([, v]) => v as string);
  return {
    text: `${un([
      `Pour fabriquer ${o} en carton, quelles pièces faut-il découper ?`, `${P.nom} veut fabriquer ${o} en carton. Quelles pièces doit-${P.il} découper ?`,
      `Le fabricant d'emballages prépare le patron ${de(o)}. Quelles pièces contient-il ?`,
    ])}`,
    ...qcm(juste, [...(PIEGES_DECOUPE[c] as string[]), ...melange(autres).slice(0, 1)]),
    explanation: `${DEF_PATRON} ${cap(S[c].un)} a ${S[c].raison} : il faut ${juste}.`,
    canvas: dessin(c),
  };
}

/* ═════════════════════════ SOLIDE_DEFI ═════════════════════════ */

/** Un tas de petits cubes « en escalier » : les colonnes de devant ne sont jamais plus hautes que celles de derrière. */
function tas(nx: number, ny: number, hmax: number, etage = true): { cubes: { x: number; y: number; z: number }[]; total: number; colonnes: number } {
  for (;;) {
    const h: number[][] = [];
    for (let x = 0; x < nx; x++) {
      h.push([]);
      for (let y = 0; y < ny; y++) {
        const maxi = Math.min(x > 0 ? h[x - 1][y] : hmax, y > 0 ? h[x][y - 1] : hmax);
        h[x].push(entre(Math.min(1, maxi), maxi));
      }
    }
    const cubes: { x: number; y: number; z: number }[] = [];
    for (let x = 0; x < nx; x++) for (let y = 0; y < ny; y++) for (let z = 0; z < h[x][y]; z++) cubes.push({ x, y, z });
    const colonnes = h.flat().filter((v) => v > 0).length;
    if ((!etage || cubes.length > colonnes) && cubes.length >= 4) return { cubes, total: cubes.length, colonnes };
  }
}
const assemblage = (cubes: { x: number; y: number; z: number }[]): CanvasFigure =>
  ({ kind: "solide_3d", solide: "assemblage_cubes", cubes, display: { showLabels: false } }) as CanvasFigure;

const EMPILE = (P: Perso) => [
  "Le maçon empile des blocs en forme de cube.", `${P.nom} a construit cette tour avec des cubes de bois.`,
  "Dans l'entrepôt, le magasinier empile des caisses cubiques.", "Le marchand de fruits empile des cagettes cubiques.",
  `${P.nom} empile des dés en mousse.`, "Le pâtissier empile des petits gâteaux en forme de cube.",
  `Avec ses Rubik's cubes, ${P.nom} fait un escalier.`, "Sur le port, la grue empile des conteneurs cubiques.",
  `${P.nom} range ses cubes de construction en tas.`,
];

function compterCubes(grand: boolean): () => G {
  return () => {
    const P = perso();
    const t = grand ? tas(un([2, 3]), un([2, 3]), 3) : tas(2, un([1, 2]), 2);
    return {
      text: `${un(EMPILE(P))} ${un(["Combien de cubes y a-t-il en tout ?", "Combien de cubes a-t-on utilisés ?", "Compte tous les cubes, même ceux qu'on ne voit pas. Combien y en a-t-il ?"])}`,
      ...qcmN(t.total, [t.colonnes, t.total - 1, t.total + 1, t.total + 2]),
      explanation: `On compte colonne par colonne : chaque cube du haut est posé sur ceux du dessous, qu'on ne voit pas tous. En tout : ${t.total} cubes.`,
      canvas: assemblage(t.cubes),
    };
  };
}

function completerPave(): G {
  const P = perso();
  for (;;) {
    const [a, b, c] = un([[2, 2, 2], [3, 2, 2], [3, 2, 1], [3, 3, 1], [2, 2, 3], [3, 2, 3]]);
    const t = tas(a, b, c, false);
    const cible = a * b * c;
    if (t.total >= cible || cible - t.total < 2) continue;
    const sol = a === b && b === c ? "un grand cube" : "un pavé droit";
    const dims = `${a} cubes de long, ${b} de large et ${c} de haut`;
    return {
      text: `${un([
        `Le maçon veut finir ${sol} de ${dims}.`, `${P.nom} veut construire ${sol} de ${dims}.`,
        `Dans l'entrepôt, le magasinier doit ranger les caisses en ${sol} de ${dims}.`, `Le pâtissier veut former ${sol} de ${dims} avec ses gâteaux cubes.`,
      ])} Voici ce qui est déjà posé. ${un(["Combien de cubes manque-t-il ?", "Combien de cubes faut-il encore ajouter ?"])}`,
      ...qcmN(cible - t.total, [t.total, cible, cible - t.total + 1, cible - t.total - 1]),
      explanation: `${sol === "un grand cube" ? "Le grand cube" : "Le pavé"} complet : ${a} × ${b} × ${c} = ${cible} cubes. Déjà posés : ${t.total}. Il manque ${cible} − ${t.total} = ${cible - t.total} cubes.`,
      canvas: assemblage(t.cubes),
    };
  }
}

function cubePeint(): G {
  const P = perso();
  const cube = (n: number) => {
    const l: { x: number; y: number; z: number }[] = [];
    for (let x = 0; x < n; x++) for (let y = 0; y < n; y++) for (let z = 0; z < n; z++) l.push({ x, y, z });
    return l;
  };
  const contexte = un([
    { t: "Un Rubik's cube est fait de 3 × 3 × 3 petits cubes.", colle: "ont des couleurs" },
    { t: `${P.nom} peint en rouge un grand cube fait de 3 × 3 × 3 petits cubes, puis le défait.`, colle: "sont peints" },
    { t: "Le pâtissier recouvre de chocolat un gâteau en cube, puis le coupe en 3 × 3 × 3 petits cubes.", colle: "ont du chocolat" },
    { t: "Le menuisier vernit un grand cube de bois, puis le scie en 3 × 3 × 3 petits cubes.", colle: "ont du vernis" },
  ]);
  const q = un([
    { qui: `Combien de petits cubes ${contexte.colle} sur 3 faces ?`, r: 8, why: "Ce sont les petits cubes des coins : un par sommet du grand cube, 8." },
    { qui: `Combien de petits cubes ${contexte.colle} sur 2 faces exactement ?`, r: 12, why: "Ce sont ceux du milieu de chaque arête : un par arête du grand cube, 12." },
    { qui: `Combien de petits cubes ${contexte.colle} sur une seule face ?`, r: 6, why: "C'est celui du centre de chaque face : un par face du grand cube, 6." },
    { qui: "Combien de petits cubes y a-t-il en tout ?", r: 27, why: "3 × 3 × 3 = 27." },
  ]);
  return {
    text: `${contexte.t} ${q.qui}`,
    ...qcmN(q.r, [8, 12, 6, 27, 26, 9].filter((v) => v !== q.r)),
    explanation: q.why,
    canvas: assemblage(cube(3)),
  };
}

function assembler(): G {
  const P = perso();
  const cas = un([
    { t: `${P.nom} colle deux cubes pareils face contre face.`, q: "Quel solide obtient-on ?", r: "un pavé droit", faux: ["un grand cube", "un prisme droit", "une pyramide à base carrée"], c: "cube" as Cle, why: "Deux cubes collés font une boîte deux fois plus longue : un pavé droit." },
    { t: "Le boucher coupe un pâté en forme de cube en deux, parallèlement à une face.", q: "Quelle forme a chaque morceau ?", r: "un pavé droit", faux: ["un cube", "un prisme droit", "une pyramide à base carrée"], c: "cube" as Cle, why: "Chaque moitié garde 6 faces rectangulaires, mais elles ne sont plus toutes carrées : un pavé droit." },
    { t: "Le cuisinier coupe un rondin de pâte à cookies en tranches, parallèlement aux disques.", q: "Quelle forme a chaque tranche ?", r: "un cylindre", faux: ["une boule", "un cône", "un pavé droit"], c: "cyl" as Cle, why: "Chaque tranche a deux disques et une surface courbe : un petit cylindre." },
    { t: "Le fromager coupe un pavé de fromage en deux, en suivant la diagonale de la face du dessus, tout droit vers le bas.", q: "Quelle forme a chaque morceau ?", r: "un prisme droit", faux: ["une pyramide à base triangulaire", "un pavé droit", "un cube"], c: "pave" as Cle, why: "Chaque morceau a deux faces en triangle et trois faces rectangulaires : un prisme droit." },
    { t: `${P.nom} colle deux pyramides à base carrée pareilles par leur base.`, q: "Combien de faces a le nouveau solide ?", r: "8", faux: ["10", "5", "6"], c: "pyrC" as Cle, why: "Les deux bases carrées collées disparaissent à l'intérieur : il reste 4 + 4 = 8 triangles." },
    { t: `${P.nom} pose une pyramide à base carrée sur un cube de même côté, pour faire une maison.`, q: "Combien de faces a la maison ?", r: "9", faux: ["11", "10", "8"], c: "pyrC" as Cle, why: "Le cube garde 5 faces (le dessus est caché), la pyramide 4 triangles : 5 + 4 = 9." },
    { t: `${P.nom} met trois cubes pareils bout à bout, en ligne.`, q: "Quel solide obtient-on ?", r: "un pavé droit", faux: ["un grand cube", "un prisme droit", "un cylindre"], c: "cube" as Cle, why: "Trois cubes en ligne font une boîte trois fois plus longue : un pavé droit." },
  ]);
  return {
    text: `${cas.t} ${cas.q}`,
    ...qcm(cas.r, cas.faux),
    explanation: cas.why,
    canvas: dessin(cas.c),
  };
}

function quiEnUtilisePlus(): G {
  const [A, B] = deux();
  const [c1, c2] = melange([...POLY]).slice(0, 2) as Poly[];
  const quoi = un<"aretes" | "sommets">(["aretes", "sommets"]);
  const mat = quoi === "aretes" ? un(["pailles", "cure-dents", "baguettes"]) : un(["boules de pâte à modeler", "guimauves", "perles"]);
  const n1 = compte(c1, quoi);
  const n2 = compte(c2, quoi);
  const egal = "les deux en utilisent autant";
  const juste = n1 === n2 ? egal : n1 > n2 ? A.nom : B.nom;
  return {
    text: `${A.nom} fabrique le squelette ${de(S[c1].un)}, ${B.nom} celui ${de(S[c2].un)}, avec des ${mat} pour les ${MOT[quoi]}. ${un([`Qui utilise le plus de ${mat} ?`, `Qui a besoin du plus de ${mat} ?`])}`,
    ...qcm(juste, [A.nom, B.nom, egal]),
    explanation: `${cap(S[c1].un)} a ${n1} ${MOT[quoi]} ; ${S[c2].un} en a ${n2}. ${n1 === n2 ? "C'est pareil." : `C'est ${juste} qui en utilise le plus.`}`,
  };
}

function resteApres(): G {
  const c = un<Poly>(["cube", "pave", "pyrC", "prisme"]);
  const s = S[c];
  const P = perso();
  const pl = un(s.pluriels);
  const quoi = un<"sommets" | "aretes">(["sommets", "aretes"]);
  const k = compte(c, quoi);
  const n = entre(2, 4);
  const stock = n * k + entre(2, 9);
  const [objet, un1] = quoi === "sommets"
    ? un([["coins en mousse", "un"], ["perles", "une"], ["gommettes", "une"], ["grelots", "un"]] as const)
    : un([["bandes de ruban adhésif", "une"], ["baguettes", "une"], ["morceaux de ruban", "un"], ["guirlandes", "une"]] as const);
  const qui = quoi === "sommets" ? un(["Le déménageur", P.nom, "La décoratrice", "Le fabricant de jouets"]) : un(["Le menuisier", P.nom, "L'emballeuse", "Le décorateur"]);
  return {
    text: `${qui} a ${stock} ${objet}. Il en faut ${un1} sur chaque ${quoi === "sommets" ? "sommet" : "arête"} de ${n} ${pl}. ${un([`Combien de ${objet} restera-t-il ?`, `Combien lui en restera-t-il ?`])}`,
    ...qcmN(stock - n * k, [stock - k, n * k, stock - n * (quoi === "sommets" ? s.aretes! : s.sommets!), stock - n * (s.faces as number)]),
    explanation: `${cap(s.un)} a ${k} ${MOT[quoi]}. Pour ${n} objets : ${n} × ${k} = ${n * k}. Il reste ${stock} − ${n * k} = ${stock - n * k}.`,
    canvas: dessin(c),
  };
}

/* ═════════════════════════ CM2 : PYRAMIDES ET PRISMES COMPTÉS PAR RÈGLE ═════════════════════════
   Vidéo « sommets, arêtes et faces » : une pyramide a autant d'arêtes autour de la base
   que d'arêtes qui montent (2 × n), et un sommet de plus que sa base (n + 1). Le prisme :
   n en bas, n en haut, n debout (3 × n arêtes), 2 × n sommets, n + 2 faces. */

type Base = { n: number; adj: string; poly: string; un: string; pl: string };
const BASES: Base[] = [
  { n: 3, adj: "triangulaire", poly: "triangle", un: "un triangle", pl: "triangles" },
  { n: 4, adj: "carrée", poly: "carré", un: "un carré", pl: "carrés" },
  { n: 5, adj: "pentagonale", poly: "pentagone", un: "un pentagone", pl: "pentagones" },
  { n: 6, adj: "hexagonale", poly: "hexagone", un: "un hexagone", pl: "hexagones" },
  { n: 8, adj: "octogonale", poly: "octogone", un: "un octogone", pl: "octogones" },
];
/** Le prisme à base carrée est un pavé droit : on ne le nomme pas « prisme » au CM2. */
const BASES_PRISME = BASES.filter((b) => b.n !== 4);
type Famille = "pyr" | "pri";
const nomPF = (f: Famille, b: Base) => (f === "pyr" ? `une pyramide à base ${b.adj}` : `un prisme droit à base ${b.adj}`);
/** « en forme de pyramide à base hexagonale » */
const formePF = (f: Famille, b: Base) => nomPF(f, b).replace(/^une? /, "");
const tirerPF = (): { f: Famille; b: Base } => {
  const f: Famille = Math.random() < 0.55 ? "pyr" : "pri";
  return { f, b: un(f === "pyr" ? BASES : BASES_PRISME) };
};
const comptePF = (f: Famille, b: Base, q: Quoi) =>
  f === "pyr" ? { faces: b.n + 1, sommets: b.n + 1, aretes: 2 * b.n }[q] : { faces: b.n + 2, sommets: 2 * b.n, aretes: 3 * b.n }[q];
const reglePF = (f: Famille, b: Base, q: Quoi) => {
  const n = b.n;
  if (f === "pyr")
    return {
      faces: `la base et un triangle sur chaque côté de la base : 1 + ${n} = ${n + 1} faces`,
      sommets: `${n} sommets autour de la base, plus la pointe : ${n} + 1 = ${n + 1} sommets`,
      aretes: `${n} arêtes autour de la base et ${n} qui montent vers la pointe : ${n} + ${n} = ${2 * n} arêtes`,
    }[q];
  return {
    faces: `les 2 bases et un rectangle par côté de la base : 2 + ${n} = ${n + 2} faces`,
    sommets: `${n} sommets en bas et ${n} en haut : ${n} + ${n} = ${2 * n} sommets`,
    aretes: `${n} arêtes en bas, ${n} en haut et ${n} debout : 3 × ${n} = ${3 * n} arêtes`,
  }[q];
};
const piegesPF = (f: Famille, b: Base, q: Quoi): number[] => {
  const n = b.n;
  if (f === "pyr") return { faces: [n, n + 2, 2 * n], sommets: [n, 2 * n, n + 2], aretes: [n, n + 1, 3 * n, 2 * n + 1] }[q];
  return { faces: [n, n + 1, 2 * n], sommets: [n, n + 2, 3 * n], aretes: [2 * n, n + 2, 4 * n, 2 * n + 2] }[q];
};
/** Le solide dessiné : en relief s'il existe, sinon son patron (pyramide), sinon rien. */
function dessinPF(f: Famille, b: Base): { canvas?: CanvasFigure; voici: string } {
  if (f === "pyr" && b.n === 4) return { canvas: dessin("pyrC"), voici: "" };
  if (f === "pyr" && b.n === 3) return { canvas: dessin("pyrT"), voici: "" };
  if (f === "pri" && b.n === 3) return { canvas: dessin("prisme"), voici: "" };
  if (f === "pyr") return { canvas: figurePatron([patronPyramide(b.n, 3, 4.5)], "Le patron de la pyramide"), voici: " Voici son patron." };
  return { voici: "" };
}

const OBJETS_PF = [
  "une sculpture", "une maquette", "une lanterne en papier", "un presse-papier en verre", "une boîte cadeau", "un flacon de parfum",
  "une bougie", "une boîte de bonbons", "un trophée", "une boîte à bijoux", "un bloc de cristal", "une tour en carton", "un pendentif", "un savon",
];
const ARTISANS = (P: Perso) => [
  P.nom, "La sculptrice", "Le maquettiste", "La verrière", "Le chocolatier", "L'architecte", "La potière", "Le menuisier",
  "L'ingénieure", "La décoratrice", "Le bijoutier", "La fleuriste", "Le savonnier", "La créatrice de lanternes",
];
/** [geste, question pour un objet, ce qu'on compte (pour « en tout »)]. */
const GESTES_PF: Record<Quoi, [string, string, string][]> = {
  faces: [["peint chaque face", "Combien de faces faut-il peindre ?", "faces peintes"], ["colle une étiquette sur chaque face", "Combien d'étiquettes faut-il ?", "étiquettes"], ["polit chaque face", "Combien de faces faut-il polir ?", "faces polies"], ["décore chaque face d'un dessin", "Combien de dessins faut-il ?", "dessins"]],
  sommets: [["colle une perle sur chaque sommet", "Combien de perles faut-il ?", "perles"], ["arrondit chaque sommet", "Combien de sommets faut-il arrondir ?", "sommets arrondis"], ["pose une gommette sur chaque sommet", "Combien de gommettes faut-il ?", "gommettes"], ["accroche un grelot à chaque sommet", "Combien de grelots faut-il ?", "grelots"]],
  aretes: [["colle un ruban sur chaque arête", "Combien de rubans faut-il ?", "rubans"], ["adoucit chaque arête", "Combien d'arêtes faut-il adoucir ?", "arêtes adoucies"], ["renforce chaque arête avec une baguette", "Combien de baguettes faut-il ?", "baguettes"], ["repasse chaque arête au feutre doré", "Combien de traits faut-il ?", "traits"]],
};
/** « de 4 sculptures en forme de pyramides à base hexagonale » : le pluriel du nom. */
const plurPF = (f: Famille, b: Base) => (f === "pyr" ? `pyramides à base ${b.adj}` : `prismes droits à base ${b.adj}`);
const combienDe = (x: string) => (/^[aeiouéèêh]/.test(x) ? `Combien d'${x}` : `Combien de ${x}`);

/** ★2 : la question courte de la vidéo (« une pyramide a une base à 6 côtés »). */
function reglePFcourt(): G {
  const { f, b } = tirerPF();
  const q = un<Quoi>(["faces", "sommets", "aretes"]);
  const r = comptePF(f, b, q);
  const sol = f === "pyr" ? "pyramide" : "prisme droit";
  const elle = f === "pyr" ? "elle" : "il";
  const dq = q === "aretes" ? "d'arêtes" : `de ${MOT[q]}`;
  const d = dessinPF(f, b);
  return {
    text: `${un([
      `${f === "pyr" ? "Une" : "Un"} ${sol} a une base à ${b.n} côtés.`, `La base ${f === "pyr" ? "d'une" : "d'un"} ${sol} est ${b.un}.`,
      `Voici ${nomPF(f, b)}.`, `On regarde ${nomPF(f, b)}.`,
    ])} ${un([`Combien a-t-${elle} ${dq} ?`, `Combien compte-t-${elle} ${dq} ?`, `Quel est son nombre ${dq} ?`])}`,
    ...qcmN(r, piegesPF(f, b, q)),
    explanation: `On compte étage par étage : ${reglePF(f, b, q)}.`,
    ...(d.canvas ? { canvas: d.canvas } : {}),
  };
}

/** ★3 : la même règle, dans l'atelier d'un artisan. */
function reglePF3(): G {
  const { f, b } = tirerPF();
  const q = un<Quoi>(["faces", "sommets", "aretes"]);
  const r = comptePF(f, b, q);
  const P = perso();
  const [geste, question] = un(GESTES_PF[q]);
  const d = dessinPF(f, b);
  return {
    text: `${un(ARTISANS(P))} ${geste} ${de(un(OBJETS_PF))} en forme de ${formePF(f, b)}.${d.voici} ${question}`.replace(/faut-il \?$/, un(["faut-il ?", "lui faut-il ?"])),
    ...qcmN(r, piegesPF(f, b, q)),
    explanation: `${cap(nomPF(f, b))} : ${reglePF(f, b, q)}. Il en faut ${r}.`,
    ...(d.canvas ? { canvas: d.canvas } : {}),
  };
}

/** ★3 : la règle à l'envers (« une pyramide a 10 arêtes : combien de côtés à sa base ? »). */
function reglePFinverse(): G {
  const { f, b } = tirerPF();
  const q = un<Quoi>(["aretes", "aretes", "sommets", "faces"]);
  const N = comptePF(f, b, q);
  const P = perso();
  const sol = f === "pyr" ? "pyramide" : "prisme droit";
  const un1 = f === "pyr" ? "une" : "un";
  const dit = un([
    `${cap(un1)} ${sol} a ${N} ${MOT[q]}.`, `${P.nom} compte ${N} ${MOT[q]} sur ${un1} ${sol}.`,
    `La sculptrice taille ${un1} ${sol} qui a ${N} ${MOT[q]}.`, `Le maquettiste fabrique ${un1} ${sol} de ${N} ${MOT[q]}.`,
  ]);
  const regle = f === "pyr"
    ? { aretes: `autant d'arêtes autour de la base que d'arêtes qui montent : ${N} = ${b.n} + ${b.n}`, sommets: `un sommet de plus que sa base, la pointe : ${N} = ${b.n} + 1`, faces: `la base plus un triangle par côté : ${N} = 1 + ${b.n}` }[q]
    : { aretes: `${b.n} arêtes en bas, ${b.n} en haut et ${b.n} debout : ${N} = 3 × ${b.n}`, sommets: `autant de sommets en haut qu'en bas : ${N} = ${b.n} + ${b.n}`, faces: `2 bases plus un rectangle par côté : ${N} = 2 + ${b.n}` }[q];
  const fin = `Sa base a ${b.n} côtés : c'est ${nomPF(f, b)}.`;
  if (Math.random() < 0.5) {
    const memeFamille = (f === "pyr" ? BASES : BASES_PRISME).filter((x) => x.n !== b.n).map((x) => nomPF(f, x));
    const autreFamille = f === "pri" || b.n !== 4 ? [nomPF(f === "pyr" ? "pri" : "pyr", b)] : [];
    return {
      text: `${dit} ${un(["Quel est son nom exact ?", "De quel solide s'agit-il ?", "Comment s'appelle ce solide ?"])}`,
      ...qcm(nomPF(f, b), [...melange(memeFamille).slice(0, 2), ...autreFamille, ...memeFamille]),
      explanation: `${cap(un1)} ${sol} a ${regle}. ${fin}`,
    };
  }
  return {
    text: `${dit} ${un(["Combien de côtés a sa base ?", "Combien sa base a-t-elle de côtés ?", "Sa base a combien de côtés ?"])}`,
    ...qcmN(b.n, [N, N - 1, N - 2, Math.round(N / 2) === b.n ? N + 1 : Math.round(N / 2), b.n + 1, b.n - 1]),
    explanation: `${cap(un1)} ${sol} a ${regle}. ${fin}`,
  };
}

/** ★3 : le squelette en pailles d'une pyramide ou d'un prisme (le short : « 5 boules »). */
function squelettePF(): G {
  const { f, b } = tirerPF();
  const P = perso();
  const [m, j] = un(MATERIAUX);
  const quoi = un(["aretes", "sommets", "tout"] as const);
  const a = comptePF(f, b, "aretes");
  const so = comptePF(f, b, "sommets");
  const fa = comptePF(f, b, "faces");
  const juste = quoi === "aretes" ? a : quoi === "sommets" ? so : a + so;
  const faux = quoi === "aretes" ? [so, fa, ...piegesPF(f, b, "aretes")] : quoi === "sommets" ? [a, fa, ...piegesPF(f, b, "sommets")] : [a, so, a + fa, so + fa];
  const d = dessinPF(f, b);
  return {
    text: `${un([
      `En arts plastiques, ${P.nom} fabrique le squelette ${de(nomPF(f, b))}`, `La sculptrice prépare la carcasse ${de(nomPF(f, b))}`,
      `Pour la fête de la science, ${P.nom} construit le squelette ${de(nomPF(f, b))}`, `Le maquettiste monte le squelette ${de(nomPF(f, b))}`,
      `La créatrice de lanternes fabrique l'armature ${de(nomPF(f, b))}`,
    ])} : des ${m} pour les arêtes, des ${j} pour les sommets.${d.voici} ${quoi === "aretes" ? `Combien de ${m} faut-il ?` : quoi === "sommets" ? `Combien de ${j} faut-il ?` : `Combien d'objets faut-il en tout, ${m} et ${j} ensemble ?`}`,
    ...qcmN(juste, faux),
    explanation:
      quoi === "tout"
        ? `${cap(nomPF(f, b))} a ${a} arêtes et ${so} sommets : ${a} + ${so} = ${a + so}.`
        : `${cap(nomPF(f, b))} : ${reglePF(f, b, quoi)}. Il faut ${juste} ${quoi === "aretes" ? m : j}.`,
    ...(d.canvas ? { canvas: d.canvas } : {}),
  };
}

/** ★2 : ce qu'on voit et ce qui est caché (la vidéo : « on voit 9 arêtes… mais il en a 12 »). */
function visiblesCaches(): G {
  const c = un<Poly>(["cube", "pave"]);
  const o = un(S[c].objets);
  const P = perso();
  const cas = un([
    { q: "faces" as Quoi, vu: 3, tot: 6 },
    { q: "aretes" as Quoi, vu: 9, tot: 12 },
    { q: "sommets" as Quoi, vu: 7, tot: 8 },
  ]);
  const mot = MOT[cas.q];
  const cache = cas.tot - cas.vu;
  const demandeCache = Math.random() < 0.5;
  return {
    text: `${un([`${P.nom} pose ${o} sur la table.`, `Sur l'étagère, il y a ${o}.`, `${P.nom} dessine ${o} en perspective.`, `Le vendeur pose ${o} sur le comptoir.`, `${P.nom} photographie ${o}.`])} ${un(["On voit", "D'où l'on est, on voit", "Sur le dessin, on voit"])} ${cas.vu} ${mot}. ${demandeCache ? un([`Combien ${cas.q === "faces" ? "de faces sont cachées" : cas.q === "aretes" ? "d'arêtes sont cachées" : "de sommets sont cachés"} ?`, "Combien en reste-t-il qu'on ne voit pas ?"]) : un([`Combien ${cas.q === "aretes" ? "d'arêtes" : `de ${mot}`} y a-t-il en tout ?`, `Combien ${cas.q === "aretes" ? "d'arêtes" : `de ${mot}`} a vraiment ce solide ?`])}`,
    ...qcmN(demandeCache ? cache : cas.tot, demandeCache ? [cas.vu, cas.tot, cache + 1, cache + 2] : [cas.vu, cas.vu + 1, cas.tot + 2, cas.tot - 2]),
    explanation: `${cap(S[c].un)} a ${cas.tot} ${mot}. On en voit ${cas.vu} ; ${cas.q === "sommets" ? "le dernier est caché" : `les ${cache} autres sont cachées`} derrière ou dessous (en pointillés sur un dessin) : ${cas.tot} − ${cas.vu} = ${cache}.`,
    canvas: dessin(c),
  };
}

/* ═════════════════════════ CM2 : LES FACES, COMBIEN ET DE QUELLES FORMES ═════════════════════════ */

/** Trois dimensions bien différentes, en cm. */
function troisDims(maxL = 30) {
  for (;;) {
    const L = entre(6, maxL);
    const l = entre(3, L - 2);
    const h = entre(2, Math.max(3, L - 1));
    if (h !== l && h !== L) return { L, l, h };
  }
}
const paveCote = (L: number, l: number, h: number): CanvasFigure =>
  ({
    kind: "solide_3d",
    solide: "pave_droit",
    dimensions: { longueur: L, largeur: l, hauteur: h },
    highlight: { base: false, hauteur: false },
    display: { showLabels: false, showDimensions: true, showFormulaHint: false },
  }) as CanvasFigure;
const cubeCote = (a: number): CanvasFigure =>
  ({
    kind: "solide_3d",
    solide: "cube",
    dimensions: { cote: a },
    highlight: { base: false, hauteur: false },
    display: { showLabels: false, showDimensions: true, showFormulaHint: false },
  }) as CanvasFigure;

const BOITES_PAVE = (P: Perso): [string, string][] => [
  ["Le chocolatier", "une boîte en chocolat"], ["La pâtissière", "un gâteau"], ["Le menuisier", "une caisse en bois"], ["L'emballeuse", "un carton"],
  ["La libraire", "un livre"], [P.nom, "une boîte à chaussures"], ["Le maçon", "une brique"], ["La fleuriste", "une jardinière"],
  ["Le verrier", "un aquarium"], ["Le fabricant de jouets", "un coffre à jouets"], ["Le boulanger", "un moule à pain de mie"], ["La couturière", "une boîte à couture"],
  ["Le déménageur", "un carton de déménagement"], ["La bibliothécaire", "une boîte d'archives"], ["Le fromager", "un bloc de fromage"], ["La savonnière", "un savon"],
];

/** La face du dessus : la longueur sur la largeur ; devant : la longueur sur la hauteur ; côté : la largeur sur la hauteur. */
function facesPaveMesures(court: boolean): () => G {
  return () => {
    const { L, l, h } = troisDims();
    const P = perso();
    const [qui, o] = un(BOITES_PAVE(P));
    const F = un([
      { nom: "la face du dessus", r: [L, l] }, { nom: "la face du dessous", r: [L, l] },
      { nom: "la face de devant", r: [L, h] }, { nom: "la face de derrière", r: [L, h] },
      { nom: "une face de côté", r: [l, h] },
    ]);
    const s = (a: number, b: number) => `${a} cm sur ${b} cm`;
    const toutes = [s(L, l), s(L, h), s(l, h), s(L, L), s(l, l)];
    const juste = s(F.r[0], F.r[1]);
    const dims = `${L} cm de long, ${l} cm de large et ${h} cm de haut`;
    return {
      text: court
        ? `${un(["Une boîte en pavé droit mesure", "Un pavé droit mesure", "Cette boîte mesure"])} ${dims}. ${un([`Quelles sont les mesures de ${F.nom} ?`, `Que mesure ${F.nom} ?`])}`
        : `${qui} ${un(["fabrique", "prépare", "décore", "mesure"])} ${o} en forme de pavé droit : ${dims}. ${un([`Il faut couvrir ${F.nom}. Quelles sont ses mesures ?`, `Quelles sont les mesures de ${F.nom} ?`, `On veut un dessin sur ${F.nom}. Quelle taille doit-il avoir ?`])}`,
      ...qcm(juste, toutes),
      explanation: `Le dessus et le dessous ont la longueur et la largeur (${s(L, l)}) ; devant et derrière, la longueur et la hauteur (${s(L, h)}) ; les deux côtés, la largeur et la hauteur (${s(l, h)}). Ici : ${juste}.`,
      canvas: paveCote(L, l, h),
    };
  };
}

/** ★3 : les faces vont par paires, jumelles face à face. */
function pairesPave(): G {
  const { L, l, h } = troisDims();
  const P = perso();
  const [qui, o] = un(BOITES_PAVE(P));
  const cas = un([
    { q: `Combien de faces de ${L} cm sur ${l} cm a ${ce(o)} ?`, r: 2, faux: [1, 4, 6], why: `Le dessus et le dessous mesurent ${L} cm sur ${l} cm : 2 faces, face à face.` },
    { q: `Combien de faces de ${L} cm sur ${h} cm a ${ce(o)} ?`, r: 2, faux: [1, 4, 3], why: `Devant et derrière mesurent ${L} cm sur ${h} cm : 2 faces, face à face.` },
    { q: `Combien de faces de ${l} cm sur ${h} cm a ${ce(o)} ?`, r: 2, faux: [1, 4, 6], why: `Les deux côtés mesurent ${l} cm sur ${h} cm : 2 faces, face à face.` },
    { q: `Combien de sortes de faces différentes a ${ce(o)} ?`, r: 3, faux: [6, 2, 4], why: `Les 6 faces vont par paires de jumelles : ${L} sur ${l}, ${L} sur ${h}, ${l} sur ${h}. 3 sortes de faces.` },
  ]);
  return {
    text: `${qui} ${un(["fabrique", "prépare", "décore"])} ${o} en forme de pavé droit de ${L} cm de long, ${l} cm de large et ${h} cm de haut. ${cas.q}`,
    ...qcmN(cas.r, cas.faux),
    explanation: `Dans un pavé droit, chaque face a une jumelle juste en face, exactement pareille. ${cas.why}`,
    canvas: paveCote(L, l, h),
  };
}

/** ★2 : un cube de a cm d'arête (la question de la vidéo). */
function facesCube(): G {
  const a = entre(2, 15);
  const P = perso();
  const [qui, o] = un<[string, string]>([
    [P.nom, "un dé géant"], ["Le chocolatier", "un bonbon"], ["La potière", "un pot à crayons"], ["Le menuisier", "un tabouret"],
    ["La sculptrice", "un bloc de pierre"], ["Le pâtissier", "un gâteau"], ["L'emballeuse", "une boîte cadeau"], ["Le verrier", "un aquarium"],
    ["La couturière", "un pouf"], ["Le fabricant de jouets", "un dé en mousse"], ["La savonnière", "un savon"], ["Le glacier", "un glaçon géant"],
  ]);
  return {
    text: `${un([`${qui} fabrique ${o} en forme de cube de ${a} cm d'arête.`, `Un cube a des arêtes de ${a} cm.`, `${qui} taille ${o} en cube : chaque arête mesure ${a} cm.`])} ${un(["Quelles sont ses faces ?", "Comment sont ses faces ?", "Que peut-on dire de ses faces ?"])}`,
    ...qcm(`6 carrés de ${a} cm de côté`, [`6 rectangles de ${a} cm sur ${2 * a} cm`, `4 carrés et 2 rectangles`, `3 carrés de ${a} cm de côté`, `8 carrés de ${a} cm de côté`]),
    explanation: `Un cube a 6 faces, toutes des carrés pareils. Chaque côté d'une face est une arête : 6 carrés de ${a} cm de côté.`,
    canvas: cubeCote(a),
  };
}

/** ★3 : les étiquettes d'une pyramide ou d'un prisme (le défi de la vidéo : « 1 pentagone et 5 triangles »). */
function facesPyrPri(): G {
  const { f, b } = tirerPF();
  const P = perso();
  const n = b.n;
  let juste: string;
  let faux: string[];
  if (f === "pyr") {
    juste = n === 3 ? "4 triangles" : `1 ${b.poly} et ${n} triangles`;
    faux = n === 3
      ? ["3 triangles", "1 carré et 3 triangles", "2 triangles et 3 rectangles"]
      : [`${n} triangles`, `1 ${b.poly} et ${n + 1} triangles`, `2 ${b.pl} et ${n} rectangles`, `1 ${b.poly} et ${n} rectangles`];
  } else {
    juste = `2 ${b.pl} et ${n} rectangles`;
    faux = [`1 ${b.poly} et ${n} triangles`, `2 ${b.pl} et ${n + 2} rectangles`, `${n} rectangles`, `2 ${b.pl} et ${n - 1} rectangles`];
  }
  const d = dessinPF(f, b);
  const qui = un(ARTISANS(P));
  const [geste, q] = un<[string, string]>([
    ["colle une étiquette sur chaque face", "Combien d'étiquettes, et de quelles formes ?"],
    ["découpe dans du carton chaque face", "Quelles pièces doit-il y avoir ?"],
    ["peint d'une couleur différente chaque face", "Quelles formes va-t-on peindre ?"],
    ["imprime à l'encre, sur une feuille, chaque face", "Quelles empreintes voit-on ?"],
  ]);
  return {
    text: `${qui} ${geste} ${de(un(OBJETS_PF))} en forme de ${formePF(f, b)}.${d.voici} ${q}`,
    ...qcm(juste, faux),
    explanation:
      f === "pyr"
        ? `Une pyramide : 1 base, puis un triangle sur chaque côté de la base. La base a ${n} côtés : ${juste}.`
        : `Un prisme droit : 2 bases pareilles face à face, et un rectangle par côté de la base. La base a ${n} côtés : ${juste}.`,
    ...(d.canvas ? { canvas: d.canvas } : {}),
  };
}

/** ★4 : le papier pour recouvrir des faces (aire du carré, du rectangle) — faces par paires. */
function aireFaces(): G {
  const P = perso();
  const [qui, o] = un(BOITES_PAVE(P));
  const geste = un(["recouvre de papier cadeau", "peint", "recouvre de tissu", "colle du papier doré sur"]);
  if (Math.random() < 0.4) {
    const a = entre(2, 10);
    const [qc, oc] = un<[string, string]>([[P.nom, "un dé géant"], ["L'emballeuse", "une boîte cadeau"], ["Le chocolatier", "un bonbon"], ["La couturière", "un pouf"], ["Le menuisier", "un tabouret"]]);
    return {
      text: `${qc} ${geste} toutes les faces ${de(oc)} en forme de cube de ${a} cm d'arête. ${un(["Quelle aire faut-il couvrir ?", "Quelle est l'aire de toutes ses faces ?"])}`,
      ...qcmN(6 * a * a, [4 * a * a, a * a, 6 * a, 12 * a, 3 * a * a], "cm²"),
      explanation: `Un cube a 6 faces, des carrés de ${a} cm de côté. Une face : ${a} × ${a} = ${a * a} cm². Les 6 : 6 × ${a * a} = ${6 * a * a} cm².`,
      canvas: cubeCote(a),
    };
  }
  const { L, l, h } = troisDims(12);
  const cas = un([
    { q: "le dessus et le dessous", r: 2 * L * l, why: `Le dessus et le dessous : 2 × (${L} × ${l}) = ${2 * L * l} cm².` },
    { q: "le devant et le derrière", r: 2 * L * h, why: `Devant et derrière : 2 × (${L} × ${h}) = ${2 * L * h} cm².` },
    { q: "les deux faces de côté", r: 2 * l * h, why: `Les deux côtés : 2 × (${l} × ${h}) = ${2 * l * h} cm².` },
    { q: "toutes les faces", r: 2 * (L * l + L * h + l * h), why: `3 paires de faces : 2 × (${L} × ${l}) + 2 × (${L} × ${h}) + 2 × (${l} × ${h}) = ${2 * L * l} + ${2 * L * h} + ${2 * l * h} = ${2 * (L * l + L * h + l * h)} cm².` },
  ]);
  return {
    text: `${qui} ${geste} ${cas.q} ${de(o)} en forme de pavé droit de ${L} cm de long, ${l} cm de large et ${h} cm de haut. ${un(["Quelle aire faut-il couvrir ?", "Quelle aire cela fait-il ?"])}`,
    ...qcmN(cas.r, [cas.r / 2, L * l + L * h + l * h, L * l * h, 2 * (L + l + h), cas.r + L * l], "cm²"),
    explanation: `Les faces vont par paires, jumelles face à face. ${cas.why}`,
    canvas: paveCote(L, l, h),
  };
}

/* ═════════════════════════ CM2 : RECONNAÎTRE ═════════════════════════ */

/** ★3 : le portrait d'un prisme ou d'une pyramide à base quelconque. */
function portraitPF(): G {
  const { f, b } = tirerPF();
  const P = perso();
  const d =
    f === "pyr"
      ? un([`J'ai une base en ${b.poly} et ${b.n} triangles qui montent vers une pointe.`, `Ma base est ${b.un} ; sur chacun de ses côtés, un triangle monte jusqu'à ma pointe.`])
      : un([`J'ai deux bases en ${b.poly}, face à face, et ${b.n} rectangles autour.`, `Mes deux bases sont des ${b.pl} pareils, face à face ; je n'ai que des faces plates.`]);
  const voisins = [nomPF(f === "pyr" ? "pri" : "pyr", b), ...melange(BASES.filter((x) => x.n !== b.n && (f === "pyr" || x.n !== 4))).slice(0, 2).map((x) => nomPF(f, x)), f === "pyr" ? "un cône" : "un cylindre"];
  return {
    text: un([
      `Devinette de ${P.nom} : « ${d} » Qui suis-je ?`, `L'ingénieur spatial décrit un module de sa station : « ${d} » Quel solide est-ce ?`,
      `Sur la carte du jeu, il est écrit : « ${d} » Quel est ce solide ?`, `La maquettiste lit sur son plan : « ${d} » De quel solide s'agit-il ?`,
    ]),
    ...qcm(nomPF(f, b), voisins),
    explanation:
      f === "pyr"
        ? `Une base et des triangles jusqu'à une pointe : une pyramide. Sa base est ${b.un} : ${nomPF(f, b)}.`
        : `Deux bases pareilles face à face et des rectangles autour : un prisme droit. Ses bases sont des ${b.pl} : ${nomPF(f, b)}.`,
  };
}

const PROPRIETES: { q: string; non: string; set: Cle[]; why: string }[] = [
  { q: "peut rouler", non: "ne peut PAS rouler", set: ["boule", "cyl", "cone"], why: "La boule, le cylindre et le cône ont une surface courbe : ils roulent. Les autres n'ont que des faces plates." },
  { q: "a une pointe", non: "n'a PAS de pointe", set: ["cone", "pyrC", "pyrT"], why: "Le cône et les pyramides montent jusqu'à une pointe." },
  { q: "n'a que des faces plates", non: "a une surface courbe", set: ["cube", "pave", "prisme", "pyrC", "pyrT"], why: "Le cube, le pavé, le prisme et la pyramide n'ont que des faces plates ; la boule, le cylindre et le cône ont une surface courbe." },
  { q: "a des faces en triangle", non: "n'a AUCUNE face en triangle", set: ["prisme", "pyrC", "pyrT"], why: "Le prisme droit à base triangulaire a 2 triangles ; les pyramides ont des triangles qui montent vers la pointe." },
];
const SANS_PAS = { q: "n'a aucune face plate", set: ["boule"] as Cle[], why: "Seule la boule n'a aucune face plate : elle est toute ronde." };

/** ★3 : le tri de la vidéo (« est-ce que ça roule ? y a-t-il une pointe ? »). */
function trierSolides(): G {
  const P = perso();
  const neg = Math.random() < 0.4;
  const p = Math.random() < 0.15 ? { ...SANS_PAS, non: "" } : un(PROPRIETES);
  const dans = p.set;
  const hors = TOUS.filter((c) => !dans.includes(c));
  const inverse = neg && p.non !== "" && dans.length >= 3;
  const [juste, faux]: [Cle, Cle[]] = inverse ? [un(hors), melange([...dans]).slice(0, 3)] : [un(dans), melange([...hors]).slice(0, 3)];
  const consigne = inverse ? p.non : p.q;
  return {
    text: `${un([
      "L'ingénieur spatial choisit un module pour sa station.", `${P.nom} trie les solides de la classe.`, "Le magasinier range des solides en bois.",
      "Au jeu des formes, la maîtresse montre quatre solides.", `${P.nom} range ses jouets.`, "La maquettiste choisit une forme pour sa tour.",
      "Le potier regarde ses moules.",
    ])} ${un([`Lequel de ces solides ${consigne} ?`, `Parmi ces solides, lequel ${consigne} ?`])}`,
    ...qcm(S[juste].un, faux.map(unNom)),
    explanation: `${p.why} Réponse : ${S[juste].un}.`,
  };
}

/** ★3 : le piège de la vidéo — prisme ou cylindre ? pyramide ou cône ? */
function piegePrismeCylindre(): G {
  const P = perso();
  const b = un(BASES_PRISME);
  const bp = un(BASES);
  type K = "prisme" | "cylindre" | "cone" | "pyramide";
  const R: Record<K | "ok", string> = {
    prisme: "non, c'est un prisme : ses bases sont des polygones",
    cylindre: "non, c'est un cylindre : ses bases sont des disques",
    cone: "non, c'est un cône : sa base est un disque",
    pyramide: "non, c'est une pyramide : sa base est un polygone",
    ok: `oui, ${P.il} a raison`,
  };
  const NOM: Record<K, string> = { prisme: "un prisme", cylindre: "un cylindre", cone: "un cône", pyramide: "une pyramide" };
  const cas = un<{ desc: string; dit: K; juste: K | "ok" }>([
    { desc: `deux bases en ${b.poly}, face à face, et que des faces plates`, dit: "cylindre", juste: "prisme" },
    { desc: "deux disques face à face et une surface courbe qui roule", dit: "prisme", juste: "cylindre" },
    { desc: "une base en disque et une pointe", dit: "pyramide", juste: "cone" },
    { desc: `une base en ${bp.poly}, et des triangles qui montent vers une pointe`, dit: "cone", juste: "pyramide" },
    { desc: "deux disques face à face et une surface courbe qui roule", dit: "cylindre", juste: "ok" },
    { desc: `une base en ${bp.poly}, et des triangles qui montent vers une pointe`, dit: "pyramide", juste: "ok" },
    { desc: `deux bases en ${b.poly}, face à face, et que des faces plates`, dit: "prisme", juste: "ok" },
  ]);
  // « non, c'est un cylindre » quand l'élève a dit « cylindre » ne veut rien dire : on le retire.
  const faux = (Object.keys(R) as (K | "ok")[]).filter((k) => k !== cas.dit && k !== cas.juste).map((k) => R[k]);
  return {
    text: `${un(["Un solide a", "Ce module de la station spatiale a", "La maquette a", "Le solide caché dans le sac a"])} ${cas.desc}. ${P.nom} dit que c'est ${NOM[cas.dit]}. ${un([`A-t-${P.il} raison ?`, "Qu'en penses-tu ?"])}`,
    ...qcm(R[cas.juste], faux),
    explanation: "Deux bases face à face : prisme (polygones, que des faces plates) ou cylindre (disques, il roule). Une pointe : pyramide (base polygone) ou cône (base disque).",
  };
}

/* ═════════════════════════ CM2 : PATRONS AVEC DES MESURES ═════════════════════════ */

/** ★2 : le patron d'une pyramide à base quelconque — on compte les côtés de la base. */
function patronPyramideN(): G {
  const b = un(BASES.filter((x) => x.n >= 3));
  const P = perso();
  const autres = [nomPF("pri", b.n === 4 ? BASES[0] : b), ...BASES.filter((x) => x.n !== b.n).map((x) => nomPF("pyr", x)), "un cône"];
  return {
    text: `${un(DECOUPE(P))} ${un(["Quel solide obtient-on en le pliant ?", "Une fois plié, quel solide donne-t-il ?", "Quel est le nom exact du solide ?"])}`,
    ...qcm(nomPF("pyr", b), autres.filter((x) => !/prisme droit à base carrée/.test(x))),
    explanation: `${DEF_PATRON} Une base et un triangle sur chaque côté, qui se replient vers une pointe : une pyramide. La base a ${b.n} côtés : ${nomPF("pyr", b)}.`,
    canvas: figurePatron([patronPyramide(b.n, 3, 4.5)], "Un patron de solide"),
  };
}

/** ★3 : la liste des faces avec leurs mesures (la question de la vidéo : 3 paires de rectangles). */
function patronParMesures(): G {
  const P = perso();
  const k = un([0, 0, 1, 2, 3, 4]);
  const { L, l, h } = troisDims(12);
  const a = entre(3, 9);
  const ha = a + entre(2, 6);
  const b = un(BASES.filter((x) => x.n >= 4));
  const cas = [
    { l: `2 rectangles de ${L} cm sur ${l} cm, 2 rectangles de ${L} cm sur ${h} cm et 2 rectangles de ${l} cm sur ${h} cm`, r: "un pavé droit", faux: ["un cube", "un prisme droit à base triangulaire", "une pyramide à base carrée"], why: "6 rectangles, en 3 paires : c'est un pavé droit. Un cube aurait 6 carrés pareils.", canvas: figurePatron([patronPave(L, l, h)], "Un patron de solide") },
    { l: `2 carrés de ${a} cm de côté et 4 rectangles de ${a} cm sur ${ha} cm`, r: "un pavé droit", faux: ["un cube", "une pyramide à base carrée", "un prisme droit à base triangulaire"], why: "Les 2 carrés ferment le haut et le bas, les 4 rectangles font le tour : un pavé droit. Pas un cube : ses faces ne sont pas toutes des carrés.", canvas: figurePatron([patronPave(a, a, ha)], "Un patron de solide") },
    { l: `6 carrés de ${a} cm de côté, bien placés`, r: "un cube", faux: ["un prisme droit à base triangulaire", "une pyramide à base carrée", "un prisme droit à base hexagonale"], why: "6 carrés pareils : c'est un cube.", canvas: surQuadrillage(unPatron(true)) },
    { l: "2 triangles pareils et 3 rectangles de même hauteur", r: "un prisme droit à base triangulaire", faux: ["une pyramide à base triangulaire", "une pyramide à base carrée", "un pavé droit"], why: "2 bases en triangle et 3 rectangles autour : un prisme droit à base triangulaire.", canvas: figurePatron([deplier("prisme")], "Un patron de solide") },
    { l: `1 ${b.poly} et ${b.n} triangles pareils, un sur chaque côté`, r: nomPF("pyr", b), faux: [...(b.n === 4 ? [] : [nomPF("pri", b)]), ...BASES.filter((x) => x.n !== b.n).map((x) => nomPF("pyr", x)).slice(0, 2), "un cône"], why: `Une base et des triangles qui se replient vers une pointe : ${nomPF("pyr", b)}.`, canvas: figurePatron([patronPyramide(b.n, 3, 4.5)], "Un patron de solide") },
  ][k];
  return {
    text: `${un([
      "La maquettiste découpe un patron dans du carton.", `${P.nom} dessine un patron.`, "L'architecte prépare le patron d'une maquette.",
      "Le fabricant d'emballages trace un patron.", "Pour une lanterne, la créatrice découpe un patron.", `En arts plastiques, ${P.nom} prépare un patron.`,
    ])} ${un(["Il contient", "On y trouve", "Ses pièces :"])} ${cas.l}. ${un(["Quel solide donne-t-il, une fois plié ?", "Quel solide obtiendra-t-on ?", "Plié, que devient-il ?"])}`,
    ...qcm(cas.r, cas.faux),
    explanation: `${DEF_PATRON} On compte les faces et on regarde leurs formes. ${cas.why}`,
    canvas: cas.canvas,
  };
}

/** ★4 : deux bords qui se collent ont la même longueur (le défi de la vidéo : la tour en pavé). */
function bordColle(): G {
  const P = perso();
  const tour = Math.random() < 0.4;
  const { L: L0, l: l0, h: h0 } = troisDims(14);
  const a = entre(3, 9);
  const [L, l, h] = tour ? [a, a, a + entre(4, 9)] : [L0, l0, h0];
  const p = patronPave(L, l, h, { haut: un([0, 1] as const), bas: un([0, 1] as const) });
  p.cotes = [
    cotePiece(p.pieces[0], 3, `${h} cm`),
    cotePiece(p.pieces[1], 2, `${L} cm`),
    ...(tour ? [] : [cotePiece(p.pieces[0], 2, `${l} cm`)]),
    cotePiece(p.pieces[4], 1, "?", true),
  ];
  const texte = tour
    ? `${un([`${P.nom} dessine le patron d'une tour en pavé :`, "La maquettiste trace le patron d'une tour :", "L'architecte dessine le patron d'un immeuble en pavé :"])} 4 rectangles de ${a} cm sur ${h} cm, en ligne, et 2 carrés. ${un(["Combien mesure le côté des carrés ?", "Quelle longueur marquer à la place du « ? » ?"])}`
    : `${un([`${P.nom} dessine le patron d'une boîte en pavé droit.`, "Le fabricant d'emballages trace ce patron de boîte.", "Le chocolatier prépare ce patron de boîte."])} ${un(["Quelle longueur doit avoir le bord marqué « ? » ?", "Combien doit mesurer le bord marqué « ? » pour que la boîte se ferme ?"])}`;
  return {
    text: texte,
    ...qcmN(l, [L, h, L + l, h - l, 2 * l], "cm"),
    explanation: `Deux bords qui se collent ont la même longueur, sinon la boîte bâille. ${tour ? `Les carrés ferment le haut et le bas de la tour : leurs bords se collent aux petits côtés des rectangles, qui mesurent ${l} cm. Le côté des carrés mesure ${l} cm.` : `Le bord « ? » se colle au bord d'une face de côté, la largeur de la boîte, qui mesure ${l} cm : il mesure ${l} cm.`}`,
    canvas: figurePatron([p], "Un patron de pavé avec des mesures"),
  };
}

/* ═════════════════════════ CM2 : DÉFIS À ÉTAPES (★4-★5) ═════════════════════════
   La vidéo défi : l'aquarium de 60 × 30 × 40 cm, un joint sur chaque arête :
   4 longueurs + 4 largeurs + 4 hauteurs = 520 cm = 5,2 m. Piège : 60 + 30 + 40. */

const ARETES_PAVE = (P: Perso) => [
  { qui: "Le fabricant d'aquariums", o: "un aquarium", mat: "joint", geste: "colle un joint sur chaque arête" },
  { qui: "Le vitrier", o: "une vitrine", mat: "joint", geste: "pose un joint sur chaque arête" },
  { qui: "Le menuisier", o: "une caisse", mat: "baguette", geste: "cloue une baguette sur chaque arête" },
  { qui: "L'électricienne", o: "une vitrine de Noël", mat: "guirlande lumineuse", geste: "pose une guirlande lumineuse sur chaque arête" },
  { qui: "La décoratrice", o: "une boîte cadeau", mat: "ruban doré", geste: "colle un ruban doré sur chaque arête" },
  { qui: "Le serrurier", o: "une cage", mat: "barre de métal", geste: "soude une barre de métal sur chaque arête" },
  { qui: P.nom, o: "une maquette", mat: "fil de fer", geste: "fabrique en fil de fer toutes les arêtes" },
  { qui: "La fabricante de terrariums", o: "un terrarium", mat: "joint", geste: "colle un joint sur chaque arête" },
  { qui: "Le chocolatier", o: "une boîte en chocolat", mat: "ruban de sucre", geste: "pose un ruban de sucre sur chaque arête" },
  { qui: "L'emballeuse", o: "un carton", mat: "ruban adhésif", geste: "colle du ruban adhésif sur chaque arête" },
];

/** ★4 : la longueur de joint pour toutes les arêtes d'un pavé, en cm ou en m. */
function jointPave(): G {
  const P = perso();
  const c = un(ARETES_PAVE(P));
  const L = un([40, 50, 60, 70, 80, 90, 100, 120]);
  const l = un([20, 25, 30, 35, 40].filter((x) => x < L));
  const h = un([25, 30, 35, 40, 45, 50, 60].filter((x) => x !== l && x !== L));
  const s = L + l + h;
  const tot = 4 * s;
  const enM = Math.random() < 0.5;
  const u = enM ? "m" : "cm";
  const k = enM ? 1 / 100 : 1;
  return {
    text: `${c.qui} ${c.geste} ${de(c.o)} en forme de pavé droit : ${L} cm de long, ${l} cm de large et ${h} cm de haut. ${un([`Quelle longueur de ${c.mat} faut-il en tout`, `Quelle longueur de ${c.mat} faut-il pour toutes les arêtes`, `Quelle est la longueur totale de ${c.mat} nécessaire`])}${enM ? ", en mètres ?" : " ?"}`,
    ...qcmN(tot * k, [s * k, 2 * s * k, 12 * L * k, enM ? tot / 10 : 3 * s, 8 * s * k], u, enM ? 0.1 : 10),
    explanation: `Un pavé a 12 arêtes : 4 longueurs, 4 largeurs, 4 hauteurs. 4 × ${L} + 4 × ${l} + 4 × ${h} = ${4 * L} + ${4 * l} + ${4 * h} = ${tot} cm${enM ? `, soit ${fr(tot / 100)} m` : ""}. Piège : ${L} + ${l} + ${h} ne compte que 3 arêtes sur 12.`,
    canvas: paveCote(L, l, h),
  };
}

/** ★4 : un cube, 12 arêtes pareilles (la question de la vidéo : 25 cm → 3 m). */
function jointCube(): G {
  const P = perso();
  const c = un(ARETES_PAVE(P));
  const a = un([15, 20, 25, 30, 35, 40, 45, 50, 60, 75]);
  const tot = 12 * a;
  const enM = Math.random() < 0.6;
  const u = enM ? "m" : "cm";
  const k = enM ? 1 / 100 : 1;
  return {
    text: `${c.qui} ${c.geste} ${de(c.o)} en forme de cube de ${a} cm d'arête. ${un([`Quelle longueur de ${c.mat} faut-il en tout`, `Quelle longueur de ${c.mat} faut-il pour toutes ses arêtes`, `Quelle est la longueur totale de ${c.mat} nécessaire`])}${enM ? ", en mètres ?" : " ?"}`,
    ...qcmN(tot * k, [6 * a * k, 8 * a * k, 4 * a * k, enM ? tot / 10 : 3 * a], u, enM ? 0.1 : 10),
    explanation: `Un cube a 12 arêtes pareilles : 12 × ${a} = ${tot} cm${enM ? `, soit ${fr(tot / 100)} m` : ""}. Pas 6 (ce sont les faces), ni 8 (les sommets).`,
    canvas: cubeCote(a),
  };
}

/** ★4 : la hauteur cachée (la vidéo : 400 cm de joint, 50 et 30 → 20 cm). */
function hauteurInconnue(): G {
  const P = perso();
  const c = un(ARETES_PAVE(P));
  for (;;) {
    const L = un([40, 50, 60, 70, 80]);
    const l = un([20, 25, 30, 35]);
    const h = un([10, 15, 20, 25, 30, 40, 45]);
    if (h === l || L + l + h > 150) continue;
    const tot = 4 * (L + l + h);
    const enM = tot % 100 === 0 && Math.random() < 0.5;
    return {
      text: `${c.qui} ${c.geste} ${de(c.o)} en forme de pavé droit de ${L} cm de long et ${l} cm de large. Il a fallu ${enM ? `${fr(tot / 100)} m` : `${tot} cm`} de ${c.mat}. ${un(["Quelle est sa hauteur ?", "Combien mesure sa hauteur ?"])}`,
      ...qcmN(h, [tot / 4, tot - L - l, tot / 4 - L, Math.round((tot - L - l) / 4)], "cm", 5),
      explanation: `${enM ? `${fr(tot / 100)} m = ${tot} cm. ` : ""}Les 12 arêtes, ce sont 4 fois (longueur + largeur + hauteur) : ${tot} ÷ 4 = ${tot / 4} cm. Puis ${tot / 4} − ${L} − ${l} = ${h} cm.`,
      canvas: paveCote(L, l, h),
    };
  }
}

/** ★4 : les vitres d'un aquarium ouvert en haut. */
function vitresAquarium(): G {
  const P = perso();
  const L = un([40, 50, 60, 80, 100]);
  const l = un([20, 25, 30, 35]);
  const h = un([30, 40, 45, 50].filter((x) => x !== l));
  const qui = un(["Le fabricant d'aquariums", "La verrière", `${P.nom}`, "Le vitrier", "La fabricante de terrariums"]);
  const o = un(["un aquarium", "un terrarium", "un bac à poissons", "une vitrine à maquettes"]);
  const s = (a: number, b: number) => `${a} cm sur ${b} cm`;
  if (Math.random() < 0.4) {
    return {
      text: `${qui} fabrique ${o} en verre, en forme de pavé droit, ouvert en haut. ${un(["Combien de vitres faut-il ?", "Combien de plaques de verre doit-on découper ?"])}`,
      ...qcmN(5, [6, 4, 12, 8]),
      explanation: "Un pavé a 6 faces ; ouvert en haut, il en manque une : 6 − 1 = 5 vitres.",
      canvas: paveCote(L, l, h),
    };
  }
  return {
    text: `${qui} fabrique ${o} en verre, ouvert en haut : ${L} cm de long, ${l} cm de large et ${h} cm de haut. ${un(["Quelles vitres faut-il découper ?", "Quelles plaques de verre faut-il ?"])}`,
    ...qcm(`1 de ${s(L, l)}, 2 de ${s(L, h)} et 2 de ${s(l, h)}`, [
      `2 de ${s(L, l)}, 2 de ${s(L, h)} et 2 de ${s(l, h)}`,
      `1 de ${s(L, l)}, 1 de ${s(L, h)} et 1 de ${s(l, h)}`,
      `1 de ${s(L, h)}, 2 de ${s(L, l)} et 2 de ${s(l, h)}`,
    ]),
    explanation: `Ouvert en haut : 5 vitres. Le fond (${s(L, l)}), devant et derrière (${s(L, h)}), les deux côtés (${s(l, h)}).`,
    canvas: paveCote(L, l, h),
  };
}

/** ★4 : plusieurs pyramides ou prismes, règle puis multiplication. */
function plusieursPF(): G {
  const { f, b } = tirerPF();
  const P = perso();
  const k = entre(3, 9);
  const q = un<Quoi>(["aretes", "sommets", "faces"]);
  const n1 = comptePF(f, b, q);
  const [geste, , chose] = un(GESTES_PF[q]);
  const objets = un(["sculptures", "maquettes", "lanternes", "boîtes", "bougies", "savons", "trophées", "flacons"]);
  const d = dessinPF(f, b);
  return {
    text: `${un(ARTISANS(P))} ${geste} de ${k} ${objets} en forme de ${plurPF(f, b)}. ${un([`${combienDe(chose)} en tout ?`, `${combienDe(chose)} pour les ${k} ${objets} ?`, `${combienDe(chose)} faut-il en tout ?`])}`,
    ...qcmN(k * n1, [n1, k * b.n, k * (n1 + 1), k + n1, k * piegesPF(f, b, q)[0]]),
    explanation: `${cap(nomPF(f, b))} : ${reglePF(f, b, q)}. Pour ${k} objets : ${k} × ${n1} = ${k * n1}.`,
    ...(d.canvas ? { canvas: d.canvas } : {}),
  };
}

/** ★5 : combien d'aquariums avec le joint qu'on a (la vidéo : 10 m, cubes de 40 cm → 2, reste 40 cm). */
function combienAquariums(): G {
  const P = perso();
  for (;;) {
    const a = un([25, 30, 40, 50, 60, 75]);
    const stock = entre(4, 20);
    const par = 12 * a;
    const k = Math.floor((stock * 100) / par);
    const reste = stock * 100 - k * par;
    if (k < 2 || reste === 0) continue;
    const c = un(ARETES_PAVE(P));
    const demandeReste = Math.random() < 0.35;
    // « une boîte cadeau » → « boîtes cadeau » : seul le premier mot prend le s.
    const objets = c.o.replace(/^une? /, "").replace(/^(\S+)/, "$1s");
    return {
      text: `${c.qui} a ${stock} m de ${c.mat} et ${c.geste} de ${c.o.startsWith("une ") ? "chacune" : "chacun"} de ses ${objets} : des cubes de ${a} cm d'arête. ${demandeReste ? `Une fois le plus de cubes possible terminés, quelle longueur de ${c.mat} reste-t-il ?` : un(["Combien de cubes peut-on finir ?", "Combien de cubes entiers peut-on garnir ?", "Combien de cubes complets peut-on faire ?"])}`,
      ...(demandeReste ? qcmN(reste, [par - reste, reste + par, stock * 100 - par, reste + 100], "cm", 10) : qcmN(k, [k + 1, Math.floor((stock * 100) / (4 * a)), Math.floor((stock * 100) / (6 * a)), k - 1])),
      explanation: `Un cube : 12 × ${a} = ${par} cm. ${stock} m = ${fr(stock * 100)} cm. ${Array.from({ length: k + 1 }, (_, i) => `${i + 1} cube${i ? "s" : ""} : ${fr((i + 1) * par)} cm`).join(" ; ")}${(k + 1) * par > stock * 100 ? ", c'est trop" : ""}. On en finit ${k}, il reste ${fr(stock * 100)} − ${fr(k * par)} = ${reste} cm.`,
      canvas: cubeCote(a),
    };
  }
}

/** ★5 : l'aire de verre d'un aquarium ouvert (aire du rectangle, en dm²). */
function aireVerre(): G {
  const P = perso();
  const L = entre(4, 9);
  const l = entre(2, Math.min(5, L - 1));
  const h = un([3, 4, 5, 6].filter((x) => x !== l && x !== L));
  const fond = L * l;
  const devant = L * h;
  const cote = l * h;
  const tot = fond + 2 * devant + 2 * cote;
  return {
    text: `${un(["Le fabricant d'aquariums", "La verrière", P.nom, "Le vitrier"])} fabrique un aquarium ouvert en haut : ${L} dm de long, ${l} dm de large et ${h} dm de haut. ${un(["Quelle aire de verre faut-il en tout ?", "Combien de dm² de verre faut-il ?"])}`,
    ...qcmN(tot, [tot + fond, fond + devant + cote, L * l * h, 2 * (fond + devant + cote)], "dm²"),
    explanation: `5 vitres : le fond ${L} × ${l} = ${fond} dm², devant et derrière 2 × (${L} × ${h}) = ${2 * devant} dm², les côtés 2 × (${l} × ${h}) = ${2 * cote} dm². En tout : ${fond} + ${2 * devant} + ${2 * cote} = ${tot} dm².`,
    canvas: dessin("pave"),
  };
}

/** ★5 : le grand cube 4 × 4 × 4 peint puis découpé. */
function cubePeint4(): G {
  const P = perso();
  const n = 4;
  const l: { x: number; y: number; z: number }[] = [];
  for (let x = 0; x < n; x++) for (let y = 0; y < n; y++) for (let z = 0; z < n; z++) l.push({ x, y, z });
  const contexte = un([
    { t: `${P.nom} peint en bleu un grand cube fait de 4 × 4 × 4 petits cubes, puis le défait.`, colle: "sont peints" },
    { t: "Le pâtissier recouvre de chocolat un gâteau en cube, puis le coupe en 4 × 4 × 4 petits cubes.", colle: "ont du chocolat" },
    { t: "La sculptrice vernit un grand cube de bois, puis le scie en 4 × 4 × 4 petits cubes.", colle: "ont du vernis" },
    { t: "Le fromager trempe un cube de fromage dans la cire, puis le coupe en 4 × 4 × 4 petits cubes.", colle: "ont de la cire" },
  ]);
  const q = un([
    { qui: `Combien de petits cubes ${contexte.colle} sur 3 faces ?`, r: 8, why: "Ce sont les petits cubes des coins : un par sommet du grand cube, 8." },
    { qui: `Combien de petits cubes ${contexte.colle} sur 2 faces exactement ?`, r: 24, why: "Sur chaque arête, il y a 4 cubes ; sans les 2 coins, il en reste 2. 12 arêtes × 2 = 24." },
    { qui: `Combien de petits cubes ${contexte.colle} sur une seule face ?`, r: 24, why: "Sur chaque face, le carré du milieu : 2 × 2 = 4 cubes. 6 faces × 4 = 24." },
    { qui: "Combien de petits cubes ne sont touchés sur aucune face ?", r: 8, why: "Le cœur caché du grand cube : 2 × 2 × 2 = 8 cubes." },
    { qui: "Combien de petits cubes y a-t-il en tout ?", r: 64, why: "4 × 4 × 4 = 64." },
  ]);
  return {
    text: `${contexte.t} ${q.qui}`,
    ...qcmN(q.r, [8, 12, 24, 6, 64, 16, 36, 27].filter((v) => v !== q.r)),
    explanation: q.why,
    canvas: assemblage(l),
  };
}

/** ★5 : deux stocks à la fois (pailles ET boules) : c'est le plus petit qui décide. */
function deuxStocks(): G {
  const { f, b } = tirerPF();
  const P = perso();
  const [m, j] = un(MATERIAUX);
  const a = comptePF(f, b, "aretes");
  const so = comptePF(f, b, "sommets");
  for (;;) {
    const kA = entre(2, 7);
    const kS = entre(2, 7);
    if (kA === kS) continue;
    const pailles = kA * a + entre(0, a - 1);
    const boules = kS * so + entre(0, so - 1);
    const k = Math.min(kA, kS);
    return {
      text: `${P.nom} a ${pailles} ${m} et ${boules} ${j}. ${cap(P.il)} fabrique des squelettes de ${plurPF(f, b)} : les ${m} pour les arêtes, les ${j} pour les sommets. ${un([`Combien de squelettes peut-${P.il} finir ?`, "Combien de squelettes complets pourra-t-on faire ?"])}`,
      ...qcmN(k, [Math.max(kA, kS), Math.floor(pailles / so), Math.floor(boules / a), k + 1]),
      explanation: `${cap(nomPF(f, b))} : ${a} arêtes et ${so} sommets. Les ${m} suffisent pour ${pailles} ÷ ${a} → ${kA} squelettes ; les ${j} pour ${boules} ÷ ${so} → ${kS}. C'est le plus petit qui décide : ${k}.`,
    };
  }
}

/* ═════════════════════════ L'EXPORT ═════════════════════════ */

const AIDE = {
  rec: "Premier tri : ça roule ? Deuxième tri : y a-t-il une pointe ? Deux bases face à face : prisme ou cylindre. Disque ou polygone ?",
  saf: "Face = surface plate, arête = bord entre deux faces, sommet = coin. Compte étage par étage, sans oublier ce qui est caché !",
  face: "Dis combien de faces, et de quelle forme. Le pavé : 6 rectangles par paires face à face. La pyramide : 1 base et des triangles.",
  patron: "Compte les faces, regarde leurs formes, vérifie que les bords qui se collent ont la même longueur, puis plie dans ta tête.",
  defi: "Compte d'abord les faces, les arêtes ou les sommets, puis calcule étape par étape. Un pavé : 4 longueurs, 4 largeurs, 4 hauteurs.",
};

export const solidesGabarits: TutorBankItemV4[] = [
  // reconnaître : ★1 à ★3
  tpl("solide_reconnaitre", "1", 1, AIDE.rec, nommerDessin),
  tpl("solide_reconnaitre", "2", 1, AIDE.rec, objetVersSolide),
  tpl("solide_reconnaitre", "3", 1, AIDE.rec, dessinVersObjet),
  tpl("solide_reconnaitre", "4", 2, AIDE.rec, aTilRaison),
  tpl("solide_reconnaitre", "5", 2, AIDE.rec, intrus),
  tpl("solide_reconnaitre", "6", 2, AIDE.rec, portrait),
  tpl("solide_reconnaitre", "7", 2, AIDE.rec, rouleOuPas),
  tpl("solide_reconnaitre", "8", 3, AIDE.rec, portraitPF),
  tpl("solide_reconnaitre", "9", 3, AIDE.rec, trierSolides),
  tpl("solide_reconnaitre", "10", 3, AIDE.rec, piegePrismeCylindre),
  tpl("solide_reconnaitre", "11", 3, AIDE.rec, aTilRaison),
  // sommets, arêtes, faces : ★1 à ★3
  tpl("solide_sommet_arete_face", "1", 1, AIDE.saf, quellePartie),
  tpl("solide_sommet_arete_face", "2", 1, AIDE.saf, compter(["cube", "pave"], ["faces"])),
  tpl("solide_sommet_arete_face", "3", 1, AIDE.saf, compter(["cube", "pave"], ["sommets", "aretes"])),
  tpl("solide_sommet_arete_face", "4", 2, AIDE.saf, compter(POLY, ["faces", "sommets", "aretes"])),
  tpl("solide_sommet_arete_face", "5", 2, AIDE.saf, erreurDeCompte),
  tpl("solide_sommet_arete_face", "6", 2, AIDE.saf, visiblesCaches),
  tpl("solide_sommet_arete_face", "7", 2, AIDE.saf, reglePFcourt),
  tpl("solide_sommet_arete_face", "8", 3, AIDE.saf, reglePF3),
  tpl("solide_sommet_arete_face", "9", 3, AIDE.saf, reglePFinverse),
  tpl("solide_sommet_arete_face", "10", 3, AIDE.saf, squelettePF),
  tpl("solide_sommet_arete_face", "11", 3, AIDE.saf, plusieurs),
  tpl("solide_sommet_arete_face", "12", 3, AIDE.saf, enigmeComptes),
  // faces : ★1 à ★3
  tpl("solide_face", "1", 1, AIDE.face, formeDesFaces),
  tpl("solide_face", "2", 1, AIDE.face, planesOuCourbes),
  tpl("solide_face", "3", 2, AIDE.face, empreintes),
  tpl("solide_face", "4", 2, AIDE.face, facesDUneForme),
  tpl("solide_face", "5", 2, AIDE.face, facesCube),
  tpl("solide_face", "6", 2, AIDE.face, facesPaveMesures(true)),
  tpl("solide_face", "7", 3, AIDE.face, saufLeDessous),
  tpl("solide_face", "8", 3, AIDE.face, facesVersSolide),
  tpl("solide_face", "9", 3, AIDE.face, vraiOuFaux),
  tpl("solide_face", "10", 3, AIDE.face, facesPyrPri),
  tpl("solide_face", "11", 3, AIDE.face, facesPaveMesures(false)),
  tpl("solide_face", "12", 3, AIDE.face, pairesPave),
  tpl("solide_face", "13", 4, AIDE.face, aireFaces),
  tpl("solide_face", "14", 4, AIDE.face, facesPyrPri),
  tpl("solide_face", "15", 4, AIDE.face, facesPaveMesures(false)),
  // patrons : ★1 à ★4
  tpl("solide_patron", "1", 1, AIDE.patron, patronQuelSolide),
  tpl("solide_patron", "2", 1, AIDE.patron, patronPieces),
  tpl("solide_patron", "3", 2, AIDE.patron, patronCubeOuiNon),
  tpl("solide_patron", "4", 2, AIDE.patron, patronCubeTrois),
  tpl("solide_patron", "5", 2, AIDE.patron, piecesADecouper),
  tpl("solide_patron", "6", 2, AIDE.patron, patronPyramideN),
  tpl("solide_patron", "7", 3, AIDE.patron, patronSeReferme),
  tpl("solide_patron", "8", 3, AIDE.patron, patronComparer),
  tpl("solide_patron", "9", 3, AIDE.patron, patronParMesures),
  tpl("solide_patron", "10", 3, AIDE.patron, patronDe),
  tpl("solide_patron", "11", 4, AIDE.patron, bordColle),
  tpl("solide_patron", "12", 4, AIDE.patron, patronManque),
  tpl("solide_patron", "13", 4, AIDE.patron, patronDeSept),
  // défis : ★3 à ★5
  tpl("solide_defi", "1", 3, AIDE.defi, compterCubes(true)),
  tpl("solide_defi", "2", 3, AIDE.defi, completerPave),
  tpl("solide_defi", "3", 3, AIDE.defi, cubePeint),
  tpl("solide_defi", "4", 3, AIDE.defi, resteApres),
  tpl("solide_defi", "5", 3, AIDE.defi, assembler),
  tpl("solide_defi", "6", 3, AIDE.defi, quiEnUtilisePlus),
  tpl("solide_defi", "7", 4, AIDE.defi, jointPave),
  tpl("solide_defi", "8", 4, AIDE.defi, jointCube),
  tpl("solide_defi", "9", 4, AIDE.defi, hauteurInconnue),
  tpl("solide_defi", "10", 4, AIDE.defi, vitresAquarium),
  tpl("solide_defi", "11", 4, AIDE.defi, plusieursPF),
  tpl("solide_defi", "12", 5, AIDE.defi, combienAquariums),
  tpl("solide_defi", "13", 5, AIDE.defi, aireVerre),
  tpl("solide_defi", "14", 5, AIDE.defi, cubePeint4),
  tpl("solide_defi", "15", 5, AIDE.defi, deuxStocks),
];
