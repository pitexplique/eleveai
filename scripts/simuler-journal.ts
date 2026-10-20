// SIMULER LE JOURNAL DE L'ACCUEIL sur N jours (19/10/2026) — le rituel du dimanche soir :
//   npx tsx scripts/simuler-journal.ts 7
// Affiche chaque jour la Une, le défi, le chiffre, le métier, les shorts, Maths
// Réel et « Demain » ; signale une Une revue à moins de 60 jours ; contrôle 2 000
// défis générés (jamais deux choix identiques).
import { donneesDuJournal } from "../app/accueil-journal/donnees";
import { genererDefi } from "../lib/accueil/defis";
import { EDITION, jourParis } from "../lib/accueil/journal";
import { toutesLesVideos } from "../lib/videos/r2";
const PAR_SHORT = new Set(toutesLesVideos().filter((v) => v.short).map((v) => v.id));
const j0 = jourParis();
const n = Number(process.argv[2] ?? 7);
const vus = new Map<string, number>();
for (let k = 0; k < n; k++) {
  const d = donneesDuJournal(j0 + k);
  const def = d.defi;
  if (n <= 14) {
    console.log(`\n=== ${d.date} · N° ${d.numero}`);
    console.log(`UNE [${d.une.classe}] ${d.une.paysage?.titre}${d.une.short ? "  + short " + d.une.short.id : ""}`);
    console.log(`   utile : ${d.une.utile ?? "(tirage, pas de phrase)"}`);
    console.log(`DÉFI [${def.classe}] ${def.question}  choix=${def.choix.join(" | ")}  → ${def.choix[def.bonne]}`);
    console.log(`HIER ${d.hier.reponse}`);
    console.log(`CHIFFRE ${d.chiffre.chiffre}  ·  MÉTIER ${d.metier.nom}`);
    console.log(`SHORTS ${d.shorts.slice(0, 3).map((s) => s.id).join(", ")}…`);
    console.log(`RÉEL ${d.reel.map((s) => s.id).join(", ")}`);
    console.log(`DEMAIN ${d.demain.titre}`);
  }
  if (d.une.paysage?.short) console.log(`⛔ UNE EN SHORT le ${d.date}`);
  for (const u of EDITION) if (u.date && PAR_SHORT.has(u.paysage)) console.log(`⛔ EDITION ${u.date} : ${u.paysage} est un short`);
  const id = d.une.paysage!.id;
  if (vus.has(id) && k - vus.get(id)! < 60) console.log(`REDITE Une ${id} à ${k - vus.get(id)!} jours`);
  vus.set(id, k);
}
// Les défis : 2000 graines, aucun doublon de choix, une bonne réponse présente
let ko = 0;
for (let g = 0; g < 2000; g++) { const x = genererDefi(j0 + g); if (new Set(x.choix).size !== 3 || !x.choix[x.bonne]) ko++; }
console.log(`\ndéfis contrôlés : 2000, défauts : ${ko}`);
