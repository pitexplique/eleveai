// Recomptage des points avis après nettoyage (mêmes règles que lib/points/feedbackPoints.ts
// et le calcul de /api/retours : points = 5/retour + 20/retour traité).
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

const POINTS_PAR_RETOUR = 5, BONUS_RETOUR_TRAITE = 20;
// Copie alignee sur lib/prenom.ts (ce script .mjs ne peut pas importer le TS) :
// « NOM Prenom » -> prenom seul, on retire tous les tokens MAJUSCULES de tete.
const estTokenMajuscule = (t) =>
  t === t.toLocaleUpperCase("fr-FR") && t !== t.toLocaleLowerCase("fr-FR");
const prenomCourt = (n) => {
  const v = (n ?? "").trim().replace(/\s+/g, " ");
  if (!v) return "Élève";
  const t = v.split(" ");
  let i = 0;
  while (i < t.length && estTokenMajuscule(t[i])) i++;
  const reste = t.slice(i);
  return reste.length > 0 ? reste.join(" ") : "Élève";
};

const { data } = await supabase
  .from("retours_eleves")
  .select("prenom, code_etablissement, code_eleve, traite, type")
  .limit(5000);

console.log(`Total retours restants : ${data.length}`);
const t = {};
for (const r of data) t[r.type] = (t[r.type] ?? 0) + 1;
console.log("Par type :", t, "\n");

const parEleve = new Map();
for (const r of data) {
  if (!r.code_etablissement || !r.code_eleve) continue;
  const id = `${r.code_etablissement}/${r.code_eleve}`;
  const s = parEleve.get(id) ?? { prenom: prenomCourt(r.prenom), nb: 0, traites: 0 };
  s.nb += 1;
  if (r.traite) s.traites += 1;
  parEleve.set(id, s);
}
const classement = [...parEleve.entries()]
  .map(([id, s]) => ({ id, ...s, points: s.nb * POINTS_PAR_RETOUR + s.traites * BONUS_RETOUR_TRAITE }))
  .sort((a, b) => b.points - a.points);

console.log("Classement points avis (après nettoyage) :");
classement.slice(0, 12).forEach((e, i) =>
  console.log(`  ${(i + 1).toString().padStart(2)}. ${e.prenom.padEnd(14)} ${e.points.toString().padStart(3)} pts  (${e.nb} retours)  ${e.id}`)
);
