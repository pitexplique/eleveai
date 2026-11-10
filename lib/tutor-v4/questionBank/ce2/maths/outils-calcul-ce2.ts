// lib/tutor-v4/questionBank/ce2/maths/outils-calcul-ce2.ts
//
// Les outils de rédaction des gabarits « nombres et calcul » du CE2 : calcul
// mental, addition-soustraction, division, problèmes (10/11/2026).
//
// ⛔ POURQUOI CE FICHIER (10/11/2026). Mesurés avec
// scripts/mesurer-squelettes-coach.ts, 30 des 32 micros de ces quatre notions
// tenaient sur 2 à 16 squelettes : un enfant de 8 ans revoyait 15 à 19 fois la
// même PHRASE sur une série de 20. Chaque gabarit tire désormais une FAMILLE
// (prendre la question par un autre bout), une SITUATION (des mondes d'enfant :
// goûter, cirque, pirates, potager, piscine, fusée…) et une TOURNURE.
//
// Ce n'est PAS une banque : aucun item ici, seulement des fonctions.

import type {
  BaseDixCanvasData,
  CalculPoseCanvasData,
  ObjetId,
  ObjetsCanvasData,
  SchemaBarreCanvasData,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";

export type Q = TutorGeneratedQuestionV4;
export type Etoile = 1 | 2 | 3 | 4 | 5;

export function rint(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Tire une famille de questions, puis la question elle-même. */
export const tirer = (familles: readonly (() => Q)[]): Q => pick(familles)();

/** 1234 → « 1 234 » (comme partout sur le site). */
export const fmt = (n: number) => n.toLocaleString("fr-FR");

/**
 * La bonne réponse mise de côté, trois pièges DISTINCTS d'elle et entre eux,
 * puis mélangés : la bonne réponse tombe à une place au hasard.
 */
export function choix(correct: string, pieges: readonly string[]): string[] {
  const propres = Array.from(new Set(pieges)).filter((p) => p && p !== correct);
  return shuffle([correct, ...shuffle(propres).slice(0, 3)]);
}

/**
 * Les choix d'une réponse numérique. Pièges : ceux de l'appelant d'abord
 * (les erreurs d'enfant propres au calcul), complétés par ±1, ±10. Jamais de
 * piège nul ou négatif (un CE2 ne connaît pas les nombres négatifs), jamais
 * au-delà de 10 000. `unite` : « 12 € », « 8 billes ».
 */
export function choixN(n: number, pieges: readonly number[], unite = ""): string[] {
  const u = unite ? ` ${unite}` : "";
  const ok = (v: number) => Number.isInteger(v) && v > 0 && v !== n && v <= 10000;
  const propres = Array.from(new Set(pieges.filter(ok)));
  const secours = [n + 1, n - 1, n + 10, n - 10, n + 2, n + 100].filter((v) => ok(v) && !propres.includes(v));
  const trois = [...shuffle(propres).slice(0, 3)];
  for (const v of secours) if (trois.length < 3) trois.push(v);
  return shuffle([n, ...trois]).map((v) => `${fmt(v)}${u}`);
}

/** La réponse attendue d'un `choixN`. */
export const rep = (n: number, unite = "") => `${fmt(n)}${unite ? ` ${unite}` : ""}`;

export function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** « de farine », « d'images ». */
export const de = (mot: string) => (/^[aeiouàâéèêëîïôœh]/i.test(mot) ? `d'${mot}` : `de ${mot}`);

/** « que Inès » → « qu'Inès ». */
export const que = (mot: string) => (/^[aeiouyàâéèêëîïôœ]/i.test(mot) ? `qu'${mot}` : `que ${mot}`);

/* =========================================================
   LA TROUPE ET LES PRÉNOMS
   Nina, Téo, Zoé, Ravi et Pic le paille-en-queue sont les
   personnages du site ; les autres prénoms varient.
========================================================= */

export type Prenom = { nom: string; il: "il" | "elle" };

export const PRENOMS: readonly Prenom[] = [
  { nom: "Nina", il: "elle" },
  { nom: "Téo", il: "il" },
  { nom: "Zoé", il: "elle" },
  { nom: "Ravi", il: "il" },
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
  { nom: "Maya", il: "elle" },
  { nom: "Léon", il: "il" },
  { nom: "Aya", il: "elle" },
  { nom: "Hugo", il: "il" },
];

export const quelquun = () => pick(PRENOMS);

export function deuxPersonnes(): [Prenom, Prenom] {
  const p = quelquun();
  let q = quelquun();
  while (q.nom === p.nom) q = quelquun();
  return [p, q];
}

/** « trouve-t-il », « trouve-t-elle ». */
export const tIl = (p: Prenom) => `t-${p.il}`;

/* =========================================================
   POSER UN CALCUL — calcul nu ou une phrase (★1-★2), avec
   un enfant de la troupe. La tournure change, le calcul reste.
========================================================= */

export function poserCalcul(calc: string, p: Prenom = quelquun()): string {
  return pick([
    `Combien font ${calc} ?`,
    `Calcule ${calc} dans ta tête.`,
    `${calc} = ?`,
    `Quel est le résultat de ${calc} ?`,
    `${p.nom} calcule ${calc} de tête. Quel résultat trouve-${tIl(p)} ?`,
    `${p.nom} écrit ${calc} sur son ardoise. Que doit-${p.il} trouver ?`,
    `Aide ${p.nom} : combien font ${calc} ?`,
    `${p.nom} lance un défi : « ${calc}, ça fait combien ? »`,
    `Pic le paille-en-queue demande à ${p.nom} : « Combien font ${calc} ? »`,
    `Jeu du calcul éclair à la récré : ${calc}. Quelle est la réponse ?`,
    `La maîtresse écrit ${calc} au tableau. Quel est le résultat ?`,
    `${p.nom} tire une carte : « ${calc} ». Quel nombre doit-${p.il} dire ?`,
  ]);
}

/* =========================================================
   LES MONDES D'ENFANT — un objet compté (singulier, pluriel),
   un lieu, et l'objet dessinable s'il existe dans `objets`.
   La Réunion : un monde sur vingt-cinq environ.
========================================================= */

export type Monde = {
  /** « au goûter », « à la ferme » : complément de lieu. */
  ou: string;
  un: string;
  des: string;
  /** Le genre de l'objet, pour « chacun / chacune », « en reçoit-il ». */
  fem: boolean;
  /** Le dessin de la bibliothèque `objets`, s'il y en a un. */
  dessin?: ObjetId;
  /** Le métier ou la personne qui s'en occupe (maths transversales). */
  metier?: string;
};

export const MONDES: readonly Monde[] = [
  { ou: "au goûter", un: "pomme", des: "pommes", fem: true, dessin: "pomme" },
  { ou: "au marché", un: "banane", des: "bananes", fem: true, dessin: "banane", metier: "la marchande" },
  { ou: "à la récré", un: "ballon", des: "ballons", fem: false, dessin: "ballon" },
  { ou: "à l'aquarium", un: "poisson", des: "poissons", fem: false, dessin: "poisson", metier: "la soigneuse" },
  { ou: "dans la forêt", un: "oiseau", des: "oiseaux", fem: false, dessin: "oiseau", metier: "le garde forestier" },
  { ou: "au jardin", un: "papillon", des: "papillons", fem: false, dessin: "papillon", metier: "le jardinier" },
  { ou: "au jardin", un: "fleur", des: "fleurs", fem: true, dessin: "fleur", metier: "la fleuriste" },
  { ou: "à la bibliothèque", un: "livre", des: "livres", fem: false, dessin: "livre", metier: "la bibliothécaire" },
  { ou: "dans la fusée", un: "étoile", des: "étoiles", fem: true, dessin: "etoile", metier: "l'astronaute" },
  { ou: "au garage", un: "voiture", des: "voitures", fem: true, dessin: "voiture", metier: "le garagiste" },
  { ou: "au port", un: "bateau", des: "bateaux", fem: false, dessin: "bateau" },
  { ou: "à la cantine", un: "verre", des: "verres", fem: false, dessin: "verre", metier: "le cuisinier" },
  { ou: "à la kermesse", un: "chapeau", des: "chapeaux", fem: false, dessin: "chapeau" },
  { ou: "à la boulangerie", un: "croissant", des: "croissants", fem: false, metier: "la boulangère" },
  { ou: "au cirque", un: "clown", des: "clowns", fem: false },
  { ou: "sur le bateau pirate", un: "pièce d'or", des: "pièces d'or", fem: true },
  { ou: "au musée des dinosaures", un: "fossile", des: "fossiles", fem: false },
  { ou: "à la ferme", un: "œuf", des: "œufs", fem: false, metier: "la fermière" },
  { ou: "à la piscine", un: "bouée", des: "bouées", fem: true, metier: "le maître-nageur" },
  { ou: "au château", un: "chevalier", des: "chevaliers", fem: false },
  { ou: "à l'anniversaire", un: "bonbon", des: "bonbons", fem: false },
  { ou: "à la pâtisserie", un: "cookie", des: "cookies", fem: false, metier: "le chef pâtissier" },
  { ou: "dans la classe", un: "crayon", des: "crayons", fem: false, metier: "la maîtresse" },
  { ou: "au zoo", un: "pingouin", des: "pingouins", fem: false, metier: "le soigneur" },
  { ou: "au marché de Saint-Pierre", un: "letchi", des: "letchis", fem: false },
];

export const monde = () => pick(MONDES);
export const mondeDessinable = () => pick(MONDES.filter((m) => m.dessin));

/** « 1 pomme », « 3 pommes ». */
export const nObj = (n: number, m: Monde) => `${fmt(n)} ${n === 1 ? m.un : m.des}`;

/* =========================================================
   LES DESSINS
========================================================= */

/**
 * Des objets en GROUPES égaux : `groupes` cases de `parGroupe` objets (le
 * canvas dessine 5 objets au plus par case). C'est le schéma de billes du
 * site : on voit les paquets, on peut compter.
 */
export function objetsGroupes(quoi: ObjetId, groupes: number, parGroupe: number, reste = 0): ObjetsCanvasData {
  const elements = Array.from({ length: groupes }, () => ({ quoi, nombre: parGroupe }));
  if (reste > 0) elements.push({ quoi, nombre: reste, marque: true } as never);
  return { kind: "objets", mode: "couleur", elements, colonnes: Math.min(3, elements.length) };
}

/** Une collection à compter, rangée par paquets de 5 (pour un partage à faire). */
export function objetsEnVrac(quoi: ObjetId, total: number): ObjetsCanvasData {
  const elements: { quoi: ObjetId; nombre: number }[] = [];
  for (let r = total; r > 0; r -= 5) elements.push({ quoi, nombre: Math.min(5, r) });
  return { kind: "objets", mode: "couleur", elements, colonnes: Math.min(3, elements.length) };
}

/** Le matériel de numération d'un nombre (le dessin n'écrit pas le nombre). */
export function baseDix(n: number, etiquettes = true): BaseDixCanvasData | undefined {
  const m = Math.floor(n / 1000);
  const c = Math.floor((n % 1000) / 100);
  const d = Math.floor((n % 100) / 10);
  const u = n % 10;
  if (m > 9) return undefined;
  return {
    kind: "base_dix",
    ...(m ? { milliers: m } : {}),
    ...(c ? { centaines: c } : {}),
    ...(d ? { dizaines: d } : {}),
    ...(u ? { unites: u } : {}),
    etiquettes,
  };
}

/** Une opération posée, SANS son résultat. */
export function pose(operation: CalculPoseCanvasData["operation"], numbers: number[]): CalculPoseCanvasData {
  return {
    kind: "calcul_pose",
    operation,
    numbers: numbers.map(String),
    display: { showResult: false, showRetenues: false },
  };
}

/** Un schéma en barres : `parts` [étiquette, valeur] ; valeur `null` → « ? ». */
export function barre(
  parts: readonly [string, string | null][],
  total: string | null,
  questionLabel?: string,
): SchemaBarreCanvasData {
  return {
    kind: "schema_barre",
    total: total ?? "?",
    parts: parts.map(([label, v]) => (v === null ? { label, unknown: true } : { label, value: v })),
    ...(questionLabel ? { questionLabel } : {}),
    display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: !!questionLabel },
  };
}

/** `k` parts égales de valeur `v` (ou « ? ») : n fois, ou un partage.
 *  ⚠️ Au-delà de 8 parts, les nombres ne tiennent plus dans la barre (rendu du
 *  10/11/2026 : 12 parts de « 3 » sortaient du cadre) : pas de dessin. */
export function barreEgale(k: number, v: string | null, total: string | null, label = ""): SchemaBarreCanvasData | undefined {
  if (k > 8) return undefined;
  return barre(Array.from({ length: k }, () => [label, v] as [string, string | null]), total);
}

/* =========================================================
   LE GABARIT
========================================================= */

type Base = {
  id: string;
  notionId: string;
  microId: string;
  difficulty: Etoile;
  hint: string;
  tags: string[];
  theme?: TutorBankItemV4["theme"];
};

export function gabarit(base: Base, generate: () => Q): TutorBankItemV4 {
  return {
    kind: "template",
    niveau: "ce2",
    matiere: "maths",
    theme: "neutral",
    ...base,
    tags: ["ce2", base.notionId, ...base.tags, "template"],
    generate,
  } as TutorBankItemV4;
}

/**
 * Une question courte SANS personne (« Combien font 47 + 9 ? ») revient vite à
 * l'identique : la moitié du temps, un enfant de la troupe la pose.
 */
const NOMS = [...PRENOMS.map((p) => p.nom), "Pic"];
export function habiller(text: string): string {
  const courte = !/[.?!»] \S/.test(text.trim());
  if (!courte || NOMS.some((n) => text.includes(n)) || Math.random() < 0.5) return text;
  const p = quelquun();
  return pick([
    `${p.nom} demande : « ${text} »`,
    `Question ${de(p.nom)} : ${text}`,
    `Défi ${de(p.nom)} : ${text}`,
    `${p.nom} te lance un défi : ${text}`,
    `Devinette ${de(p.nom)} : ${text}`,
  ]);
}

/** Une question QCM à réponse numérique. */
export function qN(text: string, n: number, pieges: readonly number[], explanation: string, extra: Partial<Q> = {}, unite = ""): Q {
  return {
    text: habiller(text),
    format: "qcm",
    choices: choixN(n, pieges, unite),
    expected: [rep(n, unite)],
    comparator: "mcq_exact",
    explanation,
    ...extra,
  };
}

/** Une question QCM à réponse en mots. */
export function qM(text: string, correct: string, pieges: readonly string[], explanation: string, extra: Partial<Q> = {}): Q {
  return {
    text: habiller(text),
    format: "qcm",
    choices: choix(correct, pieges),
    expected: [correct],
    comparator: "mcq_exact",
    explanation,
    ...extra,
  };
}
