#!/usr/bin/env node
// Génère des codes d'abonnement pour les contreparties Ulule (08/11/2026).
//
//   node scripts/codes-ulule.mjs --nombre 40 --duree 1 --type famille
//   node scripts/codes-ulule.mjs --nombre 10 --duree 12 --type cadeau --lot ulule-cadeau-1an
//   node scripts/codes-ulule.mjs --nombre 1 --duree 12 --type classe --eleves 28
//   … --inserer   écrit aussi les codes dans Supabase (table codes_abonnement)
//
// Sortie dans docs/codes-ulule/ (ignoré par git : les codes ne quittent pas ce poste) :
//   <lot>.csv  pour l'envoi aux contributeurs (publipostage Ulule ou courriel)
//   <lot>.sql  les mêmes codes à coller dans l'éditeur SQL de Supabase
//
// Un code : MARGO-7KQ4-X2PD. Ni 0 ni O, ni 1 ni I ni L : rien à confondre en le recopiant.
// ⚠️ Même alphabet que lib/codes-abonnement.ts et que le contrôle de supabase/codes_abonnement.sql.
import { randomInt } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
const DUREES = [1, 2, 6, 12];
const TYPES = ["famille", "cadeau", "classe"];
const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");

function lireOptions(argv) {
  const o = { nombre: 0, duree: 0, type: "famille", eleves: null, lot: "", inserer: false, origine: "ulule" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const suivant = () => argv[++i];
    if (a === "--nombre") o.nombre = Number(suivant());
    else if (a === "--duree") o.duree = Number(suivant());
    else if (a === "--type") o.type = suivant();
    else if (a === "--eleves") o.eleves = Number(suivant());
    else if (a === "--lot") o.lot = suivant();
    else if (a === "--origine") o.origine = suivant();
    else if (a === "--inserer") o.inserer = true;
    else if (a === "--aide" || a === "-h") o.aide = true;
    else throw new Error(`Option inconnue : ${a}`);
  }
  return o;
}

function verifier(o) {
  const fautes = [];
  if (!Number.isInteger(o.nombre) || o.nombre < 1 || o.nombre > 5000) fautes.push("--nombre entre 1 et 5000");
  if (!DUREES.includes(o.duree)) fautes.push(`--duree parmi ${DUREES.join(", ")} (mois)`);
  if (!TYPES.includes(o.type)) fautes.push(`--type parmi ${TYPES.join(", ")}`);
  if (o.type === "classe" && !(Number.isInteger(o.eleves) && o.eleves > 0)) fautes.push("--eleves N pour une classe");
  if (o.type !== "classe" && o.eleves !== null) fautes.push("--eleves seulement avec --type classe");
  if (o.lot && !/^[a-z0-9-]+$/.test(o.lot)) fautes.push("--lot en minuscules, chiffres et tirets");
  if (fautes.length) throw new Error(fautes.join("\n"));
}

const bloc = () => Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
export const nouveauCode = () => `MARGO-${bloc()}-${bloc()}`;

const libelleDuree = (m) => (m === 12 ? "1 an" : `${m} mois`);
function libelle(o) {
  if (o.type === "classe") return `Licence classe, ${o.eleves} élèves, ${libelleDuree(o.duree)}`;
  if (o.type === "cadeau") return `${libelleDuree(o.duree)} offert${o.duree === 12 ? "" : "s"}, suivi famille`;
  return `Suivi famille, ${libelleDuree(o.duree)}`;
}

const csv = (v) => (/[",;\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));

function lireEnv() {
  const f = join(RACINE, ".env.local");
  const env = { ...process.env };
  if (existsSync(f)) {
    for (const ligne of readFileSync(f, "utf8").split(/\r?\n/)) {
      const m = ligne.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !env[m[1]]) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
  return env;
}

async function inserer(lignes) {
  const env = lireEnv();
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const cle = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !cle) throw new Error("NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY manquent (.env.local).");
  const r = await fetch(`${url}/rest/v1/codes_abonnement`, {
    method: "POST",
    headers: {
      apikey: cle,
      Authorization: `Bearer ${cle}`,
      "Content-Type": "application/json",
      // Un doublon (une chance sur un billion) fait échouer tout le lot : on relance, rien n'est écrit.
      Prefer: "return=minimal",
    },
    body: JSON.stringify(lignes),
  });
  if (!r.ok) throw new Error(`Supabase a refusé (${r.status}) : ${await r.text()}`);
}

async function main() {
  const o = lireOptions(process.argv.slice(2));
  if (o.aide) {
    console.log(readFileSync(fileURLToPath(import.meta.url), "utf8").split("\n").slice(1, 13).join("\n"));
    return;
  }
  verifier(o);

  const horodatage = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, "");
  const lot = o.lot || `${o.origine}-${o.type}-${o.duree}m-${horodatage}`;
  const dossier = join(RACINE, "docs", "codes-ulule");
  mkdirSync(dossier, { recursive: true });
  const fichierCsv = join(dossier, `${lot}.csv`);
  if (existsSync(fichierCsv)) throw new Error(`Le lot ${lot} existe déjà : choisissez un autre --lot.`);

  const codes = new Set();
  while (codes.size < o.nombre) codes.add(nouveauCode());

  const lignes = [...codes].map((code) => ({
    code,
    duree_mois: o.duree,
    type: o.type,
    nb_eleves: o.type === "classe" ? o.eleves : null,
    origine: o.origine,
    lot,
  }));

  const texte = libelle(o);
  const enTete = ["code", "duree_mois", "type", "nb_eleves", "contrepartie", "lien"];
  const corps = lignes.map((l) =>
    [l.code, l.duree_mois, l.type, l.nb_eleves ?? "", texte, `https://eleveai.fr/code?c=${l.code}`].map(csv).join(","),
  );
  // BOM : Excel ouvre le fichier en UTF-8, les accents restent lisibles.
  writeFileSync(fichierCsv, "﻿" + [enTete.join(","), ...corps].join("\r\n") + "\r\n", "utf8");

  const sql =
    `-- ${lignes.length} codes, lot ${lot} (${texte}).\n` +
    "insert into public.codes_abonnement (code, duree_mois, type, nb_eleves, origine, lot) values\n" +
    lignes
      .map((l) => `  ('${l.code}', ${l.duree_mois}, '${l.type}', ${l.nb_eleves ?? "null"}, '${l.origine}', '${l.lot}')`)
      .join(",\n") +
    ";\n";
  writeFileSync(join(dossier, `${lot}.sql`), sql, "utf8");

  if (o.inserer) await inserer(lignes);

  console.log(`${lignes.length} code${lignes.length > 1 ? "s" : ""} « ${texte} », lot ${lot}`);
  console.log(`  ${fichierCsv}`);
  console.log(`  ${join(dossier, `${lot}.sql`)}${o.inserer ? "  (déjà inséré dans Supabase)" : "  (à coller dans Supabase)"}`);
  console.log(`  exemple : ${lignes[0].code}`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
