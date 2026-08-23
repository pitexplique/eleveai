// Le coach couvre-t-il le programme, objectif par objectif ?
//
// ⛔ POURQUOI (22/08/2026). Les six vérificateurs de banque comptent les items
// d'une micro EXISTANTE — générateurs, variété, canvas, LaTeX, doublons,
// démarrage. Aucun ne demande **si une micro manque** : un trou n'a rien à
// compter, donc il ne déclenche rien. Neuf chapitres du programme de 6e sont
// ainsi restés absents sans qu'un seul voyant passe au rouge.
//
// Celui-ci ne compte pas les items. Il compare deux listes :
//   · le PROGRAMME, écrit comme une donnée dans
//     lib/tutor-v4/knowledge/maths/<classe>/bo-objectifs.ts (intitulés recopiés
//     du document officiel, avec la page) ;
//   · la CONNAISSANCE, c'est-à-dire les micro-compétences réellement déclarées.
//
// Et il lit dans les deux sens :
//   ⛔ un objectif sans micro       → un TROU : l'élève n'a rien pour travailler ça ;
//   ⚠️ une micro sans objectif      → du HORS-PROGRAMME, sauf si la dette est
//                                     déclarée et justifiée dans `microsHorsProgramme` ;
//   ⛔ une micro citée mais inexistante → une faute de frappe dans la carte,
//                                     qui ferait croire à une couverture.
//
// Usage — tsx n'est pas une dépendance du projet, npx le récupère au vol :
//   npx --yes tsx@4 scripts/verifier-bo.ts
//   npx --yes tsx@4 scripts/verifier-bo.ts 6e
//   npx --yes tsx@4 scripts/verifier-bo.ts 6e --trous     (seulement les trous)
//
// Sortie non nulle s'il reste un trou ou une faute de frappe : les dettes
// déclarées, elles, ne bloquent pas — elles se rappellent.

import { loadKnowledgeV4 } from "@/lib/tutor-v4/loaders/loadKnowledgeV4";

/** Les classes dont le programme a été écrit comme une donnée. */
const CLASSES_OUTILLEES = ["cm2", "6e"] as const;

type ObjectifBO = {
  id: string;
  domaine: string;
  chapitre: string;
  objectif: string;
  page: number;
  micros: string[];
  note?: string;
};

type Dette = { micro: string; raison: string };

type Programme = {
  objectifs: ObjectifBO[];
  horsProgramme: Dette[];
};

async function chargerProgramme(classe: string): Promise<Programme | null> {
  try {
    const mod = await import(`@/lib/tutor-v4/knowledge/maths/${classe}/bo-objectifs`);
    const objectifs = Object.values(mod).find(
      (v): v is ObjectifBO[] =>
        Array.isArray(v) && v.every((o) => o && typeof o === "object" && "objectif" in o)
    );
    const horsProgramme =
      Object.values(mod).find(
        (v): v is Dette[] =>
          Array.isArray(v) && v.every((o) => o && typeof o === "object" && "raison" in o)
      ) ?? [];
    if (!objectifs) return null;
    return { objectifs, horsProgramme };
  } catch {
    return null;
  }
}

function titre(texte: string) {
  console.log(`\n${texte}`);
  console.log("─".repeat(Math.max(24, texte.length)));
}

