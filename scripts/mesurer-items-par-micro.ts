// COMBIEN D'ITEMS CHAQUE MICRO A-T-ELLE VRAIMENT, ET DANS QUEL MODE ELLE VIT
//
// POURQUOI (23/11/2026). `verifier-demarrage-tout.ts` dit QUE ça ne démarre
// pas ; il ne dit pas CE QU'IL FAUT ÉCRIRE. Le moteur, lui, est explicite
// (`questionPairBuilder.ts:349` et `:402`) :
//
//   allForMicro = bank.filter(i => i.notionId === notionId && i.microId === microId)
//   un seul item suffit SI allowSingleItem (mode simple SEUL) ET kind === "template"
//
// D'où quatre états possibles pour une micro, et un seul se voit à l'oeil nu :
//   ≥ 2 items          → vit dans les deux modes
//   1 item « template » → vit en SIMPLE seulement (un générateur se dédouble)
//   1 item « fixed »    → morte dans les deux modes
//   0 item              → morte dans les deux modes
//
// ⭐⭐ ET LE CONTRÔLE QUI NE SE VOIT NULLE PART : le filtre exige que les DEUX
// clés tombent juste. Un item au bon `microId` mais au mauvais `notionId` est
// écrit, compté par les vérificateurs de banque, et INTROUVABLE par le moteur.
// Ce script les liste à part : ce sont des items déjà payés qui n'atteignent
// aucun élève.
//
// Usage :
//   npx --yes tsx@4 scripts/mesurer-items-par-micro.ts <classe> [matiere]

import { loadKnowledgeV4 } from "@/lib/tutor-v4/loaders/loadKnowledgeV4";
import { loadQuestionBankV4 } from "@/lib/tutor-v4/loaders/loadQuestionBankV4";

const CLASSE = process.argv[2];
const MATIERE = process.argv[3] ?? "maths";
if (!CLASSE) {
  console.error("Usage : npx --yes tsx@4 scripts/mesurer-items-par-micro.ts <classe> [matiere]");
  process.exit(1);
}

async function main() {
  const knowledge = await loadKnowledgeV4(CLASSE, MATIERE);
  const bank = await loadQuestionBankV4(CLASSE as never, MATIERE as never);

  const cles = new Set(knowledge.microSkills.map((m) => `${m.notionId}|${m.id}`));
  const microsParId = new Map(knowledge.microSkills.map((m) => [m.id, m]));

  /* Les items rangés sous un couple (notion, micro) qui n'existe pas. */
  const orphelins: { id: string; notionId: string; microId: string; bonneNotion?: string }[] = [];
  for (const item of bank) {
    const notionId = (item as { notionId?: string }).notionId ?? "";
    const microId = (item as { microId?: string }).microId ?? "";
    if (cles.has(`${notionId}|${microId}`)) continue;
    const vraie = microsParId.get(microId);
    orphelins.push({ id: (item as { id: string }).id, notionId, microId, bonneNotion: vraie?.notionId });
  }

  type Etat = "deux-modes" | "simple-seulement" | "morte-1-fige" | "morte-0-item";
  const etat = new Map<string, { micro: string; notion: string; items: number; templates: number; fixes: number; etat: Etat }>();

  for (const m of knowledge.microSkills) {
    const items = bank.filter(
      (i) => (i as { notionId?: string }).notionId === m.notionId && (i as { microId?: string }).microId === m.id
    );
    const templates = items.filter((i) => (i as { kind?: string }).kind === "template").length;
    const fixes = items.length - templates;
    let e: Etat;
    if (items.length >= 2) e = "deux-modes";
    else if (items.length === 1 && templates === 1) e = "simple-seulement";
    else if (items.length === 1) e = "morte-1-fige";
    else e = "morte-0-item";
    etat.set(m.id, { micro: m.id, notion: m.notionId, items: items.length, templates, fixes, etat: e });
  }

  const parEtat = (e: Etat) => [...etat.values()].filter((x) => x.etat === e);

  console.log(`\nITEMS PAR MICRO · ${CLASSE} · ${MATIERE}`);
  console.log("═".repeat(96));
  console.log(`${knowledge.notions.length} notions · ${knowledge.microSkills.length} micros · ${bank.length} items en banque\n`);
  console.log(`🟢 ${parEtat("deux-modes").length.toString().padStart(4)} micros vivent dans LES DEUX modes (≥ 2 items)`);
  console.log(`🟠 ${parEtat("simple-seulement").length.toString().padStart(4)} micros vivent en SIMPLE SEULEMENT (1 générateur)`);
  console.log(`⛔ ${parEtat("morte-1-fige").length.toString().padStart(4)} micros mortes dans les deux modes (1 seul item FIGÉ)`);
  console.log(`⛔ ${parEtat("morte-0-item").length.toString().padStart(4)} micros mortes dans les deux modes (AUCUN item)`);

  /* Le détail par notion, pour les notions qui ne tiennent pas le mode complet. */
  const notionsFragiles = new Map<string, typeof parEtat extends never ? never : { notion: string; micros: ReturnType<typeof parEtat> }>();
  for (const x of etat.values()) {
    if (x.etat === "deux-modes") continue;
    const e = notionsFragiles.get(x.notion) ?? { notion: x.notion, micros: [] as never[] };
    (e.micros as unknown[]).push(x);
    notionsFragiles.set(x.notion, e as never);
  }

  if (notionsFragiles.size) {
    console.log("\n" + "═".repeat(96));
    console.log("LES NOTIONS QUI NE TIENNENT PAS LE MODE COMPLET — et ce qu'il faut y écrire");
    console.log("═".repeat(96));
    for (const { notion, micros } of [...notionsFragiles.values()].sort((a, b) => b.micros.length - a.micros.length)) {
      const total = knowledge.microSkills.filter((m) => m.notionId === notion).length;
      console.log(`\n── ${notion}  (${micros.length} micros fragiles sur ${total})`);
      for (const x of micros as { micro: string; items: number; templates: number; fixes: number; etat: string }[]) {
        const quoi =
          x.etat === "simple-seulement" ? "1 générateur → il manque UN second item"
          : x.etat === "morte-1-fige" ? "1 item FIGÉ → il manque UN second item (ou en faire un générateur)"
          : "AUCUN item → tout est à écrire";
        console.log(`   ${x.micro.padEnd(36)} ${String(x.items).padStart(2)} item(s) (${x.templates} gén. / ${x.fixes} figé) · ${quoi}`);
      }
    }
  }

  if (orphelins.length) {
    console.log("\n" + "═".repeat(96));
    console.log(`⛔⛔ ${orphelins.length} ITEM(S) RANGÉ(S) SOUS UN COUPLE QUI N'EXISTE PAS — écrits et introuvables`);
    console.log("═".repeat(96));
    for (const o of orphelins) {
      const piste = o.bonneNotion ? `la micro existe sous la notion « ${o.bonneNotion} »` : "cette micro n'existe nulle part";
      console.log(`   ${o.id.padEnd(40)} notionId=${o.notionId} microId=${o.microId}  → ${piste}`);
    }
  }

  const aEcrire = parEtat("simple-seulement").length + parEtat("morte-1-fige").length + parEtat("morte-0-item").length * 2;
  console.log("\n" + "═".repeat(96));
  console.log(`POUR QUE LA CLASSE TIENNE LE MODE COMPLET : ~${aEcrire} item(s) à écrire, sur ${notionsFragiles.size} notion(s).`);
  if (parEtat("morte-1-fige").length || parEtat("morte-0-item").length) process.exit(1);
}

main();
