import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE affine-tracer.bank.ts. Ils relisent « f(x) = 2x − 3 » dans le
// texte et les droites DANS LA FIGURE (couleur, a, b), puis refont le calcul. Une
// figure dont la bonne droite sortirait du cadre, ou deux droites confondues, sont
// en défaut. Vide = juste.

type Q = TutorGeneratedQuestionV4;
const n = (s: string) => Number(s.replace(/[−–]/g, "-").replace(",", "."));
const NOMBRE = "[−-]?\\d+(?:,\\d+)?";

/** « 2x − 3 », « −x + 1 », « 0,5x », « x » → { a, b }. */
function lireExpr(s: string): { a: number; b: number } | null {
  const m = s.trim().match(new RegExp(`^([−-]?)(\\d+(?:,\\d+)?)?x(?: ([+−]) (\\d+(?:,\\d+)?))?$`));
  if (!m) return null;
  const a = (m[1] ? -1 : 1) * (m[2] ? n(m[2]) : 1);
  const b = m[3] ? (m[3] === "+" ? 1 : -1) * n(m[4]) : 0;
  return { a, b };
}
/** La première fonction du texte. */
function fonctionTexte(t: string) {
  const m = t.match(/\b([fgh])\(x\) = ([−-]?(?:\d+(?:,\d+)?)?x(?: [+−] \d+(?:,\d+)?)?)/);
  if (!m) return null;
  const e = lireExpr(m[2]);
  return e ? { nom: m[1], ...e } : null;
}
const toutesFonctions = (t: string) => [...t.matchAll(/\b([fgh])\(x\) = ([−-]?(?:\d+(?:,\d+)?)?x(?: [+−] \d+(?:,\d+)?)?)/g)].map((m) => lireExpr(m[2])!);
const lirePoint = (s: string) => {
  const m = s.match(new RegExp(`\\((${NOMBRE}) ; (${NOMBRE})\\)`));
  return m ? { x: n(m[1]), y: n(m[2]) } : null;
};
const tousPoints = (s: string) => [...s.matchAll(new RegExp(`\\((${NOMBRE}) ; (${NOMBRE})\\)`, "g"))].map((m) => ({ x: n(m[1]), y: n(m[2]) }));

const NOM_COULEUR: Record<string, string> = { "#dc2626": "rouge", "#2563eb": "bleue", "#16a34a": "verte" };

/** Les droites de la figure, chacune contrôlée : couleur connue, distinctes, lisibles. */
function droitesFigure(q: Q): { p: string[]; d: { a: number; b: number; couleur: string }[]; f: any } {
  const f = q.canvas as any;
  if (f?.kind !== "fonctionGraphique") return { p: ["pas de figure"], d: [], f };
  const d = (f.courbes ?? []).map((c: any) => ({ a: c.a, b: c.type === "lineaire" ? 0 : (c.b ?? 0), couleur: NOM_COULEUR[c.couleur] ?? "?" }));
  const p: string[] = [];
  if (d.some((x: any) => x.couleur === "?")) p.push("couleur sans nom");
  if (new Set(d.map((x: any) => x.couleur)).size !== d.length) p.push("deux droites de même couleur");
  if (new Set(d.map((x: any) => `${x.a}/${x.b}`)).size !== d.length) p.push("deux droites confondues");
  for (const x of d) {
    let noeuds = 0;
    for (let i = f.xmin; i <= f.xmax; i++) {
      const y = x.a * i + x.b;
      if (Number.isInteger(y) && y >= f.ymin && y <= f.ymax) noeuds++;
    }
    if (noeuds < 2) p.push(`droite ${x.a}x + ${x.b} : moins de deux nœuds visibles`);
  }
  return { p, d, f };
}
/** Le QCM « la droite rouge » : une seule droite de la figure vérifie `bonne`, et c'est l'attendue. */
function choixCouleur(q: Q, bonne: (x: { a: number; b: number }) => boolean): string[] {
  const { p, d } = droitesFigure(q);
  if (d.length < 2) return [...p, "moins de deux droites"];
  const ok = d.filter(bonne);
  if (ok.length !== 1) return [...p, `${ok.length} droite(s) conviennent`];
  const juste = `la droite ${ok[0].couleur}`;
  const r = qcmUnique(q, (c) => c === juste);
  const attendus = new Set(d.map((x) => `la droite ${x.couleur}`));
  for (const c of q.choices ?? []) if (!attendus.has(c)) r.push(`la proposition « ${c} » n’est pas sur la figure`);
  if ((q.choices ?? []).length !== d.length) r.push("une droite sans proposition");
  return [...p, ...r];
}

