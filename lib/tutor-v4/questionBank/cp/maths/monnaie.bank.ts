// lib/tutor-v4/questionBank/cp/maths/monnaie.bank.ts
//
// La monnaie du CP, écrite à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « Les montants sont des nombres entiers d'euros toujours inférieurs ou
//     égaux à cent. » ⛔ PAS DE CENTIMES, donc PAS DE VIRGULE : les centimes
//     d'euro sont introduits au CE1, en période 2 au plus tard ;
//   — le lexique à installer : plus cher, moins cher, billet, pièce, somme,
//     reste, euros ;
//   — comparer deux ensembles de pièces et de billets, déterminer leur valeur,
//     constituer une somme donnée, simuler un achat et RENDRE LA MONNAIE ;
//   — la monnaie est introduite en période 2 ou 3.
//
// LE PIÈGE DE LA NOTION, et le BO le nomme : « L'élève sait comparer deux
// ensembles constitués de pièces ou de billets du point de vue de leur valeur
// et non de celui du nombre de pièces ou de billets. » Six pièces de 1 €, cela
// fait beaucoup de pièces et peu d'argent. Le BO ajoute la clé qui fait tout
// basculer : « dix pièces de 1 € ont la même valeur qu'un billet de 10 € ».
//
// ⚠️ Au CP, les pièces sont celles de 1 € et de 2 € ; les billets ceux de 5,
// 10, 20 et 50 €. Il n'existe pas de billet de 2 € ni de pièce de 5 €.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.
//
// ⛔ LES SQUELETTES (10/11/2026). Mesure de départ : 6 micros sur 6 sous le
// seuil (3 à 85 squelettes, jusqu'à 18 répétitions sur 20). Chaque gabarit
// tire une FAMILLE, une SITUATION d'enfant (kermesse, marché, boulangerie,
// tirelire…) et une TOURNURE. Mesure : scripts/mesurer-squelettes-coach.ts cp
// monnaie.
//
// ⭐ LES DESSINS (10/11/2026) : le canvas `monnaie` dessine les pièces et les
// billets — presque chaque question les MONTRE, l'enfant compte sur le dessin.
// ⛔ Le dessin n'écrit jamais la somme cherchée. Les choix portent « € ».

