// MESURE DU VIVIER RÉEL de la banque de 5ᵉ en maths — celui où pioche
// l'épreuve blanche de 4ᵉ.
//
// POURQUOI CE SCRIPT (15/08). `simuler-epreuves-blanches` mesure la
// COMPLÉTUDE (« l'épreuve rend-elle ses 20 questions ? »), jamais la
// RÉPÉTITION. En français, il annonçait 10 passages pleins sur 10 alors que
// 15 énoncés distincts seulement alimentaient 50 questions posées : les mêmes
// revenaient dès le deuxième passage. Avant de faire passer une épreuve de 20
// à 62 questions, il faut donc compter ce qu'il y a vraiment à servir.
//
// CE QU'ON COMPTE : les ÉNONCÉS DISTINCTS ET JOUABLES, micro par micro. Un
// item `fixed` en vaut un ; un `template` en vaut autant que son générateur
// sait en produire, mesuré en le tirant, pas en le lisant. « Jouable » = ce
// que `materialiser` accepte : un énoncé, au moins deux propositions, une
// réponse attendue qui figure parmi elles.
//
// Usage :
//   npx --yes tsx@4 scripts/mesurer-vivier-4e-maths.ts

import { maths5eQuestionBank } from "@/lib/tutor-v4/questionBank/5e/maths";
import { buildKnowledge5eMaths } from "@/lib/tutor-v4/knowledge/maths/5e/buildKnowledge5e";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/** Combien de fois on tire un gabarit avant de conclure sur sa variété. */
const TIRAGES_PAR_GABARIT = 400;

const knowledge = buildKnowledge5eMaths();
const labelNotion = new Map(knowledge.notions.map((n) => [n.id, n.label]));
const labelMicro = new Map(knowledge.microSkills.map((m) => [m.id, m.label]));

/** Les mêmes contrôles que `materialiser` dans le moteur, rien de plus. */
function enonceJouable(item: TutorBankItemV4): string | null {
  const g =
    item.kind === "template"
      ? ({ ...item, ...item.generate() } as Record<string, unknown>)
      : (item as unknown as Record<string, unknown>);
  const text = g.text as string | undefined;
  const choices = g.choices as string[] | undefined;
  const expected = g.expected as string[] | undefined;
  if (!text) return null;
  const uniques = choices ? [...new Set(choices.map((c) => c.trim()))] : [];
  if (uniques.length < 2) return null;
  if (!expected || expected.length !== 1) return null;
  if (!choices!.includes(expected[0])) return null;
  return text;
}

type Compte = { items: number; enonces: Set<string>; sansQcm: number };

const parMicro = new Map<string, Compte>();
const notionDeMicro = new Map<string, string>();

for (const item of maths5eQuestionBank) {
  notionDeMicro.set(item.microId, item.notionId);
  let c = parMicro.get(item.microId);
  if (!c) {
    c = { items: 0, enonces: new Set(), sansQcm: 0 };
    parMicro.set(item.microId, c);
  }
  c.items += 1;

  if (item.kind === "template") {
    for (let i = 0; i < TIRAGES_PAR_GABARIT; i += 1) {
      const t = enonceJouable(item);
      if (t) c.enonces.add(t);
    }
    if (!c.enonces.size) c.sansQcm += 1;
  } else {
    const t = enonceJouable(item);
    if (t) c.enonces.add(t);
    else c.sansQcm += 1;
  }
}

// ── Restitution, groupée par notion ─────────────────────────────────────────
const parNotion = new Map<string, string[]>();
for (const micro of parMicro.keys()) {
  const n = notionDeMicro.get(micro)!;
  if (!parNotion.has(n)) parNotion.set(n, []);
  parNotion.get(n)!.push(micro);
}

let totalEnonces = 0;
const notionsTriees = [...parNotion.keys()].sort();

for (const notionId of notionsTriees) {
  const micros = parNotion.get(notionId)!.sort();
  const sousTotal = micros.reduce(
    (n, m) => n + parMicro.get(m)!.enonces.size,
    0,
  );
  totalEnonces += sousTotal;
  console.log(
    `\n■ ${notionId} — ${labelNotion.get(notionId) ?? "?"} · ` +
      `${micros.length} micros · ${sousTotal} énoncés jouables`,
  );
  for (const m of micros) {
    const c = parMicro.get(m)!;
    const alerte =
      c.enonces.size === 0
        ? "  ⛔ AUCUN ÉNONCÉ JOUABLE"
        : c.enonces.size < 5
          ? "  ⚠️ maigre"
          : "";
    console.log(
      `    ${m.padEnd(34)} ${String(c.enonces.size).padStart(4)} énoncés ` +
        `(${c.items} items, ${c.sansQcm} hors QCM)  ${labelMicro.get(m) ?? ""}${alerte}`,
    );
  }
}

console.log(
  `\n══ TOTAL · ${notionsTriees.length} notions · ${parMicro.size} micros · ` +
    `${maths5eQuestionBank.length} items · ${totalEnonces} énoncés distincts jouables\n`,
);
