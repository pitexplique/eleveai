// Lecture seule : etat de notion_ressources pour la serie espace + produit scalaire.
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
const env = fs.readFileSync(".env.local", "utf8");
const get = (k) => env.match(new RegExp("^" + k + "=(.*)$", "m"))[1].trim().replace(/^["']|["']$/g, "");
const sb = createClient(get("NEXT_PUBLIC_SUPABASE_URL"), get("SUPABASE_SERVICE_ROLE_KEY"));
const { count } = await sb.from("notion_ressources").select("*", { count: "exact", head: true });
console.log("notion_ressources total :", count);
const { data } = await sb.from("notion_ressources").select("micro_id,url,titre").like("url", "%terminale-%espace%");
console.log("lignes espace/ps :", data.length, "| dont shorts :", data.filter(d => d.url.endsWith("-short")).length);
for (const s of data.sort((a,b)=>a.url.localeCompare(b.url))) console.log("   ", (s.micro_id||"(null)").padEnd(34), s.url.split("/video/")[1]);
