// app/api/atelier-video/route.ts
//
// ⭐ 09/10/2026 — ENREGISTRER LE TRAVAIL DE L'ATELIER VIDÉO. Frédéric : il faut
// être CONNECTÉ (code établissement ou e-mail) pour enregistrer. Les deux
// connexions donnent le même jeton signé (lib/server/session.ts) ; l'élève est
// identifié par (code_etablissement, code_utilisateur).
//
// Tout vit dans Supabase Storage, bucket PRIVÉ `atelier-videos`, créé ici au
// premier appel (aucun SQL à lancer) :
//   <etablissement>/<eleve>/<projet>/projet.json  { nom, script, majLe }
//   <etablissement>/<eleve>/<projet>/video.mp4    la vidéo rendue sur try.manim.community
// Les vidéos ne se voient qu'avec la session de l'élève (liens signés d'une
// heure) : pas de galerie publique, donc rien à modérer pour l'instant.
//
// La vidéo ne passe PAS par cette route (4,5 Mo au plus sur Vercel) : la route
// donne un lien d'envoi signé et le navigateur envoie le fichier à Supabase.

import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { verifySessionToken } from "@/lib/server/session";

const BUCKET = "atelier-videos";
const MAX_SCRIPT = 8000;
const MAX_VIDEO = 50 * 1024 * 1024;
const MAX_PROJETS = 30;

// La voix de l'élève (version 2) : une entrée par phrase « dis : », clé = début
// du SHA-1 de la phrase (calculé par le navigateur), fichier dans voix/.
type VoixEnregistree = { texte: string; duree: number; ext: "webm" | "m4a" | "ogg" };
type Projet = { nom: string; script: string; majLe: string; voix?: Record<string, VoixEnregistree> };

const TYPES_AUDIO: Record<string, VoixEnregistree["ext"]> = {
  "audio/webm": "webm",
  "audio/mp4": "m4a",
  "audio/ogg": "ogg",
};
const MAX_VOIX = 5 * 1024 * 1024;

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase non configuré");
  return createClient(url, key, { auth: { persistSession: false } });
}

const REGLAGES_BUCKET = {
  public: false,
  fileSizeLimit: MAX_VIDEO,
  allowedMimeTypes: ["video/mp4", "application/json", ...Object.keys(TYPES_AUDIO)],
};

let bucketPret = false;
async function assurerBucket(sb: SupabaseClient) {
  if (bucketPret) return;
  const { data } = await sb.storage.getBucket(BUCKET);
  if (!data) {
    const { error } = await sb.storage.createBucket(BUCKET, REGLAGES_BUCKET);
    if (error && !/exists/i.test(error.message)) throw error;
  } else if (!Object.keys(TYPES_AUDIO).every((t) => data.allowed_mime_types?.includes(t))) {
    // Bucket créé avant la version 2 (voix) : on ouvre les types audio.
    await sb.storage.updateBucket(BUCKET, REGLAGES_BUCKET);
  }
  bucketPret = true;
}

/** Un morceau de chemin sûr : « Les fractions ! » → « les-fractions ». */
function slug(v: unknown, max = 40) {
  return String(v ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, max);
}

