// Mesure, pour le coach 6e, la part d'énoncés ★1-★2 avec contexte (prénom, histoire)
// et leur longueur moyenne. Règle : lib/tutor-v4/questionBank/6e/REGLES-6E.md
import { createJiti } from "jiti";
const jiti = createJiti(process.cwd() + "/", { alias: { "@": process.cwd() } });
const { maths6eQuestionBank } = await jiti.import("./lib/tutor-v4/questionBank/6e/maths/index.ts");
const MOTS = /\b(€|euros?|achète|acheté|magasin|recette|gâteau|pizza|tarte|élèves|classe de|il a|elle a|mange|partage entre|paquet|bouteille|jardin|course|marché|boulanger|cuisinier|métier|ferme|voyage|trajet|famille|amis?|copains?|sa mère|son père|chocolat|bonbons?|billes)\b/i;
const NOM = /(?<![.!?:]\s)(?<!^)\b[A-ZÉÈ][a-zéèëïî]{2,}\b/;
const NON = new Set(["Quelle","Quel","Quels","Quelles","Combien","Calcule","Écris","Donne","Complète","Range","Compare","Trouve","Le","La","Les","Un","Une","On","Dans","Sur","Vrai","Faux","Oui","Non","Place","Lis","Coche","Indique","Simplifie","Pour","Sans","Avec","Exemple","Réponds","Choisis"]);
function contexte(t){ if (MOTS.test(t)) return true; const m=[...t.matchAll(/(?<=[a-zé,;]\s)[A-ZÉ][a-zéèëïî]{2,}/g)].map(x=>x[0]).filter(w=>!NON.has(w)); return m.length>0; }
const parMicro = {};
for (const it of maths6eQuestionBank) {
  if ((it.difficulty ?? 1) > 2) continue;
  const n = it.kind === "template" ? 15 : 1;
  for (let i=0;i<n;i++){ let q; try { q = it.kind==="template" ? it.generate() : it; } catch { continue; }
    const t = String(q.text ?? q.question ?? "");
    const k = (it.notionId||"?")+" › "+(it.microId||"?");
    const r = parMicro[k] ??= { n:0, ctx:0, mots:0, ex:"" };
    r.n++; r.mots += t.split(/\s+/).length; if (contexte(t)) { r.ctx++; if(!r.ex) r.ex=t.slice(0,110).replace(/\n/g," "); } }
}
const rows = Object.entries(parMicro).map(([k,r])=>({k,pct:Math.round(100*r.ctx/r.n),mots:Math.round(r.mots/r.n),ex:r.ex})).sort((a,b)=>b.pct-a.pct);
for (const r of rows) console.log(String(r.pct).padStart(3)+"%  "+String(r.mots).padStart(3)+" mots  "+r.k+(r.pct?"   | "+r.ex:""));
