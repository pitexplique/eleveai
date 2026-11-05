/**
 * publier-youtube.mjs
 *
 * PUBLIE LES VIDÉOS MANIM SUR YOUTUBE, depuis `manim/sorties/manifeste-youtube.json`.
 * Titre, description, chapitres, tags, miniature, playlist : tout en une commande.
 *
 * ── POURQUOI CE SCRIPT EXISTE (09/09/2026) ───────────────────────────────────
 * ⭐ Mesuré : la mise en ligne à la main coûte environ 2 minutes par vidéo, soit
 * 1 h 35 pour une classe (48 vidéos) — le poste le plus cher de toute la chaîne,
 * et le seul où une erreur de copier-coller passe inaperçue jusqu'à ce qu'un
 * élève tombe sur la mauvaise description.
 *
 * ⭐ CE QU'IL FAIT ET QU'UN HUMAIN NE PEUT PAS FAIRE : la description d'un short
 * doit pointer vers l'URL de sa vidéo longue — URL qui n'existe pas avant de
 * l'avoir publiée. Le script publie la longue, retient son id, et substitue
 * `{{LONGUE}}` dans les shorts de la même notion.
 *
 * ── ⚠️ DEUX PLAFONDS À CONNAÎTRE AVANT DE LANCER ─────────────────────────────
 * 1. LE QUOTA. L'API YouTube donne 10 000 unités par jour et une mise en ligne
 *    en coûte 1 600 (+50 pour la miniature, +50 pour la playlist). Cela fait
 *    ENVIRON 5 VIDÉOS PAR JOUR, quoi qu'on fasse. Une extension se demande à
 *    Google par un formulaire d'audit. Le script s'arrête tout seul à `--limite`
 *    (5 par défaut) plutôt que de se faire rejeter en cours de route.
 * 2. LA VÉRIFICATION DE L'APPLICATION. Tant que le projet OAuth n'est pas
 *    vérifié par Google, les vidéos envoyées par API peuvent être forcées en
 *    PRIVÉ. C'est pourquoi `--visibilite` vaut `private` par défaut : on
 *    constate le comportement réel sur une vidéo avant d'en lancer quarante.
 *
 * ── CE QU'IL FAUT, UNE FOIS ──────────────────────────────────────────────────
 * 1. Google Cloud Console → un projet → activer « YouTube Data API v3 ».
 * 2. Identifiants → créer un ID client OAuth 2.0, type « Application de bureau ».
 * 3. Coller dans .env.local :
 *      YOUTUBE_CLIENT_ID=...
 *      YOUTUBE_CLIENT_SECRET=...
 * 4. `node scripts/publier-youtube.mjs --auth` → ouvre le consentement dans le
 *    navigateur, puis écrit lui-même YOUTUBE_REFRESH_TOKEN=... dans .env.local.
 *
 * ── USAGE ────────────────────────────────────────────────────────────────────
 *   node scripts/publier-youtube.mjs --dry-run          # ce qui serait publié
 *   node scripts/publier-youtube.mjs --seulement racine-carree-2de
 *   node scripts/publier-youtube.mjs --limite 2
 *   node scripts/publier-youtube.mjs --visibilite public
 *   node scripts/publier-youtube.mjs --du-jour --visibilite public
 *     → 5 vidéos de classes et de notions toutes différentes (voir choixDuJour).
 *   node scripts/publier-youtube.mjs --du-jour --programmer --oui
 *     → la même, programmée le lendemain sur CRENEAUX_REUNION, sans question.
 *       C'est ce que lance chaque jour à 12 h 30 (Réunion) la tâche Windows
 *       « EleveAI - publication YouTube du jour » ; journal dans
 *       manim/sorties/publication-auto.log.
 *   node scripts/publier-youtube.mjs --remplacer --seulement 4e-pythagore-cote,4e-pythagore-cote-short
 *     → publie la version refaite, passe l'ancienne en non répertoriée,
 *       et met la nouvelle adresse dans le manifeste (l'ancienne en `ancienne_url`).
 *
 * ⛔ SANS `--dry-run`, CE SCRIPT PUBLIE POUR DE VRAI. Il demande confirmation
 * avant le premier envoi et liste ce qu'il va faire.
 *
 * Le journal `manim/sorties/.publiees.json` retient ce qui est déjà en ligne :
 * relancer le script ne republie jamais deux fois la même vidéo.
 */

import fs from "fs";
import path from "path";
import http from "http";
import readline from "readline";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.join(__dirname, "..");
const SORTIES = path.join(RACINE, "manim", "sorties");
const MINIATURES = path.join(RACINE, "manim", "miniatures");
// ⛔ Dans `manim/`, pas dans `manim/sorties/` : ce dossier est ignoré par git.
// Le manifeste est une source (titres écrits à la main), pas un rendu.
const MANIFESTE = path.join(RACINE, "manim", "manifeste-youtube.json");
const JOURNAL = path.join(SORTIES, ".publiees.json");

