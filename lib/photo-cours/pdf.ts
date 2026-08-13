// lib/photo-cours/pdf.ts
//
// LE MÊME LIVRE, EN PDF (Frédéric, 13/08 : « télécharger en epub ou pdf, il
// faut les deux »).
//
// ⭐ POURQUOI LES DEUX, ET PAS SEULEMENT L'EPUB.
// Un EPUB se lit, un PDF s'IMPRIME. Un professeur qui veut poser sa fiche sur
// une photocopieuse, un parent sans liseuse, un élève qui rend un travail sur
// papier : aucun d'eux n'ouvrira un .epub. À l'inverse, un PDF sur un
// téléphone se lit mal — pagination fixe, zoom obligatoire. Les deux formats
// ne visent pas le même geste, et c'est pour ça qu'il faut les deux.
//
// ⚠️ LE RISQUE QUE J'AVAIS INVOQUÉ POUR L'ÉCARTER : pdfkit lit les métriques
// de ses polices standard dans des fichiers .afm livrés avec le paquet. En
// serverless, l'arborescence est reconstruite par le tracing de Next, qui ne
// suit que les `import` — jamais un `fs.readFileSync` calculé à l'exécution.
// D'où `outputFileTracingIncludes` dans next.config.ts : sans lui, ça marche
// en local et ça casse en production, ce qui est la pire des deux.
//
// ⛔ ON N'UTILISE QUE Helvetica / Times, les polices intégrées au format PDF.
// Embarquer une vraie serif serait plus joli et ajouterait un fichier de
// police de 300 Ko à charger dans chaque instance — pour un document qu'on lit
// une fois.

// ⭐ LE BUNDLE « STANDALONE », ET PAS `pdfkit` TOUT COURT (13/08, après que
// l'EPUB ait marché en production et le PDF non).
//
// `pdfkit/js/pdfkit.js` charge les métriques de ses polices ainsi :
//     fs.readFileSync(__dirname + '/data/Helvetica.afm', 'utf8')
// Un chemin CALCULÉ À L'EXÉCUTION. Le tracing de Next ne suit que les
// `import` : il ne voit pas cette ligne, n'embarque pas le dossier, et la
// fonction déployée meurt sur « ENOENT Helvetica.afm » — alors que tout
// marchait en local, où node_modules est là.
//
// `pdfkit.standalone.js` embarque les mêmes polices en base64 : plus aucune
// lecture de disque, donc plus rien à tracer. 2,4 Mo dans le bundle de cette
// seule route — c'est le prix, et il est payé une fois.
//
// ⚠️ J'avais cru régler ça avec `outputFileTracingIncludes` dans next.config.
// Ça n'a pas suffi : inclure le DOSSIER ne garantit pas que `__dirname` pointe
// au bon endroit une fois la fonction reconstruite. La règle à retenir : un
// paquet qui lit le disque à l'exécution ne se répare pas en copiant des
// fichiers, il se remplace par une version qui ne lit rien.
//
// @ts-expect-error — le bundle n'expose pas de types ; l'API est identique à
// celle de `pdfkit`, dont on garde les types pour les annotations ci-dessous.
import PDFDocument from "pdfkit/js/pdfkit.standalone.js";
import fs from "node:fs";
import path from "node:path";
import type { LivreArgs } from "./epub";

const SITE = "eleveai.fr";

// La charte du livre : encre presque noire, gris de service, un accent sobre.
const ENCRE = "#1d1c16";
const GRIS = "#6b6558";
const ACCENT = "#0e7490";

const MARGE = 64;

