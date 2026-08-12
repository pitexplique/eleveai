// lib/photo-cours/compresser.ts — NAVIGATEUR UNIQUEMENT.
//
// Un téléphone récent produit des photos de 4 à 12 Mo. Envoyées telles quelles,
// elles se heurtent à la limite de corps de requête de Vercel (~4,5 Mo) et
// coûtent le double en tokens sans rien apporter : au-delà de ~1600 px, le
// modèle ne lit pas mieux une écriture manuscrite.
//
// ⭐ Effet de bord heureux : redessiner la photo dans un canvas efface les
// métadonnées EXIF — dont les COORDONNÉES GPS, que les téléphones inscrivent
// par défaut. Le lieu de la salle de classe ne part donc nulle part.

const COTE_MAX = 1600;
const QUALITE = 0.82;

export type PhotoCompressee = {
  dataUri: string;
  largeur: number;
  hauteur: number;
  poidsKo: number;
};

export async function compresserPhoto(fichier: File): Promise<PhotoCompressee> {
  if (!fichier.type.startsWith("image/")) {
    throw new Error("Ce fichier n'est pas une image.");
  }

  const bitmap = await chargerBitmap(fichier);

  const facteur = Math.min(1, COTE_MAX / Math.max(bitmap.width, bitmap.height));
  const largeur = Math.round(bitmap.width * facteur);
  const hauteur = Math.round(bitmap.height * facteur);

  const canvas = document.createElement("canvas");
  canvas.width = largeur;
  canvas.height = hauteur;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Impossible de préparer la photo.");

  // Fond blanc : un PNG transparent deviendrait noir en JPEG, et un cours écrit
  // au crayon sur fond noir n'est plus lisible du tout.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, largeur, hauteur);
  ctx.drawImage(bitmap, 0, 0, largeur, hauteur);

  const dataUri = canvas.toDataURL("image/jpeg", QUALITE);

  return {
    dataUri,
    largeur,
    hauteur,
    // Une data URI en base64 pèse ~4/3 des octets réels.
    poidsKo: Math.round((dataUri.length * 0.75) / 1024),
  };
}

async function chargerBitmap(fichier: File): Promise<ImageBitmap | HTMLImageElement> {
  // createImageBitmap applique tout seul l'orientation EXIF : sans lui, une
  // photo prise en tenant le téléphone de travers arrive couchée, et le modèle
  // lit un cours à 90°.
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(fichier, { imageOrientation: "from-image" });
    } catch {
      // Safari ancien : on retombe sur <img>.
    }
  }

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(fichier);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Photo illisible."));
    };
    img.src = url;
  });
}
