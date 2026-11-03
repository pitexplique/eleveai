// Les 8 pays de l'aventure — la seule liste, lue par la page, l'API et l'admin.
//
// ⭐ 03/11/2026 — Frédéric : « 8, comme les plans d'expérience ». Les pays ne
// sont pas une liste de marchés : ce sont les cases d'un plan 2³, trois
// facteurs à deux niveaux.
//   A. revenu            élevé / modeste
//   B. programme         calqué sur le français / propre
//   C. français          langue maternelle / seconde
// La case « modeste × programme propre × maternelle » n'existe pas dans le
// monde réel : elle est remplacée par une RÉPÉTITION Suisse/Belgique, qui
// donne en prime la variance entre deux pays identiques sur les trois facteurs.
// Le Québec garde sa matrice et ses pages /pays, mais il est hors du plan.
//
// ⛔ Le plan reste INTERNE : la page publique montre les pays, jamais les
// facteurs. « Pays modeste » sur une page lue à Dakar serait une faute.

export type StatutPays =
  /** Une matrice relie le programme du pays à nos micros (lib/programmes-pays). */
  | "relie"
  /** Le pays enseigne le programme français : rien à relier. */
  | "programme-francais"
  /** Pas encore de matrice. */
  | "en-preparation";

export type PaysAventure = {
  slug: string;
  nom: string;
  statut: StatutPays;
  /** Où voir le programme du pays sur le site, s'il est relié. */
  lien: string | null;
};

export const PAYS_AVENTURE: PaysAventure[] = [
  { slug: "france", nom: "France", statut: "programme-francais", lien: "/coach-ia/maths" },
  { slug: "andorre", nom: "Andorre", statut: "programme-francais", lien: "/coach-ia/maths" },
  { slug: "suisse", nom: "Suisse romande", statut: "relie", lien: "/pays/suisse" },
  { slug: "belgique", nom: "Belgique", statut: "relie", lien: "/pays/belgique" },
  { slug: "luxembourg", nom: "Luxembourg", statut: "en-preparation", lien: null },
  { slug: "cote-divoire", nom: "Côte d'Ivoire", statut: "relie", lien: "/pays/cote-divoire" },
  { slug: "senegal", nom: "Sénégal", statut: "relie", lien: "/pays/senegal" },
  { slug: "maroc", nom: "Maroc", statut: "relie", lien: "/pays/maroc" },
];

export const SLUGS_AVENTURE = new Set(PAYS_AVENTURE.map((p) => p.slug));

/** L'année de la classe offerte — comme la bêta, rien n'est reconduit tout seul. */
export const ANNEE_AVENTURE = "2026-2027";
export const FIN_AVENTURE = "30 juin 2027";
