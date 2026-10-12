// VÉRIFIE LA NOTION « ANALYSE GRAPHIQUE » (seconde et première spé, 12/10/2026).
//
// 500 tirages par gabarit. Pour chaque question :
//   · la bonne réponse est acceptée par son propre comparateur ;
//   · en QCM : choix distincts, la bonne réponse y figure UNE fois, au moins
//     trois choix (sauf oui/non et positif/négatif/nul) ;
//   · ⭐ RECALCUL INDÉPENDANT, depuis les POINTS DU CANVAS (ce que l'élève voit),
//     sans passer par le générateur :
//       - image : l'ordonnée du point d'abscisse lue ;
//       - antécédents / équation : les abscisses où la courbe vaut k, et AUCUNE
//         traversée de y = k entre deux graduations (elle serait illisible) ;
//       - inéquation : chaque point échantillonné est dans l'ensemble annoncé
//         si et seulement s'il vérifie l'inégalité ;
//       - signes : chaque signe de la ligne correspond à la position de la
//         courbe par rapport à l'axe entre deux valeurs de la première ligne.
//
// Usage : npx --yes tsx@4 scripts/verifier-analyse-graphique.ts

import { analyseGraphiqueBank as seconde } from "@/lib/tutor-v4/questionBank/seconde/maths/analyse-graphique.bank";
import { analyseGraphiqueBank as premiere } from "@/lib/tutor-v4/questionBank/premiere-spe/maths/analyse-graphique.bank";
import { compareAnswer } from "@/lib/tutor/evaluation/comparators";

const num = (s: string) => Number(s.replace(/−/g, "-"));
let defauts = 0;
const vus: Record<string, number> = {};
function defaut(id: string, msg: string, q: any) {
  defauts += 1;
  vus[id] = (vus[id] ?? 0) + 1;
  if (vus[id] <= 2) console.log(`⛔ ${id} : ${msg}\n   ${q.text.split("\n").pop()}\n   attendu : ${q.expected[0]}  choix : ${(q.choices ?? []).join(" / ")}`);
}

function pointsDe(q: any): { x: number; y: number }[] {
  return q.canvas?.courbes?.[0]?.points ?? [];
}
function yEn(pts: { x: number; y: number }[], x: number): number | null {
  const p = pts.find((u) => Math.abs(u.x - x) < 1e-9);
  return p ? p.y : null;
}
/** « [−4 ; −1[ ∪ ]3 ; 5] » ou « {2} » ou « ∅ » → fonction d'appartenance. */
function appartient(ens: string): (x: number) => boolean {
  if (ens === "∅") return () => false;
  const morceaux = ens.split(" ∪ ").map((m) => {
    const p = m.match(/^\{(−?\d+)\}$/);
    if (p) return (x: number) => Math.abs(x - num(p[1])) < 1e-9;
    const r = m.match(/^([\[\]])(−?\d+) ; (−?\d+)([\[\]])$/);
    if (!r) throw new Error(`intervalle illisible : ${m}`);
    const a = num(r[2]), b = num(r[3]);
    const ga = r[1] === "[", db = r[4] === "]";
    return (x: number) => (ga ? x >= a - 1e-9 : x > a + 1e-9) && (db ? x <= b + 1e-9 : x < b - 1e-9);
  });
  return (x) => morceaux.some((f) => f(x));
}

