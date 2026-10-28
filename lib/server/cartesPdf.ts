// LES CARTES DE CONNEXION D'UNE CLASSE, EN PDF (28/10/2026).
// Frédéric : « il manque télécharger en PDF », puis « plus simple que imprimer
// en PDF » — un clic, un fichier, sans passer par la fenêtre d'impression.
// Même planche que /prof/cartes (PlancheCartes) : 10 cartes par A4, en
// 2 colonnes × 5 rangées, pointillés pour découper, QR qui ouvre
// /auth/signin déjà rempli.
//
// pdfkit en bundle « standalone », pour la raison racontée dans
// lib/photo-cours/pdf.ts : le pdfkit ordinaire lit ses polices sur le disque
// et casse en production. Polices standard = WinAnsi : accents français oui,
// emojis et lettres grecques non — rien de tel ici.

// @ts-expect-error — le bundle n'expose pas de types ; l'API est celle de `pdfkit`.
import PDFDocument from "pdfkit/js/pdfkit.standalone.js";
import QRCode from "qrcode";

export type CarteEleve = { code_utilisateur: string; nom: string | null; mot_de_passe: string | null };

const CM = 72 / 2.54;
const LARGEUR_CARTE = 9.9 * CM;
const HAUTEUR_CARTE = 5.4 * CM;
const PAR_PAGE = 10;
const NOIR = "#020617";
const GRIS = "#64748b";

export async function fabriquerCartesPdf(args: {
  nomClasse: string;
  codeClasse: string;
  eleves: CarteEleve[];
  origine: string;
}): Promise<Buffer> {
  const doc = new PDFDocument({
    size: "A4",
    margin: 0,
    info: { Title: `Cartes EleveAI - ${args.nomClasse}`, Author: "EleveAI" },
  });
  const morceaux: Buffer[] = [];
  doc.on("data", (b: Buffer) => morceaux.push(b));
  const fini = new Promise<Buffer>((resolve) => doc.on("end", () => resolve(Buffer.concat(morceaux))));

  const gauche = (doc.page.width - 2 * LARGEUR_CARTE) / 2;
  const haut = (doc.page.height - 5 * HAUTEUR_CARTE) / 2;
  const adresse = args.origine.replace(/^https?:\/\//, "");

  args.eleves.forEach((e, i) => {
    if (i > 0 && i % PAR_PAGE === 0) doc.addPage({ size: "A4", margin: 0 });
    const n = i % PAR_PAGE;
    const x = gauche + (n % 2) * LARGEUR_CARTE;
    const y = haut + Math.floor(n / 2) * HAUTEUR_CARTE;

    doc.save().lineWidth(0.6).dash(3, { space: 3 }).strokeColor("#94a3b8")
      .rect(x, y, LARGEUR_CARTE, HAUTEUR_CARTE).stroke().restore();

    // Le QR, à droite, dessiné module par module (net à toute échelle).
    const lien = `${args.origine}/auth/signin?etab=${encodeURIComponent(args.codeClasse)}&code=${encodeURIComponent(e.code_utilisateur)}`;
    const qr = QRCode.create(lien, { errorCorrectionLevel: "M" }).modules;
    const cote = 2.6 * CM;
    const module = cote / qr.size;
    const qx = x + LARGEUR_CARTE - cote - 0.4 * CM;
    const qy = y + (HAUTEUR_CARTE - cote) / 2;
    for (let r = 0; r < qr.size; r++)
      for (let c = 0; c < qr.size; c++)
        if (qr.data[r * qr.size + c]) doc.rect(qx + c * module, qy + r * module, module, module);
    doc.fillColor(NOIR).fill();

    // Le texte, à gauche.
    const tx = x + 0.4 * CM;
    let ty = y + 0.45 * CM;
    doc.font("Helvetica-Bold").fontSize(7).fillColor(GRIS)
      .text(`ELEVEAI · ${args.nomClasse.toUpperCase()}`, tx, ty, { lineBreak: false });
    ty += 11;
    const prenom = e.nom && !/^Élève \d+$/.test(e.nom) ? e.nom : "";
    doc.font("Helvetica-Bold").fontSize(10).fillColor(NOIR).text(prenom, tx, ty, { lineBreak: false });
    ty += 16;
    for (const [libelle, valeur] of [
      ["Établissement", args.codeClasse],
      ["Mon code", e.code_utilisateur],
      ["Mot de passe", e.mot_de_passe ?? ""],
    ]) {
      doc.font("Helvetica").fontSize(9).fillColor(GRIS).text(libelle, tx, ty + 3, { lineBreak: false });
      doc.font("Courier-Bold").fontSize(14).fillColor(NOIR).text(valeur, tx + 2.5 * CM, ty, { lineBreak: false });
      ty += 20;
    }
    doc.font("Helvetica").fontSize(7).fillColor(GRIS)
      .text(`${adresse}, puis « Se connecter »`, tx, ty + 2, { lineBreak: false });
  });

  doc.end();
  return fini;
}
