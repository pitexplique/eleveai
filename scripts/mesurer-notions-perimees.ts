// COMBIEN DE LIENS ENVOIENT UN ÉLÈVE SUR UNE NOTION QU'IL N'A PAS DEMANDÉE ?
//
// Mesure du 09/09/2026, en réponse au constat de Frédéric : un POST sur
// /api/tutor-v4/start avec `notion=nombres_relatifs` (5e maths) rend une paire
// sur `algo_programmation`, sans erreur ni message.
//
// La cause est `findNotion` (lib/tutor-v4/selection/selector.ts:14) :
//   pack.notions.find((n) => n.id === notionId) ?? pack.notions[0]
// Un identifiant inconnu ne lève rien : il rend la PREMIÈRE notion du pack.
//
// Ce script ne corrige rien. Il compte. Trois choses :
//   1. la cible du repli, pack par pack — quelle notion serait servie ;
//   2. tous les identifiants de notion ÉCRITS EN DUR dans le dépôt, résolus
//      contre le pack vivant, avec ce qui serait servi à la place ;
//   3. l'écart entre les deux registres de notions (loadKnowledgeV4, que le
//      moteur consulte, et catalog.ts, que le navigateur consulte).
//
// ⚠️ CE QUE CE SCRIPT NE VOIT PAS, et qui doit être dit dans le rapport : les
// liens construits à l'exécution depuis le pack lui-même
// (`notion=${score.notionId}`) sont valides par construction. Le risque porte
// sur les identifiants ÉCRITS À LA MAIN, et sur eux seuls.
//
// Usage :
//   npx --yes tsx@4 scripts/mesurer-notions-perimees.ts

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { loadKnowledgeV4 } from "@/lib/tutor-v4/loaders/loadKnowledgeV4";
import { getNotionOptions, type Classe, type Matiere } from "@/lib/tutor-v4/catalog";
import { NOTION_COACH_MATHS, NOTION_COACH_FRANCAIS } from "@/lib/matrice/coach";

const RACINE = process.cwd();

/* Les 41 couples que `loadKnowledgeV4` accepte, relus un à un dans son corps.
   Une liste écrite à la main ici serait un quatrième registre ; celle-ci est
   une TRANSCRIPTION, et le script vérifie qu'aucun couple ne lève. */
const COUPLES: Array<[string, string]> = [
  ...["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde",
      "premiere", "premiere-spe", "stmg", "terminale-spe", "adulte"]
    .map((c) => [c, "maths"] as [string, string]),
  ...["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde"]
    .map((c) => [c, "francais"] as [string, string]),
  ...["a1", "a2", "b1", "b2"].map((c) => [c, "english-maths"] as [string, string]),
  ...["a1", "a2", "b1", "b2"].map((c) => [c, "espagnol"] as [string, string]),
  ...["a1", "a2", "b1", "b2", "c1", "pix-college", "pix-lycee"]
    .map((c) => [c, "ia"] as [string, string]),
  ["eco-college", "economie"],
];

type Pack = { ids: Set<string>; premiere: string; taille: number };

async function chargerPacks(): Promise<Map<string, Pack>> {
  const packs = new Map<string, Pack>();

  for (const [classe, matiere] of COUPLES) {
    const k = await loadKnowledgeV4(classe, matiere);
    packs.set(`${classe}|${matiere}`, {
      ids: new Set(k.notions.map((n) => n.id)),
      premiere: k.notions[0]?.id ?? "(pack vide)",
      taille: k.notions.length,
    });
  }

  return packs;
}

/* ------------------------------------------------------------------ */
/* Le balayage des identifiants écrits en dur                          */
/* ------------------------------------------------------------------ */

type Reference = {
  fichier: string;
  ligne: number;
  classe: string;
  matiere: string;
  notion: string;
  origine: string;
};

function fichiersSources(dossier: string, acc: string[] = []): string[] {
  for (const nom of readdirSync(dossier)) {
    if (nom === "node_modules" || nom === ".next" || nom === ".git") continue;
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) {
      fichiersSources(chemin, acc);
    } else if (/\.(ts|tsx|mjs|json|md)$/.test(nom)) {
      acc.push(chemin);
    }
  }
  return acc;
}

/* Une URL littérale du coach ou du tutor. Les deux ordres d'écriture existent
   dans le dépôt (`classe=…&matiere=…&notion=…` et `matiere=…&classe=…`), et
   un `${…}` dans l'un des trois champs disqualifie la ligne : elle est
   construite à l'exécution, donc valide par construction. */
const URL_CMN = /classe=([a-z0-9-]+)&matiere=([a-z0-9-]+)&notion=([a-zA-Z0-9_.]+)/g;
const URL_MCN = /matiere=([a-z0-9-]+)&classe=([a-z0-9-]+)&notion=([a-zA-Z0-9_.]+)/g;

