import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { type Q, justeNombre, justeTexte, justeUnique } from "../../../cm1/maths/correcteurs/outils";
import { type Critere, type Objet, communs, critereDans, critereParLabel, domaineDe, intrusUnique, lireListe, objetDe, sat } from "../../../tri-donnees";

// Les correcteurs de trier-classer.bank.ts (CE1) : relisent le critère dans le texte et les
// éléments sur la figure, retrouvent leurs propriétés, et refont le tri. Vide = juste.

const fig = (q: Q) => q.canvas as any;
const et = (...l: string[][]) => l.flat();
const objetsDe = (noms: string[]) => noms.map((n) => objetDe(n));

/** Un objet inconnu des données, c'est une faute : on ne corrige que ce qu'on sait. */
function choixConnus(q: Q): string[] {
  return objetsDe(q.choices ?? []).every(Boolean) ? [] : [`proposition inconnue : ${(q.choices ?? []).join(" | ")}`];
}

function qui(forme: "label" | "neg") {
  return (q: Q) => {
    const k = critereDans(q.text, forme);
    if (!k) return [`critère illisible : ${q.text}`];
    const veut = forme === "label";
    return et(choixConnus(q), justeUnique(q, (c) => { const x = objetDe(c); return !!x && sat(x, k) === veut; }));
  };
}

function sauf(q: Q) {
  const k = critereDans(q.text, "pl");
  if (!k) return [`critère illisible : ${q.text}`];
  return et(choixConnus(q), justeUnique(q, (c) => { const x = objetDe(c); return !!x && !sat(x, k); }));
}

function vaAvec(q: Q) {
  const m = q.text.match(/: ([^.]+)\./);
  const g = m && lireListe(m[1]);
  if (!g) return [`groupe illisible : ${q.text}`];
  const partages = communs(g, domaineDe(g[0]).criteres);
  if (!partages.length) return ["le groupe n'a pas de point commun"];
  return et(choixConnus(q), justeUnique(q, (c) => { const x = objetDe(c); return !!x && partages.some((k) => sat(x, k)); }));
}

function intrus(q: Q) {
  const l = objetsDe(q.choices ?? []);
  if (!l.every(Boolean)) return choixConnus(q);
  const r = intrusUnique(l as Objet[], domaineDe(l[0]!).criteres);
  if (!r) return [`pas d'intrus unique parmi ${(q.choices ?? []).join(" | ")}`];
  return justeTexte(q, r.nom);
}

function critereDesGroupes(q: Q) {
  const f = fig(q);
  if (f?.kind !== "ensembles" || !f.disjoints) return ["figure absente"];
  const g1 = objetsDe(f.elements.filter((e: any) => e.dans[0] === 0).map((e: any) => e.nom));
  const g2 = objetsDe(f.elements.filter((e: any) => e.dans[0] === 1).map((e: any) => e.nom));
  if (![...g1, ...g2].every(Boolean) || !g1.length || !g2.length) return ["groupes illisibles"];
  const separe = (k: Critere) => (g1 as Objet[]).every((x) => sat(x, k)) && (g2 as Objet[]).every((x) => !sat(x, k));
  const p: string[] = [];
  for (const c of q.choices ?? []) if (!critereParLabel(c)) p.push(`critère inconnu : ${c}`);
  return et(p, justeUnique(q, (c) => { const k = critereParLabel(c); return !!k && separe(k); }));
}

function combienListe(q: Q) {
  const m = q.text.match(/: ([^.]+)\./);
  const l = m && lireListe(m[1]);
  if (!l) return [`liste illisible : ${q.text}`];
  const k = critereDans(q.text.slice(q.text.indexOf(m![0]) + m![0].length), "pl");
  if (!k) return [`critère illisible : ${q.text}`];
  return justeNombre(q, l.filter((x) => sat(x, k)).length);
}

