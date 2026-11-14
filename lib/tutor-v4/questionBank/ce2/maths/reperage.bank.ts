// lib/tutor-v4/questionBank/ce2/maths/reperage.bank.ts
//
// Le repérage sur quadrillage du CE2, écrit à la main. Quatre
// micro-compétences qui passaient par le constructeur commun — celui qui
// servait « Combien de côtés a un triangle ? » à `ce1_reperage_coordonnees`.
//
// ⚠️ HORS ATTENDUS DE FIN DE CE2 — RÉVISION DU CE1.
// Relu sur le texte lui-même le 09/08/2026 (BO n° 41 du 31 octobre 2024,
// applicable à la rentrée 2025) : « Espace et géométrie » du CE2 ne contient
// que « Les solides » et « La géométrie plane ». Le sous-domaine « Le repérage
// dans l'espace » existe au CP et au CE1, et sa colonne CE2 est VIDE.
// Ces quatre micro-compétences sont donc gardées les yeux ouverts — feu vert
// de Frédéric. Rien n'y est faux : c'est un cran en amont, et un CE2 qui
// trébuche a tout intérêt à y repasser. C'est à cela que sert le coach.
// Elles servent aussi de SUPPORT à deux attendus bien CE2 : reproduire une
// figure sur quadrillage, et compléter une figure pour la rendre symétrique.
//
// CE QU'ON Y TRAVAILLE : lire et placer un point sur un quadrillage, décrire un
// déplacement, lire un plan simple.
// ⛔ Pas de repère orthonormé, pas d'abscisse ni d'ordonnée : ces mots sont de
// cycle 3. Au CE2 on dit « la colonne, puis la ligne », ou « à droite, puis en
// haut ».
//
// LE PIÈGE DE LA NOTION : l'ordre. On lit d'abord horizontalement, ENSUITE
// verticalement — et l'élève qui inverse tombe sur un autre point, souvent tout
// aussi plausible. C'est la seule chose à faire entrer : on part du coin, on
// avance d'abord vers la droite, puis on monte.
// Le second : le point de départ d'un déplacement. « Trois cases à droite » ne
// veut rien dire tout seul ; il faut savoir d'où l'on part.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type {
  CanvasFigure,
  DifficultyLevel,
  ReperageCanvasData,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import { cap, entre, etapes, LETTRES, melange, qcm, un } from "../../cm1/maths/trous-outils";