function balayerUrls(): Reference[] {
  const refs: Reference[] = [];

  for (const chemin of [
    ...fichiersSources(join(RACINE, "app")),
    ...fichiersSources(join(RACINE, "lib")),
  ]) {
    const lignes = readFileSync(chemin, "utf8").split(/\r?\n/);

    lignes.forEach((ligne, i) => {
      for (const [re, ordre] of [[URL_CMN, "cmn"], [URL_MCN, "mcn"]] as const) {
        re.lastIndex = 0;
        let m: RegExpExecArray | null;
        while ((m = re.exec(ligne))) {
          const classe = ordre === "cmn" ? m[1] : m[2];
          const matiere = ordre === "cmn" ? m[2] : m[1];
          refs.push({
            fichier: relative(RACINE, chemin).replace(/\\/g, "/"),
            ligne: i + 1,
            classe,
            matiere,
            notion: m[3],
            origine: "URL écrite en dur",
          });
        }
      }
    });
  }

  return refs;
}

/* La matrice d'entrée : lexique → identifiant, classe par classe. */
function balayerMatrice(): Reference[] {
  const refs: Reference[] = [];

  const tables: Array<[string, Record<string, Record<string, string>>]> = [
    ["maths", NOTION_COACH_MATHS],
    ["francais", NOTION_COACH_FRANCAIS],
  ];

  for (const [matiere, table] of tables) {
    for (const [theme, parClasse] of Object.entries(table)) {
      for (const [classe, notion] of Object.entries(parClasse)) {
        refs.push({
          fichier: "lib/matrice/coach.ts",
          ligne: 0,
          classe,
          matiere,
          notion,
          origine: `matrice, thème « ${theme} »`,
        });
      }
    }
  }

  return refs;
}

/* L'évaluation nationale : ses `notionId` sont écrits dans son propre
   référentiel, et `lienRemediation` les recopie tels quels dans l'URL du
   tutor — en changeant la classe au passage (une 6e révise du CM2, une 4e
   révise de la 5e ; `CLASSE_SOURCE` dans _bilan.tsx).
   ⚠️ `supports.ts` ne porte QUE du français (ce sont les textes supports de
   l'épreuve). `moteur.ts` porte les deux matières ; on y lit donc la matière
   dans le nom de l'épreuve qui précède, faute de quoi on inventerait des faux
   positifs en testant un identifiant de français contre le pack de maths. */
function balayerEvalNationale(): Reference[] {
  const refs: Reference[] = [];

  const sources: Array<[string, string | null]> = [
    ["supports.ts", "francais"],
    ["moteur.ts", null], // matière déduite ligne à ligne
  ];

  for (const [nom, matiereFixe] of sources) {
    const chemin = join(RACINE, "lib", "eval-nationale", nom);
    let contenu: string;
    try {
      contenu = readFileSync(chemin, "utf8");
    } catch {
      continue;
    }

    const lignes = contenu.split(/\r?\n/);
    let matiereCourante = matiereFixe ?? "maths";

    lignes.forEach((ligne, i) => {
      if (!matiereFixe) {
        if (/matiere:\s*"francais"|FRANCAIS|Français/i.test(ligne)) matiereCourante = "francais";
        else if (/matiere:\s*"maths"|MATHS|Mathématiques/i.test(ligne)) matiereCourante = "maths";
      }

      const m = /notionId:\s*"([a-zA-Z0-9_.]+)"/.exec(ligne);
      if (!m) return;

      /* Les deux classes SOURCES possibles. Un identifiant valide dans l'une
         des deux n'est pas périmé : le regroupement plus bas s'en charge. */
      for (const classeSource of ["cm2", "5e"]) {
        refs.push({
          fichier: `lib/eval-nationale/${nom}`,
          ligne: i + 1,
          classe: classeSource,
          matiere: matiereCourante,
          notion: m[1],
          origine: `éval. nationale (${matiereCourante})`,
        });
      }
    });
  }

  return refs;
}

/* ------------------------------------------------------------------ */

