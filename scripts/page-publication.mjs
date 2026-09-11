/**
 * page-publication.mjs
 *
 * Génère `manim/sorties/publication.html` — la page qu'on garde ouverte
 * à côté de YouTube Studio pendant la mise en ligne : un bloc par vidéo, avec
 * son titre et sa description complète, et un bouton qui copie dans le
 * presse-papier.
 *
 * ⭐ POURQUOI (Frédéric, 09/09/2026) : l'upload reste manuel pour l'instant, et
 * le poste le plus coûteux n'est pas l'envoi du fichier — c'est de retrouver le
 * bon titre, la bonne description et les bons chapitres pour la bonne vidéo,
 * huit fois de suite, sans se tromper de notion.
 *
 * DEUX SOURCES, jamais recopiées à la main : `manim/manifeste-youtube.json`
 * (maths) et `manim/sorties/METADONNEES-YOUTUBE.json` (« La belle écriture »,
 * dont seules les entrées qui ne sont pas « EN LIGNE » sont affichées).
 *
 * Usage : node scripts/page-publication.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MANIM = path.join(__dirname, "..", "manim");
const SORTIES = path.join(MANIM, "sorties");
// ⛔ LE MANIFESTE VIT DANS `manim/`, PAS DANS `manim/sorties/` : ce dossier est
// ignoré par git (il ne contient que des rendus). Le manifeste, lui, est une
// SOURCE — des titres et des descriptions écrits à la main. Poussé là-bas, il
// aurait disparu au premier changement de poste.
const m = JSON.parse(fs.readFileSync(path.join(MANIM, "manifeste-youtube.json"), "utf-8"));

/**
 * ⭐ LA DEUXIÈME SÉRIE (09/09/2026) : « La belle écriture » a son propre
 * manifeste, plus ancien et de forme différente — `METADONNEES-YOUTUBE.json`,
 * avec un champ `etat` (« à publier » / « EN LIGNE ») que le manifeste des
 * maths n'a pas. On ne l'unifie PAS : le convertir obligerait à retoucher 60
 * entrées déjà éprouvées. On le lit tel quel et on n'affiche que ce qui reste
 * à publier.
 */
const CHEMIN_ECRITURE = path.join(SORTIES, "METADONNEES-YOUTUBE.json");
const ecriture = fs.existsSync(CHEMIN_ECRITURE)
  ? JSON.parse(fs.readFileSync(CHEMIN_ECRITURE, "utf-8")).filter(
      (v) => (v.etat || "").toUpperCase() !== "EN LIGNE",
    )
  : [];

const echappe = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function description(v) {
  const l = [v.accroche, ""];
  if (v.chapitres?.length) {
    for (const [t, titre] of v.chapitres) l.push(`${t} ${titre}`);
    l.push("");
  }
  if (v.type === "short") l.push("La vidéo complète : [coller ici l'URL de la vidéo longue]");
  l.push(`La fiche de cours : ${v.fiche}`);
  l.push("S'entraîner avec le coach : https://www.eleveai.fr/coach-ia/maths?classe=seconde");
  l.push("", m.signature);
  return l.join("\n");
}

const parNotion = {};
for (const v of m.videos) (parNotion[v.notionId] ||= []).push(v);

