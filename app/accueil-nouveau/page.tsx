// MAQUETTE DU 23/10/2026 — L'ACCUEIL « VALABLE DANS DEUX ANS ».
//
// Frédéric, après le business plan : « propose une page d'accueil nouvelle, sur
// quelque chose qui sera valable dans 2 ans », « comme si les 3 500 vidéos
// étaient déjà faites ». Puis : « construis cet accueil sur une page à part
// (noindex) pour que je le compare avec le journal actuel, sans toucher
// /accueil ».
// L'idée : dans deux ans, l'explication d'une notion sera offerte par toutes les
// IA. L'accueil vend donc ce qu'elles n'auront pas : LE PROGRAMME DU PAYS, des
// vidéos VÉRIFIÉES PAR UN PROFESSEUR, et un coach qui SUIT l'élève. Le journal
// (13 rubriques) se plie en trois cases : la Une, le défi, le métier.
// ⭐ Les compteurs sont CALCULÉS (vidéos, programmes) : ils diront « 3 500 » le
// jour où les vidéos seront sur R2, sans retoucher la page.
// ⛔ /accueil n'est pas touché. noindex, hors sitemap.
import type { Metadata } from "next";
import { toutesLesVideos, urlR2, type VideoR2 } from "@/lib/videos/r2";
import { donneesDuJournal } from "../accueil-journal/donnees";
import AccueilNouveau, { type VideoVitrine } from "./AccueilNouveau";

export const metadata: Metadata = {
  title: "Le coach qui suit ton programme et tes progrès (maquette)",
  robots: { index: false, follow: false },
};

export const revalidate = 3600;

/** Le dossier de R2 → la classe du coach (`/coach-ia/maths?classe=…`). */
const CLASSE_DU_DOSSIER: Record<string, string> = {
  terminale: "terminale-spe",
  premiere: "premiere-spe",
  "premiere-commun": "premiere",
  seconde: "seconde",
  stmg: "stmg",
  "3e": "3e",
  "4e": "4e",
  "5e": "5e",
  "6e": "6e",
  cm2: "cm2",
  cm1: "cm1",
  cp: "cp",
};
const DEHORS = new Set(["974", "maths-en-vrai"]);

/* Comme sur le journal : seulement des paysages AVEC miniature (sinon la
   vignette est souvent un écran noir). */
const vitrine = (v: VideoR2): VideoVitrine => ({ id: v.id, titre: v.titre, vignette: urlR2(v.vignette!) });
const montrable = (v: VideoR2) => !v.short && Boolean(v.poster) && Boolean(v.vignette);

/** `n` vidéos qui avancent chaque jour dans la liste, en boucle. */
function duJour(liste: VideoR2[], jour: number, n: number): VideoVitrine[] {
  if (liste.length === 0) return [];
  const debut = (jour * n) % liste.length;
  return Array.from({ length: Math.min(n, liste.length) }, (_, i) => vitrine(liste[(debut + i) % liste.length]));
}

export default function AccueilNouveauPage() {
  const journal = donneesDuJournal();
  const toutes = toutesLesVideos();
  const parClasse: Record<string, VideoVitrine[]> = {};
  for (const [dossier, classe] of Object.entries(CLASSE_DU_DOSSIER)) {
    const liste = toutes.filter((v) => v.fichier.split("/")[0] === dossier && montrable(v));
    parClasse[classe] = duJour(liste, journal.jour, 4);
  }
  const dehors = duJour(
    toutes.filter((v) => DEHORS.has(v.fichier.split("/")[0]) && montrable(v)),
    journal.jour,
    4,
  );
  const totalVideos = toutes.filter((v) => v.vignette && !v.fichier.startsWith("atelier-video-essais")).length;

  return (
    <AccueilNouveau
      totalVideos={totalVideos}
      parClasse={parClasse}
      dehors={dehors}
      une={journal.une.paysage ? { ...journal.une.paysage, classe: journal.une.classe } : null}
      defi={journal.defi}
      metier={journal.metier}
    />
  );
}
