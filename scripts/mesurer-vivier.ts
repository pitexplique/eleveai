// COMBIEN DE QUESTIONS DISTINCTES, MICRO-COMPÉTENCE PAR MICRO-COMPÉTENCE ?
//
// POURQUOI CE COMPTEUR-LÀ (17/08/2026). Compter les ITEMS ne dit rien : un
// gabarit en vaut dix, un item figé en vaut un. Et compter les TEXTES gonfle
// le résultat, parce qu'un réservoir de décors — « la boulangerie Vanille »,
// « le garage Delmas » — produit dix textes pour une seule question.
//
// La clé d'une question, c'est son ÉNONCÉ ET SES PROPOSITIONS. Deux tirages
// qui posent le même problème avec les mêmes choix sont la même question, quel
// que soit l'habillage ; deux tirages qui changent le cas traité en font deux.
//
// ⚠️ NE DOUBLE PAS `echantillon-banque.mjs`. Celui-là signe une question par
// les NOMBRES qu'elle contient — la bonne clé en maths, inopérante sur une
// matière textuelle comme l'IA, où aucun énoncé ne contient de nombre.
//
// Le seuil : sous 6 questions, un élève qui revient trois fois a tout vu.
//
// Usage :
//   npx --yes tsx@4 scripts/mesurer-vivier.ts <classe> <matiere> [tirages]
//   npx --yes tsx@4 scripts/mesurer-vivier.ts pix-college ia

import { loadKnowledgeV4 } from "@/lib/tutor-v4/loaders/loadKnowledgeV4";
import { loadQuestionBankV4 } from "@/lib/tutor-v4/loaders/loadQuestionBankV4";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const CLASSE = process.argv[2];
const MATIERE = process.argv[3] ?? "maths";
const TIRAGES = Number(process.argv[4]) || 400;

/** Sous ce nombre, la micro-compétence ne tient pas trois passages. */
const SEUIL = 6;
/** L'objectif visé pour un coach où l'on revient. */
const CIBLE = 8;

if (!CLASSE) {
  console.error("Usage : npx --yes tsx@4 scripts/mesurer-vivier.ts <classe> <matiere>");
  process.exit(1);
}

function cle(texte: string, choix: string[] | undefined): string {
  return `${texte.trim()}||${(choix ?? []).slice().sort().join("~")}`;
}

async function main() {
  const knowledge = await loadKnowledgeV4(CLASSE, MATIERE);
  const bank = (await loadQuestionBankV4(CLASSE, MATIERE)) as TutorBankItemV4[];

  const parMicro = new Map<string, TutorBankItemV4[]>();
  for (const item of bank) {
    const l = parMicro.get(item.microId) ?? [];
    l.push(item);
    parMicro.set(item.microId, l);
  }

  const lignes: { micro: string; label: string; items: number; gabarits: number; vivier: number }[] = [];

  for (const micro of knowledge.microSkills) {
    const items = parMicro.get(micro.id) ?? [];
    const vues = new Set<string>();
    let gabarits = 0;

    for (const item of items as any[]) {
      if (item.kind === "fixed") {
        vues.add(cle(item.text, item.choices));
        continue;
      }
      gabarits += 1;
      for (let i = 0; i < TIRAGES; i++) {
        try {
          const q = item.generate();
          vues.add(cle(q.text, q.choices));
        } catch {
          break;
        }
      }
    }

    lignes.push({
      micro: micro.id,
      label: micro.label,
      items: items.length,
      gabarits,
      vivier: vues.size,
    });
  }

  console.log(`\nVIVIER RÉEL · ${CLASSE} · ${MATIERE}`);
  console.log("─".repeat(78));
  console.log(`Clé d'une question : énoncé + propositions. ${TIRAGES} tirages par gabarit.\n`);

  let notionCourante = "";
  for (const l of lignes.sort((a, b) => a.micro.localeCompare(b.micro))) {
    const notion = l.micro.split(".").slice(0, 2).join(".");
    if (notion !== notionCourante) {
      notionCourante = notion;
      console.log(`── ${notion}`);
    }
    const drap = l.vivier < SEUIL ? "🔴" : l.vivier < CIBLE ? "🟠" : "🟢";
    console.log(
      `  ${drap} ${l.micro.padEnd(8)} ${String(l.items).padStart(2)} items` +
        `${l.gabarits ? ` (${l.gabarits} gabarit)` : "          "}` +
        ` → ${String(l.vivier).padStart(3)} questions   ${l.label.slice(0, 42)}`,
    );
  }

  const total = lignes.reduce((s, l) => s + l.vivier, 0);
  const maigres = lignes.filter((l) => l.vivier < SEUIL);
  const moyens = lignes.filter((l) => l.vivier >= SEUIL && l.vivier < CIBLE);
  const mediane = lignes
    .map((l) => l.vivier)
    .sort((a, b) => a - b)[Math.floor(lignes.length / 2)];

  console.log(`\n${lignes.length} micro-compétences · ${total} questions distinctes · médiane ${mediane}`);
  console.log(
    `🔴 ${maigres.length} sous ${SEUIL} · 🟠 ${moyens.length} entre ${SEUIL} et ${CIBLE} · ` +
      `🟢 ${lignes.length - maigres.length - moyens.length} à ${CIBLE} et plus`,
  );
  console.log();
}

main();
