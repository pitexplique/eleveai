// lib/tutor-v4/questionBank/ce2/maths/grandeurs-ce2.ts
//
// LES FAMILLES COMMUNES aux longueurs, aux masses et aux contenances du CE2
// (10/11/2026). Les trois notions ont les mêmes micros — connaître les unités,
// les relations entre elles, comparer, choisir l'unité, estimer — et les mêmes
// pièges : lire le NOMBRE sans regarder l'UNITÉ (« 950 m, c'est plus que 1 km
// parce que 950 est plus grand que 1 »), se tromper de rapport (1 m = 10 cm),
// coller les nombres (« 4 kg 33 g = 433 g »). On écrit chaque famille UNE fois,
// la grandeur arrive par sa fiche (`Grandeur`) : unités, supports de la vie
// d'un enfant (ruban, sac de pommes, gourde…), objets à estimer, dessin.
//
// ⛔ LES DESSINS. Masse et contenance : des cartes d'objets (`masse` /
// `contenance`, variante `objets`) qui portent l'étiquette lue sur l'objet.
// Jamais la balance pour comparer deux masses DIFFÉRENTES sans `grammes` : le
// fléau resterait droit, ce serait dire « même masse ». Jamais la variante
// `conversion` de `contenance` (elle imprime « 1 L = 1000 mL », hors sujet en
// cL). Longueur : `schema_barre` (des morceaux mis bout à bout) ou `objets`.
// Aucun dessin n'écrit la réponse.
//
// Ce n'est PAS une banque : aucun item ici.

import type { CanvasFigure, ObjetId } from "@/lib/tutor-v4/types";
import {
  choix,
  deuxPersonnes,
  exp,
  maj,
  pick,
  quelquun,
  rint,
  TROUPE,
  troisPersonnes,
  type Etoile,
  type Q,
} from "./outils-mesures-ce2";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

export type Unite = { sym: string; nom: string; le: string; base: number };

/** Un support : ce qu'un enfant mesure, pèse ou remplit. `grand`/`petit` : ses unités. */
export type Support = {
  le: string;
  un: string;
  f?: boolean;
  icon?: string;
  grand: string;
  petit: string;
  /** Valeur maximale dans la grande unité. */
  max: number;
};

/** Un objet à estimer : sa mesure plausible, dans l'unité qui lui va. */
export type ObjetMesure = {
  nom: string;
  /** « la longueur d'un crayon », « une pastèque » : ce qu'on mesure. */
  quoi: string;
  valeur: number;
  unite: string;
  icon?: string;
  dessin?: ObjetId;
};

export type Grandeur = {
  notionId: string;
  /** « longueur », « masse », « contenance ». */
  mot: string;
  laGrandeur: string;
  unites: Unite[];
  instrument: string;
  /** « mesure », « pèse », « contient ». */
  verbe: string;
  /** « mesurer », « peser ». */
  infinitif: string;
  /** « Avec quelle unité mesure-t-on » / « pèse-t-on ». */
  avecQuelle: string;
  /** « le plus long » / « la plus longue ». */
  sup: { m: string; f: string };
  /** « Qu'est-ce qui est le plus long » (sans point d'interrogation). */
  questionPlus: string;
  supports: Support[];
  objets: ObjetMesure[];
  /** Le dessin d'une ou de plusieurs étiquettes (masse, contenance). */
  cartes?: (items: { label: string; icon?: string; valeur?: string }[]) => CanvasFigure;
  /** Le dessin de morceaux mis bout à bout (longueur). */
  barre?: (parts: { label: string; value?: string; unknown?: boolean }[], total?: string) => CanvasFigure;
  /** Le dessin d'un objet seul (longueur : bibliothèque `objets`). */
  dessinObjet?: (o: ObjetMesure) => CanvasFigure | undefined;
};

