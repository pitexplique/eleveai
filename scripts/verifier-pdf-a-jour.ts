/**
 * Les PDF de fiches sont-ils à jour ?
 *
 * ── LE DÉFAUT QU'IL REND VISIBLE (24/08/2026) ────────────────────────────────
 * Un PDF est un INSTANTANÉ. On corrige une fiche, la page change aussitôt, et le
 * fichier reste celui de la veille. Frédéric l'a vu venir tout seul : « si je
 * modifie après une fiche je devrai relancer PDF ». Oui — et le coût n'est pas
 * le problème, cinq secondes suffisent pour une fiche. Le problème est que
 * l'oubli est SILENCIEUX : rien ne casse, aucune erreur, aucun 404. Le PDF dit
 * simplement quelque chose qu'on a corrigé hier, et personne ne le voit.
 *
 * C'est exactement la classe de défaut qui a fait écarter les vraies captures
 * d'écran le 22/08 — « un fichier ment le jour où la page change, et aucun
 * typecheck ne le relit ». La solution retenue portait le même défaut ; ce
 * script est ce qui la rend tenable.
 *
 * ── POURQUOI LES DATES DE GIT, ET SURTOUT PAS CELLES DU DISQUE ───────────────
 * ⛔ `fs.statSync().mtime` NE MARCHE PAS ICI, et l'erreur serait invisible :
 * git ne conserve pas les dates de modification. Sur un clone neuf — la machine
 * du matin, un runner de CI — TOUS les fichiers ont la date du `git checkout`,
 * donc plus rien n'est jamais « en retard ». Le contrôle passerait au vert
 * partout, et surtout là où il sert.
 * La date du DERNIER COMMIT d'un fichier, elle, est la même sur les deux postes
 * et sur n'importe quel clone. C'est la seule horloge partagée qu'on ait.
 *
 * ⚠️ CONSÉQUENCE À CONNAÎTRE : une fiche modifiée mais PAS ENCORE COMMITÉE a
 * toujours sa vieille date de commit. Elle passerait donc au vert à tort — d'où
 * le second contrôle, sur les fichiers modifiés dans la copie de travail.
 *
 * ── USAGE ────────────────────────────────────────────────────────────────────
 *   npm run verifier:pdf            → liste et prévient (code de sortie 0)
 *   npm run verifier:pdf -- --strict → échoue (code 1), pour un hook ou la CI
 *
 * ⛔ NE PAS LE BRANCHER SUR `npm run build` EN MODE STRICT. Un PDF en retard
 * n'est pas une raison de bloquer un déploiement : la page, elle, est juste. On
 * prévient, on ne barre pas la route.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { nomPdf } from "../lib/fiches/pdf.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.join(__dirname, "..");
const FICHES = path.join(RACINE, "app", "fiches-cours");
const PDF = path.join(RACINE, "public", "fiches");

/** La date du dernier commit d'un fichier, en secondes. 0 si jamais commité. */
function dateCommit(relatif: string): number {
  try {
    const s = execFileSync("git", ["log", "-1", "--format=%ct", "--", relatif], {
      cwd: RACINE,
      encoding: "utf8",
    }).trim();
    return s ? Number(s) : 0;
  } catch {
    return 0;
  }
}

/** Les fichiers modifiés ou non suivis dans la copie de travail. */
function copieDeTravailSale(): Set<string> {
  try {
    const s = execFileSync("git", ["status", "--porcelain"], { cwd: RACINE, encoding: "utf8" });
    return new Set(
      s
        .split("\n")
        .filter(Boolean)
        // Le format est « XY chemin » ; le chemin commence au 4e caractère.
        .map((l) => l.slice(3).trim().replace(/^"|"$/g, "")),
    );
  } catch {
    return new Set();
  }
}

const dateISO = (s: number) =>
  s ? new Date(s * 1000).toISOString().slice(0, 16).replace("T", " ") : "jamais commité";

type Fiche = {
  route: string;
  /** Le composant de données, celui qui porte le texte et les dessins. */
  source: string;
  page: string;
  pdf: string | null;
};

/**
 * Les fiches et leur source.
 *
 * ⚠️ ON LIT LE TITRE DANS LE FICHIER DE DONNÉES, avec la même règle de nommage
 * que le générateur (`nomPdf`, dans lib/fiches/pdf.ts). Aucun navigateur n'est
 * lancé : ce contrôle doit rester cent fois moins cher que ce qu'il surveille.
 * ⚠️ Le `titre:` retenu est celui de la MARGE DE DEUX ESPACES — le champ de
 * premier niveau de l'objet. Les propriétés, les étapes et les exemples ont eux
 * aussi un `titre`, plus indentés : les prendre donnerait un nom de fichier qui
 * n'existe nulle part, et le contrôle signalerait 84 PDF manquants.
 */
