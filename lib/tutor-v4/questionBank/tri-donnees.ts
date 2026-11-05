// TRIER ET CLASSER : LES OBJETS ET LEURS PROPRIÉTÉS SONT DES DONNÉES (05/11/2026).
//
// CE1 et CM1 (thème commun à la Suisse, la Belgique, le Sénégal, la Côte d'Ivoire).
// Une réponse ne s'écrit jamais : elle se CALCULE avec `sat(objet, critère)`, et le
// correcteur relit le texte et la figure, puis refait ce calcul.
//
// ⛔ Un objet ne reçoit une propriété que si elle est vraie sans discussion. Ce qui se
// discute reste hors de la liste : la poule (vole-t-elle ?), la banane (un bananier est-il
// un arbre ?), le piano (a-t-il des cordes ?), la flûte (en métal ?), la fraise (a-t-elle
// des pépins ?). Un élève qui sait ne doit jamais avoir tort.

import type { CanvasFigure } from "@/lib/tutor-v4/types";
import { cap, melange, un } from "./cm1/maths/trous-outils";
import { planEnsembles } from "@/lib/canvas/ensembles";

export type Critere = {
  id: string;
  /** « a des plumes » : Quel animal a des plumes ? */
  label: string;
  /** « n'a pas de plumes » */
  neg: string;
  /** « ont des plumes » : On garde ceux qui ont des plumes. */
  pl: string;
  test?: (n: number) => boolean;
};

export type Objet = { nom: string; le: string; p: string[]; n?: number };

export type Domaine = {
  id: string;
  quel: string;
  le: string;
  les: string;
  ces: string;
  criteres: Critere[];
  objets: () => Objet[];
  contextes: string[];
};

const c = (id: string, label: string, neg: string, pl: string, test?: (n: number) => boolean): Critere => ({ id, label, neg, pl, test });

/* ── les critères ── */
const PLUMES = c("plumes", "a des plumes", "n'a pas de plumes", "ont des plumes");
const PATTES4 = c("pattes4", "a 4 pattes", "n'a pas 4 pattes", "ont 4 pattes");
const OEUFS = c("oeufs", "pond des œufs", "ne pond pas d'œufs", "pondent des œufs");
const VOLE = c("vole", "vole", "ne vole pas", "volent");
const NOYAU = c("noyau", "a un noyau", "n'a pas de noyau", "ont un noyau");
const PEPINS = c("pepins", "a des pépins", "n'a pas de pépins", "ont des pépins");
const ARBRE = c("arbre", "pousse sur un arbre", "ne pousse pas sur un arbre", "poussent sur un arbre");
const AGRUME = c("agrume", "est un agrume", "n'est pas un agrume", "sont des agrumes");
const CORDES = c("cordes", "a des cordes", "n'a pas de cordes", "ont des cordes");
const SOUFFLE = c("souffle", "se joue en soufflant", "ne se joue pas en soufflant", "se jouent en soufflant");
const FRAPPE = c("frappe", "se joue en frappant", "ne se joue pas en frappant", "se jouent en frappant");
const METAL = c("metal", "est en métal", "n'est pas en métal", "sont en métal");
const BALLON = c("ballon", "se joue avec un ballon", "ne se joue pas avec un ballon", "se jouent avec un ballon");
const EQUIPE = c("equipe", "se joue en équipe", "ne se joue pas en équipe", "se jouent en équipe");
const RAQUETTE = c("raquette", "se joue avec une raquette", "ne se joue pas avec une raquette", "se jouent avec une raquette");
const DANS_EAU = c("dans_eau", "se fait dans l'eau", "ne se fait pas dans l'eau", "se font dans l'eau");
const MOTEUR = c("moteur", "a un moteur", "n'a pas de moteur", "ont un moteur");
const ROUES = c("roues", "a des roues", "n'a pas de roues", "ont des roues");
const SUR_EAU = c("sur_eau", "va sur l'eau", "ne va pas sur l'eau", "vont sur l'eau");
const COTES4 = c("cotes4", "a 4 côtés", "n'a pas 4 côtés", "ont 4 côtés");
const COTES3 = c("cotes3", "a 3 côtés", "n'a pas 3 côtés", "ont 3 côtés");
const ROND = c("rond", "est rond", "n'est pas rond", "sont ronds");
const ROUGE = c("rouge", "est rouge", "n'est pas rouge", "sont rouges");
const BLEU = c("bleu", "est bleu", "n'est pas bleu", "sont bleus");
const VERT = c("vert", "est vert", "n'est pas vert", "sont verts");
const JAUNE = c("jaune", "est jaune", "n'est pas jaune", "sont jaunes");
const PETIT = c("petit", "est petit", "n'est pas petit", "sont petits");
const GRAND = c("grand", "est grand", "n'est pas grand", "sont grands");
const PAIR = c("pair", "est pair", "n'est pas pair", "sont pairs", (n) => n % 2 === 0);
const IMPAIR = c("impair", "est impair", "n'est pas impair", "sont impairs", (n) => n % 2 === 1);
const FIN5 = c("fin5", "finit par 5", "ne finit pas par 5", "finissent par 5", (n) => n % 10 === 5);
const FIN0 = c("fin0", "finit par 0", "ne finit pas par 0", "finissent par 0", (n) => n % 10 === 0);
const SUP50 = c("sup50", "est plus grand que 50", "n'est pas plus grand que 50", "sont plus grands que 50", (n) => n > 50);
const INF20 = c("inf20", "est plus petit que 20", "n'est pas plus petit que 20", "sont plus petits que 20", (n) => n < 20);
const TABLE5 = c("table5", "est dans la table de 5", "n'est pas dans la table de 5", "sont dans la table de 5", (n) => n % 5 === 0);
const DEUX_CHIFFRES = c("chiffres2", "a 2 chiffres", "n'a pas 2 chiffres", "ont 2 chiffres", (n) => n >= 10 && n <= 99);

