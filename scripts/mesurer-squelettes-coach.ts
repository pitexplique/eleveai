// CE QUE L'ÉLÈVE VOIT REVENIR — les SQUELETTES d'énoncés, par micro et par étoile.
//
// ⛔⛔ POURQUOI CE SCRIPT EXISTE (30/09/2026). Frédéric : ses élèves de 4e, en
// proportionnalité, « m'ont dit que des questions revenaient souvent ». Les
// quatre contrôles de robustesse étaient pourtant tous VERTS (renouvellement
// médian 284 énoncés par micro). Ils comptent un énoncé comme neuf dès qu'un
// NOMBRE change. L'élève, lui, reconnaît la PHRASE : « 3 objets coûtent 12 €.
// 6 objets coûtent 24 €. Est-ce proportionnel ? » est la même question que
// « 4 objets coûtent 20 €… ». Ici, le squelette d'un énoncé est son texte, les
// nombres remplacés par « # ».
//
// ⭐ LE TIRAGE IMITÉ EST CELUI DU COACH (lib/tutor-v4/questionPairBuilder.ts) :
// les items de la micro, à l'étoile EXACTE de l'élève (mode simple, dès qu'il y
// en a au moins deux), un gabarit pesant 3 et un item figé 1, un figé déjà vu
// retiré de la séance, un gabarit jamais retiré. Une série de 20 questions à la
// même étoile : on compte les squelettes déjà vus dans la série.
//
// Mesuré le 30/09 sur la proportionnalité de 4e : 9 à 10 squelettes par micro,
// 11 à 12 répétitions sur 20 ; ratios et agrandissements : 2 ou 3 squelettes,
// 17 à 18 répétitions sur 20.
//
// Usage : npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts <classe> <notionId> [<notionId> …]
//   ex.   npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 4e prop_proportionnalite
// Seuils (sortie en erreur sinon) : 30 squelettes par micro, et par étoile
// servie au plus 4 répétitions sur 20.

import { maths4eQuestionBank } from "@/lib/tutor-v4/questionBank/4e/maths/index";
import { maths3eQuestionBank } from "@/lib/tutor-v4/questionBank/3e/maths/index";

const BANQUES: Record<string, any[]> = { "4e": maths4eQuestionBank, "3e": maths3eQuestionBank };
const [classe, ...notions] = process.argv.slice(2);
const B = BANQUES[classe];
if (!B || !notions.length) {
  console.log(`usage : npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts <${Object.keys(BANQUES).join("|")}> <notionId> …`);
  process.exit(2);
}
const SEUIL_SQUELETTES = 30;
const SEUIL_REPETITIONS = 4;

// ⚠️ Les exposants en exposant Unicode (« 5³ », « 10⁻² ») sont des NOMBRES
// aussi : sans cette ligne, « #³ » et « #⁴ » comptaient pour deux squelettes
// (signalé par l'agent des puissances, 30/09/2026).
const squelette = (t: string) =>
  t
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, "#")
    .replace(/[−-]?\d+(?:[,.]\d+)?/g, "#")
    .replace(/\s+/g, " ")
    .trim();
const texte = (it: any) => String(it.kind === "template" ? it.generate().text : it.text);

/** Une série de 20 à une étoile, tirée comme le coach : répétitions de squelettes. */
function serie(items: any[]) {
  const figesVus = new Set<string>();
  const vus = new Set<string>();
  let rep = 0;
  for (let q = 0; q < 20; q++) {
    let cands = items.filter((i) => i.kind === "template" || !figesVus.has(i.id));
    if (!cands.length) cands = items;
    const poids = cands.map((i) => (i.kind === "template" ? 3 : 1));
    let r = Math.random() * poids.reduce((a, b) => a + b, 0);
    const it = cands[cands.findIndex((_, k) => (r -= poids[k]) < 0)] ?? cands[0];
    if (it.kind !== "template") figesVus.add(it.id);
    const s = squelette(texte(it));
    if (vus.has(s)) rep++;
    vus.add(s);
  }
  return rep;
}

let fautes = 0;
for (const n of notions) {
  const items = B.filter((i) => i.notionId === n);
  const micros = [...new Set(items.map((i) => i.microId))];
  console.log(`\n${classe} · ${n}`);
  console.log(`${"micro".padEnd(28)} fixes gab.  squel.  répétitions sur 20, par étoile`);
  for (const m of micros) {
    const its = items.filter((i) => i.microId === m);
    const sk = new Set<string>();
    for (const i of its) for (let k = 0; k < (i.kind === "template" ? 300 : 1); k++) sk.add(squelette(texte(i)));
    const etoiles = [...new Set(its.map((i) => i.difficulty))].sort();
    const parEtoile = etoiles.map((d) => {
      const exacts = its.filter((i) => i.difficulty === d);
      const pool = exacts.length >= 2 ? exacts : its.filter((i) => Math.abs(i.difficulty - d) <= 1);
      let total = 0;
      for (let s = 0; s < 300; s++) total += serie(pool);
      return { d, rep: total / 300 };
    });
    const pire = Math.max(...parEtoile.map((x) => x.rep));
    const ok = sk.size >= SEUIL_SQUELETTES && pire <= SEUIL_REPETITIONS;
    if (!ok) fautes++;
    console.log(
      `${ok ? "✅" : "❌"} ${String(m).padEnd(26)} ${String(its.filter((i) => i.kind !== "template").length).padStart(5)} ${String(its.filter((i) => i.kind === "template").length).padStart(4)} ${String(sk.size).padStart(7)}   ${parEtoile.map((x) => `★${x.d} ${x.rep.toFixed(1)}`).join("  ")}`,
    );
  }
}
console.log(`\n${fautes ? `❌ ${fautes} micro(s) sous le seuil` : "✅ toutes les micros tiennent"} (${SEUIL_SQUELETTES} squelettes, ${SEUIL_REPETITIONS} répétitions sur 20 au plus à chaque étoile).`);
process.exit(fautes ? 1 : 0);
