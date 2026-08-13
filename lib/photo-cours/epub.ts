// lib/photo-cours/epub.ts
//
// LE COURS PHOTOGRAPHIÉ, EN LIVRE (Frédéric, 13/08 : « comme un epub », puis
// « toutes les données à ta disposition avec le margouillat et eleveai.fr »).
//
// ⭐ POURQUOI UN FICHIER ET PAS SEULEMENT UNE PAGE.
// Une page se ferme. Un fichier se garde, se lit dans le train sans réseau,
// s'envoie à l'élève absent, se retrouve trois mois plus tard avant le brevet.
// C'est aussi la seule forme sous laquelle le travail d'un professeur sort
// d'EleveAI sans nous appartenir.
//
// ⚠️ EPUB SEUL POUR L'INSTANT, PAS DE PDF. `pdfkit` (utilisé par
// scripts/build-ebook.ts) charge ses métriques de polices depuis des fichiers
// .afm sur le disque : ça marche dans un script Node lancé à la main, c'est le
// piège classique en serverless où l'arborescence est reconstruite. L'EPUB,
// lui, n'est qu'un zip de XHTML — aucune dépendance au système de fichiers,
// sauf l'image de couverture, qu'on rend facultative.
//
// ⚠️ Ce fichier ne fabrique QUE le livre. Il n'appelle aucun modèle et ne lit
// aucune base : on lui donne un cours et un document, il rend des octets.

import JSZip from "jszip";
import fs from "node:fs";
import path from "node:path";

const SITE = "eleveai.fr";

// ⭐ La devise en toutes lettres (Frédéric, 13/08). ⛔ Pas le sigle « ε → ∞ » :
// il passerait ici — l'EPUB est en UTF-8 — mais pas dans le PDF, dont les
// polices standard n'ont ni epsilon grec ni flèche. Deux formats du même
// document qui ne signent pas pareil, c'est un détail qui se voit.
const DEVISE = "des epsilons engendrent des infinis";

export type LivreArgs = {
  /** Le cours relu et validé par la personne. */
  cours: string;
  /** Le document produit (Markdown). */
  document: string;
  /** Ce qui a été demandé : « Interroge-moi », « Des exercices »… */
  intitule: string;
  classe?: string | null;
  matiere?: string | null;
  notion?: string | null;
  /** ⚠️ Passée par l'appelant : `new Date()` n'a rien à faire dans une fabrique. */
  date: Date;
};

