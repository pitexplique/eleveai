// LE CORRECTEUR DE CHAQUE GABARIT DE MATHS DE 6e, LANCÉ SUR 500 TIRAGES
// (06/10/2026). Voir lib/tutor-v4/questionBank/6e/maths/correcteurs/types.ts.
//
// Pour chaque gabarit (`kind: "template"`) des notions demandées, 500 tirages :
//   1. règles communes : texte et réponse non vides ; la réponse attendue est
//      ACCEPTÉE par son propre comparateur ; en QCM, la bonne réponse figure
//      parmi les propositions, les propositions sont distinctes, et AUCUNE
//      proposition fausse n'est acceptée par le comparateur (« 0,5 » et « 1/2 »
//      seraient deux bonnes réponses) ; pas de « undefined », « NaN », « {… }»,
//      ni de point décimal anglais dans le texte (« 3.5 ») ;
//   2. le correcteur PROPRE au gabarit, qui recalcule à partir du texte lu.
// Un gabarit sans correcteur est en défaut.
//
// Usage : npx --yes tsx@4 scripts/verifier-correcteurs-maths-6e.ts [4e] [notionId|fichier|microId …]
//   (sans argument : toute la 6e ; « 4e » en premier : la 4e, depuis le 07/10/2026)

import { maths6eQuestionBank } from "@/lib/tutor-v4/questionBank/6e/maths/index";
import { CORRECTEURS_6E } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs";
import { maths4eQuestionBank } from "@/lib/tutor-v4/questionBank/4e/maths/index";
import { CORRECTEURS_4E } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs";
import { compareAnswer } from "@/lib/tutor/evaluation/comparators";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

const TIRAGES = 500;
const args = process.argv.slice(2);
const en4e = args[0] === "4e";
const filtres = args.filter((a) => a !== "4e" && a !== "6e");
const BANQUE: any[] = en4e ? maths4eQuestionBank : maths6eQuestionBank;
const CORRECTEURS = en4e ? CORRECTEURS_4E : CORRECTEURS_6E;
const gabarits = BANQUE.filter(
  (i) =>
    i.kind === "template" &&
    (!filtres.length || filtres.some((f) => i.notionId === f || i.microId === f || i.id.startsWith(f))),
);

/* ⛔⛔ LA DIVISION S'ÉCRIT « : » OU « ÷ » (Frédéric, 06/10/2026) : « les élèves
   ne savent pas que 5/2 signifie 5 : 2 ». Hors des notions où la fraction est
   l'objet d'étude, aucune barre entre deux nombres. Restent permis : les unités
   (km/h, m/s…) et les dates (12/05). */
// Fraction OBJET D'ÉTUDE : fractions, probabilités, pourcentages (25/100),
// fractions décimales (7/10 = 0,7), abscisses d'une demi-droite (1/4) et
// échelles « 1/200 » (Frédéric, 06/10 : « échelle 1/200 oui »).
// 4e : prop_pourcentages (25/100) aussi.
const NOTION_A_FRACTIONS = /^(fraction_|proba_|pourcentage_|decimal_nombre$|demi_droite_graduee$|prop_echelle$|prop_pourcentages$)/;
const BARRE_ENTRE_NOMBRES = /(?<![\d/])\d+(?:[,.]\d+)?\s*\/\s*\d+(?![\d/])/;

function reglesCommunes(q: TutorGeneratedQuestionV4, notionId: string): string[] {
  const p: string[] = [];
  if (!NOTION_A_FRACTIONS.test(notionId))
    for (const s of [q.text, ...(q.choices ?? []), ...(q.expected ?? []), q.explanation ?? ""].map(String)) {
      const m = s.match(BARRE_ENTRE_NOMBRES);
      if (m) p.push(`barre de fraction pour une division : « ${m[0]} » (écrire « : » ou « ÷ ») dans « ${s.slice(0, 120)} »`);
    }
  if (!q.text?.trim()) p.push("texte vide");
  if (!q.expected?.length || !String(q.expected[0]).trim()) p.push("réponse attendue vide");
  else if (!compareAnswer({ comparator: q.comparator, answer: String(q.expected[0]), expected: q.expected }))
    p.push(`la réponse attendue « ${q.expected[0]} » est refusée par son comparateur (${q.comparator})`);
  if (q.format === "qcm") {
    const c = q.choices ?? [];
    if (c.length < 2) p.push("QCM à moins de deux propositions");
    if (new Set(c.map((x) => x.trim())).size !== c.length) p.push("deux propositions identiques");
    const justes = c.filter((x) => compareAnswer({ comparator: q.comparator, answer: x, expected: q.expected }));
    if (justes.length === 0) p.push("la bonne réponse n'est pas parmi les propositions");
    if (justes.length > 1) p.push(`plusieurs propositions acceptées : ${justes.join(" | ")}`);
  }
  for (const s of [q.text, ...(q.choices ?? []), ...(q.expected ?? [])].map(String))
    if (/undefined|NaN|Infinity|\[object|\$\{|\d\.\d/.test(s) && !/\$[^$]*\d\.\d[^$]*\$/.test(s))
      p.push(`écriture suspecte : « ${s} »`);
  return p;
}

let fautes = 0;
const parMicro = new Map<string, any[]>();
for (const g of gabarits) parMicro.set(g.microId, [...(parMicro.get(g.microId) ?? []), g]);
for (const [micro, gs] of parMicro) {
  for (const g of gs) {
    const corriger = CORRECTEURS[g.id];
    const distinctes = new Set<string>();
    let probleme: string | null = corriger ? null : "aucun correcteur pour ce gabarit";
    for (let k = 0; k < TIRAGES && !probleme; k++) {
      let q: TutorGeneratedQuestionV4;
      try {
        q = g.generate();
      } catch (e) {
        probleme = `le gabarit plante : ${(e as Error).message}`;
        break;
      }
      const p = [...reglesCommunes(q, g.notionId), ...corriger!(q)];
      if (p.length)
        probleme = `${p.join(" ; ")}\n     ${q.text}\n     ✔ ${q.expected.join(" / ")}${q.choices ? `   choix : ${q.choices.join(" | ")}` : ""}`;
      distinctes.add(`${q.text}||${q.expected[0]}`);
    }
    if (probleme) fautes++;
    console.log(
      `${probleme ? "❌" : "✅"} ${micro.padEnd(30)} ${g.id.padEnd(44)} ${String(distinctes.size).padStart(4)} distinctes${probleme ? `\n   → ${probleme}` : ""}`,
    );
  }
}
console.log(
  `\n${fautes ? `❌ ${fautes} gabarit(s) en défaut` : `✅ ${gabarits.length} gabarit(s) justes`} (correcteur sur ${TIRAGES} tirages).`,
);
process.exit(fautes ? 1 : 0);
