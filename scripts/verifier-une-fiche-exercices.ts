// Contrôle d'UNE feuille d'exercices avant son inscription au registre
// (10/11/2026, feuilles du CM1) : mêmes règles que verifier-reponses-fiches.ts,
// plus le compte des exercices sans réponses et des QCM à choix en double.
// Usage : npx tsx scripts/verifier-une-fiche-exercices.ts lib/fiches-exercices/maths-cm1-xxx.tsx
import Module from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Module as any)._extensions[".css"] = () => {};

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).React = (await import("react")).default;
  const { saisieJuste, selonLaClasse } = await import("../lib/fiches-exercices/verifier-saisie");
  const fichier = process.argv[2];
  const mod = await import(pathToFileURL(resolve(fichier)).href);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fiches = Object.values(mod).filter((v: any) => v && typeof v === "object" && Array.isArray(v.series)) as any[];
  if (!fiches.length) throw new Error("aucune FicheExercicesData exportée");
  let erreurs = 0, alertes = 0;
  for (const fiche of fiches) {
    let n = 0, sans = 0;
    for (const s of fiche.series)
      for (const ex of s.exercices) {
        n++;
        if (!ex.reponses?.length) { sans++; erreurs++; console.log(`✗ ex.${n} sans réponses`); continue; }
        const corrige = ex.correction.replace(/\{,\}/g, ",").replace(/\\,|\s|\$/g, "");
        for (const r of ex.reponses) {
          const formes = Array.isArray(r.attendu) ? r.attendu : [r.attendu];
          for (const f of formes) {
            if (!saisieJuste(f, selonLaClasse(r, fiche.classe))) { erreurs++; console.log(`✗ ex.${n} ${r.question ?? ""} « ${f} » ne se valide pas lui-même`); }
            for (const nb of f.replace(/\s/g, "").match(/\d+(?:[.,]\d+)?/g) ?? [])
              if (!corrige.includes(nb.replace(".", ","))) { alertes++; console.log(`? ex.${n} ${r.question ?? ""} « ${f} » : ${nb} absent du corrigé`); }
          }
        }
        // QCM : deux choix « A) … » de même texte dans l'énoncé.
        const choix = [...ex.enonce.matchAll(/(?:^|\n|\s)([A-D])\)\s*([^\n]*?)(?=\s+[A-D]\)|\n|$)/g)].map((m) => m[2].trim().replace(/\s|\$|\\,/g, ""));
        if (choix.length > 1 && new Set(choix).size !== choix.length) { erreurs++; console.log(`✗ ex.${n} QCM : deux choix identiques`); }
      }
    console.log(`${fiche.classe}/${fiche.notion} : ${n} exercices, ${sans} sans réponses`);
  }
  console.log(`\n${erreurs} erreur(s), ${alertes} alerte(s) à relire.`);
  process.exit(erreurs ? 1 : 0);
}
main();