async function verifier(classe: string, seulementTrous: boolean): Promise<number> {
  const programme = await chargerProgramme(classe);
  if (!programme) {
    console.log(`⏭️  ${classe.padEnd(6)} pas de bo-objectifs.ts — programme pas encore écrit`);
    return 0;
  }

  const knowledge = await loadKnowledgeV4(classe, "maths");
  const microsExistantes = new Set(
    (knowledge?.microSkills ?? []).map((m: { id: string }) => m.id)
  );
  const labelDe = new Map(
    (knowledge?.microSkills ?? []).map((m: { id: string; label: string }) => [m.id, m.label])
  );

  const { objectifs, horsProgramme } = programme;
  const declareesHorsProgramme = new Map(horsProgramme.map((d) => [d.micro, d.raison]));

  // ── 1. Les objectifs sans micro : les TROUS ──
  const trous = objectifs.filter((o) => o.micros.length === 0);

  // ── 2. Les micros citées qui n'existent pas : les FAUTES DE FRAPPE ──
  const fautes: { objectif: string; micro: string }[] = [];
  for (const o of objectifs) {
    for (const micro of o.micros) {
      if (!microsExistantes.has(micro)) fautes.push({ objectif: o.id, micro });
    }
  }

  // ── 3. Les micros couvertes par aucun objectif : le HORS-PROGRAMME ──
  const couvertes = new Set(objectifs.flatMap((o) => o.micros));
  const orphelines = [...microsExistantes].filter((m) => !couvertes.has(m));
  const dettesDeclarees = orphelines.filter((m) => declareesHorsProgramme.has(m));
  const dettesNonDeclarees = orphelines.filter((m) => !declareesHorsProgramme.has(m));

  // ── 4. Les dettes déclarées qui n'existent plus : la carte a vieilli ──
  const dettesPerimees = horsProgramme.filter(
    (d) => !microsExistantes.has(d.micro) || couvertes.has(d.micro)
  );

  const couvertsCount = objectifs.length - trous.length;
  const pct = Math.round((couvertsCount / objectifs.length) * 100);

  titre(`PROGRAMME · ${classe} · maths`);
  console.log(
    `${objectifs.length} objectifs d'apprentissage · ${microsExistantes.size} micro-compétences`
  );
  console.log(
    `${couvertsCount}/${objectifs.length} objectifs couverts (${pct} %) — ${trous.length} trou(s)`
  );

  if (trous.length) {
    titre(`⛔ ${trous.length} OBJECTIF(S) SANS AUCUNE MICRO — l'élève n'a rien pour travailler ça`);
    let chapitreCourant = "";
    for (const t of trous) {
      if (t.chapitre !== chapitreCourant) {
        chapitreCourant = t.chapitre;
        console.log(`\n  ${chapitreCourant}`);
      }
      console.log(`   · ${t.objectif}   [${t.id}, p. ${t.page}]`);
      if (t.note) console.log(`     ${t.note}`);
    }
  }

  if (seulementTrous) return trous.length ? 1 : 0;

  if (fautes.length) {
    titre(`⛔ ${fautes.length} MICRO(S) CITÉE(S) MAIS INEXISTANTE(S) — couverture illusoire`);
    for (const f of fautes) console.log(`   · ${f.micro}   cité par ${f.objectif}`);
  }

  if (dettesNonDeclarees.length) {
    titre(
      `⚠️  ${dettesNonDeclarees.length} MICRO(S) HORS PROGRAMME, NON DÉCLARÉE(S) — à couvrir ou à assumer`
    );
    for (const m of dettesNonDeclarees) {
      console.log(`   · ${m}   « ${labelDe.get(m) ?? "?"} »`);
    }
    console.log(
      `\n   → soit on l'accroche à un objectif dans bo-objectifs.ts, soit on l'inscrit`
    );
    console.log(`     dans microsHorsProgramme avec la raison. Pas de troisième option.`);
  }

  if (dettesDeclarees.length) {
    titre(`📌 ${dettesDeclarees.length} dette(s) hors programme, assumée(s)`);
    for (const m of dettesDeclarees) {
      console.log(`   · ${m} — ${declareesHorsProgramme.get(m)}`);
    }
  }

  if (dettesPerimees.length) {
    titre(`🧹 ${dettesPerimees.length} dette(s) périmée(s) — la micro a disparu ou est couverte`);
    for (const d of dettesPerimees) console.log(`   · ${d.micro}`);
  }

  const bloquant = trous.length + fautes.length + dettesNonDeclarees.length;
  if (!bloquant) {
    console.log(
      `\n✅ ${classe} · maths : chaque objectif du programme a sa micro, et chaque micro a sa place.`
    );
  }
  return bloquant ? 1 : 0;
}

async function main() {
  const args = process.argv.slice(2);
  const seulementTrous = args.includes("--trous");
  const classes = args.filter((a) => !a.startsWith("--"));
  const cibles = classes.length ? classes : [...CLASSES_OUTILLEES];

  let code = 0;
  for (const classe of cibles) {
    code += await verifier(classe, seulementTrous);
  }
  process.exit(code ? 1 : 0);
}

main();
