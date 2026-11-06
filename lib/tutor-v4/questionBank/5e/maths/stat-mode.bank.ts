// LE MODE D'UNE SÉRIE : la valeur de plus grand effectif (06/11/2026).
//
// Québec, Maroc, Belgique, et aussi Sénégal et Côte d'Ivoire. Le mot n'est pas au programme
// français : le cycle 4 cite « moyenne, médiane » (`docs/bo-maths-cycle4-recopie.md`, l. 193).
// `stat_lire_tableau` fait lire « la plus fréquente » sans le mot : ici, on nomme le mode,
// on le distingue de son effectif, et on traite les séries à deux modes. Micro masquée.
// ⛔ ★1-★2 : phrase courte, sans contexte. Le diagramme ne surligne jamais la réponse.

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import { entre, expliquer, melange, qcm, un } from "@/lib/tutor-v4/questionBank/outils-geometrie";

let rang = 0;
const tpl = (difficulty: number, hint: string, generate: () => TutorGeneratedQuestionV4): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `stat_mode_tpl_${++rang}`,
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mode",
    difficulty,
    theme: "neutral",
    hint,
    tags: ["statistiques", "mode", "template"],
    generate,
  }) as unknown as TutorBankItemV4;

const DEF = "le mode d'une série est la valeur qui a le plus grand effectif, celle qui revient le plus souvent.";
const court = (text: string, x: number, explanation: string, canvas?: CanvasFigure) =>
  ({ text, format: "short", expected: [String(x)], comparator: "number_equal", explanation, ...(canvas ? { canvas } : {}) }) as TutorGeneratedQuestionV4;
const choix = (text: string, juste: string, faux: string[], explanation: string, canvas?: CanvasFigure) =>
  ({ text, format: "qcm", choices: qcm(juste, faux), expected: [juste], comparator: "mcq_exact", explanation, ...(canvas ? { canvas } : {}) }) as TutorGeneratedQuestionV4;

/** Des valeurs distinctes, croissantes. */
function valeurs(n: number, min: number, max: number): number[] {
  const l = new Set<number>();
  while (l.size < n) l.add(entre(min, max));
  return [...l].sort((a, b) => a - b);
}
/** Des effectifs dont le plus grand est unique (ou présent `modes` fois). */
function effectifs(n: number, modes = 1, haut = 7): number[] {
  const m = entre(Math.max(3, haut - 3), haut);
  const e = Array.from({ length: n }, () => entre(1, m - 1));
  for (const i of melange(e.map((_, k) => k)).slice(0, modes)) e[i] = m;
  return e;
}
const leMode = (v: readonly (number | string)[], e: readonly number[]) => v[e.indexOf(Math.max(...e))];
/** La série en vrac, dans son paragraphe : chaque valeur apparaît autant de fois que son effectif. */
const enVrac = (v: readonly number[], e: readonly number[]) => melange(v.flatMap((x, i) => Array.from({ length: e[i] }, () => x))).join(" ; ");
// ⛔ Vu à 375 px : le titre passé dans `headers` décalait chaque effectif d'une colonne (le canvas
// ajoute son coin dès qu'une ligne a un libellé) : il va dans `coin`. Des mots ou beaucoup de
// valeurs ne tiennent pas en largeur (page à 496 px) : le tableau se pose alors en hauteur.
const tableau = (titre: string, v: readonly (number | string)[], e: readonly number[]): CanvasFigure =>
  (v.some((x) => typeof x === "string" && !/^\d+$/.test(x)) || v.length > 6
    ? { kind: "tableau_donnees", headers: [titre, "Effectif"], rows: v.map((x, i) => ({ values: [x, e[i]] })), display: { compact: true } }
    : { kind: "tableau_donnees", coin: titre, headers: v.map(String), rows: [{ label: "Effectif", values: [...e] }], display: { compact: true } }) as CanvasFigure;
const baton = (v: readonly (number | string)[], e: readonly number[], type: "batons" | "barres" = "batons"): CanvasFigure =>
  ({ kind: "stat_graph", graphType: type, data: v.map((label, i) => ({ label: String(label), value: e[i] })), display: { showAxis: true, step: 1, showLabels: true, showValues: false } }) as CanvasFigure;
const dire = (v: readonly (number | string)[], e: readonly number[], j: number | string) => `le plus grand effectif est ${Math.max(...e)}, c'est celui de ${j}.`;

