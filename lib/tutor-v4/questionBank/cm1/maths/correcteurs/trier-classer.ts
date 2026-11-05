import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { planEnsembles } from "@/lib/canvas/ensembles";
import { type Q, justeNombre, justeTexte, justeUnique } from "./outils";
import { type Critere, type Objet, type Noeud, arbreCoherent, cheminVers, critereDans, critereParLabel, critereParQuestion, domaineDe, feuillesDe, lireListe, objetDe, questionDe, sat, suivre } from "../../../tri-donnees";

// Les correcteurs de trier-classer.bank.ts (CM1) : relisent la liste et les tris dans le
// texte, les éléments et leurs zones sur la figure, l'arbre et ses branches, retrouvent
// les propriétés, et refont le tri. Vide = juste.

const fig = (q: Q) => q.canvas as any;
const et = (...l: string[][]) => l.flat();
const garde = (l: Objet[], k: Critere) => l.filter((x) => sat(x, k));
const enleve = (l: Objet[], k: Critere) => l.filter((x) => !sat(x, k));
const memes = (a: Objet[], b: Objet[]) => a.length === b.length && a.every((x) => b.some((y) => y.nom === x.nom));

/* ── tri_criteres_successifs ── */
function lireDepart(t: string): Objet[] | null {
  const m = t.match(/(?:Liste|Départ|On a|Voici) : ([^.]+)\./);
  return m ? lireListe(m[1]) : null;
}
/** Les tris annoncés, dans l'ordre : garder ou enlever, selon quel critère. */
function lireTris(t: string): { garde: boolean; k: Critere }[] | null {
  const l: { garde: boolean; k: Critere }[] = [];
  for (const m of t.matchAll(/(On garde|On ne garde que|Restent|on garde|on ne garde que|restent|On enlève|On retire|On sort|on enlève|on retire|on sort) ceux qui ([^.]+)\./g)) {
    const k = critereDans(m[2], "pl");
    if (!k) return null;
    l.push({ garde: !/enlève|retire|sort/.test(m[1]), k });
  }
  return l.length ? l : null;
}
function appliquer(l: Objet[], tris: { garde: boolean; k: Critere }[]) {
  return tris.reduce((x, s) => (s.garde ? garde(x, s.k) : enleve(x, s.k)), l);
}
function reste(q: Q) {
  const l = lireDepart(q.text);
  const tris = lireTris(q.text);
  if (!l || !tris) return [`tris illisibles : ${q.text}`];
  const r = appliquer(l, tris);
  if (r.length !== 1) return [`il reste ${r.length} objets, pas un seul`];
  return justeTexte(q, r[0].nom);
}
function compte(q: Q) {
  const l = lireDepart(q.text);
  const tris = lireTris(q.text);
  if (!l || !tris) return [`tris illisibles : ${q.text}`];
  return justeNombre(q, appliquer(l, tris).length);
}
/** Une seule proposition donne ce résultat à partir de ce départ. */
function critereUnique(q: Q, depart: Objet[], arrivee: Objet[]) {
  const p: string[] = [];
  for (const c of q.choices ?? []) if (!critereParLabel(c)) p.push(`critère inconnu : ${c}`);
  const dom = domaineDe(depart[0]).criteres;
  if (dom.filter((k) => memes(garde(depart, k), arrivee)).length !== 1) p.push("plusieurs critères du domaine donnent ce résultat");
  return et(p, justeUnique(q, (c) => { const k = critereParLabel(c); return !!k && memes(garde(depart, k), arrivee); }));
}
function retrouve(q: Q) {
  const l = lireDepart(q.text);
  const m = q.text.match(/(?:Après le tri|On garde|Il reste) : ([^.]+)\./);
  const r = m && lireListe(m[1]);
  if (!l || !r) return [`listes illisibles : ${q.text}`];
  return critereUnique(q, l, r);
}
function retrouveEtape(q: Q) {
  const l = lireDepart(q.text);
  const m1 = q.text.match(/(?:Tri 1|Étape 1|Premier tri) : ([^.]+)\./);
  const m2 = q.text.match(/(?:Tri 2|Étape 2|Deuxième tri) : ([^.]+)\./);
  const r1 = m1 && lireListe(m1[1]);
  const r2 = m2 && lireListe(m2[1]);
  if (!l || !r1 || !r2) return [`listes illisibles : ${q.text}`];
  const premier = /tri 1 \?|en premier|premier tri \?/.test(q.text);
  return premier ? critereUnique(q, l, r1) : critereUnique(q, r1, r2);
}
function parti(q: Q) {
  const l = lireDepart(q.text);
  const tris = lireTris(q.text);
  if (!l || !tris || tris.length !== 2) return [`tris illisibles : ${q.text}`];
  const r1 = appliquer(l, [tris[0]]);
  const sortis = r1.filter((x) => !appliquer(r1, [tris[1]]).includes(x));
  if (sortis.length !== 1) return [`${sortis.length} objets sortent au deuxième tri`];
  return justeTexte(q, sortis[0].nom);
}

