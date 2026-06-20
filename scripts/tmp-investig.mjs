import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";
const env = {};
for (const l of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = l.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^"|"$/g, "");
}
const s = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

console.log("=== Message Ayden « mettre AYDEN en premier » ===");
const { data: ay } = await s
  .from("retours_eleves")
  .select("id, message, prenom, code_etablissement, code_eleve, created_at")
  .ilike("prenom", "%ayden%")
  .ilike("message", "%mettre AYDEN en premier%");
for (const r of ay ?? []) console.log(`#${r.id}  « ${r.message} »`);

console.log("\n=== Tous les retours de Marina ===");
const { data: ma } = await s
  .from("retours_eleves")
  .select("id, type, message, prenom, code_etablissement, code_eleve, created_at")
  .ilike("prenom", "%marina%")
  .order("created_at", { ascending: true })
  .limit(2000);
console.log(`Total Marina : ${(ma ?? []).length}`);
for (const r of ma ?? []) {
  const d = new Date(r.created_at).toISOString().slice(0, 16).replace("T", " ");
  console.log(`#${r.id} [${d}] ${r.prenom} (${r.code_etablissement}/${r.code_eleve}) type=${r.type}  « ${(r.message ?? "").replace(/\s+/g, " ").slice(0, 120)} »`);
}