function image(q: Q): string[] {
  const F = fonctionTexte(q.text);
  const x = q.text.match(new RegExp(`(?:[fgh]\\((${NOMBRE})\\)(?!\\w)|image de (${NOMBRE})|abscisse (${NOMBRE})|x = (${NOMBRE}))`));
  if (!F || !x) return ["fonction ou abscisse illisibles"];
  const v = n(x[1] ?? x[2] ?? x[3] ?? x[4]);
  const y = F.a * v + F.b;
  return q.expected.every((e) => n(e) === y) ? [] : [`attendu ${q.expected[0]}, juste ${y}`];
}
function pointAxe(q: Q): string[] {
  const F = fonctionTexte(q.text);
  if (!F) return ["fonction illisible"];
  return qcmUnique(q, (c) => {
    const P = lirePoint(c);
    return !!P && Math.abs(F.a * P.x + F.b - P.y) < 1e-9;
  });
}
function lineaireFigure(q: Q): string[] {
  const F = fonctionTexte(q.text);
  if (!F || F.b !== 0) return ["fonction linéaire illisible"];
  return choixCouleur(q, (x) => x.a === F.a && x.b === F.b);
}
function allure(q: Q): string[] {
  const m = q.text.match(/[fgh]\(x\) = ([−-]?(?:\d+(?:,\d+)?)?x(?: [+−] \d+(?:,\d+)?)?)/);
  const F = m && lireExpr(m[1]);
  if (!F || F.a === 0) return ["fonction illisible"];
  return qcmUnique(q, (c) => (F.a > 0 ? /monte/.test(c) : /descend/.test(c)));
}
function affineFigure(q: Q): string[] {
  const F = fonctionTexte(q.text);
  if (!F) return ["fonction illisible"];
  return choixCouleur(q, (x) => x.a === F.a && x.b === F.b);
}
function deuxPoints(q: Q): string[] {
  const F = fonctionTexte(q.text);
  if (!F) return ["fonction illisible"];
  return qcmUnique(q, (c) => {
    const P = tousPoints(c);
    return P.length === 2 && P.every((p) => Math.abs(F.a * p.x + F.b - p.y) < 1e-9);
  });
}
function lireDroite(q: Q): string[] {
  const { p, d } = droitesFigure(q);
  if (d.length !== 1) return [...p, "il faut une seule droite"];
  return [
    ...p,
    ...qcmUnique(q, (c) => {
      const F = fonctionTexte(c);
      return !!F && F.a === d[0].a && F.b === d[0].b;
    }),
  ];
}
function appartient(q: Q): string[] {
  const F = fonctionTexte(q.text);
  const P = lirePoint(q.text);
  if (!F || !P) return ["fonction ou point illisibles"];
  const oui = Math.abs(F.a * P.x + F.b - P.y) < 1e-9;
  return q.expected[0] === (oui ? "oui" : "non") ? [] : [`attendu ${q.expected[0]}`];
}
/** La situation → a et b relus dans le texte, sens lu dans le verbe. */
function situation(q: Q): string[] {
  const nums = [...q.text.split(/Quelle|Laquelle/)[0].matchAll(/\d+/g)].map((m) => n(m[0]));
  if (nums.length !== 2) return [`deux nombres attendus : ${nums.join(", ")}`];
  const baisse = /perd|se vide|retire|remonte/.test(q.text);
  const parUnite = /par (?:kilomètre|heure|séance|minute|semaine|mois|niveau|seconde)|Chaque jour/.test(q.text);
  if (!parUnite) return ["taux illisible"];
  // Dans toutes les situations, le départ est écrit d'abord, le taux ensuite.
  const [depart, taux] = nums;
  const a = baisse ? -taux : taux;
  return choixCouleur(q, (x) => x.a === a && x.b === depart);
}
function pointSuivant(q: Q): string[] {
  const F = fonctionTexte(q.text);
  const k = q.text.match(/d’abscisse (\d+)/);
  if (!F || !k) return ["fonction ou abscisse illisibles"];
  const v = n(k[1]);
  return qcmUnique(q, (c) => {
    const P = lirePoint(c);
    return !!P && P.x === v && Math.abs(F.a * v + F.b - P.y) < 1e-9;
  });
}
function parallele(q: Q): string[] {
  const F = fonctionTexte(q.text);
  if (!F) return ["fonction illisible"];
  return qcmUnique(q, (c) => {
    const G = fonctionTexte(c);
    return !!G && G.a === F.a && G.b !== F.b;
  });
}
function intersection(q: Q): string[] {
  const fs = toutesFonctions(q.text);
  if (fs.length !== 2 || fs[0].a === fs[1].a) return ["deux fonctions sécantes attendues"];
  const x = (fs[1].b - fs[0].b) / (fs[0].a - fs[1].a);
  const y = fs[0].a * x + fs[0].b;
  const { p, d, f } = droitesFigure(q);
  const r = [...p];
  if (d.length !== 2) r.push("il faut deux droites");
  if (x < f.xmin || x > f.xmax || y < f.ymin || y > f.ymax) r.push("le point commun sort de la figure");
  for (const g of fs) if (!d.some((e) => e.a === g.a && e.b === g.b)) r.push("une fonction du texte n’est pas sur la figure");
  return [...r, ...qcmUnique(q, (c) => {
    const P = lirePoint(c);
    return !!P && Math.abs(P.x - x) < 1e-9 && Math.abs(P.y - y) < 1e-9;
  })];
}
function parDeuxPoints(q: Q): string[] {
  const P = tousPoints(q.text);
  if (P.length !== 2) return ["points illisibles"];
  const a = (P[1].y - P[0].y) / (P[1].x - P[0].x);
  const b = P[0].y - a * P[0].x;
  return qcmUnique(q, (c) => {
    const F = fonctionTexte(c);
    return !!F && Math.abs(F.a - a) < 1e-9 && Math.abs(F.b - b) < 1e-9;
  });
}
function proportionnel(q: Q): string[] {
  const a = q.text.match(/(\d+) (?:€|km|L|pages|g)/);
  if (!a) return ["coefficient illisible"];
  return choixCouleur(q, (x) => x.b === 0 && x.a === n(a[1]));
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  "3e_affine_tracer_tpl_1": image,
  "3e_affine_tracer_tpl_2": pointAxe,
  "3e_affine_tracer_tpl_3": lineaireFigure,
  "3e_affine_tracer_tpl_4": allure,
  "3e_affine_tracer_tpl_5": affineFigure,
  "3e_affine_tracer_tpl_6": deuxPoints,
  "3e_affine_tracer_tpl_7": lireDroite,
  "3e_affine_tracer_tpl_8": appartient,
  "3e_affine_tracer_tpl_9": situation,
  "3e_affine_tracer_tpl_10": affineFigure,
  "3e_affine_tracer_tpl_11": pointSuivant,
  "3e_affine_tracer_tpl_12": parallele,
  "3e_affine_tracer_tpl_13": intersection,
  "3e_affine_tracer_tpl_14": parDeuxPoints,
  "3e_affine_tracer_tpl_15": proportionnel,
});
