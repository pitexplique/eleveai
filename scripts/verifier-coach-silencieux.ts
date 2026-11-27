// scripts/verifier-coach-silencieux.ts
//
// CE QUI TOMBE EN SILENCE ENTRE UNE LIGNE DE REGISTRE ET CE QUE L'ÉLÈVE VOIT.
//
// Une vidéo mal branchée n'atteint aucun élève, et ça ne se voit nulle part :
// le coach n'affiche aucune erreur, le modal dit seulement « pas encore sur le
// site », et le registre ne s'en plaint pas. Ce vérificateur APPELLE les URL,
// il ne les déduit pas de la base.
//
//   npx tsx scripts/verifier-coach-silencieux.ts
//   npx tsx scripts/verifier-coach-silencieux.ts --sans-reseau     (sections 2→6 seulement)
//   npx tsx scripts/verifier-coach-silencieux.ts --sortie=scripts/RAPPORT-COACH-SILENCIEUX.md
//   npx tsx scripts/verifier-coach-silencieux.ts --base=http://localhost:3000
//   npx tsx scripts/verifier-coach-silencieux.ts --concurrence=4   (défaut : 4, c'est la prod)
//
// ⛔ LECTURE SEULE. Aucune écriture dans `notion_ressources`, aucune dans
//    `lib/videos/videos-r2.json`. Les secrets restent dans `.env.local`.
//
// Les six mesures :
//   1. Boutons morts  — chaque URL distincte est appelée ; on compte les non-200.
//      Deux adresses par vidéo, parce que l'élève en touche DEUX :
//        · /api/video-lecteur/<id>  ← ce que le modal du coach demande vraiment
//        · /video/<id>              ← ce qu'ouvre un Ctrl+clic ou un QR code
//      Un 404 de l'API n'est pas visible : le modal affiche « pas encore sur le
//      site » et propose d'ouvrir le lien à part. C'est un bouton mort muet.
//   2. Hôtes — aucune ligne ne doit servir YouTube. On lit l'HÔTE de l'URL, jamais
//      le nom de la clé (`youtube-Y3gFecuyBTQ` est une clé R2, pas un lien YouTube),
//      et on lit aussi l'hôte d'ARRIVÉE : /video/<11 caractères> inconnu du registre
//      redirige vers youtube.com (app/video/[id]/page.tsx).
//   3. Micros fantômes — une ligne qui pointe un notion_id/micro_id disparu du
//      catalogue de code ne s'affiche nulle part. Les micros MASQUÉES sont comptées
//      à part : elles existent, mais le coach ne les propose plus.
//   4. Short servi là où l'élève attend un cours. ⚠️ Le format n'est PAS décidé par
//      l'URL : `app/video/[id]/page.tsx` et le modal lisent le champ `short` de
//      `videos-r2.json`. `?format=short` n'est lu par AUCUNE page ; il ne sert qu'à
//      `estShortVideo()` (lib/videos/lienVideo.ts), qui choisit quelle vidéo montrer.
//      On mesure donc les trois formes et leurs désaccords.
//   5. Les deux registres d'accord — clé R2 avec lien coach mais sans ligne de coach,
//      et ligne de coach sans clé au registre.
//   6. Replis muets — relevé statique des `default:` et `catch` qui servent autre
//      chose que ce qui est demandé au lieu d'échouer visiblement.

import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { getNotionMicroMap, getNotionOptions, type Classe, type Matiere } from "../lib/tutor-v4/catalog";
import { loadKnowledgeV4 } from "../lib/tutor-v4/loaders/loadKnowledgeV4";

// ─── Options ────────────────────────────────────────────────────────────────
const arg = (nom: string, defaut: string) =>
  process.argv.find((a) => a.startsWith(`--${nom}=`))?.split("=").slice(1).join("=") ?? defaut;
const SANS_RESEAU = process.argv.includes("--sans-reseau");
const BASE = arg("base", "https://www.eleveai.fr").replace(/\/$/, "");
const CONCURRENCE = Math.max(1, Math.min(8, Number(arg("concurrence", "4")) || 4));
const SORTIE = arg("sortie", "");