/* ── tri_ensembles_intersection ── */
type Lu = { cs: Critere[]; l: Objet[] };
const LETTRES = ["A", "B", "C"];
function lireTrois(q: Q): Lu | string {
  const f = fig(q);
  if (f?.kind !== "ensembles" || f.ensembles.length !== 3) return "figure absente";
  const cs = f.ensembles.map((e: string) => critereParLabel(e.replace(/^[ABC] : /, "")));
  if (cs.some((c: Critere | null) => !c)) return `ensembles illisibles : ${f.ensembles.join(" | ")}`;
  const l: Objet[] = [];
  for (const e of f.elements) {
    const x = objetDe(e.nom);
    if (!x) return `élément inconnu : ${e.nom}`;
    const vrai = cs.flatMap((k: Critere, i: number) => (sat(x, k) ? [i] : []));
    if (vrai.join() !== [...e.dans].sort().join()) return `${e.nom} est mal placé`;
    l.push(x);
  }
  if (!planEnsembles(f).elements.every((e) => e.place)) return "un élément ne tient pas sur la figure";
  return { cs, l };
}
const avec = (f: (q: Q, z: Lu) => string[]) => (q: Q) => {
  const z = lireTrois(q);
  return typeof z === "string" ? [z] : f(q, z);
};
/** Les lettres écrites dans la question, ou les critères si elle les nomme. */
function ensemblesNommes(q: Q, z: Lu): Critere[] {
  const lettres = [...q.text.matchAll(/\b([ABC])\b/g)].map((m) => m[1]);
  if (lettres.length) return [...new Set(lettres)].map((x) => z.cs[LETTRES.indexOf(x)]);
  return z.cs.filter((k) => new RegExp(`(^|[^\\p{L}])(${k.label}|${k.pl})($|[^\\p{L}])`, "u").test(q.text));
}
const estDans = (x: Objet, ks: Critere[]) => ks.every((k) => sat(x, k));
const interDeux = avec((q, z) => {
  const ks = ensemblesNommes(q, z);
  if (ks.length !== 2) return [`${ks.length} ensembles lus dans : ${q.text}`];
  return justeUnique(q, (c) => { const x = objetDe(c); return !!x && estDans(x, ks); });
});
const nbUn = avec((q, z) => {
  const ks = ensemblesNommes(q, z);
  if (ks.length !== 1) return [`${ks.length} ensembles lus dans : ${q.text}`];
  return justeNombre(q, z.l.filter((x) => sat(x, ks[0])).length);
});
const lesTrois = avec((q, z) => justeUnique(q, (c) => { const x = objetDe(c); return !!x && estDans(x, z.cs); }));
const deuxPasTrois = avec((q, z) => {
  const m = q.text.match(/\b([ABC]) et (?:dans )?([ABC])\b.*\b(?:dans|être dans) ([ABC])\b/) ?? q.text.match(/de ([ABC]) et ([ABC]) qui n'est pas dans ([ABC])/);
  if (!m) return [`zone illisible : ${q.text}`];
  const [p, r, s] = [m[1], m[2], m[3]].map((x) => z.cs[LETTRES.indexOf(x)]);
  return justeUnique(q, (c) => { const x = objetDe(c); return !!x && sat(x, p) && sat(x, r) && !sat(x, s); });
});
const nbDeux = avec((q, z) => {
  const ks = ensemblesNommes(q, z);
  if (ks.length !== 2) return [`${ks.length} ensembles lus dans : ${q.text}`];
  return justeNombre(q, z.l.filter((x) => estDans(x, ks)).length);
});
const ou = avec((q, z) => {
  const m = q.text.match(/(?:Où va|placer|ranger|ajoute) (?:le nombre |l'|le |la )([^?.]+?)(?: \?|\.)/);
  const x = m && objetDe(m[1]);
  if (!x) return [`objet illisible : ${q.text}`];
  if (z.l.some((y) => y.nom === x.nom)) return [`${x.nom} est déjà sur la figure : la réponse se lirait`];
  const dans = z.cs.flatMap((k, i) => (sat(x, k) ? [LETTRES[i]] : []));
  const juste = dans.length === 0 ? "Dans aucun" : dans.length === 3 ? "Dans A, B et C" : dans.length === 2 ? `Dans ${dans[0]} et ${dans[1]}` : `Dans ${dans[0]} seulement`;
  return justeTexte(q, juste);
});

/* Les effectifs : les nombres de la figure, sommés selon la question. */
const zones = (q: Q): { v: number; dans: number[] }[] => fig(q).elements.map((e: any) => ({ v: Number(e.nom), dans: e.dans }));
/** L'activité nommée dans ce bout de phrase : « du football », « de la danse ». */
const nomme = (q: Q, t: string): number => fig(q).ensembles.findIndex((e: string) => new RegExp(`(^| )${e}( |$)`).test(t));
function effTout(q: Q) {
  const m = q.text.match(/font (.+) en tout \?/);
  const i = m ? nomme(q, m[1]) : -1;
  if (i < 0) return [`activité illisible : ${q.text}`];
  return justeNombre(q, zones(q).filter((z) => z.dans.includes(i)).reduce((s, z) => s + z.v, 0));
}
function effDeux(q: Q) {
  const m = q.text.match(/font (.+) et (.+) \?/);
  const i = m ? nomme(q, m[1]) : -1;
  const j = m ? nomme(q, m[2]) : -1;
  if (i < 0 || j < 0) return [`activités illisibles : ${q.text}`];
  return justeNombre(q, zones(q).filter((z) => z.dans.includes(i) && z.dans.includes(j)).reduce((s, z) => s + z.v, 0));
}
function effSeul(q: Q) {
  const m = q.text.match(/font seulement (.+) \?/);
  const i = m ? nomme(q, m[1]) : -1;
  if (i < 0) return [`activité illisible : ${q.text}`];
  return justeNombre(q, zones(q).filter((z) => z.dans.length === 1 && z.dans[0] === i).reduce((s, z) => s + z.v, 0));
}
function effTotal(q: Q) {
  if (zones(q).length !== 7) return ["il manque des zones"];
  return justeNombre(q, zones(q).reduce((s, z) => s + z.v, 0));
}

/* ── tri_arbre ── */
function racine(q: Q): Noeud | null {
  const f = fig(q);
  return f?.kind === "arbre_tri" ? (f.racine as Noeud) : null;
}
function questionsConnues(n: Noeud): string[] {
  if ("feuille" in n) return [];
  return [...(n.question === "?" || critereParQuestion(n.question) ? [] : [`question inconnue : ${n.question}`]), ...questionsConnues(n.oui), ...questionsConnues(n.non)];
}
const objetEcrit = (t: string): Objet | null => {
  const m = t.match(/(?:va|arrive|ranger|Pour) (?:le nombre |l'|le |la )([^?.,]+?)(?: \?|,|\.)/);
  return m ? objetDe(m[1]) : null;
};
function suit(q: Q) {
  const r = racine(q);
  const x = objetEcrit(q.text);
  if (!r || !x) return [`arbre ou objet illisible : ${q.text}`];
  const t = suivre(r, x);
  if (!t) return ["trajet impossible"];
  if (feuillesDe(r).length !== 4) return ["il faut quatre feuilles"];
  return et(questionsConnues(r), justeTexte(q, t.feuille));
}
/** Une proposition par feuille : un seul objet répond au chemin demandé. */
function lit(q: Q) {
  const r = racine(q);
  if (!r) return ["arbre absent"];
  const m = q.text.match(/(?:Quel \S+|Qui|celui qui) (.+?) et (.+?)(?: \?|\.)$/);
  if (!m) return [`phrase illisible : ${q.text}`];
  const lire = (s: string): [Critere, boolean] | null => {
    const n = critereDans(s, "neg");
    if (n && s.trim() === n.neg) return [n, false];
    const k = critereDans(s, "label");
    return k && s.trim() === k.label ? [k, true] : null;
  };
  const a = lire(m[1]);
  const b = lire(m[2]);
  if (!a || !b) return [`critères illisibles : ${q.text}`];
  return et(questionsConnues(r), arbreCoherent(r), justeUnique(q, (c) => { const x = objetDe(c); return !!x && sat(x, a[0]) === a[1] && sat(x, b[0]) === b[1]; }));
}
function feuilleCachee(q: Q) {
  const r = racine(q);
  if (!r) return ["arbre absent"];
  const chemin = cheminVers(r, "?");
  if (!chemin) return ["pas de « ? » dans l'arbre"];
  return et(questionsConnues(r), arbreCoherent(r), justeUnique(q, (c) => { const x = objetDe(c); return !!x && chemin.every(([k, rep]) => sat(x, k) === rep); }));
}
function questionCachee(q: Q) {
  const r = racine(q);
  if (!r || "feuille" in r || r.question !== "?") return ["la question du haut n'est pas cachée"];
  const g = feuillesDe(r.oui).map(objetDe) as Objet[];
  const d = feuillesDe(r.non).map(objetDe) as Objet[];
  if (![...g, ...d].every(Boolean)) return ["feuilles inconnues"];
  const p: string[] = [];
  for (const c of q.choices ?? []) if (!critereParQuestion(c)) p.push(`question inconnue : ${c}`);
  const separe = (k: Critere) => g.every((x) => sat(x, k)) && d.every((x) => !sat(x, k));
  if (domaineDe(g[0]).criteres.filter(separe).length !== 1) p.push("plusieurs questions du domaine conviennent");
  return et(p, justeUnique(q, (c) => { const k = critereParQuestion(c); return !!k && questionDe(k) === c && separe(k); }));
}
function nbQuestions(q: Q) {
  const r = racine(q);
  const x = objetEcrit(q.text);
  if (!r || !x) return [`arbre ou objet illisible : ${q.text}`];
  const t = suivre(r, x);
  if (!t) return ["trajet impossible"];
  return justeTexte(q, `${t.questions} question${t.questions > 1 ? "s" : ""}`);
}

const IS = "tri_criteres_successifs_tpl_";
const II = "tri_ensembles_intersection_tpl_";
const IA = "tri_arbre_tpl_";
export const CORRECTEURS: CorrecteursMaths = {
  [`${IS}1`]: reste,
  [`${IS}2`]: compte,
  [`${IS}3`]: retrouve,
  [`${IS}4`]: retrouveEtape,
  [`${IS}5`]: parti,
  [`${IS}6`]: reste,
  [`${IS}7`]: reste,
  [`${IS}8`]: retrouveEtape,
  [`${IS}9`]: compte,
  [`${II}1`]: interDeux,
  [`${II}2`]: nbUn,
  [`${II}3`]: lesTrois,
  [`${II}4`]: deuxPasTrois,
  [`${II}5`]: nbDeux,
  [`${II}6`]: ou,
  [`${II}7`]: ou,
  [`${II}8`]: effTout,
  [`${II}9`]: effDeux,
  [`${II}10`]: effSeul,
  [`${II}11`]: effTotal,
  [`${IA}1`]: suit,
  [`${IA}2`]: lit,
  [`${IA}3`]: feuilleCachee,
  [`${IA}4`]: suit,
  [`${IA}5`]: feuilleCachee,
  [`${IA}6`]: questionCachee,
  [`${IA}7`]: suit,
  [`${IA}8`]: feuilleCachee,
  [`${IA}9`]: nbQuestions,
};
