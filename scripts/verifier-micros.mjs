// scripts/verifier-micros.mjs
//
// LES MICRO-COMPÉTENCES SONT-ELLES RELIÉES AUX FICHES ? (25/08/2026)
//
//   node scripts/verifier-micros.mjs            → tout le site
//   node scripts/verifier-micros.mjs maths 6e   → une matière, une classe
//
// Trois questions, une seule réponse par fiche :
//   1. une micro de la banque n'a AUCUN bloc dans la fiche de sa notion ;
//   2. un bloc cite une micro qui N'EXISTE PAS dans la banque ;
//   3. un bloc cite une micro qui appartient à UNE AUTRE notion.
//
// ⚠️ POURQUOI CE CONTRÔLE EXISTE. Avant lui, le lien fiche ↔ micro vivait dans
// un COMMENTAIRE d'en-tête (« // - angle_mesurer → méthode "Mesurer" »). Un
// commentaire ne se vérifie pas : il peut être faux, périmé, ou absent, et rien
// ne le dit. Mesuré le 25/08 : 3 426 micros dans la banque, 357 citées, et
// seulement en commentaire.
//
// ⚠️ CE QU'IL NE VÉRIFIE PAS. Il lit le fichier au motif, pas au typage : il
// collecte l'UNION des `micros:` d'une fiche, sans savoir quel bloc porte quoi.
// Il attrape donc « cette micro n'est nulle part » — pas « cette micro est sur
// le mauvais bloc ». C'est le défaut qu'on peut corriger, pas celui qu'on cache.

import fs from "node:fs";
import path from "node:path";

const [matiereVoulue, classeVoulue] = process.argv.slice(2);

const RACINE_SAVOIR = "lib/tutor-v4/knowledge";
const RACINE_FICHES = "lib/fiches";

// ── 1. La banque : toutes les micros, par notion ──────────────────────────────
// ⚠️ DEUX ÉCRITURES DANS LE DÉPÔT. Les maths posent id / label / notionId sur
// trois lignes, le français sur une seule. Une expression qui exige des retours
// à la ligne ne voit que les maths — c'est arrivé, et elle a fait passer 37
// identifiants de français pour des fantômes.
// ⛔ ET LA RECHERCHE NE DOIT PAS TRAVERSER DEUX OBJETS. Sans les `[^{}]`, le
// motif prenait l'`id` d'une entrée et le `notionId` d'une autre — parce que les
// identifiants réapparaissent dans les `prerequis` des entrées suivantes. Il
// annonçait alors « angle_droit appartient à la notion angle », qui n'existe
// pas. Un contrôle faux est pire que pas de contrôle : il a fallu le mesurer
// pour le voir.
const MOTIF_MICRO =
  /\{[^{}]*?id:\s*"([^"]+)"[^{}]*?label:\s*"([^"]+)"[^{}]*?notionId:\s*"([^"]+)"[^{}]*?\}/g;

const micros = [];
(function scan(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) scan(p);
    else if (e.name === "microSkills.ts") {
      const parts = p.split(path.sep);
      const i = parts.indexOf("knowledge");
      const matiere = parts[i + 1] ?? "?";
      const classe = parts[i + 2] ?? "?";
      for (const m of fs.readFileSync(p, "utf8").matchAll(MOTIF_MICRO))
        micros.push({ id: m[1], label: m[2], notion: m[3], matiere, classe });
    }
  }
})(RACINE_SAVOIR);

// ⚠️ CLÉ COMPOSÉE : rien ne garantit qu'un `id` soit unique dans tout le dépôt.
// Deux classes peuvent nommer pareil deux compétences différentes.
const cle = (matiere, classe, id) => `${matiere}|${classe}|${id}`;
const tousLesIds = new Map(micros.map((m) => [cle(m.matiere, m.classe, m.id), m]));
const parNotion = new Map();
for (const m of micros) {
  const k = `${m.matiere}|${m.classe}|${m.notion}`;
  if (!parNotion.has(k)) parNotion.set(k, []);
  parNotion.get(k).push(m);
}

