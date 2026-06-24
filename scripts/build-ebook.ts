/**
 * Génère le livre IA en deux formats téléchargeables :
 *   - public/livre/comprendre-l-ia.pdf  (pdfkit, paginé avec pied de page)
 *   - public/livre/comprendre-l-ia.epub (jszip, EPUB 3)
 *
 * Source de contenu : lib/fiches-ia.ts (LIVRE_IA). Lancement :
 *   node --experimental-strip-types scripts/build-ebook.ts
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";
import JSZip from "jszip";
import { LIVRE_IA } from "../lib/fiches-ia.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "livre");
fs.mkdirSync(OUT_DIR, { recursive: true });

const TITRE = "Comprendre l'intelligence artificielle";
const SOUS_TITRE =
  "16 fiches pour s'y retrouver, du fonctionnement de l'IA à ses usages et ses enjeux.";
const REF = "Référentiel Pix « Compétences numériques en IA »";

const PARTIES = [
  { id: "1", label: "Fondements" },
  { id: "2", label: "Usages" },
  { id: "3", label: "Enjeux" },
];

const AVANT_PROPOS = [
  "L'intelligence artificielle est partout : dans nos téléphones, nos réseaux, nos recherches. Ce livre rassemble 16 fiches courtes pour comprendre ce qu'est l'IA, comment elle fonctionne, comment bien l'utiliser, et quels sont ses enjeux pour la société.",
  "Il s'adresse aux élèves du collège et du lycée (et à toute personne curieuse). Chaque chapitre correspond à une compétence du référentiel Pix « Compétences numériques en IA », organisé en trois parties : les fondements, les usages et les enjeux.",
];
const COMMENT = [
  "Lis la fiche du chapitre (à quoi ça sert, notions clés, l'essentiel).",
  "Fais les exercices : la correction est juste en dessous.",
  "Entraîne-toi avec le Coach IA, puis teste-toi avec l'éval blanche Pix IA.",
];

// ════════════════════════════════════════════════════════════════════════════
// PDF (pdfkit)
// ════════════════════════════════════════════════════════════════════════════
function buildPdf(): Promise<void> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 56, bufferPages: true });
    const out = fs.createWriteStream(path.join(OUT_DIR, "comprendre-l-ia.pdf"));
    out.on("finish", () => resolve());
    out.on("error", reject);
    doc.pipe(out);

    const left = doc.page.margins.left;
    const cw = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const INDIGO = "#4f46e5";
    const SLATE = "#334155";
    const GREY = "#64748b";

    const h2 = (t: string) => {
      doc.moveDown(0.6);
      doc.font("Helvetica-Bold").fontSize(15).fillColor("#0f172a").text(t);
      doc.moveDown(0.2);
    };
    const h3 = (t: string) => {
      doc.moveDown(0.4);
      doc.font("Helvetica-Bold").fontSize(11).fillColor(INDIGO).text(t.toUpperCase(), { characterSpacing: 0.5 });
      doc.moveDown(0.15);
    };
    const para = (t: string, color = SLATE) => {
      doc.font("Helvetica").fontSize(10.5).fillColor(color).text(t, { align: "left", lineGap: 2 });
    };
    const kv = (k: string, v: string) => {
      doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INDIGO).text(k + " : ", { continued: true });
      doc.font("Helvetica").fillColor(SLATE).text(v, { lineGap: 1 });
    };
    const bullet = (t: string) => {
      doc.font("Helvetica").fontSize(10.5).fillColor(SLATE).text("•  " + t, { indent: 6, lineGap: 1 });
    };

    // ── Couverture ──
    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#4f46e5");
    doc.fillColor("#ffffff");
    doc.font("Helvetica-Bold").fontSize(12).text("ELEVEAI.FR  ·  FICHES DE COURS", left, 120, { characterSpacing: 1 });
    doc.font("Helvetica-Bold").fontSize(13).fillColor("#dbeafe").text("LE LIVRE", left, 300, { characterSpacing: 3 });
    doc.font("Helvetica-Bold").fontSize(34).fillColor("#ffffff").text(TITRE, left, 322, { width: cw, lineGap: 2 });
    doc.rect(left, doc.y + 14, 70, 4).fill("#c7d2fe");
    doc.font("Helvetica").fontSize(13).fillColor("#e0e7ff").text(SOUS_TITRE, left, doc.y + 30, { width: cw - 60, lineGap: 3 });
    doc.font("Helvetica").fontSize(11).fillColor("#c7d2fe").text(REF, left, doc.y + 16, { width: cw - 60 });
    doc.font("Helvetica-Bold").fontSize(11).fillColor("#e0e7ff").text(
      "3 parties · 16 chapitres · de la 6e au lycée",
      left,
      doc.page.height - 130,
    );
    doc.font("Helvetica").fontSize(10).fillColor("#c7d2fe").text("EleveAI · 2026", left, doc.page.height - 110);

    // ── Avant-propos ──
    doc.addPage();
    h3("Avant-propos");
    doc.font("Helvetica-Bold").fontSize(20).fillColor("#0f172a").text("À qui sert ce livre ?");
    doc.moveDown(0.5);
    AVANT_PROPOS.forEach((p) => { para(p); doc.moveDown(0.4); });
    doc.moveDown(0.3);
    doc.font("Helvetica-Bold").fontSize(11).fillColor(INDIGO).text("COMMENT L'UTILISER");
    doc.moveDown(0.2);
    COMMENT.forEach((c, i) => {
      doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INDIGO).text(`${i + 1}.  `, { continued: true });
      doc.font("Helvetica").fillColor(SLATE).text(c, { lineGap: 1 });
    });

    // ── Sommaire ──
    doc.addPage();
    doc.font("Helvetica-Bold").fontSize(24).fillColor("#0f172a").text("Sommaire");
    doc.moveDown(0.6);
    let n = 0;
    for (const partie of PARTIES) {
      doc.moveDown(0.4);
      doc.font("Helvetica-Bold").fontSize(10).fillColor(INDIGO).text(`PARTIE ${partie.id} · ${partie.label.toUpperCase()}`, { characterSpacing: 0.5 });
      doc.moveDown(0.2);
      for (const ch of LIVRE_IA.filter((c) => c.data.domaineId === partie.id)) {
        n += 1;
        doc.font("Helvetica").fontSize(10.5).fillColor(SLATE)
          .text(`${n}.  ${ch.data.titre}`, { continued: true })
          .fillColor(GREY).text(`   (${ch.competence})`);
      }
    }

    // ── Chapitres ──
    n = 0;
    for (const ch of LIVRE_IA) {
      n += 1;
      const d = ch.data;
      doc.addPage();
      doc.font("Helvetica-Bold").fontSize(9).fillColor(INDIGO)
        .text(`PARTIE ${d.domaineId} · ${d.domaineLabel.toUpperCase()} · COMPÉTENCE ${ch.competence}`, { characterSpacing: 0.5 });
      doc.moveDown(0.2);
      doc.font("Helvetica-Bold").fontSize(22).fillColor("#0f172a").text(`${n}. ${d.titre}`);
      doc.moveDown(0.4);
      doc.font("Helvetica-Oblique").fontSize(11).fillColor(GREY).text(d.intro, { lineGap: 2 });

      h3("À quoi ça sert ?");
      para(d.aQuoiCaSert);
      h3("Le savais-tu ?");
      para(d.leSavaisTu);

      h3("Notions clés");
      d.notions.forEach((no) => kv(no.titre, no.texte));

      h3(d.pointsCles.titre);
      d.pointsCles.lignes.forEach((l) => kv(l.cle, l.detail));
      if (d.pointsCles.callout) { doc.moveDown(0.2); para(d.pointsCles.callout, INDIGO); }

      if (d.exemples.length) {
        h3("Exemple");
        d.exemples.forEach((ex) => {
          doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#0f172a").text(ex.titre);
          para(ex.donnees);
          doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#0f172a").text(ex.question);
          doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INDIGO).text("Réponse : ", { continued: true });
          doc.font("Helvetica").fillColor(SLATE).text(ex.solution, { lineGap: 1 });
        });
      }

      h3("Pièges à éviter");
      d.pieges.forEach(bullet);
      h3("À retenir");
      d.aRetenir.forEach(bullet);

      h3("Exercices");
      d.entrainement.forEach((it, i) => {
        doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#0f172a").text(`${i + 1}. ${it.question}`, { lineGap: 1 });
        doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INDIGO).text("Correction : ", { continued: true });
        doc.font("Helvetica").fillColor(SLATE).text(it.correction, { lineGap: 1 });
        doc.moveDown(0.2);
      });
    }

    // ── Pied de page sur chaque page (sauf la couverture) ──
    const range = doc.bufferedPageRange();
    const total = range.count;
    for (let i = range.start; i < range.start + total; i++) {
      doc.switchToPage(i);
      if (i === range.start) continue; // couverture
      const y = doc.page.height - 38;
      doc.font("Helvetica").fontSize(8).fillColor("#94a3b8");
      doc.text("Comprendre l'intelligence artificielle · eleveai.fr", left, y, { lineBreak: false });
      doc.text(`Page ${i} sur ${total - 1}`, left, y, { width: cw, align: "right", lineBreak: false });
    }

    doc.end();
  });
}

// ════════════════════════════════════════════════════════════════════════════
// EPUB (jszip, EPUB 3)
// ════════════════════════════════════════════════════════════════════════════
function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function xhtml(title: string, body: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">
<head><meta charset="utf-8"/><title>${esc(title)}</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>${body}</body></html>`;
}

async function buildEpub(): Promise<void> {
  const zip = new JSZip();
  zip.file("mimetype", "application/epub+zip", { compression: "STORE" });
  zip.file(
    "META-INF/container.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>`,
  );

  const css = `body{font-family:Georgia,serif;line-height:1.5;color:#1f2937;margin:1em}
h1{font-size:1.6em;color:#312e81}h2{font-size:1.2em;color:#4338ca;margin-top:1.2em}
.eyebrow{font-size:.75em;letter-spacing:.1em;text-transform:uppercase;color:#6366f1;font-weight:bold}
.intro{font-style:italic;color:#4b5563}.callout{background:#eef2ff;border:1px solid #c7d2fe;border-radius:8px;padding:.6em .8em;color:#3730a3}
.kv b{color:#4338ca}.corr{color:#3730a3}ul{padding-left:1.2em}
.cover{text-align:center;margin-top:20%}.cover h1{font-size:2.2em}`;
  const OEBPS: Record<string, string> = { "style.css": css };

  // Couverture + avant-propos
  OEBPS["cover.xhtml"] = xhtml(
    TITRE,
    `<div class="cover"><p class="eyebrow">Le livre · EleveAI</p><h1>${esc(TITRE)}</h1><p class="intro">${esc(SOUS_TITRE)}</p><p>${esc(REF)}</p><p>3 parties · 16 chapitres · de la 6e au lycée</p></div>`,
  );
  OEBPS["avant-propos.xhtml"] = xhtml(
    "Avant-propos",
    `<p class="eyebrow">Avant-propos</p><h1>À qui sert ce livre ?</h1>${AVANT_PROPOS.map((p) => `<p>${esc(p)}</p>`).join("")}<div class="callout"><b>Comment l'utiliser</b><ol>${COMMENT.map((c) => `<li>${esc(c)}</li>`).join("")}</ol></div>`,
  );

  // Chapitres
  const chapterFiles: { id: string; file: string; title: string }[] = [];
  LIVRE_IA.forEach((ch, idx) => {
    const d = ch.data;
    const num = idx + 1;
    const body =
      `<p class="eyebrow">Partie ${d.domaineId} · ${esc(d.domaineLabel)} · Compétence ${ch.competence}</p>` +
      `<h1>${num}. ${esc(d.titre)}</h1>` +
      `<p class="intro">${esc(d.intro)}</p>` +
      `<h2>À quoi ça sert ?</h2><p>${esc(d.aQuoiCaSert)}</p>` +
      `<h2>Le savais-tu ?</h2><p>${esc(d.leSavaisTu)}</p>` +
      `<h2>Notions clés</h2><ul class="kv">${d.notions.map((no) => `<li><b>${esc(no.titre)}</b> — ${esc(no.texte)}</li>`).join("")}</ul>` +
      `<h2>${esc(d.pointsCles.titre)}</h2><ul class="kv">${d.pointsCles.lignes.map((l) => `<li><b>${esc(l.cle)}</b> : ${esc(l.detail)}</li>`).join("")}</ul>` +
      (d.pointsCles.callout ? `<p class="callout">${esc(d.pointsCles.callout)}</p>` : "") +
      (d.exemples.length ? `<h2>Exemple</h2>${d.exemples.map((ex) => `<p><b>${esc(ex.titre)}</b><br/>${esc(ex.donnees)}<br/><b>${esc(ex.question)}</b><br/><span class="corr">→ ${esc(ex.solution)}</span></p>`).join("")}` : "") +
      `<h2>Pièges à éviter</h2><ul>${d.pieges.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` +
      `<h2>À retenir</h2><ul>${d.aRetenir.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` +
      `<h2>Exercices</h2><ol>${d.entrainement.map((it) => `<li>${esc(it.question)}<br/><span class="corr"><b>Correction :</b> ${esc(it.correction)}</span></li>`).join("")}</ol>`;
    const file = `ch${String(num).padStart(2, "0")}.xhtml`;
    OEBPS[file] = xhtml(d.titre, body);
    chapterFiles.push({ id: `ch${num}`, file, title: `${num}. ${d.titre}` });
  });

  // nav.xhtml (EPUB 3)
  const navItems = [
    `<li><a href="avant-propos.xhtml">Avant-propos</a></li>`,
    ...chapterFiles.map((c) => `<li><a href="${c.file}">${esc(c.title)}</a></li>`),
  ].join("");
  OEBPS["nav.xhtml"] = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="fr">
<head><meta charset="utf-8"/><title>Sommaire</title></head>
<body><nav epub:type="toc" id="toc"><h1>Sommaire</h1><ol>${navItems}</ol></nav></body></html>`;

  // content.opf
  const manifestItems = [
    `<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>`,
    `<item id="css" href="style.css" media-type="text/css"/>`,
    `<item id="cover" href="cover.xhtml" media-type="application/xhtml+xml"/>`,
    `<item id="avant" href="avant-propos.xhtml" media-type="application/xhtml+xml"/>`,
    ...chapterFiles.map((c) => `<item id="${c.id}" href="${c.file}" media-type="application/xhtml+xml"/>`),
  ].join("\n    ");
  const spineItems = [
    `<itemref idref="cover"/>`,
    `<itemref idref="avant"/>`,
    ...chapterFiles.map((c) => `<itemref idref="${c.id}"/>`),
  ].join("\n    ");
  OEBPS["content.opf"] = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="bookid">urn:eleveai:livre-ia-2026</dc:identifier>
    <dc:title>${esc(TITRE)}</dc:title>
    <dc:creator>EleveAI</dc:creator>
    <dc:language>fr</dc:language>
    <dc:description>${esc(SOUS_TITRE)}</dc:description>
    <meta property="dcterms:modified">2026-06-24T00:00:00Z</meta>
  </metadata>
  <manifest>
    ${manifestItems}
  </manifest>
  <spine>
    ${spineItems}
  </spine>
</package>`;

  for (const [name, content] of Object.entries(OEBPS)) zip.file("OEBPS/" + name, content);

  const buf = await zip.generateAsync({ type: "nodebuffer", mimeType: "application/epub+zip" });
  fs.writeFileSync(path.join(OUT_DIR, "comprendre-l-ia.epub"), buf);
}

await buildPdf();
await buildEpub();
console.log("OK : PDF + EPUB générés dans public/livre/");
