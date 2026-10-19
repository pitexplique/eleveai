// Table « ID YouTube → fichier sur Cloudflare R2 », lue par la page /video/[id].
//
//   node scripts/generer-videos-r2.mjs
//
// Source : manim/manifeste-youtube.json — chaque vidéo publiée y a son `url`
// YouTube (posée par les scripts de publication) et son `fichier`, chemin relatif
// à manim/sorties. Ce chemin est AUSSI le chemin sur R2 : scripts/r2-videos.ps1
// copie manim/sorties tel quel. Une vidéo n'entre dans la table que si son MP4
// existe en local (donc a pu partir sur R2) ; sinon le site garde YouTube.
//
// À relancer après une publication + un `r2-videos.ps1 -Envoyer`.
import fs from "node:fs";
import path from "node:path";

const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")), "..");
const SORTIES = path.join(RACINE, "manim", "sorties");
const SORTIE = path.join(RACINE, "lib", "videos", "videos-r2.json");

const manifeste = JSON.parse(fs.readFileSync(path.join(RACINE, "manim", "manifeste-youtube.json"), "utf8"));
const ytId = (u) => u?.match(/(?:youtu\.be\/|shorts\/|[?&]v=|embed\/)([\w-]{11})/)?.[1] ?? null;
const existe = (rel) => rel && fs.existsSync(path.join(SORTIES, ...rel.split("/")));

// Clé = l'id du manifeste (« 3e-proba-vocabulaire »), qui existe AVANT YouTube :
// une vidéo rendue mais pas encore publiée se regarde déjà sur /video/<id>.
// Une vidéo publiée se trouve aussi par son ID YouTube (champ `youtube`).
// La vignette légère de la galerie, faite par scripts/vignettes-videos.py.
// Celle de la miniature PNG d'abord, sinon l'image à 1 s tirée de la vidéo.
const vignetteDe = (poster, fichier) => {
  for (const w of [poster?.replace(/\.png$/, ".vignette.webp"), fichier.replace(/\.mp4$/, ".vignette.webp")]) {
    if (w && existe(w)) return w;
  }
  return null;
};

const table = {};
let sansFichier = 0;
for (const v of manifeste.videos) {
  if (!existe(v.fichier)) { sansFichier++; continue; }
  // L'image d'attente : la miniature à côté du MP4, sinon celle du manifeste.
  const voisine = v.fichier.replace(/\.mp4$/, ".png");
  const poster = existe(voisine) ? voisine : existe(v.miniature) ? v.miniature : null;
  table[v.id] = {
    fichier: v.fichier,
    poster,
    vignette: vignetteDe(poster, v.fichier),
    titre: v.titre,
    short: v.type === "short",
    youtube: ytId(v.url),
  };
}

// Les MP4 rendus hors manifeste (tout le CP, par exemple) : clé = nom du fichier
// sans « eleveai- », titre tiré du nom. Ils sont sur R2 comme les autres.
const connus = new Set(Object.values(table).map((v) => v.fichier));
const parcourir = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory()
    ? e.name === "partial_movie_files" || e.name.startsWith("480p") ? [] : parcourir(path.join(dir, e.name))
    : e.name.endsWith(".mp4") ? [path.join(dir, e.name)] : []);
// Les vidéos publiées AVANT le manifeste, téléchargées depuis YouTube (19/10) :
// manim/sorties/<classe>/maths/youtube/<ID YouTube>.mp4, titre et format dans
// manim/youtube-r2.json. Le coach les trouve par leur ID YouTube.
const DEPUIS_YT = fs.existsSync(path.join(RACINE, "manim", "youtube-r2.json"))
  ? JSON.parse(fs.readFileSync(path.join(RACINE, "manim", "youtube-r2.json"), "utf8"))
  : {};

let horsManifeste = 0;
for (const abs of parcourir(SORTIES)) {
  const rel = path.relative(SORTIES, abs).split(path.sep).join("/");
  if (connus.has(rel)) continue;
  const base = path.basename(rel, ".mp4");
  const yt = /\/youtube\//.test(rel) && /^[\w-]{11}$/.test(base) ? base : null;
  const id = yt ? `youtube-${yt}` : base.replace(/^eleveai-/, "");
  if (table[id]) continue;
  const voisine = rel.replace(/\.mp4$/, ".png");
  const poster = existe(voisine) ? voisine : null;
  table[id] = {
    fichier: rel,
    poster,
    vignette: vignetteDe(poster, rel),
    titre: yt ? DEPUIS_YT[yt]?.titre ?? yt : id.replace(/-/g, " "),
    short: yt ? Boolean(DEPUIS_YT[yt]?.short) : /\/shorts\//.test(rel) || /-short(-|$)/.test(id),
    youtube: yt,
  };
  horsManifeste++;
}

const trie = Object.fromEntries(Object.entries(table).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(SORTIE, JSON.stringify(trie, null, 1) + "\n", "utf8");
const publiees = Object.values(trie).filter((v) => v.youtube).length;
console.log(`${Object.keys(trie).length} vidéos → ${path.relative(RACINE, SORTIE)} (${publiees} déjà sur YouTube, ${horsManifeste} hors manifeste)`);
if (sansFichier) console.log(`${sansFichier} vidéos du manifeste sans MP4 dans manim/sorties`);

// Les mots des titres, pour la recherche de l'en-tête (19/10/2026).
await import("./generer-mots-videos.mjs");
