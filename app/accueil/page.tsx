// app/accueil/page.tsx
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import AccueilClient, {
  type AvisPublic,
  type Apercu974,
  type ActionJournal,
  type ArticleRubrique,
  type Edito,
  type SlideUne,
} from "./AccueilClient";
import { getElevesALHonneur, prenomCourt } from "@/lib/ameliorations/honneurServer";
import { fetchCatalogue } from "@/lib/server/catalogue";
import { niveauPublic } from "@/lib/classe";

// Les avis affichés sont rechargés au plus toutes les 5 minutes.
export const revalidate = 300;

// 18/07 : « il faut mettre en avant qu'on est différent » (Frédéric) — le
// titre disait encore « plateforme d'apprentissage avec coach IA », le
// langage de tout le monde. On dit désormais ce qu'on est vraiment : le
// journal pédagogique de La Réunion, où personne n'apprend à ta place.
export const metadata: Metadata = {
  title: "Le journal pour apprendre de La Réunion où les enfants comprennent et s'entraînent",
  description:
    "Le journal pour apprendre, gratuit, de La Réunion où les enfants comprennent l'île et s'entraînent : un coach IA qui explique sans jamais faire à ta place, des séries d'exercices corrigées, un défi et une dictée chaque matin — et un tableau de suivi où les profs voient la progression de chaque élève. Du CP à la Terminale. Vulgarisation rigoureuse, chiffres vérifiés.",
  keywords: [
    "journal pour apprendre",
    "journal pour apprendre La Réunion",
    // Gardés pour le classement déjà gagné sur cette requête (devant le CNRS).
    "journal scientifique",
    "journal scientifique La Réunion",
    "science pour enfants",
    "vulgarisation scientifique enfants",
    "sciences La Réunion",
    "journal pédagogique",
    "la réunion",
    "maths collège",
    "coach IA élève",
    "défi du jour",
    "dictée du jour",
    "simulateur pédagogique",
    "eleveai",
  ],
  openGraph: {
    title: "Le journal pour apprendre de La Réunion où les enfants comprennent et s'entraînent",
    description:
      "Le journal pour apprendre, gratuit, de La Réunion : comprendre l'île (volcan, cyclones, baleines) et s'entraîner avec un coach qui explique sans faire à ta place, tout corrigé. Ici, personne n'apprend à ta place.",
    url: "https://eleveai.fr",
    siteName: "EleveAI",
    images: [
      {
        url: "/images/accueil-eleveai-reunion.webp",
        width: 1680,
        height: 945,
        alt: "EleveAI — le journal pour apprendre de La Réunion où les enfants comprennent et s'entraînent",
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
// On garde EXPRÈS les fautes d'orthographe (authenticité, « sans jugement ») :
// ce filtre ne juge PAS l'orthographe. Et on n'y met QUE des termes techniques
// (pas « problème »/« erreur », qui sont des mots de vrais avis scolaires :
// « j'avais des problèmes en maths et maintenant ça va »).
const AVIS_EXCLURE_VITRINE =
  /couleur|d[ée]grad|\bbouton\b|\bbug\b|marche pas|fonctionne pas|plante|s'affiche|affiche pas|dysfonction|\blag\b/i;

function estAvisVitrine(message: string): boolean {
  const m = message.trim();
  if (m.length < 30) return false;
  return !AVIS_EXCLURE_VITRINE.test(m);
}

// Avis ÉPINGLÉ (demande de Frédéric, 11/07) : Arthur, l'élève-testeur HPI dont
// les idées ont façonné le site (accessibilité, « rester connecté », la vision
// internationale → la page /francais-de-l-etranger). Verbatim exact de son
// retour du 16/06 (retours_eleves) — on ne réécrit jamais un avis
// (authenticité). Prénom + niveau seul (RGPD).
const AVIS_EPINGLE: AvisPublic = {
  prenom: "Arthur",
  detail: "6e",
  note: 4,
  quote: "C'est un site internet qui permet d'apprendre gratuitement et c'est top.",
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
      // Notes positives (≥ 4) uniquement. On en récupère plus que 3 pour pouvoir
      // écarter les remarques bug/design (estAvisVitrine) et garder 3 vrais avis.
      .select("message, note, prenom, classe, page, created_at")
      .eq("type", "avis")
      .gte("note", 4)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error || !data) return [];

    const recents = data
      // Pas de doublon avec l'avis épinglé s'il remonte aussi de la base.
      .filter((r) => String(r.message ?? "").trim() !== AVIS_EPINGLE.quote)
      .filter((r) => estAvisVitrine(String(r.message ?? "")))
      .slice(0, 2)
      .map((r) => ({
        prenom: prenomCourt(r.prenom),
        detail: niveauPublic(r.classe) || r.page?.trim() || "Élève",
        note: Number(r.note) || 5,
        quote: String(r.message ?? "").trim(),
      }));

    // Arthur d'abord, puis les 2 avis récents : la rotation le montre en premier.
    return [AVIS_EPINGLE, ...recents];
  } catch {
    // Échec base : on laisse le fallback client (Pierre/Tamara/Guilianne) jouer.
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

// Le catalogue du journal vient de la table catalogue_actions (source de
// vérité, la même que /explorer et la reco) : activer/désactiver/réordonner
// en base suffit, le journal suit. Échec base → le fallback en dur du client.
async function getCatalogueJournal(): Promise<ActionJournal[]> {
  try {
    const actions = await fetchCatalogue();
    return actions
      .filter((a) => a.actif)
      .map((a) => ({
        id: a.id,
        famille: a.famille,
        label: a.label,
        description: a.description,
        route: a.route,
      }));
  } catch {
    return [];
  }
}

// La Une (carrousel) vient de la RÉGIE DU RÉDACTEUR EN CHEF : table journal_une
// (éditée via /admin/journal). Table vide/absente → repli sur les 6 épisodes
// en dur du client.
async function getSlidesUne(): Promise<SlideUne[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];

  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("journal_une")
      .select("id, kicker, titre, accroche, youtube_id, image_url, lien, cta, defi, created_at")
      .eq("actif", true)
      .order("ordre", { ascending: true });

    if (error || !data) return [];
    // « Paru aujourd'hui » = créé aujourd'hui À LA RÉUNION (UTC+4), pas en UTC
    // serveur : à 22 h heure de l'île, un slide du matin est encore « du jour ».
    const jourReunion = (d: string | Date) =>
      new Date(d).toLocaleDateString("fr-FR", { timeZone: "Indian/Reunion" });
    const aujourdhui = jourReunion(new Date());
    return data.map((s) => ({
      id: String(s.id),
      kicker: s.kicker ?? "Réfléchir · En vrai, à La Réunion",
      titre: s.titre,
      accroche: s.accroche,
      youtubeId: s.youtube_id,
      imageUrl: s.image_url,
      lien: s.lien,
      cta: s.cta ?? "Lire →",
      defi: s.defi,
      nouveau: s.created_at ? jourReunion(s.created_at) === aujourdhui : false,
    }));
  } catch {
    return [];
  }
}

// Les articles d'une rubrique du journal (table journal_articles, patron de la
// régie généralisé — colonne `rubrique`). Table vide/absente → repli sur les
// articles en dur du client.
async function getArticlesRubrique(rubrique: string): Promise<ArticleRubrique[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];

  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("journal_articles")
      .select("id, titre, accroche, image_url, lien, cta")
      .eq("rubrique", rubrique)
      .eq("actif", true)
      .order("ordre", { ascending: true });
    if (error || !data) return [];
    return data.map((a) => ({
      id: a.id,
      titre: a.titre,
      accroche: a.accroche,
      imageUrl: a.image_url,
      lien: a.lien,
      cta: a.cta,
    }));
  } catch {
    return [];
  }
}

