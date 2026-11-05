import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { type Q, egal, justeNombre, justeTexte, justeUnique, nombres, num, valeur } from "./outils";

// Les correcteurs de nombres-entiers-trous.bank.ts. La droite graduée se relit sur
// la FIGURE (c'est elle que l'élève lit), les diviseurs et encadrements sur le texte.

type Droite = { kind: "number_line"; min: number; max: number; step: number; minorStep?: number; points: { value: number; label: string; below?: string }[] };
const fig = (q: Q) => q.canvas as unknown as Droite;
const lettre = (t: string) => t.match(/\b([A-Z])\b(?= |\.|,)/)?.[1];

/** La figure est cohérente : le point tombe sur une graduation, rien n'écrit sa valeur. */
export function figureSaine(q: Q, sansPetites = false): string[] {
  const f = fig(q);
  if (f?.kind !== "number_line") return ["figure absente"];
  const p: string[] = [];
  const pas = f.minorStep ?? f.step;
  for (const pt of f.points) {
    if (pt.below) p.push("la figure écrit la valeur");
    if (/\d/.test(pt.label)) p.push("l'étiquette du point porte un nombre");
    if (pt.value < f.min || pt.value > f.max) p.push(`point hors de la droite : ${pt.value}`);
    if (!sansPetites && !egal(((pt.value - f.min) / pas) % 1, 0)) p.push(`point ${pt.value} hors graduation (pas ${pas})`);
  }
  if ((f.max - f.min) / f.step > 7) p.push("trop de nombres écrits sur la droite");
  return p;
}