/* ── les objets ── */
const VOYELLE = /^[aàâeéèêiîoôuy]/i;
/** `f` : féminin ; une lettre h ou un cas à part s'écrit en entier dans `le`. */
const o = (nom: string, genre: "m" | "f" | string, ...p: Critere[]): Objet => ({
  nom,
  le: genre.length > 1 ? `${genre}${genre.endsWith("'") ? "" : " "}${nom}` : VOYELLE.test(nom) ? `l'${nom}` : `${genre === "f" ? "la" : "le"} ${nom}`,
  p: p.map((x) => x.id),
});

const ANIMAUX: Objet[] = [
  ...["chat", "chien", "cheval", "mouton", "lapin", "zèbre"].map((n) => o(n, "m", PATTES4)),
  ...["vache", "girafe"].map((n) => o(n, "f", PATTES4)),
  ...["canard", "aigle", "pigeon", "moineau"].map((n) => o(n, "m", PLUMES, OEUFS, VOLE)),
  ...["autruche"].map((n) => o(n, "f", PLUMES, OEUFS)),
  ...["manchot"].map((n) => o(n, "m", PLUMES, OEUFS)),
  ...["lézard", "crocodile"].map((n) => o(n, "m", PATTES4, OEUFS)),
  ...["tortue", "grenouille"].map((n) => o(n, "f", PATTES4, OEUFS)),
  ...["abeille", "libellule"].map((n) => o(n, "f", OEUFS, VOLE)),
  o("papillon", "m", OEUFS, VOLE),
  ...["fourmi", "araignée"].map((n) => o(n, "f", OEUFS)),
  ...["poisson", "escargot"].map((n) => o(n, "m", OEUFS)),
  o("dauphin", "m"),
  o("baleine", "f"),
];

const FRUITS: Objet[] = [
  ...["pomme", "poire"].map((n) => o(n, "f", PEPINS, ARBRE)),
  ...["orange", "mandarine"].map((n) => o(n, "f", PEPINS, ARBRE, AGRUME)),
  o("citron", "m", PEPINS, ARBRE, AGRUME),
  ...["mangue", "cerise", "pêche", "prune", "olive"].map((n) => o(n, "f", NOYAU, ARBRE)),
  ...["abricot", "litchi"].map((n) => o(n, "m", NOYAU, ARBRE)),
  o("raisin", "m", PEPINS),
  o("pastèque", "f", PEPINS),
  o("ananas", "m"),
];