// Coûts en unités de quota (documentés par Google).
const COUT = { insert: 1600, thumbnail: 50, playlistItem: 50, list: 1 };
const QUOTA_JOUR = 10000;

// ─── .env.local ───────────────────────────────────────────────────────────────
function chargeEnv() {
  const p = path.join(RACINE, ".env.local");
  if (!fs.existsSync(p)) return;
  for (const ligne of fs.readFileSync(p, "utf-8").split("\n")) {
    const t = ligne.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const cle = t.slice(0, i).trim();
    const val = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[cle]) process.env[cle] = val;
  }
}
chargeEnv();

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
const SCOPES = [
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtube",
].join(" ");

// ─── OAuth ────────────────────────────────────────────────────────────────────

/**
 * Flux « application de bureau » : un mini serveur local capte le code renvoyé
 * par Google. Aucun copier-coller de code, et rien n'est exposé sur Internet.
 */
async function autoriser() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error("✖ YOUTUBE_CLIENT_ID / YOUTUBE_CLIENT_SECRET manquent dans .env.local.");
    console.error("  Google Cloud Console → Identifiants → ID client OAuth → Application de bureau.");
    process.exit(1);
  }
  const port = 8765;
  const redirect = `http://localhost:${port}`;
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: redirect,
      response_type: "code",
      scope: SCOPES,
      access_type: "offline",
      prompt: "consent", // force la délivrance d'un refresh_token
    });

  console.log("\nOuvre cette adresse dans ton navigateur :\n");
  console.log(url + "\n");

  const code = await new Promise((resolve) => {
    const serveur = http.createServer((req, res) => {
      const u = new URL(req.url, redirect);
      const c = u.searchParams.get("code");
      res.end(c ? "Autorisation reçue. Tu peux fermer cet onglet." : "Aucun code reçu.");
      if (c) { serveur.close(); resolve(c); }
    });
    serveur.listen(port, () => console.log(`En attente du retour de Google sur ${redirect} …`));
  });

  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code, client_id: CLIENT_ID, client_secret: CLIENT_SECRET,
      redirect_uri: redirect, grant_type: "authorization_code",
    }),
  });
  const j = await r.json();
  if (!j.refresh_token) {
    console.error("✖ Pas de refresh_token dans la réponse :", j);
    process.exit(1);
  }
  // 01/11/2026 : on écrit le jeton nous-mêmes dans .env.local. Le copier depuis
  // le terminal s'est révélé le pas le plus fragile de toute la mise en place,
  // et le jeton n'a ainsi jamais à s'afficher à l'écran.
  const fichierEnv = path.join(RACINE, ".env.local");
  const lignes = fs.readFileSync(fichierEnv, "utf8").split(/\r?\n/)
    .filter((l) => !l.startsWith("YOUTUBE_REFRESH_TOKEN="));
  while (lignes.length && lignes[lignes.length - 1] === "") lignes.pop();
  lignes.push(`YOUTUBE_REFRESH_TOKEN=${j.refresh_token}`, "");
  fs.writeFileSync(fichierEnv, lignes.join("\n"));
  console.log("\n✔ Autorisé. Le jeton est enregistré dans .env.local.\n");
}

async function jeton() {
  const refresh = process.env.YOUTUBE_REFRESH_TOKEN;
  if (!CLIENT_ID || !CLIENT_SECRET || !refresh) {
    console.error("✖ Identifiants absents. Lance d'abord : node scripts/publier-youtube.mjs --auth");
    process.exit(1);
  }
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID, client_secret: CLIENT_SECRET,
      refresh_token: refresh, grant_type: "refresh_token",
    }),
  });
  const j = await r.json();
  if (!j.access_token) {
    console.error("✖ Rafraîchissement du jeton refusé :", j);
    console.error("  ⚠️ Un projet OAuth resté en mode « Test » invalide le refresh_token au bout");
    console.error("     de 7 jours. Relance --auth, ou passe l'application en production.");
    process.exit(1);
  }
  return j.access_token;
}

// ─── Description ──────────────────────────────────────────────────────────────

/**
 * Assemble la description finale. L'ordre est celui de `manim/REGLES.md` :
 * accroche, chapitres, liens, signature.
 * ⛔ Aucun chevron < > : YouTube refuse la requête.
 */
