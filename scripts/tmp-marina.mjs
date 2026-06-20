import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";
const env={};for(const l of fs.readFileSync(".env.local","utf8").split(/\r?\n/)){const m=l.match(/^([A-Z0-9_]+)=(.*)$/);if(m)env[m[1]]=m[2].replace(/^"|"$/g,"");}
const s=createClient(env.NEXT_PUBLIC_SUPABASE_URL,env.SUPABASE_SERVICE_ROLE_KEY);
const {data}=await s.from("retours_eleves").select("id, type, note, message, created_at").ilike("prenom","%marina%").order("created_at",{ascending:true});
for(const r of data??[]){
  console.log(`#${r.id}  type=${r.type} note=${r.note??"-"}`);
  console.log(`TEXTE COMPLET:\n${r.message}\n----`);
}