function lireFiches(): Fiche[] {
  const out: Fiche[] = [];
  for (const matiere of fs.readdirSync(FICHES)) {
    const dm = path.join(FICHES, matiere);
    if (!fs.statSync(dm).isDirectory()) continue;
    for (const classe of fs.readdirSync(dm)) {
      const dc = path.join(dm, classe);
      if (!fs.statSync(dc).isDirectory()) continue;
      for (const notion of fs.readdirSync(dc)) {
        const page = path.join(dc, notion, "page.tsx");
        if (!fs.existsSync(page)) continue;
        const src = fs.readFileSync(page, "utf8");
        const imp = src.match(/from "@\/lib\/fiches\/([a-z0-9-]+)"/);
        if (!imp) continue;
        const source = path.join(RACINE, "lib", "fiches", `${imp[1]}.tsx`);
        if (!fs.existsSync(source)) continue;
        const titre = fs.readFileSync(source, "utf8").match(/^ {2}titre: "([^"]+)"/m);
        out.push({
          route: `/fiches-cours/${matiere}/${classe}/${notion}`,
          source: path.relative(RACINE, source).replace(/\\/g, "/"),
          page: path.relative(RACINE, page).replace(/\\/g, "/"),
          pdf: titre ? `public/fiches/${nomPdf(titre[1], classe)}` : null,
        });
      }
    }
  }
  return out.sort((a, b) => a.route.localeCompare(b.route));
}

const strict = process.argv.includes("--strict");
const fiches = lireFiches();
const sale = copieDeTravailSale();

const enRetard: string[] = [];
const sansPdf: string[] = [];
const nonCommite: string[] = [];

for (const f of fiches) {
  // ⚠️ Les fiches d'IA n'ont pas de PDF par ce chemin (autre composant), et
  // c'est connu : on ne les compte pas comme manquantes.
  if (f.route.startsWith("/fiches-cours/ia/")) continue;

  if (!f.pdf || !fs.existsSync(path.join(RACINE, f.pdf))) {
    sansPdf.push(`${f.route}  →  ${f.pdf ? path.basename(f.pdf) : "titre illisible"}`);
    continue;
  }
  if (sale.has(f.source) || sale.has(f.page)) {
    nonCommite.push(`${f.route}  (source modifiée, pas encore commitée)`);
    continue;
  }
  const tSource = Math.max(dateCommit(f.source), dateCommit(f.page));
  const tPdf = dateCommit(f.pdf);
  if (tSource > tPdf) {
    enRetard.push(
      `${path.basename(f.pdf).padEnd(56)} fiche ${dateISO(tSource)}  ·  pdf ${dateISO(tPdf)}`,
    );
  }
}

/**
 * ⭐ LES PDF ORPHELINS (24/08/2026) — le piège de la réécriture.
 *
 * Frédéric : « je dois refaire toutes les fiches CM2 plus tard ». Or le nom d'un
 * PDF se construit sur le H1 de la fiche (`nomPdf`). Réécrire une fiche en
 * changeant son titre produit donc un fichier NEUF, et laisse l'ancien sur le
 * disque — où plus aucune page ne le lie.
 *
 * Et il ne dort pas tranquille : `lib/fiches/pdf-disponibles.ts` est reconstruit
 * en RELISANT le dossier, donc l'orphelin y reste ; app/sitemap.ts lit ce même
 * manifeste, donc il continue de l'annoncer à Google. Résultat : deux PDF
 * indexés pour une seule fiche, dont un périmé — exactement le précédent de
 * /photo-cours, une adresse au sitemap que le site ne sert plus.
 *
 * ⚠️ ON NE SUPPRIME RIEN AUTOMATIQUEMENT. Un fichier qu'aucune fiche ne réclame
 * peut aussi être un fichier dont la fiche a été renommée il y a une minute et
 * qu'on veut rediriger. On signale, la personne tranche.
 */
const attendus = new Set(
  fiches.filter((f) => f.pdf).map((f) => path.basename(f.pdf as string)),
);
const orphelins = fs.existsSync(PDF)
  ? fs.readdirSync(PDF).filter((n) => n.endsWith(".pdf") && !attendus.has(n))
  : [];

const total = fiches.filter((f) => !f.route.startsWith("/fiches-cours/ia/")).length;
console.log(`${total} fiches examinées (les fiches d'IA sont hors de ce contrôle).`);

if (nonCommite.length) {
  console.log(`\n⏳ ${nonCommite.length} fiche(s) modifiée(s) et pas encore commitée(s) —`);
  console.log("   la date de git ne peut rien en dire tant qu'elles ne le sont pas :");
  nonCommite.forEach((l) => console.log("   " + l));
}
if (sansPdf.length) {
  console.log(`\n❌ ${sansPdf.length} fiche(s) SANS PDF :`);
  sansPdf.forEach((l) => console.log("   " + l));
}
if (enRetard.length) {
  console.log(`\n⚠️  ${enRetard.length} PDF EN RETARD sur leur fiche :`);
  enRetard.forEach((l) => console.log("   " + l));
  console.log("\n   Pour les refaire — une seule fiche suffit, ce n'est pas la fournée :");
  console.log("   node --experimental-strip-types scripts/build-fiches-pdf.ts http://localhost:3000 <chemin>");
}
if (orphelins.length) {
  console.log(`\n🧹 ${orphelins.length} PDF ORPHELIN(S) — aucune fiche ne les réclame :`);
  orphelins.forEach((n) => console.log("   " + n));
  console.log("\n   Une fiche renommée ? Le fichier reste au sitemap tant qu'il est là.");
  console.log("   Supprimer, ou rediriger l'ancienne adresse dans next.config.js.");
}
if (!enRetard.length && !sansPdf.length && !nonCommite.length && !orphelins.length) {
  console.log("\n✅ tous les PDF sont à jour.");
}

if (strict && (enRetard.length || sansPdf.length || orphelins.length)) process.exit(1);
