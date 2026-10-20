// BRANCHER LES VIDÉOS PUBLIÉES AU COACH — un seul outil, à la place des
// dizaines de .tmp-ressource-*.mjs écrits à la main (19/10/2026).
//
// La source est `manim/manifeste-youtube.json` : chaque vidéo qui a une `url`
// (publiée sur YouTube) et une `notionId` devient une ligne `notion_ressources`.
//   · short             → sur SA micro (microId obligatoire), case verticale du coach
//   · longue + microId  → sur la micro, bouton « ▶ Vidéo »
//   · longue sans micro → sur la notion (micro_id vide) : badge, fiche, QR imprimé
//
// La classe se lit dans `classe`, sinon dans le premier dossier de `fichier`
// (« premiere » → premiere ou premiere-spe), sinon dans la seule classe du
// coach qui connaît la notion. Notion et micro sont VÉRIFIÉES dans
// lib/tutor-v4/knowledge/maths/<classe>/ : un identifiant mal tapé ne part pas.
//
// Garde-fous : on compare les ID YouTube (youtu.be = youtube.com/shorts) ; une
// micro qui a déjà une AUTRE vidéo du même genre n'est pas touchée (le coach
// n'en montre qu'une) ; sans --ecrire, rien n'est écrit.
//
//   node scripts/brancher-videos-coach.mjs                 → ce qui manque (lecture)
//   node scripts/brancher-videos-coach.mjs --ecrire        → l'écrit en PRODUCTION
//   options : --classe 4e   --notion pythagore_theoreme   --id fr-carre,fr-cube   --tout
//             --manifeste chemin.json (un autre manifeste, pour essayer)
//   (--tout affiche aussi les vidéos déjà branchées)

import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

