// ─── Ce qu'un QCM FIGÉ sert vraiment : combien de lignes, et où tombe la bonne ──
//
// ⛔ POURQUOI CE SCRIPT EXISTE (23/08/2026). Frédéric : « lorsque tu écris un QCM
// fais attention à l'ordre des bonnes réponses ». En allant vérifier, deux choses.
//
// ⭐ 1. LE MÉLANGE EST JUSTE, et ce script le REDIT à chaque exécution. Le
// correctif du 11/08/2026 tient : sur les QCM à quatre lignes, la bonne réponse
// tombe à 25 % dans chaque position. C'est la seule façon de savoir qu'il tient
// encore — un mélange qui redevient faux ne casse rien, il rend juste les
// questions plus faciles, en silence.
//
// ⛔⛔ 2. NE PAS CONFONDRE UNE PRÉFÉRENCE ET UNE RÈGLE. Ma première version
// signalait comme un défaut tout QCM servant moins de quatre propositions.
// Frédéric a corrigé : « il peut y en avoir à deux propositions, d'autres à
// trois, d'autres à quatre — IXL a souvent deux propositions ». Deux lignes est
// une forme légitime, et la variété vaut mieux que l'uniformité. Ce script
// MESURE donc la distribution, il ne la juge pas.
//
// Il ne fait échouer que sur ce qui est indéfendable :
//   · un QCM qui ne sert qu'UNE proposition — l'élève n'a rien à choisir ;
//   · un QCM dont la bonne réponse n'est PAS dans les propositions — il est
//     impossible à réussir, et aucun autre vérificateur ne le voit.
//
// ⚠️ ON MESURE CE QUI EST SERVI, PAS CE QUI EST ÉCRIT. Le pipeline déduplique
// les propositions avant de les mélanger : quatre lignes dont deux identiques
// n'en font que trois à l'écran.
//
// Usage :
//   npx --yes tsx@4 scripts/verifier-propositions-qcm.ts             → toutes les classes
//   npx --yes tsx@4 scripts/verifier-propositions-qcm.ts cm2 6e      → certaines
//   npx --yes tsx@4 scripts/verifier-propositions-qcm.ts --matiere francais

import { loadQuestionBankV4 } from "@/lib/tutor-v4/loaders/loadQuestionBankV4";

/* Recopié de `shuffleChoices` (lib/tutor-v4/questionPairBuilder.ts) : mélange
   déterministe amorcé sur l'id, lecture des bits de POIDS FORT.
   ⚠️ Si les deux fonctions divergent un jour, c'est CE CONTRÔLE qui devient
   faux, pas le coach — le relire avant de conclure à un biais. */
function uniques(choices: string[]): string[] {
  const vus = new Set<string>();
  return choices.filter((c) => {
    if (vus.has(c)) return false;
    vus.add(c);
    return true;
  });
}

