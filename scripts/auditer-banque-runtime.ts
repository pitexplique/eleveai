// Audit de couverture des banques de FRANÇAIS — à l'exécution, pas en lisant
// le source.
//
// POURQUOI UN SECOND AUDIT (01/08/2026). `auditer-banque.mjs` lit les fichiers
// et compte les `microId: "…"`. Ça marche pour les maths, dont les banques
// sont des tableaux littéraux. Ça ne marche PAS pour le français, bâti tout
// autrement :
//   - les micro-compétences du collège sont GÉNÉRÉES
//     (buildCollegeFrancaisMicroSkills) : aucun `id:` littéral à lire ;
//   - les items passent par une fabrique `qcm(id, notionId, microId, …)` à
//     arguments positionnels : aucun `microId: "…"` non plus ;
//   - la banque du coach mélange des gabarits générés et une couche « fixed »
//     écrite à la main.
// L'audit source annonçait donc 0 % partout en français — faux de bout en
// bout. Ici on importe les modules et on compte ce qui existe vraiment.
//
// IMPORTS EXPLICITES ET NON DYNAMIQUES : une première version devinait les
// chemins (`buildKnowledge${classe}`) et tombait en marche silencieusement,
// en affichant « illisible » pour tout. Un audit qui échoue doit échouer
// bruyamment ; le plus sûr reste de nommer les modules à la main.
//
// Usage — tsx n'est PAS une dépendance du projet, npx le récupère au vol :
//   npx --yes tsx@4 scripts/auditer-banque-runtime.ts
//   npx --yes tsx@4 scripts/auditer-banque-runtime.ts cm2 5e --epreuve
// (`--epreuve` ajoute le décompte des items réellement tirables par une
//  épreuve blanche, notion par notion.)

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { getKnowledgePack, type Classe } from "@/lib/tutor-v4/catalog";

import { francaisCm1QuestionBank } from "@/lib/tutor-v4/questionBank/cm1/francais";
import { francaisCm2QuestionBank } from "@/lib/tutor-v4/questionBank/cm2/francais";
import { francais6eQuestionBank } from "@/lib/tutor-v4/questionBank/6e/francais";
import { francais5eQuestionBank } from "@/lib/tutor-v4/questionBank/5e/francais";
import { francais4eQuestionBank } from "@/lib/tutor-v4/questionBank/4e/francais";
import { francais3eQuestionBank } from "@/lib/tutor-v4/questionBank/3e/francais";

const BANQUES: Record<string, TutorBankItemV4[]> = {
  cm1: francaisCm1QuestionBank,
  cm2: francaisCm2QuestionBank,
  "6e": francais6eQuestionBank,
  "5e": francais5eQuestionBank,
  "4e": francais4eQuestionBank,
  "3e": francais3eQuestionBank,
};

/** Seuil sous lequel un micro n'a pas de quoi tenir deux passages. */
const SEUIL_FIXES = 3;

