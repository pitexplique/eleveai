// Purge des avis générés par l'IA (copier-coller ChatGPT) sur /votre-avis.
// Les points élèves étant calculés dynamiquement depuis retours_eleves,
// supprimer ces lignes recompte automatiquement les points et le leaderboard.
//
//   node scripts/purge-avis-ia.mjs           -> APERÇU seul (ne supprime rien)
//   node scripts/purge-avis-ia.mjs --apply   -> supprime réellement
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
const APPLY = process.argv.includes("--apply");

// Préfixes de messages caractéristiques d'un copier-coller IA (français trop
// poli, structuré « 1. … / Étape 1 : … », jargon HTML/UX). Chaque préfixe a été
// vérifié à la main contre le dump complet : il ne touche QUE des entrées IA.
const PREFIXES_IA = [
  "1. Améliorer l'Expérience Utilisateur",
  "Étape 1 : Améliorations Immédiates",
  "Ajouter une démo gratuite sans inscription",
  "1. Rendre l'IA plus humaine",
  "3. Fonctionnalités IA Avancées",
  "1. Côté Élève : Les Scénarios",
  "Développons ces deux aspects",
  "1. La Structure HTML",
  "2. La Logique JavaScript",
  "1. La clarté (Trouver tout de suite",
  "Comment ça marche ? Au lieu d'avoir de grandes listes",
  "Pour que le rendu soit parfait sur le site",
  "Voici comment on peut imaginer la structure finale",
  "C'est une excellente idée de stratégie",
];

const { data, error } = await supabase
  .from("retours_eleves")
  .select("id, type, message, prenom, code_etablissement, code_eleve, created_at")
  .order("created_at", { ascending: true })
  .limit(5000);
if (error) { console.error("ERREUR lecture:", error.message); process.exit(1); }

const estIA = (m) => PREFIXES_IA.some((p) => (m ?? "").trimStart().startsWith(p));
const aSupprimer = data.filter((r) => estIA(r.message));

console.log(`${APPLY ? "SUPPRESSION" : "APERÇU (aucune suppression)"}\n`);
console.log(`Total en base : ${data.length}`);
console.log(`Identifiés IA : ${aSupprimer.length}\n`);

const parEleve = {};
for (const r of aSupprimer) {
  const k = `${r.prenom} [${r.code_etablissement}/${r.code_eleve}]`;
  parEleve[k] = (parEleve[k] ?? 0) + 1;
}
console.log("Par élève :");
for (const [k, n] of Object.entries(parEleve)) console.log(`  ${n.toString().padStart(3)}  ${k}`);
console.log("");

for (const r of aSupprimer) {
  const d = new Date(r.created_at).toISOString().slice(0, 16).replace("T", " ");
  console.log(`  [${d}] ${r.prenom} — "${(r.message ?? "").replace(/\s+/g, " ").slice(0, 70)}…"`);
}

if (!APPLY) {
  console.log(`\n--> Relance avec --apply pour supprimer ces ${aSupprimer.length} lignes.`);
  process.exit(0);
}

// Suppression effective + recomptage des points des élèves touchés (avant/après).
const { calculerPointsAvis } = await import("../lib/points/feedbackPoints.ts").catch(() => ({}));
const ids = aSupprimer.map((r) => r.id);
const { error: delErr } = await supabase.from("retours_eleves").delete().in("id", ids);
if (delErr) { console.error("ERREUR suppression:", delErr.message); process.exit(1); }
console.log(`\n✅ ${ids.length} lignes supprimées.`);
