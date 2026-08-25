// CE QUI SE RENOUVELLE — les énoncés GÉNÉRÉS, comptés à part des figés.
//
// ⛔⛔ POURQUOI CE SCRIPT EXISTE (25/08/2026). Frédéric, en majuscules :
// « IL FAUT DES GÉNÉRATEURS. Un élève doit pouvoir rester sans les mêmes
// questions pendant des minutes. »
//
// `verifier-variete.mjs` ADDITIONNE les énoncés fixes et les énoncés générés, et
// pose son seuil sur le total. Une micro tenue par huit questions figées et un
// gabarit qui n'en fabrique que cinq mesure donc « 13 énoncés » et passe au
// vert — alors qu'un `fixed` ne se renouvelle JAMAIS : il compte pour une
// question, et l'élève la revoit à chaque tirage.
//
// Mesuré ce jour-là sur la 3e de français, toutes micros au vert par ailleurs :
//
//     3e_gram_accords          5 générés  ·  7 fixes   →  « 12 énoncés »
//     3e_conj_identifier       5 générés  ·  8 fixes   →  « 13 énoncés »
//     3e_voc_reemploi          6 générés  ·  7 fixes   →  « 13 énoncés »
//     … seize micros dans ce cas, sur soixante-neuf.
//
// Le total mesurait une QUANTITÉ ; celui-ci mesure un RENOUVELLEMENT. Ce sont
// deux grandeurs différentes, et c'est la seconde que Frédéric demande.
//
// ⭐ LE SEUIL. À une question par minute, « des minutes » sans répétition veut
// dire au moins une dizaine d'énoncés que le coach sait FABRIQUER. On demande
// donc 12 par défaut — et l'on affiche le nombre de gabarits, parce qu'une
// micro à gabarit unique tombe en panne dans le mode complet du coach
// (`allowSingleItem: false`, voir `verifier-demarrage.ts`).
//
// ⚠️ EN FRANÇAIS, TOUJOURS UNE VARIANTE `.ts` : le chargeur passe par des
// imports en alias `@/…` que `node --experimental-strip-types` ne résout pas.
//
// Usage :
//   npx --yes tsx@4 scripts/verifier-renouvellement.ts 3e francais
//   npx --yes tsx@4 scripts/verifier-renouvellement.ts 3e francais 20

import { loadQuestionBankV4 } from "@/lib/tutor-v4/loaders/loadQuestionBankV4";

const CLASSE = process.argv[2] ?? "3e";
const MATIERE = process.argv[3] ?? "francais";
const SEUIL = Number(process.argv[4] ?? 12);
/** Tirages par gabarit. 300 épuise une table de quinze cas sans effort. */
const TIRAGES = 300;

type Item = {
  id: string;
  microId: string;
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

  const par = new Map<
    string,
    { notionId: string; gen: Set<string>; fixes: number; gabarits: number }
  >();
  for (const it of bank) {
    const m =
      par.get(it.microId) ?? { notionId: it.notionId, gen: new Set<string>(), fixes: 0, gabarits: 0 };
    if (it.generate) {
      m.gabarits += 1;
      for (let t = 0; t < TIRAGES; t++) {
        const x = it.generate()?.text;
        if (x) m.gen.add(x);
      }
    } else {
      m.fixes += 1;
    }
    par.set(it.microId, m);
  }

  const lignes = [...par.entries()]
    .map(([microId, m]) => ({
      microId,
      notionId: m.notionId,
      gen: m.gen.size,
      fixes: m.fixes,
      gabarits: m.gabarits,
    }))
    .sort((a, b) => a.gen - b.gen);

  console.log(`\nCE QUI SE RENOUVELLE · ${CLASSE} · ${MATIERE} — seuil : ${SEUIL} énoncés GÉNÉRÉS`);
  console.log("─".repeat(76));
  console.log("  générés  gabarits  fixes   micro-compétence");

  const sous = lignes.filter((l) => l.gen < SEUIL);
  const seuls = lignes.filter((l) => l.gabarits < 2);
  for (const l of sous) {
    console.log(
      `⛔ ${String(l.gen).padStart(6)}  ${String(l.gabarits).padStart(6)}  ${String(l.fixes).padStart(5)}   ${l.microId}  (${l.notionId})`,
    );
  }

  const g = lignes.map((l) => l.gen).sort((a, b) => a - b);
  console.log(
    `\nMédiane : ${g[Math.floor(g.length / 2)]} énoncés générés par micro` +
      ` · minimum : ${g[0]} · maximum : ${g[g.length - 1]}`,
  );

  if (sous.length) {
    console.log(
      `\n⛔ ${sous.length} micro(s) sous ${SEUIL} énoncés générés.` +
        `\n→ Ne pas combler avec des questions figées : elles ne se renouvellent pas.` +
        `\n   Écrire un GABARIT, sur une table d'au moins quinze cas.`,
    );
  } else {
    console.log(`\n✅ Toutes les micro-compétences FABRIQUENT au moins ${SEUIL} énoncés distincts.`);
  }

  if (seuls.length) {
    console.log(
      `\n⚠️  ${seuls.length} micro(s) n'ont qu'un seul gabarit : le mode complet du coach` +
        `\n   oppose deux questions et exige deux items (voir verifier-demarrage.ts).`,
    );
    for (const l of seuls.slice(0, 10)) console.log(`   · ${l.microId}`);
  }

  process.exit(sous.length ? 1 : 0);
}

void main();
