import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { diviseurs, egal, liste, nombres, pgcd, reponse, texte, unique, valeur, type Q } from "./outils";

// LES CORRECTEURS DE entiers-diviseurs.bank.ts : ils relisent le texte ou la figure
// envoyée à l'élève, et refont le calcul. Vide = juste.

const ppcm = (a: number, b: number) => (a * b) / pgcd(a, b);
const fig = (q: Q) => q.canvas as any;

/* ───── droite ───── */
function pointSurGraduation(f: any, x: number): string[] {
  const k = (x - f.min) / f.minorStep;
  if (!egal(k, Math.round(k))) return [`le point ${x} n'est pas sur une graduation`];
  if (x < f.min || x > f.max) return [`le point ${x} sort de la droite`];
  return [];
}
function lirePoint(q: Q) {
  const f = fig(q);
  const L = q.text.match(/point ([A-Z])\b/)?.[1];
  const p = f?.points?.find((x: any) => x.label === L);
  if (!p) return ["point illisible"];
  return [...reponse(q, p.value), ...pointSurGraduation(f, p.value)];
}
function petitPas(q: Q) {
  const f = fig(q);
  if (!Number.isInteger(f.step / f.minorStep)) return ["graduations irrégulières"];
  return reponse(q, f.minorStep);
}
function avance(q: Q) {
  // Le pas est écrit d'abord ; « k traits » et le départ se reconnaissent ensuite.
  const pas = nombres(q.text)[0];
  const k = Number(q.text.match(/(\d+) traits/)?.[1]);
  const sansK = q.text.replace(/\d+ traits/, " ");
  const n = nombres(sansK);
  const a = n[n.length - 1];
  if (!k || !a) return ["données illisibles"];
  return reponse(q, a + k * pas);
}
function quelPoint(q: Q) {
  const f = fig(q);
  const [x] = nombres(q.text);
  const p = f.points.filter((y: any) => egal(y.value, x));
  if (p.length !== 1) return [`${p.length} point(s) sur ${x}`];
  return [...f.points.flatMap((y: any) => pointSurGraduation(f, y.value)), ...texte(q, `Le point ${p[0].label}`)];
}
function milieu(q: Q) {
  const [a, b] = nombres(q.text);
  return reponse(q, (a + b) / 2);
}
function avancePas(q: Q) {
  const pas = nombres(q.text)[0];
  const a = nombres(q.text.match(/(?:marque |est à )([\d ]+) m/)?.[1] ?? "")[0];
  const k = Number(q.text.match(/(\d+) (?:traits|graduations)/)?.[1]);
  if (!a || !k) return ["données illisibles"];
  return reponse(q, a + k * pas, "m");
}

/* ───── diviseur ───── */
const ouiNon = (q: Q, oui: boolean) => texte(q, oui ? "Oui" : "Non");
function estDiviseur(q: Q) {
  const [x, y] = nombres(q.text);
  // « d est-il un diviseur de n » ou « n se divise-t-il par d » ou « la division de n par d ».
  const nd = /se divise-t-il|division de/.test(q.text) ? [x, y] : [y, x];
  return ouiNon(q, nd[0] % nd[1] === 0);
}
function unDiviseurParmi(q: Q) {
  const [n] = nombres(q.text);
  return unique(q, (c) => n % valeur(c) === 0);
}
function manqueTable(q: Q) {
  const [q2, n] = nombres(q.text);
  return reponse(q, n / q2);
}
function pasDiviseur(q: Q) {
  const [n] = nombres(q.text);
  return unique(q, (c) => n % valeur(c) !== 0);
}
function autreDiviseur(q: Q) {
  const n = nombres(q.text);
  // « d est un diviseur de n », « On sait que d divise n » ; ou « Le nombre n a pour diviseur d », « n se divise par d ».
  const [d, N] = /^Le nombre|se divise par/.test(q.text) ? [n[1], n[0]] : [n[0], n[1]];
  return reponse(q, N / d);
}
function nombreQuiADiviseur(q: Q) {
  const [d] = nombres(q.text);
  return unique(q, (c) => valeur(c) % d === 0);
}
function partageOuiNon(q: Q) {
  const [n, d] = nombres(q.text);
  return ouiNon(q, n % d === 0);
}
function partageParts(q: Q) {
  const [n] = nombres(q.text);
  return unique(q, (c) => n % valeur(c) === 0);
}

