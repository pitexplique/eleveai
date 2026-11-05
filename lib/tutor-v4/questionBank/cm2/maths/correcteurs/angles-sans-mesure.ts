import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { nombres, reponse, texte, unique, type Q } from "./outils";

// LES CORRECTEURS DE angles-sans-mesure.bank.ts. Vide = juste. Ils lisent les lettres
// du texte et les ouvertures de la figure.

const chapeau = (t: string) => t.match(/\\widehat\{(\w)(\w)(\w)\}/);
const sommet = (q: Q) => {
  const m = chapeau(q.text);
  return m ? texte(q, m[2]) : ["angle illisible"];
};
const memeAngle = (c: string, x: string, y: string, z: string) => {
  const m = chapeau(c);
  return !!m && m[2] === y && ((m[1] === x && m[3] === z) || (m[1] === z && m[3] === x));
};
const ecrire = (q: Q) => {
  const m = q.text.match(/sommet ([A-Z]).*?(?:avec |par |\[.)([A-Z])(?: et |\) et \[.)([A-Z])/);
  if (!m) return ["lettres illisibles"];
  return unique(q, (c) => memeAngle(c, m[2], m[1], m[3]));
};
const figureAngle = (q: Q) => {
  const l = (q.canvas as any).angle.labels;
  return unique(q, (c) => memeAngle(c, l.left, l.vertex, l.right));
};
const autreEcriture = (q: Q) => {
  const m = chapeau(q.text);
  if (!m) return ["angle illisible"];
  return unique(q, (c) => chapeau(c)?.[0] === `\\widehat{${m[3]}${m[2]}${m[1]}}`);
};
const dansTriangle = (q: Q) => {
  const l = (q.canvas as any).labels;
  const s = q.text.match(/(?:sommet|en) ([A-Z]) \?/)?.[1];
  const aut = Object.values(l).filter((x) => x !== s) as string[];
  if (!s || aut.length !== 2) return ["sommet illisible"];
  return unique(q, (c) => memeAngle(c, aut[0], s, aut[1]));
};
const cotes = (q: Q) => {
  const m = chapeau(q.text);
  if (!m) return ["angle illisible"];
  return texte(q, `[${m[2]}${m[1]}) et [${m[2]}${m[3]})`);
};
const dansRectangle = (q: Q) => {
  const r = q.text.match(/rectangle ([A-Z])([A-Z])([A-Z])([A-Z])/);
  const s = q.text.match(/en ([A-Z]) \?/)?.[1];
  if (!r || !s) return ["énoncé illisible"];
  const t = r.slice(1, 5);
  const i = t.indexOf(s);
  return unique(q, (c) => memeAngle(c, t[(i + 3) % 4], s, t[(i + 1) % 4]));
};
const rues = (q: Q) => {
  const y = q.text.match(/croisent en ([A-Z])/)?.[1];
  const a = q.text.match(/L’une passe par ([A-Z]), l’autre par ([A-Z])/);
  if (!y || !a) return ["énoncé illisible"];
  return unique(q, (c) => memeAngle(c, a[1], y, a[2]));
};

/* comparer */
const fig = (q: Q) => (q.canvas as any).angles as { deg: number; nom?: string }[];
const nomDe = (a: { nom?: string }) => a.nom ?? "";
const leChoix = (q: Q, nom: string) => {
  const l = (q.choices ?? []).filter((c) => new RegExp(`(?:^| )${nom}$`).test(c));
  return l.length === 1 ? texte(q, l[0]) : [`aucun choix pour ${nom}`];
};
const ecart = (q: Q) => {
  const d = fig(q).map((a) => a.deg);
  for (let i = 0; i < d.length; i++) for (let j = i + 1; j < d.length; j++) if (Math.abs(d[i] - d[j]) < 15) return [`écart trop petit : ${d[i]} et ${d[j]}`];
  return [];
};
const plusGrand = (q: Q) => {
  const e = ecart(q);
  if (e.length) return e;
  const a = fig(q);
  return leChoix(q, nomDe(a.reduce((m, x) => (x.deg > m.deg ? x : m))));
};
const plusPetit = (q: Q) => {
  const e = ecart(q);
  if (e.length) return e;
  const a = fig(q);
  return leChoix(q, nomDe(a.reduce((m, x) => (x.deg < m.deg ? x : m))));
};
const piege = (q: Q) => {
  const a = q.canvas as any;
  const [x, y] = a.angles;
  const pg = x.deg > y.deg ? x : y;
  const pp = x.deg > y.deg ? y : x;
  if (!(pp.longueur > pg.longueur)) return ["pas de piège : le plus grand a les plus longs côtés"];
  return leChoix(q, pg.nom);
};
const aDroit = (q: Q) => {
  const a = fig(q);
  const b = a.find((x) => x.nom === "B")!;
  if (a.find((x) => x.nom === "A")!.deg !== 90) return ["A n’est pas droit"];
  return texte(q, b.deg < 90 ? "Plus petit que l'angle droit" : "Plus grand que l'angle droit");
};
const ordre = (q: Q) => {
  const j = [...fig(q)].sort((x, y) => x.deg - y.deg).map(nomDe).join(", ");
  return texte(q, j);
};
const calque = (q: Q) => {
  const m = q.text.match(/l’angle ([A-D])\. .*? l’angle ([A-D]) :/);
  if (!m) return ["énoncé illisible"];
  const dedans = /à l’intérieur/.test(q.text);
  return texte(q, `L'angle ${dedans ? m[2] : m[1]}`);
};
const ouvert = (q: Q) => plusGrand(q);
const droitOuNon = (q: Q) => {
  const [a] = fig(q);
  if (a.deg === 90) return texte(q, "Oui, il est droit");
  return texte(q, a.deg < 90 ? "Non, il est trop fermé" : "Non, il est trop ouvert");
};

/* somme, multiple */
const degres = (q: Q) => {
  const l = nombres(q.text);
  return texte(q, ({ 2: "Un angle plat", 3: "Trois quarts de tour", 4: "Un tour complet" } as Record<number, string>)[l[0]]);
};
const fois = (q: Q) => {
  const a = fig(q);
  if (a.reduce((s, x) => s + x.deg, 0) !== 90) return ["la figure n’est pas un angle droit"];
  if (new Set(a.map((x) => x.deg)).size !== 1) return ["angles inégaux"];
  return reponse(q, a.length);
};
const vocabulaire = (q: Q) => {
  const t = q.text;
  const quarts = (s: string) => (/angle plat|demi-tour/.test(s) ? 2 : /tour complet/.test(s) ? 4 : /trois quarts/.test(s) ? 3 : /quart de tour/.test(s) ? 1 : 0);
  if (/angles? plats?/.test(t) && /tour complet/.test(t)) return reponse(q, 2);
  return reponse(q, quarts(t));
};
const total = (q: Q) => {
  const s = fig(q).reduce((x, a) => x + a.deg, 0);
  if (s !== 90 && Math.abs(s - 90) < 15) return ["somme trop proche de l’angle droit"];
  return texte(q, s === 90 ? "Un angle droit" : s < 90 ? "Plus petit qu'un angle droit" : "Plus grand qu'un angle droit");
};
const plat = (q: Q) => reponse(q, nombres(q.text)[0] * 2);
const tourEntier = (q: Q) => reponse(q, nombres(q.text)[0] * 4);
const partsTour = (q: Q) => reponse(q, nombres(q.text)[0] / 4);
const partsPlat = (q: Q) => reponse(q, nombres(q.text)[0] / 2);
const virages = (q: Q) => {
  const k = nombres(q.text)[0];
  return texte(q, ["", "Un quart de tour", "Un demi-tour", "Trois quarts de tour", "Un tour complet"][k]);
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  angle_notation_tpl_1: sommet,
  angle_notation_tpl_2: ecrire,
  angle_notation_tpl_3: figureAngle,
  angle_notation_tpl_4: autreEcriture,
  angle_notation_tpl_5: dansTriangle,
  angle_notation_tpl_6: cotes,
  angle_notation_tpl_7: dansRectangle,
  angle_notation_tpl_8: sommet,
  angle_notation_tpl_9: rues,
  angle_comparer_sans_mesure_tpl_1: plusGrand,
  angle_comparer_sans_mesure_tpl_2: plusPetit,
  angle_comparer_sans_mesure_tpl_3: piege,
  angle_comparer_sans_mesure_tpl_4: aDroit,
  angle_comparer_sans_mesure_tpl_5: ordre,
  angle_comparer_sans_mesure_tpl_6: calque,
  angle_comparer_sans_mesure_tpl_7: ouvert,
  angle_comparer_sans_mesure_tpl_8: ouvert,
  angle_comparer_sans_mesure_tpl_9: droitOuNon,
  angle_somme_multiple_tpl_1: degres,
  angle_somme_multiple_tpl_2: fois,
  angle_somme_multiple_tpl_3: vocabulaire,
  angle_somme_multiple_tpl_4: total,
  angle_somme_multiple_tpl_5: plat,
  angle_somme_multiple_tpl_6: tourEntier,
  angle_somme_multiple_tpl_7: partsTour,
  angle_somme_multiple_tpl_8: partsPlat,
  angle_somme_multiple_tpl_9: virages,
});
