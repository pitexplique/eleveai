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
const { data, error } = await supabase
  .from("retours_eleves")
  .select("id, type, message, created_at")
  .ilike("prenom", "%ayden%")
  .order("created_at", { ascending: true })
  .limit(2000);
if (error) { console.error("ERREUR:", error.message); process.exit(1); }

console.log(`TOTAL retours Ayden : ${data.length}\n`);

// Regroupe par 60 premiers caractères du message
const groupes = {};
for (const r of data) {
  const k = (r.message ?? "").replace(/\s+/g, " ").trim().slice(0, 60);
  (groupes[k] ??= []).push(r);
}
const tri = Object.entries(groupes).sort((a, b) => b[1].length - a[1].length);
console.log("Regroupement par début de message :\n");
for (const [k, arr] of tri) {
  const d1 = new Date(arr[0].created_at).toISOString().slice(0, 16).replace("T", " ");
  const d2 = new Date(arr[arr.length - 1].created_at).toISOString().slice(0, 16).replace("T", " ");
  console.log(`${arr.length.toString().padStart(3)}×  [${d1} → ${d2}]  « ${k}… »`);
}