function shuffleChoices(choices: string[], id: string): string[] {
  let seed = 0;
  for (let i = 0; i < id.length; i++) seed = (seed * 31 + id.charCodeAt(i)) >>> 0;
  const arr = uniques(choices);
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = Math.floor((seed / 0x100000000) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const CLASSES = [
  "cp",
  "ce1",
  "ce2",
  "cm1",
  "cm2",
  "6e",
  "5e",
  "4e",
  "3e",
  "seconde",
  "premiere-spe",
  "terminale-spe",
  "stmg",
  "adulte",
] as const;

type Item = {
  id: string;
  kind: string;
  format?: string;
  choices?: string[];
  expected?: string[];
  microId?: string;
};

async function main() {
  const argv = process.argv.slice(2);
  const iMat = argv.indexOf("--matiere");
  const matiere = iMat >= 0 ? argv[iMat + 1] : "maths";
  // ⚠️ `iMat + 1` ne doit exclure une position que si `--matiere` est PRÉSENT :
  // sans lui, iMat vaut -1 et `i !== 0` mangeait le premier argument — le script
  // mesurait alors toutes les classes en croyant n'en mesurer qu'une.
  const args = argv.filter(
    (a, i) => !a.startsWith("--") && !(iMat >= 0 && i === iMat + 1)
  );
  const cibles = args.length ? args : [...CLASSES];

  const positions = new Map<number, number>();
  let totalQuatre = 0;
  const solitaires: { classe: string; id: string }[] = [];
  const impossibles: { classe: string; id: string }[] = [];

  console.log(`\nPROPOSITIONS DES QCM FIGÉS · ${matiere}`);
  console.log("─".repeat(72));

  for (const classe of cibles) {
    let bank: Item[] = [];
    try {
      bank = ((await loadQuestionBankV4(classe, matiere)) ?? []) as Item[];
    } catch {
      continue;
    }

    const qcm = bank.filter(
      (i) => i.kind === "fixed" && i.format === "qcm" && i.choices && i.expected
    );
    if (!qcm.length) continue;

    const parTaille = new Map<number, number>();
    for (const item of qcm) {
      const servi = shuffleChoices(item.choices!, item.id);
      parTaille.set(servi.length, (parTaille.get(servi.length) ?? 0) + 1);

      if (servi.length < 2) solitaires.push({ classe, id: item.id });
      if (!servi.includes(item.expected![0])) impossibles.push({ classe, id: item.id });

      if (servi.length === 4) {
        const idx = servi.indexOf(item.expected![0]);
        if (idx >= 0) {
          positions.set(idx + 1, (positions.get(idx + 1) ?? 0) + 1);
          totalQuatre += 1;
        }
      }
    }

    const detail = [...parTaille.keys()]
      .sort((a, b) => a - b)
      .map((t) => `${t} lignes : ${String(parTaille.get(t)).padStart(4)}`)
      .join("   ");
    console.log(`  ${classe.padEnd(14)} ${String(qcm.length).padStart(4)} QCM   ${detail}`);
  }

  console.log(
    "\n  ⭐ Deux, trois ou quatre lignes sont toutes des formes légitimes, et la",
    "\n     variété vaut mieux que l'uniformité. Ce tableau se LIT, il ne se corrige pas."
  );

  // ── Le contrôle qui compte : le mélange ──
  console.log("\nCONTRÔLE DU MÉLANGE — position servie de la bonne réponse (QCM à 4 lignes)");
  console.log("─".repeat(72));
  const ecart = Math.sqrt(totalQuatre * 0.25 * 0.75);
  let pire = 0;
  for (let p = 1; p <= 4; p++) {
    const n = positions.get(p) ?? 0;
    const pct = ((n / totalQuatre) * 100).toFixed(1);
    const sigma = ecart > 0 ? (n - totalQuatre / 4) / ecart : 0;
    pire = Math.max(pire, Math.abs(sigma));
    console.log(
      `   position ${p} : ${String(n).padStart(5)}   ${pct.padStart(5)} %   (${sigma.toFixed(1)}σ)`
    );
  }
  console.log(
    pire < 3
      ? `\n🟢 ${totalQuatre} items mesurés, écart maximal ${pire.toFixed(1)}σ — le mélange est juste.`
      : `\n⛔ Écart maximal ${pire.toFixed(1)}σ sur ${totalQuatre} items — relire shuffleChoices.`
  );

  // ── Les vrais défauts ──
  let faute = false;
  if (solitaires.length) {
    faute = true;
    console.log(`\n⛔ ${solitaires.length} QCM ne servent qu'UNE proposition — rien à choisir :`);
    for (const s of solitaires.slice(0, 20)) console.log(`   · ${s.classe} · ${s.id}`);
  }
  if (impossibles.length) {
    faute = true;
    console.log(
      `\n⛔ ${impossibles.length} QCM dont la BONNE RÉPONSE n'est pas dans les propositions —`,
      "\n   impossibles à réussir, et aucun autre vérificateur ne les voit :"
    );
    for (const s of impossibles.slice(0, 20)) console.log(`   · ${s.classe} · ${s.id}`);
  }
  if (!faute) {
    console.log("\n✅ Chaque QCM figé offre un vrai choix, et sa bonne réponse y figure.");
  }

  process.exit(faute || pire >= 3 ? 1 : 0);
}

void main();
