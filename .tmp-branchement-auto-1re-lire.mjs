// (24/11) Lecture : vidéos déjà branchées sur les micros auto_* de 1re et de STMG.
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
for (const l of readFileSync(".env.local", "utf8").split(/\r?\n/)) { const m = l.match(/^([A-Z_]+)=(.*)$/); if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const ids = (f) => [...readFileSync(f, "utf8").matchAll(/id: "(auto_[a-z_]+)", label: "([^"]*)", notionId: "([a-z_]+)"/g)].map((m) => ({ id: m[1], label: m[2], notion: m[3] }));
for (const [classe, f] of [["premiere", "lib/tutor-v4/knowledge/maths/premiere/microSkills.ts"], ["stmg", "lib/tutor-v4/knowledge/maths/stmg/microSkills.ts"]]) {
  const micros = ids(f);
  const { data, error } = await sb.from("notion_ressources").select("notion_id,micro_id,url,titre,type").eq("classe", classe).eq("type", "video").limit(5000);
  if (error) throw error;
  const avec = new Set(data.map((r) => r.micro_id));
  const sans = micros.filter((m) => !avec.has(m.id));
  console.log(`\n== ${classe} : ${micros.length - sans.length} / ${micros.length} micros avec vidéo ; lignes notion sans micro :`, data.filter((r) => !r.micro_id).map((r) => r.notion_id + " " + r.url).join(" | "));
  if (process.argv[2] === "detail") for (const r of data.filter(r=>r.micro_id?.startsWith("auto_"))) console.log("  +", r.micro_id, r.url);
  for (const m of sans) console.log("  -", m.notion, m.id, "|", m.label);
}
