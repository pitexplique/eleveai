// scripts/verifier-lecture-coach.ts
//
// Passe les questions du coach (énoncé, choix, réponse attendue, explication)
// dans `enMots`, comme le font le bouton « Écouter » et la lecture auto, et
// signale toute lecture qui garde un reste de code : « $ », « \ », « ^ »,
// « _ », « { », « } ». Les coachs d'anglais et d'espagnol ne sont pas lus en
// français : ils sont laissés de côté.
//
//   npx --yes tsx@4 scripts/verifier-lecture-coach.ts [tirages par gabarit]

import { loadQuestionBankV4 } from "../lib/tutor-v4/loaders/loadQuestionBankV4";
import { enMots } from "../lib/lecture-en-mots";

const COMBOS: [string, string][] = [
  ...["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "premiere-spe", "stmg", "terminale-spe", "adulte"].map((c) => [c, "maths"] as [string, string]),
  ...["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde"].map((c) => [c, "francais"] as [string, string]),
  ...["a1", "a2", "b1", "b2"].map((c) => [c, "economie"] as [string, string]),
  ...["a1", "a2", "b1", "b2", "c1", "pix-college", "pix-lycee"].map((c) => [c, "ia"] as [string, string]),
];

const TIRAGES = Number(process.argv[2] ?? 20);
const RESTE = /[$\\^_{}]/;

type Q = { text: string; choices?: string[]; expected?: string[]; explanation?: string };

async function main() {
  let lus = 0;
  const fautes = new Map<string, { exemple: string; brut: string; n: number }>();
  for (const [classe, matiere] of COMBOS) {
    const bank = await loadQuestionBankV4(classe, matiere);
    for (const item of bank) {
      const tirages: Q[] = [];
      if (item.kind === "fixed") tirages.push(item);
      else for (let i = 0; i < TIRAGES; i++) {
        try { tirages.push(item.generate()); } catch { /* un gabarit qui lève n'est pas l'objet ici */ }
      }
      for (const q of tirages) {
        const morceaux = [q.text, ...(q.choices ?? []), ...(q.expected ?? []), q.explanation ?? ""];
        for (const brut of morceaux) {
          if (!brut) continue;
          lus++;
          const lu = enMots(brut);
          const m = lu.match(RESTE);
          if (!m) continue;
          // On regroupe par ce qui entoure le reste de code.
          const i = m.index ?? 0;
          const cle = lu.slice(Math.max(0, i - 3), i + 4).replace(/\d/g, "9");
          const f = fautes.get(cle);
          if (f) f.n++;
          else fautes.set(cle, { exemple: `${item.id} → ${lu.slice(0, 200)}`, brut: brut.slice(0, 200), n: 1 });
        }
      }
    }
  }
  console.log(`${lus} textes lus.`);
  const tri = [...fautes.entries()].sort((a, b) => b[1].n - a[1].n);
  for (const [cle, f] of tri) console.log(`\n[${cle}] ×${f.n}\n  brut : ${f.brut}\n  lu   : ${f.exemple}`);
  const total = tri.reduce((s, [, f]) => s + f.n, 0);
  console.log(`\n${total} lectures gardent un reste de code.`);
  process.exit(total ? 1 : 0);
}

main();