function lirePoint(q: Q) {
  const L = lettre(q.text);
  const pt = fig(q)?.points?.find((x) => x.label === L);
  if (!pt) return [`point ${L} introuvable : ${q.text}`];
  return [...figureSaine(q), ...justeNombre(q, pt.value)];
}
function pasPetit(q: Q) {
  const f = fig(q);
  return [...figureSaine(q), ...(f.step % f.minorStep! === 0 ? [] : ["le pas écrit n'est pas un multiple de la petite graduation"]), ...justeNombre(q, f.minorStep!)];
}
function placer(q: Q) {
  const n = nombres(q.text)[0];
  const f = fig(q);
  const pt = f.points.find((x) => x.value === n);
  if (!pt) return [`aucun point sur ${n}`];
  return [...figureSaine(q), ...justeTexte(q, `Point ${pt.label}`)];
}
function milieu(q: Q) {
  const f = fig(q);
  const [pt] = f.points;
  const j = Math.floor(pt.value / f.step) * f.step + f.step / 2;
  if (!egal(pt.value, j)) return [`le point n'est pas au milieu : ${pt.value}`];
  return [...figureSaine(q, true), ...justeNombre(q, j)];
}
function ecart(q: Q) {
  const f = fig(q);
  const [L1, L2] = [...q.text.matchAll(/\b([A-Z])\b/g)].map((m) => m[1]);
  const a = f.points.find((x) => x.label === L1), b = f.points.find((x) => x.label === L2);
  if (!a || !b) return ["points illisibles"];
  return [...figureSaine(q), ...justeNombre(q, Math.abs(b.value - a.value))];
}
/** Le plus petit nombre du texte est le diviseur testé. */
function diviseurOuiNon(q: Q) {
  const [x, y] = nombres(q.text);
  return justeTexte(q, Math.max(x, y) % Math.min(x, y) === 0 ? "Oui" : "Non");
}
function diviseurReste(q: Q) {
  const [n, d, a, r] = nombres(q.text);
  const p: string[] = [];
  if (a * d + r !== n || r >= d) p.push(`division fausse : ${n} ÷ ${d} = ${a} reste ${r}`);
  return [...p, ...justeTexte(q, n % d === 0 ? "Oui" : "Non")];
}
const diviseurDans = (n: number, q: Q) => justeUnique(q, (c) => { const v = valeur(c); return v !== null && n % v === 0; });
function produitDiviseur(q: Q) {
  const [a, b, n] = nombres(q.text);
  return [...(a * b === n ? [] : ["produit faux"]), ...diviseurDans(n, q)];
}
const premierDivise = (q: Q) => diviseurDans(nombres(q.text)[0], q);
function aPourDiviseur(q: Q) {
  const d = nombres(q.text)[0];
  return justeUnique(q, (c) => { const v = valeur(c); return v !== null && v % d === 0; });
}
function range(q: Q) {
  const [n, d] = nombres(q.text);
  return justeTexte(q, n % d === 0 ? "Oui" : "Non");
}
function compter(q: Q) {
  const l = nombres(q.text);
  const n = l[l.length - 1];
  return justeNombre(q, l.slice(0, -1).filter((x) => n % x === 0).length);
}
function resteDit(q: Q) {
  const m = q.text.match(/(\d+) ÷ (\d+)/);
  if (!m) return ["division illisible"];
  const n = Number(m[1]), d = Number(m[2]);
  // Le reste : le nombre du texte qui n'est pas dans « n ÷ d ».
  const r = nombres(q.text.replace(m[0], " "))[0];
  if (n % d !== r) return [`reste écrit ${r}, juste ${n % d}`];
  return justeTexte(q, n % d === 0 ? `${d} est un diviseur de ${n}` : `${d} n’est pas un diviseur de ${n}`);
}
function entreOuiNon(q: Q) {
  const l = nombres(q.text);
  const [n, a, b] = /</.test(q.text) ? [l[1], l[0], l[2]] : l;
  return justeTexte(q, n > a && n < b ? "Oui" : "Non");
}
function deuxDiviseurs(q: Q) {
  const [a, b] = nombres(q.text);
  return justeUnique(q, (c) => { const v = valeur(c)!; return v % a === 0 && v % b === 0; });
}
function entreBornes(q: Q) {
  const [a, b] = nombres(q.text);
  return justeUnique(q, (c) => { const v = valeur(c)!; return v > a && v < b; });
}
function dizaine(q: Q) {
  const n = nombres(q.text)[0];
  const a = Math.floor(n / 10) * 10;
  return justeNombre(q, /après|suivante|qui suit|au-dessus|et quelle/.test(q.text) && !/juste après quelle/.test(q.text) ? a + 10 : a);
}
function encadrement(q: Q) {
  const n = nombres(q.text)[0];
  const p = /dizaine/.test(q.text) ? 10 : /centaine/.test(q.text) ? 100 : /millier/.test(q.text) ? 1000 : 0;
  if (!p) return ["unité d'encadrement illisible"];
  const a = Math.floor(n / p) * p;
  return justeUnique(q, (c) => { const [x, y, z] = c.split(" < ").map(num); return x === a && y === n && z === a + p; });
}
function encadrementDroite(q: Q) {
  const f = fig(q);
  const a = Math.floor(f.points[0].value / f.step) * f.step;
  return [...figureSaine(q), ...justeUnique(q, (c) => { const [x, y] = nombres(c); return x === a && y === a + f.step; })];
}
function compterEntre(q: Q) {
  const [a, b] = nombres(q.text);
  return justeNombre(q, b - a - 1);
}
function mystere(q: Q) {
  const [a, b, u] = nombres(q.text);
  return justeUnique(q, (c) => { const v = valeur(c)!; return v > a && v < b && v % 10 === u; });
}

const P = "cm1_entier_droite_tpl_", V = "cm1_entier_diviseur_tpl_", E = "cm1_entier_encadrer_tpl_";
export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  [`${P}1`]: lirePoint, [`${P}2`]: pasPetit, [`${P}3`]: placer, [`${P}4`]: lirePoint, [`${P}5`]: lirePoint, [`${P}6`]: milieu, [`${P}7`]: ecart, [`${P}8`]: lirePoint,
  [`${V}1`]: diviseurOuiNon, [`${V}2`]: produitDiviseur, [`${V}3`]: premierDivise, [`${V}4`]: aPourDiviseur, [`${V}5`]: diviseurReste, [`${V}6`]: range, [`${V}7`]: premierDivise, [`${V}8`]: compter, [`${V}9`]: deuxDiviseurs, [`${V}10`]: resteDit,
  [`${E}1`]: entreBornes, [`${E}2`]: dizaine, [`${E}3`]: encadrement, [`${E}4`]: entreBornes, [`${E}5`]: encadrementDroite, [`${E}6`]: encadrement, [`${E}7`]: entreBornes, [`${E}8`]: compterEntre, [`${E}9`]: mystere, [`${E}10`]: entreOuiNon,
});