const INSTRUMENTS: Objet[] = [
  ...["violon", "banjo"].map((n) => o(n, "m", CORDES)),
  ...["guitare", "contrebasse"].map((n) => o(n, "f", CORDES)),
  o("harpe", "la", CORDES),
  o("ukulélé", "le", CORDES),
  o("clarinette", "f", SOUFFLE),
  o("hautbois", "le", SOUFFLE),
  o("trompette", "f", SOUFFLE, METAL),
  ...["trombone", "tuba", "saxophone"].map((n) => o(n, "m", SOUFFLE, METAL)),
  ...["tambour", "djembé", "xylophone"].map((n) => o(n, "m", FRAPPE)),
  o("cymbale", "f", FRAPPE, METAL),
  o("gong", "m", FRAPPE, METAL),
];

const SPORTS: Objet[] = [
  ...["football", "basket", "rugby", "volley"].map((n) => o(n, "m", BALLON, EQUIPE)),
  o("handball", "le", BALLON, EQUIPE),
  o("water-polo", "m", BALLON, EQUIPE, DANS_EAU),
  ...["tennis", "badminton", "ping-pong"].map((n) => o(n, "m", RAQUETTE)),
  ...["natation", "plongée"].map((n) => o(n, "f", DANS_EAU)),
  o("surf", "m", DANS_EAU),
  o("judo", "m"),
  ...["course", "escalade"].map((n) => o(n, "f")),
];

const VEHICULES: Objet[] = [
  o("vélo", "m", ROUES),
  o("trottinette", "f", ROUES),
  ...["voiture", "moto"].map((n) => o(n, "f", MOTEUR, ROUES)),
  ...["camion", "tracteur", "bus", "scooter"].map((n) => o(n, "m", MOTEUR, ROUES)),
  ...["voilier", "kayak", "radeau"].map((n) => o(n, "m", SUR_EAU)),
  ...["ferry", "paquebot"].map((n) => o(n, "m", MOTEUR, SUR_EAU)),
  o("hélicoptère", "l'", MOTEUR, VOLE),
  o("drone", "m", MOTEUR, VOLE),
  o("montgolfière", "f", VOLE),
];

const FORMES: [string, Critere | null][] = [["carré", COTES4], ["losange", COTES4], ["rectangle", COTES4], ["triangle", COTES3], ["rond", ROND]];
const COULEURS: [string, Critere][] = [["rouge", ROUGE], ["bleu", BLEU], ["vert", VERT], ["jaune", JAUNE]];
const DESSINS_COULEUR: Objet[] = FORMES.flatMap(([f, cf]) => COULEURS.map(([t, ct]) => o(`${f} ${t}`, "m", cf!, ct)));
const DESSINS_TAILLE: Objet[] = FORMES.flatMap(([f, cf]) => [o(`petit ${f}`, "m", cf!, PETIT), o(`grand ${f}`, "m", cf!, GRAND)]);

/** Un nombre : ses propriétés se calculent. */
const objetNombre = (n: number): Objet => ({ nom: String(n), le: `le nombre ${n}`, p: [], n });
function nombresTires(): Objet[] {
  return melange(Array.from({ length: 98 }, (_, i) => i + 2)).slice(0, 36).map(objetNombre);
}

