// app/sitemap.ts

import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blogPosts";

const BASE_URL = "https://eleveai.fr";

const u = (path: string) => `${BASE_URL}${path}`;

const LASTMOD_HOME    = new Date("2026-06-25");
const LASTMOD_CORE    = new Date("2026-06-25");
const LASTMOD_CAHIERS = new Date("2026-06-26");
const LASTMOD_LEGAL   = new Date("2026-02-18");

const MATHS_CLASSES    = ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere-spe", "terminale-spe"];
const FRANCAIS_CLASSES = ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e"];
const ENGLISH_NIVEAUX  = ["a1", "a2", "b1", "b2"];
const IA_NIVEAUX       = ["a1", "a2", "b1", "b2", "c1"];
const ESPAGNOL_NIVEAUX = ["a1", "a2", "b1", "b2"];
const ECONOMIE_NIVEAUX = ["eco-decouverte", "eco-college", "eco-lycee"];

// Rubriques Géographie - Voyage disponibles par niveau
const ENGLISH_RUBRIQUES: Record<string, string[]> = {
  a1: ["sports", "science", "economie-gestion", "geographie-voyage"],
  a2: ["sports", "science", "economie-gestion", "geographie-voyage"],
  b1: ["sports", "science", "economie-gestion", "geographie-voyage"],
  b2: ["sports", "science", "economie-gestion", "geographie-voyage"],
};

type RouteConfig = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastMod?: Date;
};

