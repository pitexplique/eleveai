// Mesure TOUTES les fiches d'une classe, aux deux largeurs, en une seule passe.
//
// ⛔ POURQUOI CE SCRIPT (02/09/2026). Le contrôle des fiches se faisait à la main,
// page par page, dans la console du navigateur : deux largeurs, quatre mesures,
// une fiche à la fois. Acceptable pour une fiche qu'on vient d'écrire ; impossible
// pour une classe entière — et c'est justement ce qu'il fallait refaire, la 4e et
// la 5e n'ayant jamais été remesurées depuis l'arrivée de KaTeX (26/08) et de la
// typographie insécable (31/08). Trente-trois fiches à la main, personne ne le
// fait ; alors personne ne sait.
//
// Ce qu'il mesure, exactement comme le mesureur de console :
//   · la POLICE FINALE de chaque <text> d'un SVG, une fois le dessin mis à
//     l'échelle de son bloc : police × largeurAffichée ÷ largeurViewBox.
//     Plancher : 11 px.
//   · les CHEVAUCHEMENTS entre deux <text> d'un même dessin ;
//   · les DÉBORDEMENTS d'un <text> hors de son <svg> ;
//   · les ERREURS KaTeX (`.katex-error`) et les DOLLARS restés visibles,
//     c'est-à-dire du LaTeX affiché en clair à l'élève ;
//   · les erreurs de console.
//
// ⚠️ Il IGNORE les <svg> internes de KaTeX : une fraction rendue en contient, et
// les compter reviendrait à mesurer la typographie comme si c'était un dessin.
// ⚠️ Il ne voit PAS le canvas `algebre`, qui rend en HTML et non en SVG — celui-là
// se contrôle à l'œil (voir docs/prompt-maths-4e-suite.md).
//
// Usage : node scripts/mesurer-fiches.mjs <origine> <matiere> <classe>
//         node scripts/mesurer-fiches.mjs http://localhost:3100 maths 4e
// Sortie 1 si une fiche a le moindre défaut.

import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const ORIGINE = process.argv[2] ?? "http://localhost:3100";
const MATIERE = process.argv[3] ?? "maths";
const CLASSE = process.argv[4] ?? "4e";

const DOSSIER = path.resolve(`app/fiches-cours/${MATIERE}/${CLASSE}`);
if (!fs.existsSync(DOSSIER)) {
  console.error(`Aucun dossier ${DOSSIER}`);
  process.exit(1);
}

