// LE CORRECTEUR DE CHAQUE GÉNÉRATEUR DU FRANÇAIS DE 6e, LANCÉ SUR DES CENTAINES
// DE TIRAGES (05/10/2026). Voir lib/tutor-v4/questionBank/6e/francais/generateurs/types.ts.
//
// Pour chaque micro qui a un générateur, 500 tirages :
//   1. les règles communes à tout QCM (bonne réponse non vide, au moins deux
//      leurres, aucun leurre égal à la bonne réponse ni à un autre leurre,
//      pas de « undefined », d'accolade ou de double espace dans le texte) ;
//   2. le correcteur PROPRE au générateur, qui refait le raisonnement.
// Puis le nombre de questions distinctes (phrase + bonne réponse), seuil 40.
//
// Usage : npx --yes tsx@4 scripts/verifier-correcteurs-francais-6e.ts [famille|microId …]
// Sortie en erreur au premier problème trouvé dans une micro (affiché avec la question).

import { GENERATEURS_6E } from "@/lib/tutor-v4/questionBank/6e/francais/generateurs";
import type { QuestionFrancais } from "@/lib/tutor-v4/questionBank/6e/francais/generateurs/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/6e/microSkills";

const TIRAGES = 500;
const SEUIL_DISTINCTES = 40;
const filtres = process.argv.slice(2);
const notionDe = new Map(microSkills.map((m) => [m.id, m.notionId]));

function reglesCommunes(q: QuestionFrancais): string[] {
  const p: string[] = [];
  const norm = (s: string) => s.trim().toLowerCase();
  if (!q.text?.trim()) p.push("texte vide");
  if (!q.correct?.trim()) p.push("bonne réponse vide");
  if (!Array.isArray(q.wrongs) || q.wrongs.length < 2) p.push("moins de deux leurres");
  for (const w of q.wrongs ?? []) if (!w?.trim()) p.push("leurre vide");
  if ((q.wrongs ?? []).some((w) => norm(w) === norm(q.correct))) p.push("un leurre égale la bonne réponse");
  if (new Set((q.wrongs ?? []).map(norm)).size !== (q.wrongs ?? []).length) p.push("deux leurres identiques");
  for (const s of [q.text, q.correct, ...(q.wrongs ?? []), q.methode ?? ""])
    if (/undefined|null|NaN|\{|\}|\s{2,}| [,.](?!\.)/.test(s)) p.push(`écriture suspecte : « ${s} »`);
  // ⭐ 06/10/2026 — l'élision, contrôlée ICI pour toutes les familles : chaque
  // agent avait écrit la sienne, et « le métier de Ibrahim » passait.
  // · Sur l'énoncé, la bonne réponse et la méthode seulement : un leurre peut
  //   être fautif EXPRÈS (copie à corriger, brouillon).
  // · Le « h » et le « y » sont laissés de côté (« de Hugo », « de Yanis ») ;
  //   « onze » et « oui » n'élident pas ; « le, la ou les » et « repère-la et »
  //   sont des pronoms cités, pas des articles.
  for (const s of [q.text, q.correct, q.methode ?? ""]) {
    const elision = s.match(
      /(?<![\p{L}'’-])(de|que|le|la|je|ne|se|me|te|jusque|lorsque|puisque) (?!(?:onze|oui|ou|et)\b)(?=[AEIOUÉÈÊÂÎÔaeiouéèêâîô])\S+|(?<![\p{L}'’-])si ils?\b/iu,
    );
    if (elision) p.push(`élision oubliée : « ${elision[0]} » dans « ${s} »`);
  }
  return p;
}

let fautes = 0;
const micros = Object.keys(GENERATEURS_6E).filter(
  (m) => !filtres.length || filtres.some((f) => m === f || notionDe.get(m)?.includes(f) || m.includes(f)),
);
for (const m of micros) {
  if (!notionDe.has(m)) {
    console.log(`❌ ${m} : aucune micro de 6e ne porte cet identifiant`);
    fautes++;
    continue;
  }
  const g = GENERATEURS_6E[m];
  const distinctes = new Set<string>();
  let probleme: string | null = null;
  for (let k = 0; k < TIRAGES && !probleme; k++) {
    let q: QuestionFrancais;
    try {
      q = g.generer();
    } catch (e) {
      probleme = `le générateur plante : ${(e as Error).message}`;
      break;
    }
    const p = [...reglesCommunes(q), ...g.corriger(q)];
    if (p.length) probleme = `${p.join(" ; ")}\n     ${q.text}\n     ✔ ${q.correct}   ✘ ${q.wrongs.join(" | ")}`;
    distinctes.add(`${q.text}||${q.correct}`);
  }
  const ok = !probleme && distinctes.size >= SEUIL_DISTINCTES;
  if (!ok) fautes++;
  console.log(
    `${ok ? "✅" : "❌"} ${m.padEnd(34)} ${String(distinctes.size).padStart(4)} questions distinctes sur ${TIRAGES}${probleme ? `\n   → ${probleme}` : ""}`,
  );
}
console.log(
  `\n${fautes ? `❌ ${fautes} micro(s) en défaut` : `✅ ${micros.length} générateur(s) justes et variés`} (correcteur sur ${TIRAGES} tirages, ${SEUIL_DISTINCTES} questions distinctes au moins).`,
);
process.exit(fautes ? 1 : 0);
