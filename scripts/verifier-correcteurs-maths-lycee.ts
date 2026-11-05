// LE CORRECTEUR DE CHAQUE GABARIT DE MATHS DU LYCÉE, SUR 500 TIRAGES (05/11/2026).
// Même contrat que scripts/verifier-correcteurs-maths-6e.ts ; la barre de fraction
// est permise au lycée. Seuls les gabarits ajoutés depuis cette date ont un
// correcteur : on nomme donc les micros (ou un préfixe d'id).
//
// Usage : npx --yes tsx@4 --tsconfig tsconfig.json scripts/verifier-correcteurs-maths-lycee.ts <classe> <micro…> [--lire N]
//   classes : seconde, premiere, premiere-spe, stmg, terminale-spe
//   --lire N : imprime N énoncés tirés de chaque micro, pour les lire vraiment.

import { compareAnswer } from "@/lib/tutor/evaluation/comparators";
import { mathsTerminaleSpeQuestionBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/index";
import { CORRECTEURS_TLE } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/correcteurs";
import { mathsSecondeQuestionBank } from "@/lib/tutor-v4/questionBank/seconde/maths/index";
import { CORRECTEURS_SECONDE } from "@/lib/tutor-v4/questionBank/seconde/maths/correcteurs";
import { mathsPremiereQuestionBank } from "@/lib/tutor-v4/questionBank/premiere/maths/index";
import { CORRECTEURS_PREMIERE } from "@/lib/tutor-v4/questionBank/premiere/maths/correcteurs";
import { mathsPremiereSpeQuestionBank } from "@/lib/tutor-v4/questionBank/premiere-spe/maths/index";
import { CORRECTEURS_PREMIERE_SPE } from "@/lib/tutor-v4/questionBank/premiere-spe/maths/correcteurs";
import { mathsStmgQuestionBank } from "@/lib/tutor-v4/questionBank/stmg/maths/index";
import { CORRECTEURS_STMG } from "@/lib/tutor-v4/questionBank/stmg/maths/correcteurs";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

const TIRAGES = 500;
const CLASSES: Record<string, [any[], Record<string, (q: TutorGeneratedQuestionV4) => string[]>]> = {
  "terminale-spe": [mathsTerminaleSpeQuestionBank, CORRECTEURS_TLE],
  seconde: [mathsSecondeQuestionBank, CORRECTEURS_SECONDE],
  premiere: [mathsPremiereQuestionBank, CORRECTEURS_PREMIERE],
  "premiere-spe": [mathsPremiereSpeQuestionBank, CORRECTEURS_PREMIERE_SPE],
  stmg: [mathsStmgQuestionBank, CORRECTEURS_STMG],
};
const args = process.argv.slice(2);
const iLire = args.indexOf("--lire");
const LIRE = iLire >= 0 ? Number(args[iLire + 1]) : 0;
const reste = iLire >= 0 ? args.filter((_, i) => i !== iLire && i !== iLire + 1) : args;
const [classe, ...filtres] = reste;
if (!CLASSES[classe] || !filtres.length) {
  console.log(`usage : <${Object.keys(CLASSES).join("|")}> <micro…> [--lire N]`);
  process.exit(2);
}
const [BANQUE, CORRECTEURS] = CLASSES[classe];
const gabarits = BANQUE.filter((i) => i.kind === "template" && filtres.some((f) => i.microId === f || i.notionId === f || i.id.startsWith(f)) && (filtres.includes(i.microId) || filtres.some((f) => i.id.startsWith(f)) || CORRECTEURS[i.id]));

function reglesCommunes(q: TutorGeneratedQuestionV4): string[] {
  const p: string[] = [];
  if (!q.text?.trim()) p.push("texte vide");
  if (!q.expected?.length || !String(q.expected[0]).trim()) p.push("réponse attendue vide");
  else if (!compareAnswer({ comparator: q.comparator, answer: String(q.expected[0]), expected: q.expected }))
    p.push(`la réponse attendue « ${q.expected[0]} » est refusée par son comparateur (${q.comparator})`);
  if (q.format === "qcm") {
    const c = q.choices ?? [];
    if (c.length !== 4) p.push(`QCM à ${c.length} propositions`);
    if (new Set(c.map((x) => x.trim())).size !== c.length) p.push("deux propositions identiques");
    const justes = c.filter((x) => compareAnswer({ comparator: q.comparator, answer: x, expected: q.expected }));
    if (justes.length !== 1) p.push(`${justes.length} propositions acceptées`);
  }
  if (!q.explanation?.trim()) p.push("pas d'explication");
  for (const s of [q.text, ...(q.choices ?? []), ...(q.expected ?? []), q.explanation ?? ""].map(String)) {
    if (/undefined|NaN|Infinity|\[object|\$\{/.test(s)) p.push(`écriture suspecte : « ${s} »`);
    // Dans du code entre accents graves (Python), le point décimal est le bon.
    if (/\d\.\d/.test(s.replace(/`[^`]*`/g, ""))) p.push(`point décimal : « ${s} »`);
    if ((s.match(/\$/g) ?? []).length % 2) p.push(`dollars impairs : « ${s} »`);
    if (/\+ -|- -|\+ \+|\\dfrac\{0\}|(^|[^\d])1x|\s{2,}/.test(s.replace(/\n+/g, " "))) p.push(`écriture maladroite : « ${s} »`);
  }
  return p;
}

let fautes = 0;
const lus = new Map<string, TutorGeneratedQuestionV4[]>();
for (const g of gabarits) {
  const corriger = CORRECTEURS[g.id];
  const distinctes = new Set<string>();
  let probleme: string | null = corriger ? null : "aucun correcteur pour ce gabarit";
  for (let k = 0; k < TIRAGES && !probleme; k++) {
    let q: TutorGeneratedQuestionV4;
    try {
      q = g.generate();
      const p = [...reglesCommunes(q), ...corriger(q)];
      if (p.length) probleme = `${p.join(" ; ").slice(0, 260)}\n     ${q.text}\n     ✔ ${q.expected.join(" / ")}${q.choices ? `   choix : ${q.choices.join(" | ")}` : ""}`;
      distinctes.add(`${q.text}||${q.expected[0]}`);
      if (LIRE && k < 40) lus.set(g.microId, [...(lus.get(g.microId) ?? []), q]);
    } catch (e) {
      probleme = `le gabarit ou le correcteur plante : ${(e as Error).message}`;
    }
  }
  if (probleme) fautes++;
  console.log(`${probleme ? "❌" : "✅"} ${g.id.padEnd(46)} ${String(distinctes.size).padStart(4)} distinctes${probleme ? `\n   → ${probleme}` : ""}`);
}
if (LIRE)
  for (const [m, l] of lus) {
    console.log(`\n===== ${m} =====`);
    for (const q of l.sort(() => Math.random() - 0.5).slice(0, LIRE)) console.log(`· ${q.text}\n    ✔ ${q.expected[0]}${q.choices ? `\n    ✗ ${q.choices.filter((c) => c !== q.expected[0]).join("  |  ")}` : ""}`);
  }
console.log(`\n${fautes ? `❌ ${fautes} gabarit(s) en défaut` : `✅ ${gabarits.length} gabarit(s) justes`} (correcteur sur ${TIRAGES} tirages).`);
process.exit(fautes ? 1 : 0);