/** « le ruban » → « ruban », « l'arrosoir » → « arrosoir ». */
export const sansArticle = (le: string) => le.replace(/^(le |la |l')/, "");

export const unite =(G: Grandeur, sym: string) => G.unites.find((u) => u.sym === sym)!;
/**
 * Dans une bulle, « 4 m » ne se coupe pas en « 4 » / « m » (rendu du 10/11) :
 * espace insécable entre un nombre et son unité.
 */
const NBSP = String.fromCharCode(160);
export const insecable = (t: string) => t.replace(/(\d) (?=[a-zA-Z])/g, "$1" + NBSP);

export const pluriel = (u: Unite) => `${u.nom}s`;
/** « 1 tonne », « 3 tonnes ». */
export const nUnite = (n: number, u: Unite) => `${n} ${n === 1 ? u.nom : pluriel(u)}`;
export const rapport = (G: Grandeur, grand: string, petit: string) => unite(G, grand).base / unite(G, petit).base;
/** « 4 kg 33 g », « 2 m », « 75 cL ». */
export const ecrire = (a: number, g: string, b = 0, p = "") => (a && b ? `${a} ${g} ${b} ${p}` : a ? `${a} ${g}` : `${b} ${p}`);

/* =========================================================
   CONNAÎTRE LES UNITÉS
========================================================= */

function deuxUnites(G: Grandeur): Q {
  const U = G.unites;
  const i = rint(0, U.length - 1);
  let j = rint(0, U.length - 1);
  while (j === i) j = rint(0, U.length - 1);
  const petite = Math.random() < 0.5;
  const adj = petite ? "petite" : "grande";
  const a = U[i];
  const b = U[j];
  const bonne = (petite ? (a.base < b.base ? a : b) : a.base > b.base ? a : b).le;
  const autre = bonne === a.le ? b.le : a.le;
  const tiers = U.find((u) => u !== a && u !== b);
  const p = quelquun();
  return {
    text: pick([
      `Quelle est la plus ${adj} unité : ${a.le} ou ${b.le} ?`,
      `Entre ${a.le} et ${b.le}, quelle unité est la plus ${adj} ?`,
      `${p.nom} hésite entre ${a.le} et ${b.le}. Quelle est la plus ${adj} unité ?`,
      `Laquelle de ces deux unités de ${G.mot} est la plus ${adj} : ${a.le} ou ${b.le} ?`,
    ]),
    format: "qcm",
    choices: choix(bonne, [autre, "elles sont pareilles", tiers ? tiers.le : "on ne peut pas comparer"]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      `Les unités de ${G.mot}, de la plus petite à la plus grande : ${U.map((u) => u.sym).join(", ")}.`,
      "On place les deux unités dans cette liste.",
      `${maj(a.le)} (${a.sym}) et ${b.le} (${b.sym}) : ${bonne} vient ${petite ? "avant" : "après"}.`,
      `La plus ${adj}, c'est ${bonne}.`,
    ),
  };
}

function abreviation(G: Grandeur): Q {
  const s = pick(G.supports);
  const u = unite(G, pick([s.grand, s.petit]));
  const n = u.sym === s.grand ? rint(1, s.max) : rint(2, 9) * 10;
  const sens = Math.random() < 0.65;
  const dessin = G.cartes ? G.cartes([{ label: maj(sansArticle(s.le)), icon: s.icon, valeur: `${n} ${u.sym}` }]) : undefined;
  if (sens) {
    return {
      text: pick([
        `Sur ${s.le}, on lit « ${n} ${u.sym} ». Que veut dire « ${u.sym} » ?`,
        `${maj(s.le)} porte une étiquette : « ${n} ${u.sym} ». Quelle unité se cache derrière « ${u.sym} » ?`,
        `Que veut dire l'abréviation « ${u.sym} » dans « ${n} ${u.sym} » ?`,
      ]),
      format: "qcm",
      choices: choix(u.nom, [...G.unites.filter((v) => v !== u).map((v) => v.nom), "centimètre", "kilogramme", "litre"]),
      expected: [u.nom],
      comparator: "mcq_exact",
      explanation: exp(
        `Chaque unité de ${G.mot} a une abréviation : ${G.unites.map((v) => `${v.sym} = ${v.nom}`).join(", ")}.`,
        "On reconnaît l'abréviation.",
        `« ${u.sym} » veut dire ${u.nom}.`,
        `C'est le ${u.nom}.`,
      ),
      canvas: dessin,
    };
  }
  const p = quelquun();
  return {
    text: pick([
      `${p.nom} veut écrire « ${nUnite(n, u)} » en abrégé. Que doit-${p.il} écrire ?`,
      `Comment écrit-on « ${nUnite(n, u)} » avec l'abréviation ?`,
      `Sur ${s.le}, on veut écrire ${nUnite(n, u)} en abrégé. Quelle écriture choisir ?`,
    ]),
    format: "qcm",
    choices: choix(`${n} ${u.sym}`, [...G.unites.filter((v) => v !== u).map((v) => `${n} ${v.sym}`), `${n} ${u.nom.slice(0, 3)}`]),
    expected: [`${n} ${u.sym}`],
    comparator: "mcq_exact",
    explanation: exp(
      `Les abréviations des unités de ${G.mot} : ${G.unites.map((v) => `${v.nom} = ${v.sym}`).join(", ")}.`,
      "On remplace le nom de l'unité par son abréviation.",
      `${u.nom} s'écrit « ${u.sym} ».`,
      `On écrit ${n} ${u.sym}.`,
    ),
  };
}

const GRANDEURS = ["une longueur", "une masse", "une contenance", "une durée"];
const INSTRUMENTS = ["une règle graduée", "une balance", "un verre doseur", "une horloge"];

function quoiMesure(G: Grandeur): Q {
  const u = pick(G.unites);
  const p = quelquun();
  return tirerUn([
    () => ({
      text: pick([
        `${maj(u.le)} est une unité de quoi ?`,
        `Que mesure-t-on en ${pluriel(u)} ?`,
        `${p.nom} écrit un nombre suivi de « ${u.sym} ». Qu'a-t-${p.il} mesuré ?`,
      ]),
      format: "qcm",
      choices: choix(G.laGrandeur, GRANDEURS),
      expected: [G.laGrandeur],
      comparator: "mcq_exact",
      explanation: exp(
        `${G.unites.map((v) => maj(v.le)).join(", ")} : ce sont des unités de ${G.mot}.`,
        "On reconnaît l'unité.",
        `${maj(u.le)} (${u.sym}) sert à exprimer ${G.laGrandeur}.`,
        `On mesure ${G.laGrandeur}.`,
      ),
    }),
    () => ({
      text: pick([
        `Avec quel instrument mesure-t-on ${G.laGrandeur} ?`,
        `${p.nom} veut trouver ${G.laGrandeur} en ${pluriel(u)}. Quel instrument prend-${p.il} ?`,
        `Pour ${G.infinitif} ${pick(G.supports).un}, quel instrument utilise-t-on ?`,
      ]),
      format: "qcm",
      choices: choix(G.instrument, INSTRUMENTS),
      expected: [G.instrument],
      comparator: "mcq_exact",
      explanation: exp(
        `Chaque grandeur a son instrument : la règle pour les longueurs, la balance pour les masses, le verre doseur pour les contenances.`,
        "On choisit l'instrument qui mesure cette grandeur.",
        `Pour ${G.laGrandeur} : ${G.instrument}.`,
        `On utilise ${G.instrument}.`,
      ),
    }),
  ]);
}

function rangerUnites(G: Grandeur): Q {
  const U = melangeEnPlace([...G.unites]).slice(0, 3).sort((a, b) => a.base - b.base);
  const croissant = Math.random() < 0.5;
  const ordre = croissant ? U : [...U].reverse();
  const txt = (l: Unite[]) => l.map((u) => u.sym).join(", ");
  const bonne = txt(ordre);
  const melanges = [txt([U[1], U[0], U[2]]), txt([U[0], U[2], U[1]]), txt([U[2], U[0], U[1]]), txt([U[1], U[2], U[0]]), txt(croissant ? [...U].reverse() : U)];
  const p = quelquun();
  return {
    text: pick([
      `Range ces unités de la plus ${croissant ? "petite" : "grande"} à la plus ${croissant ? "grande" : "petite"} : ${txt([U[2], U[0], U[1]])}.`,
      `${p.nom} range ${U.length} unités de ${G.mot}, de la plus ${croissant ? "petite" : "grande"} à la plus ${croissant ? "grande" : "petite"}. Quel est le bon ordre ?`,
      `Dans quel ordre vont ces unités, de la plus ${croissant ? "petite" : "grande"} à la plus ${croissant ? "grande" : "petite"} : ${txt([U[1], U[2], U[0]])} ?`,
    ]),
    format: "qcm",
    choices: choix(bonne, melanges),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      `Les unités de ${G.mot}, de la plus petite à la plus grande : ${G.unites.map((u) => u.sym).join(", ")}.`,
      "On les remet dans l'ordre de cette liste.",
      croissant ? `De la plus petite à la plus grande : ${bonne}.` : `De la plus grande à la plus petite : ${bonne}.`,
      `L'ordre est : ${bonne}.`,
    ),
  };
}

function tirerUn(f: (() => Q)[]): Q {
  return pick(f)();
}

export function unites(G: Grandeur, e: Etoile): Q {
  if (e === 1) return tirerUn([() => deuxUnites(G), () => quoiMesure(G), () => quoiMesure(G)]);
  if (e === 2) return tirerUn([() => abreviation(G), () => abreviation(G), () => deuxUnites(G)]);
  return tirerUn([() => rangerUnites(G), () => abreviation(G), () => deuxUnites(G)]);
}

/* =========================================================
   LES RELATIONS ENTRE UNITÉS
========================================================= */

type Paire = { grand: Unite; petit: Unite; r: number };
export function paires(G: Grandeur): Paire[] {
  const vues = new Set<string>();
  const out: Paire[] = [];
  for (const s of G.supports) {
    const k = `${s.grand}/${s.petit}`;
    if (vues.has(k)) continue;
    vues.add(k);
    out.push({ grand: unite(G, s.grand), petit: unite(G, s.petit), r: rapport(G, s.grand, s.petit) });
  }
  return out;
}

/** Les pièges d'un rapport : se tromper de rapport (×10, ×1000), ajouter au lieu de multiplier. */
function piegesRapport(n: number, r: number, p: string): string[] {
  const autres = [10, 100, 1000].filter((x) => x !== r);
  return [...autres.map((x) => `${n * x} ${p}`), `${n + r} ${p}`, `${n * r + r} ${p}`];
}

function relationDeBase(G: Grandeur): Q {
  const { grand, petit, r } = pick(paires(G));
  const p = quelquun();
  if (Math.random() < 0.65) {
    return {
      text: pick([
        `Combien y a-t-il de ${pluriel(petit)} dans 1 ${grand.nom} ?`,
        `1 ${grand.sym} = … ${petit.sym}. Quel nombre manque ?`,
        `Un ${grand.nom}, c'est combien de ${pluriel(petit)} ?`,
        `${p.nom} se demande combien de ${pluriel(petit)} font 1 ${grand.nom}. Que lui réponds-tu ?`,
      ]),
      format: "qcm",
      choices: choix(`${r} ${petit.sym}`, piegesRapport(1, r, petit.sym)),
      expected: [`${r} ${petit.sym}`],
      comparator: "mcq_exact",
      explanation: exp(
        `La relation à connaître : 1 ${grand.sym} = ${r} ${petit.sym}.`,
        "On la récite, sans tableau.",
        `1 ${grand.nom} = ${r} ${pluriel(petit)}.`,
        `Il y en a ${r}.`,
      ),
    };
  }
  return {
    text: pick([
      `${r} ${pluriel(petit)}, cela fait combien de ${pluriel(grand)} ?`,
      `${r} ${petit.sym} = … ${grand.sym}. Quel nombre manque ?`,
      `${p.nom} a ${r} ${pluriel(petit)}. Combien de ${pluriel(grand)} cela fait-il ?`,
    ]),
    format: "qcm",
    choices: choix(`1 ${grand.sym}`, [`10 ${grand.sym}`, `100 ${grand.sym}`, `${r} ${grand.sym}`, `1000 ${grand.sym}`]),
    expected: [`1 ${grand.sym}`],
    comparator: "mcq_exact",
    explanation: exp(
      `1 ${grand.sym} = ${r} ${petit.sym}.`,
      "On lit la relation dans l'autre sens.",
      `${r} ${petit.sym} = 1 ${grand.sym}.`,
      `Cela fait 1 ${grand.nom}.`,
    ),
  };
}

const dessinSupport = (G: Grandeur, s: Support, valeur: string) =>
  G.cartes ? G.cartes([{ label: maj(sansArticle(s.le)), icon: s.icon, valeur }]) : undefined;

/** n (grande unité) → petite unité. */
function grandVersPetit(G: Grandeur, nMax: number): Q {
  const s = pick(G.supports);
  const g = unite(G, s.grand);
  const p = unite(G, s.petit);
  const r = rapport(G, s.grand, s.petit);
  const n = rint(nMax <= 3 ? 1 : 2, Math.min(s.max, nMax));
  const qui = quelquun();
  const bonne = `${n * r} ${p.sym}`;
  const dessin =
    G.barre && n <= 6 && Math.random() < 0.6
      ? G.barre(Array.from({ length: n }, () => ({ label: `1 ${g.sym}` })), `? ${p.sym}`)
      : dessinSupport(G, s, `${n} ${g.sym}`);
  return {
    text: pick([
      `${maj(s.le)} ${G.verbe} ${n} ${g.sym}. Combien de ${pluriel(p)} cela fait-il ?`,
      `${qui.nom} lit « ${n} ${g.sym} » sur ${s.le}. Combien de ${pluriel(p)} est-ce ?`,
      `${maj(s.le)} ${G.verbe} ${nUnite(n, g)}. Écris cette ${G.mot} en ${pluriel(p)}.`,
      `${n} ${g.sym} = … ${p.sym}. Quel nombre manque ?`,
    ]),
    format: "qcm",
    choices: choix(bonne, piegesRapport(n, r, p.sym)),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      `1 ${g.sym} = ${r} ${p.sym}.`,
      `Chaque ${g.nom} vaut ${r} ${pluriel(p)} : on prend ${n} fois ${r}.`,
      `${n} × ${r} = ${n * r}.`,
      `${n} ${g.sym} = ${bonne}.`,
    ),
    canvas: dessin,
  };
}

