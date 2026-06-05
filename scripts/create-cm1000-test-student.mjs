import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  const env = {};
  const text = fs.readFileSync(".env.local", "utf8");

  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;

    env[match[1]] = match[2].replace(/^"|"$/g, "");
  }

  return env;
}

const env = loadEnv();
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

const codeEtablissement =
  process.argv[2] ??
  (
    await supabase
      .from("acces_etablissement")
      .select("code_etablissement")
      .in("type_utilisateur", ["principal", "prof"])
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle()
  ).data?.code_etablissement;

if (!codeEtablissement) {
  throw new Error("Aucun code_etablissement trouve. Passe-le en argument.");
}

const payload = {
  code_etablissement: codeEtablissement,
  code_utilisateur: "CM1000",
  type_utilisateur: "eleve",
  nom: "Eleve test CM1",
  actif: true,
  mot_de_passe: "235711",
  classe: "cm1",
};

const { data, error } = await supabase
  .from("acces_etablissement")
  .upsert(payload, {
    onConflict: "code_etablissement,code_utilisateur",
  })
  .select("code_etablissement, code_utilisateur, nom, classe, type_utilisateur, actif, mot_de_passe")
  .single();

if (error) throw error;

console.log(JSON.stringify(data, null, 2));