for (const ligne of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = ligne.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

const args = process.argv.slice(2);
const option = (nom) => {
  const i = args.indexOf(nom);
  return i >= 0 ? args[i + 1] : null;
};
const ECRIRE = args.includes("--ecrire");
// --remplacer : une micro occupée par la vidéo YouTube d'une AUTRE classe (ex. la
// 4e sur la micro de 6e) reçoit la vidéo R2 faite pour SA classe, à sa ceinture.
const REMPLACER = args.includes("--remplacer");
const TOUT = args.includes("--tout");
const F_CLASSE = option("--classe");
const F_NOTION = option("--notion");
const F_IDS = option("--id")?.split(",");

// ── Le coach : identifiants connus par classe ────────────────────────────────
const RACINE = "lib/tutor-v4/knowledge/maths";
const CLASSES = readdirSync(RACINE, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);
const texteClasse = {};
const connait = (classe, id) => {
  if (!CLASSES.includes(classe)) return false;
  texteClasse[classe] ??= readdirSync(join(RACINE, classe))
    .filter((f) => /\.(ts|json)$/.test(f))
    .map((f) => readFileSync(join(RACINE, classe, f), "utf8"))
    .join("\n");
  return new RegExp(`["'\`]${id}["'\`]`).test(texteClasse[classe]);
};

function classeDe(v) {
  if (v.classe) return v.classe;
  const dossier = v.fichier.split("/")[0];
  const candidates = CLASSES.filter((c) => c === dossier || c.startsWith(dossier + "-"));
  const pool = candidates.length ? candidates : CLASSES;
  const ok = pool.filter((c) => connait(c, v.notionId));
  return ok.length === 1 ? ok[0] : null;
}

const idYoutube = (url) =>
  url?.match(/(?:youtu\.be\/|shorts\/|[?&]v=|embed\/)([\w-]{11})/)?.[1] ?? url;
const estShort = (url) => /\/shorts\/|[?&]format=short\b/.test(url ?? "");


// ── La base d'abord : ce qui est déjà branché, par ID YouTube ────────────────
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const { data: existant, error } = await db
  .from("notion_ressources")
  .select("classe, notion_id, micro_id, url")
  .eq("matiere", "maths")
  .eq("type", "video");
if (error) throw error;

const cle = (r) => `${r.classe}|${r.notion_id}|${r.micro_id ?? ""}`;
const parPlace = new Map();
const parId = new Map();
for (const r of existant) {
  if (!parPlace.has(cle(r))) parPlace.set(cle(r), []);
  parPlace.get(cle(r)).push(r.url);
  if (!parId.has(idYoutube(r.url))) parId.set(idYoutube(r.url), []);
  parId.get(idYoutube(r.url)).push(r);
}

// ── Le manifeste ─────────────────────────────────────────────────────────────
const manifeste = JSON.parse(readFileSync(option("--manifeste") ?? "manim/manifeste-youtube.json", "utf8"));
// Une micro commune à deux classes (STMG / 1re…) n'est publiée qu'UNE fois :
// l'entrée jumelle porte `meme_video_que` et reprend l'URL de l'autre.
const parIdManifeste = new Map(manifeste.videos.map((v) => [v.id, v]));
// ⛔ 20/10/2026 — Frédéric : « dans le coach les vidéos R2 doivent apparaître et
// remplacer les vidéos YouTube, car mes élèves sont dispersés avec YouTube ;
// YouTube ne sert qu'à la pub ». Une vidéo PAS publiée mais présente sur R2
// (lib/videos/videos-r2.json) est branchée sur le lecteur du site, sous son id
// du manifeste ; un short porte ?format=short (la case verticale du coach).
// Une jumelle (meme_video_que) a son PROPRE rendu, à sa ceinture : on prend
// le sien sur R2 avant l'URL YouTube de l'autre classe.
const R2 = JSON.parse(readFileSync("lib/videos/videos-r2.json", "utf8"));
// ID YouTube → dossier de classe de la vidéo (premier segment de son fichier).
const classeYoutube = new Map(Object.values(R2).filter((x) => x.youtube).map((x) => [x.youtube, x.fichier.split("/")[0]]));
for (const v of manifeste.videos) {
  if (!v.url && R2[v.id]) {
    v.url = `https://www.eleveai.fr/video/${v.id}${v.type === "short" ? "?format=short" : ""}`;
    v._r2 = true;
  }
  if (!v.url && v.meme_video_que) v.url = parIdManifeste.get(v.meme_video_que)?.url;
}
// ⭐ 20/10 : `aussi` = la même vidéo branchée sur d'AUTRES micros (même classe ou
// non), sans nouvelle entrée ni nouveau fichier : [{ classe, notionId, microId }].
// Ex. la paysage « tableau croisé » de 1re sert aussi la micro d'automatisme
// « lire une probabilité conditionnelle dans un tableau ».
for (const v of [...manifeste.videos]) {
  for (const a of v.aussi ?? []) {
    manifeste.videos.push({ ...v, ...a, id: `${v.id}@${a.microId}`, aussi: undefined, _alias: true });
  }
}

const deja = [], ecartees = [], occupees = [], nouvelles = [];
for (const v of manifeste.videos) {
  if (!v.url || !v.notionId) continue;
  if (F_IDS && !F_IDS.includes(v.id)) continue;
  if (F_NOTION && v.notionId !== F_NOTION) continue;
  const short = v.type === "short" || estShort(v.url);

  // Déjà en base POUR SA CLASSE (y compris les shorts branchés à la main dont
  // le manifeste n'a pas retenu la micro) : on n'y touche pas. Par classe, car
  // une vidéo commune (STMG / 1re) a une ligne dans chacune ; classe inconnue :
  // n'importe quelle ligne suffit.
  const classe = classeDe(v);
  const lignes = parId.get(idYoutube(v.url)) ?? [];
  const enPlace = (classe ? lignes.filter((r) => r.classe === classe) : lignes)
    .filter((r) => !v._alias || r.micro_id === (v.microId || ""));
  if (enPlace.length) {
    if (!F_CLASSE || enPlace.some((r) => r.classe === F_CLASSE)) deja.push({ v, short, enPlace });
    continue;
  }

  if (F_CLASSE && classe !== F_CLASSE) continue;
  const raison =
    !classe ? "classe introuvable (ajouter « classe » au manifeste)"
    : !connait(classe, v.notionId) ? `notion « ${v.notionId} » inconnue du coach ${classe}`
    : short && !v.microId ? "short sans microId (un short va sur SA micro)"
    : v.microId && !connait(classe, v.microId) ? `micro « ${v.microId} » inconnue du coach ${classe}`
    : null;
  if (raison) { ecartees.push({ v, raison }); continue; }

  const ligne = {
    matiere: "maths", type: "video", classe,
    notion_id: v.notionId, micro_id: v.microId || "",
    url: v.url, titre: v.titre,
  };
  // Une vidéo R2 seule ne s'ajoute pas non plus à une NOTION qui a déjà sa
  // vidéo du même genre (sinon doublon dans l'en-tête et sur la fiche).
  const rivale = (ligne.micro_id || v._r2) && (parPlace.get(cle(ligne)) ?? []).find((u) => estShort(u) === short);
  if (rivale) {
    const autre = classeYoutube.get(idYoutube(rivale));
    const remplacable = v._r2 && autre && autre !== (v.fichier ?? "").split("/")[0];
    occupees.push({ v, short, ligne, rivale, remplacable, autre });
    continue;
  }
  nouvelles.push({ v, short, ligne });
}

// ── Le compte rendu ──────────────────────────────────────────────────────────
const place = (l) => `${l.classe.padEnd(13)} ${l.micro_id ? "micro " + l.micro_id : "NOTION " + l.notion_id}`;
const genre = (b) => (b.short ? "short " : "paysage");

async function rendreCompte() {
  console.log(`\n${deja.length} vidéos publiées déjà branchées · ${nouvelles.length} à brancher`);

  if (TOUT && deja.length) {
    console.log("\n= déjà branchées");
    for (const b of deja) console.log(`  ${genre(b)}  ${b.enPlace.map(place).join(" + ")}  ${b.v.id}`);
  }
  if (occupees.length) {
    console.log("\n⚠ micro déjà occupée par une autre vidéo du même genre (le coach n'en montre qu'une) — non touchée :");
    for (const b of occupees) console.log(`  ${b.remplacable ? "↻" : " "} ${genre(b)}  ${place(b.ligne)}  ${b.v.id}  (en place : ${b.rivale}${b.autre ? ", vidéo " + b.autre : ""})`);
    const aRemplacer = occupees.filter((b) => b.remplacable);
    if (aRemplacer.length) console.log(`  ↻ = vidéo d'une autre classe, remplaçable par la vidéo R2 de la classe (${aRemplacer.length}) : --remplacer`);
    if (REMPLACER && ECRIRE) {
      for (const b of aRemplacer) {
        const { error: e } = await db.from("notion_ressources")
          .update({ url: b.ligne.url, titre: b.ligne.titre })
          .eq("matiere", "maths").eq("type", "video").eq("classe", b.ligne.classe)
          .eq("notion_id", b.ligne.notion_id).eq("micro_id", b.ligne.micro_id).eq("url", b.rivale);
        if (e) throw e;
      }
      console.log(`  ✓ ${aRemplacer.length} remplacées.`);
    }
  }
  if (ecartees.length) {
    console.log("\n✗ écartées :");
    for (const { v, raison } of ecartees) console.log(`  ${v.id.padEnd(34)} ${raison}`);
  }
  if (!nouvelles.length) { console.log("\nRien à brancher."); return; }

  console.log(`\n${ECRIRE ? "+" : "?"} à brancher :`);
  for (const b of nouvelles) console.log(`  ${genre(b)}  ${place(b.ligne)}  ${b.v.id}  ${b.v.url}`);

  if (!ECRIRE) {
    console.log("\n(lecture seule : relancer avec --ecrire pour brancher en production)");
    return;
  }
  const { data, error: eEcriture } = await db
    .from("notion_ressources")
    .insert(nouvelles.map((b) => b.ligne))
    .select("id");
  if (eEcriture) throw eEcriture;
  console.log(`\n✓ ${data.length} vidéos branchées au coach.`);
}

// Pas de process.exit() : sous Windows, il coupe le client Supabase en plein
// vol et Node finit sur une assertion (code 9).
await rendreCompte();
