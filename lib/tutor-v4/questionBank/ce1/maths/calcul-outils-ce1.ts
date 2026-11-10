// lib/tutor-v4/questionBank/ce1/maths/calcul-outils-ce1.ts
//
// Les outils partagés par le calcul du CE1 : calcul mental, additions et
// soustractions posées, problèmes, partages (10/11/2026).
//
// ⛔ POURQUOI CE FICHIER. Les quatre banques servaient un ou deux SQUELETTES
// par micro (« Combien font # + # ? ») : l'élève de 7 ans reconnaît la phrase,
// pas les nombres — 17 à 19 répétitions sur 20 à chaque étoile. Chaque gabarit
// tire maintenant une FAMILLE (prendre la question par un autre bout), une
// SITUATION d'enfant et une TOURNURE, puis les nombres.
//
// ⭐ La troupe du site (Nina, Téo, Zoé, Ravi, Pic le paille-en-queue) et des
// prénoms variés. La Réunion : un contexte sur vingt-cinq environ, pas plus.
//
// ⭐ LES DESSINS SERVENT, ILS NE DONNENT PAS LA RÉPONSE : on dessine ce qu'on
// SAIT (la quantité de départ, UN seul paquet, le nombre à transformer), jamais
// le résultat déjà rangé.

import type {
  BaseDixCanvasData,
  CalculPoseCanvasData,
  MonnaieCanvasData,
  MonnaieValeur,
  ObjetId,
  ObjetsCanvasData,
  SchemaBarreCanvasData,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";

export type Q = TutorGeneratedQuestionV4;

/* =========================================================
   HASARD
========================================================= */

export function ri(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function rc<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function melange<T>(items: readonly T[]): T[] {
  const t = [...items];
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
}

/** Vrai avec la probabilité p. */
export const pile = (p = 0.5) => Math.random() < p;

export const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** « 1 000 » avec l'espace des milliers ; les autres nombres tels quels. */
export const nb = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** « 1 bille », « 3 billes ». */
export const pl = (n: number, sg: string, plu: string) => `${nb(n)} ${n === 1 ? sg : plu}`;

export function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/* =========================================================
   LES RÉPONSES
   ⛔ Jamais deux choix de même valeur ; la bonne réponse à une
   place au hasard ; l'unité dans chaque choix si la question
   en a une.
========================================================= */

export function choixTexte(bonne: string, faux: readonly string[]) {
  const d = melange(Array.from(new Set(faux)).filter((f) => f !== bonne)).slice(0, 3);
  return melange([bonne, ...d]);
}

/** Les distracteurs numériques : positifs, différents de la réponse, sans doublon. */
export function choixNombres(bonne: number, faux: readonly number[], unite = "") {
  const f = (n: number) => (unite ? `${nb(n)} ${unite}` : nb(n));
  const d = melange(Array.from(new Set(faux)).filter((x) => x >= 0 && x !== bonne && Number.isInteger(x))).slice(0, 3);
  return { choices: melange([f(bonne), ...d.map(f)]), expected: f(bonne) };
}

/** Réponse courte : un nombre. */
/** « de assiettes » → « d'assiettes » : les noms tirés au hasard cassent l'élision. */
export const elision = (t: string) =>
  t
    .replace(/(^|[\s(«])([Dd])e ([aeiouéèêâîôAEIOUÉÈÊ])/g, "$1$2'$3")
    // « à les 3 pirates » → « aux 3 pirates » ; seulement devant un nombre,
    // pour ne pas toucher « à les ranger ».
    .replace(/ à les (\d)/g, " aux $1");

export function court(text: string, rep: number, explanation: string, canvas?: Q["canvas"]): Q {
  return { text: elision(text), format: "short", expected: [String(rep)], comparator: "number_equal", explanation, ...(canvas ? { canvas } : {}) };
}

/** QCM sur des nombres (avec l'unité si la question en a une). */
export function qcmNombre(text: string, rep: number, faux: readonly number[], explanation: string, unite = "", canvas?: Q["canvas"]): Q {
  const { choices, expected } = choixNombres(rep, faux, unite);
  if (choices.length < 3) return court(text, rep, explanation, canvas);
  return { text: elision(text), format: "qcm", choices, expected: [expected], comparator: "mcq_exact", explanation, ...(canvas ? { canvas } : {}) };
}

/** QCM sur des phrases. */
export function qcmTexte(text: string, bonne: string, faux: readonly string[], explanation: string, canvas?: Q["canvas"]): Q {
  return { text: elision(text), format: "qcm", choices: choixTexte(bonne, faux), expected: [bonne], comparator: "mcq_exact", explanation, ...(canvas ? { canvas } : {}) };
}

/** Une fois sur trois en QCM (distracteurs d'enfant), sinon réponse courte. */
export function nombreOuQcm(text: string, rep: number, faux: readonly number[], explanation: string, canvas?: Q["canvas"], unite = ""): Q {
  // En CE1, `applyMathsKeyboardFree` (index.ts) change TOUTE réponse courte en
  // QCM, avec des distracteurs génériques (×2, ×3 : « 2019 » pour 308 + 365).
  // On donne donc toujours NOS distracteurs, qui sont des erreurs d'enfant ;
  // la réponse courte ne reste que si on en a moins de deux.
  return qcmNombre(text, rep, faux, explanation, unite, canvas);
}

/** Les erreurs d'enfant autour d'un résultat : ±1, ±10, ±2. */
export const erreurs = (r: number, ...autres: number[]) => [r + 1, r - 1, r + 10, r - 10, r + 2, ...autres];

/* =========================================================
   LES ENFANTS
========================================================= */

export type Enfant = { nom: string; il: "il" | "elle" };

export const ENFANTS: readonly Enfant[] = [
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
  { nom: "Léa", il: "elle" },
  { nom: "Noé", il: "il" },
  { nom: "Maya", il: "elle" },
  { nom: "Hugo", il: "il" },
];

export const enfant = () => rc(ENFANTS);

export function deuxEnfants(): [Enfant, Enfant] {
  const a = enfant();
  let b = enfant();
  while (b.nom === a.nom) b = enfant();
  return [a, b];
}

/** « Aide-le », « Aide-la ». */
export const le = (p: Enfant) => (p.il === "il" ? "le" : "la");

/* =========================================================
   LES TOURNURES D'UN CALCUL NU (★1-★2 : simple et direct)
========================================================= */

/** Un calcul nu, posé de dix façons. `calc` : « 8 + 7 ». */
export function direCalcul(calc: string): string {
  const p = enfant();
  return rc([
    pile() ? `Calcule ${calc}.` : `Combien font ${calc} ?`,
    `${p.nom} calcule ${calc} dans sa tête. Que trouve-t-${p.il} ?`,
    `Sur l'ardoise de ${p.nom}, il y a ${calc}. Quel est le résultat ?`,
    `${p.nom} te lance un défi : ${calc}. Combien cela fait-il ?`,
    `Pic le paille-en-queue demande : « Combien font ${calc} ? »`,
    `Aide ${p.nom} à finir son calcul : ${calc}.`,
    `La maîtresse écrit ${calc} au tableau. Quel est le résultat ?`,
    `Au jeu du furet, ${p.nom} doit dire ${calc}. Que doit-${p.il} dire ?`,
    `Ti Margo cherche combien font ${calc}. Peux-tu l'aider ?`,
  ]);
}

/** Une égalité à trou, posée de huit façons. `eg` : « 4 + … = 12 ». */
export function direTrou(eg: string): string {
  const p = enfant();
  return rc([
    pile() ? `Quel nombre manque : ${eg} ?` : `Complète : ${eg}.`,
    `${p.nom} complète son ardoise : ${eg}. Quel nombre écrit-${p.il} ?`,
    `${p.nom} a effacé un nombre : ${eg}. Lequel ?`,
    `Sur l'ardoise de ${p.nom} : ${eg}. Quel nombre manque ?`,
    `Pic le paille-en-queue a caché un nombre sous sa plume : ${eg}. Quel est ce nombre ?`,
    `${p.nom} cherche le nombre qui manque : ${eg}. Aide-${le(p)} !`,
    `Une tache d'encre cache un nombre chez ${p.nom} : ${eg}. Lequel ?`,
    `Devinette de ${p.nom} : ${eg}. Quel nombre faut-il écrire ?`,
  ]);
}

/* =========================================================
   LES CHOSES QU'ON COMPTE
   `objet` : le dessin de la bibliothèque `objets`, quand il existe.
   Sinon on dessine des jetons (cadres de dix) : ce sont nos billes.
========================================================= */

export type Chose = { pl: string; sg: string; objet?: ObjetId };

export const CHOSES: readonly Chose[] = [
  { pl: "pommes", sg: "pomme", objet: "pomme" },
  { pl: "bananes", sg: "banane", objet: "banane" },
  { pl: "ballons", sg: "ballon", objet: "ballon" },
  { pl: "poissons", sg: "poisson", objet: "poisson" },
  { pl: "fleurs", sg: "fleur", objet: "fleur" },
  { pl: "étoiles dorées", sg: "étoile dorée", objet: "etoile" },
  { pl: "livres", sg: "livre", objet: "livre" },
  { pl: "petites voitures", sg: "petite voiture", objet: "voiture" },
  { pl: "papillons", sg: "papillon", objet: "papillon" },
  { pl: "petits bateaux", sg: "petit bateau", objet: "bateau" },
  { pl: "feuilles d'automne", sg: "feuille d'automne", objet: "feuille" },
  { pl: "billes", sg: "bille" },
  { pl: "perles", sg: "perle" },
  { pl: "graines", sg: "graine" },
  { pl: "coquillages", sg: "coquillage" },
  { pl: "images", sg: "image" },
  { pl: "pièces d'or", sg: "pièce d'or" },
  { pl: "crêpes", sg: "crêpe" },
  { pl: "biscuits", sg: "biscuit" },
  { pl: "cartes de dinosaures", sg: "carte de dinosaure" },
  { pl: "autocollants", sg: "autocollant" },
  { pl: "craies", sg: "craie" },
];

export const chose = () => rc(CHOSES);
export const choseDessinable = () => rc(CHOSES.filter((c) => c.objet));

/** « de billes », « d'images ». */
export const de = (mot: string) => (/^[aeiouyàâéèêëîïôœh]/i.test(mot) ? `d'${mot}` : `de ${mot}`);

/* =========================================================
   LES DESSINS
========================================================= */

/** Des objets de la bibliothèque, par tas de `tas` (5 au plus par tas). */
export function dessinObjets(objet: ObjetId, n: number, tas = 5, consigne?: string): ObjetsCanvasData {
  const t = Math.max(1, Math.min(5, tas));
  const elements: ObjetsCanvasData["elements"] = [];
  for (let reste = n; reste > 0; reste -= t) elements.push({ quoi: objet, nombre: Math.min(t, reste) });
  return { kind: "objets", mode: "couleur", elements, size: { width: 300 }, ...(consigne ? { consigne } : {}) };
}

/** UN seul paquet, dessiné et nommé (« 1 sachet ») : on sait ce qu'il y a dedans,
 *  pas combien il y en a en tout. */
export function dessinUnPaquet(objet: ObjetId, k: number, label: string, consigne?: string): ObjetsCanvasData {
  return { kind: "objets", mode: "couleur", elements: [{ quoi: objet, nombre: Math.min(5, k), label }], size: { width: 260 }, ...(consigne ? { consigne } : {}) };
}

/** Des jetons dans des cadres de dix : nos « billes ». `ajout` : jetons bleus. */
export function dessinJetons(n: number, ajout?: number, consigne?: string): BaseDixCanvasData {
  return { kind: "base_dix", variante: "cadres", nombre: n, ...(ajout ? { ajout } : {}), ...(consigne ? { consigne } : {}) };
}

/** Une quantité à compter : objets si on sait les dessiner (15 au plus), sinon jetons. */
export function dessinQuantite(c: Chose, n: number, consigne?: string): Q["canvas"] | undefined {
  if (c.objet && n <= 15) return dessinObjets(c.objet, n, 5, consigne);
  if (n <= 40) return dessinJetons(n, undefined, consigne);
  return undefined;
}

/** Le matériel de numération d'un nombre (< 1 000). Le dessin n'écrit pas le nombre. */
export function dessinNombre(n: number, extra: Partial<BaseDixCanvasData> = {}): BaseDixCanvasData {
  const c = Math.floor(n / 100);
  const d = Math.floor((n % 100) / 10);
  const u = n % 10;
  return {
    kind: "base_dix",
    ...(c ? { centaines: c } : {}),
    ...(d ? { dizaines: d } : {}),
    ...(u ? { unites: u } : {}),
    etiquettes: true,
    ...extra,
  };
}

export function dessinBarre(data: Omit<SchemaBarreCanvasData, "kind">): SchemaBarreCanvasData {
  return { kind: "schema_barre", display: { showTotal: true, showPartLabels: true, showValues: true }, ...data };
}

export function dessinPose(operation: CalculPoseCanvasData["operation"], numbers: string[], extra: Partial<CalculPoseCanvasData> = {}): CalculPoseCanvasData {
  return { kind: "calcul_pose", operation, numbers, display: { showResult: false, showRetenues: false }, ...extra };
}

/** Des billets et des pièces en euros ENTIERS (CE1). */
export function dessinArgent(montant: number): MonnaieCanvasData | undefined {
  const valeurs: [number, MonnaieValeur][] = [[50, "50e"], [20, "20e"], [10, "10e"], [5, "5e"], [2, "2e"], [1, "1e"]];
  const elements: MonnaieCanvasData["elements"] = [];
  let reste = montant;
  let dessins = 0;
  for (const [v, code] of valeurs) {
    const k = Math.floor(reste / v);
    if (k) {
      elements.push({ valeur: code, nombre: k });
      dessins += k;
      reste -= k * v;
    }
  }
  if (dessins > 10 || !elements.length) return undefined;
  return { kind: "monnaie", elements };
}