/* ── Markdown → XHTML ────────────────────────────────────────────────────── */
//
// ⚠️ UN CONVERTISSEUR MAISON, ET C'EST ASSUMÉ. On ne traite pas du Markdown
// quelconque : on traite CELUI QU'ON A DEMANDÉ dans les prompts — titres,
// listes, gras, traits de séparation. Ajouter une dépendance de 200 Ko pour
// gérer les notes de bas de page et les images distantes que nos prompts
// interdisent, c'est payer pour du risque.
//
// ⚠️ XHTML STRICT : un EPUB dont une balise n'est pas fermée ne s'ouvre pas du
// tout — les liseuses ne pardonnent pas ce que les navigateurs corrigent.

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Gras et italique, une fois le texte déjà échappé. */
function enligne(s: string): string {
  return esc(s)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

export function markdownVersXhtml(md: string): string {
  const lignes = md.replace(/\r\n/g, "\n").split("\n");
  const sortie: string[] = [];
  let liste: "ul" | "ol" | null = null;
  let paragraphe: string[] = [];

  function viderParagraphe() {
    if (paragraphe.length) {
      sortie.push(`<p>${enligne(paragraphe.join(" "))}</p>`);
      paragraphe = [];
    }
  }
  function fermerListe() {
    if (liste) {
      sortie.push(`</${liste}>`);
      liste = null;
    }
  }
  function ouvrirListe(type: "ul" | "ol") {
    if (liste !== type) {
      fermerListe();
      sortie.push(`<${type}>`);
      liste = type;
    }
  }

  for (let i = 0; i < lignes.length; i++) {
    const ligne = lignes[i].trimEnd();

    if (!ligne.trim()) {
      viderParagraphe();
      fermerListe();
      continue;
    }

    // ── TABLEAUX (GFM). ⚠️ Ajoutés après coup : la première version les
    // laissait passer en paragraphe, et « | Question | Barème | | --- | »
    // s'affichait tel quel dans le livre. Or les prompts DEMANDENT des
    // barèmes, et un barème sort presque toujours en tableau.
    // La signature d'un tableau, c'est la ligne de séparation en dessous.
    const suivante = (lignes[i + 1] ?? "").trim();
    if (
      ligne.trim().startsWith("|") &&
      /^\|?[\s:|-]+\|[\s:|-]*$/.test(suivante) &&
      suivante.includes("-")
    ) {
      viderParagraphe();
      fermerListe();

      const cellules = (l: string) =>
        l
          .trim()
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((c) => c.trim());

      const entete = cellules(ligne);
      const corps: string[][] = [];
      let j = i + 2;
      while (j < lignes.length && lignes[j].trim().startsWith("|")) {
        corps.push(cellules(lignes[j]));
        j++;
      }
      i = j - 1;

      sortie.push("<table>");
      sortie.push(
        `<thead><tr>${entete.map((c) => `<th>${enligne(c)}</th>`).join("")}</tr></thead>`
      );
      if (corps.length) {
        sortie.push(
          `<tbody>${corps
            .map((r) => `<tr>${r.map((c) => `<td>${enligne(c)}</td>`).join("")}</tr>`)
            .join("")}</tbody>`
        );
      }
      sortie.push("</table>");
      continue;
    }

    const titre = /^(#{1,6})\s+(.*)$/.exec(ligne);
    if (titre) {
      viderParagraphe();
      fermerListe();
      // On plafonne à h3 : au-delà, une liseuse n'a plus de taille distincte à
      // proposer et tout se ressemble.
      const n = Math.min(titre[1].length, 3);
      sortie.push(`<h${n}>${enligne(titre[2])}</h${n}>`);
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(ligne.trim())) {
      viderParagraphe();
      fermerListe();
      sortie.push("<hr/>");
      continue;
    }

    const puce = /^\s*[-*+]\s+(.*)$/.exec(ligne);
    if (puce) {
      viderParagraphe();
      ouvrirListe("ul");
      sortie.push(`<li>${enligne(puce[1])}</li>`);
      continue;
    }

    const numero = /^\s*\d+[.)]\s+(.*)$/.exec(ligne);
    if (numero) {
      viderParagraphe();
      ouvrirListe("ol");
      sortie.push(`<li>${enligne(numero[1])}</li>`);
      continue;
    }

    if (liste) fermerListe();
    paragraphe.push(ligne.trim());
  }

  viderParagraphe();
  fermerListe();
  return sortie.join("\n");
}

/** Le cours relu : pas du Markdown, du texte tel que la personne l'a laissé. */
function coursVersXhtml(texte: string): string {
  return texte
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((bloc) => `<p>${esc(bloc.trim()).replace(/\n/g, "<br/>")}</p>`)
    .join("\n");
}

/* ── Le livre ────────────────────────────────────────────────────────────── */

/**
 * Une page du livre.
 *
 * ⭐ `signe` ajoute le pied : Ti Margo en petit, l'adresse et la devise. Un
 * EPUB n'a pas de pied de page fixe comme un PDF — la pagination appartient à
 * la liseuse — alors on signe la FIN de chaque chapitre. La couverture, elle,
 * porte déjà tout ça en grand : la signer deux fois serait bavard.
 */
function page(
  titre: string,
  corps: string,
  opts: { classe?: string; signe?: boolean; margouillat?: boolean } = {}
): string {
  const pied = opts.signe
    ? `\n<p class="signature">${
        opts.margouillat
          ? '<img src="ti-margo.png" alt=""/> '
          : ""
      }${SITE} · ${esc(DEVISE)}</p>`
    : "";
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="fr" xml:lang="fr">
<head><meta charset="utf-8"/><title>${esc(titre)}</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body${opts.classe ? ` class="${opts.classe}"` : ""}>
${corps}${pied}
</body></html>`;
}

const STYLE = `
/* Les mêmes partis pris qu'à l'écran : colonne étroite, serif, de l'air.
   Une liseuse impose sa largeur — on ne fixe donc pas de max-width, on règle
   l'interligne et les marges, qui sont ce qui reste sous notre contrôle. */
body { font-family: Georgia, "Times New Roman", serif; line-height: 1.65; margin: 5%; color: #1d1c16; }
h1 { font-size: 1.7em; line-height: 1.2; margin: 0 0 .3em; }
h2 { font-size: 1.25em; margin: 1.8em 0 .5em; }
h3 { font-size: 1.05em; margin: 1.4em 0 .4em; }
p { margin: 0 0 .9em; text-align: justify; }
ul, ol { margin: 0 0 1em 1.2em; padding: 0; }
li { margin: 0 0 .5em; }
hr { border: 0; border-top: 1px solid #d8d4cc; margin: 2em 0; }
code { font-family: "DejaVu Sans Mono", Consolas, monospace; font-size: .92em; }
/* Les barèmes et les corrigés sortent en tableau. Une liseuse a peu de largeur :
   pas de bordures verticales, juste des filets horizontaux. */
table { width: 100%; border-collapse: collapse; margin: 1.2em 0; font-size: .92em; }
th { text-align: left; border-bottom: 1px solid #b9b3a7; padding: .35em .6em .35em 0; }
td { border-bottom: 1px solid #e5e1d8; padding: .35em .6em .35em 0; vertical-align: top; }
.couverture { text-align: center; margin-top: 18%; }
.couverture img { width: 38%; max-width: 180px; }
.chapeau { text-transform: uppercase; letter-spacing: .12em; font-size: .75em; color: #6b6558; margin: 0 0 .8em; }
.sous-titre { font-style: italic; color: #4a463d; }
.pied { font-size: .8em; color: #6b6558; margin-top: 3em; }
.source { background: #f4f1ea; padding: .8em 1em; border-left: 3px solid #d8d4cc; font-size: .95em; }
.note { font-size: .85em; color: #6b6558; font-style: italic; }
/* La signature de fin de chapitre. Elle doit se lire si on la cherche, et
   disparaître si on ne la cherche pas. */
.signature { margin-top: 3em; padding-top: .8em; border-top: 1px solid #e5e1d8;
  font-size: .72em; color: #8a8478; text-align: center; }
.signature img { width: 11px; vertical-align: -1px; margin-right: .3em; }
`.trim();

/**
 * Fabrique l'EPUB. Renvoie les octets du fichier.
 *
 * ⚠️ L'image de couverture est FACULTATIVE : si `public/` n'est pas lisible
 * là où tourne cette fonction, le livre se fait sans Ti Margo plutôt que de
 * ne pas se faire. Un margouillat manquant est un détail ; un téléchargement
 * qui échoue est une fonctionnalité morte.
 */
export async function fabriquerEpub(args: LivreArgs): Promise<Uint8Array> {
  const zip = new JSZip();

  const titre = [args.notion || args.intitule, args.classe]
    .filter(Boolean)
    .join(" — ");
  const jour = args.date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  // ⚠️ Un identifiant STABLE pour un même contenu : deux téléchargements du
  // même document ne doivent pas produire deux livres différents dans la
  // bibliothèque d'une liseuse.
  const uid = `urn:eleveai:photo-cours:${empreinte(args.cours + args.document)}`;

  // ── mimetype : premier, non compressé. Un EPUB dont le mimetype est zippé
  //    est refusé par une partie des liseuses.
  zip.file("mimetype", "application/epub+zip", { compression: "STORE" });

  zip.file(
    "META-INF/container.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>`
  );

  const oebps = zip.folder("OEBPS")!;
  oebps.file("style.css", STYLE);

  // Ti Margo, s'il est là.
  let margouillat = false;
  try {
    const chemin = path.join(process.cwd(), "public", "cahier-vacances", "ti-margo.png");
    const image = fs.readFileSync(chemin);
    oebps.file("ti-margo.png", image);
    margouillat = true;
  } catch {
    // Tant pis : voir la note plus haut.
  }

  oebps.file(
    "couverture.xhtml",
    page(
      titre,
      `<div class="couverture">
${margouillat ? '<p><img src="ti-margo.png" alt="Ti Margo, le margouillat d\'EleveAI"/></p>' : ""}
<p class="chapeau">EleveAI · ${SITE}</p>
<h1>${esc(titre || "Un cours photographié")}</h1>
<p class="sous-titre">${esc(args.intitule)}</p>
<p class="pied">${esc([args.matiere, args.classe].filter(Boolean).join(" · "))}<br/>${esc(jour)}</p>
<p class="pied">${esc(DEVISE)}</p>
</div>`,
      { classe: "couverture-page" }
    )
  );

  oebps.file(
    "cours.xhtml",
    page(
      "Le cours",
      `<h2>Le cours</h2>
<p class="note">Tel qu'il a été photographié, puis relu et corrigé. La photo, elle, n'a pas été conservée.</p>
<div class="source">
${coursVersXhtml(args.cours)}
</div>`,
      { signe: true, margouillat }
    )
  );

  // ⚠️ PAS DE TITRE EN DOUBLE. Le modèle ouvre presque toujours son document
  // par « ## Interroge-moi » — ajouter le nôtre par-dessus donnait deux fois
  // le même titre à la suite. On ne le pose que si le document n'en a pas.
  const documentCommenceParUnTitre = /^\s*#{1,6}\s/.test(args.document);

  oebps.file(
    "document.xhtml",
    page(
      args.intitule,
      `${documentCommenceParUnTitre ? "" : `<h2>${esc(args.intitule)}</h2>\n`}${markdownVersXhtml(args.document)}
<hr/>
<p class="pied">Produit à partir de ce cours par EleveAI.<br/>
Relisez avant de vous en servir : une machine a lu cette page.</p>`,
      { signe: true, margouillat }
    )
  );

  oebps.file(
    "nav.xhtml",
    page(
      "Sommaire",
      `<nav epub:type="toc" id="toc"><h2>Sommaire</h2><ol>
<li><a href="cours.xhtml">Le cours</a></li>
<li><a href="document.xhtml">${esc(args.intitule)}</a></li>
</ol></nav>`
    )
  );

  oebps.file(
    "content.opf",
    `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="uid" xml:lang="fr">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="uid">${esc(uid)}</dc:identifier>
    <dc:title>${esc(titre || "Un cours photographié")}</dc:title>
    <dc:language>fr</dc:language>
    <dc:creator>EleveAI</dc:creator>
    <dc:publisher>EleveAI — ${SITE}</dc:publisher>
    <dc:date>${args.date.toISOString().slice(0, 10)}</dc:date>
    <meta property="dcterms:modified">${args.date.toISOString().slice(0, 19)}Z</meta>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="css" href="style.css" media-type="text/css"/>
    ${margouillat ? '<item id="margo" href="ti-margo.png" media-type="image/png"/>' : ""}
    <item id="couverture" href="couverture.xhtml" media-type="application/xhtml+xml"/>
    <item id="cours" href="cours.xhtml" media-type="application/xhtml+xml"/>
    <item id="document" href="document.xhtml" media-type="application/xhtml+xml"/>
  </manifest>
  <spine>
    <itemref idref="couverture"/>
    <itemref idref="cours"/>
    <itemref idref="document"/>
  </spine>
</package>`
  );

  return zip.generateAsync({ type: "uint8array", compression: "DEFLATE" });
}

/** Empreinte courte et stable — sert d'identifiant de livre, pas de sécurité. */
function empreinte(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}

/** Le nom du fichier téléchargé. Il finira dans un dossier « Téléchargements ». */
export function nomDeFichier(args: {
  notion?: string | null;
  classe?: string | null;
  intitule: string;
}): string {
  const base = [args.notion || args.intitule, args.classe]
    .filter(Boolean)
    .join("-")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "cours"}-eleveai.epub`;
}