const ETIQUETTES = ["Valeur", "Note", "Score", "Nombre", "Résultat", "Pointure"] as const;
const CATEGORIES = [
  ["rouge", "bleu", "vert", "jaune", "noir"], ["lundi", "mardi", "mercredi", "jeudi", "vendredi"], ["carré", "cercle", "triangle", "losange", "hexagone"], ["pomme", "poire", "mangue", "kiwi", "orange"],
  ["chat", "chien", "oiseau", "poisson", "lapin"], ["nord", "sud", "est", "ouest", "centre"], ["A", "B", "C", "D", "E"],
];

const CTX_NUM = [
  { t: "Un vendeur de chaussures note les pointures vendues dans la journée.", e: "Pointure", min: 36, max: 45, q: "Quelle est la pointure modale de la série, c'est-à-dire son mode ?" },
  { t: "Une entraîneuse de handball relève le nombre de buts par match.", e: "Buts", min: 15, max: 30, q: "Quel est le mode de cette série de buts ?" },
  { t: "Une professeure de musique note le nombre d'heures de pratique de ses élèves.", e: "Heures", min: 1, max: 9, q: "Quel est le mode de ces durées ?" },
  { t: "Un météorologue relève la température de midi, en degrés, pendant un mois.", e: "Degrés", min: 12, max: 28, q: "Quel est le mode de ces températures ?" },
  { t: "Une ornithologue compte les œufs de chaque nid observé.", e: "Œufs", min: 2, max: 8, q: "Quel est le mode de cette série ?" },
  { t: "Un boulanger compte les fournées de chaque journée.", e: "Fournées", min: 3, max: 10, q: "Quel nombre de fournées est le mode ?" },
  { t: "Une infirmière note l'âge des enfants vaccinés ce matin.", e: "Âge", min: 3, max: 12, q: "Quel âge est le mode de la série ?" },
  { t: "Un guide de montagne relève le nombre de randonneurs par sortie.", e: "Randonneurs", min: 6, max: 16, q: "Quel est le mode de cette série ?" },
  { t: "Une libraire note le nombre de livres achetés par client.", e: "Livres", min: 1, max: 7, q: "Quel nombre de livres est le mode ?" },
  { t: "Un pêcheur note ses prises à chaque sortie.", e: "Prises", min: 4, max: 14, q: "Quel est le mode de ses prises ?" },
  { t: "Une technicienne relève la taille des fichiers envoyés, en Go.", e: "Taille", min: 2, max: 12, q: "Quelle taille est le mode ?" },
  { t: "Un randonneur du Piton des Neiges note ses heures de marche par jour.", e: "Heures", min: 3, max: 9, q: "Quel est le mode de cette série ?" },
];
const CTX_MOT = [
  { t: "On a demandé à des élèves leur sport préféré.", c: ["Football", "Natation", "Judo", "Basket", "Danse"], q: "Quel sport est le mode de cette série ?" },
  { t: "Un orchestre compte ses instruments.", c: ["Violon", "Flûte", "Cor", "Harpe", "Tambour"], q: "Quel instrument est le mode ?" },
  { t: "Un jardin botanique classe ses arbres.", c: ["Chêne", "Palmier", "Pin", "Saule", "Érable"], q: "Quel arbre est le mode ?" },
  { t: "Une vétérinaire note les animaux soignés cette semaine.", c: ["Chat", "Chien", "Lapin", "Cheval", "Oiseau"], q: "Quel animal est le mode de cette série ?" },
  { t: "Une bibliothèque compte les genres empruntés.", c: ["Roman", "BD", "Conte", "Poésie", "Science"], q: "Quel genre est le mode ?" },
  { t: "Un restaurant note les plats commandés à midi.", c: ["Soupe", "Salade", "Poisson", "Riz", "Pizza"], q: "Quel plat est le mode ?" },
  { t: "Une gare note la destination des voyageurs.", c: ["Nord", "Sud", "Est", "Ouest", "Centre"], q: "Quelle destination est le mode ?" },
  { t: "Une astronome classe les objets observés.", c: ["Lune", "Mars", "Vénus", "Saturne", "Jupiter"], q: "Quel objet est le mode de cette série ?" },
  { t: "Un magasin de vélos compte les couleurs vendues.", c: ["Rouge", "Bleu", "Vert", "Noir", "Blanc"], q: "Quelle couleur est le mode ?" },
  { t: "Un club de lecture note la langue des livres lus.", c: ["Français", "Anglais", "Arabe", "Espagnol", "Italien"], q: "Quelle langue est le mode ?" },
];

