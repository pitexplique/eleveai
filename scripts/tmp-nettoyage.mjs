import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";
const env = {};
for (const l of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = l.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^"|"$/g, "");
}
const s = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const APPLY = process.argv.includes("--apply");

const ID_AYDEN = "5626c8c1-4081-4a5b-944c-14d31e2c4673";
const ID_MARINA = "bed23ab8-1148-401b-9dfc-701979492cd2";

// Retire tous les emojis « cœur » + d'éventuels espaces résiduels en fin.
const COEURS = /[❣❤♥\u{1F493}-\u{1F49F}\u{1F90D}\u{1F90E}\u{1F9E1}\u{1FA75}-\u{1FA77}]️?/gu;

// 1) Message Ayden à supprimer
const { data: ay } = await s.from("retours_eleves").select("id, message").eq("id", ID_AYDEN);
console.log("=== À SUPPRIMER (Ayden) ===");
console.log(ay?.length ? `« ${ay[0].message} »` : "(déjà absent)");

// 2) Message Marina : retrait des cœurs
const { data: ma } = await s.from("retours_eleves").select("id, message").eq("id", ID_MARINA);
let nouveauMarina = null;
if (ma?.length) {
  const avant = ma[0].message;
  nouveauMarina = avant.replace(COEURS, "").replace(/[ \t]+$/gm, "").replace(/\s+$/u, "");
  console.log("\n=== MARINA — AVANT ===\n" + avant);
  console.log("\n=== MARINA — APRÈS ===\n" + nouveauMarina);
} else {
  console.log("\n(Marina : message introuvable)");
}

if (!APPLY) {
  console.log("\n--> Relance avec --apply pour appliquer.");
  process.exit(0);
}

if (ay?.length) {
  const { error } = await s.from("retours_eleves").delete().eq("id", ID_AYDEN);
  if (error) { console.error("ERREUR suppression Ayden:", error.message); process.exit(1); }
  console.log("\n✅ Message Ayden supprimé.");
}
if (nouveauMarina !== null) {
  const { error } = await s.from("retours_eleves").update({ message: nouveauMarina }).eq("id", ID_MARINA);
  if (error) { console.error("ERREUR update Marina:", error.message); process.exit(1); }
  console.log("✅ Cœurs retirés du message de Marina (témoignage conservé).");
}
