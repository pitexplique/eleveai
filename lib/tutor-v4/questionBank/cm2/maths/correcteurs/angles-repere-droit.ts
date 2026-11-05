import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/types";
import { idAngleRepere, PLAN_ANGLES_REPERE_DROIT } from "../angles-repere-droit.bank";
import { nombres, reponse, texte, type Q } from "./outils";

// LES CORRECTEURS DE angles-repere-droit.bank.ts (CM1 et CM2). Vide = juste. Ils lisent
// l'ouverture sur la figure, ou la phrase de l'énoncé ; aucun ne reçoit la réponse du gabarit.

const deg = (q: Q) => (q.canvas as any).angle.angleDeg as number;
const angles = (q: Q) => (q.canvas as any).angles as { deg: number; nom: string; longueur: number }[];
const typeDe = (d: number) => (d < 90 ? "aigu" : d === 90 ? "droit" : d < 180 ? "obtus" : "plat");
const cases = (h: number) => Math.min(h, 12 - h);
const typeHeure = (h: number) => typeDe(cases(h) * 30);
const sansDegres = (q: Q) =>
  /\d\s*°|degré|rapporteur/i.test(JSON.stringify([q.text, q.choices, q.explanation, (q.canvas as any)?.angle?.labels]))
    ? ["un degré ou un rapporteur dans la question"]
    : [];
const avec = (f: (q: Q) => string[]) => (q: Q) => [...sansDegres(q), ...f(q)];

const ouiNon = (q: Q, oui: boolean) => texte(q, oui ? "Oui" : "Non");
const leNom = (q: Q, nom: string) => texte(q, `L'angle ${nom}`);

const d1 = (q: Q) => ouiNon(q, deg(q) === 90);
const d2 = (q: Q) => (/coin d/.test(q.text) ? texte(q, "droit") : ["coin absent"]);
const d3 = (q: Q) => (/droit/.test(q.text) ? texte(q, "L'équerre") : ["énoncé illisible"]);
const d4 = (q: Q) => {
  const n = /triangle rectangle/.test(q.text) ? 1 : /carré|rectangle/.test(q.text) ? 4 : /cercle/.test(q.text) ? 0 : NaN;
  return reponse(q, n);
};
const d5 = (q: Q) => ouiNon(q, deg(q) === 90);
const d6 = (q: Q) =>
  String(q.expected[0]).startsWith("Le coin d") && (q.choices ?? []).filter((c) => c.startsWith("Le coin")).length === 1
    ? []
    : [`attendu « ${q.expected[0]} »`];
const d7 = (q: Q) =>
  typeHeure(nombres(String(q.expected[0]))[0]) === "droit" && (q.choices ?? []).filter((c) => typeHeure(nombres(c)[0]) === "droit").length === 1
    ? []
    : [`heure fausse : ${q.choices?.join(" | ")}`];
const TABLE_D8: [RegExp, string][] = [
  [/quatre côtés égaux et quatre angles droits/, "Le carré"],
  [/Quelle figure a quatre angles droits/, "Le rectangle"],
  [/aucun angle droit/, "Le cercle"],
  [/Quel triangle/, "Le triangle rectangle"],
  [/perpendiculaires|quart de tour|vertical|coin d.une feuille/, "Un angle droit"],
  [/Quel code/, "Un petit carré"],
  [/Quel outil trace|instrument de la trousse/, "L'équerre"],
  [/quel objet/i, "Un cahier"],
];
const d8 = (q: Q) => {
  const l = TABLE_D8.find(([re]) => re.test(q.text));
  return l ? texte(q, l[1]) : ["énoncé hors table"];
};
const d9 = (q: Q) => {
  const l = angles(q).filter((a) => a.deg === 90);
  return l.length === 1 ? leNom(q, l[0].nom) : ["pas un seul angle droit"];
};
const d10 = (q: Q) => {
  const colle = /collent à l.équerre|touche les deux côtés/.test(q.text);
  const ecarte = /s.écarte|reste un vide/.test(q.text);
  return colle === ecarte ? ["énoncé illisible"] : ouiNon(q, colle);
};

const t1 = (q: Q) => texte(q, typeDe(deg(q)));
const t2 = (q: Q) => {
  const j = /plus petit|moins ouvert|caché/.test(q.text)
    ? "aigu"
    : /plus grand|plus ouvert/.test(q.text)
      ? "obtus"
      : /même ouverture/.test(q.text)
        ? "droit"
        : /ligne droite|deux angles droits/.test(q.text)
          ? "plat"
          : "";
  return j ? texte(q, j) : ["énoncé illisible"];
};
const t3 = (q: Q) => {
  const j = /dépasse|sort du coin|plus que le coin/.test(q.text)
    ? "obtus"
    : /caché|moins que le coin|reste sous/.test(q.text)
      ? "aigu"
      : /collent|colle exactement/.test(q.text)
        ? "droit"
        : "";
  return j ? texte(q, j) : ["énoncé illisible"];
};
const t4 = (q: Q) => texte(q, typeHeure(nombres(q.text)[0]));
const t5 = (q: Q) => {
  const j = /bien plus que/.test(q.text) ? "obtus" : /comme le coin|bien vertical/.test(q.text) ? "droit" : /à peine|presque fermé|entrouvert/.test(q.text) ? "aigu" : "";
  return j ? texte(q, j) : ["énoncé illisible"];
};
const t6 = (q: Q) => texte(q, deg(q) < 90 ? "Plus petit" : deg(q) === 90 ? "Pareil" : "Plus grand");
const t7 = (q: Q) => {
  const m = q.text.match(/Cet angle est (aigu|droit|obtus)/);
  return m ? ouiNon(q, typeDe(deg(q)) === m[1]) : ["énoncé illisible"];
};
const t8 = (q: Q) => {
  const m = q.text.match(/(aigu|droit|obtus)(?:\.| \?)\s*$/);
  if (!m) return ["énoncé illisible"];
  const l = angles(q).filter((a) => typeDe(a.deg) === m[1]);
  return l.length === 1 ? leNom(q, l[0].nom) : ["pas un seul angle du type demandé"];
};

