import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";
function loadEnv() {
  const env = {};
  const text = fs.readFileSync(".env.local", "utf8");
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
  return env;
}
const env = loadEnv();
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const { data } = await supabase
  .from("retours_eleves")
  .select("message")
  .ilike("prenom", "%ayden%")
  .order("created_at", { ascending: true })
  .limit(2000);

const groupes = {};
for (const r of data) {
  const k = (r.message ?? "").replace(/\s+/g, " ").trim().slice(0, 50);
  (groupes[k] ??= []).push(r.message);
}
for (const [k, arr] of Object.entries(groupes).sort((a,b)=>b[1].length-a[1].length)) {
  const sample = arr[0].trimStart();
  const codes = [...sample.slice(0, 30)].map(c => c.charCodeAt(0)).join(",");
  console.log(`${arr[1].length}× — « ${k} »`);
  console.log(`   premiers char codes: ${codes}\n`);
}
