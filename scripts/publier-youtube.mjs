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
 *    navigateur, puis affiche la ligne YOUTUBE_REFRESH_TOKEN=... à coller.
 *
 * ── USAGE ────────────────────────────────────────────────────────────────────
 *   node scripts/publier-youtube.mjs --dry-run          # ce qui serait publié
 *   node scripts/publier-youtube.mjs --seulement racine-carree-2de
 *   node scripts/publier-youtube.mjs --limite 2
 *   node scripts/publier-youtube.mjs --visibilite public
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
  console.log("\n✔ Autorisé. Colle cette ligne dans .env.local :\n");
  console.log(`YOUTUBE_REFRESH_TOKEN=${j.refresh_token}\n`);
  // ⛔ On n'écrit PAS dans .env.local nous-mêmes : c'est le fichier de secrets
  // de Frédéric, il décide de ce qui y entre.
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
  const lignes = [v.accroche, ""];
  if (v.chapitres?.length) {
    for (const [t, titre] of v.chapitres) lignes.push(`${t} ${titre}`);
    lignes.push("");
  }
  if (v.type === "short" && urlLongue) {
    lignes.push(`La vidéo complète : ${urlLongue}`);
  }
  lignes.push(`La fiche de cours : ${v.fiche}`);
  lignes.push(`S'entraîner avec le coach : https://www.eleveai.fr/coach-ia/maths?classe=seconde`);
  lignes.push("", m.signature);
  return lignes.join("\n").replace(/[<>]/g, "");
}

// ─── Appels API ───────────────────────────────────────────────────────────────

async function televerser(token, v, m, urlLongue, visibilite) {
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
    status: { privacyStatus: visibilite, selfDeclaredMadeForKids: false },
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

async function poserMiniature(token, videoId, relatif) {
  const fichier = path.join(MINIATURES, relatif);
  if (!fs.existsSync(fichier)) return "absente";
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
  let aFaire = m.videos
    .filter((v) => !journal[v.id])
    .filter((v) => !seulement || v.id === seulement || v.notionId === seulement)
    .sort((a, b) => (a.type === "longue" ? -1 : 1) - (b.type === "longue" ? -1 : 1));

  const manquants = aFaire.filter((v) => !fs.existsSync(path.join(SORTIES, v.fichier)));
  if (manquants.length) {
    console.error("✖ Fichiers absents :");
    for (const v of manquants) console.error("   " + v.fichier);
    process.exit(1);
  }

  if (aFaire.length > limite) {
    console.log(`\n⚠️  ${aFaire.length} vidéos en attente, mais le quota YouTube n'en permet`);
    console.log(`   qu'environ 5 par jour. Je m'arrête à ${limite} — relance demain pour la suite.\n`);
    aFaire = aFaire.slice(0, limite);
  }

  if (!aFaire.length) {
    console.log("Rien à publier : tout le manifeste est déjà en ligne.");
    return;
  }

  console.log(`\n${dryRun ? "SIMULATION" : "PUBLICATION"} — ${aFaire.length} vidéo(s), visibilité « ${visibilite} »\n`);
  for (const v of aFaire) {
    console.log(`  • [${v.type}] ${v.titre}`);
    console.log(`    ${v.fichier}`);
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

  const reponse = await demander("Publier pour de vrai ? (oui/non) ");
  if (reponse !== "oui" && reponse !== "o") {
    console.log("Annulé. Rien n'a été envoyé.");
    return;
  }

  const token = await jeton();
  const listeId = await playlist(token, m.playlist);

  for (const v of aFaire) {
    process.stdout.write(`\n→ ${v.titre}\n  envoi…`);
    try {
      // {{LONGUE}} : l'URL de la vidéo longue de la même notion, publiée avant.
      const parente = v.renvoie_vers ? journal[v.renvoie_vers] : null;
      const urlLongue = parente ? `https://youtu.be/${parente.videoId}` : null;
      if (v.type === "short" && !urlLongue) {
        console.log("  ⚠️ vidéo longue pas encore en ligne — short reporté.");
        continue;
      }

      const videoId = await televerser(token, v, m, urlLongue, visibilite);
      process.stdout.write(` ok (${videoId})\n`);

      const mini = v.miniature ? await poserMiniature(token, videoId, v.miniature) : "sans objet";
      const pl = await ajouterAPlaylist(token, listeId, videoId);
      console.log(`  miniature : ${mini} · playlist : ${pl}`);
      console.log(`  https://youtu.be/${videoId}`);

      journal[v.id] = { videoId, titre: v.titre, visibilite, publieLe: new Date().toISOString() };
      ecrireJournal(journal); // écrit APRÈS chaque vidéo : une coupure ne perd rien
    } catch (e) {
      console.error(`  ✖ échec : ${e.message}`);
      console.error("    Le journal n'est pas modifié : relancer reprendra à cette vidéo.");
      break;
    }
  }
  console.log("\nTerminé. Journal : manim/sorties/.publiees.json\n");
}

main().catch((e) => { console.error(e); process.exit(1); });