/** petite unité → n (grande unité). */
function petitVersGrand(G: Grandeur): Q {
  const s = pick(G.supports);
  const g = unite(G, s.grand);
  const p = unite(G, s.petit);
  const r = rapport(G, s.grand, s.petit);
  const n = rint(2, Math.min(9, s.max));
  const qui = quelquun();
  const bonne = `${n} ${g.sym}`;
  return {
    text: pick([
      `${maj(s.le)} ${G.verbe} ${n * r} ${p.sym}. Combien de ${pluriel(g)} cela fait-il ?`,
      `${qui.nom} lit « ${n * r} ${p.sym} » sur ${s.le}. Combien de ${pluriel(g)} est-ce ?`,
      `${n * r} ${p.sym} = … ${g.sym}. Quel nombre manque ?`,
      `${maj(s.le)} ${G.verbe} ${n * r} ${pluriel(p)}. Écris cette ${G.mot} en ${pluriel(g)}.`,
    ]),
    format: "qcm",
    choices: choix(bonne, [`${n * 10} ${g.sym}`, `${n * r} ${g.sym}`, `${n + 1} ${g.sym}`, `${(n * r) / 10} ${g.sym}`, `${n * 100} ${g.sym}`]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      `1 ${g.sym} = ${r} ${p.sym}.`,
      `On cherche combien de fois ${r} il y a dans ${n * r}.`,
      `${n} × ${r} = ${n * r}, donc ${n * r} ${p.sym} = ${n} ${g.sym}.`,
      `Cela fait ${bonne}.`,
    ),
    canvas: dessinSupport(G, s, `${n * r} ${p.sym}`),
  };
}