for (const [classe, banque] of [["seconde", seconde], ["premiere-spe", premiere]] as const) {
  for (const it of banque as any[]) {
    for (let n = 0; n < 500; n += 1) {
      const q = it.generate();
      const id = `${classe}/${it.id}`;
      const bonne = q.expected[0];
      if (!bonne) { defaut(id, "pas de réponse attendue", q); continue; }
      if (!compareAnswer({ comparator: q.comparator, answer: bonne, expected: q.expected })) defaut(id, "la bonne réponse est refusée", q);
      if (q.format === "qcm") {
        const ch: string[] = q.choices ?? [];
        if (new Set(ch).size !== ch.length) defaut(id, "choix en double", q);
        if (ch.filter((c) => c === bonne).length !== 1) defaut(id, "bonne réponse absente ou en double", q);
        const binaire = ch.includes("oui") || ch.includes("positif");
        if (!binaire && ch.length < 3) defaut(id, `seulement ${ch.length} choix`, q);
      }
      const pts = pointsDe(q);
      if (pts.length < 20) { defaut(id, "canvas sans courbe", q); continue; }
      const texte: string = q.text;
      const derniere = texte.split("\n").pop() as string;

      // image : « f(2) » lu dans la question (et pas d'addition : d4 calcule f(a) ± f(b))
      if (it.id.includes("_image_") && q.format === "short") {
        const lus = [...derniere.matchAll(/\$[A-Za-z]\((−?\d+)\)(?: = \\ldots)?\$/g)].map((m) => num(m[1]));
        const ys = lus.map((x) => yEn(pts, x));
        if (ys.some((y) => y === null)) { defaut(id, "abscisse sans point", q); continue; }
        let attendu = ys[0] as number;
        if (lus.length === 2) attendu = derniere.includes(" + ") ? (ys[0] as number) + (ys[1] as number) : (ys[0] as number) - (ys[1] as number);
        if (Math.abs(attendu - num(String(bonne).split(" ")[0])) > 1e-6) defaut(id, `recalcul ${attendu}`, q);
      }

      // équations et antécédents : k, puis les abscisses où la courbe vaut k
      const mk = derniere.match(/\(([a-z])\) = (−?\d+)\$/) ?? derniere.match(/(?:antécédents? de|image) (−?\d+)/) ?? derniere.match(/ordonnée (−?\d+)/) ?? derniere.match(/y = (−?\d+)\$/) ?? derniere.match(/vaut-(?:il|elle) (−?\d+)/);
      if ((it.id.includes("_equation_") || it.id.includes("_antecedent_")) && mk) {
        const k = num(mk[mk.length - 1]);
        const sol = pts.filter((p) => Number.isInteger(p.x) && Math.abs(p.y - k) < 1e-6).map((p) => p.x);
        const traverse = pts.some((p, i) => i > 0 && (p.y - k) * (pts[i - 1].y - k) < -1e-9 && !Number.isInteger(p.x) && !Number.isInteger(pts[i - 1].x));
        if (traverse) defaut(id, `la courbe traverse y = ${k} entre deux graduations`, q);
        const lu = q.format === "short" ? [String(sol.length)] : null;
        if (lu && num(String(bonne)) !== sol.length) defaut(id, `recalcul : ${sol.length} solutions`, q);
        if (!lu) {
          const ecrit = sol.map((x) => (x < 0 ? `−${-x}` : String(x)));
          const ok = it.id.includes("_equation_")
            ? bonne === (sol.length ? `S = {${ecrit.join(" ; ")}}` : "S = ∅")
            : bonne === (sol.length === 0 ? "aucun" : sol.length === 1 ? ecrit[0] : `${ecrit.slice(0, -1).join(", ")} et ${ecrit[ecrit.length - 1]}`);
          if (!ok) defaut(id, `recalcul : ${ecrit.join(", ") || "aucun"}`, q);
        }
      }

      // inéquations : appartenance point par point
      if (it.id.includes("_inequation_")) {
        const mi = derniere.match(/\(([a-z])\) (<|>|\\leqslant|\\geqslant) (−?\d+)\$/);
        if (!mi) { defaut(id, "inégalité illisible", q); continue; }
        const k = num(mi[3]);
        const test = (y: number) => mi[2] === "<" ? y < k - 1e-9 : mi[2] === ">" ? y > k + 1e-9 : mi[2] === "\\leqslant" ? y <= k + 1e-9 : y >= k - 1e-9;
        const dans = appartient(bonne);
        const faux = pts.find((p) => dans(p.x) !== test(p.y));
        if (faux) defaut(id, `x = ${faux.x} (f = ${faux.y}) mal classé`, q);
      }

      // signes : la ligne donnée, contre la position de la courbe
      if (it.id.includes("_signes_") && q.format === "qcm" && /^[+−0 ]+$/.test(bonne)) {
        const lp = derniere.match(/(−?\d+(?:  \|  −?\d+)+)/);
        if (!lp) { defaut(id, "première ligne illisible", q); continue; }
        const bornes = lp[1].split("  |  ").map(num);
        const signes = bonne.split("  ").filter((s: string) => s !== "0");
        bornes.slice(0, -1).forEach((a, i) => {
          const b = bornes[i + 1];
          const dedans = pts.filter((p) => p.x > a + 1e-9 && p.x < b - 1e-9);
          const attendu = signes[i] === "+" ? 1 : -1;
          if (dedans.some((p) => Math.sign(p.y) !== attendu)) defaut(id, `signe faux entre ${a} et ${b}`, q);
        });
        bornes.slice(1, -1).forEach((z) => {
          if (Math.abs(yEn(pts, z) ?? 9) > 1e-6) defaut(id, `${z} n'est pas un zéro`, q);
        });
      }
    }
  }
}
console.log(defauts ? `\n⛔ ${defauts} défauts` : `\n✅ ${seconde.length + premiere.length} gabarits, 500 tirages chacun : aucun défaut`);
process.exit(defauts ? 1 : 0);
