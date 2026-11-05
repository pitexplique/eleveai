// Le socle des scripts de recalcul du chantier des 76 feuilles STMG (05/11/2026).
//
// ⭐ L'IDÉE : le script RECALCULE chaque résultat par son propre chemin, à partir
// des données de l'énoncé (recopiées dans le script), puis passe sa valeur au
// VRAI correcteur du site (`saisieJuste`, celui qui juge l'élève). Si le corrigé
// et le script ne sont pas d'accord, l'erreur sort.
//
// Il se lance avec tsx, car il charge les feuilles et le correcteur en TypeScript :
//   npx --yes tsx@4 scripts/verifier-exercices-stmg-<lot>.mjs
//
// Usage dans un script de lot :
//   import { feuille, fin } from "./verifier-exercices-stmg-lot-commun.mjs";
//   const f = await feuille("auto-proportion");
//   f.juste(1, null, 10 / 40);              // une réponse sans question
//   f.juste(3, "b)", 0.75);                 // la sous-question « b) »
//   f.juste(18, "a)", [1500, 3500]);        // une liste, jointe par « ; »
//   f.juste(5, "x", "3x + 2");              // une expression
//   f.faux(1, null, 4);                     // le piège ne doit PAS être accepté
//   f.dit(1, "0{,}25");                     // ce morceau figure dans le corrigé
//   f.tout();                               // chaque réponse a été recalculée
//   fin();                                  // à la toute fin du script
import Module from "node:module";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Module._extensions[".css"] = () => {};

globalThis.React = (await import("react")).default;
const { saisieJuste } = await import("../lib/fiches-exercices/verifier-saisie");

let ok = 0;
const ko = [];
const nombre = (v) => (typeof v === "number" ? String(Number(v.toFixed(10))) : String(v));
const ecrire = (v) => (Array.isArray(v) ? v.map(nombre).join(" ; ") : nombre(v));

export async function feuille(slug) {
  const mod = await import(`../lib/fiches-exercices/maths-stmg-${slug}`);
  const fiche = Object.values(mod).find((v) => v?.series);
  if (!fiche) throw new Error(`${slug} : aucune fiche exportée`);
  const exercices = fiche.series.flatMap((s) => s.exercices);
  const vues = new Set();
  const trouver = (k, q) => {
    const ex = exercices[k - 1];
    if (!ex) throw new Error(`${slug} ex.${k} introuvable`);
    const liste = ex.reponses ?? [];
    const r = q == null && liste.length === 1 ? liste[0] : liste.find((x) => (x.question ?? "") === (q ?? ""));
    if (!r) throw new Error(`${slug} ex.${k} : pas de réponse « ${q} »`);
    return r;
  };
  const noter = (cond, texte) => (cond ? ok++ : ko.push(`${slug} ${texte}`));
  return {
    fiche,
    exercices,
    juste(k, q, valeur) {
      const r = trouver(k, q);
      vues.add(r);
      noter(saisieJuste(ecrire(valeur), r), `ex.${k} ${q ?? ""} : le recalcul donne ${ecrire(valeur)}, la feuille attend ${JSON.stringify(r.attendu)}`);
    },
    faux(k, q, valeur) {
      const r = trouver(k, q);
      noter(!saisieJuste(ecrire(valeur), r), `ex.${k} ${q ?? ""} : le piège ${ecrire(valeur)} est accepté`);
    },
    dit(k, morceau) {
      noter(exercices[k - 1].correction.includes(morceau), `ex.${k} : le corrigé n'écrit pas « ${morceau} »`);
    },
    enonceDit(k, morceau) {
      noter(exercices[k - 1].enonce.includes(morceau), `ex.${k} : l'énoncé n'écrit pas « ${morceau} »`);
    },
    vrai(nom, cond) {
      noter(cond, nom);
    },
    tout() {
      exercices.forEach((ex, i) => {
        for (const r of ex.reponses ?? []) noter(vues.has(r), `ex.${i + 1} ${r.question ?? ""} : réponse non recalculée`);
      });
    },
  };
}

export function fin() {
  console.log(`${ok} vérifications justes, ${ko.length} fausses`);
  ko.forEach((k) => console.log("  ✗", k));
  process.exit(ko.length ? 1 : 0);
}
