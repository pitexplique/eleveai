// Les 12 lignes de coach des SHORTS de terminale (espace + produit scalaire).
//
// ⛔⛔ A LANCER SEULEMENT UNE FOIS LA FUSION DEPLOYEE. Une ligne ecrite avant que `main`
// ait le registre pointe sur une page que la production ne connait pas : c'est ce qui a
// donne 12 boutons morts le 24/11. Le script le VERIFIE lui-meme et refuse d'ecrire si
// une seule des 12 URL ne repond pas 200 -- une verification qui s'arrete a la base de
// donnees ne mesure pas ce que voit l'eleve.
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";

const env = fs.readFileSync(".env.local", "utf8");
const get = (k) => env.match(new RegExp("^" + k + "=(.*)$", "m"))[1].trim().replace(/^["']|["']$/g, "");
const sb = createClient(get("NEXT_PUBLIC_SUPABASE_URL"), get("SUPABASE_SERVICE_ROLE_KEY"));

const t = JSON.parse(fs.readFileSync("lib/videos/videos-r2.json", "utf8"));
const cles = Object.keys(t).filter((k) => /^terminale-(espace|ps-espace)-.*-short$/.test(k));
if (cles.length !== 12) throw new Error("attendu 12 cles, trouve " + cles.length);

// 1. Les 12 pages repondent-elles ? On APPELLE, on ne suppose pas.
const lignes = [];
for (const cle of cles) {
  const url = "https://www.eleveai.fr/video/" + cle;
  const r = await fetch(url, { redirect: "manual" });
  const c = new URL(t[cle].coach, "https://www.eleveai.fr").searchParams;
  console.log(`${r.status}  ${url}`);
  if (r.status !== 200) throw new Error("ARRET : " + url + " repond " + r.status
    + " -- la fusion dans main n'est pas deployee, aucune ligne n'est ecrite.");
  lignes.push({ matiere: "maths", classe: "terminale-spe", notion_id: c.get("notion"),
                micro_id: c.get("microId"), type: "video", url, titre: t[cle].titre });
}

// 2. Ecriture, une par une, en disant ce qui passe et ce qui coince.
let ok = 0;
for (const l of lignes) {
  const { error } = await sb.from("notion_ressources").insert(l);
  if (error) console.log("  ECHEC " + l.micro_id + " : " + error.message);
  else ok++;
}
console.log(`\n${ok} lignes ecrites sur ${lignes.length}`);
