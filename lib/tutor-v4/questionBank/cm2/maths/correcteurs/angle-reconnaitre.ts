import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/types";
import { idAngleReconnaitre, PLAN_ANGLE_RECONNAITRE } from "../angle-reconnaitre.bank";
import { nombres, reponse, texte, type Q } from "./outils";

// LES CORRECTEURS DE angle-reconnaitre.bank.ts (CM1 et CM2). Vide = juste. Ils lisent le
// sommet et l'ouverture sur la figure, ou la phrase de l'énoncé ; aucun ne reçoit la réponse
// du gabarit.

const angle = (q: Q) => (q.canvas as any).angle as { angleDeg: number; labels: { vertex: string; left: string; right: string } };
const angles = (q: Q) => (q.canvas as any).angles as { deg: number; nom: string; longueur: number }[];

const regles = (q: Q) => {
  const p: string[] = [];
  if (/\d\s*°|degré|rapporteur|widehat/i.test(JSON.stringify([q.text, q.choices, q.explanation, (q.canvas as any)?.angle?.labels]))) p.push("degré, rapporteur ou chapeau dans la question");
  if ((q.canvas as any)?.angle?.display?.showMeasure) p.push("la figure affiche la mesure");
  if ((q.canvas as any)?.angle?.display?.showRightAngle) p.push("la figure code l'angle droit : elle donne la réponse");
  if (q.format !== "qcm") p.push("question ouverte au cours moyen");
  return p;
};

const lePoint = (q: Q, x: string) => texte(q, `Le point ${x}`);

const sommet = (q: Q) => lePoint(q, angle(q).labels.vertex);
const pointNomme = (q: Q) => q.text.match(/point ([A-Z])/)?.[1];

const s2 = (q: Q) => {
  const x = pointNomme(q);
  const { vertex, left, right } = angle(q).labels;
  if (!x || ![vertex, left, right].includes(x)) return ["point illisible"];
  return texte(q, x === vertex ? "Le sommet de l'angle" : "Le bout d'un côté");
};
const s3 = (q: Q) => {
  const x = pointNomme(q);
  const { vertex, left, right } = angle(q).labels;
  if (!x || ![vertex, left, right].includes(x)) return ["point illisible"];
  return texte(q, x === vertex ? "Vrai" : "Faux");
};
const s4 = (q: Q) => (/angles|sommets/.test(q.text) ? reponse(q, angles(q).length) : ["énoncé illisible"]);
const s5 = (q: Q) => (String(q.expected[0]).startsWith("Deux ") && String(q.expected[0]).endsWith("qui partent du même point") ? [] : [`attendu « ${q.expected[0]} »`]);
const s6 = (q: Q) => reponse(q, /côtés/.test(q.text) ? 2 : /sommets/.test(q.text) ? 1 : NaN);

const m1 = (q: Q) => {
  const { vertex: s, left: a, right: b } = angle(q).labels;
  const j = (q.choices ?? []).filter((c) => c === `${s}${a}` || c === `${s}${b}`);
  return j.length === 1 && j[0] === q.expected[0] ? [] : [`côté faux : ${q.choices?.join(" | ")}`];
};
const m2 = (q: Q) => {
  const { vertex: s, left: a, right: b } = angle(q).labels;
  return texte(q, `${s}${a} et ${s}${b}`);
};
const m3 = (q: Q) => {
  const m = q.text.match(/\b([A-Z])([A-Z]) et ([A-Z])([A-Z])\b/);
  if (!m) return ["côtés illisibles"];
  const commun = [m[1], m[2]].filter((x) => x === m[3] || x === m[4]);
  return commun.length === 1 ? lePoint(q, commun[0]) : ["pas un seul point commun"];
};
const m4 = (q: Q) => reponse(q, 2 * angles(q).length);
const m5 = (q: Q) => {
  const grand = /plus ouvert|plus grand/.test(q.text);
  const tri = [...angles(q)].sort((a, b) => a.deg - b.deg);
  const ecart = tri.some((a, i) => i > 0 && a.deg - tri[i - 1].deg < 20);
  return [...(ecart ? ["deux ouvertures trop proches pour l'œil"] : []), ...texte(q, `L'angle ${(grand ? tri[tri.length - 1] : tri[0]).nom}`)];
};
const m6 = (q: Q) => {
  const [x, y] = angles(q);
  const j = x.deg === y.deg ? "Ils sont égaux" : `L'angle ${x.deg > y.deg ? x.nom : y.nom}`;
  const long = x.longueur > y.longueur ? x.nom : y.nom;
  const p: string[] = [];
  if (!q.text.includes(`côtés de ${long} sont plus longs`)) p.push("le texte et la figure ne disent pas le même côté long");
  if (/même ouverture/.test(q.text) !== (x.deg === y.deg)) p.push("le texte et la figure ne disent pas la même ouverture");
  if (x.deg !== y.deg && !q.text.includes(`L’angle ${x.deg > y.deg ? x.nom : y.nom} est plus ouvert`)) p.push("le texte contredit la figure");
  if (x.deg !== y.deg && long === (x.deg > y.deg ? x.nom : y.nom)) p.push("pas de piège : le plus grand a les plus longs côtés");
  return [...p, ...texte(q, j)];
};
const FAUX_M7 = /trois côtés|deux sommets|c.est une longueur|agrandit|au milieu d.un côté|ne se touchent pas|plus les côtés sont longs|deux points différents/i;
const VRAI_M7 = /a deux côtés|un seul sommet|partent du même point|point commun|montre une ouverture|ne change pas|peuvent être égaux|sans instrument/;
const m7 = (q: Q) => {
  const f = FAUX_M7.test(q.text);
  const w = VRAI_M7.test(q.text);
  return f === w ? ["phrase hors table"] : texte(q, f ? "Faux" : "Vrai");
};
const m8 = (q: Q) => {
  const d = angle(q).angleDeg;
  return texte(q, d < 90 ? "Il reste caché sous le coin" : d === 90 ? "Il colle au coin" : "Il dépasse du coin");
};