const NOTIONS = fs
  .readdirSync(DOSSIER, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

// Le mesureur, exécuté DANS la page. Identique à celui de la passation.
const MESUREUR = () => {
  const out = {
    petites: [],
    chevauchements: [],
    debordements: [],
    erreursKatex: document.querySelectorAll(".katex-error").length,
    dollars: (document.body.innerText.match(/\$/g) || []).length,
    nbDessins: 0,
    minPx: 99,
  };
  document.querySelectorAll("svg").forEach((svg) => {
    const r = svg.getBoundingClientRect();
    if (r.width < 60 || svg.closest(".katex")) return;
    out.nbDessins++;
    const vb = svg.viewBox?.baseVal?.width || r.width;
    const ratio = r.width / vb;
    const T = [...svg.querySelectorAll("text")];
    T.forEach((t) => {
      const f = (parseFloat(getComputedStyle(t).fontSize) || 0) * ratio;
      if (f > 0 && f < out.minPx) out.minPx = Math.round(f * 10) / 10;
      if (f > 0 && f < 11)
        out.petites.push(((t.textContent || "").slice(0, 16) || "?") + " " + Math.round(f * 10) / 10);
      const b = t.getBoundingClientRect();
      if (b.width && (b.left < r.left - 1 || b.right > r.right + 1 || b.top < r.top - 1 || b.bottom > r.bottom + 1))
        out.debordements.push((t.textContent || "").slice(0, 16));
    });
    for (let a = 0; a < T.length; a++)
      for (let b = a + 1; b < T.length; b++) {
        const x = T[a].getBoundingClientRect();
        const y = T[b].getBoundingClientRect();
        if (x.width && y.width && x.left < y.right && y.left < x.right && x.top < y.bottom && y.top < x.bottom)
          out.chevauchements.push(
            (T[a].textContent || "").slice(0, 12) + " / " + (T[b].textContent || "").slice(0, 12),
          );
      }
  });
  return out;
};

const LARGEURS = [
  { nom: "375", width: 375, height: 900 },
  { nom: "1280", width: 1280, height: 900 },
];

const navigateur = await chromium.launch({ channel: "chrome" });
let enDefaut = 0;
const rapport = [];

for (const notion of NOTIONS) {
  const url = `${ORIGINE}/fiches-cours/${MATIERE}/${CLASSE}/${notion}`;
  const ligne = { notion, defauts: [], minPx: 99, dessins: 0, console: 0 };

  for (const l of LARGEURS) {
    const page = await navigateur.newPage({ viewport: { width: l.width, height: l.height } });
    const erreursConsole = [];

    // ⛔ UN 404 QUI N'EST PAS UN DÉFAUT, et qui noyait tout le rapport : sur 22
    // des 33 fiches de 4e, la seule « erreur » était celle-ci. En développement,
    // Next demande spéculativement le chunk de `layout` de CHAQUE segment de
    // l'URL — y compris `app/fiches-cours/maths/`, qui a une `page.tsx` mais pas
    // de `layout.tsx`. La requête échoue, la console crie, et il ne se passe
    // rien. En production le chunk n'est jamais demandé, puisqu'aucun fichier ne
    // l'engendre. On le filtre, sinon le rapport devient illisible et on cesse
    // de le lire — ce qui est pire que de ne pas mesurer.
    // ⛔ ON N'ÉCOUTE QUE LES VRAIES ERREURS JAVASCRIPT (`pageerror`), et rien du
    // réseau. Deux passes l'ont montré : en développement, tout ce qui touche au
    // réseau est du bruit, et il noyait le rapport.
    //   · Next demande spéculativement le chunk de `layout` de CHAQUE segment de
    //     l'URL — y compris `app/fiches-cours/maths/`, qui a une `page.tsx` mais
    //     pas de `layout.tsx`. 404, sans conséquence, et absent en production.
    //   · Le rechargement à chaud redemande `page.css?v=<horodatage>` et AVORTE
    //     la requête précédente. Un échec annulé n'est pas une panne.
    // Un rapport qu'on cesse de lire est pire qu'une absence de mesure : on garde
    // le seul signal qui dit qu'une page est vraiment cassée.
    page.on("pageerror", (e) => erreursConsole.push(String(e).slice(0, 90)));

    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      const m = await page.evaluate(MESUREUR);
      ligne.dessins = Math.max(ligne.dessins, m.nbDessins);
      ligne.minPx = Math.min(ligne.minPx, m.minPx);
      ligne.console += erreursConsole.length;
      if (m.petites.length) ligne.defauts.push(`${l.nom}px · ${m.petites.length} sous 11px : ${m.petites.slice(0, 3).join(", ")}`);
      if (m.chevauchements.length) ligne.defauts.push(`${l.nom}px · ${m.chevauchements.length} chevauchement(s) : ${m.chevauchements.slice(0, 2).join(" | ")}`);
      if (m.debordements.length) ligne.defauts.push(`${l.nom}px · ${m.debordements.length} débordement(s) : ${m.debordements.slice(0, 3).join(", ")}`);
      if (m.erreursKatex) ligne.defauts.push(`${l.nom}px · ${m.erreursKatex} formule(s) KaTeX en erreur`);
      if (m.dollars) ligne.defauts.push(`${l.nom}px · ${m.dollars} dollar(s) visible(s) — du LaTeX en clair`);
      if (erreursConsole.length) ligne.defauts.push(`${l.nom}px · console : ${erreursConsole[0]}`);
    } catch (e) {
      ligne.defauts.push(`${l.nom}px · INJOIGNABLE : ${String(e).split("\n")[0].slice(0, 70)}`);
    }
    await page.close();
  }

  if (ligne.defauts.length) enDefaut++;
  rapport.push(ligne);
  const etat = ligne.defauts.length ? "⛔" : "✅";
  console.log(
    `${etat} ${notion.padEnd(32)} ${String(ligne.dessins).padStart(2)} dessins · min ${String(ligne.minPx).padStart(4)} px`,
  );
  ligne.defauts.forEach((d) => console.log(`      ${d}`));
}

await navigateur.close();

console.log(
  `\n${MATIERE} ${CLASSE} — ${NOTIONS.length} fiches mesurées, ${enDefaut} en défaut.`,
);
const pire = rapport.reduce((a, b) => (b.minPx < a.minPx ? b : a), rapport[0]);
console.log(`Plus petite police du lot : ${pire.minPx} px (${pire.notion}).`);
process.exit(enDefaut ? 1 : 0);
