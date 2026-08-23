// scripts/apercu-canvas.mjs
//
// VÉRIFIER UN DESSIN EN LE RENDANT, PAS EN LISANT SON CODE (REGLES.md § 2 ter,
// 20/08/2026). Trois erreurs de la matinée du 20/08 — deux légendes qui se
// touchent, un pavé qui sort de son cadre, trois barres écrasées dans une carte
// — étaient invisibles à la lecture et sautaient aux yeux au rendu.
//
//   node scripts/apercu-canvas.mjs <figures.json> [sortie.html]
//
// `figures.json` : un tableau de `CanvasFigure`, ou d'objets
// `{ titre, largeurCarte, figure }` — `largeurCarte` (px) rejoue la largeur
// réelle du bloc où le dessin ira (≈ 250 px dans une carte de propriété sur
// trois colonnes, ≈ 400 px dans un exemple). C'est CE cadre-là qui décide si un
// dessin est lisible, pas la largeur du navigateur.
//
// La sortie est un fichier HTML autonome à ouvrir dans le navigateur.

import { writeFileSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const ici = dirname(fileURLToPath(import.meta.url));
const racine = resolve(ici, "..");

// `jsx: true` est indispensable : sans lui, jiti lit les `.tsx` comme du TS et
// s'arrête sur le premier `<TriangleCanvas … />`.
const jiti = createJiti(import.meta.url, {
  alias: { "@": racine },
  interopDefault: true,
  jsx: true,
});

const [, , cheminFigures, cheminSortie] = process.argv;
if (!cheminFigures) {
  console.error("usage : node scripts/apercu-canvas.mjs <figures.json> [sortie.html]");
  process.exit(1);
}

const React = await jiti.import("react", { default: true });
const { renderToStaticMarkup } = await jiti.import("react-dom/server");

// jiti compile le JSX « à l'ancienne » (`React.createElement`) alors que les
// composants, écrits pour Next, n'importent pas React. On le pose donc en
// global AVANT de charger le moindre canvas.
globalThis.React = React;

const CanvasRenderer = await jiti.import("@/lib/canvas/CanvasRenderer", {
  default: true,
});

const brut = JSON.parse(readFileSync(resolve(process.cwd(), cheminFigures), "utf8"));
const entrees = (Array.isArray(brut) ? brut : [brut]).map((e) =>
  e && e.figure ? e : { figure: e }
);

// LES LARGEURS RÉELLES DES BLOCS OÙ VONT LES DESSINS. Un canvas ne se juge pas
// « en grand » : il se juge à la largeur qu'il aura vraiment.
//   250 px — une carte de propriété, sur trois colonnes (le plus serré) ;
//   340 px — la fiche sur un TÉLÉPHONE, où tout passe sur une seule colonne ;
//   400 px — un exemple corrigé sur un écran d'ordinateur.
const CADRES_PAR_DEFAUT = [250, 340, 400];

// Un SVG se met à l'échelle de son bloc : un dessin de 600 px ramené dans 340 px
// divise TOUTES ses lettres par 1,76. Un mot écrit en 16 y arrive en 9 — c'est
// la façon la plus fréquente de rendre un dessin juste illisible, et elle ne se
// voit pas dans le code. Seuil retenu : 11 px à l'écran.
const POLICE_MINI = 11;
const alertes = [];

/* ⛔ LE SECOND DÉFAUT MUET : UN TEXTE QUI SORT DE SON `viewBox` (23/08/2026).
   Un SVG masque ce qui dépasse de son cadre. Une étiquette trop longue n'est
   donc pas « mal placée » : elle est COUPÉE, et rien ne le dit — ni le rendu
   qu'on regarde de loin, ni la mesure de police ci-dessus, qui ne s'occupe que
   de la TAILLE des lettres et jamais de la place qu'elles prennent.

   Trouvé sur la quatrième fiche de conjugaison de la 6e : `PhraseCanvas`
   calcule la largeur d'un mot sur LE MOT, pas sur la `nature` écrite au-dessus.
   « passé simple » posé sur le dernier mot d'une phrase sortait de trois
   pixels — invisible à la lecture du code, invisible sur la page.

   La largeur est une ESTIMATION (0,55 × la police par caractère, mesure d'une
   police système sans empattement) : on ne signale donc qu'au-delà de 2 px de
   débordement, pour ne pas crier sur un arrondi. */
const LARGEUR_CARACTERE = 0.55;
const MARGE_DEBORDEMENT = 2;
const debordements = [];

function verifierDebordements(titre, html) {
  const viewBox = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(html);
  if (!viewBox) return;
  const largeur = Number(viewBox[1]);
  for (const t of html.matchAll(/<text([^>]*)>([^<]*)<\/text>/g)) {
    const attrs = t[1];
    const texte = t[2].replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
    if (!texte.trim()) continue;
    const x = Number(/\bx="([\d.-]+)"/.exec(attrs)?.[1] ?? 0);
    const police = Number(/font-size="([\d.]+)"/.exec(attrs)?.[1] ?? 15);
    const ancre = /text-anchor="([a-z]+)"/.exec(attrs)?.[1] ?? "start";
    const large = texte.length * police * LARGEUR_CARACTERE;
    const gauche = ancre === "middle" ? x - large / 2 : ancre === "end" ? x - large : x;
    const droite = gauche + large;
    if (gauche < -MARGE_DEBORDEMENT || droite > largeur + MARGE_DEBORDEMENT) {
      debordements.push(
        `  · ${titre} — « ${texte} » occupe [${gauche.toFixed(0)} ; ${droite.toFixed(0)}] dans un cadre de ${largeur.toFixed(0)} px`
      );
    }
  }
}

const blocs = entrees
  .map((e, i) => {
    const html = renderToStaticMarkup(
      React.createElement(CanvasRenderer, { figure: e.figure })
    );
    verifierDebordements(e.titre ?? e.figure.kind, html);
    const cadres = e.largeurCarte ? [e.largeurCarte] : CADRES_PAR_DEFAUT;
    const viewBox = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(html);
    const largeurSvg = viewBox ? Number(viewBox[1]) : null;
    // La plus grosse police du dessin : c'est elle qui porte le texte principal.
    const polices = [...html.matchAll(/font-size="([\d.]+)"/g)].map((m) => Number(m[1]));
    const policeMax = polices.length ? Math.max(...polices) : 0;

    const vues = cadres
      .map((largeur) => {
        // Le composant a son propre plafond (`max-w-[…]`) : au-delà, il ne
        // grandit plus, donc l'échelle plafonne à 1.
        const echelle = largeurSvg ? Math.min(1, (largeur - 24) / largeurSvg) : 1;
        const effective = policeMax * echelle;
        if (effective && effective < POLICE_MINI) {
          alertes.push(
            `  · ${e.titre ?? e.figure.kind} — ${effective.toFixed(1)} px de texte dans un bloc de ${largeur} px`
          );
        }
        return `
        <figure>
          <figcaption>${largeur} px — texte à ${effective.toFixed(1)} px ${
            effective < POLICE_MINI ? "⛔" : "✅"
          }</figcaption>
          <div class="cadre" style="width:${largeur}px">${html}</div>
        </figure>`;
      })
      .join("\n");

    return `
    <section class="bloc">
      <h2>${i + 1}. ${e.titre ?? e.figure.kind}<span>dessin de ${largeurSvg ?? "?"} px</span></h2>
      <div class="vues">${vues}</div>
    </section>`;
  })
  .join("\n");

const sortie = resolve(
  process.cwd(),
  cheminSortie ?? "apercu-canvas.html"
);

writeFileSync(
  sortie,
  `<!doctype html><meta charset="utf-8"><title>Aperçu des canvas</title>
<style>
  body { margin:0; padding:24px; background:#f1f5f9; font-family:system-ui,sans-serif; color:#0f172a; }
  .bloc { margin-bottom:28px; }
  h2 { font-size:14px; margin:0 0 8px; display:flex; gap:10px; align-items:baseline; }
  h2 span { font-size:11px; font-weight:600; color:#64748b; }
  /* Deux blocs côte à côte se touchent dès qu'on ne l'a pas voulu : un écart
     franc, et le retour à la ligne dès que la largeur ne suffit plus. */
  .vues { display:flex; gap:28px 32px; align-items:flex-start; flex-wrap:wrap; }
  figure { margin:0; }
  figcaption { font-size:11px; font-weight:700; color:#64748b; margin-bottom:4px; }
  .cadre { outline:1px dashed #cbd5e1; }
  .mx-auto { margin-left:auto; margin-right:auto; }
  .w-full { width:100%; }
  .block { display:block; }
  .h-auto { height:auto; }
  .rounded-xl { border-radius:12px; }
  .border { border:1px solid #e2e8f0; }
  .border-slate-200 { border-color:#e2e8f0; }
  .bg-white { background:#fff; }
  .p-3 { padding:12px; }
  .shadow-sm { box-shadow:0 1px 2px rgba(15,23,42,.06); }
  [class*="max-w-"] { max-width:100%; }
</style>
${blocs}
`,
  "utf8"
);

console.log(`Aperçu écrit : ${sortie} (${entrees.length} figure(s))`);
if (alertes.length) {
  console.log(`\n⛔ Texte sous ${POLICE_MINI} px une fois le dessin à l'échelle :`);
  console.log([...new Set(alertes)].join("\n"));
  console.log("\n→ raccourcir la phrase, ou réduire ce que le dessin porte.");
}
if (debordements.length) {
  console.log("\n⛔ Texte hors du cadre du dessin (il sera COUPÉ, sans un mot) :");
  console.log([...new Set(debordements)].join("\n"));
  console.log("\n→ raccourcir cette étiquette : le canvas n'élargit pas son cadre pour elle.");
}
if (!alertes.length && !debordements.length) {
  console.log("✅ police et cadre : rien à signaler.");
}
