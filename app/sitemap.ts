// app/sitemap.ts

import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blogPosts";
import { NIVEAUX, motsDeLaClasse } from "@/lib/dico";

const BASE_URL = "https://eleveai.fr";

const u = (path: string) => `${BASE_URL}${path}`;

const LASTMOD_HOME    = new Date("2026-07-01");
const LASTMOD_EXPLORER = new Date("2026-07-02");
const LASTMOD_CORE    = new Date("2026-06-25");
const LASTMOD_CAHIERS = new Date("2026-06-29");
const LASTMOD_DICTEE  = new Date("2026-07-01");
const LASTMOD_974     = new Date("2026-07-02");
const LASTMOD_JEUX    = new Date("2026-07-05");
const LASTMOD_FICHES  = new Date("2026-07-11");
// 12/07 : les 16 fiches IA refaites « en blocs » (fiche + flashcards + composeur)
const LASTMOD_FICHES_IA = new Date("2026-07-12");
const LASTMOD_AUDIENCES = new Date("2026-07-05");
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

  // ── EXPLORER (catalogue de toutes les actions) ─────────────────────────────
  { path: "/explorer",        priority: 0.9,  changeFrequency: "weekly", lastMod: LASTMOD_EXPLORER },

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
  { path: "/fiches-cours/maths", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  // Fiches maths — refaites « en blocs » le 11/07, + les fiches 6e créées
  // le 12/07 (une par banque du coach) : fiche + flashcards + composeur.
  { path: "/fiches-cours/maths/6e/entier-nombre",             priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/decimal-nombre",            priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/fraction-nombre",           priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/pourcentage-nombre",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/prop-proportionnalite",    priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/6e/entier-calcul-mental",       priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/entier-calcul-pose",         priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/aire-longueur",           priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/aire-perimetre",          priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/aire-surface",               priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/volume-solide",             priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/angle-mesure",              priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/triangle-figure",           priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/quadrilatere-figure",       priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/sym-axiale",            priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/stat-donnee",             priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/proba-experience",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/algo-programmation",       priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/5e/pourcentages",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/fractions-addition",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/4e/pythagore",           priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/4e/cosinus",             priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/4e/statistiques",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/4e/probabilites",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/3e/thales",              priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/ia",   priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/livre", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/fondements/definir-l-ia", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/fondements/apprentissage-automatique", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/fondements/modeles-apprentissage", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/fondements/grands-modeles-de-langage", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/fondements/algorithmes-de-recommandation", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/fondements/ia-incarnee-robotique", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/usages/familles-de-taches", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/usages/utiliser-ia-generative", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/usages/evaluer-l-information", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/usages/services-de-recommandation", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/usages/ia-dans-une-organisation", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/enjeux/empreinte-environnementale", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/enjeux/gouvernance", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/enjeux/ethique-et-transparence", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/enjeux/emploi-et-formation", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/enjeux/enjeux-culturels-societaux", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },

  { path: "/dictee-du-jour",  priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_DICTEE },
  { path: "/calcul-rapide",   priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/english-maths",   priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/defis-du-jour",   priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },

  // ── DICO (vocabulaire & gestes — prépa éval nationale) ─────────────────────
  { path: "/dico",            priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/dico/maths/6e",   priority: 0.8,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/dico/francais/6e",priority: 0.8,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  // ── CAHIERS DE VACANCES (PDF imprimables) ──────────────────────────────────
  { path: "/cahier-vacances",             priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-le-cp",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-le-ce1", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-le-ce2", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-le-cm1", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-le-cm2", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-la-6e",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-la-5e",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-la-4e",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-la-3e",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-la-2nde", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-la-premiere", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-la-terminale", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-le-bac-plus-1", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/aider-mon-enfant", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },

  { path: "/concours-logo",   priority: 0.6,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/podcast-maths",   priority: 0.85, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/concours-general",priority: 0.8,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  // ── MATHS RÉEL · 974 ───────────────────────────────────────────────────────
  { path: "/maths-974",       priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_974 },
  { path: "/picto-maths",     priority: 0.8,  changeFrequency: "monthly", lastMod: LASTMOD_974 },
  { path: "/carte",           priority: 0.8,  changeFrequency: "monthly", lastMod: LASTMOD_974 },
  { path: "/cahier-vacances/maths", priority: 0.85, changeFrequency: "monthly", lastMod: LASTMOD_974 },

  // ── JEU « QUI SUIS-JE ? » (32 cartes à imprimer, toutes matières) ──────────
  // Le hub ; les paquets par classe sont générés automatiquement (voir
  // jeuxCartesRoutes) → chaque nouvelle classe apparaît toute seule ici.
  { path: "/qui-suis-je-a-imprimer",            priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_JEUX },

  // ── CARTES DÉFIS « Le corps & l’esprit » (révision + sport, à imprimer) ───
  { path: "/cahier-vacances-cartes",                   priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_JEUX },
  { path: "/cahier-vacances-cartes/vers-la-premiere",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_JEUX },
  { path: "/cahier-vacances-cartes/vers-la-6e",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_JEUX },
  { path: "/cahier-vacances-cartes/vers-le-cm2",       priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_JEUX },
  { path: "/cahier-vacances-cartes/vers-la-5e",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_JEUX },
  { path: "/cahier-vacances-cartes/vers-la-4e",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_JEUX },
  { path: "/cahier-vacances-cartes/vers-la-3e",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_JEUX },

  // ── ESPACES / AUDIENCES ────────────────────────────────────────────────────
  // Pages d'audience = portes du header et de l'accueil (destinations principales).
  { path: "/parents",         priority: 0.9,  changeFrequency: "monthly", lastMod: LASTMOD_AUDIENCES },
  { path: "/enseignants",     priority: 0.9,  changeFrequency: "monthly", lastMod: LASTMOD_AUDIENCES },
  { path: "/francais-de-l-etranger", priority: 0.9, changeFrequency: "weekly", lastMod: new Date("2026-07-10") },

  // ── PROGRAMME PAR CLASSE (moteur SEO n°2 : les compétences des banques
  //    exposées en texte, façon pages « skills » d'IXL) ──────────────────────
  ...["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere-spe", "terminale-spe"].map((c) => (
    { path: `/programme/${c}`, priority: 0.9, changeFrequency: "monthly" as const, lastMod: new Date("2026-07-11") }
  )),
  { path: "/espace-ecoles",   priority: 0.95, changeFrequency: "monthly", lastMod: LASTMOD_AUDIENCES },
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

// Jeu « Qui suis-je ? » — un paquet par classe, généré depuis les classes qui ont
// du contenu (GS-CP → Terminale au fur et à mesure). Toute nouvelle classe s'ajoute
// ici automatiquement, sans toucher ce fichier.
const jeuxCartesRoutes: RouteConfig[] = NIVEAUX.filter(
  (n) => motsDeLaClasse(n.slug).length > 0
).map((n) => ({
  path: `/qui-suis-je-a-imprimer/${n.slug}`,
  priority: 0.85,
  changeFrequency: "weekly" as const,
  lastMod: LASTMOD_JEUX,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  // Routes statiques
  const staticRoutes = [...ROUTES, ...coachRoutes, ...jeuxCartesRoutes].map((route) => ({
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