export const DOMAINES: Domaine[] = [
  {
    id: "animaux", quel: "Quel animal", le: "l'animal", les: "les animaux", ces: "ces animaux",
    criteres: [PLUMES, PATTES4, OEUFS, VOLE], objets: () => ANIMAUX,
    contextes: ["La vétérinaire soigne ces animaux.", "La soigneuse du zoo nourrit ces animaux.", "Une photographe observe ces animaux.", "Une biologiste étudie ces animaux.", "Un dessinateur dessine ces animaux.", "Au parc, un guide montre ces animaux."],
  },
  {
    id: "fruits", quel: "Quel fruit", le: "le fruit", les: "les fruits", ces: "ces fruits",
    criteres: [NOYAU, PEPINS, ARBRE, AGRUME], objets: () => FRUITS,
    contextes: ["Le marchand range ses fruits.", "La cuisinière prépare ces fruits.", "Un pâtissier choisit ces fruits.", "Au marché, une vendeuse trie ses fruits.", "Une botaniste étudie ces fruits.", "Une serveuse coupe ces fruits."],
  },
  {
    id: "instruments", quel: "Quel instrument", le: "l'instrument", les: "les instruments", ces: "ces instruments",
    criteres: [CORDES, SOUFFLE, FRAPPE, METAL], objets: () => INSTRUMENTS,
    contextes: ["La cheffe d'orchestre range ces instruments.", "Un groupe répète avec ces instruments.", "Le professeur de musique trie ces instruments.", "Une musicienne choisit ces instruments.", "Un réparateur reçoit ces instruments.", "Au musée, un guide montre ces instruments."],
  },
  {
    id: "sports", quel: "Quel sport", le: "le sport", les: "les sports", ces: "ces sports",
    criteres: [BALLON, EQUIPE, RAQUETTE, DANS_EAU], objets: () => SPORTS,
    contextes: ["La coach présente ces sports.", "Un journaliste parle de ces sports.", "Le club propose ces sports.", "Une arbitre connaît ces sports.", "L'école affiche ces sports.", "Une médecin connaît ces sports."],
  },
  {
    id: "vehicules", quel: "Quel véhicule", le: "le véhicule", les: "les véhicules", ces: "ces véhicules",
    criteres: [MOTEUR, ROUES, SUR_EAU, VOLE], objets: () => VEHICULES,
    contextes: ["Une ingénieure étudie ces véhicules.", "Au musée, un guide montre ces véhicules.", "Un dessinateur dessine ces véhicules.", "Une pilote connaît ces véhicules.", "Un enfant range ces jouets.", "Une mécanicienne regarde ces véhicules."],
  },
  {
    id: "dessins_couleur", quel: "Quel dessin", le: "le dessin", les: "les dessins", ces: "ces dessins",
    criteres: [COTES4, COTES3, ROND, ROUGE, BLEU, VERT, JAUNE], objets: () => DESSINS_COULEUR,
    contextes: ["L'artiste trie ses dessins.", "Une architecte range ses dessins.", "Une graphiste choisit ces dessins.", "Une couturière choisit ces dessins.", "Une maîtresse affiche ces dessins.", "Un carreleur choisit ces dessins."],
  },
  {
    id: "dessins_taille", quel: "Quel dessin", le: "le dessin", les: "les dessins", ces: "ces dessins",
    criteres: [COTES4, COTES3, ROND, PETIT, GRAND], objets: () => DESSINS_TAILLE,
    contextes: ["L'artiste trie ses dessins.", "Une architecte range ses dessins.", "Une graphiste choisit ces dessins.", "Une couturière choisit ces dessins.", "Une maîtresse affiche ces dessins.", "Un carreleur choisit ces dessins."],
  },
  {
    id: "nombres", quel: "Quel nombre", le: "le nombre", les: "les nombres", ces: "ces nombres",
    criteres: [PAIR, IMPAIR, FIN5, FIN0, SUP50, INF20, TABLE5, DEUX_CHIFFRES], objets: nombresTires,
    contextes: ["Le facteur trie ces numéros de maison.", "Les joueuses d'une équipe ont ces numéros.", "Les places d'une salle ont ces numéros.", "Une bibliothécaire range ces numéros de livres.", "Un chauffeur note ces numéros de bus.", "Une infirmière lit ces numéros de chambres."],
  },
];

/* ── lire : le texte et la figure → les données ── */
const TOUS_CRITERES = [...new Set(DOMAINES.flatMap((d) => d.criteres))];
const PAR_NOM = new Map<string, Objet>();
for (const d of DOMAINES) if (d.id !== "nombres") for (const x of d.objets()) PAR_NOM.set(x.nom, x);

export const sat = (x: Objet, k: Critere): boolean => (k.test && x.n !== undefined ? k.test(x.n) : x.p.includes(k.id));

/** Un objet retrouvé d'après son nom écrit (« canard », « 42 »). */
export function objetDe(nom: string): Objet | null {
  const t = nom.trim();
  if (/^\d+$/.test(t)) return objetNombre(Number(t));
  return PAR_NOM.get(t) ?? null;
}

export function domaineDe(x: Objet): Domaine {
  return DOMAINES.find((d) => (d.id === "nombres" ? x.n !== undefined : d.objets().some((y) => y.nom === x.nom)))!;
}

export const critereParLabel = (l: string) => TOUS_CRITERES.find((k) => k.label === l.trim()) ?? null;
export const critereParQuestion = (q: string) => TOUS_CRITERES.find((k) => questionDe(k) === q) ?? null;
export const questionDe = (k: Critere) => `${cap(k.label)} ?`;