const blocs = Object.entries(parNotion)
  .map(([notionId, videos]) => {
    const cartes = videos
      .map((v, i) => {
        const cle = `${notionId}-${i}`;
        return `
      <article class="video ${v.type}">
        <header>
          <span class="etiquette">${v.type === "longue" ? "PAYSAGE" : "SHORT 9:16"}</span>
          <code class="fichier">${echappe(path.basename(v.fichier))}</code>
        </header>

        <label>Titre</label>
        <div class="champ">
          <pre id="t-${cle}">${echappe(v.titre)}</pre>
          <button data-cible="t-${cle}">copier</button>
        </div>

        <label>Description</label>
        <div class="champ">
          <pre id="d-${cle}">${echappe(description(v))}</pre>
          <button data-cible="d-${cle}">copier</button>
        </div>

        <label>Tags</label>
        <div class="champ">
          <pre id="g-${cle}">${echappe((v.tags || []).join(", "))}</pre>
          <button data-cible="g-${cle}">copier</button>
        </div>

        ${v.miniature ? `<p class="mini">Miniature : <code>manim/miniatures/${echappe(v.miniature)}</code></p>` : ""}
        <p class="rappel">Playlist : <strong>${echappe(v.serie || m.playlist)}</strong>${
          v.type === "short"
            ? " · <em>publier la vidéo longue d'abord, puis coller son URL dans la description</em>"
            : ""
        }</p>
      </article>`;
      })
      .join("\n");
    return `    <section>
      <h2>${echappe(notionId)}</h2>
${cartes}
    </section>`;
  })
  .join("\n");

// ─── « La belle écriture » — groupée par lettre, droitier et gaucher côte à côte
const parLettre = {};
for (const v of ecriture) {
  const cle = `${v.type === "chiffre" ? "chiffre" : "lettre"} ${v.glyphe}`;
  (parLettre[cle] ||= []).push(v);
}