function auditer(classe: string) {
  const banque = BANQUES[classe];
  if (!banque) {
    console.log(`\n${classe.toUpperCase()} — pas de banque déclarée dans ce script.`);
    return;
  }

  const pack = getKnowledgePack(classe as Classe, "francais");

  const compte = new Map<string, { fixes: number; templates: number }>();
  for (const item of banque) {
    const c = compte.get(item.microId) ?? { fixes: 0, templates: 0 };
    if (item.kind === "template") c.templates += 1;
    else c.fixes += 1;
    compte.set(item.microId, c);
  }

  const jamais: { id: string; label: string; notionId: string }[] = [];
  const maigres: { id: string; label: string; fixes: number }[] = [];
  let totalFixes = 0;
  let totalTemplates = 0;

  for (const micro of pack.microSkills) {
    const c = compte.get(micro.id);
    if (!c) {
      jamais.push({ id: micro.id, label: micro.label, notionId: micro.notionId });
      continue;
    }
    totalFixes += c.fixes;
    totalTemplates += c.templates;
    if (c.templates === 0 && c.fixes < SEUIL_FIXES) {
      maigres.push({ id: micro.id, label: micro.label, fixes: c.fixes });
    }
  }

  // Micros portés par la banque mais absents du knowledge : le coach travaille
  // alors une compétence qu'aucun bilan ne peut nommer.
  const declares = new Set(pack.microSkills.map((m) => m.id));
  const orphelins = [...compte.keys()].filter((id) => !declares.has(id));

  const couverts = pack.microSkills.length - jamais.length;
  const pct = Math.round((couverts / pack.microSkills.length) * 100);
  const densite = (totalFixes / pack.microSkills.length).toFixed(1);

  console.log(`\n${classe.toUpperCase()} · FRANÇAIS`);
  console.log("─".repeat(62));
  console.log(
    `${pack.notions.length} notions · ${pack.microSkills.length} micro-compétences`,
  );
  console.log(
    `${totalFixes} items fixes + ${totalTemplates} générés · ${densite} fixes par micro`,
  );
  console.log(`COUVERTURE : ${couverts}/${pack.microSkills.length} (${pct} %)`);

  if (jamais.length) {
    console.log(`⛔ SANS AUCUN ITEM : ${jamais.length}`);
    for (const j of jamais) {
      console.log(`      ${j.notionId} / ${j.id} — ${j.label}`);
    }
  }
  if (maigres.length) {
    console.log(`⚠️  SOUS ${SEUIL_FIXES} ITEMS FIXES : ${maigres.length}`);
    for (const m of maigres) console.log(`      ${m.fixes}  ${m.id} — ${m.label}`);
  }
  if (orphelins.length) {
    console.log(`🔍 EN BANQUE MAIS PAS DANS LE KNOWLEDGE : ${orphelins.length}`);
    for (const o of orphelins) console.log(`      ${o}`);
  }
}

/**
 * CE QUE L'ÉPREUVE BLANCHE PEUT RÉELLEMENT UTILISER. Le chiffre qui compte
 * n'est pas le nombre d'items mais le nombre d'items JOUABLES : l'évaluation
 * nationale ne pose que des questions fermées, et notre tirage écarte tout ce
 * qui n'a pas de propositions. Un thème riche en items « à saisir » et pauvre
 * en QCM sort de l'épreuve sans qu'on s'en aperçoive — c'est précisément le
 * défaut trouvé le 01/08 sur l'épreuve de 4ᵉ en maths.
 */
function eligibilite(classe: string) {
  const banque = BANQUES[classe];
  if (!banque) return;
  const pack = getKnowledgePack(classe as Classe, "francais");
  const labels = new Map(pack.notions.map((n) => [n.id, n.label]));

  const parNotion = new Map<string, { total: number; jouables: number }>();
  for (const item of banque) {
    const c = parNotion.get(item.notionId) ?? { total: 0, jouables: 0 };
    c.total += 1;
    const brut = item as unknown as Record<string, unknown>;
    let choices = brut.choices as string[] | undefined;
    if (item.kind === "template") {
      try {
        choices = (item.generate() as { choices?: string[] }).choices;
      } catch {
        choices = undefined;
      }
    }
    if (choices && choices.length >= 2) c.jouables += 1;
    parNotion.set(item.notionId, c);
  }

  console.log(`\n${classe.toUpperCase()} — ce qu'une épreuve fermée peut tirer`);
  for (const [notionId, c] of [...parNotion].sort((a, b) => a[1].jouables - b[1].jouables)) {
    const pct = Math.round((c.jouables / c.total) * 100);
    const alerte = c.jouables < 5 ? "  ⛔ TROP PEU" : "";
    console.log(
      `      ${String(c.jouables).padStart(3)}/${String(c.total).padEnd(4)} (${String(pct).padStart(3)} %)  ${labels.get(notionId) ?? notionId}${alerte}`,
    );
  }
}

const args = process.argv.slice(2);
const avecEligibilite = args.includes("--epreuve");
const classes = args.filter((a) => !a.startsWith("--"));
const cibles = classes.length ? classes : Object.keys(BANQUES);
for (const classe of cibles) auditer(classe);
if (avecEligibilite) for (const classe of cibles) eligibilite(classe);
console.log("");