/* ───── tous les diviseurs ───── */
const memeListe = (a: number[], b: number[]) => a.length === b.length && a.every((x, i) => x === b[i]);
function tous(q: Q) {
  const [n] = nombres(q.text);
  if (n > 30) return [`${n} dépasse 30`];
  return unique(q, (c) => memeListe(liste(c), diviseurs(n)));
}
function extreme(q: Q) {
  const [n] = nombres(q.text);
  return reponse(q, /plus petit/.test(q.text) ? 1 : n);
}
function partenaire(q: Q) {
  const l = nombres(q.text);
  return reponse(q, Math.max(...l) / l.find((x) => x !== Math.max(...l))!);
}
function nbDiviseurs(q: Q) {
  const [n] = nombres(q.text);
  return reponse(q, diviseurs(n).length);
}
function colonnes(q: Q) {
  const [n, d] = nombres(q.text);
  const f = fig(q);
  if (f && f.grid.rows * f.grid.cols !== n) return ["figure fausse"];
  return reponse(q, n / d);
}
function oublie(q: Q) {
  const [N, ...montres] = nombres(q.text);
  const manque = diviseurs(N).filter((x) => !montres.includes(x));
  if (manque.length !== 1) return [`il manque ${manque.length} diviseurs`];
  return reponse(q, manque[0]);
}
function rectangles(q: Q) {
  const [n] = nombres(q.text);
  return reponse(q, Math.ceil(diviseurs(n).length / 2));
}
function devinette(q: Q) {
  const l = nombres(q.text);
  const n = Math.max(...l);
  if (!memeListe(l, diviseurs(n))) return ["la liste n'est pas celle des diviseurs"];
  return reponse(q, n);
}

/* ───── diviseurs communs ───── */
const deux = (t: string) => {
  const m = t.match(/(\d+) et (?:aussi )?(\d+)/);
  if (m) return [Number(m[1]), Number(m[2])];
  const n = nombres(t);
  return [n[0], n[1]];
};
function communParmi(q: Q) {
  const [a, b] = deux(q.text);
  return unique(q, (c) => a % valeur(c) === 0 && b % valeur(c) === 0);
}
function communListes(q: Q) {
  const [a, b] = [...q.text.matchAll(/Diviseurs de (\d+)/g)].map((m) => Number(m[1]));
  return unique(q, (c) => a % valeur(c) === 0 && b % valeur(c) === 0);
}
function communOuiNon(q: Q) {
  const [x, a, b] = nombres(q.text);
  return ouiNon(q, a % x === 0 && b % x === 0);
}
function communsTous(q: Q) {
  const [a, b] = deux(q.text);
  const j = diviseurs(a).filter((x) => b % x === 0);
  if (a > 30 || b > 30) return ["au-delà de 30"];
  return unique(q, (c) => memeListe(liste(c), j));
}
function plusGrandCommun(q: Q) {
  const [a, b] = deux(q.text);
  return reponse(q, pgcd(a, b));
}
function nbCommuns(q: Q) {
  const [a, b] = deux(q.text);
  return reponse(q, diviseurs(a).filter((x) => b % x === 0).length);
}
function lots(q: Q) {
  const [a, b] = nombres(q.text);
  return unique(q, (c) => a % valeur(c) === 0 && b % valeur(c) === 0);
}
function groupesMax(q: Q) {
  const n = nombres(q.text);
  return reponse(q, pgcd(n[0], n[1]));
}