/** a (grande) b (petite) → petite, et l'inverse. Le piège : coller les nombres. */
function compose(G: Grandeur): Q {
  const s = pick(G.supports);
  const g = unite(G, s.grand);
  const p = unite(G, s.petit);
  const r = rapport(G, s.grand, s.petit);
  const a = rint(1, Math.min(9, s.max));
  const b = r === 10 ? rint(1, 9) : r === 100 ? rint(5, 95) : pick([rint(10, 95), rint(100, 950)]);
  const total = a * r + b;
  const qui = quelquun();
  if (Math.random() < 0.6) {
    const bonne = `${total} ${p.sym}`;
    const colle = Number(`${a}${b}`);
    const dessin = G.barre
      ? G.barre([{ label: `${a} ${g.sym}` }, { label: `${b} ${p.sym}` }], `? ${p.sym}`)
      : dessinSupport(G, s, ecrire(a, g.sym, b, p.sym));
    return {
      text: pick([
        `${maj(s.le)} ${G.verbe} ${ecrire(a, g.sym, b, p.sym)}. Combien de ${pluriel(p)} cela fait-il en tout ?`,
        `${qui.nom} lit « ${ecrire(a, g.sym, b, p.sym)} » sur ${s.le}. Écris-le en ${pluriel(p)}.`,
        `${ecrire(a, g.sym, b, p.sym)} = … ${p.sym}. Quel nombre manque ?`,
      ]),
      format: "qcm",
      choices: choix(bonne, [`${colle} ${p.sym}`, `${a + b} ${p.sym}`, `${total + r} ${p.sym}`, `${a * 10 + b} ${p.sym}`, `${total + 10} ${p.sym}`, `${a * (r === 10 ? 100 : 10) + b} ${p.sym}`]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        `1 ${g.sym} = ${r} ${p.sym}.`,
        `On change les ${pluriel(g)} en ${pluriel(p)}, puis on ajoute les ${pluriel(p)} qui restent.`,
        `${a} × ${r} = ${a * r} ; ${a * r} + ${b} = ${total}.`,
        `${ecrire(a, g.sym, b, p.sym)} = ${bonne}.`,
      ),
      canvas: dessin,
    };
  }
  const bonne = ecrire(a, g.sym, b, p.sym);
  return {
    text: pick([
      `${maj(s.le)} ${G.verbe} ${total} ${p.sym}. Comment l'écrire en ${pluriel(g)} et ${pluriel(p)} ?`,
      `${qui.nom} trouve ${total} ${p.sym} pour ${s.le}. Cela fait combien de ${pluriel(g)} et de ${pluriel(p)} ?`,
      `${total} ${p.sym} = … ${g.sym} … ${p.sym}. Quelle est la bonne écriture ?`,
    ]),
    format: "qcm",
    choices: choix(bonne, [
      ecrire(a + 1, g.sym, b, p.sym),
      ecrire(Math.floor(total / 10), g.sym, total % 10, p.sym),
      ecrire(Math.floor(total / 100) || 1, g.sym, total % 100 || 5, p.sym),
      ecrire(a, g.sym, b + 10, p.sym),
    ]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      `1 ${g.sym} = ${r} ${p.sym}.`,
      `On cherche combien de fois ${r} ${p.sym} tiennent dans ${total} ${p.sym}, puis ce qui reste.`,
      `${a} × ${r} = ${a * r} ; ${total} − ${a * r} = ${b}.`,
      `${total} ${p.sym} = ${bonne}.`,
    ),
  };
}

