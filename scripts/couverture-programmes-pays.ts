// Vérifie la matrice multi-pays (lib/programmes-pays) et mesure sa couverture.
// - chaque renvoi doit viser une micro qui EXISTE dans la classe indiquée ;
// - taux = (complètes + ½ partielles) / contenus travaillables (hors-coach exclus).
// npx --yes tsx@4 scripts/couverture-programmes-pays.ts

import { getNotionMicroMap } from "@/lib/tutor-v4/catalog";
import { PROGRAMMES_PAYS } from "@/lib/programmes-pays";

let erreurs = 0;
for (const p of PROGRAMMES_PAYS) {
  const compte = { complete: 0, partielle: 0, absente: 0, "hors-coach": 0 };
  for (const c of p.contenus) {
    compte[c.couverture]++;
    for (const r of c.micros) {
      const micros = Object.values(getNotionMicroMap(r.classe)).flat();
      if (!micros.includes(r.micro)) {
        erreurs++;
        console.log(`❌ ${p.pays} ${p.niveau} ${c.code} : ${r.classe}/${r.micro} n'existe pas`);
      }
    }
    if (c.couverture === "complete" && c.micros.length === 0) {
      erreurs++;
      console.log(`❌ ${p.pays} ${p.niveau} ${c.code} : « complete » sans micro`);
    }
  }
  const travaillables = p.contenus.length - compte["hors-coach"];
  const taux = Math.round((100 * (compte.complete + compte.partielle / 2)) / travaillables);
  console.log(
    `${p.pays} ${p.niveau}${p.codeCours ? ` (${p.codeCours})` : ""} : ${p.contenus.length} contenus — ` +
      `${compte.complete} complets, ${compte.partielle} partiels, ${compte.absente} absents, ` +
      `${compte["hors-coach"]} hors coach → couverture ${taux} %`
  );
}
if (erreurs) {
  console.log(`\n${erreurs} erreur(s).`);
  process.exit(1);
}