/** Fabrique le PDF. Renvoie les octets. */
export async function fabriquerPdf(args: LivreArgs): Promise<Buffer> {
  const doc = new PDFDocument({
    size: "A4",
    // ⚠️ `bufferPages` EST OBLIGATOIRE pour revenir écrire les pieds de page
    // à la fin (`bufferedPageRange` + `switchToPage`). Sans lui, pdfkit écrit
    // chaque page au fil de l'eau et ne sait plus y revenir : la boucle des
    // pieds de page tournait à vide — sans erreur, ce qui est pire.
    bufferPages: true,
    margins: { top: MARGE, bottom: MARGE + 20, left: MARGE, right: MARGE },
    info: {
      Title: [args.notion || args.intitule, args.classe].filter(Boolean).join(" — "),
      Author: "EleveAI",
      Subject: args.intitule,
      Creator: `EleveAI — ${SITE}`,
    },
  });

  const morceaux: Buffer[] = [];
  doc.on("data", (b: Buffer) => morceaux.push(b));
  const fini = new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(morceaux)));
  });

  const titre = [args.notion || args.intitule, args.classe]
    .filter(Boolean)
    .join(" — ");
  const jour = args.date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  /* ── Couverture ───────────────────────────────────────────────────────── */
  // Ti Margo, s'il est lisible. Facultatif, comme dans l'EPUB : un margouillat
  // manquant est un détail, un téléchargement qui échoue est une
  // fonctionnalité morte.
  try {
    const chemin = path.join(process.cwd(), "public", "cahier-vacances", "ti-margo.png");
    const image = fs.readFileSync(chemin);
    // ⚠️ UN ArrayBuffer, PAS UN Buffer — et ça n'a rien d'un détail de style.
    // Le bundle standalone n'embarque pas le `Buffer` de Node : son
    // `Buffer.isBuffer(...)` répond false, il en conclut qu'on lui a passé un
    // CHEMIN de fichier, et appelle un `fs` qu'il a remplacé par un système
    // virtuel. D'où « fs.readFileSync is not a function » — un message qui
    // désigne le contraire du problème. Un ArrayBuffer, lui, est reconnu tel
    // quel. (Une data URI base64 marche aussi, mais coûte 33 % de plus.)
    doc.image(
      image.buffer.slice(image.byteOffset, image.byteOffset + image.byteLength) as never,
      doc.page.width / 2 - 45,
      130,
      { width: 90 }
    );
  } catch (e) {
    // ⚠️ ON LE DIT. La première version avalait l'erreur en silence : le PDF
    // sortait à 5 Ko au lieu de 181, sans que rien ne signale que la
    // couverture était vide.
    console.error("[photo-cours] Ti Margo absent du PDF :", (e as Error).message);
  }

  doc.y = 260;
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(ACCENT)
    .text(`ELEVEAI · ${SITE.toUpperCase()}`, { align: "center", characterSpacing: 1.2 });
  doc.moveDown(1);
  doc
    .font("Times-Bold")
    .fontSize(26)
    .fillColor(ENCRE)
    .text(titre || "Un cours photographié", { align: "center" });
  doc.moveDown(0.5);
  doc
    .font("Times-Italic")
    .fontSize(13)
    .fillColor(GRIS)
    .text(args.intitule, { align: "center" });
  doc.moveDown(2);
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(GRIS)
    .text([args.matiere, args.classe].filter(Boolean).join(" · "), { align: "center" })
    .text(jour, { align: "center" });

  /* ── Le cours ─────────────────────────────────────────────────────────── */
  doc.addPage();
  titreDeSection(doc, "Le cours");
  doc
    .font("Helvetica-Oblique")
    .fontSize(9)
    .fillColor(GRIS)
    .text(
      "Tel qu'il a été photographié, puis relu et corrigé. La photo, elle, n'a pas été conservée.",
      { lineGap: 1 }
    );
  doc.moveDown(0.8);

  // Le cours dans un bloc gris clair — on doit voir d'un coup d'œil ce qui
  // vient du cahier et ce qui vient de la machine.
  const hautBloc = doc.y;
  doc.font("Times-Roman").fontSize(11).fillColor(ENCRE);
  doc.text(args.cours, MARGE + 12, hautBloc + 10, {
    width: doc.page.width - 2 * MARGE - 24,
    lineGap: 3,
  });
  const basBloc = doc.y + 10;
  doc
    .save()
    .rect(MARGE, hautBloc, 3, basBloc - hautBloc)
    .fill("#d8d4cc")
    .restore();
  doc.x = MARGE;

  /* ── Le document produit ──────────────────────────────────────────────── */
  doc.addPage();
  ecrireMarkdown(doc, args.document, args.intitule);

  /* ── Pied de page sur toutes les pages sauf la couverture ─────────────── */
  const pages = doc.bufferedPageRange();
  for (let i = pages.start + 1; i < pages.start + pages.count; i++) {
    doc.switchToPage(i);

    // ⚠️ ON ANNULE LA MARGE DU BAS LE TEMPS D'ÉCRIRE. Sans ça, écrire à
    // `page.height - MARGE` tombe SOUS la zone de texte, et pdfkit fait ce
    // qu'il fait toujours quand on déborde : il ajoute une page. Chaque pied
    // de page en créait une nouvelle, qui en réclamait un autre — le PDF
    // sortait avec deux pages blanches à la fin.
    // 🔑 Le symptôme ne ressemblait pas à la cause : « 5 pages au lieu de 3 »
    // ne dit pas « ton pied de page déborde ».
    const basInitial = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;

    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor(GRIS)
      .text(
        `EleveAI · ${SITE}     —     page ${i - pages.start}`,
        MARGE,
        doc.page.height - MARGE + 8,
        { width: doc.page.width - 2 * MARGE, align: "center", lineBreak: false }
      );

    doc.page.margins.bottom = basInitial;
  }

  doc.end();
  return fini;
}

