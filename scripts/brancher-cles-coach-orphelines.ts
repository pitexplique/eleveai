// scripts/brancher-cles-coach-orphelines.ts
//
// BRANCHER AU COACH LES VIDÉOS QUI ONT DÉJÀ UNE DESTINATION ÉCRITE AU REGISTRE.
//
// Une clé de `videos-r2.json` peut porter un lien `coach` — la série d'entraînement
// de sa micro — sans qu'aucune ligne de `notion_ressources` ne la serve. La vidéo
// existe, elle répond 200, elle sait où elle va, et aucun élève ne la voit : c'est
// exactement le silence que l'audit du 27/11/2026 cherchait
// (voir `scripts/CONSTATS-COACH-SILENCIEUX.md`, section 5).
//
//   npx tsx scripts/brancher-cles-coach-orphelines.ts            → simulation, n'écrit RIEN
//   npx tsx scripts/brancher-cles-coach-orphelines.ts --ecrire    → insère (sur accord de Frédéric)
//   …                                                 --cles=a,b,c → n'agit QUE sur ces clés
//
// ⭐ `--cles=` est une GARDE DE PÉRIMÈTRE, pas un confort. Un accord porte sur une liste
//    nommée, jamais sur « tout ce que le script retient ce jour-là » : le registre bouge,
//    et une clé ajoutée entre l'accord et l'exécution serait écrite sans que personne
//    l'ait lue. Le script refuse de démarrer si une clé demandée n'est pas candidate.
//
// ⛔ PAR DÉFAUT IL N'ÉCRIT PAS. `--ecrire` est obligatoire, et c'est délibéré :
//    un script d'insertion sans garde a déjà failli créer 12 lignes en double.
//
// Les six gardes, dans l'ordre, et une clé refusée par l'une d'elles n'est jamais insérée :
//   1. ANTI-DOUBLON — aucune ligne de `notion_ressources` ne sert déjà cette vidéo
//      (par l'identifiant du registre, pas par la chaîne de l'URL : `/video/x`,
//      `/video/x?format=short` et un ancien ID YouTube désignent la MÊME vidéo) ;
//      et aucune ligne n'a déjà la même (matiere, classe, notion_id, micro_id, url).
//   2. HTTP — `/api/video-lecteur/<id>` ET `/video/<id>` répondent 200 en production.
//      C'est la leçon du 24/11 : douze boutons écrits avant le déploiement, 404 muet.
//   3. CATALOGUE — le `notion_id` existe, et le `micro_id` appartient à cette notion.
//      Un item mal rangé n'atteint jamais l'élève, et ça ne se voit nulle part.
//   4. MICRO MASQUÉE — une micro masquée n'est plus proposée par le coach : la ligne
//      ne s'afficherait jamais. Refusée, et signalée.
//   5. SHORT SEUL — un short qui serait la seule ressource de sa micro recrée le défaut
//      corrigé le 27/11 : l'élève reçoit un short là où il attend un cours. Refusé, sauf
//      si le paysage de la même micro est inséré dans la même passe.
//   6. REGISTRE DÉPLOYÉ — tout est lu sur `origin/main`, jamais sur la copie de travail :
//      une branche de travail n'est pas ce que Vercel sert.

import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { getNotionMicroMap, type Classe, type Matiere } from "../lib/tutor-v4/catalog";

