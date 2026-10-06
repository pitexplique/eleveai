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
import { mathsCe1QuestionBank } from "@/lib/tutor-v4/questionBank/ce1/maths/index";
import { mathsCe2QuestionBank } from "@/lib/tutor-v4/questionBank/ce2/maths/index";
import { mathsCm1QuestionBank } from "@/lib/tutor-v4/questionBank/cm1/maths/index";
import { mathsCm2QuestionBank } from "@/lib/tutor-v4/questionBank/cm2/maths/index";
import { maths6eQuestionBank } from "@/lib/tutor-v4/questionBank/6e/maths/index";
import { francais6eQuestionBank } from "@/lib/tutor-v4/questionBank/6e/francais/index";

const BANQUES: Record<string, any[]> = {
  "4e": maths4eQuestionBank,
  "3e": maths3eQuestionBank,
  ce1: mathsCe1QuestionBank,
  ce2: mathsCe2QuestionBank,
  cm1: mathsCm1QuestionBank,
  cm2: mathsCm2QuestionBank,
  "6e": maths6eQuestionBank,
  "6e-francais": francais6eQuestionBank,
};
const [classe, ...demandees] = process.argv.slice(2);
const B = BANQUES[classe];
// « toutes » : chaque notion de la banque, dans l'ordre où elle apparaît.
const notions = demandees[0] === "toutes" && B ? [...new Set(B.map((i) => i.notionId as string))] : demandees;
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
import { contentFingerprint } from "@/lib/tutor-v4/fingerprint";

/* ⭐ 05/10/2026 — LE SQUELETTE COMPTE AUSSI LA BONNE RÉPONSE. En français,
   « Choisis le groupe nominal correctement accordé » est une consigne fixe dont
   la RÉPONSE change à chaque tirage : ce sont des questions différentes. Et
   « Léa observait le margouillat… » servi avec d'autres leurres reste la MÊME
   question — la phrase et la réponse ne bougent pas. Les nombres de la réponse
   passent eux aussi en « # » : rien ne change pour les maths. */
const tirer = (it: any, eviter?: Set<string>) => (it.kind === "template" ? it.generate({ eviter }) : it);
const cle = (q: any) => `${squelette(String(q.text))}||${squelette(String((q.expected ?? [])[0] ?? ""))}`;
const texte = (it: any) => cle(tirer(it));

/** Une série de 20 à une étoile, tirée comme le coach : répétitions de squelettes. */
function serie(items: any[]) {
  const figesVus = new Set<string>();
  const vus = new Set<string>();
  const empreintes = new Set<string>();
  let rep = 0;
  for (let q = 0; q < 20; q++) {
    let cands = items.filter((i) => i.kind === "template" || !figesVus.has(i.id));
    if (!cands.length) cands = items;
    const poids = cands.map((i) => (i.kind === "template" ? 3 : 1));
    let r = Math.random() * poids.reduce((a, b) => a + b, 0);
    const it = cands[cands.findIndex((_, k) => (r -= poids[k]) < 0)] ?? cands[0];
    if (it.kind !== "template") figesVus.add(it.id);
    // Comme le moteur : le gabarit reçoit les empreintes vues, puis dix retirages.
    let q = tirer(it, empreintes);
    for (let k = 0; k < 10 && it.kind === "template" && empreintes.has(contentFingerprint(q.text, q.choices)); k++) q = tirer(it, empreintes);
    empreintes.add(contentFingerprint(q.text, q.choices));
    const s = cle(q);
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
    for (const i of its) for (let k = 0; k < (i.kind === "template" ? 300 : 1); k++) sk.add(texte(i));
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