/** « 1 kg = 100 g » : vrai ou faux ? Le piège du mauvais rapport. */
function relationVraiFaux(G: Grandeur): Q {
  const { grand, petit, r } = pick(paires(G));
  const x = pick([r, r, r / 10, r * 10, r === 100 ? 10 : 100].filter((v) => v >= 1));
  const enfant = pick(TROUPE);
  const il = enfant.id === "nina" || enfant.id === "zoe" ? "elle" : "il";
  const phrase = `1 ${grand.sym} = ${x} ${petit.sym}`;
  const bonne = x === r ? "oui" : `non, 1 ${grand.sym} = ${r} ${petit.sym}`;
  const avecBulle = Math.random() < 0.5;
  return {
    text: avecBulle
      ? `${enfant.nom} affirme : « ${phrase}. » A-t-${il} raison ?`
      : pick([
          `Vrai ou faux : ${phrase} ?`,
          `Pic le paille-en-queue a écrit « ${phrase} » sur le tableau. Est-ce juste ?`,
          `La maîtresse écrit « ${phrase} ». Est-ce juste ?`,
        ]),
    format: "qcm",
    choices: choix(
      bonne,
      [
        "oui",
        `non, 1 ${grand.sym} = ${r} ${petit.sym}`,
        ...[10, 100, 1000].filter((v) => v !== r && v !== x).map((v) => `non, 1 ${grand.sym} = ${v} ${petit.sym}`),
      ].filter((c) => x !== r || c !== `non, 1 ${grand.sym} = ${r} ${petit.sym}`),
    ),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      `La relation à connaître : 1 ${grand.sym} = ${r} ${petit.sym}.`,
      "On compare l'écriture proposée avec la relation.",
      x === r ? `${phrase} : c'est exactement la relation.` : `${phrase} est faux : 1 ${grand.nom} vaut ${r} ${pluriel(petit)}, pas ${x}.`,
      x === r ? "Oui, c'est juste." : `Non : 1 ${grand.sym} = ${r} ${petit.sym}.`,
    ),
    canvas: avecBulle
      ? { kind: "personnage", personnage: enfant.id, pose: "montre", expression: "pense", mode: "couleur", bulle: { texte: insecable(`${phrase} !`) } }
      : undefined,
  };
}

export function relations(G: Grandeur, e: Etoile): Q {
  if (e === 1) return tirerUn([() => relationDeBase(G), () => relationVraiFaux(G), () => grandVersPetit(G, 3), () => grandVersPetit(G, 3)]);
  if (e === 2) return tirerUn([() => grandVersPetit(G, 9), () => grandVersPetit(G, 9), () => relationVraiFaux(G), () => relationDeBase(G)]);
  if (e === 3) return tirerUn([() => petitVersGrand(G), () => petitVersGrand(G), () => grandVersPetit(G, 9)]);
  return compose(G);
}