// L'ÉDITO DU JOUR — même table, rubrique 'edito' (Frédéric, 24/07 : « l'édito
// n'est pas du jour et ne change pas »). Le plus récent gagne : ordre croissant
// puis date décroissante, on prend le premier. Le corps vit dans `accroche`,
// paragraphes séparés par une ligne vide ; `lien`/`cta` = le renvoi de fin.
// Table vide/absente → repli sur l'édito en dur du client.
async function getEdito(): Promise<Edito | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("journal_articles")
      .select("id, titre, accroche, lien, cta, created_at")
      .eq("rubrique", "edito")
      .eq("actif", true)
      .order("ordre", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(1);
    if (error || !data || data.length === 0) return null;

    const e = data[0];
    // La date est calculée SERVEUR à l'heure de l'île — sinon le rendu client
    // diverge du HTML (hydratation) selon le fuseau du lecteur.
    const jourReunion = (d: string | Date) =>
      new Date(d).toLocaleDateString("fr-FR", { timeZone: "Indian/Reunion" });
    const dateLabel = e.created_at
      ? new Date(e.created_at).toLocaleDateString("fr-FR", {
          timeZone: "Indian/Reunion",
          weekday: "long",
          day: "numeric",
          month: "long",
        })
      : null;
    return {
      id: String(e.id),
      titre: e.titre,
      corps: e.accroche ?? "",
      lien: e.lien && e.lien !== "#" ? e.lien : null,
      cta: e.cta,
      dateLabel,
      nouveau: e.created_at ? jourReunion(e.created_at) === jourReunion(new Date()) : false,
    };
  } catch {
    return null;
  }
}

export default async function Page() {
  const [avis, honneur, apercu974, catalogue, slides, articlesMaths, edito] = await Promise.all([
    getDerniersAvis(),
    getElevesALHonneur(),
    getApercuMaths974(),
    getCatalogueJournal(),
    getSlidesUne(),
    getArticlesRubrique("un-peu-de-maths"),
    getEdito(),
  ]);
  return (
    <AccueilClient
      avis={avis}
      honneur={honneur}
      apercu974={apercu974}
      catalogue={catalogue}
      slides={slides}
      articlesMaths={articlesMaths}
      edito={edito}
    />
  );
}
