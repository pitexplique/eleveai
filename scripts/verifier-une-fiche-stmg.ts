// Contrôle d'UNE feuille STMG avant son entrée au registre (05/11/2026).
// `verifier-reponses-fiches.ts` passe par les chargeurs ; pendant le chantier
// des 76 feuilles, les nouvelles n'y sont pas encore. Ce script lit le fichier
// directement et contrôle en plus ce qu'exige le coach STMG :
//   · 20 exercices (8 / 8 / 4), réponses sur au moins 19 ;
//   · chaque forme acceptée se valide elle-même, ses nombres sont dans le corrigé ;
//   · toutes les micros de la notion sont travaillées, aucune d'une autre notion ;
//   · dollars appariés, aucun énoncé en double.
// Usage : npx --yes tsx@4 scripts/verifier-une-fiche-stmg.ts <slug>
//   ex. : npx --yes tsx@4 scripts/verifier-une-fiche-stmg.ts auto-proportion
import Module from "node:module";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Module as any)._extensions[".css"] = () => {};

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).React = (await import("react")).default;
  const slug = process.argv[2];
  if (!slug) throw new Error("slug manquant");
  const notionId = slug.replace(/-/g, "_");
  const { saisieJuste } = await import("../lib/fiches-exercices/verifier-saisie");
  const { microSkills } = await import("../lib/tutor-v4/knowledge/maths/stmg/microSkills");
  const mod = await import(`../lib/fiches-exercices/maths-stmg-${slug}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fiche = Object.values(mod).find((v: any) => v?.series) as any;
  if (!fiche) throw new Error("aucune fiche exportée");

  const erreurs: string[] = [];
  const alertes: string[] = [];
  if (fiche.classe !== "stmg") erreurs.push(`classe = ${fiche.classe}`);
  if (fiche.notion !== slug) erreurs.push(`notion = ${fiche.notion}`);

  const attendues = microSkills.filter((m) => m.notionId === notionId).map((m) => m.id);
  if (!attendues.length) erreurs.push(`aucune micro pour la notion ${notionId}`);
  const vues = new Set<string>();
  const enonces = new Set<string>();
  let n = 0;
  let avec = 0;
  const parNiveau: Record<number, number> = {};
  for (const s of fiche.series) {
    parNiveau[s.niveau] = (parNiveau[s.niveau] ?? 0) + s.exercices.length;
    if (!s.rappel?.length) erreurs.push(`niveau ${s.niveau} sans rappel`);
    for (const ex of s.exercices) {
      n++;
      if (enonces.has(ex.enonce)) erreurs.push(`ex.${n} : énoncé en double`);
      enonces.add(ex.enonce);
      for (const champ of [ex.enonce, ex.correction]) {
        if (((champ.match(/(?<!\\)\$/g) ?? []).length) % 2) erreurs.push(`ex.${n} : dollars non appariés`);
      }
      if (!ex.micros?.length) erreurs.push(`ex.${n} : aucune micro`);
      for (const m of ex.micros ?? []) {
        if (!attendues.includes(m)) erreurs.push(`ex.${n} : micro « ${m} » hors de la notion`);
        vues.add(m);
      }
      if (!ex.reponses?.length) continue;
      avec++;
      const corrige = ex.correction.replace(/\{,\}/g, ",").replace(/\\,|\s|\$/g, "");
      for (const r of ex.reponses) {
        const formes = Array.isArray(r.attendu) ? r.attendu : [r.attendu];
        for (const f of formes) {
          if (!saisieJuste(f, r)) erreurs.push(`ex.${n} ${r.question ?? ""} « ${f} » ne se valide pas`);
          for (const nb of f.replace(/\s/g, "").match(/\d+(?:[.,]\d+)?/g) ?? []) {
            if (!corrige.includes(nb.replace(".", ","))) alertes.push(`ex.${n} ${r.question ?? ""} « ${f} » : ${nb} absent du corrigé`);
          }
        }
      }
    }
  }
  // Le texte que l'élève lit (05/11, après le pilote auto-proportion).
  let num = 0;
  const niv3 = fiche.series.find((s: { niveau: number }) => s.niveau === 3);
  for (const ex of niv3?.exercices ?? []) if (!ex.titre) erreurs.push("★★★ : un problème sans titre");
  for (const s of fiche.series) {
    if (/[$\\^]/.test(s.consigne ?? "")) erreurs.push(`niveau ${s.niveau} : formule dans la consigne (badge du mode classe)`);
    if (s.rappel && (s.rappel.length < 2 || s.rappel.length > 4)) erreurs.push(`niveau ${s.niveau} : rappel de ${s.rappel.length} lignes (2 à 4)`);
    for (const ex of s.exercices) {
      num++;
      if (ex.titre?.includes("$")) erreurs.push(`ex.${num} : $ dans le titre`);
      if (!/\n\s*Réponse\s*:[^\n]*$/.test(ex.correction.trim())) erreurs.push(`ex.${num} : la dernière ligne du corrigé n'est pas « Réponse : … »`);
      if (!ex.correction.includes("\n")) erreurs.push(`ex.${num} : corrigé sans étapes`);
      for (const [nom, t] of [["énoncé", ex.enonce], ["corrigé", ex.correction]] as const) {
        // ⛔ « \times » avec un seul antislash : une tabulation et « imes » à l'écran.
        if (/[\t\f\v\r\b]/.test(t)) erreurs.push(`ex.${num} ${nom} : caractère de contrôle (un antislash seul ?)`);
        const horsFormule = t.replace(/\$[^$]*\$/g, " ");
        if (/[\\^]/.test(horsFormule)) erreurs.push(`ex.${num} ${nom} : LaTeX hors formule`);
        if (/\d\.\d/.test(t)) erreurs.push(`ex.${num} ${nom} : point décimal`);
        for (const [, f] of t.matchAll(/\$([^$]*)\$/g)) if (/\d,\d/.test(f)) erreurs.push(`ex.${num} ${nom} : virgule sans {,} dans $${f}$`);
        if (/\d\s*\/\s*\d/.test(horsFormule) && !/\d\/\d/.test((ex.reponses ?? []).map((r: { attendu: string | string[] }) => r.attendu).join(" "))) alertes.push(`ex.${num} ${nom} : « / » entre deux nombres (division ? écrire ÷)`);
      }
    }
  }
  const pieges = fiche.series.flatMap((s: { exercices: { correction: string }[] }) => s.exercices).filter((e: { correction: string }) => e.correction.includes("⛔ Le piège")).length;
  if (pieges < 15) alertes.push(`${pieges}/20 corrigés nomment un piège`);
  if (n !== 20) erreurs.push(`${n} exercices au lieu de 20`);
  if (parNiveau[1] !== 8 || parNiveau[2] !== 8 || parNiveau[3] !== 4) erreurs.push(`répartition ${JSON.stringify(parNiveau)} au lieu de 8/8/4`);
  if (avec < 19) erreurs.push(`${avec}/20 exercices avec réponses (au moins 19)`);
  for (const m of attendues) if (!vues.has(m)) erreurs.push(`micro non travaillée : ${m}`);

  for (const e of erreurs) console.log(`✗ ${e}`);
  for (const a of alertes) console.log(`? ${a}`);
  console.log(`\n${slug} : ${avec}/${n} avec réponses, ${vues.size}/${attendues.length} micros, ${erreurs.length} erreur(s), ${alertes.length} alerte(s).`);
  process.exit(erreurs.length ? 1 : 0);
}
main();