const ROUTES: RouteConfig[] = [
  // ── ACCUEIL ────────────────────────────────────────────────────────────────
  { path: "/", priority: 1.0, changeFrequency: "daily", lastMod: LASTMOD_HOME },

  // ── OUTILS ÉLÈVES ──────────────────────────────────────────────────────────
  { path: "/coach-brevet",    priority: 1.0,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-bac-spe",   priority: 1.0,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-ia/english-maths",  priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-ia/maths",    priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-ia/francais", priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-ia/ia",       priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-ia/espagnol", priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-ia/economie", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/parcours-english-maths",  priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/parcours",          priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/parcours-francais", priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/parcours-espagnol", priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/parcours-ia",       priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/eval-pix-ia",       priority: 0.9,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  // ── FICHES DE COURS ────────────────────────────────────────────────────────
  { path: "/fiches-cours",      priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/maths", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia",   priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/livre", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/fondements/definir-l-ia", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/fondements/apprentissage-automatique", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/fondements/modeles-apprentissage", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/fondements/grands-modeles-de-langage", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/fondements/algorithmes-de-recommandation", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/fondements/ia-incarnee-robotique", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/usages/familles-de-taches", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/usages/utiliser-ia-generative", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/usages/evaluer-l-information", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/usages/services-de-recommandation", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/usages/ia-dans-une-organisation", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/enjeux/empreinte-environnementale", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/enjeux/gouvernance", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/enjeux/ethique-et-transparence", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/enjeux/emploi-et-formation", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/enjeux/enjeux-culturels-societaux", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  { path: "/calcul-rapide",   priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/english-maths",   priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/defis-du-jour",   priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },

  // ── DICO (vocabulaire & gestes — prépa éval nationale) ─────────────────────
  { path: "/dico",            priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/dico/maths/6e",   priority: 0.8,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/dico/francais/6e",priority: 0.8,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  // ── CAHIERS DE VACANCES (PDF imprimables) ──────────────────────────────────
  { path: "/cahier-vacances",             priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-le-cm2", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-la-6e",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-la-5e",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-la-4e",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },

  { path: "/concours-logo",   priority: 0.6,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/podcast-maths",   priority: 0.85, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/concours-general",priority: 0.8,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  // ── ESPACES ────────────────────────────────────────────────────────────────
  { path: "/espace-ecoles",   priority: 0.95, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/espace-eleves",   priority: 0.85, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/espace-parents",  priority: 0.8,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/espace-profs",    priority: 0.8,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },

  // ── AUTH (public) ──────────────────────────────────────────────────────────
  { path: "/auth/signin-eleve", priority: 0.8, changeFrequency: "monthly", lastMod: LASTMOD_CORE },

  // ── INSTITUTIONNEL ─────────────────────────────────────────────────────────
  { path: "/pourquoi-eleveai",  priority: 0.75, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/qui-sommes-nous",   priority: 0.7,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/tarifs",            priority: 0.7,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/contact",           priority: 0.65, changeFrequency: "monthly", lastMod: LASTMOD_CORE },

  // ── BLOG INDEX ─────────────────────────────────────────────────────────────
  { path: "/blog", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  // ── FAQ ────────────────────────────────────────────────────────────────────
  { path: "/faq",                   priority: 0.6,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/faq/faq-professeurs",   priority: 0.55, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/faq/faq-parents",       priority: 0.55, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/faq/faq-administration",priority: 0.5,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/faq/faq-tarifs",        priority: 0.5,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },

  // ── LÉGAL ──────────────────────────────────────────────────────────────────
  { path: "/mentions-legales",           priority: 0.3, changeFrequency: "yearly", lastMod: LASTMOD_LEGAL },
  { path: "/politique-confidentialite",  priority: 0.3, changeFrequency: "yearly", lastMod: LASTMOD_LEGAL },
  { path: "/cgu",                        priority: 0.3, changeFrequency: "yearly", lastMod: LASTMOD_LEGAL },
];

const coachRoutes: RouteConfig[] = [
  // English — une entrée par niveau
  ...ENGLISH_NIVEAUX.map((niveau) => ({
    path: `/coach-ia/english-maths?niveau=${niveau}`,
    priority: 0.9,
    changeFrequency: "daily" as const,
    lastMod: LASTMOD_CORE,
  })),
  // English — une entrée par niveau + rubrique
  ...ENGLISH_NIVEAUX.flatMap((niveau) =>
    (ENGLISH_RUBRIQUES[niveau] ?? []).map((rubrique) => ({
      path: `/coach-ia/english-maths?niveau=${niveau}&rubrique=${rubrique}`,
      priority: 0.85,
      changeFrequency: "weekly" as const,
      lastMod: LASTMOD_CORE,
    }))
  ),
  // Parcours English — par niveau
  ...ENGLISH_NIVEAUX.map((niveau) => ({
    path: `/parcours-english-maths?niveau=${niveau}`,
    priority: 0.85,
    changeFrequency: "weekly" as const,
    lastMod: LASTMOD_CORE,
  })),
  // Coach IA — par niveau
  ...IA_NIVEAUX.map((niveau) => ({
    path: `/coach-ia/ia?classe=${niveau}`,
    priority: 0.9,
    changeFrequency: "daily" as const,
    lastMod: LASTMOD_CORE,
  })),
  // Parcours IA — par niveau
  ...IA_NIVEAUX.map((niveau) => ({
    path: `/parcours-ia?niveau=${niveau}`,
    priority: 0.85,
    changeFrequency: "weekly" as const,
    lastMod: LASTMOD_CORE,
  })),
  // Maths — par classe
  ...MATHS_CLASSES.map((classe) => ({
    path: `/coach-ia/maths?classe=${classe}`,
    priority: classe === "terminale-spe" ? 0.85 : 0.9,
    changeFrequency: "daily" as const,
    lastMod: LASTMOD_CORE,
  })),
  // Français — par classe
  ...FRANCAIS_CLASSES.map((classe) => ({
    path: `/coach-ia/francais?classe=${classe}`,
    priority: 0.9,
    changeFrequency: "daily" as const,
    lastMod: LASTMOD_CORE,
  })),
  // Espagnol — par niveau
  ...ESPAGNOL_NIVEAUX.map((niveau) => ({
    path: `/coach-ia/espagnol?classe=${niveau}`,
    priority: 0.85,
    changeFrequency: "daily" as const,
    lastMod: LASTMOD_CORE,
  })),
  // Économie — par niveau
  ...ECONOMIE_NIVEAUX.map((classe) => ({
    path: `/coach-ia/economie?classe=${classe}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
    lastMod: LASTMOD_CORE,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Routes statiques
  const staticRoutes = [...ROUTES, ...coachRoutes].map((route) => ({
    url: u(route.path),
    lastModified: route.lastMod ?? LASTMOD_CORE,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Articles de blog (générés dynamiquement depuis blogPosts.ts)
  const blogRoutes = getAllBlogPosts().map((post) => ({
    url: u(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...blogRoutes];
}
