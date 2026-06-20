import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";
const env={};for(const l of fs.readFileSync(".env.local","utf8").split(/\r?\n/)){const m=l.match(/^([A-Z0-9_]+)=(.*)$/);if(m)env[m[1]]=m[2].replace(/^"|"$/g,"");}
const s=createClient(env.NEXT_PUBLIC_SUPABASE_URL,env.SUPABASE_SERVICE_ROLE_KEY);
const {data}=await s.from("retours_eleves").select("message").ilike("prenom","%ayden%").limit(2000);
const P=["Conversation avec Gemini","Comment ça marche ? Au lieu d'avoir de grandes listes"];
for(const p of P){
  const n=data.filter(r=>(r.message??"").trimStart().startsWith(p)).length;
  console.log(`${n}×  matche  « ${p} »`);
}
// montre le message "Comment ça marche" reel
const cm=data.find(r=>(r.message??"").trimStart().toLowerCase().startsWith("comment ça marche"));
if(cm){const codes=[...cm.message.trimStart().slice(0,40)].map(c=>c.charCodeAt(0)).join(",");console.log("\nréel:",cm.message.trimStart().slice(0,40));console.log(codes);}
