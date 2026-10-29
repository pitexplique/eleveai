// Contrôle des `reponses` des fiches d'exercices (29/10/2026).
// Pour chaque exercice qui a des réponses attendues :
//  · chaque forme acceptée doit se valider ELLE-MÊME (sinon elle ne se lit pas) ;
//  · ses nombres doivent apparaître dans le corrigé (sinon : à relire).
// Usage : npx tsx scripts/verifier-reponses-fiches.ts [motif]   (ex. maths/4e)
import Module from "node:module";
// Les fiches importent des composants qui chargent une CSS : on l'ignore ici.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Module as any)._extensions[".css"] = () => {};

async function main() {
  // Le JSX des figures est compilé en React.createElement par tsx.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).React = (await import("react")).default;
  const { CHARGEURS_FICHES_EXERCICES } = await import("../lib/fiches-exercices/chargeurs");
  const { saisieJuste } = await import("../lib/fiches-exercices/verifier-saisie");
  const motif = process.argv[2] ?? "";
  let erreurs = 0, alertes = 0, exercices = 0, avec = 0;
  for (const [cle, charger] of Object.entries(CHARGEURS_FICHES_EXERCICES)) {
    if (!cle.includes(motif)) continue;
    const fiche = await charger();
    let n = 0;
    for (const s of fiche.series)
      for (const ex of s.exercices) {
        n++;
        exercices++;
        if (!ex.reponses?.length) continue;
        avec++;
        const corrige = ex.correction.replace(/\{,\}/g, ",").replace(/\\,|\s|\$/g, "");
        for (const r of ex.reponses) {
          const formes = Array.isArray(r.attendu) ? r.attendu : [r.attendu];
          for (const f of formes) {
            if (!saisieJuste(f, r)) {
              erreurs++;
              console.log(`✗ ${cle} ex.${n} ${r.question ?? ""} « ${f} » ne se valide pas lui-même`);
            }
            for (const nb of f.replace(/\s/g, "").match(/\d+(?:[.,]\d+)?/g) ?? []) {
              if (!corrige.includes(nb.replace(".", ","))) {
                alertes++;
                console.log(`? ${cle} ex.${n} ${r.question ?? ""} « ${f} » : ${nb} absent du corrigé`);
              }
            }
          }
        }
      }
  }
  console.log(`\n${avec}/${exercices} exercices avec réponses — ${erreurs} erreur(s), ${alertes} alerte(s) à relire.`);
  process.exit(erreurs ? 1 : 0);
}
main();
