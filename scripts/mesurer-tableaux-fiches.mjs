// Les colonnes d'un tableau de fiche sont-elles alignées ?
//
// ⛔ CE QUI A RENDU CE SCRIPT NÉCESSAIRE, le 09/09/2026. `TableauDonneesCanvas`
// ajoute LUI-MÊME un `<th>` « Données » dès qu'une ligne porte un `label`. Un
// `headers` qui commence par une chaîne vide crée donc une colonne de PLUS que
// de valeurs, et tout glisse d'un cran : la direction s'affiche sous la colonne
// vide, la norme sous « sens », et la dernière colonne reste blanche.
// 84 tableaux étaient dans ce cas, dans les 7 fiches de seconde. C'est Frédéric
// qui l'a vu sur une capture d'écran, pas un outil.
//
// ⛔ ET POURQUOI ON MESURE LE RENDU ET NON LE SOURCE. Ma première sonde lisait
// les appels au helper `tableau(...)` à l'expression régulière. Elle annonçait
// « 0 défaut » APRÈS réparation — alors qu'il en restait : `[^\]]*` s'arrête au
// premier crochet fermant, donc un en-tête comme « milieu de [AB] » lui était
// invisible. Le DOM, lui, ne se trompe pas sur le nombre de cellules.
//
// Usage : node scripts/mesurer-tableaux-fiches.mjs <origine> <matiere> <classe>
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const ORIGINE = process.argv[2] ?? "http://localhost:3000";
const MATIERE = process.argv[3] ?? "maths";
const CLASSE = process.argv[4] ?? "seconde";

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

const navigateur = await chromium.launch({ channel: "chrome" });
let enDefaut = 0;

for (const notion of NOTIONS) {
  const page = await navigateur.newPage({ viewport: { width: 1280, height: 900 } });
  const defauts = [];
  let nbTableaux = 0;

  try {
    await page.goto(`${ORIGINE}/fiches-cours/${MATIERE}/${CLASSE}/${notion}`, {
      waitUntil: "networkidle",
      timeout: 45000,
    });

    const mesure = await page.evaluate(() => {
      const out = [];
      for (const table of document.querySelectorAll("table")) {
        // ⚠️ `fonction_tableau` n'a PAS de `<thead>` : ses deux lignes « x » et
        // « f(x) » sont le tableau tout entier. Le compter ici donnait
        // « 0 en-tête pour 6 cellules » sur des tableaux parfaitement corrects
        // — 27 faux défauts sur deux fiches. On ne mesure que les tableaux qui
        // déclarent un en-tête.
        if (!table.querySelector("thead")) continue;
        const entetes = table.querySelectorAll("thead th").length;
        const lignes = [...table.querySelectorAll("tbody tr")].map(
          (tr) => tr.querySelectorAll("td, th").length,
        );
        // Le titre du tableau aide a le nommer dans le rapport.
        const bloc = table.closest("div");
        const titre = (bloc?.innerText || "").split("\n")[0].slice(0, 40);
        out.push({ entetes, lignes, titre });
      }
      return out;
    });

    nbTableaux = mesure.length;
    for (const t of mesure) {
      for (const n of t.lignes) {
        if (n !== t.entetes) {
          defauts.push(`« ${t.titre} » : ${t.entetes} en-têtes pour ${n} cellules`);
          break;
        }
      }
    }
  } catch (e) {
    defauts.push(`INJOIGNABLE : ${String(e).split("\n")[0].slice(0, 70)}`);
  }

  if (defauts.length) enDefaut += 1;
  console.log(
    `${defauts.length ? "⛔" : "✅"} ${notion.padEnd(32)} ${String(nbTableaux).padStart(2)} tableau(x)`,
  );
  defauts.slice(0, 4).forEach((d) => console.log(`      ${d}`));
  if (defauts.length > 4) console.log(`      … et ${defauts.length - 4} autres`);
  await page.close();
}

console.log(
  `\ntableaux ${MATIERE} ${CLASSE} — ${NOTIONS.length} fiches, ${enDefaut} en défaut.`,
);
await navigateur.close();