import type {
  CanvasFigure,
  MonnaieValeur,
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

const eu = (n: number) => `${n} €`;

/** Choix numériques (0 à 100), avec ou sans « € », jamais en double. */
function choixNombres(correct: number, wrongs: readonly number[], euros = true): string[] {
  const f = (n: number) => (euros ? eu(n) : String(n));
  // ⛔ 10/11/2026 — vu dans le coach : « Combien de billets vois-tu ? » proposait
  // 0 et 11 pour 1 billet. Quand on COMPTE des pièces (euros = false), ni 0 ni
  // « +10 » : un enfant qui compte se trompe d'un ou deux, pas de dix.
  const ok = Array.from(new Set(wrongs)).filter((w) => Number.isInteger(w) && (euros ? w >= 0 : w > 0) && w <= 100 && w !== correct);
  const secours = euros
    ? [correct + 1, correct - 1, correct + 10, correct + 2, correct - 2, correct + 5]
    : [correct + 1, correct - 1, correct + 2, correct - 2, correct + 3, correct + 4];
  for (const s of secours) if (ok.length < 3 && s > 0 && s <= 100 && s !== correct && !ok.includes(s)) ok.push(s);
  return shuffle([f(correct), ...shuffle(ok).slice(0, 3).map(f)]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

type Q = TutorGeneratedQuestionV4;
type Famille = () => Q;
const tirer = (familles: readonly Famille[]): Q => randomChoice(familles)();

function qcm(text: string, choices: string[], correct: string, explanation: string, canvas?: CanvasFigure): Q {
  return { text, format: "qcm", choices, expected: [correct], comparator: "mcq_exact", explanation, ...(canvas ? { canvas } : {}) };
}

function gab(
  id: string,
  microId: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
  hint: string,
  tags: string[],
  familles: readonly Famille[],
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cp", "monnaie", ...tags, "template"],
    generate: () => tirer(familles),
  };
}

type Prenom = { nom: string; il: "il" | "elle" };
const PRENOMS: readonly Prenom[] = [
  { nom: "Nina", il: "elle" }, { nom: "Téo", il: "il" }, { nom: "Zoé", il: "elle" },
  { nom: "Ravi", il: "il" }, { nom: "Lou", il: "elle" }, { nom: "Malo", il: "il" },
  { nom: "Inès", il: "elle" }, { nom: "Sacha", il: "il" }, { nom: "Amir", il: "il" },
  { nom: "Jade", il: "elle" }, { nom: "Naïa", il: "elle" }, { nom: "Tom", il: "il" },
  { nom: "Lina", il: "elle" }, { nom: "Yanis", il: "il" }, { nom: "Rose", il: "elle" },
  { nom: "Noé", il: "il" },
];
const quelquun = () => randomChoice(PRENOMS);
/** « de Lou », « d'Inès ». */
const deN = (nom: string) => (/^[AEIOUYÉÈÎ]/i.test(nom) ? `d'${nom}` : `de ${nom}`);
/** « de jetons », « d'images ». */
const de = (mot: string) => (/^[aeiouyàâéèêëîïôœ]/i.test(mot) ? `d'${mot}` : `de ${mot}`);

function deuxEnfants(): [Prenom, Prenom] {
  const a = quelquun();
  let b = quelquun();
  while (b.nom === a.nom) b = quelquun();
  return [a, b];
}
const elleIl = (p: Prenom) => (p.il === "il" ? "Il" : "Elle");

/* ---------------------------------------------------------
   L'ARGENT DU CP : pièces de 1 € et 2 €, billets de 5, 10, 20, 50 €
--------------------------------------------------------- */
const VAL: Record<number, MonnaieValeur> = { 1: "1e", 2: "2e", 5: "5e", 10: "10e", 20: "20e", 50: "50e" };
const PIECES = [1, 2] as const;
const BILLETS = [5, 10, 20, 50] as const;
const estPiece = (v: number) => v <= 2;
const nomArgent = (v: number) => (estPiece(v) ? `une pièce de ${v} €` : `un billet de ${v} €`);
const nomArgents = (v: number, n: number) =>
  n === 1 ? nomArgent(v) : `${n} ${estPiece(v) ? "pièces" : "billets"} de ${v} €`;

/** Un tas d'argent : [valeur, combien]. Dessiné du plus grand au plus petit. */
type Tas = [number, number][];
const total = (t: Tas) => t.reduce((s, [v, n]) => s + v * n, 0);
const nbObjets = (t: Tas) => t.reduce((s, [, n]) => s + n, 0);
function dessin(t: Tas, marque?: number): CanvasFigure {
  return {
    kind: "monnaie",
    elements: [...t].filter(([, n]) => n > 0).sort((a, b) => b[0] - a[0]).map(([v, n]) => ({ valeur: VAL[v], nombre: n, ...(marque === v ? { marque: true } : {}) })),
  };
}
function deuxTas(a: { nom: string; tas: Tas }, b: { nom: string; tas: Tas }): CanvasFigure {
  const el = (t: Tas) => [...t].filter(([, n]) => n > 0).sort((x, y) => y[0] - x[0]).map(([v, n]) => ({ valeur: VAL[v], nombre: n }));
  return { kind: "monnaie", groupes: [{ nom: a.nom, elements: el(a.tas) }, { nom: b.nom, elements: el(b.tas) }] };
}
const decrire = (t: Tas) => t.filter(([, n]) => n > 0).sort((a, b) => b[0] - a[0]).map(([v, n]) => nomArgents(v, n)).join(" et ");

const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « coûte » ou « coûtent » (des graines, des rollers). */
const coute = (quoi: string) => (quoi.startsWith("des ") ? "coûtent" : "coûte");

/** Où est l'argent. */
const OU: readonly ((p: Prenom) => string)[] = [
  // ⭐ 14/11 : courts — le dessin montre l'argent.
  (p) => `Voici le porte-monnaie ${deN(p.nom)}.`,
  (p) => `${p.nom} vide sa tirelire.`,
  (p) => `Voici l'argent ${deN(p.nom)}.`,
  (p) => `${p.nom} a reçu cet argent.`,
  (p) => `Pic a trouvé ce trésor.`,
  (p) => `${p.nom} va au marché avec cet argent.`,
  (p) => `${p.nom} joue à la marchande.`,
  (p) => `${p.nom} trouve cet argent.`,
  (p) => `Voici les économies ${deN(p.nom)}.`,
  (p) => `${p.nom} range cet argent.`,
];

/** Ce qu'on achète, et où. */
const ACHATS: readonly { quoi: string; ou: string; min: number; max: number }[] = [
  { quoi: "un livre", ou: "à la librairie", min: 4, max: 15 },
  { quoi: "un ballon", ou: "au magasin de sport", min: 3, max: 15 },
  { quoi: "un gâteau", ou: "à la boulangerie", min: 3, max: 15 },
  { quoi: "une voiture", ou: "au magasin de jouets", min: 2, max: 9 },
  { quoi: "un bouquet", ou: "chez la fleuriste", min: 2, max: 12 },
  { quoi: "un cerf-volant", ou: "au marché", min: 5, max: 20 },
  { quoi: "une trousse", ou: "à la papeterie", min: 2, max: 9 },
  { quoi: "un poisson rouge", ou: "à l'animalerie", min: 2, max: 8 },
  { quoi: "une corde à sauter", ou: "à la kermesse", min: 2, max: 8 },
  { quoi: "un puzzle", ou: "au magasin de jouets", min: 5, max: 20 },
  { quoi: "un melon", ou: "au marché", min: 1, max: 4 },
  { quoi: "une tarte", ou: "chez le pâtissier", min: 3, max: 12 },
  { quoi: "une peluche", ou: "à la fête foraine", min: 5, max: 25 },
  { quoi: "des graines", ou: "chez le jardinier", min: 1, max: 4 },
  { quoi: "un ananas", ou: "au marché", min: 1, max: 5 },
  { quoi: "un jeu", ou: "au magasin de jouets", min: 10, max: 35 },
  { quoi: "des rollers", ou: "au magasin de sport", min: 20, max: 50 },
  { quoi: "une trottinette", ou: "au magasin de sport", min: 25, max: 60 },
  { quoi: "un aquarium", ou: "à l'animalerie", min: 20, max: 60 },
  { quoi: "un château fort", ou: "au magasin de jouets", min: 25, max: 70 },
  { quoi: "une tente", ou: "au magasin de sport", min: 30, max: 90 },
  { quoi: "un vélo", ou: "au magasin de vélos", min: 50, max: 99 },
];

/** Un achat dont le prix est plausible (une trottinette ne coûte pas 3 €). */
function achatPour(prix: number, sauf?: string) {
  const ok = ACHATS.filter((a) => a.min <= prix && prix <= a.max && a.quoi !== sauf);
  return ok.length ? randomChoice(ok) : { quoi: "un cadeau", ou: "au magasin", min: 1, max: 100 };
}

export const monnaieBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_MONNAIE_RECONNAITRE — pièces et billets
  ========================================================= */
  gab("cp_monnaie_reconnaitre_tpl_2", "cp_monnaie_reconnaitre", 2,
    "Les pièces sont rondes. Les billets sont des rectangles de papier.",
    ["reconnaitre", "canvas"], [
    // Compter les pièces, ou les billets.
    () => {
      const nbP = randomInt(1, 5);
      const nbB = randomInt(1, 4);
      const t1: Tas = [];
      let restP = nbP;
      for (const v of shuffle(PIECES)) { const k = restP > 0 ? randomInt(1, restP) : 0; if (k) t1.push([v, k]); restP -= k; }
      if (restP > 0) t1.push([1, restP]);
      let restB = nbB;
      for (const v of shuffle(BILLETS)) { const k = restB > 0 ? randomInt(1, Math.min(2, restB)) : 0; if (k) t1.push([v, k]); restB -= k; }
      if (restB > 0) t1.push([10, restB]);
      const pieces = Math.random() < 0.5;
      const bon = pieces ? nbP : nbB;
      const p = quelquun();
      const t = `${randomChoice(OU)(p)} ${pieces ? "Combien de pièces vois-tu ?" : "Combien de billets vois-tu ?"}`;
      return qcm(t, choixNombres(bon, [pieces ? nbB : nbP, nbP + nbB, bon + 1, bon - 1], false), String(bon),
        exp("Les pièces sont rondes et en métal, les billets sont en papier.", pieces ? "On compte seulement les ronds." : "On compte seulement les rectangles.",
          `Il y a ${nbP} pièce${nbP > 1 ? "s" : ""} et ${nbB} billet${nbB > 1 ? "s" : ""}.`, `Il y a ${bon} ${pieces ? "pièce" : "billet"}${bon > 1 ? "s" : ""}.`),
        dessin(mergeTas(t1)));
    },
  ]),
  gab("cp_monnaie_reconnaitre_tpl_1", "cp_monnaie_reconnaitre", 2,
    "Regarde la forme : rond, c'est une pièce ; rectangle, c'est un billet.",
    ["reconnaitre", "canvas"], [
    // Pièce ou billet ?
    () => {
      const vals = shuffle([1, 2, 5, 10, 20, 50]).slice(0, 3);
      const cible = randomChoice(vals);
      const p = quelquun();
      const bon = estPiece(cible) ? "une pièce" : "un billet";
      const t = `${randomChoice(OU)(p)} ${randomChoice(["L'argent entouré : pièce ou billet ?", "Ce qui est entouré, c'est une pièce ou un billet ?"])}`;
      return qcm(t, ["une pièce", "un billet"], bon,
        exp("Les pièces sont rondes, les billets sont des rectangles.", "On regarde la forme de ce qui est entouré.",
          `${cible} € : c'est ${nomArgent(cible)}.`, `C'est ${bon}.`),
        dessin(vals.map((v) => [v, 1] as [number, number]), cible));
    },
    // Combien vaut ce qui est entouré ?
    () => {
      const vals = shuffle([1, 2, 5, 10, 20, 50]).slice(0, 3);
      const cible = randomChoice(vals);
      const p = quelquun();
      const t = `${randomChoice(OU)(p)} ${randomChoice([`Combien vaut ${estPiece(cible) ? "la pièce entourée" : "le billet entouré"} ?`, "Combien vaut ce qui est entouré ?"])}`;
      return qcm(t, choixNombres(cible, vals.filter((v) => v !== cible).concat([cible === 2 ? 20 : cible === 20 ? 2 : cible === 5 ? 50 : 5])), eu(cible),
        exp("La valeur est écrite en gros sur chaque pièce et chaque billet.", "On lit le nombre écrit sur ce qui est entouré.",
          `C'est ${nomArgent(cible)}.`, `Il vaut ${eu(cible)}.`),
        dessin(vals.map((v) => [v, 1] as [number, number]), cible));
    },
  ]),
  gab("cp_monnaie_reconnaitre_fixed_2", "cp_monnaie_reconnaitre", 3,
    "1 € et 2 € sont des pièces. 5 €, 10 €, 20 € et 50 € sont des billets.",
    ["reconnaitre", "piege"], [
    // Est-ce possible ?
    () => {
      const p = quelquun();
      const cas = randomChoice([
        { dit: "un billet de 2 €", ok: false, bon: "non, 2 € est une pièce" },
        { dit: "un billet de 1 €", ok: false, bon: "non, 1 € est une pièce" },
        { dit: "une pièce de 5 €", ok: false, bon: "non, 5 € est un billet" },
        { dit: "une pièce de 10 €", ok: false, bon: "non, 10 € est un billet" },
        { dit: "une pièce de 2 €", ok: true, bon: "oui" },
        { dit: "un billet de 20 €", ok: true, bon: "oui" },
        { dit: "un billet de 5 €", ok: true, bon: "oui" },
        { dit: "une pièce de 1 €", ok: true, bon: "oui" },
      ]);
      const t = randomChoice([
        `${p.nom} dit : « J'ai ${cas.dit}. » Est-ce possible ?`,
        `Existe-t-il ${cas.dit} ?`,
        `À la kermesse, ${p.nom} cherche ${cas.dit}. Cela existe-t-il ?`,
      ]);
      const faux = ["oui", "non, 2 € est une pièce", "non, 5 € est un billet", "non, 1 € est une pièce", "non, 10 € est un billet", "on ne peut pas savoir"];
      return qcm(t, makeChoices(cas.bon, faux), cas.bon,
        exp("Au CP, on connaît les pièces de 1 € et 2 €, et les billets de 5, 10, 20 et 50 €.", "On se demande si cette valeur est une pièce ou un billet.",
          `Il existe des pièces de 1 € et 2 €, et des billets de 5 €, 10 €, 20 € et 50 €.`, cas.ok ? `Oui, cela existe.` : `${cas.bon.charAt(0).toUpperCase()}${cas.bon.slice(1)}.`));
    },
    // Laquelle est une pièce / un billet ?
    () => {
      const piece = Math.random() < 0.5;
      const bonV = piece ? randomChoice(PIECES) : randomChoice(BILLETS);
      const autres = shuffle((piece ? BILLETS : PIECES).slice() as number[]).slice(0, piece ? 3 : 2);
      const p = quelquun();
      const t = randomChoice([
        `Parmi ces sommes, laquelle est ${piece ? "une PIÈCE" : "un BILLET"} ?`,
        `${p.nom} cherche ${piece ? "une pièce" : "un billet"} dans sa tirelire. Lequel de ces argents est ${piece ? "une pièce" : "un billet"} ?`,
      ]);
      return qcm(t, makeChoices(eu(bonV), autres.map(eu)), eu(bonV),
        exp("Les pièces valent 1 € ou 2 €, les billets 5 €, 10 €, 20 € ou 50 €.", "On cherche la seule valeur du bon genre.",
          `${eu(bonV)} est ${nomArgent(bonV).split(" de ")[0]}.`, `C'est ${eu(bonV)}.`));
    },
  ]),

  /* =========================================================
     CP_MONNAIE_VALEUR — combien d'euros ?
  ========================================================= */
  gab("cp_monnaie_valeur_fixed_2", "cp_monnaie_valeur", 2,
    "Dix pièces de 1 € valent un billet de 10 €.",
    ["valeur", "remarquable", "dizaine", "canvas"], [
    () => {
      const [grand, petit] = randomChoice([[5, 1], [10, 1], [10, 2], [10, 5], [20, 10], [50, 10], [20, 2], [20, 5]] as const);
      const bon = grand / petit;
      const p = quelquun();
      const t = randomChoice([
        `Combien faut-il de ${estPiece(petit) ? "pièces" : "billets"} de ${petit} € pour faire ${nomArgent(grand)} ?`,
        `${p.nom} veut échanger ce billet contre des ${estPiece(petit) ? "pièces" : "billets"} de ${petit} €. Combien en aura-t-${p.il} ?`,
        `La marchande change ce billet en ${estPiece(petit) ? "pièces" : "billets"} de ${petit} €. Combien en donne-t-elle ?`,
      ]);
      return qcm(t, choixNombres(bon, [grand, bon + 1, bon - 1, bon * 2], false), String(bon),
        exp(`${nomArgent(grand)} vaut ${grand} €.`, `On compte de ${petit} en ${petit} jusqu'à ${grand}.`,
          `${Array.from({ length: bon }, (_, i) => (i + 1) * petit).join(", ")} : ${bon} fois.`, `Il en faut ${bon}.`),
        dessin([[grand, 1]]));
    },
  ]),
  gab("cp_monnaie_valeur_tpl_2", "cp_monnaie_valeur", 2,
    "Compte de 2 en 2 pour les pièces de 2 €, de 10 en 10 pour les billets de 10 €.",
    ["valeur", "canvas"], [
    () => {
      const v = randomChoice([1, 2, 5, 10]);
      const n = v === 1 ? randomInt(3, 9) : v === 2 ? randomInt(2, 6) : v === 5 ? randomInt(2, 4) : randomInt(2, 6);
      const bon = v * n;
      const p = quelquun();
      const t = `${randomChoice(OU)(p)} ${randomChoice(["Combien d'euros y a-t-il ?", "Combien d'argent en tout ?", `Combien d'euros a ${p.nom} ?`])}`;
      return qcm(t, choixNombres(bon, [n, bon + v, bon - v, v]), eu(bon),
        exp("Pour savoir combien d'argent on a, on ajoute la valeur de chaque pièce ou billet.", `On compte de ${v} en ${v}.`,
          `${Array.from({ length: n }, (_, i) => (i + 1) * v).join(", ")}.`, `Il y a ${eu(bon)}.`),
        dessin([[v, n]]));
    },
  ]),
  gab("cp_monnaie_valeur_tpl_1", "cp_monnaie_valeur", 3,
    "Compte d'abord les billets de 10 en 10, puis ajoute les pièces.",
    ["valeur", "canvas"], [
    () => {
      const d = randomInt(1, 6);
      const u = randomInt(1, 6);
      const bon = d * 10 + u;
      const p = quelquun();
      const t = `${randomChoice(OU)(p)} ${randomChoice(["Combien d'euros y a-t-il ?", "Combien d'argent en tout ?", "Quelle somme est-ce ?"])}`;
      return qcm(t, choixNombres(bon, [d + u, u * 10 + d, bon + 10, d * 10]), eu(bon),
        exp("Un billet de 10 € vaut dix pièces de 1 €.", "On compte les billets de 10 en 10, puis on ajoute les pièces.",
          `${d * 10} + ${u} = ${bon}.`, `Il y a ${eu(bon)}.`),
        dessin([[10, d], [1, u]]));
    },
    () => {
      const d = randomInt(1, 4);
      const c = randomInt(1, 4);
      const bon = d * 10 + c * 2;
      const p = quelquun();
      const t = `${randomChoice(OU)(p)} ${randomChoice(["Combien d'euros y a-t-il ?", "Combien d'argent en tout ?"])}`;
      return qcm(t, choixNombres(bon, [d * 10 + c, d + c, bon + 2, bon - 2]), eu(bon),
        exp("Une pièce de 2 € vaut deux euros.", "On compte les billets de 10 en 10, puis les pièces de 2 en 2.",
          `${d * 10} + ${c * 2} = ${bon}.`, `Il y a ${eu(bon)}.`),
        dessin([[10, d], [2, c]]));
    },
  ]),
  gab("cp_monnaie_valeur_tpl_3", "cp_monnaie_valeur", 4,
    "Commence par le plus gros billet, puis ajoute le reste petit à petit.",
    ["valeur", "canvas"], [
    () => {
      const t0 = mergeTas([
        [randomChoice([5, 10, 20]), randomInt(1, 2)],
        [randomChoice([5, 10]), randomInt(0, 2)],
        [2, randomInt(0, 3)],
        [1, randomInt(1, 3)],
      ]);
      if (total(t0) > 100) t0.splice(0, 1, [10, 1]);
      const bon = total(t0);
      const p = quelquun();
      const t = `${randomChoice(OU)(p)} ${randomChoice(["Combien d'euros y a-t-il en tout ?", "Quelle somme est-ce ?", "Combien d'argent en tout ?"])}`;
      return qcm(t, choixNombres(bon, [nbObjets(t0), bon + 1, bon - 1, bon + 5, bon - 2]), eu(bon),
        exp("On ajoute la valeur de chaque pièce et de chaque billet.", "On part du plus gros billet, puis on ajoute les autres.",
          `${t0.sort((a, b) => b[0] - a[0]).flatMap(([v, n]) => Array.from({ length: n }, () => v)).join(" + ")} = ${bon}.`, `Il y a ${eu(bon)}.`),
        dessin(t0));
    },
  ]),

  /* =========================================================
     CP_MONNAIE_COMPARER — qui a le plus ? plus cher, moins cher
     Le piège du BO : on compare la VALEUR, pas le nombre de pièces.
  ========================================================= */
  gab("cp_monnaie_comparer_tpl_2", "cp_monnaie_comparer", 3,
    "Le plus cher, c'est celui qui coûte le plus d'euros.",
    ["comparer", "lexique", "canvas"], [
    // Plus cher, moins cher.
    () => {
      const pa = randomInt(2, 30);
      let pb = randomInt(2, 30);
      while (pb === pa) pb = randomInt(2, 30);
      const a = achatPour(pa);
      const b = achatPour(pb, a.quoi);
      const plus = Math.random() < 0.5;
      const bon = (plus ? pa > pb : pa < pb) ? a.quoi : b.quoi;
      const p = quelquun();
      const t = randomChoice([
        `${maj(a.quoi)} ${coute(a.quoi)} ${eu(pa)}, ${b.quoi} ${eu(pb)}. Lequel est le ${plus ? "PLUS" : "MOINS"} cher ?`,
        `Quel est le ${plus ? "plus" : "moins"} cher : ${a.quoi} à ${eu(pa)} ou ${b.quoi} à ${eu(pb)} ?`,
      ]);
      return qcm(t, makeChoices(bon, [a.quoi, b.quoi, "les deux coûtent pareil"]), bon,
        exp("Plus cher veut dire qu'il faut payer plus d'euros.", "On compare les deux prix.",
          `${Math.min(pa, pb)} € < ${Math.max(pa, pb)} €.`, `Le ${plus ? "plus" : "moins"} cher : ${bon}.`));
    },
    // Qui a le plus d'argent (sans piège) ?
    () => {
      const [x, y] = deuxEnfants();
      const ta: Tas = [[10, randomInt(0, 2)], [5, randomInt(0, 1)], [1, randomInt(1, 4)]];
      let tb: Tas = [[10, randomInt(0, 2)], [2, randomInt(1, 3)]];
      while (total(tb) === total(ta)) tb = [[10, randomInt(0, 2)], [2, randomInt(1, 3)]];
      const plus = Math.random() < 0.6;
      const bon = (plus ? total(ta) > total(tb) : total(ta) < total(tb)) ? x.nom : y.nom;
      const t = randomChoice([
        `${x.nom} et ${y.nom} vident leur tirelire. Qui a le ${plus ? "plus" : "moins"} d'argent ?`,
        `Voici l'argent ${deN(x.nom)} et ${deN(y.nom)}. Qui a le ${plus ? "plus" : "moins"} d'argent ?`,
      ]);
      return qcm(t, makeChoices(bon, [x.nom, y.nom, "ils ont autant"]), bon,
        exp("Pour comparer, on calcule ce que vaut chaque tas.", "On compte la somme de chacun.",
          `${x.nom} : ${eu(total(ta))}. ${y.nom} : ${eu(total(tb))}.`, `${bon} a le ${plus ? "plus" : "moins"} d'argent.`),
        deuxTas({ nom: x.nom, tas: ta }, { nom: y.nom, tas: tb }));
    },
  ]),
  gab("cp_monnaie_comparer_fixed_1", "cp_monnaie_comparer", 4,
    "Beaucoup de pièces, ce n'est pas forcément beaucoup d'argent.",
    ["comparer", "piege", "canvas"], [
    () => piegeNombreDePieces(10, 1),
  ]),
  gab("cp_monnaie_comparer_fixed_2", "cp_monnaie_comparer", 4,
    "Une pièce de 2 € vaut deux pièces de 1 €.",
    ["comparer", "piege", "canvas"], [
    () => piegeNombreDePieces(2, 1),
  ]),
  gab("cp_monnaie_comparer_tpl_1", "cp_monnaie_comparer", 4,
    "Compte la valeur de chaque tas, pas le nombre de pièces.",
    ["comparer", "piege", "canvas"], [
    () => piegeNombreDePieces(randomChoice([5, 10, 20]), randomChoice([1, 2])),
    () => piegeNombreDePieces(randomChoice([10, 20]), 5),
  ]),

  /* =========================================================
     CP_MONNAIE_CONSTITUER — faire une somme donnée
  ========================================================= */
  gab("cp_monnaie_constituer_tpl_1", "cp_monnaie_constituer", 3,
    "Compte ce que tu as, puis ce qui manque pour arriver au prix.",
    ["constituer", "canvas"], [
    // Combien manque-t-il ?
    () => {
      const t0: Tas = mergeTas([[randomChoice([5, 10]), 1], [1, randomInt(0, 3)], [2, randomInt(0, 2)]]);
      const a = total(t0);
      const prix = a + randomInt(1, 6);
      const achat = achatPour(prix);
      const p = quelquun();
      const t = randomChoice([
        `${p.nom} veut acheter ${achat.quoi} à ${eu(prix)}. Voici son argent. Combien lui manque-t-il ?`,
        `${maj(achat.quoi)} ${coute(achat.quoi)} ${eu(prix)}. ${p.nom} a cet argent. Combien lui manque-t-il ?`,
      ]);
      return qcm(t, choixNombres(prix - a, [prix, a, prix - a + 1, prix - a - 1]), eu(prix - a),
        exp("Il manque ce qu'il faut ajouter pour arriver au prix.", "On compte l'argent, puis on avance jusqu'au prix.",
          `${p.nom} a ${eu(a)}. De ${a} à ${prix}, il y a ${prix - a}.`, `Il manque ${eu(prix - a)}.`),
        dessin(t0));
    },
    // Combien de pièces de 1 € ajouter ?
    () => {
      const b = randomChoice([5, 10, 20]);
      const cible = b + randomInt(1, 5);
      const p = quelquun();
      const t = randomChoice([
        `${p.nom} a ce billet. Combien de pièces de 1 € doit-${p.il} ajouter pour avoir ${eu(cible)} ?`,
        `Pour payer ${eu(cible)}, ${p.nom} pose ce billet. Combien de pièces de 1 € faut-il encore ?`,
      ]);
      return qcm(t, choixNombres(cible - b, [cible, b, cible - b + 1], false), String(cible - b),
        exp("On ajoute des pièces de 1 € une par une.", `On part de ${b} et on compte jusqu'à ${cible}.`,
          `${b} + ${cible - b} = ${cible}.`, `Il faut ${cible - b} pièces de 1 €.`),
        dessin([[b, 1]]));
    },
  ]),
  gab("cp_monnaie_constituer_tpl_3", "cp_monnaie_constituer", 3,
    "Compte de 10 en 10 (ou de 5 en 5, de 2 en 2) jusqu'à la somme.",
    ["constituer", "canvas"], [
    () => {
      const [v, somme] = randomChoice([[10, 30], [10, 40], [10, 50], [10, 60], [10, 80], [20, 40], [20, 60], [20, 100], [5, 15], [5, 20], [2, 8], [2, 10], [2, 12], [10, 100], [5, 25]] as const);
      const bon = somme / v;
      const p = quelquun();
      const t = randomChoice([
        `Combien faut-il de ${estPiece(v) ? "pièces" : "billets"} de ${v} € pour faire ${eu(somme)} ?`,
        `${p.nom} veut payer ${eu(somme)} avec des ${estPiece(v) ? "pièces" : "billets"} de ${v} €. Combien en faut-il ?`,
        `Pic range ${eu(somme)} en ${estPiece(v) ? "pièces" : "billets"} de ${v} €. Combien en a-t-il ?`,
      ]);
      return qcm(t, choixNombres(bon, [somme, bon + 1, bon - 1, bon * 2], false), String(bon),
        exp(`${nomArgent(v)} vaut ${v} €.`, `On compte de ${v} en ${v} jusqu'à ${somme}.`,
          `${Array.from({ length: bon }, (_, i) => (i + 1) * v).join(", ")}.`, `Il en faut ${bon}.`));
    },
    // Quel billet ou quelle pièce manque ?
    () => {
      const t0: Tas = mergeTas([[randomChoice([10, 20]), 1], [randomChoice([1, 2, 5]), randomInt(1, 2)]]);
      const manque = randomChoice([1, 2, 5, 10]);
      const somme = total(t0) + manque;
      const p = quelquun();
      const bon = nomArgent(manque);
      const t = `${p.nom} veut avoir ${eu(somme)}. Voici son argent. Que lui faut-il encore ?`;
      return qcm(t, makeChoices(bon, [1, 2, 5, 10, 20].filter((x) => x !== manque).map(nomArgent)), bon,
        exp("Il manque ce qu'il faut ajouter pour arriver à la somme.", "On compte l'argent, puis on avance jusqu'à la somme.",
          `${total(t0)} + ${manque} = ${somme}.`, `Il lui faut encore ${bon}.`),
        dessin(t0));
    },
  ]),
  gab("cp_monnaie_constituer_tpl_2", "cp_monnaie_constituer", 4,
    "Prends autant de billets de 10 € que de dizaines, puis des pièces pour les unités.",
    ["constituer"], [
    () => {
      const n = randomInt(2, 9) * 10 + randomInt(1, 9);
      const d = Math.floor(n / 10);
      const u = n % 10;
      const p = quelquun();
      const achat = achatPour(n);
      const billets = Math.random() < 0.5;
      // Le dessin montre les deux sortes d'argent : billets de 10 € et pièces de 1 €.
      const t = `${p.nom} paie ${eu(n)} avec le moins d'argent possible. Combien de ${billets ? "billets de 10 €" : "pièces de 1 €"} ?`;
      const bon = billets ? d : u;
      return qcm(t, choixNombres(bon, billets ? [u, n, d + 1] : [d, n, u + 10], false), String(bon),
        exp("Un billet de 10 € vaut une dizaine d'euros.", "Les dizaines du prix disent les billets, les unités disent les pièces.",
          `${n} = ${d * 10} + ${u} : ${d} billets et ${u} pièces.`, `${p.nom} prend ${bon} ${billets ? "billets" : "pièces"}.`),
        dessin([[10, 1], [1, 1]]));
    },
    () => {
      const n = randomInt(2, 4) * 20 + randomInt(1, 9);
      const v = Math.floor(n / 20);
      const p = quelquun();
      const achat = achatPour(n);
      const t = `${maj(achat.quoi)} ${coute(achat.quoi)} ${eu(n)}. ${p.nom} paie d'abord avec des billets de 20 €. Combien en donne-t-${p.il} ?`;
      return qcm(t, choixNombres(v, [v + 1, Math.floor(n / 10), n % 20], false), String(v),
        exp("Un billet de 20 € vaut deux billets de 10 €.", "On compte de 20 en 20 sans dépasser le prix.",
          `${Array.from({ length: v }, (_, i) => (i + 1) * 20).join(", ")} : ${v} billets, il reste ${n - 20 * v} €.`, `${p.il === "il" ? "Il" : "Elle"} donne ${v} billets de 20 €.`));
    },
  ]),

  /* =========================================================
     CP_MONNAIE_RENDRE — rendre la monnaie
  ========================================================= */
  gab("cp_monnaie_rendre_fixed_2", "cp_monnaie_rendre", 2,
    "Compte du prix jusqu'à ce que tu as donné.",
    ["rendre", "piege", "canvas"], [
    () => rendre(5, randomInt(1, 4)),
    () => {
      const v = randomChoice([2, 5, 10]);
      return rendre(v, v);
    },
  ]),
  gab("cp_monnaie_rendre_fixed_1", "cp_monnaie_rendre", 3,
    "Pars du prix et compte jusqu'à 10.",
    ["rendre", "piege", "canvas"], [
    () => rendre(10, randomInt(1, 9)),
  ]),
  gab("cp_monnaie_rendre_tpl_1", "cp_monnaie_rendre", 4,
    "Pars du prix et avance jusqu'à la somme donnée : c'est ce qu'on te rend.",
    ["rendre", "canvas"], [
    () => rendre(20, randomInt(11, 19)),
    () => rendre(randomChoice([10, 20]), randomInt(3, 9)),
  ]),

  /* =========================================================
     CP_MONNAIE_DEFI — problèmes à plusieurs étapes
  ========================================================= */
  gab("cp_monnaie_defi_tpl_2", "cp_monnaie_defi", 5,
    "Calcule ce que vaut chaque tas avant de choisir.",
    ["defi", "canvas"], [
    // Peut-on payer exactement ?
    () => {
      const t0: Tas = mergeTas([[2, randomInt(1, 4)], [1, randomInt(0, 2)], [5, randomInt(0, 1)]]);
      const a = total(t0);
      const ok = Math.random() < 0.5;
      const prix = ok ? randomInt(Math.max(1, a - 3), a) : a + randomInt(1, 4);
      const achat = achatPour(prix);
      const p = quelquun();
      const bon = ok ? "oui" : "non, il manque de l'argent";
      const t = `${p.nom} a cet argent. ${elleIl(p)} veut ${achat.quoi} à ${eu(prix)}. A-t-${p.il} assez d'argent ?`;
      return qcm(t, makeChoices(bon, ["oui", "non, il manque de l'argent", "on ne peut pas savoir"]), bon,
        exp("On a assez d'argent si la somme est au moins égale au prix.", "On compte l'argent, puis on compare au prix.",
          `${p.nom} a ${eu(a)} ; le prix est ${eu(prix)}.`, ok ? "Oui, c'est assez." : "Non, il manque de l'argent."),
        dessin(t0));
    },
    // Quel tas vaut le plus ?
    () => {
      const n1 = randomInt(5, 9);
      const n2 = randomInt(3, Math.min(6, n1 - 1));
      const bon = n2 * 2 > n1 ? "le tas de pièces de 2 €" : n2 * 2 < n1 ? "le tas de pièces de 1 €" : "les deux tas valent pareil";
      const [x, y] = deuxEnfants();
      const t = `Voici les pièces ${deN(x.nom)} et ${deN(y.nom)}. Quel tas vaut le plus ?`;
      return qcm(t, makeChoices(bon, ["le tas de pièces de 1 €", "le tas de pièces de 2 €", "les deux tas valent pareil", "celui qui a le plus de pièces"]), bon,
        exp("Un tas vaut la somme de ses pièces.", "On compte la valeur de chaque tas.",
          `${n1} pièces de 1 € : ${eu(n1)}. ${n2} pièces de 2 € : ${eu(n2 * 2)}.`, `${bon.charAt(0).toUpperCase()}${bon.slice(1)}.`),
        deuxTas({ nom: x.nom, tas: [[1, n1]] }, { nom: y.nom, tas: [[2, n2]] }));
    },
  ]),
  gab("cp_monnaie_defi_fixed_2", "cp_monnaie_defi", 5,
    "Prends d'abord les plus gros billets, sans dépasser la somme.",
    ["defi", "piege"], [
    () => {
      const n = randomInt(2, 4) * 20 + randomChoice([0, 10]) + randomInt(2, 9);
      const v20 = Math.floor(n / 20);
      const r = n - 20 * v20;
      const v10 = Math.floor(r / 10);
      const r2 = r - 10 * v10;
      const v2 = Math.floor(r2 / 2);
      const v1 = r2 % 2;
      const p = quelquun();
      const quoi = randomChoice([
        { mot: "billets de 20 €", bon: v20 },
        { mot: "pièces de 2 €", bon: v2 },
      ]);
      // Le dessin montre les quatre sortes d'argent qu'on a : 20 €, 10 €, 2 €, 1 €.
      const t = `${p.nom} paie ${eu(n)} avec le moins d'argent possible. Combien de ${quoi.mot} ?`;
      return qcm(t, choixNombres(quoi.bon, [quoi.bon + 1, quoi.bon - 1, Math.floor(n / 10), r2], false), String(quoi.bon),
        exp("Avec le moins d'argent possible, on prend d'abord les plus gros billets.", "On prend des billets de 20 €, puis de 10 €, puis des pièces de 2 € et de 1 €.",
          `${n} = ${[...Array(v20).fill(20), ...Array(v10).fill(10), ...Array(v2).fill(2), ...Array(v1).fill(1)].join(" + ")}.`, `${elleIl(p)} prend ${quoi.bon} ${quoi.mot}.`),
        dessin([[20, 1], [10, 1], [2, 1], [1, 1]]));
    },
  ]),
  gab("cp_monnaie_defi_tpl_1", "cp_monnaie_defi", 5,
    "Compte de 2 en 2 (ou de 5 en 5) jusqu'à la somme.",
    ["defi"], [
    () => {
      const v = randomChoice([2, 5, 10]);
      const k = v === 2 ? randomInt(3, 9) : v === 5 ? randomInt(2, 6) : randomInt(3, 9);
      const somme = v * k;
      const p = quelquun();
      const achat = achatPour(somme);
      const t = randomChoice([
        `${p.nom} doit faire ${eu(somme)} avec des ${estPiece(v) ? "pièces" : "billets"} de ${v} € seulement. Combien lui en faut-il ?`,
        `${maj(achat.quoi)} ${coute(achat.quoi)} ${eu(somme)}. ${p.nom} n'a que des ${estPiece(v) ? "pièces" : "billets"} de ${v} €. Combien en donne-t-${p.il} ?`,
      ]);
      return qcm(t, choixNombres(k, [somme, k + 1, k - 1, somme - v], false), String(k),
        exp(`${nomArgent(v)} vaut ${v} €.`, `On compte de ${v} en ${v} jusqu'à ${somme}.`,
          `${Array.from({ length: k }, (_, i) => (i + 1) * v).join(", ")} : ${k} fois.`, `Il en faut ${k}.`));
    },
    // Deux achats, puis la monnaie.
    () => {
      const pa = randomInt(2, 6);
      const pb = randomInt(2, 6);
      const a = achatPour(pa);
      const b = achatPour(pb, a.quoi);
      const donne = 20;
      const p = quelquun();
      const t = `${p.nom} achète ${a.quoi} à ${eu(pa)} et ${b.quoi} à ${eu(pb)}. ${elleIl(p)} donne 20 €. Combien lui rend-on ?`;
      const bon = donne - pa - pb;
      return qcm(t, choixNombres(bon, [pa + pb, bon + 1, bon - 1, donne - pa]), eu(bon),
        exp("On rend ce qui reste quand on a payé.", "On calcule le prix total, puis on avance jusqu'à 20.",
          `${pa} + ${pb} = ${pa + pb}. De ${pa + pb} à 20, il y a ${bon}.`, `On lui rend ${eu(bon)}.`),
        dessin([[20, 1]]));
    },
  ]),
];

/** Regroupe les lignes de même valeur et retire les vides. */
function mergeTas(t: Tas): Tas {
  const m = new Map<number, number>();
  for (const [v, n] of t) if (n > 0) m.set(v, (m.get(v) ?? 0) + n);
  return [...m.entries()];
}

/** Le piège du BO : plus de pièces, mais moins d'argent (ou autant). */
function piegeNombreDePieces(gros: number, petit: number): Q {
  const [x, y] = deuxEnfants();
  const nbGros = gros >= 20 ? 1 : randomInt(1, 2);
  const valGros = gros * nbGros;
  const cas = randomInt(0, 2); // 0 : moins, 1 : autant, 2 : un peu plus mais moins de pièces chez l'autre
  let nbPetit = cas === 0 ? randomInt(Math.ceil(valGros / petit / 2), Math.ceil(valGros / petit) - 1) : cas === 1 ? valGros / petit : Math.ceil(valGros / petit) + 1;
  if (!Number.isInteger(nbPetit) || nbPetit < 2) nbPetit = Math.max(2, Math.ceil(valGros / petit) - 1);
  if (nbPetit > 10) nbPetit = 10;
  if (nbPetit <= nbGros) nbPetit = nbGros + 1;
  const valPetit = nbPetit * petit;
  const tasX: Tas = [[petit, nbPetit]];
  const tasY: Tas = [[gros, nbGros]];
  const bon = valPetit > valGros ? x.nom : valPetit < valGros ? y.nom : "ils ont autant";
  const t = randomChoice([
    `${x.nom} a ${nomArgents(petit, nbPetit)}, ${y.nom} ${nomArgents(gros, nbGros)}. Qui a le plus ?`,
    `Voici l'argent ${deN(x.nom)} et ${deN(y.nom)}. Qui a le plus d'argent ?`,
    `${x.nom} : « J'ai plus de ${estPiece(petit) ? "pièces" : "billets"}, donc plus d'argent ! » Qui a le plus d'argent ?`,
  ]);
  return qcm(t, makeChoices(bon, [x.nom, y.nom, "ils ont autant", "on ne peut pas savoir"]), bon,
    exp("On compare la VALEUR de l'argent, pas le nombre de pièces.", "On calcule combien d'euros a chacun.",
      `${x.nom} : ${eu(valPetit)}. ${y.nom} : ${eu(valGros)}.`, bon === "ils ont autant" ? "Ils ont autant d'argent." : `${bon} a le plus d'argent.`),
    deuxTas({ nom: x.nom, tas: tasX }, { nom: y.nom, tas: tasY }));
}

/** Payer `donne` € pour un objet à `prix` € : combien rend-on ? */
function rendre(donne: number, prix: number): Q {
  const achat = achatPour(prix);
  const p = quelquun();
  const bon = donne - prix;
  // Le dessin montre ce qu'on donne : « ce billet » suffit.
  const ce = estPiece(donne) ? "cette pièce" : "ce billet";
  const t = randomChoice([
    `${maj(achat.quoi)} ${coute(achat.quoi)} ${eu(prix)}. ${p.nom} paie avec ${ce}. Combien lui rend-on ?`,
    `${p.nom} achète ${achat.quoi} à ${eu(prix)}. ${elleIl(p)} donne ce billet. Combien lui rend-on ?`.replace("ce billet", estPiece(donne) ? "cette pièce" : "ce billet"),
    `${p.nom} vend ${achat.quoi} à ${eu(prix)}. On lui donne ${ce}. Combien rend-${p.il} ?`,
  ]);
  if (bon === 0) {
    return qcm(t, makeChoices("rien", [eu(donne), "1 €", eu(donne * 2)]), "rien",
      exp("Quand on paie le prix exact, on ne rend rien.", "On compare ce qu'on donne et le prix.",
        `${p.nom} donne ${eu(donne)} pour ${eu(prix)} : c'est le prix exact.`, "On ne rend rien."),
      dessin([[donne, 1]]));
  }
  return qcm(t, choixNombres(bon, [prix, donne, bon + 1, bon - 1, donne + prix].filter((x) => x > 0)), eu(bon),
    exp("Rendre la monnaie, c'est donner ce qui a été payé en trop.", `On part du prix et on compte jusqu'à ${donne}.`,
      `De ${prix} à ${donne}, il y a ${bon} : ${prix} + ${bon} = ${donne}.`, `On rend ${eu(bon)}.`),
    dessin([[donne, 1]]));
}