const ECRIRE = process.argv.includes("--ecrire");
const CLES_DEMANDEES = (process.argv.find((a) => a.startsWith("--cles="))?.split("=")[1] ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const BASE = "https://www.eleveai.fr";
const REF = process.argv.find((a) => a.startsWith("--registre="))?.split("=")[1] ?? "origin/main";

type LigneR2 = { titre: string; short: boolean; youtube: string | null; coach?: string | null };
const lire = (chemin: string) =>
  JSON.parse(execFileSync("git", ["show", `${REF}:${chemin}`], { maxBuffer: 1 << 30 }).toString());
const R2: Record<string, LigneR2> = lire("lib/videos/videos-r2.json");
const ANCIENS: Record<string, string> = lire("lib/videos/anciens-youtube.json");
const PAR_YOUTUBE = new Map<string, string>();
for (const [id, v] of Object.entries(R2)) if (v.youtube) PAR_YOUTUBE.set(v.youtube, id);
/** La même résolution que `trouverVideo` de lib/videos/r2.ts : clé, ID YouTube, ancien ID. */
const resoudre = (cle: string): string | null => (R2[cle] ? cle : PAR_YOUTUBE.get(cle) ?? ANCIENS[cle] ?? null);
const idDeUrl = (u: string) => u.replace(/^https?:\/\/[^/]+/, "").match(/\/video\/([^/?#]+)/)?.[1] ?? null;

type Candidate = {
  id: string;
  short: boolean;
  titre: string;
  matiere: string;
  classe: string;
  notion: string;
  micro: string;
  url: string;
  refus: string[];
};

async function appeler(url: string): Promise<number> {
  try {
    const r = await fetch(url, { redirect: "manual", headers: { "user-agent": "eleveai-brancher-coach" } });
    await r.arrayBuffer().catch(() => undefined);
    return r.status;
  } catch {
    return 0;
  }
}

async function main() {
  const env = fs.readFileSync(".env.local", "utf8");
  const get = (k: string) => {
    const m = env.match(new RegExp("^" + k + "=(.*)$", "m"));
    if (!m) throw new Error(`.env.local : ${k} manquant`);
    return m[1].trim().replace(/^["']|["']$/g, "");
  };
  const sb = createClient(get("NEXT_PUBLIC_SUPABASE_URL"), get("SUPABASE_SERVICE_ROLE_KEY"));

  // ── L'état de la base, lu en entier (Supabase rend 1 000 lignes au plus). ──
  type Row = { matiere: string; classe: string; notion_id: string; micro_id: string | null; url: string };
  const rows: Row[] = [];
  for (let de = 0; ; de += 1000) {
    const { data, error } = await sb
      .from("notion_ressources")
      .select("matiere,classe,notion_id,micro_id,url")
      .eq("type", "video")
      .order("id")
      .range(de, de + 999);
    if (error) throw error;
    rows.push(...(data as Row[]));
    if (!data || data.length < 1000) break;
  }
  const videosServies = new Set<string>();
  const lignesExistantes = new Set<string>();
  const microsPourvues = new Set<string>();
  const notionsPourvues = new Set<string>();
  for (const r of rows) {
    const id = idDeUrl(r.url);
    const v = id ? resoudre(decodeURIComponent(id)) : null;
    if (v) videosServies.add(v);
    lignesExistantes.add([r.matiere, r.classe, r.notion_id, (r.micro_id ?? "").trim(), r.url].join("|"));
    const m = (r.micro_id ?? "").trim();
    if (m) microsPourvues.add(`${r.matiere}/${r.classe}/${r.notion_id}/${m}`);
    else notionsPourvues.add(`${r.matiere}/${r.classe}/${r.notion_id}`);
  }

  // ── Les candidates : une clé avec lien coach que personne ne sert. ──
  const candidates: Candidate[] = [];
  for (const [id, v] of Object.entries(R2)) {
    if (!v.coach || videosServies.has(id)) continue;
    const q = new URLSearchParams(v.coach.split("?")[1]);
    const classe = q.get("classe") ?? "";
    const matiere = q.get("matiere") ?? "maths";
    const notion = q.get("notion") ?? "";
    const micro = q.get("microId") ?? "";
    candidates.push({
      id,
      short: v.short,
      titre: v.titre,
      matiere,
      classe,
      notion,
      micro,
      url: `${BASE}/video/${id}${v.short ? "?format=short" : ""}`,
      refus: [],
    });
  }
  console.log(`Clés du registre (${REF}) avec lien coach et sans ligne de coach : ${candidates.length}`);

  // ── Garde de périmètre : on n'agit que sur les clés nommées dans l'accord. ──
  let perimetre = candidates;
  if (CLES_DEMANDEES.length) {
    const connues = new Set(candidates.map((c) => c.id));
    const introuvables = CLES_DEMANDEES.filter((k) => !connues.has(k));
    if (introuvables.length) {
      console.error(
        `\n⛔ ARRÊT : ${introuvables.length} clé(s) demandée(s) ne sont pas candidates — ` +
          `soit elles sont déjà servies, soit elles n'ont pas de lien coach au registre :\n   ${introuvables.join("\n   ")}`
      );
      process.exit(1);
    }
    perimetre = candidates.filter((c) => CLES_DEMANDEES.includes(c.id));
    console.log(`Périmètre de l'accord : ${perimetre.length} clé(s) nommée(s) sur ${candidates.length}.`);
  }
  candidates.length = 0;
  candidates.push(...perimetre);

  // ── Gardes 3 et 4 : catalogue, et micro masquée. ──
  const cache = new Map<string, { tout: Record<string, string[]>; vis: Record<string, string[]> }>();
  const catalogue = (c: string, m: string) => {
    const k = `${c}|${m}`;
    if (!cache.has(k)) {
      try {
        cache.set(k, {
          tout: getNotionMicroMap(c as Classe, m as Matiere, { tout: true }),
          vis: getNotionMicroMap(c as Classe, m as Matiere),
        });
      } catch {
        cache.set(k, { tout: {}, vis: {} });
      }
    }
    return cache.get(k)!;
  };
  for (const c of candidates) {
    const { tout, vis } = catalogue(c.classe, c.matiere);
    if (!(c.notion in tout)) c.refus.push("notion absente du catalogue");
    else if (c.micro && !tout[c.notion].includes(c.micro)) c.refus.push("micro absente de sa notion");
    else if (c.micro && !(vis[c.notion] ?? []).includes(c.micro)) c.refus.push("micro MASQUÉE : la ligne ne s'afficherait jamais");
    // Garde 1 bis : la ligne exacte existe déjà.
    if (lignesExistantes.has([c.matiere, c.classe, c.notion, c.micro, c.url].join("|")))
      c.refus.push("ligne identique déjà en base");
  }

  // ── Garde 5 : un short ne doit jamais rester seul sur une micro. ──
  const paysagesDeLaPasse = new Set(
    candidates.filter((c) => !c.short && c.micro && !c.refus.length).map((c) => `${c.matiere}/${c.classe}/${c.notion}/${c.micro}`)
  );
  for (const c of candidates) {
    if (!c.short || !c.micro || c.refus.length) continue;
    const cle = `${c.matiere}/${c.classe}/${c.notion}/${c.micro}`;
    if (!microsPourvues.has(cle) && !paysagesDeLaPasse.has(cle))
      c.refus.push("short seul sur sa micro (aucun paysage, ni en base ni dans cette passe)");
  }

  // ── Garde 2 : la production répond 200 sur les DEUX adresses. ──
  const aTester = candidates.filter((c) => !c.refus.length);
  let i = 0;
  const ouvriere = async () => {
    for (;;) {
      const k = i++;
      if (k >= aTester.length) return;
      const c = aTester[k];
      const api = await appeler(`${BASE}/api/video-lecteur/${encodeURIComponent(c.id)}`);
      const page = await appeler(`${BASE}/video/${encodeURIComponent(c.id)}`);
      if (api !== 200 || page !== 200) c.refus.push(`HTTP api=${api} page=${page}`);
    }
  };
  await Promise.all(Array.from({ length: 4 }, ouvriere));

  // ── Le verdict. ──
  const retenues = candidates.filter((c) => !c.refus.length);
  const refusees = candidates.filter((c) => c.refus.length);
  const gagnantes = retenues.filter((c) =>
    c.micro
      ? !microsPourvues.has(`${c.matiere}/${c.classe}/${c.notion}/${c.micro}`)
      : !notionsPourvues.has(`${c.matiere}/${c.classe}/${c.notion}`)
  );
  const microsGagnees = new Set(gagnantes.map((c) => `${c.classe}/${c.notion}/${c.micro || "(notion)"}`));

  const parClasse: Record<string, { total: number; shorts: number }> = {};
  for (const c of retenues) {
    const e = (parClasse[c.classe] ??= { total: 0, shorts: 0 });
    e.total++;
    if (c.short) e.shorts++;
  }
  console.log(`\nRetenues : ${retenues.length}  |  refusées : ${refusees.length}`);
  console.log(`Shorts : ${retenues.filter((c) => c.short).length}  |  paysages : ${retenues.filter((c) => !c.short).length}`);
  console.log(`Lignes qui apportent une PREMIÈRE vidéo à leur micro/notion : ${gagnantes.length} (${microsGagnees.size} micros)`);
  console.log("Par classe :", Object.entries(parClasse).map(([c, e]) => `${c} ${e.total} (dont ${e.shorts} shorts)`).join(" · "));
  if (refusees.length) {
    console.log("\nRefusées :");
    for (const c of refusees) console.log(`  ${c.id} — ${c.refus.join(" ; ")}`);
  }
  console.log("\nDétail des retenues :");
  for (const c of retenues.sort((a, b) => a.classe.localeCompare(b.classe) || a.id.localeCompare(b.id)))
    console.log(
      `  [${c.classe}] ${c.short ? "short  " : "paysage"} ${c.notion}/${c.micro || "(notion)"}  ←  ${c.id}  « ${c.titre.slice(0, 50)} »`
    );

  if (!ECRIRE) {
    console.log(`\n⚠️ SIMULATION : rien n'a été écrit. Relancer avec --ecrire, et seulement sur l'accord de Frédéric.`);
    return;
  }

  // ── Le compte AVANT, sur l'état réel de la table (jamais un souvenir). ──
  const compte = async () => {
    const { count } = await sb.from("notion_ressources").select("*", { count: "exact", head: true });
    return count ?? -1;
  };
  const avant = await compte();
  console.log(`\nLignes de notion_ressources AVANT : ${avant}`);

  // ── L'écriture, une ligne à la fois, avec une dernière relecture anti-doublon. ──
  let faites = 0;
  const inserees: { id: string; ligne: string }[] = [];
  for (const c of retenues) {
    const { data: deja } = await sb
      .from("notion_ressources")
      .select("id")
      .eq("matiere", c.matiere)
      .eq("classe", c.classe)
      .eq("notion_id", c.notion)
      .eq("url", c.url)
      .limit(1);
    if (deja && deja.length) {
      console.log(`  ~ déjà là, passée : ${c.id}`);
      continue;
    }
    const { data: cree, error } = await sb
      .from("notion_ressources")
      .insert({
        matiere: c.matiere,
        classe: c.classe,
        notion_id: c.notion,
        type: "video",
        url: c.url,
        titre: c.titre,
        micro_id: c.micro,
      })
      .select("id");
    if (error) console.log(`  ✗ ${c.id} : ${error.message}`);
    else {
      faites++;
      inserees.push({ id: c.id, ligne: cree?.[0]?.id ?? "?" });
      console.log(`  ✓ ${c.id}  (ligne ${cree?.[0]?.id ?? "?"})`);
    }
  }

  // ── Le recompte SUR L'ÉTAT FINAL, jamais sur le delta. ──
  const apres = await compte();
  console.log(`\nLignes de notion_ressources APRÈS : ${apres}   (avant : ${avant})`);
  console.log(`Insertions réussies : ${faites} / ${retenues.length}`);

  // Les micros de chaque classe touchée qui ont désormais un PAYSAGE, recomptés en entier.
  const classesTouchees = [...new Set(retenues.map((c) => c.classe))];
  const final: Row[] = [];
  for (let de = 0; ; de += 1000) {
    const { data, error } = await sb
      .from("notion_ressources")
      .select("matiere,classe,notion_id,micro_id,url")
      .eq("type", "video")
      .order("id")
      .range(de, de + 999);
    if (error) throw error;
    final.push(...(data as Row[]));
    if (!data || data.length < 1000) break;
  }
  for (const cl of classesTouchees) {
    const avecPaysage = new Set<string>();
    const servis = new Set<string>();
    for (const r of final.filter((r) => r.classe === cl)) {
      const m = (r.micro_id ?? "").trim();
      if (!m) continue;
      servis.add(`${r.notion_id}/${m}`);
      const id = idDeUrl(r.url);
      const v = id ? resoudre(decodeURIComponent(id)) : null;
      if (v && !R2[v].short) avecPaysage.add(`${r.notion_id}/${m}`);
    }
    console.log(`  ${cl} : ${avecPaysage.size} micros ont un paysage, sur ${servis.size} micros servies (état final)`);
  }

  // Dernier appel des URL écrites : le bouton doit répondre 200 aujourd'hui.
  console.log(`\nDernier appel des ${inserees.length} vidéo(s) écrite(s) :`);
  for (const x of inserees) {
    const api = await appeler(`${BASE}/api/video-lecteur/${encodeURIComponent(x.id)}`);
    const page = await appeler(`${BASE}/video/${encodeURIComponent(x.id)}`);
    console.log(`  ${api === 200 && page === 200 ? "✓" : "✗"} ${x.id}  api=${api} page=${page}`);
  }

  if (inserees.length) {
    console.log(`\nPour défaire, si besoin — les ${inserees.length} identifiants de ligne créés :`);
    console.log(`  ${inserees.map((x) => x.ligne).join(", ")}`);
  }
  console.log(`\nRecompter tout sur l'état final :`);
  console.log(`  npx tsx scripts/verifier-coach-silencieux.ts --sortie=scripts/RAPPORT-COACH-SILENCIEUX.md`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