const TABLE_OBJETS: [RegExp, string, string][] = [
  [/ciseaux/, "le clou qui tient les lames", "les deux lames"],
  [/compas/, "la charnière du haut", "les deux branches"],
  [/horloge/, "le centre du cadran", "les deux aiguilles"],
  [/éventail/, "le point où les brins se rejoignent", "les deux brins du bord"],
  [/porte/, "la charnière", "la porte et le mur"],
  [/livre/, "le dos du livre", "les deux couvertures"],
  [/routes/, "le carrefour", "les deux routes"],
  [/coin d.une feuille/, "la pointe du coin", "les deux bords du coin"],
  [/équerre/, "le coin droit de l'équerre", "les deux bords du coin droit"],
  [/toit/, "le haut du toit", "les deux pentes"],
  [/bras plié/, "le coude", "le bras et l'avant-bras"],
  [/jambe/, "le genou", "la cuisse et le mollet"],
  [/pince/, "le ressort", "les deux branches"],
  [/ordinateur/, "la charnière", "l'écran et le clavier"],
];
const objet = (q: Q) => TABLE_OBJETS.find(([re]) => re.test(q.text.split(". ")[0]));
const c1 = (q: Q) => {
  const l = objet(q);
  return l ? texte(q, l[1]) : ["objet hors table"];
};
const c2 = (q: Q) => {
  const l = objet(q);
  return l ? texte(q, l[2]) : ["objet hors table"];
};
const c3 = (q: Q) => {
  const lu = [...q.text.matchAll(/(.+?) ([AB]) a de (longs|longues|courts|courtes) .+? est (à peine|grand|grande) /g)];
  if (lu.length !== 2) return ["énoncé illisible"];
  const ouvert = lu.find((m) => m[4] !== "à peine");
  const ferme = lu.find((m) => m[4] === "à peine");
  if (!ouvert || !ferme) return ["pas un ouvert et un fermé"];
  const j = /plus grand angle/.test(q.text) ? ouvert : ferme;
  return texte(q, `${j[1].trim().split(/(?<=[.?]) /).pop()} ${j[2]}`);
};
const c4 = (q: Q) => {
  const h = nombres(q.text)[0];
  const n = Math.min(h, 12 - h);
  return texte(q, n < 3 ? "Il reste sous le coin" : n === 3 ? "Il colle au coin" : "Il dépasse du coin");
};
const c5 = (q: Q) => {
  const j = /dépasse du coin|sort du coin/.test(q.text) ? "obtus" : /caché/.test(q.text) ? "aigu" : /collent|même ouverture/.test(q.text) ? "droit" : "";
  return j ? texte(q, j) : ["énoncé illisible"];
};
const c6 = (q: Q) => {
  const d = angle(q).angleDeg;
  return texte(q, d < 90 ? "aigu" : d === 90 ? "droit" : "obtus");
};
const c7 = (q: Q) => {
  const { vertex, left, right } = angle(q).labels;
  return q.text.includes(`${left} et ${right}.`) ? lePoint(q, vertex) : ["le texte ne nomme pas les arrivées de la figure"];
};

const PAR_CLE: Record<string, (q: Q) => string[]> = { s1: sommet, s2, s3, s4, s5, s6, m1, m2, m3, m4, m5, m6, m7, m8, c1, c2, c3, c4, c5, c6, c7 };

export const correcteursAngleReconnaitre = (niveau: "cm1" | "cm2"): CorrecteursMaths =>
  Object.fromEntries(PLAN_ANGLE_RECONNAITRE.map((g) => [idAngleReconnaitre(niveau, g), (q: Q) => [...regles(q), ...PAR_CLE[g.cle](q)]]));