// ── 2. Les fiches : ce qu'elles citent ────────────────────────────────────────
const fiches = fs
  .readdirSync(RACINE_FICHES)
  .filter((f) => f.endsWith(".tsx"))
  .filter((f) => !matiereVoulue || f.startsWith(`${matiereVoulue}-`))
  .filter((f) => !classeVoulue || f.startsWith(`${matiereVoulue ?? ""}-${classeVoulue}-`))
  .sort();

let annotees = 0;
let sansAnnotation = 0;
const soucis = [];
let microsCouvertes = 0;
let microsAttendues = 0;

for (const f of fiches) {
  const s = fs.readFileSync(path.join(RACINE_FICHES, f), "utf8");
  const matiere = s.match(/matiere:\s*"([^"]+)"/)?.[1];
  const classe = s.match(/classe:\s*"([^"]+)"/)?.[1];
  const notionRoute = s.match(/notion:\s*"([^"]+)"/)?.[1];
  if (!matiere || !classe || !notionRoute) continue;

  // ⚠️ LA ROUTE UTILISE DES TIRETS, LA BANQUE DES SOULIGNÉS : « angle-mesure »
  // côté URL, « angle_mesure » côté connaissances. Le même objet, deux graphies.
  const notion = notionRoute.replace(/-/g, "_");

  const attendues = parNotion.get(`${matiere}|${classe}|${notion}`) ?? [];
  const cites = new Set(
    [...s.matchAll(/micros:\s*\[([^\]]*)\]/g)]
      .flatMap((m) => [...m[1].matchAll(/"([^"]+)"/g)])
      .map((m) => m[1])
  );

  if (!cites.size) {
    sansAnnotation++;
    continue;
  }
  annotees++;

  microsAttendues += attendues.length;
  microsCouvertes += attendues.filter((m) => cites.has(m.id)).length;

  const manquantes = attendues.filter((m) => !cites.has(m.id)).map((m) => m.id);
  const inconnues = [...cites].filter((c) => !tousLesIds.has(cle(matiere, classe, c)));
  const ailleurs = [...cites]
    .filter((c) => {
      const m = tousLesIds.get(cle(matiere, classe, c));
      return m && m.notion !== notion;
    })
    .map((c) => `${c} (notion ${tousLesIds.get(cle(matiere, classe, c)).notion})`);

  if (manquantes.length || inconnues.length || ailleurs.length)
    soucis.push({ f, notion, manquantes, inconnues, ailleurs });
}

// ── 3. Le verdict ────────────────────────────────────────────────────────────
console.log(
  `${fiches.length} fiche(s) examinée(s) — ${annotees} annotée(s), ${sansAnnotation} sans annotation.`
);
if (annotees)
  console.log(
    `Sur les fiches annotées : ${microsCouvertes}/${microsAttendues} micros de la banque ont un bloc.`
  );

if (!soucis.length) {
  console.log("\n✅ rien à signaler sur les fiches annotées.");
  process.exit(0);
}

for (const s of soucis) {
  console.log(`\n❌ ${s.f}  [${s.notion}]`);
  if (s.inconnues.length)
    console.log("   micro(s) citée(s) qui n'existent pas :", s.inconnues.join(", "));
  if (s.ailleurs.length)
    console.log("   micro(s) d'une AUTRE notion :", s.ailleurs.join(", "));
  if (s.manquantes.length)
    console.log("   micro(s) de la banque sans bloc :", s.manquantes.join(", "));
}

// Une micro citée qui n'existe pas, ou qui vient d'ailleurs, est une ERREUR.
// Une micro sans bloc est un TROU : la fiche ne couvre pas encore tout son
// programme. Les deux se voient, seule la première fait échouer.
const erreurs = soucis.filter((s) => s.inconnues.length || s.ailleurs.length);
process.exit(erreurs.length ? 1 : 0);