/* =========================================================
   COMPARER
========================================================= */

type Mesure = { txt: string; v: number };

/** Deux mesures du même support, dans deux unités : écart net (★2) ou serré (★3). */
function deuxMesures(G: Grandeur, s: Support, serre: boolean): [Mesure, Mesure, boolean] {
  const g = unite(G, s.grand);
  const p = unite(G, s.petit);
  const r = rapport(G, s.grand, s.petit);
  const n = rint(1, Math.min(s.max, serre ? 9 : 4));
  const ecart = serre ? pick([1, 2, 5, 8]) * (r >= 100 ? r / 100 : 1) * (r === 1000 ? 5 : 1) : Math.round(r * pick([0.1, 0.2, 0.25, 0.4]));
  const egal = serre && Math.random() < 0.15;
  const vp = egal ? n * r : n * r + (Math.random() < 0.5 ? ecart : -ecart);
  const A: Mesure = { txt: `${n} ${g.sym}`, v: n * r };
  const B: Mesure = { txt: `${vp} ${p.sym}`, v: vp };
  return Math.random() < 0.5 ? [A, B, egal] : [B, A, egal];
}

function comparerDeux(G: Grandeur, serre: boolean): Q {
  const s = pick(G.supports);
  const [A, B, egal] = deuxMesures(G, s, serre);
  const [p, q] = deuxPersonnes();
  const sup = s.f ? G.sup.f : G.sup.m;
  const celui = s.f ? "celle" : "celui";
  const dessin = G.cartes
    ? G.cartes([
        { label: p.nom, icon: s.icon, valeur: A.txt },
        { label: q.nom, icon: s.icon, valeur: B.txt },
      ])
    : undefined;
  if (Math.random() < 0.6) {
    const bonne = egal ? "c'est pareil" : A.v > B.v ? p.nom : q.nom;
    return {
      text: pick([
        `${maj(s.le)} de ${p.nom} ${G.verbe} ${A.txt}. ${maj(celui)} de ${q.nom} ${G.verbe} ${B.txt}. Qui a ${s.le} ${sup} ?`,
        `${p.nom} a ${s.un} de ${A.txt}, ${q.nom} ${s.un} de ${B.txt}. Qui a ${s.le} ${sup} ?`,
        `${p.nom} et ${q.nom} comparent leur ${sansArticle(s.le)} : ${A.txt} pour ${p.nom}, ${B.txt} pour ${q.nom}. Qui a ${s.le} ${sup} ?`,
        `${maj(s.le)} de ${p.nom} : ${A.txt}. ${maj(celui)} de ${q.nom} : ${B.txt}. Qui a ${s.le} ${sup} ?`,
        `Pour la kermesse, ${p.nom} apporte ${s.un} de ${A.txt} et ${q.nom} ${s.un} de ${B.txt}. Qui a apporté ${s.le} ${sup} ?`,
      ]),
      format: "qcm",
      choices: choix(bonne, [p.nom, q.nom, "c'est pareil", "on ne peut pas savoir"]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: explicationComparer(G, s, A, B, egal),
      canvas: dessin,
    };
  }
  const bonne = egal ? "c'est pareil" : A.v > B.v ? A.txt : B.txt;
  return {
    text: pick([`${G.questionPlus} : ${A.txt} ou ${B.txt} ?`, `Compare ${A.txt} et ${B.txt}. ${G.questionPlus} ?`, `${p.nom} demande : « ${G.questionPlus} : ${A.txt} ou ${B.txt} ? » Que réponds-tu ?`]),
    format: "qcm",
    choices: choix(bonne, [A.txt, B.txt, "c'est pareil", "on ne peut pas savoir"]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: explicationComparer(G, s, A, B, egal),
  };
}

function explicationComparer(G: Grandeur, s: Support, A: Mesure, B: Mesure, egal: boolean) {
  const p = unite(G, s.petit);
  const g = unite(G, s.grand);
  return exp(
    `Pour comparer deux ${G.mot}s, on les écrit dans la MÊME unité : 1 ${g.sym} = ${rapport(G, s.grand, s.petit)} ${p.sym}. On ne compare pas seulement les nombres.`,
    `On écrit les deux mesures en ${pluriel(p)}, puis on compare les nombres.`,
    `${A.txt} = ${A.v} ${p.sym} et ${B.txt} = ${B.v} ${p.sym}.`,
    egal ? "C'est pareil." : `La plus grande mesure, c'est ${A.v > B.v ? A.txt : B.txt}.`,
  );
}

function comparerTrois(G: Grandeur): Q {
  const s = pick(G.supports);
  const g = unite(G, s.grand);
  const p = unite(G, s.petit);
  const r = rapport(G, s.grand, s.petit);
  const n = rint(1, Math.min(s.max, 6));
  // La grande mesure en grande unité ; deux autres avec de GRANDS nombres dans la petite unité.
  const v2 = n * r - pick([1, 2, 3]) * Math.max(1, r / 10);
  const v3 = Math.max(1, Math.round((n * r) / pick([2, 3, 4])));
  const mesures: Mesure[] = [
    { txt: `${n} ${g.sym}`, v: n * r },
    { txt: `${v2} ${p.sym}`, v: v2 },
    { txt: `${v3} ${p.sym}`, v: v3 },
  ];
  const [a, b, c] = troisPersonnes();
  const noms = [a, b, c].map((x) => x.nom);
  const ordre = melangeEnPlace([0, 1, 2]);
  const plus = Math.random() < 0.7;
  const best = plus ? 0 : 2;
  const bonne = noms[ordre.indexOf(best)];
  const sup = plus ? (s.f ? G.sup.f : G.sup.m) : (s.f ? G.sup.f : G.sup.m).replace("plus", "moins");
  const liste = ordre.map((k, i) => `${noms[i]} : ${mesures[k].txt}`).join(" ; ");
  return {
    text: pick([
      `${noms[0]}, ${noms[1]} et ${noms[2]} comparent leur ${sansArticle(s.le)}. ${liste}. Qui a ${s.le} ${sup} ?`,
      `Trois enfants ont chacun ${s.un}. ${liste}. Qui a ${s.le} ${sup} ?`,
      `${liste}. Parmi ces trois enfants, qui a ${s.le} ${sup} ?`,
    ]),
    format: "qcm",
    choices: choix(bonne, [...noms, "ils sont tous pareils"]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      `Pour comparer, on écrit toutes les mesures dans la même unité : 1 ${g.sym} = ${r} ${p.sym}.`,
      `On change ${n} ${g.sym} en ${pluriel(p)}, puis on compare les trois nombres.`,
      `${n} ${g.sym} = ${n * r} ${p.sym}. On compare ${n * r}, ${v2} et ${v3}.`,
      `C'est ${bonne}.`,
    ),
    canvas: G.cartes ? G.cartes(ordre.map((k, i) => ({ label: noms[i], icon: s.icon, valeur: mesures[k].txt }))) : undefined,
  };
}

function erreurDeNombre(G: Grandeur): Q {
  const s = pick(G.supports);
  const g = unite(G, s.grand);
  const p = unite(G, s.petit);
  const r = rapport(G, s.grand, s.petit);
  const n = rint(1, Math.min(4, s.max));
  const petitV = n * r - pick([5, 10, 20, 50].filter((x) => x < r));
  const enfant = pick(TROUPE);
  const il = enfant.id === "nina" || enfant.id === "zoe" ? "elle" : "il";
  const phrase = `${petitV} ${p.sym}, c'est plus que ${n} ${g.sym}, parce que ${petitV} est plus grand que ${n} !`;
  const bonne = `non, ${n} ${g.sym} = ${n * r} ${p.sym}`;
  return {
    text: pick([
      `${enfant.nom} dit : « ${phrase} » A-t-${il} raison ?`,
      `${enfant.nom} compare ${s.un} de ${petitV} ${p.sym} et ${s.un} de ${n} ${g.sym}. ${maj(il)} dit : « ${phrase} » A-t-${il} raison ?`,
      `Dans la bulle, ${enfant.nom} compare deux ${G.mot}s. Que penses-tu de ce qu'${il} dit ?`,
    ]),
    format: "qcm",
    choices: choix(bonne, ["oui", `non, ${n} ${g.sym} = ${r === 10 ? n * 100 : n * 10} ${p.sym}`, "on ne peut pas comparer deux unités différentes", `non, c'est pareil`]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "On ne compare pas des nombres écrits dans des unités différentes : il faut d'abord la même unité.",
      `On change ${n} ${g.sym} en ${pluriel(p)}.`,
      `${n} ${g.sym} = ${n * r} ${p.sym}, et ${n * r} est plus grand que ${petitV}.`,
      `Non : ${n} ${g.sym} est plus que ${petitV} ${p.sym}.`,
    ),
    canvas: {
      kind: "personnage",
      personnage: enfant.id,
      pose: "montre",
      expression: "sourire",
      mode: "couleur",
      bulle: { texte: insecable(phrase) },
    },
  };
}

export function comparer(G: Grandeur, e: Etoile): Q {
  if (e <= 2) return comparerDeux(G, false);
  if (e === 3) return tirerUn([() => comparerDeux(G, true), () => comparerDeux(G, true), () => erreurDeNombre(G)]);
  return tirerUn([() => comparerTrois(G), () => comparerTrois(G), () => erreurDeNombre(G)]);
}

/* =========================================================
   CHOISIR L'UNITÉ, ESTIMER
========================================================= */

function dessinObjet(G: Grandeur, o: ObjetMesure) {
  if (G.dessinObjet) return G.dessinObjet(o);
  return G.cartes ? G.cartes([{ label: maj(o.nom.replace(/^(un |une |des )/, "")), icon: o.icon }]) : undefined;
}

export function choisirUnite(G: Grandeur, e: Etoile): Q {
  const o = pick(G.objets);
  const u = unite(G, o.unite);
  const p = quelquun();
  if (e <= 2) {
    return {
      text: pick([
        `${G.avecQuelle} ${o.quoi} ?`,
        `Quelle unité choisis-tu pour ${G.infinitif} ${o.quoi} ?`,
        `${p.nom} veut ${G.infinitif} ${o.quoi}. Quelle unité doit-${p.il} choisir ?`,
      ]),
      format: "qcm",
      choices: choix(u.le, [...G.unites.filter((v) => v !== u).map((v) => v.le), "le litre", "le mètre"].filter((x) => x !== u.le)),
      expected: [u.le],
      comparator: "mcq_exact",
      explanation: exp(
        "On choisit l'unité qui donne un nombre ni trop grand, ni trop petit.",
        `On imagine ${o.quoi} : environ ${o.valeur} ${u.sym}.`,
        `${maj(u.le)} donne un nombre facile à lire : environ ${o.valeur} ${u.sym}.`,
        `On choisit ${u.le}.`,
      ),
      canvas: Math.random() < 0.7 ? dessinObjet(G, o) : undefined,
    };
  }
  const autres = G.unites.filter((v) => v !== u);
  const faux = pick(autres);
  const enfant = pick(TROUPE);
  const phrase = `${maj(o.quoi)} : ${o.valeur} ${faux.sym}.`;
  const avecBulle = Math.random() < 0.4;
  return {
    text: avecBulle
      ? `${enfant.nom} écrit : « ${phrase} » Quelle unité fallait-il écrire ?`
      : pick([
          `Un élève écrit : « ${phrase} » Quelle unité fallait-il écrire ?`,
          `${p.nom} s'est trompé${p.il === "elle" ? "e" : ""} d'unité : « ${phrase} » Quelle est la bonne unité ?`,
        ]),
    format: "qcm",
    choices: choix(u.sym, G.unites.map((v) => v.sym)),
    expected: [u.sym],
    comparator: "mcq_exact",
    explanation: exp(
      "Une mesure, c'est un nombre ET une unité : l'unité dit si c'est beaucoup ou peu.",
      `On imagine ${o.valeur} ${faux.sym} : est-ce possible pour ${o.quoi} ?`,
      `${o.valeur} ${faux.sym}, c'est ${faux.base > u.base ? "beaucoup trop" : "bien trop peu"}. ${o.valeur} ${u.sym}, c'est raisonnable.`,
      `Il fallait écrire ${u.sym}.`,
    ),
    canvas: avecBulle
      ? { kind: "personnage", personnage: enfant.id, pose: "montre", expression: "pense", mode: "couleur", bulle: { texte: insecable(phrase) } }
      : dessinObjet(G, o),
  };
}

/** Les pièges d'une estimation : le même nombre dans une autre unité, ou dix fois plus. */
function piegesEstimation(G: Grandeur, o: ObjetMesure): string[] {
  const out = G.unites.filter((v) => v.sym !== o.unite).map((v) => `${o.valeur} ${v.sym}`);
  out.push(`${o.valeur * 10} ${o.unite}`, `${o.valeur * 100} ${o.unite}`);
  return out;
}

function estimerObjet(G: Grandeur, o: ObjetMesure): Q {
  const p = quelquun();
  const bonne = `${o.valeur} ${o.unite}`;
  return {
    text: pick([
      `Environ combien ${G.verbe} ${o.nom} ?`,
      `${p.nom} ${G.verbe === "pèse" ? "pèse" : "mesure"} ${o.nom}. Quel résultat est le plus raisonnable ?`,
      `Quelle mesure est la plus raisonnable pour ${o.quoi} ?`,
    ]),
    format: "qcm",
    choices: choix(bonne, piegesEstimation(G, o)),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Estimer, c'est trouver une mesure à peu près juste, en s'appuyant sur ce qu'on connaît.",
      "On regarde d'abord l'unité : est-ce une petite ou une grande mesure ?",
      `Pour ${o.quoi}, ${bonne} est raisonnable ; les autres réponses sont beaucoup trop grandes ou trop petites.`,
      `Environ ${bonne}.`,
    ),
    canvas: Math.random() < 0.7 ? dessinObjet(G, o) : undefined,
  };
}

function quelObjet(G: Grandeur): Q {
  const o = pick(G.objets);
  const autres = G.objets.filter((x) => unite(G, x.unite).base * x.valeur > unite(G, o.unite).base * o.valeur * 4 || unite(G, x.unite).base * x.valeur * 4 < unite(G, o.unite).base * o.valeur);
  const p = quelquun();
  const bonne = o.nom;
  return {
    text: pick([
      `Lequel de ces objets ${G.verbe} environ ${o.valeur} ${o.unite} ?`,
      `${p.nom} a trouvé environ ${o.valeur} ${o.unite}. Qu'a-t-${p.il} pu ${G.infinitif} ?`,
      `Quel objet ${G.verbe} à peu près ${o.valeur} ${o.unite} ?`,
    ]),
    format: "qcm",
    choices: choix(bonne, autres.map((x) => x.nom)),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Pour estimer, on compare avec des objets qu'on connaît.",
      `On se demande quel objet ${G.verbe} à peu près ${o.valeur} ${o.unite}.`,
      `${maj(o.nom)} : environ ${o.valeur} ${o.unite}. Les autres objets sont bien plus grands ou bien plus petits.`,
      `C'est ${o.nom}.`,
    ),
  };
}

export function estimer(G: Grandeur, e: Etoile): Q {
  if (e <= 2) return estimerObjet(G, pick(G.objets));
  return tirerUn([() => quelObjet(G), () => estimerObjet(G, pick(G.objets))]);
}