export const statModeBank: TutorBankItemV4[] = [
  tpl(1, "Le mode : la valeur qui revient le plus souvent.", () => {
    const v = valeurs(entre(4, 5), 1, 20);
    const e = effectifs(v.length, 1, entre(3, 5));
    const j = leMode(v, e) as number;
    return court(`${un(["Quel est le mode de cette série ?", "Trouve le mode de cette série.", "Voici une série. Quel est son mode ?", "Donne le mode de la série suivante.", "Quelle valeur est le mode de cette série ?", "Cherche le mode de cette série de nombres.", "Quel nombre est le mode ici ?", "Lis cette série et donne son mode.", "Compte chaque valeur : quel est le mode ?", "Quelle valeur revient le plus ? C'est le mode."])}\n\n${enVrac(v, e)}`, j, expliquer(DEF, "on compte combien de fois revient chaque valeur.", dire(v, e, j), `le mode est ${j}.`));
  }),
  tpl(1, "Cherche le plus grand effectif, puis lis la valeur au-dessus.", () => {
    const v = valeurs(entre(4, 6), 1, 30);
    const e = effectifs(v.length, 1, entre(4, 12));
    const j = leMode(v, e) as number;
    return court(un(["Quel est le mode de cette série ?", "Lis le tableau. Quel est le mode ?", "Donne le mode de cette série.", "Ce tableau donne une série. Quel est son mode ?", "Quelle valeur est le mode ?", "Trouve le mode à l'aide du tableau.", "D'après ce tableau, quel est le mode ?", "Quel est le mode de la série de ce tableau ?", "Cherche le plus grand effectif : quel est le mode ?", "Le mode de cette série vaut combien ?"]), j, expliquer(DEF, "on repère le plus grand effectif du tableau.", dire(v, e, j), `le mode est ${j}.`), tableau(un(ETIQUETTES), v, e));
  }),
  tpl(1, "Le mode est sous le plus haut bâton.", () => {
    const v = valeurs(entre(4, 6), 1, 20);
    const e = effectifs(v.length, 1, entre(4, 9));
    const j = leMode(v, e) as number;
    return court(un(["Quel est le mode de cette série ?", "Lis le diagramme. Quel est le mode ?", "Donne le mode de cette série.", "Ce diagramme montre une série. Quel est son mode ?", "Quelle valeur est le mode ?", "Trouve le mode sur ce diagramme.", "D'après ce diagramme en bâtons, quel est le mode ?", "Quel est le mode de la série représentée ?", "Regarde les bâtons : quel est le mode ?", "Le mode de cette série vaut combien ?"]), j, expliquer(DEF, "le plus haut bâton montre le plus grand effectif ; le mode est la valeur écrite dessous.", dire(v, e, j), `le mode est ${j}.`), baton(v, e));
  }),
  tpl(1, "Le mode peut être un mot : la réponse la plus fréquente.", () => {
    const c = un(CATEGORIES).slice(0, entre(3, 5));
    const e = effectifs(c.length, 1, entre(4, 12));
    const j = leMode(c, e) as string;
    return choix(un(["Quel est le mode de cette série ?", "Lis le tableau. Quel est le mode ?", "Quelle réponse est le mode ?", "Donne le mode de cette série.", "Ce tableau donne une série de réponses. Quel est son mode ?", "Choisis le mode de cette série.", "D'après ce tableau, quel est le mode ?", "Quel est le mode de la série de ce tableau ?", "Le mode de cette série est lequel ?", "Trouve le mode de ces réponses."]), j, c.filter((x) => x !== j), expliquer(DEF, "le mode existe aussi quand les réponses ne sont pas des nombres.", dire(c, e, j), `le mode est ${j}.`), tableau("Réponse", c, e));
  }),

  tpl(2, "Deux valeurs à égalité au plus grand effectif : la série a deux modes.", () => {
    const v = valeurs(5, 1, 20);
    const e = effectifs(v.length, 2, entre(3, 5));
    const m = v.filter((_, i) => e[i] === Math.max(...e));
    const paire = (a: number, b: number) => `${Math.min(a, b)} et ${Math.max(a, b)}`;
    const juste = paire(m[0], m[1]);
    const autres = v.filter((x) => !m.includes(x));
    const seul = (x: number) => `Seulement ${x}`;
    return choix(`${un(["Cette série a deux modes. Lesquels ?", "Quels sont les modes de cette série ?", "Deux valeurs sont à égalité : quels sont les modes ?", "Trouve les deux modes de cette série.", "Choisis les modes de cette série.", "Quelles valeurs sont les modes ici ?", "Cherche les valeurs les plus fréquentes : quels sont les modes ?", "Cette série compte deux modes. Choisis-les.", "Lis cette série : quels sont ses modes ?", "Donne les modes de la série suivante."])}\n\n${enVrac(v, e)}`, juste, [paire(m[0], autres[0]), paire(m[1], autres[1]), paire(autres[0], autres[2]), seul(m[0]), seul(m[1])], expliquer(DEF, "on compte chaque valeur : plusieurs peuvent avoir le plus grand effectif.", `${m[0]} et ${m[1]} reviennent chacun ${Math.max(...e)} fois.`, `les modes sont ${juste}.`));
  }),
  tpl(2, "Le mode est la VALEUR, pas son effectif ni la plus grande valeur.", () => {
    const v = valeurs(5, 2, 40);
    let e = effectifs(5, 1, entre(5, 12));
    // Le mode n'est ni la plus grande valeur, ni égal à son propre effectif.
    for (let k = 0; k < 50 && (e.indexOf(Math.max(...e)) === 4 || v.includes(Math.max(...e))); k++) {
      v.splice(0, 5, ...valeurs(5, 2, 40));
      e = effectifs(5, 1, entre(5, 12));
    }
    const j = leMode(v, e) as number;
    const ef = Math.max(...e);
    const s = String;
    return choix(un(["Quel est le mode de cette série ?", "Lis le tableau, attention au piège. Quel est le mode ?", "Choisis le mode de cette série.", "Parmi ces nombres, lequel est le mode ?", "Quel nombre est le mode de la série ?", "Ne confonds pas valeur et effectif : quel est le mode ?", "D'après ce tableau, le mode vaut combien ?", "Trouve le mode de cette série.", "Choisis le bon nombre : quel est le mode ?", "Ce tableau donne une série. Quel en est le mode ?"]), s(j), [s(ef), s(v[4]), s(e.reduce((a, b) => a + b, 0)), s(v[0])], expliquer(DEF, "on cherche le plus grand effectif, puis on lit la VALEUR qui lui correspond.", dire(v, e, j), `le mode est ${j} ; ${ef} est son effectif.`), tableau("Valeur", v, e));
  }),
  tpl(2, "L'effectif du mode : le nombre de fois où il revient.", () => {
    const v = valeurs(entre(4, 5), 1, 20);
    const e = effectifs(v.length, 1, entre(3, 6));
    const j = leMode(v, e) as number;
    const ef = Math.max(...e);
    return court(`${un(["Combien de fois revient le mode de cette série ?", "Quel est l'effectif du mode de cette série ?", "Trouve le mode, puis donne son effectif.", "Le mode de cette série apparaît combien de fois ?", "Donne l'effectif du mode.", "Combien de fois lit-on le mode dans cette série ?", "Quel est le plus grand effectif de cette série ?", "Compte le mode : combien de fois est-il écrit ?", "Lis cette série. Quel est l'effectif de son mode ?", "Le mode revient combien de fois ici ?"])}\n\n${enVrac(v, e)}`, ef, expliquer(DEF, "on compte chaque valeur, puis on garde le plus grand nombre de fois.", `le mode est ${j}, écrit ${ef} fois.`, `son effectif est ${ef}.`));
  }),
  tpl(2, "Il doit dépasser le plus grand effectif actuel : un de plus.", () => {
    const v = valeurs(4, 1, 20);
    const e = effectifs(4, 1, entre(3, 6));
    const candidats = v.filter((_, i) => e[i] < Math.max(...e));
    const x = un(candidats);
    const manque = Math.max(...e) - e[v.indexOf(x)] + 1;
    return court(`${un([`Combien de fois au moins faut-il ajouter ${x} pour qu'il soit le seul mode ?`, `On ajoute des ${x} à cette série. Combien au minimum pour que ${x} soit le seul mode ?`, `Pour que ${x} devienne le seul mode, combien de ${x} ajouter au minimum ?`, `Combien de ${x} manque-t-il au minimum pour que ${x} soit le seul mode ?`, `Quel est le plus petit nombre de ${x} à ajouter pour en faire le seul mode ?`, `On veut que le seul mode soit ${x}. Combien de ${x} ajouter, au moins ?`])}\n\n${enVrac(v, e)}`, manque, expliquer(DEF, "il faut dépasser le plus grand effectif actuel d'une unité.", `${x} est écrit ${e[v.indexOf(x)]} fois, le plus grand effectif est ${Math.max(...e)} : ${Math.max(...e)} + 1 − ${e[v.indexOf(x)]} = ${manque}.`, `il faut en ajouter ${manque}.`));
  }),

  tpl(3, "Le mode : la valeur de plus grand effectif du tableau.", () => {
    const C = un(CTX_NUM);
    const v = valeurs(entre(4, 6), C.min, C.max);
    const e = effectifs(v.length, 1, entre(4, 14));
    const j = leMode(v, e) as number;
    return court(`${C.t} ${C.q}`, j, expliquer(DEF, "on repère le plus grand effectif, puis on lit la valeur.", dire(v, e, j), `le mode est ${j}.`), tableau(C.e, v, e));
  }),
  tpl(3, "La plus haute barre donne le mode.", () => {
    const C = un(CTX_MOT);
    const n = entre(3, 5);
    const c = C.c.slice(0, n);
    const e = effectifs(n, 1, entre(5, 14));
    const j = leMode(c, e) as string;
    return choix(`${C.t} ${C.q}`, j, c.filter((x) => x !== j), expliquer(DEF, "la plus haute barre montre le plus grand effectif.", dire(c, e, j), `le mode est ${j}.`), baton(c, e, "barres"));
  }),
  tpl(3, "Calcule la moyenne, trouve le mode, puis compare.", () => {
    const C = un(CTX_NUM);
    let v: number[] = [];
    let e: number[] = [];
    let moy = 0;
    let j = 0;
    for (;;) {
      v = valeurs(4, C.min, C.max);
      e = effectifs(4, 1, entre(3, 6));
      const N = e.reduce((a, b) => a + b, 0);
      moy = v.reduce((s, x, i) => s + x * e[i], 0) / N;
      j = leMode(v, e) as number;
      if (Number.isInteger(moy) && moy !== j) break;
    }
    const juste = j > moy ? "Le mode" : "La moyenne";
    return choix(`${C.t} ${un(["Lequel est le plus grand : le mode ou la moyenne ?", "Compare le mode et la moyenne de cette série : lequel dépasse l'autre ?", "Qui est le plus grand ici, le mode ou la moyenne ?", "Calcule la moyenne et trouve le mode : lequel est le plus grand ?"])}`, juste, juste === "Le mode" ? ["La moyenne", "Ils sont égaux"] : ["Le mode", "Ils sont égaux"], expliquer(DEF, "la moyenne = somme des valeurs ÷ effectif total ; le mode se lit au plus grand effectif.", `la moyenne vaut ${moy} et le mode ${j}.`, `${juste.toLowerCase()} est le plus grand.`), tableau(C.e, v, e));
  }),
  tpl(3, "Cherche le mode de chaque groupe, puis compare.", () => {
    const W = un([
      { a: "Deux classes", b: "ont noté leur temps de trajet en minutes." }, { a: "Deux équipes de basket", b: "ont noté leurs paniers par match." }, { a: "Deux chorales", b: "ont noté leur nombre de chanteurs par répétition." }, { a: "Deux fermes", b: "ont compté leurs œufs par jour." },
      { a: "Deux laboratoires", b: "ont relevé le nombre d'essais par journée." }, { a: "Deux ateliers", b: "ont compté leurs pièces finies par heure." }, { a: "Deux clubs de natation", b: "ont noté leurs longueurs par séance." }, { a: "Deux bateaux", b: "ont noté leurs prises par sortie." },
      { a: "Deux orchestres", b: "ont noté leurs heures de répétition par semaine." }, { a: "Deux écoles", b: "ont noté leurs livres empruntés par élève." },
    ]);
    const va = valeurs(4, 1, 15);
    const ea = effectifs(4, 1, 4);
    const vb = valeurs(4, 1, 15);
    const eb = effectifs(4, 1, 4);
    const [ma, mb] = [leMode(va, ea) as number, leMode(vb, eb) as number];
    const juste = ma === mb ? "Les deux modes sont égaux" : ma > mb ? "Le groupe A" : "Le groupe B";
    return choix(`${W.a}, le groupe A et le groupe B, ${W.b} ${un(["Quel groupe a le plus grand mode ?", "Lequel des deux groupes a le mode le plus élevé ?", "Compare les modes : quel groupe l'emporte ?", "Quel groupe présente le mode le plus grand ?"])}\n\nGroupe A : ${enVrac(va, ea)}\n\nGroupe B : ${enVrac(vb, eb)}`, juste, ["Le groupe A", "Le groupe B", "Les deux modes sont égaux"], expliquer(DEF, "on trouve le mode de chaque série, puis on les compare.", `mode du groupe A : ${ma} ; mode du groupe B : ${mb}.`, `${juste.toLowerCase()}.`));
  }),
];
