// LE PONT ÉVAL → COACH TIENT-IL ENCORE ?
//
// POURQUOI (17/08/2026). L'écran de résultat de `/eval-pix-ia` renvoie
// désormais, pour chaque compétence fragile, vers sa fiche de cours et vers le
// coach ouvert sur cette compétence. Deux liens, et deux façons de casser sans
// bruit :
//   - une fiche renommée ou retirée du registre : le bouton « Lire la fiche »
//     disparaît, et personne ne s'en aperçoit — l'absence d'un bouton ne
//     ressemble pas à une panne ;
//   - un lien vers une notion qui n'existe pas dans la classe visée : l'élève
//     arrive sur une liste vide, sans un mot d'explication.
//
// ⚠️ ON CONTRÔLE LE LIEN RÉELLEMENT PRODUIT, pas la classe qu'on suppose.
// `coachPourCompetence` bascule au besoin vers le collège — la 3.4 n'a aucun
// savoir-faire de lycée. Vérifier `classeCoachPour(niveau)` plutôt que le lien
// lui-même reviendrait à contrôler notre intention au lieu de ce que l'élève
// va suivre. C'est précisément ainsi qu'un repli silencieux passe inaperçu.
//
// Usage : npx --yes tsx@4 scripts/verifier-fiches-pix.ts

import { PIX_COMPETENCES } from "@/lib/pix-ia/referentiel";
import {
  coachPourCompetence,
  ficheDeCompetence,
  verifierFichesPix,
} from "@/lib/pix-ia/fiches";
import { loadKnowledgeV4 } from "@/lib/tutor-v4/loaders/loadKnowledgeV4";
import { PIX_IA_QUESTIONS } from "@/lib/pix-ia/questions";
import { estMaison } from "@/lib/tutor-v4/knowledge/ia/maison";

function param(lien: string, nom: string): string {
  return new URL(lien, "http://local").searchParams.get(nom) ?? "";
}

async function main() {
  console.log("\nPONT ÉVAL → COACH · IA");
  console.log("─".repeat(74));

  const manques = verifierFichesPix();

  console.log(`${PIX_COMPETENCES.length} compétences au référentiel.\n`);
  for (const c of PIX_COMPETENCES) {
    const fiche = ficheDeCompetence(c.id);
    console.log(
      `${fiche ? "🟢" : "⛔"} ${c.id.padEnd(5)} ${c.label.slice(0, 42).padEnd(44)}` +
        `${fiche ?? "AUCUNE FICHE"}`,
    );
  }

  const notionsPar = new Map<string, Set<string>>();
  console.log("\nLes notions de chaque classe :");
  for (const classe of ["pix-college", "pix-lycee"]) {
    const knowledge = await loadKnowledgeV4(classe, "ia");
    notionsPar.set(classe, new Set(knowledge.notions.map((n) => n.id)));
    console.log(`  ${classe.padEnd(12)} ${knowledge.notions.length} notions`);
  }

  const casses: string[] = [];
  const replis: string[] = [];

  for (const niveau of ["college", "lycee"] as const) {
    for (const c of PIX_COMPETENCES) {
      const lien = coachPourCompetence(c.id, niveau);
      const classe = param(lien, "classe");
      const notion = param(lien, "notion");

      if (!notionsPar.get(classe)?.has(notion)) {
        casses.push(`${niveau} · ${c.id} → ${classe} (notion absente)`);
        continue;
      }
      /* Un repli assumé se signale, il ne se cache pas : on veut le voir
         passer à chaque exécution, pour qu'il reste une décision. */
      if (niveau === "lycee" && classe === "pix-college") {
        replis.push(`${c.id} → collège (aucun savoir-faire de lycée)`);
      }
    }
  }

  console.log(
    `\n${casses.length ? "⛔" : "🟢"} ${PIX_COMPETENCES.length * 2} liens contrôlés ` +
      `(16 compétences × 2 niveaux) : ${casses.length ? `${casses.length} cassé(s)` : "tous mènent à une notion existante"}`,
  );
  if (replis.length) {
    console.log(`   ↪ replis assumés vers le collège : ${replis.join(", ")}`);
  }

  /* ─── L'ÉTANCHÉITÉ ────────────────────────────────────────────────────────
     Le coach sert Pix ET les notions maison ; l'épreuve blanche ne doit servir
     que Pix. Sans ce contrôle, une notion maison finirait un jour dans l'éval
     sans que personne ne s'en aperçoive, et l'épreuve cesserait de mesurer ce
     qu'elle prétend. Voir lib/tutor-v4/knowledge/ia/maison.ts. */
  const fuites = PIX_IA_QUESTIONS.filter((q) => estMaison(q.microskillId));
  const maisonAuCoach = (await loadKnowledgeV4("pix-college", "ia")).notions.filter((n) =>
    estMaison(n.id),
  );
  console.log(
    `\n${fuites.length ? "⛔" : "🟢"} Étanchéité : ${maisonAuCoach.length} notion(s) maison au coach, ` +
      `${fuites.length} dans l'épreuve blanche` +
      (fuites.length ? "" : " (aucune, c'est ce qu'on veut)"),
  );

  console.log(`\nExemple : ${coachPourCompetence("2.3", "college")}`);

  if (manques.length || casses.length || fuites.length) {
    if (manques.length) {
      console.log(`\n⛔ ${manques.length} problème(s) de fiche :`);
      for (const m of manques) console.log(`   ${m.competenceId} — ${m.probleme}`);
    }
    if (casses.length) {
      console.log(`\n⛔ ${casses.length} lien(s) menant à une liste vide :`);
      for (const l of casses) console.log(`   ${l}`);
    }
    console.log();
    process.exit(1);
  }

  console.log("\nChaque compétence fragile a une fiche à lire et une notion où s'entraîner.\n");
}

main();
