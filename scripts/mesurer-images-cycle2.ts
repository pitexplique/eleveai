// PART DES QUESTIONS SERVIES AVEC UN DESSIN — coach CP, CE1, CE2 (10/11/2026).
// Frédéric : « regarde s'il y a bien des images et que ça soit un peu fun ;
// fais attention à leur âge ». Un enfant de 6-8 ans lit mal : le dessin porte
// la question. On tire chaque item (gabarit : 30 fois) et on compte, par
// notion, la part des énoncés qui arrivent avec un `canvas`.
// Usage : npx --yes tsx@4 scripts/mesurer-images-cycle2.ts <cp|ce1|ce2> [--exemples]
import { mathsCpQuestionBank } from "@/lib/tutor-v4/questionBank/cp/maths/index";
import { mathsCe1QuestionBank } from "@/lib/tutor-v4/questionBank/ce1/maths/index";
import { mathsCe2QuestionBank } from "@/lib/tutor-v4/questionBank/ce2/maths/index";
const BANQUES: Record<string, any[]> = { cp: mathsCpQuestionBank, ce1: mathsCe1QuestionBank, ce2: mathsCe2QuestionBank };
const [classe] = process.argv.slice(2);
const EX = process.argv.includes("--exemples");
const B = BANQUES[classe];
if (!B) { console.log("usage : <cp|ce1|ce2> [--exemples]"); process.exit(2); }
const tirer = (it: any) => (it.kind === "template" ? it.generate({}) : it);
const parNotion = new Map<string, { n: number; img: number; kinds: Map<string, number> }>();
for (const it of B) {
  const k = it.kind === "template" ? 30 : 1;
  const st = parNotion.get(it.notionId) ?? { n: 0, img: 0, kinds: new Map() };
  for (let i = 0; i < k; i++) {
    const q = tirer(it);
    st.n++;
    const c = q.canvas ?? q.visual ?? q.figure;
    if (c) { st.img++; st.kinds.set(c.kind ?? c.type ?? "?", (st.kinds.get(c.kind ?? c.type ?? "?") ?? 0) + 1); }
  }
  parNotion.set(it.notionId, st);
}
let N = 0, I = 0;
for (const [n, s] of parNotion) {
  N += s.n; I += s.img;
  console.log(`${(100 * s.img / s.n).toFixed(0).padStart(4)} %  ${n.padEnd(24)} ${[...s.kinds].map(([k, v]) => `${k}:${v}`).join(" ")}`);
}
console.log(`\n${classe} : ${(100 * I / N).toFixed(0)} % des énoncés servis avec un dessin`);
if (EX) for (const it of B.filter((_, i) => i % 9 === 0).slice(0, 40)) { const q = tirer(it); console.log(`\n[${it.microId} ★${it.difficulty}] ${q.text}  →  ${(q.expected ?? []).join(" | ")}${q.choices ? "  choix: " + q.choices.join(" / ") : ""}`); }
