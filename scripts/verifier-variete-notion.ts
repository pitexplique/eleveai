// SEPT MINUTES SUR UNE NOTION, SANS REVOIR LA MÊME QUESTION.
//
// ⭐ POURQUOI CE SCRIPT (25/08/2026). Frédéric : « un coach robuste, un élève
// doit pouvoir travailler 7 minutes sur une NOTION sans revoir la même
// question ; il y a des questions fixes mais aussi des générateurs. »
//
// `verifier-variete.mjs` compte par MICRO-COMPÉTENCE, et son seuil de dix vient
// de la même règle appliquée à dix minutes sur une micro. Mais ce que l'élève
// clique dans le coach, c'est une NOTION : elle rassemble plusieurs micros, et
// c'est à cette échelle-là que se mesure une séance. Une notion peut être verte
// micro par micro et servir malgré tout la même question deux fois, si le coach
// repioche dans la micro voisine.
//
// ⭐ ET LA PART DE FIXE COMPTE AUTANT QUE LE TOTAL. Un item `fixed` ne se
// renouvelle jamais : une notion à « 14 énoncés, dont 9 fixes » s'épuise bien
// plus vite qu'une notion à 14 énoncés tous générés. On affiche donc les deux,
// et l'on signale la notion qui vit surtout de ses questions figées.
//
// À une minute par question, sept minutes font SEPT énoncés distincts. On garde
// une marge et l'on demande dix, comme pour les micros.
//
// Usage :
//   npx --yes tsx@4 scripts/verifier-variete-notion.ts 3e francais
//   npx --yes tsx@4 scripts/verifier-variete-notion.ts 3e francais 15

import { loadQuestionBankV4 } from "@/lib/tutor-v4/loaders/loadQuestionBankV4";

const CLASSE = process.argv[2] ?? "3e";
const MATIERE = process.argv[3] ?? "francais";
const SEUIL = Number(process.argv[4] ?? 10);
/** Tirages par gabarit. 200 suffit à épuiser une table de quinze cas. */
const TIRAGES = 200;

type Item = {
  id: string;
  kind: string;
  notionId: string;
  text?: string;
  generate?: () => { text?: string };
};

async function main() {
  const bank = ((await loadQuestionBankV4(CLASSE, MATIERE)) ?? []) as Item[];
  if (!bank.length) {
    console.error(`Banque vide : ${CLASSE}/${MATIERE}`);
    process.exit(2);
  }

  const parNotion = new Map<string, { enonces: Set<string>; fixes: Set<string>; items: number }>();
  for (const item of bank) {
    const n = parNotion.get(item.notionId) ?? { enonces: new Set(), fixes: new Set(), items: 0 };
    n.items += 1;
    if (item.generate) {
      for (let t = 0; t < TIRAGES; t++) {
        const texte = item.generate()?.text;
        if (texte) n.enonces.add(texte);
      }
    } else if (item.text) {
      n.enonces.add(item.text);
      n.fixes.add(item.text);
    }
    parNotion.set(item.notionId, n);
  }

  console.log(`\nVARIÉTÉ PAR NOTION · ${CLASSE} · ${MATIERE} — seuil : ${SEUIL} énoncés distincts`);
  console.log("─".repeat(72));

  const lignes = [...parNotion.entries()]
    .map(([notionId, n]) => ({
      notionId,
      total: n.enonces.size,
      fixes: n.fixes.size,
      items: n.items,
    }))
    .sort((a, b) => a.total - b.total);

  let sous = 0;
  let figees = 0;
  for (const l of lignes) {
    const partFixe = l.total ? l.fixes / l.total : 1;
    const voyant = l.total < SEUIL ? "⛔" : partFixe > 0.5 ? "⚠️ " : "✅";
    if (l.total < SEUIL) sous += 1;
    else if (partFixe > 0.5) figees += 1;
    console.log(
      `${voyant} ${String(l.total).padStart(4)} énoncés (dont ${String(l.fixes).padStart(3)} fixes)` +
        ` · ${String(l.items).padStart(3)} items · ${l.notionId}`,
    );
  }

  const totaux = lignes.map((l) => l.total).sort((a, b) => a - b);
  console.log(
    `\nMédiane : ${totaux[Math.floor(totaux.length / 2)]} énoncés par notion` +
      ` · minimum : ${totaux[0]} · maximum : ${totaux[totaux.length - 1]}`,
  );

  if (sous) {
    console.log(`\n⛔ ${sous} notion(s) sous le seuil : sept minutes n'y tiennent pas.`);
  } else {
    console.log(`\n✅ Toutes les notions servent au moins ${SEUIL} énoncés distincts.`);
  }
  if (figees) {
    console.log(
      `⚠️  ${figees} notion(s) vivent surtout de questions figées : elles ne se renouvellent pas.`,
    );
  }
  process.exit(sous ? 1 : 0);
}

void main();
