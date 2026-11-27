// Combien de micro-competences de terminale spe ont deja une video PAYSAGE ?
//
// Lecture seule. Deux sources, et aucune n'est un souvenir :
//   - le catalogue (buildKnowledgeTerminaleSpeMaths) donne les micros qui EXISTENT ;
//   - notion_ressources donne les micros qu'un eleve voit deja servis.
// On compte par MICRO. Frederic compte en VIDEOS : une serie couvre une notion en
// 4 a 6 episodes, donc ~15 notions restantes font ~55 videos pour ~74 micros.
//
// Usage :  npx tsx manim/poste2/couverture-videos-tle.ts
import { buildKnowledgeTerminaleSpeMaths } from "../../lib/tutor-v4/knowledge/maths/terminale-spe/buildKnowledgeTerminaleSpe";
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";

async function main() {
  const env = fs.readFileSync(".env.local", "utf8");
  const get = (k: string) =>
    env.match(new RegExp("^" + k + "=(.*)$", "m"))![1].trim().replace(/^["']|["']$/g, "");
  const sb = createClient(get("NEXT_PUBLIC_SUPABASE_URL"), get("SUPABASE_SERVICE_ROLE_KEY"));

  // 1. Ce qui est servi : on ne garde que les PAYSAGES (un short seul ne couvre pas un micro).
  const { data, error } = await sb
    .from("notion_ressources")
    .select("notion_id,micro_id,url")
    .eq("classe", "terminale-spe");
  if (error) throw error;
  const servis = new Set<string>();
  for (const r of data!) {
    const id = (r.url ?? "").split("/video/")[1] ?? "";
    if (r.micro_id && id && !id.endsWith("-short")) servis.add(r.notion_id + "/" + r.micro_id);
  }

  // 2. Ce qui existe au catalogue.
  const k: any = buildKnowledgeTerminaleSpeMaths();
  const paires: string[] = [];
  for (const n of k.notions) for (const m of n.microTargets ?? []) paires.push(n.id + "/" + m);

  const sans = paires.filter((p) => !servis.has(p));
  const orphelins = [...servis].filter((p) => !paires.includes(p));

  console.log(`notions : ${k.notions.length}  |  micros : ${paires.length}`);
  console.log(`micros AVEC paysage : ${paires.length - sans.length}  |  SANS paysage : ${sans.length}`);
  if (orphelins.length)
    console.log(`\n⚠ ${orphelins.length} ligne(s) de coach pointent un micro hors catalogue :`, orphelins);

  const manquants: Record<string, number> = {};
  const totaux: Record<string, number> = {};
  for (const p of paires) {
    const n = p.split("/")[0];
    totaux[n] = (totaux[n] ?? 0) + 1;
    if (!servis.has(p)) manquants[n] = (manquants[n] ?? 0) + 1;
  }
  console.log("\nNotions a couvrir (micros manquants / total) :");
  for (const [n, c] of Object.entries(manquants).sort((a, b) => b[1] - a[1]))
    console.log(`  ${String(c).padStart(2)}/${String(totaux[n]).padEnd(3)} ${n}`);

  const faites = Object.keys(totaux).filter((n) => !manquants[n]);
  console.log(`\nNotions entierement couvertes (${faites.length}) : ${faites.join(", ")}`);

}
main();