// ─── Sorties ────────────────────────────────────────────────────────────────
const lignes: string[] = [];
const dire = (s = "") => {
  console.log(s);
  lignes.push(s);
};
const titre = (s: string) => {
  dire("");
  dire(`## ${s}`);
  dire("");
};

// ─── Le registre R2, lu comme le serveur le lit ─────────────────────────────
type LigneR2 = {
  fichier: string;
  poster: string | null;
  vignette: string | null;
  titre: string;
  short: boolean;
  youtube: string | null;
  coach?: string | null;
};
// ⚠️ LA COPIE DE TRAVAIL N'EST PAS CE QUI EST EN LIGNE. Une branche de travail
// peut être en retard sur `origin/main`, qui est ce que Vercel sert : comparer les
// deux registres sur le fichier local fabrique des « clés manquantes » imaginaires.
// `--registre=origin/main` lit le registre DÉPLOYÉ (par `git show`), et c'est le
// défaut : le fichier local se demande avec `--registre=travail`.
const REGISTRE = arg("registre", "origin/main");
const lireRegistre = (chemin: string): string =>
  REGISTRE === "travail"
    ? fs.readFileSync(chemin, "utf8")
    : execFileSync("git", ["show", `${REGISTRE}:${chemin}`], { maxBuffer: 1 << 30 }).toString();

const R2: Record<string, LigneR2> = JSON.parse(lireRegistre("lib/videos/videos-r2.json"));
const ANCIENS: Record<string, string> = JSON.parse(lireRegistre("lib/videos/anciens-youtube.json"));
const PAR_YOUTUBE = new Map<string, string>();
for (const [id, v] of Object.entries(R2)) if (v.youtube) PAR_YOUTUBE.set(v.youtube, id);

/** La même résolution que `trouverVideo` de lib/videos/r2.ts. */
function trouver(cle: string): (LigneR2 & { id: string }) | null {
  const id = R2[cle] ? cle : PAR_YOUTUBE.get(cle) ?? ANCIENS[cle];
  return id && R2[id] ? { id, ...R2[id] } : null;
}

const ID_YOUTUBE = /^[\w-]{11}$/;

