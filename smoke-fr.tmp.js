const fs = require("fs");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");
const env = {};
for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^"|"$/g, "");
}
const secret = env.ELEVEAI_SESSION_SECRET || env.SUPABASE_SERVICE_ROLE_KEY;
const payload = {
  acces_id: "test", code_etablissement: "TEST-SMOKE", code_utilisateur: "TEST-FR-01",
  nom: "Test Francais", type_utilisateur: "eleve", classe: "6e",
  exp: Math.floor(Date.now() / 1000) + 600,
};
const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
const sig = crypto.createHmac("sha256", secret).update(body).digest().toString("base64url");
const token = body + "." + sig;

(async () => {
  const r1 = await fetch("http://localhost:3000/api/resultats", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, type: "parcours_francais", resultat: { classe: "6e", niveau: "6e", score: 6, total: 8, details: { test: true } } }),
  });
  console.log("insert parcours_francais:", r1.status, JSON.stringify(await r1.json()));

  const r2 = await fetch("http://localhost:3000/api/dashboard", { headers: { Authorization: "Bearer " + token } });
  const d2 = await r2.json();
  const fr = (d2.resultats && d2.resultats.parcours_francais) || [];
  console.log("dashboard parcours_francais:", r2.status, "lignes=" + fr.length, fr[0] ? ("score=" + fr[0].score + "/" + fr[0].total + " pct=" + fr[0].pourcentage + " matiere=" + fr[0].matiere) : "");

  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
  const { data, error } = await supabase.from("resultats_parcours_francais").delete()
    .eq("code_etablissement", "TEST-SMOKE").eq("code_utilisateur", "TEST-FR-01").select("id");
  console.log(error ? "nettoyage ERREUR: " + error.message : "nettoyage: " + (data ? data.length : 0) + " ligne(s) supprimee(s)");
})();