/* ── les deux ensembles ── */
type Lu = { a: Critere; b: Critere; l: Objet[] };
function lireFigure(q: Q): Lu | string {
  const f = fig(q);
  if (f?.kind !== "ensembles" || f.ensembles.length !== 2) return "figure absente";
  const a = critereParLabel(f.ensembles[0]);
  const b = critereParLabel(f.ensembles[1]);
  if (!a || !b) return `ensembles illisibles : ${f.ensembles.join(" | ")}`;
  const l: Objet[] = [];
  for (const e of f.elements) {
    const x = objetDe(e.nom);
    if (!x) return `élément inconnu : ${e.nom}`;
    const vrai = [...(sat(x, a) ? [0] : []), ...(sat(x, b) ? [1] : [])];
    if (vrai.join() !== [...e.dans].sort().join()) return `${e.nom} est mal placé`;
    l.push(x);
  }
  return { a, b, l };
}
const avec = (f: (q: Q, z: Lu) => string[]) => (q: Q) => {
  const z = lireFigure(q);
  return typeof z === "string" ? [z] : f(q, z);
};
/** Le premier ensemble nommé dans le texte. */
const premier = (q: Q, z: Lu) => (q.text.indexOf(`« ${z.b.label} »`) >= 0 && (q.text.indexOf(`« ${z.a.label} »`) < 0 || q.text.indexOf(`« ${z.b.label} »`) < q.text.indexOf(`« ${z.a.label} »`)) ? z.b : z.a);
const second = (q: Q, z: Lu) => (premier(q, z) === z.a ? z.b : z.a);

const dansA = avec((q, z) => { const k = premier(q, z); return justeUnique(q, (c) => { const x = objetDe(c); return !!x && sat(x, k); }); });
const dansDeux = avec((q, z) => justeUnique(q, (c) => { const x = objetDe(c); return !!x && sat(x, z.a) && sat(x, z.b); }));
const seul = avec((q, z) => { const k = premier(q, z); const m = second(q, z); return justeUnique(q, (c) => { const x = objetDe(c); return !!x && sat(x, k) && !sat(x, m); }); });
const nbDeux = avec((q, z) => justeNombre(q, z.l.filter((x) => sat(x, z.a) && sat(x, z.b)).length));
const nbSeul = avec((q, z) => { const k = premier(q, z); const m = second(q, z); return justeNombre(q, z.l.filter((x) => sat(x, k) && !sat(x, m)).length); });
const nbTout = avec((q, z) => {
  const k = critereDans(q.text, "pl") ?? critereDans(q.text, "label");
  if (!k) return [`critère illisible : ${q.text}`];
  return justeNombre(q, z.l.filter((x) => sat(x, k)).length);
});
const ou = avec((q, z) => {
  const m = q.text.match(/(?:Où va|placer|ranger|ajoute) (?:le nombre |l'|le |la )([^?.]+?)(?: \?|\.)/);
  const x = m && objetDe(m[1]);
  if (!x) return [`objet illisible : ${q.text}`];
  if (z.l.some((y) => y.nom === x.nom)) return [`${x.nom} est déjà sur la figure : la réponse se lirait`];
  const juste = sat(x, z.a) ? (sat(x, z.b) ? "Dans les deux" : `Dans « ${z.a.label} » seulement`) : sat(x, z.b) ? `Dans « ${z.b.label} » seulement` : "En dehors";
  return justeTexte(q, juste);
});

const ID = "ce1_tri_critere_tpl_";
const IE = "ce1_tri_ensembles_tpl_";
export const CORRECTEURS: CorrecteursMaths = {
  [`${ID}1`]: qui("label"),
  [`${ID}2`]: sauf,
  [`${ID}3`]: vaAvec,
  [`${ID}4`]: qui("neg"),
  [`${ID}5`]: intrus,
  [`${ID}6`]: critereDesGroupes,
  [`${ID}7`]: qui("label"),
  [`${ID}8`]: critereDesGroupes,
  [`${ID}9`]: combienListe,
  [`${IE}1`]: dansA,
  [`${IE}2`]: dansDeux,
  [`${IE}3`]: seul,
  [`${IE}4`]: nbDeux,
  [`${IE}5`]: nbSeul,
  [`${IE}6`]: ou,
  [`${IE}7`]: ou,
  [`${IE}8`]: nbDeux,
  [`${IE}9`]: nbTout,
};
