// scripts/verifier-metiers.ts — contrôle de la matrice de correspondance métiers.
//
//   npx tsx scripts/verifier-metiers.ts
//
// Vérifie : chaque notion de maths du coach a au moins 3 métiers ; les clés
// écrites existent ; les centres d'intérêt sont ceux de /passions ; filles et
// garçons à peu près à égalité dans chaque classe ; La Réunion ≤ 4 % des liens.
// Sort avec le code 1 s'il y a une erreur (les avertissements ne bloquent pas).

import { NOTIONS_COACH } from "../lib/matrice/notions.generated";
import { METIERS } from "../lib/matrice/metiers-catalogue";
import { METIERS_4E, METIERS_6E } from "../lib/matrice/metiers-college";
import { FAMILLES_METIERS, RENVOIS } from "../lib/matrice/metiers-familles";
import { liensDeLaNotion, renvoiDe } from "../lib/matrice/metiers";
import { CENTRES_INTERET } from "../lib/videos/centres-interet";

const erreurs: string[] = [];
const avertissements: string[] = [];
const centresValides = new Set(CENTRES_INTERET.map((c) => c.id));

for (const [id, m] of Object.entries(METIERS))
  for (const c of m.centres) if (!centresValides.has(c)) erreurs.push(`métier ${id} : centre inconnu « ${c} »`);

const maths = NOTIONS_COACH.maths;
for (const [classe, table] of [["6e", METIERS_6E], ["4e", METIERS_4E]] as const)
  for (const id of Object.keys(table))
    if (!maths[classe].some((n) => n.id === id)) erreurs.push(`${classe} : notion écrite inconnue du coach « ${id} »`);

for (const [classe, table] of Object.entries(RENVOIS)) {
  if (!maths[classe]) erreurs.push(`renvois : classe inconnue « ${classe} »`);
  for (const [cle, r] of Object.entries(table)) {
    const cible = /^(6e|4e):(.+)$/.exec(r);
    if (cible) {
      const t = cible[1] === "6e" ? METIERS_6E : METIERS_4E;
      if (!t[cible[2]]) erreurs.push(`${classe}.${cle} → ${r} : notion cible absente`);
    } else if (!(r in FAMILLES_METIERS)) erreurs.push(`${classe}.${cle} → ${r} : famille absente`);
    if (!cle.endsWith("*") && maths[classe] && !maths[classe].some((n) => n.id === cle) && !["cp", "ce1", "ce2", "cm1", "cm2"].includes(classe))
      avertissements.push(`${classe}.${cle} : aucune notion de ce nom (renvoi inutile)`);
  }
}

let total = 0;
let reunion = 0;
const utilises = new Set<string>();
console.log("Classe          notions  couvertes  liens  filles");
for (const [classe, notions] of Object.entries(maths)) {
  let couvertes = 0;
  let liens = 0;
  let filles = 0;
  for (const n of notions) {
    const l = liensDeLaNotion(classe, n.id);
    if (l.length >= 3) couvertes++;
    else erreurs.push(`${classe}.${n.id} (${n.label}) : ${l.length} métier(s)${renvoiDe(classe, n.id) ? "" : ", aucun renvoi"}`);
    liens += l.length;
    filles += l.filter((x) => x.genre === "f").length;
    reunion += l.filter((x) => x.reunion).length;
    l.forEach((x) => utilises.add(x.metier));
  }
  total += liens;
  const pf = liens ? Math.round((100 * filles) / liens) : 0;
  if (liens && (pf < 40 || pf > 60)) avertissements.push(`${classe} : ${pf} % de métiers au féminin (viser 40-60 %)`);
  console.log(`${classe.padEnd(15)} ${String(notions.length).padStart(7)}  ${String(couvertes).padStart(9)}  ${String(liens).padStart(5)}  ${String(pf).padStart(5)} %`);
}
const pr = total ? (100 * reunion) / total : 0;
console.log(`\nLiens montrés : ${total} ; contextes réunionnais : ${reunion} (${pr.toFixed(1)} %)`);
if (pr > 4) erreurs.push(`La Réunion : ${pr.toFixed(1)} % des liens (4 % au plus)`);
const jamais = Object.keys(METIERS).filter((id) => !utilises.has(id));
if (jamais.length) avertissements.push(`métiers jamais montrés : ${jamais.join(", ")}`);
console.log(`Métiers au catalogue : ${Object.keys(METIERS).length}, montrés : ${utilises.size}`);

for (const a of avertissements) console.log("⚠️ ", a);
for (const e of erreurs) console.log("❌", e);
console.log(erreurs.length ? `\n${erreurs.length} erreur(s).` : "\n✅ Matrice métiers complète.");
process.exit(erreurs.length ? 1 : 0);