function description(v, m, urlLongue) {
  // Depuis octobre, l'accroche du manifeste est une description complète
  // (fiche, exercices, coach, {{LONGUE}}) : on n'y rajoute que les chapitres.
  const complete = v.accroche.includes("eleveai.fr");
  const accroche = v.accroche.replace(/\{\{LONGUE\}\}/g, urlLongue ?? "");
  const lignes = [accroche, ""];
  if (v.chapitres?.length) {
    for (const [t, titre] of v.chapitres) lignes.push(`${t} ${titre}`);
    lignes.push("");
  }
  if (v.type === "short" && urlLongue && !v.accroche.includes("{{LONGUE}}")) {
    lignes.push(`La vidéo complète : ${urlLongue}`);
  }
  if (!complete) {
    if (v.fiche) lignes.push(`La fiche de cours : ${v.fiche}`);
    lignes.push(`S'entraîner avec le coach : https://www.eleveai.fr/coach/serie`);
  }
  if (!v.accroche.includes("Frédéric Lacoste")) lignes.push("", m.signature);
  return lignes.join("\n").trim().replace(/[<>]/g, "");
}

// ─── Appels API ───────────────────────────────────────────────────────────────

async function televerser(token, v, m, urlLongue, visibilite, publieA) {
  const fichier = path.join(SORTIES, v.fichier);
  const taille = fs.statSync(fichier).size;

  const metadonnees = {
    snippet: {
      title: v.titre,
      description: description(v, m, urlLongue),
      tags: v.tags || [],
      categoryId: m.categorie || "27",
      defaultLanguage: m.langue || "fr",
      defaultAudioLanguage: m.langue || "fr",
    },
    // Programmée : YouTube exige « private » + publishAt, et la rend publique à l'heure dite.
    status: publieA
      ? { privacyStatus: "private", publishAt: publieA, selfDeclaredMadeForKids: false }
      : { privacyStatus: visibilite, selfDeclaredMadeForKids: false },
  };

  // 1. Ouverture d'une session d'envoi reprenable.
  const ouverture = await fetch(
    "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Upload-Content-Length": String(taille),
        "X-Upload-Content-Type": "video/mp4",
      },
      body: JSON.stringify(metadonnees),
    },
  );
  if (!ouverture.ok) throw new Error(`ouverture refusée (${ouverture.status}) : ${await ouverture.text()}`);
  const url = ouverture.headers.get("location");
  if (!url) throw new Error("pas d'URL d'envoi renvoyée par YouTube");

  // 2. Envoi du fichier.
  const envoi = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "video/mp4", "Content-Length": String(taille) },
    body: fs.createReadStream(fichier),
    duplex: "half", // requis par Node pour un corps en flux
  });
  if (!envoi.ok) throw new Error(`envoi refusé (${envoi.status}) : ${await envoi.text()}`);
  return (await envoi.json()).id;
}

// Les miniatures récentes vivent à côté de leur vidéo, dans manim/sorties.
const cheminMiniature = (relatif) =>
  relatif && [path.join(MINIATURES, relatif), path.join(SORTIES, relatif)].find(fs.existsSync);

async function poserMiniature(token, videoId, relatif) {
  const fichier = cheminMiniature(relatif);
  if (!fichier) return "absente";
  const r = await fetch(
    `https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId=${videoId}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "image/png" },
      body: fs.readFileSync(fichier),
    },
  );
  // ⚠️ Une miniature personnalisée exige un compte YouTube VÉRIFIÉ (par
  // téléphone). Sans cela l'appel échoue — sans que la vidéo, elle, soit perdue.
  return r.ok ? "posée" : `refusée (${r.status})`;
}

// Frédéric, 05/11 : l'onglet Shorts de la chaîne montre une image de la vidéo.
// Une miniature posée juste après l'envoi s'affiche dans la recherche, mais
// l'onglet Shorts ne la prend que si elle est reposée une fois le short en ligne :
// alors seulement YouTube crée `sardefault.jpg`. Contrôler cette image est gratuit.
async function rattraperMiniaturesShorts(token, m, journal, max) {
  const maintenant = new Date().toISOString();
  const aVoir = m.videos.filter(
    (v) => v.type === "short" && v.url && cheminMiniature(v.miniature) && !(journal[v.id]?.publieLe > maintenant),
  );
  let posees = 0;
  for (const v of aVoir) {
    if (posees >= max) break;
    const videoId = v.url.match(/(?:youtu\.be\/|v=|shorts\/)([\w-]{11})/)?.[1];
    if (!videoId) continue;
    const r = await fetch(`https://i.ytimg.com/vi/${videoId}/sardefault.jpg`, { method: "HEAD" });
    if (r.status !== 404) continue;
    // Une vidéo privée n'a aucune image publique : elle ne peut pas être rattrapée.
    const publique = await fetch(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`, { method: "HEAD" });
    if (publique.status === 404) continue;
    const res = await poserMiniature(token, videoId, v.miniature);
    console.log(`  miniature de l'onglet Shorts : ${v.id} (${videoId}) ${res}`);
    if (res === "refusée (403)") break; // quota épuisé : la suite à la prochaine heure
    if (res === "posée") posees++;
  }
  return posees;
}

async function playlist(token, nom) {
  const r = await fetch(
    "https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=50",
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const j = await r.json();
  const trouvee = (j.items || []).find((p) => p.snippet.title === nom);
  if (trouvee) return trouvee.id;

  const creation = await fetch(
    "https://www.googleapis.com/youtube/v3/playlists?part=snippet,status",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        snippet: { title: nom, description: `Les vidéos EleveAI — ${nom}` },
        status: { privacyStatus: "public" },
      }),
    },
  );
  return (await creation.json()).id;
}