/* ───── multiples communs ───── */
function multipleCommun(q: Q) {
  const [a, b] = nombres(q.text);
  if (a >= 15 || b >= 15) return ["au-delà de 15"];
  return unique(q, (c) => valeur(c) % a === 0 && valeur(c) % b === 0);
}
function multipleOuiNon(q: Q) {
  const [x, a, b] = nombres(q.text);
  return ouiNon(q, x % a === 0 && x % b === 0);
}
function multipleTables(q: Q) {
  const [a, b] = [...q.text.matchAll(/Table de (\d+)/g)].map((m) => Number(m[1]));
  return [...reponse(q, ppcm(a, b)), ...unique(q, (c) => valeur(c) % a === 0 && valeur(c) % b === 0)];
}
function premierCommun(q: Q) {
  const n = nombres(q.text.replace(/compter 0/, "").replace(/après 0/i, ""));
  return reponse(q, ppcm(n[0], n[1]));
}
function sauts(q: Q) {
  const f = fig(q);
  const [a, , b] = nombres(q.text);
  if (f.step !== a || f.points[0].value !== b) return ["figure différente du texte"];
  return reponse(q, ppcm(a, b));
}
function multipleNumero(q: Q) {
  const t = q.text.replace(/compter 0/, "").replace(/après 0/i, "");
  const k = Number(t.match(/(?:numéro|position) (\d+)/)?.[1]);
  const m = t.match(/de (\d+) et (\d+)/);
  if (!k || !m) return ["illisible"];
  return reponse(q, ppcm(Number(m[1]), Number(m[2])) * k);
}
function rendezVous(q: Q) {
  const m = q.text.match(/toutes les (\d+) minutes,.* toutes les (\d+) minutes/);
  if (!m) return ["périodes illisibles"];
  return reponse(q, ppcm(Number(m[1]), Number(m[2])), "min");
}
function parLots(q: Q) {
  const [a, b] = nombres(q.text);
  return reponse(q, ppcm(a, b));
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  entier_droite_tpl_1: lirePoint,
  entier_droite_tpl_2: petitPas,
  entier_droite_tpl_3: avance,
  entier_droite_tpl_4: quelPoint,
  entier_droite_tpl_5: lirePoint,
  entier_droite_tpl_6: milieu,
  entier_droite_tpl_7: lirePoint,
  entier_droite_tpl_8: avancePas,
  entier_diviseur_tpl_1: estDiviseur,
  entier_diviseur_tpl_2: unDiviseurParmi,
  entier_diviseur_tpl_3: manqueTable,
  entier_diviseur_tpl_4: pasDiviseur,
  entier_diviseur_tpl_5: autreDiviseur,
  entier_diviseur_tpl_6: nombreQuiADiviseur,
  entier_diviseur_tpl_7: partageOuiNon,
  entier_diviseur_tpl_8: partageParts,
  entier_diviseurs_tous_tpl_1: tous,
  entier_diviseurs_tous_tpl_2: extreme,
  entier_diviseurs_tous_tpl_3: partenaire,
  entier_diviseurs_tous_tpl_4: nbDiviseurs,
  entier_diviseurs_tous_tpl_5: colonnes,
  entier_diviseurs_tous_tpl_6: oublie,
  entier_diviseurs_tous_tpl_7: nbDiviseurs,
  entier_diviseurs_tous_tpl_8: rectangles,
  entier_diviseurs_tous_tpl_9: devinette,
  entier_diviseurs_communs_tpl_1: communParmi,
  entier_diviseurs_communs_tpl_2: communListes,
  entier_diviseurs_communs_tpl_3: communOuiNon,
  entier_diviseurs_communs_tpl_4: communsTous,
  entier_diviseurs_communs_tpl_5: plusGrandCommun,
  entier_diviseurs_communs_tpl_6: nbCommuns,
  entier_diviseurs_communs_tpl_7: lots,
  entier_diviseurs_communs_tpl_8: groupesMax,
  entier_multiples_communs_tpl_1: multipleCommun,
  entier_multiples_communs_tpl_2: multipleOuiNon,
  entier_multiples_communs_tpl_3: multipleTables,
  entier_multiples_communs_tpl_4: premierCommun,
  entier_multiples_communs_tpl_5: sauts,
  entier_multiples_communs_tpl_6: multipleNumero,
  entier_multiples_communs_tpl_7: rendezVous,
  entier_multiples_communs_tpl_8: parLots,
});
