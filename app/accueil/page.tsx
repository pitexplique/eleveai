// app/accueil/page.tsx
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import AccueilClient, { type AvisPublic, type Apercu974 } from "./AccueilClient";
import { getElevesALHonneur, prenomCourt } from "@/lib/ameliorations/honneurServer";
import { niveauPublic } from "@/lib/classe";

// Les avis affichés sont rechargés au plus toutes les 5 minutes.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "EleveAI - Plateforme d'apprentissage avec coach IA",
  description:
    "EleveAI aide les élèves à comprendre, s'entraîner et progresser avec un coach IA encadré, des parcours, des défis, des leçons et des corrections qui ne font pas à leur place.",
  keywords: [
    "maths collège",
    "français cycle 2",
    "english maths",
    "verbes anglais maths",
    "leçon du jour",
    "révision maths",
    "révision français",
    "application éducative",
    "eleveai",
    "entraînement quotidien",
  ],
  openGraph: {
    title: "EleveAI - Plateforme d'apprentissage avec coach IA",
    description:
      "Comprends, entraîne-toi et progresse avec EleveAI : coach IA encadré, parcours guidés, défis, leçons et corrections sans faire à ta place.",
    url: "https://eleveai.fr",
    siteName: "EleveAI",
    images: [
      {
        url: "/images/accueil-eleveai-reunion.webp",
        width: 1680,
        height: 945,
        alt: "EleveAI - Plateforme d'apprentissage avec coach IA",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

// Curation de la vitrine : un élève peut mettre 5★ tout en écrivant une
// remarque de design ou un bug (« pas les bonnes couleurs… un dégradé »). Ces
// messages ne sont pas des témoignages : on les écarte de la page d'accueil
// (ils restent visibles dans l'admin des retours). Filtre de contenu simple :
//   - trop court pour un vrai témoignage
//   - vocabulaire de signalement UI/bug plutôt que d'avis
const AVIS_EXCLURE_VITRINE =
  /couleur|d[ée]grad|bouton|\bbug\b|marche pas|fonctionne pas|probl[eè]me|erreur|plante|s'affiche|affiche pas|dysfonction|lag/i;

function estAvisVitrine(message: string): boolean {
  const m = message.trim();
  if (m.length < 30) return false;
  return !AVIS_EXCLURE_VITRINE.test(m);
}

// La table retours_eleves est sous RLS sans policy : lecture via service-role
// uniquement, côté serveur. On n'expose JAMAIS le nom de famille ni les codes.
async function getDerniersAvis(): Promise<AvisPublic[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];

  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("retours_eleves")
      // Notes positives (≥ 4) uniquement. On en récupère plus que 3 pour pouvoir
      // écarter les remarques bug/design (estAvisVitrine) et garder 3 vrais avis.
      .select("message, note, prenom, classe, page, created_at")
      .eq("type", "avis")
      .gte("note", 4)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error || !data) return [];

    return data
      .filter((r) => estAvisVitrine(String(r.message ?? "")))
      .slice(0, 3)
      .map((r) => ({
        prenom: prenomCourt(r.prenom),
        detail: niveauPublic(r.classe) || r.page?.trim() || "Élève",
        note: Number(r.note) || 5,
        quote: String(r.message ?? "").trim(),
      }));
  } catch {
    return [];
  }
}

// Aperçu de « Maths Réel · 974 » : les 3 dernières cartes visibles.
async function getApercuMaths974(): Promise<Apercu974[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];

  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("maths_974")
      .select("id, lieu, titre, notion, youtube_id, image_url")
      .eq("masque", false)
      .order("created_at", { ascending: false })
      .limit(3);

    if (error || !data) return [];
    return data as Apercu974[];
  } catch {
    return [];
  }
}

export default async function Page() {
  const [avis, honneur, apercu974] = await Promise.all([
    getDerniersAvis(),
    getElevesALHonneur(),
    getApercuMaths974(),
  ]);
  return <AccueilClient avis={avis} honneur={honneur} apercu974={apercu974} />;
}