function titreDeSection(doc: PDFKit.PDFDocument, texte: string) {
  doc.font("Helvetica-Bold").fontSize(16).fillColor(ENCRE).text(texte);
  doc.moveDown(0.4);
}

/**
 * Markdown → PDF.
 *
 * ⚠️ Même parti pris que pour l'EPUB : on ne traite pas du Markdown
 * quelconque, mais celui que NOS prompts demandent — titres, listes, gras,
 * traits. Les tableaux deviennent des lignes « clé — valeur » : pdfkit n'a pas
 * de tableaux, et en fabriquer un à la main pour un barème de quatre lignes
 * coûterait plus cher que ce qu'il rapporte.
 */
function ecrireMarkdown(doc: PDFKit.PDFDocument, md: string, intitule: string) {
  const largeur = doc.page.width - 2 * MARGE;
  const lignes = md.replace(/\r\n/g, "\n").split("\n");

  // Pas de titre en double : le modèle ouvre presque toujours par un « ## ».
  if (!/^\s*#{1,6}\s/.test(md)) titreDeSection(doc, intitule);

  let numero = 0;

  for (const brute of lignes) {
    const ligne = brute.trim();

    if (!ligne) {
      doc.moveDown(0.35);
      continue;
    }

    const titre = /^(#{1,6})\s+(.*)$/.exec(ligne);
    if (titre) {
      numero = 0;
      doc.moveDown(0.6);
      const niveau = titre[1].length;
      doc
        .font("Helvetica-Bold")
        .fontSize(niveau <= 2 ? 15 : 12)
        .fillColor(ENCRE)
        .text(sansMarques(titre[2]), { width: largeur });
      doc.moveDown(0.3);
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(ligne)) {
      doc.moveDown(0.4);
      doc
        .save()
        .moveTo(MARGE, doc.y)
        .lineTo(doc.page.width - MARGE, doc.y)
        .lineWidth(0.5)
        .stroke("#d8d4cc")
        .restore();
      doc.moveDown(0.6);
      continue;
    }

    // Tableau : on garde le contenu, on abandonne la grille.
    if (ligne.startsWith("|")) {
      const cellules = ligne
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => c.trim());
      // La ligne de séparation d'un tableau GFM n'a rien à dire.
      if (cellules.every((c) => /^:?-{2,}:?$/.test(c) || !c)) continue;
      paragraphe(doc, cellules.filter(Boolean).join("  —  "), largeur, 10);
      continue;
    }

    const puce = /^[-*+]\s+(.*)$/.exec(ligne);
    if (puce) {
      paragraphe(doc, `•  ${puce[1]}`, largeur - 12, 11, MARGE + 12);
      continue;
    }

    const num = /^(\d+)[.)]\s+(.*)$/.exec(ligne);
    if (num) {
      numero += 1;
      paragraphe(doc, `${num[1]}.  ${num[2]}`, largeur - 12, 11, MARGE + 12);
      continue;
    }

    paragraphe(doc, ligne, largeur, 11);
  }
}

/** Retire les marques de gras/italique/code d'un titre. */
function sansMarques(s: string): string {
  return s.replace(/\*\*/g, "").replace(/`/g, "").replace(/(^|\s)\*(\S)/g, "$1$2");
}

/**
 * Un paragraphe, avec le gras rendu par segments.
 *
 * ⚠️ `continued: true` reprend la position exacte du texte précédent — c'est
 * la seule façon de mêler deux polices dans une même ligne avec pdfkit. Le
 * dernier segment DOIT fermer la suite (`continued: false`), sinon tout ce qui
 * vient après s'y colle.
 */
function paragraphe(
  doc: PDFKit.PDFDocument,
  texte: string,
  largeur: number,
  taille: number,
  x = MARGE
) {
  const segments = texte.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  doc.fontSize(taille).fillColor(ENCRE);
  doc.x = x;

  segments.forEach((seg, i) => {
    const gras = seg.startsWith("**") && seg.endsWith("**");
    const contenu = gras ? seg.slice(2, -2) : seg.replace(/`/g, "");
    doc
      .font(gras ? "Times-Bold" : "Times-Roman")
      .text(contenu, {
        width: largeur,
        continued: i < segments.length - 1,
        lineGap: 2.5,
      });
  });

  doc.x = MARGE;
  doc.moveDown(0.25);
}
