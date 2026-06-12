import { microSkills } from "../lib/tutor-v4/knowledge/francais/cm1/microSkills.ts";
import { buildCycle3FrancaisBank } from "../lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts";

const bank = buildCycle3FrancaisBank("cm1", microSkills);

// Table de verite (irreguliers) pour quelques formes a verifier.
const TRUTH = {
  "'etre' au present avec 'il'": "est",
  "'avoir' au present avec 'ils'": "ont",
  "'aller' au futur avec 'je'": "irai",
  "'faire' au present avec 'vous'": "faites",
  "'pouvoir' au present avec 'je'": "peux",
  "'aller' au present avec 'nous'": "allons",
  "'venir' au present avec 'ils'": "viennent",
};

// Verite reguliers recalculee independamment.
const ER_P = ["e","es","e","ons","ez","ent"], ER_I = ["ais","ais","ait","ions","iez","aient"];
const IR_P = ["is","is","it","issons","issez","issent"], IR_I = ["issais","issais","issait","issions","issiez","issaient"];
const FUT = ["ai","as","a","ons","ez","ont"];
const PRO = ["je","tu","il","nous","vous","ils"];
function regForm(inf, group, tense, p) {
  const stem = inf.slice(0,-2);
  if (tense==="futur") return inf+FUT[p];
  if (group==="er") return stem+(tense==="present"?ER_P:ER_I)[p];
  return stem+(tense==="present"?IR_P:IR_I)[p];
}
function isReg(inf){ if(inf.endsWith("er")) return "er"; if(inf.endsWith("ir")) return "ir"; return null; }

let checked=0, wrong=0, accentBug=0, qcmBug=0, choiceCountBad=0;
const distinct = new Set();
const reErr = [];

for (const item of bank) {
  if (item.microId.indexOf("conj") === -1) continue;
  for (let i=0;i<200;i++){
    const q = item.generate();
    distinct.add(JSON.stringify({t:q.text, e:q.expected}));
    // parse "'verbe' au TEMPS avec 'pronom'"
    const m = q.text.match(/'([a-z]+)' au (present|imparfait|futur) avec '(je|tu|il|nous|vous|ils)'/);
    if (m) {
      const [, inf, tense, pro] = m;
      const p = PRO.indexOf(pro);
      const correct = q.format==="qcm" ? q.expected[0] : q.expected[0];
      const grp = isReg(inf);
      checked++;
      if (grp) {
        const truth = regForm(inf, grp, tense, p);
        if (correct !== truth) { wrong++; reErr.push(`${inf} ${tense} ${pro}: moteur='${correct}' attendu='${truth}'`); }
      }
      const key = `'${inf}' au ${tense} avec '${pro}'`;
      if (TRUTH[key] && correct !== TRUTH[key]) { wrong++; reErr.push(`IRREG ${key}: moteur='${correct}' attendu='${TRUTH[key]}'`); }
    }
    if (q.format === "short") {
      for (const a of q.expected) if (/[éèêëàâîïôûùç]/i.test(a)) { accentBug++; reErr.push(`accent en short: ${a}`); }
    }
    if (q.format === "qcm") {
      if (!q.choices.includes(q.expected[0])) qcmBug++;
      if (new Set(q.choices).size !== q.choices.length) qcmBug++;
      if (q.choices.length !== 4) choiceCountBad++;
    }
  }
}

console.log(`Formes verifiees : ${checked}`);
console.log(`Conjugaisons FAUSSES : ${wrong}`);
console.log(`Accents dans reponses libres : ${accentBug}`);
console.log(`Bugs QCM (bonne rep absente / doublon) : ${qcmBug}`);
console.log(`QCM avec != 4 choix : ${choiceCountBad}`);
console.log(`Questions de conjugaison distinctes : ${distinct.size}`);
if (reErr.length) console.log("Exemples d'erreurs:\n" + [...new Set(reErr)].slice(0,10).join("\n"));