async function main() {
  const packs = await chargerPacks();

  console.log("=".repeat(72));
  console.log("1. LA CIBLE DU REPLI, PACK PAR PACK");
  console.log("   (ce que `findNotion` sert quand l'identifiant est inconnu)");
  console.log("=".repeat(72));

  for (const [cle, pack] of packs) {
    const [classe, matiere] = cle.split("|");
    console.log(
      `  ${classe.padEnd(14)} ${matiere.padEnd(14)} ${String(pack.taille).padStart(3)} notions  ->  ${pack.premiere}`
    );
  }

  console.log();
  console.log("=".repeat(72));
  console.log("2. LES DEUX REGISTRES DE NOTIONS SONT-ILS D'ACCORD ?");
  console.log("   loadKnowledgeV4 (le moteur) contre catalog.ts (le navigateur)");
  console.log("=".repeat(72));

  let desaccords = 0;
  for (const [cle, pack] of packs) {
    const [classe, matiere] = cle.split("|");
    let options: string[];
    try {
      options = getNotionOptions(classe as Classe, matiere as Matiere);
    } catch (e) {
      console.log(`  ⛔ ${cle} : catalog.ts lève — ${(e as Error).message}`);
      desaccords++;
      continue;
    }

    const moteur = [...pack.ids].sort().join(",");
    const navigateur = [...options].sort().join(",");
    if (moteur !== navigateur) {
      desaccords++;
      const seulMoteur = [...pack.ids].filter((id) => !options.includes(id));
      const seulNav = options.filter((id) => !pack.ids.has(id));
      console.log(`  ⛔ ${classe}/${matiere} : les deux registres DIFFÈRENT`);
      console.log(`       moteur seul     (${seulMoteur.length}) : ${seulMoteur.slice(0, 6).join(", ")}`);
      console.log(`       navigateur seul (${seulNav.length}) : ${seulNav.slice(0, 6).join(", ")}`);
    }
  }
  if (desaccords === 0) {
    console.log("  ✅ Les 41 couples sont d'accord, identifiant par identifiant.");
  }

  console.log();
  console.log("=".repeat(72));
  console.log("3. LES IDENTIFIANTS ÉCRITS EN DUR, RÉSOLUS CONTRE LE PACK VIVANT");
  console.log("=".repeat(72));

  const refs = [...balayerUrls(), ...balayerMatrice(), ...balayerEvalNationale()];

  /* L'éval. nationale est testée sur quatre cibles ; un identifiant valide sur
     l'une d'elles n'est pas périmé. On regroupe donc par (fichier, ligne,
     notion) avant de conclure. */
  const groupes = new Map<string, Reference[]>();
  for (const r of refs) {
    const cle = `${r.fichier}:${r.ligne}:${r.notion}`;
    if (!groupes.has(cle)) groupes.set(cle, []);
    groupes.get(cle)!.push(r);
  }

  let lignesTotal = 0;
  let lignesPerimees = 0;
  let horsPack = 0;

  /* Un identifiant périmé écrit sur quarante lignes reste UNE erreur à
     corriger. On compte donc les deux : les identifiants distincts (la dette
     réelle) et les lignes touchées (l'ampleur du remplacement). */
  type Perimee = { classe: string; matiere: string; notion: string; servi: string;
                   origines: Set<string>; lieux: string[] };
  const parIdentifiant = new Map<string, Perimee>();

  for (const [, variantes] of groupes) {
    lignesTotal++;

    const testables = variantes.filter((r) => packs.has(`${r.classe}|${r.matiere}`));
    if (testables.length === 0) {
      horsPack++;
      continue;
    }

    const valide = testables.some((r) => packs.get(`${r.classe}|${r.matiere}`)!.ids.has(r.notion));
    if (valide) continue;

    lignesPerimees++;
    const r = testables[0];
    const cle = `${r.classe}|${r.matiere}|${r.notion}`;
    if (!parIdentifiant.has(cle)) {
      parIdentifiant.set(cle, {
        classe: r.classe, matiere: r.matiere, notion: r.notion,
        servi: packs.get(`${r.classe}|${r.matiere}`)!.premiere,
        origines: new Set(), lieux: [],
      });
    }
    const p = parIdentifiant.get(cle)!;
    p.origines.add(r.origine);
    p.lieux.push(r.ligne ? `${r.fichier}:${r.ligne}` : r.fichier);
  }

  console.log(`  Lignes de source examinées      : ${lignesTotal}`);
  console.log(`  Dont couple hors du tutor       : ${horsPack}`);
  console.log(`  Lignes portant un id périmé     : ${lignesPerimees}`);
  console.log(`  IDENTIFIANTS DISTINCTS PÉRIMÉS  : ${parIdentifiant.size}`);
  console.log();

  if (parIdentifiant.size) {
    console.log("  LES IDENTIFIANTS PÉRIMÉS, ET CE QUI SERAIT SERVI À LA PLACE :");
    console.log();
    const tri = [...parIdentifiant.values()].sort(
      (a, b) => b.lieux.length - a.lieux.length
    );
    for (const p of tri) {
      console.log(
        `  ⛔ ${p.classe}/${p.matiere}  « ${p.notion} »  ->  SERT « ${p.servi} »   (${p.lieux.length} ligne${p.lieux.length > 1 ? "s" : ""})`
      );
      console.log(`       ${[...p.origines].join(" ; ")}`);
      console.log(`       ex. ${p.lieux.slice(0, 3).join("  ")}${p.lieux.length > 3 ? "  …" : ""}`);
    }
  } else {
    console.log("  ✅ Aucun identifiant écrit en dur n'est périmé.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