/**
 * Passe une ancienne version en « non répertoriée » : elle sort de la chaîne et
 * des recherches, mais les liens déjà donnés aux élèves (QR, cahiers) marchent.
 * On renvoie le statut complet : un champ omis reprendrait sa valeur par défaut.
 */
async function masquer(token, videoId) {
  const H = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  const lu = await (await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=status&id=${videoId}`, { headers: H })).json();
  const s = lu.items?.[0]?.status;
  if (!s) return "introuvable";
  const r = await fetch("https://www.googleapis.com/youtube/v3/videos?part=status", {
    method: "PUT",
    headers: H,
    body: JSON.stringify({
      id: videoId,
      status: {
        privacyStatus: "unlisted",
        embeddable: s.embeddable,
        license: s.license,
        publicStatsViewable: s.publicStatsViewable,
        selfDeclaredMadeForKids: s.selfDeclaredMadeForKids,
      },
    }),
  });
  return r.ok ? "non répertoriée" : `échec (${r.status})`;
}

async function ajouterAPlaylist(token, playlistId, videoId) {
  const r = await fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      snippet: { playlistId, resourceId: { kind: "youtube#video", videoId } },
    }),
  });
  return r.ok ? "ajoutée" : `refusée (${r.status})`;
}

/**
 * Rattrapage du 03/11/2026 : les vidéos envoyées par API avant cette date sont
 * toutes dans `m.playlist`. On en reclasse `max` par lancement (≈ 150 unités
 * chacune : on prend ce qui reste après les envois du jour).
 */
async function rangerLesAnciennes(token, m, journal, idPlaylist, max) {
  const H = { Authorization: `Bearer ${token}` };
  const api = "https://www.googleapis.com/youtube/v3";
  const depart = await idPlaylist(m.playlist);
  const items = [];
  let page = "";
  do {
    const r = await (await fetch(`${api}/playlistItems?part=snippet&maxResults=50&playlistId=${depart}` + (page ? `&pageToken=${page}` : ""), { headers: H })).json();
    items.push(...(r.items || []));
    page = r.nextPageToken;
  } while (page);
  const parVideo = new Map(Object.entries(journal).map(([id, j]) => [j.videoId, m.videos.find((v) => v.id === id)]));
  let faits = 0;
  for (const it of items) {
    if (faits >= max) break;
    const v = parVideo.get(it.snippet.resourceId.videoId);
    const noms = v && playlistsDe(v, m);
    if (!noms || noms.includes(m.playlist)) continue;
    for (const nom of noms) await ajouterAPlaylist(token, await idPlaylist(nom), it.snippet.resourceId.videoId);
    const r = await fetch(`${api}/playlistItems?id=${it.id}`, { method: "DELETE", headers: H });
    console.log(`  rangée : ${v.titre.slice(0, 60)} → ${noms.join(" + ")}${r.ok ? "" : " (retrait de « " + m.playlist + " » refusé)"}`);
    faits++;
  }
  return faits;
}

// ─── Journal ──────────────────────────────────────────────────────────────────

const lireJournal = () =>
  fs.existsSync(JOURNAL) ? JSON.parse(fs.readFileSync(JOURNAL, "utf-8")) : {};
const ecrireJournal = (j) => fs.writeFileSync(JOURNAL, JSON.stringify(j, null, 2) + "\n", "utf-8");

const demander = (q) =>
  new Promise((res) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(q, (r) => { rl.close(); res(r.trim().toLowerCase()); });
  });

// ─── Programme ────────────────────────────────────────────────────────────────

// ⛔ 02/11/2026 : le manifeste porte des modifications NON COMMITÉES de
// plusieurs sessions, et une autre session peut l'éditer pendant qu'on envoie
// (un envoi dure des minutes). On ne réécrit donc JAMAIS la copie lue au
// départ : on RELIT le fichier, on n'y change que url / ancienne_url /
// a_remplacer des entrées passées, après une sauvegarde, et on écrit par un
// fichier temporaire renommé (jamais de fichier à moitié écrit).
// Même format que l'original (CRLF, 2 espaces) : le diff se limite à ces lignes.
function ecrireManifeste(entrees) {
  const texte = fs.readFileSync(MANIFESTE, "utf-8");
  const frais = JSON.parse(texte);
  for (const e of entrees) {
    const cible = frais.videos.find((x) => x.id === e.id);
    if (!cible) continue;
    for (const champ of ["url", "ancienne_url"]) if (e[champ]) cible[champ] = e[champ];
    if (!e.a_remplacer) delete cible.a_remplacer;
  }
  fs.writeFileSync(path.join(SORTIES, ".manifeste-avant-publication.json"), texte);
  const tmp = MANIFESTE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(frais, null, 2).replace(/\n/g, "\r\n") + "\r\n");
  JSON.parse(fs.readFileSync(tmp, "utf-8")); // relu avant de remplacer
  fs.renameSync(tmp, MANIFESTE);
}

/** Nom de fichier d'origine (en minuscules) → id, pour toute la chaîne (~12 unités). */
async function videosDeLaChaine(token) {
  const H = { headers: { Authorization: `Bearer ${token}` } };
  const api = "https://www.googleapis.com/youtube/v3";
  const c = await (await fetch(`${api}/channels?part=contentDetails&mine=true`, H)).json();
  const uploads = c.items[0].contentDetails.relatedPlaylists.uploads;
  const ids = [];
  let page = "";
  do {
    const r = await (await fetch(
      `${api}/playlistItems?part=snippet&maxResults=50&playlistId=${uploads}` + (page ? `&pageToken=${page}` : ""), H)).json();
    for (const it of r.items) ids.push(it.snippet.resourceId.videoId);
    page = r.nextPageToken;
  } while (page);
  const parFichier = new Map();
  for (let i = 0; i < ids.length; i += 50) {
    const r = await (await fetch(`${api}/videos?part=fileDetails&id=${ids.slice(i, i + 50).join(",")}`, H)).json();
    for (const it of r.items) {
      const nom = it.fileDetails?.fileName?.toLowerCase();
      if (nom && !parFichier.has(nom)) parFichier.set(nom, it.id);
    }
  }
  return parFichier;
}

// Créneaux de mise en ligne, HEURE DE LA RÉUNION (UTC+4 toute l'année, sans
// heure d'été ; 3 h de plus que la métropole en hiver, 2 h en été).
// Proposés le 01/11/2026 : le bus du matin (son record de 1 000 vues à 8 h),
// la pause de midi, la sortie des cours, puis le soir. Des suppositions, pas
// des mesures : Frédéric les change s'il connaît de meilleurs moments.
const CRENEAUX_REUNION = ["07:30", "12:15", "16:30", "18:30", "20:30"];

/** Les n premiers créneaux de DEMAIN (Réunion), en ISO UTC pour publishAt. */
function horairesDeDemain(n) {
  const reunion = new Date(Date.now() + 4 * 3600e3); // l'horloge de La Réunion
  const demain = new Date(Date.UTC(reunion.getUTCFullYear(), reunion.getUTCMonth(), reunion.getUTCDate() + 1));
  const jour = demain.toISOString().slice(0, 10);
  return CRENEAUX_REUNION.slice(0, n).map((h) => new Date(`${jour}T${h}:00+04:00`).toISOString());
}

const heureReunion = (iso) =>
  new Date(iso).toLocaleString("fr-FR", { timeZone: "Indian/Reunion", weekday: "short", hour: "2-digit", minute: "2-digit" });

// ⛔ 03/11/2026 : tout partait dans `m.playlist` (« Maths seconde », réglage de
// septembre), même la 6e et la Tle. Chaque vidéo va dans la playlist de SA
// classe, et le collège aussi dans celle du CRPE (règle du 17/10).
// Titres = ceux qui existent sur la chaîne.
const CRPE = "CRPE maths : revoir les notions du collège";
function playlistsDe(v, m) {
  const k = v.classe || v.fichier.split("/")[0];
  if (/^cp/.test(k) && v.serie === "La belle écriture") return ["La belle écriture pour les droitiers"];
  const par = {
    cm1: ["Maths CM1"], cm2: ["Maths CM2"],
    "6e": ["Maths 6e", CRPE], "5e": ["Maths 5e", CRPE], "4e": ["Maths 4e", CRPE], "3e": ["Maths 3e", CRPE],
    seconde: ["Maths seconde"],
    premiere: ["Maths 1re et STMG"], "premiere-commun": ["Maths 1re et STMG"], stmg: ["Maths 1re et STMG"],
    "premiere-spe": ["Maths Première spécialité"],
    terminale: ["Maths terminale spé"], "terminale-spe": ["Maths terminale spé"],
    bases: ["LES BASES"], actu: ["Les maths en vrai"], "maths-en-vrai": ["Les maths en vrai"], "974": ["Les maths en vrai"],
  };
  return par[k] ?? [m.playlist];
}

const classeDe = (v) => v.classe || v.fichier.split("/")[0];

function choixDuJour(candidats, m, journal, enLigne, limite) {
  // Date de la dernière publication par API de chaque classe (jamais = tout en tête).
  const derniere = {};
  for (const [id, j] of Object.entries(journal)) {
    const v = m.videos.find((x) => x.id === id);
    if (v) derniere[classeDe(v)] = Math.max(derniere[classeDe(v)] ?? 0, Date.parse(j.publieLe));
  }
  const parClasse = new Map();
  for (const v of candidats) {
    const k = classeDe(v);
    if (!parClasse.has(k)) parClasse.set(k, []);
    parClasse.get(k).push(v);
  }
  const classes = [...parClasse.keys()].sort((a, b) => (derniere[a] ?? 0) - (derniere[b] ?? 0));

  const choisis = [];
  const notions = new Set();
  // `a_remplacer` (Pythagore refaites, 01/11) : une paysage et son short par
  // jour passent avant tout le reste, jusqu'à ce qu'il n'y en ait plus.
  const refaite = candidats.find((v) => v.a_remplacer && v.type === "longue");
  if (refaite) {
    choisis.push(refaite);
    notions.add(refaite.notionId);
    const sonShort = candidats.find((v) => v.a_remplacer && v.renvoie_vers === refaite.id);
    if (sonShort) choisis.push(sonShort);
  }
  candidats = candidats.filter((v) => !v.a_remplacer);
  // `prioritaire` (nouveautés que Frédéric veut voir sortir, 02/11) : avant la
  // rotation des classes, une paysage n'occupant jamais plus de 2 places.
  for (const v of candidats.filter((x) => x.prioritaire)) {
    if (choisis.length >= limite || choisis.includes(v)) continue;
    if (v.type === "longue") {
      if (choisis.filter((x) => x.type === "longue").length >= 2) continue;
      choisis.push(v);
      const sonShort = candidats.find((x) => x.renvoie_vers === v.id);
      if (sonShort && choisis.length < limite) choisis.push(sonShort);
    } else if (!v.renvoie_vers || enLigne(v.renvoie_vers)) {
      choisis.push(v);
    }
    if (v.notionId) notions.add(v.notionId);
  }
  candidats = candidats.filter((v) => !choisis.includes(v));
  for (const k of classes) {
    if (choisis.length >= limite) break;
    const liste = parClasse.get(k).filter((v) => !notions.has(v.notionId));
    // 1. Un short dont la paysage est déjà en ligne.
    const short = liste.find((v) => v.type === "short" && v.renvoie_vers && enLigne(v.renvoie_vers));
    if (short) { choisis.push(short); notions.add(short.notionId); continue; }
    // 2. Sinon une paysage, suivie de son short s'il reste de la place.
    // 19/10 : « on ne publie pas autant de paysage que de short ! » → 2 au plus.
    const longue = liste.find((v) => v.type === "longue");
    if (!longue || choisis.filter((v) => v.type === "longue").length >= 2) continue;
    choisis.push(longue);
    notions.add(longue.notionId);
    const sonShort = candidats.find((v) => v.renvoie_vers === longue.id);
    if (sonShort && choisis.length < limite) choisis.push(sonShort);
  }
  return choisis;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--auth")) return autoriser();

  const dryRun = args.includes("--dry-run");
  const lire = (nom, defaut) => {
    const i = args.indexOf(nom);
    return i === -1 ? defaut : args[i + 1];
  };
  const seulement = lire("--seulement", null);
  const limite = parseInt(lire("--limite", "5"), 10);
  const visibilite = lire("--visibilite", "private");

  const m = JSON.parse(fs.readFileSync(MANIFESTE, "utf-8"));
  const journal = lireJournal();

  // Les vidéos longues d'abord : les shorts ont besoin de leur URL.
  // `url` dans le manifeste = déjà en ligne (publiée à la main dans Studio) :
  // le journal ne connaît que les envois par API. Oublier ce filtre a donné un
  // doublon de la racine carrée 2de le 01/11/2026.
  // --remplacer : la vidéo a été refaite (ex. Pythagore avec questions-pauses,
  // 31/10). On publie la nouvelle, puis l'ancienne passe en non répertoriée.
  const remplacer = args.includes("--remplacer");
  const token = await jeton();

  // --miniatures id1,id2 : repose la miniature de vidéos déjà en ligne (04/11 :
  // deux shorts publiés à la main montraient une image de la vidéo).
  const aReposer = lire("--miniatures", null);
  if (aReposer) {
    for (const id of aReposer.split(",")) {
      const v = m.videos.find((x) => x.id === id);
      const videoId = v?.url?.match(/(?:youtu\.be\/|v=|shorts\/)([\w-]{11})/)?.[1];
      if (!videoId) {
        console.log(`  ${id} : pas en ligne`);
        continue;
      }
      console.log(`  ${id} (${videoId}) : miniature ${await poserMiniature(token, videoId, v.miniature)}`);
    }
    return;
  }

  // --rattraper-miniatures 20 : reprend le retard de l'onglet Shorts, à la main.
  const rattrapage = lire("--rattraper-miniatures", null);
  if (rattrapage) {
    const n = await rattraperMiniaturesShorts(token, m, journal, parseInt(rattrapage, 10));
    console.log(`${n} miniature(s) reposée(s).`);
    return;
  }

  // Une centaine de vidéos publiées à la main n'ont pas d'`url` dans le
  // manifeste : on les reconnaît sur la chaîne par leur nom de fichier d'origine.
  // Retrouvées, leur `url` est écrite dans le manifeste (une fois pour toutes).
  const enLigne = await videosDeLaChaine(token);
  const rattrapees = [];
  for (const v of m.videos) {
    const id = enLigne.get(path.basename(v.fichier).toLowerCase());
    if (!v.url && !journal[v.id] && id) {
      v.url = v.type === "short" ? `https://youtube.com/shorts/${id}` : `https://youtu.be/${id}`;
      rattrapees.push(v);
    }
  }
  if (rattrapees.length && !dryRun) ecrireManifeste(rattrapees);
  if (rattrapees.length) console.log(`(${rattrapees.length} vidéos déjà sur la chaîne, reconnues par leur fichier)`);

  const enLigneOuJournal = (id) => journal[id] || m.videos.find((p) => p.id === id)?.url;
  let aFaire = m.videos
    .filter((v) => !journal[v.id] && (!v.url || remplacer || v.a_remplacer))
    // --seulement accepte une liste séparée par des virgules (le choix du jour).
    .filter((v) => !seulement || seulement.split(",").some((s) => v.id === s || v.notionId === s))
    .filter((v) => fs.existsSync(path.join(SORTIES, v.fichier)))
    // Frédéric, 01/11 : « fais attention de bien mettre les miniatures dans les
    // shorts ». Un short sans sa miniature n'est jamais envoyé.
    .filter((v) => v.type !== "short" || cheminMiniature(v.miniature))
    // YouTube refuse un titre de plus de 100 caractères ou avec < > : le 04/11,
    // Pythagore ép. 5 (112) a bloqué tout l'envoi du jour.
    .filter((v) => {
      const ok = [...(v.titre || "")].length <= 100 && !/[<>]/.test(v.titre || "");
      if (!ok) console.log(`  ⚠ titre refusé par YouTube (> 100 caractères ou < >) : ${v.id}`);
      return ok;
    });

  // --du-jour : Frédéric, 01/11/2026 : « on va varier les vidéos et niveaux ».
  // Une seule classe à la fois, en commençant par celles publiées il y a le
  // plus longtemps ; un short dont la paysage est en ligne passe d'abord (les
  // shorts attirent), sinon la paysage et son short, dans cet ordre.
  if (args.includes("--du-jour")) aFaire = choixDuJour(aFaire, m, journal, enLigneOuJournal, limite);

  aFaire.sort((a, b) => (a.type === "longue" ? -1 : 1) - (b.type === "longue" ? -1 : 1));
  if (aFaire.length > limite) {
    console.log(`\n${aFaire.length} vidéos en attente ; j'en envoie ${limite} aujourd'hui.\n`);
    aFaire = aFaire.slice(0, limite);
  }

  if (!aFaire.length) {
    console.log("Rien à publier : tout le manifeste est déjà en ligne.");
    return;
  }

  // --programmer : une vidéo par créneau, le lendemain (paysages d'abord, donc
  // toujours plusieurs heures avant leur short).
  // --creneau 20:30 : une seule vidéo, demain à cette heure (rattrapage à la main).
  const creneau = lire("--creneau", null);
  const horaires = creneau
    ? [new Date(`${horairesDeDemain(1)[0].slice(0, 10)}T${creneau}:00+04:00`).toISOString()]
    : args.includes("--programmer") ? horairesDeDemain(aFaire.length) : null;

  // La tâche Windows réessaie chaque heure (le 02/11, l'horloge du PC a sauté
  // 12 h 30 et rien n'est parti) : si demain a déjà ses vidéos, on s'arrête.
  if (horaires && !creneau) {
    const demain = heureReunion(horaires[0]).split(" ")[0];
    const deja = Object.values(journal).filter((j) => j.publieLe > new Date().toISOString());
    if (deja.some((j) => heureReunion(j.publieLe).split(" ")[0] === demain)) {
      console.log(`Demain (${demain}) a déjà ses vidéos programmées.`);
      // Les essais de chaque heure rattrapent les shorts sortis depuis le dernier.
      if (!dryRun) await rattraperMiniaturesShorts(token, m, journal, 8);
      return;
    }
  }

  console.log(`\n${dryRun ? "SIMULATION" : "PUBLICATION"} — ${aFaire.length} vidéo(s), visibilité « ${horaires ? "programmée" : visibilite} »\n`);
  for (const [i, v] of aFaire.entries()) {
    console.log(`  • ${horaires ? heureReunion(horaires[i]) + " " : ""}[${v.type}] ${v.titre}`);
    console.log(`    ${v.fichier}   → ${playlistsDe(v, m).join(" + ")}`);
  }
  const cout = aFaire.length * (COUT.insert + COUT.thumbnail + COUT.playlistItem);
  console.log(`\n  Quota consommé : ~${cout} unités sur ${QUOTA_JOUR} par jour.\n`);

  if (dryRun) {
    const v = aFaire[0];
    console.log("─── Description qui serait posée sur la première ───");
    console.log(description(v, m, "https://youtu.be/XXXXXXXXXXX"));
    console.log("───────────────────────────────────────────────────\n");
    return;
  }

  // --oui : lancement automatique chaque jour (planificateur de tâches Windows).
  const reponse = args.includes("--oui") ? "oui" : await demander("Publier pour de vrai ? (oui/non) ");
  if (reponse !== "oui" && reponse !== "o") {
    console.log("Annulé. Rien n'a été envoyé.");
    return;
  }

  const idsPlaylists = new Map(); // titre → id, une recherche par titre et par lancement
  const idPlaylist = async (nom) => {
    if (!idsPlaylists.has(nom)) idsPlaylists.set(nom, await playlist(token, nom));
    return idsPlaylists.get(nom);
  };

  let envoyees = 0;
  for (const v of aFaire) {
    process.stdout.write(`\n→ ${v.titre}\n  envoi…`);
    try {
      // {{LONGUE}} : l'URL de la vidéo longue de la même notion, publiée avant.
      const parente = v.renvoie_vers ? journal[v.renvoie_vers] : null;
      const urlLongue = parente
        ? `https://youtu.be/${parente.videoId}`
        : m.videos.find((p) => p.id === v.renvoie_vers)?.url ?? null;
      // Un short SANS paysage (actu, IA…) part seul : seul celui qui en a une l'attend.
      if (v.type === "short" && v.renvoie_vers && !urlLongue) {
        console.log("  ⚠️ vidéo longue pas encore en ligne — short reporté.");
        continue;
      }

      const publieA = horaires?.[aFaire.indexOf(v)];
      const videoId = await televerser(token, v, m, urlLongue, visibilite, publieA);
      if (publieA) console.log(`  programmée : ${heureReunion(publieA)} (heure de La Réunion)`);
      process.stdout.write(` ok (${videoId})\n`);

      const mini = v.miniature ? await poserMiniature(token, videoId, v.miniature) : "sans objet";
      const noms = playlistsDe(v, m);
      for (const nom of noms) await ajouterAPlaylist(token, await idPlaylist(nom), videoId);
      const pl = noms.join(" + ");
      console.log(`  miniature : ${mini} · playlist : ${pl}`);
      console.log(`  https://youtu.be/${videoId}`);

      journal[v.id] = { videoId, titre: v.titre, visibilite, publieLe: publieA ?? new Date().toISOString() };
      ecrireJournal(journal); // écrit APRÈS chaque vidéo : une coupure ne perd rien

      if ((remplacer || v.a_remplacer) && v.url) {
        const ancienne = v.url.split("/").pop();
        console.log(`  ancienne version ${ancienne} : ${await masquer(token, ancienne)}`);
        v.ancienne_url = v.url;
        delete v.a_remplacer;
      }
      // 03/11 : l'url de TOUTE vidéo envoyée va dans le manifeste (la table R2
      // du site, scripts/generer-videos-r2.mjs, ne lit que lui).
      v.url = v.type === "short" ? `https://youtube.com/shorts/${videoId}` : `https://youtu.be/${videoId}`;
      ecrireManifeste([v]);
      envoyees++;
    } catch (e) {
      console.error(`  ✖ échec : ${e.message}`);
      console.error("    Le journal n'est pas modifié : relancer reprendra à cette vidéo.");
      break;
    }
  }
  if (envoyees === aFaire.length) {
    try {
      const n = await rangerLesAnciennes(token, m, journal, idPlaylist, 6);
      if (n) console.log(`  (${n} anciennes vidéos rangées dans leur playlist)`);
    } catch (e) {
      console.error(`  rangement des playlists remis à demain : ${e.message}`);
    }
  }
  if (envoyees) {
    // La table « ID YouTube → R2 » du site, à jour des nouvelles url.
    const { execFileSync } = await import("child_process");
    execFileSync(process.execPath, [path.join(RACINE, "scripts", "generer-videos-r2.mjs")], { stdio: "inherit" });
  }
  console.log("\nTerminé. Journal : manim/sorties/.publiees.json\n");
}

main().catch((e) => { console.error(e); process.exit(1); });