/** L'identifiant que le modal du coach extrait du lien (components/LienVideoModal.tsx). */
function idDeUrl(url: string): string | null {
  const lien = url.replace(/^https?:\/\/(www\.)?eleveai\.fr(?=\/video\/)/, "");
  return lien.match(/\/video\/([^/?#]+)/)?.[1] ?? null;
}

// ─── Supabase, en lecture ───────────────────────────────────────────────────
type Ressource = {
  id: string;
  matiere: string;
  classe: string;
  notion_id: string;
  type: string;
  url: string;
  titre: string | null;
  micro_id: string | null;
};

async function lireRessources(): Promise<Ressource[]> {
  const env = fs.readFileSync(".env.local", "utf8");
  const get = (k: string) => {
    const m = env.match(new RegExp("^" + k + "=(.*)$", "m"));
    if (!m) throw new Error(`.env.local : ${k} manquant`);
    return m[1].trim().replace(/^["']|["']$/g, "");
  };
  const sb = createClient(get("NEXT_PUBLIC_SUPABASE_URL"), get("SUPABASE_SERVICE_ROLE_KEY"));
  // ⚠️ Supabase rend 1 000 lignes au plus : sans pagination, le chiffre serait faux.
  const tout: Ressource[] = [];
  for (let de = 0; ; de += 1000) {
    const { data, error } = await sb
      .from("notion_ressources")
      .select("id,matiere,classe,notion_id,type,url,titre,micro_id")
      .order("id")
      .range(de, de + 999);
    if (error) throw error;
    tout.push(...(data as Ressource[]));
    if (!data || data.length < 1000) break;
  }
  return tout;
}

// ─── Appels HTTP, doucement ─────────────────────────────────────────────────
type Reponse = { statut: number; vers: string | null; erreur?: string };

async function appeler(url: string): Promise<Reponse> {
  for (let essai = 0; essai < 3; essai++) {
    try {
      const r = await fetch(url, {
        method: "GET",
        redirect: "manual",
        headers: { "user-agent": "eleveai-verificateur-coach" },
      });
      // Le corps doit être consommé, sinon la connexion reste ouverte.
      await r.arrayBuffer().catch(() => undefined);
      return { statut: r.status, vers: r.headers.get("location") };
    } catch (e) {
      if (essai === 2) return { statut: 0, vers: null, erreur: String(e) };
      await new Promise((r) => setTimeout(r, 800 * (essai + 1)));
    }
  }
  return { statut: 0, vers: null };
}

async function enFile<T, R>(items: T[], n: number, f: (x: T, i: number) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let suivant = 0;
  let faits = 0;
  const ouvriere = async () => {
    for (;;) {
      const i = suivant++;
      if (i >= items.length) return;
      out[i] = await f(items[i], i);
      faits++;
      if (faits % 100 === 0) process.stderr.write(`    ${faits}/${items.length}\n`);
    }
  };
  await Promise.all(Array.from({ length: n }, ouvriere));
  return out;
}

// ─── Replis muets : relevé statique ─────────────────────────────────────────
function releverReplis(): { fichier: string; ligne: number; code: string; quoi: string }[] {
  const trouves: { fichier: string; ligne: number; code: string; quoi: string }[] = [];
  const dossiers = ["lib/tutor-v4", "app/coach", "app/coach-ia", "app/api/notion-videos", "app/video"];
  const fichiers: string[] = [];
  const marcher = (d: string) => {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = `${d}/${e.name}`;
      // Les banques de questions ont des `default:` par construction (une variante
      // au hasard parmi n) : ce ne sont pas des replis d'aiguillage.
      if (e.isDirectory()) {
        if (e.name !== "questionBank" && e.name !== "lessons") marcher(p);
      } else if (/\.(ts|tsx)$/.test(e.name)) fichiers.push(p);
    }
  };
  dossiers.forEach(marcher);

  for (const f of fichiers) {
    const src = fs.readFileSync(f, "utf8").split("\n");
    for (let i = 0; i < src.length; i++) {
      const l = src[i];
      // Un `default:` qui RETOURNE un contenu (et non `null`, `[]`, `{}`, une erreur).
      const d = l.match(/^\s*default:\s*return\s+(.+);?\s*$/);
      if (d) {
        const v = d[1].replace(/;$/, "").trim();
        if (!/^(null|undefined|\[\]|\{\}|""|''|0|false|true)$/.test(v) && !/^throw/.test(v))
          trouves.push({ fichier: f, ligne: i + 1, code: l.trim(), quoi: "default: sert un contenu" });
      }
      // Un `catch` qui avale sans rien dire.
      if (/catch\s*(\([^)]*\))?\s*\{\s*\}/.test(l))
        trouves.push({ fichier: f, ligne: i + 1, code: l.trim(), quoi: "catch vide" });
      if (/\.catch\(\s*\(\s*\)\s*=>\s*(\(\s*\{|\[\]|null|undefined|false|0)/.test(l))
        trouves.push({ fichier: f, ligne: i + 1, code: l.trim(), quoi: "catch → valeur de repli" });
    }
  }
  return trouves;
}

// ─── Programme ──────────────────────────────────────────────────────────────
async function main() {
  const t0 = Date.now();
  dire(`# Ce qui tombe en silence dans le coach`);
  dire("");
  dire(`Mesure du ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC · base \`${BASE}\``);
  dire(`Vérificateur : \`npx tsx scripts/verifier-coach-silencieux.ts\` (lecture seule).`);
  dire(
    `Registre R2 lu : **${REGISTRE === "travail" ? "la copie de travail" : `\`${REGISTRE}\` (ce que Vercel sert)`}** — ${Object.keys(R2).length} clés.`
  );

  const rows = await lireRessources();
  const videos = rows.filter((r) => r.type === "video");

  titre("0. Ce qu'on mesure");
  dire(`| grandeur | valeur |`);
  dire(`| --- | ---: |`);
  dire(`| lignes de \`notion_ressources\` | ${rows.length} |`);
  dire(`| dont \`type = "video"\` | ${videos.length} |`);
  dire(`| URL distinctes | ${new Set(videos.map((r) => r.url)).size} |`);
  dire(`| identifiants de vidéo distincts | ${new Set(videos.map((r) => idDeUrl(r.url))).size} |`);
  dire(`| lignes sans \`micro_id\` (vidéo de notion) | ${videos.filter((r) => !(r.micro_id ?? "").trim()).length} |`);
  dire(`| clés du registre \`videos-r2.json\` | ${Object.keys(R2).length} |`);

  // ── 1. Boutons morts ──────────────────────────────────────────────────────
  const ids = [...new Set(videos.map((r) => idDeUrl(r.url)).filter((x): x is string => Boolean(x)))].sort();
  const sansId = videos.filter((r) => !idDeUrl(r.url));
  const parId = new Map<string, Ressource[]>();
  for (const r of videos) {
    const id = idDeUrl(r.url);
    if (id) (parId.get(id) ?? parId.set(id, []).get(id)!).push(r);
  }

  titre("1. Les boutons morts");
  if (SANS_RESEAU) {
    dire("_(--sans-reseau : aucune URL appelée)_");
  } else {
    process.stderr.write(`  → ${ids.length} identifiants × 2 adresses, ${CONCURRENCE} en parallèle…\n`);
    const mesures = await enFile(ids, CONCURRENCE, async (id) => {
      const api = await appeler(`${BASE}/api/video-lecteur/${encodeURIComponent(id)}`);
      const page = await appeler(`${BASE}/video/${encodeURIComponent(id)}`);
      return { id, api, page };
    });

    const morts = mesures.filter((m) => m.api.statut !== 200);
    const pageKo = mesures.filter((m) => m.page.statut !== 200);
    const versYoutube = mesures.filter((m) => /youtube\.com|youtu\.be/.test(m.page.vers ?? ""));
    const reseau = mesures.filter((m) => m.api.statut === 0 || m.page.statut === 0);

    dire(`| mesure | chiffre |`);
    dire(`| --- | ---: |`);
    dire(`| identifiants appelés | ${ids.length} |`);
    dire(`| \`/api/video-lecteur/<id>\` non-200 | **${morts.length}** |`);
    dire(`| \`/video/<id>\` non-200 (3xx compris) | **${pageKo.length}** |`);
    dire(`| dont redirigés vers YouTube | **${versYoutube.length}** |`);
    dire(`| appels en échec réseau | ${reseau.length} |`);
    dire(`| lignes dont l'URL ne contient pas \`/video/\` | ${sansId.length} |`);

    const aLister = [...new Set([...morts, ...pageKo].map((m) => m.id))].sort();
    if (aLister.length) {
      dire("");
      dire(`### Le détail (${aLister.length} identifiants)`);
      dire("");
      dire(`| id | API | page | va vers | classe | notion / micro | lignes |`);
      dire(`| --- | ---: | ---: | --- | --- | --- | ---: |`);
      for (const id of aLister) {
        const m = mesures.find((x) => x.id === id)!;
        const rs = parId.get(id) ?? [];
        const r = rs[0];
        dire(
          `| \`${id}\` | ${m.api.statut} | ${m.page.statut} | ${m.page.vers ?? "—"} | ${r?.classe ?? "?"} | ${r?.notion_id ?? "?"} / ${r?.micro_id || "—"} | ${rs.length} |`
        );
      }
    } else {
      dire("");
      dire("**Zéro bouton mort.** Chaque identifiant servi par le coach répond 200 sur les deux adresses.");
    }
  }

  // ── 2. Les hôtes ──────────────────────────────────────────────────────────
  titre("2. Les hôtes");
  const hotes = new Map<string, number>();
  const invalides: Ressource[] = [];
  for (const r of videos) {
    try {
      const h = new URL(r.url).host;
      hotes.set(h, (hotes.get(h) ?? 0) + 1);
    } catch {
      invalides.push(r);
    }
  }
  dire(`| hôte servi | lignes |`);
  dire(`| --- | ---: |`);
  for (const [h, n] of [...hotes].sort((a, b) => b[1] - a[1])) dire(`| \`${h}\` | ${n} |`);
  if (invalides.length) dire(`| **URL illisibles** | ${invalides.length} |`);
  const youtubeDirect = videos.filter((r) => /youtube\.com|youtu\.be/.test(new URL(r.url, BASE).host));
  dire("");
  dire(`Lignes servant un hôte YouTube : **${youtubeDirect.length}**.`);
  const clesYoutube = videos.filter((r) => (idDeUrl(r.url) ?? "").startsWith("youtube-"));
  dire(
    `Clés nommées \`youtube-*\` (le piège : c'est une clé R2, pas un lien YouTube) : ${clesYoutube.length} lignes, toutes sur \`${[...new Set(clesYoutube.map((r) => new URL(r.url).host))].join(", ") || "—"}\`.`
  );

  // ── 3. Micros fantômes ────────────────────────────────────────────────────
  titre("3. Les micros fantômes");
  const combos = [...new Set(videos.map((r) => `${r.matiere}|${r.classe}`))].sort();
  const catalogues = new Map<string, { tout: Record<string, string[]>; visible: Record<string, string[]> }>();
  for (const c of combos) {
    const [matiere, classe] = c.split("|");
    try {
      catalogues.set(c, {
        tout: getNotionMicroMap(classe as Classe, matiere as Matiere, { tout: true }),
        visible: getNotionMicroMap(classe as Classe, matiere as Matiere),
      });
    } catch (e) {
      dire(`⚠️ catalogue illisible pour \`${c}\` : ${String(e).slice(0, 120)}`);
    }
  }
  const fantomesNotion: Ressource[] = [];
  const fantomesMicro: Ressource[] = [];
  const masquees: Ressource[] = [];
  for (const r of videos) {
    const cat = catalogues.get(`${r.matiere}|${r.classe}`);
    if (!cat) continue;
    const micro = (r.micro_id ?? "").trim();
    if (!(r.notion_id in cat.tout)) {
      fantomesNotion.push(r);
      continue;
    }
    if (!micro) continue;
    if (!cat.tout[r.notion_id].includes(micro)) fantomesMicro.push(r);
    else if (!(cat.visible[r.notion_id] ?? []).includes(micro)) masquees.push(r);
  }
  dire(`| mesure | lignes |`);
  dire(`| --- | ---: |`);
  dire(`| couples (matière, classe) présents en base | ${combos.length} |`);
  dire(`| \`notion_id\` absent du catalogue | **${fantomesNotion.length}** |`);
  dire(`| \`micro_id\` absent de sa notion | **${fantomesMicro.length}** |`);
  dire(`| \`micro_id\` présent mais MASQUÉ (le coach ne le propose plus) | ${masquees.length} |`);
  const detailler = (nom: string, liste: Ressource[]) => {
    if (!liste.length) return;
    dire("");
    dire(`### ${nom} (${liste.length})`);
    dire("");
    dire(`| classe | notion_id | micro_id | titre |`);
    dire(`| --- | --- | --- | --- |`);
    for (const r of liste.slice(0, 80))
      dire(`| ${r.classe} | \`${r.notion_id}\` | \`${r.micro_id || "—"}\` | ${(r.titre ?? "").slice(0, 60)} |`);
    if (liste.length > 80) dire(`| … | … | … | _${liste.length - 80} autres_ |`);
  };
  detailler("Notions fantômes", fantomesNotion);
  detailler("Micros fantômes", fantomesMicro);
  detailler("Micros masquées servies quand même", masquees);

  // ── 4. Short / paysage ────────────────────────────────────────────────────
  titre("4. Un short servi là où l'élève attend un cours");
  // Les trois formes. La seule qui décide de l'AFFICHAGE est le champ du registre.
  const parSuffixe = (id: string) => id.endsWith("-short");
  const parParam = (url: string) => /[?&]format=short\b/.test(url);
  const parRegistre = (id: string) => trouver(id)?.short ?? null;

  let desaccordParam = 0;
  let desaccordSuffixe = 0;
  let inconnuRegistre = 0;
  const shortsSansParam: Ressource[] = [];
  for (const r of videos) {
    const id = idDeUrl(r.url);
    if (!id) continue;
    const reg = parRegistre(id);
    if (reg === null) {
      inconnuRegistre++;
      continue;
    }
    if (parParam(r.url) !== reg) desaccordParam++;
    if (parSuffixe(id) !== reg) desaccordSuffixe++;
    // Celui qui compte pour le coach : `estShortVideo` ne lit QUE `?format=short`.
    if (reg && !parParam(r.url)) shortsSansParam.push(r);
  }
  dire(`| forme de détection | désaccords avec le registre |`);
  dire(`| --- | ---: |`);
  dire(`| suffixe \`-short\` de la clé | **${desaccordSuffixe}** |`);
  dire(`| paramètre \`?format=short\` de l'URL | **${desaccordParam}** |`);
  dire(`| identifiants absents du registre (indécidable) | ${inconnuRegistre} |`);
  dire("");
  dire(
    `⚠️ **Le format affiché ne vient d'aucune des deux formes d'URL.** \`app/video/[id]/page.tsx\` et ` +
      `\`components/LienVideoModal.tsx\` lisent le champ \`short\` de \`videos-r2.json\` ; \`?format=short\` ` +
      `n'est lu par aucune page. Il ne sert qu'à \`estShortVideo()\` (\`lib/videos/lienVideo.ts\`), qui décide ` +
      `quelle vidéo le bouton ▶ du coach propose. Un short dont l'URL n'a pas \`?format=short\` est donc ` +
      `**pris pour un cours** par ce choix : ${shortsSansParam.length} ligne(s).`
  );

  // Couverture par micro : paysage, short, les deux, ou seulement un short.
  type Etat = { paysage: number; short: number; inconnu: number; classe: string; notion: string };
  const parMicro = new Map<string, Etat>();
  for (const r of videos) {
    const micro = (r.micro_id ?? "").trim();
    if (!micro) continue;
    const cle = `${r.classe}/${r.notion_id}/${micro}`;
    const e = parMicro.get(cle) ?? { paysage: 0, short: 0, inconnu: 0, classe: r.classe, notion: r.notion_id };
    const id = idDeUrl(r.url);
    const reg = id ? parRegistre(id) : null;
    if (reg === null) e.inconnu++;
    else if (reg) e.short++;
    else e.paysage++;
    parMicro.set(cle, e);
  }
  const seulementShort = [...parMicro].filter(([, e]) => e.short > 0 && e.paysage === 0 && e.inconnu === 0);
  const lesDeux = [...parMicro].filter(([, e]) => e.short > 0 && e.paysage > 0);
  const seulementPaysage = [...parMicro].filter(([, e]) => e.paysage > 0 && e.short === 0);
  dire("");
  dire(`| couverture d'une micro servie | micros |`);
  dire(`| --- | ---: |`);
  dire(`| micros servies au total | ${parMicro.size} |`);
  dire(`| un paysage (avec ou sans short) | ${seulementPaysage.length + lesDeux.length} |`);
  dire(`| les deux | ${lesDeux.length} |`);
  dire(`| **seulement un short** (= un trou, pas une couverture) | **${seulementShort.length}** |`);
  dire(`| seulement des identifiants hors registre | ${[...parMicro].filter(([, e]) => e.inconnu > 0 && e.paysage === 0 && e.short === 0).length} |`);
  if (seulementShort.length) {
    const parClasse = new Map<string, number>();
    for (const [, e] of seulementShort) parClasse.set(e.classe, (parClasse.get(e.classe) ?? 0) + 1);
    dire("");
    dire(`### Micros servies par un short seul, par classe`);
    dire("");
    dire(`| classe | micros |`);
    dire(`| --- | ---: |`);
    for (const [c, n] of [...parClasse].sort((a, b) => b[1] - a[1])) dire(`| ${c} | ${n} |`);
    dire("");
    dire(`<details><summary>La liste complète (${seulementShort.length})</summary>`);
    dire("");
    for (const [cle] of seulementShort.sort()) dire(`- \`${cle}\``);
    dire("");
    dire("</details>");
  }

  // ── 5. Les deux registres d'accord ────────────────────────────────────────
  titre("5. Les deux registres d'accord");
  const idsServis = new Set(videos.map((r) => idDeUrl(r.url)).filter(Boolean) as string[]);
  const idsResolus = new Set<string>();
  for (const id of idsServis) {
    const v = trouver(id);
    if (v) idsResolus.add(v.id);
  }
  const sansRegistre = [...idsServis].filter((id) => !trouver(id)).sort();
  const avecCoach = Object.entries(R2).filter(([, v]) => v.coach);
  const coachSansLigne = avecCoach.filter(([id]) => !idsResolus.has(id));
  dire(`| mesure | chiffre |`);
  dire(`| --- | ---: |`);
  dire(`| clés du registre | ${Object.keys(R2).length} |`);
  dire(`| clés du registre portant un lien \`coach\` | ${avecCoach.length} |`);
  dire(`| dont AUCUNE ligne de \`notion_ressources\` ne les sert | **${coachSansLigne.length}** |`);
  dire(`| identifiants servis par le coach | ${idsServis.size} |`);
  dire(`| dont ABSENTS du registre R2 | **${sansRegistre.length}** |`);
  if (sansRegistre.length) {
    dire("");
    dire(`### Lignes de coach sans clé au registre (${sansRegistre.length})`);
    dire("");
    dire(`| id | classe | notion / micro | ressemble à un ID YouTube |`);
    dire(`| --- | --- | --- | --- |`);
    for (const id of sansRegistre.slice(0, 60)) {
      const r = (parId.get(id) ?? [])[0];
      dire(`| \`${id}\` | ${r?.classe ?? "?"} | ${r?.notion_id ?? "?"} / ${r?.micro_id || "—"} | ${ID_YOUTUBE.test(id) ? "oui → redirige vers YouTube" : "non → 404"} |`);
    }
    if (sansRegistre.length > 60) dire(`| … | | | _${sansRegistre.length - 60} autres_ |`);
  }
  if (coachSansLigne.length) {
    dire("");
    dire(`### Clés R2 avec lien coach mais sans ligne de coach (${coachSansLigne.length})`);
    dire("");
    const parCible = new Map<string, number>();
    for (const [, v] of coachSansLigne) {
      const q = new URLSearchParams((v.coach ?? "").split("?")[1]);
      parCible.set(`${q.get("classe") ?? "?"}`, (parCible.get(`${q.get("classe") ?? "?"}`) ?? 0) + 1);
    }
    dire(`| classe visée par le lien coach | clés |`);
    dire(`| --- | ---: |`);
    for (const [c, n] of [...parCible].sort((a, b) => b[1] - a[1])) dire(`| ${c} | ${n} |`);
    dire("");
    dire(`<details><summary>La liste complète (${coachSansLigne.length})</summary>`);
    dire("");
    for (const [id, v] of coachSansLigne) dire(`- \`${id}\`${v.short ? " (short)" : ""} → \`${v.coach}\``);
    dire("");
    dire("</details>");
  }

  // ── 6. Les replis muets ───────────────────────────────────────────────────
  titre("6. Les replis muets");

  // 6a. MESURÉ, pas lu : on appelle le catalogue sur toutes les combinaisons
  // (classe, matière) qu'une adresse peut produire, et on regarde ce qui sort.
  // `normalizeClasse` rend « 6e » et `normalizeMatiere` rend « maths » pour tout
  // ce qu'ils ne connaissent pas (app/coach/serie/TutorV4Client.tsx:460 et :501),
  // puis `getKnowledge` (lib/tutor-v4/catalog.ts) a un `default:` par matière.
  // Une combinaison qui n'est nommée nulle part reçoit donc le paquet d'une AUTRE
  // classe, sans un mot — et c'est la liste de notions que l'élève voit.
  const CLASSES_ACCEPTEES = [
    "cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere",
    "premiere-spe", "terminale-spe", "stmg", "adulte", "a1", "a2", "b1", "b2", "c1",
    "pix-college", "pix-lycee",
  ] as const;
  const MATIERES_ACCEPTEES = ["maths", "francais", "english-maths", "economie", "espagnol", "ia"] as const;

  const signature = (c: string, m: string) => {
    try {
      return getNotionOptions(c as Classe, m as Matiere, { tout: true }).join(",");
    } catch (e) {
      return `ERREUR:${String(e).slice(0, 60)}`;
    }
  };
  // Qui est le repli de chaque matière (le `default:` du switch) ?
  const REPLI_DE: Record<string, string> = {
    maths: "6e",
    francais: "ce1",
    "english-maths": "a1",
    economie: "a1",
    espagnol: "a1",
    ia: "a1",
  };
  const muets: { classe: string; matiere: string; sert: string; loader: string }[] = [];
  let combinaisonsJustes = 0;
  for (const m of MATIERES_ACCEPTEES) {
    const sigRepli = signature(REPLI_DE[m], m);
    for (const c of CLASSES_ACCEPTEES) {
      const sig = signature(c, m);
      const estRepli = c !== REPLI_DE[m] && sig === sigRepli && !sig.startsWith("ERREUR");
      if (!estRepli) {
        combinaisonsJustes++;
        continue;
      }
      let loader = "sert le contenu du repli";
      try {
        await loadKnowledgeV4(c, m);
      } catch {
        loader = "puis l'API échoue (« Chargement du tutor… » sans fin)";
      }
      muets.push({ classe: c, matiere: m, sert: REPLI_DE[m], loader });
    }
  }
  dire(
    `**Mesuré** : ${CLASSES_ACCEPTEES.length} classes × ${MATIERES_ACCEPTEES.length} matières = ` +
      `${CLASSES_ACCEPTEES.length * MATIERES_ACCEPTEES.length} combinaisons qu'une adresse \`/coach/serie?classe=…&matiere=…\` ` +
      `peut produire (les valeurs inconnues sont déjà ramenées à \`6e\` / \`maths\`).`
  );
  dire("");
  dire(`| combinaisons | nombre |`);
  dire(`| --- | ---: |`);
  dire(`| servies par leur propre paquet | ${combinaisonsJustes} |`);
  dire(`| **servies EN SILENCE par le paquet d'une autre classe** | **${muets.length}** |`);
  if (muets.length) {
    dire("");
    dire(`| adresse | reçoit le catalogue de | ensuite |`);
    dire(`| --- | --- | --- |`);
    for (const x of muets)
      dire(`| \`?classe=${x.classe}&matiere=${x.matiere}\` | **${x.sert}/${x.matiere}** | ${x.loader} |`);
  }

  // 6b. Relevé statique, en complément : les `default:` et `catch` du code
  // d'aiguillage du coach (les banques de questions sont exclues : un `default:`
  // y est une variante de plus, pas un repli).
  dire("");
  dire(`### Relevé statique des \`default:\` et \`catch\` muets (hors banques de questions)`);
  dire("");
  const replis = releverReplis();
  const parQuoi = new Map<string, number>();
  for (const r of replis) parQuoi.set(r.quoi, (parQuoi.get(r.quoi) ?? 0) + 1);
  dire(`| forme | occurrences |`);
  dire(`| --- | ---: |`);
  for (const [q, n] of [...parQuoi].sort((a, b) => b[1] - a[1])) dire(`| ${q} | ${n} |`);
  dire("");
  dire(`| fichier:ligne | forme | code |`);
  dire(`| --- | --- | --- |`);
  for (const r of replis) dire(`| \`${r.fichier}:${r.ligne}\` | ${r.quoi} | \`${r.code.slice(0, 90).replace(/\|/g, "\\|")}\` |`);

  dire("");
  dire(`_Mesure terminée en ${Math.round((Date.now() - t0) / 1000)} s._`);

  if (SORTIE) {
    fs.writeFileSync(SORTIE, lignes.join("\n") + "\n", "utf8");
    process.stderr.write(`\n→ rapport écrit dans ${SORTIE}\n`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