const classeEtat = (e: string) => (/bien plus que/.test(e) ? "obtus" : /comme le coin/.test(e) ? "droit" : /à peine/.test(e) ? "aigu" : "?");
const e1 = (q: Q) => {
  const lu: Record<string, string> = Object.fromEntries([...q.text.matchAll(/\b([ABC]) : ([^;.]+)/g)].map((m) => [m[1], classeEtat(m[2])]));
  if (Object.keys(lu).length !== 3) return ["états illisibles"];
  const t = /plus grand|angle obtus|plus ouverte/.test(q.text) ? "obtus" : /plus petit|angle aigu|moins ouverte/.test(q.text) ? "aigu" : /forme un angle droit \?/.test(q.text) ? "droit" : "";
  const l = Object.keys(lu).filter((k) => lu[k] === t);
  return l.length === 1 ? texte(q, l[0]) : ["question illisible"];
};
const e2 = (q: Q) => {
  const [a, b] = nombres(q.text);
  const grand = /plus grand|les plus écartées/.test(q.text);
  const j = cases(a) === cases(b) ? "C'est pareil" : (cases(a) > cases(b)) === grand ? `${a} h` : `${b} h`;
  return texte(q, j);
};
const e3 = (q: Q) => {
  const [x, y] = angles(q);
  const j = x.deg === y.deg ? "Ils sont égaux" : x.deg > y.deg ? `L'angle ${x.nom}` : `L'angle ${y.nom}`;
  const piege = x.deg !== y.deg && x.deg > y.deg === x.longueur > y.longueur ? ["le plus grand a aussi les plus longs côtés : pas de piège"] : [];
  return [...piege, ...texte(q, j)];
};
const TABLE_E4: [RegExp, string][] = [
  [/quatre angles droits/, "Un tour complet"],
  [/trois angles droits/, "Un"],
  [/[Dd]eux angles droits/, "Un angle plat"],
  [/angle droit et un angle aigu/, "Un angle obtus"],
  [/moitié est/, "Un angle aigu"],
  [/deux moitiés/, "Un angle droit"],
  [/quatre parts/, "Droit"],
  [/huit parts/, "Aigu"],
  [/six parts/, "Aigu"],
  [/trois parts/, "Obtus"],
  [/deux parts/, "Plat"],
];
const e4 = (q: Q) => {
  const l = TABLE_E4.find(([re]) => re.test(q.text));
  return l ? texte(q, l[1]) : ["énoncé hors table"];
};
const e5 = (q: Q) => reponse(q, nombres(q.text)[0] * (/triangle rectangle/.test(q.text) ? 1 : 4));
const e6 = (q: Q) => {
  const DIRS = ["le nord", "l’est", "le sud", "l’ouest"];
  const dep = DIRS.findIndex((d) => q.text.includes(`regarde vers ${d}`));
  const k = /un quart/.test(q.text) ? 1 : /deux quarts/.test(q.text) ? 2 : /trois quarts/.test(q.text) ? 3 : 0;
  const droite = /à droite/.test(q.text);
  if (dep < 0 || !k) return ["énoncé illisible"];
  const a = DIRS[(dep + (droite ? k : 4 - k)) % 4];
  return texte(q, a.charAt(0).toUpperCase() + a.slice(1));
};
const ORDRE = ["aigu", "droit", "obtus", "plat"];
const e7 = (q: Q) => {
  const l = [...q.text.matchAll(/L.angle ([A-Z]) est (aigu|droit|obtus|plat)/g)];
  if (l.length !== 2) return ["énoncé illisible"];
  const [x, a] = [l[0][1], ORDRE.indexOf(l[0][2])];
  const [y, b] = [l[1][1], ORDRE.indexOf(l[1][2])];
  const grand = /plus grand|plus ouvert/.test(q.text);
  if (a === b) return texte(q, "On ne peut pas savoir");
  return leNom(q, a > b === grand ? x : y);
};
const e8 = (q: Q) => {
  const tri = [...angles(q)].sort((a, b) => a.deg - b.deg).map((a) => a.nom);
  const croissant = /du plus petit au plus grand|Du moins ouvert/.test(q.text);
  return texte(q, (croissant ? tri : tri.reverse()).join(", "));
};
const e9 = (q: Q) => (/replie encore|puis le replie/.test(q.text) ? texte(q, "Un angle aigu") : /en quatre|sur lui-même/.test(q.text) ? texte(q, "Un angle droit") : ["énoncé illisible"]);

const PAR_CLE: Record<string, (q: Q) => string[]> = {
  d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d5b: d5, d9b: d9,
  t1, t2, t3, t4, t5, t6, t7, t8, t9: t1,
  e1, e2, e3, e4, e5, e6, e7, e8, e9, e2b: e2, e4b: e4, e8b: e8, e6b: e6,
};

export const correcteursAnglesRepere = (niveau: "cm1" | "cm2"): CorrecteursMaths =>
  Object.fromEntries(PLAN_ANGLES_REPERE_DROIT.map((g) => [idAngleRepere(niveau, g), avec(PAR_CLE[g.cle])]));