const blocsEcriture = Object.entries(parLettre)
  .map(([cle, videos], iL) => {
    const cartes = videos
      .map((v, i) => {
        const id = `e${iL}-${i}`;
        const court = path.basename(v.fichier);
        return `
      <article class="video ${court.includes("portrait") ? "short" : "longue"}">
        <header>
          <span class="etiquette">${court.includes("portrait") ? "SHORT 9:16" : "PAYSAGE"}</span>
          <span class="etiquette">${echappe(v.main || "")}</span>
          <code class="fichier">${echappe(court)}</code>
        </header>

        <label>Titre</label>
        <div class="champ">
          <pre id="t-${id}">${echappe(v.titre)}</pre>
          <button data-cible="t-${id}">copier</button>
        </div>

        <label>Description</label>
        <div class="champ">
          <pre id="d-${id}">${echappe(v.description)}</pre>
          <button data-cible="d-${id}">copier</button>
        </div>

        <label>Tags</label>
        <div class="champ">
          <pre id="g-${id}">${echappe(v.tags || "")}</pre>
          <button data-cible="g-${id}">copier</button>
        </div>

        <p class="rappel">Playlist : <strong>${echappe(v.playlist || "")}</strong></p>
      </article>`;
      })
      .join("\n");
    return `    <section>
      <h2>${echappe(cle)}</h2>
${cartes}
    </section>`;
  })
  .join("\n");

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Publication YouTube — EleveAI</title>
<style>
  :root { color-scheme: light dark; --fond:#0f1115; --carte:#171a21; --bord:#2a2f3a;
          --texte:#e8ecf3; --doux:#9aa4b6; --or:#ffd700; --bleu:#38bdf8; --vert:#00ff7f; }
  * { box-sizing: border-box; }
  body { margin:0; padding:2rem 1rem 4rem; background:var(--fond); color:var(--texte);
         font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; }
  .page { max-width: 980px; margin: 0 auto; }
  h1 { font-size:1.65rem; margin:0 0 .3rem; color:var(--or); }
  .intro { color:var(--doux); margin:0 0 2rem; }
  h1.serie { font-size:1.15rem; margin:3rem 0 .4rem; padding-top:1.4rem;
             border-top:2px solid var(--bord); color:var(--or); }
  h2 { font-size:1rem; letter-spacing:.09em; text-transform:uppercase; color:var(--bleu);
       border-bottom:1px solid var(--bord); padding-bottom:.5rem; margin:2.5rem 0 1rem; }
  .video { background:var(--carte); border:1px solid var(--bord); border-radius:12px;
           padding:1.1rem 1.2rem; margin-bottom:1.1rem; }
  .video.short { border-left:3px solid var(--vert); }
  .video.longue { border-left:3px solid var(--or); }
  .video header { display:flex; align-items:center; gap:.7rem; flex-wrap:wrap; margin-bottom:.9rem; }
  .etiquette { font-size:.7rem; font-weight:700; letter-spacing:.08em; padding:.2rem .55rem;
               border-radius:99px; background:#22283340; border:1px solid var(--bord); color:var(--doux); }
  .fichier { font-size:.76rem; color:var(--doux); word-break:break-all; }
  label { display:block; font-size:.72rem; letter-spacing:.08em; text-transform:uppercase;
          color:var(--doux); margin:.85rem 0 .3rem; }
  .champ { position:relative; }
  pre { margin:0; padding:.75rem .9rem; padding-right:5.5rem; background:#0b0d12;
        border:1px solid var(--bord); border-radius:8px; white-space:pre-wrap;
        word-break:break-word; font:13px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace; }
  button { position:absolute; top:.5rem; right:.5rem; padding:.32rem .7rem; font-size:.75rem;
           font-weight:600; cursor:pointer; border-radius:6px; border:1px solid var(--bord);
           background:#222833; color:var(--texte); }
  button:hover { border-color:var(--bleu); color:var(--bleu); }
  button.ok { border-color:var(--vert); color:var(--vert); }
  .mini, .rappel { font-size:.8rem; color:var(--doux); margin:.7rem 0 0; }
  code { background:#0b0d12; padding:.1rem .35rem; border-radius:4px; }
</style>
</head>
<body>
<div class="page">
  <h1>Publication YouTube</h1>
  <p class="intro">
    <strong>${m.videos.filter((v) => !v.serie).length}</strong> vidéos de maths seconde,
    <strong>${m.videos.filter((v) => v.serie).length}</strong> de « Maths Réel · 974 », et
    <strong>${ecriture.length}</strong> d'écriture restent à publier.
    Corriger un titre se fait dans les manifestes
    (<code>manim/manifeste-youtube.json</code>,
    <code>manim/sorties/METADONNEES-YOUTUBE.json</code>), puis
    <code>node scripts/page-publication.mjs</code> — jamais dans cette page,
    qui est régénérée.
  </p>

  <h1 class="serie">Vidéos de maths — ${m.videos.length}</h1>
  <p class="intro">
    Publier la vidéo <strong>paysage</strong> d'une notion AVANT ses shorts :
    leur description renvoie vers elle.
  </p>
${blocs}

  <h1 class="serie">La belle écriture — ${ecriture.length} à publier</h1>
  <p class="intro">
    Les <em>EN LIGNE</em> du manifeste sont masquées. Après publication, passer
    leur <code>etat</code> à <code>EN LIGNE</code> dans
    <code>METADONNEES-YOUTUBE.json</code> pour qu'elles disparaissent d'ici.
  </p>
${blocsEcriture}
</div>
<script>
  document.addEventListener("click", async (e) => {
    const b = e.target.closest("button[data-cible]");
    if (!b) return;
    const t = document.getElementById(b.dataset.cible).textContent;
    try { await navigator.clipboard.writeText(t); }
    catch { const z = document.createElement("textarea"); z.value = t;
            document.body.appendChild(z); z.select(); document.execCommand("copy"); z.remove(); }
    const avant = b.textContent;
    b.textContent = "copié"; b.classList.add("ok");
    setTimeout(() => { b.textContent = avant; b.classList.remove("ok"); }, 1200);
  });
</script>
</body>
</html>
`;

const sortie = path.join(SORTIES, "publication.html");
fs.writeFileSync(sortie, html, "utf-8");
console.log(sortie);
console.log(`maths : ${m.videos.length} vidéos (dont ${m.videos.filter((v) => v.serie).length} en 974) · écriture : ${ecriture.length} à publier.`);
