/**
 * Fabrique le PDF d'une fiche de cours — un vrai fichier, pas une boîte
 * d'impression.
 *
 * ── POURQUOI CE SCRIPT EXISTE (23/08/2026) ───────────────────────────────────
 * Le bouton « Télécharger en PDF » des fiches appelait `window.print()`. Sur un
 * ordinateur on peut y choisir « Enregistrer en PDF » ; sur un téléphone on
 * tombe sur une boîte d'impression et on n'a pas d'imprimante. Le bouton
 * promettait un fichier que le site ne produisait pas.
 *
 * ── POURQUOI CHROME, ET PAS PDFKIT ───────────────────────────────────────────
 * `scripts/build-ebook.ts` fabrique le livre d'IA avec pdfkit, depuis la
 * DONNÉE. Impossible ici : ce qui fait la valeur d'une fiche depuis le standard
 * du 19/08, ce sont ses dessins — un visuel par bloc — et ce sont des SVG
 * écrits dans des composants React. pdfkit n'en verrait pas un seul, et rendrait
 * un cours recopié.
 * Chrome, lui, rend la page telle qu'elle est. Et la feuille d'impression
 * existe déjà (FicheCoursClient.tsx) : elle masque l'en-tête, le pied de page
 * et les boutons, retire les icônes, et surtout DÉPLIE les corrections rangées
 * derrière « Voir la correction ». Le PDF est donc littéralement un cours avec
 * ses exercices corrigés.
 *
 * ── POURQUOI `playwright-core` ET PAS `playwright` ───────────────────────────
 * `playwright` télécharge ses propres navigateurs (~300 Mo). `playwright-core`
 * fait 14 Mo et pilote le Chrome DÉJÀ INSTALLÉ sur la machine (`channel:
 * "chrome"`). C'est une dépendance de développement : elle ne part jamais en
 * production, puisque les PDF, eux, sont fabriqués ici et servis en statique.
 *
 * ⛔ NE PAS DÉPLACER CETTE GÉNÉRATION SUR VERCEL. Un Chrome en fonction
 * serverless, c'est 50 Mo de paquet, plusieurs secondes de démarrage à froid, et
 * une facture à chaque requête — sur un site dont le quota se compte au poids
 * relu. Un fichier statique coûte zéro à l'exécution, se met en cache, et Google
 * l'indexe comme un document à part entière.
 *
 * ── USAGE ────────────────────────────────────────────────────────────────────
 *   1. lancer le site en local (npm run dev), noter le port ;
 *   2. node --experimental-strip-types scripts/build-fiches-pdf.ts \
 *        http://localhost:3000 /fiches-cours/maths/6e/fraction-nombre
 *
 * Sans chemin, le script ne fait rien : tant que l'étalon n'est pas validé, on
 * ne fabrique pas cent quatre fichiers.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { nomPdf } from "../lib/fiches/pdf.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SORTIE = path.join(__dirname, "..", "public", "fiches");

// ⚠️ LA RÈGLE DE NOMMAGE N'EST PAS ICI : elle est dans lib/fiches/pdf.ts, parce
// que le composant qui pose le LIEN vers ces fichiers doit l'appliquer à
// l'identique. Deux copies, c'est un lien mort au premier changement.

async function main() {
  const [origine, ...chemins] = process.argv.slice(2);
  if (!origine || chemins.length === 0) {
    console.error(
      "usage : node --experimental-strip-types scripts/build-fiches-pdf.ts <origine> <chemin> [chemin…]",
    );
    process.exit(1);
  }

  fs.mkdirSync(SORTIE, { recursive: true });

  // ⚠️ `channel: "chrome"` — le navigateur du poste. Sans lui, playwright-core
  // cherche un binaire qu'il n'a pas téléchargé et échoue avec un message qui
  // parle d'installation.
  /** Les fichiers dont une grandeur est sortie du domaine — récapitulés à la fin,
   *  parce qu'une alerte noyée dans cent lignes de sortie n'est pas une alerte. */
  const aSignaler: string[] = [];

  const navigateur = await chromium.launch({ channel: "chrome" });
  const page = await navigateur.newPage();

  // ⭐ UN CHARGEMENT D'ÉCHAUFFEMENT, ET IL EST JETÉ — L'EFFET DE RANG EST RÉEL.
  // Mesuré : la toute première page rendue dans un Chrome neuf sort à 7 pages et
  // 1 258 Ko, contre 5 pages et 214 Ko pour la même page au deuxième passage.
  // Polices pas encore en cache, images pas encore servies par le serveur de
  // développement — la première mesure d'une série décrit l'outil qui démarre,
  // pas l'objet qu'on mesure. Sans cette ligne, la première fiche de chaque
  // fournée serait la seule mauvaise, et personne ne saurait pourquoi.
  await page.goto(`${origine}${chemins[0]}`, { waitUntil: "networkidle" });

  for (const chemin of chemins) {
    const url = `${origine}${chemin}`;
    // ⚠️ `networkidle` ET NON `load` : la fiche est un composant client, donc
    // rien n'est à l'écran tant que React n'a pas hydraté. `load` rendrait un
    // PDF de page blanche, et il faudrait ouvrir le fichier pour s'en apercevoir.
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForSelector("h1");

    // ⚠️ LE NOM DU FICHIER NE SE LIT PLUS DANS LE TEXTE DU H1 (25/08/2026). Le
    // h1 affiche désormais « Les angles — cours de maths 6e » : le prendre tel
    // quel aurait produit « angles-cours-de-maths-6e-6e-cours-exercices-
    // corriges.pdf » et rendu orphelins les 87 PDF déjà publiés et indexés.
    // `data-titre-pdf` porte le titre NU (« Les angles »), celui-là même que
    // `urlPdf()` utilise pour poser le lien : les deux ne peuvent plus diverger,
    // et le titre est libre de changer d'habillage.
    // Le repli sur le texte reste, pour les pages qui n'ont pas l'attribut.
    const titre =
      (await page.getAttribute("h1", "data-titre-pdf"))?.trim() ||
      (await page.textContent("h1"))?.trim() ||
      "fiche";
    // La classe se lit dans le chemin : /fiches-cours/<matiere>/<classe>/<notion>
    const classe = chemin.split("/")[3] ?? "";

    // ⚠️ ON FORCE LE MÉDIA « print » AVANT d'appeler `pdf()`. Chrome le fait
    // déjà pour l'impression, mais l'expliciter évite qu'un composant qui lit
    // `matchMedia` se retrouve dans l'autre état au moment du rendu.
    await page.emulateMedia({ media: "print" });

    // ⭐ ON DÉCLENCHE `beforeprint`, PAR PRÉCAUTION — ET NON PARCE QUE C'EST
    // INDISPENSABLE. Cette nuance a coûté trois séries de mesures, elle vaut
    // d'être écrite.
    //
    // Les corrections vivent dans des `<details>` repliés, et
    // components/fiches/PrintCorrections.tsx les ouvre sur `beforeprint` —
    // événement que `window.print()` émet et que `page.pdf()` n'émet pas. J'en
    // ai conclu que le PDF sortait sans les corrigés. C'ÉTAIT FAUX : je lisais
    // l'attribut `open` du DOM APRÈS `page.pdf()`, or Chrome émet `afterprint`
    // en fin de génération et PrintCorrections referme tout. Je mesurais l'état
    // d'après, pas l'état pendant.
    //
    // Le contrôle négatif a tranché — retirer physiquement les corrections de
    // la page fait perdre une page et 337 px de hauteur, les rajouter les rend :
    //     témoin       5 p  219 216 o  3969 px
    //     beforeprint  5 p  219 216 o  3969 px   ← rigoureusement identique
    //     sans_corr    4 p  215 459 o  3632 px
    // Autrement dit la feuille d'impression rend déjà les corrections quel que
    // soit `open`, et cette ligne ne change rien de mesurable aujourd'hui.
    //
    // ✅ ON LA GARDE QUAND MÊME, pour une raison écrite dans PrintCorrections :
    // « sur les Chrome récents, un <details> fermé masque son contenu d'une
    // façon que le CSS ne force plus ». Le jour où ce Chrome-là sera celui de la
    // machine, le CSS lâchera et l'événement sera la seule parade. Une ligne
    // sans effet mesurable qui protège d'une régression connue n'est pas du
    // bruit — mais elle ne doit pas se faire passer pour la raison du succès.
    await page.evaluate(() => window.dispatchEvent(new Event("beforeprint")));

    // ⭐ ON ATTEND QUE LA FEUILLE D'IMPRESSION SOIT RÉELLEMENT APPLIQUÉE
    // (24/08/2026) — et on le MESURE, on ne le suppose pas.
    //
    // Le défaut : `networkidle` dit que le réseau s'est tu, pas que React a
    // monté ses composants. Sur les deux pages les plus lourdes du site
    // (« algorithmique et programmation » en 5ᵉ, « calculer avec les
    // fractions »), Chrome a imprimé AVANT que le `<style jsx global>` de
    // FicheCoursClient soit dans le document. Résultat mesuré : le pied de page
    // du site dans le PDF, zéro correction rendue, et le poids qui passe de
    // 1 057 à 1 562 Ko. Les 56 autres fiches, plus légères, passaient — c'est
    // un défaut de RÉPÉTABILITÉ, celui qui ne se voit que sur une partie du lot.
    //
    // ⚠️ LA CONDITION PORTE SUR LA GRANDEUR, PAS SUR UN INDICE. On n'attend ni
    // un délai fixe, ni la présence d'une balise `<style>` : on attend que
    // l'en-tête soit EFFECTIVEMENT calculé à `display: none`, c'est-à-dire la
    // chose même dont dépend le rendu. Un `waitForTimeout(500)` aurait marché
    // aujourd'hui et lâché le jour où la machine est chargée.
    await page.waitForFunction(
      () => {
        const h = document.querySelector("body > header");
        return !!h && getComputedStyle(h).display === "none";
      },
      undefined,
      { timeout: 20000 },
    );

    // ⚠️ LA MESURE SE PREND AVANT `page.pdf()`, PAS APRÈS. Chrome émet
    // `afterprint` en fin de génération, et la page revient à son état d'écran :
    // tout ce qu'on lit ensuite décrit une page qu'on n'a pas imprimée. C'est
    // l'erreur qui m'a fait diagnostiquer deux défauts qui n'existaient pas.
    //
    // ⚠️ ET ON NE MESURE PAS L'ATTRIBUT `open` DES CORRECTIONS. Il ne dit rien
    // du PDF : la feuille d'impression les rend visibles ouvertes ou fermées
    // (contrôle négatif ci-dessus). Ce qui se mesure vraiment, c'est la HAUTEUR
    // RENDUE du bloc de correction — s'il occupe zéro pixel, il n'est pas dans
    // le fichier, et là seulement il y a un problème.
    const mesure = await page.evaluate(() => {
      const corrections = [...document.querySelectorAll(".fiche-correction")];
      return {
        corrections: corrections.length,
        rendues: corrections.filter((d) => (d as HTMLElement).offsetHeight > 20).length,
        // Le pied de page du site DANS un PDF de fiche serait la faute la plus
        // visible : deux pages de plan de site agrafées à un cours.
        piedVisible:
          getComputedStyle(document.querySelector("body > footer") as Element).display !== "none",
        blocs: document.querySelectorAll("h2").length,
        hauteur: document.body.scrollHeight,
      };
    });

    const fichier = path.join(SORTIE, nomPdf(titre, classe));
    await page.pdf({
      path: fichier,
      format: "A4",
      // Les aplats de couleur des blocs (la définition en bleu, les pièges en
      // ambre) portent le sens : sans eux la fiche imprimée est grise et
      // illisible. C'est le réglage que la boîte d'impression appelle
      // « Graphiques d'arrière-plan », et que personne ne coche.
      printBackground: true,
      margin: { top: "10mm", bottom: "12mm", left: "10mm", right: "10mm" },
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      // Le pied de page porte la source et la pagination : une fiche imprimée
      // circule de main en main, souvent loin du site.
      footerTemplate:
        '<div style="width:100%;font-size:8px;color:#64748b;padding:0 10mm;display:flex;justify-content:space-between;">' +
        "<span>eleveai.fr</span><span class='pageNumber'></span></div>",
    });

    // ── ⭐ LA MESURE, FICHE PAR FICHE — ET C'EST LE CŒUR DU SCRIPT ────────────
    //
    // Un étalon unique ne valide que la PROCÉDURE, jamais la population :
    // chaque fiche est une matrice différente. Certaines n'ont pas de bloc
    // `formule` (les probabilités), le nombre de corrections varie, le français
    // porte le canvas de la phrase et le maths des figures — pas les mêmes SVG,
    // pas les mêmes poids. Autrement dit les courbes d'étalonnage ne sont pas
    // parallèles, et une validation sur « Les fractions » ne se transporte pas
    // sur « L'impératif et le conditionnel ».
    //
    // On ne valide donc pas à l'œil sur un exemplaire : on relève quatre
    // grandeurs sur CHAQUE fichier produit, et on signale ce qui sort du
    // domaine. Un PDF fabriqué en série qu'aucune mesure n'accompagne, c'est
    // 104 fichiers dont personne ne saura jamais lequel est vide.
    const octets = fs.statSync(fichier).size;
    const ko = Math.round(octets / 1024);
    const pages = (fs.readFileSync(fichier).toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? [])
      .length;

    // Le domaine de validité, tenu large exprès : on cherche l'accident, pas la
    // conformité au millimètre. Une fiche de deux pages est normale, une de
    // zéro page ou de quinze ne l'est pas.
    const alertes = [
      pages < 1 || pages > 12 ? `${pages} pages` : null,
      ko < 30 ? `${ko} Ko — trop léger, page probablement vide` : null,
      mesure.corrections > 0 && mesure.rendues < mesure.corrections
        ? `${mesure.rendues}/${mesure.corrections} corrections rendues`
        : null,
      mesure.piedVisible ? "le pied de page du site est resté" : null,
      mesure.blocs < 4 ? `${mesure.blocs} titres de bloc` : null,
    ].filter(Boolean);

    console.log(
      `${String(pages).padStart(2)} p  ${String(ko).padStart(4)} Ko  ` +
        `${String(mesure.rendues)}/${mesure.corrections} corr.  ` +
        `${String(mesure.blocs).padStart(2)} blocs  ${path.basename(fichier)}` +
        (alertes.length ? `\n      ⚠️  ${alertes.join(" · ")}` : ""),
    );
    if (alertes.length) aSignaler.push(path.basename(fichier));
  }

  await navigateur.close();

  // ⭐ LE MANIFESTE — la liste de ce qui EXISTE vraiment.
  //
  // Sans lui, le bouton d'une fiche pointerait vers un PDF pas encore fabriqué
  // et rendrait un 404 : le pire des deux mondes, puisqu'on aurait remplacé une
  // boîte d'impression qui marche à moitié par un lien qui ne marche pas du
  // tout. Le composant lit cette liste et ne montre le téléchargement que pour
  // les fiches qui l'ont.
  //
  // ⚠️ ON RELIT LE DOSSIER, on ne se fie pas à ce qu'on vient de produire : si
  // une fournée précédente a fabriqué d'autres fiches, elles comptent aussi.
  const presents = fs
    .readdirSync(SORTIE)
    .filter((f) => f.endsWith(".pdf"))
    .sort();
  const lignes = [
    "// ⚠️ FICHIER GÉNÉRÉ — ne pas éditer à la main.",
    "// Produit par scripts/build-fiches-pdf.ts, qui relit public/fiches/.",
    "// Il dit quelles fiches ont vraiment leur PDF : le bouton de",
    "// téléchargement ne s'affiche que pour celles-là.",
    "export const PDF_DISPONIBLES = new Set<string>([",
    ...presents.map((f) => `  ${JSON.stringify(f)},`),
    "]);",
    "",
  ];
  fs.writeFileSync(
    path.join(__dirname, "..", "lib", "fiches", "pdf-disponibles.ts"),
    lignes.join("\n"),
  );
  console.log(`
${presents.length} PDF dans public/fiches/ — manifeste réécrit.`);

  if (aSignaler.length) {
    console.log(`\n⚠️  ${aSignaler.length} fichier(s) hors domaine :`);
    aSignaler.forEach((f) => console.log("   " + f));
    // ⚠️ On SORT EN ERREUR : un script de fabrication qui signale un problème
    // et rend 0 se fait ignorer par tout ce qui l'appelle, à commencer par la
    // personne qui lit la dernière ligne.
    process.exitCode = 1;
  } else {
    console.log("\n✅ toutes les mesures sont dans le domaine.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