function reperage(data: Omit<ReperageCanvasData, "kind">): ReperageCanvasData {
  return {
    kind: "reperage",
    // 7 sur 7 : les défis vont jusqu'à (6 ; 5) une fois le déplacement ajouté,
    // et un point qui tombe hors du quadrillage ne se voit pas.
    grid: { rows: 7, cols: 7 },
    display: {
      showGrid: true,
      showAxes: true,
      showCoordinates: true,
      showPointLabels: true,
    },
    ...data,
  };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/* ═════════════════════════════════════════════════════════════════════════
   LES GABARITS (10/11/2026) — situations × tournures × nombres.
   ⛔ Mesuré le 10/11 : 6 à 10 squelettes par micro, 14 à 18 répétitions sur
   20 à chaque étoile. Un enfant reconnaissait la phrase. Chaque étoile servie
   a maintenant au moins deux gabarits riches.
   ⭐ Le dessin SERT et ne donne jamais la réponse : on montre le départ, pas
   le chemin ; le point cherché n'est pas dessiné, ou c'est un « ? ».
   ═════════════════════════════════════════════════════════════════════════ */

type Perso = { n: string; p: "il" | "elle" };
const PERSOS: Perso[] = [
  { n: "Nina", p: "elle" }, { n: "Téo", p: "il" }, { n: "Zoé", p: "elle" }, { n: "Ravi", p: "il" },
  { n: "Pic", p: "il" }, { n: "Lou", p: "elle" }, { n: "Malo", p: "il" },
  { n: "Inès", p: "elle" }, { n: "Sacha", p: "il" }, { n: "Amir", p: "il" }, { n: "Jade", p: "elle" },
  { n: "Naïa", p: "elle" }, { n: "Tom", p: "il" }, { n: "Lina", p: "elle" }, { n: "Yanis", p: "il" },
];

type Monde = { intro: string; titre: string; choses: string[] };
const MONDES: Monde[] = [
  { intro: "Chez les pirates", titre: "La carte des pirates", choses: ["le coffre", "le perroquet", "le bateau", "la grotte", "le palmier"] },
  { intro: "Au potager", titre: "Le potager", choses: ["la carotte", "le puits", "la brouette", "le rosier", "la citrouille"] },
  { intro: "Au zoo", titre: "Le zoo", choses: ["la girafe", "le lion", "le pingouin", "le zèbre", "l'éléphant"] },
  { intro: "À la ferme", titre: "La ferme", choses: ["la vache", "le poulailler", "le tracteur", "la mare", "le cochon"] },
  { intro: "Dans le ciel", titre: "La carte du ciel", choses: ["la fusée", "la Lune", "la comète", "le satellite", "l'étoile"] },
  { intro: "Au château", titre: "Le château", choses: ["le dragon", "la tour", "le pont-levis", "le trône", "le chevalier"] },
  { intro: "À la kermesse", titre: "La kermesse", choses: ["la buvette", "le manège", "le maquillage", "la tombola", "la chorale"] },
  { intro: "Dans l'aquarium", titre: "L'aquarium", choses: ["le poisson", "la tortue", "le crabe", "l'hippocampe", "la pieuvre"] },
  { intro: "Dans la forêt", titre: "La forêt", choses: ["le hibou", "la cabane", "le champignon", "le renard", "l'écureuil"] },
  { intro: "Dans la cour", titre: "La cour", choses: ["le toboggan", "la marelle", "le banc", "le préau", "la cabane"] },
  { intro: "Au cirque", titre: "Le cirque", choses: ["le clown", "l'éléphant", "le trapèze", "la piste", "le jongleur"] },
  { intro: "Au marché", titre: "Le marché", choses: ["la boulangère", "le fromager", "le fleuriste", "le primeur", "le boucher"] },
  { intro: "Dans la cuisine", titre: "La cuisine", choses: ["le four", "le frigo", "l'évier", "la table", "le gâteau"] },
  { intro: "Au parc des dinosaures", titre: "Le parc", choses: ["le T-rex", "le tricératops", "le diplodocus", "l'œuf géant", "le volcan"] },
  { intro: "À la caserne", titre: "La caserne", choses: ["le camion", "l'échelle", "le tuyau", "la sirène", "le casque"] },
  { intro: "À la bibliothèque", titre: "La bibliothèque", choses: ["le coin BD", "le tapis", "l'ordinateur", "le bureau", "le fauteuil"] },
  { intro: "À la piscine", titre: "La piscine", choses: ["le plongeoir", "le toboggan", "le bassin", "la douche", "le vestiaire"] },
  { intro: "À la gare", titre: "La gare", choses: ["le train", "le guichet", "l'horloge", "le quai", "le kiosque"] },
];
// ⛔ La Réunion : un contexte sur vingt-cinq environ, pas plus.
const REUNION: Monde = { intro: "Au Piton de la Fournaise", titre: "Le volcan", choses: ["le cratère", "le gîte", "le sentier", "le parking", "la cascade"] };

const monde = (): Monde => (Math.random() < 0.04 ? REUNION : un(MONDES));
const perso = () => un(PERSOS);
/** « le coffre » → « coffre » : l'étiquette du dessin. */
const court = (c: string) => c.replace(/^(le |la |l'|l’)/, "").replace(/ /g, " ");
/** « le coffre » → « du coffre », « l'évier » → « de l'évier ». */
const de = (c: string) => (c.startsWith("le ") ? `du ${c.slice(3)}` : `de ${c}`);
/** « le coffre » → « au coffre ». */
const a = (c: string) => (c.startsWith("le ") ? `au ${c.slice(3)}` : `à ${c}`);
const cases = (n: number) => `${n} case${n > 1 ? "s" : ""}`;
const pt = (x: number, y: number) => `(${x} ; ${y})`;
// ⛔ 6 au plus : sur la ligne 7, les pointes des axes couvrent le point (vu au rendu, 10/11).
const dansLaGrille = (x: number, y: number) => x >= 0 && y >= 0 && x <= 6 && y <= 6;
/** QCM de repérages : pièges dans le quadrillage, complétés par des voisins s'il en manque. */
function qcmPt(x: number, y: number, pieges: number[][]) {
  const faux: string[] = [];
  const garde = (u: number, v: number) => {
    const t = pt(u, v);
    if (dansLaGrille(u, v) && t !== pt(x, y) && !faux.includes(t)) faux.push(t);
  };
  for (const [u, v] of pieges) garde(u, v);
  for (const [u, v] of [[x + 1, y], [x, y + 1], [x - 1, y], [x, y - 1], [x + 1, y + 1]]) if (faux.length < 3) garde(u, v);
  return qcm(pt(x, y), faux);
}
/** QCM « n cases » : jamais deux fois le même nombre, toujours trois pièges. */
function qcmCases(n: number, pieges: number[]) {
  const vals = [...new Set(pieges.filter((v) => v > 0 && v !== n))];
  for (let k = 1; vals.length < 3; k++) for (const v of [n + k, n - k]) if (v > 0 && !vals.includes(v) && vals.length < 3) vals.push(v);
  return qcm(cases(n), vals.map(cases));
}
/** Deux à quatre choses DIFFÉRENTES d'un même monde. */
const plusieurs = (m: Monde, k: number) => melange([...m.choses]).slice(0, k);

type Dir = "droite" | "gauche" | "haut" | "bas";
const VERS: Record<Dir, string> = { droite: "vers la droite", gauche: "vers la gauche", haut: "vers le haut", bas: "vers le bas" };
const DX: Record<Dir, number> = { droite: 1, gauche: -1, haut: 0, bas: 0 };
const DY: Record<Dir, number> = { droite: 0, gauche: 0, haut: 1, bas: -1 };
const OPPOSE: Record<Dir, Dir> = { droite: "gauche", gauche: "droite", haut: "bas", bas: "haut" };
const FLECHE: Record<Dir, string> = { droite: "→", gauche: "←", haut: "↑", bas: "↓" };

/** Un point de départ d'où le déplacement reste dans le quadrillage. */
function depart(dx: number, dy: number) {
  const x = dx >= 0 ? entre(0, 6 - dx) : entre(-dx, 6);
  const y = dy >= 0 ? entre(0, 6 - dy) : entre(-dy, 6);
  return { x, y };
}

/** LE PLAN : un vrai tableau à cases, lettres en haut, numéros à gauche. */
function plan(titre: string, nbCol: number, nbLig: number, contenu: Record<string, string>): CanvasFigure {
  const L = ["A", "B", "C", "D", "E"].slice(0, nbCol);
  const large = Math.max(4, ...Object.values(contenu).map((v) => v.length));
  const t = {
    kind: "tableau_donnees" as const,
    title: titre,
    coin: "",
    headers: L,
    rows: Array.from({ length: nbLig }, (_, i) => ({
      label: String(i + 1),
      // Des colonnes de même largeur : une case vide ne doit pas fondre.
      values: L.map((l) => (contenu[`${l}${i + 1}`] ?? "").padEnd(large, " ")),
    })),
    display: { compact: true, striped: false },
  };
  return t;
}
const COL = ["A", "B", "C", "D", "E"];

const G = (
  n: number,
  microId: string,
  difficulty: DifficultyLevel,
  hint: string,
  generate: () => TutorGeneratedQuestionV4,
): TutorBankItemV4 => ({
  kind: "template",
  id: `${microId}_tpl_${n}`,
  niveau: "ce2",
  matiere: "maths",
  notionId: "reperage",
  microId,
  difficulty,
  theme: "neutral",
  hint,
  tags: ["ce2", "reperage", microId.replace("ce2_reperage_", ""), "template", "canvas"],
  generate,
});

/* ───────────── ce2_reperage_coordonnees ───────────── */
const CO = "ce2_reperage_coordonnees";
function xyDistincts(max = 6) {
  const x = entre(1, max);
  const y = un([1, 2, 3, 4, 5, 6].filter((v) => v !== x && v <= max));
  return { x, y };
}

const GAB_COORDONNEES: TutorBankItemV4[] = [
  // ★2 — lire le repérage d'un point dessiné.
  G(3, CO, 2, "Compte d'abord vers la droite, puis vers le haut.", () => {
    const { x, y } = xyDistincts();
    const [L, L2] = melange([...LETTRES]).slice(0, 2);
    const juste = pt(x, y);
    return {
      text: un([
        `Quel est le repérage du point ${L} ?`,
        `Lis le repérage du point ${L}.`,
        `Choisis le repérage du point ${L}.`,
        `Le point ${L} est sur le quadrillage. Quel est son repérage ?`,
        `Trouve les deux nombres du point ${L}.`,
      ]),
      ...qcmPt(x, y, [[y, x], [x + 1, y], [x, y + 1], [x - 1, y], [x, y - 1]]),
      explanation: etapes(
        "On part du coin en bas à gauche. On compte vers la droite, puis vers le haut.",
        `Le point ${L} est à ${cases(x)} vers la droite et ${cases(y)} vers le haut.`,
        `Le repérage du point ${L} est ${juste}. Attention : ${pt(y, x)} est un autre point.`,
      ),
      canvas: reperage({
        points: [
          { x, y, label: L, color: "#2563eb" },
          { x: y, y: x, label: L2, color: "#94a3b8" },
        ],
      }),
    };
  }),
  // ★2 — trouver le point qui a ce repérage.
  G(4, CO, 2, "Le premier nombre se compte vers la droite.", () => {
    const { x, y } = xyDistincts();
    const lettres = melange([...LETTRES]).slice(0, 4);
    const voisin = un([[x + 1, y], [x, y + 1], [x - 1, y], [x, y - 1]].filter(([u, v]) => dansLaGrille(u, v) && !(u === y && v === x)));
    const libres = [];
    for (let k = 0; k < 40 && libres.length < 1; k++) {
      const u = entre(0, 6), v = entre(1, 6);
      if (![`${x},${y}`, `${y},${x}`, `${voisin[0]},${voisin[1]}`].includes(`${u},${v}`)) libres.push([u, v]);
    }
    const places = melange([[x, y], [y, x], voisin, libres[0] ?? [6, 0]]);
    const iJuste = places.findIndex(([u, v]) => u === x && v === y);
    const juste = `le point ${lettres[iJuste]}`;
    return {
      text: un([
        `Quel point est en ${pt(x, y)} ?`,
        `Quel point a pour repérage ${pt(x, y)} ?`,
        `Trouve le point repéré par ${pt(x, y)}.`,
        `Un seul point est en ${pt(x, y)}. Lequel ?`,
        `Où est le point ${pt(x, y)} ? Choisis sa lettre.`,
      ]),
      ...qcm(juste, lettres.filter((_, i) => i !== iJuste).map((l) => `le point ${l}`)),
      explanation: etapes(
        `On part du coin en bas à gauche. On avance de ${cases(x)} vers la droite, puis on monte de ${cases(y)}.`,
        `On arrive sur ${juste}. Le point en ${pt(y, x)} est un piège : ses deux nombres sont inversés.`,
        `C'est ${juste}.`,
      ),
      canvas: reperage({
        points: places.map(([u, v], i) => ({ x: u, y: v, label: lettres[i], color: "#2563eb" })),
      }),
    };
  }),
];

const GAB_COORDONNEES_3_4: TutorBankItemV4[] = [
  // ★3 — lire le repérage d'une chose, dans un monde.
  G(1, CO, 3, "Compte d'abord vers la droite, puis vers le haut.", () => {
    const m = monde();
    const P = perso();
    const [c, c2] = plusieurs(m, 2);
    const { x, y } = xyDistincts();
    const juste = pt(x, y);
    return {
      text: `${m.intro}, ${P.n} cherche ${c}. ${un([
        `Quel est le repérage ${de(c)} ?`,
        `Aide ${P.n} : quel est le repérage ${de(c)} ?`,
        `Quels sont les deux nombres ${de(c)} ?`,
      ])}`,
      ...qcmPt(x, y, [[y, x], [x + 1, y], [x, y + 1], [x - 1, y], [x, y - 1]]),
      explanation: etapes(
        "On part du coin en bas à gauche : on compte vers la droite, puis vers le haut.",
        `${cap(c)} est à ${cases(x)} vers la droite et ${cases(y)} vers le haut.`,
        `C'est ${juste}. ${cap(c2)}, lui, est en ${pt(y, x)} : les nombres inversés mènent ailleurs.`,
      ),
      canvas: reperage({
        points: [
          { x, y, label: court(c), color: "#2563eb" },
          { x: y, y: x, label: court(c2), color: "#f59e0b" },
        ],
      }),
    };
  }),
  // ★3 — que veut dire chaque nombre ?
  G(2, CO, 3, "Le premier nombre est celui de la droite, le second celui du haut.", () => {
    const m = monde();
    const P = perso();
    const c = un(m.choses);
    const { x, y } = xyDistincts();
    const droite = Math.random() < 0.5;
    const n = droite ? x : y;
    const autre = droite ? y : x;
    return {
      text: `${m.intro}, ${P.n} place ${c} en ${pt(x, y)}. ${un(
        droite
          ? [`De combien de cases avance-t-${P.p} vers la droite ?`, `Combien de cases compte-t-${P.p} vers la droite ?`, `Combien de cases vers la droite ?`]
          : [`De combien de cases monte-t-${P.p} ?`, `Combien de cases compte-t-${P.p} vers le haut ?`, `Combien de cases vers le haut ?`],
      )}`,
      ...qcmCases(n, [autre, n + 1, n - 1, x + y]),
      explanation: etapes(
        "Dans un repérage, le premier nombre compte les cases vers la droite, le second les cases vers le haut.",
        `Dans ${pt(x, y)}, ${droite ? `le premier nombre est ${x}` : `le second nombre est ${y}`}.`,
        `${cap(cases(n))} ${droite ? "vers la droite" : "vers le haut"}.`,
      ),
      canvas: reperage({ points: [{ x, y, label: court(c), color: "#2563eb" }] }),
    };
  }),
  // ★4 — placer une chose à côté d'une autre.
  G(5, CO, 4, "Aller à droite change le premier nombre ; monter change le second.", () => {
    const m = monde();
    const P = perso();
    const [c1, c2] = plusieurs(m, 2);
    const d = un<Dir>(["droite", "gauche", "haut", "bas"]);
    const k = entre(1, 3);
    const { x, y } = depart(DX[d] * k, DY[d] * k);
    const x2 = x + DX[d] * k, y2 = y + DY[d] * k;
    const ou = { droite: "à droite", gauche: "à gauche", haut: "au-dessus", bas: "en dessous" }[d];
    const o = OPPOSE[d];
    return {
      text: `${cap(c1)} est en ${pt(x, y)}. ${P.n} pose ${c2} ${cases(k)} ${ou}. ${un([
        "Quel est son repérage ?",
        `Où est ${c2} ?`,
        `Quel repérage doit-${P.p} écrire ?`,
      ])}`,
      ...qcmPt(x2, y2, [
        [x + DX[o] * k, y + DY[o] * k],
        [x + DY[d] * k, y + DX[d] * k],
        [y2, x2],
        [x + DX[d] * (k + 1), y + DY[d] * (k + 1)],
        [x2 + 1, y2 + 1],
      ]),
      explanation: etapes(
        "Aller à droite ou à gauche change le PREMIER nombre ; monter ou descendre change le SECOND.",
        `${cap(c1)} est en ${pt(x, y)}. ${cap(ou)}, de ${cases(k)} : ${DX[d] ? `${x} ${DX[d] > 0 ? "+" : "-"} ${k} = ${x2}` : `${y} ${DY[d] > 0 ? "+" : "-"} ${k} = ${y2}`}.`,
        `${cap(c2)} est en ${pt(x2, y2)}.`,
      ),
      canvas: reperage({ points: [{ x, y, label: court(c1), color: "#2563eb" }] }),
    };
  }),
  // ★4 — vérifier ce que dit un camarade.
  G(6, CO, 4, "Relis le point : d'abord la droite, ensuite le haut.", () => {
    const m = monde();
    const P = perso();
    const c = un(m.choses);
    const { x, y } = xyDistincts(5);
    const cas = un(["juste", "inverse", "premier", "second"] as const);
    const dit =
      cas === "juste" ? pt(x, y) : cas === "inverse" ? pt(y, x) : cas === "premier" ? pt(x + 1, y) : pt(x, y + 1);
    const R = {
      juste: "oui, c'est juste",
      inverse: "non, les deux nombres sont inversés",
      premier: "non, le premier nombre est faux",
      second: "non, le second nombre est faux",
    };
    return {
      text: `${m.intro}, ${P.n} dit : « ${cap(c)} est en ${dit}. » ${un([`A-t-${P.p} raison ?`, `Est-ce juste ?`, `Que penses-tu de sa réponse ?`])}`,
      ...qcm(R[cas], Object.values(R)),
      explanation: etapes(
        "On relit le point sur le dessin : d'abord les cases vers la droite, ensuite les cases vers le haut.",
        `${cap(c)} est en ${pt(x, y)}. ${P.n} a dit ${dit}.`,
        `${cap(R[cas])}.`,
      ),
      canvas: reperage({ points: [{ x, y, label: court(c), color: "#2563eb" }] }),
    };
  }),
];

/* ───────────── ce2_reperage_deplacement ───────────── */
const DE = "ce2_reperage_deplacement";
const BOUGER: Record<Dir, string[]> = {
  droite: ["avance de # à droite", "va de # à droite"],
  gauche: ["se décale de # à gauche", "va de # à gauche"],
  haut: ["monte de #", "va de # vers le haut"],
  bas: ["descend de #", "va de # vers le bas"],
};
const bouge = (d: Dir, k: number) => un(BOUGER[d]).replace("#", cases(k));
/** Un déplacement en liste courte : « 4 cases à gauche », puis « 1 en bas ». */
const OU: Record<Dir, string> = { droite: "à droite", gauche: "à gauche", haut: "en haut", bas: "en bas" };
const mv = (d: Dir, k: number, premier = false) => `${premier ? cases(k) : k} ${OU[d]}`;

const GAB_DEPLACEMENT: TutorBankItemV4[] = [
  // ★2 — un seul déplacement.
  G(3, DE, 2, "Droite et gauche changent le premier nombre ; haut et bas, le second.", () => {
    const d = un<Dir>(["droite", "gauche", "haut", "bas"]);
    const k = entre(1, 4);
    const { x, y } = depart(DX[d] * k, DY[d] * k);
    const x2 = x + DX[d] * k, y2 = y + DY[d] * k;
    const L = un(LETTRES);
    const o = OPPOSE[d];
    return {
      text: `${un(["Le robot", "Le pion", "Le jeton"])} part du point ${L} ${pt(x, y)}. Il ${bouge(d, k)}. ${un(["Où arrive-t-il ?", "Où s'arrête-t-il ?"])}`,
      ...qcmPt(x2, y2, [
        [x + DX[o] * k, y + DY[o] * k],
        [x + DY[d] * k, y + DX[d] * k],
        [x + DX[d] * (k + 1), y + DY[d] * (k + 1)],
        [DX[d] ? k : x, DY[d] ? k : y],
        [y2, x2],
      ]),
      explanation: etapes(
        "Droite et gauche changent le premier nombre ; haut et bas changent le second.",
        DX[d] ? `${x} ${DX[d] > 0 ? "+" : "-"} ${k} = ${x2}. Le second nombre ne bouge pas.` : `${y} ${DY[d] > 0 ? "+" : "-"} ${k} = ${y2}. Le premier nombre ne bouge pas.`,
        `Il arrive en ${pt(x2, y2)}.`,
      ),
      canvas: reperage({ points: [{ x, y, label: L, color: "#2563eb" }] }),
    };
  }),
  // ★2 — quel déplacement d'un point à l'autre ?
  G(4, DE, 2, "Compte les cases entre les deux points.", () => {
    const d = un<Dir>(["droite", "gauche", "haut", "bas"]);
    const k = entre(2, 5);
    const { x, y } = depart(DX[d] * k, DY[d] * k);
    const x2 = x + DX[d] * k, y2 = y + DY[d] * k;
    const [L1, L2] = melange([...LETTRES]).slice(0, 2);
    const perp: Dir = DX[d] ? un<Dir>(["haut", "bas"]) : un<Dir>(["droite", "gauche"]);
    return {
      text: un([
        `Quel déplacement mène du point ${L1} au point ${L2} ?`,
        `Pour aller de ${L1} à ${L2}, que faut-il faire ?`,
        `Le pion va de ${L1} à ${L2}. Quel est son déplacement ?`,
      ]),
      ...qcm(`${cases(k)} ${VERS[d]}`, [
        `${cases(k)} ${VERS[OPPOSE[d]]}`,
        `${cases(k + 1)} ${VERS[d]}`,
        `${cases(k - 1)} ${VERS[d]}`,
        `${cases(k)} ${VERS[perp]}`,
      ]),
      explanation: etapes(
        `On part de ${L1} et on regarde où est ${L2}.`,
        `${L2} est ${VERS[d].replace("vers ", "")} de ${L1}. On compte les cases : ${k}.`,
        `${cap(cases(k))} ${VERS[d]}.`,
      ),
      canvas: reperage({
        points: [
          { x, y, label: L1, color: "#2563eb" },
          { x: x2, y: y2, label: L2, color: "#f59e0b" },
        ],
      }),
    };
  }),
  // ★3 — deux déplacements, dans un monde.
  G(1, DE, 3, "Traite d'abord la droite ou la gauche, puis le haut ou le bas.", () => {
    const m = monde();
    const P = perso();
    const c = un(m.choses);
    const h = un<Dir>(["droite", "gauche"]);
    const v = un<Dir>(["haut", "bas"]);
    const kx = entre(1, 3), ky = entre(1, 3);
    const dx = DX[h] * kx, dy = DY[v] * ky;
    const { x, y } = depart(dx, dy);
    const x2 = x + dx, y2 = y + dy;
    return {
      text: `${P.n} part ${de(c)} ${pt(x, y)} : ${mv(h, kx, true)}, puis ${mv(v, ky)}. ${un([`Où arrive-t-${P.p} ?`, `Où s'arrête-t-${P.p} ?`])}`,
      ...qcmPt(x2, y2, [
        [x - dx, y2],
        [x2, y - dy],
        [kx, ky],
        [y2, x2],
        [x2 + 1, y2],
      ]),
      explanation: etapes(
        "On ajoute ou on retire, direction par direction.",
        `Premier nombre : ${x} ${dx > 0 ? "+" : "-"} ${kx} = ${x2}. Second nombre : ${y} ${dy > 0 ? "+" : "-"} ${ky} = ${y2}.`,
        `${cap(P.p)} arrive en ${pt(x2, y2)}.`,
      ),
      canvas: reperage({ points: [{ x, y, label: court(c), color: "#2563eb" }] }),
    };
  }),
  // ★3 — quel chemin d'une chose à l'autre ?
  G(5, DE, 3, "Compte d'abord les cases sur le côté, puis vers le haut ou le bas.", () => {
    const m = monde();
    const P = perso();
    const [c1, c2] = plusieurs(m, 2);
    const h = un<Dir>(["droite", "gauche"]);
    const v = un<Dir>(["haut", "bas"]);
    const kx = entre(1, 4);
    const ky = un([1, 2, 3, 4].filter((n) => n !== kx));
    const { x, y } = depart(DX[h] * kx, DY[v] * ky);
    const x2 = x + DX[h] * kx, y2 = y + DY[v] * ky;
    const chemin = (a1: number, d1: Dir, a2: number, d2: Dir) => `${cases(a1)} ${VERS[d1]}, puis ${cases(a2)} ${VERS[d2]}`;
    return {
      text: `${m.intro}, ${P.n} va ${de(c1)} ${a(c2)}. ${un(["Quel chemin doit-" + P.p + " suivre ?", "Quel déplacement choisir ?", "Comment y aller ?"])}`,
      ...qcm(chemin(kx, h, ky, v), [
        chemin(ky, h, kx, v),
        chemin(kx, OPPOSE[h], ky, v),
        chemin(kx, h, ky, OPPOSE[v]),
        chemin(kx + 1, h, ky, v),
      ]),
      explanation: etapes(
        "On compte les cases sur le côté, puis vers le haut ou le bas.",
        `De ${court(c1)} à ${court(c2)} : ${cases(kx)} ${VERS[h]} et ${cases(ky)} ${VERS[v]}.`,
        `${cap(chemin(kx, h, ky, v))}.`,
      ),
      canvas: reperage({
        points: [
          { x, y, label: court(c1), color: "#2563eb" },
          { x: x2, y: y2, label: court(c2), color: "#f59e0b" },
        ],
      }),
    };
  }),
  // ★4 — retrouver le déplacement à partir de deux repérages.
  G(2, DE, 4, "Compare les nombres du départ et de l'arrivée.", () => {
    const m = monde();
    const P = perso();
    const [c1, c2] = plusieurs(m, 2);
    const h = un<Dir>(["droite", "gauche"]);
    const v = un<Dir>(["haut", "bas"]);
    const kx = entre(1, 4), ky = entre(1, 4);
    const { x, y } = depart(DX[h] * kx, DY[v] * ky);
    const x2 = x + DX[h] * kx, y2 = y + DY[v] * ky;
    const surX = Math.random() < 0.5;
    const n = surX ? kx : ky;
    const d = surX ? h : v;
    return {
      text: `${P.n} va ${de(c1)} ${pt(x, y)} ${a(c2)} ${pt(x2, y2)}. ${un([
        `Combien de cases ${VERS[d]} ?`,
        `Combien de cases fait-${P.p} ${VERS[d]} ?`,
      ])}`,
      ...qcmCases(n, [n + 1, n - 1, surX ? x2 : y2, surX ? ky : kx]),
      explanation: etapes(
        surX ? "Sur le côté, on compare les premiers nombres." : "En hauteur, on compare les seconds nombres.",
        surX ? `De ${x} à ${x2} : ${cases(kx)}.` : `De ${y} à ${y2} : ${cases(ky)}.`,
        `${cap(P.p)} va de ${cases(n)} ${VERS[d]}.`,
      ),
      canvas: reperage({
        points: [
          { x, y, label: court(c1), color: "#2563eb" },
          { x: x2, y: y2, label: court(c2), color: "#f59e0b" },
        ],
      }),
    };
  }),
  // ★4 — trois déplacements, dont un retour.
  G(6, DE, 4, "Droite puis gauche : fais la différence.", () => {
    const m = monde();
    const P = perso();
    const c = un(m.choses);
    const h = un<Dir>(["droite", "gauche"]);
    const v = un<Dir>(["haut", "bas"]);
    const k1 = entre(3, 5), k2 = entre(1, 3), k3 = entre(1, k1 - 1);
    const fx = DX[h] * (k1 - k3), fy = DY[v] * k2;
    const { x, y } = depart(DX[h] * k1, fy);
    const x2 = x + fx, y2 = y + fy;
    return {
      text: `${P.n} part ${de(c)} : ${mv(h, k1, true)}, ${mv(v, k2)}, puis ${mv(OPPOSE[h], k3)}. ${un([`Où arrive-t-${P.p} ?`, `Où s'arrête-t-${P.p} ?`])}`,
      ...qcmPt(x2, y2, [
        [x + DX[h] * (k1 + k3), y2],
        [x + DX[h] * k1, y2],
        [x2, y - fy],
        [y2, x2],
        [x2 + 1, y2],
      ]),
      explanation: etapes(
        "Deux déplacements opposés se retirent l'un de l'autre.",
        `Sur le côté : ${k1} ${VERS[h]} puis ${k3} ${VERS[OPPOSE[h]]}, il reste ${k1 - k3}. Premier nombre : ${x2}. Second nombre : ${y} ${fy > 0 ? "+" : "-"} ${k2} = ${y2}.`,
        `${cap(P.p)} arrive en ${pt(x2, y2)}.`,
      ),
      canvas: reperage({ points: [{ x, y, label: court(c), color: "#2563eb" }] }),
    };
  }),
];

/* ───────────── ce2_reperage_plan ───────────── */
const PL = "ce2_reperage_plan";
/** Des cases différentes d'un plan nbCol × nbLig. */
function casesDuPlan(k: number, nbCol = 4, nbLig = 4) {
  const toutes: string[] = [];
  for (const l of COL.slice(0, nbCol)) for (let i = 1; i <= nbLig; i++) toutes.push(`${l}${i}`);
  return melange(toutes).slice(0, k);
}
const voisinesDe = (c: string) => {
  const l = COL.indexOf(c[0]), n = Number(c.slice(1));
  return [`${COL[l + 1] ?? COL[l - 1]}${n}`, `${c[0]}${n + 1 > 4 ? n - 1 : n + 1}`, `${COL[l - 1] ?? COL[l + 2]}${n}`, `${c[0]}${n - 1 < 1 ? n + 2 : n - 1}`];
};

const GAB_PLAN: TutorBankItemV4[] = [
  // ★2 — dans quelle case ?
  G(3, PL, 2, "La lettre est en haut, le numéro sur le côté.", () => {
    const m = monde();
    const ch = plusieurs(m, 4);
    const cs = casesDuPlan(4);
    const contenu: Record<string, string> = {};
    ch.forEach((c, i) => (contenu[cs[i]] = court(c)));
    const juste = cs[0];
    return {
      text: `${cap(ch[0])} est sur le plan. ${un(["Dans quelle case ?", "Quelle est sa case ?", "Trouve sa case.", "Dans quelle case faut-il regarder ?"])}`,
      ...qcm(juste, [...voisinesDe(juste), ...cs.slice(1)]),
      explanation: etapes(
        "On lit la lettre de la colonne en haut, puis le numéro de la ligne à gauche.",
        `${cap(ch[0])} est dans la colonne ${juste[0]} et la ligne ${juste.slice(1)}.`,
        `C'est la case ${juste}.`,
      ),
      canvas: plan(m.titre, 4, 4, contenu),
    };
  }),
  // ★2 — qu'y a-t-il dans cette case ?
  G(4, PL, 2, "Descends dans la colonne de la lettre jusqu'à la ligne du numéro.", () => {
    const m = monde();
    const ch = plusieurs(m, 4);
    const cs = casesDuPlan(4);
    const contenu: Record<string, string> = {};
    ch.forEach((c, i) => (contenu[cs[i]] = court(c)));
    return {
      text: un([`Qu'y a-t-il dans la case ${cs[0]} ?`, `Que trouve-t-on en case ${cs[0]} ?`, `Regarde la case ${cs[0]}. Qu'y a-t-il ?`]),
      ...qcm(ch[0], ch.slice(1)),
      explanation: etapes(
        `On cherche la colonne ${cs[0][0]} en haut, puis la ligne ${cs[0].slice(1)} à gauche.`,
        `À leur croisement, on trouve ${ch[0]}.`,
        `Dans la case ${cs[0]}, il y a ${ch[0]}.`,
      ),
      canvas: plan(m.titre, 4, 4, contenu),
    };
  }),
  // ★3 — la lettre, c'est la colonne ; le numéro, la ligne.
  G(1, PL, 3, "La lettre donne la colonne, le nombre donne la ligne.", () => {
    const m = monde();
    const P = perso();
    const ch = plusieurs(m, 3);
    const cs = casesDuPlan(3, 4, 4);
    const contenu: Record<string, string> = { [cs[1]]: court(ch[1]), [cs[2]]: court(ch[2]) };
    const c = cs[0];
    const quoi = un(["colonne", "ligne"] as const);
    const juste = quoi === "colonne" ? `la colonne ${c[0]}` : `la ligne ${c.slice(1)}`;
    const l = COL.indexOf(c[0]);
    const n = Number(c.slice(1));
    return {
      text: `${m.intro}, ${P.n} cherche ${ch[0]}, en case ${c}. ${un([`Dans quelle ${quoi} doit-${P.p} chercher ?`, `Quelle ${quoi} doit-${P.p} regarder ?`, `Dans quelle ${quoi} est ${ch[0]} ?`])}`,
      ...qcm(
        juste,
        quoi === "colonne"
          ? [`la colonne ${COL[(l + 1) % 4]}`, `la colonne ${n}`, `la colonne ${COL[(l + 3) % 4]}`, `la colonne ${COL[(l + 2) % 4]}`]
          : [`la ligne ${(n % 4) + 1}`, `la ligne ${c[0]}`, `la ligne ${((n + 2) % 4) + 1}`, `la ligne ${((n + 1) % 4) + 1}`],
      ),
      explanation: etapes(
        "Sur un plan, la lettre désigne la colonne et le nombre désigne la ligne.",
        `Dans ${c}, la lettre ${c[0]} donne la colonne et le nombre ${c.slice(1)} donne la ligne.`,
        `C'est ${juste}.`,
      ),
      canvas: plan(m.titre, 4, 4, contenu),
    };
  }),
  // ★3 — ce qu'il y a juste à côté.
  G(5, PL, 3, "Sur le plan, la ligne 1 est en haut.", () => {
    const m = monde();
    const P = perso();
    const ch = plusieurs(m, 5);
    const centre = `${un(["B", "C"])}${un([2, 3])}`;
    const l = COL.indexOf(centre[0]), n = Number(centre.slice(1));
    const autour = { droite: `${COL[l + 1]}${n}`, gauche: `${COL[l - 1]}${n}`, haut: `${centre[0]}${n - 1}`, bas: `${centre[0]}${n + 1}` };
    const dirs = melange(["droite", "gauche", "haut", "bas"] as Dir[]);
    const contenu: Record<string, string> = { [centre]: court(ch[0]) };
    dirs.forEach((d, i) => (contenu[autour[d]] = court(ch[i + 1])));
    const d = dirs[0];
    const mot = { droite: "juste à droite", gauche: "juste à gauche", haut: "juste au-dessus", bas: "juste en dessous" }[d];
    return {
      text: `${m.intro}, ${P.n} est dans la case ${de(ch[0])}. ${un([`Qu'y a-t-il ${mot} ?`, `Que voit-${P.p} ${mot} ?`, `Qu'est-ce qui est ${mot} ?`])}`,
      ...qcm(ch[1], ch.slice(2)),
      explanation: etapes(
        "Sur le plan, on regarde la case voisine dans la bonne direction.",
        `${cap(ch[0])} est en ${centre}. ${cap(mot)}, c'est la case ${autour[d]}.`,
        `${cap(mot)}, il y a ${ch[1]}.`,
      ),
      canvas: plan(m.titre, 4, 4, contenu),
    };
  }),
  // ★4 — deux cases : même ligne, même colonne, ou ni l'une ni l'autre ?
  G(2, PL, 4, "Compare les lettres entre elles, puis les nombres entre eux.", () => {
    const m = monde();
    const [c1, c2] = plusieurs(m, 2);
    const l = entre(0, 2), n = entre(1, 3);
    const cas = un(["ligne", "colonne", "aucune"] as const);
    const k1 = `${COL[l]}${n}`;
    const k2 =
      cas === "ligne" ? `${COL[l + 1]}${n}` : cas === "colonne" ? `${COL[l]}${n === 5 ? 1 : n + 1}` : `${COL[l + 1]}${n === 5 ? 1 : n + 1}`;
    const R = {
      ligne: "elles sont sur la même ligne",
      colonne: "elles sont dans la même colonne",
      aucune: "ni la même ligne, ni la même colonne",
    };
    return {
      text: `${m.intro}, ${c1} est en ${k1} et ${c2} en ${k2}. ${un(["Que remarques-tu ?", "Comment sont-elles placées ?"])}`,
      ...qcm(R[cas], [...Object.values(R), "elles sont dans la même case"]),
      explanation: etapes(
        "Même nombre : même ligne. Même lettre : même colonne.",
        `${k1} et ${k2} : ${k1[0] === k2[0] ? "même lettre" : "lettres différentes"}, ${k1.slice(1) === k2.slice(1) ? "même nombre" : "nombres différents"}.`,
        `${cap(R[cas])}.`,
      ),
      canvas: plan(m.titre, 4, 4, {}),
    };
  }),
  // ★4 — combien de cases d'une chose à l'autre ?
  G(6, PL, 4, "Compte les cases en passant de l'une à l'autre.", () => {
    const m = monde();
    const P = perso();
    const [c1, c2, c3] = plusieurs(m, 3);
    const enLigne = Math.random() < 0.5;
    const fixe = enLigne ? `${entre(1, 4)}` : COL[entre(0, 3)];
    const [i1, i2] = melange([0, 1, 2, 3]).slice(0, 2);
    const k = Math.abs(i1 - i2);
    const case1 = enLigne ? `${COL[i1]}${fixe}` : `${fixe}${i1 + 1}`;
    const case2 = enLigne ? `${COL[i2]}${fixe}` : `${fixe}${i2 + 1}`;
    const autre = casesDuPlan(10, 4, 4).find((c) => c !== case1 && c !== case2)!;
    const vers = enLigne ? (i2 > i1 ? "vers la droite" : "vers la gauche") : i2 > i1 ? "vers le bas" : "vers le haut";
    return {
      text: `${m.intro}, ${P.n} va ${de(c1)} ${a(c2)}, ${vers}. ${un([`De combien de cases avance-t-${P.p} ?`, `Combien de cases traverse-t-${P.p} ?`])}`,
      ...qcmCases(k, [k + 1, k - 1, i2 + 1, k + 2]),
      explanation: etapes(
        `On part de la case ${case1} et on compte les cases jusqu'à ${case2}.`,
        enLigne ? `De la colonne ${COL[i1]} à la colonne ${COL[i2]} : ${cases(k)}.` : `De la ligne ${i1 + 1} à la ligne ${i2 + 1} : ${cases(k)}.`,
        `${cap(P.p)} avance de ${cases(k)}.`,
      ),
      canvas: plan(m.titre, 4, 4, { [case1]: court(c1), [case2]: court(c2), [autre]: court(c3) }),
    };
  }),
];

/* ───────────── ce2_reperage_defi ───────────── */
const DF = "ce2_reperage_defi";
const GAB_DEFI: TutorBankItemV4[] = [
  // ★5 — le chemin entre deux repérages.
  G(1, DF, 5, "Le déplacement, c'est l'écart entre le départ et l'arrivée.", () => {
    const m = monde();
    const P = perso();
    const [c1, c2] = plusieurs(m, 2);
    const h = un<Dir>(["droite", "gauche"]);
    const v = un<Dir>(["haut", "bas"]);
    const kx = entre(2, 4);
    const ky = un([1, 2, 3].filter((n) => n !== kx));
    const { x, y } = depart(DX[h] * kx, DY[v] * ky);
    const x2 = x + DX[h] * kx, y2 = y + DY[v] * ky;
    const chemin = (a1: number, d1: Dir, a2: number, d2: Dir) => `${cases(a1)} ${VERS[d1]}, puis ${cases(a2)} ${VERS[d2]}`;
    return {
      text: `${P.n} part ${de(c1)} ${pt(x, y)} et veut aller ${a(c2)} ${pt(x2, y2)}. Quel déplacement choisir ?`,
      ...qcm(chemin(kx, h, ky, v), [
        chemin(x2 || 1, h, y2 || 1, v),
        chemin(ky, h, kx, v),
        chemin(kx, OPPOSE[h], ky, v),
        chemin(kx, h, ky, OPPOSE[v]),
        chemin(kx + 1, h, ky, v),
      ]),
      explanation: etapes(
        "On compare le départ et l'arrivée, nombre par nombre.",
        `Premier nombre : de ${x} à ${x2}, ${cases(kx)} ${VERS[h]}. Second nombre : de ${y} à ${y2}, ${cases(ky)} ${VERS[v]}.`,
        `${cap(chemin(kx, h, ky, v))}. Recopier ${pt(x2, y2)} serait oublier d'où l'on part.`,
      ),
      canvas: reperage({
        points: [
          { x, y, label: court(c1), color: "#2563eb" },
          { x: x2, y: y2, label: court(c2), color: "#f59e0b" },
        ],
      }),
    };
  }),
  // ★5 — un détour qui s'annule.
  G(2, DF, 5, "Deux déplacements opposés s'annulent.", () => {
    const m = monde();
    const P = perso();
    const c = un(m.choses);
    const h = un<Dir>(["droite", "gauche"]);
    const v = un<Dir>(["haut", "bas"]);
    const kx = entre(1, 3), kv = entre(1, 2);
    const { x, y } = depart(DX[h] * kx, DY[v] * kv);
    const x2 = x + DX[h] * kx;
    return {
      text: `${P.n} part ${de(c)} : ${mv(h, kx, true)}, ${mv(v, kv)}, puis ${mv(OPPOSE[v], kv)}. ${un([`Où arrive-t-${P.p} ?`, `Où s'arrête-t-${P.p} ?`])}`,
      ...qcmPt(x2, y, [
        [x2, y + DY[v] * kv],
        [x2, y + DY[v] * 2 * kv],
        [x, y],
        [y, x2],
        [x2 + 1, y],
      ]),
      explanation: etapes(
        "Monter puis redescendre du même nombre de cases, cela s'annule.",
        `Premier nombre : ${x} ${DX[h] > 0 ? "+" : "-"} ${kx} = ${x2}. Second nombre : il revient à ${y}.`,
        `${cap(P.p)} arrive en ${pt(x2, y)}.`,
      ),
      canvas: reperage({ points: [{ x, y, label: court(c), color: "#2563eb" }] }),
    };
  }),
  // ★5 — un code de flèches, et quatre points possibles.
  G(3, DF, 5, "Suis les flèches une à une, en comptant sur le quadrillage.", () => {
    const m = monde();
    const P = perso();
    const c = un(m.choses);
    for (let essai = 0; essai < 50; essai++) {
      const h = un<Dir>(["droite", "gauche"]);
      const v = un<Dir>(["haut", "bas"]);
      const a1 = entre(2, 4), b = entre(1, 3), r = entre(1, a1 - 1);
      const fleches = [...Array(a1).fill(FLECHE[h]), ...Array(b).fill(FLECHE[v]), ...Array(r).fill(FLECHE[OPPOSE[h]])];
      const { x, y } = depart(DX[h] * a1, DY[v] * b);
      const juste: [number, number] = [x + DX[h] * (a1 - r), y + DY[v] * b];
      const faux: Array<[number, number]> = [
        [x + DX[h] * a1, y + DY[v] * b],
        [x + DX[h] * (a1 + r), y + DY[v] * b],
        [x + DX[h] * (a1 - r), y - DY[v] * b],
        [x + DX[h] * (a1 - r), y + DY[v] * (b + 1)],
      ];
      const vus = new Set([`${x},${y}`, `${juste[0]},${juste[1]}`]);
      const choisis = faux.filter(([u, w]) => dansLaGrille(u, w) && !vus.has(`${u},${w}`) && (vus.add(`${u},${w}`), true)).slice(0, 3);
      if (choisis.length < 3) continue;
      const places = melange([juste, ...choisis]);
      const lettres = ["A", "B", "C", "D"];
      const iJ = places.indexOf(juste);
      return {
        text: `${m.intro}, ${P.n} part ${de(c)} et suit ce code : ${fleches.join(" ")}. ${un([`Sur quel point arrive-t-${P.p} ?`, "Quel point atteint-on ?", `Où s'arrête-t-${P.p} ?`])}`,
        ...qcm(`le point ${lettres[iJ]}`, lettres.filter((_, i) => i !== iJ).map((l) => `le point ${l}`)),
        explanation: etapes(
          "Chaque flèche fait avancer d'une case dans sa direction.",
          `${a1} ${FLECHE[h]}, ${b} ${FLECHE[v]}, puis ${r} ${FLECHE[OPPOSE[h]]} : sur le côté il reste ${a1 - r} ${FLECHE[h]}.`,
          `${cap(P.p)} arrive sur le point ${lettres[iJ]}.`,
        ),
        canvas: reperage({
          points: [
            { x, y, label: court(c), color: "#2563eb" },
            ...places.map(([u, w], i) => ({ x: u, y: w, label: lettres[i], color: "#f59e0b" })),
          ],
        }),
      };
    }
    throw new Error("ce2_reperage_defi_tpl_3 : aucun tirage");
  }),
];

const FIGES: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "ce2_reperage_coordonnees_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "Pour repérer un point sur un quadrillage, dans quel ordre lit-on les deux nombres ?",
    format: "qcm",
    choices: [
      "d'abord horizontalement, ensuite verticalement",
      "d'abord verticalement, ensuite horizontalement",
      "le plus grand des deux d'abord",
      "peu importe l'ordre",
    ],
    expected: ["d'abord horizontalement, ensuite verticalement"],
    comparator: "mcq_exact",
    hint: "On avance d'abord, on monte ensuite — comme quand on marche puis qu'on grimpe.",
    explanation: exp(
      "Un point du quadrillage se repère par deux nombres, toujours donnés dans le même ordre.",
      "On part du coin en bas à gauche, on avance vers la droite, puis on monte.",
      "Le premier nombre dit de combien on avance vers la droite, le second de combien on monte. Inverser les deux mène à un autre point du quadrillage.",
      "D'abord horizontalement, ensuite verticalement.",
    ),
    tags: ["ce2", "reperage", "coordonnees", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_reperage_coordonnees_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_coordonnees",
    difficulty: 4,
    theme: "neutral",
    text: "Pour placer A (4 ; 2), un élève va 2 à droite, puis monte de 4. A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, il a inversé les deux nombres",
      "oui",
      "non, il fallait descendre",
      "oui, l'ordre ne compte pas",
    ],
    expected: ["non, il a inversé les deux nombres"],
    comparator: "mcq_exact",
    hint: "Le premier nombre dit toujours de combien on avance vers la droite.",
    explanation: exp(
      "Les deux nombres d'un point ne sont pas interchangeables : le premier va vers la droite, le second vers le haut.",
      "On relit le repérage dans l'ordre : 4 d'abord, 2 ensuite.",
      "Pour (4 ; 2), il faut avancer de 4 vers la droite puis monter de 2. L'élève a placé le point (2 ; 4), qui existe aussi sur le quadrillage — mais ce n'est pas le même.",
      "Non, il a inversé les deux nombres.",
    ),
    tags: ["ce2", "reperage", "coordonnees", "piege", "qcm", "canvas"],
    canvas: reperage({
      points: [
        { x: 4, y: 2, label: "A", color: "#2563eb" },
        { x: 2, y: 4, label: "B", color: "#ef4444" },
      ],
    }),
  },
  {
    kind: "fixed",
    id: "ce2_reperage_coordonnees_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "Quel point est repéré par (0 ; 0) ?",
    format: "qcm",
    choices: [
      "le coin de départ, en bas à gauche",
      "le coin en haut à droite",
      "le milieu du quadrillage",
      "il n'existe pas",
    ],
    expected: ["le coin de départ, en bas à gauche"],
    comparator: "mcq_exact",
    hint: "Zéro à droite et zéro vers le haut : on n'a pas bougé.",
    explanation: exp(
      "Le point (0 ; 0) est celui d'où l'on part avant tout déplacement.",
      "On lit les deux nombres : zéro vers la droite, zéro vers le haut.",
      "On n'avance pas, on ne monte pas : on reste au coin de départ, en bas à gauche du quadrillage.",
      "C'est le coin en bas à gauche.",
    ),
    tags: ["ce2", "reperage", "coordonnees", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_reperage_deplacement_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_deplacement",
    difficulty: 2,
    theme: "neutral",
    text: "Pour décrire un déplacement sur un quadrillage, que faut-il donner en plus des directions ?",
    format: "qcm",
    choices: [
      "le point de départ",
      "la couleur du chemin",
      "le nombre de cases du quadrillage",
      "rien de plus",
    ],
    expected: ["le point de départ"],
    comparator: "mcq_exact",
    hint: "« Trois cases à droite », mais à partir d'où ?",
    explanation: exp(
      "Un déplacement se décrit par un point de départ, puis par des directions et des nombres de cases.",
      "On commence toujours par dire d'où l'on part.",
      "« Trois cases vers la droite » ne mène nulle part si l'on ne sait pas où l'on est. Le même déplacement, parti d'ailleurs, arrive ailleurs.",
      "Il faut donner le point de départ.",
    ),
    tags: ["ce2", "reperage", "deplacement", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_reperage_deplacement_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_deplacement",
    difficulty: 3,
    theme: "neutral",
    text: "On part de (1 ; 1) : 3 cases à droite, puis 2 en haut. Où arrive-t-on ?",
    format: "qcm",
    choices: ["(4 ; 3)", "(3 ; 2)", "(3 ; 3)", "(4 ; 2)"],
    expected: ["(4 ; 3)"],
    comparator: "mcq_exact",
    hint: "On ajoute les déplacements aux nombres du point de départ.",
    explanation: exp(
      "Un déplacement s'ajoute au point de départ : les cases vers la droite au premier nombre, celles vers le haut au second.",
      "On traite les deux directions séparément.",
      "Vers la droite : 1 + 3 = 4. Vers le haut : 1 + 2 = 3. On arrive en (4 ; 3). Répondre (3 ; 2), c'est avoir oublié d'où l'on partait.",
      "On arrive en (4 ; 3).",
    ),
    tags: ["ce2", "reperage", "deplacement", "piege", "qcm", "canvas"],
    // ⛔ 10/11 : le chemin fléché finissait SUR la réponse. On ne montre que le départ.
    canvas: reperage({ points: [{ x: 1, y: 1, label: "Départ", color: "#2563eb" }] }),
  },
  {
    kind: "fixed",
    id: "ce2_reperage_deplacement_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_deplacement",
    difficulty: 4,
    theme: "neutral",
    text: "On part de (2 ; 5) et on descend de 3 cases. Où arrive-t-on ?",
    format: "qcm",
    choices: ["(2 ; 2)", "(2 ; 8)", "(5 ; 2)", "(3 ; 5)"],
    expected: ["(2 ; 2)"],
    comparator: "mcq_exact",
    hint: "Descendre, c'est enlever au second nombre.",
    explanation: exp(
      "Monter ajoute au second nombre, descendre lui enlève ; de même, aller à droite ajoute au premier, aller à gauche lui enlève.",
      "On repère la direction, puis on ajoute ou on retire.",
      "On descend, donc on retire au second nombre : 5 - 3 = 2. Le premier nombre ne bouge pas, puisqu'on n'a pas avancé sur les côtés. On arrive en (2 ; 2).",
      "On arrive en (2 ; 2).",
    ),
    tags: ["ce2", "reperage", "deplacement", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_reperage_plan_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_plan",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un plan de la ville, comment repère-t-on une case ?",
    format: "qcm",
    choices: [
      "par une lettre de colonne et un numéro de ligne",
      "par sa couleur",
      "par sa taille",
      "par le nom de la rue",
    ],
    expected: ["par une lettre de colonne et un numéro de ligne"],
    comparator: "mcq_exact",
    hint: "Comme à la bataille navale.",
    explanation: exp(
      "Un plan quadrillé se lit en croisant une colonne et une ligne.",
      "On repère la lettre en haut, puis le numéro sur le côté, et on croise les deux.",
      "La case B3 est à l'intersection de la colonne B et de la ligne 3. C'est exactement le principe de la bataille navale.",
      "Par une lettre de colonne et un numéro de ligne.",
    ),
    tags: ["ce2", "reperage", "plan", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_reperage_plan_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_plan",
    difficulty: 4,
    theme: "reunion",
    text: "Sur un plan, la mairie est en C2 et le marché en B2. Que dire de leur position ?",
    format: "qcm",
    choices: [
      "elles sont sur la même ligne, dans deux colonnes voisines",
      "elles sont sur la même colonne",
      "elles sont dans la même case",
      "on ne peut rien dire",
    ],
    expected: ["elles sont sur la même ligne, dans deux colonnes voisines"],
    comparator: "mcq_exact",
    hint: "Compare d'abord les lettres, puis les nombres.",
    explanation: exp(
      "Sur un plan, la lettre donne la colonne et le nombre donne la ligne.",
      "On compare les deux repères élément par élément : la lettre, puis le nombre.",
      "C2 et B2 portent le même nombre, 2 : ils sont donc sur la même ligne. Leurs lettres, B et C, se suivent : les colonnes sont voisines.",
      "Elles sont sur la même ligne, dans deux colonnes voisines.",
    ),
    tags: ["ce2", "reperage", "plan", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_reperage_plan_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_plan",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un plan, une case est repérée par « A1 ». Où se trouve-t-elle ?",
    format: "qcm",
    choices: [
      "dans la première colonne et la première ligne",
      "dans la première colonne et la dernière ligne",
      "au milieu du plan",
      "dans la dernière case",
    ],
    expected: ["dans la première colonne et la première ligne"],
    comparator: "mcq_exact",
    hint: "A est la première lettre, 1 le premier nombre.",
    explanation: exp(
      "Sur un plan, la lettre donne la colonne et le nombre donne la ligne.",
      "On traduit chaque symbole séparément.",
      "A est la première colonne, 1 est la première ligne : la case A1 est donc tout au début du plan, dans le coin.",
      "Dans la première colonne et la première ligne.",
    ),
    tags: ["ce2", "reperage", "plan", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_reperage_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un trésor est caché en (5 ; 2). On part de (1 ; 1). Quel déplacement mène au trésor ?",
    format: "qcm",
    choices: [
      "4 cases vers la droite, puis 1 case vers le haut",
      "1 case vers la droite, puis 4 cases vers le haut",
      "5 cases vers la droite, puis 2 cases vers le haut",
      "2 cases vers la droite, puis 5 cases vers le haut",
    ],
    expected: ["4 cases vers la droite, puis 1 case vers le haut"],
    comparator: "mcq_exact",
    hint: "Le déplacement est l'ÉCART entre le départ et l'arrivée, pas le repère de l'arrivée.",
    explanation: exp(
      "Le déplacement est l'écart entre le point de départ et le point d'arrivée, direction par direction.",
      "On soustrait chaque nombre du départ au nombre correspondant de l'arrivée.",
      "Vers la droite : 5 - 1 = 4. Vers le haut : 2 - 1 = 1. Répondre « 5 puis 2 », c'est avoir recopié le repère du trésor sans tenir compte du point de départ.",
      "4 cases vers la droite, puis 1 case vers le haut.",
    ),
    tags: ["ce2", "reperage", "defi", "piege", "qcm", "canvas"],
    canvas: reperage({
      points: [{ x: 1, y: 1, label: "Départ", color: "#2563eb" }],
      target: { x: 5, y: 2, label: "Trésor", color: "#f59e0b" },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_reperage_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On part de (2 ; 3) : 2 cases à droite, 1 en haut, puis 1 en bas. Où arrive-t-on ?",
    format: "qcm",
    choices: ["(4 ; 3)", "(4 ; 4)", "(4 ; 2)", "(2 ; 3)"],
    expected: ["(4 ; 3)"],
    comparator: "mcq_exact",
    hint: "Monter de 1 puis redescendre de 1, cela s'annule.",
    explanation: exp(
      "Deux déplacements opposés de même longueur se compensent : on revient au même niveau.",
      "On traite les directions séparément, en additionnant et en soustrayant.",
      "Vers la droite : 2 + 2 = 4. Vers le haut : 3 + 1 - 1 = 3. On arrive en (4 ; 3) : le détour vertical n'a rien changé.",
      "On arrive en (4 ; 3).",
    ),
    tags: ["ce2", "reperage", "defi", "qcm"],
  },
];

export const reperageBank: TutorBankItemV4[] = [
  ...FIGES,
  ...GAB_COORDONNEES,
  ...GAB_COORDONNEES_3_4,
  ...GAB_DEPLACEMENT,
  ...GAB_PLAN,
  ...GAB_DEFI,
];
