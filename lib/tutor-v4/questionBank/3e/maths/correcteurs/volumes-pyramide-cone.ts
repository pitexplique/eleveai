import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { NB, num, verifierReponse } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/grandeurs";
import { correcteursPyramideCone } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/volumes-pyramide-cone";

// La réduction : relit le volume et le rapport dans le TEXTE, refait k³. Vide = juste.
type Q = TutorGeneratedQuestionV4;

const DIVISEUR: [RegExp, number][] = [
  [/(?:rapport(?: de réduction de)?|réduction de rapport) (?:un demi|0,5)/, 2],
  [/(?:rapport(?: de réduction de)?|réduction de rapport) un tiers/, 3],
  [/(?:rapport(?: de réduction de)?|réduction de rapport) un quart/, 4],
  [/(?:rapport(?: de réduction de)?|réduction de rapport) 0,2/, 5],
  [/la moitié/, 2],
  [/le tiers/, 3],
  [/le quart/, 4],
];
const volumes = (t: string) => [...t.matchAll(new RegExp(`${NB} (cm|dm|m)³`, "g"))].map((m) => ({ v: num(m[1]), u: `${m[2]}³` }));
const diviseur = (t: string) => DIVISEUR.find(([re]) => re.test(t))?.[1] ?? null;

function reduit(q: Q) {
  const [V] = volumes(q.text);
  const d = diviseur(q.text);
  if (!V || !d) return ["volume ou rapport illisibles"];
  return verifierReponse(q, V.v / d ** 3, V.u);
}
function diviseQuand(q: Q) {
  const d = q.text.match(/divisées par (\d+)/)?.[1];
  if (!d) return ["rapport illisible"];
  const juste = `divisé par ${Number(d) ** 3}`;
  return [...(q.expected[0] === juste ? [] : [`attendu ${juste}`]), ...qcmUnique(q, (x) => x === juste)];
}
function aDuSommet(q: Q) {
  const [V] = volumes(q.text);
  const H = q.text.match(new RegExp(`[Hh]auteur(?: :| de)? ${NB} `))?.[1];
  const p = q.text.match(new RegExp(`à ${NB} (?:cm|dm|m) du sommet`))?.[1];
  if (!V || !H || !p) return ["volume, hauteur ou distance au sommet illisibles"];
  const k = num(p) / num(H);
  return verifierReponse(q, V.v * k ** 3, V.u);
}
function verre(q: Q) {
  const V = q.text.match(new RegExp(`${NB} cL`))?.[1];
  const d = diviseur(q.text);
  if (!V || !d) return ["contenance ou hauteur illisibles"];
  return verifierReponse(q, num(V) / d ** 3, "cL");
}
function tronc(q: Q) {
  const [V] = volumes(q.text);
  const d = diviseur(q.text);
  if (!V || !d) return ["volume ou rapport illisibles"];
  return verifierReponse(q, V.v - V.v / d ** 3, V.u);
}
function rapport(q: Q) {
  const [G, P] = volumes(q.text);
  if (!G || !P) return ["deux volumes attendus"];
  const juste = Math.cbrt(G.v / P.v);
  return Math.abs(Number(q.expected[0]) - juste) < 1e-9 ? [] : [`attendu ${q.expected[0]}, juste ${juste}`];
}

const P = "3e_volume_pyramide_cone_reduction_tpl_";
export const CORRECTEURS: CorrecteursMaths = {
  ...correcteursPyramideCone("3e_"),
  [`${P}1`]: reduit,
  [`${P}2`]: diviseQuand,
  [`${P}3`]: aDuSommet,
  [`${P}4`]: verre,
  [`${P}5`]: tronc,
  [`${P}6`]: rapport,
};
