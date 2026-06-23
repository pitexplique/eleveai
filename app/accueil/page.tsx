// app/accueil/page.tsx
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import AccueilClient, { type AvisPublic } from "./AccueilClient";
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
      // Seulement les notes positives (≥ 4) pour la vitrine publique.
      .select("message, note, prenom, classe, page, created_at")
      .eq("type", "avis")
      .gte("note", 4)
      .order("created_at", { ascending: false })
      .limit(3);

    if (error || !data) return [];

    return data
      .filter((r) => String(r.message ?? "").trim().length > 0)
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

export default async function Page() {
  const [avis, honneur] = await Promise.all([
    getDerniersAvis(),
    getElevesALHonneur(),
  ]);
  return <AccueilClient avis={avis} honneur={honneur} />;
}