const refus = (message: string, status = 400) => NextResponse.json({ ok: false, message }, { status });

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const session = verifySessionToken(body.token);
  if (!session) return refus("Connecte-toi (code établissement ou e-mail) pour enregistrer ton travail.", 401);

  const dossier = `${slug(session.code_etablissement, 60)}/${slug(session.code_utilisateur, 80)}`;
  if (dossier.includes("//") || dossier.startsWith("/")) return refus("Session inutilisable. Reconnecte-toi.", 401);

  let sb: SupabaseClient;
  try {
    sb = admin();
    await assurerBucket(sb);
  } catch {
    return refus("L'enregistrement est indisponible pour le moment.", 503);
  }
  const stock = sb.storage.from(BUCKET);
  const action = String(body.action ?? "");

  if (action === "lister") {
    const { data } = await stock.list(dossier, { limit: 100, sortBy: { column: "name", order: "asc" } });
    const projets = await Promise.all(
      (data ?? [])
        .filter((d) => !d.id) // les « dossiers » n'ont pas d'id
        .map(async (d) => {
          const { data: f } = await stock.download(`${dossier}/${d.name}/projet.json`);
          if (!f) return null;
          try {
            const p = JSON.parse(await f.text()) as Projet;
            const { data: v } = await stock.list(`${dossier}/${d.name}`, { search: "video.mp4" });
            return { id: d.name, nom: p.nom, majLe: p.majLe, video: (v ?? []).some((x) => x.name === "video.mp4") };
          } catch {
            return null;
          }
        }),
    );
    return NextResponse.json({
      ok: true,
      projets: projets.filter(Boolean).sort((a, b) => (a!.majLe < b!.majLe ? 1 : -1)),
    });
  }

  const nom = String(body.nom ?? "").trim().slice(0, 60);
  const id = slug(nom);
  if (!id) return refus("Donne un nom à ta vidéo.");
  const chemin = `${dossier}/${id}`;

  const lireProjet = async (): Promise<Projet | null> => {
    const { data: f } = await stock.download(`${chemin}/projet.json`);
    if (!f) return null;
    try {
      return JSON.parse(await f.text()) as Projet;
    } catch {
      return null;
    }
  };
  // ⛔ `cacheControl: "0"` : par défaut Supabase garde le fichier une heure en
  // cache, et la lecture suivante renvoyait l'ANCIEN projet (mesuré le 10/10 :
  // une voix tout juste enregistrée n'apparaissait pas, et la voix suivante
  // pouvait l'effacer en réécrivant le projet à partir de la version périmée).
  const ecrireProjet = (p: Projet) =>
    stock.upload(`${chemin}/projet.json`, JSON.stringify(p), {
      upsert: true,
      contentType: "application/json",
      cacheControl: "0",
    });

  if (action === "envoyer-voix" || action === "voix-ok") {
    const cle = String(body.cle ?? "");
    if (!/^[a-f0-9]{12}$/.test(cle)) return refus("Enregistrement invalide.");
    const projet = await lireProjet();
    if (!projet) return refus("Enregistre d'abord ton script sous ce nom.", 404);
    const ext = TYPES_AUDIO[String(body.type ?? "").split(";")[0]];
    if (!ext) return refus("Format de son non reconnu par ce navigateur.");
    const fichier = `${chemin}/voix/${cle}.${ext}`;
    if (action === "envoyer-voix") {
      const taille = Number(body.taille);
      if (!(taille > 0 && taille <= MAX_VOIX)) return refus("Enregistrement trop long : une phrase, pas plus.");
      const { data, error } = await stock.createSignedUploadUrl(fichier, { upsert: true });
      if (error || !data) return refus("Impossible de préparer l'envoi. Réessaie.", 500);
      return NextResponse.json({ ok: true, chemin: data.path, jeton: data.token });
    }
    const texte = String(body.texte ?? "").slice(0, 500);
    const duree = Number(body.duree);
    if (!texte || !(duree > 0 && duree < 120)) return refus("Enregistrement invalide.");
    projet.voix = { ...(projet.voix ?? {}), [cle]: { texte, duree, ext } };
    const { error } = await ecrireProjet(projet);
    if (error) return refus("L'enregistrement a échoué. Réessaie.", 500);
    return NextResponse.json({ ok: true });
  }

  if (action === "liens-voix") {
    const projet = await lireProjet();
    if (!projet) return NextResponse.json({ ok: true, voix: [] });
    // Liens valables 7 jours : le temps de coller le code dans try.manim.community.
    const voix = await Promise.all(
      Object.entries(projet.voix ?? {}).map(async ([cle, v]) => {
        const { data } = await stock.createSignedUrl(`${chemin}/voix/${cle}.${v.ext}`, 7 * 24 * 3600);
        return data?.signedUrl ? { cle, texte: v.texte, duree: v.duree, url: data.signedUrl } : null;
      }),
    );
    return NextResponse.json({ ok: true, voix: voix.filter(Boolean) });
  }

  if (action === "enregistrer") {
    const script = String(body.script ?? "").slice(0, MAX_SCRIPT);
    if (!script.trim()) return refus("Ton script est vide.");
    const { data: existants } = await stock.list(dossier, { limit: 100 });
    const dossiers = (existants ?? []).filter((d) => !d.id).map((d) => d.name);
    if (!dossiers.includes(id) && dossiers.length >= MAX_PROJETS)
      return refus(`Tu as déjà ${MAX_PROJETS} vidéos : réutilise un nom existant pour remplacer l'une d'elles.`);
    const avant = await lireProjet();
    const projet: Projet = { nom, script, majLe: new Date().toISOString(), voix: avant?.voix };
    const { error } = await ecrireProjet(projet);
    if (error) return refus("L'enregistrement a échoué. Réessaie.", 500);
    return NextResponse.json({ ok: true, id, nom });
  }

  if (action === "ouvrir") {
    const { data: f } = await stock.download(`${chemin}/projet.json`);
    if (!f) return refus("Vidéo introuvable.", 404);
    const p = JSON.parse(await f.text()) as Projet;
    const { data: v } = await stock.list(chemin, { search: "video.mp4" });
    let video: string | null = null;
    if ((v ?? []).some((x) => x.name === "video.mp4")) {
      const { data } = await stock.createSignedUrl(`${chemin}/video.mp4`, 3600);
      video = data?.signedUrl ?? null;
    }
    return NextResponse.json({ ok: true, id, nom: p.nom, script: p.script, video });
  }

  if (action === "envoyer-video") {
    const { data: f } = await stock.download(`${chemin}/projet.json`);
    if (!f) return refus("Enregistre d'abord ton script sous ce nom.", 404);
    const taille = Number(body.taille);
    if (!(taille > 0 && taille <= MAX_VIDEO)) return refus("La vidéo doit faire moins de 50 Mo.");
    const { data, error } = await stock.createSignedUploadUrl(`${chemin}/video.mp4`, { upsert: true });
    if (error || !data) return refus("Impossible de préparer l'envoi. Réessaie.", 500);
    return NextResponse.json({ ok: true, chemin: data.path, jeton: data.token });
  }

  return refus("Action inconnue.");
}