/** Le critère écrit dans ce texte, sous cette forme : le plus long gagne (« ne vole pas » contient « vole »). */
export function critereDans(t: string, forme: "label" | "neg" | "pl"): Critere | null {
  const trouves = TOUS_CRITERES.filter((k) => new RegExp(`(^|[^\\p{L}])${k[forme]}($|[^\\p{L}])`, "u").test(t));
  return trouves.sort((a, b) => b[forme].length - a[forme].length)[0] ?? null;
}

/** L'intrus, s'il n'y en a qu'un seul possible, tous les critères du domaine essayés. */
export function intrusUnique(objets: Objet[], criteres: Critere[]): Objet | null {
  const possibles = new Set<Objet>();
  for (const k of criteres) {
    const oui = objets.filter((x) => sat(x, k));
    const non = objets.filter((x) => !sat(x, k));
    if (oui.length === 1) possibles.add(oui[0]);
    if (non.length === 1) possibles.add(non[0]);
  }
  return possibles.size === 1 ? [...possibles][0] : null;
}

/** Les critères que tous ces objets vérifient. */
export const communs = (objets: Objet[], criteres: Critere[]) => criteres.filter((k) => objets.every((x) => sat(x, k)));

/* ── tirer ── */
export const liste = (l: Objet[]) => l.map((x) => x.nom).join(", ");
export const domaine = () => un(DOMAINES);
export const contexte = (d: Domaine) => un(d.contextes);

/** Recommence jusqu'à ce que le tirage convienne : les propriétés décident, pas nous. */
export function essayer<T>(f: () => T | null | undefined | false): T {
  for (let i = 0; i < 4000; i++) {
    const r = f();
    if (r) return r;
  }
  throw new Error("aucun tirage ne convient");
}

/** `nOui` objets qui vérifient, `nNon` qui ne vérifient pas. */
export function paquet(d: Domaine, k: Critere, nOui: number, nNon: number, max = 99) {
  const pool = melange([...d.objets()]).filter((x) => x.nom.length <= max);
  const oui = pool.filter((x) => sat(x, k)).slice(0, nOui);
  const non = pool.filter((x) => !sat(x, k)).slice(0, nNon);
  return oui.length === nOui && non.length === nNon ? { oui, non } : null;
}

/** Les ensembles d'une figure : `dans` se calcule toujours depuis les propriétés. */
export function figureEnsembles(objets: Objet[], criteres: Critere[], noms?: string[]): CanvasFigure {
  return {
    kind: "ensembles",
    ensembles: noms ?? criteres.map((k) => k.label),
    elements: objets.map((x) => ({ nom: x.nom, dans: criteres.flatMap((k, i) => (sat(x, k) ? [i] : [])) })),
  };
}

export const tientSurLaFigure = (f: CanvasFigure) => f.kind === "ensembles" && planEnsembles(f).elements.every((e) => e.place);

/**
 * Des objets répartis dans les zones que dessinent ces critères : une zone après
 * l'autre, sinon tout tomberait au même endroit. Au plus `parZone` par zone, 2 en dehors.
 */
export function repartir(d: Domaine, criteres: Critere[], total: number, max: number, parZone = 3): Objet[] {
  const zones = new Map<string, Objet[]>();
  for (const x of melange([...d.objets()]).filter((y) => y.nom.length <= max)) {
    const cle = criteres.map((k) => (sat(x, k) ? "1" : "0")).join("");
    zones.set(cle, [...(zones.get(cle) ?? []), x]);
  }
  const ordre = melange([...zones.keys()]);
  const pris: Objet[] = [];
  for (let tour = 0; tour < parZone; tour++)
    for (const cle of ordre) {
      if (pris.length >= total) break;
      if (!/1/.test(cle) && tour >= 2) continue;
      const x = zones.get(cle)![tour];
      if (x) pris.push(x);
    }
  return melange(pris);
}

export const dansTous = (x: Objet, criteres: Critere[]) => criteres.every((k) => sat(x, k));
export const deuxAuHasard = <T,>(l: T[]) => melange([...l]).slice(0, 2) as [T, T];
export const troisAuHasard = <T,>(l: T[]) => melange([...l]).slice(0, 3) as [T, T, T];

/** Ce qu'un élève lit dans une liste « chat, chien, poule » : les objets, null si l'un est inconnu. */
export function lireListe(t: string): Objet[] | null {
  const l = t.split(",").map((x) => objetDe(x));
  return l.every(Boolean) ? (l as Objet[]) : null;
}

/* ── les arbres ── */
export type Noeud = { question: string; oui: Noeud; non: Noeud } | { feuille: string };

/** Le trajet d'un objet dans l'arbre : la feuille où il arrive, et les questions posées. */
export function suivre(n: Noeud, x: Objet): { feuille: string; questions: number } | null {
  let courant = n;
  let questions = 0;
  while (!("feuille" in courant)) {
    const k = critereParQuestion(courant.question);
    if (!k) return null;
    courant = sat(x, k) ? courant.oui : courant.non;
    questions++;
  }
  return { feuille: courant.feuille, questions };
}

export const feuillesDe = (n: Noeud): string[] => ("feuille" in n ? [n.feuille] : [...feuillesDe(n.oui), ...feuillesDe(n.non)]);

/** Pour chaque feuille portant un objet : le trajet de cet objet mène bien à elle. */
export function arbreCoherent(racine: Noeud): string[] {
  const p: string[] = [];
  for (const f of feuillesDe(racine)) {
    const x = objetDe(f);
    if (!x) continue;
    const r = suivre(racine, x);
    if (r?.feuille !== f) p.push(`${f} est mal placé dans l'arbre`);
  }
  return p;
}

const pose = (k: Critere, oui: Noeud, non: Noeud): Noeud => ({ question: questionDe(k), oui, non });

/** Un objet qui répond exactement ainsi : [critère, oui ou non]. */
const repondant = (pool: Objet[], chemin: [Critere, boolean][], pris: Objet[]) =>
  pool.find((x) => !pris.includes(x) && chemin.every(([k, r]) => sat(x, k) === r)) ?? null;

export type ArbreTire = { racine: Noeud; objets: Objet[]; criteres: Critere[] };

/** Deux questions, quatre feuilles : la même question sur les deux branches. */
export function arbreEquilibre(d: Domaine, max = 11): ArbreTire | null {
  const [a, b] = deuxAuHasard(d.criteres);
  const pool = melange([...d.objets()]).filter((x) => x.nom.length <= max);
  const pris: Objet[] = [];
  for (const chemin of [[true, true], [true, false], [false, true], [false, false]]) {
    const x = repondant(pool, [[a, chemin[0]], [b, chemin[1]]], pris);
    if (!x) return null;
    pris.push(x);
  }
  const f = (i: number) => ({ feuille: pris[i].nom });
  return { racine: pose(a, pose(b, f(0), f(1)), pose(b, f(2), f(3))), objets: pris, criteres: [a, b] };
}

/** Trois questions, quatre feuilles : chaque « non » pose la question suivante. */
export function arbrePeigne(d: Domaine, max = 11): ArbreTire | null {
  if (d.criteres.length < 3) return null;
  const [a, b, e] = troisAuHasard(d.criteres);
  const pool = melange([...d.objets()]).filter((x) => x.nom.length <= max);
  const chemins: [Critere, boolean][][] = [[[a, true]], [[a, false], [b, true]], [[a, false], [b, false], [e, true]], [[a, false], [b, false], [e, false]]];
  const pris: Objet[] = [];
  for (const chemin of chemins) {
    const x = repondant(pool, chemin, pris);
    if (!x) return null;
    pris.push(x);
  }
  const f = (i: number) => ({ feuille: pris[i].nom });
  return { racine: pose(a, f(0), pose(b, f(1), pose(e, f(2), f(3)))), objets: pris, criteres: [a, b, e] };
}

/** Le même arbre avec d'autres feuilles, dans le même ordre (« Case A », « ? »…). */
export function changerFeuilles(n: Noeud, nouvelle: (ancienne: string, i: number) => string): Noeud {
  let i = 0;
  const f = (x: Noeud): Noeud => ("feuille" in x ? { feuille: nouvelle(x.feuille, i++) } : { question: x.question, oui: f(x.oui), non: f(x.non) });
  return f(n);
}

/** Le chemin vers la feuille « ? » : les critères et leurs réponses. */
export function cheminVers(n: Noeud, feuille: string): [Critere, boolean][] | null {
  if ("feuille" in n) return n.feuille === feuille ? [] : null;
  const k = critereParQuestion(n.question);
  if (!k) return null;
  const o1 = cheminVers(n.oui, feuille);
  if (o1) return [[k, true], ...o1];
  const n1 = cheminVers(n.non, feuille);
  return n1 ? [[k, false], ...n1] : null;
}
